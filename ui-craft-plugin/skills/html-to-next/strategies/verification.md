# Phase F: 验证

> 每个 Phase 完成后都应做阶段验证，Phase F 是最终全量验证。
> 使用环境中的 Playwright MCP 工具做自动化视觉测试（无需安装额外依赖）。

---

## 阶段验证（每个 Phase 完成后）

| Phase | 验证内容 | 方法 |
|-------|---------|------|
| 0 | 技术栈报告完整，依赖列表准确 | 人工审阅 |
| A | 转换计划合理，无遗漏依赖/动效 | 人工审阅 |
| B | 页面能跑，布局结构正确 | `next dev` + 浏览器打开 |
| C | 样式与 HTML 视觉一致 | 截图对比 |
| D | 动效还原（GSAP/CSS 动画正常） | 浏览器手动验证 |
| E | 交互完整（Modal/Tab/状态切换） | 浏览器手动验证 |
| F | 全量验证（下方详细） | 自动 + 手动 |

---

## Phase F 全量验证清单

### 1. 构建检查

```bash
# 无 TypeScript 错误
pnpm run check:type

# 无 lint 错误
pnpm run check

# 构建通过
pnpm run build
```

### 2. 视觉对比

在三个断点截图对比：

| 断点 | 宽度 | 说明 |
|------|------|------|
| 桌面 | 1440px | 主设计稿尺寸 |
| 平板 | 768px | 中间断点 |
| 移动 | 375px | 最小断点 |

**对比方法：**

1. 浏览器打开原始 HTML → 截图
2. `next dev` 打开转换后页面 → 截图
3. 逐 section 对比

**可接受的差异：**
- 字体渲染差异（HTML 用 Inter/Antonio，Next 用 Gate_Sans）
- 图标差异（HTML 用占位 SVG，Next 用 @gate/iconfont）
- 设计工具面板不存在（已剥离）

**不可接受的差异：**
- 布局错位
- 间距明显不同
- 颜色不同
- 元素缺失
- 动效不播放

### 3. 交互验证

逐一验证 Phase A 分析中标记的所有交互点：

```markdown
# 交互验证清单
- [ ] 侧边导航点击跳转
- [ ] 移动端底部 tab 切换
- [ ] Hero CTA 按钮点击
- [ ] 视频卡片 hover 效果
- [ ] 登机牌翻转
- [ ] Modal 打开/关闭/ESC 关闭/背景点击关闭
- [ ] Tab 切换
- [ ] Accordion 展开/收起
- [ ] 倒计时每秒更新
- [ ] 自动轮播 + hover 暂停
```

### 4. 动效验证

逐一验证 Phase A 分析中标记的所有动效：

```markdown
# 动效验证清单
- [ ] Hero 入场 Timeline（元素依次飞入）
- [ ] Hero exit（滚动散射 + 背景放大）
- [ ] H1 横向滚动（pin + scrub）
- [ ] V2 蓝色渐变过渡（scrub 颜色插值）
- [ ] 飞机过渡动画
- [ ] 模块标题滚动淡入
- [ ] Modal 弹入动画
- [ ] 倒计时数字翻转
- [ ] reduced-motion: 所有动画跳过，显示最终态
```

### 5. 响应式验证

```markdown
- [ ] 1440px: 侧边导航展开/收起
- [ ] 768px: 布局适配
- [ ] 375px: 移动端 snap 模式
- [ ] 移动端底部 tab bar 出现
- [ ] 桌面端侧边导航出现
```

### 6. 性能检查

```markdown
- [ ] next build 无超大 chunk（单个 JS chunk < 200KB gzipped）
- [ ] 图片使用 next/image 或已优化
- [ ] GSAP 动效 cleanup 正常（切换路由不泄漏 ScrollTrigger）
- [ ] 低端机降级逻辑生效（P0 动效移除）
```

### 7. i18n 验证（--gate 模式）

```markdown
- [ ] 所有中文文案在 zh.json 中
- [ ] useTranslation 正确引用
- [ ] 无硬编码中文字符串
- [ ] 动态文案（含变量）正确插值
```

### 8. 代码质量

```markdown
- [ ] 无 any 类型（边界层除外）
- [ ] 所有 useEffect 有 cleanup
- [ ] 无内存泄漏（ScrollTrigger.kill, clearInterval 等）
- [ ] 组件命名与文件名一致
- [ ] className 映射注释存在
```

