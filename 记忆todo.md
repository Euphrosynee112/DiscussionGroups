# 记忆系统 v2 TODO

更新时间：2026-04-20

## 当前定位

v1 已经把“记忆从本地缓存升级到数据库”这条主线跑通：

- 记忆主表、事件表、运行态表、策略表已经落到 Postgres。
- 本地旧记忆可以导入云端。
- prompt 已经优先读取云端记忆，旧缓存兜底。
- AI 提取结果可以按新结构落库、合并。
- 记忆支持 `active / faint / dormant / archived / superseded` 状态。
- 衰减参数文件、手动重算接口、自动衰减 worker 已经接入。
- 进入 prompt 的云端记忆会写回 `recalled`。
- `summary_faint` 的生成规则已改成第三人称，优先使用角色名和用户名。

v2 的目标不是重新建一套系统，而是在 v1 基础上让记忆更像长期运行系统：

- 更聪明地想起旧记忆。
- 更稳定地遗忘和恢复。
- 更容易观测、调参、排查和修复。

---

## v2 总目标

### 1. Cue 召回

让 `dormant` 记忆在平时不进 prompt，但当当前聊天出现强线索时，可以被临时召回。

目标效果：

- 用户突然提到旧地点、旧物品、旧关系、旧事件时，角色能自然想起相关旧印象。
- 被 cue 召回的记忆进入 prompt 后，要写 `memory_events(recalled)`。
- 事件里要能看出这次召回是因为 cue，而不是普通 active/faint prompt 读取。

### 2. 衰减观测

让自动衰减 worker 不只是“在跑”，而是能看出跑得是否正常。

目标效果：

- 可以看到最近一次 worker 跑了多少条、改了多少状态、有无报错。
- 可以看到当前各状态记忆数量。
- 可以看到待衰减队列大概还有多少。
- 可以抽样查看最近状态变化事件。

### 3. Prompt 策略可控

让 `active / faint / dormant` 进入 prompt 的数量、表达和优先级更可调。

目标效果：

- `active` 仍然是清楚记得。
- `faint` 使用模糊摘要。
- `dormant` 只有 cue 命中才进入。
- 进入 prompt 后要能追踪这条记忆为什么被选中。

### 4. 质量回归

让记忆内容质量可以持续检查，避免坏格式重新进入数据库。

目标效果：

- 可以检查 `summary_faint` 是否还有“你隐约记得”。
- 可以检查是否还有 `你 / 我 / 他 / 她 / 用户 / 联系人` 这类易歧义指代。
- 可以检查空摘要、超长摘要、疑似占位符泄漏。
- 可以抽样输出问题项，方便人工修复。

### 5. 人工排查

让单条记忆和单个角色的记忆状态更容易追溯。

目标效果：

- 能看某角色当前各状态记忆数量。
- 能看某条记忆的事件流水、运行态分数、最近召回原因。
- 后续如需 UI，只调后端接口，不让前端直连数据库。

---

## v2.1 最小闭环

### 目标

先不做复杂 UI，不引入 Python worker，不重构现有表结构。只在现有 Node 后端和 prompt 装配基础上补齐最小可用能力。

### TODO

- [x] 1. 更新 v2 TODO 文档，明确当前阶段目标。
- [x] 2. 增强 dormant cue 召回的匹配信息。
  - 当前已能按 `keywords / entity_refs` 做 cue 匹配。
  - 本阶段补充：从 `canonical_text / summary_short / summary_faint` 派生候选 cue，避免旧数据关键词不足时完全召回不到。
- [x] 3. 区分普通 prompt 召回和 cue 召回事件。
  - `active / faint` 普通进入 prompt：继续记为普通 prompt 使用。
  - `dormant` 因 cue 命中进入 prompt：事件 `reason_code` 使用 `prompt_memory_cue_recall`。
  - 事件 `delta_payload` 里保留 `cueTerms / cueScore / cueThreshold`。
