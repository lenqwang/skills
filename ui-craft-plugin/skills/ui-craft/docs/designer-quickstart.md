# UI-CRAFT 设计师快速上手指南

> 面向 UI 设计师的 ui-craft v3 使用指南。
> 你的工作产出（Token、组件规格、风格定义）是整个系统的输入源头。

---

## 你在这个系统中的角色

```
你定义规则和 Token  →  AI 基于你的定义生成代码  →  你校准验收
```

你负责：
- 维护 Token 体系（颜色、间距、字阶的原始值和语义映射）
- 维护组件规格（button、card、modal 等长什么样、怎么交互）
- 定义风格变体（不同活动用不同视觉方案）
- 校准验收（生成的页面是否符合设计预期）

你**不需要**写代码、改配置、碰 CSS。

---

## 系统架构速览

ui-craft 分 3 层，你主要在 L0-L1 工作：

```
L0 契约层    contract/         ← 你制定的强制规则（R1-R30）+ 设计契约
L1 业务层    domains/          ← 每域自包含 primitive + semantic + components + layout
L2 工程层    engine/           ← FE 维护的代码生成规则（你不需要碰）
```

### 三条业务线

系统支持三条业务线，组件按域目录物理隔离：

| 业务线 | 典型场景 | 目录 |
|--------|---------|------|
| Campaign | 活动页（空投/竞赛/节日/VIP） | `domains/campaign/` |
| Exchange | 交易所功能页面（18 个专属组件） | `domains/exchange/` |
| Web3Pay | Web3 钱包/支付（25 个专属组件） | `domains/web3pay/` |

跨域共享组件放在 `domains/_platform/components/`。

---

## 目录结构 & 文件归属

```
ui-craft/
├── contract/                         # L0: 你制定的强制规则 + 设计契约
│   ├── design-contract.md            #   视觉情绪、品牌调性、决策原则
│   ├── rules.md                      #   R1-R30 全局强制规则
│   └── rules-ext/                    #   按业务线的扩展规则
│
├── domains/                          # L1: 每域自包含
│   ├── _platform/                    #   跨域共享基座（Exchange/Web3 共用）
│   │   ├── platform.md               #   品牌色、排版、布局框架
│   │   ├── semantic.md               #   平台 Token 覆盖（色彩/字阶/阴影/间距）
│   │   └── components/               #   跨域共享组件规格
│   ├── campaign/
│   │   ├── domain.md                 #   业务线声明
│   │   ├── semantic.md               #   语义 Token（颜色→用途、排版层级）
│   │   ├── layout.md                 #   布局规则
│   │   ├── components/               #   业务线组件规格
│   │   │   ├── button.md             #   按钮
│   │   │   ├── card.md               #   卡片
│   │   │   ├── modal.md              #   弹窗
│   │   │   └── ...
│   │   └── styles/                   #   风格变体 ← 你经常操作的地方
│   │       ├── _template.md          #   标准 6 区块模板
│   │       ├── default.md            #   默认风格（其他风格的继承源）
│   │       ├── competition.md        #   竞赛风格（delta 继承 default）
│   │       ├── vip-warm-elite.md     #   VIP 暖金风格
│   │       └── ...
│   ├── exchange/
│   │   ├── domain.md
│   │   ├── semantic.md
│   │   └── components/
│   └── web3pay/
│       ├── domain.md
│       ├── semantic.md
│       └── components/
│
├── engine/                           # L2: FE 维护（你不需要碰）
├── platforms/                        # 平台约束（web.md / app.md）
└── docs/                             # 文档（含本指南）
```

---

## 日常工作流速查

### 场景 1：完善一个组件规格

```
1. 打开组件规格文件
   domains/{domain}/components/<component>.md

2. 按表格格式补充属性
   | 属性 | Token | CSS | 值 |
   |------|-------|-----|-----|
   | 背景色 | action.primary | var(--brand) | #0055FF |

3. 预览验证
   /ui-craft --preview <component>

4. 浏览器打开 → ui-craft-workspaces/{domain}/preview/<component>.html
   - 检查变体是否齐全
   - 检查状态（hover/disabled）是否正确
   - 用设计面板（Cmd+D）微调变量

5. 不满意 → 改规格 → 重新 --preview → 循环
```

