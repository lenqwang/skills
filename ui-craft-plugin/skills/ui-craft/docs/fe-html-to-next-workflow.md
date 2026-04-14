# 前端 HTML → Next.js 工作流

> ui-craft 生成的 HTML 预览页确认后，通过 `--to-next` 转换为生产级 Next.js 代码。
> 后续设计变更通过增量补丁（`--patch`）更新，无需重新转换。

---

## 两阶段流程

```
Phase 1（默认）              Phase 2（--to-next）           Phase 3（增量更新）
+------------------+        +-----------------------+      +-------------------+
|  独立 HTML       |  确认   |  Next.js TSX          |      |  --patch          |
|  内嵌 <style>    | -----> |  CSS Modules + i18n   | ---> |  --css-patch      |
|  CSS 变量        |        |  useTranslation       |      |  --review-fix     |
|  中文文案        |        |  组件拆分 + 类型定义   |      |  Baseline diff    |
|  可直接预览      |        |  @gate/iconfont       |      |  分层更新         |
+------------------+        +-----------------------+      +-------------------+
```

## 技术栈绑定

| 项 | 绑定 |
|---|---|
| 框架 | Next.js 15（Pages Router） |
| 语言 | TypeScript（严格模式） |
| 样式 | CSS Modules + CSS 变量体系（禁止 styled-components） |
| 组件 | React 18.2（FC 类型） |
| i18n | next-i18next（useTranslation） |
| 图标 | @gate/iconfont（禁止 emoji） |
| 字体 | 全局 Gate_Sans（禁止声明 font-family） |

---

## 一、--to-next 转换

### 触发命令

```bash
/ui-craft --to-next ui-craft-workspaces/campaign/pages/my-campaign.html
```

### 转换做了什么

1. 读取已确认的 HTML 文件，**保持视觉完全一致**
2. 拆分为 Next.js 组件（页面 + 子组件），遵循分层架构
3. `<style> .page {...}` → `page.module.css`
4. 中文文案 → `useTranslation` + `public/locales/zh/*.json`
5. 占位图标 → `@gate/iconfont` 组件
6. 保存 Baseline：复制源 HTML 到 `baseline/`
7. 生成 className 映射注释

---

### 分层架构（强制）

```
src/components/{Feature}/
├── index.tsx                     ← 页面入口（导出 + getStaticProps）
├── page.module.css               ← [视觉层] CSS 变量 + 页面级样式（可安全 patch）
├── {Feature}Page.tsx             ← [结构层] 页面组件骨架（JSX 布局）
├── use{Feature}Data.ts           ← [数据层] 业务 hooks（禁止 patch）
├── types.ts                      ← 类型定义
└── components/
    ├── HeroSection/
    │   ├── HeroSection.tsx
    │   └── HeroSection.module.css
    ├── RewardCard/
    │   ├── RewardCard.tsx
    │   └── RewardCard.module.css
    └── ...
```

| 层 | 文件 | Patch 安全性 | 原则 |
|----|------|-------------|------|
| **视觉层** | `*.module.css` | ✅ 安全，可自动 patch | CSS 变量 + 样式规则，不含逻辑 |
| **结构层** | `*Page.tsx / *.tsx` | ⚠️ 需谨慎 patch | JSX 结构，可能引用 hooks |
| **数据层** | `use*.ts / *Service.ts` | ❌ 禁止 patch | 纯业务逻辑，patch 不触碰 |

**关键约束**：

1. **CSS 变量集中定义**：所有视觉 Token 在 `page.module.css` 的 `.page` 块中声明，子组件通过 `var()` 继承
2. **组件边界对齐 HTML section**：每个 `<section>` 对应一个子组件
3. **业务逻辑外置到 hooks**：TSX 中只保留结构和渲染

---

### CSS Modules 转换规则

| HTML 中 | CSS Modules 中 | 说明 |
|---------|---------------|------|
| `.page { --bg: ... }` | `.page { --bg: ... }` | 变量块原样迁移 |
| `.hero-title` | `.heroTitle` | kebab → camelCase |
| `.btn-cta` | `.btnCta` | kebab → camelCase |
| `class="card active"` | `className={\`${s.card} ${s.active}\`}` | 多 class 组合 |
| `font-family: ...` | 删除 | 全局 Gate_Sans 已覆盖 |

