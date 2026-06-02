---
home_skill: pipeline
purpose: 子 Agent 调度协议（上下文传递模板 + coder 自愈增量规则 + 返回摘要格式）
---

# 子 Agent 调度协议

## 调度时传递（写入 Agent tool 的 prompt 参数）

```
## Pipeline 上下文
- FEAT-ID: {FEAT-ID}
- 任务级别: {PATCH | FEATURE | REFACTOR}
- 受影响组件: {ComponentName}（模板级别：{轻量/标准/完整}）
- Trace 文件: {docs_root}/traces/{2hex}/{FEAT-ID}/trace.md
- audit_mode: {light | full}   # 仅在调度 /audit 时附加；PATCH/REFACTOR=light，FEATURE=full
- CLAUDE.md 关键配置:
  - 测试命令: {从 CLAUDE.md 读取}
  - 类型目录: {从 CLAUDE.md 读取}
  - 项目语言: {从 CLAUDE.md 读取}
```

**`audit_mode` 字段约定**：调度 `/audit` 时由 pipeline 显式传入，**audit skill 不从 trace 推断**。默认 `full`。light 模式只评估 4 维度（需求一致性 / 安全 / 测试通过 / 不变式保持），其余维度在报告中标 `skipped due to audit_mode=light`。阈值 `>= 80` 在两种模式下一致。

## coder 自愈循环增量上下文

coder 自愈循环每轮的输入构造（详见 `skills/coder/references/self-healing-loop.md`）：

| 片段 | 来源 | 备注 |
|------|------|------|
| `last_diff` | 上一轮 `git diff HEAD --` `<src 范围>` | 跑测试前抓取；首轮为空 |
| `error_tail` | 失败测试错误日志末尾 N 行（默认 N=80） | 当轮测试输出 |
| 失败测试源文件 | 跑挂的测试文件全文 | 当轮 |

**完整加载回退场景**（仅以下两个真实业务场景，子 skill 自身判定）：

| 触发 | 谁判定 | 行为 |
|------|-------|------|
| `audit_mode=full` 且组件为完整级 | audit | 不变式相关阶段读组件文件全文 |
| coder 自愈连续 2 轮命中相同测试失败 | coder | 当轮一次性重读 impl + tests + spec |

回退是**当次执行**的局部决策，不修改 trace 文件，不阻塞流水线。

## 子 Agent 返回摘要

每个子 Agent 完成时，在最终输出的**末尾**附加：

```
## Skill 完成摘要
- skill: {architect | qa | coder | audit}
- status: {done | stuck | rejected}
- artifacts:
  - {文件路径 1}
  - {文件路径 2}
- notes: {一句话关键信息，如 coder 迭代次数、audit 得分}
```

Pipeline 读取此摘要块，存入内存中的 phase 字段集合（不落盘到文件），并传递给下一个 phase。Phase 7 完成报告直接消费内存中的字段（phase / skill / decision / artifacts / notes）。
