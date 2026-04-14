# Pattern: CSS Modules 迁移踩坑指南

> 从 HTML Demo（全局选择器）迁移到 Next.js CSS Modules 时的实战陷阱。
> 每条规则都来自真实项目踩坑，不是理论推测。

---

## 1. `:global()` 中不能包含祖先元素

CSS Modules 的 `:global()` 只能包裹选择器的一部分。如果把 `html` 等祖先元素放进 `:global()` 内部，选择器层级会与 DOM 层级不一致。

```css
/* ❌ 错误 — html 变成 .root 的后代，永远不匹配 */
.root :global(html:not([data-bp]) #v1-hero .hero-title) { }

/* ✅ 正确 — html 条件提到外层，.root 在中间 */
:global(html:not([data-bp])) .root :global(#v1-hero .hero-title) { }
```

**规则**: DOM 树 `html > body > .root > #v1-hero`，选择器层级必须与 DOM 层级一致。`:global()` 用于跳过 CSS Modules 的 hash，但不改变 DOM 匹配逻辑。

---

## 2. "not pure" 错误 — 必须包含本地 class

纯 `:global()` 选择器（不包含任何本地 class）会被 Next.js CSS Modules 拒绝编译：

```css
/* ❌ 编译报错：Selector is not pure */
:global(#h2-nav-steps.h2-nav-fixed) {
  position: fixed;
}

/* ✅ 必须包含至少一个本地 class */
.root :global(#h2-nav-steps.h2-nav-fixed) {
  position: fixed;
}
```

**如果元素会被移出 `.root`（如 `appendChild` 到 `body`），则无法用 CSS Modules 写样式** → 改用 JS inline style。

---

## 3. `@keyframes` 不支持 `:global()` 语法

Next.js 的 PostCSS 处理器不支持在 `@keyframes` 上使用 `:global()`：

```css
/* ❌ Next.js PostCSS 不支持，编译报错 */
@keyframes :global(h2NavFadeIn) {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

### 解法 A: CSS Modules 内的 @keyframes（自动 hash，同文件内引用正常）

```css
/* ✅ 同一个 .module.css 文件内定义和引用，名称自动 hash 匹配 */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
.element {
  animation: fadeIn 0.3s ease;
}
```

### 解法 B: JS 动态注入全局 keyframes（跨组件共享或 JS 需要引用名称时）

```ts
function injectKeyframes(id: string, css: string) {
  if (document.getElementById(id)) return
  const style = document.createElement('style')
  style.id = id
  style.textContent = css
  document.head.appendChild(style)
}

// 使用
injectKeyframes('my-kf', `
  @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
`)

// 在 JS 中引用
el.style.animation = 'fadeIn 0.3s ease'
```

### 解法 C: 放到 globals.css（全局不 hash）

```css
/* styles/globals.css — 不被 CSS Modules 处理 */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

---

## 4. `overflow: hidden` 破坏 `position: sticky/fixed`

父容器有 `overflow: hidden` 时，子元素的 `sticky` 和 `fixed` 定位会失效。这在活动页中很常见（section 容器通常有 `overflow: hidden` 防止内容溢出）。

### 解法 A: `overflow-x: clip` 替代 `overflow-x: hidden`

```css
/* ❌ hidden 创建滚动容器，破坏 sticky/fixed */
.section {
  overflow-x: hidden;
}

/* ✅ clip 不创建滚动容器，不影响定位 */
.section {
  overflow-x: clip;
}
```

兼容性：`clip` 在 Chrome 90+ / Safari 16+ / Firefox 81+ 支持。如果需要兼容更低版本，用解法 B。

### 解法 B: 将 fixed 元素移出 overflow 容器

```ts
// 进入 fixed 状态时，移到 body
const originalParent = el.parentElement
const originalNext = el.nextElementSibling
document.body.appendChild(el)

// 恢复时还原
if (originalNext) {
  originalParent?.insertBefore(el, originalNext)
} else {
  originalParent?.appendChild(el)
}
```

**注意**: 移出 DOM 后样式会脱离 CSS Modules 作用域（见第 5 点）。

