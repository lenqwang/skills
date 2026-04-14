# Earn Voucher 助力领券

> 所属域：[Exchange](../../domain.md) > Business > [Invite Friends](./_base.md) > Earn Voucher
> 继承：[_base.md](./_base.md) 共享规范

---

## 区块 1: 元信息

```yaml
name: earn-voucher
description: 助力领券模块 — 邀请好友助力获得优惠券
figma: https://www.figma.com/design/VMTfLK0ozaGCzynyMho3HT?node-id=492-18520
coverage: Web
theme: dark
inherits: _base.md
integrated_html: /output/invited-friends/token-crew.html
html_output: /output/invited-friends/earn-voucher.html
```

---

## 区块 2: 模块画像

- **核心玩法**：邀请 2 位好友完成任务，获得 20 USDT 奖励
- **奖励类型**：USDT 优惠券（邀请人 20 USDT，被邀请人各 5 USDT）
- **特殊能力**：无（与基础风格一致）

| 维度 | 本模块 | 基础规范 | 说明 |
|------|--------|---------|------|
| 视觉重点 | 奖励金额 + 三币堆叠 | — | 突出 20 USDT 奖励 |
| 装饰程度 | 中等 | 克制 | 右侧有 3 个重叠的币图片（Figma 导出） |
| 页面框架 | 继承 | 集成 Tab 页 | 与 `token-crew.html` 中顶栏、Tab、主内容区一致 |

---

## 区块 3: Token 覆盖

> 与 `_base.md` 的差异项。

```css
:root {
  /* 继承 _base.md 全部 Token */
  
  /* Earn Voucher Hero 渐变 */
  --ev-card-gradient: linear-gradient(180deg, #0055FF 18.03%, #408DFF 81.31%);
  --ev-card-shadow: 0px 0px 184.199px rgba(161, 172, 148, 0.3);
  
  /* 渐变描边（与 Token Crew 一致） */
  --card-border-gradient: linear-gradient(180deg, #0055FF 0%, #303236 100%);
}
```

---

## 区块 4: 页面结构

### Earn Voucher 完整布局（HTML 结构）

