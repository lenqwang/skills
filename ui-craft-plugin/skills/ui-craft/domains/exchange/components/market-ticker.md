---
scope: [exchange]
layer: L2
---
# MarketTicker 行情概览 [DRAFT]

> 归属: exchange 独有
> 状态: DRAFT — 基于 Exchange 通用模式，待 Figma 补充

---

## 组件概述

交易对行情概览条，展示当前价格、24H 涨跌幅、24H 最高/最低、24H 成交量等关键指标。
通常位于交易页顶部，作为当前交易对的核心数据摘要。

## 结构树

```
MarketTicker
├── CoinTitle                      # 币种标题（引用 CoinTitle 组件）
│   ├── icon                      # 币种图标
│   ├── symbol                    # "BTC/USDT"
│   └── favorite-star?            # 自选星标
├── LastPrice                      # 最新价
│   ├── value                     # NumberView (大号)
│   └── fiat-value                # ≈ $67,234.56
├── ChangePercent                  # 24H 涨跌幅
│   └── value                     # NumberView (带色彩 + 箭头)
├── StatsGrid                      # 24H 统计
│   ├── High
│   │   ├── label                 # "24H高"
│   │   └── value                 # NumberView
│   ├── Low
│   │   ├── label                 # "24H低"
│   │   └── value                 # NumberView
│   ├── Volume
│   │   ├── label                 # "24H量"
│   │   └── value                 # NumberView
│   └── Turnover
│       ├── label                 # "24H额"
│       └── value                 # NumberView
```

## Token 映射

| 元素 | 值 | 说明 |
|------|-----|------|
| 容器背景 | `var(--bg-card)` | — |
| 最新价 | `var(--text-primary)` + 20px bold | — |
| 法币换算 | `var(--text-secondary)` + 12px | — |
| 涨幅 | `var(--color-up)` + 14px semibold | 绿色 |
| 跌幅 | `var(--color-down)` + 14px semibold | 红色 |
| 统计标签 | `var(--text-secondary)` + 12px | — |
| 统计值 | `var(--text-primary)` + 14px | — |
| 自选星标 | `var(--warning)` 已选 / `var(--text-secondary)` 未选 | — |
| 间距 | 8-12px 统计项间距 | — |

## 平台差异

| 属性 | Web | App |
|------|-----|-----|
| 布局 | 水平排列（左: 币种+价格，右: 统计网格） | 垂直布局（价格在上，统计在下） |
| 位置 | 交易页顶部横条 | 交易页顶部 + 可折叠 |
| 宽度 | 全宽 | 全宽 |
| 自选星标 | 币种名称右侧 | 导航栏右上角 |

## 数据接口

```typescript
interface MarketTickerProps {
  symbol: string;          // "BTC_USDT"
  lastPrice: number;
  priceChange: number;     // 24H 价格变动
  priceChangePercent: number; // 24H 涨跌幅 %
  high24h: number;
  low24h: number;
  volume24h: number;       // 成交量（基础币种）
  turnover24h: number;     // 成交额（计价币种）
  isFavorite: boolean;
  onFavoriteChange?: (v: boolean) => void;
}
```
