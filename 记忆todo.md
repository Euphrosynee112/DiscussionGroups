# 记忆系统 TODO

更新时间：2026-04-16

## 目标

- 把当前前端本地缓存记忆升级为可落数据库、可回放、可调参的记忆系统。
- 让“遗忘”从现在的固定保留天数，升级成更接近遗忘曲线的状态衰减。
- 支持“清楚记得 / 有一点印象 / 基本休眠 / 归档保留”这类层级，而不是只有保留或删除。
- 预留 Python 算法 worker，用于离线重算、实验调参和定时任务；在线读写仍优先走现有后端。

## 当前已确认结论

- 存储层优先使用 Postgres。
- 在线接口优先由现有 Node 后端提供。
- 记忆算法层允许使用 Python worker 实现，不直接塞进实时聊天热路径。
- 第一版按“单用户、多角色”模型设计，暂不引入 `user_id`。
- 当前先做设计与表结构，不动业务代码。

## 当前推进位置

- 当前已完成：Step 1 ~ Step 12 设计冻结，业务代码已开始落地。
- 当前已落地：
  - 记忆表与运行态表已接入数据库
  - 本地旧记忆已支持导入云端
  - prompt 已优先读取云端记忆，旧缓存兜底
  - 提取结果已支持按新结构落库与合并
  - 衰减参数文件已独立落出
  - 手动衰减重算接口已接通
  - prompt 已按 `active / faint / dormant` 分层装配
  - 真正进入 prompt 的云端记忆已开始写回 `recalled`
  - 后端已接入自动定时衰减 worker
- 下一步：继续推进 cue 召回调参与更稳定的自动化运行观测。

## 总 TODO

- [x] 1. 冻结记忆状态机
- [x] 2. 冻结情绪字段设计
- [x] 3. 冻结记忆主表字段
- [x] 4. 设计事件流水表 `memory_events`
- [x] 5. 设计运行态表 `memory_runtime_state`
- [x] 6. 设计策略表 `memory_policies`
- [x] 7. 定义提取输出协议
- [x] 8. 定义合并规则
- [x] 9. 定义衰减算法第一版
- [x] 10. 定义 prompt 装配规则
- [x] 11. 定义迁移方案
- [x] 12. 定义服务边界

---

## Step 1：记忆状态机

### 1.1 状态定义

#### `active`

- 角色对这条记忆仍然“清楚记得”。
- 可以完整进入 prompt。
- 适合核心关系、长期偏好、近期高强度事件。

#### `faint`

- 角色对这条记忆不再是完整回忆，但仍有“有一点点印象”。
- 不直接给完整原文，优先给模糊摘要。
- 这是本次方案里最重要的新层。

#### `dormant`

- 平时不主动进入 prompt。
- 只有当当前对话 cue 很强时，才允许被重新召回。
- 适合旧事件、弱情景记忆、久未强化的关系细节。

#### `archived`

- 默认不参与 prompt。
- 仍保留在数据库中，不做物理删除。
- 供回放、人工查看、后续重新激活使用。

#### `superseded`

- 被更新版本覆盖，但旧版本仍保留。
- 主要用于“旧说法被新事实取代”的场景。
- 暂不进入第一版 prompt 选择逻辑，但建议在表设计里预留。

### 1.2 状态流转原则

- 新提取或手动新增的记忆，默认从 `active` 开始。
- 随时间推移与缺少强化，状态应优先按 `active -> faint -> dormant -> archived` 衰减。
- 若记忆被重新提及、被系统召回、被用户确认，应允许从 `faint/dormant` 回升到更高状态。
- `superseded` 不属于自然遗忘链，而是由冲突更新或人工覆盖触发。

### 1.3 Prompt 装配含义

- `active`：允许完整进入 prompt。
- `faint`：只给模糊版摘要，表达成“你隐约记得 / 你似乎对这件事有印象”。
- `dormant`：默认不进 prompt，只在高 cue 匹配时使用。
- `archived` / `superseded`：默认不进 prompt。

---

## Step 1：情绪字段规范

### 2.1 已否决方案

- 不采用单一 `emotion_valence` 作为核心字段。
- 原因：聊天记忆里的情绪很少是单轴正负，更常见的是混合情绪与混合互动倾向。

### 2.2 当前确定字段

#### `emotion_intensity`

- 类型建议：`FLOAT`
- 含义：这条记忆整体带来的情绪波动强度，范围建议 `0 ~ 1`

#### `emotion_profile`

- 类型建议：`JSONB`
- 含义：多标签情绪画像，允许并存多种情绪
- 示例：
  - `{"委屈": 0.62, "想念": 0.48, "防备": 0.21}`

#### `interaction_tendency`

- 类型建议：`JSONB`
- 含义：这条记忆会把角色往什么互动方向推动
- 示例：
  - `{"靠近": 0.55, "试探": 0.44, "回避": 0.18, "确认关系": 0.31}`

#### `emotion_summary`

- 类型建议：`TEXT`
- 含义：给 prompt 或调试用的人类可读总结
- 示例：
  - `她对这件事仍有一点委屈，但不是纯粹排斥，更像带着在意和试探。`

### 2.3 可选字段

#### `arousal_level`

- 类型建议：`FLOAT`
- 含义：情绪唤起程度，表示更偏平静、紧张还是激动
- 第一版不是必须，但可以预留

### 2.4 使用原则

- 衰减算法里，`emotion_intensity` 可以作为加权项，影响稳定度增长和遗忘速度。
- `emotion_profile` 更适合做“这条记忆是什么感觉”的描述。
- `interaction_tendency` 更适合做“这条记忆会如何改变角色对用户的反应方式”的描述。
- `emotion_summary` 不作为算法主输入，更偏向 prompt 与人工审核。

---

## Step 2：`memory_items` 主表字段冻结

### 3.1 这张表承担什么职责

- `memory_items` 是“当前记忆实体表”。
- 一条记录表示：某个角色当前仍然持有的一条记忆实体。
- 这张表保存“当前版本”的记忆，不负责保存完整历史；历史变化后面放到 `memory_events`。
- 这张表保存“业务语义 + 当前生命周期状态”，不放高频重算的运行态分数；这些后面放到 `memory_runtime_state`。

