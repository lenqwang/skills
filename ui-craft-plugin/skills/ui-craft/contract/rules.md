# 强制规则（约束层）

> 验证层，输出前的自检清单。违反即为错误，不是建议。
> 设计原则见 `design-contract.md`。

## 严重性分级

| 级别 | 标记 | 含义 | 输出影响 |
|------|------|------|----------|
| blocking | `[B]` | 必须修复 | 存在任何 [B] 违规 -> 禁止输出，修复后重新验证 |
| warning | `[W]` | 记录不阻断 | 标注在输出注释中，提醒人工关注 |

---

## 1. 样式系统

### R1: 代码生成策略（重要）[B]

```
核心原则：所有视觉值通过 CSS 变量引用，禁止硬编码

生成流程：
1. 读取当前域的语义 Token（domains/{domain}/semantic.md + style 定义文件）
2. 在 .page wrapper 中定义完整 CSS 变量
3. 所有组件样式通过 var(--xxx) 引用变量
4. 深浅模式通过 :global(.classic-dark) 覆盖变量值

❌ 在 CSS 中硬编码颜色值（如 color: #0068FF）
❌ 在 CSS 中硬编码圆角值（如 border-radius: 32px）而不用变量
❌ 使用内联 style（动态值除外）
✅ 使用 var(--brand)、var(--bg-card) 等 CSS 变量
✅ 间距/排版可直接写数值（遵循 4px 基准和排版规格表）
```

**check**: 搜索 CSS 输出中的 `#hex`/`rgb()`/`rgba()` 值 -> 排除 `.page` 变量定义区块和渐变/阴影例外 -> 剩余即违规。搜索 `border-radius: <非var值>` -> 违规。

**fix**: 硬编码颜色 -> 替换为对应语义 CSS 变量 `var(--xxx)`。硬编码圆角 -> 替换为 `var(--radius-xxx)`。如无对应变量，在 `.page` 变量定义区新增。

**CSS 变量定义位置**：

```css
/* page.module.css */
.page {
  --bg: #070808;
  --bg-card: #1F2023;
  --text-primary: #FAFAFA;
  --brand: #0068FF;
  --accent: #A7F757;
  /* ... 完整变量表见 semantic.md */

  background: var(--bg);
  color: var(--text-primary);
}

/* 深色模式覆盖 */
:global(.classic-dark) .page {
  --bg: #070808;
  --text-primary: #FAFAFA;
  /* ... */
}
```

---

### R2: 样式系统约束 [B]

```
使用 CSS Modules（.module.css）作为样式载体：

✅ CSS Modules 中写标准 CSS + var() 引用
✅ 组件通过 className={styles.xxx} 使用样式
✅ .page wrapper 定义所有 CSS 变量
✅ :global(.classic-dark) 用于深浅模式切换

❌ 使用内联 style 属性（动态值除外）
❌ 使用全局 CSS（除 :global 模式切换）
❌ 使用 styled-components
```

**check**: 搜索 JSX 中的 `style={` 或 `style="` -> 排除动态值场景（条件表达式中的变量绑定）-> 剩余即违规。搜索 `styled-components` / `styled.` 导入 -> 违规。

**fix**: 内联 style -> 提取到 CSS Modules 对应类名中，组件使用 `className={styles.xxx}`。styled-components -> 改用 CSS Modules。

**CSS Modules 正确用法**：

```css
/* ✅ 正确：CSS Modules + CSS 变量 */
.card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-card-lg);
  padding: var(--space-card);
  color: var(--text-primary);
}

.card:hover {
  background: var(--bg-elevated);
  transition: var(--transition);
}

/* ❌ 错误：硬编码值 */
.card {
  background: #1F2023;
  border-radius: 32px;
  color: #FAFAFA;
}
```

**组件中使用**：

```tsx
import styles from './Card.module.css'

// ✅ 正确：CSS Modules
<div className={styles.card}>

// ❌ 禁止：内联样式
<div style={{ backgroundColor: '#1F2023' }}>
```

---

## 2. 颜色

