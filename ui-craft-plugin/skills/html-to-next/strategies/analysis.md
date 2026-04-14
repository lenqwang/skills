# Phase A: HTML 静态分析

> 转换的第一步：彻底理解源 HTML 的结构、依赖和复杂度，产出结构化的转换计划。
> **不写任何代码，只做分析。**

---

## 分析流程

```
1. 扫描外部依赖     →  依赖图谱
2. 解析样式体系     →  样式清单
3. 标记结构边界     →  组件拆分候选
4. 识别动效模式     →  动效清单
5. 分析 JS 逻辑    →  逻辑清单
6. 清点资源引用     →  资源清单
7. 评估复杂度       →  转换计划
```

---

## 1. 扫描外部依赖

逐行扫描 `<head>` 和 `<body>` 尾部，提取所有外部引用：

### 1.1 需要扫描的标签

```html
<!-- JS 依赖 -->
<script src="..."></script>
<script type="application/json" id="...">...</script>

<!-- CSS 依赖 -->
<link rel="stylesheet" href="...">
<link rel="preconnect" href="...">

<!-- 字体 -->
<link href="fonts.googleapis.com/...">

<!-- 内联配置 -->
<script> tailwind.config = {...} </script>
```

### 1.2 依赖分类表

对每个依赖标注 **类型** + **转换动作**：

| 类型 | 识别特征 | 转换动作 |
|------|---------|---------|
| **dev-tool** | `design-toolkit.js`, `_toolkit/`, `dt-presets`, `SC_REGISTRY`, `scRegister` | **剥离** — 不进生产 |
| **css-framework** | `tailwindcss.com`, inline `tailwind.config` | **提取** — config 值 → CSS Modules 变量 |
| **font-cdn** | `fonts.googleapis.com`, `fonts.gstatic.com` | **评估** — --gate 时剥离；否则 `next/font` |
| **chart-lib** | `chart.js`, `echarts`, `d3` | **npm 替代** — 对应 React 封装包 |
| **ui-lib** | `animate.css`, `swiper`, `aos` | **npm 替代** — 或用 CSS/React 原生实现 |
| **polyfill** | `intersection-observer`, `smoothscroll` | **评估** — 现代浏览器可能已支持 |
| **local-js** | 相对路径 `.js` 文件（非 toolkit） | **分析** — 按内容决定迁移策略 |
| **local-css** | 相对路径 `.css` 文件 | **合并** — 进 CSS Modules |
| **cdn-misc** | 其他 CDN 资源 | **逐个评估** |

### 1.3 Tailwind Config 提取

如果 HTML 使用了 Tailwind CDN + inline config：

```javascript
// 需要提取的配置项
tailwind.config = {
  theme: {
    extend: {
      colors: { ... },        // → CSS 变量 or CSS Modules 常量
      keyframes: { ... },     // → @keyframes in CSS Modules
      animation: { ... },     // → animation shorthand in CSS Modules
      screens: { ... },       // → @media 断点
      spacing: { ... },       // → CSS 变量
      borderRadius: { ... },  // → CSS 变量
      maxWidth: { ... },      // → CSS 变量
    }
  }
}
```

输出格式：

```
[Tailwind Config 提取]
- colors: 12 个自定义色值 → --c-* CSS 变量
- keyframes: 8 个动画定义 → @keyframes in CSS Modules
- animation: 8 个 shorthand → .animate-* classes
- screens: md(768px), lg(1248px) → @media 断点
```

### 1.4 本地文件依赖解析

对于引用的本地 JS/CSS 文件：

1. **读取文件内容**（不要跳过）
2. **分类功能**：工具函数 / 组件逻辑 / 样式 / 配置数据
3. **标注依赖关系**：该文件是否依赖其他文件、是否被 HTML 中的 JS 调用
4. **决定迁移策略**：整体迁移 / 拆分迁移 / 剥离

---

## 2. 解析样式体系

### 2.1 CSS 变量收集

从以下位置提取 CSS 变量定义：

```css
/* 位置 1: :root */
:root { --c-bg: #000; ... }

/* 位置 2: .page wrapper */
.page { --bg: #070808; ... }

/* 位置 3: 通过 JS getComputedStyle 读取的变量 */
function refreshVars() {
  C.bg = g('--bg');  // → 需要保留为 CSS 变量
}
```

输出：变量名 → 值 → 使用位置（CSS / JS / 两者）

### 2.2 样式来源分类

