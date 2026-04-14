---
name: ui-craft
description: 通过分层约束体系生成符合 Gate.io 品牌规范的 UI，支持多业务线（Campaign/Exchange/Web3）、多平台（Web/App）、多风格扩展和视觉校准
triggers:
  - "/ui-craft"
  - 用户请求生成页面或组件
  - 用户提及"设计系统"或"生成 UI"
  - 用户要求校准设计
  - 用户要求预览组件规范
  - 用户要求增量更新/补丁 HTML 到 Next.js 代码
  - 用户提及"UI 走查"或"走查修复"
---

# UI Craft — Gate UI 生成器

> 基于 Gate.io 设计规范，通过 3 层约束体系（契约→域（tokens+components+layout）→工程）确保输出的可重现性和品牌一致性。
> 支持三条业务线（Campaign / Exchange / Web3Pay）和两个平台（Web / App）。

---

## 命令格式

```bash
/ui-craft --domain <campaign|exchange|web3pay> [--platform <web|app>] [--style <name>] [其他参数]
```

- 未指定 `--domain` 时，默认 `campaign`
- 未指定 `--platform` 时，默认 `web`
- `--style` 仅在 `--domain campaign` 时可用

---

## Workflow 路由

> 每个命令映射到一个 workflow 文件，AI 只需加载对应 workflow 即可执行。

| 命令 | Workflow | 说明 |
|------|----------|------|
| `/ui-craft --style <name>` | [generate.md](./engine/workflows/generate.md) | 标准生成（HTML） |
| `/ui-craft --domain <d>` | [generate.md](./engine/workflows/generate.md) | 业务线生成 |
| `/ui-craft --to-next <html>` | [generate.md](./engine/workflows/generate.md) #phase-2 | HTML → Next.js |
| `/ui-craft --calibrate <url/img>` | [calibrate.md](./engine/workflows/calibrate.md) | 视觉校准 |
| `/ui-craft --patch <html>` | [patch.md](./engine/workflows/patch.md) | 增量补丁 |
| `/ui-craft --css-patch <html>` | [patch.md](./engine/workflows/patch.md) #css-patch | CSS 快速补丁 |
| `/ui-craft --review-fix` | [patch.md](./engine/workflows/patch.md) #review-fix | 走查修复 |
| `/ui-craft --preview <comp>` | [generate.md](./engine/workflows/generate.md) #preview | 组件预览 |
| `/ui-craft --new-component` | [generate.md](./engine/workflows/generate.md) #new-comp | 新建组件 |
| `/ui-craft --new-style` | [generate.md](./engine/workflows/generate.md) #new-style | 新建风格 |
| `/ui-craft --ds status` | [generate.md](./engine/workflows/generate.md) #ds-status | 设计系统仪表盘 |
| `/ui-craft` (无参数) | [generate.md](./engine/workflows/generate.md) #interactive | 交互式引导 |

---

## 3 层架构

```
L0  contract/        契约层 — 强制规则 + 验证管线（不可覆盖）
L1  domains/         业务层 — 每个域自包含 tokens + components + layout
L2  engine/          工程层 — 代码生成 + 校准 + 补丁 + 验证执行
    platforms/       平台约束 — Web/App（与业务域正交）
```

层间规则：上层约束下层，下层不可覆盖上层。

---

## 文件索引

### L0 契约层 — `contract/`

| 文件 | 用途 |
|------|------|
| [rules.md](./contract/rules.md) | 全局强制规则 R1-R30 + 自检清单 |
| [design-contract.md](./contract/design-contract.md) | 设计原则（视觉情绪、品牌调性、决策原则） |
| [verification-protocol.md](./contract/verification-protocol.md) | 3-Pass 验证管线（Tool Pass + AI 2-Pass） |
| [feedback-loop.md](./contract/feedback-loop.md) | 反馈沉淀协议 |
| [rules-ext/campaign.md](./contract/rules-ext/campaign.md) | Campaign 扩展规则 |
| [rules-ext/platform.md](./contract/rules-ext/platform.md) | Exchange+Web3 扩展规则 |


### L1 业务层 — `domains/`

> 每个域自包含 tokens + components + layout，按域整体加载。

