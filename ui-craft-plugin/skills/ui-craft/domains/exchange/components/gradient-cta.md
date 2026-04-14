---
scope: [exchange]
layer: L2
---
# GradientCTA 渐变行动按钮

> 归属: exchange-shared（Rewards Hub / 营销页通用）
> 状态: STABLE — 基于 Figma 福利中心设计稿精确提取
> 场景: 营销页主要操作（Deposit / Trade / Sign Up / Claim）

---

## 组件概述

渐变蓝色行动按钮，区别于 Platform 标准的实色按钮。
用于营销/增长业务页面的 CTA 场景，支持 H5 / Web 双端尺寸。

**与 Platform Button 的差异**：
- Platform: `background: #0055FF`（实色）
- GradientCTA: `background: linear-gradient(135deg, #0055FF, #00AAFF)`（渐变）

## 结构树

```
GradientCTA
└── Label                    # 按钮文字
```

## 精确像素规格

### H5（85×28px）

```css
.gradient-cta-h5 {
  width: 85px;
  height: 28px;
  background: linear-gradient(135deg, #0055FF, #00AAFF);
  border-radius: 99px;
  border: none;
  color: #FFFFFF;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
```

### Web（100×40px）

```css
.gradient-cta-web {
  width: 100px;
  height: 40px;
  background: linear-gradient(135deg, #0055FF, #00AAFF);
  border-radius: 99px;
  border: none;
  color: #FFFFFF;
  font-size: 18px;
  font-weight: 600;
  font-family: Switzer;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
```

## 状态变体

| 状态 | 背景 | 文字色 | 可点击 |
|------|------|--------|--------|
| **Default** | `linear-gradient(135deg, #0055FF, #00AAFF)` | `#FFFFFF` | ✓ |
| **Hover** | `linear-gradient(135deg, #004FD9, #0090DD)` | `#FFFFFF` | ✓ |
| **Completed** | `#F5F6F7` | `#84888C` | ✗ |
| **Verified** | `#E8F5E9` | `#2BC235` | ✗ |
| **Claimed** | `#F5F6F7` | `#84888C` | ✗ |

```html
<!-- H5 Default -->
<button style="width:85px; height:28px; background:linear-gradient(135deg, #0055FF, #00AAFF); border-radius:99px; border:none; color:#FFF; font-size:14px; font-weight:600; cursor:pointer;">
  Deposit
</button>

<!-- H5 Completed -->
<button style="width:85px; height:28px; background:#F5F6F7; border-radius:99px; border:none; color:#84888C; font-size:14px; font-weight:600;">
  Completed
</button>

<!-- Web Default -->
<button style="width:100px; height:40px; background:linear-gradient(135deg, #0055FF, #00AAFF); border-radius:99px; border:none; color:#FFF; font-size:18px; font-weight:600; font-family:Switzer; cursor:pointer;">
  Deposit
</button>
```

## 按钮文案映射

| 任务类型 | Default | Completed |
|---------|---------|-----------|
| Sign Up | Sign Up | Completed |
| KYC | Verify | Verified |
| Deposit | Deposit | Completed |
| Trade | Trade | Completed |
| Claim | Claim | Claimed |
| Use | Use | Used |

## Token 映射

| 属性 | H5 | Web |
|------|-----|-----|
| 宽度 | 85px | 100px |
| 高度 | 28px | 40px |
| 字号 | 14px | 18px |
| 字重 | 600 Semibold | 600 Semibold |
| 圆角 | 99px | 99px |
| 渐变 | `135deg, #0055FF → #00AAFF` | 同 H5 |
| 完成态背景 | `#F5F6F7` | `#F5F6F7` |
| 完成态文字 | `#84888C` | `#84888C` |

## Figma 来源

- Rewards Hub: rolyycBTmxioksI63PQqbL
