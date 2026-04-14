# Preflight — 企业级页面生成预检清单

> 在执行标准 `generate.md` 工作流之前强制运行本清单。
> 目标：将生成自由度降至最低，确保同一 PRD + 同一参考 HTML 始终输出一致结果。
> 适用域：`web3pay`（Pay-B 商户后台）；其他 Exchange 域可参照扩展。

---

## 0. 触发条件

当命令中包含以下任一条件时，自动激活本 Preflight：

- `--domain web3pay`（或 `--domain exchange`）
- PRD 来源为企业级产品页面（非 Campaign 营销活动页）
- 用户显式指定 `--preflight` 标志

---

## 1. 输入物检查（Input Validation）

在开始生成之前，必须确认以下 4 项输入物均已就绪：

| # | 输入物 | 必须 | 说明 |
|---|--------|------|------|
| 1 | **PRD 文档**（`.md`） | ✅ | 需求文档，含页面功能、字段、交互说明 |
| 2 | **参考 HTML**（`.html`） | ✅ | 已有页面作为布局/结构/间距基准；若首次生成则可用最接近的现有页面 |
| 3 | **Style 文件**（如 `pay-b-default.md`） | ✅ | 指定色彩/间距/圆角的 CSS 变量源 |
| 4 | **组件 ID 列表** | ✅ | 从 PRD 分析得出的组件清单（见第 2 步输出） |

> 缺少任何一项 → **阻断生成**，提示用户补充。

---

## 2. PRD 分析 → 组件 ID 映射

读取 PRD 文档，逐条分析页面需求，输出组件 ID 列表：

### 2.1 分析流程

1. **识别页面结构**：侧栏、头部、面包屑、Tab、表格、筛选器、弹窗…
2. **逐模块匹配组件 ID**：对照下方组件注册表，为每个模块指定精确的组件 MD
3. **输出清单**：以表格形式列出，供用户确认

### 2.2 Web3Pay Pay-B 组件注册表

> ID = 文件名（不含 `.md`），分为 **域专属**（`web3pay/`）和 **平台共享**（`_platform/`）。

#### 域专属组件（`.claude/skills/ui-craft/domains/web3pay/components/`）

| ID | 组件名 | 典型用途 |
|----|--------|---------|
| `pay-b-header` | 顶部导航 | 72px 全局 Header |
| `pay-b-sidebar` | 侧栏导航 | 320px 左侧菜单 |
| `pay-b-table` | 数据表格 | 列表页主表格 |
| `pay-b-filter` | 筛选栏 | 表格上方筛选条件 |
| `pay-b-tag` | 状态标签 | 6 色 × 2 尺寸 |
| `pay-b-button` | 按钮 | Primary/Secondary/Ghost/Text |
| `pay-b-pagination` | 分页 | 表格底部分页 |
| `pay-b-steps-anchor` | 步骤锚点 | 多步骤流程左侧锚点 |
| `pay-b-modal` | 弹窗 | Form/Confirm/Security/Detail |
| `pay-b-input` | 输入框 | 表单/搜索/行内输入 |
| `pay-b-loading` | 全局 Loading | 骨架屏 + Spinner |
| `tab` | Tab 标签页 | Primary/Underline/Text/Card |
| `checkbox` | 复选/单选 | Checkbox + Radio |
| `switch` | 开关 | 二元切换 |
| `selector` | 下拉选择器 | 单选/多选下拉 |
| `timepicker` | 时间选择器 | 日期/日期范围 |
| `action-menu` | 操作菜单 | 表格行 `...` Popover |
| `divider` | 分割线 | 水平/垂直/实线/虚线 |
| `notification` | 通知 | Toast 全局通知 |
| `tooltip` | 工具提示 | Hover 信息提示 |
| `alert` | 警告横幅 | 页面级警告/通知条 |
| `select-token` | 代币选择器 | 币种选择面板 |
| `network-picker` | 网络选择 | 链网络选择 |
| `manage-wallet` | 钱包管理 | 收款钱包管理 |
| `gt-halo-button` | 品牌发光按钮 | 特殊 CTA |

