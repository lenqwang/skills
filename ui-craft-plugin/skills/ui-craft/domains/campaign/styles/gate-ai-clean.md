# Gate AI Clean 风格

> 生成代码前必须读取 `contract/rules.md`，完整遵守 `R1-R30`。本文件只定义视觉倾向与组件偏好。

---

## 区块 1: 元信息

```yaml
name: gate-ai-clean
description: Gate for AI 统一设计语言，白底极简 + 黑白单色 + 线条插图 + 文档感排版，适用于 AI 产品/工具落地页与应用面板
mode: light
source_urls:
  - https://www.gate.com/gate-exchange-for-ai
  - https://www.gate.com/gate-dex-for-ai
  - https://www.gate.com/gate-for-ai
  - https://www.gate.com/gate-wallet-for-ai
extracted_at: 2026-03-11
calibrated_at: 2026-03-11
```

---

## 区块 2: 风格画像

- **视觉情绪**：极简克制、专业沉稳、开发者友好
- **核心组件**：白底 Hero（大标题 + 线条插图）、无边框特性网格、深色代码块、手风琴 FAQ、多栏页脚
- **强调方式**：黑色实心 CTA 按钮为唯一视觉焦点；标题用字号/字重建立层次，不依赖颜色；蓝色仅在极少数标签/徽章处使用
- **适用标签**：`AI产品` `开发者工具` `API平台` `LLM路由` `技术文档`

| 维度 | 本风格 | 默认 | 说明 |
|------|--------|------|------|
| 色温 | 中性 | 中性 | 纯白底 + 纯黑文，无色温倾向 |
| 信息密度 | 低-中 | 中 | 大量留白，区块间距宽松 |
| 装饰程度 | 极简 | 克制 | 零渐变、零阴影、零填色装饰，线条插图为唯一装饰元素 |

---

## 区块 3: CSS 变量表

### 3.1 颜色变量

| 变量 | 暗色值 | 亮色值 | 说明 |
|------|--------|--------|------|
| `--bg` | #070808 | #FFFFFF | 页面背景 |
| `--bg-card` | #18191B | #FFFFFF | 卡片背景（亮色下与页面同色，靠间距区分） |
| `--bg-muted` | #131516 | #F5F6F8 | 交替区块背景（浅灰段） |
| `--bg-elevated` | #1F2023 | #FFFFFF | 浮层/弹窗背景 |
| `--border` | rgba(255,255,255,0.1) | #E5E7EB | 卡片/分割线边框 |
| `--border-hover` | rgba(255,255,255,0.2) | #D1D5DB | 悬停态边框 |
| `--text-primary` | #FAFAFA | #111111 | 主要文字（亮色近纯黑） |
| `--text-secondary` | #A0A3A7 | #6B7280 | 次要描述文字 |
| `--text-muted` | #84888C | #9CA3AF | 弱化/注释文字 |
| `--text-inverse` | #070808 | #FFFFFF | 反色文字（用于深色按钮上） |
| `--brand` | #0068FF | #0068FF | 品牌蓝（极少量使用：徽章、链接） |
| `--brand-hover` | #004FD9 | #004FD9 | 品牌蓝悬停 |
| `--accent` | #A7F757 | #A7F757 | 金额高亮（延续 Gate 体系） |
| `--cta-bg` | #FFFFFF | #111111 | 主 CTA 背景（亮色下黑底） |
| `--cta-text` | #000000 | #FFFFFF | 主 CTA 文字（亮色下白字） |
| `--cta-secondary-bg` | transparent | transparent | 次要 CTA 背景（透明） |
| `--cta-secondary-text` | #FAFAFA | #111111 | 次要 CTA 文字 |
| `--cta-secondary-border` | rgba(255,255,255,0.3) | #D1D5DB | 次要 CTA 边框 |
| `--bg-code` | #1a1a2e | #1a1a2e | 代码块背景（始终深色） |
| `--text-code` | #E5E7EB | #E5E7EB | 代码块文字 |
| `--bg-tab-active` | #111111 | #111111 | 活跃 Tab 背景（黑色） |
| `--text-tab-active` | #FFFFFF | #FFFFFF | 活跃 Tab 文字（白色） |
| `--text-tab-default` | #A0A3A7 | #6B7280 | 默认 Tab 文字 |
| `--nav-bg` | transparent | transparent | 导航栏背景 |
| `--nav-cta-bg` | #FFFFFF | #111111 | 导航栏 CTA 按钮背景 |
| `--nav-cta-text` | #000000 | #FFFFFF | 导航栏 CTA 按钮文字 |
| `--footer-bg` | #070808 | #FFFFFF | 页脚背景 |
| `--footer-text` | #FAFAFA | #111111 | 页脚文字 |
| `--footer-text-muted` | #6B7280 | #9CA3AF | 页脚次要文字 |
| `--success` | #50A907 | #16A34A | 成功状态 |
| `--error` | #E54545 | #DC2626 | 错误状态 |
| `--warning` | #FFB020 | #F59E0B | 警告状态 |
| `--info` | #0068FF | #0068FF | 信息状态 |

