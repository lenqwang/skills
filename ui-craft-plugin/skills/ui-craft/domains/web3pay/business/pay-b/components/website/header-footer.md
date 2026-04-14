---
scope: [web3pay]
layer: L2
context: pay-b-website
---

# Header+Footer 官网顶部导航

> 来源: Figma [Pay-B端官网](https://www.figma.com/design/5fRySZo785Q1QHfn8FxqeN/) · Node `8577:7554`
> 归属: web3pay / Pay-B 官网（营销 Web）
> 版本: v1.0.0
> 状态: 从 Figma 提取，待补充 Footer 部分

## 组件概述

Pay-B 官网顶部导航栏（48px），含 Logo、产品导航、登录/注册、工具栏。与商户后台 Header（72px）为不同组件。适用于 GatePay 官方网站、产品 Landing Page 等营销页面。

## 与 Pay-B 后台 Header 对比

| 维度 | 官网 Header（本组件） | 后台 Header（pay-b-header.md） |
|------|---------------------|-------------------------------|
| 高度 | **48px** | 72px |
| 背景 | 白色 + `backdrop-filter: blur(50px)` | 纯白色 |
| Logo | Gate Pay（标志 + "Pay" 文字） | 无 Logo（Logo 在 Sidebar） |
| 导航 | 产品/行业方案/开发者（带下拉） | 无导航链接 |
| 右侧 | Log In + Sign Up + 下载 + 语言 | 客服/帮助/语言/设置 + 用户头像 |
| 定位 | 全宽通栏 | `left: var(--sidebar-width)` |

---

## 基础规格

| 属性 | Token / CSS 变量 | 值 | 说明 |
|------|-----------------|-----|------|
| 高度 | — | **48px** | 含 backdrop-blur |
| 宽度 | — | `100%`（设计宽度 1920px） | 全宽通栏 |
| 背景 | `var(--color-bg-primary)` | `#FFFFFF` | 白色 |
| 模糊 | — | `backdrop-filter: blur(50px)` | 毛玻璃效果 |
| 内边距 | — | `0 24px` | 左右 24px |
| 布局 | — | `display:flex; align-items:center; justify-content:space-between` | 左右两端对齐 |
| z-index | — | 100 | 浮于顶层 |

---

## 布局结构

```
┌──────────────────────────────────────────────────────────────────────────┐
│ [Logo] 40px    产品▼  行业方案▼  开发者▼          Log In [Sign Up] │ ↓ 🌐 │
│  Gate Pay                                                               │
└──────────────────────────────────────────────────────────────────────────┘
  ← 24px →                                                        ← 24px →
```

### 三大区域

| 区域 | 内容 | 间距 | 说明 |
|------|------|------|------|
| **左侧** | Logo + 导航链接 | `gap: 40px`（Logo 与导航组之间） | flex 子项 |
| **右侧** | Log In + Sign Up + 分隔线 + 下载 + 语言 | `gap: 16px` | flex 子项 |

---

## Logo 区域

| 属性 | 值 | 说明 |
|------|-----|------|
| 容器 | 120 × 28px | 包含 SVG 标志 + "Pay" 文字 |
| 标志 | SVG 图形（绿色 G 图标 + "Gate" 文字） | Figma node `8577:7561` |
| "Pay" 文字 | 21.4px / Regular / `var(--color-text-text-primary, #070808)` | Switzer 字体 |
| "Pay" 定位 | `left: 81.53px`，垂直居中 | 紧跟 Gate 标志后 |

---

## 导航链接

| 属性 | 值 | 说明 |
|------|-----|------|
| 容器间距 | `gap: 20px` | 导航项之间 |
| 文字字号 | **14px** | Switzer Medium (500) |
| 文字颜色 | `var(--color-text-text-primary, #070808)` | 主文字色 |
| 行高 | 1.3 | 标准行高 |
| 下拉箭头 | `CEX_down_fill` 16×16px | 紧跟文字（`gap: 2px`） |
| 箭头方向 | 默认朝下，展开时 `rotate(180deg)` | 动画 transition |

### 导航项列表

| 序号 | 文案 | Figma Node | 说明 |
|------|------|-----------|------|
| 1 | **产品** | `8577:7577` | 带下拉面板 |
| 2 | **行业方案** | `8577:7580` | 带下拉面板 |
| 3 | **开发者** | `8577:7583` | 带下拉面板 |

---

## 右侧工具栏

| 元素 | 规格 | Figma Node | 说明 |
|------|------|-----------|------|
| **Log In** | 14px / Medium / `#070808` | `8577:7588` | GateSans5.1 字体，纯文字链接 |
| **Sign Up** | 12px / Medium / `#000000`（黑字） | `8577:7589` | ButtonV5-web 组件 |
| ↳ 按钮背景 | `var(--button/primary/bg, #ADF73E)` | — | GTPay 品牌绿 |
| ↳ 按钮高度 | **28px**（XXSmall 档位） | — | `border-radius: 99px` |
| ↳ 按钮内边距 | `0 12px` | — | 紧凑尺寸 |
| **分隔线** | 1px × 16px 竖线 | `8577:7590` | `Divider-Web` 小竖线变体 |
| **下载图标** | `CEX_Download` 24×24px | `8577:7591` | App 下载入口 |
| **语言图标** | `CEX_Language` 24×24px | `8577:7592` | 多语言切换 |

---

## 状态变体

| 状态 | 说明 |
|------|------|
| **未登录**（当前） | 显示 Log In + Sign Up |
| **已登录** | Log In / Sign Up 替换为用户头像 + 用户名（参照 Figma 变体） |

> 当前仅提取「未登录」变体（Figma node `8577:7555`），已登录变体待补充。

---

## 字体规格

| 元素 | 字体 | 字号 | 字重 | 色值 | Figma Token |
|------|------|------|------|------|-------------|
| "Pay" Logo 文字 | Switzer | 21.4px | Regular | `#070808` | — |
| 导航文字 | Switzer / Noto Sans SC/JP | 14px | Medium (500) | `#070808` | `Web_V5/Body/B7` |
| "Log In" | GateSans5.1 | 14px | Medium (500) | `#070808` | `Web_V5/Body/B7` |
| "Sign Up" | Switzer | 12px | Medium (500) | `#000000` | `Web_V5/Body/B11` |

---

## CSS 实现参考

```css
.website-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 48px;
  background: var(--color-bg-primary, #FFFFFF);
  backdrop-filter: blur(50px);
  -webkit-backdrop-filter: blur(50px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  z-index: 100;
}

.website-header__left {
  display: flex;
  align-items: center;
  gap: 40px;
}

.website-header__logo {
  width: 120px;
  height: 28px;
  flex-shrink: 0;
}

.website-header__nav {
  display: flex;
  align-items: center;
  gap: 20px;
}

.website-header__nav-item {
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-text-primary, #070808);
  cursor: pointer;
  border: none;
  background: none;
  line-height: 1.3;
  white-space: nowrap;
  transition: color 150ms ease;
}

.website-header__nav-item:hover {
  color: var(--gtpay-text-brand, #68AD00);
}

.website-header__nav-arrow {
  width: 16px;
  height: 16px;
  transition: transform 200ms ease;
}

.website-header__nav-item--open .website-header__nav-arrow {
  transform: rotate(180deg);
}

.website-header__right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.website-header__login {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-text-primary, #070808);
  cursor: pointer;
  border: none;
  background: none;
  white-space: nowrap;
}

.website-header__login:hover {
  color: var(--gtpay-text-brand, #68AD00);
}

.website-header__signup {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 28px;
  padding: 0 12px;
  border-radius: 99px;
  border: none;
  background: var(--gtpay-color-brand, #ADF73E);
  color: #000000;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.3;
  cursor: pointer;
  white-space: nowrap;
  transition: background 150ms ease;
}

.website-header__signup:hover {
  background: var(--gtpay-color-buttonhover, #8BD121);
}

.website-header__divider {
  width: 1px;
  height: 16px;
  background: var(--color-divider-short, #C4C7CA);
  flex-shrink: 0;
}

.website-header__icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--color-text-text-primary, #070808);
  border: none;
  background: none;
  transition: color 150ms ease;
}

.website-header__icon:hover {
  color: var(--gtpay-text-brand, #68AD00);
}
```

---

## HTML 参考

```html
<header class="website-header">
  <div class="website-header__left">
    <!-- Logo -->
    <div class="website-header__logo">
      <svg viewBox="0 0 120 28"><!-- Gate Pay Logo SVG --></svg>
    </div>
    <!-- Navigation -->
    <nav class="website-header__nav">
      <button class="website-header__nav-item">
        产品
        <svg class="website-header__nav-arrow" viewBox="0 0 16 16" fill="currentColor"><!-- CEX_down_fill --></svg>
      </button>
      <button class="website-header__nav-item">
        行业方案
        <svg class="website-header__nav-arrow" viewBox="0 0 16 16" fill="currentColor"><!-- CEX_down_fill --></svg>
      </button>
      <button class="website-header__nav-item">
        开发者
        <svg class="website-header__nav-arrow" viewBox="0 0 16 16" fill="currentColor"><!-- CEX_down_fill --></svg>
      </button>
    </nav>
  </div>
  <div class="website-header__right">
    <button class="website-header__login">Log In</button>
    <button class="website-header__signup">Sign Up</button>
    <div class="website-header__divider"></div>
    <button class="website-header__icon" title="Download">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><!-- CEX_Download --></svg>
    </button>
    <button class="website-header__icon" title="Language">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><!-- CEX_Language --></svg>
    </button>
  </div>
</header>
```

---

## 数据接口

```typescript
interface WebsiteHeaderProps {
  variant: 'logged-out' | 'logged-in';
  navItems: Array<{
    label: string;
    hasDropdown: boolean;
    children?: Array<{ label: string; href: string }>;
  }>;
  onLogin?: () => void;
  onSignup?: () => void;
  locale?: string;
}
```

---

## 引用关系

- **不同于** Pay-B 后台 Header：`components/pay-b/pay-b-header.md`（72px，无 Logo，无导航）
- **布局参考**：`layout.md → Pay-B 官网（pay-b-website）布局`
- **按钮复用**：Sign Up 使用 `ButtonV5-web` XXSmall 档位（28px），见 `components/pay-b/pay-b-button.md`
- **图标**：`CEX_Download`、`CEX_Language`、`CEX_down_fill`，见 `SVG/icon-registry.md`

---

## 待补充

- [ ] 已登录变体（用户头像 + 用户名）
- [ ] 导航下拉面板（产品/行业方案/开发者的 Dropdown 内容）
- [ ] Footer 组件（同 Figma 文件中的 Footer 节点）
- [ ] 响应式断点（移动端 hamburger 模式）
- [ ] Dark Mode 变体
