---
scope: [exchange]
layer: L2
---
# SectionHeader 模块标题栏

> 归属: exchange-shared（Rewards Hub / 营销页通用）
> 状态: STABLE — 基于 Figma 福利中心设计稿精确提取
> 场景: 页面内模块标题 + "View More" 入口

---

## 组件概述

模块标题 + 右侧 View More 链接，两端对齐布局。

## 结构树

```
SectionHeader
├── Title                    # 模块标题
└── ViewMore (可选)          # "View More >" 链接
```

## 精确像素规格

```css
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.section-header__title {
  font-size: 24px;
  font-weight: 600;
  color: #FFFFFF; /* 暗色模式 */
}

.section-header__more {
  font-size: 18px;
  font-weight: 500;
  color: #84888C;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
}
```

**标题示例**：`Hot Event`、`Exclusive Tasks`、`Regular Tasks`、`My Voucher`

## Token 映射

| 属性 | 值 |
|------|-----|
| 标题字号 | 24px / 600 Semibold |
| 标题色 | `#FFFFFF` (--text-primary, 暗色) |
| More 字号 | 18px / 500 Medium |
| More 色 | `#84888C` (--text-tertiary) |
| 布局 | `space-between` 两端对齐 |

## Figma 来源

- Rewards Hub: rolyycBTmxioksI63PQqbL
