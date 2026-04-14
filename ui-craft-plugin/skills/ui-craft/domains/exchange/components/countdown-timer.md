---
scope: [exchange]
layer: L2
---
# CountdownTimer 倒计时

> 归属: exchange-shared（Booster / Rewards Hub 通用）
> 状态: STABLE — 基于 Figma Booster + 福利中心 + Gate《Countdown Guidelines》(Web–H5) 对齐
> 场景: 活动倒计时、任务截止时间、促销结束提醒

---

## 组件概述

倒计时块，支持 `nD` + HH:MM:SS 格式，H5 / Web 双端尺寸；**Web 与 H5 视觉语言一致**，差异主要在字号与间距（约 2× 缩放）。

## 结构树

```
CountdownTimer
├── TimeUnit[]               # 时间单元（天/时/分/秒）
│   ├── Value                # 数字文本
│   └── Background           # 单元背景块
└── Separator[]              # 分隔符 ":"
```

## 变体

| 变体 | 平台 | 场景 | 高度 |
|------|------|------|------|
| **H5 Standard** | H5 375px | 卡片内倒计时 | 20px |
| **H5 Compact** | H5 375px | 卡片右上角 (GTCountdownV5) | 18px |
| **Web Standard** | Web 1920px | 主要任务区域 | 40px |
| **Web Mini** | Web 1920px | 卡片内 "Ends In" 前缀 | 21px |

---

## Countdown Guidelines（官方 Web–H5 对应）

> **命名**：**B** = 深色底块 + 浅色字；**G** = 浅色底块 + 深色字；**Large** = 同语义下的放大强调；**Text** = 无底块纯文字；**Group** = 整段时间在**单一**圆角容器内（可含 `nD`）。

### 变体代号一览

| 代号 | 天 | 形态 | 与本文档章节对应 |
|------|----|------|------------------|
| B-H/M/S | 否 | 深色 · 分块 HH:MM:SS | Web Standard 暗色（无天） |
| B-D/H/M/S | 是 | 深色 · 分块 + `nD` | Web Standard 暗色 |
| G-H/M/S | 否 | 浅色 · 分块 | H5 Standard（无天） |
| G-D/H/M/S | 是 | 浅色 · 分块 + `nD` | H5 Standard |
| Large-H/M/S、Large-D/H/M/S | 可选 | 大块浅色底 + 更重字重；**含天**时推荐 **天外置 + 右侧单色 Group 盒**（H/M/S） | 下文 **Large** |
| Text-H/M/S | 否 | 纯文本；冒号两侧**可**加空格增强可读性 | 下文 **Text** |
| Text-D/H/M/S | 是 | `nD` + 文本时间 | 下文 **Text** |
| Group-B、Group-G | 可选 | 单容器包裹整串（深 / 浅） | 下文 **Group** |

### 国际化底线（极端原则）

- **必须**：海外 / 多语言场景天数使用 **`nD`**（如 `2D`、`3D`），与时分秒并列时保持紧凑（例 `2D 03:59:23`、`3D:03:59:23` 按场景择一，全站统一即可）。
- **禁止**：全词 **`DAYS`** 及 `2DAYS 03:59:23` 等写法 — 占宽过大、视觉噪音高。

### 建议组件 API

| Prop | 类型 | 说明 |
|------|------|------|
| `variant` | `b` \| `g` \| `text` \| `large` \| `group` | 映射 B / G / Text / Large / Group |
| `showDays` | `boolean` | 是否展示天 |
| `segmented` | `boolean` | `true` 为每单位独立块；`variant=group` 时为单容器 |
| `platform` | `web` \| `h5` | 基准尺寸，与「H5 vs Web 速查」2× 关系一致 |
| `prefix` | `string?` | 如 `Ends In`，见 Web Mini |

---

## H5 Standard（20px）

> **G 系**（默认）：浅灰底 `#F5F6F7` + 深色字，用于浅色活动底。**B 系 H5**：同尺寸下深色底 `#1E1E1E` + 白字，用于深色卡片/H5 暗底（与规范稿 B-H/M/S 同构，仅缩放）。

### 精确像素规格

