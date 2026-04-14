# Gate To Earn 超级返佣

> 所属域：[Exchange](../../domain.md) > Business > [Invite Friends](./_base.md) > Gate To Earn
> 继承：[_base.md](./_base.md) 共享规范

---

## 区块 1: 元信息

```yaml
name: gate-to-earn
description: Gate To Earn 模块 — 邀请好友交易获得持续返佣 + 数据总览
figma: https://www.figma.com/design/VMTfLK0ozaGCzynyMho3HT?node-id=579-27913
coverage: Web
theme: dark
inherits: _base.md
integrated_html: /output/invited-friends/token-crew.html
html_output: /output/invited-friends/token-crew.html (tab-content-gate-to-earn)
```

---

## 区块 2: 模块画像

- **核心玩法**：邀请好友交易，获得交易手续费返佣（Spot/Alpha/Contract/TradFi）
- **奖励类型**：持续性交易返佣（按比例）
- **特殊能力**：数据总览面板、佣金费率展示、推荐活动

| 维度 | 本模块 | 基础规范 | 说明 |
|------|--------|---------|------|
| 视觉重点 | 返佣比例 + 数据总览 | — | 突出百分比和累计收益 |
| 装饰程度 | 低 | 克制 | 纯数据展示，无特殊装饰 |
| 页面框架 | 继承 + 扩展 | Token Crew | Hero 右侧为 Referral Box 而非视觉装饰 |

---

## 区块 3: Token 覆盖

> 与 `_base.md` 的差异项。

```css
:root {
  /* 继承 _base.md 全部 Token */
  
  /* Gate To Earn 品牌蓝高亮 */
  --gte-rate-color: #0055FF;
  
  /* Referral Box */
  --gte-referral-bg: var(--bg-secondary);  /* #131516 */
  --gte-referral-radius: 24px;
  --gte-referral-action-bg: #18191B;
  --gte-referral-action-border: #484B51;
  
  /* Commission Card */
  --gte-commission-bg: var(--bg-secondary);  /* #131516 */
  --gte-commission-radius: 16px;
  
  /* Data Grid */
  --gte-data-grid-bg: var(--bg-secondary);  /* #131516 */
  --gte-data-grid-radius: 16px;
  
  /* Date Picker */
  --gte-date-picker-bg: #131516;
  --gte-date-picker-radius: 6px;
  
  /* Activity Card */
  --gte-activity-border: #1F2023;
  --gte-activity-radius: 12px;
  --gte-activity-banner-bg: #1F2023;
  --gte-activity-tag-bg: #2F0C08;
  --gte-activity-tag-color: #F7594B;
}
```

---

## 区块 4: 页面结构

### Gate To Earn 完整布局（HTML 结构）

