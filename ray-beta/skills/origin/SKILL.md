---
name: origin
description: 为新项目引导活文档系统（Genesis），或定期对照代码库状态校准现有文档（Reconcile）。支持多项目文档仓初始化（--docs）和代码仓连接（--connect）。迁移操作请使用 /migrate
---

# Origin — 创世与校准 Agent

你是编排器。职责：扫描代码库，然后派发两个并行 sub-agent 分别生成技术文档和产品文档。也负责多项目文档仓的初始化和代码仓连接。

## 模式

- **创世** (`/origin`)：首次扫描。无文档存在。从零生成一切（含初始化 CSV 索引）。**默认 hub 模式**（创建 `.ray/` 配置 + 独立文档仓），可降级为 legacy 单仓模式。
- **校准** (`/origin --reconcile`)：三层文档已存在。对比文档状态与实际代码。修复偏移。
- **文档仓初始化** (`/origin --docs`)：在空 git 仓中创建文档仓目录结构。一次性操作。
- **连接代码仓** (`/origin --connect {docs_url}`)：将代码仓连接到已有文档仓。生成 `.ray/config.yaml`，clone 文档仓到 `.ray/docs/`。

> **迁移相关操作**已独立为 `/migrate` skill。包括产品文档迁移（`/migrate --docs`）和索引迁移（`/migrate --index`）。

---

## Phase 0：输出模式（创世模式专用）

创世模式在扫描之前，先确定文档输出位置。

```
Phase 0 流程：

1. 检测 .ray/config.yaml 是否存在
   → 已存在：自动 hub 模式，docs_root = .ray/docs/，跳到 Phase 1

2. 检测 docs/product/PRODUCT-MAP.md 是否存在
   → 已存在：建议改用 --reconcile，退出

3. 无配置 → 询问文档仓路径（默认 hub 模式）：

   "文档存放位置（默认 hub 模式）：
    - 输入本地路径（如 ../my-docs）或 git URL → hub 模式
    - 输入 skip → 单仓 legacy 模式（docs/）"

4a. 用户输入路径或 URL：
    - 从 git remote 推导 repo_id（如 git@github.com:acme/acme-web.git → web）
    - 询问产品名（如 acme）
    - 创建 .ray/ 目录
    - 生成 .ray/config.yaml：
      product: {product}
      repo_id: {repo_id}
      docs_url: {用户输入的路径或 URL}
    - 追加 .ray/docs/ 到 .gitignore
    - 如输入是本地路径：
      - 路径不存在 → mkdir -p + git init
      - 路径存在但无 PRODUCT-MAP.md → 继续（将生成到该路径）
      - 路径存在且有 PRODUCT-MAP.md → 建议 --reconcile
    - 如输入是 git URL → git clone 到 .ray/docs/
    - docs_root = .ray/docs/（或本地路径）

4b. 用户输入 skip：
    - docs_root = docs/（legacy 模式）
    - 不创建 .ray/
```

Phase 0 完成后，`docs_root` 变量确定。后续所有 Phase 的输出路径均使用 `{docs_root}`。

---

## Phase 1：地形扫描（快速，单 Agent）

**目标**：数秒内建立骨架地图，不读源码。

仅扫描这些文件：
- 所有 `package.json` → 包名、依赖、脚本
- `tsconfig*.json` → 构建目标、路径别名
- `turbo.json` 或类似 → 流水线配置
- 每个包 `src/` 的顶层目录列表
- 现有的 `README.md`、`CLAUDE.md`、`docs/`

**输出**：内部骨架：
```
包：[{name}, {name}, ...]
应用：[{name}, {name}, ...]
入口点：{ {name}: "src/index.ts", ... }
构建工具：{检测到的}
测试框架：{检测到的}
包管理器：{从锁文件检测}
```

## Phase 2：深度扫描（并行，每包一个子 Agent）

<CRITICAL>
**必须并行调度**。为每个包/应用启动一个独立的 Agent 子进程，所有包同时扫描。
</CRITICAL>

### 每包子 Agent 指令

