---
scope: [web3pay]
layer: L2
context: pay-b
status: FINAL
---

# LeftSidebar 左侧导航

> 来源: Figma [Pay-B端-商家后台](https://www.figma.com/design/tlFIl7F7A7Zl6e9WRLMDZo/) · Node `8121:10355` / `15838:17924`
> 归属: web3pay / Pay B端商户后台
> 版本: v3.0.0（基于 pay-b-full-demo.html 最终实现封装）
> 状态: **FINAL** — 已锁定，不再调整

## 组件概述

后台左侧菜单栏（320px），通栏满高 100vh，包含商户信息卡片、菜单分组、多级子菜单展开收起。移动端 ≤1247px 时隐藏，通过汉堡按钮唤出覆盖层。

## 基础规格

| 属性 | 值 | 说明 |
|------|-----|------|
| 宽度 | **320px**（`--sidebar-width`） | 固定值 |
| 高度 | **100vh**（通栏满高） | `position:fixed; top:0; left:0` |
| 背景 | **`#FFFFFF`** | 纯白色 |
| 右侧边框 | `1px solid #DFE0E2` | — |
| 内边距 | `24px 0` | 上下 24px，菜单项自带水平 padding |
| 内部布局 | `display:flex; flex-direction:column; gap:24px` | — |
| 溢出 | `overflow-y: auto` | — |
| z-index | 90 | 高于 Main，低于 Modal |

## 商户信息卡片

```
┌─ padding: 0 24px ────────────────────────┐
│ ┌─ border: 1px solid #F2F3F4 ──────────┐ │
│ │ border-radius: 12px · padding: 12px  │ │
│ │ display: flex; align-items: center;  │ │
│ │ justify-content: space-between       │ │
│ │                                      │ │
│ │ [40px 圆形头像]  商家名称    ▼        │ │
│ └──────────────────────────────────────┘ │
└──────────────────────────────────────────┘
```

| 属性 | 值 |
|------|-----|
| 外层 padding | `0 24px` |
| 外层 margin-bottom | `0` |
| 卡片边框 | `1px solid #F2F3F4` |
| 卡片圆角 | 12px |
| 卡片内边距 | 12px |
| 卡片布局 | `display:flex; align-items:center; justify-content:space-between` |
| 头像 | **40px** 圆形（`border-radius:100px`），红色背景 `#E54545` |
| 头像内文字 | SVG `<text>` 居中，12px/600 白色 |
| 商户名 | 16px / 600 / `#070808`，`overflow:hidden; text-overflow:ellipsis; white-space:nowrap` |
| 商户名容器宽度 | `149px` 固定宽度截断 |
| 下拉箭头 | **14×14px** chevron / **与文字色一致 `#070808`** |

## 一级菜单项（双层结构）

```html
<div class="sidebar__item">              ← 外层: 56px 高, padding 6px 24px, 无圆角
  <div class="sidebar__item-inner">      ← 内层: height:100%, padding 10px 12px, 圆角 8px
    <svg class="sidebar__item-icon"/>    ← 图标 16×16px 面性填充(fill)
    <span class="sidebar__item-text"/>   ← 14px / 600 / #070808
    <svg class="sidebar__item-arrow"/>   ← 可选: chevron 12×12px / #070808
  </div>
</div>
```

### 状态规则（背景色在内层）

| 状态 | 外层 `.sidebar__item` | 内层 `.sidebar__item-inner` |
|------|----------------------|---------------------------|
| Default | `background: transparent` | `background: transparent` |
| **Hover** | `background: transparent` | **`background: #F5F6F7`** · `border-radius: 8px` |
| **Active** | `background: transparent` | **`background: #E6F4D2`** · `border-radius: 8px` |
| Expanded | `background: none` | `background: transparent` |

### 图标规格

| 属性 | Default | Active |
|------|---------|--------|
| 渲染尺寸 | **16×16px** | **16×16px** |
| 风格 | **面性填充** `fill="currentColor"` | 面性填充 `fill="currentColor"` |
| 颜色 | **`#070808`**（与文字色一致，通过 `currentColor` 继承） | **`#68AD00`**（品牌绿） |

> **规则：图标采用面性（filled）风格，颜色始终与同行文字颜色保持一致，不使用 opacity 降低透明度，不使用线性描边（stroke）。**

### 一级菜单规格表

| 属性 | 值 |
|------|-----|
| 外层高度 | 56px |
| 外层 padding | `6px 24px` |
| 外层圆角 | 0（无） |
| 内层布局 | `display:flex; align-items:center; gap:8px; height:100%` |
| 内层 padding | `10px 12px` |
| 内层圆角 | **8px** |
| 内层 transition | `background 150ms ease` |
| 图标 | 16×16px · **面性填充** · `fill="currentColor"` · 颜色继承文字色 |
| 图标容器 | `width:20px; height:20px; display:flex; align-items:center; justify-content:center; padding:2px; box-sizing:border-box` |
| 文字 | 14px / 600 / `#070808` / `line-height:1.3` / `flex:1` |
| 文字溢出 | `overflow:hidden; text-overflow:ellipsis; white-space:nowrap` |
| 箭头 | chevron `12×12px` / **`color:#070808`** / `viewBox="0 0 16 10"` |
| 箭头容器 | `width:16px; height:16px; display:flex; align-items:center; justify-content:center` |
| 箭头展开 | `transform: rotate(180deg)` / `transition: transform 200ms ease` |

### Active 状态

| 属性 | 值 |
|------|-----|
| 内层背景 | `#E6F4D2` |
| 文字颜色 | `#68AD00` |
| 图标颜色 | `#68AD00`（通过 CSS `color` 属性设置，SVG 使用 `currentColor`） |
| Hover 时 | 背景保持 `#E6F4D2` 不变 |

## 二级子菜单项（同样双层结构）

```html
<button class="sidebar__sub-item">
  <div class="sidebar__sub-item-inner">  ← 内层: padding 12px 12px 12px 20px, 圆角 8px
    收款管理
  </div>
</button>
```

### 二级状态

| 状态 | 内层 `.sidebar__sub-item-inner` |
|------|-------------------------------|
| Default | `background: transparent` |
| **Hover** | **`background: #F5F6F7`** · `border-radius: 8px` |
| **Active** | **`background: #E6F4D2`** · `border-radius: 8px` · `color: #68AD00` |

### 二级菜单规格表

| 属性 | 值 |
|------|-----|
| 外层 padding | `0 24px` |
| 外层 margin-bottom | `12px` |
| 内层 padding | `12px 12px 12px 20px` |
| 内层圆角 | **8px** |
| 内层 transition | `background 150ms ease` |
| 字号 | 14px / 500 / `#3C3F45` |
| Active 颜色 | `#68AD00` / 500 |

### 子菜单容器

| 属性 | 值 |
|------|-----|
| 容器类名 | `.sidebar__sub` |
| 默认 | `max-height:0; overflow:hidden; padding-left:24px` |
| 展开时 | `max-height:500px; padding-top:12px; padding-bottom:12px` |
| 动画 | `transition: max-height 200ms ease` |

## 分组标签

| 属性 | 值 |
|------|-----|
| padding | `0 24px` |
| 字号 | 14px / 500 |
| 颜色 | `#A0A3A7` |
| 大小写 | 正常（非大写） |

## 完整菜单结构

```
[40px 头像]  Chuan Gu        ▼

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🏠 Home                           ← Active: 内层 #E6F4D2 + 文字/图标 #68AD00
☰ Transactions            ▼      ← Expandable
   ├ Collection                   ← 二级，内层 8px 圆角
   └ Payout
💰 Balance
👥 Customers
🔲 Developer Center        ▼      ← Expandable
   ├ App Config
   └ Callback Records

━━━━ Products ━━━━                ← 14px/500 #A0A3A7 分组标签
🎁 Gift Card
💳 Collection              ▼      ← Expandable
   ├ Payment Links
   └ Static QR Code
📤 Payout                  ▼      ← Expandable
   └ Reward Payout
```

## 交互规则

### 展开/收起

| 规则 | 说明 |
|------|------|
| 触发 | 点击一级菜单整行 |
| 箭头动画 | `chevron_down` 旋转 180°，`transform 200ms ease` |
| 子菜单动画 | `max-height 200ms ease`，`overflow: hidden` |
| 互斥 | **不互斥**，多个可同时展开 |
| 默认展开 | 当前页面所属父菜单自动展开 |

### 页面切换

| 规则 | 说明 |
|------|------|
| 一级直达 | 点击无子菜单项 → 页面切换 + Active |
| 二级选中 | 点击子菜单项 → 页面切换 + 子项 Active |
| Active 互斥 | 全局仅一个 Active（一级或二级） |
| 父级高亮 | 子菜单选中时父级保持 Expanded 态（非 Active） |

## 响应式

| 断点 | Sidebar 状态 |
|------|-------------|
| ≥1248px | 320px 完整展开 |
| <1248px | **隐藏**，通过汉堡按钮唤出 |

### 移动端覆盖模式

```css
@media (max-width: 1247px) {
  .sidebar { display: none; }
  .sidebar-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,.4); z-index: 89; }
  .sidebar-overlay.show { display: block; }
  .sidebar.sidebar--open {
    display: flex !important;
    position: fixed; left: 0; top: 0;
    z-index: 200;
    box-shadow: 8px 0 24px rgba(0,0,0,.12);
  }
  .hamburger-btn { display: flex !important; }
  .header { left: 0; }
  .main { margin-left: 0; }
}
```

## CSS 实现（最终版 — 与 pay-b-full-demo.html 完全一致）

```css
:root {
  --sidebar-width: 320px;
}

/* 容器 */
.sidebar {
  position: fixed; top: 0; left: 0;
  width: var(--sidebar-width);
  height: 100vh;
  background: #FFFFFF;
  border-right: 1px solid #DFE0E2;
  padding: 24px 0;
  overflow-y: auto;
  z-index: 90;
  display: flex; flex-direction: column; gap: 24px;
}

/* 一级菜单项 — 外层 */
.sidebar__item {
  display: flex; align-items: center; gap: 8px;
  height: 56px; padding: 6px 24px;
  border-radius: 0;
  font-size: 14px; font-weight: 600; color: #070808;
  cursor: pointer; transition: none;
  text-decoration: none; border: none; background: none;
  width: 100%; text-align: left;
}

/* 一级菜单项 — 内层 */
.sidebar__item-inner {
  display: flex; align-items: center; gap: 8px;
  height: 100%; padding: 10px 12px;
  border-radius: 8px; flex: 1;
  transition: background 150ms ease;
}

/* 图标容器 */
.sidebar__item-icon {
  width: 20px; height: 20px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  padding: 2px; box-sizing: border-box;
}

/* 文字 */
.sidebar__item-text {
  font-size: 14px; font-weight: 600; color: #070808;
  line-height: 1.3; flex: 1;
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}

/* 箭头 */
.sidebar__item-arrow {
  width: 16px; height: 16px; flex-shrink: 0;
  color: #070808;
  transition: transform 200ms ease;
  display: flex; align-items: center; justify-content: center;
  padding: 2px; box-sizing: border-box;
}
.sidebar__item--expanded .sidebar__item-arrow { transform: rotate(180deg); }

/* 状态 — Hover */
.sidebar__item:hover { background: transparent; }
.sidebar__item:hover .sidebar__item-inner { background: #F5F6F7; }

/* 状态 — Active */
.sidebar__item--active { background: transparent; }
.sidebar__item--active .sidebar__item-inner { background: #E6F4D2; color: #68AD00; }
.sidebar__item--active .sidebar__item-text { color: #68AD00; }
.sidebar__item--active .sidebar__item-icon { color: #68AD00; }
.sidebar__item--active .sidebar__item-inner .sidebar__item-icon { color: #68AD00; }
.sidebar__item--active:hover .sidebar__item-inner { background: #E6F4D2; }

/* Expanded */
.sidebar__item--expanded { background: none; }

/* 分组标签 */
.sidebar__group-label {
  padding: 0 24px;
  font-size: 14px; font-weight: 500; color: #A0A3A7;
  line-height: 1.3;
}

/* 二级子菜单容器 */
.sidebar__sub {
  overflow: hidden; transition: max-height 200ms ease;
  max-height: 0; padding-left: 24px;
}
.sidebar__sub.open { max-height: 500px; padding-top: 12px; padding-bottom: 12px; }

/* 二级子菜单项 — 外层 */
.sidebar__sub-item {
  display: flex; align-items: center; height: auto;
  padding: 0 24px;
  font-size: 14px; font-weight: 500; color: #3C3F45;
  cursor: pointer; transition: none;
  border: none; background: none; width: 100%; text-align: left;
  margin-bottom: 12px;
}

/* 二级子菜单项 — 内层 */
.sidebar__sub-item-inner {
  display: flex; align-items: center; height: 100%;
  padding: 12px 12px 12px 20px;
  border-radius: 8px; flex: 1;
  transition: background 150ms ease;
  font-size: 14px;
}
.sidebar__sub-item:hover .sidebar__sub-item-inner { background: #F5F6F7; }
.sidebar__sub-item--active .sidebar__sub-item-inner {
  background: #E6F4D2; font-weight: 500; color: #68AD00;
}
.sidebar__sub-item--active:hover .sidebar__sub-item-inner { background: #E6F4D2; }
```

## 图标清单（面性填充 SVG）

所有图标均为 **面性（filled）** 风格，使用 `fill="currentColor"`，渲染尺寸 `width="16" height="16"`，viewBox 根据路径数据适配。

| 菜单项 | viewBox | 说明 |
|--------|---------|------|
| Home | `0 0 19 18.1002` | 房屋图标 |
| Transactions | `0 0 17 16` | 三横线列表 |
| Balance | `0 0 18 17` | 钱包/银行卡 |
| Customers | `0 0 17 17.916` | 单人半身像 |
| Developer Center | `0 0 19 17` | 终端/代码窗口 |
| Gift Card | `0 0 18 18` | 礼品盒 |
| Collection | `0 0 20 16` | 信用卡 |
| Payout | `0 0 19.5 18` | 纸飞机/发送 |
