---
scope: [exchange, web3pay]
layer: L2
---
# CoinTitle 币种标题

> 来源: Figma `Coin Title-web` (7778:40743) / `Coin Title-H5` (7778:46866)
> 归属: platform（Exchange + Web3 共享）
> 状态: 基于 Figma V5.1 定义

---

## 组件概述

展示币种图标 + 名称 + 缩写的复合标题组件，用于行情列表、交易面板、资产页等场景。

## 结构树

```
CoinTitle
├── Coin-{platform}/item          # 币种图标
│   └── <coin-icon>               # 圆形图标，大小随 Size 变化
├── title                         # 文字区
│   ├── name                      # 币种名称（如 "BTC"）
│   └── subtext?                  # 副标题（如 "Bitcoin"，可选）
```

## 属性 (Properties)

| 属性 | 类型 | 默认值 | 可选值 | 说明 |
|------|------|--------|--------|------|
| `Size` | Variant | 40px | 40px / 28px / 24px / 20px | 图标尺寸 |
| `Subtext` | Boolean | true | true / false | 是否显示副标题 |

## 尺寸规格

| Size 变体 | 整体尺寸 | 图标大小 | 名称字号 | 副标题字号 | 间距（图标-文字） |
|-----------|---------|---------|---------|-----------|-----------------|
| 40px | 100×40 | 40×40 | 16px semibold | 12px regular | 8px |
| 28px | 82×37 | 28×28 | 14px semibold | 12px regular | 8px |
| 24px | 74×37 | 24×24 | 14px semibold | 12px regular | 6px |
| 20px | 70×34 | 20×20 | 14px medium | 12px regular | 6px |

## 平台差异

### Web

```
CoinTitle-web
├── Coin-web/item (圆形图标)
├── title
│   ├── name (行内)
│   └── subtext (行内，灰色，name 后跟随)
```

### H5 (移动端)

```
CoinTitle-H5
├── Coin-H5/item (圆形图标)
├── title
│   ├── name (第一行)
│   └── subtext (第二行，灰色)
```

## Token 映射

| 元素 | Token | CSS 变量 |
|------|-------|---------|
| 币种名称 | `text.primary` | `var(--text-primary)` |
| 副标题 | `text.secondary` | `var(--text-secondary)` |
| 图标容器 | — | 圆形 `border-radius: 50%` |
| 图标-文字间距 | `space.sm` | 8px (40/28px) 或 6px (24/20px) |

## 状态枚举

| 状态 | 说明 |
|------|------|
| default | 正常展示 |
| with-subtext | 展示副标题（全称） |
| without-subtext | 仅展示币种代码 |
| loading | 骨架屏（图标 + 文字占位） |

## 使用场景

| 场景 | 推荐 Size | Subtext |
|------|----------|---------|
| 行情列表行 | 24px | false |
| 交易面板标题 | 40px | true |
| 资产列表 | 28px | true |
| 紧凑表格 | 20px | false |

## 数据接口

```typescript
interface CoinTitleProps {
  symbol: string;          // 币种代码，如 "BTC"
  name?: string;           // 币种全称，如 "Bitcoin"
  iconUrl: string;         // 图标 URL
  size?: 40 | 28 | 24 | 20; // 图标尺寸
  showSubtext?: boolean;   // 是否显示副标题
  onClick?: () => void;    // 点击回调
}
```

## Figma 节点

| 平台 | 组件集 | 节点 ID |
|------|--------|---------|
| Exchange Web | Coin Title-web | 7778:40743 |
| Exchange Web | Coin-web/item | 7778:37047 |
| Exchange Web | Coin Title-H5 | 7778:46866 |
| Web3 Web | Coin Title-web | 7778:40743 |
