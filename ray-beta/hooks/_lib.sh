#!/usr/bin/env bash
# Ray Hooks 共享函数库
# source 引入：source "$(dirname "${BASH_SOURCE[0]}")/_lib.sh"

# --- Ray 路径常量（可被 .ray/config.json 的 paths 字段覆盖）---
RAY_CONFIG=".ray/config.json"
RAY_MEMORY_DIR=".ray/memory"


# 从 config.json 加载自定义路径（调用方 source _lib.sh 后自动生效）
if [[ -f "$RAY_CONFIG" ]] && command -v jq &>/dev/null; then
  _mem=$(jq -r '.paths.memory // empty' "$RAY_CONFIG" 2>/dev/null)
  [[ -n "$_mem" ]] && RAY_MEMORY_DIR="$_mem"
  unset _mem
fi

# --- YAML frontmatter 字段提取 ---
# 用法：yaml_get <file> <field>
# 支持：field: value / field: "value" / field: 'value'
# 空格数量不敏感，引号可选
yaml_get() {
  local file="$1" field="$2"
  # 匹配 field: 后面跟任意空格，然后是可选引号包裹的值
  grep -m1 "^${field}:" "$file" 2>/dev/null \
    | sed -E "s/^${field}:[[:space:]]*//" \
    | sed -E 's/^["'"'"']//;s/["'"'"']$//' \
    | sed 's/[[:space:]]*$//'
}

# --- jq 配置读取 ---
# 用法：jq_config <file> <path> <default>
# 正确处理 true/false/null，不依赖 // 运算符
jq_config() {
  local file="$1" path="$2" default="$3"
  if ! command -v jq &>/dev/null; then
    echo "$default"
    return
  fi
  local val
  val=$(jq -r "($path | if . == null then \"__NULL__\" else . end) | tostring" "$file" 2>/dev/null) || val="__NULL__"
  if [[ "$val" == "__NULL__" ]]; then
    echo "$default"
  else
    echo "$val"
  fi
}

# --- 安全 JSON 字符串编码 ---
# 用法：json_encode <<< "$text" 或 echo "$text" | json_encode
json_encode() {
  if command -v python3 &>/dev/null; then
    python3 -c 'import sys,json; print(json.dumps(sys.stdin.read()))' 2>/dev/null
  else
    # 纯 bash 回退：转义关键字符
    local input
    input=$(cat)
    input="${input//\\/\\\\}"    # \ -> \\
    input="${input//\"/\\\"}"    # " -> \"
    input="${input//$'\n'/\\n}"  # newline -> \n
    input="${input//$'\t'/\\t}"  # tab -> \t
    input="${input//$'\r'/\\r}"  # cr -> \r
    printf '"%s"' "$input"
  fi
}

# --- 输出 additionalContext JSON ---
# 用法：output_context "$text"
output_context() {
  local ctx_json
  ctx_json=$(printf '%s' "$1" | json_encode)
  cat <<HOOKEOF
{
  "hookSpecificOutput": {
    "additionalContext": $ctx_json
  }
}
HOOKEOF
}

# --- 安全的文件列表（避免 glob + pipefail 问题） ---
# 用法：safe_ls_md <dir> [-t] [head_n]
# 返回：每行一个文件路径
safe_ls_md() {
  local dir="$1" sort_flag="${2:-}" head_n="${3:-0}"
  if [[ ! -d "$dir" ]]; then return; fi
  local cmd="find '$dir' -maxdepth 1 -name '*.md' -type f"
  if [[ "$sort_flag" == "-t" ]]; then
    cmd="$cmd -exec stat -f '%m %N' {} + 2>/dev/null | sort -rn | cut -d' ' -f2-"
  fi
  if [[ "$head_n" -gt 0 ]]; then
    eval "$cmd" | head -"$head_n"
  else
    eval "$cmd"
  fi
}

# --- 蒸馏条件检查 ---
# 用法：should_distill → exit 0 = 应该蒸馏，exit 1 = 跳过
# 条件：L1 >= 10 条 且 距上次蒸馏 >= 24h（或从未蒸馏）
# 可通过 distill_on_session_end=true 强制触发，=false 强制关闭
should_distill() {
  local memory_dir="${1:-$RAY_MEMORY_DIR}"
  local force="${2:-auto}"  # true | false | auto

  # 强制开关
  if [[ "$force" == "false" ]]; then return 1; fi
  if [[ "$force" == "true" ]]; then return 0; fi

  # auto 模式：检查条件
  local l1_dir="$memory_dir/l1-episodes"
  if [[ ! -d "$l1_dir" ]]; then return 1; fi

  # 条件 1：L1 数量 >= 10
  local l1_count
  l1_count=$(find "$l1_dir" -maxdepth 1 -name '*.md' -type f 2>/dev/null | wc -l | tr -d ' ')
  if [[ $(safe_int "$l1_count" 0) -lt 10 ]]; then return 1; fi

  # 条件 2：距上次蒸馏 >= 24h
  local marker="$memory_dir/.last-distill"
  if [[ -f "$marker" ]]; then
    local last_ts
    last_ts=$(safe_int "$(cat "$marker" 2>/dev/null)" 0)
    local now
    now=$(date +%s)
    local hours_since=$(( (now - last_ts) / 3600 ))
    if [[ $hours_since -lt 24 ]]; then return 1; fi
  fi

  return 0
}

# --- 记录蒸馏时间戳 ---
mark_distill_done() {
  local memory_dir="${1:-$RAY_MEMORY_DIR}"
  mkdir -p "$memory_dir"
  date +%s > "$memory_dir/.last-distill"
}

# --- 安全算术比较（防止空值/非数字） ---
# 用法：safe_int "$var" [default]
safe_int() {
  local val="$1" default="${2:-0}"
  if [[ "$val" =~ ^[0-9]+$ ]]; then
    echo "$val"
  else
    echo "$default"
  fi
}
