# Design Toolkit 模块架构

> design-toolkit.js 已升级为模块化架构（v2），入口脚本自动加载 `_toolkit/` 下 11 个子模块。
> 零依赖、即插即用，任意 HTML 页面加一行 `<script>` 即可获得全部功能。

---

## 文件结构

```
design-toolkit.js        ← 入口（自动加载 _toolkit/ 子模块）
_toolkit/
  ├── _core.js           ← 核心：CSS 变量管理、主题持久化、颜色缓存
  ├── _dom.js            ← DOM 注入：工具栏、设计面板、Showcase 容器
  ├── _design-panel.js   ← 设计面板：变量编辑、预设切换、导入导出
  ├── _showcase.js       ← 组件总览：手动注册 + DOM 自动发现
  ├── _inspector.js      ← 编辑模式：选中、标注、上下文操作栏
  ├── _drag.js           ← 拖拽 & 缩放：移动元素、8 方向缩放
  ├── _snap.js           ← 对齐参考线：拖拽时自动吸附 + 距离标注
  ├── _smart-layout.js   ← 智能布局：模式识别 + 响应式推荐
  ├── _screenshot.js     ← 截图标注：区域截图 + 元素截图
  ├── _persistence.js    ← 标注持久化：URL Hash / HTML 内嵌恢复
  └── _misc.js           ← 杂项：快捷键 H 隐藏 UI、低端机模式
```

---

## 工具栏功能

页面右下角固定工具栏，包含 5 个按钮：

| 按钮 | 功能 |
|------|------|
| **收起/展开** | 折叠工具栏为小圆点 |
| **编辑模式** | Figma 风格的元素编辑器 |
| **断点** | 375 → 768 → 1248 → 原始宽度 循环切换 |
| **组件总览** | 全屏 Showcase 面板 |
| **设计面板** | 右侧主题变量编辑抽屉 |

---

## 键盘快捷键

### 编辑模式

| 快捷键 | 功能 |
|--------|------|
| `Click` | 选中元素 |
| `Shift + Click` | 多选 |
| `Alt + Click` | 穿透图层选择 |
| `⌘A` / `Ctrl+A` | 全选同层兄弟 |
| `←↑→↓` | 微调 1px |
| `Shift + ←↑→↓` | 微调 10px |
| `Double Click` | 文字进入编辑 / 非文字打开标注 |
| `Delete` | 隐藏元素（可撤销） |
| `⌘Z` / `Ctrl+Z` | 撤销（最多 50 步） |
| `Esc` | 逐层退出 |

### 全局

| 快捷键 | 功能 |
|--------|------|
| `H` | 隐藏/显示所有 Toolkit UI |

---

## 高级配置

在引入 `design-toolkit.js` **之前**设置 `window.__TOOLKIT__`：

```html
<script>
window.__TOOLKIT__ = {
  presets: {
    dark: { name: '深色主题', '--c-bg': '#0a0a0b', '--c-txt': '#fff' },
    light: { name: '浅色主题', '--c-bg': '#ffffff', '--c-txt': '#1a1a1a' }
  },
  autoOverlaySelectors: ['[id$="-overlay"]', '.my-modal'],
  autoHiddenSelectors: ['#side-nav', '.empty-state'],
  extraLabels: { '--my-color': '自定义颜色' },
  exportMap: { button: { bg: '--btn-bg', color: '--btn-color' } }
};
</script>
<script src="design-toolkit.js"></script>
```

---

## 公共 API

所有方法挂载在 `window._tk`：

```js
_tk.preset('dark')       // 切换主题预设
_tk.reset()              // 重置为默认值
_tk.expCSS()             // 导出 CSS 变量
_tk.expJSON()            // 导出 JSON
_tk.expHTML()            // 导出完整 HTML（含资源打包 ZIP）
_tk.impJSON()            // 导入主题 JSON
_tk.saveAs()             // 保存当前配色为新预设
_tk.insToggle()          // 切换编辑模式
_tk.insExport()          // 导出标注 JSON
_tk.insShareLink()       // 生成带标注的分享链接
_tk.bpToggle()           // 切换断点
```

全局辅助：

```js
getVar('--c-bg')         // 获取 CSS 变量值
setVar('--c-bg', '#000') // 设置 CSS 变量值
window.C                 // 颜色缓存对象
refreshC()               // 刷新颜色缓存
```

---

## 编辑模式详解

### 上下文操作栏

选中元素后弹出浮动工具条，按元素类型动态显示：

| 操作 | 说明 |
|------|------|
| **编辑文字** | 双击或按 T，行内修改文字 |
| **换图** | 图片元素可 URL 输入或本地上传 |
| **改背景/描边/文字色** | 弹出颜色选择器 + Token 色板 |
| **改字号** | 滑块调节 + R10 推荐值 |
| **改间距** | padding 四方向 + gap 调节 |
| **布局推荐** | 智能识别 15 种模式，一键优化 |
| **尺寸/位置** | W/H/X/Y 精准数值调节 |
| **添加标注** | 填写修改说明，支持附图 |
| **截图** | 截取元素为图片标注 |

### 标注系统

- 5 种操作类型：**修改 / 前插 / 后插 / 替换 / 删除**
- 拖拽、缩放、文字编辑均**自动生成标注**
- 标注可导出为 JSON / 生成分享链接
- 页面元素上显示编号角标

### 智能布局引擎

自动识别 15 种 UI 模式（Hero、卡片网格、时间线、FAQ、Tab 等），提供：
- 10 种布局诊断（溢出、重叠、截断、空白浪费等）
- 三断点响应式推荐方案
- 一键优化 + 对比预览

---

## 兼容性

- Chrome / Edge 90+
- Safari 15+
- Firefox 90+