```
你正在扫描包 "{name}"，位于 "{path}"。

1. 功能聚类
   - 读 src/ 中所有源文件
   - 按逻辑功能分组文件
   - 为每个簇命名描述性标题
   - 每个簇：列出文件、简要描述、入口点

2. API 边界检测
   - 查找：API 路由、fetch/axios 调用、端点定义
   - 每个 API：方法、路径、请求/响应形状（从代码推断）

3. 状态分析
   - 查找：状态管理 store、context、带状态的 hooks
   - 每个状态：名称、形状、持久化方式、订阅者

4. UI 组件分析
   - 查找：用户可见的 UI 组件
   - 每个组件：名称、功能、交互方式、视觉状态

5. 测试覆盖
   - 查找：测试文件（__tests__/、*.test.ts、*.spec.ts）
   - 映射：哪些测试覆盖哪些功能
   - 计数：每个功能的测试用例数

6. 技术债检测
   - 查找：TODO、FIXME、HACK、XXX 注释
   - 查找：硬编码值、类型断言（as any）

7. 文件哈希（校准模式用）
   - 每个源文件："path: 内容前20字符 + 行数"

输出为结构化 JSON：
{ features, apis, state, uiComponents, tests, techDebt, fingerprints }
```

## Phase 3：并行生成 ⏸️ 确认点

Phase 2 扫描结果收集完毕后，向用户展示骨架概览并等待确认。

### 3a. tech/ 档位询问

确认骨架后，根据扫描结果推断项目规模并推荐 tech/ 档位：

**规模推断规则**：
- 检测到的独立运行时数量（每个独立构建产物算一个）
- 检测到的跨端关注点数量（auth/observability/ci-cd/testing/security，仅在扫描中发现证据时计入）
- 数据层组件（database/cache/queue）

| 条件 | 推荐档位 |
|------|---------|
| 运行时 ≥ 2 或有微服务 | **完整**（runtime/ + concerns/） |
| 运行时 = 1 但有 ≥ 2 个关注点 | **精简**（仅 TECH-MAP.md + concerns/） |
| 运行时 = 1 且关注点 ≤ 1 | **跳过** |

向用户展示推荐：

```
检测到 {N} 个运行时单元、{数据层描述}、{N} 个跨端关注点。
建议 tech/ 档位：{推荐档位}

是否生成 tech/ 技术架构文档？
A. 完整（runtime/ + concerns/）{← 推荐，如果是推荐档位}
B. 精简（仅 TECH-MAP.md + concerns/）
C. 跳过
```

用户选择后，将 `tech_tier`（`full` / `minimal` / `skip`）传入技术 Sub-Agent。

### 3b. 派发并行 Sub-Agent

<CRITICAL>
**必须并行调度**。技术 Sub-Agent 和产品 Sub-Agent 同时启动，它们之间没有依赖关系。
</CRITICAL>

---

### 技术 Sub-Agent（架构师角色）

```
你是一位资深技术架构师。从代码扫描结果中提炼技术架构文档。

## 角色
你关注的是：包结构、依赖关系、API 边界、状态管理模式、代码规范、技术债。
你的读者是开发者和 Agent。

## 输入
- Phase 1 骨架：{skeleton}
- Phase 2 各包扫描结果：{scan_results}
- 现有 CLAUDE.md：{claude_md_content}
- tech_tier：{full | minimal | skip}（用户在 Phase 3a 选择的 tech/ 档位）

## Step 1: 架构合并

1. 功能统一：合并跨包的功能簇
2. 依赖图：解析导入构建跨包依赖链接
3. 域分类：将功能分组到域。读 CLAUDE.md 获取现有域定义；如无则从包结构推断
4. 一致性检查：合约冲突、类型漂移、孤立代码 → 技术债

## Step 2: 生成 CLAUDE.md Boot Sector

如 CLAUDE.md 没有 `## Skill 项目配置` 节，生成一个。

格式：

## Skill 项目配置

### 包映射
| 域 | 包 |
|---|---|
| {domain} | {包路径} |

### 技术栈
| 项 | 值 |
|---|---|
| 框架 | {检测到的} |
| 状态管理 | {检测到的} |
| 样式 | {检测到的} |
| 测试 | {检测到的} |
| 包管理器 | {检测到的} |

