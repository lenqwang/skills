---
scope: [web3pay]
layer: L2
context: pay-b
---

# GlobalLoading 全局 Loading

> 来源: Figma [Pay-B端-商家后台](https://www.figma.com/design/tlFIl7F7A7Zl6e9WRLMDZo/) · Node `1543:64398`
> 归属: web3pay / Pay B端商户后台
> 版本: v1.4.0

## 组件概述

全局性加载骨架屏，用于页面需要进行一次性数据请求才能查看的场景。当页面处于全局加载状态时，优先展示全局加载样式而非空状态。

## 使用规则

1. 当页面处于全局加载状态，**优先展示全局加载样式**，而非空状态
2. 全局加载样式**不应与其他 Loading 样式同时出现**在页面中
3. 需注意与已使用骨架屏的页面区分开

## 布局结构

```
[Page 1920×1080]
├── [Sidebar 320×1080]  ← 侧边栏骨架
├── [Header  1600×72]   ← 顶部导航骨架
└── [Content 1600×1008]
    └── [Loading Spinner 48×48] ← 居中旋转加载动画
```

## 基础规格

| 属性 | Token / CSS 变量 | 值 | pay-b-default 映射 | 说明 |
|------|-----------------|-----|-------------------|------|
| 尺寸 | — | 48 × 48px | — | Loading Spinner 尺寸 |
| 位置 | — | 内容区域绝对居中 | — | `position: absolute; top: 50%; left: 50%` |
| 动画 | — | 旋转 Loading Spinner（持续循环） | — | `animation: spin 1s linear infinite` |
| 背景 | — | `#FFFFFF` | `var(--bg)` | 页面保持白色底 |

## CSS 实现参考

```css
.global-loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 48px;
  height: 48px;
}
.global-loading__spinner {
  width: 100%;
  height: 100%;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```
