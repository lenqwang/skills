---
scope: [web3pay]
layer: L1
---

# Web3Pay 三端自适应规则

> Web / H5 / App 三端响应式适配规范。
> 适用于 Web3 钱包、Pay 支付、Pay-B 商户后台三条产品线。

---

## 断点体系

| 断点名称 | 范围 | 典型设备 | 适配策略 |
|---------|------|---------|---------|
| **mb** | 0 – 375px | 小屏手机 | App WebView / 极窄 H5 |
| **pad** | 376 – 767px | 标准手机 / 平板 | H5 主力断点 |
| **xs** | 768 – 991px | 平板横屏 / 小笔记本 | H5 大屏 / Web 窄屏 |
| **slg** | 992 – 1023px | 小笔记本 | Web 紧凑 |
| **sxl** | 1024 – 1247px | 笔记本 | Web 标准 |
| **smx** | 1248 – 1279px | 大笔记本 | **B 端 Sidebar 展开断点** |
| **sm** | 1280 – 1679px | 标准桌面 | Web 默认模式 |
| **md** | 1680 – 1919px | 大屏桌面 | Web 宽屏模式 |
| **lg** | 1920 – 2559px | 超宽屏 | Web 最大宽度 |
| **xl** | ≥ 2560px | 外接显示器 | 超宽屏限制 |

```css
/* 断点变量（线上 Pay-B 真值） */
:root {
  /* min-width 下界 */
  --bp-min-mb:  375px;
  --bp-min-pad: 768px;
  --bp-min-slg: 992px;
  --bp-min-sxl: 1024px;
  --bp-min-smx: 1248px;  /* B端关键: Sidebar 展开 */

  /* max-width 上界 */
  --bp-max-mb:  375px;   /* ≤ 375px 移动端 */
  --bp-max-pad: 768px;   /* < 768px 平板以下 */
  --bp-max-xs:  991px;   /* < 992px B端 Sidebar 折叠 */
  --bp-max-smx: 1247px;  /* < 1248px B端 Sidebar 压缩 */
  --bp-max-sm:  1279px;  /* < 1280px 紧凑桌面 */
  --bp-max-md:  1679px;  /* < 1680px 中等桌面 */
  --bp-max-lg:  1919px;  /* < 1920px 标准桌面 */
  --bp-max-xl:  2559px;  /* < 2560px 超宽屏 */
}
```

---

## 产品线适配策略

### 1. Web3 钱包 / Pay 支付（C 端）

| 维度 | Web (≥1024px) | H5 (375–767px) | App |
|------|--------------|----------------|-----|
| 导航 | Header 64px + Sidebar 200px | 底部 TabBar 56px | 原生 NavBar 44px |
| 内容区 | Sidebar 右侧，max-width 1200px | 全宽，padding 16px | 全宽，padding 24px |
| 栅格 | 12 列，gutter 24px | 4 列，gutter 16px | 无栅格，flex 布局 |
| 字阶 | Web 字阶（H1 48px → Body 14px） | H5 字阶（H1 28px → Body 14px） | App 字阶（h2 28px → bs1 14px） |
| 卡片 | max-width 480px 居中 | 全宽 - 32px | 全宽 - 48px |
| 弹窗 | 居中浮层 max-width 480px | 底部抽屉全宽 | 原生 Sheet |
| 列表 | 虚拟滚动 | 下拉刷新 + 上拉加载 | 原生 FlatList |

### 2. Pay-B 商户后台（B 端）

| 维度 | ≥1920px (lg) | 1680–1919 (md) | 1280–1679 (sm) | 1248–1279 (smx) | 1024–1247 (sxl) | 992–1023 (slg) | <992 (max-xs) |
|------|-------------|---------------|---------------|----------------|----------------|---------------|--------------|
| Sidebar | 320px 展开 | 320px 展开 | 320px 展开 | **320px 展开** | 64px 折叠 | 64px 折叠 | 64px 折叠 |
| 内容区 | max-1600px | 自适应 | 自适应 | 自适应 | 自适应 | 自适应 | 自适应 |
| 内边距 | 48px | 40px 32px | 40px 32px | 40px 32px | 32px 24px | 32px 24px | 24px 16px |
| 数据卡片 | 4 列 | 4 列 | 4 列 | 3 列 | 3 列 | 2 列 | 1 列 |
| 设置卡片 | 3 列 | 3 列 | 3 列 | 2 列 | 2 列 | 1 列 | 1 列 |
| 表格 | 全列 | 全列 | 全列 | Action sticky | Action sticky | 横向滚动 | 横向滚动 |

