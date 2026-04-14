# Token Crew 赚币

> 所属域：[Exchange](../../domain.md) > Business > [Invite Friends](./_base.md) > Token Crew
> 继承：[_base.md](./_base.md) 共享规范

---

## 区块 1: 元信息

```yaml
name: token-crew
description: Token Crew 赚币模块 — 邀请好友赚取 DOGE/USDT 奖励
figma: https://www.figma.com/design/VMTfLK0ozaGCzynyMho3HT?node-id=492-21906
coverage: Web
theme: dark
inherits: _base.md
supports_skins: true   # 支持节日皮肤变体
assets: ./assets/ASSETS.md  # 图片资源清单
integrated_html: /output/invited-friends/token-crew.html
html_output: /output/invited-friends/token-crew.html
```

---

## 区块 2: 模块画像

- **核心玩法**：邀请好友注册/交易，获得 DOGE/USDT 奖励
- **奖励类型**：Token 空投（DOGE）、USDT 奖励
- **特殊能力**：支持节日皮肤定制（春节、圣诞等）

| 维度 | 本模块 | 基础规范 | 说明 |
|------|--------|---------|------|
| 视觉重点 | 奖励数字 | — | 大字号白色数字 + 蓝色渐变视觉 |
| 装饰程度 | 中等 | 克制 | 右侧有 3D 信封视觉装饰 |
| 动效 | 有 | 无 | 倒计时动效 |

---

## 区块 3: Token 覆盖

> 与 `_base.md` 的差异项。

```css
:root {
  /* 基础色彩 */
  --color-primary: #0055FF;
  --text-primary: #FFFFFF;
  --text-secondary: #A0A3A7;
  --text-tertiary: #84888C;
  --bg-page: #070808;
  --bg-secondary: #131516;
  --bg-card: #1C1E23;
  --border-subtle: #1F2023;
  --font-family: 'Switzer', -apple-system, BlinkMacSystemFont, sans-serif;
  
  /* Token Crew Hero 渐变 */
  --tc-card-gradient: linear-gradient(180deg, #0055FF 18.03%, #408DFF 81.31%);
  --tc-card-shadow: 0px 0px 184.199px rgba(161, 172, 148, 0.3);
  
  /* 倒计时块 */
  --tc-countdown-bg: #1C1E23;
  --tc-countdown-blur: 9.255px;
  --tc-countdown-shadow: 13px 13.663px 250px rgba(100, 73, 1, 0.43);
  
  /* Progress Card 渐变描边 */
  --tc-card-border-gradient: linear-gradient(180deg, #0055FF 0%, #303236 100%);
}
```

---

## 区块 4: 页面结构

### Token Crew 完整布局（HTML 结构）

