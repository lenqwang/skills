---
name: origin
description: 为新项目生成产品文档和技术文档（创世），或对照代码校准现有文档（--reconcile）。支持多项目文档仓初始化（--docs）和代码仓连接（--connect）
argument-hint: [--reconcile | --docs | --connect <url>]
---

# Origin — 创世与校准

扫描代码库，并行生成技术文档和产品文档。产出的产品文档是 /propose → /prd → /trace 整条链路的基础。

## 四种模式

| 模式 | 用途 | 详细参考 |
|------|------|---------|
| `/origin` | **创世**：首次扫描。无文档存在。从零生成一切（含初始化 CSV 索引）。**默认 external 模式**（创建 `.ray/` 配置 + 独立文档仓），可降级为 inline 单仓模式。 | 本文 Phase 0-4 |
| `/origin --reconcile` | **校准**：三层文档已存在。对比文档状态与实际代码。修复偏移。 | 本文"校准模式"段 |
| `/origin --docs` | **文档仓初始化**：在空 git 仓中创建文档仓目录结构。一次性操作。 | [references/docs-mode.md](references/docs-mode.md) |
| `/origin --connect {docs_url}` | **连接代码仓**：将代码仓连接到已有文档仓。生成 `.ray/config.yaml`，clone 文档仓到 `.ray/docs/`。 | [references/connect-mode.md](references/connect-mode.md) |

> **迁移相关操作**已独立为 `/migrate` skill。包括产品文档迁移（`/migrate --docs`）和索引迁移（`/migrate --index`）。

---

## Phase 0：确定输出模式

**判定按下表自上而下，第一行命中即停。**

| # | 检测到什么 | 行为 |
|---|-----------|------|
| 1 | `.ray/config.yaml` 存在 且 `.ray/docs/` 已挂载 | external 模式，docs_root = `.ray/docs/`，进入 clone 后分流（见下） |
| 2 | `.ray/config.yaml` 存在 但 `.ray/docs/` 缺失 | 由 `resolve_docs_root()` 自动 `git clone {docs_url} .ray/docs/`（见 [_trace-persist 公共协议](../_trace-persist/references/public-protocols.md)），不在 origin 内重复实现 clone；clone 完成后等价为第 1 行命中，进入分流 |
| 3 | 上述 external 通路不命中（无 `.ray/config.yaml`），且 `docs/product/PRODUCT-MAP.md` 在仓内存在 → inline 模式且已合规 | 建议改用 `--reconcile`，退出 |
| 4 | 都不命中 | 询问用户选择模式（见下） |

### Phase 0 clone 后分流（external 已挂载或刚挂载完成）

`.ray/docs/` 就绪后，按其内容三态决定下一步：

| `.ray/docs/` 内容 | 行为 |
|-------------------|------|
| `.ray/docs/product/PRODUCT-MAP.md` 已存在 | 文档仓已是合规文档体系，提示"文档仓已具备完整产品地图"并退出，建议改用 `/origin --reconcile` 校准代码与文档偏移 |
| `.ray/docs/` 为空骨架（目录已就绪但无 PRODUCT-MAP.md，可能由 `/origin --docs` 初始化产生） | 视为外壳已就绪，进入 Phase 1 由 origin 填充三层文档 |
| `.ray/docs/` 既非合规文档仓也非空骨架（既无 PRODUCT-MAP.md 也无识别得出的初始化痕迹） | 报错并提示先在远端文档仓跑 `/origin --docs` 初始化，或核对 `.ray/config.yaml.docs_url` 指向 |

全程不向用户反问；只有 clone 失败 / 远端损坏 这类"信息不足无法推导"的情况才停下报错。

**询问模式**：

```
文档存放在哪？
A. 当前仓库的 docs/ 目录（inline 模式，单仓）
B. 独立文档仓（输入本地路径或 git URL）
```

**用户选 A** → `docs_root = "docs/"`，跳到 Phase 1。

**用户选 B** → `docs_root = ".ray/docs/"`，按用户输入分支处理（复用 [references/connect-mode.md](references/connect-mode.md) 的步骤，无需 `--connect` 显式 flag）：

| 输入形态 | 处理 |
|---------|------|
| git URL（`git@…`、`https://…/.git`） | 执行 connect-mode.md step 2（clone 到临时目录读 `PRODUCT-MAP.md` 推 product 名）+ step 5-8（创 `.ray/`、生成 `config.yaml`、改 `.gitignore`、移到 `.ray/docs/`） |
| 已存在的本地 docs 仓路径 | 跳过 clone。直接 connect-mode.md step 5-7：创 `.ray/`、生成 `config.yaml`（`docs_url` 字段填该绝对路径）、追加 `.gitignore`。**不软链、不复制**——`.ray/docs/` 不存在时由 git 工具按 `docs_url` 解引用 |
| 不存在的本地路径 | 拒绝并提示 "{path} 不存在。请先在该路径运行 `/origin --docs` 初始化文档仓骨架，或直接提供已存在的路径 / git URL"。不自动 `git init`——创世应连接到既有文档仓，初始化空仓是 `--docs` 的职责 |

