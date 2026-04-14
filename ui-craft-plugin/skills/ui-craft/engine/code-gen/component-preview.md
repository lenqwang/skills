# 组件预览生成规范

> 从组件 markdown 规范自动生成预览 HTML，用于规范制定时的即时验证。
> markdown 是唯一真相源 — 不维护额外模板。

---

## 1. 触发方式

```bash
# 预览单个组件
/ui-craft --preview button

# 指定风格（覆盖默认 CSS 变量）
/ui-craft --preview button --style vip-warm-elite

# 多风格并排对比
/ui-craft --preview button --compare default,competition,vip-warm-elite

# 全部组件目录页
/ui-craft --preview all

# 对比 git 变更前后（进阶）
/ui-craft --preview button --diff
```

---

## 2. 最小读取集

| 参数 | 必读 | 按需读 |
|------|------|--------|
| `--preview <component>` | `domains/{domain}/components/<component>.md`、`domains/{domain}/semantic.md`、本文件 | — |
| `+ --style <name>` | 同上 + `domains/campaign/styles/<name>.md` | — |
| `+ --compare s1,s2,...` | 同上 + 每个 `domains/campaign/styles/<si>.md` | — |
| `--preview all` | 所有 `domains/*/components/*.md`、`domains/{domain}/semantic.md`、本文件 | — |
| `+ --diff` | 同上 + `git diff` 获取变更前版本 | — |

---

## 3. Markdown 表格解析规则

### 3.1 表格格式识别

组件 markdown 中有两种表格格式：

**4 列格式**：`| 属性 | Token | CSS | 值 |`
- 取 **CSS 列** 作为样式属性值（如 `var(--brand)`）
- 取 **值列** 作为 fallback 和预览展示

**3 列格式**：`| 属性 | Token | 值 |`
- 无 CSS 列，取 **值列** 作为直接值

**特殊格式**（如嵌套卡片、排行榜）：`| 部件/部位 | ... |`
- 按上下文语义解析，见各组件渲染策略

### 3.2 属性 → CSS property 映射

| 属性关键词 | CSS property | 备注 |
|-----------|-------------|------|
| 背景色 / 背景 | `background` | 包含渐变时用 `background` |
| 悬停背景色 | `background`（`:hover` 状态下） | |
| 文字色 / 次要文字色 | `color` | |
| 圆角 | `border-radius` | |
| 高度 | `height` | |
| 内边距 | `padding` | |
| 边框 / 边框色 | `border` | |
| 阴影 | `box-shadow` | |
| 字体 | `font-size` | 从值中提取 px 数字 |
| 最小宽度 | `min-width` | |
| 遮罩透明度 | `opacity` | 用于 overlay |
| 层级 | `z-index` | |
| 占位符色 | `color`（`::placeholder`） | |
| 聚焦边框色 | `border-color`（`:focus` 状态下） | |

### 3.3 值解析优先级

1. CSS 列有 `var(--xxx)` → 直接使用
2. CSS 列为 `—` 或空 → 用值列的字面值
3. 值列含 `/` 分隔（如 `48px / 56px`）→ 多尺寸变体，分别展示
4. 值列含 `rgba(...)` → 直接使用

---

## 4. 各组件渲染策略

### 4.1 Button 按钮

**布局**：纵向排列变体（Primary → Secondary → Neutral → CTA → Accent CTA），每个变体横向排列尺寸梯度。

**渲染结构**：
```
┌─ Primary ──────────────────────────────────────────┐
│  [Small]  [Medium]  [Large]  [Campaign]            │
│  [Small:hover]  [Medium:hover]  ...                │
│  [Small:disabled]  [Medium:disabled]  ...          │
└────────────────────────────────────────────────────┘

┌─ Secondary ────────────────────────────────────────┐
│  [Small]  [Medium]  [Large]  [Campaign]            │
└────────────────────────────────────────────────────┘

... 同理 Neutral / CTA / Accent CTA
```

**状态行**：
- Normal — 默认表格属性
- Hover — 有 `悬停背景色` 行时展示，否则用 `filter: brightness(1.1)`
- Disabled — `opacity: 0.4; cursor: not-allowed`

**尺寸表格**：从 `## 尺寸` 表格提取 height / padding / font-size，应用到每个变体。

### 4.2 Card 卡片

**布局**：每种卡片类型独立大块展示，内含示例内容。