### CSS 约束
| 约束 | 值 |
|------|---|
| 前缀 | {检测到的或 N/A} |
| RTL | {检测到的或 N/A} |

### 文档路径
| 用途 | 路径 |
|------|-----|
| 产品地图索引（决策层） | {docs_root}/product/PRODUCT-MAP.md |
| 模块索引（叙事层） | {docs_root}/product/modules/{name}/index.md |
| 组件文件（规约层） | {docs_root}/product/modules/{name}/{ComponentName}.md |
| 技术架构全景 | {docs_root}/tech/TECH-MAP.md |
| 追溯 | {docs_root}/traces/ |
| 类型合约 | {docs_root}/specs/ |

> `{docs_root}` 取决于模式：legacy 模式 = `docs`，docs 模式 = `.`（根级），repo 模式 = `.ray/docs`。
> 如 tech_tier = skip，省略"技术架构全景"行。

规则：只放 KV 对。不写逻辑描述。不写业务行为。

## Step 3: 生成 tech/ 目录（仅 tech_tier ≠ skip）

如 tech_tier = `skip`，跳过此步骤。

根据 tech_tier 和扫描结果，在 `{docs_root}/tech/` 下生成文档。

### 3a. TECH-MAP.md（full 和 minimal 都生成）

```markdown
# {项目名} — 技术架构全景

> {架构风格一句话，从扫描结果推断，如"Electron 桌面单体 + 嵌入式 Express 服务 + React Native 移动客户端"}

## 技术栈总览

| 端 | 语言 | 框架 | 运行时 |
|----|------|------|--------|
| {从扫描结果填充，每个检测到的运行时一行} |

## 部署拓扑

{ASCII 图，展示各运行时单元的部署关系和通信方式}

## 运行时单元

| 单元 | 类型 | 技术栈 | 文档 |
|------|------|--------|------|
| {名称} | {Agent 自行分类} | {框架 + 语言} | [runtime/{type}/overview.md](runtime/{type}/overview.md) |

> 仅 tech_tier = full 时填充文档链接列。minimal 模式下此表无链接列。

## 数据层

| 组件 | 技术 | 用途 |
|------|------|------|
| {如 SQLite} | {driver 库} | {一句话} |

> 仅列出扫描中检测到的数据层组件。

## 外部依赖（关键）

| 依赖 | 用途 | 版本 |
|------|------|------|
| {仅列核心外部依赖，如 AI SDK、IM SDK、支付 SDK} |

---

_最后更新：{日期}_
```

### 3b. runtime/ 目录（仅 tech_tier = full）

按检测到的运行时分类创建子目录和 overview.md。**仅在有扫描证据时创建**。

分类由 Agent 根据扫描结果自行决定。判断原则：**一个 overview.md 对应一个独立的构建产物和运行环境**。如果两个运行时共享构建工具链和进程模型（如同一个 Node.js 服务的多个模块），合并到一个文件；如果它们有独立的构建入口、不同的部署方式（如 Electron 桌面 vs React Native 移动端），拆分为独立文件。

常见的分类方向供参考（不是硬性规定）：web、h5、native/desktop/mobile、services、database、cache、queue。

每个 overview.md 使用以下模板：

```markdown
# {运行时名称}

> {一句话描述}

## 技术栈

| 项 | 值 |
|---|---|
| 框架 | {检测到的} |
| 语言 | {检测到的} |
| 构建工具 | {检测到的} |
| 入口点 | {检测到的} |

## 架构模式

{1-2 段描述架构模式，如"Electron 主进程通过 IPC Bridge 与渲染进程通信"}

## 关键模块

| 模块 | 职责 | 入口 |
|------|------|------|

## 已知约束

- {性能约束、平台限制等}

---

_最后更新：{日期}_
```

services/ 下额外创建空的 `flows/` 目录（跨服务调用流程在迭代中逐步补充）。

### 3c. concerns/ 目录（full 和 minimal 都生成）

按检测到的关注点生成文档。**仅在有扫描证据时创建**。

