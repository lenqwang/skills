---
scope: [campaign]
layer: L2
---
# RulesFAQ 活动规则 / FAQ 组件

> 活动规则和 FAQ 折叠面板组件，手风琴交互（同时只展开一项）。
> 由装饰性标题头 + Accordion 折叠列表组成。
> 内容支持编号列表和富文本（含蓝色链接高亮）。

---

## 组件结构

```
RulesFAQ (.rules-faq)
│
├── Header (.rules-faq-header)
│   └── Title (.rules-faq-title)     ← 装饰性三斜线包裹 "FAQ" / "活动规则"
│       ├── Deco Left (.deco.deco-l) ← 3 条斜线 \\ （透明度递增 0.25→0.5→1）
│       ├── Text                     ← FAQ / Rules
│       └── Deco Right (.deco.deco-r)← 3 条斜线 /// （透明度递增 0.25→0.5→1）
│
└── Accordion (.rules-faq-list)
    └── Item (.rules-faq-item) × N
        ├── Trigger (.rules-faq-trigger)
        │   ├── Title (.rules-faq-item-title)
        │   └── Icon (.rules-faq-item-icon)   ← + (collapsed) / − (expanded)，切换用 opacity
        │
        ├── Content (.rules-faq-item-content)  ← 展开时可见
        │   └── 编号列表 / 富文本 / 段落
        │
        └── Divider                            ← 1px 底部分隔线
```

---

## 标题头规格

### 装饰性三斜线标题

```
Desktop:                          H5:
        \\  FAQ  ///                    \\  FAQ  ///
```

每侧 3 条平行斜线，透明度从外到内递增（0.25 → 0.5 → 1.0）。

| 属性 | 值 |
|------|------|
| 斜线尺寸 | `width: 3px; height: 16px; border-radius: 1px` |
| 斜线颜色 | `#FFFFFF`，3 条透明度 `0.25 / 0.5 / 1.0` |
| 斜线角度 | 左侧 `rotate(-20deg)`，右侧 `rotate(20deg)` |
| 斜线间距 | `gap: 3px` |
| 标题字体 | 20px / 700，`color: #FFFFFF` |
| 装饰间距 | 左侧 `margin-right: 14px`，右侧 `margin-left: 14px` |
| 对齐 | `text-align: center` |
| 下间距 | `margin-bottom: 32px`（Desktop）/ `24px`（H5） |

---

## Accordion 折叠列表规格

### Item 结构

```
┌────────────────────────────────────────────────────────┐
│ This is a collapse title text                      +   │  ← Trigger (collapsed)
├────────────────────────────────────────────────────────┤
│ 1px divider                                            │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│ Eligibility for participation                      −   │  ← Trigger (expanded)
│                                                        │
│ 1. Both new and existing users can click...            │  ← Content
│ 2. Definition of new users: Users who register...      │
│ 3. To ensure fairness in the competition...            │
│ 4. Gate.io reserves the right to disqualify...         │
├────────────────────────────────────────────────────────┤
│ 1px divider                                            │
└────────────────────────────────────────────────────────┘
```

### Trigger 规格

| 属性 | Desktop | H5 |
|------|---------|------|
| 高度 | `min-height: 56px` | `min-height: 48px` |
| padding | `16px 0` | `12px 0` |
| 标题字号 | `16px / 600` | `14px / 600` |
| 标题颜色 | `#FFFFFF` | `#FFFFFF` |
| Icon 大小 | `20px` | `18px` |
| Icon 颜色 | `rgba(255,255,255,0.5)` | 同 |
| cursor | `pointer` | `pointer` |
| 布局 | `display: flex; justify-content: space-between; align-items: center` | 同 |

### Content 规格

