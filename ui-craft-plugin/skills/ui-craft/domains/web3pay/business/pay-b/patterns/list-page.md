---
scope: [web3pay]
layer: L1
context: pay-b
type: page-pattern
---

# Pay-B 列表页模式（List Page Pattern）

> 适用于所有带数据表格的管理后台页面。无 Figma 设计稿时，以本文档作为 UI 决策依据。
> 来源：对 pay-b-transaction-management.html / pay-b-order-management.html / pay-b-full-demo.html 的归纳提取。
> 版本: v1.0.0 | 2026-03-25

---

## 一、页面整体结构（固定模式）

```
┌─────────────────────────────────────────────────────────────────┐
│  [可选] 顶部 Banner（全局配置提示区，仅当页面有「全局设置」时）     │
├─────────────────────────────────────────────────────────────────┤
│  Pill Tabs 状态筛选（全部 / 状态A / 状态B / ...）                │
├─────────────────────────────────────────────────────────────────┤
│  工具栏  [ 搜索框 ] [ Filter Pill 高级筛选... ]  |  [ 操作按钮 ] │
├─────────────────────────────────────────────────────────────────┤
│  数据表格（带列头 / 分页 / 操作列）                               │
└─────────────────────────────────────────────────────────────────┘
```

---

## 二、状态筛选（Pill Tabs）— 强制规则 [B]

### 规则

```
✅ 状态筛选 = Pill Tabs（胶囊选项卡）
❌ 禁止用 Dropdown Select 做状态筛选
❌ 禁止用 Tab Underline 做状态筛选（Tab Underline 用于页面级模块切换）
```

### 实现规格

```html
<!-- Pill Tabs 结构 -->
<div class="filter-pills">
  <button class="filter-pill active" onclick="filterTable(this,'all')">
    全部<span class="filter-pill-count">N</span>
  </button>
  <button class="filter-pill" onclick="filterTable(this,'状态key')">
    状态名称
  </button>
</div>
```

```css
.filter-pills { display:flex; align-items:center; gap:8px; margin-bottom:16px }
.filter-pill {
  display:inline-flex; align-items:center; gap:6px;
  height:32px; padding:0 14px;
  border-radius:var(--radius-pill); border:none;
  font-size:13px; font-weight:500;
  color:var(--text-secondary); background:var(--bg-muted);
  cursor:pointer; transition:all var(--transition);
}
.filter-pill:hover { background:#ECEDEF; color:var(--text-primary) }
.filter-pill.active { background:var(--text-primary); color:#FFFFFF }
.filter-pill-count {
  font-size:11px; font-weight:600;
  background:rgba(255,255,255,.25); border-radius:6px;
  padding:1px 5px; line-height:1.4;
}
```

### 如何从产品 MD 提取 Pill Tabs 内容

当产品 MD 中出现以下描述时，映射为 Pill Tabs：

| 产品 MD 描述 | Pill Tabs 内容 |
|------------|--------------|
| 「状态：自动拒绝 / 人工审核 / 自动通过」 | 全部 / 自动拒绝 / 人工审核 / 自动通过 |
| 「状态机：待审批 / 审批通过 / 审批拒绝 / 超时」 | 全部 / 待审批 / 审批通过 / 审批拒绝 / 已超时 |
| 「tab：待处理 / 全部」 | 待处理 / 全部 |
| 「审批类型：下发审批 / 规则变更」 | 下发审批 / 规则变更 |

---

## 三、工具栏布局（固定模式）[B]

```
┌──────────────────────────────────────────────────────┐
│ 左侧（flex:1）          │  右侧（flex-shrink:0）       │
│ 搜索框 [高级筛选 Pills]  │  [次要按钮] [主要按钮]        │
└──────────────────────────────────────────────────────┘
```

### 规则

```
✅ 搜索框始终在左侧
✅ 操作按钮始终在右侧
✅ 主按钮（新建/新增）= btn--primary，放最右
✅ 次要按钮（导出/调整顺序）= btn--secondary-outline，放主按钮左侧
❌ 禁止把操作按钮放在搜索框左侧
❌ 禁止搜索框和操作按钮都堆在同一侧
```

### 按钮文案规范（来自 ux-writing.md）

