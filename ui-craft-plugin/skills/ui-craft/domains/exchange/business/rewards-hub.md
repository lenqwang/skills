# 福利中心（Rewards Hub）

> 所属域：[Exchange](../domain.md) > Business > Rewards Hub
> 版本：v2.14 | 更新日期：2026-03-26

---

## 区块 1: 元信息

```yaml
name: rewards-hub
version: 2.14
description: 福利中心 — 新客任务引导 + 老客任务/券体系
figma: https://www.figma.com/design/rolyycBTmxioksI63PQqbL/%E7%A6%8F%E5%88%A9%E4%B8%AD%E5%BF%83-%E5%86%8D%E4%BC%98%E5%8C%96%E6%94%B9%E7%89%88?node-id=8256-13570
coverage: H5(375px) + Web(1920px)
theme: dark-only
status: production
assets: rewards-hub-assets/
# 以下路径相对于仓库根目录（ai-activities）
html-reference: ui-craft-workspaces/exchange/pages/rewards-hub-responsive-v1.html
html-h5-v4: ui-craft-workspaces/exchange/pages/rewards-hub-h5-v4.html
html-offline-package: ui-craft-workspaces/exchange/pages/rewards-hub-package/index.html
```

> **主题说明**: 本页面仅支持 **Dark Mode（黑色模式）**，暂不提供白色/亮色模式。所有卡片、文字、组件均基于暗色背景设计。

---

## 区块 2: 业务画像

### 2.1 用户与场景

| 维度 | 说明 |
|------|------|
| **目标用户** | 新注册用户（新客）、已完成新手任务用户（老客） |
| **核心场景** | 新手引导任务、进阶交易任务、活动聚合、券领取/使用 |
| **页面类型** | 新客页面、老客页面 |
| **适用标签** | `福利` `新手引导` `任务奖励` `券` |

### 2.2 视觉定位

| 维度 | 本业务 | Exchange 默认 | 差异说明 |
|------|--------|--------------|----------|
| 主题 | **Dark Mode Only** | 亮色交易风 | 仅支持黑色模式 `#0D0D0D` / `#1A1A1A` |
| 信息密度 | 中 | 高 | 卡片流，非密集表格 |
| 视觉风格 | 营销 | 交易 | 渐变按钮、毛玻璃、大圆角 |
| 情绪调性 | 激励、奖励感 | 专业、高效 | 绿色高亮金额、进度动效 |

### 2.3 新客 vs 老客功能矩阵

| 功能模块 | 新客页面 | 老客页面 | 说明 |
|----------|:--------:|:--------:|------|
| StatsCard 数据项（H5） | 2 项 | 3 项 | 新客: Vouchers/Event; 老客: +Credits |
| StatsCard 数据项（Web） | 2 项 | 3 项 | 新客: Earned/Vouchers; 老客: +Credits |
| UserInviteBanner + InviteTaskRow | ✓ | ✗ | 邀请人信息 + 倒计时 |
| Welcome Package | ✓ | ✗ | 新手礼包任务卡片 |
| AdvancedTaskCard | ✓ | ✗ | 进阶交易任务 + 里程碑 |
| Hot Event | ✓ | ✗ | 热门活动列表 |
| GTTabs | ✗ | ✓ | 任务分类切换 |
| ExclusiveTaskCard | ✗ | ✓ | 专属任务（无进度条） |
| RegularTaskCard | ✗ | ✓ | 常规任务（含进度条） |
| VoucherCard 瀑布流 | ✗ | ✓ | 2 列券卡片网格 |

---

## 区块 3: Token 覆盖

### 3.1 颜色系统（Dark Mode Only）

> **重要**: 本页面仅支持黑色模式，以下为唯一配色方案。
> **数据来源**: `rewards-hub-h5-v4.html` CSS 变量

```css
:root {
  /* ===== 背景层级 (Dark Mode) ===== */
  --bg-page: #0D0D0D;              /* 页面底色 */
  --bg-card: #1A1A1A;              /* 卡片背景 */
  --bg-tertiary: #18191B;          /* 三级背景（Hot Event 内卡） */

  /* ===== 文本层级 (Dark Mode) ===== */
  --text-primary: #FFFFFF;         /* 主文本 */
  --text-secondary: #A0A3A7;       /* 次要文本 */
  --text-tertiary: #84888C;        /* 辅助文本 */

  /* ===== 品牌与功能色 ===== */
  --accent-green: #A7F757;         /* 浅绿高亮 */
  --accent-green-dark: #2BC235;    /* 深绿 */
  --brand-blue: #0055FF;           /* 品牌蓝 */
  --error-red: #F7594B;            /* 错误/热门红 */

  /* ===== 边框与分隔 ===== */
  --divider: rgba(255, 255, 255, 0.08);  /* 分隔线 */
  --border-subtle: #1F2023;              /* 卡片边框（HotEventCard） */
}
```

**组件专用颜色**：

| 用途 | 颜色值 | 说明 |
|------|--------|------|
| 毛玻璃背景 | `rgba(255,255,255,0.06)` | ActivityTicker 背景 |
| 毛玻璃边框 | `rgba(255,255,255,0.1)` | 倒计时单元格背景 |
| 进度条轨道 | `rgba(255,255,255,0.1)` | 条件进度条背景 |
| HotTag 背景 | `#2F0C08` | 深红棕色 |
| Promo 标签背景 | `#0F1F17` | 暗绿色（倒计时胶囊） |
| CTA 已完成背景 | `#122235` | 深蓝灰 |
| CTA 已完成文字 | `#2D4471` | 蓝灰色 |
| 进度文字 | `#8C8C8C` | 灰色 |

**渐变定义**：

```css
/* Hero 标题渐变 */
background: linear-gradient(102deg, #A7F757 51%, #2BC235 112%);

/* 邀请金额渐变 */
background: linear-gradient(97deg, #A7F757 51%, #2BC235 112%);

/* CTA 按钮渐变 */
background: radial-gradient(ellipse at 90% -40%, #fafbff, #c0d5fd 16%, #86aeff 55%, #c5dbfe 74%, #ecf5ff);

/* 条件进度条填充渐变 */
background: linear-gradient(90deg, #9ec6ff 40%, #fff);

/* GlassButton 边框渐变 */
background: linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 30%, rgba(255,255,255,0) 70%, rgba(255,255,255,0.1) 100%);
```

### 3.2 字阶系统

> 数据来源：Figma 设计稿 node-id=8251-163109

| 字号 | 字重 | 字体 | 用途 | 颜色 |
|------|------|------|------|------|
| 24px | 700 Bold | Switzer | Hero 主标题金额 | 渐变绿 |
| 20px | 700 Bold | Switzer | 徽章数字 | #070808 |
| 18px | 600 Semibold | Gate Switzer | 卡片标题、模块标题 | #FFFFFF / #A7F757 |
| 18px | 600 Semibold | Switzer | 活动卡片内标题 | #FFFFFF |
| 16px | 600 Semibold | Gate Switzer | Stats 数字、邀请文案 | #FFFFFF |
| 16px | 600 Semibold | Switzer | 活动卡片外标题 | #FFFFFF |
| 16px | 400 Regular | Switzer | Hero 副标题 | #FFFFFF |
| 14px | 500 Medium | Switzer | 任务标题 | #FFFFFF |
| 14px | 400 Regular | Switzer/Gate Switzer | 活动描述、Hot 数字 | #84888C / #A0A3A7 / #F7594B |
| 12px | 400 Regular | Switzer | **H5** View More（与 Stats 标签同的下划线样式） | #A0A3A7 |
| 12px | 600 Semibold | Switzer | 按钮文字、进度高亮 | #FFFFFF |
| 12px | 500 Medium | Gate Switzer | CTA 按钮、条件标题 | #070808 / #FFFFFF |
| 12px | 500 Medium | Switzer | 倒计时数字 | #070808 |
| 12px | 400 Regular | Switzer | 标签、描述、进度文字 | #A0A3A7 / #84888C |
| 10px | 500 Medium | Gate Switzer | 徽章标签、Promo 标签 | #FFFFFF / #A7F757 |
| 10px | 500 Medium | Switzer | "and" 分隔符 | #A0A3A7 |

#### 字体优先级

```css
font-family: 'Gate Switzer', 'Switzer', -apple-system, BlinkMacSystemFont, sans-serif;
```

- **Gate Switzer**: 用于标题、数字、按钮等需要品牌感的元素
- **Switzer**: 用于正文、描述、辅助文字

### 3.3 间距系统

| Token | H5 | Web | 用途 |
|-------|-----|-----|------|
| `--rh-page-padding` | 20px | 360px (auto) | 页面边距 |
| `--rh-content-width` | 335px | 1200px | 内容区宽度 |
| `--rh-card-padding` | 16px | 32px | 卡片内边距 |
| `--rh-card-gap` | 16px | 24px | 卡片间距 |
| `--rh-item-gap` | 12px | 16px | 列表项间距 |
| `--rh-section-gap` | 20px | 32px | 模块间距 |

### 3.4 圆角系统

| 组件 | H5 | Web | 说明 |
|------|-----|-----|------|
| 卡片（主要） | 12px | 24px | InviteCard, WelcomeCard, AdvancedTaskCard, StatsCard |
| 卡片（Hot Event 外层） | 12px | 16px | HotEventCard 外层边框 |
| 卡片（Hot Event 内层） | 8px | 16px | HotEventCard 内层背景 |
| 按钮（胶囊/GlassButton） | 34px | 999px | Check In, Share 按钮 |
| 按钮（CTA） | 16px | 20px | Deposit, Trade 等操作按钮 |
| 条件面板 | 12px | — | adv-conditions |
| 进度条 | 20px | — | condition-bar |
| 倒计时单元格 | 2px | — | cd-unit |
| Promo 标签 | 4px | — | promo-tag（H5）；Web 见 `rewards-hub-responsive-v1.html` |
| HotTag | 8px 2px 2px 2px | — | 左上角匹配卡片圆角 |
| 头像 | 100px-180px | — | 圆形 |

### 3.5 完整 CSS 样式速查（H5）

> 以下为 `rewards-hub-h5-v4.html` 中的完整 CSS 样式，可直接复制使用。

