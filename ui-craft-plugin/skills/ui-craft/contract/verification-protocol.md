# 验证协议（Verification Protocol）

> 将步骤 9 的自检从 checkbox 声明升级为结构化验证管线。
> 规则定义和 check/fix 逻辑见 `rules.md`。

---

## 3-Pass 验证流程

### Pass 1: 静态扫描

对输出代码执行以下模式匹配检查：

| # | 检查项 | 对应规则 | 检查方法 | severity |
|---|--------|---------|---------|----------|
| 1 | 硬编码颜色 | R3 | CSS 中搜索 `#hex`/`rgb()`/`rgba()` 值，排除 `.page` 变量定义行、`linear-gradient()` 内部、`box-shadow` 值 | [B] |
| 2 | 硬编码圆角 | R10 | CSS 中搜索 `border-radius: <非 var() 值>`，排除 `50%`/`9999px` | [B] |
| 3 | 非 4px 间距 | R7 | 提取 padding/margin/gap 的 px 值，验证 `值 % 4 === 0`，排除 `1px` 边框 | [B] |
| 4 | 标题跳级 | R13 | 提取 h1-h6 标签序列，验证不存在 gap > 1 | [B] |
| 5 | 内联 style | R2 | 搜索 `style={` 或 `style="`，排除动态值绑定 | [B] |
| 6 | emoji | R19 | 搜索 Unicode emoji 范围（U+1F600-1F9FF, U+2600-26FF, U+2700-27BF 等） | [B] |
| 7 | CTA 唯一性 | R23 | 每个 section/可视区域内主 CTA 计数 <= 1 | [B] |
| 8 | 语义化 HTML | R27 | 搜索 `<div onClick`/`<span onClick`；搜索 `<img` 无 `alt` | [B] |
| 9 | 焦点状态 | R26 | 检查 button/a/input 是否有 `:focus` 或 `:focus-visible` 样式 | [B] |
| 10 | 最大宽度 | R16 | 主内容容器 `max-width` <= 1200px | [B] |
| 11 | accent 使用 | R4 | `var(--accent)` 使用点对应元素是否为金额/数值 | [B] |
| 12 | 触摸目标 | R18 | button/a 尺寸 >= 44px（含 padding） | [W] |
| 13 | 同类间距一致 | R8 | 同容器内子元素 gap/margin 统一 | [W] |
| 14 | 同类圆角一致 | R11 | 同类组件 border-radius 统一 | [W] |
| 15 | 字重匹配 | R14 | font-weight 与场景映射（400 正文/500 按钮/600 标题/700 强调标题） | [W] |
| 16 | 状态色语义 | R5 | success/warning/error/info 语义正确 | [W] |
| 17 | 响应式断点 | R17 | **Campaign 域**：@media 断点值为 768px 和 1248px。**Pay-B 域（web3pay）**：必须同时包含 `max-width:1247px`（sidebar 隐藏）、`max-width:991px`（紧凑模式）、`max-width:767px`（移动端）、`min-width:1248px`（宽屏）、`min-width:1920px`（超宽屏）五个断点，且必须包含汉堡按钮（`.hamburger-btn`）和侧边栏遮罩（`.sidebar-overlay`）实现。缺少任一 Pay-B 断点 → [B] 阻断。 | [B] for Pay-B, [W] for Campaign |
| 18 | 图标尺寸 | R21 | size 为 16/20/24/32 之一 | [W] |
| 19 | 组件规格合规 | R28 | 页面中的 button/card/modal/input/table 等组件，其 CSS 属性（background, border-radius, padding, color, font-size, height 等）必须与 `domains/{domain}/components/<type>.md` 中定义的规格一致。仅检查规格中**已定义**的属性，未定义的属性不检查。 | [B] |
| 22 | Pay-B CSS 变量容器 | — | **Pay-B 域专属**：CSS 变量必须定义在 `.page{}` 内，不得用 `:root{}`。检查方法：搜索 `:root` 是否包含 `--gtpay-` 或 `--color-` 变量。违规 → [B]。 | [B] for Pay-B |
| 23 | Pay-B Baseline 对齐 | — | **Pay-B 域专属**：Sidebar class 必须为 BEM 命名（`sidebar__item`、`sidebar__item-inner`、`sidebar__item--active`）。Primary 按钮背景必须为 `var(--gtpay-color-brand)`（`#ADF73E`）而非 `#68AD00`。TD font-size 必须为 16px。违规任一项 → [B]。 | [B] for Pay-B |
| 20 | AI 模式化检测 | R29 | 视觉审查：渐变是否为纯装饰（非信息层级）、卡片嵌套 > 2 层、bounce/elastic 缓动、animate layout properties、霓虹/发光效果滥用、千篇一律卡片网格 | [W] |
| 21 | UX 文案质量 | R30 | CTA 按钮是否为具体动词+目标（非"确定/提交"）；error/empty 状态是否有指引；是否存在冗余/模糊文案 | [W] |

---

### Pass 2: 违规报告

扫描完成后，输出结构化报告：

```yaml
verification:
  status: FAIL | PASS
  blocking:
    - rule: R3
      location: ".card { color: #0068FF }"
      fix: "替换为 color: var(--brand)"
    - rule: R13
      location: "h1 -> h3（跳过 h2）"
      fix: "将 h3 改为 h2，或插入缺失的 h2 层级"
  warnings:
    - rule: R8
      location: ".list 子元素 gap 不统一（16px 和 24px）"
      fix: "统一为 gap: 24px"
```

**报告规则**：
- `status: FAIL` — 存在任何 blocking 违规
- `status: PASS` — 无 blocking 违规（可有 warnings）
- 每条违规必须包含 `rule`（规则编号）、`location`（违规位置）、`fix`（修复指令）
- blocking 列表按规则编号排序
- warnings 列表按规则编号排序

---

### Pass 3: 修复循环

1. **FAIL 时**：按违规列表逐项修复（blocking 优先）
2. **修复后**：回到 Pass 1 重新扫描
3. **循环上限**：最多 2 轮修复循环
4. **2 轮后仍有 blocking**：暂停输出，向用户报告剩余违规及原因
5. **PASS 时**：输出代码，warnings 标注在输出注释中

---

## 流程图

```
输出代码
  |
  v
Pass 1: 静态扫描（21 项检查）
  |
  v
Pass 2: 生成违规报告
  |
  ├── status: PASS --> 输出（warnings 标注在注释中）
  |
  └── status: FAIL --> Pass 3: 修复循环
                          |
                          v
                       逐项修复 blocking
                          |
                          v
                       回到 Pass 1（第 N 轮）
                          |
                          ├── N <= 2 --> 继续扫描
                          |
                          └── N > 2 --> 暂停，报告给用户
```

---

## Phase 特殊规则

### Phase 1（HTML 预览）豁免项

以下检查在 HTML 预览阶段**豁免**：
- R2: CSS Modules 限制（HTML 使用内嵌 `<style>`）
- R19/R20: 图标来源（HTML 可用 CSS 图形/SVG 占位）
- R26: 焦点状态（HTML 预览不强制要求）
- i18n 要求（HTML 预览可直接使用中文）

### Phase 2（Next.js 转换）

全部 21 项检查**无豁免**，严格执行。
