---
scope: [web3pay]
layer: L2
context: pay-b
---

# TimePicker 时间选择器

> 来源: Figma [Pay-B端-商家后台](https://www.figma.com/design/tlFIl7F7A7Zl6e9WRLMDZo/)
> 归属: web3pay / Pay B端商户后台
> 版本: v1.4.0

## 组件概述

日期时间选择器，支持单日期与日期范围选择。由输入触发器、日历面板和时间输入区域组成。范围模式提供预设快捷项（今天/昨天/近7天/近30天），常用于订单查询、数据筛选等场景。

## 基础规格

### Trigger 输入触发器

| 属性 | Token | 值 | pay-b-default 映射 | 说明 |
|------|-------|-----|-------------------|------|
| height | `--timepicker-trigger-h` | `48px` | — | 与 Selector 统一高度 |
| background | `--timepicker-trigger-bg` | `#F5F6F7` | `var(--bg-muted)` | 静息态背景 |
| border | — | `1px solid transparent` | — | 默认无边框 |
| border-radius | `--timepicker-trigger-radius` | `8px` | `var(--radius-dropdown)` | 圆角 |
| padding | `--timepicker-trigger-padding` | `0 12px` | — | 内间距 |
| font-size | — | `14px` | — | 文本字号 |
| color | `--timepicker-trigger-color` | `#070808` | `var(--text-primary)` | 已选日期文本色 |
| placeholder-color | — | `#A0A3A7` | `var(--text-tertiary)` | 占位符色 |
| icon (left) | — | calendar `16×16` | `var(--text-secondary)` | 左侧日历图标 |
| icon (right) | — | close `16×16` | — | 有值时显示清除按钮 |
| range separator | — | `—` | — | 范围模式中间分隔符 |
| min-width (single) | — | `200px` | — | 单选最小宽度 |
| min-width (range) | — | `340px` | — | 范围模式最小宽度 |

### Dropdown Panel 下拉面板

| 属性 | Token | 值 | pay-b-default 映射 | 说明 |
|------|-------|-----|-------------------|------|
| background | `--timepicker-panel-bg` | `#FFFFFF` | `var(--layer-1)` | 白底面板 |
| border | `--timepicker-panel-border` | `1px solid #ECEDEF` | `var(--border)` | 边框 |
| border-radius | `--timepicker-panel-radius` | `8px` | `var(--radius-dropdown)` | 圆角 |
| box-shadow | `--timepicker-panel-shadow` | `0 4px 16px rgba(0,0,0,0.08)` | `var(--shadow-dropdown)` | 浮层阴影 |
| padding | — | `16px` | `var(--space-base)` | 内间距 |

### Calendar 日历区域

| 属性 | Token | 值 | 说明 |
|------|-------|-----|------|
| header height | — | `36px` | 年月导航行高 |
| header font-size | — | `14px` | 年月文本字号 |
| header font-weight | — | `600` | 加粗 |
| header color | — | `#070808` | 年月文本色 |
| nav arrow | — | `20×20` | 左右翻月箭头 |
| weekday height | — | `32px` | 星期行高 |
| weekday font-size | — | `12px` | 星期字号 |
| weekday color | — | `#84888C` | 星期文本色 |
| cell size | `--timepicker-cell-size` | `32px` | 日期单元格尺寸 |
| cell font-size | — | `14px` | 日期字号 |
| cell border-radius | — | `6px` | 单元格圆角 |
| cell gap | — | `4px` | 单元格间距 |

### Calendar Cell States 日历单元格状态

| 状态 | background | color | 说明 |
|------|-----------|-------|------|
| default | `transparent` | `#070808` | 当月可选日期 |
| hover | `#F5F6F7` | `#070808` | 悬停 |
| today | border `1px solid #070808` | `#070808` | 今日标识 |
| selected | `#070808` | `#FFFFFF` | 选中日期 |
| range-start | `#070808` | `#FFFFFF` | 范围起始，左圆角 |
| range-end | `#070808` | `#FFFFFF` | 范围结束，右圆角 |
| in-range | `#F0F0F1` | `#070808` | 范围中间，无圆角 |
| other-month | `transparent` | `#C4C7CA` | 非当月日期 |
| disabled | `transparent` | `#ECEDEF` | 不可选日期 |

### Time Input 时间输入

| 属性 | Token | 值 | 说明 |
|------|-------|-----|------|
| height | — | `36px` | 时间输入行高 |
| background | — | `#F5F6F7` | 输入底色 |
| border-radius | — | `6px` | 圆角 |
| font-size | — | `14px` | 字号 |
| format | — | `HH:MM:SS` | 24小时制 |
| separator | — | `:` | 冒号分隔，色 `#84888C` |

### Presets 预设快捷项（范围模式）

| 属性 | Token | 值 | 说明 |
|------|-------|-----|------|
| position | — | 面板左侧或顶部 | 快捷项区域 |
| width（侧栏模式） | — | `100px` | 侧栏宽度 |
| item padding | — | `6px 12px` | 快捷项内间距 |
| item font-size | — | `13px` | 快捷项字号 |
| item color | — | `#84888C` | 默认文本色 |
| item hover color | — | `#070808` | 悬停文本色 |
| item hover bg | — | `#F5F6F7` | 悬停背景 |
| item active color | — | `#070808` | 选中文本色 |
| item active font-weight | — | `600` | 选中加粗 |
| item border-radius | — | `4px` | 圆角 |
| border-right（侧栏） | — | `1px solid #ECEDEF` | 与日历分隔 |

### Footer 底部操作栏

| 属性 | Token | 值 | 说明 |
|------|-------|-----|------|
| height | — | `48px` | 操作栏高度 |
| border-top | — | `1px solid #ECEDEF` | 顶部分隔线 |
| padding | — | `0 16px` | 内间距 |
| 确认按钮 | — | 品牌绿 `#ADF73E`，文本 `#070808` | 主操作按钮 |
| 取消/清除 | — | 文本按钮，色 `#84888C` | 次操作 |

## 变体

| 变体 | 说明 |
|------|------|
| date | 仅日期选择，无时间输入 |
| datetime | 日期 + 时间（HH:MM:SS） |
| daterange | 日期范围选择 |
| datetimerange | 日期范围 + 时间 |

## CSS 实现参考

```css
.timepicker-trigger {
  display: flex;
  align-items: center;
  height: 48px;
  padding: 0 12px;
  background: #F5F6F7;
  border: 1px solid transparent;
  border-radius: 8px;
  font-size: 14px;
  color: #070808;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;
}

.timepicker-trigger:hover {
  border-color: #ECEDEF;
}

.timepicker-trigger.open {
  background: #FFFFFF;
  border-color: #070808;
}

.timepicker-trigger__icon {
  width: 16px;
  height: 16px;
  color: #84888C;
  margin-right: 8px;
  flex-shrink: 0;
}

.timepicker-trigger__clear {
  width: 16px;
  height: 16px;
  color: #84888C;
  margin-left: auto;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.15s;
}

.timepicker-trigger:hover .timepicker-trigger__clear {
  opacity: 1;
}

.timepicker-panel {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  display: flex;
  background: #FFFFFF;
  border: 1px solid #ECEDEF;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  z-index: 1000;
}

/* 预设快捷侧栏 */
.timepicker-presets {
  width: 100px;
  padding: 8px 0;
  border-right: 1px solid #ECEDEF;
  flex-shrink: 0;
}

.timepicker-preset-item {
  padding: 6px 12px;
  font-size: 13px;
  color: #84888C;
  border-radius: 4px;
  cursor: pointer;
  margin: 0 4px;
  transition: color 0.15s, background 0.15s;
}

.timepicker-preset-item:hover {
  color: #070808;
  background: #F5F6F7;
}

.timepicker-preset-item.active {
  color: #070808;
  font-weight: 600;
}

/* 日历区域 */
.timepicker-calendar {
  padding: 16px;
}

.timepicker-calendar__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 36px;
  margin-bottom: 8px;
}

.timepicker-calendar__title {
  font-size: 14px;
  font-weight: 600;
  color: #070808;
}

.timepicker-calendar__nav {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #84888C;
  cursor: pointer;
  border-radius: 4px;
}

.timepicker-calendar__nav:hover {
  background: #F5F6F7;
  color: #070808;
}

.timepicker-calendar__weekdays {
  display: grid;
  grid-template-columns: repeat(7, 32px);
  gap: 4px;
  margin-bottom: 4px;
}

.timepicker-calendar__weekday {
  height: 32px;
  font-size: 12px;
  color: #84888C;
  display: flex;
  align-items: center;
  justify-content: center;
}

.timepicker-calendar__grid {
  display: grid;
  grid-template-columns: repeat(7, 32px);
  gap: 4px;
}

.timepicker-cell {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #070808;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.15s;
}

.timepicker-cell:hover {
  background: #F5F6F7;
}

.timepicker-cell.today {
  border: 1px solid #070808;
}

.timepicker-cell.selected {
  background: #070808;
  color: #FFFFFF;
}

.timepicker-cell.range-start {
  background: #070808;
  color: #FFFFFF;
  border-radius: 6px 0 0 6px;
}

.timepicker-cell.range-end {
  background: #070808;
  color: #FFFFFF;
  border-radius: 0 6px 6px 0;
}

.timepicker-cell.in-range {
  background: #F0F0F1;
  border-radius: 0;
}

.timepicker-cell.other-month {
  color: #C4C7CA;
}

.timepicker-cell.disabled {
  color: #ECEDEF;
  cursor: not-allowed;
  pointer-events: none;
}

/* 时间输入 */
.timepicker-time {
  display: flex;
  align-items: center;
  height: 36px;
  background: #F5F6F7;
  border-radius: 6px;
  padding: 0 8px;
  margin-top: 8px;
  font-size: 14px;
}

.timepicker-time__separator {
  color: #84888C;
  margin: 0 2px;
}

.timepicker-time__input {
  width: 24px;
  text-align: center;
  border: none;
  background: transparent;
  font-size: 14px;
  color: #070808;
  outline: none;
}

/* 底部操作栏 */
.timepicker-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  height: 48px;
  padding: 0 16px;
  border-top: 1px solid #ECEDEF;
}

.timepicker-footer__confirm {
  height: 32px;
  padding: 0 16px;
  background: #ADF73E;
  color: #070808;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}

.timepicker-footer__cancel {
  height: 32px;
  padding: 0 12px;
  background: none;
  border: none;
  color: #84888C;
  font-size: 13px;
  cursor: pointer;
}
```

## 数据接口

```typescript
interface PresetRange {
  /** 显示文本 */
  label: string;
  /** 日期范围值 [start, end] */
  value: [Date, Date];
}

interface TimePickerProps {
  /** 选择模式 */
  mode?: 'date' | 'datetime' | 'daterange' | 'datetimerange';
  /** 当前值（单选为 Date，范围为 [Date, Date]） */
  value?: Date | [Date, Date];
  /** 值变更回调 */
  onChange?: (value: Date | [Date, Date]) => void;
  /** 占位文本 */
  placeholder?: string | [string, string];
  /** 日期格式化模板 */
  format?: string;
  /** 预设快捷选项 */
  presets?: PresetRange[];
  /** 禁用日期判断函数 */
  disabledDate?: (date: Date) => boolean;
  /** 禁用 */
  disabled?: boolean;
  /** 可清除 */
  clearable?: boolean;
  /** 默认预设快捷项 */
  defaultPresets?: boolean;
}
```

### 默认预设快捷项

```typescript
const DEFAULT_PRESETS: PresetRange[] = [
  { label: '今天', value: [startOfToday(), endOfToday()] },
  { label: '昨天', value: [startOfYesterday(), endOfYesterday()] },
  { label: '近7天', value: [subDays(startOfToday(), 6), endOfToday()] },
  { label: '近30天', value: [subDays(startOfToday(), 29), endOfToday()] },
];
```
