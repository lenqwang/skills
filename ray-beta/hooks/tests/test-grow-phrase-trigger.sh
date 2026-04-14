#!/usr/bin/env bash
set -euo pipefail

PASS=0; FAIL=0; TOTAL=0
HOOKS_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TEST_DIR=$(mktemp -d)
trap 'rm -rf "$TEST_DIR"' EXIT

pass() { ((PASS++)); ((TOTAL++)); echo "  ✓ $1"; }
fail() { ((FAIL++)); ((TOTAL++)); echo "  ✗ $1"; }
assert_output_contains() {
  if echo "$1" | grep -q "$2" 2>/dev/null; then pass "$3"; else fail "$3 (expected: $2)"; fi
}
assert_empty() {
  if [[ -z "$1" ]]; then pass "$2"; else fail "$2 (got output)"; fi
}
assert_json() {
  if echo "$1" | python3 -c "import sys,json; json.load(sys.stdin)" 2>/dev/null; then pass "$3"; else fail "$3"; fi
}

# Helper: build JSON input for the hook
make_input() {
  local msg="$1"
  python3 -c "import json; print(json.dumps({'tool_input': {'message': $(python3 -c "import json; print(json.dumps('$msg'))")}}))"
}

# More robust helper using heredoc to handle special chars
make_input_raw() {
  local msg="$1"
  python3 << PYEOF
import json, sys
msg = """$msg"""
print(json.dumps({"tool_input": {"message": msg}}))
PYEOF
}

