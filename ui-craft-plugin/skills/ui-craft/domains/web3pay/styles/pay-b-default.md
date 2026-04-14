# Pay-B Default — 商户后台默认风格

---

## 区块 1: 元信息

```yaml
name: pay-b-default
description: GTPay 商户后台默认风格 — 极简白底、品牌绿点缀、高信息密度
mode: light
inherits: none
source_urls:
  - figma://tlFIl7F7A7Zl6e9WRLMDZo
extracted_at: 2026-03-17
calibrated_at: 2026-03-17
```

---

## 区块 2: 风格画像

- **视觉情绪**：专业、克制、高效
- **核心组件**：Table、Filter Pill、Stat Card、Sidebar
- **强调方式**：绿色品牌色点缀（Sidebar 选中态、Filter 已选值、Tag 成功态）
- **适用标签**：`B端` `后台` `商户` `支付`

| 维度 | 本风格 | 说明 |
|------|--------|------|
| 色温 | 中性偏冷 | 白底灰字，几乎无暖色 |
| 信息密度 | 高 | 紧凑表格、窄间距、多列数据 |
| 装饰程度 | 极简 | 无渐变、无阴影装饰、无圆角卡片（仅 8px 微圆角） |
| 色彩饱和度 | 低 | 仅 Tag 和 Active 态有彩色，整体灰度为主 |

---

## 区块 3: CSS 变量表

> 从截图精确校准，匹配 Figma 真实设计。

### 3.1 颜色变量

| 变量 | 值 | 说明 |
|------|-----|------|
| `--bg` | `#FFFFFF` | 页面白底 |
| `--bg-sidebar` | `#FAFBFC` | 侧栏极浅灰（与白底做微区分） |
| `--bg-card` | `#FFFFFF` | 卡片白底 |
| `--bg-secondary` | `#FAFAFA` | 次级背景 |
| `--bg-muted` | `#F5F6F7` | 按钮/Hover 底色 |
| `--bg-stat` | `#1F2024` | 统计卡片深色背景 |
| `--text-stat-label` | `#A0A3A7` | 卡片标签色（浅灰在深底上） |
| `--text-stat-val` | `#FFFFFF` | 卡片数值色（白色） |
| `--text-stat-unit` | `#84888C` | 卡片币种单位色 |
| `--text-primary` | `#070808` | 主文字（近黑） |
| `--text-secondary` | `#84888C` | 辅助文字 |
| `--text-tertiary` | `#A0A3A7` | 三级文字 |
| `--text-quaternary` | `#C4C7CA` | 禁用/最淡文字 |
| `--text-neutral` | `#4F4F4F` | 表格数据行文字 |
| `--text-brand` | `#68AD00` | 品牌强调绿 |
| `--gtpay-color-brand` | `#ADF73E` | GTPay 品牌色（亮绿） |
| `--gtpay-text-brand` | `#68AD00` | 品牌文本色 |
| `--gtpay-color-buttonhover` | `#8BD121` | 品牌按钮 Hover |
| `--gtpay-component-hover` | `#E6F4D2` | 组件 Hover 浅绿 |
| `--border` | `#ECEDEF` | 主边框色 |
| `--border-strong` | `#DFE0E2` | 加强边框 |
| `--divider-short` | `#C4C7CA` | 分割线 |
| `--divider-strong` | `#F2F3F4` | 弱分割线 |
| `--success` | `#68AD00` | 成功色（品牌绿） |
| `--warning` | `#FF6600` | 警告橙 |
| `--error` | `#EF4444` | 错误红 |
| `--info` | `#0068FF` | 信息蓝 |
| `--sidebar-active` | `#E6F4D2` | Sidebar 选中态背景 |
| `--sidebar-special` | `#E6F4D2` | Sidebar 特殊项背景 |
| `--tag-grey-bg` | `#F5F6F7` | Tag 灰底 |
| `--tag-grey-text` | `#84888C` | Tag 灰字 |
| `--tag-green-bg` | `#E6F4D2` | Tag 绿底 |
| `--tag-green-text` | `#68AD00` | Tag 绿字 |
| `--tag-yellow-bg` | `#FFF3E0` | Tag 黄底 |
| `--tag-yellow-text` | `#FF6600` | Tag 黄字 |
| `--tag-red-bg` | `#FEE2E2` | Tag 红底 |
| `--tag-red-text` | `#EF4444` | Tag 红字 |
| `--tag-blue-bg` | `#DBEAFE` | Tag 蓝底 |
| `--tag-blue-text` | `#0068FF` | Tag 蓝字 |

