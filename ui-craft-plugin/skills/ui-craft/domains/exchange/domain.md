# Exchange 覆盖层

> 交易所业务线特有的设计覆盖。继承 `../_platform/platform.md`（Platform 共享基座），
> 仅记录与 Platform 基座的差异点。
>
> **结构对齐**：与 `campaign/` 相同——域根放 `primitive` / `semantic` / `layout` / **扁平** `components/*`；业务子域规范与物料统一放在 **`business/`**（**禁止**再使用并列顶级目录 `exchange-web/`；历史副本已废除）。

extends: platform

## 目录结构（域根 + 业务延展）

```
exchange/
├── primitive.md · semantic.md · domain.md · layout.md
├── components/*.md              ← 与 campaign 一致：交易所专属组件规格（扁平）
├── styles/                      ← 风格变体（如 personal-center）
└── business/                    ← 业务子域（Booster / Rewards Hub / GateRouter 等）
    ├── README.md
    ├── _template.md
    ├── booster.md
    ├── rewards-hub.md
    ├── rewards-hub-assets/
    ├── gaterouter-credits.md
    └── gaterouter-models.html
```

## 品牌色

```css
.page {
  --brand: #0055FF;           /* Exchange 品牌蓝 Brand/6 */
  --brand-hover: #004FD9;     /* Brand/7 */
  --brand-active: #003CB3;    /* Brand/8 */
  --accent: #0055FF;          /* 同品牌色 */
}
```

## Exchange 强制颜色规则（禁止 AI 自行推测）

> **所有颜色值必须严格来自 Figma Color Token 映射表，不得凭记忆或推测。**
> 完整映射表见 `engine/reference/figma-design-tokens.md`。

```css
.page {
  /* === Text 文字色 === */
  --text-primary: #070808;    /* Neutral/12 */
  --text-secondary: #84888C;  /* Neutral/6 — 不是 #484B51！ */
  --text-tertiary: #A0A3A7;   /* Neutral/5 — 不是 #84888C！ */
  --text-disable: #C4C7CA;    /* Neutral/4 */
  --text-brand: #0055FF;      /* Brand/6 */

  /* === Bg 背景色 === */
  --bg-primary: #FFFFFF;      /* Neutral/White */
  --bg-secondary: #FAFAFA;    /* Neutral/1 */
  --bg-tertiary: #F2F3F4;     /* Neutral/2 */
  --bg-card: #F5F6F7;         /* Neutral/1-1（卡片/输入框底色） */
  --tooltip-bg: #303236;      /* Neutral/8 */

  /* === Trade 交易色 === */
  --color-up: #00BA7C;        /* GreenTrade/6 — 不是 #2BC287！ */
  --color-down: #FF2C58;      /* RedTrade/6 — 不是 #F74B60！ */
  --color-up-active: #20A174; /* GreenTrade/7 */
  --color-down-active: #D6364E; /* RedTrade/7 */
  --color-up-bg: #E5F9F3;    /* GreenTrade/1 */
  --color-down-bg: #FFEBEF;  /* RedTrade/1 */

  /* === Line 线条 === */
  --border-subtle: #F2F3F4;   /* Neutral/2 */
  --border-strong: #DFE0E2;   /* Neutral/3 */
  --divider: #F2F3F4;         /* Neutral/2 */
  --divider-short: #C4C7CA;   /* Neutral/4 */

  /* === 字体 === */
  font-family: 'Gate Switzer', -apple-system, system-ui, sans-serif;
  /* 按钮圆角：999px（全胶囊形） */
}
```

## 图标

使用 CEX 图标集：
- Figma 来源: Exchange Web `13:2` (Icon CEX)
- 代码来源: `@gate/iconfont`

## 独有组件

交易所业务组件（与 Platform 共享基座相比的增量）：

