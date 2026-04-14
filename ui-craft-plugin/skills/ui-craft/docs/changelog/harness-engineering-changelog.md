# ui-craft 约束工程（Harness Engineering）优化记录

> 日期：2026-03-07
> 分支：test/ui-craft-skills

---

## 一、优化背景

ui-craft 已完成三轮基础建设：

1. Tailwind -> CSS 变量迁移
2. contract/ 目录分离（约束层与设计体系解耦）
3. 6 区块模板重构（domains/campaign/styles/_template.md 标准化）

但对照 AI 约束工程理论框架发现，当前 R1-R27 规则是**声明式**的——AI 在步骤 9 自查时只是逐项声明"通过"，缺少验证手段和修复路径。约束工程要求规则必须是"可执行的法律"，而非"靠自觉的建议"。

### Gap 分析

| Gap | 问题 | 约束工程的要求 |
|-----|------|---------------|
| G1 | ~40% 规则无机械执行手段 | 不变量必须有可执行检查逻辑 |
| G2 | 步骤 9 是 checkbox 格式，AI 只声明通过/不通过 | 需要"扫描 -> 违规报告 -> 修复 -> 重新验证"闭环 |
| G3 | 规则只说"必须做X"，不说"违反了怎么修" | 错误消息 = 修复 Prompt |
| G4 | 违规无分级，所有规则同等对待 | 区分 blocking vs warning |
| G5 | 人类 Review 发现的问题无标准化反馈路径 | 从发现 -> 归类 -> 更新规则的沉淀流程 |

---

## 二、优化内容（3 Phase）

### Phase 1: 规则增强

**目标**：每条规则从"做什么"变成"做什么 + 怎么查 + 违反了怎么修 + 严重程度"。

**改动文件**：`contract/rules.md`、`domains/campaign/styles/_template.md`

**具体变更**：

1. **顶部新增严重性分级定义**

| 级别 | 标记 | 含义 |
|------|------|------|
| blocking | `[B]` | 必须修复，存在即禁止输出 |
| warning | `[W]` | 记录不阻断，标注提醒人工关注 |

2. **R1-R27 每条规则新增三个字段**

```
### R4: 强调色使用限制 [B]    <-- 新增 severity 标记

（原有规则描述不变）

**check**: 搜索所有 var(--accent) 使用点 -> 检查对应元素是否为金额/数值  <-- 新增
**fix**: 非金额内容 -> 替换为 var(--text-primary) 或 var(--brand)          <-- 新增
```

3. **分级结果**

- **blocking [B]（16 条）**：R1, R2, R3, R4, R7, R10, R12, R13, R16, R19, R20, R23, R25, R26, R27
- **warning [W]（11 条）**：R5, R6, R8, R9, R11, R14, R15, R17, R18, R21, R22, R24

4. **自检清单同步标记**

```diff
- - [ ] 颜色/圆角通过 CSS 变量引用，无硬编码
+ - [ ] [B] 颜色/圆角通过 CSS 变量引用，无硬编码 (R1/R3/R10)
```

5. **domains/campaign/styles/_template.md 区块 6 更新**：风格特有检查项格式增加 `[B/W]` 标记说明

---

### Phase 2: 验证协议

**目标**：将步骤 9 从"checkbox 自查"升级为"结构化验证管线"。

**改动文件**：
- 新增 `contract/verification-protocol.md`
- 改 `SKILL.md`（步骤 9 + 文件索引）
- 改 `contract/design-contract.md`（SS6 引用）
- 改 `engine/code-gen/guidelines.md`（检查清单引用）

**核心设计 -- 3-Pass 验证管线**：

```
Pass 1: 静态扫描（18 项模式匹配检查）
  |
  v
Pass 2: 生成结构化违规报告（YAML 格式）
  |
  ├── PASS --> 输出代码（warnings 标注在注释中）
  └── FAIL --> Pass 3: 修复循环
                  |
                  v
               逐项修复 blocking -> 回到 Pass 1
               最多 2 轮 -> 超限暂停，报告给用户
```

**Pass 1 扫描项（18 项）**：

| # | 检查项 | 规则 | severity |
|---|--------|------|----------|
| 1 | 硬编码颜色 | R3 | [B] |
| 2 | 硬编码圆角 | R10 | [B] |
| 3 | 非 4px 间距 | R7 | [B] |
| 4 | 标题跳级 | R13 | [B] |
| 5 | 内联 style | R2 | [B] |
| 6 | emoji | R19 | [B] |
| 7 | CTA 唯一性 | R23 | [B] |
| 8 | 语义化 HTML | R27 | [B] |
| 9 | 焦点状态 | R26 | [B] |
| 10 | 最大宽度 | R16 | [B] |
| 11 | accent 使用 | R4 | [B] |
| 12 | 触摸目标 | R18 | [W] |
| 13 | 同类间距一致 | R8 | [W] |
| 14 | 同类圆角一致 | R11 | [W] |
| 15 | 字重匹配 | R14 | [W] |
| 16 | 状态色语义 | R5 | [W] |
| 17 | 响应式断点 | R17 | [W] |
| 18 | 图标尺寸 | R21 | [W] |

