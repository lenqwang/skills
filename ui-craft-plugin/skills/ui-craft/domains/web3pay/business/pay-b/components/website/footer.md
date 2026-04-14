---
scope: [web3pay]
layer: L2
context: pay-b-website
---

# Footer 官网底部导航

> 来源: Figma [Pay-B端官网](https://www.figma.com/design/5fRySZo785Q1QHfn8FxqeN/) · Node `8577:49053`
> 归属: web3pay / Pay-B 官网（营销 Web）
> 版本: v1.0.0

## 组件概述

Pay-B 官网底部导航区域，深色背景（#070808），包含 Logo、5 列链接导航、社交媒体图标、App 下载二维码、语言选择器和版权信息。

---

## 基础规格

| 属性 | 值 | 说明 |
|------|-----|------|
| 背景 | `var(--color-bg-always-black, #070808)` | 深色背景 |
| 模糊层 | `backdrop-filter: blur(75px)` + `rgba(255,255,255,0.02)` | 毛玻璃叠加 |
| 内容区宽度 | **1200px** | 居中 |
| 内容区内边距 | `padding-top: 80px` | 顶部 80px |
| 列间距 | `gap: 24px` | 5 列之间 |
| 列宽 | 第 1 列 232px 固定，其余 4 列 `flex: 1` 等分 | — |

---

## 布局结构

```
┌────────────────────────────────────────────────────────────────────┐
│  [Gate Pay Logo · 灰色]                      Gate Pay Terms of Use │
│                                                                     │
│  ┌──────────┬──────────┬──────────┬──────────┬──────────┐          │
│  │ 下载 +   │  About   │ Products │ Services │  Learn   │          │
│  │ 二维码   │  18 links│ 14 links │ 13 links │ 10 links │          │
│  │ Community│          │          │          │ +4展开    │          │
│  │ 社交图标 │          │          │          │          │          │
│  │ 语言选择 │          │          │          │          │          │
│  └──────────┴──────────┴──────────┴──────────┴──────────┘          │
│  ─────────────────────────────────────────────────────────          │
│                     Gate © 2013-2025                                │
└────────────────────────────────────────────────────────────────────┘
```

---

## Logo 区域

| 属性 | 值 | 说明 |
|------|-----|------|
| Logo 文字 | "Pay" 26px Switzer Regular | 灰色 `var(--text-tertiary, #A0A3A7)` |
| Gate Pay Terms 链接 | 14px / Medium | 右上角 `var(--color-text-text-tertiary, #A0A3A7)` |

---

## 第 1 列：下载 + 社区

### App 下载

| 属性 | 值 | 说明 |
|------|-----|------|
| 标题 | "Trade Crypto Anywhere Anytime" | 20px / 600 Switzer Semibold / 白色 |
| 二维码容器 | 132×132px | bg `var(--color-bg-secondary, #131516)`, radius 8px, padding 8px |
| 二维码图片 | 116×116px | 内嵌于容器 |
| 说明文字 | "Scan to download Gate app" | 14px / 400 / `#84888C` |

### Community 社交媒体

| 属性 | 值 | 说明 |
|------|-----|------|
| 标题 | "Community" | 20px / 600 Switzer Semibold / 白色 |
| 图标尺寸 | 24×24px | CEX 图标系列 |
| 图标间距 | `gap: 32px` | 水平排列 |
| 第 1 行 | Email, Facebook, Twitter, Telegram | 4 个图标 |
| 第 2 行 | Discord, Instagram, YouTube, More | 4 个图标 |
| 行间距 | `gap: 24px` | 两行之间 |

### 语言选择器

| 属性 | 值 | 说明 |
|------|-----|------|
| 组件 | `DropdownV5-web` | 168px 宽 |
| 高度 | 32px | 紧凑尺寸 |
| 背景 | `var(--color-layer-2, #1F2023)` | 深灰 |
| 圆角 | 6px | — |
| 文字 | "English/USD" 14px Medium 白色 | 带下拉箭头 |

---

## 第 2-5 列：链接导航

| 列 | 标题 | 链接数量 | 说明 |
|----|------|---------|------|
| About | About Us, Careers, Partners... | 18 | 综合信息 |
| Products | Buy Crypto, Sell Crypto, Spot Trading... | 14 | 产品列表 |
| Services | VIP Benefits, User Feedback, Announcement... | 13 | 服务入口 |
| Learn | Gate Learn, Crypto Courses, Crypto Glossary... | 10 + 4 展开 | 学习资源 |

### 链接样式

| 属性 | 值 | 说明 |
|------|-----|------|
| 标题 | 20px / 500 Medium / 白色 `var(--color-text-text-primary, white)` | 列标题 |
| 链接 | 14px / 500 Medium / `var(--color-text-text-secondary, #A0A3A7)` | 链接文字 |
| 链接间距 | `gap: 16px`（About/Products） / `gap: 20px`（Services/Learn） | 纵向间距 |
| Hover | 文字色变白 | 悬停效果 |
| 展开项 | 带 `CEX_down_fill` 14px 箭头 | Learn 列特有 |

---

## 底部版权栏

| 属性 | 值 | 说明 |
|------|-----|------|
| 分隔线 | 全宽 1920px | 细线 |
| 容器高度 | 64px | 含分隔线 |
| 版权文字 | "Gate © 2013-2025" | 14px Medium / `#84888C` / 居中 |

---

## 字体规格

| 元素 | 字体 | 字号 | 字重 | Figma Token |
|------|------|------|------|-------------|
| 列标题 | Switzer | 20px | Semibold (600) | `Web_V5/Subtitle/S3` |
| 链接文字 | Switzer | 14px | Medium (500) | `Web_V5/Body/B7` |
| 下载说明 | Switzer | 14px | Regular (400) | `Web_V5/Body/B8` |
| 版权 | Switzer | 14px | Medium (500) | `Web_V5/Body/B7` |

---

## 引用关系

- Header 组件：`pay-b-website/header-footer.md`
- 图标：CEX 系列（Email, Facebook, Twitter, Telegram, Discord, Instagram, YouTube, More）
- 语言选择器：复用 `DropdownV5-web` 组件
