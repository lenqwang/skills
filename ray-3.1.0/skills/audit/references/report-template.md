---
home_skill: audit
purpose: 审计报告模板（audit_mode 头 / 状态列 / 得分明细 / 发现 / 技术债 / 文档清单 / Skipped Dimensions）
---
# 审计报告模板
> 头部 `> audit_mode: {light|full}`；状态列 `evaluated` 或 `skipped due to audit_mode=light`（字面一致便于 grep）；`### Skipped Dimensions` 段 light 必填、full 省略。示例见 `examples/report-example-{light,full}.md`。
```markdown
# 审计报告：{TRACE_ID}
> audit_mode: {light|full}
**得分：{score}/100** {通过 | 拒绝} | **日期**：YYYY-MM-DD
## 得分明细
| 维度 | 得分 | 状态 | 备注 |
|------|------|------|------|
| 需求一致性 | X/25 | evaluated | ... |
| OpenSpec 合规 | X/15 | evaluated 或 skipped due to audit_mode=light | 不变式切片被"不变式保持"吸收 |
| 安全性（light: "安全"） | X/20 | evaluated | ... |
| 代码质量（light 并入"测试通过 25"） | X/15 | evaluated | ... |
| 分级合约合规（light 并入"不变式保持 30"） | X/10 | evaluated 或 skipped due to audit_mode=light | 组件级别：{轻量/标准/完整} |
| 产品文档就绪度 | X/10 | evaluated 或 skipped due to audit_mode=light | 由 /digest 周期维护 |
| 治理合规（light 并入"不变式保持 30"） | X/5 | evaluated | {触发条件 / 满分放行} |
| **light 专属：测试通过** | X/25 | evaluated | 仅 light 出现 |
| **light 专属：不变式保持** | X/30 | evaluated | 仅 light 出现 |
## 发现（按置信度归类，安全类附攻击路径）
- 阻塞 [严重/主要/次要] 文件:行号 — 描述 — 修复建议 — 置信度: N/10；攻击路径（安全类）：{输入}→{经过}→{到达}
- 信息 文件:行号 — 描述 — 置信度: N/10
- 待验证（置信度 < 5）文件:行号 — 描述 — 建议验证方式
## 技术债（即使通过也记录）
- [ ] {债务项} — 优先级: 高/中/低
## 产品文档网络更新清单
- [ ] modules/{module}/{ComponentName}.md 更新；新交互行 / 边界情况 / 关系变更 / 新增已解决 TD：{列表}
## 判定
{通过并附备注 / 拒绝 — 详见 REJECT.md}
### Skipped Dimensions
> 仅 light 列出；每行一个维度，统一字符串 `skipped due to audit_mode=light`。
- OpenSpec 合规 — skipped due to audit_mode=light
- 分级合约合规 — skipped due to audit_mode=light
- 产品文档就绪度 — skipped due to audit_mode=light
```
## 解析约定（下游 ship / update-map）
`mode`: grep `^> audit_mode:` | `score`: regex `\*\*得分：(\d+)/100\*\*` | 跳过维度：状态列 + `### Skipped Dimensions` 两处字面匹配 `skipped due to audit_mode=light`
## Skill 完成摘要
```
- skill: audit | status: {done|rejected} | audit_mode: {light|full}
- artifacts: [{docs_root}/traces/{2hex}/{TRACE_ID}/audit.md]
- notes: 得分 {score}/100，{阻塞数} 阻塞，{信息数} 信息
```