```html
<div id="tab-content-gate-to-earn" class="tab-content">

    <!-- H5 顶栏：Status Bar + TabsV5（仅 ≤767px 展示；≥768px 隐藏） -->
    <div class="ev-h5-status-bar" aria-hidden="true">
      <div class="ev-h5-status-inner">
        <div class="ev-h5-time">9:41</div>
        <div class="ev-h5-dynamic-spacer"></div>
        <div class="ev-h5-status-icons">
          <img src="[signal]" width="19" height="12" alt="">
          <img src="[wifi]" width="17" height="12" alt="">
          <img class="ev-h5-battery" src="[battery]" width="27" height="13" alt="">
        </div>
      </div>
    </div>
    <div class="ev-h5-tab-nav">
      <div class="ev-h5-tab-nav-inner">
        <div class="ev-h5-tab-nav-title-wrap">
          <span class="ev-h5-tab-nav-label">Gate To Earn</span>
          <img class="ev-h5-tab-nav-chevron" src="[chevron]" width="16" height="16" alt="" aria-hidden="true">
        </div>
        <button type="button" class="ev-h5-tab-nav-close" aria-label="Close">
          <img src="[close]" width="18" height="18" alt="">
        </button>
      </div>
    </div>

  <!-- Hero Section: 左文字 + 右 Referral Box -->
  <section class="hero-section gte-hero" style="margin-bottom: 160px;">
    <div class="hero-left">
      <div class="hero-text">
        <h1 class="hero-title">Invite 2 Friends to Get<br>Up to 20 USDT</h1>
        <p style="font-size: 20px; font-weight: 500; color: var(--text-tertiary); margin-top: 11px;">Each friend gets up to 5 USDT</p>
      </div>
      <button class="invite-btn" style="width: 228px; height: 56px; font-size: 16px; font-weight: 600;">Invite Friends to Boost</button>
    </div>
    <div class="gte-referral-box">
      <div class="gte-referral-item">
        <div class="gte-referral-label">Referral Link:  <span>https://w....103</span></div>
        <div class="gte-referral-action">
          <img src="figma-asset: CEX_Copy" alt="copy" style="width: 16px; height: 16px;">
        </div>
      </div>
      <div class="gte-referral-divider"><div class="gte-referral-divider-line"></div></div>
      <div class="gte-referral-item">
        <div class="gte-referral-label">Referral Code:  <span>AVVHXFBF</span></div>
        <div class="gte-referral-action">
          <img src="figma-asset: CEX_Copy" alt="copy" style="width: 16px; height: 16px;">
        </div>
      </div>
    </div>
  </section>

  <!-- Commission Rate: 4列卡片 -->
  <section class="gte-commission">
    <div class="section-header">
      <div class="section-title-wrap">
        <h2 class="section-title">Commission Rate</h2>
      </div>
      <div class="gte-referral-action" style="margin-left: auto;">
        <img src="figma-asset: CEX_Edit" alt="edit" style="width: 18px; height: 18px;">
      </div>
    </div>
    <div class="gte-commission-cards">
      <!-- Spot / Alpha / Contract / TradFi 四张卡片 -->
      <div class="gte-commission-card">
        <div class="gte-commission-card-title">Spot</div>
        <div class="gte-commission-rates">
          <div class="gte-rate-group">
            <span class="gte-rate-label">You share</span>
            <span class="gte-rate-value">30%</span>
          </div>
          <div class="gte-rate-group" style="text-align: right;">
            <span class="gte-rate-label">Referrals</span>
            <span class="gte-rate-value referral">10%</span>
          </div>
        </div>
      </div>
      <!-- Alpha: 30%/10%, Contract: 20%/10%, TradFi: 20%/10% -->
    </div>
  </section>

  <!-- Data Overview: 左右布局 (1920px) / 上下布局 (≤1024px) -->
  <section class="gte-data-overview">
    <div class="gte-data-header">
      <div class="gte-data-title-wrap">
        <h2 class="gte-data-title">Data Overview</h2>
        <span class="gte-data-time">Data Update Time: 2025-01-18 12:00:00 (UTC+8)</span>
      </div>
      <div class="gte-date-picker">
        <span>Start date</span>
        <img src="figma-asset: CEX_ForwardArrow" alt="arrow">
        <span>End date</span>
        <img src="figma-asset: CEX_Calendar" alt="calendar">
      </div>
    </div>
    <!-- 3 行数据: You've earned / Total Referrals / Total Trade Volume -->
    <div class="gte-data-row">
      <div class="gte-data-summary">
        <div class="gte-data-summary-label">You've earned (USDT)</div>
        <div class="gte-data-summary-value">1125.52</div>
      </div>
      <div class="gte-data-grid"><!-- 4列: Spot/Alpha/Futures/TradFi --></div>
    </div>
    <div class="gte-data-row">
      <div class="gte-data-summary">
        <div class="gte-data-summary-label">Total Referrals</div>
        <div class="gte-data-summary-value">32</div>
      </div>
      <div class="gte-data-grid gte-data-grid-3col"><!-- 3列: Verified/Deposited/Traded --></div>
    </div>
    <div class="gte-data-row">
      <div class="gte-data-summary">
        <div class="gte-data-summary-label">Total Trade Volume (USDT)</div>
        <div class="gte-data-summary-value">0</div>
      </div>
      <div class="gte-data-grid"><!-- 4列: Spot/Alpha/Futures/TradFi --></div>
    </div>
  </section>

  <!-- Event History -->
  <section class="gte-event-history">
    <div class="section-header" style="margin-bottom: 0;">
      <div class="section-title-wrap">
        <h2 class="section-title">Event History</h2>
      </div>
    </div>
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
      <div class="gte-event-tabs">
        <div class="gte-event-tab active">Referral History</div>
        <div class="gte-event-tab">Commission History</div>
      </div>
      <div class="gte-view-all-link">Invite History ›</div>
    </div>
    <div class="gte-event-filters">
      <input type="text" class="gte-search-input" placeholder="Search">
      <div class="gte-date-picker" style="width: 242px;"><!-- 时间选择器 --></div>
    </div>
    <table class="gte-event-table">
      <thead>
        <tr>
          <th>Transaction Code</th>
          <th>Action/Position</th>
          <th>First Deposit Date</th>
          <th>Time Raised (Date)</th>
          <th>Commission Amount</th>
          <th style="text-align: right;">Commission (USDT)</th>
        </tr>
      </thead>
    </table>
    <div class="gte-empty-state"><!-- 空状态 --></div>
  </section>

  <!-- Referral Activity: 3列活动卡片 -->
  <section class="gte-referral-activity">
    <div class="section-header">
      <div class="section-title-wrap">
        <h2 class="section-title">Referral Activity</h2>
      </div>
    </div>
    <div class="gte-activity-cards">
      <!-- 3 张活动卡片 -->
      <div class="gte-activity-card">
        <div class="gte-activity-card-banner">
          <div class="gte-activity-card-tag">
            <img src="figma-asset: CEX_hot_fill"> 31,291
          </div>
          <div class="gte-activity-card-inner">
            <div class="gte-activity-card-text">
              <div class="gte-activity-card-text-title">VIP Super Friday Issue 16</div>
              <div class="gte-activity-card-text-desc">The task has been completely revamped...</div>
            </div>
            <div class="gte-activity-card-thumb">
              <img src="figma-asset: activity-thumb" alt="activity">
            </div>
          </div>
        </div>
        <div class="gte-activity-card-body">
          <div class="gte-activity-card-desc">VIP Super Friday Issue 16: Tasks Fully Revamped...</div>
          <div class="gte-activity-card-meta">
            <span class="gte-activity-card-meta-label">Ends In</span>
            <div class="gte-activity-card-countdown">
              <span class="gte-countdown-mini">3D</span>
              <span class="gte-countdown-mini-sep">:</span>
              <span class="gte-countdown-mini">03</span>
              <!-- ... -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="gte-view-all">
      <span class="gte-view-all-link">View all →</span>
    </div>
  </section>

</div><!-- End Gate To Earn Content -->
```

