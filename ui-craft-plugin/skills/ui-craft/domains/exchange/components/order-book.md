---
scope: [exchange]
layer: L2
---
# OrderBook 订单簿 [DRAFT]

> 归属: exchange 独有
> 状态: DRAFT — 基于 Exchange 通用模式，待 Figma 补充

---

## 组件概述

深度订单簿组件，展示买卖挂单数据。通常在交易页左侧，
实时显示买方和卖方的挂单价格和数量，支持点击快速填入价格。

## 结构树

```
OrderBook
├── Header
│   ├── ViewToggle                # 展示切换
│   │   ├── both                  # 买+卖
│   │   ├── bids-only             # 仅买单
│   │   └── asks-only             # 仅卖单
│   └── PrecisionSelector         # 精度选择
│       ├── 0.01
│       ├── 0.1
│       └── 1
├── ColumnHeaders                  # 列标题
│   ├── price                     # "价格(USDT)"
│   ├── amount                    # "数量(BTC)"
│   └── total                     # "累计"
├── AsksSection                    # 卖单区（红色）
│   ├── AskRow[]                  # 卖单行（从高到低）
│   │   ├── price                 # 红色价格
│   │   ├── amount                # 数量
│   │   ├── total                 # 累计
│   │   └── depth-bar             # 深度条（红色，右对齐）
├── SpreadRow                      # 价差行
│   ├── lastPrice                 # 最新成交价
│   ├── change                    # 涨跌额
│   └── arrow                     # 涨/跌箭头
├── BidsSection                    # 买单区（绿色）
│   ├── BidRow[]                  # 买单行（从高到低）
│   │   ├── price                 # 绿色价格
│   │   ├── amount                # 数量
│   │   ├── total                 # 累计
│   │   └── depth-bar             # 深度条（绿色，右对齐）
```

## Token 映射

| 元素 | 值 | 说明 |
|------|-----|------|
| 容器背景 | `var(--bg-card)` | — |
| 卖单价格 | `var(--color-down)` #F74B60 | 红色 |
| 买单价格 | `var(--color-up)` #2BC287 | 绿色 |
| 数量/累计 | `var(--text-primary)` | — |
| 列标题 | `var(--text-secondary)` + 12px | — |
| 最新价格 | `var(--text-primary)` + 16px bold | — |
| 价差 | `var(--text-secondary)` + 12px | — |
| 深度条（卖） | rgba(247,75,96,0.15) | 红色半透明 |
| 深度条（买） | rgba(43,194,135,0.15) | 绿色半透明 |
| 行高 | 20-24px | 极紧凑 |
| 字体 | tabular-nums, monospace | 等宽对齐 |
| 字号 | 12px | — |
| hover 行 | `var(--bg-muted)` | — |
| 精度切换 | `var(--text-secondary)` 12px | 下拉选择 |

## 交互规则

- 点击卖单行 → 价格填入 TradePanel 的价格输入框
- 点击买单行 → 价格填入 TradePanel 的价格输入框
- 深度条宽度 = 当前行累计 / 最大累计 × 100%
- 实时更新：WebSocket 推送增量数据

## 平台差异

| 属性 | Web | App |
|------|-----|-----|
| 显示行数 | 15-20 行（买+卖） | 5-7 行（买+卖） |
| 位置 | 交易页左侧面板 | K 线下方或独立 Tab |
| 精度切换 | 下拉菜单 | 底部 ActionSheet |

## 数据接口

```typescript
interface OrderBookEntry {
  price: number;
  amount: number;
  total: number;
}

interface OrderBookProps {
  asks: OrderBookEntry[];      // 卖单（价格从低到高）
  bids: OrderBookEntry[];      // 买单（价格从高到低）
  lastPrice: number;
  priceChange: number;
  precision: number;
  symbol: string;
  onPriceClick: (price: number) => void;
  view?: 'both' | 'bids' | 'asks';
}
```
