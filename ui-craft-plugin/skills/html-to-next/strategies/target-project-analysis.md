# Phase 0: 目标项目技术栈探测

> 转换代码之前，必须先了解目标项目的技术栈和约定。
> 否则产出的代码可能与项目风格不兼容（如项目用 styled-components 你却输出 CSS Modules）。

---

## 触发时机

Phase 0 在 Phase A（HTML 分析）之前或同步执行。只需执行一次，后续转换复用结果。

---

## 探测清单

### 1. 样式方案

扫描目标项目，判断主要样式方案：

```bash
# 探测命令
grep -r "\.module\.css\|\.module\.scss" src/ --include="*.tsx" --include="*.ts" -l | wc -l
grep -r "styled-components\|styled\." src/ --include="*.tsx" --include="*.ts" -l | wc -l
grep -r "@emotion/css\|css\`" src/ --include="*.tsx" --include="*.ts" -l | wc -l
grep -r "className=" src/ --include="*.tsx" -l | head -5  # 看 className 的写法
```

| 检测结果 | 样式方案 | 转换目标 |
|---------|---------|---------|
| 大量 `*.module.css` 引用 | CSS Modules | 输出 CSS Modules |
| 大量 `styled.div` / `styled(Component)` | styled-components | 输出 styled-components |
| 大量 `` css`...` `` / `@emotion/css` | Emotion | 输出 Emotion css prop |
| 混合使用 | 混合 | **看目标目录下最近的文件用什么** |
| Tailwind `className="flex ..."` | Tailwind CSS | 输出 Tailwind classes |

**关键**: 不要假设 CSS Modules。看项目实际用什么。

### 2. 状态管理

```bash
grep -r "zustand\|create(" src/ --include="*.ts" --include="*.tsx" -l | wc -l
grep -r "mobx\|observable\|makeAutoObservable" src/ --include="*.ts" --include="*.tsx" -l | wc -l
grep -r "useState\|useReducer" src/ --include="*.tsx" -l | wc -l
grep -r "useContext" src/ --include="*.tsx" -l | wc -l
```

| 检测结果 | 方案 | 转换建议 |
|---------|------|---------|
| zustand store 文件 | Zustand | 复杂状态用 zustand store |
| mobx observable | MobX | 跟随项目用 MobX |
| 主要是 useState | React 原生 | 用 useState/useReducer |

### 3. 数据获取

```bash
grep -r "useSWR\|swr" src/ --include="*.ts" --include="*.tsx" -l | wc -l
grep -r "useQuery\|@tanstack" src/ --include="*.ts" --include="*.tsx" -l | wc -l
grep -r "getServerSideProps\|getStaticProps" src/pages/ --include="*.tsx" -l | wc -l
grep -r "axios" src/ --include="*.ts" --include="*.tsx" -l | wc -l
```

| 检测结果 | 方案 | 转换建议 |
|---------|------|---------|
| SWR 为主 | SWR | 客户端数据用 `useSWR` |
| React Query 为主 | TanStack Query | 客户端数据用 `useQuery` |
| getServerSideProps | SSR 数据 | 首屏数据走 SSR |
| axios 为主 | Axios | API 调用用项目已有的 axios 实例 |

### 4. 动画方案

```bash
grep -r "gsap\|ScrollTrigger" src/ --include="*.ts" --include="*.tsx" -l
grep -r "framer-motion\|motion\." src/ --include="*.tsx" -l | wc -l
grep -r "lottie" src/ --include="*.tsx" -l | wc -l
grep -r "@keyframes\|animation:" src/ --include="*.css" --include="*.module.css" -l | wc -l
ls node_modules/gsap 2>/dev/null && echo "gsap installed" || echo "gsap NOT installed"
```

| 检测结果 | 方案 | 转换建议 |
|---------|------|---------|
| gsap 已安装 | GSAP | 直接使用，迁移到 `useLayoutEffect` + `gsap.context` |
| gsap 未安装但 HTML 用了 | 需要安装 | `pnpm add gsap` |
| framer-motion 为主 | Framer Motion | 评估是否将 GSAP 转为 framer-motion（不推荐混用） |
| 纯 CSS 动画 | CSS | 简单动效用 CSS，复杂的仍加 GSAP |

### 5. 组件库 & UI 工具

```bash
# package.json 中的关键依赖
grep -E "gate-ui|gui|mantine|antd|shadcn|clsx|classnames" package.json
```

- `@gate/gui` / `@gate/gate-ui` → 有内部组件库可复用
- `@mantine/core` → Mantine 组件可用
- `clsx` → className 合并工具

### 6. 路由模式

```bash
ls src/pages/ 2>/dev/null && echo "Pages Router" || echo "No pages dir"
ls src/app/ 2>/dev/null && echo "App Router" || echo "No app dir"
```

- Pages Router → `getStaticProps` / `getServerSideProps`，组件默认非 'use client'
- App Router → Server Components 默认，GSAP 组件需要 `'use client'`

### 7. i18n

```bash
grep -r "next-i18next\|useTranslation" src/ --include="*.tsx" -l | head -3
ls public/locales/ 2>/dev/null
cat next-i18next.config.js 2>/dev/null | head -10
```

### 8. 已有 hooks 和工具可复用

```bash
ls src/hooks/
ls src/utils/
# 看看有没有 useScrollLock, useMediaQuery, useCountdown 等
grep -r "useScrollLock\|useMediaQuery\|useCountdown\|useIntersection" src/hooks/ -l
```

**如果目标项目已有 `useScrollLock`，不要重新写一个。**

---

## 输出格式

```markdown
# 目标项目技术栈探测: {项目名}

## 样式
- 主方案: CSS Modules (42 文件) + styled-components (18 文件)
- 目标目录 (src/components/Gate13/) 附近: CSS Modules 为主
- **转换输出**: CSS Modules

## 状态管理
- zustand: 5 个 store
- useState: 广泛使用
- **转换输出**: 简单状态 useState，复杂共享状态 zustand

## 数据获取
- SWR: 12 处
- axios: 广泛使用，统一实例在 src/utils/request.ts
- getServerSideProps: 8 页面
- **转换输出**: SSR 数据走 getServerSideProps，客户端走 SWR

## 动画
- gsap: 1 文件（src/components/ai/Cubes.tsx 注释提到，实际用 CSS 替代）
- gsap 包: 未安装
- lottie-react: 已安装
- **转换输出**: 需要安装 gsap，GSAP 动画迁移到 useLayoutEffect

## 组件库
- @gate/gui, @gate/iconfont, @mantine/core, clsx
- **可复用**: clsx 合并 className

## 路由
- Pages Router (Next.js 14)
- **转换输出**: getStaticProps / getServerSideProps

## i18n
- next-i18next (13.2.2)
- locales: public/locales/
- **转换输出**: useTranslation + zh.json

## 可复用 hooks
- (列出已有的相关 hooks)

## 需要安装的依赖
- gsap (动画)
- swiper (轮播)
```

---

## 探测结果如何影响后续 Phase

| Phase | 受影响的决策 |
|-------|------------|
| Phase B (骨架) | 组件结构（Pages Router vs App Router） |
| Phase C (样式) | CSS Modules vs styled-components vs emotion |
| Phase D (动效) | GSAP 是否需要安装、是否用 framer-motion 替代 |
| Phase E (逻辑) | 状态管理方案、数据获取方案、可复用 hooks |
| Phase F (验证) | lint 工具（biome vs eslint）、build 命令 |