进入 Phase 1 前，hub 路径下 `{docs_root}` 已就绪，`.ray/config.yaml` 已落盘。

---

## Phase 0.5：空代码仓检测 → 骨架分支（FEAT-a428）

> 命令中 `<RAY_ROOT>` = 提示头部 `Base directory for this skill:` 路径剥掉末尾 `/skills/<name>`（例 `/.../ray/3.1.0/skills/origin` → `/.../ray/3.1.0`）；勿原样传 shell。

Phase 0 决定 `{docs_root}` 后、Phase 1 启动地形扫描前，**总是**先检测代码仓是否为空：

```bash
python3 <RAY_ROOT>/scripts/ray/ --detect-empty-repo --project-dir {project_root} --json
```

`is_empty == true` → 走骨架路径（本节剩余步骤）；`is_empty == false` → 跳到 Phase 1 既有流程。

**检测清单是单一权威源**：8 种元数据文件 + 4 种源码目录的判定列表由 `scripts/ray/empty_detect.py` 维护，权威定义见 `docs/specs/docs-management/origin.spec.md`。SKILL.md prompt **禁止**在此处复制粘贴检测列表——以脚本结果为准。

### 骨架路径

1. **不调用 sub-agent**——空仓没有代码可扫描，硬约束（见下不变式 I2）
2. **不询问 tech/ 档位**——固定为 `skip`
3. **调用骨架初始化**：

   ```bash
   python3 <RAY_ROOT>/scripts/ray/ --init-skeleton \
     --docs-root {docs_root} \
     --product-name {project_dir 的 basename} \
     --date {YYYY-MM-DD}
   ```

   产出固定 4 件文件：
   - `{docs_root}/product/PRODUCT-MAP.md`（空模板，含 `_暂无模块。_` 占位）
   - `{docs_root}/product/modules/.gitkeep`
   - `{docs_root}/traces/index.csv`（仅表头）
   - `{docs_root}/traces/archive.csv`（仅表头）

   退出码：0 = 成功 / 3 = 半完成态（提示用户人工核对，不强行覆盖）/ 4 = `--docs-root` 不可写。

4. **跳过 Phase 1 / Phase 2 / Phase 3a / Phase 3b**。骨架路径下的 Phase 4 行为如下（与正常路径不同——sub-agent 都没跑）：
   - **跳过** Phase 4 Step 1（无 sub-agent 输出可冲突检查）
   - **跳过** Phase 4 Step 2 的常规完成报告——改用下方"骨架完成报告"模板
   - **必须执行** Phase 4 Step 3：`auto_commit_push(TRACE_ID="origin-init", "origin", "项目骨架落盘")`——否则 external 模式下骨架文件不 push 到 `origin main`，其他 client 后续 clone 时拿不到骨架

### 骨架完成报告

报告必须包含：

```
✓ origin 完成（骨架态）
  · 模式：{inline | external}
  · 状态：骨架（无代码可扫描）
  · 产出：
    - {docs_root}/product/PRODUCT-MAP.md
    - {docs_root}/product/modules/.gitkeep
    - {docs_root}/traces/index.csv
    - {docs_root}/traces/archive.csv

后续路径（按需选一）：
  · /ray:propose — 启动需求驱动流程，由 propose 写入第一个产品模块
  · 添加代码后运行 /ray:origin --reconcile — 让文档与代码对齐
```

### 不变式

| # | 不变式 |
|---|--------|
| I1 | 骨架路径产出文件数量 == 4（不含 init_csv 派生的 files/tests/apis/tech_debt CSV） |
| I2 | 骨架路径绝不调用 Sub-Agent |
| I3 | PRODUCT-MAP.md 模块索引保持 `_暂无模块。_` 占位 |
| I4 | 非空仓场景的 Phase 1-4 行为不变 |
| I5 | `--docs` / `--connect` / `--reconcile` 不经过本检测 |

---

## Phase 1：地形扫描（快速，单 Agent）

**目标**：数秒内建立骨架地图，不读源码。

按检测到的语言生态扫描项目配置文件：