**渲染结构**：
```
┌─ 常规卡片 ──────────────────┐
│  标题文本                    │
│  描述内容示例                │
│  [按钮]                     │
└─────────────────────────────┘

┌─ 活动页黑卡 ────────────────┐   ┌─ 活动页白卡 ─────────────┐
│  ...                        │   │  ...                     │
└─────────────────────────────┘   └──────────────────────────┘

┌─ 活动页蓝卡 ────────────────┐
│  ...                        │
└─────────────────────────────┘

┌─ 嵌套活动卡片 ──────────────────────────────────────┐
│  外层黑卡                                           │
│  ┌─ 内嵌白卡 ─────────────────────────────────────┐ │
│  │  奖励表格示例                                   │ │
│  └────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
```

**示例内容**：每张卡片填充标题（`headline.medium`）+ 2 行描述文本 + 一个按钮。嵌套卡片内嵌一个简单的 3 行表格。

### 4.3 Input 输入框

**布局**：横向 4 态并排。

**渲染结构**：
```
[Default]  [Focus]  [Error]  [Disabled]
```

**状态映射**：
| 状态 | 样式 |
|------|------|
| Default | 表格默认属性 |
| Focus | `border-color` 用聚焦边框色（`var(--brand)`） |
| Error | `border-color: var(--error)` |
| Disabled | `opacity: 0.4; pointer-events: none` |

**占位文本**：使用 `placeholder="请输入..."` + `::placeholder` 用占位符色。

### 4.4 Modal 弹窗

**布局**：静态展示（非悬浮弹窗），展示完整结构。

**渲染结构**：
```
┌─ 标题栏 ────────── [x] ──┐
│                           │
│  内容区域                 │
│  说明文本示例             │
│                           │
│  ┌─────────┐ ┌─────────┐ │
│  │  取 消  │ │  确 认  │ │
│  └─────────┘ └─────────┘ │
└───────────────────────────┘
```

**规格**：
- 固定宽度 480px，max-width: 90%
- 背景/圆角/阴影/内边距从表格提取
- 标题居中，`headline.medium` 排版
- 关闭按钮：绝对定位右上角，44x44 热区
- 底部按钮区固定间距 24px

### 4.5 Table 表格与排行榜

**布局**：3-5 行示例数据 + 排名装饰。

**排行榜渲染**：
```
┌──────────────────────────────────────────────┐
│  #   用户名          交易量       收益       │
├──────────────────────────────────────────────┤
│  1   user_alpha      $1,234,567   $12,345   │  ← TOP1 金色高亮行
│  2   user_beta       $987,654     $9,876    │  ← TOP2 银色高亮行
│  3   user_gamma      $654,321     $6,543    │  ← TOP3 铜色高亮行
│  4   user_delta      $321,098     $3,210    │
│  5   user_epsilon    $123,456     $1,234    │
└──────────────────────────────────────────────┘
```

**排名装饰**：TOP 1-3 行加渐变背景 `linear-gradient(to bottom, rgba(color, 0.15), transparent)`。

**奖励表格渲染**：展示时间块（倒计时样式）+ 奖励金额表格。

### 4.6 Misc 其他组件

**倒计时**：
```
┌──┐   ┌──┐   ┌──┐   ┌──┐
│12│ : │05│ : │30│ : │45│
└──┘   └──┘   └──┘   └──┘
Days    Hrs    Min    Sec
```

**Tab**：
```
  活动规则    排行榜    我的奖励
  ─────────  ────────  ────────
     ▔▔▔▔
```
激活态底部 2px 蓝色指示条 + 品牌蓝文字。

---

## 5. 预览 HTML 模板结构

### 5.1 单组件预览 (`--preview <component>`)

