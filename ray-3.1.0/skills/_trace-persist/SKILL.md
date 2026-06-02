---
name: _trace-persist
description: 内部 skill，不可直接调用。需求持久化底层引擎，由 /propose 和 /trace 调用。负责模块定位、ID 生成、文件写入、CSV 索引更新和收尾确认。同时为所有 skill 提供三个公共协议（resolve_trace_id / on_skill_enter / auto_commit_push）
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
| `source` | `pm` 或 `dev` — 标记需求来源角色 |
| `type` | `FEAT` / `BUG` / `REFACTOR` / `PATCH` / `CHORE` |
| `title` | 需求标题（用于 ID 生成） |
| `module` | 受影响的产品模块名（从 PRODUCT-MAP 定位） |
| `component` | 受影响的组件名（可选，`/propose` 不传，`/trace` 传） |
| `content` | 完整的 Markdown 需求文档正文（由上游 skill 已起草完成） |
| `roles` | 角色列表（可选），逗号分隔，如 `pd, ui, be, fe, qc`。上游 skill 根据需求类型传入 |

---

## 执行步骤

### Step 0：解析文档根路径

> 命令中 `<RAY_ROOT>` = 提示头部 `Base directory for this skill:` 路径剥掉末尾 `/skills/<name>`（例 `/.../ray/3.1.0/skills/_trace-persist` → `/.../ray/3.1.0`）；勿原样传 shell。

运行脚本获取模式（不要自己判断，用脚本结果）：

```bash
python3 <RAY_ROOT>/scripts/ray/ --resolve-docs-root --json
```

输出 `{"docs_root": "...", "mode": "external|docs|inline"}` / `{"error": "..."}` / `{"need_user_decision": true, "context": "...", "options": [...]}`。若返回 error，停止并告知用户。若返回 `need_user_decision: true`，向用户呈现 context + options，等待选择后据此操作（详见 `references/public-protocols.md` "自动挂载失败交互"段）。

后续所有路径以 `{docs_root}` 为基底：
- 产品地图：`{docs_root}/product/PRODUCT-MAP.md`
- trace 文件：`{docs_root}/traces/{2hex}/{FEAT-ID}/trace.md`（`{2hex}` 取 FEAT-ID 4 位 hex 的前 2 位）
- CSV 索引：`{docs_root}/traces/index.csv`

### Step 1：模块定位验证

读 `{docs_root}/product/PRODUCT-MAP.md`，验证上游传入的 `module` 在模块索引表中存在。

- 若存在：继续
- 若不存在：返回错误给上游，附上当前模块列表供修正
- 若 PRODUCT-MAP.md 不存在：降级检查 `{docs_root}/traces/index.csv` 按 module 列定位。如也不存在，返回错误建议运行 `/origin`

### Step 2：生成 FEAT-ID

```bash
python3 <RAY_ROOT>/scripts/ray/ --generate-id --type {type} --title "{title}" --date {当天日期，YYYY-MM-DD 格式}
```

输出格式：`{TYPE}-{4hex}-{slug}`（例：`FEAT-a3f7-realtime-price`）。

### Step 3：计算 Baseline 哈希

解析 `content` 中的 `## Baseline` 章节，找到 Markdown 表格中列出的文件路径。对每个文件：
- 读取文件内容，计算 SHA256，取前 8 位十六进制字符
- 替换表格中对应行的占位符（如 `{由 /_trace-persist 填充}`）为实际哈希值
- 如文件不存在，填 `N/A`

### Step 4：原子写入 trace 文件 + CSV 行

**强约束**：trace.md 第一行必须是 `# {完整 FEAT-ID 含 slug}: {title}`，与目录名 / CSV id 字面相等。短 ID（仅 `{TYPE}-{4hex}`）禁止——会被 `--persist-trace` 校验拒绝。

调用脚本子命令完成 ".md 写入 + CSV 行追加" 二者必同的原子操作（不再做手工分两步）：

