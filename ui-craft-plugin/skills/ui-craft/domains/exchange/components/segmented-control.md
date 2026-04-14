---
scope: [exchange]
layer: L2
---
# SegmentedControl 分段控件

> 归属: platform-shared（Exchange/Web3 通用），暂放 exchange
> 状态: STABLE — 基于 Figma App Copy Trading 页面精确提取
> 场景: 页面级切换（如 Futures/TradFi、Spot/Margin）

---

## 组件概述

胶囊形分段切换控件，用于 Navbar 内的页面级导航切换。
与 Tab 组件区别：SegmentedControl 用于等价的内容切换，Tab 用于内容分类浏览。

## 结构树

```
SegmentedControl
├── Track                             # 背景轨道
├── Segment (active)                  # 选中项
└── Segment (inactive)                # 未选中项
```

## 精确像素规格

### Track 轨道

```css
.segmented-track {
  display: inline-flex;
  align-items: center;
  height: 28px;
  border-radius: 16px;
  background: #F5F6F7;
  padding: 0;
  gap: 0;
}
```

### Segment 选项

```css
.segment {
  height: 28px;
  padding: 0 16px;
  border-radius: 14px;
  font-family: 'Gate Switzer', system-ui, sans-serif;
  font-size: 13px;
  font-weight: 500;
  line-height: 28px;
  white-space: nowrap;
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;
}

.segment--active {
  background: var(--bg-primary, #FFFFFF);
  color: var(--text-primary, #070808);
  font-weight: 600;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.segment--inactive {
  background: transparent;
  color: var(--text-secondary, #484B51);
  font-weight: 400;
}
```

> **设计关键点**：浅灰底胶囊形，Active 靠白底+阴影凸起区分。

## 变体

| 变体 | 说明 |
|------|------|
| 2-Segment | 两项切换（Futures / TradFi） |
| 3-Segment | 三项切换（Spot / Margin / Futures） |

## Token 映射

| 属性 | Token | 值 |
|------|-------|-----|
| Track 高度 | -- | 28px |
| Track 圆角 | --radius-full | 16px |
| Track 背景 | --bg-secondary | #F5F6F7 |
| Segment 内边距 | -- | 0 16px |
| Segment 高度 | -- | 28px |
| Segment 圆角 | -- | 14px |
| Active 背景 | --bg-primary | #FFFFFF |
| Active 文字 | --text-primary | #070808, font-weight 600 |
| Active 阴影 | -- | 0 1px 3px rgba(0,0,0,0.1) |
| Inactive 文字 | --text-secondary | #484B51, font-weight 400 |
| 字号 | -- | 13px Medium |

## 设计关键点

- 整体为**浅灰底胶囊形**，非描边线框
- Track 背景 #F5F6F7，无边框
- Active 靠**白底 + 阴影凸起**区分，无独立 border
- Inactive 透明背景，字重 400
- 选中态切换有 0.2s 过渡动画

## Figma 来源

- App: 9HordMtYdfmXOYwExRy1MF (Gate App V6)
