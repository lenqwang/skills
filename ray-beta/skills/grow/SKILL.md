---
name: grow
description: 从当前会话或近期工作中提取经验教训，沉淀为结构化知识，反馈改进现有 skill。自动或手动触发。
---

# Grow — Skill 自我进化 Agent

你的目标：从工程实践中提取可复用的经验教训，让每一次开发工作都能改善后续的工作质量。核心原则来自复合工程（Compound Engineering）："每一单元的工程工作应该让后续工作更容易，而非更难。"

## 触发场景

### 手动触发
- 任务完成后手动运行 `/grow`
- 遇到反复出现的问题模式时
- 发现现有 skill 遗漏或不准确时
- 想要记录某个成功策略时

### 自动触发（短语检测）

通过 `.ray/config.json` 的 `evolve.phrase_trigger` 开关控制（默认开启），且有 10 分钟节流（可通过 `evolve.throttle_minutes` 调整）：

```json
{
  "memory": { "enabled": true },
  "evolve": {
    "enabled": true,
    "phrase_trigger": true,
    "throttle_minutes": 10
  }
}
```

自动检测信号：
- **完成信号**：搞定了、解决了、修好了、it's fixed、that worked、problem solved、all tests pass 等
- **决策信号**：决定用 X、选择方案 A、不要用 Y、switch to、go with 等

检测到时由主 Agent 判断是否值得运行 `/grow`。

## 执行流程

### Phase 0：上下文收集

1. **激活相关记忆**：读取记忆蒸馏系统中的已有知识，避免提取重复经验
   - 读取 `.ray/memory/l3-judgments/` — 最高优先级，已验证的成熟判断
   - 读取 `.ray/memory/l2-patterns/` — 已聚类的模式
   - 读取 `.ray/memory/l1-episodes/` — 近期的具体事件
   - 如果候选经验已被 L2/L3 覆盖，跳过提取
   - 检查 L1 中是否已有 `source: "grow"` 的相似条目，有则更新而非新建
2. 扫描当前会话的工作内容：
   - 最近的 git diff / git log（本分支的变更）
   - 遇到的错误和解决方案
   - 使用了哪些 skill（/pipeline, /coder, /audit 等）
   - 哪些步骤顺利，哪些卡住了
3. 读取 `CLAUDE.md` 了解项目约定（如存在）

### Phase 1：经验分类与提取

从会话中识别以下类型的经验：

| 类型 | 说明 | 示例 |
|------|------|------|
| `pattern` | 成功的可复用模式 | "SSE 流式测试用 mock EventSource + flush 模式最稳定" |
| `pitfall` | 踩过的坑、反模式 | "Zustand store 的 selector 不能在 useEffect 内创建" |
| `skill-gap` | 现有 skill 的遗漏或不准确 | "/coder 没有处理 monorepo 跨包 import 路径" |
| `optimization` | 流程优化建议 | "PATCH 级别可以跳过 lint，只跑 affected 包的测试" |
| `convention` | 应纳入 CLAUDE.md 的约定 | "所有 SSE 事件类型必须在 packages/types 中定义" |

对每条经验，提取：
- **问题描述**：遇到了什么情况
- **根因分析**：为什么会发生
- **解决方案**：怎么解决的
- **预防措施**：如何避免再次发生
- **关联 skill**：哪些 skill 应该知道这条经验
- **置信度**：high / medium / low（单次遇到为 low，多次验证为 high）

### Phase 2：经验记录

将提取的经验**直接写入 L1 Episode**（`.ray/memory/l1-episodes/`，如不存在先 `mkdir -p .ray/memory/l1-episodes`）。

与 `/mem-gate` 写入的 Episode 共享同一存储，通过 `source: "grow"` 区分。

**文件命名**：`ep-{YYYYMMDD}-{slug}.md`