### 3.2 渐变

| 用途 | CSS 值 | 说明 |
|------|--------|------|
| 底部 CTA 横幅 | `background: #111111` | 纯黑底，无渐变（克制装饰） |
| 交替区块 | `background: var(--bg-muted)` | 纯色交替，无渐变 |

### 3.3 圆角变量

| 变量 | 值 | 说明 |
|------|-----|------|
| `--radius-card` | 8px | 常规卡片 |
| `--radius-card-lg` | 16px | 大尺寸容器 |
| `--radius-btn` | 8px | 标准按钮 |
| `--radius-pill` | 9999px | 胶囊按钮/标签 |
| `--radius-input` | 6px | 输入框 |
| `--radius-modal` | 16px | 弹窗 |
| `--radius-code` | 8px | 代码块 |

### 3.4 间距变量

| 变量 | 值 | 说明 |
|------|-----|------|
| `--space-card` | 32px | 卡片内边距 |
| `--space-section` | 96px | 主区块间距（大留白，营造开阔感） |
| `--space-section-inner` | 64px | 区块内子模块间距 |

### 3.5 排版覆盖

| Token | 覆盖值 | 原值 | 说明 |
|-------|--------|------|------|
| `display.large.campaign` | 48px / 700 / 1.15 | 60px / 600 / 1.25 | Hero 主标题，稍收敛 |
| `headline.large` | 40px / 700 / 1.2 | 40px / 600 / 1.3 | 区块标题，加粗更有力 |
| `headline.medium` | 28px / 700 / 1.25 | 32px / 600 / 1.3 | 子区块标题 |
| `body.large` | 18px / 400 / 1.6 | 18px / 400 / 1.3 | 正文，行高更松 |
| `body.medium` | 16px / 400 / 1.6 | 16px / 400 / 1.3 | 标准正文，行高更松 |
| `body.xlarge` | 20px / 400 / 1.5 | 20px / 400 / 1.3 | Hero 副标题 |

---

## 区块 4: 布局结构

> layout: portal.index

### 差异项

- Hero: 白底 + 左侧大标题/副标题/CTA + 右侧线条插图占位（side-by-side），非深色渐变
- 统计数据行: Hero 下方一行关键指标（如 "Top Models | 60+ | ~35% | <200ms"），用间距分隔
- 特性区块: 2-3 列简洁特性网格，无卡片边框/背景，仅图标+标题+描述
- 交替背景: 使用 `var(--bg-muted)` 浅灰与白色交替，区分内容层
- 代码块: 深色背景代码示例，带 Tab 切换（语言/工具）
- FAQ: 手风琴折叠面板，问题黑色粗体+折叠箭头
- 页脚: 多栏链接布局（品牌列+链接列+版权行）
- 内容宽度: 1200px 居中
- 区块间距: 96px（大留白）

---

## 区块 5: 组件变体

### 导航栏 (Top Nav)

```
+------------------------------------------------------------------+
|  [G] GateRouter      Models  Playground  Pricing  Docs   [Dashboard] [G] |
+------------------------------------------------------------------+
```

| 属性 | 值 | 备注 |
|------|-----|------|
| 背景 | `var(--nav-bg)` | 透明/白色 |
| 高度 | 56px | |
| 左侧 | 品牌 logo + 产品名 `var(--text-primary)` | 700 字重 |
| 中间 | 导航链接 14px/500 `var(--text-secondary)` | hover 变 `var(--text-primary)` |
| 右侧 | CTA 按钮 + 语言/设置图标 | |
| CTA 按钮 | `var(--nav-cta-bg)` 背景 + `var(--nav-cta-text)` 文字 | `var(--radius-pill)` 胶囊形，14px/500 |
| 吸顶 | position: sticky, `var(--z-sticky)` | 下方 1px `var(--border)` 分隔 |

### Hero 区块 (Hero Section)

```
+------------------------------------------------------------------+
|                                                                    |
|   GateRouter                    +--------------------------+       |
|   Route Smart. Pay Less.        |                          |       |
|                                 |  [线条几何插图]           |       |
|   为 AI Agent 提供智能 LLM      |  (wireframe 风格)        |       |
|   路由，自动选择最优模型...      |                          |       |
|                                 +--------------------------+       |
|   [快速开始]  [GitHub]                                             |
|                                                                    |
+------------------------------------------------------------------+
```

