---
scope: [web3pay]
layer: L2
context: pay-b
---

# Tab 标签页

> 来源: Figma [V5.1 Web-H5 组件库](https://www.figma.com/design/kQIx9xKLiyO6KZIbazNSM2/) · Node `7073:55239`
> 归属: web3pay / Pay B端商户后台
> 版本: v2.0.0（完整 3 组件 × 多尺寸 × 多变体）

## 组件概述

V5 Tab 标签页完整体系，包含 3 个子组件：
- **Tabs_PrimaryV5-web**：顶层导航 Tab（Underline 下划线 / Text 纯文字 两种样式）
- **Tabs_V5/type_underline**：内容区下划线 Tab（带 Tag / Hot icon / Dropdown / Prefix Icon 等扩展）
- **Tabs_V5/type_text**：内容区纯文字 Tab（同样支持 Tag / Hot icon / Dropdown / Prefix Icon）

另有 **Tabs_CardV5-web**（胶囊卡片）和 **Tabs_BuySellV5-web**（买卖切换）特殊变体。

---

## 子组件一：Tabs_PrimaryV5-web（顶层导航）

### 样式类型（Type）

| Type | 说明 | 选中态标识 |
|------|------|---------|
| **Underline** | 下划线 Tab | 底部 3px × 16px 居中实色下划线 |
| **Text** | 纯文字 Tab | 仅字重加粗，无下划线 |

### 尺寸变体

| 尺寸 | 高度 | 字号 | 字重(Active) | 间距 |
|------|------|------|------------|------|
| 56px | 56px | 24px | 600 Semibold | 24px |
| 48px | 48px | 18px | 600 Semibold | 20px |
| 44px | 44px | 16px | 600 Semibold | 16px |
| 40px | 40px | 14px | 500 Medium | 16px |
| 32px | 32px | 14px | 500 Medium | 16px |

### 可选属性

| 属性 | 说明 |
|------|------|
| Arrow | `True` / `False`，右侧带左右箭头导航（Tab 数量多时） |

---

## 子组件二：Tabs_V5/type_underline（下划线 Tab）

### 变体属性

| 属性 | 可选值 | 说明 |
|------|-------|------|
| Status | `Active` / `Inactive` / `Inactive-Hover` | 激活/未激活/悬停 |
| Font Size | `56px` / `48px` / `44px` / `40px` / `32px` | 5 档字号 |
| Tag | `True` / `False` | 右上角标签（如数量/NEW） |
| Hot icon | `True` / `False` | 右上角火焰图标 |
| Dropdown | `True` / `False` | 右侧下拉箭头 |
| Prefix Icon | `True` / `False` | 左侧前缀图标 |

### 状态样式

| 状态 | 字重 | 文字色 | 下划线 |
|------|------|-------|-------|
| **Active** | 600 Semibold | `#070808` | 3px `#070808`，宽度 16px 居中 |
| **Inactive** | 400 Regular | `#A0A3A7` | 无 |
| **Inactive-Hover** | 400 Regular | `#070808` | 无 |

---

## 子组件三：Tabs_V5/type_text（纯文字 Tab）

### 变体属性

与 `type_underline` 相同的属性矩阵（Status / Font Size / Tag / Hot icon / Dropdown / Prefix Icon），区别在于：

- Active 态**无底部下划线**，仅通过字重 600 区分
- Inactive-Hover 态字色更深，提供反馈

---

## 特殊变体

### Tabs_CardV5-web（胶囊卡片 Tab）

| 属性 | 值 |
|------|-----|
| 形状 | 胶囊圆角（`border-radius: 8px`） |
| Active 背景 | `#FFFFFF`（白色） |
| Inactive 背景 | 透明 |
| 容器背景 | `#F5F6F7`（灰色底） |
| 高度 | 32px / 40px |

### Tabs_BuySellV5-web（买卖切换 Tab）

| 属性 | 值 |
|------|-----|
| Buy（买入） | 绿色背景 `GreenTrade/6` |
| Sell（卖出） | 红色背景 `RedTrade/6` |
| 容器 | 深色背景 / 浅色背景双模式 |

---

## 通用尺寸规格表

| 高度 | 字号 | 字重(Active) | 字重(Inactive) | Tab 间距 |
|------|------|------------|--------------|---------|
| 56px | 24px | 600 Semibold | 400 Regular | 24px |
| 48px | 18px | 600 Semibold | 400 Regular | 20px |
| 44px | 16px | 600 Semibold | 400 Regular | 16px |
| 40px | 14px | 500 Medium | 400 Regular | 16px |
| 32px | 14px | 500 Medium | 400 Regular | 16px |

---

## 色彩 Token（映射 pay-b-default 变量）

> 生成时必须使用右列 CSS 变量，禁止硬编码色值。

| 元素 | CSS 变量（pay-b-default） | 值 |
|------|--------------------------|-----|
| Active 文字 | `var(--text-primary)` | `#070808` |
| Inactive 文字 | `var(--text-tertiary)` | `#A0A3A7` |
| Hover 文字 | `var(--text-primary)` | `#070808` |
| 下划线色 | `var(--text-primary)` | `#070808`（3px 高 × 16px 宽，居中） |
| 容器底线 | `var(--divider-strong)` | `#F2F3F4` |
| Card Active 背景 | `var(--bg-card)` | `#FFFFFF` |
| Card 容器背景 | `var(--bg-muted)` | `#F5F6F7` |
| Tag 背景(绿) | `var(--tag-green-bg)` | `#E6F4D2` |
| Tag 文字(绿) | `var(--tag-green-text)` | `#68AD00` |
| Tag 背景(红) | `var(--tag-red-bg)` | `#FEE2E2` |
| Tag 文字(红) | `var(--tag-red-text)` | `#EF4444` |
| Hot icon | — | 红色火焰 |

---

## CSS 实现参考

```css
/* 容器 */
.tabs-v5 { display: flex; border-bottom: 1px solid #F2F3F4; overflow-x: auto; }
.tabs-v5--no-border { border-bottom: none; }

/* 下划线 Tab */
.tab-underline {
  display: inline-flex; align-items: center; justify-content: center;
  position: relative;
  height: 48px; padding: 0 20px;
  font-size: 18px; font-weight: 400;
  color: #A0A3A7;
  border: none; background: transparent;
  margin-bottom: -1px;
  cursor: pointer; transition: all 0.15s ease; white-space: nowrap;
}
.tab-underline:hover { color: #070808; }
.tab-underline--active { color: #070808; font-weight: 600; }
.tab-underline--active::after {
  content: ''; position: absolute; bottom: -1px;
  left: 50%; transform: translateX(-50%);
  width: 16px; height: 3px;
  background: #070808; border-radius: 1px;
}

/* 纯文字 Tab */
.tab-text {
  display: inline-flex; align-items: center; justify-content: center;
  height: 48px; padding: 0 20px;
  font-size: 18px; font-weight: 400;
  color: #A0A3A7;
  border: none; background: transparent;
  cursor: pointer; transition: all 0.15s ease; white-space: nowrap;
}
.tab-text:hover { color: #070808; }
.tab-text--active { color: #070808; font-weight: 600; }

/* 胶囊卡片 Tab */
.tabs-card { display: flex; gap: 4px; padding: 4px; background: #F5F6F7; border-radius: 12px; }
.tab-card {
  display: inline-flex; align-items: center; justify-content: center;
  height: 32px; padding: 0 16px;
  border-radius: 8px; border: none; background: transparent;
  font-size: 14px; font-weight: 400; color: #A0A3A7;
  cursor: pointer; transition: all 0.15s ease;
}
.tab-card--active { background: #FFFFFF; color: #070808; font-weight: 500; box-shadow: 0 1px 3px rgba(0,0,0,0.08); }

/* 尺寸类 */
.tab--56 { height: 56px; font-size: 24px; padding: 0 24px; }
.tab--48 { height: 48px; font-size: 18px; padding: 0 20px; }
.tab--44 { height: 44px; font-size: 16px; padding: 0 16px; }
.tab--40 { height: 40px; font-size: 14px; padding: 0 16px; }
.tab--32 { height: 32px; font-size: 14px; padding: 0 16px; }

/* Tag 扩展 */
.tab__tag { display: inline-flex; align-items: center; justify-content: center; padding: 0 4px; min-width: 16px; height: 16px; border-radius: 8px; font-size: 10px; font-weight: 600; margin-left: 4px; }
.tab__tag--green { background: #E6F4D2; color: #68AD00; }
.tab__tag--red { background: #FEE2E2; color: #EF4444; }

/* Hot icon */
.tab__hot { width: 14px; height: 14px; margin-left: 2px; }

/* Dropdown */
.tab__dropdown { width: 16px; height: 16px; margin-left: 4px; color: inherit; display: flex; align-items: center; }
.tab__dropdown svg { width: 16px; height: 16px; display: block; }

/* Prefix Icon */
.tab__prefix { width: 16px; height: 16px; margin-right: 4px; color: inherit; display: flex; align-items: center; }
.tab__prefix svg { width: 16px; height: 16px; display: block; }
```

---

## Figma 节点索引

| 子组件 | Figma Frame |
|--------|------------|
| Tabs_PrimaryV5-web | 7016:79949 |
| Tabs_V5/type_underline | 7016:80227 |
| Tabs_V5/type_text | 428:7652 |
| Tabs_CardV5-web | （截图可见，ID 待补充） |
| Tabs_BuySellV5-web | （截图可见，ID 待补充） |
