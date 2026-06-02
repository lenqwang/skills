---
home_skill: origin
purpose: /origin --connect 代码仓连接模式流程，生成 .ray/config.yaml，clone 文档仓
---

# origin --connect — 连接代码仓模式

<HARD-GATE>
仅在代码仓中执行（非文档仓）。检测到已有 `.ray/config.yaml` → 提示已连接，是否重新配置。
</HARD-GATE>

## 流程

```
/origin --connect git@github.com:acme/acme-docs.git
  1. 检测是否已有 .ray/config.yaml
     → 已有：展示当前配置，询问 "已连接到 {docs_url}，是否重新配置？(y/n)"
     → n：退出
  2. clone 文档仓到临时目录，读取 PRODUCT-MAP.md 提取 product 名
     → clone 失败：报错 "无法访问 {docs_url}，请检查地址和权限"
     → PRODUCT-MAP.md 不存在：报错 "目标仓库不是有效的 ray 文档仓（缺少 PRODUCT-MAP.md），请先运行 /origin --docs"
  3. 从 git remote 推导 repo_id：
     git remote get-url origin → 提取仓库名 → 去掉 org 前缀
     如 git@github.com:acme/acme-web.git → web
  4. 展示推导结果，确认：
     "检测到：
      product: {product}
      repo_id: {repo_id}
      docs_url: {docs_url}
      确认？(y/n，或输入修正值)"
  5. 创建 .ray/ 目录（如不存在）
  6. 生成 .ray/config.yaml：
     ```yaml
     product: {product}
     repo_id: {repo_id}
     docs_url: {docs_url}
     ```
  7. 追加 .ray/docs/ 到 .gitignore（如不存在该行）
  8. 将临时 clone 移动到 .ray/docs/（或删除临时 clone 重新 clone 到 .ray/docs/）
  9. 扫描代码中的 API 路由定义（Express routes / Next.js API routes / Spring annotations 等）
     → 如发现已有 API，生成 contracts/{module}/paths/{resource}.yaml 骨架
     → 展示骨架列表，询问 "是否写入文档仓的 contracts/ 目录？(y/n)"
     → y：写入并 commit + push 到文档仓
     → 如未发现或用户跳过，不生成
  10. 输出：
      "连接成功！
       配置：.ray/config.yaml
       文档仓：.ray/docs/

       请提交配置：
         git add .ray/config.yaml .gitignore
         git commit -m 'chore: connect to ray docs repo'

       之后团队其他人 clone 本仓即可直接使用 ray。"
```
