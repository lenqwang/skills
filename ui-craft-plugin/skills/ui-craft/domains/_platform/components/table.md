---
scope: [exchange, web3pay]
layer: L2
---
# Table 表格 — Platform 规格

> Exchange+Web3 平台表格规格，继承 `_platform/` 基座。
> Figma:
> - [Table Guidelines Web](https://www.figma.com/design/kQIx9xKLiyO6KZIbazNSM2/?node-id=8999-16956)
> - [Table Guidelines H5](https://www.figma.com/design/kQIx9xKLiyO6KZIbazNSM2/?node-id=8999-18647)
>
> Component Token: `Table Header_V5/item`（Web）· `Table Header/item`（H5）

---

## Web 表格规格

| 元素 | 规格 |
|------|------|
| Header 字号 | 12 px / 400 或 14 px / 400 |
| Header 颜色 | Text/Secondary |
| Header 高度 | 32 px / 40 px / 56 px（含排序图标行） |
| Row 高度 | 32 px / 40 px / 56 px |

## H5 表格规格

| 元素 | 规格 |
|------|------|
| Header 字号 | 12 px / 400 |
| Header 颜色 | Text3（三级文字色） |
| Header 高度 | 32 px / 40 px |
| Row 高度 | 32 px / 40 px |

## H5 使用规范

- 基础列表适合普通缩略内容（头像、标题、文字、按钮等）
- Web-Table 适配至 H5 需结合实际情况处理，**非简单缩放适配**
- 极限值最小间距 **12 px**，**不支持横向滑动**（需缩减列数）
