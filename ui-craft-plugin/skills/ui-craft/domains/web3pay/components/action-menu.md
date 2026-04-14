---
scope: [web3pay]
layer: L2
context: pay-b
---

# ActionMenu 操作菜单

> 表格行操作列的标准交互模式：点击 `...` 图标触发 Popover 下拉菜单。
> 适用于所有 Pay-B 端表格的操作列。

---

## 组件概述

表格操作列统一使用 `...`（More Horizontal）图标作为触发器，点击后弹出 Popover 下拉菜单展示具体操作项。操作列始终固定在表格右侧（`position: sticky`），确保横向滚动时操作入口始终可见。

---

## 触发器（Trigger）

| 属性 | 值 | 说明 |
|------|-----|------|
| 图标 | `CEX_More_Horizontal`（三点横排） | 20×20px |
| 热区 | 28×28px | 圆角 6px，居中对齐 |
| 默认色 | `#84888C` | `--text-secondary` |
| Hover 背景 | `#F5F6F7` | `--cmpt-hover` |
| Hover 文字色 | `#070808` | `--text-primary` |
| 列对齐 | 居中 | `text-align: center` |
| 列固定 | `position: sticky; right: 0` | 横向滚动时固定 |
| 列阴影 | `box-shadow: -8px 0 16px rgba(0,0,0,0.08)` | 左侧阴影提示固定 |
| 列背景 | `#FFFFFF`（不透明） | 覆盖底层内容 |
| z-index | 表头 3 / 数据行 2 | — |

---

## 下拉菜单（Popover/Dropdown）

| 属性 | 值 | 说明 |
|------|-----|------|
| 定位 | `position: absolute; top: 100%; right: 0` | 触发器下方右对齐 |
| 宽度 | 160px | 固定宽度 |
| 背景 | `#FFFFFF` | `--layer-1` |
| 边框 | `1px solid #F2F3F4` | `--divider-strong` |
| 圆角 | 8px | `--radius-dropdown` |
| 阴影 | `0 6px 16px rgba(0,0,0,0.08)` | `--shadow-dropdown` |
| 内边距 | 4px | 容器内边距 |
| z-index | 200 | 浮于表格之上 |
| 动画 | 无（立即显示/隐藏） | — |

### 菜单项

| 属性 | 值 | 说明 |
|------|-----|------|
| 高度 | 36px | — |
| 内边距 | `0 12px` | 左右 12px |
| 字号 | 14px | B7 Token |
| 字重 | 500 Medium | — |
| 默认色 | `#070808` | `--text-primary` |
| Hover 背景 | `#F5F6F7` | `--cmpt-hover` |
| 圆角 | 4px | 菜单项圆角 |
| 危险操作色 | `#EF4444` | `--error`，用于"删除"等破坏性操作 |
| 危险 Hover 背景 | `#FEE2E2` | `--tag-red-bg` |

---

## 标准操作项

| 操作 | 样式 | 说明 |
|------|------|------|
| **详情** | 默认色 `#070808` | 查看规则/订单详情（只读） |
| **编辑** | 默认色 `#070808` | 进入编辑模式 |
| **删除** | 默认色 `#070808` | 触发二次确认弹窗 → 安全验证 |

> 所有菜单项统一使用默认文字色 `#070808`，不区分危险操作颜色。

---

## 交互规则

| 规则 | 说明 |
|------|------|
| **打开** | 点击 `...` 图标 |
| **关闭** | 点击菜单外任意区域 / 点击菜单项 / 按 ESC |
| **互斥** | 同时只能打开一个菜单，打开新菜单自动关闭旧菜单 |
| **安全操作** | 删除/状态变更等操作需触发二次确认弹窗 + 安全验证 |
| **禁用态** | 菜单项可设为 disabled（灰色文字 + 不可点击） |

---

## CSS 实现

> 所有色值须通过 `pay-b-default` CSS 变量引用。

```css
/* 外层包裹 */
.action-wrap {
  position: relative;
  display: inline-flex;
  justify-content: center;
}

/* 触发器 */
.action-btn {
  width: 28px;
  height: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  cursor: pointer;
  border-radius: var(--radius-input);
  color: var(--text-secondary);
  padding: 0;
  transition: all var(--transition);
}
.action-btn:hover {
  background: var(--cmpt-hover);
  color: var(--text-primary);
}

/* 下拉菜单 */
.dropdown-menu {
  position: absolute;
  top: calc(100% + 4px);
  right: -8px;
  width: 160px;
  background: var(--layer-1);
  border: 1px solid var(--border);
  border-radius: var(--radius-dropdown);
  box-shadow: var(--shadow-dropdown);
  padding: 6px;
  z-index: 200;
  display: none !important;
}
.dropdown-menu.show {
  display: block !important;
}

/* 菜单项 */
.dropdown-menu__item {
  display: block;
  width: 100%;
  padding: 10px 12px;
  border: none;
  background: none;
  border-radius: var(--radius-input);
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  cursor: pointer;
  transition: background var(--transition);
  text-align: left;
}
.dropdown-menu__item:hover {
  background: var(--cmpt-hover);
}

/* 禁用态 */
.dropdown-menu__item--disabled {
  color: var(--text-quaternary);
  cursor: not-allowed;
  pointer-events: none;
}

/* 操作列固定 */
.action-col {
  text-align: center;
  position: sticky;
  right: 0;
  background: #FFFFFF;
  z-index: 2;
  min-width: 80px;
  box-shadow: -8px 0 16px rgba(0,0,0,0.08);
}
thead .action-col {
  z-index: 3;
}
tbody tr:hover .action-col {
  background: #F5F6F7;
}
```

---

## JS 交互参考

```javascript
function toggleActionMenu(event, id) {
  event.stopPropagation();
  // 关闭所有已打开菜单
  document.querySelectorAll('.dropdown-menu.show').forEach(m => {
    if (m.id !== 'menu-' + id) m.classList.remove('show');
  });
  // 切换当前菜单
  const menu = document.getElementById('menu-' + id);
  menu.classList.toggle('show');
}

// 点击外部关闭
document.addEventListener('click', () => {
  document.querySelectorAll('.dropdown-menu.show').forEach(m => {
    m.classList.remove('show');
  });
});

// ESC 关闭
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.dropdown-menu.show').forEach(m => {
      m.classList.remove('show');
    });
  }
});
```

---

## HTML 用法示例

```html
<td class="action-col">
  <div class="action-wrap">
    <button type="button" class="action-btn" onclick="toggleMenu(event, 1)">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
        <circle cx="4" cy="10" r="1.5"/>
        <circle cx="10" cy="10" r="1.5"/>
        <circle cx="16" cy="10" r="1.5"/>
      </svg>
    </button>
    <div class="dropdown-menu" id="menu-1">
      <button class="dropdown-menu__item" onclick="viewDetail(1)">详情</button>
      <button class="dropdown-menu__item" onclick="editRule(1)">编辑</button>
      <button class="dropdown-menu__item" onclick="deleteRule(1)">删除</button>
    </div>
  </div>
</td>
```

> **关键结构**：dropdown 与 button 是**兄弟元素**（非嵌套），共同包裹在 `.action-wrap` 内。
> 嵌套在 button 内部会被某些 UI 框架/工具覆盖 `display` 导致菜单始终可见。
