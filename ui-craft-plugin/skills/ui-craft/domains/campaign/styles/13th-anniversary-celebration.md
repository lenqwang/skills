# Style — 13th Anniversary Celebration

---

## 区块 1: 元信息头

```yaml
name: 13th-anniversary-celebration
description: Gate.io 13 周年庆「早鸟登舱」活动页风格，深邃海军蓝底色搭配电光蓝品牌色，航空登机主题
source_urls:
  - sources/gate13-early-boarding.html
extracted_at: 2026-03-05
calibrated_at: 2026-03-08
```

---

## 区块 2: 风格特征

- **视觉情绪**：纯黑底 + 白色为主体文字，极简克制、高端科技感；蓝色仅用作关键点缀
- **核心组件**：Banner（居中排版 + 飞机图标进度条）、登舱机票（统一卡片 + 内部展开/收起详情 + SeatMap）、答题全屏 Overlay、World Tour 站点任务（StepGrid 导航+进度卡片 + 桌面 Dashboard + 移动端 Accordion）、机票翻转抽奖（含抽奖记录弹窗 LotteryRecords）、时间胶囊环形图、留言瀑布流、增强登录弹窗（邮箱/手机/二维码 Tab + 社交登录）
- **强调方式**：蓝色仅限 CTA 按钮背景渐变 + 进度条填充，蓝色明度梯度区分 4 个舱位等级 badge（亮蓝→主蓝→半透蓝→灰蓝），飞机 SVG 图标作为站点进度标记；所有数据文字/标题/选中态使用白色系；倒计时使用 JetBrains Mono 等宽字体，无天/时/分/秒中文标签
- **适用标签**：`周年庆` `航空登舱` `活动大促` `纯黑白+蓝点缀` `暗色科技`

---

## 区块 3: 决策原则覆盖表

