# Figma 设计真值表

> 从 Gate App V6 (9HordMtYdfmXOYwExRy1MF) 通过 REST API 提取的真实设计属性。
> 提取日期: 2026-03-13
> 所有值均来自 Figma 节点属性，非人工估算。

---

## 颜色系统（Color 5:5）

### 品牌蓝

| 级别 | 色值 | Figma 节点 |
|------|------|-----------|
| Primary | #0055FF | Frame 2147232620 |
| Bright | #2977FF | Frame 1960813105 |
| Hover | #004FD9 | — |
| Active/Dark-1 | #0041D9 | Frame 2147232621 |
| Dark-2 | #0048D9 | Frame 2147232626 |
| Dark-3 | #0030B3 | Frame 2147232622 |
| Dark-4 | #003CB3 | Frame 2147232627 |
| Dark-5 | #00218C | Frame 2147232623 |
| Dark-6 | #002E8C | Frame 2147232628 |
| Dark-7 | #001466 | Frame 2147232624 |
| Dark-8 | #002266 | Frame 2147232629 |
| Light-1 | #5297FF | Frame 1960813111 |
| Light-2 | #7AB4FF | Frame 1960813112 |
| Neutral-1 | #E6F2FF | Neutral-1 |
| Neutral-2 | #A3CEFF | Neutral-1 |

### 功能色（Button 34:137 提取）

| 色值 | 用途 | Figma 实例 |
|------|------|-----------|
| #0055FF | Primary / 品牌蓝 | GTButton primary |
| #2BC287 | Green / 涨 / Buy / Copy | GTButton green |
| #F74B60 | Red / 跌 / Sell | GTButton red |
| #004FD9 | Dark Blue / hover | GTButton dark-blue |
| #20A174 | Dark Green / hover | GTButton dark-green |
| #D6364E | Dark Red / hover | GTButton dark-red |
| #FFFFFF (10%) | Ghost / 次级按钮（深色底） | GTButton ghost |
| #FFFFFF (30%) | Ghost-Light | GTButton ghost-light |

### 中性色

| 色值 | 用途 | 来源 |
|------|------|------|
| #070808 | Text Primary / 文字主色 | Button 页面背景、Tabbar active text |
| #484B51 | Text Secondary / 文字二级 | Selector option text |
| #84888C | Text Tertiary / 文字次色 / Inactive | Tabbar inactive text |
| #17224B (8%) | Border / 分割线 | Navbar line |
| #E7E9EE | Border Secondary / 卡片边框 | Tab card border |
| #F5F6F7 | Bg Secondary / 选项背景 | Tab option bg、Selector bg、ModeSwitcher bg |
| #FFFFFF | Bg Primary / 主背景 | Page bg |
| #F2F3F4 | Bg Tertiary / 面板背景 | GTNavbar component-set bg |

## 按钮尺寸体系（Button 34:137）

| 尺寸名 | 高度 | 水平 Padding | 示例宽度 |
|--------|------|-------------|---------|
| XL | 52px | 32-40px | 83-99px |
| L | 44px | 24-40px | 67-99px |
| M | 36px | 16-32px | 48-80px |
| S | 32px | 12-24px | 38-62px |
| XS | 28px | 12-20px | 38-80px |
| Mini | 24px | 8-16px | 33-46px |

所有按钮：`border-radius: 999px`（全胶囊形）

## 字体系统（Font 5:6 深层提取）

### 字体族

| 字体 | 用途 | 说明 |
|------|------|------|
| **Gate Switzer** | 主 UI 字体（英文、数字、标签、标题） | App 内嵌字体 |
| **PingFang SC** | 中文正文/中文标题 | 系统字体 |

> 设计规范：中文用 PingFang SC，英文和数字用 Gate Switzer，开发端需内嵌 Gate Switzer 字体包。

### 完整字阶（Gate Switzer）— 行高比 1.32x

> **关键发现**：行高统一为 `fontSize × 1.32`，而非常见的 1.5x。
> 命名规则：d=Display, h=Heading, s=Subtitle, bs=BodySingle, bm=BodyMultiple, c=Caption

#### Display 级别

| Token | 字号 | 字重 | 行高 | 用途 |
|-------|------|------|------|------|
| d1_bold | 88px | 600 | 116.2px | 超大数字（PingFang SC 用于中文） |
| d1_regular | 88px | 400 | 116.2px | — |
| d2 | 64px | 600/400 | 84.5px | Display 标题 |
| d3_bold | 40px | 600 | 52.8px | 大数字展示 |
| d4 | 32px | 600/400 | 42.2px | — |

#### Heading 级别

| Token | 字号 | 字重 | 行高 | 用途 |
|-------|------|------|------|------|
| h2 | 28px | 600/400 | 37.0px | 页面主标题 |
| h3 | 24px | 600/400 | 31.7px | 区块标题 |
| h3-1 | 20px | 600/400 | 26.4px | 子标题 |
| h4 | 18px | 600/400 | 23.8px | 小标题 |

#### Subtitle 级别

| Token | 字号 | 字重 | 行高 | 用途 |
|-------|------|------|------|------|
| s3 | 16px | 600/400 | 21.1px | 卡片标题 |
| s4 | 14px | 600/400 | 18.5px | 列表标题 |
| s5 | 12px | 600/400 | 15.8px | 小标签 |

#### Body 级别（w500 中等字重）

| Token | 字号 | 字重 | 行高 | 用途 |
|-------|------|------|------|------|
| bm0 | 20px | 500 | 30.0px | 正文大（多行，lh:1.5x） |
| bm0-1 | 18px | 500 | 27.0px | 正文中（多行，lh:1.5x） |
| bs1 | 14px | 500 | 18.5px | 正文默认（单行） |
| bs1-1 | 15px | 500/400 | 19.8px | 正文（过渡尺寸） |
| bs3 | 12px | 500 | 15.8px | 正文小 |

> Body 多行（bm）行高为 1.5x，单行（bs）行高为 1.32x。

#### Caption 级别

| Token | 字号 | 字重 | 行高 | 用途 |
|-------|------|------|------|------|
| c2 | 11px | 500/400 | 14.5px | 辅助文字 |
| c3 | 10px | 500/400 | 13.2px | 最小文字（Tabbar label） |

### 与 semantic.md 对照修正

| 我们的旧定义 | 旧行高 | Figma 真值行高 | 偏差 |
|-------------|--------|--------------|------|
| H1 24px | 36px | **31.7px** | -4.3px |
| H2 20px | 30px | **26.4px** | -3.6px |
| H3 16px | 24px | **21.1px** | -2.9px |
| Body 14px | 21px | **18.5px** | -2.5px |
| Caption 12px | 18px | **15.8px** | -2.2px |
| Mini 10px | 15px | **13.2px** | -1.8px |

> **结论**：所有行高都偏大了 ~20%，因为旧值用了 1.5x 比例，Figma 真值是 1.32x。

---

## 间距体系（Spacing 204:15531）

### 基准规则

- 通用 4 的倍数
- 小颗粒度下可使用 2px 或 0px
- 减小间距可扩大点击热区范围

### 使用规范

| 场景 | 间距 |
|------|------|
| 模块大尺寸间距 | 24 / 32 / 40 / 48px |
| 页面侧边距（margin） | **24px**（旧值 16px 已改为 24px） |
| 标题与内容间距 | 16px |
| 卡片内边距（padding） | 8 / 16px |
| 卡片与卡片间距 | 8 / 12px |
| 模块内间距 | 12 / 16px |
| 弹窗内模块间距 | 40px |
| 弹窗标题与内容间距 | 16px |
| 页面距最底部留白 | 40px |
| 弹窗距最底部留白 | 24px |
| 快筛垂直/水平间距 | 8 / 16px |
| 数值显示间距 | 0px |
| 币种单元格间距 | 2px |

### Spacing Token 列表

| Token | 值 |
|-------|-----|
| Spacing-2 | 2px |
| Spacing-4 | 4px |
| Spacing-6 | 6px |
| Spacing-8 | 8px |
| Spacing-12 | 12px |
| Spacing-16 | 16px |
| Spacing-20 | 20px |
| Spacing-24 | 24px |
| Spacing-32 | 32px |
| Spacing-48 | 48px |

---

## 圆角体系（Radius 22307:47883）

> 最后更新：2025-05-29，增加了 Xlarge【16】

### Radius Token（最新版，含 Xlarge）

| Token | 值 | 用途 |
|-------|------|------|
| none | 0px | Alert、Popup/header、Share/footer |
| xsmall | 2px | 标签圆角：Tabs Card/item 24px、Tag、Tag Primary |
| small | 4px | 小尺寸按钮/快筛圆角：Selector、Tabs Card、Tabs buy sell_ |
| default | 6px | 默认圆角（高度 40px 组件）：Selector、Reminder、Tooltips、Stepper |
| medium | 8px | 中等圆角：Dialog、Notification、PopMenu、Toast、NumberInput、Share/footer |
| large | 12px | 大圆角（弹窗/新手引导）：Dialog、Userguide |
| Xlarge | 16px | 大圆角（Popup header）：Popup/header |
| full | 999px | 全圆角（胶囊按钮/头像/徽标）：Button、Switch、Badge |

---

## 投影 Shadow（43869:32902）🚧

> 页面为空（施工中），尚无设计 Token 定义。
> 临时方案：使用 domains/_platform/semantic.md 中的阴影体系。

## 不透明度 Opacity（43869:32903）🚧

> 页面为空（施工中），尚无设计 Token 定义。

## 动效 Dynamic（43869:32904）🚧

> 页面为空（施工中），尚无动效规范。

---

## 系统组件（System Components）

### Status Bar 系统状态栏（43869:42741）

```
组件名: Status Bar
变体: Background=On / Background=Off
尺寸: 375 x 44px
时间字体: Urbanist 15px w700
时间颜色: #070808
电池图标: 24x12px（含信号、WiFi、电量）
```

### Home Indicator 底部指示器（43869:42742）

```
组件名: HomeIndicator
变体: Mode=Light / Mode=Dark
尺寸: 375 x 34px
指示条: 134 x 5px
指示条圆角: 100px (full)
Light 模式颜色: #070808
Dark 模式颜色: #FFFFFF（推测）
```

---

## 图标体系 Icon V6（7131:20611）

> 最后更新：2025-04-11

### 设计原则

- 标准图标尺寸：**24 x 24 px (dp)**
- 角度：一般使用 45°，也可使用 15° 倍数
- Tabbar 使用**面性图标**，其他位置使用**基础线性图标**
- 图标命名格式：`icon_{name}`

### 图标数量统计

| 分类 | 数量 | 说明 |
|------|------|------|
| 基础图标 (icon) | 485 | 主图标集，线性为主 |
| 业务专属 (BusinessSpecific) | 6 | — |
| 社交媒体 & TabBar (SocialMedia&TabBar) | 54 | 含面性 TabBar 图标 |
| 货币图标 (Currency Icons) | 48+ 外汇 + 21 指数 + 85 股票 + 2 商品 | 币种/股票/商品图标 |

### 图标尺寸规格

| 用途 | 尺寸 | 说明 |
|------|------|------|
| 标准 UI 图标 | 24x24px | 绝大部分场景 |
| TabBar 图标 | 20x20px | 底部导航 |
| 小图标 | 16x16px | 标签内/紧凑场景 |

> 图标资源通过 `@gate/iconfont` 引用，不使用 emoji。

---

## 基础组件库（深度解析）

> 从 Gate App V6 Figma 逐层提取，每个组件展开到子元素级别。
> 属性格式: bg=背景色 | r=圆角 | pad=内边距 | gap=间距 | shadow=阴影
> 提取日期: 2026-03-14

### 全局通用

#### Button 按钮 (34:137)

**GTButtonText** (24 变体)

- Arrow: no, yes
- Color: Black, Blue, Gray
- Type: button text, text link
- Underline: Dash, Solid, no

代表变体: `Type=button text, Color=Black, Underline=no, Arrow=yes, Arabic=false`