| 属性 | Desktop | H5 |
|------|---------|------|
| padding | `0 0 16px 0` | `0 0 12px 0` |
| 字号 | `14px / 400` | `13px / 400` |
| 行高 | `1.8` | `1.7` |
| 颜色 | `rgba(255,255,255,0.5)` | 同 |
| 链接颜色 | `var(--info)` (#3B82F6) | 同 |
| 链接装饰 | `text-decoration: none`，hover 加下划线 | 同 |
| 编号列表 | 使用文本编号 `1.` `2.`...，非 `<ol>` | 同 |
| 段落间距 | `margin-bottom: 8px` | `6px` |
| 动画 | `max-height` + `overflow: hidden` 过渡 | 同 |

### Divider 规格

| 属性 | 值 |
|------|------|
| 高度 | `1px` |
| 颜色 | `rgba(255,255,255,0.08)` |
| 宽度 | `100%` |

---

## 交互规格

| 行为 | 说明 |
|------|------|
| 手风琴模式 | 同时只展开一项，点击新项时自动收起当前项 |
| 默认状态 | 第一项展开，其余收起 |
| 展开动画 | `max-height: 0` → `max-height: 600px`，`transition: max-height 300ms ease` |
| Icon 切换 | `+` ↔ `−`，`transition: opacity 200ms ease`，双 SVG 切换 |
| 全部收起 | 允许：再次点击已展开项可收起（全部收起态） |

---

## CSS 变量

```css
--faq-trigger-color: #FFFFFF;
--faq-content-color: rgba(255, 255, 255, 0.5);
--faq-icon-color: rgba(255, 255, 255, 0.5);
--faq-divider: rgba(255, 255, 255, 0.08);
--faq-link-color: #3B82F6;
--faq-deco-color: #FFFFFF;             /* 三斜线颜色，透明度在各条上单独设置 */
```

---

## 响应式布局

### Desktop (≥768px)

```
┌──────────────────────────────────────────────────────────┐
│                       ''\ FAQ /''                        │
│                                                          │
│ Eligibility for participation                        −   │
│                                                          │
│ 1. Both new and existing users can click the "Join Now"  │
│    button on the event page to complete registration.    │
│ 2. Definition of new users: Users who register and sign  │
│    up after the event starts are considered new users.    │
│ 3. To ensure fairness in the competition, API users,     │
│    professional-level traders (VIP 15 and above)...      │
│ 4. Gate.io reserves the right to disqualify users...     │
│ ──────────────────────────────────────────────────────── │
│ This is a collapse title text                        +   │
│ ──────────────────────────────────────────────────────── │
│ This is a collapse title text                        +   │
│ ──────────────────────────────────────────────────────── │
│ This is a collapse title text                        +   │
└──────────────────────────────────────────────────────────┘

容器: max-width: var(--space-container-max)，水平居中
内间距: 0 var(--space-container-x)
无外边框: 组件本身无 border/outline，直接融入页面背景
```

### H5 (<768px)

```
┌─────────────────────────────────┐
│          ''\ FAQ /''            │
│                                 │
│ 报名资格                    −   │
│                                 │
│ 1. 无论新老用户，都可在活动  │
│    页面点击"立即报名"...      │
│ 2. 新用户定义：活动开始后... │
│ 3. 为维护公平性...           │
│ 4. Gate.io 保留...           │
│ ─────────────────────────────── │
│ 这是折叠栏标题文字          +   │
│ ─────────────────────────────── │
│ 这是折叠栏标题文字          +   │
└─────────────────────────────────┘

容器: padding 0 16px
标题头下间距: 24px
```

---

## 数据接口

```typescript
interface RulesFAQProps {
  /** 标题文字，默认 "FAQ" */
  title?: string;
  /** 折叠项列表 */
  items: FAQItem[];
  /** 默认展开的项索引，默认 0 */
  defaultOpenIndex?: number;
  /** 是否允许全部收起，默认 true */
  allowAllClosed?: boolean;
}

interface FAQItem {
  /** 折叠项标题 */
  title: string;
  /** 折叠项内容（支持 HTML 富文本） */
  content: string;
}
```