# Run the hook in a controlled environment
run_hook() {
  local msg="$1"
  local config="${2:-}"
  local work_dir="$TEST_DIR/work-$$-$RANDOM"
  mkdir -p "$work_dir"

  # Set up config if provided
  if [[ -n "$config" ]]; then
    mkdir -p "$work_dir/.ray"
    echo "$config" > "$work_dir/.ray/config.json"
  fi

  # Clear throttle file so each test starts fresh
  rm -f /tmp/ray-grow-phrase-trigger-last

  # Build input JSON
  local input_json
  input_json=$(python3 -c "
import json
msg = '''$msg'''
print(json.dumps({'tool_input': {'message': msg}}))
")

  # Run the hook
  cd "$work_dir"
  echo "$input_json" | bash "$HOOKS_DIR/grow-phrase-trigger.sh" 2>/dev/null || true
}

# ============================================================
echo "=== Test: grow-phrase-trigger.sh ==="
echo ""

# ----------------------------------------------------------
echo "--- 中文完成短语 ---"
# ----------------------------------------------------------
CN_COMPLETE_PHRASES=("搞定了" "解决了" "修好了" "完成了" "通过了" "成功了" "OK了" "可以了" "没问题了" "测试通过" "构建通过" "lint通过" "部署成功")

for phrase in "${CN_COMPLETE_PHRASES[@]}"; do
  OUT=$(run_hook "$phrase")
  assert_output_contains "$OUT" "Ray Grow" "中文完成: $phrase"
done

# ----------------------------------------------------------
echo ""
echo "--- 英文完成短语 ---"
# ----------------------------------------------------------
EN_COMPLETE_PHRASES=("fixed" "it works" "that worked" "problem solved" "all tests pass" "build succeeded" "lgtm" "ship it" "done" "resolved")

for phrase in "${EN_COMPLETE_PHRASES[@]}"; do
  OUT=$(run_hook "$phrase")
  assert_output_contains "$OUT" "Ray Grow" "英文完成: $phrase"
done

# ----------------------------------------------------------
echo ""
echo "--- 中文决策短语 ---"
# ----------------------------------------------------------
CN_DECISION_PHRASES=("决定用 TypeScript" "选择方案A" "不要用 jQuery" "不用了" "改用 pnpm" "换成 Vite" "采用新架构" "确认用这个" "最终选 React" "统一用 ESLint")

for phrase in "${CN_DECISION_PHRASES[@]}"; do
  OUT=$(run_hook "$phrase")
  assert_output_contains "$OUT" "Ray Grow" "中文决策: $phrase"
done

# ----------------------------------------------------------
echo ""
echo "--- 英文决策短语 ---"
# ----------------------------------------------------------
EN_DECISION_PHRASES=("decided to use React" "go with option A" "switch to pnpm" "let's use Vite" "pick option 2" "we'll use TypeScript" "instead of webpack")

for phrase in "${EN_DECISION_PHRASES[@]}"; do
  OUT=$(run_hook "$phrase")
  assert_output_contains "$OUT" "Ray Grow" "英文决策: $phrase"
done

# ----------------------------------------------------------
echo ""
echo "--- 大小写变体 ---"
# ----------------------------------------------------------
CASE_VARIANTS=("FIXED" "Fixed" "fixed" "LGTM" "Lgtm" "DONE" "Done" "RESOLVED" "Resolved" "SHIP IT" "Ship It")

for phrase in "${CASE_VARIANTS[@]}"; do
  OUT=$(run_hook "$phrase")
  assert_output_contains "$OUT" "Ray Grow" "大小写: $phrase"
done

# ----------------------------------------------------------
echo ""
echo "--- 嵌入句子中 ---"
# ----------------------------------------------------------
EMBEDDED_PHRASES=(
  "bug 已经 fixed 了"
  "我 decided to use React 来重构"
  "测试通过，继续下一步"
  "这个 it works 很好"
  "build succeeded, 可以合并了"
  "所有的 all tests pass 了"
  "最终我们 go with plan B"
)

for phrase in "${EMBEDDED_PHRASES[@]}"; do
  OUT=$(run_hook "$phrase")
  assert_output_contains "$OUT" "Ray Grow" "嵌入: $phrase"
done

# ----------------------------------------------------------
echo ""
echo "--- 不应触发的短语 ---"
# ----------------------------------------------------------
NO_TRIGGER_PHRASES=(
  "请帮我 fix 这个 bug"
  "好的"
  "收到"
  "继续"
  "帮我看看"
  "这个怎么用"
  "你觉得呢"
  "next step"
  "what do you think"
  "let me check"
  "try again"
)

for phrase in "${NO_TRIGGER_PHRASES[@]}"; do
  OUT=$(run_hook "$phrase")
  assert_empty "$OUT" "不触发: $phrase"
done

# ----------------------------------------------------------
echo ""
echo "--- 节流测试 ---"
# ----------------------------------------------------------
# First trigger should produce output
rm -f /tmp/ray-grow-phrase-trigger-last
WORK1="$TEST_DIR/throttle1"
mkdir -p "$WORK1"
INPUT1=$(python3 -c "import json; print(json.dumps({'tool_input': {'message': 'fixed'}}))")

OUT1=$(cd "$WORK1" && echo "$INPUT1" | bash "$HOOKS_DIR/grow-phrase-trigger.sh" 2>/dev/null || true)
assert_output_contains "$OUT1" "Ray Grow" "节流: 第一次触发有输出"

# Second trigger within throttle window should be silent
WORK2="$TEST_DIR/throttle2"
mkdir -p "$WORK2"
OUT2=$(cd "$WORK2" && echo "$INPUT1" | bash "$HOOKS_DIR/grow-phrase-trigger.sh" 2>/dev/null || true)
assert_empty "$OUT2" "节流: 第二次触发被节流"

# Clean up throttle file
rm -f /tmp/ray-grow-phrase-trigger-last

# ----------------------------------------------------------
echo ""
echo "--- 配置开关测试 ---"
# ----------------------------------------------------------

# memory.enabled=false should disable
OUT=$(run_hook "fixed" '{"memory":{"enabled":false}}')
assert_empty "$OUT" "配置: memory.enabled=false 禁用"

# evolve.enabled=false should disable
OUT=$(run_hook "fixed" '{"memory":{"enabled":true},"evolve":{"enabled":false}}')
assert_empty "$OUT" "配置: evolve.enabled=false 禁用"

# evolve.phrase_trigger=false should disable
OUT=$(run_hook "fixed" '{"memory":{"enabled":true},"evolve":{"enabled":true,"phrase_trigger":false}}')
assert_empty "$OUT" "配置: evolve.phrase_trigger=false 禁用"

# All enabled should work
OUT=$(run_hook "fixed" '{"memory":{"enabled":true},"evolve":{"enabled":true,"phrase_trigger":true}}')
assert_output_contains "$OUT" "Ray Grow" "配置: 全部启用正常触发"

# ----------------------------------------------------------
echo ""
echo "--- 输出格式测试 ---"
# ----------------------------------------------------------

OUT=$(run_hook "fixed")
assert_json "$OUT" "" "输出是合法 JSON"
assert_output_contains "$OUT" "hookSpecificOutput" "输出包含 hookSpecificOutput"
assert_output_contains "$OUT" "additionalContext" "输出包含 additionalContext"
assert_output_contains "$OUT" "grow-agent" "输出包含 agent 名称"

# ----------------------------------------------------------
echo ""
echo "--- 空消息 / 无 message 字段 ---"
# ----------------------------------------------------------

WORK_EMPTY="$TEST_DIR/empty"
mkdir -p "$WORK_EMPTY"
rm -f /tmp/ray-grow-phrase-trigger-last

OUT_EMPTY=$(cd "$WORK_EMPTY" && echo '{"tool_input":{}}' | bash "$HOOKS_DIR/grow-phrase-trigger.sh" 2>/dev/null || true)
assert_empty "$OUT_EMPTY" "空 tool_input 不触发"

OUT_EMPTY2=$(cd "$WORK_EMPTY" && echo '{}' | bash "$HOOKS_DIR/grow-phrase-trigger.sh" 2>/dev/null || true)
assert_empty "$OUT_EMPTY2" "空 JSON 不触发"

# ----------------------------------------------------------
echo ""
echo "=== Results: $PASS/$TOTAL passed, $FAIL failed ==="
[[ $FAIL -eq 0 ]] && exit 0 || exit 1