| 组件 | 说明 | 规格文件 |
|------|------|---------|
| TradePanel | 交易面板（买/卖） | [规格](components/trade-panel.md) |
| OrderBook | 订单簿深度图 | [规格](components/order-book.md) |
| MarketTicker | 行情概览条 | [规格](components/market-ticker.md) |
| Chart | K线图表 | [规格](components/chart.md) |
| TraderCard | 跟单交易员卡片 | [规格](components/trader-card.md) |
| PortfolioSummary | 资产概览摘要 | [规格](components/portfolio-summary.md) |
| SegmentedControl | 分段切换控件 | [规格](components/segmented-control.md) |
| AnnouncementBanner | 通知横幅 | [规格](components/announcement-banner.md) |
| FilterChip | 筛选按钮 | [规格](components/filter-chip.md) |

## 业务子域

> 入口索引：[business/README.md](business/README.md)

Exchange 域下包含以下业务子域，各子域有独立的页面规范和业务组件（规格文件均在 `business/` 下）：

### Booster 推广计划

> Figma: [Booster 推广计划](https://www.figma.com/design/qfajQWQ2uszBiwi0v4bBFb/Booster-%E6%8E%A8%E5%B9%BF%E8%AE%A1%E5%88%92)
> 覆盖：H5 375px + Web 1920px + 响应式 768px/1024px

| 维度 | 与 Exchange 基础的差异 | 说明 |
|------|----------------------|------|
| **背景色** | `#FFFFFF`（亮色为主） | 非暗色交易风格 |
| **按钮** | `#0055FF` 实色 + 999px 圆角 | 与 Exchange 一致 |
| **卡片圆角** | 8px | 比营销页（16px）更紧凑 |
| **特殊色** | `#A7F757` Accent Green | 装饰图标专用 |
| **状态徽章** | Issued `#E8F5E9/#2BC235` / Pending `#FFF4E3/#FF9447` | Booster 独有 |

**Booster 业务组件**：

| 组件 | 用途 | 来源 |
|------|------|------|
| TaskCard | 推广任务卡片（标签+标题+描述） | 业务定制 |
| AlertBanner | 提示横幅 `#FFF5EB` 背景 | 业务定制 |
| SocialIcons | 社交平台图标（X/YouTube/TG 等） | 业务定制 |
| ReferralDetails | 邀请详情（标签+数值+链接） | 业务定制 |
| ReviewRules | 审核规则列表 | 业务定制 |

详细规范：[booster.md](business/booster.md)

---

### Rewards Hub 福利中心

> Figma: [福利中心 再优化改版](https://www.figma.com/design/rolyycBTmxioksI63PQqbL/)
> 覆盖：H5 375px + Web 1920px

| 维度 | 与 Exchange 基础的差异 | 说明 |
|------|----------------------|------|
| **背景色（暗色）** | `#0D0D0D` / `#1A1A1A` | 营销暗色风格 |
| **卡片圆角** | 16px（H5）/ 24px（Web） | 比交易页更圆润 |
| **按钮** | `linear-gradient(135deg, #0055FF, #00AAFF)` 渐变 | 营销渐变 CTA |
| **毛玻璃** | `backdrop-filter: blur(10px)` | HeroBanner 按钮 |
| **字体** | Switzer（Web 专用） | — |

**Rewards Hub 页面类型**：

| 页面 | 说明 | 专属组件 |
|------|------|---------|
| **新客页面** | 新注册用户 | UserInviteBanner、TaskCard、Welcome Package、AdvancedTaskCard |
| **老客页面** | 已完成新手任务 | GTTabs、ExclusiveTaskCard、RegularTaskCard、VoucherCard |

**Rewards Hub 业务组件**：

| 组件 | 用途 | 来源 |
|------|------|------|
| TaskRow | 任务行：徽章+信息+按钮+Promo | 业务定制 |
| UserInviteBanner | 邀请横幅：头像+文案+倒计时 | 新客专属 |
| TaskCard | 新手任务容器（含标题+子任务） | 新客专属 |
| AdvancedTaskCard | 进阶任务卡片（含里程碑+进度） | 新客专属 |
| HotEventCard | 热门活动卡片 | 新客专属 |
| ExclusiveTaskCard | 专属任务卡片（无进度条） | 老客专属 |
| RegularTaskCard | 常规任务卡片（含进度条） | 老客专属 |
| VoucherCard | 券卡片（瀑布流 2 列） | 老客专属 |
| GTTabs | 任务分类 Tab 切换 | 老客专属 |
| GTCountdownV5 | 紧凑倒计时标签（卡片右上角） | 老客专属 |
| HeroBanner | 主 Banner（H5+Web 双端） | 通用 |

详细规范：[rewards-hub.md](business/rewards-hub.md)

---

### 共享营销组件

以下组件在 Booster / Rewards Hub 等营销页中共用，已提取为独立规格文件：

| 组件 | 说明 | 规格文件 |
|------|------|---------|
| CountdownTimer | 倒计时（H5+Web 4 种变体） | [规格](components/countdown-timer.md) |
| GradientCTA | 渐变行动按钮（5 种状态） | [规格](components/gradient-cta.md) |
| GlassButton | 毛玻璃按钮（胶囊+圆形） | [规格](components/glass-button.md) |
| HotTag | 热度标签（火焰+数字） | [规格](components/hot-tag.md) |
| PromoTag | 促销倒计时标签 | [规格](components/promo-tag.md) |
| RewardBadge | 奖励数字+USDT 徽章 | [规格](components/reward-badge.md) |
| ActivityTicker | 活动播报条（毛玻璃滚动） | [规格](components/activity-ticker.md) |
| SectionHeader | 模块标题+View More | [规格](components/section-header.md) |
| StatusBadge | 状态徽章（Issued/Pending） | [规格](components/status-badge.md) |

---

## 布局扩展

见 [layout.md](./layout.md)

- 交易页采用 `platform.trading` 多面板布局
- 行情列表采用 `platform.list` 布局
- **Copy Trading 跟单广场**采用 `platform.copy-trading` 列表布局（App 端）

## 平台渲染规则（所有 Exchange 页面通用）

根据目标平台严格应用对应规范数值，**禁止跨平台混用参数**。

### H5（375px）

| 属性 | 值 |
|------|-----|
| 页面最大宽度 | `375px`，`margin: 0 auto`，模拟手机界面 |
| 页面边距 | `20px` |
| 内容区宽度 | `335px`（375 − 20 × 2） |
| 字体 | `'Switzer', 'Gate_Switzer', -apple-system, sans-serif` |
| 规范来源 | `domains/exchange/` 相关文件 + 对应业务 md |

### Web（1920px）

| 属性 | 值 |
|------|-----|
| 内容区最大宽度 | `1200px`，水平居中 |
| 顶部导航 | `48px` 高，`#070808` 背景，`backdrop-filter: blur(50px)` |
| 字体 | `'Switzer', sans-serif` |
| 规范来源 | `domains/exchange/` 相关文件 + 对应业务 md |

### 响应式断点

| 断点 | 导航 | 卡片列数 |
|------|------|---------|
| ≤ 768px | 菜单隐藏（汉堡菜单） | 2 列 |
| 1024px | 6 项导航 + 截断 | 2 列 |
| ≥ 1920px | 完整导航 | 3 列 |

## 风格变体

Exchange 域下包含以下风格变体，用于不同类型的页面场景：

| 风格 | 说明 | 规格文件 |
|------|------|---------|
| personal-center | V5.1 个人中心/账号管理页（侧栏+表格布局） | [规格](styles/personal-center.md) |

## Figma 来源

- Web: kQIx9xKLiyO6KZIbazNSM2 (V5.1 Web+H5组件库)
- App: 9HordMtYdfmXOYwExRy1MF (Gate App 设计系统 V6)
- 个人中心: vshyZlffsvRqm0whWsoJBp (Web个人中心 V5.1)

### Exchange Web 独有页面

| 页面 | 节点 ID | 说明 |
|------|---------|------|
| Color 颜色 | 7029:24769 | 颜色系统源头 |
| Icon Web3图标 | 7595:10213 | Web3 图标集（集中管理） |
| V5定稿 | 148:20596 | 历史版本归档 |
| 更新日志 | 10:2 | 变更记录 |
| 子账号管理 V5.1 | 1763:77143 | 个人中心-子账号（含 Web+H5） |
