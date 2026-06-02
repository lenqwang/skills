---
home_skill: _trace-persist
purpose: Step 5 收尾通知的输出模板（按 external / inline 模式）
---

# _trace-persist — 收尾输出模板

> Step 5 根据运行模式（`external` / `inline`）选择对应模板，直接输出建议，不阻塞等待用户选择。
> `docs` 模式下 `_trace-persist` 不会被 `/trace` 调用（trace HARD-GATE 拒绝）；若 `/propose` 在 docs 模式落盘，复用 `external` 模板。

---

## external 模式

```
需求已确认，注册为 {FEAT-ID}。
文件已写入 {docs_root}/traces/{2hex}/{FEAT-ID}/trace.md{roles 存在时追加：，角色文件：ui.md, be.md, ...}

下一步：运行 /pipeline 启动开发流水线。
```

## inline 模式

```
需求已确认，注册为 {FEAT-ID}。
文件已写入 docs/traces/{2hex}/{FEAT-ID}/trace.md

下一步：运行 /pipeline 启动开发流水线。
```
