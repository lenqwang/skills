# Invite Friends 邀请好友 — 共享基础规范

> 所属域：[Exchange](../../domain.md) > Business > Invite Friends
> 本文件定义三个 Tab（Token Crew / Earn Voucher / Gate To Earn）的共享设计规范，与集成页 `output/invited-friends/token-crew.html` 一致（离线 handoff 包内同名预览文件与之对齐）。

---

## 区块 1: 元信息

```yaml
name: invited-friends
description: 邀请好友活动 — 包含赚币、助力领券、Gate To Earn 三大模块（单页三 Tab）
figma: https://www.figma.com/design/VMTfLK0ozaGCzynyMho3HT
coverage: Web
theme: dark
modules:
  - token-crew           # 赚币（支持节日皮肤）
  - earn-voucher         # 助力领券
  - gate-to-earn         # Gate To Earn（文档见 gate to earn.md）
integrated_html: /output/invited-friends/token-crew.html
html_output: /output/invited-friends/
```

---

## 区块 2: 业务画像

- **目标用户**：普通用户、推广员、KOL
- **核心场景**：邀请好友注册/交易获取奖励、社交裂变
- **页面类型**：活动主页（3 Tab）、邀请详情、奖励记录
- **适用标签**：`邀请` `Referral` `返佣` `社交裂变`

| 维度 | 本业务 | Exchange 默认 | 说明 |
|------|--------|--------------|------|
| 主题 | 暗色 | — | 深色背景 #070808 |
| 信息密度 | 中 | 高 | 卡片列表，突出奖励数字 |
| 视觉风格 | 营销 | 交易 | 强调利益点，引导分享 |
| Header/Footer | 黑色模式 | — | 与页面背景融合 |

---

## 区块 3: Token 覆盖

> 三个 Tab 共享的基础 Token。各模块特有覆盖见各自文件。

```css
:root {
  /* 品牌色 */
  --color-primary: #0055FF;
  --color-success: #2BC235;
  --color-warning: #FF9447;
  --color-error: #FF4D4F;
  
  /* 文字色阶 */
  --text-primary: #FFFFFF;
  --text-secondary: #A0A3A7;
  --text-tertiary: #84888C;
  --text-quaternary: #6B6B6B;
  
  /* 背景色阶 */
  --bg-page: #070808;
  --bg-secondary: #131516;
  --bg-card: #1C1E23;
  --bg-input: #1F2023;
  --border-color: #1F2023;
  --border-subtle: #1F2023;
  
  /* 字体 */
  --font-family: 'Switzer', -apple-system, BlinkMacSystemFont, sans-serif;
  
  /* 渐变描边 */
  --card-border-gradient: linear-gradient(180deg, #0055FF 0%, #303236 100%);
}
```

### 字阶规范（来自 Figma Web_V5）

| Token | 字号 | 字重 | 行高 | 用途 |
|-------|------|------|------|------|
| H1 | 48px | 600 Semibold | normal | 页面主标题（奖励金额） |
| H2 | 40px | 600 Semibold | 1.3 | 区块标题（My Rewards） |
| H3 | 20px | 600 Semibold | 1.3 | 单位文字（USDT） |
| S1 | 18px | 600 Semibold | 1.3 | 卡片标题 |
| B3 | 16px | 500 Medium | 1.3 | Tab 主标题（`.tab-title`） |
| B3b | 16px | 600 Semibold | 1.3 | 主行动按钮 `.invite-btn`、部分模块内按钮 |
| B4 | 16px | 500 Medium | 1.3 | 正文 |
| B7 | 14px | 500 Medium | 1.3 | 次要文字 |
| B12 | 12px | 500 Medium | 1.3 | Tab 副标题 |
| B13 | 12px | 400 Regular | 1.3 | 辅助文字 |
| BS2 | 14px | 400 Regular | normal | 描述文字 |

---

## 区块 4: 页面结构

### 整体布局（1920px 设计稿）