```html
    <div id="tab-content-token-crew" class="tab-content active">
    <!-- H5 顶栏：Status Bar + TabsV5（仅 ≤767px 展示；≥768px 隐藏） -->
    <div class="ev-h5-status-bar" aria-hidden="true">
      <div class="ev-h5-status-inner">
        <div class="ev-h5-time">9:41</div>
        <div class="ev-h5-dynamic-spacer"></div>
        <div class="ev-h5-status-icons">
          <img src="[signal]" width="19" height="12" alt="">
          <img src="[wifi]" width="17" height="12" alt="">
          <img class="ev-h5-battery" src="[battery]" width="27" height="13" alt="">
        </div>
      </div>
    </div>
    <div class="ev-h5-tab-nav">
      <div class="ev-h5-tab-nav-inner">
        <div class="ev-h5-tab-nav-title-wrap">
          <span class="ev-h5-tab-nav-label">Token Crew</span>
          <img class="ev-h5-tab-nav-chevron" src="[chevron]" width="16" height="16" alt="" aria-hidden="true">
        </div>
        <button type="button" class="ev-h5-tab-nav-close" aria-label="Close">
          <img src="[close]" width="18" height="18" alt="">
        </button>
      </div>
    </div>
    <section class="hero-section">
      <div class="hero-left">
        <div class="hero-text">
          <h1 class="hero-title">2,400,000 DOGE </h1>
          <h2 class="hero-subtitle">Earn Up to per Friend Invited</h2>
          <div class="hero-countdown-wrap">
            <div class="countdown">
              <div class="countdown-block"><span class="countdown-value">4D</span></div>
              <span class="countdown-separator">:</span>
              <div class="countdown-block"><span class="countdown-value">23</span></div>
              <span class="countdown-separator">:</span>
              <div class="countdown-block"><span class="countdown-value">00</span></div>
              <span class="countdown-separator">:</span>
              <div class="countdown-block"><span class="countdown-value">00</span></div>
            </div>
          </div>
        </div>
        <button class="invite-btn">Invite Now</button>
      </div>
      <div class="hero-visual">
        <div class="hero-visual-container">
          <!-- 697x697 背景圆 (CSS 实现) -->
          <div class="hero-visual-bg"></div>
          <!-- 左下角美元图标 -->
          <div class="hero-coin-left">
            <div class="hero-coin-left-bg">
              <div class="liquidGlass-effect"></div>
              <div class="liquidGlass-tint"></div>
              <div class="liquidGlass-shine"></div>
              <div class="liquidGlass-iridescence"></div>
              <div class="liquidGlass-noise"></div>
              <div class="liquidGlass-stroke"></div>
            </div>
            <div class="hero-coin-left-icon">
              <img src="assets/images/hero-dollar-icon.png" alt="dollar sign">
            </div>
          </div>
          <!-- 信封主体（使用合成大图） -->
          <div class="hero-envelope">
            <div class="hero-envelope-main">
              <img src="assets/images/hero-envelope-main.png" alt="envelope">
            </div>
            <span class="hero-card-label">Total reward amount</span>
            <div class="hero-envelope-text">
              <span class="hero-card-amount">10,000</span>
              <span class="hero-card-unit">USDT</span>
            </div>
          </div>
          <!-- 发光球（信封和USDT币之间） -->
          <div class="hero-glow-ball">
            <img src="assets/images/hero-glow-ball.svg" alt="glow ball">
          </div>
          <!-- 右上角 USDT 币 -->
          <div class="hero-coin-right">
            <div class="hero-coin-right-bg">
              <div class="liquidGlass-effect"></div>
              <div class="liquidGlass-tint"></div>
              <div class="liquidGlass-shine"></div>
              <div class="liquidGlass-iridescence"></div>
              <div class="liquidGlass-noise"></div>
              <div class="liquidGlass-stroke"></div>
            </div>
            <div class="hero-coin-right-icon">
              <img src="assets/images/hero-usdt-icon.png" alt="USDT icon">
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- My Rewards Section -->
    <section class="my-rewards">
      <div class="section-header">
        <div class="section-title-wrap">
          <h2 class="section-title">My Rewards</h2>
          <p class="section-desc">...</p>
        </div>
        <div class="section-arrow">→</div>
      </div>
      <!-- Desktop: 双卡布局（≥768px 显示） -->
      <div class="rewards-cards">
        <div class="reward-stat-card">...</div>
        <div class="reward-stat-card">...</div>
      </div>
      <!-- H5: 合并单卡（≤767px 显示，≥768px 隐藏） -->
      <div class="tc-h5-my-rewards">
        <div class="tc-h5-rewards-header">
          <div class="tc-h5-rewards-value">
            <span class="tc-h5-val-unlocked">3.315</span>
            <span class="tc-h5-val-sep"> / </span>
            <span class="tc-h5-val-locked">9.29</span>
            <span class="tc-h5-val-unit"> USDT</span>
          </div>
          <img class="tc-h5-val-arrow" src="[forward-arrow]" width="16" height="16">
        </div>
        <div class="tc-h5-rewards-bar">
          <div class="tc-h5-bar-blue" style="width: 101px;"></div>
          <div class="tc-h5-bar-gray"></div>
        </div>
        <p class="tc-h5-rewards-desc">The reward progress is calculated based on the tasks completed by your friends.</p>
      </div>
    </section>

    <!-- Reward Progress Section -->
    <section class="reward-progress">
      <div class="section-header">
        <div class="section-title-wrap">
          <h2 class="section-title">Reward Progress</h2>
          <p class="section-desc">Rewards can be withdrawn after friends complete all tasks</p>
        </div>
      </div>
      <div class="progress-cards">
        <!-- Card 1: 第一步进行中 -->
        <div class="progress-card">
          <div class="progress-card-header">
            <div class="progress-user">
              <div class="progress-avatar">
                <img src="https://www.figma.com/api/mcp/asset/5c8b889a-6aa4-4ac4-a477-2cae86798333" alt="avatar">
              </div>
              <span class="progress-uid">UID:25517603</span>
            </div>
            <button class="claim-btn">Claim</button>
          </div>
          <div class="progress-card-content">
            <div class="steps-indicator-row">
              <div class="step-indicator active"><img src="[active]" alt="active"></div>
              <div class="step-connector-inline"><img src="[line]" alt=""></div>
              <div class="step-indicator pending"><img src="[pending]" alt=""></div>
              <div class="step-connector-inline"><img src="[line]" alt=""></div>
              <div class="step-indicator pending"><img src="[pending]" alt=""></div>
            </div>
            <div class="steps-info-row">
              <div class="step-info">
                <div class="step-amount">10.13 USDT</div>
                <div class="step-label">Identify Verification</div>
              </div>
              <div class="step-info">
                <div class="step-amount">1.123 USDT</div>
                <div class="step-label">First Deposit</div>
              </div>
              <div class="step-info">
                <div class="step-amount">1.123 USDT</div>
                <div class="step-label">Trade</div>
              </div>
            </div>
          </div>
          <!-- H5 专属 CTA（≤767px 显示，≥768px 隐藏） -->
          <button class="tc-h5-card-cta">Invite now</button>
        </div>
        <!-- Card 2~4: 结构同 Card 1, 步骤状态不同, 每张卡底部都有 tc-h5-card-cta -->
        <div class="progress-card">
          <div class="progress-card-header">
            <div class="progress-user">
              <div class="progress-avatar">
                <img src="https://www.figma.com/api/mcp/asset/99f46415-28a3-4837-b006-e8b66b1d189b" alt="avatar">
              </div>
              <span class="progress-uid">UID:25517603</span>
            </div>
            <button class="claim-btn">Claim</button>
          </div>
          <div class="progress-card-content">
            <!-- 步骤指示器行：节点 - 线 - 节点 - 线 - 节点 -->
            <div class="steps-indicator-row">
              <div class="step-indicator completed"><img src="https://www.figma.com/api/mcp/asset/6b06c3cd-6480-41d1-8721-cf38404b7097" alt="completed"></div>
              <div class="step-connector-inline"><img src="https://www.figma.com/api/mcp/asset/3fbe7095-e0f0-4d95-9eb5-4e6a4ebbc706" alt="active line"></div>
              <div class="step-indicator active"><img src="https://www.figma.com/api/mcp/asset/5005b2d7-24dc-4cbb-bb21-4ba17aa9046b" alt="active"></div>
              <div class="step-connector-inline"><img src="https://www.figma.com/api/mcp/asset/1717f9c6-e772-4ae8-a19d-15434ffaa167" alt="pending line"></div>
              <div class="step-indicator pending"><img src="https://www.figma.com/api/mcp/asset/558d33e2-abc0-490c-b915-5468094c0cda" alt="pending"></div>
            </div>
            <!-- 步骤信息行 -->
            <div class="steps-info-row">
              <div class="step-info">
                <div class="step-amount">1.123 USDT</div>
                <div class="step-label">Identify Verification</div>
              </div>
              <div class="step-info">
                <div class="step-amount">1.123 USDT</div>
                <div class="step-label">First Deposit</div>
              </div>
              <div class="step-info">
                <div class="step-amount">1.123 USDT</div>
                <div class="step-label">Trade</div>
              </div>
            </div>
          </div>
        </div>
        <!-- Card 3: 前两步完成，第三步进行中 -->
        <div class="progress-card">
          <div class="progress-card-header">
            <div class="progress-user">
              <div class="progress-avatar">
                <img src="https://www.figma.com/api/mcp/asset/5c8b889a-6aa4-4ac4-a477-2cae86798333" alt="avatar">
              </div>
              <span class="progress-uid">UID:25517603</span>
            </div>
            <button class="claim-btn">Claim</button>
          </div>
          <div class="progress-card-content">
            <!-- 步骤指示器行：节点 - 线 - 节点 - 线 - 节点 -->
            <div class="steps-indicator-row">
              <div class="step-indicator completed"><img src="https://www.figma.com/api/mcp/asset/63733169-fe2b-4e46-9405-a9d7f59efe59" alt="completed"></div>
              <div class="step-connector-inline"><img src="https://www.figma.com/api/mcp/asset/3fbe7095-e0f0-4d95-9eb5-4e6a4ebbc706" alt="active line"></div>
              <div class="step-indicator completed"><img src="https://www.figma.com/api/mcp/asset/63733169-fe2b-4e46-9405-a9d7f59efe59" alt="completed"></div>
              <div class="step-connector-inline"><img src="https://www.figma.com/api/mcp/asset/3fbe7095-e0f0-4d95-9eb5-4e6a4ebbc706" alt="active line"></div>
              <div class="step-indicator active"><img src="https://www.figma.com/api/mcp/asset/5005b2d7-24dc-4cbb-bb21-4ba17aa9046b" alt="active"></div>
            </div>
            <!-- 步骤信息行 -->
            <div class="steps-info-row">
              <div class="step-info">
                <div class="step-amount">10.13 USDT</div>
                <div class="step-label">Identify Verification</div>
              </div>
              <div class="step-info">
                <div class="step-amount">1.123 USDT</div>
                <div class="step-label">First Deposit</div>
              </div>
              <div class="step-info">
                <div class="step-amount">1.123 USDT</div>
                <div class="step-label">Trade</div>
              </div>
            </div>
          </div>
        </div>
        <!-- Card 4: 全部完成 -->
        <div class="progress-card completed">
          <div class="progress-card-header">
            <div class="progress-user">
              <div class="progress-avatar">
                <img src="https://www.figma.com/api/mcp/asset/5c8b889a-6aa4-4ac4-a477-2cae86798333" alt="avatar">
              </div>
              <span class="progress-uid">UID:25517603</span>
            </div>
            <button class="claim-btn active">Claim</button>
          </div>
          <div class="progress-card-content">
            <!-- 步骤指示器行：节点 - 线 - 节点 - 线 - 节点 -->
            <div class="steps-indicator-row">
              <div class="step-indicator completed"><img src="https://www.figma.com/api/mcp/asset/63733169-fe2b-4e46-9405-a9d7f59efe59" alt="completed"></div>
              <div class="step-connector-inline"><img src="https://www.figma.com/api/mcp/asset/3fbe7095-e0f0-4d95-9eb5-4e6a4ebbc706" alt="active line"></div>
              <div class="step-indicator completed"><img src="https://www.figma.com/api/mcp/asset/63733169-fe2b-4e46-9405-a9d7f59efe59" alt="completed"></div>
              <div class="step-connector-inline"><img src="https://www.figma.com/api/mcp/asset/3fbe7095-e0f0-4d95-9eb5-4e6a4ebbc706" alt="active line"></div>
              <div class="step-indicator completed"><img src="https://www.figma.com/api/mcp/asset/63733169-fe2b-4e46-9405-a9d7f59efe59" alt="completed"></div>
            </div>
            <!-- 步骤信息行 -->
            <div class="steps-info-row">
              <div class="step-info">
                <div class="step-amount">10.13 USDT</div>
                <div class="step-label">Identify Verification</div>
              </div>
              <div class="step-info">
                <div class="step-amount">1.123 USDT</div>
                <div class="step-label">First Deposit</div>
              </div>
              <div class="step-info">
                <div class="step-amount">1.123 USDT</div>
                <div class="step-label">Trade</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="pagination">
        <div class="page-dot active">1</div>
        <div class="page-dot">2</div>
        <div class="page-dot">3</div>
      </div>
    </section>

    <!-- Withdrawal Record Section -->
    <section class="withdrawal-record">
      <div class="section-header">
        <div class="section-title-wrap">
          <h2 class="section-title">Withdrawal Record</h2>
        </div>
      </div>
      <div class="mobile-table-scroll">
      <table class="withdrawal-table">
        <thead>
          <tr>
            <th style="width: 25%;">Bonus Amount</th>
            <th style="width: 25%;">Reward Status</th>
            <th style="width: 25%;">Withdrawal Time</th>
            <th style="width: 25%;">Total Earned Friends UID</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>76 USDT</td><td>Issued</td><td>2025/04/10</td><td>25517603</td></tr>
          <tr><td>76 USDT</td><td>Issued</td><td>2025/04/10</td><td>25517603</td></tr>
          <tr><td>76 USDT</td><td>Issued</td><td>2025/04/10</td><td>25517603</td></tr>
          <tr><td>76 USDT</td><td>Issued</td><td>2025/04/10</td><td>25517603</td></tr>
          <tr><td>76 USDT</td><td>Issued</td><td>2025/04/10</td><td>25517603</td></tr>
          <tr><td>76 USDT</td><td>Issued</td><td>2025/04/10</td><td>25517603</td></tr>
          <tr><td>76 USDT</td><td>Issued</td><td>2025/04/10</td><td>25517603</td></tr>
          <tr><td>76 USDT</td><td>Issued</td><td>2025/04/10</td><td>25517603</td></tr>
          <tr><td>76 USDT</td><td>Issued</td><td>2025/04/10</td><td>25517603</td></tr>
          <tr><td>76 USDT</td><td>Issued</td><td>2025/04/10</td><td>25517603</td></tr>
        </tbody>
      </table>
      </div>
      <div class="table-pagination">
        <div class="page-dot active">1</div>
        <div class="page-dot">2</div>
        <div class="page-dot">3</div>
        <div class="page-dot">4</div>
      </div>
    </section>

    <!-- Gameplay Introduction Section -->
    <section class="gameplay">
      <div class="section-header">
        <div class="section-title-wrap">
          <h2 class="section-title">Gameplay Introduction</h2>
        </div>
      </div>
      <div class="gameplay-cards">
        <div class="gameplay-card">
          <div class="gameplay-icon">
            <img src="https://www.figma.com/api/mcp/asset/6b7d2b59-2c9d-43bc-8144-a09d74bf77da" alt="Invite & Share" style="width: 56px; height: 56px;">
          </div>
          <div class="gameplay-title">Invite & Share</div>
          <div class="gameplay-desc">Share your unique referral link to invite friends</div>
        </div>
        <div class="gameplay-card">
          <div class="gameplay-icon">
            <img src="https://www.figma.com/api/mcp/asset/0bc5f390-fa42-40a9-9e88-e6656b669462" alt="Copy Trading" style="width: 56px; height: 56px;">
          </div>
          <div class="gameplay-title">Copy Trading</div>
          <div class="gameplay-desc">Grow your wealth by following top traders</div>
        </div>
        <div class="gameplay-card">
          <div class="gameplay-icon">
            <img src="https://www.figma.com/api/mcp/asset/cce9d1f8-4240-4aa5-b914-d54a35304baa" alt="Simple Earn" style="width: 56px; height: 56px;">
          </div>
          <div class="gameplay-title">Simple Earn</div>
          <div class="gameplay-desc">Get high and stable returns by lending digital currency</div>
        </div>
      </div>
    </section>

    <!-- Activity Rules Section -->
    <section class="activity-rules">
      <div class="section-header">
        <div class="section-title-wrap">
          <h2 class="section-title">Activity Rules</h2>
        </div>
      </div>
      <div class="rules-content">
        <p>1. Share and invite 2 friends. Once both friends complete the deposit and trading tasks, you will receive a bonus of 20 USDT, each friend will receive a bonus of 5 USDT.</p>
        <p>2. Deposit task: Each invited friend must achieve a net deposit of 100 USDT and maintain that amount for 3 days.</p>
        <p>3. Trading task: After registering and logging into the app, friends must reach a trading volume of 100 USDT in spot trading or 500 USDT in futures trading.</p>
        <p>4. Valid deposit methods include on-chain deposits, fiat deposits, purchasing cryptocurrency via bank card, P2P cryptocurrency purchases, and third-party payments. GateCode and gifts do not count as valid deposits.</p>
      </div>
    </section>
    </div><!-- End Token Crew Content -->
```

