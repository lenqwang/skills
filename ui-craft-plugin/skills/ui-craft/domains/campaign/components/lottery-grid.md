---
scope: [campaign]
layer: L2
---
# LotteryGrid 九宫格抽奖

> 九宫格抽奖业务组件，包含 3×3 奖品网格、CTA 按钮、奖励记录面板。
> 由 Card、Button、Table 基础组件组合而成。
> 只引用语义 Token，代码中通过 `var(--xxx)` 使用对应 CSS 变量。

---

## 组件结构

```
LotteryGrid
├── 外层容器 (.lotteryWrapper)              ← 活动页黑卡，包裹左右两侧
│   ├── 左侧区域 (.lotteryMain)             ← 奖品网格 + CTA
│   │   ├── 奖品网格 (.prizeGrid)           ← 3×3 Grid，9 个奖品
│   │   │   └── 奖品格子 (.prizeCell) ×9    ← 单个奖品
│   │   │       ├── 图片 (.prizeImage)
│   │   │       └── 名称 (.prizeName)
│   │   ├── CTA 按钮 (.drawBtn)             ← 网格下方，全宽胶囊按钮
│   │   └── 次数提示 (.drawChances)         ← "Draw Chances: N"
│   │
│   └── 右侧区域 (.rewardsPanel)            ← 奖励记录
│       ├── 标题 (.rewardsTitle)            ← "My Rewards"
│       ├── 表头 (.rewardsHeader)           ← 奖品/时间 | 领取状态
│       ├── 记录列表 (.rewardsList)
│       │   └── 记录行 (.rewardRow)
│       │       ├── 奖品信息 (.prizeInfo)   ← 奖品名 + 时间
│       │       └── 状态 (.rewardStatus)    ← 待发放 / 已发放
│       └── 底部链接 (.rulesLink)           ← 实物奖品说明
```

---

## 1. 外层容器 (lotteryWrapper)

活动页黑卡样式，内部分左右两栏，中间竖线分隔。

| 属性 | Token | CSS | 值 |
|------|-------|-----|-----|
| 背景色 | `surface.campaign.black` | `var(--bg-card-black)` | #000000 |
| 边框 | `opacity.border` | — | 1px solid rgba(255,255,255,0.2) |
| 圆角 | `radius.card-lg` | `var(--radius-card-lg)` | 32px |
| 内边距 | — | — | 50px 48px |
| 布局 | — | `display: flex` | 水平排列 |

### 左侧区域内边距

| 属性 | 值 |
|------|-----|
| padding-right | 32px（与分隔线的间距） |

### 分隔线 (divider)

| 属性 | Token | CSS | 值 |
|------|-------|-----|-----|
| 宽度 | — | — | 1px |
| 颜色 | `surface.border` | — | rgba(255,255,255,0.1) |
| 高度 | — | `align-self: stretch` | 与容器等高 |

### 右侧区域内边距

| 属性 | 值 |
|------|-----|
| padding-left | 32px（与分隔线的间距） |

---

## 2. 奖品网格 (prizeGrid)

3×3 等分网格，展示 9 个奖品格子。

| 属性 | Token | CSS | 值 |
|------|-------|-----|-----|
| 布局 | — | `display: grid` | — |
| 列数 | — | `grid-template-columns` | repeat(3, 1fr) |
| 行数 | — | `grid-template-rows` | repeat(3, 1fr) |
| 格子间距 | `space.md` | — | 16px |

---

## 3. 奖品格子 (prizeCell)

单个奖品展示单元，含产品图片和名称。

### 默认态

| 属性 | Token | CSS | 值 |
|------|-------|-----|-----|
| 背景色 | — | — | transparent（无背景） |
| 圆角 | `radius.card` | `var(--radius-card)` | 8px |
| 内边距 | `space.lg` | — | 24px 16px |
| 对齐 | — | `text-align: center` | 居中 |
| 过渡 | `transition.hover` | `var(--transition)` | 200ms ease |
| 边框 | — | — | none（无边框） |

### 高亮态 (active / 轮转选中) — Filled

| 属性 | Token | CSS | 值 |
|------|-------|-----|-----|
| 背景色 | `surface.campaign.white` | — | #FFFFFF |
| 边框 | — | — | 1px solid #FFFFFF |
| 阴影 | — | — | 0 4px 24px rgba(255,255,255,0.2) |
| 圆角 | `radius.card` | `var(--radius-card)` | 8px |
| 文字色 | `text.campaign.black` | — | #000000（反转为深色） |

