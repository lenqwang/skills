---
home_skill: _trace-persist
purpose: 三个公共协议（resolve_trace_id / on_skill_enter / auto_commit_push），供所有 skill 在入口和出口调用
consumers: pipeline, architect, qa, coder, audit, update-map, ship, digest
---

# _trace-persist — 公共协议

以下三个协议由 `_trace-persist` 定义，供所有 skill 在入口和出口调用。跨 skill 引用时保留"主归属 skill = _trace-persist"。

---

## resolve_docs_root()

检测当前仓库类型，返回 `(docs_root, mode)`。所有 skill 在模式检查时调用。**配置存在但 `.ray/docs/` 未挂载时自动挂载**——优先选择"主仓 `.ray/docs/` 软链接"（worktree 场景零网络消耗），不可用时退化为 `git clone`。把 external 模式下的"配置 → 挂载"映射在协议层做成幂等的，不让上层 skill 反问用户。

```
resolve_docs_root():
    # 优先级 0：external 自动挂载（双路径） — .ray/config.yaml 存在但 .ray/docs/ 缺失
    #
    # 0a (worktree 软链接，首选)：当前 cwd 是 worktree（`git rev-parse --git-common-dir`
    #     返回绝对路径而非 ".git"）+ 主仓 `.ray/docs/` 存在
    #     → ln -s {main_repo}/.ray/docs {cwd}/.ray/docs
    #
    # 0b (clone fallback)：上述任一不满足时，从 `.ray/config.yaml` 读 docs_url
    #     → git clone {docs_url} .ray/docs/
    #
    # 触发前置：.ray/config.yaml 必须含 docs_url 字段；缺失则 fall through 到优先级 1+
    # （inline 仓即使误存 config.yaml 也不会误挂载）
    #
    # 失败处理：0a 软链接失败 / 0b clone 失败均不报死错——输出 need_user_decision JSON
    # 由 agent 层 prompt 用户三选项（详见下方"自动挂载失败交互"段）
    if exists(".ray/config.yaml") and not exists(".ray/docs/"):
        docs_url = parse_yaml_docs_url(".ray/config.yaml")
        if docs_url is None:
            # 缺 docs_url → 不视为 external 候选，落入优先级 1+
            pass
        else:
            main_repo = detect_worktree_main_repo()  # None if not a worktree
            use_symlink = main_repo is not None and exists("{main_repo}/.ray/docs/")

            if use_symlink:
                # 0a
                try:
                    os.symlink("{main_repo}/.ray/docs", ".ray/docs")
                except OSError as e:
                    return need_user_decision(
                        context = "软链接失败：{e}\n主仓: {main_repo}\n目标: .ray/docs",
                        options = [a) 重试  b) 改用 git clone（0b fallback）  c) 中止]
                    )
            else:
                # 0b
                exit_code, stderr = run("git clone {docs_url} .ray/docs/")
                if exit_code != 0:
                    return need_user_decision(
                        context = "git clone 失败：{stderr}\ndocs_url: {docs_url}"
                                  + (Permission denied 时附 SSH key 检查提示),
                        options = [a) 重试  b) 改用 inline 模式（如本仓内有 docs/）  c) 中止]
                    )
            # 0a / 0b 成功后 fall through 到优先级 1

    # 优先级 1：external 模式 — 存在 .ray/docs 子模块
    #
    #   1a (有效)：真目录或软链接指向有效目录 → 返回 external
    #   1b (broken symlink)：链接存在但目标不存在 → 询问用户
    #     （挂载层不悄悄透传 mode=external，下游读会失败）
    if is_dir(".ray/docs"):  # 跟随软链接；真目录或有效链接
        return (".ray/docs", "external")
    if is_symlink(".ray/docs"):  # 1b
        return need_user_decision(
            context = ".ray/docs 是软链接但指向无效目标：{readlink}\n"
                      "主仓 .ray/docs/ 可能已迁移 / 被删，或 worktree 与主仓路径漂移。",
            options = [a) 重试（修复主仓 .ray/docs/ 后重跑）
                       b) 删除本地软链接，下次解析走 0b clone
                       c) 中止]
        )

    # 优先级 2：docs 模式 — 根级 product/ 目录，且无 docs/ 子目录、无 src/、无 package.json
    #   docs 仓的特征：product/PRODUCT-MAP.md 在根目录，没有源代码
    if exists("product/PRODUCT-MAP.md") and not exists("docs/"):
        return (".", "docs")

    # 优先级 3：inline 模式 — docs/ 子目录内有产品文档
    if exists("docs/product/PRODUCT-MAP.md") or exists("docs/traces/index.csv"):
        return ("docs", "inline")

    # 优先级 4：无法判断
    error "无法确定文档根路径，建议运行 /origin 初始化"
```

