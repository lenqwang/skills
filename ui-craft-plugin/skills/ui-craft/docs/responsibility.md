# ui-craft 职责分工文档

> 基于 ui-craft 三层约束设计体系（v3 Domain-First），明确 UI（设计师）、产品（PM）、FE（前端工程师）三方职责边界。

---

## 一、系统总览

ui-craft 是一个三层约束设计体系（v3 Domain-First 架构），目标是让 AI（Claude）基于结构化规则自动生成符合 Gate.io 品牌规范的高质量 UI 代码。Token 和组件按域（Domain）组织，每域自包含 primitive + semantic + components + layout。

```
L0 契约层 (contract/)     →  定义"什么算精美"，R1-R30 强制规则 + 设计契约
     ↓
L1 业务层 (domains/)      →  每域自包含 primitive + semantic + components + layout + 风格变体
     ↓
L2 工程层 (engine/)       →  代码生成 + 视觉校准 + 验证管线
```

---

## 二、三方职责矩阵

### UI（设计师）

| 职责域 | 具体内容 | 对应文件 |
|--------|---------|---------|
| 定义设计契约 | 视觉情绪（稳定/沉静/克制/高端）、品牌调性、决策原则、"精美"标准 | `contract/design-contract.md` |
| 维护原始 Token | 色板（蓝/灰/绿/红/黄系）、间距基准（4px grid）、圆角梯度、字号/字重/行高体系、阴影/透明度 | `domains/{domain}/primitive.md`（每域自带） |
| 定义域语义 Token | 表面色/文字色/操作色/强调色/状态色/排名色的语义映射，排版层级（display → body → button），间距/圆角/布局的语义化命名 | `domains/{domain}/semantic.md` |
| 定义域组件规格 | Campaign 14 个、Exchange 18 个、Web3Pay 25 个、共享 20 个组件的完整属性表 + 布局模式 | `domains/*/components/*.md` |
| 制定风格变体 | 每个 style 的 6 区块定义：元信息、风格画像、CSS 变量表、布局结构、组件变体、适用性&自检 | `domains/campaign/styles/*.md` |
| 校准验收 | 提供参考截图/URL，参与 L1-L4 四层校准（色彩→布局→组件→动效），判断最终输出是否达标 | `engine/calibrate/screenshot.md` |
| 维护模板 | 定义 style 标准 6 区块结构，确保所有风格文件结构一致 | `domains/campaign/styles/_template.md` |

**一句话**：UI 负责所有设计决策的源头 — 从原子级 Token 到组件级规格，从品牌调性到风格变体，全部由 UI 定义和维护。

---

### 产品（PM）

| 职责域 | 具体内容 | 体现位置 |
|--------|---------|---------|
| 定义业务需求 | 活动类型（空投/竞赛/VIP/节日）、目标用户（新/回归/活跃/VIP）、奖励规则 | SKILL.md 步骤1 "理解需求" |
| 选择风格方向 | 根据活动性质指定 `--style` 参数（default/competition/vip-warm-elite/festive-gamify 等） | `domains/campaign/styles/` 目录的适用场景（区块7.2） |
| 确认页面结构 | 决定模块组合：Hero → 友情提示 → 活动区块×N → 加码奖励 → 规则 | `domains/campaign/styles/default.md` 区块5 页面结构 |
| 审批校准结果 | 在 Phase 4 校准循环中确认是否进入/退出校准 | `engine/calibrate/url-to-style.md` Phase 4 |
| 提供文案/数据 | 活动标题、副标题、奖池金额、阶梯数据、规则条目（通过 i18n key） | `engine/code-gen/templates/` 中的 t() 调用 |

**一句话**：产品负责业务层面的输入和决策 — 做什么活动、用什么风格、要什么模块、验收什么效果。

---

### FE（前端工程师）

| 职责域 | 具体内容 | 对应文件 |
|--------|---------|---------|
| 维护 Tailwind 配置 | `tailwind.config.js` 中的 gate-* 自定义颜色、扩展 Token | `contract/rules.md` R1 |
| 执行代码生成规则 | R1-R30 共 30 条强制规则的落地实现：类名策略、样式系统约束、颜色/间距/圆角/排版/布局/图标/组件/可访问性/设计质量 | `contract/rules.md` |
| 技术栈绑定 | Next.js 15 Pages Router + TypeScript + Tailwind + CSS Modules + React 18.2 | `engine/code-gen/guidelines.md` |
| 组件代码编写 | 按模板结构生成 `.tsx` + `.module.css`，使用 FC 类型、useTranslation、响应式断点 | `engine/code-gen/templates/` |
| i18n 集成 | 所有 UI 文本使用 `useTranslation`，翻译文件放 `public/locales/` | `engine/code-gen/guidelines.md` §3 |
| 图标规范执行 | 强制使用 `@gate/iconfont`，禁止 emoji，遵循命名规则和标准尺寸 | `engine/reference/icons.md` + rules R19-R22 |
| 交互动效实现 | 按钮 hover/active、卡片 hover、渐变光效、过渡动画 | `engine/code-gen/guidelines.md` §6-7 |
| 输出前自检 | 逐条检查 15+ 项 checklist，违反即为错误 | SKILL.md 步骤9 + `contract/design-contract.md` §6 |
| 校准循环中的调试 | 生成测试 HTML → 截图对比 → 修正代码（最多3轮） | `engine/calibrate/url-to-style.md` Phase 4 |

**一句话**：FE 负责规则的落地执行和代码质量 — 把 Token 体系翻译成可运行的、通过所有 R1-R30 检查的生产代码。

---

## 三、协作流程（时序）

