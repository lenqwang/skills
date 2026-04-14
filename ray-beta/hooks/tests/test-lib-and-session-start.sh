#!/usr/bin/env bash
set -euo pipefail

PASS=0; FAIL=0; TOTAL=0
HOOKS_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TEST_DIR=$(mktemp -d)
trap 'rm -rf "$TEST_DIR"' EXIT

pass() { ((PASS++)); ((TOTAL++)); echo "  ✓ $1"; }
fail() { ((FAIL++)); ((TOTAL++)); echo "  ✗ $1"; }
assert_eq() {
  if [[ "$1" == "$2" ]]; then pass "$3"; else fail "$3 (expected: '$2', got: '$1')"; fi
}
assert_output_contains() {
  if echo "$1" | grep -q "$2" 2>/dev/null; then pass "$3"; else fail "$3 (expected: $2)"; fi
}
# Like assert_output_contains but decodes unicode escapes first (for JSON output with CJK)
assert_decoded_contains() {
  local decoded
  decoded=$(echo "$1" | python3 -c "import sys; print(sys.stdin.read().encode().decode('unicode_escape'))" 2>/dev/null || echo "$1")
  if echo "$decoded" | grep -q "$2" 2>/dev/null; then pass "$3"; else fail "$3 (expected: $2)"; fi
}
assert_empty() {
  if [[ -z "$1" ]]; then pass "$2"; else fail "$2 (got: '$1')"; fi
}
assert_json() {
  if echo "$1" | python3 -c "import sys,json; json.load(sys.stdin)" 2>/dev/null; then pass "$3"; else fail "$3"; fi
}

# Source the library
source "$HOOKS_DIR/_lib.sh"

# ============================================================
echo "=== Test: _lib.sh yaml_get ==="
echo ""
# ============================================================

# Create test YAML files
YAML_FILE="$TEST_DIR/test.md"

# --- Quoted values ---
echo "--- double quoted ---"
cat > "$YAML_FILE" << 'EOF'
---
rule: "quoted value"
name: 'single quoted'
bare: bare value
spaced:   extra spaces value
colon_val: "a: b"
chinese: "用英文写 commit"
empty1:
empty2: ""
number: 42
multi_word: hello world
---
EOF

assert_eq "$(yaml_get "$YAML_FILE" "rule")" "quoted value" "yaml_get: 双引号值"
assert_eq "$(yaml_get "$YAML_FILE" "name")" "single quoted" "yaml_get: 单引号值"
assert_eq "$(yaml_get "$YAML_FILE" "bare")" "bare value" "yaml_get: 裸值"
assert_eq "$(yaml_get "$YAML_FILE" "spaced")" "extra spaces value" "yaml_get: 多余空格"
assert_eq "$(yaml_get "$YAML_FILE" "colon_val")" "a: b" "yaml_get: 值包含冒号"
assert_eq "$(yaml_get "$YAML_FILE" "chinese")" "用英文写 commit" "yaml_get: 中文值"
assert_eq "$(yaml_get "$YAML_FILE" "empty1")" "" "yaml_get: 空值(无引号)"
assert_eq "$(yaml_get "$YAML_FILE" "empty2")" "" "yaml_get: 空值(空引号)"
assert_eq "$(yaml_get "$YAML_FILE" "number")" "42" "yaml_get: 数字值"
assert_eq "$(yaml_get "$YAML_FILE" "multi_word")" "hello world" "yaml_get: 多词裸值"

echo ""
echo "--- 不存在的字段 ---"
assert_eq "$(yaml_get "$YAML_FILE" "nonexistent")" "" "yaml_get: 不存在的字段返回空"
assert_eq "$(yaml_get "/nonexistent/file" "rule")" "" "yaml_get: 不存在的文件返回空"

# ============================================================
echo ""
echo "=== Test: _lib.sh jq_config ==="
echo ""
# ============================================================

echo "--- 正常读取 ---"
JQ_FILE="$TEST_DIR/config.json"

echo '{"memory":{"enabled":true}}' > "$JQ_FILE"
assert_eq "$(jq_config "$JQ_FILE" '.memory.enabled' 'false')" "true" "jq_config: boolean true"

echo '{"memory":{"enabled":false}}' > "$JQ_FILE"
assert_eq "$(jq_config "$JQ_FILE" '.memory.enabled' 'true')" "false" "jq_config: boolean false"

echo '{"memory":{"model":"opus"}}' > "$JQ_FILE"
assert_eq "$(jq_config "$JQ_FILE" '.memory.model' 'sonnet')" "opus" "jq_config: 字符串值"

echo ""
echo "--- 缺失字段用默认值 ---"
echo '{"memory":{}}' > "$JQ_FILE"
assert_eq "$(jq_config "$JQ_FILE" '.memory.enabled' 'true')" "true" "jq_config: 缺失字段用默认值"

echo '{}' > "$JQ_FILE"
assert_eq "$(jq_config "$JQ_FILE" '.memory.enabled' 'true')" "true" "jq_config: 空对象用默认值"

