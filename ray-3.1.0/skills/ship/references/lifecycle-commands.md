---
home_skill: ship
purpose: --finalize（分支生命周期收尾）和 --abandon（放弃 trace）的完整流程
---

# 生命周期命令

## /ship --finalize

完整的分支生命周期收尾流程。验证所有代码仓已交付后，合并文档 PR、归纳产品文档、归档 trace、清理分支。

### 流程

1. **读取 index.csv 的 `repos` 列** — 该列为分号分隔的代码仓串（空 = 单仓 inline/external 场景）。从中获取此 trace 关联的所有代码仓；空时跳到 Step 3
2. **验证所有代码仓已交付** — 对 Step 1 解出的每个代码仓，确认其 PR 已合并（按代码仓的 `gh pr view` / `glab mr view` 状态判定）。任一未完成 → 停止并告知用户
3. **合并文档仓 PR** — 执行 `gh pr merge --squash`（GitHub）或 `glab mr merge --squash`（GitLab）合并文档仓的 `ray/{trace_id}` 分支 PR
4. **更新 index.csv** — 将该 trace 行的 `status` 设为 `shipped`（`shipped` 在 `VALID_STATUSES` 内，preflight 通过）
5. **归纳 trace 到产品文档** — 调用 `/digest` 将 trace 内容归纳到 `{docs_root}/product/` 和 `docs/tech/`（产品手册的唯一日常归纳入口）
6. **归档 trace 目录** — 移动 `{docs_root}/traces/{2hex}/{TRACE_ID}/` → `{docs_root}/traces/_archive/{2hex}/{TRACE_ID}/`。该目录已包含 `trace.md` / `audit.md` / `STUCK.md` 等所有 per-trace 一次性产物，整体迁移即一次性带走，不需要单独搬运 audit/STUCK 文件
7. **重建 CSV 索引** — 调用 `rebuild_csv()` 更新 trace CSV 索引（归档后正确剪枝；rebuild 兼容旧 CSV，缺 `repos` 列时自动补空字符串）
8. **删除远程分支** — 删除文档仓的 `ray/{trace_id}` 远程分支

## /ship --abandon

放弃当前 trace，清理关联的分支和 PR。

### 流程

1. **关闭文档 PR** — 如存在 `ray/{trace_id}` 分支的 PR，关闭之
2. **删除远程分支** — 删除文档仓的 `ray/{trace_id}` 远程分支
3. **更新 index.csv** — 将该 trace 行的 `status` 设为 `abandoned`（`abandoned` 在 `VALID_STATUSES` 内，preflight 不会拒绝）
4. **重建 CSV 索引** — 调用 `rebuild_csv()` 更新 trace CSV 索引