### 3.2 字段冻结原则

- 主表优先放“稳定事实”，不要把每轮都可能变化的算法中间值塞进来。
- 第一版先兼容当前项目按 `contactId` 组织记忆的方式，所以 `contact_id` 是核心外键之一。
- 为了后续脚本化处理方便，字段类型优先用 `TEXT / JSONB / FLOAT / TIMESTAMPTZ`，少用难迁移的强枚举。
- “完整记忆 / 清晰摘要 / 模糊印象”分三层存储，方便后续 prompt 装配直接选用。

### 3.3 建议字段

| 字段名 | 类型建议 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | `UUID` | 是 | 主键，记忆实体唯一 ID |
| `contact_id` | `TEXT` | 是 | 该记忆归属的角色 ID，对齐现有 `contactId` |
| `scope_type` | `TEXT` | 是 | 记忆作用域，第一版建议 `contact / global / thread / scene` |
| `source_conversation_id` | `TEXT` | 否 | 主要来源会话 ID；便于回溯来源，但不要求唯一 |
| `memory_type` | `TEXT` | 是 | 一级类型，如 `fact / preference / relationship / event / scene / habit / constraint` |
| `memory_subtype` | `TEXT` | 否 | 二级细分类型，后面可按脚本规则继续扩 |
| `semantic_key` | `TEXT` | 否 | 语义归并键，用于后续“同一记忆是否要合并/覆盖” |
| `canonical_text` | `TEXT` | 是 | 这条记忆最完整、最中性的规范表达 |
| `summary_short` | `TEXT` | 否 | 清晰版短摘要，用于 `active` 状态 prompt |
| `summary_faint` | `TEXT` | 否 | 模糊版印象摘要，用于 `faint` 状态 prompt |
| `keywords` | `JSONB` | 否 | 召回线索关键词，建议存成数组或带权重对象 |
| `entity_refs` | `JSONB` | 否 | 提取出的实体引用，如地点、时间、人名、物品 |
| `base_importance` | `FLOAT` | 是 | 初始重要度，表示这条记忆“天然值不值得记” |
| `confidence` | `FLOAT` | 是 | 抽取置信度/事实可信度，区分“明确事实”和“模糊推测” |
| `status` | `TEXT` | 是 | 当前状态：`active / faint / dormant / archived / superseded` |
| `status_changed_at` | `TIMESTAMPTZ` | 是 | 最近一次状态切换时间 |
| `first_observed_at` | `TIMESTAMPTZ` | 是 | 第一次形成这条记忆的时间 |
| `last_observed_at` | `TIMESTAMPTZ` | 是 | 最近一次在对话或系统中再次观测到的时间 |
| `last_reinforced_at` | `TIMESTAMPTZ` | 否 | 最近一次被强化的时间 |
| `last_recalled_at` | `TIMESTAMPTZ` | 否 | 最近一次被 prompt 或系统主动召回的时间 |
| `reinforce_count` | `INT` | 是 | 累计强化次数 |
| `recall_count` | `INT` | 是 | 累计被召回次数 |
| `emotion_intensity` | `FLOAT` | 否 | 情绪强度 |
| `emotion_profile` | `JSONB` | 否 | 多标签情绪画像 |
| `interaction_tendency` | `JSONB` | 否 | 对互动方式的推动方向 |
| `emotion_summary` | `TEXT` | 否 | 人类可读的情绪总结 |
| `arousal_level` | `FLOAT` | 否 | 可选，表示情绪唤起水平 |
| `archived_at` | `TIMESTAMPTZ` | 否 | 进入归档态的时间 |
| `superseded_by` | `UUID` | 否 | 若被新记忆覆盖，指向替代它的记忆 ID |
| `metadata` | `JSONB` | 否 | 扩展信息，放不值得单独建列的附加字段 |
| `created_at` | `TIMESTAMPTZ` | 是 | 行创建时间 |
| `updated_at` | `TIMESTAMPTZ` | 是 | 行更新时间 |

### 3.4 字段分工说明

#### 一、身份与归属

- `contact_id` 是第一版最关键的查询维度。
- `scope_type` 是为了避免未来所有记忆都只能挂在角色名下；例如全局偏好、线程限定记忆、场景限定记忆都能兼容。
- `source_conversation_id` 只记录“主要来源”，完整来源链路后面交给 `memory_events`。

#### 二、内容表达

- `canonical_text` 是数据库里的标准内容，不直接追求口语味。
- `summary_short` 用于“清楚记得”的 prompt 版本。
- `summary_faint` 用于“隐约记得”的 prompt 版本，允许更模糊、更带感觉。
- `semantic_key` 是后续合并规则的关键字段，但第一版允许为空，避免前期抽取器被它卡死。

#### 三、强度与可信度

- `base_importance` 回答“这件事本身重要吗”。
- `confidence` 回答“这件事说得准不准”。
- 这两个值都保留在主表，因为它们是记忆实体的基础属性，不是每轮都大幅波动的运行态。

#### 四、生命周期

- `status` 只表示“当前所处层级”，状态流转历史不放在主表里。
- `first_observed_at / last_observed_at / last_reinforced_at / last_recalled_at` 是后续遗忘曲线最关键的时间锚点。
- `reinforce_count / recall_count` 会直接影响后面脚本算法里的衰减速度和再激活概率。

#### 五、情绪挂载

- 情绪字段直接挂主表，而不是单独拆小表。
- 原因是：它们本质上是“这条记忆现在带来的情绪轮廓”，查询时经常和记忆正文一起读取。
- 真正细粒度的情绪变化历史，后面如果需要，再放到事件流水里记录。

### 3.5 第一版明确不放进主表的内容

- 不放 `activation_score`、`decay_score`、`next_decay_at` 这类高频重算字段；这些属于 `memory_runtime_state`。
- 不放完整原始消息片段和多次来源列表；这些属于 `memory_events`。
- 不放复杂版本链详情；主表只保留 `superseded_by` 这一条最常用关系。

### 3.6 第一版查询视角

