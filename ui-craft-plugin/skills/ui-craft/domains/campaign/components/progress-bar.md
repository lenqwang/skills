---
scope: [campaign]
layer: L2
---
# ProgressBar 进度条组件族

> 进度条组件族，包含简单进度条、里程碑进度、每日签到卡。
> 由 Bar（进度段）和 Node（里程碑节点）两个原子组合而成。
> 只引用语义 Token，代码中通过 `var(--xxx)` 使用对应 CSS 变量。

---

## 组件结构

```
ProgressBar 组件族
│
├── 原子: Bar (进度段)
│   ├── 方向: Horizontal / Vertical
│   └── 状态: achieved / in-process / not-achieve
│
├── 原子: Node (里程碑节点)
│   ├── 变体: Dot / Icon (Lock) / Circle
│   ├── 状态: achieved / in-process / not-achieve
│   └── 尺寸: Md / Sm
│
├── 组合: SimpleProgress (简单进度条)
│   ├── 轨道 (.progressTrack)
│   ├── 填充 (.progressFill)
│   └── 文字 (.progressText)       ← "2217.3456/10000"
│
├── 组合: MilestoneProgress (里程碑进度)
│   ├── 方向: Horizontal / Vertical
│   ├── 里程碑项 (.milestoneItem) ×N
│   │   ├── 上方标签 (.milestoneReward)  ← "50M"
│   │   ├── Node (.milestoneNode)
│   │   ├── Bar (.milestoneBar)          ← 连接到下一个节点
│   │   └── 下方标签 (.milestoneValue)   ← "50"
│   └── 可选文字标签 Tab (.milestoneTab)
│
└── 组合: DayCheckIn (每日签到)
    ├── 签到卡 (.checkInCard) ×N
    │   ├── 图标 (.checkInIcon)          ← ✓ / ☹
    │   └── 日期 (.checkInDay)           ← "Day1"
    └── 进度连接条 (.checkInProgress)    ← 可选
```

---

## 1. Bar 进度段（原子）

水平或垂直的进度条段，连接两个 Node。

### 颜色状态

| 状态 | 颜色 | CSS 变量 |
|------|------|----------|
| achieved | `accent.lime` #A7F757 | `var(--progress-achieved)` |
| in-process | `accent.lime-bright` #CFFF8A | `var(--progress-current)` |
| not-achieve | `gray.700` rgba(255,255,255,0.15) | `var(--progress-inactive)` |

### 尺寸

| 属性 | Md (桌面) | Sm (H5) |
|------|-----------|---------|
| 水平高度 | 4px | 3px |
| 垂直宽度 | 4px | 3px |
| 圆角 | 2px | 1.5px |

---

## 2. Node 里程碑节点（原子）

### 变体 × 状态

| 变体 | achieved | in-process | not-achieve |
|------|----------|------------|-------------|
| **Dot** | 实心绿点 #A7F757 | 实心亮绿点 #CFFF8A, 外环发光 | 实心灰点 rgba(255,255,255,0.3) |
| **Circle** | 绿色空心圆, 2px 描边 | 亮绿空心圆, 2px 描边 | 灰色空心圆, 1px 描边 |
| **Icon (Lock)** | 绿色锁图标, filled | 亮绿锁图标, filled | 灰色锁图标, outline |

### 尺寸

| 属性 | Md | Sm |
|------|-----|-----|
| Dot 直径 | 10px | 8px |
| Circle 直径 | 16px | 12px |
| Icon 容器 | 16px | 12px |
| 图标尺寸 | 12px | 10px |

### in-process 节点特殊效果

- Dot: 外环 `box-shadow: 0 0 0 3px rgba(167,247,87,0.3)`
- Circle: 描边 2px, 亮绿色
- Icon: 图标亮绿填充

---

## 3. SimpleProgress 简单进度条

用于任务卡内的进度展示（如 "Spot trading 1,000/200,000"）。

### 规格

