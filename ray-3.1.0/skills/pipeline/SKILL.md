---
name: pipeline
description: 需求经 /propose 或 /trace 确认后，根据任务复杂度自适应执行开发流水线
---

# Pipeline — 总调度器

自治开发流水线总调度器。"确认的需求进 → 生产级代码 + 活文档出。"

<critical-rules>
- 自动判定任务级别，直接执行，不停下等确认。打印决策记录块即可
- 每次调度子 Agent 时，必须传递标准化上下文块（见 references/agent-protocol.md）
- 测试规则见 references/test-rules.md，所有 Phase 统一遵循，不重复定义
- 决策边界遵循爆炸半径分类（R1 vs R2，见下）；逻辑矛盾或 R2 动作才中断
</critical-rules>

## 决策边界（爆炸半径分类）

| 类别 | 定义 | 处理 |
|------|------|------|
| **R1 — 本地、可逆、低风险** | 分支命名、占位策略、测试策略、任务分级、Phase 转换、PM trace 补全等 | agent 自决，打印决策记录块（陈述式），不要求输入 |
| **R2 — 跨系统、共享状态、不可逆** | 创建 PR、推送远程、合并 worktree 到主线 | 始终保留显式 gate（A/B/C 选择），绝不自动执行 |

**R3 决策记录块格式**（贯穿 Phase -1、Phase 0、Phase 7）：

```
✓ Phase {N} 决策（自动）：
  · {key}：{value}（{简要理由}）
  · ...
→ 进入 Phase {N+1}
```

非阻塞——打印后立即进入下一阶段。用户若要回退，需主动中断流水线（ctrl-c）后重启。

> 协议接入：见 `_trace-persist/references/public-protocols.md`（resolve_trace_id / on_skill_enter / auto_commit_push）

## 模式检查

> 命令中 `<RAY_ROOT>` = 提示头部 `Base directory for this skill:` 路径剥掉末尾 `/skills/<name>`（例 `/.../ray/3.1.0/skills/pipeline` → `/.../ray/3.1.0`）；勿原样传 shell。

运行脚本获取模式（不要自己判断，用脚本结果）：

```bash
python3 <RAY_ROOT>/scripts/ray/ --resolve-docs-root --json
```

输出 `{"docs_root": "...", "mode": "external|docs|inline"}` / `{"error": "..."}` / `{"need_user_decision": true, "context": "...", "options": [...]}`.

<HARD-GATE>
若 `mode == "docs"` → 拒绝：'流水线必须有代码上下文。请 cd 到对应代码仓后重试。' 立即停止，不执行任何后续步骤。

若返回含 `need_user_decision: true` → 向用户呈现 `context` 与 `options`（a/b/c），等待选择后据此重试 / 切模式 / 中止；不静默忽略。详见 `_trace-persist/references/public-protocols.md` "自动挂载失败交互"段。

> 注：docs 模式下 architect/qa 也统一 HARD-reject（与 pipeline 一致），文档仓不存放代码侧产物（合约文件、类型定义、测试代码、test-plan.md）。docs-allow 类 skill 仅限：origin / digest / migrate / query / post-trace / propose / prd。
</HARD-GATE>

## 任务分级

<task-levels>

| 级别 | 触发条件 | 执行 Phase | 跳过 |
|------|---------|-----------|------|
| **PATCH** | bug 修复、样式调整、≤ 5 文件、无新 API/状态 | 0 → 4 → 5(轻量) → 6 → 7 | 1, 2, 3 |
| **FEATURE** | 新功能、新 API、新组件、新状态机 | 0 → 1? → 2 → 3 → 4 → 5 → 6 → 7 | 无 |
| **REFACTOR** | 结构变更、不改行为、迁移 | 0 → 4 → 5(轻量) → 6 → 7 | 1, 2, 3 |

</task-levels>

## 执行流程

### Phase -1：环境隔离（仅 --worktree 参数时）

**默认行为**：在当前分支直接工作，不新建分支、不建 worktree。

**仅当 `--worktree`**：基于 main 创建 worktree + 功能分支 → 安装依赖 → 激活 `/guard` → 打印分支名后继续。

### Phase 0：加载上下文 + 分级

1. **解析 TRACE_ID 与定位 docs_root**：
   - 调用 `resolve_trace_id()`（定义在 `/_trace-persist` 公共协议）获取当前 TRACE_ID
   - 调用 `on_skill_enter(TRACE_ID)`（定义在 `/_trace-persist` 公共协议）拿到 `docs_root`。**该协议仅返回路径，不做任何分支操作**——文档通过目录隔离（`{docs_root}/traces/{2hex}/{TRACE_ID}/`）即可，不依赖 git 分支
