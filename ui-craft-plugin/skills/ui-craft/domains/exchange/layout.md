# Exchange 布局扩展

> 基于 platform/layout.md 的 Exchange 特有布局扩展。

---

## 继承

```
extends: ../_platform/layout.md
```

## Trading 布局详细规格

### 桌面端 (≥1440px)

```
+------+--------+------------------+------------+
| Side | Order  |     Chart        |   Trade    |
| bar  | Book   |     K线图         |   Panel    |
| 200  | 280    |     flex:1       |   320      |
| px   | px     |                  |   px       |
|      |        |                  |            |
|      |        +------------------+            |
|      |        | Orders/History   |            |
|      |        | 280px h          |            |
+------+--------+------------------+------------+
| Footer Bar (交易对信息、深度统计等)             |
+------------------------------------------------+

面板间距: 8px
最小宽度: 1200px
```

### 笔记本端 (1200-1439px)

```
+--------+------------------+------------+
| Order  |     Chart        |   Trade    |
| Book   |     K线图         |   Panel    |
| 240    |     flex:1       |   280      |
| px     |                  |   px       |
|        +------------------+            |
|        | Orders           |            |
+--------+------------------+------------+

侧栏折叠为图标模式 (60px)
```

### 移动端

```
+----------------------------------+
| Navbar (MarketTicker)            |
+----------------------------------+
| Chart (K线)                      |
| 全宽, 高度 40vh                   |
+----------------------------------+
| Tabs: 盘口 | 成交 | 委托 | 详情   |
+----------------------------------+
| Tab Content                      |
| (OrderBook / Trades / Orders)    |
+----------------------------------+
| 底部按钮栏                        |
| [买入] [卖出]                     |
+----------------------------------+

点击买入/卖出 → Sheet 弹出 TradePanel
```

## 多面板配置

Exchange 支持用户自定义面板布局：

| 面板 | 默认可见 | 可隐藏 | 可调宽 |
|------|---------|--------|--------|
| OrderBook | 是 | 是 | 240-360px |
| Chart | 是 | 否 | flex |
| TradePanel | 是 | 否 | 280-360px |
| RecentTrades | 否 | — | 240px |
| Orders/History | 是 | 是 | 固定高度 |

## 行情列表布局

```
+------------------------------------------------------------------+
|  市场概览 Banner (热门/涨幅榜/新币)                               |
+------------------------------------------------------------------+
|  Search + Tabs (自选|热门|现货|合约|ETF|杠杆)                     |
+------------------------------------------------------------------+
|  Table V5                                                        |
|  +--------------------------------------------------------------+|
|  | ★ | CoinTitle | Price | 24H% | 24H Vol | MarketCap | 操作   ||
|  +--------------------------------------------------------------+|
|  |   | BTC/USDT  | ...   | ...  | ...     | ...       | 交易   ||
|  |   | ETH/USDT  | ...   | ...  | ...     | ...       | 交易   ||
|  +--------------------------------------------------------------+|
+------------------------------------------------------------------+
```

## Copy Trading 跟单广场布局（App）

```
+------------------------------------------+
| StatusBar                                |
+------------------------------------------+
| Navbar                                   |
| [←]  [SegmentedControl]  [🔍] [📋]      |
| 高度 44px, 内边距 0 16px                  |
+------------------------------------------+
| PortfolioSummary                         |
| Total Assets ⊙                          |
| 8,139.52 USDx >                         |
| Unrealized PnL +0.02                    |
| 内边距 12px 16px 16px                    |
+------------------------------------------+
| AnnouncementBanner                       |
| [icon] Star of the Day...    [×]        |
| 外边距 8px 16px, 内边距 12px, 圆角 8px   |
+------------------------------------------+
| TabBar: All Traders | Favorites | ☆Join  |
| 内边距 0 16px, 高度 48px                  |
| 选中态: 底部 2px 黑色短下划线             |
+------------------------------------------+
| FilterChips: [ROI ▼] [7D ▼]             |
| 内边距 12px 16px 8px                     |
+------------------------------------------+
| TraderCard (可滚动列表)                   |
|  ┌─ Avatar ─ Name ──────── [Copy] ──┐   |
|  │           Followers               │   |
|  │  7D ROI | PnL                     │   |
|  │  +1,112.36%         [MiniChart]   │   |
|  │  +13,108,492.36                   │   |
|  │  ─────────────────────────────    │   |
|  │  Win Rate   AUM    Copiers' PnL   │   |
|  │  8.11%     786k    86,139.52      │   |
|  └───────────────────────────────────┘   |
|  每个卡片内边距 16px                      |
|  卡片间分割线 0.5px #E7E9EE              |
+------------------------------------------+
| BottomTabBar                             |
| [Discover]        [My Copies]            |
| 高度 56px + safe-area                    |
+------------------------------------------+
```