> Pay-B **Sidebar 展开关键断点: 1248px**（`min-smx`），<1248px 折叠为 64px。
> 最小支持宽度 992px（`min-slg`）。

---

## 布局切换规则

### Sidebar 折叠

```css
/* ≥1248px: Sidebar 完整展开 (min-smx) */
@media (min-width: 1248px) {
  .sidebar { width: 320px; }
  .sidebar__item-text,
  .sidebar__group-label,
  .sidebar__sub-inner,
  .sidebar__merchant-info,
  .sidebar__merchant-arrow { display: flex; }
  .main { margin-left: 320px; }
}

/* <1248px: Sidebar 折叠为图标栏 (max-smx) */
@media (max-width: 1247px) {
  .sidebar { width: 64px; padding: 12px 8px; }
  .sidebar__item-text,
  .sidebar__group-label,
  .sidebar__sub-inner,
  .sidebar__merchant-info,
  .sidebar__merchant-arrow { display: none; }
  .sidebar__item { padding: 6px 0; justify-content: center; }
  .sidebar__item-inner { padding: 10px; justify-content: center; }
  .main { margin-left: 64px; }
}

/* <992px: 更紧凑模式 (max-xs) */
@media (max-width: 991px) {
  .main { padding: 24px 16px; }
}

/* <768px: Sidebar 抽屉模式 (max-pad，B端一般不用) */
@media (max-width: 767px) {
  .sidebar { 
    position: fixed; left: -320px; z-index: 200;
    transition: left 0.3s ease;
  }
  .sidebar--open { left: 0; }
  .main { margin-left: 0; }
}
```

### 表格自适应

```css
/* 大屏：全列展示 */
@media (min-width: 1440px) {
  .table-gtpay td,
  .table-gtpay th { white-space: nowrap; }
  .table-container { overflow-x: visible; }
}

/* 中屏：Action 列固定 + 横向滚动 */
@media (max-width: 1439px) {
  .table-container { overflow-x: auto; }
  .action-col {
    position: sticky;
    right: 0;
    background: #FFFFFF;
    z-index: 2;
    box-shadow: -8px 0 16px rgba(0,0,0,0.08);
  }
}

/* H5：卡片模式替换表格 */
@media (max-width: 767px) {
  .table-gtpay { display: none; }
  .card-list { display: flex; flex-direction: column; gap: 12px; }
  .card-list-item {
    background: #FFFFFF;
    border: 1px solid #ECEDEF;
    border-radius: 12px;
    padding: 16px;
  }
}
```

### 数据卡片网格

```css
.stat-grid {
  display: grid;
  gap: 20px;
}

@media (min-width: 1440px) { .stat-grid { grid-template-columns: repeat(4, 1fr); } }
@media (min-width: 1024px) and (max-width: 1439px) { .stat-grid { grid-template-columns: repeat(3, 1fr); } }
@media (min-width: 768px) and (max-width: 1023px) { .stat-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 767px) { .stat-grid { grid-template-columns: 1fr; } }
```

---

## 字阶响应式映射

| Token | Web (≥1024px) | H5 (375–767px) | 缩放比 |
|-------|-------------|----------------|-------|
| D1 | 80px | 32px | 0.4x |
| D2 | 56px | 32px | 0.57x |
| H1 | 48px | 28px | 0.58x |
| H2 | 40px | 28px | 0.7x |
| H3 | 40px | 24px | 0.6x |
| H4 | 32px | 24px | 0.75x |
| H5 | 28px | 18px | 0.64x |
| H6 | 24px | 18px | 0.75x |
| H7 | 24px | 16px | 0.67x |
| S1 | 24px | 18px | 0.75x |
| S3 | 20px | 16px | 0.8x |
| S5 | 18px | 16px | 0.89x |
| S7 | 16px | 16px | 1x |
| B1 | 20px | 14px | 0.7x |
| B3 | 16px | 16px | 1x |
| B5 | 16px | 14px | 0.88x |
| B8 | 14px | 14px | 1x |
| B13 | 12px | 12px | 1x |

