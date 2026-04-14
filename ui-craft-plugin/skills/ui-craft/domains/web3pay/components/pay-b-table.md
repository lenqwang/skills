---
scope: [web3pay]
layer: L2
context: pay-b
---

# Table 表格（Pay-B 定制）

> 来源: Figma [Pay-B端-商家后台](https://www.figma.com/design/tlFIl7F7A7Zl6e9WRLMDZo/) · Node `1627:83202`
> 归属: web3pay / Pay B端商户后台
> 版本: v1.4.0

## 组件概述

Pay B端商户后台表格完整规范，包含表头/数据行/Hover/特殊列/骨架屏/缺省页/操作列/操作下拉面板。继承 `_platform/table.md` 基础表格并扩展 Pay-B 特有功能。

字体样式：`B6 600 14px`（表头）/ `S7 600 16px`（金额）/ `B4 500 16px`（数据行）/ `B8 400 14px`（单位）/ `B7 500 14px`（翻页器/操作下拉）

## 外层容器（Table Wrapper）

| 属性 | Token / CSS 变量 | 值 | 说明 |
|------|-----------------|-----|------|
| 背景 | `--color-bg-primary` | `#FFFFFF` | — |
| 边框 | `--color-line-border-strong` | `1px solid #DFE0E2` | — |
| 圆角 | — | 16px | — |
| 内边距 | — | `24px` | 上下左右等距 24px |

```css
.table-gtpay-wrapper {
  background: var(--color-bg-primary, #FFFFFF);
  border: 1px solid var(--color-line-border-strong, #DFE0E2);
  border-radius: 16px;
  padding: 24px;
  overflow: hidden;
}
```

---

## 子组件

### Table Header（表头）

| 属性 | Token / CSS 变量 | 值 | 说明 |
|------|-----------------|-----|------|
| 高度 | — | 50px | — |
| 底部边框 | `--color-line-divider-short-divider` | `2px solid #C4C7CA` | — |
| 内边距 | — | 16px（四周等距） | — |
| 字号 | — | 14px | — |
| 字重 | — | 600 Semibold | — |
| 字体 | — | Switzer | — |
| 文字色 | `--color-text-text-primary` | `#070808` | — |
| 行高 | — | 1.3 | — |
| 列默认最小宽度 | — | 240px | — |
| 最后列宽度 | — | 294px（可自适应） | — |
| 排序图标 | — | `CEX_sort` 12×12px | 紧跟标题文字 |
| 文字换行 | — | `white-space: nowrap` | — |

### Table Cell（数据行）

| 属性 | Token / CSS 变量 | 值 | 说明 |
|------|-----------------|-----|------|
| 高度 | — | 72px | — |
| 底部边框 | `--color-line-divider-short-divider` | `1px solid #C4C7CA` | — |
| 内边距 | — | 16px（四周等距） | — |
| 字号 | — | 16px | — |
| 字重 | — | 500 Medium | — |
| 字体 | — | Switzer | — |
| 文字色 | `--gtpay-text-neutral` | `#4F4F4F` | Pay-B 专属中性文字色 |
| 行高 | — | 1.3 | — |
| 列默认最小宽度 | — | 240px | — |
| 文字换行 | — | `white-space: nowrap` | — |

### 特殊列样式

| 列类型 | 字号/字重 | 颜色 | CSS 变量 | 图标/组件 | 间距 |
|--------|---------|------|---------|----------|------|
| **金额列（Amount）** | 主数字 16px / 600 Semibold | `#070808` | `--color-text-text-primary` | — | — |
| ↳ 单位（Currency） | 14px / 400 Regular | `#84888C` | `--color-text-text-secondary` | — | 4px（baseline 对齐） |
| **状态列（Status）** | 14px / 400 Regular | 语义色 | — | `TagV5-web`（圆角 4px，内边距 `3px 8px`） | 8px |
| ↳ Pending 示例 | — | `#FF9447`（warning） | 背景 `#FFF4E3`（`--color-cmpt-orange-bg`） | — | — |
| **方式列（Method）** | 16px / 500 Medium | `#4F4F4F` | `--gtpay-text-neutral` | 前缀图标 20×20px | 6px |
| **操作列（Action）** | — | — | — | `CEX_More_Horizontal` 24×24px | — |

### Table Hover（行悬停）

| 属性 | Token / CSS 变量 | 值 | 说明 |
|------|-----------------|-----|------|
| 行背景色 | `--color-cmpt-component-hover` | `#F5F6F7` | 整行背景变色 |
| 底部边框 | — | 保持 `1px solid #C4C7CA` | — |
| 文字色 | — | 不变（保持各列原有色值） | — |
| 光标 | — | `cursor: pointer` | — |

### 列宽规则

- 表单最小宽度为 **240px**，高度固定
- 超出 240px 时自适应宽度
- 部分重要字段加粗处理，字重变为 **600**，以设计图为准

### Skeleton 骨架屏

| 属性 | Token / CSS 变量 | 值 | 说明 |
|------|-----------------|-----|------|
| 条目圆角 | — | 16px | — |
| 扫光倾斜 | — | -10° | — |
| 扫光宽度 | — | 占版心 40%（以 1920 屏宽为例 = 480px） | — |
| 条目间距 | — | 32px | — |
| 条目背景 | `--color-bg-secondary` | `#FAFAFA` | — |
| 布局 | — | Filter 工具栏 + 4 条骨架条目垂直排列 | — |

骨架屏区域包含：
- 顶部筛选工具栏（Filter 标签 + Edit columns 按钮）
- Action 操作列（80px 宽，悬浮阴影 `0 4px 26px rgba(13, 31, 66, 0.07)`）

### Empty State 缺省页

| 属性 | Token / CSS 变量 | 值 | 说明 |
|------|-----------------|-----|------|
| 组件 | — | `EmptyV5-web` | — |
| 容器 | — | 375 × auto，水平居中于表格内容区 | — |
| 插画 | — | `96px-空状态-钱包` 96×96px | — |
| 文字 | — | "No Data"，16px / 500 Medium，`#070808` | — |
| 插画与文字间距 | — | 4px | — |
| 表头 | — | 保持展示，仅内容区为缺省 | — |
| 外层容器 | — | 边框 `1px solid #DFE0E2`，圆角 16px，内边距 `16px 24px` | — |

### Action Column 操作列

> 操作列统一使用 `...`（More Horizontal）图标触发 Popover 下拉菜单。
> 详细规范见 [action-menu.md](./action-menu.md)。

**触发器**

| 属性 | 值 | 说明 |
|------|-----|------|
| 图标 | `CEX_More_Horizontal`（三点横排）20×20px | 居中 |
| 热区 | 28×28px，圆角 6px | — |
| 默认色 | `#84888C` | Hover → `#070808` + 背景 `#F5F6F7` |

**列固定**

| 属性 | 值 | 说明 |
|------|-----|------|
| 表头文字 | "操作"，居中对齐 | — |
| 列宽 | 80px | — |
| 固定定位 | `position: sticky; right: 0` | 横向滚动时始终可见 |
| 背景 | `#FFFFFF`（不透明） | 覆盖底层内容 |
| 左侧阴影 | `box-shadow: -8px 0 16px rgba(0,0,0,0.08)` | 提示列固定 |
| z-index | 表头 3 / 数据行 2 | — |
| Hover 行 | 背景跟随行变为 `#F5F6F7` | — |

**Popover 下拉菜单**

| 属性 | 值 | 说明 |
|------|-----|------|
| 定位 | `position: absolute; top: 100%; right: 0` | 触发器下方右对齐 |
| 宽度 | 160px | 固定 |
| 背景 | `#FFFFFF` | — |
| 边框 | `1px solid #F2F3F4` | — |
| 圆角 | 8px | — |
| 阴影 | `0 6px 16px rgba(0,0,0,0.08)` | — |
| 内边距 | 4px | — |
| z-index | 200 | — |

**菜单项**

| 属性 | 值 | 说明 |
|------|-----|------|
| 高度 | 36px | — |
| 内边距 | `0 12px` | — |
| 字号 | 14px / 500 Medium | — |
| 默认色 | `#070808` | — |
| Hover 背景 | `#F5F6F7` | — |
| 圆角 | 4px | — |
| 危险操作色 | `#EF4444` | 如"删除" |
| 危险 Hover | `#FEE2E2` | — |

**标准操作项**

| 操作 | 样式 | 后续流程 |
|------|------|---------|
| 详情 | 默认色 `#070808` | 打开详情弹窗（只读） |
| 编辑 | 默认色 `#070808` | 打开编辑弹窗 → 二次确认 → 安全验证 |
| 删除 | 默认色 `#070808` | 二次确认弹窗 → 安全验证 |

> 所有菜单项统一默认色，不区分危险操作颜色。破坏性操作通过二次确认弹窗保障。

**交互规则**

| 规则 | 说明 |
|------|------|
| 打开 | 点击 `...` 图标 |
| 关闭 | 点击菜单外 / 点击菜单项 / ESC |
| 互斥 | 同时只能打开一个 Popover |
| 安全操作 | 删除/状态变更需二次确认 + 安全验证 |

## 交互规则

1. 行悬停时整行（含所有列）背景变色为 `#F5F6F7`
2. **操作列**：`...` 图标点击触发 Popover，展示"详情/编辑/删除"等操作项
3. **Popover 互斥**：同时只能打开一个，点击外部或 ESC 关闭
4. **危险操作**：删除等破坏性操作使用红色文字，需触发二次确认弹窗 + 安全验证
5. 排序图标紧跟标题文字，点击切换排序方向
6. 骨架屏在数据加载时展示，包含筛选工具栏和 4 条骨架条目
7. 无数据时展示缺省页，表头保持展示

## CSS 实现参考

```css
/* 表头 */
.table-gtpay th {
  height: 50px;
  padding: 16px;
  border-bottom: 2px solid var(--color-line-divider-short-divider, #C4C7CA);
  font-family: 'Switzer', 'GateProductSans', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-text-primary, #070808);
  text-align: left;
  white-space: nowrap;
  line-height: 1.3;
  min-width: 240px;
}
.table-gtpay th:last-child {
  min-width: 294px;
}

/* 数据行 */
.table-gtpay td {
  height: 72px;
  padding: 16px;
  border-bottom: 1px solid var(--color-line-divider-short-divider, #C4C7CA);
  font-family: 'Switzer', 'GateProductSans', sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: var(--gtpay-text-neutral, #4F4F4F);
  line-height: 1.3;
  white-space: nowrap;
}

/* 行 Hover */
.table-gtpay tr:hover td {
  background: var(--color-cmpt-component-hover, #F5F6F7);
  cursor: pointer;
}

/* 金额列 */
.table-gtpay__amount {
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text-text-primary, #070808);
}
.table-gtpay__currency {
  font-size: 14px;
  font-weight: 400;
  color: var(--color-text-text-secondary, #84888C);
  margin-left: 4px;
}

/* 状态 Tag */
.table-gtpay__tag--warning {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 3px 8px;
  border-radius: 4px;
  background: var(--color-cmpt-orange-bg, #FFF4E3);
  font-size: 14px;
  font-weight: 400;
  color: var(--color-text-text-warning, #FF9447);
  line-height: 1.3;
}

/* 方式列（图标 + 文字） */
.table-gtpay__method {
  display: flex;
  align-items: center;
  gap: 6px;
}
.table-gtpay__method-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

/* 排序图标 */
.table-gtpay__sort {
  width: 12px;
  height: 12px;
  margin-left: 2px;
  vertical-align: middle;
}

/* 操作列 */
.table-gtpay__action-col {
  width: 80px;
  text-align: right;
  padding-right: 8px;
  box-shadow: 0 4px 26px rgba(13, 31, 66, 0.07);
}

/* 操作下拉面板 */
.table-gtpay__dropdown {
  width: 200px;
  border-radius: 8px;
  background: var(--color-layer-1, #FFFFFF);
  border: 1px solid var(--color-line-divider-strong, #F2F3F4);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  padding: 8px;
}
.table-gtpay__dropdown-item {
  padding: 10px 8px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-text-primary, #070808);
  cursor: pointer;
}
.table-gtpay__dropdown-item:hover {
  background: var(--color-cmpt-component-hover, #F5F6F7);
}

/* 骨架屏条目 */
.table-skeleton__item {
  background: var(--color-bg-secondary, #FAFAFA);
  border-radius: 16px;
}

/* 缺省页容器 */
.table-gtpay__empty {
  border: 1px solid var(--color-line-border-strong, #DFE0E2);
  border-radius: 16px;
  padding: 16px 24px;
  overflow: hidden;
}
```
