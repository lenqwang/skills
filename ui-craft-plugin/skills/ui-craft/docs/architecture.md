# UI-CRAFT v3 架构图

> 系统全貌的可视化参考。ASCII 框图，任何环境可读。

---

## 1. 三层架构总览

```
┌─────────────────────────────────────────────────────────────────────┐
│  L0  契约层  contract/                                [不可覆盖]    │
│  ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────────┐ │
│  │ rules.md         │ │ design-contract  │ │ verification-proto   │ │
│  │ R1-R30 强制规则  │ │ 视觉情绪·品牌调性│ │ 3-Pass 验证管线      │ │
│  └──────────────────┘ └──────────────────┘ └──────────────────────┘ │
├────────────────────────────── ▼ 约束 ──────────────────────────────┤
│  L1  域层  domains/                        [域自治·组件内聚]       │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌───────────┐ │
│  │ campaign/    │ │ exchange/    │ │ web3pay/     │ │ _platform/│ │
│  │ primitive.md │ │ primitive.md│ │ primitive.md│ │primitive  │ │
│  │ semantic.md  │ │ semantic.md │ │ semantic.md │ │semantic.md│ │
│  │ styles/ 9个  │ │ domain.md   │ │ domain.md   │ │ 共享基座  │ │
│  │ layout.md    │ │ layout.md   │ │ layout.md   │ │ layout.md │ │
│  │ components/  │ │ components/ │ │ components/ │ │components/│ │
│  │  14 个       │ │  18 个      │ │  25 个      │ │ 20 个共享 │ │
│  └──────────────┘ └──────────────┘ └──────────────┘ └───────────┘ │
├────────────────────────────── ▼ 约束 ──────────────────────────────┤
│  L2  工程层  engine/                              platforms/       │
│  ┌────────────────┐ ┌──────────┐ ┌──────────┐  ┌───────────────┐ │
│  │ workflows/     │ │ code-gen │ │ calibrate│  │ web.md        │ │
│  │ generate·cal·  │ │ 代码生成 │ │ 视觉校准 │  │ app.md        │ │
│  │ patch          │ │ 规范     │ │          │  │ (正交于业务线)│ │
│  └────────────────┘ └──────────┘ └──────────┘  └───────────────┘ │
└─────────────────────────────────────────────────────────────────────┘

层间规则：上层约束下层，下层不可覆盖上层
```

---

## 2. Token 流转链

```
  Figma 设计稿               L1 域层 primitive             L1 域层 semantic
 ┌──────────┐    提取    ┌──────────────────────┐    绑定    ┌───────────────────┐
 │  Figma   │ ─────────→ │ domains/{domain}/   │ ────────→ │ domains/{domain}/ │
 │Variables │            │  primitive.md        │           │  components/*.md  │
 │ (真值源) │            │  #0055FF → blue.500  │           │                   │
 └──────────┘            │  #1F2023 → gray.925  │           │ action.primary    │
                         └─────────┬────────────┘           │ → var(--brand)    │
                            语义化 │                         │                   │
                                   ▼                         │ surface.default   │
                         ┌──────────────────────┐           │ → var(--bg-card)  │
                         │ domains/campaign/    │ ─────────→│                   │
                         │  semantic.md         │           └───────┬───────────┘
                         │  blue.500 → action.  │                   │
                         │    primary           │                   │
                         │  gray.925 → surface. │                   │
                         │    default           │         ┌────────┴────────┐
                         └─────────┬────────────┘         │                 │
                          平台差异 │                       ▼                 ▼
                                   ▼                 ┌───────────┐   ┌───────────┐
                         ┌──────────────────────┐   │ styles/   │   │ domain.md │
                         │ domains/_platform/   │   │ *.md      │   │ 品牌色    │
                         │  semantic.md         │   │ 风格覆盖  │   │ 覆盖      │
                         │  Exchange/Web3 字阶  │   │(Campaign) │   │(Exc/Web3) │
                         │  间距·阴影覆盖       │   └─────┬─────┘   └─────┬─────┘
                         └──────────────────────┘         │               │
                                                          └───────┬───────┘
                                                                  ▼
                                                          ┌───────────────┐
                                                          │ .page {       │
                                                          │   --brand: …  │
                                                          │   --accent: … │
                                                          │ }             │
                                                          └───────────────┘
                                                             最终 CSS 变量
```