#### 平台共享组件（`.claude/skills/ui-craft/domains/_platform/components/`）

| ID | 组件名 | 典型用途 |
|----|--------|---------|
| `modal` | 弹窗（平台基座） | Pay-B 应优先用 `pay-b-modal` |
| `input` | 输入框（平台基座） | Pay-B 应优先用 `pay-b-input` |
| `button` | 按钮（平台基座） | Pay-B 应优先用 `pay-b-button` |
| `table` | 表格（平台基座） | Pay-B 应优先用 `pay-b-table` |
| `toast` | Toast | — |
| `breadcrumb` | 面包屑 | 页面顶部路径 |
| `badge` | 徽标 | 数量/状态标记 |
| `avatar` | 头像 | 用户/团队头像 |
| `dropdown` | 下拉菜单 | 通用下拉 |
| `pagination` | 分页（平台） | — |
| `progress` | 进度条 | — |
| `skeleton` | 骨架屏 | 加载占位 |

> **优先级规则**：当域专属和平台共享均有同类组件时，**始终优先使用域专属版本**。

> **弹窗**：除 `components/pay-b-modal.md`（结构/V5 档位）外，内容归类见 `domains/web3pay/pay-b-modal-business.md`（反馈 / 配置 / 列表）。

### 2.3 输出格式

```markdown
## Preflight 组件清单

| # | 页面模块 | 组件 ID | 来源 | 备注 |
|---|---------|---------|------|------|
| 1 | 顶部导航 | pay-b-header | web3pay | — |
| 2 | 侧栏菜单 | pay-b-sidebar | web3pay | — |
| 3 | 数据表格 | pay-b-table | web3pay | — |
| ... | ... | ... | ... | ... |
```

用户确认后方可进入第 3 步。

---

## 3. 上下文强制加载

在标准 `generate.md` 的"上下文加载"基础上，**追加**以下强制读取：

| 阶段 | 文件 | 说明 |
|------|------|------|
| 域辅助 | `domains/web3pay/business/pay-b/docs/v5-overrides.md` | V5 覆盖规则 |
| 域辅助 | `domains/web3pay/pay-b-icons.md` | 图标规范 + 核心 SVG Path |
| 域辅助 | `domains/web3pay/business/pay-b/docs/interaction.md` | 交互规范 |
| 域辅助 | `domains/web3pay/layout.md` | 页面布局规范 |
| **图标注册表** | `domains/web3pay/SVG/icon-map.json` | **SVG Path 数据源** |
| 风格 | `domains/web3pay/styles/{指定style}.md` | Style 变量源 |
| 参考 HTML | 用户指定的 `.html` 文件 | 布局/结构/间距基准 |
| 组件（逐个） | 第 2 步清单中每个组件 ID 对应的 `.md` | 按需但必须全部读取 |

### 3.1 图标加载流程

生成页面时，图标的引用遵循以下优先级：

1. **`SVG/icon-map.json`**（最高）：读取 JSON，通过 icon name 获取 `viewBox` + `paths` 数据，直接 inline 嵌入 HTML
2. **`SVG/icons/X1_fill_XXX.svg`**（次高）：独立 SVG 文件，可直接读取文件内容嵌入
3. **`pay-b-icons.md` → SVG Path 数据**：MD 中的 path 代码块
4. **Phosphor 填充图标**（兜底）：仅当上述 3 级均无匹配时使用，必须标注 `<!-- fallback: phosphor -->`

#### 图标嵌入格式

```html
<!-- 从 icon-map.json 读取，所有图标统一用此格式 -->
<svg viewBox="{viewBox}" width="{size}" height="{size}" fill="{color}">
  <path d="{path_data}" fill-rule="{fillRule}"/>
</svg>
```

| 参数 | 说明 | 常用值 |
|------|------|--------|
| `viewBox` | 从 icon-map.json 的 `viewBox` 字段 | 如 `0 0 18 18` |
| `size` | 显示尺寸 | Sidebar: `18`，标准: `20`，Header: `24` |
| `color` | 继承或指定色值 | `currentColor` 或 `var(--text-secondary)` |
| `fillRule` | 从 icon-map.json 的 `fillRule` 字段 | `nonzero` 或 `evenodd` |