```html
    <div id="tab-content-earn-voucher" class="tab-content">
    <!-- H5 顶栏：Status Bar + TabsV5（仅 ≤767px 展示；≥768px 隐藏） -->
    <div class="ev-h5-status-bar" aria-hidden="true">
      <div class="ev-h5-status-inner">
        <div class="ev-h5-time">9:41</div>
        <div class="ev-h5-dynamic-spacer"></div>
        <div class="ev-h5-status-icons">
          <img src="https://www.figma.com/api/mcp/asset/48835afc-9b2a-4a4d-ae74-2d3e8573705e" width="19" height="12" alt="">
          <img src="https://www.figma.com/api/mcp/asset/8252f291-0b13-42e7-aac6-18886773e04f" width="17" height="12" alt="">
          <img class="ev-h5-battery" src="https://www.figma.com/api/mcp/asset/8a9e607d-a894-4dc0-b297-39cf356f7bc9" width="27" height="13" alt="">
        </div>
      </div>
    </div>
    <div class="ev-h5-tab-nav">
      <div class="ev-h5-tab-nav-inner">
        <div class="ev-h5-tab-nav-title-wrap">
          <span class="ev-h5-tab-nav-label">Earn Voucher</span>
          <img class="ev-h5-tab-nav-chevron" src="https://www.figma.com/api/mcp/asset/72b30bd6-03c9-44e0-a490-1201554872e1" width="16" height="16" alt="" aria-hidden="true">
        </div>
        <button type="button" class="ev-h5-tab-nav-close" aria-label="Close">
          <img src="https://www.figma.com/api/mcp/asset/fca53846-944e-48c7-99a2-367b12c4b69a" width="18" height="18" alt="">
        </button>
      </div>
    </div>
    <!-- Earn Voucher Hero Section -->
    <section class="hero-section ev-hero">
      <div class="hero-left">
        <div class="hero-text">
          <h1 class="hero-title">
            <span class="ev-hero-title-desktop">Invite 2 Friends<br>to Get Up to 20 USDT</span>
            <span class="ev-hero-title-h5">
              <span class="ev-hero-line1">Invite 2 friends to claim</span>
              <span class="ev-hero-line2">20 USDT</span>
            </span>
          </h1>
          <h2 class="hero-subtitle">
            <span class="ev-hero-sub-desktop">Each friend gets up to 5 USDT</span>
            <span class="ev-hero-sub-h5"><span class="ev-hero-sub-h5-pref">Each friend also earns </span><span class="ev-hero-sub-h5-amt">5 USDT</span></span>
          </h2>
        </div>
        <button type="button" class="invite-btn ev-hero-cta">Invite Friends to Boost</button>
      </div>
      <div class="hero-visual">
        <div class="hero-visual-container">
          <!-- 三个重叠的币 - 使用设计稿图片 -->
          <div class="hero-coins-stack">
            <!-- 底层：左右两币合并背景图 (image 334569) -->
            <div class="coin-bg-img">
              <img src="assets/images/ev-coin-bg.png" alt="coins background">
            </div>
            <!-- 上层：中间 Gate 币，叠在背景图上 (image 334565) -->
            <div class="coin-gate-img">
              <img src="assets/images/ev-coin-gate.png" alt="Gate coin">
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Earn Voucher Reward Progress Section（桌面：双卡栅格；≤767px：Figma 复合卡 + 顶栏/横幅/底栏） -->
    <section class="reward-progress">
      <div class="section-header ev-rp-header-desktop">
        <div class="section-title-wrap" style="width: 100%; text-align: center;">
          <h2 class="section-title">Reward Progress</h2>
          <p class="section-desc" style="text-align: center;">Invite 2 friends to complete tasks and earn rewards</p>
        </div>
      </div>
      <div class="ev-rp-stack">
        <div class="ev-rp-mobile-top">
          <span class="ev-rp-mobile-title">Reward Progress</span>
          <button type="button" class="ev-rp-refresh-btn" aria-label="Refresh">
            <img class="ev-rp-refresh-icon" src="https://www.figma.com/api/mcp/asset/2f898037-d4ed-4844-947d-7ebd01ed1dd7" width="26" height="26" alt="" aria-hidden="true">
          </button>
        </div>
        <div class="ev-rp-mobile-banner">
          <span class="ev-rp-banner-icon" aria-hidden="true">
            <img src="https://www.figma.com/api/mcp/asset/2c99d1ba-61db-4735-93a8-97f123fee5c6" width="7" height="10" alt="">
          </span>
          <span class="ev-rp-banner-text">Invite 2 friends to claim rewards</span>
          <div class="ev-rp-banner-countdown">
            <span class="ev-rp-bc-unit">3D</span><span class="ev-rp-bc-sep">:</span><span class="ev-rp-bc-unit">23</span><span class="ev-rp-bc-sep">:</span><span class="ev-rp-bc-unit">00</span><span class="ev-rp-bc-sep">:</span><span class="ev-rp-bc-unit">00</span>
          </div>
        </div>
        <div class="progress-cards ev-progress-cards">
        <!-- Card 1: Boost pending -->
        <div class="progress-card ev-card">
          <div class="ev-card-header">
            <div class="ev-user-info">
              <div class="ev-avatar">
                <img src="https://www.figma.com/api/mcp/asset/c970d6c4-5dbc-459d-8cf1-4c1418d6e915" alt="avatar">
              </div>
              <div class="ev-user-text">
                <div class="ev-user-title">Boost pending</div>
                <div class="ev-user-name ev-user-name--h5">HappyBrother</div>
              </div>
            </div>
          </div>
          <div class="ev-card-content">
            <div class="ev-steps">
              <div class="ev-step completed">
                <div class="ev-step-row ev-step-row-wide">
                  <div class="ev-step-icon">
                    <img src="https://www.figma.com/api/mcp/asset/c3b2cc84-195d-44bc-b0c7-95e67c0cf9c0" alt="checked">
                  </div>
                  <div class="ev-step-label">Sign Up</div>
                </div>
                <div class="ev-step-value">In 5 Days</div>
              </div>
              <div class="ev-step-divider"></div>
              <div class="ev-step pending">
                <div class="ev-step-row">
                  <div class="ev-step-icon">
                    <img src="https://www.figma.com/api/mcp/asset/91ca1283-339f-46ad-85c8-cf766f3779f9" alt="unchecked">
                  </div>
                  <div class="ev-step-label">Deposit</div>
                </div>
                <div class="ev-step-value">≥ 100 USDT</div>
              </div>
              <div class="ev-step-divider"></div>
              <div class="ev-step pending">
                <div class="ev-step-row">
                  <div class="ev-step-icon">
                    <img src="https://www.figma.com/api/mcp/asset/91ca1283-339f-46ad-85c8-cf766f3779f9" alt="unchecked">
                  </div>
                  <div class="ev-step-label">Trade</div>
                  <img src="https://www.figma.com/api/mcp/asset/3f6de015-800e-4c12-8770-9a9fc102943b" alt="info" class="ev-step-info-icon">
                </div>
                <div class="ev-step-value">≥ 100 USDT</div>
              </div>
            </div>
          </div>
          <div class="ev-card-progress">
            <div class="ev-progress-track">
              <div class="ev-progress-blue"></div>
              <div class="ev-progress-gray"></div>
            </div>
            <span class="ev-progress-fraction" aria-hidden="true"><span class="ev-progress-fraction-num">1</span><span class="ev-progress-fraction-den">/3</span></span>
          </div>
        </div>
        <!-- Card 2：桌面=邀请助力；≤767px 与设计稿一致=第二行好友 Boost pending -->
        <div class="ev-rp-row-divider" aria-hidden="true"></div>
        <div class="progress-card ev-card ev-invite-card">
          <div class="ev-card-header">
            <div class="ev-user-info">
              <div class="ev-avatar ev-add-avatar ev-invite-avatar-desktop">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 4V16M4 10H16" stroke="white" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </div>
              <div class="ev-avatar ev-boost-avatar">
                <img src="https://www.figma.com/api/mcp/asset/5d7f1d59-047f-4aac-a7fb-6252631628de" alt="avatar">
              </div>
              <div class="ev-user-text">
                <div class="ev-user-title ev-invite-title">Invite Friends to Boost</div>
                <div class="ev-user-title ev-boost-title">Boost pending</div>
                <div class="ev-user-name ev-user-name--h5 ev-user-name--invite-h5">HappyBrother</div>
              </div>
            </div>
          </div>
          <div class="ev-card-content ev-invite-steps-desktop">
            <div class="ev-steps">
              <div class="ev-step pending">
                <div class="ev-step-row">
                  <div class="ev-step-icon">
                    <img src="https://www.figma.com/api/mcp/asset/91ca1283-339f-46ad-85c8-cf766f3779f9" alt="unchecked">
                  </div>
                  <div class="ev-step-label">Sign Up</div>
                </div>
                <div class="ev-step-value">In 5 Days</div>
              </div>
              <div class="ev-step-divider"></div>
              <div class="ev-step pending">
                <div class="ev-step-row">
                  <div class="ev-step-icon">
                    <img src="https://www.figma.com/api/mcp/asset/91ca1283-339f-46ad-85c8-cf766f3779f9" alt="unchecked">
                  </div>
                  <div class="ev-step-label">Deposit</div>
                </div>
                <div class="ev-step-value">≥ 100 USDT</div>
              </div>
              <div class="ev-step-divider"></div>
              <div class="ev-step pending">
                <div class="ev-step-row">
                  <div class="ev-step-icon">
                    <img src="https://www.figma.com/api/mcp/asset/91ca1283-339f-46ad-85c8-cf766f3779f9" alt="unchecked">
                  </div>
                  <div class="ev-step-label">Trade</div>
                  <img src="https://www.figma.com/api/mcp/asset/3f6de015-800e-4c12-8770-9a9fc102943b" alt="info" class="ev-step-info-icon">
                </div>
                <div class="ev-step-value">≥ 100 USDT</div>
              </div>
            </div>
          </div>
          <div class="ev-card-content ev-boost-steps-h5">
            <div class="ev-steps">
              <div class="ev-step completed">
                <div class="ev-step-row ev-step-row-wide">
                  <div class="ev-step-icon">
                    <img src="https://www.figma.com/api/mcp/asset/c3b2cc84-195d-44bc-b0c7-95e67c0cf9c0" alt="checked">
                  </div>
                  <div class="ev-step-label">Sign Up</div>
                </div>
                <div class="ev-step-value">In 5 Days</div>
              </div>
              <div class="ev-step-divider"></div>
              <div class="ev-step pending">
                <div class="ev-step-row">
                  <div class="ev-step-icon">
                    <img src="https://www.figma.com/api/mcp/asset/91ca1283-339f-46ad-85c8-cf766f3779f9" alt="unchecked">
                  </div>
                  <div class="ev-step-label">Deposit</div>
                </div>
                <div class="ev-step-value">≥ 100 USDT</div>
              </div>
              <div class="ev-step-divider"></div>
              <div class="ev-step pending">
                <div class="ev-step-row">
                  <div class="ev-step-icon">
                    <img src="https://www.figma.com/api/mcp/asset/91ca1283-339f-46ad-85c8-cf766f3779f9" alt="unchecked">
                  </div>
                  <div class="ev-step-label">Trade</div>
                  <img src="https://www.figma.com/api/mcp/asset/3f6de015-800e-4c12-8770-9a9fc102943b" alt="info" class="ev-step-info-icon">
                </div>
                <div class="ev-step-value">≥ 100 USDT</div>
              </div>
            </div>
          </div>
          <div class="ev-card-progress">
            <div class="ev-progress-track">
              <div class="ev-progress-gray ev-progress-gray--full"></div>
            </div>
            <span class="ev-progress-fraction" aria-hidden="true"><span class="ev-progress-fraction-num"><span class="ev-invite-progress-num-desktop">0</span><span class="ev-invite-progress-num-h5">1</span></span><span class="ev-progress-fraction-den">/3</span></span>
          </div>
        </div>
      </div>
        <div class="ev-rp-mobile-footer">
          <button type="button" class="invite-btn ev-rp-boost-btn">Invite Friends to Boost</button>
          <p class="ev-rp-footer-note">Boost counts once your friend completes a valid trade</p>
        </div>
      </div>
    </section>

    <!-- Earn Voucher How to earn rewards Section -->
    <section class="gameplay ev-gameplay">
      <div class="section-header">
        <div class="section-title-wrap">
          <h2 class="section-title">How to earn rewards</h2>
        </div>
      </div>
      <div class="gameplay-cards ev-gameplay-cards">
        <div class="gameplay-card">
          <div class="ev-gameplay-card-main">
            <div class="gameplay-title">Invite friends</div>
            <div class="gameplay-desc">Friend's sign-up boosted</div>
          </div>
          <div class="gameplay-icon">
            <img src="https://www.figma.com/api/mcp/asset/6b7d2b59-2c9d-43bc-8144-a09d74bf77da" alt="Invite friends">
          </div>
        </div>
        <div class="gameplay-card">
          <div class="ev-gameplay-card-main">
            <div class="gameplay-title">Friend A</div>
            <div class="gameplay-desc">Gets rewards up to <span class="gameplay-desc-accent">5 USDT</span></div>
          </div>
          <div class="gameplay-icon">
            <img src="https://www.figma.com/api/mcp/asset/0bc5f390-fa42-40a9-9e88-e6656b669462" alt="Friend A">
          </div>
        </div>
        <div class="gameplay-card">
          <div class="ev-gameplay-card-main">
            <div class="gameplay-title">Friend B</div>
            <div class="gameplay-desc">Gets rewards up to 5 USDT</div>
          </div>
          <div class="gameplay-icon">
            <img src="https://www.figma.com/api/mcp/asset/0bc5f390-fa42-40a9-9e88-e6656b669462" alt="Friend B">
          </div>
        </div>
        <div class="gameplay-card">
          <div class="ev-gameplay-card-main">
            <div class="gameplay-title">Claim rewards</div>
            <div class="gameplay-desc">Rewards Received up to 5 USDT</div>
          </div>
          <div class="gameplay-icon">
            <img src="https://www.figma.com/api/mcp/asset/cce9d1f8-4240-4aa5-b914-d54a35304baa" alt="Claim rewards">
          </div>
        </div>
      </div>
    </section>

    <!-- Earn Voucher Event History Section（≤767：Figma 591:6504 卡片列表；≥768：表格） -->
    <section class="withdrawal-record ev-history">
      <div class="section-header ev-history-section-head">
        <div class="section-title-wrap">
          <h2 class="section-title ev-history-page-title">Event History</h2>
        </div>
      </div>
      <div class="ev-history-tabs-row">
        <div class="ev-tabs ev-history-subtabs">
          <div class="ev-tab active">Invite History</div>
          <div class="ev-tab">Boost History</div>
        </div>
        <button type="button" class="ev-history-grid-btn" aria-label="View options">
          <img src="https://www.figma.com/api/mcp/asset/15941a6c-6ec6-4659-b624-f105897b51df" width="18" height="18" alt="">
        </button>
      </div>
      <div class="ev-history-filter">
        <select class="ev-select ev-history-select-h5">
          <option>All</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
      </div>
      <div class="ev-history-desktop-wrap mobile-table-scroll">
      <table class="withdrawal-table">
        <thead>
          <tr>
            <th style="width: 20%;">UID</th>
            <th style="width: 20%;">Sign Up Time</th>
            <th style="width: 20%;">Deposit</th>
            <th style="width: 20%;">Trade</th>
            <th style="width: 20%;">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>25517603</td><td>2025/04/10</td><td>100 USDT</td><td>500 USDT</td><td><span class="status-tag completed">Completed</span></td></tr>
          <tr><td>25517604</td><td>2025/04/10</td><td>50 USDT</td><td>200 USDT</td><td><span class="status-tag pending">Pending</span></td></tr>
          <tr><td>25517605</td><td>2025/04/10</td><td>100 USDT</td><td>500 USDT</td><td><span class="status-tag completed">Completed</span></td></tr>
          <tr><td>25517606</td><td>2025/04/10</td><td>100 USDT</td><td>500 USDT</td><td><span class="status-tag completed">Completed</span></td></tr>
          <tr><td>25517607</td><td>2025/04/10</td><td>0 USDT</td><td>0 USDT</td><td><span class="status-tag pending">Pending</span></td></tr>
        </tbody>
      </table>
      </div>
      <div class="ev-history-cards-h5">
        <div class="ev-history-card-h5">
          <div class="ev-history-kv"><span class="ev-history-k">Boost Friends</span><span class="ev-history-v">VLBEBLXYAQ</span></div>
          <div class="ev-history-kv"><span class="ev-history-k">Signup Time</span><span class="ev-history-v">2025/04/10</span></div>
          <div class="ev-history-kv"><span class="ev-history-k">Valid Boost</span><span class="ev-history-v ev-history-v--yes">Yes</span></div>
          <div class="ev-history-kv"><span class="ev-history-k">Boost Completion Time</span><span class="ev-history-v">20 USDT</span></div>
        </div>
        <div class="ev-history-card-h5">
          <div class="ev-history-kv"><span class="ev-history-k">Boost Friends</span><span class="ev-history-v">VLBEBLXYAQ</span></div>
          <div class="ev-history-kv"><span class="ev-history-k">Signup Time</span><span class="ev-history-v">2025/04/10</span></div>
          <div class="ev-history-kv"><span class="ev-history-k">Valid Boost</span><span class="ev-history-v ev-history-v--yes">Yes</span></div>
          <div class="ev-history-kv"><span class="ev-history-k">Boost Completion Time</span><span class="ev-history-v">20 USDT</span></div>
        </div>
        <div class="ev-history-card-h5">
          <div class="ev-history-kv"><span class="ev-history-k">Boost Friends</span><span class="ev-history-v">VLBEBLXYAQ</span></div>
          <div class="ev-history-kv"><span class="ev-history-k">Signup Time</span><span class="ev-history-v">2025/04/10</span></div>
          <div class="ev-history-kv"><span class="ev-history-k">Valid Boost</span><span class="ev-history-v">No</span></div>
          <div class="ev-history-kv"><span class="ev-history-k">Boost Completion Time</span><span class="ev-history-v">20 USDT</span></div>
        </div>
        <div class="ev-history-card-h5">
          <div class="ev-history-kv"><span class="ev-history-k">Boost Friends</span><span class="ev-history-v">VLBEBLXYAQ</span></div>
          <div class="ev-history-kv"><span class="ev-history-k">Signup Time</span><span class="ev-history-v">2025/04/10</span></div>
          <div class="ev-history-kv"><span class="ev-history-k">Valid Boost</span><span class="ev-history-v ev-history-v--yes">Yes</span></div>
          <div class="ev-history-kv"><span class="ev-history-k">Boost Completion Time</span><span class="ev-history-v">20 USDT</span></div>
        </div>
        <div class="ev-history-card-h5">
          <div class="ev-history-kv"><span class="ev-history-k">Boost Friends</span><span class="ev-history-v">VLBEBLXYAQ</span></div>
          <div class="ev-history-kv"><span class="ev-history-k">Signup Time</span><span class="ev-history-v">2025/04/10</span></div>
          <div class="ev-history-kv"><span class="ev-history-k">Valid Boost</span><span class="ev-history-v ev-history-v--yes">Yes</span></div>
          <div class="ev-history-kv"><span class="ev-history-k">Boost Completion Time</span><span class="ev-history-v">20 USDT</span></div>
        </div>
      </div>
      <div class="table-pagination">
        <div class="page-dot active">1</div>
        <div class="page-dot">2</div>
        <div class="page-dot">3</div>
      </div>
    </section>

    <!-- Earn Voucher Activity Rules Section -->
    <section class="activity-rules ev-rules">
      <div class="section-header">
        <div class="section-title-wrap">
          <h2 class="section-title">Activity Rules</h2>
        </div>
      </div>
      <div class="rules-content">
        <div class="rules-section">
          <h3>1. Event Rules</h3>
          <p>1.1 Share and invite 2 friends. Once both complete the deposit and trading tasks, you'll receive 20 USDT bonus, and each friend gets 5 USDT bonus.</p>
          <p>1.2 Deposit Task: Each invited friend must reach a net deposit of 100 USDT, which must still be maintained 3 days later.</p>
          <p>1.3 Trading Task: After signing up and logging into the App, friends must reach either 100 USDT in spot trading volume or 500 USDT in futures trading volume.</p>
        </div>
        <div class="rules-section">
          <h3>2. Reward Distribution</h3>
          <p>2.1 Bonus will be distributed to your and your friend's Vouchers, valid for 5 days.</p>
          <p>2.2 Gate will manually review your rewards after task completion.</p>
        </div>
      </div>
    </section>
    </div><!-- End Earn Voucher Content -->
```

