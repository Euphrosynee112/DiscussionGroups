# 功能依赖排查

本文按“功能”拆分，分别说明：

- 哪些文本会被注入到 prompt
- 读取了哪些用户设置
- 主要代码入口在哪里

---

## Prompt 依赖

| 功能 | Prompt 类型 / 入口 | 主要文本注入来源 | 主要设置依赖 |
| --- | --- | --- | --- |
| 论坛发帖 | `discussion_generate_posts` / `app.js` | 论坛页签信息、论坛讨论文本、热点文本、世界书、用户画像、世界观、自定义 prompt 规则文本 | `settings.customTabs`、`settings.worldview`、`settings.promptRules`、API 设置 |
| 论坛回复（回主贴） | `discussion_generate_replies` / `app.js` | 主贴内容、论坛页签信息、论坛上下文、世界书、角色/用户语气约束、自定义 prompt 规则文本 | `settings.customTabs`、`settings.promptRules`、API 设置 |
| 论坛翻译 | `discussion_translate_text`、`discussion_translate_post` / `app.js` | 原文、目标语言、论坛贴文内容、自定义 prompt 规则文本 | `settings.promptRules`、翻译 API 设置 |
| Chat 1v1 回复 | `chat_conversation` / `messages.js` | 最近聊天记录、记忆（核心/场景）、场景地点状态、时间感知、日程感知、论坛关注上下文、Bubble 关注上下文、世界书、自定义 prompt 规则文本 | `settings.messagePromptSettings.*`、`settings.chatGlobalSettings.*`、`settings.manualTimeSettings`、`settings.promptRules` |
| Chat 自动排程 | `chat_auto_schedule_generate` / `messages.js` | 角色画像、已占用日程、补充要求、挂载世界书、自定义 prompt 规则文本 | `conversation.autoScheduleDays`、`conversation.autoScheduleTime`、`settings.manualTimeSettings`、`settings.promptRules` |
| Chat 今日日记 | `chat_journal` / `messages.js` | 当日日内聊天记录、世界书、论坛关注上下文、角色画像、自定义 prompt 规则文本 | `settings.messagePromptSettings.journalLength`、`settings.messagePromptSettings.worldbook*`、`settings.messagePromptSettings.hotTopics*`、`settings.manualTimeSettings`、`settings.promptRules` |
| Chat 记忆总结 | `chat_memory_summary` / `messages.js` | 对话历史片段、已有记忆、联系人画像、自定义 prompt 规则文本 | `settings.messagePromptSettings.memorySummaryIntervalRounds`、记忆阈值设置、`settings.promptRules` |
| Bubble 粉丝回复 | `bubble_fan_reply` / `bubble.js` | 粉丝画像、页签内容、论坛语境、角色设定、自定义 prompt 规则文本 | `settings.promptRules`、API 设置 |
| Bubble 翻译 | `bubble_translate_text` / `bubble.js` | 原始文本、目标语言、自定义 prompt 规则文本 | `settings.promptRules`、翻译 API 设置 |
| 日程邀请 | `schedule_invite` / `schedule.js` | 邀请卡片内容、同时间段冲突日程、同行人信息、角色对用户的特别认知、自定义 prompt 规则文本 | `settings.promptRules`、API 设置 |
| 养崽成长档案 | `raising_kid_archive` / `raising.js` | 养崽记录、阶段信息、自定义 prompt 规则文本 | `settings.promptRules`、API 设置 |
| 首页规则编辑 | `prompt-config.js` | 不直接发请求；编辑每个 prompt 的框架顺序、内置文字、自定义文字 | `settings.promptRules` |
| 首页时间设置 | `prompt-config.js`、`home.js` | 不直接发请求；决定所有使用“当前时间”的 prompt 实际拿到的时间 | `settings.manualTimeSettings` |

### Chat 1v1 额外说明

`messages.js` 中 `chat_conversation` 的 prompt 注入优先级大致如下：

1. 触发中的察觉信息
2. 场景 / 地点状态
3. 时间感知
4. 日程感知
5. Bubble / 论坛关注上下文
6. 场景记忆
7. 世界书与常规背景

其中“场景 / 地点状态”来自：

- 会话场景设置
- 常用地点
- 用户 / 角色当前位置
- 进入 1v1 时按日程刷新后的地点结果

---

## 用户设置依赖

