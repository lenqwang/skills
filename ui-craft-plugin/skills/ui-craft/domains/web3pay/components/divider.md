---
scope: [web3pay]
layer: L2
context: pay-b
---

# Divider 分割线

> 来源: Figma [Pay-B端-商家后台](https://www.figma.com/design/tlFIl7F7A7Zl6e9WRLMDZo/)
> 归属: web3pay / Pay B端商户后台
> 版本: v1.4.0

## 组件概述

Divider 用于在视觉上分隔内容区块，支持水平与垂直两种方向，以及实线与虚线两种样式。可选带文本标签的分割线用于分组标题或逻辑分段。默认颜色 `#ECEDEF` 与系统边框色一致，轻量变体 `#F2F3F4` 适用于卡片内部次级分隔。

## 基础规格

> 组件私有 Token 与 `pay-b-default` 全局变量的映射关系。

| 属性 | Token | 值 | pay-b-default 映射 | 说明 |
|------|-------|-----|-------------------|------|
| 线条粗细 | `--divider-width` | 1px | — | 分割线粗细 |
| 颜色（默认） | `--divider-color` | #ECEDEF | `var(--border)` | 标准分隔色 |
| 颜色（浅色） | `--divider-color-light` | #F2F3F4 | `var(--divider-strong)` | 卡片内次级分隔 |
| 水平外边距 | `--divider-margin-y` | 16px 0 | `var(--space-base)` | 上下外边距 |
| 垂直外边距 | `--divider-margin-x` | 0 12px | `var(--space-md)` | 左右外边距 |
| 虚线间隔 | `--divider-dash-gap` | 4px | — | 虚线段间距 |
| 虚线段长 | `--divider-dash-length` | 6px | — | 虚线段长度 |
| 文本字号 | `--divider-text-size` | 12px | — | 带文本分割线字号 |
| 文本颜色 | `--divider-text-color` | #84888C | `var(--text-secondary)` | 次级文本色 |
| 文本间距 | `--divider-text-gap` | 16px | `var(--space-base)` | 文本与左右线条间距 |

## 变体矩阵

| 方向 | 样式 | 带文本 | 说明 |
|------|------|--------|------|
| Horizontal | Solid | 否 | 默认水平实线，最常用 |
| Horizontal | Solid | 是 | 带居中文本标签 |
| Horizontal | Dashed | 否 | 水平虚线，暗示可操作区域 |
| Horizontal | Dashed | 是 | 带文本的虚线分隔 |
| Vertical | Solid | 否 | 行内元素垂直分隔 |
| Vertical | Dashed | 否 | 行内虚线分隔 |

## 布局结构

水平分割线（无文本）：
```
────────────────────────────────────────
```

水平分割线（带文本）：
```
──────────── 分组标题 ────────────
```

垂直分割线：
```
│
│
│
```

## CSS 实现参考

```css
/* Horizontal */
.gtpay-divider {
  display: flex;
  align-items: center;
  margin: 16px 0;
  border: none;
  color: #84888C;
}

.gtpay-divider::before,
.gtpay-divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #ECEDEF;
}

.gtpay-divider--light::before,
.gtpay-divider--light::after {
  background: #F2F3F4;
}

/* Dashed */
.gtpay-divider--dashed::before,
.gtpay-divider--dashed::after {
  background: transparent;
  border-top: 1px dashed #ECEDEF;
  height: 0;
}

.gtpay-divider--dashed.gtpay-divider--light::before,
.gtpay-divider--dashed.gtpay-divider--light::after {
  border-color: #F2F3F4;
}

/* Without text: single line */
.gtpay-divider:not(.gtpay-divider--with-text)::after {
  display: none;
}

/* With text */
.gtpay-divider--with-text::before,
.gtpay-divider--with-text::after {
  display: block;
}

.gtpay-divider__text {
  flex-shrink: 0;
  padding: 0 16px;
  font-size: 12px;
  line-height: 18px;
  color: #84888C;
  white-space: nowrap;
}

/* Text alignment */
.gtpay-divider--text-left::before {
  flex: 0 0 24px;
}

.gtpay-divider--text-right::after {
  flex: 0 0 24px;
}

/* Vertical */
.gtpay-divider--vertical {
  display: inline-flex;
  flex-direction: column;
  align-self: stretch;
  margin: 0 12px;
  width: 1px;
  min-height: 1em;
  background: #ECEDEF;
}

.gtpay-divider--vertical::before,
.gtpay-divider--vertical::after {
  display: none;
}

.gtpay-divider--vertical.gtpay-divider--light {
  background: #F2F3F4;
}

.gtpay-divider--vertical.gtpay-divider--dashed {
  background: transparent;
  border-left: 1px dashed #ECEDEF;
  width: 0;
}
```

## 数据接口

```typescript
interface DividerProps {
  /** 方向 */
  direction?: 'horizontal' | 'vertical';
  /** 线条样式 */
  variant?: 'solid' | 'dashed';
  /** 颜色主题 */
  color?: 'default' | 'light';
  /** 分割线文本（仅水平方向有效） */
  text?: string;
  /** 文本位置 */
  textAlign?: 'left' | 'center' | 'right';
  /** 自定义外边距 */
  margin?: string | number;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}
```