### 3.2 圆角变量

| 变量 | 值 | 说明 |
|------|-----|------|
| `--radius-card` | `8px` | 统计卡片 |
| `--radius-btn` | `99px` | 胶囊按钮 |
| `--radius-input` | `6px` | 输入框/菜单项 |
| `--radius-tag` | `4px` | 状态标签 |
| `--radius-dropdown` | `8px` | 下拉面板 |
| `--radius-pill` | `100px` | Filter Pill |
| `--radius-bar` | `99px` | 柱状图圆角（全圆角，柱宽 8px 细条） |
| `--radius-table-wrap` | `0px` | 表格容器（截图无圆角） |

### 3.3 间距系统（Spacing System）

> **全局页面布局 Spacing 规范，后续所有 Pay B 端页面统一遵循**

#### 基础间距变量

| 变量 | 值 | 说明 |
|------|-----|------|
| `--space-xs` | `4px` | 最小间距 |
| `--space-sm` | `8px` | 小间距（标签与数值之间） |
| `--space-md` | `12px` | 中间距（筛选项之间、子菜单项之间） |
| `--space-base` | `16px` | 基础间距 |
| `--space-lg` | `20px` | 大间距（卡片网格 gap） |
| `--space-xl` | `24px` | 加大间距 |
| `--space-2xl` | `32px` | 双倍间距 |

#### 页面布局间距

> **已迁移至 `layout.md` → Pay-B 商户后台布局 → 页面布局间距**
> 所有页面级 spacing 变量（`--space-page`、`--space-section`、`--space-title-to-content` 等）请参考 `layout.md`。

### 3.6 图标尺寸规范（Icon Sizing）

> **标准图标：容器尺寸 + 2px 留白 = 实际 SVG 尺寸**
> 所有图标统一遵循此规则，SVG 通过容器 `padding:2px; box-sizing:border-box` 实现留白。

| 容器类 | 容器尺寸 | 留白 | SVG 尺寸 | 适用场景 |
|--------|----------|------|----------|---------|
| `.icon-lg` | **20×20px** | 2px | 16×16px | stat-card 前导图标、功能图标 |
| `.icon-sm` | **16×16px** | 2px | 12×12px | info ⓘ 提示图标、辅助图标 |
| `.sidebar__item-icon` | **20×20px** | 2px | 16×16px | 侧边栏菜单图标 |
| `.sidebar__item-arrow` | **16×16px** | 2px | 12×12px | 侧边栏展开箭头 |
| `.header__icon-btn` | **24×24px** | 2px | 20×20px | Header 工具栏图标 |

#### CSS 实现

```css
/* 大图标容器 (20px → 16px 内容) */
.icon-lg {
  width: 20px; height: 20px;
  display: inline-flex; align-items: center; justify-content: center;
  padding: 2px; box-sizing: border-box; flex-shrink: 0;
}
.icon-lg svg { width: 100%; height: 100%; display: block; }

/* 小图标容器 (16px → 12px 内容) */
.icon-sm {
  width: 16px; height: 16px;
  display: inline-flex; align-items: center; justify-content: center;
  padding: 2px; box-sizing: border-box; flex-shrink: 0;
}
.icon-sm svg { width: 100%; height: 100%; display: block; }

/* Header 图标 (24px → 20px 内容) */
.header__icon-btn {
  width: 24px; height: 24px; padding: 2px;
}

/* Sidebar 菜单图标 (20px → 16px 内容) */
.sidebar__item-icon {
  width: 20px; height: 20px; padding: 2px; box-sizing: border-box;
}

/* Sidebar 箭头 (16px → 12px 内容) */
.sidebar__item-arrow {
  width: 16px; height: 16px; padding: 2px; box-sizing: border-box;
}
```