```
┌──────────────────────────────────────────────────────────────────┐
│  Header — 48px, #070808 黑色背景, 全局导航                         │
├──────────────────────────────────────────────────────────────────┤
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  Content Area — 1200px 居中, padding-top: 64px             │  │
│  │                                                            │  │
│  │  ┌──────────────────────────────────────────────────────┐  │  │
│  │  │  TabBar — 居中, 圆角胶囊                              │  │  │
│  │  │  [Token Crew] [Earn Voucher] [Gate To Earn]          │  │  │
│  │  └──────────────────────────────────────────────────────┘  │  │
│  │                         ↓ 90px                             │  │
│  │  ┌──────────────────────────────────────────────────────┐  │  │
│  │  │  Hero Section — 左文字 + 右视觉 (300px 高)            │  │  │
│  │  └──────────────────────────────────────────────────────┘  │  │
│  │                         ↓ 160px                            │  │
│  │  ┌──────────────────────────────────────────────────────┐  │  │
│  │  │  My Rewards — 奖励统计卡片 (2列)                      │  │  │
│  │  └──────────────────────────────────────────────────────┘  │  │
│  │                         ↓ 160px                            │  │
│  │  ┌──────────────────────────────────────────────────────┐  │  │
│  │  │  Reward Progress — 好友任务进度卡片 (2×2 网格)        │  │  │
│  │  └──────────────────────────────────────────────────────┘  │  │
│  │                         ↓ 160px                            │  │
│  │  ┌──────────────────────────────────────────────────────┐  │  │
│  │  │  Withdrawal Record — 提现记录表格                     │  │  │
│  │  └──────────────────────────────────────────────────────┘  │  │
│  │                         ↓ 160px                            │  │
│  │  ┌──────────────────────────────────────────────────────┐  │  │
│  │  │  Gameplay Introduction — 玩法介绍 (3列卡片)           │  │  │
│  │  └──────────────────────────────────────────────────────┘  │  │
│  │                         ↓ 160px                            │  │
│  │  ┌──────────────────────────────────────────────────────┐  │  │
│  │  │  Activity Rules — 活动规则                            │  │  │
│  │  └──────────────────────────────────────────────────────┘  │  │
│  │                         ↓ 100px                            │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                  │
├──────────────────────────────────────────────────────────────────┤
│  Footer — #070808 黑色背景, 多列链接, padding-top: 80px          │
└──────────────────────────────────────────────────────────────────┘
```

### 集成页 DOM 壳层（与 `token-crew.html` 一致）

| 区域 | 类名 / 说明 |
|------|-------------|
| 页面背景 | `.page-background` > `.bg-circle` + 大图（当前实现主要服务 Token Crew 视觉） |
| 顶栏 | `<header class="header">` — 48px / `#070808` |
| 主内容 | `<main class="main-content">` — `max-width: 1200px`、`margin: 0 auto`、`padding-top: 64px` |
| Tab 栏 | `.tab-bar` > `.tab-container` > `.tab-item`（`margin-bottom: 90px` 与首屏 Hero 的间距） |
| Tab 面板 | `#tab-content-token-crew` / `#tab-content-earn-voucher` / `#tab-content-gate-to-earn`，类名 `.tab-content` |
| H5 Tab 切换弹窗 | `#h5TabSheetOverlay.h5-tab-sheet-overlay`（`</main>` 之后、`<footer>` 之前） |
| 页脚 | `<footer class="footer">` |

**Tab 面板显隐（CSS）**

| 选择器 | 规则 |
|--------|------|
| `.tab-content` | `display: none` |
| `.tab-content.active` | `display: block` |

**Tab 切换（JS）**

- 每个 `.tab-item` 使用 `data-tab="token-crew" | "earn-voucher" | "gate-to-earn"`，并 `onclick="switchTab('...')"`。
- `switchTab(tabId)`：给匹配 `data-tab` 的 `.tab-item` 加 `active`，其余移除；给 `#tab-content-${tabId}` 加 `active`，其余 `.tab-content` 移除 `active`；切换后 **`setTimeout(..., 100)`** 再调用 `generateConcaveLensMap()` + `updateGlassEffect()`，重算 Liquid Glass 位移贴图（装饰币可见性变化后滤镜需刷新）。
- **H5 弹窗切换逻辑**（≤767px）：
  - `initTabSheet()` IIFE：监听 `.ev-h5-tab-nav-chevron` 和 `.ev-h5-tab-nav-title-wrap` 点击打开弹窗（给 `#h5TabSheetOverlay` 添加 `.open`）
  - 弹窗选项 `.h5-tab-sheet-item` 点击：调用 `switchTab(tabId)` → 同步所有 `.ev-h5-tab-nav-label` 文字为所选 Tab 名称 → 更新 `.h5-tab-sheet-item.active` 状态 → 关闭弹窗
  - 遮罩层点击 / `#h5TabSheetClose` 关闭按钮均可关闭弹窗（移除 `.open`）

