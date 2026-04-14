# Phase B: 组件拆分与骨架转换

> 将 HTML 的 section 结构映射为 React 组件树，输出可运行的静态页面（无交互但布局完整）。
> Phase B 产出是后续 Phase C/D/E 的基础，必须保证「能跑」。

---

## 拆分原则

### 1. Section → 组件

每个顶级 `<section>` 或语义区块映射为一个独立组件：

```
HTML                          React 组件
<section id="v1-hero">    →   HeroSection/
<section id="h1-section">  →   VideoStripSection/
<div id="v2-section">      →   BoardingPassSection/
<section id="h2-section">  →   StationActivitySection/
```

### 2. 重复结构 → 列表组件 + Item 子组件

3+ 次相同结构 → 提取：

```
HTML: 5 个 <div class="h1-video-card">
  →  VideoCard 组件 + VideoCardList 容器
  →  数据从常量数组 map 渲染
```

### 3. Modal / Overlay → 独立组件 + Portal

所有 `position: fixed` 的浮层拆为独立组件，不嵌套在 section 内：

```
HTML: <div class="gm-overlay" id="cabin-rights-overlay">
  →  CabinRightsModal 组件
  →  使用 createPortal 挂载到 document.body
  →  open/onClose 通过 props 控制
```

### 4. 导航类 → 独立组件

```
HTML: <nav class="side-nav">       →  SideNav 组件
HTML: <nav class="mobile-tab-bar">  →  MobileTabBar 组件
```

### 5. 固定浮层 → 独立组件

```
HTML: <div id="flying-plane">        →  FlyingPlane 组件（GSAP 控制）
HTML: <div class="flight-decor ...">  →  FlightDecor 组件
```

---

## 拆分粒度判断

| 信号 | 拆还是不拆 |
|------|-----------|
| HTML 代码 > 80 行 | 拆 |
| 有独立的 JS 状态/交互 | 拆 |
| 有独立的 `@keyframes` / 动画 | 拆 |
| 被 innerHTML 动态渲染 | 拆（替换为 React 组件） |
| 纯展示、< 30 行 | 不拆，内联在父组件 |
| 只出现一次的装饰元素 | 不拆 |

### 过度拆分的信号

- 组件只有 5 行 JSX，没有自己的状态和样式 → 内联
- 拆出来的组件 props 比内容还多 → 不值得
- 只为了「看起来整洁」而拆 → 不拆

---

## 目录结构

### 单页面（常见活动页）

```
src/components/Gate13/
├── index.tsx                       ← 页面入口 + getStaticProps
├── Gate13Page.tsx                  ← 页面组件（组合所有 section）
├── page.module.css                 ← CSS 变量 + 页面级样式
├── types.ts                        ← 共享类型
├── constants.ts                    ← 数据常量（STATIONS, STEPS, etc.）
├── hooks/
│   ├── useCountdown.ts
│   ├── useIsLowEnd.ts
│   └── useWorldTourState.ts        ← 复杂状态（如果用 useReducer）
├── components/
│   ├── HeroSection/
│   │   ├── HeroSection.tsx
│   │   └── HeroSection.module.css
│   ├── VideoStripSection/
│   │   ├── VideoStripSection.tsx
│   │   ├── VideoStripSection.module.css
│   │   └── VideoCard.tsx
│   ├── BoardingPassSection/
│   │   ├── BoardingPassSection.tsx
│   │   ├── BoardingPassSection.module.css
│   │   ├── BoardingPassFront.tsx
│   │   └── BoardingPassBack.tsx
│   ├── StationActivitySection/
│   │   ├── StationActivitySection.tsx
│   │   ├── StationActivitySection.module.css
│   │   ├── StepNav.tsx
│   │   ├── QuizPanel.tsx
│   │   ├── LotteryPanel.tsx
│   │   └── CapsulePanel.tsx
│   ├── SideNav/
│   │   ├── SideNav.tsx
│   │   └── SideNav.module.css
│   ├── MobileTabBar/
│   │   ├── MobileTabBar.tsx
│   │   └── MobileTabBar.module.css
│   └── modals/
│       ├── CabinRightsModal.tsx
│       ├── CabinRulesModal.tsx
│       ├── CapsuleDetailModal.tsx
│       ├── TaskFullModal.tsx
│       ├── TaskRecordModal.tsx
│       └── LotteryResultModal.tsx
└── assets/                         ← 静态资源（或放 public/）
    ├── hero-bg-new2.png
    ├── plane.svg
    └── ...
```