### 区块间距规范

#### ≥768px 桌面间距

| 区块 | 距上一区块 |
|------|-----------|
| Header → TabBar | 64px (padding-top) |
| TabBar → Hero | 90px |
| Hero → My Rewards | 160px |
| My Rewards → Reward Progress | 160px |
| Reward Progress → Withdrawal Record | 160px |
| Withdrawal Record → Gameplay | 160px |
| Gameplay → Activity Rules | 160px |
| Activity Rules → Footer | 100px |

#### ≤767px H5 间距

| 区块 | 距上一区块 |
|------|-----------|
| H5TopBar → Hero | 0（TopBar 内嵌在 tab-content 顶部） |
| Hero → My Rewards | 32px |
| My Rewards → Reward Progress | 48px |
| Reward Progress → Withdrawal Record | 48px |
| Withdrawal Record → Gameplay | 48px |
| Gameplay → Activity Rules | 48px |
| Activity Rules → Footer | 48px |

### 响应式断点规范

> 基于 Figma 设计稿：1024px (node 545-4296) 和 768px (node 549-5226)

| 断点 | 内容区宽度 | 布局调整 |
|------|-----------|----------|
| **1920px** | 1200px | 默认布局，参考基准 |
| **1440px** | 1200px (padding: 0 40px) | 保持居中 |
| **1280px** | 1100px | 略微收窄，Hero gap: 24px |
| **1024px** | 976px | **卡片 2 列 → 1 列**，Header nav 隐藏，Tab 保持横向 |
| **768px** | 728px | **Hero 垂直布局**，Tab 保持横向，卡片单列，Footer 堆叠 |
| **≤767px** | 100% - 40px | **H5 布局**（Figma 606-28418）：隐藏 Header/TabBar，显示 H5TopBar；My Rewards 单卡合并；Reward Progress 蓝色描边卡 + Invite now CTA；Gameplay 单列横向卡片；Section gap 48px |

