# 增量补丁工作流

> **解决核心痛点**：HTML 更新后，已接入业务逻辑的 Next.js 代码无法重头再来。
> 通过 baseline 追踪 + 分层 diff + 定向 patch，实现增量更新。

## 适用场景

| 场景 | 触发时机 | 典型改动 |
|------|----------|----------|
| PD 需求变更 | 原型/PRD 更新后重新生成 HTML | 布局调整、模块增删、文案变更 |
| UI 走查修复 | 设计师走查后提出修改意见 | 颜色、间距、字号、对齐等视觉微调 |
| 设计规范迭代 | Token/Style 更新后重新生成 HTML | CSS 变量值批量更新 |
| A/B 测试变体 | 同一页面需要多个视觉变体 | 局部样式差异 |

## 命令概览

### 1. `--patch`（完整增量补丁）

```bash
/ui-craft --patch <new-html> --target <next-component-dir>
```

**参数说明**：

| 参数 | 必填 | 说明 |
|------|------|------|
| `<new-html>` | 是 | 新版 HTML 文件路径（如 `ui-craft-workspaces/{domain}/pages/campaign-v2.html`） |
| `--target` | 是 | Next.js 组件目录（如 `src/components/Campaign/`）或页面文件（如 `src/pages/campaign.tsx`） |
| `--baseline` | 否 | 旧版 HTML 路径。省略时自动查找 `ui-craft-workspaces/{domain}/baseline/<name>.html` |
| `--dry-run` | 否 | 仅输出变更报告，不实际修改文件 |
| `--auto-apply` | 否 | CSS + i18n 变更自动应用，不逐项确认（默认需确认） |

### 2. `--css-patch`（快速视觉补丁）

```bash
/ui-craft --css-patch <new-html> --target <css-module-file>
```

仅提取 CSS 变量和样式规则差异，适用于 UI 走查场景。

**参数说明**：

| 参数 | 必填 | 说明 |
|------|------|------|
| `<new-html>` | 是 | 新版 HTML 文件路径 |
| `--target` | 是 | 目标 CSS Module 文件（如 `src/pages/campaign/page.module.css`） |
| `--baseline` | 否 | 旧版 HTML 路径 |

### 3. `--review-fix`（走查问题批量修复）

```bash
/ui-craft --review-fix --target <next-component-dir>
```

交互式模式：逐项描述 UI 走查问题，自动定位到对应的 CSS/TSX 文件并生成修复。

**参数说明**：

| 参数 | 必填 | 说明 |
|------|------|------|
| `--target` | 是 | Next.js 组件目录 |
| `--from-html` | 否 | 参考 HTML（提供时可自动比对差异） |

---

## Baseline 机制

### 原理

每次 `--to-next` 转换时，自动将源 HTML 复制到 `baseline/` 目录作为快照。后续 `--patch` 时，通过比对 baseline 与新 HTML 的差异，精确识别变更点。

### 目录结构

```
ui-craft-workspaces/
├── {domain}/
│   ├── pages/
│   │   └── campaign.html          ← 最新 HTML（PD 改动后重新生成）
│   └── baseline/
│       └── campaign.html          ← --to-next 时自动保存的快照
└── patch-reports/                  ← 跨 domain 共享
    └── campaign-2026-03-11.md     ← --patch 生成的变更报告
```

### Baseline 生命周期

```
1. /ui-craft --style xxx    → 生成 pages/campaign.html
2. /ui-craft --to-next ...  → 转换为 Next.js + 自动复制到 baseline/campaign.html
3. 开发者接入业务逻辑       → Next.js 代码已包含 API/状态/事件
4. PD/UI 提出修改           → 重新生成 pages/campaign.html（覆盖旧版）
5. /ui-craft --patch ...    → 比对 baseline vs 新 HTML → 增量补丁
6. 补丁应用成功             → 更新 baseline/campaign.html 为新版本
```

