---
scope: [web3pay]
layer: L2
---
# GTHaloButton 光环按钮

> 来源: Figma Web3/Pay App `51522:1473`
> 归属: web3pay 独有
> 状态: 基于 Figma GT-Web3 & Pay App 组件库

---

## 组件概述

Web3 品牌专属按钮组件，带发光光环效果。
用于重要操作的强调入口，如 "连接钱包"、"开始质押"等。

## 结构树

```
GTHaloButton
├── halo-glow                     # 外发光层
│   └── gradient-ring             # 渐变光环
├── button-body                   # 按钮主体
│   ├── icon?                    # 前置图标（可选）
│   ├── label                    # 按钮文字
│   └── icon-right?              # 后置图标（可选）
└── ripple?                       # 按下涟漪效果
```

## Token 映射

| 元素 | 值 | 说明 |
|------|-----|------|
| 光环外发光 | `var(--brand)` #17E5A1 blur 20px | Web3 品牌绿 |
| 按钮背景 | `var(--brand)` #17E5A1 | 实心填充 |
| 按钮文字 | #000000 | 深色文字（白底反色） |
| 按钮字号 | 16px semibold | — |
| 圆角 | 24px（全圆角） | pill 形状 |
| 高度 | 48px | — |
| 水平内边距 | 24px | — |
| 图标大小 | 20×20 | — |
| 图标-文字间距 | 8px | — |

## 状态枚举

| 状态 | 光环 | 背景 | 透明度 |
|------|------|------|--------|
| default | 显示, blur 20px | #17E5A1 | 1 |
| hover | 增强, blur 30px | #17E5A1 | 1 |
| pressed | 收缩, blur 10px | #14CC8E | 1 |
| disabled | 隐藏 | `var(--bg-muted)` | 0.5 |
| loading | 脉冲动画 | #17E5A1 | 1 |

## 动画

| 动画 | 属性 | 参数 |
|------|------|------|
| 光环呼吸 | box-shadow opacity | 2s ease-in-out infinite |
| hover 增强 | box-shadow blur | 200ms ease |
| 按下缩放 | transform scale | scale(0.97) 100ms |
| loading | 光环脉冲 | 1.5s ease-in-out infinite |

## CSS 实现参考

```css
.gt-halo-button {
  position: relative;
  background: var(--brand, #17E5A1);
  color: #000;
  border: none;
  border-radius: 24px;
  height: 48px;
  padding: 0 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  box-shadow:
    0 0 20px rgba(23, 229, 161, 0.4),
    0 0 40px rgba(23, 229, 161, 0.2);
  transition: box-shadow 200ms ease, transform 100ms ease;
}

.gt-halo-button:hover {
  box-shadow:
    0 0 30px rgba(23, 229, 161, 0.6),
    0 0 60px rgba(23, 229, 161, 0.3);
}

.gt-halo-button:active {
  transform: scale(0.97);
  box-shadow:
    0 0 10px rgba(23, 229, 161, 0.4);
}

@keyframes halo-pulse {
  0%, 100% { box-shadow: 0 0 20px rgba(23,229,161,0.4); }
  50% { box-shadow: 0 0 30px rgba(23,229,161,0.6); }
}
```

## 数据接口

```typescript
interface GTHaloButtonProps {
  label: string;
  icon?: ReactNode;
  iconRight?: ReactNode;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  size?: 'default' | 'large';
}
```