### 覆盖优先级

```
    最高 ──→  styles/*.md 显式定义
      │
      ├───→  inherits 源 (default.md)        ← Campaign 风格继承
      │
      ├───→  domain.md 品牌色覆盖            ← Exchange/Web3 覆盖
      │
    最低 ──→  domains/{domain}/semantic.md 默认值
```

---

## 3. 业务线路由

```
                        /ui-craft --domain ? --platform ?
                                      │
              ┌───────────────────────┼───────────────────────┐
              │                       │                       │
              ▼                       ▼                       ▼
     ┌─── Campaign ───┐     ┌─── Exchange ───┐     ┌─── Web3Pay ────┐
     │                 │     │                │     │                │
     │ contract/       │     │ contract/      │     │ contract/      │
     │  rules.md       │     │  rules.md      │     │  rules.md      │
     │  rules-ext/     │     │  rules-ext/    │     │  rules-ext/    │
     │  campaign.md    │     │  platform.md   │     │  platform.md   │
     │       │         │     │       │        │     │       │        │
     │       ▼         │     │       ▼        │     │       ▼        │
     │ domains/        │     │ domains/       │     │ domains/       │
     │  campaign/      │     │  _platform/    │     │  _platform/    │
     │  semantic.md    │     │  semantic.md   │     │  semantic.md   │
     │  layout.md      │     │  layout.md     │     │  layout.md     │
     │       │         │     │       │        │     │       │        │
     │       ▼         │     │       ▼        │     │       ▼        │
     │  styles/        │     │ domains/       │     │ domains/       │
     │  {name}.md      │     │  exchange/     │     │  web3pay/      │
     │       │         │     │  domain.md     │     │  domain.md     │
     │       ▼         │     │  layout.md     │     │  layout.md     │
     │  components/    │     │       │        │     │       │        │
     │  14 个自治组件  │     │       ▼        │     │       ▼        │
     └─────────────────┘     │  components/   │     │  components/   │
                             │  18 个专属组件 │     │  25 个专属组件 │
                             └────────────────┘     └────────────────┘
                                      │                       │
                              ┌───────┴───────────────────────┘
                              │
                              ▼
                   ┌─────────────────────┐
                   │ platforms/ (正交)   │
                   │ ┌───────┐ ┌──────┐ │
                   │ │web.md │ │app.md│ │
                   │ └───────┘ └──────┘ │
                   └─────────────────────┘
```

---

## 4. Style 继承机制 (Delta)

```
  domains/{domain}/semantic.md (域默认值)
  ┌──────────────────────────────────────────┐
  │ --bg: #070808        --brand: #0068FF    │
  │ --bg-card: #1F2023   --accent: #A7F757   │
  │ --text-primary: #FAFAFA   ...            │
  └────────────────────┬─────────────────────┘
                       │
          ┌────────────┼─────────────────────────────┐
          │            │                              │
          ▼            ▼                              ▼
  default.md     继承全部默认值               cny-festive-red.md
  (基础风格)     无额外覆盖                  (inherits: none)
          │                              ┌─────────────────────┐
          │                              │ 完整独立定义         │
    ┌─────┴──────┐                       │ 不继承任何 style    │
    │            │                       │ 所有变量显式声明    │
    ▼            ▼                       │ --bg: #1A0000       │
                                         │ --accent: #FF3333   │
  competition.md          vip-warm-elite.md         │ ...                  │
  (inherits: default)     (inherits: default)       └─────────────────────┘
  ┌────────────────────┐  ┌────────────────────┐
  │ 仅列差异项:        │  │ 仅列差异项:        │
  │                    │  │                    │
  │ --bg: #0D0D0D  [覆盖]│  │ --bg-card: #1A1410 [覆盖]│
  │ --accent: #DAA520 [覆盖]│  │ --accent: #C8956C [覆盖]│
  │ --rank-gold: #DAA520 [新增]│  │ --bg-warm: #2A1F14 [新增]│
  │                    │  │                    │
  │ 其余变量 ← 自动    │  │ 其余变量 ← 自动    │
  │   继承 default     │  │   继承 default     │
  └────────────────────┘  └────────────────────┘

  最小变量集(不可 unset): --bg  --bg-card  --text-primary  --text-secondary  --brand  --border
```

