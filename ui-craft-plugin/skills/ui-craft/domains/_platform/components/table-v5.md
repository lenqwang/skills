---
scope: [exchange, web3pay]
layer: L2
---
# Table V5 表格

> 来源: Figma `Table_V5` (8519:46523)
> 归属: platforms/web（仅 Web 端）
> 状态: 基于 Figma V5.1 定义

---

## 组件概述

平台级数据表格，用于行情列表、交易记录、订单列表等高密度数据展示场景。
与 Campaign 表格的区别：行高更紧凑、支持排序、支持自选星标。

## 子组件

| 组件 | 节点 ID | 说明 |
|------|---------|------|
| Table Header_V5/item | 8543:86892 内 | 表头单元格 |
| Table Header_V5/item/Sort | 8543:86892 内 | 可排序表头 |
| Table Cell_V5/item | 8543:86892 内 | 数据单元格 |
| Table Cell_V5 | 8543:86892 内 | 单元格容器 |
| Table Cell_V5/star | 8543:86892 内 | 自选星标 |

## 结构树

```
Table
├── Header
│   ├── HeaderCell[]
│   │   ├── label               # 列标题
│   │   └── sort-icon?          # 排序图标（升/降/无）
├── Body
│   ├── Row[]
│   │   ├── Cell[]
│   │   │   ├── star?           # 自选星标（第一列）
│   │   │   ├── CoinTitle?      # 币种（引用 CoinTitle 组件）
│   │   │   ├── NumberView?     # 数值（引用 NumberView 组件）
│   │   │   └── text            # 普通文本
│   │   └── hover-bg            # 悬停高亮
├── Footer?
│   └── Pagination              # 翻页器
```

## Token 映射

| 元素 | 值 | 说明 |
|------|-----|------|
| 表头背景 | `var(--bg-muted)` / #131516 | 深色模式 |
| 表头文字 | `var(--text-secondary)` | 灰色 |
| 表头字号 | 12px regular | — |
| 行高 | 48px | 比 Campaign 56px 更紧凑 |
| 行背景（默认） | transparent | — |
| 行背景（hover） | `var(--bg-elevated)` / #303236 | — |
| 行边框 | `var(--border)` / rgba(255,255,255,0.1) | — |
| 数据字号 | 14px regular | — |
| 数据文字 | `var(--text-primary)` | — |
| 星标（未选） | `var(--text-secondary)` | 灰色空心 |
| 星标（已选） | `var(--warning)` / #FFB020 | 黄色实心 |

## 排序状态

| 状态 | 图标 | 说明 |
|------|------|------|
| unsorted | ↕ (双箭头，灰色) | 未排序 |
| asc | ▲ (高亮) + ▽ (灰色) | 升序 |
| desc | △ (灰色) + ▼ (高亮) | 降序 |

## 与 Campaign 表格的差异

| 属性 | Platform Table | Campaign Table |
|------|---------------|----------------|
| 行高 | 48px | 56px |
| 表头背景 | `--bg-muted` | `surface.muted` |
| 自选星标 | 支持 | 不支持 |
| 排序 | 内置排序图标 | 无排序 |
| 圆角 | 8px | 8px |
| 分页 | Pagination 组件 | 无 |
| 信息密度 | 高（紧凑间距） | 中（宽松间距） |

## 使用场景

- 行情列表（自选 + 币种 + 价格 + 涨跌 + 成交量）
- 交易记录（时间 + 方向 + 价格 + 数量 + 状态）
- 订单列表（币种 + 方向 + 价格 + 数量 + 操作）
- 资产列表（币种 + 余额 + 冻结 + 估值）

## 数据接口

```typescript
interface TableColumn {
  key: string;
  title: string;
  width?: number;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
  render?: (value: any, row: any) => ReactNode;
}

interface PlatformTableProps {
  columns: TableColumn[];
  data: any[];
  rowHeight?: number;        // 默认 48px
  showStar?: boolean;        // 是否显示自选列
  onStarChange?: (row: any) => void;
  onSort?: (key: string, direction: 'asc' | 'desc') => void;
  pagination?: {
    current: number;
    total: number;
    pageSize: number;
  };
}
```

## Figma 节点

| 平台 | 节点 ID | 说明 |
|------|---------|------|
| Exchange Web | 8519:46523 (page) | 含 Guidelines |
| Web3 Web | 8519:46523 | 同源 |