### 无 Baseline 降级策略

当 `baseline/` 中找不到对应文件时：

1. 检查 git 历史中 `ui-craft-workspaces/{domain}/pages/<name>.html` 的上一个版本
2. 如果 git 也没有，进入**全量比对模式**：直接分析新 HTML 与现有 Next.js 代码的映射关系
3. 全量比对模式下，所有变更都标记为"需人工确认"

---

## `--patch` 完整流程

### Phase 1: Diff 分析

```
输入：baseline HTML + 新 HTML
输出：结构化变更清单（ChangeSet）

1. 解析两份 HTML 的 <style> 块
   ├── 提取 .page 中的 CSS 变量声明
   ├── 提取所有 CSS 类及其属性
   └── 提取 @media 规则

2. 解析两份 HTML 的 DOM 结构
   ├── 按 section 级别划分区块
   ├── 提取每个区块的类名、结构层级、文本内容
   └── 建立 HTML section ↔ Next.js 组件的映射关系

3. 生成 ChangeSet：
   {
     cssVarChanges: [       // CSS 变量变更
       { var: '--accent', old: '#A7F757', new: '#FFD700', severity: 'auto' }
     ],
     cssRuleChanges: [      // CSS 规则变更
       { selector: '.heroTitle', prop: 'font-size', old: '48px', new: '56px', severity: 'auto' }
     ],
     structuralChanges: [   // DOM 结构变更
       { type: 'added', section: 'countdown-banner', html: '...', severity: 'manual' }
     ],
     contentChanges: [      // 文案变更
       { key: 'hero.title', old: '赢取大奖', new: '赢取百万大奖', severity: 'auto' }
     ],
     mediaQueryChanges: []  // 响应式断点变更
   }
```

### Phase 2: 变更分类与风险评估

每项变更标记为三种处理级别：

| 级别 | 标记 | 处理方式 | 典型场景 |
|------|------|----------|----------|
| **auto** | `[A]` | 自动应用 | CSS 变量值、样式属性值、i18n 文案 |
| **semi** | `[S]` | 自动生成补丁，需人工确认 | 新增 CSS 类、修改选择器名 |
| **manual** | `[M]` | 输出 diff 报告 + 建议操作 | DOM 结构增删、组件拆分变更 |

**分类规则**：

```
CSS 变量值变更           → [A] auto：直接替换 .module.css 中的变量值
CSS 属性值变更           → [A] auto：直接替换 .module.css 中的属性值
CSS 新增属性             → [S] semi：在对应类中追加属性
CSS 新增类               → [S] semi：追加到 .module.css + 提示 TSX 引用
CSS 删除类               → [M] manual：可能影响 TSX className 引用
DOM 区块顺序变更         → [M] manual：涉及 TSX 组件顺序调整
DOM 新增区块             → [M] manual：需要新建组件或扩展现有组件
DOM 删除区块             → [M] manual：需确认是否有业务逻辑绑定
DOM 属性/类名变更        → [S] semi：className 映射可自动处理
i18n 文案变更            → [A] auto：直接更新 JSON
i18n 新增 key            → [A] auto：追加到 JSON + 提示 TSX 引用
i18n 删除 key            → [M] manual：需确认是否有动态引用
```

### Phase 3: 定向 Patch

按以下顺序应用补丁：

#### 3.1 CSS 变量补丁（最安全）

```
目标文件：page.module.css（或包含 .page 变量块的文件）
操作：在 .page { } 块中替换变量值

示例：
  --accent: #A7F757;  →  --accent: #FFD700;
  --radius-card: 8px; →  --radius-card: 12px;
```

**注意**：CSS 变量补丁是最安全的操作，因为：
- 所有组件通过 `var()` 引用，改变量值即改全局表现
- 不影响任何 TSX 结构或业务逻辑
- 对应 PD/UI 最常见的改动类型（颜色、间距、圆角）

