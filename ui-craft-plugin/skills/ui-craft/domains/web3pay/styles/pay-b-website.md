# Pay-B Website — 官网默认风格

---

## 区块 1: 元信息

```yaml
name: pay-b-website
description: GatePay 官网默认风格 — 白底+深色双主题、品牌绿 CTA、大字号标题、营销感
mode: dual (light sections + dark footer)
inherits: pay-b-default (品牌色系共享)
source_urls:
  - figma://5fRySZo785Q1QHfn8FxqeN
  - node: 1420:113319 (Pay B端官网 一期)
extracted_at: 2026-03-26
calibrated_at: 2026-03-26
```

---

## 区块 2: 风格画像

- **视觉情绪**：专业、开放、有冲击力
- **核心组件**：Hero Banner、Header+Footer、Feature Card、CTA Section、Testimonial
- **强调方式**：品牌绿（#ADF73E）CTA 按钮 + 深色主按钮（#303236）+ 毛玻璃浮动卡片
- **适用标签**：`官网` `Landing Page` `营销` `C端入口`

| 维度 | 本风格 | 与 pay-b-default 对比 |
|------|--------|---------------------|
| 色温 | 中性偏暖 | pay-b-default 偏冷（纯白灰） |
| 信息密度 | 低（大留白） | pay-b-default 高（紧凑表格） |
| 装饰程度 | 中等（渐变、毛玻璃、大圆角） | pay-b-default 极简 |
| 色彩饱和度 | 中等（Hero 大图 + 品牌绿 CTA） | pay-b-default 低 |
| 字号范围 | 12px → 72px | pay-b-default 14px → 64px |
| 双主题 | Light 内容区 + Dark Footer | pay-b-default 纯 Light |

---

## 区块 3: CSS 变量表

> 从 Figma 节点 `1420:113319` 精确提取，兼容 pay-b-default 共享变量。

### 3.1 颜色变量

#### Light 区域（Header / Hero / 内容区）

| 变量 | 值 | 说明 |
|------|-----|------|
| `--bg` | `#FFFFFF` | 页面白底 |
| `--bg-card` | `#FFFFFF` | 卡片白底 |
| `--bg-muted` | `#F5F6F7` | 次级背景 / Hover 底色 |
| `--bg-secondary` | `#FAFAFA` | 浅灰背景区 |
| `--text-primary` | `#070808` | 主文字（近黑） |
| `--text-secondary` | `#84888C` | 辅助文字 |
| `--text-tertiary` | `#A0A3A7` | 三级文字 / placeholder |
| `--text-quaternary` | `#C4C7CA` | 禁用文字 |
| `--border` | `#ECEDEF` | 主边框 |
| `--border-strong` | `#DFE0E2` | 加强边框 |
| `--divider-short` | `#C4C7CA` | 分隔线 |

#### Dark 区域（Footer / Dark Section）

| 变量 | 值 | 说明 |
|------|-----|------|
| `--dark-bg` | `#070808` | 深色背景 |
| `--dark-bg-blur` | `rgba(255,255,255,0.02)` | 毛玻璃叠加层 |
| `--dark-bg-secondary` | `#131516` | 次级深色（二维码容器等） |
| `--dark-bg-input` | `#1F2023` | 深色输入框 / Dropdown |
| `--dark-text-primary` | `#FFFFFF` | 深色背景上的主文字 |
| `--dark-text-secondary` | `#A0A3A7` | 深色背景上的辅助文字 |
| `--dark-text-tertiary` | `#84888C` | 深色背景上的三级文字 |
| `--dark-divider` | `rgba(255,255,255,0.1)` | 深色分割线 |

#### 品牌色（共享 pay-b-default）

| 变量 | 值 | 说明 |
|------|-----|------|
| `--gtpay-color-brand` | `#ADF73E` | GTPay 品牌绿（亮绿） |
| `--gtpay-text-brand` | `#68AD00` | 品牌文本绿 |
| `--gtpay-color-buttonhover` | `#8BD121` | 品牌按钮 Hover |
| `--gtpay-component-hover` | `#E6F4D2` | 组件 Hover 浅绿 |
| `--success` | `#68AD00` | 成功色 |
| `--warning` | `#FF6600` | 警告橙 |
| `--error` | `#EF4444` | 错误红 |
| `--info` | `#0068FF` | 信息蓝 |