| 关注点 | 检测信号 | 生成路径 |
|--------|---------|---------|
| auth | 检测到 JWT/OAuth/bcrypt/session/认证中间件 | concerns/auth.md |
| observability | 检测到 Sentry/winston/pino/日志库/监控 SDK | concerns/observability.md |
| ci-cd | 检测到 .github/workflows/、Dockerfile、CI 配置 | concerns/ci-cd.md |
| testing | 检测到测试框架（vitest/jest/pytest/playwright） | concerns/testing.md |
| security | 检测到 CORS/CSRF/rate-limit/加密/安全中间件 | concerns/security.md |

每个 concerns 文件使用以下模板：

```markdown
# {关注点名称}

> {一句话描述当前项目中该关注点的实现方式}

## 现状

{2-3 段描述当前实现，涵盖各运行时单元中的处理方式}

## 关键决策

| 决策 | 理由 | 影响范围 |
|------|------|---------|

## 已知风险

- {描述}

---

_最后更新：{日期}_
```

### 3d. decisions/ 目录

创建空目录 `tech/decisions/`。**不生成任何 ADR 文件**——ADR 是项目迭代中产生的。

ADR 命名约定：`{YYYY-MM-DD}-{slug}.md`（如 `2026-04-15-multi-tenant-isolation.md`）。在目录下创建一个 `README.md` 说明此约定。

## Step 4: 输出

将 Boot Sector 写入 CLAUDE.md。
如 tech_tier ≠ skip，将 tech/ 目录文件写入 `{docs_root}/tech/`。
输出架构摘要：包结构、关键依赖、域分类、检测到的技术债数量、tech/ 档位和文件数。
```

---

### 产品 Sub-Agent（产品专家角色）

```
你是一位资深产品专家。从代码扫描结果中推断产品的用户面貌，生成三层产品文档网络。

## 角色
你关注的是：用户看到什么、能做什么、交互流程是怎样的。
你的读者是产品经理、QA、用户。
不要写开发追溯（FEAT-xxx/BUG-xxx ID）或测试计数。

## 归纳原则
- 用户视角：描述"用户看到什么、能做什么"，而非"代码改了什么"
- 写意图不写代码：交互写"启动【建立连接】交互，系统进入【等待首字节】状态"，不写"调用 handleConnect 函数"
- 一致的抽象层次：同一模块内各组件的描述粒度保持一致
- 精炼胜于完备：宁可少写一条不重要的边界情况，也不要写成流水账

## 输入
- Phase 2 各包扫描结果：{scan_results}

## 三层架构

| 层 | 文件 | 职责 |
|---|---|---|
| 决策层 | PRODUCT-MAP.md | 产品疆域：模块划分、全局导航 |
| 叙事层 | modules/{name}/index.md | 产品灵魂：用户旅程、组件索引 |
| 规约层 | modules/{name}/{Component}.md | 确定性边界：交互/状态机/不变式/关系 |

## Step 1: 模块发现

将扫描到的 UI 组件分组为面向用户的产品模块。
模块 = 服务于一个用户目标的一组 UI 组件。（不同于技术域）
提议模块名称和分组。

## Step 2: 生成 PRODUCT-MAP.md（决策层）

创建 docs/product/PRODUCT-MAP.md（精简索引，目标 <= 60 行）：

# {项目名} — 产品地图索引

> 目标 <= 60 行。详情在模块目录中。
> 最后更新：{日期}

## 模块索引

| 模块 | 核心组件 | 描述 | 详情 |
|------|---------|------|------|
| {名称} | {组件列表} | {一句话} | [modules/{name}/index.md](modules/{name}/index.md) |

## Step 3: 生成模块索引（叙事层）

为每个模块创建**目录** `docs/product/modules/{name}/`，
其中 `index.md` 只放模块级信息（<= 60 行）：

# {模块名}

> 最后更新：{日期} | 组件数：{count}

## 用户旅程

### 旅程 1：{名称}
{连接各组件的叙事故事：用户做 X → 看到 Y → 点击 Z → 结果}

### 异常旅程
{当主旅程中某步骤失败时的用户体验：网络断开 → 看到 X → 重试 → 恢复}