2. **git 同步（pipeline 自有步骤，与公共协议解耦）**：
   - 仅当 `--worktree` 已新建分支或用户已显式切到工作分支时执行。默认在当前分支工作（与 Phase -1 一致）
   - 如需同步远端：由 pipeline 自己显式 `git pull --rebase`；失败则报告冲突并中止，不静默继续
   - 不要把分支 checkout / pull / rebase 与 `on_skill_enter` 绑定——后者是只读的协议入口
3. 从 `{docs_root}/traces/{2hex}/{TRACE_ID}/trace.md` 读取已确认的需求
4. **PM 模式检测**：如文档头部含 `> source: pm`（由 `/propose` 创建），执行技术补充：
   - 读受影响模块的组件文件（交互表、状态机、不变式）
   - 填充 trace 中所有"待补充"的技术章节：当前产品状态 — 技术视图、受影响的组件、不变式影响、模式、API 交互、治理合规研发补充、产品地图更新要求
   - 把 `> source: pm` 改为 `> source: dev`，并在 `> completeness: full` 行标记补全完成
   - CSV `component` 列在下方步骤 9 统一回填（不在此处处理）
   - 打印 diff 摘要（≤20 行）后立即继续，不要求确认
5. 读 `CLAUDE.md` 获取项目约定
6. 若产品文档网络存在：读 `{docs_root}/product/PRODUCT-MAP.md` → `modules/{module}/index.md` → `modules/{module}/{ComponentName}.md`
7. **识别受影响组件的模板级别**（轻量/标准/完整）— 从组件文件读取。级别信息将传递给下游 skill。读组件的 `## 关系` 表了解依赖影响范围。
8. **确定任务级别**（PATCH / FEATURE / REFACTOR），按 R3 决策记录块格式打印（不要求确认）：
   ```
   ✓ Phase 0 决策（自动）：
     · 级别：PATCH（bug 修复，≤ 5 文件，无新 API）
     · 受影响组件：{ComponentName}（完整级）
     · 分支：保持当前（默认）/ {trace-prefix}（仅 --worktree 时基于 main 新建）
     · 跳过：合约架构、预写测试
     · 执行路径：直接实现 → 跑现有测试 → 轻量审计 → 知识沉淀
   → 进入 Phase 4
   ```
   非阻塞：打印后立即进入下一阶段。用户若需调整需主动中断流水线。
9. **回填 CSV `component` 列**（Phase 0 末尾、Phase 1 开始前统一执行）：
   - 目标文件 = `{docs_root}/traces/index.csv`（**不是** `archive.csv`，**不是** `files.csv`）
   - 在该 CSV 中按 `id == TRACE_ID` 定位本 trace 所在行
   - **触发条件**：该行 `component` 列为空
   - **解析来源**：当前 trace 文档（`{docs_root}/traces/{2hex}/{TRACE_ID}/trace.md`）的 `## 受影响的组件` 章节
     - 单一组件名 → 写入该列
     - 多组件 → 用分号 `;` 分隔（与 `depends_on` / `depended_by` 列格式一致）
     - 解析不出（trace 跨多模块 / 无标准组件名 / `PRODUCT-MAP.md` 无该组件）→ 输出 `WARN`，跳过，**不阻塞 Phase 1+**
   - 若该列已非空 → 直接跳过（不覆盖已有值）
   - 若发生回填，立即调用 `auto_commit_push(TRACE_ID, "pipeline", "backfill component")` 落盘（`/_trace-persist` 公共协议）
10. 展示当前 trace 概要（id / type / module / component / 任务级别）后继续 Phase 1

**Phase 0.5**：FEATURE + 非 inline 模式时，执行多角色 DAG 调度。详见 references/dag-scheduling.md。

### Phase 1：Spike（可选，仅 FEATURE）

触发条件：需求涉及探索性或未知 API/行为。最小概念验证（最多 20 行）→ 测试假设 → 删除 → 将发现输入 Phase 2。

### Phase 2：合约架构（仅 FEATURE）

调度 `/architect`（按 references/agent-protocol.md 传递上下文）。
- 产出：`{docs_root}/specs/{module}/{Component}.spec.md`（per-组件长期演进，同一组件多条 trace 共用一份）+ 项目源码中的类型文件
- 完整级组件：spec 须包含不变式、状态机定义、故障旅程
- 验证两个产出都存在