**关键判定特征**：
- `external` 自动挂载（优先级 0）：`.ray/config.yaml` 含 `docs_url` 但 `.ray/docs/` 不存在 → 协议层走 0a 软链接（worktree 场景）或 0b clone（其他场景），完成后落入优先级 1。多次调用对 `.ray/docs/` 状态收敛（幂等）；失败不静默回退、不立即报错——发出 `need_user_decision` JSON 由 agent 层询问用户
- `external` 模式（1a）：`.ray/docs/` 是真目录或**指向有效目录**的软链接 → 返回 external
- broken symlink（1b）：`.ray/docs` 存在但 readlink 目标失效 → 不返回 mode，发出 `need_user_decision`（agent 层路由到修复 / 删链接 / 中止）
- `docs` 模式：`product/` 在仓库根目录（不在 `docs/` 下），且仓库内无源代码（无 `src/`、无 `package.json`）
- `inline` 模式：`docs/product/` 或 `docs/traces/index.csv` 存在

**自动挂载约束**：
- 仅做"挂载"（symlink / clone），不做远端写入；push 仍走 `auto_commit_push` 与 `/ship` 显式路径
- 0a 软链接零网络消耗、双向实时共享主仓本地未 push 的 commit；worktree 场景首选
- 0b `git clone` 默认完整 clone（与 `/origin --connect` 行为一致）
- 跨平台：0a 在 macOS / Linux 上工作；Windows fallback 到 0b
- inline 仓即使误存 `.ray/config.yaml` 但**无 docs_url 字段**时不触发挂载（priority 0 不命中，落入 priority 3）

**自动挂载失败交互（need_user_decision 协议）**：

resolve_docs_root 返回三种结果之一：
1. 成功：`{"docs_root": str, "mode": "external|docs|inline"}`
2. 不可恢复错误（priority 4）：`{"error": str}`
3. 需要用户决策：`{"need_user_decision": true, "context": str, "options": [{"key": "a|b|c", "label": str}, ...]}`

`need_user_decision` 触发场景（共 3 类）：
- **0a 软链接创建失败**（OSError，例：权限 / FS 不支持）— options：a 重试 / b 改 0b clone / c 中止
- **0b clone 失败**（exit ≠ 0，例：鉴权 / URL 不可达）— options：a 重试 / b 改用 inline 模式（如本仓内有 docs/）/ c 中止；stderr 含 `Permission denied` 时附 SSH key 提示，含 `Authentication failed | could not read Username|Password | unable to access` 时附 HTTPS credential helper 提示
- **priority 1b broken symlink**（`.ray/docs` 是符号链接但目标不存在）— options：a 重试（修复主仓后重跑）/ b 删除本地软链接走 0b clone / c 中止

caller 责任：所有调用 resolve_docs_root 的 skill / preflight wrapper 必须识别 `need_user_decision` 字段，由 agent 层向用户呈现 context + options 后路由用户选择。caller 不得把 `need_user_decision` 当成普通 error 静默忽略。

---

## resolve_trace_id()

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

    # 优先级 3：交互式询问
    ask 用户输入 TRACE_ID
```

**约定**：工程师建代码分支时命名包含 TRACE_ID，如 `feat/login-FEAT-a3f7`。不再使用 `.ray/current-trace` 文件。

---

## on_skill_enter(TRACE_ID)

对齐文档仓 `main` 的最新远端提交，再返回 docs_root。**不切分支、不创建分支**——文档通过目录隔离（`docs/traces/{2hex}/{TRACE_ID}/`），所有 ray 写入只在 `main` 上提交。

```
on_skill_enter(TRACE_ID):
    (docs_root, mode) = resolve_docs_root()

    # inline 模式不做远端同步（单仓，用户自管 git）
    if mode == "inline":
        return docs_root

    # external / docs 模式：与 origin/main 对齐
    git -C {docs_root} fetch origin main
    git -C {docs_root} pull --rebase origin main
    if 冲突:
        ABORT "文档仓与 origin/main 冲突，请 cd {docs_root} 解决冲突或 reset 后重试"

    return docs_root
