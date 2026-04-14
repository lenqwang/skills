# Gate Booster 推广计划

> 所属域：[Exchange](../domain.md) > Business > Booster

---

## 区块 1: 元信息

```yaml
name: booster
description: Gate Booster 推广计划 — KOL 社交媒体任务管理
figma: https://www.figma.com/design/qfajQWQ2uszBiwi0v4bBFb/Booster-%E6%8E%A8%E5%B9%BF%E8%AE%A1%E5%88%92?node-id=2710-122488
coverage: H5+Web
theme: both
```

---

## 区块 2: 业务画像

- **目标用户**：KOL、推广员、社交媒体创作者
- **核心场景**：推广任务管理（发帖/邀请/审核）、奖励发放追踪
- **页面类型**：任务列表、任务详情、奖励记录、社交账号管理
- **适用标签**：`推广` `KOL` `社交任务` `Referral`

| 维度 | 本业务 | Exchange 默认 | 说明 |
|------|--------|--------------|------|
| 主题 | 亮色为主 | — | 非暗色交易风格 |
| 信息密度 | 中 | 高 | 卡片列表，非密集表格 |
| 视觉风格 | 工具 | 交易 | 管理后台风格 |

---

## 区块 3: Token 覆盖

与 Exchange 基础的差异。完整变量表直接复制到 `<style>` 顶部：

```css
:root {
  --color-primary: #0055FF;
  --color-success: #2BC235;
  --color-warning: #FF9447;
  --color-error: #FF4D4F;
  --color-accent: #A7F757;       /* Booster 装饰绿，Exchange 默认无 */

  --text-primary: #070808;
  --text-secondary: #303236;
  --text-tertiary: #84888C;
  --text-quaternary: #A0A3A7;
  --text-light: #C4C7CA;

  --bg-white: #FFFFFF;
  --bg-gray: #F5F6F7;
  --bg-light: #F2F3F4;
  --bg-avatar: #333333;
  --border-color: #DFE0E2;

  --badge-issued-bg: #E8F5E9;
  --badge-issued-text: #2BC235;
  --badge-pending-bg: #FFF4E3;
  --badge-pending-text: #FF9447;
  --alert-bg: #FFF5EB;           /* Booster 独有 */

  --font-family: 'Switzer', 'Gate_Switzer', -apple-system, sans-serif;
}

[data-theme="dark"] {
  --text-primary: #FFFFFF;
  --text-secondary: #E0E0E0;
  --text-tertiary: #A0A0A0;
  --bg-white: #1A1A1A;
  --bg-gray: #242424;
  --bg-light: #2E2E2E;
  --border-color: #3A3A3A;
  --alert-bg: #2A2218;
  --badge-issued-bg: #1A2E1A;
  --badge-pending-bg: #2A2218;
}
```

### 字阶覆盖

| Token | 字号 | 字重 | 用途 |
|-------|------|------|------|
| H1 | 20px | 600 | 页面主标题 |
| H2 | 18px | 600 | 导航标题 |
| H3 | 16px | 600 / lh 1.3 | 卡片标题 |
| Body | 14px | 400 / lh 1.5 | 正文 |
| Caption | 12px | 400 | 辅助文字 |
| Label | 12px | 500 / lh 1.3 | 标签 |
| Large Number | 18px | 600 / lh 1.3 | 统计数字 |

---

## 区块 4: 页面结构

### H5 布局（375px）

```
┌──────────────────────────────────────┐
│  Status Bar — 44px, bg:white         │
├──────────────────────────────────────┤
│  NavBar — 44px, ← + 居中标题          │
├──────────────────────────────────────┤
│  AlertBanner — bg:#FFF5EB, 全宽       │
├──────────────────────────────────────┤
│  Content Area — px:20px              │
│                                      │
│  [TaskCard] × N — gap:16px           │
│  ┌────────────────────────────────┐  │
│  │ [GTTag] Post Task              │  │
│  │ Gate x Uni Anniversary        │  │
│  │ Post to earn 10 USDT          │  │
│  └────────────────────────────────┘  │
│                                      │
│  [StatsCard] — 奖励统计              │
│  [ReferralDetails] — 邀请详情         │
│  [SocialIcons] — 社交平台绑定         │
│                                      │
├──────────────────────────────────────┤
│  FooterButton — 44px, 全宽主按钮      │
├──────────────────────────────────────┤
│  Home Indicator — 34px               │
└──────────────────────────────────────┘

内容区宽度: 335px (375 − 20×2)
卡片间距: 16px
栅格基准: 8px
```

### 组件引用

