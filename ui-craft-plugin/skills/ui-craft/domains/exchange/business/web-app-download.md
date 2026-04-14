# Gate 官方下载页（Web）— Figma 1:1 规格

> 所属域：[Exchange](../domain.md) > Business > Web App Download  
> **设计真值来源**：[用户旅程2026 — Web 下载长页](https://www.figma.com/design/aBmiUjk19ARM53KVxlp0Ut/%E7%94%A8%E6%88%B7%E6%97%85%E7%A8%8B2026?node-id=1341-65396)  
> **根画板节点**：`1341:65396`（`Frame 2147232801`）

---

## 区块 1: 元信息

```yaml
name: web-app-download
description: Gate 官方下载落地页（Web 1900+ 深色长页，Hero + 功能矩阵 + 数据卡片 + FAQ + 双 QR）
figma: https://www.figma.com/design/aBmiUjk19ARM53KVxlp0Ut/%E7%94%A8%E6%88%B7%E6%97%85%E7%A8%8B2026?node-id=1341-65396
figma_file_key: aBmiUjk19ARM53KVxlp0Ut
figma_root_node_id: 1341:65396
coverage: Web
theme: dark
```

---

## 区块 2: 业务画像

- **目标用户**：通过 PC Web 访问、需扫码或直接了解 Gate App 的访客
- **核心场景**：选择下载类型（App / Desktop / Authenticator）、扫码下载、阅读产品能力与社会证明、FAQ 排障
- **页面类型**：单页营销长页 + 顶栏
- **适用标签**：`下载` `Web` `Gate App` `QR` `FAQ` `V5`

| 维度 | 本业务 | Exchange 默认 | 说明 |
|------|--------|--------------|------|
| 主题 | 深色全屏 | — | 主背景黑场 + 高对比文案 |
| 信息密度 | 中 | 高 | 分段模块 + 大留白 |
| 视觉风格 | 营销 / Web3 | 交易 | 3D KV、渐变标题、玻璃拟态数据卡 |

---

## 区块 3: Token 与排版（Figma 变量 / 样式名）

> 实现时使用 **Figma 变量名**；下列 HEX 来自 `get_variable_defs` 快照，深色主题下 `--color-text-text-primary` 等可能表现为白字。

### 3.1 颜色变量（摘录）

| 变量 | 值 | 用途 |
|------|-----|------|
| `--color-bg-primary` | `#070808` | 底色参考 |
| `--color-bg-tertiary` | `#18191b` | 层级背景 |
| `--color-cmpt-input` | `#1f2023` | Tab 容器（TabsCardV5-web） |
| `--color-layer-active` | `#484b51` | Tab 选中槽 |
| `--color-text-text-primary` | 见主题 | 主文案（亮色主题下为 `#070808`，本页视觉上为浅/白） |
| `--color-text-text-secondary` | `#84888c` | 次级 Tab 文案 |
| `--color-text-text-tertiary` | `#84888c` | 区块说明小字 |
| `--text&icon/inverse-primary` | `#ffffff` | 模块标题字（Feature 标题） |
| `--color-bg-always-white` | `#ffffff` | 数据卡主数字 |

### 3.2 组件专用色（硬编码于节点）

| 用途 | 值 |
|------|-----|
| 统计卡描边（强调） | `#184faf`、`#537abd`、`#62789d` |
| 统计卡描边（中性） | `#606266` |
| Hero 标题渐变（近似真值） | `linear-gradient(85.16294957712081deg, #0062F3 17.886%, #2C88FF 51.586%, #57B6FF 99.613%)` |
| 分段大标题渐变（近似真值） | `linear-gradient(79.22684933417425deg, #C8C8C8 10.557%, #FFFFFF 51.94%)` |

### 3.3 字阶（Figma 样式名 → 实现）

| 用途 | 样式 / Token | 规格 |
|------|----------------|------|
| Hero 主标题 | `Gate_Switzer Bold` + 渐变填充 | `100px`，`normal` 行高 |
| Hero 副标题 | `Switzer Variable Light` | `32px`，`normal`，居中 |
| 顶栏「Official Download」 | `Web_V5/Body/B1 400 20px` | `20px/400`，`lh 1.3` |
| Tab 项 | `Switzer Medium` + `Web_V5/Subtitle/S4` | `20px/500`，`lh 1.3`，`px 32 py 8`，内圆角 `14px`（选中） / `8px`（未选） |
| 分段主标题（All in Web3 / Building… / FAQ） | `Switzer Regular` + 渐变填充 | `80px`，`lh 1.3`，居中 |
| 分类标题（Trade / Airdrop…） | `Web_V5/Heading/H2 600 40px` | `40px/600`，`lh 1.3`，`opacity: 0.9` |
| Feature 子标题（Spot / CandyDrop…） | 同上 | `40px/600`，`lh 1.3`，`opacity: 0.9` |
| 正文 / FAQ 答案 | `Web_V5/BodyMutil/BM1 400 16px` | `16px/400`，`lh 1.5` |
| FAQ 问题行 | `Web_V5/Heading/H7 600 24px` | `24px/600`，`lh 1.3` |
| QR 下方主提示 | `Switzer Semibold` | `32px/600`，`lh 1.5` |
| QR 下方链接行 | 混排：Regular `rgba(255,255,255,0.8)` + 链 SEMibold 白字下划线 | `20px` |
| 数据卡大数字 | `Switzer Bold` | `40px` |
| 数据卡说明 | `Switzer Regular` | `20px` |

### 3.4 全局布局常量

| 属性 | 值 |
|------|-----|
| 画板宽度 | `1920px` |
| 画板高度 | `9514px`（根节点） |
| 主内容区宽度 | `1200px`（多数模块 `x = 360`，`360 + 1200 = 1920` 居中） |
| FAQ / 部分窄模块 | `1200px`（`x = 360`） |
| 顶栏高度 | `48px`，水平 `padding 24px` |

---

## 区块 4: 页面结构（自上而下，与 Figma 顺序一致）

### 4.1 顶栏 `Header+Footer`（`1341:66198`）

- 左：**Gate Logo**（`103.51×24`）+ **Divider-Web**（`1×16`）+ 文案 **「Official Download」**（`1341:66231`，`20px`，`--text&icon/text-tertiary`）
- 右：**CEX_Language**（`24×24`）

### 4.2 Hero 文案 + 下载类型 Tab（`1341:66109`，约 `1200×292`，`y=148`）

- **H1**（`1341:66112`）：`Download Gate App` — 渐变填充，`Gate_Switzer Bold`，`100px`
- **副标题**（`1341:66116`）：`Trusted by 50M traders worldwide` — `32px`，居中
- **TabsCardV5-web**（`1443:10320`，`588×64`）：外层 `rounded 16px`，`padding 8px`，`bg: --color-cmpt-input`
  - **Tab 1（选中）**：`Gate App` — 槽 `bg: --color-layer-active`，`rounded 14px`，文案用 `text-primary`
  - **Tab 2**：`Gate Desktop` — 文案 `text-secondary`
  - **Tab 3**：`Gate Authenticator` — 文案 `text-secondary`

### 4.3 Hero 主视觉区

- **背景蒙版卡片**（`1570:13146` `Mask group`）：约 `1600×850`，`x=160`，内含大圆角矩形叠加模糊底图（导出为整层切片实现 1:1）
- **左侧 3D 手持双机**（`1581:18222` `Group 2147213653`）：位图 `app` + `layer1` 叠加纹理（需整组导出）
- **右侧 QR 模块**（`1690:12900` `Frame 2147232862`，`360×541.31`，`x=1220`）
  - 二维码区：`320×320` 内容卡片，`rounded 24px`，外槽 `360×360`、`rounded 48px`，`bg: --color-bg-inverse-tertiary`
  - 中心 **88×88** 白底圆角品牌标占位（与 MCP 导出 `image 3537` + `Group` 一致）
  - 下方：**「Scan to Download App」**（`1480:13501`，`32px Semibold`）
  - 链接行（`1449:10421`）：`Check`（`rgba(255,255,255,0.8)`）+ **`iOS Guide`**（白、下划线、Semibold）+ `or` + **`Android Guide`**
  - 商店徽章行（`1449:10425`）：Google Play + App Store 两组矢量组（保持 Figma 导出尺寸）

### 4.4 币种图标跑马背景（`1451:11402` `常见币种图标`）

从左至右 **实例名**：`fill-all`（`80×80`、`y=-10`）→ `BTC` → `ETH` → `USDT` → `GT` → `LTC` → `XRP` → `BNB` → `SHIB` → `DOGE` → `SOL` → `AVAX`（各 `60×60`，约 `200px` 水平步进）

### 4.5 「All in Web3」区

- **标题**（`1664:8071`）：两行 — `All in Web3` / `Your Gateway to the Future of Crypto`，`80px` 渐变字，居中，宽 `1320`（`x=300`）
- **Trade**（`1690:13010`，`1320×607`）
  - 中央：**3D 图标** + Pill 上 **「Trade」**（`1664:8142`）
  - **2×2 网格**（`y` 偏移约 `310`）：行距栅格与 Figma 一致 `560px` 列宽 + `760`  gutter
    - **Spot** / 描述：`Buy and sell digital assets instantly, simple and straightforward to get started`（`1664:8076` / `1664:8077`）
    - **TradFi** / 描述：`TradFi - One-stop trading for global assets, covering stocks, indices, and forex`（`1664:8078` / `1664:8079`）
    - **Futures** / 描述：`Support for long and short positions with high leverage to amplify profits and seize market trends`（`1690:12906` / `1690:12907`）
    - **Alpha** / 描述：`Capture excess market returns, discover high-potential opportunities`（`1690:12909` / `1690:12910`）

### 4.6 「Airdrop」区（`1690:13011`，`1320×581`）

- Pill：**「Airdrop」**（`1690:12992`）
- 2×2：**CandyDrop**、`HODLer Airdrop`、`Launchpool`、`Launchpad` + 对应描述（`1690:12998`–`1690:13009` 文案节点）

### 4.7 「Tool」区（`1690:13012`，`1320×400`）

- Pill：**「Tool」**（`1690:13034`）
- 双列：**Copy trading**、`Quantitative trading` + 描述（`1690:13038`–`1690:13046`）

### 4.8 「Fortune」区（`1690:13059`，`1320×336`）

- Pill：**「Fortune」**（`1690:13077`）
- 居中说明（`1690:13101`）：`Complete tasks to earn candy easily, redeem for quality airdrop rewards`

### 4.9 「Web 3」区（`1664:8288`，约 `788×322`，`x=566`）

- Pill：**「Web 3」**（`1664:8310`）
- 副文案（`1664:8314`）：`Freely interact with on-chain wallet assets and take control of your crypto assets with AI.`

### 4.10 「Gate AI」区（`1690:13140`，`788×322`，`x=566`）

- Pill：**「Gate AI」**（`1690:13162`，保留 Figma 内尾空格）
- 副文案（`1690:13164`）：与 Web 3 **相同英文句**（Figma 当前节点真值一致）

### 4.11 「Building the crypto economy since 2013」

- **标题**（`1664:8345`）：两行 — `Building the crypto economy` / `since 2013`，规格同其他 `80px` 渐变标题
- **数据卡云**（`1690:13195` `Group 2147213678`）：多卡片绝对定位；单卡通用规格见下表（摘自各 `Frame 2147232822` 子节点）

| 节点 | 主文案 | 副文案 | 边框色 | 备注 |
|------|--------|--------|--------|------|
| `1664:8363` | Top 1 | TradFi Exchange Rankings | `#537abd` | `shadow: 0 4px 36px rgba(0,0,0,0.35)` |
| `1664:8348` | Top 2 | Global Spot Exchange Rankings | `#184faf` | |
| `1664:8351` | Top 3 | Global Derivatives Exchange Rankings | `#184faf` | |
| `1664:8360` | 9.75% | Simple Earn APR | `#62789d` | |
| `1664:8354` | 4500+ | Crypto Currencies | `#606266` | |
| `1664:8357` | 125% | Total Reserve Rate | `#606266` | |

- **单卡样式**：`border 2px solid`（色如上），`rounded 40px`，内 `flex-col gap 8`，`py 14`；装饰层 `backdrop-blur 50px`、`bg rgba(255,255,255,0.01)`、`mix-blend-luminosity`；主数字区水平 `padding` 按节点为 `60px` 或 `100px`

### 4.12 FAQ（`1664:8268` `36`，`1200×820`，`y=7560`）

- **标题** `1664:8269`：`FAQ`，`80px`，`capitalize`，居中
- **列表** `1664:8271`：垂直 `gap 24`（由子项 `y` 推算：`0 / 240 / 328 / 416 / 504 / 592`）
- **折叠项组件**：`CollapseV5-web/item`
  1. **展开** `1664:8272`（高 `216`）：问 `How to download the Gate App?` — 答为多段 `16px` `text-secondary`（Android / iOS / 客服）
  2. `1664:8273`：`How is the security of the Gate App ensured?`
  3. `1664:8274`：`Why choose Gate over other trading platforms?`
  4. `1664:8275`：`Why is the Gate App the best choice for beginners?`
  5. `1664:8276`：`How long does it take to withdraw from the Gate App?`
  6. `1664:8277`：`Why is the Gate App considered the easiest cryptocurrency app to use?`
- **问题行**：`py 16`，标题与图标 `gap 16`，图标 `CEX_chevron_up/down`，`24px`

### 4.13 页脚 QR 重复模块（`1690:13257`）

- 结构与 Hero 右侧 QR **同构**（`1690:13258`–`1690:13302`），文案与链点与 `1449:10419` 模块一致，用于页面底部再次转化

---

## 区块 5: 业务专属组件

| 组件（Figma 实例名） | 职责 | 关键尺寸 / 行为 |
|----------------------|------|------------------|
| **Header+Footer** | 顶栏 | 高 `48px`，左右 `24px` |
| **TabsCardV5-web** | App/Desktop/Authenticator 切换 | 外层 `16` 圆角，内高 `48` |
| **CollapseV5-web/item** | FAQ 手风琴 | 首条默认展开，216 / 64 高度 |
| **Divider-Web** | Logo 与文案分隔 | `1×16` |
| **CEX_Language** | 语言入口 | `24×24` |
| **QR + 徽章组合** | 扫码 + 双商店 | 宽 `360`，二维码边 `320`，中心标 `88` |

隐藏图层（`hidden="true"`）**不要导出到实现**。

---

## 区块 6: 适用性 & H5/Web 差异

### 适用场景

- **Web 桌面端** 官方下载与信任背书（本条为 Figma Web 1920 真值）

### 不适用场景

- **移动端 H5** 若需 1:1，应使用 Figma 中 **H5 同名画板节点**另建规格（本文件仅覆盖 `1341:65396`）

### H5 vs Web 速查

| 维度 | 本文档（Web） | H5（未在此节点） |
|------|----------------|------------------|
| 画板宽度 | `1920px` | 通常为 `375` 逻辑宽 |
| 主内容 | `1200px` 居中 | 以 H5 AutoLayout 为准 |
| Tab / FAQ | `TabsCardV5-web`、`CollapseV5-web/item` | 可能为 V5 H5 变体 |

---

## 资产与导出说明

- Hero / 3D / 背景大图：在 Figma 中对 **`Mask group`、`Group 2147213653`** 等成组导出 **2x PNG/WebP**，避免浏览器端拼层误差。
- QR 位图：节点 `1449:10410` / `1690:13261` 使用 MCP 导出 URL **仅短期有效**；上线前写入 `web-app-download-assets/` 或 CDN。
- 币种图标：**实例**引用设计库，前端实现可用 `@gate/iconfont` 或导出的 `60×60` PNG/SVG 雪碧。

---

## 实现勾选清单（1:1）

- [ ] 根容器 `min-height` 与分段 `y` 与 **`9514px`**  scroll 结构一致（或可压缩为流式布局但视觉间距等价）
- [ ] Hero H1 渐变角度 / 色标与 **`85.16deg`** 渐变一致
- [ ] 三段 Tab 文案与选中 / 未选 **Token** 一致
- [ ] 两个 QR 模块 + 币种行 + 六个数据卡 **边框色与阴影** 与表 4.11 一致
- [ ] FAQ **第一条默认展开** + **六条英文题干** 一字不差
- [ ] `Gate AI` pill 与 **`Freely interact…`** 副文案与 Figma 当前节点一致（与 Web 3 区副文案重复为设计事实）