#### 毛玻璃卡片（Hero 浮动卡片专用）

| 变量 | 值 | 说明 |
|------|-----|------|
| `--glass-bg` | `rgba(255,255,255,0.4)` | 卡片背景 |
| `--glass-border` | `rgba(64,64,64,0.5)` | 卡片边框 |
| `--glass-blur` | `11.111px` | backdrop-filter |
| `--glass-radius` | `18px` | 卡片圆角 |
| `--glass-shadow` | 见下方 | 多层投影 |

```css
--glass-shadow:
  -24px 58.667px 25.778px 0px rgba(145,145,145,0.01),
  -13.333px 32.889px 21.333px 0px rgba(145,145,145,0.03),
  -6.222px 15.111px 16px 0px rgba(145,145,145,0.04),
  -1.778px 3.556px 8.889px 0px rgba(145,145,145,0.05);
```

### 3.2 圆角变量

| 变量 | 值 | 说明 |
|------|-----|------|
| `--radius-hero-image` | `42.667px` | Hero 产品截图大圆角 |
| `--radius-glass-card` | `18px` | 毛玻璃浮动卡片 |
| `--radius-card` | `8px` | 标准卡片 / Dropdown |
| `--radius-btn` | `99px` | 胶囊按钮 |
| `--radius-input` | `6px` | 输入框 / Dropdown |
| `--radius-qrcode` | `8px` | 二维码容器 |
| `--radius-feature-icon` | `50%` | 特性图标圆形 |

### 3.3 间距系统

| 变量 | 值 | 说明 |
|------|-----|------|
| `--space-xs` | `4px` | 最小间距 |
| `--space-sm` | `8px` | 小间距 |
| `--space-md` | `12px` | 中间距 |
| `--space-base` | `16px` | 基础间距 |
| `--space-lg` | `20px` | 大间距 |
| `--space-xl` | `24px` | 加大间距 |
| `--space-2xl` | `32px` | 双倍间距 |
| `--space-3xl` | `40px` | 三倍间距 |
| `--space-4xl` | `48px` | 四倍间距 |
| `--space-5xl` | `64px` | 五倍间距 |
| `--space-6xl` | `80px` | 六倍间距（Footer 顶部） |

#### 官网专属间距

| 变量 | 值 | 场景 |
|------|-----|------|
| `--hero-title-gap` | `16px` | 主标题 → 副标题 |
| `--hero-cta-gap` | `48px` | 标题区 → CTA 按钮 |
| `--hero-image-gap` | `64px` | CTA → 产品截图 |
| `--section-gap` | `120px` | 页面 Section 之间 |
| `--feature-col-gap` | `40px` | 特性三列间距 |
| `--feature-icon-gap` | `20px` | 图标 → 文字区 |
| `--feature-title-gap` | `12px` | 特性标题 → 描述 |
| `--footer-col-gap` | `24px` | Footer 列间距 |
| `--footer-link-gap` | `16px` | Footer 链接间距 |
| `--footer-social-gap` | `32px` | 社交图标间距 |
| `--content-max-width` | `1200px` | 内容区最大宽度（Footer） |
| `--hero-content-width` | `800px` | Hero 文字区宽度 |
| `--hero-image-width` | `1280px` | Hero 产品截图宽度 |

### 3.4 字体

> 主字体 Switzer，中文回退 Noto Sans SC / Noto Sans JP