#### 1024px 断点详细调整

| 组件 | 1920px 基准 | 1024px 调整 |
|------|------------|-------------|
| **内容区** | 1200px | 976px (padding: 0 24px) |
| **Hero 区域** | 左右布局 (flex, gap: 40px) | 保持左右布局，缩减间距至 24px |
| **Hero 右侧视觉** | 402px 宽度 | 保持 388px，适当缩放 |
| **My Rewards 卡片** | 2 列 (flex) | 保持 2 列，宽度自适应 |
| **Reward Progress 卡片** | 2×2 网格 | **单列** `grid-template-columns:1fr` |
| **Withdrawal Table** | 完整 4 列 | 保持 4 列（`td` 为 16px / 500） |
| **Gameplay 卡片** | 3 列 flex | 仍为 **3 列**，`gap:16px`、`padding:32px 24px` |
| **My Rewards** | 2 列 flex | **仍为 2 列**（仅 `gap:16px`） |
| **区块间距** | 160px | **保持 160px**（与 1920 一致） |
| **Header** | 完整导航 | **隐藏导航项**，保留 Logo 和登录/注册 |
| **Footer** | 多列布局 | **缩减列数**，保持核心链接 |

#### 768px 断点详细调整

| 组件 | 1920px 基准 | 768px 调整 |
|------|------------|------------|
| **内容区** | 1200px | 728px (padding: 0 20px) |
| **Hero 区域** | 左右布局 | **垂直布局**：标题居中、视觉居中、按钮全宽 |
| **Hero 主标题** | 48px | **调整为 40px** 或保持并换行 |
| **Hero 副标题** | 40px | **调整为 32px** |
| **Hero 按钮** | 自适应宽度 | **全宽 468px**，居中显示 |
| **My Rewards 卡片** | 2 列 | **仍为 2 列**（HTML 未在 768 改为单列） |
| **Reward Progress 卡片** | 2×2（1024 起已为 1 列） | **保持单列** |
| **Gameplay 卡片** | 3 列 flex | **仍为 3 列**（与 Earn Voucher 四列玩法不同） |
| **Withdrawal Table** | 完整 4 列 | 仍为表格布局；窄屏可依赖横向滚动 |
| **区块间距** | 160px | **120px**（`.my-rewards`、`.reward-progress`、`.withdrawal-record`、`.gameplay`、`.activity-rules` 的 `margin-bottom`） |
| **Tab Bar** | 横向 3 个 | 保持横向，但**副标题可能隐藏或字号缩小** |
| **Header** | 完整导航 | **汉堡菜单**，仅显示 Logo 和图标 |
| **Footer** | 多列 | **单列堆叠**，折叠式菜单 |