| 功能 | 读取的设置键 | 影响行为 | 主要代码入口 |
| --- | --- | --- | --- |
| 全局 API 调用 | `settings.mode`、`settings.endpoint`、`settings.token`、`settings.model`、`settings.apiConfigs`、`settings.activeApiConfigId` | 决定请求发送到哪个接口 / 模型 | `app.js`、`messages.js`、`bubble.js`、`schedule.js`、`raising.js` |
| Prompt 时间覆盖 | `settings.manualTimeSettings` | 决定 prompt 中“当前时间 / 今天 / 日期感知”使用本地时间还是手动时间；当前实现为“保存相对本地时间差额”，之后会继续随真实时间流动 | `home.js`、`prompt-config.js`、`messages.js`、`app.js`、`schedule.js`、`bubble.js`、`raising.js` |
| Prompt 规则编辑 | `settings.promptRules` | 决定每个 prompt 的框架顺序、内置文案、自定义文本、拖拽后的最终拼装顺序 | `prompt-config.js`、`home.js` |
| Chat 历史轮数 | `settings.messagePromptSettings.historyRounds` | 决定 1v1 回复、日程邀请等场景的历史抽取范围 | `messages.js`、`schedule.js` |
| Chat 回复句数目标 | `settings.messagePromptSettings.replySentenceLimit` | 决定 1v1 prompt 里要求 AI 输出的目标回复条数 | `messages.js` |
| Chat 时间感知 | `settings.messagePromptSettings.timeAwareness` | 决定是否把当前时间写入 Chat prompt | `messages.js` |
| Chat 日程感知窗口 | `settings.messagePromptSettings.scheduleAwarenessWindowMinutes` | 决定临近日程多久会进入 prompt 上下文 | `messages.js` |
| Chat 热点挂载 | `settings.messagePromptSettings.hotTopicsEnabled`、`hotTopicsTabId`、`hotTopicsIncludeDiscussionText`、`hotTopicsIncludeHotTopic` | 决定是否把论坛某个页签的讨论 / 热点挂到 Chat prompt | `messages.js` |
| Chat 世界书挂载 | `settings.messagePromptSettings.worldbookEnabled`、`worldbookIds` | 决定哪些世界书进入 Chat / 日记 / 自动排程 prompt | `messages.js` |
| Chat 论坛关注聚焦 | `settings.messagePromptSettings.forumPostFocusEnabled` | 让近期论坛内容进入 1v1 回复上下文 | `messages.js` |
| Chat Bubble 聚焦 | `settings.messagePromptSettings.bubbleFocusEnabled`、`bubbleFocusMinutes` | 让近期 Bubble 内容进入 1v1 回复上下文 | `messages.js` |
| Chat 头像显示 | `settings.messagePromptSettings.showContactAvatar`、`showUserAvatar` | 只影响聊天页渲染，不进 prompt | `messages.js` |
| Chat 用户位置作用域 | `settings.chatGlobalSettings.userPresenceScope` | 决定用户地点是全局共享，还是按联系人分别记录 | `messages.js` |
| 论坛页签 | `settings.customTabs` | 决定论坛发帖 / 回复 / Chat 热点聚焦读取哪组论坛文案 | `app.js`、`messages.js` |
| 世界观 | `settings.worldview` | 影响论坛相关 prompt 的全局背景语气 | `app.js` |
| 翻译专用 API | `settings.translationApiEnabled`、`settings.translationApiConfigId` | 决定论坛 / Bubble 翻译是否走独立接口 | `app.js`、`bubble.js` |
| 摘要专用 API | `settings.summaryApiEnabled`、`settings.summaryApiConfigId` | 决定记忆总结是否走独立接口 | `messages.js` |
| 隐私白名单 | `settings.privacyAllowlist` | 决定 prompt 编码 / 反解析时哪些名字可直接暴露 | `app.js`、`messages.js`、`schedule.js`、`pulse-privacy-cover.js` |

---

## 文本注入来源汇总

为了排查 prompt 注入链路，可以优先按下面几类来源找：

### 1. 用户 / 角色资料

- 用户资料：`profile.username`、`profile.personaPrompt`
- 角色资料：`contact.name`、`contact.personaPrompt`
- 角色对用户的特别认知：`contact.specialUserPersona`
- 角色察觉配置：`contact.awareness*`

主要入口：

- `messages.js`
- `schedule.js`

### 2. 世界书

- 世界书分类 / 条目：`WORLD_BOOKS_KEY`
- 在 Chat / 自动排程 / 日记里通过 `worldbookIds` 挂载

主要入口：

- `messages.js`
- `prompt-config.js`

### 3. 论坛文本

- 页签名
- 讨论文本
- 热点文本

主要入口：

- `app.js`
- `messages.js`

### 4. 场景与地点

- 常用地点：`MESSAGE_COMMON_PLACES_KEY`
- 会话场景：`conversation.sceneMode`
- 用户 / 角色地点状态：`MESSAGE_PRESENCE_STATE_KEY`
- 日程地点：`SCHEDULE_ENTRIES_KEY[*].placeId`

主要入口：

- `messages.js`
- `schedule.js`
- `home.js`（导入导出 / 配置迁移）

### 5. 日程

- 用户日程
- 角色日程
- 同行人
- 邀请决策
- 日程地点

主要入口：

- `schedule.js`
- `messages.js`

### 6. Prompt 规则系统

统一由 `prompt-config.js` 负责：

- 框架定义：如 `<context_library>...</context_library>`
- 内置默认文案
- 自定义文字项
- 拖拽排序后的最终拼装

首页规则 UI 只负责编辑；真正拼 prompt 时仍由各业务页调用 `PulsePromptConfig.buildPrompt(...)`。