#### 元素间距

| 场景 | gap | 说明 |
|------|-----|------|
| `.stat-card__label` | **8px** | 前导图标 ↔ 文字 ↔ 信息图标 |
| Filter pill 内部 | **8px** | 图标 ↔ 文字 |
| 按钮内部 | **8px** | 图标 ↔ 文字 |

#### 页面垂直节奏 / CSS 实现 / 规则总结

> **已迁移至 `layout.md` → Pay-B 商户后台布局**
> 包含：页面垂直节奏示意图、CSS 实现参考、间距规则总结。

### 3.4 字体

> **全局优先使用 `Gate_Sans` 字体**

| 属性 | 值 | 说明 |
|------|-----|------|
| 主字体 | `Gate_Sans` | Gate.io 品牌字体，优先加载 |
| Fallback | `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif` | 系统字体降级 |
| 字重覆盖 | Regular(400) / Medium(500) / SemiBold(600) / Bold(700) | 通过全局 `@font-face` 加载 |
| 抗锯齿 | `-webkit-font-smoothing: antialiased` | 全局开启 |

```css
font-family: 'Gate_Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

**规则：**
- 所有页面、组件**禁止**额外声明 `font-family`，统一继承全局 `Gate_Sans`
- 仅通过 `font-weight` 控制字重变化（500 / 600 / 700）
- HTML 预览场景若未加载字体文件，自动 fallback 到系统字体

### 3.5 排版覆盖

> **字重规则：全局最轻 500，无 400；>16px 标题/数值 600；页面主数值 700**
> - 全局基础: `14px / 500`（`.page` 根元素）
> - **全局最小字号 14px**，不允许出现 <14px 的文字
> - 全局最轻字重为 **500**（正文、标签、子菜单、按钮、Tag、筛选、表格数据等，不使用 400）
> - 页面主数值: **700**（64px，后台最大字体）
> - >16px 的标题/数值: **600**（统计卡片 48px、一级标题 36px、二级标题 32px、余额 28px、Tab 选中 18px）

| Token | 字号 | 字重 | 说明 |
|-------|------|------|------|
| **全局基础** | **14px** | **500** | 根元素默认值，全局最轻字重为 500 |
| 页面主数值 | 64px | **700** | 后台最大字体，Dashboard/Balance 顶部大数字 + 币种 |
| 统计数值 | 48px | **600** | `.stat-card__value`，统计卡片数字 |
| 一级标题 H1 | 36px | **600** | `h1.page-title`，页面顶部主标题 |
| 二级标题 H2 | 32px | **600** | 区块标题如 Today's Total Payments、Balance、Data Overview |
| 余额数值 | 28px | **600** | `.balance-card__value` |
| Tab 选中 | 18px | **600** | `.tab-underline__item--active`，3px×16px 居中下划线 |
| 统计标签 | 18px | 500 | `.stat-card__label`，卡片标签文字，**一级色 `--text-primary`** |
| 百分比变化 | 18px | 500 | `↑ 15%` 等涨跌百分比，绿涨 `#68AD00` / 红跌 `#EF4444` |
| Tab 未选中 | 18px | 500 | 继承基础 |
| 统计币种 | 20px | **600** | `.stat-card__unit`，**一级色 `--text-primary`** |
| 表头 | 14px | **600** | `th` 特殊加粗 |
| 表格数据 | 16px | 500 | 继承基础 |
| 侧边栏一级 | 14px | **600** | `.sidebar__item-text` 一级菜单加粗 |
| 侧边栏子菜单 | 14px | 500 | 继承基础 |
| 侧边栏分组标签 | 14px | 500 | 继承基础 |
| 按钮 | 14px | 500 | 全局统一 40px 高 × 左右 20px padding，宽度随文字自适应 |
| 筛选标签 | 14px | 500 | `.filter-pill`，高度 32px，左右 12px padding |
| Tag 标签 | 14px | 500 | 继承基础，全局最小字号 14px |

