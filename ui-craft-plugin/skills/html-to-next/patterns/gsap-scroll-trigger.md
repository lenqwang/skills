# Pattern: GSAP + ScrollTrigger → React

> GSAP 是团队官方推荐的动效方案（见 reference/motion-media-spec.md），**不应被替换为 CSS 或 IntersectionObserver**。
> 转换目标是将 vanilla JS 的 GSAP 代码**迁移到 React 生命周期内**，保留 GSAP 本身。

---

## 核心原则

1. **保留 GSAP** — 安装 `gsap` npm 包，不要用 CSS/IO 替代
2. **`useLayoutEffect` + `gsap.context`** — React 18 推荐模式
3. **cleanup 必须** — `gsap.context().revert()` 清理所有动画和 ScrollTrigger
4. **ref 替代选择器** — `useRef` 替代 `document.getElementById`
5. **低端机降级** — 按 P0/P1/P2 分级处理

---

## 安装

```bash
pnpm add gsap
```

注意：GSAP 3.12+ 的 ScrollTrigger 已包含在主包中，不需要单独安装。

```ts
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
```

---

## 模式 A: 基础 ScrollTrigger（进入视口触发）

### Before (Vanilla JS)

```javascript
gsap.fromTo('.module-title-fade',
  { opacity: 0, y: 40 },
  {
    opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
    scrollTrigger: {
      trigger: '.module-title-fade',
      start: 'top 80%',
      once: true,
    }
  }
)
```

### After (React)

```tsx
import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ModuleTitle: FC<{ children: ReactNode }> = ({ children }) => {
  const ref = useRef<HTMLHeadingElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 80%',
            once: true,
          }
        }
      )
    })
    return () => ctx.revert() // 清理所有动画和 ScrollTrigger
  }, [])

  return <h2 ref={ref} style={{ opacity: 0 }}>{children}</h2>
}
```

---

## 模式 B: ScrollTrigger Pin + Scrub（横向滚动）

### Before (Vanilla JS)

```javascript
// H1 横向滚动：pin 住 section，scroll 映射到 translateX
const h1Strip = document.getElementById('h1-strip')
gsap.to(h1Strip, {
  x: () => -(h1Strip.scrollWidth - window.innerWidth),
  ease: 'none',
  scrollTrigger: {
    trigger: '#h1-section',
    start: 'top top',
    end: () => '+=' + (h1Strip.scrollWidth - window.innerWidth),
    pin: true,
    scrub: 0.4,
    invalidateOnRefresh: true,
  }
})
```

### After (React)

```tsx
const HorizontalScrollSection: FC = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const stripRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const strip = stripRef.current
    if (!section || !strip) return

    const ctx = gsap.context(() => {
      gsap.to(strip, {
        x: () => -(strip.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${strip.scrollWidth - window.innerWidth}`,
          pin: true,
          scrub: 0.4,
          invalidateOnRefresh: true,
        }
      })
    }, section) // 第二个参数限定 scope

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef}>
      <div ref={stripRef} className={styles.strip}>
        {/* cards */}
      </div>
    </section>
  )
}
```

### 关键点

- `gsap.context(fn, scopeElement)` — 第二个参数限定选择器 scope，避免影响其他组件
- `invalidateOnRefresh: true` — 窗口 resize 时重新计算
- pin 元素必须是 `position: relative` 的容器
- **SSR 注意**: pin + scrub 必须在客户端执行，组件加 `'use client'` 或用 dynamic import

---

## 模式 C: Scrub 驱动颜色渐变（跨 section 过渡）

### Before (Vanilla JS)

```javascript
// 滚动时背景色从 #000 渐变到 #0255FF
var proxy = { _: 0 }
gsap.to(proxy, {
  _: 1, ease: 'none',
  scrollTrigger: {
    trigger: '#transition-section',
    start: 'top bottom',
    end: 'bottom top',
    scrub: 0.3,
  },
  onUpdate: function() {
    var p = this.progress()
    // 手动插值 RGB
    var r = Math.round(p * 2)
    var g = Math.round(p * 85)
    var b = Math.round(p * 255)
    document.body.style.background = `rgb(${r},${g},${b})`
  }
})
```

### After (React)

```tsx
const ColorTransition: FC = () => {
  const triggerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // GSAP 可以直接 tween CSS 变量
      gsap.fromTo(document.documentElement,
        { '--page-bg': '#000000' },
        {
          '--page-bg': '#0255FF',
          ease: 'none',
          scrollTrigger: {
            trigger: triggerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.3,
          }
        }
      )
    })
    return () => ctx.revert()
  }, [])

  return <div ref={triggerRef} className={styles.transition} />
}
```

**更好的方案**: 用 GSAP 的颜色插值替代手动 RGB 计算：

```ts
gsap.to('body', {
  backgroundColor: '#0255FF',
  ease: 'none',
  scrollTrigger: { /* ... */ }
})
```

---

## 模式 D: Hero 入场 Timeline（一次性动画序列）

### Before (Vanilla JS)

```javascript
var heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } })
heroTl
  .fromTo('#v1-hero .hero-gate-logo',
    { xPercent: 30, yPercent: -40, opacity: 0 },
    { xPercent: 0, yPercent: 0, opacity: 1, duration: 0.7 }, 0.1)
  .fromTo('#v1-hero .hero-word:first-child',
    { xPercent: -60, opacity: 0 },
    { xPercent: 0, opacity: 1, duration: 0.9 }, 0.2)
  .fromTo('#v1-hero .hero-sub',
    { yPercent: 35, opacity: 0 },
    { yPercent: 0, opacity: 1, duration: 0.7 }, 0.65)