| 生态 | 扫描文件 | 提取信息 |
|------|---------|---------|
| JS/TS | `package.json`、`tsconfig*.json`、`turbo.json`、锁文件 | 包名、依赖、脚本、构建目标 |
| Python | `pyproject.toml`、`setup.py`、`requirements*.txt`、`Pipfile` | 包名、依赖、入口点 |
| Go | `go.mod`、`go.sum` | 模块名、依赖 |
| Rust | `Cargo.toml`、`Cargo.lock` | 包名、依赖、workspace |
| Java/Kotlin | `pom.xml`、`build.gradle*` | 模块、依赖 |
| 通用 | `README.md`、`CLAUDE.md`、`docs/`、`Makefile`、`Dockerfile`、CI 配置 | 构建方式、测试框架 |

每个包/模块的 `src/`（或等效目录）只扫顶层目录列表。

**输出**：内部骨架（语言、包列表、入口点、构建工具、测试框架、包管理器）。

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

- **技术 Sub-Agent**（架构师角色）：完整 prompt 和 Boot Sector / tech/ 所有模板详见 [references/tech-subagent.md](references/tech-subagent.md)
- **产品 Sub-Agent**（产品专家角色）：完整 prompt 和 PRODUCT-MAP / 模块 / 3 级组件模板详见 [references/product-subagent.md](references/product-subagent.md)

---

## Phase 4：汇总（主 Agent）

两个 sub-agent 完成后，主 Agent 执行：

1. 检查两侧输出是否有冲突（如 Boot Sector 的包映射与产品模块文件的组件路径是否一致）
2. 向用户展示完成报告 — 完整模板 + Phase 4a CSV 索引初始化命令详见 [references/completion-report.md](references/completion-report.md)
3. **协议出口（创世落盘）**：所有 phase 写入完成后，调用一次：

   ```
   auto_commit_push(TRACE_ID="origin-init", "origin", "项目创世落盘")
   ```

   单次 commit 覆盖本次创世产生的全部文件（`{docs_root}/product/`、`{docs_root}/tech/`、CSV 索引等）。`TRACE_ID` 占位为字面量 `"origin-init"`（origin 无对应 FEAT-ID）。inline 模式下 `auto_commit_push` 为 no-op，不影响行为。external/docs 模式自动 commit + push。详见 [../_trace-persist/references/public-protocols.md](../_trace-persist/references/public-protocols.md)。

---

## 校准模式（`--reconcile`）

校准模式同样派发两个并行 sub-agent，但仅扫描有变化的包（指纹匹配跳过未变化的）。

### 技术 Sub-Agent 校准任务
- CLAUDE.md Boot Sector：包映射中的路径是否仍有效？
- 检测新增/删除的包

### 产品 Sub-Agent 校准任务
- 组件文件内容与代码是否匹配？
- 是否有新组件未被收录？（缺失的 .md 文件）
- 是否有已删除组件仍有 .md 文件？
- 关系表双向一致性：所有 → 链接是否有对应的 ← 链接？
- 模块 index.md 的组件索引表是否与实际组件文件一致？
- 孤立链接检测：链接目标文件是否存在？

校准日志模板详见 [references/completion-report.md](references/completion-report.md) 的"校准模式报告模板"段。

### 协议出口（校准落盘）

所有校准修复写入完成后，同样调用一次 `auto_commit_push(TRACE_ID="origin-init", "origin", "项目创世落盘")` 把校准产生的修订一次落盘（external/docs 模式）。inline 模式 no-op。

---

## 公共工具：resolve_docs_root()

由 `_trace-persist` 定义的跨 skill 公共协议，所有 skill 入口处调用。完整伪代码和返回值含义详见 [../_trace-persist/references/public-protocols.md](../_trace-persist/references/public-protocols.md)。

---

## 规则

1. **不修改源码** — 只读（docs/ 和 CLAUDE.md 除外）
2. **承认不确定性** — 使用 `unknown`、`TODO`、`STUB`
3. **标记冲突，不解决** — 不一致性归入技术债
4. **Boot Sector 只放 KV** — CLAUDE.md 中不写逻辑描述
5. **产品模块使用四列交互表** — 触发 / 条件 / 行为 / 视觉反馈
6. **用户旅程必填** — 每个模块 index.md 以叙事旅程开头
7. **向用户确认** — Phase 3 开始前展示骨架概览
8. **不生成 trace 和 CSV 索引** — 那是开发流水线（/trace → /pipeline → /update-map）的职责
9. **产品文档不写开发追溯** — 不在组件文件中写入 FEAT-xxx/BUG-xxx ID 或测试计数

### 维护三律

10. **写意图不写代码** — 描述业务意图（"启动【建立连接】交互"），不描述代码实现（"调用 handleConnect"）。代码会改名，意图不变。
11. **双向原子更新** — 修改 A→B 关系时，必须在同一个 task 中更新 A 和 B 两个文件的关系表。禁止孤立链接。
12. **爬行深度限制** — 影响分析默认只爬两层链接（直接上游 + 直接下游），防止上下文爆炸。
