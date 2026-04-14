# Dev Portal 风格

> 生成代码前必须读取 `contract/rules.md`，完整遵守 `R1-R30`。本文件只定义视觉倾向与组件偏好。

---

## 区块 1: 元信息头

```yaml
name: dev-portal
description: 开发者技能中心风格，支持亮暗双主题，Gate 蓝品牌色 + 单列列表布局，信息密度适中的文档/市场型页面
mode: both
source_urls:
  - https://developers.binance.com/en/skills
extracted_at: 2026-03-05
calibrated_at: 2026-03-05
```

---

## 区块 2: 风格画像

- **视觉情绪**：沉稳专业、极简克制、文档感
- **核心组件**：Hero 信息卡、搜索输入框、技能列表行（带右箭头）、分类标签徽章、安装命令栏、Markdown 文档卡、数据表格、代码块
- **强调方式**：Gate 蓝（#2354E6）用于按钮、链接、选中态；金黄（#F0B90B）仅用于特殊强调（如金额、重点数据）
- **主题支持**：亮色/暗色双主题，通过 CSS 变量切换
- **适用标签**：`开发者` `技能市场` `API` `插件` `文档中心`

| 维度 | 本风格 | 默认 | 说明 |
|------|--------|------|------|
| 色温 | 中性偏冷 | 中性 | 背景偏冷深灰（非暖调） |
| 信息密度 | 低 | 中 | 极简单列布局，大量垂直留白 |
| 装饰程度 | 极简 | 克制 | 零装饰元素，纯信息驱动 |

---

## 区块 3: CSS 变量表

### 3.1 颜色变量

| 变量 | 暗色值 | 亮色值 | 说明 |
|------|--------|--------|------|
| `--bg` | #0D0E12 | #FFFFFF | 页面背景 |
| `--bg-card` | #181A20 | #FFFFFF | Hero 卡片/文档卡背景 |
| `--bg-elevated` | transparent | transparent | 搜索框背景 |
| `--bg-row` | #14161A | #F8F9FA | 技能行背景 |
| `--bg-code` | #14161A | #F8F9FA | 代码块/命令行背景 |
| `--bg-table-header` | #1A1D22 | #F3F4F6 | 表格标题行背景 |
| `--bg-inline-code` | #1F2329 | #E5E7EB | 行内代码片段背景 |
| `--border` | #1F2329 | #EAECEF | 卡片/行/搜索框通用边框 |
| `--border-hover` | #2B2F36 | #D1D5DB | 悬停态边框 |
| `--text-primary` | #FFFFFF | #0D0E12 | 标题文字 |
| `--text-secondary` | #848E9C | #5E6673 | 描述/标签文字 |
| `--text-subtitle` | #B0B8C1 | #1E2329 | 副标题，比 secondary 略亮 |
| `--text-muted` | #5E6673 | #848E9C | 注释/弱化提示 |
| `--text-tag` | #848E9C | #848E9C | 来源标签文字 |
| `--brand` | #2354E6 | #2354E6 | Gate 品牌蓝，按钮/链接/图标 |
| `--brand-hover` | #1E4ACC | #1E4ACC | 按钮悬停态 |
| `--accent` | #F0B90B | #F0B90B | 金黄辅助强调色，选中态/重点数据 |
| `--accent-active-border` | #2354E6 | #2354E6 | 技能行选中态左边框 |
| `--action-copy` | #2354E6 | #2354E6 | 命令栏复制按钮背景 |

### 3.2 渐变

无（纯色为主，无渐变）

### 3.3 圆角变量

| 变量 | 值 | 说明 |
|------|-----|------|
| `--radius-card` | 8px | Hero 卡片/技能行/搜索框/文档卡 |
| `--radius-sm` | 4px | 小号标签徽章 |
| `--radius-input` | 6px | 代码块圆角 |

### 3.4 间距变量