- 取某个角色当前可用记忆：按 `contact_id + status` 查 `memory_items`
- 取某个角色的模糊印象层：按 `status = 'faint'`
- 取需要做遗忘重算的实体：后续由 `memory_runtime_state` 或定时任务联查
- 回溯“这条记忆怎么来的”：后续从 `memory_events` 追

### 3.7 当前冻结结论

- `memory_items` 保留“当前记忆实体”的稳定语义信息。
- 状态、摘要分层、情绪画像，都挂在主表。
- 高频算法值与完整历史，不进主表。

---

## Step 4：`memory_events` 事件流水表设计

### 4.1 这张表承担什么职责

- `memory_events` 是记忆系统的追加式流水表。
- 它不存“当前结果”，只存“这条记忆经历过什么变化”。
- 主表 `memory_items` 负责给在线系统快速读当前状态；`memory_events` 负责回放、审计、调试和离线分析。
- 未来 Python worker 调遗忘算法时，也应优先基于这张表理解“为什么这条记忆会变强/变淡/被覆盖”。

### 4.2 设计原则

- 事件表采用 append-only，不做就地覆盖。
- 一次真实业务变化，原则上至少落一条事件。
- 高频但轻量的动作可以只写增量，不必每次都写完整快照。
- 会影响记忆解释、回放、人工排查的动作，必须能在事件表里追出来。

### 4.3 建议字段

| 字段名 | 类型建议 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | `UUID` | 是 | 事件主键 |
| `memory_item_id` | `UUID` | 是 | 关联的记忆实体 ID |
| `contact_id` | `TEXT` | 是 | 角色 ID，便于按角色回放 |
| `event_type` | `TEXT` | 是 | 事件类型，见下方事件枚举 |
| `event_time` | `TIMESTAMPTZ` | 是 | 事件实际发生时间 |
| `actor_type` | `TEXT` | 是 | 事件执行者类型，如 `node_backend / python_worker / user / system / migration` |
| `actor_ref` | `TEXT` | 否 | 执行者标识，如 worker 名称、用户操作入口、接口调用方 |
| `source_kind` | `TEXT` | 否 | 事件来源类型，如 `conversation / message / prompt / manual / job / import / migration` |
| `source_ref` | `JSONB` | 否 | 来源引用，例如会话 ID、消息 ID、任务 ID、批次号 |
| `reason_code` | `TEXT` | 否 | 原因码，如 `duplicate_merge / inactivity_decay / cue_match_recall / user_confirmed` |
| `delta_payload` | `JSONB` | 否 | 本次事件的结构化变化量 |
| `before_snapshot` | `JSONB` | 否 | 事件前的关键字段快照 |
| `after_snapshot` | `JSONB` | 否 | 事件后的关键字段快照 |
| `batch_id` | `TEXT` | 否 | 批处理或一次任务链路的统一 ID |
| `note` | `TEXT` | 否 | 人类可读补充说明 |
| `metadata` | `JSONB` | 否 | 额外扩展字段 |
| `created_at` | `TIMESTAMPTZ` | 是 | 事件入库时间 |

### 4.4 为什么需要这些字段

#### 一、为什么要冗余 `contact_id`

- 虽然它能从 `memory_items` 反查，但事件表保留冗余列后，按角色回放会简单很多。
- 后续即使某条记忆被归档、被覆盖，事件查询也不必强依赖主表。

#### 二、为什么要区分 `event_time` 和 `created_at`

- `event_time` 表示业务上“事情什么时候发生”。
- `created_at` 表示“这条流水什么时候写进数据库”。
- 两者分开后，导入历史数据、补写事件、离线重算都会更稳。

#### 三、为什么同时保留 `delta_payload` 和快照

- `delta_payload` 适合记录小而清晰的变化，例如“强化次数 +1、importance +0.08、状态从 faint 升回 active”。
- `before_snapshot / after_snapshot` 适合记录难以从增量中直接还原的变化，例如人工编辑、覆盖替换、批量改写摘要。
- 这样可以兼顾存储成本和可回放性。

### 4.5 第一版事件类型冻结

#### `created`

- 新记忆实体首次创建。
- 常见来源：抽取器新建、人工新增、导入迁移。

#### `observed`

- 同一条记忆再次在对话、场景或系统输入里被观测到。
- 它强调“又出现了一次”，还不一定构成强化。

#### `reinforced`

- 这次观测被算法认定为有效强化。
- 会影响 `reinforce_count`、`last_reinforced_at`、后续稳定度。

#### `recalled`

- 这条记忆被在线 prompt、检索器或某个后台流程实际召回使用。
- 用来区分“记忆存在”与“记忆真的影响过角色表达”。

#### `decayed`

- 发生了遗忘曲线上的自然衰减。
- 可以只记录分数变化，也可以同时记录状态变化。

#### `status_changed`

- 记忆状态发生切换，例如 `active -> faint`、`dormant -> active`。
- 如果衰减直接导致状态变化，允许和 `decayed` 同批写入两条事件。

#### `superseded`

- 旧记忆被新事实或新版本覆盖。
- 重点用于“说法被更新”而不是自然遗忘。

#### `edited`

- 人工编辑了记忆内容、摘要、重要度、情绪等字段。
- 第一版建议必须带 `before_snapshot` 和 `after_snapshot`。

#### `policy_applied`

- 某条策略对这条记忆生效，例如“此类型记忆衰减更慢”“用户明确固定为长期保留”。
- 便于后面分析策略到底有没有产生效果。

#### `imported`

- 从本地旧缓存、JSON 导入、历史脚本迁移进来的记录。
- 主要用于迁移期，不一定长期高频出现，但建议保留。

### 4.6 第一版事件写入规则

#### 必写事件

- 新建记忆时：必须写 `created`
- 强化生效时：必须写 `reinforced`
- 真正进入 prompt 或被后台逻辑引用时：必须写 `recalled`
- 状态改变时：必须写 `status_changed`
- 被新事实覆盖时：必须写 `superseded`
- 人工编辑时：必须写 `edited`

#### 可选事件

- 单纯再次看到但未形成强化：可写 `observed`
- 只发生数值衰减但尚未跨状态：可写 `decayed`
- 导入或批量补历史：可写 `imported`

### 4.7 快照策略

