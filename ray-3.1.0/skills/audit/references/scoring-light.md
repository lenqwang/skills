---
home_skill: audit
purpose: light 模式 4 维度评分表（PATCH / REFACTOR）
---

# 轻量模式（audit_mode=light）

light 模式适用于 PATCH / REFACTOR，仅评估 4 个维度（合计 100 分）：

| 维度 | 权重 | 检查项（子项清单与扣分细则） |
|------|------|------|
| 需求一致性 | 25 | 每个验收标准都实现了？（缺一项扣 5）需求中的状态/事件都在代码中？（缺一项扣 3）Non-Goals 中的内容没有被实现？（违反一项扣 5） |
| 安全 | 20 | XSS 防护？（缺失扣 6）输入消毒？（缺失扣 5）代码中无密钥？（命中即扣 10）OWASP Top 10 合规？（违反一项扣 5，置信度 >= 8 触发 HARD-GATE） |
| 测试通过 | 25 | 全部测试 PASS？（任一 FAIL 扣 10）覆盖率达标？（不达扣 5）无 console.log/TODO/FIXME 残留（命中一处扣 2）。无硬编码值与项目约定违反（CLAUDE.md，命中一项扣 3）。**自评：测试套件能反映本次改动的语义**（不能则扣 5） |
| 不变式保持 | 30 | **不变式在所有代码路径上成立**（违反 = HARD-GATE）。状态机转换完整、无未定义的非法转换（违反一项扣 8）。每个故障场景有降级策略和恢复路径（缺失一项扣 5）。PATCH/REFACTOR 治理合规默认满分放行规则（不再独立扣分，归到本维度的"治理底线"自评：是否引入了新的合规风险，是则扣 5）。**10 分自评**：本次改动是否破坏既有契约 / 引入隐藏副作用（破坏则扣 10） |

## light 跳过的 full 维度

light 模式下，以下 full 维度**不参与评分**——审计报告中必须显式列出：

| full 维度 | 权重 | light 状态 | 备注 |
|-----------|------|-----------|------|
| OpenSpec 合规 | 15 | ⚠️ skipped due to audit_mode=light | 不变式 / 状态机相关切片已被"不变式保持 30"吸收；其余（spec 类型导入、契约一致性）在 PATCH/REFACTOR 一般无新增 spec，故跳过 |
| 分级合约合规 | 10 | ⚠️ skipped due to audit_mode=light | 不变式 / 状态机切片已被"不变式保持 30"吸收 |
| 产品文档就绪度 | 10 | ⚠️ skipped due to audit_mode=light | 由 /digest 周期归纳，不在每次 PATCH 审计阻塞路径上 |

> 跳过维度统一标注字符串：`skipped due to audit_mode=light`（与 `skills/audit/SKILL.md` 字面一致，便于 grep）。

## HARD-GATE 阈值

light 与 full 一致：`score >= 80` 通过。HARD-GATE 在两种模式下都生效。

> light↔full 维度权重映射、1:N 子项映射汇总见 `scoring-full.md` 末尾「映射」段（仅 full 模式需要）。
