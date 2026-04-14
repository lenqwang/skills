---
scope: [exchange, web3pay]
layer: L2
---
# NumberView 数值显示

> 来源: Figma `NumberViewV5` (8104:12696)
> 归属: platform（Exchange + Web3 共享）
> 状态: 基于 Figma V5.1 定义

---

## 组件概述

标准化数值展示组件，支持价格、涨跌幅、金额等多种数值场景。
提供涨跌色、精度控制、前缀/后缀、字号分级等能力。

## 组件集

| 组件集 | 平台 | 字号 | 节点 ID |
|--------|------|------|---------|
| NumberViewV5-web/subtitle-18px | Web | 18px | 8119:16300 内 |
| NumberViewV5-web/subtitle-16px | Web | 16px | 8119:16300 内 |
| NumberViewV5-web/subtitle-12px | Web | 12px | 8119:16300 内 |
| NumberViewV5-H5/subtitle-14px | H5 | 14px | 8119:16300 内 |
| NumberViewV5-H5/subtitle-12px | H5 | 12px | 8119:16300 内 |

## 结构树

```
NumberView
├── prefix?                # 前缀符号（$、¥ 等）
├── integer                # 整数部分
├── decimal?               # 小数部分
├── suffix?                # 后缀（%、USDT 等）
├── subtitle?              # 副标题行（换算值、对比值）
└── arrow?                 # 涨跌箭头图标
```

## 属性 (Properties)

| 属性 | 类型 | 默认值 | 可选值 | 说明 |
|------|------|--------|--------|------|
| `Size` | Variant | 18px | 18px / 16px / 14px / 12px | 主数值字号 |
| `Color` | Variant | default | default / up / down | 涨跌色 |
| `Arrow` | Boolean | false | — | 是否显示涨跌箭头 |
| `Subtitle` | Boolean | false | — | 是否显示副标题 |
| `Prefix` | Text | — | — | 前缀文本 |
| `Suffix` | Text | — | — | 后缀文本 |

## Token 映射

| 元素 | Token | CSS 变量 | 说明 |
|------|-------|---------|------|
| 默认数值 | `text.primary` | `var(--text-primary)` | — |
| 涨 (up) | — | `var(--color-up)` | 默认绿色 #2BC287 |
| 跌 (down) | — | `var(--color-down)` | 默认红色 #F74B60 |
| 副标题 | `text.secondary` | `var(--text-secondary)` | — |
| 前缀/后缀 | `text.secondary` | `var(--text-secondary)` | 比主数值弱化 |
| 字体 | `fontFamily.mono` | tabular-nums, monospace | 等宽对齐 |

## 精度规则

| 场景 | 精度 | 示例 |
|------|------|------|
| BTC 价格 | 2 位小数 | 67,234.56 |
| 小币种价格 | 4-8 位小数 | 0.00001234 |
| 涨跌幅 | 2 位小数 + % | +5.23% |
| 金额（USDT） | 2 位小数 | $1,234.56 |
| 数量 | 4 位小数 | 0.1234 |

## 平台差异

| 属性 | Web | H5/App |
|------|-----|--------|
| 主字号档位 | 18px / 16px / 12px | 14px / 12px |
| 对齐方式 | 右对齐（表格场景） | 左对齐（列表场景） |
| 副标题位置 | 主数值下方 | 主数值下方 |

## 使用场景

| 场景 | Size | Color | Arrow | Subtitle |
|------|------|-------|-------|----------|
| 行情列表价格 | 16px | default | false | true（≈$xx） |
| 涨跌幅 | 14px | up/down | true | false |
| 资产余额 | 18px | default | false | true（≈$xx） |
| 表格数值 | 12px | default | false | false |

## 数据接口

```typescript
interface NumberViewProps {
  value: number | string;
  precision?: number;          // 小数位数
  prefix?: string;             // 前缀，如 "$"
  suffix?: string;             // 后缀，如 "%" / "USDT"
  color?: 'default' | 'up' | 'down';
  showArrow?: boolean;
  subtitle?: string;           // 副标题文本
  size?: 18 | 16 | 14 | 12;
  thousandSeparator?: boolean; // 千分位
}
```

## Figma 节点

| 平台 | 节点 ID |
|------|---------|
| Exchange Web | 8104:12696 (page) |
| Web3 Web | 8104:12696 |
| Exchange App | 1176:46110 |
| Web3 App | 1176:46110 |
