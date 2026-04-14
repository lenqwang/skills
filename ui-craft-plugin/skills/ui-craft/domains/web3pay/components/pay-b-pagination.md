---
scope: [web3pay]
layer: L2
context: pay-b
---

# Pagination 翻页器

> 来源: Figma [Pay-B端-商家后台](https://www.figma.com/design/tlFIl7F7A7Zl6e9WRLMDZo/) · Node `48:9904`（容器）/ `48:9850`（Item）
> 归属: web3pay / Pay B端商户后台
> 版本: v1.4.0

## 组件概述

V5 翻页器组件，用于 Table 列表底部翻页。一页 10 条数据，超出翻页。支持 7 种页码模式和 4 种 Item 状态。

## 组件架构

```
PaginationV5-web                    ← 翻页器容器
├── list                            ← 页码列表（flex 水平排列）
│   ├── PaginationV5-web/item (left, Inactive)   ← 上一页箭头
│   ├── PaginationV5-web/item (Inactive)         ← 普通页码
│   ├── PaginationV5-web/item (...)              ← 省略号
│   ├── PaginationV5-web/item (Active)           ← 当前选中页码
│   ├── PaginationV5-web/item (...)              ← 省略号
│   ├── PaginationV5-web/item (Inactive)         ← 末页页码
│   └── PaginationV5-web/item (right, Inactive)  ← 下一页箭头
```

## 组件属性（Props）

### PaginationV5-web（翻页器容器）

| 属性 | 类型 | 可选值 | 默认值 | 说明 |
|------|------|--------|--------|------|
| `page` | Enum | `1` / `2` / `3` / `4` / `5` / `Above 5` / `Jumper` | `1` | 当前页码模式 |

- `1` ~ `5`：页码 ≤5 时直接展示全部页码
- `Above 5`：页码 >5 时展示省略号截断模式（左箭头 · 页码 · ... · 当前页区域 · ... · 末页 · 右箭头）
- `Jumper`：带页码输入跳转模式

### PaginationV5-web/item（翻页器单项）

| 属性 | 类型 | 可选值 | 默认值 | 说明 |
|------|------|--------|--------|------|
| `status` | Enum | `Active` / `Inactive` / `Disable` / `Hover` | `Active` | 当前项状态 |
| `left` | Boolean | `true` / `false` | `false` | 是否为左箭头（上一页） |
| `right` | Boolean | `true` / `false` | `false` | 是否为右箭头（下一页） |

## 基础规格

| 属性 | Token / CSS 变量 | 值 | 说明 |
|------|-----------------|-----|------|
| Item 尺寸 | — | 28 × 28px | — |
| 圆角 | — | 100px（圆形） | `border-radius: 100px` |
| 内边距 | — | 4px | `padding: 4px` |
| Item 间距 | — | 8px | `gap: 8px` |
| 字体 | — | Switzer Medium 14px | `font-weight: 500; font-size: 14px` |
| 行高 | — | 1.3 | `line-height: 1.3` |
| 箭头图标尺寸 | — | 12 × 12px | — |

## 状态变体

| 状态 | 属性变化 | 说明 |
|------|---------|------|
| **Active（当前页）** | 背景 `#F5F6F7`（`--color-cmpt-button-soft`）· 文字 `#070808`（`--color-text-text-primary`）· 圆角 100px | 灰色圆形背景，当前选中页码 |
| **Inactive（可点击）** | 背景 透明 · 文字 `#070808`（`--color-text-text-primary`）· 圆角 99px | 无背景，可点击的其他页码/箭头 |
| **Hover（悬停）** | 背景 `#F5F6F7`（`--color-cmpt-button-soft`）· 文字 `#070808` · 圆角 100px | 鼠标悬停时与 Active 一致 |
| **Disable（禁用）** | 背景 透明 · 文字 `#C4C7CA`（`--color-text-text-quaternary`）· 圆角 99px | 首页时上一页箭头禁用 / 末页时下一页箭头禁用 |

## 箭头图标

| 方向 | 图标名称 | 尺寸 | 说明 |
|------|---------|------|------|
| 上一页 | `CEX_chevron_left` | 12 × 12px | Inactive 态 `#070808`，Disable 态 `#C4C7CA` |
| 下一页 | `CEX_chevron_right` | 12 × 12px | Inactive 态 `#070808`，Disable 态 `#C4C7CA` |

## 省略号（Ellipsis）

- 当页数 > 5 时，使用 `...` 文本替代中间页码
- 样式与普通 Inactive 页码一致（无背景，14px Medium）
- 不可点击（无 Hover 效果）

## Above 5 模式页码展示示例

```
◀  1  ...  4  5  [6]  7  8  ...  20  ▶

说明：
◀ = CEX_chevron_left（上一页）
▶ = CEX_chevron_right（下一页）
[6] = Active 态（当前页码，灰色背景）
... = 省略号
1, 4, 5, 7, 8, 20 = Inactive 态（可点击页码）
```

## 交互规则

1. 默认一页 **10 条**数据
2. 数据超出 10 条时自动展示翻页器
3. 页数 ≤5 使用 `page="1"~"5"` 模式，>5 使用 `Above 5` 省略模式
4. 点击页码切换到目标页，当前页变为 Active 态
5. 点击箭头跳转相邻页，已到边界时箭头变为 Disable
6. 非 Active 非 Disable 的页码 Hover 时显示灰色圆形背景
7. 省略号不可点击，代表被省略的连续页码

## CSS 实现参考

```css
/* Pagination 容器 */
.pagination-v5 {
  display: flex;
  align-items: center;
}

/* 页码列表 */
.pagination-v5__list {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* 单个页码项 */
.pagination-v5__item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  padding: 4px;
  border-radius: 100px;
  cursor: pointer;
  font-family: 'Switzer', 'GateProductSans', sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.3;
  color: var(--color-text-text-primary, #070808);
  white-space: nowrap;
  user-select: none;
  transition: background 0.15s ease;
}

/* Active 态 - 当前页码 */
.pagination-v5__item--active {
  background: var(--color-cmpt-button-soft, #F5F6F7);
}

/* Inactive 态 - 可点击页码（默认无背景） */
.pagination-v5__item--inactive {
  background: transparent;
}

/* Hover 态 */
.pagination-v5__item--inactive:hover {
  background: var(--color-cmpt-button-soft, #F5F6F7);
}

/* Disable 态 - 箭头禁用 */
.pagination-v5__item--disabled {
  background: transparent;
  color: var(--color-text-text-quaternary, #C4C7CA);
  cursor: not-allowed;
}
.pagination-v5__item--disabled svg {
  color: var(--color-text-text-quaternary, #C4C7CA);
}

/* 省略号 - 不可点击 */
.pagination-v5__item--ellipsis {
  background: transparent;
  cursor: default;
}
.pagination-v5__item--ellipsis:hover {
  background: transparent;
}

/* 箭头图标 */
.pagination-v5__arrow {
  width: 12px;
  height: 12px;
  flex-shrink: 0;
}
```
