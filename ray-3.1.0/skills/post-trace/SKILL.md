---
name: post-trace
description: >-
  代码已写完后的逆向 trace 流水线。分析 git diff，反推生成符合 /trace 格式的需求文档、更新 CSV 索引、补测试、质量审查，并通过
  /update-map 完成知识沉淀——全部事后执行。适用于代码改动已完成但跳过了 trace、测试和文档的场景。
  触发词：'post-trace'、'补文档'、'补 trace'、'事后 trace'、'retroactive trace'，或用户想补齐已有改动的正式文档时。
---

# Post-Trace — 事后补全流水线

代码已写完，现在补齐 trace 流程中缺失的需求文档、测试、审查和知识沉淀。

<critical-rules>
- 仅 Phase 0 暂停确认，确认后全自动（除非审查 score < 60 需人工介入）
- 从代码推导，不凭空想象——trace 文档必须忠实反映已有实现
- 格式与 /trace 一致——产出 trace 文件为纯 markdown，使用新 ID 格式，写入 index.csv
- 尊重已有 trace——同模块/组件已有 trace 文件时优先追加而非新建
</critical-rules>

## 模式检查

> 命令中 `<RAY_ROOT>` = 提示头部 `Base directory for this skill:` 路径剥掉末尾 `/skills/<name>`（例 `/.../ray/3.1.0/skills/post-trace` → `/.../ray/3.1.0`）；勿原样传 shell。

调用 `resolve_docs_root()` 获取 `(docs_root, mode)`（具体命令见 Phase 1：`python3 <RAY_ROOT>/scripts/ray/ ...`）。docs / external / inline 模式均允许。

## 快捷模式

| 参数 | 效果 |
|------|------|
| `--doc-only` | 仅执行 Phase 0->1->5（trace 文档 + 知识沉淀，跳过测试和审查） |
| `--test-only` | 仅执行 Phase 0->2（仅补测试） |
| `--audit-only` | 仅执行 Phase 0->3+4（仅审查 + 自动修复） |
| `--no-fix` | 审查但不自动修复，仅报告问题 |

默认执行全部 Phase。

---

## 执行流程

### Phase 0: 变更分析 -- 唯一确认点

1. **收集变更范围** — `git diff main --stat / --name-only / 完整 diff`（用户指定 commit range 时从用户）
2. **阅读产品地图** — 读 `{docs_root}/product/PRODUCT-MAP.md`，确定受影响模块和组件。不存在则降级读 `{docs_root}/traces/index.csv` 按 module 列定位
3. **阅读变更文件** — 逐个阅读关键变更文件，理解改动意图
4. **输出变更摘要** 并等待用户确认：涉及模块、受影响组件、改动类型、建议 ID 类型
5. 确认后 Phase 1-5 全自动执行

### Phase 1: Trace 文档反推

从已有代码反推需求文档，格式与 `/trace` 输出完全一致。

1. **生成 ID**：`python3 <RAY_ROOT>/scripts/ray/ --generate-id --type {type} --title "{title}" --date {YYYY-MM-DD}`
2. **读取受影响组件文件**：三层路径加载（PRODUCT-MAP -> module index -> ComponentName.md）
3. **计算 Baseline 哈希**：SHA256 前 8 位。注意：post-trace 的 Baseline 反映实现后状态
4. **起草 Trace 文档**：按 references/trace-template.md 模板填充，所有内容从代码反推
5. **写入文件**：写入 `{docs_root}/traces/{2hex}/{FEAT-ID}/trace.md`（`{2hex}` 取 FEAT-ID 4 位 hex 的前 2 位），若 index.csv 不存在先 `--init`，追加 CSV 行

### Phase 2: 测试补充

先检查变更文件是否已有对应测试，已有且覆盖充分则跳过。

1. 扫描现有测试，分析测试缺口
2. 补写测试——遵循项目 QA 规范，复用同包 `__tests__/` 中的现有测试风格
3. 运行测试确保 GREEN
4. 更新 trace 文件迭代统计

### Phase 3+4: 质量审查 & 自动修复

审查与修复合并为自治循环。评分维度和决策逻辑详见 references/audit-loop.md。

核心流程：审查打分 -> >= 80 通过 -> 60-79 自动修复后重审（最多 2 轮）-> < 60 停止等人工。审查完成后回填 trace 的审计得分和技术债。

### Phase 5: 知识沉淀

执行 `/update-map` 完成 trace 侧沉淀；产品手册更新延后到 `/digest`：

1. **CSV 更新**（/update-map）：index.csv phase/status 改为 done；files.csv / tests.csv / apis.csv / tech_debt.csv 追加行
2. **追加 trace ADR**（/update-map）：在 trace 文件追加"实现追溯"段（代码变更 / ADR / 迭代统计）
3. **产品手册同步**（/digest）：调用 `/digest` 将本次反推 trace 归纳到 `{docs_root}/product/` 组件文件、用户旅程、关系表（产品手册的唯一日常归纳入口）

### Phase 6: 完成报告

输出结构化摘要：ID、标题、模块/组件、各产出物状态、审查得分、技术债、自动修复项、文件变更清单。

---

<rules>

1. **最小侵入** — 只补缺失的文档/测试/类型，不重构现有代码（除非审查发现 CRITICAL/MAJOR）
2. **不破坏现有功能** — 每次修改后都跑测试
3. **MINOR 不动代码** — MINOR 级别问题只记 Open Issues，不自动修改代码
4. **双向原子更新关系表** — 修改组件关系时，必须同时更新两端文件
5. **Baseline 是事后快照** — 明确标注 Baseline 哈希反映实现后状态，非实现前

</rules>
