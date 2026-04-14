# 代码输出规范

## 两阶段输出流程

> **核心原则：先 HTML 预览，确认后再转 Next.js 生产代码。**

```
Phase 1（默认）            Phase 2（--to-next）
+----------------+        +------------------------+
|  独立 HTML     |  确认   |  Next.js TSX           |
|  内嵌 <style>  | ------> |  CSS Modules + i18n    |
|  CSS 变量      |        |  useTranslation        |
|  中文文案      |        |  组件拆分 + 类型定义    |
|  可直接预览    |        |  @gate/iconfont        |
+----------------+        +------------------------+
```

### Phase 1: HTML 预览（默认输出）

**触发方式**：`/ui-craft --style <name>` 或任何未指定 `--to-next` 的生成请求

**输出规则**：
- 单文件独立 HTML，可直接浏览器打开预览
- 所有样式通过内嵌 `<style>` 定义，使用 CSS 变量体系
- `.page` wrapper 定义完整 CSS 变量表（从 style 文件的 4.1 区块复制）
- UI 文案直接使用中文（不需要 i18n）
- 图标使用占位 SVG 或 CSS 图形（不依赖 `@gate/iconfont`）
- 输出路径：`ui-craft-workspaces/{domain}/pages/<prd-name>.html`（`{domain}` 由 `--domain` 参数决定，默认 `campaign`）
- **必须遵守**：R3-R27 设计规则
- **豁免**：R1（CSS Modules 限制，HTML 用内嵌 style）、R19-R20（图标来源）、i18n

**组件规格强制约束**（[B] 阻断）：

> 所有组件的样式值**必须**从 `components/*.md` 对应规格中获取，禁止自行编造。

生成组件前，必须：
1. 识别页面涉及的组件类型（button、card、modal、input、table、misc 等）
2. 读取对应的 `components/<type>.md`
3. 按规格表中的 Token → CSS 映射编写样式
4. 不在规格中的属性（如自定义装饰）可自由添加，但已定义的属性**必须使用规格值**

违规示例：
- ❌ 按钮写 `border-radius: 12px`（规格为 `var(--radius-btn)` = 8px）
- ❌ 卡片写 `padding: 24px`（规格为 `var(--space-card)` = 32px）
- ❌ CTA 按钮写 `border-radius: 8px`（规格为 `var(--radius-pill)` = 9999px）
- ✅ 按规格表写 `border-radius: var(--radius-btn)` 并在 `.page` 中定义变量值

**Figma-ready 结构要求**（默认执行）：
- 页面核心视觉结构必须静态存在于 HTML 中，**禁止将页面骨架完全依赖 JS `innerHTML` 注入**
- JS 仅用于交互逻辑（倒计时递减、展开/收起、弹窗、状态切换等），**不用于核心布局首次渲染**
- 可接受的 JS 使用：动态数据填充、事件绑定、条件显示/隐藏
- 不可接受的 JS 使用：整个 section 通过 `innerHTML` 或 `document.createElement` 拼接渲染
- 理由：`html.to.design` Figma 插件在抓取时可能不完整执行 JS，静态 DOM 确保设计稿可被正确提取

**HTML 结构示例**：

