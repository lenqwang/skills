# CNY Festive Red 风格

> 生成代码前必须读取 `contract/rules.md`，完整遵守 `R1-R30`。本文件只定义视觉倾向与组件偏好。

---

## 区块 1: 元信息头

```yaml
name: cny-festive-red
description: 新春节庆亮色红金风格，红色渐变底 + 暖奶油卡片 + 金色CTA + 酒红按钮，适用于 VIP 新春活动、节日限时福利、红包雨、春节特别版活动
mode: light
source_urls: []
extracted_at: 2026-03-04
calibrated_at: null
```

---

## 区块 2: 风格画像

- **视觉情绪**：热烈喜庆、红金富贵、节日仪式感
- **核心组件**：居中垂直 Hero、暖奶油卡片区块、金色渐变 CTA、酒红操作按钮、进度时间轴、倒计时
- **强调方式**：金色渐变 CTA（#FFEFD9 → #FFB012 纵向），#FFB012 橙金色用于数字高亮/金额，#810620 酒红用于操作按钮/次级强调
- **适用标签**：`新春活动` `红包雨` `春节福利` `节日限时` `VIP春节`

> **核心范式差异**：本风格是**亮色系**（Light-on-Red），与所有现有深色风格（dark-on-black）完全反转。红色渐变作为页面背景，暖奶油色卡片作为内容载体，文字以深色 (#4E0707) 为主。

| 维度 | 本风格 | 默认 | 说明 |
|------|--------|------|------|
| 色温 | 极暖（红+金+奶油） | 中性 | 全暖色调，红金撞色 |
| 信息密度 | 中高 | 中 | 节庆内容密集，模块间距紧凑 |
| 装饰程度 | 丰富 | 克制 | 云纹、灯笼剪影、金色边框线服务节日氛围 |

---

## 区块 3: CSS 变量表

### 3.1 颜色变量

> 核心差异：本风格是**唯一亮色系**风格。页面背景为红色渐变而非深灰/黑色，卡片为暖奶油而非深色，文字以深色为主而非白色。与 vip-gold-prestige 的"哑光金暗底"形成完全互补。

| 变量 | 亮色值 | 说明 |
|------|--------|------|
| `--bg` | linear-gradient(180deg, #F6493B 0%, #FF8868 40%, #F53C32 100%) | 红色渐变底（CSS gradient） |
| `--bg-fallback` | #F54331 | 单色回退 |
| `--bg-card` | #FFF7E8 | 暖奶油色卡片/区块背景 |
| `--bg-card-secondary` | #FFF0D0 | 卡片内嵌层（进度条轨道/表格底色） |
| `--bg-card-hover` | #FFECBE | hover 态加深 |
| `--text-primary` | #4E0707 | 深栗色，卡片内所有主文字 |
| `--text-secondary` | #9F7A71 | 红棕色，说明/描述文字 |
| `--text-on-red` | #FFFFFF | 红色背景上的白色文字 |
| `--text-on-red-muted` | rgba(255,255,255,0.8) | 红色背景上的弱白文字 |
| `--brand` | #FFB012 | 橙金色，金额/积分/关键数据高亮 |
| `--accent` | #810620 | 酒红色，操作按钮/次级 CTA/标签 |
| `--accent-dark` | #8D0526 | 深酒红，次级 CTA 按钮 |
| `--border` | #FDEAC2 | 金色装饰边框 |
| `--success` | #16A34A | 已完成（亮底用更深的绿） |
| `--info` | #2563EB | 信息提示（亮底用更深蓝） |
| `--warning` | #D97706 | 警告（亮底用更深橙） |

### 3.2 渐变

| 变量 | CSS 值 | 说明 |
|------|--------|------|
| `--gradient-bg` | linear-gradient(180deg, #F6493B 0%, #FF8868 40%, #F53C32 100%) | 红色纵向渐变，顶部亮红 → 中段橙红 → 底部深红 |
| `--gradient-cta` | linear-gradient(to bottom, #FFEFD9, #FFB012) | 金色纵向渐变，深文字 |
| `--shadow-cta` | 0 4px 16px rgba(255,176,18,0.4) | 金色下方投影 |
| `--shadow-cta-hover` | 0 6px 24px rgba(255,176,18,0.6) | hover 增强 |
| `--gradient-decor-line` | linear-gradient(90deg, transparent, #FDEAC2, transparent) | 区块分隔金色渐隐线 |

### 3.3 圆角变量

| 变量 | 值 | 说明 |
|------|-----|------|
| `--radius-card-lg` | 32px (桌面) / 24px (平板) / 16px (移动) | 响应式卡片圆角 |
| `--radius-pill` | 9999px | 胶囊形按钮/徽章 |
| `--radius-panel` | 16px | 卡片内进度区域/统计区 |
| `--radius-countdown` | 12px | 倒计时 Cell，比 gold-prestige (8px) 更圆润 |
| `--radius-tag-sm` | 4px | 小标签 |
| `--radius-tag-md` | 9999px | 胶囊标签 |

### 3.4 间距变量

> 节庆风格间距较紧凑（filling > whitespace），模块间不需要 gold-prestige 那样大的留白。

| 变量 | 值 | 说明 |
|------|-----|------|
| `--space-section` | 48px (桌面) / 40px (平板) / 32px (移动) | 比 gold-prestige (80/64/48) 更紧凑 |
| `--space-section-inner` | 24px | 模块内子区块间距 |
| `--space-card-padding` | 24px (桌面/平板) / 16px (移动) | 卡片内边距 |
| `--space-container-x` | 32px (lg) / 24px (sm) / 16px (xs) | 容器水平内边距 |
| `--space-container-max` | 1200px | 容器最大宽度 |
| `--space-grid-gap` | 16px (桌面) / 12px (移动) | 比 gold-prestige (24/16) 更紧 |
| `--space-hero-y` | 64px (桌面) / 48px (移动) | 红色背景上的 Hero 区域 |

---

## 区块 4: 布局结构

> layout: campaign

### 差异项

- Hero: 水平分割模式（左文右装饰媒体区），红色渐变背景（非深色），移动端堆叠为垂直居中
- 额外模块: 走马灯（金色/奶油色滚动条）→ 积分进度（奶油卡片内里程碑）→ 任务列表（单列行式，非卡片网格）→ 奖品兑换（3 列网格）→ 活动规则
- 栅格: 奖品网格 3 列（平板 2 列，移动端 1 列），任务列表单列行式（左标题右按钮）
- 间距: `--space-section` 48px（桌面）/ 40px（平板）/ 32px（移动端），比默认更紧凑
- 圆角响应式: `--radius-card-lg` 32px / 24px / 16px（桌面/平板/移动端）
- 容器: 所有内容区块包裹在暖奶油色卡片中（`var(--bg-card)`），与红色背景形成高对比

---

## 区块 5: 组件变体

### 水平分割 Hero (Horizontal Split Hero)

> 本风格标志性组件。采用水平分割布局：左侧为标题+统计数据+CTA，右侧为装饰媒体区（云纹/灯笼/福字等节日元素）。移动端堆叠为垂直布局。

```
+-----------------------------------------------------------+
|            [红色渐变背景 var(--gradient-bg)]                  |
|                                                           |
|  +-------------------------+  +-------------------------+ |
|  |                         |  |                         | |
|  |  VIP 专属新春奢华礼遇    |  |     [装饰媒体区]         | |
|  |  得 IWC 腕表、Rimowa... |  |                         | |
|  |                         |  |   +---------------+     | |
|  |  +------+ +------+      |  |   |   云纹         |     | |
|  |  | 30天 | | 18时 | ...  |  |   |   灯笼         |     | |
|  |  +------+ +------+      |  |   |   福字         |     | |
|  |                         |  |   +---------------+     | |
|  |  [立即报名] [活动详情]   |  |                         | |
|  |                         |  |                         | |
|  |  2026.03.17 - 04.17     |  |                         | |
|  +-------------------------+  +-------------------------+ |
|                                                           |
+-----------------------------------------------------------+
```

| 属性 | 值 | 备注 |
|------|-----|------|
| 背景 | `var(--gradient-bg)` | 页面级红色渐变，非卡片 |
| 容器布局 | flex，移动端垂直，桌面端水平，gap 32-48px | |
| 左侧内容区 | flex-1，限制最大宽度 | |
| 右侧媒体区 | flex-1，相对定位 | 装饰元素容器 |
| 内边距 | `var(--space-hero-y)` 响应式 | |
| 标题 | 30-48px / 700 / `var(--text-on-red)` | 白色大标题 |
| 副标题 | 16-18px / `var(--text-on-red-muted)` | 半透白 |
| 统计行 | flex 排列，gap 24px | 数值金色，标签白/60 |
| 统计数值 | 24-30px / 700 / `var(--brand)` tabular-nums | 橙金色 |
| 统计标签 | 14px / rgba(255,255,255,0.6) | |
| 倒计时 | 白色毛玻璃 Cell，bg-white/15 backdrop-blur-sm `var(--radius-countdown)` | 在红底上 |
| 主 CTA | `var(--gradient-cta)` / `var(--text-primary)` / 700 / `var(--radius-pill)` + `var(--shadow-cta)` | 每屏唯一 `contract/rules.md#R23` |
| 次级 CTA | `var(--accent-dark)` / `var(--text-on-red)` / `var(--radius-pill)` | 酒红实色 |
| 时间文字 | 14px / rgba(255,255,255,0.6) | |
| 装饰媒体区 | 相对定位，最大宽度限制，正方形比例 | 可放云纹 SVG、灯笼图、福字、红包等 |
| 装饰元素 | 绝对定位，白色/金色，opacity 0.1-0.3 | 多层叠加营造氛围 |
| 移动端媒体区 | 隐藏或简化 | |

### 暖奶油卡片 (Warm Cream Card)

> 本风格的基础容器。所有内容区块均包裹在暖奶油色卡片中，与红色背景形成高对比。

```
+---------------------------------------------------+
|  ████████████████████████████████████████████████  |  <- var(--bg-card)
|  ██                                            ██  |
|  ██   区块标题                                  ██  |  <- var(--text-primary)
|  ██   ═══════                                  ██  |  <- 金色短横线或红色短横线
|  ██                                            ██  |
|  ██   [内容区域]                                ██  |
|  ██                                            ██  |
|  ████████████████████████████████████████████████  |
+---------------------------------------------------+
```

| 属性 | 值 | 备注 |
|------|-----|------|
| 背景 | `var(--bg-card)` | 暖奶油色 #FFF7E8 |
| 圆角 | `var(--radius-card-lg)` | 响应式 32/24/16px |
| 内边距 | `var(--space-card-padding)` 响应式 | |
| 边框 | 无默认；hover 或强调态加 1px solid `var(--border)` | 金色装饰边框 |
| 阴影 | 0 4px 24px rgba(0,0,0,0.08) | 轻微投影提升层次 |
| 文字色 | `var(--text-primary)`（主）、`var(--text-secondary)`（次） | 深栗色 + 红棕色 |

### 区块标题 (Section Header — CNY)

> 在奶油卡片内的居中标题，使用深栗色文字 + 红色/金色短横线。

```
        VIP 专属任务
       ═══════════
```

| 属性 | 值 | 备注 |
|------|-----|------|
| 容器 | flex 纵向居中，底部间距 32px | |
| 标题 | 24-30px / 700 / `var(--text-primary)` / 底部间距 8px | 深栗色 |
| 分隔条 | 宽 64px / 高 4px / `var(--brand)` / `var(--radius-pill)` | 橙金色短横线（或 `var(--accent)` 酒红变体） |

### 任务行 (Task Row)

> 与 gold-prestige 的 2 列网格不同，CNY 使用单列行式布局，每行一条任务，左侧信息+右侧操作按钮。适合内容较密集的节庆页面。

```
+-------------------------------------------------------------------+
|  [icon] 现货交易额达标           每满 20,000 USDT +10积分    [去交易] |
+-------------------------------------------------------------------+
|  [icon] 合约交易额达标           每满 500,000 USDT +100积分  [去交易] |
+-------------------------------------------------------------------+
|  [icon] 交易天数达标    ●───────●───────○                   [去交易] |
|                         8天   15天(+200) 20天(+500)                |
+-------------------------------------------------------------------+
```

| 属性 | 值 | 备注 |
|------|-----|------|
| 行容器 | flex 水平居中两端对齐，paddingY 20px，底部 1px solid `var(--border)` | 金色分隔线 |
| 最后一行 | 无底部边框 | |
| 图标框 | 40x40 / `var(--radius-panel)` 缩小 / `var(--brand)` 10% opacity 背景 | 淡金底 |
| 图标 | `var(--brand)` | 橙金色 |
| 标题 | 16px / 700 / `var(--text-primary)` | |
| 描述 | 14px / `var(--text-secondary)` | |
| 积分标签 | paddingX 8px / paddingY 2px / `var(--brand)` 10% opacity 背景 / `var(--brand)` / 12px / mono | |
| 操作按钮 | `var(--accent)` 背景 / `var(--text-on-red)` / `var(--radius-pill)` / paddingX 24px / paddingY 8px / 14px / 700 | 酒红胶囊 |
| 按钮 hover | opacity 0.9，transition | |
| 按钮已完成 | `var(--border)` 背景 / `var(--text-secondary)` / cursor-not-allowed | 淡金灰化 |
| 布局 | 单列全宽，用 border-b 分隔 | |

### 时间轴任务 (Timeline Task — CNY)

> 双节点时间轴变体，嵌入任务行内。

```
   ●════════════○─────────────○
 当前8天       15天           20天
               +200积分       +500积分
```

| 属性 | 值 | 备注 |
|------|-----|------|
| 轨道 | 高 2px / `var(--border)` | 金色浅轨 |
| 已完成段 | 高 2px / `var(--brand)` | 橙金填充 |
| 已完成节点 | 24x24 / `var(--radius-pill)` / `var(--brand)` 背景 / `var(--text-on-red)` | 橙金实心 |
| 当前节点 | 24x24 / `var(--radius-pill)` / 2px solid `var(--brand)` / `var(--bg-card)` 背景 + ring-4 `var(--brand)` 20% | 金色环 |
| 未达节点 | 24x24 / `var(--radius-pill)` / 2px solid `var(--border)` / `var(--bg-card)` 背景 | 浅金边框空心 |
| 节点文字 | 已达 `var(--brand)` / 700 / 12px，未达 `var(--text-secondary)` | |

### 奖品网格卡片 (Prize Card — CNY)

> 在奶油大卡片内部的小卡片，使用内嵌浅色背景区分层次。

```
+-----------------------------+
|    [ 金色圆形图标框 ]         |
|                             |
|   IWC万国飞行员腕表           |
|   2,000,000 积分             |  <- var(--brand)
|   剩余 1 件                  |
|                             |
|     [  赚取积分  ]           |  <- 酒红按钮 / 金色CTA
+-----------------------------+
```

| 属性 | 值 | 备注 |
|------|-----|------|
| 容器 | `var(--radius-panel)` / bg-white 60% opacity / 1px solid `var(--border)` | 半透白底 + 金色边框，在 `var(--bg-card)` 上 |
| 内边距 | 20-24px 响应式 | |
| 整体对齐 | flex 纵向居中 | |
| hover | 上移 4px + 金色阴影 0 4px 16px rgba(255,176,18,0.2)，transition 300ms | |
| 图标框 | 56x56 / `var(--radius-pill)` / `var(--brand)` 10% opacity 背景 / 1px solid `var(--brand)` 20% | 圆形，淡金底 |
| 图标 | `var(--brand)` | hover 时 scale 1.1 |
| 名称 | 16px / 700 / `var(--text-primary)` | |
| 积分 | 18px / 700 / `var(--brand)` tabular-nums | 橙金高亮 |
| 库存 | 12px / `var(--text-secondary)` | |
| 兑换按钮（可兑） | 全宽 / paddingY 10px / `var(--radius-pill)` / `var(--gradient-cta)` / `var(--text-primary)` / 14px / 700 | 金色渐变 |
| 赚取积分按钮 | 全宽 / paddingY 10px / `var(--radius-pill)` / `var(--accent)` 背景 / `var(--text-on-red)` / 14px / 700 | 酒红实色 |
| 已售罄 | 全宽 / paddingY 10px / `var(--radius-pill)` / `var(--border)` 背景 / `var(--text-secondary)` / cursor-not-allowed / 14px | 灰化 |
| 布局 | grid 1-2-3 列响应式，gap `var(--space-grid-gap)` | 紧凑间距 |

### 倒计时 (CountDown — CNY)

> 在红色背景上的倒计时，使用半透白色毛玻璃格子。

```
+------+   +------+   +------+   +------+
|  02  |   |  18  |   |  35  |   |  42  |
|   D  | : |   H  | : |   M  | : |   S  |
+------+   +------+   +------+   +------+
```

| 属性 | 值 | 备注 |
|------|-----|------|
| Cell 背景 | bg-white/15 backdrop-blur-sm | 半透白毛玻璃（在红底上） |
| Cell 尺寸 | 56x60 (lg) / 48x52 (sm) | 响应式 |
| Cell 圆角 | `var(--radius-countdown)` | 12px |
| 数字 | 24px / 32px / 700 / `var(--text-on-red)` tabular-nums | 在红底上为白色 |
| 单位 | 12px / 16px / 400 / rgba(255,255,255,0.6) | D/H/M/S |
| 分隔符 | `:` rgba(255,255,255,0.4) 粗体 24px | |
| Cell 间距 | 16px (md/lg) / 4px (sm) | |

### 里程碑进度 (Milestone Progress — CNY)

> 在奶油卡片内的水平进度条，使用金色填充。

| 属性 | 值 | 备注 |
|------|-----|------|
| 容器 | 在奶油卡片内，无额外背景 | |
| 进度条轨道 | 高 6px / `var(--border)` / `var(--radius-pill)` | 浅金色轨道 |
| 进度条填充 | 高 6px / `var(--gradient-cta)` 水平方向 / `var(--radius-pill)` | 金色渐变 |
| 已完成节点 | 32x32 / `var(--radius-pill)` / `var(--brand)` 背景 / `var(--text-on-red)` + check 图标 | 橙金实心 |
| 当前节点 | 32x32 / `var(--radius-pill)` / 2px solid `var(--brand)` / `var(--bg-card)` 背景 + ring-4 `var(--brand)` 20% | 金色脉冲环 |
| 未达节点 | 32x32 / `var(--radius-pill)` / 2px solid `var(--border)` / `var(--bg-card)` 背景 / `var(--text-secondary)` | 浅金边空心 |
| 等级文字 | 已达 `var(--brand)` / 700 / 14px，未达 `var(--text-secondary)` | |
| 金额文字 | 12px / `var(--text-secondary)` / mono | |

### 走马灯 (Marquee — CNY)

> 在红色背景与内容卡片之间的金色条带。

| 属性 | 值 | 备注 |
|------|-----|------|
| 背景 | `var(--bg-card)` 90% opacity + backdrop-blur-sm | 半透奶油色 |
| 内边距 | paddingY 12px | |
| 标签 | `var(--accent)` / 600 / 12px | 酒红色"兑换动态" |
| 头像 | 24x24 / `var(--radius-pill)` / `var(--brand)` 20% opacity 背景 / 1px solid `var(--border)` | 金色底 |
| 昵称 | `var(--text-primary)` / 14px | |
| 奖品名 | `var(--brand)` / 600 / 14px | 橙金高亮 |
| 分隔 | `var(--text-secondary)`（"兑换了"连接词） | |

### Tab 切换 (Tabs — CNY)

> 在奶油卡片内的 Tab，使用酒红/金色活跃态。

**Segment 变体（推荐）**
```
+------------------------------------------+
|  ( 兑换记录 )  ( 任务记录 )                |
|    ^ 酒红背景 + 白色文字                    |
+------------------------------------------+
```

| 属性 | 值 | 备注 |
|------|-----|------|
| Segment 容器 | inline-flex / padding 4px / `var(--border)` 50% opacity 背景 / `var(--radius-pill)` | 浅金底 |
| Segment 活跃 | `var(--radius-pill)` / `var(--accent)` 背景 / `var(--text-on-red)` / 700 / shadow-sm / paddingX 20px / paddingY 8px | 酒红实色 |
| Segment 非活跃 | `var(--radius-pill)` / `var(--text-secondary)` / hover 变 `var(--text-primary)` / paddingX 20px / paddingY 8px | |

### Tag 标签 (Tag — CNY)

| 类型 | Solid 样式 | Outline 样式 |
|------|-----------|-------------|
| neutral | `var(--border)` 50% opacity 背景 / `var(--text-secondary)` | 1px solid `var(--border)` / `var(--text-secondary)` |
| brand | `var(--brand)` 背景 / `var(--text-primary)` / 700 | 1px solid `var(--brand)` / `var(--brand)` |
| accent | `var(--accent)` 背景 / `var(--text-on-red)` / 700 | 1px solid `var(--accent)` / `var(--accent)` |
| success | `var(--success)` 10% opacity 背景 / `var(--success)` | 1px solid `var(--success)` / `var(--success)` |
| warning | `var(--warning)` 10% opacity 背景 / `var(--warning)` | 1px solid `var(--warning)` / `var(--warning)` |

| 属性 | 值 | 备注 |
|------|-----|------|
| sm 圆角 | `var(--radius-tag-sm)` | 4px |
| md 圆角 | `var(--radius-tag-md)` | 9999px 胶囊 |
| sm paddingX/Y | 6px / 2px | |
| md paddingX/Y | 12px / 4px | |
| 字号 | 12px / 16px / 500 | |

### 活动规则 (Rules — CNY)

| 属性 | 值 | 备注 |
|------|-----|------|
| 容器 | 在奶油大卡片内，无额外容器 | |
| 标题 | 18px / 700 / `var(--text-primary)` | |
| 图标 | `var(--brand)` | 橙金色 |
| 规则文字 | 14px / `var(--text-secondary)` / leading-relaxed | 红棕色 |
| 列表标记 | `var(--text-secondary)` | |
| 分隔线 | 1px solid `var(--border)` | 金色分隔 |

---

## 区块 6: 适用性 & 自检

### 自检清单

> 基础清单见 `contract/rules.md` 自检清单章节，此处仅列本风格特有检查项。

- [ ] 页面背景使用 `var(--gradient-bg)` 红色渐变，非深色/黑色
- [ ] 卡片背景为 `var(--bg-card)` 暖奶油色，非深色
- [ ] 卡片内主文字使用 `var(--text-primary)` 深栗色，非白色
- [ ] 卡片内弱文字使用 `var(--text-secondary)` 红棕色，非灰色
- [ ] 数字高亮使用 `var(--brand)` 橙金色，非其他金色
- [ ] 主 CTA 为 `var(--gradient-cta)` 纵向金色渐变，文字为 `var(--text-primary)`
- [ ] 次级 CTA / 操作按钮使用 `var(--accent)` / `var(--accent-dark)` 酒红 + `var(--text-on-red)` 白色文字
- [ ] 装饰边框使用 `var(--border)` 金色，非 white/10
- [ ] Hero 在红色背景上文字为 `var(--text-on-red)` 白色，非深色
- [ ] 卡片内文字颜色与卡片外（红底上）文字颜色不混用
- [ ] 对比度检查：#4E0707 on #FFF7E8 >= 4.5:1（约 10:1），#FFB012 on #FFF7E8（大文字 >= 3:1，小文字需验证）
- [ ] 倒计时 Cell 使用 bg-white/15 毛玻璃（红底上），非 bg-white/10（暗底）
- [ ] 卡片圆角响应式：`var(--radius-card-lg)` 32/24/16px
- [ ] 所有按钮为胶囊形 `var(--radius-pill)`
- [ ] 图标使用 `@gate/iconfont`，不使用 emoji（`contract/rules.md#R19`）
- [ ] 区块标题在奶油卡片内使用 `var(--text-primary)` + `var(--brand)` / `var(--accent)` 短横线

### 适用 / 不适用场景

**适用：**
- VIP 新春/春节专属活动
- 红包雨活动
- 节日限时福利（元旦、国庆等喜庆节日）
- 春节任务挑战
- 新年积分兑换活动
- 节庆品牌形象落地页
- 需要"喜庆红"视觉基调的活动

**不适用：**
- 日常 VIP 活动（非节日，建议用 vip-gold-prestige.md）
- 排行榜/竞赛为核心的活动（建议用 competition.md）
- 需要深色/暗黑基调的活动（建议用 vip-gold-prestige.md 或 vip-warm-elite.md）
- 西方节日主题（圣诞/万圣节，视觉语言不同）
- 轻量空投/新手活动（建议用 default.md）
- 需要大量数据表格的高密度信息页（红底白卡不适合极高密度）