| 属性 | 值 |
|------|-----|
| 轨道高度 | 4px |
| 轨道背景 | rgba(255,255,255,0.1) |
| 轨道圆角 | 2px |
| 填充色 | `var(--progress-achieved)` #A7F757 (绿) 或 `action.primary` #0068FF (蓝) |
| 填充圆角 | 2px |
| 文字格式 | "当前值/**总值**", 当前值 16px bold 白色, 总值 16px regular rgba(255,255,255,0.5) |
| 文字-条间距 | 8px |

### 页面中的使用

```
Spot trading  1,000/200,000
████████░░░░░░░░░░░░░░░░░░░░░░

Or

Contract trading  200,000/200,000
██████████████████████████████
```

---

## 4. MilestoneProgress 里程碑进度

### 4.1 水平布局 (Horizontal)

```
  50M      100M     150M     200M     250M     300M     350M ★    400M     450M
  ●━━━━━━━●━━━━━━━●━━━━━━━●━━━━━━●━━━━━━●━━━━━━●━━━━━━●─ ─ ─ ─●─ ─ ─ ─●
  50       100      150      200      250      300      350       400      450
```

| 属性 | Md (桌面) | Sm (H5) |
|------|-----------|---------|
| 容器 | flex, horizontal, align-items: center | 同左 |
| 节点间 Bar | flex: 1, height: 4px | flex: 1, height: 3px |
| 上方标签 | 12px, rgba(255,255,255,0.5); 当前: 14px bold #A7F757 | 10px, 当前 12px bold |
| 下方标签 | 12px, rgba(255,255,255,0.5); 当前: 14px bold #A7F757 | 10px, 当前 12px bold |
| 标签对齐 | center, 相对于节点居中 | 同左 |
| 节点-标签间距 | 6px | 4px |

### 4.2 垂直布局 (Vertical)

```
●  50M ──── 50
│
●  100M ──── 100
│
●  150M ──── 150
│
★  200M ──── 200   ← 当前，亮绿色
┊
○  300M ──── 300
┊
○  400M ──── 400
```

| 属性 | Md (桌面) | Sm (H5) |
|------|-----------|---------|
| 容器 | flex-direction: column | 同左 |
| 节点间 Bar | width: 4px, flex: 1 | width: 3px |
| 左侧标签 | 14px, 距节点 12px | 12px, 距节点 8px |
| 右侧标签 | 14px, 距节点 auto (右对齐) | 12px |
| 每级高度 | 48px | 40px |
| 当前级 | 标签 bold #A7F757, 节点亮绿 | 同左 |

### 4.3 带文字标签 Tab

水平布局 + 节点上方显示文字标签（胶囊按钮样式）。

| 属性 | 值 |
|------|-----|
| Tab 样式 | achieved: filled bg rgba(255,255,255,0.15), 白字; in-process: filled bg #A7F757, 黑字; not-achieve: border 1px rgba(255,255,255,0.2), 灰字 |
| Tab 圆角 | 9999px (pill) |
| Tab padding | 4px 12px |
| Tab 字号 | 12px |

---

## 5. DayCheckIn 每日签到

### 签到卡片

| 状态 | 背景 | 边框 | 图标 | 文字色 |
|------|------|------|------|--------|
| **missed** | rgba(255,255,255,0.05) | 1px solid rgba(255,255,255,0.1) | ☹ 灰色 | rgba(255,255,255,0.4) |
| **achieved** | rgba(255,255,255,0.05) | 1px solid rgba(167,247,87,0.4) | ✓ 绿色 filled | #FFFFFF |
| **today (in-process)** | rgba(167,247,87,0.15) | 2px solid #A7F757 | ✓ 绿色 filled | #A7F757 |
| **future** | rgba(255,255,255,0.05) | 1px solid rgba(255,255,255,0.1) | ✓ 灰色 outline | rgba(255,255,255,0.4) |

### 尺寸