> 异常旅程补充主旅程，描述故障时用户看到什么、能做什么。与组件级故障旅程互补：index.md 写跨组件的端到端异常体验，组件文件写单组件的技术降级策略。

## 组件索引

| 组件 | 级别 | 功能 | 文件 |
|------|------|------|------|
| {ComponentName} | {轻量/标准/完整} | {一句话} | [{ComponentName}.md]({ComponentName}.md) |

## Step 4: 生成组件文件（规约层）

每个组件一个独立文件 `docs/product/modules/{name}/{ComponentName}.md`。

### 4a. 评估组件级别

| 级别 | 判断条件 | 典型组件 |
|------|---------|---------|
| **轻量** | 无内部状态、无网络交互、纯展示 | EmptyState、静态卡片、LoginCtaBanner |
| **标准** | 有状态但状态转移简单、无复杂异步 | Sidebar、MessageInput、RecommendQuestions |
| **完整** | 有复杂状态流转、网络交互、需要降级策略 | ChatContainer、SSETransport、FloatingAiChat |

### 4b. 建立关系图谱

从代码扫描结果中推断组件间的关系，写入每个组件文件的 `## 关系` 段。

关系类型：

| 类型 | 含义 | 影响传播 |
|------|------|---------|
| 依赖 | A 没有 B 不能工作 | 改 B → 检查 A |
| 嵌入 | A 在界面中渲染 B | 改 B 界面 → A 布局受影响 |
| 触发 | A 发出事件 B 消费 | 改 A 事件格式 → B 受影响 |
| 共享状态 | A 和 B 读写同一 store | 改 store → A 和 B 都检查 |

<CRITICAL>
**双向原子性**：如果 A 的关系表写了 `→ 依赖 B`，
B 的关系表必须有对应的 `← 被依赖 A`。
禁止孤立链接。在同一个 step 中完成两端更新。
</CRITICAL>

### 4c. 轻量级模板

# {ComponentName} — {本地化名称}

> **模块**：[{模块名}](index.md) | **级别**：轻量 | **最后更新**：YYYY-MM-DD

## 关系

| 方向 | 类型 | 目标 | 说明 |
|------|------|------|------|
| → | {类型} | [{目标}](相对路径) | {说明} |
| ← | {类型} | [{来源}](相对路径) | {说明} |

## 功能
一句话。

## 界面结构
ASCII 布局

## 交互

| 触发 | 条件 | 行为 | 视觉反馈 |
|------|------|------|---------|

## 已知限制
- {描述}

### 4d. 标准级模板

# {ComponentName} — {本地化名称}

> **模块**：[{模块名}](index.md) | **级别**：标准 | **最后更新**：YYYY-MM-DD

## 关系

| 方向 | 类型 | 目标 | 说明 |
|------|------|------|------|

## 功能
一句话。

## 界面结构
ASCII 布局

## 交互

| 触发 | 条件 | 行为 | 视觉反馈 |
|------|------|------|---------|

## 状态
- **{状态名}**：视觉表现 / 数据条件

## 边界情况
- {情况} → {处理方式}

## Non-Goals（刻意不做）
- {描述}

## 技术摘要
- 架构模式一句话

## 已知限制
- {描述}

### 4e. 完整级模板

# {ComponentName} — {本地化名称}

> **模块**：[{模块名}](index.md) | **级别**：完整 | **最后更新**：YYYY-MM-DD

## 关系

| 方向 | 类型 | 目标 | 说明 |
|------|------|------|------|

## 功能
一句话。

## 界面结构
ASCII 布局

## 不变式（必须永远成立的规则）
- {规则}

## 状态机

| 当前状态 | 触发事件 | 动作 | 下一状态 |
|---------|---------|------|---------|
| {正常状态} | {正常触发} | {动作} | {下一状态} |
| {正常状态} | {错误触发} | {错误处理} | **{错误状态}** |
| **{错误状态}** | {恢复触发} | {恢复动作} | {正常状态} |

> FSM 必须包含错误/恢复状态，不能只有 happy path。每个网络/异步操作至少一个错误状态行。