```html
<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>组件预览 — {ComponentName}</title>
  <style>
    /* === 重置 === */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    /* === CSS 变量（从 semantic.md 速查表提取，style 文件覆盖） === */
    .page { /* ...完整变量表... */ }

    /* === 预览布局 === */
    .preview-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px 24px;
    }
    .back-link {
      display: inline-block;
      font-size: 14px;
      color: var(--brand, #1677ff);
      text-decoration: none;
      margin-bottom: 24px;
    }
    .back-link:hover { text-decoration: underline; }
    .preview-header {
      margin-bottom: 48px;
    }
    .preview-header h1 {
      font-size: 32px;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 8px;
    }
    .preview-header p {
      font-size: 14px;
      color: var(--text-secondary);
    }
    .preview-section {
      margin-bottom: 48px;
    }
    .preview-section-title {
      font-size: 20px;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 24px;
      padding-bottom: 12px;
      border-bottom: 1px solid var(--border);
    }
    .preview-row {
      display: flex;
      gap: 16px;
      align-items: center;
      flex-wrap: wrap;
      margin-bottom: 16px;
    }
    .preview-row-label {
      font-size: 12px;
      color: var(--text-muted);
      min-width: 80px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .preview-spec-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 16px;
      font-size: 13px;
    }
    .preview-spec-table th {
      text-align: left;
      padding: 8px 12px;
      color: var(--text-muted);
      border-bottom: 1px solid var(--border);
      font-weight: 500;
    }
    .preview-spec-table td {
      padding: 8px 12px;
      color: var(--text-secondary);
      border-bottom: 1px solid rgba(255,255,255,0.05);
    }
    .preview-spec-table code {
      background: var(--bg-muted);
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 12px;
      color: var(--accent);
    }

    /* === 组件样式（从 markdown 表格提取） === */
    /* ... 按组件渲染策略生成 ... */
  </style>
</head>
<body>
  <div class="page">
    <div class="preview-container">
      <!-- 返回仪表盘链接（固定规则：preview 在 {domain}/preview/ 下，仪表盘在根目录） -->
      <a href="../../ds-status.html#campaign-components" class="back-link">&larr; 返回仪表盘</a>

      <!-- 头部 -->
      <div class="preview-header">
        <h1>{ComponentName}</h1>
        <p>来源: components/{component}.md | 风格: {styleName}</p>
      </div>

      <!-- 各 section 对应 markdown 中的 ## 标题 -->
      <div class="preview-section">
        <h2 class="preview-section-title">{## 标题}</h2>
        <!-- 渲染组件实例 -->
        <div class="preview-row">
          <span class="preview-row-label">Normal</span>
          <!-- 组件 -->
        </div>
        <div class="preview-row">
          <span class="preview-row-label">Hover</span>
          <!-- 组件 hover 态 -->
        </div>
        <!-- 规格表 -->
        <table class="preview-spec-table">
          <tr><th>属性</th><th>Token</th><th>CSS</th><th>值</th></tr>
          <!-- 从 markdown 表格直出 -->
        </table>
      </div>
    </div>
  </div>

  <!-- 设计面板（复用 guidelines.md Phase 1.1 的设计控制面板） -->
  <script>
    /* 设计面板代码 — 同 guidelines.md Phase 1.1 规范 */
  </script>
</body>
</html>
```

### 5.2 风格信息标注

当指定 `--style` 时，在头部区域标注当前风格名称及覆盖变量数量：

```html
<div class="preview-style-badge">
  风格: vip-warm-elite | 覆盖 12 个变量
</div>
```

### 5.3 多风格对比 (`--compare`)

并排 grid 布局，每列一个风格：

```html
<div class="compare-grid" style="display: grid; grid-template-columns: repeat({N}, 1fr); gap: 24px;">
  <!-- 每列一个风格 -->
  <div class="compare-column">
    <div class="compare-column-header">{styleName}</div>
    <div class="page" style="/* 该风格的 CSS 变量覆盖 */">
      <!-- 组件渲染 -->
    </div>
  </div>
  <!-- ... -->
</div>
```

**要点**：
- 每列独立的 `.page` wrapper，各自携带对应风格的 CSS 变量
- 顶部固定标注风格名称
- 同一行展示相同组件变体，便于逐项对比
- 超过 3 个风格时，切换为 2 列布局 + 纵向滚动

### 5.4 全组件目录页 (`--preview all`)

生成 `ui-craft-workspaces/{domain}/preview/index.html`，自动扫描 `components/*.md` 和 `components/*.md`：

```html
<div class="preview-index">
  <h1>组件预览目录</h1>

  <h2>基础组件 (base)</h2>
  <div class="preview-index-grid">
    <a href="button.html" class="preview-index-card">
      <div class="preview-index-card-preview"><!-- 缩略预览 --></div>
      <div class="preview-index-card-name">Button 按钮</div>
    </a>
    <!-- ... 其他组件 ... -->
  </div>

  <h2>业务组件 (business)</h2>
  <div class="preview-index-grid">
    <!-- 自动发现 components/*.md -->
  </div>
</div>
```

---

## 6. 返回链接规则

每个 preview 页面**必须**包含返回仪表盘的链接，位于 `.preview-container` 最顶部：

```html
<a href="../../ds-status.html#{domain}-components" class="back-link">&larr; 返回仪表盘</a>
```

