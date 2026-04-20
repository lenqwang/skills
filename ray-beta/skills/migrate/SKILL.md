---
name: migrate
description: 迁移工具集。将旧格式产品文档迁移为三层 wiki 结构（--docs），将旧 YAML frontmatter trace 迁移为 CSV 索引体系（--index），或将单仓文档迁移到独立文档仓（--to-docs）
---

# Migrate — 格式迁移 Agent

你是格式迁移专家。职责：将旧格式的文档和索引安全地迁移为新格式，保留所有内容，不丢失数据。

## 模式

- **产品文档迁移** (`/migrate --docs`)：旧格式单文件 `modules/{name}.md` → 三层 wiki 结构
- **索引迁移** (`/migrate --index`)：旧格式 trace（YAML frontmatter + `YYYY-MM-DD-{feature}.md`）→ CSV 索引 + `{TYPE}-{4hex}-{slug}.md`
- **文档仓迁移** (`/migrate --to-docs`)：单仓模式 `docs/product/` + `docs/traces/` → 独立文档仓

无参数时，自动检测需要哪种迁移：
1. 如 `docs/product/modules/` 下存在 `.md` 文件（非目录）→ 建议 `--docs`
2. 如 `docs/traces/` 下存在含 YAML frontmatter 的 `.md` 文件且无 `index.csv` → 建议 `--index`
3. 如 `.ray/config.yaml` 存在且 `docs/product/` 非空且无指引 README → 建议 `--to-docs`
4. 多种条件同时满足 → 建议先 `--docs` 再 `--index` 最后 `--to-docs`
5. 都不需要 → 提示"无需迁移"

## 通用原则

1. **保留所有手写内容** — 不丢弃任何人工编写的产品洞察
2. **拆分不重写** — 除了格式适配，不改变原有描述
3. **备份旧文件** — 旧文件保留为 `.bak`，用户确认后手动删除
4. **确认后执行** — 展示迁移计划，等待用户确认后才开始
5. **写意图不写代码** — 如旧文档中有代码引用，迁移时改写为业务意图描述

### 模式检查

调用 `resolve_docs_root()` 获取 `(docs_root, mode)`。

**docs 模式下**：允许。把已有代码仓里的文档迁出到文档仓。
**repo 模式下**：允许。正常执行。
**legacy 模式下**：允许。正常执行。

---

## 产品文档迁移（`--docs`）

将旧格式的单文件产品文档（`modules/{name}.md`）拆分为三层 wiki 结构，保留所有手写内容。

### 前提检查

<CRITICAL>
产品文档迁移要求：
1. `docs/product/PRODUCT-MAP.md` 已存在
2. `docs/product/modules/` 下存在 `.md` 文件（旧格式单文件）
3. 不存在同名目录（如 `modules/chat/`），否则提示冲突需手动处理

如果 `modules/` 下已经是目录结构（三层格式），说明已迁移完毕，提示用户改用 `/origin --reconcile`。
</CRITICAL>

### Phase M0：扫描旧文档 ⏸️ 确认点

1. **读取 PRODUCT-MAP.md** 获取模块索引。
2. **逐个读取旧模块文件** `modules/{name}.md`，解析：
   - 模块头部元信息（组件数、最后更新）
   - 用户旅程段落
   - 所有组件条目（`### {ComponentName}` 或类似标记）
   - 每个组件的级别、各维度内容
3. **输出迁移计划** 并等待用户确认：

```
## 迁移计划

| 旧文件 | 组件数 | 将生成 | 关系预估 |
|--------|-------|--------|---------|
| modules/ai-chat.md | 8 | ai-chat/index.md + 8 个组件文件 | ~12 条 |
| modules/sidebar.md | 4 | sidebar/index.md + 4 个组件文件 | ~6 条 |
| ... | | | |

总计：{N} 个旧文件 → {N} 个目录 + {N} 个 index.md + {N} 个组件文件

确认后开始迁移。旧文件将保留为 {name}.md.bak 备份。
```