### R3: 禁止硬编码颜色 [B]

```
所有颜色必须通过 CSS 变量引用：

❌ color: #0068FF
❌ background: rgba(255,255,255,0.1)
✅ color: var(--brand)
✅ border-color: var(--border)

例外：
- 渐变中的色值（linear-gradient 参数需写在 style 的 CSS 变量表中）
- 阴影中的 rgba 值（定义在 component.md 的组件规格中）
```

**check**: 搜索 CSS 属性值中的 `#hex`/`rgb()`/`rgba()` -> 排除 `.page` 变量定义行、`linear-gradient()` 内部、`box-shadow` 值 -> 剩余即违规。

**fix**: 识别硬编码颜色的语义用途（背景/文字/边框/品牌） -> 替换为对应 `var(--xxx)`。无对应变量时，在 `.page` 变量定义区新增语义变量。

### R4: 强调色使用限制 [B]

```
强调色 var(--accent) 仅用于：
✅ 金额/数值高亮
✅ 关键数据强调
❌ 普通文字
❌ 背景色（除非透明度处理）
❌ 边框色
```

**check**: 搜索所有 `var(--accent)` 使用点 -> 检查对应 HTML 元素是否为金额/数值/百分比/关键数据。非此类内容 -> 违规。

**fix**: 非金额内容使用 `var(--accent)` -> 替换为 `var(--text-primary)` 或 `var(--brand)`。装饰性强调 -> 改用 `var(--brand)` + opacity。

### R5: 状态色语义 [W]

```
var(--success) -> 成功、完成、正向
var(--warning) -> 警告、注意、风险提示
var(--error) -> 错误、失败、负向
var(--info) -> 信息、提示、中性
```

**check**: 搜索 `var(--success)`/`var(--warning)`/`var(--error)`/`var(--info)` 使用点 -> 检查语义是否匹配上述定义。

**fix**: 语义错配 -> 替换为正确的状态色变量。

### R6: 深浅模式一致性 [W]

```
同一组件在深色模式和浅色模式下：
- 通过 :global(.classic-dark) 覆盖 CSS 变量值
- 不引入新的颜色值
- 对比度保持一致
```

**check**: 检查 `:global(.classic-dark)` 覆盖块中是否引入了非变量表中的新颜色值。检查覆盖块是否遗漏关键变量。

**fix**: 新引入颜色 -> 提取为 CSS 变量并在两个模式中都定义。遗漏变量 -> 补充覆盖。

---

## 3. 间距

### R7: 间距遵循 4px 基准 [B]

```
所有间距必须是 4px 的倍数：
✅ padding: 16px / 24px / 32px
✅ gap: 24px
✅ margin-bottom: var(--space-section)
❌ padding: 13px / 15px / 17px（非 4px 倍数）
```

**check**: 提取 CSS 中所有 `padding`/`margin`/`gap`/`top`/`right`/`bottom`/`left` 的 px 值 -> 验证 `值 % 4 === 0`。排除 `1px`（边框） -> 不符合即违规。

**fix**: 非 4px 倍数间距 -> 调整为最近的 4px 倍数值（如 13px -> 12px，15px -> 16px）。

### R8: 同类元素间距一致 [W]

```
同一列表/网格中的元素间距必须相同：
✅ gap: 24px 贯穿整个列表
❌ 第一个 gap 16px，第二个 gap 24px
```

**check**: 同一容器（列表/网格）内的子元素 -> 检查 gap/margin 值是否统一。

**fix**: 统一为列表中最常用的间距值。

### R9: 区块间距层级 [W]

```
区块间距必须遵循递增层级：
相关内容块 < 标准区块间 < 首屏到内容/底部

具体数值由域 layout 定义（如 Campaign 40/64/96px，Exchange 紧凑间距参照 R-P4）。
```

**check**: 检查 section 之间的间距是否递增，且符合当前域 layout 定义的层级关系。

**fix**: 调整 section 间距使其符合域 layout 定义的层级递增关系。

---

## 4. 圆角

### R10: 圆角层级 [B]

