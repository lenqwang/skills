# Personal Center 风格 — V5.1 个人中心

> 生成代码前必须读取 `contract/rules.md`，完整遵守 `R1-R30`。本文件只定义视觉倾向与组件偏好。
> Figma 来源: [Web个人中心 V5.1](https://www.figma.com/design/vshyZlffsvRqm0whWsoJBp/Web%E4%B8%AA%E4%BA%BA%E4%B8%AD%E5%BF%83-V5.1?node-id=1763-77143)

---

## 区块 1: 元信息

```yaml
name: personal-center
description: Exchange V5.1 个人中心/账号管理页面，适用于子账号、安全设置、身份验证、API 管理等后台管理场景
mode: light
inherits: none
source_urls:
  - https://www.figma.com/design/vshyZlffsvRqm0whWsoJBp/Web%E4%B8%AA%E4%BA%BA%E4%B8%AD%E5%BF%83-V5.1?node-id=1763-77143
extracted_at: 2026-03-25
calibrated_at: null
```

---

## 区块 2: 风格画像

- **视觉情绪**：专业、克制、高效
- **核心组件**：左侧导航栏、数据表格、筛选搜索栏、操作弹窗
- **强调方式**：品牌蓝文字链接（操作项）+ 深色中性主按钮（#303236）
- **适用标签**：`账号管理` `个人中心` `子账号` `安全设置` `API管理` `身份验证`

| 维度 | 本风格 | Exchange 默认 | 说明 |
|------|--------|--------------|------|
| 色温 | 中性偏冷 | 中性 | 白底 + 中性灰层级 |
| 信息密度 | 高 | 中 | 表格密集数据、侧栏导航 |
| 装饰程度 | 极简 | 克制 | 零装饰元素，纯功能性 UI |

---

## 区块 3: CSS 变量表

### 3.1 颜色变量

> 亮色模式。与 Exchange `domain.md` 的强制颜色映射保持一致，以下仅列出本风格需要确认的关键变量。

| 变量 | 亮色值 | 说明 |
|------|--------|------|
| `--bg` | #FFFFFF | 页面背景（纯白） |
| `--bg-secondary` | #FAFAFA | 二级背景 |
| `--bg-card` | #F5F6F7 | 卡片/输入框底色（Neutral/1-1） |
| `--bg-sidebar-active` | #F5F6F7 | 侧栏选中项背景 |
| `--text-primary` | #070808 | 主要文字（Neutral/12） |
| `--text-secondary` | #84888C | 次要文字（Neutral/6） |
| `--text-tertiary` | #A0A3A7 | 三级文字（Neutral/5） |
| `--icon-secondary` | #484B51 | 侧栏图标/非激活文字 |
| `--brand` | #0055FF | 品牌蓝（操作链接色） |
| `--btn-primary-bg` | #303236 | 主按钮背景（深中性色，非品牌蓝） |
| `--btn-primary-text` | #FFFFFF | 主按钮文字 |
| `--btn-soft-bg` | #F5F6F7 | 次按钮背景（柔和灰） |
| `--btn-soft-text` | #070808 | 次按钮文字 |
| `--border-strong` | #DFE0E2 | 表格容器边框（Neutral/3） |
| `--border-subtle` | #F2F3F4 | 表格行分割线（Neutral/2） |
| `--color-up` | #00BA7C | 涨色（表格中状态可用） |
| `--color-down` | #FF2C58 | 跌色/错误色（Rejected/ConnectFailed） |

#### 特别说明：主按钮色

V5.1 个人中心的主操作按钮（如"Create"）使用 **#303236 深中性色**，而非品牌蓝 #0055FF。
品牌蓝仅用于 **文字链接**（如 Transfer、Unfreeze、Connect 等表格行操作）和 **Deposit** 入口。
这是与 Campaign/营销页面最大的视觉差异之一。

### 3.2 渐变

> 无。本风格为纯扁平设计，不使用任何渐变。

### 3.3 圆角变量

| 变量 | 值 | 说明 |
|------|-----|------|
| `--radius-btn` | 99px | 胶囊形按钮（全场统一） |
| `--radius-card` | 12px | 表格容器/大卡片 |
| `--radius-sidebar-item` | 8px | 侧栏菜单项 |
| `--radius-input` | 6px | 输入框/下拉框 |
| `--radius-modal` | 12px | 弹窗 |

### 3.4 间距变量

| 变量 | 值 | 说明 |
|------|-----|------|
| `--space-page-top` | 72px | 内容区距页面顶部（Header 48px + 24px padding） |
| `--space-sidebar-width` | 288px | 左侧导航栏宽度 |
| `--space-content-left` | 408px | 内容区左偏移（sidebar 288px + 120px gap） |
| `--space-content-width` | 1392px | 内容区宽度 |
| `--space-section` | 24px | 标题区与表格容器间距 |
| `--space-table-padding` | 24px | 表格容器内边距 |
| `--space-table-gap` | 16px | 表格内筛选栏与表头间距 |
| `--space-sidebar-item-h` | 56px | 侧栏菜单项高度（含 padding） |
| `--space-sidebar-item-inner` | 48px | 侧栏菜单项内容区高度 |

### 3.5 排版覆盖

> V5.1 Web 字阶，字体 Switzer。

| Token | 值 | 用途 |
|-------|-----|------|
| `H5` | 28px / 600 / 1.3 | 页面主标题（Sub Accounts） |
| `S7` | 16px / 600 | 侧栏激活项文字 |
| `B3` | 16px / 500 | 侧栏默认项文字 |
| `B7` | 14px / 500 | 按钮文字、导航文字 |
| `B8` | 14px / 400 / 1.3 | 正文、表格单元格 |
| `B11` | 12px / 500 / 1.3 | 小标签（Learn more） |
| `B13` | 12px / 400 | 表格列标题 |

---

## 区块 4: 布局结构

> layout: platform.dashboard

### 结构

```
+------------------------------------------------------------------+
| Header (48px, white, backdrop-filter: blur(50px))                |
+----------+-------------------------------------------------------+
| LeftBar  |  Content Area                                         |
| 288px    |  starts at x=408, width=1392px                       |
| pt: 24px |                                                       |
|          |  +---------------------------------------------------+|
| Overview |  | Page Title (H5 28px)          [History] [Create]  ||
| Security |  | Subtitle (B8 14px)                                ||
| Identif.▾|  +---------------------------------------------------+|
|  ├Verif. |  | Table Container (border: 1px #DFE0E2, r: 12px)    ||
|  └Backup |  | ┌─ [Dropdown▾] [🔍 Search]                       ││
| ★SubAcct |  | ├─ Table Header (B13 12px, gray)                  ││
| APIs     |  | ├─ Table Rows (B8 14px)                           ││
| Voucher▾ |  | │   UID | Username | Remarks | Status | ...       ││
| Tickets  |  | ├─ Dividers (#F2F3F4)                             ││
| Settings |  | └─ Pagination                                     ││
|          |  +---------------------------------------------------+|
|          |                                                       |
+----------+-------------------------------------------------------+
| Footer (Gate | Download | User Agreement | Fees | Gate © 2025)   |
+------------------------------------------------------------------+
```

### 与默认 Exchange 布局的差异项

- **导航模式**: 非交易页面，使用左侧固定导航栏而非标签页
- **内容区偏移**: 内容区从 x=408px 开始（侧栏 288px + 120px 间隔），非居中 1200px
- **内容区宽度**: 1392px（非标准 1200px），适应侧栏布局
- **无栅格约束**: 管理页面不使用 12 列栅格，表格自然撑满

---

## 区块 5: 组件变体

### 左侧导航栏 (LeftBar / LeftMenuV5-web)

```
+--[ 288px ]--+
| [🏠] Overview      |  <- 默认态: icon #484B51 + text 16px/500 #484B51
| [🔒] Security      |
| [📋] Identification ▾|  <- 可折叠
|    Verification Center|  <- 子项: pl=40px, 无图标
|    Backup Contacts   |
| [★ ] Sub Accounts   |  <- 激活态: bg #F5F6F7, text 16px/600 #070808
| [🔌] APIs           |
| [🎫] Vouchers     ▾ |
| [📩] My Tickets     |
| [⚙️] Settings       |
+--------------------+
```

| 属性 | 值 | 备注 |
|------|-----|------|
| 容器宽度 | 288px | 固定 |
| 容器 padding-top | 24px | 距 Header 下方 |
| 菜单项高度 | 56px（外）/ 48px（内） | 外含 py=4px px=12px |
| 菜单项圆角 | 8px | 内层 option |
| 菜单项 padding | 12px | 四侧 |
| 图标尺寸 | 20px | CEX 图标集 |
| 图标-文字间距 | 8px | gap |
| 默认态文字 | 16px / 500 / #484B51 | icon-secondary 色 |
| 激活态背景 | #F5F6F7 | cmpt-input 色 |
| 激活态文字 | 16px / 600 / #070808 | Semibold + text-primary |
| 子项缩进 | pl: 40px, pr: 12px | 无图标，仅文字 |
| 可折叠箭头 | 16px chevron_up / chevron_down | 右对齐 |

### 页面标题区 (Page Header)

```
+-------------------------------------------------------[ 1392px ]---+
| Sub Accounts                              [History] [Create]       |
| Standard Sub-account 1/10, Managed...  Learn more >                |
+--------------------------------------------------------------------+
```

| 属性 | 值 | 备注 |
|------|-----|------|
| 标题 | 28px / 600 / #070808 | H5 Semibold |
| 副标题 | 14px / 400 / #070808 | B8 Regular |
| "Learn more" | 12px / 500 / #84888C + 下划线 | B11 + chevron_right 12px |
| 按钮间距 | 标题区 flex, gap: 24px | |
| History 按钮 | 32px高, px: 12px, bg: #F5F6F7, r: 99px, 14px/500 #070808 | Soft 按钮 |
| Create 按钮 | 32px高, px: 12px, bg: #303236, r: 99px, 14px/500 #FFFFFF | Primary 按钮 |

### 数据表格容器 (Table Container)

```
+-------------------------------------------------------------+
| [All type ▾]  [🔍 Search                              ]     |  <- 筛选栏
|-------------------------------------------------------------|
| UID | Login | Remarks | Status | Balance | GT Fee | Type | ⋯|  <- 表头
|-------------------------------------------------------------|
| 728...| NicoNico | - ✏️  | Active | 892,103 | 🔘   | Managed|  <- 行
|-------------------------------------------------------------|
| ...                                                          |
|-------------------------------------------------------------|
|                        < 1 ... 4 5 [6] 7 8 ... 20 >        |  <- 分页
+-------------------------------------------------------------+
```

| 属性 | 值 | 备注 |
|------|-----|------|
| 容器边框 | 1px solid #DFE0E2 | border-strong |
| 容器圆角 | 12px | |
| 容器内边距 | 24px | |
| 筛选栏-表头间距 | 16px | |
| Dropdown 宽度 | 240px | Filled 样式 |
| Search 宽度 | 240px | Filled 样式, bg: #F5F6F7, r: 6px |
| Dropdown-Search 间距 | 24px | |
| 表头文字 | 12px / 400 / #84888C | B13 Regular |
| 表头行高 | 32px (py: 8px) | |
| 表头分割线 | 1px #F2F3F4 | Divider_V5 |
| 数据行文字 | 14px / 400 / #070808 | B8 Regular |
| 操作列文字 | 14px / 500 / #0055FF | 品牌蓝文字链接 |
| 状态文字 | 14px / 400 | Active: #070808, Freeze: #070808 |
| 子状态文字 | 12px / 400 | Connect: #0055FF, Rejected: #FF2C58 |
| 行间分割线 | 隐含（通过间距区分） | |
| Toggle 开关 | 标准 ToggleV5 | GT Fee 列 |
| 更多操作 | ⋯ 图标按钮 | 行尾 |

### 弹窗 (ModalV5-web)

```
+--[ 588px ]--+
| Subaccounts                              ✕ |  <- Header 74px
|--------------------------------------------|
| ⓘ A standard subaccount is a type of...    |  <- AlertV5 (可选)
|   • You can create multiple subaccounts...  |
|   • The number of subaccounts...            |
|                                             |
| ┌─ Standard Subaccount ─┐ ┌─ Managed ─────┐|
| │ VIP 0-4          10   │ │ VIP 0-4    10  │|  <- 信息卡片
| │ VIP 5-9          30   │ │ VIP 5-9    30  │|
| │ VIP 10-11       100   │ │ VIP 10-11 100  │|
| │ VIP 12-16       200   │ │ VIP 12-16 200  │|
| └───────────────────────┘ └────────────────┘|
|--------------------------------------------|
|                                   [Got it] |  <- Footer
+--------------------------------------------+
```

| 属性 | 值 | 备注 |
|------|-----|------|
| 弹窗宽度 | 588px | |
| Header 高度 | 74px（32px 标题模式） | |
| Header 标题 | 24px / 600 / #070808 | |
| 关闭按钮 | 右上角 ✕ | |
| 内容区 padding | 32px 水平 | |
| Alert 背景 | 浅蓝/浅灰信息条 | AlertV5-web |
| Alert padding | 内 12px | |
| 信息卡片 | 250px 宽, 两列并排 | |
| 信息卡片间距 | 24px | |
| 信息卡片标题 | 14px / 500 / #070808 | 含 pl: 24px |
| VIP 等级文字 | 14px / 400 / #070808 | 左侧 |
| 数量文字 | 14px / 400 / #0055FF | 右侧蓝色 |
| VIP 行间距 | 42px（顶部到顶部） | |
| Footer 按钮 | "Got it" #303236 capsule | Modal Footer ButtonV5 |
| Footer padding | 底部 32px | |

### 创建/编辑弹窗 (Create Sub-account Modal)

```
+--[ 588px ]--+
| Create Sub-account                       ✕ |
|--------------------------------------------|
| Account Name                                |
| [ Input_V5 ...                           ] |
|                                             |
| Login Password                              |
| [ Input_login V5 ●●●●●●             👁  ] |
|                                             |
| Login Method                                |
|   Email ○  Phone ○                          |
| [ Not now, set up later ]                   |
|--------------------------------------------|
|                        [Cancel] [Confirm]   |
+--------------------------------------------+
```

| 属性 | 值 | 备注 |
|------|-----|------|
| Input 高度 | 40px（标准）/ 32px（Small） | |
| Input 背景 | #F5F6F7 | Filled 类型 |
| Input 圆角 | 6px | |
| Input 文字 | 14px / 500 | |
| Label | 14px / 400 / #070808 | 上方标签 |
| 密码输入 | 带眼睛图标切换 | Input_login V5-web |
| Footer 双按钮 | Cancel(Soft) + Confirm(Primary) | 对齐右侧 |
| 按钮间距 | 12px | |

### 修改备注弹窗 (Edit Remarks Modal)

```
+--[ 480px ]--+
| 修改备注                                ✕ |
|--------------------------------------------|
| [ TextAreaV5                              ] |
| [                                         ] |
|           字符限制提示 (右下角)              |
|--------------------------------------------|
|                         [Cancel] [Confirm]  |
+--------------------------------------------+
```

| 属性 | 值 | 备注 |
|------|-----|------|
| TextArea 高度 | 自适应，最小 80px | |
| TextArea 背景 | #F5F6F7 | Filled |
| 未激活状态 | 边框 none, Confirm 按钮 disabled | |
| 点击激活 | 边框 1px solid #070808 | |
| 输入中 | Confirm 按钮高亮 | |
| 字符超限 | 自动截断，提示文字变红 | |

### 空状态 (EmptyV5-web)

```
+------------------------------------------+
|                                          |
|             [96px 钱包插画]               |
|              No Data                     |
|                                          |
+------------------------------------------+
```

| 属性 | 值 | 备注 |
|------|-----|------|
| 插画尺寸 | 96px × 96px | 居中 |
| 容器宽度 | 400px | 居中 |
| 插画-文字间距 | 4px | |
| 文字 | 16px / 500 / #070808 | 居中 |
| 容器内边距 | py: 80px | 上下 |

### 分页 (PaginationV5-web)

```
< 1 ... 4 5 [6] 7 8 ... 20 >
```

| 属性 | 值 | 备注 |
|------|-----|------|
| 对齐 | 右对齐 | 表格底部 |
| 页码 | 14px / 400 | |
| 当前页 | 14px / 600 / #070808 | 加粗 |
| 非当前页 | 14px / 400 / #84888C | |
| 箭头 | < > 符号 | 16px |
| 省略 | ... | |

---

## 区块 6: 适用性 & 自检

### 自检清单

> 基础清单见 `contract/rules.md` 自检清单章节（含 `[B]`/`[W]` 分级标记），此处仅列本风格特有检查项。

- [ ] [B] 主操作按钮必须使用 `#303236`（深中性色），禁止使用品牌蓝 `#0055FF` 作为按钮背景
- [ ] [B] 品牌蓝 `#0055FF` 仅用于文字链接（表格操作列、Learn more 等），不得用于按钮填充
- [ ] [B] 表格容器必须有 `1px solid #DFE0E2` 边框 + `12px` 圆角
- [ ] [B] 所有按钮圆角必须为 `99px`（胶囊形）
- [ ] [W] 左侧导航栏宽度固定 `288px`，激活项使用 `#F5F6F7` 背景 + `600` 字重
- [ ] [W] 输入框/下拉框使用 Filled 样式（bg: `#F5F6F7`，无边框），圆角 `6px`
- [ ] [W] 表头文字使用 `12px / 400 / #84888C`
- [ ] [W] 弹窗宽度标准 `588px`，圆角 `12px`
- [ ] [W] 页面标题使用 `28px / 600`（H5 字阶）
- [ ] [W] 状态子文字颜色：正常链接 `#0055FF`，错误状态 `#FF2C58`

### 适用场景

- 子账号管理页面（列表 + 创建/编辑/冻结/激活弹窗）
- 安全设置页面（密码修改、2FA 管理）
- 身份验证中心（KYC 状态、证件管理）
- API 管理页面（密钥列表 + 创建弹窗）
- 券中心管理页面（券列表 + 筛选）
- 工单管理页面
- 账号设置页面
- 所有带左侧导航栏的 Exchange 后台管理页面

### 不适用场景

- 交易页面（使用 Trading 多面板布局）
- 行情列表页面（使用 Market List 布局）
- 营销/活动页面（使用 Campaign 域 + 对应 style）
- Rewards Hub 福利中心（使用 rewards-hub 业务规范）
- Booster 推广计划（使用 booster 业务规范）
- Copy Trading 跟单广场（使用 Copy Trading 布局）

### H5 适配要点

> Figma 中包含 iPhone 13 mini (375px) 适配稿。

| 维度 | Web | H5 |
|------|-----|-----|
| 导航方式 | 左侧固定导航栏 288px | 顶部 Header + 返回箭头，无侧栏 |
| 内容区宽度 | 1392px | 375px（padding 16px，内容 343px） |
| 页面标题 | 28px / 600 | 20px / 600 |
| 筛选栏 | 横向排列 Dropdown + Search | 同，宽度自适应 |
| 表格 | 标准水平表格 | 卡片列表（每项一行，关键信息上下排列） |
| 弹窗 | ModalV5-web 588px | Popup_V5_H5 底部弹出（full-width） |
| 分页 | 数字分页 | 下拉加载更多 |
| 底部 | Footer 链接栏 | FooterButton 48px + HomeIndicator 34px |