```html
<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>活动页预览</title>
  <style>
    /* 重置 */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    /* CSS 变量（从 style 文件 4.1 区块获取） */
    .page {
      --bg: #070808;
      --bg-card: #1F2023;
      --bg-muted: #131516;
      --bg-elevated: #303236;
      --border: rgba(255,255,255,0.1);
      --bg-card-black: #000000;
      --bg-card-white: #FFFFFF;

      --text-primary: #FAFAFA;
      --text-secondary: #A0A3A7;
      --text-muted: #84888C;
      --text-on-dark: #FFFFFF;
      --text-on-dark-muted: rgba(255,255,255,0.7);
      --text-on-light: #000000;

      --brand: #0068FF;
      --brand-hover: #004FD9;
      --accent: #A7F757;
      --success: #50A907;
      --warning: #FFB020;
      --error: #E54545;

      --cta-bg: #FFFFFF;
      --cta-text: #000000;

      --radius-card: 8px;
      --radius-card-lg: 32px;
      --radius-btn: 8px;
      --radius-pill: 9999px;
      --radius-input: 6px;

      --space-card: 32px;
      --space-section: 64px;
      --transition: 200ms ease;
      --transition-slow: 300ms ease;

      background: var(--bg);
      color: var(--text-primary);
      /* font-family 由全局 Gate_Sans 字体包提供，HTML 预览用系统字体 fallback */
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 16px;
      line-height: 1.3;
      -webkit-font-smoothing: antialiased;
      min-height: 100vh;
    }

    /* 组件样式 */
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px;
    }

    .card {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: var(--radius-card);
      padding: var(--space-card);
    }

    .card-black {
      background: var(--bg-card-black);
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: var(--radius-card-lg);
      padding: var(--space-card);
      color: var(--text-on-dark);
    }

    .btn-cta {
      background: var(--cta-bg);
      color: var(--cta-text);
      border: none;
      border-radius: var(--radius-pill);
      padding: 16px 48px;
      font-size: 18px;
      font-weight: 600;
      cursor: pointer;
      transition: var(--transition);
    }

    .btn-cta:hover {
      opacity: 0.9;
      transform: translateY(-1px);
    }

    .accent { color: var(--accent); }
    .text-secondary { color: var(--text-secondary); }
  </style>
</head>
<body>
  <div class="page">
    <div class="container">
      <!-- 页面内容 -->
    </div>
  </div>
</body>
</html>
```

### Phase 1.1: 设计工具包集成（HTML 生成时必须包含）

> Phase 1 HTML 预览**必须**集成以下三个模块，确保设计师拿到文件后可直接调参、切换风格、浏览所有组件。

#### 1. CSS 变量主题系统

所有视觉参数通过 `.page` 中的 CSS 变量定义，JS 中需要颜色常量的部分（如 `innerHTML` 渲染）必须通过 `refreshVars()` 从 CSS 变量同步：

```javascript
// JS 颜色常量必须配合 refreshVars() 从 CSS 变量同步
function refreshVars() {
  const s = getComputedStyle(document.querySelector('.page'))
  const g = (k) => s.getPropertyValue(k).trim()
  C.bg = g('--bg'); C.card = g('--bg-card')
  C.brand = g('--brand'); C.accent = g('--accent')
  C.text = g('--text-primary'); C.textSub = g('--text-secondary')
  // ... 同步所有 innerHTML 渲染需要的变量
  renderAll() // 重新渲染 innerHTML 依赖的部分
}
```

**变量命名规范**（与 style 文件 4.1 区块一致）：

| 前缀 | 用途 | 示例 |
|------|------|------|
| `--bg-*` | 背景 | `--bg`, `--bg-card`, `--bg-muted` |
| `--text-*` | 文字 | `--text-primary`, `--text-secondary` |
| `--brand` / `--accent` | 品牌/强调 | `--brand`, `--accent` |
| `--radius-*` | 圆角 | `--radius-card`, `--radius-card-lg` |
| `--space-*` | 间距 | `--space-card`, `--space-section` |
| `--cta-*` | CTA 按钮 | `--cta-bg`, `--cta-text` |

#### 2. 设计控制面板（独立脚本）

使用 `ui-craft-workspaces/design-toolkit.js` 统一注入（模块化架构，自动加载 `_toolkit/` 下 11 个子模块），**不在 HTML 中内联面板代码**。

**引入方式**：

```html
<!-- 预设数据（design-toolkit.js 自动读取） -->
<script type="application/json" id="dt-presets">
{
  "gold": { "_name": "Gold Prestige", "--bg": "#070808", "--accent": "#CAB29A", ... },
  "dark": { "_name": "Dark Minimal", "--bg": "#0A0A0A", "--accent": "#888888", ... }
}
</script>

<!-- 在业务脚本之前引入，路径相对于 HTML 所在目录到 ui-craft-workspaces/ 根目录 -->
<!-- campaign/pages/*.html 和 campaign/preview/*.html → ../../design-toolkit.js -->
<!-- 根目录 *.html → ./design-toolkit.js -->
<script src="../../design-toolkit.js"></script>
```

