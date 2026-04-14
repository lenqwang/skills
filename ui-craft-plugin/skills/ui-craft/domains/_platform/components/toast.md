---
scope: [exchange, web3pay]
layer: L2
---
# Toast 反馈通知

> 包含 Alert 吸顶警告和 Message 全局提示两类反馈组件，用于操作结果告知、系统状态提示与全局性通知。

---

## Figma 链接

- [Alert_Web Guidelines 吸顶警告](https://www.figma.com/design/kQIx9xKLiyO6KZIbazNSM2/?node-id=8106-23071)
- [Message 全局提示（Web）](https://www.figma.com/design/kQIx9xKLiyO6KZIbazNSM2/?node-id=7587-74421)
- [Message_H5 Guidelines](https://www.figma.com/design/kQIx9xKLiyO6KZIbazNSM2/?node-id=7752-43422)

---

## Alert 吸顶警告

**组件 Token：** `AlertV5-web`

固定于页面顶部 Header 下方，用于传递全局性通知、公告或风险提示。

### 尺寸规范

| 形态 | 高度 | 宽度 |
|------|------|------|
| 单行 | 36 px | 自适应（最小 343 px） |
| 单行含次要文案 | 58-62 px | 自适应 |
| 多行 / 长文案 | 88 px | 自适应 |

> Web 端宽度随内容区域自适应，最大 1920 px（全宽）；窄屏常见 343 px 或 375 px。

### 颜色类型

`Primary` / `Secondary` / `Faded` / `Highlight` / `Critical`

### 使用规范

- 吸顶展示，跟随页面滚动固定在 Header 下方
- 同一页面建议只展示一条 Alert；如需叠加，按优先级排序后仅展示最高级
- 正文文案不建议超过 2 行；过长内容优先缩减文案

---

## Message 全局提示

**组件 Token：** `MessageV5-web`（普通） / `MessageSeriousV5-web`（严重） / `Message V5-H5`（H5）

临时性、非阻断式的全局反馈条，出现在页面顶部或内容区域上方。

### 尺寸规范

| 形态 | 高度 | Web 宽度 | H5 宽度 |
|------|------|---------|---------|
| 单行（SingleLine） | 40 px | 1920 px（全宽） | 375 px（全宽） |
| 单行 + 文字链 | 51-61 px | 1920 px | 375 px |
| 多行（MultiLine） | 51-82 px | 1920 px | 375 px（可换行） |
| 多行 + 文字链 | 51-82 px | 1920 px | 375 px |

### 布局变体

| 变体 | 说明 |
|------|------|
| SingleLine | 单行文案，无操作按钮 |
| MultiLine | 多行文案，无操作按钮 |
| SingleLine + Btn | 单行文案 + 右侧文字链（CTA） |
| MultiLine + Btn | 多行文案 + 右侧文字链 |

> 文字链颜色：`weight 500` + 下划线，用于突出可点击链接。

### Serious 变体（高关注度）

`MessageSeriousV5-web` 用于需要用户高度关注的场景（安全警告、账户风险等），样式比普通 Message 更强烈。

### 滚动公告样式（H5）

- 文案过长且需要高关注度时，使用**全局滚动公告**样式（横向滚动跑马灯）
- 避免用户因内容过长而错过重要信息

### 位置规范

- 建议跟在 Header 下方，使用**居中对齐**
- 页面底部或中部使用时，改为**居左对齐**

### 颜色类型

`Primary` / `Secondary` / `Faded` / `Highlight` / `Critical`
