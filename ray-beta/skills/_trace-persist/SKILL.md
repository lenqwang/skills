---
name: _trace-persist
description: 内部 skill，不可直接调用。需求持久化底层引擎，由 /propose 和 /trace 调用。负责模块定位、ID 生成、文件写入、CSV 索引更新和收尾确认
---

# _trace-persist — 需求持久化引擎

你是需求持久化的底层工具。你不做任何分析、不问任何问题、不生成任何内容。你只执行上游 skill（`/propose` 或 `/trace`）传入的指令。

<HARD-GATE>
此 skill 不可直接由用户调用。它只接受来自 `/propose` 或 `/trace` 的调度。
如果用户直接运行 `/_trace-persist`，提示："请使用 `/propose`（产品需求）或 `/trace`（技术需求）提交需求。"
</HARD-GATE>

## 输入

上游 skill 调用时必须提供：

| 参数 | 说明 |
|------|------|
| `mode` | `pm` 或 `dev` — 标记需求来源角色 |
| `type` | `FEAT` / `BUG` / `REFACTOR` / `PATCH` |
| `title` | 需求标题（用于 ID 生成） |
| `module` | 受影响的产品模块名（从 PRODUCT-MAP 定位） |
| `component` | 受影响的组件名（可选，`/propose` 不传，`/trace` 传） |
| `content` | 完整的 Markdown 需求文档正文（由上游 skill 已起草完成） |
| `roles` | 角色列表（可选），逗号分隔，如 `pd, ui, be, fe, qc`。上游 skill 根据需求类型传入 |

## 执行步骤

### Step 0：解析文档根路径

调用 `resolve_docs_root()` 获取 `(docs_root, mode)`。

- `mode = "docs"`：当前在文档仓，`docs_root` = cwd
- `mode = "repo"`：当前在代码仓，`docs_root` = `.ray/docs`
- `mode = "legacy"`：单仓模式，`docs_root` = `./docs`

后续所有路径以 `{docs_root}` 为基底：
- 产品地图：`{docs_root}/product/PRODUCT-MAP.md`
- trace 文件：`{docs_root}/traces/{FEAT-ID}/trace.md`（多项目模式）或 `{docs_root}/traces/{FEAT-ID}.md`（legacy 模式）
- CSV 索引：`{docs_root}/traces/index.csv`

### Step 1：模块定位验证

读 `{docs_root}/product/PRODUCT-MAP.md`，验证上游传入的 `module` 在模块索引表中存在。

- 若存在：继续
- 若不存在：返回错误给上游，附上当前模块列表供修正
- 若 PRODUCT-MAP.md 不存在：降级检查 `{docs_root}/MAP.md`。如也不存在，返回错误建议运行 `/origin`

### Step 2：生成 FEAT-ID

```bash
python3 {ray_plugin_path}/scripts/search.py --generate-id --type {type} --title "{title}" --date {当天日期，YYYY-MM-DD 格式}
```

输出格式：`{TYPE}-{4hex}-{slug}`（例：`FEAT-a3f7-realtime-price`）。

### Step 3：计算 Baseline 哈希

解析 `content` 中的 `## Baseline` 章节，找到 Markdown 表格中列出的文件路径。对每个文件：
- 读取文件内容，计算 SHA256，取前 8 位十六进制字符
- 替换表格中对应行的占位符（如 `{由 /_trace-persist 填充}`）为实际哈希值
- 如文件不存在，填 `N/A`

### Step 4：写入 trace 文件

**多项目模式（mode = "docs" 或 "repo"）**：

1. 创建 `{docs_root}/traces/{FEAT-ID}/` 目录
2. 将 `content` 写入 `{docs_root}/traces/{FEAT-ID}/trace.md`
   - 文档为纯 Markdown，**不含 YAML frontmatter**
   - 在文档头部插入 `> mode: {mode}`，标记来源角色
   - 若上游传入 `roles`，紧随 mode 行之后插入 `> roles: {roles}`（如 `> roles: pd, ui, be, fe, qc`）
