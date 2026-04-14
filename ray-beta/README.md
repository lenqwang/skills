# Ray Beta

Agent 驱动的开发流水线，内置记忆蒸馏系统。

## 工作原理

需求进，生产级代码 + 记忆出。每次开发都让下一次更好。

```
propose (PM) ──┐                              ┌─ mem-recall (自动激活记忆)
               ├──→ trace-persist → pipeline → architect → qa + coder → audit → update-map → ship
trace   (Dev) ─┘                       │                       │           │
                                     guard               mem-gate ←── grow
                                   (编辑守护)           (信号过滤)    (经验提取)
                                                              ↓
                                                        mem-distill
                                                     (L1 → L2 → L3 蒸馏)
```

## 记忆蒸馏系统

四层架构，从交互中自动积累经验，而非每次从零开始。

```
/mem-gate（交互信号） ──┐
                        ├──→ L1 Episodes ──→ L2 Patterns ──→ L3 Judgments
/grow（工程经验）   ────┘         ↑                 ↑               ↑
                            衰减清理           聚类/加速晋升    5+证据+14天
                                                      ↓
                                                 /mem-recall
                                              (激活 → 指导实践)
```

| 层级 | 内容 | 生命周期 |
|------|------|---------|
| **L1 Episode** | 具体事件（gate）和工程经验（grow） | 衰减半衰期 46h~346h |
| **L2 Pattern** | 从 3+ 条 L1 聚类的抽象模式 | 可迁移，不绑定具体技术 |
| **L3 Judgment** | 从 L2 晋升的决策规则 | 稳定层，需经历矛盾验证 |

两个写入源统一存储，`source` 字段区分：

| 来源 | Skill | 写入类型 | 视角 |
|------|-------|---------|------|
| 交互信号 | `/mem-gate` | discovery, decision, correction, preference | "发生了什么" |
| 工程经验 | `/grow` | pattern, pitfall, skill-gap, optimization, convention | "怎么解决" |

高频经验加速晋升为 L2 Pattern，而非建议修改 CLAUDE.md。系统自己决定什么规则足够稳定。

详细文档：[docs/memory-distillation.md](docs/memory-distillation.md) | [docs/skill-evolution.md](docs/skill-evolution.md)

## 安装

### Claude Code

```bash
# 通过 AIMarkt 市场安装
claude plugin marketplace add https://aimarkt.fulltrust.link/marketplace.git
claude plugin install ray-beta@aimarkt-marketplace
```

### Cursor

```bash
git clone -b beta https://oauth2:glpat-uvUwb4O4ex5yHz0lSSfbe286MQp1OmxpCA.01.0y0o7k437@git.fulltrust.link/fe/ai-plugin-ray.git ~/.cursor/ray-beta
mkdir -p .cursor/skills && cp -r ~/.cursor/ray-beta/skills .cursor/skills/ray-beta
```

### Codex

```bash
git clone -b beta https://oauth2:glpat-uvUwb4O4ex5yHz0lSSfbe286MQp1OmxpCA.01.0y0o7k437@git.fulltrust.link/fe/ai-plugin-ray.git ~/.codex/ray-beta
mkdir -p ~/.agents/skills && ln -s ~/.codex/ray-beta/skills ~/.agents/skills/ray-beta
```

## Skills

### Intake

| Skill | 使用者 | 职责 |
|-------|--------|------|
| `/propose` | PM | 前提质疑 + 产品语言需求描述 |
| `/trace` | 开发者 | 技术影响分析、组件级评估 |

### Pipeline

| Skill | 职责 |
|-------|------|
| `/pipeline` | 总调度器，按复杂度自适应（PATCH / FEATURE / REFACTOR） |
| `/architect` | OpenSpec 类型合约 + 不变式 + FSM + 故障旅程 |
| `/qa` | TDD 测试套件 + API mock |
| `/coder` | 自愈循环 + 测试基线 + 自适应升级 + 根因分析 |
| `/audit` | 置信度评分 + 证据链审计 |
| `/update-map` | 活文档更新 |
| `/ship` | PR/MR + changelog |
| `/guard` | 编辑范围限制 + 危险命令拦截 |

