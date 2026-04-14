---
name: html-to-next
description: HTML to Next.js 高保真转换引擎 — 将独立 HTML 页面通过 7 阶段分步转换为 Next.js 生产代码
---

# HTML to Next.js — 高保真转换引擎

> 将独立 HTML 页面（含内联样式、脚本、外部依赖）转换为 Next.js 生产代码。
> 通过 **7 阶段分步转换** 替代一步到位，确保复杂动效和交互的还原度。

---

## 命令格式

```bash
/html-to-next <html-file> [options]
```

| 参数 | 说明 | 默认值 |
|------|------|--------|
| `<html-file>` | 源 HTML 文件路径 | 必填 |
| `--gate` | 启用 Gate.io 技术栈约束（CSS 变量体系、@gate/iconfont、next-i18next） | false |
| `--dry-run` | 仅输出转换计划，不生成代码 | false |
| `--out <dir>` | 输出目录 | `src/components/{Feature}/` |
| `--skip-i18n` | 跳过 i18n 提取 | false |
| `--keep-font` | 保留自定义字体引用（不替换为全局字体） | false |

---

## 7 阶段工作流

```
┌─────────────────────────────────────────────────────┐
│  Phase 0: 探测目标项目  → 技术栈 + 样式 + 动画约定    │
│  Phase A: 分析源 HTML   → 转换计划 + 依赖图谱         │
│  Phase B: 骨架          → 静态结构 → React 组件树     │
│  Phase C-1: 样式精确复制 → 源 CSS 1:1 → CSS Modules   │
│  ── 视觉验证检查点 ──    → 截图对比，必须通过 ──       │
│  Phase C-2: 样式优化    → 变量提取 + 字体清理（可选）  │
│  Phase D: 动效          → GSAP/CSS → React 生命周期   │
│  Phase E: 逻辑          → JS → React hooks            │
│  Phase F: 验证          → 截图对比 + lint              │
└─────────────────────────────────────────────────────┘
```

**关键原则：**
1. **先复制后优化** — Phase C-1 只改选择器名，不改样式值
2. **验证驱动** — C-1 完成必须截图对比，不通过不进 C-2
3. **每阶段可独立验证** — Phase B 能跑，Phase C-1 视觉一致
4. CSS 中**不用 url() 引用本地图片**，改用 TSX inline style

Phase 0 只需执行一次（同一目标项目复用结果）。
Phase B 产出的组件必须「能跑」（结构正确），
Phase C-1 产出必须「视觉一致」（与源 HTML 像素级相同）。

---

## Phase 详细流程

### Phase 0: 目标项目探测

**必读**: [strategies/target-project-analysis.md](./strategies/target-project-analysis.md)

1. 扫描目标项目的样式方案（CSS Modules / styled-components / emotion）
2. 检测状态管理（useState / zustand / mobx）
3. 检测数据获取（SWR / React Query / getServerSideProps）
4. 检测动画方案（GSAP 是否已安装、framer-motion、lottie）
5. 检测路由模式（Pages Router / App Router）
6. 盘点可复用的 hooks 和工具
7. 输出目标项目技术栈报告

**只需执行一次，同一目标项目的多次转换复用结果。**

### Phase A: 分析

**必读**: [strategies/analysis.md](./strategies/analysis.md)

1. 解析 HTML 文件，生成以下分类清单：
   - **结构**: sections、语义区块、组件边界
   - **依赖**: 外部 `<script src>`、`<link href>`、CDN、本地文件
   - **样式**: inline `<style>`、Tailwind config、CSS 变量、@keyframes
   - **动效**: CSS 动画、JS 动画、scroll-triggered、timer-based
   - **逻辑**: 状态管理、事件处理、DOM 操作、innerHTML 渲染
   - **资源**: 图片、字体、图标

2. 为每个分类项标注 **复杂度等级**（S/M/L）和 **转换策略**

3. 输出 **转换计划**（--dry-run 到此停止）

### Phase B: 骨架转换

**必读**: [strategies/component-split.md](./strategies/component-split.md)

1. 确定组件拆分方案（基于 Phase A 的结构分析）
2. 将 HTML section → React 组件（只转结构，不转逻辑）
3. 内联 `<style>` → `page.module.css` + `*.module.css`
4. 产出可运行的静态页面（无交互，但布局和样式完整）

**依赖处理规则**：

