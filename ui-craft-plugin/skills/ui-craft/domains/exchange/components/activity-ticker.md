---
scope: [exchange]
layer: L2
---
# ActivityTicker 活动播报条

> 归属: exchange-shared（Rewards Hub / 营销页通用）
> 状态: STABLE — 基于 Figma 福利中心设计稿精确提取
> 场景: 用户中奖播报、活动动态滚动展示

---

## 组件概述

毛玻璃半透明背景的水平滚动播报条，展示用户中奖/参与活动等动态信息。

## 结构树

```
ActivityTicker
├── ScrollContainer           # 滚动容器
│   └── TickerItem[]          # 播报项
│       ├── Avatar            # 用户头像
│       └── Message           # 播报文案
```

## 精确像素规格

### H5（36px 高，2 条并排）

```css
.activity-ticker-h5 {
  height: 36px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 0 12px;
  overflow: hidden;
}

.ticker-item-h5 {
  display: flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
  animation: ticker-scroll linear infinite;
}

.ticker-item-h5__avatar {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid #DFE0E2;
  flex-shrink: 0;
}

.ticker-item-h5__text {
  font-size: 18px;
  font-weight: 400;
  color: #FFFFFF;
}

@keyframes ticker-scroll {
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
}
```

**示例文案**：`GateUser6819**** won 10 USDT voucher 8 minutes ago`

### Web（60px 高，4 条并排）

```css
.activity-ticker-web {
  width: 100%; /* 1920px 全宽 */
  height: 60px;
  background: #0D0D0D;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.ticker-item-web {
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
  min-width: 450px;
  margin-right: 60px;
}

.ticker-item-web__avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid #DFE0E2;
  flex-shrink: 0;
}

.ticker-item-web__text {
  font-size: 21px;
  font-weight: 400;
  color: #FFFFFF;
}
```

## Token 映射

| 属性 | H5 | Web |
|------|-----|-----|
| 容器高度 | 36px | 60px |
| 容器背景 | `rgba(255,255,255,0.1)` + blur(10px) | `#0D0D0D` |
| 容器圆角 | 8px | 0（全宽） |
| 头像尺寸 | 20×20px | 36×36px |
| 文字字号 | 18px / 400 Regular | 21px / 400 Regular |
| 文字颜色 | `#FFFFFF` | `#FFFFFF` |
| 单条宽度 | 自适应 | 450px |
| 条间距 | — | 60px |
| 显示条数 | 2 条 | 4 条 |
| 动画 | 水平滚动，无限循环 | 水平滚动，无限循环 |

## Figma 来源

- Rewards Hub: rolyycBTmxioksI63PQqbL
