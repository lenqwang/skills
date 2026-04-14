# Phase D: 动效迁移策略

> 动效是 HTML → Next.js 还原度丢失的最大来源。
> 本文档定义每种动效模式的精确转换方法，附带 before/after 代码。

---

## 核心原则

1. **逐个迁移，不要批量** — 一次处理一个动效，验证后再处理下一个
2. **CSS 优先** — 能纯 CSS 实现的不要引入 JS
3. **cleanup 必须** — 所有 useEffect 中的 timer/observer/listener 必须在 return 中清理
4. **reduced-motion** — 每个动效都要有 `prefers-reduced-motion` 降级

---

## 模式 1: CSS @keyframes

### 场景

HTML 中定义了 @keyframes，在 CSS class 中通过 `animation` 引用。

### Before (HTML)

```css
/* <style> 或 tailwind.config.keyframes */
@keyframes modal-in {
  0% { opacity: 0; transform: scale(.95) translateY(8px); }
  100% { opacity: 1; transform: scale(1) translateY(0); }
}
@keyframes station-pulse {
  0%, 100% { transform: scale(1); opacity: .5; }
  50% { transform: scale(1.4); opacity: 0; }
}

.animate-modal-in { animation: modal-in 200ms ease-out; }
.animate-station-pulse { animation: station-pulse 2s ease-in-out infinite; }
```

### After (CSS Modules)

```css
/* Component.module.css */

/* CSS Modules 会自动 hash @keyframes 名称，
   同一文件内引用时自动匹配，无需 :global */
@keyframes modalIn {
  0% { opacity: 0; transform: scale(.95) translateY(8px); }
  100% { opacity: 1; transform: scale(1) translateY(0); }
}
@keyframes stationPulse {
  0%, 100% { transform: scale(1); opacity: .5; }
  50% { transform: scale(1.4); opacity: 0; }
}

.modalIn { animation: modalIn 200ms ease-out; }
.stationPulse { animation: stationPulse 2s ease-in-out infinite; }

/* reduced-motion */
@media (prefers-reduced-motion: reduce) {
  .modalIn { animation: none; opacity: 1; transform: none; }
  .stationPulse { animation: none; opacity: .5; }
}
```

### 陷阱

- **跨文件引用**: 如果 @keyframes 在 `page.module.css` 定义但在 `Child.module.css` 引用 → 不行。每个 module 文件需要自己定义使用的 @keyframes，或放到 globals.css 用 `:global`
- **JS 动态切换 animation class**: 用 className 条件渲染即可
- **animation-delay stagger**: 用 `style={{ animationDelay: \`${index * 50}ms\` }}` inline

---

## 模式 2: CSS Transition + Class Toggle

### 场景

HTML 中通过 JS 添加/移除 class 触发 CSS transition。

### Before (HTML)

```css
.modal-overlay { opacity: 0; pointer-events: none; transition: opacity 200ms; }
.modal-overlay.active { opacity: 1; pointer-events: auto; }
```

```javascript
function showModal(id) {
  document.getElementById(id).classList.add('active');
}
```

### After (React + CSS Modules)

```css
/* Modal.module.css */
.overlay {
  opacity: 0;
  pointer-events: none;
  transition: opacity 200ms ease;
}
.overlayActive {
  opacity: 1;
  pointer-events: auto;
}
```

```tsx
// Modal.tsx
const Modal: FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  return (
    <div
      className={`${styles.overlay} ${open ? styles.overlayActive : ''}`}
      onClick={onClose}
    >
      {/* content */}
    </div>
  )
}
```

### 进阶: 退出动画

如果 Modal 有退出动画（animate-modal-out），需要延迟 unmount：