#### ≤767px H5 断点详细调整（Figma 606-28418）

> 该断点与桌面布局完全不同，使用 H5 专属组件替代桌面组件。

| 组件 | 桌面基准 | ≤767px H5 调整 |
|------|---------|----------------|
| **Header + TabBar** | 完整 Header + 3 Tab 胶囊 | **隐藏**（`display: none !important`），由 H5TopBar 替代 |
| **H5TopBar** | 不存在 | **显示**：`.ev-h5-status-bar` + `.ev-h5-tab-nav` |
| **Hero 布局** | 左右并列 | **垂直居中**：`display: contents` → 文字(order:1) → 视觉(order:2) → 按钮(order:3) |
| **Hero 主标题** | 48px | **40px** / 600 / line-height: 0.875 / center |
| **Hero 副标题** | 40px | **20px** / 500 / line-height: 1.75 / center |
| **Hero 视觉** | 402×236px | **100% × 240px**，`transform: scale(0.55)` |
| **Hero 按钮** | 自适应 | **全宽**（max-width: 337px），48px 高 |
| **My Rewards** | 双卡 `.rewards-cards` | **隐藏双卡**，显示 `.tc-h5-my-rewards` 单合并卡 |
| **Reward Progress** | 渐变描边 + Claim 按钮 | **蓝色实线描边**（1px solid #0055FF），隐藏 `.claim-btn`，显示 `.tc-h5-card-cta` "Invite now" |
| **Progress Avatar** | 40px | **32px** |
| **Progress UID** | 20px / 500 | **14px** / 500 / rgba(255,255,255,0.6) |
| **Step Indicator** | 24px | **18px** |
| **Progress Card Content** | `padding: 0` | `padding: 0 0 0 8px`（整体右移 8px，使左右间距视觉均衡） |
| **Step Info** | `align-items: center` | `align-items: center; justify-self: center`（居中对齐，icons 和文字水平居中） |
| **Step Amount** | 14px | **13px** / 600 / rgba(255,255,255,0.8) |
| **Step Label** | 14px | **12px** / 400 / rgba(255,255,255,0.6) |
| **Gameplay** | 3 列 flex | **单列 grid**：`grid-template-columns: 1fr 48px`（文字左 + 图标右），描边 `border: 1px solid rgba(255,255,255,0.08)` |
| **Activity Rules** | 14px | 14px / 400 / rgba(255,255,255,0.6) / line-height: 22px |
| **Section 间距** | 160px | **48px** |
| **Pagination** | 显示 | **隐藏**（`display: none !important`） |
| **Footer** | 多列 | 单列折叠菜单 |

**≤767px Hero 布局 ASCII：**
```
┌───────────────────────────┐
│   2,400,000 DOGE          │ ← 40px / center
│   Earn Up to per Friend   │ ← 20px / center
│                           │
│ ┌──┐:┌──┐:┌──┐:┌──┐      │ ← countdown 居中
│ │04│ │23│ │00│ │00│      │
│ └──┘ └──┘ └──┘ └──┘      │
│                           │
│  ┌────────────────────┐   │
│  │  [3D 信封视觉 240h] │   │ ← scale(0.55)
│  └────────────────────┘   │
│                           │
│ ┌───────────────────────┐ │
│ │    Invite Friends     │ │ ← 全宽 CTA, 48px 高
│ └───────────────────────┘ │
└───────────────────────────┘
```

**≤767px My Rewards H5 合并卡 ASCII：**
```
┌──────────────────────────────┐
│ My Rewards                   │ ← 24px section-title
│ ┌──────────────────────────┐ │
│ │ 3.315 / 9.29 USDT   [>] │ │ ← 22px / rgba(255,255,255,0.53)
│ │ ████░░░░░░░░░░░░░░░░░░░ │ │ ← 6px 进度条，蓝+灰
│ │ The reward progress...   │ │ ← 12px 描述
│ └──────────────────────────┘ │
└──────────────────────────────┘
```

**≤767px Reward Progress 卡片 ASCII：**
```
┌─── 1px solid #0055FF ───────┐
│ [avatar 32px] UID:25517603  │ ← 14px / rgba(255,255,255,0.6)
│                              │
│  ●───────●───────●          │ ← 18px indicators
│ 1.13   1.13   1.13 USDT    │ ← 13px / rgba(255,255,255,0.8)
│ Verify Deposit  Trade       │ ← 12px / rgba(255,255,255,0.6)
│                              │
│ ┌──────────────────────────┐│
│ │      Invite now          ││ ← #0055FF, 32px 高, rounded-56px
│ └──────────────────────────┘│
└──────────────────────────────┘
```

