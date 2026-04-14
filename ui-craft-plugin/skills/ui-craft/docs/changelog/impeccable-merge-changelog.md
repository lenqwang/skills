# Impeccable 融合变更总结

> 日期：2026-03-11
> 来源：Impeccable Skills 体系（18 个设计质量 skill + 7 份参考文档）
> 目标：补充 ui-craft 在设计质量评估、反 AI 味检测、交互完整度、文案质量方面的不足

---

## 变更概览

| 类型 | 数量 | 说明 |
|------|------|------|
| 新增文件 | 4 | engine/reference/ 目录 3 个 + audit-protocol 1 个 |
| 新增规则 | 2 | R29 反 AI 模式化 + R30 UX 文案质量 |
| 修改文件 | 14 | 规则/验证/组件/代码生成/校准/索引等 |
| 全局引用同步 | 所有活跃文件 | R1-R27 → R1-R30 |

---

## 一、新增文件（4 个）

### 1. `engine/reference/ux-writing.md` — UX 文案指南

- **来源**: Impeccable reference/ux-writing.md，适配 Gate.io 品牌调性
- **内容**: 9 个场景分类（CTA 按钮 / 错误信息 / 空状态 / 加载状态 / 成功状态 / 确认对话框 / 表单 / 数值金额 / 时间日期）
- **核心规则**: CTA = 动词+目标 / 错误 = 发生了什么+为什么+怎么解决 / 空状态 = 引导机会
- **附加**: Voice/Tone 规范 + i18n 注意事项 + R30 检查清单
- **用途**: R30 的原理支撑文档

### 2. `engine/reference/interaction-states.md` — 8 种交互状态标准

- **来源**: Impeccable reference/interaction-design.md，适配 Gate.io Token 体系
- **内容**: 8 种状态定义（default / hover / focus-visible / active / disabled / loading / error / success）
- **按组件**: Button / Input / Card / Link 各自的状态矩阵
- **附加**: Focus 管理（focus-visible vs focus / Tab 顺序 / Skip Link）/ 弹窗交互流程 / 加载策略 / 触摸适配 / 减弱动效
- **用途**: 组件规格的补充参考

### 3. `engine/reference/motion-principles.md` — 动效原理

- **来源**: Impeccable reference/motion-design.md
- **内容**: 时长分层规则（100/200-300/300-500ms）/ 缓动函数推荐（指数缓动）/ 6 种常见动效模式代码 / 性能规则（可动画属性白名单）/ will-change 使用规则 / prefers-reduced-motion 处理
- **用途**: R29 动效部分 + primitive.md Token 的原理支撑

### 4. `contract/audit/audit-protocol.md` — 7 维度设计质量评审框架

- **来源**: Impeccable audit + critique skills 融合
- **内容**: 7 个评审维度（视觉层次 / 反 AI 模式 / 空间节奏 / 色彩平衡 / 动效意图 / 文案质量 / 品牌调性）
- **评分**: 强/中/弱 三级，附结构化输出模板
- **定位**: 验证管线检查"对不对"，本框架评估"好不好"

---

## 二、新增规则（2 条）

### R29: 反 AI 模式化设计 [W]

**文件**: `contract/rules.md`

4 类反模式清单：
- **颜色**: 青色+暗背景、紫蓝渐变、霓虹发光、纯黑白无色温、glassmorphism 滥用
- **布局**: 千篇一律卡片网格、大圆角图标堆叠、嵌套卡片 >2 层、纯装饰 sparkline
- **排版**: 渐变文字用于普通数据、等宽字体当"科技感"、AI 默认字体
- **动效**: bounce/elastic 缓动、animate layout properties、滥用 will-change

### R30: UX 文案质量 [W]

**文件**: `contract/rules.md`

- CTA: 动词+目标（"领取奖励" ✅ / "确定" ❌）
- 错误: 发生了什么+为什么+怎么解决
- 空状态: 引导机会，非死胡同
- 禁止: 错误中用幽默、冗余文案、模糊状态描述

---

## 三、修改文件详情（14 个）

### contract/rules.md
- 新增 §12 设计质量分类（R29 + R30）
- 自检清单新增"设计质量"区块

### contract/verification-protocol.md
- Pass 1 扫描表新增 #20（AI 模式化检测）和 #21（UX 文案质量）
- Phase 2 检查项数 18 → 21

### contract/design-contract.md
- 不可覆盖规则引用 R1-R27 → R1-R30（2 处）

### engine/code-gen/guidelines.md
- 新增 §5 减弱动效支持（Phase 1 HTML + Phase 2 CSS Modules 代码模板）
- 原 §5 图标 → §6
- Phase 1 检查清单新增 3 项（减弱动效 / 文案质量 / 反 AI 模式）
- Phase 2 检查清单新增 3 项（同上）
- Phase 2 转换规则引用 R1-R27 → R1-R30