## 故障旅程

| 故障场景 | 检测方式 | 降级策略 | 恢复路径 |
|---------|---------|---------|---------|

> 每个 FSM 错误状态都应有对应的故障旅程条目。

## 数据契约引用

| 合约 | 路径 | 说明 |
|------|------|------|
| {spec 名称} | docs/specs/{TYPE}-{4hex}-{slug}.spec.md | {关联说明} |

> 列出该组件依赖的 OpenSpec 合约，方便追溯类型定义来源。

## 性能约束

- {约束项}：{目标值}

> 列出该组件的性能目标。由需求 trace 的治理合规章节定义，迭代更新。如涉及流式渲染、长列表等性能敏感路径，必填。

## Non-Goals（刻意不做）
- {描述}

## Open Issues（待决设计问题）
- {问题}

## 技术摘要
- 架构模式一句话

## 已知限制
- {描述}

## Step 5: 确保 PRODUCT-MAP.md 头部包含产品定位

确保 PRODUCT-MAP.md 的"产品概述"段落包含一句话产品定位。

## Step 6: 输出

将 PRODUCT-MAP.md、所有模块 index.md 和组件文件写入 docs/product/。
输出产品摘要：模块数、组件数、关系边数、文件总数。
```

---

## Phase 4：汇总（主 Agent）

两个 sub-agent 完成后，主 Agent 执行：

1. 检查两侧输出是否有冲突（如 Boot Sector 的包映射与产品模块文件的组件路径是否一致）
2. 向用户展示完成报告：

```
## Origin 完成报告

### 配置
- 输出模式：{hub | legacy}
如 hub 模式：
- .ray/config.yaml：已创建（product: {product}, repo_id: {repo_id}）
- 文档仓：{docs_root}

### 技术侧
- Boot Sector：已写入 CLAUDE.md（{N} 个域、{N} 个包）
- tech/ 档位：{full | minimal | skip}
- 技术债检测：{N} 项

### 产品侧
- 产品模块：{N} 个
- 组件条目：{N} 个
- 用户旅程：{N} 条

### 文件清单
如 hub 模式：
- [created] .ray/config.yaml
- [updated] .gitignore（追加 .ray/docs/）
- [created] CLAUDE.md（Boot Sector 节）
- [created] {docs_root}/product/PRODUCT-MAP.md
- [created] {docs_root}/product/modules/{name}/index.md × {N}
- [created] {docs_root}/product/modules/{name}/{Component}.md × {N}
- 关系边：{N} 条（均双向一致）
如 tech_tier ≠ skip：
- [created] {docs_root}/tech/TECH-MAP.md
如 tech_tier = full：
- [created] {docs_root}/tech/runtime/{type}/overview.md × {N}
- [created] {docs_root}/tech/runtime/{database|cache|queue}.md × {N}
如 tech_tier = full 或 minimal：
- [created] {docs_root}/tech/concerns/{topic}.md × {N}

### CSV 索引
- [created] {docs_root}/traces/index.csv
- [created] {docs_root}/traces/files.csv
- [created] {docs_root}/traces/tests.csv
- [created] {docs_root}/traces/apis.csv
- [created] {docs_root}/traces/tech_debt.csv
```

### Phase 4a：初始化 CSV 索引

创世模式下，运行：`python3 {ray_plugin_path}/scripts/search.py --init --project-dir {项目根路径}`

这会在 `docs/traces/` 下创建带表头的空 CSV 文件（index.csv, files.csv, tests.csv, apis.csv, tech_debt.csv），为后续 `/trace` 使用做好准备。

---


## 校准模式（`--reconcile`）

校准模式同样派发两个并行 sub-agent，但仅扫描有变化的包（指纹匹配跳过未变化的）。

### 技术 Sub-Agent 校准任务
- CLAUDE.md Boot Sector：包路径是否仍有效？版本是否与技术栈表匹配？
- 检测新增/删除的包

### 产品 Sub-Agent 校准任务
- 组件文件内容与代码是否匹配？
- 是否有新组件未被收录？（缺失的 .md 文件）
- 是否有已删除组件仍有 .md 文件？
- 关系表双向一致性：所有 → 链接是否有对应的 ← 链接？
- 模块 index.md 的组件索引表是否与实际组件文件一致？
- 孤立链接检测：链接目标文件是否存在？

### 校准日志

```markdown
# 校准报告 — {日期}