| 目录/文件 | 用途 |
|-----------|------|
| `_platform/primitive.md` | Exchange+Web3 共享原始色板 |
| `_platform/semantic.md` | Exchange+Web3 共享基座 Token |
| `_platform/platform.md` | Exchange+Web3 平台声明 |
| `_platform/platform-layout.md` | Exchange+Web3 共享布局（4 种模式） |
| `_platform/layout.md` | 通用栅格布局 |
| `_platform/components/*.md` | Exchange+Web3 共享组件（20 个） |
| `campaign/primitive.md` | Campaign 原始色板 |
| `campaign/semantic.md` | Campaign 语义 Token |
| `campaign/domain.md` | Campaign 业务线声明 |
| `campaign/layout.md` | Campaign 活动页布局 |
| `campaign/components/*.md` | Campaign 全部组件（14 个） |
| `campaign/styles/*.md` | 风格变体（9 个 + _template） |
| `exchange/primitive.md` | Exchange 原始色板 |
| `exchange/semantic.md` | Exchange 语义 Token |
| `exchange/domain.md` | Exchange 覆盖层（品牌蓝 + 强制颜色映射） |
| `exchange/layout.md` | Exchange 布局扩展 |
| `exchange/components/*.md` | Exchange 专属组件（18 个，扁平同 campaign） |
| `exchange/styles/personal-center.md` | 个人中心/账号管理页风格（V5.1） |
| `exchange/business/README.md` | Exchange 业务层索引（Booster / Rewards Hub / GateRouter） |
| `exchange/business/booster.md` | Booster 推广计划业务规范 |
| `exchange/business/rewards-hub.md` | Rewards Hub 业务规范 |
| `exchange/business/gaterouter-credits.md` | GateRouter Credits 业务规范 |
| `exchange/business/web-app-download.md` | Web App Download 下载引导业务规范 |
| `web3pay/primitive.md` | Web3Pay 原始色板 |
| `web3pay/semantic.md` | Web3Pay 语义 Token |
| `web3pay/domain.md` | Web3/Pay 覆盖层（品牌绿） |
| `web3pay/layout.md` | Web3/Pay 布局扩展 |
| `web3pay/responsive.md` | Web3/Pay 响应式规范 |
| `web3pay/pay-b-icons.md` | Pay B端图标规范 |
| `web3pay/pay-b-modal-business.md` | Pay B端弹窗业务类型（反馈/配置/列表） |
| `web3pay/components/*.md` | Web3/Pay 组件规格（扁平，与 campaign 一致；当前 25 个） |
| `web3pay/business/pay-b/README.md` | Pay-B 业务层索引（对齐 exchange/business） |
| `web3pay/business/pay-b/patterns/*.md` | Pay-B 页面模式（列表 / 配置 / 官网） |
| `web3pay/business/pay-b/docs/interaction.md` | Pay B端交互规范 |
| `web3pay/business/pay-b/docs/v5-overrides.md` | Pay B端 V5.1 覆盖速查 |
| `web3pay/business/pay-b/docs/ux-writing.md` | Pay-B UX 文案词汇表 |
| `web3pay/business/pay-b/components/website/*.md` | Pay-B 官网专属组件 |
| `web3pay/styles/pay-b-default.md` | Pay B端默认风格 |

### 平台约束 — `platforms/`

| 文件 | 用途 |
|------|------|
| [web.md](./platforms/web.md) | Web 平台约束 + 专属组件列表 |
| [app.md](./platforms/app.md) | App 平台约束 + 专属组件列表 |

### L2 工程层 — `engine/`

| 文件 | 用途 |
|------|------|
| `workflows/generate.md` | 生成流程（步骤 0-9 + Figma 交付） |
| `workflows/calibrate.md` | 校准流程（URL/截图 → Style） |
| `workflows/patch.md` | 补丁流程（--patch / --css-patch / --review-fix） |
| `code-gen/guidelines.md` | 代码生成规范（Phase 1 HTML + Phase 2 Next.js） |
| `code-gen/component-preview.md` | 组件预览生成规范 |
| `code-gen/patch-workflow.md` | 增量补丁工作流 |
| `code-gen/ds-status.md` | 设计系统仪表盘生成 |
| `calibrate/*.md` | 校准管线细节（URL/截图/Figma/网页） |
| `reference/figma-design-tokens.md` | Figma 设计真值表 |
| `reference/icons.md` | @gate/iconfont 常用图标速查 |
| `reference/*.md` | UX 文案、交互状态、动效原理 |

### Figma 联动

| 文件 | 用途 |
|------|------|
| [figma-registry.md](./figma-registry.md) | 组件 ↔ Figma 节点 ID 映射表 |

---

## 加载顺序

### Campaign 域

```
/ui-craft --domain campaign --style competition
  → contract/rules.md + design-contract.md
  → contract/rules-ext/campaign.md
  → domains/campaign/semantic.md
  → platforms/web.md
  → domains/campaign/domain.md
  → domains/campaign/layout.md
  → domains/campaign/styles/competition.md
  → domains/campaign/components/*.md (按页面用到的组件按需加载)
```

### Exchange 域

```
/ui-craft --domain exchange --platform web
  → contract/rules.md + design-contract.md
  → contract/rules-ext/platform.md
  → domains/exchange/primitive.md + semantic.md
  → domains/_platform/semantic.md (共享基座)
  → domains/_platform/platform.md + platform-layout.md + layout.md
  → domains/_platform/components/*.md (共享组件)
  → platforms/web.md
  → domains/exchange/domain.md + layout.md
  → domains/exchange/components/*.md (Exchange 专属 18 个)
  → 按需: exchange/styles/personal-center.md (个人中心页面时)
  → 按需: domains/exchange/business/README.md（业务子域索引）
  → 按需: exchange/business/booster.md, exchange/business/rewards-hub.md, exchange/business/gaterouter-credits.md
```

### Web3Pay 域

