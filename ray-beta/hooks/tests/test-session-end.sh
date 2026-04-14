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
assert_file_exists() {
  if [[ -f "$1" ]]; then pass "$2"; else fail "$2 (file not found: $1)"; fi
}
assert_file_not_exists() {
  if [[ ! -f "$1" ]]; then pass "$2"; else fail "$2 (file exists: $1)"; fi
}
assert_file_contains() {
  if grep -q "$2" "$1" 2>/dev/null; then pass "$3"; else fail "$3 (expected '$2' in $1)"; fi
}

# Helper: set up a git repo with commits so the script has git log output
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
  echo "change1" >> file.txt
  git add file.txt
  git commit -q -m "fix: first fix"
  echo "change2" >> file.txt
  git add file.txt
  git commit -q -m "feat: second feature"
}

# ============================================================
echo "=== Test: memory-session-end.sh ==="
echo ""
# ============================================================

# ----------------------------------------------------------
echo "--- skip 模式（默认）---"
# ----------------------------------------------------------
WORK="$TEST_DIR/skip-mode"
setup_git_work "$WORK"
# No config file = defaults (session_end_mode=skip)
OUT=$(cd "$WORK" && bash "$HOOKS_DIR/memory-session-end.sh" 2>/dev/null || true)
assert_empty "$OUT" "skip 模式: 无输出"
assert_file_not_exists "$WORK/.ray/memory/.pending-gate.md" "skip 模式: 不创建 pending 文件"

# Explicit skip config
WORK_SKIP2="$TEST_DIR/skip-mode-explicit"
setup_git_work "$WORK_SKIP2"
mkdir -p "$WORK_SKIP2/.ray" && echo '{"memory":{"enabled":true,"session_end_mode":"skip"}}' > "$WORK_SKIP2/.ray/config.json"
OUT_SKIP2=$(cd "$WORK_SKIP2" && bash "$HOOKS_DIR/memory-session-end.sh" 2>/dev/null || true)
assert_empty "$OUT_SKIP2" "skip 模式(显式): 无输出"

# ----------------------------------------------------------
echo ""
echo "--- memory.enabled=false ---"
# ----------------------------------------------------------
WORK_DIS="$TEST_DIR/disabled"
setup_git_work "$WORK_DIS"
mkdir -p "$WORK_DIS/.ray" && echo '{"memory":{"enabled":false,"session_end_mode":"defer"}}' > "$WORK_DIS/.ray/config.json"
OUT_DIS=$(cd "$WORK_DIS" && bash "$HOOKS_DIR/memory-session-end.sh" 2>/dev/null || true)
assert_empty "$OUT_DIS" "disabled: memory.enabled=false 不执行"

# ----------------------------------------------------------
echo ""
echo "--- defer 模式 ---"
# ----------------------------------------------------------
WORK_DEFER="$TEST_DIR/defer-mode"
setup_git_work "$WORK_DEFER"
mkdir -p "$WORK_DEFER/.ray" && echo '{"memory":{"enabled":true,"session_end_mode":"defer"}}' > "$WORK_DEFER/.ray/config.json"
OUT_DEFER=$(cd "$WORK_DEFER" && bash "$HOOKS_DIR/memory-session-end.sh" 2>/dev/null || true)
assert_empty "$OUT_DEFER" "defer 模式: 无 stdout 输出"
assert_file_exists "$WORK_DEFER/.ray/memory/.pending-gate.md" "defer 模式: 创建 pending 文件"

# Verify pending file content
assert_file_contains "$WORK_DEFER/.ray/memory/.pending-gate.md" "timestamp" "defer 模式: pending 包含 timestamp"
assert_file_contains "$WORK_DEFER/.ray/memory/.pending-gate.md" "git_summary" "defer 模式: pending 包含 git_summary"
assert_file_contains "$WORK_DEFER/.ray/memory/.pending-gate.md" "git_diff_stat" "defer 模式: pending 包含 git_diff_stat"
assert_file_contains "$WORK_DEFER/.ray/memory/.pending-gate.md" "distill" "defer 模式: pending 包含 distill"

