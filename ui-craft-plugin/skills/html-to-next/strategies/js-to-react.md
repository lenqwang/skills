# Phase E: JS 逻辑迁移

> 将 HTML 中的 vanilla JS（DOM 操作、事件监听、状态管理、innerHTML 渲染）迁移为 React 模式。
> 这是还原度丢失的第二大来源（第一是动效）。

---

## 核心原则

1. **声明式替代命令式** — `getElementById` + `innerHTML` → JSX + state
2. **组件即状态边界** — 每个组件管理自己的局部状态
3. **副作用集中** — 所有 DOM 操作、timer、listener 进 `useEffect`
4. **cleanup 必须** — 所有 useEffect 的 return 清理函数
5. **ref 替代 DOM 查询** — `useRef` 替代 `querySelector`

---

## 1. 全局状态对象 → React State

### Before

```javascript
const S = {
  activeStation: 'japan',
  activeStep: 1,
  expandedSteps: [],
  newsSlide: 0,
}
```

### After — 方案选择

**简单状态（≤5 个字段，单组件内）：** useState

```tsx
const [activeStation, setActiveStation] = useState('japan')
const [activeStep, setActiveStep] = useState(1)
const [expandedSteps, setExpandedSteps] = useState<number[]>([])
```

**复杂状态（多字段互相关联，跨组件）：** useReducer

```tsx
interface PageState {
  activeStation: string
  activeStep: number
  expandedSteps: number[]
}

type Action =
  | { type: 'SWITCH_STATION'; station: string }
  | { type: 'SWITCH_STEP'; step: number }
  | { type: 'TOGGLE_ACCORDION'; step: number }

function reducer(state: PageState, action: Action): PageState {
  switch (action.type) {
    case 'SWITCH_STATION':
      return { ...state, activeStation: action.station, activeStep: 1, expandedSteps: [] }
    case 'SWITCH_STEP':
      return { ...state, activeStep: action.step }
    case 'TOGGLE_ACCORDION': {
      const idx = state.expandedSteps.indexOf(action.step)
      return {
        ...state,
        expandedSteps: idx > -1
          ? state.expandedSteps.filter(s => s !== action.step)
          : [...state.expandedSteps, action.step]
      }
    }
  }
}
```

**跨组件共享状态：** Zustand（如果目标项目已有）

```tsx
// stores/useWorldTourStore.ts
import { create } from 'zustand'

interface WorldTourState {
  activeStation: string
  activeStep: number
  switchStation: (id: string) => void
  switchStep: (id: number) => void
}

export const useWorldTourStore = create<WorldTourState>((set) => ({
  activeStation: 'japan',
  activeStep: 1,
  switchStation: (id) => set({ activeStation: id, activeStep: 1 }),
  switchStep: (id) => set({ activeStep: id }),
}))
```

---

## 2. innerHTML 渲染 → JSX

**这是还原度丢失最多的地方。**

### Before

```javascript
function buildSidebarStations() {
  return STATIONS.map(s =>
    `<div class="station ${s.active ? 'active' : ''}" onclick="switchStation('${s.id}')">
      <span class="station-name">${s.name}</span>
      ${s.locked ? '<img class="lock" src="lock.svg">' : ''}
    </div>`
  ).join('')
}
document.getElementById('sidebar').innerHTML = buildSidebarStations()
```

### After

```tsx
const SidebarStations: FC<{ stations: Station[]; active: string; onSwitch: (id: string) => void }> = ({
  stations, active, onSwitch
}) => (
  <div className={styles.sidebar}>
    {stations.map(s => (
      <button
        key={s.id}
        className={clsx(styles.station, s.id === active && styles.stationActive)}
        onClick={() => onSwitch(s.id)}
      >
        <span className={styles.stationName}>{s.name}</span>
        {s.locked && <LockIcon className={styles.lock} />}
      </button>
    ))}
  </div>
)
```

### 转换步骤

1. **识别数据源** — HTML 字符串中引用了哪些变量/常量
2. **数据 → props** — 常量数组 → props，状态 → React state
3. **HTML 字符串 → JSX** — 逐行转换
   - `class=` → `className=`
   - `${}` 三元 → JSX 三元 / `&&`
   - `onclick="fn()"` → `onClick={() => fn()}`
   - 嵌套 innerHTML → 子组件
4. **事件处理 → props 回调** — `onclick="switchStation('japan')"` → `onClick={() => onSwitch('japan')}`
5. **样式 → CSS class** — 内联 style 和 Tailwind → CSS Modules