echo ""
echo "--- 非法 JSON 用默认值 ---"
echo 'not json at all' > "$JQ_FILE"
assert_eq "$(jq_config "$JQ_FILE" '.memory.enabled' 'fallback')" "fallback" "jq_config: 非法 JSON 用默认值"

echo ""
echo "--- 不存在文件用默认值 ---"
assert_eq "$(jq_config "/nonexistent.json" '.memory.enabled' 'default')" "default" "jq_config: 不存在文件用默认值"

echo ""
echo "--- 无 jq 用默认值 ---"
# Temporarily hide jq
ORIG_PATH="$PATH"
FAKE_BIN="$TEST_DIR/fake-bin"
mkdir -p "$FAKE_BIN"
# Create a PATH that excludes jq
NO_JQ_PATH=$(echo "$PATH" | tr ':' '\n' | while read -r p; do
  if [[ -x "$p/jq" ]]; then continue; fi
  echo "$p"
done | tr '\n' ':' | sed 's/:$//')
# But we still need bash and basic tools
echo '{"memory":{"enabled":true}}' > "$JQ_FILE"
RESULT=$(PATH="$NO_JQ_PATH" bash -c "source '$HOOKS_DIR/_lib.sh'; jq_config '$JQ_FILE' '.memory.enabled' 'nojq_default'" 2>/dev/null)
assert_eq "$RESULT" "nojq_default" "jq_config: 无 jq 时用默认值"

# ============================================================
echo ""
echo "=== Test: _lib.sh json_encode ==="
echo ""
# ============================================================

assert_eq "$(echo 'hello' | json_encode)" '"hello\n"' "json_encode: 简单字符串"
ENCODED=$(printf 'line1\nline2' | json_encode)
assert_output_contains "$ENCODED" "line1" "json_encode: 多行保留内容"
ENCODED_QUOTE=$(printf 'say "hi"' | json_encode)
assert_output_contains "$ENCODED_QUOTE" '\\"' "json_encode: 引号被转义"

# ============================================================
echo ""
echo "=== Test: _lib.sh safe_int ==="
echo ""
# ============================================================

assert_eq "$(safe_int "42")" "42" "safe_int: 正常数字"
assert_eq "$(safe_int "0")" "0" "safe_int: 零"
assert_eq "$(safe_int "")" "0" "safe_int: 空字符串返回默认值"
assert_eq "$(safe_int "abc")" "0" "safe_int: 非数字返回默认值"
assert_eq "$(safe_int "" 5)" "5" "safe_int: 自定义默认值"
assert_eq "$(safe_int "abc" 99)" "99" "safe_int: 非数字用自定义默认值"
assert_eq "$(safe_int "12abc")" "0" "safe_int: 混合字符串返回默认值"

# ============================================================
echo ""
echo "=== Test: _lib.sh output_context ==="
echo ""
# ============================================================

OUT=$(output_context "hello world")
assert_json "$OUT" "" "output_context: 输出是合法 JSON"
assert_output_contains "$OUT" "hookSpecificOutput" "output_context: 包含 hookSpecificOutput"
assert_output_contains "$OUT" "additionalContext" "output_context: 包含 additionalContext"
assert_output_contains "$OUT" "hello world" "output_context: 包含传入文本"

# 特殊字符
OUT2=$(output_context '包含 "引号" 和 换行')
assert_json "$OUT2" "" "output_context: 特殊字符仍为合法 JSON"

# ============================================================
echo ""
echo "=== Test: memory-session-start.sh ==="
echo ""
# ============================================================

echo "--- inject 模式：有记忆文件 ---"
WORK="$TEST_DIR/session-start-inject"
mkdir -p "$WORK/.ray/memory/l3-judgments" "$WORK/.ray/memory/l2-patterns" "$WORK/.ray/memory/l1-episodes"

# Create L3 judgment file
cat > "$WORK/.ray/memory/l3-judgments/always-use-pnpm.md" << 'EOF'
---
rule: "始终使用 pnpm 而非 npm"
confidence: 0.9
---
EOF

# Create L2 pattern file
cat > "$WORK/.ray/memory/l2-patterns/test-first.md" << 'EOF'
---
description: "先写测试再写实现"
pattern_type: "workflow"
strength: 3
---
EOF

# Create L1 episode file
cat > "$WORK/.ray/memory/l1-episodes/fix-ci.md" << 'EOF'
---
situation: "CI 因 node 版本不一致而失败"
strength: 2
verification: "CONFIRMED"
---
EOF

OUT=$(cd "$WORK" && bash "$HOOKS_DIR/memory-session-start.sh" 2>/dev/null || true)
assert_json "$OUT" "" "session-start inject: 输出是合法 JSON"
assert_decoded_contains "$OUT" "始终使用 pnpm" "session-start inject: 包含 L3 规则"
assert_decoded_contains "$OUT" "先写测试" "session-start inject: 包含 L2 模式"
assert_decoded_contains "$OUT" "CI 因 node" "session-start inject: 包含 L1 事件"
assert_output_contains "$OUT" "L3:1" "session-start inject: L3 计数正确"
assert_output_contains "$OUT" "L2:1" "session-start inject: L2 计数正确"
assert_output_contains "$OUT" "L1:1" "session-start inject: L1 计数正确"
assert_output_contains "$OUT" "inject" "session-start inject: 提及 inject 模式"

