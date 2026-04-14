---
scope: [exchange]
layer: L2
---
# TraderCard 交易员卡片

> 归属: exchange 独有
> 状态: STABLE — 基于 Figma App Copy Trading 页面精确提取
> 场景: 跟单广场交易员列表

---

## 组件概述

跟单交易员信息卡片，展示交易员头像、昵称、跟单人数、收益率、PnL、迷你走势图和统计指标。
是 Copy Trading 页面的核心列表项组件。

## 结构树

```
TraderCard
├── Header                            # 顶部行
│   ├── Avatar                        # 头像
│   │   ├── Image                    # 圆形头像图片
│   │   └── Badge (optional)         # LIVE 徽章
│   ├── Info                          # 文字信息
│   │   ├── Name                     # 昵称（可截断）
│   │   └── Followers                # 跟单人数 "👤 298/500"
│   └── CopyButton                   # 跟单按钮
├── ROISection                        # 收益区域
│   ├── Label                        # "7D ROI | PnL"
│   ├── ROIValue                     # "+1,112.36%"
│   ├── PnLValue                     # "+13,108,492.36"
│   └── MiniChart                    # 迷你走势图
└── StatsRow                          # 底部统计行
    ├── Stat (Win Rate)
    ├── Stat (AUM)
    └── Stat (Copiers' PnL)
```

## 精确像素规格

### 容器

```css
.trader-card {
  padding: 16px;
  background: var(--bg-primary, #FFFFFF);
  border-bottom: 0.5px solid var(--border-secondary, #E7E9EE);
}
```

### Avatar 头像

```css
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
}

.avatar-badge {
  position: absolute;
  bottom: -2px;
  left: 50%;
  transform: translateX(-50%);
  height: 14px;
  padding: 0 4px;
  border-radius: 7px;
  background: #2BC287;
  color: #FFFFFF;
  font-size: 8px;
  font-weight: 600;
  line-height: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
```

### Header 布局

```css
.header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.info {
  flex: 1;
  min-width: 0;
}

.name {
  font-size: 15px;
  font-weight: 600;
  line-height: 19.8px;
  color: var(--text-primary, #070808);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 180px;
}

.followers {
  font-size: 12px;
  line-height: 15.8px;
  color: var(--text-tertiary, #84888C);
  margin-top: 2px;
}

.followers-icon {
  width: 12px;
  height: 12px;
  margin-right: 2px;
  vertical-align: middle;
}
```

### CopyButton 跟单按钮（关键差异点）

```css
.copy-button {
  min-width: 64px;
  height: 32px;
  padding: 0 16px;
  border-radius: 16px;
  border: none;
  cursor: pointer;
  flex-shrink: 0;

  background: var(--color-up, #2BC287);
  color: #FFFFFF;
  font-size: 14px;
  font-weight: 500;
  line-height: 32px;
}

.copy-button:active {
  background: #20A174;
}
```

> **设计关键点**：Copy 按钮使用涨色绿（#2BC287），与 ROI 正收益色一致，
> 传达"跟单 = 盈利"的视觉暗示。

### ROI 区域

```css
.roi-section {
  margin-top: 4px;
}

.roi-label {
  font-size: 12px;
  line-height: 15.8px;
  color: var(--text-tertiary, #84888C);
  margin-bottom: 4px;
}

.roi-value {
  font-family: 'Gate Switzer', system-ui, sans-serif;
  font-variant-numeric: tabular-nums;
  font-size: 22px;
  font-weight: 700;
  line-height: 29.0px;
}

.roi-value--positive {
  color: var(--color-up, #2BC287);
}

.roi-value--negative {
  color: var(--color-down, #F74B60);
}

.pnl-value {
  font-family: 'Gate Switzer', system-ui, sans-serif;
  font-variant-numeric: tabular-nums;
  font-size: 14px;
  font-weight: 400;
  line-height: 18.5px;
  color: var(--text-secondary, #484B51);
  margin-top: 2px;
}
```

### ROI + MiniChart 布局

```css
.roi-chart-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}

.roi-content {
  flex: 1;
}

.mini-chart {
  width: 80px;
  height: 40px;
  flex-shrink: 0;
}

.mini-chart-line {
  stroke-width: 1.5px;
  fill: none;
}

.mini-chart-line--positive {
  stroke: var(--color-up, #2BC287);
}

.mini-chart-line--negative {
  stroke: var(--color-down, #F74B60);
}

.mini-chart-area--positive {
  fill: rgba(43, 194, 135, 0.08);
}
```

### StatsRow 底部统计

```css
.stats-row {
  display: flex;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 0.5px solid var(--border-secondary, #E7E9EE);
}

.stat-item {
  flex: 1;
}

.stat-item:not(:first-child) {
  padding-left: 16px;
}

.stat-label {
  font-size: 11px;
  line-height: 14.5px;
  color: var(--text-tertiary, #84888C);
}

.stat-value {
  font-family: 'Gate Switzer', system-ui, sans-serif;
  font-variant-numeric: tabular-nums;
  font-size: 13px;
  font-weight: 500;
  line-height: 17.2px;
  color: var(--text-primary, #070808);
  margin-top: 2px;
}
```

## 变体

| 变体 | 差异 |
|------|------|
| Default | 标准展示 |
| With LIVE Badge | 头像底部带绿色 LIVE 徽章 |
| Following | CopyButton 变为 "Following" 灰色描边样式 |
| Unavailable | CopyButton disabled，灰色背景 |

### Following 状态按钮

```css
.copy-button--following {
  background: transparent;
  border: 1px solid var(--border-primary, #E7E9EE);
  color: var(--text-secondary, #484B51);
}
```

## Token 映射

| 属性 | Token | 值 |
|------|-------|-----|
| 卡片内边距 | --space-base | 16px |
| 头像尺寸 | -- | 40px |
| 头像-文字间距 | --space-md | 12px |
| 按钮圆角 | --radius-full | 16px (胶囊) |
| 按钮高度 | -- | 32px |
| 按钮背景色 | --color-up | #2BC287 (涨色绿) |
| ROI 字号 | -- | 22px DIN Bold |
| 统计行分割线 | --border-secondary | 0.5px #E7E9EE |
| 统计 label 字号 | -- | 11px |
| 统计 value 字号 | -- | 13px DIN Medium |
| 卡片分割线 | --border-secondary | 0.5px #E7E9EE |

## Figma 来源

- App: 9HordMtYdfmXOYwExRy1MF (Gate App V6) — Copy Trading 页