### innerHTML 中的颜色/变量

```javascript
// Before: JS 从 CSS 变量读取颜色用于 innerHTML
el.innerHTML = `<div style="color:${C.accent}">...</div>`
```

```tsx
// After: 直接用 CSS 变量，不需要 JS 中转
<div style={{ color: 'var(--c-accent)' }}>...</div>
// 或更好：
<div className={styles.accent}>...</div>
```

---

## 3. 事件监听 → React 事件 / useEffect

### DOM 事件 → JSX props

| HTML | React |
|------|-------|
| `onclick="fn()"` | `onClick={() => fn()}` |
| `onmouseenter` | `onMouseEnter` |
| `onmouseleave` | `onMouseLeave` |
| `onscroll` | `onScroll` |
| `onfocus` / `onblur` | `onFocus` / `onBlur` |

### 全局事件 → useEffect

```javascript
// Before
window.addEventListener('resize', handler)
document.addEventListener('keydown', handler)
```

```tsx
// After
useEffect(() => {
  const handler = (e: KeyboardEvent) => { /* ... */ }
  document.addEventListener('keydown', handler)
  return () => document.removeEventListener('keydown', handler)
}, [])
```

### Scroll 事件 → useEffect（注意性能）

```tsx
useEffect(() => {
  let ticking = false
  const handler = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        // 处理滚动
        ticking = false
      })
      ticking = true
    }
  }
  window.addEventListener('scroll', handler, { passive: true })
  return () => window.removeEventListener('scroll', handler)
}, [])
```

**更好**: 如果已有 GSAP ScrollTrigger，滚动逻辑放 ScrollTrigger 里，不要另外监听 scroll 事件。

---

## 4. DOM 操作 → ref / state

| 操作 | React 等价 |
|------|-----------|
| `getElementById(id).textContent = x` | `useState` → JSX `{value}` |
| `getElementById(id).innerHTML = html` | `useState` → JSX 条件/列表渲染 |
| `getElementById(id).style.x = y` | `useRef` + `.current.style` 或 state → `style` prop |
| `classList.add('active')` | state → `className={clsx(...)}` |
| `classList.toggle('open')` | `useState` toggle → `className` |
| `createElement + appendChild` | state 数组 → `map()` 渲染 |
| `element.remove()` | state 过滤 → 不渲染 |
| `querySelector` | `useRef` |
| `querySelectorAll` | 多个 `useRef` 或 `ref` 回调 |

---

## 5. 条件渲染分支

### 桌面/移动端双分支

```javascript
// Before
function renderDesktop() { ... }
function renderMobile() { ... }
function render() { renderDesktop(); renderMobile(); }
```

**方案 A: CSS 隐藏（SSR 友好，两套都渲染）**

```tsx
<div className={styles.desktop}><WorldTourDesktop /></div>
<div className={styles.mobile}><WorldTourMobile /></div>
```

**方案 B: JS 条件（只渲染一套）**

```tsx
const isMobile = useMediaQuery('(max-width: 768px)')
return isMobile ? <WorldTourMobile /> : <WorldTourDesktop />
```

选择原则见 `animation.md` 模式 8。

### 状态条件渲染

```javascript
// Before
if (S.activeStation === 'japan') {
  el.innerHTML = buildJapanContent()
} else if (S.activeStation === 'paris') {
  el.innerHTML = '<div>巴黎站即将开启</div>'
} else {
  el.innerHTML = '<div>该站点暂未开启</div>'
}
```

```tsx
// After
const content = useMemo(() => {
  switch (activeStation) {
    case 'japan': return <JapanContent />
    case 'paris': return <ComingSoon station="巴黎站" />
    default: return <Locked />
  }
}, [activeStation])
```

---

## 6. 数据常量 → types.ts + constants.ts

```javascript
// Before: 散落在 JS 中的常量
const STATIONS = [
  { id: 'japan', name: '日本站', active: true },
  { id: 'paris', name: '巴黎站', active: false },
]
const STEPS = [
  { id: 1, name: '登舱答题', desc: '获得登舱机票' },
  { id: 2, name: '立即抽奖', desc: '瓜分百万空投' },
]
const RULES = ['规则1...', '规则2...']
```