#### CSS 排版规范代码

```css
/* ===== 全局排版变量 ===== */
:root {
  --font-weight-bold: 700;
  --font-weight-semibold: 600;
  --font-weight-medium: 500;

  --font-size-hero: 64px;      /* 页面主数值 */
  --font-size-stat: 48px;      /* 统计卡片数值 */
  --font-size-h1: 36px;        /* 一级标题 */
  --font-size-h2: 32px;        /* 二级标题 */
  --font-size-balance: 28px;   /* 余额数值 */
  --font-size-tab: 18px;       /* Tab / 统计标签 */
  --font-size-body: 16px;      /* 表格数据 / 统计币种 */
  --font-size-base: 14px;      /* 全局基础 */
  --font-size-tag: 14px;       /* Tag 标签（全局最小字号） */
}

/* ===== 全局基础 ===== */
.page {
  font-family: 'Gate_Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  color: #070808;
}

/* 表单元素继承 */
button, input, select, textarea {
  font: inherit;
}

/* ===== 页面主数值（后台最大字体） ===== */
.hero-value {
  font-size: var(--font-size-hero);
  font-weight: var(--font-weight-bold);
  font-variant-numeric: tabular-nums;
}

/* ===== 统计卡片 ===== */
.stat-card {
  height: 176px;
  padding: 32px;
  border: 1px solid var(--border);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.stat-card--chart {
  height: 375px;
  display: flex;
  flex-direction: column;
}
.stat-card__value {
  font-size: var(--font-size-stat);
  font-weight: var(--font-weight-semibold);
  font-variant-numeric: tabular-nums;
}
.stat-card__label {
  font-size: var(--font-size-tab);
  font-weight: var(--font-weight-medium);
  color: var(--text-primary);
}

/* ===== 标题层级 ===== */
.page-title, h1 {
  font-size: var(--font-size-h1);
  font-weight: var(--font-weight-semibold);
}
h2 {
  font-size: var(--font-size-h2);
  font-weight: var(--font-weight-semibold);
}

/* ===== 余额数值 ===== */
.balance-card__value {
  font-size: var(--font-size-balance);
  font-weight: var(--font-weight-semibold);
  font-variant-numeric: tabular-nums;
}

/* ===== Tab ===== */
.tab-underline__item {
  font-size: var(--font-size-tab);
  font-weight: var(--font-weight-medium);
}
.tab-underline__item--active {
  font-weight: var(--font-weight-semibold);
}

/* ===== 表格 ===== */
th {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
}
td {
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-medium);
}

/* ===== 按钮（全局统一 40px 高度 + 左右 20px 内边距） ===== */
.btn-primary,
.btn-secondary,
.filter-bar__btn {
  height: 40px;
  padding: 0 20px;
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  border-radius: 99px;
  white-space: nowrap;
}

/* ===== 侧边栏 ===== */
.sidebar__item-text {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
}
.sidebar__sub-item-inner {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
}
```

---

## 区块 4: 布局结构

> **已整体迁移至 `layout.md` → Pay-B 商户后台布局**
> 包含：整体框架图、完整菜单结构、关键布局规格表、Sidebar 各子组件结构（商户信息卡片/菜单项/分组标签/二级子菜单）、校准差异对照表。
> Sidebar 组件详细规格请参考 `pay-b-sidebar.md`。

---

## 区块 5: 组件变体

### Stat Card 统计卡片

```
┌────────────────────────────┐
│ 实收金额 ⓘ          9 笔  │  ← 14px/400 灰色 + tooltip icon + 可选附注
│                            │
│ 16,242.82 USD              │  ← 36px/600 黑色 + 16px/400 灰色币种
└────────────────────────────┘
```

