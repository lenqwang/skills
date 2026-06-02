---
home_skill: coder
purpose: 自愈循环伪代码 + 增量上下文规则 + 自适应升级策略 + 错误模式追踪逻辑
---

# 自愈循环详细流程

## 上下文构建规则（增量化）

入口 `on_skill_enter` 已读 trace.md / spec / 测试 / CLAUDE.md 等基础上下文。**自愈循环每轮 prompt 不再重复附带这些固定背景**——只送增量。

每轮上下文 = `<入口已建立的基础 ctx>` + `<增量片段>`。**增量片段**按以下规则计算：

| 字段 | 内容 | 来源 |
|------|------|------|
| `last_diff` | 上一轮 `git diff HEAD --` `<src 范围>` | 跑测试前抓取；首轮为空 |
| `error_tail` | 失败测试错误日志末尾 N 行（默认 N=80） | 当轮测试输出 |
| `failing_test_src` | 失败测试源文件全文（仅失败那几个文件） | 项目测试目录 |

**严格不附**：trace.md 全文、组件文件、spec 全文（首轮入口已读 spec，后续轮不重复携带）。

### 连败一次性回退（局部决策，不回 pipeline）

判定条件：**同一个测试名连续 2 轮失败**（用 `ERROR_PATTERN_TRACKER` 不引入新状态变量，下方的"同类错误"追踪基础上加一个测试名维度即可）。

触发后**当轮**（不是下轮）：

1. 在常规增量片段基础上**额外**附加：
   - 受影响实现文件全文（按测试 import 链反推）
   - 失败测试文件全文（已含）
   - 对应 spec 文件全文（`{docs_root}/specs/{module}/{Component}.spec.md`）
2. 标记 `full_reload_once = true`，仅本轮生效；下一轮自动回到增量模式
3. 在 notes 中记录 `full_reload_triggered: <测试名> 连败 2 轮`

> 回退是**为打破局部信息不足导致的死循环**，不是放宽 10 轮上限或 5 次同类错误中止条件——这两个边界依然生效。回退只发生一次（首次满足条件那轮），重复满足条件不重复触发；若回退后第 3 轮同测试仍失败，进入正常 stuck 流程。

## 伪代码

```
ITERATION = 0
ERROR_PATTERN_TRACKER = {}            // 错误类型: 连续出现次数
FAILING_TEST_TRACKER = {}             // 测试名: 连续失败次数
full_reload_done = false              // 全循环只回退一次

LOOP:
  ITERATION += 1
  记住本轮的失败原因和修复策略（用于最终摘要）

  IF ITERATION > 10:
    中止 -> 执行根因分析（见 references/root-cause-analysis.md）
    退出

  # 1. 构建本轮上下文
  ctx = <入口建立的基础 ctx>
  ctx += last_diff(src 范围) + error_tail(N=80) + failing_test_src
  IF 任一测试 in FAILING_TEST_TRACKER 满足"连败 == 2" AND not full_reload_done:
    ctx += impl 全文 + spec 全文     # 一次性回退完整加载
    full_reload_done = true
    log("full_reload_triggered:", 触发的测试名)

  # 2. 运行 + 解析
  运行 -> {项目测试命令}（从 CLAUDE.md 读取）
  全绿（排除 PREEXISTING_FAILURES）？ -> 退出成功
  解析失败测试名 + 错误信息
  过滤掉 PREEXISTING_FAILURES

  # 3. 追踪计数
  对每个失败测试名 t:
    FAILING_TEST_TRACKER[t] = (前一轮失败 ? +1 : 1)
  对每个错误类型 e:
    ERROR_PATTERN_TRACKER[e] = (前一轮同类 ? +1 : 1)

  # 4. 自适应检查（见下方"自适应升级"）
  # 5. 根因 + 修复 + Lint
  思考 -> 根因分析：
           - 类型不匹配？ -> 检查类型导入路径（从源码类型目录，非 docs/）
           - 逻辑错误？ -> 重读 spec 相关切片
           - 缺少导入？ -> 检查现有代码模式
  修复 -> 仅修改 src/ 文件（或项目约定的源码目录）
  Lint -> {项目 lint 命令}（如可用）
  GOTO LOOP
```

> 同时维护 `ERROR_PATTERN_TRACKER`（错误类型计数）和 `FAILING_TEST_TRACKER`（测试名计数）——前者控"5 次同类中止 / 3 次策略升级"，后者控"2 次连败一次性回退"。两个维度各自独立。

## 自适应升级

不再机械跑满 10 轮。根据错误模式动态调整策略。

### 错误模式追踪

每轮将错误归类为一个模式（如"TypeError: cannot read property X"、"assertion failed: expected Y got Z"）。如果连续 N 轮出现**同类错误**：

| 连续同类次数 | 动作 |
|-------------|------|
| 2 | 输出警告："连续 2 轮同类错误 [{类型}]，切换修复策略" |
| 3 | **策略升级**：停下来输出分析报告，重读 spec 和测试文件，从不同角度理解问题 |
| 5 | **提前中止**：不等 10 轮，直接进入根因分析 |

### 策略升级时的分析报告

```
## 自适应分析（第 {N} 轮）

连续 3 轮同类错误：{错误类型}
已尝试的修复策略：
1. 第 {X} 轮：{策略} → 失败
2. 第 {Y} 轮：{策略} → 失败
3. 第 {Z} 轮：{策略} → 失败

可能的根因：
- {假设 1}
- {假设 2}

切换到策略：{新策略描述}
```

### 进展追踪

每轮记录"通过测试数 / 总测试数"。如果测试通过数在**连续 3 轮没有增加**（卡在同一个数字），触发策略升级。