```
圆角必须通过 CSS 变量引用，且遵循层级关系：
弹窗 var(--radius-modal) >= 卡片 var(--radius-card) >= 按钮 var(--radius-btn) >= 输入框 var(--radius-input)

具体数值由域 semantic 定义（各域数值不同）。
域可定义额外圆角变体（如 --radius-card-lg），但必须纳入层级体系。
```

**check**: 提取所有圆角变量的实际值 -> 验证层级关系 modal >= card >= btn >= input。检查圆角是否通过 `var(--radius-xxx)` 引用。

**fix**: 不符合层级 -> 调整变量值使层级成立。硬编码圆角 -> 替换为对应 `var(--radius-xxx)`。

### R11: 同类组件圆角一致 [W]

```
同一页面的所有主按钮：相同圆角
同一页面的所有卡片：相同圆角
```

**check**: 同类组件（所有 `.btn-*`/所有 `.card-*`）-> 检查 `border-radius` 值是否统一。

**fix**: 统一为该组件类型的标准圆角变量。

---

## 5. 字体

### R12: 禁止指定 font-family [B]

```
项目已通过全局字体包统一加载字体，禁止在组件/页面中额外指定 font-family。

❌ font-family: 'xxx', sans-serif
❌ font-family: var(--font-xxx)
❌ 从设计稿直接 copy 字体名（设计稿命名与代码不同）
✅ 直接写 font-weight: 400 / 500 / 600 / 700
✅ 依赖全局字体继承

原因：
- 全局已通过 @font-face 加载 Gate 品牌字体（Gate_Sans / Gate Switzer 为同一字体）
- 公共 CSS 已设置 font-family，所有页面自动继承
- 设计稿中的字体名在代码中可能不同，直接 copy 会导致 fallback 到系统字体
```

**check**: 搜索 CSS/TSX 中的 `font-family` 声明 -> 排除全局 @font-face 定义文件 -> 剩余即违规。

**fix**: 删除 `font-family` 声明，仅保留 `font-weight` 控制字重变化。

---

## 6. 排版

### R13: 标题层级 [B]

```
H1 > H2 > H3 > Body，不得跳级：H1 后面不能直接跟 H3。
具体字号由域 semantic.md 定义（各域字阶不同）。
```

**check**: 提取 HTML 中 h1-h6 标签序列 -> 验证不存在 gap > 1 的跳级（如 h1 后直接 h3）。验证字号递减且匹配域 semantic 定义。

**fix**: 跳级标题 -> 插入缺失的中间级别，或调整为正确的标题层级。字号不匹配 -> 参照域 semantic.md 修正。

### R14: 字重使用 [W]

```
700 (bold) -> 仅用于强调标题
600 (semibold) -> 标题、CTA
500 (medium) -> 按钮、Tab
400 (regular) -> 正文
```

**check**: 检查 `font-weight` 值 -> 验证使用场景是否匹配上述映射。

**fix**: 字重错配 -> 调整为匹配场景的正确字重值。

### R15: 行高规范 [W]

```
标题: 1.15-1.25 (tight)
正文: 1.3 (relaxed)
注释: 1.5 (loose)
```

**check**: 检查标题/正文/注释的 `line-height` 值是否在规定范围内。

**fix**: 超出范围 -> 调整为规定范围内的值。

---

## 7. 布局

### R16: 内容最大宽度 [B]

```
内容区必须有 max-width 约束，超出部分使用居中 + 左右边距。
具体 max-width 值由域 layout 定义（如 Campaign 1200px，Exchange H5 375px / Web 1200px）。
```

**check**: 检查主内容容器是否设置了 `max-width` 且有 `margin: 0 auto`。验证 max-width 值是否匹配当前域 layout 定义。

**fix**: 无 max-width -> 添加域 layout 定义的值 + `margin: 0 auto`。

### R17: 响应式断点 [W]

```
必须使用域 layout 定义的响应式断点，禁止自定义非标准断点。
各域断点参照：
- Campaign: 768px / 1248px
- Exchange: 768px / 1024px / 1920px
- Web3Pay: 参照域 responsive.md
```

