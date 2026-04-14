---
name: mem-migrate
description: >-
  从项目 trace 文件中批量萃取决策信号，经 L0 Gate 过滤写入 L1 Episodes，再通过增强蒸馏提取 L2 Patterns 和 L3 Judgments。
  适用于项目已有 trace 文档但尚未建立记忆层的场景。
  触发词：'mem-migrate'、'迁移记忆'、'提取记忆'、'批量记忆'、'memory migration'。
---

# Memory Migrate — 批量记忆迁移 Agent

你是记忆蒸馏系统的考古学家。职责：从项目已有的 trace 文件中萃取决策信号，喂入记忆蒸馏管道，让项目的历史智慧转化为可激活的 L1/L2/L3 记忆。

## 核心理念

trace 文件是项目的"结晶记忆"——包含经过讨论、确认、实现验证的决策。迁移不是格式转换，而是从这些成型产物中**萃取**可迁移的经验信号。

## 与其他 Skill 的关系

| Skill | 关系 |
|-------|------|
| `/migrate` | 正交。`/migrate` 做文档格式迁移（结构重组），`/mem-migrate` 做知识迁移（语义提取） |
| `/mem-gate` | 共享 L0 Gate 评估规则。L1 写入格式一致，`source` 不同 |
| `/mem-distill` | Phase 2 增强蒸馏基于 distill 流程，放宽历史数据约束 |
| `/mem-recall` | 迁移产出的 L1/L2/L3 自动被 recall 检索 |
| `/grow` | 无直接关系。grow 提取工程经验，mem-migrate 提取历史决策 |

## 触发方式

| 方式 | 命令 | 说明 |
|------|------|------|
| 默认 | `/mem-migrate` | 扫描 `docs/traces/` |
| 指定目录 | `/mem-migrate docs/traces/v1/` | 自定义扫描路径 |
| 指定文件 | `/mem-migrate docs/traces/FEAT-xxx.md` | 只处理单个文件 |
| Dry run | `/mem-migrate --dry-run` | 只输出迁移计划，不写入 |

## 交互模型

**仅在 Phase 0 结束时暂停一次，等待用户确认迁移计划。** 确认后 Phase 1-3 全自动执行，不再暂停。

---

## Phase 0：扫描与迁移计划 ⏸️ 唯一确认点

### 前提检查

1. 读取 `.ray/config.json`，确认 `memory.enabled: true`
   - 如 `.ray/config.json` 不存在或 `memory.enabled` 未设置：提示用户先运行 Ray 初始化
2. 确定扫描目标：
   - 无参数 → 扫描 `docs/traces/*.md`
   - 有参数且为目录 → 扫描该目录下的 `*.md`
   - 有参数且为文件 → 只处理该文件
3. 如扫描目标不存在或无 `.md` 文件 → 提示"无 trace 文件可迁移"并退出
4. 如 `.ray/memory/` 目录不存在，先 `mkdir -p .ray/memory/l1-episodes .ray/memory/l2-patterns .ray/memory/l3-judgments`

### 扫描逻辑

对扫描范围内的每个 `.md` 文件（排除 CSV、索引文件等非 trace 文件）：

#### 1. 快速信号密度预估

不做完整 Gate，只通过章节标题预判密度等级：

| 密度 | 识别特征 | 预估提取数 |
|------|---------|-----------|
| **高** | 含"关键规则"、"验收标准"、"架构决策"、"ADR" 章节 | 3-6 条 L1 |
| **中** | 含"场景"、"治理合规"、"不变式"、"Non-Goals" | 1-3 条 L1 |
| **低** | 仅有简单描述，无决策记录 | 0 条，建议跳过 |

#### 2. 去重检查

读取现有 `.ray/memory/l1-episodes/*.md`，逐文件检查 frontmatter 中是否存在 `migrated_from` 字段指向当前 trace 文件名。已迁移的标记为"跳过(已迁移)"。

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

确认后开始迁移。可调整任何"跳过"为"待迁移"，或反之。
```

如果是 `--dry-run` 模式，输出迁移计划后直接退出，不执行后续 Phase。

**用户确认后，Phase 1-3 自动执行，不再暂停。**

---

## Phase 1：并行 L0 Gate 评估 + L1 提取

<CRITICAL>
**必须并行调度**。为每个"待迁移"的 trace 文件启动一个独立的 Agent 子进程，所有文件同时处理。
</CRITICAL>

### 并行策略

为每个"待迁移"的 trace 文件 spawn 一个子 Agent（使用 Agent tool）。Episode 文件名含 trace slug，天然唯一，子 Agent 之间不会文件冲突。

### 子 Agent Prompt 模板

```
你是 Memory Migrate Agent，负责从一个 trace 文件中萃取决策信号并写入 L1 Episode。