```css
.countdown-h5 {
  display: flex;
  align-items: center;
  gap: 4px;
}

/* B 系 H5：暗底场景 */
.countdown-h5--b .countdown-h5__unit {
  background: #1e1e1e;
  color: #ffffff;
}
.countdown-h5--b .countdown-h5__separator {
  color: #5c5f63;
}

/* 无冒号：单元之间仅 gap（规范稿部分版式） */
.countdown-h5--no-sep {
  gap: 2px;
}
.countdown-h5--no-sep .countdown-h5__separator {
  display: none;
}

.countdown-h5__unit {
  background: #F5F6F7;
  border-radius: 2px;
  width: 20px;
  height: 20px;
  font-size: 12px;
  font-weight: 500;
  color: #070808;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* 天数单元稍宽 */
.countdown-h5__unit--day {
  width: auto;
  padding: 0 4px;
}

.countdown-h5__separator {
  color: #C4C7CA;
  font-size: 12px;
}
```

### 示例格式

`3D : 03 : 59 : 23`

```html
<div style="display:flex; align-items:center; gap:4px;">
  <span style="background:#F5F6F7; border-radius:2px; padding:0 4px; height:20px; font-size:12px; font-weight:500; color:#070808; display:inline-flex; align-items:center;">3D</span>
  <span style="color:#C4C7CA; font-size:12px;">:</span>
  <span style="background:#F5F6F7; border-radius:2px; width:20px; height:20px; font-size:12px; font-weight:500; color:#070808; display:inline-flex; align-items:center; justify-content:center;">03</span>
  <span style="color:#C4C7CA; font-size:12px;">:</span>
  <span style="background:#F5F6F7; border-radius:2px; width:20px; height:20px; font-size:12px; font-weight:500; color:#070808; display:inline-flex; align-items:center; justify-content:center;">59</span>
  <span style="color:#C4C7CA; font-size:12px;">:</span>
  <span style="background:#F5F6F7; border-radius:2px; width:20px; height:20px; font-size:12px; font-weight:500; color:#070808; display:inline-flex; align-items:center; justify-content:center;">23</span>
</div>
```

---

## H5 Compact / GTCountdownV5（18px）

卡片右上角的紧凑倒计时标签。

```css
.countdown-compact {
  width: 77px;
  height: 18px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  color: #FF9447;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

**格式**：`3D 03:59:23`（无分隔背景块，纯文本）

---

## Web Standard（40px）

```css
.countdown-web {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: Switzer;
}