## Boot Sector 验证
- 包映射：{通过/偏移} — {详情}
- 技术栈版本：{通过/偏移} — {详情}

## 产品地图偏移
- {ComponentName}：组件条目与代码是否匹配？{是/否}
- 新增组件（未收录）：{列表}
- 已删除组件（仍在文档中）：{列表}

## 自动修复
- {修复了什么}

## 需人工审查
- {需手动验证的项目}
```

---

## 规则

1. **不修改源码** — 只读（docs/ 和 CLAUDE.md 除外）
2. **承认不确定性** — 使用 `unknown`、`TODO`、`STUB`
3. **标记冲突，不解决** — 不一致性归入技术债
4. **Boot Sector 只放 KV** — CLAUDE.md 中不写逻辑描述
5. **产品模块使用四列交互表** — 触发 / 条件 / 行为 / 视觉反馈
6. **用户旅程必填** — 每个模块 index.md 以叙事旅程开头
7. **向用户确认** — Phase 3 开始前展示骨架概览
8. **不生成 trace 和 MAP.md** — 那是开发流水线（/trace → /pipeline → /update-map）的职责
9. **产品文档不写开发追溯** — 不在组件文件中写入 FEAT-xxx/BUG-xxx ID 或测试计数

### 维护三律

10. **写意图不写代码** — 描述业务意图（"启动【建立连接】交互"），不描述代码实现（"调用 handleConnect"）。代码会改名，意图不变。
11. **双向原子更新** — 修改 A→B 关系时，必须在同一个 task 中更新 A 和 B 两个文件的关系表。禁止孤立链接。
12. **爬行深度限制** — 影响分析默认只爬两层链接（直接上游 + 直接下游），防止上下文爆炸。

---

## 文档仓初始化模式（`/origin --docs`）

<HARD-GATE>
仅在空 git 仓中执行。检测到非空仓 → 报错退出。
</HARD-GATE>

### 流程

```
/origin --docs
  1. 检测当前目录是否为空 git 仓（除 .git 和 README.md 外无其他文件）
     → 非空：报错 "当前仓库非空，/origin --docs 仅在空仓中执行"
  2. 提问产品名：
     "请输入产品标识（如 acme）："
  3. 询问是否需要技术架构文档：
     "是否需要 tech/ 目录（技术架构、服务拓扑、ADR）？(y/n)"
  4. 创建目录结构：
     product/
       PRODUCT-MAP.md          ← 骨架（含产品定位占位符 + 空模块索引表）
       modules/                ← 空目录
     contracts/
       shared/schemas/         ← 空目录
     traces/
       .gitignore              ← 内容：*.csv
       _archive/               ← 空目录
     如选择了 tech/：
       tech/
         TECH-MAP.md           ← 骨架（含架构风格占位符）
         runtime/
         concerns/
         decisions/
  5. git add + commit（消息："[ray] origin --docs: initialize {product} docs repo"）
  6. 推送到 remote（如配置了）
  7. 输出：
     "文档仓已创建。在各代码仓中运行以下命令连接：
      /origin --connect {当前仓 remote url}

      如果还没有 remote，请先在 GitHub/GitLab 创建仓库并推送。"
```

### PRODUCT-MAP.md 骨架

```markdown
# {product} — 产品地图

> {产品定位一句话 — 请补充}

---

## 模块索引

| 模块 | 职责 | 核心组件 | 文档 |
|------|------|---------|------|

---

_最后更新：{日期}_
```

### TECH-MAP.md 骨架（如选择创建）

```markdown
# {product} — 技术架构全景

> 架构风格：{请补充，如 BS / 微服务 / 全栈}

## 服务拓扑

{请补充}

## 技术栈总览

| 端 | 语言 | 框架 | 运行时 |
|----|------|------|--------|

---

