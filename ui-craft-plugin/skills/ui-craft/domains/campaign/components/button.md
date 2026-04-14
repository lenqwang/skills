---
scope: [campaign]
layer: L2
---
# Button 按钮

> 按钮组件规格，包含平台通用变体和活动页变体。
> 只引用语义 Token，代码中通过 `var(--xxx)` 使用对应 CSS 变量。

---

## 主按钮 (Primary)

| 属性 | Token | CSS | 值 |
|------|-------|-----|-----|
| 背景色 | `action.primary` | `var(--brand)` | #0055FF |
| 悬停背景色 | `action.primary.hover` | `var(--brand-hover)` | #0044CC |
| 文字色 | `text.inverse` | `var(--text-inverse)` | #FFFFFF |
| 圆角 | `radius.control` | `var(--radius-btn)` | 8px |

## 次要按钮 (Secondary)

| 属性 | Token | CSS | 值 |
|------|-------|-----|-----|
| 背景色 | `action.secondary.bg` | `var(--action-secondary)` | #1F2023 |
| 文字色 | `text.primary` | `var(--text-primary)` | #FAFAFA |
| 圆角 | `radius.control` | `var(--radius-btn)` | 8px |

## 中性按钮 (Neutral)

| 属性 | Token | CSS | 值 |
|------|-------|-----|-----|
| 背景色 | `action.neutral` | `var(--action-neutral)` | #303236 |
| 悬停背景色 | `action.neutral.hover` | `var(--action-neutral-hover)` | #484B51 |
| 文字色 | `text.primary` | `var(--text-primary)` | #FAFAFA |
| 圆角 | `radius.control` | `var(--radius-btn)` | 8px |

## 活动页 CTA 按钮

| 属性 | Token | 值 |
|------|-------|-----|
| 背景色（主） | `white` | #FFFFFF |
| 文字色（主） | `black` | #000000 |
| 背景色（次） | `black` | #000000 |
| 文字色（次） | `white` | #FFFFFF |
| 圆角 | `radius.pill` | 9999px |
| 高度 | — | 48px / 56px |
| 最小宽度 | — | 120px / 320px |

## Accent CTA 按钮

> 用于活动页"Complete now"等强调操作，从 Figma 设计稿确认

| 属性 | Token | 值 |
|------|-------|-----|
| 背景色 | `accent.lime` | #A7F757 |
| 文字色 | `black` | #000000 |
| 圆角 | `radius.pill` | 9999px |
| 高度 | — | 48px / 56px |
| 最小宽度 | — | 120px / 320px |

## 尺寸

| 尺寸 | 高度 | 内边距 | 字体 |
|------|------|--------|------|
| Small | 32px | 12px | `button.small` (14px) |
| Medium | 40px | 16px | `button.medium` (16px) |
| Large | 48px | 24px | `button.large` (16px) |
| Campaign | 48px / 56px | 24px / 48px | `button.large.campaign` (18px) |

## 交互状态矩阵

> 完整状态定义见 `engine/reference/interaction-states.md`。最低要求：default / hover / focus-visible / disabled。

### Primary / Neutral

| 状态 | background | color | 其他 |
|------|-----------|-------|------|
| default | `var(--brand)` / `var(--action-neutral)` | `var(--text-inverse)` / `var(--text-primary)` | — |
| hover | `var(--brand-hover)` / `var(--action-neutral-hover)` | — | cursor: pointer |
| focus-visible | — | — | outline: 2px solid var(--brand); outline-offset: 2px |
| active | — | — | transform: scale(0.98) |
| disabled | `var(--action-neutral)` | `var(--text-disabled)` | opacity: 0.5; cursor: not-allowed; pointer-events: none |
| loading | — | transparent | 内部 spinner; pointer-events: none; 按钮宽度固定 |

### CTA / Accent CTA

| 状态 | 变化 |
|------|------|
| default | 基准样式 |
| hover | filter: brightness(1.1); cursor: pointer |
| focus-visible | outline: 2px solid var(--brand); outline-offset: 2px |
| active | transform: scale(0.95) |
| disabled | 降级为中性按钮样式; opacity: 0.5 |