```css
font-family: 'Switzer', 'Noto Sans SC', 'Noto Sans JP', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

### 3.5 排版规格

| Token | 字号 | 字重 | 行高 | 颜色 | 场景 | Figma Token |
|-------|------|------|------|------|------|-------------|
| Hero 主标题 | **72px** | **700 Bold** | normal | `--text-primary` | 首屏大标题 | — |
| Section 标题 | **48px** | **700 Bold** | 1.3 | `--text-primary` | 区块标题 | — |
| 特性标题 | **24px** | **600 Semibold** | 1.3 | `--text-primary` | 三列特性卡片标题 | `Web_V5/Heading/H6` |
| Footer 列标题 | **20px** | **600 Semibold** | 1.3 | `--dark-text-primary` | 白色 | `Web_V5/Subtitle/S3` |
| CTA 按钮文字 | **18px** | **600 Semibold** | 1.3 | 白色 / 黑色 | 56px 大按钮 | `Web_V5/Subtitle/S5` |
| 副标题 / Body 多行 | **18px** | **400 Regular** | 1.5 | `--text-primary` | Hero 副标题 | — |
| 特性描述 | **16px** | **400 Regular** | 1.5 | `--text-primary` | 三列特性描述 | `Web_V5/BodyMutil/BM1` |
| 导航文字 | **14px** | **500 Medium** | 1.3 | `--text-primary` | Header 导航 | `Web_V5/Body/B7` |
| Footer 链接 | **14px** | **500 Medium** | 1.3 | `--dark-text-secondary` | 灰色链接 | `Web_V5/Body/B7` |
| Footer 说明 | **14px** | **400 Regular** | 1.3 | `#84888C` | 下载说明 | `Web_V5/Body/B8` |
| Sign Up 按钮 | **12px** | **500 Medium** | 1.3 | `#000000` | Header 小按钮 | `Web_V5/Body/B11` |
| 卡片金额 | **18-20px** | **700 Bold** | 1.3 | `--text-primary` | 浮动卡片 | — |
| 卡片标签 | **10px** | **600 Semibold** | 1.3 | `--text-primary` | 浮动卡片 | — |
| 涨幅百分比 | **16px** | **600 Semibold** | 1.3 | `#406B00` | 绿色涨幅 | — |

---

## 区块 4: 按钮规格

### 4.1 主 CTA（深色）

| 属性 | 值 | 说明 |
|------|-----|------|
| 背景 | `var(--color-cmpt-button-primary, #303236)` | 深灰黑色 |
| 文字 | 白色 `var(--color-text-inverse-primary, white)` | — |
| 高度 | **56px** (XXL) | 官网主 CTA |
| 宽度 | **200px** | 固定宽度 |
| 圆角 | 99px | 胶囊 |
| 字号 | 18px / 600 Semibold | — |
| Hover | 略亮 `#404348` | — |

### 4.2 次 CTA（文字链接）

| 属性 | 值 | 说明 |
|------|-----|------|
| 背景 | 透明 | Ghost 按钮 |
| 文字 | `#070808` 18px / 700 Bold / 下划线 | — |
| 高度 | **56px** (XXL) | 与主 CTA 对齐 |
| 宽度 | **120px** | 固定宽度 |

### 4.3 Header Sign Up

| 属性 | 值 | 说明 |
|------|-----|------|
| 背景 | `var(--gtpay-color-brand, #ADF73E)` | 品牌绿 |
| 文字 | `#000000` 12px / 500 Medium | 黑字 |
| 高度 | **28px** (XXSmall) | 紧凑尺寸 |
| 圆角 | 99px | — |

### 4.4 Footer "编辑配置"

| 属性 | 值 | 说明 |
|------|-----|------|
| 背景 | 白色 + 边框 | Secondary Outline |
| 文字 | `#070808` | — |
| 高度 | **32px** (Small) | — |

---

## 区块 5: 布局规格

### Header

| 属性 | 值 |
|------|-----|
| 高度 | **48px** |
| 背景 | 白色 + `backdrop-filter: blur(50px)` |
| 内边距 | `0 24px` |
| 定位 | `position: fixed; top: 0; width: 100%` |
| Logo 与导航间距 | `40px` |
| 导航项间距 | `20px` |
| 右侧工具间距 | `16px` |

### Hero Section

| 属性 | 值 |
|------|-----|
| 文字区宽度 | **800px** 居中 |
| 距 Header | **128px**（即 header 48px + 80px padding） |
| 产品截图 | **1280 × 620px**，`border-radius: 42.667px` |
| CTA → 截图间距 | **64px** |
| 截图 → 特性间距 | **64px** |