### Web 布局规范

| 属性 | 值 |
|------|-----|
| 设计稿宽度 | 1920px |
| 内容区宽度 | 1200px |
| 内容区居中 | margin: 0 auto |
| 页面顶部间距 | 64px (padding-top) |
| 区块间距 | 160px |
| 卡片间距 | 24px |
| 卡片圆角 | 16px |
| 栅格基准 | 8px |

### 响应式断点

| 断点 | 内容区宽度 | 布局调整 |
|------|-----------|----------|
| ≥1920px | 1200px | 默认布局 |
| 1440px | 1200px (padding: 0 40px) | 保持居中 |
| 1280px | 1100px | 略微收窄，Hero gap: 24px |
| 1024px | max-width 976px（padding 0 24px） | `.header-nav` 隐藏；TC/EV 进度类卡片 **单列**；玩法区 gap/padding 收紧 |
| 768px | max-width 728px（padding 0 20px） | Hero 纵排、`.invite-btn` 全宽 max 468px、`.tab-container` 可 `flex-wrap`、`.tab-item` `min-width:200px`、EV 玩法 2×2 等（见 HTML） |
| ≤767px | 同上（跟随 768px 断点） | `.header` 和 `.tab-bar` 通过 CSS `display: none !important` 完全隐藏；`.main-content` 的 `padding-top` 改为 `0`；每个 Tab 面板顶部显示 **H5TopBar**（Status Bar + Tab Nav），通过底部弹窗 **H5TabSheet** 切换 Tab |
| ≤375px | 左右 padding 16px | Tab 胶囊 **纵向** `.tab-container{flex-direction:column}`、`.tab-item{width:100%}`、倒计时字略缩小 |

---

## 区块 5: 共享组件

> 三个 Tab 在同一 HTML 中共用的组件与样式类（实现以 `output/invited-friends/token-crew.html` 为准）。各 Tab 独有模块见 `token-crew.md` / `earn-voucher.md` / `gate to earn.md`。

### H5TopBar H5 顶栏（≤767px 专属）

> **三个 Tab 共用**：Token Crew / Earn Voucher / Gate To Earn 顶部均包含此组件；切换 Tab 后自动显示对应标签文字。≥768px 时 `display: none !important` 隐藏。

```
┌──────────────────────────────────────────────────┐
│  9:41          [动态刘海区]          📶 🔋        │  ← ev-h5-status-bar（22px 高，无背景）
├──────────────────────────────────────────────────┤
│  [Tab名称] ▾                              ✕      │  ← ev-h5-tab-nav（44px 高，无背景）
└──────────────────────────────────────────────────┘
```

**HTML 结构**

```html
<!-- H5 顶栏：Status Bar + TabsV5（仅 ≤767px 展示；≥768px 隐藏） -->
<div class="ev-h5-status-bar" aria-hidden="true">
  <div class="ev-h5-status-inner">
    <div class="ev-h5-time">9:41</div>
    <div class="ev-h5-dynamic-spacer"></div>   <!-- 刘海占位 124×10 -->
    <div class="ev-h5-status-icons">
      <img src="[signal]" width="19" height="12" alt="">
      <img src="[wifi]"   width="17" height="12" alt="">
      <img class="ev-h5-battery" src="[battery]" width="27" height="13" alt="">
    </div>
  </div>
</div>
<div class="ev-h5-tab-nav">
  <div class="ev-h5-tab-nav-inner">
    <div class="ev-h5-tab-nav-title-wrap">
      <span class="ev-h5-tab-nav-label">Token Crew</span>   <!-- 各 Tab 替换文字 -->
      <img class="ev-h5-tab-nav-chevron" src="[chevron]" width="16" height="16" alt="" aria-hidden="true">
    </div>
    <button type="button" class="ev-h5-tab-nav-close" aria-label="Close">
      <img src="[close]" width="18" height="18" alt="">
    </button>
  </div>
</div>
```

**各 Tab 标签文字**

| Tab | `.ev-h5-tab-nav-label` |
|-----|------------------------|
| Token Crew | `Token Crew` |
| Earn Voucher | `Earn Voucher` |
| Gate To Earn | `Gate To Earn` |

