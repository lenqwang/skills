---
scope: [exchange, web3pay]
layer: L2
---
# Empty 空状态

> 页面无数据时的占位展示组件，包含插图 + 描述文案（可选操作按钮），支持 3 种容器尺寸与 5 种变体类型。

---

## Figma 链接

- [Empty-H5 Guidelines](https://www.figma.com/design/kQIx9xKLiyO6KZIbazNSM2/?node-id=7637-66567)

**组件 Token：** `EmptyV5-web`

---

## 尺寸规格

| 使用场景 | 容器宽 x 高 | 说明 |
|---------|-----------|------|
| 标准页面 Empty | 375 x 227 px | Web / H5 通用 |
| H5 Popup 内 Empty | 343 x 227 px | 嵌入底部弹出层 |
| 无按钮变体 | 375 x 206 px | 简化版，仅图文 |

---

## 变体类型（5 种）

1. 默认空状态（通用）
2. 搜索无结果
3. 网络错误/加载失败
4. 无权限/未开启
5. 无内容/交易记录为空

---

## 使用规范

- **空状态描述内容全展示**，禁止出现省略号（`...`）
- 颜色类型：`Primary` / `Secondary` / `Faded` / `Highlight` / `Critical`