### Memory

| Skill | 职责 | 触发 |
|-------|------|------|
| `/mem-recall` | 三层记忆检索，L3 优先 | **自动**：Skill 执行前 / SessionStart |
| `/mem-gate` | L0 信号过滤，写入 L1 (source: "gate") | **自动**：git commit / SessionEnd |
| `/mem-distill` | 蒸馏 L1→L2→L3 + 经验健康度检查 | **条件自动**：L1 >= 10 且距上次 >= 24h / 手动 |
| `/mem-migrate` | 从 trace 文件批量萃取 L1→L2→L3 记忆 | **手动**：项目已有 trace 但无记忆层时 |
| `/grow` | 工程经验提取，写入 L1 (source: "grow") | **自动**：短语检测 / Pipeline Phase 6.5 |

### Docs

| Skill | 职责 |
|-------|------|
| `/origin` | 活文档引导 |
| `/migrate` | 文档迁移 |
| `/digest` | 碎片归纳 |
| `/explore` | 项目全景 |

## 快速开始

### 开发流水线

```bash
/trace 用户希望在首页看到实时价格   # 需求分析
/pipeline                           # 启动流水线（自动 recall → architect → qa → coder → audit → ship）
```

### 记忆系统手动触发

以下演示记忆的完整生命周期：写入 → 召回 → 蒸馏 → 进化。

**1. 写入信号 — 评估当前交互并记录到 L1**

```bash
/mem-gate
```

> gate 评估当前会话中的交互信号密度（4 维度 1-5 分），过滤噪声，将有价值的决策、纠正、偏好、发现写入 `.ray/memory/l1-episodes/ep-{date}-{slug}.md`（source: "gate"）。通常由 git commit 自动触发，也可手动运行。

**2. 提取经验 — 将本次工作沉淀为 L1**

```bash
/grow
```

> grow 扫描本次会话的 git diff、错误、决策，提取 pattern / pitfall / skill-gap 等经验，写入 L1（source: "grow"）。通常由完成/决策短语自动触发。

**3. 激活记忆 — 检索与当前任务相关的历史经验**

```bash
/mem-recall
```

> recall 从 L3 → L2 → L1 三层同时匹配，最多激活 3 条。被激活的记忆 strength +0.1，未使用的自然衰减。

也可以指定上下文精确匹配：

```bash
/mem-recall SSE streaming React
```

**4. 蒸馏 — 将 L1 聚类为 L2，L2 晋升为 L3**

```bash
/mem-distill
```

> 执行完整的 Sleep Cycle：L1 衰减清理 → 聚类 → L2 Pattern 提取 → L3 晋升检查 → 高频经验加速晋升。输出蒸馏报告。条件自动触发（L1 >= 10 且距上次 >= 24h），也可手动运行。

**5. 批量迁移 — 从已有 trace 文件萃取记忆**

```bash
/mem-migrate
```

> 扫描 `docs/traces/` 下的 trace 文件，AI 自主评估信号密度，并行提取决策信号写入 L1，然后执行增强蒸馏（放宽历史数据阈值）生成 L2 Pattern 和 L3 Judgment。适用于项目已有 trace 文档但尚未建立记忆层的场景。

也可以指定范围：

```bash
/mem-migrate docs/traces/FEAT-xxx.md   # 只处理单个文件
/mem-migrate --dry-run                  # 只预览迁移计划，不写入
```

**6. 查看当前记忆状态**

```bash
ls .ray/memory/l1-episodes/   # 查看 L1（gate + grow + migrate 的具体事件）
ls .ray/memory/l2-patterns/   # 查看 L2（从 L1 聚类的抽象模式）
ls .ray/memory/l3-judgments/  # 查看 L3（从 L2 晋升的决策规则）
```

