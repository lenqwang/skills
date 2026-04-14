# Web3/Pay 布局扩展

> 基于 platform/layout.md 的 Web3/Pay 特有布局扩展。

---

## 继承

```
extends: ../_platform/layout.md
```

## Wallet 布局详细规格

### Web 端

```
+------------------------------------------------------------------+
|  Header                                                          |
+--------+---------------------------------------------------------+
|        |  Total Assets                                           |
| Side   |  +------+------+------+------+------+                   |
| bar    |  | 充值  | 提现  | 转账  | 兑换  | 更多 |                   |
| 200px  |  +------+------+------+------+------+                   |
|        +---------------------------------------------------------+
|        |  Account Cards (横向滚动)                                |
| Web3   |  +--------+ +--------+ +--------+ +--------+           |
| Wallet |  | 现货    | | 合约    | | 理财    | | Web3   |           |
| DApp   |  | $xxx   | | $xxx   | | $xxx   | | $xxx   |           |
|        |  +--------+ +--------+ +--------+ +--------+           |
|        +---------------------------------------------------------+
|        |  Asset Detail Table                                     |
|        |  (CoinTitle + 余额 + 冻结 + 估值 + 操作)                 |
+--------+---------------------------------------------------------+
```


## Swap / DEX 布局

### Web 端

```
+------------------------------------------------------------------+
|  Header                                                          |
+------------------------------------------------------------------+
|               +------------------+                                |
|               |  Swap Card       |                                |
|  背景         |  From: [ETH ▼]  |    背景                        |
|  渐变         |  [0.5]          |    渐变                        |
|               |     ↕ 交换       |                                |
|               |  To: [USDT ▼]   |                                |
|               |  [≈ 1,250]      |                                |
|               |                  |                                |
|               |  [Swap 兑换]     |                                |
|               +------------------+                                |
|                                                                   |
|  Recent Transactions                                             |
+------------------------------------------------------------------+

Swap 卡片: max-width 480px, 居中
SelectToken → 点击币种触发
```


## 布局 Token 扩展

| Token | 值 | 说明 |
|-------|-----|------|
| `--swap-card-max-width` | 480px | Swap 卡片最大宽度 |
| `--swap-card-padding` | 24px | Swap 卡片内边距 |
| `--wallet-action-bar-height` | 64px | 钱包操作栏高度 |
| `--dapp-bottom-bar-height` | 56px | DApp 底部栏高度 |

---

## Pay-B 商户后台布局