**样式规范**

| 元素 | 属性 | 值 |
|------|------|----|
| `.ev-h5-status-bar` | 背景 | **无（透明）** |
| `.ev-h5-status-bar` | `padding-top` | `21px` |
| `.ev-h5-status-inner` | 布局 | `flex; justify-content: space-between; min-height: 22px` |
| `.ev-h5-time` | 字体 | `17px / 600 / SF Pro Text; color: #fff` |
| `.ev-h5-dynamic-spacer` | 尺寸 | `124px × 10px`（刘海安全区占位） |
| `.ev-h5-tab-nav` | 背景 | **无（透明）** |
| `.ev-h5-tab-nav-inner` | 布局 | `flex; justify-content: space-between; min-height: 44px; padding: 6px 16px 0` |
| `.ev-h5-tab-nav-label` | 字体 | `16px / 400 / #fff` |
| `.ev-h5-tab-nav-chevron` | 尺寸 | `16×16px`（Figma MCP asset） |
| `.ev-h5-tab-nav-close` | 尺寸 | `18×18px`（Figma MCP asset）；按钮无边框、透明背景 |
| 全宽撑满 | `width` | `calc(100% + 2 × var(--rh-page-padding))`；负 margin 抵消父容器内边距 |

**显隐逻辑（CSS）**

```css
/* 默认隐藏 */
.ev-h5-status-bar, .ev-h5-tab-nav { display: none; }

/* 当前激活的 Tab 显示 */
.tab-content.active .ev-h5-status-bar,
.tab-content.active .ev-h5-tab-nav { display: block; }

/* ≥768px 强制隐藏 */
@media (min-width: 768px) {
  .tab-content .ev-h5-status-bar,
  .tab-content .ev-h5-tab-nav { display: none !important; }
}
```

---

### H5TabSheet H5 Tab 切换弹窗（≤767px 专属）

> Figma 666:11285。点击 H5TopBar 中的 `.ev-h5-tab-nav-chevron` 或 `.ev-h5-tab-nav-title-wrap` 打开，选择后切换 Tab 并关闭。≥768px 时 `display: none !important` 隐藏。

```
┌──────────────────────────────────────────────────┐
│                                          ✕  │  ← h5-tab-sheet-header（关闭按钮右对齐）
├──────────────────────────────────────────────────┤
│  ● Token Crew                             ✓  │  ← h5-tab-sheet-item.active
│    Invite friends and unlock up to 500 USDT...│
├──────────────────────────────────────────────────┤
│  ○ Earn Voucher                              │  ← h5-tab-sheet-item
│    Invite 2 friends, get 20 USDT...          │
├──────────────────────────────────────────────────┤
│  ○ Gate to Earn                              │  ← h5-tab-sheet-item
│    Earn up to 40% commission...              │
├──────────────────────────────────────────────────┤
│              ━━━━━━━━━━━━━━                   │  ← h5-tab-sheet-indicator（Home Indicator）
└──────────────────────────────────────────────────┘
```

**HTML 结构**

```html
<div class="h5-tab-sheet-overlay" id="h5TabSheetOverlay">
  <div class="h5-tab-sheet">
    <div class="h5-tab-sheet-header">
      <button type="button" class="h5-tab-sheet-close" id="h5TabSheetClose" aria-label="Close">
        <img src="[close-icon]" width="10.67" height="10.67" alt="">
      </button>
    </div>
    <div class="h5-tab-sheet-list">
      <div class="h5-tab-sheet-item active" data-sheet-tab="token-crew">
        <div class="h5-tab-sheet-text">
          <div class="h5-tab-sheet-title">Token Crew</div>
          <div class="h5-tab-sheet-desc">Invite friends and unlock up to 500 USDT in rewards</div>
        </div>
        <div class="h5-tab-sheet-check"><img src="[check]" width="16.67" height="16.67" alt=""></div>
      </div>
      <!-- Earn Voucher + Gate to Earn 选项结构同上 -->
    </div>
    <div class="h5-tab-sheet-indicator"></div>
  </div>
</div>
```

**样式规范**