```
Type=button text, Color=Black, Underline=no, Arrow=yes, Arabic=false → 115x18 | gap:2 | layout:HORIZONTAL
  TEXT 'Button Text link' → Gate Switzer 14.0px w500 lh:18.5 #070808
  icon_chevron_right_small → 16x16
    union → 5x10 | bg:#070808
```

对比变体: `Type=button text, Color=Gray, Underline=no, Arrow=yes, Arabic=false`
```
Type=button text, Color=Gray, Underline=no, Arrow=yes, Arabic=false → 115x18 | gap:2 | layout:HORIZONTAL
  TEXT 'Button Text link' → Gate Switzer 14.0px w500 lh:18.5 #a0a3a7
  icon_chevron_right_small → 16x16
    union → 5x10 | bg:#a0a3a7
```

**GTFooterButton** (36 变体)

- Agreement: False, True
- Divider: False, True
- Type: Default Btn, Horizontal Btn, Long Btn, Long Btn+icon, Vertical Btn, Vertical Btn 2, Vertical Btn+Text, Vertical Text, Vertical Text+Desc

代表变体: `Type=Default Btn, Agreement=False, Divider=False`

```
Type=Default Btn, Agreement=False, Divider=False → 375x76 | pad:16/20 | layout:HORIZONTAL
  GTButton → 335x44 | bg:#0055ff | r:999 | pad:0/24 | layout:HORIZONTAL
    TEXT 'Button' → Gate Switzer 16.0px w600 lh:21.1 #ffffff
```

**GTButton** (384 变体)

- Only Icon: False, True
- Prefix Icon: False, True
- Size: Large, Small, XLarge, XSmall, XSmall-Plus, XXSmall
- State: Default, Disable, Loading, Pressed
- Suffix Icon: False, True
- Type: Green, Primary, Red, Secondary

代表变体: `Type=Primary, State=Default, Size=XLarge, Prefix Icon=False, Suffix Icon=False, Only Icon=False`

```
Type=Primary, State=Default, Size=XLarge, Prefix Icon=False, Suffix Icon=False, Only Icon=False → 113x52 | bg:#0055ff | r:999 | pad:0/32 | layout:HORIZONTAL
  TEXT 'Button' → Gate Switzer 16.0px w600 lh:21.1 #ffffff
```

对比变体: `Type=Secondary, State=Default, Size=XLarge, Prefix Icon=False, Suffix Icon=False, Only Icon=False`
```
Type=Secondary, State=Default, Size=XLarge, Prefix Icon=False, Suffix Icon=False, Only Icon=False → 113x52 | bg:#000000 | r:999 | pad:0/32 | layout:HORIZONTAL
  TEXT 'Button' → Gate Switzer 16.0px w600 lh:21.1 #070808
```

#### Selector 快筛&选项框 (58:667)

**GTSelector** (108 变体)

- Layout: Equal Width, Hug
- Prefix icon: False, True
- Size: Medium, Small, XSmall
- Status: Disable, Multi Selected, Normal, Single Selected
- Type: Only Coin, Outlined

代表变体: `Type=Outlined, Status=Normal, Size=Medium, Layout=Hug, Prefix icon=False, Arabic=false`

```
Type=Outlined, Status=Normal, Size=Medium, Layout=Hug, Prefix icon=False, Arabic=false → 67x40 | bg:#f5f6f7 | r:6 | pad:11/12 | layout:HORIZONTAL
  TEXT 'Option' → Gate Switzer 14.0px w500 lh:18.5 #070808
```

对比变体: `Type=Outlined, Status=Disable, Size=Medium, Layout=Hug, Prefix icon=False, Arabic=false`
```
Type=Outlined, Status=Disable, Size=Medium, Layout=Hug, Prefix icon=False, Arabic=false → 67x40 | bg:#f5f6f7 | r:6 | pad:11/12 | layout:HORIZONTAL
  TEXT 'Option' → Gate Switzer 14.0px w500 lh:18.5 #c4c7ca
```

**GTSelector Des** (8 变体)

- Status: Inactive, Multi Selected, Single Selected, disable

代表变体: `Status=Inactive, Arabic=false`

```
Status=Inactive, Arabic=false → 103x71 | bg:#f5f6f7 | r:6 | pad:16/20 | gap:6 | layout:HORIZONTAL
  option → 63x39 | gap:2 | layout:VERTICAL
    TEXT 'Option' → Gate Switzer 16.0px w600 lh:21.1 #070808
    TEXT 'Description' → Gate Switzer 12.0px w400 lh:15.8 #a0a3a7
```

**GTSelector Buy Sell-32px** (8 变体)

- Buy\Sell: Buy, Sell
- Layout: Equal Width, Hug
- On All Web3: True
- Status: Active, Inactive

代表变体: `Status=Active, Layout=Hug, Buy\Sell=Buy, On All Web3=True`

```
Status=Active, Layout=Hug, Buy\Sell=Buy, On All Web3=True → 108x32 | bg:#f5f6f7 | border:1.0px #303236 | r:6 | pad:0/12 | gap:8 | layout:HORIZONTAL
  TEXT 'Buy' → Gate Switzer 14.0px w500 lh:18.5 #00ba7c
  Line 337 → border:1.0px #c4c7ca
  TEXT 'Option' → Gate Switzer 14.0px w500 lh:18.5 #070808
```

#### Checkbox 单/复选 (69:7228)

**GTCheckbox** (48 变体)

- Type: Checkbox, Half Select, Radio
- Label Size: large, small
- Status: Active, Inactive
- Disable: False, True

代表变体: `Type=Checkbox, Label Size=small, Status=Active, Disable=False, Arabic=false`

```
Type=Checkbox, Label Size=small, Status=Active, Disable=False, Arabic=false → 46x16 | gap:4
  icon → 12x16
    GTCheckbox/item-12px → 12x12
  GTCheckboxV5/label-12px → 30x16
    TEXT 'Label' → Gate Switzer 12.0px w400 lh:15.8 #070808
```

**GTCheckbox/item-12px** (12 变体)

- Type: Checkbox, Half Select, Radio
- Status: Active, Inactive
- Disable: False, True

代表变体: `Type=Checkbox, Status=Active, Disable=False`

```
Type=Checkbox, Status=Active, Disable=False → 12x12
  icon_checkbox_active → 12x12
```

**GTCheckbox/item-16px** (12 变体)

- Type: Checkbox, Half Select, Radio
- Status: Active, Inactive
- Disable: False, True

代表变体: `Type=Checkbox, Status=Active, Disable=False`

```
Type=Checkbox, Status=Active, Disable=False → 16x16
  icon_checkbox_active → 16x16
```

**GTCheckboxV5/label-14px** (3 变体)

- Dash: False, True
- Solid: False, True

代表变体: `Dash=False, Solid=False`

```
Dash=False, Solid=False → 35x18
  TEXT 'Label' → Gate Switzer 14.0px w400 lh:18.5 #070808
```

**GTCheckboxV5/label-12px** (3 变体)

- Dash: False, True
- Solid: False, True

代表变体: `Dash=False, Solid=False`

```
Dash=False, Solid=False → 30x16
  TEXT 'Label' → Gate Switzer 12.0px w400 lh:15.8 #070808
```

#### Switch 开关 (57:2118)

**GTSwitch** (24 变体)

- Size: Large, Medium
- Status: Active, Inactive
- Disabled: False, True
- Loading: False, True

代表变体: `Size=Large, Status=Active, Disabled=False, Loading=False, Arabic=false`

```
Size=Large, Status=Active, Disabled=False, Loading=False, Arabic=false → 40x24 | bg:#303236 | r:999 | pad:T2/R2/B2/L18
  button → 20x20 | bg:#ffffff | r:999 | shadow:(0,0) blur:4 #040919 (15%)
```

#### Loading 加载 (755:68782)

**Loading 下拉刷新** (3 变体)

- Property 1: Default, Variant2, Variant3

代表变体: `Property 1=Default`

```
Property 1=Default → 24x24
  绿 → 10x10 | bg:#a7f757
  蓝 → 14x14 | bg:#387cf2
```

#### Line 分割线 (34:138)

**Divider** (2 变体)

- Type: Divider, Vertical line

代表变体: `Type=Divider`

```
Type=Divider → 335x1
  Line 337 → 335x0 | border:0.5px #f2f3f4
```

### 导航

#### Navbar 顶部导航 (320:8644)

**GTNavbar** (54 变体)

- Style: Coin+Chain+Title, Coin+Title, Dropdown, Left Title, Searchbar, Tabs, Tabs Card, Title
- Suffix: Avatar, Button, Icon 1, Icon 2, Icon 3, Icon+dropdown, None, Text
- Type: Primary, Return

代表变体: `Type=Return, Style=Tabs Card, Suffix=Icon 2, Arabic=false`

```
Type=Return, Style=Tabs Card, Suffix=Icon 2, Arabic=false → 375x44 | bg:#ffffff | pad:0/20 | gap:16 | layout:HORIZONTAL
  prefix → 56x20 | gap:10 | layout:HORIZONTAL
    icon → 20x20 | gap:10 | layout:HORIZONTAL
      icon_left_aligned_arrow → 20x20
        union → 8x15 | bg:#070808
  tabs card → 191x32 | gap:10 | layout:VERTICAL
    GTTabs Card → 130x32 | bg:#f5f6f7 | r:999 | pad:2 | layout:HORIZONTAL
      _GTTabs Card/item 32px → 63x28 | bg:#ffffff | r:999 | pad:0/16 | layout:VERTICAL
        TEXT 'Tabs' → Gate Switzer 14.0px w500 lh:18.5 #070808
      _GTTabs Card/item 32px → 63x28 | r:999 | pad:0/16 | layout:VERTICAL
        TEXT 'Tabs' → Gate Switzer 14.0px w500 lh:18.5 #84888c
  suffix icon → 56x20 | gap:16 | layout:HORIZONTAL
    icon → 20x20 | gap:10 | layout:HORIZONTAL
      icon_search → 20x20
        union → 16x16 | bg:#070808
    icon → 20x20 | gap:10 | layout:HORIZONTAL
      icon_more_horizontal → 20x20
        union → 18x2 | bg:#070808
```

对比变体: `Type=Primary, Style=Tabs Card, Suffix=Icon 2, Arabic=false`
```
Type=Primary, Style=Tabs Card, Suffix=Icon 2, Arabic=false → 375x44 | bg:#ffffff | pad:0/20 | gap:16 | layout:HORIZONTAL
  avatar → 86x28 | gap:10 | layout:HORIZONTAL
    _GTNavbarV5/prefix icon → 28x28 | layout:HORIZONTAL
      _Avatar → 28x28 | r:100
  GTTabs Card → 130x32 | bg:#f5f6f7 | r:999 | pad:2 | layout:HORIZONTAL
    _GTTabs Card/item 32px → 63x28 | bg:#ffffff | r:999 | pad:0/16 | layout:VERTICAL
      TEXT 'Tabs' → Gate Switzer 14.0px w500 lh:18.5 #070808
    _GTTabs Card/item 32px → 63x28 | r:999 | pad:0/16 | layout:VERTICAL
      TEXT 'Tabs' → Gate Switzer 14.0px w500 lh:18.5 #84888c
  suffix icon → 86x20 | gap:16 | layout:HORIZONTAL
    icon → 20x20 | gap:10 | layout:HORIZONTAL
      icon_search → 20x20
    icon → 20x20 | gap:10 | layout:HORIZONTAL
      icon_more_horizontal → 20x20
```

#### Tabbar 底部导航 (190:12224)

**GTTabbar** (28 变体)

- Active: Item 1, Item 2, Item 3, Item 4, Item 5
- Type: 4, 5, Overall

代表变体: `Type=Overall, Active=Item 1, Arabic=false`

```
Type=Overall, Active=Item 1, Arabic=false → 375x99
  Rectangle 376727811 → 375x83 | bg:#ffffff | shadow:(0,-2) blur:6 #313339 (4%)
  HomeIndicator → 375x34
  tabs → 375x63 | layout:HORIZONTAL
```

