# UI Craft 设计体系审计日志

> 定期检查 ui-craft skill 规范文件的完整性、一致性和准确性。
> 每次审计在本文件追加新条目，保留历史记录。

> **路径迁移说明**：
> - v2（2026-03-16）：`_system/` → `contract/` + `engine/`，`design-system/` → `tokens/` + `components/`
> - v3（2026-03-17）：Domain-First 架构，删除顶层 `tokens/` + `components/`，每域自包含：
>   - `tokens/primitive.md` → `domains/{domain}/primitive.md`（每域自带）
>   - `tokens/semantic.md` → `domains/{domain}/semantic.md`（每域自带）
>   - `components/*.md` → `domains/{domain}/components/*.md`（按域物理隔离）
>   - `domains/_base/` → `domains/_platform/`（重命名为平台基座）
>   - 新增路径参考：
>     - `_system/contract/` → `contract/`
>     - `_system/calibrate/` → `engine/calibrate/`
>     - `_system/code-gen/` → `engine/code-gen/`
>     - `_system/icons/common.md` → `engine/reference/icons.md`
>     - `design-system/rules.md` → `contract/rules.md`
>     - `campaign/` → `domains/campaign/`

---

## 审计记录索引

| 日期 | 审计范围 | P0 | P1 | P2 | 状态 |
|------|---------|----|----|----|----|
| 2026-03-06 | 全量（25 文件） | 4 | 6 | 9 | P0/P1 已修复, P2 部分修复 |

---

## 2026-03-06 全量审计

**审计范围**: ui-craft skill 全部 25 个文件
**审计人**: AI (Claude)
**触发方式**: 手动 `/ui-craft` 检查

### 文件覆盖清单

| 文件 | 是否检查 | 发现问题 |
|------|---------|---------|
| `SKILL.md` | Yes | P2#18 |
| `_system/contract/design-contract.md` | Yes | — |
| `design-system/primitive.md` | Yes | P2#15 |
| `design-system/semantic.md` | Yes | P0#1, P0#3 |
| `design-system/component.md` | Yes | P0#4, P2#11 |
| `design-system/rules.md` | Yes | P0#1 |
| `campaign/styles/_template.md` | Yes | — |
| `campaign/styles/default.md` | Yes | P1#7 |
| `campaign/styles/competition.md` | Yes | P1#7, P2#15 |
| `campaign/styles/13th-anniversary-celebration.md` | Yes | P1#8 |
| `campaign/styles/vip-warm-elite.md` | Yes (抽查) | — |
| `campaign/styles/vip-gold-prestige.md` | Yes (抽查) | — |
| `campaign/styles/dev-portal-dark.md` | Yes (抽查) | — |
| `campaign/styles/cny-festive-red.md` | Yes (抽查) | — |
| `campaign/styles/README.md` | Yes | P1#7 |
| `_system/calibrate/url-to-style.md` | Yes | P1#5 |
| `_system/calibrate/screenshot.md` | Yes | — |
| `_system/calibrate/webpage.md` | Yes | P2#17 |
| `_system/calibrate/figma.md` | Yes | P2#16 |
| `_system/code-gen/guidelines.md` | Yes | P1#6, P1#9, P1#10, P2#19 |
| `_system/code-gen/templates/page.tsx.md` | Yes | P0#2 |
| `_system/code-gen/templates/component.tsx.md` | Yes | P0#2 |
| `_system/icons/common.md` | Yes | — |
| `RESPONSIBILITY.md` | Yes | — |
| `README.md` | Yes | — |

---

### P0 — 严重（生成代码不可用或错误）

#### P0#1 品牌蓝色值冲突

- **涉及文件**: `design-system/rules.md` (R00 速查表), `_system/code-gen/guidelines.md` (Token 映射), `design-system/semantic.md`, `design-system/primitive.md`
- **问题**: `gate-blue` / tailwind.config.js 定义为 **#007BFF**，但 Token 体系 `action.primary` / `blue.500` 定义为 **#0068FF**。两套品牌蓝并存。
- **影响**: 生成代码时颜色不确定，品牌色不统一。
- **建议修复**: 统一为一个值。确认 tailwind.config.js 中 `gate-blue` 的实际值后，同步修正 semantic.md 或 rules.md。
- **状态**: `已修复` — 统一为 #0055FF，更新 primitive/semantic/component/rules/guidelines 及 tailwind.config.js

#### P0#2 代码模板违反 R00（使用未定义类名）

- **涉及文件**: `_system/code-gen/templates/page.tsx.md`, `_system/code-gen/templates/component.tsx.md`
- **问题**: 模板中使用 `bg-surface-background`、`text-display-large-campaign`、`text-text-primary`、`rounded-card-lg`、`text-accent-highlight` 等类名，在 tailwind.config.js 中均不存在。
- **影响**: Phase 2 转换时 AI 参照模板生成不可用代码。
- **建议修复**: 将模板中的语义类名替换为实际可用的 Tailwind 原生类或 gate-* 配置类，或在模板头部注明"需先扩展 tailwind.config.js"。
- **状态**: `已修复` — 重写两个模板，全部使用 Tailwind 原生类 + gate-* 配置类

