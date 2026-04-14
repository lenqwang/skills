---
scope: [web3pay]
layer: L2
---
# NetworkPicker 网络选择器

> 来源: Figma Web3/Pay App `48640:289015`
> 归属: web3pay 独有
> 状态: 基于 Figma GT-Web3 & Pay App 组件库

---

## 组件概述

区块链网络选择器，用于转账、充值、DApp 等场景选择目标网络。
支持搜索、Ping 延迟显示、多选模式、字母索引。

## 子组件

| 组件 | 节点 ID | 说明 |
|------|---------|------|
| NetworkPicker.PingTag | 48640:288483 | 网络延迟标签 |
| .NetworkPicker.Cell | 48640:291165 | 网络选项行 |
| .NetworkPicker.IndexBar | 48667:291610 | 字母索引栏 |
| .NetworkPicker.Popup | 48244:272053 | 弹窗容器 |
| .NetworkPicker.Page | 48673:292267 | 全页容器 |

## 结构树

```
NetworkPicker
├── Popup / Page                   # 容器（弹窗模式 or 全页模式）
│   ├── Header
│   │   ├── title                  # "选择网络"
│   │   └── close-btn              # 关闭按钮
│   ├── SearchBar                  # 搜索框
│   ├── NetworkList                # 网络列表
│   │   ├── Cell[]                 # 网络行
│   │   │   ├── icon?              # 网络图标（可选）
│   │   │   ├── name               # 网络名称（如 "Ethereum"）
│   │   │   ├── subtext?           # 副文本（如 RPC 地址）
│   │   │   ├── PingTag?           # 延迟标签
│   │   │   ├── balance?           # 余额显示
│   │   │   ├── tag?               # 标签（如 "推荐"）
│   │   │   └── check-icon         # 选中勾选
│   ├── IndexBar?                  # 字母索引（右侧）
│   ├── EmptyState?                # 搜索无结果
│   └── Footer                     # 底部按钮
```

## NetworkPicker.Cell 属性

| 属性 | 类型 | 默认值 | 可选值 | 说明 |
|------|------|--------|--------|------|
| `选中 Checked` | Variant | true | true / false | 是否选中 |
| `显示操作 Show Action` | Variant | true | true / false | 是否显示操作区 |
| `多选 Multi Select` | Variant | false | false / true | 单选/多选模式 |
| `标题 Title` | Text | Ethereum | — | 网络名称 |
| `显示速度 Show Ping` | Boolean | false | — | 显示延迟标签 |
| `副文本 Subtext` | Text | — | — | RPC 地址等 |
| `显示副文本 Show SubText` | Boolean | true | — | — |
| `显示占位图 Show placeholder` | Boolean | false | — | 占位图标 |
| `显示标签 Show Tag` | Boolean | false | — | 推荐标签 |
| `显示余额 Show balance` | Boolean | false | — | 余额 |

**Cell 尺寸**: 355×60

## NetworkPicker.PingTag 属性

| 属性 | 类型 | 默认值 | 可选值 | 说明 |
|------|------|--------|--------|------|
| `Ping` | Variant | Low | Low / Medium / High / Not available | 延迟等级 |

**PingTag 尺寸**: 46-52×16

### Ping 颜色映射

| 等级 | 颜色 | 说明 |
|------|------|------|
| Low | `var(--color-up)` #50A907 | 延迟低，绿色 |
| Medium | `var(--warning)` #FFB020 | 延迟中，黄色 |
| High | `var(--error)` #E54545 | 延迟高，红色 |
| Not available | `var(--text-secondary)` | 不可用，灰色 |

## NetworkPicker.Popup 属性

| 属性 | 类型 | 默认值 | 可选值 | 说明 |
|------|------|--------|--------|------|
| `Variant` | Variant | Default | Default / Searching / Search Empty | 页面状态 |
| `MaxHeight` | Variant | true | true / false | 是否最大高度 |
| `多选 MultiSelect` | Variant | false | false / true | 多选模式 |
| `显示键盘 Show Keyboard` | Boolean | false | — | 键盘弹出 |

**Popup 尺寸**: 375×812（全屏）/ 375×389（紧凑）/ 375×467（搜索空）

## Token 映射

| 元素 | 值 | 说明 |
|------|-----|------|
| 弹窗背景 | `var(--bg-card)` | — |
| 网络名称 | `var(--text-primary)` + 16px medium | — |
| 副文本 | `var(--text-secondary)` + 12px | — |
| 选中勾选 | `var(--brand)` #17E5A1 | Web3 品牌绿 |
| 搜索框 | `var(--bg-muted)` 背景 + 8px 圆角 | — |
| 分割线 | `var(--border)` | — |
| 行高 | 60px | — |
| 内边距 | 左右各 10px | — |

## 使用场景

| 场景 | 模式 | Ping | MultiSelect |
|------|------|------|-------------|
| 转账选网络 | Popup | 显示 | false |
| DApp 选网络 | Page | 不显示 | false |
| Gas 加油站 | Popup | 显示 | true |
| 钱包首页筛选 | Popup | 不显示 | false |

## 数据接口

```typescript
interface Network {
  id: string;
  name: string;
  icon?: string;
  rpcUrl?: string;
  ping?: 'low' | 'medium' | 'high' | 'unavailable';
  balance?: number;
  tag?: string;
}

interface NetworkPickerProps {
  mode: 'popup' | 'page';
  networks: Network[];
  selected: string | string[];
  multiSelect?: boolean;
  showPing?: boolean;
  showBalance?: boolean;
  onSelect: (networkId: string | string[]) => void;
  onSearch?: (keyword: string) => void;
  onClose?: () => void;
}
```
