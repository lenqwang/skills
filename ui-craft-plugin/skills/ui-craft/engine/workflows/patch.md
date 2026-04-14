# Workflow: 补丁

> 覆盖命令：`--patch`、`--css-patch`、`--review-fix`

---

## 上下文加载

| 必读 | 按需读 |
|------|--------|
| `engine/code-gen/patch-workflow.md` | — |
| `contract/rules.md` | — |
| — | `engine/code-gen/guidelines.md`（Phase 2 章节，仅结构变更时） |
| — | 扫描目标目录的 `*.module.css`、`*.tsx`、i18n JSON |

---

## 增量补丁（`--patch <new-html> --target <next-component-dir>`）

解决核心痛点：HTML 更新后，已接入业务逻辑的 Next.js 代码无法重头再来。

```bash
# 完整增量补丁：比对 baseline 与新 HTML，定向更新 Next.js 代码
/ui-craft --patch <new-html> --target <next-component-dir>

# 仅 dry-run 查看变更报告，不实际修改
/ui-craft --patch <new-html> --target <next-component-dir> --dry-run

# 自动应用 CSS + i18n 变更（不逐项确认）
/ui-craft --patch <new-html> --target <next-component-dir> --auto-apply
```

完整流程见 `engine/code-gen/patch-workflow.md`。

---

## CSS 快速补丁（`--css-patch <new-html> --target <css-module-file>`）

覆盖 ~70% 的 UI 走查场景（颜色、间距、字号、圆角等视觉微调），不触碰 TSX 和业务逻辑。

```bash
/ui-craft --css-patch <new-html> --target <css-module-file>
```

仅提取 CSS 变量和样式规则差异，直接更新 `.module.css`。

---

## 走查问题交互式修复（`--review-fix`）

无新 HTML 时，根据设计师口头/文档反馈，逐项定位并修复样式问题。

```bash
# 交互式逐项修复 UI 走查问题
/ui-craft --review-fix --target <next-component-dir>

# 带参考 HTML（可自动比对差异）
/ui-craft --review-fix --target <next-component-dir> --from-html <html-file>
```

---

## 补丁后验证

补丁完成后，必须执行步骤 9 强制检查（见 `contract/verification-protocol.md`）。
Phase 2（Next.js）阶段全部 21 项检查无豁免，严格执行。
