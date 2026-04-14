---
scope: [web3pay]
layer: L2
---
# ManageWallet 钱包管理

> 来源: Figma Web3/Pay App `48768:6715`
> 归属: web3pay 独有
> 状态: 基于 Figma GT-Web3 & Pay App 组件库

---

## 组件概述

Web3 钱包管理主页面组件，展示总资产、账户列表、钱包列表。
整合多个子组件形成完整的资产管理视图。

## 子组件

| 组件 | 节点 ID | 说明 |
|------|---------|------|
| ManageWallet.Account | 48783:12056 | 账户行 |
| ManageWallet.Total Assets | 48818:10283 | 总资产展示 |
| ManageWallet.Bot Account | 48800:5058 | 机器人账户 |
| ManageWallet.Wallet | 49145:2298 | 钱包行 |
| ManageWallet/Default | 48808:12434 | 整页默认组合 |

## 结构树

```
ManageWallet
├── StatusBar                     # 系统状态栏
├── Navbar                        # 顶部导航（"钱包管理"）
├── TotalAssets                   # 总资产区
│   ├── label                    # "总资产"
│   ├── value                    # 金额（NumberView）
│   └── toggle                   # 显示/隐藏开关
├── AccountList                   # 账户列表
│   ├── Account[]                # 账户行
│   │   ├── icon                 # 账户图标
│   │   ├── name                 # 账户名称
│   │   ├── balance              # 余额（NumberView）
│   │   └── selected-indicator?  # 选中指示
│   ├── BotAccount[]             # 机器人账户
│   │   ├── icon                 # 机器人图标
│   │   ├── name                 # 机器人名称
│   │   └── balance              # 余额
│   └── AddAccount               # 添加账户入口
├── WalletList                    # 钱包列表
│   ├── Wallet[]                 # 钱包行
│   │   ├── icon                 # 钱包图标
│   │   ├── name                 # 钱包名称
│   │   ├── balance              # 余额
│   │   ├── button?              # 操作按钮
│   │   └── expand-toggle        # 展开/收起
├── PopupFilter                   # 筛选弹窗
└── HomeIndicator                 # 底部指示器
```

## ManageWallet.Account 属性

| 属性 | 类型 | 默认值 | 可选值 | 说明 |
|------|------|--------|--------|------|
| `账户 Account` | Variant | Display assets | Display assets / Hidden assets / Add | 账户类型 |
| `选中态 Selected State` | Boolean | true | — | 是否选中 |
| `icon` | Boolean | true | — | 是否显示图标 |

**尺寸**: 375×60（全宽，行高 60px）

## ManageWallet.Total Assets 属性

| 属性 | 类型 | 默认值 | 可选值 | 说明 |
|------|------|--------|--------|------|
| `总资产 Total Assets` | Variant | True | True / False | 是否显示金额 |

**尺寸**: 375×78（全宽）

## ManageWallet.Wallet 属性

| 属性 | 类型 | 默认值 | 可选值 | 说明 |
|------|------|--------|--------|------|
| `Property 1` | Variant | Display | Display / Hidden | 显示/隐藏余额 |
| `Property 2` | Variant | Expand | Expand / Close | 展开/收起 |
| `按钮 Button` | Boolean | true | — | 是否显示操作按钮 |

**尺寸**: 375×52（全宽，行高 52px）

## ManageWallet.Bot Account 属性

| 属性 | 类型 | 默认值 | 可选值 | 说明 |
|------|------|--------|--------|------|
| `机器人 Bot` | Variant | 创建入口 | 创建入口 Create Bot Account / 机器人账户 Bot Account | 状态 |
| `选中态 Selected State` | Boolean | true | — | 是否选中 |

**尺寸**: 335-375×52-65

## Token 映射

| 元素 | 值 | 说明 |
|------|-----|------|
| 页面背景 | `var(--bg)` | 深色模式 |
| 卡片背景 | `var(--bg-card)` | — |
| 总资产数值 | `var(--text-primary)` + 24px bold | 大号数字 |
| 账户名称 | `var(--text-primary)` + 16px medium | — |
| 余额数值 | `var(--text-secondary)` + 14px | — |
| 选中指示 | `var(--brand)` #17E5A1 | Web3 品牌绿 |
| 添加按钮 | `var(--brand)` | + 图标 |
| 行间距 | 0（紧密排列，用分割线分隔） | — |
| 分割线 | `var(--border)` | — |

## 数据接口

```typescript
interface ManageWalletProps {
  totalAssets: {
    value: number;
    currency: string;
    hidden: boolean;
  };
  accounts: Array<{
    id: string;
    name: string;
    icon: string;
    balance: number;
    selected: boolean;
  }>;
  botAccounts: Array<{
    id: string;
    name: string;
    balance: number;
  }>;
  wallets: Array<{
    id: string;
    name: string;
    balance: number;
    expanded: boolean;
  }>;
  onToggleAssets: () => void;
  onSelectAccount: (id: string) => void;
  onAddAccount: () => void;
}
```