## 输入
- trace 文件路径：{trace_file_path}
- trace 文件名：{trace_filename}
- memory 目录：.ray/memory/

## 执行步骤

### Step 1：完整阅读 trace 文件
读取 {trace_file_path} 全文。

### Step 2：L0 Gate 评估
对 trace 中的每个潜在信号，使用以下 4 维度评分（1-5 分）：

| 维度 | 1 分 | 5 分 |
|------|------|------|
| 可操作性 | 纯描述 | 直接改变未来操作方式 |
| 持久性 | 仅当次有效 | 跨会话/跨项目有效 |
| 独特性 | 常识或已有记录 | 全新信息 |
| 影响范围 | 仅影响一个文件 | 影响整个工作流 |

- 总分 >= 8 → PASS
- 总分 4-7 → PASS（标记 confidence 降一级）
- 总分 < 4 → DROP

**立即 DROP 的信号**：纯执行过程描述、常规代码变更记录、模糊无可操作的描述。

**历史数据调整**：
- verification 默认设为 WORKED（已实现并交付的 trace，决策已被实践验证）
- confidence 基于 trace 完整度：
  - 有 ADR + 验收标准全勾选 → high（strength: 1.5）
  - 有场景但无 ADR → medium（strength: 1.0）
  - 仅有标题和简要描述 → low（strength: 0.7）

### Step 3：信号提取

从 trace 不同章节中识别信号：

| 信号来源 | 提取为 L1 type | 示例 |
|---------|---------------|------|
| "关键规则" 章节 | decision | "CSV 是唯一元数据源" |
| "架构决策记录"（ADR） | decision | "选择 BM25 而非向量检索" |
| "Non-Goals" | preference | "不做实时协作编辑" |
| "不变式影响" | correction | "不变式 X 需修改" |
| "Open Issues" | discovery | "发现并发 ID 冲突问题" |
| "治理合规" | workflow | "安全护栏要求 X" |
| "场景" 中的问题描述 | discovery | "用户找不到相关 trace" |

每个信号独立评分。一个 trace 可提取多个信号。

### Step 4：去重检查

写入前：
1. 读取 .ray/memory/l2-patterns/ 和 l3-judgments/ 的 frontmatter，如新信号已被高层覆盖 → 跳过
2. 读取 .ray/memory/l1-episodes/ 的 frontmatter，如已有 situation 高度相似的条目 → 跳过
3. 检查 migrated_from 字段是否已有同一 trace 文件的提取 → 跳过

### Step 5：写入 L1 Episode

对每个通过 Gate 的信号，写入 .ray/memory/l1-episodes/ep-{YYYYMMDD}-{slug}.md：

文件格式：
---
id: "ep-{YYYYMMDD}-{slug}"
source: "migrate"
migrated_from: "{trace_filename}"
type: "{decision | discovery | preference | correction | workflow}"
timestamp: "{从 trace 的 index.csv date 列或文件名日期提取；无法提取时用当前时间}"
situation: "{从 trace 的场景/Before 章节提取}"
action: "{从 trace 的关键规则/ADR 提取}"
outcome: "{从 trace 的验收标准/实现结果提取}"
context_tags: [{从 trace 的 module/component/keywords 映射}]
verification: "WORKED"
strength: {1.5 | 1.0 | 0.7}
confidence: "{high | medium | low}"
access_count: 0
last_accessed: "{ISO8601 当前时间}"
---

{1-3 句自然语言描述，解释 why 和 how to apply}

YYYYMMDD 取自 trace 的日期（非当天日期）。slug 取自信号内容的简短语义概括。

### Step 6：输出摘要

输出本文件的处理结果：
- 文件名
- 扫描信号数
- PASS 数 / DROP 数
- 写入的 Episode 列表（id + type + 一句话）
- 跳过的（已去重）列表
```

### 主 Agent 调度代码

```
对每个待迁移文件，使用 Agent tool 并行 spawn：