<details><summary>内部子组件 (1 个)</summary>

**_GTTabbar/item** (32 变体)
```
Status=Active, Item=Home, Arabic=false → 69x35 | gap:2 | layout:VERTICAL
  icon_tabbar_home → 20x20
  TEXT 'Home' → Gate Switzer 10.0px w500 lh:13.2 #070808
```

</details>

#### Tab 标签栏 (205:16288)

**GTTabs** (5 变体)

- type: Page, cap-subtitle, cap-subtitle-small, subtitle, subtitle-small

代表变体: `type=cap-subtitle-small`

```
type=cap-subtitle-small → 375x40 | bg:#ffffff | layout:VERTICAL
  tabs → 375x40 | layout:HORIZONTAL
    list → 375x32 | pad:T4/R0/B4/L20 | gap:4 | layout:HORIZONTAL
    GTTabs/cap sutittle small → 68x36 | layout:HORIZONTAL
```

对比变体: `type=subtitle-small`
```
type=subtitle-small → 375x40 | bg:#ffffff | layout:VERTICAL
  tabs → 375x40 | pad:T0/R0/B0/L20 | layout:HORIZONTAL
    list → 355x40 | gap:16 | layout:HORIZONTAL
    GTTabs/sutittle small → 68x38 | layout:HORIZONTAL
```

**option (胶囊式)** (4 变体)

- size: m, s
- type: select, unselected

代表变体: `type=select, size=m`

```
type=select, size=m → 81x36 | bg:#f5f6f7 | r:100 | pad:8/12 | gap:2 | layout:HORIZONTAL | backdrop-blur:30
  Frame 1 → 57x20 | layout:HORIZONTAL
```

**GTTabs (下划线式)** (6 变体)

- size: L, M, S
- type: select, unselected

代表变体: `type=select, size=L`

```
type=select, size=L → 61x44 | r:1 | gap:2 | layout:HORIZONTAL
  tabs → 61x44 | gap:2 | layout:HORIZONTAL
```

**GTTabs/primary suffix** (6 变体)

- Web3-20px: True
- type: empty, icon 1, icon 2, icon 3, more, more icon

代表变体: `type=icon 1, Web3-20px=True, Arabic=false`

```
type=icon 1, Web3-20px=True, Arabic=false → 72x44 | layout:HORIZONTAL
  蒙层 → 16x44 | gradient:#ffffff (0%)→#ffffff
  1 → 56x44 | bg:#ffffff | pad:T0/R20/B0/L16 | layout:HORIZONTAL
```

**GTTabs Card** (28 变体)

代表变体详见 Navbar 部分 GTTabs Card 子树。

<details><summary>内部子组件 (5 个)</summary>

**_GTTabs Card/item 40px** (2 变体)
```
Property 1=Inactive → 63x36 | r:999 | pad:0/16 | layout:VERTICAL
  TEXT 'Tabs' → Gate Switzer 14.0px w500 lh:18.5 #84888c
```

**_GTTabs Card/item 32px** (2 变体)
```
Status=Active → 63x28 | bg:#ffffff | r:999 | pad:0/16 | layout:VERTICAL
  TEXT 'Tabs' → Gate Switzer 14.0px w500 lh:18.5 #070808
```

**_GTTabs Card/item 28px** (2 变体)
```
Status=Active → 51x24 | bg:#ffffff | r:999 | pad:0/10 | layout:VERTICAL
  TEXT 'Tabs' → Gate Switzer 14.0px w500 lh:18.5 #070808
```

**_GTTabs Card/item 24px** (2 变体)
```
Status=Active → 34x20 | bg:#ffffff | r:999 | pad:0/10 | layout:VERTICAL
  icon_back_arrow → 14x14
```

**_GTTabs Buy Sell/item** (4 变体)
```
Type=Trade Buy, Status=Active, On All Web3=False → 57x24 | layout:VERTICAL
  buy → 57x24 | layout:HORIZONTAL
```

</details>

#### Title 标题 (1176:46265)

**GTTitle** (5 变体)

- Size: heading, list, list-small, subtitle, subtitle_small

代表变体: `Size=heading`

```
Size=heading → 375x55 | pad:0/20 | gap:16
  Title/left → 299x55
    Frame 2131332974 → 81x37 | gap:4
    TEXT 'Description' → Gate Switzer 14.0px w400 lh:18.5 #a0a3a7
  ButtonText → 20x20
    icon_chevron_right_small → 20x20
```

**Title/left** (5 变体)

- size: 12px, 16px, 18px, 20px, 28px

代表变体: `size=28px`

```
size=28px → 236x55
  Frame 2131332974 → 83x37 | gap:4
  TEXT 'Description' → Gate Switzer 14.0px w400 lh:18.5 #a0a3a7
```

**Table Sorter_/item** (3 变体)

- 排序: 升序, 降序, 默认

代表变体: `排序=默认`

```
排序=默认 → 8x12
  列表筛选-默认 → 8x12
```

**ButtonText** (3 变体)

- type: Button Tex, arrow, icon

代表变体: `type=icon`

```
type=icon → 92x20 | gap:16
  icon_search → 20x20
  icon_parametersettings → 20x20
  icon_iconplaceholder → 20x20
```

#### Steps 步骤条 (1138:60635)

**GTSteps Vertical** (15 变体)

- Type: Default, Dot
- Status: Error, Process, Success, Wait

代表变体: `Type=Default, Status=Error, Arabic=False`

```
Type=Default, Status=Error, Arabic=False → 327x69 | r:99 | gap:12
  icon+line → 28x69
    icon → 28x69
  text → 287x69 | gap:8
    title+des → 287x45
    zhanwei → 0x16 | border:1.0px #ffffff
```

**GTSteps Horizontal** (4 变体)

- Status: Active, Inactive

代表变体: `Status=Active, Arabic=false`

```
Status=Active, Arabic=false → 343x3 | gap:8
  step → 343x3 | gap:2
    _GTStepsV5 Horizontal/item → 67x3 | bg:#070808 | r:999
    _GTStepsV5 Horizontal/item → 67x3 | bg:#dfe0e2 | r:999
    _GTStepsV5 Horizontal/item → 67x3 | bg:#dfe0e2 | r:999
    _GTStepsV5 Horizontal/item → 67x3 | bg:#dfe0e2 | r:999
    _GTStepsV5 Horizontal/item → 67x3 | bg:#dfe0e2 | r:999
```

**GTSteps Vertical** (16 变体)

- Type: Default, Dot
- Status: Error, Process, Success, Wait

代表变体: `Arabic=False, Type=Default, Status=Error`

```
Arabic=False, Type=Default, Status=Error → 335x69 | r:99 | gap:12
  icon+line → 28x69
    icon → 28x69
  text → 295x69 | gap:8
    title+des → 295x45
    zhanwei → 0x16 | border:1.0px #ffffff
```

**GTSteps Horizontal** (4 变体)

- Status: Active, Inactive

代表变体: `Status=Active, Arabic=false`

```
Status=Active, Arabic=false → 335x3 | gap:8
  step → 335x3 | gap:2
    _GTStepsV5 Horizontal/item → 65x3 | bg:#070808 | r:999
    _GTStepsV5 Horizontal/item → 65x3 | bg:#dfe0e2 | r:999
    _GTStepsV5 Horizontal/item → 65x3 | bg:#dfe0e2 | r:999
    _GTStepsV5 Horizontal/item → 65x3 | bg:#dfe0e2 | r:999
    _GTStepsV5 Horizontal/item → 65x3 | bg:#dfe0e2 | r:999
```

**small line** (2 变体)

- light: no, yes

代表变体: `light=no`

```
light=no → 1x4
  line → 1x4 | bg:#070808
```

**small line dot** (2 变体)

- light: no, yes

代表变体: `light=no`

```
light=no → 1x6 | gap:10
  line → 1x6 | bg:#070808
```

<details><summary>内部子组件 (2 个)</summary>

**_GTSteps Horizontal/item** (2 变体)
```
Status=Inactive → 38x3 | bg:#dfe0e2 | r:999
```

**_GTSteps Horizontal/item** (2 变体)
```
Status=Inactive → 38x3 | bg:#dfe0e2 | r:999
```

</details>

### 反馈

#### Dialog 对话框 (1091:42077)

**Modal Business_V5（flutter）** (2 变体)

- Button: False, True

代表变体: `Button=True`

```
Button=True → 301x384 | gap:16
  modal → 301x344 | bg:#ffffff | r:8
    text  → 301x268 | pad:T20/R16/B8/L16 | gap:4
      Image → 140x140
      TEXT 'Welcome to Gate.io' → Gate Switzer 14.0px w400 lh:18.5 #84888c
      TEXT 'Complete tasks to 
G' → Switzer 28.0px w600 lh:37.0 #070808
    GTDialog Footer Button → 301x76 | bg:#ffffff | pad:16/16 | gap:12
      GTButton → 128x44 | bg:#000000 | r:999 | pad:0/24
      GTButton → 128x44 | bg:#0055ff | r:999 | pad:0/24
  close → 24x24 | pad:2/2 | gap:10
    CEX_circlefilled_error → 20x20
      Union → 17x17 | bg:#c4c7ca
```

**GTDialog** (8 变体)

- Type: Default, Image
- Title: False, True

代表变体: `Type=Default, Arabic=False, Title=True`

```
Type=Default, Arabic=False, Title=True → 301x178 | bg:#ffffff | r:12
  Contents → 301x102 | pad:T20/R16/B8/L16 | gap:20
    Copy/Text → 269x74 | gap:8
  GTDialog Footer Button → 301x76 | bg:#ffffff | pad:16/16
    GTButton → 269x44 | bg:#0055ff | r:999 | pad:0/24
```

**GTDialog Footer Button** (72 变体)

- Type: Default Btn, Horizontal Btn, Long Btn, Long Btn+icon, Vertical Btn, Vertical Btn two, Vertical Btn+Text, Vertical Text, Vertical Text+Desc
- Agreement: False, True
- Divider: False, True

代表变体: `Type=Default Btn, Agreement=False, Divider=False, Arabic=false`

```
Type=Default Btn, Agreement=False, Divider=False, Arabic=false → 301x76 | bg:#ffffff | pad:16/16
  GTButton → 269x44 | bg:#0055ff | r:999 | pad:0/24
    TEXT 'Button' → Gate Switzer 16.0px w600 lh:21.1 #ffffff
```

#### ActionSheet 动作面板 (1091:42078)

**GTActionSheets** (6 变体)

- Type: Action, Title, Title+Desc

代表变体: `Type=Action, Arabic=false`

```
Type=Action, Arabic=false → 375x812 | bg:#000000
  action → 375x328 | bg:#ffffff
    list → 375x224
      _GTActionSheets/item → 375x56 | pad:14/20
      _GTActionSheets/item → 375x56 | pad:14/20
      _GTActionSheets/item → 375x56 | pad:14/20
      _GTActionSheets/item → 375x56 | pad:14/20
    button → 375x88 | bg:#ffffff
      Divider → 375x1
      Button → 375x53 | r:20 | pad:16/20 | gap:8
      HomeIndicator → 375x34
```

<details><summary>内部子组件 (2 个)</summary>

**_GTActionSheets/text** (4 变体)
```
Type=Title, Arabic=false → 375x42 | pad:12/20
  TEXT 'After deletion, it w' → Gate Switzer 14.0px w400 lh:18.5 #070808
```

**_GTActionSheets/item** (24 变体)
```
Status=Action, Badge=False, Pressed=False, Arabic=false → 375x56 | pad:14/20
  TEXT 'Action' → Gate Switzer 16.0px w500 lh:21.1 #070808
```

</details>

#### Popup 弹出面板 (162:1672)

**GTPopup** (12 变体)

- Style: Fixed, Hug
- Max: False, True
- Footer Button: False, True

代表变体: `Style=Fixed, Max=False, Footer Button=True, Arabic=false`

