---
scope: [campaign]
layer: L2
---
# Input 输入框

> 输入框组件规格。
> 只引用语义 Token，代码中通过 `var(--xxx)` 使用对应 CSS 变量。

---

| 属性 | Token | CSS | 值 |
|------|-------|-----|-----|
| 高度 | — | — | 40px |
| 背景色 | `surface.muted` | `var(--bg-muted)` | #131516 |
| 边框色 | `surface.border` | `var(--border)` | rgba(255,255,255,0.1) |
| 圆角 | `radius.input` | `var(--radius-input)` | 6px |
| 内边距 | — | — | 12px 16px |
| 文字色 | `text.primary` | `var(--text-primary)` | #FAFAFA |
| 占位符色 | `text.tertiary` | `var(--text-muted)` | #84888C |
| 聚焦边框色 | `action.primary` | `var(--brand)` | #0068FF |

## 交互状态矩阵

> 完整状态定义见 `engine/reference/interaction-states.md`。

| 状态 | border | background | 其他 |
|------|--------|-----------|------|
| default | 1px solid var(--border) | var(--bg-muted) | — |
| hover | 1px solid var(--text-secondary) | — | — |
| focus | 1px solid var(--brand) | — | box-shadow: 0 0 0 2px rgba(0,104,255,0.2) |
| disabled | 1px solid var(--border) | var(--bg-muted) | opacity: 0.5; cursor: not-allowed |
| error | 1px solid var(--error) | — | 下方显示错误信息 var(--error) + 12px |
| success | 1px solid var(--success) | — | 短暂显示后恢复 default |

**规则：**
- label 始终在输入框上方，不用 placeholder 替代
- placeholder 用于格式提示（"请输入邮箱地址"）
- 错误信息在输入框下方，字号 12px，颜色 var(--error)
- 实时验证：格式类失焦时验证；业务类提交时验证
- 禁止在用户输入过程中显示错误（至少等失焦）