### 区块间距规范

| 区块 | 距上一区块 |
|------|-----------|
| Header → TabBar | 64px (padding-top) |
| TabBar → Hero | 90px |
| Hero → Commission Rate | 160px (margin-bottom on hero) |
| Commission Rate → Data Overview | 160px |
| Data Overview → Event History | 160px |
| Event History → Referral Activity | 160px |
| Referral Activity → Footer | 100px |

---

## 区块 5: 模块专属组件

### GteHero 奖励总览

```
┌──────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│  Invite 2 Friends to Get             ┌──────────────────────────────┐   │
│  Up to 20 USDT                       │  Referral Link: https://...  🔗│   │
│                                      │─────────────────────────────│   │
│  Each friend gets up to 5 USDT       │  Referral Code: AVVHXFBF   📋│   │
│                                      └──────────────────────────────┘   │
│  ┌───────────────────────┐                                              │
│  │ Invite Friends to Boost│                                              │
│  └───────────────────────┘                                              │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

| 属性 | 值 |
|------|-----|
| 区块高度 | 300px |
| 左侧布局 | flex-direction: column, gap: 46px |
| 右侧 Referral Box 宽度 | 470px |
| Referral Box 圆角 | 24px |
| Referral Box 背景 | var(--bg-secondary) #131516 |
| Referral Box 内边距 | 10px 24px |
| Referral 标签文字 | 16px / 400 Regular / #84888C（标签）+ #FFFFFF（值）|
| Referral Action 按钮 | 40×40px, 圆形 99px, bg: #18191B, border: 1px solid #484B51 |
| Referral 分隔线 | 1px / var(--border-subtle) / 外层 12px 高 |
| 主标题 | 48px / 600 Semibold / #FFFFFF |
| 副标题 | 20px / 500 Medium / #84888C / margin-top: 11px |
| 按钮 | 228×56px / 16px / 600 Semibold / bg: #0055FF / radius: 999px |
| 间距（左右） | gap: 40px |

### CommissionRate 佣金费率卡片

```
┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
│  Spot     │  │  Alpha    │  │  Contract │  │  TradFi   │
│           │  │           │  │           │  │           │
│ You  Ref  │  │ You  Ref  │  │ You  Ref  │  │ You  Ref  │
│ 30%  10%  │  │ 30%  10%  │  │ 20%  10%  │  │ 20%  10%  │
└──────────┘  └──────────┘  └──────────┘  └──────────┘
```

| 属性 | 值 |
|------|-----|
| 卡片布局 | grid, 4列, gap: 24px |
| 卡片背景 | var(--bg-secondary) #131516 |
| 卡片圆角 | 16px |
| 卡片内边距 | 24px |
| 卡片标题 | 24px / 600 Semibold / #FFFFFF / margin-bottom: 44px |
| 费率标签 | 14px / 500 Medium / #84888C |
| 费率数值-You share | 32px / 600 Semibold / #0055FF |
| 费率数值-Referrals | 32px / 600 Semibold / #FFFFFF |
| 右上角编辑按钮 | 同 gte-referral-action 样式, icon 18px CEX_Edit |

### DataOverview 数据总览

```
1920px 布局（左右）:
┌──────────────┬─────────────────────────────────────────────┐
│ You've earned│  Spot    │  Alpha    │  Futures  │  TradFi  │
│ 1125.52      │  86.12   │  1139.10  │  0.30     │  0       │
└──────────────┴─────────────────────────────────────────────┘

