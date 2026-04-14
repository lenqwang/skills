# SVG Icon Registry — 生成时图标引用指南

> 版本: 1.0.0 | 更新: 2026-03-25
> 数据源: `icon-map.json` (26 个核心图标) + Figma sprite sheets (500+ 扩展图标)

---

## 快速使用

### 生成页面时读取图标

```
1. 读取 SVG/icon-map.json
2. 通过 icon name 查找图标数据
3. 用下方模板嵌入 HTML
```

### HTML 嵌入模板

```html
<svg viewBox="{viewBox}" width="20" height="20" fill="currentColor">
  <path d="{paths[0]}"/>
  <!-- 多 path 图标需要多个 <path> -->
</svg>
```

### 多 path + fillRule 示例

```html
<!-- X1_fill_Delete (evenodd, 3 paths) -->
<svg viewBox="0 0 18 17.8" width="20" height="20" fill="var(--text-secondary)">
  <path d="M9.90039 12.9004H8.09961V6.90039H9.90039V12.9004Z" fill-rule="evenodd" clip-rule="evenodd"/>
  <path d="M18 3V4.80078H15.4004V16.9004..." fill-rule="evenodd" clip-rule="evenodd"/>
  <path d="M13 1.80078H5V0H13V1.80078Z" fill-rule="evenodd" clip-rule="evenodd"/>
</svg>
```

---

## 核心图标速查表（26 个）

### 操作类

| 图标名 | 用途 | viewBox | fillRule |
|--------|------|---------|----------|
| `X1_fill_Add` | 新增 | `0 0 18 18` | nonzero |
| `X1_fill_Close` | 关闭 | `0 0 16.12 16.13` | nonzero |
| `X1_fill_Copy` | 复制 | `0 0 17.8 17.8` | nonzero |
| `X1_fill_Delete` | 删除 | `0 0 18 17.8` | evenodd |
| `X1_fill_Edit` | 编辑 | `0 0 17.79 17.45` | nonzero |
| `X1_fill_External` | 外链跳转 | `0 0 13.2 13.2` | nonzero |
| `X1_fill_Filter` | 筛选 | `0 0 16.01 18.81` | nonzero |
| `X1_fill_Search` | 搜索 | `0 0 18.64 18.64` | nonzero |
| `X1_fill_Refresh` | 刷新 | `0 0 20 20` | nonzero |
| `X1_fill_Download` | 下载 | `0 0 18 18` | nonzero |

### 导航类

| 图标名 | 用途 | viewBox | fillRule |
|--------|------|---------|----------|
| `X1_fill_CaretDown` | 下拉箭头 | `0 0 15.72 8.76` | nonzero |
| `X1_fill_CaretRight` | 展开箭头 | `0 0 10.02 18.24` | nonzero |
| `X1_fill_Home` | 首页 | `0 0 17.8 17.9` | nonzero |

### 状态类

| 图标名 | 用途 | viewBox | fillRule |
|--------|------|---------|----------|
| `X1_fill_Check` | 勾选 | `0 0 20.87 13.49` | nonzero |
| `X1_fill_CheckCircle` | 成功 | `0 0 20 20` | nonzero |
| `X1_fill_CloseCircle` | 错误/关闭 | `0 0 20 20` | nonzero |
| `X1_fill_InfoCircle` | 信息提示 | `0 0 20 20` | nonzero |
| `X1_fill_WarningCircle` | 警告 | `0 0 20 20` | nonzero |

### 功能类

| 图标名 | 用途 | viewBox | fillRule |
|--------|------|---------|----------|
| `X1_fill_Bell` | 通知 | `0 0 17 19.9` | evenodd |
| `X1_fill_Setting` | 设置 | `0 0 17.39 19.8` | nonzero |
| `X1_fill_History` | 历史 | `0 0 17.7 19.7` | nonzero |
| `X1_fill_Manage` | 管理 | `0 0 18.01 18.01` | nonzero |
| `X1_fill_Member` | 成员 | `0 0 16.3 18.4` | nonzero |
| `X1_fill_Security` | 安全验证 | `0 0 16.98 19.21` | nonzero |
| `X1_fill_Send` | 下发/发送 | `0 0 20 20` | nonzero |
| `X1_fill_Transfer` | 转账 | `0 0 18 18` | nonzero |

---

## 图标尺寸规范

| 场景 | SVG width/height | 说明 |
|------|-----------------|------|
| Sidebar 菜单图标 | `18` | 侧栏菜单项 |
| 标准功能图标 | `20` | 按钮/表格操作/筛选 |
| Header 工具栏 | `24` | 顶部导航 |
| 小型辅助图标 | `16` | info ⓘ / 展开箭头 |
| 极小图标 | `12` | 标签内/状态点 |

---

## 图标颜色规范

| 场景 | fill 值 | 说明 |
|------|---------|------|
| 默认 | `currentColor` | 继承父元素文字色 |
| 主要操作 | `var(--text-primary)` / `#303236` | — |
| 辅助 | `var(--text-secondary)` / `#84888C` | — |
| 禁用 | `var(--text-quaternary)` / `#C4C7CA` | — |
| 品牌强调 | `var(--text-brand)` / `#68AD00` | Active 态 |
| 反色（深底） | `#FFFFFF` | Sidebar active 图标 |
| 危险 | `var(--tag-red-text)` / `#E54545` | 删除操作 |
| 成功 | `var(--tag-green-text)` / `#68AD00` | 成功状态 |

---

## 扩展：从 Sprite Sheet 提取新图标

当 `icon-map.json` 中缺少所需图标时：

1. 查看 `pay-b-icons.md` 确认图标分类和名称
2. 在 sprite 文件中定位（按分类）：
   - **产品功能图标** → `SVG/icon.svg` (1560×664, ~240 icons)
   - **Component 组件图标** → `SVG/Component.svg` (1560×88, ~38 icons)
   - **CEX Line 图标** → `SVG/CEX_Line.svg` (472×24, ~8 icons)
   - **Tabbar 图标** → `SVG/Tabbar.svg` (984×24, ~15 icons)
   - **Social Media 图标** → `SVG/Social Media.svg` (1240×24, ~19 icons)
3. 图标在 sprite 中按 64px 网格排列（24px 图标 + 40px 间距）
4. 提取方式：用 `viewBox` 裁切对应区域
5. 追加到 `icon-map.json` → 可选生成 `SVG/icons/` 独立文件

---

## 文件结构

```
SVG/
├── icon-map.json          ← 核心图标 JSON 注册表（生成时首选数据源）
├── icon-registry.md       ← 本文件（人类可读参考）
├── icons/                 ← 独立 SVG 文件（每个图标一个文件）
│   ├── X1_fill_Add.svg
│   ├── X1_fill_Bell.svg
│   ├── X1_fill_Search.svg
│   └── ...（共 26 个）
├── icon.svg               ← Figma 导出的产品图标 sprite sheet
├── Component.svg          ← Figma 导出的组件图标 sprite sheet
├── CEX_Line.svg           ← CEX 线性图标 sprite sheet
├── Tabbar.svg             ← Tabbar 图标 sprite sheet
└── Social Media.svg       ← 社交媒体图标 sprite sheet
```