**design-toolkit.js 自动完成**（模块化加载 `_toolkit/` 下 11 个子模块）：
- **_core**: CSS 变量管理、主题持久化、颜色缓存
- **_design-panel**: 变量编辑、预设切换、导入导出
- **_showcase**: 组件总览（手动注册 + DOM 自动发现）
- **_inspector**: Figma 风格编辑模式（选中、标注、上下文操作栏）
- **_drag**: 拖拽 & 8 方向缩放
- **_snap**: 对齐参考线（自动吸附 + 距离标注）
- **_smart-layout**: 15 种 UI 模式识别 + 响应式推荐
- **_screenshot**: 区域截图 + 元素截图
- **_persistence**: 标注持久化（URL Hash / HTML 内嵌恢复）
- **_dom**: 工具栏、设计面板、Showcase 容器注入
- **_misc**: 快捷键 H 隐藏 UI、低端机模式

**生成 HTML 时不需要**：
- 不需要手写 `DP_FIELDS` 数组
- 不需要内联面板 CSS（~80 行）
- 不需要内联面板 JS（~120 行）
- 不需要手写 FAB/面板/Showcase 的 DOM 结构

**Figma W3C Design Tokens 导入映射**：

格式适配由 `normalizeThemeJSON()` 函数自动完成，无需设计师手动转换。

```
Figma Collection          ->  自动映射到 CSS 变量
color/bg                  ->  --bg
color/card                ->  --bg-card
color/brand               ->  --brand
color/accent              ->  --accent
color/text-primary        ->  --text-primary
color/text-secondary      ->  --text-secondary
radius/card               ->  --radius-card
radius/card-lg            ->  --radius-card-lg
spacing/section           ->  --space-section
spacing/card              ->  --space-card
```

#### 3. 组件总览注册（Showcase Registry）

页面中所有弹窗、交互状态、组件变体**必须**通过 `scRegister()` 注册到组件总览：

```javascript
// 注册表基础设施
const SC_REGISTRY = []
function scRegister(title, items, opts) {
  SC_REGISTRY.push({ title, id: opts?.id || title, items, cols: opts?.cols || 1 })
}
```

**注册参数说明**：

| 参数 | 类型 | 说明 |
|------|------|------|
| `title` | string | 中文分组标题（如 `'登录弹窗'`） |
| `items` | array | 组件列表，每项含 `{ label, build, raw?, width? }` |
| `items[].label` | string | 组件路径标签（如 `'Modal / Login / 邮箱登录'`） |
| `items[].build` | function | 返回 HTML 字符串的函数（延迟执行，保证读取最新主题变量） |
| `items[].raw` | boolean | `true` 表示内容不包裹默认卡片容器，自带标签和容器 |
| `items[].width` | string | 卡片宽度（如 `'100%'`），仅 `raw:false` 时生效 |
| `opts.id` | string | 锚点 ID（默认取 `title`） |
| `opts.cols` | number | 栅格列数 `1 / 2 / 3`（默认 `1`） |

**注册示例**：

```javascript
// 单组件注册
scRegister('确认弹窗', [{
  label: 'Modal / Confirm / 默认',
  build() { return `<div class="modal">...</div>` }
}], { id: 'confirm' })

// 多变体 + 多列布局
scRegister('状态卡片', ['success', 'warning', 'error'].map(type => ({
  label: `Card / Status / ${type}`,
  build() { return `<div class="card" style="border-color:var(--${type})">...</div>` }
})), { id: 'status-cards', cols: 3 })

// 自带容器的原始组件（raw: true）
scRegister('Toast 通知', [{
  label: 'Component / Toast', raw: true,
  build() { return `<div>...variants...</div>` }
}], { id: 'toast' })
```

**`buildShowcaseContent()` 自动遍历 `SC_REGISTRY` 渲染所有已注册组件**，无需手动维护列表。

**规则**：每新增一个弹窗/交互组件/状态变体，必须同步添加 `scRegister()` 调用。

---

### Phase 1.5: Figma 交付（HTML 生成后默认执行）

HTML 文件生成完毕后，**自动执行**以下步骤，确保页面可被 `html.to.design` Figma 插件抓取：

```
步骤 1: 启动本地 HTTP 服务器
        python3 -m http.server 8080 --directory <html 所在目录>
        （如已有服务器运行则跳过）

步骤 2: 使用 localtunnel 暴露公网 URL
        npx localtunnel --port 8080
        输出类似：your url is: https://xxxx.loca.lt

步骤 3: 拼接完整页面 URL
        https://xxxx.loca.lt/pages/<filename>.html

步骤 4: 输出给用户
        - 本地预览：http://localhost:8080/pages/<filename>.html
        - Figma 导入：https://xxxx.loca.lt/pages/<filename>.html
        - 提示用户在 Figma 中使用 html.to.design 插件粘贴该 URL
```