**check**: 搜索 `@media` 查询 -> 验证断点值是否匹配当前域 layout 定义。

**fix**: 非标准断点 -> 替换为当前域 layout 定义的断点值。

### R18: 触摸目标 [W]

```
可交互元素在移动端/平板:
最小尺寸: 44px x 44px
```

**check**: 检查 `button`/`a`/可点击元素的尺寸属性 -> 验证 min-height/min-width >= 44px（或通过 padding 达到）。

**fix**: 不足 44px -> 增加 padding 或设置 `min-height: 44px; min-width: 44px;`。

---

## 8. 图标

### R19: 禁止 emoji 作为图标 [B]

```
❌ <span>🎉</span>
❌ <Button>下载 ⬇️</Button>
✅ <GateUIIconA16pxGuanbi size={16} />
```

**check**: 搜索 Unicode emoji 范围（U+1F600-1F9FF, U+2600-26FF, U+2700-27BF, U+FE00-FE0F, U+1F000-1F02F 等）-> 发现即违规。

**fix**: emoji -> 替换为 `@gate/iconfont` 对应图标组件。无对应图标 -> 使用 CSS 图形或 SVG 占位。

### R20: 必须使用 @gate/iconfont [B]

```
所有图标必须来自 @gate/iconfont 包：
✅ import { GateUIIconA16pxGuanbi } from '@gate/iconfont'
❌ 使用第三方图标库
❌ 使用 emoji
❌ 使用图片作为图标
```

**check**: 搜索图标相关导入 -> 验证来源为 `@gate/iconfont`。搜索 `<img>` 用作图标的场景。

**fix**: 第三方图标 -> 替换为 `@gate/iconfont` 中的对应图标。`<img>` 图标 -> 替换为 iconfont 组件。

### R21: 图标尺寸规范 [W]

```
标准尺寸：16 / 20 / 24 / 32
同一页面内同类图标尺寸保持一致
```

**check**: 检查图标组件的 `size` 属性 -> 验证为 16/20/24/32 之一。同类场景的图标尺寸是否统一。

**fix**: 非标准尺寸 -> 调整为最近的标准尺寸。

### R22: 图标颜色规范 [W]

```
优先使用 currentColor 继承父元素颜色
可使用 CSS 变量：
- color: var(--text-primary)
- color: var(--text-secondary)
- color: var(--brand)
```

**check**: 检查图标的 `color` 属性 -> 验证为 `currentColor` 或 CSS 变量。

**fix**: 硬编码颜色 -> 改用 `currentColor` 或对应 CSS 变量。

---

## 9. 组件

### R23: 主 CTA 唯一性 [B]

```
每屏最多一个主 CTA（视觉最强烈）
多个操作时使用层级区分：主按钮 > 次要按钮 > 文字链接
```

**check**: 每个 section/可视区域内 -> 计算主 CTA（最强视觉样式的按钮）数量 -> 超过 1 个即违规。

**fix**: 多余主 CTA -> 降级为次要按钮样式（降低背景对比度、缩小尺寸）或改为文字链接。

### R24: [已迁移至 contract/rules-ext/campaign.md → R-C1]

---

## 10. 可访问性

### R25: 对比度 [B]

```
文字与背景对比度:
- 正常文字: >= 4.5:1
- 大文字 (18px+): >= 3:1
```

**check**: 计算前景色与背景色的对比度 -> 正常文字 < 4.5:1 或大文字 < 3:1 -> 违规。

**fix**: 对比度不足 -> 加深/加亮文字颜色，或调整背景色，直到达标。

### R26: 焦点状态 [B]

```
所有可交互元素必须有焦点状态
焦点样式使用 var(--brand)
```

**check**: 检查 `button`/`a`/`input` 等元素 -> 是否定义了 `:focus` 或 `:focus-visible` 样式。

**fix**: 缺少焦点状态 -> 添加 `:focus-visible { outline: 2px solid var(--brand); outline-offset: 2px; }`。

### R27: 语义化 [B]

