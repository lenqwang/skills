---
scope: [exchange, web3pay]
layer: L2
---
# Switch 开关

> 即时生效的二态切换控件，支持 LG/SM 两档尺寸，含动效过渡。

---

## Figma 链接

- [Switch_Web Guidelines](https://www.figma.com/design/kQIx9xKLiyO6KZIbazNSM2/?node-id=7455-56710)

**组件 Token：** `Switch_V5`

---

## 尺寸规范

| 尺寸 | 宽 | 高 | 配套文字规格 |
|------|----|----|------------|
| LG（大） | 40 px | 24 px | 500 weight / 16 px |
| SM（小） | 28 px | 16 px | 500 weight / 12 px |

---

## 交互状态

| 状态 | 说明 |
|------|------|
| Active / On | 开启状态，颜色高亮 |
| Active / Off | 关闭状态，颜色降低 |
| Pressed | 点击瞬态（过渡态） |
| Faded / Disabled | 禁用状态 |

---

## 动效

- 触发方式：Click
- 运动时长：**150 ms**
- 运动曲线：**Ease Out**

---

## 使用规范

1. **立即生效**：开关操作后需立即生效，无需再次确认
2. **互斥场景**：常态的开启/关闭开关通常以互斥场景出现（同一时间只能一个开启）
3. **与文本配合间距**：Switch + Label 间距 **8 px**
4. **多行文本**：标签换行时，Switch 与标签**首行顶端对齐**
5. **Group 内多个 Switch**：垂直堆叠时，相邻开关间距 **4 px**
6. **RTL 适配**：阿拉伯语等 RTL 语言下，Switch 与 Label 位置镜像翻转