# ----------------------------------------------------------
echo ""
echo "--- defer 模式 + distill ---"
# ----------------------------------------------------------
WORK_DEFER_D="$TEST_DIR/defer-distill"
setup_git_work "$WORK_DEFER_D"
mkdir -p "$WORK_DEFER_D/.ray" && echo '{"memory":{"enabled":true,"session_end_mode":"defer","distill_on_session_end":true}}' > "$WORK_DEFER_D/.ray/config.json"
OUT_DEFER_D=$(cd "$WORK_DEFER_D" && bash "$HOOKS_DIR/memory-session-end.sh" 2>/dev/null || true)
assert_file_exists "$WORK_DEFER_D/.ray/memory/.pending-gate.md" "defer+distill: 创建 pending 文件"
assert_file_contains "$WORK_DEFER_D/.ray/memory/.pending-gate.md" "distill: true" "defer+distill: distill 标记为 true"

# ----------------------------------------------------------
echo ""
echo "--- defer 模式：无 git commit 时不写 pending ---"
# ----------------------------------------------------------
WORK_NOGIT="$TEST_DIR/no-git"
mkdir -p "$WORK_NOGIT"
mkdir -p "$WORK_NOGIT/.ray" && echo '{"memory":{"enabled":true,"session_end_mode":"defer"}}' > "$WORK_NOGIT/.ray/config.json"
OUT_NOGIT=$(cd "$WORK_NOGIT" && bash "$HOOKS_DIR/memory-session-end.sh" 2>/dev/null || true)
assert_empty "$OUT_NOGIT" "无 git: 不输出"

# ----------------------------------------------------------
echo ""
echo "--- agent 模式降级：无 CLI 可用 ---"
# ----------------------------------------------------------
WORK_AGENT="$TEST_DIR/agent-fallback"
setup_git_work "$WORK_AGENT"
mkdir -p "$WORK_AGENT/.ray" && echo '{"memory":{"enabled":true,"session_end_mode":"agent"}}' > "$WORK_AGENT/.ray/config.json"

# Create a restricted PATH that has basic tools but no claude/codex
RESTRICTED_PATH=""
for p in /usr/bin /bin /usr/sbin /sbin; do
  [[ -d "$p" ]] && RESTRICTED_PATH="${RESTRICTED_PATH:+$RESTRICTED_PATH:}$p"
done
# Also need git and python3
for cmd in git python3; do
  cmd_path=$(command -v "$cmd" 2>/dev/null || true)
  if [[ -n "$cmd_path" ]]; then
    cmd_dir=$(dirname "$cmd_path")
    if [[ ":$RESTRICTED_PATH:" != *":$cmd_dir:"* ]]; then
      RESTRICTED_PATH="${RESTRICTED_PATH}:${cmd_dir}"
    fi
  fi
done
# Need jq too
jq_path=$(command -v jq 2>/dev/null || true)
if [[ -n "$jq_path" ]]; then
  jq_dir=$(dirname "$jq_path")
  if [[ ":$RESTRICTED_PATH:" != *":$jq_dir:"* ]]; then
    RESTRICTED_PATH="${RESTRICTED_PATH}:${jq_dir}"
  fi
fi

OUT_AGENT=$(cd "$WORK_AGENT" && PATH="$RESTRICTED_PATH" bash "$HOOKS_DIR/memory-session-end.sh" 2>/dev/null || true)
assert_empty "$OUT_AGENT" "agent 降级: 无 CLI 时无 stdout"
assert_file_exists "$WORK_AGENT/.ray/memory/.pending-gate.md" "agent 降级: 降级为 defer, 创建 pending 文件"
assert_file_contains "$WORK_AGENT/.ray/memory/.pending-gate.md" "fallback_reason" "agent 降级: pending 包含 fallback_reason"
assert_file_contains "$WORK_AGENT/.ray/memory/.pending-gate.md" "no agent CLI" "agent 降级: fallback_reason 说明原因"

