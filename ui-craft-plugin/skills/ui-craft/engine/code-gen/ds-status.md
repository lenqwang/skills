# 设计系统仪表盘规格

> `/ui-craft --ds status` 命令的生成规范。
> 产物：`ui-craft-workspaces/ds-status.html`
> 面向设计师，浏览器打开即用，集成 design-toolkit.js。
> 视觉参考：Ant Design 暗色主题组件总览页（sidebar + 卡片网格）。

---

## 1. 触发方式

```bash
/ui-craft --ds status
```

## 2. 最小读取集

| 必读 | 说明 |
|------|------|
| `domains/*/components/*.md` | 各域组件文件（检查 [DRAFT]） |
| `domains/campaign/styles/*.md`（除 `_template.md`、`README.md`） | 风格文件元信息 |
| `domains/*/business/*.md` | 各域业务规范文件 |
| `ui-craft-workspaces/*/pages/*.html` | 各域页面产物 |
| `ui-craft-workspaces/*/preview/*.html` | 各域组件预览（排除 index.html） |
| 本文件 | 生成规则 |

---

## 3. 页面布局 — Sidebar + Main

采用固定侧栏 + 主内容区双栏布局，**无全局汇总卡片**。

```
┌─ Sidebar (240px fixed) ───────┬─ Main Content (flex:1 scroll) ──────────────┐
│                               │                                             │
│  UI Craft DS [V3]             │  设计系统总览                                │
│  Domain-First · 日期          │  4 个业务域 · N 组件 · N 风格 · N 产物        │
│  ─────────────────            │                                             │
│  ● Campaign                   │  ┌─ Campaign ─────────────────────────────┐ │
│    Components        14       │  │  Components 14                         │ │
│    Styles             9       │  │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐  │ │
│    Artifacts         25       │  │  │Card  │ │Card  │ │Card  │ │Card  │  │ │
│  ─────────────────            │  │  │ icon │ │ icon │ │ icon │ │ icon │  │ │
│  ● _platform                  │  │  └──────┘ └──────┘ └──────┘ └──────┘  │ │
│    Components        20       │  │  ...                                   │ │
│  ─────────────────            │  │                                        │ │
│  ● Exchange                   │  │  Styles 9                              │ │
│    Components        18       │  │  ┌────────┐ ┌────────┐ ┌────────┐     │ │
│    Business           3       │  │  │StyleCd │ │StyleCd │ │StyleCd │     │ │
│  ─────────────────            │  │  └────────┘ └────────┘ └────────┘     │ │
│  ● Web3Pay                    │  │  ...                                   │ │
│    Components        23       │  │                                        │ │
│    Business           2       │  │  Artifacts 25                          │ │
│  ─────────────────            │  │  Pages (13)    │  Preview (12)         │ │
│  QUICK ACTIONS                │  │  ├── name [打开] │  ├── name [打开]     │ │
│  --new-component              │  │  └── ...        │  └── ...             │ │
│  --new-style                  │  └────────────────────────────────────────┘ │
│  ...                          │                                             │
└───────────────────────────────┴─────────────────────────────────────────────┘
```

---

## 4. Sidebar 规格

### 4.1 结构

```html
<nav class="sidebar">  <!-- 240px / fixed / left / overflow-y:auto -->
  Logo区：标题 + 版本 badge + 日期
  ──────
  域分组 ×4（每组之间 divider 分隔）：
    域标题行：● 品牌色圆点 + 域名（font-weight:600）
    子项 ×N：锚点链接（缩进 24px），右侧计数
  ──────
  Quick Actions：命令列表
</nav>
```

### 4.2 交互

- 侧栏项 `<a href="#section-id">`，点击锚点跳转
- **滚动高亮**：监听 `scroll` 事件，当前视口内的 section 对应侧栏项添加 `.active` 类
- `.active` 样式：`background: var(--brand); color: #fff; border-radius: 6px;`