### 区块间距规范（与 HTML 一致）

| 区块 | 垂直间距来源 |
|------|----------------|
| Header → 首块内容 | `.main-content` `padding-top: 64px` |
| Tab Bar → 下方 Hero | `.tab-bar` `margin-bottom: 90px` |
| Hero → Reward Progress | `.hero-section` `margin-bottom: 160px`（`.ev-hero` 继承 `.hero-section`） |
| Reward Progress → How to earn | `.reward-progress` `margin-bottom: 160px` |
| How to earn → Event History | `.gameplay` `margin-bottom: 160px` |
| Event History → Activity Rules | `.withdrawal-record` `margin-bottom: 160px`（`.ev-history` 在 **768px** 与 `.reward-progress` 等一并改为 `margin-bottom: 120px`） |
| Activity Rules → Footer | `.activity-rules` `margin-bottom: 100px` |

### 响应式断点规范

> 基于 Figma 设计稿：1024px (node 545-4296) 和 768px (node 549-5226)

| 断点 | 内容区宽度 | 布局调整 |
|------|-----------|----------|
| **1920px** | 1200px | 默认布局，参考基准 |
| **1440px** | 1200px (padding: 0 40px) | 保持居中 |
| **1280px** | 1100px | 略微收窄，Hero gap: 24px |
| **1024px** | 976px | **卡片 2 列 → 1 列**，Header nav 隐藏，Tab 保持横向 |
| **768px** | 728px | **Hero 垂直布局**（标题上、视觉上、按钮下），Tab 保持横向，卡片单列 |
| **≤375px** | 100% - 32px | H5 布局，Tab 垂直堆叠 |

