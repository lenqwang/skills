#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Preflight: resolve_docs_root + environment checks."""

import os
import re
import subprocess
import sys
from pathlib import Path


def _detect_worktree_main_repo(project_dir):
    """If project_dir is a git worktree, return main repo Path; else None.

    `git rev-parse --git-common-dir` returns ".git" (relative) inside the main
    repo and an absolute path to main's .git inside a worktree.
    """
    try:
        result = subprocess.run(
            ["git", "rev-parse", "--git-common-dir"],
            cwd=project_dir, capture_output=True, text=True, check=True,
        )
    except (subprocess.CalledProcessError, FileNotFoundError, OSError):
        return None
    common_dir = result.stdout.strip()
    if not common_dir:
        return None
    common_path = Path(common_dir)
    if not common_path.is_absolute():
        return None
    if common_path.name == ".git":
        return common_path.parent
    return common_path


def _strip_inline_comment(value):
    """Strip ` #...` trailing comments outside quoted spans, yaml-style."""
    in_squote = in_dquote = False
    for i, ch in enumerate(value):
        if ch == '"' and not in_squote:
            in_dquote = not in_dquote
        elif ch == "'" and not in_dquote:
            in_squote = not in_squote
        elif ch == "#" and not in_squote and not in_dquote:
            # Comment must be preceded by whitespace (or be at start)
            if i == 0 or value[i - 1].isspace():
                return value[:i]
    return value


def _read_docs_url(config_yaml_path):
    """Parse `docs_url:` from a yaml file without depending on PyYAML.

    Handles single-line plain / single-quoted / double-quoted scalar values,
    and inline `#` comments outside quoted spans. Multi-line block scalars are
    not supported (overkill for a URL field).
    """
    try:
        text = config_yaml_path.read_text(encoding="utf-8")
    except OSError:
        return None
    for line in text.splitlines():
        m = re.match(r"^\s*docs_url\s*:\s*(.*?)\s*$", line)
        if not m:
            continue
        raw = m.group(1)
        if not raw:
            continue
        # Quoted: take the content between matching quotes verbatim (no comment strip).
        if (raw.startswith('"') and raw.rstrip().endswith('"')) or (
            raw.startswith("'") and raw.rstrip().endswith("'")
        ):
            stripped = raw.rstrip()
            inner = stripped[1:-1]
            return inner or None
        # Plain scalar: strip inline comment, then trim whitespace.
        cleaned = _strip_inline_comment(raw).strip()
        return cleaned or None
    return None


_LINK_OPTIONS = [
    {"key": "a", "label": "重试"},
    {"key": "b", "label": "改用 git clone（0b fallback）"},
    {"key": "c", "label": "中止"},
]

_CLONE_OPTIONS = [
    {"key": "a", "label": "重试"},
    {"key": "b", "label": "改用 inline 模式（如本仓内有 docs/）"},
    {"key": "c", "label": "中止"},
]


