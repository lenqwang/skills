# Workflow: 生成

> 覆盖命令：`--style`、`--domain`、`--to-next`、`--preview`、`--new-component`、`--new-style`、`--ds status`、交互式模式

---

## 上下文加载

> 按任务类型最小化加载，避免无关文档占用窗口。

### 标准生成（`--style <name>` / `--domain <d>`）

| 阶段 | 必读 | 按需读 |
|------|------|--------|
| 规则 | `contract/rules.md`, `contract/design-contract.md` | — |
| 规则扩展 | `contract/rules-ext/{domain对应文件}.md` | — |
| Token (Campaign) | `domains/campaign/semantic.md` | `domains/campaign/primitive.md`（仅语义不明确时） |
| Token (Exchange/Web3) | `domains/{domain}/semantic.md` + `domains/_platform/semantic.md`（共享基座） | `domains/{domain}/primitive.md`（仅语义不明确时） |
| 平台 | `platforms/{platform}.md` | — |
| 业务线 | `domains/{domain}/domain.md`, `domains/{domain}/layout.md` | — |
| 业务线 (Exchange/Web3) | `domains/_platform/platform.md`, `domains/_platform/platform-layout.md`, `domains/_platform/layout.md` | — |
| **响应式 (Exchange/Web3)** | **`domains/{domain}/responsive.md`** ← **必读，含全部断点规则** | — |
| **交互规范 (web3pay)** | **`domains/web3pay/business/pay-b/docs/interaction.md`** ← **必读，含焦点、动效、DO/DON'T** | — |
| 风格 (Campaign) | `domains/campaign/styles/{name}.md` | — |
| 组件 | 页面用到的 `domains/{domain}/components/*.md` + `domains/_platform/components/*.md`（Exchange/Web3） | — |
| 参考 | — | `engine/reference/figma-design-tokens.md`（按段落按需读取）、`engine/reference/ux-writing.md` 等 |

### HTML → Next.js（`--to-next`）

| 必读 | 按需读 |
|------|--------|
| `engine/code-gen/guidelines.md`（Phase 2 章节） | — |
| `contract/rules.md` | — |
| `engine/code-gen/templates/page.tsx.md` 或 `component.tsx.md` | — |

### 组件预览（`--preview <component>`）

| 必读 | 按需读 |
|------|--------|
| `domains/{domain}/components/{component}.md` | — |
| `domains/campaign/semantic.md`（Campaign）/ `domains/_platform/semantic.md`（Exchange/Web3） | — |
| `engine/code-gen/component-preview.md` | — |
| — | `domains/campaign/styles/{name}.md`（仅 `--style`/`--compare` 时） |

### 设计系统仪表盘（`--ds status`）

| 必读 | 按需读 |
|------|--------|
| `engine/code-gen/ds-status.md` | — |
| `domains/campaign/semantic.md`（Campaign）/ `domains/_platform/semantic.md`（Exchange/Web3） | — |
| — | 扫描 `domains/*/components/*.md` + `domains/campaign/styles/*.md`（标题行 + 元信息） |

### 新建组件（`--new-component <name>`）

| 必读 | 按需读 |
|------|--------|
| `domains/{domain}/components/` 目录下同类型已有组件（作为结构参考） | — |

### 新建风格（`--new-style <name>`）

| 必读 | 按需读 |
|------|--------|
| `domains/campaign/styles/_template.md` | — |
| — | `domains/campaign/styles/{from}.md`（仅 `--from` 时） |

---

## 步骤 0: 加载强制规则（必须首先执行）

> ⛔ 禁止跳过任何一步。本节每个文件均为 **必读（MUST READ）**，不得以"减少上下文"为由省略。