- 并不是每条事件都要存完整快照。
- 第一版建议：
  - `edited / superseded / policy_applied / imported`：尽量同时存 `before_snapshot` 与 `after_snapshot`
  - `status_changed`：至少存状态前后值，必要时放进 `delta_payload`
  - `reinforced / recalled / observed / decayed`：默认只存 `delta_payload`
- 快照只需要覆盖关键字段，不要求复制整行数据库记录。
- 推荐快照只包括：`canonical_text`、`summary_short`、`summary_faint`、`status`、`base_importance`、`confidence`、情绪字段、关键时间字段。

### 4.8 `delta_payload` 推荐结构

- 第一版建议统一存成结构化 JSON，而不是随便写字符串。
- 参考形态：
  - `{"reinforce_count": {"from": 2, "to": 3}}`
  - `{"status": {"from": "active", "to": "faint"}}`
  - `{"activation_delta": -0.12, "reason": "inactivity_decay"}`
  - `{"used_in_prompt": true, "cue_terms": ["加班", "忙完"]}`

### 4.9 Node 后端与 Python worker 的共用约定

- 两边都不要直接“解释事件表”，而是共同遵守同一份事件写入协议。
- Node 后端更适合写：
  - `created`
  - `observed`
  - `reinforced`
  - `recalled`
  - `edited`
- Python worker 更适合写：
  - `decayed`
  - `status_changed`
  - `policy_applied`
  - 批量 `imported`
- 如果一次处理链包含多条事件，建议共享同一个 `batch_id`，便于事后串起来看。

### 4.10 第一版推荐索引视角

- 按记忆回放：`memory_item_id + event_time`
- 按角色排查：`contact_id + event_time`
- 按事件类型分析：`event_type + event_time`
- 按批处理追踪：`batch_id`

### 4.11 当前冻结结论

- `memory_events` 是追加式历史流水，不承担当前态查询。
- 第一版保留通用事件框架，核心事件类型先冻结为 `created / observed / reinforced / recalled / decayed / status_changed / superseded / edited / policy_applied / imported`
- 增量变化优先放 `delta_payload`，只有重要变化才带快照。
- Node 与 Python 共用一套写入协议，用 `batch_id` 串联同批操作。

---

## Step 5：`memory_runtime_state` 运行态表设计

### 5.1 这张表承担什么职责

- `memory_runtime_state` 用来放“高频变化、适合算法计算、但不适合塞进主表”的运行态数据。
- 它服务的是遗忘曲线和召回判断，不是人工编辑主入口。
- `memory_items` 仍然是“这条记忆现在长什么样”，`memory_runtime_state` 则是“这条记忆现在还记得多深、想起来多容易、接下来会怎么变”。

### 5.2 为什么要单独拆出来

- 这些分数会经常被重算，如果放进 `memory_items`，主表会太像算法缓存，不像业务实体表。
- 后面 Python worker 如果批量重算几千条记忆，改运行态表会更安全，也更容易回滚。
- 在线系统真正关心的是记忆内容和状态；算法系统关心的是激活度、稳定度、衰减速度。

### 5.3 第一版建议字段

| 字段名 | 类型建议 | 必填 | 说明 |
| --- | --- | --- | --- |
| `memory_item_id` | `UUID` | 是 | 主键，同时关联 `memory_items.id`，一条记忆对应一条运行态 |
| `activation_score` | `FLOAT` | 是 | 这条记忆“现在有多容易被想起” |
| `stability_score` | `FLOAT` | 是 | 这条记忆“扎得有多深”，越高越不容易掉得快 |
| `impression_floor` | `FLOAT` | 是 | 最低残留印象，用来表示“不完全忘掉，只剩一点印象” |
| `decay_rate` | `FLOAT` | 是 | 当前有效衰减速度 |
| `cue_recall_threshold` | `FLOAT` | 是 | 需要多强的 cue 才能把 `dormant` 或偏弱记忆重新拉回来 |
| `last_computed_at` | `TIMESTAMPTZ` | 是 | 最近一次完整计算时间 |
| `last_decay_at` | `TIMESTAMPTZ` | 否 | 最近一次执行衰减计算的时间 |
| `next_decay_at` | `TIMESTAMPTZ` | 否 | 建议下一次重算的时间 |
| `last_recalled_score` | `FLOAT` | 否 | 最近一次被召回时的匹配/激活得分，便于调试 |
| `algorithm_version` | `TEXT` | 是 | 当前这条运行态由哪版算法产出 |
| `debug_payload` | `JSONB` | 否 | 调试字段，放不值得单独成列的中间信息 |
| `created_at` | `TIMESTAMPTZ` | 是 | 行创建时间 |
| `updated_at` | `TIMESTAMPTZ` | 是 | 行更新时间 |

### 5.4 这些字段分别解决什么问题

#### `activation_score`

- 回答的是：“如果现在要装 prompt，这条记忆有多可能被想起来？”
- 它更受近期提及、近期强化、近期召回影响。
- 这会是在线排序时最有用的分数之一。

#### `stability_score`

- 回答的是：“这条记忆是不是已经扎根了？”
- 同样一周没提，两条记忆掉得不一样，差别主要就在稳定度。
- 它更受强化次数、持续时间、情绪强度、重要度影响。

#### `impression_floor`

- 这是第一版里专门为“还有一点印象”保留的下限分数。
- 有了它，就不一定是一路掉到 0，而是可能停在一个残留层。
- 这正好对应你之前提到的：有些事不是完全忘掉，而是变成隐约有印象。

#### `decay_rate`

- 回答的是：“这条记忆现在掉得快不快？”
- 它不是固定常量，而是算法当前算出来的有效衰减速度。

#### `cue_recall_threshold`

- 回答的是：“多强的当前话题线索，才能把这条记忆重新拉回来？”
- 它主要服务 `dormant` 和记忆边缘层。

### 5.5 第一版写入逻辑

#### 新建记忆时

- 创建 `memory_items` 的同时，创建一条 `memory_runtime_state`
- 初始值可由这些字段共同决定：
  - `base_importance`
  - `confidence`
  - `emotion_intensity`
  - 初始 `status`

#### 在线强化或召回时

