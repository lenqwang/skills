#!/usr/bin/env bash
# Ray Memory — Stop hook
# 在主 Agent 完成最后一次回复时触发，提示主 Agent 做记忆 gate 评估
# 配置: .ray/config.json -> memory.enabled, memory.session_end_mode

set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/_lib.sh"

# --- 配置读取 ---
CONFIG_FILE="$RAY_CONFIG"
MEMORY_ENABLED="true"
SESSION_END_MODE="stop"

if [[ -f "$CONFIG_FILE" ]]; then
  MEMORY_ENABLED=$(jq_config "$CONFIG_FILE" '.memory.enabled' 'true')
  SESSION_END_MODE=$(jq_config "$CONFIG_FILE" '.memory.session_end_mode' 'stop')
fi

if [[ "$MEMORY_ENABLED" != "true" ]] || [[ "$SESSION_END_MODE" != "stop" ]]; then
  exit 0
fi

# --- 节流：5 分钟内不重复触发 ---
THROTTLE_FILE="/tmp/ray-memory-stop-$(date +%Y%m%d).lock"
if [[ -f "$THROTTLE_FILE" ]]; then
  LAST=$(safe_int "$(cat "$THROTTLE_FILE" 2>/dev/null)" 0)
  NOW=$(date +%s)
  if [[ $(( NOW - LAST )) -lt 300 ]]; then
    exit 0
  fi
fi
date +%s > "$THROTTLE_FILE"

# --- 记忆目录 ---
MEMORY_DIR="$RAY_MEMORY_DIR"
mkdir -p "$MEMORY_DIR/l1-episodes" "$MEMORY_DIR/l2-patterns" "$MEMORY_DIR/l3-judgments"

# --- 输出提示 ---
# Stop hook 只支持顶层字段（stopReason/decision/continue 等），不支持 hookSpecificOutput
STOP_REASON="[Ray Memory Gate] 请先完成记忆写入再结束：回顾本次会话的决策/纠正/发现/偏好/架构选择，执行 L0 Gate 评估（信号密度 >= 8 写入，4-7 标记 UNTESTED，< 4 DROP），去重后写入 .ray/memory/l1-episodes/。无信号则报告\"无信号\"。"

STOP_JSON=$(printf '%s' "$STOP_REASON" | json_encode)
cat <<HOOKEOF
{
  "continue": true,
  "stopReason": $STOP_JSON
}
HOOKEOF