| 来源 | 转换目标 |
|------|---------|
| `<style>` 内 CSS 变量 | `page.module.css` 的 `.page {}` |
| `<style>` 内自定义 class | `*.module.css` 对应 class |
| `<style>` 内 @keyframes | `*.module.css` 内 @keyframes |
| `<style>` 内 @media | 保持，放入对应 module |
| `<style>` 内伪元素/伪类 | `*.module.css` 伪元素 |
| `<style>` 内全局重置 | 评估是否需要（Next.js 通常有 globals.css） |
| `<style>` 内滚动条样式 | `page.module.css` 或 globals |
| Tailwind utility class | CSS Modules 等价 class |
| inline style="" | 动态值 → style prop；静态值 → CSS Modules class |
| JS 注入的 style | React state → style prop or className toggle |

### 2.3 @keyframes 清单

列出所有 @keyframes：

```
@keyframes 名称 | 定义位置 | 引用位置 | 复杂度
flipY           | <style>  | .ticket-card hover | S
modal-in        | tailwind.config.keyframes | .animate-modal-in | S
ticker          | tailwind.config.keyframes | .animate-ticker (infinite) | M（infinite 需注意性能）
station-pulse   | tailwind.config.keyframes | .animate-station-pulse | S
```

### 2.4 Tailwind Class 统计

如果使用了 Tailwind：

1. 扫描所有 Tailwind utility class
2. 按组件/section 分组统计
3. 识别高频复合模式（如 `flex items-center gap-2`）
4. 标记需要特殊处理的 class（arbitrary values `[...]`、`@apply` 等）

---

## 3. 标记结构边界

### 3.1 组件拆分候选

按以下规则识别组件边界：

1. **`<section>` 标签** — 每个顶级 section 是一个组件候选
2. **`id` 属性** — 有 id 的容器通常是独立单元
3. **重复结构** — 3+ 次相同结构 → 列表组件 + item 子组件
4. **Modal / Overlay** — 固定定位的浮层 → 独立组件 + Portal
5. **Toast container** — toast-root → Context + Portal
6. **响应式双分支** — desktop/mobile 各一套 DOM → 单组件 + 响应式 CSS 或 useMediaQuery

### 3.2 输出格式

```
[组件树]
├── {Feature}Page              ← 页面根
│   ├── BannerSection          ← <section> banner
│   │   ├── StationProgress    ← #banner-stations (JS 渲染)
│   │   └── Countdown          ← 倒计时区块
│   ├── NewsSection            ← <section> news
│   │   ├── NewsList           ← 左侧列表
│   │   └── VideoPlayer        ← 右侧视频
│   ├── WorldTourSection       ← <section> world-tour
│   │   ├── WorldTourDesktop   ← 桌面布局（lg+）
│   │   └── WorldTourMobile    ← 移动布局（<lg）
│   └── RulesSection           ← <section> rules
├── ConfirmModal               ← Portal
├── ToastProvider              ← Context + Portal
└── hooks/
    ├── useCountdown
    └── useWorldTourState
```

### 3.3 innerHTML 渲染块标记

**关键**：这是还原度丢失的主要来源。

逐个标记所有 innerHTML 渲染：

```
[innerHTML 渲染清单]
ID/选择器                | 渲染函数           | 数据来源        | 转换策略
#banner-stations         | renderBannerStations() | STATIONS 常量 | → StationProgress 组件 + map()
#news-list-body          | (inline)           | NEWS_IMAGES    | → NewsList 组件 + map()
#wt-sidebar-stations     | buildSidebarStations() | STATIONS    | → SidebarStations 组件
#wt-desk-content         | buildStepContent() | S.activeStep   | → 条件渲染 switch/map
#wt-mob-accordion        | (inline)           | STEPS + S      | → Accordion 组件
#rules-list              | (inline)           | RULES 常量     | → RulesList 组件 + map()
```

---

## 4. 识别动效模式

### 4.1 分类扫描

**CSS 动画**（扫描 `<style>` + Tailwind config）：
- @keyframes 定义
- animation 属性使用
- transition 属性使用
- transform 使用
- opacity 变化
- filter 变化（blur, brightness）

**JS 动画**（扫描 `<script>`）：
- `requestAnimationFrame`
- `setInterval` / `setTimeout`（用于动画）
- `.style.transform = ...`
- `.style.opacity = ...`
- `.classList.add/remove/replace`（动画 class 切换）
- `animate()` Web Animations API

**滚动相关**：
- `IntersectionObserver`
- `scroll` event listener
- `scrollTo` / `scrollIntoView`
- CSS `scroll-behavior`

**状态驱动动画**：
- hover/focus/active 伪类
- class 切换触发的 transition
- 展开/收起（height auto 动画）

### 4.2 输出格式