#### 1024px 断点详细调整

| 组件 | 1920px 基准 | 1024px 调整 |
|------|------------|-------------|
| **内容区** | 1200px | 976px (padding: 0 24px) |
| **Hero 区域** | 左右布局 (flex) | 保持左右布局，左侧宽度 564px，右侧 388px |
| **Reward Progress 卡片** | 2 列网格 | **1 列单列**，宽度 476px |
| **How to earn rewards** | 4 列 | 保持 4 列或调整为 2×2 |
| **Event History 表格** | 完整 5 列 | 保持 5 列，横向滚动或折叠 |
| **区块间距** | 160px | **保持 160px**（与 1920 一致） |
| **Header** | 完整导航 | **隐藏导航项**，保留 Logo 和登录/注册 |
| **Footer** | 多列布局 | **缩减列数**，保持核心链接 |

#### 768px 断点详细调整

| 组件 | 1920px 基准 | 768px 调整 |
|------|------------|------------|
| **内容区** | 1200px | 728px (padding: 0 20px) |
| **Hero 区域** | 左右布局 | **垂直布局**：标题居中、三币视觉居中、按钮全宽 |
| **Hero 主标题** | 48px | **保持 48px 或调整为 40px** |
| **Hero 按钮** | 252px 宽 | **`.invite-btn` 100%**、`max-width:468px`、居中 |
| **Reward Progress 卡片** | 2 列 | **1 列单列**，宽度 728px |
| **How to earn rewards** | 4 列 | **2×2 网格** 或 **单列堆叠** |
| **Event History 表格** | 完整 5 列 | **横向滚动** 或 **卡片式堆叠** |
| **区块间距** | 160px | **120px**（含 `.ev-history` 等与 Token Crew 共用选择器） |
| **Tab Bar** | 横向 3 个 | 保持横向，但**副标题可能隐藏** |
| **Header** | 完整导航 | **汉堡菜单**，仅显示 Logo 和图标 |
| **Footer** | 多列 | **单列堆叠**，折叠式菜单 |

