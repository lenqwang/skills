---
scope: [exchange]
layer: L2
---
# RewardBadge 奖励数字徽章

> 归属: exchange-shared（Rewards Hub / 增长业务通用）
> 状态: STABLE — 基于 Figma 福利中心设计稿精确提取
> 场景: 任务奖励金额展示、里程碑徽章

---

## 组件概述

奖励数字 + USDT 徽章，分上下两层：上层蓝色渐变展示数字，下层深蓝展示 USDT 标签。
支持三种数字范围变体和锁定/解锁状态。

## 结构树

```
RewardBadge
├── NumberSection             # 上层数字区域（蓝色渐变）
│   └── Value                 # 奖励数字
└── LabelSection              # 下层标签区域（深蓝色）
    └── Label                 # "USDT" 文字
```

## 精确像素规格

### H5（65×48px）

```css
.reward-badge-h5 {
  width: 65px;
  height: 48px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.reward-badge-h5__number {
  flex: 1;
  background: linear-gradient(180deg, #0066FF, #0044CC);
  border-radius: 8px 8px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  font-weight: 700;
  color: #FFFFFF;
}

.reward-badge-h5__label {
  height: 18px;
  background: #002299;
  border-radius: 0 0 4px 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 500;
  color: #FFFFFF;
}
```

### Web（110×100px）

```css
.reward-badge-web {
  width: 110px;
  height: 100px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.reward-badge-web__number {
  height: 60px;
  background: linear-gradient(180deg, #0066FF, #0044CC);
  border-radius: 12px 12px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 37px;
  font-weight: 700;
  color: #FFFFFF;
}

.reward-badge-web__label {
  height: 21px;
  background: #002299;
  border-radius: 0 0 6px 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 19px;
  font-weight: 500;
  color: #FFFFFF;
}
```

## 数字范围变体

| 变体 | 数字范围 | 字号调整 |
|------|---------|---------|
| Small | 1-9 | 标准字号，居中 |
| Medium | 10-99 | 标准字号，居中 |
| Large | 100+ | 字号缩小适配 |

## 状态变体

| 状态 | 图标 | 说明 |
|------|------|------|
| **Locked** | 🔒 锁定图标 | 未解锁，灰色调 |
| **Unlocked** | ✓ 绿色对勾 | 已解锁，正常色调 |
| **Claimed** | ✓ 绿色对勾 | 已领取 |

## Token 映射

| 属性 | H5 | Web |
|------|-----|-----|
| 整体尺寸 | 65×48px | 110×100px |
| 数字字号 | 26px / 700 Bold | 37px / 700 Bold |
| 标签字号 | 13px / 500 Medium | 19px / 500 Medium |
| 上层圆角 | 8px | 12px |
| 下层圆角 | 4px | 6px |
| 文字色 | #FFFFFF | #FFFFFF |

## Figma 来源

- Rewards Hub: rolyycBTmxioksI63PQqbL