**用户确认后，以下 Phase 自动执行。**

### Phase M1：并行拆分（每模块一个子 Agent）

<CRITICAL>
**必须并行调度**。为每个待迁移模块启动一个独立的 Agent 子进程，所有模块同时执行。
</CRITICAL>

使用 Agent tool 为每个模块派发一个并行子 Agent，prompt 如下：

```
你是一位资深产品专家，正在将模块 "{module_name}" 从单文件格式迁移为三层目录结构。

## 迁移原则
- **保留所有手写内容** — 不丢弃任何人工编写的产品洞察
- **拆分不重写** — 除了格式适配（添加 metadata 头、关系表），不改变原有描述
- **补充关系表** — 从组件间引用推断关系，写入 ## 关系 段
- 写意图不写代码 — 如果旧文档中有代码引用，迁移时改写为业务意图描述

## 输入
- 旧模块文件内容：{old_module_content}（完整文本）

## Step 1: 解析旧文件结构

1. 提取模块头部（组件数、最后更新、描述等）
2. 提取用户旅程段落
3. 逐个提取组件条目，识别每个组件的：
   - 名称
   - 级别（轻量/标准/完整；如旧文档未标注，从内容推断）
   - 各维度内容（功能、界面结构、交互表、状态、边界情况、不变式等）

## Step 2: 创建模块目录

创建目录 `docs/product/modules/{module}/`

## Step 3: 生成 index.md

从旧文件头部和用户旅程提取内容，生成 `modules/{module}/index.md`：

# {模块名}

> 最后更新：{日期} | 组件数：{count}

## 用户旅程

{直接搬运旧文件中的用户旅程段落}

## 组件索引

| 组件 | 级别 | 功能 | 文件 |
|------|------|------|------|
| {ComponentName} | {级别} | {一句话} | [{ComponentName}.md]({ComponentName}.md) |

## Step 4: 生成组件文件

对每个组件条目，生成独立文件 `modules/{module}/{ComponentName}.md`：

1. 添加 metadata 头：
   > **模块**：[{模块名}](index.md) | **级别**：{级别} | **最后更新**：{日期}

2. 添加 `## 关系` 表（初始为空或从上下文推断）：
   - 如果旧文档中组件描述提到了其他组件（如"触发 X"、"依赖 Y"、"嵌入 Z"），推断关系
   - 关系类型：依赖 | 嵌入 | 触发 | 共享状态

3. 按级别模板放入内容：
   - 直接搬运旧条目中的各维度段落
   - 如果旧模板缺少当前级别要求的维度（如标准级缺 Non-Goals），添加空段落占位
   - 如果旧模板有多余维度（如轻量级却有状态段落），保留，不丢弃

<CRITICAL>
**双向原子更新**：如果推断出 A→B 关系：
1. 在 A.md 添加 → 行
2. 在 B.md 添加 ← 行（B 可能在同一模块或不同模块）
3. 如果 B 属于其他模块的子 Agent 管辖，在输出中标记"跨模块关系待补"
</CRITICAL>

## Step 5: 备份旧文件

将旧文件重命名为 `modules/{module}.md.bak`

## Step 6: 输出

输出迁移摘要：
- 生成的文件列表
- 推断的关系数
- 跨模块关系待补列表（需主 Agent 后续处理）
- 旧文档中发现的代码引用（已改写为意图描述的位置）
```

### Phase M2：跨模块关系补全（主 Agent）

所有子 Agent 完成后，主 Agent 执行：

1. **收集跨模块关系待补列表** — 各子 Agent 输出中的"跨模块关系待补"条目
2. **补全双向链接** — 对每个跨模块关系 A→B：
   - 打开 B 的组件文件，添加 ← 行
   - 确认路径使用正确的相对路径（跨目录用 `../other-module/Component.md`）
3. **更新 PRODUCT-MAP.md** — 将模块行的详情链接从 `modules/{name}.md` 改为 `modules/{name}/index.md`。确保头部包含产品定位。
4. **一致性检查**：
   - 所有关系链接双向一致？
   - 所有 index.md 组件索引表与实际文件匹配？
   - PRODUCT-MAP.md 链接全部指向 index.md？

### Phase M3：迁移报告

```
## 产品文档迁移报告