#### 组件自适应细节

**Hero Section 自适应：**
```
1920px:  [左: 标题+按钮] ───── [右: 三币视觉]
768px:   [      标题居中      ]
         [    三币视觉居中     ]
         [   按钮全宽居中      ]
```

**Reward Progress 卡片自适应：**
```
1920px:  [Card 1] [Card 2]      (2列，gap: 24px)
1024px:  [Card 1]
         [Card 2]              (1列，宽度 476px)
768px:   [Card 1]
         [Card 2]              (1列，宽度 728px)
```

**How to earn rewards 自适应：**
```
1920px:  [Card1] [Card2] [Card3] [Card4]  (4列)
1024px:  [Card1] [Card2] [Card3] [Card4]  (4列，紧凑)
768px:   [Card1] [Card2]
         [Card3] [Card4]                  (2×2 网格)
```

**表格自适应策略：**
- **1024px**: 表格横向滚动，或列宽自适应压缩
- **768px**: 考虑改为卡片式布局，每行数据变为一张卡片

---

## 区块 5: 模块专属组件

> **共用部分**（页面壳层、Tab、`.invite-btn` 基类、`.section-header`、`.withdrawal-table`、`.table-pagination`、Footer 等）见 [_base.md](./_base.md)。本节为 **Earn Voucher Tab 内** 覆盖或独有样式（类名前缀多为 `ev-`）。

