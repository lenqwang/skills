---
home_skill: audit
purpose: light 模式审计报告完整示例（PATCH/REFACTOR 场景）
---

# light 模式审计报告示例

> 场景：PATCH-bf3a 修复 ship 的 PR body 链接渲染。运行 audit_mode=light 审计。

```markdown
# 审计报告：PATCH-bf3a

> audit_mode: light

**得分：86/100** 通过
**日期**：2026-04-28

## 得分明细

| 维度 | 得分 | 状态 | 备注 |
|------|------|------|------|
| 需求一致性 | 24/25 | evaluated | 4 条验收标准全部实现；扣 1 分：trace 中描述的"链接预览"未显式触发 |
| OpenSpec 合规 | 0/15 | skipped due to audit_mode=light | PATCH 不引入新 spec；不变式相关切片归"不变式保持" |
| 安全 | 20/20 | evaluated | 无外部输入；URL 渲染走 markdown link，无 XSS 风险 |
| 代码质量（light 下并入"测试通过 25"） | — | — | — |
| 分级合约合规 | 0/10 | skipped due to audit_mode=light | 不变式 / 状态机切片归"不变式保持 30" |
| 产品文档就绪度 | 0/10 | skipped due to audit_mode=light | 由 /digest 周期归纳 |
| 治理合规（light 下并入"不变式保持 30"） | — | — | PATCH/REFACTOR 满分放行规则归入"不变式保持"自评 |
| **light 专属：测试通过** | 22/25 | evaluated | 全部 12 测试 PASS；扣 3：覆盖率 78%（达不到 80% 目标） |
| **light 专属：不变式保持** | 20/30 | evaluated | 不变式不破坏（10/10）；状态机无变更（5/5）；治理底线自评（3/5：引入新依赖未声明）；破坏性自评（2/10：本地链接路径在 Windows 下未测） |

## 阻塞类发现
1. [次要] skills/ship/SKILL.md:42 — Windows 路径分隔符未处理 — 修复建议：使用 `os.path.join` — 置信度: 7/10

## 信息类发现
1. [信息] skills/ship/references/pr-body.md:18 — 模板示例使用绝对 URL；建议改为相对 — 置信度: 6/10

## 待验证（置信度 < 5）
- 无

## 技术债（即使通过也记录）
- [ ] PATCH-bf3a 引入 ship → markdown 渲染依赖；下个 sprint 评估是否需要抽组件 — 优先级: 中

## 产品文档网络更新清单
- [ ] modules/delivery/Ship.md 需更新（链接渲染交互行新增）
- [ ] 新边界情况：Windows 路径分隔符
- [ ] 关系变更：无
- [ ] 新增/已解决的 TD：上方 TD 1 项

## 判定
通过并附备注：1 个次要阻塞（Windows 路径），不阻塞合并但已开 TD 跟踪。

### Skipped Dimensions

- OpenSpec 合规 — skipped due to audit_mode=light
- 分级合约合规 — skipped due to audit_mode=light
- 产品文档就绪度 — skipped due to audit_mode=light
```

> 注意要点：
> 1. 顶部 `> audit_mode: light` 字段单独一行，便于 grep。
> 2. 得分明细表格中跳过维度的"状态"列必须字面写 `skipped due to audit_mode=light`。
> 3. 报告末尾 `### Skipped Dimensions` 段必须列出全部跳过维度，每行一个，统一字符串。
> 4. 总分按 light 4 维度（24+20+22+20）= 86 计算，跳过维度不计入分母。