```
1. 解析 --domain 参数（默认 campaign）和 --platform 参数（默认 web）
2. 读取 contract/design-contract.md（视觉情绪、品牌调性、决策原则）
3. 读取 contract/rules.md（全局强制规则 + 自检清单）
4. 读取 platforms/{platform}.md（平台层约束）
5. 读取 domains/{domain}/domain.md（业务线声明）
6. 读取 contract/rules-ext/{domain对应}.md（业务线扩展规则）
7. 加载 Token：
   a. Campaign：读取 domains/campaign/semantic.md
   b. Exchange/Web3：读取 domains/_platform/semantic.md + domains/{domain}/semantic.md（如有覆盖）
8. 如果 domain 是 exchange 或 web3pay：
   a. 读取 domains/_platform/platform.md（平台共享基座）
   b. 读取 domains/_platform/platform-layout.md（平台布局体系）
   c. 读取 domains/_platform/layout.md（通用栅格布局）        ← 【新增，禁止跳过】
   d. 读取 domains/{domain}/domain.md（业务线覆盖）
   e. 读取 domains/{domain}/layout.md（业务线布局扩展）
   f. 读取 domains/{domain}/responsive.md（响应式断点体系）  ← 【新增，禁止跳过，含全部 @media 规则】
   g. 读取 domains/web3pay/business/pay-b/docs/interaction.md（交互规范）  ← 【仅 web3pay】
9. 确认理解核心约束（R1-R30）
10. 生成组件前，必须先读取 domains/{domain}/components/{type}.md 规格文件（检查 scope 包含当前 domain）
11. 【Pay-B 专属】检查 ui-craft-workspaces/web3pay/pages/ 目录是否有已存在的 demo HTML：
    - 若存在 pay-b-full-demo.html 或同域 demo 文件，必须对照提取其 .page{} 变量块、
      sidebar/header class 命名、@media 断点，作为本次生成的 baseline。
    - 禁止在未比对 baseline 的情况下自行发明变量名、class 命名或断点值。
```

### 步骤 0 自检清单（加载完毕后执行）

在读取上述文件后，生成代码前必须回答以下问题（内心确认，不需要输出）：

| # | 问题 | 预期答案 |
|---|------|---------|
| A | CSS 变量应包在 `.page{}` 还是 `:root{}`？ | `.page{}`（参见 pay-b-full-demo） |
| B | Primary 按钮背景色是 `#ADF73E` 还是 `#68AD00`？ | `#ADF73E`（`--gtpay-color-brand`） |
| C | Sidebar class 用 BEM（`sidebar__item`）还是 kebab（`sidebar-item`）？ | BEM（`sidebar__item`） |
| D | TD 数据行字号是 14px 还是 16px？ | 16px（pay-b-table.md 规格） |
| E | Pay-B 需要哪几个 `@media` 断点？ | 1247 / 991 / 767 / 1248 / 1920（来自 responsive.md） |
| F | 窄屏（<1248px）是否需要汉堡菜单 + sidebar-overlay？ | 是（来自 layout.md） |

如果任意一项无法确定，回到步骤 8 重新读取对应文件，**不得依赖记忆**。

## 步骤 1-8: 正常工作流程

1. **理解需求** — 通过对话或参数获取用户需求

---

### 步骤 1.5: 产品 MD 结构化解析（新增，Pay-B 必须执行）

> 在开始生成代码前，必须从产品 MD 中提取以下结构化信息，并输出「页面结构摘要」供后续步骤使用。

**解析检查清单：**

```
□ A. 页面类型判断
   - 包含「规则列表」+「新建操作」→ 列表配置页 → 加载 patterns/list-page.md
   - 包含「默认操作」「兜底规则」「全局配置」→ 必须有顶部 Banner → 加载 patterns/config-page.md
   - 包含「详情展示」无编辑 → 详情页
   - 包含「表单字段」+「提交」 → 表单页

□ B. Pill Tabs 状态提取
   - 找「状态枚举」「tab」「类型区分」关键词
   - 提取所有状态值 → 对应 Pill Tabs 选项（全部 + 各状态）
   - 若无明确状态 → 不添加 Pill Tabs

□ C. 表格列提取（映射规则见 patterns/list-page.md §四）
   - 找「列表展示数据」「字段说明」「展示信息」章节
   - 每个「维度/类型/范围」→ 独立列（不合并）
   - 「操作：删除/编辑」→ 操作列（最右，sticky）
   - 「优先级」→ 优先级列（最左）
   - 「适用范围/账户」→ 适用账户列（蓝色 Tag 渲染）
   - 「触发条件类型（数量/频次/地址）」→ 触发类型列（独立）

□ D. 工具栏操作提取
   - 找「操作」「功能点」章节
   - 「新建/新增/添加」→ 右侧主按钮（btn--primary）
   - 「排序/优先级调整/导出」→ 右侧次要按钮（btn--secondary-outline）
   - 「搜索/筛选」→ 左侧搜索框

□ E. 弹窗/操作流提取
   - 找「安全验证」「二次确认」「弹窗」关键词
   - 确定「操作→二次确认→安全验证→结果」的完整流程

□ F. 图标需求确认
   - 列出页面需要哪些图标（Home/Send/Setting/Bell/Delete/Edit/Add...）
   - 必须查 icon-map.json 获取精确 viewBox 和 path
```

