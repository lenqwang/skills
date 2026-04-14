---
scope: [exchange]
layer: L2
---
# HotTag 热度标签

> 归属: exchange-shared（Rewards Hub / 活动页通用）
> 状态: STABLE — 基于 Figma 福利中心设计稿精确提取
> 场景: 热门活动标记、热度指示

---

## 组件概述

热度标签，红色渐变背景 + 火焰图标 + 数字，用于标记热门内容。

## 结构树

```
HotTag
├── FireIcon                 # 🔥 火焰图标
└── Number                   # 热度数字
```

## 精确像素规格

### H5

```css
.hot-tag {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  height: 22px;
  padding: 4px 8px;
  background: linear-gradient(135deg, #FF4D4F, #FF7875);
  border-radius: 4px;
}

.hot-tag__icon {
  width: 12px;
  height: 12px;
}

.hot-tag__text {
  font-size: 12px;
  font-weight: 500;
  color: #FFFFFF;
}
```

### Web

```css
.hot-tag-web {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  height: 22px;
  padding: 4px 10px;
  background: linear-gradient(135deg, #FF4D4F, #FF7875);
  border-radius: 4px;
}

.hot-tag-web__icon {
  width: 14px;
  height: 14px;
}

.hot-tag-web__text {
  font-size: 14px;
  font-weight: 500;
  color: #FFFFFF;
}
```

## Token 映射

| 属性 | H5 | Web |
|------|-----|-----|
| 高度 | 22px | 22px |
| 背景 | `#FF4D4F` 渐变 | `#FF4D4F` 渐变 |
| 圆角 | 4px | 4px |
| 图标尺寸 | 12×12px | 14×14px |
| 字号 | 12px | 14px |
| 内边距 | 4px 8px | 4px 10px |

## Figma 来源

- Rewards Hub: rolyycBTmxioksI63PQqbL
