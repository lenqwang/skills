# Phase C: 样式迁移

> **铁律：先 1:1 复制，再优化。绝不跳步。**
>
> Phase C 的目标是让转换后的页面视觉与源 HTML **像素级一致**。
> 实现方式：将源 CSS **原样复制**到 CSS Modules，只做选择器重命名（`#id` / `.class` → `.camelCase`），**不改写任何样式值**。
>
> **必读配套**: [patterns/css-modules-pitfalls.md](../patterns/css-modules-pitfalls.md) — CSS Modules 迁移 8 大坑点（:global 作用域、not pure 错误、@keyframes 限制、overflow 破坏 fixed、DOM 移出后样式失效等）

---

## 核心原则（实测教训）

### ❌ 错误做法（上次实测失败的根因）

```
agent "理解" 源 CSS → 凭理解重写样式 → 丢失 backdrop-filter、box-shadow、::before/::after 等细节 → 视觉还原度极低
```

### ✅ 正确做法

```
Phase C-1: 原样复制源 CSS → 只改选择器名 → 视觉 100% 一致
Phase C-2: 确认视觉一致后 → 按需优化（提取变量、合并重复等）
```

**Phase C-1 和 C-2 之间必须做一次视觉验证。不验证不进 C-2。**

---

## Phase C-1: 精确复制（最关键）

### 步骤

1. **读取源 CSS 文件完整内容**（不要只读片段）
2. **按组件拆分**：根据 Phase B 的组件树，把源 CSS 中的规则分配到对应组件的 `.module.css`
3. **选择器重命名**：
   - `#v1-hero` → `.hero`
   - `.h1-video-card` → `.videoCard`
   - `.hero-cta.lottery-draw-btn` → `.heroCta`
   - `.gm-overlay.open` → `.overlay.open` → 用 composes 或双 class
4. **样式值不动**：所有 `background`、`box-shadow`、`border`、`backdrop-filter`、`::before`、`::after` 等**原样保留**
5. **@keyframes 原样复制**
6. **@media 原样复制**（断点值不改）
7. **伪元素原样复制**

### 选择器重命名规则

```
源 CSS                              CSS Module
──────────────────────────────────  ──────────────
#v1-hero                           .hero
#v1-hero .hero-bg-logo             .heroBgLogo
#v1-hero .hero-main-title          .mainTitle
.hero-cta.lottery-draw-btn         .heroCta
.hero-cta.lottery-draw-btn::before .heroCta::before     ← 伪元素跟着走
.hero-cta.lottery-draw-btn:hover   .heroCta:hover        ← 伪类跟着走
.side-nav.visible                  .sideNav.visible      ← 状态 class 保留
.gm-overlay.open                   .overlay  (open 态用 JS className 切换)
```

### CSS 中 url() 路径处理

**实测教训**：CSS Modules 中的 `url()` 会被 webpack/postcss 解析。

| 写法 | 结果 |
|------|------|
| `url('/assets/gate13/xxx.png')` | ⚠️ 被 postcss 处理，可能解析失败 |
| `url('https://xxx/xxx.png')` | ✅ 绝对 URL 不被处理 |
| 不在 CSS 中引用图片，改用 TSX `<img>` 或 inline style | ✅ 推荐 |

**规则：CSS 中尽量不写 `url()` 引用本地图片。背景图用 TSX 的 inline `style={{ backgroundImage: 'url(...)' }}` 代替。**

### inline style 处理

源 HTML 中的 inline `style="..."` 有两种处理方式：

1. **静态 inline style → 提取为 CSS class**（推荐）
2. **如果提取太复杂（如登机牌 50+ 行）→ 先保留为 JSX `style` prop，后续再优化**

**Phase C-1 的目标是视觉一致，不是代码完美。inline style 保留为 `style` prop 是可以接受的。**

### Tailwind class 处理

如果源 HTML 用了 Tailwind CDN：

1. **读取 tailwind.config 中的 extend 值**
2. **把 Tailwind utility class 还原为等价 CSS**
3. **注意 Tailwind 的隐含 reset**（如 `*` 选择器的 box-sizing）

---

## Phase C-2: 优化（视觉验证通过后）

### 可以做的优化

- 硬编码颜色 → CSS 变量 `var(--c-*)`
- 重复样式块 → 提取公共 class
- 冗余属性 → 删除
- font-family → 删除（--gate 模式，Gate_Sans 覆盖；monospace 例外）

### 不要做的优化

- 不要改 box-shadow 值（哪怕看起来"不优雅"）
- 不要简化 gradient（multi-stop 渐变不要合并）
- 不要删 vendor prefix（-webkit- 保留）
- 不要改 z-index 值（层级关系会乱）
- 不要改 transition/animation timing（体感会变）

---

## 给并行 agent 的关键指令

当用 agent 并行处理多个组件时，每个 agent 的 prompt 必须包含：

```
## CSS 迁移铁律
1. 读取源 CSS 文件的完整内容（不要只读片段）
2. 找到与此组件相关的所有 CSS 规则（包括 ::before/::after、:hover、@media）
3. 原样复制到 .module.css，只改选择器名（#id/.class → .camelCase）
4. 不要改写任何样式值（background、box-shadow、filter、opacity 等全部保留原值）
5. 不要遗漏伪元素和伪类
6. 不要遗漏 @media 响应式规则
7. CSS 中不要用 url() 引用本地图片，改用 TSX inline style
```

---

## className 映射注释

每个 `.module.css` 头部生成映射注释：

```css
/*
 * [html-to-next] CSS 精确迁移
 * 源: parallax-scroll-demo.css line 343-392 + HTML inline styles
 *
 * 源选择器              → CSS Module class
 * #v1-hero              → .hero
 * .hero-bg-logo         → .heroBgLogo
 * .hero-main-title      → .mainTitle
 * .hero-word            → .word
 * .hero-cta-group       → .ctaGroup
 * .hero-cta             → .heroCta  (原 .hero-cta.lottery-draw-btn)
 * .hero-cta::before     → .heroCta::before
 * .hero-cta:hover       → .heroCta:hover
 */
```

---

## Hydration 安全

实测发现的 hydration 问题：

| 问题 | 原因 | 解决 |
|------|------|------|
| `Text content did not match` | 服务端和客户端渲染不同文本 | 动态内容用 `suppressHydrationWarning` 或 useEffect 延迟 |
| `Encountered two children with the same key` | map 渲染时 key 不唯一 | 确保 key 唯一且稳定 |
| `Math.random()` 在 SSR/CSR 不同 | 随机值不确定 | 用确定性算法替代 |
| `Date.now()` / `new Date()` | 时间不一致 | 倒计时在 useEffect 中初始化 |
| `window.innerWidth` 在 SSR | window 不存在 | 用 useEffect 或默认值 |

---

## 检查清单

### Phase C-1 完成标准
- [ ] 源 CSS 每一行都能在目标 .module.css 中找到对应
- [ ] 所有 ::before / ::after 伪元素已复制
- [ ] 所有 :hover / :active / :focus 伪类已复制
- [ ] 所有 @keyframes 已复制
- [ ] 所有 @media 断点已复制
- [ ] CSS 中无 url() 引用本地图片（改用 TSX）
- [ ] 浏览器打开，视觉与源 HTML 一致

### Phase C-2 完成标准
- [ ] 硬编码颜色已替换为 CSS 变量（可选优化）
- [ ] 视觉仍与 Phase C-1 一致（不能因优化导致变化）