**路径说明**：preview 文件位于 `ui-craft-workspaces/{domain}/preview/`，仪表盘位于 `ui-craft-workspaces/ds-status.html`，所以相对路径固定为 `../../ds-status.html`。

**锚点映射**：
| 域 | 锚点 |
|------|------|
| campaign | `#campaign-components` |
| _platform | `#platform-components` |
| exchange | `#exchange-components` |
| web3pay | `#web3-components` |

---

## 7. 输出路径

| 命令 | 输出文件 |
|------|----------|
| `--preview button` | `ui-craft-workspaces/{domain}/preview/button.html` |
| `--preview card --style vip-warm-elite` | `ui-craft-workspaces/{domain}/preview/card.html`（含风格覆盖） |
| `--preview button --compare a,b,c` | `ui-craft-workspaces/{domain}/preview/button--compare.html` |
| `--preview all` | `ui-craft-workspaces/{domain}/preview/index.html` + 各组件 HTML |

---

## 7. 设计面板集成

预览 HTML 复用 `guidelines.md` Phase 1.1 定义的设计面板，但做以下适配：

| 项目 | 完整页面（guidelines.md） | 组件预览（本文件） |
|------|--------------------------|-------------------|
| CSS 变量范围 | 完整页面变量表 | 仅与当前组件相关的变量 |
| 预设 | 当前风格 + 备选 | 当前风格 + `--compare` 中的所有风格 |
| 导出 | CSS 变量片段 / JSON | 同上 + **回写 markdown 入口** |
| 组件总览 | scRegister 注册体系 | 不需要（预览页本身就是总览） |
| 导入主题 | 支持 W3C Design Tokens | 同上 |

### 7.1 回写 markdown（可选交互）

设计面板微调 CSS 变量后，提供"回写规范"按钮：
1. 点击后复制当前变更的 CSS 变量差异为 JSON
2. 提示用户将 JSON 粘贴给 Claude
3. Claude 解析 JSON，反向更新组件 markdown 表格中的值列

回写格式示例：
```json
{
  "source": "component-preview",
  "component": "button",
  "changes": {
    "--radius-btn": "12px",
    "--brand": "#0055DD"
  }
}
```

---

## 8. `--diff` 模式（进阶）

对比当前工作区与 git HEAD 的组件规范差异：

1. `git show HEAD:path/to/component.md` 获取变更前版本
2. 分别解析新旧两版 markdown 表格
3. 生成并排对比预览（类似 `--compare`），左列为 HEAD 版本，右列为当前版本
4. 变更的属性行高亮标记

---

## 9. 生成流程（Claude 执行步骤）

```
1. 解析命令参数
   ├─ component: 组件名（或 "all"）
   ├─ style: 风格名（可选，默认无覆盖）
   ├─ compare: 风格列表（可选）
   └─ diff: 是否对比 git 变更（可选）

2. 读取文件
   ├─ 本文件（component-preview.md）— 获取解析规则和模板
   ├─ 组件 markdown（domains/{domain}/components/<name>.md）
   ├─ domains/{domain}/semantic.md — CSS 变量速查表
   └─ domains/campaign/styles/<name>.md — 仅 --style/--compare 时

3. 解析组件 markdown
   ├─ 识别所有 ## 标题 → 每个标题对应一个 preview-section
   ├─ 解析表格行 → 提取属性/Token/CSS/值
   └─ 按"属性→CSS property 映射"转换为样式声明

4. 生成 CSS
   ├─ .page 变量块（semantic.md 默认值）
   ├─ style 覆盖（从 style 文件区块 3 提取变量差异）
   └─ 组件类样式（从表格解析结果生成）

5. 生成 HTML
   ├─ 按组件渲染策略构建各 section
   ├─ 每个 section 下方附加规格表（直出 markdown 表格）
   └─ 集成设计面板

6. 输出到 ui-craft-workspaces/{domain}/preview/<name>.html
```

---

## 10. 检查清单

- [ ] 组件 markdown 表格被正确解析（4 列和 3 列格式）
- [ ] 所有样式通过 CSS 变量引用，无硬编码颜色
- [ ] 每个 `##` 标题生成独立 section
- [ ] 每个 section 下方有原始规格表
- [ ] 状态行（hover/disabled/focus/error）正确展示
- [ ] `--style` 参数的变量覆盖生效
- [ ] `--compare` 并排对比布局正确
- [ ] 设计面板可实时微调 CSS 变量且组件即时更新
- [ ] 输出路径符合规范（`ui-craft-workspaces/{domain}/preview/`）
- [ ] `--preview all` 目录页可自动发现所有组件
