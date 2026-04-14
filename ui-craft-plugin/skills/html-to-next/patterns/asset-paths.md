# Pattern: Next.js i18n 项目的静态资源路径

> **实测教训**: Gate 项目启用了 next-i18next，页面 URL 被重写为 `/zh/gate13`。
> TSX 中的 `<img src="/assets/gate13/xxx">` 和 CSS 中的 `url('/assets/gate13/xxx')`
> 在某些场景下会被解析为 `/zh/assets/gate13/xxx`，导致 404。

---

## 问题根因

```
页面 URL: http://localhost:3210/zh/gate13
public 文件: /public/assets/gate13/13th.png
正确访问: http://localhost:3210/assets/gate13/13th.png  ← 200
错误访问: http://localhost:3210/zh/assets/gate13/13th.png  ← 404
```

### 哪些场景会出问题

| 引用方式 | 是否受 i18n 影响 | 说明 |
|---------|----------------|------|
| `<img src="/assets/gate13/xxx">` | ❌ 不受影响 | HTML 绝对路径，浏览器直接请求 `/assets/...` |
| `<img src="assets/gate13/xxx">` | ✅ **受影响** | 相对路径，被解析为 `/zh/assets/...` |
| CSS `url('/assets/gate13/xxx')` | ⚠️ **被 webpack 处理** | CSS Modules 中的 url() 会被 css-loader resolve，可能报错或路径异常 |
| CSS `url('assets/xxx')` | ✅ **必报错** | 相对路径，webpack 找不到文件 |
| inline style `backgroundImage: 'url(/assets/gate13/xxx)'` | ❌ 不受影响 | 运行时字符串，不被 webpack 处理 |
| `next/image` `src="/assets/gate13/xxx"` | ❌ 不受影响 | Next.js Image 组件处理路径 |

### 关键结论

```
✅ 安全: TSX <img src="/assets/...">          → 绝对路径，浏览器直接请求
✅ 安全: TSX style={{ backgroundImage: 'url(/assets/...)' }}  → 运行时字符串
✅ 安全: next/image src="/assets/..."          → Next.js 处理
⚠️ 风险: CSS url('/assets/...')               → webpack css-loader 介入
❌ 危险: <img src="assets/...">               → 相对路径，i18n 前缀
❌ 危险: CSS url('assets/...')                 → 相对路径，webpack 报错
```

---

## 解决方案

### 规则 1: TSX 中的图片 — 用绝对路径 `<img src="/assets/...">`

```tsx
// ✅ 正确 — 以 / 开头的绝对路径
<img src="/assets/gate13/hero-bg-new2.png" alt="" />

// ❌ 错误 — 缺少前导 /
<img src="assets/gate13/hero-bg-new2.png" alt="" />
```

### 规则 2: CSS 中的背景图 — 改用 TSX inline style

```tsx
// ✅ 正确 — 背景图用 inline style，不在 CSS 中用 url()
<div
  className={styles.section}
  style={{ backgroundImage: 'url(/assets/gate13/h1-section-bg.png)' }}
>

// ❌ 错误 — CSS Modules 中用 url() 引用本地图片
// .section { background-image: url('/assets/gate13/h1-section-bg.png'); }
```

### 规则 3: CSS 中必须用 url() 的场景（mask-image 等）

`mask-image` 和 `-webkit-mask-image` 无法用 inline style 设置，只能在 CSS 中写 url()。

**方案 A**: 用绝对路径（Next.js 14 实测可行，css-loader 对 `/` 开头的路径不做 resolve）

```css
/* 实测可行 — /assets/ 开头的绝对路径在 Next.js 14 CSS Modules 中不被 resolve */
.foil::before {
  -webkit-mask-image: url('/assets/gate13/13th.png');
  mask-image: url('/assets/gate13/13th.png');
}
```

**方案 B**: 如果方案 A 报错，改用 base64 data URI 或 CDN URL

```css
/* 方案 B — 用 CDN 绝对 URL */
.foil::before {
  mask-image: url('https://static.gate13.com/assets/13th.png');
}
```

### 规则 4: 视频/音频 — 用 TSX `<video src="/assets/...">`

```tsx
// ✅ 正确
<video src="/assets/gate13/opening.mp4" poster="/assets/gate13/opening-poster.webp" />
```

### 规则 5: CSS 伪元素的背景图

伪元素（`::before`/`::after`）的 `background` 无法用 inline style 设置。

**方案 A**: 用 CSS 绝对路径（同规则 3）

```css
.active::after {
  background: url('/assets/gate13/h2-nav-plane.png') center/contain no-repeat;
}
```

**方案 B**: 不用伪元素，改为 JSX 中渲染一个真实元素

```tsx
// 把伪元素改为真实 DOM 元素，用 inline style 设背景图
{isActive && (
  <span
    className={styles.activeIndicator}
    style={{ backgroundImage: 'url(/assets/gate13/h2-nav-plane.png)' }}
  />
)}
```

---

## 项目环境变量

Gate 项目有 `NEXT_PUBLIC_PREFIX` 和 `DEV_ASSET_PATH` 环境变量：

```
# .env.development
DEV_ASSET_PATH=/homepage-asset
NEXT_PUBLIC_PREFIX=https://static.panpno.com
```

- `NEXT_PUBLIC_PREFIX` 用于字体和 CDN 资源（`process.env.NEXT_PUBLIC_PREFIX + '/static/fonts/...'`）
- `DEV_ASSET_PATH` 是 dev 模式下 `_next/static/` 的 assetPrefix
- **public/ 目录下的文件不受 assetPrefix 影响**，直接用 `/assets/...` 访问

---

## 检查清单

- [ ] 所有 `<img src>` 以 `/` 开头（绝对路径）
- [ ] CSS 中无 `url()` 引用本地图片（改用 inline style）
- [ ] 如果 CSS 中必须用 url()（mask-image），使用 `/assets/...` 绝对路径
- [ ] 无相对路径 `src="assets/..."` 或 `url('assets/...')`
- [ ] `<video>` / `<audio>` 的 src 以 `/` 开头