```tsx
const [shouldRender, setShouldRender] = useState(false)
const [isVisible, setIsVisible] = useState(false)

useEffect(() => {
  if (open) {
    setShouldRender(true)
    // 下一帧再设 visible，确保 transition 触发
    requestAnimationFrame(() => setIsVisible(true))
  } else {
    setIsVisible(false)
    // 等 transition 结束再卸载
    const timer = setTimeout(() => setShouldRender(false), 200)
    return () => clearTimeout(timer)
  }
}, [open])

if (!shouldRender) return null
return <div className={`${styles.overlay} ${isVisible ? styles.overlayActive : ''}`}>...</div>
```

---

## 模式 3: 倒计时 (setInterval)

### 场景

HTML 中用 setInterval 每秒更新倒计时 DOM。

### Before (HTML)

```javascript
const END = Date.now() + 86400000;
function pad(n) { return String(n).padStart(2, '0'); }
function updateCountdown() {
  const d = Math.max(0, END - Date.now());
  document.getElementById('cd-d').textContent = pad(Math.floor(d / 864e5));
  document.getElementById('cd-h').textContent = pad(Math.floor((d % 864e5) / 36e5));
  document.getElementById('cd-m').textContent = pad(Math.floor((d % 36e5) / 6e4));
  document.getElementById('cd-s').textContent = pad(Math.floor((d % 6e4) / 1e3));
}
setInterval(updateCountdown, 1000);
```

### After (React Hook)

```ts
// hooks/useCountdown.ts
import { useState, useEffect, useRef } from 'react'

interface CountdownValues {
  days: string
  hours: string
  minutes: string
  seconds: string
  isExpired: boolean
}

function pad(n: number): string {
  return String(n).padStart(2, '0')
}

export function useCountdown(endTime: number): CountdownValues {
  const [remaining, setRemaining] = useState(() => Math.max(0, endTime - Date.now()))
  const rafRef = useRef<number>(0)
  const lastTickRef = useRef(0)

  useEffect(() => {
    // 用 rAF 替代 setInterval — 标签页不可见时自动暂停，省电
    function tick(now: number) {
      if (now - lastTickRef.current >= 1000 || lastTickRef.current === 0) {
        lastTickRef.current = now
        const diff = Math.max(0, endTime - Date.now())
        setRemaining(diff)
        if (diff <= 0) return
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [endTime])

  return {
    days: pad(Math.floor(remaining / 864e5)),
    hours: pad(Math.floor((remaining % 864e5) / 36e5)),
    minutes: pad(Math.floor((remaining % 36e5) / 6e4)),
    seconds: pad(Math.floor((remaining % 6e4) / 1e3)),
    isExpired: remaining <= 0,
  }
}
```

```tsx
// Countdown.tsx
const Countdown: FC<{ endTime: number }> = ({ endTime }) => {
  const { days, hours, minutes, seconds } = useCountdown(endTime)
  return (
    <div className={styles.countdown}>
      <div className={styles.block}><span>{days}</span><p>天</p></div>
      <span className={styles.separator}>:</span>
      {/* ... */}
    </div>
  )
}
```

### 性能注意

- 用 `requestAnimationFrame` 替代 `setInterval` — 标签页后台时自动降频
- 不要每 100ms 更新，1s 足够（除非做毫秒级动画）
- `endTime` 来自 props 或 server，不要硬编码

---

## 模式 4: 自动轮播 (setInterval + DOM)

### 场景

HTML 中用 setInterval 自动切换 slide，鼠标 hover 暂停。

### Before (HTML)

```javascript
let currentSlide = 0;
let autoTimer = setInterval(() => {
  switchSlide((currentSlide + 1) % slides.length);
}, 5000);
el.addEventListener('mouseenter', () => clearInterval(autoTimer));
el.addEventListener('mouseleave', () => {
  autoTimer = setInterval(() => {
    switchSlide((currentSlide + 1) % slides.length);
  }, 5000);
});
```

### After (React Hook)

