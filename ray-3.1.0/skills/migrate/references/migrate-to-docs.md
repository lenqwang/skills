---
home_skill: migrate
purpose: --to-docs flavor 详细剧本。将单仓模式的 docs/product/ 和 docs/traces/ 迁移到独立文档仓
---

# migrate --to-docs — 文档仓迁移剧本

将单仓模式的 `docs/product/` 和 `docs/traces/` 迁移到独立文档仓。

## 前置条件（软门）

1. `.ray/config.yaml` 已存在（已运行 `/origin --connect`）
2. `.ray/docs/` 挂载状态：
   - 已 clone → 直接进入 Phase T0
   - 未 clone 但 `.ray/config.yaml` 含 `docs_url` → 进入 Phase T-1 自动挂载（不询问）
   - 未 clone 且 `docs_url` 缺失 → 报错并提示补全 `.ray/config.yaml.docs_url`

<HARD-GATE>
仅当下列任一仍不满足才停下：
- `.ray/config.yaml` 不存在
- `docs_url` 字段为空
- 自动 clone 失败（鉴权 / URL 不可达 / 网络）

其他情况由 Phase T-1 自动处理，不向用户反问。
</HARD-GATE>

## 流程概览

1. Phase T-1（条件触发）：自动挂载 `.ray/docs/`
2. Phase T0：扫描旧资源 + 用户确认迁移计划
3. Phase T1：`git mv` 迁移 `docs/product/` → `{docs_root}/product/`
4. Phase T2：`git mv` 迁移 `docs/traces/` → `{docs_root}/traces/{2hex}/{FEAT-ID}/trace.md`（**3.0 终态分桶**）
5. Phase T3：旧路径留下 README.md 指引
6. Phase T4：commit + push 到文档仓 + 重建 CSV 索引
7. Phase T5：迁移报告

## 幂等性
- 自动挂载在 `.ray/docs/` 已存在时跳过 clone
- 已迁移的文件跳过（目标 trace.md 存在且内容一致）
- 重复运行安全

## Phase T-1：自动挂载 `.ray/docs/`（条件触发）

**触发条件**：`.ray/config.yaml` 存在但 `.ray/docs/` 不存在。

**行为**：交由 `resolve_docs_root()` 协议层完成挂载（详见 [_trace-persist 公共协议](../../_trace-persist/references/public-protocols.md)）——读 `.ray/config.yaml.docs_url` → 直接 `git clone {docs_url} .ray/docs/`，不询问。

**失败处理**：clone 失败立即报错，提示用户检查 SSH key 与 `.ray/config.yaml.docs_url`，不静默重试、不回退到 inline、不询问"换路径"。

**幂等**：`.ray/docs/` 已存在时跳过整个 Phase T-1，直接进入 Phase T0。

## 多仓分批迁移
- 各代码仓独立运行 /migrate --to-docs
- 每个仓只迁移自己的 trace（根据 CSV 中 file 列路径匹配）

## Phase T0：扫描 ⏸️ 确认点

