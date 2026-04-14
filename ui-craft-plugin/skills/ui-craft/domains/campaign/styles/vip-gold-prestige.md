# VIP Gold Prestige 风格

> 生成代码前必须读取 `contract/rules.md`，完整遵守 `R1-R30`。本文件只定义视觉倾向与组件偏好。

---

## 区块 1: 元信息头

```yaml
name: vip-gold-prestige
description: VIP 专属活动明亮金风格，吸顶导航 + Hero 左文右图 + 倒计时 + 里程碑进度条 + 任务/奖品网格，适用于 VIP 专属福利、节日礼遇、等级权益类活动
mode: dark
source_urls: []
extracted_at: 2026-03-04
calibrated_at: null
```

---

## 区块 2: 风格画像

- **视觉情绪**：沉稳尊贵、低调奢华、VIP 仪式感
- **核心组件**：水平分割 Hero、里程碑进度条、任务网格卡片、奖品网格卡片、吸顶导航栏、倒计时
- **强调方式**：明亮金色渐变（#EDE6D9 -> #E8D079）贯穿所有按钮和关键元素，#FBE9AF 用于次级金色，#EDE6D9 作为淡金高光/主文字
- **适用标签**：`VIP专属` `节日礼遇` `等级权益` `里程碑解锁` `奖品展示`

| 维度 | 本风格 | 默认 | 说明 |
|------|--------|------|------|
| 色温 | 暖色 | 中性 | 哑光金色系主导，暖感明显 |
| 信息密度 | 中 | 中 | 信息量适中，模块清晰分区，留白呼吸感强 |
| 装饰程度 | 适中 | 克制 | 金色光晕服务 VIP 尊贵感，留白呼吸感强 |

---

## 区块 3: CSS 变量表

### 3.1 颜色变量