> 来源: Figma [Pay-B端-商家后台](https://www.figma.com/design/tlFIl7F7A7Zl6e9WRLMDZo/)
> 参考实现: `pay-b-full-demo.html`（Figma 校准后的正确结构）
> 桌面端优先的 B 端产品，不要求移动端完整适配。

### 整体架构

```
┌──────────────────────────────────────────────────────────────┐
│ Sidebar (320px fixed, top:0, 通栏满高 100vh)                  │
│ ┌─ 商户信息卡片（border 圆角容器 40px 头像）──────────┐       │
│ │                                                     │       │ Header (72px, left: 320px, right: 0)
│ ├─ 主菜单（56px 行高, 内嵌 div 8px 圆角）────────────┤       │ ┌────────────────────────────────────┐
│ │ 🏠 首页                                            │       │ │     右侧: 客服 帮助 语言 设置 │ 头像 │
│ │ 🔄 交易  ▼                                         │       │ └────────────────────────────────────┘
│ │ 💰 余额                                            │       │
│ │ 👥 客户                                            │       │ Main Content (margin-left: 320px, margin-top: 72px)
│ ├─ 产品（分组标签 14px/500 #A0A3A7）─────────────────┤       │ ┌────────────────────────────────────┐
│ │ 🎁 礼品卡                                          │       │ │ 面包屑                              │
│ │ 💳 支付  ▼                                         │       │ │ 页面标题(32px/600) + 操作按钮        │
│ │ 📤 下发                                            │       │ │ Stat Cards / Filter / Table          │
│ └─────────────────────────────────────────────────────┘       │ └────────────────────────────────────┘
└──────────────────────────────────────────────────────────────┘
```

### 关键布局规格

| 维度 | 值 | CSS 变量 | 说明 |
|------|-----|---------|------|
| Sidebar 宽度 | **320px** | `--sidebar-width` | 通栏满高 `height:100vh` |
| Sidebar 定位 | `position:fixed; top:0; left:0` | — | 始终可见，不受 Header 影响 |
| Sidebar 背景 | **`#FFFFFF`** 白色 | — | 右侧边框 `1px solid #DFE0E2` 区分 |
| Sidebar 内边距 | `padding: 24px 0` | — | 上下 24px，菜单项自带水平 padding |
| Header 定位 | `position:fixed; top:0; left:320px; right:0` | — | 在 Sidebar 右侧 |
| Header 高度 | **72px** | `--header-height` | `border-bottom: 1px solid #ECEDEF` |
| Header 内容 | 仅右侧工具栏 | — | 左侧为空（Logo 在 Sidebar 里） |
| Main 定位 | `margin-left:320px; margin-top:72px` | — | 避开 Sidebar 和 Header |
| Main 内边距 | **`padding: 48px`** | `--space-page` | 上下左右统一 48px |
| Main 最小高度 | `calc(100vh - 72px)` | — | 充满视口 |
| Main 背景 | `#FFFFFF` | `--bg` | — |

> **Sidebar 完整规格** 见 [pay-b-sidebar.md](./components/pay-b-sidebar.md)
> **Header 完整规格** 见 [pay-b-header.md](./components/pay-b-header.md)

### 页面布局间距

> 全局页面布局 Spacing 规范，后续所有 Pay B 端页面统一遵循。

| 变量 | 值 | 适用场景 |
|------|-----|---------|
| `--space-page` | **48px** | Main 内容区 padding（上下左右统一） |
| `--space-section` | **48px** | 上下两个模块之间的间距 |
| `--space-title-to-content` | **40px** | 标题（H1/H2）→ 下方首个内容 |
| `--space-card-to-content` | **48px** | 统计卡片区 → Filter 或下方内容 |
| `--space-filter-to-content` | **32px** | Filter/Button 行 → 下方表格/模块 |
| `--space-card-inner` | **32px** | 统计卡片内边距（上下左右统一） |
| `--space-card-gap` | **20px** | 卡片网格 gap |
| `--space-filter-gap` | **12px** | 筛选项之间的间距 |

### 页面垂直节奏

```
┌─────────────────────────────────────────────────┐
│                    48px (padding-top)            │
│  ┌─────────────────────────────────────────────┐ │
│  │  H1 页面标题 (36px/600)                      │ │
│  └─────────────────────────────────────────────┘ │
│                    40px (title → card/filter/tab)  │
│  ┌──────┐  20px  ┌──────┐  20px  ┌──────┐       │
│  │ Card │        │ Card │        │ Card │       │
│  └──────┘        └──────┘        └──────┘       │
│                    48px (card → filter/content)   │
│  ┌─────────────────────────────────────────────┐ │
│  │  Filter Pill  |  Filter  |    Button  Edit  │ │
│  └─────────────────────────────────────────────┘ │
│                    32px (filter → table)          │
│  ┌─────────────────────────────────────────────┐ │
│  │  Table / List / 其他内容模块                   │ │
│  └─────────────────────────────────────────────┘ │
│                    48px (padding-bottom)          │
└─────────────────────────────────────────────────┘
 ←  48px  →                              ←  48px  →
```

### 间距规则总结

1. **Main padding 48px** — 上下左右统一，所有页面不得修改
2. **模块间距 48px** — 两个独立模块（卡片组/图表/表格等）之间
3. **标题到首个内容 40px** — H1/H2 标题到紧接的卡片/Filter/Tab 等
4. **Filter 到内容 32px** — Filter/Button 操作行到下方表格/列表
5. **卡片内边距 32px** — stat-card 内部 padding 上下左右统一
6. **卡片间 gap 20px** — 网格卡片之间的间距
7. **筛选项间距 12px** — filter-pill 之间的 gap

### CSS 实现参考

```css
:root {
  --sidebar-width: 320px;
  --header-height: 72px;
  --space-page: 48px;
  --space-section: 48px;
  --space-title-to-content: 40px;
  --space-card-to-content: 48px;
  --space-filter-to-content: 32px;
  --space-card-inner: 32px;
  --space-card-gap: 20px;
  --space-filter-gap: 12px;
}

.sidebar { position: fixed; top: 0; left: 0; width: var(--sidebar-width); height: 100vh; z-index: 90; }
.header { position: fixed; top: 0; left: var(--sidebar-width); right: 0; height: var(--header-height); z-index: 80; }
.main { margin-left: var(--sidebar-width); margin-top: var(--header-height); padding: var(--space-page); min-height: calc(100vh - var(--header-height)); }

.page-title { margin-bottom: var(--space-title-to-content); }
.stat-cards { margin-bottom: var(--space-card-to-content); gap: var(--space-card-gap); }
.filter-bar { margin-bottom: var(--space-filter-to-content); }
.tab-underline, .chart-placeholder, .balance-overview, .security-cards {
  margin-bottom: var(--space-section);
}
```

### 页面模板：Balance 余额页

```
┌──────────────────────────────────────────────────────────┐
│ Balance 👁           ← 32px/600 标题 + 眼睛图标          │
│ 4,200 USD            ← 64px/700 总余额（后台最大字体）     │
│                                                          │
│ [Deposit▼] [Withdraw▼] [Swap] [Transfer] [Earn]         │
│                                                          │
│ ┌── Earn Banner ──────────────────────────────────────┐  │
│ │ 🕐 Earn up to 3% APR on your Crypto  [Start Earning]│  │
│ └─────────────────────────────────────────────────────┘  │
│                                                          │
│ Currency   Fund flow     ← Tab 切换                       │
│ ────                                                     │
│ ┌─ USDT ─┐  ┌─ BTC ──┐  ┌─ ETH ──┐                     │
│ │ ₮ USDT │  │ ₿ BTC  │  │ Ξ ETH  │                     │
│ │ 3.168  │  │ 0.00001│  │ 0.042  │                     │
│ └────────┘  └────────┘  └────────┘                      │
└──────────────────────────────────────────────────────────┘
```

| 组件 | 规格 |
|------|------|
| 标题 | "Balance" 32px/600 + 眼睛图标 20px |
| 总余额数值 | **64px / 700** `#070808`，后台最大字体 |
| 操作按钮 | Secondary 样式，40px 高，`border:1px solid #DFE0E2`，99px 圆角 |
| Tab | Currency / Fund flow，标准下划线 Tab |
| 币种卡片 | 3 列网格，`border:1px solid #ECEDEF`，12px 圆角，padding 20px |
| 余额数值 | **32px / 600** `#070808` tabular-nums |

### 页面模板：设置中心

> Figma `3068:79709` · Header 齿轮按钮触发

```
设置中心
├── 个人设置
│   └── [个人详情] ← 卡片: 图标 + 标题 + 描述
├── 账户设置
│   ├── [商家]
│   └── [团队成员]
└── 产品设置
    └── [付款]
```

| 属性 | 值 |
|------|-----|
| 页面标题 | "设置中心" 32px/600 |
| 分组标题 | 18px / 600 / `#070808`，margin-bottom 16px |
| 分组间距 | 64px |
| 卡片网格 | `grid-template-columns: repeat(3,1fr)`，gap 24px |
| 卡片高度 | 100px |
| 卡片边框 | `1px solid #ECEDEF`，border-radius 12px |
| 图标容器 | 48×48px，border-radius 8px，background `#F5F6F7` |
| 自适应 | ≥1440: 3列 / 1024–1439: 2列 / ≤1279: 1列 |

---

### 栅格系统

#### 断点与栅格参数

| 断点 | 内容区宽度 | 列宽 | 列数 | Gutter | 外边距（单侧） |
|------|-----------|------|------|--------|--------------|
| ＞ 1920px | 1440px | 98px | 12 | 24px | 560px（流体） |
| 1920px | 1200px | 78px | 12 | 24px | 360px（流体） |
| 1440px | 1200px | 82px | 12 | 24px | 96px（流体） |
| 1248px | 1200px | 78px | 12 | 24px | 24px（流体） |
| 1024px（Pad） | 976px | 59px | 12 | 24px | 24px（流体） |
| ≤ 768px（H5） | 736px | 78px | 8 | 16px | 16px（流体） |
| 375px（H5 标准） | 343px | 74px | 4 | 16px | 16px（固定） |

#### 布局设计原则

- **流体设计**：固定内容区域尺寸 + 固定列间距（Gutter），外边距随屏幕宽度自适应变化
- **内容比例**（Web 1920/1440/1248）：全宽、2:1、等分 ×2、×3、×4、×6、×12
- **内容比例**（Pad 1024）：等分 ×2、×3、×4、×6、×12
- **内容比例**（H5 ≤768px）：等分 ×2、×3、×4、×8
- **内容比例**（375px）：全宽、等分 ×2、×4

---

### 响应式策略

> 响应式的目标是保证在 1280px ~ 1920px+ 范围内体验良好，并对窄屏笔记本（1280px）和宽屏显示器（2560px+）做合理兜底。

#### 设计原则

| 原则 | 说明 |
|------|------|
| **桌面端优先** | 以 1920×1080 为基准设计，向下适配至 1248px |
| **最小支持宽度** | `1248px`，低于此宽度 Sidebar 隐藏、通过汉堡按钮唤出覆盖层 |
| **侧边栏固定** | 320px 固定宽度，≤1247px 时隐藏 |
| **内容区流式** | 主内容区宽度 = `视窗宽度 - 320px`，流式自适应 |
| **表格水平滚动** | 列数过多时表格容器内部横向滚动，不压缩列宽 |
| **弹窗居中固定** | Modal 宽度固定（如 480px / 640px），不随窗口缩放 |

#### 断点 Token

```css
:root {
  /* 断点变量 */
  --breakpoint-xs:   375px;   /* H5 标准（仅参考，后台不适配） */
  --breakpoint-sm:   768px;   /* 平板竖屏（仅参考） */
  --breakpoint-md:   1024px;  /* 平板横屏 / 小笔记本 */
  --breakpoint-lg:   1280px;  /* ✅ 后台最小支持宽度 */
  --breakpoint-xl:   1440px;  /* 标准笔记本 */
  --breakpoint-2xl:  1920px;  /* ✅ 基准设计尺寸 */
  --breakpoint-3xl:  2560px;  /* 超宽屏 */
}
```

#### 断点与布局参数

| 断点 | 范围 | 侧边栏 | 内容区宽度 | 内容区内边距 | 栅格列数 | Gutter | 场景 |
|------|------|--------|-----------|-------------|---------|--------|------|
| **3xl** | ≥ 2560px | 320px | 内容区 max-width: 1600px，居中 | 48px | 12 | 24px | 超宽显示器 |
| **2xl** | 1920–2559px | 320px | 1600px (1920 - 320) | 48px | 12 | 24px | **基准设计尺寸** |
| **xl** | 1440–1919px | 320px | 1120px (1440 - 320) | 48px | 12 | 24px | 标准笔记本 |
| **lg** | 1248–1439px | **隐藏** | 全宽 | 48px | 12 | 24px | 窄屏笔记本 |
| **md** | 1024–1247px | **隐藏** | 全宽 | 24px | 12 | 16px | 平板横屏（降级体验） |
| **sm** | < 1024px | — | — | — | — | — | 不适配，显示水平滚动条 |

#### 组件级响应行为

| 组件 | ≥ 1920px (2xl) | 1440–1919px (xl) | 1248–1439px (lg) | < 1248px (md) |
|------|---------------|-----------------|-----------------|--------------|
| **Header** | 72px，完整工具栏 | 同左 | 同左 | 汉堡菜单替代 Sidebar |
| **Sidebar** | 320px 展开 | 同左 | 隐藏，覆盖层唤出 | 同左 |
| **Page Title** | 32px H3 | 28px H4 | 24px H5 | 24px H5 |
| **数据统计卡片** | 4 列 | 4 列 | 3 列 | 2 列 |
| **Table** | 全列展示 | 全列展示 | 固定首尾列 + 中间横向滚动 | 横向滚动 |
| **Table 操作列** | 文字链（编辑 / 查看 / 删除） | 同左 | 图标按钮替代文字 | 同左 |
| **筛选工具栏** | 一行展示全部筛选项 | 同左 | 折叠为"更多筛选"下拉 | 同左 |
| **Modal** | 居中，max-width 480/640px | 同左 | 同左 | 同左 |
| **Toast** | 右上角 | 同左 | 同左 | 同左 |
| **Form** | 双列表单布局 | 同左 | 单列表单布局 | 单列 |
| **Tabs** | 全部展示 | 同左 | 超出时左右滚动 + 渐变遮罩 | 同左 |
| **Pagination** | 完整（页码 + 跳转 + 每页条数） | 同左 | 精简（上/下一页 + 当前页/总页数） | 同左 |
| **Breadcrumb** | 完整路径 | 同左 | 超过 3 级折叠中间项为 `…` | 同左 |

#### 表格自适应策略

```css
/* 表格容器 — 允许内部横向滚动 */
.table-container {
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

/* 表格最小宽度 — 防止列过度压缩 */
.table {
  min-width: 960px;
  width: 100%;
  table-layout: fixed;
}

/* 固定列（首列 / 操作列） */
.table-col--fixed-left {
  position: sticky;
  left: 0;
  z-index: 10;
  background: #FFFFFF;
  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.06);
}

.table-col--fixed-right {
  position: sticky;
  right: 0;
  z-index: 10;
  background: #FFFFFF;
  box-shadow: -2px 0 4px rgba(0, 0, 0, 0.06);
}
```

| 策略 | 条件 | 行为 |
|------|------|------|
| **全列展示** | 内容区 ≥ 表格最小宽度 | 所有列按比例分配宽度 |
| **固定首尾 + 滚动** | 内容区 < 表格最小宽度 | 首列（名称）和末列（操作）`sticky`，中间列横向滚动 |
| **列优先级隐藏** | 极端窄屏 | 低优先级列（如"创建时间"）隐藏，用展开行查看 |

##### 列宽优先级

| 优先级 | 列类型 | 最小宽度 | 可隐藏 |
|--------|--------|---------|--------|
| P0 | 主标识（名称/ID） | 160px | ❌ |
| P0 | 操作列 | 120px | ❌ |
| P1 | 状态 | 100px | ❌ |
| P1 | 金额 | 120px | ❌ |
| P2 | 类型/分类 | 100px | ✅ |
| P3 | 创建时间 | 160px | ✅ |
| P3 | 更新时间 | 160px | ✅ |
| P4 | 备注/描述 | 200px | ✅ |

#### 表单自适应策略

```css
/* 表单网格 — 默认双列 */
.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  max-width: 960px;
}

/* 全宽字段（如 textarea、地址） */
.form-grid .field--full {
  grid-column: 1 / -1;
}

/* lg 断点以下切为单列 */
@media (max-width: 1439px) {
  .form-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}
```

| 视窗 | 表单布局 | Label 位置 | 输入框宽度 |
|------|---------|-----------|-----------|
| ≥ 1440px | 双列 Grid | 顶部（Label 在输入框上方） | `100%` of column |
| 1280–1439px | 单列 | 顶部 | `100%`，max-width: 480px |
| < 1280px | 单列 | 顶部 | `100%` |

#### 数据卡片响应

| 视窗宽度 | 列数 | 卡片最小宽度 | Gap |
|----------|------|------------|-----|
| ≥ 1440px | 4 列 | 260px | 24px |
| 1280–1439px | 3 列 | 260px | 16px |
| 1024–1279px | 2 列 | 300px | 16px |
| < 1024px | 1 列 | 100% | — |

---

## Pay-B 官网（pay-b-website）布局

> 场景：GatePay 官方网站 / 产品 Landing Page / 营销落地页
> Figma 来源：`5fRySZo785Q1QHfn8FxqeN`（Pay-B端官网），node-id: `1420:113319`
> 特征：深色 + 白色交替区块、低信息密度、大字号冲击力

### 整体框架

```
┌──────────────────────────────────────────────────────┐
│ Header (48px, 固定顶部, 半透明)                        │
│ Gate Pay Logo + 产品▼ + 行业方案▼ + 开发者▼   Log In │ Sign Up │
├──────────────────────────────────────────────────────┤
│                                                      │
│ ☁ Hero Section (白底 + 天空渐变, ~1348px 高)          │
│   "链接全球 Web3 用户" 64px/700                       │
│   描述文字 18px                                       │
│   [立即开始] (黑底白字胶囊)  联系我们 (文字链接)       │
│   产品截图 (圆角 20px, 带阴影)                         │
│                                                      │
│ ─── 3 列功能图标卡片 (白底) ───                       │
│   超低费率 / 安全可靠 / 全球牌照                       │
│                                                      │
├──────────────────────────────────────────────────────┤
│ 产品解决方案区块 (白底)                               │
│   [产品解决方案] ← 绿底标签 Tag                        │
│   "一体化 Web3 支付产品套件" 40px/700                  │
│   产品 Tab: 收款 | 钱包 | 收银台 | 资金管理 | ...     │
│   产品截图 + 功能描述                                  │
├──────────────────────────────────────────────────────┤
│ ■ 深色区块 (#0A0B0D): 多商户管理 / 全球支付            │
│   白色标题 40px + 灰色描述                             │
│   绿色数据高亮 "4,200 USD"                             │
├──────────────────────────────────────────────────────┤
│ GatePay vs 传统支付 对比表 (白底)                      │
├──────────────────────────────────────────────────────┤
│ ■ 深色区块: 安全合规 + 牌照展示 + "5分钟开启账户" CTA  │
├──────────────────────────────────────────────────────┤
│ 企业解决方案 (白底, 步骤引导 1→2→3)                   │
├──────────────────────────────────────────────────────┤
│ ■ Footer (#0A0B0D): Logo + 链接矩阵 + 版权            │
└──────────────────────────────────────────────────────┘
```

### 关键布局规格

| 维度 | 值 | 说明 |
|------|-----|------|
| 画布宽度 | 1920px | 全屏设计 |
| 内容区 | **1280px** 居中 | 左右各 320px 留白 |
| Header | 48px 高，固定顶部 | 半透明背景 |
| Hero 区 | ~1348px 高 | 首屏核心区域 |
| 区块间距 | 120px | 大区块之间 |
| 区块内标题→内容 | 64px | 标题与正文之间 |
| 卡片网格 gap | 24px | 功能卡片/产品截图区 |

### CSS 变量（官网专属）

| 变量 | 值 | 说明 |
|------|-----|------|
| `--content-width` | `1280px` | 内容区最大宽度 |
| `--content-padding` | `0 320px` | 左右留白 |
| `--section-gap` | `120px` | 大区块间距 |
| `--section-inner-gap` | `64px` | 区块内标题→内容间距 |
| `--card-gap` | `24px` | 卡片网格间距 |
| `--bg-dark` | `#0A0B0D` | 深色区块背景 |
| `--bg-hero-gradient` | `linear-gradient(180deg, #F0F4FF 0%, #E8F0FE 50%, #D4E8FF 100%)` | Hero 区渐变 |

### 深色/白色区块交替规则

| 区块类型 | 背景 | 标题色 | 正文色 |
|---------|------|--------|--------|
| 白色区块 | `#FFFFFF` | `#070808` 40px/700 | `#84888C` 18px/400 |
| 深色区块 | `#0A0B0D` | `#FFFFFF` 40px/700 | `#84888C` 18px/400 |
| 深色卡片 | `#111214` | 圆角 16px | — |

> 官网与 B端后台 CTA 按钮差异：Hero 区用**黑底白字**（非品牌绿），Sign Up 按钮用品牌绿 `#ADF73E`

---

## 响应式适配规则

> Web 端（桌面/H5 双端），不涉及 Native App。
> 适用于 Web3 钱包、Pay 支付（C 端 Web）、Pay-B 商户后台三条产品线。

### 断点体系

| 断点名称 | 范围 | 典型设备 | 适配策略 |
|---------|------|---------|---------|
| **mb** | 0 – 375px | 极窄 H5 | H5 最小兜底 |
| **pad** | 376 – 767px | 标准手机 / 平板 | H5 主力断点 |
| **xs** | 768 – 991px | 平板横屏 / 小笔记本 | H5 大屏 / Web 窄屏 |
| **slg** | 992 – 1023px | 小笔记本 | Web 紧凑 |
| **sxl** | 1024 – 1247px | 笔记本 | Web 标准 |
| **smx** | 1248 – 1279px | 大笔记本 | **B 端 Sidebar 展开断点** |
| **sm** | 1280 – 1679px | 标准桌面 | Web 默认模式 |
| **md** | 1680 – 1919px | 大屏桌面 | Web 宽屏模式 |
| **lg** | 1920 – 2559px | 超宽屏 | Web 最大宽度 |
| **xl** | ≥ 2560px | 外接显示器 | 超宽屏限制 |

```css
:root {
  --bp-min-mb:  375px;
  --bp-min-pad: 768px;
  --bp-min-slg: 992px;
  --bp-min-sxl: 1024px;
  --bp-min-smx: 1248px;  /* B端关键: Sidebar 展开 */

  --bp-max-mb:  375px;
  --bp-max-pad: 768px;
  --bp-max-xs:  991px;
  --bp-max-smx: 1247px;
  --bp-max-sm:  1279px;
  --bp-max-md:  1679px;
  --bp-max-lg:  1919px;
  --bp-max-xl:  2559px;
}
```

### 产品线适配策略

#### 1. Web3 钱包 / Pay 支付（C 端 Web）

| 维度 | Web (≥1024px) | H5 (375–767px) |
|------|--------------|----------------|
| 导航 | Header 64px + Sidebar 200px | 底部 TabBar 56px |
| 内容区 | Sidebar 右侧，max-width 1200px | 全宽，padding 16px |
| 栅格 | 12 列，gutter 24px | 4 列，gutter 16px |
| 字阶 | Web 字阶（H1 48px → Body 14px） | H5 字阶（H1 28px → Body 14px） |
| 卡片 | max-width 480px 居中 | 全宽 - 32px |
| 弹窗 | 居中浮层 max-width 480px | 底部抽屉全宽 |
| 列表 | 虚拟滚动 | 下拉刷新 + 上拉加载 |

#### 2. Pay-B 商户后台（B 端 Web）

| 维度 | ≥1920px | 1680–1919 | 1280–1679 | 1248–1279 | 1024–1247 | 992–1023 | <992 |
|------|---------|----------|----------|----------|----------|---------|------|
| Sidebar | 320px 展开 | 320px 展开 | 320px 展开 | **320px 展开** | 64px 折叠 | 64px 折叠 | 64px 折叠 |
| 内容区 | max-1600px | 自适应 | 自适应 | 自适应 | 自适应 | 自适应 | 自适应 |
| 内边距 | 48px | 40px 32px | 40px 32px | 40px 32px | 32px 24px | 32px 24px | 24px 16px |
| 数据卡片 | 4 列 | 4 列 | 4 列 | 3 列 | 3 列 | 2 列 | 1 列 |
| 表格 | 全列 | 全列 | 全列 | Action sticky | Action sticky | 横向滚动 | 横向滚动 |

> **Sidebar 展开关键断点：1248px**（`min-smx`），<1248px 折叠为 64px。最小支持宽度 992px。

### 布局切换 CSS

#### Sidebar 折叠

```css
/* ≥1248px: Sidebar 完整展开 */
@media (min-width: 1248px) {
  .sidebar { width: 320px; }
  .sidebar__item-text, .sidebar__group-label,
  .sidebar__sub-inner, .sidebar__merchant-info,
  .sidebar__merchant-arrow { display: flex; }
  .main { margin-left: 320px; }
}

/* <1248px: Sidebar 折叠为图标栏 */
@media (max-width: 1247px) {
  .sidebar { width: 64px; padding: 12px 8px; }
  .sidebar__item-text, .sidebar__group-label,
  .sidebar__sub-inner, .sidebar__merchant-info,
  .sidebar__merchant-arrow { display: none; }
  .sidebar__item { padding: 6px 0; justify-content: center; }
  .sidebar__item-inner { padding: 10px; justify-content: center; }
  .main { margin-left: 64px; }
}

/* <992px: 更紧凑模式 */
@media (max-width: 991px) {
  .main { padding: 24px 16px; }
}

/* <768px: Sidebar 抽屉模式（H5 兜底） */
@media (max-width: 767px) {
  .sidebar {
    position: fixed; left: -320px; z-index: 200;
    transition: left 0.3s ease;
  }
  .sidebar--open { left: 0; }
  .main { margin-left: 0; }
}
```

#### 表格自适应

```css
@media (min-width: 1440px) {
  .table-gtpay td, .table-gtpay th { white-space: nowrap; }
  .table-container { overflow-x: visible; }
}

@media (max-width: 1439px) {
  .table-container { overflow-x: auto; }
  .action-col {
    position: sticky; right: 0;
    background: #FFFFFF; z-index: 2;
    box-shadow: -8px 0 16px rgba(0,0,0,0.08);
  }
}

/* H5: 卡片模式替换表格 */
@media (max-width: 767px) {
  .table-gtpay { display: none; }
  .card-list { display: flex; flex-direction: column; gap: 12px; }
  .card-list-item {
    background: #FFFFFF; border: 1px solid #ECEDEF;
    border-radius: 12px; padding: 16px;
  }
}
```

#### 数据卡片网格

```css
.stat-grid { display: grid; gap: 20px; }
@media (min-width: 1440px)                          { .stat-grid { grid-template-columns: repeat(4, 1fr); } }
@media (min-width: 1024px) and (max-width: 1439px)  { .stat-grid { grid-template-columns: repeat(3, 1fr); } }
@media (min-width: 768px) and (max-width: 1023px)   { .stat-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 767px)                           { .stat-grid { grid-template-columns: 1fr; } }
```

### 字阶响应式映射（Web ↔ H5）

| Token | Web (≥1024px) | H5 (375–767px) |
|-------|-------------|----------------|
| H1 | 48px | 28px |
| H2 | 40px | 28px |
| H3 | 40px | 24px |
| H4 | 32px | 24px |
| H5 | 28px | 18px |
| S1 | 24px | 18px |
| S3 | 20px | 16px |
| S5/S7 | 18px/16px | 16px |
| B1 | 20px | 14px |
| B5/B8 | 16px/14px | 14px |

> Body 字号（≤16px）在 H5 端基本不缩放，Display/Heading 有明显缩放。

### 间距响应式

| Token | Web (≥1440px) | Web (1024–1439px) | H5 (375–767px) |
|-------|-------------|------------------|----------------|
| page-top | 40px | 32px | 16px |
| page-side | 32px | 24px | 16px |
| section-gap | 40px | 32px | 24px |
| card-gap | 20px | 16px | 12px |
| card-inner | 24px | 20px | 16px |

### 组件自适应规则

**Button**

| 尺寸 | Web | H5 |
|------|-----|-----|
| Primary CTA | height 48px, padding 0 24px | height 48px, 全宽 `width: 100%` |
| Secondary | height 40px, padding 0 20px | height 40px, padding 0 16px |
| Small | height 32px | height 32px（不变） |

**Modal / Dialog**

| 场景 | Web | H5 |
|------|-----|-----|
| 确认弹窗 | 居中浮层 max-width 480px | 居中浮层 width calc(100% - 48px) |
| 表单弹窗 | 居中浮层 max-width 600px | 底部抽屉 max-height 90vh |
| 选择器 | 下拉面板 | 底部抽屉 + 搜索 |

**Tab（数量 > 5）**

| 端 | 行为 |
|----|------|
| Web | 自适应 + Arrow 箭头导航 |
| H5 | 横向滚动 `overflow-x: auto` |

### H5 触摸适配

| 规则 | 值 |
|------|-----|
| 最小触摸目标 | 44 × 44px |
| 按钮间距 | ≥ 8px（防误触） |
| 输入框高度 | ≥ 48px |
| 安全区域 | `env(safe-area-inset-*)` |

```css
.bottom-bar {
  padding-bottom: calc(16px + env(safe-area-inset-bottom, 0px));
}
```

### 暗色模式

```css
.page { --bg: #FFFFFF; --text-primary: #070808; }
@media (prefers-color-scheme: dark) {
  .page { --bg: #0D0E11; --text-primary: #FAFAFA; }
}
.page.theme-dark { --bg: #0D0E11; --text-primary: #FAFAFA; }
```

### 开发检查清单

- [ ] 所有页面在 375px 宽度下无水平溢出
- [ ] 触摸目标 ≥ 44px（H5）
- [ ] 文字最小 12px
- [ ] 图片有 `max-width: 100%`
- [ ] 表格在窄屏有横向滚动或卡片替代
- [ ] 弹窗在 H5 使用底部抽屉
- [ ] 底部操作栏有安全区域适配
- [ ] 暗色模式下所有组件颜色正确
- [ ] Sidebar 在 ≤1247px 正确折叠