| HTML 中的依赖 | 转换动作 |
|--------------|---------|
| `design-toolkit.js` / `_toolkit/` | **剥离** — 开发工具，不进生产 |
| `dt-presets` JSON | **剥离** |
| `SC_REGISTRY` / `scRegister()` | **剥离** — showcase 注册 |
| `__TOOLKIT_LABELS__` / `__TOOLKIT__` | **剥离** — 工具面板配置 |
| Tailwind CDN + inline config | **提取** → CSS Modules（颜色/间距/圆角/keyframes 映射） |
| Google Fonts | **剥离**（--gate）或 **next/font**（--keep-font） |
| 本地 @font-face (.ttf/.woff2) | **剥离**（--gate）或 **next/font/local** |
| **GSAP CDN** | **npm 包** → `pnpm add gsap`，保留 GSAP，迁移到 React 生命周期。见 [patterns/gsap-scroll-trigger.md](./patterns/gsap-scroll-trigger.md) |
| **Swiper CDN** | **npm 包** → `pnpm add swiper`，使用 `swiper/react` |
| **Lottie CDN** | **npm 包** → `pnpm add lottie-react`，JSON 文件放 `public/` |
| Chart.js CDN | **npm 包** → `pnpm add chart.js react-chartjs-2` |
| CountUp / 其他动画库 | **npm 包** → 对应 React 封装 |
| 其他 CDN 库 | **评估** → npm 等价包 or 内联 |
| 本地 JS 文件（非 toolkit） | **分析** → 读取内容，按 Phase D/E 策略迁移 |
| 本地 CSS 文件 | **合并** → 目标项目的样式方案（CSS Modules / styled-components / emotion） |
| 图片/视频资源 | **保留路径** → `public/` 或 next/image，遵循资源命名规范 |
| 音频资源 | **保留** → `public/`，MP3 格式 |

> **动画库处理核心原则**: GSAP 是团队官方推荐的动效方案（见 [reference/motion-media-spec.md](./reference/motion-media-spec.md)），**保留 GSAP 而非替换为 CSS/IntersectionObserver**。

### Phase C: 样式迁移（分两步！）

**必读**: [strategies/css-migration.md](./strategies/css-migration.md)

> **铁律：先 1:1 精确复制源 CSS，只改选择器名。不改写任何样式值。验证视觉一致后再优化。**

**Phase C-1（精确复制）：**
1. 读取源 CSS 文件**完整内容**（不要只读片段）
2. 按组件拆分到各 `.module.css`，选择器重命名（`#id` / `.class` → `.camelCase`）
3. 样式值、伪元素、伪类、@keyframes、@media **全部原样保留**
4. CSS 中**不用 `url()` 引用本地图片**（改用 TSX inline style `backgroundImage`）
5. inline style 暂保留为 JSX `style` prop（可接受，视觉优先）

**Phase C-1 → 视觉验证 → 通过后才进 C-2**

**Phase C-2（可选优化）：**
- 硬编码颜色 → CSS 变量
- font-family → 删除（--gate）
- 重复样式 → 提取公共 class

### Phase D: 动效迁移

**必读**: [strategies/animation.md](./strategies/animation.md)

逐个动效按匹配的模式转换，不要批量处理：

| 源模式 | 目标模式 | 策略文档 |
|--------|---------|---------|
| **GSAP Timeline** | `useLayoutEffect` + `gsap.context` | [patterns/gsap-scroll-trigger.md](./patterns/gsap-scroll-trigger.md) 模式 D |
| **GSAP ScrollTrigger (pin/scrub)** | `useLayoutEffect` + `gsap.context` + ref | [patterns/gsap-scroll-trigger.md](./patterns/gsap-scroll-trigger.md) 模式 B/C |
| **GSAP 响应式分支** | `ScrollTrigger.matchMedia` | [patterns/gsap-scroll-trigger.md](./patterns/gsap-scroll-trigger.md) 模式 E/G |
| **Swiper CDN** | `swiper/react` npm 包 | 第三方库速查表 |
| **Lottie CDN** | `lottie-react` npm 包 | 第三方库速查表 |
| CSS @keyframes | CSS Modules @keyframes | [patterns/keyframes.md](./patterns/keyframes.md) |
| CSS transition | CSS Modules transition | 直接迁移 |
| IntersectionObserver | useRef + useEffect | [patterns/scroll-animation.md](./patterns/scroll-animation.md) |
| setInterval/setTimeout | useEffect + cleanup | [patterns/timer-animation.md](./patterns/timer-animation.md) |
| requestAnimationFrame | useRef + useEffect | [patterns/raf-animation.md](./patterns/raf-animation.md) |
| Canvas 动画 | React 组件 + useRef | [patterns/canvas.md](./patterns/canvas.md) |
| SVG 动画 | React SVG + CSS | [patterns/svg-animation.md](./patterns/svg-animation.md) |
| 伪元素动画 | CSS Modules 伪元素 | [patterns/pseudo-element.md](./patterns/pseudo-element.md) |
| Stagger 动画 | CSS delay / data-attr | [patterns/stagger.md](./patterns/stagger.md) |

