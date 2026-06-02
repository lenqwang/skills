---
name: audit
description: 实现代码通过所有测试后，需与需求交叉检查一致性、安全性和质量评分，在合并前完成审查
---

# Audit — 质量审计 Agent

最后一道防线：对比需求与实现，评分，决定是否发布。

<critical-rules>
- 每个发现必须附置信度评分（1-10）
- 安全类发现必须附攻击路径
- 不变式违反 / 安全漏洞 / AI 护栏缺失 = 无条件硬拒
- 审计只读取和报告，不修改代码
- light 模式跳过的维度必须显式列出 `skipped due to audit_mode=light`，静默省略禁止（格式见 `references/report-template.md`）
</critical-rules>

> 协议接入：见 `_trace-persist/references/public-protocols.md`（resolve_trace_id / on_skill_enter / auto_commit_push）

## 模式检查
调用 `resolve_docs_root()` 获取 `(docs_root, mode)`：**docs** 仅文档侧检查（契约一致性、状态推进合法性），跳过测试覆盖率与代码扫描；**external / inline** 正常执行。

## 输入
已确认需求（`{docs_root}/traces/`）、OpenSpec 合约（`{docs_root}/specs/`）、测试结果、实现代码、`CLAUDE.md`，以及 pipeline 调度上下文中的 `audit_mode`（见 `pipeline/references/agent-protocol.md`）。

## 上下文加载策略
`on_skill_enter(TRACE_ID)` 之后：(1) 读取 trace.md 与测试结果 / 实现 diff；(2) **`audit_mode=full` 且 trace 受影响组件含完整级**：不变式相关检查阶段强制读组件文件全文（`## 关系` / `## 不变式` / `## 状态机` / `## 故障旅程`），防降质护栏不可省略；(3) `audit_mode=light`：按需读取组件文件相关段，不强制全文；(4) spec 文件、CLAUDE.md 始终按需读取。

## 模式：light vs full（路由）
调度方在标准化上下文块中显式传入 `audit_mode: "light" | "full"`，默认 `full`。**由调度方显式传入，不由本 skill 从 trace 推断**——本 skill 不读取 trace 头部的 `> source:` / `> completeness:` 字段。

| 模式 | 触发场景 | 评分维度 | 加载 reference | 阈值 |
|------|---------|---------|---------------|------|
| `full` | pipeline FEATURE Phase 5 / coder 通过测试后 | 7 维度 100 分 | `references/scoring-full.md` | >= 80 通过 |
| `light` | pipeline PATCH/REFACTOR Phase 5 | 4 维度 100 分（需求 25 / 安全 20 / 测试通过 25 / 不变式 30）；其余 3 维度统一标 `skipped due to audit_mode=light` | `references/scoring-light.md` | >= 80 通过 |

> 详细评分子项与扣分细则、HARD-GATE 阈值、契约一致性检查、light↔full 维度权重映射见 `references/scoring-{light,full}.md`。`examples/` 默认不读，agent 不确定时按需 lazy 拉取。

**HARD-GATE 在两种模式下都生效**：不变式违反、OWASP Top 10（置信度 >= 8）、AI 内容安全护栏缺失 = 无条件硬拒。

## 输出
无论 `audit_mode`，始终产出 `{docs_root}/traces/{2hex}/{TRACE_ID}/audit.md`（与 trace.md 同目录的 per-trace 一次性产物，字段集 `audit_mode` / `score` / `findings`，模板见 `references/report-template.md`）。拒绝时追加 `{docs_root}/traces/{2hex}/{TRACE_ID}/REJECT.md`（给 coder 的具体修复指令）。

## 置信度评分

| 置信度 | 含义 | 计入评分 |
|--------|------|---------|
| 8-10 | 直接证据（10=代码可见，8-9=代码流可推） | 全权重 |
| 5-7 | 疑似（模式匹配未验证），需确认 | 半权重，标注"需确认" |
| 1-4 | 低置信度推测（4-5=经验，1-3=猜测） | 不计入，归"待验证" |

## 证据链（安全维度必填）
安全性维度发现（置信度 >= 5）必须附攻击路径：`{用户输入} → {经过} → {危险操作}`。无法构造 → 置信度自动降为 4（归"待验证"）。非安全维度的发现不要求攻击路径，但鼓励附具体证据。

## 发现分级
HARD-GATE / 置信度 >= 8 → **阻塞**（按权重扣分）；置信度 5-7 → **阻塞**（半权重）；置信度 < 5 / 风格 / 命名 / 可选优化 → **信息**。

## HARD-GATE 触发条件
任一触发 = 无条件硬拒（无论总分）：不变式违反（完整级组件） / 安全漏洞（置信度 >= 8 的 OWASP Top 10） / AI 内容安全护栏缺失（涉及 AI 回复内容的需求）。完整级额外严格规则：状态机缺转换 / 故障旅程未实现 = 主要问题。

## 决策逻辑

```
IF HARD-GATE 命中 → 硬拒，写 REJECT.md 首行 "HARD-GATE REJECT: {原因}"，通知 pipeline 停止并升级
ELIF score >= 80   → 通过，写 audit.md（含技术债清单），通知 pipeline 继续
ELIF score >= 60   → 软拒，写 REJECT.md（每问题含文件/行号/修复/置信度），通知 pipeline 重新调度 coder
ELSE               → 硬拒（< 60），写 REJECT.md，通知 pipeline 停止并升级；可能根因：需求模糊或 spec 不完整
```

<rules>
1. **具体** — "第 42 行 XSS（置信度 9/10）" 而非 "安全性可以更好"
2. **始终跟踪技术债** — 即使满分也要记录潜在改进
3. **不修改代码** — 审计只读取和报告
4. **穷尽交叉检查** — 每个验收标准、每个 spec 类型、每个测试用例
5. **安全不可妥协** — 置信度 >= 8 的 OWASP Top 10 = HARD-GATE
6. **不变式不可妥协** — 完整级组件不变式违反 = HARD-GATE
7. **产品文档就绪度** — /update-map 信息不足时标记
8. **Non-Goals 反向检查** — Non-Goals 列出的能力不应出现在实现中
9. **读 CLAUDE.md** — 项目特有约定
10. **治理合规按需** — 仅在需求含治理合规章节或触发条件时检查；PATCH/REFACTOR 跳过满分
11. **置信度必填** — 无评分的发现无效
12. **攻击路径必填（安全类）** — 无法构造则降级
13. **light 模式透明** — 跳过维度显式列出，禁止静默
</rules>