> Body 字号（≤16px）在 H5 端基本不缩放，Display/Heading 有明显缩放。

---

## 间距响应式

| Token | Web (≥1440px) | Web (1024–1439px) | H5 (375–767px) |
|-------|-------------|------------------|----------------|
| page-top | 40px | 32px | 16px |
| page-side | 32px | 24px | 16px |
| section-gap | 40px | 32px | 24px |
| card-gap | 20px | 16px | 12px |
| card-inner | 24px | 20px | 16px |
| breadcrumb-to-title | 48px | 32px | 16px |

---

## 组件自适应规则

### Button

| 尺寸 | Web | H5 |
|------|-----|-----|
| Primary CTA | height 48px, padding 0 24px | height 48px, **全宽** `width: 100%` |
| Secondary | height 40px, padding 0 20px | height 40px, padding 0 16px |
| Small | height 32px | height 32px（不变） |

### Tab

| 场景 | Web | H5 |
|------|-----|-----|
| Tab 数量 ≤ 5 | 等宽或自适应 | 等宽 `flex: 1` |
| Tab 数量 > 5 | 自适应 + Arrow 箭头导航 | 横向滚动 `overflow-x: auto` |

### Modal / Dialog

| 场景 | Web | H5 |
|------|-----|-----|
| 确认弹窗 | 居中浮层 max-width 480px | 居中浮层 width calc(100% - 48px) |
| 表单弹窗 | 居中浮层 max-width 600px | **底部抽屉** max-height 90vh |
| 选择器 | 下拉面板 | 底部抽屉 + 搜索 |

### Table → Card List（H5）

```
Web 表格行:
| Order ID | Amount | Status | Method | Action |

H5 卡片:
┌─────────────────────────┐
│  Order ID    #ORD-001   │
│  Amount      1,250 USDT │
│  Status      [Success]  │
│  Method      Crypto     │
│  [操作按钮]              │
└─────────────────────────┘
```

---

## 触摸适配（H5 / App）

| 规则 | 值 | 说明 |
|------|-----|------|
| 最小触摸目标 | 44 × 44 px | iOS HIG 规范 |
| 按钮间距 | ≥ 8px | 防误触 |
| 输入框高度 | ≥ 48px | H5/App 比 Web 大 |
| 滑动手势 | 支持左滑删除 | 列表项操作 |
| 下拉刷新 | 必须支持 | H5 列表页 |
| 安全区域 | `env(safe-area-inset-*)` | iPhone X+ 底部安全区 |

```css
/* 安全区域适配 */
.bottom-bar {
  padding-bottom: calc(16px + env(safe-area-inset-bottom, 0px));
}

.page {
  padding-left: env(safe-area-inset-left, 0px);
  padding-right: env(safe-area-inset-right, 0px);
}
```

---

## 图片/图标自适应

| 类型 | Web | H5/App |
|------|-----|--------|
| 图标 | 20×20px / 24×24px | 20×20px / 24×24px（不缩放） |
| 头像 | 48×48px | 40×40px |
| Logo | 40×40px | 32×32px |
| 空状态插图 | 200×200px | 120×120px |
| 商品图 | max-width 100% | max-width 100% |

---

## 暗色模式适配

所有三端均支持 Light / Dark 双主题，通过 CSS 变量切换：

```css
/* Light 模式（默认） */
.page { --bg: #FFFFFF; --text-primary: #070808; ... }

/* Dark 模式 */
@media (prefers-color-scheme: dark) {
  .page { --bg: #0D0E11; --text-primary: #FAFAFA; ... }
}

/* 手动切换 */
.page.theme-dark { --bg: #0D0E11; --text-primary: #FAFAFA; ... }
```

---

## 开发检查清单

- [ ] 所有页面在 375px 宽度下无水平溢出
- [ ] 触摸目标 ≥ 44px
- [ ] 文字最小 12px（无更小字号）
- [ ] 图片有 max-width: 100%
- [ ] 表格在窄屏有横向滚动或卡片替代
- [ ] 弹窗在 H5 使用底部抽屉
- [ ] 底部操作栏有安全区域适配
- [ ] 暗色模式下所有组件颜色正确
- [ ] 字阶在 H5 端按映射表缩放
- [ ] Sidebar 在 ≤1439px 正确折叠
