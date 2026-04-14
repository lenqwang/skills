# Figma 分析指南

> 通过 Figma MCP Server 直接提取精确设计参数，跳过截图目测环节。

## 接入方式

### 方案 A：社区版 Figma-Context-MCP（推荐）

免费、专为 Cursor 优化、上下文精简。

**配置**（`~/.cursor/mcp.json`）：

```json
{
  "mcpServers": {
    "figma-developer-mcp": {
      "command": "npx",
      "args": ["-y", "figma-developer-mcp", "--stdio"],
      "env": {
        "FIGMA_API_KEY": "figd_你的token"
      }
    }
  }
}
```

获取 Token：Figma → Settings → Account → Personal access tokens → Create new token

### 方案 B：Figma 官方 Dev Mode MCP

需 Figma 付费版（含 Dev Mode）+ 桌面端。

1. 打开 Figma 桌面端 → Preferences → 勾选 Enable Dev Mode MCP Server
2. 服务启动在 `http://127.0.0.1:3845/sse`
3. 在 Cursor MCP 目录安装，或手动配置 `"url": "http://127.0.0.1:3845/sse"`

### 方案对比

| 维度 | 社区版 | 官方版 |
|------|--------|--------|
| 费用 | 免费 | 需付费版 |
| 数据精简度 | 高（AI 更准） | 中（数据全面但冗余多） |
| 一次成功率 | 较高 | 一般 |
| Code Connect | 不支持 | 支持 |
| 运行方式 | npx 远程 | 依赖桌面端 |

---

## 两条使用路径

### 路径选择逻辑

```
用户提供 Figma 链接
    ↓
是否要求 "高保真还原" / "1:1还原" / 明确要求还原度优先？
    ├─ YES → 路径 A：Figma 直出 + ui-craft 校验（推荐）
    └─ NO  → 路径 B：Token 抽象 + 重建（省 token，适合概念验证）
```

**默认走路径 A**。只有在明确需要省 token 消耗或做概念验证时才用路径 B。

---

## 路径 A：Figma 直出 + ui-craft 校验（推荐）

> 核心思路：**让 Figma MCP 做还原，让 ui-craft 做规范校验**。

### 流程总览

```
Step 1: 解析 Figma URL → 提取 fileKey + nodeId
    ↓
Step 2: get_design_context(fileKey, nodeId) → 获取完整结构化数据
    ↓ 如数据过大，用 get_metadata 拆分后逐区请求
Step 3: get_screenshot(fileKey, nodeId) → 获取视觉参照
    ↓
Step 4: 基于完整 Figma 数据直接生成 HTML
    ↓ 保留每个元素的精确颜色/间距/圆角/布局
    ↓ 同时生成 :root CSS 变量（从实际使用值反向提取）
Step 5: ui-craft 规范校验（R1-R24 逐项检查）
    ↓ 只修不合规项，不改已还原的精确值
Step 6: 截图对比验证
```

### Step 1-3：获取 Figma 数据

与 Figma 官方 implement-design 流程一致：

1. **解析 URL**：从 `figma.com/design/:fileKey/:fileName?node-id=1-2` 提取 fileKey 和 nodeId
2. **获取设计上下文**：`get_design_context(fileKey, nodeId)` — 返回布局、颜色、字号、间距、组件结构
3. **获取截图**：`get_screenshot(fileKey, nodeId)` — 作为像素级对照

**数据过大时的拆分策略**：
```
1. get_metadata(fileKey, nodeId) → 获取节点树概览
2. 识别顶层 section（Hero / Cards / FAQ 等）的 childNodeId
3. 对每个 section 单独调用 get_design_context(fileKey, childNodeId)
```

### Step 4：基于完整数据生成 HTML

**关键原则：不压缩、不归档、不近似**

- 颜色：每个元素使用 Figma 返回的精确 hex，不合并相近色
- 间距：使用 Figma Auto Layout 的精确 padding/gap 值，不四舍五入到档位
- 圆角：使用每个元素的精确 cornerRadius，不归入预设档位
- 布局：保留 Figma 的 flex 方向、对齐、约束，精确还原

**同时反向生成 `:root` CSS 变量**（供工具面板使用）：
```css
:root {
  /* 从 Figma 实际使用值中提取，而非预设语义档位 */
  --c-bg: #0D0D12;      /* 页面背景实际色 */
  --c-card: #FFF8F0;    /* 卡片背景实际色 */
  --c-accent: #B00025;  /* 主强调色实际色 */
  /* ... 其他颜色从 Figma 精确提取 ... */
  --r-card: 32;         /* 卡片实际圆角 */
  --r-btn: 9999;        /* 按钮实际圆角 */
  --s-section: 80;      /* 区块间距实际值 */
  /* ... */
}
```