**≤767px Gameplay 卡片 ASCII：**
```
┌─ border: 1px solid rgba(255,255,255,0.08) ─┐
│                                              │
│  Invite & Share              [icon 48x48]   │ ← 14px/500 title
│  Share your unique...                       │ ← 12px/400 desc
│                                              │
└──────────────────────────────────────────────┘
```

#### 组件自适应细节

**Hero Section 自适应：**
```
1920px:  [左: 标题+倒计时+按钮] ─ [右: 3D信封视觉]
1024px:  [左: 标题+倒计时+按钮] ─ [右: 3D信封视觉] (间距缩小)
768px:   [          标题居中           ]
         [        副标题居中          ]
         [        倒计时居中          ]
         [       3D信封视觉居中        ]
         [       按钮全宽居中          ]
≤767px:  同 768px 垂直居中，visual scale(0.55)，button max-width 337px
```

**Reward Progress 卡片自适应：**
```
1920px:  [Card1] [Card2]    [Card3] [Card4]  (2×2 网格, 渐变描边)
1024px:  [Card1]
         [Card2]                            (单列, 渐变描边)
         [Card3]
         [Card4]
768px:   同 1024px（单列, 渐变描边）
≤767px:  [Card1 + Invite now CTA]
         [Card2 + Invite now CTA]          (单列, 蓝色实线描边, 无 Claim 按钮)
```

**表格自适应策略：**
- **1024px / 768px**: 表格外层 `.mobile-table-scroll` 横向滚动，表 `min-width: 560px`
- **≤767px**: 与 `--rh-page-padding` 联动，滚动区与页面左右边距对齐

**Footer 自适应：**
```
1920px:  [Logo+下载] [About] [Products] [Services] [Learn]  (5列)
1024px:  [Logo+下载] [About] [Products] [Services+Learn]    (4列)
768px:   [Logo+下载]                                         (折叠菜单)
≤767px:  同 768px 折叠菜单
```

---

## 区块 5: 模块专属组件

> **共用组件**（Header、Tab 胶囊、`.invite-btn`、`.countdown`、`.withdrawal-table`、`.claim-btn`、默认三列 `.gameplay-cards`、Footer、H5TopBar、H5TabSheet 等）见 [_base.md](./_base.md) **区块 5**。本节仅描述 **Token Crew 独有** 的 Hero、信封区与 Liquid Glass。

### RewardProgress / Withdrawal / Gameplay / Rules（本 Tab 中的 DOM）

- **Reward Progress**：`<section class="reward-progress">` → `.progress-cards` 为 `repeat(2,1fr)` + `gap:24px`；**≤1024px** 为单列（`grid-template-columns:1fr`）。单卡结构见 `_base.md` **RewardProgressCard**；HTML 内共 4 张示例卡 + `.pagination`。
  - **≤767px**：蓝色描边（`border: 1px solid #0055FF`），隐藏桌面 `.claim-btn`，每张卡底部显示 `.tc-h5-card-cta` ("Invite now")，隐藏 `.pagination`。
- **Withdrawal Record**：`<section class="withdrawal-record">` → `.mobile-table-scroll` → `.withdrawal-table` + `.table-pagination`（窄屏滚动见 [_base.md](./_base.md) **WithdrawalTable**）。
- **Gameplay**：`<section class="gameplay">` → `.gameplay-cards` 为 **3 列 flex**；图标尺寸 **56×56**（HTML 内联）；**1024px** 仅缩小 `gap` 与 `padding`，**768px 不强制改为单列**。
  - **≤767px**：单列堆叠，卡片用 CSS Grid（`1fr 48px`）实现横向布局（文字左、图标右），带描边圆角（`border-radius: 20px`）。
- **Activity Rules**：`<section class="activity-rules">` + `.rules-content`。

### H5 专属组件（≤767px）

#### tc-h5-my-rewards 合并奖励卡

> 仅在 ≤767px 显示，替代桌面 `.rewards-cards` 双卡布局。

| 属性 | 值 |
|------|-----|
| 容器 | `background: rgba(255,255,255,0.06)`，`border-radius: 16px`，`padding: 16px` |
| 金额行 `.tc-h5-rewards-value` | `22px / 500 / #ffffff`（unlocked），`rgba(255,255,255,0.53)`（locked + sep + unit） |
| 单位 `.tc-h5-val-unit` | `12px / 500 / rgba(255,255,255,0.53)` |
| 箭头 `.tc-h5-val-arrow` | `16×16px`，`object-fit: contain` |
| 进度条 `.tc-h5-rewards-bar` | `6px` 高，`border-radius: 999px`，`background: rgba(255,255,255,0.1)` |
| 蓝色部分 `.tc-h5-bar-blue` | `background: #0055FF`，宽度随数据动态设置 |
| 描述 `.tc-h5-rewards-desc` | `12px / 400 / rgba(252,253,255,0.6)` |

#### tc-h5-card-cta 卡内 CTA 按钮

> 每张 Reward Progress 卡片底部，仅在 ≤767px 显示。

| 属性 | 值 |
|------|-----|
| 尺寸 | `width: 100%`，`height: 32px` |
| 背景 | `#0055FF` |
| 文字 | `12px / 500 / #FFFFFF`，"Invite now" |
| 圆角 | `border-radius: 56px` |
| padding | `7px 16px` |

### TokenCrewHero 奖励总览