---

## 5. 移出 DOM 后样式脱离 CSS Modules 作用域

元素被 `appendChild` 到 `body` 后，不再是 `.root` 的后代 → CSS Modules 中以 `.root :global(...)` 写的规则**全部失效**。

### 解法: fixed 状态的所有样式用 inline style

```ts
// 进入 fixed 状态
Object.assign(el.style, {
  position: 'fixed',
  top: `${headerHeight}px`,
  left: '0',
  right: '0',
  zIndex: '100',
  background: '#000',
})

// 恢复时清除所有 inline style
el.removeAttribute('style')
// 或恢复之前保存的 style
el.setAttribute('style', savedStyle)
```

**规则**: 如果一个元素可能被移出 `.root` 容器（如 fixed 吸顶场景），它的 fixed 态样式**必须用 JS inline style**，不能依赖 CSS Modules。

---

## 6. 平台 header 高度差异

Gate 项目在正常浏览器有平台 `<header>`（~56px），但在 Webview 中没有（0px）。吸顶定位的 `top` 值和滚动触发阈值都需要适配。

### 解法: CSS 变量 + 运行时检测

```ts
// 组件初始化时检测并设置
useEffect(() => {
  const header = document.querySelector('header')
  const h = header?.getBoundingClientRect().height ?? 0
  document.documentElement.style.setProperty('--header-height', `${h}px`)
}, [])
```

```css
/* 吸顶 top 值 */
.fixed {
  position: fixed;
  top: var(--header-height, 56px); /* 默认 56px，运行时更新 */
}
```

```ts
// 滚动判断阈值也要加上 headerH
const headerH = parseInt(
  getComputedStyle(document.documentElement).getPropertyValue('--header-height') || '56'
)
const threshold = sectionTop - headerH
```

---

## 7. Demo 全局选择器 → CSS Modules 转换速查表

| Demo 写法 | CSS Modules 写法 | 说明 |
|-----------|-----------------|------|
| `#v1-hero .title` | `.root :global(#v1-hero .title)` | 标准转换，.root 作为作用域锚点 |
| `html[data-bp="375"] #v1-hero .title` | `:global(html[data-bp="375"]) .root :global(#v1-hero .title)` | html 条件提到 .root 外层 |
| `html:not([data-bp]) .hero-title` | `:global(html:not([data-bp])) .root .heroTitle` | :not() 同理，提到外层 |
| `.className`（全局 class） | `.root :global(.className)` | 全局 class 用 :global() 包裹 |
| 被移出 `.root` 的元素样式 | **JS inline style** | CSS Modules 无法匹配 |
| `@keyframes name`（全局名称） | 同文件内定义（自动 hash）或 **JS 注入** | 不能用 `:global()` |
| `@media (max-width: 768px)` | `@media (max-width: 768px) { .root ... }` | @media 正常使用 |

### .root 模式说明

如果页面组件的根 div 有一个本地 class（如 `styles.page`），那么它就是 `.root`：

```tsx
// Gate13Page.tsx
<div className={styles.page}>  {/* .page 就是 "root" */}
  <HeroSection />
  ...
</div>
```

```css
/* page.module.css */
.page :global(#v1-hero .hero-title) { ... }
```

每个子组件也可以用自己的根 class 作为作用域锚点：

```css
/* HeroSection.module.css */
.hero :global(.hero-title) { ... }
```

---

## 8. 实战决策树

遇到选择器迁移问题时，按此顺序决策：

```
样式目标是什么？
├── 普通元素（始终在 .root 内）
│   └── .root :global(.xxx) { ... }
├── 需要 html/body 条件的
│   └── :global(html[condition]) .root :global(.xxx) { ... }
├── 会被移出 .root 的元素（fixed/portal）
│   └── JS inline style（Object.assign）
├── @keyframes 名称需要全局可见
│   └── JS document.head.appendChild(style) 注入
├── 伪元素 ::before/::after 需要背景图
│   └── CSS url('/assets/...') 绝对路径
└── 以上都不适用
    └── globals.css 中写全局样式
```
