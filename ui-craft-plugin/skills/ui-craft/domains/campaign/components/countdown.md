---
scope: [campaign]
layer: L2
---
# Countdown 倒计时组件

> 活动页倒计时组件，支持多种文字位置和日期单位格式。
> 由 Block（时间块）和 Separator（分隔符）两个原子组合而成。
> 只引用语义 Token，代码中通过 `var(--xxx)` 使用对应 CSS 变量。

---

## 组件结构

```
Countdown
│
├── Label (.cd-label)              ← "Ends in" / "Starts in" / 自定义
│
└── Timer (.cd-timer)
    ├── Block (.cd-block)          ← 单个时间块
    │   ├── Value (.cd-value)      ← 数值 "3D" / "03" / "59"
    │   └── Unit (.cd-unit)        ← 单位标签 "D" / "H" / "M" / "S"（divide 模式）
    │
    └── Separator (.cd-sep)        ← ":"
```

---

## 变体

### 1. Text Position（文字位置）

| 变体 | 说明 | 使用场景 |
|------|------|----------|
| `text-top` | Label 在 Timer 上方居中 | 模块头部、CTA 上方、Banner 文案下方 |
| `text-left-top` | Label 在左上角，Timer 在下方左对齐 | Banner/Hero 副标题、大标题+倒计时组合 |
| `text-inline-left` | Label 与 Timer 在同一行，Label 在左 | 卡片内信息行、状态信息行 |

```
text-top:                text-left-top:           text-inline-left:
┌──────────────────┐     ┌──────────────────┐     ┌────────────────────────────┐
│    Ends in       │     │ Ends in          │     │ Ends in  3D : 03 : 59 : 23│
│ 3D : 03 : 59 :23│     │ 3D : 03 : 59 :23 │     └────────────────────────────┘
└──────────────────┘     └──────────────────┘
```

### 2. Date Unit（日期单位格式）

| 变体 | 说明 | 示例 |
|------|------|------|
| `mixed` | 天数与字母合并，其余仅数字 | `[3D] : [03] : [59] : [23]` |
| `divide` | 所有时间块仅数字，下方显示单位标签 | `[03/D] : [03/H] : [59/M] : [23/S]` |

```
mixed:                   divide:
┌────┐ ┌────┐ ┌────┐    ┌────┐ ┌────┐ ┌────┐ ┌────┐
│ 3D │:│ 03 │:│ 59 │    │ 03 │:│ 03 │:│ 59 │:│ 23 │
└────┘ └────┘ └────┘    │  D │ │  H │ │  M │ │  S │
  │      │      │       └────┘ └────┘ └────┘ └────┘
 days   hrs    min      days   hrs    min    sec
```

### 3. Size（响应式尺寸）

| Size | 断点 | 适用场景 |
|------|------|----------|
| `lg` | Web X ≥ 1248px | 桌面端 Banner/Hero |
| `md` | 768px ≤ X < 1248px | 平板端 |
| `sm` | X < 768px (≥ 375px) | 移动端 H5 |

---

## 尺寸规格

### Mixed 模式

| Token | Lg | Md | Sm |
|-------|----|----|-----|
| `block-height` | 44px | 36px | 32px |
| `block-min-width` | 44px | 36px | 32px |
| `block-padding` | 0 8px | 0 6px | 0 6px |
| `block-radius` | 8px | 8px | 6px |
| `block-gap` | 8px | 6px | 4px |
| `value-font` | 20px / 700 | 16px / 700 | 14px / 700 |
| `sep-font` | 16px / 400 | 14px / 400 | 12px / 400 |
| `label-font` | 14px / 400 | 13px / 400 | 12px / 400 |
| `label-gap` | 8px | 8px | 6px |

### Divide 模式

| Token | Lg | Md | Sm |
|-------|----|----|-----|
| `block-height` | 52px | 44px | 40px |
| `block-min-width` | 44px | 36px | 32px |
| `block-padding` | 4px 8px | 4px 6px | 2px 6px |
| `block-radius` | 8px | 8px | 6px |
| `block-gap` | 8px | 6px | 4px |
| `value-font` | 20px / 700 | 16px / 700 | 14px / 700 |
| `unit-font` | 10px / 500 | 9px / 500 | 8px / 500 |
| `sep-font` | 16px / 400 | 14px / 400 | 12px / 400 |
| `label-font` | 14px / 400 | 13px / 400 | 12px / 400 |
| `label-gap` | 8px | 8px | 6px |

---

