#!/usr/bin/env bash
# Ray Memory — SessionEnd hook
# 三种模式：
#   "skip"         — 不执行，依赖 commit 时的 gate 即可。最兼容，无额外依赖。
#   "defer"       — 将会话摘要写入 pending 文件，下次 SessionStart 时由主 Agent 补偿执行 gate。
#   "agent"       — 通过 agent_command 启动独立进程执行 gate。需要 claude/codex 等 CLI。
#
# 配置:
#   memory.enabled              总开关
#   memory.session_end_mode     skip | defer | agent
#   memory.agent_command        独立进程命令模板（仅 agent 模式）
#   memory.model                模型（传递给 agent_command）
#   memory.distill_on_session_end  是否同时蒸馏

set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/_lib.sh"

# --- 配置读取 ---
CONFIG_FILE="$RAY_CONFIG"
MEMORY_ENABLED="true"
SESSION_END_MODE="stop"
AGENT_COMMAND=""
MODEL="sonnet"
DISTILL_ON_END="auto"

if [[ -f "$CONFIG_FILE" ]]; then
  MEMORY_ENABLED=$(jq_config "$CONFIG_FILE" '.memory.enabled' 'true')
  SESSION_END_MODE=$(jq_config "$CONFIG_FILE" '.memory.session_end_mode' 'stop')
  AGENT_COMMAND=$(jq_config "$CONFIG_FILE" '.memory.agent_command' '')
  MODEL=$(jq_config "$CONFIG_FILE" '.memory.model' 'sonnet')
  DISTILL_ON_END=$(jq_config "$CONFIG_FILE" '.memory.distill_on_session_end' 'auto')
fi

if [[ "$MEMORY_ENABLED" != "true" ]] || [[ "$SESSION_END_MODE" == "skip" ]]; then
  exit 0
fi

# --- 记忆目录 ---
MEMORY_DIR="$RAY_MEMORY_DIR"
mkdir -p "$MEMORY_DIR/l1-episodes" "$MEMORY_DIR/l2-patterns" "$MEMORY_DIR/l3-judgments"

# --- 收集会话上下文 ---
GIT_SUMMARY=$(git log -20 --oneline --no-merges 2>/dev/null | head -20 || echo "")
GIT_DIFF_STAT=$(git diff --stat HEAD~5..HEAD 2>/dev/null | tail -5 || echo "")

if [[ -z "$GIT_SUMMARY" ]]; then
  exit 0
fi

# --- 蒸馏条件检查 ---
DISTILL_INSTRUCTION=""
if should_distill "$MEMORY_DIR" "$DISTILL_ON_END"; then
  DISTILL_INSTRUCTION="

6. 蒸馏条件已满足（L1 >= 10 且距上次蒸馏 >= 24h）。请同时执行轻量蒸馏：
   - 对 L1 执行衰减清理（strength < 0.1 删除）
   - 检查是否有 3+ 条 episode 共享 >= 2 个 tag（候选 Pattern）
   - 如有，提取 L2 Pattern 写入 .ray/memory/l2-patterns/
   - 对 source: grow 的高频条目（同 type 同 tags > 3 条）加速晋升为 L2
   - 检查已有 L2 Pattern 是否满足 L3 晋升条件
   - 完成后运行：date +%s > .ray/memory/.last-distill"
fi

GATE_TEMPLATE=""
if [[ -f "$SCRIPT_DIR/_gate-prompt-template.txt" ]]; then
  GATE_TEMPLATE=$(cat "$SCRIPT_DIR/_gate-prompt-template.txt")
fi

PROMPT="你是 Ray Memory Gate Agent（SessionEnd 模式）。

## 会话上下文（从 git log 推断）

最近 commit:
${GIT_SUMMARY}

变更统计:
${GIT_DIFF_STAT}

${GATE_TEMPLATE}

## 任务

根据 commit 摘要推断信号，执行 L0 Gate 评估，写入通过的信号。${DISTILL_INSTRUCTION}

简洁报告：记录了 N 条 / 过滤了 M 条。"

# --- 写入 pending 文件的辅助函数 ---
write_pending() {
  local reason="${1:-}"
  local pending_file="$MEMORY_DIR/.pending-gate.md"
  {
    echo "---"
    echo "timestamp: \"$(date -u +%Y-%m-%dT%H:%M:%SZ)\""
    echo "git_summary: |"
    echo "$GIT_SUMMARY" | while IFS= read -r line; do echo "  $line"; done
    echo "git_diff_stat: |"
    echo "$GIT_DIFF_STAT" | while IFS= read -r line; do echo "  $line"; done
    echo "distill: ${DISTILL_ON_END}"
    [[ -n "$reason" ]] && echo "fallback_reason: \"$reason\""
    echo "---"
  } > "$pending_file"
}

# ============================================================
#  MODE: defer — 写 pending 文件，下次 SessionStart 补偿执行
# ============================================================
if [[ "$SESSION_END_MODE" == "defer" ]]; then
  write_pending
  exit 0
fi

# ============================================================
#  MODE: agent — 独立进程执行 gate
# ============================================================

# 确定可用的 agent command
RESOLVED_CMD="$AGENT_COMMAND"

if [[ -z "$RESOLVED_CMD" ]]; then
  if command -v claude &>/dev/null; then
    RESOLVED_CMD="claude"
  elif command -v codex &>/dev/null; then
    RESOLVED_CMD="codex"
  fi
fi

if [[ -z "$RESOLVED_CMD" ]]; then
  # 没有可用的 CLI，降级为 defer
  write_pending "no agent CLI found (claude/codex not in PATH)"
  exit 0
fi

# 写入临时 prompt 文件（避免 eval 和命令注入）
PROMPT_FILE=$(mktemp /tmp/ray-gate-prompt-XXXXXX.txt)
printf '%s' "$PROMPT" > "$PROMPT_FILE"

# 根据检测到的 CLI 构建命令
if [[ "$AGENT_COMMAND" == "" ]]; then
  # 自动检测模式
  if [[ "$RESOLVED_CMD" == "claude" ]]; then
    nohup claude -p "$(cat "$PROMPT_FILE")" --model "$MODEL" --max-turns 10 > /tmp/ray-memory-session-end.log 2>&1 &
  elif [[ "$RESOLVED_CMD" == "codex" ]]; then
    nohup codex exec "$(cat "$PROMPT_FILE")" > /tmp/ray-memory-session-end.log 2>&1 &
  fi
else
  # 用户自定义命令：将 prompt 文件路径和 model 作为环境变量传递
  export RAY_GATE_PROMPT_FILE="$PROMPT_FILE"
  export RAY_GATE_MODEL="$MODEL"
  nohup bash -c "$AGENT_COMMAND" > /tmp/ray-memory-session-end.log 2>&1 &
fi

# 清理 prompt 文件（延迟，让后台进程有时间读取）
(sleep 10 && rm -f "$PROMPT_FILE") &

exit 0