```
Style=Fixed, Max=False, Footer Button=True, Arabic=false → 375x360
  GTPopupV5/header → 375x56
    True/False/False/False/False/false → 375x56 | bg:#ffffff
  GTPopupFilter → 375x194 | bg:#ffffff
    Popup/Occupy area → 375x162 | pad:0/20
  GTPopupV6 Footer Button → 375x76 | bg:#ffffff | pad:16/20
    GTButton → 335x44 | bg:#0055ff | r:999 | pad:0/24
  HomeIndicator → 375x34 | bg:#ffffff
    Home Indicator → 134x5 | bg:#070808 | r:100
```

**GTPopup/header/title** (4 变体)

- 标题: False, True

代表变体: `标题=False, Arabic=false`

```
标题=False, Arabic=false → 123x25 | gap:4
  icon → 20x24
    icon_left_aligned_arrow → 20x20
  title+i → 99x24 | gap:8
    货币 → 28x24 | gap:10
    title → 57x24 | gap:4
```

**GTPopup/header** (18 变体)

- Title: False, True
- Drag handle: False, True
- Tabs Underline: False
- Search: False, True
- Steps: False, True

代表变体: `Title=True, Drag handle=True, Tabs Underline=False, Search=False, Steps=False, Arabic=false`

```
Title=True, Drag handle=True, Tabs Underline=False, Search=False, Steps=False, Arabic=false → 375x56 | bg:#ffffff
  Drag handle → 375x12
    drag → 31x3 | bg:#c4c7ca | r:99
  title → 375x44
    title+close → 375x44 | pad:T12/R20/B8/L20 | gap:12
```

**GTPopupV6 Footer Button** (72 变体)

- Type: Default Btn, Horizontal Btn, Long Btn, Long Btn+icon, Vertical Btn, Vertical Btn two, Vertical Btn+Text, Vertical Text, Vertical Text+Desc
- Agreement: False, True
- Divider: False, True

代表变体: `Type=Default Btn, Agreement=False, Divider=False, Arabic=false`

```
Type=Default Btn, Agreement=False, Divider=False, Arabic=false → 375x76 | bg:#ffffff | pad:16/20
  GTButton → 335x44 | bg:#0055ff | r:999 | pad:0/24
    TEXT 'Button' → Gate Switzer 16.0px w600 lh:21.1 #ffffff
```

**GTPopupV6 Full Screen** (12 变体)

- Style: Default, Search, Search+Tabs 1, Search+Tabs 2, Title, Title+sub

代表变体: `Style=Default, Arabic=false`

```
Style=Default, Arabic=false → 375x812 | bg:#ffffff
  Status Bar → 375x44 | bg:#ffffff
    Action → 54x18
    Container → 67x12
  GTNavbar → 375x44 | bg:#ffffff | pad:0/20 | gap:16
    icon → 20x20 | gap:10
    _GTNavbarTitle/_prefix title → 263x24
    icon → 20x20 | gap:10
  GTPopupFilter → 375x690 | bg:#ffffff
    Popup/Occupy area → 375x666 | pad:0/20
  HomeIndicator → 375x34
    Home Indicator → 134x5 | bg:#070808 | r:100
```

#### PopupFilter 筛选面板 (304:6653)

**Filter Entrance** (8 变体)

- Type: CheckBox, Default, Icon, Icon+Button

代表变体: `Type=Default, Arabic=false`

```
Type=Default, Arabic=false → 375x44 | bg:#ffffff | pad:T0/R0/B0/L20
  filter group → 355x44 | gap:16
    _Filter Entrance/item → 57x44 | gap:2
    _Filter Entrance/item → 57x44 | gap:2
    _Filter Entrance/item → 57x44 | gap:2
    _Filter Entrance/item → 57x44 | gap:2
```

**GTPopupFilter** (24 变体)

- Type: Cascading（flutter）, Coin select 28px, Country, Display, Jump, Multi-coin select 28px, Multi-select, Outlined, Selected, Selector, Slot, Switch

代表变体: `Type=Selected, Arabic=false`

```
Type=Selected, Arabic=false → 375x296 | bg:#ffffff
  list → 375x280
    _GTPopupFilter/select  → 375x56 | bg:#ffffff | pad:16/20 | gap:12
      prefix → 299x21
      select → 24x24 | pad:2/2 | gap:12
    _GTPopupFilter/select  → 375x56 | bg:#ffffff | pad:16/20 | gap:12
      prefix → 299x21
      active → 24x24
    _GTPopupFilter/select  → 375x56 | bg:#ffffff | pad:16/20 | gap:12
      prefix → 299x21
      active → 24x24
    _GTPopupFilter/select  → 375x56 | bg:#ffffff | pad:16/20 | gap:12
      prefix → 299x21
      active → 24x24
    _GTPopupFilter/select  → 375x56 | bg:#ffffff | pad:16/20 | gap:12
      prefix → 299x21
      active → 24x24
```

**GTPopupFilter/outlined** (6 变体)

- Status: Active, Disabled, Inactive

代表变体: `Status=Active, Arabic=false`

```
Status=Active, Arabic=false → 375x71 | bg:#ffffff | pad:0/20
  option → 335x71 | border:1.0px #303236 | r:8 | pad:16/16
    prefix → 303x39 | gap:12
      _text → 275x39 | gap:2
      icon_chevron_right → 16x16
```

<details><summary>内部子组件 (15 个)</summary>

**_GTPopupFilter/multi-select ** (40 变体)
```
Status=Active, Prefix Icon=False, Description=False, Arabic=false → 375x56 | bg:#ffffff | pad:16/20 | gap:12
  prefix → 299x21 | gap:12
    _GTPopupFilter/select/item label → 299x21
  select → 24x24 | pad:2/2 | gap:12
    icon_circlefilled_success → 20x20
```

**_GTPopupFilter/select ** (40 变体)
```
Status=Active, Prefix Icon=False, Description=False, Arabic=false → 375x56 | bg:#ffffff | pad:16/20 | gap:12
  prefix → 299x21
    _GTPopupFilter/select/item label → 299x21
  select → 24x24 | pad:2/2 | gap:12
    icon_circlefilled_success → 20x20
```

**_GTPopupFilter/coin** (58 变体)
```
Type=Lined, Status=Active, Multi-select=True, Arabic=false → 375x56 | bg:#ffffff | pad:16/20 | gap:12
  left → 299x21 | gap:8
    Rectangle 346271864 → 2x10 | bg:#0055ff | r:2
    TEXT 'Bank Transfer' → Gate Switzer 16.0px w500 lh:21.1 #070808
  select → 24x24 | pad:2/2 | gap:12
    icon_circlefilled_success → 20x20
```

**_GTPopupFilter/select switch** (16 变体)
```
Status=Normal, Prefix Icon=False, Description=False, Arabic=false → 375x56 | bg:#ffffff | pad:16/20 | gap:12
  prefix → 283x21 | gap:12
    _GTPopupFilter/select/item label → 283x21
  GTSwitch → 40x24 | bg:#303236 | r:999 | pad:T2/R2/B2/L18
    button → 20x20 | bg:#ffffff | r:999 | shadow:(0,0) blur:4 #040919 (15%)
```

**_GTPopupFilter/jump** (8 变体)
```
Type=Single-select, Status=Jump, Prefix Icon=False, Description=False, Arabic=false → 375x53 | bg:#ffffff | pad:16/20 | gap:12
  prefix → 307x21 | gap:12
    _GTPopupFilter/select/item label → 307x21
  icon_chevron_right → 16x16
    union → 7x12 | bg:#070808
```

**_Filter_V5/country** (24 变体)
```
Status=Active, Area code=False, All=False, Arabic=false → 375x60 | bg:#ffffff | pad:16/20 | gap:12
  left → 299x28 | gap:12
    cn → 28x28 | bg:#ffffff | border:0.699999988079071px #f2f3f4 | r:14
    TEXT 'China' → Gate Switzer 16.0px w500 lh:21.1 #070808
  select → 24x24 | pad:2/2 | gap:12
    icon_circlefilled_success → 20x20
```

**_GTPopupFilter/selector item** (3 变体)
```
Type=Subtext, Item=2 → 375x40 | pad:4/20 | gap:8
  GTSelector → 164x32 | bg:#f5f6f7 | r:6 | pad:7/12 | gap:6
    TEXT 'Option' → Gate Switzer 14.0px w500 lh:18.5 #070808
  GTSelector → 164x32 | bg:#f5f6f7 | r:6 | pad:7/12 | gap:6
    TEXT 'Option' → Gate Switzer 14.0px w500 lh:18.5 #070808
```

**_GTPopupFilter/column item** (14 变体)
```
Type=Primary, Status=Inactive, Arabic=false → 128x50 | bg:#ffffff | pad:T8/R12/B8/L24
  text → 92x34 | r:6 | pad:0/12
    TEXT 'Primary filter' → Gate Switzer 14.0px w400 lh:18.5 #84888c
```

**_GTPopupFilter/display** (2 变体)
```
Type=Des 1, Arabic=false → 335x101 | gap:12
  title+des → 335x101 | gap:8
    TEXT 'Content title' → Gate Switzer 16.0px w500 lh:21.1 #070808
    list → 335x72 | gap:12
```

**_GTPopupFilter/group label** (16 变体)
```
Size=XS-12px, Icon I=False, Arabic=false → 375x28 | pad:T8/R20/B4/L20
  Label → 335x16 | gap:4
    TEXT 'Group label' → Gate Switzer 12.0px w400 lh:15.8 #a0a3a7
```

**_GTPopupFilter/selector** (3 变体)
```
Title=XS-12px → 375x156
  _GTPopupFilter/group label → 375x28 | pad:T8/R20/B4/L20
    Label → 335x16 | gap:4
  _GTPopupFilter/selector item → 375x40 | pad:4/20 | gap:8
    GTSelector → 164x32 | bg:#f5f6f7 | r:6 | pad:7/12 | gap:6
    GTSelector → 164x32 | bg:#f5f6f7 | r:6 | pad:7/12 | gap:6
  _GTPopupFilter/selector item → 375x40 | pad:4/20 | gap:8
    GTSelector → 164x32 | bg:#f5f6f7 | r:6 | pad:7/12 | gap:6
    GTSelector → 164x32 | bg:#f5f6f7 | r:6 | pad:7/12 | gap:6
  _GTPopupFilter/selector item → 375x40 | pad:4/20 | gap:8
    GTSelector → 164x32 | bg:#f5f6f7 | r:6 | pad:7/12 | gap:6
    GTSelector → 164x32 | bg:#f5f6f7 | r:6 | pad:7/12 | gap:6
```

**_GTPopupFilter/select/icon** (3 变体)
```
Icon=MD-24px → 24x24 | gap:12
  icon_gift → 24x24
    union → 17x18 | bg:#070808
```

**_Filter Entrance/item** (4 变体)
```
Status=Inactive, Size=MD-14px, Arabic=False → 57x44 | gap:2
  TEXT 'Option' → Gate Switzer 14.0px w500 lh:18.5 #070808
  icon_down_fill → 12x12
    union → 5x4 | bg:#070808
```

**_GTPopupFilter/select/item label** (8 变体)
```
Tag=False, Icon I=False, Badge=False, Arabic=false → 49x21
  TEXT 'Option' → Gate Switzer 16.0px w500 lh:21.1 #070808
```

**_GTPopupFilter/select/item des** (8 变体)
```
Tag=False, Icon I=False, Badge=False, Arabic=false → 63x39 | gap:2
  TEXT 'Option' → Gate Switzer 16.0px w500 lh:21.1 #070808
  TEXT 'Description' → Gate Switzer 12.0px w400 lh:15.8 #84888c
```

</details>

#### PopMenu 气泡弹出框 (1138:60636)

**PopMenu** (24 变体)

- Size: M, S
- Quantity: 3, 4, 5
- Icon: false, true

代表变体: `Size=M, Quantity=5, Icon=true, Arabic=false`