```

### After (React)

```tsx
const HeroSection: FC = () => {
  const containerRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLImageElement>(null)
  const wordLeftRef = useRef<HTMLSpanElement>(null)
  const wordRightRef = useRef<HTMLSpanElement>(null)
  const subRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(logoRef.current,
        { xPercent: 30, yPercent: -40, opacity: 0 },
        { xPercent: 0, yPercent: 0, opacity: 1, duration: 0.7 }, 0.1)
      .fromTo(wordLeftRef.current,
        { xPercent: -60, opacity: 0 },
        { xPercent: 0, opacity: 1, duration: 0.9 }, 0.2)
      .fromTo(wordRightRef.current,
        { xPercent: 60, opacity: 0 },
        { xPercent: 0, opacity: 1, duration: 0.9 }, 0.2)
      .fromTo(subRef.current,
        { yPercent: 35, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.7 }, 0.65)
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className={styles.hero}>
      <img ref={logoRef} className={styles.logo} src="..." alt="" />
      <div className={styles.title}>
        <span ref={wordLeftRef}>Gateway</span>
        <span ref={wordRightRef}>to iWeb3</span>
      </div>
      <div ref={subRef} className={styles.sub}>AI powered Web3</div>
    </section>
  )
}
```

---

## 模式 E: 移动端/桌面端条件性 ScrollTrigger

### Before (Vanilla JS)

```javascript
var _isMobileSnap = window.innerWidth <= 480
if (_isMobileSnap) {
  // 完全不同的 ScrollTrigger 配置
  gsap.timeline({
    scrollTrigger: { trigger: hero, pin: false, scrub: 0.3 }
  })
} else {
  gsap.timeline({
    scrollTrigger: { trigger: hero, pin: true, scrub: 0.4, end: '+=250%' }
  })
}
```

### After (React)

```tsx
const useIsMobile = (breakpoint = 480) => {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= breakpoint)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [breakpoint])
  return isMobile
}