```
/ui-craft --domain web3pay --platform web
  → contract/rules.md + design-contract.md
  → contract/rules-ext/platform.md
  → domains/web3pay/primitive.md + semantic.md
  → domains/_platform/semantic.md (共享基座)
  → domains/_platform/platform.md + platform-layout.md + layout.md
  → domains/_platform/components/*.md (共享组件)
  → platforms/web.md
  → domains/web3pay/domain.md + layout.md + responsive.md
  → domains/web3pay/pay-b-icons.md + pay-b-modal-business.md
  → domains/web3pay/SVG/icon-registry.md + SVG/icon-map.json（X1_fill_* 精确路径，使用图标前必读）
  → domains/web3pay/components/*.md（扁平结构同 campaign；按页面按需加载）

  【Pay-B 商户后台 / 官网 — business/pay-b 业务层，按需加载】
  → domains/web3pay/business/pay-b/README.md
  → domains/web3pay/business/pay-b/patterns/list-page.md（列表页：Pill Tabs / 工具栏 / 表格列）
  → domains/web3pay/business/pay-b/patterns/config-page.md（配置页：Banner / Tab / 安全验证）
  → domains/web3pay/business/pay-b/patterns/website-page.md（官网页模式）
  → domains/web3pay/business/pay-b/docs/interaction.md + v5-overrides.md + ux-writing.md
  → domains/web3pay/components/pay-b-sidebar.md（完整侧栏导航结构，含图标清单）
  → 按需: domains/web3pay/business/pay-b/components/website/*.md（Pay-B 官网块）
  → 按需: web3pay/styles/pay-b-default.md
```

**关键设计**: Campaign 完全不读 `_platform/`。Exchange/Web3 完全不读 `campaign/`。

---

## 与其他 Skill 的关系

| Skill | 关系 |
|-------|------|
| `ui-ux-pro-max` | UX 规则提供者（冲突时 ui-craft 规则优先） |
| `nextjs-i18n-structured` | 代码生成时遵循其 i18n 规范 |
| `html-to-next` | HTML → Next.js 高保真转换（`--to-next` 时 dispatch） |

### 优先级规则

| 优先级 | 来源 |
|--------|------|
| 最高 | ui-craft 契约层（contract/） |
| 高 | ui-craft 业务域（domains/） |
| 中 | ui-ux-pro-max 通用建议（无冲突时采用） |
| 低 | 默认值 |

---

## 规则变更日志

| 日期 | 规则 | 变更 | 来源 |
|------|------|------|------|
| 2026-03-30 | Web3Pay 域 | 废除并列 `web3pay-web/`：Pay-B 模式/文档/官网组件迁入 `web3pay/business/pay-b/`（对齐 `exchange/business`）；组件规格扁平化同 `campaign/components`；V5 覆盖与交互迁入 `business/pay-b/docs/`；加载顺序与 guard 规则已同步 | 域结构对齐 |
| 2026-03-30 | Exchange 域 | 废除并列 `exchange-web/`（与 `exchange/` 内容重复）；规范统一收敛至 `domains/exchange/`，业务延展仅保留 `exchange/business/`；新增 `business/README.md` 索引 | 域结构对齐 |
| 2026-03-30 | Campaign 域 | 废除并列 `campaign-web/`（与 `campaign/` 内容完全一致）；Campaign 的 Web 约束仅通过 `platforms/web.md` + 本域 `domain.md` 声明，不另建 `-web` 顶级域 | 域结构对齐 |
| 2026-03-26 | 契约层 | 契约层泛化重构：R1/R9/R10/R12/R13/R14/R16/R17/R29/R30 移除 Campaign 硬编码数值，改为结构性约束+域引用；design-contract.md 风格覆盖泛化；自检清单同步；移除残留 R24 引用 | 契约层域无关化 |
| 2026-03-23 | 文档 | 全量文档审计：修正组件计数（_platform 19→20, Web3Pay 13→23）、移除幽灵文件引用（design-spec-web.md, business/pay-b-components.md）、新增缺失文件（responsive.md, styles/pay-b-default.md, gaterouter-credits.md）、同步 generate.md/ds-status.md 产物计数 | 文档一致性审计 |
| 2026-03-17 | 文档 | 全量文档更新：修正组件计数（Exchange 9→18, Web3Pay 4→13）、primitive.md 位置、验证项数、层级标注、旧路径引用 | 文档一致性审计 |
| 2026-03-17 | 架构 | v3 重构：Domain-First 架构，删除顶层 tokens/ + components/，每域自包含 | 架构重构 |
| 2026-03-17 | 新增 | Exchange Booster+Rewards Hub 业务规范、Web3Pay B端商户后台规范(通用+业务+图标+交互+v5覆盖)、Exchange 强制颜色映射 | UI 设计师交付 |
| 2026-03-16 | 架构 | v2 重构：5 层目录分离、组件统一 scope、SKILL.md 路由化 | 架构重构 |
| 2026-03-11 | 新增 | `--patch` / `--css-patch` / `--review-fix` 增量补丁命令 | 开发痛点解决 |
| 2026-03-10 | 新增 R29/R30 | 反 AI 模式化 + UX 文案质量规则 | Impeccable 融合 |
| 2026-03-06 | R1-R30 | 全部规则新增 severity/check/fix 字段 | 约束工程改进 |
