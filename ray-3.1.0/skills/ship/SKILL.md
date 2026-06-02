---
name: ship
description: 审计通过后，自动创建 PR/MR、生成 changelog、展示审查就绪看板，完成从代码到可 review 状态的最后一公里
---

# Ship — 发布 Agent

你是流水线的最后一公里。职责：将通过审计的代码打包成一个可 review 的 PR/MR，附带完整的变更记录和审查历史。

<critical-rules>
- `/ship` 是非交互的——用户说 ship 就全自动跑，不打断用户做确认
- 绝不自动合并——只创建 PR，合并是人的决定
- 绝不推送到 main/master——推送前确认分支
- 不修改源码——ship 只读代码，不改代码
- 幂等——重复运行时，如 PR 已存在则更新而非新建
</critical-rules>

> 协议接入：见 `_trace-persist/references/public-protocols.md`（resolve_trace_id / on_skill_enter / auto_commit_push）

## 模式检查

调用 `resolve_docs_root()` 获取 `(docs_root, mode)`。

- **docs 模式**：部分允许。--finalize 和 --abandon 允许；普通 /ship（创建代码 PR）拒绝
- **external / inline 模式**：正常执行

## 前置检查

<HARD-GATE>
ship 前必须确认：
1. 当前在功能分支上（不在 main/master）
2. 所有测试通过（读最近的测试输出或重新跑一次）
3. 工作区干净或所有变更已 commit

任何一项不满足 → 停止并告知用户原因。

**软门（审计）**：
- 若 `{docs_root}/traces/{2hex}/{TRACE_ID}/audit.md` 存在 → 校验得分 >= 80，不达标硬拒
- 若文件不存在 → 输出 WARN「未跑 /audit，建议补跑或在 PR 描述中说明」，**不阻塞 ship**；PR body 显眼位置标注 `audit: skipped`
- 安全规则不软化：审计若运行，HARD-GATE 项（不变式违反 / OWASP 高危 / AI 护栏缺失）仍硬拒
</HARD-GATE>

## 流程

### Step 0：基线分支检测

不要假设默认分支为 `main`。按以下顺序检测，第一个成功的结果作为 `{base}`，供后续步骤替换占位：

```bash
# 1) origin/HEAD 符号引用（最权威）
base=$(git symbolic-ref --short refs/remotes/origin/HEAD 2>/dev/null | sed 's@^origin/@@')

# 2) origin/main
[ -z "$base" ] && git show-ref --verify --quiet refs/remotes/origin/main && base=main

# 3) origin/master
[ -z "$base" ] && git show-ref --verify --quiet refs/remotes/origin/master && base=master

# 4) merge-base 兜底（取与当前分支最近共同祖先所在的远程分支名；找不到则提示用户）
[ -z "$base" ] && base=$(git for-each-ref --format='%(refname:short)' refs/remotes/origin \
  | xargs -I{} git merge-base --is-ancestor {} HEAD 2>/dev/null && echo "{}" | head -n1 | sed 's@^origin/@@')
```

检测失败 → 输出 `WARN: 无法自动检测基线分支`，提示用户传入 `--base=<branch>` 后中止。
检测结果作为 `{base}` 占位贯穿 Step 1 ~ Step 6。

### Step 1：收集上下文

并行读取：
- `{docs_root}/traces/{2hex}/{TRACE_ID}/trace.md` — 需求（标题、场景、验收标准）
- `{docs_root}/traces/{2hex}/{TRACE_ID}/audit.md` — 审计报告（得分、发现的问题、技术债）；**文件不存在时跳过**，记 `audit_status = skipped`
- `git log {base}..HEAD --oneline` — 本分支相对基线的所有 commit（`{base}` 来自 Step 0）

### Step 2：生成 Changelog 条目

从 trace 和 commit 历史提取变更，按类别分组。格式和规则详见 references/pr-body-template.md。

### Step 3：审查就绪看板

遍历 `{docs_root}/traces/**/audit.md`，聚合该模块的历史审计状态（同模块的 trace 由 CSV `index.csv.component` 列与 `module` 列识别）。模板详见 references/pr-body-template.md。

### Step 4：检测平台 + 推送

```bash
git remote get-url origin 2>/dev/null
```

- 含 `github.com` → GitHub（用 gh CLI）
- 含 `gitlab` → GitLab（用 glab CLI）
- 其他 → 只推送，不创建 PR

推送：`git push -u origin {branch-name}`

### Step 5：创建 PR/MR

GitHub：`gh pr create --title "{TRACE_ID}: {功能名称}" --body-file /tmp/ray-pr-body.md`
GitLab：`glab mr create --title "{TRACE_ID}: {功能名称}" --description "$(cat /tmp/ray-pr-body.md)"`