### 场景 2：新增一个业务组件

```
1. 创建草案
   /ui-craft --new-component <name> --domain campaign
   → 自动生成 domains/campaign/components/<name>.md [DRAFT]

2. 填写核心内容
   - 组件结构树（ASCII 图）
   - Token 映射表（属性 → CSS 变量）
   - 状态枚举（default / hover / disabled / ...）
   - 数据接口（TypeScript interface）

3. 预览迭代
   /ui-craft --preview <name>
   → 浏览器验证 → 改规格 → 再 preview → 循环

4. 定稿
   - 去掉标题中的 [DRAFT]
```

**组件提升路径**：当组件需要跨业务线复用时，将组件移至 `domains/_platform/components/`：

```
domains/campaign/components/button.md    ← 业务线专属
  ↓ 跨域复用
domains/_platform/components/button.md   ← 全局通用
```

### 场景 3：定义一个新风格

```
1. 从零开始
   /ui-craft --new-style <name>
   → 基于 _template.md 创建 domains/campaign/styles/<name>.md

   或从已有风格 fork
   /ui-craft --new-style <name> --from competition

2. 填写 6 个区块（详见下方「风格文件怎么写」）
   区块 1: 元信息（名称、描述、模式、继承方式）    ← 新增 inherits 字段
   区块 2: 风格画像（视觉情绪、色温、装饰程度）
   区块 3: CSS 变量表（颜色、圆角、间距）           ← 核心
   区块 4: 布局结构（页面类型、差异项）
   区块 5: 组件变体（按钮/卡片的特殊样式）
   区块 6: 适用性 & 自检

3. 生成测试页面
   /ui-craft --style <name>
   → 浏览器预览 → 用设计面板调参 → 导出变量回写区块 3

4. 校准（可选）
   /ui-craft --calibrate <参考截图> --name <name>
   → L1 色彩 → L2 布局 → L3 组件 → L4 动效 逐层校准
```

### 场景 4：为 Exchange/Web3 业务线工作

```
# Exchange 业务线生成
/ui-craft --domain exchange

# Web3Pay 业务线生成
/ui-craft --domain web3pay

# Exchange 特定平台
/ui-craft --domain exchange --platform app
```

Exchange/Web3 业务线没有 `--style` 参数，它们的视觉定义在：
- `domains/_platform/platform.md` — 共享基座（品牌色、排版、布局框架）
- `domains/_platform/semantic.md` — 平台 Token 覆盖（色彩/字阶/阴影/间距）
- `domains/exchange/domain.md` / `domains/web3pay/domain.md` — 各业务线特定覆盖

### 场景 5：查看设计系统全局状态

```
/ui-craft --ds status
→ 打开 ui-craft-workspaces/ds-status.html

看到（Sidebar + 卡片网格布局）：
- 左侧栏：4 个业务域导航（Campaign / _platform / Exchange / Web3Pay），滚动高亮
- 组件卡片：3 列网格，每张卡片上方 Mini Preview（CSS 渲染的组件缩略图），点击跳转预览页
- Campaign 面板：14 组件 + 9 风格卡片 + 页面/预览产物列表
- _platform 面板：20 共享组件
- Exchange 面板：18 组件 + 业务规范（booster / rewards-hub / gaterouter-credits）
- Web3Pay 面板：23 组件
- 所有 75 个组件卡片均可点击跳转到详细预览页
```

---

## 风格文件怎么写

### 6 区块速查

