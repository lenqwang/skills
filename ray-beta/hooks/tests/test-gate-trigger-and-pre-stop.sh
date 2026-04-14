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
assert_decoded_contains() {
  local decoded
  decoded=$(echo "$1" | python3 -c "import sys; print(sys.stdin.read().encode().decode('unicode_escape'))" 2>/dev/null || echo "$1")
  if echo "$decoded" | grep -q "$2" 2>/dev/null; then pass "$3"; else fail "$3 (expected: $2)"; fi
}

# Helper: set up a git repo
setup_git_work() {
  local dir="$1"
  mkdir -p "$dir"
  cd "$dir"
  git init -q
  git config user.email "test@test.com"
  git config user.name "Test"
  echo "init" > file.txt
  git add file.txt
  git commit -q -m "feat: initial commit"
}

# ============================================================
echo "=== Test: memory-gate-trigger.sh ==="
echo ""
# ============================================================

# ----------------------------------------------------------
echo "--- 默认配置（启用）---"
# ----------------------------------------------------------
WORK="$TEST_DIR/gate-default"
setup_git_work "$WORK"
mkdir -p "$WORK/.ray/memory"
OUT=$(cd "$WORK" && bash "$HOOKS_DIR/memory-gate-trigger.sh" 2>/dev/null || true)
assert_json "$OUT" "" "gate-trigger 默认: 输出是合法 JSON"
assert_output_contains "$OUT" "hookSpecificOutput" "gate-trigger 默认: 包含 hookSpecificOutput"
assert_output_contains "$OUT" "additionalContext" "gate-trigger 默认: 包含 additionalContext"
assert_decoded_contains "$OUT" "mem-gate-agent" "gate-trigger 默认: 包含 agent 名称"
assert_decoded_contains "$OUT" "Ray Memory Gate" "gate-trigger 默认: 包含 Ray Memory Gate"
assert_decoded_contains "$OUT" "commit" "gate-trigger 默认: 提及 commit"

# ----------------------------------------------------------
echo ""
echo "--- 包含 gate 模板 ---"
# ----------------------------------------------------------
# The script reads _gate-prompt-template.txt if it exists
if [[ -f "$HOOKS_DIR/_gate-prompt-template.txt" ]]; then
  assert_decoded_contains "$OUT" "L0 Gate" "gate-trigger: 输出包含 gate 模板内容"
  assert_decoded_contains "$OUT" "DROP" "gate-trigger: 输出包含 DROP 规则"
  assert_decoded_contains "$OUT" "PASS" "gate-trigger: 输出包含 PASS 规则"
fi

# ----------------------------------------------------------
echo ""
echo "--- 自定义模型 ---"
# ----------------------------------------------------------
WORK_MODEL="$TEST_DIR/gate-model"
setup_git_work "$WORK_MODEL"
mkdir -p "$WORK_MODEL/.ray/memory"
mkdir -p "$WORK_MODEL/.ray" && echo '{"memory":{"enabled":true,"gate_on_commit":true,"model":"opus"}}' > "$WORK_MODEL/.ray/config.json"
OUT_MODEL=$(cd "$WORK_MODEL" && bash "$HOOKS_DIR/memory-gate-trigger.sh" 2>/dev/null || true)
assert_decoded_contains "$OUT_MODEL" "opus" "gate-trigger 模型: 使用指定模型 opus"

# ----------------------------------------------------------
echo ""
echo "--- 配置禁用 ---"
# ----------------------------------------------------------
WORK_DIS1="$TEST_DIR/gate-dis1"
setup_git_work "$WORK_DIS1"
mkdir -p "$WORK_DIS1/.ray" && echo '{"memory":{"enabled":false}}' > "$WORK_DIS1/.ray/config.json"
OUT_DIS1=$(cd "$WORK_DIS1" && bash "$HOOKS_DIR/memory-gate-trigger.sh" 2>/dev/null || true)
assert_empty "$OUT_DIS1" "gate-trigger: memory.enabled=false 禁用"

WORK_DIS2="$TEST_DIR/gate-dis2"
setup_git_work "$WORK_DIS2"
mkdir -p "$WORK_DIS2/.ray" && echo '{"memory":{"enabled":true,"gate_on_commit":false}}' > "$WORK_DIS2/.ray/config.json"
OUT_DIS2=$(cd "$WORK_DIS2" && bash "$HOOKS_DIR/memory-gate-trigger.sh" 2>/dev/null || true)
assert_empty "$OUT_DIS2" "gate-trigger: gate_on_commit=false 禁用"

# ----------------------------------------------------------
echo ""
echo "--- 无记忆目录时自动创建 ---"
# ----------------------------------------------------------
WORK_NODIR="$TEST_DIR/gate-nodir"
setup_git_work "$WORK_NODIR"
cd "$WORK_NODIR" && bash "$HOOKS_DIR/memory-gate-trigger.sh" 2>/dev/null > /dev/null || true
if [[ -d "$WORK_NODIR/.ray/memory/l1-episodes" ]] && [[ -d "$WORK_NODIR/.ray/memory/l2-patterns" ]] && [[ -d "$WORK_NODIR/.ray/memory/l3-judgments" ]]; then
  pass "gate-trigger: 自动创建 l1/l2/l3 目录"
else
  fail "gate-trigger: 自动创建 l1/l2/l3 目录"
fi

# ============================================================
echo ""
echo "=== Test: memory-pre-stop.sh ==="
echo ""
# ============================================================

# Clean up throttle file
rm -f /tmp/ray-memory-stop-*.lock