> **动效性能分级参考**: [reference/motion-media-spec.md](./reference/motion-media-spec.md) — 按 P0(必须移除)/P1(条件降级)/P2(可保留) 分级

### Phase E: 逻辑迁移

**必读**: [strategies/js-to-react.md](./strategies/js-to-react.md)

| 源模式 | 目标模式 |
|--------|---------|
| 全局状态对象 `S = {...}` | useState / useReducer |
| `document.getElementById` + innerHTML | JSX 条件渲染 |
| `addEventListener('click')` | onClick props |
| `addEventListener('resize')` | useEffect + resize handler |
| `lockScroll` / `unlockScroll` | useEffect body overflow |
| Modal show/hide | useState + Portal |
| Toast 系统 | Context + Portal |
| 倒计时 | useCountdown hook |
| 桌面/移动双分支渲染 | 响应式组件 or useMediaQuery |
| 表单验证 | controlled components |
| fetch / API 调用 | SWR / React Query / getServerSideProps |

### Phase F: 验证

**必读**: [strategies/verification.md](./strategies/verification.md)

1. **构建检查**: `next build` 无报错
2. **Lint 检查**: ESLint + Stylelint 通过
3. **视觉对比**: 浏览器截图 HTML vs Next.js 页面
4. **交互验证**: 逐一验证 Phase A 中标记的交互点
5. **动效验证**: 逐一验证 Phase A 中标记的动效
6. **响应式**: 桌面 / 平板 / 移动端三个断点

---

## 与 ui-craft 的集成

当从 ui-craft 的 `--to-next` 命令触发时：

```
ui-craft --to-next <html>
  → 自动加 --gate
  → 自动读取 ui-craft 契约层规则（R1-R30）
  → 自动保存 baseline
  → 自动生成 className 映射注释
  → i18n namespace 从 ui-craft domain 推断
```

**Gate 技术栈约束（--gate 生效时）**：

| 约束 | 规则 | 参考 |
|------|------|------|
| 样式 | 跟随目标项目约定（CSS Modules / styled-components / emotion） | Phase 0 探测 |
| 字体 | **禁止声明 font-family**（Gate_Sans 全局已覆盖，只写 font-weight）。等宽字体（Menlo/monospace）例外。特殊装饰字体需确认后用 next/font/local | [reference/font-spec.md](./reference/font-spec.md) |
| 图标 | `@gate/iconfont`（禁止 emoji、禁止自定义 SVG） | — |
| i18n | `next-i18next` + `useTranslation` | — |
| 深浅模式 | `:global(.classic-dark)` 切换 | — |
| 动效 | 保留 GSAP（npm 包），按 P0/P1/P2 分级降级 | [reference/motion-media-spec.md](./reference/motion-media-spec.md) |
| 组件结构 | 视觉层 / 结构层 / 数据层 分离 | — |
| 减弱动效 | 必须包含 `prefers-reduced-motion` 处理 | — |

---

## 上下文加载规则

> 按阶段最小化加载，避免占用窗口。

