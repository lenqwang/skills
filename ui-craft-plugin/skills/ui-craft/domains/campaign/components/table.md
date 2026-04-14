---
scope: [campaign]
layer: L2
---
# Table 表格与排行榜

> 表格和排行榜组件规格。
> 只引用语义 Token，代码中通过 `var(--xxx)` 使用对应 CSS 变量。

---

## 排行榜 (Leaderboard)

| 部位 | 规格 |
|------|------|
| 排名列 | 宽度固定 `size.60` (60px)，对齐：居中 |
| 用户列 | 宽度 >= `size.140` (140px)，对齐：左，含头像间距 |
| 数值列 | 2 列模式：`X - 60px` 居右；3 列模式：均分剩余空间，单列 >= 114px，居中 |
| 分割线 | 行底边框 `1px solid white.10` |

## 奖励表格

| 属性 | Token | CSS | 值 |
|------|-------|-----|-----|
| 时间块背景 | `surface.default` | `var(--bg-card)` | #1F2023 |
| 时间块尺寸 | — | — | 64px |
| 时间块圆角 | `radius.card` | `var(--radius-card)` | 8px |
| 数字排版 | `display.medium` | — | 48px / 600 |
| 冒号透明度 | `opacity.weak` | — | 0.3 |

- **表头**：背景透明，文字 `white.60`，12px，居中
- **单元格**：高度 48px，文字 12px
- **金额强调**：`gold.main`，`fontWeight.bold`
