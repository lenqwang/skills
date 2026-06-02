"""Empty-repo detection + skeleton initialization.

Contract: docs/specs/docs-management/origin.spec.md
Source trace: FEAT-a428-origin-空代码仓自动骨架初始化

This module is the single authoritative source for the empty-repo detection
list and the skeleton output schema. SKILL.md prompts MUST call into here
rather than duplicating the metadata/source-dir lists.
"""
from __future__ import annotations

from dataclasses import dataclass, field
from pathlib import Path


EMPTY_REPO_METADATA_FILES: tuple[str, ...] = (
    "package.json",
    "pyproject.toml",
    "go.mod",
    "Cargo.toml",
    "composer.json",
    "Gemfile",
    "pom.xml",
    "build.gradle",
)

EMPTY_REPO_SOURCE_DIRS: tuple[str, ...] = (
    "src",
    "lib",
    "app",
    "packages",
)


@dataclass(frozen=True)
class EmptyRepoDetectionResult:
    is_empty: bool
    found_metadata: list[str] = field(default_factory=list)
    found_source_dirs: list[str] = field(default_factory=list)
    project_dir: str = ""


def detect_empty_repo(project_dir: Path) -> EmptyRepoDetectionResult:
    """Detect whether project_dir is an empty code repo per spec §1.2."""
    project_dir = Path(project_dir)
    if not project_dir.exists():
        raise FileNotFoundError(f"project_dir does not exist: {project_dir}")
    if not project_dir.is_dir():
        raise NotADirectoryError(f"project_dir is not a directory: {project_dir}")

    found_metadata = [
        name for name in EMPTY_REPO_METADATA_FILES
        if (project_dir / name).is_file()
    ]
    found_source_dirs = [
        name for name in EMPTY_REPO_SOURCE_DIRS
        if (project_dir / name).is_dir()
    ]
    is_empty = not found_metadata and not found_source_dirs
    return EmptyRepoDetectionResult(
        is_empty=is_empty,
        found_metadata=found_metadata,
        found_source_dirs=found_source_dirs,
        project_dir=str(project_dir),
    )


_PRODUCT_MAP_TEMPLATE = """# {product_name}

<!--
此文件由 /ray:origin 在空代码仓场景下生成，当前为骨架态。
后续可通过：
  · /ray:propose 启动需求驱动流程，由 propose 写入第一个产品模块
  · 写完代码后 /ray:origin --reconcile 让文档与代码对齐，由 reconcile 填充模块索引
-->

## 模块索引

_暂无模块。_

---

_最后更新：{date}_
"""


def _matches_skeleton_shape(primary: tuple[Path, Path, Path, Path]) -> bool:
    """Validate the 4 existing files have the expected skeleton shape (spec §4.2).

    Idempotency requires content match, not just file presence. We check shape
    rather than byte-exact match because PRODUCT-MAP.md embeds a date that
    rotates daily and a product_name that depends on the project.

    Shape contract:
    - PRODUCT-MAP.md: starts with "# " heading, contains "_暂无模块。_" placeholder
    - .gitkeep: zero bytes
    - index.csv / archive.csv: first line equals the canonical CSV header
    """
    product_map, gitkeep, index_csv, archive_csv = primary

    pm_text = product_map.read_text(encoding="utf-8")
    if not pm_text.startswith("# ") or "_暂无模块。_" not in pm_text:
        return False

    if gitkeep.stat().st_size != 0:
        return False

    from . import CSV_TABLES
    expected_index_header = ",".join(CSV_TABLES["index"]["headers"])
    expected_archive_header = ",".join(CSV_TABLES["archive"]["headers"])
    index_first = index_csv.read_text(encoding="utf-8").splitlines()[:1]
    archive_first = archive_csv.read_text(encoding="utf-8").splitlines()[:1]
    if index_first != [expected_index_header]:
        return False
    if archive_first != [expected_archive_header]:
        return False

    return True


def init_skeleton(docs_root: Path, product_name: str, date: str) -> None:
    """Atomically write the 4 skeleton files under docs_root per spec §2.

    Pre-check: if any of the 4 primary artifacts exist but not all 4 → ABORT
    (FileExistsError). If all 4 exist AND content shape matches → idempotent
    no-op (per spec §4.2). If all 4 exist but content is corrupted → ABORT
    (FileExistsError). Otherwise write all. On any write failure, roll back
    files newly created in this call.
    """
    docs_root = Path(docs_root)
    primary = (
        docs_root / "product" / "PRODUCT-MAP.md",
        docs_root / "product" / "modules" / ".gitkeep",
        docs_root / "traces" / "index.csv",
        docs_root / "traces" / "archive.csv",
    )

    existing = [p for p in primary if p.exists()]
    if existing and len(existing) < len(primary):
        rel = sorted(str(p.relative_to(docs_root)) for p in existing)
        raise FileExistsError(f"partial skeleton state: {rel}")
    if len(existing) == len(primary):
        if _matches_skeleton_shape(primary):
            return  # idempotent
        raise FileExistsError(
            "skeleton files exist but content does not match expected shape; "
            "refusing to overwrite — inspect manually or remove and re-run"
        )

    from .csv_ops import init_csv

    created: list[Path] = []
    try:
        primary[0].parent.mkdir(parents=True, exist_ok=True)
        primary[0].write_text(
            _PRODUCT_MAP_TEMPLATE.format(product_name=product_name, date=date),
            encoding="utf-8",
        )
        created.append(primary[0])

        primary[1].parent.mkdir(parents=True, exist_ok=True)
        primary[1].write_bytes(b"")
        created.append(primary[1])

        traces_dir = docs_root / "traces"
        before = set(traces_dir.glob("*.csv")) if traces_dir.exists() else set()
        try:
            init_csv(traces_dir)
        finally:
            # Track any CSV files that init_csv created, even on partial failure,
            # so the outer except can roll them back.
            after = set(traces_dir.glob("*.csv")) if traces_dir.exists() else set()
            created.extend(sorted(after - before))
    except Exception:
        for p in reversed(created):
            try:
                p.unlink()
            except FileNotFoundError:
                pass
        raise