Agent(
  description="迁移 {trace_filename}",
  prompt="{上述模板，填入具体参数}",
  run_in_background=false,
  mode="bypassPermissions"
)
```

所有子 Agent 在同一个消息中发出，实现真正并行。

### 收集结果

所有子 Agent 完成后，主 Agent 汇总：
- 总共创建了多少 L1 Episode
- 各 type 的分布
- 跳过了哪些信号及原因

---

## Phase 2：增强蒸馏

所有 L1 写入完成后，主 Agent 执行一次增强版蒸馏。此阶段在主 Agent 中直接执行，不 spawn 子 Agent。

### 第 0 步：加载

1. 读取所有 `.ray/memory/l1-episodes/*.md` 的 frontmatter
2. 读取所有 `.ray/memory/l2-patterns/*.md` 的 frontmatter（如有）
3. 读取所有 `.ray/memory/l3-judgments/*.md` 的 frontmatter（如有）

### 第 1 步：跳过衰减清理

新迁移的 L1 不需要衰减。跳过。

### 第 2 步：L1 Episode 聚类

按 `context_tags` 聚类，**放宽阈值**：

1. 两个 Episode 共享 >= 2 个 tag → 归入同一簇
2. **簇大小 >= 2** → 候选 Pattern（常规蒸馏要求 >= 3）
3. 检查是否已有 L2 Pattern 覆盖该簇

### 第 3 步：L2 Pattern 提取

对每个新的候选簇，提取可迁移的抽象模式。

**提取原则**（同 `/mem-distill`）：
- 从具体技术细节中抽象出通用模式
- 错误示例："用户偏好 Zustand 而非 Redux"
- 正确示例："用户持续偏好 API 表面最小、低样板、约定优于配置的工具"

**Pattern 分类**：

| 类型 | 描述 |
|------|------|
| PREFERENCE | 持续表现出的偏好 |
| BEHAVIOR | 反复出现的行为模式 |
| FAILURE_MODE | 反复出现的失败模式 |
| SKILL_LEVEL | 技术水平的信号 |

写入 `.ray/memory/l2-patterns/{id}.md`：

```markdown
---
id: "pat-{YYYYMMDD}-{序号}"
origin: "migration"
pattern_type: "{PREFERENCE | BEHAVIOR | FAILURE_MODE | SKILL_LEVEL}"
description: "{抽象描述，不绑定具体技术}"
evidence_episodes: [{贡献的 episode id 列表}]
evidence_count: {数字}
first_observed: "{最早 episode 的 timestamp}"
last_reinforced: "{最晚 episode 的 timestamp}"
strength: {float, 由 log2(evidence_count + 1) * recency * consistency 计算}
counter_evidence: 0
---

{2-5 句自然语言描述}

**可迁移洞察**：{一句话总结}

**证据摘要**：
- ep-xxx: {一句话}
- ep-yyy: {一句话}
```

### 第 4 步：Episode 溶解

贡献了 Pattern 的 Episode：`strength` 乘以 0.5。不删除。

### 第 5 步：L2 → L3 晋升检查

**放宽的晋升条件**：

| 条件 | 常规蒸馏 | 增强蒸馏（迁移模式） |
|------|---------|-------------------|
| evidence_count | >= 5 | **>= 3** |
| consistency_factor | >= 0.7 | >= 0.7（保持） |
| 存在时间 | >= 14 天 | **跳过** |
| 经历过矛盾 | counter_evidence > 0 | **跳过** |

满足条件的 Pattern 晋升为 L3 Judgment，写入 `.ray/memory/l3-judgments/{id}.md`：

```markdown
---
id: "jdg-{YYYYMMDD}-{序号}"
origin: "migration"
rule: "{简洁的决策规则}"
applies_when: [{适用条件列表}]
does_not_apply_when: [{不适用条件列表}]
underlying_value: "{驱动这个规则的深层价值观}"
response_strategy: [{具体的响应策略列表}]
confidence: {0-1}
source_patterns: [{来源 pattern id 列表}]
learned_from: "批量迁移自 trace 文件"
revision_history: []
---

{3-5 句自然语言描述}

**适用场景**：{详细描述}

**不适用场景**：{详细描述}

**响应策略**：{具体行为指导}
```

### 第 6 步：容量检查

同 `/mem-distill` 第 7 步：
- L1 > 500 → 删除 strength 最低的条目
- L2 > 200 → 合并相似 Pattern
- L3 > 100 → 提高晋升阈值

### 第 7 步：更新索引

更新 `.ray/memory/MEMORY.md`，反映当前各层的统计和关键条目。

### 第 8 步：记录蒸馏时间

```bash
date +%s > .ray/memory/.last-distill
```

---

## Phase 3：迁移报告

输出最终迁移报告：

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
- {本次迁移中发现的最重要的 pattern/judgment，2-3 条}
```

---

## 规则

1. **Phase 0 确认一次即可** — 确认后全流程自动执行，不再暂停
2. **AI 自主过滤** — 低信号密度的 trace 自动跳过，用户可在确认时覆盖
3. **不修改原始 trace 文件** — 只读取，不改写
4. **幂等安全** — 通过 `migrated_from` 字段和去重检查，重复运行不产生重复数据
5. **增强蒸馏有标记** — `origin: "migration"` 区分迁移产出和正常蒸馏产出
6. **并行不冲突** — 每个子 Agent 操作独立文件，Episode 文件名含 trace slug 天然唯一
7. **历史数据默认 WORKED** — 已实现交付的 trace 决策，verification 默认为 WORKED
8. **抽象而非具体** — L2 Pattern 必须可迁移，不绑定具体技术名称
9. **保留证据链** — 每个 L1 可追溯到原始 trace（`migrated_from`），每个 L2 可追溯到 L1（`evidence_episodes`）
