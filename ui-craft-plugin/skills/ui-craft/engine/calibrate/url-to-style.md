# URL → Style 生成管线

> 从活动页 URL 自动生成符合 `_template.md` 标准结构的 style 文件。

## 触发方式

```
/ui-craft --calibrate <url> [--name <style-name>]
```

---

## Phase 1: 抓取（Input）

### 目标

从目标 URL 提取原始设计信号。

### 步骤

1. **WebFetch 获取页面** — 抓取 HTML + 内联/外联 CSS
2. **提取关键信号**：
   - 颜色值：background-color, color, border-color, gradient
   - 间距值：margin, padding, gap（关注模块级间距）
   - 圆角值：border-radius
   - 字号/字重：font-size, font-weight, line-height
   - 渐变：linear-gradient, radial-gradient
   - 组件结构：识别卡片、按钮、Tab、排行榜、表格等组件模式
3. **输出**：结构化 raw_tokens

### 输出格式

```yaml
# raw_tokens
source_url: https://example.com/page
extracted_at: YYYY-MM-DD

colors:
  backgrounds:
    - { element: "页面背景", value: "#070808" }
    - { element: "卡片背景", value: "#1F2023" }
  texts:
    - { element: "主标题", value: "#FAFAFA" }
    - { element: "次要文字", value: "#8C8C8C" }
  accents:
    - { element: "强调色", value: "#A7F757" }
    - { element: "CTA按钮", value: "#0055FF" }
  borders:
    - { element: "卡片边框", value: "#2A281D" }

gradients:
  - { element: "奖池金额", value: "linear-gradient(90deg, #FFEC1A, #FFAA33)" }
  - { element: "CTA按钮", value: "linear-gradient(90deg, #FFDD9C, #FFB347)" }

spacing:
  module_gap: 64px        # 主模块间距
  section_gap: 48px       # 子区块间距
  card_padding: 24px      # 卡片内边距

radius:
  card: 32px
  button: 9999px
  input: 6px
  tab: 99px

typography:
  - { element: "主标题", size: "60px", weight: 600, line_height: 1.25 }
  - { element: "副标题", size: "28px", weight: 400, line_height: 1.3 }
  - { element: "正文", size: "16px", weight: 400, line_height: 1.5 }

components:
  - "Hero区（标题+倒计时+CTA）"
  - "排行榜（双Tab）"
  - "任务阶梯表"
  - "投票卡片网格"
```

---

## Phase 2: 映射（Map）

### 目标

将 raw_tokens 映射到语义 Token，标记差异和重叠。

### 步骤

1. **映射到语义 Token** — 将每个 raw 值对应到 `semantic.md` / `primitive.md` 中的 Token
2. **标记与 default style 的差异点** — 逐项对比，标注"覆盖"或"同默认"
3. **计算与现有 styles 的重叠度**：
   - 对比 `styles/` 目录下所有已有 style
   - 如果颜色+组件重叠度 > 70% → **建议复用已有 style**，不生成新文件
   - 输出重叠度报告

### 输出格式

```yaml
# token_diff
base_style: default  # 对比基准

color_diffs:
  - token: surface.background
    raw: "#070808"
    default: "#070808"
    diff: same
  - token: surface.default
    raw: "#201D17"
    default: "#1F2023"
    diff: override    # 需要覆盖

typography_diffs:
  - token: display.large.campaign
    raw: "72px/600"
    default: "60px/600"
    diff: override

overlap_report:
  - style: vip-warm-elite
    overlap: 85%      # > 70% → 建议复用
    reason: "暖棕色系 + 金色强调 + 排行榜组件高度重合"
  - style: festive-gamify
    overlap: 30%
    reason: "渐变体系不同，组件结构差异大"

recommendation: reuse_existing  # 或 create_new
recommended_style: vip-warm-elite  # 如果建议复用
```

### 重叠度判断标准

| 重叠度 | 行动 |
|--------|------|
| > 70% | 建议复用已有 style，列出需微调的差异项 |
| 40%-70% | 基于最接近的 style fork 一份，修改差异项 |
| < 40% | 创建全新 style |

---

## Phase 3: 生成（Generate）

### 目标

基于 `_template.md` 结构填充所有 7 个区块，生成 style 文件初版。

### 步骤

1. **读取 `styles/_template.md`** 获取标准结构
2. **填充区块 1（元信息头）** — 填入 name, description, source_urls, extracted_at
3. **填充区块 2（风格特征）** — 从提取的组件和颜色归纳 3 行特征
4. **填充区块 3（决策原则覆盖表）** — 根据视觉信号判断 7 个维度倾向
5. **填充区块 4（Token 覆盖）** — 从 token_diff 中提取所有 `diff: override` 项
   - 4.1 颜色策略表
   - 4.2 渐变系统表（从 raw_tokens.gradients）
   - 4.3 排版覆盖表
   - 4.4 圆角偏好表
   - 4.5 间距偏好