| 维度 | 本风格倾向 | 默认契约倾向 | 说明 |
|------|-----------|-------------|------|
| 简洁 vs 丰富 | 丰富 | 简洁 | 多模块纵深页面，信息量大但层次分明 |
| 对称 vs 不对称 | 同默认 | 对称 | 卡片网格对称，Banner 左文右图不对称 |
| 强调 vs 克制 | 克制 | 克制 | CTA 蓝色渐变为唯一强调，其余白/灰中性 |
| 装饰 vs 功能 | 平衡 | 功能 | 机票拟物装饰强，但服务于功能（状态展示） |
| 留白 vs 填充 | 填充 | 留白 | 模块间距适中但内容密度高 |
| 对比 vs 和谐 | 对比 | 和谐 | 纯黑底 + 白色文字 + 蓝色CTA 三层对比 |
| 色温 | 冷中性 | 中性 | 纯黑 + 中性灰(#A0A3A7) + 蓝色仅限点缀 |

---

## 区块 4: Token 覆盖

### 4.1 颜色策略表

> 标注 `⬆ 覆盖` 表示对 semantic.md 标准值的风格覆盖；标注 `✦ 扩展` 表示本风格新增的自定义 Token。

| 用途 | Token/类 | 色值 hex | 说明 |
|------|----------|----------|------|
| 页面主背景 | `surface.background` | #000000 | ⬆ 覆盖：纯黑（标准 #070808），最高级感 |
| 卡片主背景 | `surface.default` | #06091A | ⬆ 覆盖：极深蓝黑（标准 #1F2023），微弱蓝调 |
| 卡片深色变体 | `surface.darker` | #030510 | ✦ 扩展：嵌套内卡片/表单控件背景 |
| 主品牌蓝 | `accent.brand` | #1E40FF | ⬆ 覆盖：电光蓝（标准 #0055FF），**仅限 CTA 渐变起点 + 进度条** |
| 浅品牌蓝 | `accent.brand.light` | #3B6BFF | ✦ 扩展：**仅限 CTA 渐变终点 + 进度条**，不用于文字 |
| 舱位：First | `tier.first` | #3B6BFF | ✦ 扩展：亮蓝，仅用于 badge 边框/背景 |
| 舱位：Business | `tier.business` | #1E40FF | ✦ 扩展：主蓝，仅用于 badge 边框/背景 |
| 舱位：Priority | `tier.priority` | rgba(30,64,255,0.55) | ✦ 扩展：半透蓝，仅用于 badge |
| 舱位：General | `tier.general` | #3A4560 | ✦ 扩展：灰蓝，仅用于 badge |
| 状态成功 | `status.success` | #50A907 | 同标准（R3） |
| 状态错误 | `status.error` | #E54545 | 同标准（R3） |
| 主文字 | `text.primary` | #FFFFFF | ⬆ 覆盖：纯白（标准 #FAFAFA） |
| 次级文字 | `text.secondary` | #A0A3A7 | 同标准 gray.400 |
| 禁用文字 | `text.disabled` | rgba(160,163,167,0.4) | ⬆ 覆盖：次级灰 40% 透明度（标准 #484B51），用于锁定站点 |
| 边框基础 | `surface.border` | rgba(255,255,255,0.06) | ⬆ 覆盖：白色微透明（标准 #303236），卡片/分割线 |
| 边框选中 | `surface.border.active` | rgba(255,255,255,0.15-0.30) | ✦ 扩展：选中态白色边框（替代蓝色） |

### 4.2 渐变系统表

| 用途 | CSS 值 | Tailwind 类 | 说明 |
|------|--------|-------------|------|
| CTA 按钮 | `linear-gradient(90deg, #1E40FF, #3B6BFF)` | `bg-[linear-gradient(90deg,#1E40FF,#3B6BFF)]` | 水平渐变，左深右浅 |
| 标题亮文 | `linear-gradient(90deg, #fff, rgba(255,255,255,0.6))` | `bg-[linear-gradient(90deg,#fff,rgba(255,255,255,0.6))]` + `bg-clip-text text-transparent` | 白色渐变文字 |
| Banner 辉光 | `radial-gradient(ellipse 80% 70% at 50% 40%, rgba(30,64,255,0.2), transparent 60%)` | `bg-[radial-gradient(...)]`（任意值语法） | 中心扩散辉光 |
| 顶栏色条 | `linear-gradient(90deg, var(--tier-color), transparent)` | `bg-[linear-gradient(90deg,var(--tier-color),transparent)]` | 机票舱位色条 |
| 站点进度线 | `linear-gradient(90deg, rgba(255,255,255,0.25), rgba(255,255,255,0.06))` | `bg-[linear-gradient(90deg,...)]`（任意值语法） | 白色渐变连接线 |
| 节标题竖条 | — | `bg-white/25` | 白色 25% 透明度 |

### 4.3 排版覆盖表

| Token | 覆盖值 | 原值 (semantic.md) | 说明 |
|-------|--------|------|------|
| Banner 主标题 (H1) | clamp(32px,6vw,60px) / 700 weight | `display.large.campaign` (60px/600) | `clamp()` 流式自适应字号，max-w-[18ch] 自然换行，去掉硬编码 `<br>` |
| Banner 副标题 | clamp(14px,2vw,16px) / 400 | `body.medium` (16px/400) | 配合主标题等比缩放，max-w-[36ch] |
| 节标题 (H2) | 32px / 600 weight | `headline.medium` (32px/600) | 对齐标准 H2 层级（R10），字重回到标准 semibold |
| 子节标题 (H3) | 24px / 600 weight | `title.medium` (24px/600) | 对齐标准 H3 层级（R10） |
| 正文 | 16px / 400 | `body.medium` (16px/400) | R10 Body 最小值 16px |
| 倒计时数字 | 48px / 600 JetBrains Mono | `display.medium` (48px/600) | **Google Fonts 引入 JetBrains Mono**（wght 500;600;700），全局 `.font-mono` 覆盖为 JetBrains Mono，无天/时/分/秒标签，冒号与数字框水平居中 |
| 机票编号 | 32px lg:36px / 700 JetBrains Mono | — | 编号增大为视觉焦点，右侧随机条码装饰 |
| 机票字段标签 | 10px / uppercase / 0.1-0.22em letter-spacing | `body.xxsmall` (10px/400) | 航空机票风格全大写 |
| 眉标 | 11px / uppercase / 0.18em letter-spacing | — | Banner 顶部标签（介于 xxsmall 和 xsmall 之间） |

### 4.3.1 多语言换行策略

| 层级 | CSS 规则 | 说明 |
|------|---------|------|
| 全局兜底 | `body { overflow-wrap: break-word; word-break: break-word }` | 防止任何文本溢出 |
| 英文适配 | `:lang(en) { word-break: normal; hyphens: auto }` | 英文启用自动连字符 |
| 日韩适配 | `:lang(ja),:lang(ko) { word-break: keep-all }` | 日韩不在词中间断行 |
| Banner 标题 | `clamp()` + `max-w-[18ch]` 自然换行 | 去掉硬编码 `<br>`，各语言自动适配 |
| 新闻标题 | `line-clamp-2` + `break-words`，纵向堆叠布局 | 标题全宽，日期独立行 |
| 留言内容 | `break-words` | 防止长单词溢出 |

### 4.4 圆角偏好表（5 级体系，最大 16px）

> 本风格最大圆角不超过 16px，大圆角（32px）在深色科技风格中显得不够高端克制。

| 层级 | 偏好值 | Tailwind 类 | 适用组件 | 说明 |
|------|--------|-------------|---------|------|
| L1 | 16px | `rounded-2xl` | Modal 弹窗、新闻/视频主卡片 | 最大圆角，高端克制 |
| L2 | 12px | `rounded-xl` | 机票卡片、Toast、内嵌卡片、任务行、留言卡片 | 中等圆角 |
| L3 | 8px | `rounded-lg` | 倒计时块、站点按钮、Tab 容器 | 控件级圆角 |
| L4 | 6px | `rounded-md` | 输入框、微标签（HOT、reward、YOUR CABIN） | 小圆角 |
| L5 | pill | `rounded-full` | CTA 按钮、Badge、进度条、圆形头像 | 胶囊形 |

### 4.5 间距偏好

| 层级 | 值 | Token / Tailwind | 说明 |
|------|-----|-----------------|------|
| 模块间距 | 80px | `space.page` / `py-20` | page-body 内模块 gap |
| 子区块间距 | 32px | `space.xl` / `gap-8` | 子区块分隔 |
| 卡片内边距 | 16-24px | `space.md`~`space.lg` / `p-4`~`p-6` | 根据信息量调整 |
| 步骤网格 gap | 12px | `gap-3` | 4 列步骤卡片间距 |

---

## 区块 5: 布局结构

### 5.1 页面流

```
[Banner — 全宽居中主视觉区]
  ├── 居中排版：眉标 + 主标题 + 副标题
  ├── 站点进度条（5 站，飞机 SVG 图标作 marker）
  │     active=白色高亮+辉光, upcoming=灰色, locked=灰色/40%
  ├── 倒计时
  └── CTA（未登舱状态）
    |
[GATE 13 站点最新资讯]
  ├── 视频/图片轮播（w-full lg:w-2/3）
  └── 新闻列表（w-full lg:w-1/3，纵向堆叠，HOT=红色左边框，标题 line-clamp-2）
    |
[我的登舱机票]
  └── 统一大卡片（桌面端/移动端交互一致）
      ├── 机票正面信息（Boarding No./航线/日期/站点/胶囊进度）
      ├── 底部栏：NOW BOARDING · 2026 + "登机详情 ∨" 展开按钮
      └── 展开区域：登机进度 + SeatMap 舱位分布图
    |
[World Tour 站点任务 — 响应式双布局]
  ├── 桌面端 (lg+)：Dashboard 左右分栏
  │   ├── 左侧边栏 (w-60, sticky)
  │   │   └── 站点列表（5 站纵向按钮）
  │   └── 右侧主区域 (flex-1)
  │       ├── Banner 信息条
  │       ├── StepGrid 导航卡片（4 列，兼任导航+进度展示，无独立 Tab 条）
  │       │   每张卡片：STEP 标签 + 标题 + 描述 + 进度数据（底部虚线分隔）
  │       └── Step 面板容器（固定高度=时间胶囊面板高度，overflow-y-auto）
  │           ├── STEP 1: 登舱答题（排名/用时/舱位 + 再次答题 CTA）
  │           ├── STEP 2: 完成行为任务（任务列表，超长可滚动）
  │           ├── STEP 3: 限量抽奖（滚动中奖 + 机票翻转 + 奖品列表 + 抽奖记录入口）
  │           └── BONUS: 时间胶囊（环形布局 + 解锁提示卡）
  ├── 移动端 (<lg)：Accordion 手风琴
  │   ├── 水平站点 Tab 滚动条
  │   ├── 概览卡片
  │   └── 4 步手风琴（展开/折叠，可多开）
  └── 其他站点（锁定/预览占位）
    |
[登机留言板]
  ├── 用户留言 / 历史精选 Tab
  ├── 发布留言区
  └── 瀑布流留言卡片
    |
[注意事项]
  └── 有序规则列表
```

### 5.2 栅格偏好

> 遵循 `contract/rules.md#R14` 标准断点：手机 <768px / 平板 768-1247px / 桌面 ≥1248px。

| 模块 | 桌面(≥1248px) | 平板(768-1247px) | 手机(<768px) | 说明 |
|------|---------|---------|---------|------|
| StepGrid | 4 列 | 2 列 | 2 列 | `grid-cols-2 lg:grid-cols-4` |
| World Tour 桌面 | 侧边栏(w-60) + 主内容(flex-1) | — | — | flex, lg+ |
| World Tour 移动 | — | 水平Tab + 手风琴 | 水平Tab + 手风琴 | flex-col, <lg |
| Step 面板 | 固定高度(=胶囊面板高度) | 手风琴展开（自然高度） | 手风琴展开（自然高度） | overflow-y-auto |
| 留言瀑布流 | 3 列 | 2 列 | 1 列 | CSS columns |
| 抽奖区 | 左右双列 | 上下堆叠 | 上下堆叠 | flex → column |

### 5.3 响应式策略

> 对齐 `semantic.md` 标准断点（`breakpoint.sm`: 768px / `breakpoint.lg`: 1248px），移动端优先。

| 断点 | 别名 | 行为 | 说明 |
|------|------|------|------|
| <768px | 手机 | Banner 标题 32px；World Tour 手风琴；留言 1 列；StepGrid 2×2；抽奖单列；页面 min-w 320px | 默认（移动端优先） |
| 768-1247px | 平板 | Banner 标题 48px；留言 2 列；StepGrid 2×2；页面最大宽度 960px | Tailwind `md:` |
| ≥1248px | 桌面 | 完整 Dashboard 布局：左侧站点列表 sticky + 右侧 StepGrid(4列导航+进度) + 面板；面板固定高度不跳动；抽奖双列；留言 3 列 | Tailwind `lg:` |

---

## 区块 6: 组件变体

> **R16/R17 图标规范**：本风格所有图标必须使用 `@gate/iconfont` 或项目自定义 SVG 图标组件，**禁止使用 emoji 作为功能性图标**。以下 ASCII 示意图中出现的 emoji 仅用于文档可读性，代码生成时必须替换。
>
> **图标替换映射**：
> | 文档中 emoji | 代码实现 | 来源 |
> |-------------|---------|------|
> | ✈️ 飞机 | 自定义 `PlaneIcon` SVG 组件 (`viewBox="0 0 24 24"`) | 项目自定义 |
> | 🔒 锁定 | `GateUIIconA16PxSuo` 或类似 | `@gate/iconfont` |
> | 👍 点赞 | `GateUIIconA32PxDianzan` / `GateUIIconA32PxDianzanFill` | `@gate/iconfont` |
> | ✕ 关闭 | `GateUIIconA16PxGuanbi` | `@gate/iconfont` |
> | ⏱ 计时 | `GateUIIconA16PxShijian` | `@gate/iconfont` |
> | 🎫 空状态 | `@gate/iconfont` 对应空状态图标 | `@gate/iconfont` |
> | 时间胶囊 13 项 | 每项使用 `@gate/iconfont` 或自定义 SVG | 按实际含义选用 |
> | 🇯🇵🇫🇷🇭🇰🇦🇪🇺🇸 国旗 | 国旗 SVG 图标组件或 CDN 国旗图片 | 项目自定义 |

### 卡片层次说明（R21 活动页卡片交替）

> 本风格基于深色主题，使用以下层次替代标准黑卡/白卡/蓝卡交替：

| 层次 | 背景色 | 边框 | 用途 |
|------|--------|------|------|
| 外层卡片（黑卡） | #000000 / `surface.background` | rgba(255,255,255,0.1) | 页面级区块容器（规则描述、大模块） |
| 中层卡片（深蓝黑） | #06091A / `surface.default` | rgba(255,255,255,0.06) | 内容卡片（任务列表、奖品面板、留言） |
| 内嵌卡片（最深） | #030510 / `surface.darker` | rgba(255,255,255,0.06) | 表单/数据展示（SeatMap、统计、输入框） |
| 蓝色强调 | `accent.brand` 渐变 | — | 仅 CTA 按钮和进度条 |

### 倒计时 (Countdown)

```
  ┌──┐   ┌──┐   ┌──┐   ┌──┐
  │05│ : │12│ : │34│ : │56│
  └──┘   └──┘   └──┘   └──┘
```

| 属性 | 值 | 备注 |
|------|-----|------|
| 字体 | JetBrains Mono (Google Fonts, wght 500;600;700) | 全局 `.font-mono` 覆盖统一所有 monospace |
| 数字块 | bg-white/[.06] border border-white/[.08] rounded-lg p-2 sm:p-3 | L3 圆角(8px) |
| 数字字号 | text-3xl sm:text-5xl font-semibold | 移动端 30px / 桌面端 48px |
| 冒号 | text-2xl sm:text-3xl text-white/30 font-light | 与数字块水平居中对齐，使用 `items-center` |
| 标签 | **无** — 去掉天/时/分/秒中文标签 | 纯数字+冒号，更国际化 |

### 新闻资讯列表 (News List)

```
桌面端/移动端（统一纵向堆叠）：
┌─────────────────────────────────┐
│ ▎ 新闻标题文本（最多两行显示）   │
│   2026-03-05                    │
├─────────────────────────────────┤
│ ▎ 另一条新闻标题（热门用红色左边框）│
│   2026-03-04                    │
└─────────────────────────────────┘
```

| 属性 | 值 | 备注 |
|------|-----|------|
| 布局 | 纵向堆叠：标题全宽 + 日期独立行 | `flex flex-col gap-1` |
| 标题 | `text-[14px] text-white line-clamp-2 break-words` | 最多两行，多语言友好 |
| 日期 | `text-[11px] text-txt-s` 独立行 | 不与标题同行 |
| HOT 指示器 | `border-l-[3px] border-l-st-err`（红色左边框） | 零宽度占用，不挤压标题空间 |
| 非 HOT | `border-l-[3px] border-l-transparent` | 保持对齐 |
| 容器宽度 | 移动端/桌面端均 `w-full` | 确保 `flex-col` 下正确堆叠 |

### Banner 站点进度条 (Banner Station Progress)

```
  [plane] Tokyo ── [plane] Paris ── [lock] HK ── [lock] Dubai ── [lock] Miami
  (active/蓝辉光)   (upcoming/灰)     (locked/灰)  (locked/灰)    (locked/灰)
```

| 属性 | 值 | 备注 |
|------|-----|------|
| 排版 | 居中 (`items-center text-center`) | Banner 内容全部居中 |
| Marker 图标 | 自定义 `PlaneIcon` SVG `viewBox="0 0 24 24"` | **禁止 emoji**，使用 SVG 组件（R16） |
| active 状态 | fill=品牌蓝, `drop-shadow(0 0 6px)` 辉光, 文字白色 font-medium | 当前站点 |
| upcoming 状态 | fill=亮蓝, 文字灰色 | 即将开启 |
| locked 状态 | `GateUIIconA16PxSuo` 或 PlaneIcon fill=`#334155`, 无辉光, 站名灰色/40% | 锁定站点（R17） |
| 连接线 | 已完成=白色 25% opacity, 未完成=白色 6% opacity | flex-1 h-0.5 |

### World Tour 站点任务 (Desktop Dashboard + Mobile Accordion)

**桌面端 — Dashboard A 方案**:
```
┌─────────────┬──────────────────────────────────────┐
│ 🇯🇵 日本站  │  🇯🇵 早鸟登舱确认计划   日本站 · 进行中  │
│ 🇫🇷 巴黎站  │  获取你的 Gate 13 登舱权益              │
│ 🇭🇰 香港站  ├──────────────────────────────────────┤
│ 🇦🇪 迪拜站  │ ┌─STEP 1──┬─STEP 2──┬─STEP 3──┬─BONUS──┐ │
│ 🇺🇸 迈阿密站 │ │登舱答题  │行为任务  │限量抽奖  │时间胶囊 │ │
│             │ │描述...   │描述...   │描述...   │描述... │ │
│             │ │#5·42.3s │5/8 完成 │剩余3次  │5/13收集│ │
│             │ └─────────┴─────────┴─────────┴────────┘ │
│             ├──────────────────────────────────────┤
│             │   Step 面板内容（固定高度容器）          │
│             │   overflow-y: auto                   │
└─────────────┴──────────────────────────────────────┘
```

**移动端 — Accordion C 方案**:
```
[ 🇯🇵 日本站 ] [ 🇫🇷 巴黎站 ] [ 🇭🇰 ... ]  ← 水平滚动 Tab

┌── 概览卡片 ──────────────────────┐
│  排名 #5   用时 42.3s   舱位 Business  │
└──────────────────────────────────┘

▼ STEP 1  登舱答题  ✓ 已完成
  [展开内容...]
▼ STEP 2  完成行为任务  ● 进行中
  [展开内容...]
▶ STEP 3  限量抽奖
▶ BONUS   时间胶囊
```

| 属性 | 值 | 备注 |
|------|-----|------|
| 侧边栏宽度 | w-60 (240px) | sticky top-6, shrink-0 |
| Step 面板高度策略 | 固定高度 = 时间胶囊面板自然高度 (动态测量) | 防止 CLS 跳动（切换 Step 时下方内容不位移） |
| 面板滚动 | `overflow-y: auto; scrollbar-width: thin` | 任务列表过长时内部滚动 |
| StepGrid 导航 | 4 列卡片兼任导航+进度展示，取代独立 Tab 条 | 选中卡片有彩色描边+辉光 |
| 手风琴交互 | 可多开，展开/折叠无固定高度约束 | 移动端自然推开下方内容 |
| 站点切换 | 桌面纵向按钮列表 / 移动水平滚动Tab | active=白色背景/边框/文字（非蓝色） |
| 站点悬停 | `hover:bg-white/[.06]` + `hover:text-white/80` | 非选中站点悬停反馈 |
| 站点焦点 | `focus-visible:ring-2 focus-visible:ring-[#1E40FF]` | R23 键盘焦点 |

### 登舱机票 (Boarding Ticket)

**正面卡片（桌面端/移动端共用）：**
```
┌─ 色条 ──────────────────────────────────────┐
│ Boarding Pass · GATE 13     [Badge 舱位]     │
│ GT13-000128  ← 大号编号(28px)，视觉焦点      │
│ CryptoFan_2026 · 商务舱                      │
├──────────────────────────────────────────────┤
│  FROM  ──────── ✈ ────────  TO               │
│  GATE                       JAPAN            │
├──────────────────────────────────────────────┤
│  Date          Station       Capsule         │
│  2026-03-01    日本站·Day3   ████░░ 5/13     │
├── ── ── ── ── ── ── ── ── ── ── ── ── ── ──┤
│  NOW BOARDING · 2026                         │
└──────────────────────────────────────────────┘
```

**桌面端+移动端（统一交互：卡片内展开/收起）：**
```
┌─ 色条 ──────────────────────────────────────┐
│ Boarding Pass · GATE 13     [Badge 舱位]     │
│ GT13-000128                                  │
│ CryptoFan_2026 · 商务舱                      │
│ FROM ──── ✈ ──── TO JAPAN                    │
│ Date / Station / Capsule 进度                │
├── ── ── ── ── ── ── ── ── ── ── ── ── ── ──┤
│ NOW BOARDING · 2026         登机详情 ∨       │  ← 点击展开
├──────────────────────────────────────────────┤
│ 登机详情                                      │  ← 展开区域
│ 进度 ████████░░░░ 30%                        │
│ 舱位分布 · SeatMap                            │
└──────────────────────────────────────────────┘
```

| 属性 | 值 | 备注 |
|------|-----|------|
| 交互方式 | 卡片内展开/收起 (max-height: 800px 过渡 300ms) | 桌面端和移动端统一 |
| 卡片结构 | 单一大卡片，三块内容无独立描边 | 色条(h-1.5)+正面+展开详情一体化 |
| 卡片圆角 | `rounded-xl` (12px) | L2 级别（从 32px 降低至 12px） |
| 展开按钮 | 右下角文字链接 "登机详情 ∨" / "收起详情 ∧"，`hover:text-white` + `hover:underline` | 轻量风格，悬停高亮 |
| 边框色 | 舱位蓝色梯度 | First=亮蓝, Business=主蓝, Priority=半透蓝, General=灰蓝 |
| 字体风格 | JetBrains Mono (monospace) | 航空机票拟物，通过全局 .font-mono 覆盖 |
| 视觉焦点 | Boarding No. 32-36px 加粗白色 JetBrains Mono | 最醒目的元素（增大字号） |
| 信息精简 | 舱位仅在右上角 badge 显示 1 次 | 去除重复 |
| 底部信息 | 3 列 grid (Date / Station / Capsule进度条) | 替代纵向罗列 |
| 详情内容 | 登机进度 + SeatMap 横向航班选座图 | 展开后在卡片内部渲染 |
| SeatMap 样式 | 横向航班选座网格（4 舱位左到右排列，每舱上下分区+过道） | 见「SeatMap 舱位分布图」组件 |
| 装饰：撕裂线 | CSS 伪元素 `::before`/`::after` 圆形缺口 (14×14px) 定位在展开分割线位置 | 模拟航空登机牌撕裂口 |
| 装饰：条码 | 随机宽度白色竖条(opacity 15%)，高 24px，位于编号右侧 | 模拟航空条码扫描区 |

### 答题全屏界面 (Quiz Overlay)

```
┌──────────── 进度条 ──────────────────────────┐
│ 第 X / 10 题          [TimeIcon] 00:00.0 [CloseIcon] │
├──────────────────────────────────────────────┤
│                                              │
│   Early Boarding · 登舱答题                   │
│                                              │
│   题目文本？                                  │
│                                              │
│   ┌─────────────────────────────────┐       │
│   │ [A]  选项一                      │       │
│   ├─────────────────────────────────┤       │
│   │ [B]  选项二                      │       │
│   ├─────────────────────────────────┤       │
│   │ [C]  选项三                      │       │
│   ├─────────────────────────────────┤       │
│   │ [D]  选项四                      │       │
│   └─────────────────────────────────┘       │
│   答错即终止，请仔细思考后作答                  │
│                                              │
└──────────────────────────────────────────────┘
```

| 属性 | 值 | 备注 |
|------|-----|------|
| 层级 | z-index: 55 | 覆盖整个页面 |
| 选项默认 | `surface.default` 背景 + `surface.border` 边框 | 未作答状态 |
| 选项悬停 | `hover:border-white/20` + `hover:bg-white/[.04]` | 鼠标移入提示可交互 |
| 选项焦点 | `focus-visible:ring-2 focus-visible:ring-[#1E40FF]` | R23 键盘焦点 |
| 选项反馈 | correct=`status.success`(#50A907) 边框+背景, wrong=`status.error`(#E54545) 边框+背景, dimmed=暗化 | 使用标准状态色（R3） |
| 计时图标 | `GateUIIconA16PxShijian` | R17：使用 @gate/iconfont |
| 关闭按钮 | `GateUIIconA16PxGuanbi` | R17：使用 @gate/iconfont |
| 计时精度 | 0.1 秒 | monospace 字体 |
| 容错 | 答错即终止 → 显示失败界面 → 2.4s 后弹结果弹窗 | |

### 机票翻转抽奖 (Lottery Ticket)

```
正面                          背面（抽奖中）
┌──────────────────┐         ┌──────────────────┐
│ GATE.COM LUCKY   │         │                  │
│ DRAW             │         │   [PlaneIcon]    │
│ GT13-000128      │         │    (旋转动画)     │
│ [Badge]          │         │                  │
│ ── ── ── ── ──  │         │                  │
│ 点击下方按钮翻转   │         │                  │
└──────────────────┘         └──────────────────┘
```

| 属性 | 值 | 备注 |
|------|-----|------|
| 尺寸 | 340×190px | 横向机票比例 |
| 翻转动画 | rotateY(180deg) 0.7s | perspective: 1000px |
| 旋转飞机 | rotate 0.5s linear infinite | 抽奖中背面动画 |

### 时间胶囊 (Capsule Orbit)

```
            [icon-1]
        [icon-2]   [icon-3]
      [icon-4]       [icon-5]
    [icon-6]  ┌───┐  [icon-7]
    [icon-8]  │5/13│  [icon-9]
      [icon-10] └───┘ [icon-11]
        [icon-12]  [icon-13]
```

> 13 项图标必须使用 `@gate/iconfont` 或自定义 SVG 图标组件（R16/R17），禁止 emoji。

| 属性 | 值 | 备注 |
|------|-----|------|
| 布局 | 360×360px 环形 | 13 项均匀分布 |
| 中心 | 64px 圆形白色半透明背景 + 白色边框 | 显示 X/13 进度 |
| 已解锁 | 白色边框(rgba(255,255,255,0.15)) + `hover:scale-[1.15]` + `hover:border-white/30` | 可点击查看详情 |
| 已解锁焦点 | `focus-visible:ring-2 focus-visible:ring-[#1E40FF]` | R23 键盘焦点 |
| 未解锁 | 暗色 + opacity 0.4 + `GateUIIconA16PxSuo` 锁图标 | 不可交互（R17） |

### StepGrid 导航+进度卡片

```
┌──────────────┬──────────────┬──────────────┬──────────────┐
│ STEP 1  ✓完成│ STEP 2       │ STEP 3       │ BONUS        │
│ 登舱答题     │ 完成行为任务  │ 限量抽奖      │ 时间胶囊      │
│ 答对全部题目  │ 关注社交媒体  │ 抽取头等舱    │ 收集 13 件    │
│ 获取登舱机票  │ 邀请好友...   │ 黄金机票...   │ iWeb3 时代... │
│ ─ ─ ─ ─ ─ ─│ ─ ─ ─ ─ ─ ─ │ ─ ─ ─ ─ ─ ─ │ ─ ─ ─ ─ ─ ─ │
│ #5 · 42.3s  │ 5/8 完成      │ 剩余 3 次    │ 5/13 收集     │
└──────────────┴──────────────┴──────────────┴──────────────┘
```

| 属性 | 值 | 备注 |
|------|-----|------|
| 布局 | `grid grid-cols-2 lg:grid-cols-4 gap-3` | 移动 2×2, 桌面 1×4 |
| 双重职责 | 导航（点击切换面板） + 进度仪表板 | 取代了独立的 Step Tab 条 |
| 卡片内容 | STEP 标签 + 标题 + 描述文案 + 虚线分隔 + 进度数据 | 无 emoji 图标、无引导按钮 |
| 悬停态 | `hover:border-white/15` + `hover:bg-white/[.02]` | 鼠标悬停反馈 |
| 焦点态 | `focus-visible:ring-2 focus-visible:ring-[#1E40FF]` | R23 键盘焦点 |
| 选中态 | 色描边(1.5px, 60%透明) + 微光阴影 + 白色背景/[.04], 数据文字白色 | 区分活跃卡片 |
| 完成标记 | 右上角 "✓ 完成" pill badge (bg-st-ok/15) | 已完成步骤 |
| 步骤颜色 | STEP 1/BONUS=亮蓝, STEP 2/3=主蓝 | 统一蓝色系 |
| 卡片等高 | `flex flex-col` + 描述区 `flex-1` | 4 张卡片等高对齐 |
| 点击行为 | 切换下方 Step 面板 | `switchStep(n)` |

### SeatMap 舱位分布图（航班选座风格）

```
桌面端：
   First(3)  Business(8)  Priority(12)  General(20)
   ┌───────┐ ┌──────────┐ ┌───────────┐ ┌──────────────┐
   │ □ □ □ │ │ □ □ □ □… │ │ □ □ □ □…  │ │ □ □ □ □ □ □… │
   │ (aisle)│ │ (aisle)  │ │ (aisle)   │ │ (aisle)      │
   │ □ □ □ │ │ □ □ □ □… │ │ □ □ □ □…  │ │ □ □ □ □ □ □… │
   └───────┘ └──────────┘ └───────────┘ └──────────────┘
   ← seatmap-scroll 可横向滚动 →

移动端（缩写）：
   F(3)  B(8)  P(12)  G(20)
   ┌───┐ ┌────┐ ┌─────┐ ┌──────┐
   │□□□│ │□□□…│ │□□□… │ │□□□□… │
   │   │ │    │ │     │ │      │
   │□□□│ │□□□…│ │□□□… │ │□□□□… │
   └───┘ └────┘ └─────┘ └──────┘
```

| 属性 | 值 | 备注 |
|------|-----|------|
| 位置 | 机票展开详情区，进度条下方 | |
| 布局 | 横向航班选座网格，4 个舱位区从左到右排列 | `seatmap-scroll` 容器可水平滚动 |
| 每舱结构 | 上半区座位 + 过道(aisle) + 下半区座位 | 每列=一排座位 |
| 座位尺寸 | 移动端 14×14px / 桌面端 18×18px | `.seat` 响应式 |
| 座位状态 | `seat-available`(白/8%) / `seat-occupied`(白/3%) / `seat-mine`(tier-color 描边+背景) | 使用 CSS 变量 `--tier-color` |
| 舱位名称 | 桌面端全名(First/Business...) / 移动端缩写(F/B/P/G) | `hidden md:inline` / `md:hidden` |
| 图例 | 空位 / 已占 / 你的座位 | 移动端 text-[8px]，桌面端 text-[9px] |
| 过道间距 | 移动端 height:6px / 桌面端 height:10px | `.seat-aisle-h` |
| 装饰细节 | 座位圆角 top-3px bottom-1px 模拟椅背形状 | `border-radius: 3px 3px 1px 1px` |
| 当前舱位 | `seat-mine` 使用舱位对应颜色描边+背景高亮 | 随机分布在所属舱区内 |

### 抽奖记录 LotteryRecords

| 属性 | 值 | 备注 |
|------|-----|------|
| 入口 | 抽奖面板顶部「抽奖记录」文字按钮 | 显示记录数 |
| 弹窗 | 标准 Modal (max-w-520px, z-60) | ESC/遮罩可关闭 |
| 记录样式 | 竖向列表，每条显示奖品名+颜色标识+时间 | 倒序排列 |
| 空状态 | `@gate/iconfont` 空状态图标 + "暂无抽奖记录" | R16：禁止 emoji |

### 登录弹窗（增强版）

```
┌────────────────────────┐
│ 登录            ⇒ 注册  │
├────────────────────────┤
│ [邮箱] [手机] [二维码]   │   ← Tab 切换
├────────────────────────┤
│ 邮箱: 邮箱 + 密码       │
│ 手机: 区号 + 号码 + 验证码│
│ 二维码: App 扫码二维码   │
│         [登录按钮]       │
├────────────────────────┤
│ ──── 或使用其他方式 ──── │
│ 使用通行密钥登录         │
│ [Google] [Apple] [TG]  │
└────────────────────────┘
```

| 属性 | 值 | 备注 |
|------|-----|------|
| 弹窗规格 | 圆角 `rounded-2xl`(16px, L1级), 内边距 `space.xl`(32px) | L1 最大圆角 |
| 输入框规格 | 遵循 `component.md` Input Token：圆角 `radius.input`(6px), 高度 40px, 聚焦边框 `action.primary` | 标准 Input 组件 |
| 关闭按钮 | `GateUIIconA16PxGuanbi` size={16} | R17：使用 @gate/iconfont |
| Tab 切换 | `S.loginTab`: email / phone / qrcode | 3 种登录方式 |
| 手机登录 | 区号选择 + 输入框 + 验证码 | 支持 +86/+1/+81/+44/+82 |
| 二维码登录 | QR 码占位 + Gate.io App 扫码提示 | |
| 社交登录 | Google + Apple + Telegram | `GateUIIconA20PxFillTelegram` 等 @gate/iconfont 图标（R17） |

### CTA 按钮规格（活动页变体）

> 基于 `component.md` 活动页 CTA 按钮 Token，**保留蓝色渐变**作为本风格覆盖。

| 属性 | 本风格值 | component.md 标准 | 说明 |
|------|---------|------------------|------|
| 背景色 | `linear-gradient(90deg, #1E40FF, #3B6BFF)` | 白底黑字 | **风格覆盖**：保留蓝色渐变 |
| 文字色 | `#FFFFFF` | `#000000` | 配合蓝色背景 |
| 圆角 | `radius.pill` (9999px) | `radius.pill` (9999px) | L5 胶囊形（CTA 使用 pill 圆角） |
| 高度 | 48px (标准) / 56px (Banner) | 48px / 56px | 对齐标准 |
| 最小宽度 | 120px (内联) / 320px (全宽) | 120px / 320px | 对齐标准 |
| 字体 | 14px / 600 (semibold) | `button.large.campaign` (18px/600) | ⬆ 覆盖：使用 `button.small`(14px) 档位，密集布局 |
| 悬停 | `hover:-translate-y-0.5` + shadow | — | 微上浮效果 |
| 焦点 | `focus-visible:ring-2 focus-visible:ring-[#1E40FF]` | — | R23：必须有焦点状态 |
| 禁用 | `opacity-50 cursor-not-allowed` | — | 无次数/未登录时禁用 |

### 数据埋点体系

| 事件名 | 触发时机 | 参数 |
|--------|---------|------|
| `page_view` | 页面加载 | station, userState |
| `banner_click` | Banner CTA 点击 | cta |
| `news_click` | 新闻列表点击 | id, title |
| `ticket_flip` | 机票翻转 | side |
| `quiz_start` | 开始答题 | attempt |
| `quiz_answer` | 每题回答 | q, correct |
| `quiz_complete` | 答题完成 | time, rank, passed |
| `task_click` | 任务"去完成"点击 | task_id, name |
| `lottery_spin` | 抽奖 | remaining |
| `lottery_result` | 抽奖结果 | prize, type |
| `capsule_open` | 查看胶囊 | capsule_id, name |
| `msg_post` | 发布留言 | length |
| `msg_like` | 点赞/取消 | msg_id, action |
| `login_success` | 登录成功 | method |

### API 对接占位

| 接口 | 方法 | 说明 |
|------|------|------|
| `api.getActivityInfo()` | 活动基础信息 | 站点列表/倒计时/规则 |
| `api.getNewsList()` | 新闻列表 | 轮播+列表 |
| `api.getUserTicket()` | 用户机票 | 含舱位信息 |
| `api.getStationDetail(sid)` | 站点详情 | Step+任务列表 |
| `api.getQuizQuestions()` | 答题题目 | 10 题 |
| `api.submitQuizAnswer(q,opt)` | 提交答案 | 实时校验 |
| `api.getQuizRank()` | 排名信息 | rank/time/tier |
| `api.getTaskList()` | 任务列表 | 8 项任务 |
| `api.completeTask(id)` | 完成任务 | |
| `api.getLotteryInfo()` | 抽奖信息 | 剩余次数/奖池 |
| `api.doLotteryDraw()` | 执行抽奖 | 返回奖品 |
| `api.getLotteryRecords()` | 抽奖记录 | 历史中奖 |
| `api.getCapsuleList()` | 胶囊列表 | 13 项 |
| `api.getMessageBoard(tab)` | 留言板 | 分页 |
| `api.postMessage(text)` | 发布留言 | |
| `api.login(method,cred)` | 登录 | 邮箱/手机/扫码 |

---

## 区块 7: 元数据尾

### 7.1 自检清单

> 基础清单见 `contract/rules.md` 自检清单章节，以下为本风格特有检查项 + 规则合规项。

**规则合规项（R00-R24）：**
- [ ] R16/R17: 所有图标使用 `@gate/iconfont` 或自定义 SVG，无 emoji 作为功能性图标
- [ ] R10: 标题层级连续：H1(60px) → H2(32px) → H3(24px) → Body(16px)，无跳级
- [ ] R11: 字重上限 700(bold，仅 H1)，H2/H3 使用 600(semibold)，无 900(black)
- [ ] R8: 圆角 5 级体系（max 16px）：L1(16px) > L2(12px) > L3(8px) > L4(6px) > L5(pill)，无超过 16px 的圆角
- [ ] R14: 响应式断点对齐标准：<768px / 768-1247px / ≥1248px
- [ ] R3: 状态色使用标准语义色：success=#50A907, error=#E54545
- [ ] R21: 卡片层次分明：外层黑(#000) / 中层深蓝黑(#06091A) / 内嵌最深(#030510)
- [ ] R20: 每屏最多一个主 CTA
- [ ] R15: 可交互元素移动端 >= 44px

**风格特有检查项：**
- [ ] Banner 居中排版，站点进度条使用 PlaneIcon SVG marker，5 站状态正确（active 辉光+白色文字/upcoming 灰色/locked 灰色+锁图标）
- [ ] 倒计时实时递减，纯数字+冒号（无天/时/分/秒标签），JetBrains Mono 字体，冒号与数字框水平居中对齐
- [ ] 机票统一大卡片（圆角 12px / rounded-xl）内展开/收起交互正常，详情含横向航班选座 SeatMap + 撕裂线装饰 + 条码
- [ ] 舱位 Badge 四种等级用蓝色明度梯度区分（亮蓝/主蓝/半透蓝/灰蓝），蓝色仅用于 badge 和 CTA 按钮，不用于普通文字
- [ ] 所有数据数字（排名/用时/次数/百分比/票号）使用白色而非蓝色
- [ ] 次级文字使用中性灰 #A0A3A7（同 semantic.md text.secondary）
- [ ] 节标题竖条、Tab选中态、站点选中态使用白色系（而非蓝色）
- [ ] 答题 10 题全部答对才能获得机票，答错即终止
- [ ] 答题计时精度 0.1 秒，monospace 字体
- [ ] World Tour 桌面端：左侧站点列表 + StepGrid(4列导航+进度卡片，无独立Tab条) + 面板内容，无重复数据
- [ ] World Tour 移动端：水平 Tab + 手风琴 Accordion，展开/折叠交互正常
- [ ] Step 面板固定高度以时间胶囊面板为标准，切换时下方内容不跳动
- [ ] 完成行为任务列表超长时面板内出现滚动条
- [ ] 抽奖消耗次数正确，无次数时按钮禁用，抽奖记录弹窗可查看历史
- [ ] 时间胶囊环形布局 13 项均匀分布，轨道使用内联 style 宽高（避免 Tailwind JIT 延迟）
- [ ] 留言板瀑布流响应式列数正确
- [ ] 所有弹窗 ESC/遮罩可关闭（FormModal 除外），关闭按钮使用 `GateUIIconA16PxGuanbi`
- [ ] 登录弹窗：Modal 圆角 16px + Input 圆角 6px + 邮箱/手机/二维码 Tab + 社交登录图标使用 @gate/iconfont
- [ ] 按钮文案中英双语对齐（立即登舱 Boarding Now / Start Quiz / Spin Now / Flip 等）
- [ ] 数据埋点：14 个事件在对应交互点正确触发
- [ ] API 占位：16 个 stub 函数可被替换为真实 fetch 调用

### 7.2 适用 / 不适用场景

**适用：**
- Gate.io 周年庆/里程碑活动
- 航空/旅行/巡回主题活动
- 品牌蓝调深色大促页面
- 多站点/多阶段线性解锁活动

**不适用：**
- 暖色调 VIP 权益页面（建议用 vip-gold-prestige.md）
- 红色节日活动（建议用 cny-festive-red.md）
- 轻量数据仪表盘（建议用 default.md）

### 7.3 参考来源

- gate13-early-boarding.html（原始网页）
- Boarding Gate i3TH 主视觉图
- 提取时间：2026-03-05

### 7.4 与其他 style 对比表

| 特征 | 本风格 | Default | WCTC2 | competition |
|------|--------|---------|-------|-------------|
| 色温 | 冷中性（纯黑 + 中性灰 + 蓝色点缀） | 中性 | 冷色（深蓝紫） | 冷色 |
| 卡片背景 | #06091A | #1F2023 | #0A0E1F | #0E1525 |
| 主强调色 | #1E40FF 深邃电光蓝 | #A7F757 | #1A3A8A | #3370FF |
| 核心组件 | 登舱机票 + 答题 + 环形胶囊 | 任务阶梯 | 团队卡 + 奖池 | 排行榜 |
| 渐变使用 | 蓝色渐变仅CTA+进度条，白色渐变用于标题/装饰 | 无 | 蓝紫渐变 | 蓝绿渐变 |
| 数据密度 | 高 | 中 | 中 | 高 |
| 特色交互 | 统一卡片展开机票(撕裂线+条码)+横向航班SeatMap、全屏答题、环形胶囊、飞机进度条、JetBrains Mono 倒计时、StepGrid导航+进度、Dashboard+Accordion 双布局、抽奖记录、新闻 HOT 左边框指示器、14 事件埋点、16 API stub | 无 | 跑马灯 | Tab + 分页 |

### 7.5 技术实现扩展（非视觉规范，供开发参考）

- **数据埋点**：14 事件数据埋点体系（`track()` 统一入口）
- **API 占位**：16 个 API stub 函数（`api.*` 命名空间），可替换为真实 fetch 调用
- **状态管理**：结构化按 Auth/Station/Quiz/Lottery/Ticket/Message/UI 分类