| 属性 | Md (桌面) | Sm (H5) |
|------|-----------|---------|
| 卡片宽度 | 80px | 48px |
| 卡片高度 | 96px | 64px |
| 圆角 | 12px | 8px |
| 图标尺寸 | 32px | 20px |
| 文字字号 | 14px | 11px |
| 图标-文字间距 | 8px | 4px |
| 卡片间距 gap | 12px | 8px |

### today 卡片额外效果

- 背景: `rgba(167,247,87,0.15)` 亮绿半透明
- 边框: `2px solid #A7F757`
- 文字: `#A7F757` 亮绿色
- 可选: `box-shadow: 0 0 16px rgba(167,247,87,0.2)`

---

## CSS 变量扩展

```css
--progress-achieved: #A7F757;
--progress-current: #CFFF8A;
--progress-inactive: rgba(255, 255, 255, 0.15);
--progress-track: rgba(255, 255, 255, 0.1);
--progress-blue: #0068FF;
```

---

## 布局规格

### 桌面端 — 任务卡内使用

```
┌─ TaskCard ────────────────────────────────────────────────┐
│  Daily check-in + bonus boost    [Complete ↗]             │
│  描述文字...                                               │
│                                                           │
│  [Day1] [Day2] [Day3] [Day4★] [Day5] [Day6] [Day7]       │  ← DayCheckIn
│   ●━━━━━●━━━━━●━━━━━●━━━━━●─ ─ ─●─ ─ ─●                  │  ← 节点进度条
│                                                           │
│  Spot trading  1,000/200,000                              │  ← SimpleProgress
│  ████░░░░░░░░░░░░░░░░░░░░░░                               │
│                                                           │
│  Contract trading  200,000/200,000                        │
│  ██████████████████████████████                            │
└───────────────────────────────────────────────────────────┘
```

### 桌面端 — 水平里程碑

```
Total Trading Volume (USDT)
  50M    100M    150M    200M    250M    300M    350M    400M★    450M    500M
  ●━━━━━●━━━━━●━━━━━●━━━━━●━━━━━●━━━━━●━━━━━●━━━━━━●─ ─ ─ ─●─ ─ ─ ─●
  50      100     150     200     250     300     350     400       450     500
Total Prize Pool (USDT)
```

### H5 — 垂直里程碑

```
Total Trading Volume    Total Prize Pool
(USDT)                  (USDT)

●  50M ──────────────── 50
│
●  100M ────────────── 100
│
●  150M ────────────── 150
│
★  200M ────────────── 200  ← 当前
┊
○  300M ────────────── 300
┊
○  400M ────────────── 400
```

### H5 与桌面端差异

| 差异点 | 桌面端 | H5 |
|--------|--------|-----|
| 里程碑方向 | 水平 | **垂直** |
| Bar 粗细 | 4px | **3px** |
| Node 尺寸 | Md | **Sm** |
| DayCheckIn 卡片 | 80×96px | **48×64px** |
| 签到卡圆角 | 12px | **8px** |
| SimpleProgress 文字 | 16px | **14px** |
| 里程碑标签 | 12-14px | **10-12px** |
| 每级间距 (垂直) | 48px | **40px** |

---

## 数据接口

```typescript
type ProgressState = "achieved" | "in-process" | "not-achieve";
type NodeVariant = "dot" | "circle" | "icon";

interface MilestoneItem {
  id: string;
  state: ProgressState;
  rewardLabel: string;
  valueLabel: string;
  tabLabel?: string;
}

interface SimpleProgressProps {
  label: string;
  current: number;
  total: number;
  variant?: "green" | "blue";
  className?: string;
}

interface MilestoneProgressProps {
  items: MilestoneItem[];
  direction?: "horizontal" | "vertical";
  nodeVariant?: NodeVariant;
  className?: string;
}

type CheckInState = "missed" | "achieved" | "today" | "future";

interface CheckInDay {
  day: string;
  state: CheckInState;
}

interface DayCheckInProps {
  days: CheckInDay[];
  className?: string;
}
```