### EarnVoucherHero（`.hero-section.ev-hero`）

| 属性 | CSS / HTML 值 |
|------|----------------|
| 继承 | 全局 `.hero-section`：`height:300px`、`display:flex`、`gap:40px`、`align-items:flex-end`、`margin-bottom:160px`、`padding-right:24px` |
| 左侧 `.hero-left` | `flex:1`、`flex-direction:column`、`gap:46px` |
| 主标题 `.hero-title` | 双版本文案系统（见下方说明） |
| 副标题 `.hero-subtitle` | 双版本文案系统（见下方说明） |
| 主按钮 `.invite-btn.ev-hero-cta` | 文案「Invite Friends to Boost」；`type="button"` |
| 右侧视觉 `.ev-hero .hero-visual` | **500px × 200px**、`overflow:visible` |
| 视觉容器 | `.hero-visual-container`：`overflow:visible` |

#### Hero 双版本文案系统

标题和副标题各含桌面 / H5 两套 `<span>`，通过 CSS `display` 切换：

| 元素 | ≥768px（桌面） | ≤767px（H5） |
|------|----------------|--------------|
| `.ev-hero-title-desktop` | `display:inline` | `display:none` |
| `.ev-hero-title-h5` | `display:none` | `display:flex; flex-direction:column` |
| `.ev-hero-sub-desktop` | `display:inline` | `display:none` |
| `.ev-hero-sub-h5` | `display:none` | `display:flex` |

- **桌面标题**：`<span class="ev-hero-title-desktop">Invite 2 Friends<br>to Get Up to 20 USDT</span>`
- **H5 标题**：`.ev-hero-line1`（描述文）+ `.ev-hero-line2`（金额高亮，字号放大）
- **H5 副标题**：`.ev-hero-sub-h5-pref`（前缀文本）+ `.ev-hero-sub-h5-amt`（金额高亮）

### Reward Progress 复合卡壳（`.ev-rp-stack`）

桌面端标题区 `.section-header.ev-rp-header-desktop`（`≥768px` 显示）与 H5 端移动顶栏/倒计时横幅/底栏 CTA 共存于 `.ev-rp-stack` 容器中：

| 子元素 | 显示条件 | 说明 |
|--------|----------|------|
| `.ev-rp-header-desktop` | ≥768px | 桌面标题：`.section-title-wrap` 内联 `width:100%; text-align:center` |
| `.ev-rp-mobile-top` | ≤767px | 移动端顶栏：左侧 `.ev-rp-mobile-title` + 右侧 `.ev-rp-refresh-btn` |
| `.ev-rp-mobile-banner` | ≤767px | 倒计时横幅：`.ev-rp-banner-icon` + `.ev-rp-banner-text` + `.ev-rp-banner-countdown`（`3D:23:00:00` 格式） |
| `.progress-cards.ev-progress-cards` | 始终 | 卡片区（桌面 2 列栅格 / H5 单列堆叠） |
| `.ev-rp-row-divider` | ≤767px | 卡片间分隔线（桌面隐藏） |
| `.ev-rp-mobile-footer` | ≤767px | 底栏：`.ev-rp-boost-btn`（CTA 按钮）+ `.ev-rp-footer-note`（说明文案） |

### 右侧两图层币堆叠（`.hero-coins-stack`）

> HTML 为 **底图 + Gate 币** 两层位图（`assets/images/ev-coin-bg.png`、`ev-coin-gate.png`），非 Token Crew 的液态玻璃三球。

