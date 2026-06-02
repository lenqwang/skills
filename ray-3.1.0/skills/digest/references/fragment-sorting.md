---
home_skill: digest
purpose: Phase 1 前置碎片预分拣规则（按产品模块匹配 trace 和独立文档）
---

# 碎片预分拣

在派发子 Agent 前，主 Agent 先完成碎片到**产品模块**的匹配分拣。

<CRITICAL>
分拣的锚点是 **产品模块**（PRODUCT-MAP.md 中列出的模块），不是 trace 的 `domain` 字段。
`domain` 是技术域（如 `rich`），产品模块是面向用户的分组（如 `cards`），两者不是一回事。
</CRITICAL>

1. **读取每个模块索引** `{docs_root}/product/modules/{module}/index.md`，从组件索引表提取该模块已有的组件名列表。

2. **收集相关 trace**。匹配规则（按优先级）：
   - `{docs_root}/traces/files.csv` 中该 trace 的文件路径命中该模块已有组件的包/目录
   - trace 标题或内容中提及该模块内组件名
   - `{docs_root}/traces/index.csv` 中该 trace 的 ID 在模块文件中被引用过

3. **收集相关独立产品文档**（`{docs_root}/product/*.md`，不含 modules/ 下的）。匹配规则：
   - 文件名含模块内组件名（如 `sidebar-*.md` → chat 模块）
   - 内容中引用了模块内组件

4. 将分拣结果（文件路径列表）传入各子 Agent 的 prompt。

5. **无法归类的碎片**：如果某些 trace/独立文档无法匹配到任何现有模块，在归纳报告中单独列出，由用户决定是否需要新建模块（通过 `/origin --reconcile`）。