| 变量 | 值 | 说明 |
|------|-----|------|
| `--space-hero-to-search` | 32px | Hero 到搜索栏 |
| `--space-search-to-list` | 16px | 搜索栏到列表 |
| `--space-row-gap` | 12px | 技能行间距 |
| `--space-row-padding` | 24px | 技能行内边距 |
| `--space-hero-padding` | 40px | Hero 内边距（桌面） |
| `--space-hero-padding-mobile` | 24px | Hero 内边距（移动） |
| `--space-content-max-width` | 1088px | 内容最大宽度 |

### 3.5 排版覆盖

| Token | 覆盖值 | 原值 | 说明 |
|-------|--------|------|------|
| `display.large.campaign` | 40px / 700 | 60px / 600 | Hero 主标题，较粗 |
| `headline.medium` | 24px / 600 | 32px / 600 | Hero 副标题 |
| `title.large` | 20px / 700 | 28px / 600 | 技能行标题 |
| `body.medium` | 14px / 400 | 16px / 400 | 技能描述正文 |
| `body.small` | 14px / 400 | 14px / 400 | 搜索占位符 |
| `body.xsmall` | 12px / 400 | 12px / 400 | 标签徽章 |

---

## 区块 4: 布局结构

> layout: portal.index + portal.detail

### 差异项

- 全局: 内容最大宽度 ~1088px（比默认 1200px 略窄），纯单列，无多列卡片网格
- portal.index: Hero 为带边框信息卡（非全宽渐变），列表为纵向堆叠行（非卡片网格），增加独立搜索框
- portal.detail: 操作栏为安装命令栏（代码背景 + 复制按钮），内容主体为 Markdown 文档卡（带头部栏）
- 响应式: 平板同桌面，仅移动端缩小内边距和字号

---

## 区块 5: 组件变体

### 导航栏 (Top Nav)

```
+-------------------------------------------------------+
|  [*] Gate技能中心    |   由Gate打造，面向所有人。  |  [G]  |
+-------------------------------------------------------+
```

| 属性 | 值 | 备注 |
|------|-----|------|
| 背景 | `var(--bg)` | 同页面，无边框 |
| 高度 | 56px | |
| 左侧 | 品牌图标 + 品牌名（`var(--text-primary)`） | |
| 居中 | 标语文字 `var(--text-secondary)` | "由X打造，面向所有人。" |
| 标语关键字 | `var(--brand)` | "所有人" 用蓝色高亮 |
| 右侧 | GitHub 图标 | |

### Hero 信息卡 (Hero Info Card)

```
+-----------------------------------------------+
|                                               |
|  [品牌]技能中心                                |  <- 混色标题：品牌字蓝色，其余白色
|                                               |
|  加密货币行业全天候运转，                       |  <- 副标题 24px/700 白色
|  你的AI代理也应该如此。                         |
|                                               |
|  一个开放的技能市场，让 AI 代理能够             |  <- 描述 14px/400 灰色
|  通过自然语言原生访问加密货币——CEX 交易、       |
|  DEX 兑换、钱包跟踪和 DeFi 交互。              |
|                                               |
|  —— 所有技能在上线前都会经过安全审核。          |  <- 注释行
|                                               |
+-----------------------------------------------+
```

| 属性 | 值 | 备注 |
|------|-----|------|
| 容器 | `var(--bg-card)` 背景 + 1px `var(--border)` 边框 | |
| 圆角 | `var(--radius-card)` | 8px |
| 内边距 | `var(--space-hero-padding)` / `var(--space-hero-padding-mobile)` | 桌面 40px / 移动 24px |
| 品牌标题 | 40px/700，品牌字 `var(--brand)`，其余 `var(--text-primary)` | |
| 副标题 | 24px/700 `var(--text-primary)` | margin-top 16px |
| 描述段 | 14px/400 `var(--text-secondary)` | margin-top 16px |
| 注释行 | 14px/400 `var(--text-muted)`，前缀 "——" | margin-top 24px |

### 搜索栏 (Search Bar)

```
+-----------------------------------------------+
|  Q  搜索技能（名称/描述/标签）                   |
+-----------------------------------------------+
```