### domains/campaign/components/button.md
- 新增"交互状态矩阵"章节（Primary/Neutral + CTA/Accent CTA）

### domains/campaign/components/card.md
- 新增"交互状态矩阵（可交互卡片）"章节 + 规则说明

### domains/campaign/components/input.md
- 新增"交互状态矩阵"章节（6 种状态）+ 表单验证规则

### domains/campaign/components/modal.md
- 新增"交互行为规范"章节（打开/关闭流程 / 关闭按钮 / 确认对话框规则）

### engine/calibrate/screenshot.md
- 新增 L5 设计质量评估层（6 项检查 + 通过条件 + YAML 记录模板）
- 校准优先级更新：L1→L2→L3→L4→L5

### SKILL.md
- 文件索引新增 4 个文件条目
- 步骤 8.5 最小读取集新增 reference 文档加载规则
- L1-L4 → L1-L5
- 规则变更日志追加 7 条记录
- 全局 R1-R27 → R1-R30

### RESPONSIBILITY.md
- FE 职责"共 27 条" → "共 30 条"
- 全局 R1-R27 → R1-R30

### README.md
- 全局 R1-R27 → R1-R30

### domains/campaign/styles/README.md
- 全局 R1-R27 → R1-R30（已在之前的会话中完成）

### domains/campaign/styles/*.md（6 个 style 文件）
- default / competition / ai-product-landing / cny-festive-red / vip-gold-prestige / vip-warm-elite / dev-portal
- 全局 R1-R27 → R1-R30

---

## 四、未采纳项（及原因）

| Impeccable 内容 | 原因 |
|----------------|------|
| `{{model}}`/`{{config_file}}` 多平台编译 | ui-craft 锁定 Claude，不需要 |
| `teach-impeccable` 初始化收集 | ui-craft 已有完整品牌上下文 |
| `normalize` 对齐设计系统 | ui-craft 的 Token 体系本身就是规范 |
| `extract` 提取组件 | ui-craft 已有 components/ 定义流程 |
| `onboard` 引导流程 | 优先级低，Gate 活动页场景较少涉及 |
| OKLCH 色彩空间 | 色板来自 Figma 设计团队，迁移成本大 |
| `--refine` 迭代指令 | 实现成本高，作为 V2 功能规划 |

---

## 五、体系架构变化

### 变更前（v2 路径，现已迁移至 v3 Domain-First 架构）

```
contract/   → rules (R1-R28) + verification (19 项扫描) + feedback-loop
tokens/ → 4 层 Token + 组件规格（纯属性表）  [v3: 已移至 domains/*/]
engine/calibrate/  → L1-L4 校准
engine/code-gen/   → Phase 1 HTML + Phase 2 Next.js
audit/      → audit-log（历史记录）
```

### 变更后（v3 路径）

```
contract/   → rules (R1-R30) + verification (21 项扫描) + feedback-loop
domains/*/  → 每域自包含 primitive + semantic + components（属性表 + 交互状态矩阵）
engine/calibrate/  → L1-L5 校准（新增 L5 设计质量）
engine/code-gen/   → Phase 1 HTML + Phase 2 Next.js + 减弱动效模板
contract/audit/    → audit-log + audit-protocol（7 维度评审框架）
engine/reference/  → ux-writing + interaction-states + motion-principles
```

### 新增的质量保障层次

```
第 1 层：R1-R30 合规扫描（验证管线，自动，必须）
第 2 层：L1-L5 校准对比（校准循环，半自动，推荐）
第 3 层：7 维度设计评审（审计框架，人工判断，可选）
```

---

## 六、文件树变化

```diff
 ui-craft/
 ├── contract/audit/
 │   ├── audit-log.md
+│   └── audit-protocol.md          # 7 维度设计质量评审
 ├── engine/calibrate/
 │   ├── screenshot.md              # +L5 设计质量评估
 │   └── ...
 ├── engine/code-gen/
 │   └── guidelines.md              # +§5 减弱动效 / +检查清单项
 ├── contract/
 │   ├── rules.md                   # +R29 反 AI 模式 / +R30 UX 文案
 │   ├── verification-protocol.md   # +#20 #21 扫描项
 │   └── ...
 ├── domains/                          # v3: 每域自包含
 │   ├── campaign/components/
 │   │   ├── button.md              # +交互状态矩阵
 │   │   ├── card.md                # +交互状态矩阵
 │   │   ├── input.md               # +交互状态矩阵
 │   │   └── modal.md               # +交互行为规范
+├── engine/reference/                 # 新增目录
+│   ├── ux-writing.md              # UX 文案指南
+│   ├── interaction-states.md      # 8 种交互状态标准
+│   └── motion-principles.md       # 动效原理
 ├── SKILL.md                       # +索引 / +最小读取集 / +变更日志
 ├── RESPONSIBILITY.md              # R1-R30 计数修正
 └── README.md                      # 引用同步
```