#### P0#3 semantic.md 引用规则与 R00 冲突

- **涉及文件**: `design-system/semantic.md` (末尾 "引用规则" 章节)
- **问题**: 示例写 `✅ 允许：在代码中使用 text-primary、bg-surface-background`，但 R00 明确禁止使用未定义类名。
- **影响**: 开发者或 AI 参照 semantic.md 示例编码会违反 rules.md。
- **建议修复**: 修改引用规则示例，使用实际存在的 Tailwind 类名（如 `text-white`、`bg-gate-black`）或标注"需先在 tailwind.config.js 中定义"。
- **状态**: `已修复` — 重写引用规则章节，明确三步流程和正反示例

#### P0#4 component.md 主按钮文字色对比度不足

- **涉及文件**: `design-system/component.md` (主按钮 Primary)
- **问题**: 主按钮背景 `action.primary` (#0068FF) + 文字 `text.inverse` (#070808)，蓝底近黑字对比度约 1.5:1，远低于 R22 要求的 4.5:1。
- **影响**: 按钮文字几乎不可见，严重影响可访问性。
- **建议修复**: 主按钮文字色应改为 `white` (#FFFFFF)，与蓝色背景对比度约 4.7:1。
- **状态**: `已修复` — 文字色改为 white (#FFFFFF)

---

### P1 — 重要（导致混淆或不一致）

#### P1#5 url-to-style.md 区块编号错位

- **涉及文件**: `_system/calibrate/url-to-style.md` (Phase 3 步骤 6-7)
- **问题**: 步骤 6 把"组件变体"标为区块 5（实际是区块 6），步骤 7 引入 `_template.md` 中不存在的"区块 6: Tailwind 类名速查"。
- **影响**: 校准流程生成的 style 文件结构可能错误。
- **建议修复**: 步骤 6 改为"区块 6（组件变体）"，删除步骤 7 的"Tailwind 类名速查"或将其合并到区块 4/7。
- **状态**: `已修复` — 区块编号对齐 _template.md：5=布局结构, 6=组件变体, 7=元数据尾

#### P1#6 引用不存在的目录

- **涉及文件**: `_system/code-gen/guidelines.md` (行 66, 79, 91)
- **问题**: 引用了 `gradients/`、`effects/`、`enhancements/` 三个不存在的目录。
- **影响**: 链接失效，开发者无法找到所引用的内容。
- **建议修复**: 创建对应目录并补充内容，或移除引用并将关键信息内联到 guidelines.md。
- **状态**: `已修复` — 移除失效链接，信息已内联在 guidelines.md 表格中

#### P1#7 引用不存在的 style 文件

- **涉及文件**: `campaign/styles/default.md` (7.2/7.4), `campaign/styles/competition.md` (7.4), `campaign/styles/README.md`
- **问题**:
  - `festive-gamify.md` 被 default.md 和 README 引用，但文件不存在
  - `racing-premium.md` 被 competition.md 引用，但文件不存在
- **影响**: 风格推荐链断裂，用户找不到推荐的替代风格。
- **建议修复**: 创建缺失的 style 文件，或将引用改为实际存在的文件（如 `cny-festive-red.md`）。
- **状态**: `已修复` — festive-gamify → cny-festive-red; racing-premium 列已移除

#### P1#8 13th-anniversary 引用不存在的 R25

- **涉及文件**: `campaign/styles/13th-anniversary-celebration.md` (行 268)
- **问题**: "遵循 R25 规则，防止 CLS 跳动"，但 rules.md 只到 R24。
- **影响**: 规则引用无效。
- **建议修复**: 如果 R25 有实际需求（CLS 防抖），在 rules.md 补充定义；否则移除引用。
- **状态**: `已修复` — 移除虚假 R25 引用，改为直接描述意图

#### P1#9 guidelines.md 间距/圆角映射不准确

- **涉及文件**: `_system/code-gen/guidelines.md` (间距映射表, 圆角映射表)
- **问题**:
  - 间距："极小" 标为 `p-2`(8px)，但 `space.xs` = 4px；"小" 标为 `p-4`(16px)，但 `space.sm` = 8px
  - 圆角："小/中/大" 标签与 Token 层级语义不匹配
- **影响**: 开发者按映射表编码时间距不对。
- **建议修复**: 按 semantic.md 的 `space.*` Token 重新对齐映射表。
- **状态**: `已修复` — 间距/圆角映射表完全重写，含 semantic Token → Tailwind 类对照

#### P1#10 guidelines.md 建议扩展 Token 与现有定义冲突

- **涉及文件**: `_system/code-gen/guidelines.md` (建议扩展的 Token)
- **问题**: 建议添加 `'accent.success': '#10B981'`，但 semantic.md 已定义 `status.success` = `#50A907`。
- **影响**: 同一语义（成功绿色）出现两个不同色值。
- **建议修复**: 移除冲突建议，或对齐 semantic.md 的 status.success 值。
- **状态**: `已修复` — 建议扩展 Token 对齐 semantic.md（st-ok:#50A907, st-warn:#FFB020, st-err:#E54545）

---

### P2 — 建议（缺失内容影响生成质量）

#### P2#11 component.md 缺失常用组件定义

- **涉及文件**: `design-system/component.md`
- **缺失组件**:
  - **Countdown（倒计时）**: semantic.md 已有 5 个 countdown Token，但无组件规格
  - **Tab**: semantic.md 已有 `tab.default` Token，但无组件定义
  - **Badge/标签**: 多个 style 使用，无统一规格
  - **Table（完整版）**: semantic.md 有 table Token，但 component.md 无表格组件
  - **Tooltip/Popover**: 常用但缺失
  - **Skeleton/加载态**: 无定义
- **建议修复**: 按 component.md 现有格式补充上述组件的属性表。
- **状态**: `已补全` — 新增 Countdown/Tab/Badge/Table 四个组件定义（含活动页变体）

#### P2#12 缺失响应式排版映射

- **涉及文件**: `design-system/semantic.md` (排版章节)
- **问题**: Token 定义单一字号（如 `display.large.campaign` = 60px），但实际使用需多断点适配（如 32px → 48px → 60px）。
- **建议修复**: 在排版 Token 中增加响应式变体列，或在 style 模板中标准化响应式排版定义方式。
- **状态**: `待补全`

#### P2#13 缺失动效/过渡 Token

- **涉及文件**: `design-system/primitive.md`, `design-system/semantic.md`
- **问题**: 有 shadow/opacity Token，但无 duration、easing、transform 等动效 Token。guidelines.md 引用了具体动效值但未 Token 化。
- **建议修复**: 在 primitive.md 添加 `duration.*`、`easing.*` Token，semantic.md 添加语义动效映射。
- **状态**: `待补全`

#### P2#14 缺失 z-index Token

- **涉及文件**: Token 体系整体
- **问题**: 13th-anniversary 使用 z-55、z-60 等具体值，但无 z-index 层级 Token。
- **建议修复**: 在 primitive.md 添加 `zIndex.*` Token（如 overlay: 50, modal: 60, toast: 70）。
- **状态**: `待补全`

#### P2#15 primitive.md 缺少 fontSize.9xl

- **涉及文件**: `design-system/primitive.md`, `campaign/styles/competition.md`
- **问题**: competition.md 引用 `fontSize.9xl` (72px)，但 primitive.md 字号只到 `fontSize.8xl` (60px)。
- **建议修复**: 在 primitive.md 追加 `fontSize.9xl: 72px`。
- **状态**: `已补全`

#### P2#16 _system/calibrate/figma.md 是空壳文件

- **涉及文件**: `_system/calibrate/figma.md`
- **问题**: SKILL.md 文件索引列出为活跃文件，但只有"未来扩展"占位内容。
- **建议修复**: 补充内容，或在 SKILL.md 文件索引中标注为"计划中"。
- **状态**: `已标注` — SKILL.md 文件索引中标注为"计划中"

#### P2#17 _system/calibrate/webpage.md 内容过薄

- **涉及文件**: `_system/calibrate/webpage.md`
- **问题**: 仅 47 行，缺少对 SPA/CSR 动态渲染页面的处理指南，未提及 MCP 浏览器工具。
- **建议修复**: 补充动态页面抓取方案和工具使用说明。
- **状态**: `待补全`

#### P2#18 SKILL.md 步骤 8.5 最小读取集遗漏

- **涉及文件**: `SKILL.md` (步骤 8.5)
- **问题**: Phase 2 (Next.js 转换) 必读列表缺少 `_system/icons/common.md`，但图标替换（R16/R17）是 Phase 2 核心任务。
- **建议修复**: 在 Phase 2 必读列表中加入 `_system/icons/common.md`。
- **状态**: `已修复`

#### P2#19 输出路径约定不统一

- **涉及文件**: `_system/code-gen/guidelines.md`, `campaign/styles/13th-anniversary-celebration.md`
- **问题**: guidelines.md 指定 Phase 1 输出到 `ui-craft-md/<name>.html`，但 13th-anniversary 源文件在 `campaign/styles/sources/`。
- **建议修复**: 统一输出路径约定，建议使用 `campaign/styles/sources/` 作为标准位置并更新 guidelines.md。
- **状态**: `已修复` — 统一为 campaign/styles/sources/<name>.html

---

### 审计统计

| 优先级 | 数量 | 核心影响 |
|--------|------|---------|
| **P0 严重** | 4 | 代码不可用 / 颜色冲突 / 对比度不达标 |
| **P1 重要** | 6 | 引用失效 / 编号错位 / 映射不准确 |
| **P2 建议** | 9 | Token 缺失 / 组件未定义 / 文件空壳 |
| **合计** | **19** | |

### 修复优先级建议

```
第一批（阻断性）: P0#1 → P0#4 → P0#2 → P0#3
第二批（一致性）: P1#5 → P1#7 → P1#8 → P1#9 → P1#10 → P1#6
第三批（完善度）: P2#11 → P2#12 → P2#15 → P2#18 → P2#19 → 其余 P2
```

---

<!-- 下一次审计在此下方追加新条目，格式同上 -->
