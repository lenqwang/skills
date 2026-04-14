# 动效与多媒体资源设计交付规范（摘要）

> 来源: 飞书 Wiki `OytMw8uxSi7CvykS0u7jLjynpbh`
> 最后编辑: 2026-03-03

---

## 1. 动效方案选型速查表

| 动效需求 | 前端技术方案 | 性能影响 | 低端机策略 |
|---------|------------|---------|-----------|
| 页面背景动画 | `<video>` MP4 | 🟢 低 | 可保留，显示 poster |
| 透明底叠加特效 | `<video>` + UA 切换 WebM/MP4(H.265) | 🟢 低 | 可保留，极低端显示 poster |
| 全屏粒子/极光/流体 | Canvas / WebGL | 🔴 极高 | **必须移除**，静态背景图。H5 WebView 禁用 |
| UI 微动效 | CSS Transition / Animation | 🟢 低 | 可保留 |
| 复杂矢量动画 | lottie-web (Canvas 模式) | 🟢 低 | 可保留（≤150KB JSON） |
| 时序编排动画 | **GSAP Timeline** | 🟡 中 | 简化：减少元素数，保留核心 1-2 个 |
| 页面入场/过渡 | GSAP / Framer Motion / CSS Transition | 🟢 低 | 可保留 |
| 滚动驱动动画 | **GSAP ScrollTrigger** | 🟡 中 | 简化：改为一次触发 |
| 文字逐字/逐行 | GSAP SplitText / CSS | 🟢 低 | 保留逐行，不必逐字 |
| 数字滚动/计数器 | GSAP / CountUp.js | 🟢 低 | 可保留 |
| 3D 展示/交互 | @splinetool/react-spline | 🔴 极高 | **必须移除**，静态截图 |
| 序列帧动画 | CSS steps() / Canvas | 🟡 中 | 降帧 12fps→6fps 或静态关键帧 |
| 背景音乐 | `<audio>` / Web Audio API | 🟢 低 | 禁止自动播放 |

## 2. GSAP 适用场景

GSAP 是前端代码驱动的动画方案，特别适合 **时序编排** 特征的动效：

**适合 GSAP：**
- 时间轴动画：弹窗打开 → 标题飞入 → 内容淡出 → 按钮弹出
- 滚动触发：ScrollTrigger 插件
- 交互响应：hover/click 后的复杂多步动画
- 数值动画：数字滚动、进度条填充
- 文字拆分：逐字/逐行飞入

**不适合 GSAP：**
- 简单 hover 变色/放大 → CSS Transition
- 矢量图标动画 → Lottie
- 复杂粒子/3D → 视频或 Spline

## 3. 低端机性能分级

### P0 - 极高影响（低端机必须移除）
- 全屏粒子（Canvas/WebGL）
- 极光/流体/物理引擎
- 3D 场景（Spline/Three.js）
- 大面积 backdrop-filter/blur
- 多个高分辨率视频同时播放

### P1 - 中等影响（根据页面负载决定）
- 自动播放视频：页面 ≥2 个时降级
- GSAP Timeline：参与元素 >8 个时降级
- 滚动 scrub：>3 段时改为 once 触发
- 序列帧：帧数多+尺寸大时降帧
- 大 Lottie（>100KB）：>3 个同时时降级

### P2 - 低影响（可保留）
- CSS Transition/Animation (opacity, transform)
- 简单入场动画
- 小型 Lottie (≤50KB)
- 数字滚动
- 文字逐行入场

## 4. 视频格式

**非透明视频**：MP4 (H.264) 一种即可
**透明视频**：WebM (VP9+Alpha) + MP4 (H.265) 两种，UA 切换

## 5. Lottie 规范

- JSON 格式（AE + Bodymovin）
- ≤150KB（推荐），≤300KB（上限）
- 24fps 或 30fps
- 禁止内嵌 base64 图片

## 6. GSAP/CSS 动画参数标注

设计师在 Figma 中标注：
- duration / delay / easing
- 触发时机（进入视口/点击/hover）
- 方向和起止状态
- 低端机策略

## 7. 资源命名规范

```
{业务模块}-{资源类型}-{描述}-{设备}[-{倍率}].{格式}
```

示例：
- `score-bg-banner-pc.webp`
- `score-video-opening-h5-poster.webp`
- `score-lottie-loading.json`
- `score-sprite-horse-run-pc.webp`
