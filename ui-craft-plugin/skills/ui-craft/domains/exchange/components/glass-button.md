---
scope: [exchange]
layer: L2
---
# GlassButton 毛玻璃按钮

> 归属: exchange-shared（Rewards Hub / 营销页通用）
> 状态: STABLE — 基于 Figma 福利中心设计稿精确提取
> 场景: HeroBanner Check In 按钮、分享按钮等毛玻璃场景

---

## 组件概述

毛玻璃半透明按钮，支持胶囊形（图标+文字）和圆形（仅图标）两种变体。

## 结构树

```
GlassButton
├── Icon (可选)              # 左侧图标
└── Label (可选)             # 按钮文字
```

## 变体

| 变体 | 尺寸 | 内容 | 用途 |
|------|------|------|------|
| **Pill** | 90×32px (H5) / 145×48px (Web) | 图标+文字 | Check In 等操作 |
| **Circle** | 32×32px (H5) / 48×48px (Web) | 仅图标 | 分享等辅助操作 |

## 精确像素规格

### H5

```css
/* 胶囊形 */
.glass-button-pill {
  height: 32px;
  padding: 0 16px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 99px;
  color: #FFFFFF;
  font-size: 14px;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
}

/* 圆形 */
.glass-button-circle {
  width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
```

### Web

```css
/* 胶囊形 */
.glass-button-pill-web {
  width: 145px;
  height: 48px;
  padding: 0 24px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 99px;
  color: #FFFFFF;
  font-size: 16px;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

/* 圆形 */
.glass-button-circle-web {
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
```

```html
<!-- H5 胶囊形 -->
<button style="height:32px; padding:0 16px; background:rgba(255,255,255,0.2); backdrop-filter:blur(10px); border:1px solid rgba(255,255,255,0.3); border-radius:99px; color:#FFF; font-size:14px; font-weight:500; display:inline-flex; align-items:center; gap:4px;">
  📅 Check In
</button>

<!-- H5 圆形 -->
<button style="width:32px; height:32px; background:rgba(255,255,255,0.2); backdrop-filter:blur(10px); border:1px solid rgba(255,255,255,0.3); border-radius:50%; display:flex; align-items:center; justify-content:center;">
  <!-- Share Icon -->
</button>
```

## Token 映射

| 属性 | H5 | Web |
|------|-----|-----|
| 背景 | `rgba(255,255,255,0.2)` | 同 H5 |
| 模糊 | `blur(10px)` | `blur(10px)` |
| 边框 | `1px solid rgba(255,255,255,0.3)` | 同 H5 |
| 胶囊圆角 | 99px | 99px |
| 圆形圆角 | 50% | 50% |
| 文字色 | `#FFFFFF` | `#FFFFFF` |
| 胶囊高度 | 32px | 48px |
| 圆形尺寸 | 32×32px | 48×48px |
| 字号 | 14px / 500 | 16px / 500 |

## Figma 来源

- Rewards Hub: rolyycBTmxioksI63PQqbL
