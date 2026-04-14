---
scope: [campaign]
layer: L2
---
# Hero 区域组件

> 活动页顶部 Hero 区域，支持多种布局变体。
> 由 base 组件（Tag、Countdown、Button）组合而成。
> 氛围头图作为背景铺满，内容叠加在上方或下方。

---

## 布局变体

### 1. `side-by-side`（左右分栏）

> 已定义在 layout.md 模块骨架中。文案区 60% + 插图区 40%，列间距 48px。
> 适用于左侧重文案、右侧配图/3D 素材的场景。

### 2. `atmospheric`（氛围铺满 + 内容居中叠加） ← 本文档

> 头图铺满整个 Hero 区域作为视觉氛围背景，内容居中叠加在图片上。
> 适用于品牌视觉驱动、大型活动首页。

---

## 组件结构

```
Hero (.hero)
│
├── Background Layer (.hero-bg)
│   ├── Image (.hero-bg-img)         ← 氛围头图，cover 铺满
│   └── Gradient (.hero-bg-overlay)  ← 底部渐变遮罩，保证文字可读
│
└── Content Layer (.hero-content)
    ├── Tag (.tag-promo)              ← 可选，活动期数/标签
    ├── Title (.hero-title)           ← 主标题，支持 highlight span
    ├── Subtitle (.hero-subtitle)     ← 副标题/描述
    ├── Countdown (.cd)               ← 倒计时组件
    └── Actions (.hero-actions)       ← CTA 按钮 + 辅助操作
```

---

## Desktop 布局 (≥768px)

```
+──────────────────────────────────────────────────────+
│                                                      │
│               [氛围头图 cover 铺满]                    │
│                                                      │
│                    ┌─Round 1─┐                       │
│                                                      │
│         Unlock $700 Futures Voucher + VIP6           │
│                                                      │
│    Unlock $700 Futures Voucher + VIP6 for 30 Days!   │
│                                                      │
│          Ends in  [3D] : [03] : [59] : [23]          │
│                                                      │
│           [ ────── View ────── ] [📋] [↗]            │
│                                                      │
│         ┌────────────────────────────┐               │
│         │  ▓▓▓ 底部渐变遮罩 ▓▓▓▓▓▓▓  │               │
│         └────────────────────────────┘               │
+──────────────────────────────────────────────────────+
```

### Desktop 规格

| 属性 | 值 |
|------|------|
| 容器 | `width: 100%`，`position: relative` |
| 最小高度 | `min-height: 560px` |
| 内容最大宽度 | `max-width: 720px`，水平居中 |
| 内容对齐 | `text-align: center` |
| 内容位置 | 垂直居中偏下（`padding-top: 200px`，内容在图片下半部分） |
| Tag | Promo Outline sm，`margin-bottom: 16px` |
| 标题字号 | `36px / 700`，行高 1.2 |
| 高亮色 | `color: var(--accent)` (e.g. `#A7F757`) |
| 副标题 | `14px / 400`，`color: rgba(255,255,255,0.5)`，`margin: 12px 0 16px` |
| Countdown | `cd--md cd--top cd--mixed`，`margin-bottom: 24px` |
| CTA 行 | 主按钮 `min-width: 200px` + 辅助圆形按钮 × N，`gap: 12px` |
| 底部渐变 | `linear-gradient(transparent, var(--bg))`，`height: 120px`，`bottom: 0` |

---

## H5 布局 (<768px)

```
+───────────────────────────+
│                           │
│   [氛围头图 cover 铺满]     │
│                           │
│   100% to win, draw       │
│   pepe and exclusive      │
│   merchandise...          │
│                           │
│  Unlock $700 Futures...   │
│                           │
│ Ends in [3D]:[03]:[59]:[23]│
│                           │
│ [──────── Join Now ───────]│
│                           │
│  📋 Event Rules  ↗ Share   │
│                           │
│  ▓▓▓ 底部渐变遮罩 ▓▓▓▓▓▓  │
+───────────────────────────+
```

