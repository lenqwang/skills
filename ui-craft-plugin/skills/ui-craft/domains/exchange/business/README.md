# Exchange 业务层

> **域根 = 交易所通用基座**（token、layout、扁平 `components/*`）；**本目录 = 业务子域**的页面规范、差异说明与配套物料。
> 生成 Exchange 页面时先读 `exchange/domain.md` + `exchange/layout.md` + 用到的 `components/*`，涉及 Booster / Rewards Hub / GateRouter 时再叠加对应 `business/*.md`。

## 当前子域

| 文件 | 说明 |
|------|------|
| [booster.md](booster.md) | Booster 推广计划（H5/Web 断点与组件差异） |
| [rewards-hub.md](rewards-hub.md) | Rewards Hub 业务规范 |
| [rewards-hub-assets/](rewards-hub-assets/) | Rewards Hub 示意图与切片 |
| [gaterouter-credits.md](gaterouter-credits.md) | GateRouter Credits 业务规范 |
| [gaterouter-models.html](gaterouter-models.html) | GateRouter 相关模型参考（如有） |
| [_template.md](_template.md) | 新增业务子域文档模板 |

## 继承关系

```
contract + _platform + exchange（tokens / components / layout / styles）
        → business/（本目录）
```