**className 映射注释**（page.module.css 头部自动生成）：

```css
/*
 * [ui-craft] HTML → CSS Module 映射
 * 源文件: ui-craft-workspaces/campaign/pages/my-campaign.html
 *
 * .page          → .page
 * .container     → .container
 * .hero          → .hero
 * .hero-title    → .heroTitle
 * .btn-cta       → .btnCta
 */

.page {
  --bg: #070808;
  --bg-card: #1F2023;
  --brand: #0068FF;
  --accent: #A7F757;
  /* ... */

  background: var(--bg);
  color: var(--text-primary);
  min-height: 100vh;
}

/* 深色模式 */
:global(.classic-dark) .page {
  --bg: #070808;
  --text-primary: #FAFAFA;
}
```

---

### i18n 接入

所有 UI 文本 → `useTranslation`，翻译文件放 `public/locales/zh/{namespace}.json`。

```tsx
import type { FC } from 'react'
import { useTranslation } from 'next-i18next'
import styles from './page.module.css'

const CampaignPage: FC = () => {
  const { t } = useTranslation('campaign')

  return (
    <div className={styles.page}>
      <h1 className={styles.heroTitle}>{t('hero.title')}</h1>
      <p>{t('hero.subtitle')}</p>
      <button>{t('hero.cta')}</button>
    </div>
  )
}
```

```json
// public/locales/zh/campaign.json
{
  "hero.title": "赢取百万大奖",
  "hero.subtitle": "参与交易赢取丰厚奖励",
  "hero.cta": "立即参与"
}
```

---

### 图标替换

HTML 中的占位 SVG → `@gate/iconfont` 组件：

```tsx
import { GateUIIconA16PxGuanbi } from '@gate/iconfont/GateUI'

<GateUIIconA16PxGuanbi size={16} color="currentColor" />
```

**常用图标速查**：

| 场景 | 图标组件 |
|------|---------|
| 关闭 | `GateUIIconA16PxGuanbi` |
| 搜索 | `GateUIIconA16PxLineSousuo` |
| 右箭头 | `GateUIIconA16PxYoujiantou` |
| 成功 | `GateUIIconA16PxZhengque` |
| 警告 | `GateUIIconA16PxJinggao` |
| 错误 | `GateUIIconA16PxFillTipsError` |
| Telegram | `GateUIIconA20PxFillTelegram` |
| Twitter | `GateUIIconA20PxFillTwitter1` |

标准尺寸：12 / 14 / 16 / 20 / 24 / 32。完整列表见 `engine/reference/icons.md`。

---

### 减弱动效 & 深浅模式

```css
/* page.module.css — .page 定义之后 */

/* 减弱动效 */
@media (prefers-reduced-motion: reduce) {
  .page {
    --transition: 0ms;
    --transition-slow: 0ms;
  }
}

/* 深色模式 */
:global(.classic-dark) .page {
  --bg: #070808;
  --text-primary: #FAFAFA;
}
```

---

## 二、增量补丁

> **核心痛点**：HTML 更新后，已接入业务逻辑的 Next.js 代码无法从头再来。
> 通过 baseline 追踪 + 分层 diff + 定向 patch，实现增量更新。

### Baseline 机制

```
1. /ui-craft --style xxx     → 生成 pages/campaign.html
2. /ui-craft --to-next ...   → 转换 Next.js + 自动复制到 baseline/campaign.html
3. 开发者接入业务逻辑        → Next.js 代码已包含 API/状态/事件
4. PD/UI 提出修改            → 重新生成 pages/campaign.html（覆盖旧版）
5. /ui-craft --patch ...     → 比对 baseline vs 新 HTML → 增量补丁
6. 补丁应用成功              → 更新 baseline 为新版本
```

```
ui-craft-workspaces/
├── campaign/
│   ├── pages/
│   │   └── campaign.html          ← 最新 HTML
│   └── baseline/
│       └── campaign.html          ← --to-next 时自动保存
└── patch-reports/
    └── campaign-2026-03-23.md     ← --patch 生成的变更报告
```