```css
/* ===== CSS 变量 ===== */
:root {
  --bg-page: #0D0D0D;
  --bg-card: #1A1A1A;
  --bg-tertiary: #18191B;
  --text-primary: #FFFFFF;
  --text-secondary: #A0A3A7;
  --text-tertiary: #84888C;
  --accent-green: #A7F757;
  --accent-green-dark: #2BC235;
  --brand-blue: #0055FF;
  --error-red: #F7594B;
  --divider: rgba(255,255,255,0.08);
  --border-subtle: #1F2023;
}

/* ===== 基础重置 ===== */
* { box-sizing: border-box; margin: 0; padding: 0 }
body {
  background: var(--bg-page);
  color: var(--text-primary);
  font-family: 'Switzer', -apple-system, sans-serif;
  max-width: 375px;
  margin: 0 auto;
}

/* ===== StatusBar ===== */
.status-bar { height: 44px; display: flex; justify-content: space-between; align-items: center; padding: 0 20px }
.status-bar-time { font-family: 'Urbanist', sans-serif; font-size: 15px; font-weight: 700; color: #fff; letter-spacing: -0.165px }
.status-bar-icons { display: flex; gap: 5px; align-items: center }

/* ===== NavBar ===== */
.nav-bar { height: 44px; display: flex; align-items: center; padding: 0 12px; gap: 16px }
.nav-back { width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; cursor: pointer }
.nav-back svg { width: 6.25px; height: 12.5px }
.nav-title { flex: 1; text-align: center; font-family: 'Switzer', sans-serif; font-size: 18px; font-weight: 500; color: #fff }
.nav-placeholder { width: 20px; height: 20px; opacity: 0 }

/* ===== HeroBanner ===== */
.hero { padding: 0 20px; display: flex; justify-content: space-between; align-items: center; height: 128px }
.hero-text { width: 156px; display: flex; flex-direction: column; gap: 12px }
.hero-titles { display: flex; flex-direction: column }
.hero-sub { font-size: 16px; font-weight: 400; color: #fff; line-height: normal }
.hero-title { font-size: 24px; font-weight: 700; line-height: 1.3; background: linear-gradient(102deg, #A7F757 51%, #2BC235 112%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; white-space: nowrap }
.hero-btns { display: flex; gap: 16px }
.btn-glass { height: 32px; width: 97px; background: transparent; border: none; border-radius: 34px; color: #fff; font-family: 'Switzer', sans-serif; font-size: 12px; font-weight: 600; display: flex; align-items: center; justify-content: center; gap: 4px; cursor: pointer; position: relative }
.btn-glass::before { content: ''; position: absolute; inset: 0; border-radius: 34px; padding: 1px; background: linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 30%, rgba(255,255,255,0) 70%, rgba(255,255,255,0.1) 100%); -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); -webkit-mask-composite: xor; mask-composite: exclude }
.btn-glass svg { width: 12px; height: 12px; flex-shrink: 0 }
.btn-glass-icon { width: 32px; height: 32px; padding: 0 }
.hero-image { width: 128px; height: 128px; flex-shrink: 0; position: relative; top: 16px }

/* H5：主副标题（WIN UP TO / 10,000+ USDT）flex 间距为 0 — 与 rewards-hub-responsive-v1.html 一致 */
body.mode-h5 .hero-titles .h5-only { display: flex; flex-direction: column; gap: 0 }

/* ===== ActivityTicker ===== */
.ticker { margin-top: 32px; height: 36px; background: rgba(255,255,255,0.06); display: flex; align-items: center; overflow: hidden }
.ticker-inner { display: flex; gap: 40px; align-items: center; white-space: nowrap; padding: 0 20px }
.ticker-item { display: flex; gap: 8px; align-items: center; flex-shrink: 0 }
.ticker-avatar { width: 20px; height: 20px; border-radius: 180px; background: linear-gradient(180deg, #bfbfbf 0%, #f1f5f8 176.75%); overflow: hidden; flex-shrink: 0 }
.ticker-avatar img { width: 100%; height: 100%; object-fit: cover }
.ticker-text { font-family: 'Switzer', sans-serif; font-size: 12px; font-weight: 400; color: #fff }
.ticker-text .time { color: #84888C }
/* H5 动画 - 75s */
@keyframes ticker-scroll-h5 { 0% { transform: translateX(0) } 100% { transform: translateX(-50%) } }
body.mode-h5 .ticker-inner { animation: ticker-scroll-h5 75s linear infinite }
/* Web 动画 - 50s */
@keyframes ticker-scroll-web { 0% { transform: translateX(0) } 100% { transform: translateX(-50%) } }
body.mode-web .ticker-inner { animation: ticker-scroll-web 50s linear infinite }

/* ===== StatsCard — Group 2147231287 + order history ===== */
.stats-section { margin-top: 32px; padding: 0 20px }
.stats-card { background: var(--bg-card); border-radius: 12px; padding: 12px 14px }
.stats-row { display: flex; align-items: center; justify-content: space-between }
.stats-item { flex: 1; text-align: center; min-width: 0 }
.stats-num { font-family: 'Gate Switzer', sans-serif; font-size: 16px; font-weight: 600; color: #fff; line-height: 1.2 }
.stats-label { font-size: 12px; font-weight: 400; color: #A0A3A7; margin-top: 2px; text-decoration: underline dotted; text-decoration-color: #A0A3A7; text-decoration-thickness: 7%; text-underline-offset: 3px }
.stats-divider { width: 1px; height: 20px; background: rgba(255,255,255,0.12); flex-shrink: 0; margin: 0 10px }
.stats-order-wrap { flex-shrink: 0; display: flex; align-items: center; justify-content: center; padding-left: 2px }
.stats-order-icon { display: block; width: 20px; height: 20px; object-fit: contain; opacity: 0.92; filter: brightness(0) invert(1) }

/* ===== InviteCard ===== */
.invite-card { margin: 32px 20px 0; background: var(--bg-card); border-radius: 12px; padding: 20px 16px 12px }
.invite-header { display: flex; gap: 12px; align-items: center; padding-bottom: 12px }
.invite-avatar { width: 32px; height: 32px; border-radius: 100px; overflow: hidden; flex-shrink: 0 }
.invite-avatar img { width: 100%; height: 100%; object-fit: cover }
.invite-content { flex: 1; display: flex; flex-direction: column; gap: 2px }
.invite-text { font-family: 'Gate Switzer', sans-serif; font-size: 16px; font-weight: 600; color: #fff; display: flex; gap: 2px; align-items: center; white-space: nowrap }
.invite-amount { font-family: 'Switzer', sans-serif; font-weight: 600; background: linear-gradient(97deg, #A7F757 51%, #2BC235 112%); -webkit-background-clip: text; -webkit-text-fill-color: transparent }

/* ===== Countdown ===== */
.countdown { display: flex; gap: 4px }
.cd-unit { background: rgba(255,255,255,0.1); border-radius: 2px; padding: 1px 2px; font-family: 'Switzer', sans-serif; font-size: 12px; font-weight: 400; color: #fff; min-width: 20px; height: 20px; display: flex; align-items: center; justify-content: center }
.cd-sep { font-family: 'Switzer', sans-serif; font-size: 12px; font-weight: 500; color: #666 }

/* ===== TaskRow（无 task-desc） ===== */
.task-row { display: flex; align-items: center; gap: 12px; padding: 30px 0 16px }
.task-row ~ .task-row { padding: 22px 0 20px }
.badge { width: 65px; height: 48px; position: relative; flex-shrink: 0 }
.badge-bg-bottom { position: absolute; top: 22px; left: 0; width: 65px; height: 27px }
.badge-bg-top { position: absolute; top: 0; left: 3px; width: 59px; height: 40px }
.badge-intersect { position: absolute; bottom: 3px; left: 7px; width: 51px; height: 15px }
.badge .num { position: absolute; top: 3px; left: 0; right: 0; font-family: 'Switzer', sans-serif; font-size: 20px; font-weight: 700; color: #070808; text-align: center; z-index: 1; line-height: normal }
.badge .label { position: absolute; bottom: 3px; left: 0; right: 0; font-family: 'Switzer', sans-serif; font-size: 10px; font-weight: 500; color: #fff; text-align: center; z-index: 1 }
.task-info { flex: 1; min-width: 0; display: flex; flex-direction: column; justify-content: center }
.task-title { font-family: 'Switzer', sans-serif; font-size: 14px; font-weight: 500; color: #fff; line-height: 1.3 }
.btn-cta { width: 85px; height: 28px; border-radius: 16px; border: none; font-family: 'Gate Switzer', sans-serif; font-size: 12px; font-weight: 500; color: #070808; cursor: pointer; background: radial-gradient(ellipse at 90% -40%, #fafbff, #c0d5fd 16%, #86aeff 55%, #c5dbfe 74%, #ecf5ff); flex-shrink: 0 }
.btn-cta.done { background: #122235; color: #2D4471 }

/* ===== WelcomeCard ===== */
.welcome-card { margin: 32px 20px 20px; background: var(--bg-card); border-radius: 12px; padding: 20px 16px 12px }
.welcome-header { margin-bottom: 0 }
.welcome-title { font-family: 'Gate Switzer', sans-serif; font-size: 18px; font-weight: 600; color: #fff; display: flex; gap: 2px; align-items: center; flex-wrap: wrap }
.welcome-amount { color: #A7F757 }
.welcome-sub { font-size: 12px; font-weight: 400; color: #A0A3A7; margin-top: 4px }
.welcome-rows { display: flex; flex-direction: column; gap: 12px; margin-top: 20px }
.welcome-row { display: flex; align-items: center; gap: 12px; padding: 22px 0 20px }
.welcome-row.has-promo { display: block; padding: 0 0 20px }
.welcome-row.has-promo .row-content { display: grid; grid-template-columns: 65px minmax(0,1fr) auto; grid-template-rows: auto auto; column-gap: 12px; row-gap: 6px; align-items: center; width: 100% }
.welcome-row.has-promo .badge { grid-column: 1; grid-row: 1 }
.welcome-row.has-promo .task-info { grid-column: 2; grid-row: 1; align-self: center; flex: initial; min-width: 0 }
.welcome-row.has-promo .btn-cta { grid-column: 3; grid-row: 1; align-self: center }
.welcome-row.has-promo .promo-tag { grid-column: 1; grid-row: 2; justify-self: start }
.promo-tag { display: inline-flex; align-items: center; justify-content: center; background: #0F1F17; border-radius: 4px; padding: 3px 6px; box-sizing: border-box; transform: translateY(-4px) }
.promo-tag .promo-countdown { font-family: 'Gate Switzer', sans-serif; font-size: 10px; font-weight: 500; color: #A7F757; line-height: 1.2; white-space: nowrap }

/* ===== AdvancedTaskCard ===== */
.adv-card { margin: 0 20px 0; background: var(--bg-card); border-radius: 12px; padding: 20px 12px 12px 16px; overflow: hidden }
.adv-header { margin-bottom: 12px }
.adv-title { font-family: 'Gate Switzer', sans-serif; font-size: 18px; font-weight: 600; color: #fff; line-height: normal }
.adv-amount { font-family: 'Gate Switzer', sans-serif; font-size: 18px; font-weight: 600; color: #A7F757; line-height: normal }
.adv-progress { margin-bottom: 10px }
.adv-progress-info { display: flex; justify-content: flex-start; font-size: 12px; margin-bottom: 10px }
.adv-progress-info .highlight { font-family: 'Gate Switzer', sans-serif; font-weight: 600; color: #fff }
.adv-progress-info .muted { font-family: 'Switzer', sans-serif; font-weight: 400; color: #8C8C8C }

/* ===== Milestones ===== */
.adv-milestones { display: flex; gap: 32px; align-items: flex-end; position: relative; padding-bottom: 12px; overflow-x: auto; scrollbar-width: none; -ms-overflow-style: none }
.adv-milestones::-webkit-scrollbar { display: none }
.adv-milestones::after { content: ''; position: absolute; bottom: 0; left: 0; width: 335px; height: 3px; background: url('rewards-hub-package/assets/progress-bar.svg') left center/contain no-repeat }
.milestone { display: flex; flex-direction: column; align-items: center; gap: 10px; flex-shrink: 0 }
.milestone.current { gap: 6px }
.milestone-badge { position: relative }
.milestone-badge.small { width: 35px; height: 26px; opacity: 0.4 }
.milestone-badge.medium { width: 52px; height: 38px; opacity: 1 }
.milestone-badge.combo { width: 58px; height: 27px; display: flex; align-items: flex-end }
.milestone-badge .badge-bg-bottom { position: absolute; bottom: 24px; left: 0; width: 100%; height: 56% }
.milestone-badge .badge-bg-top { position: absolute; top: 0; left: 4.6%; width: 90.8%; height: 83% }
.milestone-badge .badge-intersect { position: absolute; bottom: 8%; left: 10.8%; width: 78.4%; height: 31% }
.milestone-badge .badge-num { position: absolute; top: 4%; left: 0; right: 0; font-family: 'Switzer', sans-serif; font-weight: 700; color: #070808; text-align: center; line-height: 1; z-index: 1; transform: translateY(2px) }
.milestone-badge.small .badge-num { font-size: 10.5px }
.milestone-badge.medium .badge-num { font-size: 16px }
.milestone-badge .badge-label { position: absolute; bottom: 7%; left: 0; right: 0; font-family: 'Switzer', sans-serif; font-weight: 500; color: #fff; text-align: center; z-index: 1 }
.milestone-badge.small .badge-label { font-size: 5.3px }
.milestone-badge.medium .badge-label { font-size: 8px }
.milestone-badge.combo .vip-part { position: relative; width: 37px; height: 27px }
.milestone-badge.combo .usdt-part { position: relative; width: 24px; height: 18px; opacity: 0.5; margin-left: -3px }
.adv-milestones .milestone-badge.combo .usdt-part { transform: translateY(-4px) }
.milestone-badge.combo .vip-part .badge-num { font-size: 11px }
.milestone-badge.combo .vip-part .badge-num.vip { top: 5% }
.milestone-badge.combo .vip-part .badge-label { font-size: 5.6px }
.milestone-badge.combo .usdt-part .badge-num { font-size: 7.3px }
.milestone-badge.combo .usdt-part .badge-label { font-size: 3.7px }
.milestone-label { font-family: 'Switzer', sans-serif; font-size: 12px; font-weight: 400; color: #A0A3A7; display: flex; align-items: center; gap: 2px; white-space: nowrap }
.milestone-label.current { font-weight: 600; color: #fff }
.milestone-label.current img { transform: translateX(-2px) }
.milestone-label svg { width: 12px; height: 12px; flex-shrink: 0 }

/* ===== Conditions Panel ===== */
.adv-conditions { position: relative; border-radius: 12px; padding: 23px 12px 16px; background: transparent; margin-top: 16px }
.adv-conditions::before { content: ''; position: absolute; inset: -8px 0 0 0; background: url('rewards-hub-package/assets/adv-conditions-frame.svg') center top/100% 100% no-repeat; pointer-events: none }
.condition-row { display: flex; justify-content: space-between; align-items: center; gap: 16px }
.condition-info { flex: 1; display: flex; flex-direction: column; gap: 8px }
.condition-title { font-family: 'Switzer', sans-serif; font-size: 12px; font-weight: 500; color: #fff; line-height: normal }
.condition-bar { height: 3px; background: rgba(255,255,255,0.1); border-radius: 20px; position: relative; overflow: hidden }
.condition-bar-fill { position: absolute; left: 0; top: 0; height: 100%; background: linear-gradient(90deg, #9ec6ff 40%, #fff); border-radius: 20px }
.condition-progress { font-family: 'Switzer', sans-serif; font-size: 12px; font-weight: 500; color: #84888C; margin-top: 6px }
.condition-progress b { font-weight: 400; color: #fff }
.condition-divider { display: flex; align-items: center; justify-content: center; padding: 8px 0; position: relative }
.condition-divider::before { content: ''; position: absolute; left: 0; right: 0; top: 50%; height: 1px; background: url('rewards-hub-package/assets/condition-divider-line-dark.svg') center/100% 1px no-repeat }
.condition-divider em { font-style: normal; font-family: 'Switzer', sans-serif; font-size: 10px; font-weight: 500; color: #A0A3A7; background: #1A1A1A; padding: 2px 8px; border-radius: 26px; position: relative; z-index: 1 }

/* ===== SectionHeader（Hot 区块 margin-top 与 adv 间距由标题承担） ===== */
.section-header { display: flex; justify-content: space-between; align-items: center; margin-top: 32px; padding: 0 20px 20px }
.section-title { font-family: 'Gate Switzer', sans-serif; font-size: 18px; font-weight: 600; color: #fff }
.section-more { font-size: 12px; font-weight: 400; color: #A0A3A7; text-decoration: underline dotted; text-decoration-color: #A0A3A7; text-decoration-thickness: 7%; text-underline-offset: 3px }

/* ===== HotEventCard ===== */
.hot-card { margin: 0 20px 20px; border: 1px solid var(--border-subtle); border-radius: 12px; padding: 16px }
.hot-inner { background: var(--bg-tertiary); border-radius: 8px; padding: 16px; position: relative; min-height: 150px; overflow: hidden }
.hot-tag { position: absolute; top: 0; left: 0; background: #2F0C08; padding: 2px 4px; border-radius: 8px 2px 2px 2px; font-size: 14px; font-weight: 400; color: #F7594B; display: flex; align-items: center; gap: 4px }
.hot-tag img { width: 12px; height: 12px }
.hot-content { display: flex; gap: 8px; margin-top: 22px }
.hot-text { flex: 1 }
.hot-inner-title { font-size: 18px; font-weight: 600; color: #fff; line-height: 1.3 }
.hot-inner-desc { font-size: 14px; font-weight: 400; color: var(--text-secondary); margin-top: 8px; line-height: 1.3 }
.hot-img { width: 88px; height: 88px; border-radius: 8px; background: url('rewards-hub-package/assets/hot-event-cover.png') center/cover }
.hot-outer-title { font-size: 16px; font-weight: 600; color: #fff; margin-top: 16px; line-height: 1.3 }
.hot-countdown { margin-top: 16px }

/* ===== Footer ===== */
.footer { padding: 24px 20px 40px; text-align: center }
.footer-text { font-size: 12px; color: #444 }
```

---

## 区块 4: 页面结构

### 4.1 新客页面（H5 375px）