### Copy Trading TabBar 规格

```css
.tab-bar {
  display: flex;
  align-items: center;
  padding: 0 16px;
  height: 48px;
  background: var(--bg-primary, #FFFFFF);
}

.tab-item {
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: var(--text-tertiary, #84888C);
  padding: 12px 0;
  margin-right: 24px;
  position: relative;
}

.tab-item--active {
  font-weight: 600;
  color: var(--text-primary, #070808);
}

.tab-item--active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 24px;
  height: 2px;
  background: var(--text-primary, #070808);
  border-radius: 1px;
}

.tab-join {
  margin-left: auto;
  margin-right: 0;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary, #070808);
}
```

### Copy Trading BottomTabBar 规格

```css
.bottom-tab-bar {
  display: flex;
  height: 56px;
  padding-bottom: env(safe-area-inset-bottom);
  background: var(--bg-primary, #FFFFFF);
  border-top: 0.5px solid var(--border-secondary, #E7E9EE);
}

.bottom-tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
}

.bottom-tab-icon {
  width: 24px;
  height: 24px;
}

.bottom-tab-label {
  font-size: 10px;
  line-height: 13.2px;
}

.bottom-tab-item--active {
  color: var(--text-primary, #070808);
}

.bottom-tab-item--inactive {
  color: var(--text-tertiary, #84888C);
}
```

### 页面级整体规格

| 属性 | 值 | 说明 |
|------|-----|------|
| 背景色 | #FFFFFF | 纯白背景 |
| 页面内边距 | 0（由各组件自带 16px 水平边距） | 无全局 padding |
| 滚动区域 | TraderCard 列表部分 | Navbar + Portfolio 固定或可收起 |
| Navbar 高度 | 44px | 不含 StatusBar |
| BottomTabBar 高度 | 56px + safe-area | 含安全区 |

## 栅格体系