### 轮转态 (spinning / 动画经过)

| 属性 | Token | CSS | 值 |
|------|-------|-----|-----|
| 背景色 | — | — | rgba(255,255,255,0.03) |
| 边框 | — | — | 1px solid rgba(255,255,255,0.2) |

---

## 4. 奖品图片 (prizeImage)

| 属性 | Token | 值 |
|------|-------|-----|
| 尺寸 | — | 80px × 80px |
| 对象适应 | — | `object-fit: contain` |
| 底部间距 | `space.sm` | 8px |

---

## 5. 奖品名称 (prizeName)

| 属性 | Token | CSS | 值 |
|------|-------|-----|-----|
| 字号 | `body.xsmall` | — | 12px |
| 行高 | `lineHeight.loose` | — | 1.5 |
| 字重 | `fontWeight.regular` | — | 400 |
| 颜色 | `text.campaign.white` | `var(--text-on-dark)` | #FFFFFF |
| 溢出 | — | `text-overflow: ellipsis` | 单行截断 |

---

## 6. CTA 按钮 (drawBtn)

网格下方全宽按钮，活动页主 CTA（R23 每屏唯一）。

| 属性 | Token | CSS | 值 |
|------|-------|-----|-----|
| 背景色 | `action.campaign.primary` | `var(--cta-bg)` | #FFFFFF |
| 悬停背景色 | — | — | rgba(255,255,255,0.85) |
| 文字色 | — | `var(--cta-text)` | #000000 |
| 字号 | `button.large.campaign` | — | 18px |
| 字重 | `fontWeight.semibold` | — | 600 |
| 高度 | — | — | 60px |
| 宽度 | — | `width: 100%` | 与网格等宽 |
| 圆角 | `radius.pill` | `var(--radius-pill)` | 9999px |
| 上方间距 | `space.xl` | — | 32px |

### 禁用态

| 属性 | Token | CSS | 值 |
|------|-------|-----|-----|
| 背景色 | — | — | rgba(255,255,255,0.3) |
| 文字色 | `text.disabled` | `var(--text-disabled)` | #484B51 |
| 指针 | — | `cursor: not-allowed` | — |

---

## 7. 抽奖次数提示 (drawChances)

| 属性 | Token | CSS | 值 |
|------|-------|-----|-----|
| 字号 | `body.small` | — | 14px |
| 颜色 | `accent.highlight` | `var(--accent)` | 强调色 |
| 对齐 | — | `text-align: center` | 居中 |
| 上方间距 | `space.sm` | — | 8px |

---

## 8. 奖励记录面板 (rewardsPanel)

右侧奖励记录区域，独立滚动。

| 属性 | Token | CSS | 值 |
|------|-------|-----|-----|
| 宽度 | — | `flex-shrink: 0` | 360px |
| 最大高度 | — | `overflow-y: auto` | 与左侧等高 |

### 标题 (rewardsTitle)

| 属性 | Token | CSS | 值 |
|------|-------|-----|-----|
| 字号 | `title.medium` | — | 24px |
| 字重 | `fontWeight.bold` | — | 700 |
| 颜色 | `text.campaign.white` | `var(--text-on-dark)` | #FFFFFF |
| 底部间距 | `space.xl` | — | 32px |

### 表头 (rewardsHeader)

| 属性 | Token | CSS | 值 |
|------|-------|-----|-----|
| 字号 | `body.xsmall` | — | 12px |
| 颜色 | `text.secondary` | `var(--text-secondary)` | #A0A3A7 |
| 底部边框 | `surface.border` | `var(--border)` | 1px solid rgba(255,255,255,0.1) |
| 底部内边距 | `space.sm` | — | 8px |
| 布局 | — | `display: flex; justify-content: space-between` | 左右分布 |
| 列定义 | — | — | "Prize/winning time"(左) / "Prize collection status"(右) |

### 记录行 (rewardRow)