```
[动效清单]
# | 名称 | 类型 | 触发方式 | 复杂度 | 迁移策略
1 | 倒计时翻转 | CSS @keyframes | setInterval 1s | M | useCountdown + CSS transition
2 | Modal 弹入 | CSS animation | class toggle | S | useState + CSS Modules animation
3 | Toast 滑入/滑出 | CSS animation | JS class toggle | M | Portal + state + CSS animation
4 | 自动轮播 | JS setInterval | timer 5s | M | useEffect + useRef + state
5 | 站点脉冲 | CSS animation infinite | 持续 | S | CSS Modules @keyframes
6 | Stagger 入场 | CSS animation-delay | 页面加载 | S | CSS Modules delay classes
7 | 卡片 hover 上浮 | CSS transition | :hover | S | CSS Modules :hover
8 | 座位地图交互 | CSS transition + JS | click | L | React state + CSS Modules
```

---

## 5. 分析 JS 逻辑

### 5.1 状态管理识别

```javascript
// 常见模式 1: 全局状态对象
const S = { activeStation: 'japan', activeStep: 1, expandedSteps: [] }

// 常见模式 2: 散落的全局变量
let currentSlide = 0;
let isPlaying = false;

// 常见模式 3: DOM 即状态
// element.classList.contains('active') 作为状态判断
```

对每个状态标注：名称、类型、修改点、读取点 → 映射到 React 状态方案

### 5.2 事件处理识别

```
[事件清单]
事件 | 目标 | 处理函数 | 转换方式
click | .btn-cta | track('cta_click') | onClick prop
click | modal background | closeModalOnBg() | onClick + e.target check
resize | window | renderBannerStations (debounced) | useEffect + resize
keydown | document | ESC close modal | useEffect + keydown
mouseenter/leave | toast | pause/resume timer | onMouseEnter/Leave
scroll | window | (如有) | useEffect + scroll
```

### 5.3 DOM 操作分类

| 操作类型 | 示例 | React 等价 |
|---------|------|-----------|
| `getElementById` + `textContent` | 倒计时更新 | state → JSX |
| `getElementById` + `innerHTML` | 组件渲染 | JSX 条件/列表渲染 |
| `createElement` + `appendChild` | Toast 创建 | Portal + state |
| `classList.add/remove` | Modal 显隐 | state → className |
| `style.setProperty` | 动态主题 | CSS 变量 + state |
| `querySelector` | 元素查找 | useRef |
| `body.style` | scroll lock | useEffect |

### 5.4 数据常量提取

```javascript
// 需要提取为单独文件的常量
const STATIONS = [...]     → constants.ts or types.ts
const STEPS = [...]        → constants.ts
const RULES = [...]        → i18n JSON（如文案）or constants.ts（如配置）
const NEWS_IMAGES = [...]  → constants.ts
const TIER = {...}         → types.ts + constants.ts
```

---

## 6. 资源清单

| 资源类型 | 扫描位置 | 处理方式 |
|---------|---------|---------|
| 图片 `<img src>` | HTML + innerHTML | 收集路径 → public/ or next/image |
| 背景图 `url()` | CSS | 收集路径 → public/ |
| SVG inline | HTML | 评估：小图标 → @gate/iconfont；装饰 SVG → React 组件 |
| SVG 占位 | HTML (placeholder) | 标记为待替换 |
| 视频 `<video>` | HTML | next/video or native |
| favicon | `<link rel="icon">` | 移至 public/ |

---

## 7. 转换计划输出格式

分析完成后，输出以下结构化计划：

```markdown
# 转换计划: {Feature}

## 概览
- 源文件: xxx.html ({N} 行)
- 复杂度: S/M/L
- 预计组件数: {N}
- 预计 Phase: A→{最后阶段}

## 依赖处理
| 依赖 | 动作 | 备注 |
|------|------|------|
| design-toolkit.js | 剥离 | |
| tailwindcss CDN | 提取 config | 12 色值 + 8 keyframes |
| JetBrains Mono | next/font | 倒计时区域使用 |

## 组件树
(树形结构)

## 样式迁移
- CSS 变量: {N} 个
- @keyframes: {N} 个
- Tailwind classes: ~{N} 个 unique
- 自定义 classes: {N} 个

## 动效清单
(表格)

## innerHTML 渲染块
(表格 — 最影响还原度的部分)

## JS 逻辑迁移
- 状态点: {N} 个
- 事件: {N} 个
- DOM 操作: {N} 处

## 风险点
- (列出可能导致还原度丢失的具体点)

## 建议执行顺序
Phase B → C → D → E → F
(或 S 级: B+C 合并 → F)
```

---

## 分析阶段的质量标准

- [ ] 所有外部 `<script src>` 和 `<link href>` 已分类
- [ ] 所有本地引用文件已读取并分析
- [ ] Tailwind config（如有）已完整提取
- [ ] 所有 innerHTML 渲染块已标记（最重要）
- [ ] 所有 @keyframes 已列出
- [ ] 所有 JS 动画函数已标记
- [ ] 所有状态变量已识别
- [ ] 组件树已画出
- [ ] 复杂度评估合理
- [ ] 风险点已标注
