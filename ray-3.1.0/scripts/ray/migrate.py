#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Migrate flat trace layout to hash-bucketed layout.

Scans `docs/traces/` for entries matching `{TYPE}-{4hex}-*` (directories or
single `.md` files at the top level) and moves them to
`{2hex}/{TRACE_ID}/trace.md` using `git mv` to preserve history.

Also updates the `file` column in `docs/traces/index.csv` and
`docs/traces/archive.csv` to point at the new path.

Skips:
- Entries already under a 2-char hex bucket directory.
- Files that don't match `{TYPE}-{4hex}-*` (e.g. `2026-03-30-*.md`).

Usage:
    python3 -m ray --migrate-bucket [--project-dir <path>] [--dry-run]
"""

import csv
import re
import shutil
import subprocess
import sys
from pathlib import Path

from . import VALID_TYPES

# Match "{TYPE}-{4hex}" optionally followed by "-..." (slug or extension).
_NAME_RE = re.compile(
    r"^(?P<type>" + "|".join(VALID_TYPES) + r")-(?P<hex>[0-9a-f]{4})(?:-.*)?$"
)


def _git_mv(src: Path, dst: Path, repo_root: Path, dry_run: bool) -> bool:
    """Move a path using `git mv`; fall back to non-git mv if git fails.

    Returns True on success, False otherwise.
    """
    dst.parent.mkdir(parents=True, exist_ok=True)
    if dry_run:
        print(f"  [dry-run] git mv {src} -> {dst}")
        return True
    try:
        subprocess.run(
            ["git", "-C", str(repo_root), "mv", str(src), str(dst)],
            check=True,
            capture_output=True,
        )
        return True
    except subprocess.CalledProcessError as exc:
        # git mv may fail if file is untracked; fall back to plain mv + git add
        msg = exc.stderr.decode("utf-8", errors="replace")
        if "not under version control" in msg or "fatal: not under version control" in msg:
            shutil.move(str(src), str(dst))
            try:
                subprocess.run(
                    ["git", "-C", str(repo_root), "add", str(dst)],
                    check=False,
                    capture_output=True,
                )
            except Exception:
                pass
            return True
        print(f"  [error] git mv failed: {msg.strip()}", file=sys.stderr)
        return False


def _classify(entry: Path):
    """Return (trace_id, kind) where kind is 'dir' or 'file', or None if not a trace.

    `trace_id` is the entry name without the `.md` suffix.
    """
    name = entry.name
    if entry.is_dir():
        if _NAME_RE.match(name):
            return name, "dir"
        return None
    if entry.is_file() and name.endswith(".md"):
        stem = name[:-3]
        if _NAME_RE.match(stem):
            return stem, "file"
    return None


def _bucket_for(trace_id: str) -> str:
    """Extract 2-char hex bucket from a trace_id like 'FEAT-a3f7-...'.

    Always uses lowercase. Returns empty string if pattern is malformed.
    """
    m = _NAME_RE.match(trace_id)
    if not m:
        return ""
    return m.group("hex")[:2].lower()


def plan_migration(traces_dir: Path):
    """Return list of (src_path, dst_path, trace_id, kind) for flat entries."""
    plans = []
    for entry in sorted(traces_dir.iterdir()):
        # Skip bucket directories (2-char hex)
        if entry.is_dir() and len(entry.name) == 2 and all(
            c in "0123456789abcdef" for c in entry.name
        ):
            continue
        cls = _classify(entry)
        if not cls:
            continue
        trace_id, kind = cls
        bucket = _bucket_for(trace_id)
        if not bucket:
            continue
        dst = traces_dir / bucket / trace_id / "trace.md"
        plans.append((entry, dst, trace_id, kind))
    return plans


def _csv_update_file_column(csv_path: Path, mapping: dict, dry_run: bool):
    """Rewrite the `file` column in csv_path according to mapping.

    `mapping` keys are old `file` values (relative path strings); values are
    new `file` values. Rows with `file` not in mapping are left untouched.
    """
    if not csv_path.is_file():
        return 0

    with open(csv_path, "r", encoding="utf-8", newline="") as f:
        reader = csv.DictReader(f)
        fieldnames = reader.fieldnames
        rows = list(reader)

    if not fieldnames or "file" not in fieldnames:
        return 0

    changed = 0
    for row in rows:
        old = row.get("file", "")
        new = mapping.get(old)
        if new and new != old:
            row["file"] = new
            changed += 1

    if dry_run:
        print(f"  [dry-run] would update {changed} rows in {csv_path.name}")
        return changed

    with open(csv_path, "w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        for row in rows:
            writer.writerow({k: row.get(k, "") for k in fieldnames})
    return changed


def migrate(traces_dir: Path, dry_run: bool = False):
    """Run the migration. Returns dict with stats.

    Strategy:
      1. Compute plan (list of moves).
      2. For each plan, build CSV mapping old_file -> new_file.
      3. git mv each entry.
      4. Update CSVs with mapping.
    """
    traces_dir = Path(traces_dir).resolve()
    if not traces_dir.is_dir():
        return {"error": f"traces dir not found: {traces_dir}"}

    # repo_root is the git work-tree containing traces_dir
    try:
        repo_root_out = subprocess.run(
            ["git", "-C", str(traces_dir), "rev-parse", "--show-toplevel"],
            check=True,
            capture_output=True,
        )
        repo_root = Path(repo_root_out.stdout.decode().strip())
    except subprocess.CalledProcessError:
        return {"error": f"not a git repo: {traces_dir}"}

    plans = plan_migration(traces_dir)
    csv_mapping = {}
    moves_done = 0
    moves_failed = 0

    for src, dst, trace_id, kind in plans:
        # CSV `file` value relative paths the existing rows actually use
        try:
            rel_traces = traces_dir.relative_to(repo_root)
        except ValueError:
            rel_traces = Path("docs/traces")
        if kind == "dir":
            old_file_dir = str(rel_traces / src.name) + "/trace.md"
            old_file_dirname_only = str(rel_traces / src.name)
        else:
            # single .md file -> renamed to trace.md
            old_file_dir = str(rel_traces / src.name)
            old_file_dirname_only = str(rel_traces / src.name[:-3])
        new_rel = str(rel_traces / dst.parent.parent.name / trace_id) + "/trace.md"
        new_dir_only = str(rel_traces / dst.parent.parent.name / trace_id)

        # Map any of the variants the CSVs might use
        csv_mapping[old_file_dir] = new_rel
        csv_mapping[old_file_dirname_only] = new_dir_only

        print(f"[migrate] {src.relative_to(traces_dir)} -> "
              f"{dst.relative_to(traces_dir)}")

        if kind == "dir":
            # Directory: move existing trace.md (or whole dir) into bucket
            inner_trace = src / "trace.md"
            if inner_trace.is_file():
                ok = _git_mv(inner_trace, dst, repo_root, dry_run)
                if ok and not dry_run:
                    # remove now-empty source dir if empty
                    try:
                        if not any(src.iterdir()):
                            src.rmdir()
                    except OSError:
                        pass
                if ok:
                    moves_done += 1
                else:
                    moves_failed += 1
            else:
                # No trace.md inside; skip with warning
                print(f"  [warn] {src} has no trace.md; skipping")
        else:
            # Single .md file: move + rename to trace.md inside bucket dir
            ok = _git_mv(src, dst, repo_root, dry_run)
            if ok:
                moves_done += 1
            else:
                moves_failed += 1

    # Update CSVs
    csv_changes = {}
    for csv_name in ("index.csv", "archive.csv"):
        csv_path = traces_dir / csv_name
        csv_changes[csv_name] = _csv_update_file_column(csv_path, csv_mapping, dry_run)

    return {
        "planned": len(plans),
        "moved": moves_done,
        "failed": moves_failed,
        "csv_changes": csv_changes,
        "dry_run": dry_run,
    }


def main_cli(project_dir: str = ".", dry_run: bool = False):
    """CLI helper used by __main__.py."""
    project_dir = Path(project_dir)
    if (project_dir / "traces").is_dir():
        traces_dir = project_dir / "traces"
    elif (project_dir / "docs" / "traces").is_dir():
        traces_dir = project_dir / "docs" / "traces"
    else:
        traces_dir = project_dir / "docs" / "traces"
    return migrate(traces_dir, dry_run=dry_run)


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="Migrate trace bucket layout")
    parser.add_argument("--project-dir", "-p", default=".", help="Project root")
    parser.add_argument("--dry-run", action="store_true", help="Plan only")
    args = parser.parse_args()
    result = main_cli(args.project_dir, args.dry_run)
    print(result)