| 功能 | 正确文案 | 错误文案 |
|------|---------|---------|
| 新建一条记录 | 新建规则 / 新建账户 | 新增规则 / 添加 / 创建 |
| 调整排序 | 调整优先级排序 | 优先级设置 / 排序管理 |
| 批量导出 | 导出 | 下载 / 导出数据 |

---

## 四、表格列定义规则

### 从产品 MD 提取表格列

**步骤：**
1. 找产品 MD 中的「列表展示数据」或「字段说明」章节
2. 每个「维度/类型」字段 → 独立表格列（不要合并）
3. 「操作」字段 → 固定最右列（操作列，sticky right）

**映射规则：**

| 产品 MD 描述 | 表格列 |
|------------|------|
| 「优先级：按优先级从高到低展示」 | 优先级列（最左，可排序徽标） |
| 「规则名称」 | 规则名称列（font-weight:600） |
| 「适用范围：主账户及子账户」 | 适用账户列（蓝色 Tag 样式） |
| 「触发条件类型（下发数量/频次/地址）」| 触发类型列（独立列，不与触发条件合并）|
| 「触发条件详情」 | 触发条件列 |
| 「处理动作 / 执行动作」 | 执行动作列（Chip 样式） |
| 「状态：开启/关闭」 | 状态列（Switch 组件） |
| 「操作：删除/编辑/查看详情」 | 操作列（`...` More-btn，sticky right） |

### 账户字段渲染规范

当表格列包含「账户」「适用范围」时：

```html
<!-- 蓝色 Tag 样式（不是纯文本） -->
<span class="account-tag">机构账户B</span>
<span class="account-tag">+5账户</span>
```

```css
.account-tag {
  display:inline-flex; align-items:center;
  height:22px; padding:0 8px;
  border-radius:4px; font-size:12px; font-weight:500;
  background:var(--tag-blue-bg); color:var(--tag-blue-text);
  cursor:pointer;
}
```

### 执行动作列 Chip 样式

| 动作值 | Chip 样式 | 图标 |
|-------|---------|------|
| 自动拒绝 | `action-chip--reject`（红色） | X 圆形 |
| 人工审核 | `action-chip--review`（橙色） | 信息圆形 |
| 自动通过 | `action-chip--pass`（绿色） | 勾选圆形 |

---

## 五、演示数据规范

### 规则

```
✅ 至少 5 行演示数据
✅ 覆盖所有状态变体（每个状态至少 1 行）
✅ 数据真实合理（不用「示例数据」「测试数据」等文案）
✅ 开关状态混合（部分开启 + 部分关闭）
❌ 不能只有 1-3 行（显得功能稀少）
❌ 不能所有行都是同一状态
```

---

## 六、分页

分页器放在表格下方，右对齐。使用 `pay-b-pagination.md` 规格。

---

## 七、空状态

表格无数据时显示空状态组件，**保留表头**，使用 `pay-b-loading.md` 中的 EmptyV5-web 规格：
- 插图：96×96px
- 文字：「暂无数据」/ 「当前筛选无匹配结果，请调整筛选条件」
- 可选 CTA：「新建规则」

---

## 完整 HTML 骨架示例

```html
<!-- 状态筛选 Pill Tabs -->
<div class="filter-pills">
  <button class="filter-pill active" onclick="filterTable(this,'all')">全部<span class="filter-pill-count">7</span></button>
  <button class="filter-pill" onclick="filterTable(this,'reject')">自动拒绝<span class="filter-pill-count">4</span></button>
  <button class="filter-pill" onclick="filterTable(this,'review')">人工审核<span class="filter-pill-count">1</span></button>
  <button class="filter-pill" onclick="filterTable(this,'pass')">自动通过<span class="filter-pill-count">2</span></button>
</div>

<!-- 工具栏：左搜索 + 右操作 -->
<div class="toolbar">
  <div class="toolbar__left">
    <div class="search-v5">
      <svg width="16" height="16" ...搜索图标...></svg>
      <input type="text" placeholder="搜索...">
    </div>
  </div>
  <div class="toolbar__right">
    <button class="btn btn--secondary-outline btn--sm">次要操作</button>
    <button class="btn btn--primary btn--sm">
      <svg ...add图标...></svg>
      新建规则
    </button>
  </div>
</div>

<!-- 数据表格 -->
<div class="table-wrap">
  <table class="gtpay-table">...</table>
</div>
```
