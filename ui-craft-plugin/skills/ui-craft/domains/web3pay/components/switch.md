---
scope: [web3pay]
layer: L2
context: pay-b
---

# Switch 开关

> 来源: Figma [Pay-B端-商家后台](https://www.figma.com/design/tlFIl7F7A7Zl6e9WRLMDZo/)
> 归属: web3pay / Pay B端商户后台
> 版本: v1.4.0

## 组件概述

切换开关组件，用于在两种互斥状态间切换（开/关）。由滑轨（track）和滑块（thumb）组成，可附带标签文本。常用于功能启用、通知设置等二元选项场景。

## 基础规格

### Track 滑轨

> `--switch-track-on` 须与 `var(--success)` 保持同值；`--switch-track-off` 与 `var(--text-quaternary)` 保持同值。

| 属性 | Token | 值 | pay-b-default 映射 | 说明 |
|------|-------|-----|-------------------|------|
| width | `--switch-track-w` | `36px` | — | 滑轨宽度 |
| height | `--switch-track-h` | `20px` | — | 滑轨高度 |
| border-radius | `--switch-track-radius` | `10px` | — | 全圆角（height/2） |
| on background | `--switch-track-on` | `#68AD00` | `var(--success)` | 开启态滑轨色 |
| off background | `--switch-track-off` | `#C4C7CA` | `var(--text-quaternary)` | 关闭态滑轨色 |
| transition | — | `background 0.2s ease` | — | 背景色过渡 |

### Thumb 滑块

| 属性 | Token | 值 | 说明 |
|------|-------|-----|------|
| width | `--switch-thumb-size` | `16px` | 滑块直径 |
| height | — | `16px` | 与宽度相同 |
| border-radius | — | `50%` | 正圆 |
| background | `--switch-thumb-bg` | `#FFFFFF` | 白色滑块 |
| box-shadow | `--switch-thumb-shadow` | `0 1px 3px rgba(0,0,0,0.15)` | 滑块投影 |
| off translateX | — | `2px` | 关闭态水平偏移 |
| on translateX | — | `18px` | 开启态水平偏移（track-w - thumb-size - 2px） |
| transition | — | `transform 0.2s ease` | 位移过渡 |

### Label 标签

| 属性 | Token | 值 | pay-b-default 映射 | 说明 |
|------|-------|-----|-------------------|------|
| font-size | `--switch-label-font` | `14px` | — | 标签字号 |
| color | `--switch-label-color` | `#070808` | `var(--text-primary)` | 标签文本色 |
| margin-left | — | `8px` | `var(--space-sm)` | 与滑轨间距 |
| line-height | — | `20px` | — | 与滑轨对齐 |

## 状态变体

| 状态 | Track | Thumb | 其他 |
|------|-------|-------|------|
| off (default) | bg `#C4C7CA` | translateX `2px` | — |
| on | bg `#68AD00` | translateX `18px` | — |
| hover (off) | bg `#B0B3B6` | — | 滑轨略深 |
| hover (on) | bg `#5A9600` | — | 滑轨略深 |
| focus | — | box-shadow `0 0 0 3px rgba(173,247,62,0.3)` | 键盘聚焦环 |
| disabled (off) | opacity `0.5` | opacity `0.5` | cursor `not-allowed` |
| disabled (on) | opacity `0.5` | opacity `0.5` | cursor `not-allowed` |

## CSS 实现参考

```css
.switch {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
}

.switch.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.switch__track {
  position: relative;
  width: 36px;
  height: 20px;
  border-radius: 10px;
  background: #C4C7CA;
  transition: background 0.2s ease;
  flex-shrink: 0;
}

.switch__track.on {
  background: #68AD00;
}

.switch__track:hover {
  background: #B0B3B6;
}

.switch__track.on:hover {
  background: #5A9600;
}

.switch__thumb {
  position: absolute;
  top: 2px;
  left: 0;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #FFFFFF;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
  transform: translateX(2px);
  transition: transform 0.2s ease;
}

.switch__track.on .switch__thumb {
  transform: translateX(18px);
}

.switch:focus-visible .switch__track {
  box-shadow: 0 0 0 3px rgba(173, 247, 62, 0.3);
}

.switch__label {
  margin-left: 8px;
  font-size: 14px;
  color: #070808;
  line-height: 20px;
}

/* 隐藏原生 checkbox */
.switch__input {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
```

## 数据接口

```typescript
interface SwitchProps {
  /** 开关状态 */
  checked?: boolean;
  /** 默认状态（非受控） */
  defaultChecked?: boolean;
  /** 状态变更回调 */
  onChange?: (checked: boolean) => void;
  /** 禁用 */
  disabled?: boolean;
  /** 标签文本 */
  label?: string;
  /** 标签位置 */
  labelPlacement?: 'left' | 'right';
  /** 无障碍标签 */
  ariaLabel?: string;
}
```