3. 若上游传入 `roles`，为每个角色创建对应的空白模板文件到 `{docs_root}/traces/{FEAT-ID}/` 目录：
   - 角色与文件名映射：`ui` → `ui.md`、`be` → `be.md`、`fe` → `fe.md`、`qc` → `test-plan.md`、`pd` → 跳过（已由 trace.md 覆盖）
   - **注意**：`challenge.md` 不在此处预创建。它由 Pipeline 的 Challenge phase 按需懒创建（见 `/pipeline` 自愈循环）
   - 每个角色文件写入最小模板：
     ```markdown
     # {FEAT-ID} — {role} 视角

     > parent: {FEAT-ID}/trace.md

     <!-- 由对应角色 skill 填充 -->
     ```
4. 创建 `{docs_root}/traces/{FEAT-ID}/state/` 目录
5. 写入初始 state json `{docs_root}/traces/{FEAT-ID}/state/{repo_id}.json`（repo 模式）或 `docs.json`（docs 模式）：
   ```json
   {
     "status": "confirmed",
     "phase": "trace",
     "updated_at": "{ISO 8601}",
     "updated_by": "_trace-persist"
   }
   ```
6. 运行 CSV 重建：
   ```bash
   python3 {ray_plugin_path}/scripts/search.py --rebuild-csv --project-dir {docs_root}
   ```

**Legacy 模式（mode = "legacy"）**：

1. 若 `{docs_root}/traces/index.csv` 不存在，先初始化：
   ```bash
   python3 {ray_plugin_path}/scripts/search.py --init --project-dir {project_root}
   ```
2. 将 `content` 写入 `{docs_root}/traces/{FEAT-ID}.md`（扁平文件，兼容旧行为）
   - 在文档头部插入 `> mode: {mode}`
3. 向 `{docs_root}/traces/index.csv` 追加一行：
   ```
   id,type,phase,module,component,title,keywords,status,author,date,file,depends_on,depended_by
   ```
   - `component`：填入上游传入的 `component`，未传则留空
   - `author`：`mode=pm` 时填 `pm`，`mode=dev` 时填 `dev`
   - `status`：`confirmed`
   - `phase`：`trace`
   - `depends_on` / `depended_by`：初始留空

### Step 5：收尾确认

向用户展示（根据模式区分路径提示）：

**多项目模式**：

```
需求已确认，注册为 {FEAT-ID}。
文件已写入 {TRACE_ID}/trace.md{roles 存在时追加：，角色文件：ui.md, be.md, ...}

请选择执行方式：
  A) 在 worktree 中执行（推荐）— 创建隔离分支，不影响当前工作区
  B) 在当前工作区执行 — 直接在当前分支开发

选择 A 或 B？
```

**Legacy 模式**：

```
需求已确认，注册为 {FEAT-ID}。
文件已写入 traces/{FEAT-ID}.md

请选择执行方式：
  A) 在 worktree 中执行（推荐）— 创建隔离分支，不影响当前工作区
  B) 在当前工作区执行 — 直接在当前分支开发

选择 A 或 B？
```

若用户选 A：提示运行 `/pipeline --worktree`
若用户选 B：提示运行 `/pipeline`

---

## 公共协议（供所有 skill 使用）

以下三个协议由 `_trace-persist` 定义，供所有 skill 在入口和出口调用。

### resolve_trace_id()

从上下文中提取当前操作的 TRACE_ID。所有需要 trace 上下文的 skill 在入口处调用。