| Phase | 必读 | 按需读 |
|-------|------|--------|
| 0 | target-project-analysis.md + 目标项目 package.json/src/ | — |
| A | analysis.md + 源 HTML + 外部 JS/CSS 文件 | — |
| B | component-split.md | css-migration.md（复杂样式时） |
| C | css-migration.md + reference/font-spec.md + **patterns/css-modules-pitfalls.md** | patterns/asset-paths.md |
| D | animation.md + patterns/gsap-scroll-trigger.md + reference/motion-media-spec.md | 其他 patterns/*.md |
| E | js-to-react.md | — |
| F | verification.md | — |

**不要一次性加载所有策略文档。**

---

## 输出结构

```
src/components/{Feature}/
├── index.tsx                    ← 页面入口（导出 + getStaticProps）
├── page.module.css              ← CSS 变量 + 页面级样式
├── {Feature}Page.tsx            ← 页面组件骨架
├── types.ts                     ← 类型定义
├── hooks/
│   ├── useCountdown.ts          ← 倒计时 hook（如有）
│   ├── use{Feature}Data.ts      ← 业务数据 hook
│   └── useMediaQuery.ts         ← 响应式 hook（如有）
├── components/
│   ├── HeroSection/
│   │   ├── HeroSection.tsx
│   │   └── HeroSection.module.css
│   ├── TaskCard/
│   │   ├── TaskCard.tsx
│   │   └── TaskCard.module.css
│   └── ...
├── context/
│   └── ToastContext.tsx          ← Toast 上下文（如有）
└── utils/
    └── format.ts                ← 工具函数（如有）
```

---

## 复杂度评估标准

| 等级 | HTML 行数 | 动效数 | JS 函数数 | innerHTML 渲染 | 预估 Phase 数 |
|------|----------|--------|----------|---------------|-------------|
| S（简单） | < 300 | 0-2 | 0-3 | 无 | A+B+C |
| M（中等） | 300-800 | 3-8 | 4-10 | 少量 | A+B+C+D |
| L（复杂） | 800+ | 8+ | 10+ | 大量 | A→F 全流程 |

S 级可以合并 Phase B+C 一步完成。
L 级必须严格分步，每步验证。

---

## 并行 Agent 协调规则

> 实测教训：并行 agent 各自独立工作，产出不一致会导致集成失败。

### 必须在每个 agent prompt 中包含的指令

```
1. 所有文件操作用绝对路径（不要用相对路径，cwd 可能不是目标项目）
2. 每个组件必须 export default（不要只用 named export）
3. CSS 精确复制源文件，只改选择器名，不改样式值
4. CSS 中不用 url() 引本地图片，改用 TSX inline style
5. HTML inline style 保留为 JSX style={{}}，不要提取为 CSS class
6. 图片路径以 / 开头（绝对路径）：src="/assets/{feature}/xxx"
```

### 页面组合器（Gate13Page.tsx 类）的处理

- agent 创建组合器时，**不要注释掉 import 和组件渲染**
- 如果组件还没创建，先用空壳占位 `const X = () => <div id="x" />`
- 组合器的 import 路径格式统一：`./components/SectionName/SectionName`

### 文件路径一致性

| 组件 | 文件路径 | import 路径 |
|------|---------|------------|
| HeroSection | `components/HeroSection/HeroSection.tsx` | `./components/HeroSection/HeroSection` |
| SideNav | `components/SideNav/SideNav.tsx` | `./components/SideNav/SideNav` |
| modals barrel | `components/modals/index.ts` | `./components/modals` |

---

## Hydration 安全规则

> 实测教训：SSR/CSR 不一致会导致页面白屏或 error overlay 挡住内容。

### 禁止在 SSR 中执行的代码

| 代码 | 问题 | 解决 |
|------|------|------|
| `Date.now()` / `new Date()` | SSR/CSR 时间不同 | 在 `useEffect` 中初始化，SSR 用 `0` 或固定占位 |
| `Math.random()` | 每次执行结果不同 | 用确定性算法（hash seed） |
| `window.innerWidth` | SSR 无 window | 用 `useEffect` + useState，SSR 默认值 |
| `<style>{动态字符串}</style>` | SSR HTML entity 编码不一致 | **禁止**。改用 CSS Modules 或 inline style |
| `navigator.userAgent` | SSR 无 navigator | 在 `useEffect` 中检测 |

### 倒计时组件的安全写法

```tsx
// ❌ 错误 — SSR 时 endTime - Date.now() 和 CSR 不同
const [remaining] = useState(endTime - Date.now())

// ✅ 正确 — SSR 输出固定占位，CSR 在 useEffect 中启动
const [remaining, setRemaining] = useState(0)
useEffect(() => {
  setRemaining(endTime - Date.now())
  // ... start timer
}, [endTime])
```

### suppressHydrationWarning

对于**必须在 SSR 和 CSR 不同**的内容（如格式化时间），可以加 `suppressHydrationWarning`：

```tsx
<span suppressHydrationWarning>{formatTime(now)}</span>
```

---

## 静态资源路径规则

> 详见 [patterns/asset-paths.md](./patterns/asset-paths.md)

核心规则：
- TSX `<img src>` — 用 `/assets/{feature}/xxx`（绝对路径，`/` 开头）
- CSS `background-image` — 用 TSX `style={{ backgroundImage: 'url(...)' }}`（不在 CSS 中写）
- CSS `mask-image` — 用 `/assets/{feature}/xxx`（绝对路径，Next.js 14 不 resolve）
- 伪元素 `background` — 优先 CSS 绝对路径 `url('/assets/...')`，不行改为真实 DOM 元素