```
Size=M, Quantity=5, Icon=true, Arabic=false → 144x276 | bg:#ffffff | r:8 | shadow:(0,4) blur:14 #000000 (8%)
  _GTPopMenu/prefix medium → 144x44 | pad:12/16 | gap:8
    icon_gift → 20x20
    TEXT 'Popover Text' → Gate Switzer 14.0px w500 lh:18.5 #070808
  _GTPopMenu/prefix medium → 144x44 | bg:#fafafa | pad:12/16 | gap:8
    icon_gift → 20x20
    TEXT 'Popover Text' → Gate Switzer 14.0px w500 lh:18.5 #070808
  _GTPopMenu/prefix medium → 144x44 | pad:12/16 | gap:8
    icon_gift → 20x20
    TEXT 'Popover Text' → Gate Switzer 14.0px w500 lh:18.5 #070808
  _GTPopMenu/prefix medium → 144x44 | pad:12/16 | gap:8
    icon_gift → 20x20
    TEXT 'Popover Text' → Gate Switzer 14.0px w500 lh:18.5 #070808
  _GTPopMenu/prefix medium → 144x44 | pad:12/16 | gap:8
    icon_gift → 20x20
    TEXT 'Popover Text' → Gate Switzer 14.0px w500 lh:18.5 #070808
  _GTPopMenu/prefix medium → 144x44 | pad:12/16 | gap:4
    more → 96x20 | gap:8
    icon_chevron_right → 12x12
```

<details><summary>内部子组件 (4 个)</summary>

**_GTPopMenu/medium** (8 变体)
```
Status=Normal, More=False, Arabic=false → 116x42 | pad:12/16
  text  → 84x18
```

**_GTPopMenu/prefix medium** (8 变体)
```
Status=Normal, More=False, Arabic=false → 144x44 | pad:12/16 | gap:8
  icon_gift → 20x20
  TEXT 'Popover Text' → Gate Switzer 14.0px w500 lh:18.5 #070808
```

**_GTPopMenu/small** (8 变体)
```
Status=Normal, More=False, Arabic=false → 96x32 | pad:8/12
  text  → 72x16
```

**_GTPopMenu/prefix small** (8 变体)
```
Status=Normal, More=False, Arabic=false → 120x32 | pad:8/12 | gap:8
  icon_gift → 16x16
  TEXT 'Popover Text' → Gate Switzer 12.0px w500 lh:15.8 #070808
```

</details>

#### Alert 吸顶警示 (1176:46266)

**GTAlert** (18 变体)

- type: error, info, warning
- expand: false, true
- jump: false, true

代表变体: `type=info, expand=false, jump=false, Arabic=false`

```
type=info, expand=false, jump=false, Arabic=false → 375x56 | bg:#ebf6ff | pad:8/20 | gap:8
  prefix → 16x18
    icon_alert → 16x16
  text and close → 311x40 | gap:8
    title → 287x40 | gap:8
    close → 16x18 | gap:10
```

<details><summary>内部子组件 (2 个)</summary>

**_GTAlert/item** (2 变体)
```
status=inactive → 16x16
  icon_chevron_down → 16x16
    union → 10x6 | bg:#a0a3a7
```

**_GTAlert/item red** (2 变体)
```
status=inactive → 16x16
  icon_chevron_down → 16x16
    union → 10x6 | bg:#f7594b
```

</details>

#### Reminder 说明提示 (168:14122)

**GTReminder** (16 变体)

- status: Error, Neutral, Success, Warning
- title: False, True

代表变体: `status=Neutral, title=True, Arabic=false`

```
status=Neutral, title=True, Arabic=false → 335x88 | bg:#f5f6f7 | r:8 | pad:8/12 | gap:8
  Frame 2131332472 → 16x20 | gap:10
    icon_info → 16x16
  title+close → 287x72
    title → 287x72 | gap:12
```

<details><summary>内部子组件 (3 个)</summary>

**_GTTips（仅UI支持）** (2 变体)
```
Property 1=Default, 阿语=False → 335x54
  TEXT 'Tips: After the addi' → Gate Switzer 12.0px w400 lh:18.0 #070808
```

**_GTReminder/icon item** (2 变体)
```
Type=Close → 20x20 | pad:2/2
  icon_close → 16x16
```

**_GTReminder/icon item/dropdown** (2 变体)
```
Active=False → 20x20 | pad:2/2
  icon_chevron_down → 16x16
```

</details>

#### Result 结果页 (1411:20510)

**GTResult** (12 变体)

- Status: Failed, Ongoing, Success
- Popup: False, True

代表变体: `Status=Success, Popup=False, Arabic=False`

```
Status=Success, Popup=False, Arabic=False → 375x250 | pad:0/32
  result → 311x250 | gap:24
    Success 成功 → 140x140
    text → 311x86 | gap:12
```

#### Notification 通知提醒框 (1138:67178)

**Notification** (4 变体)

- Type: Field, Long text

代表变体: `Type=Field, Arabic=false`

```
Type=Field, Arabic=false → 335x125 | bg:#ffffff | r:8 | pad:12/16 | gap:12 | shadow:(0,12) blur:30 #000000 (12%) | shadow:(0,10) blur:16 #000000 (8%)
  title → 303x65 | gap:8
    icon → 16x21 | gap:10
    Body and icon → 279x65 | gap:8
  Button → 303x24 | gap:12
    GTButton → 42x24 | bg:#000000 | r:999 | pad:0/8
```

**GTNotification** (14 变体)

- Status: Error, Pending, Success, Warning
- Multi-Description: False, True

代表变体: `Status=Success, Multi-Description=False, Arabic=false`

```
Status=Success, Multi-Description=False, Arabic=false → 327x106 | bg:#ffffff | r:8 | pad:12/16 | gap:12 | shadow:(0,12) blur:30 #000000 (12%) | shadow:(0,10) blur:16 #000000 (8%)
  title → 295x46 | gap:8
    icon → 16x21 | gap:10
    Body and icon → 271x46 | gap:8
  Button → 295x24 | gap:12
    GTButton → 42x24 | bg:#000000 | r:999 | pad:0/8
```

**Button** (8 变体)

- Type: Button Text link1, Button Text link2, Button1, Button2

代表变体: `Type=Button2, Arabic=false`

```
Type=Button2, Arabic=false → 295x24 | gap:16
  GTButton → 58x24 | bg:#000000 | r:999 | pad:0/8
    TEXT 'Futures' → Gate Switzer 12.0px w500 lh:15.8 #070808
  GTButton → 42x24 | bg:#000000 | r:999 | pad:0/8
    TEXT 'Spot' → Gate Switzer 12.0px w500 lh:15.8 #070808
```

**Notification/title** (4 变体)

- item: 1, 2

代表变体: `item=1, Arabic=false`

```
item=1, Arabic=false → 247x18
  TEXT 'Title' → Gate Switzer 14.0px w600 lh:18.5 #070808
```

**Prefix icon** (5 变体)

- Prefix icon: icon_alert, icon_error, icon_info, icon_success, icon_twap

代表变体: `Prefix icon=icon_error`

```
Prefix icon=icon_error → 16x16
  icon_error → 16x16
```

#### Toast 轻提示 (1138:57072)

**GTToast** (8 变体)

- Status: Error, Info, Success, Warning

代表变体: `Status=Info, Arabic=false`

```
Status=Info, Arabic=false → 261x37 | bg:#303236 | r:8 | pad:8/16
  TEXT 'This is a info toast' → Gate Switzer 14.0px w400 lh:21.0 #ffffff
```

#### Tooltips 文字气泡 (1530:33534)

**GTTooltips** (8 变体)

- Position: Bottom, Left, Right, top

代表变体: `Position=Bottom, Arabic=false`

```
Position=Bottom, Arabic=false → 335x63
  GTTooltips/item → 335x58 | bg:#303236 | r:8 | pad:8/12
    Frame 2147231383 → 311x42 | gap:8
  _bottom → 335x5 | pad:0/12
    Rectangle 69 → 14x5 | bg:#303236
```

**GTTooltips/item** (4 变体)

- type: action
- style: icon, icon+text
- direction: bottom, top

代表变体: `type=action, style=icon+text, direction=top`

```
type=action, style=icon+text, direction=top → 256x157 | r:12
  _top → 256x5 | pad:0/12
    Rectangle 69 → 14x5 | bg:#303236
  Frame 2087328779 → 256x152 | bg:#303236 | r:12 | pad:16/12 | gap:8
    _1 → 52x52 | gap:4
    _2 → 52x52 | gap:4
    _text → 52x52 | gap:4
    _text → 52x52 | gap:4
    _text → 52x52 | gap:4
    _text → 52x52 | gap:4
    _text → 52x52 | gap:4
    _text → 52x52 | gap:4
```

<details><summary>内部子组件 (3 个)</summary>

**_text** (2 变体)
```
type=single → 52x52 | gap:4
  Frame 2087328779 → 24x24 | gap:10
  Frame 2087328779 → 52x28 | gap:10
```

**_top** (3 变体)
```
direction=left → 38x5 | pad:0/12
  Rectangle 69 → 14x5 | bg:#303236
```

**_bottom** (3 变体)
```
direction=left → 38x5 | pad:0/12
  Rectangle 69 → 14x5 | bg:#303236
```

</details>

#### UserGuide 新手引导 (1176:46106)

**GTUserGuide** (12 变体)

- Position: Bottom, BottomLeft, BottomRight, Left, LeftBottom↙, LeftTop, Right, RightBottom↘, RightTop↗, Top, TopLeft, TopRight

代表变体: `Position=Top`

```
Position=Top → 250x193 | shadow:(0,10) blur:30 #000000 (10%)
  GTUserGuide/item → 250x185 | bg:#ffffff | r:8 | pad:16/16 | gap:16 | backdrop-blur:4
    title → 218x113 | gap:8
    GTUserGuide/item/arrow → 218x24 | gap:16
  指示 → 46x8 | pad:0/12
    Rectangle 69 → 22x8 | bg:#ffffff
```

**GTUserGuide/item** (6 变体)

- Title: False, True
- Only Title: False, True
- Page arrow: False, True

代表变体: `Title=False, Only Title=True, Page arrow=False`

```
Title=False, Only Title=True, Page arrow=False → 250x95 | bg:#ffffff | r:8 | pad:16/16 | gap:16 | backdrop-blur:4
  title+close → 218x63 | gap:8
    TEXT 'This is a copywritin' → Gate Switzer 16.0px w600 lh:21.1 #070808
    icon → 20x20 | pad:2/2 | gap:10
```

**GTUserGuide/item/arrow** (3 变体)

- Status: First page, Last page, Middle page

代表变体: `Status=First page`

```
Status=First page → 218x24 | gap:16
  yema → 138x16
    TEXT '1' → Gate Switzer 12.0px w400 lh:15.8 #070808
    TEXT '/3' → Gate Switzer 10.0px w400 lh:13.2 #a0a3a7
  button → 64x24 | gap:16
    left → 24x24 | pad:4/4 | gap:10
    right → 24x24 | pad:4/4 | gap:10
```

#### Avatar 头像 (1176:46108)

**GTAvatar** (13 变体)

- Only Avatar: False, True
- Size: L1, L2, L3, M1, M2, M3, S1, S2, S3

代表变体: `Size=M1, Only Avatar=False, Arabic=false`

```
Size=M1, Only Avatar=False, Arabic=false → 117x36 | gap:8 | layout:HORIZONTAL
  GTAvatar/image → 36x36
    Rectangle 346273316 → 36x36 | bg:#3222ee
    avatar-image → 36x36 | r:56
  title+sub → 73x36 | gap:2 | layout:VERTICAL
    title+tag → 73x18 | gap:4 | layout:HORIZONTAL
      _GTAvatar/title → 28x18 | layout:HORIZONTAL
        TEXT 'Title' → Gate Switzer 14.0px w400 lh:18.5 #070808
      VIP → 41x14 | bg:#fcd68a | r:2 | pad:T4/R4/B3/L4 | gap:2 | layout:HORIZONTAL
    TEXT 'Subtext' → Gate Switzer 12.0px w400 lh:15.8 #84888c
```