1024px/768px 布局（上下）:
┌─────────────────────────┐
│ You've earned (USDT)    │
│ 1125.52                 │
├─────────────────────────┤
│ Spot │ Alpha │ Futures │ TradFi │
│ 86.12│1139.10│  0.30   │   0    │
└─────────────────────────┘
```

| 属性 | 值 |
|------|-----|
| 标题 | 40px / 600 Semibold / #FFFFFF |
| 数据更新时间 | 14px / 400 Regular / #84888C |
| 标题区下边距 | padding-bottom: 20px |
| 日期选择器 | 258×40px, bg: #131516, radius: 6px, 14px / 500 Medium / #84888C |
| 日期选择器内部 | justify-content: space-between, span 宽度 85px 居中 |
| 数据行布局 (1920px) | flex 横向, summary 280px + grid flex:1 |
| 数据行布局 (≤1024px) | flex-direction: column, summary 全宽 + grid 全宽 |
| 数据行间距 | margin-bottom: 24px |
| 摘要标签 | 16px / 400 Regular / #A0A3A7 |
| 摘要数值 | 40px / 600 Semibold / #FFFFFF |
| 数据网格背景 | var(--bg-secondary) #131516 |
| 数据网格圆角 | 16px |
| 网格单元格内边距 | 24px |
| 网格单元格分隔 | border-right: 1px solid var(--border-subtle) |
| 网格标签 | 16px / 400 Regular / #A0A3A7 |
| 网格数值 | 32px / 600 Semibold / #FFFFFF |
| 4 列网格 | grid-template-columns: repeat(4, 1fr) |
| 3 列网格 | grid-template-columns: repeat(3, 1fr)（gte-data-grid-3col）|

### EventHistory 事件历史

| 属性 | 值 |
|------|-----|
| 标题 | 40px / 600 Semibold / #FFFFFF / 左对齐 |
| Tab 字号 | 24px / 600 Semibold |
| Tab 默认色 | var(--text-tertiary) #84888C |
| Tab 激活色 | #FFFFFF |
| Tab 激活下划线 | ::after, width: 16px, height: 3px, #FFFFFF, radius: 1px, 居中 |
| 右侧链接 | 16px / 500 Medium / var(--text-secondary) + chevron 图标 |
| 搜索框 | 240×40px, bg: var(--bg-card), radius: 8px, 14px / 500 Medium |
| 表头 | 14px / 400 Regular / #84888C, border-bottom: 1px solid var(--border-subtle) |
| 空状态 | padding: 60px 0, 图标 64px + 文字 14px / 400 / #84888C |

### ReferralActivity 推荐活动卡片

| 属性 | 值 |
|------|-----|
| 卡片布局 | grid, 3列, gap: 24px |
| 卡片边框 | 1px solid #1F2023 |
| 卡片圆角 | 12px |
| 卡片内边距 | 16px |
| 卡片内部间距 | gap: 16px (flex-direction: column) |
| Banner 高度 | 156px |
| Banner 背景 | #1F2023, radius: 8px |
| Banner 内容定位 | absolute, left: 16px, top: 50%, transform: translateY(calc(-50% + 6px)), width: 320px |
| Banner 文案区宽度 | 200px |
| Banner 标题 | 18px / 600 Semibold / #FFFFFF |
| Banner 描述 | 14px / 400 Regular / #A0A3A7, 2行截断 |
| Banner 缩略图 | 96px 容器, 88px 图片 |
| Tag | position: absolute, top: 0, left: 0, bg: #2F0C08, 14px / 400 / #F7594B |
| Tag 火焰图标 | 12px CEX_hot_fill |
| 底部区域高度 | 74px |
| 底部标题 | 16px / 600 Semibold / #FFFFFF, 宽度 311px |
| 底部元数据 | "Ends In" 14px / 400 / #A0A3A7 |
| Mini Countdown | bg: #1F2023, radius: 2px, 20px 高, 12px / 500 Medium / #FFFFFF |
| Mini Countdown 分隔符 | 12px / 500 Medium / #484B51 |
| View all 链接 | 16px / 500 Medium / var(--text-secondary), 居中, hover: #FFFFFF |

---

## 区块 6: 响应式断点规范

| 断点 | 内容区宽度 | 布局调整 |
|------|-----------|----------|
| **1920px** | 1200px | 默认布局，Data Overview 左右横排 |
| **1440px** | 1200px (padding: 0 40px) | 保持居中 |
| **1280px** | 1100px | Hero gap 缩小至 24px |
| **1024px** | 976px | Commission 4列→2列, Data Overview 上下布局, Activity 3列→2列, Hero 垂直布局, Referral Box 全宽 |
| **768px** | 728px | Commission 单列, Activity 单列 |
| **≤767px** | 100% (padding: 0 20px 由 .main-content 提供) | H5 全量重排，详见下方 |

### 1024px 断点详细

| 组件 | 1920px | 1024px |
|------|--------|--------|
| Hero | 左右布局 | 垂直布局 (flex-direction: column) |
| Referral Box | 470px 宽 | 100% 全宽 |
| Commission Rate | 4列 grid | 2列 grid |
| Data Overview | 左右横排 (summary 280px + grid flex:1) | 上下纵排 (summary 全宽 + grid 全宽) |
| Activity Cards | 3列 grid | 2列 grid |
| Data Grid | 4列 / 3列 | 保持不变 |

### 768px 断点详细

| 组件 | 1920px | 768px |
|------|--------|-------|
| Commission Rate | 4列 | 1列单列 |
| Data Grid | 4列 | 保持 4列 |
| Data Grid 3col | 3列 | 保持 3列 |
| Activity Cards | 3列 | 1列单列 |
| 区块间距 | 160px | 120px |

### ≤767px H5 断点详细 — Figma 606:23282

> **页边距**：由 `.main-content { padding: 0 var(--rh-page-padding) }` 统一提供 20px，各 section 自身 `padding: 0`，不叠加额外水平 padding。
> **区块间距**：所有 section 统一 `margin-bottom: 48px`。

#### H5 页面结构（≤767px 纵向排列）

```
┌─────────────────────────────┐  ← .main-content padding: 0 20px
│ [H5 Status Bar]              │  ← 9:41 + 信号/电量（撑满视口宽）
│ [H5 Tab Nav]                 │  ← "Gate To Earn ▼" + ✕ 关闭
├─────────────────────────────┤
│         Hero（居中）          │  padding: 32px 0 0
│  "Invite 2 Friends to Get"   │  32px/700, text-align: center
│  "Up to 20 USDT"             │
│  "Each friend gets up to 5"  │  14px/400, #84888C
│  [Invite Friends to Boost]   │  全宽 max-width: 335px, h: 49px, mt: 48px
├─────────────────────────────┤  mb: 48px
│ Commission Rate         ✏️   │  标题 20px/500, 编辑按钮 32×32
│ ┌───────────────────────────┐│
│ │ Spot      30% You share   ││  横向 row 布局: title flex:1 + rates
│ │           10% Referrals   ││  rates: 22px/600 #0055FF + 12px/400 #84888C
│ ├───────────────────────────┤│  无间距 gap:0, 首尾圆角 16px
│ │ Alpha     30% You share   ││
│ │           10% Referrals   ││
│ ├───────────────────────────┤│
│ │ Contract  20% You share   ││
│ │           10% Referrals   ││
│ ├───────────────────────────┤│
│ │ TradFi    20% You share   ││
│ │           10% Referrals   ││
│ └───────────────────────────┘│
│ ┌───────────────────────────┐│  ← .gte-referral-box-h5
│ │ Referral Link: https://…🔗││  margin: 16px 0 0, bg: #131516
│ │ Referral Code: AVVHXFBF 📋││  radius: 16px, padding: 16px
│ └───────────────────────────┘│
├─────────────────────────────┤  mb: 48px
│ Data Overview                │  标题 24px/600, 左对齐
│ Data Update Time: ...        │  12px, 左对齐
│                              │
│ You've earned (USDT)         │  padding: 24px 0 0（无水平 padding）
│ 1125.52                      │  28px/600
│ ┌───────┬───────┬───────┬───┐│  data-grid 16px 圆角
│ │Spot   │Alpha  │Futures│...││  cell padding: 16px, label 12px, value 18px/600
│ └───────┴───────┴───────┴───┘│
│                              │
│ Total Referrals              │  同上布局
│ 32                           │
│ ┌───────┬───────┬───────────┐│
│ │Verify │Depos. │Traded     ││
│ └───────┴───────┴───────────┘│
│                              │
│ Total Trade Volume (USDT)    │  同上布局
│ 0                            │
│ ┌───────┬───────┬───────┬───┐│
│ │Spot   │Alpha  │Futures│...││
│ └───────┴───────┴───────┴───┘│
├─────────────────────────────┤  mb: 48px
│ Event History                │  section-header mb: 0（紧邻 tabs）
│ Referral History | Comm Hist │  tabs 左对齐, 16px, gap: 0
│ Invite History ›             │
│ [🔍 Search] [📅]             │  filters row, search flex:1, date 40×40 icon-only
│ ┌───────────────────────────┐│
│ │ Commission │ UID │ Comm T ││  .mobile-table-scroll 横向滚动
│ │ (空状态)                   ││
│ └───────────────────────────┘│
├─────────────────────────────┤  mb: 48px
│ Referral Activity            │  section-header mb: 16px
│ ┌────────┐ ┌────────┐       │  横向滚动 overflow-x: auto
│ │275×222 │ │275×222 │ ...   │  卡片 275×222px, gap: 12px
│ └────────┘ └────────┘       │
│       View all ∨             │
├─────────────────────────────┤
│ [H5 Footer]                 │  .footer-h5（≤767px 专用）
└─────────────────────────────┘
```

#### H5 各模块 CSS 关键属性

| 模块 | H5 CSS 关键规则 |
|------|----------------|
| **Hero** | `flex-direction: column; align-items: center; padding: 32px 0 0; margin-bottom: 48px` |
| Hero 标题 | `font-size: 32px; font-weight: 700; text-align: center` |
| Hero 副标题 | `font-size: 14px; color: #84888c; text-align: center` |
| Hero 按钮 | `width: 100%; max-width: 335px; height: 49px; margin-top: 48px; order: 2` |
| Hero Referral Box | `display: none`（原位隐藏，移至 commission 区块下方） |
| **Commission** | `padding: 0; margin-bottom: 48px` |
| Commission header | `padding: 0; margin-bottom: 16px` |
| Commission 标题 | `font-size: 20px; font-weight: 500` |
| Commission cards | `flex-direction: column; gap: 0; padding: 0` |
| Commission 单卡 | `flex-direction: row; gap: 20px; padding: 24px 16px; bg: #131516; radius: 0` |
| Commission 首尾卡 | 首: `border-radius: 16px 16px 0 0`; 尾: `border-radius: 0 0 16px 16px` |
| Commission card-title | `font-size: 20px; font-weight: 400; flex: 1` |
| Commission rates | `flex-direction: column; gap: 4px` |
| Commission rate-group | `flex-direction: row; gap: 20px; align-items: center` |
| Commission rate-value | `font-size: 22px; font-weight: 600; color: #0055FF; order: -1` |
| Commission rate-value.referral | `color: #A0A3A7` |
| Commission rate-label | `font-size: 12px; color: #84888C` |
| **H5 Referral Box** | `display: flex; flex-direction: column; bg: #131516; radius: 16px; padding: 16px; margin: 16px 0 0` |
| Referral item | `flex; justify-content: space-between; padding: 8px 0` |
| Referral label | `font-size: 14px; color: #84888C; span: #FFFFFF` |
| Referral action | `24×24px` |
| **Data Overview** | `padding: 0; margin-bottom: 48px` |
| Data header | `margin-bottom: 16px; align-items: flex-start; text-align: left` |
| Data title | `font-size: 24px; font-weight: 600` |
| Date picker | `display: none` |
| Data summary | `padding: 24px 0 0`（无水平 padding） |
| Data summary label | `font-size: 12px; color: #84888C` |
| Data summary value | `font-size: 28px; font-weight: 600` |
| Data grid | `border-radius: 16px` |
| Data cell | `padding: 16px; label: 12px; value: 18px/600` |
| **Event History** | `padding: 0; margin-bottom: 48px` |
| Event section-header | `margin-bottom: 0 !important`（标题与 tabs 紧邻，无间距） |
| Event toolbar | `gap: 8px !important; margin-bottom: 16px !important`（tabs→search 间距 16px） |
| Event tabs | `gap: 0; justify-content: flex-start`（左对齐） |
| Event tab | `font-size: 16px; padding: 10px 12px 10px 0; text-align: left` |
| Event filters | `flex-direction: row; gap: 12px` |
| Search field | `flex: 1` |
| Date picker (event) | `40×40px icon-only; span/first-img: hidden` |
| **Referral Activity** | `padding: 0; margin-bottom: 48px` |
| Activity cards | `display: flex; overflow-x: auto; gap: 12px` |
| Activity card | `width: calc(275px/0.8); min-width: calc(275px/0.8); height: calc(222px/0.8); zoom: 0.8; overflow: hidden` |
| Activity card body | `height: auto !important; flex: 1`（自适应高度，确保倒计时可见） |
| Activity card desc | `-webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden`（2 行截断） |

