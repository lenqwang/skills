---
scope: [campaign]
layer: L2
---
# MysteryBox 盲盒抽奖组件

> 盲盒抽奖组件，包含奖池切换 Tab、主视觉舞台区（传送带 + 机械爪 + 盲盒）、操作栏、奖品轮播。
> 支持多奖池切换（普通 / 高级），主题颜色由 style 层控制，组件层只定结构和布局。
> 主视觉舞台区为图片素材区域，实际项目中通过背景图 + 盲盒图片资源实现。

---

## 组件结构

```
MysteryBox (.mystery-box)
│
├── Pool Tabs (.mb-tabs)
│   ├── Tab (.mb-tab)              ← "普通奖池" / "高级奖池"
│   │   └── Text + Indicator      ← active 状态底部 underline
│   └── Tab (.mb-tab) × N
│
├── Stage (.mb-stage)
│   ├── Background (.mb-stage-bg)  ← 背景图（传送带、星空等素材）
│   ├── Claw (.mb-claw)            ← 顶部机械爪图片素材
│   └── Boxes (.mb-boxes)          ← 5 个盲盒容器
│       └── Box (.mb-box) × 5     ← 单个盲盒（图片素材 + Gate logo）
│
├── Action Bar (.mb-actions)
│   ├── Left (.mb-action-link)     ← "更多机会" 文字链接
│   ├── Center (.mb-action-cta)    ← "抽盲盒 (N)" CTA 按钮
│   └── Right (.mb-action-link)    ← "获奖记录" 文字链接
│
└── Prize Carousel (.mb-prizes)
    ├── Arrow Left (.mb-prize-arrow.prev)  ← 左箭头（可选）
    ├── Track (.mb-prize-track)
    │   └── Prize Card (.mb-prize-card) × N
    │       ├── Image (.mb-prize-img)
    │       └── Name (.mb-prize-name)
    └── Arrow Right (.mb-prize-arrow.next) ← 右箭头（可选）
```

---

## Pool Tabs 规格

```
┌──────────────────────────────────────────────┐
│      普通奖池          高级奖池 ★            │
│      ────────                                │
└──────────────────────────────────────────────┘
```

| 属性 | Desktop | H5 |
|------|---------|------|
| 布局 | `display: flex; justify-content: center; gap: 32px` | `gap: 24px` |
| Tab 字号 | `16px / 600` | `14px / 600` |
| Tab 颜色（默认）| `rgba(255,255,255,0.5)` | 同 |
| Tab 颜色（active）| `var(--mb-tab-active)` 默认 `#FFFFFF` | 同 |
| Indicator | `width: 100%; height: 2px; background: var(--mb-tab-indicator)` | 同 |
| Indicator 位移 | `bottom: -8px` | `bottom: -6px` |
| 下间距 | `margin-bottom: 0`（与 Stage 无缝衔接） | 同 |
| 高级奖池图标 | Tab 文字后可选追加小星星 / 特殊标记 | 同 |

---

## Stage 主视觉区规格

> Stage 区域主要由运营提供的图片素材构成（传送带、机械爪、盲盒），
> 组件层只定义容器结构、宽高比例和 5 个盲盒的定位方式。

```
┌────────────────────────────────────────────────┐
│                    [机械爪]                     │
│                                                │
│   [盒1]   [盒2]   [盒3]   [盒4]   [盒5]       │
│                  (中间盒略大)                    │
│  ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○   │  ← 传送带
│ ──────────────────────────────────────────────  │
└────────────────────────────────────────────────┘
```

| 属性 | Desktop | H5 |
|------|---------|------|
| 容器宽度 | `100%` | `100%` |
| 宽高比 | `aspect-ratio: 16/9`（建议，实际由背景图决定） | 同 |
| 背景 | `background-image` 覆盖整个区域 | 同 |
| 背景尺寸 | `background-size: cover; background-position: center` | 同 |
| 盲盒布局 | 水平居中排列，中间盒略大（视觉透视效果由图片实现） | 同 |
| 圆角 | 由背景图或外层容器控制，常见 `12px` | `8px` |
| 溢出 | `overflow: hidden` | 同 |

### 图层素材清单

Stage 区域由以下图片图层叠加组成，存放在 `ui-craft-workspaces/campaign/assets/mystery-box/`：

