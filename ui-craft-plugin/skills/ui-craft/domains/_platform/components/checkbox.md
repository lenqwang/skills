---
scope: [exchange, web3pay]
layer: L2
---
# Checkbox / Radio 复选框与单选框

> 多选框与单选框统一组件，通过 Type 属性区分，支持 Small/Medium 两档尺寸、多种选中状态与标签样式变体。

---

## Figma 链接

- [Checkbox_Web Guidelines](https://www.figma.com/design/kQIx9xKLiyO6KZIbazNSM2/?node-id=7455-54386)
- [Checkbox_H5 Guidelines](https://www.figma.com/design/kQIx9xKLiyO6KZIbazNSM2/?node-id=7455-54765)
- [Checkbox_V5（组件）](https://www.figma.com/design/kQIx9xKLiyO6KZIbazNSM2/?node-id=7061-62723)
- [GTCheckbox V6](https://www.figma.com/design/9HordMtYdfmXOYwExRy1MF/Gate-App-%E8%AE%BE%E8%AE%A1%E7%B3%BB%E7%BB%9F-V6?node-id=73777-29628)

**组件 Token：** `CheckboxV5-Web` / `GTCheckbox`

---

## 尺寸规范

Web 与 H5 使用相同的两档尺寸，无差异：

| 尺寸 | 选框尺寸 | 标签字重 | 标签字号 | 组件高度 |
|------|---------|---------|---------|---------|
| Small | 12 x 12 px | 400 Regular | 12 px | 16 px |
| Medium (Large) | 16 x 16 px | 400 Regular | 14 px | 18 px |

---

## 类型与状态

### 控件类型（Type）

| 类型 | Token 值 | 说明 |
|------|---------|------|
| Checkbox | `Type=Checkbox` | 标准多选框（方形） |
| Half | `Type=Half` / `Type=Half Select` | 半选/不定态（父节点部分子项已选） |
| Radio | `Type=Radio` | 单选框（圆形），同组互斥 |

### 选中状态（Status）

| 状态 | Token 值 | 说明 |
|------|---------|------|
| Inactive | `Status=Inactive` | 未选中 |
| Active | `Status=Active` | 已选中 |

### 其他变体属性

| 属性 | 可选值 |
|------|-------|
| Disable | `True` / `False` |
| Hover | `True` / `False`（仅 Web 端） |

### 状态矩阵

| 状态 | Active（选中） | Inactive（未选中） |
|------|--------------|-----------------|
| Enable | 高亮色选框 + 勾/点 | 边框描边 + 空心 |
| Disabled | 禁用色填充 + 勾/点（`Checkbox-Dis-Active`） | 禁用色描边（`Checkbox-Dis-Inactive`） |

---

## 标签样式变体（Label）

| Token | 说明 |
|-------|------|
| `GTCheckboxV5/label-12px`（`Dash=False, Solid=False`） | 普通文本标签 |
| `GTCheckboxV5/label-12px`（`Dash=True, Solid=False`） | 带下划线虚线标签（可点击链接样式） |
| `GTCheckboxV5/label-12px`（`Dash=False, Solid=True`） | 带下划线实线标签 |
| `GTCheckboxV5/label-14px`（同上三种） | 14 px 版本，对应 Medium 尺寸 |

---

## 布局规范

- **垂直排列**（推荐）：每行一项，选框与标签顶端对齐，避免误触
- **水平排列**：Radio 可横向排列，同行间距保持一致，常见值约 159 px
- **多行文本**：标签换行后，复选框顶端对齐

---

## 交互热区

| 场景 | 热区规则 |
|------|---------|
| Checkbox 有虚线（如带链接条款） | 选框本身与链接文字各自为**独立热区** |
| Checkbox 无虚线（普通标签） | 选框 + 标签整体作为**一个热区** |
| 标签内含链接（`Dash=True`） | 链接部分与 Checkbox 选项分别为**独立热区** |

> 示意：`[勾]` + `我已阅读并同意` + `[《用户协议》]` — 前两部分一个热区，链接独立热区。

---

## 色彩 Token

| 状态 | Light | Dark |
|------|-------|------|
| 选中态背景（Brand） | Brand/6 | Brand/6 |
| 选中禁用背景 | Neutral/3（`Checkbox-Dis-Active`） | Neutral/7 |
| 未选中禁用背景 | Neutral/2（`Checkbox-Dis-Inactive`） | Neutral/9 |
| 未选中边框 | `Border-Strong`（Neutral/3） | Neutral/7 |

---

## RTL 适配

- `Arabic=true` 时，选框镜像到右侧，标签文字在左
- 组件自带 Arabic 变体，无需手动翻转
