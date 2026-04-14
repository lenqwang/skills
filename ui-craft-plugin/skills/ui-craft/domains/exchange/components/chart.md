---
scope: [exchange]
layer: L2
---
# Chart 图表/K线

> 来源: Figma App V6 `1176:48324`（Chart 图表规范）
> 归属: exchange 独有（Web3 不使用 K 线图表）
> 状态: 基于 Figma Gate App 设计系统 V6

---

## 组件概述

行情 K 线图表组件，展示币种价格走势。
包含蜡烛图、时间周期切换、技术指标、十字光标等功能。

## 子组件（Figma）

| 组件 | 节点 ID | 说明 |
|------|---------|------|
| Legends | 1373:18065 内 | 图例标注 |
| Y-轴 | 1373:18065 内 | 纵坐标轴 |

## 结构树

```
Chart
├── Header
│   ├── TimeframeSelector          # 时间周期选择
│   │   ├── 1m / 5m / 15m / 1H / 4H / 1D / 1W / 1M
│   │   └── more (展开全部)
│   ├── IndicatorToggle            # 技术指标开关
│   │   ├── MA / EMA / BOLL
│   │   └── VOL / MACD / RSI / KDJ
│   └── FullscreenBtn             # 全屏按钮
├── CandleArea                     # 蜡烛图主区
│   ├── Candles[]                  # K 线蜡烛
│   │   ├── body                  # 实体（涨绿跌红）
│   │   └── wick                  # 影线
│   ├── MALines[]                  # 均线
│   ├── Crosshair?                 # 十字光标
│   │   ├── h-line                # 水平线
│   │   ├── v-line                # 垂直线
│   │   └── tooltip               # 数据悬浮框
│   ├── YAxis                      # Y 轴（价格）
│   └── XAxis                      # X 轴（时间）
├── VolumeArea                     # 成交量区
│   ├── VolumeBars[]               # 成交量柱
│   └── YAxis                      # Y 轴（成交量）
├── IndicatorArea?                 # 指标区（MACD/RSI 等）
├── EmptyState                     # 空状态
│   └── "暂无数据"
└── Legends                        # 图例
    ├── MA5 / MA10 / MA30
    └── OHLCV 数据
```

## Token 映射

| 元素 | 值 | 说明 |
|------|-----|------|
| 背景 | `var(--bg-card)` | — |
| 涨（蜡烛） | `var(--color-up)` #2BC287 | 实心绿 |
| 跌（蜡烛） | `var(--color-down)` #F74B60 | 实心红 |
| 涨（成交量） | rgba(43,194,135,0.3) | 半透明绿 |
| 跌（成交量） | rgba(247,75,96,0.3) | 半透明红 |
| 网格线 | `var(--border)` opacity 0.3 | — |
| 坐标文字 | `var(--text-secondary)` + 10px | — |
| 十字光标线 | `var(--text-secondary)` dashed | — |
| 光标 tooltip | `var(--bg-elevated)` + 12px | — |
| MA5 线 | #FFB020 | 黄色 |
| MA10 线 | #0055FF | 蓝色 |
| MA30 线 | #F74B60 | 红色 |
| 时间周期 Tab | `var(--text-secondary)` 未选 / `var(--text-primary)` 选中 | — |

## 平台差异

| 属性 | Web | App |
|------|-----|-----|
| 位置 | 页面中央主区域 | 上半屏 |
| 全屏 | 浮层展开 | 横屏全屏 |
| 十字光标 | 鼠标 hover 触发 | 长按触发 |
| 成交量位置 | K 线下方独立区域 | K 线底部叠加 |
| 手势 | 鼠标滚轮缩放 + 拖拽 | 双指缩放 + 单指滑动 |

## 数据接口

```typescript
interface Candle {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface ChartProps {
  symbol: string;
  candles: Candle[];
  timeframe: '1m' | '5m' | '15m' | '1H' | '4H' | '1D' | '1W' | '1M';
  indicators?: Array<'MA' | 'EMA' | 'BOLL' | 'VOL' | 'MACD' | 'RSI' | 'KDJ'>;
  onTimeframeChange: (tf: string) => void;
  onCrosshair?: (candle: Candle | null) => void;
  precision: number;
}
```
