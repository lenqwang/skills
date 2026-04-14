---
scope: [web3pay]
layer: L1
context: pay-b
type: page-pattern
---

# Pay-B 配置页模式（Config Page Pattern）

> 适用于设置中心、规则配置、审批配置等管理类页面。无 Figma 设计稿时，以本文档作为 UI 决策依据。
> 来源：pay-b-full-demo.html（设置页部分）、本次多签规则页分析。
> 版本: v1.0.0 | 2026-03-25

---

## 一、页面整体结构（固定模式）

```
┌─────────────────────────────────────────────────────────────────┐
│  页面标题区（面包屑 + H1 + 副标题）                               │
├─────────────────────────────────────────────────────────────────┤
│  [必须] 全局配置 Banner（当页面存在全局/默认设置时）               │
│         ├ 左：图标 + 标题 + 描述                                  │
│         └ 右：当前状态展示 + 编辑按钮                             │
├─────────────────────────────────────────────────────────────────┤
│  内容区（规则列表 / 表格 / 表单 / 卡片）                          │
└─────────────────────────────────────────────────────────────────┘
```

---

## 二、全局配置 Banner — 强制规则 [B]

### 判断规则：什么时候出现 Banner？

当产品 MD 中包含以下描述时，**必须**在页面顶部生成 Banner：

```
触发关键词（满足任一即出现 Banner）：
- 「无匹配规则时的默认操作」
- 「兜底规则」
- 「全局设置」
- 「全局配置」
- 「默认动作」
- 「不匹配时执行」
```

### Banner 规格

```
Banner 位置：页面内容区顶部，表格/列表之前
Banner 大小：横贯内容区全宽
Banner 样式：白色背景 + 边框 + 圆角
布局：左侧（图标+文字区）+ 右侧（当前配置状态+编辑按钮）
```

```html
<div class="default-banner">
  <div class="default-banner__left">
    <div class="default-banner__icon">
      <!-- 设置/配置类图标，20x20，灰色 -->
      <svg ...设置图标...></svg>
    </div>
    <div>
      <div class="default-banner__title">无匹配规则时执行默认操作</div>
      <div class="default-banner__desc">当下发订单在上方列表中找不到匹配规则时，系统将采取此默认动作</div>
    </div>
  </div>
  <div class="default-banner__right">
    <span class="default-action-label">默认执行：</span>
    <!-- 当前状态 Chip（自动放行/自动拒绝/人工审核） -->
    <span class="action-chip action-chip--pass">自动放行</span>
    <button class="btn btn--secondary-outline btn--sm" onclick="openModal('modal-default-action')">编辑配置</button>
  </div>
</div>
```

```css
.default-banner {
  background:#FFFFFF; border:1px solid var(--border-strong);
  border-radius:var(--radius-card); padding:16px 20px;
  margin-bottom:24px;
  display:flex; align-items:center; justify-content:space-between; gap:16px; flex-wrap:wrap;
}
.default-banner__left { display:flex; align-items:flex-start; gap:12px }
.default-banner__icon {
  width:40px; height:40px; border-radius:8px;
  background:var(--bg-muted);
  display:flex; align-items:center; justify-content:center; flex-shrink:0;
  color:var(--text-secondary);
}
.default-banner__title { font-size:14px; font-weight:600; color:var(--text-primary); margin-bottom:2px }
.default-banner__desc { font-size:12px; color:var(--text-secondary); line-height:1.5 }
.default-banner__right { display:flex; align-items:center; gap:10px; flex-shrink:0 }
.default-action-label { font-size:13px; color:var(--text-secondary); white-space:nowrap }
```

### Banner 不出现的情况

```
❌ 纯列表页（无全局默认设置）→ 不出现 Banner
❌ 详情页 → 不出现 Banner
❌ 表单页 → 不出现 Banner
```

---

## 三、页面 Tab 切换（配置页有多个子模块时）

当配置页有多个功能模块时（如「规则配置」和「调整优先级」），使用 **Tab Underline** 而非 Pill Tabs：

```
✅ 功能模块切换 → Tab Underline（下划线 Tab）
✅ 状态/类型筛选 → Pill Tabs
❌ 不能混用（功能切换用 Pills，状态筛选用 Tab Underline）
```

Tab Underline 规格：

```css
.tabs { display:flex; border-bottom:1px solid var(--border); margin-bottom:24px }
.tab-item {
  position:relative; height:44px;
  display:flex; align-items:center; padding:0 16px;
  font-size:14px; font-weight:600; color:var(--text-secondary);
  cursor:pointer; border:none; background:none;
  transition:color var(--transition); margin-bottom:-1px;
}
.tab-item.active { color:var(--text-primary) }
.tab-item.active::after {
  content:""; position:absolute; bottom:-1px; left:50%; transform:translateX(-50%);
  width:16px; height:3px; background:#070808; border-radius:1px;
}
```

---

## 四、设置项卡片（配置区域的容器）

当配置页有多个独立的设置区域时，每个区域使用独立卡片：

```html
<div class="settings-card">
  <h3 class="settings-card__title">区域标题</h3>
  <p class="settings-card__desc">区域说明文字</p>
  <!-- 设置内容 -->
</div>
```

```css
.settings-card {
  background:#FFFFFF; border:1px solid var(--border-strong);
  border-radius:16px; padding:24px; margin-bottom:20px;
}
.settings-card__title { font-size:16px; font-weight:600; color:var(--text-primary); margin-bottom:4px }
.settings-card__desc { font-size:14px; color:var(--text-secondary); line-height:1.5; margin-bottom:20px }
```

---

## 五、从产品 MD 判断页面类型

| 产品 MD 特征 | 页面类型 | 模式 |
|------------|---------|------|
| 有「规则列表」+「状态筛选」+「新建操作」 | 列表配置页 | list-page + config-page 混合 |
| 有「默认操作配置」 | 必须有顶部 Banner | config-page |
| 有「详情展示」无编辑 | 详情页 | 仅用 table/card 展示 |
| 有「表单字段」+「提交操作」 | 表单页 | form + modal |

---

## 六、安全验证弹窗（统一规范）

凡涉及资金安全的操作（删除规则/开关状态/修改配置），操作流程统一为：

```
用户操作
  → 二次确认弹窗（confirm-box：标题 + 描述 + 取消/确认）
    → 安全验证弹窗（资金密码 + Google 验证码）
      → 执行操作
        → Toast 成功提示（3秒自动消失）
```

不得简化为「直接操作」或「只有 Toast」。

---

## 完整 HTML 结构示例（带 Banner 的规则配置页）

```html
<!-- 面包屑 + 标题 -->
<div class="page-header">
  <div class="breadcrumb">设置中心 <span>/</span> 下发</div>
  <h1 class="page-title">审批</h1>
</div>

<!-- 全局配置 Banner（顶部，优先级最高） -->
<div class="default-banner">...</div>

<!-- 状态筛选 Pill Tabs -->
<div class="filter-pills">...</div>

<!-- 工具栏 -->
<div class="toolbar">...</div>

<!-- 数据表格 -->
<div class="table-wrap">...</div>
```