| 区块 | 你需要填什么 | 难度 |
|------|-------------|------|
| 1. 元信息 | 名称、描述、模式（dark/light）、继承方式、来源 URL | 简单 |
| 2. 风格画像 | 3-4 个情绪关键词、色温、装饰程度 | 简单 |
| 3. CSS 变量表 | 所有颜色/圆角/间距变量的值 | **核心** |
| 4. 布局结构 | 页面类型、和默认的差异 | 中等 |
| 5. 组件变体 | 按钮/卡片等的特殊样式 | 中等 |
| 6. 自检 | 适用/不适用场景 | 简单 |

### Delta 继承模式

区块 1 的 `inherits` 字段控制风格的继承方式：

| inherits 值 | 含义 | 什么时候用 |
|-------------|------|-----------|
| `default` | 只列和 default.md 的差异项 | 和默认风格重叠 >60%（大多数情况） |
| `none` | 完整独立定义 | 和默认风格重叠 <50%（如节日主题） |
| `<style-name>` | 基于指定风格的差异 | 某风格的微调版 |

**覆盖优先级**（从高到低）：

```
当前 style 的显式定义
  ↓ 覆盖
inherits 源（如 default.md）
  ↓ 覆盖
domains/campaign/semantic.md 默认值
```

**实际效果**：用 `inherits: default` 时，你只需要列出和 default 不同的变量，其余自动继承。这让风格文件更简洁，也更好维护。

**删除变量**：用 `unset` 标记某个变量不出现在当前风格中：

```markdown
| `--gradient-hero` | unset | 删除: 本风格无 Hero 渐变 |
```

**最小变量集**（不可 unset）：
`--bg`, `--bg-card`, `--text-primary`, `--text-secondary`, `--brand`, `--border`

### 区块 3 最快的填法

1. 用 `/ui-craft --style default` 生成一个默认页面
2. 打开设计面板（Cmd+D）
3. 用颜色选择器调到你想要的效果
4. 点击「导出 → Style MD」
5. 粘贴到新风格文件的区块 3

---

## Token 体系速览

Token 分 4 层，你主要维护前 2 层：

```
原始 Token (domains/{domain}/primitive.md)          颜色色板、间距基准     ← 你定义
    ↓
语义 Token (domains/{domain}/semantic.md)         颜色→用途、排版层级     ← 你定义
    ↓
组件 Token (domains/{domain}/components/*.md)    按钮背景色、卡片圆角   ← 你定义
    ↓
风格覆盖 (domains/campaign/styles/*.md)          某活动的特殊颜色       ← 你定义
```

### 真相源规则

每个 Token 只有一个权威来源：

| Token 类型 | 真相源 |
|-----------|--------|
| 颜色原始值 | `domains/{domain}/primitive.md`（每域自带） |
| 颜色语义 | `domains/{domain}/semantic.md`（每域自带） |
| 品牌色覆盖 | `domains/{domain}/domain.md` |
| 平台字阶/间距 | `domains/_platform/semantic.md` |
| 圆角 | `domains/{domain}/semantic.md` |
| 组件 Token | `domains/{domain}/components/{type}.md` |
| 风格覆盖 | `domains/campaign/styles/{name}.md` |

**在多个文件中看到同一个值的定义时，以真相源为准。**

---

## 组件规格文件怎么写

### 最小结构

```markdown
# ComponentName [DRAFT]

> 一句话描述组件用途。

---

## 变体名称

| 属性 | Token | CSS | 值 |
|------|-------|-----|-----|
| 背景色 | token.name | var(--xxx) | #HEX |
| 文字色 | token.name | var(--xxx) | #HEX |
| 圆角 | token.name | var(--xxx) | Npx |

## 交互状态矩阵

| 状态 | 变化 |
|------|------|
| default | 基准样式 |
| hover | cursor: pointer; background 变化 |
| focus-visible | outline: 2px solid var(--brand) |
| disabled | opacity: 0.5; pointer-events: none |

## 数据接口

interface ComponentProps {
  // TypeScript 类型定义
}
```

### 属性表的列含义

| 列 | 说明 | 示例 |
|----|------|------|
| 属性 | 视觉属性的中文名 | 背景色、文字色、圆角 |
| Token | 语义层的 Token 名称 | `action.primary`、`text.inverse` |
| CSS | 代码中使用的 CSS 变量 | `var(--brand)`、`var(--text-primary)` |
| 值 | 实际数值（用于预览和校验） | `#0055FF`、`8px` |

