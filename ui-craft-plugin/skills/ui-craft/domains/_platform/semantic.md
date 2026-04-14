# Platform 基座 Token

> Exchange + Web3/Pay 共享的 Token 基座。继承 `primitive.md` 的中性色和状态色，
> 本层定义平台型产品特有的 Token 调整。
> **数据来源**: Figma Gate App V6 (9HordMtYdfmXOYwExRy1MF) — Color(5:5)、Font(5:6)、Spacing(204:15531)、Radius(22307:47883)、Shadow(43869:32902🚧)、StatusBar(43869:42741)、HomeIndicator(43869:42742)、Icon(7131:20611)

---

## 品牌色

品牌色由各业务线覆盖层定义，本层不固定 --brand：
- Exchange: --brand: #0055FF (蓝色) → 见 [exchange/domain.md](../domains/exchange/domain.md)
- Web3/Pay: --brand: #17E5A1 (绿色) → 见 [web3pay/domain.md](../domains/web3pay/domain.md)

## 间距体系（来自 Figma Spacing 204:15531）

基准规则：通用 4 的倍数，小颗粒度可用 2px 或 0px。

| Token | 值 | CSS 变量 | 场景 |
|-------|-----|---------|------|
| space.2 | 2px | --space-2xs | 币种单元格、极小间距 |
| space.4 | 4px | --space-xs | 图标-文字、紧凑 |
| space.6 | 6px | --space-xs2 | — |
| space.8 | 8px | --space-sm | 卡片内边距、快筛间距 |
| space.12 | 12px | --space-md | 卡片间距、模块内间距 |
| space.16 | 16px | --space-base | 标题与内容、模块内间距 |
| space.20 | 20px | --space-lg | — |
| space.24 | 24px | --space-xl | **App 侧边距（新值）**、模块间距 |
| space.32 | 32px | --space-3xl | 大间距 |
| space.48 | 48px | --space-4xl | 大段间距 |

> App 侧边距从 Spacing-16 **改为 Spacing-24**（Figma 规范更新）。

### 使用规范（来自 Figma Guidelines）

| 场景 | 间距 |
|------|------|
| 模块大尺寸间距 | 24 / 32 / 40 / 48px |
| 标题与内容间距 | 16px |
| 卡片内边距 | 8 / 16px |
| 卡片与卡片间距 | 8 / 12px |
| 弹窗内模块间距 | 40px |
| 页面距最底部留白 | 40px |
| 弹窗距最底部留白 | 24px |
| 数值显示间距 | 0px |

### 与 Campaign 对比

| Token | Platform 值 | Campaign 值 | 说明 |
|-------|------------|-------------|------|
| --space-card | 16px | 32px | 卡片内边距更紧凑 |
| --space-section | 32px | 64px | 区块间距更紧凑 |
| 表格行高 | 48px | 56px | 信息密度更高 |
| 输入框间距 | 8px | 12px | 交易面板紧凑 |

## 字阶体系（来自 Figma Font 字阶页 5:6，深层提取）

字体: Gate Switzer（主 UI）/ PingFang SC（中文正文）

> **行高比**：统一 `fontSize × 1.32`（不是 1.5x）。Body 多行场景例外用 1.5x。

### App 字阶（Figma 真值）

| Token | 字号 | 行高 | 字重 | 用途 |
|-------|------|------|------|------|
| d2 | 64px | 84.5px | 600 | Display（极少使用） |
| d3 | 40px | 52.8px | 600 | 大数字展示 |
| d4 | 32px | 42.2px | 600 | 资产金额 |
| h2 | 28px | 37.0px | 600 | 页面主标题 |
| h3 | 24px | 31.7px | 600 | 区块标题 |
| h3-1 | 20px | 26.4px | 600 | 子标题 |
| h4 | 18px | 23.8px | 600 | 小标题 |
| s3 | 16px | 21.1px | 600/400 | 卡片标题 / 正文大 |
| bs1-1 | 15px | 19.8px | 500/400 | 正文（过渡尺寸） |
| s4/bs1 | 14px | 18.5px | 600/500/400 | 正文（默认） |
| s5/bs3 | 12px | 15.8px | 600/500/400 | 辅助文字 / Tab option |
| c2 | 11px | 14.5px | 500/400 | 小辅助文字 |
| c3 | 10px | 13.2px | 500/400 | 最小文字（Tabbar label） |

