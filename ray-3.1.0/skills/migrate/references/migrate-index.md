---
home_skill: migrate
purpose: --index flavor 详细剧本。将旧格式 trace（YAML frontmatter + YYYY-MM-DD-{feature}.md）一步直达 ray 3.0 终态：{2hex}/{FEAT-ID}/trace.md 分桶 + 14 列 CSV
---

# migrate --index — 索引迁移剧本

将旧格式 trace 文件（YAML frontmatter + `YYYY-MM-DD-{feature}.md` 命名）一步迁移为 ray 当前版本（3.0）的架构终态：

- **目录结构**：`{docs_root}/traces/{2hex}/{FEAT-ID}/trace.md`（按 FEAT-ID 4 位 hex 前 2 位分桶）
- **CSV**：14 列 schema（含 `repos` 列）
- **trace.md 头部**：含 `> source: {pm|dev}` 来源标记，开发者补全后追加 `> completeness: full`
- **不留中期形态**：不停在 ray 2.x 的"`{TYPE}-{4hex}-{slug}.md` 平铺"——若历史已是 2.x 平铺，本剧本同样会直接搬到 3.0 分桶

## 前提检查

<CRITICAL>
索引迁移要求：
1. `docs/traces/` 下存在 `.md` 文件（旧格式 trace）
2. 旧 trace 文件包含 YAML frontmatter（`---` 包裹的元数据块）
3. `docs/traces/index.csv` **不存在**（如已存在说明已迁移，提示"索引已存在，无需迁移"）
</CRITICAL>

## Phase I0：扫描旧 trace ⏸️ 确认点

1. **扫描** `docs/traces/*.md`，解析每个文件的 YAML frontmatter，提取：
   - `id`（旧格式 `FEAT-{NNN}` 或 `BUG-{NNN}`）
   - `title`、`domain`（映射为 module）、`status`
   - `files`、`tests`、`apis`、`tech_debt` 数组
   - `depends_on`、`depended_by`
   - `last_updated`（映射为 date）

2. **扫描** `docs/specs/` 和 `docs/audit/` 中的相关文件（按旧 FEAT-ID 匹配）

3. **为每个 trace 生成新 FEAT-ID**：
   运行 `python3 <RAY_ROOT>/scripts/ray/ --generate-id --type {TYPE} --title "{title}" --date {date}`
   - TYPE 从旧 id 前缀推断（`FEAT-xxx` → FEAT，`BUG-xxx` → BUG）

4. **迁移前自动 reconcile**：执行 `python3 <RAY_ROOT>/scripts/ray/ --persist-trace --reconcile`——fs-only 自动补 CSV，csv-only 标 orphan WARN 留待人决策，不阻塞主流程

5. **输出迁移计划** 并等待用户确认：

```
## 索引迁移计划

| 旧 ID | 旧文件名 | 新 ID | 新文件名 | 状态 |
|--------|---------|-------|---------|------|
| FEAT-001 | 2026-03-20-realtime-price.md | FEAT-b2c4-realtime-price | FEAT-b2c4-realtime-price.md | done |
| BUG-002 | 2026-03-25-price-flicker.md | BUG-e1c2-price-flicker | BUG-e1c2-price-flicker.md | done |

关联文件：
| 旧路径 | 新路径 |
|--------|--------|
| docs/specs/FEAT-001.spec.md | docs/specs/FEAT-b2c4-realtime-price.spec.md |
| docs/audit/FEAT-001-audit.md | docs/audit/FEAT-b2c4-realtime-price-audit.md |

总计：{N} 个 trace + {M} 个 spec + {K} 个 audit 文件

确认后开始迁移。旧文件将由 `git mv` 重命名，history 完整保留，不留 `.bak`（仅解析失败的少数情况例外）。
```

**用户确认后，以下 Phase 自动执行。**

## Phase I1：初始化 CSV

运行：`python3 <RAY_ROOT>/scripts/ray/ --init --project-dir {项目根路径}`

创建带表头的空 CSV 文件。

## Phase I2：逐文件迁移

对每个旧 trace 文件：

