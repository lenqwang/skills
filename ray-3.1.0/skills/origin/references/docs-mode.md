---
home_skill: origin
purpose: /origin --docs 文档仓初始化模式流程 + PRODUCT-MAP / TECH-MAP 骨架模板
---

# origin --docs — 文档仓初始化模式

<HARD-GATE>
仅在空 git 仓中执行。检测到非空仓 → 报错退出。
</HARD-GATE>

## 流程

```
/origin --docs
  1. 检测当前目录是否为空 git 仓（除 .git 和 README.md 外无其他文件）
     → 非空：报错 "当前仓库非空，/origin --docs 仅在空仓中执行"
  2. 提问产品名：
     "请输入产品标识（如 acme）："
  3. 询问是否需要技术架构文档：
     "是否需要 tech/ 目录（技术架构、服务拓扑、ADR）？(y/n)"
  4. 创建目录结构：
     product/
       PRODUCT-MAP.md          ← 骨架（含产品定位占位符 + 空模块索引表）
       modules/                ← 空目录
     contracts/
       shared/schemas/         ← 空目录
     traces/
       .gitignore              ← 内容：*.csv
       _archive/               ← 空目录
     如选择了 tech/：
       tech/
         TECH-MAP.md           ← 骨架（含架构风格占位符）
         runtime/
         concerns/
         decisions/
  5. git add + commit（消息："[ray] origin --docs: initialize {product} docs repo"）
  6. 推送到 remote（如配置了）
  7. 输出：
     "文档仓已创建。在各代码仓中运行以下命令连接：
      /origin --connect {当前仓 remote url}

      如果还没有 remote，请先在 GitHub/GitLab 创建仓库并推送。"
```

## PRODUCT-MAP.md 骨架

```markdown
# {product} — 产品地图

> {产品定位一句话 — 请补充}

---

## 模块索引

| 模块 | 职责 | 核心组件 | 文档 |
|------|------|---------|------|

---

_最后更新：{日期}_
```

## TECH-MAP.md 骨架（如选择创建）

```markdown
# {product} — 技术架构全景

> 架构风格：{请补充，如 BS / 微服务 / 全栈}

## 服务拓扑

{请补充}

## 技术栈总览

| 端 | 语言 | 框架 | 运行时 |
|----|------|------|--------|

---

_最后更新：{日期}_
```