---

## 区块 7: 继承组件

> 以下组件完全继承 `_base.md`，无需覆盖。

- Header 导航栏（黑色模式）
- InviteTabBar Tab 导航（3 Tab: Token Crew / Earn Voucher / Gate To Earn）
- H5TopBar H5 顶栏（≤767px Status Bar + Tab Nav）
- H5TabSheet H5 Tab 切换弹窗（≤767px 底部弹窗）
- SectionTitle 区块标题（40px / 600 Semibold / #FFFFFF）
- Pagination 分页器
- Footer 页脚（黑色模式）

---

## 区块 8: 图片资源

| 资源 | 用途 | Figma Node |
|------|------|------------|
| CEX_Copy | Referral Box 复制按钮 | 584:6460 |
| CEX_Edit | Commission Rate 编辑按钮 | 576:16497 |
| CEX_ForwardArrow | 日期选择器箭头 | 576:16563 |
| CEX_Calendar | 日期选择器日历图标 | 576:16563 |
| CEX_hot_fill | 活动卡片热度火焰 | 579:27999 |
| activity-thumb | 活动卡片缩略图 | 579:28020 |

---

## 区块 9: 适用性

### 适用场景
- Gate To Earn 超级返佣活动页
- 邀请返佣数据展示
- 佣金费率展示
- 推荐活动列表