### Phase 3：测试生成（仅 FEATURE）

调度 `/qa`，传递 spec + 类型文件路径。
- 产出：测试文件 + mock 文件
- 验证 RED：只跑 1 次确认失败即可，最多 2 次

### Phase 4：实现

**PATCH/REFACTOR**：直接在当前 Agent 中实现。修改后跑一次受影响测试，失败则修复（最多 3 轮）。

**FEATURE**：调度 `/coder`，传递 spec + 测试文件路径。coder 自愈循环（最多 10 轮，或连续 5 次同类错误提前中止）。每轮只跑相关测试，全部通过后全量跑一次。每轮上下文用 `last_diff` + `error_tail` 增量化，连续 2 轮同测试失败 → 当轮回退一次完整加载（详见 `coder/references/self-healing-loop.md`）。

coder 返回 `status: stuck` 时：读取根因报告 `{docs_root}/traces/{2hex}/{TRACE_ID}/STUCK.md`，**展示假设、建议路径、artifact 位置后直接中止**。

### Phase 5：质量审计

**所有级别**：调度 `/audit`，传递 spec（如有）+ 测试文件 + coder 迭代次数 + `audit_mode`：
- **PATCH/REFACTOR**：`audit_mode=light`，4 维评分（需求一致性 25 / 安全 20 / 测试通过 25 / 不变式保持 30），>= 80 通过；HARD-GATE 仍触发硬拒
- **FEATURE**：`audit_mode=full`，7 维评分，>= 80 通过，60-79 软拒（自动重试 1 次；第 2 次仍软拒则**直接产出报告并中止**，不升级用户），< 60 硬拒

两种模式都产出 `{docs_root}/traces/{2hex}/{TRACE_ID}/audit.md`（与 trace.md 同目录），使 ship HARD-GATE 自然命中。light 模式跳过的维度必须在文件中显式列出 `skipped due to audit_mode=light`。

### Phase 6：知识沉淀

**所有级别都执行**：
- 调度 `/update-map`，传递 coder 迭代次数 + 审计得分 + 所有 artifacts；update-map 仅完成 CSV 索引 + trace ADR + 技术债登记
- 产品手册（`{docs_root}/product/`）的同步延后到 `/digest`（或 `ship --finalize` 自动触发的 digest）；Phase 6 不阻塞产品手册更新

### Phase 7：报告 + 发布

从内存中收集本次运行的阶段摘要，向用户呈现结构化报告：

```
## Pipeline 完成报告
**FEAT-ID**: {FEAT-ID} | **级别**: {PATCH|FEATURE|REFACTOR} | **耗时**: {时间}

| Phase | Skill | 决策 | 产出 |
|-------|-------|------|------|
| ... | ... | ... | ... |

Coder 迭代: {N} | 审计得分: {score}/100 | 产出文件: {count}
```

报告打印后**静默结束**，不引导下一步。用户要发布会主动运行 `/ship`。

### Phase 8：Worktree 收尾（仅 worktree 模式）

解除 `/guard`。

**软链接清理（在 A/B/C 选择前统一执行）**：检查 `{cwd}/.ray/docs`：
- `os.path.islink(".ray/docs")` 为 True → `os.unlink(".ray/docs")`，仅删链接本身，绝不递归删除目标（指向主仓 `.ray/docs/`）
- 不是软链接（实文件 / 不存在）→ WARN 提示用户手动检查，不阻塞收尾
- ABORT 流程也执行此清理（防遗留）

随后向用户确认处置：A) 合并到 main 并清理 B) 创建 PR（保留 worktree）C) 仅保留。**绝不自动合并或推送**。

---

## 错误处理

| 情况 | 动作 |
|------|------|
| 任务级别判断有疑问 | 按最佳判断自动选择，打印决策记录。用户可中断纠正 |
| Coder 卡住（> 10 轮或 5 次同类错误） | 读根因报告，展示假设、建议路径、artifact 位置后**直接中止**；不打断求决策 |
| 测试超时 / OOM | 缩小测试范围（单文件），报告资源问题 |
| 审计两次软拒 | **直接产出报告并中止**；不再升级用户 |
| 逻辑矛盾 | 中止，请用户澄清需求（R2 类——需求层冲突，不可自决） |

## 并发规则

- Phase 2（FEATURE，多角色 DAG）：UI Agent + BE Agent = 并行
- Phase 3（FEATURE）：前端 QA + 后端 QA = 并行
- Phase 4（FEATURE）：前端 Coder + 后端 Coder = 并行
- 其余：顺序执行
