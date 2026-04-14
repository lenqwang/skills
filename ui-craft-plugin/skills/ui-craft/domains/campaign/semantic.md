# Campaign 语义 Token

> Campaign 域设计决策层，定义活动页的颜色、排版、间距语义 Token。
> 代码中通过 CSS 变量（`var(--xxx)`）引用语义 Token，变量在 `.page` wrapper 中定义。

---

---

## 表面色 (Surface)

| Token | 深色模式 | 浅色模式 | 用途 |
|-------|----------|----------|------|
| `surface.background` | `gray.1000` (#070808) | `white` (#FFFFFF) | 页面背景 |
| `surface.default` | `gray.925` (#18191B) | `gray.50` (#FAFAFA) | 卡片背景 |
| `surface.muted` | `gray.950` (#131516) | `gray.100` (#F2F3F4) | 弱化区块背景 |
| `surface.border` | `gray.800` (#303236) | `gray.200` (#DFE0E2) | 边框/分割线 |
| `surface.elevated` | `gray.800` (#303236) | — | 弹窗等浮层背景 |
| `surface.modal` | `gray.900` (#1F2023) | — | 弹窗主体背景 |
| `surface.overlay` | `black.60` | — | 全屏遮罩层 |
| `surface.countdown.item` | `white.10` | — | 倒计时块背景 |

### 活动页变体

| Token | 色值 | 用途 |
|-------|------|------|
| `surface.campaign.black` | `black` (#000000) | 活动页黑卡背景 |
| `surface.campaign.white` | `white` (#FFFFFF) | 活动页白卡背景 |
| `surface.campaign.blue` | `blue.500` (#0068FF) | 活动页强调蓝卡 |

---

## 文字色 (Text)

| Token | 深色模式 | 浅色模式 | 用途 |
|-------|----------|----------|------|
| `text.primary` | `gray.50` (#FAFAFA) | `gray.1000` (#070808) | 主要文字 |
| `text.secondary` | `gray.400` (#A0A3A7) | `gray.500` (#84888C) | 次要文字 |
| `text.tertiary` | `gray.500` (#84888C) | `gray.400` (#A0A3A7) | 占位符文字 |
| `text.disabled` | `gray.700` (#484B51) | `gray.500` (#84888C) | 禁用文字 |
| `text.inverse` | `gray.1000` (#070808) | `gray.50` (#FAFAFA) | 操作背景上的文字 |

### 活动页变体

| Token | 色值 | 用途 |
|-------|------|------|
| `text.campaign.white` | `white` (#FFFFFF) | 黑卡/蓝卡上的主文字 |
| `text.campaign.white-muted` | `white` + `opacity.70` | 黑卡/蓝卡上的次要文字 |
| `text.campaign.black` | `black` (#000000) | 白卡上的主文字 |
| `text.campaign.black-muted` | `black` + `opacity.70` | 白卡上的次要文字 |

### 其他文本语义

| Token | 值 | 用途 |
|-------|-----|------|
| `text.modal.title` | `white`，居中 | 弹窗标题 |
| `text.rank` | `fontSize.base` (14px) | 排行榜文字 |
| `text.table.dense` | `fontSize.sm` (12px) | 表格密排 |

---

## 操作色 (Action)

| Token | 色值 | 用途 |
|-------|------|------|
| `action.primary` | `blue.500` (#0068FF) | 主操作（品牌蓝） |
| `action.primary.hover` | `blue.600` (#004FD9) | 主操作悬停 |
| `action.primary.active` | `blue.700` (#003CB3) | 主操作按下 |
| `action.neutral` | `gray.800` (#303236) | 中性操作 |
| `action.neutral.hover` | `gray.700` (#484B51) | 中性操作悬停 |
| `action.secondary.bg` | `gray.900` (#1F2023) | 次要操作背景 |
| `action.subtle` | `blue.200` (#7ABDFF) | 柔和蓝色背景 |

### 活动页 CTA 变体

| Token | 色值 | 用途 |
|-------|------|------|
| `action.campaign.primary` | `white` 背景 + `black` 文字 | Hero 主 CTA（白底黑字） |
| `action.campaign.secondary` | `black` 背景 + `white` 文字 | 去交易等次要 CTA |
| `action.campaign.accent` | `accent.lime` (#A7F757) 背景 + `black` 文字 | 完成任务等强调 CTA（绿底黑字） |

---

## 强调色 (Accent)

> **--brand 和 --accent 由各 domain 定义**，不在 core 层固定。

| Token | 默认值 | CSS 变量 | 用途 | 定义层 |
|-------|--------|----------|------|--------|
| `accent.highlight` | 由 domain 定义 | `--accent` | 金额/数值高亮 | Campaign: style 定义; Exchange: #0068FF; Web3: #17E5A1 |
| `accent.brand` | 由 domain 定义 | `--brand` | 品牌强调 | Campaign: style 定义; Exchange: #0068FF; Web3: #17E5A1 |

---

---

## 状态色 (Status)

| Token | 色值 | 用途 |
|-------|------|------|
| `status.success` | `green.500` (#50A907) | 成功 |
| `status.warning` | `yellow.400` (#FFB020) | 警告 |
| `status.error` | `red.500` (#E54545) | 错误 |
| `status.info` | `blue.500` (#0068FF) | 信息 |
| `status.campaign.tip` | `green.400` (#7ED321) | 活动页友情提示 |

---

## 排名色 (Rank)

| Token | 色值 | 用途 |
|-------|------|------|
| `rank.gold` | #DAA520 | 第 1 名 |
| `rank.silver` | #C0C0C0 | 第 2 名 |
| `rank.bronze` | #CD7F32 | 第 3 名 |
| `rank.default` | `text.secondary` | 第 4+ 名 |

---

| Token | 值 | CSS 变量 | 用途 |
|-------|-----|----------|------|
| `space.xs` | 4px | — | 图标间距（直接写值） |
| `space.sm` | 8px | — | 标签内边距（直接写值） |
| `space.md` | 16px | — | 紧凑组件内边距（直接写值） |
| `space.lg` | 24px | — | 卡片分区/栅格列间距（直接写值） |
| `space.xl` | 32px | `--space-card` | 卡片内边距 |
| `space.2xl` | 48px | — | 区块间距（直接写值） |
| `space.3xl` | 64px | — | 大区块间距（直接写值） |
| `space.page` | 80px | — | 页面间距（直接写值） |

| Token | 值 | 用途 |
|-------|-----|------|
| `space.xs` | `spacing.1` (4px) | 图标间距 |
| `space.sm` | `spacing.2` (8px) | 标签内边距、表格安全间距 |
| `space.md` | `spacing.4` (16px) | 紧凑组件内边距、规则条目间距 |
| `space.lg` | `spacing.6` (24px) | 卡片分区、栅格列间距 |
| `space.xl` | `spacing.8` (32px) | 卡片内边距、栅格行间距、弹窗内边距 |
| `space.2xl` | `spacing.12` (48px) | 区块间距、黑卡内边距 |
| `space.3xl` | `spacing.16` (64px) | 大区块间距 |
| `space.page` | `spacing.20` (80px) | 页面级间距 |

### 区块间距 (Section Gap)

| Token | 值 | 用途 |
|-------|-----|------|
| `section-gap.sm` | `spacing.10` (40px) | 相关内容块之间 |
| `section-gap.md` | `spacing.16` (64px) | 标准区块之间 |
| `section-gap.lg` | `spacing.24` (96px) | 首屏到内容、底部大区块 |

---

## 语义圆角 (Radius)

| Token | 值 | 用途 |
|-------|-----|------|
| `radius.badge` | `radius.xs` (2px) | 徽章、微标签 |
| `radius.input` | 6px | 输入框、下拉框 |
| `radius.control` | `radius.sm` (8px) | 按钮、下拉菜单、控件 |
| `radius.card` | 8px | 常规卡片 |
| `radius.card-lg` | `radius.2xl` (32px) | 活动/营销页大卡片 |
| `radius.card.outer` | `radius.2xl` (32px) | 活动主容器圆角 |
| `radius.card.inner` | `radius.lg` (16px) | 内嵌容器圆角 |
| `radius.modal` | `radius.lg` (16px) | 弹窗圆角 |
| `radius.pill` | `radius.full` (9999px) | 胶囊、标签 |

---

## 排版 (Typography)

### Display & Headline

| Token | 字号 | 行高 | 字重 | 用途 |
|-------|------|------|------|------|
| `display.large` | `fontSize.8xl` (72px) | `lineHeight.relaxed` | `fontWeight.bold` | 首屏大标题（常规页） |
| `display.large.campaign` | `fontSize.7xl` (60px) | `lineHeight.tight` | `fontWeight.bold` | 首屏大标题（活动页） |
| `display.medium` | `fontSize.6xl` (48px) | `lineHeight.relaxed` | `fontWeight.semibold` | 页面标题 |
| `headline.large` | `fontSize.5xl` (40px) | `lineHeight.relaxed` | `fontWeight.semibold` | 区块标题 |
| `headline.medium` | `fontSize.4xl` (32px) | `lineHeight.relaxed` | `fontWeight.semibold` | 子区块标题 |
| `headline.medium.bold` | `fontSize.4xl` (32px) | `lineHeight.tight` | `fontWeight.bold` | 注意事项标题（活动页） |

### Title

| Token | 字号 | 行高 | 字重 | 用途 |
|-------|------|------|------|------|
| `title.large` | `fontSize.3xl` (28px) | `lineHeight.relaxed` | `fontWeight.semibold` | 卡片标题 |
| `title.medium` | `fontSize.2xl` (24px) | `lineHeight.relaxed` | `fontWeight.semibold` | 小标题、FAQ 问题 |

### Body

| Token | 字号 | 行高 | 字重 | 用途 |
|-------|------|------|------|------|
| `body.xlarge` | `fontSize.xl` (20px) | `lineHeight.relaxed` | `fontWeight.regular` | 导语、Hero 副标题 |
| `body.xlarge.campaign` | `fontSize.3xl` (28px) | `lineHeight.tight` | `fontWeight.regular` | 活动副标题 |
| `body.large` | `fontSize.lg` (18px) | `lineHeight.relaxed` | `fontWeight.regular` | 默认正文 |
| `body.medium` | `fontSize.md` (16px) | `lineHeight.relaxed` | `fontWeight.regular` | 标准正文 |
| `body.small` | `fontSize.base` (14px) | `lineHeight.relaxed` | `fontWeight.regular` | 次要、表格、卡片 |
| `body.xsmall` | `fontSize.sm` (12px) | `lineHeight.loose` | `fontWeight.regular` | 注释 |
| `body.xxsmall` | `fontSize.xs` (10px) | `lineHeight.extra` | `fontWeight.regular` | 微标签 |

### Button

| Token | 字号 | 行高 | 字重 | 用途 |
|-------|------|------|------|------|
| `button.large` | `fontSize.md` (16px) | `lineHeight.tight` | `fontWeight.medium` | 按钮（大/标准） |
| `button.large.campaign` | `fontSize.lg` (18px) | `lineHeight.tight` | `fontWeight.semibold` | 活动页 CTA |
| `button.medium` | `fontSize.md` (16px) | `lineHeight.tight` | `fontWeight.medium` | 按钮（标准） |
| `button.small` | `fontSize.base` (14px) | `lineHeight.tight` | `fontWeight.medium` | 按钮（紧凑） |

### Tab

| Token | 字号 | 行高 | 字重 | 用途 |
|-------|------|------|------|------|
| `tab.default` | `fontSize.md` (16px) | `lineHeight.normal` | `fontWeight.medium` | Tab 标签 |

---

## 表格 (Table)

| Token | 值 | 用途 |
|-------|-----|------|
| `table.header.bg` | `surface.muted` | 表头背景 |
| `table.row.height` | 56px | 标准行高 |
| `table.row.height-sm` | 48px | 紧凑行高 |
| `table.border` | `surface.border` | 行边框 |
| `table.hover.bg` | `surface.elevated` | 悬停行背景 |

---

## 倒计时 (Countdown)

| Token | 值 | 用途 |
|-------|-----|------|
| `countdown.block.bg` | `surface.countdown.item` | 时间块背景 |
| `countdown.block.size` | 64px | 时间块尺寸 |
| `countdown.block.radius` | `radius.card` (8px) | 时间块圆角 |
| `countdown.number` | `display.medium` 或等宽数字 | 数字样式 |
| `countdown.separator` | `opacity.weak` (0.3) | 冒号透明度 |

---

## 活动规则 (Rules)

| Token | 值 | 用途 |
|-------|-----|------|
| `rules.section.title` | `headline.medium.bold` | 规则区块标题 |
| `rules.item.gap` | `space.md` (16px) | 规则条目间距 |
| `rules.bullet.color` | `accent.brand` | 列表符号颜色 |

---

## 透明度 (Opacity)

| Token | 值 | 用途 |
|-------|-----|------|
| `opacity.border` | `opacity.20` (0.2) | 活动页黑卡边框 |
| `opacity.muted` | `opacity.70` (0.7) | 次要文字 |
| `opacity.weak` | `opacity.30` (0.3) | 倒计时冒号、弱化元素 |

---

## 动效 (Motion)

| Token | 值 | 用途 |
|-------|-----|------|
| `transition.hover` | `duration.fast` (150ms) + `easing.default` | 按钮/链接 hover |
| `transition.expand` | `duration.normal` (250ms) + `easing.default` | 手风琴、展开/折叠 |
| `transition.modal` | `duration.slow` (400ms) + `easing.enter` | 弹窗入场 |

---

## 层级 (Z-Index)

| Token | 值 | 用途 |
|-------|-----|------|
| `z.dropdown` | `z.dropdown` (10) | 下拉菜单 |
| `z.sticky` | `z.sticky` (20) | 吸顶导航 |
| `z.overlay` | `z.overlay` (50) | 遮罩层 |
| `z.modal` | `z.modal` (60) | 弹窗 |
| `z.toast` | `z.toast` (70) | Toast 提示 |

---

## 布局 (Layout)

| Token | 值 | 用途 |
|-------|-----|------|
| `container.max` | 1200px | 内容最大宽度 |
| `container.page` | 1248px | 页面最小宽度（桌面） |
| `breakpoint.sm` | 768px | 平板 |
| `breakpoint.lg` | 1248px | 桌面 |

- 页面内边距、栅格间距、区块间距见 **layout.md**。

---

## CSS 变量完整速查表

> 以下是 `.page` wrapper 中应定义的完整 CSS 变量列表（以深色模式默认值为例）。

```css
.page {
  /* 表面色 */
  --bg: #070808;
  --bg-card: #1F2023;
  --bg-muted: #131516;
  --bg-elevated: #303236;
  --border: rgba(255,255,255,0.1);
  --bg-card-black: #000000;
  --bg-card-white: #FFFFFF;
  --bg-card-blue: #0068FF;

  /* 文字色 */
  --text-primary: #FAFAFA;
  --text-secondary: #A0A3A7;
  --text-muted: #84888C;
  --text-disabled: #484B51;
  --text-inverse: #070808;
  --text-on-dark: #FFFFFF;
  --text-on-dark-muted: rgba(255,255,255,0.7);
  --text-on-light: #000000;
  --text-on-light-muted: rgba(0,0,0,0.7);

  /* 操作色 */
  --brand: #0068FF;
  --brand-hover: #004FD9;
  --brand-active: #003D99;
  --action-neutral: #303236;
  --action-neutral-hover: #484B51;
  --action-secondary: #1F2023;
  --action-subtle: #A3D4FF;

  /* CTA */
  --cta-bg: #FFFFFF;
  --cta-text: #000000;
  --cta-secondary-bg: #000000;
  --cta-secondary-text: #FFFFFF;

  /* 强调色 */
  --accent: #A7F757;

  /* 状态色 */
  --success: #50A907;
  --warning: #FFB020;
  --error: #E54545;
  --info: #0068FF;
  --tip: #7ED321;

  /* 排名色 */
  --rank-gold: #DAA520;
  --rank-silver: #C0C0C0;
  --rank-bronze: #CD7F32;

  /* 圆角 */
  --radius-input: 6px;
  --radius-card: 8px;
  --radius-btn: 8px;
  --radius-modal: 16px;
  --radius-card-lg: 32px;
  --radius-pill: 9999px;

  /* 间距 */
  --space-card: 32px;
  --space-section: 64px;

  /* 动效 */
  --transition: 200ms ease;
  --transition-slow: 300ms ease;

  /* 层级 */
  --z-dropdown: 10;
  --z-sticky: 20;
  --z-modal: 50;
  --z-toast: 100;
}
```

---

## 引用规则

```
✅ 允许：在代码中使用语义 Token 对应类名（如 text-primary、bg-surface-background）
✅ 允许：在组件 Token 中引用本层（如 semantic.text.primary）
❌ 禁止：在代码中直接使用原始值（如 blue.500、#0068FF）
```
