---
scope: [web3pay]
layer: L2
context: pay-b
---

# Checkbox / Radio 复选框与单选框

> 来源: Figma [V5.1 Web-H5 组件库](https://www.figma.com/design/kQIx9xKLiyO6KZIbazNSM2/) · Node `7061:62723`
> 归属: web3pay / Pay B端商户后台
> 版本: v2.0.0（合并 Checkbox + Radio）

## 组件概述

复选框与单选框统一组件，通过 Type 属性区分。支持 3 种控件类型（Checkbox 多选 / Half 半选 / Radio 单选）、2 档尺寸、4 种交互状态。选中色采用品牌绿 `#68AD00`。

---

## 控件类型（Type）

| 类型 | 形状 | 选中标记 | 用途 |
|------|------|---------|------|
| **Checkbox** | 方形（4px 圆角） | ✓ 勾选 | 多选，可选择多个选项 |
| **Half / Indeterminate** | 方形（4px 圆角） | − 横线 | 半选/不定态（父节点部分子项已选） |
| **Radio** | 圆形 | ● 实心圆点 | 单选，同组互斥 |

---

## 尺寸规范

| 尺寸 | 选框尺寸 | 圆角(Checkbox) | 标签字号 | 标签字重 | 标签行高 | 标签间距 |
|------|---------|------------|---------|---------|---------|---------|
| **Medium**（默认） | 16 × 16 px | 4px | 14px | 400 Regular | 22px | 8px |
| **Small** | 12 × 12 px | 3px | 12px | 400 Regular | 18px | 6px |

---

## 交互状态

### Checkbox / Half 状态

| 状态 | 边框色 | 背景色 | 图标 | 光标 |
|------|--------|--------|------|------|
| **Unchecked** | `#C8CACD` | transparent | 无 | pointer |
| **Hover** | `#303236` | transparent | 无 | pointer |
| **Checked** | `#303236` | `#303236` | ✓ 白色 | pointer |
| **Indeterminate** | `#303236` | `#303236` | − 白色横线 | pointer |
| **Disabled** | `#ECEDEF` | `#F5F6F7` | 继承当前 | not-allowed |
| **Disabled + Checked** | `#ECEDEF` | `#D1D5DB` | ✓ 白色 | not-allowed |

### Radio 状态

| 状态 | 边框色 | 背景色 | 图标 | 光标 |
|------|--------|--------|------|------|
| **Unselected** | `#C8CACD` | transparent | 无 | pointer |
| **Hover** | `#303236` | transparent | 无 | pointer |
| **Selected** | `#303236` | transparent | ● 内圆 `#303236`（6px） | pointer |
| **Disabled** | `#ECEDEF` | `#F5F6F7` | 继承当前 | not-allowed |
| **Disabled + Selected** | `#ECEDEF` | `#F5F6F7` | ● 内圆 `#D1D5DB` | not-allowed |

---

## 色彩 Token

> 组件自有 token 仍保留，同时标注与 `pay-b-default` 全局变量的映射关系，以便生成时保持一致。

| 元素 | 组件 CSS 变量 | 值 | pay-b-default 映射 | 说明 |
|------|--------------|-----|-------------------|------|
| 选中填充色 | `--checkbox-accent` | `#303236` | — | V5 标准深色 |
| 默认边框 | `--checkbox-border-color` | `#C8CACD` | — | 未选中 |
| Hover 边框 | `--checkbox-border-hover` | `#303236` | — | 悬停 |
| 勾选/圆点色 | `--checkbox-check-color` | `#FFFFFF` | — | 白色 |
| 禁用背景 | `--checkbox-disabled-bg` | `#F5F6F7` | `var(--bg-muted)` | 灰底 |
| 禁用边框 | `--checkbox-disabled-border` | `#ECEDEF` | `var(--border)` | 浅灰 |
| 禁用选中 | `--checkbox-disabled-checked` | `#D1D5DB` | — | 深灰 |
| 标签色 | `--checkbox-label-color` | `#070808` | `var(--text-primary)` | 主文字 |
| 禁用标签色 | — | opacity 0.4 | — | 整体透明 |

---

## 组排列

| 排列方向 | 间距 | 说明 |
|---------|------|------|
| 水平排列 | 24px | 横向排列各选框间距 |
| 垂直排列 | 12px | 纵向排列各选框间距 |

---

## CSS 实现参考

```css
/* 基础容器 */
.gtpay-checkbox {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
}
.gtpay-checkbox--small { gap: 6px; }

/* 选框 — Checkbox / Half */
.gtpay-checkbox__input {
  width: 16px; height: 16px;
  flex-shrink: 0;
  border: 1.5px solid #C8CACD;
  border-radius: 4px;
  background: transparent;
  transition: all 0.15s ease;
  display: flex; align-items: center; justify-content: center;
}
.gtpay-checkbox--small .gtpay-checkbox__input { width: 12px; height: 12px; border-radius: 3px; }
.gtpay-checkbox:hover .gtpay-checkbox__input { border-color: #303236; }
.gtpay-checkbox--checked .gtpay-checkbox__input { background: #303236; border-color: #303236; }
.gtpay-checkbox--indeterminate .gtpay-checkbox__input { background: #303236; border-color: #303236; }
.gtpay-checkbox--indeterminate .gtpay-checkbox__icon { width: 8px; height: 1.5px; background: #fff; border-radius: 1px; }

/* 选框 — Radio（圆形） */
.gtpay-radio__input {
  width: 16px; height: 16px;
  flex-shrink: 0;
  border: 1.5px solid #C8CACD;
  border-radius: 50%;
  background: transparent;
  transition: all 0.15s ease;
  display: flex; align-items: center; justify-content: center;
}
.gtpay-checkbox--small .gtpay-radio__input { width: 12px; height: 12px; }
.gtpay-checkbox:hover .gtpay-radio__input { border-color: #303236; }
.gtpay-radio--selected .gtpay-radio__input { border-color: #303236; }
.gtpay-radio--selected .gtpay-radio__dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #303236;
}
.gtpay-checkbox--small .gtpay-radio--selected .gtpay-radio__dot { width: 4px; height: 4px; }

/* 标签 */
.gtpay-checkbox__label { font-size: 14px; line-height: 22px; color: #070808; }
.gtpay-checkbox--small .gtpay-checkbox__label { font-size: 12px; line-height: 18px; }

/* Disabled */
.gtpay-checkbox--disabled { cursor: not-allowed; opacity: 0.4; pointer-events: none; }
.gtpay-checkbox--disabled .gtpay-checkbox__input { background: #F5F6F7; border-color: #ECEDEF; }
.gtpay-checkbox--disabled.gtpay-checkbox--checked .gtpay-checkbox__input { background: #D1D5DB; }
.gtpay-checkbox--disabled .gtpay-radio__input { background: #F5F6F7; border-color: #ECEDEF; }
.gtpay-checkbox--disabled.gtpay-radio--selected .gtpay-radio__dot { background: #D1D5DB; }

/* Group */
.gtpay-checkbox-group { display: flex; flex-wrap: wrap; }
.gtpay-checkbox-group--horizontal { flex-direction: row; gap: 24px; }
.gtpay-checkbox-group--vertical { flex-direction: column; gap: 12px; }
```

---

## 数据接口

```typescript
interface CheckboxProps {
  type?: 'checkbox' | 'radio';
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  size?: 'medium' | 'small';
  label?: string;
  value?: string | number;
  onChange?: (checked: boolean, event: React.ChangeEvent) => void;
  className?: string;
}

interface CheckboxGroupProps {
  type?: 'checkbox' | 'radio';
  value?: (string | number)[];
  defaultValue?: (string | number)[];
  direction?: 'horizontal' | 'vertical';
  disabled?: boolean;
  size?: 'medium' | 'small';
  options?: Array<{ label: string; value: string | number; disabled?: boolean }>;
  onChange?: (values: (string | number)[]) => void;
  className?: string;
}
```