#### 3.2 CSS 规则补丁

```
目标文件：*.module.css
操作：
  - 值变更：替换属性值
  - 新增属性：在对应选择器块末尾追加
  - 新增选择器：在文件末尾追加（--auto-apply 时）或输出到报告

示例：
  .heroTitle { font-size: 48px; }  →  .heroTitle { font-size: 56px; }
```

**选择器映射规则**：
- HTML 中 `.hero-title` → CSS Modules 中 `.heroTitle`（驼峰转换）
- HTML 中 `.card.active` → CSS Modules 中 `.cardActive` 或 `.card` + `.active` 组合
- 无法确定映射时，标记为 `[M]` 输出到报告

#### 3.3 i18n 补丁

```
目标文件：public/locales/zh/<namespace>.json
操作：
  - 值变更：替换翻译值
  - 新增 key：追加到 JSON
  - 同步更新 en/<namespace>.json 中的 key 结构（值标记 TODO）

示例：
  "hero.title": "赢取大奖"  →  "hero.title": "赢取百万大奖"
```

#### 3.4 结构补丁（需人工确认）

结构变更不自动应用，而是生成**补丁报告**：

```markdown
## 结构变更报告

### [M-1] 新增区块：倒计时横幅
- **位置**：Hero 区域下方
- **HTML 片段**：<section class="countdown-banner">...</section>
- **建议操作**：
  1. 创建 `CountdownBanner.tsx` + `CountdownBanner.module.css`
  2. 在 `CampaignPage.tsx` 的 `<HeroSection />` 后插入 `<CountdownBanner />`
  3. 新增 i18n key：`countdown.title`, `countdown.subtitle`
- **参考 TSX 代码**：
  ```tsx
  export const CountdownBanner: FC = () => { ... }
  ```
- **影响范围**：仅页面布局层，不影响现有业务逻辑

### [M-2] 删除区块：底部 Banner
- **当前位置**：`src/components/Campaign/BottomBanner.tsx`
- **⚠ 业务逻辑检查**：
  - 该组件包含 `useTrackEvent('bottom_banner_click')`
  - 该组件引用了 `useCampaignStore().bannerData`
- **建议操作**：
  1. 确认业务侧是否仍需要埋点数据
  2. 注释而非删除组件文件（保留回滚能力）
  3. 在 `CampaignPage.tsx` 中注释引用
```

### Phase 4: 验证与确认

```
1. 补丁应用后，运行 pnpm lint 检查语法
2. 如果 --target 是完整页面，运行 pnpm dev 并提示用户预览
3. 输出变更摘要：
   - [A] 已自动应用: 12 项（CSS 变量 8 + CSS 规则 3 + i18n 1）
   - [S] 需确认: 2 项（新增 CSS 类）
   - [M] 需手动处理: 1 项（新增区块）
4. 更新 baseline：复制新 HTML 到 baseline/ 覆盖旧版
```

---

## `--css-patch` 快速流程

> UI 走查场景的极简版本，只处理 CSS 层面的变更。

```
步骤 1: 解析 baseline 和新 HTML 的 <style> 块
步骤 2: 提取 CSS 变量差异 + CSS 规则差异
步骤 3: 读取目标 .module.css 文件
步骤 4: 逐项替换变量值和属性值
步骤 5: 输出变更摘要
步骤 6: 更新 baseline
```

**与 `--patch` 的区别**：
- 不分析 DOM 结构变更
- 不处理 i18n 文案变更
- 不生成结构补丁报告
- 速度更快，适合高频小调整

---

## `--review-fix` 交互式流程

> 无新 HTML 的场景：设计师口头/文档反馈走查问题，开发者逐项修复。