### H5 规格

| 属性 | 值 |
|------|------|
| 容器 | `width: 100%`，`position: relative` |
| 最小高度 | `min-height: 520px`（图片比例更高） |
| 内容区内边距 | `padding: 0 20px 32px` |
| 内容对齐 | `text-align: center` |
| 标题字号 | `28px / 700`，行高 1.3 |
| 标题高亮色 | 同 Desktop |
| 副标题 | `13px / 400`，`color: rgba(255,255,255,0.5)`，`margin: 8px 0 16px` |
| 副标题截断 | `overflow: hidden`，`-webkit-line-clamp: 2`，最多 2 行 |
| Countdown | `cd--sm cd--top cd--mixed`，`margin-bottom: 20px` |
| CTA 按钮 | `width: 100%`，全宽，`border-radius: 9999px` |
| 操作链接 | `display: flex`，`justify-content: center`，`gap: 24px`，`margin-top: 12px` |
| 底部渐变 | `linear-gradient(transparent, var(--bg))`，`height: 80px` |

---

## 背景图层规格

### 头图 (.hero-bg-img)

```css
.hero-bg-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
}
```

### 渐变遮罩 (.hero-bg-overlay)

```css
.hero-bg-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 120px;                                    /* Desktop */
  background: linear-gradient(transparent, var(--bg));
  pointer-events: none;
}

@media (max-width: 767px) {
  .hero-bg-overlay { height: 80px; }
}
```

---

## CSS 变量

```css
--hero-min-h-desktop: 560px;
--hero-min-h-mobile: 520px;
--hero-content-max-w: 720px;
--hero-title-size-desktop: 36px;
--hero-title-size-mobile: 28px;
--hero-gradient-h-desktop: 120px;
--hero-gradient-h-mobile: 80px;
```

---

## 内容组合规则

### 必选元素

| 元素 | 说明 |
|------|------|
| Title | 主标题，支持 `<span class="highlight">` 高亮关键信息 |
| CTA | 至少一个主要行动按钮 |

### 可选元素

| 元素 | 说明 | 位置 |
|------|------|------|
| Tag | Promo Tag（如 "Round 1"） | Title 上方 |
| Subtitle | 副标题/补充描述 | Title 下方 |
| Countdown | 倒计时 | Subtitle 下方，CTA 上方 |
| Action Links | 辅助操作（Rules / Share） | CTA 下方（H5）或 CTA 同行（Desktop） |
| Notification Bar | 滚动通知条 | Hero 底部外侧 |

### 组合顺序（从上到下）

```
[Tag]  →  Title  →  [Subtitle]  →  [Countdown]  →  CTA + [Actions]
```

方括号 = 可选。顺序固定，不可调换。

---

## 与 layout.md Hero 的关系

```
layout.md Hero 骨架
├── side-by-side（左右分栏）   ← layout.md 已定义
└── atmospheric（氛围铺满）    ← 本文档定义

style 文件中通过 heroLayout 字段选择：
  heroLayout: side-by-side     → 使用 layout.md 骨架
  heroLayout: atmospheric      → 使用本文档规格
```

---

## 数据接口

```typescript
interface HeroProps {
  /** 布局变体 */
  layout: 'side-by-side' | 'atmospheric';
  /** 背景图 URL */
  backgroundImage: string;
  /** 活动标签（可选） */
  tag?: string;
  /** 主标题（支持 HTML 含 highlight） */
  title: string;
  /** 副标题（可选） */
  subtitle?: string;
  /** 倒计时目标时间（可选） */
  countdownEndTime?: number;
  /** 倒计时 label */
  countdownLabel?: string;
  /** 主 CTA */
  cta: { text: string; href: string };
  /** 辅助操作（可选） */
  actions?: Array<{ icon: string; text?: string; href: string }>;
}
```
