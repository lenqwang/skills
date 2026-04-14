---
scope: [exchange, web3pay]
layer: L2
---
# Header/Footer 顶部导航与底部

> 全局导航组件，包含 Header（顶部导航栏）和 Footer（底部信息区），覆盖 Web 与 H5 双端。

---

## Figma 链接

- [Header/Footer_H5 Guidelines](https://www.figma.com/design/kQIx9xKLiyO6KZIbazNSM2/?node-id=7863-13365)

**组件 Token：** `Header+Footer`（Web）/ `Header+Footer_V5`（H5）

---

## Header 顶部导航

### Web 规格（1920px）

| 属性 | 值 | CSS Variable |
|------|---|--------------|
| 高度 | 48px | — |
| 背景 | `#FFFFFF` | `--color-bg-primary` |
| 内边距 | 0 24px | — |
| 毛玻璃效果 | `backdrop-filter: blur(50px)` | — |

#### 状态变体

| 状态 | 说明 |
|------|------|
| **Default（未登录）** | 显示 Log In 文字 + Sign Up 按钮 |
| **Log in（已登录）** | 显示用户头像 + 下拉菜单 |

#### 左侧导航区

| 元素 | 规格 |
|------|------|
| Logo | 103.5×24px |
| 导航项间距 | 20px |
| 导航文字 | 14px / 500 Medium / `#070808` |
| 下拉箭头 | `CEX_down_fill` 16×16px |
| 导航项 | Buy Crypto ▼ / Markets / Trade ▼ / Futures ▼ / Earn ▼ / Community ▼ / Web3 / More ▼ / Rewards Hub |

#### 右侧工具区

| 元素 | 规格 | 间距 |
|------|------|------|
| Log In 文字 | 14px / 500 Medium / `#070808` | 16px |
| Sign Up 按钮 | 28px 高 / 12px 内边距 / 99px 圆角 / `#303236` 背景 | 16px |
| 竖线分隔符 | 1×16px / `#DFE0E2` | 16px |
| 图标组 | 24×24px（Search / Download / Language / Darkmode / Settings） | 16px |

### H5 规格（375px）

| 属性 | 值 | CSS Variable |
|------|---|--------------|
| 高度 | 48px | — |
| 背景 | `rgba(255,255,255,0.5)` | `--color-cmpt-header-bg-50` |
| 毛玻璃效果 | `backdrop-filter: blur(50px)` | — |

#### 布局

| 元素 | 位置 | 规格 |
|------|------|------|
| Logo | 左侧 16px | 86.3×20px |
| Log In 按钮 | 右侧居中 | 28px 高 / 12px 内边距 / 99px 圆角 / `#303236` 背景 |
| 竖线分隔符 | 按钮右侧 | 1×16px |
| 图标组 | 右侧 | Search / Download / Grid（24×24px），间距 16px |

---

## Footer 底部信息区

### Web 规格（1920px）

| 属性 | 值 | CSS Variable |
|------|---|--------------|
| 背景 | `#FAFAFA` | `--color-bg-secondary` |
| 上内边距 | 80px | — |
| 内容区宽度 | 1200px | — |
| 列间距 | 24px | — |

#### 布局结构

```
┌─────────────────────────────────────────────────────────────────┐
│  Trade Crypto    │  About      │  Products   │  Services  │  Learn    │
│  Anywhere        │  About Us   │  Buy Crypto │  VIP       │  Gate     │
│  Anytime         │  Careers    │  Sell       │  Benefits  │  Learn    │
│                  │  Partners   │  Spot       │  User      │  Crypto   │
│  [QR Code]       │  User       │  Trading    │  Feedback  │  Courses  │
│  132×132px       │  Agreement  │  Futures    │  ...       │  ...      │
│                  │  ...        │  ...        │            │           │
│  Community       │             │             │            │           │
│  [社媒图标]       │             │             │            │           │
│  [语言选择器]     │             │             │            │           │
├─────────────────────────────────────────────────────────────────┤
│                    Gate © 2013-2025.                            │
└─────────────────────────────────────────────────────────────────┘
```

#### 左侧品牌区

| 元素 | 规格 |
|------|------|
| 标题 | 20px / 600 Semibold / `#070808` / 宽度 220.8px |
| 二维码容器 | 132×132px / 8px 圆角 / 白色背景 / 8px 内边距 |
| 二维码图片 | 116×116px |
| 提示文字 | 14px / 400 Regular / `#A0A3A7` |

#### 社媒图标

| 图标 | 尺寸 | 间距 |
|------|------|------|
| Email / Facebook / Twitter / Telegram | 24×24px | 32px |
| Discord / Instagram / YouTube / More | 24×24px | 32px |

#### 语言选择器

| 属性 | 值 |
|------|---|
| 宽度 | 168px |
| 高度 | 32px |
| 背景 | `#F2F3F4`（`--color-layer-2`） |
| 圆角 | 6px |
| 文字 | 14px / 500 Medium / `#070808` |

#### 导航列

| 属性 | 值 |
|------|---|
| 列标题 | 20px / 500-600 Medium-Semibold / `#070808` |
| 列表项 | 14px / 500 Medium / `#84888C`（`--color-text-text-secondary`） |
| 列表项间距 | 16-20px |

#### 底部版权

| 属性 | 值 |
|------|---|
| 高度 | 64px |
| 顶部分隔线 | 1px / `#DFE0E2` |
| 文字 | 14px / 500 Medium / `#A0A3A7`（`--color-text-text-tertiary`） |

### H5 规格（375px）

| 属性 | 值 | CSS Variable |
|------|---|--------------|
| 背景 | `#FAFAFA` | `--color-bg-secondary` |
| 上内边距 | 40px | — |
| 下内边距 | 24px | — |
| 水平内边距 | 16px | — |

#### 布局结构

```
┌─────────────────────────┐
│  [Gate Logo]            │
│  86.3×20px              │
├─────────────────────────┤
│  About                ▼ │
│  Products             ▼ │
│  Services             ▼ │
│  Learn                ▼ │
├─────────────────────────┤
│  [社媒图标 6个]          │
│  [社媒图标 2个]          │
├─────────────────────────┤
│  [English ▼] [USD ▼]    │
├─────────────────────────┤
│  Copyright © 2013-2025. │
│  All Right Reserved.    │
└─────────────────────────┘
```

#### 折叠菜单项

| 属性 | 值 |
|------|---|
| 文字 | 16px / 500 Medium / `#070808` |
| 箭头图标 | `CEX_chevron_down` 20×20px |
| 项间距 | 24px |

#### 社媒图标

| 属性 | 值 |
|------|---|
| 图标尺寸 | 24×24px |
| 图标间距 | 40px |
| 第一行 | Email / Facebook / Twitter / Telegram / Discord / Instagram |
| 第二行 | YouTube / More |

#### 语言/货币选择器

| 属性 | 值 |
|------|---|
| 布局 | 两列等宽 |
| 高度 | 48px |
| 背景 | `#F2F3F4`（`--color-layer-2`） |
| 圆角 | 8px |
| 间距 | 12px |
| 文字 | 14px / 500 Medium / `#070808` |

#### 版权信息

| 属性 | 值 |
|------|---|
| 文字 | 12px / 400 Regular / `#A0A3A7` |
| 对齐 | 居中 |
| 行高 | 1.3 |

---

## CSS Variables

```css
:root {
  /* 背景 */
  --color-bg-primary: #FFFFFF;
  --color-bg-secondary: #FAFAFA;
  --color-layer-2: #F2F3F4;
  --color-cmpt-header-bg-50: rgba(255, 255, 255, 0.5);
  
  /* 文本 */
  --color-text-text-primary: #070808;
  --color-text-text-secondary: #84888C;
  --color-text-text-tertiary: #A0A3A7;
  --color-text-inverse-primary: #FFFFFF;
  
  /* 组件 */
  --color-cmpt-button-primary: #303236;
  --color-cmpt-input: #F5F6F7;
  
  /* 边框 */
  --color-line-divider: #DFE0E2;
}
```

---

## 字体规范

### Web

| 样式 | 字号 | 字重 | 行高 | 用途 |
|------|------|------|------|------|
| S3 600 20px | 20px | 600 Semibold | 1.3 | Footer 列标题 |
| S4 500 20px | 20px | 500 Medium | 1.3 | Footer 列标题 |
| B7 500 14px | 14px | 500 Medium | 1.3 | 导航项、列表项 |
| B8 400 14px | 14px | 400 Regular | 1.3 | 辅助文字 |
| B11 500 12px | 12px | 500 Medium | 1.3 | 按钮文字 |

### H5

| 样式 | 字号 | 字重 | 行高 | 用途 |
|------|------|------|------|------|
| S4 500 16px | 16px | 500 Medium | 1.3 | 折叠菜单标题 |
| B7 500 14px | 14px | 500 Medium | 1.3 | 选择器文字 |
| B13 400 12px | 12px | 400 Regular | 1.3 | 版权信息 |

---

## 响应式适配

| 断点 | Header 高度 | Footer 布局 |
|------|------------|------------|
| ≥1920px（Web） | 48px | 5 列横向布局 |
| ≤768px（H5） | 48px | 单列折叠布局 |

---

## 交互规则

1. **Header 导航下拉**：带 ▼ 的导航项 hover 时展开下拉菜单
2. **Footer 折叠菜单（H5）**：点击展开/收起对应分类的链接列表
3. **语言/货币选择器**：点击弹出下拉选项
4. **毛玻璃效果**：Header 使用 `backdrop-filter: blur(50px)` 实现半透明模糊背景
