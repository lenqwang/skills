---
scope: [exchange, web3pay]
layer: L2
---
# Divider 分割线

> 用于区隔信息段落、区分主次内容、降低用户认知负担的静态视觉元素。

---

## Figma 链接

- [Divider Guidelines](https://www.figma.com/design/kQIx9xKLiyO6KZIbazNSM2/?node-id=7455-54217)

**组件 Token：** `Divider_V5` / `Divider-Web`

---

## 类型与用法

| 类型 | 尺寸 | 说明 |
|------|------|------|
| 水平分割线（Horizontal） | 宽度自适应 x 0 px（视觉 1 px 线） | 最常用，用于上下区块/段落间 |
| 垂直分割线（Vertical） | 1 px x 16 px | 用于同行并列内容间（如按钮组、标签组） |

---

## 颜色层级

- `Level 1 / Light`（默认颜色，与内容区域背景匹配）

---

## 显示方式

1. **Default（静态）**：无交互，分割线直接静态呈现，两段文字相互独立
2. **带交互触发**：分割线可在展开/收起区块时动态显示或隐藏（以业务组件定义为准）

---

## 极端规则

- **带文字的分割线**（`Divider with label`）：文字内容不可超出分割线总长度，最好限制在 **3 个单词（或汉字词组）以内**
