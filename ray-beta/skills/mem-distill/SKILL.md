---
name: mem-distill
description: 执行记忆蒸馏过程：L1 Episode 聚类 → L2 Pattern 提取 → Episode 溶解 → L3 Judgment 晋升。支持手动触发和条件自动触发。
---

# Memory Distill — 记忆蒸馏器

你是记忆蒸馏系统的炼金术士。职责：将具体的 L1 Episode 提炼为抽象的 L2 Pattern，再将成熟的 Pattern 晋升为 L3 Judgment。

## 触发方式

| 方式 | 时机 | 条件 |
|------|------|------|
| **手动** | `/mem-distill` | 无条件执行 |
| **SessionEnd** | 会话结束时 | L1 >= 10 条 且 距上次蒸馏 >= 24h |
| **Pipeline** | Phase 6.5 之后 | L1 >= 10 条 且 距上次蒸馏 >= 24h |
| **强制** | `distill_on_session_end: true` | 忽略条件，每次 SessionEnd 都执行 |

条件触发避免了低 L1 数量时的无效蒸馏和高频重复蒸馏。上次蒸馏时间记录在 `.ray/memory/.last-distill`。

## 蒸馏流程（Sleep Cycle）

### 第 0 步：加载配置和现有记忆

1. 读取 `.ray/config.json` 获取配置参数
2. 读取所有 `.ray/memory/l1-episodes/*.md` 的 frontmatter
3. 读取所有 `.ray/memory/l2-patterns/*.md` 的 frontmatter
4. 读取所有 `.ray/memory/l3-judgments/*.md` 的 frontmatter

### 第 1 步：L1 衰减与清理

对每个 L1 Episode 计算当前 strength：

```
current_strength = base_strength * e^(-decay_rate * hours_since_last_accessed)
```

其中 `decay_rate` 由 `verification` 状态决定：
- UNTESTED: 0.015（半衰期 ~46h）
- WORKED: 0.005（半衰期 ~139h）
- FAILED: 0.003（半衰期 ~231h）
- CORRECTED: 0.002（半衰期 ~346h）

**清理**：`current_strength < 0.1` 的 Episode → 删除文件

### 第 2 步：L1 Episode 聚类

按 `context_tags` 聚类：

1. 两个 Episode 共享 >= 2 个 tag → 归入同一簇
2. 簇大小 >= 3 → 候选 Pattern
3. 对每个候选簇，检查是否已有覆盖它的 L2 Pattern（通过 `evidence_episodes` 字段）

### 第 3 步：L2 Pattern 提取

对每个新的候选簇，提取可迁移的抽象模式：

**提取原则**：
- 从具体技术细节中抽象出通用模式
- 错误示例："用户偏好 Zustand 而非 Redux"
- 正确示例："用户持续偏好 API 表面最小、低样板、约定优于配置的工具"

**Pattern 分类**：

| 类型 | 描述 | 示例 |
|------|------|------|
| PREFERENCE | 持续表现出的偏好 | "偏好约定优于配置" |
| BEHAVIOR | 反复出现的行为模式 | "总是先写测试再写实现" |
| FAILURE_MODE | 反复出现的失败模式 | "在异步竞态条件下容易出错" |
| SKILL_LEVEL | 技术水平的信号 | "熟悉 TypeScript 泛型高级用法" |

写入 `.ray/memory/l2-patterns/{id}.md`：

```markdown
---
id: "pat-{YYYYMMDD}-{序号}"
pattern_type: "{PREFERENCE | BEHAVIOR | FAILURE_MODE | SKILL_LEVEL}"
description: "{抽象描述，不绑定具体技术}"
evidence_episodes: [{贡献的 episode id 列表}]
evidence_count: {数字}
first_observed: "{ISO8601}"
last_reinforced: "{ISO8601}"
strength: {float}
counter_evidence: 0
---

{2-5 句自然语言描述}

**可迁移洞察**：{一句话总结，可以应用到不同技术栈/项目的通用洞察}

**证据摘要**：
- ep-xxx: {一句话}
- ep-yyy: {一句话}
```

**强度计算**：
```
strength = log2(evidence_count + 1) * recency_factor * consistency_factor
recency_factor = e^(-0.001 * hours_since_last_reinforced)
consistency_factor = 1 - (counter_evidence / (evidence_count + counter_evidence))
```

### 第 4 步：Episode 溶解

贡献了 Pattern 的 Episode：
- `strength` 减少 50%（乘以 0.5）
- 不删除，仍保留作为 Pattern 的证据链

### 第 5 步：L2 → L3 晋升检查

