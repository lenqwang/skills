# UI 设计师 Git 协作指南

> 面向零 Git 基础的 UI 设计师。你的设计规范（Token、组件、风格文件）是 AI 生成代码的唯一输入。
> 这份指南教你如何通过 Cursor + Git 提交设计规范，与前端/AI 高效协作。

---

## 你在这个系统中的角色

```
产品 PM          →    你（UI 设计师）    →    前端 + AI
提需求                 定义规则 & Token         基于你的规范
选风格方向             编写组件规格             自动生成代码
                       校准验收
```

**核心原则**：你是规则的制定者，产品是需求的提出者，FE 是规则的执行者。

你**不需要**写代码、改配置、碰 CSS。

---

## 一、起步（一次性设置）

### 1. 安装 Cursor

Cursor 是一个 AI 增强的代码编辑器，内置终端和 Git 支持。你只需要安装这一个工具。

1. 访问 **cursor.com** 下载安装
2. 打开 Cursor，完成基本设置
3. 你会看到一个类似 VS Code 的界面

### 2. Clone 仓库到本地

打开 Cursor 终端（快捷键 `Ctrl` + `` ` ``），输入：

```bash
# 进入你想放项目的目录
cd ~/Documents

# 克隆仓库（把 URL 替换为实际仓库地址）
git clone https://github.com/your-org/ai-activities.git

# 用 Cursor 打开项目
cursor ai-activities
```

> **💡 提示：** Clone 只需要做一次。之后每次打开 Cursor，选择 File → Open Folder 打开这个目录即可。

### 3. 认识项目结构

你只需要关注 `domains/` 目录。下面用标注说明了文件归属：

```
.claude/skills/ui-craft/
├── contract/                     [参考] 了解规则但不需要改
│   ├── rules.md                  ← 30 条强制规则
│   └── design-contract.md        ← 设计契约
│
├── domains/                      [你的主战场] ✅
│   ├── campaign/
│   │   ├── primitive.md          ← 颜色原始值
│   │   ├── semantic.md           ← 颜色→用途映射
│   │   ├── components/           ← 14 个组件规格
│   │   └── styles/               ← 9 个风格变体
│   ├── _platform/
│   │   ├── semantic.md           ← 平台共享 Token
│   │   └── components/           ← 20 个共享组件
│   ├── exchange/                 ← 18 个专属组件
│   └── web3pay/                  ← 25 个专属组件
│
├── engine/                       [不用碰] FE 维护
└── platforms/                    [不用碰] FE 维护
```

> **⚠️ 注意：**
> - ✅ `domains/` = 你拥有、可以自由编辑的文件
> - 📘 `contract/` = 参考文件，了解规则但不需要改
> - ⛔ `engine/` + `platforms/` = FE 维护的工程文件，不要碰

---

## 二、日常任务

每个任务都遵循同一个流程：**打开文件 → 编辑 → 预览 → 提交**。

### 任务 1：修改组件规格

**场景**：修改按钮、卡片、弹窗等组件的属性表和交互状态

**步骤**：

1. **打开文件**：按 `Cmd`+`P`，输入组件名（如 `button.md`），按回车
   - 文件位于 `domains/{域}/components/button.md`

2. **编辑属性表**：找到对应变体章节，修改表格

```markdown
## Primary 按钮