### 自动触发（无需手动操作）

以上操作在日常开发中**全部自动**：
- **SessionStart** → 自动注入记忆摘要
- **Skill 执行前** → 自动 `/mem-recall`
- **git commit** → 自动 `/mem-gate` 写入 L1
- **说"搞定了"/"fixed"** → 自动 `/grow` 提取经验
- **Pipeline Phase 6.5** → 自动 `/mem-gate` + `/grow`

## 配置

通过 `.ray/config.json` 控制（建议提交到代码库，记忆和决策是项目级知识）：

```json
{
  "paths": {
    "memory": ".ray/memory"
  },
  "memory": {
    "enabled": true,
    "auto_recall": true,
    "session_start_mode": "inject",
    "session_end_mode": "stop",
    "gate_on_commit": true,
    "distill_on_session_end": "auto",
    "model": "sonnet",
    "agent_command": ""
  },
  "evolve": {
    "enabled": true,
    "phrase_trigger": true,
    "throttle_minutes": 10
  }
}
```

| 配置 | 默认 | 说明 |
|------|------|------|
| `paths.memory` | `.ray/memory` | 记忆存储路径 |
| `memory.enabled` | `true` | 总开关 |
| `memory.auto_recall` | `true` | SessionStart 自动召回 |
| `memory.session_start_mode` | `inject` | `inject`（零 token）/ `agent`（精确匹配） |
| `memory.session_end_mode` | `stop` | `stop`（当场执行，推荐）/ `defer`（零依赖）/ `agent`（独立进程）/ `skip` |
| `memory.gate_on_commit` | `true` | commit 后自动 gate |
| `memory.distill_on_session_end` | `auto` | `auto`（L1>=10 且 >=24h 自动触发）/ `true`（强制）/ `false`（禁止） |
| `memory.model` | `sonnet` | 子 Agent 模型 |
| `memory.agent_command` | `""` | 自定义 CLI 命令（仅 agent 模式） |
| `evolve.enabled` | `true` | 进化系统开关 |
| `evolve.phrase_trigger` | `true` | 完成/决策短语检测 |
| `evolve.throttle_minutes` | `10` | 短语触发节流 |

### SessionEnd 模式对比

| 模式 | 依赖 | 特点 |
|------|------|------|
| `stop` | 无 | 主 Agent 当场执行 gate。有完整上下文，最准确。**默认** |
| `defer` | 无 | 写 pending 文件，下次 SessionStart 补偿。兼容所有编辑器 |
| `agent` | CLI | 独立进程执行。自动检测 claude → codex，不可用降级为 defer |
| `skip` | 无 | 不执行，依赖 commit 时的 gate |

### 自定义 agent_command

仅 `session_end_mode: "agent"` 时生效。通过环境变量传参：

- `$RAY_GATE_PROMPT_FILE` — prompt 文件路径
- `$RAY_GATE_MODEL` — 模型名

```json
{ "agent_command": "bash ./scripts/run-agent.sh" }
```

## 存储

```
.ray/
├── config.json              # 配置
└── memory/                  # 统一记忆
    ├── l1-episodes/         # gate + grow 写入，source 字段区分
    ├── l2-patterns/         # 聚类/加速晋升
    ├── l3-judgments/        # L2 晋升
    └── MEMORY.md            # 索引
```

关闭记忆系统：`{ "memory": { "enabled": false } }`

## 自动化生命周期

```
SessionStart
  └→ inject 记忆摘要 / spawn recall agent / 补偿 pending gate

Skill 执行前
  └→ /mem-recall 激活相关记忆

git commit
  └→ /mem-gate 写入 L1 (source: "gate")

完成/决策短语
  └→ /grow 写入 L1 (source: "grow")

Pipeline Phase 6.5
  └→ /mem-gate + /grow

Stop / SessionEnd
  └→ defer / stop / agent / skip
```

## 更新

```bash
claude plugin update ray-beta
```