变量命名仍遵循 `dynamic-theme.mdc` 的前缀规范（`--c-` / `--r-` / `--s-`），保证工具面板兼容。

### Step 5：ui-craft 规范校验

拿到高保真 HTML 后，逐项检查 `design-system/rules.md` 的 R1-R24：

| 检查项 | 通过条件 | 不通过时的修正策略 |
|--------|---------|-------------------|
| R1 颜色变量化 | 所有颜色使用 CSS 变量或 Tailwind 类 | 硬编码 hex → 提取为 `--c-*` 变量 |
| R5 间距语义化 | 使用 CSS 变量引用 | 硬编码 px → 提取为 `--s-*` 变量 |
| R8 圆角语义化 | 使用 CSS 变量引用 | 硬编码 px → 提取为 `--r-*` 变量 |
| R10 标题层级 | 不跳级 | 调整 HTML 标签层级 |
| R13 最大宽度 | 内容不超限 | 加 max-width 约束 |
| R16 无 emoji | 无 emoji 作为图标 | 替换为 SVG 占位 |
| R20 CTA 唯一 | 每屏最多一个主 CTA | 降级次要 CTA 样式 |
| R22 对比度 | 满足 WCAG AA | 微调透明度 |

**修正原则**：
- 只做**变量化包装**（把精确值放进变量），不改变量的值本身
- 布局和视觉效果**不动**
- 只在违反强制规则时才修正，不做"语义化美化"

### Step 6：截图对比

生成完成后，用浏览器截图与 Step 3 的 Figma 截图对比，确保还原度未因校验修正而下降。

---

## 路径 B：Token 抽象 + 重建（降级方案）

> 适用场景：概念验证、token 预算紧张、不需要像素级还原。

```
用户粘贴 Figma 链接
    ↓ 分区请求（Step 1）
按 Hero / 卡片 / FAQ 分 2-3 次调用 get_figma_data（指定 nodeId + depth）
    ↓ Token 提取（Step 2-3）
执行 figma-token-extractor.md → 输出 ≤2000 字符的精简 Token 摘要
（丢弃 SVG 路径、装饰图形、图片 URL、重复组件等冗余数据）
    ↓ 颜色规范前置（Step 4）
按 dynamic-theme.mdc 1.1/1.2 规范：全 hex、语义命名、7 组分类
    ↓ 映射
Token 摘要 → :root CSS 变量
    ↓ Pattern 匹配
组件清单 → 匹配 patterns/ 下的模板 → 填参数
    ↓ 生成
HTML（按 screenshot-to-code.mdc 阶段三流程）
    ↓ 验证
浏览器截图对比
```

**已知局限**：
- 颜色精度：相近色会被合并（~15 个语义色 vs Figma 的 20+ 种）
- 间距精度：被量化到 5 档（8/16/32/48/80），中间值近似
- 布局精度：组件清单只有一行描述，布局靠 AI 推测

详细提取规范见 `figma-token-extractor.md`。

---

## 与截图流程的差异

| 参数 | 截图流程 | 路径 B (Token 抽象) | 路径 A (Figma 直出) |
|------|---------|-------------------|-------------------|
| 颜色 | AI 目测，误差 #20-30 | 精确 hex，但合并相近色 | 精确 hex，逐元素保留 |
| 字号 | AI 估算，误差 2-4px | 精确 px + weight | 精确 px + weight |
| 间距 | AI 估算，误差 4-8px | 精确但量化到 5 档 | 精确 padding/gap |
| 圆角 | AI 估算，误差 2-4px | 精确但量化到 5 档 | 精确 cornerRadius |
| 布局 | AI 推测 | AI 推测（组件清单） | 保留完整 Auto Layout |
| 预计校准轮次 | 3-5 轮 | 1-2 轮 | 0-1 轮 |

## Token 消耗对比

| 策略 | 消耗 | 还原度 |
|------|------|--------|
| 路径 A（Figma 直出） | ~50-100K token | 像素级 |
| 路径 B（Token 抽象） | ~5-10K token | 中等（需 1-2 轮校准） |
| 截图流程 | ~3-5K token | 低（需 3-5 轮校准） |

## 提示词示例

```
# 高保真还原（路径 A，默认）
帮我用这个 Figma 设计 1:1 还原页面：
https://www.figma.com/design/xxxxx/PageName?node-id=123-456

# 概念验证（路径 B）
帮我用这个 Figma 快速出个原型，不用太精确：
https://www.figma.com/design/xxxxx/PageName?node-id=123-456
```