```ts
// hooks/useAutoSlide.ts
import { useState, useEffect, useCallback, useRef } from 'react'

export function useAutoSlide(total: number, interval = 5000) {
  const [current, setCurrent] = useState(0)
  const pausedRef = useRef(false)
  const timerRef = useRef<ReturnType<typeof setInterval>>()

  const next = useCallback(() => {
    setCurrent(prev => (prev + 1) % total)
  }, [total])

  const goTo = useCallback((index: number) => {
    setCurrent(index)
  }, [])

  useEffect(() => {
    timerRef.current = setInterval(() => {
      if (!pausedRef.current) next()
    }, interval)
    return () => clearInterval(timerRef.current)
  }, [next, interval])

  const pause = useCallback(() => { pausedRef.current = true }, [])
  const resume = useCallback(() => { pausedRef.current = false }, [])

  return { current, next, goTo, pause, resume }
}
```

```tsx
// VideoPlayer.tsx
const VideoPlayer: FC<{ items: SlideItem[] }> = ({ items }) => {
  const { current, goTo, pause, resume } = useAutoSlide(items.length)

  return (
    <div onMouseEnter={pause} onMouseLeave={resume}>
      {items.map((item, i) => (
        <div key={i} className={i === current ? styles.slideActive : styles.slide}>
          {/* ... */}
        </div>
      ))}
      <div className={styles.dots}>
        {items.map((_, i) => (
          <button
            key={i}
            className={i === current ? styles.dotActive : styles.dot}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  )
}
```

---

## 模式 5: Toast 系统 (createElement + animate)

### 场景

HTML 中动态创建 Toast DOM，加入动画 class，自动消失。

### Before (HTML)

```javascript
function showToast(msg, type = 'success') {
  const el = document.createElement('div');
  el.className = 'animate-toast-in ...';
  el.innerHTML = `<div class="px-5 py-3">${msg}</div>...`;
  document.getElementById('toast-root').appendChild(el);
  setTimeout(() => {
    el.classList.replace('animate-toast-in', 'animate-toast-out');
    setTimeout(() => el.remove(), 150);
  }, 3000);
}
```

### After (React Context + Portal)

```tsx
// context/ToastContext.tsx
import { createContext, useContext, useState, useCallback, useRef, type FC, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import styles from './Toast.module.css'

interface Toast {
  id: number
  message: string
  type: 'success' | 'error' | 'warning'
  exiting?: boolean
}

interface ToastContextValue {
  showToast: (message: string, type?: Toast['type']) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)
export const useToast = () => useContext(ToastContext)!

const DURATION = 3000
const EXIT_MS = 150

export const ToastProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([])
  const idRef = useRef(0)

  const showToast = useCallback((message: string, type: Toast['type'] = 'success') => {
    const id = ++idRef.current
    setToasts(prev => [...prev.slice(-2), { id, message, type }]) // 最多 3 条

    setTimeout(() => {
      setToasts(prev => prev.map(t => t.id === id ? { ...t, exiting: true } : t))
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id))
      }, EXIT_MS)
    }, DURATION)
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {typeof document !== 'undefined' && createPortal(
        <div className={styles.container}>
          {toasts.map(toast => (
            <div
              key={toast.id}
              className={`${styles.toast} ${styles[toast.type]} ${toast.exiting ? styles.exit : styles.enter}`}
            >
              {toast.message}
            </div>
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  )
}
```

```css
/* Toast.module.css */
.container {
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 50;
  display: flex;
  flex-direction: column;
  gap: 8px;
  pointer-events: none;
}
.toast {
  pointer-events: auto;
  border-radius: 12px;
  padding: 12px 20px;
  font-size: 14px;
}
.enter { animation: toastIn 200ms ease-out; }
.exit { animation: toastOut 150ms ease-in forwards; }

@keyframes toastIn {
  from { opacity: 0; transform: translateX(100%); }
  to { opacity: 1; transform: translateX(0); }
}
@keyframes toastOut {
  from { opacity: 1; transform: translateX(0); }
  to { opacity: 0; transform: translateX(100%); }
}

@media (prefers-reduced-motion: reduce) {
  .enter, .exit { animation: none; }
  .enter { opacity: 1; }
  .exit { opacity: 0; }
}
```