对比变体: `Size=S2, Only Avatar=False, Arabic=false`
```
Size=S2, Only Avatar=False, Arabic=false → 56x20 | gap:8 | layout:HORIZONTAL
  GTAvatar/image → 20x20
    Rectangle 346273316 → 20x20 | bg:#3222ee
    avatar-image → 20x20 | r:31
  title+sub → 28x18 | layout:VERTICAL
    title+tag → 28x18 | gap:4 | layout:HORIZONTAL
      _GTAvatar/title → 28x18 | layout:HORIZONTAL
```

**GTAvatar 64px flutter** (6 变体)

- Direction: Horizontal, Left vertical, Middle vertical
- Edit: False, True

代表变体: `Direction=Left vertical, Edit=False`

```
Direction=Left vertical, Edit=False → 127x118 | gap:8 | layout:VERTICAL
  GTAvatar → 64x64 | layout:HORIZONTAL
  title → 127x46 | gap:2 | layout:VERTICAL
```

### 展示

#### Badge 徽标 (316:16932)

**GTBadge** (8 变体)

- Type: 1-9, 10-99, 99+, Dot, New
- do-not-disturb: False, True

代表变体: `Type=1-9, do-not-disturb=False`

```
Type=1-9, do-not-disturb=False → 16x16 | bg:#f7594b | r:999 | pad:0/4 | layout:VERTICAL
```

#### NumberView 数值显示 (1176:46110)

**GTNumberView** (48 变体)

- Position: Left, Middle, Right
- Size: L1, L2, L3, M1, M2, M3, S1, S2
- Type: 上轻下重, 上重下轻

代表变体: `Type=上轻下重, Position=Left, Size=M1`

```
Type=上轻下重, Position=Left, Size=M1 → 167x53 | layout:VERTICAL
  _GTNumberView/subext-400 12px gray → 57x16 | gap:4 | layout:HORIZONTAL
    text → 41x16 | layout:VERTICAL
      TEXT 'Subtitle' → Gate Switzer 12.0px w400 lh:15.8 #84888c
      dash → 41x0 | border:1.0px #a0a3a7
    icon_iconplaceholder → 12x12
      union (Stroke) → 9x9 | bg:#a0a3a7
  text+usdt → 167x37 | gap:4 | layout:HORIZONTAL
    text → 127x37 | layout:HORIZONTAL
      TEXT '86,139.52' → Gate Switzer 28.0px w600 lh:37.0 #070808
    TEXT 'USDT' → Gate Switzer 14.0px w500 lh:18.5 #070808
```

对比变体: `Type=上轻下重, Position=Left, Size=S1`
```
Type=上轻下重, Position=Left, Size=S1 → 113x37 | layout:VERTICAL
  _GTNumberView/subext-400 12px gray → 57x16 | gap:4 | layout:HORIZONTAL
    text → 41x16 | layout:VERTICAL
      TEXT 'Subtitle' → Gate Switzer 12.0px w400 lh:15.8 #84888c
      dash → 41x0 | border:1.0px #a0a3a7
    icon_iconplaceholder → 12x12
      union (Stroke) → 9x9 | bg:#a0a3a7
  text+usdt → 113x21 | gap:4 | layout:HORIZONTAL
    TEXT '86,139.52' → Gate Switzer 16.0px w600 lh:21.1 #070808
    TEXT 'USDT' → Gate Switzer 14.0px w500 lh:18.5 #070808
```

#### Cell 单元格 (633:32732)

**GTCell** (16 变体)

- Suffix: False, True
- Prefix icon: False, True
- Description: False, True

代表变体: `Suffix=False, Prefix icon=False, Description=False, Arabic=false`

```
Suffix=False, Prefix icon=False, Description=False, Arabic=false → 375x56 | bg:#ffffff | pad:16/20 | gap:12
  prefix → 327x24
    _GTCell/label → 327x24
```

<details><summary>内部子组件 (6 个)</summary>

**_GTCell/suffix/multiSelect** (2 变体)
```
Status=active → 20x20
  icon_circlefilled_success → 20x20
    union → 17x17 | bg:#070808
```

**_GTCell/label** (8 变体)
```
Icon i=False, Tag=False, Subtext=False, Arabic=false → 74x24
```

**_GTCell/label description** (8 变体)
```
Icon i=False, Tag=False, Subtext=False, Arabic=false → 74x40 | gap:8
```

**_GTCell/suffix** (28 变体)
```
arrow=True, Icon=False, Text=False, Subtitle=False, Tag=False, Switch=False, Multi-select=False, Button=False, Arabic=false → 20x20
```

**_GTCell Group** (2 变体)
```
Name=yes, Name style=secondary → 375x62 | pad:T16/R20/B8/L20 | gap:16
```

**_tag** (2 变体)
```
type=Default → 29x20
```

</details>

#### Currency 币种单元格 (803:33614)

**Crypto Cell** (28 变体)

- Type: Chart, Countdown, Date, Date+updown, Default, Switch, Up-down
- Singleline: False, True

代表变体: `Type=Default, Singleline=False, Arabic=false`

```
Type=Default, Singleline=False, Arabic=false → 375x60 | bg:#ffffff | pad:0/20 | gap:16
  Crypto/Left coin → 160x59 | gap:8
    _Crypto/Coin/item → 24x24
    title+subtext → 74x36
  _Crypto/Atom Price → 160x59 | gap:4
    title → 78x36
```

**Crypto/Left coin** (18 变体)

- Coin: False, True
- 多链: False, True
- Star: False, True
- CheckBox: False, True

代表变体: `Coin=True, 多链=False, Star=False, CheckBox=False, Arabic=false`

```
Coin=True, 多链=False, Star=False, CheckBox=False, Arabic=false → 106x59 | gap:8
  _Crypto/Coin/item → 24x24
    BTC → 24x24 | r:55
  title+subtext → 74x36
    Crypto/Left coin/title → 74x20 | gap:4
    Crypto/Left coin/subtext → 42x16 | gap:4
```

**Crypto/Left coin/title** (8 变体)

- Subtitle: False, True
- Font: 15px, 16px

代表变体: `Subtitle=False, Font=15px, Arabic=false`

```
Subtitle=False, Font=15px, Arabic=false → 74x20 | gap:4
  Title+Subtitle → 29x20 | gap:2
  GTTag → 25x16 | bg:#000000 | r:2
  icon_hot_fill → 12x12
```

**Crypto/Left coin/subtext** (4 变体)

- 倍率: False, True

代表变体: `倍率=False, Arabic=false`

```
倍率=False, Arabic=false → 42x16 | gap:4
  TEXT 'Subtext' → Gate Switzer 12.0px w400 lh:15.8 #84888c
```

**Crypto/Left coin/star** (2 变体)

- Active: False, True

代表变体: `Active=True`

```
Active=True → 16x16
  icon_star_fill → 16x16
```

**Crypto/Left coin36px** (1 变体)

- Type: Default

代表变体: `Type=Default`

```
Type=Default → 101x42 | gap:8
  _Crypto/Coin/item → 40x36 | gap:10
  Title+Subtitle → 53x42 | gap:2
```

**Crypto/Up-down** (36 变体)

- Type: Flat, Green, Red
- Style: Fill, Lined, Text
- Subtext: False, True
- Font: 15px, 16px

代表变体: `Type=Red, Style=Fill, Subtext=False, Font=15px, Arabic=false`

```
Type=Red, Style=Fill, Subtext=False, Font=15px, Arabic=false → 76x28 | r:6 | pad:0/12
  text → 76x28 | bg:#f74b60 | r:6 | pad:0/10 | gap:10
    TEXT '-16.86%' → Gate Switzer 14.0px w500 lh:18.5 #ffffff
```

<details><summary>内部子组件 (4 个)</summary>

**_Crypto/Left coin single row** (18 变体)
```
多链=False, Star=False, CheckBox=False, Subtext=False, Coin=True, Arabic=false → 122x56 | gap:8
  _Crypto/Coin/item → 24x24
    BTC → 24x24 | r:55
  title+subtext → 90x20 | gap:2
    Crypto/Left coin/title → 90x20 | gap:4
```

**_Crypto/Atom Price** (24 变体)
```
Style=Price, Dropdown=False, Font=15px, Arabic=false → 78x59 | gap:4
  title → 78x36
    price → 59x20 | gap:10
    sub-price → 78x16 | gap:10
```

**_Crypto/Atom Price/single row** (16 变体)
```
Style=Price, Dropdown=False, Font=15px, Arabic=false → 59x52
  title → 59x20
    price → 59x20 | gap:10
```

**_Crypto/Coin/item** (28 变体)
```
Style=Default, Size=32px → 32x32
  BTC → 32x32 | r:73
    Frame 11 → 32x32 | gap:11
```

</details>

#### Countdown 倒计时 (1138:58207)

**GTCountdown** (12 变体)

- Type: L-Group-Gary, M-Black, M-Gary, M-Group-Black, M-Group-Gary, S
- Time: DD/HH/MM/SS, HH/MM/SS

代表变体: `Type=M-Black, Time=HH/MM/SS`

```
Type=M-Black, Time=HH/MM/SS → 82x20 | gap:4
  dd → 20x20 | bg:#303236 | r:2 | pad:1/2
    TEXT '03' → Gate Switzer 12.0px w500 lh:15.8 #ffffff
  TEXT ':' → Gate Switzer 12.0px w500 lh:15.8 #c4c7ca
  dd → 20x20 | bg:#303236 | r:2 | pad:1/2
    TEXT '59' → Gate Switzer 12.0px w500 lh:15.8 #ffffff
  TEXT ':' → Gate Switzer 12.0px w500 lh:15.8 #c4c7ca
  dd → 20x20 | bg:#303236 | r:2 | pad:1/2
    TEXT '23' → Gate Switzer 12.0px w500 lh:15.8 #ffffff
```

#### Carousel 轮播指示器 (316:28369)

**GTCarousel** (18 变体)

- Item: 1, 2, 3, 4, 5
- Type: Line, Number, Thin

代表变体: `Item=5, Type=Line, Arabic=false`

```
Item=5, Type=Line, Arabic=false → 60x4 | bg:#000000 | r:999
  _GTCarousel/item → 12x4 | r:999
    lunbo → 12x4 | bg:#303236 | r:1
  _GTCarousel/item → 12x4 | r:999 | opacity:0.00
    lunbo → 12x4 | bg:#070808 | r:1
  _GTCarousel/item → 12x4 | r:999 | opacity:0.00
    lunbo → 12x4 | bg:#070808 | r:1
  _GTCarousel/item → 12x4 | r:999 | opacity:0.00
    lunbo → 12x4 | bg:#070808 | r:1
  _GTCarousel/item → 12x4 | r:999 | opacity:0.00
    lunbo → 12x4 | bg:#070808 | r:1
```

<details><summary>内部子组件 (2 个)</summary>

**_GTCarousel/item** (2 变体)
```
Status=Active → 12x4 | r:999
  lunbo → 12x4 | bg:#303236 | r:1
```

**_GTCarousel/item-Thin** (2 变体)
```
Status=Active → 12x2 | r:999
  lunbo → 12x4 | bg:#a0a3a7 | r:1
```

</details>

#### Grid 宫格 (316:31091)

**GTGrid（仅UI使用）** (4 变体)

- Type: Default, Sidebar
- Number: 4, 5

代表变体: `Type=Default, Number=4`

```
Type=Default, Number=4 → 375x82 | r:8 | pad:0/20
  icon → 335x82 | gap:8
    _1 → 78x67 | gap:4
    _2 → 78x67 | gap:4
    _3 → 78x82 | gap:4
    _4 → 78x67 | gap:4
```

<details><summary>内部子组件 (1 个)</summary>

**_add** (2 变体)
```
add=yes → 16x16
  icon_spotrecharge → 16x16
```

</details>

#### Banner 轮播 (1138:69294)

**Small Banner** (14 变体)

- Type: M, M-Custom-photoize, M-Customize, M-time, S, S-Custom-photoize, S-Customize

代表变体: `Type=M, Arabic=False`

