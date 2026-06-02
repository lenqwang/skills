---
home_skill: origin
purpose: Phase 4 完成报告模板（创世模式输出）+ Phase 4a CSV 索引初始化命令
---

# origin — 完成报告模板

Phase 4 汇总后的完成报告模板。

## 报告模板

```
## Origin 完成报告

### 配置
- 输出模式：{external | inline}
- 文档仓：{docs_root}
- `.ray/config.yaml`：{已创建（含 docs_url、product、repo_id）| 已存在并复用 | N/A（inline 模式）}

### 技术侧
- Boot Sector：已写入 CLAUDE.md（{N} 个域、{N} 个包）
- tech/ 档位：{full | minimal | skip}
- 技术债检测：{N} 项

### 产品侧
- 产品模块：{N} 个
- 组件条目：{N} 个
- 关系边：{N} 条（均双向一致）

### 文件清单
列出所有 [created] 和 [updated] 的文件路径及数量。
```

## Phase 4a：初始化 CSV 索引

创世模式下，运行：

```bash
python3 <RAY_ROOT>/scripts/ray/ --init --project-dir {项目根路径}
```

这会在 `{docs_root}/traces/` 下创建带表头的空 CSV 文件（index.csv, archive.csv）。

## 校准模式报告模板

```markdown
# 校准报告 — {日期}

## Boot Sector 验证
- 包映射：{通过/偏移} — {详情}

## 产品地图偏移
- 新增组件（未收录）：{列表}
- 已删除组件（仍在文档中）：{列表}

## 自动修复
- {修复了什么}

## 需人工审查
- {需手动验证的项目}
```