---

### 三种补丁命令

| 命令 | 场景 | 处理范围 |
|------|------|---------|
| `--patch` | PD 需求变更 / 设计规范迭代 | CSS 变量 + CSS 规则 + i18n + DOM 结构 |
| `--css-patch` | UI 走查修复（仅视觉调整） | CSS 变量 + CSS 规则（最快） |
| `--review-fix` | 设计师口头反馈，无新 HTML | 交互式逐项修复 |

```bash
# 完整增量补丁
/ui-craft --patch campaign-v2.html --target src/components/Campaign/

# 快速 CSS 补丁（仅视觉）
/ui-craft --css-patch campaign-v2.html --target src/pages/campaign/page.module.css

# 走查问题交互式修复
/ui-craft --review-fix --target src/components/Campaign/
```

### 变更自动分级

| 级别 | 标记 | 处理方式 | 典型场景 |
|------|------|----------|----------|
| **auto** | `[A]` | 自动应用 | CSS 变量值、样式属性值、i18n 文案 |
| **semi** | `[S]` | 生成补丁，需确认 | 新增 CSS 类、修改选择器名 |
| **manual** | `[M]` | 输出报告 + 建议 | DOM 增删、组件拆分变更 |

---

### 工作流决策树

```
变更类型判断：

  仅颜色/间距/字号? ─── 是 ──▶ /ui-craft --css-patch
       │
       否
       │
  有模块增删?     ─── 否 ──▶ /ui-craft --patch
       │
       是
       │
  新功能模块?     ─── 是 ──▶ /ui-craft --patch + 手动处理 [M] 报告
       │
       否（仅删除）
       │
  手动删除 + /ui-craft --css-patch 清理残余样式

没有新 HTML，设计师口头反馈?
  ──▶ /ui-craft --review-fix --target 组件目录
```

---

## 三、检查清单

### --to-next 转换检查

- [ ] 视觉效果与确认的 HTML **完全一致**
- [ ] CSS 变量定义在 `page.module.css` 的 `.page` 中
- [ ] className 映射注释已生成在 CSS 头部
- [ ] 深浅模式通过 `:global(.classic-dark)` 切换
- [ ] 使用 `@gate/iconfont`，无 emoji
- [ ] CSS Modules 中无 `font-family` 声明
- [ ] 所有 UI 文本使用 `useTranslation`
- [ ] 组件拆分合理（每 section → 一个子组件）
- [ ] `prefers-reduced-motion` 处理已包含
- [ ] Baseline 已保存到 `baseline/`
- [ ] 分层架构：视觉/结构/数据层正确分离
- [ ] 通过 3-Pass 验证管线（R1-R30）

### --patch 补丁检查

**执行前**：
- [ ] Baseline HTML 存在于 `baseline/`
- [ ] 新 HTML 已通过 Step 9 验证
- [ ] `--target` 路径正确
- [ ] 目标代码已 `git commit`（确保可回滚）

**执行后**：
- [ ] `pnpm lint` 通过
- [ ] CSS 变量补丁已生效（浏览器确认）
- [ ] i18n 中英文均已更新
- [ ] 结构补丁报告已阅读并处理
- [ ] Baseline 已更新为新版本

---

## 四、最佳实践

1. **首次 --to-next 后立即提交 baseline** — 确保 git 中有快照
2. **业务逻辑用 hooks 包裹** — 方便 patch 识别安全区域
3. **CSS 变量不要在子组件中重新定义** — 保持单一变量源（`.page` 块）
4. **组件文件名与 HTML section 对应** — 如 `hero` → `HeroSection.tsx`
5. **提交前跑 3-Pass 验证** — `contract/verification-protocol.md`

### 给 PD / 设计师的沟通建议

- **优先用 Design Toolkit 调参**：颜色/间距等视觉调整用设计面板预览，导出后直接 `--css-patch`
- **结构改动尽早提出**：模块增删影响大，越早调整成本越低
- **标注变更范围**：反馈时注明"仅样式"还是"涉及布局变更"，帮助选择 `--css-patch` 还是 `--patch`
