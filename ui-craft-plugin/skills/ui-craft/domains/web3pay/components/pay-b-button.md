---
scope: [web3pay]
layer: L2
context: pay-b
---
# ButtonV5 按钮

> 来源: Figma [Pay-B端-商家后台](https://www.figma.com/design/tlFIl7F7A7Zl6e9WRLMDZo/) · Node `16422:13724`
> 归属: web3pay / Pay B端商户后台
> 版本: v3.0.0（基于 Figma ButtonV5-web 16422:13724）

## 组件概述

Pay-B 端按钮组件，包含 2 种颜色类型 × 7 种尺寸 × 4 种状态 × 4 种图标模式。Primary 使用 GTPay 品牌绿色（`#ADF73E`），Secondary 使用灰色背景。

## 颜色类型（Type）

| Type | CSS 变量 | Default 背景 | Default 文字 | 说明 |
|------|---------|-------------|-------------|------|
| **Primary-Black** | `--gtpay-color-brand` | `#ADF73E` | `#070808` | Pay-B 品牌绿色主按钮 |
| **Secondary-Gray** | `--color-cmpt-button-soft` | `#F5F6F7` | `#070808` | 灰色次要按钮 |

## 尺寸变体（Size）

| 尺寸 | 高度 | 内边距(px) | 字号 | 字重 | 图标尺寸 | 图标间距 |
|------|------|-----------|------|------|---------|---------|
| **XXLarge** | 56px | `0 32px` | 18px | 600 Semibold (S5) | 24×24 | 8px |
| **XLarge** | 48px | `0 24px` | 16px | 500 Medium (B3) | 24×24 | 8px |
| **Large** | 44px | `0 24px` | 16px | 500 Medium (B3) | 20×20 | 8px |
| **Medium** | 40px | `0 20px` | 14px | 500 Medium (B7) | 20×20 | 8px |
| **Small** | 36px | `0 16px` | 14px | 500 Medium (B7) | 16×16 | 8px |
| **XSmall** | 32px | `0 12px` | 12px | 500 Medium (B11) | 16×16 | 8px |
| **XXSmall** | 28px | `0 10px` | 12px | 500 Medium (B11) | 14×14 | 8px |

## 状态变体（State）

| 状态 | Primary-Black 背景 | Secondary-Gray 背景 | 文字色 | 说明 |
|------|-------------------|-------------------|-------|------|
| **Default** | `#ADF73E` | `#F5F6F7` | `#070808` | 正常态 |
| **Hover** | `#8BD121` | `#ECEDEF` | `#070808` | 鼠标悬停 |
| **Disable** | `#F5F6F7` | `#F5F6F7` | `#C4C7CA` | 禁用态（所有 Type 统一） |
| **Loading** | 保持 Default 背景 | 保持 Default 背景 | 隐藏文字，显示 Spinner | 加载中 |

## 图标模式

| 模式 | Token 属性 | 说明 |
|------|----------|------|
| **无图标** | `Prefix Icon=False, Suffix Icon=False, Only Icon=False` | 纯文字按钮 |
| **Prefix Icon** | `Prefix Icon=True` | 左侧图标 + 文字 |
| **Suffix Icon** | `Suffix Icon=True` | 文字 + 右侧图标 |
| **Only Icon** | `Only Icon=True` | 仅图标，正方形按钮（宽 = 高） |

## 通用基础规格

| 属性 | 值 | 说明 |
|------|-----|------|
| 圆角 | 99px | 胶囊形 `border-radius: 99px` |
| 字体 | Switzer | 主 UI 字体 |
| 行高 | 130% | `line-height: 1.3` |
| 图标与文字间距 | 8px | `gap: 8px`（所有尺寸统一） |
| 布局 | `display: inline-flex; align-items: center; justify-content: center` | — |
| 过渡 | `150ms ease` | background + color |
| 图标大小规则 | 字号 + 2px | 18px文字→20px图标，16px→18px，14px→16px，12px→14px |

## CSS 实现参考

```css
.btn-v5 {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 99px;
  border: none;
  font-family: 'Switzer', sans-serif;
  line-height: 1.3;
  cursor: pointer;
  transition: background 150ms ease, color 150ms ease;
  white-space: nowrap;
}

/* 尺寸 */
.btn-v5--xxl { height: 56px; padding: 0 32px; font-size: 18px; font-weight: 600; }
.btn-v5--xl  { height: 48px; padding: 0 24px; font-size: 16px; font-weight: 500; }
.btn-v5--lg  { height: 44px; padding: 0 24px; font-size: 16px; font-weight: 500; }
.btn-v5--md  { height: 40px; padding: 0 20px; font-size: 14px; font-weight: 500; }
.btn-v5--sm  { height: 36px; padding: 0 16px; font-size: 14px; font-weight: 500; }
.btn-v5--xs  { height: 32px; padding: 0 12px; font-size: 12px; font-weight: 500; }
.btn-v5--xxs { height: 28px; padding: 0 10px; font-size: 12px; font-weight: 500; }

/* Primary (GTPay 品牌绿) */
.btn-v5--primary { background: var(--gtpay-color-brand, #ADF73E); color: #070808; }
.btn-v5--primary:hover { background: var(--gtpay-color-buttonhover, #8BD121); }

/* Secondary (灰色) */
.btn-v5--secondary { background: var(--color-cmpt-button-soft, #F5F6F7); color: #070808; }
.btn-v5--secondary:hover { background: #ECEDEF; }

/* Disable（所有 Type 统一） */
.btn-v5:disabled, .btn-v5--disabled {
  background: #F5F6F7 !important;
  color: #C4C7CA !important;
  cursor: not-allowed;
  pointer-events: none;
}

/* Loading */
.btn-v5--loading { pointer-events: none; position: relative; }
.btn-v5--loading .btn-v5__text { visibility: hidden; }
.btn-v5--loading::after {
  content: '';
  position: absolute;
  width: 20px; height: 20px;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: btn-spin 0.6s linear infinite;
}
@keyframes btn-spin { to { transform: rotate(360deg); } }

/* Only Icon */
.btn-v5--icon-only { padding: 0; aspect-ratio: 1; }

/* 图标尺寸（字号 + 2px） */
.btn-v5__icon { flex-shrink: 0; display: inline-flex; align-items: center; justify-content: center; }
.btn-v5__icon svg { display: block; }
.btn-v5--xxl .btn-v5__icon { width: 20px; height: 20px; }
.btn-v5--xl .btn-v5__icon { width: 18px; height: 18px; }
.btn-v5--lg .btn-v5__icon { width: 18px; height: 18px; }
.btn-v5--md .btn-v5__icon { width: 16px; height: 16px; }
.btn-v5--sm .btn-v5__icon { width: 16px; height: 16px; }
.btn-v5--xs .btn-v5__icon { width: 14px; height: 14px; }
.btn-v5--xxs .btn-v5__icon { width: 14px; height: 14px; }
```

## 数据接口

```typescript
interface ButtonV5Props {
  type: 'primary' | 'secondary';
  size: 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs' | 'xxs';
  state?: 'default' | 'hover' | 'disabled' | 'loading';
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  iconOnly?: boolean;
  label: string;
  onClick?: () => void;
}
```

## 组合矩阵

```
Types:  Primary-Black(GTPay绿)  Secondary-Gray
States: Default  Hover  Disable  Loading
Sizes:  XXL(56) XL(48) L(44) M(40) S(36) XS(32) XXS(28)
Icons:  None  Prefix  Suffix  OnlyIcon

Total: 2 Types × 4 States × 7 Sizes × 4 Icons = 224 变体
```

## Figma 节点索引（部分）

| Type | State | Size | Icon | Figma Node |
|------|-------|------|------|------------|
| Primary | Default | XXLarge | None | 16422:13725 |
| Primary | Default | XLarge | None | 16422:13737 |
| Primary | Default | Large | None | 16422:13735 |
| Primary | Hover | XLarge | None | 16422:13777 |
| Primary | Disable | XLarge | None | 16422:13817 |
| Primary | Loading | Large | None | 16422:13755 |
| Primary | Default | Large | Prefix | 16422:13835 |
| Primary | Default | XLarge | Suffix | 16422:13978 |
| Secondary | Default | XXLarge | None | 16422:13729 |
| Secondary | Default | XLarge | None | 16422:13745 |
| Secondary | Hover | XLarge | None | 16422:13785 |
| Secondary | Disable | XLarge | None | 16422:13825 |
| Secondary | Default | Large | Prefix | 16422:13847 |

## 与 v2.0.0 的差异

| 维度 | v2.0.0 | v3.0.0（当前） |
|------|--------|--------------|
| 类型数量 | 5 种（含 Red/White） | **2 种**（Primary + Secondary） |
| Figma 节点 | `16310:8228` | **`16422:13724`** |
| Primary 背景 | `#303236`（需覆盖） | **`#ADF73E`**（原生品牌绿） |
| 尺寸数量 | 8 档（含 24px） | **7 档**（28px 起） |
| 状态 | 5 种（含 Pressed） | **4 种**（无 Pressed） |
| 图标间距 | 6px | **8px** |
