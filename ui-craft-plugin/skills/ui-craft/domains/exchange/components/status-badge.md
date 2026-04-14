---
scope: [exchange]
layer: L2
---
# StatusBadge 状态徽章

> 归属: exchange-shared（Booster / 营销页通用）
> 状态: STABLE — 基于 Figma Booster 推广计划设计稿精确提取
> 场景: 任务状态标记（Issued/Pending）、审核状态、连接状态

---

## 组件概述

状态徽章，不同颜色表示不同业务状态。

## 结构树

```
StatusBadge
└── Label                    # 状态文字
```

## 精确像素规格

```css
.status-badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
}

/* Issued 已发放 */
.status-badge--issued {
  background: #E8F5E9;
  color: #2BC235;
}

/* Pending 待处理 */
.status-badge--pending {
  background: #FFF4E3;
  color: #FF9447;
}

/* Connected 已连接 */
.status-badge--connected {
  background: #E8F5E9;
  color: #2BC235;
}

/* Under Review 审核中 */
.status-badge--review {
  background: #FFF4E3;
  color: #FF9447;
}

/* Approved 已通过 */
.status-badge--approved {
  background: #E8F5E9;
  color: #2BC235;
}
```

```html
<span style="background:#E8F5E9; color:#2BC235; border-radius:4px; padding:4px 8px; font-size:12px;">Issued</span>
<span style="background:#FFF4E3; color:#FF9447; border-radius:4px; padding:4px 8px; font-size:12px;">Pending</span>
```

## 状态矩阵

| 状态 | 背景 | 文字色 | 语义 |
|------|------|--------|------|
| Issued | `#E8F5E9` | `#2BC235` | 成功/已完成 |
| Approved | `#E8F5E9` | `#2BC235` | 成功/已通过 |
| Connected | `#E8F5E9` | `#2BC235` | 已连接 |
| Pending | `#FFF4E3` | `#FF9447` | 等待中 |
| Under Review | `#FFF4E3` | `#FF9447` | 审核中 |

## Token 映射

| 属性 | 值 |
|------|-----|
| 圆角 | 4px (--radius-md) |
| 内边距 | 4px 8px |
| 字号 | 12px / 400 Regular |
| 成功色背景 | `#E8F5E9` (--badge-issued-bg) |
| 成功色文字 | `#2BC235` (--color-success) |
| 等待色背景 | `#FFF4E3` (--badge-pending-bg) |
| 等待色文字 | `#FF9447` (--color-warning) |

## Figma 来源

- Booster: qfajQWQ2uszBiwi0v4bBFb
