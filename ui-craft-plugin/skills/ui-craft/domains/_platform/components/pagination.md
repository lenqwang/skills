---
scope: [exchange, web3pay]
layer: L2
---
# Pagination 分页

> 页码导航组件，支持页码按钮、翻页箭头、Jumper 跳转，Web/H5 双端适配。

---

## Figma 链接

- [Pagination Guidelines（Web）](https://www.figma.com/design/kQIx9xKLiyO6KZIbazNSM2/?node-id=8103-12077)
- [Pagination Guidelines-H5](https://www.figma.com/design/kQIx9xKLiyO6KZIbazNSM2/?node-id=8103-16511)

**组件 Token：** `PaginationV5-web` / `PaginationV5-web/item`

---

## 尺寸规格

| 元素 | 尺寸 |
|------|------|
| 每个页码按钮（item） | 28 x 28 px |
| 按钮间距 | 8 px |

---

## 总宽度（按页数）

| 页数 | Web / H5 总宽度 | 说明 |
|------|----------------|------|
| 2 页 | 64 px | 2 items |
| 3 页 | 100 px | 3 items |
| 4 页 | 136 px | 4 items |
| 5 页 | 244 px | 5 items + 前后翻页箭头 |
| 超过 5 页 | 388 px | 省略中间页码，显示 `...` |
| 带 Jumper | 591 px（Web）/ 316 px（H5 上排） | 含「每页条数」下拉 + 「跳转到」输入框 |

---

## H5 Jumper 说明

H5 Jumper 为两行布局（总高 64 px）：

- 第一行：页码列表（28 x 28 px 按钮）
- 第二行：「15 Entries/Page」下拉 + 「Jumper to [ ] Page」输入框

---

## 交互状态

| 状态 | 说明 |
|------|------|
| Default | 普通页码 |
| Hover | 鼠标悬浮 |
| Pressed | 点击按下 |
| Active | 当前选中页 |
| Disabled | 翻页箭头不可用（首页/末页） |
