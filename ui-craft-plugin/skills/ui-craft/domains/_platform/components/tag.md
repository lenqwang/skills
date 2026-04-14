---
scope: [exchange, web3pay]
layer: L2
---
# Tag 标签 — Platform 规格

> Exchange+Web3 平台标签规格，继承 `_platform/` 基座。
> Figma: [Tag Guidelines H5](https://www.figma.com/design/kQIx9xKLiyO6KZIbazNSM2/?node-id=7642-128337)
>
> Component Token: `TagV5-web` · `Tag_PD_V5` · `Tag PrimaryV5-web` · `VIP Tag_V5`

---

标签用于内容分类、标记、状态说明，覆盖通用、金融、运营、VIP 等场景。

## 标签类型与尺寸

| 类型 | 高度 | 宽度示例 | Token | 说明 |
|------|------|---------|-------|------|
| 通用标签 | 20 px | 29 px | `TagV5-web` | 基础信息标注 |
| 功能性标签 | 20 px | 51 px | `TagV5-web` | 内容描述/弱化展示 |
| 涨跌相关 | 20 px | 38-55 px | `TagV5-web` | 涨/跌/涨幅百分比 |
| 风险提示 | 20 px | 57-85 px | `TagV5-web` | 高/中/低/极高风险 |
| 品牌相关 | 20 px | 34 px | `TagV5-web` | 品牌专属色 |
| 涨跌标签（PD） | 28 px(文字) / 16 px(图标) | 97-99 px / 16 px | `Tag_PD_V5` | 专用涨跌幅展示 |
| 运营类标签 | 20 px | 57-79 px | `Tag PrimaryV5-web` | 促销/活动/激励 |
| VIP 类标签 | 14 px | 24-30 px | `VIP Tag_V5` | VIP 等级 V1-V6 |

## 使用规范

- 文案**一行尽显展示**，不支持换行，不支持省略号
- Web 与 H5 使用相同 Token 和尺寸