```

**冲突即 ABORT**：rebase 冲突不静默 fallback——直接报错并提示用户手动 `cd {docs_root}` 解决（resolve 或 `git rebase --abort`）后重新触发 skill。这避免本地分歧的提交被偷偷 reset 或丢失。

---

## auto_commit_push(TRACE_ID, skill_name, summary)

所有对文档仓的写入完成后调用此协议，统一提交并推送到 `origin main`。**不切分支、不按路径分流**——traces / contracts / product 全部走同一出口推送 main。

```
auto_commit_push(TRACE_ID, skill_name, summary):
    (docs_root, mode) = resolve_docs_root()

    # inline 模式不自动 push（单仓，用户自己管 git）
    if mode == "inline":
        return

    # 诊断：把"非本次 trace 路径的残留"列入 commit body（前次 skill 漏 push 的痕迹）
    # 必须过滤本次 trace 自己的写入——否则本次写入会被误标为 carried-over
    # TRACE_ID 在不同入口形态不同：
    #   - --generate-id 输出 "{TYPE}-{4hex}-{slug}"（含 slug）
    #   - resolve_trace_id 从分支名抽取仅 "{TYPE}-{4hex}"（无 slug）
    # 实际目录始终是 traces/{bucket}/{TYPE}-{4hex}-{slug}/，所以前缀匹配**不带尾斜杠**：
    #   - 含 slug：own_prefix = "traces/{bucket}/{TYPE}-{4hex}-{slug}" 完全匹配
    #   - 不含 slug：own_prefix = "traces/{bucket}/{TYPE}-{4hex}" 前缀匹配到含 slug 的实际路径
    # 由于 4hex 在桶内唯一，prefix-without-slash 不会误命中其他 trace
    porcelain = $(git -C {docs_root} status --porcelain)
    bucket = TRACE_ID 中匹配 /-([0-9a-f]{4})/ 的 4hex 段前 2 位
    own_prefix = "traces/{bucket}/{TRACE_ID}"   # 注意：不带尾斜杠
    leftover_paths = porcelain 中**不以** own_prefix 开头的行（取每行的路径列）
    # 注：origin / migrate / digest 等 TRACE_ID 为字面量（如 "origin-init"）的场景，
    # 4hex 段不存在 → bucket 不可解析 → own_prefix 不会命中实际路径，
    # 此时所有写入都进入 leftover_paths（语义合理：origin 类批量写入本就跨多路径，
    # 用 bookkeeping 段记录全量是预期行为）

    # 提交消息格式（固定，便于与人类 commit 区分）
    message = "[ray] {skill_name} {TRACE_ID}: {summary}\n\nrepo: {repo_id | 'docs'}\ntrace: {TRACE_ID}"
    if leftover_paths 非空:
        message += "\n\nbookkeeping (carried-over):\n{leftover_paths}"

    git -C {docs_root} add -A
    git -C {docs_root} commit -m "{message}"
    git -C {docs_root} push origin main

    # push 失败重试
    if push 非 fast-forward:
        git -C {docs_root} pull --rebase origin main
        git -C {docs_root} push origin main         # 重试一次
    if 仍失败（rebase 冲突 / 二次 push 仍非 fast-forward / 网络持续不可达）:
        # ABORT：不强推、不 hard reset、不静默回滚——所有自动恢复都有数据丢失风险
        # 本地 commit 已生成（保留），仅 push 缺失；后续可手动恢复
        ABORT 并输出：
          "ERROR: push 到 origin/main 失败两次。
           docs_root：{docs_root}
           本次提交已落入本地（未 push）：{git -C {docs_root} log -1 --oneline}
           请 cd {docs_root} 手动检查后 git push origin main，
           或 git reset --soft HEAD~1 撤回本地 commit 重做。
           不执行任何强推 / hard reset，避免数据丢失。"
```

**诊断字段（bookkeeping）**：检测 `git status --porcelain` 后**过滤掉本次 trace 路径前缀** `traces/{bucket}/{TRACE_ID}`（不带尾斜杠，兼容 TRACE_ID 含 / 不含 slug 两种形态）——剩余即"前次 skill 漏 push 的残留"，原样列入 commit message body 的 `bookkeeping (carried-over):` 段，便于事后定位是哪个 skill 漏调用。**不阻断**——协议是"看到啥推啥"，诊断是事后追溯辅助。

> 过滤是关键步骤：若不过滤，本次写入会被误标为 carried-over。`auto_commit_push` 通常在 skill 写入完成后调用，此时 working tree 同时含本次写入与上次残留，必须按 TRACE_ID 路径区分。前缀**不带尾斜杠**至关重要——`resolve_trace_id` 从分支名抽取的 TRACE_ID 不含 slug，但实际目录含 slug；尾斜杠会让无 slug 的 TRACE_ID 与含 slug 的目录路径不匹配，过滤失效。

**只在 main 操作**：所有 ray skill 对文档仓的写入仅在 main 分支提交并推送，不切 `ray/*` 子分支。文档隔离靠目录（`{docs_root}/traces/{2hex}/{TRACE_ID}/`），不靠分支。

**推送出口归属**：每个产物由其写入方负责一次 `auto_commit_push`，互不重叠：
- `trace.md` / `index.csv` → `_trace-persist` Step 5（被 `/propose`、`/trace`、`/post-trace` 触发）
- `prd.md` → `/prd` 自身（第 7 步）
- `research.md` + competitive-screenshots → `/research` 自身（第 6 步）
- `learnings/*.md` → `/learn` 自身
- 流水线类 skill（`architect` / `qa` / `coder` / `audit` / `update-map` / `digest` / `migrate` / `ship`）写入完成后各自调用一次

`trace.md` 头部翻转（`/trace` 补全模式 source pm→dev）由 `/trace` 单独触发一次（不经 _trace-persist，需要单独提交）。

**提交消息示例**：

```
[ray] coder FEAT-a3f7: 实现登录 API

repo: srv-user
trace: FEAT-a3f7
```