```
┌──────────────────────────────────────┐  ← 375px
│  StatusBar (44px)                    │
│  9:41                    📶 📡 🔋    │
├──────────────────────────────────────┤
│  NavBar (44px)                       │
│  ‹        Rewards Hub                │
├──────────────────────────────────────┤
│  HeroBanner — 335×128px              │
│  padding: 0 20px; height: 128px      │
│  display: flex; justify-content:     │
│  space-between; align-items: center  │
│  ┌─────────────────────┬──────────┐  │
│  │ WIN UP TO           │          │  │
│  │ 10,000+ USDT (渐变) │  [图片]  │  │
│  │ [📅 Check In] [↗]   │ 128×128  │  │
│  │                     │ top:16px │  │
│  │ 左侧宽度: 156px     │          │  │
│  │ 文字与按钮间距: 12px │          │  │
│  │ 按钮间距: 16px      │          │  │
│  └─────────────────────┴──────────┘  │
├──────────────────────────────────────┤
│  ActivityTicker — 毛玻璃滚动播报      │
│  margin-top: 32px                    │
│  height: 36px                        │
│  background: rgba(255,255,255,0.06)  │
│  ┌────────────────────────────────┐  │
│  │ [👤] xxx won 10 USDT · 8min    │  │
│  │ [👤] xxx won 50 USDT · 12min   │  │
│  │ ...                            │  │
│  │ ← 16条横向滚动, gap: 40px      │  │
│  │ ← 动画 75s, ×2 重复无缝滚动    │  │
│  └────────────────────────────────┘  │
├──────────────────────────────────────┤
│  StatsCard — 335×auto                │
│  margin-top: 32px; padding: 0 20px   │
│  ┌────────────────────────────────┐  │
│  │  3        1      │  📋 order   │  │  stats-row: space-between
│  │ Vouchers Event   │  (20×20)    │  │  竖线 20×1 #fff 12%
│  └────────────────────────────────┘  │  （无 My Records 文案/箭头）
├──────────────────────────────────────┤
│  InviteCard — 合并容器               │
│  margin: 32px 20px 0                 │
│  padding: 20px 16px 12px             │
│  ┌────────────────────────────────┐  │
│  │ [Avatar] ALice invite you...   │  │
│  │ 32×32    claim 15 USDT (渐变)  │  │
│  │          3D : 03 : 59 : 23     │  │
│  │ (padding-bottom: 12px)         │  │
│  │                                │  │
│  │ [5 USDT] Identity verification [Done] │  ← pt:30px pb:16px
│  │                                │  │
│  │ [10 USDT] First Deposit ≥ 50 USDT [Deposit] │  ← pt:22px pb:20px
│  │                                │  │
│  │ [10 USDT] Spot Trade ≥ 50… / Future… [Trade] │
│  └────────────────────────────────┘  │
│  (无任务行分隔线)                     │
├──────────────────────────────────────┤
│  WelcomeCard — Welcome Package       │
│  margin: 32px 20px 20px              │
│  padding: 20px 16px 12px             │
│  ┌────────────────────────────────┐  │
│  │ Welcome Package worth 135 USDT │  │
│  │ Complete all beginner tasks to receive rewards │
│  │ (margin-top: 20px 到任务列表)   │  │
│  │                                │  │
│  │ [50] Sign Up           [Sign Up] │  ← 无 Promo, padding: 22px 0 20px
│  │                                │  │
│  │ row-content: CSS Grid 65px | 1fr | CTA     │  ← has-promo
│  │ [15] Identity Verification [Verify]       │     第2行: promo-tag 跨第1列
│  │   └ 3D 03:59:23（#0F1F17 胶囊）            │
│  │ [30] First Deposit ≥ 50 USDT [Deposit]    │
│  │   └ countdown…                             │
│  │ [30] First Spot or Futures… [Trade]       │
│  │   └ countdown…                             │
│  └────────────────────────────────┘  │
│  (任务行之间 gap: 12px, 无分隔线)     │
├──────────────────────────────────────┤
│  AdvancedTaskCard — 进阶交易任务      │
│  margin: 0 20px 0（底边距 0）         │
│  ┌────────────────────────────────┐  │
│  │ Advanced Trading Task to win…  │  │
│  │ 15,000 USDT                    │  │
│  │ 10/15,000 USDT（左对齐单行）   │  │
│  │ [10✓][40🔒][VIP5+300🔒][100🔒] │  │  前 3 枚徽章可无 badge-bg-bottom
│  │ ════════════════════ progress-bar.svg │
│  │ ┌──────────────────────────┐  │  │
│  │ │ Net Deposit ≥ 1,000      │  │  │
│  │ │ ——— and ———              │  │  │
│  │ │ Trading ≥ 300,000        │  │  │
│  │ └──────────────────────────┘  │  │
│  └────────────────────────────────┘  │
├──────────────────────────────────────┤
│  SectionHeader: Hot Event  View More │
│  margin-top: 32px; padding: 0 20px 20px │  （与 Advanced 卡片的垂直间距）
├──────────────────────────────────────┤
│  [HotEventCard] × 2                  │
│  margin: 0 20px 20px                 │
├──────────────────────────────────────┤
│  Footer — Gate © 2013-2026           │
│  padding: 24px 20px 40px             │
└──────────────────────────────────────┘
```

**关键布局参数**：

| 模块 | 间距规则 |
|------|----------|
| HeroBanner 容器 | `padding: 0 20px`, `height: 128px`, `display: flex`, `justify-content: space-between`, `align-items: center` |
| HeroBanner 图片 | `128×128px`, `position: relative; top: 16px` |
| HeroBanner 左侧 | `width: 156px`, 文字与按钮 `gap: 12px`, 按钮间 `gap: 16px` |
| HeroBanner 主副标题（H5） | `.hero-titles .h5-only`：`display:flex; flex-direction:column; **gap:0**`（`hero-sub` 与 `hero-title` 无额外间距） |
| ActivityTicker | `margin-top: 32px` (距 HeroBanner) |
| StatsCard | `margin-top: 32px` (距 ActivityTicker)；卡片内：`padding: 12px 14px`，两数据列 + `stats-divider`（20px 高）+ `icon-order-history`（20×20） |
| AdvancedTaskCard 与 Hot | `adv-card` 底边距 **0**；`section-header` `margin-top: 32px` 承担模块间距 |
| InviteCard | `margin: 32px 20px 0`, `padding: 20px 16px 12px` |
| InviteCard 头部 | `padding-bottom: 12px`, Avatar `32×32px` |
| InviteCard 任务行1 | `padding: 30px 0 16px`，**无分隔线** |
| InviteCard 任务行2+ | `padding: 22px 0 20px`，**无分隔线** |
| RewardBadge | `65×48px`, 3层图片叠加 |
| WelcomeCard | `margin: 32px 20px 20px`, `padding: 20px 16px 12px`，**无分隔线** |
| WelcomeCard 标题区 | `margin-bottom: 0`，任务列表 `margin-top: 20px` |
| WelcomeCard 任务列表 | `display: flex; flex-direction: column; gap: 12px` |
| WelcomeCard 普通行 | `padding: 22px 0 20px`，水平布局 |
| WelcomeCard Promo行 | `display: block`；`.row-content` 为 **Grid**（65px \| minmax(0,1fr) \| auto + 第二行 promo-tag） |
| AdvancedTaskCard | `margin: 0 20px 0`, `padding: 20px 12px 12px 16px`, `border-radius: 12px` |
| AdvancedTaskCard 标题 | `margin-bottom: 12px` |
| AdvancedTaskCard 里程碑 | `gap: 32px`, `align-items: flex-end`, `padding-bottom: 12px`；底条 `::after` 使用 `progress-bar.svg` |
| AdvancedTaskCard 徽章 | `.badge-num` `transform: translateY(2px)`；combo 的 `.usdt-part` `translateY(-4px)`；**10/40/VIP+300 档位 HTML 可不渲染 `img.badge-bg-bottom`**，仅 100 USDT 小徽章保留 |
| AdvancedTaskCard 条件面板 | `padding: 23px 12px 16px`, `border-radius: 12px`, `background: transparent`，使用图片边框 |
| HotEventCard | `margin: 0 20px 20px` |

**模块间距统一规则**：主要模块之间垂直间距为 **32px**

### 4.2 老客页面（H5 375px）

```
┌──────────────────────────────────────┐
│  StatusBar + NavBar                  │
├──────────────────────────────────────┤
│  HeroBanner — 335×149px              │
├──────────────────────────────────────┤
│  ActivityTicker                      │
├──────────────────────────────────────┤
│  StatsCard — 3 列数据                │
│  Credits: 268 | Vouchers: 3 | Event  │
├──────────────────────────────────────┤
│  GTTabs — 任务分类切换               │
│  [All] [Deposit] [Trade] [VIP]       │
├──────────────────────────────────────┤
│  SectionHeader: Exclusive Tasks      │
│  [ExclusiveTaskCard] × N             │
├──────────────────────────────────────┤
│  SectionHeader: Regular Tasks        │
│  [RegularTaskCard] × 3               │
│  [∨ 展开更多]                        │
├──────────────────────────────────────┤
│  SectionHeader: My Voucher           │
│  [VoucherCard] 瀑布流 2 列           │
│  (含 Credits Draw 变体)              │
└──────────────────────────────────────┘
```

### 4.3 新客页面（Web 1920px）

> **数据来源**: `rewards-hub-responsive-v1.html` Web 端样式
> **内容区宽度**: 1200px 居中

```
┌─────────────────────────────────────────────────────────────┐  ← 1920px
│  WebHeader — 48px, 全宽背景 #070808 + blur(50px)            │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ [Logo] Gate | Buy Crypto ▼ | Markets | Trade ▼ |   │   │
│  │ Futures ▼ | Earn ▼ | Community ▼ | Web3 | More ▼ | │   │
│  │ [🎁 Rewards Hub]              Log In | Sign Up |   │   │
│  │                               [🔍][📥][🌐][🌙][⚙️] │   │
│  └─────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│  WebHeroBanner — 1200×410px                                 │
│  padding-top: 67px                                          │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Win up to 10,000+USDT (65px/700 渐变绿)             │   │
│  │ Rewards Hub (31px/400)                              │   │
│  │                                                      │   │
│  │ 8,000          |  200,983           [插图 386×332]  │   │
│  │ Unlocked prize |  Users Completed   position:right  │   │
│  │ (42px/300)     |  (42px/300)        top: 99px       │   │
│  │                                                      │   │
│  │ [📅 Check In 145×48] [↗ 48×48]  margin-top: 50px   │   │
│  └─────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│  WebActivityTicker — 60px, 16 条并排滚动, 动画 50s          │
│  margin-top: 40px, 头像 36×36px, 文字 14px, gap: 60px      │
├─────────────────────────────────────────────────────────────┤
│  WebStatsCard — 与 H5 同结构（见 rewards-hub-responsive-v1）  │
│  margin-top: 40px; padding: 24px 32px; border-radius: 16px   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  两列数据（flex:1 居中） │ 竖线 40px 高 │ order 32×32   │   │
│  │  数字 32px；标签 16px，带点状下划线（与 H5 一致）      │   │
│  └─────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│  WebInviteCard — 1200×407px                                 │
│  margin-top: 53px, padding: 32px, border-radius: 16px      │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ [Avatar 40×40] Alice invite you to claim 25 USDT (Web) │   │
│  │ H5 同期仍为 15 USDT（.h5-only / .web-only 分层）      │   │
│  │ (24px)                     [3D:03:59:23] 右上角     │   │
│  │                            (40×40px 单元格)         │   │
│  │ ─────────────────────────────────────────────────── │   │
│  │ ┌──────────────┬──────────────┬──────────────┐     │   │
│  │ │   [Badge]    │   [Badge]    │   [Badge]    │     │   │
│  │ │  110×82px    │  110×82px    │  110×82px    │     │   │
│  │ │   5 USDT     │   10 USDT    │   10 USDT    │     │   │
│  │ │  Identity    │   Deposit    │  Spot/Future │     │   │
│  │ │ [Completed]  │  [Deposit]   │   [Trade]    │     │   │
│  │ └──────────────┴──────────────┴──────────────┘     │   │
│  │ 3 列网格, gap: 24px, padding: 24px, bg: #111       │   │
│  └─────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│  WebWelcomePackage — 1200px                                 │
│  margin-top: 53px, padding: 32px, border-radius: 16px      │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Welcome Package worth 135 USDT (24px)               │   │
│  │ Complete all beginner tasks... (18px/#84888C)       │   │
│  │                                                      │   │
│  │ ┌────────┬────────┬────────┬────────┐              │   │
│  │ │[Badge] │[Promo] │[Promo] │[Promo] │              │   │
│  │ │110×82  │[Badge] │[Badge] │[Badge] │              │   │
│  │ │50 USDT │15 USDT │30 USDT │30 USDT │              │   │
│  │ │Sign Up │Identity│Deposit │Trading │              │   │
│  │ │[SignUp]│[Verify]│[Deposit│[Trade] │              │   │
│  │ └────────┴────────┴────────┴────────┘              │   │
│  │ 4 列网格, gap: 0, 垂直居中对齐                       │   │
│  └─────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│  WebAdvancedTaskCard — 1200px                               │
│  margin-bottom: 53px, padding: 32px, border-radius: 16px   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Advanced Trading Task to win up to 15,000 USDT      │   │
│  │ (24px)                                              │   │
│  │                                                      │   │
│  │ [10]      [40]      [VIP5+300]    [50]    [150]    │   │
│  │ 64×47    88×65      175×69       64×47   64×47     │   │
│  │ ═══════════════════════════════════════════════════ │   │
│  │ 里程碑横向排列, flex:1, justify-content: space-between │
│  │ 进度条 6px 高, 底部 20px                             │   │
│  │                                                      │   │
│  │ ┌─────────────────────┬─────────────────────┐      │   │
│  │ │ Net Deposit ≥ 1,000 │ Trading ≥ 300,000   │      │   │
│  │ │ (24px/600)          │ (24px/600)          │      │   │
│  │ │ ████████░░░░░░░░░░░ │ ░░░░░░░░░░░░░░░░░░░ │      │   │
│  │ │ 200/1,000 (16px)    │ 0/3,000 (16px)      │      │   │
│  │ │ [Deposit]           │ [Trade]             │      │   │
│  │ └─────────────────────┴─────────────────────┘      │   │
│  │ 2 列布局, 中间 "and" 分隔符                          │   │
│  └─────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│  SectionHeader: Hot Event (24px)          More → (16px)    │
│  margin-top: 64px（承接 Advanced 模块间距）；padding-bottom: 20px │
├─────────────────────────────────────────────────────────────┤
│  [WebHotEventCard] × 9 (3×3 网格, 384px 单卡, gap: 24px)   │
│  H5 显示 3 张, Web 显示 9 张 (6 张 web-only)               │
│  ┌────────────────┬────────────────┬────────────────┐      │
│  │ [HotTag]       │ [HotTag]       │ [HotTag]       │      │
│  │ 标题 18px/600  │ 标题 18px/600  │ 标题 18px/600  │      │
│  │ 描述 14px      │ 描述 14px      │ 描述 14px      │      │
│  │ [96×96 图片]   │ [96×96 图片]   │ [96×96 图片]   │      │
│  │ 外标题 16px    │ 外标题 16px    │ 外标题 16px    │      │
│  │ Ends In 3D:... │ Ends In 5D:... │ Ends In 2D:... │      │
│  ├────────────────┼────────────────┼────────────────┤      │
│  │ [HotTag]       │ [HotTag]       │ [HotTag]       │      │
│  │ ...            │ ...            │ ...            │      │
│  ├────────────────┼────────────────┼────────────────┤      │
│  │ [HotTag]       │ [HotTag]       │ [HotTag]       │      │
│  │ ...            │ ...            │ ...            │      │
│  └────────────────┴────────────────┴────────────────┘      │
├─────────────────────────────────────────────────────────────┤
│  Footer — padding: 40px 0 60px                              │
│  Gate © 2013-2026 (14px)                                    │
└─────────────────────────────────────────────────────────────┘
```

**Web 端关键布局参数**：