---

## 模式 6: Modal 系统 (show/hide + scroll lock)

### Before (HTML)

```javascript
function lockScroll() {
  const y = window.scrollY;
  document.body.style.position = 'fixed';
  document.body.style.top = `-${y}px`;
  document.body.style.width = '100%';
  document.body.dataset.scrollY = y;
}
function unlockScroll() {
  const y = document.body.dataset.scrollY;
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';
  window.scrollTo(0, parseInt(y || '0'));
}
function showModal(id) {
  document.getElementById(id).classList.remove('hidden');
  lockScroll();
}
function hideModal(id) {
  document.getElementById(id).classList.add('hidden');
  unlockScroll();
}
```

### After (React Hook + Component)

```ts
// hooks/useScrollLock.ts
import { useEffect } from 'react'

export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return
    const scrollY = window.scrollY
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = '100%'

    return () => {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      window.scrollTo(0, scrollY)
    }
  }, [locked])
}
```

```tsx
// Modal.tsx
const Modal: FC<{ open: boolean; onClose: () => void; children: ReactNode }> = ({ open, onClose, children }) => {
  useScrollLock(open)

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onClose])

  if (!open) return null
  return createPortal(
    <div className={styles.overlay} onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className={styles.modal}>
        {children}
      </div>
    </div>,
    document.body
  )
}
```

---

## 模式 7: innerHTML 渲染块 → JSX 组件

### 场景

HTML 中通过 JS 函数拼接 HTML 字符串，注入到 DOM。**这是还原度丢失最多的地方。**

### Before (HTML)

```javascript
function renderBannerStations() {
  const el = document.getElementById('banner-stations');
  let h = '<div class="flex items-center justify-center gap-2">';
  STATIONS.forEach((s, i) => {
    h += `<div class="flex items-center gap-2">
      <div class="w-3 h-3 rounded-full ${s.active ? 'bg-accent' : 'bg-white/20'}"></div>
      <span class="${s.active ? 'text-white font-semibold' : 'text-white/50'}">${s.name}</span>
    </div>`;
    if (i < STATIONS.length - 1) h += '<div class="w-8 h-px bg-white/20"></div>';
  });
  h += '</div>';
  el.innerHTML = h;
}
```

### After (React)

```tsx
// StationProgress.tsx
interface Station { id: string; name: string; active: boolean }

const StationProgress: FC<{ stations: Station[] }> = ({ stations }) => (
  <div className={styles.progress}>
    {stations.map((station, i) => (
      <Fragment key={station.id}>
        <div className={styles.station}>
          <div className={station.active ? styles.dotActive : styles.dot} />
          <span className={station.active ? styles.labelActive : styles.label}>
            {station.name}
          </span>
        </div>
        {i < stations.length - 1 && <div className={styles.connector} />}
      </Fragment>
    ))}
  </div>
)
```

### 转换步骤

1. **识别数据源** — innerHTML 函数中引用的数据常量/状态
2. **提取为 props/state** — 常量 → props，状态 → useState/useReducer
3. **HTML 字符串 → JSX** — 逐行转换，注意：
   - `class=` → `className=`
   - 模板字面量条件 `${x ? 'a' : 'b'}` → JSX 三元
   - `innerHTML` 嵌套 → 子组件
   - 事件绑定 `onclick="fn()"` → `onClick={() => fn()}`
4. **Tailwind class → CSS Modules class** — 如果在 Phase C 已完成
5. **验证** — 对比渲染结果

### innerHTML 中的颜色引用

HTML 常见模式：JS 从 CSS 变量读取颜色用于 innerHTML：

```javascript
// Before
function refreshVars() {
  const s = getComputedStyle(document.querySelector('.page'));
  C.accent = s.getPropertyValue('--accent').trim();
}
// 然后在 innerHTML 中: style="color:${C.accent}"
```

