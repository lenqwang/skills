---
home_skill: pipeline
purpose: 所有 Phase 共享的测试执行规则（单一权威定义，消除重复）
---

# 测试执行规则

Pipeline 内所有涉及测试的 Phase 统一遵循以下规则：

1. **强制 run 模式，禁止 watch** — 测试跑完必须自动退出进程
   - vitest: `pnpm vitest run {file}`
   - jest: `pnpm jest --no-watchAll {file}`
   - pytest: `pytest {file}`
   - go test: `go test ./...`
2. **优先跑单文件** — `{测试命令} {具体文件}` 而非全量
3. **全量只跑一次** — 仅在最终确认阶段跑一次全量回归
4. **测试进程必须退出** — 卡在 watch 时立即 Ctrl+C，检查是否遗漏 `--run`

## 各级别测试策略速查

| 级别 | 预写测试 | 每轮跑法 | 上限 |
|------|---------|---------|------|
| PATCH | 不预写，跑现有测试，按需补回归 | 单文件 | 修复最多 3 轮 |
| FEATURE | Phase 3 预写（验证 RED 最多 2 次） | 单文件，最终全量 1 次 | coder 自愈最多 10 轮 |
| REFACTOR | 不预写，跑现有测试 | 单文件 | 修复最多 3 轮 |