| 图层 | 文件 | 说明 | z-index |
|------|------|------|---------|
| 外框 | `frame.png` | 金属质感外框（含铆钉、边框），作为容器定义尺寸 | 底层 |
| 星空 | `stars.png` | 黑色背景 + 白色星点，铺满内框区域 | 0 |
| 聚光灯 | `spotlight.png` | 白色锥形光束，居中顶部向下投射 | 2 |
| 传送带 | `belt.png` | 底部斜纹传送带表面 | 1 |
| 机械爪 | `claw.png` | 顶部居中，含横轨 + 圆形座 + 机械臂 + 三叉爪 | 3 |
| 普通盲盒 | `box-green.png` | 绿色透明 3D 盲盒（关闭态） | 4 |
| 高级盲盒 | `box-gold.png` | 金色不透明 3D 盲盒（关闭态） | 4 |
| 普通盲盒开 | `box-green-open.png` | 绿色盲盒（开盖揭奖态） | 4 |
| 高级盲盒开 | `box-gold-open.png` | 金色盲盒（开盖揭奖态） | 4 |

### 盲盒排列

- 5 个盲盒按视觉透视排列，中间盒最大（18%宽）、两侧递减（15.5% → 14%）
- 间距 `gap: 3%`
- 盒子带 `drop-shadow` 阴影增加立体感
- 颜色由运营素材决定：绿色（普通池）、金色（高级池）、主题色（节日活动）

### 图层叠加结构

```
mb-stage-frame (position: relative)
├── img (frame.png — 定义容器尺寸)
└── mb-stage-content (position: absolute, inset 偏移到内框区域)
    ├── mb-stage-stars     (z:0 — 星空背景)
    ├── mb-stage-belt      (z:1 — 传送带)
    ├── mb-stage-spotlight  (z:2 — 聚光灯)
    ├── mb-stage-claw      (z:3 — 机械爪)
    └── mb-stage-boxes     (z:4 — 5 个盲盒)
```

---

## Action Bar 操作栏规格

```
┌──────────────────────────────────────────────┐
│   更多机会      [ 抽盲盒 (2) ]      获奖记录  │
└──────────────────────────────────────────────┘
```

| 属性 | Desktop | H5 |
|------|---------|------|
| 布局 | `display: flex; align-items: center; justify-content: center` | 同 |
| 上间距 | `margin-top: 24px` | `16px` |
| 下间距 | `margin-bottom: 24px` | `16px` |

### 文字链接 (.mb-action-link)

| 属性 | Desktop | H5 |
|------|---------|------|
| 字号 | `14px / 400` | `13px / 400` |
| 颜色 | `rgba(255,255,255,0.5)` | 同 |
| hover | `color: #FFFFFF` | — |
| cursor | `pointer` | `pointer` |

### CTA 按钮 (.mb-action-cta)

| 属性 | Desktop | H5 |
|------|---------|------|
| 宽度 | `240px` | `200px` |
| 高度 | `48px` | `44px` |
| 圆角 | `24px`（胶囊形） | `22px` |
| 字号 | `16px / 700` | `15px / 700` |
| 颜色 | `var(--mb-cta-text)` 默认 `#FFFFFF` | 同 |
| 背景 | `var(--mb-cta-bg)` 默认透明 + border | 同 |
| 边框 | `1px solid var(--mb-cta-border)` | 同 |
| 左右间距 | `margin: 0 32px` | `0 20px` |

#### CTA 主题变体

- **普通池**：透明背景 + 绿色边框（`border-color: var(--accent)`）
- **高级池**：渐变背景或金色边框（`border-color: var(--accent)`）
- **节日主题**：主题色填充背景 + 深色文字
- 以上均由 style 层或 pool 切换时的 class 控制

---

## Prize Carousel 奖品轮播规格

```
┌────────────────────────────────────────────────┐
│ ‹  [图片]  [图片]  [图片]  [图片]  [图片]  ›  │
│    名称     名称    名称    名称    名称       │
└────────────────────────────────────────────────┘
```

| 属性 | Desktop | H5 |
|------|---------|------|
| 容器 | `overflow: hidden; position: relative` | 同 |
| 背景 | `var(--mb-prize-bg)` 默认 `rgba(255,255,255,0.04)` | 同 |
| 圆角 | `12px` | `8px` |
| padding | `20px 40px` | `16px 32px` |

### Prize Track

| 属性 | Desktop | H5 |
|------|---------|------|
| 布局 | `display: flex; gap: 0; overflow-x: auto; scroll-snap-type: x mandatory` | 同 |
| 滚动条 | 隐藏（`scrollbar-width: none`） | 同 |

### Prize Card

| 属性 | Desktop（普通池）| Desktop（高级池）| H5 |
|------|---------|---------|------|
| 宽度 | 等分（`flex: 0 0 calc(100%/5)`）| 等分（`flex: 0 0 calc(100%/3)`）| `flex: 0 0 calc(100%/3)` |
| 布局 | `flex-direction: column; align-items: center` | 同 | 同 |
| 图片尺寸 | `56px × 56px` | `80px × 80px` | `48px × 48px` |
| 图片圆角 | `8px` | `8px` | `6px` |
| 图片 object-fit | `contain` | `contain` | `contain` |
| 名称字号 | `12px / 400` | `13px / 400` | `11px / 400` |
| 名称颜色 | `rgba(255,255,255,0.7)` | 同 | 同 |
| 名称上间距 | `8px` | `8px` | `6px` |
| scroll-snap | `scroll-snap-align: start` | 同 | 同 |

