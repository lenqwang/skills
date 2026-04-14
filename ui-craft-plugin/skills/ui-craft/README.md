# UI Craft Skill

通过多层约束设计体系生成符合 Gate.io 品牌规范的高质量 UI。
支持三条业务线（Campaign / Exchange / Web3Pay）和两个平台（Web / App）。

## 快速开始

```bash
/ui-craft                                          # 交互式（默认，Campaign Web）
/ui-craft --style <name>                           # 指定风格生成页面 HTML
/ui-craft --domain exchange --platform web         # Exchange Web 端
/ui-craft --domain web3pay --platform app          # Web3/Pay App 端
/ui-craft --preview <component>                    # 组件预览
/ui-craft --calibrate <url|image>                  # 校准模式
/ui-craft --to-next <html-file>                    # HTML → Next.js 转换
/ui-craft --ds status                              # 设计系统仪表盘
/ui-craft --new-component <name>                   # 新建组件规格草案
/ui-craft --new-style <name>                       # 新建风格脚手架
```

## 命令一览

### 生成命令

| 命令 | 说明 | 产物路径 |
|------|------|----------|
| `--style <name>` | 基于风格生成完整页面 HTML | `ui-craft-workspaces/{domain}/pages/<name>.html` |
| `--domain <name>` | 指定业务线（campaign/exchange/web3pay） | — |
| `--platform <name>` | 指定平台（web/app） | — |
| `--preview <component>` | 单组件预览 | `ui-craft-workspaces/{domain}/preview/<component>.html` |
| `--calibrate <url\|image>` | URL / 截图 → Style 生成 | `domains/campaign/styles/<name>.md` |
| `--to-next <html>` | HTML 转 Next.js 生产代码 | `src/pages/` + `src/components/` |

### 设计系统管理

| 命令 | 说明 | 产物路径 |
|------|------|----------|
| `--ds status` | 设计系统仪表盘（Sidebar + Mini Preview 卡片） | `ui-craft-workspaces/ds-status.html` |
| `--new-component <name>` | 创建组件规格草案 | `domains/{domain}/components/<name>.md` |
| `--new-style <name>` | 从模板创建风格脚手架 | `domains/campaign/styles/<name>.md` |

## 目录结构

```
ui-craft/
├── SKILL.md
├── README.md
├── figma-registry.md
│
├── contract/                          # 契约层
│   ├── rules.md / design-contract.md
│   ├── verification-protocol.md / feedback-loop.md
│   └── rules-ext/                     #   扩展规则
│
├── domains/                           # 业务层（每域自包含）
│   ├── _platform/                     #   Exchange+Web3 共享基座
│   │   ├── semantic.md / platform.md / platform-layout.md / layout.md
│   │   └── components/                #     共享组件（20 个）
│   ├── campaign/                      #   活动线（无并列 campaign-web）
│   │   ├── semantic.md / domain.md / layout.md
│   │   ├── components/                #     Campaign 组件（14 个）
│   │   └── styles/                    #     风格变体
│   ├── exchange/                      #   交易所（无并列 exchange-web）
│   │   ├── domain.md / layout.md
│   │   ├── components/                #     Exchange 专属（18 个）
│   │   ├── styles/                    #     如 personal-center
│   │   └── business/                  #     Booster / Rewards Hub / GateRouter（README 索引）
│   └── web3pay/                       #   Web3/Pay
│       ├── domain.md / layout.md / responsive.md
│       ├── components/                #     Web3/Pay 专属（25 个）
│       ├── styles/                    #     Pay B端风格
│       └── business/pay-b/            #     Pay-B 业务延展
│
├── engine/                            # 工程层
│   ├── code-gen/ / calibrate/
│   ├── reference/ / workflows/
│
├── platforms/                         # Web/App
│   ├── web.md
│   └── app.md
└── docs/                              # 文档
```

## 业务线路由

```
contract/ → domains/{domain}/ → platforms/{platform} → engine/
```

- 未指定 `--domain` 时默认 `campaign`
- 未指定 `--platform` 时默认 `web`
- `--style` 仅在 `--domain campaign` 时可用

## 已有风格（Campaign）

| 风格 | 适用场景 |
|------|----------|
| `default` | 通用活动页 |
| `competition` | 交易竞赛 / 排行榜活动 |
| `vip-warm-elite` | VIP 专属活动（暖色调） |
| `vip-gold-prestige` | VIP 尊享（金色系） |
| `cny-festive-red` | 春节 / 节庆活动 |
| `ai-product-landing` | AI 产品落地页 |
| `dev-portal` | 开发者门户 |
| `13th-anniversary-celebration` | 13 周年庆 |
| `gate-ai-clean` | Gate AI 清爽风 |

## 业务组件开发流程

```
Step 1  创建规格草案      domains/{domain}/components/xxx.md，标题标注 [DRAFT]，scope 声明适用域
Step 2  生成预览          /ui-craft --preview xxx → ui-craft-workspaces/{domain}/preview/xxx.html
Step 3  迭代验证          修改规格 → --preview 重新生成 → 浏览器验证 → 循环
Step 4  定稿              去掉 [DRAFT]
Step 5  整页预览          /ui-craft --style xxx，组件嵌入页面上下文验证
```

## 相关文档

- [架构图](./docs/architecture.md) — 五层架构、Token 流转、业务线路由、Style 继承、协作流程
- [设计契约](./contract/design-contract.md) — "什么算精美"
- [强制规则](./contract/rules.md) — 全局强制规则 + severity/check/fix
- [验证管线](./contract/verification-protocol.md) — 3-Pass 验证
- [域 primitive](./domains/) — 每域自带原始色板 + [域 Token](./domains/) — 设计 Token 体系
- [代码生成规范](./engine/code-gen/guidelines.md) — Phase 1 HTML + Phase 2 Next.js
- [组件预览规范](./engine/code-gen/component-preview.md) — `--preview` 命令
- [设计系统仪表盘](./engine/code-gen/ds-status.md) — `--ds status` 命令
- [视觉校准](./engine/calibrate/) — URL / 截图 → Style
- [Figma 注册表](./figma-registry.md) — 组件 ↔ Figma 节点 ID 映射
- [设计师快速上手](./docs/designer-quickstart.md) — 面向设计师的操作指南
- [风格目录](./domains/campaign/styles/README.md) — 风格文件规范