| 元素 | 类名 | 布局与尺寸 |
|------|------|------------|
| 堆叠容器 | `.hero-coins-stack` | `position:absolute`、**390×162**、`right:0`、`top:50%` + `translateY(-50%)` |
| 底层双币背景 | `.coin-bg-img` | **348×143**、`left:20px`、`top:-6px`、`z-index:1` |
| 上层 Gate 币 | `.coin-gate-img` | **159×159**、`left:50%` + `translateX(-50%)`、`top:-6px`、`z-index:2` |

### EarnVoucherProgressCard（`.ev-card` / `.ev-progress-cards`）

| 属性 | 值（与 `token-crew.html` 一致） |
|------|----------------------------------|
| 栅格 | `.ev-progress-cards`：`grid-template-columns: repeat(2,1fr)`（在全局 `.progress-cards` 上叠加）；**≤1024px** 单列 `1fr` |
| 单卡 | `.ev-card`：高 **279px**、背景 `var(--bg-secondary)`、圆角 **20px**、**无**渐变描边（`::before { display:none }`） |
| 头部 | `.ev-card-header`：`padding: 39px 40px 0` |
| 用户信息 | `.ev-user-info`：`gap:24px`；`.ev-avatar` **64×64**、圆角 **16px**、`border:1px solid var(--border-subtle)` |
| 主标题 | `.ev-user-title`：**22px** / **700** / `#FFFFFF`；Card 1 新增 `.ev-user-name.ev-user-name--h5`（≤767px 显示用户名） |
| 内容区 | `.ev-card-content`：`padding: 80px 40px 0`、`width:100%` |
| 步骤行 | `.ev-steps`：`justify-content:space-between`；`.ev-step` 纵向 `gap:8px` |
| 完成态图标 | `.ev-step.completed .ev-step-icon`：可为 **SVG 勾** 或图；容器背景 **`#2563EB`** |
| 未完成 | `.ev-step.pending .ev-step-icon`：透明底 + 灰 unchecked 图（Figma asset `91ca1283-339f-46ad-85c8-cf766f3779f9`） |
| 文案 | `.ev-step-label`：**18px** / **600**；完成为白字，未完成为 `#484B51`；`.ev-step-value`：**16px** / **400**，完成用 `var(--text-secondary)`，未完成为 `#484B51` |
| 信息 icon | `.ev-step-info-icon`：**16×16** |
| 分隔 | `.ev-step-divider`：宽 1px、高 48px、竖向渐变 |
| 底栏进度 | `.ev-card-progress`：`display:flex; align-items:center`、贴底；内含 `.ev-progress-track`（`flex:1; min-width:0; display:flex; height:8px`，弹性撑满取代固定 233px）+ `.ev-progress-fraction`（分数文本如 `1/3`） |
| 进度轨道 | `.ev-progress-track` 内：蓝色段 `.ev-progress-blue` `linear-gradient(90deg,#0055FF,#408DFF)`，灰色段 `.ev-progress-gray` `linear-gradient(90deg,#1F2023,#2A2D31)` |

### 邀请占位卡 / H5 第二好友卡（`.ev-invite-card`）

Card 2 含**双套头像 / 标题 / 步骤**，通过 CSS 在桌面与 H5 间切换：

| 元素 | ≥768px（桌面） | ≤767px（H5） |
|------|----------------|--------------|
| `.ev-invite-avatar-desktop`（`+` SVG） | 显示 | 隐藏 |
| `.ev-boost-avatar`（用户头像） | 隐藏 | 显示 |
| `.ev-invite-title`（「Invite Friends to Boost」） | 显示 | 隐藏 |
| `.ev-boost-title`（「Boost pending」） | 隐藏 | 显示 |
| `.ev-user-name--invite-h5`（用户名） | 隐藏 | 显示 |
| `.ev-invite-steps-desktop`（全 pending 步骤） | 显示 | 隐藏 |
| `.ev-boost-steps-h5`（含 completed 步骤） | 隐藏 | 显示 |
| `.ev-invite-progress-num-desktop`（`0`） | 显示 | 隐藏 |
| `.ev-invite-progress-num-h5`（`1`） | 隐藏 | 显示 |

| 属性 | 值 |
|------|-----|
| 桌面头像 | `.ev-avatar.ev-add-avatar.ev-invite-avatar-desktop`：背景 `rgba(255,255,255,0.09)`、无边框、内嵌 **20×20** SVG「+」 |
| H5 头像 | `.ev-avatar.ev-boost-avatar`：同 Card 1 头像样式，展示好友头像 |
| 底部条 | `.ev-progress-gray.ev-progress-gray--full`（灰色段拉满）；桌面分数 `0/3`，H5 分数 `1/3` |

### How to earn rewards（`.gameplay.ev-gameplay`）

| 属性 | 值 |
|------|-----|
| 栅格 | `.ev-gameplay-cards`：`grid-template-columns: repeat(4,1fr)`、`gap:16px` |
| 单卡 | `.ev-gameplay-cards .gameplay-card`：`padding: 40px 20px`（覆盖默认 `42px 40px`）；内部为 `.ev-gameplay-card-main`（文本容器）+ `.gameplay-icon` |
| 文本容器 | `.ev-gameplay-card-main`：包裹 `.gameplay-title` + `.gameplay-desc`，文本在前、图标在后（HTML 中文本区域在 icon 之前） |
| 图标 | `.gameplay-icon > img`，**48×48** |
| 标题 / 描述 | `.gameplay-title` **16px**；`.gameplay-desc` **14px**（描述为次要色）；部分卡片含 `.gameplay-desc-accent` 高亮金额 |
| 响应式 | **768px**：`grid-template-columns: repeat(2,1fr)`；**375px**：单列 `1fr` |