### 统计
- 迁移模块：{N} 个
- 生成 index.md：{N} 个
- 生成组件文件：{N} 个
- 推断关系边：{N} 条（模块内 {N} + 跨模块 {N}）
- 代码引用改写：{N} 处

### 文件清单
| 动作 | 文件 |
|------|------|
| [created] | modules/{name}/index.md |
| [created] | modules/{name}/{Component}.md |
| [backup] | modules/{name}.md → modules/{name}.md.bak |
| [updated] | PRODUCT-MAP.md（链接更新） |

### 需人工审查
- {跨模块关系推断可能不准确的条目}
- {从代码引用改写为意图描述的位置，建议确认描述准确性}

### 后续建议
- 确认迁移无误后，可删除 *.md.bak 备份文件
- 运行 `/origin --reconcile` 检查文档与代码的一致性
```

---

## 索引迁移（`--index`）

将旧格式 trace 文件（YAML frontmatter + `YYYY-MM-DD-{feature}.md` 命名）迁移为新的 CSV 索引体系（`{TYPE}-{4hex}-{slug}.md` 命名 + CSV 元数据）。

### 前提检查

<CRITICAL>
索引迁移要求：
1. `docs/traces/` 下存在 `.md` 文件（旧格式 trace）
2. 旧 trace 文件包含 YAML frontmatter（`---` 包裹的元数据块）
3. `docs/traces/index.csv` **不存在**（如已存在说明已迁移，提示"索引已存在，无需迁移"）
</CRITICAL>

### Phase I0：扫描旧 trace ⏸️ 确认点

1. **扫描** `docs/traces/*.md`，解析每个文件的 YAML frontmatter，提取：
   - `id`（旧格式 `FEAT-{NNN}` 或 `BUG-{NNN}`）
   - `title`、`domain`（映射为 module）、`status`
   - `files`、`tests`、`apis`、`tech_debt` 数组
   - `depends_on`、`depended_by`
   - `last_updated`（映射为 date）

2. **扫描** `docs/specs/` 和 `docs/audit/` 中的相关文件（按旧 FEAT-ID 匹配）

3. **为每个 trace 生成新 FEAT-ID**：
   运行 `python3 {ray_plugin_path}/scripts/search.py --generate-id --type {TYPE} --title "{title}" --date {date}`
   - TYPE 从旧 id 前缀推断（`FEAT-xxx` → FEAT，`BUG-xxx` → BUG）

4. **输出迁移计划** 并等待用户确认：

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

确认后开始迁移。旧文件将保留为 .bak 备份。
```

**用户确认后，以下 Phase 自动执行。**

### Phase I1：初始化 CSV

运行：`python3 {ray_plugin_path}/scripts/search.py --init --project-dir {项目根路径}`

创建带表头的空 CSV 文件。

### Phase I2：逐文件迁移

对每个旧 trace 文件：

1. **写入 index.csv**：追加一行（phase=trace），用新 FEAT-ID
2. **写入 files.csv**：从旧 frontmatter 的 `files` 数组逐条追加
3. **写入 tests.csv**：从旧 frontmatter 的 `tests` 数组逐条追加
4. **写入 apis.csv**：从旧 frontmatter 的 `apis` 数组逐条追加
5. **写入 tech_debt.csv**：从旧 frontmatter 的 `tech_debt` 数组逐条追加
6. **剥离 frontmatter**：从 trace markdown 中移除 `---` 包裹的 YAML 块，保留纯正文
7. **重命名 trace 文件**：`YYYY-MM-DD-{feature}.md` → `{TYPE}-{4hex}-{slug}.md`（旧文件保留为 `.bak`）

### Phase I3：迁移关联文件

对每个有 spec/audit 文件的 FEAT-ID：

1. **重命名 spec 文件**：`docs/specs/FEAT-{NNN}.spec.md` → `docs/specs/{TYPE}-{4hex}-{slug}.spec.md`（旧文件 `.bak`）
2. **写入 index.csv**：追加 phase=spec 行
3. **重命名 audit 文件**：`docs/audit/FEAT-{NNN}-audit.md` → `docs/audit/{TYPE}-{4hex}-{slug}-audit.md`（旧文件 `.bak`）
4. **写入 index.csv**：追加 phase=audit 行
5. **更新文件内容中的旧 ID 引用**：在 spec 和 audit 文件正文中，将 `FEAT-{NNN}` 替换为新 FEAT-ID

### Phase I4：生成 MAP.md + 迁移报告

1. **生成 MAP.md**：`python3 {ray_plugin_path}/scripts/search.py --generate-map --project-dir {项目根路径} > docs/MAP.md`

2. **输出迁移报告**：

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
| [created] | docs/traces/index.csv |
| [created] | docs/traces/files.csv, tests.csv, apis.csv, tech_debt.csv |
| [renamed] | docs/traces/{old}.md → docs/traces/{new}.md |
| [renamed] | docs/specs/{old}.spec.md → docs/specs/{new}.spec.md |
| [renamed] | docs/audit/{old}-audit.md → docs/audit/{new}-audit.md |
| [generated] | docs/MAP.md |

### 后续建议
- 确认迁移无误后，删除所有 .bak 文件
- 更新 CLAUDE.md 中的 MAP 生成命令（如有）
- 通知团队成员使用新 FEAT-ID 格式
```

---

## 迁移到文档仓模式（`/migrate --to-docs`）

将单仓模式的 docs/product/ 和 docs/traces/ 迁移到独立文档仓。

<HARD-GATE>
前置条件：
1. .ray/config.yaml 已存在（已运行 /origin --connect）
2. .ray/docs/ 已 clone（文档仓可访问）
</HARD-GATE>

### 流程

1. 验证前置条件
2. 迁移 docs/product/ → {docs_root}/product/
   - 逐文件复制，保留目录结构
   - 如目标已存在同名文件，对比内容，不同则提示用户选择
3. 迁移 docs/traces/ → {docs_root}/traces/
   - 将扁平 trace 文件转为 per-TRACE_ID 文件夹结构：
     {FEAT-ID}.md → {FEAT-ID}/trace.md
   - 将旧 CSV 数据转为 state json：
     从 index.csv 每行读取，生成 {TRACE_ID}/state/{repo_id}.json
   - 旧 CSV 文件不迁移（文档仓的 CSV 是 gitignored 的）
4. 在旧路径留下 README.md：
   "产品文档已迁移到文档仓。请使用 .ray/docs/ 访问。
    文档仓地址：{docs_url}"
5. commit + push 到文档仓
6. 触发 rebuild_csv()：
   `python3 {ray_plugin_path}/scripts/search.py --rebuild-csv --project-dir {docs_root}`
7. 输出迁移报告

### 幂等性
- 已迁移的文件跳过（检测目标文件存在且内容一致）
- 重复运行安全

### 多仓分批迁移
- 各代码仓独立运行 /migrate --to-docs
- 每个仓只迁移自己的 trace（根据 CSV 中 file 列路径匹配）

### Phase T0：扫描 ⏸️ 确认点

1. **读取 .ray/config.yaml** 获取 docs_url 和 docs_root
2. **扫描 docs/product/** 统计待迁移文件
3. **扫描 docs/traces/** 统计待迁移 trace 和 CSV 数据
4. **输出迁移计划** 并等待用户确认：

```
## 文档仓迁移计划

| 类别 | 文件数 | 目标 |
|------|-------|------|
| product/ | {N} 个文件 | {docs_root}/product/ |
| traces/ (md) | {M} 个 trace | {docs_root}/traces/{TRACE_ID}/trace.md |
| traces/ (csv→json) | {K} 行 | {docs_root}/traces/{TRACE_ID}/state/{repo_id}.json |

文档仓地址：{docs_url}

确认后开始迁移。
```

**用户确认后，以下 Phase 自动执行。**

### Phase T1：迁移 product/

1. 遍历 docs/product/ 下所有文件和子目录
2. 逐文件复制到 {docs_root}/product/，保留目录结构
3. 如目标文件已存在：
   - 内容一致 → 跳过
   - 内容不同 → 展示 diff，让用户选择保留哪个版本

### Phase T2：迁移 traces/

1. **迁移 trace markdown 文件**：
   - 对每个 docs/traces/{FEAT-ID}.md（不含 CSV 文件）
   - 创建 {docs_root}/traces/{FEAT-ID}/ 目录
   - 复制为 {docs_root}/traces/{FEAT-ID}/trace.md
   - 如果是 per-TRACE_ID 文件夹格式（如 docs/traces/{FEAT-ID}/trace.md），直接复制整个文件夹

2. **迁移 CSV 数据为 state json**：
   - 读取 docs/traces/index.csv
   - 对每行记录，提取 trace_id 和相关字段
   - 生成 {docs_root}/traces/{TRACE_ID}/state/{repo_id}.json
   - repo_id 从 .ray/config.yaml 中的当前仓库标识获取

3. 旧 CSV 文件（index.csv, files.csv, tests.csv, apis.csv, tech_debt.csv）不复制到文档仓

### Phase T3：留下指引 + 清理

1. 在 docs/product/ 下创建 README.md：
   ```
   # 产品文档已迁移

   产品文档已迁移到文档仓。请使用 .ray/docs/ 访问。
   文档仓地址：{docs_url}
   ```

2. 在 docs/traces/ 下创建 README.md（同上格式）

### Phase T4：提交 + 重建索引

1. 在文档仓（{docs_root}）中 commit + push 迁移内容
2. 触发 rebuild_csv 重建文档仓的 CSV 索引：
   `python3 {ray_plugin_path}/scripts/search.py --rebuild-csv --project-dir {docs_root}`

### Phase T5：迁移报告

```
## 文档仓迁移报告

### 统计
- 迁移 product 文件：{N} 个
- 迁移 trace 文件：{M} 个
- 转换 CSV→JSON state：{K} 条
- 跳过（已存在）：{S} 个

### 文件清单
| 动作 | 源 | 目标 |
|------|-----|------|
| [copied] | docs/product/{path} | {docs_root}/product/{path} |
| [migrated] | docs/traces/{FEAT-ID}.md | {docs_root}/traces/{FEAT-ID}/trace.md |
| [converted] | docs/traces/index.csv (row) | {docs_root}/traces/{TRACE_ID}/state/{repo_id}.json |
| [created] | — | docs/product/README.md (指引) |
| [created] | — | docs/traces/README.md (指引) |
| [skipped] | docs/traces/*.csv | (不迁移) |

### 后续建议
- 确认迁移无误后，可删除旧 docs/product/ 和 docs/traces/ 中的源文件（保留 README.md）
- 其他代码仓可独立运行 /migrate --to-docs 分批迁移
- 运行 /explore 验证文档仓搜索功能正常
```

---

## 规则

1. **不丢数据** — 所有手写内容必须保留
2. **备份优先** — 旧文件 `.bak` 备份，绝不直接删除
3. **确认再执行** — 展示完整迁移计划，用户确认后才动手
4. **幂等** — 重复运行不应产生重复数据（检查是否已迁移）
5. **不修改源码** — 只操作 `docs/` 目录
6. **双向原子更新** — 关系表修改必须两端同步
7. **写意图不写代码** — 迁移时将代码引用改写为业务意图描述