### Feature Section（三列特性）

| 属性 | 值 |
|------|-----|
| 列间距 | `gap: 40px` |
| 各列 | `flex: 1` 等宽 |
| 图标 | 48×48px 灰色圆形 + 24px CEX 图标 |

### Footer

| 属性 | 值 |
|------|-----|
| 内容区宽度 | **1200px** 居中 |
| 顶部 padding | **80px** |
| 列数 | 5 列（232px + 4 × flex:1） |
| 列间距 | `gap: 24px` |
| 版权栏高度 | **64px** |

---

## 区块 6: 响应式断点

> 来源：Figma 「断点」section `3097:70334`，含 375px H5 版本。

| 断点 | 宽度 | 策略 |
|------|------|------|
| **Desktop** | ≥1280px | 默认全宽，内容区 1200px 居中 |
| **Laptop** | 992-1279px | 内容区自适应，Hero 图缩放 |
| **Tablet** | 768-991px | 特性从 3 列变 1 列，Footer 从 5 列变 2+3 |
| **Mobile** | 375-767px | 全宽，CTA 通栏，Header 变汉堡菜单 |

### H5 (375px) 关键差异

| 维度 | Desktop | H5 (375px) |
|------|---------|-----------|
| Header | Logo + 导航 + 登录 | Logo + Download + 汉堡菜单 |
| Hero 标题 | 72px | 缩小至适配 335px 宽 |
| CTA 主按钮 | 200px 固定宽 | **343px 通栏** 48px 高 |
| CTA 次按钮 | 120px Ghost | 82px 文字链接 40px 高 |
| 产品截图 | 1280×620px | 全宽自适应 |
| 特性列 | 3 列 gap:40px | 1 列纵向 |
| Footer 列 | 5 列 | 折叠手风琴 |

---

## 区块 7: 自检清单

- [x] [B] 全部颜色通过 CSS 变量引用
- [x] [B] Header 高度 48px（非后台 72px）
- [x] [B] Hero 主标题 72px/700 Bold（非后台 36px/600）
- [x] [B] 主 CTA 背景 `#303236`（深色，非品牌绿 #ADF73E）
- [x] [B] Header Sign Up 按钮用品牌绿 `#ADF73E`
- [x] [B] Footer 深色背景 `#070808` + 白色文字
- [x] [B] 产品截图大圆角 42.667px
- [x] [B] 毛玻璃卡片使用 `backdrop-filter: blur(11px)` + `rgba(255,255,255,0.4)` 背景
- [x] [W] 内容区最大宽度 1200px（Footer） / 1280px（Hero 图）
- [x] [W] 字体 Switzer + Noto Sans SC fallback

### 适用场景

- GatePay 官网首页 / 产品 Landing Page
- Pay-B 官方营销页面
- Gate Pay 活动页（品牌一致性要求）

### 不适用场景

- Pay-B 商户后台页面（使用 `pay-b-default.md`）
- Web3 钱包 / Swap 页面（使用 Web3 域风格）
- Campaign 活动页（使用 campaign 域）

---

## 区块 8: 与 pay-b-default 差异对照

| 维度 | pay-b-website（本风格） | pay-b-default（后台风格） |
|------|----------------------|------------------------|
| Header 高度 | 48px | 72px |
| Sidebar | 无 | 320px |
| 主 CTA 背景色 | `#303236`（深色） | `#ADF73E`（品牌绿） |
| 最大字号 | 72px（Hero） | 64px（Dashboard 数值） |
| 最小字号 | 10px（卡片标签） | 14px（全局最小） |
| 背景主题 | Light + Dark 双主题 | 纯 Light |
| 内容区定位 | 全宽居中 `max-width` | `margin-left: 320px` |
| 信息密度 | 低（大留白） | 高（紧凑表格） |
| 装饰元素 | 毛玻璃、大圆角、渐变 | 几乎无装饰 |
| 全局字重下限 | 400 Regular | 500 Medium |