```
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│  2,400,000 DOGE                              ┌─────────────────────┐  │
│  Earn Up to per Friend Invited               │  Total reward amount│  │
│                                              │      10,000         │  │
│  ┌────┐ : ┌────┐ : ┌────┐ : ┌────┐          │       USDT          │  │
│  │ 4D │   │ 23 │   │ 00 │   │ 00 │          │  [3D 信封视觉]       │  │
│  └────┘   └────┘   └────┘   └────┘          └─────────────────────┘  │
│                                                                        │
│  ┌─────────────────────┐                                              │
│  │     Invite Now      │                                              │
│  └─────────────────────┘                                              │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

| 属性 | Web 值 | 说明 |
|------|--------|------|
| 区块高度 | 300px | |
| 左侧内容宽度 | flex: 1 | |
| 右侧视觉宽度 | 402px | 3D 信封装饰区域 |
| 间距 | 40px | 左右区域间距 |
| 主标题 | 48px / 600 Semibold / #FFFFFF / line-height: normal | "2,400,000 DOGE" |
| 副标题 | 40px / 600 Semibold / #FFFFFF / line-height: normal | "Earn Up to per Friend Invited" |
| 标题间距 | 4px | 主副标题间距 |
| 倒计时距标题 | 20px (margin-top) | |
| 按钮距文字区 | 46px | |

### 右侧 3D 信封视觉

| 属性 | 值 |
|------|-----|
| 容器宽度 | 402px |
| 容器高度 | 236px（`.hero-visual`） |
| 信封主体位置 | left: 69px, top: 15px |
| 信封主体尺寸 | 279px × 207px |
| 信封卡片背景 | linear-gradient(180deg, #0055FF 18.03%, #408DFF 81.31%) |
| 信封卡片阴影 | 0px 0px 184.199px rgba(161, 172, 148, 0.3) |
| 信封卡片尺寸 | 216px × 197px |
| 标题文字 | 11.67px / 400 Regular / rgba(255, 255, 255, 0.8) / font-family: Inter |
| 金额文字 | 48.45px / 500 Medium / #FFFFFF / opacity 0.9 / line-height: 1.2 |
| 单位文字 | 23.91px / 500 Medium / #FFFFFF |
| 右上角 USDT 币容器 `.hero-coin-right` | 86px × 86px, left: 316px, top: 0，`float-right` 动画 |
| 左下角美元币容器 `.hero-coin-left` | 86px × 86px, left: 0, top: 150px，`float-left` 动画，z-index: 10 |
| 发光球 `.hero-glow-ball` | 63px × 63px, left: 285px, top: 46px |

### Liquid Glass 凹透镜效果

> 装饰圆使用 Apple WWDC 2025 风格的液态玻璃效果，实现物理折射。页面内可选 **Glass Tuner** 面板用于调参；**静态 CSS** 中 `.hero-coin-left-bg` / `.hero-coin-right-bg` 的 `.liquidGlass-stroke` 为 **135deg + 双色**（`--stroke-color1/2`），与文档下方通用示例（130° 三色）可能略有差异，**以 HTML 为准**。

#### 效果层级结构

```html
<div class="hero-coin-right-bg">
  <div class="liquidGlass-effect"></div>      <!-- z-index: 0, 折射层 -->
  <div class="liquidGlass-tint"></div>        <!-- z-index: 1, 着色层 -->
  <div class="liquidGlass-shine"></div>       <!-- z-index: 2, 高光层 -->
  <div class="liquidGlass-iridescence"></div> <!-- z-index: 6, 虹彩色散 -->
  <div class="liquidGlass-noise"></div>       <!-- z-index: 4, 磨砂噪点 -->
  <div class="liquidGlass-stroke"></div>      <!-- z-index: 5, 渐变描边 -->
</div>
```

#### SVG 凹透镜滤镜

```html
<svg width="0" height="0" style="position: absolute;">
  <defs>
    <filter id="glass-distortion" x="-20%" y="-20%" width="140%" height="140%">
      <feImage id="lensMapImage" preserveAspectRatio="none" result="lensMap"/>
      <feDisplacementMap id="glassDisplacement" in="SourceGraphic" in2="lensMap" 
        scale="27" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
  </defs>
