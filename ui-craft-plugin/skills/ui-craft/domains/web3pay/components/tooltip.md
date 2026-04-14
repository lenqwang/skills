---
scope: [web3pay]
layer: L2
---
# Tooltip 文字气泡提示

> 悬停或聚焦时显示的文字气泡提示，支持 12 个方向、单行/多行模式、可选关闭按钮。
> 只引用语义 Token，代码中通过 `var(--xxx)` 使用对应 CSS 变量。

---

## Figma 链接

- [TooltipV5-web（组件）](https://www.figma.com/design/kQIx9xKLiyO6KZIbazNSM2/V5.1-Web-H5%E7%BB%84%E4%BB%B6%E5%BA%93?node-id=7501-77518)

**组件 Token：** `Tooltip_V5web` / `Tooltip_V5web/text`

---

## 基础规格

| 属性 | 值 | 说明 |
|------|-----|------|
| 背景色 | `--color-cmpt-tooltip-toast` (#303236) | 深灰背景 |
| 文字色 | `--color-text-always-white` (white) | 固定白色 |
| 圆角 | 6px | `border-radius: 6px` |
| 内边距 | 12px 水平 / 8px 垂直 | `padding: 8px 12px` |
| 字体 Token | B13 | 12px / 400 Regular |
| 行高（单行） | 130% | `line-height: 1.3` |
| 行高（多行） | 150% | `line-height: 1.5` |
| 箭头指示器 | 38 × 5 px | 三角形 SVG，与气泡同色 |
| 最大宽度 | 320px | 超出自动换行 |
| 触发间距 | 4px | 气泡与触发元素间距 |

---

## 方向变体（Position）

支持 12 个方向，箭头指向触发元素：

### 上方（箭头朝下）

| 方向 | Token 值 | 箭头位置 | Figma Node |
|------|---------|---------|------------|
| Top | `Position=Top↓` | 居中 | 3195:43385 |
| Top Left | `Position=Top Left↙` | 偏左 | 3195:43585 |
| Top Right | `Position=Top Right↗` | 偏右 | 3195:43593 |

### 下方（箭头朝上）

| 方向 | Token 值 | 箭头位置 | Figma Node |
|------|---------|---------|------------|
| Bottom | `Position=Bottom↑` | 居中 | 3195:43601 |
| Bottom Left | `Position=Bottom Left↖` | 偏左 | 3195:43609 |
| Bottom Right | `Position=Bottom Right↗` | 偏右 | 3195:43617 |

### 左侧（箭头朝右）

| 方向 | Token 值 | 箭头位置 | Figma Node |
|------|---------|---------|------------|
| Left | `Position=Left→` | 居中 | 3195:43625 |
| Left Top | `Position=Left Top ↗` | 偏上 | 3195:44572 |
| Left Bottom | `Position=Left Bottom↘` | 偏下 | 3195:44582 |

### 右侧（箭头朝左）

| 方向 | Token 值 | 箭头位置 | Figma Node |
|------|---------|---------|------------|
| Right | `Position=Right←` | 居中 | 3195:43633 |
| Right Top | `Position=Right Top↖` | 偏上 | 3195:44592 |
| Right Bottom | `Position=Right Bottom ↙` | 偏下 | 3195:44602 |

---

## 内容模式

### 单行模式（Multi-line=False）

| 属性 | 值 |
|------|-----|
| 宽度 | 自适应内容 |
| 高度 | 32px（气泡）+ 5px（箭头）= 37-42px |
| 文字 | `white-space: nowrap` |
| 行高 | 130% |

### 多行模式（Multi-line=True）

| 属性 | 值 |
|------|-----|
| 宽度 | 自适应，最大 320px |
| 高度 | 自适应内容 |
| 文字 | 自动换行 |
| 行高 | 150% |

---

## 文字子组件（Tooltip_V5web/text）

| 属性 | Close=False | Close=True |
|------|------------|-----------|
| 宽度 | 95px | 115px |
| 关闭按钮 | 无 | 右侧 × 按钮 |
| Figma Node | 3195:43378 | 3195:43380 |

---

## 触发方式

| 触发方式 | 说明 |
|---------|------|
| 小 i 图标（`circleoutline_info`） | 12×12px 信息图标，气泡在下方间距 4px |
| 虚线下划线文字 | 可点击文字，气泡在下方间距 4px |
| 链接文字 | 内容含链接时需手动加下划线 |

---

## 布局规范

- 箭头默认居中对齐气泡
- 需要左对齐时，手动调整箭头左右边距
- 气泡与触发元素间距固定 **4px**
- 宽度自适应，最大宽度控制在 **320px**

---

## 色彩 Token

| 元素 | CSS 变量 | Light | Dark |
|------|---------|-------|------|
| 气泡背景 | `--color-cmpt-tooltip-toast` | #303236 | #303236 |
| 文字 | `--color-text-always-white` | white | white |
| 箭头 | 同气泡背景 | #303236 | #303236 |
| 关闭按钮 | — | white (opacity 0.6) | white (opacity 0.6) |

---

## 完整变体矩阵

12 Position × 2 Multi-line = **24 个变体**（Tooltip_V5web）
1 × 2 Close = **2 个变体**（Tooltip_V5web/text）