### Event History（`.withdrawal-record.ev-history`）

| 属性 | 值 |
|------|-----|
| 标题区 | `.section-header.ev-history-section-head` > `.section-title.ev-history-page-title`「Event History」，**无** `.section-desc` |
| Tab 行 | `.ev-history-tabs-row`：`display:flex; align-items:center`；左侧 `.ev-tabs.ev-history-subtabs` + 右侧 `.ev-history-grid-btn`（视图切换按钮） |
| 二级 Tab | `.ev-tabs` + `.ev-tab`：规范见 [_base.md](./_base.md) **InlineTextTabs**（**24px** / **600**；选中 **白色下划线 `::after`**，**非**蓝色 border-bottom） |
| 筛选行 | `.ev-history-filter`：`justify-content:flex-start`、`margin-bottom:24px`；下拉 `.ev-select.ev-history-select-h5`：见 [_base.md](./_base.md) **FormSelect** |
| 桌面表格 | `.ev-history-desktop-wrap.mobile-table-scroll` 包裹 `.withdrawal-table`（≥768px 显示）；**5 列**；**最后一列** 仍遵循全局 `th:last-child` / `td:last-child` **`text-align:right`** |
| H5 卡片列表 | `.ev-history-cards-h5`（≤767px 显示）：内含多个 `.ev-history-card-h5`；每张卡内多行 `.ev-history-kv`（`.ev-history-k` 标签 + `.ev-history-v` 值）；正值用 `.ev-history-v--yes` 高亮 |
| 状态 | `.status-tag.completed` / `.pending`：见 [_base.md](./_base.md) **StatusTag** |

---

## 区块 6: 与 `_base.md` 的关系

- **直接复用**：集成页顶栏、Tab 胶囊、`.main-content` 壳层、`.invite-btn` 基类、`.section-header` / `.section-title`、`.withdrawal-table` 与 `.table-pagination`、Footer、`.gte-date-picker`、全局响应式中与 `.ev-*` 并列的规则等，均以 [_base.md](./_base.md) **区块 4–5** 为准。
- **H5 共享组件**：H5TopBar（≤767px Status Bar + Tab Nav，`.ev-h5-status-bar` + `.ev-h5-tab-nav`）和 H5TabSheet（底部切换弹窗）为三 Tab 共享，规范见 [_base.md](./_base.md)。
- **本 Tab 覆盖**：`.ev-hero` 右侧视觉尺寸、`.hero-coins-stack`、`.ev-card` 体系（含 `.ev-rp-stack` 复合卡壳）、`.ev-gameplay-cards`（含 `.ev-gameplay-card-main`）、`.ev-tabs` / `.ev-select`、`.ev-history-desktop-wrap` + `.ev-history-cards-h5` 双版本、`.ev-rules` 下 `.rules-section` 等。
- **注意**：Earn Voucher **未使用** Token Crew Hero 的 `.countdown`；倒计时若出现在其他 Tab，见 `_base.md`。

---

## 区块 7: 适用性

### 适用场景
- 助力领券活动页
- 好友助力进度展示
- 优惠券奖励领取

### 不适用场景
- 赚币活动（用 token-crew.md）
- Gate To Earn（用 [gate to earn.md](./gate%20to%20earn.md)）

---

## 变更日志

| 日期 | 变更 | 来源 |
|------|------|------|
| 2026-03-28 | 对齐最新 HTML：Hero 双版本文案系统；Reward Progress 复合卡壳（ev-rp-stack 含移动端顶栏/倒计时横幅/底栏CTA）；ev-invite-card 双套桌面/H5 元素；gameplay-card 新增 ev-gameplay-card-main 文本容器；Event History 桌面表格+H5卡片列表双版本；进度条改为弹性宽度；引用 H5TopBar/H5TabSheet | HTML |
| 2026-03-27 | 与最新集成页对齐：顶栏 Tab 副标题见 [_base.md](./_base.md)；Event History 等表格外层 `.mobile-table-scroll`（见 `_base` WithdrawalTable 窄屏约定） | HTML |
| 2026-03-26 | 与 `token-crew.html` 中 `tab-content-earn-voucher` 对齐：元信息、间距、响应式、两图层币堆叠、`ev-*` 组件规格、Event History 与 `_base` 关系；修正 Tab/表格/按钮文档与实现一致 | HTML |
| 2026-03-24 | 好友助力卡片重构：新增底部进度条、步骤图标改用图片资源、卡片高度固定 279px | Figma 设计稿 node-id=492-18584 |
| 2026-03-24 | 三币堆叠视觉区改用 Figma 导出图片资源，移除 CSS 液态玻璃效果 | Figma 设计稿 node-id=492-18531 |
| 2026-03-23 | 根据 Figma 设计稿创建完整 HTML 页面，包含三币堆叠视觉、好友助力卡片、事件历史表格 | Figma 设计稿 |
| 2026-03-23 | 同步 Token Crew 最新样式：Liquid Glass 参数、分页器样式 | HTML 实现同步 |
| 2026-03-23 | 初始创建 | 需求分析 |