### 跨业务线组件

跨域共享组件放在 `domains/_platform/components/` 目录中，每个组件独立文件。各业务线可在自己的 `components/` 目录中放置业务线专属组件。

---

## 设计面板（Design Toolkit）使用指南

每个生成的 HTML 页面都内置了设计面板，是你最常用的工具。

### 快捷键

| 快捷键 | 功能 |
|--------|------|
| `Cmd + D` | 打开/关闭设计面板 |
| `Cmd + K` | 打开/关闭组件总览 |
| `Cmd + B` | A/B 预设快速切换 |
| `Esc` | 关闭当前面板 |

### 核心功能

**1. 变量调参**
- 面板自动扫描页面上的 CSS 变量
- 颜色变量 → 颜色选择器
- 数值变量 → 数字输入框
- 修改即时生效，页面实时更新

**2. 预设切换**
- 页面内置多个预设（从 `<script id="dt-presets">` 读取）
- 一键切换不同色彩方案
- 支持保存自定义预设到 localStorage

**3. 导出**
- **CSS 变量** → 复制粘贴到代码
- **JSON** → 程序化使用
- **Style MD 片段** → 直接粘贴到 `domains/campaign/styles/<name>.md` 区块 3
- **W3C Design Tokens** → Figma Variables 可直接导入的标准格式

**4. 导入**
- 支持 Figma W3C Design Tokens JSON
- 自动映射 Figma 变量名到 CSS 变量

**5. 组件总览（Showcase）**
- 展示页面中所有注册的组件变体
- 弹窗、状态卡片、按钮组等一览无余
- 支持单个组件隔离预览

**6. 规则速检（21 项全覆盖）**
- 覆盖 R2-R30 全部设计规则，分 3 类展示
- 红色 [B] = 阻断（必须修复）
- 黄色 [W] = 警告（建议修复）
- 绿色 = 通过
- 点击违规项高亮页面中对应元素

**7. 校准叠加**
- 上传参考截图
- 半透明叠加在页面上
- 拖拽调整位置，逐像素比对

**8. Style 差异对比**
- 选择两个预设进行变量级逐项对比
- 差异项高亮显示，支持颜色色块预览
- 点击变量行实时切换 A/B 值

**9. 变量影响范围高亮**
- 点击变量时，页面中使用该变量的元素高亮闪烁
- 快速定位变量的实际影响区域

---

## 校准验收怎么做

当 FE/AI 生成了页面，你需要按 4 层标准验收：

| 层级 | 检查什么 | 通过条件 |
|------|---------|---------|
| L1 色彩 | 背景色、强调色、渐变 hex 值 | 0 差异（严格匹配） |
| L2 布局 | 模块间距、圆角、栅格对齐 | 最多 1 处差异 |
| L3 组件 | 按钮/卡片/Tab 样式细节 | 最多 2 处差异 |
| L4 动效 | hover 效果、过渡动画 | 最多 2 处差异 |

**校准流程**：
1. 打开生成的 HTML 页面
2. Cmd+D 打开面板 → 上传参考截图
3. 从 L1 到 L4 逐层检查
4. 发现差异 → 记录并反馈给 Claude
5. 最多 3 轮修正，3 轮后标记待修复项

---

## 常见问题

### 我改了组件规格，怎么看效果？

```
/ui-craft --preview <component>
```
浏览器刷新即可。

### 我想对比两个风格的差异？

```
/ui-craft --preview button --compare style-a,style-b
```
会生成并排对比页面。

### 我调了设计面板的变量，怎么保存？

面板中点击「导出 → Style MD」，把输出粘贴到对应的 `domains/campaign/styles/<name>.md` 区块 3。

### 新风格和 default 很像，只改几个颜色怎么办？