- Node 后端可以做轻量更新：
  - 小幅上调 `activation_score`
  - 更新 `last_recalled_score`（如果这次是召回）
  - 顺带更新 `updated_at`
- 这类轻量更新是为了让系统不用等 Python 重算，就能反映“刚刚提到过”的即时变化。

#### 定时衰减时

- Python worker 负责做完整重算：
  - 重算 `activation_score`
  - 重算 `stability_score`
  - 重算 `impression_floor`
  - 重算 `decay_rate`
  - 更新 `last_decay_at / next_decay_at / last_computed_at`
- 如果运行态重算后判断状态应该变化，再去更新 `memory_items.status`，并写入 `memory_events`

### 5.6 第一版读取逻辑

#### 在线 prompt 装配

- 先从 `memory_items` 过滤状态：
  - 默认只看 `active`
  - 可选再看 `faint`
- 然后联查 `memory_runtime_state`
- 用法建议：
  - `status` 决定“能不能进”
  - `activation_score` 决定“优先级多高”
  - `impression_floor` 决定“是不是还有资格以模糊印象出现”

#### Cue 召回

- 当当前消息带有明显线索时，可以把 `cue_recall_threshold` 拿来做一道额外判断。
- 满足条件的 `dormant` 记忆，才允许被临时拉回 prompt。

#### 人工排查

- 如果觉得“这条记忆怎么突然想不起来了”或“为什么总被拉出来”，优先看：
  - `activation_score`
  - `stability_score`
  - `impression_floor`
  - `decay_rate`
  - `last_computed_at`

### 5.7 第一版边界原则

- `memory_runtime_state` 不直接替代 `memory_items.status`
- 状态切换的最终结果，还是要回写 `memory_items`
- `memory_runtime_state` 只负责提供判断依据和排序依据
- 事件历史仍然只写进 `memory_events`

### 5.8 当前冻结结论

- `memory_runtime_state` 是算法运行态表，一条记忆对应一条运行态
- 第一版核心字段先冻结为：
  - `activation_score`
  - `stability_score`
  - `impression_floor`
  - `decay_rate`
  - `cue_recall_threshold`
  - `last_computed_at / last_decay_at / next_decay_at`
- 在线系统可以做轻量热更新，完整重算交给 Python worker
- 主表管“当前长相”，运行态表管“当前记忆强度”

---

## Step 6：`memory_policies` 策略表设计

### 6.1 这张表承担什么职责

- `memory_policies` 保存“当前生效的记忆规则”。
- 它不保存每条记忆本身，也不保存每次变化历史。
- 它的作用是回答：哪些记忆应该忘得慢一点、哪些不该主动召回、哪些应该至少保留一点印象。
- 真正某条策略对某条记忆产生了影响时，再由 `memory_events` 写 `policy_applied` 事件。

### 6.2 为什么要单独有策略表

- 不把“长期保留 / 更慢遗忘 / 不主动召回”这类规则写死在代码里。
- 后续可以通过脚本或后台配置调整策略，而不必每次改前端。
- 同一套策略可以同时被 Node 后端和 Python worker 读取，避免两边规则不一致。

### 6.3 第一版建议字段

| 字段名 | 类型建议 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | `UUID` | 是 | 策略主键 |
| `policy_name` | `TEXT` | 是 | 人类可读名称，例如“核心关系记忆慢衰减” |
| `policy_scope` | `TEXT` | 是 | 生效范围，见下方范围说明 |
| `contact_id` | `TEXT` | 否 | 只对某个角色生效时填写 |
| `memory_type` | `TEXT` | 否 | 只对某类记忆生效时填写 |
| `memory_subtype` | `TEXT` | 否 | 只对某个细分类生效时填写 |
| `memory_item_id` | `UUID` | 否 | 只对某一条记忆生效时填写 |
| `policy_kind` | `TEXT` | 是 | 策略类型，例如衰减、召回、prompt、状态锁定 |
| `policy_payload` | `JSONB` | 是 | 策略具体参数 |
| `is_enabled` | `BOOLEAN` | 是 | 是否启用 |
| `priority` | `INT` | 是 | 同级冲突时的优先级，数字越大越优先 |
| `effective_from` | `TIMESTAMPTZ` | 否 | 开始生效时间 |
| `effective_to` | `TIMESTAMPTZ` | 否 | 结束生效时间 |
| `reason_note` | `TEXT` | 否 | 为什么有这条策略，方便人工理解 |
| `metadata` | `JSONB` | 否 | 扩展信息 |
| `created_at` | `TIMESTAMPTZ` | 是 | 创建时间 |
| `updated_at` | `TIMESTAMPTZ` | 是 | 更新时间 |

### 6.4 生效范围

第一版先支持这些范围：

- `global`：全局默认策略。
- `contact`：只影响某个角色的全部记忆。
- `memory_type`：只影响某类记忆，例如关系记忆、偏好记忆、场景记忆。
- `contact_memory_type`：只影响某个角色下的某类记忆。
- `item`：只影响某一条具体记忆。

### 6.5 第一版策略类型

#### `decay_multiplier`

- 控制遗忘速度。
- 例：`{"decay_multiplier": 0.6}` 表示这类记忆只按正常速度的 60% 衰减。

#### `stability_bonus`

- 提高稳定度，让记忆更不容易掉层。
- 例：`{"stability_bonus": 0.15}`

#### `impression_floor_min`

- 设置最低残留印象。
- 例：`{"min_impression_floor": 0.25}` 表示即使淡化，也至少保留一点模糊印象。

#### `cue_threshold_adjustment`

- 调整 dormant 记忆被线索拉回来的难度。
- 例：`{"cue_threshold_delta": -0.1}` 表示更容易被当前话题唤起。

#### `prompt_boost`

- 提高进入 prompt 时的排序权重。
- 例：`{"prompt_boost": 0.2}`

#### `prompt_suppress`

- 抑制进入 prompt。
- 例：`{"suppress_recall": true}` 表示默认不要主动带出这类记忆。

#### `status_lock`

- 锁定状态，不允许自动衰减到更低层。
- 例：`{"locked_status": "active"}` 或 `{"locked_status": "faint"}`

#### `never_archive`

