---
scope: [web3pay]
layer: L2
context: pay-b
---

# Input 输入框 — Pay-B 端规格

> 继承 `_platform/input.md` 平台基座，针对 Pay-B 商户后台做尺寸 / 色彩 / 间距细化。
> 来源: Figma [Pay-B端-商家后台](https://www.figma.com/design/tlFIl7F7A7Zl6e9WRLMDZo/)
> 版本: v1.4.0

---

## 输入框尺寸

| 尺寸 | CSS 类 | 高度 | 使用场景 |
|------|--------|------|---------|
| **Medium** | `.form-input` | 40px | 表单默认输入框 |
| **Small** | `.form-input--sm` | 36px | 行内条件输入（trigger-row） |
| **Large** | `.form-input--lg` | 48px | 同 selector / timepicker 高度对齐 |

---

## Form Group 表单分组

| 属性 | CSS 变量（pay-b-default） | 值 | 说明 |
|------|--------------------------|-----|------|
| 分组间距 | `var(--space-lg)` | `margin-bottom:20px` | 表单项间距 |

### Form Label 标签

| 属性 | CSS 变量 | 值 | 说明 |
|------|---------|-----|------|
| 字号 | — | `14px` | — |
| 字重 | — | `600 SemiBold` | 加粗标签 |
| 颜色 | `var(--text-primary)` | `#070808` | — |
| 底部间距 | `var(--space-sm)` | `margin-bottom:8px` | — |
| 必填标记 | — | `::after { content:'*'; color:var(--error) }` | 红色星号 |

---

## Form Input 基础规格

| 属性 | CSS 变量（pay-b-default） | 值 | 说明 |
|------|--------------------------|-----|------|
| 高度 | — | `40px` | Medium 默认 |
| padding | — | `0 14px` | 左右内边距 |
| 背景（默认） | `var(--bg-muted)` | `#F5F6F7` | 静息灰底 |
| 边框（默认） | — | `1px solid transparent` | 无边框感 |
| 圆角 | `var(--radius-input)` | `6px` | — |
| 字号 | — | `14px` | — |
| 文字色 | `var(--text-primary)` | `#070808` | — |
| placeholder 色 | `var(--text-tertiary)` | `#A0A3A7` | — |
| 过渡 | — | `border-color .2s, background .2s` | — |

### 交互状态

| 状态 | 背景 | 边框 | 其他 |
|------|------|------|------|
| **Default** | `var(--bg-muted)` | `transparent` | — |
| **Focus** | `#FFFFFF` | `var(--text-primary)` / `#070808` | 白底 + 实线框 |
| **Hover** | `var(--bg-muted)` | `var(--border)` | 可选 |
| **Error** | `#FFFFFF` | `var(--error)` | 红框 |
| **Disabled** | `var(--bg-muted)` | `transparent` | `opacity:0.5; cursor:not-allowed` |

---

## Search Input 搜索框

| 属性 | CSS 变量 | 值 | 说明 |
|------|---------|-----|------|
| 高度 | — | `32px` | 紧凑搜索 |
| padding | — | `0 12px` | — |
| 背景 | `var(--bg-muted)` | `#F5F6F7` | — |
| 圆角 | `var(--radius-input)` | `6px` | — |
| 图标 | — | 搜索 SVG 16px `var(--text-tertiary)` | 前缀搜索图标 |
| gap | — | `6px` | 图标与文本间 |
| 宽度 | — | `240px` | 标准宽度 |
| focus 边框 | `var(--border)` | `1px solid #ECEDEF` | — |

---

## Trigger Row 行内输入（条件配置）

| 属性 | CSS 变量 | 值 | 说明 |
|------|---------|-----|------|
| 高度 | — | `36px` | 行内小尺寸 |
| padding | — | `0 10px` | — |
| 背景 | `var(--bg-muted)` | `#F5F6F7` | — |
| 圆角 | `var(--radius-input)` | `6px` | — |
| 字号 | — | `13px` | 略小 |
| focus | — | `border-color:var(--text-primary); background:#fff` | — |
| 数字输入宽度 | — | `120px` | 金额/次数输入 |
| 单位文字 | — | `13px var(--text-secondary)` | 后缀 "USDT" / "次" |

---

## Multi Select Trigger 多选触发器

| 属性 | CSS 变量 | 值 | 说明 |
|------|---------|-----|------|
| min-height | — | `40px` | 与 form-input 对齐 |
| padding | — | `6px 12px` | — |
| 背景 | `var(--bg-muted)` | `#F5F6F7` | — |
| 圆角 | `var(--radius-input)` | `6px` | — |
| gap | — | `6px` | tag 间距 |
| focus | — | `border-color:var(--text-primary); background:#fff` | — |

### 选中 Tag（多选内嵌标签）

| 属性 | 值 | 说明 |
|------|-----|------|
| 高度 | `24px` | — |
| padding | `0 8px` | — |
| 背景 | `var(--bg-muted)` | `#F5F6F7` |
| 圆角 | `var(--radius-tag)` | `4px` |
| 字号 | `12px` | — |
| 关闭按钮 | `12×12px` `var(--text-tertiary)` | hover `var(--text-primary)` |

---

## CSS 实现参考

```css
.form-group{margin-bottom:20px}
.form-label{display:block;font-size:14px;font-weight:600;color:var(--text-primary);margin-bottom:8px}
.form-label--required::after{content:' *';color:var(--error)}

.form-input{
  width:100%;height:40px;padding:0 14px;
  background:var(--bg-muted);border:1px solid transparent;border-radius:var(--radius-input);
  font-size:14px;color:var(--text-primary);
  transition:border-color .2s,background .2s;outline:none;
}
.form-input:focus{background:#fff;border-color:var(--text-primary)}
.form-input::placeholder{color:var(--text-tertiary)}
.form-input--error{border-color:var(--error)}

.form-input--sm{height:36px;padding:0 10px;font-size:13px}
.form-input--lg{height:48px;padding:0 14px}

.search-box{
  display:flex;align-items:center;height:32px;padding:0 12px;
  background:var(--bg-muted);border:1px solid transparent;border-radius:var(--radius-input);gap:6px;width:240px;
  transition:border-color var(--transition);
}
.search-box:focus-within{border-color:var(--border)}
.search-box input{border:none;background:none;outline:none;font-size:14px;color:var(--text-primary);width:100%}
.search-box input::placeholder{color:var(--text-tertiary)}

.multi-select__trigger{
  display:flex;align-items:center;flex-wrap:wrap;gap:6px;min-height:40px;padding:6px 12px;
  background:var(--bg-muted);border:1px solid transparent;border-radius:var(--radius-input);cursor:pointer;
  transition:border-color .2s,background .2s;
}
.multi-select__trigger:focus-within{border-color:var(--text-primary);background:#fff}
```

---

## 数据接口

```typescript
interface InputProps {
  size?: 'sm' | 'md' | 'lg';
  type?: 'text' | 'number' | 'password';
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  error?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  onChange?: (value: string) => void;
}
```
