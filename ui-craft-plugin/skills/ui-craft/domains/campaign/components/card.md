---
scope: [campaign, exchange, web3pay]
layer: L2
---
# Card 卡片

> 卡片组件规格，包含常规卡片和活动页变体。
> 只引用语义 Token，代码中通过 `var(--xxx)` 使用对应 CSS 变量。

---

## 常规卡片

| 属性 | Token | 值 |
|------|-------|-----|
| 背景色 | `surface.default` | #18191B |
| 边框色 | `surface.border` | #303236 |
| 圆角 | `radius.card` | 8px |
| 内边距 | `space.xl` | 32px |
| 阴影 | `shadow.md` | 0 4px 6px rgba(0,0,0,0.1) |

## 活动页黑卡

| 属性 | Token | CSS | 值 |
|------|-------|-----|-----|
| 背景色 | `surface.campaign.black` | `var(--bg-card-black)` | #000000 |
| 边框 | — | — | 1px solid rgba(255,255,255,0.2) |
| 圆角 | `radius.card-lg` | `var(--radius-card-lg)` | 32px |
| 内边距 | `space.xl` | `var(--space-card)` | 32px |
| 文字色 | `text.campaign.white` | `var(--text-on-dark)` | #FFFFFF |
| 次要文字色 | `text.campaign.white-muted` | `var(--text-on-dark-muted)` | rgba(255,255,255,0.7) |

## 活动页白卡

| 属性 | Token | CSS | 值 |
|------|-------|-----|-----|
| 背景色 | `surface.campaign.white` | `var(--bg-card-white)` | #FFFFFF |
| 边框 | — | — | 无 |
| 圆角 | `radius.card-lg` | `var(--radius-card-lg)` | 32px |
| 内边距 | `space.xl` | `var(--space-card)` | 32px |
| 文字色 | `text.campaign.black` | `var(--text-on-light)` | #000000 |
| 次要文字色 | `text.campaign.black-muted` | `var(--text-on-light-muted)` | rgba(0,0,0,0.7) |

## 活动页蓝卡

| 属性 | Token | CSS | 值 |
|------|-------|-----|-----|
| 背景色 | `surface.campaign.blue` | `var(--bg-card-blue)` | #0068FF |
| 边框 | — | — | 无 |
| 圆角 | `radius.card-lg` | `var(--radius-card-lg)` | 32px |
| 内边距 | `space.xl` | `var(--space-card)` | 32px |
| 文字色 | — | `var(--text-on-dark)` | #FFFFFF |
| 次要文字色 | — | — | rgba(255,255,255,0.9) |

## 嵌套活动卡片 (Campaign Nested Card)

| 部件 | 间距 (Gap/Padding) | 圆角 | 背景 |
|------|-------------------|------|------|
| 外层黑卡容器 | `padding: space.2xl` (48px) | `radius.card.outer` (32px) | `surface.campaign.black` |
| 内嵌奖励表格 | `padding: space.xl` (32px) | `radius.card.inner` (16px) | `surface.campaign.white` |

## 交互状态矩阵（可交互卡片）

> 仅适用于可点击/可跳转的卡片。纯展示卡片不需要 hover 效果。
> 完整状态定义见 `engine/reference/interaction-states.md`。

| 状态 | 变化 |
|------|------|
| default | 基准样式 |
| hover | transform: translateY(-4px); box-shadow 加深; transition: var(--transition-slow); cursor: pointer |
| focus-visible | outline: 2px solid var(--brand); outline-offset: 2px |
| active | transform: translateY(0); box-shadow 恢复（取消悬浮感） |

**规则：**
- 可点击卡片整体用 `<a>` 或 `role="link" tabindex="0"` 包裹
- 不在卡片内部某个元素单独监听点击事件（R27 语义化）
- 触摸设备下移除 hover 位移效果：`@media (hover: none) { transform: none; }`
