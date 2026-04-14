---
scope: [exchange, web3pay]
layer: L2
---
# ProgressBar 进度条 — Platform 规格

> Exchange+Web3 平台进度条规格，继承 `_platform/` 基座。
> Figma:
> - [Progress Guidelines Web](https://www.figma.com/design/kQIx9xKLiyO6KZIbazNSM2/?node-id=8103-24498)
> - [Progress Guidelines H5](https://www.figma.com/design/kQIx9xKLiyO6KZIbazNSM2/?node-id=8103-25036)
>
> Component Token: `ProgressV5-web` · `ProgressV5-H5`

---

Exchange 平台进度条用于任务完成、文件上传、步骤进度等场景。

## 类型与尺寸

| 类型 | Web 尺寸 | H5 尺寸 | 说明 |
|------|---------|---------|------|
| Line-Large | 343 × 16 px | 343 × 13 px | 含百分比文字 |
| Line-Small | 343 × 6 px | 343 × 6 px | 无文字 |
| Line-Xsmall | 343 × 4 px | 343 × 4 px | 最细，支持分段 |
| Round-Large | 56 × 56 px | 56 × 56 px | 圆形，含中心文字 |
| Round-Medium | 32 × 32 px | 32 × 32 px | 圆形紧凑型 |

## 颜色状态

| 类型 | 场景 |
|------|------|
| Primary | 标准进度（蓝色） |
| Secondary | 次要进度 |
| Faded | 不可用/灰色 |
| Highlight | 强调 |
| Critical | 错误/危险（红色） |

## 分段规则

- Line-Xsmall（4 px）支持 4 段等分式进度，适用于分步完成场景
- 进度百分比标注位于轨道左侧