### 4.3 响应式

- `≤ 900px`：`sidebar { display: none; }` + `main { margin-left: 0; }`

---

## 5. 主内容区

### 5.1 页面头

```html
<h1 class="page-title">设计系统总览</h1>
<p class="page-desc">{域数} 个业务域 · {总组件数} 组件 · {风格数} 风格 · {产物数} 产物</p>
```

### 5.2 域 Section 通用结构

每个域一个 `<div class="domain-section" id="xxx">`，内含：

```
section-head：域名（品牌色）+ count-badge + head-meta 统计
sub-head：子分区标题 + count-badge
内容区（卡片网格 / 列表 / chip）
```

域间距 `56px`，sub-head 间距 `24px 0 12px`。

---

## 6. 组件卡片规格（Mini Preview 风格）

### 6.1 网格

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);  /* 默认 3 列 */
  gap: 16px;
}
```

响应式断点：
- `≤ 1100px` → 2 列
- `≤ 900px` → 2 列（侧栏隐藏）
- `≤ 480px` → 1 列

### 6.2 单张卡片结构

```
┌─────────────────────────────────┐
│                                 │
│     Mini Preview 区域            │  ← comp-card-preview（180px / 深色背景）
│     用纯 CSS/HTML 渲染组件缩略图   │     使用 mp-* CSS 类构建迷你组件
│                                 │
├─────────────────────────────────┤
│  Component Name 中文名           │  ← h3（16px / font-weight:700）
│  变体/功能描述文字               │  ← p（12px / text-muted）
│  [TYPE_BADGE]                   │  ← 域类型标签
└─────────────────────────────────┘
```

**Preview 区域**（关键特性）：
- 高度固定 `180px`，背景 `var(--bg-preview)` (#1a1a1e)
- 内容为纯 CSS/HTML 构建的**迷你组件渲染**，不是 Unicode 图标占位
- 用 `mp-*` 前缀 CSS 类绘制各类组件的缩略视图
- 居中对齐，`padding: 24px`

**Info 区域**：
- 组件名：`英文名 中文名`（如 "Button 按钮"）
- 描述：简述变体和功能（如 "Primary / Secondary / Neutral / CTA + 4 种尺寸"）
- 类型标签：
  - Campaign → `CAMPAIGN`（蓝色）
  - _platform → `SHARED`（蓝色）
  - Exchange → `EXCHANGE`（蓝色），DRAFT 组件用 `DRAFT`（橙色）
  - Web3Pay → `WEB3`（绿色）

**链接行为**：
- 有 preview HTML 的卡片整体 `<a>` 包裹，可点击跳转
- 无 preview 的卡片用 `<div>`

### 6.3 各组件 Mini Preview 实现

每个组件的 preview 区域用 `mp-*` CSS 类构建真实的缩略组件效果：

| 组件 | Preview 内容 |
|------|-------------|
| Button | `.mp-btns` 容器 + `.mp-btn-primary/.mp-btn-secondary/.mp-btn-cta/.mp-btn-accent` 按钮 |
| Card | `.mp-card-mock` 卡片容器（标题 + 描述） |
| Input | `.mp-inputs` 纵排 3 个 `.mp-input`（default / focus / error 三态） |
| Modal | `.mp-modal` 弹窗（标题 + 文字 + 取消/确认按钮） |
| Table | `.mp-table` + `.mp-table-row` × N（#/用户/收益 列） |
| Countdown | `.mp-countdown` + `.mp-count-block` × 4（Days/Hrs/Min/Sec） |
| Tag | `.mp-tags` + `.mp-tag-brand/.mp-tag-neutral/.mp-tag-outline/.mp-tag-accent/.mp-tag-hot` |
| Hero | `.mp-hero` 渐变背景区（标题 + 副标题 + CTA 按钮） |
| Progress | `.mp-progress` + `.mp-bar-wrap` × N（不同颜色进度条） |
| Rank | `.mp-rank` + `.mp-rank-item` × 5（排名/用户/金额） |
| Lottery | `.mp-lottery` 3×3 grid（8 奖品格 + 1 CTA 格） |
| Rules | `.mp-accordion` + `.mp-acc-item` × 3（折叠面板） |
| Mystery Box | `.mp-box` + `.mp-box-body`（渐变盒子 + 问号 + 星光点缀） |
| Misc | `.mp-misc` 垂直排列（倒计时块 + Tab 导航 `.mp-tabs-mock`） |

_platform / Exchange / Web3Pay 组件同样用 CSS 构建缩略预览（风格简化但保持真实感）。

### 6.4 mp-* CSS 类速查

```css
/* 按钮 */
.mp-btns         /* flex wrap 容器 */
.mp-btn          /* 通用按钮基础 */
.mp-btn-primary  /* 蓝底白字 */
.mp-btn-secondary/* 透明 + 边框 */
.mp-btn-cta      /* 白边框 */
.mp-btn-accent   /* 绿色边框 */