对每个 L2 Pattern 检查晋升条件（全部满足才晋升）：

| 条件 | 阈值 |
|------|------|
| evidence_count | >= 5 |
| consistency_factor | >= 0.7 |
| 存在时间 | >= 14 天 |
| 经历过矛盾 | counter_evidence > 0 且 Pattern 仍成立 |

满足条件的 Pattern 晋升为 L3 Judgment，写入 `.ray/memory/l3-judgments/{id}.md`：

```markdown
---
id: "jdg-{YYYYMMDD}-{序号}"
rule: "{简洁的决策规则}"
applies_when: [{适用条件列表}]
does_not_apply_when: [{不适用条件列表}]
underlying_value: "{驱动这个规则的深层价值观}"
response_strategy: [{具体的响应策略列表}]
confidence: {0-1 的浮点数}
source_patterns: [{来源 pattern id 列表}]
learned_from: "{简述学习过程}"
revision_history: []
---

{3-5 句自然语言描述，解释这个 Judgment 的来龙去脉}

**适用场景**：
{详细描述何时应用这个规则}

**不适用场景**：
{详细描述何时不应用，避免过度泛化}

**响应策略**：
{具体的行为指导}
```

### 第 6 步：Grow 经验健康度评估

对 `source: "grow"` 的 L1 Episode 执行额外的健康度检查：

| 指标 | 健康 | 警告 | 行动 |
|------|------|------|------|
| 同 type 同 context_tags 的条目 | <= 3 条 | > 3 条 | **直接提取为 L2 Pattern**（不等正常聚类流程，加速晋升） |
| 低 confidence 占比 | < 50% | >= 50% | 标记待验证或降级 |
| 无 related_skills | 0 | > 0 | 补充或标记 |
| confidence: high + type: convention | — | 存在 | **直接提取为 L2 Pattern**（type: PREFERENCE），跳过正常聚类阈值 |
| 超过 90 天且 verification 仍为 UNTESTED | 0 | > 0 | 降级 strength 或删除 |

高频/高置信度条目加速晋升为 L2，而非建议修改 CLAUDE.md。L2 Pattern 经过正常的 L3 晋升流程后，自然成为系统的决策规则。

合并操作：创建综合 Episode 或直接提取 L2 Pattern，旧条目在 frontmatter 中添加 `superseded_by: "ep-{new-id}"` 或 `promoted_to: "pat-{id}"`。

### 第 7 步：容量检查

检查各层是否超出容量限制：
- L1 > 500：删除 strength 最低的条目
- L2 > 200：合并相似的 Pattern
- L3 > 100：提高晋升阈值（这种情况极少出现）

### 第 8 步：更新索引

更新 `.ray/memory/MEMORY.md`，反映当前各层的统计和关键条目。

### 第 9 步：报告

输出蒸馏报告：

```
## 蒸馏报告 {日期}

### L1 Episode
- 总数：{N} 条（gate: {G} / grow: {W}）
- 衰减清理：{K} 条
- 溶解降级：{J} 条
- grow 经验合并：{C} 条

### L2 Pattern
- 总数：{N} 条
- 新提取：{M} 条
- 强化已有：{K} 条

### L3 Judgment
- 总数：{N} 条
- 新晋升：{M} 条

### 健康度
- convention 升级建议：{N} 条
- 过期待验证：{N} 条

### 关键发现
- {本次蒸馏的关键发现或趋势}
```

### 第 10 步：记录蒸馏时间

将当前时间戳写入 `.ray/memory/.last-distill`，供下次条件触发检查。

```bash
date +%s > .ray/memory/.last-distill
```

## 增量更新

当已有 L2 Pattern 获得新证据时：
1. 将新 Episode id 加入 `evidence_episodes`
2. `evidence_count` +1
3. 更新 `last_reinforced` 为当前时间
4. 重新计算 `strength`

当出现反证时：
1. `counter_evidence` +1
2. 重新计算 `consistency_factor`
3. 如果 `consistency_factor < 0.3` → Pattern 标记为弱，不参与晋升

## 规则

1. **抽象而非具体** — Pattern 必须可迁移，不绑定具体技术名称
2. **保留证据链** — 每个 Pattern 必须可追溯到 Episode
3. **矛盾透明** — counter_evidence 必须如实记录
4. **不强行晋升** — 宁可留在 L2，不可在 L3 放入低置信度 Judgment
5. **幂等安全** — 多次运行蒸馏不应产生重复 Pattern
6. **最小修改** — 只修改需要更新的文件，不动不相关的记忆