# ----------------------------------------------------------
echo "--- stop 模式启用 ---"
# ----------------------------------------------------------
WORK_STOP="$TEST_DIR/pre-stop-enabled"
setup_git_work "$WORK_STOP"
mkdir -p "$WORK_STOP/.ray" && echo '{"memory":{"enabled":true,"session_end_mode":"stop"}}' > "$WORK_STOP/.ray/config.json"
OUT_STOP=$(cd "$WORK_STOP" && bash "$HOOKS_DIR/memory-pre-stop.sh" 2>/dev/null || true)
assert_json "$OUT_STOP" "" "pre-stop 启用: 输出是合法 JSON"
assert_output_contains "$OUT_STOP" "hookSpecificOutput" "pre-stop 启用: 包含 hookSpecificOutput"
assert_output_contains "$OUT_STOP" "additionalContext" "pre-stop 启用: 包含 additionalContext"
assert_decoded_contains "$OUT_STOP" "Ray Memory Gate" "pre-stop 启用: 包含 Ray Memory Gate"
assert_decoded_contains "$OUT_STOP" "L0 Gate" "pre-stop 启用: 包含 Gate 评估指引"
assert_decoded_contains "$OUT_STOP" "DROP" "pre-stop 启用: 包含 DROP 规则"
assert_decoded_contains "$OUT_STOP" "PASS" "pre-stop 启用: 包含 PASS 规则"

# ----------------------------------------------------------
echo ""
echo "--- pre-stop 配置禁用 ---"
# ----------------------------------------------------------
WORK_STOP_DIS="$TEST_DIR/pre-stop-disabled"
setup_git_work "$WORK_STOP_DIS"
mkdir -p "$WORK_STOP_DIS/.ray" && echo '{"memory":{"enabled":false,"session_end_mode":"stop"}}' > "$WORK_STOP_DIS/.ray/config.json"
OUT_STOP_DIS=$(cd "$WORK_STOP_DIS" && bash "$HOOKS_DIR/memory-pre-stop.sh" 2>/dev/null || true)
assert_empty "$OUT_STOP_DIS" "pre-stop: memory.enabled=false 禁用"

# session_end_mode != stop
WORK_STOP_SKIP="$TEST_DIR/pre-stop-skip"
setup_git_work "$WORK_STOP_SKIP"
mkdir -p "$WORK_STOP_SKIP/.ray" && echo '{"memory":{"enabled":true,"session_end_mode":"defer"}}' > "$WORK_STOP_SKIP/.ray/config.json"
OUT_STOP_SKIP=$(cd "$WORK_STOP_SKIP" && bash "$HOOKS_DIR/memory-pre-stop.sh" 2>/dev/null || true)
assert_empty "$OUT_STOP_SKIP" "pre-stop: session_end_mode=defer 不触发"

# No config (default session_end_mode=defer in pre-stop)
WORK_STOP_DEF="$TEST_DIR/pre-stop-default"
setup_git_work "$WORK_STOP_DEF"
OUT_STOP_DEF=$(cd "$WORK_STOP_DEF" && bash "$HOOKS_DIR/memory-pre-stop.sh" 2>/dev/null || true)
assert_empty "$OUT_STOP_DEF" "pre-stop: 默认 session_end_mode=defer 不触发"

# ----------------------------------------------------------
echo ""
echo "--- pre-stop 节流 ---"
# ----------------------------------------------------------
rm -f /tmp/ray-memory-stop-*.lock

WORK_THROTTLE="$TEST_DIR/pre-stop-throttle"
setup_git_work "$WORK_THROTTLE"
mkdir -p "$WORK_THROTTLE/.ray" && echo '{"memory":{"enabled":true,"session_end_mode":"stop"}}' > "$WORK_THROTTLE/.ray/config.json"

# First call should produce output
OUT_T1=$(cd "$WORK_THROTTLE" && bash "$HOOKS_DIR/memory-pre-stop.sh" 2>/dev/null || true)
assert_output_contains "$OUT_T1" "hookSpecificOutput" "pre-stop 节流: 第一次有输出"

# Second call within 5min should be throttled
OUT_T2=$(cd "$WORK_THROTTLE" && bash "$HOOKS_DIR/memory-pre-stop.sh" 2>/dev/null || true)
assert_empty "$OUT_T2" "pre-stop 节流: 5分钟内第二次被节流"

# Clean up
rm -f /tmp/ray-memory-stop-*.lock

# ----------------------------------------------------------
echo ""
echo "--- pre-stop 记忆目录自动创建 ---"
# ----------------------------------------------------------
WORK_STOP_MKDIR="$TEST_DIR/pre-stop-mkdir"
setup_git_work "$WORK_STOP_MKDIR"
mkdir -p "$WORK_STOP_MKDIR/.ray" && echo '{"memory":{"enabled":true,"session_end_mode":"stop"}}' > "$WORK_STOP_MKDIR/.ray/config.json"
cd "$WORK_STOP_MKDIR" && bash "$HOOKS_DIR/memory-pre-stop.sh" 2>/dev/null > /dev/null || true
if [[ -d "$WORK_STOP_MKDIR/.ray/memory/l1-episodes" ]]; then
  pass "pre-stop: 自动创建记忆目录"
else
  fail "pre-stop: 自动创建记忆目录"
fi

# Clean up
rm -f /tmp/ray-memory-stop-*.lock

# ============================================================
echo ""
echo "=== Results: $PASS/$TOTAL passed, $FAIL failed ==="
[[ $FAIL -eq 0 ]] && exit 0 || exit 1
