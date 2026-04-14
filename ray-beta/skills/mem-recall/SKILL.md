---
name: mem-recall
description: 基于当前上下文激活相关记忆。多层检索，L3 优先。所有 Ray skill 执行前自动调用，加载相关的决策模型、行为模式和历史经验。
---

# Memory Recall — 记忆激活器

你是记忆蒸馏系统的检索引擎。职责：根据当前上下文，从三层记忆中激活最相关的条目，为当前任务提供历史智慧。

## 核心理念

记忆检索是**激活**而非搜索。不是找"最匹配的关键词"，而是找"最能改变当前行为的决策模型"。

## 自动集成

所有 Ray skill 默认在执行前自动调用 `mem-recall`。通过 `.ray/config.json` 控制：

```json
{
  "memory": {
    "enabled": true,
    "auto_recall": true
  }
}
```

设置 `auto_recall: false` 可关闭自动召回，改为手动调用。

### 集成点

以下 skill 执行前自动激活记忆：
- `/pipeline` — 任务分级和调度前，激活相关决策模型
- `/trace` — 需求分析时，激活相关的偏好和约定
- `/coder` — 写代码时，激活相关的失败模式和行为模式
- `/audit` — 审计时，激活相关的质量判断标准
- `/architect` — 架构设计时，激活架构决策记忆
- `/qa` — 测试设计时，激活测试相关经验

## 检索流程

### 第 1 步：上下文特征提取

从当前会话/任务中提取特征：

| 特征维度 | 提取方式 |
|---------|---------|
| **域** | 当前操作涉及哪些模块/包？ |
| **任务类型** | 新功能 / bug修复 / 重构 / 配置 / 文档 / 调试 |
| **技术栈** | 涉及哪些技术？ |
| **交互模式** | 用户的沟通模式（简洁指令 / 详细讨论 / 纠正反馈） |
| **阶段** | 需求 / 设计 / 实现 / 测试 / 审计 / 部署 |

### 第 2 步：多层同时激活

对三层记忆同时进行相关性匹配：

#### L3 Judgment（优先权重 3.0）

读取 `.ray/memory/l3-judgments/*.md`，匹配条件：
- `applies_when` 中的条件与当前上下文匹配
- `does_not_apply_when` 中的条件不与当前上下文匹配
- `confidence` >= 0.5

相关度 = 匹配条件数 / 总条件数 * confidence * 3.0

#### L2 Pattern（优先权重 2.0）

读取 `.ray/memory/l2-patterns/*.md`，匹配条件：
- `context_tags`（通过 evidence_episodes 关联）与当前域/任务类型重叠
- `pattern_type` 与当前任务阶段相关
- `strength` >= 0.5

相关度 = tag_overlap_ratio * strength * 2.0

#### L1 Episode（优先权重 1.0）

读取 `.ray/memory/l1-episodes/*.md`，匹配条件：
- `context_tags` 与当前上下文 tag 重叠 >= 2 个
- `strength` >= 0.3（衰减后）
- `verification` != FAILED（除非当前任务是类似的失败场景）

相关度 = tag_overlap_ratio * current_strength * 1.0

### 第 3 步：竞争抑制

1. 按相关度降序排列所有层的候选记忆
2. 最多激活 **3 条**记忆
3. 如果存在冲突的记忆（例如 L2 Pattern 和 L1 Episode 矛盾），同时展示两者及各自的 confidence/strength
4. 相关度 < 0.3 的不激活

### 第 4 步：激活输出

```markdown
## 记忆激活报告

### 激活的记忆（按优先级）

**[L3] jdg-xxx: {rule}**
- 置信度: {confidence}
- 适用条件匹配: {匹配的 applies_when 条目}
- 响应策略: {response_strategy}

**[L2] pat-xxx: {description}**
- 强度: {strength}
- 类型: {pattern_type}
- 证据数: {evidence_count}
- 可迁移洞察: {一句话}

**[L1] ep-xxx: {situation}**
- 强度: {current_strength}（衰减后）
- 验证状态: {verification}
- 行动: {action} → 结果: {outcome}

### 未激活但相关
{列出相关度在 0.2-0.3 之间的条目，供手动参考}
```

### 第 5 步：强化访问

被激活的记忆自动更新：
- L1 Episode: `access_count` +1, `last_accessed` 更新, `base_strength` +0.1（上限 2.0）
- L2 Pattern: `last_reinforced` 更新
- L3 Judgment: 不自动更新（稳定层）

## 手动调用

```
/mem-recall
```

手动调用时，从当前会话上下文自动提取特征。

也可以指定上下文：

```
/mem-recall chat SSE streaming
```

指定域和关键词，精确激活。

## 空记忆处理

如果某一层完全为空，跳过该层，不报错。这是正常的——系统需要时间积累记忆。

输出提示：
```
L3 层为空（系统尚在学习阶段）。随着交互积累，pattern 将逐步晋升为 judgment。
```

## 规则

1. **L3 优先** — 高层记忆总是优先于低层
2. **最多 3 条** — 避免信息过载，宁精勿多
3. **冲突透明** — 矛盾的记忆同时展示，不隐藏
4. **强化访问** — 被使用的记忆变得更强，未使用的自然衰减
5. **不修改记忆内容** — recall 只读 + 更新访问元数据，不改变记忆的实质内容
6. **优雅降级** — 记忆为空不是错误，是系统的起始状态
