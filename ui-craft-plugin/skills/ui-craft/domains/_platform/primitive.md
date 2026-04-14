# 第 1 层 — 原始 Token

> 原始物理值，禁止在代码中直接引用。只能被语义 Token 引用。
> **品牌色由各 domain 定义**（Campaign 在 style 中定义，Exchange 为蓝色，Web3/Pay 为绿色）。

---

## 颜色

### 蓝色系（品牌色 — Exchange 专属）

> 以 Figma Blue-1 至 Blue-10 色板为准（Light 模式值）
> Campaign 和 Web3/Pay 通过各自的 domain 覆盖层定义品牌色。

| Token | 色值 | Figma 编号 | 用途参考 |
|-------|------|-----------|----------|
| `blue.50` | #E6EEFF | Blue-10 | 最浅蓝 |
| `blue.100` | #CCDDFF | Blue-9 | 浅蓝背景 |
| `blue.200` | #99BBFF | Blue-8 | 柔和蓝 |
| `blue.300` | #6699FF | Blue-7 | 中蓝 |
| `blue.400` | #3377FF | Blue-6 | 亮蓝 |
| `blue.500` | #0055FF | Blue-5 | Exchange 品牌蓝（核心色） |
| `blue.600` | #0044CC | Blue-4 | 深蓝 |
| `blue.700` | #003399 | Blue-3 | 更深蓝 |
| `blue.800` | #002266 | Blue-2 | 暗蓝 |
| `blue.900` | #001133 | Blue-1 | 最深蓝 |

### 绿色系（品牌色 — Web3/Pay 专属 + 状态色）

| Token | 色值 | 用途参考 |
|-------|------|----------|
| `green.300` | #17E5A1 | Web3/Pay 品牌绿 |
| `green.400` | #7ED321 | 活动页提示 |
| `green.500` | #50A907 | 成功色（全局共享） |

### 灰色系（全局共享）

> 以 Figma Neutral-1 至 Neutral-11 色板为准（Light 模式值）

| Token | 色值 | Figma 编号 | 用途参考 |
|-------|------|-----------|----------|
| `gray.50` | #FAFAFA | Dark Neutral-1 | 最浅灰 |
| `gray.100` | #F2F3F4 | Neutral-11 | 浅灰背景 |
| `gray.200` | #DFE0E2 | Neutral-10 | 边框 |
| `gray.300` | #C4C7CA | Neutral-9 | 分割线 |
| `gray.400` | #A0A3A7 | Neutral-8 | 次要文字 |
| `gray.500` | #84888C | Neutral-7 | 占位符 |
| `gray.600` | #6B6F74 | — | 禁用（插值色） |
| `gray.700` | #484B51 | Neutral-6 | 深灰 |
| `gray.800` | #303236 | Neutral-5 | 卡片背景 |
| `gray.900` | #1F2023 | Neutral-4 | 更深背景 |
| `gray.925` | #18191B | Neutral-3 | 默认卡片背景（深色模式） |
| `gray.950` | #131516 | Neutral-2 | 最深背景 |
| `gray.1000` | #070808 | Neutral-1 | 页面背景 |

### 红色系（错误 — 全局共享）

| Token | 色值 | 用途参考 |
|-------|------|----------|
| `red.400` | #FF6B6B | 轻错误 |
| `red.500` | #E54545 | 错误色 |

### 黄色系（警告 — 全局共享）

| Token | 色值 | 用途参考 |
|-------|------|----------|
| `yellow.400` | #FFB020 | 警告色 |
| `yellow.500` | #F5A623 | 深警告 |

### 特殊色（全局共享）

| Token | 色值 | 用途 |
|-------|------|------|
| `gold.main` | #DAA520 | 奖励金色 |
| `accent.lime` | #A7F757 | Campaign 默认强调色（金额高亮） |
| `white.60` | rgba(255,255,255,0.6) | 次要文字 |
| `white.10` | rgba(255,255,255,0.1) | 弱背景/描边 |
| `black.60` | rgba(0,0,0,0.6) | 背景遮罩 |

### 黑白

| Token | 色值 |
|-------|------|
| `white` | #FFFFFF |
| `black` | #000000 |

---

## 间距

基于 4px 基准的间距体系（Token 编号 = 值 ÷ 4）：

| Token | 值 | 用途参考 |
|-------|-----|----------|
| `spacing.1` | 4px | 最小间距 |
| `spacing.2` | 8px | 元素内间距、单元格内边距 |
| `spacing.4` | 16px | 紧凑间距 |
| `spacing.6` | 24px | 标准间距 |
| `spacing.8` | 32px | 弹窗及卡片通用内边距 |
| `spacing.10` | 40px | 相关内容块间距 |
| `spacing.12` | 48px | 大卡片内边距、表格行高 |
| `spacing.16` | 64px | 大区块间距 |
| `spacing.20` | 80px | 模块间呼吸感间距 |
| `spacing.24` | 96px | 顶部/首屏间距 |