## CSS 变量

```css
/* Block 背景 */
--cd-block-bg: rgba(255, 255, 255, 0.06);
--cd-block-radius: 8px;

/* 文字颜色 */
--cd-value-color: #FFFFFF;
--cd-unit-color: rgba(255, 255, 255, 0.4);
--cd-label-color: rgba(255, 255, 255, 0.5);
--cd-sep-color: rgba(255, 255, 255, 0.3);
```

---

## Block 内部布局

### Mixed 模式

```
┌─────────────┐
│   3D        │  ← value 居中，font-variant-numeric: tabular-nums
└─────────────┘
```

- Block 仅包含 `.cd-value`
- 天数值与单位字母合并显示（如 "3D"）
- 小时/分/秒仅数字

### Divide 模式

```
┌─────────────┐
│     03      │  ← value
│      D      │  ← unit label
└─────────────┘
```

- Block 包含 `.cd-value` + `.cd-unit`
- `flex-direction: column`
- `.cd-unit` 字号更小，颜色更淡

---

## Separator 规格

```
Block ── : ── Block ── : ── Block ── : ── Block
```

- 冒号 `:` 使用 `.cd-sep`
- 颜色 `--cd-sep-color`
- 与 Block 之间通过 `gap` 控制间距
- Mixed 模式 4 个块：`[Days] : [Hours] : [Minutes] : [Seconds]`
- Divide 模式 4 个块：`[DD] : [HH] : [MM] : [SS]`

---

## 响应式布局

### text-top（居中场景）

```
Desktop (≥1248):                    Mobile (<768):
┌──────────────────────────────┐    ┌──────────────────────┐
│          Ends in             │    │       Ends in        │
│   [3D] : [03] : [59] : [23] │    │ [3D]:[03]:[59]:[23]  │
└──────────────────────────────┘    └──────────────────────┘
     ↑ label + timer 居中                ↑ sm 尺寸，间距收窄
```

### text-left-top（Hero 场景）

```
Desktop (≥1248):                    Mobile (<768):
┌──────────────────────────────┐    ┌──────────────────────┐
│ Ends in                      │    │ Ends in              │
│ [3D] : [03] : [59] : [23]   │    │ [3D]:[03]:[59]:[23]  │
└──────────────────────────────┘    └──────────────────────┘
     ↑ 左对齐                             ↑ 居中对齐
```

### text-inline-left（卡片场景）

```
Desktop (≥1248):
┌────────────────────────────────────────┐
│ Ends in   [3D] : [03] : [59] : [23]   │
└────────────────────────────────────────┘
              ↑ 单行，label 与 timer baseline 对齐

Mobile (<768):
┌──────────────────────────────┐
│ Ends in [3D]:[03]:[59]:[23]  │
└──────────────────────────────┘
     ↑ sm 尺寸，gap 缩小
```

---

## 数据接口

```typescript
interface CountdownProps {
  /** 目标时间戳 (ms) */
  endTime: number;
  /** Label 文字，默认 "Ends in" */
  label?: string;
  /** 文字位置 */
  textPosition?: 'top' | 'left-top' | 'inline-left';
  /** 日期单位格式 */
  dateUnit?: 'mixed' | 'divide';
  /** 尺寸 — 推荐由响应式自动切换 */
  size?: 'lg' | 'md' | 'sm';
  /** 倒计时结束回调 */
  onEnd?: () => void;
}

interface CountdownValue {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
```

---

## 页面应用场景参考

### H5 Banner Hero（text-top + mixed + sm）

```
┌─────────────────────────────────────┐
│           [Logo/Image]              │
│                                     │
│    Gate.io x 3commas Trading        │
│          Campaign                   │
│  Unlock $700 Futures Voucher...     │
│                                     │
│            Ends in                  │
│     [3D] : [03] : [59] : [23]      │
│                                     │
│         [ Join Now ]                │
└─────────────────────────────────────┘
```

### Desktop Banner Hero（text-left-top + mixed + lg）

```
┌─────────────────────────────────────────────────────┐
│ [Tag: First trade bonus round]                      │
│                                                     │
│ Unlock $700 Futures Voucher +          [3D Image]   │
│ VIP6 for 30 Days Now!                               │
│                                                     │
│ Unlock $700 Futures Voucher...                      │
│                                                     │
│ Ends in                                             │
│ [3D] [03] [59] [23]                                 │
│                                                     │
│ [ View ]  [Rules] [Share]                           │
└─────────────────────────────────────────────────────┘
```