### Arrow 导航箭头

| 属性 | 值 |
|------|------|
| 位置 | `position: absolute; top: 50%; transform: translateY(-50%)` |
| 左箭头 | `left: 8px` |
| 右箭头 | `right: 8px` |
| 尺寸 | `24px × 24px` |
| 颜色 | `rgba(255,255,255,0.5)` |
| hover | `color: #FFFFFF` |
| cursor | `pointer` |
| 隐藏条件 | 奖品不足一屏时隐藏 |

---

## CSS 变量

```css
/* Tab */
--mb-tab-active: #FFFFFF;
--mb-tab-indicator: var(--accent);

/* CTA */
--mb-cta-text: #FFFFFF;
--mb-cta-bg: transparent;
--mb-cta-border: var(--accent);

/* Prize */
--mb-prize-bg: rgba(255, 255, 255, 0.04);
--mb-prize-name-color: rgba(255, 255, 255, 0.7);
```

---

## 响应式布局

### Desktop (≥768px)

```
┌──────────────────────────────────────────────────────────┐
│                普通奖池        高级奖池 ★                 │
│                ────────                                   │
│ ┌──────────────────────────────────────────────────────┐ │
│ │              [主视觉舞台: 传送带+盲盒]                │ │
│ │              (背景图 cover, 16:9)                     │ │
│ └──────────────────────────────────────────────────────┘ │
│                                                          │
│      更多机会      [ 抽盲盒 (2) ]      获奖记录          │
│                                                          │
│ ┌──────────────────────────────────────────────────────┐ │
│ │  ‹  [奖品1] [奖品2] [奖品3] [奖品4] [奖品5]  ›      │ │
│ │     名称     名称    名称    名称    名称             │ │
│ └──────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────┘

容器: max-width: var(--space-container-max)，水平居中
无外边框: 组件融入页面背景
```

### H5 (<768px)

```
┌───────────────────────────────────┐
│      普通奖池     高级奖池 ★       │
│      ────────                      │
│ ┌─────────────────────────────────┐│
│ │    [主视觉舞台: 传送带+盲盒]    ││
│ └─────────────────────────────────┘│
│                                    │
│  更多机会  [ 抽盲盒 (2) ]  获奖记录│
│                                    │
│ ┌─────────────────────────────────┐│
│ │ ‹ [奖品1] [奖品2] [奖品3]  ›   ││
│ │   名称    名称    名称          ││
│ └─────────────────────────────────┘│
└───────────────────────────────────┘

容器: padding 0 16px
```

---

## 交互规格

| 行为 | 说明 |
|------|------|
| Pool 切换 | 点击 Tab 切换普通/高级奖池，Stage 和 Prize 区域内容随之更新 |
| CTA 点击 | 触发抽盲盒动作，括号内数字为剩余次数 |
| 抽盒动画 | 机械爪下降 → 抓取盒子 → 开盒揭奖（动画由业务层实现） |
| 奖品轮播 | 手指/鼠标可左右滑动，scroll-snap 吸附到整数位 |
| 箭头导航 | 点击左右箭头滚动一屏宽度 |
| 更多机会 | 点击跳转或打开弹窗（获取更多抽奖次数） |
| 获奖记录 | 点击跳转或打开弹窗（查看历史中奖记录） |

---

## 数据接口

```typescript
interface MysteryBoxProps {
  /** 奖池列表 */
  pools: Pool[];
  /** 当前选中奖池索引，默认 0 */
  activePoolIndex?: number;
  /** 剩余抽奖次数 */
  drawCount: number;
  /** 抽盒回调 */
  onDraw?: () => void;
  /** 更多机会回调 */
  onMoreChances?: () => void;
  /** 获奖记录回调 */
  onWinRecords?: () => void;
}

interface Pool {
  /** 奖池名称 */
  name: string;
  /** 奖池标识（如 'normal' | 'premium'） */
  type: string;
  /** 舞台背景图 URL */
  stageBgUrl: string;
  /** 盲盒图片 URL 列表（5 个） */
  boxImages: string[];
  /** 机械爪图片 URL */
  clawImageUrl: string;
  /** 奖品列表 */
  prizes: Prize[];
}

interface Prize {
  /** 奖品图片 URL */
  imageUrl: string;
  /** 奖品名称 */
  name: string;
  /** 奖品描述（可选，如 "38,888 USDT"） */
  description?: string;
}
```