- 禁止自动归档。
- 例：`{"never_archive": true}`

### 6.6 冲突处理规则

- 更具体的策略优先于更宽泛的策略。
- 优先级顺序建议：
  - `item`
  - `contact_memory_type`
  - `contact`
  - `memory_type`
  - `global`
- 同一范围内，`priority` 更高的优先。
- 如果范围和优先级都一样，`updated_at` 更新的优先。
- 明确禁止类策略优先于加分类策略，例如 `prompt_suppress` 优先于 `prompt_boost`。
- 过期策略、未启用策略，一律不参与计算。

### 6.7 写入逻辑

#### 新增或修改策略

- 直接新增或更新 `memory_policies`。
- 第一版不单独做策略历史表。
- 如果以后需要审计策略变更，再考虑加 `memory_policy_events`，当前先不加。

#### 策略真正影响记忆时

- 如果某条策略导致某条记忆分数变化、状态变化、被保留、被压制，写一条 `memory_events.policy_applied`。
- 这样可以追到“这条记忆为什么没忘 / 为什么没进 prompt / 为什么被锁住”。

#### Node 与 Python 的分工

- Node 后端主要读策略，不负责批量重算。
- Python worker 负责在定时重算时应用衰减类和状态类策略。
- 如果 Node 在线读取时遇到 prompt 类策略，可以即时应用，例如 `prompt_boost`、`prompt_suppress`。

### 6.8 读取逻辑

#### Python worker 读取

- 定时重算前读取所有启用且未过期的策略。
- 根据 `contact_id / memory_type / memory_item_id` 匹配到具体记忆。
- 应用策略后更新 `memory_runtime_state`。
- 如果状态发生变化，再回写 `memory_items` 并写 `memory_events`。

#### Node 后端读取

- 组装 prompt 时读取当前角色相关策略。
- 第一版只需要即时处理：
  - `prompt_boost`
  - `prompt_suppress`
  - `status_lock`
- 衰减类策略不要求 Node 实时重算，交给 Python worker。

### 6.9 第一版推荐索引视角

- 查启用策略：`is_enabled`
- 查角色策略：`contact_id + is_enabled`
- 查类型策略：`memory_type + memory_subtype + is_enabled`
- 查单条记忆策略：`memory_item_id + is_enabled`
- 查有效期：`effective_from + effective_to`

### 6.10 当前冻结结论

- `memory_policies` 保存当前策略，不保存完整历史。
- 策略真正影响记忆时，用 `memory_events.policy_applied` 留痕。
- 第一版用一张通用策略表，不拆很多小表。
- Node 主要处理 prompt 类策略，Python worker 主要处理衰减和状态类策略。

---

## Step 7：提取输出协议

### 7.1 这一层到底要解决什么

- AI 提取器不应该直接“写数据库”，而应该先输出一份结构化结果。
- 这份结果的作用是：告诉系统“这段对话里，哪些内容值得形成记忆，应该新建、强化、覆盖，还是忽略”。
- 这样做的好处是：提取和入库分开，后面无论换模型、换 prompt，数据库层都不用跟着大改。

### 7.2 第一版输出原则

- 只提取“稳定、对后续互动有价值”的内容。
- 不要求一次输出很多条，宁少勿滥。
- 不让提取器直接输出运行态分数，例如 `activation_score`、`decay_rate`。
- 不让提取器直接决定最终数据库状态；它只能给出“建议动作”。

### 7.3 第一版建议输出结构

每次提取返回一个批次对象，里面包含若干条候选记忆：

- `batch_ref`
  - 这一轮提取的批次号，方便后面和 `memory_events.batch_id` 对上。
- `contact_id`
  - 这次提取针对哪个角色。
- `source_ref`
  - 这次提取来自哪段会话、哪些消息、哪个时间窗口。
- `items`
  - 候选记忆列表。

每条候选记忆建议包含这些字段：

- `action`
  - 允许值：`create / reinforce / supersede / ignore`
- `memory_type`
- `memory_subtype`
- `semantic_key`
- `canonical_text`
- `summary_short`
- `summary_faint`
- `base_importance`
- `confidence`
- `keywords`
- `entity_refs`
- `emotion_intensity`
- `emotion_profile`
- `interaction_tendency`
- `emotion_summary`
- `source_excerpt`
  - 只保留少量来源摘录，方便排查，不直接进主表
- `target_memory_ref`
  - 如果模型明确认为是在强化或覆盖某条已有记忆，可以带上候选目标
- `reason_note`
  - 简单说明为什么建议这样做，例如“这是用户重复提到的长期偏好”

### 7.4 哪些字段是必须的

#### `create`

- 至少要有：
  - `action`
  - `memory_type`
  - `canonical_text`
  - `base_importance`
  - `confidence`

#### `reinforce`

- 至少要有：
  - `action`
  - `target_memory_ref` 或 `semantic_key`
  - `reason_note`

#### `supersede`

- 至少要有：
  - `action`
  - `target_memory_ref` 或足够明确的 `semantic_key`
  - 新版本的 `canonical_text`
  - `reason_note`

#### `ignore`

- 至少要有：
  - `action`
  - `reason_note`

### 7.5 哪些内容不应该由提取器输出

- 不输出最终 `status`
- 不输出 `activation_score / stability_score / decay_rate`
- 不输出是否真的进 prompt
- 不输出数据库事件类型
- 不输出复杂冲突裁决结果

这些都是后端合并层和运行态层的工作。

### 7.6 提取结果如何映射进数据库

- `create`
  - 进入新建流程，写 `memory_items`、`memory_runtime_state`、`memory_events(created)`
- `reinforce`
  - 进入强化流程，更新已有 `memory_items` 与 `memory_runtime_state`，并写 `memory_events(reinforced)`
- `supersede`
  - 进入覆盖流程，旧记忆写 `superseded`，新记忆重新创建
- `ignore`
  - 不入库，但可在日志里保留批次级调试信息

### 7.7 第一版提取控制规则

- 每轮提取建议控制在少量候选，例如 0~5 条。
- 低置信度、强时效性、纯当下情绪噪声，优先忽略。
- 如果一句话只是旧信息重复出现，优先走 `reinforce`，不要频繁 `create`。
- 如果内容明显与旧事实冲突，优先走 `supersede`，不要简单覆盖原文。