const HeroSection: FC = () => {
  const ref = useRef<HTMLElement>(null)
  const isMobile = useIsMobile()

  useLayoutEffect(() => {
    // isMobile 变化时重建动画
    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          pin: !isMobile,
          scrub: isMobile ? 0.3 : 0.4,
          end: isMobile ? '+=60%' : '+=250%',
        }
      })
      // ... timeline items
    }, ref)

    return () => ctx.revert()
  }, [isMobile]) // isMobile 变化时重建

  return <section ref={ref}>{/* ... */}</section>
}
```

### 注意

- `isMobile` 作为 `useLayoutEffect` 的依赖，变化时会 `revert()` 并重建
- 初始 SSR 渲染时 `isMobile` 为 false（桌面默认），客户端 hydrate 后修正
- 也可以用 CSS `@media` 配合 `ScrollTrigger.matchMedia()`:

```ts
ScrollTrigger.matchMedia({
  '(min-width: 481px)': () => {
    // 桌面端动画
  },
  '(max-width: 480px)': () => {
    // 移动端动画
  }
})
```

---

## 模式 F: 低端机降级

> 参考 reference/motion-media-spec.md 的 P0/P1/P2 分级

```tsx
// hooks/useIsLowEnd.ts
export function useIsLowEnd(): boolean {
  const [isLowEnd, setIsLowEnd] = useState(false)
  useEffect(() => {
    // 检测策略（参考规范 2.1）
    const checks = [
      // 硬件并发数
      navigator.hardwareConcurrency <= 4,
      // 设备内存（Chrome only）
      (navigator as any).deviceMemory <= 4,
      // 用户偏好
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    ]
    setIsLowEnd(checks.filter(Boolean).length >= 2)
  }, [])
  return isLowEnd
}
```

```tsx
const AnimatedSection: FC = () => {
  const isLowEnd = useIsLowEnd()
  const ref = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    if (isLowEnd) return // P1 动效：低端机跳过

    const ctx = gsap.context(() => {
      // 复杂 GSAP 动画
    }, ref)
    return () => ctx.revert()
  }, [isLowEnd])

  return <section ref={ref}>{/* 静态内容始终渲染 */}</section>
}
```

**降级策略映射：**

| 性能等级 | 原方案 | 低端机方案 |
|---------|--------|----------|
| P0 极高 | Canvas 粒子/3D | 完全移除，静态图 |
| P1 中等 | GSAP scrub + 多元素 | 改为 once 触发，减少元素 |
| P2 低 | CSS transition, 小 Lottie | 保留 |

---

## 模式 G: ScrollTrigger.matchMedia（响应式动画）

GSAP 内置了响应式支持，比手动 `useIsMobile` 更优雅：

```tsx
useLayoutEffect(() => {
  const ctx = gsap.context(() => {
    ScrollTrigger.matchMedia({
      // 桌面端
      '(min-width: 1024px)': () => {
        gsap.to(stripRef.current, {
          x: () => -(stripRef.current!.scrollWidth - window.innerWidth),
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            scrub: 0.4,
          }
        })
      },
      // 平板
      '(min-width: 481px) and (max-width: 1023px)': () => {
        // 简化版动画
      },
      // 移动端
      '(max-width: 480px)': () => {
        // snap scroll 替代 pin
      },
      // 所有断点共享
      all: () => {
        // 通用动画（如标题淡入）
      }
    })
  }, containerRef)
  return () => ctx.revert()
}, [])
```

**优势**: matchMedia 内创建的 ScrollTrigger 会在断点切换时自动 kill 并重建，不需要手动管理。

---

## SSR / Next.js 注意事项

1. **GSAP 只在客户端运行** — 所有 GSAP 代码必须在 `useLayoutEffect` 或 `useEffect` 内
2. **Pages Router**: 组件默认 SSR，GSAP 代码在 `useLayoutEffect` 中自动跳过 SSR
3. **App Router**: 包含 GSAP 的组件需要加 `'use client'`
4. **动态导入**: 大型 GSAP 动画可以 `next/dynamic` 懒加载

```tsx
// 如果 GSAP 动画组件很重，用 dynamic import
import dynamic from 'next/dynamic'
const ParallaxHero = dynamic(() => import('./ParallaxHero'), { ssr: false })
```

5. **ScrollTrigger.refresh()** — 路由切换后可能需要手动刷新：

```tsx
useEffect(() => {
  // 图片加载完成后刷新 ScrollTrigger 的位置计算
  ScrollTrigger.refresh()
}, [])
```

---

## 第三方库迁移速查

| HTML 中的库 | npm 包 | React 集成 |
|------------|--------|-----------|
| GSAP CDN | `gsap` | `useLayoutEffect` + `gsap.context` |
| Swiper CDN | `swiper` | `swiper/react` — `<Swiper>` + `<SwiperSlide>` |
| Lottie CDN | `lottie-react` | `<Lottie animationData={json} />` |
| CountUp | `react-countup` | `<CountUp end={1000} />` |
| AOS (scroll reveal) | 不需要，GSAP ScrollTrigger 替代 | — |
| anime.js | 保留或换 GSAP | `useLayoutEffect` 中使用 |

---

## 从 HTML 迁移的 Checklist

- [ ] `gsap` 已安装为 npm 依赖
- [ ] `ScrollTrigger` 已通过 `gsap.registerPlugin` 注册
- [ ] 所有 `document.getElementById/querySelector` → `useRef`
- [ ] 所有 GSAP 代码在 `useLayoutEffect` 内
- [ ] 使用 `gsap.context()` 包裹，`return () => ctx.revert()` 清理
- [ ] 全局变量 → React state 或 ref
- [ ] `window.addEventListener('resize')` → `useEffect` 或 `ScrollTrigger.matchMedia`
- [ ] `_isMobileSnap` 条件分支 → `ScrollTrigger.matchMedia` 或 `useIsMobile`
- [ ] 低端机降级 → `useIsLowEnd` hook
- [ ] `prefers-reduced-motion` → 跳过动画，显示最终态
