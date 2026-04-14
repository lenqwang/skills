---
scope: [campaign]
layer: L2
---
# RankList 排行榜

> 排行榜业务组件，包含分类 Tab、子分类 Segment、Top3 领奖台、数据表格、分页器。
> 由 Card、Tab、Table 基础组件组合而成。
> 只引用语义 Token，代码中通过 `var(--xxx)` 使用对应 CSS 变量。

---

## 组件结构

```
RankList
├── 外层容器 (.rankWrapper)                     ← 活动页黑卡
│
│   ├── 分类 Tabs (.rankCategoryTabs)           ← 顶层分类（如 "交易量" / "Top 跟单"）
│   │   └── Tab (.rankCategoryTab) ×N           ← 文字 Tab，active 带下划线
│   │
│   ├── 子分类 Segment (.rankSegment)           ← 二级切换（如 "每日" / "总榜" / "XXX"）
│   │   └── SegmentItem (.segmentItem) ×N       ← 胶囊按钮
│   │
│   ├── Top3 领奖台 (.rankPodium)               ← 仅桌面端显示
│   │   └── PodiumCard (.podiumCard) ×3         ← #2(左) #1(中,上浮) #3(右)
│   │       ├── 皇冠 (.podiumCrown)             ← 金/银/铜皇冠图标
│   │       ├── 头像 (.podiumAvatar)            ← 圆形头像
│   │       ├── 用户名 (.podiumName)
│   │       └── 指标区 (.podiumStats)
│   │           ├── 排名 (.podiumRank)          ← "排名" + 数字
│   │           └── 奖励 (.podiumMetric)        ← "预估奖励" + 金额
│   │
│   ├── 筛选栏 (.rankFilters)                   ← 仅桌面端，标签筛选 + 筛选图标
│   │   ├── 筛选 Tags (.filterTags)             ← "All" / "New" / "Meme" 等
│   │   └── 筛选图标 (.filterIcon)              ← 漏斗图标
│   │
│   ├── 数据表格 (.rankTable)
│   │   ├── 表头 (.rankTableHeader)
│   │   │   └── 列标题 (.rankColTitle) ×N
│   │   └── 表体 (.rankTableBody)
│   │       └── 表行 (.rankRow) ×N
│   │           ├── 排名 (.rankNumber)           ← Top3 金/银/铜色粗体
│   │           ├── 用户信息 (.rankUser)          ← 头像 + 用户名 + 标签
│   │           │   ├── 头像 (.rankUserAvatar)
│   │           │   ├── 用户名 (.rankUserName)
│   │           │   └── 标签组 (.rankUserTags)   ← 桌面端可见
│   │           ├── 数据列 (.rankDataCol) ×N
│   │           └── 操作列 (.rankAction)         ← 桌面端 "跟单"/"分享" 按钮
│   │
│   ├── 分页器 (.rankPagination)
│   │   ├── 上一页 (.pageArrow)
│   │   ├── 页码 (.pageNumber) ×N               ← 含省略号
│   │   └── 下一页 (.pageArrow)
│   │
│   └── 底部说明 (.rankFooter)                   ← 更新时间 + 提示语
│
└── (H5 结构差异见下方)
```

---

## 1. 外层容器 (rankWrapper)

| 属性 | Token | CSS | 值 |
|------|-------|-----|-----|
| 背景色 | `surface.campaign.black` | `var(--bg-card-black)` | #000000 |
| 圆角 | `radius.card-lg` | `var(--radius-card-lg)` | 32px |
| 边框 | — | — | 1px solid rgba(255,255,255,0.2) |
| 内边距 (桌面) | — | — | 40px 48px |
| 内边距 (H5) | — | — | 24px 16px |

---

## 2. 分类 Tabs (rankCategoryTabs)

顶层分类切换，文字形态，激活态带底部下划线。

| 属性 | 值 |
|------|-----|
| 字号 | 18px (桌面) / 16px (H5) |
| 字重 | 600 |
| 激活色 | #FFFFFF |
| 未激活色 | rgba(255,255,255,0.4) |
| 激活下划线 | 2px solid #FFFFFF, width 100%, bottom 0 |
| 间距 | gap: 32px (桌面) / gap: 24px (H5) |
| margin-bottom | 24px |