| 属性 | 值 | 备注 |
|------|-----|------|
| 容器 | 全宽白底，min-height 480px | flex 布局，align-items center |
| 布局 | 两列 55:45，gap 48px | 移动端堆叠 |
| 背景 | `var(--bg)` | 纯白，无渐变 |
| 主标题 | 48px/700 `var(--text-primary)` | 2-3 行，行高 1.15 |
| 副标题 | 16px/400 `var(--text-secondary)` line-height 1.6 | margin-top 16px |
| 主 CTA | `var(--cta-bg)` 背景 + `var(--cta-text)` 文字 | `var(--radius-btn)` 圆角，48px 高 |
| 次要 CTA | `var(--cta-secondary-bg)` + `var(--cta-secondary-border)` 边框 | 同行，gap 12px |
| 插图 | 线条/wireframe 风格占位 SVG | 不填色，纯描边 |

### 统计指标行 (Stats Row)

```
+------------------------------------------------------------------+
|   Top Models    60+        ~35%             <200ms                 |
|   领先模型      覆盖模型   平均节省成本      延迟中位数             |
+------------------------------------------------------------------+
```

| 属性 | 值 | 备注 |
|------|-----|------|
| 容器 | flex，justify-content: space-around，max-width 800px | 居中 |
| 数值 | 32px/700 `var(--text-primary)` | |
| 标签 | 14px/400 `var(--text-secondary)` | margin-top 4px |
| 间距 | 元素间用 1px `var(--border)` 竖线分隔或纯间距 | |

### 特性网格 (Feature Grid)

```
+------------------+  +------------------+  +------------------+
|  [线条图标]       |  |  [线条图标]       |  |  [线条图标]       |
|  智能路由         |  |  加密支付         |  |  成本优化         |
|  描述文案...      |  |  描述文案...      |  |  描述文案...      |
+------------------+  +------------------+  +------------------+
```

| 属性 | 值 | 备注 |
|------|-----|------|
| 网格 | 3 列 / 2 列（平板）/ 1 列（手机），gap 32px | |
| 单元格 | 无背景、无边框、无阴影 | 纯文本+图标 |
| 图标 | 40px 线条风格 SVG 或 CSS 图形，`var(--text-primary)` | 无填色 |
| 标题 | 18px/600 `var(--text-primary)` | margin-top 16px |
| 描述 | 14px/400 `var(--text-secondary)` line-height 1.6 | margin-top 8px |

### 代码预览区块 (Code Preview Section)

```
+------------------------------------------------------------------+
|  [Tab1]  [Tab2]  [Tab3]  [Tab4]  [Tab5]                          |
|  +--------------------------------------------------------------+|
|  |  黑色代码区域                                                 ||
|  |  const response = await gaterouter.chat(...)                  ||
|  |                                                               ||
|  +--------------------------------------------------------------+|
+------------------------------------------------------------------+
```

| 属性 | 值 | 备注 |
|------|-----|------|
| Tab 栏 | 14px/500，默认 `var(--text-tab-default)`，选中 `var(--bg-tab-active)` 背景 + `var(--text-tab-active)` 文字 | 选中态胶囊形 |
| 代码容器 | `var(--bg-code)` 背景，`var(--radius-code)` 圆角 | padding 32px |
| 代码文字 | 14px 等宽字体，`var(--text-code)` | |

### 卡片列表 - 模型卡片 (Model Card)

```
+-----------------------------------------------+
|  [Logo]  GPT-4o                                |
|          OpenAI                                |
|                                                |
|  描述文案...                                    |
|                                                |
|  BEST FOR:  对话  |  推理  |  分析              |
|                                                |
|  $2.50/1M input   $10.00/1M output             |
+-----------------------------------------------+
```

| 属性 | 值 | 备注 |
|------|-----|------|
| 容器 | `var(--bg)` 背景 + 1px `var(--border)` 边框 | `var(--radius-card)` 圆角 |
| 内边距 | 24px | |
| 模型名 | 18px/600 `var(--text-primary)` | |
| 提供商 | 14px/400 `var(--text-secondary)` | |
| 描述 | 14px/400 `var(--text-secondary)` | margin-top 12px |
| 标签 | 12px/500 `var(--text-secondary)` | 无背景，间隔分隔 |
| 价格 | 14px/500 `var(--text-primary)` | 底部对齐 |
| 悬停 | 边框变 `var(--border-hover)` | transition 150ms |

### FAQ 手风琴 (FAQ Accordion)

```
+-----------------------------------------------+
|  什么是 GateRouter?                        v   |
+-----------------------------------------------+
|  支持哪些模型?                             v   |
+-----------------------------------------------+
|  如何计费?                                 v   |
+-----------------------------------------------+
```

