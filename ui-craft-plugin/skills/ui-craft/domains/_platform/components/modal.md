---
scope: [exchange, web3pay]
layer: L2
---
# Modal 弹窗 — Platform 规格

> Exchange+Web3 平台弹窗规格，继承 `_platform/` 基座。
> Figma:
> - [Modal Guidelines Web](https://www.figma.com/design/kQIx9xKLiyO6KZIbazNSM2/?node-id=7745-31039)
> - [Modal Guidelines H5](https://www.figma.com/design/kQIx9xKLiyO6KZIbazNSM2/?node-id=7745-31603)
> - [Popup Guidelines H5](https://www.figma.com/design/kQIx9xKLiyO6KZIbazNSM2/?node-id=8866-32339)
>
> Component Token: `ModalV5-web` · `ModalV5-H5` · `Popup_V5_H5`

---

## Web 尺寸（4 档宽度）

| 档位 | 宽度 | 典型高度 | 场景 |
|------|------|---------|------|
| Small | 384 px | 330-420 px | 简单确认 |
| Regular | 480 px | 330 px | 标准弹窗 |
| Medium | 588 px | 346 px | 内容较多操作 |
| Large | 840 px | 346 px | 复杂弹窗（表单、列表） |

- 内容区左右内边距 16 px，圆角 8 px

## H5 尺寸

- 宽度：屏幕宽度 80%（375 px 屏幕下 = 301 px）
- 最大高度：屏幕高度 60%（约 487 px），超出内部滚动
- 横屏：宽度 = 50% 屏宽，最大高度 = 60%

## Header 规格

| Header 标题字号 | Header 区域高度 |
|---------------|---------------|
| 24 px | 66 px |
| 32 px | 74 px |

## 关闭按钮规格

- 图标 16 px，热区 24 px，距弹窗边缘 12 px

## Popup H5 规格（底部弹出抽屉）

| 属性 | 值 |
|------|----|
| 宽度 | 375 px（全屏宽） |
| 最大高度 | 屏幕高度约 80%（约 650 px） |
| Scrim 遮罩 | 375 × 812 px |

- Header 高度变体：48 / 56 / 60 / 69 / 74 / 84 / 92 / 96 / 104 / 148 px
- Footer Button：单/双按钮，页面级 48 px / 弹窗级 40 px
- 颜色类型：Primary / Secondary / Faded / Highlight / Critical
