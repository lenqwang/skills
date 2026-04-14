# UI Craft 设计工具

通过分层约束体系生成符合品牌规范的高质量 UI，支持多风格预设与 Token 驱动的设计系统

## 包含的 Skills

| Skill | 说明 |
|-------|------|
| `ui-craft` | Gate UI 生成器 — 基于 3 层约束体系生成符合品牌规范的 UI |
| `html-to-next` | HTML to Next.js 高保真转换引擎 — 7 阶段分步转换 |

## 使用方式

### Claude Code

```bash
# 1. 添加 marketplace（在终端中执行）
claude plugin marketplace add https://github.com/lenqwang/skills.git

# 2. 安装（全局，所有项目可用）
claude plugin install ui-craft-plugin

# 或仅为当前项目安装
claude plugin install ui-craft-plugin --scope project
```

安装后重启 Claude Code 会话生效。

| Skill | 触发方式 | 说明 |
|-------|----------|------|
| `ui-craft` | AI 自动匹配 / `/ui-craft-plugin:ui-craft` | 生成页面或组件时自动触发 |
| `html-to-next` | AI 自动匹配 / `/ui-craft-plugin:html-to-next` | HTML 转 Next.js 时自动触发 |

### Cursor

```bash
# 1. 克隆仓库
git clone https://github.com/lenqwang/skills.git ~/.cursor/skills-ui-craft

# 2. 复制 skills 到项目
mkdir -p .cursor/skills
cp -r ~/.cursor/skills-ui-craft/ui-craft-plugin/skills/* .cursor/skills/
```

| Skill | 触发方式 | 说明 |
|-------|----------|------|
| `ui-craft` | AI 自动匹配 / `/ui-craft` | 生成页面或组件时自动触发 |
| `html-to-next` | AI 自动匹配 / `/html-to-next` | HTML 转 Next.js 时自动触发 |

> **调用方式不同**：Claude Code 使用 `/插件名:组件名`，Cursor 直接使用 `/组件名`。