| 属性 | 值 | 备注 |
|------|-----|------|
| 问题 | 18px/600 `var(--text-primary)` | |
| 答案 | 16px/400 `var(--text-secondary)` line-height 1.6 | padding-top 12px |
| 分隔 | 底部 1px `var(--border)` | |
| 箭头 | `var(--text-secondary)` chevron | 旋转 180deg 展开 |
| 行高度 | min-height 56px | flex align-items center |

### 页脚 (Footer)

```
+------------------------------------------------------------------+
|  [G] GateRouter   PRODUCT      RESOURCES     COMPANY    LEGAL     |
|  Smart LLM        Playground   Docs          About      Privacy   |
|  routing...       Models       API Ref       Contact    Terms     |
|                   Pricing      Quick Start              Security  |
|  [X] [G] [D]     Dashboard    On-chain Pay                       |
+------------------------------------------------------------------+
|  © 2026 GateRouter. All rights reserved.                          |
+------------------------------------------------------------------+
```

| 属性 | 值 | 备注 |
|------|-----|------|
| 背景 | `var(--footer-bg)` | 白底（亮色）或深色 |
| 上边框 | 1px solid `var(--border)` | |
| 内边距 | 64px 0 32px | |
| 布局 | 品牌列(宽) + 4 链接列，flex | |
| 列标题 | 12px/600 `var(--text-secondary)` 大写 letter-spacing 0.05em | margin-bottom 16px |
| 链接 | 14px/400 `var(--text-secondary)` | hover `var(--text-primary)`, gap 12px |
| 社交图标 | 20px `var(--text-muted)` | hover `var(--text-primary)` |
| 版权行 | 12px `var(--text-muted)` | 上方 1px `var(--border)` 分隔 |

### Dashboard 侧边栏 (Sidebar)

```
+----------------+
|  [G] GateRouter|
+----------------+
|  总览           |
|  日志           |
|  额度           |
|  记忆 (Phase 2) |
|  技能 (Phase 2) |
|  设置      v    |
+----------------+
```

| 属性 | 值 | 备注 |
|------|-----|------|
| 宽度 | 200px | |
| 背景 | `var(--bg)` | 白底 |
| 右边框 | 1px solid `var(--border)` | |
| 菜单项 | 14px/500 `var(--text-secondary)` | |
| 选中态 | `var(--text-primary)` + 左侧 2px 黑色指示条 | 无背景变化 |
| 悬停 | `var(--text-primary)` | transition 150ms |
| 图标 | 16px `currentColor` | |

### Dashboard 数据卡片 (Stat Card)

```
+--------------------------+
|  消费              [↗]   |
|  159 USDT                |
|  [迷你柱状图]             |
|  ● GPT-4o  ● Kimi       |
+--------------------------+
```

| 属性 | 值 | 备注 |
|------|-----|------|
| 容器 | 1px solid `var(--border)` 边框 | `var(--radius-card)` 圆角 |
| 背景 | `var(--bg)` | 白底，无填色 |
| 内边距 | 24px | |
| 标题 | 14px/500 `var(--text-secondary)` | |
| 数值 | 32px/700 `var(--text-primary)` | |
| 图表色 | `var(--text-primary)` + `var(--text-muted)` | 黑灰双色，非蓝色 |

---

## 区块 6: 适用性 & 自检

### 自检清单

> 基础清单见 `contract/rules.md` 自检清单章节，此处仅列本风格特有检查项。

- [ ] [B] 亮色模式下页面背景为纯白 #FFFFFF，文字为近纯黑 #111111
- [ ] [B] 主 CTA 使用黑底白字（亮色模式），非蓝色按钮
- [ ] [W] 品牌蓝仅在链接、徽章、极少量强调处使用，不作为主视觉
- [ ] [B] 特性网格无背景、无边框、无阴影，纯图标+文字
- [ ] [W] 区块间距使用 96px，营造开阔的文档感节奏
- [ ] [W] 代码块始终使用深色背景 `var(--bg-code)`，不随主题切换
- [ ] [B] 无渐变装饰（CTA 横幅用纯色，Hero 用纯白底）
- [ ] [W] 插图使用线条/wireframe 风格占位，不使用填色图形
- [ ] [B] Dashboard 侧边栏和数据卡片使用黑白配色，非蓝色主题

### 适用场景

- AI 产品/工具落地页（LLM 路由、API 网关）
- 开发者工具产品首页
- AI 模型市场/目录页
- Playground / 工具演示页
- 数据分析面板 / Dashboard
- 定价页

### 不适用场景

- 交易竞赛活动（建议用 competition.md）
- VIP 专属活动（建议用 vip-warm-elite.md）
- 节日主题活动（建议用对应 festive 系列）
- 需要大量颜色区分的数据大屏