**注意事项**：
- localtunnel URL 为临时 URL，关闭终端后失效
- 首次访问 localtunnel URL 可能需要通过人机验证页面
- 如 localtunnel 不可用，降级使用 `ngrok http 8080` 作为替代
- 如两者都不可用，提示用户手动部署到 Vercel/Netlify

---

### Phase 2: Next.js 转换

**触发方式**：`/ui-craft --to-next <html-file>` 或用户确认 HTML 后要求转换

**转换规则**：
1. 读取已确认的 HTML 文件，保持视觉效果完全一致
2. 拆分为 Next.js 组件结构（页面 + 子组件），遵循分层架构约束
3. `<style> .page {...}` → `page.module.css`（.page 变量块 + 组件类）
4. 其他组件样式 → `ComponentName.module.css`
5. 中文文案 → `useTranslation` + `public/locales/zh/*.json`
6. 占位图标 → `@gate/iconfont` 组件
7. 严格遵守全部 R1-R30 规则
8. **保存 baseline**：复制源 HTML 到 `ui-craft-workspaces/{domain}/baseline/<name>.html`
9. **生成 className 映射注释**：在 `page.module.css` 头部记录 HTML class → CSS Module class 映射

**Baseline 保存（强制）**：

转换完成后，自动执行：
```
cp ui-craft-workspaces/{domain}/pages/<name>.html ui-craft-workspaces/{domain}/baseline/<name>.html
```
该 baseline 是后续 `--patch` / `--css-patch` 增量更新的 diff 基准。详见 `engine/code-gen/patch-workflow.md`。

**分层架构约束（强制）**：

`--to-next` 产出必须遵循以下分层，为后续增量补丁做好基础：

```
src/components/{Feature}/
├── index.tsx                    ← 页面入口（导出 + getStaticProps）
├── page.module.css              ← 【视觉层】CSS 变量 + 页面级样式（patch 安全区）
├── {Feature}Page.tsx            ← 【结构层】页面组件骨架（JSX 布局）
├── use{Feature}Data.ts          ← 【数据层】业务 hooks（patch 禁区）
├── types.ts                     ← 类型定义
└── components/
    ├── HeroSection/
    │   ├── HeroSection.tsx
    │   └── HeroSection.module.css
    └── ...
```

| 层 | 文件 | Patch 安全性 |
|----|------|-------------|
| 视觉层 | `*.module.css` | 安全，可自动 patch |
| 结构层 | `*.tsx` | 需谨慎 patch |
| 数据层 | `use*.ts` / `*Service.ts` | 禁止 patch |

**关键约束**：
- CSS 变量集中在 `page.module.css` 的 `.page` 块中，子组件通过 `var()` 继承
- 组件边界对齐 HTML section：每个 `<section>` 对应一个子组件
- 业务逻辑外置到 hooks：TSX 中只保留结构和渲染

**输出文件**：
| 内容 | 文件类型 | 位置 |
|------|----------|------|
| 页面组件 | *.tsx | src/pages/ |
| 页面样式 | page.module.css | src/pages/ 或同目录 |
| 子组件 | *.tsx | src/components/{feature}/ |
| 组件样式 | *.module.css | 与组件同目录 |
| i18n | *.json | public/locales/{lang}/ |
| Baseline | *.html | ui-craft-workspaces/{domain}/baseline/ |

**CSS Modules 转换示例**：

```css
/* page.module.css */

/*
 * [ui-craft] HTML → CSS Module 映射
 * 源文件: ui-craft-workspaces/{domain}/pages/campaign.html
 * 生成时间: 2026-03-11
 *
 * .page          → .page
 * .container     → .container
 * .hero          → .hero
 * .hero-title    → .heroTitle
 * .btn-cta       → .btnCta
 */

.page {
  /* CSS 变量定义（从 HTML <style> 迁移） */
  --bg: #070808;
  --bg-card: #1F2023;
  --text-primary: #FAFAFA;
  --brand: #0068FF;
  --accent: #A7F757;
  /* ... */

  background: var(--bg);
  color: var(--text-primary);
  min-height: 100vh;
  /* 禁止声明 font-family，全局 Gate_Sans 字体包已覆盖 */
}

/* 深色模式（根据宿主应用的切换机制） */
:global(.classic-dark) .page {
  --bg: #070808;
  --text-primary: #FAFAFA;
  /* ... 深色覆盖 */
}
```

