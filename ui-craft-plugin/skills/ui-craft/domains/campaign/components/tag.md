---
scope: [campaign]
layer: L2
---
# Tag 标签组件

> 纯展示标签组件，分 Meta Tag（列表属性/分类）和 Promo Tag（卡片角标/卖点）两大类。
> 不处理 hover / active / selected / removable。不感知屏幕尺寸。
> 端差异仅通过 `tag.{size}.paddingX` 和 `tag.{size}.maxWidth` 控制。

---

## 组件结构

```
Tag
│
├── Meta Tag (.tag-meta)           ← 列表 / 属性 / 分类
│   ├── Brand (.tag-meta--brand)   ← 高亮标签（绿色）
│   └── Neutral (.tag-meta--neutral) ← 普通标签（灰色）
│
└── Promo Tag (.tag-promo)         ← 卡片角标 / Promo / 卖点
    ├── Outline (.tag-promo--outline) ← 描边
    └── Solid (.tag-promo--solid)     ← 实心
        └── Icon (可选)               ← 前置 icon（如 % 折扣）
```

---

## 类型详解

### 1. Meta Tag — 列表属性分类

用于排行榜用户属性、产品列表分类、任务卡奖励提示等场景。

| 变体 | 说明 | 示例 |
|------|------|------|
| `brand` | 绿色高亮，突出奖励/金额信息 | `+500 USDT`, `+1抽奖机会` |
| `neutral` | 灰色普通，描述属性/分类 | `Short-term`, `7天`, `主流币`, `Low frequency` |

```
Brand:                   Neutral:
┌──────────────┐         ┌──────────────┐
│  +500 USDT   │         │  Short-term  │
└──────────────┘         └──────────────┘
  绿色文字+绿色边框         灰色文字+灰色边框
```

**使用场景**：
- 排行榜用户属性行（多个 Meta Tag 并排）
- 产品列表币种分类（主流币 / 稳定币 / 热门）
- 任务卡奖励提示（+1抽奖机会）

### 2. Promo Tag — 卡片角标卖点

用于任务卡左上角、活动卡片角标，突出促销卖点。

| 变体 | 说明 | 示例 |
|------|------|------|
| `outline` | 绿色描边 + 绿色文字，透明背景 | `$200 Futures Voucher` |
| `solid` | 绿色实心背景 + 深色文字 | `$200 Futures Voucher` |

```
Outline:                       Solid:
╭─────────────────────────╮    ╭─────────────────────────╮
│  $200 Futures Voucher   │    │  $200 Futures Voucher   │
╰─────────────────────────╯    ╰─────────────────────────╯
  绿色描边+绿色文字 (胶囊形)     绿色填充+深色文字 (胶囊形)
```

**可选 Icon**：
- Promo Tag 可添加前置 icon（如 `%` 折扣图标）
- Icon 与文字间距 4px
- Icon 颜色跟随文字颜色

---

## 尺寸规格

### Meta Tag

| Token | sm | md |
|-------|----|----|
| `height` | 20px | 24px |
| `padding` | 0 6px | 0 8px |
| `border-radius` | 4px | 4px |
| `font-size` | 11px | 12px |
| `font-weight` | 500 | 500 |
| `border-width` | 1px | 1px |

### Promo Tag（胶囊形 Pill）

| Token | sm | md |
|-------|----|----|
| `height` | 24px | 32px |
| `padding` | 0 10px | 0 14px |
| `border-radius` | 9999px | 9999px |
| `font-size` | 12px | 13px |
| `font-weight` | 500 | 600 |
| `border-width` | 1px | 1px |
| `icon-size` | 12px | 14px |
| `icon-gap` | 4px | 4px |

---

## CSS 变量

