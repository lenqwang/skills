---
scope: [web3pay]
layer: L2
context: pay-b
---

# Modal 弹窗 — Pay-B 端规格

> 继承 `_platform/modal.md` 平台基座，针对 Pay-B 商户后台场景做尺寸 / 色彩 / 间距细化。
> 来源: Figma [Pay-B端-商家后台](https://www.figma.com/design/tlFIl7F7A7Zl6e9WRLMDZo/)
> 版本: v1.4.0

---

## 尺寸变体（4 档）

| 变体 | CSS 类 | 宽度 | 典型场景 |
|------|--------|------|---------|
| **Confirm** | `.modal--confirm` | 420px | 删除确认、二次验证 |
| **Security** | `.modal--security` | 420px | 资金密码 + GA 验证 |
| **Detail** | `.modal--detail` | 600px | 规则详情、只读信息 |
| **Form** | `.modal--form` | 640px | 新增/编辑审批规则 |

---

## Overlay 遮罩

| 属性 | CSS 变量 | 值 | 说明 |
|------|---------|-----|------|
| 背景 | — | `rgba(0,0,0,0.5)` | 半透明黑色 |
| z-index | — | 500 | 浮于最上层 |
| 对齐 | — | `display:flex; align-items:center; justify-content:center` | 居中弹窗 |
| 关闭行为 | — | 点击遮罩关闭（`event.target === overlay`） | — |

---

## 弹窗容器

| 属性 | CSS 变量（pay-b-default） | 值 | 说明 |
|------|--------------------------|-----|------|
| 背景 | `var(--bg-card)` | `#FFFFFF` | 白色 |
| 圆角 | — | `16px` | 大圆角 |
| 阴影 | — | `0 20px 60px rgba(0,0,0,0.15)` | 深阴影 |
| 最大高度 | — | `90vh` | 超出内部滚动 |
| overflow-y | — | `auto` | 垂直滚动 |

---

## Header

| 属性 | CSS 变量（pay-b-default） | 值 | 说明 |
|------|--------------------------|-----|------|
| padding | — | `20px 24px 0` | 上 20 左右 24 下 0 |
| 布局 | — | `flex; align-items:center; justify-content:space-between` | — |
| 标题字号 | — | `18px` | — |
| 标题字重 | — | `600 SemiBold` | — |
| 标题色 | `var(--text-primary)` | `#070808` | — |

### 关闭按钮

| 属性 | CSS 变量 | 值 | 说明 |
|------|---------|-----|------|
| 尺寸 | — | `28×28px` 热区 | 图标 16px |
| 圆角 | `var(--radius-input)` | `6px` | — |
| 默认色 | `var(--text-secondary)` | `#84888C` | — |
| Hover 背景 | `var(--cmpt-hover)` | `#F5F6F7` | — |
| Hover 色 | `var(--text-primary)` | `#070808` | — |
| 过渡 | `var(--transition)` | `150ms ease` | — |

---

## Body

| 属性 | CSS 变量 | 值 | 说明 |
|------|---------|-----|------|
| padding | — | `20px 24px` | 上下 20 左右 24 |
| 字号 | — | `14px` | 正文 |
| 文字色 | `var(--text-primary)` | `#070808` | — |

---

## Footer

| 属性 | CSS 变量（pay-b-default） | 值 | 说明 |
|------|--------------------------|-----|------|
| padding | — | `16px 24px` | — |
| border-top | `var(--border)` | `1px solid #ECEDEF` | 上分割线 |
| 布局 | — | `flex; justify-content:flex-end; gap:12px` | 按钮右对齐 |
| 按钮间距 | `var(--space-md)` | `12px` | — |

---

## Confirm 变体（居中文案）

| 属性 | 值 | 说明 |
|------|-----|------|
| 图标尺寸 | 40px | 顶部语义图标（Warning/Error） |
| 图标容器 | `56×56px` 浅色圆底 | 如 `var(--tag-yellow-bg)` 圆 |
| 标题 | 居中 18px/600 | — |
| 描述 | 居中 14px/400 `var(--text-secondary)` | — |
| Footer | 双按钮居中排列 | `justify-content:center` |

---

## CSS 实现参考

```css
.modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:500;display:none;align-items:center;justify-content:center}
.modal-overlay.show{display:flex}

.modal{background:var(--bg-card);border-radius:16px;box-shadow:0 20px 60px rgba(0,0,0,.15);max-height:90vh;overflow-y:auto;position:relative}
.modal--form{width:640px}
.modal--confirm{width:420px}
.modal--security{width:420px}
.modal--detail{width:600px}

.modal__header{display:flex;align-items:center;justify-content:space-between;padding:20px 24px 0}
.modal__title{font-size:18px;font-weight:600;color:var(--text-primary)}
.modal__close{width:28px;height:28px;display:flex;align-items:center;justify-content:center;border:none;background:none;cursor:pointer;border-radius:var(--radius-input);color:var(--text-secondary);transition:background var(--transition)}
.modal__close:hover{background:var(--cmpt-hover);color:var(--text-primary)}

.modal__body{padding:20px 24px}

.modal__footer{display:flex;align-items:center;justify-content:flex-end;gap:12px;padding:16px 24px;border-top:1px solid var(--border)}
```

---

## 数据接口

```typescript
interface ModalProps {
  variant: 'form' | 'confirm' | 'security' | 'detail';
  title: string;
  visible: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  maskClosable?: boolean;
}
```