#### PRD → 图标匹配表

分析 PRD 时同步输出图标需求清单：

```markdown
| 位置 | 功能 | 图标 ID | icon-map.json 有 |
|------|------|---------|-----------------|
| Sidebar 菜单 | 首页 | X1_fill_Home | ✅ |
| 操作栏 | 新增规则 | X1_fill_Add | ✅ |
| 表格操作列 | 编辑 | X1_fill_Edit | ✅ |
| 搜索框 | 搜索 | X1_fill_Search | ✅ |
| 状态 Tag | 成功 | X1_fill_CheckCircle | ✅ |
```

> **规则**：若 icon-map.json 缺少所需图标，优先从 `SVG/` 目录的 sprite 文件中提取补充，而非使用 Phosphor 兜底。

---

## 4. 生成约束（零自由度规则）

以下规则在 `generate.md` 标准流程之上**强制叠加**：

### 4.1 CSS 变量

- **禁止硬编码**：所有颜色、圆角、间距必须使用 `var(--xxx)` 引用 Style 文件中定义的变量
- 若组件 MD 中同时定义了组件私有 Token 和 pay-b-default 映射，以 pay-b-default 映射优先
- 检查项：生成后搜索 `#[0-9A-Fa-f]{3,8}`，除 SVG path 和 `rgba()` 外不应有残留

### 4.2 布局结构

- 页面信息架构（IA）必须与参考 HTML 一致：侧栏 / 头部 / 面包屑 / 内容区层级关系
- Tab 结构、筛选器排列、表格列顺序 → 以 PRD 为准，参考 HTML 为结构模板
- 间距使用 `--space-*` 系列变量，禁止自创间距值

### 4.3 组件样式

- 每个组件的 HTML 结构（class 命名、DOM 层级）必须与组件 MD 的 "CSS 实现参考" 一致
- 不得自创组件变体或混合不同组件的样式
- Tag 的 6 色对照表必须严格映射业务状态

### 4.4 交互行为

- 弹窗 overlay 点击关闭、表格排序、筛选器展开/收起 → 均按参考 HTML 的 JS 交互
- 新增交互仅限 PRD 明确要求的

### 4.5 文字内容

- 所有 UI 文本从 PRD 提取，未在 PRD 出现的文本禁止自创
- 占位符/示例数据可从参考 HTML 复用

---

## 5. 生成后验证（Post-generation Validation）

生成完毕后执行以下检查：

| # | 检查项 | 方法 | 阻断 |
|---|--------|------|------|
| 1 | CSS 变量完整性 | 搜索硬编码色值（除 SVG/rgba） | ✅ 有则修复 |
| 2 | 组件 ID 覆盖 | 对照第 2 步清单，确认每个组件 HTML 结构匹配 | ✅ |
| 3 | 布局一致性 | 与参考 HTML 对比页面骨架（侧栏/头部/内容区） | ✅ |
| 4 | PRD 字段覆盖 | PRD 中每个数据字段/操作按钮均已出现 | ✅ |
| 5 | 间距抽查 | 随机取 5 个间距值，确认均为 `var(--space-*)` | ⚠️ 警告 |
| 6 | **图标完整性** | 所有 `<svg>` 图标均来自 `icon-map.json`，无 placeholder/emoji 残留 | ✅ 有则修复 |
| 7 | 标准验证协议 | 运行 `verification-protocol.md` 3-Pass 验证 | ✅ |

---

## 6. 迭代管理

- 参考 HTML 变更时，需重新运行 Preflight 第 2-5 步
- 新增组件 MD 时，需更新第 2.2 节的注册表
- Style 文件变更时，需重新验证第 5.1 步 CSS 变量完整性
- **新增图标时**：在 `SVG/icon-map.json` 中追加条目 → 可选同步生成 `SVG/icons/X1_fill_XXX.svg` 独立文件

---

## 快速命令

```
/ui-craft web3pay --style pay-b-default --preflight
```

此命令自动激活 Preflight 流程，交互式引导完成上述全部步骤。
