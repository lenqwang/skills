---
scope: [web3pay]
layer: L2
context: pay-b
---

# StepsAnchor 步骤锚点

> 来源: Figma [Pay-B端-商家后台](https://www.figma.com/design/tlFIl7F7A7Zl6e9WRLMDZo/) · Node `380:63581`
> 归属: web3pay / Pay B端商户后台
> 版本: v1.4.0

## 组件概述

步骤锚点用于引导用户完成多步骤流程，以水平箭头条形式展示当前进度。支持 3 种步骤状态和 3 种进度变体。

## 基础规格

| 属性 | Token / CSS 变量 | 值 | 说明 |
|------|-----------------|-----|------|
| 总宽度 | — | 524px（或自适应） | — |
| 步骤高度 | — | 32px | — |
| 步骤圆角 | — | 首步骤 `4px 0 0 4px`（左圆角），末步骤 `0 4px 4px 0`（右圆角） | — |
| 步骤文字 | — | 14px / 500 Medium | — |
| 步骤内边距 | — | `7.5px 12px`（左）/ `7.5px 10px 7.5px 12px`（含箭头） | — |
| 箭头连接器 | — | 26×32px SVG 箭头形状 | 自动衔接前后步骤颜色 |

## 状态变体

| 状态 | 属性变化 | 说明 |
|------|---------|------|
| **Active（当前步骤）** | 背景 `#303236`（`--color-cmpt-component-active`）· 文字 `#FFFFFF`（always-white） | 深灰实色背景 |
| **Inactive（未到达）** | 背景 `#F2F3F4`（`--color-layer-2`）· 文字 `#84888C`（text-secondary） | 浅灰背景 |
| **Completed（已完成）** | 背景 `#F2F3F4`（`--color-layer-2`）· 文字 `#84888C`（text-secondary） | 与 Inactive 样式相同 |

## 3 种步骤变体

| 变体 | 第 1 步 | 第 2 步 | 第 3 步 | 说明 |
|------|---------|---------|---------|------|
| **Steps Anchor1** | ■ Active | □ Inactive | □ Inactive | 第一步进行中 |
| **Steps Anchor2** | □ Completed | ■ Active | □ Inactive | 第二步进行中 |
| **Steps Anchor3** | □ Completed | □ Completed | ■ Active | 第三步进行中 |

## 结构示意

```
┌────────────┐ ▶ ┌────────────┐ ▶ ┌────────────┐
│ Payment Key │   │ Create App │   │Quick Access │
│  (Active)   │   │ (Inactive) │   │ (Inactive)  │
└────────────┘   └────────────┘   └────────────┘
  ■ 深灰 #303236    □ 浅灰 #F2F3F4    □ 浅灰 #F2F3F4
```

> 箭头连接器为独立 SVG 节点（26×32px），自动衔接前后步骤的颜色。

## CSS 实现参考

```css
.steps-anchor {
  display: flex;
  align-items: flex-start;
}
.steps-anchor__step {
  flex: 1;
  height: 32px;
  display: flex;
  align-items: center;
  padding: 7.5px 12px;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.3;
}
.steps-anchor__step--active {
  background: var(--color-component-active, #303236);
  color: var(--color-text-always-white, #FFFFFF);
}
.steps-anchor__step--inactive {
  background: var(--color-bg-tertiary, #F2F3F4);
  color: var(--color-text-secondary, #84888C);
}
.steps-anchor__step:first-child {
  border-radius: 4px 0 0 4px;
}
.steps-anchor__step:last-child {
  border-radius: 0 4px 4px 0;
}
.steps-anchor__arrow {
  width: 26px;
  height: 32px;
  flex-shrink: 0;
}
```
