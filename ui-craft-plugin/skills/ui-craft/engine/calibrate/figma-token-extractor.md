# Figma Token 提取器 — 数据预处理规范

> 从 Figma MCP 原始数据中裁剪冗余信息，只保留生成 `:root` 变量所需的设计 token。
> 目标：将 ~360KB 原始数据压缩到 ~10KB 结构化 token。

## 何时使用

当通过 `get_figma_data` 获取到 Figma 节点数据后，**在写任何 HTML 之前**，先执行本文档的提取流程。

## 提取流程

### Step 1：分层请求（控制数据量）

**禁止**一次性请求整页数据。按区域分次请求：

```
请求 1: Hero 区 frame（depth=2）→ 提取背景渐变、标题字号、按钮样式
请求 2: 第一张卡片 frame（depth=3）→ 提取卡片配色、圆角、间距、表格样式
请求 3: FAQ 区 frame（depth=1）→ 提取分隔线、折叠项样式
```

使用 `get_figma_data` 时：
- 必须指定 `nodeId`（具体 frame），不要只传 `fileKey`
- 尽量使用 `depth` 参数限制层级（装饰图形通常在深层，不需要遍历）

### Step 2：提取 Token 表（只提取以下 7 类）

从返回数据中只提取以下信息，忽略所有其他内容：

#### 2.1 颜色 Token

提取来源：`fills[].color`、`strokes[].color`、`effects[].color`

```
扫描规则：
- 背景色 → 取面积最大的 frame 的 fills
- 文字色 → 取文本节点的 fills
- 强调色 → 取按钮/标签的 fills
- 边框色 → 取 strokes
- 阴影色 → 取 effects 中 type=DROP_SHADOW 的 color
```

输出格式（只输出 hex）：
```
背景: #0D0D12 (页面 bg), #0B0C0D (header), #FFF8F0 (卡片), #FFEFDA (卡片内层)
文字: #3E1600 (暖色底文字), #FFFFFF (深色底文字), #8B7060 (次级)
强调: #B00025 (主红), #8D0526 (深红)
功能: #17E5A1 (成功), #2354E6 (信息), #C4C7CA (灰调)
标签: #2B65FE (标签底), #5B8DEF (标签文字)
边框: #484B51 (header 边框), #474747 (分隔线)
```

#### 2.2 渐变 Token

提取来源：`fills[].gradientStops`、`fills[].gradientHandlePositions`

```
输出格式：
Hero 渐变: 180deg, #2A0A16 → #1A0610 → #0D0D12
CTA 渐变: 180deg, #FFD78A → #FFB012
```

#### 2.3 字号 Token

提取来源：文本节点的 `style.fontSize`、`style.fontWeight`、`style.lineHeightPx`

```
扫描规则：
- H1 → 最大字号的文本节点
- H2 → 第二大
- body → 出现频率最高的字号
- sm/xs → 更小字号

输出格式：
H1: 42px / 600 / 1.2
H2: 28px / 600 / 1.32
H3: 24px / 600 / 1.5
H4: 20px / 600 / 1.3
body: 16px / 400 / 1.5
sm: 14px / 500 / 1.3
xs: 12px / 400 / 1.3
```

#### 2.4 圆角 Token

提取来源：`cornerRadius`、`rectangleCornerRadii`

```
扫描规则：
- 最外层卡片的圆角 → --r-card
- 内嵌区块的圆角 → --r-inner
- 按钮的圆角 → --r-btn
- 标签/Badge 的圆角 → --r-tag

输出格式：
card: 32px, inner: 16px, slot: 12px, btn: 9999px, tag: 20px
```

#### 2.5 间距 Token

提取来源：`paddingLeft/Right/Top/Bottom`、`itemSpacing`（Auto Layout）

```
扫描规则：
- 最大 gap（section 间距）→ --s-section
- 卡片 padding / 大区块 gap → --s-block
- 内容 gap → --s-element
- 行内 gap → --s-inline
- 最小 gap → --s-tight

输出格式：
section: 80px, block: 48px, element: 32px, inline: 16px, tight: 8px
```

#### 2.6 内容宽度

提取来源：最外层 frame 的 `absoluteBoundingBox.width` 或含 `max-width` 约束的 frame

```
输出格式：
content: 1200px
```

#### 2.7 组件清单（仅列结构，不含细节）

提取来源：顶层子节点名称和类型

```
输出格式：
1. Header (FRAME)
2. Hero (FRAME) - 含渐变背景 + 标题 + 倒计时 + CTA
3. 活动参与流程 (FRAME) - 暖色卡片 + 有序列表
4. 任务卡 ×2 (COMPONENT) - 签到格 + 进度条 + 奖励表
5. 双列卡 ×2 (FRAME) - 表格卡片
6. 邀请好友 (FRAME) - 简要卡片
7. FAQ (FRAME) - 手风琴列表
```

### Step 3：输出精简 Token 摘要

将上述 7 类信息汇总为一个 **≤ 2000 字符** 的文本块，格式如下：

```
=== FIGMA TOKEN SUMMARY ===
[颜色] bg:#0D0D12 dark:#0B0C0D card:#FFF8F0 card-s:#FFEFDA ...
[文字] txt:#3E1600 txt-inv:#FFFFFF txt-s:#8B7060
[强调] accent:#B00025 accent-dk:#8D0526
[功能] ok:#17E5A1 info:#2354E6 muted:#C4C7CA
[标签] tag:#2B65FE tag-txt:#5B8DEF
[边框] border:#484B51 divider:#474747 sep:#E2D6CC sep-dark:#25252A
[玻璃] glass:#202025 glass-hv:#313136 glass-bd:#3D3D41
[渐变] hero: 180deg #2A0A16→#1A0610→#0D0D12 | cta: 180deg #FFD78A→#FFB012
[字号] h1:42/600 h2:28/600 h3:24/600 h4:20/600 body:16/400 sm:14/500 xs:12/400
[圆角] card:32 inner:16 slot:12 btn:9999 countdown:8 tag:20
[间距] section:80 block:48 element:32 inline:16 tight:8
[宽度] content:1200
[组件] Header | Hero(渐变+倒计时+CTA) | 流程卡 | 任务卡×2(签到+进度+奖励) | 双列表格卡×2 | 邀请卡 | FAQ
=== END ===
```

## 忽略清单（不提取）

以下内容直接跳过，不要出现在 token 摘要中：

| 忽略类型 | 说明 |
|----------|------|
| SVG 路径数据 | `d="M..."` 路径、`viewBox` 等 |
| 装饰图形 | 星星、粒子、红包装饰、灯笼等 |
| 图片 URL | 位图填充的 `imageRef` |
| 嵌套重复组件 | 同一组件出现多次只取第一次 |
| 响应式变体 | 只取桌面端（最大 frame） |
| 未使用的隐藏图层 | `visible: false` 的节点 |
| 组件 variant 属性 | `componentPropertyDefinitions` 等元数据 |
| 文本内容 | 文案内容不需要（只取字号/字重） |