| 元素 | 属性 | 值 |
|------|------|----|
| `.h5-tab-sheet-overlay` | 定位 | `position: fixed; inset: 0; z-index: 9999` |
| `.h5-tab-sheet-overlay` | 背景 | `rgba(0, 0, 0, 0.5)` |
| `.h5-tab-sheet-overlay` | 默认 | `display: none`；`.open` 时 `display: flex; align-items: flex-end` |
| `.h5-tab-sheet` | 背景 | `#131516` |
| `.h5-tab-sheet` | 圆角 | `12px 12px 0 0`（左上+右上） |
| `.h5-tab-sheet` | 宽度 | `100%; max-width: 375px` |
| `.h5-tab-sheet` | 动画 | `sheetSlideUp 0.25s ease-out`（`translateY(100%) → 0`） |
| `.h5-tab-sheet-header` | 布局 | `flex; justify-content: flex-end; padding: 12px 16px 8px` |
| `.h5-tab-sheet-close` | 样式 | 无边框透明背景；`img` 16×16px |
| `.h5-tab-sheet-list` | 列表间距 | `flex-direction: column; gap: 16px; padding-bottom: 8px` |
| `.h5-tab-sheet-item` | 布局 | `flex; gap: 12px; padding: 10px 16px` |
| `.h5-tab-sheet-item.active` | 背景 | `#1f2023` |
| `.h5-tab-sheet-title` | 字体 | `16px / 500 Medium / #fff` |
| `.h5-tab-sheet-desc` | 字体 | `12px / 400 Regular / #84888c` |
| `.h5-tab-sheet-check` | 尺寸 | `24×24px`；选中时内含蓝色圆形勾选 `20×20` icon |
| `.h5-tab-sheet-indicator` | Home Indicator | `134×5px; border-radius: 100px; background: #fff; margin: 0 auto 8px` |

**显隐逻辑（CSS）**

```css
/* ≥768px 强制隐藏 */
@media (min-width: 768px) {
  .h5-tab-sheet-overlay { display: none !important; }
}
```

**各选项文案**

| Tab | `.h5-tab-sheet-title` | `.h5-tab-sheet-desc` |
|-----|----------------------|---------------------|
| Token Crew | Token Crew | Invite friends and unlock up to 500 USDT in rewards |
| Earn Voucher | Earn Voucher | Invite 2 friends, get 20 USDT - they get 5 USDT each |
| Gate to Earn | Gate to Earn | Earn up to 40% commission on every trade |

---

### Header 导航栏（黑色模式）

| 属性 | 值 |
|------|-----|
| 高度 | 48px |
| 背景 | #070808 |
| 内边距 | 0 24px |
| Logo 图标尺寸 | 24px × 24px |
| Logo 文字尺寸 | 77px × 23px |
| 导航项间距 | 20px |
| 导航文字 | 14px / 700 Bold / #FFFFFF |
| 下拉箭头尺寸 | 16px × 16px |
| 右侧图标尺寸 | 18px × 18px |
| 右侧图标间距 | 16px |
| 分割线 | 2px × 16px / #3A3A3A |
| Sign Up 按钮 | 12px / 700 Bold / #070808 / bg: #FFFFFF / radius: 99px |

### InviteTabBar Tab 导航

```
┌─────────────────────────────────────────────────────────────────┐
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │  Token Crew     │  │  Earn Voucher   │  │  Gate To Earn   │  │
│  │  副标题...       │  │  副标题...       │  │  副标题...       │  │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

| 属性 | 值 |
|------|-----|
| 外层 | `.tab-bar`：`display:flex`、`justify-content:center`、`margin-bottom:90px`、`z-index:10` |
| 容器 | `.tab-container`：`display:flex`、`background: rgba(168,166,166,0.06)`、`border-radius:100px` |
| Tab 项 | `.tab-item`：宽 `228px`、`padding:12px 24px`、`border-radius:40px`、`cursor:pointer`、`transition:0.3s` |
| 选中态 | `.tab-item.active`：背景 `#FFFFFF`、`box-shadow: 0px 4px 4px rgba(0,0,0,0.25)` |
| 主标题 `.tab-title` | `16px` / `500` / `line-height:1.3`；默认色 `var(--text-primary)`，选中时 `#070808` |
| 副标题 `.tab-subtitle` | `12px`；未选中 `400` + `var(--text-tertiary)`、`margin-top:2px`；选中 `500` + `var(--text-secondary)`、`opacity:0.8` |