### Web 字阶

| Token | 字号 | 行高 | 字重 | 用途 |
|-------|------|------|------|------|
| Display | 64px | 84.5px | 600 | 大标题 |
| H1 | 30px | 39.6px | 600 | 分区标题 |
| H2 | 24px | 31.7px | 600 | 卡片标题 |
| H3 | 20px | 26.4px | 600 | 子标题 |
| Body-lg | 16px | 21.1px | 400 | 正文大 |
| Body | 14px | 18.5px | 400 | 正文（默认） |
| Caption | 12px | 15.8px | 400 | 辅助文字 |
| Mini | 10px | 13.2px | 400 | 最小文字 |

### 数值字体

数值场景使用等宽字体确保对齐：

```css
font-variant-numeric: tabular-nums;
font-family: 'Gate Switzer', system-ui, sans-serif;
```

### Figma 完整字阶参考（design-spec-web.md 真值）

> 数据来源: [Font 字阶](https://www.figma.com/design/kQIx9xKLiyO6KZIbazNSM2/?node-id=7100-83054)
> 以下为 Figma 规范的完整 Token 列表，与上方简化字阶互为补充。

#### Web 端完整 Token 表

**Display（首焦大标题）**

| Token | 字重 | 字号 |
|-------|------|------|
| Display / D1 | 600 Semibold | 80px |
| Display / D2 | 600 Semibold | 56px |

**Heading（标题，1-5 级）**

| Token | 字重 | 字号 |
|-------|------|------|
| Heading / H1 | 600 Semibold | 48px |
| Heading / H2 | 600 Semibold | 40px |
| Heading / H3 | 600 Semibold | 32px |
| Heading / H4 | 600 Semibold | 28px |
| Heading / H5 | 600 Semibold | 24px |

**Subtitle（模块标题，S1-S7）**

| Token | 字重 | 字号 |
|-------|------|------|
| Subtitle / S1 | 500 Medium | 24px |
| Subtitle / S3 | 600 Semibold | 20px |
| Subtitle / S4 | 500 Medium | 20px |
| Subtitle / S5 | 600 Semibold | 18px |
| Subtitle / S6 | 500 Medium | 18px |
| Subtitle / S7 | 600 Semibold | 16px |

**Body — 单行正文（B1-B14）**

| Token | 字重 | 字号 |
|-------|------|------|
| Body / B1 | 400 Regular | 20px |
| Body / B2 | 400 Regular | 18px |
| Body / B3 | 500 Medium | 16px |
| Body / B4 | 500 Medium | 16px |
| Body / B5 | 400 Regular | 16px |
| Body / B6 | 600 Semibold | 14px |
| Body / B7 | 500 Medium | 14px |
| Body / B8 | 400 Regular | 14px |
| Body / B9 | 600 Semibold | 12px |
| Body / B10 | 600 Semibold | 12px |
| Body / B11 | 500 Medium | 12px |
| Body / B12 | 500 Medium | 12px |
| Body / B13 | 400 Regular | 12px |
| Body / B14 | 400 Regular | 12px |

**BodyMulti — 多行段落（BM1-BM4）**

| Token | 字重 | 字号 |
|-------|------|------|
| BodyMulti / BM1 | 400 Regular | 16px |
| BodyMulti / BM2 | 400 Regular | 14px |
| BodyMulti / BM3 | 400 Regular | 12px |
| BodyMulti / BM4 | 500 Medium | 14px |

#### H5 端完整 Token 表

**Display**

| Token | 字重 | 字号 |
|-------|------|------|
| D1 | 600 Semibold | 80px |
| D2 | 600 Semibold | 56px |

**Heading（H1-H9，含大屏/小屏响应式值）**

| Token | 字重 | 字号（大屏） | 字号（小屏） |
|-------|------|-------------|-------------|
| H1 | 600 Semibold | 48px | 28px |
| H2 | 600 Semibold | 40px | 28px |
| H3 | 600 Semibold | 40px | 24px |
| H4 | 600 Semibold | 32px | 24px |
| H5 | 600 Semibold | 28px | 18px |
| H6 | 600 Semibold | 24px | 18px |
| H7 | 600 Semibold | 24px | 16px |
| H8 | 700 Bold | 24px | 24px |
| H9 | 700 Bold | 20px | 20px |

**Subtitle（S1-S7）**

| Token | 字重 | 字号（大屏） | 字号（小屏） |
|-------|------|-------------|-------------|
| S1 | 500 Medium | 24px | 18px |
| S2 | 500 Medium | 24px | 16px |
| S3 | 600 Semibold | 20px | 16px |
| S4 | 500 Medium | 20px | 16px |
| S5 | 600 Semibold | 18px | 16px |
| S6 | 500 Medium | 18px | 16px |
| S7 | 600 Semibold | 16px | 16px |

**Body（B1-B14，含大屏/小屏响应式值）**

| Token | 字重（大屏） | 字号（大屏） | 字重（小屏） | 字号（小屏） |
|-------|-------------|-------------|-------------|-------------|
| B1 | 400 Regular | 20px | 400 Regular | 14px |
| B2 | 400 Regular | 18px | 400 Regular | 14px |
| B3 | 500 Medium | 16px | 500 Medium | 16px |
| B4 | 500 Medium | 16px | 500 Medium | 14px |
| B5 | 400 Regular | 16px | 400 Regular | 14px |
| B6 | 600 Semibold | 14px | 600 Semibold | 14px |
| B7 | 500 Medium | 14px | 500 Medium | 14px |
| B8 | 400 Regular | 14px | 400 Regular | 14px |
| B9 | 600 Semibold | 12px | 600 Semibold | 12px |
| B10 | 600 Semibold | 12px | 600 Semibold | 10px |
| B11 | 500 Medium | 12px | 500 Medium | 12px |
| B12 | 500 Medium | 12px | 500 Medium | 10px |
| B13 | 400 Regular | 12px | 400 Regular | 12px |
| B14 | 400 Regular | 12px | 400 Regular | 10px |

#### 字重规则

Web 端和 H5 端均使用以下三档字重：

| 字重值 | 名称 |
|--------|------|
| 400 | Regular |
| 500 | Medium |
| 600 | Semibold |

> H8/H9 标题额外使用 700 Bold（仅 H5 端）。

#### 行高规范

| 类型 | Line Height |
|------|-------------|
| Display / Heading / Subtitle / Body（单行） | Auto（跟随字号） |
| BodyMulti（多行段落） | 150% |

字间距（Letter Spacing）：全部为 `0`。

## 涨跌色

| Token | 默认值 | CSS 变量 | 说明 |
|-------|--------|---------|------|
| --color-up | #2BC287 | var(--color-up) | 涨、正向（绿） |
| --color-down | #F74B60 | var(--color-down) | 跌、负向（红） |
| --color-up-bg | rgba(43,194,135,0.15) | var(--color-up-bg) | 涨色背景 |
| --color-down-bg | rgba(247,75,96,0.15) | var(--color-down-bg) | 跌色背景 |

> 部分地区涨跌色反转（红涨绿跌），通过 CSS 变量在主题层切换。

## 圆角覆盖（来自 Figma Radius 22307:47883）

| Token | Figma Token | 值 | 用途 |
|-------|-------------|------|------|
| --radius-none | none | 0px | Alert、Popup/header |
| --radius-xs | xsmall | 2px | Tag、Tabs Card/item 24px |
| --radius-sm | small | 4px | Selector、快筛、Tabs Card |
| --radius-default | default | 6px | 默认圆角（40px 组件）、Selector、Reminder |
| --radius-card | medium | 8px | Dialog、Toast、Notification、NumberInput |
| --radius-card-lg | large | 12px | 大弹窗、新手引导 |
| --radius-xl | Xlarge | 16px | Popup header |
| --radius-full | full | 999px | 胶囊按钮、Switch、Badge |

> 活动线（Campaign）卡片使用更大圆角（32px），覆盖 --radius-card-lg。

## 阴影体系

> 数据来源: [Shadow_Web Guidelines](https://www.figma.com/design/kQIx9xKLiyO6KZIbazNSM2/?node-id=7777-72132)

### 临时 CSS 值（待 Figma 变量面板同步）

| Token | 值 | 说明 |
|-------|-----|------|
| --shadow-sm | 0 2px 8px rgba(0,0,0,0.08) | 悬浮卡片 |
| --shadow-md | 0 4px 16px rgba(0,0,0,0.12) | 弹窗/下拉 |
| --shadow-lg | 0 8px 32px rgba(0,0,0,0.16) | Modal |

> 深色模式下阴影不明显，改用 border 区分层级。

### 层级体系（Z 轴）

阴影按组件的视觉层级分为 4 档：

| 层级名称 | Token | 适用场景 |
|---------|-------|---------|
| 高（High） | Shadow03 | 最顶层浮层，如模态框、弹出面板 |
| 中（Medium） | Shadow02 | 次级浮层，如 Tooltip、下拉菜单 |
| 低（Low） | Shadow01 | 卡片、悬浮按钮等轻量浮起 |
| 无（None） | — | 无阴影，紧贴背景层 |

### Shadow Token（Light / Dark 双主题）

| Token | 层级 | 主题 | 说明 |
|-------|------|------|------|
| Light/Shadow01 | 低 | Light | 轻度投影，卡片常用 |
| Light/Shadow02 | 中 | Light | 中度投影，下拉菜单 |
| Light/Shadow03 | 高 | Light | 重度投影，浮层 |
| Light/Shadow/dropdown | 特殊 | Light | 下拉列表专用阴影 |
| Dark/Shadow01 | 低 | Dark | 轻度投影（暗色模式） |
| Dark/Shadow02 | 中 | Dark | 中度投影（暗色模式） |
| Dark/Shadow03 | 高 | Dark | 重度投影（暗色模式） |
| Dark/Shadow/dropdown | 特殊 | Dark | 下拉列表专用（暗色模式） |

> Shadow 具体 CSS 值（blur、spread、offset、color）需通过 Figma 变量面板获取，元数据中不含原始数值。

## 不透明度 Opacity 🚧

> Figma Opacity 页（43869:32903）当前为空（施工中）。

## 动效 Dynamic 🚧

> Figma Dynamic 页（43869:32904）当前为空（施工中）。

## 布局 Token

| Token | Web | App/H5 | 说明 |
|-------|-----|--------|------|
| --sidebar-width | 240px | 不适用 | 侧栏宽度 |
| --panel-width | 280-320px | 全宽 | 交易面板 |
| --panel-gap | 8px | 0 | 面板间距 |
| --header-height | 56-64px | 44px | 顶栏高度 |
| --page-padding | 24px | **24px** | 页面侧边距（旧 App 值 16px 已改） |
| --content-max-width | 1440px | 不适用 | 内容最大宽度 |
| --bottom-bar-height | 不适用 | 99px | App 底部栏（含 HomeIndicator 34px） |

## 系统组件（来自 Figma 43869:42741, 43869:42742）

### Status Bar 系统状态栏

| 属性 | 值 |
|------|-----|
| 高度 | 44px |
| 时间字体 | Urbanist 15px w700 |
| 时间颜色 | #070808 |
| 电池图标 | 24x12px |
| 变体 | Background=On / Off |

### Home Indicator 底部指示器

| 属性 | 值 |
|------|-----|
| 高度 | 34px |
| 指示条尺寸 | 134 x 5px |
| 指示条圆角 | 100px (full) |
| Light 颜色 | #070808 |
| 变体 | Mode=Light / Dark |

## 图标规范（来自 Figma 7131:20611，V6）

- 标准图标：**24x24px**
- TabBar 图标：**20x20px**（面性）
- 其他位置：**基础线性图标**
- 角度：45°，可用 15° 倍数
- 图标总数：485 (基础) + 54 (社交/TabBar) + 150+ (货币/股票)
- 引用方式：`@gate/iconfont`，**禁止使用 emoji**

## 色彩语义体系

> 数据来源: [Gate App 设计系统 V6 — Colors_Token_App Guidelines](https://www.figma.com/design/9HordMtYdfmXOYwExRy1MF/Gate-App-%E8%AE%BE%E8%AE%A1%E7%B3%BB%E7%BB%9F-V6?node-id=49188-5550)
> Last updated: 07/17/2025
>
> 色彩系统基于 Neutral / Brand / Functional / Trade 四大原始色板，通过语义化 Token 映射到组件中，所有 Token 均支持 Light 和 Dark 双主题。

### 一、文字色 (Text)

| Token | Light（亮色模式） | Dark（暗色模式） | 用途说明 |
|-------|-----------------|----------------|---------|
| `Text-Primary` | Neutral/12 | Neutral/White | 标题、主要正文 |
| `Text-Secondary` | Neutral/6 | Neutral/5 | 次要文字 |
| `Text-Tertiary` | Neutral/5 | Neutral/6 | 三级辅助文字 |
| `Text-Disable` | Neutral/4 | Neutral/7 | 禁用态文字 |
| `Text-Tips` | Neutral/4 | Neutral/7 | 辅助说明/提示文字 |
| `Text_Brand_default` | Brand/6 | Brand/5 | 品牌文字，用于 Link、光标、搜索高亮词 |
| `Text_Brand_Pressed` | Brand/7 | Brand/7 | 品牌点击态，用于 Link |
| `Text_Brand_Disable` | Brand/3 | Brand/9 | 品牌禁用态，用于 Link |
| `Always-White` | Neutral/White | Neutral/White | 固定白色（不随主题切换），用于 text |
| `Always-Black` | Neutral/12 | Neutral/12 | 固定黑色（不随主题切换），用于 text |
| `Inverse-Primary` | Neutral/White | Neutral/12 | 主要文字反转色 |
| `Brand-White` | Brand/6 | Neutral/White | 品牌默认色对应 Dark 模式下白色 |
| `Text-Error` | RedFunct/6 | RedFunct/6 | 错误文字色 |
| `Text-Warning` | Orange/6 | Orange/5 | 警告文字色 |
| `Text-Success` | GreenFunct/6 | GreenFunct/6 | 成功文字色 |

### 二、背景色 (Background)

| Token | Light | Dark | 用途说明 |
|-------|-------|------|---------|
| `Primary`（Bg） | Neutral/White | Neutral/12 | 默认页面底层背景 |
| `Secondary`（Bg） | Neutral/1 | Neutral/10 | 主要容器背景 / 次要层级页面背景 / 列表 hover |
| `Tertiary`（Bg） | Neutral/2 | Neutral/9 | 三级容器背景 |
| `Quaternary`（Bg） | Neutral/3 | Neutral/7 | 最弱层级背景，嵌套容器、注释区域 |
| `Mask` | Alpha/Black/50 | Alpha/Black/50 | 弹窗蒙层（`rgba(0,0,0,0.5)`） |
| `Inverse-Primary`（Bg） | Neutral/12 | Neutral/White | 一级背景反转色 / 按钮反转色 |
| `Inverse-Secondary`（Bg） | Neutral/9 | Neutral/1 | 二级背景反转色 |
| `Inverse-Tertiary`（Bg） | Neutral/11 | Neutral/2 | 三级背景反转色 |
| `Always-Black`（Bg） | Neutral/12 | Neutral/12 | 固定黑色背景（不随主题） |
| `Always-White`（Bg） | Neutral/White | Neutral/White | 固定白色背景（不随主题） |

> **Overlay / Layer/Mask:** `background: var(--Bg-Mask, hsba(0, 0%, 0%, 0.5));`

### 三、图层背景色 (Layer)

浮层体系（弹窗、卡片、底部导航）的专属背景 Token：

| Token | Light | Dark | 用途说明 |
|-------|-------|------|---------|
| `Layer/1` | Neutral/White | Neutral/10 | 弹窗、弹出层、筛选面板、底部导航栏 |
| `Layer/2` | Neutral/2 | Neutral/11 | 灰底弹出层、卡片 |
| `Layer/3` | Neutral/White | Neutral/11 | 白底叠加弹出层、卡片 |
| `Layer/4` | Neutral/2 | Neutral/8 | 嵌套弹出层、卡片 |
| `Layer/Active` | Neutral/White | Neutral/7 | Tabs Card 选中态 |
| `card` | Neutral/1-1 | Neutral/11 | 卡片底色 |

### 四、描边与分割线 (Border / Divider)

| Token | Light | Dark | 用途说明 |
|-------|-------|------|---------|
| `Border-Subtle` | Neutral/2 | Neutral/11 | 浅色描边，用于币种图标描边等 |
| `Border-Strong` | Neutral/3 | Neutral/7 | 卡片描边 |
| `Gutter-Gutter` | Neutral/3 | Neutral/11 | 模块间较粗分隔线、步骤条圆点色 |
| `Divider-Divider` | Neutral/2 | Neutral/11 | 分割线默认颜色、长分割线 |
| `Divider-Short Divider` | Neutral/4 | Neutral/7 | 文字间小竖线、短分割线 |
| `Divider-Strong` | Neutral/3 | Neutral/8 | 卡片内分割线 |

### 五、组件功能色 (Component)

| Token | Light | Dark | 用途说明 |
|-------|-------|------|---------|
| `Button-Primary` | Brand/6 | Brand/6 | 一级按钮色 |
| `Button-Active` | Brand/7 | Brand/7 | 一级按钮点击态 |
| `Button-Soft` | Alpha/Black/1 | Alpha/White/1 | 次级按钮底色 |
| `Button-Soft-Active` | Alpha/Black/2 | Alpha/White/2 | 次级按钮点击态 |
| `Button-Soft-Disable` | Alpha/Black/1 | Alpha/White/1 | 按钮禁用态底色（除白色按钮） |
| `Btn-White Dis Bg` | Neutral/8 | Neutral/9 | 白色按钮禁用态底色 |
| `Btn-White Dis Txt` | Neutral/6 | Neutral/6 | 白色按钮禁用态文字 |
| `Btn-White Pressed Txt` | Neutral/5 | Neutral/5 | 白色按钮点击态文字 |
| `Input` | Neutral/1-1 | Neutral/11 | 输入框底色 |
| `Input-Disabled` | Neutral/1-1 | Neutral/9 | 输入框禁用态底色 |
| `Component-Active` | Neutral/8 | Neutral/White | 选中态描边色（快筛、输入框、数字键盘） |
| `Component-Select` | Neutral/1 | Neutral/11 | 选中底色、按压色 |
| `Tooltip&Toast` | Neutral/8 | Neutral/8 | Tooltip 与 Toast 底色 |
| `Notification` | Neutral/White | Neutral/11 | 通知提醒框底色 |
| `User Guide` | Neutral/White | Neutral/8 | 新手引导底色 |
| `Slider-Inactive-line` | Neutral/3 | Neutral/8 | 滑动条未激活轨道底色 |
| `Carousel Bg` | Alpha/Black/10 | Alpha/White/20 | 轮播指示器底色 |
| `Share footer bg` | Neutral/2 | Neutral/2 | 分享页底色 |
| `Checkbox-Dis-Active` | Neutral/3 | Neutral/7 | 复选框选中态禁用底色 |
| `Checkbox-Dis-Inactive` | Neutral/2 | Neutral/9 | 复选框默认态禁用底色 |
| `Switch-Inactive-Dis` | Neutral/1 | Neutral/6 | 开关默认态禁用色 |
| `Switch-Disable` | Neutral/3 | Neutral/11 | 开关禁用态滑块色 |
| `Switch-Disable Bg` | Neutral/5 | Neutral/7 | 开关禁用态底色 |

### 六、功能色背景 (Functional Bg)

| Token | Light | Dark | 用途说明 |
|-------|-------|------|---------|
| `BlueFunct Bg` | Brand/1 | Brand/10 | 蓝色 Tag / Alert 底色，品牌相关或普通提示 |
| `GreenFunct Bg` | GreenFunct/1 | GreenFunct/10 | 绿色 Tag 底色，成功或进行中信息 |
| `Orange Bg` | Orange/1 | Orange/10 | 橙色 Tag / Alert 底色，风险提示或警告 |
| `RedFunct Bg` | RedFunct/1 | RedFunct/10 | 红色 Tag / Alert 底色，风险提示或错误 |
| `Tag-Gray` | Neutral/1-1 | Neutral/11 | 默认灰色 Tag 底色 |
| `Tag-Gray In layer` | Neutral/2 | Neutral/8 | 卡片内灰色 Tag 底色 |
| `Tag-Gray In Secondary` | Neutral/2-1 | Neutral/8 | 二级灰背景上深灰 Tag 底色 |
| `Tag-Bonus` | Promotion/Aqua | Promotion/Aqua | Bonus 标签底色 |

### 七、渐变色 (Gradient)

| Token | Light | Dark | 用途说明 |
|-------|-------|------|---------|
| `Gradient Bg-0%` | Alpha/White/0 | Alpha/Bg/0 | Tabs 蒙层遮罩渐变（起点透明） |
| `Gradient Bg-20%` | Alpha/White/20 | Alpha/Black/10 | Tabs 蒙层渐变过渡 |
| `Gradient Bg-100%` | Neutral/White | Neutral/12 | Tabs 蒙层渐变（终点不透明） |
| `Gradient Inverse Bg-0%` | Alpha/Bg/0 | Alpha/White/0 | 反向 Tabs 渐变 |
| `Gradient Inverse Bg-100%` | Neutral/12 | Neutral/White | 反向 Tabs 渐变终点 |
| `Gradient Popup-0%` | Alpha/White/0 | Alpha/Popup/0 | 弹出层 Tabs 蒙层起点 |
| `Gradient Popup-70%` | Alpha/White/70 | Alpha/Popup/70 | 时间选择器蒙层遮罩渐变 |
| `Gradient Popup-100%` | Neutral/White | Neutral/10 | 弹出层 Tabs 蒙层终点 |
| `Gradient Red-0%` | Alpha/Redtrade/0 | Alpha/Redtrade/0 | 币种单元格图表渐变（红，起点） |
| `Gradient Red-100%` | RedTrade/6 | RedTrade/6 | 币种单元格图表渐变（红，终点） |
| `Gradient Green-0%` | Alpha/Greentrade/0 | Alpha/Greentrade/0 | 币种单元格图表渐变（绿，起点） |
| `Gradient Green-100%` | GreenTrade/6 | GreenTrade/6 | 币种单元格图表渐变（绿，终点） |

### 八、品牌色 (Brand)

| Token | Light | Dark | 用途说明 |
|-------|-------|------|---------|
| `Brand` | Brand/6 | Brand/6 | 品牌默认色 |
| `Brand-Active` | Brand/7 | Brand/7 | 品牌激活色 |
| `Brand-Disabled` | Brand/3 | Brand/10 | 品牌禁用色 |

### 九、交易色 (Trade)

| Token | Light | Dark | 用途说明 |
|-------|-------|------|---------|
| `Trade-Buy` | GreenTrade/6 | GreenTrade/6 | 交易买入色（绿），按钮/文字 |
| `Trade-Sell` | RedTrade/6 | RedTrade/6 | 交易卖出色（红），按钮/文字 |
| `Trade-Buy-Soft` | GreenTrade/1 | GreenTrade/10 | 买入背景色 |
| `Trade-Sell-Soft` | RedTrade/1 | RedTrade/10 | 卖出背景色 |
| `Trade-Buy-Active` | GreenTrade/7 | GreenTrade/7 | 买入按钮激活色 |
| `Trade-Sell-Active` | RedTrade/7 | RedTrade/7 | 卖出按钮激活色 |
| `Trade-Buy-Disabled` | GreenTrade/3 | GreenTrade/8 | 买入按钮禁用色 |
| `Trade-Sell-Disabled` | RedTrade/3 | RedTrade/9 | 卖出按钮禁用色 |

### 十、功能状态色 (Functional Status)

| Token | Light | Dark | 用途说明 |
|-------|-------|------|---------|
| `Success` | GreenFunct/6 | GreenFunct/6 | 成功色（主色） |
| `Success-Active` | GreenFunct/7 | GreenFunct/5 | 成功激活色 |
| `Success-Disabled` | GreenFunct/3 | GreenFunct/8 | 成功禁用色 |
| `Success-Soft` | GreenFunct/1 | GreenFunct/10 | 成功背景色 |
| `Hot` | RedFunct/6 | RedFunct/6 | 火图标颜色（热门标识） |
| `Star` | Yellow/6 | Yellow/6 | 星星图标颜色 |

### 十一、特殊/营销色

| Token | Light | Dark | 用途说明 |
|-------|-------|------|---------|
| `VIP-Bg` | VIPFunct/1 | VIPFunct/7 | VIP 属性标签背景色 |
| `VIP-Text` | Neutral/12 | VIPFunct/5 | VIP 属性标签文字色 |
| `Reward-Text` | Promotion/Pumpkin | Promotion/Pumpkin | 增长业务福利文字色 |
| `Reward-Bg` | Alpha/Promotion/Pumpkin | Alpha/Promotion/Pumpkin | 增长业务福利背景色 |
| `Tag-Primary`（Promotion） | Promotion/Green | Promotion/Green | 营销属性绿色标签 |

### 十二、图表色 (Chart)

图表色与主题无关（Light / Dark 相同），保持视觉一致性：

| Token | 色板值 | 用途说明 |
|-------|-------|---------|
| `Chart-1` | RedTrade/5 | 红色涨跌（热力图、环形图、饼图） |
| `Chart-2` | RedTrade/3 | 红色涨跌背景 |
| `Chart-3` | GreenTrade/5 | 绿色涨跌 |
| `Chart-4` | GreenTrade/3 | 绿色涨跌背景 |
| `Chart-5` | Brand/6（L）/ Brand/5（D） | 品牌色，单维度图表主体色 |
| `Chart-6` | Promotion/Blue | 辅助对比色，多维度图表 |
| `Chart-7` | Neutral/12（L）/ Neutral/White（D） | 强对比色，大量红绿或蓝色柱状图场景 |
| `Chart-8` | Neutral/3（L）/ Neutral/8（D） | 最低层级图例色 |
| `Chart-9` | Yellow/6 | 黄色图表色，视情况选用 |
