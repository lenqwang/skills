# 截图分析与校准指南

通过分析截图提取设计特征，反哺 Token 体系；通过分层校准标准量化对比结果。

---

## 第一部分: 截图分析流程

### 1. 颜色提取

识别截图中的主要颜色：
- 页面背景色
- 卡片背景色
- 主要文字色
- 次要文字色
- 强调色
- 状态色（成功/警告/错误）
- 渐变色（方向 + 起止色值）

### 2. 间距测量

识别间距模式：
- 页面内边距
- 卡片内边距
- 元素间距
- 区块间距（模块级）

### 3. 圆角识别

识别圆角使用：
- 卡片圆角
- 按钮圆角
- 输入框圆角
- Tab 圆角

### 4. 排版分析

识别排版层次：
- 标题字号/字重
- 正文字号/字重
- 行高

### 5. 布局识别

识别布局模式：
- 栅格列数
- 列间距
- 内容最大宽度

### 6. 组件识别

识别组件模式：
- 按钮（样式、尺寸、圆角）
- 卡片（背景、边框、阴影）
- Tab（选中态、默认态）
- 排行榜（行样式、TOP 特殊处理）
- 表格（表头、行高、边框）

## 输出格式

```yaml
colors:
  background: #070808
  surface: #1F2023
  text-primary: #FAFAFA
  text-secondary: #A0A3A7
  accent: #A7F757
  gradients:
    - { usage: "CTA", value: "linear-gradient(90deg, #FFDD9C, #FFB347)" }

spacing:
  page-padding: 80px
  card-padding: 32px
  element-gap: 24px
  section-gap: 64px

radius:
  card: 32px
  button: 9999px
  input: 6px

typography:
  h1: 60px/600/1.25
  h2: 40px/600/1.3
  body: 16px/400/1.3

layout:
  max-width: 1200px
  columns: 3
  column-gap: 24px

components:
  - type: button
    variants: [primary-cta, secondary]
  - type: card
    variants: [default, highlighted]
```

## Token 映射

将提取值映射到 Token：

| 提取值 | 映射 Token |
|--------|-----------|
| #070808 | surface.background |
| #1F2023 | surface.default |
| 32px (卡片圆角) | radius.card-lg |
| 60px/600 | display.large.campaign |

## 冲突处理

当提取值与现有 Token 冲突时：
1. 报告差异
2. 建议新增 Token 或修改现有 Token
3. 等待用户确认

---

## 第二部分: 分层校准标准

> 用于 `engine/calibrate/url-to-style.md` Phase 4 校准循环，对比生成页面与原页面的差异。

### L1 色彩校准

| 检查项 | 匹配标准 | 权重 |
|--------|---------|------|
| 主背景色 | hex 差异 ≤ #10（每通道偏差 ≤ 16） | 高 |
| 卡片背景色 | hex 差异 ≤ #10 | 高 |
| 强调色 | hex **完全匹配** | 高 |
| 渐变方向 | 方向一致（to-r / to-b 等） | 中 |
| 渐变色值 | 起止色 hex **完全匹配** | 高 |
| 文字色 | 主/次文字色 hex 差异 ≤ #10 | 中 |

**通过条件：0 差异项**（色彩是 style 的核心标识，必须精确）

### L2 布局校准

| 检查项 | 匹配标准 | 权重 |
|--------|---------|------|
| 模块间距 | 误差 ≤ 8px | 高 |
| 卡片内边距 | 误差 ≤ 4px | 中 |
| 圆角值 | 完全匹配 | 高 |
| 栅格列数 | 完全匹配 | 高 |
| 内容最大宽度 | 误差 ≤ 20px | 中 |

**通过条件：≤ 1 差异项**

### L3 组件校准

| 检查项 | 匹配标准 | 权重 |
|--------|---------|------|
| 按钮样式 | 圆角/颜色/高度匹配 | 高 |
| 卡片样式 | 背景/边框/阴影匹配 | 高 |
| Tab 样式 | 选中态/默认态匹配 | 中 |
| 排行榜行样式 | TOP 特殊处理匹配 | 中 |
| 表格行高 | 误差 ≤ 4px | 低 |

**通过条件：≤ 2 差异项**

### L4 动效校准

| 检查项 | 匹配标准 | 权重 |
|--------|---------|------|
| hover 状态 | 存在且视觉效果相似 | 中 |
| transition 时长 | 在合理范围内（100-300ms） | 低 |
| 按钮点击反馈 | 存在 active 态 | 低 |
| 装饰动效 | 存在即可，不要求精确匹配 | 低 |

**通过条件：≤ 2 差异项**

### 校准结果汇总模板

```yaml
calibration_round: 1
date: YYYY-MM-DD

L1_color:
  status: pass / fail
  diff_count: 0
  issues: []

L2_layout:
  status: pass / fail
  diff_count: 1
  issues:
    - { item: "模块间距", expected: "120px", actual: "96px", action: "修正 style 间距偏好" }

L3_component:
  status: pass / fail
  diff_count: 0
  issues: []

L4_motion:
  status: pass / fail
  diff_count: 1
  issues:
    - { item: "卡片 hover", expected: "边框高亮", actual: "无 hover", action: "添加 hover 样式" }

overall: pass / fail
next_action: "修正 L2 间距 → 重新生成 → 第 2 轮校准" / "校准通过，保存最终版"
```

### 校准优先级

如果多层同时不通过，按以下顺序修正：

```
L1 色彩（最高优先） → L2 布局 → L3 组件 → L4 动效（最低优先）
```

色彩不通过时，其他层的校准结果可能不可靠（颜色会影响视觉感知），应先修正 L1 再重新评估。

---

### L5 设计质量评估（可选）

> L1-L4 校准"像不像"，L5 评估"好不好"。在 L1-L4 全部通过后可选执行。
> 完整评审框架见 `contract/audit/audit-protocol.md`，此处为校准场景的简化版。

| 检查项 | 评估标准 | 权重 |
|--------|---------|------|
| 视觉层次 | 3 秒内能否识别主要信息（Hero 标题/主 CTA）？ | 高 |
| 色彩平衡 | 强调色（accent/brand）使用点 ≤ 3 处？ | 中 |
| 空间节奏 | 间距是否有三级递增（元素 < 区块 < 页面）？有无局部拥挤？ | 中 |
| 反 AI 模式 | 不命中 R29 任何反模式条目？ | 高 |
| 文案质量 | CTA 是否为具体动词？空状态是否有引导？ | 中 |
| 品牌调性 | 是否传达"稳定/沉静/克制/高端"的情绪？ | 中 |

**通过条件：** 无高权重项不通过

**评估结果记录：**

```yaml
L5_design_quality:
  status: pass / fail / skip
  issues:
    - { item: "视觉层次", detail: "Hero 标题与副标题字号差异不足", action: "标题增大到 60px" }
  notes: "品牌调性整体匹配，色彩使用克制"
```

**校准优先级更新：**

```
L1 色彩 → L2 布局 → L3 组件 → L4 动效 → L5 设计质量（可选）
```