| 属性   | Token          | CSS             | 值      |
|--------|----------------|-----------------|---------|
| 背景色 | action.primary | var(--brand)    | #0055FF |
| 文字色 | text.inverse   | var(--text-inv) | #FFFFFF |
| 圆角   | radius.button  | var(--r-btn)    | 8px     |
```

3. **预览效果**（可选）：终端运行 `/ui-craft --preview button`

4. **提交修改**：参考下方「Git 生存指南 → 提交修改」

---

### 任务 2：修改风格文件

**场景**：调整某个活动风格的颜色变量、布局差异

**步骤**：

1. **打开风格文件**：`Cmd`+`P` 搜索风格名（如 `competition.md`）
   - 文件位于 `domains/campaign/styles/competition.md`

2. **修改区块 3 — CSS 变量表**：风格文件有 6 个区块，你最常改的是区块 3

3. **生成测试页面**：终端运行 `/ui-craft --style competition`
   - 按 `Cmd`+`D` 打开设计面板实时调参

4. **导出 & 提交**：设计面板中点击「导出 → Style MD」，粘贴回区块 3，然后提交

---

### 任务 3：修改 Token

**场景**：更新颜色色板、语义映射、间距/圆角基准

**步骤**：

1. **确定要改的 Token 类型**：
   - **颜色原始值** → `domains/{域}/primitive.md`
   - **颜色→用途映射** → `domains/{域}/semantic.md`
   - **平台共享 Token** → `domains/_platform/semantic.md`

2. **编辑 & 预览 & 提交**：修改对应值 → `/ui-craft --ds status` 检查全局影响 → 提交

---

### 任务 4：新建组件

**步骤**：

1. **创建草案文件**：
   ```bash
   /ui-craft --new-component reward-card --domain campaign
   ```
   自动生成 `domains/campaign/components/reward-card.md`，标题标注 `[DRAFT]`

2. **填写规格**：按模板填写组件结构树、Token 映射表、交互状态矩阵、数据接口

3. **预览迭代**：`/ui-craft --preview reward-card` → 浏览器验证 → 改规格 → 再 preview → 循环

4. **定稿 & 提交**：去掉标题中的 `[DRAFT]`，提交修改

---

### 任务 5：新建风格

**步骤**：

1. **从模板创建**：
   ```bash
   /ui-craft --new-style summer-fest
   # 或从已有风格 fork
   /ui-craft --new-style summer-fest --from default
   ```

2. **填写 6 个区块**：元信息 → 风格画像 → CSS 变量表 → 布局结构 → 组件变体 → 自检
   - 快捷方式：先 `/ui-craft --style default` 生成页面，用设计面板调参后导出

3. **提交**：确认效果后提交新文件

---

## 三、Git 生存指南（只需要学 5 个操作）

> Git 是版本管理工具，类似"有历史记录的网盘"。你不需要理解所有概念，只要会下面 5 个操作就够了。

### 操作 1：拉取最新代码

**每次开始工作前**，先同步别人的最新改动：

```bash
git pull
```

看到 `Already up to date.` 或文件变更列表就说明成功了。

---

### 操作 2：创建分支

分支 = 你的独立工作空间，不影响主线。**每次改动前创建新分支**：

```bash
# 分支命名规则：design/你要做的事
git checkout -b design/update-button-spec
```

**命名建议**：
- 改组件 → `design/update-{组件名}-spec`
- 改风格 → `design/update-{风格名}-style`
- 新建   → `design/add-{名称}`

---

### 操作 3：提交修改

提交 = 保存一个存档点，附带一句描述。

#### 方式 A：Cursor 图形界面（推荐）

1. 点击左侧栏的 **源代码管理图标**（分叉的树形图标，第三个）
2. 看到改过的文件列表，点击文件旁边的 **+** 号暂存（stage）
3. 在顶部输入框写一句描述，如：`design: update button hover state`
4. 点击 **✓ 提交** 按钮

#### 方式 B：终端命令

```bash
# 暂存你改过的文件
git add domains/campaign/components/button.md

# 提交并写描述
git commit -m "design: update button hover state spec"
```

**提交描述格式**：`design: 简述你的修改`（英文）

示例：
- `design: add vip-gold-prestige style`
- `design: update card component radius`
- `design: fix hero gradient token mapping`

---

### 操作 4：推送 & 创建 PR

推送 = 把你的修改上传到远程仓库。PR（Pull Request）= 请求合并到主线。

```bash
# 推送到远程
git push -u origin design/update-button-spec
```

**创建 PR（在 GitHub 网页上）**：

1. 推送后，终端会显示一个链接，点击即可在浏览器打开
2. 或者打开 GitHub 仓库页面，会看到黄色横幅 "Compare & pull request"，点击
3. 填写 PR 标题和描述，说明你改了什么
4. 点击 **Create pull request**
5. 通知 FE 同事 review

---

### 操作 5：解决冲突

当你和别人同时改了同一个文件，git 不知道用谁的版本，就会产生冲突。**别慌**，很少遇到。

冲突文件中会出现 **Git 插入的三段标记**（当前分支名 / 分隔线 / 对方分支名），中间夹着两套内容，例如同一表格行里颜色值不同：

- 你的版本：`#0068FF`
- 对方版本：`#0055FF`

**在 Cursor 中解决**：

1. Cursor 会显示 **Accept Current**（保留你的）/ **Accept Incoming**（用别人的）/ **Accept Both**（都要）按钮
2. 选择正确的版本
3. 保存文件，然后提交

> **⚠️ 注意：** 如果不确定怎么解决，直接找 FE 同事帮忙。不要强行提交有冲突标记的文件。

---

## 四、协作流程

### 三方协作时序