---

## 圆角

| Token | 值 | 用途参考 |
|-------|-----|----------|
| `radius.xs` | 2px | 徽章、微标签 |
| `radius.sm` | 8px | 按钮/控件 |
| `radius.md` | 12px | 中型容器 |
| `radius.lg` | 16px | 内层卡片、弹窗圆角 |
| `radius.2xl` | 32px | 外层容器圆角（活动页） |
| `radius.full` | 9999px | 胶囊形状 |

---

## 阴影

| Token | 值 | 用途 |
|-------|-----|------|
| `shadow.sm` | 0 1px 2px rgba(0,0,0,0.05) | 微阴影 |
| `shadow.md` | 0 4px 6px rgba(0,0,0,0.1) | 卡片 |
| `shadow.lg` | 0 10px 15px rgba(0,0,0,0.1) | 弹窗 |
| `shadow.xl` | 0 20px 25px rgba(0,0,0,0.15) | 大弹窗 |
| `shadow.modal` | 0 20px 40px rgba(0,0,0,0.5) | 弹窗深度感投影 |

---

## 字体与排版

### 字体大小

| Token | 值 | 用途参考 |
|-------|-----|----------|
| `fontSize.xs` | 10px | 微标签 |
| `fontSize.sm` | 12px | 表格文字、注释 |
| `fontSize.base` | 14px | 次要正文 |
| `fontSize.md` | 16px | 标准正文 |
| `fontSize.lg` | 18px | 大正文、按钮 |
| `fontSize.xl` | 20px | 导语 |
| `fontSize.2xl` | 24px | 小标题 |
| `fontSize.3xl` | 28px | 卡片标题 |
| `fontSize.4xl` | 32px | 子区块标题 |
| `fontSize.5xl` | 40px | 区块标题 |
| `fontSize.6xl` | 48px | 页面标题 |
| `fontSize.7xl` | 60px | 大标题 |
| `fontSize.8xl` | 72px | 首屏大标题 |

### 字重

| Token | 值 | 用途 |
|-------|-----|------|
| `fontWeight.regular` | 400 | 正文 |
| `fontWeight.medium` | 500 | 按钮、Tab |
| `fontWeight.semibold` | 600 | 标题 |
| `fontWeight.bold` | 700 | 强调标题 |

### 行高

| Token | 值 | 用途 |
|-------|-----|------|
| `lineHeight.tight` | 1.15 | 标题 |
| `lineHeight.normal` | 1.25 | Tab |
| `lineHeight.relaxed` | 1.3 | 正文 |
| `lineHeight.loose` | 1.5 | 注释 |

### 等宽字体

| Token | 值 | 用途 |
|-------|-----|------|
| `fontFamily.mono` | "Space Mono", "tabular-nums", monospace | 倒计时、数字列 |

---

## 透明度

| Token | 值 | 用途 |
|-------|-----|------|
| `opacity.10` | 0.1 | 极浅 |
| `opacity.20` | 0.2 | 浅 |
| `opacity.30` | 0.3 | 弱化 |
| `opacity.40` | 0.4 | 次弱 |
| `opacity.50` | 0.5 | 半透明 |
| `opacity.60` | 0.6 | 次要文字 |
| `opacity.70` | 0.7 | 次要 |
| `opacity.80` | 0.8 | 较不透明 |
| `opacity.90` | 0.9 | 接近不透明 |

## 动效

| Token | 值 | 用途 |
|-------|-----|------|
| `duration.fast` | 150ms | hover、toggle |
| `duration.normal` | 250ms | 展开/折叠 |
| `duration.slow` | 400ms | 弹窗入场 |
| `easing.default` | cubic-bezier(0.4, 0, 0.2, 1) | 通用 |
| `easing.enter` | cubic-bezier(0, 0, 0.2, 1) | 入场 |
| `easing.exit` | cubic-bezier(0.4, 0, 1, 1) | 退场 |

---

## 层级 (Z-Index)

| Token | 值 | 用途 |
|-------|-----|------|
| `z.base` | 0 | 常规内容 |
| `z.dropdown` | 10 | 下拉菜单 |
| `z.sticky` | 20 | 吸顶元素 |
| `z.overlay` | 50 | 遮罩层 |
| `z.modal` | 60 | 弹窗 |
| `z.toast` | 70 | Toast 提示 |

---

## 引用规则

```
❌ 禁止：在代码中直接使用 primitive Token（如 blue.500 或 #0068FF）
✅ 允许：在语义 Token 中引用 primitive Token
```

## 品牌色引用

```
❌ 禁止：在 core 层固定 --brand 和 --accent 的值
✅ 允许：在 domain 覆盖层定义品牌色
  - Campaign: 由 styles/*.md 的 CSS 变量表定义（每个风格不同）
  - Exchange: --brand: #0068FF（蓝色）
  - Web3/Pay: --brand: #17E5A1（绿色）
```
