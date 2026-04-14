# Workflow: 校准

> 覆盖命令：`--calibrate <url>` / `--calibrate <image>`

---

## 上下文加载

| 必读 | 按需读 |
|------|--------|
| `contract/rules.md` | — |
| `domains/campaign/styles/_template.md` | — |
| `engine/calibrate/url-to-style.md` | — |
| — | `engine/calibrate/screenshot.md`（截图模式） |
| — | `engine/calibrate/webpage.md`（进入校准循环时） |
| — | `domains/campaign/semantic.md`（语义映射不确定时） |

---

## URL 校准流程（`--calibrate <url> [--name <style-name>]`）

```
步骤 1: 读取 engine/calibrate/url-to-style.md 获取管线定义

步骤 2: Phase 1 抓取
        WebFetch 获取页面，提取 raw_tokens（颜色、字阶、间距、圆角）

步骤 3: Phase 2 映射
        映射到语义 Token，计算与已有 style 重叠度
        ├─ 重叠度 > 70% → 建议复用已有 style，询问用户
        ├─ 40%-70% → 基于最接近的 style fork
        └─ < 40% → 创建全新 style

步骤 4: Phase 3 生成
        基于 domains/campaign/styles/_template.md 结构生成初版 style

步骤 5: 询问用户是否进入校准循环（Phase 4）

步骤 6: Phase 4 校准（可选）
        按 L1-L4 分层校准
        ├─ 生成测试 HTML → 截图对比 → 逐层检查
        ├─ 最多 3 轮循环
        └─ 通过标准见 engine/calibrate/screenshot.md

步骤 7: 校准通过 → 保存最终 style 到 domains/campaign/styles/{name}.md
```

## 截图校准流程（`--calibrate <image> [--name <style-name>]`）

流程同 URL 模式，但 Phase 1 使用截图分析（见 `engine/calibrate/screenshot.md`）替代 WebFetch。

---

## 校准管线细节文件

| 文件 | 内容 |
|------|------|
| [url-to-style.md](../calibrate/url-to-style.md) | 完整 4 Phase 管线定义 |
| [screenshot.md](../calibrate/screenshot.md) | 截图分析 + 通过标准 |
| [webpage.md](../calibrate/webpage.md) | 网页抓取 + Token 提取规则 |
| [figma.md](../calibrate/figma.md) | Figma 节点抓取 + 映射 |
