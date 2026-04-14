---
scope: [exchange]
layer: L2
---
# FilterChip 筛选按钮

> 归属: platform-shared（Exchange/Web3 通用），暂放 exchange
> 状态: STABLE — 基于 Figma App Copy Trading 页面精确提取
> 场景: 列表页面的筛选/排序选择器

---

## 组件概述

紧凑的筛选按钮组件，带下拉箭头，用于列表页面的数据筛选和排序。
常以一组出现（如 "ROI ▼" + "7D ▼"）。

## 结构树

```
FilterChip
├── Label                             # 筛选项文字
└── Arrow                             # 下拉箭头
```

## 精确像素规格

```css
.filter-chip {
  display: inline-flex;
  align-items: center;
  height: 28px;
  padding: 0 10px;
  border-radius: 14px;
  border: 0.5px solid var(--border-primary, #E7E9EE);
  background: var(--bg-secondary, #F5F6F7);
  gap: 2px;
  cursor: pointer;
}

.filter-chip--active {
  border-color: var(--text-primary, #070808);
}

.filter-label {
  font-size: 12px;
  font-weight: 400;
  line-height: 15.8px;
  color: var(--text-primary, #070808);
}

.filter-arrow {
  width: 12px;
  height: 12px;
  color: var(--text-tertiary, #84888C);
}
```

### FilterChip 组容器

```css
.filter-group {
  display: flex;
  gap: 8px;
  padding: 12px 16px 8px;
}
```

## 变体

| 变体 | 说明 |
|------|------|
| Default | 默认未选择状态 |
| Active | 已选择，边框加深 |
| With Value | 显示当前选中值（如 "7D" 替代 "周期"） |

## Token 映射

| 属性 | Token | 值 |
|------|-------|-----|
| 高度 | -- | 28px |
| 内边距 | -- | 0 10px |
| 圆角 | --radius-full | 14px (胶囊) |
| 边框 | --border-primary | 0.5px #E7E9EE |
| 字号 | -- | 12px Regular |
| 箭头尺寸 | -- | 12px |
| 组间距 | --space-sm | 8px |

## Figma 来源

- App: 9HordMtYdfmXOYwExRy1MF (Gate App V6) — Copy Trading 页

---

## Exchange 平台规格

> Figma:
> - [Selector_Web Guidelines](https://www.figma.com/design/kQIx9xKLiyO6KZIbazNSM2/?node-id=7540-65441)
> - [Selector_H5 Guidelines](https://www.figma.com/design/kQIx9xKLiyO6KZIbazNSM2/?node-id=7540-65766)
>
> Component Token: `SelectorV5-web`

Exchange 平台中 Selector 快筛为页面内快速过滤的标签型按钮组（行情、资产列表、交易对筛选等）。

### 尺寸规范（3 档，Web/H5 一致）

| 尺寸 | 高度 | Hug 宽度 | Equal Width |
|------|------|---------|-------------|
| Small | 28 px | 内容自适应（最小约 53 px） | 120 px |
| Medium | 32 px | 内容自适应（约 67 px） | 120 px |
| Large | 40 px | 内容自适应（约 67 px） | 120 px |

### 状态

| 状态 | 说明 |
|------|------|
| Normal | 默认未选中 |
| Hover | 鼠标悬停（仅 Web） |
| Single Selected | 单选已选中 |
| Multi Selected | 多选已选中（带勾选标识） |

### 使用规范

- 文案 2-4 个字，一行完整展示；超长用 `...` 截断
- 每行最多 5-7 个
- 水平间距 8px（小尺寸组）/ 16px（大尺寸组），垂直同
- H5 不支持换行，超出先优化文案再截断
- RTL 布局镜像