```
按钮使用 <button> 而非 <div>
链接使用 <a> 而非 <span onclick>
图片必须有 alt 属性
```

**check**: 搜索 `<div onClick`/`<span onClick` -> 应为 `<button>`/`<a>`。搜索 `<img` -> 验证有 `alt` 属性。

**fix**: `<div onClick>` -> 改为 `<button>`。`<span onClick>` 导航 -> 改为 `<a href>`。`<img>` 无 alt -> 添加描述性 alt 文本。

---

## 11. 组件规格

### R28: 组件规格合规 [B]

```
所有组件样式必须遵循 domains/{domain}/components/<type>.md 中定义的规格。
规格中已定义的属性（background, border-radius, padding, color, height 等）必须使用规格值。
规格中未定义的属性（自定义装饰、动画等）可自由添加。
```

**check**: 识别页面中每个组件类型（button/card/modal/input/table/countdown/tab 等）-> 对照对应 `domains/{domain}/components/<type>.md` 的规格表 -> 检查已定义属性的值是否匹配（允许通过 CSS 变量间接匹配）。

**fix**: 属性值不匹配 -> 替换为规格表中定义的 Token/CSS 变量引用。例如按钮 `border-radius: 12px` -> `border-radius: var(--radius-btn)`。

---

## 自检清单

> **唯一权威来源**。design-contract.md 和 SKILL.md 引用此清单，不重复定义。

输出代码前，逐条检查：

### 样式系统
- [ ] [B] 颜色/圆角通过 CSS 变量（`var(--xxx)`）引用，无硬编码 (R1/R3/R10)
- [ ] [B] 使用 CSS Modules，无内联 style（动态值除外）(R2)
- [ ] [B] `.page` wrapper 定义了完整 CSS 变量 (R1)
- [ ] [W] 深浅模式通过 `:global(.classic-dark)` 切换 (R6)

### 颜色
- [ ] [B] 强调色（`--accent`）仅用于金额/关键数据 (R4)
- [ ] [W] 状态色语义正确（success/warning/error/info）(R5)

### 间距与圆角
- [ ] [B] 间距遵循 4px 基准 (R7)
- [ ] [W] 同类元素间距一致 (R8)
- [ ] [B] 圆角符合层级规则 (R10)
- [ ] [W] 同类组件圆角一致 (R11)

### 字体
- [ ] [B] 未指定 font-family，依赖全局字体继承 (R12)

### 排版
- [ ] [B] 标题没有跳级 (R13)
- [ ] [W] 字重使用正确（400/500/600/700）(R14)
- [ ] [W] 行高在规定范围内 (R15)

### 布局
- [ ] [B] 内容区有 max-width 约束，匹配域 layout 定义 (R16)
- [ ] [W] 响应式断点匹配域 layout 定义 (R17)
- [ ] [W] 可交互元素 >= 44px (R18)

### 图标
- [ ] [B] 使用 @gate/iconfont，无 emoji (R19/R20)
- [ ] [W] 图标尺寸标准化（16/20/24/32）(R21)

