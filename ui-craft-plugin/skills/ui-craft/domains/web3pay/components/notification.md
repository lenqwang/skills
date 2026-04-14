---
scope: [web3pay]
layer: L2
context: pay-b
---

# Notification 通知

> 来源: Figma [Pay-B端-商家后台](https://www.figma.com/design/tlFIl7F7A7Zl6e9WRLMDZo/)
> 归属: web3pay / Pay B端商户后台
> 版本: v1.4.0

## 组件概述

Notification 是全局 Toast 风格通知组件，固定出现在页面顶部居中位置，用于操作反馈和系统级消息。支持 Success / Error / Warning / Info 四种语义类型，默认 3 秒后自动消失，可手动点击关闭。包含图标 + 标题 + 描述的三段式内容结构，带阴影和 12px 圆角。

## 基础规格

> 组件私有 Token 与 `pay-b-default` 全局变量的映射关系。

| 属性 | Token | 值 | pay-b-default 映射 | 说明 |
|------|-------|-----|-------------------|------|
| 最大宽度 | `--notification-max-width` | 400px | — | 内容区最大宽度 |
| 最小宽度 | `--notification-min-width` | 300px | — | 内容区最小宽度 |
| 内边距 | `--notification-padding` | 16px 20px | — | 上下 16px，左右 20px |
| 圆角 | `--notification-radius` | 12px | — | 统一圆角 |
| 阴影 | `--notification-shadow` | 0 4px 16px rgba(0,0,0,0.12) | — | 浮层阴影 |
| 背景色 | `--notification-bg` | #FFFFFF | `var(--bg-card)` | 白色背景 |
| 边框 | `--notification-border` | 1px solid #ECEDEF | `var(--border)` | 浅色边框 |
| 图标尺寸 | `--notification-icon-size` | 20px | — | 语义图标尺寸 |
| 图标间距 | `--notification-icon-gap` | 12px | `var(--space-md)` | 图标与内容间距 |
| 标题字号 | `--notification-title-size` | 14px | — | 标题文本 |
| 标题字重 | `--notification-title-weight` | 600 | — | SemiBold |
| 标题色 | `--notification-title-color` | #070808 | `var(--text-primary)` | 主文本色 |
| 描述字号 | `--notification-desc-size` | 13px | — | 描述文本 |
| 描述色 | `--notification-desc-color` | #84888C | `var(--text-secondary)` | 次级文本色 |
| 标题与描述间距 | `--notification-content-gap` | 4px | `var(--space-xs)` | 标题与描述之间 |
| 关闭按钮尺寸 | `--notification-close-size` | 16px | — | 关闭图标 |
| 自动关闭时长 | `--notification-duration` | 3000ms | — | 默认 3 秒消失 |
| 入场动画 | `--notification-enter` | slideDown 0.3s ease-out | — | 从顶部滑入 |
| 出场动画 | `--notification-leave` | fadeUp 0.2s ease-in | — | 向上淡出 |
| 距顶部距离 | `--notification-top` | 24px | `var(--space-xl)` | 距视口顶部 |

## 颜色变体

| 类型 | 左侧色条 | pay-b-default 映射 | 图标 | 说明 |
|------|----------|-------------------|------|------|
| Success | `#68AD00` | `var(--success)` | CheckCircle | 操作成功 |
| Error | `#EF4444` | `var(--error)` | XCircle | 操作失败 |
| Warning | `#FF6600` | `var(--warning)` | AlertTriangle | 警告提醒 |
| Info | `#0068FF` | `var(--info)` | InfoCircle | 一般信息 |

## 布局结构

```
          ┌─ top: 24px, 水平居中 ─┐

┌──┬──────────────────────────────────┬──┐
│▌ │ [Icon]  Title              [×]  │  │
│▌ │          Description text       │  │
└──┴──────────────────────────────────┴──┘
 ↑                                     ↑
色条 3px                          shadow + border
```

- 定位：`fixed`，顶部居中，`z-index: 9999`
- 左侧 3px 色条标识语义类型
- 多条通知垂直堆叠，间距 8px

## CSS 实现参考

```css
.gtpay-notification-container {
  position: fixed;
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 8px;
  pointer-events: none;
}

.gtpay-notification {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  min-width: 300px;
  max-width: 400px;
  padding: 16px 20px;
  background: #FFFFFF;
  border: 1px solid #ECEDEF;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  overflow: hidden;
  pointer-events: auto;
  animation: gtpay-notification-enter 0.3s ease-out;
}

.gtpay-notification--leaving {
  animation: gtpay-notification-leave 0.2s ease-in forwards;
}

/* Left color bar */
.gtpay-notification::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  border-radius: 12px 0 0 12px;
}

.gtpay-notification--success::before { background: #68AD00; }
.gtpay-notification--error::before   { background: #EF4444; }
.gtpay-notification--warning::before { background: #FF6600; }
.gtpay-notification--info::before    { background: #0068FF; }

/* Icon */
.gtpay-notification__icon {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  margin-top: 1px;
}

.gtpay-notification--success .gtpay-notification__icon { color: #68AD00; }
.gtpay-notification--error .gtpay-notification__icon   { color: #EF4444; }
.gtpay-notification--warning .gtpay-notification__icon { color: #FF6600; }
.gtpay-notification--info .gtpay-notification__icon    { color: #0068FF; }

/* Content */
.gtpay-notification__content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.gtpay-notification__title {
  font-size: 14px;
  font-weight: 600;
  line-height: 22px;
  color: #070808;
}

.gtpay-notification__desc {
  font-size: 13px;
  line-height: 20px;
  color: #84888C;
}

/* Close */
.gtpay-notification__close {
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  margin-top: 3px;
  cursor: pointer;
  color: #84888C;
  background: none;
  border: none;
  padding: 0;
  transition: color 0.2s ease;
}

.gtpay-notification__close:hover {
  color: #070808;
}

/* Animations */
@keyframes gtpay-notification-enter {
  from {
    opacity: 0;
    transform: translateY(-12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes gtpay-notification-leave {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-8px);
  }
}
```

## 数据接口

```typescript
interface NotificationProps {
  /** 通知类型 */
  type: 'success' | 'error' | 'warning' | 'info';
  /** 标题 */
  title: string;
  /** 描述文本（可选） */
  description?: string;
  /** 自动关闭时长（ms），0 表示不自动关闭，默认 3000 */
  duration?: number;
  /** 是否显示关闭按钮，默认 true */
  closable?: boolean;
  /** 关闭回调 */
  onClose?: () => void;
  /** 自定义图标 */
  icon?: React.ReactNode;
  /** 唯一标识，用于命令式更新/关闭 */
  key?: string;
}

interface NotificationApi {
  success: (config: NotificationProps | string) => void;
  error: (config: NotificationProps | string) => void;
  warning: (config: NotificationProps | string) => void;
  info: (config: NotificationProps | string) => void;
  close: (key: string) => void;
  closeAll: () => void;
}
```