---

## 3. 子分类 Segment (rankSegment)

二级切换，胶囊按钮形态。

| 属性 | 值 |
|------|-----|
| 容器 | flex, gap: 0, 整体圆角 pill |
| 激活态背景 | rgba(255,255,255,0.15) |
| 激活态文字 | #FFFFFF |
| 未激活态背景 | transparent |
| 未激活态文字 | rgba(255,255,255,0.5) |
| 圆角 | 9999px (pill) |
| 字号 | 14px |
| 字重 | 500 |
| padding | 8px 16px |
| 整体边框 | 1px solid rgba(255,255,255,0.1)（H5 可见）|
| margin-bottom | 24px |

### H5 附加

- 右侧可加日历图标按钮（可选功能）

---

## 4. Top3 领奖台 (rankPodium)

仅桌面端显示，H5 隐藏。

### 布局

```
┌────────────────────────────────────────────────┐
│          ♛                                     │
│       [Avatar]     ← #1 居中, 上浮 -mt-6       │
│     "Chelsea"                                  │
│   排名    预估奖励                              │
│    1      10,000                               │
│                                                │
│  ♛              ♛                              │
│ [Avatar]     [Avatar]  ← #2 左, #3 右          │
│ "Chelsea"   "Chelsea"                          │
│ 排名  奖励  排名  奖励                          │
│  2   10,000  3   10,000                        │
└────────────────────────────────────────────────┘
```

### PodiumCard 规格

**渐变卡片**:

| 属性 | 值 |
|------|-----|
| 宽度 | 384px (三张等宽) |
| 高度 | 188px |
| 圆角 | 32px |
| 背景 | `linear-gradient(180deg, #353535 0%, #0B0C0D 100%)` |
| 内边距 | 53px 50px 19px |
| 卡片间距 | gap: 24px |

**头像 + 皇冠**: 浮在卡片上方 (负 margin 溢出)

| 属性 | #1 (冠军) | #2 (亚军) | #3 (季军) |
|------|-----------|-----------|-----------|
| 头像尺寸 | 80px | 64px | 64px |
| 头像边框 | 3px solid rgba(255,255,255,0.15) |
| 皇冠色 | #DAA520 (金) | #C0C0C0 (银) | #CD7F32 (铜) |
| 用户名字号 | 18px | 16px | 16px |
| 排名字号 | 24px bold | 20px bold | 20px bold |
| 奖励字号 | 20px bold | 18px bold | 18px bold |
| 排名/奖励色 | var(--rank-gold) | var(--rank-silver) | var(--rank-bronze) |

### 指标区

- 标签: "排名" / "预估奖励", 10px, rgba(255,255,255,0.4)
- 数值: bold, 使用对应排名色
- 两端对齐 (`justify-content: space-between`)

---

## 5. 筛选栏 (rankFilters)

仅桌面端显示，位于 Podium 和 Table 之间。

| 属性 | 值 |
|------|-----|
| 容器 | flex, align-items: center, justify-content: space-between |
| 标签 (All / New / Meme) | 激活: bg rgba(255,255,255,0.15), 文字 #FFF; 未激活: 透明, 文字 rgba(255,255,255,0.5) |
| 标签 padding | 6px 12px |
| 标签圆角 | 6px |
| 标签字号 | 13px, font-weight 500 |
| 标签 gap | 8px |
| 筛选图标 | 16px, rgba(255,255,255,0.4), hover → #FFF |
| margin-bottom | 16px |

---

## 6. 数据表格 (rankTable)

### 表头

| 属性 | 值 |
|------|-----|
| 字号 | 12px |
| 字重 | 500 |
| 颜色 | rgba(255,255,255,0.4) |
| padding | 12px 16px |
| 底部分割线 | 1px solid rgba(255,255,255,0.1) |

### 表行

| 属性 | 值 |
|------|-----|
| 行高 | min-height 56px (桌面) / 52px (H5) |
| padding | 16px (桌面) / 12px 8px (H5) |
| 底部分割线 | 1px solid rgba(255,255,255,0.05) |
| hover 背景 | rgba(255,255,255,0.03) |
| 当前用户行 | 背景 rgba(255,255,255,0.05), 操作按钮变为 "分享" |