> 核心差异：与哑光金版本相比，本风格使用明亮金 (#E8D079) 作为主强调色，CTA 渐变更明亮（#EDE6D9 -> #E8D079），主文字带暖金色调 (#EDE6D9)，整体风格更鲜明尊贵。

| 变量 | 暗色值 | 说明 |
|------|--------|------|
| `--bg` | #070808 | 极深灰底 |
| `--bg-card` | #171716 | 卡片/组件背景（主表面） |
| `--bg-card-secondary` | #0A0A0A | 内嵌层背景（次级表面） |
| `--bg-hover` | #1F1F1F | hover 态 |
| `--bg-muted` | #484B51 | 进度条轨道/分隔/灰色边框 |
| `--text-primary` | #EDE6D9 | 主文字（暖金白） |
| `--text-secondary` | #A0A3A7 | 说明文字/标签 |
| `--text-disabled` | #484B51 | 不可用态 |
| `--text-countdown-unit` | #A0A3A7 | 倒计时 D/H/M/S |
| `--text-countdown-sep` | #484B51 | 冒号分隔符 |
| `--accent` | #E8D079 | 明亮金，风格主色（金额高亮/进度条填充/关键数据） |
| `--accent-highlight` | #E8D079 | 数字高亮/徽章/统计数据（与 accent 统一） |
| `--accent-secondary` | #FBE9AF | 金色次级/辅助高光 |
| `--accent-light` | #EDE6D9 | 淡金高光/渐变起始色 |
| `--accent-alpha20` | rgba(232,208,121,0.2) | 金色透明 20%（标签背景/装饰） |
| `--accent-alpha30` | rgba(232,208,121,0.3) | 金色透明 30%（图标背景/边框） |
| `--accent-cta-from` | #EDE6D9 | 按钮渐变起始（淡金） |
| `--accent-cta-to` | #E8D079 | 按钮渐变终止（明亮金） |
| `--success` | #4ADE80 | 已完成状态 |
| `--info` | #3B82F6 | 信息提示 |
| `--warning` | #F59E0B | 警告提示 |

### 3.2 渐变

| 用途 | CSS 值 | 说明 |
|------|--------|------|
| CTA 按钮 | `linear-gradient(to right, var(--accent-cta-from), var(--accent-cta-to))` | 明亮金渐变 #EDE6D9 → #E8D079，主 CTA 按钮 |
| 标题高亮 | 字符级渐变：#FDFDFD → #FAF5E0 → #F5EBC1 → #F1E1A2 → #EED683 → #E8D079 | 逐字符颜色递进，适用于 Hero 主标题 |
| 图标背景 | `linear-gradient(135deg, var(--accent-alpha30), var(--accent-alpha20))` | 金色半透明图标容器 |
| 进度条填充 | `linear-gradient(to right, var(--accent-cta-from), var(--accent-cta-to))` | 与 CTA 同色渐变 |
| Hero 光晕 | `radial-gradient(circle, var(--accent-alpha20) 0%, transparent 70%)` | 页面顶部装饰性光晕 |
| CTA 阴影 | `box-shadow: 0 0 15px rgba(202,178,154,0.3)` | 按钮静态阴影 |
| CTA hover 阴影 | `box-shadow: 0 0 30px rgba(202,178,154,0.5)` | 按钮 hover 阴影增强 |

### 3.3 圆角变量

| 变量 | 值 | 说明 |
|------|-----|------|
| `--radius-card-lg` | 32px (桌面) / 24px (平板) / 16px (移动) | 响应式，查阅 `contract/rules.md#R10` |
| `--radius-pill` | 9999px | 胶囊形按钮/徽章/Segment Tab |
| `--radius-icon-box` | 16px | 奖品图标容器 |
| `--radius-countdown` | 8px | 倒计时 Cell |
| `--radius-tag-sm` | 4px | 小标签 |
| `--radius-tag-md` | 9999px | 胶囊标签 |

### 3.4 间距变量

| 变量 | 值 | 说明 |
|------|-----|------|
| `--space-section` | 80px (桌面) / 64px (平板) / 48px (移动) | 模块垂直内边距 |
| `--space-sub-section` | 48px (桌面/平板) / 32px (移动) | 模块内子区块间距 |
| `--space-card-inner` | 24px (桌面/平板) / 16px (移动) | 卡片内间距 |
| `--space-container-x` | 32px (lg) / 24px (sm) / 16px (base) | 水平安全边距 |
| `--space-container-max` | 1200px | 容器最大宽度 |
| `--space-grid-gap` | 24px (桌面/平板) / 16px (移动) | Grid 组件间距 |
| `--space-hero-gap` | 48px | Hero 左右两栏间距 |

---

## 区块 4: 布局结构

> layout: campaign

### 差异项

- Nav: 吸顶导航（fixed top-0 z-50，毛玻璃背景），默认 campaign 无吸顶导航
- Hero: 水平分割模式（左文右装饰媒体区，md:grid-cols-2），移动端堆叠，非默认简单 Hero
- 额外模块: 里程碑进度（水平步骤条）→ VIP 专属任务（2 列网格）→ VIP 专属奖池（3 列网格）→ 活动规则 → Footer（多列链接）
- 栅格: 任务网格 2 列（移动端 1 列），奖品网格 3 列（平板 2 列，移动端 1 列），Footer 5 列（平板 4 列，移动端 2 列）
- 间距: `--space-section` 80px（桌面）/ 64px（平板）/ 48px（移动端）
- 圆角响应式: `--radius-card-lg` 32px / 24px / 16px（桌面/平板/移动端）

---

## 区块 5: 组件变体

### 吸顶导航 (Sticky Nav)

```
+-----------------------------------------------------------------+
| [G] Gate VIP    首页  VIP权益  专属活动  关于我们   [登录] [注册]  |
+-----------------------------------------------------------------+
   ^ 金色渐变圆形 Logo                                ^ 金色渐变按钮
```

| 属性 | 值 | 备注 |
|------|-----|------|
| 定位 | fixed top-0 z-50 | 吸顶 |
| 背景 | `var(--bg)` 90% opacity + backdrop-blur-md | 半透明毛玻璃 |
| 下边框 | 1px solid rgba(255,255,255,0.05) | 微弱分隔 |
| 高度 | 64px | |
| Logo | CTA 渐变圆形 + 白色品牌名 + `var(--accent-highlight)` "VIP" | |
| 链接 | `var(--text-secondary)` hover 变 `var(--accent)` | 金色 hover |
| 注册按钮 | CTA 渐变背景 + 黑色文字 | |
| 移动端 | 汉堡菜单展开下拉面板，`var(--bg-card)` 背景 | |

### 水平分割 Hero (Horizontal Split Hero)

> 本风格标志性组件。区别于 default 的简单 Hero 和 vip-warm-elite 的数据大屏：采用左文右图非对称分割，右侧为装饰性媒体区。

```
+---------------------------------------------------------+
|                  [金色光晕 800x500 blur-80]               |
|                                                         |
|   [* VIP Exclusive] badge                               |
|                                     +--[旋转圆环]----+   |
|   VIP 专属                          |                |   |
|   新春奢华礼遇  <- bg-clip-text     |   [Trophy]     |   |
|                  金色渐变            |                |   |
|   描述文字...                       +--[浮动元素]----+   |
|                                                         |
|   [立即参与 ->]  [活动详情]                               |
|                                                         |
|   $2,500      |  100+       |  7 Days                   |
|   Prize Pool  |  Winners    |  Remaining                |
+---------------------------------------------------------+
```

| 属性 | 值 | 备注 |
|------|-----|------|
| 布局 | grid md:grid-cols-2 items-center | 左文右图 |
| 间距 | `var(--space-hero-gap)` | 48px |
| 内边距 | pt-32 pb-20（考虑 Nav 吸顶 64px） | |
| 光晕 | absolute, 800x500, `var(--accent)` 6% opacity, blur-80px, rounded-full | 装饰性椭圆 |
| Badge | `var(--accent)` 边框 30% + 背景 5% + 文字 `var(--accent)`, 圆角 `var(--radius-pill)` | 绿点 + 文字 |
| 标题 | h1 白色，高亮词 `bg-clip-text text-transparent` + 金色渐变 | |
| 描述 | `var(--text-secondary)` | |
| 主 CTA | CTA 渐变 + 黑色文字 + `var(--radius-pill)` + 金色阴影 | 查阅 `contract/rules.md#R23` 每屏唯一 |
| 次级 CTA | rgba(255,255,255,0.2) 边框 + `var(--text-primary)` | |
| 统计数据行 | 数字 `var(--accent-highlight)` 粗体，标签 `var(--text-secondary)` 小字，竖线 rgba(255,255,255,0.1) 分隔 | |
| 装饰圆环 | `var(--accent)` 20% opacity 边框, rounded-full, animate-spin 外层 10s，内层 15s 反向 | |
| 浮动元素 | rgba(255,255,255,0.05) 背景 + `var(--accent)` 30% opacity 边框, backdrop-blur-sm | |

### 里程碑进度 (Milestone Progress)

> 水平步骤条，支持已完成/当前/未达三种状态，当前节点放大 + 光环强调。

```
+---------------------------------------------------------+
|                                      [ 当前进度 ] Badge  |
|                                                         |
|   =====[===]=========-------------------------------    |
|   *          @              o              o            |
|  VIP 1     VIP 2         VIP 3          VIP 4          |
| 1,000     5,000         20,000         50,000          |
+---------------------------------------------------------+
```

| 属性 | 值 | 备注 |
|------|-----|------|
| 容器 | 查阅 `contract/rules.md#R10` 卡片圆角 + `var(--bg-card)` 背景 + rgba(255,255,255,0.1) 边框 | |
| 内边距 | pt-12 pb-8 px-4 md:px-12 | |
| 进度条轨道 | h-1, rgba(255,255,255,0.1) 背景, rounded-full | 全宽 |
| 进度条填充 | h-1, 金色渐变 `var(--accent-cta-from)` -> `var(--accent-cta-to)`, rounded-full | |
| 已完成节点 | w-8 h-8, `var(--accent)` 背景 + 边框, 黑色文字 + 金色阴影 | CheckCircle2 图标 |
| 当前节点 | scale-125, ring-4 `var(--accent)` 20% opacity + 内部实心圆点 | 放大 + 光环 |
| 未达节点 | w-8 h-8, `var(--bg-card)` 背景, rgba(255,255,255,0.2) 边框, `var(--text-secondary)` | 空心 |
| 等级文字 | 已达 `var(--accent-highlight)` 粗体, 未达 `var(--text-secondary)` | |
| 金额文字 | `var(--text-secondary)` 小字 font-mono | |
| 当前进度 Badge | `var(--accent)` 10% 背景 + 20% 边框 + 文字色, `var(--radius-pill)` | 右上角 |

### 任务网格卡片 (Task Card)

```
+-----------------------------+
|  完成首笔交易      [+500积分] |
|  活动期间完成...             |
|                             |
|  ======------               |
|  进度: 0 / 1       [去完成]  |
+-----------------------------+
```

| 属性 | 值 | 备注 |
|------|-----|------|
| 容器 | 查阅 `contract/rules.md#R10` 卡片圆角 + rgba(255,255,255,0.1) 边框 + `var(--bg-card)` | |
| 内边距 | 查阅 `contract/rules.md#R7` | |
| 标题 | `var(--text-primary)` 粗体 | hover 变 `var(--accent)` |
| 积分标签 | `var(--accent)` 10% 背景 + 20% 边框 + 文字色, font-mono | |
| 描述 | `var(--text-secondary)` | |
| 进度条 | h-1.5, rgba(255,255,255,0.1) 底轨 + CTA 渐变填充, rounded-full | |
| 进度文字 | `var(--text-secondary)` font-mono，当前值 `var(--text-primary)` | |
| 按钮（可操作） | `var(--accent)` 实色背景 + 黑色文字, `var(--radius-pill)` | hover 加金色阴影 |
| 按钮（已完成） | rgba(255,255,255,0.1) 背景 + `var(--text-secondary)`, cursor-not-allowed | |
| 布局 | grid md:grid-cols-2 gap-6 | 2 列网格 |

### 奖品网格卡片 (Prize Card)

```
+-----------------------------+
|        [ 图标框 ]            |
|                             |
|     VIP 新春礼包             |
|    价值 2,000 USDT          |
|                             |
|      [ 查看详情 ]            |
+-----------------------------+
```

| 属性 | 值 | 备注 |
|------|-----|------|
| 容器 | 查阅 `contract/rules.md#R10` 卡片圆角 + rgba(255,255,255,0.1) 边框 + `var(--bg-card)` | |
| 内边距 | 查阅 `contract/rules.md#R7` | |
| 整体对齐 | flex-col items-center text-center | 居中 |
| hover | hover:-translate-y-2 transition-all duration-300 | 上浮效果 |
| 图标框 | w-16 h-16, `var(--radius-icon-box)`, `var(--bg-hover)` 背景 + rgba(255,255,255,0.05) 边框 | hover 变 `var(--accent)` 10% 背景 + 30% 边框 |
| 图标 | `var(--accent)` | hover 变 scale-110 |
| 名称 | `var(--text-primary)` 粗体 | hover 变 `var(--accent)` |
| 描述 | `var(--text-secondary)` | |
| 按钮 | `var(--accent)` 30% 边框 + 文字色, `var(--radius-icon-box)` | hover 变金色实底 + 黑色文字 |
| 布局 | grid sm:grid-cols-2 lg:grid-cols-3 gap-6 | 响应式 3 列 |

### Tab 切换 (Tabs)

两种变体：

**Line 变体**
```
+--------------------------------------------+
|  Tab1    Tab2    Tab3                       |
|  ----                          <- 底部指示线 |
+--------------------------------------------+
```

**Segment 变体**
```
+------------------------------------------+
|  ( Tab1 )  ( Tab2 )  ( Tab3 )            |
|    ^ 金色背景活跃态                         |
+------------------------------------------+
```

| 属性 | 值 | 备注 |
|------|-----|------|
| Line 活跃 | `var(--accent-highlight)` 文字 + 底部 2px 指示线 + glow shadow(0 0 8px rgba(232,208,121,0.8)) | |
| Line 非活跃 | `var(--text-secondary)` hover 变 `var(--text-primary)` | |
| Line 容器 | rgba(255,255,255,0.1) 底边框 | |
| Segment 活跃 | `var(--radius-pill)`, `var(--accent)` 背景 + 黑色粗体文字 | |
| Segment 非活跃 | `var(--radius-pill)`, `var(--text-secondary)` hover 变 `var(--text-primary)` | |
| Segment 容器 | inline-flex p-1 | |
| 字号 | 14px / 500 | |

### 倒计时 (CountDown)

> 支持两种布局：mixed（数字+单位同行）和 divide（数字上、单位下）。

```
+------+   +------+   +------+   +------+
|  02  |   |  18  |   |  35  |   |  42  |
|   D  | : |   H  | : |   M  | : |   S  |
+------+   +------+   +------+   +------+
```

| 属性 | 值 | 备注 |
|------|-----|------|
| Cell 背景 | rgba(255,255,255,0.1) + backdrop-blur-sm | 无边框 |
| Cell 尺寸 | 56x60 (lg/divide) / 58x46 (lg/mixed) | 响应式 |
| Cell 圆角 | `var(--radius-countdown)` | 8px |
| 数字 | 24px / 600 `var(--text-primary)` tabular-nums | |
| 单位 | 12px / 400 `var(--text-countdown-unit)` | D/H/M/S |
| 分隔符 | `:` `var(--text-countdown-sep)` 粗体 | |
| Cell 间距 | 20px (md/lg) / 4px (sm) | 包含分隔符 |

### 区块标题 (Section Header)

> 统一的区块标题模式：居中标题 + 金色下划线分隔条。

```
         VIP 专属任务
        ============
```

| 属性 | 值 | 备注 |
|------|-----|------|
| 容器 | flex flex-col items-center mb-12 | 居中 |
| 标题 | h2 `var(--text-primary)` 粗体 | |
| 分隔条 | w-16 h-1 `var(--accent)` rounded-full | 金色短横线 |

### Tag 标签 (Tag)

> 多语义变体，自动根据 tone + variant 选择配色。

| 类型 | Solid 样式 | Outline 样式 |
|------|-----------|-------------|
| neutral | rgba(255,255,255,0.1) 背景 + `var(--text-secondary)` | rgba(255,255,255,0.2) 边框 + `var(--text-secondary)` |
| brand | `var(--accent)` 背景 + 黑色粗体 | `var(--accent)` 边框 + 文字 |
| success | `var(--success)` 10% 背景 + 文字 | `var(--success)` 边框 + 文字 |
| info | `var(--info)` 背景 + 白色粗体 | `var(--info)` 边框 + 文字 |
| warning | `var(--warning)` 背景 + 黑色粗体 | `var(--warning)` 边框 + 文字 |

| 属性 | 值 | 备注 |
|------|-----|------|
| sm 圆角 | `var(--radius-tag-sm)` | 4px |
| md 圆角 | `var(--radius-tag-md)` | 9999px 胶囊 |
| sm paddingX/Y | 6px / 2px | |
| md paddingX/Y | 12px / 4px | |
| 字号 | 12px / 500 | |

### 活动规则 (Rules)

| 属性 | 值 | 备注 |
|------|-----|------|
| 容器 | 查阅 `contract/rules.md#R10` 卡片圆角 | |
| 背景 | `var(--bg-card)` 50% opacity + backdrop-blur-sm | 半透明 |
| 内边距 | p-8 md:p-12 | |
| 文字 | `var(--text-secondary)` 14px leading-relaxed | space-y-6 行间距 |

### Footer (页脚)

```
+---------------------------------------------------------+
| [G] GateVIP           关于我们   服务支持   社区          |
| 描述文字...           公司简介   帮助中心   官方博客      |
|                       用户协议   提交工单   社区论坛      |
| [社交图标行]          隐私政策   API文档    活动公告      |
+---------------------------------------------------------+
| (c) 2026 Gate.io        Terms | Privacy | Cookie          |
+---------------------------------------------------------+
```

| 属性 | 值 | 备注 |
|------|-----|------|
| 背景 | rgba(0,0,0,0.2) | 深于页面背景 |
| 上边框 | 1px solid rgba(255,255,255,0.05) | |
| 内边距 | pt-16 pb-8 | |
| 栅格 | grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 | |
| Logo 列 | col-span-2 lg:col-span-2 | 描述 + 社交图标 |
| 链接 | `var(--text-secondary)` hover 变 `var(--accent)` | 金色 hover |
| 社交图标 | w-8 h-8 rounded-full rgba(255,255,255,0.05) 背景 + `var(--text-secondary)` | hover 变 `var(--accent)` 背景 + 黑色文字 |
| 版权行 | pt-8 rgba(255,255,255,0.05) 上边框 | `var(--text-disabled)` 小字 |

---

## 区块 6: 适用性 & 自检

### 自检清单

> 基础清单见 `contract/rules.md` 自检清单章节，此处仅列本风格特有检查项。

- [ ] 金色层次正确：`var(--accent)` (#E8D079) 主金色 → `var(--accent-secondary)` (#FBE9AF) 次级 → `var(--accent-light)` (#EDE6D9) 淡金高光，CTA 渐变 `var(--accent-cta-from)` (#EDE6D9) → `var(--accent-cta-to)` (#E8D079)
- [ ] 页面背景 `var(--bg)` (#070808)，主表面 `var(--bg-card)` (#171716)，次级表面 `var(--bg-card-secondary)` (#0A0A0A)，三者不混用
- [ ] Hero 使用水平分割布局（md:grid-cols-2），移动端堆叠
- [ ] 金色渐变文字使用 `bg-clip-text text-transparent` 实现
- [ ] CTA 按钮为胶囊形 `var(--radius-pill)` (9999px)
- [ ] 卡片圆角响应式：`var(--radius-card-lg)` 32px / 24px / 16px (桌面/平板/移动)
- [ ] 进度条/里程碑使用金色渐变填充（#EDE6D9 → #E8D079），非蓝色
- [ ] 装饰光晕使用 `var(--accent-alpha20)` + radial-gradient，不过度
- [ ] 页面所有按钮统一使用渐变 linear-gradient(#EDE6D9, #E8D079)，禁止 outline/ghost/透明按钮
- [ ] VIP 图标使用 `@gate/iconfont`，不使用 emoji（`contract/rules.md#R19`）
- [ ] Tab Line 变体底部指示线带 glow 效果 shadow(0 0 8px rgba(232,208,121,0.8))
- [ ] 倒计时分隔符使用 `:` 字符 + `var(--text-countdown-sep)`，非 SVG
- [ ] 区块标题统一使用"标题 + 金色短横线"模式

### 适用 / 不适用场景

**适用：**
- VIP 专属福利活动
- 节日礼遇（新春 / 周年庆 / 年终盛典）
- VIP 等级权益展示落地页
- 里程碑解锁类活动
- 奖品展示（虚拟 + 实物混合）
- VIP 任务挑战（非排行榜驱动）
- VIP 品牌形象页

**不适用：**
- 以排行榜/竞赛为核心的活动（建议用 competition.md 或 vip-warm-elite.md）
- 多赛季切换 + 分赛区制活动（建议用 vip-warm-elite.md）
- 轻量空投 / 新手任务活动（建议用 default.md）
- IEO / Launchpad 类活动（需单独风格）
- 邀请返佣 / Referral 类活动（需单独风格）
- 需要大量数据表格的高密度信息页（建议用 vip-warm-elite.md）