1. **写入 index.csv**：追加一行（14 列 schema，phase=trace，含 `repos` 列；inline/external 单仓时 `repos` 留空）
2. **写入 files.csv / tests.csv / apis.csv / tech_debt.csv**：从旧 frontmatter 的对应数组逐条追加
3. **剥离 frontmatter**：从 trace markdown 中移除 `---` 包裹的 YAML 块，保留纯正文
4. **trace.md 头部补全**：在文档首段插入 `> source: {pm|dev}`（按 frontmatter 中的 author / role 字段推断；不可推断时默认 `dev`）；如已是 dev 补全完成则追加 `> completeness: full`
5. **`git mv` 重命名 trace 文件**：`YYYY-MM-DD-{feature}.md` → `{TYPE}-{4hex}-{slug}.md`（保留 history，不留 `.bak`；解析失败的少数情况例外）

## Phase I3：迁移关联文件

对每个有 spec/audit 文件的 FEAT-ID：

1. **`git mv` spec 文件**：`docs/specs/FEAT-{NNN}.spec.md` → `docs/specs/{TYPE}-{4hex}-{slug}.spec.md`
2. **写入 index.csv**：追加 phase=spec 行
3. **`git mv` audit 文件**：`docs/audit/FEAT-{NNN}-audit.md` → `docs/audit/{TYPE}-{4hex}-{slug}-audit.md`
4. **写入 index.csv**：追加 phase=audit 行
5. **更新文件内容中的旧 ID 引用**：在 spec 和 audit 文件正文中，将 `FEAT-{NNN}` 替换为新 FEAT-ID

## Phase I4：分桶（平铺 → `{2hex}/{FEAT-ID}/trace.md` 终态）

Phase I2/I3 结束时 trace 仍是 2.x 中期形态（`{TYPE}-{4hex}-{slug}.md` 平铺）。本 Phase 直接抬到 3.0 终态：

1. **逐 trace `git mv`**：`docs/traces/{TYPE}-{4hex}-{slug}.md` → `docs/traces/{2hex}/{FEAT-ID}/trace.md`（{2hex} = FEAT-ID 4 位 hex 前 2 位；{FEAT-ID} 含 slug）
2. **同步搬移目录形态**：若历史出现过 `docs/traces/{FEAT-ID}/trace.md` 平铺目录，整体 `git mv` 到对应 `{2hex}` 桶下
3. **更新 index.csv `file` 列**：把 `{TYPE}-{4hex}-{slug}` 归一化为 `{2hex}/{FEAT-ID}`（与 _trace-persist `file` 列契约一致）
4. **trace.md 头部检查**：若 Phase I2 漏补 `> source:` / `> completeness:`，本 Phase 兜底补齐
5. **幂等检测**：目标 `{docs_root}/traces/{2hex}/{FEAT-ID}/trace.md` 已存在且内容一致 → 跳过该 trace 的 git mv 与头部补全

## Phase I5：迁移报告

1. **输出迁移报告**：

```
## 索引迁移报告

### 统计
- 迁移 trace：{N} 个
- 迁移 spec：{M} 个
- 迁移 audit：{K} 个
- CSV 行数：index={X} / files={Y} / tests={Z} / apis={W} / tech_debt={V}

### ID 映射表
| 旧 ID | 新 ID |
|--------|-------|
| FEAT-001 | FEAT-b2c4-realtime-price |
| BUG-002 | BUG-e1c2-price-flicker |

### 文件清单
| 动作 | 文件 |
|------|------|
| [created] | docs/traces/index.csv（14 列 schema，含 `repos`） |
| [created] | docs/traces/files.csv, tests.csv, apis.csv, tech_debt.csv |
| [git mv + 头部补全] | docs/traces/{old}.md → docs/traces/{2hex}/{FEAT-ID}/trace.md（含 `> source:` / `> completeness:`） |
| [git mv] | docs/specs/{old}.spec.md → docs/specs/{new}.spec.md |
| [git mv] | docs/audit/{old}-audit.md → docs/audit/{new}-audit.md |

### 后续建议
- 解析失败而保留 .bak 的文件（如有）需手动审阅；其他文件已通过 `git mv` 保留 history，不再有 .bak
- 通知团队成员使用新 FEAT-ID 格式
```
