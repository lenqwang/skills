---
scope: [exchange]
layer: L2
---
# PortfolioSummary 资产概览

> 归属: exchange 独有
> 状态: STABLE — 基于 Figma App Copy Trading 页面精确提取
> 场景: 跟单/资产页面顶部的资产总览区域

---

## 组件概述

展示用户总资产、币种、未实现盈亏的紧凑型摘要组件。用于 Copy Trading 页面顶部。

## 结构树

```
PortfolioSummary
├── Label                             # "Total Assets" + 眼睛图标
├── Amount                            # "8,139.52"
│   ├── Value                        # 数值
│   └── Unit                         # "USDx >"
└── PnL                               # "Unrealized PnL +0.02"
```

## 精确像素规格

### 容器

```css
.portfolio-summary {
  padding: 12px 16px 16px;
  background: var(--bg-primary, #FFFFFF);
}
```

### Label 行

```css
.label-row {
  display: flex;
  align-items: center;
  gap: 4px;
}

.label-text {
  font-size: 12px;
  line-height: 15.8px;
  color: var(--text-tertiary, #84888C);
}

.eye-icon {
  width: 16px;
  height: 16px;
  color: var(--text-tertiary, #84888C);
}
```

### 金额

```css
.amount-row {
  display: flex;
  align-items: baseline;
  margin-top: 4px;
}

.amount-value {
  font-family: 'Gate Switzer', system-ui, sans-serif;
  font-variant-numeric: tabular-nums;
  font-size: 30px;
  font-weight: 700;
  line-height: 39.6px;
  color: var(--text-primary, #070808);
  letter-spacing: -0.5px;
}

.amount-unit {
  font-size: 14px;
  font-weight: 400;
  line-height: 18.5px;
  color: var(--text-secondary, #484B51);
  margin-left: 4px;
}

.amount-arrow {
  font-size: 14px;
  color: var(--text-tertiary, #84888C);
  margin-left: 2px;
}
```

### 未实现盈亏

```css
.pnl-row {
  margin-top: 4px;
}

.pnl-label {
  font-size: 12px;
  line-height: 15.8px;
  color: var(--text-tertiary, #84888C);
}

.pnl-value--positive {
  color: var(--color-up, #2BC287);
  margin-left: 4px;
}

.pnl-value--negative {
  color: var(--color-down, #F74B60);
  margin-left: 4px;
}
```

## Token 映射

| 属性 | Token | 值 |
|------|-------|-----|
| 容器内边距 | 12px 16px 16px | 上 12 / 左右 16 / 下 16 |
| 金额字号 | -- | 30px DIN Bold |
| 金额行高 | -- | 40px |
| 单位字号 | -- | 14px Regular |
| PnL 字号 | -- | 12px |
| 涨色 | --color-up | #2BC287 |
| 跌色 | --color-down | #F74B60 |

## Figma 来源

- App: 9HordMtYdfmXOYwExRy1MF (Gate App V6) — Copy Trading 页顶部