| 属性 | Token | CSS | 值 |
|------|-------|-----|-----|
| 行高度 | — | `min-height` | 56px |
| 底部边框 | `surface.border` | `var(--border)` | 1px solid rgba(255,255,255,0.1) |
| 内边距 | `space.md` 0 | — | 16px 0 |
| 布局 | — | `display: flex; justify-content: space-between; align-items: center` | — |

#### 奖品信息 (prizeInfo)

| 属性 | Token | CSS | 值 |
|------|-------|-----|-----|
| 奖品名（主文字） | `body.small` | — | 14px |
| 奖品名颜色 | `text.campaign.white` | `var(--text-on-dark)` | #FFFFFF |
| 奖品名字重 | `fontWeight.regular` | — | 400 |
| 时间（次要文字） | `body.xsmall` | — | 12px |
| 时间颜色 | `text.campaign.white-muted` | `var(--text-on-dark-muted)` | rgba(255,255,255,0.7) |
| 名称与时间间距 | `space.xs` | — | 4px |

#### 领取状态 (rewardStatus)

| 属性 | Token | CSS | 值 |
|------|-------|-----|-----|
| 字号 | `body.small` | — | 14px |
| 颜色（待发放） | `text.campaign.white-muted` | `var(--text-on-dark-muted)` | rgba(255,255,255,0.7) |
| 颜色（已发放） | `status.success` | `var(--success)` | #50A907 |
| 颜色（已过期） | `text.disabled` | `var(--text-disabled)` | #484B51 |

### 底部链接 (rulesLink)

| 属性 | Token | CSS | 值 |
|------|-------|-----|-----|
| 字号 | `body.xsmall` | — | 12px |
| 颜色 | `text.secondary` | `var(--text-secondary)` | #A0A3A7 |
| 上方间距 | `space.lg` | — | 24px |
| 装饰 | — | `text-decoration: underline` | 下划线 |

---

## 布局规格

### 桌面端 (>= 1248px)

```
┌─ lotteryWrapper (black card, p: 50px 48px) ────────────────────┐
│                                                                  │
│  ┌─ lotteryMain (flex:1, pr:48) ─┐│┌─ rewardsPanel (360, pl:32)┐│
│  │                               ││                            │ │
│  │  ┌──────┐ ┌──────┐ ┌──────┐  ││  My Rewards                │ │
│  │  │ img  │ │ img  │ │ img  │  ││                            │ │
│  │  │ name │ │ name │ │ name │  ││  Prize/time    | Status    │ │
│  │  ├──────┤ ├──────┤ ├──────┤  ││  ───────────────────────── │ │
│  │  │ img  │ │ img  │ │ img  │  ││  1 USDT Bonus  | To be     │ │
│  │  │ name │ │ name │ │ name*│  ││  2024-1-3      | dist..    │ │
│  │  ├──────┤ ├──────┤ ├──────┤  ││  ───────────────────────── │ │
│  │  │ img  │ │ img  │ │ img  │  ││  1 USDT Bonus  | To be     │ │
│  │  │ name │ │ name │ │ name │  ││  2024-1-3      | dist..    │ │
│  │  └──────┘ └──────┘ └──────┘  ││                            │ │
│  │                               ││  ...                       │ │
│  │  ┌─────────────────────────┐  ││                            │ │
│  │  │       Draw Now          │  ││  Instructions for          │ │
│  │  └─────────────────────────┘  ││  distributing physical     │ │
│  │       Draw Chances: 5         ││  prizes                    │ │
│  │                               ││                            │ │
│  └───────────────────────────────┘└────────────────────────────┘ │
│                             ↑ divider (1px, white/10)            │
└──────────────────────────────────────────────────────────────────┘
   * = 高亮态（轮转选中）
```

### 平板端 (768px - 1247px)

- 保持左右布局
- 右侧面板宽度缩减至 280px
- 外层内边距降至 32px

### 移动端 (< 768px)

H5 布局结构与桌面端**完全不同**，拆分为独立区块纵向堆叠：

