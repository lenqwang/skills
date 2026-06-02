# Ray — Claude Code Configuration

## Skill 项目配置

### 包映射

| 域 | 包路径 |
|---|---|
| intake | skills/research/, skills/propose/, skills/prd/, skills/trace/, skills/_trace-persist/ |
| pipeline | skills/pipeline/, skills/architect/, skills/qa/, skills/coder/ |
| quality | skills/audit/, skills/guard/, skills/learn/ |
| delivery | skills/update-map/, skills/ship/ |
| docs | skills/origin/, skills/migrate/, skills/digest/, skills/query/, skills/post-trace/ |
| tooling | scripts/ray/, evals/run.sh（外部 pip 包 `skill-eval` 入口，框架仓 git.fulltrust.link:fe/gateai/eval-skill-test-framework） |

### 技术栈

| 项目 | 值 |
|---|---|
| 框架 | Claude Code Plugin / Cursor Plugin |
| 语言 | Markdown (skills), Python 3 (ray CLI toolkit) |
| 状态管理 | CSV files in docs/traces/ |
| 包管理器 | evals 工具链用 pip venv（见 evals/requirements.txt）；主体仍 None |
| 构建工具 | None |
| 测试框架 | pytest（scripts/ray/ 单元测试）+ eval-skill-test-framework（skill 评测，通过 evals/run.sh 调用） |
| 入口点 | skills/ (19 SKILL.md files), scripts/ray/, evals/run.sh |
| 版本 | 3.1.0 |

### CSS 约束

| 约束 | 值 |
|---|---|
| CSS 框架 | N/A |
| 样式方案 | N/A |
| 设计令牌 | N/A |
| 主题系统 | N/A |
| 响应式断点 | N/A |

### 文档路径

| 用途 | 路径 |
|---|---|
| 产品地图索引（决策层） | docs/product/PRODUCT-MAP.md |
| 模块索引（叙事层） | docs/product/modules/{name}/index.md |
| 组件文件（规约层） | docs/product/modules/{name}/{ComponentName}.md |
| 追溯 | docs/traces/ |
| 类型合约 | docs/superpowers/specs/（按需创建） |
| 工作流文档 | docs/ray-workflow/ |
| 计划文档 | docs/plans/ |

### 技术债务

| # | 项目 |
|---|---|
| ~~1~~ | ~~无内置单元测试框架~~ — 已解决：pytest + tests/（REFACTOR-ba71） |
| 2 | Python 脚本无类型检查 (无 tsconfig 等效配置) |
| 3 | package.json 极简 (无 scripts, 无依赖声明) |