1. **读取 .ray/config.yaml** 获取 docs_url 和 docs_root
2. **扫描 docs/product/** 统计待迁移文件
3. **扫描 docs/traces/** 统计待迁移 trace 和 CSV 数据
4. **迁移前自动 reconcile**：执行 `python3 <RAY_ROOT>/scripts/ray/ --persist-trace --reconcile`——fs-only 自动补 CSV，csv-only 标 orphan WARN 由人决策，不阻塞主流程
5. **输出迁移计划** 并等待用户确认：

```
## 文档仓迁移计划

| 类别 | 文件数 | 目标 |
|------|-------|------|
| product/ | {N} 个文件 | {docs_root}/product/ |
| traces/ (md) | {M} 个 trace | {docs_root}/traces/{2hex}/{FEAT-ID}/trace.md（3.0 终态分桶） |
| traces/ (CSV) | 14 列 schema | {docs_root}/traces/index.csv（Phase T4 rebuild_csv 重建） |

文档仓地址：{docs_url}

确认后开始迁移。
```

**用户确认后，以下 Phase 自动执行。**

## Phase T1：迁移 product/

1. 遍历 docs/product/ 下所有文件和子目录
2. 用 `git mv` 把每份文件搬到 {docs_root}/product/，保留目录结构与 history
3. 如目标文件已存在：
   - 内容一致 → 跳过（幂等）
   - 内容不同 → 展示 diff，让用户选择保留哪个版本

## Phase T2：迁移 traces/（3.0 终态分桶）

1. **迁移 trace markdown 文件（统一终态）**：
   - 对每个 docs/traces/{FEAT-ID}.md（legacy 平铺）或 docs/traces/{TYPE}-{4hex}-{slug}.md（2.x 中期）
   - `git mv` 到 `{docs_root}/traces/{2hex}/{FEAT-ID}/trace.md`（{2hex} = FEAT-ID 4 位 hex 的前 2 位）
   - 如果源已是 legacy per-TRACE_ID 文件夹格式（如 docs/traces/{FEAT-ID}/trace.md），整体 `git mv` 并迁入对应 {2hex} 桶
   - **头部补全**：搬移后检查 trace.md 头部，缺失则补 `> source: {pm|dev}`（按上下文推断；不可推断时默认 `dev`）；如已是 dev 补全完成则补 `> completeness: full`

2. **迁移 CSV 数据**：
   - 读取 docs/traces/index.csv，必要时按 14 列 schema（含 `repos` 列，缺列旧 CSV 由 rebuild_csv 向后兼容）补齐
   - 旧 index.csv 不再保留 state json 拆分；下游统一以 `{docs_root}/traces/index.csv` 为权威

3. 旧 CSV 文件（index.csv, files.csv, tests.csv, apis.csv, tech_debt.csv）由 Phase T4 的 rebuild_csv 在文档仓内重新生成；旧路径下的 CSV 不再保留

4. **幂等检测**：目标 `{docs_root}/traces/{2hex}/{FEAT-ID}/trace.md` 已存在且内容一致 → 跳过该 trace 的 git mv 与头部补全

## Phase T3：留下指引 + 清理

1. 在 docs/product/ 下创建 README.md：
   ```
   # 产品文档已迁移

   产品文档已迁移到文档仓。请使用 .ray/docs/ 访问。
   文档仓地址：{docs_url}
   ```

2. 在 docs/traces/ 下创建 README.md（同上格式）

## Phase T4：提交 + 重建索引

1. 在文档仓（{docs_root}）中 commit + push 迁移内容
2. 触发 rebuild_csv 重建文档仓的 CSV 索引：
   `python3 <RAY_ROOT>/scripts/ray/ --rebuild-csv --project-dir {docs_root}`

## Phase T5：迁移报告

```
## 文档仓迁移报告

### 统计
- 迁移 product 文件：{N} 个
- 迁移 trace 文件：{M} 个（3.0 终态分桶 + 头部补全）
- 重建 CSV 索引：{K} 行（14 列 schema）
- 跳过（已存在 / 内容一致）：{S} 个

### 文件清单
| 动作 | 源 | 目标 |
|------|-----|------|
| [git mv] | docs/product/{path} | {docs_root}/product/{path} |
| [git mv + header补全] | docs/traces/{FEAT-ID}.md (legacy / 2.x 平铺) | {docs_root}/traces/{2hex}/{FEAT-ID}/trace.md（含 `> source:` / `> completeness:`） |
| [created] | — | docs/product/README.md (指引) |
| [created] | — | docs/traces/README.md (指引) |
| [skipped] | docs/traces/*.csv | (Phase T4 重建) |

### 后续建议
- 确认迁移无误后，可删除旧 docs/product/ 和 docs/traces/ 中的源文件（保留 README.md）
- 其他代码仓可独立运行 /migrate --to-docs 分批迁移
- 运行 /query 验证文档仓搜索功能正常
```