.countdown-web__unit {
  background: #242424; /* 暗色 / 亮色: #F5F6F7 */
  border-radius: 4px;
  width: 45px;
  height: 40px;
  font-size: 24px;
  font-weight: 500;
  color: #FFFFFF; /* 暗色 / 亮色: #070808 */
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.countdown-web__unit--day {
  width: auto;
  padding: 8px 12px;
}

.countdown-web__separator {
  color: #84888C;
  font-size: 24px;
}
```

```html
<!-- Web Dark Mode -->
<div style="display:flex; align-items:center; gap:8px; font-family:Switzer;">
  <span style="background:#242424; border-radius:4px; padding:8px 12px; height:40px; font-size:24px; font-weight:500; color:#FFF; display:inline-flex; align-items:center;">3D</span>
  <span style="color:#84888C; font-size:24px;">:</span>
  <span style="background:#242424; border-radius:4px; width:45px; height:40px; font-size:24px; font-weight:500; color:#FFF; display:inline-flex; align-items:center; justify-content:center;">03</span>
  <span style="color:#84888C; font-size:24px;">:</span>
  <span style="background:#242424; border-radius:4px; width:45px; height:40px; font-size:24px; font-weight:500; color:#FFF; display:inline-flex; align-items:center; justify-content:center;">59</span>
  <span style="color:#84888C; font-size:24px;">:</span>
  <span style="background:#242424; border-radius:4px; width:45px; height:40px; font-size:24px; font-weight:500; color:#FFF; display:inline-flex; align-items:center; justify-content:center;">23</span>
</div>
```

---

## Web Mini（21px）

带 "Ends In" 前缀的小号倒计时。

```css
.countdown-mini {
  display: flex;
  align-items: center;
  gap: 4px;
  height: 21px;
}

.countdown-mini__prefix {
  font-size: 18px;
  font-weight: 500;
  color: #84888C;
}

.countdown-mini__unit {
  width: 20px;
  height: 20px;
  background: #242424;
  border-radius: 2px;
  font-size: 18px;
  font-weight: 500;
  color: #FFFFFF;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.countdown-mini__separator {
  color: #84888C;
  font-size: 18px;
}
```

**格式**：`Ends In 3D:03:59:23`

---

## Large（Guidelines · 强调态）

大块浅色分单元 + 深色字；**含天**时可将天放在容器外，右侧用**一个**浅色圆角盒容纳 `HH:MM:SS`（与规范稿「Large + D」一致）。

```css
.countdown-large-g {
  display: flex;
  align-items: center;
  gap: 8px;
}

.countdown-large-g__unit {
  min-width: 52px;
  height: 52px;
  background: #E8EAED;
  border-radius: 8px;
  font-size: 22px;
  font-weight: 600;
  color: #070808;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
  font-variant-numeric: tabular-nums;
}

.countdown-large-g__sep {
  color: #84888C;
  font-size: 22px;
  font-weight: 500;
}

/* Large + 天：天外置 + 单盒 */
.countdown-large-hybrid {
  display: flex;
  align-items: center;
  gap: 8px;
}

.countdown-large-hybrid__day {
  font-size: 20px;
  font-weight: 700;
  color: #070808;
  font-variant-numeric: tabular-nums;
}

.countdown-large-hybrid__box {
  background: #E8EAED;
  border-radius: 8px;
  padding: 12px 22px;
  font-size: 22px;
  font-weight: 600;
  color: #070808;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.02em;
}

/* Large · 白底描边（规范稿 Large 浅色强调格） */
.countdown-large-g__unit--outline,
.countdown-large-hybrid__box--outline {
  background: #ffffff;
  border: 1px solid rgba(7, 8, 8, 0.12);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
}
```

---

## Text（Guidelines · 无底块）

无背景块，依赖字重与等宽数字；**Text** 行可在冒号两侧加空格（`03 : 59 : 23`），**紧凑行**可去空格（`03:59:23`）。

```css
.countdown-text {
  display: inline-flex;
  align-items: center;
  font-size: 20px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: #070808;
}

.countdown-text--relaxed .countdown-text__sep {
  margin: 0 8px;
  color: #C4C7CA;
  font-weight: 500;
}

.countdown-text--compact {
  font-size: 14px;
  letter-spacing: 0.02em;
}
```

---

## Web · 紧凑分块（视觉上「连成一组」）

与 **Group**（单容器）不同：仍为**每格独立背景**，但 `gap: 0`、相邻格 `margin-left: -1px`、仅首尾圆角，模拟规范稿中「更紧的 B/G 分块」行。分隔符可省略或保留在外侧。

```css
.countdown-web--joined {
  display: flex;
  align-items: center;
  gap: 0;
}
.countdown-web--joined .countdown-web__unit {
  border-radius: 0;
  border: 1px solid #3a3a3c;
  margin-left: -1px;
}
.countdown-web--joined .countdown-web__unit:first-of-type {
  border-radius: 4px 0 0 4px;
  margin-left: 0;
}
.countdown-web--joined .countdown-web__unit:last-of-type {
  border-radius: 0 4px 4px 0;
}
.countdown-web--joined .countdown-web__separator {
  display: none;
}
```

浅色版将 `border-color` 改为 `rgba(7, 8, 8, 0.12)`，单元背景为 `#F5F6F7`。

---

## Group（Guidelines · 单容器）

整串时间在**一个**圆角背景内；**Group-B** 用于深色界面，**Group-G** 用于浅色界面。

```css
.countdown-group-b {
  display: inline-flex;
  align-items: center;
  background: #2a2a2c;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 20px;
  font-weight: 600;
  color: #fff;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.04em;
}

.countdown-group-g {
  display: inline-flex;
  align-items: center;
  background: #ECEEF1;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 20px;
  font-weight: 600;
  color: #070808;
  font-variant-numeric: tabular-nums;
}
```

---

## Token 映射

| 属性 | H5 Standard | Web Standard | Token |
|------|-------------|-------------|-------|
| 单元高度 | 20px | 40px | — |
| 单元背景 | `#F5F6F7` | `#242424`(暗) / `#F5F6F7`(亮) | --bg-card |
| 文字色 | `#070808` | `#FFFFFF`(暗) / `#070808`(亮) | --text-primary |
| 分隔符色 | `#C4C7CA` | `#84888C` | --text-light / --text-tertiary |
| 字号 | 12px | 24px | — |
| 间距 | 4px | 8px | --space-xs / --space-sm |
| 圆角 | 2px | 4px | --radius-sm / --radius-md |

## H5 vs Web 速查

| 维度 | H5 | Web |
|------|-----|-----|
| 单元高度 | 20px | 40px (2×) |
| 字号 | 12px | 24px (2×) |
| 间距 | 4px | 8px (2×) |
| 圆角 | 2px | 4px (2×) |

## Figma 来源

- Booster: qfajQWQ2uszBiwi0v4bBFb
- Rewards Hub: rolyycBTmxioksI63PQqbL
