# 交互状态参考

> 定义组件的 8 种交互状态标准。本文件是组件规格（`components/*.md`）的补充参考。
> 改编自 Impeccable frontend-design reference/interaction-design.md，适配 Gate.io Token 体系。

---

## 8 种交互状态

每个可交互组件（button / input / link / card）理论上有 8 种状态。
**最低要求**：生成代码至少覆盖 4 种（default / hover / focus-visible / disabled）。

| # | 状态 | 触发方式 | 视觉信号 | 必要性 |
|---|------|---------|---------|--------|
| 1 | **default** | 初始渲染 | 组件的基准外观 | 必须 |
| 2 | **hover** | 鼠标悬停 | 背景/颜色微变 + cursor: pointer | 必须 |
| 3 | **focus-visible** | Tab 键聚焦 | outline 环（R26） | 必须 |
| 4 | **active** | 鼠标按下 | scale(0.98) 或颜色加深 | 推荐 |
| 5 | **disabled** | 逻辑禁用 | 降低透明度 + cursor: not-allowed | 必须 |
| 6 | **loading** | 异步操作中 | spinner/骨架 + pointer-events: none | 按需 |
| 7 | **error** | 验证失败 | 边框/文字变 var(--error) | 按需（表单） |
| 8 | **success** | 操作完成 | 短暂绿色反馈后恢复 | 按需 |

---

## 按组件类型的状态矩阵

### Button

| 状态 | background | color | border | 其他 |
|------|-----------|-------|--------|------|
| default | var(--brand) | var(--text-on-dark) | none | — |
| hover | var(--brand-hover) | — | — | cursor: pointer |
| focus-visible | — | — | — | outline: 2px solid var(--brand); outline-offset: 2px |
| active | — | — | — | transform: scale(0.98) |
| disabled | var(--action-neutral) | var(--text-disabled) | — | opacity: 0.5; cursor: not-allowed; pointer-events: none |
| loading | — | transparent | — | 内部 spinner; pointer-events: none |

**CTA 按钮额外规则：**
- hover 时 `filter: brightness(1.1)` 或 `opacity: 0.9`
- active 时 `transform: scale(0.95)`
- disabled 不展示 CTA 样式，降级为中性按钮

### Input

| 状态 | border | background | 其他 |
|------|--------|-----------|------|
| default | 1px solid var(--border) | transparent | — |
| hover | 1px solid var(--text-secondary) | — | — |
| focus | 1px solid var(--brand) | — | box-shadow: 0 0 0 2px rgba(0,104,255,0.2) |
| disabled | 1px solid var(--border) | var(--bg-muted) | opacity: 0.5; cursor: not-allowed |
| error | 1px solid var(--error) | — | — |
| success | 1px solid var(--success) | — | 短暂显示后恢复 default |

**规则：**
- placeholder 用 var(--text-muted)
- label 始终在输入框上方，不用 placeholder 替代
- 错误信息在输入框下方，用 var(--error) + fontSize.sm (12px)

### Card（可交互卡片）

| 状态 | 变化 |
|------|------|
| default | 基准样式 |
| hover | translateY(-4px) + box-shadow 加深; transition: var(--transition-slow) |
| focus-visible | outline: 2px solid var(--brand); outline-offset: 2px |
| active | translateY(0) + box-shadow 恢复（取消悬浮感） |

**规则：**
- 纯展示卡片不需要 hover 效果
- 可点击卡片整体用 `<a>` 或 `role="link"` 包裹，而非内部某个元素监听点击

### Link / 文字链接

| 状态 | 变化 |
|------|------|
| default | color: var(--brand); text-decoration: none |
| hover | text-decoration: underline |
| focus-visible | outline: 2px solid var(--brand); outline-offset: 2px |
| visited | color: var(--brand)（金融场景不区分已访问） |
| active | opacity: 0.8 |

---

## Focus 管理

### focus-visible vs focus

```css
/* ✅ 推荐：仅键盘导航时显示 focus 环 */
button:focus-visible {
  outline: 2px solid var(--brand);
  outline-offset: 2px;
}

/* ❌ 避免：鼠标点击也显示 focus 环 */
button:focus {
  outline: 2px solid var(--brand);
}
```

### Tab 顺序

- 遵循视觉阅读顺序（从上到下、从左到右）
- 不使用正数 `tabindex`（只用 0 和 -1）
- 弹窗打开时 trap focus（弹窗外元素设置 `inert`）
- 弹窗关闭时恢复焦点到触发元素

### Skip Link（页面级）

```html
<a href="#main-content" class="skip-link">跳转到主要内容</a>
```

```css
.skip-link {
  position: absolute;
  left: -9999px;
}
.skip-link:focus {
  left: 16px;
  top: 16px;
  z-index: 9999;
}
```

---

## 弹窗交互

### 打开

1. 触发元素失去焦点
2. 背景遮罩淡入（transition: var(--transition-slow)）
3. 弹窗入场（translateY(20px) + opacity 0→1）
4. 焦点移到弹窗内第一个可交互元素
5. 背景元素设置 `inert`

### 关闭

1. 弹窗退场
2. 移除 `inert`
3. 焦点恢复到触发元素
4. 支持 ESC 关闭
5. 点击遮罩关闭（破坏性操作除外）

### Popover（轻量浮层）

优先使用原生 Popover API：
```html
<button popovertarget="menu">打开菜单</button>
<div id="menu" popover>菜单内容</div>
```

---

## 加载状态策略

| 场景 | 策略 | 实现 |
|------|------|------|
| 列表/表格首次加载 | 骨架屏 | 用 CSS animation pulse 模拟内容形状 |
| 按钮提交 | 按钮内 spinner | 按钮宽度固定，文字替换为 spinner |
| 页面切换 | 顶部进度条 | NProgress 或 CSS animation |
| 局部更新 | 乐观 UI | 先展示预期结果，失败后回滚 |
| 长时间操作（>3s） | 进度反馈 | 进度条或步骤提示 |

**禁止：**
- 全屏 loading 遮罩阻断所有交互
- 无限转圈无任何文案说明
- loading 状态下仍可重复点击触发

---

## 触摸设备适配

| 规则 | 说明 |
|------|------|
| 触摸目标 ≥ 44px | R18，含 padding |
| 不依赖 hover 展示信息 | 触摸设备无 hover；关键信息必须默认可见 |
| 检测输入方式 | `@media (pointer: coarse)` 增大触摸区域 |
| 滑动不冲突 | 水平滑动组件不阻止页面纵向滚动 |

```css
@media (pointer: coarse) {
  .btn { min-height: 48px; padding: 12px 24px; }
}

@media (hover: none) {
  /* 移除依赖 hover 的装饰效果 */
  .card:hover { transform: none; }
}
```

---

## 动效与减弱动效

```css
/* 标准动效 */
.element {
  transition: transform var(--transition), opacity var(--transition);
}

/* 尊重用户偏好 */
@media (prefers-reduced-motion: reduce) {
  .element {
    transition: none;
    animation: none;
  }
}
```

**规则：**
- 仅 animate `transform` 和 `opacity`（不触发 layout/paint）
- duration 分层：反馈 100-150ms / 状态 200-300ms / 布局 300-500ms
- 禁止 bounce / elastic 缓动（R29）
- 推荐指数缓动：`cubic-bezier(0.16, 1, 0.3, 1)`（ease-out-expo）
