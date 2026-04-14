# Rewards Hub 图片资源

> 本目录包含 Rewards Hub H5 页面使用的所有图片资源
> 下载日期：2026-03-17
> 来源：Figma MCP 资源导出

---

## 资源清单

### 1. RewardBadge 徽章素材

#### 绿色徽章（USDT 奖励）

| 文件名 | 用途 | 原始 URL |
|--------|------|----------|
| `badge-bg-bottom-green.png` | 徽章底部背景 | `https://www.figma.com/api/mcp/asset/556be00a-718e-4678-8eb8-f4e1f4df11ef` |
| `badge-bg-top-green.png` | 徽章顶部背景 | `https://www.figma.com/api/mcp/asset/d2108edb-4ca7-4593-8bd7-67746c6d2d2b` |
| `badge-intersect-green.png` | 徽章交叉层 | `https://www.figma.com/api/mcp/asset/f9d8c55a-8236-40fa-8a87-e1213d0a541c` |

**使用场景**：
- InviteCard 任务行徽章
- WelcomeCard 任务行徽章
- AdvancedTaskCard 里程碑徽章（10/40/100 USDT）

#### 紫色徽章（VIP 奖励）

| 文件名 | 用途 | 原始 URL |
|--------|------|----------|
| `badge-bg-bottom-purple.png` | 徽章底部背景 | `https://www.figma.com/api/mcp/asset/b8ace107-7ff3-4845-ba4c-7d7bfe4109d5` |
| `badge-bg-top-purple.png` | 徽章顶部背景 | `https://www.figma.com/api/mcp/asset/8b9894e7-ac91-4c22-ab8b-77f0b8c6abd4` |
| `badge-intersect-purple.png` | 徽章交叉层 | `https://www.figma.com/api/mcp/asset/d07d6531-8919-483f-8658-7041766363ca` |

**使用场景**：
- AdvancedTaskCard 里程碑徽章（VIP5 部分）

---

### 2. 进度条

| 文件名 | 用途 | 尺寸 | 原始 URL |
|--------|------|------|----------|
| `progress-bar.png` | AdvancedTaskCard 里程碑进度条 | 335×3px | `https://www.figma.com/api/mcp/asset/3c451b79-3394-4fa9-a564-2fca389acfcd` |

---

### 3. HeroBanner 素材

| 文件名 | 用途 | 尺寸 | 原始 URL |
|--------|------|------|----------|
| `hero-image.png` | 3D 奖杯主图 | 128×128px | `https://www.figma.com/api/mcp/asset/5997ddfc-7f3e-49db-beea-1bf38e214d9d` |

---

### 4. StatusBar 图标

| 文件名 | 用途 | 尺寸 | 原始 URL |
|--------|------|------|----------|
| `status-signal.png` | 信号图标 | 17.1×10.7px | `https://www.figma.com/api/mcp/asset/3e4bd3b0-4ead-4337-afef-e8658daf52cc` |
| `status-wifi.png` | WiFi 图标 | 15.4×11px | `https://www.figma.com/api/mcp/asset/1edc8a1d-4327-48ac-9c10-027718ed676e` |
| `status-battery.png` | 电池图标 | 24.5×11.5px | `https://www.figma.com/api/mcp/asset/78e55670-78ae-4b2d-b634-480fb2b94ee1` |

---

### 5. 用户头像

| 文件名 | 用途 | 尺寸 | 原始 URL |
|--------|------|------|----------|
| `avatar-1.png` | ActivityTicker 用户头像 1 | 20×20px | `https://www.figma.com/api/mcp/asset/0e18486c-2e9e-4670-8082-0ed25ab37dbb` |
| `avatar-2.png` | ActivityTicker 用户头像 2 | 20×20px | `https://www.figma.com/api/mcp/asset/7df3facd-fbd4-49fe-bedf-a3de7328aea1` |
| `avatar-3.png` | ActivityTicker 用户头像 3 | 20×20px | `https://www.figma.com/api/mcp/asset/bf38634f-52db-48a3-954f-a73c58a3a848` |
| `avatar-alice.png` | InviteCard Alice 头像 | 32×32px | `https://www.figma.com/api/mcp/asset/6a52c6e0-a49d-4b52-b26f-157e44652303` |

---

### 6. HotEventCard 素材

| 文件名 | 用途 | 尺寸 | 原始 URL |
|--------|------|------|----------|
| `hot-event-cover.png` | 活动封面图 | 88×88px | `https://www.figma.com/api/mcp/asset/2956452f-2a39-4c73-9031-a352596b80cf` |

---

### 7. 里程碑状态图标

| 文件名 | 用途 | 尺寸 | 原始 URL |
|--------|------|------|----------|
| `icon-circle-success.png` | 已完成状态（绿色圆圈勾选） | 12×12px | `https://www.figma.com/api/mcp/asset/b4e8b906-c465-4acb-a70c-ff7f14735128` |
| `icon-lock-current.png` | 当前进度状态（白色锁） | 12×12px | `https://www.figma.com/api/mcp/asset/bfc9344e-1469-4e3b-b5e9-abd3606e4a68` |
| `icon-lock-inactive.png` | 未解锁状态（灰色锁） | 12×12px | `https://www.figma.com/api/mcp/asset/b896fe15-2f05-4d91-8033-5398843088b9` |

**使用场景**：AdvancedTaskCard 里程碑标签

---

## 使用说明

### 本地引用路径

在 HTML 中使用本地资源时，相对路径为：

```html
<!-- 从 pages/ 目录引用 -->
<img src="../../../.cursor/skills/ui-craft/domains/exchange/business/rewards-hub-assets/badge-bg-bottom-green.png">

<!-- 或使用绝对路径 -->
<img src="/Users/yuhuang/Desktop/ai-activities/.cursor/skills/ui-craft/domains/exchange/business/rewards-hub-assets/badge-bg-bottom-green.png">
```

### 徽章组件结构

```html
<!-- 绿色 USDT 徽章 -->
<div class="badge">
  <img class="badge-bg-bottom" src="badge-bg-bottom-green.png" alt="">
  <img class="badge-bg-top" src="badge-bg-top-green.png" alt="">
  <img class="badge-intersect" src="badge-intersect-green.png" alt="">
  <span class="num">50</span>
  <span class="label">USDT</span>
</div>

<!-- 紫色 VIP 徽章 -->
<div class="badge">
  <img class="badge-bg-bottom" src="badge-bg-bottom-purple.png" alt="">
  <img class="badge-bg-top" src="badge-bg-top-purple.png" alt="">
  <img class="badge-intersect" src="badge-intersect-purple.png" alt="">
  <span class="num">VIP 5</span>
  <span class="label">USDT</span>
</div>
```

---

## 注意事项

1. **Figma URL 有效期**：原始 Figma MCP 资源 URL 有效期为 7 天，过期后需重新导出
2. **本地资源优先**：生产环境应使用本地资源或上传至 CDN
3. **图片格式**：所有图片均为 PNG 格式，支持透明背景
