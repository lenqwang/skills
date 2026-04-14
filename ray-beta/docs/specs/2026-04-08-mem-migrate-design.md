# `/mem-migrate` — 批量记忆迁移 Skill 设计

> 日期：2026-04-08
> 状态：Draft

## 概述

从项目已有的 trace 文件（`docs/traces/`）中萃取决策信号，经 L0 Gate 过滤后写入 L1 Episodes，再通过增强蒸馏提取 L2 Patterns 和 L3 Judgments。

**定位**：`/migrate` 处理文档格式迁移（结构重组），`/mem-migrate` 处理知识迁移（语义提取）。两者正交。

**适用范围**：任意使用 Ray 的项目，不限于 Ray 插件自身。

## 核心理念

trace 文件是项目的"结晶记忆"——包含经过讨论、确认、实现验证的决策。迁移不是格式转换，而是从这些成型产物中**萃取**出可迁移的经验信号，喂入记忆蒸馏管道。

## 流程

```
Phase 0: 扫描 + 迁移计划 ⏸️ 唯一确认点
Phase 1: 并行 L0 Gate 评估 + L1 Episode 提取
Phase 2: 增强蒸馏（L1 → L2 → L3，放宽历史数据约束）
Phase 3: 迁移报告
```

---

## Phase 0：扫描与迁移计划 ⏸️ 确认点

### 前提检查

1. 读取 `.ray/config.json`，确认 `memory.enabled: true`
2. 确认 `docs/traces/` 目录存在且包含 `.md` 文件
3. 如目录不存在或为空，提示"无 trace 文件可迁移"并退出

### 扫描逻辑

对 `docs/traces/*.md` 中的每个文件：

1. **快速信号密度预估**（不做完整 Gate，只预判高/中/低）：
   - **高密度**：含"关键规则"、"验收标准"、"架构决策"章节
   - **中密度**：含"场景"、"治理合规"、"不变式"
   - **低密度**：仅有简单描述，无决策记录
2. **去重检查**：读取现有 `.ray/memory/l1-episodes/`，检查是否已有 `migrated_from` 指向该 trace 的 Episode。已迁移的标记为"跳过(已迁移)"

### 迁移计划输出

```
## 迁移计划

| trace 文件 | 信号密度 | 预估提取数 | 状态 |
|-----------|---------|-----------|------|
| FEAT-b2c4-realtime-price.md | 高 | ~5 L1 | 待迁移 |
| BUG-e1c2-price-flicker.md | 中 | ~2 L1 | 待迁移 |
| PATCH-xxx-typo-fix.md | 低 | 0 | 跳过(AI) |
| FEAT-a3f7-swap.md | 高 | — | 跳过(已迁移) |

总计：{N} 个文件待处理，预估 {M} 条 L1 Episode

确认后开始迁移。
```

用户可在确认前手动调整——把"跳过"改为"待迁移"，或反之。

**用户确认后，Phase 1-3 自动执行，不再暂停。**

---

## Phase 1：并行 L0 Gate 评估 + L1 提取

### 并行策略

为每个"待迁移"的 trace 文件 spawn 一个独立子 Agent。所有子 Agent 同时启动，互不冲突（Episode 文件名含 trace slug，天然唯一）。

### 子 Agent 职责

每个子 Agent 处理一个 trace 文件，执行以下步骤：

#### 1. 完整阅读 trace 文件

读取 trace 文件全文，理解需求背景、决策过程、实现结果。

#### 2. L0 Gate 评估

使用与 `/mem-gate` 相同的 PASS/DROP 规则和信号密度评分（4 维度 1-5 分：可操作性、持久性、独特性、影响范围）。

**历史数据调整**：
- `verification` 默认设为 `WORKED`（已实现并交付的 trace，其决策已被实践验证）
- `confidence` 基于 trace 的完整度：
  - 有 ADR + 验收标准全勾选 → `high`
  - 有场景但无 ADR → `medium`
  - 仅有标题和简要描述 → `low`

#### 3. 信号提取

从 trace 的不同章节中识别信号：

| 信号来源 | 提取为 L1 type | 示例 |
|---------|---------------|------|
| "关键规则" 章节 | `decision` | "CSV 是唯一元数据源" |
| "架构决策记录"（ADR） | `decision` | "选择 BM25 而非向量检索" |
| "Non-Goals" | `preference` | "不做实时协作编辑" |
| "不变式影响" | `correction` | "不变式 X 需修改" |
| "Open Issues" | `discovery` | "发现并发 ID 冲突问题" |
| "治理合规" | `workflow` | "安全护栏要求 X" |
| "场景" 中的问题描述 | `discovery` | "用户找不到相关 trace" |

#### 4. 去重检查

写入前检查现有 L1/L2/L3，如新信号已被高层覆盖则跳过。

#### 5. 写入 L1 Episode

格式与 `/mem-gate` 完全一致，增加迁移标记：

