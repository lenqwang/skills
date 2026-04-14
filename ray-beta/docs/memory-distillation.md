# 记忆蒸馏系统

Ray 内置四层记忆蒸馏架构，让 Agent 从交互中积累经验，而非每次从零开始。

## 核心理念

记忆不是存储问题，而是**注意力分配问题**。大多数交互不值得记录。系统通过多层过滤、自然衰减、聚类提炼，确保只有真正改变未来行为的信号被保留。

## 统一架构

记忆系统和经验进化系统共享同一套存储和蒸馏管道：

```
                    ┌─ /mem-gate（交互信号）source: "gate"
L0 Gate 过滤 ───────┤
                    └─ /grow（工程经验）   source: "grow"
                           ↓
              L1 Episodes（统一存储）
                           ↓ 3+ 条聚类 / 高频加速晋升
              L2 Patterns（抽象模式）
                           ↓ 5+ 证据 + 14天 + 矛盾
              L3 Judgments（决策规则）
                           ↓
              /mem-recall 激活 → 指导下一次实践
```

### 两个写入源

| 来源 | Skill | type | 视角 |
|------|-------|------|------|
| 交互信号 | `/mem-gate` | discovery, decision, correction, preference, workflow | "发生了什么" |
| 工程经验 | `/grow` | pattern, pitfall, skill-gap, optimization, convention | "怎么解决" |

两者写入同一个 `.ray/memory/l1-episodes/`，通过 `source` 字段区分。`/mem-recall` 和 `/mem-distill` 统一处理所有 L1，不区分来源。

## L1 Episode — 统一格式

```yaml
---
id: "ep-{YYYYMMDD}-{slug}"
source: "gate" | "grow"
type: "discovery | decision | pattern | pitfall | ..."
timestamp: "{ISO8601}"
situation: "{上下文 / 问题描述}"
action: "{采取的行动 / 解决方案}"
outcome: "{结果 / 预防措施}"
# grow 来源额外字段
root_cause: "{根因分析}"        # 仅 grow
solution: "{具体方案}"          # 仅 grow
prevention: "{预防措施}"        # 仅 grow
related_skills: [coder, audit]  # 仅 grow
# 共用字段
context_tags: [...]
verification: "UNTESTED | WORKED | FAILED | CORRECTED"
strength: 1.0
confidence: "high | medium | low"
access_count: 0
last_accessed: "{ISO8601}"
---
```

## 蒸馏流程（/mem-distill）

### 常规蒸馏（Sleep Cycle）

1. **L1 衰减清理** — strength < 0.1 删除
2. **L1 聚类** — 共享 >= 2 tag → 同簇，簇大小 >= 3 → 候选 Pattern
3. **L2 Pattern 提取** — 抽象、可迁移
4. **Episode 溶解** — 贡献了 Pattern 的 Episode strength -50%
5. **L2 → L3 晋升** — 5+ 证据 + 14天 + 经历矛盾

### 经验加速晋升

对 `source: "grow"` 的 L1 Episode 执行额外检查：

| 条件 | 行动 |
|------|------|
| 同 type 同 tags > 3 条 | **直接提取为 L2 Pattern**，跳过正常聚类流程 |
| confidence: high + type: convention | **直接提取为 L2 Pattern**（type: PREFERENCE） |
| 超过 90 天 + UNTESTED | 降级或删除 |

高频/高置信度条目加速晋升为 L2，而非建议修改外部配置。L2 经过正常 L3 晋升流程后，自然成为系统的决策规则。

## 自动化触发

| 时机 | 动作 | 配置 |
|------|------|------|
| **SessionStart** | 注入记忆摘要 | `memory.session_start_mode` |
| **Skill 执行前** | /mem-recall 激活 | `memory.auto_recall` |
| **git commit** | /mem-gate 写入 L1 | `memory.gate_on_commit` |
| **完成/决策短语** | /grow 写入 L1 | `evolve.phrase_trigger` |
| **会话结束** | defer/stop/agent | `memory.session_end_mode` |

## 存储位置

```
.ray/memory/
├── l1-episodes/     # gate + grow 统一写入
├── l2-patterns/     # 从 L1 聚类或加速晋升
├── l3-judgments/    # 从 L2 晋升
└── MEMORY.md        # 索引
```

可通过 `.ray/config.json` 的 `paths.memory` 自定义。