转换策略：**在 JSX 中直接用 CSS 变量**

```tsx
// After — 不需要读取 CSS 变量到 JS
<span style={{ color: 'var(--accent)' }}>{value}</span>

// 或更好：CSS Modules class
<span className={styles.accent}>{value}</span>
```

---

## 模式 8: 响应式双分支渲染

### 场景

HTML 中桌面和移动端是两套完全不同的 DOM，通过 JS 判断或 CSS display 切换。

### Before (HTML)

```javascript
function renderWorldTourDesktop() {
  document.getElementById('wt-sidebar-stations').innerHTML = buildSidebarStations();
  document.getElementById('wt-desk-content').innerHTML = buildStepContent(S.activeStep);
}
function renderWorldTourMobile() {
  document.getElementById('wt-mob-tabs').innerHTML = STATIONS.map(s => `...`).join('');
  document.getElementById('wt-mob-accordion').innerHTML = STEPS.map(s => `...`).join('');
}
function renderWorldTour() {
  renderWorldTourDesktop();
  renderWorldTourMobile();
}
```

### After (React) — 方案选择

**方案 A: CSS 隐藏（简单，SSR 友好，但两套 DOM 都渲染）**

```tsx
const WorldTourSection: FC = () => (
  <>
    <div className={styles.desktop}>{/* 桌面布局 */}</div>
    <div className={styles.mobile}>{/* 移动布局 */}</div>
  </>
)
```

```css
.desktop { display: none; }
.mobile { display: block; }
@media (min-width: 1024px) {
  .desktop { display: block; }
  .mobile { display: none; }
}
```

**方案 B: useMediaQuery（只渲染一套，但 SSR 需要 fallback）**

```tsx
// 仅在两套 DOM 差异很大、且渲染成本高时使用
const WorldTourSection: FC = () => {
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  return isDesktop ? <WorldTourDesktop /> : <WorldTourMobile />
}
```

**选择原则**：
- 两套 DOM 结构差异 < 30% → 方案 A（CSS 隐藏）
- 两套 DOM 完全不同 + 组件树很重 → 方案 B（useMediaQuery）
- 需要 SSR 首屏正确 → 方案 A

---

## 模式 9: Stagger 入场动画

### Before (HTML)

```css
.stagger-1 { animation-delay: 50ms; }
.stagger-2 { animation-delay: 100ms; }
.stagger-3 { animation-delay: 150ms; }
.stagger-4 { animation-delay: 200ms; }
```

### After (CSS Modules + inline delay)

```tsx
// 用 inline style 设置 delay，避免预定义大量 class
{items.map((item, i) => (
  <div
    key={item.id}
    className={styles.slideUp}
    style={{ animationDelay: `${i * 50}ms` }}
  >
    {/* ... */}
  </div>
))}
```

```css
.slideUp {
  animation: slideUp 350ms ease-out both;
}
@keyframes slideUp {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
```

---

## 模式 10: Canvas / 粒子效果

### Before (HTML)

```javascript
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { /* draw */ });
  requestAnimationFrame(animate);
}
animate();
```

### After (React)

```tsx
// ParticleCanvas.tsx
const ParticleCanvas: FC<{ className?: string }> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)
  const particlesRef = useRef<Particle[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // resize handler
    const resize = () => {
      canvas.width = canvas.offsetWidth * devicePixelRatio
      canvas.height = canvas.offsetHeight * devicePixelRatio
      ctx.scale(devicePixelRatio, devicePixelRatio)
    }
    resize()
    window.addEventListener('resize', resize)

    // init particles
    particlesRef.current = initParticles(canvas.offsetWidth, canvas.offsetHeight)

    // animation loop
    function animate() {
      ctx!.clearRect(0, 0, canvas!.offsetWidth, canvas!.offsetHeight)
      particlesRef.current.forEach(p => drawParticle(ctx!, p))
      updateParticles(particlesRef.current)
      rafRef.current = requestAnimationFrame(animate)
    }

    // respect reduced-motion
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!mq.matches) {
      rafRef.current = requestAnimationFrame(animate)
    }

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className={className} />
}
```