### 组件
- [ ] [B] 组件样式遵循 domains/*/components/*.md 规格定义 (R28)
- [ ] [B] 每屏最多一个主 CTA (R23)

### 可访问性
- [ ] [B] 对比度符合标准（正常 >= 4.5:1，大字 >= 3:1）(R25)
- [ ] [B] 可交互元素有焦点状态 (R26)
- [ ] [B] 使用正确的语义化 HTML (R27)

### 设计质量
- [ ] [W] 未命中 AI 模式化反模式（渐变装饰/卡片堆叠/霓虹发光/bounce 缓动）(R29)
- [ ] [W] CTA 文案为具体动词+目标，错误/空状态提供下一步指引 (R30)

---

## 12. 设计质量

### R29: 反 AI 模式化设计 [W]

```
检测并避免以下 "AI slop" 视觉模式，命中时需主动修正为有品牌意图的方案。

颜色反模式：
❌ 青色/霓虹蓝 + 纯暗背景（#00FFxx on #0a0a0a 风格）
❌ 紫到蓝渐变作为主视觉（AI 生成的"科技感"标配）
❌ 霓虹发光效果滥用（glow/neon 遍地开花）
❌ 纯黑 #000000 / 纯白 #FFFFFF 无色温倾向（自然阴影有色彩）
❌ 无业务意图的 glassmorphism 滥用（到处 backdrop-filter: blur，域/业务规格明确要求的除外）
✅ 使用 design-contract 定义的品牌色系
✅ 渐变服务于信息层级，不做纯装饰

布局反模式：
❌ 千篇一律的等高卡片网格（3×N 卡片墙）
❌ 大圆角图标 + 标题 + 描述的重复堆叠
❌ 嵌套卡片超过 2 层（卡片里套卡片里再套卡片）
❌ 纯装饰性 sparkline / 迷你图表
❌ Hero 区巨大数字 + 小标签 + 渐变的"指标卡"
✅ 用间距和排版建立层次，而非靠容器嵌套
✅ 组件选择服务于内容，而非填充页面

排版反模式：
❌ 渐变文字用于普通数据指标
❌ 等宽字体当"科技感"装饰（非数据/代码场景）
❌ 使用 Inter / Roboto / Open Sans 等"AI 默认字体"
✅ 排版层次通过字号 + 字重 + 颜色组合建立

动效反模式：
❌ bounce / elastic 缓动（不稳定、不专业）
❌ animate layout properties（width/height/top/left）
❌ 滥用 will-change（无必要的 GPU 图层提升）
❌ 所有元素统一 300ms ease（缺乏节奏感）
✅ 仅 animate transform + opacity
✅ 指数缓动（ease-out-quart/quint/expo）
✅ 时长分层：反馈 100-150ms / 状态切换 200-300ms / 布局变化 300-500ms
```

**check**: 视觉审查生成的 HTML/CSS，逐项比对上述反模式清单。特别关注：渐变用途、卡片嵌套层级、缓动函数选择、重复布局模式。

**fix**: 命中反模式 -> 替换为符合 design-contract 品牌调性的方案。渐变用于信息层级而非装饰；卡片嵌套 ≤ 2 层；缓动改用指数函数；布局用间距而非容器建立层次。

### R30: UX 文案质量 [W]

```
所有用户可见文案需符合以下标准：

CTA 按钮：
❌ "确定" / "提交" / "OK"（含义模糊）
✅ "领取奖励" / "立即交易" / "查看详情"（动词 + 目标）

错误信息公式 = 发生了什么 + 为什么 + 怎么解决：
❌ "操作失败"
✅ Campaign: "领取失败：活动已结束。查看其他进行中的活动 →"
✅ Exchange: "下单失败：余额不足。去充值 →"

空状态：
❌ "暂无数据"
✅ Campaign: "还没有参与记录，立即参加活动赢取奖励"
✅ Exchange: "暂无持仓，去发现热门币种 →"

禁止项：
❌ 错误信息中使用幽默/俏皮语气
❌ 冗余文案（标题已说明的内容不在副标题重复）
❌ 模糊状态（"加载中..." → 应为 "正在获取数据..."，描述具体内容）
```

**check**: 检查所有 button 文案是否为具体动词+目标。检查 error/empty state 是否提供了下一步指引。检查是否有"确定/取消/提交/暂无数据"等模糊文案。

**fix**: 模糊 CTA -> 替换为具体动作描述。空错误信息 -> 补充原因和指引。冗余文案 -> 精简。

---

## 违规示例

```css
/* ❌ 违规：硬编码颜色和圆角 */
.card {
  background: #1F2023;
  border-radius: 32px;
  color: #FAFAFA;
}

/* ✅ 正确：CSS 变量引用 */
.card {
  background: var(--bg-card);
  border-radius: var(--radius-card-lg);
  color: var(--text-primary);
}
```

```tsx
// ❌ 违规：内联样式
<div style={{ backgroundColor: '#1F2023', borderRadius: '32px' }}>

// ✅ 正确：CSS Modules
import styles from './Card.module.css'
<div className={styles.card}>
```
