#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
ray — CLI entry point.

Usage:
  python3 /path/to/scripts/ray/ --resolve-docs-root [--json]
  python3 /path/to/scripts/ray/ --preflight git,docs,indexes [--json]
  python3 /path/to/scripts/ray/ "<query>" [--domain <domain>]
  python3 /path/to/scripts/ray/ --rebuild-csv [--project-dir <path>]
  python3 /path/to/scripts/ray/ --generate-id --type FEAT --title "…"
  python3 /path/to/scripts/ray/ --init
"""

import argparse
import json
import sys
from pathlib import Path

# Bootstrap: when invoked as `python3 /path/to/scripts/ray/`, Python uses
# runpy which doesn't set up the package context. We need to ensure the
# parent dir is on sys.path and import the package properly.
_pkg_dir = str(Path(__file__).resolve().parent.parent)
if _pkg_dir not in sys.path:
    sys.path.insert(0, _pkg_dir)

from ray import CSV_TABLES
from ray.csv_ops import init_csv
from ray.id_gen import generate_feat_id
from ray.migrate import migrate as migrate_buckets
from ray.persist import check_consistency, persist_trace, reconcile
from ray.preflight import preflight, resolve_docs_root
from ray.rebuild import rebuild_csv
from ray.search import format_output, search


def main():
    parser = argparse.ArgumentParser(description="Ray Artifact Search")
    parser.add_argument("query", nargs="?", default="", help="Search query")
    parser.add_argument("--domain", "-d", choices=list(CSV_TABLES.keys()),
                        default="index", help="CSV table to search")
    parser.add_argument("--max-results", "-n", type=int, default=5, help="Max results")
    parser.add_argument("--json", action="store_true", help="Output as JSON")

    # Filters
    parser.add_argument("--module", "-m", type=str, help="Filter by module")
    parser.add_argument("--status", "-s", type=str, help="Filter by status")
    parser.add_argument("--type", "-t", type=str, help="Filter by type (FEAT/BUG/...)")
    parser.add_argument("--phase", type=str, help="Filter by phase (trace/spec/audit)")
    parser.add_argument("--priority", type=str, help="Filter by priority (tech_debt domain)")


    # Init
    parser.add_argument("--init", action="store_true", help="Initialize empty CSV files")

    # Rebuild CSV from file-per-writer state
    parser.add_argument("--rebuild-csv", action="store_true",
                        help="Rebuild all CSV files from {TRACE_ID}/trace.md + state/*.json")

    # Migrate flat trace layout to hash-bucketed layout
    parser.add_argument("--migrate-bucket", action="store_true",
                        help="Migrate flat docs/traces/{ID} entries to docs/traces/{2hex}/{ID}/trace.md")
    parser.add_argument("--dry-run", action="store_true",
                        help="Plan only, no filesystem changes (used with --migrate-bucket or --rebuild-csv)")

    # Project dir
    parser.add_argument("--project-dir", "-p", type=str, default=".",
                        help="Project root directory (default: current dir)")

    # Atomic trace persistence
    parser.add_argument("--persist-trace", action="store_true",
                        help="Atomic write trace.md + append index.csv (replaces _trace-persist Step 4-5)")
    parser.add_argument("--check", action="store_true",
                        help="With --persist-trace: report fs/csv/id-mismatch, no writes")
    parser.add_argument("--reconcile-fs-only", action="store_true",
                        help="With --persist-trace: append fs-only traces to index.csv")
    parser.add_argument("--reconcile-id-mismatch", action="store_true",
                        help="With --persist-trace: rewrite mismatched trace.md heading to dirname id")
    parser.add_argument("--id", type=str, help="Trace ID for --persist-trace")
    parser.add_argument("--source", type=str, choices=["pm", "dev"],
                        help="source role for --persist-trace")
    parser.add_argument("--component", type=str, default="", help="Component for --persist-trace")
    parser.add_argument("--content-file", type=str,
                        help="Path to trace.md content (use - for stdin)")
    parser.add_argument("--repos", type=str, default="", help="Repos column for --persist-trace")
    parser.add_argument("--depends-on", type=str, default="", help="depends_on column")
    parser.add_argument("--depended-by", type=str, default="", help="depended_by column")

    # FEAT-ID generation
    parser.add_argument("--generate-id", action="store_true",
                        help="Generate a FEAT-ID from --type and --title")
    parser.add_argument("--resolve-docs-root", action="store_true",
                        help="Detect project mode (external/docs/inline) and print docs_root")
    parser.add_argument("--preflight", type=str, metavar="CHECKS",
                        help="Run preflight checks. Names: git,docs,indexes,config,trace (comma-separated)")
    parser.add_argument("--title", type=str, help="Title for FEAT-ID generation")
    parser.add_argument("--date", type=str, help="Date for FEAT-ID generation (YYYY-MM-DD)")

    # Empty-repo detection + skeleton init (FEAT-a428)
    parser.add_argument("--detect-empty-repo", action="store_true",
                        help="Detect whether --project-dir is an empty code repo (FEAT-a428 §4.1)")
    parser.add_argument("--init-skeleton", action="store_true",
                        help="Initialize 4-file skeleton under --docs-root (FEAT-a428 §4.2)")
    parser.add_argument("--docs-root", type=str,
                        help="Target docs root for --init-skeleton")
    parser.add_argument("--product-name", type=str,
                        help="Product name for --init-skeleton PRODUCT-MAP.md heading")

    args = parser.parse_args()

    # Resolve traces directory based on project structure.
    # Supports three modes:
    #   docs mode: {project_dir}/traces/      (in docs repo)
    #   external mode:  {project_dir}/traces/      (project_dir = .ray/docs/)
    #   inline mode: {project_dir}/docs/traces/ (single repo)
    project_dir = Path(args.project_dir)
    if (project_dir / "traces").is_dir():
        traces_dir = project_dir / "traces"
    elif (project_dir / "docs" / "traces").is_dir():
        traces_dir = project_dir / "docs" / "traces"
    else:
        # Fallback: assume legacy layout, let downstream handle missing dir
        traces_dir = project_dir / "docs" / "traces"

    # Init mode
    if args.init:
        created = init_csv(traces_dir)
        if created:
            print(f"Initialized CSV files in {traces_dir}: {', '.join(created)}")
        else:
            print(f"All CSV files already exist in {traces_dir}")
        sys.exit(0)

    # Migrate-bucket mode
    if args.migrate_bucket:
        result = migrate_buckets(traces_dir, dry_run=args.dry_run)
        if "error" in result:
            print(f"Error: {result['error']}", file=sys.stderr)
            sys.exit(1)
        if args.json:
            print(json.dumps(result, indent=2, ensure_ascii=False))
        else:
            print(
                f"migrate-bucket: planned={result['planned']} "
                f"moved={result['moved']} failed={result['failed']} "
                f"csv_changes={result['csv_changes']} "
                f"dry_run={result['dry_run']}"
            )
        sys.exit(0 if result.get("failed", 0) == 0 else 1)

    # Rebuild CSV mode
    if args.rebuild_csv:
        result = rebuild_csv(traces_dir, dry_run=args.dry_run)
        if "error" in result:
            print(f"Error: {result['error']}", file=sys.stderr)
            sys.exit(1)
        if args.json:
            print(json.dumps(result, indent=2, ensure_ascii=False))
        else:
            counts = result.get("counts", {})
            prefix = "[dry-run] " if result.get("dry_run") else ""
            verb = "Would write" if result.get("dry_run") else "Rebuilt"
            print(
                f"{prefix}{verb} index.csv: {result.get('index', 0)} rows in "
                f"{traces_dir} (merged={counts.get('merged', 0)} "
                f"new={counts.get('new', 0)} orphan={counts.get('orphan', 0)} "
                f"normalized={counts.get('normalized', 0)} "
                f"skipped_digested={counts.get('skipped_digested', 0)})"
            )
            for warn in result.get("warnings", []):
                print(warn, file=sys.stderr)
        sys.exit(0)

    # Preflight mode
    if args.preflight:
        levels = [l.strip() for l in args.preflight.split(",")]
        result = preflight(str(project_dir), levels)
        if args.json:
            print(json.dumps(result, indent=2, ensure_ascii=False))
            if result.get("need_user_decision"):
                sys.exit(2)
            sys.exit(0 if result["ok"] else 1)
        # Non-JSON path
        if result["ok"]:
            print(f"\u2713 mode={result['mode']} docs_root={result['docs_root']}")
            if result.get("trace_id"):
                print(f"  trace_id={result['trace_id']}")
            for w in result.get("warnings", []):
                print(f"  \u26a0 {w}")
            sys.exit(0)
        if result.get("need_user_decision"):
            print(f"? {result.get('context', 'user decision required')}")
            for opt in result.get("options", []):
                print(f"  {opt.get('key', '?')}) {opt.get('label', '')}")
            sys.exit(2)
        for e in result.get("errors", []):
            print(f"\u2717 {e}")
        sys.exit(1)

    # resolve-docs-root mode
    if args.resolve_docs_root:
        result = resolve_docs_root(str(project_dir))
        if args.json:
            print(json.dumps(result, ensure_ascii=False))
            # Exit code reflects status:
            #   0 = success, 1 = unrecoverable error, 2 = need_user_decision
            if "error" in result:
                sys.exit(1)
            if result.get("need_user_decision"):
                sys.exit(2)
            sys.exit(0)
        # Non-JSON (human-readable) path
        if "error" in result:
            print(f"\u2717 {result['error']}")
            sys.exit(1)
        if result.get("need_user_decision"):
            print(f"? {result.get('context', 'user decision required')}")
            for opt in result.get("options", []):
                print(f"  {opt.get('key', '?')}) {opt.get('label', '')}")
            sys.exit(2)
        print(f"{result['docs_root']}\t{result['mode']}")
        sys.exit(0)

    # Atomic trace persistence
    if args.persist_trace:
        # --check: report only
        if args.check:
            result = check_consistency(traces_dir)
            if "error" in result:
                print(f"Error: {result['error']}", file=sys.stderr)
                sys.exit(1)
            if args.json:
                print(json.dumps(result, indent=2, ensure_ascii=False))
            else:
                c = result["counts"]
                print(f"fs_only={c['fs_only']} csv_only={c['csv_only']} id_mismatch={c['id_mismatch']}")
                for x in result["fs_only"]:
                    print(f"  fs-only: {x}", file=sys.stderr)
                for x in result["csv_only"]:
                    print(f"  csv-only: {x}", file=sys.stderr)
                for x in result["id_mismatch"]:
                    print(f"  id-mismatch: {x}", file=sys.stderr)
            sys.exit(0)

        # --reconcile-*: fix mode
        if args.reconcile_fs_only or args.reconcile_id_mismatch:
            result = reconcile(
                traces_dir,
                fix_fs_only=args.reconcile_fs_only,
                fix_id_mismatch=args.reconcile_id_mismatch,
            )
            if "error" in result:
                print(f"Error: {result['error']}", file=sys.stderr)
                sys.exit(1)
            if args.json:
                print(json.dumps(result, indent=2, ensure_ascii=False))
            else:
                print(
                    f"fixed: fs_only={len(result['fixed_fs_only'])} "
                    f"id_mismatch={len(result['fixed_id_mismatch'])}"
                )
            sys.exit(0)

        # Atomic write mode
        required = ["id", "source", "module", "content_file"]
        missing = [k for k in required if not getattr(args, k)]
        if missing:
            print(f"Error: --persist-trace requires {', '.join('--' + m.replace('_', '-') for m in missing)}",
                  file=sys.stderr)
            sys.exit(1)

        if args.content_file == "-":
            content = sys.stdin.read()
        else:
            try:
                content = Path(args.content_file).read_text(encoding="utf-8")
            except OSError as e:
                print(f"Error: cannot read content-file: {e}", file=sys.stderr)
                sys.exit(1)

        from datetime import date as _date
        type_ = args.id.split("-")[0] if "-" in args.id else ""
        result = persist_trace(
            project_dir,
            args.id,
            content,
            type_=type_,
            source=args.source,
            module=args.module,
            component=args.component,
            title=args.title or "",
            date=args.date or _date.today().isoformat(),
            repos=args.repos,
            depends_on=args.depends_on,
            depended_by=args.depended_by,
        )
        if "error" in result:
            print(f"Error: {result['error']}", file=sys.stderr)
            sys.exit(1)
        if args.json:
            print(json.dumps(result, indent=2, ensure_ascii=False))
        else:
            print(f"persisted: {result['id']} → {result['path']}")
        sys.exit(0)

    # Empty-repo detection (FEAT-a428 §4.1)
    if args.detect_empty_repo:
        from ray.empty_detect import detect_empty_repo
        try:
            result = detect_empty_repo(project_dir)
        except (FileNotFoundError, NotADirectoryError) as e:
            print(f"Error: {e}", file=sys.stderr)
            sys.exit(2)
        except Exception as e:
            print(f"Error: {e}", file=sys.stderr)
            sys.exit(1)
        if args.json:
            print(json.dumps({
                "is_empty": result.is_empty,
                "found_metadata": result.found_metadata,
                "found_source_dirs": result.found_source_dirs,
                "project_dir": result.project_dir,
            }, ensure_ascii=False))
        else:
            md = ",".join(result.found_metadata) if result.found_metadata else "-"
            sd = ",".join(result.found_source_dirs) if result.found_source_dirs else "-"
            print(f"empty: {str(result.is_empty).lower()}   metadata: {md}   source_dirs: {sd}")
        sys.exit(0)

    # Skeleton init (FEAT-a428 §4.2)
    if args.init_skeleton:
        from ray.empty_detect import init_skeleton
        if not args.docs_root or not args.product_name:
            print("Error: --init-skeleton requires --docs-root and --product-name",
                  file=sys.stderr)
            sys.exit(1)
        from datetime import date as _date
        target_root = Path(args.docs_root)
        try:
            init_skeleton(target_root, args.product_name, args.date or _date.today().isoformat())
        except FileExistsError as e:
            print(f"Error: {e}", file=sys.stderr)
            sys.exit(3)
        except PermissionError as e:
            print(f"Error: {e}", file=sys.stderr)
            sys.exit(4)
        except Exception as e:
            print(f"Error: {e}", file=sys.stderr)
            sys.exit(1)
        print(f"skeleton initialized at {target_root}")
        sys.exit(0)

    # FEAT-ID generation mode
    if args.generate_id:
        if not args.type or not args.title:
            print("Error: --generate-id requires --type and --title", file=sys.stderr)
            sys.exit(1)
        feat_id = generate_feat_id(args.type, args.title, args.date)
        if args.json:
            print(json.dumps({"id": feat_id}, ensure_ascii=False))
        else:
            print(feat_id)
        sys.exit(0)

    # Search mode
    filters = {}
    if args.module:
        filters["module"] = args.module
    if args.status:
        filters["status"] = args.status
    if args.type:
        filters["type"] = args.type
    if args.phase:
        filters["phase"] = args.phase
    if args.priority:
        filters["priority"] = args.priority

    result = search(traces_dir, args.query, args.domain, args.max_results, filters)

    if args.json:
        print(json.dumps(result, indent=2, ensure_ascii=False))
    else:
        print(format_output(result))


if __name__ == "__main__":
    main()
