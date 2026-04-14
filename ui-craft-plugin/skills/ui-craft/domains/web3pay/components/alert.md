---
scope: [web3pay]
layer: L2
context: pay-b
---

# AlertV5 提示

> 来源: Figma [V5.1 Web-H5 组件库](https://www.figma.com/design/kQIx9xKLiyO6KZIbazNSM2/) · Section `7883:22044`（AlertV5✅）
> 归属: web3pay / Pay B端商户后台
> 版本: v5.1

## 组件概述

V5.1 Alert 组件，分为 **基础型** 和 **强调型** 两大类。基础型使用统一灰色背景，通过左侧语义图标区分类型；强调型使用语义色背景，视觉更突出。均支持标题/无标题模式，以及右侧操作区（关闭按钮或展开箭头）。

## 组件架构

```
AlertV5-web                           ← Alert 容器
├── icon                              ← 左侧语义图标（16×16）
│   └── CEX_circlefilled_*            ← info/success/warning/error 图标
├── title+close / title               ← 内容区域
│   ├── title and text                ← 标题 + 正文
│   │   ├── title                     ← 标题行（可选）
│   │   └── text                      ← 正文
│   └── Button Text_V5               ← 操作按钮（可选）
└── AlertV5-web/item icon             ← 右侧操作（关闭/展开，可选）
```

## 组件属性（Props）

### AlertV5-web

| 属性 | 类型 | 可选值 | 默认值 | 说明 |
|------|------|--------|--------|------|
| `type` | Enum | `Info` / `Success` / `Warning` / `Error` / `AlertInfo` / `AlertWarning` / `AlertError` | `Info` | Alert 类型 |
| `withTitle` | Boolean | `true` / `false` | `false` | 是否显示标题 |
| `withRightSection` | Boolean | `true` / `false` | `false` | 是否显示右侧操作区 |
| `withActionButton` | Boolean | `true` / `false` | `false` | 是否显示底部操作按钮 |
| `withText` | Boolean | `true` / `false` | `true` | 是否显示正文 |
| `wIthSuffixAction` | Boolean | `true` / `false` | `false` | 右侧操作图标类型控制 |

- **基础型**（`Info` / `Success` / `Warning` / `Error`）：统一灰色背景 `#F2F3F4`，通过图标颜色区分语义
- **强调型**（`AlertInfo` / `AlertWarning` / `AlertError`）：语义色背景，视觉强调更重

### 右侧操作图标（AlertV5-web/item icon）

| 类型 | 说明 |
|------|------|
| `With Close` | 关闭按钮（×），用于可关闭的 Alert |
| `Expandable` | 展开箭头（↓），用于可折叠的详情 Alert |

## 基础规格

| 属性 | Token / 值 | 说明 |
|------|------------|------|
| 容器圆角 | `6px` | `border-radius: 6px` |
| 内边距 | `8px 12px` | `padding: 8px 12px` |
| 图标与内容间距 | `8px` | `gap: 8px` |
| 图标尺寸 | `16 × 16px` | 左侧语义图标 |
| 图标区域 padding | `2px 0` | 图标垂直居中对齐首行文本 |
| 标题字体 | Switzer Semibold 14px | `font-weight: 600; font-size: 14px; line-height: 1.3` |
| 正文字体 | Switzer Regular 12px | `font-weight: 400; font-size: 12px; line-height: 1.5` |
| 标题与正文间距 | `2px` | `gap: 2px` |
| 操作按钮字体 | Switzer Medium 14px | `font-weight: 500; font-size: 14px; line-height: 1.3` |
| 操作按钮箭头 | `14 × 14px` | CEX_chevron_right |
| 右侧操作图标 | `16 × 16px` | 关闭/展开 |
| 右侧操作区 padding | `2px` | 所有方向 |

## 颜色变体

### 基础型（统一背景）

| 类型 | 背景色 | 图标色 | 文本色 | 说明 |
|------|--------|--------|--------|------|
| Info | `#F2F3F4`（`--color-layer-2`） | `#84888C`（灰色） | `#070808`（`--color-text-text-primary`） | 灰色背景，一般信息 |
| Success | `#F2F3F4`（`--color-layer-2`） | `#68AD00`（绿色） | `#070808` | 灰色背景，成功 |
| Warning | `#F2F3F4`（`--color-layer-2`） | `#FF6600`（橙色） | `#070808` | 灰色背景，警告 |
| Error | `#F2F3F4`（`--color-layer-2`） | `#EF4444`（红色） | `#070808` | 灰色背景，错误 |

### 强调型（语义色背景）

| 类型 | 背景色 | 图标色 | 文本色 | 说明 |
|------|--------|--------|--------|------|
| AlertInfo | `#EBF6FF`（`--color-cmpt-bluefunct-bg`） | `#0068FF`（蓝色） | `#070808` | 蓝色背景，强调信息 |
| AlertWarning | `#FFF4E3`（`--color-cmpt-warning-bg`） | `#FF6600`（橙色） | `#070808` | 橙色背景，强调警告 |
| AlertError | `#FEECEC`（`--color-cmpt-error-bg`） | `#EF4444`（红色） | `#070808` | 红色背景，强调错误 |

## 布局模式

### With Title（带标题）

```
┌──────────────────────────────────────────────────┐
│ [Icon]  Title (14px 600)                 [Close] │
│         This is a message. (12px 400)            │
│         [Button More →]（可选）                   │
└──────────────────────────────────────────────────┘
高度：58px（单标题+正文）
```

### Without Title（无标题）

```
┌──────────────────────────────────────────────────┐
│ [Icon]  This is a message. (12px 400)    [Close] │
│         [Button More →]（可选）                   │
└──────────────────────────────────────────────────┘
高度：36px（单行正文）
```

## Figma 节点映射

| 变体 | Web 节点 ID | H5 节点 ID |
|------|------------|------------|
| Info + Title | `7101:61064` | `9448:384801` |
| Info + No Title | `7101:61112` | `9448:384996` |
| Success + Title | `7101:61076` | `9448:384901` |
| Success + No Title | `7101:61121` | `9448:385056` |
| Warning + Title | `7101:61088` | `9448:384926` |
| Warning + No Title | `7101:61130` | `9448:385076` |
| Error + Title | `7101:61100` | `9448:384951` |
| Error + No Title | `7101:61139` | `9448:385096` |
| AlertInfo + Title | `9448:371105` | `9448:384826` |
| AlertInfo + No Title | `9448:371117` | `9448:384976` |
| AlertWarning + Title | `9448:371203` | `9448:384851` |
| AlertWarning + No Title | `9448:371215` | `9448:385016` |
| AlertError + Title | `9448:371301` | `9448:384876` |
| AlertError + No Title | `9448:371313` | `9448:385036` |

带 RightSection 的变体在对应节点 ID 后缀 `+RightSection`（如 `9448:371691` 为 Info + Title + RightSection）。

## CSS 实现参考

```css
/* ═══ Alert 容器 ═══ */
.alert-v5 {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 6px;
  width: 100%;
}

/* ═══ 图标区域 ═══ */
.alert-v5__icon {
  display: flex;
  align-items: center;
  padding: 2px 0;
  flex-shrink: 0;
}
.alert-v5__icon svg {
  width: 16px;
  height: 16px;
  display: block;
}

/* ═══ 内容区域 ═══ */
.alert-v5__body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.alert-v5__title {
  font-size: 14px;
  font-weight: 600;
  line-height: 1.3;
  color: var(--color-text-text-primary, #070808);
  padding: 1px 0;
}

.alert-v5__text {
  font-size: 12px;
  font-weight: 400;
  line-height: 1.5;
  color: var(--color-text-text-primary, #070808);
  padding: 1px 0;
}

/* ═══ 操作按钮 ═══ */
.alert-v5__action {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-top: 10px;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.3;
  color: var(--color-text-text-primary, #070808);
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
}
.alert-v5__action svg {
  width: 14px;
  height: 14px;
}

/* ═══ 右侧操作区 ═══ */
.alert-v5__suffix {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  flex-shrink: 0;
  cursor: pointer;
}
.alert-v5__suffix svg {
  width: 16px;
  height: 16px;
  display: block;
  color: var(--color-text-text-secondary, #84888C);
  transition: color 0.15s ease;
}
.alert-v5__suffix:hover svg {
  color: var(--color-text-text-primary, #070808);
}

/* ═══ 基础型（统一灰色背景） ═══ */
.alert-v5--info,
.alert-v5--success,
.alert-v5--warning,
.alert-v5--error {
  background: var(--color-layer-2, #F2F3F4);
}
.alert-v5--info .alert-v5__icon { color: #84888C; }
.alert-v5--success .alert-v5__icon { color: #68AD00; }
.alert-v5--warning .alert-v5__icon { color: #FF6600; }
.alert-v5--error .alert-v5__icon { color: #EF4444; }

/* ═══ 强调型（语义色背景） ═══ */
.alert-v5--alert-info {
  background: var(--color-cmpt-bluefunct-bg, #EBF6FF);
}
.alert-v5--alert-info .alert-v5__icon { color: #0068FF; }

.alert-v5--alert-warning {
  background: var(--color-cmpt-warning-bg, #FFF4E3);
}
.alert-v5--alert-warning .alert-v5__icon { color: #FF6600; }

.alert-v5--alert-error {
  background: var(--color-cmpt-error-bg, #FEECEC);
}
.alert-v5--alert-error .alert-v5__icon { color: #EF4444; }
```

## HTML 参考

```html
<!-- 基础型 Info，带标题 -->
<div class="alert-v5 alert-v5--info">
  <div class="alert-v5__icon">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 1.33a6.67 6.67 0 100 13.34A6.67 6.67 0 008 1.33zm.67 10H7.33V7h1.34v4.33zm0-5.66H7.33V4.33h1.34v1.34z"/>
    </svg>
  </div>
  <div class="alert-v5__body">
    <div class="alert-v5__title">Title</div>
    <div class="alert-v5__text">This is a reminder message.</div>
  </div>
</div>

<!-- 强调型 AlertWarning，无标题，带关闭 -->
<div class="alert-v5 alert-v5--alert-warning">
  <div class="alert-v5__icon">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 1.33a6.67 6.67 0 100 13.34A6.67 6.67 0 008 1.33zM7.33 5h1.34v4H7.33V5zm.67 6.5a.83.83 0 110-1.67.83.83 0 010 1.67z"/>
    </svg>
  </div>
  <div class="alert-v5__body">
    <div class="alert-v5__text">This is an alert warning message.</div>
  </div>
  <div class="alert-v5__suffix">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M4 4l8 8m0-8l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
  </div>
</div>
```

## 交互规则

1. 基础型适用于信息密度高的区域（如表单内部、卡片内），视觉干扰小
2. 强调型适用于需要用户注意的场景（如操作警告、安全提示），视觉突出
3. 右侧关闭按钮点击后 Alert 消失（可加 fade-out 动画）
4. 右侧展开箭头点击后展开/收起详情内容，箭头旋转 180°
5. 操作按钮（Button More）点击跳转到对应详情页或执行操作
6. Alert 宽度默认跟随父容器 `width: 100%`

## 与旧版 Alert 差异

| 对比项 | 旧版（Pay-B v1.4） | V5.1 组件库 |
|--------|-------------------|-------------|
| 分类 | 4 种（Info/Success/Warning/Error） | 7 种（基础型 4 + 强调型 3） |
| 背景色 | 语义色（蓝/绿/黄/红） | 基础型统一灰色 + 强调型语义色 |
| 边框 | 有边框 | 无边框 |
| 圆角 | 8px | 6px |
| padding | 12px 16px | 8px 12px |
| 标题 | 无区分 | With Title / Without Title 两种模式 |
| 右侧操作 | 仅关闭 | 关闭 + 展开两种 |
| 操作按钮 | 无 | 支持 Button More（文本+箭头） |