---

## 5. 工作流管线

```
  输入                     Workflow 路由              处理流程
 ┌──────────────────┐     ┌──────────────┐
 │ --style name     │────→│              │     ┌──────────────────────────────┐
 │ --preview comp   │────→│ generate.md  │────→│ 步骤 0: 加载规则             │
 │ --new-component  │────→│              │     │   contract/                  │
 │ --new-style      │────→│              │     │         │                    │
 │ --ds status      │────→│              │     │         ▼                    │
 └──────────────────┘     └──────────────┘     │ 步骤 1-5: 需求→合并 Token   │
                                               │         │                    │
 ┌──────────────────┐     ┌──────────────┐     │         ▼                    │
 │ --calibrate      │────→│ calibrate.md │     │ 步骤 6-8: 生成设计→输出 HTML │
 │   url/img        │     └──────┬───────┘     │         │                    │
 └──────────────────┘            │             │         ▼                    │
                                 │             │ 步骤 8.5: Figma 交付         │
 ┌──────────────────┐     ┌──────────────┐     │   localhost → localtunnel    │
 │ --patch html     │────→│              │     │         │                    │
 │ --css-patch      │────→│ patch.md     │     │         ▼                    │
 │ --review-fix     │────→│              │     │ 步骤 9: 强制验证             │
 └──────────────────┘     └──────┬───────┘     └──────────┬───────────────────┘
                                 │                        │
                                 │                        ▼
                                 │             ┌──────────────────────────────┐
                                 │             │       3-Pass 验证            │
                                 │             │                              │
                                 │             │  Tool Pass ──→ AI Pass 1     │
                                 │             │  ESLint/       语义扫描      │
                                 │             │  Stylelint     14 条         │
                                 │             │  7 条     ──→ AI Pass 2     │
                                 │             │               修复循环       │
                                 │             └──────────┬───────────────────┘
                                 │                        │
                                 ▼                        ▼
                          ┌────────────────────────────────────────────┐
                          │                  产物                      │
                          │                                            │
                          │  ui-craft-workspaces/{domain}/pages/   ← --style  │
                          │  ui-craft-workspaces/{domain}/preview/ ← --preview│
                          │  src/pages/ + components/ ← --to-next     │
                          │  styles/{name}.md         ← --calibrate   │
                          └────────────────────────────────────────────┘
```

---

## 6. 协作流程

```
  产品 (PM)              设计师 (UI)               前端 + AI (FE)
     │                       │                          │
     │  1. 提需求+选风格     │                          │
     │ ─────────────────────→│                          │
     │                       │                          │
     │                       │ 2. 创建/更新 style       │
     │                       │    domains/campaign/     │
     │                       │    styles/{name}.md      │
     │                       │                          │
     │                       │  3. 交付 style+组件规格  │
     │                       │ ────────────────────────→│
     │                       │                          │
     │                       │                 4. 加载 contract/
     │                       │                 5. 加载 style + domains/*/components/
     │                       │                 6. 生成 HTML
     │                       │                 7. 执行 3-Pass 验证
     │                       │                          │
     │                       │  8. 交付预览 HTML        │
     │                       │ ←────────────────────────│
     │                       │                          │
     │                       │ 9. L1-L4 校准验收        │
     │                       │    L1 色彩  (0 差异)     │
     │                       │    L2 布局  (≤1 差异)    │
     │                       │    L3 组件  (≤2 差异)    │
     │                       │    L4 动效  (≤2 差异)    │
     │                       │                          │
     │               ┌───────┴──────────────────────────┤
     │               │    校准循环 (最多 3 轮)          │
     │               │                                  │
     │               │  10. 反馈差异                    │
     │               │ ────────────────────────────────→│
     │               │                 11. 修正→重新生成│
     │               │  12. 交付修正版                  │
     │               │ ←────────────────────────────────│
     │               └───────┬──────────────────────────┤
     │                       │                          │
     │  13. 设计验收通过     │                          │
     │ ←────────────────────│                          │
     │                       │                          │
     │ 14. 业务验收          │                          │
     │   (文案/数据/交互)    │                 15. --to-next 转 Next.js
     │                       │                          │
```