echo ""
echo "--- inject 模式：无记忆目录 ---"
WORK_EMPTY="$TEST_DIR/session-start-empty"
mkdir -p "$WORK_EMPTY"
OUT_EMPTY=$(cd "$WORK_EMPTY" && bash "$HOOKS_DIR/memory-session-start.sh" 2>/dev/null || true)
assert_empty "$OUT_EMPTY" "session-start inject: 无记忆目录时无输出"

echo ""
echo "--- inject 模式：有记忆目录但无文件 ---"
WORK_NO_FILES="$TEST_DIR/session-start-no-files"
mkdir -p "$WORK_NO_FILES/.ray/memory/l3-judgments" "$WORK_NO_FILES/.ray/memory/l2-patterns" "$WORK_NO_FILES/.ray/memory/l1-episodes"
OUT_NF=$(cd "$WORK_NO_FILES" && bash "$HOOKS_DIR/memory-session-start.sh" 2>/dev/null || true)
assert_empty "$OUT_NF" "session-start inject: 有目录无文件时无输出"

echo ""
echo "--- 配置开关 ---"
WORK_CFG="$TEST_DIR/session-start-cfg"
mkdir -p "$WORK_CFG/.ray/memory/l3-judgments"
cat > "$WORK_CFG/.ray/memory/l3-judgments/rule.md" << 'EOF'
---
rule: "test rule"
confidence: 0.8
---
EOF

# memory.enabled=false
mkdir -p "$WORK_CFG/.ray" && echo '{"memory":{"enabled":false}}' > "$WORK_CFG/.ray/config.json"
OUT_DISABLED=$(cd "$WORK_CFG" && bash "$HOOKS_DIR/memory-session-start.sh" 2>/dev/null || true)
assert_empty "$OUT_DISABLED" "session-start: memory.enabled=false 禁用"

# auto_recall=false
mkdir -p "$WORK_CFG/.ray" && echo '{"memory":{"enabled":true,"auto_recall":false}}' > "$WORK_CFG/.ray/config.json"
OUT_NO_RECALL=$(cd "$WORK_CFG" && bash "$HOOKS_DIR/memory-session-start.sh" 2>/dev/null || true)
assert_empty "$OUT_NO_RECALL" "session-start: auto_recall=false 禁用"

echo ""
echo "--- agent 模式 ---"
WORK_AGENT="$TEST_DIR/session-start-agent"
mkdir -p "$WORK_AGENT/.ray/memory/l1-episodes"
cat > "$WORK_AGENT/.ray/memory/l1-episodes/ep.md" << 'EOF'
---
situation: "test episode"
strength: 1
---
EOF
mkdir -p "$WORK_AGENT/.ray" && echo '{"memory":{"enabled":true,"auto_recall":true,"session_start_mode":"agent","model":"opus"}}' > "$WORK_AGENT/.ray/config.json"
OUT_AGENT=$(cd "$WORK_AGENT" && bash "$HOOKS_DIR/memory-session-start.sh" 2>/dev/null || true)
assert_json "$OUT_AGENT" "" "session-start agent: 输出是合法 JSON"
assert_output_contains "$OUT_AGENT" "mem-recall-agent" "session-start agent: 包含 agent 名称"
assert_output_contains "$OUT_AGENT" "opus" "session-start agent: 包含指定模型"

echo ""
echo "--- pending-gate 补偿 ---"
WORK_PENDING="$TEST_DIR/session-start-pending"
mkdir -p "$WORK_PENDING/.ray/memory/l3-judgments" "$WORK_PENDING/.ray/memory/l2-patterns" "$WORK_PENDING/.ray/memory/l1-episodes"
cat > "$WORK_PENDING/.ray/memory/l3-judgments/rule.md" << 'EOF'
---
rule: "always test"
confidence: 0.9
---
EOF
# Create a pending gate file
cat > "$WORK_PENDING/.ray/memory/.pending-gate.md" << 'EOF'
---
timestamp: "2025-01-01T00:00:00Z"
git_summary: |
  abc1234 fix: something
git_diff_stat: |
  1 file changed
distill: false
---
EOF

OUT_PENDING=$(cd "$WORK_PENDING" && bash "$HOOKS_DIR/memory-session-start.sh" 2>/dev/null || true)
assert_decoded_contains "$OUT_PENDING" "补偿执行" "session-start pending: 检测到 pending-gate"
assert_decoded_contains "$OUT_PENDING" "mem-gate-deferred" "session-start pending: 包含补偿 agent 名称"

# Pending file should be renamed to .processing
if [[ -f "$WORK_PENDING/.ray/memory/.pending-gate.processing" ]] && [[ ! -f "$WORK_PENDING/.ray/memory/.pending-gate.md" ]]; then
  pass "session-start pending: pending 文件重命名为 processing"
else
  fail "session-start pending: pending 文件重命名为 processing"
fi

# ============================================================
echo ""
echo "=== Results: $PASS/$TOTAL passed, $FAIL failed ==="
[[ $FAIL -eq 0 ]] && exit 0 || exit 1