### 不适用场景
- 赚币活动（用 token-crew.md）
- 助力领券（用 earn-voucher.md）

---

## 变更日志

| 日期 | 变更 | 来源 |
|------|------|------|
| 2026-03-29 | ≤767px 微调：Activity Card body 改 `height:auto` + desc 2行截断（修复倒计时被截断）；Event History section-header `margin-bottom:0`（标题与tabs紧邻，匹配 Figma 674-10358）；Event toolbar `gap:8px` + `margin-bottom:16px`（tabs→search 16px） | HTML 走查 + Figma |
| 2026-03-29 | ≤767px H5 全量布局规范：统一页边距策略（.main-content 20px，section padding:0）；Data Overview 标题/摘要左对齐去 padding；Event History tabs 左对齐；Referral Activity 卡片 275×222 横向滚动；新增 H5 Referral Box 组件 | HTML 对齐 + Figma 606:23282 |
| 2026-03-28 | 对齐最新 HTML：Tab 面板顶部新增 H5TopBar；继承组件补充 H5TopBar/H5TabSheet | HTML |
| 2026-03-27 | 元信息补充 `integrated_html`；与最新集成页中表格 `.mobile-table-scroll`、共享 `_base` 断点/embed 说明对齐 | HTML |
| 2026-03-25 | Data Overview 三断点响应式：1920 左右布局 / 1024+768 上下布局 | Figma 设计稿 576-15843 / 579-25216 / 579-25979 |
| 2026-03-25 | 活动卡片按设计稿重构：banner 内绝对定位、tag 火焰+数字、底部 countdown | Figma 设计稿 579-27915 |
| 2026-03-25 | 替换图标资源：CEX_Copy/CEX_Edit/CEX_ForwardArrow/CEX_Calendar/CEX_hot_fill | Figma 设计稿 |
| 2026-03-25 | Commission Rate 高亮色改为 #0055FF | 用户反馈 |
| 2026-03-25 | 完整实现 Gate To Earn 页面：Hero + Commission Rate + Data Overview + Event History + Referral Activity | Figma 设计稿 579-27913 |
| 2026-03-25 | 初始创建 | 需求分析 |