### 7.8 当前冻结结论

- 提取器只产出“候选记忆 + 建议动作”，不直接写数据库。
- 第一版动作先固定为：`create / reinforce / supersede / ignore`
- 运行态、状态切换、最终事件写入，全部留给后端和 worker 层处理。

---

## Step 8：合并规则

### 8.1 这一层到底要解决什么

- 提取器说“这是一条新记忆”不代表系统一定新建。
- 合并层要判断：它到底是新记忆、旧记忆强化，还是旧记忆被新事实替代。
- 这一层是记忆系统最关键的“收口层”。

### 8.2 第一版判断顺序

建议按下面顺序判断：

1. 是否明确命中 `target_memory_ref`
2. 是否命中同一 `contact_id + semantic_key`
3. 是否属于“同类稳定事实”的重复表达
4. 是否与已有记忆明显冲突
5. 如果都不是，再视为新建

### 8.3 第一版四种结果

#### `create`

- 没找到可靠旧目标。
- 或者虽然相似，但本质是新的稳定信息。

#### `reinforce`

- 语义一致，只是重复提到、补强、再次确认。
- 例如“还是喜欢深夜散步”“最近又提到她讨厌香菜”。

#### `supersede`

- 不是简单补充，而是旧事实需要被新事实替代。
- 例如“以前住 A 地，现在搬到了 B 地”。

#### `ignore`

- 内容太弱、太短期、太不稳定，或者明显只是噪声。

### 8.4 `reinforce` 的处理方式

- 不创建新记忆。
- 更新原记忆：
  - `last_observed_at`
  - `last_reinforced_at`
  - `reinforce_count`
  - 必要时更新 `summary_short / summary_faint`
- 运行态做轻量增强：
  - 上调 `activation_score`
  - 视情况增加 `stability_score`
- 写事件：
  - `observed`
  - `reinforced`
  - 如果状态回升，再补 `status_changed`

### 8.5 `supersede` 的处理方式

- 旧记忆不删。
- 旧记忆改为：
  - `status = 'superseded'`
  - `superseded_by = 新记忆 id`
- 新记忆按 `create` 流程重建。
- 写事件：
  - 旧记忆写 `superseded`
  - 新记忆写 `created`

### 8.6 第一版合并保守原则

- 宁可少合并，不要错合并。
- 当“重复”与“冲突”不够明确时，优先保留旧记忆不动。
- 第一版不做复杂 embedding 合并，先靠：
  - `target_memory_ref`
  - `semantic_key`
  - 类型判断
  - 规则化文本判断
- 向量检索如果后面要上，可以作为第二阶段增强，不进入第一版必需项。

### 8.7 当前冻结结论

- 合并层是提取结果进入数据库前的统一裁决层。
- 第一版结果只允许：`create / reinforce / supersede / ignore`
- 旧记忆一律不做物理删除。

---

## Step 9：衰减算法第一版

### 9.1 这一层到底要解决什么

- 让记忆不再是“固定保留天数，到点就删”。
- 让不同类型、不同强度、不同情绪浓度的记忆，按照不同速度变淡。
- 同时保留“不是完全忘掉，而是还有一点印象”的层。

### 9.2 第一版核心思路

- 用 `activation_score` 表示“现在多容易想起”。
- 用 `stability_score` 表示“这条记忆扎得有多深”。
- 用 `impression_floor` 表示“最低还能留下多少模糊印象”。
- 用 `decay_rate` 表示“这条记忆当前掉得多快”。

### 9.3 第一版影响因素

衰减速度主要受这些因素影响：

- 距离上次强化过去多久
- 距离上次召回过去多久
- `base_importance`
- `confidence`
- `reinforce_count`
- `emotion_intensity`
- 当前是否有策略加成或限制

### 9.4 第一版基本规则

#### 时间越久，激活度越低

- 长时间没有被提起、没有被召回，`activation_score` 会持续下降。

#### 越稳定的记忆，越不容易掉得快

- `stability_score` 越高，衰减越慢。
- 稳定度高的记忆，即使激活度下降，也更容易停在 `faint` 而不是直接沉到底。

#### 强情绪和高重要度记忆更抗遗忘

- 情绪强度高、重要度高的记忆，默认拥有更高稳定度或更低衰减速度。

#### 召回和强化不完全一样

- 被再次明确提及，属于强化，提升更明显。
- 只是被 prompt 用到一次，属于召回，提升较小。

### 9.5 第一版状态判断逻辑

- `active`
  - 当前激活度高，允许清晰进入 prompt
- `faint`
  - 激活度已经下滑，但仍高于模糊印象下限
- `dormant`
  - 平时不主动出现，但在 cue 足够强时还能被拉回
- `archived`
  - 激活度和残留印象都太低，且没有策略要求保留

第一版建议把具体阈值做成配置，不写死在代码里。

### 9.6 第一版执行方式

- Node 后端
  - 只做轻量热更新，例如刚被提到时略微提升激活度
- Python worker
  - 负责定时完整重算
  - 重算完成后：
    - 更新 `memory_runtime_state`
    - 如有必要，回写 `memory_items.status`
    - 写 `decayed / status_changed / policy_applied`

### 9.7 当前冻结结论

- 第一版衰减不追求学术上最复杂，而是先形成“能解释、能调参、能保留残留印象”的模型。
- 精确公式后面可以再调，但字段和责任边界现在已经够开始开发。

---

## Step 10：Prompt 装配规则

### 10.1 这一层到底要解决什么

- 数据库里有记忆，不等于 prompt 里应该一股脑全塞进去。
- 这一层要决定：
  - 哪些记忆能进入 prompt
  - 用什么口吻进入
  - 数量控制在多少

### 10.2 第一版装配顺序

1. 先确定当前角色 `contact_id`
2. 读取该角色的 `memory_items`
3. 过滤状态：
   - 默认读 `active`
   - 视情况补 `faint`
4. 联查 `memory_runtime_state`
5. 应用 `memory_policies`
6. 最终生成 prompt 片段

### 10.3 各层怎么进入 prompt

#### `active`