```
步骤 1: 读取 --target 目录的组件结构和样式文件
步骤 2: 进入交互循环：
         ├── 用户描述问题（如 "hero 标题字号太小，改成 56px"）
         ├── 自动定位到对应的 CSS 文件和选择器
         ├── 生成修复补丁并展示预览
         ├── 用户确认 → 应用补丁
         └── 用户继续下一个问题或结束
步骤 3: 输出修复摘要
步骤 4: 如果提供了 --from-html，同步更新 HTML 保持一致
```

**定位策略**：

| 用户描述 | 定位逻辑 |
|----------|----------|
| "hero 标题" | 搜索 TSX 中含 hero/title 的 className → 找到对应 CSS 类 |
| "第二个卡片" | 解析组件树，定位第二个 Card 组件的样式 |
| "CTA 按钮颜色" | 搜索 CSS 中含 cta/btn + color/background 的规则 |
| "间距太大" | 搜索 CSS 中的 padding/margin/gap 属性 |

---

## `--to-next` 增强：分层架构约束

> 为了让后续 `--patch` 更加顺畅，`--to-next` 转换时必须遵循以下分层约束。

### 产物结构规范

```
src/components/{Feature}/
├── index.tsx                    ← 页面入口（导出 + getStaticProps）
├── page.module.css              ← 【视觉层】CSS 变量 + 页面级样式（可安全 patch）
├── {Feature}Page.tsx            ← 【结构层】页面组件骨架（JSX 布局）
├── use{Feature}Data.ts          ← 【数据层】业务 hooks（API/状态/计算逻辑）
├── {Feature}Service.ts          ← 【服务层】API 请求封装（可选）
├── types.ts                     ← 类型定义
└── components/
    ├── HeroSection/
    │   ├── HeroSection.tsx      ← 子组件 TSX
    │   └── HeroSection.module.css ← 子组件样式
    ├── RewardCard/
    │   ├── RewardCard.tsx
    │   └── RewardCard.module.css
    └── ...
```

### 分层原则

| 层 | 文件 | Patch 安全性 | 说明 |
|----|------|-------------|------|
| **视觉层** | `*.module.css` | 安全，可自动 patch | CSS 变量 + 样式规则，不含业务逻辑 |
| **结构层** | `*Page.tsx` / `*.tsx` | 需谨慎 patch | JSX 结构，可能引用业务 hooks |
| **数据层** | `use*.ts` / `*Service.ts` | 禁止 patch | 纯业务逻辑，patch 流程不触碰 |
| **类型层** | `types.ts` | 不 patch | 接口定义，跟随数据层 |

### 关键约束

1. **CSS 变量集中定义**：所有视觉 Token 必须在 `page.module.css` 的 `.page` 块中声明，子组件通过 `var()` 继承
2. **组件边界对齐 HTML section**：HTML 中每个 `<section>` 或语义区块对应一个 Next.js 子组件
3. **业务逻辑外置**：TSX 中只保留结构和渲染，所有 API 调用、状态管理、事件处理通过 hooks 注入
4. **className 映射表**：`--to-next` 时在 `page.module.css` 头部注释中记录 HTML class → CSS Module class 的映射

### className 映射注释（`--to-next` 时自动生成）

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
 * .hero-subtitle → .heroSubtitle
 * .card          → .card
 * .card-header   → .cardHeader
 * .btn-cta       → .btnCta
 * .countdown     → .countdown
 */

.page {
  --bg: #070808;
  /* ... */
}
```

这个映射表让 `--patch` 能精确定位 HTML class 到 CSS Module class 的对应关系。

---

## 补丁报告格式

> `--patch` 执行后自动生成，保存到 `ui-craft-workspaces/patch-reports/`。

### 文件名规范

```
ui-craft-workspaces/patch-reports/<page-name>-<date>.md
```

### 报告结构

```markdown
# Patch Report: campaign

- **日期**: 2026-03-11
- **Baseline**: ui-craft-workspaces/{domain}/baseline/campaign.html
- **新版本**: ui-craft-workspaces/{domain}/pages/campaign.html
- **目标**: src/components/Campaign/