6. **填充区块 5（布局结构）** — 定义页面流、栅格偏好、响应式策略
7. **填充区块 6（组件变体）** — 为每个识别到的组件绘制 ASCII 图 + 属性表
8. **填充区块 7（元数据尾）**
   - 自检清单 = 基础清单 + 风格特有项
   - 与其他 style 的对比表（从 overlap_report 生成）

### 输出

```
styles/{name}.md  — 初版 style 文件
```

---

## Phase 4: 校准（Calibrate）— 可选循环

### 目标

通过"生成 HTML → 截图对比 → 修正 style"循环，将 style 精度提升至通过标准。

### 前置条件

- Phase 3 已输出初版 style
- 用户确认进入校准循环

### 校准流程

```
┌────────────────────────────────────────┐
│  1. 用初版 style + 测试 PRD 生成 HTML  │
│  2. 截图生成的 HTML                    │
│  3. 对比原页面截图                     │
│  4. 按 L1→L4 逐层检查差异              │
│  5. 差异项 > 通过标准？                │
│     ├─ 是 → 修正 style → 回到步骤 1    │
│     └─ 否 → 校准通过，保存最终版       │
└────────────────────────────────────────┘
```

### 4 层校准标准

> 原始出处：从 `calibrate/screenshot.md` 合并。

#### L1 色彩校准

| 检查项 | 匹配标准 | 权重 |
|--------|---------|------|
| 主背景色 | hex 差异 ≤ #10（每通道偏差 ≤ 16） | 高 |
| 卡片背景色 | hex 差异 ≤ #10 | 高 |
| 强调色 | hex **完全匹配** | 高 |
| 渐变方向 | 方向一致（to-r / to-b 等） | 中 |
| 渐变色值 | 起止色 hex **完全匹配** | 高 |
| 文字色 | 主/次文字色 hex 差异 ≤ #10 | 中 |

**通过条件：0 差异项**（色彩是 style 的核心标识，必须精确）

#### L2 布局校准

| 检查项 | 匹配标准 | 权重 |
|--------|---------|------|
| 模块间距 | 误差 ≤ 8px | 高 |
| 卡片内边距 | 误差 ≤ 4px | 中 |
| 圆角值 | 完全匹配 | 高 |
| 栅格列数 | 完全匹配 | 高 |
| 内容最大宽度 | 误差 ≤ 20px | 中 |

**通过条件：≤ 1 差异项**

#### L3 组件校准

| 检查项 | 匹配标准 | 权重 |
|--------|---------|------|
| 按钮样式 | 圆角/颜色/高度匹配 | 高 |
| 卡片样式 | 背景/边框/阴影匹配 | 高 |
| Tab 样式 | 选中态/默认态匹配 | 中 |
| 排行榜行样式 | TOP 特殊处理匹配 | 中 |
| 表格行高 | 误差 ≤ 4px | 低 |

**通过条件：≤ 2 差异项**

#### L4 动效校准

| 检查项 | 匹配标准 | 权重 |
|--------|---------|------|
| hover 状态 | 存在且视觉效果相似 | 中 |
| transition 时长 | 在合理范围内（100-300ms） | 低 |
| 按钮点击反馈 | 存在 active 态 | 低 |
| 装饰动效 | 存在即可，不要求精确匹配 | 低 |

**通过条件：≤ 2 差异项**

#### 校准优先级

如果多层同时不通过，按以下顺序修正：

```
L1 色彩（最高优先） → L2 布局 → L3 组件 → L4 动效（最低优先）
```

色彩不通过时，其他层的校准结果可能不可靠（颜色会影响视觉感知），应先修正 L1 再重新评估。

#### 校准结果汇总模板

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

### 最大循环次数

- 最多 **3 轮**校准循环
- 3 轮后仍未通过 → 标记未通过项，输出当前最优版本 + 待修复列表

### 校准记录

每轮校准在 style 文件的元信息头更新 `calibrated_at`，并在 PR/commit 中记录校准轮次和结果。

---

## 快速参考

| Phase | 输入 | 输出 | 耗时预估 |
|-------|------|------|---------|
| 1. 抓取 | URL | raw_tokens | 1 轮对话 |
| 2. 映射 | raw_tokens | token_diff + 重叠报告 | 1 轮对话 |
| 3. 生成 | token_diff + _template | styles/{name}.md 初版 | 1 轮对话 |
| 4. 校准 | 初版 style + 原页面 | 最终 style | 1-3 轮循环 |

## 注意事项

- 需要登录的页面无法通过 WebFetch 抓取，需用户提供截图走 `calibrate/screenshot.md` 流程
- 动态渲染内容（JS 渲染）可能导致抓取不完整，需结合截图补充
- CDN 资源可能有跨域限制