```
产品 PM                  设计师 UI（你）              前端 + AI
  │                          │                          │
  ├─ 1. 提需求/选风格 ──────→│                          │
  │                          ├─ 2. 创建/选择 style ─────→│
  │                          │   git commit → push → PR  │
  │                          │                          ├─ 3. 加载 rules.md
  │                          │                          ├─ 4. 加载你的 Token + 组件
  │                          │                          ├─ 5. 生成代码 + R1-R30 自检
  │                          │                          │
  │                          ├─ 6. 校准验收 ←────────────┤
  │                          │   L1色彩→L4动效            │
  │                          │                          ├─ 7. 根据反馈修正代码
  │                          │                          │    (最多3轮)
  ├─ 8. 业务验收 ←───────────┤                          │
  │                          │                          │
```

### 校准验收

FE/AI 生成页面后，你按 4 个层级从严到宽验收：

| 层级 | 检查什么 | 通过条件 |
|------|---------|---------|
| L1 色彩 | 背景色、强调色、渐变 hex 值 | 0 差异（严格匹配） |
| L2 布局 | 模块间距、圆角、栅格对齐 | 最多 1 处差异 |
| L3 组件 | 按钮/卡片/Tab 样式细节 | 最多 2 处差异 |
| L4 动效 | hover 效果、过渡动画 | 最多 2 处差异 |

**校准步骤**：

1. 打开 FE 生成的 HTML 页面
2. 按 `Cmd`+`D` 打开设计面板 → 上传参考截图
3. 从 L1（色彩）到 L4（动效）逐层检查
4. 发现差异 → 记录并反馈给 FE/AI
5. 最多 3 轮修正，超出则标记待修复项

---

## 五、速查卡片

### 文件归属表

| 你要做什么 | 文件位置 |
|-----------|---------|
| 改按钮/卡片/弹窗等组件 | `domains/{域}/components/{组件}.md` |
| 改颜色原始值 | `domains/{域}/primitive.md` |
| 改颜色→用途映射 | `domains/{域}/semantic.md` |
| 改平台共享 Token | `domains/_platform/semantic.md` |
| 新建/改风格 | `domains/campaign/styles/{风格名}.md` |
| 看风格模板 | `domains/campaign/styles/_template.md` |
| 看强制规则 | `contract/rules.md` |
| 看设计契约 | `contract/design-contract.md` |
| 看图标库 | `engine/reference/icons.md` |

### 命令速查

| 场景 | 命令 | 说明 |
|------|------|------|
| 开工前同步 | `git pull` | 拉取最新改动 |
| 创建分支 | `git checkout -b design/xxx` | 创建并切换到新分支 |
| 暂存文件 | `git add 文件路径` | 标记要提交的文件 |
| 提交 | `git commit -m "描述"` | 保存存档点 |
| 推送 | `git push -u origin 分支名` | 上传到远程 |
| 查看状态 | `git status` | 看哪些文件改了 |
| 切换分支 | `git checkout main` | 回到主线 |
| 预览组件 | `/ui-craft --preview 组件名` | 在浏览器预览 |
| 生成页面 | `/ui-craft --style 风格名` | 生成完整页面 |
| 设计系统概览 | `/ui-craft --ds status` | 查看全局状态 |

### 常见问题

**Q：我不确定该改哪个文件怎么办？**

用 `Cmd`+`P` 搜索关键词。比如想改按钮，搜 `button.md`。如果有多个结果，看文件路径中的域名（campaign / exchange / web3pay）选择你要改的业务线。实在不确定就问 FE 同事。

**Q：我改错了文件想撤销怎么办？**

- **还没提交**：右键文件 → Discard Changes（放弃修改）
- **已经提交了**：找 FE 同事帮忙用 `git revert` 撤销

**Q：Push 时报错 "rejected" 怎么办？**

通常是因为远程有新改动。先执行 `git pull --rebase`，然后再 `git push`。如果出现冲突，参考上面的「解决冲突」章节。

**Q：我在 Figma 更新了 Token，怎么同步到仓库？**

1. 在 Figma 中导出 W3C Design Tokens JSON
2. 更新 `domains/{域}/primitive.md` 或 `domains/{域}/semantic.md` 中对应的值
3. 用 `/ui-craft --ds status` 检查全局影响
4. 提交修改 + 创建 PR

**Q：提交描述怎么写才规范？**

格式：`design: 简述修改内容`（英文）。示例：
- `design: update button hover state spec`
- `design: add cny-festive-red style`
- `design: fix card radius token mapping`

**Q：我需要改 engine/ 或 platforms/ 下的文件吗？**

**不需要**。这些是 FE 维护的工程文件。你只需要编辑 `domains/` 目录下的文件。
