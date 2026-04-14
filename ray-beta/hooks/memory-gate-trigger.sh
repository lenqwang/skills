#!/usr/bin/env bash
# Ray Memory — PostToolUse(git commit) hook
# commit 后引导主 Agent 总结会话，再 spawn 后台子 Agent 执行 gate
# 配置: .ray/config.json -> memory.enabled, memory.gate_on_commit, memory.model

set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/_lib.sh"

# --- 配置读取 ---
CONFIG_FILE="$RAY_CONFIG"
MEMORY_ENABLED="true"
GATE_ON_COMMIT="true"
MODEL="sonnet"

if [[ -f "$CONFIG_FILE" ]]; then
  MEMORY_ENABLED=$(jq_config "$CONFIG_FILE" '.memory.enabled' 'true')
  GATE_ON_COMMIT=$(jq_config "$CONFIG_FILE" '.memory.gate_on_commit' 'true')
  MODEL=$(jq_config "$CONFIG_FILE" '.memory.model' 'sonnet')
fi

if [[ "$MEMORY_ENABLED" != "true" ]] || [[ "$GATE_ON_COMMIT" != "true" ]]; then
  exit 0
fi

# --- 记忆目录检查 ---
MEMORY_DIR="$RAY_MEMORY_DIR"
if [[ ! -d "$MEMORY_DIR" ]]; then
  mkdir -p "$MEMORY_DIR/l1-episodes" "$MEMORY_DIR/l2-patterns" "$MEMORY_DIR/l3-judgments"
fi

# --- 读取 gate 规则模板 ---
GATE_TEMPLATE=""
if [[ -f "$SCRIPT_DIR/_gate-prompt-template.txt" ]]; then
  GATE_TEMPLATE=$(cat "$SCRIPT_DIR/_gate-prompt-template.txt")
fi

# --- 输出提示 ---
CONTEXT="[Ray Memory Gate] commit 检测到。请执行以下操作：

1. 用 2-3 句话总结本次会话的关键信号（决策、纠正、发现、偏好、架构选择）
2. 将摘要嵌入下方 prompt 的 {会话摘要} 位置，spawn 后台子 Agent：

\`\`\`
Agent(
  name=\"mem-gate-agent\",
  model=\"${MODEL}\",
  run_in_background=true,
  prompt=\"你是 Ray Memory Gate Agent。

## 会话摘要
{请将你的 2-3 句总结插入这里}

${GATE_TEMPLATE}

请根据会话摘要推断信号，执行 L0 Gate 评估，写入通过的信号。简洁报告：记录了 N 条 / 过滤了 M 条。\"
)
\`\`\`"

output_context "$CONTEXT"