```
┌─────────────────────────────┐
│       Lucky Draw (title)    │  ← 28px 粗体斜体，居中
│                             │
│  ┌───────────────────────┐  │
│  │  [P1]  [P2]  [P3]    │  │  ← 独立带边框圆角卡片
│  │  [P4]  [P5]  [P6]    │  │    padding: 20px
│  │  [P7]  [P8]  [P9*]   │  │    border: 1px rgba(255,255,255,0.15)
│  └───────────────────────┘  │    border-radius: 16px
│                             │
│    ╭── Draw Now ──╮         │  ← CTA 独立于卡片外
│    ╰──────────────╯         │    height: 52px, font-size: 16px
│     Draw Chances: 5        │
│                             │
│         Tasks               │  ← 20px 粗体标题
│                             │
│  ┌───────────────────────┐  │
│  │ My Rewards         ↗  │  │  ← 导航卡片，bg: muted
│  └───────────────────────┘  │    border-radius: 16px
└─────────────────────────────┘
```

| 属性 | 值 |
|------|-----|
| 外层 padding | 32px 20px 40px |
| Grid 卡片 padding | 20px |
| Grid 卡片 border-radius | 16px |
| Grid 卡片 border | 1px solid rgba(255,255,255,0.15) |
| 格子间距 | 12px |
| 格子圆角 | 8px |
| 格子背景 | transparent（无底色） |
| 格子 padding | 12px 6px |
| 奖品图片 | 56 × 56px |
| 奖品名 | 11px |
| CTA 高度/字号 | 52px / 16px |
| CTA margin-top | 24px |
| "Tasks" 标题 | 20px 粗体，margin-top: 40px |
| "My Rewards" 导航卡 | bg: muted, padding: 20px 24px, border-radius: 16px |
| 竖线分隔 | **不存在**，改为独立区块纵向排列 |

---

## 动画规格

### 轮转动画 (Spin Animation)

九宫格抽奖的核心动画，格子按顺序高亮。

```
轮转顺序（顺时针）：
  0 → 1 → 2
              ↓
  7          3
  ↑          ↓
  6 ← 5 ← 4

索引映射：[0, 1, 2, 5, 8, 7, 6, 3]
```

| 阶段 | 速度 | 说明 |
|------|------|------|
| 启动 | 300ms/格 | 缓慢开始 |
| 加速 | 100ms/格 | 持续 2-3 圈 |
| 减速 | 逐步增加至 400ms/格 | 最后 1 圈 |
| 停止 | — | 停在目标奖品，切换为高亮态 |

### 中奖高亮

| 属性 | 值 |
|------|-----|
| 动画 | 停止后闪烁 2 次 |
| 闪烁间隔 | 300ms |
| 最终态 | 保持高亮态 (border + shadow) |

---

## 状态说明

| 状态 | 网格 | CTA | 说明 |
|------|------|-----|------|
| 默认 | 所有格子默认态 | 可点击 | 等待抽奖 |
| 轮转中 | 格子依次高亮 | 禁用态 | 抽奖动画进行中 |
| 中奖 | 目标格子高亮态 | 禁用态 | 展示中奖结果 |
| 无次数 | 所有格子默认态 | 禁用态 | 抽奖次数为 0 |

---

## 数据接口

```ts
interface Prize {
  id: string
  name: string
  image: string             // 产品图片 URL
}

interface RewardRecord {
  id: string
  prizeName: string
  winTime: string           // 如 "2024-1-3 16:30:30"
  status: 'pending' | 'distributed' | 'expired'
}

interface LotteryGridProps {
  prizes: Prize[]           // 9 个奖品
  rewards: RewardRecord[]   // 中奖记录
  chances: number           // 剩余抽奖次数
  onDraw: () => Promise<number>  // 返回中奖奖品索引 (0-8)
  rulesLink?: string        // 底部说明链接
}
```

---

## 引用的基础组件

| 基础组件 | 用途 |
|----------|------|
| [card.md](../base/card.md) | 外层容器使用活动页黑卡规格 |
| [button.md](../base/button.md) | CTA 使用活动页 CTA 按钮规格 |
| [table.md](../base/table.md) | 奖励记录使用奖励表格规格 |

---

## CSS 变量扩展

在 `.page` wrapper 中额外定义的组件级变量：

```css
.page {
  /* LotteryGrid 专用 */
  --lottery-grid-gap: 16px;
  --lottery-cell-bg: var(--bg-muted);
  --lottery-cell-radius: var(--radius-card);
  --lottery-cell-active-border: 1px solid rgba(255,255,255,0.6);
  --lottery-cell-active-shadow: 0 0 20px rgba(255,255,255,0.15);
  --lottery-rewards-width: 360px;
}
```
