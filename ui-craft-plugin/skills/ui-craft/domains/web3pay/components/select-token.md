---
scope: [web3pay]
layer: L2
---
# SelectToken 选择币种

> 来源: Figma Web3/Pay App `49031:18699`
> 归属: web3pay 独有
> 状态: 基于 Figma GT-Web3 & Pay App 组件库

---

## 组件概述

币种选择器，用于 Swap、转账、DeFi 等场景选择目标币种。
支持按分类 Tab 筛选（Swap / Meme / Perps 等）、搜索、骨架屏加载。

## 结构树

```
SelectToken
├── Header
│   ├── title                     # "选择币种"
│   └── close-btn
├── SearchBar                     # 搜索框
├── CategoryTabs                  # 分类 Tab
│   ├── Tab (Swap)
│   ├── Tab (Meme)
│   ├── Tab (Perps)
│   └── ...
├── TokenList                     # 币种列表
│   ├── TokenRow[]
│   │   ├── CoinIcon             # 币种图标
│   │   ├── name                  # 币种代码 (BTC)
│   │   ├── fullname              # 全称 (Bitcoin)
│   │   ├── balance?              # 持有数量
│   │   └── value?                # 估值
│   └── LoadMore                  # 下拉加载
├── SkeletonState                 # 骨架屏
│   ├── search-placeholder
│   ├── tab-placeholder
│   └── list-placeholder
├── EmptyState                    # 无结果
└── PullToRefresh                 # 下拉刷新
```

## 页面状态

| 状态 | 说明 |
|------|------|
| Default | 正常展示分类列表 |
| Searching | 搜索中（显示搜索结果） |
| Search Empty | 搜索无结果 |
| Loading | 骨架屏加载 |

## Token 映射

| 元素 | 值 | 说明 |
|------|-----|------|
| 页面背景 | `var(--bg)` | — |
| 搜索框背景 | `var(--bg-muted)` | 圆角 8px |
| Tab 默认 | `var(--text-secondary)` | — |
| Tab 选中 | `var(--text-primary)` + 下划线 `var(--brand)` | — |
| 币种代码 | `var(--text-primary)` + 16px semibold | — |
| 币种全称 | `var(--text-secondary)` + 12px | — |
| 余额 | `var(--text-primary)` + 14px | 右对齐 |
| 估值 | `var(--text-secondary)` + 12px | 右对齐 |
| 币种图标 | 32×32 圆形 | — |
| 行高 | 56px | — |
| 行内边距 | 16px 水平 | — |
| 分割线 | `var(--border)` | — |

## 分类 Tab

基于 Figma 分析，预设分类：

| Tab | 说明 |
|-----|------|
| Swap | 现货兑换代币 |
| Meme | Meme 代币 |
| Perps | 永续合约代币 |
| All | 全部代币 |
| Recent | 最近使用 |

## 数据接口

```typescript
interface Token {
  symbol: string;          // "BTC"
  name: string;            // "Bitcoin"
  icon: string;
  balance?: number;
  value?: number;          // USDT 估值
  network?: string;
  category?: string[];     // ["swap", "perps"]
}

interface SelectTokenProps {
  tokens: Token[];
  categories?: string[];
  selected?: string;
  showBalance?: boolean;
  onSelect: (symbol: string) => void;
  onSearch?: (keyword: string) => void;
  onClose?: () => void;
}
```