```
resolve_trace_id():
    # 优先级 1：显式参数
    if 用户传入了 TRACE_ID 参数（如 /pipeline FEAT-a3f7）:
        return TRACE_ID

    # 优先级 2：从当前代码分支名提取
    branch = git rev-parse --abbrev-ref HEAD
    match = regex /(FEAT|BUG|PATCH|REFACTOR|CHORE)-[0-9a-f]{4}/i 在 branch 中
    if match:
        return match（取最后一个匹配，因为 slug 本身可能含 -）

    # 优先级 3：残留文件
    if exists(".ray/current-trace"):
        return read(".ray/current-trace").trim()

    # 优先级 4：交互式询问
    ask 用户输入 TRACE_ID
```

**约定**：工程师建代码分支时命名包含 TRACE_ID，如 `feat/login-FEAT-a3f7`。`/trace` 成功后自动写入 `.ray/current-trace` 作为 fallback。

### on_skill_enter(TRACE_ID)

所有操作 trace 的 skill（除 `/propose`）在入口处调用此协议，确保文档仓分支与当前 trace 对齐。

```
on_skill_enter(TRACE_ID):
    (docs_root, mode) = resolve_docs_root()

    # legacy 模式无分支管理
    if mode == "legacy":
        return

    target = "ray/" + lowercase(TRACE_ID)

    # docs 模式：用户自己管 git，不自动操作
    if mode == "docs":
        current = git rev-parse --abbrev-ref HEAD
        if current != target:
            warn "当前在分支 {current}，TRACE_ID {TRACE_ID} 对应分支 {target}。建议 git checkout {target}"
        return

    # repo 模式：自动对齐
    git -C {docs_root} fetch origin

    if remote 存在 target:
        git -C {docs_root} checkout {target}
        git -C {docs_root} pull --rebase
    else:
        error "trace {TRACE_ID} 尚未创建 docs 分支。请先运行 /trace {TRACE_ID}"

    if pull/checkout 失败:
        # 核武器恢复
        rm -rf {docs_root}
        git clone {cfg.docs_url} {docs_root}
        git -C {docs_root} checkout {target}
```

**谁调用**：`/pipeline`、`/architect`、`/qa`、`/coder`、`/audit`、`/update-map`、`/ship`、`/digest`
**谁不调用**：`/propose`（直接写 main）、`/trace`（它是分支创建者，有自己的分支逻辑）、`/origin`、`/explore`（只读）、`/guard`、`/learn`

### auto_commit_push(TRACE_ID, skill_name, summary)

所有对文档仓的写入完成后调用此协议，统一提交和推送。

```
auto_commit_push(TRACE_ID, skill_name, summary):
    (docs_root, mode) = resolve_docs_root()

    # legacy 模式不自动 push（单仓，用户自己管 git）
    if mode == "legacy":
        return

    # 提交消息格式（固定，便于与人类 commit 区分）
    message = "[ray] {skill_name} {TRACE_ID}: {summary}\n\nrepo: {repo_id | 'docs'}\ntrace: {TRACE_ID}"

    git -C {docs_root} add -A
    git -C {docs_root} commit -m "{message}"

    # push 策略
    if 写入路径包含 traces/** 或 contracts/**:
        自动 push
    elif 写入路径包含 product/**:
        if pipeline_context == true:
            自动 push（pipeline 已获用户确认）
        else:
            询问用户是否 push

    # push 失败重试
    if push 非 fast-forward:
        git -C {docs_root} pull --rebase
        git -C {docs_root} push（重试一次）
    if 仍失败:
        核武器恢复 + 重新执行写入
```

**提交消息示例**：
```
[ray] coder FEAT-a3f7: 实现登录 API

repo: srv-user
trace: FEAT-a3f7
```

---

## 规则

1. **不做分析** — 不读组件文件，不判断影响范围
2. **不问问题** — 不向用户澄清需求内容
3. **不生成内容** — 不写场景、不写验收标准
4. **只做持久化** — 定位、编号、写文件、更新索引
5. **幂等** — 相同输入 + 相同日期产生相同 FEAT-ID（日期参与哈希）。重复调用不会创建重复文件