---

## 7. 域组件分布

```
  domains/
  ├── campaign/components/              14 个自治组件
  │   │
  │   │  button   card   modal   input   table   tag   misc
  │   │  hero     lottery-grid   rank-list   progress-bar
  │   │  countdown   mystery-box   rules-faq
  │   │
  │   └── 完全自包含，不依赖其他域
  │
  ├── _platform/components/             20 个共享组件 (Exchange + Web3Pay)
  │   │
  │   │  button   input   modal   table   tag   progress-bar
  │   │  coin-title    number-view    table-v5    checkbox
  │   │  divider       switch         loading     toast
  │   │  tooltip       empty-state    tabs        pagination
  │   │  badge         header-footer
  │   │
  │   └── Exchange 和 Web3Pay 共同继承
  │
  ├── exchange/components/              18 个专属组件
  │   │
  │   │  trade-panel    order-book        chart          market-ticker
  │   │  trader-card    portfolio-summary  segmented-control
  │   │  announcement-banner  filter-chip  activity-ticker
  │   │  countdown-timer  glass-button  gradient-cta  hot-tag
  │   │  promo-tag  reward-badge  section-header  status-badge
  │   │  (+ 继承 _platform/ 20 个共享组件)
  │   │
  │   ├── business/                     业务子域（Booster / Rewards Hub / GateRouter）
  │   │     README.md · booster.md · rewards-hub.md · gaterouter-credits.md …
  │   │
  │   └── 仅 Exchange 业务线使用
  │
  └── web3pay/components/               25 个专属组件
      │
      │  action-menu     alert            checkbox         divider
      │  gt-halo-button  manage-wallet    network-picker   notification
      │  pay-b-button    pay-b-filter     pay-b-header     pay-b-loading
      │  pay-b-pagination  pay-b-sidebar  pay-b-steps-anchor
      │  pay-b-table     pay-b-tag        select-token     selector
      │  switch          tab              timepicker       tooltip
      │  pay-b-input     pay-b-modal
      │
      ├── business/pay-b/                 Pay-B 业务延展（对齐 exchange/business）
      │     patterns/   docs/   components/website/
      │
      └── 仅 Web3/Pay 业务线使用

  组件物理位置即归属，无需 scope 标注
```

---

## 8. 文件依赖关系

```
  contract/rules.md (R1-R30)
     │
     ├──→ rules-ext/campaign.md
     ├──→ rules-ext/platform.md
     └──→ verification-protocol.md ─────────────────────────────┐
                                                                 │
  domains/{domain}/primitive.md (每域自带)                        │
     │                                                           │
     ▼                                                           │
  domains/campaign/semantic.md ─────────────────────────┐         │
     │                                                  │         │
  domains/_platform/semantic.md                         │         │
     │                                                  │         │
     ▼                                                  │         │
  domains/*/components/*.md                              │         │
     │                                                  │         │
     ├──→ domains/_platform/layout.md                  │         │
     │        │                                         │         │
     │        ├──→ domains/campaign/layout.md          │         │
     │        │        │                                │         │
     │        │        ▼                                │         │
     │        │   styles/default.md ◄──────────────────┘         │
     │        │        │                                          │
     │        │        ├──→ competition.md  (inherits: default)  │
     │        │        └──→ vip-warm-elite.md (inherits: default)│
     │        │                                                   │
     │        │   cny-festive-red.md (inherits: none) ◄── semantic.md
     │        │                                                   │
     │        ├──→ _platform/platform.md + platform-layout.md    │
     │        │        │                                          │
     │        │        ├──→ exchange/domain.md + layout.md       │
     │        │        └──→ web3pay/domain.md + layout.md        │
     │        │                                                   │
     └────────┴────────────────────┐                              │
                                   ▼                              │
                          engine/workflows/generate.md ◄──────────┘
                                   │
                                   ▼
                          engine/code-gen/guidelines.md
```
