---
scope: [web3pay]
layer: L2
context: pay-b
---

# Tag 标签

> 来源: Figma [Pay-B端-商家后台](https://www.figma.com/design/tlFIl7F7A7Zl6e9WRLMDZo/) · Node `15807:156443`
> 归属: web3pay / Pay B端商户后台
> 版本: v1.4.0

## 组件概述

6 色 × 2 尺寸标签体系（Grey/Blue/Red/Green/Yellow/Disable），用于表格状态列、业务状态展示等场景。

## 尺寸变体

| 尺寸 | 高度 | 内边距 | 字号 | 字重 |
|------|------|--------|------|------|
| **Medium** | 20px | `2px 8px` | 12px | 500 Medium |
| **Large** | 24px | `4px 8px` | 12px | 500 Medium |

## 基础规格

| 属性 | Token / CSS 变量 | 值 | 说明 |
|------|-----------------|-----|------|
| 圆角 | `var(--radius-tag)` | 4px | pay-b-default §3.2 |
| 字号 | — | 12px | — |
| 字重 | — | 500 Medium | — |
| 行高 | — | 1.3 | — |
| 换行 | — | `white-space: nowrap` | — |
| 布局 | — | `inline-flex` · `align-items: center` · `justify-content: center` | — |

## 颜色变体（6 色）

> 所有色值须通过 `pay-b-default` CSS 变量引用，禁止硬编码。

| Color | 背景色 | 背景 CSS 变量 | 文字色 | 文字 CSS 变量 | 用途 |
|-------|--------|---------------|--------|---------------|------|
| **Grey** | `#F5F6F7` | `var(--tag-grey-bg)` | `#84888C` | `var(--tag-grey-text)` | 默认/中性标签、已取消 |
| **Blue** | `#DBEAFE` | `var(--tag-blue-bg)` | `#0068FF` | `var(--tag-blue-text)` | 信息、链接相关、待处理 |
| **Red** | `#FEE2E2` | `var(--tag-red-bg)` | `#EF4444` | `var(--tag-red-text)` | 错误、失败、危险 |
| **Green** | `#E6F4D2` | `var(--tag-green-bg)` | `#68AD00` | `var(--tag-green-text)` | 成功、启用、已完成 |
| **Yellow** | `#FFF3E0` | `var(--tag-yellow-bg)` | `#FF6600` | `var(--tag-yellow-text)` | 警告、待审核、停用 |
| **Disable** | `#F2F3F4` | — | `#C4C7CA` | `var(--text-quaternary)` | 禁用态标签 |

## 组合矩阵（6 × 2 = 12 变体）

```
        Grey    Blue    Red     Green   Yellow  Disable
Medium  ●       ●       ●       ●       ●       ●
Large   ●       ●       ●       ●       ●       ●
```

## 业务场景映射

| 业务状态 | Tag 颜色 | 标签文字示例 |
|---------|---------|------------|
| 交易成功 / 已结算 | Green | Success / Settled |
| 交易失败 / 已退款 | Red | Failed / Refunded |
| 待确认 / 处理中 | Blue | Pending / Processing |
| 已取消 / 已过期 | Grey | Cancelled / Expired |
| 异常 / 待审核 | Yellow | Abnormal / Reviewing |
| 已禁用 | Disable | Disabled |

## 特殊标签类型

| 类型 | 高度 | 圆角 |
|------|------|------|
| 涨跌标签 | 28px | `default`（6px） |
| VIP 标签 | 14px | `xsmall`（2px） |

## CSS 实现参考

```css
.tag-v5 {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.3;
  white-space: nowrap;
}
.tag-v5--md { height: 20px; padding: 2px 8px; }
.tag-v5--lg { height: 24px; padding: 4px 8px; }

.tag-v5--grey   { background: var(--tag-grey-bg); color: var(--tag-grey-text); }
.tag-v5--blue   { background: var(--tag-blue-bg); color: var(--tag-blue-text); }
.tag-v5--red    { background: var(--tag-red-bg); color: var(--tag-red-text); }
.tag-v5--green  { background: var(--tag-green-bg); color: var(--tag-green-text); }
.tag-v5--yellow { background: var(--tag-yellow-bg); color: var(--tag-yellow-text); }
.tag-v5--disable { background: #F2F3F4; color: var(--text-quaternary); }
```

## 数据接口

```typescript
interface TagProps {
  /** 标签尺寸 */
  size: 'md' | 'lg';
  /** 颜色变体 */
  color: 'grey' | 'blue' | 'red' | 'green' | 'yellow' | 'disable';
  /** 标签文案 */
  label: string;
}
```