```
产品                    UI                      FE (含 AI 生成)
 │                      │                        │
 ├─ 1. 提需求/选风格 ──→│                        │
│                      ├─ 2. 定义/选择 style ──→│
│                      │   (Token覆盖+组件变体)  │
│                      │                        ├─ 3. 读取 contract/rules.md
│                      │                        ├─ 4. 读取 CSS 变量体系
│                      │                        ├─ 5. 加载 style + Token
 │                      │                        ├─ 6. 生成代码
 │                      │                        ├─ 7. 执行 R1-R30 自检
 │                      │                        │
 │                      ├─ 8. 校准验收 ←─────────┤
 │                      │   (L1色彩→L4动效)       │
 │                      │                        ├─ 9. 修正→重新生成
 │                      │                        │   (最多3轮)
 ├─ 10. 业务验收 ←──────┤                        │
 │                      │                        │
```

### 详细步骤说明

| 步骤 | 角色 | 动作 | 产出物 |
|------|------|------|--------|
| 1 | 产品 | 提出活动需求，选择风格方向 | PRD / 需求描述 |
| 2 | UI | 确认/创建对应 style 文件，定义 Token 覆盖和组件变体 | `domains/campaign/styles/{name}.md` |
| 3-5 | FE | 加载规则、配置、Token 体系 | 运行时上下文 |
| 6 | FE | 基于合并后的设计系统生成代码 | `.tsx` + `.module.css` + i18n JSON |
| 7 | FE | 逐条执行 R1-R30 自检清单 | 自检报告 |
| 8 | UI | 对比参考设计，按 L1-L4 四层标准校准 | 校准结果（pass/fail） |
| 9 | FE | 根据校准反馈修正代码（最多3轮） | 修正后的代码 |
| 10 | 产品 | 业务层面验收（文案/数据/交互逻辑） | 上线确认 |

---

## 四、关键边界和约束

| 约束 | 归属 | 说明 |
|------|------|------|
| design-contract 不可覆盖规则 | UI 制定，FE 执行 | R1-R30 任何 style 不得覆盖 |
| primitive Token 禁止直接引用 | UI 制定，FE 遵守 | contract/ 下的原始 Token 不可直接引用，代码中只能用域语义/组件 Token |
| tailwind.config 不可修改 theme | FE 约束 | 只能在 extend 中扩展 |
| style 文件必须遵循 _template 6 区块 | UI 维护结构 | 产品和 FE 不可随意改结构 |
| 图标来源唯一 | UI 提供 @gate/iconfont | FE 禁止用其他图标库/emoji |
| 颜色来源唯一 | UI 在域 Token（domains/*/semantic.md）中定义 | FE 禁止硬编码色值（任意值语法仅临时） |
| 校准最多 3 轮 | 流程约束 | 超过则输出当前最优 + 待修复列表 |

---

## 五、各角色的"不做"清单

### UI 不做

- 不直接写代码或修改 `tailwind.config.js`
- 不决定活动业务逻辑（奖励规则、用户分层策略）
- 不跳过 Token 体系直接给 hex 值让 FE 硬编码

### 产品不做

- 不修改 Token 体系或 style 文件的设计参数
- 不绕过 UI 直接给 FE 设计指令（如"把这个颜色改成 #xxx"）
- 不在校准阶段替代 UI 做视觉判断

### FE 不做

- 不自行发明颜色值或样式规则
- 不跳过 R1-R30 自检直接提交代码
- 不修改 domains/*/primitive.md 或 domains/*/semantic.md 中的 Token 定义文件
- 不使用 emoji 替代图标
- 不使用 styled-components（项目虽有但新代码禁止）

---

## 六、文件归属总览

```
ui-craft/
├── contract/                          # 契约层
│   ├── design-contract.md             # 约束层 | UI 拥有 | 产品参考 | FE 执行
│   ├── rules.md                       # 约束层 | UI 制定 | FE 强制执行
│   ├── (primitive.md 已移至 domains/*/primitive.md)
│   ├── verification-protocol.md       # 3-Pass 验证管线
│   ├── feedback-loop.md               # 反馈沉淀协议
│   └── rules-ext/                     # 扩展规则
├── domains/                           # 域层（Token + 组件 + 风格按域组织）
│   ├── _platform/                     # 跨域平台基座
│   │   ├── layout.md / platform.md / platform-layout.md
│   ├── campaign/                      # 活动线
│   │   ├── domain.md / layout.md      # 业务线声明
│   │   ├── semantic.md                # 域语义 Token | UI 拥有 | FE 直接引用
│   │   ├── components/                # 域组件 | UI 拥有 | FE 直接引用
│   │   │   ├── button.md / card.md / ...
│   │   └── styles/                    # UI 定义 | 产品选择
│   ├── exchange/                      # 交易所
│   │   ├── domain.md / layout.md
│   │   ├── semantic.md
│   │   └── components/
│   └── web3pay/                       # Web3/Pay
│       ├── domain.md / layout.md
│       ├── semantic.md
│       └── components/
├── engine/                            # 工程层
│   ├── code-gen/                      # FE 拥有 | UI 约束
│   ├── calibrate/                     # UI + FE 协作
│   ├── reference/                     # 参考文档
│   └── workflows/                     # 工作流
└── platforms/
    ├── web.md                         # Web 平台约束
    └── app.md                         # App 平台约束
```

---

## 七、总结

> **UI 定义规则和 Token** → **产品定义业务和风格选择** → **FE 执行规则并输出通过校验的代码**

三方通过 `contract/rules.md`（强制约束）、`domains/campaign/styles/*.md`（风格配置）、`engine/code-gen/`（输出规范）三个接口实现解耦协作。核心原则：**UI 是规则的制定者，产品是需求的提出者，FE 是规则的执行者**。