</svg>
```

#### 凹透镜位移贴图生成（JavaScript）

```javascript
function generateConcaveLensMap() {
  const size = 200;
  const center = size / 2;
  const radius = size / 2;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const imageData = ctx.createImageData(size, size);
  const data = imageData.data;
  
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx = x - center;
      const dy = y - center;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const normalizedDist = dist / radius;
      let r = 128, g = 128;
      
      if (normalizedDist < 1) {
        const strength = Math.pow(normalizedDist, 1.5) * 0.8;
        if (dist > 0) {
          const nx = dx / dist;
          const ny = dy / dist;
          r = 128 + nx * strength * 127;
          g = 128 + ny * strength * 127;
        }
      }
      
      const i = (y * size + x) * 4;
      data[i] = Math.max(0, Math.min(255, r));
      data[i + 1] = Math.max(0, Math.min(255, g));
      data[i + 2] = 128;
      data[i + 3] = 255;
    }
  }
  
  ctx.putImageData(imageData, 0, 0);
  const dataUrl = canvas.toDataURL('image/png');
  document.getElementById('lensMapImage').setAttribute('href', dataUrl);
}
```

#### Liquid Glass 参数

| 参数 | 默认值 | 说明 |
|------|--------|------|
| displacement | 27 | 边缘位移强度（凹透镜缩小） |
| edgeStart | 64% | 边缘效果开始位置 |
| edgeBlur | 0.3 | 边缘模糊强度 |
| centerBlur | 1.4px | 中心模糊 |
| dispersion | 0.25 | 色散强度 |
| strokeWidth | 1px | 渐变描边宽度 |
| strokeAngle | 130° | 渐变角度 |
| strokeColor1 | rgba(255,255,255,1) | 描边颜色1 |
| strokeColor2 | rgba(16,21,25,0) | 描边颜色2 |
| strokeColor3 | rgba(212,202,222,0.7) | 描边颜色3 |
| iridescenceEnabled | true | 虹彩色散开关 |
| iridescenceOpacity | 0.4 | 虹彩透明度 |
| iridescenceWidth | 15px | 虹彩宽度 |
| noiseEnabled | false | 磨砂噪点开关 |
| noiseOpacity | 0.08 | 噪点透明度 |
| noiseSize | 2px | 噪点大小 |

#### 渐变描边 CSS

```css
.liquidGlass-stroke {
  position: absolute;
  inset: 0;
  z-index: 5;
  border-radius: 50%;
  --stroke-width: 1px;
  background: linear-gradient(130deg, 
    rgba(255,255,255,1), 
    rgba(16,21,25,0), 
    rgba(212,202,222,0.7)
  );
  -webkit-mask: 
    linear-gradient(#fff 0 0) content-box, 
    linear-gradient(#fff 0 0);
  mask-composite: exclude;
  padding: var(--stroke-width);
}
```

#### 虹彩色散 CSS

```css
.liquidGlass-iridescence {
  position: absolute;
  inset: -2px;
  z-index: 6;
  border-radius: 50%;
  background: conic-gradient(from 0deg, 
    rgba(255,107,107,0.8), 
    rgba(78,205,196,0.8),
    rgba(168,85,247,0.8), 
    rgba(255,107,107,0.8)
  );
  -webkit-mask: radial-gradient(circle, transparent 85%, black 88%, black 100%);
  mask: radial-gradient(circle, transparent 85%, black 88%, black 100%);
}
```

---

## 区块 6: 皮肤机制

### 皮肤加载顺序

```
_base.md → token-crew.md → skins/<skin-name>.md
```

### 皮肤可覆盖项

| 可覆盖 | 说明 |
|--------|------|
| TokenCrewHero 背景 | 节日主题背景图/渐变 |
| TokenCrewHero 装饰元素 | 节日图标、动效 |
| 右侧 3D 视觉 | 节日主题视觉 |
| 强调色 | 节日主题色 |
| 页面背景 | 节日氛围背景 |

### 皮肤不可覆盖项

| 不可覆盖 | 说明 |
|----------|------|
| 布局结构 | 组件排列顺序固定 |
| 交互逻辑 | 按钮行为、跳转逻辑 |
| 字阶规范 | 字号、字重保持一致 |
| 共享组件 | TabBar、RewardStatsCard 等 |

---

## 区块 7: 图片资源

> 详细资源清单见 [ASSETS.md](../../../../../../../output/invited-friends/assets/ASSETS.md)

### 关键图片资源

| 资源 | 用途 | Figma Node |
|------|------|------------|
| 主视觉 | Hero 右侧 3D 信封 | 498:1527 |
| 大背景 | 页面背景圆形装饰 | 498:1528 |
| Unlocked 图标 | My Rewards 解锁状态 | 492:21926 |
| Locked 图标 | My Rewards 锁定状态 | 492:21956 |
| Active 指示器 | 进度条进行中状态（蓝色圆圈带锁） | 498:1562 |
| Pending 指示器 | 进度条待完成状态（灰色圆圈带锁） | 498:1572 |
| Completed 指示器 | 进度条已完成状态（灰色圆圈带勾） | 498:1585 |
| 虚线-默认 | 步骤间连接线（未激活） | 498:1548 |
| 虚线-激活 | 步骤间连接线（已激活） | 498:1597 |
| Invite & Share | Gameplay 图标 | 492:22677 |
| Copy Trading | Gameplay 图标 | 492:22686 |
| Simple Earn | Gameplay 图标 | 506:10769 |

---

## 变更日志

| 日期 | 变更 | 来源 |
|------|------|------|
| 2026-03-29 | ≤767px 微调：Progress Card Content 右移 8px（`padding-left: 8px`）使步骤指示器居中；step-info 添加 `justify-self: center` 确保与 icon 对齐；Hero 信封主体背景图替换为 Figma 674-10346 新版设计（蓝色信件+磨砂玻璃信封体+绿色发光球） | HTML 走查 + Figma |
| 2026-03-28 | ≤767px H5 布局 1:1 还原（Figma 606-28418）：Hero display:contents 重排、My Rewards 合并单卡（tc-h5-my-rewards）、Reward Progress 蓝色描边+Invite now CTA（tc-h5-card-cta）、Gameplay 单列 Grid 横向卡片、Section gap 48px；响应式断点表新增≤767px 行；区块 5 新增 H5 专属组件文档 | Figma 606-28418 |
| 2026-03-28 | 对齐最新 HTML：Tab 面板顶部新增 H5TopBar（≤767px Status Bar + Tab Nav）；区块 5 引用补充 H5TopBar/H5TabSheet | HTML |
| 2026-03-27 | 与最新 `token-crew.html` 对齐：提现表增加 `.mobile-table-scroll`、Hero 左右币容器尺寸/位置、Liquid Glass 静态 CSS 与 Tuner 差异说明、表格窄屏策略 | HTML |
| 2026-03-26 | 与 `token-crew.html` 对齐：集成页元信息、区块 5 收敛为 TC 专属并引用 `_base`；修正响应式（1024 进度卡单列、768 My Rewards 仍为 2 列、Gameplay 仍为 3 列）；SVG `feDisplacementMap` 示例 scale=27 | HTML |
| 2026-03-23 | 更新 Liquid Glass 默认参数（displacement: 27, edgeStart: 64%, centerBlur: 1.4px, strokeAngle: 130°）、更新渐变描边颜色、更新卡片边框为统一渐变 | HTML 实现同步 |
| 2026-03-23 | 添加 Liquid Glass 凹透镜效果完整规范（SVG滤镜、Canvas位移贴图、渐变描边、虹彩色散、磨砂噪点） | HTML 实现同步 |
| 2026-03-23 | 更新 Header/Footer 为黑色模式、更新步骤指示器为图片、添加渐变描边、更新所有组件规范 | HTML 实现同步 |
| 2026-03-23 | 添加图片资源清单、更新页面结构为 HTML 格式、添加响应式断点 | 用户反馈 |
| 2026-03-23 | 根据 Figma 设计稿更新完整规范 | Figma 设计稿 |
| 2026-03-23 | 初始创建 | 需求分析 |