/* 输入框 */
.mp-inputs       /* column 容器 */
.mp-input        /* 通用输入框 */
.mp-input-focus  /* 蓝色边框态 */
.mp-input-error  /* 红色边框态 */

/* 弹窗 */
.mp-modal        /* 弹窗容器 + shadow */
.mp-modal-actions/* 底部按钮行 */

/* 表格 */
.mp-table        /* 表格容器 */
.mp-table-row    /* 表格行 */
.mp-table-cell   /* 表格单元 */

/* 倒计时 */
.mp-countdown    /* flex 容器 */
.mp-count-block  /* 单个数字块 */

/* 标签 */
.mp-tags         /* flex wrap 容器 */
.mp-tag          /* 通用标签 */
.mp-tag-brand/neutral/outline/accent/hot

/* 其他 */
.mp-hero         /* 渐变 Hero 区 */
.mp-progress     /* 进度条组 */
.mp-bar/.mp-bar-fill
.mp-rank/.mp-rank-item
.mp-lottery/.mp-lottery-cell
.mp-accordion/.mp-acc-item
.mp-box/.mp-box-body
.mp-misc/.mp-tabs-mock
```

### 6.3 组件命名映射

卡片标题显示 `英文名 中文名`，映射表：

| 文件名 | 显示名 |
|--------|--------|
| button | Button 按钮 |
| card | Card 卡片 |
| countdown | Countdown 倒计时 |
| modal | Modal 弹窗 |
| input | Input 输入框 |
| table | Table 表格 |
| tag | Tag 标签 |
| tabs | Tabs 标签页 |
| badge | Badge 徽标 |
| checkbox | Checkbox 复选 |
| switch | Switch 开关 |
| toast | Toast 提示 |
| tooltip | Tooltip 气泡 |
| loading | Loading 加载 |
| pagination | Pagination 分页 |
| divider | Divider 分割线 |
| progress-bar | Progress Bar 进度 |
| empty-state | Empty State 空状态 |

未在映射表中的组件直接使用文件名（首字母大写）。

---

## 7. 风格卡片规格

### 7.1 网格

```css
.style-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);  /* 默认 3 列 */
  gap: 16px;
}
```

响应式：`≤ 1100px` → 2 列，`≤ 900px` → 1 列。

### 7.2 单张卡片

```
┌─────────────────────────┐
│  style-name              │  ← 14px / font-weight:600
│  style-desc（截断）       │  ← 12px / text-muted
│─────────────────────────│
│  [mode-tag]  校准状态  vars │  ← foot 行
└─────────────────────────┘
```

- mode-tag：`dark` / `light` / `both`，小 pill 背景
- 校准：`calibrated_at` 有值显示日期（绿色），null 显示"未校准"（disabled 色）

---

## 8. 各域面板内容

| 域 | Components | Styles | Artifacts | Business |
|------|-----------|--------|-----------|----------|
| Campaign | 3 列 Mini Preview 卡片 | 3 列风格卡片 | 双栏列表（pages + preview） | — |
| _platform | 3 列 Mini Preview 卡片 | — | — | — |
| Exchange | 3 列 Mini Preview 卡片（含 DRAFT） | — | — | 文件 chip 列表 |
| Web3Pay | 3 列 Mini Preview 卡片 | — | — | 文件 chip 列表 |

### 8.1 Artifacts 卡片网格

Artifacts 只展示生成的 HTML 页面（`pages/` 目录），Preview 已由组件卡片承载，不再重复列出。

```css
.artifact-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
```

- 每项为 `.artifact-chip`，包含文件图标 + 名称，整体 `<a>` 可点击
- 链接到 `./domain/pages/{name}.html`
- hover 时边框变蓝，图标变蓝

### 8.2 Business chip

```html
<li class="biz-chip">
  <svg>文件图标</svg> filename.md