**Pass 2 违规报告格式**：

```yaml
verification:
  status: FAIL | PASS
  blocking:
    - rule: R3
      location: ".card { color: #0068FF }"
      fix: "替换为 color: var(--brand)"
  warnings:
    - rule: R8
      location: ".list 子元素 gap 不统一"
      fix: "统一为 gap: 24px"
```

**SKILL.md 步骤 9 改造**：

```diff
- > 完整自检清单见 contract/rules.md 的"自检清单"章节（唯一权威来源）。
- > 逐项检查，任何一项不通过即为错误。

+ > 执行 contract/verification-protocol.md 定义的验证管线。
+ > Pass 1 静态扫描 -> Pass 2 违规报告 -> Pass 3 修复循环。
+ > [B] 违规 = 阻断输出。[W] 违规 = 标注在输出中。
```

---

### Phase 3: 反馈沉淀

**目标**：建立从"人类 Review 发现问题"到"规则更新"的闭环。

**改动文件**：
- 新增 `contract/feedback-loop.md`
- 改 `SKILL.md`（末尾追加变更日志）

**三级沉淀路径**：

| 级别 | 载体 | 触发条件 |
|------|------|----------|
| Level 1 | Review 评论 / 对话记录 | 首次出现 |
| Level 2 | 更新 rules.md 的 check/fix 字段 | 同类问题出现 2 次 |
| Level 3 | 新增到 verification-protocol.md 的 Pass 1 扫描项 | 同类问题出现 3 次 |

**规则变更日志**（SKILL.md 末尾新增）：

| 日期 | 规则 | 变更 | 来源 |
|------|------|------|------|
| 2026-03-06 | R1-R27 | 全部规则新增 severity/check/fix | 约束工程改进 |
| 2026-03-06 | 新增 | verification-protocol.md | 约束工程改进 |
| 2026-03-06 | 新增 | feedback-loop.md | 约束工程改进 |

---

## 三、文件变更清单

| 文件 | 操作 | Phase |
|------|------|-------|
| `contract/rules.md` | 改写 | 1 |
| `domains/campaign/styles/_template.md` | 编辑 | 1 |
| `contract/verification-protocol.md` | **新增** | 2 |
| `SKILL.md` | 编辑（步骤 9 + 文件索引 + 变更日志） | 2+3 |
| `contract/design-contract.md` | 编辑（SS6 引用） | 2 |
| `engine/code-gen/guidelines.md` | 编辑（检查清单引用） | 2 |
| `contract/feedback-loop.md` | **新增** | 3 |

---

## 四、Gap 闭合验证

| Gap | 优化前 | 优化后 | 状态 |
|-----|--------|--------|------|
| G1: 规则无执行手段 | ~40% 规则只有描述 | 27 条规则全部有 check + fix | 已闭合 |
| G2: checkbox 自查 | AI 只声明"通过" | 3-Pass 管线（扫描 -> 报告 -> 修复循环） | 已闭合 |
| G3: 无修复路径 | 只说"必须做X" | 每条规则有 fix 字段（= 修复 Prompt） | 已闭合 |
| G4: 无分级 | 所有规则同等对待 | 16 条 [B] blocking + 11 条 [W] warning | 已闭合 |
| G5: 无反馈路径 | Review 问题未沉淀 | 三级沉淀（1 次记录 / 2 次文档化 / 3 次自动化） | 已闭合 |

---

## 五、架构演进对比

### 优化前

```
contract/rules.md (声明式规则)
    |
    v
SKILL.md 步骤 9 (checkbox 自查)
    |
    v
输出代码 (AI 自称全部通过)
```

### 优化后

```
contract/rules.md (每条规则: severity + check + fix)
    |
    v
contract/verification-protocol.md (3-Pass 管线)
    |
    ├── Pass 1: 静态扫描 (18 项模式匹配)
    ├── Pass 2: YAML 违规报告 (blocking/warnings 分离)
    └── Pass 3: 修复循环 (最多 2 轮, 超限暂停)
    |
    v
输出代码 ([B] 全部修复, [W] 标注提醒)
    |
    v
contract/feedback-loop.md (人类 Review -> 规则沉淀闭环)
```

---

## 六、后续可扩展方向

1. **工具化验证**：将 Pass 1 的 18 项检查抽取为可执行脚本（如 Node.js lint 插件），实现真正的机器自动扫描
2. **违规统计仪表盘**：累计 Pass 2 报告数据，分析高频违规规则，针对性强化
3. **规则权重动态调整**：根据历史违规频率，自动将高频 [W] 升级为 [B]
4. **多 style 回归验证**：每次规则变更后，对已有 domains/campaign/styles/*.md 进行回归扫描