| 区域 | 组件 | 来源 |
|------|------|------|
| 倒计时 | CountdownTimer H5 | [共享](../components/countdown-timer.md) |
| 主按钮 | GradientCTA H5 (36px 实色变体) | [共享](../components/gradient-cta.md) |
| 状态徽章 | StatusBadge | [共享](../components/status-badge.md) |
| 任务标签 | GTTag | 业务专属（见区块 5） |
| 任务卡片 | BoosterTaskCard | 业务专属（见区块 5） |
| 提示横幅 | AlertBanner | 业务专属（见区块 5） |
| 社交图标 | SocialIcons | 业务专属（见区块 5） |
| 奖励统计 | BoosterStatsCard | 业务专属（见区块 5） |
| 输入/选择/上传 | Input / Select / Upload | [_platform](../../_platform/components/) |
| 弹窗 | Modal / BottomSheet | [_platform](../../_platform/components/modal.md) |
| 导航 | Tabs / NavBar | [_platform](../../_platform/components/tabs.md) |

---

## 区块 5: 业务专属组件

### GTTag 任务标签

```
┌──────────────┐
│  Post Task   │
└──────────────┘
```

| 属性 | 值 |
|------|-----|
| 背景 | `#F5F6F7` |
| 文字 | 12px / 500 Medium / `#84888C` |
| 圆角 | 2px |
| 高度 | 20px |
| 内边距 | 0 4px |

**标签文案**：Post Task / Invite Task / Follow Task / Trade Task

---

### BoosterTaskCard 任务卡片

```
┌────────────────────────────────────┐
│  [GTTag]                           │
│  Gate x Uni Anniversary            │  ← 16px/600 #070808
│  Post to earn 10 USDT             │  ← 12px/400 #84888C
└────────────────────────────────────┘
```

| 属性 | 值 |
|------|-----|
| 背景 | `#FFFFFF` |
| 边框 | 0.5px solid `#DFE0E2` |
| 圆角 | 8px |
| 内边距 | 12px |
| 卡片间距 | 16px |
| 标题 | 16px / 600 Semibold / `#070808` |
| 描述 | 12px / 400 Regular / `#84888C` |

---

### AlertBanner 提示横幅

```
┌─────────────────────────────────────┐
│  ⚠️  提示文案...                     │
└─────────────────────────────────────┘
```

| 属性 | 值 |
|------|-----|
| 背景 | `#FFF5EB` (--alert-bg) |
| 文字 | 12px / 400 Regular / lh 1.5 |
| 图标色 | `#FF9447` |
| 宽度 | 全宽 |

---

### SocialIcons 社交图标

| 属性 | 标准 | 小 |
|------|------|-----|
| 尺寸 | 36×36px | 28×28px |
| 背景 | `#F2F3F4` | `#F2F3F4` |
| 圆角 | 50% | 50% |
| 图标占比 | 60% | 60% |
| 间距 | 12px | 12px |

**平台**：X / YouTube / Instagram / TikTok / Facebook / Telegram / Others

---

### BoosterStatsCard 统计卡片

```
┌────────────────────────────────────┐
│  268              3                │
│  Total Earned     Pending          │
└────────────────────────────────────┘
```

| 属性 | 值 |
|------|-----|
| 背景 | `#FAFAFA` |
| 圆角 | 8px |
| 内边距 | 16px |
| 数值 | 18px / 600 Semibold / `#070808` |
| 标签 | 12px / 400 Regular / `#A0A3A7` |

---

### ReferralDetails 邀请详情

| 属性 | 值 |
|------|-----|
| 标签色 | `#84888C` |
| 数值 | Semibold / `#070808` |
| 链接 | `#0055FF` |

---

### ReviewRules 审核规则

| 属性 | 值 |
|------|-----|
| 序号 | 14px / 500 Medium / `#A0A3A7` |
| 内容 | 14px / 400 Regular / `#84888C` / lh 1.5 |

---

### FooterButton 底部按钮

| 属性 | 值 |
|------|-----|
| 高度 | 44px |
| 宽度 | 100% |
| 背景 | `#0055FF` |
| 圆角 | 999px |
| 文字 | 16px / 600 Semibold / `#FFFFFF` |

---

## 区块 6: 适用性 & H5/Web 差异

### 适用场景

- Booster 推广任务列表 / 详情页
- KOL 社交媒体任务管理
- 推广奖励记录与追踪
- 社交账号绑定管理

### 不适用场景

- 福利中心（建议用 [rewards-hub.md](rewards-hub.md)）
- 交易页面（建议用 Exchange 基础规范）
- 活动营销页（建议用 [campaign](../../campaign/) 域）

### H5 布局速查

| 属性 | 值 |
|------|-----|
| 设计稿宽度 | 375px |
| 内容区宽度 | 335px |
| 页面边距 | 20px |
| 状态栏 | 44px |
| 导航栏 | 44px |
| 底部指示器 | 34px |
| 卡片间距 | 16px |
| 卡片圆角 | 8px |
| 卡片内边距 | 12px |
| 按钮高度 | 36px (内部) / 44px (底部) |
| 栅格基准 | 8px |

### 响应式断点

| 断点 | 导航 | 卡片列数 |
|------|------|---------|
| ≤ 768px | 汉堡菜单 | 1 列 |
| 1024px | 6 项导航 | 2 列 |
| ≥ 1920px | 完整导航 | 3 列 |
