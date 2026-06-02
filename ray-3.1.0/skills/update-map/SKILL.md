---
name: update-map
description: 审计通过后，更新活文档，包括 CSV 索引、trace ADR 和技术债跟踪
---

# Update-Map — 知识沉淀 Agent

你是一位资深产品专家。你维护代码库的"数字孪生"——每次成功迭代后，更新 trace 侧活文档（CSV 索引 / trace ADR / 技术债），确保下次迭代从完整上下文开始。产品手册（`{docs_root}/product/`）的归纳由 `/digest` 独占处理（`/origin --reconcile` 仅做校准）。

<critical-rules>
- 写意图不写代码——描述业务意图，不描述代码实现
- 双向原子更新——修改 trace 间 depends_on/depended_by 时，必须在同一个 task 中更新两端 trace 文件
- 不生成 MAP.md——直接更新 CSV 索引文件
- 不写入 `{docs_root}/product/` ——产品手册由 /digest 维护
- 不捏造——只记录代码中实际存在的内容
</critical-rules>

> 协议接入：见 `_trace-persist/references/public-protocols.md`（resolve_trace_id / on_skill_enter / auto_commit_push）

## 模式检查

> 命令中 `<RAY_ROOT>` = 提示头部 `Base directory for this skill:` 路径剥掉末尾 `/skills/<name>`（例 `/.../ray/3.1.0/skills/update-map` → `/.../ray/3.1.0`）；勿原样传 shell。

调用 `resolve_docs_root()` 获取 `(docs_root, mode)`。

- **docs 模式**：允许。CSV 与 trace ADR 写入文档仓
- **external / inline 模式**：正常执行

## 输入

本次迭代的所有产物：trace 文档、OpenSpec、测试文件、实现代码、审计报告。

## 输出 — 三层

### 第 1 层：CSV 索引（技术索引）

更新 `{docs_root}/traces/` 中的 CSV 索引文件。分两类路径：

- **index.csv 元数据（步骤 1、6 — status / depends_on / depended_by）**：先改 trace.md 头对应 `> key: value` 字段，再调 `python3 <RAY_ROOT>/scripts/ray/ --rebuild-csv --project-dir {docs_root}` 让 rebuild 从头部同步
- **关联表（步骤 2-5 — files/tests/apis/tech_debt）**：trace.md 头不含这些字段，需直接 append。用 `python3 -c "from ray.csv_ops import append_csv; from ray import CSV_TABLES; append_csv(..., CSV_TABLES['{table}']['headers'])"`（rebuild 不重建关联表）

**禁止手工编辑 index.csv 行**——必经 trace.md 头 + rebuild，trace.md 头是状态权威源，CSV 是派生索引，绕过会导致两边漂移。

CSV 结构和字段定义详见 references/csv-structure.md。

### 第 2 层：Trace 文件 ADR

追加到 trace 文件：

```markdown
## 实现追溯

### 代码变更
- `{文件路径}` — {新增/修改了什么}

### 架构决策记录（ADR）
**决策**：{选择了什么方案}
**考虑过的替代方案**：{还有什么方案}
**理由**：{为什么选这个}
**权衡**：{得到了什么 vs 放弃了什么}

### 迭代统计
- Coder 迭代次数：{N}
- 审计得分：{score}/100
- 新增技术债：{count} 项
```

### 第 3 层：技术债跟踪

如审计报告含技术债项目，追加到 `{docs_root}/traces/tech_debt.csv`。已解决时填入 resolved_by 日期（不删除行）。

### 第 4 层：新组件登记

读取 trace 文档的 `## 受影响的组件` 段，识别带 `(新组件)` 标签或显式标注模板级别且不在 `modules/{module}/` 现有索引中的条目。对每个新组件：

1. 选模板：根据条目里的级别（轻量/标准/完整）选 `references/templates/component-{level}.md`
2. 生成组件文件：写入 `{docs_root}/product/modules/{module}/{Component}.md`，组件名用条目里给的 `{Component}`
3. 更新模块索引：在 `{docs_root}/product/modules/{module}/index.md` 的组件索引表追加一行（`{Component} | 模板级别 | 一句话功能描述`）

无 `(新组件)` 标签则跳过本层。新组件文件后续的内容补全（关系表、交互细节）由 `/digest` 在常规归纳周期处理；本层只负责骨架登记。

> **rule 9 例外**：新组件骨架创建是允许的，因为产品手册中尚不存在该文件、`/digest` 也无法在文件不存在时归纳。骨架之外的内容更新仍由 `/digest` 独占。

### 出口（强制，非可选）

第 1-4 层任一被触发后，必须在末尾调用一次 `auto_commit_push(TRACE_ID, "update-map", "{summary 60 字内}")` 把本次所有写入（CSV / trace ADR / 技术债 / 新组件骨架）作为单次提交推送到 `origin main`。

```
if any of (layer1_changed, layer2_changed, layer3_changed, layer4_changed):
    auto_commit_push(TRACE_ID, "update-map", "{summary}")
else:
    no-op（无写入即无提交）
```

**错误处理**：`auto_commit_push` 失败（rebase 冲突 / push 非 fast-forward 重试仍失败）→ ABORT，输出 `ERROR: 活文档已写入 {docs_root} 但未推送，请 cd {docs_root} && git status 手动 push`。不静默吞错——ship Step 5.5 是最后防线，update-map 自己必须先尽力。

**inline 模式**：协议层自动 no-op，本步骤无副作用。

**协议接入≠流程步骤**：SKILL.md 顶部协议接入声明只是"承诺"，本"出口"段才是可执行步骤——agent 在长上下文中只认编号 Layer + 出口。

---

<rules>

1. **不捏造** — 只记录代码中实际存在的内容
2. **不生成 MAP.md** — 直接更新 CSV 索引文件（index.csv / files.csv / tests.csv / apis.csv / tech_debt.csv）
3. **ADR 必填** — 每次迭代必须记录决策原因
4. **跟踪技术债** — 绝不忽略审计发现
5. **时间戳重要** — 始终在 index.csv 中更新 date 列
6. **读 CLAUDE.md** — 获取域分类、CSV 索引路径、生成命令和项目特有路径
7. **写意图不写代码** — 描述业务意图，不描述代码实现。代码会改名，意图不变
8. **双向原子更新（trace 侧）** — 修改 trace 间 `depends_on` / `depended_by` 时，必须在同一个 task 中更新两端 trace 文件。禁止孤立链接。产品手册侧的双向一致由 /digest 持有
9. **不写入 `{docs_root}/product/`** — 产品手册更新由 /digest 独占（/origin --reconcile 校准）

</rules>
