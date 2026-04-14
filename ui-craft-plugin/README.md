# UI Craft 设计工具

通过分层约束体系生成符合品牌规范的高质量 UI，支持多风格预设与 Token 驱动的设计系统

## 包含的 Skills

| Skill | 说明 |
|-------|------|
| `ui-craft` | Gate UI 生成器 — 基于 3 层约束体系生成符合品牌规范的 UI |
| `html-to-next` | HTML to Next.js 高保真转换引擎 — 7 阶段分步转换 |

## 使用方式

### Claude Code

安装：

```
/plugin install ui-craft-plugin@aimarkt-marketplace
```

| Skill | 触发方式 | 说明 |
|-------|----------|------|
| `ui-craft` | AI 自动匹配 / `/ui-craft-plugin:ui-craft` | 生成页面或组件时自动触发 |
| `html-to-next` | AI 自动匹配 / `/ui-craft-plugin:html-to-next` | HTML 转 Next.js 时自动触发 |

### Cursor

安装（复制以下提示词，粘贴到 Cursor 的 AI 对话框）：

用户级（所有项目可用）：
```
请从以下地址获取安装提示词，并严格按照其中的步骤操作：
https://aimarkt.fulltrust.link/api/plugins/ui-craft-plugin/install-prompt?scope=user
```

项目级（仅当前项目）：
```
请从以下地址获取安装提示词，并严格按照其中的步骤操作：
https://aimarkt.fulltrust.link/api/plugins/ui-craft-plugin/install-prompt?scope=project
```

| Skill | 触发方式 | 说明 |
|-------|----------|------|
| `ui-craft` | AI 自动匹配 / `/ui-craft` | 生成页面或组件时自动触发 |
| `html-to-next` | AI 自动匹配 / `/html-to-next` | HTML 转 Next.js 时自动触发 |

> **调用方式不同**：Claude Code 使用 `/插件名:组件名`，Cursor 直接使用 `/组件名`。
