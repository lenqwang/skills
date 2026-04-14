---
scope: [exchange, web3pay]
layer: L2
---
# Tabs 标签页

> 包含 Primary、Capsules、Card 三种标签页类型，覆盖 Web 与 H5 双端多档尺寸规格。

---

## Figma 链接

- [Tabs Guidelines（Web Primary）](https://www.figma.com/design/kQIx9xKLiyO6KZIbazNSM2/?node-id=7642-88549)
- [Tabs card Guidelines（Web Card）](https://www.figma.com/design/kQIx9xKLiyO6KZIbazNSM2/?node-id=7895-11260)
- [Tabs Guidelines-H5](https://www.figma.com/design/kQIx9xKLiyO6KZIbazNSM2/?node-id=7642-89101)

**组件 Token：** `Tabs_PrimaryV5-web` / `TabsV5-H5` / `Tabs_Capsules_V5` / `TabsCardV5-web` / `TabsAngleCardV5-web` / `TabsCard V5-H5`

---

## Primary 标签页

### Web 尺寸（5 档）

| 规格 | 高度 | 示例宽度（3 个 Tab） |
|------|------|-----------------|
| Primary-56 | 56 px | 210 px |
| Primary-48 | 48 px | 163 px |
| Primary-44 | 44 px | 140 px |
| Primary-40 | 40 px | 125 px |
| Primary-32 | 32 px | -- |

### H5 适配

| 规格 | Web 高度 -> H5 高度 | 容器宽度 |
|------|-------------------|---------|
| Primary-56 | 56 px -> 44 px | 375 px |
| Primary-48 | 48 px -> 44 px | 375 px |
| Primary-44 | 44 px | 375 px |
| Primary-40 | 40 px | 375 px |
| Primary-32 | 32 px -> 40 px | 375 px |

> H5 Primary Tabs 统一使用 **44 px** 高度（特殊场景可使用 40 px）。

---

## Capsules 胶囊标签页（4 档）

| 规格 | Web 高度 | H5 高度 | H5 宽度 |
|------|---------|--------|--------|
| Capsules-40 | 40 px | -- | -- |
| Capsules-36 | 36 px | -- | -- |
| Capsules-32 | 32 px | 32 px | 375 px |
| Capsules-28 | 28 px | 28 px | 375 px |

---

## Card 卡片标签页

### Web 尺寸

| 规格 | 高度 | 类型 |
|------|------|------|
| Tabscard-56 | 56 px | `TabsCardV5-web` |
| Tabscard-40 | 40 px | `TabsCardV5-web`（标准） |
| Tabscard-32 | 32 px | `TabsCardV5-web` / `TabsAngleCardV5-web` |
| Tabscard-28 | 28 px | `TabsCardV5-web` |

### H5 尺寸

| 规格 | 高度 | 宽度 |
|------|------|------|
| Tabscard-32 | 32 px | 208 px |
| Tabscard-28 | 28 px | 157 px / 193 px |

---

## 交互规则

1. **Dropdown 折叠**：Tab 项数超过一屏时，末尾显示折叠按钮，点击弹出 Popup 层（含完整选项列表）
2. **滚动居中**：
   - 所有 Tab 均可展示（无折叠）时，选中 Tab **不发生位移**
   - 存在折叠时，若点击的 Tab 位于屏幕中心以外，选中 Tab 自动**平移至屏幕中心**
3. **DO / DON'T**：
   - DO：Tab 未超出屏幕时保持静止，选中不平移
   - DON'T：不可在所有 Tab 都可见时强制让选中项居中