### 资源文件放哪

| 类型 | 位置 | 原因 |
|------|------|------|
| 组件专属图片（< 10KB） | `components/X/` 同目录 | import 引用，webpack 处理 |
| 共享/大图片（> 10KB） | `public/assets/gate13/` | CDN 直接访问，next/image 优化 |
| SVG 图标 | `@gate/iconfont`（--gate） | 统一图标库 |
| 装饰 SVG（非图标） | `public/assets/gate13/` 或 React 组件 | 看复杂度 |

---

## 骨架转换步骤

### Step 1: 创建目录结构

根据 Phase A 的组件树，创建所有目录和空文件。

### Step 2: 页面入口

```tsx
// index.tsx
import type { GetStaticProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Gate13Page from './Gate13Page'

const Gate13: NextPage = () => <Gate13Page />

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'zh', ['common', 'gate13'])),
  },
})

export default Gate13
```

### Step 3: 页面组件（组合器）

```tsx
// Gate13Page.tsx
import type { FC } from 'react'
import styles from './page.module.css'
import { HeroSection } from './components/HeroSection/HeroSection'
import { VideoStripSection } from './components/VideoStripSection/VideoStripSection'
// ... 其他 section

const Gate13Page: FC = () => (
  <div className={styles.page}>
    <HeroSection />
    <VideoStripSection />
    {/* ... */}
  </div>
)

export default Gate13Page
```

### Step 4: 逐个 Section 转换

从上到下，逐个 section 转换：

1. **复制 HTML 结构** → JSX（class→className, 闭合标签等）
2. **inline style 原样保留为 JSX `style` prop**（不要提取为 CSS class！Phase C-1 再处理）
3. **图片路径** → `/assets/{feature}/xxx`（TSX 中用绝对路径，CSS 中不用 `url()` 引本地图片）
4. **文案** → 硬编码中文（Phase E 再提取 i18n）
5. **交互占位** → `onClick={() => {}}` 或 `// TODO: Phase E`

> **关键教训**：Phase B 不要尝试优化 inline style。保留原样能保证视觉一致。优化放到 Phase C-2。

### Step 5: 样式骨架

将 HTML `<style>` 中的 CSS 按组件拆分到各自的 `.module.css`：

- `.page` 变量块 → `page.module.css`
- 组件特有样式 → `Component.module.css`
- 全局重置 → 不迁移（项目已有）

---

## innerHTML 区块的骨架处理

innerHTML 渲染的区块在 Phase B **先用静态占位**，Phase E 再转为动态：

```tsx
// Phase B: 静态占位
const StationProgress: FC = () => (
  <div className={styles.progress}>
    {/* TODO: Phase E - 从 STATIONS 常量 map 渲染 */}
    <div className={styles.station}>
      <div className={styles.dot} />
      <span>日本站</span>
    </div>
    <div className={styles.connector} />
    <div className={styles.station}>
      <div className={styles.dot} />
      <span>巴黎站</span>
    </div>
  </div>
)
```

Phase E 替换为：

```tsx
const StationProgress: FC<{ stations: Station[] }> = ({ stations }) => (
  <div className={styles.progress}>
    {stations.map((s, i) => (
      <Fragment key={s.id}>
        <div className={clsx(styles.station, s.active && styles.stationActive)}>
          <div className={styles.dot} />
          <span>{s.name}</span>
        </div>
        {i < stations.length - 1 && <div className={styles.connector} />}
      </Fragment>
    ))}
  </div>
)
```

---

## Phase B 完成标准

- [ ] 所有 section 有对应的 React 组件
- [ ] 页面可以 `next dev` 运行，无 TypeScript/JSX 报错
- [ ] 布局结构与 HTML 一致（视觉上可能有差异，样式在 Phase C 细化）
- [ ] CSS 变量已定义在 `page.module.css`
- [ ] 图片路径可访问（`public/` 或 import）
- [ ] Modal 组件已拆出，暂时不渲染（`open={false}`）
- [ ] innerHTML 区块用静态占位
- [ ] 无 GSAP / ScrollTrigger 代码（Phase D 添加）
- [ ] 无交互逻辑（Phase E 添加）
