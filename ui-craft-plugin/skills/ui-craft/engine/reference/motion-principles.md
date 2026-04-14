# 动效原理参考

> `primitive.md` 动效 Token 的原理支撑。改编自 Impeccable reference/motion-design.md。
> 规则约束见 R29（动效反模式）。

---

## 核心原则

1. **每个动画必须有目的** — 引导注意力、反馈操作、表达因果关系
2. **仅 animate transform + opacity** — 不触发 layout/paint，性能有保障
3. **时长分层** — 不同场景不同速度，而非统一 300ms
4. **尊重用户偏好** — `prefers-reduced-motion` 必须处理

---

## 时长规则（100 / 200-300 / 300-500）

| 层级 | 时长 | 场景 | ui-craft Token |
|------|------|------|---------------|
| 反馈 | 100-150ms | hover 颜色变化、按钮 active、toggle | `duration.fast` (150ms) |
| 状态切换 | 200-300ms | Tab 切换、展开折叠、卡片 hover 位移 | `duration.normal` (200ms) / `--transition` |
| 布局变化 | 300-500ms | 弹窗入场、页面过渡、列表重排 | `duration.slow` (300ms) / `--transition-slow` |

**为什么这样分？**
- < 100ms：用户感知为"即时"，适合微反馈
- 100-300ms：用户能感知过渡但不觉得慢，适合状态变化
- 300-500ms：给用户时间理解空间变化，适合布局级动画
- \> 500ms：开始感觉"慢"，仅用于刻意的戏剧化效果（活动页装饰动画）

---

## 缓动函数

### 推荐：指数缓动

```css
/* 标准退出（最常用） */
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);      /* ease-out-expo */

/* 标准进入 */
--ease-in: cubic-bezier(0.7, 0, 0.84, 0);        /* ease-in-expo */

/* 进出组合（对称动画） */
--ease-in-out: cubic-bezier(0.87, 0, 0.13, 1);   /* ease-in-out-expo */
```

**为什么指数缓动？**
- 开始快、结束慢 → 符合物理世界的减速运动
- 比 `ease` 更有"专业感"，比 `linear` 更自然
- Gate 品牌调性：稳定、克制 → 指数缓动的平滑收尾最匹配

### 禁止

| 缓动 | 问题 |
|------|------|
| `bounce` | 不稳定、不专业，违反品牌调性 |
| `elastic` | 过于夸张，适合游戏不适合金融 |
| `linear` | 机械感，仅用于进度条等匀速场景 |
| `steps()` | 仅用于帧动画，不用于 UI 过渡 |

---

## 常见动效模式

### 按钮反馈

```css
.btn {
  transition: transform 150ms var(--ease-out),
              background-color 150ms var(--ease-out);
}

.btn:hover {
  filter: brightness(1.1);
}

.btn:active {
  transform: scale(0.98);
}
```

### 卡片悬浮

```css
.card {
  transition: transform 300ms var(--ease-out),
              box-shadow 300ms var(--ease-out);
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}
```

### 弹窗入场

```css
.modal-overlay {
  opacity: 0;
  transition: opacity 300ms var(--ease-out);
}

.modal-overlay.open {
  opacity: 1;
}

.modal-content {
  transform: translateY(20px);
  opacity: 0;
  transition: transform 300ms var(--ease-out),
              opacity 300ms var(--ease-out);
}

.modal-content.open {
  transform: translateY(0);
  opacity: 1;
}
```

### 列表项交错进场

```css
.list-item {
  opacity: 0;
  transform: translateY(12px);
  animation: fadeInUp 300ms var(--ease-out) forwards;
}

/* 使用 CSS 自定义属性实现交错 */
.list-item:nth-child(1) { animation-delay: 0ms; }
.list-item:nth-child(2) { animation-delay: 50ms; }
.list-item:nth-child(3) { animation-delay: 100ms; }
/* 最大交错 5 项，之后统一延迟（避免等待过久） */

@keyframes fadeInUp {
  to { opacity: 1; transform: translateY(0); }
}
```

### Tab 切换

```css
.tab-indicator {
  transition: transform 200ms var(--ease-out),
              width 200ms var(--ease-out);
}
```

---

## 性能规则

### 可动画属性（白名单）

| 属性 | GPU 加速 | 触发 |
|------|---------|------|
| `transform` | ✅ | Composite only |
| `opacity` | ✅ | Composite only |
| `filter` | ✅ | Composite only |
| `clip-path` | 部分 | 取决于复杂度 |

### 禁止动画的属性

| 属性 | 问题 |
|------|------|
| `width` / `height` | 触发 Layout → Paint → Composite |
| `top` / `left` | 触发 Layout |
| `margin` / `padding` | 触发 Layout |
| `border-radius` | 触发 Paint |
| `box-shadow` | 触发 Paint（可用 `filter: drop-shadow` 替代） |
| `background-color` | 触发 Paint（hover 变色用 opacity 叠加层替代更优） |

### will-change 使用规则

```css
/* ✅ 仅在即将动画时添加 */
.card:hover {
  will-change: transform;
}

/* ❌ 禁止：全局预设 */
* { will-change: transform; }

/* ❌ 禁止：静态元素常驻 */
.header { will-change: transform; }
```

**规则：**
- `will-change` 创建新的合成层（GPU 图层），过多会占用显存
- 仅在有明确性能瓶颈时使用
- 动画结束后移除（JS 控制，或通过 hover/active 伪类限制作用域）

---

## prefers-reduced-motion

**强制要求**：所有页面必须包含减弱动效处理。

```css
@media (prefers-reduced-motion: reduce) {
  /* 方案 1：全局重置（推荐，在 .page 中声明） */
  .page {
    --transition: 0ms;
    --transition-slow: 0ms;
  }

  /* 方案 2：禁用非必要动画 */
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**什么动画在 reduced-motion 下保留：**
- 加载指示器（用户需要知道系统在工作）— 但简化为非旋转形式
- 进度条推进

**什么动画必须移除：**
- 装饰性动画（背景光效、粒子）
- 入场/出场过渡
- hover 位移效果
- 列表交错进场
