#!/usr/bin/env bash
# Ray Memory — SessionStart hook
# 两种模式：
#   "inject"（默认）— 读取 L3/L2/L1 摘要，通过 additionalContext 注入，零额外 token
#   "agent" — spawn 后台子 Agent 执行完整 /mem-recall，更精确但消耗 token
# 配置: .ray/config.json -> memory.enabled, memory.auto_recall, memory.session_start_mode, memory.model

set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/_lib.sh"

# ============================================================
#  首次激活检测：无 .ray/config.json → 交互式 setup
# ============================================================
if [[ ! -f "$RAY_CONFIG" ]]; then
  SETUP_CONTEXT="[Ray Beta — 首次激活 Setup]

检测到这是 Ray Beta 在当前项目的首次激活（未找到 \`.ray/config.json\`）。
请与用户进行交互式配置，逐步询问以下配置项（每次问一组相关的，展示选项表格），然后生成配置文件。

如果用户说「用默认配置」或类似表达，直接用所有默认值生成，跳过询问。

---

## 第 1 步：记忆系统基础

| 配置项 | 选项 | 说明 |
|--------|------|------|
| 启用记忆系统 | **是 (默认)** / 否 | 关闭后所有记忆功能停用，Ray 退化为无状态流水线 |
| 记忆存储路径 | **.ray/memory (默认)** | 改路径的场景：monorepo 中多个子项目想共享记忆，可指向上层目录 |

## 第 2 步：会话结束时如何写入记忆

| 模式 | 说明 | 适用场景 |
|------|------|---------|
| **stop (默认)** | 会话结束前，主 Agent 当场执行记忆写入 | 日常开发，推荐大多数用户。拥有完整会话上下文，写入最准确 |
| defer | 写 pending 文件，下次 SessionStart 补偿执行 | 希望会话快速退出、不想等待记忆写入时使用。代价：下次启动略慢，且仅基于 git 摘要推断（不如 stop 准确） |
| agent | 后台启动独立 CLI 进程执行 | 需要 claude/codex CLI 在 PATH 中。适合想要会话立即退出又不想推迟的场景 |
| skip | 不执行，仅依赖 commit 时的 gate | 只想在 commit 节点记录记忆，其余时刻不写入。最轻量 |

## 第 3 步：自动行为

| 配置项 | 选项 | 说明 |
|--------|------|------|
| commit 后自动 gate | **是 (默认)** / 否 | 每次 git commit 后自动评估是否有值得记录的信号。关闭后只能手动 /mem-gate |
| SessionStart 自动召回 | **是 (默认)** / 否 | 每次新会话自动注入历史记忆摘要。关闭后需手动 /mem-recall |
| 自动蒸馏 | **auto (默认)** / true / false | auto = L1 积累 >=10 条且距上次蒸馏 >=24h 时自动触发。true = 每次强制蒸馏（调试用）。false = 仅手动 /mem-distill |

## 第 4 步：进化系统（Grow）

| 配置项 | 选项 | 说明 |
|--------|------|------|
| 启用进化系统 | **是 (默认)** / 否 | Grow 系统从日常对话中提取工程经验（pattern/pitfall/optimization）。关闭后只有 gate 路径写入记忆 |
| 短语自动检测 | **是 (默认)** / 否 | 检测「原来是这样」「下次应该」等决策/发现短语，自动触发经验提取。关闭后只能手动 /grow |

## 第 5 步：子 Agent 模型

| 选项 | 说明 |
|------|------|
| **sonnet (默认)** | 性价比最优，适合 gate/recall/distill 等后台任务 |
| haiku | 更快更便宜，但信号判断精度略低。适合高频触发、预算敏感的场景 |
| opus | 最强判断力，但成本高。适合复杂项目、需要精确记忆筛选的场景 |

---

## 完成后

收集完所有配置后执行：
1. 创建 .ray/ 目录（如不存在）
2. 创建 .ray/memory/l1-episodes/、l2-patterns/、l3-judgments/ 目录
3. 将配置写入 .ray/config.json，格式：

\`\`\`json
{
  \"paths\": { \"memory\": \"<用户选择>\" },
  \"memory\": {
    \"enabled\": <bool>,
    \"auto_recall\": <bool>,
    \"session_start_mode\": \"inject\",
    \"session_end_mode\": \"<用户选择>\",
    \"gate_on_commit\": <bool>,
    \"distill_on_session_end\": \"<用户选择>\",
    \"model\": \"<用户选择>\",
    \"agent_command\": \"\"
  },
  \"evolve\": {
    \"enabled\": <bool>,
    \"phrase_trigger\": <bool>,
    \"throttle_minutes\": 10
  }
}
\`\`\`

4. 告知用户：配置完成，下次会话自动激活。.ray/ 目录（配置和记忆）是项目级知识，建议提交到代码库，让团队共享决策记忆"

  output_context "$SETUP_CONTEXT"
  exit 0
fi

# --- 配置读取 ---
CONFIG_FILE="$RAY_CONFIG"
MEMORY_ENABLED="true"
AUTO_RECALL="true"
SESSION_START_MODE="inject"
MODEL="sonnet"

if [[ -f "$CONFIG_FILE" ]]; then
  MEMORY_ENABLED=$(jq_config "$CONFIG_FILE" '.memory.enabled' 'true')
  AUTO_RECALL=$(jq_config "$CONFIG_FILE" '.memory.auto_recall' 'true')
  SESSION_START_MODE=$(jq_config "$CONFIG_FILE" '.memory.session_start_mode' 'inject')
  MODEL=$(jq_config "$CONFIG_FILE" '.memory.model' 'sonnet')
fi

if [[ "$MEMORY_ENABLED" != "true" ]] || [[ "$AUTO_RECALL" != "true" ]]; then
  exit 0
fi

# --- 记忆目录 ---
MEMORY_DIR="$RAY_MEMORY_DIR"
if [[ ! -d "$MEMORY_DIR" ]]; then
  exit 0
fi

# ============================================================
#  检查 pending-gate：上次 SessionEnd defer 的补偿执行
# ============================================================
PENDING_FILE="$MEMORY_DIR/.pending-gate.md"
PROCESSING_FILE="$MEMORY_DIR/.pending-gate.processing"
PENDING_CONTEXT=""

# --- 清理卡死的 .processing 文件 ---
# 如果 .processing 存在，说明上次补偿没跑完（agent 超时或失败）
if [[ -f "$PROCESSING_FILE" ]]; then
  if [[ -f "$PENDING_FILE" ]]; then
    # .processing + .pending 同时存在 = 连续 2 次 pending，丢弃旧的 .processing
    rm -f "$PROCESSING_FILE"
  else
    # 只有 .processing，没有新 pending — 可能是上次 agent 中断
    # 检查是否超过 1 小时，超时则丢弃
    PROC_AGE=0
    if [[ "$(uname)" == "Darwin" ]]; then
      PROC_AGE=$(( $(date +%s) - $(stat -f %m "$PROCESSING_FILE") ))
    else
      PROC_AGE=$(( $(date +%s) - $(stat -c %Y "$PROCESSING_FILE") ))
    fi
    if [[ "$PROC_AGE" -gt 3600 ]]; then
      rm -f "$PROCESSING_FILE"
    fi
    # 如果 < 1h，保留——可能上一个 session 的 agent 还在跑
  fi
fi

# --- 处理 pending 文件 ---
if [[ -f "$PENDING_FILE" ]]; then
  # 解析 YAML block scalar（| 语法），兼容 tab 和不同空格数量
  PENDING_SUMMARY=$(awk '/^git_summary:/{found=1;next} found && /^[[:space:]]/{sub(/^[[:space:]]+/,"");print;next} found{exit}' "$PENDING_FILE" | head -20)
  PENDING_DIFF=$(awk '/^git_diff_stat:/{found=1;next} found && /^[[:space:]]/{sub(/^[[:space:]]+/,"");print;next} found{exit}' "$PENDING_FILE" | head -10)
  # 读取 gate 规则模板
  GATE_TEMPLATE=""
  if [[ -f "$SCRIPT_DIR/_gate-prompt-template.txt" ]]; then
    GATE_TEMPLATE=$(cat "$SCRIPT_DIR/_gate-prompt-template.txt")
  fi
  PENDING_CONTEXT="[Ray Memory Gate - 补偿执行] 上次会话结束时有未处理的记忆写入。请 spawn 后台子 Agent 执行 gate 评估：

\`\`\`
Agent(
  name=\"mem-gate-deferred\",
  model=\"${MODEL}\",
  run_in_background=true,
  prompt=\"你是 Ray Memory Gate Agent（补偿模式）。

## 上次会话的 commit 摘要
${PENDING_SUMMARY}

## 变更统计
${PENDING_DIFF}

${GATE_TEMPLATE}

请根据 commit 摘要推断信号，执行 L0 Gate 评估，写入通过的信号。简洁报告：记录了 N 条 / 过滤了 M 条。

完成后请删除 .ray/memory/.pending-gate.processing 文件。\"
)
\`\`\`

"
  # 重命名为 processing（防止 spawn 失败后信号丢失）
  mv "$PENDING_FILE" "$PROCESSING_FILE" 2>/dev/null || rm -f "$PENDING_FILE"
fi

# ============================================================
#  MODE: agent — 提示主 Agent spawn 后台子 Agent 做完整 recall
# ============================================================
if [[ "$SESSION_START_MODE" == "agent" ]]; then
  CONTEXT="${PENDING_CONTEXT}[Ray Memory Recall] 记忆系统已激活（agent 模式）。请 spawn 后台子 Agent 执行完整记忆召回：

\`\`\`
Agent(
  name=\"mem-recall-agent\",
  model=\"${MODEL}\",
  run_in_background=true,
  prompt=\"你是 Ray Memory Recall Agent。请：
  1. 读取 .ray/memory/l3-judgments/ 提取所有决策规则
  2. 读取 .ray/memory/l2-patterns/ 提取所有行为模式
  3. 读取 .ray/memory/l1-episodes/ 提取近期事件
  4. 搜索 .ray/memory/l1-episodes/ (source: "grow") 中的高置信度经验
  5. 输出结构化的记忆激活报告（按 L3 > L2 > L1 优先级）\"
)
\`\`\`"

  output_context "$CONTEXT"
  exit 0
fi

# ============================================================
#  MODE: inject（默认）— 读取文件摘要，零 token 消耗
# ============================================================

SUMMARY=""

# L3 Judgments（最高优先级）
L3_DIR="$MEMORY_DIR/l3-judgments"
while IFS= read -r f; do
  [[ -z "$f" ]] && continue
  RULE=$(yaml_get "$f" "rule")
  CONFIDENCE=$(yaml_get "$f" "confidence")
  if [[ -n "$RULE" ]]; then
    SUMMARY="${SUMMARY}\n- [L3] ${RULE} (confidence: ${CONFIDENCE:-?})"
  fi
done < <(safe_ls_md "$L3_DIR")

if [[ -n "$SUMMARY" ]]; then
  SUMMARY="\n### Judgments (L3)${SUMMARY}"
fi

# L2 Patterns（取最近 5 个）
L2_DIR="$MEMORY_DIR/l2-patterns"
L2_BLOCK=""
while IFS= read -r f; do
  [[ -z "$f" ]] && continue
  DESC=$(yaml_get "$f" "description")
  TYPE=$(yaml_get "$f" "pattern_type")
  STRENGTH=$(yaml_get "$f" "strength")
  if [[ -n "$DESC" ]]; then
    L2_BLOCK="${L2_BLOCK}\n- [L2:${TYPE:-?}] ${DESC} (strength: ${STRENGTH:-?})"
  fi
done < <(safe_ls_md "$L2_DIR" "-t" 5)

if [[ -n "$L2_BLOCK" ]]; then
  SUMMARY="${SUMMARY}\n### Patterns (L2, top 5)${L2_BLOCK}"
fi

# L1 最近 3 条
L1_DIR="$MEMORY_DIR/l1-episodes"
L1_BLOCK=""
while IFS= read -r f; do
  [[ -z "$f" ]] && continue
  SITUATION=$(yaml_get "$f" "situation")
  STRENGTH=$(yaml_get "$f" "strength")
  VERIFICATION=$(yaml_get "$f" "verification")
  if [[ -n "$SITUATION" ]]; then
    L1_BLOCK="${L1_BLOCK}\n- [L1] ${SITUATION} (${VERIFICATION:-UNTESTED}, strength: ${STRENGTH:-?})"
  fi
done < <(safe_ls_md "$L1_DIR" "-t" 3)

if [[ -n "$L1_BLOCK" ]]; then
  SUMMARY="${SUMMARY}\n### Recent Episodes (L1, latest 3)${L1_BLOCK}"
fi

# 统计
L3_COUNT=$(find "$L3_DIR" -maxdepth 1 -name '*.md' -type f 2>/dev/null | wc -l | tr -d ' ')
L2_COUNT=$(find "$L2_DIR" -maxdepth 1 -name '*.md' -type f 2>/dev/null | wc -l | tr -d ' ')
L1_COUNT=$(find "$L1_DIR" -maxdepth 1 -name '*.md' -type f 2>/dev/null | wc -l | tr -d ' ')

if [[ -z "$SUMMARY" ]] && [[ -z "$PENDING_CONTEXT" ]]; then
  exit 0
fi

CONTEXT="${PENDING_CONTEXT}## Ray Memory — 记忆摘要 (L3:${L3_COUNT} L2:${L2_COUNT} L1:${L1_COUNT})${SUMMARY}\n\n记忆系统已激活（inject 模式）。执行 skill 前会自动 /mem-recall 做精确匹配。上方为全局概览。"

output_context "$CONTEXT"