```bash
echo "{content}" | python3 <RAY_ROOT>/scripts/ray/ --persist-trace \
  --id {FEAT-ID} \
  --source {pm|dev} \
  --module {module} \
  --component {component} \
  --title "{title}" \
  --date {YYYY-MM-DD} \
  --content-file - \
  --project-dir {project_root}
```

可选参数：`--repos`（多仓场景下分号分隔的 repo ID 串）、`--depends-on`、`--depended-by`。

行为（不可分割）：
1. 校验 `--id` 与 content 解析的 `# {ID}: {title}` heading 一致 — 不一致直接 ABORT，无任何文件副作用
2. 推导 `{2hex}` = id 的 hex 部分前 2 位（即 FEAT-ID 第 5-6 字符）
3. 原子性约束在 `trace.md` 上，不在目录上 — 目录可能已被上游 skill（如 `/research` 写竞品截图）预先创建：
   - 若 `trace.md` 已存在 → ABORT（永不覆盖）
   - 若目录不存在 → 创建
   - 若目录存在但 `trace.md` 不存在 → 直接写入，保留同目录的兄弟文件
4. 若 `index.csv` 不存在，子命令内部先 `init_csv`
5. append CSV 行：phase=`trace`、status=`confirmed`、author=`{source}`、其它字段从参数传入；file 列为 `{2hex}/{FEAT-ID}`
6. 任一步失败：仅回滚本次写入（删除新写的 `trace.md`；若目录是本次创建且为空则 rmdir），从不删除预先存在的兄弟文件

输出：JSON `{"id": "...", "path": "...", "csv_appended": true}` 或 `{"error": "..."}`，stderr 不静默吞错。

> 不使用手工的 ".md write + CSV append" 两步指令——agent 容易在两步之间跳步漏写，留下文件存在但 CSV 缺行（或反之）的半写入状态。原子子命令保证两者必同。

### Step 5：自动推送 + 收尾通知

1. **trace.md / index.csv 推送出口**：调用 `auto_commit_push(TRACE_ID, "_trace-persist", "<type> trace 落盘")`（公共协议定义见 `references/public-protocols.md`）。external/docs 模式将本次写入的 `trace.md` 与 `index.csv` 行作为单次提交推送到 `origin main`；inline 模式 no-op
2. **收尾通知**：输出确认信息，告知用户 trace 已完成、文件位置，并建议下一步命令。**不发起任何交互式确认**，用户按需自行运行

> 推送出口归属约定：`trace.md` 和 `index.csv` 由 `_trace-persist` Step 5 推送；`prd.md` 由 `/prd` 自身在第 7 步推送；`research.md` 由 `/research` 自身在第 6 步推送；`learnings/*.md` 由 `/learn` 自身推送。各自的写入路径不重叠，所以即便分别 push 也不会相互覆盖。

具体输出模板（按 external / inline 模式）详见 [references/output-templates.md](references/output-templates.md)。

---

## 公共协议（供所有 skill 使用）

`_trace-persist` 定义 3 个公共协议，供所有 skill 在入口和出口调用：

| 协议 | 调用时机 | 用途 |
|------|---------|------|
| `resolve_trace_id()` | skill 启动时 | 从参数或分支名提取当前 TRACE_ID |
| `on_skill_enter(TRACE_ID)` | skill 启动时（resolve 之后） | 对齐文档仓 `main` 的最新提交：external/docs 模式执行 `git pull --rebase origin main`；冲突 ABORT 提示用户手动解决；inline 模式直接返回 docs_root |
| `auto_commit_push(TRACE_ID, skill, summary)` | skill 写入完成后 | 统一提交并推送到 `origin main`（不切分支、不按路径分流）；inline 模式 no-op |

完整伪代码、调用者/非调用者清单、提交消息格式详见 [references/public-protocols.md](references/public-protocols.md)。

---

## 规则

1. **不做分析** — 不读组件文件，不判断影响范围
2. **不问问题** — 不向用户澄清需求内容
3. **不生成内容** — 不写场景、不写验收标准
4. **只做持久化** — 定位、编号、写文件、更新索引
5. **幂等** — 相同输入 + 相同日期产生相同 FEAT-ID（日期参与哈希）。重复调用不会创建重复文件