def resolve_docs_root(project_dir="."):
    """
    Detect docs mode and return (docs_root, mode), or signal user decision / error.

    Priority:
      0a. external worktree symlink — `.ray/config.yaml` has docs_url +
          `.ray/docs/` missing + current dir is a worktree + main repo's
          `.ray/docs/` exists + non-Windows platform
          → os.symlink(main_repo/.ray/docs, .ray/docs)
      0b. external clone fallback   — same precondition as 0a but conditions
          not met (Windows / not a worktree / main lacks .ray/docs/)
          → git clone {docs_url} .ray/docs/
      1a. external mode (valid)     — `.ray/docs/` is a real dir or a symlink
          pointing to a valid directory
      1b. external broken symlink   — `.ray/docs` is a symlink whose target is
          missing → need_user_decision (a retry / b rm-link / c abort)
      2.  docs mode  — root product/PRODUCT-MAP.md, no docs/
      3.  inline mode — docs/product/PRODUCT-MAP.md or docs/traces/index.csv
      4.  error      — none of the above match

    Returns one of:
      {"docs_root": str, "mode": "external|docs|inline"}                  — success
      {"error": str}                                                      — unrecoverable
      {"need_user_decision": True, "context": str, "options": [...]}      — needs prompt

    Failure semantics:
      - .ray/config.yaml lacks docs_url → fall through to priority 1+
        (does not auto-mount; preserves inline detection if applicable)
      - 0a symlink failure (OSError) → need_user_decision (a 重试 / b clone / c 中止)
      - 0b clone failure (non-zero exit) → need_user_decision (a 重试 / b inline / c 中止)
      - 1b broken symlink → need_user_decision (a 重试 / b rm-link 走 0b / c 中止)
    """
    p = Path(project_dir)
    config_file = p / ".ray" / "config.yaml"
    ray_docs = p / ".ray" / "docs"

    # Priority 0: auto-mount when config exists but .ray/docs is missing
    if config_file.is_file() and not (ray_docs.exists() or ray_docs.is_symlink()):
        docs_url = _read_docs_url(config_file)
        if docs_url:
            main_repo = _detect_worktree_main_repo(project_dir)
            # 0a 仅 Unix-like 平台启用；Windows symlink 需 dev mode/管理员权限，直接走 0b
            use_symlink = (
                sys.platform != "win32"
                and main_repo is not None
                and (main_repo / ".ray" / "docs").is_dir()
            )

            if use_symlink:
                # Priority 0a: worktree symlink to main repo's .ray/docs
                main_docs = main_repo / ".ray" / "docs"
                try:
                    ray_docs.parent.mkdir(parents=True, exist_ok=True)
                    os.symlink(str(main_docs), str(ray_docs))
                except OSError as e:
                    return {
                        "need_user_decision": True,
                        "context": (
                            f"创建软链接失败：{e}\n"
                            f"主仓 .ray/docs: {main_docs}\n"
                            f"目标软链接: {ray_docs}"
                        ),
                        "options": _LINK_OPTIONS,
                    }
            else:
                # Priority 0b: git clone fallback
                try:
                    ray_docs.parent.mkdir(parents=True, exist_ok=True)
                    proc = subprocess.run(
                        ["git", "clone", docs_url, str(ray_docs)],
                        capture_output=True, text=True, check=False,
                    )
                except (FileNotFoundError, OSError) as e:
                    return {
                        "need_user_decision": True,
                        "context": f"git clone 异常：{e}\ndocs_url: {docs_url}",
                        "options": _CLONE_OPTIONS,
                    }
                if proc.returncode != 0:
                    stderr = (proc.stderr or "").strip()
                    hint_lines = [f"docs_url: {docs_url}"]
                    if "Permission denied" in stderr:
                        hint_lines.append("提示：检查 SSH key 配置（~/.ssh/config）或仓库访问权限")
                    elif re.search(r"Authentication failed|could not read Username|could not read Password|fatal: unable to access", stderr, re.IGNORECASE):
                        hint_lines.append("提示：检查 HTTPS credential helper（git config --global credential.helper）或 docs_url 是否含错凭据")
                    return {
                        "need_user_decision": True,
                        "context": (
                            f"git clone 失败：{stderr or 'unknown error'}\n"
                            + "\n".join(hint_lines)
                        ),
                        "options": _CLONE_OPTIONS,
                    }
            # 0a/0b succeeded — fall through to priority 1

    # Priority 1: external mode — .ray/docs exists (real dir or valid symlink)
    if ray_docs.is_dir():
        return {"docs_root": str(ray_docs), "mode": "external"}
    if ray_docs.is_symlink():
        # Symlink present but target broken — surface as user_decision rather
        # than silently returning a path that downstream reads will fail on.
        try:
            target = os.readlink(str(ray_docs))
        except OSError:
            target = "(无法读取链接目标)"
        return {
            "need_user_decision": True,
            "context": (
                f".ray/docs 是软链接但指向无效目标：{ray_docs}\n"
                f"指向：{target}\n"
                f"主仓 .ray/docs/ 可能已迁移、被删，或当前 worktree 与主仓路径漂移。"
            ),
            "options": [
                {"key": "a", "label": "重试（修复主仓 .ray/docs/ 后重跑）"},
                {"key": "b", "label": "删除本地软链接，下次解析走 0b clone"},
                {"key": "c", "label": "中止"},
            ],
        }

    # Priority 2: docs mode — root product/, no docs/
    if (p / "product" / "PRODUCT-MAP.md").is_file() and not (p / "docs").is_dir():
        return {"docs_root": str(p), "mode": "docs"}

    # Priority 3: inline mode — docs/ subdir alongside code
    if (p / "docs" / "product" / "PRODUCT-MAP.md").is_file():
        return {"docs_root": str(p / "docs"), "mode": "inline"}
    if (p / "docs" / "traces" / "index.csv").is_file():
        return {"docs_root": str(p / "docs"), "mode": "inline"}

    return {"error": "cannot detect docs root — run /origin to initialize"}


PREFLIGHT_ALIASES = {
    "git": "git", "mode": "git",
    "docs": "docs",
    "indexes": "indexes", "csv": "indexes",
    "config": "config", "claude": "config",
    "trace": "trace", "trace-id": "trace",
}

