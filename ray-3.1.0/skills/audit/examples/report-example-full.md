---
home_skill: audit
purpose: full 模式审计报告完整示例（FEATURE 场景）
---

# full 模式审计报告示例

> 场景：FEAT-b3c1 新增 PaymentPanel（完整级组件）。运行 audit_mode=full 审计。

```markdown
# 审计报告：FEAT-b3c1

> audit_mode: full

**得分：90/100** 通过
**日期**：2026-04-28

## 得分明细

| 维度 | 得分 | 状态 | 备注 |
|------|------|------|------|
| 需求一致性 | 23/25 | evaluated | 6 条验收标准实现 5；扣 2：退款流程未涵盖 |
| OpenSpec 合规 | 15/15 | evaluated | spec 类型已导入；契约 ID 一致性已校验 |
| 安全性 | 16/20 | evaluated | 输入消毒到位；扣 4：金额字段未参数化（高置信度阻塞） |
| 代码质量 | 14/15 | evaluated | 无 console.log / 硬编码；扣 1：1 处 TODO 未关闭 |
| 分级合约合规 | 9/10 | evaluated | 组件级别：完整；不变式覆盖；扣 1：1 个故障路径无降级 |
| 产品文档就绪度 | 8/10 | evaluated | 新交互行清晰；扣 2：状态机一行未声明 |
| 治理合规 | 5/5 | evaluated | AI 护栏不适用；A11y 满足；性能目标声明并测试 |

## 阻塞类发现
1. [严重] src/payment.ts:42 — 用户输入未消毒直接拼 SQL — 修复建议：参数化查询 — 置信度: 9/10
   攻击路径：req.body.amount → buildQuery() → db.execute() → SQL 注入

## 信息类发现
1. [信息] src/payment-panel.tsx:88 — 命名建议：`processFn` → `handlePaymentSubmit` — 置信度: 6/10
2. [信息] src/payment-utils.ts:12 — 可选性能优化：缓存货币转换结果 — 置信度: 5/10

## 待验证（置信度 < 5）
- 无

## 技术债（即使通过也记录）
- [ ] 退款流程后续补 — 优先级: 高
- [ ] 1 处 TODO（src/payment.ts:120）排期清理 — 优先级: 中

## 产品文档网络更新清单
- [ ] modules/payment/PaymentPanel.md 需更新
- [ ] 新交互行：发起支付、确认支付、取消支付
- [ ] 新边界情况：余额不足、网络超时
- [ ] 关系变更：PaymentPanel → CartSummary（消费 cart_state）
- [ ] 新增/已解决的 TD：上方 2 项

## 判定
通过并附备注：1 个严重阻塞（SQL 注入）已修复后才达通过分；ship 前需双确认。
```

> 注意要点：
> 1. 顶部 `> audit_mode: full` 字段单独一行。
> 2. 所有 7 维度的"状态"列均为 `evaluated`，无任何 `skipped due to audit_mode=light` 出现。
> 3. **audit_mode=full 时不输出 `### Skipped Dimensions` 段**——本示例报告末尾停在"判定"。
> 4. 总分按 full 7 维度加和（23+15+16+14+9+8+5）= 90 计算。