| 模块 | 参数 |
|------|------|
| 页面宽度 | 1920px，内容区 1200px 居中 |
| WebHeader | `height: 48px`, `background: #070808`, `backdrop-filter: blur(50px)`, 全宽 |
| WebHeader 导航 | 14px/500, `gap: 20px`, Rewards Hub 高亮 `#A7F757` |
| WebHeader 按钮 | Log In 14px/500, Sign Up `28px` 高 `#fff` 背景 `border-radius: 99px` |
| HeroBanner | `height: 410px`, `padding-top: 67px`, 插图 `386×332px` 右侧绝对定位 `top: 99px` |
| HeroBanner 标题 | 先显示金额（65px/700 渐变），再显示 "Rewards Hub"（31px/400） |
| HeroBanner 统计 | `gap: 36px`, 数字 **42px/300 Light**, 标签 18px/400/#84888C |
| HeroBanner 按钮 | `margin-top: 50px`, Check In `145×48px`, 分享 `48×48px`, `border-radius: 999px` |
| ActivityTicker | `height: 60px`, `margin-top: 40px`, 头像 `36×36px`, 文字 14px, `gap: 60px`, **16 条滚动**, **动画 50s** |
| StatsCard | `margin-top: 40px`, `padding: 24px 32px`, `border-radius: 16px`; 数字 **32px**, 标签 **16px** + 点状下划线；**竖线 40px**；**`icon-order-history.png` 32×32**（与 H5 同一套结构） |
| InviteCard | `margin-top: 53px`, `padding: 32px`, `border-radius: 16px` |
| InviteCard 头像 | `40×40px` |
| InviteCard 文案 | 24px |
| InviteCard 邀请金额 | **Web：25 USDT**（`.invite-amount.web-only`）；**H5：15 USDT**（`.invite-amount.h5-only`） |
| InviteCard 倒计时 | 右上角绝对定位, 单元格 `40×40px`, 字号 20px, `gap: 8px`；**冒号与数字垂直居中**：`.countdown` `align-items:center`；`.cd-sep` `line-height:1` + `inline-flex` 对齐 + `min-height:40px` |
| InviteCard 任务网格 | 3 列, `gap: 24px`, `padding: 24px`, `background: #111`, `border-radius: 12px` |
| InviteCard 徽章 | `110×82px`, 数字 32px, 标签 14px |
| WelcomeCard | `margin: 53px auto 32px`, `padding: 32px`, `border-radius: 16px` |
| WelcomeCard 标题 | 24px |
| WelcomeCard 副标题 | 18px / #84888C |
| WelcomeCard 任务网格 | 4 列, `gap: 0`, 垂直居中 |
| WelcomeCard 徽章 | `110×82px`, 数字 32px, 标签 14px |
| AdvancedTaskCard | `margin: 0 auto 53px`, `padding: 32px`, `border-radius: 16px` |
| AdvancedTaskCard 标题 | 24px |
| AdvancedTaskCard 里程碑（Web） | `gap:0`；`justify-content:space-between`；每列 `flex:1` 等分；**底部进度**：DOM 使用与条件栏相同的 `.condition-bar` + `.condition-bar-fill`（示例 `width:50%` 对齐第 3 列中心）；`body.mode-web .adv-milestones::after` 关闭；combo 中 **300** 徽章 `transform:scale(1.2)`、`z-index:2` 压在 VIP 上 |
| AdvancedTaskCard 徽章（Web, 参考 HTML） | small/medium 约 `67×50`；combo 盒 `min-height:60px`；文案/档位以 `rewards-hub-responsive-v1.html` 为准 |
| AdvancedTaskCard 里程碑文案（Web） | `.milestone-label.amount`：**18px**；当前项 **20px**；左侧状态图 **18×18**；「300」高亮 **无**黄底 pill（`highlight-num` 与行内字同色） |
| AdvancedTaskCard 条件面板（Web） | `::before`：铺贴 **`adv-conditions-border-web.png`**（设计线框 **1016×283**，`background-size:100% 100%`，**直角** `border-radius:0`）；**无** `::after`；**`condition-title`**：两行定高同上 |
| SectionHeader | 标题 24px, View More **16px** + 点状下划线；**Web：`margin:64px auto 0`**（与 Advanced 模块间距） |
| HotEventCard（Web 外壳） | **3×3 网格**，`gap:24px`；**外层** `border:1px solid #1F2023`、`background:transparent`（`box-sizing:border-box`）；内层 `.hot-inner` 仍 `--bg-tertiary` |
| HotEventCard 内卡 | `padding: 16px 16px 20px`, `min-height: 156px`, `border-radius: 12px` |
| HotEventCard 图片 | `96×96px` |
| HotEventCard 标题（Web 定高） | 内标题 `min-height:calc(2em*1.33)`；内描述 **固定 4 行高** + `-webkit-line-clamp:4`；外标题 `min-height:calc(2em*1.31)`（与首卡栅格对齐，以 responsive 为准） |
| HotEventCard 倒计时 | "Ends In" + 倒计时, 单元格 `24×20px`, 字号 12px |
| Footer | `padding: 40px 0 60px`, 14px |

**Web 端 CSS 变量覆盖**：

```css
/* Web 端专用样式（body.mode-web 时生效） */
body.mode-web {
  max-width: 1920px;
}

/* 隐藏 H5 专属元素 */
body.mode-web .status-bar { display: none }
body.mode-web .nav-bar { display: none }

/* Web Header 导航栏 */
.web-header { display: none }
body.mode-web .web-header {
  display: flex;
  height: 48px;
  width: 100%;
  background: #070808;
  backdrop-filter: blur(50px);
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  position: relative;
  z-index: 100;
}
.web-header-left { display: flex; align-items: center; gap: 20px }
.web-header-logo { display: flex; align-items: center }
/* Logo 图标: 24×24px */
/* Logo 文字 "gate": 77×22px, margin-left: 4px */
/* 整体尺寸约 105×24px */
.web-header-nav { display: flex; align-items: center; gap: 20px }
.web-header-nav-item { 
  display: flex; align-items: center; gap: 2px; 
  font-family: 'Switzer'; font-size: 14px; font-weight: 500; color: #fff; cursor: pointer 
}
.web-header-nav-item.highlight { color: #A7F757 }
/* Rewards Hub 图标: 24×24px 礼盒图片 */
.web-header-right { display: flex; align-items: center; gap: 16px }
.web-header-login { font-family: 'Switzer'; font-size: 14px; font-weight: 500; color: #fff }
.web-header-signup { 
  height: 28px; padding: 0 12px; background: #fff; border-radius: 99px; 
  font-family: 'Switzer'; font-size: 12px; font-weight: 500; color: #070808 
}
.web-header-divider { width: 1px; height: 16px; background: rgba(255,255,255,0.2) }
.web-header-icon { width: 24px; height: 24px; cursor: pointer; opacity: 0.8 }

/* 内容区居中 */
.hero, .stats-section, .invite-card, .welcome-card, .adv-card, .section-header, .hot-cards-wrapper, .footer {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

/* Hero Banner */
body.mode-web .hero { height: 410px; padding: 67px 0 0; position: relative }
body.mode-web .hero-stat-num { font-size: 42px; font-weight: 300; color: #fff }
body.mode-web .hero-image { top: 99px; position: absolute; right: 0 }

/* ActivityTicker */
body.mode-web .ticker { margin-top: 40px; height: 60px }
body.mode-web .ticker-inner { animation: ticker-scroll-web 50s linear infinite }

/* StatsCard — 与当前 responsive-v1 一致 */
body.mode-web .stats-section { margin-top: 40px; padding: 0; max-width: 1200px; margin-left: auto; margin-right: auto }
body.mode-web .stats-card { padding: 24px 32px; border-radius: 16px }
body.mode-web .stats-num { font-size: 32px }
body.mode-web .stats-label { font-size: 16px; margin-top: 4px }
body.mode-web .stats-divider { height: 40px; margin: 0 24px }
body.mode-web .stats-order-icon { width: 32px; height: 32px }
```
### 4.4 共享组件引用

| 组件 | 来源 | H5 尺寸 | Web 尺寸 |
|------|------|---------|----------|
| CountdownTimer | [countdown-timer.md](../components/countdown-timer.md) | 20px 单元 | 40px 单元 |
| GradientCTA | [gradient-cta.md](../components/gradient-cta.md) | 85×28px | 100×40px |
| GlassButton | [glass-button.md](../components/glass-button.md) | 90×32px | 145×48px |
| HotTag | [hot-tag.md](../components/hot-tag.md) | 浅红背景+火焰图标 | — |
| PromoTag | [promo-tag.md](../components/promo-tag.md) | `#0F1F17` 胶囊 + `.promo-countdown`（可用 `data-promo-end` 驱动） | — |
| RewardBadge | [reward-badge.md](../components/reward-badge.md) | 65×48px | 72×56px |
| ActivityTicker | [activity-ticker.md](../components/activity-ticker.md) | 16 条滚动 (75s) | 16 条滚动 (50s) |
| SectionHeader | [section-header.md](../components/section-header.md) | 标题 18px；View More 12px | 标题 24px；More 16px |
| ProgressBar | [_platform](../../_platform/components/progress-bar.md) | 3px 高 | 4px 高 |

---

## 区块 5: 业务专属组件

### StatsCard 数据统计卡片

> 对齐 Figma **Group 2147231287**：两列指标 + 竖向分隔 + **订单/记录**入口（`icon-order-history.png`）。**已移除**卡片外的「My Records」文案与箭头。

```
┌────────────────────────────────────┐  ← 335px (margin-top: 32px, padding: 0 20px)
│  padding: 12px 14px                │
│  ┌──────────────────────────────┐  │
│  │ 3      1      |   [📋 20]   │  │  stats-row: space-between
│  │ Vouch. Event  │   order     │  │  竖线 20×1 rgba(255,255,255,0.12)
│  └──────────────────────────────┘  │
└────────────────────────────────────┘
```

| 属性 | H5 | Web（`rewards-hub-responsive-v1`） |
|------|-----|-----|
| 容器外边距 | `margin-top: 32px; padding: 0 20px` | `margin-top: 40px`; 内容区 `max-width: 1200px` 居中 |
| 卡片背景 | `#1A1A1A` | `#1A1A1A` |
| 卡片圆角 | 12px | 16px |
| 卡片内边距 | `12px 14px` | `24px 32px` |
| 数据行布局 | `display: flex; align-items: center; justify-content: space-between` | 同左 |
| 数据列 | `.stats-item` `flex: 1` 居中 | 同左 |
| 竖线 `.stats-divider` | 宽 1px，**高 20px**，左右 margin `0 10px` | **高 40px**，`margin: 0 24px` |
| 订单入口 | `.stats-order-icon` **20×20**，`filter: brightness(0) invert(1)` | **32×32** |
| 数字 | 16px / 600 Semibold / `#FFFFFF` | **32px** / 600（继承） |
| 标签 | 12px / 400 / `#A0A3A7` + 点状下划线（`thickness: 7%`, `offset: 3px`） | **16px**，同样点状下划线，`margin-top: 4px` |

**新客 H5 / 参考 HTML — 2 项**：My Vouchers / My Event（示例数据 `3` / `1`）
**新客 Web — 布局同 H5**；文案可按业务替换为 My Earned (USDT) / My Vouchers 等
**老客 3 项**：My Credits / My Vouchers / My Event（实现时在三列数据上扩展，右侧入口逻辑保持一致）

---

### InviteTaskRow 邀请任务行（新客专属）

> 紧跟 UserInviteBanner 下方，展示邀请相关的 3 个子任务。

```
H5（行式布局，无 task-desc，无行间分隔线）：
┌─────────────────────────────────────────┐
│  ┌────┐  Identity verification  [Done] │
│  │ 5  │                                │
│  │USDT│                                │
│  └────┘                                │
│  ┌────┐  First Deposit ≥ 50 USDT [Dep] │
│  │ 10 │                                │
│  │USDT│                                │
│  └────┘                                │
│  ┌────┐  Spot Trade ≥ 50… / Future… [T]│
│  │ 10 │                                │
│  │USDT│                                │
│  └────┘                                │
└─────────────────────────────────────────┘

Web（列式布局）：
┌──────────┬──────────┬──────────┐
│  ┌────┐  │  ┌────┐  │  ┌────┐  │
│  │ 5  │  │  │ 10 │  │  │ 10 │  │
│  │USDT│  │  │USDT│  │  │USDT│  │
│  └────┘  │  └────┘  │  └────┘  │
│ Identity │ Deposit  │ Spot or  │
│ verific. │          │ Future   │
│[Complete]│[Deposit] │ [Trade]  │
└──────────┴──────────┴──────────┘
```

| 属性 | H5 | Web |
|------|-----|-----|
| 布局 | **3 行纵排**（badge左/文本中/CTA右） | 3 列横排，等分 |
| 容器宽度 | 335px | 1136px |
| 容器高度 | ~120px | ~160px |
| 背景 | `#1A1A1A` | `#1A1A1A` |
| 圆角 | 16px | 24px |
| 内边距 | 16px | 32px |
| RewardBadge | 65×48px → [共享](../components/reward-badge.md) | 72×56px |
| 任务名称 | 16px / 500 Medium | 18px / 500 Medium |
| 任务描述 | 12px / 400 / `#84888C` | 14px / 400 / `#84888C` |
| CTA | 85×28px → [共享](../components/gradient-cta.md) | 100×36px |

**CTA 状态**：
| 状态 | 样式 |
|------|------|
| 待完成 | 蓝色渐变（Deposit / Trade） |
| 已完成 | 绿色描边 "Completed" |

**示例数据**：

| 序号 | 任务 | 奖励 | 描述 |
|------|------|------|------|
| 1 | Identity verification | 5 USDT | — |
| 2 | Deposit | 10 USDT | Deposit ≥ a USDT |
| 3 | Spot or Future Trade | 10 USDT | Spot trade ≥ a USDT or future trade ≥ b USDT |

---

### DividerWithLabel 带标签分割线

| 属性 | 值 |
|------|-----|
| 线条 | 1px dashed `#3A3A3A` |
| 标签 | 13px / 400 / `#84888C` |
| 标签背景 | 与容器背景一致 |
| 标签内边距 | 0 8px |

**示例**：`——— and ———`

---

### TaskRow 任务行

```
┌─────────────────────────────────────────┐
│  [PromoTag]（可选）                      │
│  ┌────┐                                │
│  │ 50 │  Sign Up                [CTA]  │
│  │USDT│  Sign up to receive            │
│  └────┘  50 USDT                       │
└─────────────────────────────────────────┘
```

| 属性 | 值 |
|------|-----|
| 宽度 | 303px |
| 高度 | 90-110px |
| RewardBadge | 65×48px → [共享](../components/reward-badge.md) |
| 任务标题 | 19px / 600 Semibold |
| 任务描述 | 18px / 400 / `#84888C` |
| CTA | 85×28px → [共享](../components/gradient-cta.md) |
| 徽章与文字间距 | 12px |

---

### ActivityTicker 毛玻璃滚动播报

```
┌─────────────────────────────────────────────────────────────────┐
│  [Avatar] GateUser6819**** won 10 USDT voucher · 8 minutes ago  │
└─────────────────────────────────────────────────────────────────┘
```

| 属性 | H5 | Web |
|------|-----|-----|
| 高度 | 36px | 60px |
| 背景 | `rgba(255,255,255,0.06)` | `rgba(255,255,255,0.06)` |
| 内边距 | 0 20px | 0 24px |
| 条目数量 | **16 条** (×2 重复用于无缝滚动) | **16 条** (×2 重复用于无缝滚动) |
| 条目间距 | 40px | 60px |
| 模块间距 | 上方 32px（距 HeroBanner） | 上方 **40px**（距 HeroBanner） |
| 动画时长 | **75s** | **50s** |

**头像**：
| 属性 | H5 | Web |
|------|-----|-----|
| 尺寸 | 20×20px | **36×36px** |
| 圆角 | 180px | 180px |
| 背景 | `linear-gradient(180deg, #bfbfbf 0%, #f1f5f8 176.75%)` | — |

**文字**：
| 属性 | H5 | Web |
|------|-----|-----|
| 字体 | Switzer | Switzer |
| 字号 | 12px | **14px** |
| 字重 | 400 Regular | 400 Regular |
| 颜色 | `#FFFFFF` | `#FFFFFF` |
| 时间颜色 | `#84888C` | `#84888C` |
| 头像与文字间距 | 8px | **16px** |

**滚动动画**：
```css
/* H5 动画 - 75s (补偿 H5 gap 40px vs Web gap 60px 的差异) */
@keyframes ticker-scroll-h5 {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
body.mode-h5 .ticker-inner { animation: ticker-scroll-h5 75s linear infinite; }

/* Web 动画 - 50s */
@keyframes ticker-scroll-web {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
body.mode-web .ticker-inner { animation: ticker-scroll-web 50s linear infinite; }
```

**示例数据**：
| 用户 | 奖励 | 时间 |
|------|------|------|
| GateUser6819**** | 10 USDT voucher | 8 minutes ago |
| CryptoKing88 | 50 USDT bonus | 12 minutes ago |
| TraderPro2026 | 25 USDT cashback | 15 minutes ago |

