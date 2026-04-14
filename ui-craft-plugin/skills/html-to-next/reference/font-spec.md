# Gate 字体规范（摘要）

> 来源: 飞书 Wiki `DpNCw9Eh0iboOpkenq9j1eYtpFe`

---

## 核心规则

1. **不要指定 font-family** — 直接写 `font-weight` 即可
2. **不要复制设计稿的字体名** — Figma 显示 "Gate Product Sans"，但代码中没有这个字体
3. 全局字体包 `Gate_Sans` 已由平台统一加载，所有页面共享

## 字体包

| 字重 | font-weight | 文件 |
|------|------------|------|
| Regular | 400 | GateSans4-Regular.woff2 |
| Medium | 500 | GateSans4-Medium.woff2 |
| SemiBold | 600 | GateSans4-SemiBold.woff2 |
| Bold | 700 | GateSans4-Bold.woff2 |

CDN 地址: `https://static.wrgsb.com/static/fonts/GateSans4/`

## Next.js 加载方式

字体通过 `packages/core-lib/src/templates/FontScript/index.tsx` 在 `_document.tsx` 中预加载。
CSS 定义在 `packages/core-lib/src/styles/common.css`。

```css
@font-face {
  font-family: 'Gate_Sans';
  src: url('NEXT_PUBLIC_PREFIX/static/fonts/GateSans4/GateSans4-Regular.woff2');
  font-weight: 400;
  font-display: swap;
}
/* ... 500, 600, 700 同理 */
```

## HTML → Next.js 转换时的处理

| HTML 中的字体声明 | 转换动作 |
|------------------|---------|
| `font-family: 'Inter', sans-serif` | **删除** — Gate_Sans 全局覆盖 |
| `font-family: 'Antonio', sans-serif` | **评估** — 如果是特殊装饰字体（标题展示用），需要确认是否保留。--gate 模式默认删除 |
| `font-family: 'Menlo', monospace` | **保留** — 等宽字体用于倒计时/代码展示，Gate_Sans 不覆盖 monospace |
| `font-family: 'Poppins', sans-serif` | **删除** — Gate_Sans 覆盖 |
| `@font-face { ... }` 本地字体声明 | **删除**（--gate）或 **转 next/font/local**（非 gate） |
| `<link href="fonts.googleapis.com/...">` | **删除** |
| `<link rel="preconnect" href="fonts.gstatic.com">` | **删除** |

### 特殊装饰字体的处理

parallax-scroll-demo 中使用了 `Antonio` (标题展示字体) 和 `Switzer` (正文字体)：

- `Switzer` → **删除**，Gate_Sans 替代
- `Antonio` → **需确认**：如果是品牌活动的特定视觉要求（如 13 周年的标题字体），可能需要保留。保留时用 `next/font/local` 加载本地 .ttf
- `JetBrains Mono` / `Menlo` → **保留**，等宽场景（倒计时、编号）Gate_Sans 不适用

### 保留特殊字体时的 next/font/local 写法

```tsx
// 仅在确认需要保留装饰字体时使用
import localFont from 'next/font/local'

const antonio = localFont({
  src: './fonts/Antonio-Bold.ttf',
  weight: '700',
  display: 'swap',
  variable: '--font-antonio',
})

// 在需要的元素上使用 CSS 变量
// <h1 className={antonio.variable} style={{ fontFamily: 'var(--font-antonio)' }}>
```
