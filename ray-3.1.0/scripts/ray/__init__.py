#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
ray — Ray CLI toolkit package.

Subcommands:
  python3 -m ray --resolve-docs-root [--json]          # detect mode: external/docs/inline; exits 0=ok / 1=error / 2=need_user_decision
  python3 -m ray --preflight git,docs,indexes [--json]  # layered environment checks
  python3 -m ray "<query>" [--domain <domain>]          # BM25 artifact search
  python3 -m ray --rebuild-csv [--project-dir <path>]   # rebuild CSV indexes
  python3 -m ray --generate-id --type FEAT --title "…"  # generate FEAT-ID
  python3 -m ray --init                                 # init CSV files

Modes:
  external   — multi-project: .ray/docs/ submodule holds shared docs repo
  docs  — in docs repo: product/PRODUCT-MAP.md at root, no code
  inline  — single repo: docs/ subdir contains product docs alongside code
"""

import io
import sys

# Force UTF-8
if sys.stdout.encoding and sys.stdout.encoding.lower() != "utf-8":
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
if sys.stderr.encoding and sys.stderr.encoding.lower() != "utf-8":
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="utf-8")


# ============================================================================
# Constants
# ============================================================================

_INDEX_HEADERS = [
    "id", "type", "phase", "module", "component", "title",
    "keywords", "status", "author", "date", "file",
    "repos", "depends_on", "depended_by",
]

_FILES_HEADERS = ["feat_id", "path", "desc", "lines"]
_TESTS_HEADERS = ["feat_id", "path", "count"]
_APIS_HEADERS = ["feat_id", "method", "path", "desc"]
_TECH_DEBT_HEADERS = ["feat_id", "td_id", "priority", "desc", "added", "resolved_by"]

CSV_TABLES = {
    "index": {
        "file": "index.csv",
        "search_cols": ["id", "title", "module", "component", "keywords"],
        "output_cols": _INDEX_HEADERS,
        "headers": _INDEX_HEADERS,
    },
    "archive": {
        "file": "archive.csv",
        "search_cols": ["id", "title", "module", "component", "keywords"],
        "output_cols": _INDEX_HEADERS,
        "headers": _INDEX_HEADERS,
    },
    "files": {
        "file": "files.csv",
        "search_cols": ["feat_id", "path", "desc"],
        "output_cols": _FILES_HEADERS,
        "headers": _FILES_HEADERS,
    },
    "tests": {
        "file": "tests.csv",
        "search_cols": ["feat_id", "path"],
        "output_cols": _TESTS_HEADERS,
        "headers": _TESTS_HEADERS,
    },
    "apis": {
        "file": "apis.csv",
        "search_cols": ["feat_id", "method", "path", "desc"],
        "output_cols": _APIS_HEADERS,
        "headers": _APIS_HEADERS,
    },
    "tech_debt": {
        "file": "tech_debt.csv",
        "search_cols": ["feat_id", "td_id", "desc"],
        "output_cols": _TECH_DEBT_HEADERS,
        "headers": _TECH_DEBT_HEADERS,
    },
}

VALID_TYPES = ("FEAT", "BUG", "REFACTOR", "PATCH", "CHORE")
VALID_STATUSES = ("active", "confirmed", "audited", "shipped", "digested", "abandoned")