_最后更新：{日期}_
```

---

## 连接代码仓模式（`/origin --connect {docs_url}`）

<HARD-GATE>
仅在代码仓中执行（非文档仓）。检测到已有 `.ray/config.yaml` → 提示已连接，是否重新配置。
</HARD-GATE>

### 流程

```
/origin --connect git@github.com:acme/acme-docs.git
  1. 检测是否已有 .ray/config.yaml
     → 已有：展示当前配置，询问 "已连接到 {docs_url}，是否重新配置？(y/n)"
     → n：退出
  2. clone 文档仓到临时目录，读取 PRODUCT-MAP.md 提取 product 名
     → clone 失败：报错 "无法访问 {docs_url}，请检查地址和权限"
     → PRODUCT-MAP.md 不存在：报错 "目标仓库不是有效的 ray 文档仓（缺少 PRODUCT-MAP.md），请先运行 /origin --docs"
  3. 从 git remote 推导 repo_id：
     git remote get-url origin → 提取仓库名 → 去掉 org 前缀
     如 git@github.com:acme/acme-web.git → web
  4. 展示推导结果，确认：
     "检测到：
      product: {product}
      repo_id: {repo_id}
      docs_url: {docs_url}
      确认？(y/n，或输入修正值)"
  5. 创建 .ray/ 目录（如不存在）
  6. 生成 .ray/config.yaml：
     ```yaml
     product: {product}
     repo_id: {repo_id}
     docs_url: {docs_url}
     ```
  7. 追加 .ray/docs/ 到 .gitignore（如不存在该行）
  8. 将临时 clone 移动到 .ray/docs/（或删除临时 clone 重新 clone 到 .ray/docs/）
  9. 扫描代码中的 API 路由定义（Express routes / Next.js API routes / Spring annotations 等）
     → 如发现已有 API，生成 contracts/{module}/paths/{resource}.yaml 骨架
     → 展示骨架列表，询问 "是否写入文档仓的 contracts/ 目录？(y/n)"
     → y：写入并 commit + push 到文档仓
     → 如未发现或用户跳过，不生成
  10. 输出：
      "连接成功！
       配置：.ray/config.yaml
       文档仓：.ray/docs/

       请提交配置：
         git add .ray/config.yaml .gitignore
         git commit -m 'chore: connect to ray docs repo'

       之后团队其他人 clone 本仓即可直接使用 ray。"
```

---

## resolve_docs_root() — 文档根路径解析

所有 skill 在入口处调用此逻辑获取文档根路径和运行模式。

```
resolve_docs_root():
    # 优先级 1：当前目录就是文档仓
    # 三重检测避免误判：product/PRODUCT-MAP.md + traces/ + 无 .ray/config.yaml
    if exists("./product/PRODUCT-MAP.md") and exists("./traces/") and not exists("./.ray/config.yaml"):
        return cwd, mode = "docs"

    # 优先级 2：当前在一个带 .ray/config.yaml 的代码仓
    if exists("./.ray/config.yaml"):
        cfg = read_config("./.ray/config.yaml")
        docs_path = "./.ray/docs"

        if not exists(docs_path):
            git clone cfg.docs_url docs_path
            ensure_gitignore_entry(".ray/docs/")

        return docs_path, mode = "repo"

    # 优先级 3：单仓模式（向后兼容）
    if exists("./docs/product/PRODUCT-MAP.md"):
        return "./docs", mode = "legacy"

    error("未检测到 ray 文档仓或 ray 配置。请运行 /origin 初始化。")
```

### 同步时机

每次 ray 命令入口，在 `resolve_docs_root()` 返回 `mode = "repo"` 后：

```
sync_docs():
    git -C .ray/docs fetch origin
    git -C .ray/docs pull --rebase
    if pull 失败:
        # 核武器恢复：删除并重新 clone
        rm -rf .ray/docs
        git clone cfg.docs_url .ray/docs
    # 重建 CSV 缓存
    python3 {ray_plugin_path}/scripts/search.py --rebuild-csv --project-dir {docs_path}
```

- **docs 模式**下不自动 sync——用户在文档仓自己管 git
- **legacy 模式**下不 sync——单仓无需同步