---

### UserInviteBanner 邀请横幅

> 已合并到 InviteCard 组件中，不再单独使用。

---

### InviteCard 邀请任务卡片（合并容器）

> 合并 UserInviteBanner + InviteTaskRow，包含邀请人信息、倒计时和 3 个子任务。

```
┌─────────────────────────────────────────────┐  ← 335×389px (H5)
│  padding: 20px 16px 12px                    │
│  ┌─────────────────────────────────────┐    │
│  │ [Avatar]  ALice invite you to claim │    │  ← invite-header
│  │  32×32    15 USDT (渐变绿)          │    │     padding-bottom: 12px
│  │           3D : 03 : 59 : 23         │    │
│  └─────────────────────────────────────┘    │
│  ─────────────────────────────────────────  │  ← border-top 分隔线
│  ┌─────────────────────────────────────┐    │
│  │ [Badge]  Identity verification      │    │  ← task-row 第一行
│  │  5 USDT                   [Completed]│    │     padding: 30px 0 16px
│  └─────────────────────────────────────┘    │
│  ─────────────────────────────────────────  │
│  ┌─────────────────────────────────────┐    │
│  │ [Badge]  Deposit                    │    │  ← task-row 后续行
│  │ 10 USDT  Deposit ≥ a USDT  [Deposit]│    │     padding: 22px 0 20px
│  └─────────────────────────────────────┘    │
│  ─────────────────────────────────────────  │
│  ┌─────────────────────────────────────┐    │
│  │ [Badge]  Spot or Future Trade       │    │
│  │ 10 USDT  Spot trade ≥ a...  [Trade] │    │
│  └─────────────────────────────────────┘    │
└─────────────────────────────────────────────┘
```

**卡片容器**：

| 属性 | H5 | Web |
|------|-----|-----|
| 宽度 | 335px | 1136px |
| 背景 | `#1A1A1A` | `#1A1A1A` |
| 圆角 | 12px | 24px |
| 内边距 | `20px 16px 12px` | `32px` |
| 外边距 | `32px 20px 0` | — |

**邀请头部 (invite-header)**：

| 属性 | 值 |
|------|-----|
| 布局 | `display: flex; gap: 12px; align-items: center` |
| 下边距 | `padding-bottom: 12px` |

**头像 (invite-avatar)**：

| 属性 | 值 |
|------|-----|
| 尺寸 | 32×32px |
| 圆角 | 100px |
| 图片 URL | `https://www.figma.com/api/mcp/asset/6a52c6e0-a49d-4b52-b26f-157e44652303` |

**邀请文案 (invite-text)**：

| 属性 | 值 |
|------|-----|
| 字体 | Gate Switzer |
| 字号 | H5 **16px** / Web **24px**（见 responsive） |
| 字重 | 600 Semibold |
| 颜色 | `#FFFFFF` |
| 金额高亮 | `linear-gradient(97deg, #A7F757 51%, #2BC235 112%)` |
| 金额文案（邀请奖励） | **H5：15 USDT**；**Web：25 USDT**（`.h5-only` / `.web-only` 两个 span，避免 `web-only {display:block}` 打断同一行时可对 `.invite-text .invite-amount` 设 `display:inline`） |

**倒计时 (countdown)**：

| 属性 | 值 |
|------|-----|
| 布局 | `display: flex; gap: 4px`（Web Invite 区：`gap: 8px`，见 responsive） |
| 单元格背景 | `rgba(255,255,255,0.1)` |
| 单元格尺寸 | H5 **20×20px**；Web Invite **40×40px**，字 **20px** |
| 单元格圆角 | 2px（Web Invite **4px**） |
| 字体 | Switzer 12px / 400 |
| 数字颜色 | `#FFFFFF` |
| 分隔符颜色 | `#666666` |
| Web Invite 垂直对齐 | `.countdown` **`align-items: center`**；`.cd-sep` **`inline-flex`** + **`line-height: 1`** + **`min-height: 40px`**，与 `.cd-unit` 同高居中 |

**任务行 (task-row)**：

| 属性 | 第一行 | 后续行 |
|------|--------|--------|
| 布局 | `display: flex; gap: 12px; align-items: center` | 同左 |
| 上边距 | 30px | 22px |
| 下边距 | 16px | 20px |
| 分隔线 | **无**（已移除） | **无** |

**RewardBadge 奖励徽章**：

| 属性 | 值 |
|------|-----|
| 尺寸 | 65×48px |
| 结构 | 3 层图片叠加 + 文字 |

图片资源：
```
badge-bg-bottom: https://www.figma.com/api/mcp/asset/556be00a-718e-4678-8eb8-f4e1f4df11ef
                 位置: top:22px, left:0, 尺寸: 65×27px
badge-bg-top:    https://www.figma.com/api/mcp/asset/d2108edb-4ca7-4593-8bd7-67746c6d2d2b
                 位置: top:0, left:3px, 尺寸: 59×40px
badge-intersect: https://www.figma.com/api/mcp/asset/f9d8c55a-8236-40fa-8a87-e1213d0a541c
                 位置: bottom:3px, left:7px, 尺寸: 51×15px
```

文字样式：
| 元素 | 字体 | 字号 | 字重 | 颜色 | 位置 |
|------|------|------|------|------|------|
| 数字 | Switzer | 20px | 700 Bold | `#070808` | top:3px, 居中 |
| USDT | Switzer | 10px | 500 Medium | `#FFFFFF` | bottom:3px, 居中 |

**任务信息 (task-info)**：

| 属性 | 值 |
|------|-----|
| 布局 | `flex: 1; display: flex; flex-direction: column; justify-content: center`（H5 **无** `task-desc`） |
| 任务标题 | Switzer 14px / 500 Medium / `#FFFFFF`，文案承载原 desc 信息 |

**CTA 按钮**：

| 状态 | 样式 |
|------|------|
| 待完成 | 85×28px, `radial-gradient(ellipse at 90% -40%, #fafbff, #c0d5fd 16%, #86aeff 55%, #c5dbfe 74%, #ecf5ff)`, 文字 `#070808` |
| 已完成 | 85×28px, `#122235`, 文字 `#2D4471`, 显示 "Completed" |

**示例数据**：

| 序号 | 任务标题（唯一文案） | 奖励 | 状态 |
|------|------|------|------|
| 1 | Identity verification | 5 USDT | Completed |
| 2 | First Deposit ≥ 50 USDT | 10 USDT | Deposit |
| 3 | Spot Trade ≥ 50 USDT or Future Trade ≥ 50 USDT | 10 USDT | Trade |

---

### WelcomeCard 新手礼包卡片

> 合并原 TaskCard，展示新手礼包任务列表，支持普通行和带 Promo 标签的行。

```
┌─────────────────────────────────────────────┐  ← 335px (H5)
│  padding: 20px 16px 12px                    │
│  Welcome Package worth 135 USDT             │
│  Complete all beginner tasks to receive…    │
│  ─── welcome-rows: gap 12px; mt 20px ───    │
│  [50 badge] Sign Up                  [CTA]  │  ← 普通行 flex
│  ┌ row-content: CSS Grid 65 | 1fr | CTA ─┐  │
│  │ [15] Identity Verification    [CTA]  │  │
│  │ [promo-tag] 3D 03:59:23（第2行第1列） │  │  translateY(-4px)
│  └──────────────────────────────────────┘  │
│  … Deposit / First Spot or Futures… + promo │
└─────────────────────────────────────────────┘
```

**卡片容器**：

| 属性 | H5 | Web |
|------|-----|-----|
| 宽度 | 335px | 1200px（4 列布局） |
| 高度 | 自适应 | 458px |
| 背景 | `#1A1A1A` | `#1A1A1A` |
| 圆角 | 12px | 24px |
| 内边距 | `20px 16px 12px` | `32px` |
| 外边距 | `32px 20px 20px` | — |

**标题区 (welcome-header)**：

| 属性 | 值 |
|------|-----|
| 下边距 | `margin-bottom: 0` |

**标题 (welcome-title)**：

| 属性 | 值 |
|------|-----|
| 字体 | Gate Switzer |
| 字号 | 18px |
| 字重 | 600 Semibold |
| 颜色 | `#FFFFFF` |
| 布局 | `display: flex; gap: 2px; align-items: center; flex-wrap: wrap` |
| 金额高亮 | `#A7F757` |

**副标题 (welcome-sub)**：

| 属性 | 值 |
|------|-----|
| 字号 | 12px |
| 字重 | 400 Regular |
| 颜色 | `#A0A3A7` |
| 上边距 | 4px |

**任务列表容器 (welcome-rows)**：

| 属性 | 值 |
|------|-----|
| 布局 | `display: flex; flex-direction: column` |
| 行间距 | `gap: 12px` |
| 上边距 | `margin-top: 20px` |

**普通任务行 (welcome-row)**：

| 属性 | 值 |
|------|-----|
| 布局 | `display: flex; align-items: center; gap: 12px` |
| 内边距 | `padding: 22px 0 20px` |
| 分隔线 | **无** |

**带 Promo 的任务行 (welcome-row.has-promo)**：

| 属性 | 值 |
|------|-----|
| 容器 | `display: block`；`padding: 0 0 20px` |
| `.row-content` | **Grid**：`65px minmax(0,1fr) auto` × 2 行；`column-gap: 12px`；`row-gap: 6px` |
| 单元格 | 第 1 行：badge / task-info / btn-cta；第 2 行：`promo-tag` 仅占第 1 列 |

**Promo 标签 (promo-tag)**：

| 属性 | 值 |
|------|-----|
| 布局 | `inline-flex`；`transform: translateY(-4px)` |
| 背景 | `#0F1F17` |
| 内边距 | `3px 6px` |
| 圆角 | 4px |
| 文案节点 | `.promo-countdown`：Gate Switzer **10px** / 500 / `#A7F757`（可用 `data-promo-end` + JS 动态倒计时） |

**示例数据**（与 `rewards-hub-h5-v4.html` 一致）：

| 序号 | 任务标题 | 奖励 | Promo | 状态 |
|------|------|------|-------|------|
| 1 | Sign Up | 50 USDT | 无 | Sign Up |
| 2 | Identity Verification | 15 USDT | 有 | Verify |
| 3 | First Deposit ≥ 50 USDT | 30 USDT | 有 | Deposit |
| 4 | First Spot or Futures Trade ≥ 30 USDT | 30 USDT | 有 | Trade |

**状态**：Active → Partially Completed → All Completed

---

### AdvancedTaskCard 进阶任务卡片

```
┌─────────────────────────────────────────┐  ← 335px, padding: 20px 12px 12px 16px
│  Advanced Trading Task to win up to     │
│  15,000 USDT (绿色)                      │
│                                         │
│  10/15,000 USDT（左对齐单行，无 unlocked）│  ← adv-progress-info
│                                         │
│  ┌─────────────────────────────────────┐│
│  │ [10]   [40]   [VIP5+300]   [100]   ││  ← 里程碑横向滚动
│  │ 35×26  52×38   58×27       35×26   ││     gap: 32px
│  │ 0.4    1.0     combo       0.4     ││     前 3 档可无 badge-bg-bottom
│  │ ✓      🔒      🔒          🔒      ││     （100 档示例为灰锁）
│  │ ════════════════════════════════   ││  ← progress-bar.svg 3px
│  └─────────────────────────────────────┘│
│                                         │
│  ┌─────────────────────────────────────┐│  ← adv-conditions
│  │ Net Deposit ≥ 1,000 USDT   [Deposit]││     background: transparent
│  │ ████████░░░░░░░░░░░░░░░░░░░░░░░░░░ ││     渐变描边图片（::before）
│  │ 200/1,000                          ││     padding: 23px 12px 16px
│  │ ─────────── and ───────────        ││     border-radius: 12px
│  │ Trading Amount ≥ 300,000   [Trade] ││
│  │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ ││
│  │ 0/3,000                            ││
│  └─────────────────────────────────────┘│
└─────────────────────────────────────────┘
```

**卡片容器**：

| 属性 | H5 | Web |
|------|-----|-----|
| 宽度 | 335px | 1200px |
| 高度 | 自适应 | 573px |
| 背景 | `#1A1A1A` | `#1A1A1A` |
| 圆角 | 12px | 24px |
| 内边距 | `20px 12px 12px 16px` | `32px` |
| 外边距 | `0 20px 0`（与下方 Hot 的间距由 **section-header** `margin-top: 32px` 承担） | — |
| overflow | `hidden` | — |

**标题区 (adv-header)**：

| 属性 | 值 |
|------|-----|
| 下边距 | `margin-bottom: 12px` |
| 标题字体 | Gate Switzer 18px / 600 Semibold / `#FFFFFF` |
| 金额字体 | Gate Switzer 18px / 600 Semibold / `#A7F757` |

**进度信息 (adv-progress-info)**：

| 属性 | 值 |
|------|-----|
| 布局 | `display: flex; justify-content: flex-start`（**非** space-between） |
| 下边距 | `margin-bottom: 10px` |
| 高亮文字 | Gate Switzer 12px / 600 / `#FFFFFF`（示例：`10`） |
| 普通文字 | Switzer 12px / 400 / `#8C8C8C`（示例：`/15,000 USDT`） |

**里程碑区域 (adv-milestones)**：

| 属性 | 值 |
|------|-----|
| 布局 | `display: flex; gap: 32px; align-items: flex-end` |
| 内边距 | `padding-bottom: 12px` |
| 滚动 | `overflow-x: auto`，隐藏滚动条 |
| 底部进度条 | **H5**：`::after`：`width: 335px; height: 3px`；`background: url('…/progress-bar.svg')` |
| 底部进度条（**Web**，`rewards-hub-responsive-v1`） | 关闭 `.adv-milestones::after`；在轨道内增加 **`.adv-milestones-track.condition-bar`** + **`.condition-bar-fill`**（与条件面板同款样式；示例进度 `width:50%` 对齐第 3 列中心） |

**Web 里程碑文案栏**：为与栅格对齐可为 `.milestone-label` 增加 **`amount`** 修饰类；普通 **18px**，当前项 **20px**；图标 **18×18**；**`highlight-num`** 不使用黄底 pill（与行内字同色）。

**里程碑徽章尺寸**：

| 类型 | 尺寸 | 透明度 | 说明 |
|------|------|--------|------|
| `.small` | 35×26px | 0.4 | 未选中/已完成的小徽章 |
| `.medium` | 52×38px | 1.0 | 当前进度的大徽章 |
| `.combo` | 58×27px | 1.0 | VIP5 + 300 组合徽章 |

**里程碑徽章结构**（与 RewardBadge 相同层叠逻辑；**`badge-bg-bottom` 可按档位省略**——参考 HTML 中 10 / 40 / VIP+300 三档仅使用 `badge-bg-top` + `badge-intersect`）：

```html
<div class="milestone-badge small">
  <!-- 可选：<img class="badge-bg-bottom" src="..." alt=""> -->
  <img class="badge-bg-top" src="[badge-bg-top URL]" alt="">
  <img class="badge-intersect" src="[badge-intersect URL]" alt="">
  <span class="badge-num">10</span>
  <span class="badge-label">USDT</span>
</div>
```

**里程碑徽章 CSS（精确值）**：

