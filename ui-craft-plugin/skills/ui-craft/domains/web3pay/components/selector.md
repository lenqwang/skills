---
scope: [web3pay]
layer: L2
context: pay-b
---

# Selector 选择器

> 来源: Figma [Pay-B端-商家后台](https://www.figma.com/design/tlFIl7F7A7Zl6e9WRLMDZo/)
> 归属: web3pay / Pay B端商户后台
> 版本: v1.4.0

## 组件概述

自定义下拉选择器，支持单选和多选两种模式。触发器展示当前选中值，点击展开下拉面板供用户选择。多选模式以计数徽标显示已选数量，单选模式直接显示选中文本。

## 基础规格

### Trigger 触发器

| 属性 | Token | 值 | pay-b-default 映射 | 说明 |
|------|-------|-----|-------------------|------|
| height | `--selector-trigger-h` | `48px` | — | 触发器固定高度 |
| background | `--selector-trigger-bg` | `#F5F6F7` | `var(--bg-muted)` | 静息态背景色 |
| border-radius | `--selector-trigger-radius` | `8px` | `var(--radius-dropdown)` | 圆角 |
| padding | `--selector-trigger-padding` | `0 12px` | — | 内间距 |
| font-size | `--selector-trigger-font` | `14px` | — | 文本字号 |
| color | `--selector-trigger-color` | `#070808` | `var(--text-primary)` | 已选文本色 |
| placeholder-color | `--selector-placeholder` | `#A0A3A7` | `var(--text-tertiary)` | 占位符色 |
| border | — | `1px solid transparent` | — | 默认无边框 |
| icon | — | chevron-down `16×16` | `var(--text-secondary)` | 右侧箭头图标 |

### Dropdown 下拉面板

| 属性 | Token | 值 | pay-b-default 映射 | 说明 |
|------|-------|-----|-------------------|------|
| background | `--selector-dropdown-bg` | `#FFFFFF` | `var(--layer-1)` | 面板白底 |
| border | `--selector-dropdown-border` | `1px solid #ECEDEF` | `var(--border)` | 边框 |
| border-radius | `--selector-dropdown-radius` | `8px` | `var(--radius-dropdown)` | 圆角 |
| box-shadow | `--selector-dropdown-shadow` | `0 4px 16px rgba(0,0,0,0.08)` | `var(--shadow-dropdown)` | 浮层阴影 |
| max-height | `--selector-dropdown-max-h` | `200px` | — | 最大高度，超出滚动 |
| overflow-y | — | `auto` | — | 垂直滚动 |
| padding | — | `4px 0` | — | 上下内间距 |
| margin-top | — | `4px` | — | 与触发器间距 |

### Option 选项

| 属性 | Token | 值 | pay-b-default 映射 | 说明 |
|------|-------|-----|-------------------|------|
| padding | `--selector-option-padding` | `10px 12px` | — | 选项内间距 |
| font-size | — | `14px` | — | 选项字号 |
| color | — | `#070808` | `var(--text-primary)` | 选项文本色 |
| hover background | `--selector-option-hover-bg` | `#F5F6F7` | `var(--cmpt-hover)` | 悬停背景 |
| selected background | `--selector-option-selected-bg` | `#E6F4D2` | `var(--gtpay-component-hover)` | 选中态背景 |
| selected color | — | `#070808` | `var(--text-primary)` | 选中文本色 |
| border-radius | — | `0` | — | 选项无圆角 |
| cursor | — | `pointer` | — | 手型光标 |

### Count Badge 计数徽标（多选模式）

| 属性 | Token | 值 | 说明 |
|------|-------|-----|------|
| min-width | — | `20px` | 最小宽度 |
| height | — | `20px` | 高度 |
| background | `--selector-badge-bg` | `#ADF73E` | 品牌绿底 |
| color | `--selector-badge-color` | `#070808` | 数字色 |
| border-radius | — | `10px` | 全圆角 |
| font-size | — | `12px` | 字号 |
| font-weight | — | `600` | 加粗 |
| padding | — | `0 6px` | 左右间距 |

## 状态变体

| 状态 | Trigger 样式 | 说明 |
|------|-------------|------|
| default | bg `#F5F6F7`, border `transparent` | 默认静息 |
| hover | bg `#F5F6F7`, border `1px solid #ECEDEF` | 鼠标悬停 |
| focus / open | bg `#FFFFFF`, border `1px solid #070808` | 展开态，白底 + 深色边框 |
| filled | 显示选中文本或计数徽标 | 已有选中值 |
| disabled | opacity `0.5`, cursor `not-allowed` | 禁用态 |
| error | border `1px solid #EF4444` | 校验错误 |

## CSS 实现参考

```css
.selector-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  padding: 0 12px;
  background: #F5F6F7;
  border: 1px solid transparent;
  border-radius: 8px;
  font-size: 14px;
  color: #070808;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;
}

.selector-trigger:hover {
  border-color: #ECEDEF;
}

.selector-trigger.open {
  background: #FFFFFF;
  border-color: #070808;
}

.selector-trigger.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.selector-trigger.error {
  border-color: #EF4444;
}

.selector-trigger__placeholder {
  color: #A0A3A7;
}

.selector-trigger__icon {
  width: 16px;
  height: 16px;
  color: #84888C;
  transition: transform 0.2s;
}

.selector-trigger.open .selector-trigger__icon {
  transform: rotate(180deg);
}

.selector-dropdown {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background: #FFFFFF;
  border: 1px solid #ECEDEF;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  max-height: 200px;
  overflow-y: auto;
  padding: 4px 0;
  z-index: 1000;
}

.selector-option {
  padding: 10px 12px;
  font-size: 14px;
  color: #070808;
  cursor: pointer;
  transition: background 0.15s;
}

.selector-option:hover {
  background: #F5F6F7;
}

.selector-option.selected {
  background: #E6F4D2;
}

.selector-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  background: #ADF73E;
  color: #070808;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 600;
  margin-left: 8px;
}
```

## 数据接口

```typescript
interface SelectorOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

interface SelectorProps {
  /** 选项列表 */
  options: SelectorOption[];
  /** 选择模式 */
  mode?: 'single' | 'multi';
  /** 当前值（单选为单值，多选为数组） */
  value?: string | number | (string | number)[];
  /** 值变更回调 */
  onChange?: (value: string | number | (string | number)[]) => void;
  /** 占位文本 */
  placeholder?: string;
  /** 禁用 */
  disabled?: boolean;
  /** 错误态 */
  error?: boolean;
  /** 下拉面板最大高度 */
  maxHeight?: number;
}
```