**文案示例（与当前 `token-crew.html` 一致，可随活动替换）**

| Tab | `.tab-title` | `.tab-subtitle` |
|-----|--------------|-----------------|
| Token Crew | Token Crew | Invite friends to win $300,000 |
| Earn Voucher | Earn Voucher | Get $20, friend gets $8 |
| Gate To Earn | Gate To Earn | Unlock up to $500 reward |

---

### InviteButton 主邀请按钮（`.invite-btn`）

| 属性 | 值 |
|------|-----|
| 默认尺寸 | `228px × 48px`（部分 Tab 用内联覆盖宽高，如 Earn Voucher `252×56`、Gate To Earn `228×56`） |
| 背景 | `var(--color-primary)` `#0055FF` |
| 圆角 | `999px` |
| 文字 | `16px` / `600` / `#FFFFFF` |
| 交互 | `hover`：`opacity:0.9` |

---

### Countdown 倒计时（`.countdown`，Token Crew Hero）

| 属性 | 值 |
|------|-----|
| 容器 `.countdown` | `display:flex`、`align-items:center`、`gap:8px` |
| 数字块 `.countdown-block` | 背景 `var(--bg-card)`、`border-radius:6px`、`padding:6px 8px`、`backdrop-filter: blur(9.255px)`、`box-shadow: 13px 13.663px 250px rgba(100,73,1,0.43)` |
| 数字 `.countdown-value` | `18px` / `500` / `line-height:1.3` |
| 分隔符 `.countdown-separator` | `16px` / `600` |
| 与标题间距 | `.hero-countdown-wrap`：`margin-top:20px`（位于 `.hero-text` 内） |

> Gate To Earn 等活动卡片内若使用小号倒计时，见 `gate to earn.md`（如 `.gte-countdown-mini`），样式在 HTML 内单独定义。

---

### DateRangePicker 日期条（`.gte-date-picker`，三 Tab 共用类）

用于 Data Overview / 活动列表等需要时间区间的模块。

| 属性 | 值 |
|------|-----|
| 尺寸 | `258px × 40px` |
| 背景 | `#131516` |
| 圆角 | `6px` |
| 内边距 | `0 16px` |
| 布局 | `display:flex`、`align-items:center`、`justify-content:space-between` |
| 中间日期文案 | `span`：宽 `85px`、`text-align:center`；容器字体 `14px` / `500`、颜色 `#84888C` |
| 两侧图标 | `img`：`16×16`、`flex-shrink:0`（设计稿：前进箭头 + 日历） |

---

### FormSelect 筛选下拉（`.ev-select`，Event History 等）

| 属性 | 值 |
|------|-----|
| 尺寸 | `320px × 40px` |
| 背景 | `#1F2023`、无边框 |
| 圆角 | `8px` |
| 内边距 | `0 12px` |
| 文字 | `14px` / `500`、颜色 `#A0A3A7` |
| 箭头 | `appearance:none`，右侧 `12px` 居中 SVG 背景 |
| 焦点 | `outline:none` |

---

### InlineTextTabs 文案 Tab（`.ev-tab`，Earn Voucher Event History）

与顶部胶囊 Tab 不同，用于区块内二级切换。

| 属性 | 值 |
|------|-----|
| 容器 `.ev-tabs` | `display:flex`、`gap:24px`、`margin-bottom:24px`、`justify-content:flex-start` |
| 项 `.ev-tab` | `padding:16px 0`、`font-size:24px` / `600`、默认色 `var(--text-tertiary)`、`cursor:pointer` |
| 选中 `.ev-tab.active` | 字色 `#FFFFFF`、`position:relative` |
| 选中指示 | `::after`：`width:16px`、`height:3px`、背景 `#FFFFFF`、`border-radius:1px`、水平居中于文字（`left:50%` + `translateX(-50%)`）、贴底 |

---

### StatusTag 状态标签（`.status-tag`）

| 状态 | 类名 | 样式 |
|------|------|------|
| 完成 | `.status-tag.completed` | 背景 `rgba(43,194,53,0.1)`、文字 `#2BC235` |
| 待处理 | `.status-tag.pending` | 背景 `rgba(255,148,71,0.1)`、文字 `#FF9447` |
| 公共 | — | `padding:4px 12px`、`border-radius:4px`、`font-size:14px` |

---

### RewardStatsCard 奖励统计卡片

