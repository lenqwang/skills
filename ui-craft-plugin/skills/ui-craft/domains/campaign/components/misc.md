---
scope: [campaign, exchange, web3pay]
layer: L2
---
# 其他基础组件

> Tab、Countdown 等小型组件规格，以及 Exchange/Web3Pay 低频组件。

---

## 活动倒计时 (Countdown)

| 部位 | 规格 |
|------|------|
| 数字块 | `min-width: 32px`，`height: 36px`，`bg: surface.countdown.item`，`radius: 8px` |
| 字体 | `fontSize.md`，`fontWeight.bold`，`fontFamily.mono` |

## 活动页 Tab

- **高度**：44px
- **文字**：激活态映射品牌蓝
- **指示器**：底部 2px 条

---

## Select 下拉选择

> Token: `DropdownV5-web` · `Select_V5` · `Dropdown Text_V5`
> Figma: [Web](https://www.figma.com/design/kQIx9xKLiyO6KZIbazNSM2/?node-id=7844-24475) · [H5](https://www.figma.com/design/kQIx9xKLiyO6KZIbazNSM2/?node-id=7885-47031)

带触发器的下拉菜单，点击后展开选项列表供用户选取。

| 档位 | Web 触发器高度 | H5 尺寸 |
|------|-------------|---------|
| XS | 24 px | — |
| SM | 28 px | 100 × 28 px |
| MD-S | 32 px | — |
| MD | 40 px（默认） | 240 × 40 px |
| LG | 48 px | 480 × 48 px |

- 文字链触发器（无背景边框）：XS 16px / SM 20px / MD 24px / LG 28px
- 状态：Normal / Hover / Focused / Selected / Disabled / Loading

---

## Slider 滑动条

> Token: `SliderV5-web` · `SliderV5-H5`
> 类型：Default / With Mark / With Tooltip / Disabled（仅 Web）

| 档位 | Default | With Mark | With Tooltip |
|------|---------|-----------|-------------|
| Web 5 步 | 200 × 12 px | 240 × 30 px | 240 × 32 px |
| Web 3 步 | 195 × 12 px | 195 × 30 px | 195 × 32 px |
| H5 5 步 | 200 × 12 px | 240 × 27 px | 240 × 32 px |
| H5 3 步 | 195 × 12 px | 195 × 27 px | 195 × 32 px |

- 节点状态：Process（高亮） / Wait（未激活） / Finish（已完成）
- 预设位置：0% / 25% / 50% / 75% / 100%

---

## Time Picker 时间选择器

> Token: `Time Picker InputV5-web` · `Time PickerV5-web` · `TimePickerV5-H5`

| 平台 | 触发输入框 | 下拉面板 |
|------|-----------|---------|
| Web | 242 × 40 px | 528 × 388 px（Error: 528 × 432 px） |
| H5 | — | 375 × 812 px（全屏 Popup） |

- 状态：Default / Selected start / Selected end / Error
- 触发：点击日历图标 或 Date 文字按钮
- H5 使用底部 Popup，含 3 列 Picker 滚轮（每列约 114 px）
- 本地化：中文单独适配，阿语 RTL 镜像，其他语言用英语

---

## Upload 上传

> Token: `Upload Image V5-web` · `Upload File V5-web` · `Upload File V5-H5`

| 类型 | Web 尺寸 | H5 尺寸 |
|------|---------|---------|
| 图片缩略图 | 104 × 104 px | 104 × 104 px |
| 文件上传区 | 720 × 192 px | 343 × 160 px |
| 文件列表项 | 248 × 28 px | — |

- 删除按钮：16 × 16 px，缩略图左上角
- 支持文件类型：PDF / TXT / MP3 / MP4
- 生命周期：空态 → Hover → 上传中 → 成功 → 删除确认 → Error

---

## Download QR Code 下载二维码

> Token: `Download`

| 类型 | 尺寸 |
|------|------|
| 标准竖版卡片 | 240 × 285 px |
| 宽幅横版卡片 | 394 × 180 px |

- 内部结构（竖版）：QR Code 图片 140 × 140 px 居中，CTA 按钮 202 × 36 px
- 主标题最多 1 行，副标题最多 2 行，小语种允许省略截断
- 变体：默认居中 / 多卡片横排 / 应用内 Banner / 弹窗嵌入

---

## Avatar 头像

> Token: `GTAvatarV5` · `AvatarV5 64px-H5`
> Figma: [H5](https://www.figma.com/design/kQIx9xKLiyO6KZIbazNSM2/?node-id=8802-21049)

| 尺寸 | 像素 | 场景 |
|------|------|------|
| 64 px | 64 × 64 | 个人资料页 |
| 36 px | 36 × 36 | 列表 |
| 24 px | 24 × 24 | 行内 |
| 20 px | 20 × 20 | 紧凑场景 |

- 支持图片、文字首字母、默认占位三种形态

---

## Carousel 轮播指示点

> Token: `CarouselV5-web`
> Figma: [H5](https://www.figma.com/design/kQIx9xKLiyO6KZIbazNSM2/?node-id=8238-6937)

| 元素 | 尺寸 |
|------|------|
| 默认指示点组（3-4 个） | 60 × 4 px |
| 扩展指示点组 | 96 × 4 px |
| 单个指示点高度 | 4 px，宽可变（激活项更宽） |

- 最少 2 个指示点，Web 与 H5 规格一致

---

## Image 图片

> Token: `ImageV5-web`
> Figma: [H5](https://www.figma.com/design/kQIx9xKLiyO6KZIbazNSM2/?node-id=8209-27755)

| 宽高比 | 尺寸 | 适用场景 |
|--------|------|---------|
| 1:1 | 441 × 441 px | 头像、NFT 缩略图 |
| 3:1 | 441 × 147 px | 活动横幅 |
| 16:9 | 441 × 248 px | 视频/文章封面 |
| 3:4 | 343 × 457 px | 分享卡片 |

- 含加载中/失败占位样式，Web 与 H5 规格一致

---

## Description 描述列表

> Token: `DescriptionV5-H5`
> Figma: [Web](https://www.figma.com/design/kQIx9xKLiyO6KZIbazNSM2/?node-id=8749-29247)

| 规格 | 行高 | 字号 | 容器宽度 |
|------|------|------|---------|
| Medium | 18 px | 14 px | 343 px |
| Small | 16 px | 12 px | 343 px |
| Compact | 13 px | 12 px | 160 px |

- 布局原则：左轻右重（Label 浅色，Value 深色），不加边框

---

## Share 分享

> Token: `ShareV5-Web` 及子组件
> Figma: [Web](https://www.figma.com/design/kQIx9xKLiyO6KZIbazNSM2/?node-id=10732-373712)

| 变体 | Modal 尺寸 |
|------|-----------|
| 标准 | 799 × 577 px |
| 带轮播 | 799 × 593 px |

- 内部：图片区 343 × 457 px（左） + 输入区 360 × 457 px（右） + Footer 343 × 66 px
- 分享渠道图标 21 种，每个 item 63 × 56 px
- 变体：已登录 / 未登录 / 带快筛 / 带轮播

---

## Anchor 锚点导航

> Token: `AnchorV5-web`
> Figma: [Web](https://www.figma.com/design/kQIx9xKLiyO6KZIbazNSM2/?node-id=10901-376553)

用于长页面内快速跳转到指定位置。每个锚点项 384 × 42 px。

- 层级类型：Primary / Secondary / Thirty
- 主题：Brand（品牌色） / Default（中性色）
- 状态：Inactive / Hover / Active

---

## Breadcrumbs 面包屑

> Token: `BreadcrumbV5-web` · `BreadcrumbV5-H5`
> Figma: [Web/H5](https://www.figma.com/design/kQIx9xKLiyO6KZIbazNSM2/?node-id=7612-256009)

| 平台 | 高度 | 容器宽度 |
|------|------|---------|
| Web | 21 px | 内容自适应 |
| H5 | 18 px | 343 px（可左右滑动） |

- Web 超过 5 级时省略中间层显示 `...`
- H5 超过 5 级时点击 `...` 弹出 Popup 层选择

---

## Header / Footer 头部与底部

> Token: `Header+Footer`（Web） · `Header+Footer_V5`（H5）
> Figma: [Web](https://www.figma.com/design/kQIx9xKLiyO6KZIbazNSM2/?node-id=7845-6860) · [H5](https://www.figma.com/design/kQIx9xKLiyO6KZIbazNSM2/?node-id=7863-13365)

| 区域 | Web | H5 |
|------|-----|-----|
| Header 高度 | 48 px | 48 px |
| Footer 高度 | 822 px | 528 px |
| Header 宽度 | 1920 px | 375 px |

- H5 文案最多 2 行，超出必须精简
- 支持 Light / Dark 双色彩模式

---

## LeftMenu 左侧导航

> Token: `LeftMenuV5-web`
> Figma: [Web](https://www.figma.com/design/kQIx9xKLiyO6KZIbazNSM2/?node-id=8843-17663)

Web 端左侧导航 Sidebar，固定宽度 288 px，菜单项 288 × 56 px。

- 支持多级嵌套（Level 1 / 2 / 3），各级通过缩进区分
- 分组间使用分割线分隔
- 状态：Default / Hover / Active / Collapsed / Expanded / Disabled

---

## Steps 步骤条

> Token: `GTStepsV5 Horizontal` · `StepsVerticalV5-web`
> Figma: [Web](https://www.figma.com/design/kQIx9xKLiyO6KZIbazNSM2/?node-id=7863-27073) · [H5](https://www.figma.com/design/kQIx9xKLiyO6KZIbazNSM2/?node-id=7903-13255)

| 类型 | 尺寸 | 说明 |
|------|------|------|
| Horizontal | 343 × 3 px | 顶部细线式进度轨道 |
| Vertical | 343 × 69 px | 含图标 + 标题 + 副标题 |
| Vertical Display | 343 × 68 px | 紧凑型展示 |

- 状态：Process / Wait / Success / Error / Full Display
- 标题建议尽显不截断，副标题最多 5 行
- Horizontal 常用于表单顶部（KYC、开户），Vertical 用于订单状态追踪