PR body 模板和规则详见 references/pr-body-template.md。

### Step 5.5：docs 仓出口兜底（强制，非可选）

ship 是流水线最后一公里，出口必须保证 docs 仓 working tree 干净——即使 ship 自身未写入 docs，也要兜底吞下上游 skill（update-map / digest / 等）漏掉的活文档变更。

```bash
(docs_root, mode) = resolve_docs_root()

# inline 模式：no-op（用户自管 docs/ 内的 git）
if mode == "inline":
    跳过此 Step

# external / docs 模式：强制兜底
status=$(git -C {docs_root} status --porcelain)
if [ -z "$status" ]:
    跳过 commit，直接进入 Step 6（工作区已干净）
else:
    # 判定 summary：本次 trace 产物 vs 仅 bookkeeping
    if 变更路径含 traces/{2hex}/{TRACE_ID}/ 或 product/modules/{module}/:
        summary = "兜底推送活文档 — {功能名称}"
    else:
        summary = "bookkeeping"  # 非本次 trace 相关的遗留
    auto_commit_push(TRACE_ID, "ship", summary)
```

**错误处理**：
- push 非 fast-forward → 协议层 `pull --rebase` 后重试一次；仍失败 → ABORT，输出 `ERROR: docs 仓 push 失败，code 仓 PR 已创建（{PR URL}）；请 cd {docs_root} && git status 手动解决`，**code 仓 PR 不回滚**
- rebase 冲突 → ABORT，提示用户手动 resolve 或 `git rebase --abort` 后重新 ship

**兜底约定**：docs 仓内一切由 ray 治理——若检测到非 ray-managed 路径（如 `{docs_root}/scratch.md`），仍 `git add -A` 兜底，约定优先于推断。

### Step 6：报告

```
✅ PR 已创建：{PR URL}

- 分支：{branch} → {base}
- Changelog：{N} 条变更记录
- 审计得分：{score}/100
- 技术债：{N} 项未解决
```

## 生命周期命令

`/ship --finalize` — 分支生命周期收尾（合并文档 PR、归档 trace、清理分支）。
`/ship --abandon` — 放弃当前 trace，清理关联分支和 PR。

完整流程详见 references/lifecycle-commands.md。

## 非交互原则

`/ship` 只在以下情况停：
- 前置检查失败
- git push 失败（权限、冲突）
- PR 创建失败（CLI 未安装、未认证）

其他问题自动做最佳决策，不打断用户。

<rules>
1. **不修改源码** — ship 只读代码，不改代码
2. **产品语言写 changelog** — "用户现在可以…" 而非 "重构了…"
3. **审查就绪看板从文件聚合** — 不猜测，只从 `{docs_root}/traces/**/audit.md` 读取
4. **绝不自动合并** — 只创建 PR，合并是人的决定
5. **推送前确认分支** — 绝不推送到 main/master
6. **CLI 检测** — gh/glab 不可用时，只推送代码，提示用户手动创建 PR
7. **幂等** — 重复运行时，如 PR 已存在则更新而非新建
8. **出口工作区干净** — external/docs 模式下 ship 完成时 `git -C {docs_root} status --porcelain` 必须输出为空（Step 5.5 强制兜底）；inline 模式 no-op
9. **协议接入≠流程步骤** — SKILL.md 顶部协议接入声明仅是"承诺要做"，必须在 Step 0-N 流程中显式落成步骤；agent 在长上下文中只跟编号步骤
</rules>

<example>
## 标准 /ship 执行示例

用户运行 `/ship`，当前分支 feat/FEAT-a3f7-trade-panel。

```
[前置检查] 功能分支 ✓ 测试通过 ✓ 审计 88/100 ✓ 工作区干净 ✓
[Step 0] 基线分支检测：origin/HEAD → main（{base}=main）
[Step 1] 读取 trace + audit + git log {base}..HEAD
[Step 2] 生成 Changelog：3 条 Added, 1 条 Changed
[Step 3] 审查就绪看板：88/100 通过，模块历史 3 次审计
[Step 4] 检测 GitHub → git push -u origin feat/FEAT-a3f7-trade-panel
[Step 5] gh pr create --title "FEAT-a3f7: 交易面板" --body-file /tmp/ray-pr-body.md

✅ PR 已创建：https://github.com/org/repo/pull/42

- 分支：feat/FEAT-a3f7-trade-panel → {base}
- Changelog：4 条变更记录
- 审计得分：88/100
- 技术债：1 项未解决
```
</example>
