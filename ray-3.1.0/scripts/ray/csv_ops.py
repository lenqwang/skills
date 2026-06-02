#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""CSV operations: load, append, init."""

import csv
from pathlib import Path

from . import CSV_TABLES


def load_csv(filepath):
    """Load CSV, return list of dicts. Returns [] if file missing."""
    if not filepath.exists():
        return []
    with open(filepath, "r", encoding="utf-8") as f:
        return list(csv.DictReader(f))


def append_csv(filepath, row, headers):
    """Append a row to CSV. Creates file with headers if missing."""
    exists = filepath.exists() and filepath.stat().st_size > 0
    with open(filepath, "a", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=headers)
        if not exists:
            writer.writeheader()
        writer.writerow(row)


def init_csv(traces_dir):
    """Initialize all CSV files with headers in docs/traces/."""
    traces_dir = Path(traces_dir)
    traces_dir.mkdir(parents=True, exist_ok=True)
    created = []
    for table_name in CSV_TABLES:
        config = CSV_TABLES[table_name]
        filepath = traces_dir / config["file"]
        if not filepath.exists():
            with open(filepath, "w", encoding="utf-8", newline="") as f:
                writer = csv.writer(f)
                writer.writerow(config["headers"])
            created.append(config["file"])
    return created
