---
scope: [exchange, web3pay]
layer: L2
---
# Button 按钮 — Platform 规格

> Exchange+Web3 平台按钮规格，继承 `_platform/` 基座。

---

> Figma:
> - [Button_Web Guidelines](https://www.figma.com/design/kQIx9xKLiyO6KZIbazNSM2/?node-id=7454-72704)
> - [Text Button_Web Guidelines](https://www.figma.com/design/kQIx9xKLiyO6KZIbazNSM2/?node-id=7454-73265)
> - [Footer Button](https://www.figma.com/design/kQIx9xKLiyO6KZIbazNSM2/?node-id=7454-79111)
> - [Button_H5 Guidelines](https://www.figma.com/design/kQIx9xKLiyO6KZIbazNSM2/?node-id=7200-21098)

## 按钮颜色类型（5 种，适用所有尺寸及端侧）

| 类型 | Token | 使用场景 |
|------|-------|---------|
| Primary | `primary` | 主操作，每屏建议唯一 |
| Secondary | `secondary` | 次级操作 |
| Faded | `faded` | 弱化按钮 |
| Highlight | `highlight` | 强调/促销/激励 |
| Critical | `critical` | 危险/破坏性操作 |

## Web 端尺寸（8 档）

| 档位 | 高度 | 备注 |
|------|------|------|
| XS | 28 px | 标签、角标 |
| SM | 32 px | 紧凑型表格操作 |
| MD-S | 36 px | 次要操作区 |
| MD | 40 px | **默认常规尺寸** |
| LG | 44 px | 卡片、弹窗主操作 |
| XL | 48 px | 突出主操作 |
| XXL 单行 | 56 px | 首焦区域 |
| XXL 多行 | 56 px | 含副文本双行按钮 |

## H5 端尺寸对比

| 档位 | Web | H5 |
|------|-----|-----|
| XS | 28 px | 24 px |
| SM–XL | 32–48 px | 一致 |
| XXL 单行 | 56 px | 48 px |
| XXL 多行 | 56 px | 44 px |
| 长按钮通栏 | 223 × 56 px (双) | 375 × 48 px（含 SafeArea） |

## 图标规范

| 布局 | 说明 |
|------|------|
| 纯文字 | 默认形态 |
| 左图标（prefix） | 操作暗示（下载、跳转） |
| 右图标（suffix） | 箭头、外链 |
| 图标按钮（square） | 无文字，正方形 |

> 图标尺寸匹配：高度 <=32px 用 16px，36-44px 用 20px，>=48px 用 24px。

## Text Button（文字链）

无背景轻量交互元素，高度约 23 px。颜色变体同 5 种类型。
布局支持：纯文字 / 左图标 / 右图标 / 双图标。不使用背景色/边框。

## Footer Button（底部操作按钮，H5/Popup 专用）

| 场景 | 按钮高度 | 容器高度 |
|------|----------|---------|
| 页面底部 | 48 px | 80 px（含 Home Indicator） |
| Popup 弹窗底部 | 40 px | 视弹窗而定 |

- 宽度 375 px 全屏宽
- 布局变体：单按钮 / 双按钮等宽 / 按钮+图标按钮 / 三按钮
- 颜色：Primary / Secondary / Faded / Critical / Icon（40 px 正方形）
