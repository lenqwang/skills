# Platform 基座 — 交易所 + Web3/Pay 共享层

> Exchange 和 Web3/Pay 共享的设计基座。两条业务线在 Figma 中 82-96% 的组件共享相同节点 ID，
> 本层定义共享的设计约束、组件规格和布局模式。

## 品牌调性

专业 | 高效 | 信息密度高 | 数据驱动

## 视觉特征

- 克制的色彩，以中性色为主，功能色强调
- 多面板、侧栏 + 主区、网格密排
- 微动效、数据过渡、hover 反馈
- 高信息密度（展示数据为主）
- 功能型按钮、操作面板

## 品牌色

由各业务线覆盖层定义：
- Exchange: `--brand: #0055FF`（蓝色）
- Web3/Pay: `--brand: #17E5A1`（绿色）

## 继承

```
extends: tokens/* + components/* + contract/*
```

## 数据来源

Figma 组件库分析（2025年10月版本）：
- Exchange Web (V5.1): 69 pages, fileKey: kQIx9xKLiyO6KZIbazNSM2
- Web3/Pay Web: 68 pages, fileKey: qGCMQ5Gk1wpVCNYBO9XcEO
- App V6: 96 pages, fileKey: 9HordMtYdfmXOYwExRy1MF
- Web3/Pay App: 79 pages, fileKey: ktUQDLTgRjGIFHX5U7nkgY

## 共享组件

### 基础样式
Font 字阶 | Grid 栅格 | Spacing 间距 | Shadow 投影 | Radius 圆角

### 全局通用
Button | Checkbox | Selector | Switch | Loading | Line/Divider

### 导航
Header/Footer (Web) / Navbar (App) | Tab | Steps | Breadcrumb | Anchor | Pagination

### 反馈
Modal/Dialog | Alert | Message/Toast | Result | Notification | Tooltips | UserGuide

### 展示
Avatar | Badge | CoinTitle | Countdown | Banner | Collapse | Empty |
Image | NumberView | Progress | Tag | Carousel | Description

### 录入
Input | NumberInput | Search | Dropdown/Select | Slider | TimePicker |
Rating | Upload

## 扩展规则

见 [rules-ext.md](./rules-ext.md)

## 布局体系

见 [layout.md](./layout.md) — 4 种布局模式（sidebar / trading / wallet / list）

## 平台共享业务组件

以下组件由 Exchange 和 Web3/Pay 共同使用，Campaign 不使用：

| 组件 | 规格文件 | 说明 |
|------|---------|------|
| CoinTitle | [coin-title.md](./components/coin-title.md) | 币种标题（4 种尺寸） |
| NumberView | [number-view.md](./components/number-view.md) | 数值显示（涨跌色 + 精度） |
| TableV5 | [table-v5.md](./components/table-v5.md) | 平台表格（排序 + 星标） |

各业务线独有组件见：
- Exchange: [exchange/domain.md](../exchange/domain.md)
- Web3/Pay: [web3pay/domain.md](../web3pay/domain.md)
