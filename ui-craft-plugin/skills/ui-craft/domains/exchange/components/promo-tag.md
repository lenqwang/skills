---
scope: [exchange]
layer: L2
---
# PromoTag 活动促销标签

> 归属: exchange-shared（Rewards Hub / 营销页通用）
> 状态: STABLE — 基于 Figma 福利中心设计稿精确提取
> 场景: 任务行 Promo 倒计时提示、活动卡片促销标记

---

## 组件概述

活动标签，含 "Promo" 橙色前缀和灰色倒计时文字。

## 结构树

```
PromoTag
├── PromoLabel              # "Promo" 前缀（橙色）
└── CountdownText           # 倒计时文字（灰色）
```

## 精确像素规格

### H5

```css
.promo-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 14px;
}

.promo-tag__label {
  font-size: 15px;
  font-weight: 400;
  color: #FF9447;
}

.promo-tag__countdown {
  font-size: 15px;
  font-weight: 400;
  color: #84888C;
}
```

### Web

```css
.promo-tag-web {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 14px;
}

.promo-tag-web__label {
  font-size: 15px;
  font-weight: 500;
  color: #FF9447;
}

.promo-tag-web__countdown {
  font-size: 15px;
  font-weight: 400;
  color: #84888C;
}
```

**示例**：`Promo 3D 03:59:23`

## Token 映射

| 属性 | 值 |
|------|-----|
| 高度 | 14px |
| Promo 文字色 | `#FF9447` (--color-warning) |
| 倒计时文字色 | `#84888C` (--text-tertiary) |
| 字号 | 15px |
| 间距 | 4px |

## Figma 来源

- Rewards Hub: rolyycBTmxioksI63PQqbL