**输出格式（内心确认，不需要打印）：**

```
页面类型: [列表配置页 / 配置页 / 详情页 / 表单页]
是否有顶部 Banner: [是/否] 原因: [...]
Pill Tabs: [全部 / 状态1 / 状态2 / ...]
表格列: [列1 / 列2 / ...]
工具栏按钮: 左: [...] 右: [主按钮文案] + [次要按钮文案]
需要的图标: [Home / Send / ...]
```

---

2. **透传给 ui-ux-pro-max** — 提取 UX 规则、无障碍准则检查、布局指南、交付前清单
3. **加载设计契约** — 读取 `contract/design-contract.md` 和指定风格
4. **加载 Token 体系** — 读取 `domains/{domain}/semantic.md`（Campaign）或 `domains/_platform/semantic.md` + 业务线覆盖（Exchange/Web3）
5. **合并覆盖** — 用 ui-craft Token 覆盖 ui-ux-pro-max 提取的规则（ui-craft 优先）
6. **生成设计** — 基于合并后的设计系统构建设计方案
7. **校准（可选）** — 分析参考设计，反哺 Token
8. **输出 HTML** — 生成独立 HTML 预览文件（默认），详见 `engine/code-gen/guidelines.md` Phase 1

## 步骤 8.5: Figma 交付（HTML 生成后默认执行）

```
1. 启动本地 HTTP 服务器（如未运行）
   python3 -m http.server 8080 --directory ui-craft-workspaces/

2. 使用 localtunnel 暴露公网 URL
   npx localtunnel --port 8080

3. 输出给用户：
   - 本地预览：http://localhost:8080/pages/<name>.html
   - Figma 导入：https://xxxx.loca.lt/pages/<name>.html

4. 降级方案：localtunnel 失败 → ngrok → 手动部署提示
```

## 步骤 9: 强制检查（输出前必须执行）

> 执行 `contract/verification-protocol.md` 定义的验证管线。
> Tool Pass（ESLint/Stylelint 7 条）→ AI Pass 1（语义扫描 14 条）→ AI Pass 2（修复循环）。
> `[B]` 违规 = 阻断输出。`[W]` 违规 = 标注在输出中。
> 规则的 check/fix 定义见 `contract/rules.md`。
>
> Phase 1（HTML）阶段豁免项见 `contract/verification-protocol.md` 的"Phase 特殊规则"章节。

---

## 参考文档加载规则

- `engine/reference/figma-design-tokens.md`：**按需读取** — Figma 真值表（2700+ 行，禁止全量加载。仅当 semantic.md / bridge.md 中找不到某个 Token 的具体值时，按段落读取对应章节）
- `engine/reference/ux-writing.md`：当页面包含 CTA 按钮文案、错误信息、空状态、确认对话框时按需读取
- `engine/reference/interaction-states.md`：当生成包含表单、弹窗、可交互卡片等复杂交互组件时按需读取
- `engine/reference/motion-principles.md`：当需要添加/调整动效时按需读取
- `engine/reference/icons.md`：查找 @gate/iconfont 图标名称时按需读取

---

## 产物输出

```
ui-craft-workspaces/
├── campaign/
│   ├── pages/        页面 HTML（--style 产物）
│   ├── preview/      组件预览 HTML（--preview 产物，14 个）
│   └── baseline/     Baseline 快照（--to-next 时存）
├── _platform/
│   └── preview/      共享组件预览 HTML（20 个）
├── exchange/
│   ├── pages/
│   └── preview/      Exchange 组件预览 HTML（18 个）
├── web3pay/
│   ├── pages/
│   └── preview/      Web3Pay 组件预览 HTML（25 个）
├── patch-reports/    补丁报告（--patch 产物，跨域）
├── ds-status.html    设计系统仪表盘（Sidebar + 3 列卡片网格）
├── design-toolkit.js    设计工具包入口（自动加载 _toolkit/ 下 11 个子模块）
└── _toolkit/            功能模块（core/panel/showcase/inspector/drag/snap/...）
```