- [x] 4. 增加记忆运行观测接口。
  - 返回各状态数量。
  - 返回待衰减数量。
  - 返回最近衰减 worker 状态。
  - 返回最近状态变化事件抽样。
- [x] 5. 增加 `summary_faint` 质量检查接口。
  - 检查坏前缀。
  - 检查易歧义指代。
  - 检查空摘要。
  - 检查超长摘要。
  - 返回计数和少量样本。
- [x] 6. 做最小手测说明。
  - 本地或 Fly 上用 `/api/health` 看 worker。
  - 用 `/api/memory/diagnostics` 看状态数量、待衰减数量、最近事件和 worker 状态。
  - 用 `/api/memory/quality/summary-faint` 看 `summary_faint` 质量检查结果。
  - 用聊天上下文触发 dormant cue 后，看 `memory_events` 是否写入 `prompt_memory_cue_recall`。

### 本轮已落地说明

- `messages.js` 已补充从 `canonical_text / summary_short / summary_faint` 派生 cue 候选词。
- 云端记忆拉取已改为按状态分批获取，避免 `active` 数量过多时把 `dormant` 挤出缓存。
- `dormant` 记忆因 cue 进入 prompt 时，会用 `reasonCode = prompt_memory_cue_recall` 写入 recall 事件。
- recall 事件会额外携带 `cueTerms / cueScore / cueThreshold / statusBeforeRecall`。
- 后端新增 `/api/memory/diagnostics`，用于查看记忆运行状态。
- 后端新增 `/api/memory/quality/summary-faint`，用于检查模糊摘要质量。
- 后端已补 `summary_faint` 自动兜底：创建、合并强化、状态衰减到 `faint/dormant` 时，会自动生成或重建模糊摘要，避免以后再出现大批空值或旧坏格式回流。

---

## v2.2 Cue 召回调参

- [x] 1. 统计 cue 命中的准确率。
- [x] 2. 分离强 cue 和弱 cue。
- [x] 3. 给 `memory_type` 增加不同 cue 权重。
- [x] 4. 给近期聊天中的用户显式关键词更高权重。
- [x] 5. 处理同义词和别名。
- [x] 6. 避免过泛关键词误召回。
- [x] 7. 给 dormant 召回设置更合理的上限和冷却。

### 本轮已落地

- `messages.js` 已补 `cueStrength` 与 `cueSources`。
- cue 来源已细分为 `explicit / derived / alias / recent_user`。
- 已增加固定别名组与过泛词过滤，避免 `喜欢 / 印象 / 关系 / 聊天 / 记得 / 似乎` 一类词单独误召回。
- 已给 `relationship / preference / constraint / habit / fact / event / scene` 接上不同 cue 权重。
- dormant 记忆已增加 6 小时冷却，冷却期内需要更高 cue 分才再次进入 prompt。
- prompt recall 写回事件已补 `cueStrength / cueSources / cooldownApplied`。

---

## v2.3 衰减策略调参

- [x] 1. 观察各类型记忆从 `active -> faint -> dormant -> archived` 的实际速度。
- [x] 2. 针对 `relationship / preference / habit / constraint / fact / event / scene` 分别调半衰期。
- [x] 3. 检查高情绪强度记忆是否保持过久。
- [x] 4. 检查低重要度 scene 是否衰减过慢。
- [x] 5. 检查 prompt recall boost 是否导致记忆过度复活。
- [x] 6. 增加每次 worker run 的汇总留痕。
- [x] 7. 后续再评估是否拆 Python worker。

### 本轮已落地

- 后端新增 `GET /api/memory/decay-report`。
- `decay-report` 已返回：
  - 当前各状态数量
  - 各 `memory_type` 的状态分布
  - 最近 `status_changed / decayed` 样本
  - 最近 worker run 摘要
  - 近期被 prompt recall boost 的记忆数量
- memory decay worker 每次跑完后，会把 run 摘要写入 `migration_runs(type='memory_decay_worker')`。
- 这一轮只做观测，不改 `messages-memory-decay-config.js` 的半衰期和阈值常量。

---

## v2.4 记忆质量回归