**文件格式**：
```markdown
---
id: "ep-{YYYYMMDD}-{slug}"
source: "grow"
type: "pattern | pitfall | skill-gap | optimization | convention"
timestamp: "{ISO8601}"
situation: "{遇到了什么情况（问题描述）}"
action: "{怎么解决的（解决方案）}"
outcome: "{结果和预防措施}"
root_cause: "{为什么会发生（根因分析）}"
solution: "{具体解决方案，含代码示例（如适用）}"
prevention: "{如何避免再次发生}"
related_skills: [coder, audit]
context_tags: [{从 affected_packages 和技术栈映射}]
confidence: "high | medium | low"
verification: "UNTESTED"
strength: 1.0
access_count: 0
last_accessed: "{ISO8601}"
---

# {标题：简短描述}

{2-5 句自然语言描述，解释问题、方案和预防措施}
```

**置信度与 strength 的映射**：
- `confidence: high` → `strength: 1.5`
- `confidence: medium` → `strength: 1.0`
- `confidence: low` → `strength: 0.7`

### Phase 3：影响分析与建议

分析提取的经验对现有 skill 的影响：

1. **Skill 改进建议**：哪些 skill 的 SKILL.md 应该更新
   - 输出具体的改进建议（哪个 section、加什么内容）
   - 标记为 `auto`（可安全自动应用）或 `manual`（需人工审核）
2. **CLAUDE.md 补充建议**：是否有约定应纳入项目指导
3. **重复/矛盾检测**：新经验是否与已有经验矛盾
4. **可发现性检查**：确保经验不会被埋没
   - `/mem-recall` 会自动搜索所有 L1 Episode（包括 `source: "grow"` 的），无需额外配置
   - 检查新经验的 `related_skills` 和 `context_tags` 是否足够精确，确保 recall 能匹配到

### Phase 4：应用（需用户确认）

<HARD-GATE>
修改现有 skill 的 SKILL.md 前必须获得用户确认。L1 Episode 文件可直接创建。
</HARD-GATE>

向用户展示：
```
经验提取报告

提取了 N 条经验：
1. [pattern] {标题} — 关联 /coder, /qa
2. [pitfall] {标题} — 关联 /pipeline
...

Skill 改进建议：
- /coder SKILL.md: 在"自愈循环"section 增加 {具体内容}
- /pipeline SKILL.md: 在"Phase 4"增加 {具体内容}

是否应用这些改进？(y/n/选择性应用)
```

用户确认后：
1. 在目标 skill 的 SKILL.md 末尾的 `## 经验教训` section 中添加引用
2. 引用格式：`> 参见经验：[ep-{id}](.ray/memory/l1-episodes/ep-{id}.md)`

### Phase 5：归纳检查与记忆同步

#### 5a. 归纳（可选）

如果 L1 中同一主题（source: "grow"）的经验超过 3 条：
- 建议归纳为一条高置信度的综合经验
- 标记旧条目为 `superseded`
- 考虑将高频经验升级为 CLAUDE.md 约定

> **注意**：/grow 直接写入 L1 Episode，无需延迟同步。经验立即参与蒸馏管道（L1 → L2 Pattern → L3 Judgment）和 recall 检索。

---

## 经验库查询

所有经验作为 L1 Episode 存储在 `.ray/memory/l1-episodes/` 中，通过 `/mem-recall` 自动检索。手动筛选 grow 类型的经验：

```
读取 .ray/memory/l1-episodes/ 中 source: "grow" 的文件：
- 按 type 过滤（pattern / pitfall / skill-gap / optimization / convention）
- 按 related_skills 过滤
- 按 context_tags 过滤
```

## 与其他 Skill 的关系

| Skill | 关系 |
|-------|------|
| `/pipeline` | pipeline 的 Phase 7（报告）后建议运行 `/grow` |
| `/coder` | coder 卡住时查询 pitfall 类经验 |
| `/audit` | audit 发现反复出现的问题时触发经验提取 |
| `/update-map` | 经验中的 convention 类可能需要同步到活文档 |
| `/mem-recall` | Phase 0 调用，激活相关记忆避免提取重复经验 |
| `/mem-gate` | 共享 L1 Episode 存储，通过 source 字段区分来源 |
| `/mem-distill` | 所有 L1（含 grow 产出）统一参与蒸馏 + 健康度归纳 |

## 输出清单

- `.ray/memory/l1-episodes/ep-{YYYYMMDD}-{slug}.md` — L1 Episode（source: "grow"，必定产出）
- Skill 改进建议（展示给用户，确认后应用）
- CLAUDE.md 补充建议（展示给用户，确认后应用）