```css
.milestone-badge { position: relative }
.milestone-badge.small { width: 35px; height: 26px; opacity: 0.4 }
.milestone-badge.medium { width: 52px; height: 38px; opacity: 1 }
.milestone-badge.combo { width: 58px; height: 27px; display: flex; align-items: flex-end }

.milestone-badge .badge-bg-bottom { position: absolute; bottom: 24px; left: 0; width: 100%; height: 56% }
.milestone-badge .badge-bg-top { position: absolute; top: 0; left: 4.6%; width: 90.8%; height: 83% }
.milestone-badge .badge-intersect { position: absolute; bottom: 8%; left: 10.8%; width: 78.4%; height: 31% }

.milestone-badge .badge-num { position: absolute; top: 4%; left: 0; right: 0; font-family: 'Switzer'; font-weight: 700; color: #070808; text-align: center; line-height: 1; z-index: 1; transform: translateY(2px) }
.milestone-badge.small .badge-num { font-size: 10.5px }
.milestone-badge.medium .badge-num { font-size: 16px }

.milestone-badge .badge-label { position: absolute; bottom: 7%; left: 0; right: 0; font-family: 'Switzer'; font-weight: 500; color: #fff; text-align: center; z-index: 1 }
.milestone-badge.small .badge-label { font-size: 5.3px }
.milestone-badge.medium .badge-label { font-size: 8px }

/* Combo 徽章（VIP5 + 300 USDT） */
.milestone-badge.combo .vip-part { position: relative; width: 37px; height: 27px }
.milestone-badge.combo .usdt-part { position: relative; width: 24px; height: 18px; opacity: 0.5; margin-left: -3px }
.adv-milestones .milestone-badge.combo .usdt-part { transform: translateY(-4px) }
.milestone-badge.combo .vip-part .badge-num { font-size: 11px }
.milestone-badge.combo .vip-part .badge-num.vip { top: 5% }
.milestone-badge.combo .vip-part .badge-label { font-size: 5.6px }
.milestone-badge.combo .usdt-part .badge-num { font-size: 7.3px }
.milestone-badge.combo .usdt-part .badge-label { font-size: 3.7px }
```

**里程碑标签 (milestone-label)**：

| 属性 | 普通 | 当前选中 |
|------|------|----------|
| 字体 | Switzer 12px / 400 | Switzer 12px / 600 |
| 颜色 | `#A0A3A7` | `#FFFFFF` |
| 图标尺寸 | 12×12px | 12×12px |
| 图标间距 | 2px | 2px |
| 图标 | 12×12px 图片 | 12×12px 图片 |
| 间距 | `gap: 2px` | `gap: 2px` |
| 当前行图标 | — | `.milestone-label.current img { transform: translateX(-2px) }` |
| 换行 | `white-space: nowrap` | `white-space: nowrap` |

**状态图标（使用图片资源）**：

| 状态 | 图标 | URL |
|------|------|-----|
| 已完成 | 绿色圆圈勾选 | `icon-circle-success.png` |
| 当前进度 | 白色锁 | `icon-lock-current.png` |
| 未解锁 | 灰色锁 | `icon-lock-inactive.png` |

**条件面板 (adv-conditions)**：

| 属性 | 值 |
|------|-----|
| 背景 | `transparent`（无填充色） |
| 边框 | **H5**：`::before` 图片边框（`adv-conditions-frame.svg`）；**Web**：`::before` **`adv-conditions-border-web.png`** 铺满（直角）；**Web** 无 `::after` 顶边尖头 |
| 圆角 | 12px |
| 内边距 | `23px 12px 16px`（Web：`50px 32px 40px` + 双列 grid，以 responsive 为准） |
| 条件标题（**Web**） | **`condition-title`**：`line-height: 32px`、`min-height: 64px`（固定两行占位，短文案第二行空） |

**条件行 (condition-row)**：

| 属性 | 值 |
|------|-----|
| 布局 | `display: flex; justify-content: space-between; align-items: center; gap: 16px` |
| 条件信息 | `flex: 1; display: flex; flex-direction: column; gap: 8px` |
| 条件标题 | Switzer 12px / 500 Medium / `#FFFFFF` |
| 进度条 | `height: 3px; background: rgba(255,255,255,0.1); border-radius: 20px` |
| 进度条填充 | `background: linear-gradient(90deg, #9ec6ff 40%, #fff)` |
| 进度文字 | Switzer 12px / 500 / `#84888C`，数字 `#FFFFFF` |

**条件分隔线 (condition-divider)**：

| 属性 | 值 |
|------|-----|
| 布局 | `display: flex; align-items: center; justify-content: center; padding: 8px 0` |
| 横线 | `::before` 伪元素，参考 HTML 使用 `condition-divider-line-dark.svg`（离线包同路径 PNG/SVG 均可） |
| 标签 | Switzer 10px / 500 / `#A0A3A7`，`background: #1A1A1A; padding: 2px 8px; border-radius: 26px` |

**示例数据**：

| 里程碑 | 奖励 | 尺寸 | 透明度 | 状态 |
|--------|------|------|--------|------|
| 1 | 10 USDT | 35×26px | 0.4 | ✓ 已完成 |
| 2 | 40 USDT | 52×38px | 1.0 | 🔒 当前进度 |
| 3 | VIP5 + 300 USDT | 58×27px | 1.0 | 🔒 未解锁 |
| 4 | 100 USDT | 35×26px | 0.4 | 🔒 未解锁（示例 HTML 使用 `badge-bg-bottom`） |

---

### SectionHeader 模块标题

```
┌─────────────────────────────────────────────┐
│  Hot Event                      View More   │
│  18px/600 Gate Switzer          12px/400    │
│  #FFFFFF                        #A0A3A7    │
└─────────────────────────────────────────────┘
```

| 属性 | 值 |
|------|-----|
| 布局 | `display: flex; justify-content: space-between; align-items: center` |
| 外边距 | **H5**：`margin-top: 32px`（承接 AdvancedTaskCard 与 Hot 区块间距）；**Web**：`margin: 64px auto 0`（与 `rewards-hub-responsive-v1.html` 一致） |
| 内边距 | `padding: 0 20px 20px`（Web：`padding: 0 0 20px`，`max-width: 1200px` 居中） |
| 标题字体 | Gate Switzer 18px / 600 Semibold |
| 标题颜色 | `#FFFFFF` |
| View More | **12px** / 400；`#A0A3A7`；点状下划线（`thickness: 7%`, `offset: 3px`，与 Stats 标签一致） |
| Web 标题/更多字号 | 标题 **24px**；View More **16px**（responsive） |

---

### GTTabs 任务分类切换（老客专属）

| 属性 | 值 |
|------|-----|
| 宽度 | 375px（全宽） |
| 高度 | 44px |
| Active | 16px / 600 Semibold / `#FFFFFF` + 下划线 2px `#0055FF` |
| Inactive | 16px / 500 Medium / `#84888C` |

---

### ExclusiveTaskCard 专属任务卡片（老客专属）

```
┌─────────────────────────────────────────┐
│  Exclusive Spot Trading    [倒计时可选]  │
│  Trade spot ≥ 400 USDT, get a 50 USDT  │
│  BTC position voucher                   │
│                                         │
│  [USDT] 500              [Trade]        │
└─────────────────────────────────────────┘
```

