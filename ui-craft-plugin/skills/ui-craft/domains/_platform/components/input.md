---
scope: [exchange, web3pay]
layer: L2
---
# Input 输入框 — Platform 规格

> Exchange+Web3 平台输入框规格，继承 `_platform/` 基座。
> Component Token: `Input_V5`（Input）· `SearchV5-web` / `Search_V5_H5`（Search）· `NumberInputV5-Web` / `NumberInputV5-H5`（Number Input）

---

## Input 输入框

| 规格 | 高度 | Web 宽度 | H5 宽度 |
|------|------|---------|---------|
| Medium | 40 px | 320 px | 335 px（含 20 px 左边距容器） |
| Large | 48 px | 320 px | 335 px |

- 颜色类型：Primary / Secondary / Faded / Highlight / Critical
- 多行输入最多展示 2 行，超出向前滚动；Helper Text 最多 2 行
- H5 Dropdown 调用底部弹出层（`PopupFilter_V5_H5`）

## Search 搜索框

| 规格 | Web 尺寸 | H5 尺寸 |
|------|---------|---------|
| Small | 240 × 32 px | 343 × 32 px |
| Medium | 240 × 40 px | 375 × 40 px |
| Large | 240 × 48 px | 375 × 40 px |

- H5 Medium/Large 高度均为 40 px
- Placeholder 超出宽度时使用轮播滚动（60 px/s，linear 循环）
- H5 获焦后右侧出现 Cancel 按钮

## Number Input 数字输入框

| 状态 | Web 尺寸 | H5 尺寸 |
|------|---------|---------|
| Normal / Typing / Finish | 588 × 93 px | 375 × 90 px |
| Error | 588 × 115 px | 375 × 112 px |

- 每个输入框独立热区，文字按钮（Max/All）独立热区
- H5 底部 6 个快捷百分比按钮（0%-100%），每个约 48 × 56 px

## RTL 适配

- 文字方向整体翻转：Prefix 在右侧，Suffix 在左侧
- 光标位置随文字方向调整
- 币种 Dropdown 前缀位置镜像
