---
scope: [exchange]
layer: L2
---
# TradePanel 交易面板 [DRAFT]

> 归属: exchange 独有
> 状态: DRAFT — 基于 Exchange App/Web 通用模式，待 Figma 补充

---

## 组件概述

买卖交易面板，是交易所核心交互组件。支持现货/合约/杠杆等交易类型，
包含方向切换、价格输入、数量输入、滑动条、下单按钮等。

## 结构树

```
TradePanel
├── DirectionTabs                  # 买入/卖出 Tab
│   ├── Tab (买入 Buy)            # 绿色高亮
│   └── Tab (卖出 Sell)           # 红色高亮
├── OrderTypeSelector              # 订单类型选择器
│   ├── 限价 Limit
│   ├── 市价 Market
│   └── 条件 Conditional
├── PriceInput                     # 价格输入
│   ├── label                     # "价格"
│   ├── input                     # 数字输入框
│   ├── stepper                   # +/- 步进器
│   └── unit                      # 计价单位 (USDT)
├── AmountInput                    # 数量输入
│   ├── label                     # "数量"
│   ├── input                     # 数字输入框
│   ├── stepper                   # +/- 步进器
│   └── unit                      # 币种 (BTC)
├── Slider                         # 百分比滑动条
│   ├── track                     # 轨道
│   ├── thumb                     # 滑块
│   └── marks                     # 25% / 50% / 75% / 100%
├── AvailableBalance               # 可用余额
│   ├── label                     # "可用"
│   └── value                     # NumberView
├── EstimatedTotal                 # 预估总额
│   ├── label                     # "交易额"
│   └── value                     # NumberView
└── SubmitButton                   # 下单按钮
    └── text                      # "买入 BTC" / "卖出 BTC"
```

## Token 映射

| 元素 | 值 | 说明 |
|------|-----|------|
| 面板背景 | `var(--bg-card)` | — |
| 买入 Tab 高亮 | `var(--color-up)` #2BC287 | 绿色 |
| 卖出 Tab 高亮 | `var(--color-down)` #F74B60 | 红色 |
| 买入按钮 | `var(--color-up)` 背景 + white 文字 | 全宽圆角 |
| 卖出按钮 | `var(--color-down)` 背景 + white 文字 | 全宽圆角 |
| 输入框背景 | `var(--bg-muted)` | 圆角 6px |
| 输入框文字 | `var(--text-primary)` + tabular-nums | 右对齐 |
| 标签 | `var(--text-secondary)` + 12px | — |
| 可用余额 | `var(--text-secondary)` + 12px | — |
| 滑动条轨道 | `var(--border)` | — |
| 滑动条已填充 | `var(--brand)` | 动态跟随方向色 |
| 步进器按钮 | `var(--text-secondary)` + 24px | +/- 图标 |
| 内边距 | 16px | — |
| 输入框间距 | 8px | — |

## 状态枚举

| 状态 | 说明 |
|------|------|
| buy | 买入模式（绿色主调） |
| sell | 卖出模式（红色主调） |
| limit | 限价单（显示价格输入） |
| market | 市价单（隐藏价格输入） |
| disabled | 未登录/余额不足 |
| loading | 下单提交中 |

## 平台差异

| 属性 | Web | App |
|------|-----|-----|
| 位置 | 页面右侧面板 | 底部 Sheet 或独立页 |
| 宽度 | 280-320px 固定 | 全屏宽 |
| 滑动条 | 鼠标拖拽 | 手势滑动 |
| 步进器 | 鼠标点击 | 长按连续步进 |

## 数据接口

```typescript
interface TradePanelProps {
  symbol: string;              // "BTC_USDT"
  direction: 'buy' | 'sell';
  orderType: 'limit' | 'market' | 'conditional';
  currentPrice: number;
  availableBalance: number;
  balanceCurrency: string;
  onSubmit: (order: {
    direction: 'buy' | 'sell';
    type: 'limit' | 'market';
    price?: number;
    amount: number;
  }) => void;
  precision: {
    price: number;
    amount: number;
  };
}
```
