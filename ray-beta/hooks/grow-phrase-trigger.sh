#!/usr/bin/env bash
# Ray Grow — PostToolUse(SendMessage) hook
# 检测完成/决策短语，提示 spawn 后台 agent 提取经验
# 配置: .ray/config.json -> memory.enabled, evolve.enabled, evolve.phrase_trigger, evolve.throttle_minutes

set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/_lib.sh"

# --- 配置读取 ---
CONFIG_FILE="$RAY_CONFIG"
MEMORY_ENABLED="true"
EVOLVE_ENABLED="true"
PHRASE_TRIGGER="true"
THROTTLE_MINUTES=10
MODEL="sonnet"

if [[ -f "$CONFIG_FILE" ]]; then
  MEMORY_ENABLED=$(jq_config "$CONFIG_FILE" '.memory.enabled' 'true')
  EVOLVE_ENABLED=$(jq_config "$CONFIG_FILE" '.evolve.enabled' 'true')
  PHRASE_TRIGGER=$(jq_config "$CONFIG_FILE" '.evolve.phrase_trigger' 'true')
  THROTTLE_MINUTES=$(safe_int "$(jq_config "$CONFIG_FILE" '.evolve.throttle_minutes' '10')" 10)
  MODEL=$(jq_config "$CONFIG_FILE" '.memory.model' 'sonnet')
fi

if [[ "$MEMORY_ENABLED" != "true" ]] || [[ "$EVOLVE_ENABLED" != "true" ]] || [[ "$PHRASE_TRIGGER" != "true" ]]; then
  exit 0
fi

# --- 节流检查 ---
THROTTLE_FILE="/tmp/ray-grow-phrase-trigger-last"
if [[ -f "$THROTTLE_FILE" ]]; then
  LAST_TRIGGER=$(safe_int "$(cat "$THROTTLE_FILE" 2>/dev/null)" 0)
  NOW=$(date +%s)
  THROTTLE_SECONDS=$(( THROTTLE_MINUTES * 60 ))
  if [[ $(( NOW - LAST_TRIGGER )) -lt $THROTTLE_SECONDS ]]; then
    exit 0
  fi
fi

# --- 读取 stdin（hook 输入） ---
INPUT=$(cat)

# 提取 tool_input 中的文本内容
MESSAGE=$(echo "$INPUT" | python3 -c '
import sys, json
try:
    data = json.load(sys.stdin)
    ti = data.get("tool_input", {})
    print(ti.get("message", ti.get("content", ti.get("text", ""))))
except:
    print("")
' 2>/dev/null || echo "")

if [[ -z "$MESSAGE" ]]; then
  exit 0
fi

# --- 短语检测 ---
# 中文完成信号（固定字符串匹配，不含正则特殊字符）
CN_COMPLETE="搞定了|解决了|修好了|完成了|通过了|成功了|OK了|可以了|没问题了|测试通过|构建通过|lint通过|部署成功"
# 英文完成信号
EN_COMPLETE="fixed|it works|that worked|problem solved|all tests pass|build succeeded|lgtm|ship it|done|resolved"
# 中文决策信号
CN_DECISION="决定用|选择方案|不要用|不用了|改用|换成|采用|确认用|最终选|统一用"
# 英文决策信号（转义正则特殊字符）
EN_DECISION="decided to use|go with|switch to|choose .+ over|let.s use|pick option|we.ll use|instead of"

COMBINED="($CN_COMPLETE|$EN_COMPLETE|$CN_DECISION|$EN_DECISION)"

if echo "$MESSAGE" | grep -iEq "$COMBINED"; then
  # 更新节流时间戳
  date +%s > "$THROTTLE_FILE"

  CONTEXT="[Ray Grow] 检测到完成/决策信号。请在后台提取经验教训：

\`\`\`
Agent(
  name=\"grow-agent\",
  model=\"${MODEL}\",
  run_in_background=true,
  prompt=\"请阅读 skills/grow/SKILL.md 并对本次会话执行经验提取流程（Phase 0-2）。提取 pattern / pitfall / skill-gap / optimization / convention 类经验，写入 .ray/memory/l1-episodes/（source: grow）。简洁报告。\"
)
\`\`\`

如果本次变更确实是纯机械操作（批量重命名、格式化、依赖升级），可跳过。"

  output_context "$CONTEXT"
else
  exit 0
fi
