---
scope: [exchange]
layer: L2
---
# AnnouncementBanner 通知横幅

> 归属: platform-shared（Exchange/Web3 通用），暂放 exchange
> 状态: STABLE — 基于 Figma App Copy Trading 页面精确提取
> 场景: 页面内嵌的运营通知 / 活动推广横幅

---

## 组件概述

页面内嵌的单行/双行通知横幅，带图标、文案、关闭按钮和分页指示器。
常用于 Copy Trading 页、行情页等展示运营信息。

## 结构树

```
AnnouncementBanner
├── Icon                              # 左侧图标/图片
├── Content                           # 文案（1-2行）
├── CloseButton                       # 关闭按钮
└── Pagination                        # 分页 "1/4"
```

## 精确像素规格

### 容器

```css
.announcement-banner {
  display: flex;
  align-items: center;
  margin: 8px 16px;
  padding: 12px;
  background: var(--bg-secondary, #F5F6F7);
  border-radius: 8px;
  gap: 10px;
  position: relative;
}
```

### Icon 图标

```css
.banner-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  flex-shrink: 0;
  overflow: hidden;
}
```

### Content 文案

```css
.banner-content {
  flex: 1;
  min-width: 0;
}

.banner-text {
  font-size: 13px;
  font-weight: 400;
  line-height: 17.2px;
  color: var(--text-primary, #070808);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

### CloseButton 关闭

```css
.banner-close {
  width: 16px;
  height: 16px;
  color: var(--text-tertiary, #84888C);
  flex-shrink: 0;
  cursor: pointer;
  position: absolute;
  top: 8px;
  right: 8px;
}
```

### Pagination 分页

```css
.banner-pagination {
  position: absolute;
  bottom: 6px;
  right: 12px;
  font-size: 10px;
  line-height: 13.2px;
  color: var(--text-tertiary, #84888C);
}
```

## Token 映射

| 属性 | Token | 值 |
|------|-------|-----|
| 外边距 | 8px 16px | 上下 8 / 左右 16 |
| 内边距 | 12px | 四边 12 |
| 背景色 | --bg-secondary | #F5F6F7 |
| 圆角 | --radius-card | 8px |
| 图标尺寸 | -- | 36px |
| 图标圆角 | --radius-card | 8px |
| 文案字号 | -- | 13px Regular |
| 关闭按钮 | -- | 16px |
| 分页字号 | -- | 10px |

## Figma 来源

- App: 9HordMtYdfmXOYwExRy1MF (Gate App V6) — Copy Trading 页