# ----------------------------------------------------------
echo ""
echo "--- agent 模式：自定义 agent_command ---"
# ----------------------------------------------------------
WORK_CUSTOM="$TEST_DIR/agent-custom"
setup_git_work "$WORK_CUSTOM"
# Use a custom command that just writes a marker file
mkdir -p "$WORK_CUSTOM/.ray" && echo "{\"memory\":{\"enabled\":true,\"session_end_mode\":\"agent\",\"agent_command\":\"touch '$WORK_CUSTOM/agent-ran.marker'\"}}" > "$WORK_CUSTOM/.ray/config.json"
OUT_CUSTOM=$(cd "$WORK_CUSTOM" && bash "$HOOKS_DIR/memory-session-end.sh" 2>/dev/null || true)
# Wait a moment for the background process
sleep 2
assert_file_exists "$WORK_CUSTOM/agent-ran.marker" "agent 自定义: 自定义命令被执行"

# ----------------------------------------------------------
echo ""
echo "--- agent 模式：环境变量传递 ---"
# ----------------------------------------------------------
WORK_ENV="$TEST_DIR/agent-env"
setup_git_work "$WORK_ENV"
mkdir -p "$WORK_ENV/.ray"
# Write config with a command that dumps env vars to a file
ENV_MARKER="$WORK_ENV/env-check.txt"
python3 -c "
import json
cfg = {'memory': {'enabled': True, 'session_end_mode': 'agent', 'model': 'opus',
       'agent_command': 'echo MODEL=\$RAY_GATE_MODEL PROMPT=\$RAY_GATE_PROMPT_FILE > \"$ENV_MARKER\"'}}
print(json.dumps(cfg))
" > "$WORK_ENV/.ray/config.json"
OUT_ENV=$(cd "$WORK_ENV" && bash "$HOOKS_DIR/memory-session-end.sh" 2>/dev/null || true)
sleep 2
assert_file_exists "$ENV_MARKER" "agent 环境变量: 文件被创建"
if [[ -f "$ENV_MARKER" ]]; then
  assert_file_contains "$ENV_MARKER" "MODEL=opus" "agent 环境变量: RAY_GATE_MODEL 正确"
  assert_file_contains "$ENV_MARKER" "PROMPT=/tmp/ray-gate-prompt" "agent 环境变量: RAY_GATE_PROMPT_FILE 路径正确"
fi

# ----------------------------------------------------------
echo ""
echo "--- 记忆目录自动创建 ---"
# ----------------------------------------------------------
WORK_MKDIR="$TEST_DIR/mkdir-test"
setup_git_work "$WORK_MKDIR"
mkdir -p "$WORK_MKDIR/.ray" && echo '{"memory":{"enabled":true,"session_end_mode":"defer"}}' > "$WORK_MKDIR/.ray/config.json"
# No .ray/memory directory exists yet
OUT_MKDIR=$(cd "$WORK_MKDIR" && bash "$HOOKS_DIR/memory-session-end.sh" 2>/dev/null || true)
if [[ -d "$WORK_MKDIR/.ray/memory/l1-episodes" ]] && [[ -d "$WORK_MKDIR/.ray/memory/l2-patterns" ]] && [[ -d "$WORK_MKDIR/.ray/memory/l3-judgments" ]]; then
  pass "记忆目录: l1/l2/l3 子目录自动创建"
else
  fail "记忆目录: l1/l2/l3 子目录自动创建"
fi

# ============================================================
echo ""
echo "=== Results: $PASS/$TOTAL passed, $FAIL failed ==="
[[ $FAIL -eq 0 ]] && exit 0 || exit 1