| 属性 | 值 | 备注 |
|------|-----|------|
| 背景 | `var(--bg-elevated)` | transparent |
| 边框 | 1px solid `var(--border)` | |
| 圆角 | `var(--radius-card)` | 8px |
| 高度 | 48px | |
| 图标 | `var(--text-muted)` 搜索图标 | |
| 占位符 | `var(--text-muted)` | |
| 聚焦态 | 边框变 `var(--brand)`，无 outline | 禁用默认 outline 避免双层边框 |

### 技能行 (Skill Row)

```
+-----------------------------------------------+
|                                               |
|  技能名称  [标签徽章]                     >    |  <- 标题行
|                                               |
|  技能的功能描述文案，解释这个技能做什么，       |  <- 描述
|  可以在什么场景下使用...                       |
|                                               |
+-----------------------------------------------+
```

| 属性 | 值 | 备注 |
|------|-----|------|
| 容器 | `var(--bg-row)` 背景，边框默认透明 | hover 时才显示边框 |
| 圆角 | `var(--radius-card)` | 8px |
| 内边距 | `var(--space-row-padding)` | 24px |
| 标题 | 20px/700 `var(--text-primary)` | |
| 标签徽章 | 12px/400 `var(--text-tag)`，无背景，仅文字 | 紧跟标题，如"Gate-web3" |
| 描述 | 14px/400 `var(--text-secondary)` | margin-top 8px |
| 右箭头 | `var(--text-muted)` chevron-right | 垂直居中，右对齐 |
| 悬停 | 边框从透明变为 `var(--border-hover)` + 轻微阴影 | transition 0.15s |
| **选中态** | 左侧 3px `var(--accent-active-border)` 边框 | 整行左边框高亮 |
| 行间距 | `var(--space-row-gap)` | 12px |

### 标签徽章 (Tag Badge)

| 属性 | 值 | 备注 |
|------|-----|------|
| 背景 | transparent | 纯文字标签 |
| 文字 | `var(--text-tag)` 12px/400 | |
| 样式 | 无边框，无背景，仅文字 | 跟在标题右侧 |

### ——— 以下为详情页组件 ———

### 技能名称区 (Skill Name Header)

```
crypto-market-rank                                <- 等宽字体，大号
描述文案描述文案描述文案描述文案描述文案...         <- 灰色正文
```

| 属性 | 值 | 备注 |
|------|-----|------|
| 名称字体 | 等宽字体 (font-mono), 28px/700 | `var(--text-primary)` |
| 描述 | 14px/400 `var(--text-secondary)` | margin-top 12px |

### 安装命令栏 (Install Command Bar)

```
+-----------------------------------------------+------+
|  $ npx skills add https://... --skill xxx      |  [C] |
+-----------------------------------------------+------+
```

| 属性 | 值 | 备注 |
|------|-----|------|
| 背景 | `var(--bg-code)` | |
| 边框 | 1px solid `var(--border)` | |
| 圆角 | `var(--radius-card)` | 8px |
| 内边距 | 16px | |
| 命令文字 | 14px 等宽字体，`var(--text-secondary)` | `$` 前缀 |
| 复制按钮 | `var(--action-copy)` 背景，白色图标 | 圆角 6px, 右对齐 |

### Markdown 文档卡 (Markdown Doc Card)

```
+-----------------------------------------------+
|  SKILL.md                    [G] Open in GitHub|  <- 头部栏
+-----------------------------------------------+
|                                                |
|  # Crypto Market Rank Skill                    |  <- H1
|                                                |
|  ## Overview                                   |  <- H2
|  +----+----------+----------+                  |
|  | API| Function | Use Case |                  |  <- 表格
|  +----+----------+----------+                  |
|                                                |
|  ## Use Cases                                  |
|  1. **Social Hype Analysis**: ...              |  <- 有序列表 + 粗体
|                                                |
|  ## API 1: Social Hype Leaderboard             |
|  Method: GET                                   |  <- 标签
|  URL:                                          |
|  +-------------------------------------------+ |
|  | https://web3.binance.com/bapi/...          | |  <- 代码块
|  +-------------------------------------------+ |
|                                                |
|  Request Parameters:                           |
|  +----------+------+--------+-------------+    |
|  |Parameter |Type  |Required|Description  |    |  <- 参数表格
|  +----------+------+--------+-------------+    |
|                                                |
+-----------------------------------------------+
```