</li>
```

---

## 9. 数据采集

| 指标 | 来源 |
|------|------|
| 组件数 | `domains/{domain}/components/` 下 `.md` 文件数 |
| DRAFT 数 | 标题含 `[DRAFT]` 的文件数 |
| 风格数 | `domains/campaign/styles/` 下除 `_template.md`、`README.md` 外的 `.md` 文件数 |
| 已校准 | 区块 1 `calibrated_at` 不为 null 的数量 |
| 产物数 | `ui-craft-workspaces/{domain}/pages/` 下 `.html` 文件数（仅 pages，不含 preview） |
| 业务文件 | `domains/{domain}/business/` 下 `.md` 文件名列表 |

---

## 10. 视觉 Token

```css
:root {
  --bg: #0a0a0a;            /* 页面底色 */
  --bg-sidebar: #111113;    /* 侧栏底色 */
  --bg-card: #141416;       /* 卡片底色 */
  --bg-card-preview: #1a1a1e; /* 卡片预览区底色 */
  --border-card: rgba(255,255,255,0.08);
  --brand: #1677ff;         /* 链接 / active 高亮 */
  --campaign: #A7F757;
  --platform: #0068FF;
  --exchange: #0055FF;
  --web3: #17E5A1;
  --sidebar-w: 240px;
}
```

---

## 11. 技术实现

- 单文件 HTML，集成 design-toolkit.js（`<script src="./design-toolkit.js"></script>`）
- 数据在生成时静态写入（不运行时动态扫描）
- 链接使用相对路径（`./campaign/pages/xxx.html`）
- 滚动高亮 JS：监听 scroll，匹配 `.sidebar-item[href]` 与对应 section
- 响应式：3 个断点（1100 / 900 / 480）

---

## 12. 检查清单

- [ ] Sidebar + Main 双栏布局
- [ ] 侧栏含 4 个域分组，每组有品牌色圆点 + 子项计数
- [ ] 侧栏滚动高亮 JS 正常工作
- [ ] 组件使用 3 列卡片网格
- [ ] 卡片结构：上方 Mini Preview 区域（180px，CSS 渲染缩略图）+ 下方 Info 区域（名称 + 描述 + 类型标签）
- [ ] 每个组件的 Preview 用 mp-* CSS 类构建真实缩略效果（非 Unicode 图标占位）
- [ ] 有 preview HTML 的卡片整体可点击
- [ ] Campaign 面板含 Components + Styles + Artifacts 三个分区
- [ ] Styles 使用 3 列卡片网格
- [ ] _platform 面板仅含 Components
- [ ] Exchange DRAFT 组件标记正确
- [ ] Web3Pay + Exchange 含 Business 分区
- [ ] Campaign 链接（pages + preview）可正常跳转
- [ ] 集成 design-toolkit.js
- [ ] 响应式：900px 以下隐藏侧栏，卡片降列
- [ ] 无全局汇总卡片
