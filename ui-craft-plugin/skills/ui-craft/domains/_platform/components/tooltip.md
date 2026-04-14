---
scope: [exchange, web3pay]
layer: L2
---
# Tooltip 工具提示 + UserGuide 引导气泡

> 包含 Tooltip 轻量说明气泡和 UserGuide 新手引导气泡两个子组件，分别用于信息补充与功能引导。

---

## Figma 链接

- [Tooltips_Web Guidelines](https://www.figma.com/design/kQIx9xKLiyO6KZIbazNSM2/?node-id=7612-258567)
- [Tooltips_H5 Guidelines](https://www.figma.com/design/kQIx9xKLiyO6KZIbazNSM2/?node-id=7689-51102)
- [UserGuide Guidelines-V5（Web）](https://www.figma.com/design/kQIx9xKLiyO6KZIbazNSM2/?node-id=8866-77591)
- [UserGuide Guidelines-H5](https://www.figma.com/design/kQIx9xKLiyO6KZIbazNSM2/?node-id=8866-370920)

---

## Tooltip 工具提示

**组件 Token：** `Tooltip_V5web` / `GTTooltipsV5`

悬停（Web）或点击（H5）触发的轻量说明气泡，用于解释术语、补充信息或提示操作。

### 尺寸规范

| 形态 | 宽度 | 高度 | 说明 |
|------|------|------|------|
| 单行（Normal） | ~95 px（自适应） | 37-42 px | 短文案提示 |
| 多行（Multi Line） | 最大 **327 px** | 自适应 | 较长说明文案 |

- 字重：**400 Regular**，字号：**14 px**
- 最大宽度 **327 px**，超出自动换行（RWD 响应式）

### H5 特殊规则

- **单行**：与 Web 一致，在触发元素附近悬浮显示
- **多行（小 i 解释说明）**：H5 不使用内嵌多行 Tooltip，改用 **Popup 弹出层** 展示（`Popup_V5_H5`）

### 位置方向（6 个）

`TL` / `Top` / `TR` / `BL` / `Bottom` / `BR`

### 颜色类型

`Primary` / `Secondary` / `Faded` / `Highlight` / `Critical`

### 交互热区规则

- Tooltip 内若包含**链接**或**关闭按钮**，链接区域与关闭按钮各自为**独立热区**，不与整个 Tooltip 热区合并

---

## UserGuide 引导气泡

**组件 Token：** `UserGuideV5-web` / `UserGuideV5-H5` / `UserGuideV5-web/item`

用于功能上线后的新手引导（Onboarding Tour），将用户注意力引导至关键功能点。

### 尺寸规范

所有变体固定宽度 **250 px**，高度随内容类型不同：

| 变体 | Web 高度 | H5 高度 | 说明 |
|------|---------|--------|------|
| Title（仅标题） | 103 px | 103 px | 最简版本，只有标题文案 |
| Only Title | 103 px | 103 px | 同上 |
| Button | 168 px | 164 px | 标题 + 按钮（如「知道了」） |
| Page Arrow | 185 px | 185 px | 标题 + 步骤翻页箭头 |
| Close | 197 px | 193 px | 标题 + 关闭按钮 |
| Status | 197 px | 193 px | 标题 + 当前步骤状态 |
| Skip | 197 px | 193 px | 标题 + 跳过按钮 |
| Page（步骤指示） | 197 px | 193 px | 标题 + 页码 + 操作 |

### H5 挖洞规范

H5 引导气泡配合"挖洞"效果使用，高亮目标元素：

- **挖洞圆圈尺寸**：**40 px**（遮罩中间镂空圆形，露出目标 icon）
- 引导气泡浮在挖洞元素附近，方向自适应页面布局

### 使用规范

1. **触发时机**：功能首次曝光时自动弹出，下次进入不再展示（配合 localStorage / 用户偏好记录）
2. **步骤控制**：多步引导时使用 Page Arrow 或 Page 变体，支持前后翻页
3. **跳过机制**：超过 2 步的引导必须提供跳过（Skip）选项
4. **动效**：Auto 触发，支持演示动效（Figma 原型中可预览）
