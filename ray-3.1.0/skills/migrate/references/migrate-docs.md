---
home_skill: migrate
purpose: --docs flavor 详细剧本。将旧格式单文件产品文档（modules/{name}.md）一步直达 ray 3.0 终态：三层 wiki 结构 + PRODUCT-MAP.md 链接对齐
---

# migrate --docs — 产品文档迁移剧本

将旧格式的单文件产品文档（`modules/{name}.md`）拆分为 ray 当前版本（3.0）定义的三层 wiki 结构，保留所有手写内容。

**3.0 终态目标**：
- `modules/{name}/index.md`（叙事层：用户旅程 + 组件索引）
- `modules/{name}/{ComponentName}.md`（规约层：每组件一份，含级别 metadata + 关系表）
- `PRODUCT-MAP.md` 索引行链接全部指向 `modules/{name}/index.md`

不留 2.x 中期形态（如"index.md 已生成但 PRODUCT-MAP 链接还指向旧单文件"）。

## 前提检查

<CRITICAL>
产品文档迁移要求：
1. `docs/product/PRODUCT-MAP.md` 已存在
2. `docs/product/modules/` 下存在 `.md` 文件（旧格式单文件）
3. 不存在同名目录（如 `modules/chat/`），否则提示冲突需手动处理

如果 `modules/` 下已经是目录结构（三层格式），说明已迁移完毕，提示用户改用 `/origin --reconcile`。
</CRITICAL>

## Phase M0：扫描旧文档 ⏸️ 确认点

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

确认后开始迁移。旧文件将由 `git mv` 搬至 `{name}/index.md`，history 完整保留，不留 `.bak`（仅解析失败的少数情况例外）。
```

**用户确认后，以下 Phase 自动执行。**

## Phase M1：并行拆分（每模块一个子 Agent）

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

## Step 2: 创建模块目录 + 把旧文件 git mv 进去

1. **`git mv docs/product/modules/{module}.md docs/product/modules/{module}/index.md`**——把旧文件的 history 跟到 index.md（叙事层是旧文件语义"主继承者"），同时创建 `modules/{module}/` 目录
2. Step 3-4 的写入将**覆盖**该 index.md 并新建组件文件——按 git 语义保留 history、内容以本次写入为准

**禁止**先跳过此 git mv 直接写新文件：那样旧文件会孤立留在 `modules/` 根，Step 5 再 `git mv` 时目标已存在会报错。

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

## Step 5: 入索引

Step 2 已通过 `git mv` 把旧文件搬到 `index.md`（保留 history），Step 3-4 已覆写并新建组件文件。本步只需：

```bash
git add modules/{module}/
```

把覆写和新建一并入索引。**不再做** `.bak`——history 已通过 Step 2 的 `git mv` 保留；解析失败的少数情况例外。

## Step 6: 输出

输出迁移摘要：
- 生成的文件列表
- 推断的关系数
- 跨模块关系待补列表（需主 Agent 后续处理）
- 旧文档中发现的代码引用（已改写为意图描述的位置）
```

## Phase M2：跨模块关系补全（主 Agent）

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

## Phase M3：迁移报告

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
| [git mv] | modules/{name}.md → modules/{name}/（旧文件按 history 保留迁移轨迹，不留 .bak） |
| [updated] | PRODUCT-MAP.md（链接对齐 3.0 终态：modules/{name}/index.md） |

### 需人工审查
- {跨模块关系推断可能不准确的条目}
- {从代码引用改写为意图描述的位置，建议确认描述准确性}

### 后续建议
- 解析失败而保留 `.bak` 的文件（如有）需手动审阅；其他文件已通过 `git mv` 保留 history，不再有 .bak
- 运行 `/origin --reconcile` 检查文档与代码的一致性
```