**性能注意**：
- Canvas 组件应该是独立的 Client Component（`'use client'`）
- 用 `useRef` 存粒子数据，不要用 `useState`（避免 re-render）
- 处理 HiDPI（devicePixelRatio）
- 标签页不可见时 rAF 自动暂停，不需要额外处理

---

## 模式 11: 背景光效 / Glow

### Before (HTML)

```css
.ticket-glow {
  position: absolute;
  top: -60px; left: -60px;
  width: 240px; height: 240px;
  border-radius: 50%;
  pointer-events: none;
  opacity: .85;
  filter: blur(60px);
  background: radial-gradient(circle, var(--accent) 0%, transparent 70%);
}
```

### After (CSS Modules)

直接迁移，这种纯 CSS 的光效不需要改动逻辑：

```css
/* Component.module.css */
.glow {
  position: absolute;
  top: -60px;
  left: -60px;
  width: 240px;
  height: 240px;
  border-radius: 50%;
  pointer-events: none;
  opacity: .85;
  filter: blur(60px);
  background: radial-gradient(circle, var(--accent) 0%, transparent 70%);
}
```

**注意**: `filter: blur()` 会创建 GPU 图层，大量使用需要注意性能。加 `will-change: filter` 仅在确实需要时。

---

## 模式 12: Resize 监听 + Debounce

### Before (HTML)

```javascript
let _timer;
window.addEventListener('resize', () => {
  clearTimeout(_timer);
  _timer = setTimeout(renderBannerStations, 150);
});
```

### After (React)

如果是用于重新计算布局 → 首先评估能否用 CSS 替代（flex/grid 响应式）。

如果确实需要 JS resize：

```ts
// hooks/useWindowSize.ts — 仅在确实需要 JS 获取窗口尺寸时使用
import { useState, useEffect } from 'react'

export function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    const handler = () => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        setSize({ width: window.innerWidth, height: window.innerHeight })
      }, 150)
    }
    handler() // 初始值
    window.addEventListener('resize', handler)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', handler)
    }
  }, [])

  return size
}
```

**更好的替代**：大多数 resize 监听在 React 中可以用 CSS 替代：
- 布局切换 → CSS `@media`
- 容器宽度 → CSS `container queries`
- 元素尺寸 → `ResizeObserver` + `useRef`

---

## 迁移清单模板

每个动效迁移后，填写：

```
[动效迁移记录]
# | 名称 | 模式 | 状态 | 验证
1 | 倒计时 | 模式3-Timer | ✅ 完成 | 每秒更新正确
2 | Modal 弹入 | 模式2-ClassToggle | ✅ 完成 | 入场/退场/ESC 关闭
3 | Toast | 模式5-Toast | ✅ 完成 | 自动消失 + hover 暂停
4 | 自动轮播 | 模式4-AutoSlide | ✅ 完成 | hover 暂停 + 手动切换
5 | 站点脉冲 | 模式1-Keyframes | ✅ 完成 | infinite 正常
6 | Stagger | 模式9-Stagger | ✅ 完成 | delay 递增
7 | 座位地图 | 模式2+模式7 | ⏳ 进行中 | —
```

---

## 不迁移清单

以下 HTML 中的动效在 Next.js 中**不需要迁移**：

| 源 | 原因 |
|----|------|
| `design-toolkit.js` 注入的所有交互 | 开发工具 |
| `scRegister` / Showcase | 开发工具 |
| 设计面板 FAB / 面板 / 拖拽 | 开发工具 |
| `refreshVars()` 联动 | 设计工具，生产环境用固定 CSS 变量 |
| 主题预设切换 | 设计工具（除非产品需要主题切换功能） |