```
Type=M, Arabic=False → 335x96 | bg:#f5f6f7 | r:12 | pad:12/16
  icon_close → 16x16
    union → 11x11 | bg:#a0a3a7
  Frame 2131336851 → 303x72 | gap:8
    _Small Banner → 72x72
    title → 207x60 | gap:8
  _GTCarousel → 27x17 | bg:#ffffff | r:99 | pad:2/6
    TEXT '1/4' → Switzer 10.0px w400 lh:13.2 #84888c
```

<details><summary>内部子组件 (1 个)</summary>

**_Small Banner** (2 变体)
```
Size=72px → 72x72
  Vector → 72x72
  Group → 54x53
    Vector → 18x18 | bg:#a7f757
    Vector → 18x13 | bg:#a7f757
    Group → 4x8
    Vector → 45x26 | bg:#0068ff
    Vector → 16x5 | bg:#ffffff
    Vector → 9x26 | bg:#000000
    Group → 50x24
    Vector → 49x8 | bg:#a7f757 | border:0.5px #070808
    Vector → 7x15 | bg:#a7f757
    Vector → 7x15 | bg:#ffffff
```

</details>

#### Collapse 下拉收起 (1176:48321)

**Faq** (6 变体)

- Expand: False, True
- Jump: False, True

代表变体: `Expand=False, Jump=False, Arabic=false`

```
Expand=False, Jump=False, Arabic=false → 375x70 | pad:0/20
```

**GTCollapse** (8 变体)

- Type: Title, Title+subtitle
- Open: False, True

代表变体: `Type=Title+subtitle, Open=False, Arabic=false`

```
Type=Title+subtitle, Open=False, Arabic=false → 375x75 | pad:16/20 | gap:12
```

**Ellipsis** (4 变体)

- Collapse: False, True
- Arrow: False, True

代表变体: `Collapse=False, Arrow=False`

```
Collapse=False, Arrow=False → 375x54 | pad:0/20
```

#### Description 描述列表 (1176:46109)

**GTDescription** (8 变体)

