---
name: migrate
description: 迁移工具集。将旧格式产品文档迁移为三层 wiki 结构（--docs），将旧 YAML frontmatter trace 迁移为 CSV 索引体系（--index），或将单仓文档迁移到独立文档仓（--to-docs）
---

# Migrate — 格式迁移 Agent

你是格式迁移专家。职责：将旧格式的文档和索引安全地迁移为新格式，保留所有内容，不丢失数据。

## 三种迁移模式

| 参数 | 用途 | 详细剧本 |
|------|------|---------|
| `/migrate --docs` | 旧格式单文件 `modules/{name}.md` → 三层 wiki 结构 | [references/migrate-docs.md](references/migrate-docs.md) |
| `/migrate --index` | 旧格式 trace（YAML frontmatter + `YYYY-MM-DD-{feature}.md`）→ CSV 索引 + `{TYPE}-{4hex}-{slug}.md` | [references/migrate-index.md](references/migrate-index.md) |
| `/migrate --to-docs` | 单仓模式 `docs/product/` + `docs/traces/` → 独立文档仓 | [references/migrate-to-docs.md](references/migrate-to-docs.md) |

### 无参数自检测

1. 如 `docs/product/modules/` 下存在 `.md` 文件（非目录）→ 建议 `--docs`
2. 如 `docs/traces/` 下存在含 YAML frontmatter 的 `.md` 文件且无 `index.csv` → 建议 `--index`
3. 如 `.ray/config.yaml` 存在 且 (`docs/product/` 非空 或 `docs/traces/` 非空) 且 `.ray/docs/` 内对应目录为空或缺失 → **直接进入 `--to-docs` 流程**（不输出"建议"，不再询问子命令选择；traces-only 场景同样命中）
4. 多种条件同时满足 → 建议先 `--docs` 再 `--index` 最后 `--to-docs`
5. 都不需要 → 提示"无需迁移"

---

## 通用原则（所有 flavor 共用）

1. **保留所有手写内容** — 不丢弃任何人工编写的产品洞察
2. **拆分不重写** — 除了格式适配，不改变原有描述
3. **搬移用 `git mv`** — 保留 history，不留 `.bak`（仅解析失败需手动审阅时例外；详见 `## 规则` 第 2 条）
4. **确认后执行** — 展示迁移计划，等待用户确认后才开始
5. **写意图不写代码** — 如旧文档中有代码引用，迁移时改写为业务意图描述

### 模式检查

> 命令中 `<RAY_ROOT>` = 提示头部 `Base directory for this skill:` 路径剥掉末尾 `/skills/<name>`（例 `/.../ray/3.1.0/skills/migrate` → `/.../ray/3.1.0`）；勿原样传 shell。该约定对本 skill 引用的 references 同样适用。

调用 `resolve_docs_root()` 获取 `(docs_root, mode)`。

**docs 模式下**：允许。把已有代码仓里的文档迁出到文档仓。
**external 模式下**：允许。正常执行。
**inline 模式下**：允许。正常执行。

---

## 执行模板

所有三种 flavor 共享以下骨架，具体 Phase 内容按参数跳转到对应 reference：

```
1. 验证前提条件（见对应 reference 的"前提检查"段）
2. Phase 0：扫描旧资源 ⏸️ 用户确认迁移计划
3. Phase 1..N：按 reference 剧本执行
4. 最终 Phase：输出迁移报告
```

按用户传入的参数加载对应 reference 继续：

- `--docs` → [references/migrate-docs.md](references/migrate-docs.md)（Phase M0 → M1 并行 → M2 → M3 → 协议出口）
- `--index` → [references/migrate-index.md](references/migrate-index.md)（Phase I0 → I1 → I2 → I3 → I4（分桶 → 3.0 终态）→ I5（迁移报告）→ 协议出口）
- `--to-docs` → [references/migrate-to-docs.md](references/migrate-to-docs.md)（Phase T-1（条件触发：自动挂载）→ T0 → T1 → T2 → T3 → T4 → T5 → 协议出口）