## 变更摘要

| 类型 | 数量 | 自动应用 | 需确认 | 需手动 |
|------|------|----------|--------|--------|
| CSS 变量 | 5 | 5 | 0 | 0 |
| CSS 规则 | 3 | 2 | 1 | 0 |
| i18n | 2 | 2 | 0 | 0 |
| DOM 结构 | 1 | 0 | 0 | 1 |
| **总计** | **11** | **9** | **1** | **1** |

## [A] 已自动应用

### CSS 变量
| 变量 | 旧值 | 新值 | 文件 |
|------|------|------|------|
| `--accent` | `#A7F757` | `#FFD700` | page.module.css:15 |
| `--radius-card` | `8px` | `12px` | page.module.css:22 |

### CSS 规则
| 选择器 | 属性 | 旧值 | 新值 | 文件 |
|--------|------|------|------|------|
| `.heroTitle` | `font-size` | `48px` | `56px` | page.module.css:45 |

### i18n
| Key | 旧值 | 新值 | 文件 |
|-----|------|------|------|
| `hero.title` | `赢取大奖` | `赢取百万大奖` | zh/campaign.json:3 |

## [S] 需确认

### 新增 CSS 类: `.countdownLabel`
- **来源**: 新 HTML 中 `.countdown-label` 类
- **建议文件**: page.module.css
- **建议内容**:
  ```css
  .countdownLabel {
    font-size: 12px;
    color: var(--text-muted);
    text-transform: uppercase;
  }
  ```
- **TSX 引用提示**: 在使用处添加 `className={styles.countdownLabel}`

## [M] 需手动处理

### [M-1] 新增区块：倒计时横幅

（详见 Phase 3 - 3.4 中的结构补丁示例）

## Baseline 更新

- [x] baseline/campaign.html 已更新为新版本
```

---

## 最佳实践

### 给前端开发者

1. **首次 `--to-next` 后立即提交 baseline**：确保 git 中有快照记录
2. **业务逻辑用 hooks 包裹**：方便 patch 时识别"安全区域"
3. **CSS 变量不要在子组件中重新定义**：保持单一变量源（`.page` 块）
4. **组件文件名与 HTML section 对应**：如 `hero` → `HeroSection.tsx`

### 给 PD / 设计师

1. **优先使用 Design Toolkit 调参**：颜色、间距等视觉调整可以通过 design-toolkit.js 面板实时预览，导出 CSS 变量后直接 `--css-patch`
2. **结构改动尽早提出**：模块增删影响范围大，越早调整成本越低
3. **标注变更范围**：反馈时注明"仅样式调整"还是"涉及布局变更"，帮助开发选择 `--css-patch` 还是 `--patch`

### 工作流选择指南

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
  新功能模块?     ─── 是 ──▶ /ui-craft --patch + 手动处理结构补丁
       │
       否（仅删除）
       │
  手动删除 + /ui-craft --css-patch 处理剩余样式变更
```

---

## 检查清单

### `--patch` 执行前

- [ ] baseline HTML 存在（`ui-craft-workspaces/{domain}/baseline/<name>.html`）
- [ ] 新 HTML 已生成且通过 Step 9 验证
- [ ] `--target` 路径正确指向 Next.js 组件目录
- [ ] 目标代码已 git commit（确保可回滚）

### `--patch` 执行后

- [ ] `pnpm lint` 通过
- [ ] CSS 变量补丁已生效（浏览器预览确认）
- [ ] i18n 补丁已生效（中英文均更新）
- [ ] 结构补丁报告已阅读并处理
- [ ] baseline 已更新为新版本
- [ ] 补丁报告已保存到 `ui-craft-workspaces/patch-reports/`

### `--css-patch` 执行后

- [ ] CSS 变量值已更新
- [ ] 无 CSS 语法错误
- [ ] 视觉效果与新 HTML 一致
- [ ] baseline 已更新