```tsx
// After: types.ts
export interface Station {
  id: string
  name: string
  active: boolean
}
export interface Step {
  id: number
  name: string
  desc: string
}

// After: constants.ts
import type { Station, Step } from './types'

export const STATIONS: Station[] = [
  { id: 'japan', name: '日本站', active: true },
  { id: 'paris', name: '巴黎站', active: false },
]
export const STEPS: Step[] = [
  { id: 1, name: '登舱答题', desc: '获得登舱机票' },
  { id: 2, name: '立即抽奖', desc: '瓜分百万空投' },
]
```

**i18n 文案** — 如果常量中有中文文案（如 RULES），且项目需要 i18n，提取到 `zh.json`：

```json
{
  "rules": {
    "1": "规则1...",
    "2": "规则2..."
  }
}
```

---

## 7. 自定义滚动 → 原生 / GSAP

### 自定义 easing 滚动

```javascript
// Before: 手写 easing scroll
function smoothScrollTo(target, duration, callback) {
  var start = window.scrollY
  var distance = target - start
  var startTime = performance.now()
  function ease(t) { return t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2,3)/2 }
  function tick(now) {
    var elapsed = (now - startTime) / duration
    if (elapsed >= 1) { window.scrollTo(0, target); callback?.(); return }
    window.scrollTo(0, start + distance * ease(elapsed))
    requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}
```

### After

**方案 A**: 原生 `scrollTo` + `behavior: smooth`（简单场景）

```tsx
const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
```

**方案 B**: GSAP `scrollTo` 插件（需要精确控制）

```tsx
import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
gsap.registerPlugin(ScrollToPlugin)

const scrollToSection = (target: number) => {
  gsap.to(window, {
    scrollTo: { y: target, autoKill: false },
    duration: 1.2,
    ease: 'power2.inOut',
  })
}
```

### 自动跳转逻辑（scroll hijack）

HTML 中的 `_h1AutoScroll`（滚动到某个位置后自动跳转到下一个 section）：

```javascript
// Before: scroll progress 到 15% 时自动跳转
if (p > 0.15 && p < 0.5 && !window._heroFwdDone) {
  window._heroFwdDone = true
  window._h1AutoScroll(target, 1200)
}
```

这种模式在 React 中通过 GSAP ScrollTrigger 的 `onUpdate` 回调保留：

```tsx
scrollTrigger: {
  onUpdate: (self) => {
    const p = self.progress
    if (p > 0.15 && p < 0.5 && !fwdDoneRef.current) {
      fwdDoneRef.current = true
      gsap.to(window, { scrollTo: { y: target }, duration: 1.2 })
    }
  }
}
```

**注意**: 用 `useRef` 替代 `window._heroFwdDone` 全局变量。

---

## 8. Tab/Accordion 交互

```javascript
// Before: tab 切换
document.querySelectorAll('.tp-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tp-tab').forEach(t => t.classList.remove('active'))
    tab.classList.add('active')
    currentCategory = tab.dataset.cat
    renderList()
  })
})
```

```tsx
// After
const [activeTab, setActiveTab] = useState('regular')

<div className={styles.tabs}>
  {CATEGORIES.map(cat => (
    <button
      key={cat.id}
      className={clsx(styles.tab, activeTab === cat.id && styles.tabActive)}
      onClick={() => setActiveTab(cat.id)}
    >
      {cat.label}
    </button>
  ))}
</div>
<TaskList category={activeTab} />
```

---

## 9. API 调用 / 数据获取

HTML 中如果有 `fetch` / `XMLHttpRequest`：

```javascript
// Before
fetch('/api/tasks').then(r => r.json()).then(data => {
  document.getElementById('task-list').innerHTML = data.map(renderTask).join('')
})
```

根据目标项目方案：

**SWR:**
```tsx
const { data: tasks } = useSWR('/api/tasks', fetcher)
return <div>{tasks?.map(task => <TaskItem key={task.id} {...task} />)}</div>
```

**getServerSideProps (SSR):**
```tsx
export const getServerSideProps: GetServerSideProps = async () => {
  const tasks = await fetchTasks()
  return { props: { tasks } }
}
```

---

## 迁移优先级

1. **常量/类型提取** — 最简单，先做
2. **状态定义** — 确定 useState / useReducer / zustand
3. **事件处理** — onclick → onClick
4. **条件渲染** — 替换 innerHTML 分支
5. **列表渲染** — map() 替换 innerHTML 拼接
6. **副作用** — timer / listener / scroll → useEffect
7. **DOM 操作** — 最后处理剩余的 ref 场景