- [x] 1. 把 `summary_faint` 检查变成固定回归项。
- [x] 2. 检查 `canonical_text / summary_short / summary_faint` 是否人称一致。
- [x] 3. 检查重复记忆和高度相似记忆。
- [x] 4. 检查 `semantic_key` 质量。
- [x] 5. 检查关键词和实体词是否为空或过泛。
- [x] 6. 检查 `emotion_profile / interaction_tendency` 是否为空壳。
- [x] 7. 输出可人工修复的样本列表。

### 本轮已落地

- 保留原有 `GET /api/memory/quality/summary-faint`。
- 新增聚合接口 `GET /api/memory/quality/report`。
- `quality/report` 当前会暴露：
  - `summary_faint` 坏前缀
  - 易歧义指代
  - 占位符泄漏
  - `faint / dormant` 空 `summary_faint`
  - 过长 `summary_faint`
  - 弱 `semantic_key`
  - 高相似重复记忆
  - `keywords / entity_refs` 为空或过泛
  - `emotion_profile / interaction_tendency` 空壳率
- 本轮不自动修库，只做只读回归与样本暴露。

---

## v2.5 人工排查与管理

- [x] 1. 增加按角色查看状态分布的接口。
- [x] 2. 增加按角色查看最近 recalled / decayed / status_changed 事件的接口。
- [x] 3. 增加单条记忆诊断接口。
- [x] 4. 支持人工 archive / reinforce / edit 的最小安全入口。
- [x] 5. 后续再评估是否做前端管理 UI。

### 本轮已落地

- 新增 `GET /api/memory/items/:id/diagnostics`。
- 新增 `GET /api/memory/contacts/:contactId/diagnostics`。
- 单条诊断会返回：
  - `item / runtimeState / debugPayload`
  - 最近事件
  - recall / decay / status_changed 摘要
  - 当前 prompt 可进入性判断
  - 当前质量检查结果
  - 同角色疑似相似记忆样本
- 角色诊断会返回：
  - 各状态数量
  - 各 memory type 数量
  - 最近生命周期事件
  - dormant 候选数量
  - 当前质量回归结果
- 继续沿用已有最小管理入口：
  - `PATCH /api/memory/items/:id`
  - `POST /api/memory/items/:id/reinforce`
  - `GET /api/memory/items/:id/events`

---

## v2.6 Prompt 策略优化

- [x] 1. 给 prompt 中不同层级的记忆增加更稳定的文字模板。
- [x] 2. 让 `faint` 更像“残留印象”，但不再使用第二人称。
- [x] 3. 让 `dormant` 明确是“被当前话题勾起的旧印象”。
- [x] 4. 观察不同记忆数量对回复质量的影响。
- [x] 5. 给主动消息场景和普通聊天场景设置不同记忆预算。

### 本轮已落地

- prompt 分层标题已统一为：
  - `清楚记得的部分`
  - `只保留模糊印象的部分`
  - `被当前话题线索勾起的旧印象`
- `faint` 与 `dormant` 正文继续直接使用数据库第三人称文本，不再追加第二人称包装语。
- 已增加预算选择：
  - 普通聊天继续沿用当前 active / faint / dormant 上限
  - 主动消息会降低 scene 与 faint 使用量，并把 dormant 总量限制到最多 1 条
- prompt recall 事件继续写回，方便后续对比普通聊天和主动消息场景的记忆使用差异。

---

## 暂不做

- 暂不做记忆 UI 大改。
- 暂不把参数写进 settings。
- 暂不让前端直连数据库。
- 暂不把 Node worker 立即替换成 Python worker。
- 暂不引入多用户 `user_id` 模型。

---

## 下一步建议

1. 先用真实聊天样本继续观察 `cue-recall-report`，确认强 / 弱 cue 阈值是否需要二次微调。
2. 再结合 `decay-report` 的真实分布，决定是否调整半衰期和状态阈值常量。
3. 如果后续要继续提升人肉排查效率，再考虑是否补一个轻量前端诊断入口。