---

## 协议出口（所有 flavor 共用，最终 Phase 之后）

> 主归属 skill = `_trace-persist`，定义见 `skills/_trace-persist/references/public-protocols.md`。

迁移报告打印完成后，按当前 flavor 调用一次 `auto_commit_push`，把全部迁移产物落入一个 commit：

| flavor | 调用 |
|--------|------|
| `--docs` | `auto_commit_push(TRACE_ID="migrate-docs", "migrate", "迁移产品文档为三层 wiki 结构（{N} 模块 / {N} 组件文件）")` |
| `--index` | `auto_commit_push(TRACE_ID="migrate-index", "migrate", "迁移 YAML frontmatter trace 为 CSV 索引体系（trace={N} / spec={M} / audit={K}）")` |
| `--to-docs` | `auto_commit_push(TRACE_ID="migrate-to-docs", "migrate", "迁移单仓 docs 至独立文档仓（product={N} / trace={M} / state={K}）")` |

**触发约束**：

1. **dry-run 模式不触发**：若用户传入 `--dry-run` 或剧本停留在"打印迁移计划等待确认"阶段，跳过协议出口（仅打印计划，无写入即无 commit）。
2. **inline 模式 no-op 保留**：`auto_commit_push` 在 `inline` 模式下自身就是 no-op（见 public-protocols.md），单仓由用户自管 git。本 skill 不额外处理。
3. **仅在迁移真正完成（最终 Phase 写入完成、报告打印完毕）后调用一次**，不在中间 Phase 反复调用。
4. **`--to-docs` 的跨仓 push** 由 `auto_commit_push` 协议层统一处理：external/docs 模式无条件 `git push origin main`（不再按路径分流，也不再询问），inline 模式 no-op。详见 `_trace-persist/references/public-protocols.md` 的 `auto_commit_push` 段。

---

## 关键约束

- **迁移单调向前**：任一子命令（`--docs` / `--index` / `--to-docs`）的产物必须直接对齐 ray 当前版本（3.0）的架构终态——`{docs_root}/traces/{2hex}/{FEAT-ID}/trace.md` 分桶 + 14 列 CSV（含 `repos`）+ trace.md 头部含 `> source:` 与（开发者补全后）`> completeness:`。不允许"先迁到中期形态再让用户跑第二次"；新发布版本架构变化时 migrate 同步更新，不堆积兼容路径
- **配置即推导**：能从 `.ray/config.yaml` + 文件系统状态推导出的下一步操作直接执行，不得反问。HARD-GATE 仅作为最后一道安全网，不作为常规分支
- **挂载交协议**：检测 `.ray/config.yaml` 含 `docs_url` 且 `.ray/docs/` 缺失时，由 `resolve_docs_root()` 自动 clone（见 [_trace-persist 公共协议](../_trace-persist/references/public-protocols.md)），不在 migrate 内重复实现 clone 步骤
- **搬移用 `git mv`**：保留 history，不留 `.bak`（仅在解析失败需手动审阅时保留 `.bak`）
- **迁移前自动 reconcile**：迁移真正写入前自动调用 `--persist-trace --reconcile`——fs-only 自动补 CSV，csv-only 标 orphan WARN 留待人决策，不阻塞主流程

## 规则

1. **不丢数据** — 所有手写内容必须保留
2. **搬移用 `git mv`** — 保留 history，不留 `.bak`（解析失败的少数情况例外）
3. **确认再执行** — 展示完整迁移计划，用户确认后才动手（破坏性多文件搬移的最后安全网）
4. **幂等** — 重复运行不应产生重复数据（自动挂载在 `.ray/docs/` 已存在时跳过；分桶迁移在目标 trace.md 已存在且内容一致时跳过）
5. **不修改源码** — 只操作 `docs/` 目录
6. **双向原子更新** — 关系表修改必须两端同步
7. **写意图不写代码** — 迁移时将代码引用改写为业务意图描述
8. **单调向前** — 产物即时对齐当前版本架构终态，不留中期形态
