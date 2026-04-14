---
scope: [web3pay]
layer: L2
context: pay-b
---

# Filter 筛选标签 + Filter Select 筛选下拉面板

> 来源: Figma [Pay-B端-商家后台](https://www.figma.com/design/tlFIl7F7A7Zl6e9WRLMDZo/) · Node `8121:12135`（Filter）/ `8229:11141`（Filter Select）
> 归属: web3pay / Pay B端商户后台
> 版本: v1.4.0

## 组件概述

筛选标签用于列表页顶部，以 Pill 胶囊形式展示可操作的筛选条件。点击筛选标签后弹出 Filter Select 下拉面板，支持 4 种输入模式（输入/单选/多选/更多筛选）。两个组件紧密关联，合并描述。

---

## 一、Filter 筛选标签

### 基础规格

| 属性 | Token / CSS 变量 | 值 | 说明 |
|------|-----------------|-----|------|
| 形状 | — | Pill 胶囊 | `border-radius: 100px` |
| 边框 | `--color-divider-short` | `1px dashed #C4C7CA` | 虚线边框（`short-divider` 色） |
| 内边距 | — | `0 12px` | 左右 12px，垂直居中（height 控制） |
| 高度 | — | `32px` | 全局统一 Filter Pill 高度 |
| 图标尺寸 | — | 16×16px | 筛选图标在文字左侧 |
| 图标文字间距 | — | 4px | — |
| 标签文字 | `--color-text-primary` | 14px / 500 Medium · `#070808` | — |
| 标签内间距 | — | 8px（Default）/ 6px（Filtered/Date） | 图标+文字区域与结果区域间距 |

### 状态变体

| 状态 | 属性变化 | 说明 |
|------|---------|------|
| **Default** | 虚线边框 + 筛选图标 + 文字 | 未选择筛选条件 |
| **Hover** | 文字加粗 / 边框加深 | 鼠标悬停反馈 |
| **Filtered** | 虚线边框 + 文字 + 竖线分割 + **绿色筛选值** + 下拉箭头 | 已选择单值筛选（如 "Today"） |
| **Date** | 虚线边框 + 文字 + 竖线分割 + **绿色日期范围** + 下拉箭头 | 已选择日期范围（如 "Sep 2, 2025 → Sep 3, 2025"） |

### Filtered / Date 状态关键样式

| 元素 | 规格 |
|------|------|
| 竖线分割符 | 1px × 12px，颜色 `#C4C7CA`，旋转 90°（模拟竖线） |
| 筛选值文字 | 14px / 500 Medium，颜色 **`#68AD00`**（`--gtpay-text-brand`） |
| 箭头图标 | `CEX_chevron_down` 16×16px |
| 日期之间箭头 | `CEX_ForwardArrow` 16×16px |

### 4 种筛选类型

> Figma 节点：`1627:78642`（筛选项 Section）

| 类型 | 标签文字示例 | 说明 |
|------|------------|------|
| **日期（Date）** | By time created | 点击唤起 `Time PickerV5-web` 日期选择器 |
| **文本（Text）** | Merchant Order ID | 点击唤起文本输入面板（`Pay_Input`） |
| **单选（Select）** | Order Type | 点击唤起单选下拉面板（`Pay_Select`） |
| **多选（Checkbox）** | Client Name | 点击唤起多选下拉面板（`Pay_Checkbox`） |

### 各类型 3 种交互状态

| 状态 | 视觉表现 |
|------|---------|
| **默认** | 虚线边框 + 筛选图标 + 标签文字 |
| **Hover** | 背景微变化 / 边框加深 |
| **点击** | 展开对应类型的下拉面板 |

### Filter CSS 实现参考

```css
.filter-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0 12px;
  height: 32px;
  border: 1px dashed var(--color-divider-short, #C4C7CA);
  border-radius: 100px;
  cursor: pointer;
  transition: all 0.15s ease;
}
.filter-pill--filtered { gap: 6px; }
.filter-pill__label {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-primary, #070808);
}
.filter-pill__value {
  font-size: 14px;
  font-weight: 500;
  color: var(--gtpay-brand-text, #68AD00);
}
```

### 已筛选交互规则

1. 已筛选状态展示：标签区 + 竖线分割 + 绿色筛选值 + 下拉箭头
2. 非默认展示的筛选项可删除（点击左侧 X icon）
3. 默认项不可清除：默认展示的筛选项点击 X 只清除筛选结果，不移除筛选项
4. 点击右侧已筛选内容区域可重新唤起下拉选择
5. 极限宽度 400px，超出筛选结果省略显示
6. 点击 "Advanced Filters" 唤起更多筛选维度列表（`Pay_More Filter`）
7. 下拉框支持禁用状态变体

---

## 二、Filter Select 筛选下拉面板

### 容器规格

| 属性 | Token / CSS 变量 | 值 | 说明 |
|------|-----------------|-----|------|
| 宽度 | — | 280px | — |
| 背景 | `--color-layer-1` | `#FFFFFF` | — |
| 边框 | `--color-line-divider-strong` | `1px solid #F2F3F4` | — |
| 圆角 | — | 8px | — |
| 阴影 | — | `0 6px 16px rgba(0,0,0,0.08)` | Dropdown Shadow |

### 4 种面板变体

| 变体 | 组件名 | 用途 | 说明 |
|------|--------|------|------|
| **Pay_Input** | 输入面板 | 关键词筛选（Client Name 等） | 含输入框 + Apply 按钮 |
| **Pay_Select** | 选择面板 | 单选筛选（Payment Method 等） | 含选项列表 + 滚动条 + Apply |
| **Pay_Checkbox** | 多选面板 | 多选筛选（Order Status 等） | 含 Checkbox 列表 + 滚动条 + Apply |
| **Pay_More Filter** | 更多筛选 | 展示所有可用筛选维度 | 纯列表，带 + 图标 |

### 面板结构

```
┌─────────────────────────┐
│ ← 标题（14px/600）         │  ← Header（padding 16px, 底部边框 #DFE0E2）
├─────────────────────────┤
│                         │
│  内容区域                │  ← List 区域
│  (Input / Select /      │     Pay_Input: padding 8px，含 Input_V5
│   Checkbox / More)      │     Pay_Select/Checkbox: 206px 高度，可滚动
│                         │     Pay_More Filter: 无固定高度，直接展示
│                         │
├─────────────────────────┤
│  ┌─────────────────┐    │  ← Footer（仅 Input/Select/Checkbox）
│  │     Apply       │    │     padding: 8px 16px 16px
│  └─────────────────┘    │
└─────────────────────────┘
```

### Header 规格

| 元素 | 规格 |
|------|------|
| 返回箭头 | `CEX_left_aligned arrow` 16×16px |
| 标题文字 | 14px / 600 Semibold / `#070808` |
| 内边距 | 16px |
| 底部边框 | `1px solid #DFE0E2`（`--color-line-border-strong`） |

### 选项行规格（Pay_Select / Pay_Checkbox）

| 元素 | 规格 |
|------|------|
| 行高度 | 自适应（padding `10px 8px`） |
| 行圆角 | 6px |
| 行间距 | 0 |
| 文字 | 14px / 500 Medium / `#070808` |
| Hover 态 | 背景 `#F5F6F7`（`--color-cmpt-component-hover`），圆角 8px |
| 选中标记（Select） | `CEX_circlefilled_success` 16px 绿色对勾 |
| Checkbox | 16×16px，选中背景 `#68AD00` |
| 列表容器 | 固定高度 206px，`overflow: hidden` + 滚动条 |
| 滚动条 | 宽 3px，颜色 `#C4C7CA`（`--color-text-text-tips`），圆角 99px |

### Apply 按钮规格

| 属性 | Token / CSS 变量 | 值 | 说明 |
|------|-----------------|-----|------|
| 背景 | `--gtpay-color-brand` | `#ADF73E` | **GTPay 品牌色（亮绿）** |
| 文字色 | — | `#000000`（black） | 深色文字搭配亮绿 |
| 高度 | — | 40px | — |
| 宽度 | — | 撑满（`flex: 1`） | — |
| 圆角 | — | 99px（胶囊形） | — |
| 字号 | — | 14px / 500 Medium | — |
| 外边距 | — | 上 8px，下 16px，左右 16px | — |

> **注意**：Filter Select 面板中的 Apply 按钮使用 `#ADF73E`（GTPay 品牌色亮绿），而非标准 Primary Button 的 `#68AD00`（品牌强调色）。这是 Pay B端筛选面板的特殊处理——品牌色亮绿底 + 黑色文字，区别于主操作按钮的品牌强调色深绿底 + 白色文字。

### Pay_More Filter 变体

更多筛选面板为纯列表形式，不含 Header 和 Apply 按钮。

| 元素 | 规格 |
|------|------|
| 左侧图标 | `CEX_add` 20×20px |
| 文字 | 14px / 500 Medium / `#070808` |
| 行内边距 | `10px 8px` |
| 行圆角 | 6px |
| Hover 态 | 背景 `#F5F6F7`，圆角 8px |

常见筛选维度列表：Order Type、Payment Method、Client Name、Search Buyer's Bill Information、Order Status、Coin、Refunded 等。