| 属性 | 值 |
|------|-----|
| 容器布局 | flex, gap: 24px |
| 卡片背景 | #131516 (--bg-secondary) |
| 卡片圆角 | 16px |
| 卡片内边距 | 24px 32px |
| 图标尺寸 | 86px × 86px |
| 图标与文字间距 | 18px |
| 标签文字 | 16px / 500 Medium / #A0A3A7 |
| 数值文字 | 40px / 600 Semibold / #FFFFFF |
| 单位文字 | 20px / 600 Semibold / #FFFFFF |
| 数值与单位间距 | 6px |

---

### SectionTitle 区块标题

| 属性 | 值 |
|------|-----|
| 标题 | 40px / 600 Semibold / #FFFFFF |
| 描述 | 14px / 400 Regular / #84888C / line-height: normal |
| 标题与描述间距 | 6px |
| 标题区宽度 | 608px |
| 底部边距 | 20px (padding-bottom) |
| 区块底部间距 | 24px (margin-bottom) |
| 箭头图标 | 32px × 32px |

---

### RewardProgressCard 奖励进度卡片

| 属性 | 值 |
|------|-----|
| 卡片布局 | 2×2 网格, gap: 24px |
| 卡片圆角 | 16px |
| 卡片边框 | 渐变描边 (CSS mask 技术) |
| 边框渐变 | linear-gradient(180deg, #0055FF 0%, #303236 100%) |
| 头部内边距 | 40px 32px |
| 头像尺寸 | 40px × 40px |
| 头像圆角 | 30px |
| UID 文字 | 20px / 500 Medium / #FFFFFF |
| Claim 按钮 `.claim-btn` | `min-width:79px`、`height:40px`、`padding:9.5px 18px`、圆角 `99px`、`font-size:16px` / `600`；默认 `bg:#1D1F20`、`color:#484B51`、`cursor:not-allowed` |
| Claim 可领取 `.claim-btn.active`、`.claim-btn.completed` | `bg:#005EFF`、`color:#FFFFFF`、`cursor:pointer` |
| 内容区内边距 | 0 32px 32px |
| 步骤指示器尺寸 | 24px × 24px |
| 步骤指示器-进行中 | 蓝色圆圈带锁图标 (图片) |
| 步骤指示器-待完成 | 灰色圆圈带锁图标 (图片) |
| 步骤指示器-已完成 | 灰色圆圈带勾图标 (图片) |
| 步骤连接线 | 虚线图片, flex: 1, max-width: 120px |
| 奖励金额 | 14px / 500 Medium / #FFFFFF |
| 任务名称 | 14px / 500 Medium / #84888C |
| 步骤信息宽度 | 120px, text-align: center |
| 步骤指示器行内边距 | 0 60px |
| 步骤信息行内边距 | 0 20px |

#### 渐变描边 CSS 实现

```css
.progress-card {
  border-radius: 16px;
  position: relative;
  background: var(--bg-page);
}

.progress-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 16px;
  padding: 1px;
  background: linear-gradient(180deg, #0055FF 0%, #303236 100%);
  -webkit-mask: 
    linear-gradient(#fff 0 0) content-box, 
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}
```

---

### WithdrawalTable 提现记录表格

| 属性 | 值 |
|------|-----|
| 表头文字 | 14px / 400 Regular / #84888C |
| 表头内边距 | 10px 0 |
| 表头边框 | 1px solid #1F2023 |
| 最后一列对齐 | text-align: right |
| 行内边距 | 28px 0 |
| 行文字 `td` | 16px / 500 Medium / #FFFFFF |
| 行边框 | 1px solid #1F2023 |
| 分页器位置 | 居中, margin-top: 24px |

**窄屏横向滚动（与最新 HTML 一致）**

- 表格外层增加 `<div class="mobile-table-scroll">`，`overflow-x: auto`；内层 `.withdrawal-table` 设 `min-width: 560px`，避免列被压扁。
- **≤375px** 时与内容区 `--rh-page-padding`（默认 20px）对齐：滚动容器使用负边距 + 同值 padding，使表格边缘与页面内容边距一致。

---

### 断点预览（开发用，`?embed=1`）

集成页支持在 iframe 内加 **`?embed=1`** 预览响应式：根节点可加 `html.bp-embed`，viewport 按 `device-width` 触发与各断点一致的 `@media`。用于设计走查，**非线上业务逻辑**。

---

### GameplayCard 玩法介绍卡片

| 属性 | 值 |
|------|-----|
| 卡片布局 | flex, gap: 24px |
| 卡片边框 | 1px solid #1F2023 |
| 卡片圆角 | 16px |
| 卡片内边距 | 42px 40px |
| 图标容器 | 68px × 68px |
| 图标尺寸 | 56px × 56px (图片) |
| 图标与文字间距 | 16px |
| 标题 | 18px / 600 Semibold / #FFFFFF |
| 描述 | 16px / 500 Medium / #84888C |

---

### Pagination 分页器

| 属性 | 值 |
|------|-----|
| 布局 | flex, justify-content: center, gap: 8px |
| 圆点尺寸 | 28px × 28px |
| 圆点圆角 | 50% |
| 默认背景 | transparent |
| 默认文字 | 12px / #84888C |
| 激活背景 | #303236 |
| 激活文字 | 12px / #FFFFFF |

---

### Footer 页脚（黑色模式）

| 属性 | 值 |
|------|-----|
| 背景 | #070808 |
| 顶部内边距 | 80px |
| 内容区宽度 | 1200px |
| 列间距 | 24px |
| 标题文字 | 20px / 600 Semibold / #FFFFFF |
| 链接文字 | 14px / 500 Medium / #84888C |
| 链接悬停 | color: #FFFFFF |
| 社交图标 | 24px × 24px / opacity: 0.6 |
| 社交图标悬停 | opacity: 1 |
| 底部边框 | 1px solid #1F2023 |
| 版权文字 | 14px / 500 Medium / #84888C |

---

## 区块 6: 适用性 & 差异

### 适用场景

- 邀请好友活动主页
- Token Crew / Earn Voucher / Gate To Earn 三个 Tab（集成页一份 HTML）
- 邀请记录、奖励明细

### 不适用场景

- Booster 推广计划（建议用 [booster.md](../booster.md)）
- 福利中心（建议用 [rewards-hub.md](../rewards-hub.md)）
- 交易页面（建议用 Exchange 基础规范）

### 模块加载说明

```bash
# 生成默认 Token Crew
→ _base.md + token-crew.md

# 生成 Token Crew 春节皮肤
→ _base.md + token-crew.md + skins/spring-festival.md

# 生成 Earn Voucher
→ _base.md + earn-voucher.md

# 生成 Gate To Earn
→ _base.md + gate to earn.md
```

---

## 变更日志

| 日期 | 变更 | 来源 |
|------|------|------|
| 2026-03-29 | H5TabSheet `.h5-tab-sheet-list` 新增 `gap: 16px`（匹配 Figma 666:11132 列表间距） | HTML 对齐 |
| 2026-03-28 | 对齐最新 HTML：≤767px 隐藏 header/tab-bar 改为全局（三 Tab 统一）；新增 H5TabSheet 底部弹窗组件（Figma 666:11285）；更新 Tab 切换 JS 逻辑含弹窗交互；页面框架补充 H5 模式说明 | HTML |
| 2026-03-28 | 新增 H5TopBar 共享组件规范（三 Tab 通用）：移除背景色、泛化选择器、显隐逻辑；Token Crew / Gate To Earn 顶部同步补充该组件 | HTML |
| 2026-03-27 | 对齐最新 `token-crew.html`：Tab 副标题示例文案、`switchTab` 后 100ms 重算 Liquid Glass、提现/表格 `.mobile-table-scroll`、断点预览 `embed=1` 说明 | HTML |
| 2026-03-26 | 对齐 `token-crew.html`：集成页壳层与 Tab 切换、DatePicker / FormSelect / 文案 Tab / 状态标签、倒计时与按钮字重；模块名改为 Gate To Earn | HTML |
| 2026-03-23 | 更新渐变描边为统一颜色 #0055FF → #303236、分页器激活背景改为 #303236 | HTML 实现同步 |
| 2026-03-23 | 更新 Header/Footer 黑色模式规范、添加渐变描边 CSS 实现、更新响应式断点 | HTML 实现同步 |
| 2026-03-23 | 根据 Figma 设计稿更新完整规范 | Figma 设计稿 |
| 2026-03-23 | 初始创建，定义共享基础规范 | 需求分析 |