```markdown
---
id: "ep-{YYYYMMDD}-{slug}"
source: "migrate"
migrated_from: "{trace_filename}"
type: "decision | discovery | preference | correction | workflow"
timestamp: "{优先从 trace 的 index.csv date 列或文件名日期提取；无法提取时用当前时间}"
situation: "{从 trace 的场景/Before 章节提取}"
action: "{从 trace 的关键规则/ADR 提取}"
outcome: "{从 trace 的验收标准/实现结果提取}"
context_tags: [{从 trace 的 module/component/keywords 映射}]
verification: "WORKED"
strength: 1.0
confidence: "high | medium | low"
access_count: 0
last_accessed: "{ISO8601}"
---

{1-3 句自然语言描述}
```

---

## Phase 2：增强蒸馏

所有 L1 写入完成后，执行一次增强版蒸馏。

### 与常规蒸馏的区别

| 维度 | 常规蒸馏 (`/mem-distill`) | 增强蒸馏（迁移模式） | 原因 |
|------|-------------------------|-------------------|------|
| L2 聚类阈值 | 3+ Episode | 2+ Episode | 历史 trace 信号密度高 |
| L3 存在时间 | >= 14 天 | 跳过 | 历史数据本身跨越足够长的时间 |
| L3 矛盾验证 | counter_evidence > 0 | 跳过 | 已交付的决策，矛盾已在开发中解决 |
| L3 evidence_count | >= 5 | >= 3 | 适度降低 |
| L3 consistency | >= 0.7 | >= 0.7（保持） | 不放宽一致性 |
| L1 衰减清理 | 执行 | 跳过 | 新迁移的 L1 不需要衰减 |

### 蒸馏步骤

1. **跳过**衰减清理（新迁移的 L1 不需要衰减）
2. L1 聚类（放宽到 2+ Episode，共享 >= 2 tag → 同簇）
3. L2 Pattern 提取（同 `/mem-distill` 第 3 步）
4. Episode 溶解（strength * 0.5）
5. L2 → L3 晋升检查（放宽时间和矛盾要求）
6. 容量检查（同 `/mem-distill` 第 7 步）
7. 更新 `.ray/memory/MEMORY.md` 索引

### 迁移标记

迁移蒸馏产出的 L2/L3 文件中增加 `origin: "migration"` 字段：

```yaml
# L2 Pattern
origin: "migration"

# L3 Judgment
origin: "migration"
```

便于与正常蒸馏产出区分，支持后续追溯。

### 蒸馏时间戳

蒸馏完成后更新 `.ray/memory/.last-distill`。

---

## Phase 3：迁移报告

```
## 批量记忆迁移报告

### 数据源
- 扫描 trace 文件：{total} 个
- AI 过滤跳过：{skipped_by_ai} 个（低信号密度）
- 已迁移跳过：{skipped_existing} 个
- 实际处理：{processed} 个

### L1 Episodes
- 新建：{created} 条（source: "migrate"）
- 信号类型分布：decision {N} / discovery {N} / preference {N} / correction {N} / workflow {N}

### L2 Patterns（增强蒸馏）
- 新提取：{N} 条
- 类型分布：PREFERENCE {N} / BEHAVIOR {N} / FAILURE_MODE {N} / SKILL_LEVEL {N}

### L3 Judgments（增强蒸馏）
- 新晋升：{N} 条

### 关键发现
- {本次迁移中发现的最重要的 pattern/judgment}
```

---

## 触发方式

| 方式 | 命令 | 说明 |
|------|------|------|
| 默认 | `/mem-migrate` | 扫描 `docs/traces/` |
| 指定目录 | `/mem-migrate docs/traces/v1/` | 自定义扫描路径 |
| 指定文件 | `/mem-migrate docs/traces/FEAT-xxx.md` | 只处理单个文件 |
| Dry run | `/mem-migrate --dry-run` | 只输出迁移计划，不写入 |

## 幂等性

通过 `migrated_from` 字段和去重检查保证重复运行不产生重复数据。Phase 0 扫描时会标记已迁移的文件为"跳过"。

## 与现有 Skill 的关系

| Skill | 关系 |
|-------|------|
| `/migrate` | 正交。`/migrate` 做文档格式迁移，`/mem-migrate` 做知识迁移 |
| `/mem-gate` | 共享 L0 Gate 评估规则。L1 写入格式一致，source 不同 |
| `/mem-distill` | Phase 2 增强蒸馏基于 distill 流程，放宽历史数据约束 |
| `/mem-recall` | 迁移产出的 L1/L2/L3 自动被 recall 检索 |
| `/grow` | 无直接关系。grow 提取工程经验，mem-migrate 提取历史决策 |

## 规则

1. **Phase 0 确认一次即可** — 确认后全流程自动执行
2. **AI 自主过滤** — 低信号密度的 trace 自动跳过
3. **不修改原始 trace 文件** — 只读取，不改写
4. **幂等安全** — 重复运行不产生重复数据
5. **增强蒸馏有标记** — `origin: "migration"` 区分迁移产出和正常蒸馏产出
6. **并行不冲突** — 每个子 Agent 操作独立文件