- 用 `summary_short`
- 如果没有合适摘要，再退回 `canonical_text`
- 表达方式偏“你明确记得”

#### `faint`

- 用 `summary_faint`
- 表达方式偏“你隐约有印象”“你似乎还记得一点”

#### `dormant`

- 默认不进
- 只有当前消息或当前场景和它的 `keywords / entity_refs` 强相关时，才允许临时进入

#### `archived / superseded`

- 默认不进

### 10.4 第一版数量控制

- 不追求“全都带上”，而追求“自然、稳定、够用”。
- 建议：
  - `active` 带少量高优先级记忆
  - `faint` 带更少量印象型记忆
  - `dormant` 只在强 cue 时补极少数

具体条数做成配置，不写死在设计里。

### 10.5 第一版排序依据

- `status` 是第一层门槛
- `activation_score` 决定优先级
- `base_importance` 与 `stability_score` 决定长期权重
- `prompt_boost / prompt_suppress` 再做细调

### 10.6 第一版写回规则

- 只有真正进入 prompt 的记忆，才写 `memory_events.recalled`
- 同时更新：
  - `memory_items.last_recalled_at`
  - `memory_items.recall_count`
  - `memory_runtime_state.last_recalled_score`

### 10.7 当前冻结结论

- Prompt 装配只读已经整理好的数据库结果，不承担提取和合并工作。
- 第一版只要能稳定做到：
  - `active` 清晰进入
  - `faint` 模糊进入
  - `dormant` 按线索召回
就足够开始开发。

---

## Step 11：迁移方案

### 11.1 这一层到底要解决什么

- 你现在项目里已经有前端本地缓存记忆。
- 新系统不能一上来就把旧数据打掉，而是要有一条安全迁移路径。

### 11.2 第一版迁移原则

- 先导入，不替换。
- 先保留旧缓存，再验证新数据库读取。
- 整个迁移过程要可回退、可重跑、可追踪。

### 11.3 旧字段到新结构的映射

现有旧记忆大致有这些信息：

- `contactId`
- `type`
- `content`
- `importance`
- `source`
- `createdAt`
- `updatedAt`

第一版建议这样映射：

- `contactId` -> `memory_items.contact_id`
- `content` -> `canonical_text`
- `content` 的压缩版 -> `summary_short`
- `content` 的模糊版 -> `summary_faint`
- `importance` -> `base_importance`
- `createdAt` -> `first_observed_at`
- `updatedAt` -> `last_observed_at`
- `type`
  - 旧 `core`：优先映射为关系/事实类记忆
  - 旧 `scene`：优先映射为场景类记忆

### 11.4 迁移时补哪些默认值

- `status`
  - 根据重要度、更新时间、是否核心记忆给一个初始状态
- `confidence`
  - 旧数据默认给中等可信度
- `reinforce_count`
  - 旧数据初始可从 1 起
- `memory_runtime_state`
  - 用迁移脚本生成初始运行态
- `memory_events`
  - 每条迁移进来的记忆至少写一条 `imported`

### 11.5 第一版迁移步骤

1. 导出当前前端记忆数据做备份
2. 跑迁移脚本，把旧数据写进新表
3. 校验导入数量和关键字段
4. 让 prompt 读取先支持“新库优先，旧缓存兜底”
5. 等稳定后，再逐步减少旧缓存依赖

### 11.6 当前冻结结论

- 迁移不是一次切断，而是分阶段并行。
- 第一版重点是“旧数据先安全入库”，不是一步做到完全替换。

---

## Step 12：服务边界

### 12.1 这一层到底要解决什么

- 把“谁负责什么”说清楚，避免后面一边写代码一边打架。

### 12.2 Node 后端负责什么

- 对前端提供统一 API
- 校验提取输出是否合法
- 执行合并逻辑
- 写：
  - `memory_items`
  - `memory_events`
  - 必要的 `memory_runtime_state` 轻量更新
- 读：
  - prompt 查询
  - 角色记忆列表
  - 人工编辑入口

### 12.3 Python worker 负责什么

- 定时跑衰减重算
- 应用衰减类和状态类策略
- 批量补历史、修复、迁移辅助
- 输出结果后：
  - 更新 `memory_runtime_state`
  - 必要时回写 `memory_items.status`
  - 写 `memory_events`

### 12.4 数据库负责什么

- 保存记忆事实
- 保存事件流水
- 保存运行态
- 保存策略配置

数据库不负责业务判断，只负责可靠存储。

### 12.5 前端负责什么

- 不直连数据库
- 不自行决定记忆合并和衰减
- 只通过 Node 后端读写
- 如果未来要做记忆管理 UI，也只是调后端接口

### 12.6 第一版推荐开发顺序

1. SQL 建表与索引
2. Node 后端数据访问层
3. 旧数据导入脚本
4. Prompt 读取改走数据库
5. 提取结果落库与合并逻辑
6. Python worker 的衰减重算

### 12.7 进入业务代码前，当前已经确认的边界

- 表结构已经确定：
  - `memory_items`
  - `memory_events`
  - `memory_runtime_state`
  - `memory_policies`
- 提取协议已经确定
- 合并规则已经确定
- 衰减模型的职责边界已经确定
- Prompt 装配规则已经确定
- 迁移路径已经确定
- Node / Python / DB / 前端的职责分工已经确定

### 12.8 当前冻结结论

- 设计层已经推进到“可以开始写业务代码”的边界。
- 剩下进入开发前最适合先做的，不再是继续空想，而是：
  - SQL 建表稿
  - Node 接口清单
  - 导入脚本实施顺序

---

## 现阶段推荐系统分层

- 数据库存事实：记忆实体、事件流水、当前运行态、策略配置。
- Node 后端负责在线读写与 prompt 查询。
- Python worker 负责提取后处理、衰减重算、定时计算、实验调参。

---

## 业务代码前状态

到这里为止，设计层面已经够支撑下一阶段实施：

- 可以先出正式 SQL 建表稿
- 可以开始拆 Node 后端 API
- 可以开始做旧记忆导入
- 可以最后再接 Python worker

如果后面要正式开工，最合理的第一步是：先把这 4 张表的 SQL 建表稿定下来。
