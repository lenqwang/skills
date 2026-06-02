---
home_skill: update-map
purpose: CSV 索引文件结构（index/files/tests/apis/tech_debt）和更新步骤
---

# CSV 索引结构与更新步骤

## 文件结构

```
{docs_root}/traces/
├── index.csv        ← 主表（id, type, phase, module, component, title, keywords, status, author, date, file, repos, depends_on, depended_by）
├── files.csv        ← 文件关联表（feat_id, path, desc, lines）
├── tests.csv        ← 测试关联表（feat_id, path, count）
├── apis.csv         ← API 关联表（feat_id, method, path, desc）
├── tech_debt.csv    ← 技术债表（feat_id, td_id, priority, desc, added, resolved_by）
```

## 更新步骤

| # | 表 | 触发 | 工具 |
|---|-----|------|------|
| 1 | index.csv | trace 完成 → status=done | 改 trace.md 头 `> status: done` → `--rebuild-csv` |
| 2 | files.csv | 本次迭代修改的源文件 | `append_csv(files.csv, row, CSV_TABLES['files']['headers'])` |
| 3 | tests.csv | 每个测试文件（feat_id, path, count）| `append_csv(tests.csv, row, CSV_TABLES['tests']['headers'])` |
| 4 | apis.csv | 新 API 端点 | `append_csv(apis.csv, row, CSV_TABLES['apis']['headers'])` |
| 5 | tech_debt.csv | 审计含技术债 | `append_csv(tech_debt.csv, row, CSV_TABLES['tech_debt']['headers'])`（已解决填 resolved_by，不删行）|
| 6 | index.csv | depends_on / depended_by 双向同步 | 改 trace.md 头对应字段 → `--rebuild-csv` |

**关键约束**：

- 步骤 1、6（index.csv）必经 trace.md 头 + `--rebuild-csv`，禁止手工编辑 index.csv 行
- 步骤 2-5（关联表）用 `csv_ops.append_csv` 公共 API（位于 `scripts/ray/csv_ops.py`），rebuild 不处理这些表
- 调用样例：`python3 -c "from ray.csv_ops import append_csv; from ray import CSV_TABLES; append_csv('{docs_root}/traces/files.csv', {...row...}, CSV_TABLES['files']['headers'])"`

**域分类**：从项目根目录的 `ray.map.config.json` 读取有效的域->包映射。不要硬编码域名。