```tsx
import type { FC } from 'react'
import { useTranslation } from 'next-i18next'
import styles from './page.module.css'

const CampaignPage: FC = () => {
  const { t } = useTranslation('campaign')

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.heroTitle}>{t('title')}</h1>
      </div>
    </div>
  )
}
```

## 技术栈绑定（Phase 2）

Phase 2 代码生成严格绑定 CLAUDE.md 中定义的技术栈：
- **框架**: Next.js 15（Pages Router）
- **语言**: TypeScript
- **样式**: CSS Modules（CSS 变量体系）
- **组件**: React 18.2

## 视觉增强集成

> 代码生成时需根据场景适度应用渐变、动效、光效等视觉增强。

### 渐变使用指南

详见 [gradients/](../gradients/) 目录

| 场景 | CSS 实现 |
|------|----------|
| 主 CTA 按钮 | `background: linear-gradient(to right, var(--brand), #00d4ff)` |
| VIP 按钮 | `background: linear-gradient(to right, #b8860b, #daa520)` |
| 进度条 | `background: linear-gradient(to right, var(--rank-gold), #f97316)` |
| TOP 排名行 | `background: linear-gradient(to bottom, rgba(218,165,32,0.15), transparent)` |
| Hero 区背景 | `background: linear-gradient(to bottom, var(--bg), #1a1a2e, var(--bg))` |

### 动效使用指南

详见 [effects/](../effects/) 目录

| 场景 | CSS 实现 |
|------|----------|
| 按钮 hover | `transition: var(--transition); &:hover { filter: brightness(1.1); } &:active { transform: scale(0.95); }` |
| 卡片 hover | `transition: var(--transition-slow); &:hover { transform: translateY(-4px); }` |
| 加载状态 | `animation: pulse 2s infinite` 或骨架屏 |

### 光效/阴影使用指南

详见 [enhancements/](../enhancements/) 目录

| 场景 | CSS 实现 |
|------|----------|
| 按钮光晕 | `filter: blur(20px); opacity: 0.4` (hover 时显示) |
| 卡片阴影 | `box-shadow: 0 4px 12px rgba(0,0,0,0.3)` |
| Hero 光效 | `filter: blur(100px)` 背景光晕 |
| 弹窗遮罩 | `backdrop-filter: blur(12px); background: rgba(0,0,0,0.4)` |

## 代码风格

### 1. 组件结构

```tsx
import type { FC } from 'react'
import styles from './ComponentName.module.css'

interface ComponentNameProps {
  // props 定义
}

export const ComponentName: FC<ComponentNameProps> = (props) => {
  return (
    // JSX
  )
}
```

### 2. 样式系统

1. CSS Modules（.module.css）为主要样式载体
2. 所有视觉值通过 CSS 变量引用
3. 禁止使用 styled-components
4. 禁止内联 style（动态值除外）
5. **禁止指定 font-family**（全局已加载 Gate_Sans，直接写 font-weight 即可）

### 3. i18n

所有 UI 文本必须使用 i18n：

```tsx
import { useTranslation } from 'next-i18next'

export const Component: FC = () => {
  const { t } = useTranslation('common')
  return <h1>{t('title')}</h1>
}
```

### 4. 响应式

使用 CSS Media Query：

```css
/* 移动端优先 */
.container {
  padding: 0 20px;
}

@media (min-width: 768px) {
  .container {
    padding: 0 24px;
  }
}

@media (min-width: 1248px) {
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }
}
```

### 5. 减弱动效支持（必须包含）

> 详细原理见 `engine/reference/motion-principles.md`。

**Phase 1（HTML 预览）：**

```html
<style>
  /* 在 .page CSS 变量定义之后添加 */
  @media (prefers-reduced-motion: reduce) {
    .page {
      --transition: 0ms;
      --transition-slow: 0ms;
    }
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
</style>
```

**Phase 2（CSS Modules）：**

```css
/* page.module.css - 在 .page 定义之后添加 */
@media (prefers-reduced-motion: reduce) {
  .page {
    --transition: 0ms;
    --transition-slow: 0ms;
  }
}
```