| 属性 | 值 |
|------|-----|
| 背景 | `var(--bg-card)` #FFFFFF 白色 |
| 边框 | `1px solid var(--border)` #ECEDEF 细边框 |
| 圆角 | `12px` |
| 内边距 | `20px 24px` |
| 标签色 | `var(--text-primary)` #070808 一级色 |
| 数值色 | `var(--text-primary)` #070808 近黑 |
| 币种色 | `var(--text-primary)` #070808 一级色，20px/600 |

### Balance 余额页面 / 设置中心

> **已迁移至 `layout.md` → 页面模板：Balance 余额页 / 页面模板：设置中心**
> 包含完整布局结构图、组件规格表、自适应规则。

### Tab 导航

```
 订单    批次
 ────
```

| 属性 | 值 |
|------|-----|
| 选中 | `16px / 600`，`var(--text-primary)`，底部 3px × 16px 居中下划线 |
| 未选中 | `16px / 400`，`var(--text-tertiary)` |
| 间距 | Tab 间 `32px` |
| 下划线 | `3px solid var(--text-primary)`，宽度 16px 居中（`::after` 伪元素 + `left:50%; transform:translateX(-50%)`），`bottom:-1px` 与容器底线重叠 |

### Filter Pill 筛选标签

```
[⊙ 按照订单创建时间  2025-11-03 → 2025-12-02 ∨]
[⊙ 按照商户订单号]
[⊙ 更多筛选]
[重置]              ← 红色文字，无边框
```

| 属性 | 值 |
|------|-----|
| 边框 | `1px dashed var(--divider-short)` |
| 圆角 | `100px` 胶囊 |
| 已选日期色 | `var(--text-brand)` #68AD00 |
| 箭头连接符 | `→`（右箭头） |

### 操作按钮组（右侧）

```
[↓ 下载现货账单]  [↓ 导出]  [≡ 编辑列]
```

| 属性 | 值 |
|------|-----|
| 类型 | Secondary |
| 高度 | 36px |
| 边框 | `1px solid var(--border-strong)` |
| 圆角 | `var(--radius-btn)` |

### LeftSidebar 左侧导航

> **完整规格请参考 `pay-b-sidebar.md`（v1.5.0 · Figma `8121:10355`）**
> 包含：容器规格、商户信息卡片、一级/二级菜单项、交互规则、特殊菜单项。

### Pagination 分页

```
          < 1  2  3  ...  12 >
```

| 属性 | 值 |
|------|-----|
| 对齐 | **居中** `justify-content: center` |
| 位置 | 表格底部，`padding: 24px 0 0` |
| 间距 | `gap: 8px` |
| 按钮尺寸 | 28×28px，`border-radius: 100px` |
| 字号/字重 | 14px / 500 |
| 默认色 | `#070808` |
| Active 态 | `background: #F5F6F7` |
| Disabled 态 | `color: #C4C7CA`，`cursor: not-allowed` |
| Hover | `background: #F5F6F7`（disabled/ellipsis 无 hover） |

---

## 区块 6: 自检清单

### 自检清单

- [x] [B] 全部颜色通过 CSS 变量引用
- [x] [B] font-family 使用 `'Gate_Sans'` + 系统字体 fallback
- [x] [B] 间距 4px 倍数
- [x] [B] 圆角层级正确
- [x] [W] 信息密度匹配 B 端规范（紧凑间距）
- [x] [W] 统计数值 tabular-nums 等宽
- [x] [W] 表格行高 56px（比之前的 72px 更紧凑，匹配截图）
- [x] [B] Tag 标签颜色语义正确
- [x] [W] 截断文本配 copy 图标

### 适用场景

- GTPay 商户后台所有列表页（收款/下发/余额/客户）
- 数据报表页面
- 后台管理类页面

### 不适用场景

- Web3/Pay App 端页面（使用 App 组件规范）
- Campaign 活动页（使用 campaign 域）
