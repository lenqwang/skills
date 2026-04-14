# Style 目录说明

本目录存放 `ui-craft` Campaign 业务线的风格实例和标准模板。

## 目录角色

- `default.md`：默认风格（必须存在，是其他风格的继承源）
- `*.md`：其他可复用风格实例（如 `competition.md`）
- `_template.md`：新建风格的唯一标准模板（6 区块）

## 继承模式（Delta）

风格文件通过 `inherits` 字段声明继承方式：

| inherits 值 | 含义 | 适用场景 |
|-------------|------|----------|
| `default` | 仅列差异项，未列变量从 default.md 继承 | 与 default 重叠 >60% |
| `none` | 完整独立定义，不继承任何 style | 与 default 重叠 <50%（如节日主题） |
| `<style-name>` | 基于指定 style 的差异 | 某 style 的微调版 |

**覆盖优先级**（从高到低）：

```
当前 style 的显式定义
  ↓ 覆盖
inherits 源（如 default.md）
  ↓ 覆盖
../semantic.md 默认值
```

**最小变量集**（不允许 `unset`）：
`--bg`, `--bg-card`, `--text-primary`, `--text-secondary`, `--brand`, `--border`

## 不可覆盖边界（强制）

所有 style 文件必须遵守以下边界：

1. 不可覆盖 `R1-R30` 规则及规则关系（以 `contract/rules.md` 为准）
2. 不可在 style 中硬编码规则值替代规则引用
3. 不可绕过主流程的输出前强制检查

## 风格文件结构（必须 6 区块）

所有 style 必须遵循 `_template.md` 的固定结构与顺序：

1. 区块 1：元信息（含 `inherits` 字段）
2. 区块 2：风格画像
3. 区块 3：CSS 变量表（delta 模式只列差异项）
4. 区块 4：布局结构
5. 区块 5：组件变体
6. 区块 6：适用性 & 自检

缺失项请填"无"或"同默认"，不要删除区块标题。

## 命名规范

1. 文件名使用 `kebab-case`（如 `vip-warm-elite.md`）
2. 文件名与区块 1 中 `name:` 字段保持一致（不含 `.md`）
3. 避免中文文件名与空格

## 使用与生命周期

### 复用已有风格

```bash
/ui-craft --style <style-name>
```

### 生成/迭代风格（校准）

```bash
/ui-craft --calibrate <url-or-image> [--name <style-name>]
```

校准通过后，风格会沉淀为 `styles/{name}.md`，可被后续任务直接复用。

## 添加新风格（推荐流程）

```bash
# 从模板创建
/ui-craft --new-style <name>

# 从已有风格 fork
/ui-craft --new-style <name> --from competition
```

1. 基于 `_template.md` 创建新文件
2. 设置 `inherits` 字段（>60% 重叠用 `default`，<50% 用 `none`）
3. 按 6 区块填写内容（delta 模式只列差异项）
4. 运行 `/ui-craft --style <new-style>` 验证可用性
5. 可选：用校准流程微调

## 最小自检清单（提交前）

- [ ] 6 区块完整且顺序正确
- [ ] `inherits` 字段已设置
- [ ] delta 模式下最小变量集全部存在（显式或继承）
- [ ] 所有 `unset` 变量已确认无组件引用
- [ ] 未覆盖 `R1-R30`，未硬编码规则值
- [ ] 区块 6 的适用/不适用场景已填写
- [ ] 已可通过 `/ui-craft --style <style-name>` 调用

## 已有风格

| 风格 | 继承 | 适用场景 |
|------|------|----------|
| `default` | — | 通用活动页 |
| `competition` | default | 交易竞赛 / 排行榜活动 |
| `vip-warm-elite` | default | VIP 专属活动（暖色调） |
| `vip-gold-prestige` | — | VIP 尊享（金色系） |
| `cny-festive-red` | — | 春节 / 节庆活动 |
| `ai-product-landing` | — | AI 产品落地页 |
| `dev-portal` | — | 开发者门户 |
| `13th-anniversary-celebration` | — | 13 周年庆 |
| `gate-ai-clean` | — | Gate AI 清爽风 |