| 属性 | 值 | 备注 |
|------|-----|------|
| 容器 | `var(--bg-card)` + 1px `var(--border)` 边框 | |
| 圆角 | `var(--radius-card)` | 8px |
| 内边距 | 32px (桌面) / 20px (移动) | |
| 头部栏 | 底部 1px `var(--border)` 分隔，flex between | |
| "SKILL.md" | 14px/600 `var(--text-primary)` | |
| "Open in GitHub" | 14px/400 `var(--brand)` + GitHub 图标 | |

### 文档内排版 (Doc Typography)

| 元素 | 样式 | 备注 |
|------|------|------|
| H1 | 28px/700 `var(--text-primary)` | margin-top 24px |
| H2 | 22px/700 `var(--text-primary)` | margin-top 32px |
| H3 | 18px/600 `var(--text-primary)` | margin-top 24px |
| 正文 | 14px/400 `var(--text-secondary)` | line-height 1.6 |
| 粗体 | 14px/600 `var(--text-primary)` | 列表项关键词 |
| 有序列表 | 数字前缀，缩进 20px | |

### 数据表格 (Data Table)

| 属性 | 值 | 备注 |
|------|-----|------|
| 容器 | 1px `var(--border)` 边框 | 无外圆角 |
| 表头背景 | `var(--bg-table-header)` | |
| 表头文字 | 13px/600 `var(--text-secondary)` | |
| 单元格 | 13px/400 `var(--text-secondary)` | 正文内容 |
| 单元格边框 | 底部 1px `var(--border)` | |
| 单元格内边距 | 12px 16px | |
| 行悬停 | 无（文档型表格，非交互） | |

### 代码块 (Code Block)

| 属性 | 值 | 备注 |
|------|-----|------|
| 背景 | `var(--bg-code)` | |
| 边框 | 1px solid `var(--border)` | |
| 圆角 | `var(--radius-input)` | 6px |
| 内边距 | 16px | |
| 字体 | 等宽字体, 13px/400 | |
| 文字色 | `var(--text-subtitle)` | 略亮于 secondary |
| 溢出 | overflow-x-auto | 长 URL 水平滚动 |

### 内联代码 (Inline Code)

| 属性 | 值 | 备注 |
|------|-----|------|
| 背景 | `var(--bg-inline-code)` | |
| 圆角 | 3px | |
| 内边距 | 2px 6px | |
| 字体 | 等宽字体, 13px | |
| 文字色 | `var(--text-subtitle)` | |

### 页脚 (Footer)

| 属性 | 值 | 备注 |
|------|-----|------|
| 背景 | `var(--bg)` | |
| 上边框 | 无 | |
| 文字 | 13px `var(--text-muted)` | 居中 |
| 内边距 | 24px 0 | |

---

## 区块 6: 适用性 & 自检

### 自检清单

> 基础清单见 `contract/rules.md` 自检清单章节，此处仅列本风格特有检查项。

- [ ] 品牌蓝 (#2354E6) 用于按钮、链接、选中态，金黄 (#F0B90B) 仅用于特殊强调
- [ ] 暗色背景使用冷调深灰 (#0D0E12)，亮色使用纯白 (#FFFFFF)
- [ ] 布局为窄栏单列 (~1088px)，非 1200px 全宽
- [ ] 技能展示为纵向列表行，不是卡片网格
- [ ] Hero 是带边框容器，不是全宽渐变
- [ ] 标题使用混色处理（品牌字蓝色 + 其余白色/深色）
- [ ] 选中/活跃技能行有左侧 3px 蓝色边框
- [ ] 搜索框使用透明背景 + 边框，非填充背景

### 适用 / 不适用场景

**适用：**
- 开发者技能/插件市场
- AI Agent 工具目录
- API 文档索引
- 技术产品列表页
- 开发者门户首页

**不适用：**
- 交易竞赛活动（建议用 competition.md）
- VIP 专属活动（建议用 vip-warm-elite.md）
- 节日主题活动（建议用对应 festive 系列）
- 任务奖励/空投活动（建议用 default.md）
- 多列仪表盘/数据大屏
