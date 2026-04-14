# Campaign 活动线 — 业务线声明

> 活动运营页面的设计与开发约束，适用于空投、任务奖励、竞赛、VIP 活动、节日活动等营销场景。
>
> **结构**：仅存在 **`domains/campaign/`** 一条业务域；**禁止**并列顶级目录 `campaign-web/`（与 `exchange-web` / `web3pay-web` 同类副本一律废除）。Web 端约束来自 **`platforms/web.md`**，不是再拆一个「campaign-web」文件夹。

## 品牌调性

热烈 | 促销 | 紧迫感 | 奖励驱动

## 目标用户

- 新用户（注册引导、新手任务）
- 交易用户（竞赛、排行榜）
- VIP 用户（专属福利、节日礼遇）

## 视觉特征

- 大面积渐变、强对比、节日色系
- 全屏 Hero、单屏滚动布局
- 粒子、抽奖动画、倒计时闪烁
- 低信息密度（引导转化为主）
- 强 CTA、紧迫感、倒计时

## 品牌色

由各 style 文件独立定义，不固定：
- `--brand`：随风格变化（蓝/金/红/绿等）
- `--accent`：随风格变化

## 继承

```
extends: tokens/* + components/* + contract/*
platform: web   ← 指 platforms/web.md（平台维度 Web/App），非目录名 campaign-web
```

## 扩展规则

见 [rules-ext.md](./rules-ext.md)

## 组件

- 基础组件：继承 `components/*`
- 业务组件：见 `components/`（countdown, lottery-grid, rank-list, progress-bar, rules-faq, mystery-box）

## 风格

见 `styles/` 目录，当前 10 个风格变体。

## 布局

见 `layout.md`，支持 campaign.home 和 campaign.detail 两种页面类型。
