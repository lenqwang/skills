# Style 模板 — 标准化 6 区块结构

> 所有 style 文件**必须**严格遵循以下 6 个区块，顺序固定，不可省略。
> 缺失的区块标注"无"或"同默认"，不可删除区块标题。

---

## 区块 1: 元信息

```yaml
name: <style-id>           # 文件名（不含 .md），如 vip-warm-elite
description: <一句话描述>
mode: dark | light | both   # 模式声明
inherits: default | none | <style-name>  # 继承模式（见下方说明）
source_urls:                # 提取来源页面（可多个）
  - https://example.com/page1
extracted_at: YYYY-MM-DD    # 首次从 URL 提取的日期
calibrated_at: YYYY-MM-DD   # 最近一次校准日期（未校准填 null）
```

### inherits 字段说明

| 值 | 含义 | 适用场景 |
|-----|------|---------|
| `default` | 区块 3/4/5 仅列差异项，未列变量从 default.md 继承 | 与 default 重叠 >60% |
| `none` | 完整独立定义，不继承任何 style | 与 default 重叠 <50%（如节日主题） |
| `<style-name>` | 基于指定 style 的差异 | 基于某个 style 的微调版 |

### Delta 合并语义

**覆盖优先级**（从高到低）：

```
当前 style 的显式定义
  ↓ 覆盖
inherits 源（如 default.md）
  ↓ 覆盖
../semantic.md 默认值
```

**变量删除**：用 `unset` 标记。含义：该变量不出现在 `.page` CSS 变量中。

```markdown
| `--gradient-hero` | unset | 删除: 本风格无 Hero 渐变 |
```

**最小变量集**（不允许 `unset`）：
`--bg`, `--bg-card`, `--text-primary`, `--text-secondary`, `--brand`, `--border`

**Delta 完整性检查**：
- [B] 最小变量集全部存在（显式或继承）
- [W] 所有 `unset` 变量已确认无组件引用
- [W] 新增变量（inherits 源中不存在的）有明确说明
- [W] 最终差异 < 30%（差异过大应改用 `inherits: none`）

---

## 区块 2: 风格画像

- **视觉情绪**：[关键词1]、[关键词2]、[关键词3]
- **核心组件**：[组件1]、[组件2]、[组件3]
- **强调方式**：[一句话描述强调手法]
- **适用标签**：`[标签1]` `[标签2]` `[标签3]`

| 维度 | 本风格 | 默认 | 说明 |
|------|--------|------|------|
| 色温 | 暖色/冷色/中性 | 中性 | |
| 信息密度 | 高/中/低 | 中 | |
| 装饰程度 | 丰富/克制/极简 | 克制 | |

---

## 区块 3: CSS 变量表

> 定义本风格对默认 CSS 变量的覆盖。未列出的变量使用 `../semantic.md` 的默认值。
> **仅列出有覆盖的子节**，无覆盖的子节直接省略。

### 3.1 颜色变量

| 变量 | 暗色值 | 亮色值 | 说明 |
|------|--------|--------|------|
| `--bg` | #070808 | #FFFFFF | 页面背景 |
| `--bg-card` | #1F2023 | #FAFAFA | 卡片背景 |
| `--text-primary` | #FAFAFA | #070808 | 主要文字 |
| `--text-secondary` | #A0A3A7 | #84888C | 次要文字 |
| `--brand` | #0068FF | #0068FF | 品牌色 |
| `--accent` | #A7F757 | #A7F757 | 金额高亮 |
| _...按需扩展_ | | | |

### 3.2 渐变（可选）

| 用途 | CSS 值 | 说明 |
|------|--------|------|
| [用途] | `linear-gradient(...)` | |

### 3.3 圆角变量（可选）

| 变量 | 值 | 说明 |
|------|-----|------|
| `--radius-card-lg` | 32px | 活动页大卡片 |

### 3.4 间距变量（可选）

| 变量 | 值 | 说明 |
|------|-----|------|
| `--space-section` | 64px | 标准区块间距 |

### 3.5 排版覆盖（可选）

> 排版不变量化，此处仅列出与默认规格不同的排版值。

| Token | 覆盖值 | 原值 | 说明 |
|-------|--------|------|------|
| `display.large.campaign` | Xpx / weight | 60px / 600 | |

---

## 区块 4: 布局结构

> 声明页面类型，引用 `../layout.md` 定义的标准骨架。仅列出与默认布局的差异项。
> 完全使用默认布局时填 `> layout: <类型> | 同默认`。

```markdown
> layout: campaign | 同默认
```

或带差异项：

```markdown
> layout: campaign

### 差异项

- Hero: [描述与默认 Hero 的差异]
- 额外模块: [默认布局中没有的模块]
- 栅格: [与默认栅格不同的配置]
- 响应式: [与默认响应式策略不同的行为]
```

多页面场景（一个 style 涉及多个页面）：

```markdown
> layout: portal.index + portal.detail

### 差异项

- portal.index: [列表页差异]
- portal.detail: [详情页差异]
```

可选页面类型及子页面（定义见 `../layout.md`）：
- `campaign` — 活动页（等同 `campaign.home`）
  - `campaign.home` — 活动首页
  - `campaign.detail` — 活动详情页
- `portal` — 产品/工具页（等同 `portal.index`）
  - `portal.index` — 列表/首页
  - `portal.detail` — 详情页

---

## 区块 5: 组件变体

> 每个组件包含：ASCII 示意图 + 属性表（固定列：属性 | 值 | 备注）。
> 值列使用 `var(--xxx)` 格式引用 CSS 变量。
> 无组件变体填"无"。

### [组件名称] ([英文名])

```
[ASCII 示意图]
```

| 属性 | 值 | 备注 |
|------|-----|------|
| 容器圆角 | `var(--radius-card-lg)` | |
| 内边距 | `var(--space-card)` | |
| 背景色 | `var(--bg-card)` | |
| _..._ | | |

---

## 区块 6: 适用性 & 自检

### 自检清单

> 基础清单见 `contract/rules.md` 自检清单章节（含 `[B]`/`[W]` 分级标记），此处仅列本风格特有检查项。
> 验证流程见 `contract/verification-protocol.md`（3-Pass 管线）。

- [ ] [B/W] [风格特有检查项1]
- [ ] [B/W] [风格特有检查项2]

### 适用场景

- [场景1]
- [场景2]

### 不适用场景

- [场景1]（建议用 xxx.md）
- [场景2]（建议用 xxx.md）
