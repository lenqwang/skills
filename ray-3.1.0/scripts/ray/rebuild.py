#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""CSV rebuild from trace directories (hash-bucketed).

Merge semantics: CSV is the metadata authority, trace.md headers are
supplementary. rebuild fills empty CSV fields from .md headers, never
overwrites non-empty CSV fields, normalizes the `file` column, preserves
orphan rows with a WARN, and skips rows whose final status is `digested`
(those belong in archive.csv).
"""

import csv
import re
from pathlib import Path

from . import CSV_TABLES, VALID_TYPES
from .csv_ops import load_csv

_FILLABLE_KEYS = (
    "type", "phase", "module", "component", "title",
    "keywords", "status", "author", "date",
    "repos", "depends_on", "depended_by",
)


def parse_trace_header(trace_path):
    """
    Parse header from a trace.md file.

    Expected format:
        > source: pm|dev
        # {TRACE_ID}: {title}
        or
        # {TRACE_ID}：{title}

    Backward-compat: legacy `> mode: pm|dev` is also recognized.

    Returns dict with keys: id, title, type, module, component, author, date,
    status, source, phase, keywords, repos, depends_on, depended_by.
    """
    meta = {
        "id": "", "title": "", "type": "", "phase": "",
        "module": "", "component": "", "keywords": "",
        "author": "", "date": "", "status": "",
        "source": "",
        "repos": "", "depends_on": "", "depended_by": "",
    }
    try:
        text = trace_path.read_text(encoding="utf-8")
    except (OSError, UnicodeDecodeError):
        return meta

    lines = text.split("\n")

    for line in lines:
        stripped = line.strip()

        # Parse heading: # TRACE_ID: title
        m = re.match(r"^#\s+([\w-]+)[：:]\s*(.+)$", stripped)
        if m:
            meta["id"] = m.group(1)
            meta["title"] = m.group(2).strip()
            prefix = meta["id"].split("-")[0].upper()
            if prefix in VALID_TYPES:
                meta["type"] = prefix

        # Parse > key: value lines
        bq = re.match(r"^>\s*(\w[\w_]*):\s*(.+)$", stripped)
        if bq:
            key = bq.group(1).strip().lower()
            val = bq.group(2).strip()
            if key in meta:
                meta[key] = val

        # Stop at second heading
        if stripped.startswith("## "):
            break

    return meta


def _scan_filesystem(traces_dir):
    """Scan traces_dir for trace.md files. Returns dict: id -> (meta, file_value)."""
    fs_traces = {}
    for bucket in sorted(traces_dir.iterdir()):
        if not bucket.is_dir():
            continue
        if len(bucket.name) == 2 and all(c in "0123456789abcdef" for c in bucket.name):
            for trace_dir in sorted(bucket.iterdir()):
                if not trace_dir.is_dir():
                    continue
                trace_md = trace_dir / "trace.md"
                if trace_md.is_file():
                    meta = parse_trace_header(trace_md)
                    trace_id = meta["id"] or trace_dir.name
                    file_val = f"{bucket.name}/{trace_dir.name}"
                    fs_traces[trace_id] = (meta, file_val)
        else:
            # Legacy flat layout
            trace_md = bucket / "trace.md"
            if trace_md.is_file():
                meta = parse_trace_header(trace_md)
                trace_id = meta["id"] or bucket.name
                file_val = bucket.name
                fs_traces[trace_id] = (meta, file_val)
    return fs_traces


def _merge_row(existing, meta, fs_file_val):
    """
    Merge an existing CSV row with the parsed trace.md header.

    Default rule: CSV non-empty fields win, empty CSV fields are filled from
    header. The `file` column is always normalized to fs_file_val.

    Last-writer-wins exceptions — `author` and `status` follow the trace.md
    header when it disagrees with the CSV (override with WARN). Rationale:
    - `author` tracks `> source:` and pipeline flips pm→dev mid-flight
    - `status` advances through the trace lifecycle (confirmed → audited →
      shipped → digested) and `/update-map` documents this as a head-driven
      flip, so rebuild must propagate the change rather than fossilize CSV.

    Returns (merged_row, warnings, normalized_flag).
    """
    merged = dict(existing)
    warnings = []
    normalized = merged.get("file", "") != fs_file_val
    merged["file"] = fs_file_val

    for key in _FILLABLE_KEYS:
        csv_val = merged.get(key, "") or ""

        if key == "author":
            # `> author:` first, then fall back to `> source:`. Empty header → keep CSV.
            hdr_val = (meta.get("author") or meta.get("source") or "").strip()
            if hdr_val and hdr_val != csv_val:
                if csv_val:
                    warnings.append(
                        f"WARN: author override {merged.get('id', '?')}: "
                        f"csv={csv_val} → header={hdr_val}"
                    )
                merged[key] = hdr_val
            continue

        if key == "status":
            hdr_val = (meta.get("status") or "").strip()
            if hdr_val and hdr_val != csv_val:
                if csv_val:
                    warnings.append(
                        f"WARN: status override {merged.get('id', '?')}: "
                        f"csv={csv_val} → header={hdr_val}"
                    )
                merged[key] = hdr_val
            continue

        hdr_val = meta.get(key, "") or ""
        if not csv_val and hdr_val:
            merged[key] = hdr_val
        elif csv_val and hdr_val and csv_val != hdr_val:
            warnings.append(
                f"WARN: header/CSV mismatch {merged.get('id', '?')}.{key}: "
                f"header={hdr_val} csv={csv_val}"
            )

    # Legacy backfill: if both CSV and header omit status/phase, use defaults.
    if not merged.get("status"):
        merged["status"] = "active"
    if not merged.get("phase"):
        merged["phase"] = "trace"

    return merged, warnings, normalized


def _new_row(headers, trace_id, meta, fs_file_val):
    """Build a row for a trace present on filesystem but absent from CSV."""
    row = {h: "" for h in headers}
    row["id"] = trace_id
    row["title"] = meta.get("title", "")
    row["type"] = meta.get("type", "")
    row["phase"] = meta.get("phase") or "trace"
    row["module"] = meta.get("module", "")
    row["component"] = meta.get("component", "")
    row["keywords"] = meta.get("keywords", "")
    row["status"] = meta.get("status") or "confirmed"
    # `> source: pm|dev` maps to author column when no explicit author.
    row["author"] = meta.get("author") or meta.get("source", "")
    row["date"] = meta.get("date", "")
    row["file"] = fs_file_val
    row["repos"] = meta.get("repos", "")
    row["depends_on"] = meta.get("depends_on", "")
    row["depended_by"] = meta.get("depended_by", "")
    return row


def rebuild_csv(traces_dir, dry_run=False):
    """
    Rebuild index.csv with merge semantics.

    CSV is the authority for metadata. Existing non-empty fields are preserved.
    trace.md headers fill only empty CSV fields. The `file` column is always
    normalized to the canonical `{2hex}/{ID}` form. Orphan rows (in CSV but
    not on disk) are kept with a WARN. Rows whose final status is `digested`
    are excluded from index.csv (they live in archive.csv).

    Returns dict with `index` (rows written), `counts` (merged/new/orphan/
    normalized/skipped_digested), and `warnings` (list of strings). When
    `dry_run=True`, no file is written and the returned dict has `dry_run=True`.
    """
    traces_dir = Path(traces_dir)
    if not traces_dir.is_dir():
        return {"error": f"traces dir not found: {traces_dir}"}

    headers = CSV_TABLES["index"]["headers"]
    csv_path = traces_dir / "index.csv"

    existing_rows = {}
    if csv_path.is_file():
        for row in load_csv(csv_path):
            row_id = row.get("id", "")
            if row_id:
                existing_rows[row_id] = row

    fs_traces = _scan_filesystem(traces_dir)

    counts = {"merged": 0, "new": 0, "orphan": 0,
              "normalized": 0, "skipped_digested": 0}
    warnings = []
    output_rows = []

    # Existing CSV rows first (preserves order).
    for trace_id, existing in existing_rows.items():
        if trace_id in fs_traces:
            meta, fs_file_val = fs_traces[trace_id]
            merged, row_warns, normalized = _merge_row(existing, meta, fs_file_val)
            warnings.extend(row_warns)
            if normalized:
                counts["normalized"] += 1
            if merged.get("status") == "digested":
                counts["skipped_digested"] += 1
                continue
            counts["merged"] += 1
            output_rows.append(merged)
        else:
            counts["orphan"] += 1
            warnings.append(f"WARN: orphan {trace_id}")
            # Keep orphan row but ensure required default fields exist.
            orphan = dict(existing)
            if not orphan.get("status"):
                orphan["status"] = "active"
            if not orphan.get("phase"):
                orphan["phase"] = "trace"
            if orphan.get("status") == "digested":
                counts["skipped_digested"] += 1
                continue
            output_rows.append(orphan)

    # Then new traces (in fs but not in CSV).
    for trace_id, (meta, fs_file_val) in fs_traces.items():
        if trace_id in existing_rows:
            continue
        # Don't resurrect a row that was intentionally removed by digest.
        if meta.get("status") == "digested":
            counts["skipped_digested"] += 1
            continue
        new_row = _new_row(headers, trace_id, meta, fs_file_val)
        counts["new"] += 1
        output_rows.append(new_row)

    if dry_run:
        return {
            "dry_run": True,
            "index": len(output_rows),
            "counts": counts,
            "warnings": warnings,
        }

    with open(csv_path, "w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=headers)
        writer.writeheader()
        for row in output_rows:
            writer.writerow({h: row.get(h, "") for h in headers})

    return {
        "index": len(output_rows),
        "counts": counts,
        "warnings": warnings,
    }