PREFLIGHT_ORDER = ["git", "docs", "indexes", "config", "trace"]


def preflight(project_dir=".", checks=None):
    """
    Run layered preflight checks. Returns structured result.

    Checks (semantic names, cumulative):
      git      — git repo + mode detection (external/docs/inline)
      docs     — docs root available (clone if external mode)
      indexes  — PRODUCT-MAP, CSV
      config   — CLAUDE.md + test command
      trace    — resolve TRACE_ID from branch/file
    """
    # normalize check names
    raw = checks or ["git"]
    normalized = []
    for c in raw:
        alias = PREFLIGHT_ALIASES.get(c.strip().lower(), c.strip().lower())
        if alias not in normalized:
            normalized.append(alias)

    p = Path(project_dir)
    result = {"ok": True, "mode": None, "docs_root": None, "warnings": [], "errors": []}

    # --- git: environment basics ---
    if "git" in normalized:
        if not (p / ".git").is_dir():
            result["errors"].append("not a git repository")
            result["ok"] = False
            return result

        dr = resolve_docs_root(project_dir)
        if "error" in dr:
            result["errors"].append(dr["error"])
            result["ok"] = False
            return result
        if dr.get("need_user_decision"):
            result["ok"] = False
            result["need_user_decision"] = True
            result["context"] = dr.get("context", "")
            result["options"] = dr.get("options", [])
            return result
        result["mode"] = dr["mode"]
        result["docs_root"] = dr["docs_root"]

    # --- docs: docs availability ---
    if "docs" in normalized and result["ok"]:
        docs_root = Path(result["docs_root"])

        product_map = docs_root / "product" / "PRODUCT-MAP.md"
        if not product_map.is_file():
            index_csv = docs_root / "traces" / "index.csv"
            if not index_csv.is_file():
                result["warnings"].append("PRODUCT-MAP.md not found — run /origin")

    # --- indexes: product docs + CSV ---
    if "indexes" in normalized and result["ok"]:
        docs_root = Path(result["docs_root"])
        traces_dir = docs_root / "traces"

        if traces_dir.is_dir():
            index_csv = traces_dir / "index.csv"
            needs_rebuild = False

            if not index_csv.is_file():
                needs_rebuild = True
            else:
                # Check header format matches current schema
                from . import CSV_TABLES
                expected = CSV_TABLES["index"]["headers"]
                try:
                    first_line = index_csv.read_text(encoding="utf-8").split("\n")[0].strip()
                    actual = [h.strip() for h in first_line.split(",")]
                    if actual != expected:
                        needs_rebuild = True
                except (OSError, IndexError):
                    needs_rebuild = True

            if needs_rebuild:
                from .rebuild import rebuild_csv
                counts = rebuild_csv(traces_dir)
                if "error" not in counts:
                    result["warnings"].append(f"index.csv rebuilt: {counts.get('index', 0)} rows")
                    result["csv_rebuilt"] = True
                else:
                    result["warnings"].append("index.csv missing and rebuild failed")
                    result["csv_init_needed"] = True

        learnings = docs_root / "learnings"
        if not learnings.is_dir():
            result["warnings"].append("docs/learnings/ missing — will be created on first manual /learn add")

    # --- config: CLAUDE.md ---
    if "config" in normalized and result["ok"]:
        claude_md = p / "CLAUDE.md"
        if not claude_md.is_file():
            result["warnings"].append("CLAUDE.md not found — project config missing")
        else:
            content = claude_md.read_text(encoding="utf-8", errors="replace")
            has_test = bool(re.search(r"测试命令|test.*command|npm test|vitest|jest|pytest|go test", content, re.IGNORECASE))
            if not has_test:
                result["warnings"].append("CLAUDE.md has no test command — pipeline/coder/qa will fail")

    # --- trace: trace context ---
    if "trace" in normalized and result["ok"]:
        trace_id = None

        try:
            branch = subprocess.run(
                ["git", "rev-parse", "--abbrev-ref", "HEAD"],
                cwd=project_dir, capture_output=True, text=True
            ).stdout.strip()
            match = re.search(r"((?:FEAT|BUG|PATCH|REFACTOR|CHORE)-[0-9a-f]{4})", branch, re.IGNORECASE)
            if match:
                trace_id = match.group(1).upper()
        except Exception:
            pass

        if trace_id:
            result["trace_id"] = trace_id
        else:
            result["warnings"].append("no TRACE_ID found in branch name")

    return result