用 delta 继承模式。在区块 1 设置 `inherits: default`，然后只列出你改动的变量。例如只改了 `--accent` 和 `--bg`，那区块 3 只需要这两行。

### 哪些规则我需要关心？

主要关注这几条：
- **R3**: 颜色必须用 CSS 变量，不能硬编码 hex
- **R7**: 间距必须是 4px 的倍数
- **R10**: 圆角必须用预定义变量
- **R23**: 每个区域最多 1 个主 CTA
- **R28**: 组件样式必须和你定义的规格一致
- **R29**: 不能出现 AI 模式化设计（千篇一律的卡片网格）
- **R30**: CTA 文案要具体（"开始交易" 而不是 "点击这里"）

### 设计面板打不开？

确认页面底部有 `<script src="design-toolkit.js"></script>`。如果是旧页面，让 Claude 重新生成。

### Exchange/Web3 的组件和 Campaign 的有什么不同？

Exchange 有 18 个专属组件（如 trade-panel, order-book, market-ticker 等），Web3Pay 有 25 个专属组件（含 pay-b-* 系列商户后台组件及通用组件）。它们通常有更多尺寸档位、更严格的状态矩阵、以及 H5/App 的适配规格。这些差异定义在各业务线自己的 `domains/{domain}/components/` 目录中，跨域共享组件在 `domains/_platform/components/` 中。

### 我在 Figma 更新了 Token，怎么同步？

1. 导出 W3C Design Tokens JSON
2. 更新 `domains/{domain}/primitive.md` 或 `domains/{domain}/semantic.md` 中对应的值
3. 用 `/ui-craft --ds status` 检查全局影响

---

## 文件位置速查

### 你经常改的文件

| 你要做什么 | 文件位置 |
|-----------|---------|
| 改按钮规格 | `domains/{domain}/components/button.md` |
| 改卡片规格 | `domains/{domain}/components/card.md` |
| 改弹窗规格 | `domains/{domain}/components/modal.md` |
| 改输入框规格 | `domains/{domain}/components/input.md` |
| 改表格规格 | `domains/{domain}/components/table.md` |
| 改标签规格 | `domains/{domain}/components/tag.md` |
| 改 Hero 规格 | `domains/{domain}/components/hero.md` |
| 改跨域共享组件 | `domains/_platform/components/*.md` |
| 新建/改风格 | `domains/campaign/styles/<name>.md` |
| 看风格模板 | `domains/campaign/styles/_template.md` |
| 改颜色原始值 | `domains/{domain}/primitive.md` |
| 改颜色语义 | `domains/{domain}/semantic.md` |
| 改平台 Token | `domains/_platform/semantic.md` |

### 你偶尔参考的文件

| 目的 | 文件位置 |
|------|---------|
| 看设计原则 | `contract/design-contract.md` |
| 看全部强制规则 | `contract/rules.md` |
| 看图标库 | `engine/reference/icons.md` |
| 看交互状态定义 | `engine/reference/interaction-states.md` |
| 看动效原则 | `engine/reference/motion-principles.md` |
| 看文案规范 | `engine/reference/ux-writing.md` |
| 看职责分工 | `docs/responsibility.md` |

---

## 协作流程

```
产品                    你（UI）                   FE (含 AI 生成)
 │                      │                         │
 ├─ 1. 提需求/选风格 ──→│                         │
 │                      ├─ 2. 创建/选择 style ───→│
 │                      │   (Token 覆盖+组件变体)  │
 │                      │                         ├─ 3. 加载规则 + Token
 │                      │                         ├─ 4. 生成代码
 │                      │                         ├─ 5. 执行 R1-R30 自检
 │                      │                         │
 │                      ├─ 6. 校准验收 ←──────────┤
 │                      │   (L1色彩→L4动效)        │
 │                      │                         ├─ 7. 修正 → 重新生成
 │                      │                         │   (最多3轮)
 ├─ 8. 业务验收 ←───────┤                         │
 │                      │                         │
```

**核心原则**：你是规则的制定者，产品是需求的提出者，FE 是规则的执行者。