### 6. 图标（重要）

> **详细图标资源**: 参见 [icons/common.md](../icons/common.md)

**使用 `@gate/iconfont`，禁止使用 emoji：**

```tsx
import { GateUIIconA16PxGuanbi } from '@gate/iconfont/GateUI'

<GateUIIconA16PxGuanbi size={16} color="currentColor" />
```

**常用 Props**：

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| size | number | 16 | 图标大小 |
| color | string \| string[] | - | 颜色，支持多色 |
| className | string | - | 自定义类名 |

**标准图标尺寸**：12 / 14 / 16 / 20 / 24 / 32

**常用图标速查**：

| 场景 | 推荐图标 |
|------|----------|
| 关闭 | `GateUIIconA16PxGuanbi` |
| 搜索 | `GateUIIconA16PxLineSousuo` |
| 添加 | `GateUIIconA16PxLineTianjia` |
| 删除 | `GateUIIconA16PxShanchu` |
| 编辑 | `GateUIIconA16PxLineBianji` |
| 分享 | `GateUIIconA16PxFenxiang` |
| 下载 | `GateUIIconA16PxXiazai` |
| 右箭头 | `GateUIIconA16PxYoujiantou` |
| 左箭头 | `GateUIIconA16PxZuojiantou` |
| 成功 | `GateUIIconA16PxZhengque` |
| 警告 | `GateUIIconA16PxJinggao` |
| 错误 | `GateUIIconA16PxFillTipsError` |
| Telegram | `GateUIIconA20PxFillTelegram` |
| Twitter | `GateUIIconA20PxFillTwitter1` |

## 输出检查清单

### Phase 1（HTML 预览）检查清单

- [ ] 单文件独立 HTML，浏览器可直接打开
- [ ] 内嵌 `<style>` 包含完整 CSS 变量表
- [ ] 所有颜色/圆角通过 `var()` 引用，无硬编码
- [ ] 可交互元素有过渡动效（`transition: var(--transition)`）
- [ ] 主 CTA 有适当的视觉强调
- [ ] 响应式布局正确（@media 断点）
- [ ] font-family 仅用系统字体 fallback（HTML 预览场景），不写 Gate_Sans / Gate Product Sans
- [ ] 输出到 `ui-craft-workspaces/{domain}/pages/<name>.html`
- [ ] **Figma-ready**：核心视觉结构为静态 DOM，JS 仅用于交互逻辑
- [ ] **设计工具包**：集成 CSS 变量主题系统 + 设计控制面板 + 组件总览注册
- [ ] **Figma 交付**：启动本地服务器 + localtunnel 公网 URL 已输出给用户
- [ ] **减弱动效**：包含 `@media (prefers-reduced-motion: reduce)` 处理
- [ ] **文案质量**：CTA 为具体动词+目标；错误/空状态有引导（R30）
- [ ] **反 AI 模式**：无千篇一律卡片网格/霓虹发光/bounce 缓动（R29）

### Phase 2（Next.js 转换）检查清单

- [ ] 视觉效果与已确认的 HTML 完全一致
- [ ] CSS 变量定义在 page.module.css 的 `.page` 中
- [ ] 深浅模式通过 `:global(.classic-dark)` 切换
- [ ] 使用 @gate/iconfont，无 emoji
- [ ] CSS Modules 中无 font-family 声明（全局 Gate_Sans 已覆盖）
- [ ] 所有 UI 文本使用 i18n（useTranslation）
- [ ] 组件拆分合理（页面 + 子组件）
- [ ] `prefers-reduced-motion` 处理已包含在 page.module.css 中
- [ ] CTA 文案为具体动词+目标，错误/空状态有引导（R30）
- [ ] 未命中 R29 反 AI 模式化清单
- [ ] 完整验证流程见 `contract/verification-protocol.md`（3-Pass 管线）
- [ ] 规则 check/fix 定义见 `contract/rules.md`
- [ ] **Baseline 已保存**：源 HTML 已复制到 `ui-craft-workspaces/{domain}/baseline/<name>.html`
- [ ] **className 映射注释**：page.module.css 头部包含 HTML class → CSS Module class 映射表
- [ ] **分层架构**：视觉层（CSS）、结构层（TSX）、数据层（hooks）正确分离
- [ ] **组件边界对齐**：每个 HTML section 对应一个独立子组件