- Size: Medium, Small, XSmall(交易K线）
- Layout: Left-right, Up-down

代表变体: `Size=XSmall(交易K线）, Layout=Left-right, Arabic=false`

```
Size=XSmall(交易K线）, Layout=Left-right, Arabic=false → 335x13 | gap:29
  GTDescription/item/left 400 10px → 36x13
    left → 36x13
  _GTDescription/item/right 400 10px → 42x13
    left → 42x13
```

**GTDescription/item/left 400 14px** (4 变体)

- Underline: False, True

代表变体: `Underline=False, Arabic=false`

```
Underline=False, Arabic=false → 51x18 | gap:2
  left → 51x18 | gap:2
```

**GTDescription/item/right 500 14px** (6 变体)

- Underline: False, True
- Countdown: False, True

代表变体: `Underline=False, Countdown=False, Arabic=false`

```
Underline=False, Countdown=False, Arabic=false → 60x18 | gap:4
  icon+right → 60x18 | gap:2
```

**GTDescription/item/left 400 12px** (4 变体)

- Left Underline: False, True

代表变体: `Left Underline=False, Arabic=false`

```
Left Underline=False, Arabic=false → 43x16 | gap:2
  left → 43x16 | gap:2
```

**GTDescription/item/right 500 12px** (5 变体)

- Underline: False, True
- Countdown: False, True

代表变体: `Underline=False, Countdown=False, Arabic=false`

```
Underline=False, Countdown=False, Arabic=false → 52x16 | gap:4
  icon+right → 52x16 | gap:2
```

**GTDescription/item/left 400 10px** (2 变体)

- Size: 400 10px

代表变体: `Size=400 10px, Arabic=false`

```
Size=400 10px, Arabic=false → 36x13
  left → 36x13
```

<details><summary>内部子组件 (3 个)</summary>

**_GTDescription/item/right 400 10px** (2 变体)
```
Size=400 10px, Arabic=false → 42x13
  left → 42x13
```

**_GTDescription/item/up 400 14px** (4 变体)
```
Underline=False, Arabic=false → 335x18 | gap:4
  left → 48x18 | gap:4
    TEXT 'Subtext' → Gate Switzer 14.0px w400 lh:18.5 #84888c
```

**_GTDescription/item/down 500 14px** (4 变体)
```
Underline=False, Arabic=false → 335x18 | gap:4
  down+icon → 335x18 | gap:12
    down → 307x18 | gap:12
    icon_copy → 16x16
```

</details>

#### Empty 空状态 (190:23557)

**GTEmpty** (10 变体)

- Type: No Data, No community, No connection, No results found, Wallet with no assets
- Size: L, M

代表变体: `Type=No Data, Size=L`

```
Type=No Data, Size=L → 375x227 | gap:24
  empty → 375x171 | pad:0/48 | gap:12
    illustration → 88x88
    Contents → 279x71 | gap:8
  GTEmpty/button → 375x32 | pad:0/16
    GTButton → 68x32 | bg:#000000 | r:999 | pad:0/12
```

**GTEmpty/button** (3 变体)

- Button Two: 1, 2, 3

代表变体: `Button Two=1`

```
Button Two=1 → 375x32 | pad:0/16
  GTButton → 68x32 | bg:#000000 | r:999 | pad:0/12
```

**illustration** (10 变体)

- type: No Data, No community, No connection, No results found, Wallet with no assets
- size: L, M

代表变体: `type=No connection, size=M`

```
type=No connection, size=M → 56x56
  Rectangle 376730577 → 56x56
  Group 2147212855 → 46x32
```

#### Image 图片 (1138:69295)

**Image** (20 变体)

- Ratio: 16:9, 1:1, 3:1, 3:4
- Placeholder: False, True
- Error: False, True
- Dark: False, True

代表变体: `Ratio=1:1, Placeholder=False, Error=False, Dark=False`

```
Ratio=1:1, Placeholder=False, Error=False, Dark=False → 335x335
  Aspect ratio keeper # Additionally 45º rotated Auto Layout → 335x335
    Aspect ratio keeper # Rotated Auto Layout → 117x314
```

#### Progress 进度条 (1138:67995)

**GTProgress** (12 变体)

- Type: Line, Round
- Size: Large, Medium, Small, XSmall
- Text: False, True
- Trade: False, True
- Web3: False, True

代表变体: `Type=Line, Size=XSmall, Text=True, Trade=False, Web3=False, Arabic=false`

```
Type=Line, Size=XSmall, Text=True, Trade=False, Web3=False, Arabic=false → 335x13 | r:2 | gap:4
  Frame 1707483914 → 311x4 | bg:#dfe0e2 | r:999
    active → 79x4 | bg:#303236
    active → 79x4
    active → 79x4 | bg:#dfe0e2
    active → 79x4 | bg:#dfe0e2
  TEXT '25%' → Gate Switzer 10.0px w500 lh:13.2 #a0a3a7
```

#### Tag 标签 (316:16862)

**GTTag** (180 变体)

- Color: Blue, Gray, Green, Orange, Red
- Size: Medium, Small, X Small
- Disabled: False, True
- Close: False, True
- Prefix Icon: False, True
- icon i: False, True
- Dash: False, True

代表变体: `Color=Blue, Size=Small, Disabled=False, Close=False, Prefix Icon=False, icon i=False, Dash=False, Arabic=false`

```
Color=Blue, Size=Small, Disabled=False, Close=False, Prefix Icon=False, icon i=False, Dash=False, Arabic=false → 25x16 | bg:#ebf6ff | r:2
```

**GTTag Primary** (24 变体)

- Size: MD-20px, SM-16px, XSmall-14px
- Prefix Icon: False, True
- Suffix Icon: False, True
- Coin: False, True

代表变体: `Size=SM-16px, Prefix Icon=False, Suffix Icon=False, Coin=False, Arabic=false`

```
Size=SM-16px, Prefix Icon=False, Suffix Icon=False, Coin=False, Arabic=false → 49x16 | bg:#a7f757 | r:2 | pad:2/4
```

**GTTag PD** (16 变体)

- Type: Fall, Green Down, Green Up, Red Down, Red Up, Rise
- Size: Large-28px, Medium-24px, Small-16px

代表变体: `Type=Red Up, Size=Small-16px, Arabic=false`

```
Type=Red Up, Size=Small-16px, Arabic=false → 16x16 | bg:#ff2c58 | r:2
```

**VIP** (102 变体)

- Size: MD-20px, SM-16px, XS-14px
- Mode: Dark, Light
- Tier: 0, 1, 10, 11, 12, 13, 14, 15, 16, 2, 3, 4, 5, 6, 7, 8, 9

代表变体: `Size=SM-16px, Mode=Light, Tier=5`

```
Size=SM-16px, Mode=Light, Tier=5 → 46x16 | bg:#ffdc95 | r:2 | pad:T4/R6/B3/L5 | gap:2
```

**VIP-Bonus** (12 变体)

- Type: Primary, VIP
- Mode: Dark, Light
- Size: MD-20px, SM-16px, XS-14px

代表变体: `Type=VIP, Mode=Light, Size=XS-14px`

```
Type=VIP, Mode=Light, Size=XS-14px → 25x14 | bg:#ffd98c | r:2 | pad:T4/R4/B3/L4 | gap:2
```

### 录入

#### Dropdown 下拉选择框 (1176:46107)

**GTDropdown（仅设计侧使用）** (12 变体)

- Size: Large-48px, Medium-40px, Small-28px, XSmall-24px
- Status: Disabled, Inactive, unselect

代表变体: `Size=Small-28px, Status=Inactive`

```
Size=Small-28px, Status=Inactive → 335x28 | bg:#f5f6f7 | r:6 | pad:0/12 | gap:8
  text+i → 291x28 | gap:2
  _GTDropdown/line → 12x12
```

**Dropdown Text** (16 变体)

- Text: 400 10px, 500 12px, 500 14px, 500 16px
- Active: False, True

代表变体: `Text=500 14px, Active=False, Arabic=false`

```
Text=500 14px, Active=False, Arabic=false → 41x18
  Prefix → 41x18 | gap:8
```

<details><summary>内部子组件 (3 个)</summary>

**_GTDropdown/line** (2 变体)
```
active=no → 16x16
  icon_chevron_down → 16x16
```

**_GTDropdown/fill** (2 变体)
```
Active=no → 16x16
  icon_down_fill → 16x16
```

**_GTDropdown/prefix** (3 变体)
```
Type=Icon-20px → 20x20
  icon_gift → 20x20
```

</details>

#### Input 输入框 (642:13223)

**GTInput** (48 变体)

- Size: Large, Medium
- Status: Disable, Error, Finished, Normal, Pressed, Typing
- Label inline: False, True

代表变体: `Size=Large, Status=Normal, Label inline=True, Arabic=false`

```
Size=Large, Status=Normal, Label inline=True, Arabic=false → 335x98 | gap:8
  _GTInput/label → 335x18
  input → 335x48 | bg:#f5f6f7 | r:8 | pad:0/12 | gap:8
  _GTInput/helper → 59x16
```

**GTTextArea** (12 变体)

- Status: Disabled, Error, Finished, Normal, Pressed, Typing
- Word Limit: False, True

代表变体: `Status=Normal, Word Limit=False`

```
Status=Normal, Word Limit=False → 335x108 | r:8 | gap:8
  input → 335x108 | bg:#f5f6f7 | r:8 | pad:12/12
```

**Input_login** (24 变体)

- Status: Disable, Error, Finished, Normal, Pressed, Typing
- Dropdown: False, True

代表变体: `Status=Normal, Dropdown=False, Arabic=false`

```
Status=Normal, Dropdown=False, Arabic=false → 335x98 | gap:8
  _GTInput/label → 335x18
  input → 335x48 | bg:#f5f6f7 | r:8 | pad:0/12 | gap:12
  _GTInput/helper → 59x16
```

<details><summary>内部子组件 (11 个)</summary>

**_GTInput/password** (2 变体)
```
Password=False → 57x18
  text field → 57x18
```

**_GTInput/prefix-48px** (3 变体)
```
Type=Icon 1 → 20x20
  icon_gift → 20x20
```

**_Input_login/password** (2 变体)
```
Password=False → 65x21
  TEXT 'Text field' → Gate Switzer 16.0px w500 lh:21.1 #070808
```

**_Input_login/suffix** (5 变体)
```
Type=Hide → 24x24 | pad:2/2
  icon_hiddle → 20x20
```

**_GTInput/prefix-40px** (3 变体)
```
Type=lined → 3x12
  prefix → 3x12 | bg:#f7931a | r:6
```

**_GTInput/helper/suffix** (2 变体)
```
Action=False → 82x16
  Button Text → 82x16 | gap:4
```

**_GTInput/label/suffix** (3 变体)
```
Dropdown=False, Icon=False → 76x18
  Button Text → 76x18 | gap:2
```

**_GTInput/suffix-48px** (9 变体)
```
Type=icon-1 → 24x24 | pad:2/2
  icon_edit → 20x20
```

**_GTInput/suffix-40px** (9 变体)
```
Type=Icon 2 → 48x16 | gap:8
  icon_edit → 16x16
  Line 55 → 0x16 | border:1.0px #c4c7ca
  icon_filter → 16x16
```

**_GTInput/helper** (26 变体)
```
Helper=True, Icon i=False, Subtext=False, Error=False, Hyperlink=False, Underline=False, Arabic=false → 59x16
  helper → 59x16
```

**_GTInput/label** (32 变体)
```
*=False, Icon i=False, Prefix Icon=False, Subtext=False, CheckBox=False, Suffix=False, Dropdown=False, Arabic=false → 35x18
  TEXT 'Label' → Gate Switzer 14.0px w400 lh:18.5 #070808
```

</details>

#### NumberInput 数字输入框 (1125:11980)

**GTNumberInput（flutter）** (10 变体)

- Status: Active, Error, Inactive, Inactive-resend, Typing

代表变体: `Status=Inactive, Arabic=false`

```
Status=Inactive, Arabic=false → 375x90 | pad:0/20 | gap:16
  number → 335x56 | gap:8
  GTButtonText → 89x18 | gap:2
```

<details><summary>内部子组件 (1 个)</summary>

**_GTNumberInput/status** (6 变体)
```
Status=Active → 48x56 | bg:#f5f6f7 | border:1.0px #303236 | r:8
  TEXT '1' → Gate Switzer 28.0px w600 lh:37.0 #070808
```

</details>

#### Search 搜索框 (209:9726)

**GTSearch** (72 变体)

- Status: Active, Finished, Inactive, Searching
- Size: Medium, Small
- Cancel: False, True
- Suffix: False, True
- Scan: False, True

代表变体: `Status=Inactive, Size=Medium, Cancel=False, Suffix=False, Scan=False, Arabic=false`

```
Status=Inactive, Size=Medium, Cancel=False, Suffix=False, Scan=False, Arabic=false → 375x40 | pad:0/20 | gap:12
  Search → 335x40 | bg:#f5f6f7 | r:999 | pad:12/12 | gap:6
    icon_search → 20x20
    text → 285x18
```

<details><summary>内部子组件 (2 个)</summary>

**_GTSearch/suffix-20px** (3 变体)
```
Type=Icon-1 → 20x24
  icon → 20x20 | gap:10
```

**_GTSearch/suffix-16px** (3 变体)
```
Type=Icon-1 → 16x24
  icon → 16x24 | gap:10
```

</details>

#### Stepper 步进器 (1138:69328)

**GTStepper** (48 变体)

- Style: %百分, Default
- Status: Disabled, Error, Finished, Normal, Pressed, Typing
- Size: Large, Medium, Small

代表变体: `Style=Default, Status=Normal, Size=Medium, Arabic=false`

```
Style=Default, Status=Normal, Size=Medium, Arabic=false → 335x40 | bg:#f5f6f7 | r:6 | pad:0/12
  text → 311x18
    TEXT 'Label' → Gate Switzer 14.0px w500 lh:18.5 #a0a3a7
```

<details><summary>内部子组件 (2 个)</summary>

**_GTStepper/status 20px** (4 变体)
```
Type=Subtract, Disabled=False → 20x24
  jianhao → 20x24
```

**_GTStepper/status 16px** (4 变体)
```
Type=Subtract, Disabled=False → 16x24
  jianhao → 16x24
```

</details>

#### NumberKeyBoard 数字键盘 (1125:11981)

**GTNumberKeyBoard** (8 变体)

- Status: Normal, Pressed
- Shortcut keys: False, True
- Decimal Point: False, True

代表变体: `Status=Normal, Shortcut keys=False, Decimal Point=False`

```
Status=Normal, Shortcut keys=False, Decimal Point=False → 375x318 | bg:#ffffff
  Number → 375x208
    123 → 375x48
    456 → 375x48
    789 → 375x48
    .0x → 375x48
  GTFooterButton → 375x76 | pad:16/20
    GTButton → 335x44 | bg:#0055ff | r:999 | pad:0/24
  HomeIndicator → 375x34
    Home Indicator → 134x5 | bg:#070808 | r:100
```

**GTNumberKeyBoard iOS** (10 变体)

- Type: Alfabetic, Input, Numeric
- Done: False, True
- App Dark: False, True

代表变体: `Type=Alfabetic, Done=False, App Dark=False`

```
Type=Alfabetic, Done=False, App Dark=False → 375x293 | bg:#d3d6dd | backdrop-blur:70
  _iPhone / Alphabet (QWERTY) → 375x169 | backdrop-blur:70
    Bottom Row → 260x43
    Middle Row → 336x43
    Top Row → 364x43
    _Keys / Icon → 42x43 | bg:#ffffff | r:5 | shadow:(0,1) blur:0 #000000 (30%)
    _Keys / Icon → 42x42 | bg:#aeb3be | r:5 | shadow:(0,1) blur:0 #000000 (30%)
  _iPhone / Controller portrait → 375x124
    home indicator → 133x6 | bg:#0c0507 | r:3
    Mic → 42x42
    Emojis → 42x42
    Space → 182x43 | bg:#ffffff | r:5 | shadow:(0,1) blur:0 #000000 (30%)
    _Keys / Label → 87x43 | bg:#aeb3be | r:5 | shadow:(0,1) blur:0 #000000 (30%)
    _Keys / Label → 87x43 | bg:#aeb3be | r:5 | shadow:(0,1) blur:0 #000000 (30%)
```

<details><summary>内部子组件 (1 个)</summary>

**_GTNumberKeyBoard/item** (4 变体)
```
Type=Number, Status=Default → 125x48 | r:8
  TEXT '1' → Gate Switzer 24.0px w600 lh:31.7 #070808
```

</details>

#### Rating 评分 (1138:69302)

**GTRating** (24 变体)

- Grading: 0, 1, 2, 3, 4, 5
- Size: L-20px, S-12px

代表变体: `Grading=0, Size=L-20px, Arabic=false`

```
Grading=0, Size=L-20px, Arabic=false → 132x20 | gap:8
  icon_star_fill → 20x20
    union → 17x16 | bg:#a0a3a7
  icon_star_fill → 20x20
    union → 17x16 | bg:#a0a3a7
  icon_star_fill → 20x20
    union → 17x16 | bg:#a0a3a7
  icon_star_fill → 20x20
    union → 17x16 | bg:#a0a3a7
  icon_star_fill → 20x20
    union → 17x16 | bg:#a0a3a7
```

<details><summary>内部子组件 (1 个)</summary>

**_GTSliderV5/item** (12 变体)
```
State=Process, Size=Small, Label=False, Arabic=false → 68x24
  Frame 1312320432 → 10x24 | gap:8
  Frame 1312320433 → 66x12 | gap:10
```

</details>

#### Slider 滑动条 (298:31129)

**GTSlider** (66 变体)

- Type: Default, Text, Tooltip
- Percentage: 0%, 100%, 25%, 50%, 75%
- Slider: 1, 3, 5

代表变体: `Type=Default, Percentage=0%, Slider=5, Arabic=false`

```
Type=Default, Percentage=0%, Slider=5, Arabic=false → 200x24
  GTSlider/item → 54x24
    Frame 1312320432 → 10x24 | gap:8
    Frame 1312320433 → 52x12 | gap:10
  GTSlider/item → 54x24
    Frame 1312320432 → 6x24 | gap:8
    Frame 1312320433 → 54x12 | gap:10
  GTSlider/item → 54x24
    Frame 1312320432 → 6x24 | gap:8
    Frame 1312320433 → 54x12 | gap:10
  GTSlider/item → 54x24
    Frame 1312320432 → 6x24 | gap:8
    Frame 1312320433 → 54x12 | gap:10
  GTSlider/item → 6x24
    Frame 1312320432 → 6x24 | gap:8
```

**GTIntervalSlider** (15 变体)

- Type: RangeSlider, SingleSlider
- State: Default, Text, Tooltip
- Percentage: 0%, 100%, 50%

代表变体: `Type=RangeSlider, State=Default, Percentage=50%`

```
Type=RangeSlider, State=Default, Percentage=50% → 240x24
  line/1 → 73x12
    Frame 1312320433 → 73x12 | gap:10
      Rectangle 7041 → 73x2 | bg:#dfe0e2
  Frame 1312320432 → 10x24 | gap:8
    Rectangle 346271010 → 10x10 | bg:#ffffff | border:1.5px #303236 | r:999
  Line/Small/False/false → 73x12
    Frame 1312320433 → 73x12 | gap:10
      Rectangle 7041 → 73x2 | bg:#303236
  GTSlider/item → 10x24
    Frame 1312320432 → 10x24 | gap:8
      Rectangle 346271010 → 10x10 | bg:#ffffff | border:1.5px #303236 | r:999
  line/1 → 73x12
    Frame 1312320433 → 73x12 | gap:10
      Rectangle 7041 → 73x2 | bg:#dfe0e2
```

**GTSlider/item** (12 变体)

- State: Finish, Process, Wait
- Size: Small
- Label: False, True

代表变体: `State=Process, Size=Small, Label=False, Arabic=false`

```
State=Process, Size=Small, Label=False, Arabic=false → 68x24
  Frame 1312320432 → 10x24 | gap:8
    Rectangle 346271010 → 10x10 | bg:#ffffff | border:1.5px #303236 | r:999
  Frame 1312320433 → 66x12 | gap:10
    Rectangle 7041 → 66x2 | bg:#dfe0e2
```

#### TimePicker 时间选择器 (1176:46104)

**GTTimePicker** (8 变体)

- Selector（flutter）: False, True
- Dropdown（flutter）: False, True

代表变体: `Selector（flutter）=False, Dropdown（flutter）=False, Arabic=false`

```
Selector（flutter）=False, Dropdown（flutter）=False, Arabic=false → 375x812
  GTPopupV5/Scrim → 375x812 | bg:#000000
  popup → 375x812
```

<details><summary>内部子组件 (5 个)</summary>

**_GTTimePicker/date input** (3 变体)
```
Status=Inactive → 120x40 | bg:#f5f6f7 | r:6
```

**_GTTimePicker/column/option** (3 变体)
```
Select=False, Disabled=False → 73x41 | pad:10/12
```

**_GTTimePicker/column/item** (5 变体)
```
Amount=1 → 118x236
```

**_GTTimePicker/range/option** (3 变体)
```
Number=2 → 375x56 | pad:8/20 | gap:8
```

**_GTTimePicker/column** (4 变体)
```
Number=1, Dark=False → 375x236 | bg:#ffffff
```

</details>

#### Upload 上传 (1138:69297)

**GTUpload** (14 变体)

- Status: Before Upload, Delete, Progress Props
- Type: Image, MP3, MP4, PDF, TXT
- Size: Large, Small

代表变体: `Status=Before Upload, Type=Image, Size=Large`

```
Status=Before Upload, Type=Image, Size=Large → 104x104 | gap:4
  Frame 2 → 104x104 | bg:#f5f6f7 | r:6
    icon_add → 24x24
```

> 总计: 166 个 COMPONENT_SET, 2192 个变体