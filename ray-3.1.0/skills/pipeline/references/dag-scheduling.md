---
home_skill: pipeline
purpose: FEATURE 级别在非 inline 模式（external / docs）下的多角色 DAG 调度流程
---

# Phase 0.5：多角色 DAG 调度

**触发条件**：`resolve_docs_root()` 返回 `mode != "inline"` 且任务级别为 FEATURE。

从 trace.md 头部读取 `roles` 字段（如 `> roles: pd, ui, be, fe, qc`）。未声明时按 type 推断默认值。

## DAG 执行顺序

```
Phase 1:   PD（读取或生成 trace.md）
Phase 1.5: Challenge(PD) → PD 修复（自愈循环，最多 3 轮。PATCH/REFACTOR 跳过）
Phase 2:   UI Agent + BE Agent 并行（BE 同时产出 contracts/）
Phase 2.5: Challenge(BE) → BE 修复（自愈循环，最多 3 轮）
Phase 3:   FE Agent（等 UI + BE Challenge 都通过）
Phase 3.5: Challenge(FE) → FE 修复（自愈循环，最多 3 轮）
Phase 4:   QC Agent（等所有 Challenge 通过）
Phase 5+:  实现、审计、发布（不变）
```

不在 roles 列表中的角色跳过，其下游就绪检查相应调整。

## 就绪检查

```
is_ready(role, trace):
    roles = trace.roles
    UI: exists("{TRACE_ID}/trace.md")
    BE: exists("{TRACE_ID}/trace.md")
    FE: exists("{TRACE_ID}/trace.md")
        and ("ui" not in roles or exists("{TRACE_ID}/ui.md"))
        and ("be" not in roles or exists("{TRACE_ID}/be.md"))
    QC: exists("{TRACE_ID}/trace.md")
        and ("be" not in roles or exists("{TRACE_ID}/be.md"))
        and ("fe" not in roles or exists("{TRACE_ID}/fe.md"))
```

## Challenge Agent 自愈循环

```
challenge(role, target_file):
    if not exists("{TRACE_ID}/challenge.md"):
        create "{TRACE_ID}/challenge.md" with header "# {TRACE_ID} — Challenge Report"

    loop (最多 3 轮):
        Challenge Agent 读 target_file → 追加质疑到 challenge.md
        if 无质疑 → 通过
        {role} Agent 读 challenge.md → 修复 target_file
        Challenge Agent 重新审查
```

## Challenge 检查维度

- Challenge(PD)：场景覆盖、验收标准可测性、不变式、Non-Goals、冲突检测
- Challenge(BE)：API 一致性、契约完整性、数据模型、耦合、安全
- Challenge(FE)：UI 一致性、状态管理、契约消费、空/加载/错误状态