### 排名列

| 排名 | 桌面端 | H5 |
|------|--------|-----|
| 1 | 数字 "1", italic, bold, 16px, var(--rank-gold, #DAA520) | 金牌 icon |
| 2 | 数字 "2", italic, bold, 16px, var(--rank-silver, #C0C0C0) | 银牌 icon |
| 3 | 数字 "3", italic, bold, 16px, var(--rank-bronze, #CD7F32) | 铜牌 icon |
| 4+ | 数字, regular, 14px, rgba(255,255,255,0.5) | 数字, 14px |

### 用户信息列 (桌面)

| 属性 | 值 |
|------|-----|
| 头像 | 32px 圆形 |
| 用户名 | 14px, #FFF, font-weight 500 |
| 标签组 | "Short-term" "Low frequency" 等, 10px, rgba(255,255,255,0.5), **filled** bg: rgba(255,255,255,0.1), padding 2px 6px, gap 4px |
| 头像-用户名间距 | 12px |

### 操作列 (桌面)

| 属性 | 值 |
|------|-----|
| "跟单" 按钮 | **filled** — bg: #FFFFFF, color: #000, 圆角 pill (9999px), padding 8px 20px, 14px, font-weight 500 |
| "分享" 按钮 (当前用户) | **filled muted** — bg: rgba(255,255,255,0.15), color: #FFF |
| hover (跟单) | opacity: 0.85 |
| hover (分享) | bg → rgba(255,255,255,0.2) |

### 桌面端列配置 (5 列)

| 列 | key | 宽度 | 对齐 | H5 可见 |
|----|-----|------|------|---------|
| 排名 | rank | 80px | center | Y |
| 交易员名称 | name | auto (flex) | left | Y |
| 跟单人数 | followers | 120px | center | N |
| 预估奖励 | reward | 140px | right | N |
| 操作 | action | 120px | center | N |

### H5 列配置 (3 列)

| 列 | key | 宽度 | 对齐 |
|----|-----|------|------|
| Ranking | rank | 56px | center |
| User Nickname | name | auto (flex) | left |
| Trading Volume | volume | auto | right |

---

## 7. 分页器 (rankPagination)

| 属性 | 值 |
|------|-----|
| 容器 | flex, justify-content: center, gap: 8px |
| 页码按钮尺寸 | 32px × 32px |
| 页码字号 | 12px, font-weight 500 |
| 激活态 | bg: rgba(255,255,255,0.15), color: #FFF |
| 未激活态 | bg: transparent, color: rgba(255,255,255,0.4) |
| 箭头 | 16px, rgba(255,255,255,0.4), disabled: opacity 0.3 |
| 省略号 | "...", rgba(255,255,255,0.3) |
| 圆角 | 8px |
| margin-top | 24px |

### 省略逻辑

- 总页数 ≤ 7: 显示全部
- 否则: `1 ... (current-1) current (current+1) ... total`

---

## 8. 底部说明 (rankFooter)

| 属性 | 值 |
|------|-----|
| 字号 | 12px |
| 颜色 | rgba(255,255,255,0.3) |
| 对齐 | center |
| padding | 16px 0 |
| 行高 | 1.6 |
| 内容示例 | "The leaderboard is updated every 15 minutes. Last updated: 2025/01/21 07:00" |

### H5 额外提示

- 可增加违规提示文案: "Violations such as malicious swiping will disqualify you from the competition"

---

## CSS 变量扩展

```css
--rank-gold: #DAA520;
--rank-silver: #C0C0C0;
--rank-bronze: #CD7F32;
--rank-row-hover: rgba(255, 255, 255, 0.03);
--rank-row-self: rgba(255, 255, 255, 0.05);
```

---

## 布局规格

### 桌面端

```
┌─ rankWrapper ─────────────────────────────────────────────┐
│  padding: 40px 48px                                       │
│                                                           │
│  [CategoryTab: Title]  [CategoryTab: Title]               │
│  ─────────────────────────────────────                    │
│                                                           │
│  [Seg: Title] [Seg: Title] [Seg: Title]                   │
│                                                           │
│  ┌──────── Podium (hidden on H5) ──────────────┐         │
│  │    #2          #1 (elevated)          #3     │         │
│  │  [Avatar]       [Avatar]            [Avatar] │         │
│  │  Chelsea        Chelsea             Chelsea  │         │
│  │  排名 奖励     排名 奖励           排名 奖励 │         │
│  └──────────────────────────────────────────────┘         │
│                                                           │
│  [All] [New] [Meme]                            [Filter]   │
│                                                           │
│  排名 │ 交易员名称        │ 跟单人数 │ 预估奖励 │ 操作    │
│  ─────┼──────────────────┼─────────┼──────────┼─────────│
│  1    │ Chelsea ☻ tags   │   161   │ 9,999    │ [跟单]  │
│  2    │ Momo ☻ tags      │   161   │ 9,999    │ [跟单]  │
│  ...                                                      │
│                                                           │
│  < 1 ... 4 5 [6] 7 8 ... 20 >                            │
│                                                           │
│  Updated every 15 minutes. Last updated: ...              │
└───────────────────────────────────────────────────────────┘
```

### H5 移动端

```
┌─ rankWrapper ──────────────────────┐
│  padding: 24px 16px                │
│                                    │
│  [FuturesTrading Vol.] [Top Fut..] │  ← 水平滚动
│  ────────────────────────          │
│                                    │
│  ┌─[Daily]─[Overall]─┐ [📅]      │  ← 带边框 Segment
│  └────────────────────┘            │
│                                    │
│  Ranking │ User Nickname │ Volume  │  ← 3 列
│  ────────┼───────────────┼────── │
│  🥇     │ Feng Yilian    │ 650K  │
│  🥈     │ ANT30004       │ 600K  │
│  🥉     │ GateUser-d...  │ 550K  │
│  4      │ Gate User      │ 500K  │
│  ...                               │
│                                    │
│  < 1 2 3 4 5 >                     │
│                                    │
│  Updated every 15 mins...          │
│  Violations such as ...            │
└────────────────────────────────────┘
```

### H5 与桌面端差异

| 差异点 | 桌面端 | H5 |
|--------|--------|-----|
| Podium | 显示 Top3 领奖台 | **隐藏** |
| 筛选栏 | 显示 Tags + 筛选图标 | **隐藏** |
| 表格列 | 5 列 (排名/用户/跟单/奖励/操作) | **3 列** (排名/用户/交易量) |
| 排名列 Top3 | 彩色数字 (italic, bold) | **奖牌 icon** |
| 用户列 | 头像 + 用户名 + 标签组 | **仅用户名** |
| Segment 边框 | 无 | **有边框** |
| Category Tabs | 并排显示 | **可水平滚动** |
| 外层 padding | 40px 48px | 24px 16px |
| 外层圆角 | 32px | 20px |

---

## 数据接口

```typescript
interface RankEntry {
  id: string | number;
  rank: number;
  name: string;
  icon?: string | ReactNode;
  [key: string]: unknown;
}

interface RankColumn<T = RankEntry> {
  key: string;
  title: ReactNode;
  align?: "left" | "center" | "right";
  width?: string | number;
  hideOnMobile?: boolean;
  render?: (value: unknown, record: T, index: number) => ReactNode;
  className?: string;
}

interface RankTab {
  key: string;
  label: string;
  showInfo?: boolean;
}

interface PodiumItem {
  rank: 1 | 2 | 3;
  name: string;
  icon?: string | ReactNode;
  metric: string;
  metricLabel?: string;
}

interface RankPagination {
  current: number;
  totalPages: number;
  onChange: (page: number) => void;
}

interface RankListProps<T extends RankEntry = RankEntry> {
  categoryTabs?: RankTab[];
  activeCategoryTab?: string;
  onCategoryTabChange?: (key: string) => void;

  segmentTabs?: RankTab[];
  activeSegmentTab?: string;
  onSegmentTabChange?: (key: string) => void;

  podium?: PodiumItem[] | false;

  filterTags?: { key: string; label: string }[];
  activeFilterTag?: string;
  onFilterTagChange?: (key: string) => void;

  columns: RankColumn<T>[];
  data: T[];

  pagination?: RankPagination;

  footer?: ReactNode;
  loading?: boolean;
  className?: string;
}
```
