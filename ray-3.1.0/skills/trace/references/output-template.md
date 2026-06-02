---
home_skill: trace
purpose: trace 需求文档输出模板（三级模板：极简/标准/完整，按复杂度和风险选填）
---

# Trace 输出模板

输出 Markdown 需求文档（无 YAML）：

````markdown
# {FEAT-ID}: {功能名称}

> source: dev

## 当前产品状态（Before）
> 来源：{docs_root}/product/modules/{module}/{ComponentName}.md
> 组件模板级别：{轻量 | 标准 | 完整}

{2-3 句描述当前行为。必要时粘贴交互表/状态机相关行。}

## 场景

> 小明{背景一句话}。他现在看到 {当前界面}，想 {目标}，于是 {操作}。
> 期望 {期望结果}，但目前 {当前行为}。
>
> 变更后：{新行为描述}。

（复杂需求可多场景，覆盖主路径和异常路径。）

## 验收标准
- [ ] 标准 1
- [ ] 标准 2

## 受影响的组件
- modules/{module}/{ComponentName}.md（{级别}）：[交互表/状态机/状态/边界情况的变化]
- modules/{module}/{NewComponent}.md（标准级，**(新组件)**）：[变化描述——`(新组件)` 标签由 `/update-map` 第 4 层识别并创建骨架]

<!-- 极简模板可省略；标准/完整模板必填 -->
## Non-Goals
- {明确排除的能力，防止 scope creep}

<!-- 以下章节按模板级别和风险触发选填 -->

## 关键规则（标准+）
- [业务约束]

## 模式 / API 交互（涉后端时）
frontend | backend | fullstack
POST /api/... -> {请求/响应结构}；错误码：403, 429

## 产品地图更新要求（标准+）
- [ ] 更新 modules/{module}/{ComponentName}.md
- [ ] 新增交互行 / 状态机行 / 边界情况

## 不变式影响（完整级必填）
- {保持 / 修改的不变式}

## 故障旅程（完整级必填）
- {新增故障场景 / 降级策略变更}

## 治理合规（风险触发时）
- 安全：{红线 / 已有约束 / 风险点}
- 度量：{成功指标}（如适用）
- 性能：{约束}（如适用）
- A11y：{要求}（如适用）

## Open Issues（仅有未决时）
- [待讨论的设计问题]

## Baseline
| 文件 | SHA256 前 8 位 |
|------|---------------|
| {docs_root}/product/PRODUCT-MAP.md | {由 /_trace-persist 填充} |
| {docs_root}/product/modules/{module}/index.md | {由 /_trace-persist 填充} |
| {docs_root}/product/modules/{module}/{ComponentName}.md | {由 /_trace-persist 填充} |
````