| 属性 | 值 |
|------|-----|
| 宽度 | 335px |
| 高度 | 145px |
| 背景 | `#1A1A1A` |
| 边框 | `var(--card-border)` + 左侧 2px `#0055FF` 强调线 |
| 圆角 | 16px |
| 内边距 | 12px 16px |
| 标题 | 21px / 600 Semibold / `#FFFFFF` |
| 描述 | 16px / 400 / `#84888C` |
| 奖励图标 | 16×16px |
| 奖励数值 | 21px / 600 Semibold |
| 倒计时(可选) | GTCountdownV5 77×18px → [共享](../components/countdown-timer.md#h5-compact--gtcountdownv518px) |

---

### RegularTaskCard 常规任务卡片（老客专属）

```
┌─────────────────────────────────────────┐
│  Net Deposit Task          [倒计时]      │
│  ████████░░░░░░░░░░░░░░░░░░░░░░░░░░░   │
│  26/200                                 │
│  Complete net deposit ≥ 200 USDT        │
│                                         │
│  [USDT] 50 USDT            [Deposit]    │
└─────────────────────────────────────────┘
```

| 属性 | 值 |
|------|-----|
| 宽度 | 335px |
| 高度 | 175px |
| 背景 | `#1A1A1A` |
| 圆角 | 16px |
| 内边距 | 12px 16px |
| 进度条 | 311×3px, 蓝→白渐变 → [_platform](../../_platform/components/progress-bar.md) |
| 进度文字 | 16px / 500 Medium |
| 任务标题 | 21px / 600 Semibold |
| 描述 | 16px / 400 / `#84888C` |

**任务类型**：Net Deposit / Daily Spot Trading / Daily Futures Trading / VIP Upgrade

**展开/收起**：
- 默认展示 3 条任务
- 底部 ∨ 箭头点击展开全部
- 展开后变 ∧ 箭头可收起
- 箭头居中，点击区域 44×44px

---

### VoucherCard 券卡片（老客专属）

```
标准券卡片：              Credits Draw：
┌─────────────────┐      ┌─────────────────┐
│  ┌───────────┐  │      │  ***g021 got    │
│  │     1     │  │      │  100 Credits    │
│  │   USDT   │  │      │  ┌──────────┐   │
│  └───────────┘  │      │  │   ?      │   │
│  券名称          │      │  └──────────┘   │
│  [金额]          │      │  Credits Draw   │
│  [Redeem]       │      │  [金额]          │
└─────────────────┘      │  [Draw Now]     │
                         └─────────────────┘
```

| 属性 | 值 |
|------|-----|
| 布局 | 2 列网格 |
| 列间距 | 12px |
| 行间距 | 12px |
| 背景 | `#1A1A1A` |
| 边框 | `var(--card-border)` |
| 圆角 | 16px |
| 内边距 | 12px |
| **券徽章** | **两段式 RewardBadge 风格** (72×64px) |
| 徽章数字层 | 72×44px / 蓝色渐变 / 26px Bold / 白色 |
| 徽章标签层 | 72×20px / `#002299` / 10px / "USDT" |
| 券名称 | 13px / 500 Medium |
| 金额 | 16px / 600 Semibold / `#FF9447` |
| CTA 按钮 | 全宽 32px / 蓝色渐变 / 999px 圆角 |

**变体 A — 标准券卡片**：
- 顶部：面额徽章（"1 USDT" / "2 USDT" 蓝色圆角标签）
- 中部：券名称（如 "100% Spot Fee Rebate Voucher - Up to 1 USDT"）
- 底部：金币图标 + 金额 + "Redeem" 按钮

**变体 B — Credits Draw 积分抽奖**：
- 顶部：获奖提示（"***g021 got 100 Credits"，灰色文字）
- 中部：抽奖机插图 125×125px
- 名称："Credits Draw"
- 底部：金币图标 + 积分数 + "Draw Now" 按钮（蓝色渐变）

---

### HeroBanner 主 Banner

```
H5 (128px 高度):
┌─────────────────────────────────────────────┐
│  WIN UP TO                    [插图区域]     │
│  10,000+ USDT                 128×128px     │
│  [📅 Check In] [↗]            top: 16px     │
│  (97×32px)    (32×32px)                     │
└─────────────────────────────────────────────┘

Web:
┌────────────────────────────────────────────────────────┐
│  Rewards Hub                                           │
│  Win up to 10,000+USDT                    [插图区域]    │
│  8,000 Unlocked | 200,983 Completed       500×449px   │
│  [GlassButton] [ShareBtn]                             │
└────────────────────────────────────────────────────────┘
```

| 属性 | H5 | Web |
|------|-----|-----|
| 容器高度 | 128px | 410px |
| 容器内边距 | 0 20px | — |
| 布局 | `display: flex; justify-content: space-between; align-items: center` | — |
| 文本区宽度 | 156px | — |
| 文本区布局 | `display: flex; flex-direction: column; gap: 12px` | — |
| 主副题间距（H5） | `.hero-titles .h5-only`：`flex-direction:column`、**`gap:0`**（「WIN UP TO」与「10,000+ USDT」无 flex 间距） | — |
| 主标题 | 24px / 700 Bold | 65px / 700 Bold |
| 副标题 | 16px / 400 Regular | 31px / 400 Regular |
| 主标题渐变 | `linear-gradient(102deg, #A7F757 51%, #2BC235 112%)` | — |
| 插图尺寸 | 128×128px | 466×419px |
| 插图偏移 | `position: relative; top: 16px` | — |
| 按钮高度 | 32px | 48px |
| Check In 按钮 | 97×32px | 145×48px |
| 分享按钮 | 32×32px 圆形 | 48×48px 圆形 |
| 按钮间距 | 16px | 16px |

**GlassButton 毛玻璃按钮样式**：

| 属性 | 值 |
|------|-----|
| 高度 | 32px |
| Check In 宽度 | 97px |
| 分享按钮宽度 | 32px |
| 背景 | `transparent` |
| 圆角 | 34px |
| 字体 | Switzer 12px / 600 Semibold |
| 颜色 | `#FFFFFF` |
| 图标尺寸 | 12×12px |
| 图标间距 | 4px |
| 边框 | `::before` 伪元素渐变边框 |

**按钮边框渐变（::before 伪元素）**：

```css
.btn-glass::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 34px;
  padding: 1px;
  background: linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 30%, rgba(255,255,255,0) 70%, rgba(255,255,255,0.1) 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}
```

**插图资源**（7 天有效）：

```css
/* H5 暗色 */  url("https://www.figma.com/api/mcp/asset/7d5f7d68-640a-4600-8b23-738df55f4b32");
/* H5 亮色 */  url("https://www.figma.com/api/mcp/asset/c7f35949-6aa5-4d4a-a63a-78fedd230f25");
/* Web 暗色 */ url("https://www.figma.com/api/mcp/asset/d2ce7528-3f73-4aba-89f1-a98b6f754bf2");
/* Web 亮色 */ url("https://www.figma.com/api/mcp/asset/c8fbe031-5de3-4f13-ab41-0aee1a52fea0");
```

**图标资源（SVG 内联）**：

```html
<!-- 日历图标 CEX_Calendar 12×12px -->
<svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M3 1.75C3 1.61193 3.11193 1.5 3.25 1.5H4.25C4.38807 1.5 4.5 1.61193 4.5 1.75V2.5H7.5V1.75C7.5 1.61193 7.61193 1.5 7.75 1.5H8.75C8.88807 1.5 9 1.61193 9 1.75V2.5H9.99997C10.2761 2.5 10.5 2.72386 10.5 3L10.5 4.25H1.49997L1.49997 3C1.49997 2.72386 1.72383 2.5 1.99997 2.5H3V1.75Z" fill="white"/>
  <path d="M10.5 5.5H1.49998L1.5 10C1.5 10.2761 1.72385 10.5 2 10.5H10C10.2761 10.5 10.5 10.2761 10.5 10L10.5 5.5Z" fill="white"/>
</svg>

<!-- 分享图标 CEX_Share 12×12px -->
<svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M10.5 2.83784C10.5 3.71104 9.79213 4.41892 8.91892 4.41892C8.52432 4.41892 8.16348 4.27436 7.88647 4.03531L4.66048 5.8587C4.6616 5.88307 4.66216 5.90759 4.66216 5.93224C4.66216 6.03472 4.65241 6.13493 4.63379 6.23198L7.81514 8.03013C8.10006 7.75227 8.4895 7.58108 8.91892 7.58108C9.79213 7.58108 10.5 8.28896 10.5 9.16216C10.5 10.0354 9.79213 10.7432 8.91892 10.7432C8.04571 10.7432 7.33784 10.0354 7.33784 9.16216L7.33784 9.1574L3.95881 7.24751C3.7077 7.41542 3.40583 7.51332 3.08108 7.51332C2.20787 7.51332 1.5 6.80545 1.5 5.93224C1.5 5.05903 2.20787 4.35116 3.08108 4.35116C3.48762 4.35116 3.85832 4.5046 4.13844 4.75672L7.3415 2.94629C7.33907 2.91046 7.33784 2.87429 7.33784 2.83784C7.33784 1.96463 8.04571 1.25676 8.91892 1.25676C9.79213 1.25676 10.5 1.96463 10.5 2.83784Z" fill="white"/>
</svg>
```

**图标 URL 资源**（7 天有效）：

```css
/* 日历图标 */ url("https://www.figma.com/api/mcp/asset/e87ed603-a699-43ec-a9e8-9e6b2dcce76e");
/* 分享图标 */ url("https://www.figma.com/api/mcp/asset/148b6747-74c7-4a42-b7ab-98bade9be1f3");
```

---

### HotEventCard 热门活动卡片

```
┌─────────────────────────────────────┐  ← 335px (margin: 0 20px 20px)
│  border: 1px solid #1F2023          │
│  border-radius: 12px; padding: 16px │
│  ┌─────────────────────────────┐    │  ← hot-inner
│  │ [HotTag]                    │    │     bg: #18191B
│  │ 🔥 31,291                   │    │     border-radius: 8px
│  │                             │    │     padding: 16px
│  │ VIP Super Friday   [88×88] │    │     min-height: 150px
│  │ Issue 16                    │    │     overflow: hidden
│  │ The task has been...        │    │
│  └─────────────────────────────┘    │
│  VIP Super Friday Issue 16...       │  ← hot-outer-title
│  [CountdownTimer]                   │     16px/600, margin-top: 16px
└─────────────────────────────────────┘
```

| 属性 | H5 | Web |
|------|-----|-----|
| 外边距 | `0 20px 20px` | 网格内 `margin:0` |
| 边框 | `1px solid #1F2023` | **`1px solid #1F2023`**，`background: transparent`（仅外壳；内层 `.hot-inner` 仍为 `#18191B`） |
| 圆角 | 12px | 16px |
| 内边距 | 16px | 16px |
| 内卡背景 | `#18191B` | `#18191B`（`--bg-tertiary`） |
| 内卡圆角 | 8px | 12px |
| 内卡内边距 | 16px | `16px 16px 20px` |
| 内卡最小高度 | 150px | 156px |
| 布局 | 1 列 | 3 列, 间距 24px |
| 活动图片 | 88×88px / 8px 圆角 | **96×96** / 8px |
| 内标题 | 18px / 600 Semibold | 同左；**`min-height: calc(2em * 1.33)`** 与首卡栅格对齐 |
| 内描述 | 14px / 400 / `#A0A3A7` | 14px / `#84888C`；**定高 4 行** + **`-webkit-line-clamp: 4`** + `overflow: hidden` |
| 外标题 | 16px / 600 Semibold, `margin-top: 16px` | **500**；**`min-height: calc(2em * 1.31)`** |
| 底部倒计时 | `margin-top: 16px` | `margin-top: 12px`，`align-items: center`，单元格等见 §4.3 |

**hot-content 布局**：

| 属性 | 值 |
|------|-----|
| 布局 | `display: flex; gap: 8px` |
| 上边距 | `margin-top: 22px`（为 HotTag 留出空间） |

**HotTag 格式**（暗色模式）：使用火焰图标 + 参与人数（如 "🔥 31,291"），深红棕色背景 `#2F0C08`，红色文字 `#F7594B`，左上角 8px 圆角匹配卡片

**状态**：Ongoing (显示倒计时) → Ending Soon (红色高亮 <24h) → Ended

---

### WebTopNav 顶部导航（Web 专属）

| 属性 | 值 |
|------|-----|
| 宽度 | 1920px 全宽 |
| 高度 | 48px |
| 背景 | `#070808` + `blur(50px)` |
| 内容区 | 1200px 居中 |
| 导航项 | 18px / 500 Medium / `#FFFFFF`, 间距 20px |
| 高亮项 | Rewards Hub |

**导航项**：Buy Crypto / Markets / Trade / Futures / Copy / Earn / Web3 / More / **Rewards Hub**

---

### StatusBar 状态栏（H5 专属）

```
┌─────────────────────────────────────────────┐
│  9:41                    [信号][WiFi][电池] │
└─────────────────────────────────────────────┘
```

| 属性 | 值 |
|------|-----|
| 高度 | 44px |
| 背景 | 透明（继承页面背景） |
| 内边距 | 0 20px |
| 布局 | flex, space-between, align-center |

**时间文字**：
| 属性 | 值 |
|------|-----|
| 字体 | Urbanist Bold |
| 字号 | 15px |
| 字重 | 700 |
| 颜色 | `#FFFFFF` |
| 字间距 | -0.165px |
| 位置 | 左侧 19.89px |

**状态图标**（右侧，gap: 5px）：

| 图标 | 尺寸 | SVG/URL |
|------|------|---------|
| 信号 | 17.1×10.7px | `https://www.figma.com/api/mcp/asset/3e4bd3b0-4ead-4337-afef-e8658daf52cc` |
| WiFi | 15.4×11px | `https://www.figma.com/api/mcp/asset/1edc8a1d-4327-48ac-9c10-027718ed676e` |
| 电池 | 24.5×11.5px | `https://www.figma.com/api/mcp/asset/78e55670-78ae-4b2d-b634-480fb2b94ee1` |

---

### Navbar 导航栏（H5 专属）

```
┌─────────────────────────────────────────────┐
│  ‹          Rewards Hub          [占位]     │
└─────────────────────────────────────────────┘
```

| 属性 | 值 |
|------|-----|
| 高度 | 44px |
| 背景 | 透明（继承页面背景） |
| 内边距 | 0 12px |
| 布局 | flex, gap: 16px, align-center |

**返回按钮**：
| 属性 | 值 |
|------|-----|
| 容器尺寸 | 20×20px |
| 图标尺寸 | 6.25×12.5px |
| 图标颜色 | `#FFFFFF` |

```html
<!-- 返回箭头 SVG -->
<svg viewBox="0 0 7 13" fill="none">
  <path d="M6 1L1 6.5L6 12" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
```

**标题**：
| 属性 | 值 |
|------|-----|
| 字体 | Switzer |
| 字号 | 18px |
| 字重 | 500 Medium |
| 颜色 | `#FFFFFF` |
| 对齐 | 居中（flex: 1） |

**右侧占位**：
| 属性 | 值 |
|------|-----|
| 尺寸 | 20×20px |
| 透明度 | 0（保持标题居中） |

---

### Footer 页脚（H5 专属）

```
┌─────────────────────────────────────────────┐
│           Gate © 2013-2026                  │
└─────────────────────────────────────────────┘
```

| 属性 | 值 |
|------|-----|
| 内边距 | `24px 20px 40px` |
| 对齐 | `text-align: center` |
| 字号 | 12px |
| 颜色 | `#444444` |

---

## 区块 6: 适用性 & H5/Web 差异

### 适用场景

- 福利中心首页（新客 / 老客）
- 新手引导任务流程
- 进阶交易任务激励
- 热门活动聚合展示
- 券领取与使用

### 不适用场景

- Booster 推广任务（建议用 [booster.md](booster.md)）
- 交易页面（建议用 Exchange 基础规范）
- 独立活动落地页（建议用 [campaign](../../campaign/) 域）

### H5 vs Web 速查

| 维度 | H5 (375px) | Web (1920px) |
|------|-----------|--------------|
| 内容区宽度 | 335px | 1200px |
| 页面边距 | 20px | 360px (auto) |
| 卡片圆角 | 16px | 24px |
| 卡片内边距 | 16px | 32px |
| 按钮尺寸 | 85×28px | 100×40px |
| 主标题字号 | 24px | 65px |
| 倒计时单元 | 20px | 40px |
| 任务列布局 | 1 列 | 4 列 |
| 活动卡片布局 | 1 列 | 3 列 |
| 播报条数量 | 3 条滚动 | 4 条 |
| 字体 | Switzer / Gate_Switzer | Switzer |
| 顶部导航 | 44px StatusBar + 44px NavBar | 48px + blur |

### 组件状态矩阵

**GradientCTA** → [完整状态见共享组件](../components/gradient-cta.md)

**ProgressBar**：Empty (0%) → In Progress (1-99%) → Completed (100%)

**RewardBadge**：Locked 🔒 → Unlocked ✓ → Claimed ✓

**TaskCard**：Active → Partially Completed → All Completed

**HotEventCard**：Ongoing → Ending Soon (<24h 红色) → Ended

---

## 区块 7: 素材资源汇总

> 以下为当前 H5 新客页面（v4）中使用的所有 Figma 图片资源，7 天内有效。

### 7.1 StatusBar 图标

| 图标 | URL | 尺寸 |
|------|-----|------|
| Signal 信号 | `https://www.figma.com/api/mcp/asset/3e4bd3b0-4ead-4337-afef-e8658daf52cc` | 17.1×10.7px |
| WiFi | `https://www.figma.com/api/mcp/asset/1edc8a1d-4327-48ac-9c10-027718ed676e` | 15.4×11px |
| Battery 电池 | `https://www.figma.com/api/mcp/asset/78e55670-78ae-4b2d-b634-480fb2b94ee1` | 24.5×11.5px |

### 7.1.1 WebHeader 素材 (Web 端专用)

| 素材 | URL | 尺寸 | 说明 |
|------|-----|------|------|
| Logo 图标 | `https://www.figma.com/api/mcp/asset/1c06ecce-51e6-4404-95af-a382242b4f56` | 24×24px | Gate 图标 |
| Logo 文字 "gate" | `https://www.figma.com/api/mcp/asset/a3b5b982-fe89-4cca-9034-161953e75cfc` | 77×22px | margin-left: 4px |
| Rewards Hub 图标 | `https://www.figma.com/api/mcp/asset/83328c77-d7f4-4efd-ac57-052a2567b78d` | 24×24px | 礼盒图标，高亮导航项 |

**WebHeader HTML 结构**：
```html
<div class="web-header">
  <div class="web-header-left">
    <div class="web-header-logo">
      <img src="https://www.figma.com/api/mcp/asset/1c06ecce-51e6-4404-95af-a382242b4f56" alt="" style="width:24px;height:24px">
      <img src="https://www.figma.com/api/mcp/asset/a3b5b982-fe89-4cca-9034-161953e75cfc" alt="Gate" style="width:77px;height:22px;margin-left:4px">
    </div>
    <div class="web-header-nav">
      <div class="web-header-nav-item">Buy Crypto<svg>...</svg></div>
      <div class="web-header-nav-item">Markets</div>
      <div class="web-header-nav-item">Trade<svg>...</svg></div>
      <div class="web-header-nav-item">Futures<svg>...</svg></div>
      <div class="web-header-nav-item">Earn<svg>...</svg></div>
      <div class="web-header-nav-item">Community<svg>...</svg></div>
      <div class="web-header-nav-item">Web3</div>
      <div class="web-header-nav-item">More<svg>...</svg></div>
      <div class="web-header-nav-item highlight">
        <img src="https://www.figma.com/api/mcp/asset/83328c77-d7f4-4efd-ac57-052a2567b78d" alt="" style="width:24px;height:24px">
        Rewards Hub
      </div>
    </div>
  </div>
  <div class="web-header-right">
    <span class="web-header-login">Log In</span>
    <div class="web-header-signup">Sign Up</div>
    <div class="web-header-divider"></div>
    <svg class="web-header-icon"><!-- 搜索 --></svg>
    <svg class="web-header-icon"><!-- 下载 --></svg>
    <svg class="web-header-icon"><!-- 语言 --></svg>
    <svg class="web-header-icon"><!-- 主题 --></svg>
    <svg class="web-header-icon"><!-- 设置 --></svg>
  </div>
</div>
```

### 7.2 HeroBanner 素材

| 素材 | URL | 尺寸 | 说明 |
|------|-----|------|------|
| Hero 主图 | `https://www.figma.com/api/mcp/asset/5997ddfc-7f3e-49db-beea-1bf38e214d9d` | 128×128px | 3D 奖杯图，`top: 16px` 偏移 |

**Check In 按钮图标 SVG**：
```html
<svg viewBox="0 0 12 12" fill="none">
  <path d="M3 1.75C3 1.61193 3.11193 1.5 3.25 1.5H4.25C4.38807 1.5 4.5 1.61193 4.5 1.75V2.5H7.5V1.75C7.5 1.61193 7.61193 1.5 7.75 1.5H8.75C8.88807 1.5 9 1.61193 9 1.75V2.5H9.99997C10.2761 2.5 10.5 2.72386 10.5 3L10.5 4.25H1.49997L1.49997 3C1.49997 2.72386 1.72383 2.5 1.99997 2.5H3V1.75Z" fill="white"/>
  <path d="M10.5 5.5H1.49998L1.5 10C1.5 10.2761 1.72385 10.5 2 10.5H10C10.2761 10.5 10.5 10.2761 10.5 10L10.5 5.5Z" fill="white"/>
</svg>
```

**Share 分享按钮图标 SVG**：
```html
<svg viewBox="0 0 12 12" fill="none">
  <path d="M10.5 2.83784C10.5 3.71104 9.79213 4.41892 8.91892 4.41892C8.52432 4.41892 8.16348 4.27436 7.88647 4.03531L4.66048 5.8587C4.6616 5.88307 4.66216 5.90759 4.66216 5.93224C4.66216 6.03472 4.65241 6.13493 4.63379 6.23198L7.81514 8.03013C8.10006 7.75227 8.4895 7.58108 8.91892 7.58108C9.79213 7.58108 10.5 8.28896 10.5 9.16216C10.5 10.0354 9.79213 10.7432 8.91892 10.7432C8.04571 10.7432 7.33784 10.0354 7.33784 9.16216L7.33784 9.1574L3.95881 7.24751C3.7077 7.41542 3.40583 7.51332 3.08108 7.51332C2.20787 7.51332 1.5 6.80545 1.5 5.93224C1.5 5.05903 2.20787 4.35116 3.08108 4.35116C3.48762 4.35116 3.85832 4.5046 4.13844 4.75672L7.3415 2.94629C7.33907 2.91046 7.33784 2.87429 7.33784 2.83784C7.33784 1.96463 8.04571 1.25676 8.91892 1.25676C9.79213 1.25676 10.5 1.96463 10.5 2.83784Z" fill="white"/>
</svg>
```

### 7.3 ActivityTicker 头像

> **实现约定**：以 `rewards-hub-assets/` 下 PNG 为**唯一可信源**；参考 HTML 中可将 Figma MCP URL 换成本地路径，便于离线预览与分包。  
> — `rewards-hub-h5-v4.html`、`rewards-hub-responsive-v1.html`：第 3 个 ticker 头像已改为同目录 `ticker-avatar-3.png`（由 `avatar-3.png` 同步），亦可使用 `assets/avatar-3.png`。  
> — **离线静态包**：`ui-craft-workspaces/exchange/pages/rewards-hub-package/`（`index.html` + `assets/`，无外链脚本）。

| 用户 | 本地文件 | Figma URL（历史导出参考，可能过期） | 尺寸 |
|------|----------|--------------------------------------|------|
| 头像 1 | `avatar-1.png` | `https://www.figma.com/api/mcp/asset/0e18486c-2e9e-4670-8082-0ed25ab37dbb` | 20×20px |
| 头像 2 | `avatar-2.png` | `https://www.figma.com/api/mcp/asset/7df3facd-fbd4-49fe-bedf-a3de7328aea1` | 20×20px |
| 头像 3 | `avatar-3.png` | `https://www.figma.com/api/mcp/asset/bf38634f-52db-48a3-954f-a73c58a3a848` | 20×20px |

### 7.4 InviteCard 头像

| 素材 | URL | 尺寸 |
|------|-----|------|
| Alice 头像 | `https://www.figma.com/api/mcp/asset/6a52c6e0-a49d-4b52-b26f-157e44652303` | 32×32px |

### 7.4.1 StatsCard 订单 / 记录入口

| 素材 | 本地文件 | H5 | Web（`body.mode-web`） |
|------|----------|-----|-------------------------|
| 订单历史图标 | `icon-order-history.png` | 20×20px，置于竖线右侧 | 32×32px |

### 7.5 RewardBadge 徽章素材

> **重要说明**：以下 Figma MCP 资源 URL 有效期为 7 天。建议将图片下载保存到本地项目中使用。
> **本地资源目录**：`rewards-hub-assets/`

#### 绿色徽章（USDT 奖励）

| 图层 | URL | 本地文件 | 尺寸 | 位置 |
|------|-----|----------|------|------|
| badge-bg-bottom | `https://www.figma.com/api/mcp/asset/556be00a-718e-4678-8eb8-f4e1f4df11ef` | `badge-bg-bottom-green.png` | 65×27px | top:22px, left:0 |
| badge-bg-top | `https://www.figma.com/api/mcp/asset/d2108edb-4ca7-4593-8bd7-67746c6d2d2b` | `badge-bg-top-green.png` | 59×40px | top:0, left:3px |
| badge-intersect | `https://www.figma.com/api/mcp/asset/f9d8c55a-8236-40fa-8a87-e1213d0a541c` | `badge-intersect-green.png` | 51×15px | bottom:3px, left:7px |

**使用场景**：InviteCard、WelcomeCard、AdvancedTaskCard 里程碑。**里程碑前 3 档**（示例：10 / 40 / VIP5+300）可不使用 `badge-bg-bottom` 图层；**100 USDT 小徽章**等仍可使用。

#### 紫色徽章（VIP 奖励）

| 图层 | URL | 本地文件 | 尺寸 |
|------|-----|----------|------|
| badge-bg-bottom | `https://www.figma.com/api/mcp/asset/b8ace107-7ff3-4845-ba4c-7d7bfe4109d5` | `badge-bg-bottom-purple.png` | 同上 |
| badge-bg-top | `https://www.figma.com/api/mcp/asset/8b9894e7-ac91-4c22-ab8b-77f0b8c6abd4` | `badge-bg-top-purple.png` | 同上 |
| badge-intersect | `https://www.figma.com/api/mcp/asset/d07d6531-8919-483f-8658-7041766363ca` | `badge-intersect-purple.png` | 同上 |

**使用场景**：AdvancedTaskCard VIP5 里程碑徽章

**徽章使用场景**：
- InviteCard 任务行徽章（65×48px）
- WelcomeCard 任务行徽章（65×48px）
- AdvancedTaskCard 里程碑徽章（small: 35×26px, medium: 52×38px, combo: 58×27px）

**AdvancedTaskCard 里程碑徽章尺寸映射**：

| 类型 | 容器尺寸 | 透明度 | badge-bg-bottom（可选） | badge-bg-top | badge-intersect |
|------|----------|--------|--------------------------|--------------|-----------------|
| small | 35×26px | 0.4 | 省略或 `bottom: 24px` 定位 | 90.8%宽×83%高 | 78.4%宽×31%高 |
| medium | 52×38px | 1.0 | 常省略 | 90.8%宽×83%高 | 78.4%宽×31%高 |
| combo (vip-part) | 37×27px | 1.0 | 常省略 | 同上 | 同上 |
| combo (usdt-part) | 24×18px | 0.5 | 常省略 | 同上 | 同上 |

**徽章文字样式**：

| 类型 | badge-num 字号 | badge-label 字号 |
|------|----------------|------------------|
| small | 10.5px | 5.3px |
| medium | 16px | 8px |
| combo vip-part | 11px | 5.6px |
| combo usdt-part | 7.3px | 3.7px |

### 7.6 AdvancedTaskCard 进度条

| 素材 | URL | 本地文件 | 尺寸 |
|------|-----|----------|------|
| 里程碑进度条 | `https://www.figma.com/api/mcp/asset/3c451b79-3394-4fa9-a564-2fca389acfcd`（历史） | `progress-bar.svg`（**参考 HTML 使用**） | 335×3px 显示区域 |

**CSS 使用方式**：
```css
.adv-milestones::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 335px;
  height: 3px;
  background: url('rewards-hub-package/assets/progress-bar.svg') left center/contain no-repeat;
}
```

### 7.7 HotEventCard 素材

| 素材 | URL | 本地文件 | 尺寸 |
|------|-----|----------|------|
| 活动封面图 | `https://www.figma.com/api/mcp/asset/2956452f-2a39-4c73-9031-a352596b80cf` | `hot-event-cover.png` | 88×88px |
| 热度火焰图标 | `https://www.figma.com/api/mcp/asset/f6e157da-1867-4e19-98e2-d67c3645c85f`（历史） | **`icon-hot-fire.png`**（源图可 36×36，**HotTag 内显示 12×12**） | 显示 12×12px |

**HotTag 样式（暗色模式）**：

| 属性 | 值 |
|------|-----|
| 背景色 | `#2F0C08`（深红棕色） |
| 文字颜色 | `#F7594B`（红色） |
| 字号 | 14px |
| 字重 | 400 |
| 圆角 | `8px 2px 2px 2px`（左上角 8px 匹配卡片圆角） |
| 内边距 | 2px 4px |
| 图标尺寸 | 12×12px |
| 图标间距 | 4px |
| 位置 | `position: absolute; top: 0; left: 0`（卡片内左上角） |

```css
.hot-inner {
  background: var(--bg-tertiary);
  border-radius: 8px;
  padding: 16px;
  position: relative;
  min-height: 150px;
  overflow: hidden;
}
.hot-tag {
  position: absolute;
  top: 0;
  left: 0;
  background: #2F0C08;
  padding: 2px 4px;
  border-radius: 8px 2px 2px 2px;
  font-size: 14px;
  font-weight: 400;
  color: #F7594B;
  display: flex;
  align-items: center;
  gap: 4px;
}
.hot-tag img {
  width: 12px;
  height: 12px;
}
```

### 7.8 里程碑状态图标

| 图标 | 用途 | URL | 本地文件 | 尺寸 |
|------|------|-----|----------|------|
| 已完成 (绿色圆圈勾选) | 10 USDT 已完成 | `https://www.figma.com/api/mcp/asset/b4e8b906-c465-4acb-a70c-ff7f14735128` | `icon-circle-success.png` | 12×12px |
| 当前进度 (锁-白色) | 40 USDT 当前选中 | `https://www.figma.com/api/mcp/asset/bfc9344e-1469-4e3b-b5e9-abd3606e4a68` | `icon-lock-current.png` | 12×12px |
| 未解锁 (锁-灰色) | VIP5/100 USDT 未解锁 | `https://www.figma.com/api/mcp/asset/b896fe15-2f05-4d91-8033-5398843088b9` | `icon-lock-inactive.png` | 12×12px |

### 7.9 AdvancedTaskCard 条件面板素材

| 素材 | 用途 | 本地文件 | 说明 |
|------|------|----------|------|
| 带三角指示器的边框 | adv-conditions 卡片边框（**H5**） | `adv-conditions-frame.svg`（参考 HTML） | 顶部有小三角指向当前里程碑 |
| 外框线框（**Web**） | `adv-conditions::before` | **`adv-conditions-border-web.png`**（1016×283，`rewards-hub-package/assets/`） | 与上传稿 1:1 拉伸铺满面板（`background-size:100% 100%`），圆角 **0** |
| 分隔线（暗色模式） | "and" 分隔线 | `condition-divider-line-dark.svg`（参考 HTML） | — |

**边框图片 URL**：`https://www.figma.com/api/mcp/asset/d54e4190-7805-4cbc-9894-b229c19cfe05`

**CSS 实现**（使用图片边框）：

```css
.adv-conditions {
  position: relative;
  border-radius: 12px;
  padding: 23px 12px 16px;
  background: transparent;
  margin-top: 16px;
}
.adv-conditions::before {
  content: '';
  position: absolute;
  inset: -8px 0 0 0;
  background: url('rewards-hub-package/assets/adv-conditions-frame.svg') center top/100% 100% no-repeat;
  pointer-events: none;
}
.condition-divider::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  height: 1px;
  background: url('rewards-hub-package/assets/condition-divider-line-dark.svg') center/100% 1px no-repeat;
}
```

### 7.10 SVG 图标汇总

**Navbar 返回箭头**：
```html
<svg viewBox="0 0 7 13" fill="none">
  <path d="M6 1L1 6.5L6 12" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
```

**历史：My Records 前进箭头**（当前参考 HTML 已移除「My Records」链路，入口改为 StatsCard 内 **`icon-order-history.png`**；下列 SVG 仅作文档存档）：
```html
<svg viewBox="0 0 9 7" fill="none">
  <path d="M8.56836 3C8.65275 3.08439 8.7002 3.19901 8.7002 3.31836C8.7002 3.43771 8.65275 3.55233 8.56836 3.63672L5.56836 6.63672L4.93164 6L7.16309 3.76855H0V2.86816H7.16309L4.93164 0.636719L5.56836 0L8.56836 3Z" fill="#84888C"/>
</svg>
```

**AdvancedTaskCard 里程碑状态图标**：

```html
<!-- 已完成勾选图标 (绿色) -->
<svg viewBox="0 0 12 12" fill="none">
  <circle cx="6" cy="6" r="5" fill="#2BC235"/>
  <path d="M4 6L5.5 7.5L8 4.5" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

<!-- 锁定图标 (灰色) -->
<svg viewBox="0 0 12 12" fill="none">
  <rect x="2" y="1" width="8" height="10" rx="1.5" fill="#A0A3A7"/>
  <rect x="4" y="4" width="4" height="2" rx="0.5" fill="#fff"/>
  <path d="M6 7V9" stroke="#fff" stroke-width="1" stroke-linecap="round"/>
</svg>
```

---

## 区块 8: 版本记录

| 版本 | 日期 | 变更内容 |
|------|------|----------|
| v2.14 | 2026-03-26 | Web **`adv-conditions`** **移除 `::after`**（不再使用顶边 `adv-conditions-pointer.png`）；**§4.3 / §7.9 / 条件面板** 同步 |
| v2.13 | 2026-03-26 | Web **`adv-conditions`** 外框改为设计线框图 **`adv-conditions-border-web.png`**（1016×283，`::before` 铺满、`border-radius:0`）；**§4.3 / §7.9 / 条件面板** 文档同步 |
| v2.12 | 2026-03-24 | 与 **`rewards-hub-responsive-v1.html`** 再对齐：**H5** `hero-sub`/`hero-title` 容器 **`gap:0`**；**Web Invite** 金额 **25 USDT**、倒计时冒号与数字垂直居中；**Web Advanced** 里程碑 `space-between` + **DOM `condition-bar` 进度条**、combo **300** 放大与层级、**`milestone-label.amount`** 字号/图标/去黄底高亮、**`adv-conditions`** 边框 + **`adv-conditions-pointer.png`**、`condition-title` 两行定高；**Web Hot** 外链 **`#1F2023` + 透明底**、文案区定高/描述 4 行 clamp；**Web SectionHeader** **`margin-top:64px`**；**§3.5** 增补 H5 hero 间距 CSS；**§4.3 / InviteCard / HotEventCard / SectionHeader / §7.9** 同步 |
| v2.11 | 2026-03-24 | 与 **`rewards-hub-h5-v4.html`** / **`rewards-hub-responsive-v1.html`** 对齐：**StatsCard** 两列 + 竖线 + `icon-order-history`（移除 My Records）；**任务行**去掉 `task-desc`；**Welcome `has-promo`** 改为 Grid + **`#0F1F17`** promo 胶囊与 `translateY(-4px)`；**AdvancedTaskCard** `adv-card` 底边距 0、进度文案左对齐单行、`progress-bar.svg`、里程碑 `badge-bg-bottom` 可选与 badge-num / usdt-part 位移；**SectionHeader** `margin-top: 32px`、View More 12px 点状下划线；**§3.5** 完整 CSS 摘录同步；**§7.6–7.7** 资源与历史 Figma 标注更新 |
| v2.10 | 2026-03-25 | 元信息：`html-reference` 改为仓库内相对路径，新增 `html-h5-v4`、`html-offline-package`；**§7.3 ActivityTicker** 补充本地文件列与实现约定（`ticker-avatar-3.png` / 离线包 `rewards-hub-package`）；与当前 `rewards-hub-assets` + 参考 HTML 对齐 |
| v2.9 | 2026-03-18 | 完整同步 HTML：WebHeader Logo 改用图片（图标 24×24 + 文字 77×22）、Rewards Hub 图标改用图片；StatsCard 数字字重改为 **500 Medium**；ActivityTicker 改为 **16 条 ×2 重复**、H5 动画 **75s**、Web 动画 **50s**；新增 7.1.1 WebHeader 素材资源及完整 HTML 结构 |
| v2.8 | 2026-03-18 | 同步 Web 新客页面 HTML：新增 WebHeader 完整规范（48px/blur/导航项）；HeroBanner 统计数字字重改为 300 Light、hero-image top 改为 99px；ActivityTicker 改为 16 条滚动、动画 50s、margin-top 40px；StatsCard gap 改为 40px、标签无下划线、My Records right 32px；HotEventCard 改为 3×3 网格（9 张）|
| v2.7 | 2026-03-17 | 新增 3.5 完整 CSS 样式速查表；更新 3.1 颜色系统与 HTML 变量完全同步；更新 3.4 圆角系统详细说明；adv-conditions margin-top 调整为 16px |
| v2.6 | 2026-03-17 | 同步 H5 新客页面 HTML v4：HeroBanner 高度 128px、GlassButton 渐变边框 CSS、StatsCard 布局细节、HotEventCard 完整结构、条件面板分隔线暗色背景 |
| v2.5 | 2026-03-17 | 精细化 AdvancedTaskCard CSS：里程碑徽章 `bottom:8px`、combo 徽章完整 CSS、进度条与条件面板间距 12px、状态图标改用图片资源 |
| v2.4 | 2026-03-17 | 新增紫色 VIP 徽章资源、进度条图片资源；创建本地资源目录 `rewards-hub-assets/` |
| v2.3 | 2026-03-17 | 更新 AdvancedTaskCard 完整规范：里程碑徽章尺寸映射、条件面板样式、状态图标 SVG；素材资源汇总添加有效期说明 |
| v2.2 | 2026-03-17 | 更新 WelcomeCard 组件规范：任务行间距 12px、普通行/Promo行布局差异、详细 CSS 参数 |
| v2.1 | 2026-03-17 | 新增素材资源汇总、更新 InviteCard/WelcomeCard 无分隔线规范、RewardBadge 使用图片资源 |
| v2.0 | 2026-03-17 | 完整 H5 新客页面规范、4.1 章节详细布局参数 |
| v1.0 | 2026-03-16 | 初始版本 |