> 数据来源: [Grid Guidelines](https://www.figma.com/design/kQIx9xKLiyO6KZIbazNSM2/?node-id=7538-53535)

### 断点与栅格参数

| 断点 | 内容区宽度 | 列宽 | 列数 | Gutter | 外边距（单侧） |
|------|-----------|------|------|--------|--------------|
| > 1920px | 1440px | 98px | 12 | 24px | 560px（流体） |
| 1920px | 1200px | 78px | 12 | 24px | 360px（流体） |
| 1440px | 1200px | 82px | 12 | 24px | 96px（流体） |
| 1248px | 1200px | 78px | 12 | 24px | 24px（流体） |
| 1024px（Pad） | 976px | 59px | 12 | 24px | 24px（流体） |
| <=768px（H5） | 736px | 78px | 8 | 16px | 16px（流体） |
| 375px（H5 标准） | 343px | 74px | 4 | 16px | 16px（固定） |

### 布局设计原则

- **流体设计**：固定内容区域尺寸 + 固定列间距（Gutter），外边距随屏幕宽度自适应变化
- **内容比例**（Web 1920/1440/1248）：全宽、2:1、等分 x2、x3、x4、x6、x12
- **内容比例**（Pad 1024）：等分 x2、x3、x4、x6、x12
- **内容比例**（H5 <=768px）：等分 x2、x3、x4、x8
- **内容比例**（375px）：全宽、等分 x2、x4

## 页面级间距

> 数据来源:
> - Web: [Space_Web Guidelines](https://www.figma.com/design/kQIx9xKLiyO6KZIbazNSM2/?node-id=7538-48273)
> - H5: [Space_H5 Guidelines](https://www.figma.com/design/kQIx9xKLiyO6KZIbazNSM2/?node-id=7538-50132)

### Web 端页面级间距

| 区域 | 值 | 说明 |
|------|----|------|
| 左右外边距（1920px） | 360px | 内容区距屏幕边缘 |
| 内容区宽度 | 1200px | 主体内容最大宽度 |
| 导航栏高度 | 48px | Header 高度 |
| 导航栏上方提示条 | 40px | 顶部通知/公告栏 |

#### 交互热区规范

- 导航栏热区：导航到下方内容区域之间保留合理间距
- 滚动过渡区（1986 布局）：导航栏下方留有 80px 的内容过渡区

#### 极限规则

- 内容区宽度固定，超出部分截断或折行
- 多语言/本地化场景下，文字长度变化时，组件需支持弹性宽度

### H5 端页面级间距

| 区域 | 值 | 说明 |
|------|----|------|
| 左右外边距 | 16px | 页面内容距屏幕边缘 |
| 内容区宽度（375px 设备） | 343px | 主体内容宽度 |
| 导航栏高度 | 48px | 顶部 Header |
| 底部安全区 | 34px | Home Indicator 区域 |

#### 典型页面间距示例（首页）

| 区域 | 间距 | 说明 |
|------|------|------|
| Header -> 首焦内容 | 48px | 导航栏高度 = 内容起始点 |
| 首焦区高度（已登录） | 296px | Banner + 功能入口 |
| 首焦区高度（未登录） | 92px | 简化展示 |
| 首焦 -> 下方模块 | 48px | 标准模块间距 |
| 各模块分隔 | 48px | 统一模块间距 |

## Banner 规范

> 数据来源: [Banner Guidelines](https://www.figma.com/design/kQIx9xKLiyO6KZIbazNSM2/?node-id=8749-31670)

### 首焦 Banner -- 类型 1（纯图文）

用于首页主 Banner，左侧文字 + 右侧图片布局。

| 元素 | 规格 |
|------|------|
| 大标题字号 | 56px |
| 大标题字重 | 600 Semibold |
| 大标题颜色 | Text/Primary（`color-brand-1`） |
| 副标题字号 | 20px |
| 副标题字重 | 500 Medium |
| 副标题颜色 | Text/Secondary |
| 大标题与副标题间距 | 16px |
| 右侧图片固定尺寸 | 435 x 280px |
| 图片占栅格数 | 9 列（共 12 列） |
| 内容区最小间距 | 51px |
| 对齐方式 | 居中对齐 |
| 整体内容区域 | 1200px（居于页面中央） |
| Banner 区总高度（含 Header） | 440px |

**按钮规格：**
- 最多 2 个 Button，宽度固定 160px，高度 56px
- 按钮间距：16px

### 首焦 Banner -- 类型 2（带卡片）

右侧为信息卡片而非纯图片时的规格。

| 元素 | 规格 |
|------|------|
| 右侧卡片宽度 | 486px |
| 卡片内 Main Text 字号 | 24px |
| 卡片内 Description 字号 | 16px |
| 图片比例 | 1:1 或 16:9 |
| 图片占位尺寸（1:1） | 96 x 96px |
| Main Text 最大行数 | 2 行（超出省略） |
| Description 最大行数 | 2 行（超出省略） |

### Banner 数据展示规范

用于 Banner 卡片内展示数字数据（如资产总额、收益率等）。

| 元素 | 字号 | 字重 |
|------|------|------|
| 大数字 | 28px | 600 Semibold |
| 数字说明文字 | 14px | 400 Regular |
| 数字与说明间距 | 4px | -- |

**带图表 Banner：**
- 图表尺寸：156 x 106px
- Button 使用 Tertiary 样式 + icon，宽度自适应

**带 Button 类型：**
- 通栏 Button（全宽卡片区域）使用 Tertiary + icon

### Banner 交互规范

| 行为 | 规则 |
|------|------|
| 翻页按钮显示时机 | 默认隐藏，鼠标 hover 时显示左右翻页图标 |
| Progress Bar 选中宽度 | 固定 12px |
| 文案截断规则 | 超出优先优化文案，仍超出则省略号截断 |
| 左右翻页图标尺寸 | 36 x 36px（含内 16px icon） |
