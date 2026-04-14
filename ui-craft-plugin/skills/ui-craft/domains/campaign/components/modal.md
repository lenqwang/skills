---
scope: [campaign]
layer: L2
---
# Modal 弹窗

> 弹窗组件规格。
> 只引用语义 Token，代码中通过 `var(--xxx)` 使用对应 CSS 变量。

---

| 属性 | Token | 值 |
|------|-------|-----|
| 背景色 | `surface.modal` | #1F2023 |
| 圆角 | `radius.modal` | 16px |
| 内边距 | `space.xl` | 32px |
| 遮罩透明度 | `opacity.50` | 0.5 |
| 阴影 | `shadow.modal` | 0 20px 40px rgba(0,0,0,0.5) |
| 层级 | `z.modal` | 60 |

- **容器**：`bg: surface.modal`，`radius: radius.modal`，`shadow: shadow.modal`
- **内边距**：整体 32px，底部按钮区固定间距 24px
- **关闭按钮**：绝对定位右上角 (top: 16px, right: 16px)，热区 44x44px
- **布局**：标题居中对齐，使用 `headline.medium`
- **遮罩层**：`z.overlay` (50)，弹窗主体 `z.modal` (60)

## 交互行为规范

> 完整交互状态定义见 `engine/reference/interaction-states.md`。

### 打开流程

1. 触发元素失去焦点
2. 遮罩淡入：opacity 0→1，transition: var(--transition-slow)
3. 弹窗入场：translateY(20px) + opacity 0→1，transition: var(--transition-slow)
4. 焦点移到弹窗内第一个可交互元素
5. 背景元素设置 `inert`（阻止 Tab 穿透）

### 关闭流程

1. 弹窗退场（反向动画）
2. 移除背景 `inert`
3. 焦点恢复到触发元素
4. 支持 ESC 键关闭
5. 点击遮罩关闭（破坏性操作除外）

### 关闭按钮

- 位置：绝对定位右上角 (top: 16px, right: 16px)
- 热区：44x44px（满足 R18 触摸目标）
- focus-visible：outline: 2px solid var(--brand); outline-offset: 2px

### 确认对话框规则

- 标题说动作（"确认退出活动？"）
- 正文说后果（"退出后当前进度将不会保留"）
- 破坏性操作的确认按钮用 var(--error) 或中性色，不用品牌色
- 两个按钮语义必须互斥（"取消" + "确认退出"，而非"确认" + "好的"）