---

## 自动化验证（Playwright MCP）

环境已内置 Playwright MCP 工具，**无需安装任何依赖**，直接调用即可。

### 启动页面 + 截图对比流程

```
Step 1: 启动 dev server
  → Bash: cd {project} && pnpm dev &

Step 2: 打开转换后的 Next.js 页面
  → playwright__browser_navigate: url = "http://localhost:3000/{page-path}"

Step 3: 桌面截图 (1440px)
  → playwright__browser_resize: width=1440, height=900
  → playwright__browser_take_screenshot: (保存为 next-desktop.png)

Step 4: 平板截图 (768px)
  → playwright__browser_resize: width=768, height=1024
  → playwright__browser_take_screenshot: (保存为 next-tablet.png)

Step 5: 移动端截图 (375px)
  → playwright__browser_resize: width=375, height=812
  → playwright__browser_take_screenshot: (保存为 next-mobile.png)

Step 6: 打开原始 HTML（对比基准）
  → playwright__browser_navigate: url = "file:///path/to/source.html"
  → 同样 3 个断点截图

Step 7: 逐断点视觉对比
  → Read 截图文件，AI 对比差异
```

### 交互验证

```
# 验证 Modal
→ playwright__browser_click: selector = "[data-modal-trigger]"
→ playwright__browser_snapshot: 检查 Modal 是否出现
→ playwright__browser_press_key: key = "Escape"
→ playwright__browser_snapshot: 检查 Modal 是否关闭

# 验证 Tab 切换
→ playwright__browser_click: selector = ".tab:nth-child(2)"
→ playwright__browser_snapshot: 检查内容是否切换

# 验证倒计时
→ playwright__browser_snapshot: 记录当前数字
→ playwright__browser_wait_for: timeout = 2000
→ playwright__browser_snapshot: 数字应已变化

# 验证滚动动效
→ playwright__browser_evaluate: "window.scrollTo(0, 800)"
→ playwright__browser_wait_for: timeout = 1000
→ playwright__browser_take_screenshot: 检查动效是否触发
```

### Console 错误检查

```
→ playwright__browser_console_messages: 检查是否有 JS 错误
→ 过滤 level=error 的消息
→ 报告错误（排除已知的第三方 warning）
```

### 自动化验证脚本模板

Phase F 执行时，按以下顺序调用 Playwright MCP：

1. `browser_navigate` → 打开页面
2. `browser_console_messages` → 检查 JS 错误
3. `browser_snapshot` → 获取 DOM 结构
4. 3 个断点 `browser_resize` + `browser_take_screenshot` → 视觉截图
5. 逐个交互点 `browser_click` / `browser_press_key` + `browser_snapshot` → 交互验证
6. `browser_evaluate` + `window.scrollTo` → 滚动动效验证

---

## 问题分类与处理

| 问题类型 | 严重程度 | 处理方式 |
|---------|---------|---------|
| 构建失败 | 阻断 | 必须修复 |
| 布局错位 | 高 | 回到 Phase C 修复样式 |
| 动效不播放 | 高 | 回到 Phase D 检查 GSAP 初始化 |
| 交互不响应 | 高 | 回到 Phase E 检查事件绑定 |
| 样式微小差异 | 低 | 记录，可接受 |
| i18n key 缺失 | 中 | 补充 zh.json |
| TypeScript 警告 | 低 | 修复或 suppress |

---

## 验证报告模板

```markdown
# 验证报告: {Feature}

## 构建
- [x] TypeScript: 通过
- [x] Lint: 通过
- [x] Build: 通过

## 视觉（截图已附）
- [x] 桌面 1440px: 一致
- [x] 平板 768px: 一致
- [ ] 移动 375px: 侧边导航位置偏移 → 已修复

## 交互 (12/12)
- [x] 所有 Modal 正常
- [x] Tab 切换正常
- [x] 倒计时正常

## 动效 (8/9)
- [x] Hero 入场正常
- [x] 横向滚动正常
- [ ] Canvas 背景网格未迁移 → P0 级别，低端机移除，用静态背景

## 性能
- [x] 最大 chunk: 142KB gzipped
- [x] GSAP cleanup 正常

## 待处理
1. Canvas 背景网格需要静态降级图
2. Antonio 字体确认是否保留
```