```css
/* ═══ Meta Tag ═══ */

/* Brand */
--tag-meta-brand-color: #A7F757;
--tag-meta-brand-bg: transparent;
--tag-meta-brand-border: rgba(167, 247, 87, 0.4);

/* Neutral */
--tag-meta-neutral-color: rgba(255, 255, 255, 0.5);
--tag-meta-neutral-bg: transparent;
--tag-meta-neutral-border: rgba(255, 255, 255, 0.15);

/* ═══ Promo Tag ═══ */

/* Outline */
--tag-promo-outline-color: #A7F757;
--tag-promo-outline-bg: transparent;
--tag-promo-outline-border: rgba(167, 247, 87, 0.5);

/* Solid */
--tag-promo-solid-color: #0B0C0D;
--tag-promo-solid-bg: #A7F757;
--tag-promo-solid-border: transparent;

/* Disabled / 弱化 */
--tag-promo-disabled-color: rgba(255, 255, 255, 0.4);
--tag-promo-disabled-bg: rgba(255, 255, 255, 0.08);
--tag-promo-disabled-border: transparent;
```

---

## 使用规则

### 禁止行为

| 规则 | 说明 |
|------|------|
| 尺寸混用 | 不可用 Meta Tag 的尺寸做 Promo |
| 场景混用 | 不可将 Promo Tag 放进列表属性区 |
| 列表大标签 | 不可在列表中出现 32px 高的 Tag |
| 卡片弱标签 | 不可在卡片左上出现 24px 高的弱 Tag（Neutral） |

### 允许行为

| 规则 | 说明 |
|------|------|
| 共存 | 同一页面可同时存在 Meta + Promo（职责不同） |
| 单个 Promo | Promo Tag 可以只出现 1 个 |
| 批量 Meta | Meta Tag 可以批量出现（如排行榜属性行） |

### 选择决策

```
问：标签用在哪？
│
├── 列表/排行榜属性行 → Meta Tag
│   ├── 金额/奖励信息 → Brand (绿色)
│   └── 属性/分类描述 → Neutral (灰色)
│
└── 卡片角标/卖点 → Promo Tag
    ├── 常规展示 → Outline (描边)
    └── 强调促销 → Solid (实心)
        └── 有折扣含义？ → 加 % icon
```

---

## 页面应用场景

### 排行榜用户属性（Meta Tag × 批量）

```
┌──────────────────────────────────────────────────────┐
│  1   [avatar] Chelsea                                │
│           [Short-term] [Low frequency] [Conservative]│
│  2   [avatar] Momo Michael                           │
│           [高频] [激进] [短线] [高杠杆]                  │
└──────────────────────────────────────────────────────┘
      ↑ Meta Neutral sm, 批量并排
```

### 产品列表（Meta Tag Brand + Neutral）

```
Desktop:
┌──────────────────────────────────────────────────────────┐
│  币种              参考年化         期限(天)    操作      │
│  BTC/USDT [主流币]  9.00%~12.00%    [7天]     [View]   │
│  GT/USDT  [稳定币]  9.00%~12.00%    [7天]     [View]   │
│  DOT/USDT [热门]    9.00%~12.00%    [7天]     [View]   │
└──────────────────────────────────────────────────────────┘
         ↑ Brand sm (colored)    ↑ Neutral sm
```

### 任务卡角标（Promo Tag）

```
┌──────────────────────────────────────────┐
│ ╭$200 Futures Voucher╮  ← Promo Outline  │
│                                          │
│ 1. Exclusive Trading Event...            │
│    During the event period...            │
│                                          │
│ My Trading Volume  0/200000              │
│ ━━━━━━━━━━━━━━━━━━━━━━━                  │
│                    [Complete now ↗]       │
└──────────────────────────────────────────┘
```

### H5 产品列表（Meta Tag sm）

```
┌───────────────────────────────┐
│ BTC/USDT                [查看]│
│ 9.00%~12.00%                  │
│ [7天] [+500 USDT]             │
│       ↑Neutral ↑Brand         │
└───────────────────────────────┘
```

---

## 数据接口

```typescript
interface TagProps {
  /** 标签文字 */
  text: string;
  /** 标签类型 */
  type: 'meta' | 'promo';
  /** 变体 */
  variant: 'brand' | 'neutral' | 'outline' | 'solid';
  /** 尺寸 */
  size?: 'sm' | 'md';
  /** 前置 icon（仅 Promo Tag） */
  icon?: React.ReactNode;
  /** 禁用/弱化态 */
  disabled?: boolean;
}
```

