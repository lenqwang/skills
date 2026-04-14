---
scope: [web3pay]
layer: L2
context: pay-b
---

# Header 顶部导航

> 来源: Figma [Pay-B端-商家后台](https://www.figma.com/design/tlFIl7F7A7Zl6e9WRLMDZo/) · Node `8121:10295`
> 归属: web3pay / Pay B端商户后台
> 版本: v1.4.0

## 组件概述

后台顶部导航栏（72px），含右侧工具栏（客服/帮助/语言/设置）和用户信息区域。支持 Default 和 Avatar 两种变体。

## 基础规格

| 属性 | Token / CSS 变量 | 值 | 说明 |
|------|-----------------|-----|------|
| 高度 | `--header-height` | 72px | 标准高度 72px（含 `border-bottom`） |
| 宽度 | — | `calc(100% - var(--sidebar-width))` | 不含侧边栏 |
| 背景 | `var(--bg-card)` | `#FFFFFF` | 白色 |
| 底部边框 | `var(--border)` | `1px solid #ECEDEF` | 浅灰分割线 |
| 内边距 | `var(--space-xl)` | `0 24px` | 左右等距 |
| z-index | — | 100 | 最顶层 |
| 图标按钮色（默认） | `var(--text-secondary)` | `#84888C` | 工具栏图标 |
| 图标按钮色（Hover） | `var(--text-primary)` | `#070808` | 悬停态 |
| 分隔线色 | `var(--divider-short)` | `#C4C7CA` | 竖线分隔 |
| 用户名色 | `var(--text-primary)` | `#070808` | 团队名文字 |
| 下拉箭头色 | `var(--text-secondary)` | `#84888C` | chevron_down |

## 状态变体

| 状态 | 属性变化 | 说明 |
|------|---------|------|
| **Default** | 右侧工具栏 + "Grey's Team" 文字标识（无头像） | 无头像模式 |
| **Avatar** | 右侧工具栏 + 用户头像 + "Grey's Team" 文字标识 | 含头像模式 |

## 右侧工具栏布局

> 图标命名遵循 CEX 图标库，Token 前缀 `CEX_`，尺寸 24×24px。

```
左侧 (空) ─────────────────────────── 右侧工具栏
                              CEX_Service  CEX_Helcenter  CEX_Language  CEX_Settings  │  Avatar  Grey's Team  ▼
                              客服          帮助文档        语言切换       全局设置      分隔  头像    团队名     下拉
```

| 元素 | CEX 图标名 | 图标尺寸 | 间距 | 说明 |
|------|-----------|---------|------|------|
| 客服 | `CEX_Service` | 24px | 16px | 在线客服入口 |
| 帮助文档 | `CEX_Helcenter` | 24px | 16px | 帮助中心 |
| 语言切换 | `CEX_Language` | 24px | 16px | 多语言切换 |
| 全局设置 | `CEX_Settings` | 24px | 16px | 全局设置 |
| 竖线分隔 | — | 1px × 20px | 16px | 颜色 `#C4C7CA` |
| 用户头像 | `CEX_DefaultAvatar` | 32px 圆形 | 8px | Avatar 变体显示，Default 变体为圆形占位 |
| 团队名称 | — | 14px / 500 | 4px | "Grey's Team" |
| 下拉箭头 | `CEX_chevron_down` | 12px | — | 展开用户菜单 |
