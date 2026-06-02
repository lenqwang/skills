#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Atomic trace persistence: write trace.md + append index.csv together.

Provides three operations:
  - `persist_trace(...)`: atomic write of `.md` + CSV row append; rolls back
    the directory if either step fails. Replaces the manual two-step Markdown
    instruction in `_trace-persist/SKILL.md`.
  - `check_consistency(traces_dir)`: scan filesystem vs index.csv, return
    three classes of mismatch (fs_only / csv_only / id_mismatch).
  - `reconcile(traces_dir, mode)`: fix-up for legacy data — append fs-only
    rows to CSV, rewrite id-mismatch headings to canonical full ID.

Heading authority: trace.md first non-blockquote heading must be
`# {full_trace_id}: {title}` where `full_trace_id` matches the directory name
exactly. The directory name is the source of truth (created by persist_trace,
agents cannot rename it; headings have a higher chance of being mistyped).
"""

import csv
import re
from pathlib import Path

from . import CSV_TABLES
from .csv_ops import append_csv, init_csv, load_csv

_HEADING_RE = re.compile(r"^#\s+([\w-]+)[：:]\s*(.+?)\s*$")


def _parse_heading(text):
    """Return (id, title) from the first `# ID: title` line, or (None, None)."""
    for line in text.split("\n"):
        m = _HEADING_RE.match(line.strip())
        if m:
            return m.group(1), m.group(2)
    return None, None


def _canonical_traces_dir(project_dir):
    """Resolve traces/ directory under project_dir, mirroring __main__.py."""
    project_dir = Path(project_dir)
    if (project_dir / "traces").is_dir():
        return project_dir / "traces"
    return project_dir / "docs" / "traces"


def persist_trace(project_dir, trace_id, content, *, type_, source,
                  module, component, title, date,
                  repos="", depends_on="", depended_by="", keywords=""):
    """
    Atomically write trace.md and append a CSV row.

    Steps (all-or-nothing):
      1. Validate `trace_id` against the heading parsed from `content`.
      2. Compute bucket dir `{2hex}/{trace_id}/`.
      3. mkdir + write trace.md.
      4. Ensure index.csv exists (init if missing).
      5. Append CSV row.
      6. On any failure after step 3: remove the created directory.

    Returns dict with `id`, `path`, `csv_appended` on success, or `error` on
    failure. Never leaves the filesystem in a half-written state.
    """
    if not trace_id or not isinstance(trace_id, str):
        return {"error": "trace_id required"}

    parsed_id, parsed_title = _parse_heading(content)
    if parsed_id is None:
        return {"error": "content missing `# {ID}: {title}` heading"}
    if parsed_id != trace_id:
        return {"error": f"heading id mismatch: heading={parsed_id} expected={trace_id}"}

    bucket = trace_id.split("-")[1][:2].lower() if "-" in trace_id else trace_id[:2].lower()
    if not (len(bucket) == 2 and all(c in "0123456789abcdef" for c in bucket)):
        return {"error": f"cannot derive 2hex bucket from id: {trace_id}"}

    traces_dir = _canonical_traces_dir(project_dir)
    bucket_dir = traces_dir / bucket / trace_id
    md_path = bucket_dir / "trace.md"

    # Atomic guarantee is on trace.md (not the bucket dir). The dir may
    # legitimately pre-exist — e.g. /research drops research.md and
    # competitive-screenshots/ before /propose calls persist_trace.
    if md_path.exists():
        return {"error": f"trace already exists: {md_path}"}

    # Step 3: write .md
    dir_created_here = not bucket_dir.exists()
    try:
        bucket_dir.mkdir(parents=True, exist_ok=True)
        md_path.write_text(content, encoding="utf-8")
    except OSError as e:
        # If we just created the dir and writing the .md failed, remove the dir
        # to leave the filesystem as we found it. Never touch a pre-existing dir.
        if dir_created_here and bucket_dir.exists():
            try:
                bucket_dir.rmdir()
            except OSError:
                pass
        return {"error": f"failed to write trace.md: {e}"}

    # Step 4-5: ensure CSV + append row
    try:
        traces_dir.mkdir(parents=True, exist_ok=True)
        csv_path = traces_dir / "index.csv"
        if not csv_path.is_file():
            init_csv(traces_dir)

        author = "pm" if source == "pm" else "dev"
        row = {
            "id": trace_id,
            "type": type_,
            "phase": "trace",
            "module": module,
            "component": component or "",
            "title": title or parsed_title or "",
            "keywords": keywords,
            "status": "confirmed",
            "author": author,
            "date": date,
            "file": f"{bucket}/{trace_id}",
            "repos": repos,
            "depends_on": depends_on,
            "depended_by": depended_by,
        }
        append_csv(csv_path, row, CSV_TABLES["index"]["headers"])
    except (OSError, ValueError) as e:
        # Roll back: remove the .md we wrote. Only remove the dir if we
        # created it AND it is now empty (preserves pre-existing siblings).
        try:
            md_path.unlink()
        except OSError:
            pass
        if dir_created_here:
            try:
                bucket_dir.rmdir()
            except OSError:
                pass
        return {"error": f"failed to append index.csv: {e}"}

    return {
        "id": trace_id,
        "path": str(md_path),
        "csv_appended": True,
    }


def check_consistency(traces_dir):
    """
    Scan traces_dir vs index.csv. Report mismatches without modifying anything.

    Returns dict with `fs_only`, `csv_only`, `id_mismatch` (each a list of
    descriptive strings) and `counts` with the same keys mapped to integers.
    """
    traces_dir = Path(traces_dir)
    if not traces_dir.is_dir():
        return {"error": f"traces dir not found: {traces_dir}"}

    csv_path = traces_dir / "index.csv"
    csv_ids = set()
    if csv_path.is_file():
        for row in load_csv(csv_path):
            rid = row.get("id", "").strip()
            if rid:
                csv_ids.add(rid)

    fs_ids = set()
    id_mismatch = []
    for bucket in sorted(traces_dir.iterdir()):
        if not bucket.is_dir():
            continue
        if not (len(bucket.name) == 2 and all(c in "0123456789abcdef" for c in bucket.name)):
            continue
        for trace_dir in sorted(bucket.iterdir()):
            if not trace_dir.is_dir():
                continue
            md = trace_dir / "trace.md"
            if not md.is_file():
                continue
            dir_id = trace_dir.name
            fs_ids.add(dir_id)
            text = md.read_text(encoding="utf-8")
            heading_id, _ = _parse_heading(text)
            if heading_id and heading_id != dir_id:
                id_mismatch.append(
                    f"{dir_id}: heading={heading_id} dirname={dir_id}"
                )

    fs_only = sorted(fs_ids - csv_ids)
    csv_only = sorted(csv_ids - fs_ids)

    return {
        "fs_only": fs_only,
        "csv_only": csv_only,
        "id_mismatch": id_mismatch,
        "counts": {
            "fs_only": len(fs_only),
            "csv_only": len(csv_only),
            "id_mismatch": len(id_mismatch),
        },
    }


def reconcile(traces_dir, *, fix_fs_only=False, fix_id_mismatch=False):
    """
    Fix-up legacy data based on `check_consistency`.

    With `fix_fs_only=True`: append fs-only traces to index.csv (status
    defaults to `confirmed`, author from `> source` if present).
    With `fix_id_mismatch=True`: rewrite the heading line of mismatched
    trace.md files to use the canonical directory-name id.

    Returns dict with `fixed_fs_only`, `fixed_id_mismatch` lists and
    `untouched` (csv_only or anything skipped). Never deletes data.
    """
    from .rebuild import parse_trace_header

    traces_dir = Path(traces_dir)
    report = check_consistency(traces_dir)
    if "error" in report:
        return report

    headers = CSV_TABLES["index"]["headers"]
    csv_path = traces_dir / "index.csv"

    fixed_fs_only = []
    fixed_id_mismatch = []

    if fix_fs_only and report["fs_only"]:
        for trace_id in report["fs_only"]:
            bucket = trace_id.split("-")[1][:2].lower() if "-" in trace_id else trace_id[:2].lower()
            md = traces_dir / bucket / trace_id / "trace.md"
            if not md.is_file():
                continue
            meta = parse_trace_header(md)
            row = {h: "" for h in headers}
            row["id"] = trace_id
            row["type"] = meta.get("type", "")
            row["phase"] = meta.get("phase") or "trace"
            row["module"] = meta.get("module", "")
            row["component"] = meta.get("component", "")
            row["title"] = meta.get("title", "")
            row["status"] = meta.get("status") or "confirmed"
            row["author"] = meta.get("author") or meta.get("source", "")
            row["date"] = meta.get("date", "")
            row["file"] = f"{bucket}/{trace_id}"
            append_csv(csv_path, row, headers)
            fixed_fs_only.append(trace_id)

    if fix_id_mismatch and report["id_mismatch"]:
        for entry in report["id_mismatch"]:
            dir_id = entry.split(":", 1)[0]
            bucket = dir_id.split("-")[1][:2].lower() if "-" in dir_id else dir_id[:2].lower()
            md = traces_dir / bucket / dir_id / "trace.md"
            if not md.is_file():
                continue
            text = md.read_text(encoding="utf-8")
            lines = text.split("\n")
            # Replace the first heading line in-place; preserve title text.
            for i, line in enumerate(lines):
                m = _HEADING_RE.match(line.strip())
                if m:
                    title = m.group(2)
                    lines[i] = f"# {dir_id}: {title}"
                    break
            md.write_text("\n".join(lines), encoding="utf-8")
            fixed_id_mismatch.append(dir_id)

    return {
        "fixed_fs_only": fixed_fs_only,
        "fixed_id_mismatch": fixed_id_mismatch,
        "untouched_csv_only": report["csv_only"],
        "remaining_fs_only": [x for x in report["fs_only"] if x not in fixed_fs_only],
        "remaining_id_mismatch": [
            x.split(":", 1)[0] for x in report["id_mismatch"]
            if x.split(":", 1)[0] not in fixed_id_mismatch
        ],
    }
