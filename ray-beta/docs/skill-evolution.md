# Skill 自动进化系统

Ray 的进化系统从工程实践中自动提取经验，直接写入记忆蒸馏管道，让经验自然晋升为决策规则。

## 核心原则

> 每一单元的工程工作应该让后续工作更容易，而非更难。 — 复合工程

## 与记忆系统的统一

进化系统不再是独立的存储——`/grow` 提取的经验直接写入 L1 Episode（`source: "grow"`），与 `/mem-gate` 的交互信号（`source: "gate"`）共享同一套蒸馏管道：

```
/grow 提取经验
  ↓ 直接写入
L1 Episode (source: "grow", type: pattern/pitfall/...)
  ↓ 高频加速 / 正常聚类
L2 Pattern
  ↓ 5+ 证据 + 14天 + 矛盾
L3 Judgment
  ↓
/mem-recall 激活 → 指导下一次工程实践
```

没有中间存储、没有延迟同步、没有交叉去重。写入即参与蒸馏。

## /grow — 经验提取

### 触发方式

1. **自动**：检测到完成/决策短语时 spawn 后台 Agent
2. **Pipeline**：Phase 6.5 自动执行
3. **手动**：`/grow`

### 自动检测的短语

| 类型 | 中文 | 英文 |
|------|------|------|
| 完成 | 搞定了、解决了、修好了、测试通过… | fixed, it works, all tests pass… |
| 决策 | 决定用、选择方案、改用、换成… | decided to use, go with, switch to… |

### 经验类型

| type | 说明 | 蒸馏后果 |
|------|------|---------|
| `pattern` | 成功的可复用模式 | → L2 BEHAVIOR |
| `pitfall` | 踩过的坑 | → L2 FAILURE_MODE |
| `skill-gap` | 现有 skill 遗漏 | 触发 Skill 改进建议 |
| `optimization` | 流程优化 | → L2 BEHAVIOR |
| `convention` | 项目约定 | 高频后 → L2 PREFERENCE（而非 CLAUDE.md） |

### 写入格式

直接写入 `.ray/memory/l1-episodes/ep-{YYYYMMDD}-{slug}.md`：

```yaml
---
id: "ep-{YYYYMMDD}-{slug}"
source: "grow"
type: "pattern"
situation: "问题描述"
action: "解决方案"
outcome: "结果和预防"
root_cause: "根因分析"
solution: "具体方案"
prevention: "预防措施"
related_skills: [coder, audit]
context_tags: [react, testing]
confidence: "high"
strength: 1.5
verification: "UNTESTED"
---
```

### Skill 改进建议（Phase 3-4）

`/grow` 除了写入 L1，还会分析经验对现有 skill 的影响：
- 输出具体改进建议（哪个 skill、哪个 section、加什么）
- 修改 SKILL.md 需用户确认（HARD-GATE）

## 加速晋升

`/mem-distill` 对 `source: "grow"` 的 L1 执行额外检查：

| 条件 | 行动 |
|------|------|
| 同 type + 同 tags > 3 条 | **直接提取为 L2 Pattern**，跳过正常聚类阈值 |
| confidence: high + type: convention | **直接提取为 L2 PREFERENCE** |
| 90 天 + UNTESTED | 降级或删除 |

高频经验不建议修改 CLAUDE.md——而是加速晋升为 L2 Pattern，再通过正常流程晋升 L3 Judgment。这让系统自己决定什么规则足够稳定。

## 配置

```json
// .ray/config.json
{
  "evolve": {
    "enabled": true,
    "phrase_trigger": true,
    "throttle_minutes": 10
  }
}
```
