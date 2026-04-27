const DEFAULT_OPENAI_ENDPOINT = "https://api.deepseek.com/chat/completions";
const DEFAULT_GROK_ENDPOINT = "https://api.x.ai/v1/chat/completions";
const DEFAULT_GEMINI_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta";
const DEFAULT_DEEPSEEK_MODEL = "deepseek-chat";
const DEFAULT_GROK_MODEL = "grok-4";
const DEFAULT_GEMINI_MODEL = "gemini-2.0-flash";
const SETTINGS_KEY = "x_style_generator_settings_v2";
const POSTS_KEY = "x_style_generator_posts_v2";
const PROFILE_KEY = "x_style_generator_profile_v1";
const PROFILE_POSTS_KEY = "x_style_generator_profile_posts_v1";
const DIRECT_MESSAGES_KEY = "x_style_generator_direct_messages_v1";
const MESSAGE_CONTACTS_KEY = "x_style_generator_message_contacts_v1";
const MESSAGE_THREADS_KEY = "x_style_generator_message_threads_v1";
const MESSAGE_SHARE_INBOX_KEY = "x_style_generator_message_share_inbox_v1";
const WORLD_BOOKS_KEY = "x_style_generator_message_worldbooks_v1";
const BUBBLE_THREADS_KEY = "x_style_generator_bubble_threads_v1";
const SCHEDULE_ENTRIES_KEY = "x_style_generator_schedule_entries_v1";
const MESSAGE_JOURNAL_ENTRIES_KEY = "x_style_generator_message_journal_entries_v1";
const MESSAGE_WEATHER_CACHE_KEY = "x_style_generator_message_weather_cache_v1";
const MESSAGE_MEMORIES_KEY = "x_style_generator_message_memories_v1";
const MESSAGE_RECENT_LOCATIONS_KEY = "x_style_generator_message_recent_locations_v1";
const MESSAGE_COMMON_PLACES_KEY = "x_style_generator_common_places_v1";
const MESSAGE_PRESENCE_STATE_KEY = "x_style_generator_presence_state_v1";
const MESSAGE_VIDEO_MEDIA_KEY = "x_style_generator_message_video_media_v1";
const MESSAGE_REPLY_TASKS_KEY = "x_style_generator_message_reply_tasks_v1";
const MESSAGE_REPLY_RECOVERY_KEY = "x_style_generator_message_reply_recovery_v1";
const MESSAGE_ACTIVE_VIEW_KEY = "x_style_generator_message_active_view_v1";
const MESSAGE_CHAT_SYNC_STATE_KEY = "x_style_generator_message_chat_sync_state_v1";
const MESSAGE_PROACTIVE_TRIGGER_RUNS_KEY = "x_style_generator_message_proactive_trigger_runs_v1";
const MESSAGE_PROACTIVE_TRIGGER_LOCKS_KEY = "x_style_generator_message_proactive_trigger_locks_v1";
const PLOT_THREADS_KEY = "x_style_generator_plot_threads_v1";
const RAISING_RECORDS_KEY = "x_style_generator_raising_records_v1";
const FORUM_CUSTOM_TAB_LIMIT = 4;
const FORUM_TAB_DOMAIN_TYPES = new Set(["general", "user_fandom", "contact_fandom"]);
const DEFAULT_TEMPERATURE = 0.85;
const DEFAULT_MESSAGE_HISTORY_ROUNDS = 20;
const MAX_MESSAGE_HISTORY_ROUNDS = 50;
const DEFAULT_MESSAGE_REPLY_SENTENCE_LIMIT = 7;
const MAX_MESSAGE_REPLY_SENTENCE_LIMIT = 20;
const DEFAULT_MESSAGE_JOURNAL_LENGTH = 320;
const MAX_MESSAGE_JOURNAL_LENGTH = 1600;
const DEFAULT_SCHEDULE_AWARENESS_WINDOW_MINUTES = 30;
const MAX_SCHEDULE_AWARENESS_WINDOW_MINUTES = 720;
const DEFAULT_MESSAGE_AWARENESS_INTERVAL_ROUNDS = 15;
const MAX_MESSAGE_AWARENESS_INTERVAL_ROUNDS = 200;
const DEFAULT_MEMORY_SUMMARY_INTERVAL_ROUNDS = 10;
const MAX_MEMORY_SUMMARY_INTERVAL_ROUNDS = 100;
const DEFAULT_CORE_MEMORY_THRESHOLD = 80;
const DEFAULT_SCENE_MEMORY_THRESHOLD = 65;
const ACTIVE_CORE_PROMPT_MEMORY_LIMIT = 6;
const ACTIVE_SCENE_PROMPT_MEMORY_LIMIT = 6;
const FAINT_CORE_PROMPT_MEMORY_LIMIT = 2;
const FAINT_SCENE_PROMPT_MEMORY_LIMIT = 2;
const DORMANT_CORE_PROMPT_MEMORY_LIMIT = 1;
const DORMANT_SCENE_PROMPT_MEMORY_LIMIT = 1;
const PROMPT_MEMORY_CUE_MESSAGE_LIMIT = 8;
const PROMPT_MEMORY_CUE_TERM_MIN_LENGTH = 2;
const PROMPT_MEMORY_RECALL_CUE_TERM_LIMIT = 4;
const PROMPT_MEMORY_DERIVED_CUE_TERM_LIMIT = 12;
const PROMPT_MEMORY_RECENT_USER_CUE_MESSAGE_LIMIT = 3;
const PROMPT_MEMORY_STRONG_CUE_MARGIN = 0.12;
const PROMPT_MEMORY_DORMANT_RECALL_COOLDOWN_MS = 6 * 60 * 60 * 1000;
const PROMPT_MEMORY_DORMANT_RECALL_COOLDOWN_THRESHOLD_BONUS = 0.08;
const PROMPT_MEMORY_DORMANT_RECALL_COOLDOWN_PRIORITY_PENALTY = 6;
const PROACTIVE_ACTIVE_SCENE_PROMPT_MEMORY_LIMIT = 2;
const PROACTIVE_FAINT_CORE_PROMPT_MEMORY_LIMIT = 1;
const PROACTIVE_FAINT_SCENE_PROMPT_MEMORY_LIMIT = 0;
const PROACTIVE_DORMANT_TOTAL_PROMPT_MEMORY_LIMIT = 1;
const PROMPT_MEMORY_GENERIC_CUE_TERMS = [
  "喜欢",
  "事情",
  "印象",
  "关系",
  "聊天",
  "记得",
  "似乎",
  "觉得",
  "感觉",
  "部分",
  "内容",
  "情况",
  "有点"
];
const PROMPT_MEMORY_CUE_ALIAS_GROUPS = [
  ["公开", "官宣", "恋情", "脱粉"],
  ["前男友", "前任", "前任相关"],
  ["纸片人", "小卡", "周边"],
  ["机场", "后台", "行程", "直播", "咖啡店"]
];
const DEFAULT_CONTEXT_FOCUS_MINUTES = 60;
const MAX_CONTEXT_FOCUS_MINUTES = 1440;
const DEFAULT_AUTO_SCHEDULE_DAYS = 3;
const MAX_AUTO_SCHEDULE_DAYS = 14;
const MAX_AWARENESS_HISTORY_ITEMS = 12;
const MAX_AWARENESS_MONITOR_ROUNDS = 20;
const AUTO_SCHEDULE_TIMER_INTERVAL_MS = 60 * 1000;
const DEFAULT_PROACTIVE_TRIGGER_SCAN_INTERVAL_MS = 60 * 1000;
const DEFAULT_PROACTIVE_TRIGGER_CATCHUP_MINUTES = 240;
const PROACTIVE_TRIGGER_LOCK_TTL_MS = 2 * 60 * 1000;
const MAX_PROACTIVE_TRIGGER_RUNS = 200;
const PROACTIVE_RELATION_ACTIVITY_LOOKBACK_DAYS = 7;
const FOREGROUND_REPLY_SYNC_INTERVAL_MS = 1200;
const FOREGROUND_REPLY_SYNC_GRACE_MS = 8000;
const ASSISTANT_REPLY_REVEAL_INTERVAL_MS = 2000;
const REPLY_TASK_HEARTBEAT_MS = 4000;
const REPLY_TASK_STALE_MS = 30000;
const LOCAL_STORAGE_API_BASE_URL = "http://localhost:3000";
const DEPLOYED_STORAGE_API_BASE_URL = "https://spring-field-3219.fly.dev";
const CONVERSATION_RENDER_BATCH_SIZE = 50;
const CONVERSATION_SOFT_MESSAGE_LIMIT = 240;
const CONVERSATION_MIN_MESSAGE_LIMIT = 80;
const CONVERSATION_STORAGE_TARGET_CHARS = 1400000;
const CONVERSATION_IMAGE_PAYLOAD_KEEP_COUNT = 20;
const CONVERSATION_LIST_LONG_PRESS_MS = 560;
const CONVERSATION_LIST_LONG_PRESS_MOVE_THRESHOLD = 12;
const CHAT_SYNC_DEBOUNCE_MS = 8000;
const CHAT_SYNC_STARTUP_RETRY_DELAY_MS = 1200;
const MESSAGE_REPLY_RECOVERY_TTL_MS = 24 * 60 * 60 * 1000;
const DEFAULT_WORLDVIEW =
  "这是一个强调长期主义、产品洞察和公共讨论质量的中文社交世界。用户习惯像在 X 上一样快速表达观点，但会天然追问效率、增长、AI 和平台变迁。整体语气要真实、犀利、能引发跟帖，不要写成官方通稿。";

const DEFAULT_CHAT_GLOBAL_SETTINGS = {
  userPresenceScope: "global"
};

const DEFAULT_SETTINGS = {
  mode: "openai",
  endpoint: DEFAULT_OPENAI_ENDPOINT,
  token: "",
  model: DEFAULT_DEEPSEEK_MODEL,
  temperature: DEFAULT_TEMPERATURE,
  privacyCoverEnabled: true,
  apiConfigs: [],
  activeApiConfigId: "",
  translationApiEnabled: false,
  translationApiConfigId: "",
  summaryApiEnabled: false,
  summaryApiConfigId: "",
  negativePromptConstraints: [],
  privacyAllowlist: [],
  worldview: DEFAULT_WORLDVIEW,
  chatGlobalSettings: {
    ...DEFAULT_CHAT_GLOBAL_SETTINGS
  },
  messagePromptSettings: {
    historyRounds: DEFAULT_MESSAGE_HISTORY_ROUNDS,
    replySentenceLimit: DEFAULT_MESSAGE_REPLY_SENTENCE_LIMIT,
    journalLength: DEFAULT_MESSAGE_JOURNAL_LENGTH,
    awarenessIntervalRounds: DEFAULT_MESSAGE_AWARENESS_INTERVAL_ROUNDS,
    memorySummaryIntervalRounds: DEFAULT_MEMORY_SUMMARY_INTERVAL_ROUNDS,
    coreMemoryThreshold: DEFAULT_CORE_MEMORY_THRESHOLD,
    sceneMemoryThreshold: DEFAULT_SCENE_MEMORY_THRESHOLD,
    timeAwareness: false,
    scheduleAwarenessWindowMinutes: DEFAULT_SCHEDULE_AWARENESS_WINDOW_MINUTES,
    hotTopicsEnabled: false,
    hotTopicsTabId: "",
    hotTopicsIncludeDiscussionText: true,
    hotTopicsIncludeHotTopic: false,
    worldbookEnabled: false,
    worldbookIds: [],
    forumPostFocusEnabled: false,
    bubbleFocusEnabled: false,
    bubbleFocusMinutes: DEFAULT_CONTEXT_FOCUS_MINUTES,
    sceneMode: "online",
    showContactAvatar: true,
    showUserAvatar: true
  }
};

const DEFAULT_PROFILE = {
  avatar: "WG",
  username: "Worldview Generator",
  userId: "@worldview_lab",
  avatarImage: "",
  bannerImage: "",
  following: "128",
  followers: "8.6K",
  signature: "长期主义、产品洞察、AI 讨论。",
  personaPrompt:
    "这个用户理性、克制、对产品与内容趋势敏感，说话直接但不失礼貌，偏爱长期主义和结构化表达。"
};

const COMMON_PLACE_TYPE_OPTIONS = [
  { value: "home", label: "住宅" },
  { value: "family", label: "家庭" },
  { value: "work", label: "工作" },
  { value: "school", label: "学校" },
  { value: "leisure", label: "娱乐" },
  { value: "other", label: "其他" }
];

const TAB_TITLES = {
  chat: "微信",
  contacts: "通讯录",
  me: "我"
};

const CONTACT_ENTRY_GROUPS = [
  [
    { id: "memory", label: "记忆", icon: "memory" },
    { id: "worldbook", label: "世界书", icon: "cube" },
    { id: "places", label: "常用地点", icon: "pin" },
    { id: "favorites", label: "收藏", icon: "star" },
    { id: "moments", label: "朋友圈", icon: "image" },
    { id: "emoji", label: "表情", icon: "smile" }
  ],
  [{ id: "settings", label: "设置", icon: "gear" }]
];

const CHAT_UTILITY_ITEMS = [
  { id: "regenerate", label: "重回", icon: "refresh" },
  { id: "voice", label: "语音", icon: "mic" },
  { id: "emoji", label: "表情", icon: "smile" },
  { id: "camera", label: "拍照", icon: "camera" },
  { id: "image", label: "图片", icon: "image" },
  { id: "transfer", label: "转账", icon: "swap" },
  { id: "phone", label: "电话", icon: "phone" },
  { id: "video", label: "视频", icon: "video" },
  { id: "location", label: "位置", icon: "pin" },
  { id: "journal", label: "日记", icon: "book" },
  { id: "schedule", label: "日程", icon: "calendar" },
  { id: "game", label: "游戏", icon: "gamepad" },
  { id: "music", label: "听歌", icon: "headphones" },
  { id: "shopping", label: "购物", icon: "bag" },
  { id: "footprint", label: "足迹", icon: "steps" },
  { id: "view", label: "查看", icon: "eye" },
  { id: "bookshelf", label: "书架", icon: "bookshelf" },
  { id: "awareness", label: "察觉", icon: "heart" }
];

const messagesNavBtnEl = document.querySelector("#messages-nav-btn");
const messagesChatSceneBtnEl = document.querySelector("#messages-chat-scene-btn");
const messagesMessageSelectBtnEl = document.querySelector("#messages-message-select-btn");
const messagesChatSettingsBtnEl = document.querySelector("#messages-chat-settings-btn");
const messagesSearchBtnEl = document.querySelector("#messages-search-btn");
const messagesAddBtnEl = document.querySelector("#messages-add-btn");
const messagesPageTitleEl = document.querySelector("#messages-page-title");
const messagesStatusEl = document.querySelector("#messages-status");
const messagesSearchSectionEl = document.querySelector("#messages-search-section");
const messagesSearchInputEl = document.querySelector("#messages-search-input");
const messagesContentEl = document.querySelector("#messages-content");
const messagesTabbarEl = document.querySelector("#messages-tabbar");

const messagesProfileModalEl = document.querySelector("#messages-profile-modal");
const messagesProfileModalCloseBtnEl = document.querySelector("#messages-profile-modal-close-btn");
const messagesProfileSaveBtnEl = document.querySelector("#messages-profile-save-btn");
const messagesProfileFormEl = document.querySelector("#messages-profile-form");
const messagesProfileAvatarPreviewEl = document.querySelector("#messages-profile-avatar-preview");
const messagesProfileAvatarFileInputEl = document.querySelector("#messages-profile-avatar-file-input");
const messagesImageFileInputEl = document.querySelector("#messages-image-file-input");
const messagesProfileAvatarResetBtnEl = document.querySelector("#messages-profile-avatar-reset-btn");
const messagesProfileUsernameInputEl = document.querySelector("#messages-profile-username-input");
const messagesProfileUserIdInputEl = document.querySelector("#messages-profile-userid-input");
const messagesProfilePersonaInputEl = document.querySelector("#messages-profile-persona-input");
const messagesProfileEditorStatusEl = document.querySelector("#messages-profile-editor-status");

const messagesContactModalEl = document.querySelector("#messages-contact-modal");
const messagesContactModalCloseBtnEl = document.querySelector("#messages-contact-modal-close-btn");
const messagesContactModalTitleEl = document.querySelector("#messages-contact-modal-title");
const messagesContactSaveBtnEl = document.querySelector("#messages-contact-save-btn");
const messagesContactFormEl = document.querySelector("#messages-contact-form");
const messagesContactAvatarPreviewEl = document.querySelector("#messages-contact-avatar-preview");
const messagesContactAvatarFileInputEl = document.querySelector("#messages-contact-avatar-file-input");
const messagesContactAvatarResetBtnEl = document.querySelector("#messages-contact-avatar-reset-btn");
const messagesContactNameInputEl = document.querySelector("#messages-contact-name-input");
const messagesContactPersonaInputEl = document.querySelector("#messages-contact-persona-input");
const messagesContactForumFandomEnabledInputEl = document.querySelector(
  "#messages-contact-forum-fandom-enabled-input"
);
const messagesContactForumFandomFieldsEl = document.querySelector(
  "#messages-contact-forum-fandom-fields"
);
const messagesContactForumFandomTabNameInputEl = document.querySelector(
  "#messages-contact-forum-fandom-tab-name-input"
);
const messagesContactForumFandomAudienceInputEl = document.querySelector(
  "#messages-contact-forum-fandom-audience-input"
);
const messagesContactRoleSpecialPersonaInputEl = document.querySelector(
  "#messages-contact-role-special-persona-input"
);
const messagesContactUserSpecialPersonaInputEl = document.querySelector(
  "#messages-contact-special-persona-input"
);
const messagesContactEditorStatusEl = document.querySelector("#messages-contact-editor-status");
const messagesContactDeleteSectionEl = document.querySelector("#messages-contact-delete-section");
const messagesContactDeleteBtnEl = document.querySelector("#messages-contact-delete-btn");

const messagesPickerModalEl = document.querySelector("#messages-picker-modal");
const messagesPickerCloseBtnEl = document.querySelector("#messages-picker-close-btn");
const messagesPickerListEl = document.querySelector("#messages-picker-list");

const messagesChatSettingsModalEl = document.querySelector("#messages-chat-settings-modal");
const messagesChatSettingsCloseBtnEl = document.querySelector(
  "#messages-chat-settings-close-btn"
);
const messagesChatSettingsSaveBtnEl = document.querySelector("#messages-chat-settings-save-btn");
const messagesChatSettingsFormEl = document.querySelector("#messages-chat-settings-form");
const messagesChatHistoryRoundsInputEl = document.querySelector(
  "#messages-chat-history-rounds-input"
);
const messagesChatReplySentenceLimitInputEl = document.querySelector(
  "#messages-chat-reply-sentence-limit-input"
);
const messagesChatAwarenessRoundsInputEl = document.querySelector(
  "#messages-chat-awareness-rounds-input"
);
const messagesChatTimeAwarenessInputEl = document.querySelector(
  "#messages-chat-time-awareness-input"
);
const messagesChatScheduleWindowInputEl = document.querySelector(
  "#messages-chat-schedule-window-input"
);
const messagesChatHotTopicsInputEl = document.querySelector("#messages-chat-hot-topics-input");
const messagesChatHotTopicsTabSelectEl = document.querySelector(
  "#messages-chat-hot-topics-tab-select"
);
const messagesChatHotTopicsTextInputEl = document.querySelector(
  "#messages-chat-hot-topics-text-input"
);
const messagesChatHotTopicsTopicInputEl = document.querySelector(
  "#messages-chat-hot-topics-topic-input"
);
const messagesChatHotTopicsWarningEl = document.querySelector(
  "#messages-chat-hot-topics-warning"
);
const messagesChatWorldbookInputEl = document.querySelector(
  "#messages-chat-worldbook-enabled-input"
);
const messagesChatWorldbookListEl = document.querySelector("#messages-chat-worldbook-list");
const messagesChatProfilePostFocusInputEl = document.querySelector(
  "#messages-chat-profile-post-focus-input"
);
const messagesChatBubbleFocusInputEl = document.querySelector(
  "#messages-chat-bubble-focus-input"
);
const messagesChatBubbleFocusMinutesInputEl = document.querySelector(
  "#messages-chat-bubble-focus-minutes-input"
);
const messagesChatShowContactAvatarInputEl = document.querySelector(
  "#messages-chat-show-contact-avatar-input"
);
const messagesChatShowUserAvatarInputEl = document.querySelector(
  "#messages-chat-show-user-avatar-input"
);
const messagesChatVideoContactPreviewEl = document.querySelector(
  "#messages-chat-video-contact-preview"
);
const messagesChatVideoContactFileInputEl = document.querySelector(
  "#messages-chat-video-contact-file-input"
);
const messagesChatVideoContactResetBtnEl = document.querySelector(
  "#messages-chat-video-contact-reset-btn"
);
const messagesChatVideoUserPreviewEl = document.querySelector("#messages-chat-video-user-preview");
const messagesChatVideoUserFileInputEl = document.querySelector(
  "#messages-chat-video-user-file-input"
);
const messagesChatVideoUserResetBtnEl = document.querySelector(
  "#messages-chat-video-user-reset-btn"
);
const messagesChatAllowAiPresenceUpdateInputEl = document.querySelector(
  "#messages-chat-allow-ai-presence-update-input"
);
const messagesChatAllowAiProactiveMessageInputEl = document.querySelector(
  "#messages-chat-allow-ai-proactive-message-input"
);
const messagesChatAllowAiAutoScheduleInputEl = document.querySelector(
  "#messages-chat-allow-ai-auto-schedule-input"
);
const messagesChatAutoScheduleDaysInputEl = document.querySelector(
  "#messages-chat-auto-schedule-days-input"
);
const messagesChatAutoScheduleTimeInputEl = document.querySelector(
  "#messages-chat-auto-schedule-time-input"
);
const messagesChatAutoScheduleGenerateBtnEl = document.querySelector(
  "#messages-chat-auto-schedule-generate-btn"
);
const messagesChatAutoScheduleModalEl = document.querySelector(
  "#messages-chat-auto-schedule-modal"
);
const messagesChatAutoScheduleCloseBtnEl = document.querySelector(
  "#messages-chat-auto-schedule-close-btn"
);
const messagesChatAutoScheduleConfirmBtnEl = document.querySelector(
  "#messages-chat-auto-schedule-confirm-btn"
);
const messagesChatAutoScheduleFormEl = document.querySelector(
  "#messages-chat-auto-schedule-form"
);
const messagesChatAutoScheduleWorldbookListEl = document.querySelector(
  "#messages-chat-auto-schedule-worldbook-list"
);
const messagesChatAutoScheduleNoteInputEl = document.querySelector(
  "#messages-chat-auto-schedule-note-input"
);
const messagesChatAutoScheduleStatusEl = document.querySelector(
  "#messages-chat-auto-schedule-status"
);
let autoScheduleTimerId = 0;
let proactiveTriggerTimerId = 0;
let proactiveTriggerInitialCatchupPending = true;
let foregroundReplySyncTimerId = 0;
let foregroundReplySyncConversationId = "";
let foregroundReplySyncUntil = 0;
let conversationStorageMaintenanceTimerId = 0;
let voiceCallDurationTimerId = 0;
let chatSyncFlushTimerId = 0;
let chatSyncFlushInFlight = false;
let chatSyncDeferredReason = "";
let chatSyncDeferredAt = 0;
const messagesChatClearHistoryBtnEl = document.querySelector("#messages-chat-clear-history-btn");
const messagesChatClearMemoryBtnEl = document.querySelector("#messages-chat-clear-memory-btn");
const messagesChatSettingsStatusEl = document.querySelector("#messages-chat-settings-status");
const messagesSceneModalEl = document.querySelector("#messages-scene-modal");
const messagesSceneCloseBtnEl = document.querySelector("#messages-scene-close-btn");
const messagesSceneFormEl = document.querySelector("#messages-scene-form");
const messagesSceneSaveBtnEl = document.querySelector("#messages-scene-save-btn");
const messagesSceneOnlineBtnEl = document.querySelector("#messages-scene-online-btn");
const messagesSceneOfflineBtnEl = document.querySelector("#messages-scene-offline-btn");
const messagesSceneStatusEl = document.querySelector("#messages-scene-status");
const messagesSceneUserScopeNoteEl = document.querySelector("#messages-scene-user-scope-note");
const messagesSceneUserPresenceTypeInputEl = document.querySelector(
  "#messages-scene-user-presence-type-input"
);
const messagesSceneUserAtPlaceFieldsEl = document.querySelector(
  "#messages-scene-user-at-place-fields"
);
const messagesSceneUserTransitFieldsEl = document.querySelector(
  "#messages-scene-user-transit-fields"
);
const messagesSceneUserPlaceSelectEl = document.querySelector("#messages-scene-user-place-select");
const messagesSceneUserFromPlaceSelectEl = document.querySelector(
  "#messages-scene-user-from-place-select"
);
const messagesSceneUserToPlaceSelectEl = document.querySelector(
  "#messages-scene-user-to-place-select"
);
const messagesSceneContactPresenceTypeInputEl = document.querySelector(
  "#messages-scene-contact-presence-type-input"
);
const messagesSceneContactAtPlaceFieldsEl = document.querySelector(
  "#messages-scene-contact-at-place-fields"
);
const messagesSceneContactTransitFieldsEl = document.querySelector(
  "#messages-scene-contact-transit-fields"
);
const messagesSceneContactPlaceSelectEl = document.querySelector(
  "#messages-scene-contact-place-select"
);
const messagesSceneContactFromPlaceSelectEl = document.querySelector(
  "#messages-scene-contact-from-place-select"
);
const messagesSceneContactToPlaceSelectEl = document.querySelector(
  "#messages-scene-contact-to-place-select"
);
const messagesSceneSyncPlaceBtnEl = document.querySelector("#messages-scene-sync-place-btn");
const messagesSceneManagePlacesBtnEl = document.querySelector("#messages-scene-manage-places-btn");
const messagesChatGlobalSettingsModalEl = document.querySelector(
  "#messages-chat-global-settings-modal"
);
const messagesChatGlobalSettingsCloseBtnEl = document.querySelector(
  "#messages-chat-global-settings-close-btn"
);
const messagesChatGlobalSettingsCancelBtnEl = document.querySelector(
  "#messages-chat-global-settings-cancel-btn"
);
const messagesChatGlobalSettingsFormEl = document.querySelector(
  "#messages-chat-global-settings-form"
);
const messagesChatUserPresenceScopeInputEl = document.querySelector(
  "#messages-chat-user-presence-scope-input"
);
const messagesChatGlobalSettingsStatusEl = document.querySelector(
  "#messages-chat-global-settings-status"
);
const messagesPlacesModalEl = document.querySelector("#messages-places-modal");
const messagesPlacesCloseBtnEl = document.querySelector("#messages-places-close-btn");
const messagesPlacesAddBtnEl = document.querySelector("#messages-places-add-btn");
const messagesPlaceSearchInputEl = document.querySelector("#messages-place-search-input");
const messagesPlaceSearchBtnEl = document.querySelector("#messages-place-search-btn");
const messagesPlaceFilterSelectEl = document.querySelector("#messages-place-filter-select");
const messagesPlacesStatusEl = document.querySelector("#messages-places-status");
const messagesPlacesListEl = document.querySelector("#messages-places-list");
const messagesPlaceEditorModalEl = document.querySelector("#messages-place-editor-modal");
const messagesPlaceEditorCloseBtnEl = document.querySelector("#messages-place-editor-close-btn");
const messagesPlaceEditorTitleEl = document.querySelector("#messages-place-editor-title");
const messagesPlaceEditorFormEl = document.querySelector("#messages-place-editor-form");
const messagesPlaceNameInputEl = document.querySelector("#messages-place-name-input");
const messagesPlaceTypeSelectEl = document.querySelector("#messages-place-type-select");
const messagesPlaceAliasesInputEl = document.querySelector("#messages-place-aliases-input");
const messagesPlaceTraitsInputEl = document.querySelector("#messages-place-traits-input");
const messagesPlaceVisibilitySelectEl = document.querySelector("#messages-place-visibility-select");
const messagesPlaceVisibleContactsFieldEl = document.querySelector(
  "#messages-place-visible-contacts-field"
);
const messagesPlaceVisibleContactsListEl = document.querySelector(
  "#messages-place-visible-contacts-list"
);
const messagesPlaceEditorStatusEl = document.querySelector("#messages-place-editor-status");
const messagesPlaceEditorSetUserBtnEl = document.querySelector(
  "#messages-place-editor-set-user-btn"
);
const messagesPlaceEditorSetContactBtnEl = document.querySelector(
  "#messages-place-editor-set-contact-btn"
);
const messagesPlaceEditorDeleteBtnEl = document.querySelector(
  "#messages-place-editor-delete-btn"
);
const messagesSceneSyncModalEl = document.querySelector("#messages-scene-sync-modal");
const messagesSceneSyncCloseBtnEl = document.querySelector("#messages-scene-sync-close-btn");
const messagesSceneSyncDescriptionEl = document.querySelector(
  "#messages-scene-sync-description"
);
const messagesSceneSyncPlaceSelectEl = document.querySelector(
  "#messages-scene-sync-place-select"
);
const messagesSceneSyncStatusEl = document.querySelector("#messages-scene-sync-status");
const messagesSceneSyncUseUserBtnEl = document.querySelector(
  "#messages-scene-sync-use-user-btn"
);
const messagesSceneSyncUseContactBtnEl = document.querySelector(
  "#messages-scene-sync-use-contact-btn"
);
const messagesSceneSyncUseCustomBtnEl = document.querySelector(
  "#messages-scene-sync-use-custom-btn"
);

const messagesWorldbookModalEl = document.querySelector("#messages-worldbook-modal");
const messagesWorldbookCloseBtnEl = document.querySelector("#messages-worldbook-close-btn");
const messagesWorldbookAddCategoryBtnEl = document.querySelector(
  "#messages-worldbook-add-category-btn"
);
const messagesWorldbookAddEntryBtnEl = document.querySelector("#messages-worldbook-add-entry-btn");
const messagesWorldbookStatusEl = document.querySelector("#messages-worldbook-status");
const messagesWorldbookListEl = document.querySelector("#messages-worldbook-list");

const messagesWorldbookEditorModalEl = document.querySelector("#messages-worldbook-editor-modal");
const messagesWorldbookEditorCloseBtnEl = document.querySelector(
  "#messages-worldbook-editor-close-btn"
);
const messagesWorldbookEditorTitleEl = document.querySelector(
  "#messages-worldbook-editor-title"
);
const messagesWorldbookEditorFormEl = document.querySelector(
  "#messages-worldbook-editor-form"
);
const messagesWorldbookNameFieldEl = document.querySelector("#messages-worldbook-name-field");
const messagesWorldbookNameLabelEl = document.querySelector("#messages-worldbook-name-label");
const messagesWorldbookNameInputEl = document.querySelector("#messages-worldbook-name-input");
const messagesWorldbookCategoryFieldEl = document.querySelector(
  "#messages-worldbook-category-field"
);
const messagesWorldbookCategorySelectEl = document.querySelector(
  "#messages-worldbook-category-select"
);
const messagesWorldbookTextFieldEl = document.querySelector("#messages-worldbook-text-field");
const messagesWorldbookTextInputEl = document.querySelector("#messages-worldbook-text-input");
const messagesWorldbookEditorStatusEl = document.querySelector(
  "#messages-worldbook-editor-status"
);
const messagesRegenerateModalEl = document.querySelector("#messages-regenerate-modal");
const messagesRegenerateCloseBtnEl = document.querySelector("#messages-regenerate-close-btn");
const messagesRegenerateCancelBtnEl = document.querySelector("#messages-regenerate-cancel-btn");
const messagesRegenerateFormEl = document.querySelector("#messages-regenerate-form");
const messagesRegenerateInstructionInputEl = document.querySelector(
  "#messages-regenerate-instruction-input"
);
const messagesLocationModalEl = document.querySelector("#messages-location-modal");
const messagesLocationCloseBtnEl = document.querySelector("#messages-location-close-btn");
const messagesLocationCancelBtnEl = document.querySelector("#messages-location-cancel-btn");
const messagesLocationFormEl = document.querySelector("#messages-location-form");
const messagesLocationNameInputEl = document.querySelector("#messages-location-name-input");
const messagesLocationRecentListEl = document.querySelector("#messages-location-recent-list");
const messagesLocationPreviewEl = document.querySelector("#messages-location-preview");
const messagesLocationStatusEl = document.querySelector("#messages-location-status");
const messagesVoiceModalEl = document.querySelector("#messages-voice-modal");
const messagesVoiceCloseBtnEl = document.querySelector("#messages-voice-close-btn");
const messagesVoiceCancelBtnEl = document.querySelector("#messages-voice-cancel-btn");
const messagesVoiceFormEl = document.querySelector("#messages-voice-form");
const messagesVoiceTextInputEl = document.querySelector("#messages-voice-text-input");
const messagesVoiceStatusEl = document.querySelector("#messages-voice-status");
const messagesPhotoModalEl = document.querySelector("#messages-photo-modal");
const messagesPhotoCloseBtnEl = document.querySelector("#messages-photo-close-btn");
const messagesPhotoCancelBtnEl = document.querySelector("#messages-photo-cancel-btn");
const messagesPhotoFormEl = document.querySelector("#messages-photo-form");
const messagesPhotoDescriptionInputEl = document.querySelector("#messages-photo-description-input");
const messagesPhotoStatusEl = document.querySelector("#messages-photo-status");
const messagesAwarenessModalEl = document.querySelector("#messages-awareness-modal");
const messagesAwarenessCloseBtnEl = document.querySelector("#messages-awareness-close-btn");
const messagesAwarenessCancelBtnEl = document.querySelector("#messages-awareness-cancel-btn");
const messagesAwarenessFormEl = document.querySelector("#messages-awareness-form");
const messagesAwarenessTitleInputEl = document.querySelector("#messages-awareness-title-input");
const messagesAwarenessTextInputEl = document.querySelector("#messages-awareness-text-input");
const messagesAwarenessEmotionInputEl = document.querySelector(
  "#messages-awareness-emotion-input"
);
const messagesAwarenessSensitivityInputEl = document.querySelector(
  "#messages-awareness-sensitivity-input"
);
const messagesAwarenessTriggerBtnEl = document.querySelector("#messages-awareness-trigger-btn");
const messagesAwarenessHistoryEl = document.querySelector("#messages-awareness-history");
const messagesAwarenessStatusEl = document.querySelector("#messages-awareness-status");
const messagesJournalModalEl = document.querySelector("#messages-journal-modal");
const messagesJournalCloseBtnEl = document.querySelector("#messages-journal-close-btn");
const messagesJournalHistoryBtnEl = document.querySelector("#messages-journal-history-btn");
const messagesJournalSettingsBtnEl = document.querySelector("#messages-journal-settings-btn");
const messagesJournalBodyEl = document.querySelector("#messages-journal-body");
const messagesJournalHistoryModalEl = document.querySelector("#messages-journal-history-modal");
const messagesJournalHistoryCloseBtnEl = document.querySelector(
  "#messages-journal-history-close-btn"
);
const messagesJournalHistoryListEl = document.querySelector("#messages-journal-history-list");
const messagesJournalSettingsModalEl = document.querySelector("#messages-journal-settings-modal");
const messagesJournalSettingsCloseBtnEl = document.querySelector(
  "#messages-journal-settings-close-btn"
);
const messagesJournalSettingsCancelBtnEl = document.querySelector(
  "#messages-journal-settings-cancel-btn"
);
const messagesJournalSettingsFormEl = document.querySelector("#messages-journal-settings-form");
const messagesJournalLengthInputEl = document.querySelector("#messages-journal-length-input");
const messagesJournalSettingsStatusEl = document.querySelector(
  "#messages-journal-settings-status"
);
const messagesScheduleModalEl = document.querySelector("#messages-schedule-modal");
const messagesScheduleCloseBtnEl = document.querySelector("#messages-schedule-close-btn");
const messagesScheduleBodyEl = document.querySelector("#messages-schedule-body");
const messagesDiscussionShareModalEl = document.querySelector("#messages-discussion-share-modal");
const messagesDiscussionShareModalCloseBtnEl = document.querySelector(
  "#messages-discussion-share-close-btn"
);
const messagesDiscussionShareModalMetaEl = document.querySelector(
  "#messages-discussion-share-meta"
);
const messagesDiscussionShareModalRootEl = document.querySelector(
  "#messages-discussion-share-root"
);
const messagesDiscussionShareModalRepliesEl = document.querySelector(
  "#messages-discussion-share-replies"
);
const messagesDiscussionShareModalHintEl = document.querySelector(
  "#messages-discussion-share-hint"
);
const messagesMemoryModalEl = document.querySelector("#messages-memory-modal");
const messagesMemoryCloseBtnEl = document.querySelector("#messages-memory-close-btn");
const messagesMemoryAddBtnEl = document.querySelector("#messages-memory-add-btn");
const messagesMemorySettingsBtnEl = document.querySelector("#messages-memory-settings-btn");
const messagesMemoryContactSelectEl = document.querySelector("#messages-memory-contact-select");
const messagesMemorySearchInputEl = document.querySelector("#messages-memory-search-input");
const messagesMemorySearchBtnEl = document.querySelector("#messages-memory-search-btn");
const messagesMemoryStatusEl = document.querySelector("#messages-memory-status");
const messagesMemoryListEl = document.querySelector("#messages-memory-list");
const messagesMemoryEditorModalEl = document.querySelector("#messages-memory-editor-modal");
const messagesMemoryEditorCloseBtnEl = document.querySelector("#messages-memory-editor-close-btn");
const messagesMemoryEditorCancelBtnEl = document.querySelector(
  "#messages-memory-editor-cancel-btn"
);
const messagesMemoryEditorTitleEl = document.querySelector("#messages-memory-editor-title");
const messagesMemoryEditorFormEl = document.querySelector("#messages-memory-editor-form");
const messagesMemoryEditorContactSelectEl = document.querySelector(
  "#messages-memory-editor-contact-select"
);
const messagesMemoryEditorContentInputEl = document.querySelector(
  "#messages-memory-editor-content-input"
);
const messagesMemoryEditorImportanceInputEl = document.querySelector(
  "#messages-memory-editor-importance-input"
);
const messagesMemoryEditorAutoSummaryBtnEl = document.querySelector(
  "#messages-memory-editor-auto-summary-btn"
);
const messagesMemoryEditorSaveBtnEl = document.querySelector("#messages-memory-editor-save-btn");
const messagesMemoryEditorStatusEl = document.querySelector("#messages-memory-editor-status");
const messagesMemorySettingsModalEl = document.querySelector("#messages-memory-settings-modal");
const messagesMemorySettingsCloseBtnEl = document.querySelector(
  "#messages-memory-settings-close-btn"
);
const messagesMemorySettingsCancelBtnEl = document.querySelector(
  "#messages-memory-settings-cancel-btn"
);
const messagesMemorySettingsFormEl = document.querySelector("#messages-memory-settings-form");
const messagesMemorySummaryIntervalInputEl = document.querySelector(
  "#messages-memory-summary-interval-input"
);
const messagesInnerThoughtModalEl = document.querySelector("#messages-inner-thought-modal");
const messagesInnerThoughtCloseBtnEl = document.querySelector("#messages-inner-thought-close-btn");
const messagesInnerThoughtCancelBtnEl = document.querySelector("#messages-inner-thought-cancel-btn");
const messagesInnerThoughtBodyEl = document.querySelector("#messages-inner-thought-body");
const messagesMemoryCoreThresholdInputEl = document.querySelector(
  "#messages-memory-core-threshold-input"
);
const messagesMemorySceneThresholdInputEl = document.querySelector(
  "#messages-memory-scene-threshold-input"
);
const messagesMemorySettingsStatusEl = document.querySelector(
  "#messages-memory-settings-status"
);

const memoryStorage = {};
const initialWindowFocusPrimed =
  typeof document !== "undefined" && typeof document.hasFocus === "function"
    ? document.hasFocus()
    : true;
let conversationListLongPressTimerId = 0;
let conversationListLongPressConversationId = "";
let conversationListLongPressTriggeredId = "";
let conversationListLongPressStartPoint = null;
let foregroundReplyTaskHeartbeatStop = () => {};
const proactiveTriggerWorkerInstanceId = `proactive_worker_${Date.now()}_${Math.random()
  .toString(36)
  .slice(2, 8)}`;
const memoryCloudCacheByContact = new Map();
const memoryCloudInflightByContact = new Map();
let memoryCloudBootstrapStarted = false;

const state = {
  profile: { ...DEFAULT_PROFILE },
  contacts: [],
  conversations: [],
  worldbooks: {
    categories: [],
    entries: []
  },
  commonPlaces: [],
  presenceState: {
    userGlobal: {
      presenceType: "at_place",
      placeId: "",
      fromPlaceId: "",
      toPlaceId: "",
      updatedAt: 0
    },
    userByContact: {},
    contacts: {}
  },
  journalEntries: [],
  memories: [],
  recentLocations: [],
  chatPromptSettings: normalizeMessagePromptSettings(DEFAULT_SETTINGS.messagePromptSettings),
  chatGlobalSettings: normalizeChatGlobalSettings(DEFAULT_SETTINGS.chatGlobalSettings),
  activeTab: "chat",
  activeConversationId: "",
  query: "",
  contactsSearchOpen: false,
  profileEditorOpen: false,
  profileEditorAvatarImage: "",
  contactEditorOpen: false,
  contactEditorId: "",
  contactEditorAvatarImage: "",
  conversationPickerOpen: false,
  chatSettingsOpen: false,
  chatSettingsVideoContactImage: "",
  chatSettingsVideoUserImage: "",
  autoScheduleRequestOpen: false,
  autoScheduleRequestDraft: {
    worldbookIds: [],
    note: ""
  },
  chatGlobalSettingsOpen: false,
  worldbookManagerOpen: false,
  worldbookEditorOpen: false,
  placesManagerOpen: false,
  placeEditorOpen: false,
  placeEditorId: "",
  placeQuery: "",
  placeFilterType: "all",
  worldbookEditorMode: "entry",
  worldbookEditingEntryId: "",
  worldbookCollapsedGroupIds: [],
  requestingConversationId: "",
  sendingConversationId: "",
  chatReadonlyMode: false,
  chatReadonlyReason: "",
  chatCloudHydrated: false,
  chatCloudHydrating: false,
  composerPanelOpen: false,
  messageActionMessageId: "",
  messageSelectionMode: false,
  messageSelectionConversationId: "",
  selectedMessageIds: [],
  regenerateModalOpen: false,
  regenerateInstruction: "",
  locationModalOpen: false,
  voiceModalOpen: false,
  photoModalOpen: false,
  awarenessModalOpen: false,
  awarenessFormResetRequested: false,
  locationDraftName: "",
  locationDraftCoordinates: "",
  voiceDraftText: "",
  photoDraftDescription: "",
  journalOpen: false,
  journalHistoryOpen: false,
  journalSettingsOpen: false,
  journalSelectedEntryId: "",
  schedulePreviewOpen: false,
  discussionShareModalOpen: false,
  discussionShareModalMessageId: "",
  memoryViewerOpen: false,
  memoryEditorOpen: false,
  memorySettingsOpen: false,
  memoryStandaloneLaunch: false,
  memoryEditingId: "",
  memorySelectedContactId: "",
  memoryQuery: "",
  memoryTab: "all",
  memoryCloudRefreshToken: "",
  journalGenerating: false,
  journalWeatherDate: "",
  journalWeatherLabel: "",
  journalWeatherLoading: false,
  journalWeatherError: "",
  journalStatusMessage: "",
  journalStatusTone: "",
  backgroundReplyTaskBusy: false,
  replyResumeBusy: false,
  windowFocusPrimed: initialWindowFocusPrimed,
  conversationVisibleCounts: {},
  conversationDrafts: {},
  quotedMessageId: "",
  expandedImageMessageId: "",
  expandedVoiceMessageId: "",
  innerThoughtModalOpen: false,
  innerThoughtLoading: false,
  innerThoughtError: "",
  innerThoughtContent: "",
  innerThoughtTargetMessageId: "",
  innerThoughtTargetRole: "",
  innerThoughtTargetPreview: "",
  sceneModalOpen: false,
  sceneSyncModalOpen: false,
  pendingAssistantReveal: null,
  activeForegroundReplyTaskId: "",
  suppressForegroundRefreshUntil: 0,
  pendingConversationRenderOptions: null
};

let chatSyncQueueState = null;
const regenerateDebugEvents = [];

function pushRegenerateDebugEvent(stage = "", details = {}, options = {}) {
  const entry = {
    at: new Date().toISOString(),
    stage: String(stage || "").trim() || "unknown",
    details: details && typeof details === "object" ? { ...details } : {}
  };
  regenerateDebugEvents.push(entry);
  if (regenerateDebugEvents.length > 80) {
    regenerateDebugEvents.splice(0, regenerateDebugEvents.length - 80);
  }
  if (typeof window !== "undefined") {
    window.__pulseRegenerateDebug = regenerateDebugEvents.map((item) => ({
      ...item,
      details: item.details && typeof item.details === "object" ? { ...item.details } : {}
    }));
  }
  const logLevel = String(options.level || "").trim().toLowerCase();
  if (logLevel === "error") {
    console.error("[Pulse Messages][Regenerate]", entry);
  } else if (logLevel === "warn") {
    console.warn("[Pulse Messages][Regenerate]", entry);
  } else {
    console.info("[Pulse Messages][Regenerate]", entry);
  }
  const statusMessage = String(options.statusMessage || "").trim();
  if (statusMessage && !options.suppressUi) {
    setMessagesStatus(statusMessage, String(options.statusTone || "error").trim() || "error");
  }
  return entry;
}

function isEmbeddedView() {
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get("embed") === "1") {
      return true;
    }
  } catch (_error) {
  }

  try {
    return window.self !== window.top;
  } catch (_error) {
    return true;
  }
}

function isBackgroundMessagesWorker() {
  try {
    const params = new URLSearchParams(window.location.search);
    return params.get("background") === "1";
  } catch (_error) {
    return false;
  }
}

function getBackgroundWorkerMode() {
  try {
    const params = new URLSearchParams(window.location.search);
    const mode = String(params.get("worker") || "").trim().toLowerCase();
    if (mode === "reply") {
      return "reply";
    }
    if (mode === "automation") {
      return "automation";
    }
  } catch (_error) {
  }
  return "";
}

function isBackgroundReplyWorker() {
  return isBackgroundMessagesWorker() && getBackgroundWorkerMode() === "reply";
}

function isBackgroundAutomationWorker() {
  return isBackgroundMessagesWorker() && getBackgroundWorkerMode() === "automation";
}

function canUseBackgroundReplyWorker() {
  return isEmbeddedView() && !isBackgroundMessagesWorker();
}

function requestEmbeddedClose() {
  if (!isEmbeddedView()) {
    return;
  }

  handoffForegroundReplyTaskToBackground();

  try {
    window.parent?.postMessage({ type: "pulse-generator-close-app" }, "*");
  } catch (_error) {
  }
}

function getMessagesLaunchView() {
  try {
    const params = new URLSearchParams(window.location.search);
    const view = String(params.get("view") || params.get("entry") || "").trim().toLowerCase();
    if (view === "memory") {
      return "memory";
    }
    if (params.get("memory") === "1") {
      return "memory";
    }
  } catch (_error) {
  }
  return "";
}

function dismissMemoryViewer() {
  if (state.memoryStandaloneLaunch && isEmbeddedView()) {
    requestEmbeddedClose();
    return;
  }
  setMemoryViewerOpen(false);
}

function notifyEmbeddedReady() {
  if (!isEmbeddedView()) {
    return;
  }

  const sendReady = () => {
    try {
      window.parent?.postMessage({ type: "pulse-generator-app-ready", app: "messages" }, "*");
    } catch (_error) {
    }
  };

  if (typeof window.requestAnimationFrame === "function") {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(sendReady);
    });
    return;
  }

  window.setTimeout(sendReady, 0);
}

function updateMessagesViewportHeight() {
  if (typeof document === "undefined") {
    return;
  }
  const visualViewportHeight = Number(window.visualViewport?.height) || 0;
  const layoutViewportHeight = Number(window.innerHeight) || 0;
  const viewportHeight = Math.round(
    visualViewportHeight > 0 ? visualViewportHeight : layoutViewportHeight
  );
  if (!viewportHeight) {
    return;
  }
  document.documentElement.style.setProperty("--messages-app-height", `${viewportHeight}px`);
}

function bindMessagesViewportHeight() {
  updateMessagesViewportHeight();
  window.addEventListener("resize", updateMessagesViewportHeight);
  window.addEventListener("orientationchange", updateMessagesViewportHeight);
  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", updateMessagesViewportHeight);
    window.visualViewport.addEventListener("scroll", updateMessagesViewportHeight);
  }
}

function safeGetItem(key) {
  try {
    const value = window.localStorage.getItem(key);
    if (value === null) {
      delete memoryStorage[key];
      return null;
    }
    memoryStorage[key] = value;
    return value;
  } catch (_error) {
    return Object.prototype.hasOwnProperty.call(memoryStorage, key) ? memoryStorage[key] : null;
  }
}

function safeSetItem(key, value) {
  memoryStorage[key] = value;
  try {
    window.localStorage.setItem(key, value);
    return true;
  } catch (_error) {
    return false;
  }
}

function resolveMessagesStorageApiBaseUrl() {
  const injectedBaseUrl = String(
    window.PULSE_STORAGE_API_BASE_URL || window.PULSE_API_BASE_URL || ""
  ).trim();
  if (injectedBaseUrl) {
    return injectedBaseUrl.replace(/\/+$/, "");
  }

  const origin = String(window.location?.origin || "").trim();
  const protocol = String(window.location?.protocol || "").trim().toLowerCase();
  const hostname = String(window.location?.hostname || "").trim().toLowerCase();

  if (!origin || origin === "null" || protocol === "file:") {
    return DEPLOYED_STORAGE_API_BASE_URL;
  }
  if (hostname === "localhost" || hostname === "127.0.0.1") {
    return LOCAL_STORAGE_API_BASE_URL;
  }
  if (hostname.endsWith(".fly.dev")) {
    return origin.replace(/\/+$/, "");
  }
  return DEPLOYED_STORAGE_API_BASE_URL;
}

function buildMessagesStorageApiUrl(pathname = "/api/health") {
  const baseUrl = resolveMessagesStorageApiBaseUrl();
  return new URL(String(pathname || "").replace(/^\/+/, ""), `${baseUrl}/`).toString();
}

async function requestMessagesStorageApi(pathname, options = {}) {
  const response = await fetch(buildMessagesStorageApiUrl(pathname), {
    ...options,
    headers: {
      Accept: "application/json",
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...(options.headers || {})
    }
  });

  let payload = null;
  try {
    payload = await response.json();
  } catch (_error) {
  }

  if (!response.ok || payload?.ok === false) {
    throw new Error(
      String(payload?.error || payload?.details || `请求失败（HTTP ${response.status || 500}）。`).trim()
    );
  }

  return payload;
}

function getChatReadonlyMessage() {
  return state.chatReadonlyReason || "数据库不可用，仅只读";
}

function setChatReadonlyMode(enabled, reason = "") {
  state.chatReadonlyMode = Boolean(enabled);
  state.chatReadonlyReason = state.chatReadonlyMode
    ? String(reason || "数据库不可用，仅只读").trim()
    : "";
  if (!state.chatReadonlyMode) {
    state.chatReadonlyReason = "";
  }
  return state.chatReadonlyMode;
}

function ensureChatMutationAllowed(actionLabel = "继续操作") {
  if (!state.chatReadonlyMode) {
    return true;
  }
  setMessagesStatus(`${getChatReadonlyMessage()}，暂时不能${actionLabel}。`, "error");
  return false;
}

function persistConversationMirror(conversations = state.conversations, options = {}) {
  const persistOptions = options && typeof options === "object" ? options : {};
  return persistConversations({
    ...persistOptions,
    sourceConversations: Array.isArray(conversations) ? conversations : [],
    mirrorOnly: true
  });
}

function normalizeCloudConversationList(conversations = []) {
  return (Array.isArray(conversations) ? conversations : [])
    .map((conversation, index) => normalizeConversation(conversation, index))
    .filter(Boolean);
}

function replaceConversationListInState(conversations = [], options = {}) {
  const requestOptions = options && typeof options === "object" ? options : {};
  state.conversations = normalizeCloudConversationList(conversations);
  if (
    state.activeConversationId &&
    !state.conversations.some(
      (conversation) => String(conversation?.id || "").trim() === String(state.activeConversationId || "").trim()
    )
  ) {
    closeConversationTransientUi();
    state.activeConversationId = "";
  }
  state.contacts = loadContacts(state.conversations);
  if (requestOptions.persistMirror !== false) {
    persistConversationMirror(state.conversations);
  }
  syncActiveConversationPromptSettings(getConversationById());
  return state.conversations;
}

function upsertConversationSnapshotInState(conversation = null, options = {}) {
  const normalizedConversation = normalizeConversation(conversation, 0);
  if (!normalizedConversation) {
    return null;
  }
  const requestOptions = options && typeof options === "object" ? options : {};
  const conversationId = String(normalizedConversation.id || "").trim();
  const existingIndex = state.conversations.findIndex(
    (item) => String(item?.id || "").trim() === conversationId
  );
  if (existingIndex >= 0) {
    state.conversations = state.conversations.map((item, index) =>
      index === existingIndex ? normalizedConversation : item
    );
  } else {
    state.conversations = [normalizedConversation, ...state.conversations];
  }
  state.contacts = loadContacts(state.conversations);
  if (requestOptions.persistMirror !== false) {
    persistConversationMirror(state.conversations, {
      deferMaintenance: Boolean(requestOptions.deferMaintenance),
      fallbackToMaintenanceOnFailure: requestOptions.fallbackToMaintenanceOnFailure !== false
    });
  }
  if (String(state.activeConversationId || "").trim() === conversationId) {
    syncActiveConversationPromptSettings(normalizedConversation);
  }
  return normalizedConversation;
}

function removeConversationSnapshotsFromState(conversationIds = [], options = {}) {
  const resolvedIds = new Set(
    normalizeObjectArray(conversationIds)
      .map((conversationId) => String(conversationId || "").trim())
      .filter(Boolean)
  );
  if (!resolvedIds.size) {
    return false;
  }
  const requestOptions = options && typeof options === "object" ? options : {};
  state.conversations = state.conversations.filter(
    (conversation) => !resolvedIds.has(String(conversation?.id || "").trim())
  );
  if (resolvedIds.has(String(state.activeConversationId || "").trim())) {
    closeConversationTransientUi();
    state.activeConversationId = "";
  }
  state.contacts = loadContacts(state.conversations);
  if (requestOptions.persistMirror !== false) {
    persistConversationMirror(state.conversations);
  }
  return true;
}

function cloneConversationSnapshotForCloud(conversation = null) {
  const normalizedConversation = normalizeConversation(conversation, 0);
  if (!normalizedConversation) {
    return null;
  }
  ensureConversationLastMutatedAt(normalizedConversation);
  normalizedConversation.messages = Array.isArray(normalizedConversation.messages)
    ? normalizedConversation.messages.map((message) => ({
        ...message,
        updatedAt: normalizeChatSyncTimestamp(message?.updatedAt || message?.createdAt) || Date.now()
      }))
    : [];
  return cloneConversationsForStorage([normalizedConversation])[0] || null;
}

function clearChatSyncQueueEntries(options = {}) {
  const requestOptions = options && typeof options === "object" ? options : {};
  const upsertIds = normalizeObjectArray(requestOptions.upsertIds)
    .map((conversationId) => String(conversationId || "").trim())
    .filter(Boolean);
  const deleteIds = normalizeObjectArray(requestOptions.deleteIds)
    .map((conversationId) => String(conversationId || "").trim())
    .filter(Boolean);
  if (!upsertIds.length && !deleteIds.length) {
    return false;
  }
  const queueState = loadChatSyncQueueState();
  upsertIds.forEach((conversationId) => {
    delete queueState.pendingUpserts[conversationId];
    delete queueState.pendingDeletes[conversationId];
  });
  deleteIds.forEach((conversationId) => {
    delete queueState.pendingUpserts[conversationId];
    delete queueState.pendingDeletes[conversationId];
  });
  queueState.lastError = "";
  queueState.lastSuccessAt = Date.now();
  persistChatSyncQueueState(queueState);
  return true;
}

async function loadCloudConversations() {
  const payload = await requestMessagesStorageApi("/api/chat/conversations");
  return normalizeCloudConversationList(payload?.conversations);
}

async function loadCloudConversationById(conversationId = "") {
  const resolvedConversationId = String(conversationId || "").trim();
  if (!resolvedConversationId) {
    throw new Error("缺少会话 ID。");
  }
  const payload = await requestMessagesStorageApi(
    `/api/chat/conversations/${encodeURIComponent(resolvedConversationId)}`
  );
  const conversation = normalizeConversation(payload?.conversation, 0);
  if (!conversation) {
    throw new Error("数据库中没有找到这段会话。");
  }
  return conversation;
}

async function refreshConversationSnapshotFromCloud(conversationId = "", options = {}) {
  const requestOptions = options && typeof options === "object" ? options : {};
  const conversation = await loadCloudConversationById(conversationId);
  const persistedConversation = upsertConversationSnapshotInState(conversation, {
    persistMirror: requestOptions.persistMirror !== false
  });
  return persistedConversation || conversation;
}

async function syncConversationSnapshotNow(conversation = null, reason = "mutation", options = {}) {
  const requestOptions = options && typeof options === "object" ? options : {};
  const snapshot = cloneConversationSnapshotForCloud(conversation);
  if (!snapshot?.id) {
    throw new Error("没有可同步的会话快照。");
  }
  const lastMutatedAt = ensureConversationLastMutatedAt(snapshot);
  const payload = await requestMessagesStorageApi("/api/chat/sync", {
    method: "POST",
    body: JSON.stringify({
      ownerId: "default",
      reason: normalizeChatSyncReason(reason),
      upserts: [
        {
          conversation: snapshot,
          lastMutatedAt
        }
      ],
      deletes: []
    }),
    keepalive: Boolean(requestOptions.keepalive)
  });
  clearChatSyncQueueEntries({
    upsertIds: [snapshot.id]
  });
  return {
    payload,
    conversation: snapshot,
    lastMutatedAt
  };
}

async function deleteConversationSnapshotsNow(conversationIds = [], reason = "mutation", options = {}) {
  const requestOptions = options && typeof options === "object" ? options : {};
  const resolvedIds = normalizeObjectArray(conversationIds)
    .map((conversationId) => String(conversationId || "").trim())
    .filter(Boolean);
  if (!resolvedIds.length) {
    return {
      ok: true,
      skipped: true
    };
  }
  const deletedAt = normalizeChatSyncTimestamp(requestOptions.deletedAt) || Date.now();
  const payload = await requestMessagesStorageApi("/api/chat/sync", {
    method: "POST",
    body: JSON.stringify({
      ownerId: "default",
      reason: normalizeChatSyncReason(reason),
      upserts: [],
      deletes: resolvedIds.map((conversationId) => ({
        conversationId,
        deletedAt
      }))
    }),
    keepalive: Boolean(requestOptions.keepalive)
  });
  clearChatSyncQueueEntries({
    deleteIds: resolvedIds
  });
  return payload;
}

async function bootstrapMissingLocalConversations(localConversations = [], cloudConversations = []) {
  const normalizedLocalConversations = normalizeCloudConversationList(localConversations);
  const cloudConversationIds = new Set(
    normalizeCloudConversationList(cloudConversations)
      .map((conversation) => String(conversation?.id || "").trim())
      .filter(Boolean)
  );
  const missingConversations = normalizedLocalConversations.filter((conversation) => {
    const conversationId = String(conversation?.id || "").trim();
    return conversationId && !cloudConversationIds.has(conversationId);
  });
  if (!missingConversations.length) {
    return {
      missingCount: 0,
      batchCount: 0
    };
  }

  for (let index = 0; index < missingConversations.length; index += 10) {
    const batch = missingConversations.slice(index, index + 10);
    const upserts = batch
      .map((conversation) => cloneConversationSnapshotForCloud(conversation))
      .filter(Boolean)
      .map((conversation) => ({
        conversation,
        lastMutatedAt: ensureConversationLastMutatedAt(conversation)
      }));
    if (!upserts.length) {
      continue;
    }
    await requestMessagesStorageApi("/api/chat/sync", {
      method: "POST",
      body: JSON.stringify({
        ownerId: "default",
        reason: "startup_retry",
        upserts,
        deletes: []
      })
    });
    clearChatSyncQueueEntries({
      upsertIds: upserts.map((entry) => entry.conversation.id)
    });
  }

  return {
    missingCount: missingConversations.length,
    batchCount: Math.ceil(missingConversations.length / 10)
  };
}

async function hydrateChatConversationsFromCloud(options = {}) {
  const requestOptions = options && typeof options === "object" ? options : {};
  if (state.chatCloudHydrating) {
    return false;
  }
  state.chatCloudHydrating = true;
  const localConversations = loadConversations();
  try {
    if (hasPendingChatSyncEntries()) {
      const pendingSyncResult = await flushPendingChatSyncQueue({
        reason: "startup_retry",
        rescheduleOnFailure: true
      });
      if (
        pendingSyncResult?.ok === false &&
        pendingSyncResult?.skipped !== true
      ) {
        throw pendingSyncResult.error || new Error("待同步聊天消息写入数据库失败。");
      }
    }
    let cloudConversations = await loadCloudConversations();
    const bootstrapResult = await bootstrapMissingLocalConversations(
      localConversations,
      cloudConversations
    );
    if (bootstrapResult.missingCount > 0) {
      cloudConversations = await loadCloudConversations();
    }
    setChatReadonlyMode(false);
    state.chatCloudHydrated = true;
    replaceConversationListInState(cloudConversations, {
      persistMirror: true
    });
    if (requestOptions.showStatus !== false && bootstrapResult.missingCount > 0) {
      setMessagesStatus(`已补传 ${bootstrapResult.missingCount} 个本地历史会话到数据库。`, "success");
    } else if (requestOptions.clearStatus !== false) {
      setMessagesStatus("");
    }
    return true;
  } catch (error) {
    console.error("[Pulse Messages] Failed to hydrate cloud conversations:", error);
    state.chatCloudHydrated = false;
    setChatReadonlyMode(true, "数据库不可用，仅只读");
    state.conversations = mergePreferredLocalConversations(state.conversations, localConversations);
    state.contacts = loadContacts(state.conversations);
    setMessagesStatus("数据库不可用，仅只读；发送、编辑、删除和重回已暂停。", "error");
    return false;
  } finally {
    state.chatCloudHydrating = false;
  }
}

function normalizeChatSyncReason(value = "", fallback = "mutation") {
  const normalized = String(value || "").trim().toLowerCase();
  if (["mutation", "startup_retry", "pagehide", "manual"].includes(normalized)) {
    return normalized;
  }
  return fallback;
}

function normalizeChatSyncTimestamp(value = 0) {
  return Math.max(0, Number(value) || 0);
}

function normalizeChatSyncQueueState(value = null) {
  const source = value && typeof value === "object" ? value : {};
  const pendingUpserts = {};
  const pendingDeletes = {};

  Object.entries(source.pendingUpserts || {}).forEach(([conversationId, entry]) => {
    const resolvedConversationId = String(conversationId || entry?.conversationId || "").trim();
    if (!resolvedConversationId) {
      return;
    }
    pendingUpserts[resolvedConversationId] = {
      conversationId: resolvedConversationId,
      lastMutatedAt: normalizeChatSyncTimestamp(
        entry?.lastMutatedAt || entry?.clientUpdatedAt || entry?.updatedAt
      )
    };
  });

  Object.entries(source.pendingDeletes || {}).forEach(([conversationId, entry]) => {
    const resolvedConversationId = String(conversationId || entry?.conversationId || "").trim();
    if (!resolvedConversationId) {
      return;
    }
    pendingDeletes[resolvedConversationId] = {
      conversationId: resolvedConversationId,
      deletedAt: normalizeChatSyncTimestamp(entry?.deletedAt || entry?.updatedAt)
    };
  });

  return {
    pendingUpserts,
    pendingDeletes,
    lastError: String(source.lastError || "").trim(),
    lastSuccessAt: normalizeChatSyncTimestamp(source.lastSuccessAt)
  };
}

function loadChatSyncQueueState() {
  chatSyncQueueState = normalizeChatSyncQueueState(
    readStoredJson(MESSAGE_CHAT_SYNC_STATE_KEY, null)
  );
  return chatSyncQueueState;
}

function getChatSyncQueueState() {
  return chatSyncQueueState ? chatSyncQueueState : loadChatSyncQueueState();
}

function persistChatSyncQueueState(nextState = null) {
  const resolvedState = normalizeChatSyncQueueState(nextState || getChatSyncQueueState());
  chatSyncQueueState = resolvedState;
  safeSetItem(MESSAGE_CHAT_SYNC_STATE_KEY, JSON.stringify(resolvedState));
  return resolvedState;
}

function hasPendingChatSyncEntries(queueState = getChatSyncQueueState()) {
  return Boolean(
    Object.keys(queueState.pendingUpserts || {}).length ||
      Object.keys(queueState.pendingDeletes || {}).length
  );
}

function hasPendingConversationChatSyncUpsert(conversationId = "") {
  const resolvedConversationId = String(conversationId || "").trim();
  if (!resolvedConversationId) {
    return false;
  }
  const queueState = getChatSyncQueueState();
  return Boolean(queueState.pendingUpserts?.[resolvedConversationId]);
}

function getConversationLastMutatedAt(conversation = null) {
  if (!conversation || typeof conversation !== "object") {
    return 0;
  }
  return normalizeChatSyncTimestamp(
    conversation.lastMutatedAt ||
      conversation.updatedAt ||
      conversation.messages?.[conversation.messages.length - 1]?.updatedAt ||
      conversation.messages?.[conversation.messages.length - 1]?.createdAt
  );
}

function ensureConversationLastMutatedAt(conversation = null) {
  if (!conversation || typeof conversation !== "object") {
    return 0;
  }
  const nextValue = getConversationLastMutatedAt(conversation) || Date.now();
  conversation.lastMutatedAt = nextValue;
  return nextValue;
}

function markConversationMutated(conversation = null, timestamp = Date.now()) {
  if (!conversation || typeof conversation !== "object") {
    return 0;
  }
  const nextValue = Math.max(
    ensureConversationLastMutatedAt(conversation),
    normalizeChatSyncTimestamp(timestamp) || Date.now()
  );
  conversation.lastMutatedAt = nextValue;
  return nextValue;
}

function resolveConversationForChatSync(conversationOrId = null) {
  const resolvedConversationId =
    typeof conversationOrId === "string"
      ? String(conversationOrId || "").trim()
      : String(conversationOrId?.id || "").trim();
  if (!resolvedConversationId) {
    return null;
  }
  if (conversationOrId && typeof conversationOrId === "object" && resolvedConversationId) {
    ensureConversationLastMutatedAt(conversationOrId);
    return conversationOrId;
  }
  return (
    state.conversations.find((conversation) => String(conversation?.id || "").trim() === resolvedConversationId) ||
    loadConversations().find((conversation) => String(conversation?.id || "").trim() === resolvedConversationId) ||
    null
  );
}

function cloneConversationForChatSync(conversation = null) {
  const resolvedConversation = resolveConversationForChatSync(conversation);
  if (!resolvedConversation) {
    return null;
  }
  const clonedConversation = cloneConversationsForStorage([resolvedConversation])[0] || null;
  if (!clonedConversation) {
    return null;
  }
  clonedConversation.lastMutatedAt = ensureConversationLastMutatedAt(resolvedConversation);
  clonedConversation.messages = Array.isArray(clonedConversation.messages)
    ? clonedConversation.messages.map((message) => ({
        ...message,
        updatedAt: normalizeChatSyncTimestamp(message?.updatedAt || message?.createdAt) || Date.now()
      }))
    : [];
  return clonedConversation;
}

function queueChatSyncFlush(reason = "mutation", delayMs = CHAT_SYNC_DEBOUNCE_MS) {
  const resolvedReason = normalizeChatSyncReason(reason);
  const resolvedDelay = Math.max(0, Number(delayMs) || 0);
  if (chatSyncFlushInFlight) {
    chatSyncDeferredReason = resolvedReason;
    chatSyncDeferredAt = Date.now();
    return false;
  }
  if (chatSyncFlushTimerId) {
    window.clearTimeout(chatSyncFlushTimerId);
  }
  chatSyncFlushTimerId = window.setTimeout(() => {
    chatSyncFlushTimerId = 0;
    void flushPendingChatSyncQueue({
      reason: resolvedReason
    });
  }, resolvedDelay);
  return true;
}

function enqueueConversationChatSyncUpsert(conversationOrId = null, options = {}) {
  const resolvedConversation = resolveConversationForChatSync(conversationOrId);
  if (!resolvedConversation) {
    return false;
  }
  const requestOptions = options && typeof options === "object" ? options : {};
  const queueState = getChatSyncQueueState();
  const conversationId = String(resolvedConversation.id || "").trim();
  queueState.pendingUpserts[conversationId] = {
    conversationId,
    lastMutatedAt: ensureConversationLastMutatedAt(resolvedConversation)
  };
  if (Object.prototype.hasOwnProperty.call(queueState.pendingDeletes, conversationId)) {
    delete queueState.pendingDeletes[conversationId];
  }
  queueState.lastError = "";
  persistChatSyncQueueState(queueState);
  if (requestOptions.scheduleFlush !== false) {
    queueChatSyncFlush(requestOptions.reason || "mutation");
  }
  return true;
}

function enqueueConversationChatSyncDelete(conversationIds = [], options = {}) {
  const requestOptions = options && typeof options === "object" ? options : {};
  const resolvedIds = normalizeObjectArray(conversationIds)
    .map((conversationId) => String(conversationId || "").trim())
    .filter(Boolean);
  if (!resolvedIds.length) {
    return false;
  }
  const queueState = getChatSyncQueueState();
  const deletedAt = normalizeChatSyncTimestamp(requestOptions.deletedAt) || Date.now();
  resolvedIds.forEach((conversationId) => {
    delete queueState.pendingUpserts[conversationId];
    queueState.pendingDeletes[conversationId] = {
      conversationId,
      deletedAt
    };
  });
  queueState.lastError = "";
  persistChatSyncQueueState(queueState);
  if (requestOptions.scheduleFlush !== false) {
    queueChatSyncFlush(requestOptions.reason || "mutation");
  }
  return true;
}

function scheduleChatSyncStartupRetry(delayMs = CHAT_SYNC_STARTUP_RETRY_DELAY_MS) {
  if (!hasPendingChatSyncEntries()) {
    return false;
  }
  return queueChatSyncFlush("startup_retry", delayMs);
}

async function flushPendingChatSyncQueue(options = {}) {
  const requestOptions = options && typeof options === "object" ? options : {};
  const reason = normalizeChatSyncReason(requestOptions.reason, "mutation");
  if (chatSyncFlushTimerId) {
    window.clearTimeout(chatSyncFlushTimerId);
    chatSyncFlushTimerId = 0;
  }
  if (chatSyncFlushInFlight) {
    if (requestOptions.rescheduleOnFailure !== false) {
      chatSyncDeferredReason = reason;
      chatSyncDeferredAt = Date.now();
    }
    return {
      ok: false,
      skipped: true,
      reason: "in_flight"
    };
  }

  const queueState = getChatSyncQueueState();
  if (!hasPendingChatSyncEntries(queueState)) {
    return {
      ok: true,
      skipped: true,
      reason: "empty"
    };
  }

  const mergedConversations = mergePreferredLocalConversations(
    Array.isArray(state.conversations) ? state.conversations.slice() : [],
    loadConversations()
  );
  const conversationById = new Map(
    mergedConversations
      .map((conversation) => [String(conversation?.id || "").trim(), conversation])
      .filter((entry) => entry[0])
  );
  const missingConversationIds = [];
  const sentUpserts = Object.values(queueState.pendingUpserts || {}).flatMap((entry) => {
    const conversationId = String(entry?.conversationId || "").trim();
    const conversation = conversationById.get(conversationId);
    if (!conversation) {
      missingConversationIds.push(conversationId);
      return [];
    }
    const conversationSnapshot = cloneConversationForChatSync(conversation);
    if (!conversationSnapshot) {
      missingConversationIds.push(conversationId);
      return [];
    }
    return [
      {
        conversationId,
        lastMutatedAt:
          normalizeChatSyncTimestamp(entry?.lastMutatedAt) ||
          ensureConversationLastMutatedAt(conversation),
        conversation: conversationSnapshot
      }
    ];
  });
  const sentDeletes = Object.values(queueState.pendingDeletes || {}).map((entry) => ({
    conversationId: String(entry?.conversationId || "").trim(),
    deletedAt: normalizeChatSyncTimestamp(entry?.deletedAt) || Date.now()
  }));

  if (!sentUpserts.length && !sentDeletes.length) {
    const nextState = {
      ...queueState,
      lastError: missingConversationIds.length
        ? `聊天同步失败：未找到会话 ${missingConversationIds.join(", ")}。`
        : queueState.lastError
    };
    persistChatSyncQueueState(nextState);
    return {
      ok: false,
      skipped: true,
      reason: "no_payload",
      missingConversationIds
    };
  }

  chatSyncFlushInFlight = true;
  try {
    const payload = await requestMessagesStorageApi("/api/chat/sync", {
      method: "POST",
      body: JSON.stringify({
        ownerId: "default",
        reason,
        upserts: sentUpserts.map((entry) => ({
          conversation: entry.conversation,
          lastMutatedAt: entry.lastMutatedAt
        })),
        deletes: sentDeletes
      }),
      keepalive: Boolean(requestOptions.keepalive)
    });

    const latestQueueState = loadChatSyncQueueState();
    sentUpserts.forEach((entry) => {
      const currentEntry = latestQueueState.pendingUpserts[entry.conversationId];
      if (
        currentEntry &&
        normalizeChatSyncTimestamp(currentEntry.lastMutatedAt) ===
          normalizeChatSyncTimestamp(entry.lastMutatedAt)
      ) {
        delete latestQueueState.pendingUpserts[entry.conversationId];
      }
    });
    sentDeletes.forEach((entry) => {
      const currentEntry = latestQueueState.pendingDeletes[entry.conversationId];
      if (
        currentEntry &&
        normalizeChatSyncTimestamp(currentEntry.deletedAt) ===
          normalizeChatSyncTimestamp(entry.deletedAt)
      ) {
        delete latestQueueState.pendingDeletes[entry.conversationId];
      }
    });
    latestQueueState.lastError = "";
    latestQueueState.lastSuccessAt = Date.now();
    persistChatSyncQueueState(latestQueueState);
    return payload;
  } catch (error) {
    const latestQueueState = loadChatSyncQueueState();
    latestQueueState.lastError = String(error?.message || "聊天记录同步失败。").trim();
    persistChatSyncQueueState(latestQueueState);
    if (requestOptions.rescheduleOnFailure !== false) {
      queueChatSyncFlush(reason, CHAT_SYNC_DEBOUNCE_MS);
    }
    return {
      ok: false,
      error
    };
  } finally {
    chatSyncFlushInFlight = false;
    if (chatSyncDeferredAt) {
      const deferredReason = chatSyncDeferredReason || "mutation";
      const elapsed = Math.max(0, Date.now() - chatSyncDeferredAt);
      const delay = Math.max(0, CHAT_SYNC_DEBOUNCE_MS - elapsed);
      chatSyncDeferredReason = "";
      chatSyncDeferredAt = 0;
      queueChatSyncFlush(deferredReason, delay);
    }
  }
}

function buildMemoryCloudSemanticKey(entry = {}) {
  return `legacy:${String(entry.id || "").trim()}`;
}

function getCachedCloudMemoriesForContact(contactId = "") {
  const resolvedContactId = String(contactId || "").trim();
  if (!resolvedContactId) {
    return null;
  }
  return memoryCloudCacheByContact.get(resolvedContactId) || null;
}

function setCachedCloudMemoriesForContact(contactId = "", items = []) {
  const resolvedContactId = String(contactId || "").trim();
  if (!resolvedContactId) {
    return [];
  }
  const normalizedItems = Array.isArray(items) ? items.filter(Boolean) : [];
  memoryCloudCacheByContact.set(resolvedContactId, {
    items: normalizedItems,
    updatedAt: Date.now()
  });
  return normalizedItems;
}

function patchCachedCloudMemoryItem(contactId = "", item = {}, runtimeState = null) {
  const resolvedContactId = String(contactId || item.contactId || item.contact_id || "").trim();
  if (!resolvedContactId) {
    return null;
  }
  const cachedItems = Array.isArray(getCachedCloudMemoriesForContact(resolvedContactId)?.items)
    ? [...getCachedCloudMemoriesForContact(resolvedContactId).items]
    : [];
  const resolvedItemId = String(item.id || "").trim();
  if (!resolvedItemId) {
    return null;
  }
  const nextItems = cachedItems.map((existingItem) =>
    String(existingItem?.id || "").trim() === resolvedItemId
      ? {
          ...existingItem,
          ...item,
          runtimeState:
            runtimeState && typeof runtimeState === "object"
              ? runtimeState
              : item.runtimeState && typeof item.runtimeState === "object"
                ? item.runtimeState
                : existingItem.runtimeState || null
        }
      : existingItem
  );
  setCachedCloudMemoriesForContact(resolvedContactId, nextItems);
  return nextItems.find((existingItem) => String(existingItem?.id || "").trim() === resolvedItemId) || null;
}

function buildLocalMemoryPromptBundle(contact, promptSettings) {
  const memories = getMemoriesForContact(contact?.id || "");
  if (!memories.length) {
    return {
      core: "",
      scene: "",
      usedCloudMemories: []
    };
  }

  const resolvedSettings = normalizeMessagePromptSettings(promptSettings);
  const coreMemories = memories
    .filter(
      (item) => item.type === "core" && item.importance >= resolvedSettings.coreMemoryThreshold
    )
    .slice(0, 8);
  const sceneMemories = memories
    .filter(
      (item) => item.type === "scene" && item.importance >= resolvedSettings.sceneMemoryThreshold
    )
    .slice(0, 10);
  const coreEntries = coreMemories.map((item) => ({
    importance: item.importance,
    promptText: String(item.content || "").trim()
  }));
  const sceneEntries = sceneMemories.map((item) => ({
    importance: item.importance,
    promptText: String(item.content || "").trim()
  }));

  return {
    core: coreEntries.length
      ? buildCloudPromptMemorySection(
          "这些核心记忆会持续影响你当下的情绪走向、判断和对用户的态度，请像真的记得它们一样自然体现：",
          coreEntries,
          [],
          []
        )
      : "",
    scene: sceneEntries.length
      ? buildCloudPromptMemorySection(
          "这些情景记忆只在聊天内容自然相关时再想起来，不必刻意提前提起：",
          sceneEntries,
          [],
          []
        )
      : "",
    usedCloudMemories: []
  };
}

function getCloudMemoryRuntimeState(item = {}) {
  const runtimeState =
    item.runtimeState && typeof item.runtimeState === "object"
      ? item.runtimeState
      : item.runtime_state && typeof item.runtime_state === "object"
        ? item.runtime_state
        : null;
  return runtimeState || {};
}

function getCloudMemoryPromptKind(item = {}) {
  const memoryType = String(item.memoryType || item.memory_type || "").trim().toLowerCase();
  return memoryType === "scene" ? "scene" : "core";
}

function getCloudMemoryPromptText(item = {}) {
  const resolvedStatus = String(item.status || "").trim().toLowerCase();
  if (resolvedStatus === "faint") {
    return String(item.summaryFaint || item.summary_faint || item.summaryShort || item.canonicalText || "").trim();
  }
  return String(item.summaryShort || item.summary_short || item.canonicalText || "").trim();
}

function normalizeCloudMemoryStatus(value = "") {
  const resolved = String(value || "").trim().toLowerCase();
  return ["active", "faint", "dormant", "archived"].includes(resolved) ? resolved : "active";
}

function normalizeCloudMemoryTextArray(value = []) {
  return (Array.isArray(value) ? value : [])
    .map((item) => String(item || "").trim())
    .filter(Boolean);
}

function normalizeCloudMemoryScoreMap(value = {}) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }
  return Object.fromEntries(
    Object.entries(value)
      .map(([key, score]) => [String(key || "").trim(), Number(score)])
      .filter(([key, score]) => key && Number.isFinite(score))
  );
}

function isCloudMemoryGenericCueTerm(value = "") {
  const normalized = canonicalizeMemoryContent(value);
  if (!normalized) {
    return true;
  }
  return PROMPT_MEMORY_GENERIC_CUE_TERMS.some(
    (term) => canonicalizeMemoryContent(term) === normalized
  );
}

function getPromptMemoryCueSourceWeight(source = "") {
  const resolvedSource = String(source || "").trim().toLowerCase();
  if (resolvedSource === "recent_user") {
    return 1.2;
  }
  if (resolvedSource === "explicit") {
    return 1.08;
  }
  if (resolvedSource === "alias") {
    return 0.92;
  }
  if (resolvedSource === "derived") {
    return 0.76;
  }
  return 1;
}

function getPromptMemoryTypeCueWeight(memoryType = "") {
  const resolvedType = String(memoryType || "").trim().toLowerCase();
  if (["relationship", "preference", "constraint"].includes(resolvedType)) {
    return 1.08;
  }
  if (resolvedType === "habit") {
    return 1.04;
  }
  if (["event", "fact"].includes(resolvedType)) {
    return 0.94;
  }
  if (resolvedType === "scene") {
    return 0.88;
  }
  return 1;
}

function getPromptMemoryBudget(options = {}) {
  const isProactiveTrigger = Boolean(options?.proactiveTrigger);
  if (!isProactiveTrigger) {
    return {
      coreActiveLimit: ACTIVE_CORE_PROMPT_MEMORY_LIMIT,
      sceneActiveLimit: ACTIVE_SCENE_PROMPT_MEMORY_LIMIT,
      coreFaintLimit: FAINT_CORE_PROMPT_MEMORY_LIMIT,
      sceneFaintLimit: FAINT_SCENE_PROMPT_MEMORY_LIMIT,
      coreDormantLimit: DORMANT_CORE_PROMPT_MEMORY_LIMIT,
      sceneDormantLimit: DORMANT_SCENE_PROMPT_MEMORY_LIMIT,
      dormantTotalLimit: null
    };
  }
  return {
    coreActiveLimit: ACTIVE_CORE_PROMPT_MEMORY_LIMIT,
    sceneActiveLimit: PROACTIVE_ACTIVE_SCENE_PROMPT_MEMORY_LIMIT,
    coreFaintLimit: PROACTIVE_FAINT_CORE_PROMPT_MEMORY_LIMIT,
    sceneFaintLimit: PROACTIVE_FAINT_SCENE_PROMPT_MEMORY_LIMIT,
    coreDormantLimit: 1,
    sceneDormantLimit: 1,
    dormantTotalLimit: PROACTIVE_DORMANT_TOTAL_PROMPT_MEMORY_LIMIT
  };
}

function getCloudMemoryCueAliasTerms(item = {}) {
  const searchableText = canonicalizeMemoryContent(
    []
      .concat(Array.isArray(item.keywords) ? item.keywords : [])
      .concat(Array.isArray(item.entityRefs) ? item.entityRefs : [])
      .concat([
        item.canonicalText || item.canonical_text,
        item.summaryShort || item.summary_short,
        item.summaryFaint || item.summary_faint
      ])
      .filter(Boolean)
      .join("\n")
  );
  if (!searchableText) {
    return [];
  }
  const terms = [];
  const seen = new Set();
  PROMPT_MEMORY_CUE_ALIAS_GROUPS.filter((group) =>
    group.some((term) => searchableText.includes(canonicalizeMemoryContent(term)))
  ).forEach((group) => {
    group.forEach((term) => {
      addCloudMemoryCueTerm(terms, seen, term, "alias");
    });
  });
  return terms;
}

function addCloudMemoryCueTerm(targetTerms = [], seenTerms = new Set(), term = "", source = "explicit") {
  const original = String(term || "").trim();
  const normalized = canonicalizeMemoryContent(original);
  if (!normalized || normalized.length < PROMPT_MEMORY_CUE_TERM_MIN_LENGTH) {
    return;
  }
  if (
    /^(似乎|有些|大概|可能|应该|比较|容易|记得|印象|事情|部分)$/.test(normalized) ||
    isCloudMemoryGenericCueTerm(normalized)
  ) {
    return;
  }
  if (seenTerms.has(normalized)) {
    return;
  }
  seenTerms.add(normalized);
  targetTerms.push({
    original,
    normalized,
    source
  });
}

function deriveCloudMemoryCueTermsFromText(value = "", limit = PROMPT_MEMORY_DERIVED_CUE_TERM_LIMIT) {
  const text = String(value || "").trim();
  if (!text) {
    return [];
  }
  const terms = [];
  const seen = new Set();
  const quotedMatches = text.match(/[“"「『《【（(]([^”"」』》】）)]{2,18})[”"」』》】）)]/g) || [];
  quotedMatches.forEach((match) => {
    const cleaned = match.replace(/^[“"「『《【（(]+|[”"」』》】）)]+$/g, "");
    addCloudMemoryCueTerm(terms, seen, cleaned, "derived");
  });

  const domainMatches =
    text.match(
      /前男友|公开恋情|纸片人|小卡|机场|后台|咖啡店|直播|恋综|男嘉宾|分手|脱粉|照片|脚踝|称呼|欧巴|亲密称呼|异国|粉丝|八卦头条|聚餐|男朋友|恋情|吃醋|报备|暗号|行程/g
    ) || [];
  domainMatches.forEach((term) => {
    addCloudMemoryCueTerm(terms, seen, term, "derived");
  });

  const chunks = text
    .split(/[，。！？、,.!?；;:“”"'（）()【】\[\]《》<>—\-\s]+/g)
    .map((item) => item.trim())
    .filter(Boolean);
  chunks.forEach((chunk) => {
    const cleaned = chunk
      .replace(/^(将太郎|艺声|亦洁Jessie|Jessie|用户|角色|对方)/g, "")
      .replace(/(将太郎|艺声|亦洁Jessie|Jessie|用户|角色|对方)$/g, "")
      .trim();
    if (cleaned.length >= 3 && cleaned.length <= 12) {
      addCloudMemoryCueTerm(terms, seen, cleaned, "derived");
    }
  });

  return terms.slice(0, limit);
}

function buildPromptMemoryCueContext(options = {}) {
  const requestOptions = options && typeof options === "object" ? options : {};
  const historyMessages = Array.isArray(requestOptions.history) ? requestOptions.history : [];
  const pendingUserMessages = Array.isArray(requestOptions.pendingUserMessages)
    ? requestOptions.pendingUserMessages
    : [];
  const recentMessages = historyMessages.slice(-PROMPT_MEMORY_CUE_MESSAGE_LIMIT);
  const recentUserMessages = recentMessages
    .filter((message) => String(message?.role || "").trim() === "user")
    .slice(-PROMPT_MEMORY_RECENT_USER_CUE_MESSAGE_LIMIT);
  const fragments = []
    .concat(recentMessages)
    .concat(pendingUserMessages)
    .map((message) => String(message?.text || "").trim())
    .filter(Boolean);
  const recentUserFragments = []
    .concat(recentUserMessages)
    .concat(pendingUserMessages)
    .map((message) => String(message?.text || "").trim())
    .filter(Boolean);
  if (requestOptions.triggeredAwareness?.text) {
    fragments.push(String(requestOptions.triggeredAwareness.text || "").trim());
  }
  const proactiveTrigger = normalizeProactiveTriggerRequest(requestOptions.proactiveTrigger);
  if (proactiveTrigger) {
    fragments.push(
      [
        proactiveTrigger.triggerType,
        proactiveTrigger.scheduleTitle,
        proactiveTrigger.reasonSummary
      ]
        .map((item) => String(item || "").trim())
        .filter(Boolean)
        .join("\n")
    );
  }
  const joinedText = fragments.join("\n");
  const recentUserText = recentUserFragments.join("\n");
  return {
    text: joinedText,
    normalizedText: canonicalizeMemoryContent(joinedText),
    recentUserText,
    recentUserNormalizedText: canonicalizeMemoryContent(recentUserText)
  };
}

function getCloudMemoryCueTerms(item = {}) {
  const explicitTerms = []
    .concat(Array.isArray(item.keywords) ? item.keywords : [])
    .concat(Array.isArray(item.entityRefs) ? item.entityRefs : [])
    .map((term) => String(term || "").trim())
    .filter(Boolean);
  const unique = [];
  const seen = new Set();
  explicitTerms.forEach((term) => {
    addCloudMemoryCueTerm(unique, seen, term, "explicit");
  });
  getCloudMemoryCueAliasTerms(item).forEach((term) => {
    addCloudMemoryCueTerm(unique, seen, term.original, term.source);
  });
  [
    item.canonicalText || item.canonical_text,
    item.summaryShort || item.summary_short,
    item.summaryFaint || item.summary_faint
  ].forEach((text) => {
    deriveCloudMemoryCueTermsFromText(text).forEach((term) => {
      addCloudMemoryCueTerm(unique, seen, term.original, term.source);
    });
  });
  return unique;
}

function scoreCloudMemoryCueMatch(item = {}, cueContext = null) {
  const normalizedCueText = String(cueContext?.normalizedText || "").trim();
  const recentUserNormalizedText = String(cueContext?.recentUserNormalizedText || "").trim();
  const cueTerms = getCloudMemoryCueTerms(item);
  if (!normalizedCueText || !cueTerms.length) {
    return {
      score: 0,
      matchedTerms: [],
      matchedTermDetails: [],
      cueSources: [],
      typeWeight: getPromptMemoryTypeCueWeight(item.memoryType || item.memory_type)
    };
  }
  const matchedTerms = cueTerms
    .filter((term) => normalizedCueText.includes(term.normalized))
    .map((term) => {
      const cueSources = [term.source];
      const recentUserMatched =
        Boolean(recentUserNormalizedText) && recentUserNormalizedText.includes(term.normalized);
      if (recentUserMatched) {
        cueSources.push("recent_user");
      }
      return {
        ...term,
        cueSources,
        recentUserMatched,
        weight:
          getPromptMemoryCueSourceWeight(term.source) *
          (recentUserMatched ? getPromptMemoryCueSourceWeight("recent_user") : 1)
      };
    });
  if (!matchedTerms.length) {
    return {
      score: 0,
      matchedTerms: [],
      matchedTermDetails: [],
      cueSources: [],
      typeWeight: getPromptMemoryTypeCueWeight(item.memoryType || item.memory_type)
    };
  }
  const typeWeight = getPromptMemoryTypeCueWeight(item.memoryType || item.memory_type);
  const totalMatchedWeight = matchedTerms.reduce(
    (total, term) => total + term.weight,
    0
  );
  const totalMatchedLength = matchedTerms.reduce(
    (total, term) =>
      total + Math.min(term.source === "derived" ? 9 : 12, term.normalized.length) * term.weight,
    0
  );
  const longestMatchedLength = Math.max(...matchedTerms.map((term) => term.normalized.length));
  const hitRatio = totalMatchedWeight / Math.max(1, Math.min(3, cueTerms.length));
  const densityScore = Math.min(1, totalMatchedLength / 18);
  const strongestTermScore = Math.min(1, longestMatchedLength / 6);
  const recentUserBonus = matchedTerms.some((term) => term.recentUserMatched) ? 0.08 : 0;
  const explicitBonus = matchedTerms.some((term) => term.source === "explicit") ? 0.05 : 0;
  const aliasBonus = matchedTerms.some((term) => term.source === "alias") ? 0.03 : 0;
  const cueSources = Array.from(
    new Set(matchedTerms.flatMap((term) => term.cueSources).filter(Boolean))
  );
  return {
    score: clampNumber(
      (0.45 * hitRatio + 0.35 * densityScore + 0.2 * strongestTermScore + recentUserBonus + explicitBonus + aliasBonus) *
        typeWeight,
      0,
      1
    ),
    matchedTerms: matchedTerms
      .map((term) => term.original)
      .filter(Boolean)
      .slice(0, PROMPT_MEMORY_RECALL_CUE_TERM_LIMIT),
    matchedTermDetails: matchedTerms.slice(0, PROMPT_MEMORY_RECALL_CUE_TERM_LIMIT).map((term) => ({
      term: term.original,
      normalized: term.normalized,
      cueSources: term.cueSources,
      recentUserMatched: term.recentUserMatched
    })),
    cueSources,
    typeWeight
  };
}

function getCloudMemoryPromptPriority(candidate = {}) {
  const activationScore = clampNumber(candidate.activationScore, 0, 1);
  const stabilityScore = clampNumber(candidate.stabilityScore, 0, 1);
  const cueScore = clampNumber(candidate.cueScore, 0, 1);
  const importanceScore = clampNumber(candidate.importance, 0, 100) / 100;
  const updatedAtMs = Number(candidate.updatedAtMs) || 0;
  const typeWeight = getPromptMemoryTypeCueWeight(candidate.memoryType);
  const cueStrengthBonus = candidate.cueStrength === "strong" ? 8 : cueScore > 0 ? 3 : 0;
  const cooldownPenalty = candidate.cooldownApplied
    ? PROMPT_MEMORY_DORMANT_RECALL_COOLDOWN_PRIORITY_PENALTY
    : 0;
  return (
    activationScore * 100 +
    stabilityScore * 40 +
    cueScore * 25 * typeWeight +
    importanceScore * 20 +
    cueStrengthBonus -
    cooldownPenalty +
    Math.min(10, updatedAtMs / (24 * 60 * 60 * 1000 * 30))
  );
}

function getCloudMemoryDormantCooldownState(item = {}) {
  const lastRecalledAtMs =
    Date.parse(item.lastRecalledAt || item.last_recalled_at || "") || 0;
  if (!lastRecalledAtMs) {
    return {
      applied: false,
      thresholdBonus: 0,
      lastRecalledAtMs: 0
    };
  }
  const expiresAtMs = lastRecalledAtMs + PROMPT_MEMORY_DORMANT_RECALL_COOLDOWN_MS;
  if (expiresAtMs <= Date.now()) {
    return {
      applied: false,
      thresholdBonus: 0,
      lastRecalledAtMs
    };
  }
  return {
    applied: true,
    thresholdBonus: PROMPT_MEMORY_DORMANT_RECALL_COOLDOWN_THRESHOLD_BONUS,
    lastRecalledAtMs
  };
}

function resolveCloudMemoryCueStrength(cueScore = 0, cueThreshold = 0, cueSources = []) {
  const resolvedCueScore = clampNumber(cueScore, 0, 1);
  const resolvedThreshold = clampNumber(cueThreshold, 0, 1);
  const resolvedSources = Array.isArray(cueSources) ? cueSources : [];
  if (
    resolvedCueScore >= Math.min(1, resolvedThreshold + PROMPT_MEMORY_STRONG_CUE_MARGIN) ||
    (resolvedSources.includes("recent_user") &&
      (resolvedSources.includes("explicit") || resolvedSources.includes("alias")))
  ) {
    return "strong";
  }
  return resolvedCueScore >= resolvedThreshold ? "weak" : "";
}

function formatCloudPromptMemoryLine(candidate = {}) {
  return `- 重要度 ${candidate.importance}/100：${String(candidate.promptText || "").trim()}`;
}

function buildCloudPromptMemorySection(
  title = "",
  activeEntries = [],
  faintEntries = [],
  dormantEntries = []
) {
  const sections = [String(title || "").trim()].filter(Boolean);
  if (activeEntries.length) {
    sections.push(
      [
        "清楚记得的部分：",
        ...activeEntries.map((entry) => formatCloudPromptMemoryLine(entry))
      ].join("\n")
    );
  }
  if (faintEntries.length) {
    sections.push(
      [
        "只保留模糊印象的部分：",
        ...faintEntries.map((entry) => formatCloudPromptMemoryLine(entry))
      ].join("\n")
    );
  }
  if (dormantEntries.length) {
    sections.push(
      [
        "被当前话题线索勾起的旧印象：",
        ...dormantEntries.map((entry) => formatCloudPromptMemoryLine(entry))
      ].join("\n")
    );
  }
  return sections.length > 1 ? sections.join("\n") : "";
}

function buildMemoryPromptBundle(contact, promptSettings, options = {}) {
  const resolvedContactId = String(contact?.id || "").trim();
  if (!resolvedContactId) {
    return {
      core: "",
      scene: "",
      usedCloudMemories: []
    };
  }

  const localFallbackBundle = buildLocalMemoryPromptBundle(contact, promptSettings);
  const cachedCloudItems = Array.isArray(getCachedCloudMemoriesForContact(resolvedContactId)?.items)
    ? getCachedCloudMemoriesForContact(resolvedContactId).items
    : null;
  if (!cachedCloudItems || !cachedCloudItems.length) {
    return localFallbackBundle;
  }

  const resolvedSettings = normalizeMessagePromptSettings(promptSettings);
  const cueContext = buildPromptMemoryCueContext(options);
  const promptBudget = getPromptMemoryBudget(options);
  const candidates = cachedCloudItems
    .filter((item) => ["active", "faint", "dormant"].includes(String(item.status || "").trim().toLowerCase()))
    .map((item) => {
      const runtimeState = getCloudMemoryRuntimeState(item);
      const promptKind = getCloudMemoryPromptKind(item);
      const cueMatch = scoreCloudMemoryCueMatch(item, cueContext);
      const resolvedStatus = String(item.status || "").trim().toLowerCase() || "active";
      const cooldownState =
        resolvedStatus === "dormant" ? getCloudMemoryDormantCooldownState(item) : null;
      const importance = clampNumber(
        Number(item.baseImportance ?? item.base_importance ?? 0) || 0,
        0,
        100
      );
      const cueThreshold = clampNumber(
        Number(runtimeState.cueRecallThreshold ?? runtimeState.cue_recall_threshold ?? 0.55) || 0.55,
        0,
        1
      );
      const effectiveCueThreshold = clampNumber(
        cueThreshold + (cooldownState?.thresholdBonus || 0),
        0,
        1
      );
      const cueSources = Array.isArray(cueMatch.cueSources) ? cueMatch.cueSources : [];
      return {
        item,
        id: String(item.id || "").trim(),
        contactId: String(item.contactId || item.contact_id || resolvedContactId).trim(),
        memoryType: String(item.memoryType || item.memory_type || "").trim().toLowerCase(),
        promptKind,
        status: resolvedStatus,
        promptText: getCloudMemoryPromptText(item),
        importance,
        activationScore: clampNumber(
          Number(runtimeState.activationScore ?? runtimeState.activation_score ?? 0) || 0,
          0,
          1
        ),
        stabilityScore: clampNumber(
          Number(runtimeState.stabilityScore ?? runtimeState.stability_score ?? 0) || 0,
          0,
          1
        ),
        cueThreshold,
        effectiveCueThreshold,
        cueScore: cueMatch.score,
        matchedCueTerms: cueMatch.matchedTerms,
        matchedCueDetails: cueMatch.matchedTermDetails,
        cueSources,
        cueStrength: resolveCloudMemoryCueStrength(
          cueMatch.score,
          effectiveCueThreshold,
          cueSources
        ),
        cooldownApplied: Boolean(cooldownState?.applied),
        updatedAtMs:
          Date.parse(item.updatedAt || item.updated_at || item.lastObservedAt || item.last_observed_at || "") ||
          0
      };
    })
    .filter((entry) => entry.id && entry.promptText)
    .filter((entry) =>
      entry.importance >=
      (entry.promptKind === "scene"
        ? resolvedSettings.sceneMemoryThreshold
        : resolvedSettings.coreMemoryThreshold)
    )
    .map((entry) => ({
      ...entry,
      promptPriority: getCloudMemoryPromptPriority(entry)
    }));

  if (!candidates.length) {
    return localFallbackBundle;
  }

  function sortPromptCandidates(entries = []) {
    return entries.slice().sort(
      (left, right) =>
        right.promptPriority - left.promptPriority ||
        right.activationScore - left.activationScore ||
        right.importance - left.importance ||
        right.stabilityScore - left.stabilityScore ||
        right.updatedAtMs - left.updatedAtMs
    );
  }

  function pickCandidates(promptKind, status, limit) {
    if (!limit) {
      return [];
    }
    return sortPromptCandidates(
      candidates
      .filter((entry) => entry.promptKind === promptKind && entry.status === status)
      .filter((entry) => status !== "dormant" || entry.cueScore >= entry.effectiveCueThreshold)
    ).slice(0, limit);
  }

  const coreActive = pickCandidates("core", "active", promptBudget.coreActiveLimit);
  const coreFaint = pickCandidates("core", "faint", promptBudget.coreFaintLimit);
  const sceneActive = pickCandidates("scene", "active", promptBudget.sceneActiveLimit);
  const sceneFaint = pickCandidates("scene", "faint", promptBudget.sceneFaintLimit);
  const dormantCandidates = sortPromptCandidates(
    candidates
      .filter((entry) => entry.status === "dormant")
      .filter((entry) => entry.cueScore >= entry.effectiveCueThreshold)
  );
  const selectedDormantCandidates =
    promptBudget.dormantTotalLimit == null
      ? dormantCandidates
      : dormantCandidates.slice(0, promptBudget.dormantTotalLimit);
  const coreDormant = selectedDormantCandidates
    .filter((entry) => entry.promptKind === "core")
    .slice(0, promptBudget.coreDormantLimit);
  const sceneDormant = selectedDormantCandidates
    .filter((entry) => entry.promptKind === "scene")
    .slice(0, promptBudget.sceneDormantLimit);

  const coreContext = buildCloudPromptMemorySection(
    "这些核心记忆会持续影响你当下的情绪走向、判断和对用户的态度，请像真的记得它们一样自然体现：",
    coreActive,
    coreFaint,
    coreDormant
  );
  const sceneContext = buildCloudPromptMemorySection(
    "这些情景记忆只在聊天内容自然相关时再想起来，不必刻意提前提起：",
    sceneActive,
    sceneFaint,
    sceneDormant
  );

  const rawRecallBaseBoost = Number(getMemoryDecayConfig().recovery.promptRecallActivationBoost);
  const recallBaseBoost = clampNumber(
    Number.isFinite(rawRecallBaseBoost) ? rawRecallBaseBoost : 0.08,
    0,
    1
  );
  const usedCloudMemories = Array.from(
    new Map(
      []
        .concat(coreActive, coreFaint, coreDormant, sceneActive, sceneFaint, sceneDormant)
        .map((entry) => [
          entry.id,
          {
            id: entry.id,
            contactId: entry.contactId,
            status: entry.status,
            sourceKind:
              entry.status === "dormant" && entry.matchedCueTerms.length
                ? "prompt_cue"
                : "prompt",
            reasonCode:
              entry.status === "dormant" && entry.matchedCueTerms.length
                ? "prompt_memory_cue_recall"
                : "prompt_memory_used",
            recalledScore:
              entry.status === "dormant"
                ? Math.max(entry.cueScore, entry.cueThreshold)
                : Math.max(entry.activationScore, entry.cueScore),
            activationBoost:
              entry.status === "active"
                ? recallBaseBoost * 0.4
                : entry.status === "faint"
                  ? recallBaseBoost * 0.75
                  : recallBaseBoost,
            cueTerms: entry.matchedCueTerms,
            cueStrength: entry.cueStrength,
            cueSources: entry.cueSources,
            cueScore: entry.cueScore,
            cueThreshold: entry.effectiveCueThreshold,
            cooldownApplied: entry.cooldownApplied
          }
        ])
    ).values()
  );

  return {
    core: coreContext || localFallbackBundle.core,
    scene: sceneContext || localFallbackBundle.scene,
    usedCloudMemories
  };
}

async function markPromptBundleMemoriesRecalled(bundle = null, options = {}) {
  const usedCloudMemories = Array.isArray(bundle?.usedCloudMemories) ? bundle.usedCloudMemories : [];
  if (!usedCloudMemories.length) {
    return [];
  }
  const requestOptions = options && typeof options === "object" ? options : {};
  const batchId = `prompt_recall_${Date.now()}_${hashText(
    usedCloudMemories.map((item) => item.id).join("_")
  )}`;
  const settled = await Promise.allSettled(
    usedCloudMemories.map(async (memory) => {
      const payload = await requestMessagesStorageApi(`/api/memory/items/${memory.id}/recall`, {
        method: "POST",
        body: JSON.stringify({
          actorType: "system",
          actorRef: "messages_prompt_builder",
          sourceKind: memory.sourceKind || "prompt",
          sourceRef: {
            contactId: requestOptions.contactId || memory.contactId || "",
            conversationId: requestOptions.conversationId || "",
            proactiveTrigger: Boolean(requestOptions.proactiveTrigger),
            regenerate: Boolean(requestOptions.regenerate)
          },
          reasonCode: memory.reasonCode || "prompt_memory_used",
          batchId,
          usedInPrompt: true,
          recalledScore: clampNumber(memory.recalledScore, 0, 1),
          activationBoost: clampNumber(memory.activationBoost, 0, 1),
          cueTerms: Array.isArray(memory.cueTerms) ? memory.cueTerms : [],
          cueStrength: String(memory.cueStrength || "").trim(),
          cueSources: Array.isArray(memory.cueSources) ? memory.cueSources : [],
          cueScore: clampNumber(memory.cueScore, 0, 1),
          cueThreshold: clampNumber(memory.cueThreshold, 0, 1),
          statusBeforeRecall: memory.status || "",
          cooldownApplied: Boolean(memory.cooldownApplied)
        })
      });
      patchCachedCloudMemoryItem(
        memory.contactId || requestOptions.contactId || "",
        {
          ...(payload?.item || {}),
          runtimeState: payload?.runtimeState || null
        },
        payload?.runtimeState || null
      );
      return payload;
    })
  );
  settled.forEach((result) => {
    if (result.status === "rejected") {
      console.warn("[Messages] Failed to write prompt memory recall:", result.reason);
    }
  });
  return settled;
}

function mapCloudMemoryItemToPromptEntry(item = {}) {
  const resolvedStatus = normalizeCloudMemoryStatus(item.status);
  const memoryType = String(item.memoryType || item.memory_type || "").trim().toLowerCase();
  const canonicalText = String(item.canonicalText || item.canonical_text || "").trim();
  const summaryShort = String(item.summaryShort || item.summary_short || canonicalText).trim();
  const summaryFaint = String(item.summaryFaint || item.summary_faint || "").trim();
  const content =
    resolvedStatus === "faint"
      ? String(summaryFaint || summaryShort || canonicalText).trim()
      : String(summaryShort || canonicalText).trim();
  const normalizedEntry = normalizeMessageMemory(
    {
      id: String(item.id || "").trim(),
      contactId: String(item.contactId || item.contact_id || "").trim(),
      type: memoryType === "scene" ? "scene" : "core",
      content,
      importance: Number(item.baseImportance ?? item.base_importance ?? 0) || 0,
      source: "summary",
      createdAt: Date.parse(item.createdAt || item.created_at || "") || Date.now(),
      updatedAt: Date.parse(item.updatedAt || item.updated_at || "") || Date.now()
    },
    0
  );
  const runtimeState = getCloudMemoryRuntimeState(item);
  const metadata =
    item.metadata && typeof item.metadata === "object" && !Array.isArray(item.metadata)
      ? item.metadata
      : {};
  return {
    ...normalizedEntry,
    isCloudMemory: true,
    cloudStatus: resolvedStatus,
    cloudMemoryType: memoryType || "relationship",
    cloudMemorySubtype: String(item.memorySubtype || item.memory_subtype || "").trim(),
    semanticKey: String(item.semanticKey || item.semantic_key || "").trim(),
    canonicalText,
    summaryShort,
    summaryFaint,
    baseImportance: Number(item.baseImportance ?? item.base_importance ?? 0) || 0,
    confidence:
      item.confidence == null ? null : clampNumber(Number(item.confidence) || 0, 0, 1),
    keywords: normalizeCloudMemoryTextArray(item.keywords),
    entityRefs: normalizeCloudMemoryTextArray(item.entityRefs || item.entity_refs),
    emotionIntensity:
      item.emotionIntensity == null && item.emotion_intensity == null
        ? null
        : clampNumber(Number(item.emotionIntensity ?? item.emotion_intensity) || 0, 0, 1),
    emotionProfile: normalizeCloudMemoryScoreMap(item.emotionProfile || item.emotion_profile),
    interactionTendency: normalizeCloudMemoryScoreMap(
      item.interactionTendency || item.interaction_tendency
    ),
    emotionSummary: String(item.emotionSummary || item.emotion_summary || "").trim(),
    firstObservedAt: item.firstObservedAt || item.first_observed_at || "",
    lastObservedAt: item.lastObservedAt || item.last_observed_at || "",
    lastReinforcedAt: item.lastReinforcedAt || item.last_reinforced_at || "",
    lastRecalledAt: item.lastRecalledAt || item.last_recalled_at || "",
    reinforceCount: Math.max(0, Number.parseInt(String(item.reinforceCount || 0), 10) || 0),
    recallCount: Math.max(0, Number.parseInt(String(item.recallCount || 0), 10) || 0),
    runtimeState,
    metadata
  };
}

function findCloudMemoryItemByLocalEntry(contactId = "", entry = {}) {
  const cached = getCachedCloudMemoriesForContact(contactId);
  const items = Array.isArray(cached?.items) ? cached.items : [];
  const semanticKey = buildMemoryCloudSemanticKey(entry);
  return (
    items.find((item) => String(item.semanticKey || "").trim() === semanticKey) ||
    items.find((item) => String(item.metadata?.localMemoryId || "").trim() === String(entry.id || "").trim()) ||
    items.find((item) => String(item.metadata?.legacyId || "").trim() === String(entry.id || "").trim()) ||
    items.find((item) =>
      memoryLooksSimilar(
        String(item.canonicalText || item.summaryShort || "").trim(),
        String(entry.content || "").trim()
      )
    ) ||
    null
  );
}

function buildCloudMemoryPayloadFromLocalEntry(entry = {}, options = {}) {
  const requestOptions = options && typeof options === "object" ? options : {};
  return {
    id: String(entry.id || "").trim(),
    contactId: String(entry.contactId || "").trim(),
    memoryType: entry.type === "scene" ? "scene" : "relationship",
    memorySubtype:
      entry.type === "scene"
        ? "legacy_scene"
        : entry.source === "manual"
        ? "manual_core"
        : "summary_core",
    semanticKey: buildMemoryCloudSemanticKey(entry),
    canonicalText: String(entry.content || "").trim(),
    summaryShort: String(entry.content || "").trim(),
    summaryFaint: String(requestOptions.summaryFaint || "").trim(),
    baseImportance: Number(entry.importance || 0) || DEFAULT_SCENE_MEMORY_THRESHOLD,
    confidence: entry.source === "manual" ? 0.92 : 0.78,
    firstObservedAt: Number(entry.createdAt) || Date.now(),
    lastObservedAt: Number(entry.updatedAt) || Number(entry.createdAt) || Date.now(),
    metadata: {
      localMemoryId: String(entry.id || "").trim(),
      localMemoryType: String(entry.type || "").trim(),
      localMemorySource: String(entry.source || "").trim(),
      importedFromLocalCache: true
    }
  };
}

async function fetchCloudMemoriesForContact(contactId = "", options = {}) {
  const resolvedContactId = String(contactId || "").trim();
  if (!resolvedContactId) {
    return [];
  }
  const requestOptions = options && typeof options === "object" ? options : {};
  if (!requestOptions.force) {
    const cached = getCachedCloudMemoriesForContact(resolvedContactId);
    if (cached) {
      return Array.isArray(cached.items) ? cached.items : [];
    }
  }
  const statusGroups = [
    { status: "active", limit: 200 },
    { status: "faint", limit: 200 },
    { status: "dormant", limit: 80 },
    { status: "archived,superseded", limit: 40 }
  ];
  const payloads = await Promise.all(
    statusGroups.map((group) =>
      requestMessagesStorageApi(
        `/api/memory/items?contactId=${encodeURIComponent(resolvedContactId)}&status=${encodeURIComponent(
          group.status
        )}&limit=${group.limit}`
      )
    )
  );
  const mergedItemsById = new Map();
  payloads.forEach((payload) => {
    (Array.isArray(payload?.items) ? payload.items : []).forEach((item) => {
      const id = String(item?.id || "").trim();
      if (!id || mergedItemsById.has(id)) {
        return;
      }
      mergedItemsById.set(id, item);
    });
  });
  return setCachedCloudMemoriesForContact(resolvedContactId, Array.from(mergedItemsById.values()));
}

async function importLocalMemoriesToCloud(contactId = "", entries = []) {
  const resolvedContactId = String(contactId || "").trim();
  const normalizedEntries = (Array.isArray(entries) ? entries : [])
    .map((item, index) => normalizeMessageMemory(item, index))
    .filter((item) => item.contactId === resolvedContactId && item.content);
  if (!resolvedContactId || !normalizedEntries.length) {
    return null;
  }
  await requestMessagesStorageApi("/api/memory/import", {
    method: "POST",
    body: JSON.stringify({
      contactId: resolvedContactId,
      items: normalizedEntries.map((entry) => buildCloudMemoryPayloadFromLocalEntry(entry))
    })
  });
  return fetchCloudMemoriesForContact(resolvedContactId, { force: true });
}

async function ensureCloudMemoriesReady(contactId = "", options = {}) {
  const resolvedContactId = String(contactId || "").trim();
  if (!resolvedContactId) {
    return [];
  }
  const requestOptions = options && typeof options === "object" ? options : {};
  if (!requestOptions.force) {
    const cached = getCachedCloudMemoriesForContact(resolvedContactId);
    if (cached) {
      return Array.isArray(cached.items) ? cached.items : [];
    }
  }
  if (memoryCloudInflightByContact.has(resolvedContactId)) {
    return memoryCloudInflightByContact.get(resolvedContactId);
  }
  const task = (async () => {
    try {
      let cloudItems = await fetchCloudMemoriesForContact(resolvedContactId, {
        force: Boolean(requestOptions.force)
      });
      const localEntries = getMemoriesForContact(resolvedContactId);
      if (!cloudItems.length && requestOptions.importLocalFallback !== false && localEntries.length) {
        cloudItems = (await importLocalMemoriesToCloud(resolvedContactId, localEntries)) || [];
      }
      return Array.isArray(cloudItems) ? cloudItems : [];
    } catch (error) {
      console.warn("[Messages] Failed to load cloud memories:", error);
      return [];
    } finally {
      memoryCloudInflightByContact.delete(resolvedContactId);
    }
  })();
  memoryCloudInflightByContact.set(resolvedContactId, task);
  return task;
}

async function syncLocalMemoryEntryToCloud(entry = {}, options = {}) {
  const resolvedEntry = normalizeMessageMemory(entry);
  if (!resolvedEntry.contactId || !resolvedEntry.content) {
    return null;
  }
  const requestOptions = options && typeof options === "object" ? options : {};
  try {
    await ensureCloudMemoriesReady(resolvedEntry.contactId, {
      importLocalFallback: false
    });
    const existingCloudItem = findCloudMemoryItemByLocalEntry(resolvedEntry.contactId, resolvedEntry);
    const payloadItem = buildCloudMemoryPayloadFromLocalEntry(resolvedEntry, requestOptions);
    const payload = existingCloudItem
      ? await requestMessagesStorageApi(`/api/memory/items/${encodeURIComponent(existingCloudItem.id)}`, {
          method: "PATCH",
          body: JSON.stringify({
            item: payloadItem,
            sourceKind: "local_cache_sync",
            reasonCode: "local_memory_upsert"
          })
        })
      : await requestMessagesStorageApi("/api/memory/items", {
          method: "POST",
          body: JSON.stringify({
            item: payloadItem,
            sourceKind: "local_cache_sync",
            reasonCode: "local_memory_create"
          })
        });
    const nextCloudItems = Array.isArray(getCachedCloudMemoriesForContact(resolvedEntry.contactId)?.items)
      ? [...getCachedCloudMemoriesForContact(resolvedEntry.contactId).items]
      : [];
    const nextCloudItem = payload?.item || null;
    if (nextCloudItem?.id) {
      const existingIndex = nextCloudItems.findIndex((item) => item.id === nextCloudItem.id);
      if (existingIndex >= 0) {
        nextCloudItems[existingIndex] = nextCloudItem;
      } else {
        nextCloudItems.unshift(nextCloudItem);
      }
      setCachedCloudMemoriesForContact(resolvedEntry.contactId, nextCloudItems);
    }
    return payload;
  } catch (error) {
    console.warn("[Messages] Failed to sync local memory entry to cloud:", error);
    return null;
  }
}

async function syncLocalMemoryEntriesToCloud(entries = [], options = {}) {
  const normalizedEntries = (Array.isArray(entries) ? entries : []).filter(Boolean);
  for (const entry of normalizedEntries) {
    await syncLocalMemoryEntryToCloud(entry, options);
  }
}

async function syncMissingLocalMemoriesForContact(contactId = "") {
  const resolvedContactId = String(contactId || "").trim();
  if (!resolvedContactId) {
    return [];
  }
  const localEntries = getMemoriesForContact(resolvedContactId);
  if (!localEntries.length) {
    return [];
  }
  await ensureCloudMemoriesReady(resolvedContactId, {
    importLocalFallback: true
  });
  const missingEntries = localEntries.filter((entry, index) => {
    const normalizedEntry = normalizeMessageMemory(entry, index);
    if (!normalizedEntry.contactId || !normalizedEntry.content) {
      return false;
    }
    return !findCloudMemoryItemByLocalEntry(resolvedContactId, normalizedEntry);
  });
  if (!missingEntries.length) {
    return [];
  }
  await syncLocalMemoryEntriesToCloud(missingEntries);
  return missingEntries;
}

async function archiveLocalMemoryInCloud(entry = {}, options = {}) {
  const resolvedEntry = normalizeMessageMemory(entry);
  if (!resolvedEntry.contactId || !resolvedEntry.id) {
    return null;
  }
  const requestOptions = options && typeof options === "object" ? options : {};
  try {
    await ensureCloudMemoriesReady(resolvedEntry.contactId, {
      importLocalFallback: false
    });
    const existingCloudItem = findCloudMemoryItemByLocalEntry(resolvedEntry.contactId, resolvedEntry);
    if (!existingCloudItem?.id) {
      return null;
    }
    const payload = await requestMessagesStorageApi(
      `/api/memory/items/${encodeURIComponent(existingCloudItem.id)}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          item: {
            status: "archived",
            archivedAt: Date.now(),
            metadata: {
              ...(existingCloudItem.metadata || {}),
              localMemoryArchived: true,
              localMemoryArchivedAt: Date.now()
            }
          },
          sourceKind: "local_cache_sync",
          reasonCode: requestOptions.reasonCode || "local_memory_delete"
        })
      }
    );
    const cached = Array.isArray(getCachedCloudMemoriesForContact(resolvedEntry.contactId)?.items)
      ? getCachedCloudMemoriesForContact(resolvedEntry.contactId).items.map((item) =>
          item.id === payload?.item?.id ? payload.item : item
        )
      : [];
    setCachedCloudMemoriesForContact(resolvedEntry.contactId, cached);
    return payload;
  } catch (error) {
    console.warn("[Messages] Failed to archive local memory in cloud:", error);
    return null;
  }
}

function getPreferredPromptMemoriesForContact(contactId = "") {
  const resolvedContactId = String(contactId || "").trim();
  if (!resolvedContactId) {
    return [];
  }
  const localEntries = getMemoriesForContact(resolvedContactId);
  const cached = getCachedCloudMemoriesForContact(resolvedContactId);
  const cloudItems = Array.isArray(cached?.items) ? cached.items : null;
  if (!cloudItems) {
    return localEntries;
  }
  const promptCloudEntries = cloudItems
    .filter((item) => ["active", "faint", "dormant"].includes(String(item.status || "").trim().toLowerCase()))
    .map((item) => mapCloudMemoryItemToPromptEntry(item))
    .filter((item) => item.contactId && item.content);
  return mergeMemories(promptCloudEntries, localEntries);
}

function scheduleMemoryCloudBootstrapSync() {
  if (memoryCloudBootstrapStarted) {
    return;
  }
  memoryCloudBootstrapStarted = true;
  window.setTimeout(async () => {
    const contactIds = Array.from(
      new Set(
        (state.memories || [])
          .map((item) => String(item.contactId || "").trim())
          .filter(Boolean)
      )
    );
    for (const contactId of contactIds) {
      await syncMissingLocalMemoriesForContact(contactId);
    }
  }, 120);
}

function loadReplyTasks() {
  const raw = safeGetItem(MESSAGE_REPLY_TASKS_KEY);
  if (!raw) {
    return [];
  }
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed
          .map((item, index) => normalizeReplyTask(item, index))
          .filter((item) => item.conversationId)
      : [];
  } catch (_error) {
    return [];
  }
}

function loadActiveConversationView() {
  const raw = safeGetItem(MESSAGE_ACTIVE_VIEW_KEY);
  if (!raw) {
    return {
      conversationId: "",
      visible: false,
      updatedAt: 0
    };
  }
  try {
    const parsed = JSON.parse(raw);
    return {
      conversationId: String(parsed?.conversationId || "").trim(),
      visible: Boolean(parsed?.visible),
      updatedAt: Number(parsed?.updatedAt) || 0
    };
  } catch (_error) {
    return {
      conversationId: "",
      visible: false,
      updatedAt: 0
    };
  }
}

function persistActiveConversationView(entry = {}) {
  const nextEntry = entry && typeof entry === "object" ? entry : {};
  safeSetItem(
    MESSAGE_ACTIVE_VIEW_KEY,
    JSON.stringify({
      conversationId: String(nextEntry.conversationId || "").trim(),
      visible: Boolean(nextEntry.visible),
      updatedAt: Number(nextEntry.updatedAt) || Date.now()
    })
  );
}

function syncActiveConversationViewMarker() {
  if (isBackgroundMessagesWorker()) {
    return;
  }
  persistActiveConversationView({
    conversationId:
      state.activeTab === "chat" && !document.hidden ? String(state.activeConversationId || "").trim() : "",
    visible:
      state.activeTab === "chat" &&
      !document.hidden &&
      Boolean(String(state.activeConversationId || "").trim()),
    updatedAt: Date.now()
  });
}

function loadReplyRecoveryMap() {
  const raw = safeGetItem(MESSAGE_REPLY_RECOVERY_KEY);
  if (!raw) {
    return {};
  }
  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch (_error) {
    return {};
  }
}

function persistReplyRecoveryMap(map = {}) {
  const nextMap = map && typeof map === "object" ? map : {};
  safeSetItem(MESSAGE_REPLY_RECOVERY_KEY, JSON.stringify(nextMap));
}

function setConversationReplyRecovery(
  conversationId = "",
  messages = [],
  expectedReplyContextVersion = null,
  options = {}
) {
  const resolvedConversationId = String(conversationId || "").trim();
  if (!resolvedConversationId) {
    return false;
  }
  const normalizedMessages = normalizeObjectArray(messages)
    .map((message, index) => normalizeConversationMessage(message, index))
    .filter((message) => message && String(message.id || "").trim() && String(message.text || "").trim());
  if (!normalizedMessages.length) {
    return false;
  }
  const parsedExpectedReplyContextVersion = Number.parseInt(
    String(expectedReplyContextVersion ?? ""),
    10
  );
  const recoveryOptions = options && typeof options === "object" ? options : {};
  const pendingUserMessageIds = normalizeObjectArray(recoveryOptions.pendingUserMessageIds)
    .map((messageId) => String(messageId || "").trim())
    .filter(Boolean);
  const recoveryMap = loadReplyRecoveryMap();
  recoveryMap[resolvedConversationId] = {
    replyContextVersion: Number.isFinite(parsedExpectedReplyContextVersion)
      ? parsedExpectedReplyContextVersion
      : null,
    savedAt: Date.now(),
    pendingUserMessageIds,
    messages: normalizedMessages.map((message) => ({ ...message }))
  };
  persistReplyRecoveryMap(recoveryMap);
  return true;
}

function clearConversationReplyRecovery(conversationId = "") {
  const resolvedConversationId = String(conversationId || "").trim();
  if (!resolvedConversationId) {
    return false;
  }
  const recoveryMap = loadReplyRecoveryMap();
  if (!Object.prototype.hasOwnProperty.call(recoveryMap, resolvedConversationId)) {
    return false;
  }
  delete recoveryMap[resolvedConversationId];
  persistReplyRecoveryMap(recoveryMap);
  return true;
}

function applyConversationReplyRecovery(conversations = []) {
  const recoveryMap = loadReplyRecoveryMap();
  const recoveryEntries = Object.entries(recoveryMap);
  if (!recoveryEntries.length) {
    return false;
  }
  const now = Date.now();
  let changed = false;
  let recoveryMapChanged = false;
  const changedConversationIds = new Set();
  const conversationById = new Map(
    normalizeObjectArray(conversations)
      .map((conversation) => [String(conversation?.id || "").trim(), conversation])
      .filter((entry) => entry[0])
  );

  recoveryEntries.forEach(([conversationId, entry]) => {
    const resolvedConversationId = String(conversationId || "").trim();
    if (!resolvedConversationId) {
      delete recoveryMap[conversationId];
      recoveryMapChanged = true;
      return;
    }
    if (
      String(state.pendingAssistantReveal?.conversationId || "").trim() === resolvedConversationId ||
      state.requestingConversationId === resolvedConversationId ||
      state.sendingConversationId === resolvedConversationId ||
      isConversationReplyBusy(resolvedConversationId)
    ) {
      return;
    }
    const savedAt = Number(entry?.savedAt) || 0;
    if (!savedAt || now - savedAt > MESSAGE_REPLY_RECOVERY_TTL_MS) {
      delete recoveryMap[conversationId];
      recoveryMapChanged = true;
      return;
    }
    const conversation = conversationById.get(resolvedConversationId);
    if (!conversation) {
      return;
    }
    const expectedReplyContextVersion = Number.parseInt(
      String(entry?.replyContextVersion ?? ""),
      10
    );
    if (
      Number.isFinite(expectedReplyContextVersion) &&
      getConversationReplyContextVersion(conversation) !== expectedReplyContextVersion
    ) {
      delete recoveryMap[conversationId];
      recoveryMapChanged = true;
      return;
    }
    const recoveryMessages = normalizeObjectArray(entry?.messages)
      .map((message, index) => normalizeConversationMessage(message, index))
      .filter((message) => message && String(message.id || "").trim() && String(message.text || "").trim());
    const recoveryPendingUserMessageIds = normalizeObjectArray(entry?.pendingUserMessageIds)
      .map((messageId) => String(messageId || "").trim())
      .filter(Boolean);
    if (!recoveryMessages.length) {
      delete recoveryMap[conversationId];
      recoveryMapChanged = true;
      return;
    }
    const existingMessageIds = new Set(
      normalizeObjectArray(conversation.messages)
        .map((message) => String(message?.id || "").trim())
        .filter(Boolean)
    );
    const missingMessages = recoveryMessages.filter(
      (message) => !existingMessageIds.has(String(message.id || "").trim())
    );
    if (!missingMessages.length) {
      const clearedPendingFlags = clearConversationPendingReplyFlags(
        conversation,
        recoveryPendingUserMessageIds
      );
      if (clearedPendingFlags) {
        changed = true;
        changedConversationIds.add(resolvedConversationId);
      }
      delete recoveryMap[conversationId];
      recoveryMapChanged = true;
      return;
    }
    const appendedMessages = appendUniqueMessagesToConversation(conversation, missingMessages);
    if (!appendedMessages.length) {
      return;
    }
    const clearedPendingFlags = clearConversationPendingReplyFlags(
      conversation,
      recoveryPendingUserMessageIds
    );
    recalculateConversationUpdatedAt(conversation);
    markConversationMutated(
      conversation,
      appendedMessages[appendedMessages.length - 1]?.updatedAt || Date.now()
    );
    changed = true;
    changedConversationIds.add(resolvedConversationId);
    if (clearedPendingFlags) {
      changed = true;
      changedConversationIds.add(resolvedConversationId);
    }
    delete recoveryMap[conversationId];
    recoveryMapChanged = true;
  });

  if (recoveryMapChanged) {
    persistReplyRecoveryMap(recoveryMap);
  }
  return changed ? Array.from(changedConversationIds) : false;
}

function getReplyTaskPulseAt(task = null) {
  return Math.max(
    0,
    Number(task?.heartbeatAt) || 0,
    Number(task?.startedAt) || 0,
    Number(task?.updatedAt) || 0,
    Number(task?.createdAt) || 0
  );
}

function isReplyTaskStale(task = null, now = Date.now()) {
  if (!task || task.status !== "processing") {
    return false;
  }
  const referenceTime = getReplyTaskPulseAt(task);
  if (!referenceTime) {
    return false;
  }
  return Math.max(0, Number(now) || 0) - referenceTime > REPLY_TASK_STALE_MS;
}

function requeueStaleProcessingReplyTasks(options = {}) {
  const requestOptions = options && typeof options === "object" ? options : {};
  const filterConversationId = String(requestOptions.conversationId || "").trim();
  const now = Date.now();
  let changed = false;
  const nextTasks = loadReplyTasks().map((task) => {
    if (
      task.status !== "processing" ||
      (filterConversationId && task.conversationId !== filterConversationId) ||
      !isReplyTaskStale(task, now)
    ) {
      return task;
    }
    changed = true;
    return normalizeReplyTask({
      ...task,
      status: "pending",
      errorMessage: "",
      startedAt: 0,
      heartbeatAt: 0,
      updatedAt: now
    });
  });
  if (changed) {
    persistReplyTasks(nextTasks);
  }
  return changed;
}

function startReplyTaskHeartbeat(taskId = "") {
  const resolvedTaskId = String(taskId || "").trim();
  if (!resolvedTaskId) {
    return () => {};
  }
  let disposed = false;
  const beat = () => {
    if (disposed) {
      return;
    }
    const currentTask = loadReplyTasks().find((task) => task.id === resolvedTaskId) || null;
    if (!currentTask || currentTask.status !== "processing") {
      return;
    }
    updateReplyTask(resolvedTaskId, {
      heartbeatAt: Date.now()
    });
  };
  beat();
  const timerId = window.setInterval(beat, REPLY_TASK_HEARTBEAT_MS);
  return () => {
    disposed = true;
    window.clearInterval(timerId);
  };
}

function persistReplyTasks(tasks = []) {
  const normalizedTasks = (Array.isArray(tasks) ? tasks : [])
    .map((item, index) => normalizeReplyTask(item, index))
    .filter((item) => item.conversationId)
    .sort((left, right) => (left.createdAt || 0) - (right.createdAt || 0));
  safeSetItem(MESSAGE_REPLY_TASKS_KEY, JSON.stringify(normalizedTasks));
  return normalizedTasks;
}

function getReplyTaskForConversation(
  conversationId = "",
  statuses = ["pending", "processing"]
) {
  const resolvedConversationId = String(conversationId || "").trim();
  if (!resolvedConversationId) {
    return null;
  }
  const resolvedStatuses = (Array.isArray(statuses) ? statuses : [statuses])
    .map((item) => String(item || "").trim())
    .filter((item) => ["pending", "processing", "error"].includes(item));
  const allowedStatuses = resolvedStatuses.length ? resolvedStatuses : ["pending", "processing"];
  return (
    loadReplyTasks().find(
      (task) =>
        task.conversationId === resolvedConversationId &&
        allowedStatuses.includes(task.status)
    ) || null
  );
}

function stopForegroundReplyTaskHeartbeat() {
  try {
    foregroundReplyTaskHeartbeatStop();
  } catch (_error) {
  }
  foregroundReplyTaskHeartbeatStop = () => {};
}

function beginForegroundReplyTask(conversationId = "", options = {}) {
  const resolvedConversationId = String(conversationId || "").trim();
  if (!resolvedConversationId || !canUseBackgroundReplyWorker()) {
    return null;
  }
  const requestOptions = options && typeof options === "object" ? options : {};
  const task = enqueueReplyTask(resolvedConversationId, requestOptions);
  if (!task?.id) {
    return null;
  }
  updateReplyTask(task.id, {
    status: "processing",
    errorMessage: "",
    startedAt: Date.now(),
    heartbeatAt: Date.now()
  });
  stopForegroundReplyTaskHeartbeat();
  foregroundReplyTaskHeartbeatStop = startReplyTaskHeartbeat(task.id);
  state.activeForegroundReplyTaskId = task.id;
  return loadReplyTasks().find((item) => item.id === task.id) || task;
}

function finishForegroundReplyTask(taskId = "", options = {}) {
  const resolvedTaskId = String(taskId || state.activeForegroundReplyTaskId || "").trim();
  if (!resolvedTaskId) {
    return;
  }
  const requestOptions = options && typeof options === "object" ? options : {};
  const keepPending = Boolean(requestOptions.keepPending);
  const currentTask = loadReplyTasks().find((task) => task.id === resolvedTaskId) || null;
  stopForegroundReplyTaskHeartbeat();
  if (state.activeForegroundReplyTaskId === resolvedTaskId) {
    state.activeForegroundReplyTaskId = "";
  }
  if (!currentTask) {
    return;
  }
  if (keepPending) {
    updateReplyTask(resolvedTaskId, {
      status: "pending",
      errorMessage: "",
      startedAt: 0,
      heartbeatAt: 0
    });
    return;
  }
  if (currentTask.status === "processing") {
    removeReplyTask(resolvedTaskId);
  }
}

function handoffForegroundReplyTaskToBackground() {
  if (!canUseBackgroundReplyWorker()) {
    return false;
  }
  const activeTaskId = String(state.activeForegroundReplyTaskId || "").trim();
  if (!activeTaskId) {
    return false;
  }
  finishForegroundReplyTask(activeTaskId, {
    keepPending: true
  });
  return true;
}

function getPendingReplyTaskForConversation(conversationId = "") {
  return getReplyTaskForConversation(conversationId, ["pending"]);
}

function getProcessingReplyTaskForConversation(conversationId = "") {
  const task = getReplyTaskForConversation(conversationId, ["processing"]);
  return task && !isReplyTaskStale(task) ? task : null;
}

function enqueueReplyTask(conversationId = "", options = {}) {
  const resolvedConversationId = String(conversationId || "").trim();
  if (!resolvedConversationId) {
    return null;
  }
  const requestOptions = options && typeof options === "object" ? options : {};
  const normalizedTriggeredAwareness = normalizeManualAwarenessTrigger(
    requestOptions.triggeredAwareness
  );
  const tasks = loadReplyTasks();
  const existingTask =
    tasks.find(
      (task) =>
        task.conversationId === resolvedConversationId &&
        task.regenerate === Boolean(requestOptions.regenerate) &&
        task.awarenessImmediateTrigger === Boolean(requestOptions.awarenessImmediateTrigger) &&
        String(normalizeManualAwarenessTrigger(task.triggeredAwareness)?.title || "") ===
          String(normalizedTriggeredAwareness?.title || "") &&
        String(normalizeManualAwarenessTrigger(task.triggeredAwareness)?.text || "") ===
          String(normalizedTriggeredAwareness?.text || "") &&
        String(normalizeManualAwarenessTrigger(task.triggeredAwareness)?.emotionShift || "") ===
          String(normalizedTriggeredAwareness?.emotionShift || "") &&
        String(normalizeManualAwarenessTrigger(task.triggeredAwareness)?.sensitivity || "") ===
          String(normalizedTriggeredAwareness?.sensitivity || "") &&
        task.status !== "error"
    ) || null;
  if (existingTask) {
    return existingTask;
  }
  const nextTask = normalizeReplyTask({
    id: `reply_task_${Date.now()}_${hashText(`${resolvedConversationId}_${requestOptions.regenerate ? "regen" : "reply"}`)}`,
    conversationId: resolvedConversationId,
    regenerate: Boolean(requestOptions.regenerate),
    regenerateInstruction: String(requestOptions.regenerateInstruction || "").trim(),
    awarenessImmediateTrigger: Boolean(requestOptions.awarenessImmediateTrigger),
    triggeredAwareness: normalizedTriggeredAwareness,
    status: "pending",
    createdAt: Date.now(),
    updatedAt: Date.now()
  });
  persistReplyTasks([...tasks, nextTask]);
  return nextTask;
}

function updateReplyTask(taskId = "", updates = {}) {
  const resolvedTaskId = String(taskId || "").trim();
  if (!resolvedTaskId) {
    return null;
  }
  let updatedTask = null;
  const tasks = loadReplyTasks().map((task) => {
    if (task.id !== resolvedTaskId) {
      return task;
    }
    updatedTask = normalizeReplyTask({
      ...task,
      ...(updates && typeof updates === "object" ? updates : {}),
      id: task.id,
      updatedAt: Date.now()
    });
    return updatedTask;
  });
  persistReplyTasks(tasks);
  return updatedTask;
}

function removeReplyTask(taskId = "") {
  const resolvedTaskId = String(taskId || "").trim();
  if (!resolvedTaskId) {
    return;
  }
  persistReplyTasks(loadReplyTasks().filter((task) => task.id !== resolvedTaskId));
}

function clearReplyTasksForConversation(conversationId = "", options = {}) {
  const resolvedConversationId = String(conversationId || "").trim();
  if (!resolvedConversationId) {
    return 0;
  }
  const requestOptions = options && typeof options === "object" ? options : {};
  const includeErrors = requestOptions.includeErrors !== false;
  const tasks = loadReplyTasks();
  const nextTasks = tasks.filter((task) => {
    if (task.conversationId !== resolvedConversationId) {
      return true;
    }
    return !includeErrors && task.status === "error";
  });
  if (nextTasks.length === tasks.length) {
    return 0;
  }
  persistReplyTasks(nextTasks);
  return tasks.length - nextTasks.length;
}

function getNextPendingReplyTask() {
  requeueStaleProcessingReplyTasks();
  return loadReplyTasks().find((task) => task.status === "pending") || null;
}

function getReplyTaskErrorForConversation(conversationId = "") {
  const resolvedConversationId = String(conversationId || "").trim();
  if (!resolvedConversationId) {
    return null;
  }
  return (
    loadReplyTasks()
      .filter((task) => task.conversationId === resolvedConversationId && task.status === "error")
      .sort((left, right) => (right.updatedAt || 0) - (left.updatedAt || 0))[0] || null
  );
}

function loadStoredScheduleEntries() {
  return loadScheduleEntries();
}

function persistStoredScheduleEntries(entries = []) {
  safeSetItem(
    SCHEDULE_ENTRIES_KEY,
    JSON.stringify(
      normalizeObjectArray(entries).map((entry, index) => normalizeScheduleEntry(entry, index))
    )
  );
}

function normalizeRecentLocation(entry, index = 0) {
  const source = entry && typeof entry === "object" ? entry : {};
  const locationName = String(source.locationName || source.name || "").trim();
  const coordinates = String(source.coordinates || "").trim();
  if (!locationName || !coordinates) {
    return null;
  }
  return {
    id: String(source.id || `location_${index}_${hashText(`${locationName}_${coordinates}`)}`),
    locationName: locationName.slice(0, 48),
    coordinates,
    updatedAt: Number(source.updatedAt) || Date.now()
  };
}

function loadRecentLocations() {
  const raw = safeGetItem(MESSAGE_RECENT_LOCATIONS_KEY);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed
          .map((item, index) => normalizeRecentLocation(item, index))
          .filter(Boolean)
          .sort((left, right) => (right.updatedAt || 0) - (left.updatedAt || 0))
          .slice(0, 5)
      : [];
  } catch (_error) {
    return [];
  }
}

function persistRecentLocations() {
  safeSetItem(MESSAGE_RECENT_LOCATIONS_KEY, JSON.stringify(state.recentLocations.slice(0, 5)));
}

function loadCommonPlaces() {
  const raw = safeGetItem(MESSAGE_COMMON_PLACES_KEY);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed
          .map((item, index) => normalizeCommonPlace(item, index))
          .filter((item) => String(item.name || "").trim())
          .sort((left, right) => (right.updatedAt || 0) - (left.updatedAt || 0))
      : [];
  } catch (_error) {
    return [];
  }
}

function persistCommonPlaces() {
  safeSetItem(MESSAGE_COMMON_PLACES_KEY, JSON.stringify(state.commonPlaces));
}

function loadPresenceState() {
  const raw = safeGetItem(MESSAGE_PRESENCE_STATE_KEY);
  if (!raw) {
    return {
      userGlobal: normalizePresenceEntry({}),
      userByContact: {},
      contacts: {}
    };
  }

  try {
    const parsed = JSON.parse(raw);
    const userByContact = Object.fromEntries(
      Object.entries(parsed?.userByContact || {}).map(([contactId, entry]) => [
        String(contactId || "").trim(),
        normalizePresenceEntry(entry)
      ])
    );
    const contacts = Object.fromEntries(
      Object.entries(parsed?.contacts || {}).map(([contactId, entry]) => [
        String(contactId || "").trim(),
        normalizePresenceEntry(entry)
      ])
    );
    return {
      userGlobal: normalizePresenceEntry(parsed?.userGlobal),
      userByContact,
      contacts
    };
  } catch (_error) {
    return {
      userGlobal: normalizePresenceEntry({}),
      userByContact: {},
      contacts: {}
    };
  }
}

function persistPresenceState() {
  safeSetItem(MESSAGE_PRESENCE_STATE_KEY, JSON.stringify(state.presenceState));
}

function getCommonPlaceById(placeId = "") {
  const resolvedId = String(placeId || "").trim();
  if (!resolvedId) {
    return null;
  }
  return state.commonPlaces.find((item) => item.id === resolvedId) || null;
}

function getCommonPlaceVisibilityLabel(place) {
  const resolvedPlace = place && typeof place === "object" ? place : {};
  if (resolvedPlace.visibilityMode === "all_contacts") {
    return "全部角色可见";
  }
  if (resolvedPlace.visibilityMode === "selected_contacts") {
    const names = normalizeMountedIds(resolvedPlace.visibleContactIds)
      .map((contactId) => getContactById(contactId)?.name || "")
      .filter(Boolean);
    return names.length ? `指定角色 · ${names.slice(0, 2).join("、")}${names.length > 2 ? "…" : ""}` : "指定角色";
  }
  return "仅自己知道";
}

function getCommonPlaceSearchTokens(place) {
  const source = place && typeof place === "object" ? place : {};
  return [
    String(source.name || "").trim(),
    ...normalizeCommonPlaceAliases(source.aliases),
    String(source.traitsText || "").trim()
  ]
    .filter(Boolean)
    .join("\n")
    .toLowerCase();
}

function buildCommonPlaceAliasList(place) {
  return normalizeCommonPlaceAliases(place?.aliases || []).filter(
    (alias) => alias.toLowerCase() !== String(place?.name || "").trim().toLowerCase()
  );
}

function isCommonPlaceVisibleToContact(place, contactId = "") {
  const resolvedPlace = place && typeof place === "object" ? place : null;
  const resolvedContactId = String(contactId || "").trim();
  if (!resolvedPlace || !resolvedContactId) {
    return false;
  }
  if (resolvedPlace.visibilityMode === "all_contacts") {
    return true;
  }
  if (resolvedPlace.visibilityMode === "selected_contacts") {
    return normalizeMountedIds(resolvedPlace.visibleContactIds).includes(resolvedContactId);
  }
  return false;
}

function getVisibleCommonPlacesForContact(contactId = "") {
  return state.commonPlaces.filter((place) => isCommonPlaceVisibleToContact(place, contactId));
}

function getAllCommonPlaceSelectOptions() {
  return state.commonPlaces.slice();
}

function findCommonPlaceByName(name = "", contactId = "") {
  const normalizePlaceNeedle = (value) =>
    String(value || "")
      .trim()
      .toLowerCase()
      .replace(/[「」『』【】（）()《》〈〉<>、，。,.\-_\s]/g, "");
  const needle = normalizePlaceNeedle(name);
  if (!needle) {
    return null;
  }
  const candidates = contactId ? getVisibleCommonPlacesForContact(contactId) : state.commonPlaces;
  return (
    candidates.find((place) => {
      const names = [String(place.name || "").trim(), ...buildCommonPlaceAliasList(place)]
        .map((item) => normalizePlaceNeedle(item))
        .filter(Boolean);
      return names.some((item) => item === needle || item.includes(needle) || needle.includes(item));
    }) || null
  );
}

function sanitizePresenceEntryForExistingPlaces(entry) {
  const normalized = normalizePresenceEntry(entry);
  const hasPlace = (placeId) => Boolean(getCommonPlaceById(placeId));
  return {
    ...normalized,
    placeId: hasPlace(normalized.placeId) ? normalized.placeId : "",
    fromPlaceId: hasPlace(normalized.fromPlaceId) ? normalized.fromPlaceId : "",
    toPlaceId: hasPlace(normalized.toPlaceId) ? normalized.toPlaceId : ""
  };
}

function sanitizePresenceStateReferences() {
  state.presenceState = {
    userGlobal: sanitizePresenceEntryForExistingPlaces(state.presenceState?.userGlobal),
    userByContact: Object.fromEntries(
      Object.entries(state.presenceState?.userByContact || {}).map(([contactId, entry]) => [
        contactId,
        sanitizePresenceEntryForExistingPlaces(entry)
      ])
    ),
    contacts: Object.fromEntries(
      Object.entries(state.presenceState?.contacts || {}).map(([contactId, entry]) => [
        contactId,
        sanitizePresenceEntryForExistingPlaces(entry)
      ])
    )
  };
}

function getUserPresenceScope() {
  return state.chatGlobalSettings?.userPresenceScope === "per_contact" ? "per_contact" : "global";
}

function getUserPresenceForContact(contactId = "") {
  const resolvedContactId = String(contactId || "").trim();
  if (getUserPresenceScope() === "per_contact" && resolvedContactId) {
    const scopedEntry = normalizePresenceEntry(state.presenceState?.userByContact?.[resolvedContactId]);
    if (
      scopedEntry.placeId ||
      scopedEntry.fromPlaceId ||
      scopedEntry.toPlaceId ||
      scopedEntry.updatedAt
    ) {
      return scopedEntry;
    }
  }
  return normalizePresenceEntry(state.presenceState?.userGlobal);
}

function getContactPresence(contactId = "") {
  const resolvedContactId = String(contactId || "").trim();
  return normalizePresenceEntry(state.presenceState?.contacts?.[resolvedContactId]);
}

function setUserPresenceEntry(contactId = "", entry = {}) {
  const resolvedEntry = sanitizePresenceEntryForExistingPlaces(entry);
  if (getUserPresenceScope() === "per_contact" && String(contactId || "").trim()) {
    state.presenceState = {
      ...state.presenceState,
      userByContact: {
        ...(state.presenceState?.userByContact || {}),
        [String(contactId || "").trim()]: resolvedEntry
      }
    };
    persistPresenceState();
    return;
  }
  state.presenceState = {
    ...state.presenceState,
    userGlobal: resolvedEntry
  };
  persistPresenceState();
}

function setContactPresenceEntry(contactId = "", entry = {}) {
  const resolvedContactId = String(contactId || "").trim();
  if (!resolvedContactId) {
    return;
  }
  state.presenceState = {
    ...state.presenceState,
    contacts: {
      ...(state.presenceState?.contacts || {}),
      [resolvedContactId]: sanitizePresenceEntryForExistingPlaces(entry)
    }
  };
  persistPresenceState();
}

function buildPresenceTypeLabel(type = "") {
  return String(type || "").trim() === "in_transit" ? "在路上" : "在某地";
}

function buildPresenceSummaryText(entry, contactId = "") {
  const resolved = normalizePresenceEntry(entry);
  if (resolved.presenceType === "in_transit") {
    const fromPlace = getCommonPlaceById(resolved.fromPlaceId);
    const toPlace = getCommonPlaceById(resolved.toPlaceId);
    if (toPlace) {
      return fromPlace
        ? `在路上 · ${fromPlace.name} → ${toPlace.name}`
        : `在路上 · 正前往 ${toPlace.name}`;
    }
    return "在路上";
  }
  const place = getCommonPlaceById(resolved.placeId);
  if (!place) {
    return contactId ? "地点未设置" : "未设置地点";
  }
  return `在 ${place.name}`;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function submitFormReliably(form, event) {
  if (event) {
    event.preventDefault();
  }
  if (!(form instanceof HTMLFormElement)) {
    return;
  }
  if (typeof form.requestSubmit === "function") {
    form.requestSubmit();
    return;
  }
  form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
}

function hashText(value) {
  const text = String(value || "");
  let hash = 0;
  for (let index = 0; index < text.length; index += 1) {
    hash = (hash * 31 + text.charCodeAt(index)) >>> 0;
  }
  return hash.toString(36);
}

function truncate(text, length = 42) {
  const normalized = String(text || "").trim();
  if (normalized.length <= length) {
    return normalized;
  }
  return `${normalized.slice(0, length - 1)}…`;
}

function formatLocalTime(now = new Date()) {
  return new Intl.DateTimeFormat("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  })
    .format(now)
    .replace(/^24:/, "00:");
}

function formatLocationCoordinates(longitude, latitude) {
  const lngValue = Math.abs(Number(longitude) || 0).toFixed(3);
  const latValue = Math.abs(Number(latitude) || 0).toFixed(4);
  return `${lngValue}E, ${latValue}N`;
}

function buildRandomLocationCoordinates(seed = "") {
  const hash = Number.parseInt(hashText(seed || Date.now()), 36) || Date.now();
  const secondaryHash = Number.parseInt(hashText(`${seed}_lat`), 36) || hash * 7;
  const longitude = 73 + ((hash % 62000) / 1000);
  const latitude = 18 + ((secondaryHash % 35000) / 1000);
  return formatLocationCoordinates(longitude, latitude);
}

function buildLocationMessageText(locationName, coordinates) {
  return ["[定位消息]", `位置名称：${locationName}`, `坐标：${coordinates}`].join("\n");
}

function buildScheduleInviteTimeText(
  dateText = "",
  startTime = "",
  endTime = "",
  scheduleType = "day"
) {
  const resolvedDate = String(dateText || "").trim();
  if (scheduleType === "week") {
    return `每周${formatWeekday(resolvedDate, "long")} · ${startTime || "--:--"}-${endTime || "--:--"}`;
  }
  if (scheduleType === "day") {
    return `${resolvedDate || "--"} · 全天`;
  }
  return `${resolvedDate || "--"} · ${startTime || "--:--"}-${endTime || "--:--"}`;
}

function buildScheduleInviteMessageText(
  title = "",
  dateText = "",
  startTime = "",
  endTime = "",
  scheduleType = "day"
) {
  return [
    "[日程邀请]",
    `日程名称：${title}`,
    `日程时间：${buildScheduleInviteTimeText(dateText, startTime, endTime, scheduleType)}`
  ].join("\n");
}

function buildImageMessageText(description = "") {
  const resolvedDescription = String(description || "").trim();
  return ["[图片消息]", resolvedDescription ? `图片说明：${resolvedDescription}` : ""]
    .filter(Boolean)
    .join("\n");
}

function estimateVoiceMessageDurationSeconds(text = "") {
  const normalized = String(text || "").trim().replace(/\s+/g, "");
  if (!normalized) {
    return 1;
  }
  return clampNumber(Math.ceil(normalized.length / 8), 1, 60);
}

function formatVoiceMessageDurationLabel(durationSeconds = 0) {
  const resolvedDuration = clampNumber(Number(durationSeconds) || 0, 1, 60);
  return `${resolvedDuration}''`;
}

function buildVoiceMessageText(content = "", durationSeconds = 0) {
  const resolvedContent = String(content || "").trim();
  const resolvedDuration = estimateVoiceMessageDurationSeconds(
    resolvedContent
  );
  const explicitDuration = clampNumber(Number(durationSeconds) || resolvedDuration, 1, 60);
  return [
    "[语音消息]",
    `语音时长：${formatVoiceMessageDurationLabel(explicitDuration)}`,
    resolvedContent ? `语音转文字：${resolvedContent}` : ""
  ]
    .filter(Boolean)
    .join("\n");
}

function parseVoiceMessageText(text = "") {
  const normalized = String(text || "").replace(/\r/g, "").trim();
  if (!normalized.startsWith("[语音消息]")) {
    return null;
  }
  const lines = normalized
    .split("\n")
    .map((line) => String(line || "").trim())
    .filter(Boolean);
  const durationLine = lines.find((line) => line.startsWith("语音时长：")) || "";
  const contentLine = lines.find((line) => line.startsWith("语音转文字：")) || "";
  const durationMatch = durationLine.match(/(\d+)/);
  return {
    voiceText: contentLine.slice("语音转文字：".length).trim(),
    voiceDurationSeconds: clampNumber(
      Number.parseInt(String(durationMatch?.[1] || ""), 10) || estimateVoiceMessageDurationSeconds(
        contentLine.slice("语音转文字：".length).trim()
      ),
      1,
      60
    )
  };
}

function formatVoiceCallDurationLabel(durationSeconds = 0) {
  const resolvedDuration = Math.max(0, Math.floor(Number(durationSeconds) || 0));
  const hours = Math.floor(resolvedDuration / 3600);
  const minutes = Math.floor((resolvedDuration % 3600) / 60);
  const seconds = resolvedDuration % 60;
  return [hours, minutes, seconds].map((item) => String(item).padStart(2, "0")).join(":");
}

function getVoiceCallDurationSeconds(callState = null, now = Date.now()) {
  const startedAt = Number(callState?.startedAt) || 0;
  if (!startedAt) {
    return 0;
  }
  return Math.max(0, Math.floor((Number(now) - startedAt) / 1000));
}

function normalizeConversationCallMode(value = "") {
  return String(value || "").trim().toLowerCase() === "video" ? "video" : "voice";
}

function getConversationCallModeLabel(callMode = "voice") {
  return normalizeConversationCallMode(callMode) === "video" ? "视频通话" : "语音通话";
}

function getConversationCallModeShortLabel(callMode = "voice") {
  return normalizeConversationCallMode(callMode) === "video" ? "视频" : "语音";
}

function getConversationCallModeIcon(callMode = "voice") {
  return normalizeConversationCallMode(callMode) === "video" ? "video" : "phone";
}

function normalizeVoiceCallRequestStatus(value = "") {
  const normalized = String(value || "").trim().toLowerCase();
  if (["accepted", "rejected", "pending"].includes(normalized)) {
    return normalized;
  }
  if (["已接通", "已接受", "接通", "接受"].includes(normalized)) {
    return "accepted";
  }
  if (["已拒绝", "拒绝"].includes(normalized)) {
    return "rejected";
  }
  return "pending";
}

function getVoiceCallRequestStatusLabel(status = "pending") {
  const resolvedStatus = normalizeVoiceCallRequestStatus(status);
  if (resolvedStatus === "accepted") {
    return "已接通";
  }
  if (resolvedStatus === "rejected") {
    return "已拒绝";
  }
  return "等待接通";
}

function normalizeVoiceCallEventKind(value = "") {
  const normalized = String(value || "").trim().toLowerCase();
  if (["connected", "rejected", "ended"].includes(normalized)) {
    return normalized;
  }
  if (["已接通", "接通", "connected"].includes(normalized)) {
    return "connected";
  }
  if (["已拒绝", "拒绝", "rejected"].includes(normalized)) {
    return "rejected";
  }
  if (["已挂断", "挂断", "已结束", "ended"].includes(normalized)) {
    return "ended";
  }
  return "connected";
}

function getVoiceCallEventKindLabel(kind = "connected") {
  const resolvedKind = normalizeVoiceCallEventKind(kind);
  if (resolvedKind === "ended") {
    return "已挂断";
  }
  if (resolvedKind === "rejected") {
    return "已拒绝";
  }
  return "已接通";
}

function buildConversationCallRequestMessageText(
  callMode = "voice",
  status = "pending",
  message = "",
  initiatorRole = "assistant"
) {
  const resolvedMode = normalizeConversationCallMode(callMode);
  const resolvedMessage = String(message || "").trim();
  return [
    `[${getConversationCallModeLabel(resolvedMode)}请求]`,
    resolvedMessage ? `请求留言：${resolvedMessage}` : ""
  ]
    .filter(Boolean)
    .join("\n");
}

function buildVoiceCallRequestMessageText(status = "pending", message = "", initiatorRole = "assistant") {
  return buildConversationCallRequestMessageText("voice", status, message, initiatorRole);
}

function buildVideoCallRequestMessageText(status = "pending", message = "", initiatorRole = "assistant") {
  return buildConversationCallRequestMessageText("video", status, message, initiatorRole);
}

function parseConversationCallRequestMessageText(text = "", callMode = "voice") {
  const normalized = String(text || "").replace(/\r/g, "").trim();
  if (!normalized.startsWith(`[${getConversationCallModeLabel(callMode)}请求]`)) {
    return null;
  }
  const lines = normalized
    .split("\n")
    .map((line) => String(line || "").trim())
    .filter(Boolean);
  const statusLine = lines.find((line) => line.startsWith("当前状态：")) || "";
  const messageLine = lines.find((line) => line.startsWith("请求留言：")) || "";
  const initiatorLine = lines.find((line) => line.startsWith("发起方：")) || "";
  return {
    callRequestStatus: statusLine
      ? normalizeVoiceCallRequestStatus(statusLine.slice("当前状态：".length))
      : "pending",
    callRequestMessage: messageLine.slice("请求留言：".length).trim(),
    callRequestInitiatorRole: initiatorLine
      ? initiatorLine.includes("用户")
        ? "user"
        : "assistant"
      : "assistant"
  };
}

function parseVoiceCallRequestMessageText(text = "") {
  return parseConversationCallRequestMessageText(text, "voice");
}

function parseVideoCallRequestMessageText(text = "") {
  return parseConversationCallRequestMessageText(text, "video");
}

function buildConversationCallEventMessageText(callMode = "voice", kind = "connected", options = {}) {
  const eventOptions = options && typeof options === "object" ? options : {};
  const resolvedMode = normalizeConversationCallMode(callMode);
  const resolvedKind = normalizeVoiceCallEventKind(kind);
  const durationSeconds = Math.max(0, Math.floor(Number(eventOptions.durationSeconds) || 0));
  const note = String(eventOptions.note || "").trim();
  const lines = [
    `[${getConversationCallModeLabel(resolvedMode)}事件]`,
    `状态：${getVoiceCallEventKindLabel(resolvedKind)}`
  ];
  if (resolvedKind === "ended") {
    lines.push(`持续时长：${formatVoiceCallDurationLabel(durationSeconds)}`);
  }
  if (note) {
    lines.push(`补充：${note}`);
  }
  return lines.join("\n");
}

function buildVoiceCallEventMessageText(kind = "connected", options = {}) {
  return buildConversationCallEventMessageText("voice", kind, options);
}

function buildVideoCallEventMessageText(kind = "connected", options = {}) {
  return buildConversationCallEventMessageText("video", kind, options);
}

function normalizeAssistantEndedCallMessageForConversation(conversation = null, message = null) {
  if (!message || typeof message !== "object") {
    return {
      message,
      changed: false,
      endedActiveCall: false
    };
  }
  const role = String(message.role || "").trim();
  const messageType = String(message.messageType || "").trim();
  if (
    role !== "assistant" ||
    (messageType !== "voice_call_event" && messageType !== "video_call_event")
  ) {
    return {
      message,
      changed: false,
      endedActiveCall: false
    };
  }
  const callEventKind = normalizeVoiceCallEventKind(message.callEventKind);
  if (callEventKind !== "ended") {
    return {
      message,
      changed: false,
      endedActiveCall: false
    };
  }

  const callMode = getConversationCallModeFromMessage(message);
  const activeCallState = getConversationVoiceCallState(conversation);
  const activeStartedAt = Number(activeCallState?.startedAt) || 0;
  const messageCreatedAt = Number(message.createdAt) || 0;
  const endedActiveCall =
    Boolean(activeCallState?.active) &&
    normalizeConversationCallMode(activeCallState?.callMode) === callMode &&
    (!activeStartedAt || !messageCreatedAt || messageCreatedAt >= activeStartedAt - 1000);
  const nextDurationSeconds =
    Math.max(0, Math.floor(Number(message.callEventDurationSeconds) || 0)) ||
    (endedActiveCall ? getVoiceCallDurationSeconds(activeCallState, messageCreatedAt || Date.now()) : 0);
  const nextText = buildConversationCallEventMessageText(callMode, "ended", {
    durationSeconds: nextDurationSeconds
  });
  const changed =
    nextDurationSeconds !== Math.max(0, Math.floor(Number(message.callEventDurationSeconds) || 0)) ||
    nextText !== String(message.text || "").trim() ||
    normalizeConversationCallMode(message.callMode) !== callMode;

  return {
    message: changed
      ? {
          ...message,
          callMode,
          callEventKind: "ended",
          callEventDurationSeconds: nextDurationSeconds,
          text: nextText
        }
      : message,
    changed,
    endedActiveCall
  };
}

function applyAssistantEndedCallMessagesToConversation(conversation = null, messages = []) {
  const resolvedConversation = conversation && typeof conversation === "object" ? conversation : null;
  let clearedActiveCall = false;
  let changed = false;
  const replacementsById = new Map();
  const resolvedMessages = normalizeObjectArray(messages).map((message) => {
    const source = message && typeof message === "object" ? message : {};
    const result = normalizeAssistantEndedCallMessageForConversation(resolvedConversation, source);
    const normalizedMessage = result.message && typeof result.message === "object" ? result.message : source;
    if (result.changed) {
      changed = true;
    }
    if (result.endedActiveCall) {
      clearedActiveCall = true;
    }
    const messageId = String(normalizedMessage.id || "").trim();
    if (messageId && result.changed) {
      replacementsById.set(messageId, normalizedMessage);
    }
    return normalizedMessage;
  });

  if (clearedActiveCall && resolvedConversation) {
    setConversationVoiceCallState(resolvedConversation, null);
  }
  if (resolvedConversation && replacementsById.size && Array.isArray(resolvedConversation.messages)) {
    let conversationMessagesChanged = false;
    resolvedConversation.messages = resolvedConversation.messages.map((message) => {
      const replacement = replacementsById.get(String(message?.id || "").trim());
      if (!replacement) {
        return message;
      }
      conversationMessagesChanged = true;
      return replacement;
    });
    if (conversationMessagesChanged) {
      changed = true;
    }
  }

  return {
    messages: resolvedMessages,
    changed,
    clearedActiveCall
  };
}

function parseConversationCallEventMessageText(text = "", callMode = "voice") {
  const normalized = String(text || "").replace(/\r/g, "").trim();
  if (!normalized.startsWith(`[${getConversationCallModeLabel(callMode)}事件]`)) {
    return null;
  }
  const lines = normalized
    .split("\n")
    .map((line) => String(line || "").trim())
    .filter(Boolean);
  const kindLine = lines.find((line) => line.startsWith("状态：")) || "";
  const durationLine = lines.find((line) => line.startsWith("持续时长：")) || "";
  const durationMatch = durationLine.match(/(\d{1,2}):(\d{2}):(\d{2})/);
  const durationSeconds = durationMatch
    ? Number(durationMatch[1]) * 3600 + Number(durationMatch[2]) * 60 + Number(durationMatch[3])
    : 0;
  return {
    callEventKind: normalizeVoiceCallEventKind(kindLine.slice("状态：".length)),
    callEventDurationSeconds: durationSeconds
  };
}

function parseVoiceCallEventMessageText(text = "") {
  return parseConversationCallEventMessageText(text, "voice");
}

function parseVideoCallEventMessageText(text = "") {
  return parseConversationCallEventMessageText(text, "video");
}

function parseImageMessageText(text = "") {
  const normalized = String(text || "").replace(/\r/g, "").trim();
  if (!normalized.startsWith("[图片消息]")) {
    return null;
  }
  const lines = normalized
    .split("\n")
    .map((line) => String(line || "").trim())
    .filter(Boolean);
  const descriptionLine = lines.find((line) => line.startsWith("图片说明：")) || "";
  return {
    imageDescription: descriptionLine.slice("图片说明：".length).trim()
  };
}

function buildQuoteMessageText(quotedText = "", quotedRole = "user", replyText = "") {
  const roleLabel = quotedRole === "assistant" ? "角色" : "用户";
  return [
    "[引用回复]",
    `引用对象：${roleLabel}`,
    `引用内容：${String(quotedText || "").trim()}`,
    `回复内容：${String(replyText || "").trim()}`
  ]
    .filter(Boolean)
    .join("\n");
}

function parseQuoteMessageText(text = "") {
  const normalized = String(text || "").replace(/\r/g, "").trim();
  if (!normalized.startsWith("[引用回复]")) {
    return null;
  }
  const lines = normalized
    .split("\n")
    .map((line) => String(line || "").trim())
    .filter(Boolean);
  let quotedRole = "user";
  let quotedText = "";
  let replyText = "";
  lines.forEach((line) => {
    if (line.startsWith("引用对象：")) {
      quotedRole = line.slice("引用对象：".length).includes("角色") ? "assistant" : "user";
      return;
    }
    if (line.startsWith("引用内容：")) {
      quotedText = line.slice("引用内容：".length).trim();
      return;
    }
    if (line.startsWith("回复内容：")) {
      replyText = line.slice("回复内容：".length).trim();
    }
  });
  if (!quotedText || !replyText) {
    return null;
  }
  return {
    quotedRole,
    quotedText,
    replyText
  };
}

function parseInlineQuoteReplyMessage(text = "") {
  const parsed = parseQuoteReplyPayload(String(text || "").trim());
  const item = Array.isArray(parsed) ? parsed[0] : null;
  if (!item) {
    return null;
  }
  const quotedText = String(item.quotedText || "").trim();
  const replyText = String(item.text || "").trim();
  if (!quotedText || !replyText) {
    return null;
  }
  return {
    quotedRole: item.quotedRole === "assistant" ? "assistant" : "user",
    quotedText,
    replyText
  };
}

function isLocationConversationMessage(message) {
  const explicitType = String(message?.messageType || "").trim() === "location";
  const hasPayload =
    Boolean(String(message?.locationName || "").trim()) &&
    Boolean(String(message?.coordinates || "").trim());
  return explicitType || hasPayload;
}

function isScheduleInviteConversationMessage(message) {
  const explicitType = String(message?.messageType || "").trim() === "schedule_invite";
  const hasPayload =
    Boolean(String(message?.scheduleInviteTitle || "").trim()) &&
    Boolean(String(message?.scheduleInviteDate || "").trim());
  return explicitType || hasPayload;
}

function isImageConversationMessage(message) {
  const explicitType = String(message?.messageType || "").trim() === "image";
  const legacyPayload = parseImageMessageText(message?.text);
  const hasPayload =
    Boolean(String(message?.imageDataUrl || "").trim()) ||
    Boolean(String(message?.imageDescription || legacyPayload?.imageDescription || "").trim());
  return explicitType || hasPayload;
}

function isVoiceConversationMessage(message) {
  const explicitType = String(message?.messageType || "").trim() === "voice";
  const legacyPayload = parseVoiceMessageText(message?.text);
  const hasPayload = Boolean(
    String(message?.voiceText || legacyPayload?.voiceText || "").trim()
  );
  return explicitType || hasPayload;
}

function isVoiceCallRequestConversationMessage(message) {
  const explicitType = String(message?.messageType || "").trim() === "voice_call_request";
  const legacyPayload = parseVoiceCallRequestMessageText(message?.text);
  return explicitType || Boolean(legacyPayload);
}

function isVideoCallRequestConversationMessage(message) {
  const explicitType = String(message?.messageType || "").trim() === "video_call_request";
  const legacyPayload = parseVideoCallRequestMessageText(message?.text);
  return explicitType || Boolean(legacyPayload);
}

function isVoiceCallEventConversationMessage(message) {
  const explicitType = String(message?.messageType || "").trim() === "voice_call_event";
  const legacyPayload = parseVoiceCallEventMessageText(message?.text);
  return explicitType || Boolean(legacyPayload);
}

function isVideoCallEventConversationMessage(message) {
  const explicitType = String(message?.messageType || "").trim() === "video_call_event";
  const legacyPayload = parseVideoCallEventMessageText(message?.text);
  return explicitType || Boolean(legacyPayload);
}

function isConversationCallRequestMessage(message) {
  return (
    isVoiceCallRequestConversationMessage(message) ||
    isVideoCallRequestConversationMessage(message)
  );
}

function isConversationCallEventMessage(message) {
  return (
    isVoiceCallEventConversationMessage(message) ||
    isVideoCallEventConversationMessage(message)
  );
}

function getConversationCallModeFromMessage(message = {}) {
  if (
    isVideoCallRequestConversationMessage(message) ||
    isVideoCallEventConversationMessage(message) ||
    String(message?.messageType || "").trim() === "video_call_request" ||
    String(message?.messageType || "").trim() === "video_call_event"
  ) {
    return "video";
  }
  return "voice";
}

function isQuoteConversationMessage(message) {
  const explicitType = String(message?.messageType || "").trim() === "quote";
  const hasPayload =
    Boolean(String(message?.quotedText || "").trim()) &&
    Boolean(String(message?.text || "").trim());
  return (
    explicitType ||
    hasPayload ||
    Boolean(parseQuoteMessageText(message?.text)) ||
    Boolean(parseInlineQuoteReplyMessage(message?.text))
  );
}

function normalizeDiscussionShareRepostSource(source) {
  if (!source || typeof source !== "object") {
    return null;
  }
  const text = String(source.text || "").trim();
  const imageHint = String(source.imageHint || source.mediaSummary || "").trim();
  const tags = Array.isArray(source.tags)
    ? source.tags.map((item) => String(item || "").trim()).filter(Boolean).slice(0, 5)
    : [];
  if (!text && !imageHint && !tags.length) {
    return null;
  }
  return {
    id: String(source.id || `discussion_share_repost_${hashText(`${text}_${imageHint}`)}`),
    displayName: String(source.displayName || source.username || "论坛用户").trim() || "论坛用户",
    handle: String(source.handle || source.userId || "@forum_user").trim() || "@forum_user",
    time: String(source.time || "").trim(),
    text: text.slice(0, 1400),
    imageHint: imageHint.slice(0, 120),
    tags
  };
}

function normalizeDiscussionShareReply(reply, index = 0) {
  const source = reply && typeof reply === "object" ? reply : {};
  const text = String(source.text || "").trim();
  const imageHint = String(source.imageHint || source.mediaSummary || "").trim();
  const children = normalizeObjectArray(source.children)
    .map((item, childIndex) => normalizeDiscussionShareReply(item, childIndex))
    .filter(Boolean);
  if (!text && !children.length && !imageHint) {
    return null;
  }
  return {
    id: String(source.id || `discussion_share_reply_${index}_${hashText(`${text}_${imageHint}`)}`),
    displayName: String(source.displayName || source.username || "论坛用户").trim() || "论坛用户",
    handle: String(source.handle || source.userId || "@forum_user").trim() || "@forum_user",
    time: String(source.time || "").trim(),
    text: text.slice(0, 1400),
    imageHint: imageHint.slice(0, 120),
    depth: Math.max(1, Number.parseInt(String(source.depth || 1), 10) || 1),
    children
  };
}

function countDiscussionShareReplies(replies = []) {
  return normalizeObjectArray(replies).reduce((total, reply) => {
    return total + 1 + countDiscussionShareReplies(reply.children || []);
  }, 0);
}

function flattenDiscussionShareReplies(replies = [], depth = 1, list = []) {
  normalizeObjectArray(replies).forEach((reply) => {
    const normalizedReply = normalizeDiscussionShareReply(
      {
        ...reply,
        depth: Math.max(depth, Number.parseInt(String(reply?.depth || depth), 10) || depth)
      },
      list.length
    );
    if (!normalizedReply) {
      return;
    }
    list.push(normalizedReply);
    if (normalizedReply.children?.length) {
      flattenDiscussionShareReplies(normalizedReply.children, normalizedReply.depth + 1, list);
    }
  });
  return list;
}

function normalizeDiscussionSharePayload(payload) {
  const source = payload && typeof payload === "object" ? payload : {};
  const rootSource = source.rootPost && typeof source.rootPost === "object" ? source.rootPost : source;
  const rootText = String(rootSource.text || "").trim();
  const rootImageHint = String(rootSource.imageHint || rootSource.mediaSummary || "").trim();
  const rootTags = Array.isArray(rootSource.tags)
    ? rootSource.tags.map((item) => String(item || "").trim()).filter(Boolean).slice(0, 6)
    : [];
  const replies = normalizeObjectArray(source.replies)
    .map((reply, index) => normalizeDiscussionShareReply(reply, index))
    .filter(Boolean);
  const replyCount =
    Math.max(0, Number.parseInt(String(source.replyCount || source.loadedReplyCount || 0), 10) || 0) ||
    countDiscussionShareReplies(replies);
  const truncatedReplyCount = Math.max(
    0,
    Number.parseInt(String(source.truncatedReplyCount || 0), 10) || 0
  );
  if (!rootText && !rootImageHint && !rootTags.length && !replies.length) {
    return null;
  }
  return {
    id: String(source.id || rootSource.id || `discussion_share_${hashText(`${rootText}_${replyCount}`)}`),
    sourceType: "forum_discussion",
    sharedAt: Number(source.sharedAt) || Date.now(),
    bucketName: String(source.bucketName || source.feedType || "").trim(),
    feedLabel: String(source.feedLabel || source.bucketLabel || "").trim(),
    postId: String(source.postId || rootSource.id || "").trim(),
    rootPost: {
      id: String(rootSource.id || source.postId || "").trim(),
      displayName:
        String(rootSource.displayName || rootSource.username || "论坛用户").trim() || "论坛用户",
      handle: String(rootSource.handle || rootSource.userId || "@forum_user").trim() || "@forum_user",
      time: String(rootSource.time || "").trim(),
      text: rootText.slice(0, 2200),
      imageHint: rootImageHint.slice(0, 120),
      tags: rootTags,
      repostSource: normalizeDiscussionShareRepostSource(rootSource.repostSource || source.repostSource)
    },
    replies,
    replyCount,
    truncatedReplyCount
  };
}

function isDiscussionShareConversationMessage(message) {
  const explicitType = String(message?.messageType || "").trim() === "discussion_share";
  return explicitType || Boolean(normalizeDiscussionSharePayload(message?.discussionSharePayload));
}

function getDiscussionSharePayloadFromMessage(message) {
  return normalizeDiscussionSharePayload(message?.discussionSharePayload || null);
}

function buildDiscussionSharePreviewText(payload) {
  const resolvedPayload = normalizeDiscussionSharePayload(payload);
  if (!resolvedPayload) {
    return "【社媒讨论帖】";
  }
  const rootPost = resolvedPayload.rootPost || {};
  const summary = truncate(
    String(rootPost.text || rootPost.imageHint || rootPost.repostSource?.text || "").trim() ||
      "点开查看这条社媒讨论帖",
    28
  );
  return `【社媒讨论帖】${String(rootPost.displayName || "论坛用户").trim()}：${summary}`;
}

function buildDiscussionShareFallbackText(payload) {
  const resolvedPayload = normalizeDiscussionSharePayload(payload);
  if (!resolvedPayload) {
    return "【社媒讨论帖】";
  }
  const rootPost = resolvedPayload.rootPost || {};
  const lines = [
    "【社媒讨论帖】",
    `主贴作者：${String(rootPost.displayName || "论坛用户").trim()} ${String(
      rootPost.handle || "@forum_user"
    ).trim()}`.trim(),
    rootPost.time ? `发布时间：${rootPost.time}` : "",
    rootPost.text
      ? `主贴内容：${rootPost.text}`
      : rootPost.imageHint
        ? `主贴内容：${rootPost.imageHint}`
        : "主贴内容：点击查看详情",
    resolvedPayload.replyCount ? `已加载回复：${resolvedPayload.replyCount} 条` : "已加载回复：0 条"
  ].filter(Boolean);
  return lines.join("\n");
}

function buildDiscussionSharePromptText(payload) {
  const resolvedPayload = normalizeDiscussionSharePayload(payload);
  if (!resolvedPayload) {
    return "【社媒讨论帖】\n用户发来了一条外部社媒讨论内容。";
  }
  const rootPost = resolvedPayload.rootPost || {};
  const flattenedReplies = flattenDiscussionShareReplies(resolvedPayload.replies || []).slice(0, 16);
  const lines = [
    "【社媒讨论帖】",
    "下面是一条从社媒/论坛转发进当前私聊的外部讨论帖。",
    "它不是用户此刻直接对你说的话，也不是你们之间已经发生的聊天内容；请把它当作用户发来给你一起看的讨论素材。",
    `主贴作者：${String(rootPost.displayName || "论坛用户").trim()} ${String(
      rootPost.handle || "@forum_user"
    ).trim()}`.trim(),
    rootPost.time ? `主贴时间：${rootPost.time}` : "",
    rootPost.text
      ? `主贴内容：${rootPost.text}`
      : rootPost.imageHint
        ? `主贴内容：${rootPost.imageHint}`
        : "主贴内容：无正文",
    rootPost.tags?.length ? `主贴标签：${rootPost.tags.join(" ")}` : "",
    rootPost.repostSource
      ? `主贴引用：${String(rootPost.repostSource.displayName || "论坛用户").trim()} ${
          String(rootPost.repostSource.handle || "@forum_user").trim()
        }\n引用内容：${
          rootPost.repostSource.text ||
          rootPost.repostSource.imageHint ||
          "无正文"
        }`
      : "",
    flattenedReplies.length
      ? `已加载回复（只做参考，不需要逐条复述）：\n${flattenedReplies
          .map((reply, index) => {
            const depthPrefix = reply.depth > 1 ? `${"  ".repeat(reply.depth - 1)}↳ ` : "";
            const replyText = String(reply.text || reply.imageHint || "无正文").trim();
            return `${index + 1}. ${depthPrefix}${reply.displayName} ${reply.handle}：${replyText}`;
          })
          .join("\n")}`
      : "当前还没有加载到回复。"
  ].filter(Boolean);
  if (resolvedPayload.truncatedReplyCount > 0) {
    lines.push(`还有 ${resolvedPayload.truncatedReplyCount} 条较深或较长的回复未展开。`);
  }
  return lines.join("\n");
}

function getConversationMessagePromptText(message = {}) {
  if (isDiscussionShareConversationMessage(message)) {
    return buildDiscussionSharePromptText(getDiscussionSharePayloadFromMessage(message));
  }
  if (isScheduleInviteConversationMessage(message)) {
    return buildScheduleInviteMessageText(
      String(message.scheduleInviteTitle || "").trim() || "未命名日程",
      String(message.scheduleInviteDate || "").trim(),
      String(message.scheduleInviteStartTime || "").trim(),
      String(message.scheduleInviteEndTime || "").trim(),
      ["day", "hour", "week"].includes(message.scheduleInviteType) ? message.scheduleInviteType : "day"
    );
  }
  if (isLocationConversationMessage(message)) {
    return buildLocationMessageText(
      String(message.locationName || "").trim() || "未命名位置",
      String(message.coordinates || "").trim() ||
        buildRandomLocationCoordinates(String(message.locationName || "").trim())
    );
  }
  if (isImageConversationMessage(message)) {
    return buildImageMessageText(String(message.imageDescription || "").trim());
  }
  if (isVoiceConversationMessage(message)) {
    return buildVoiceMessageText(
      String(message.voiceText || "").trim(),
      Number(message.voiceDurationSeconds) || 0
    );
  }
  if (isVideoCallRequestConversationMessage(message)) {
    return buildVideoCallRequestMessageText(
      message.callRequestStatus,
      message.callRequestMessage,
      message.role
    );
  }
  if (isVoiceCallRequestConversationMessage(message)) {
    return buildVoiceCallRequestMessageText(
      message.callRequestStatus,
      message.callRequestMessage,
      message.role
    );
  }
  if (isVideoCallEventConversationMessage(message)) {
    return buildVideoCallEventMessageText(message.callEventKind, {
      durationSeconds: message.callEventDurationSeconds
    });
  }
  if (isVoiceCallEventConversationMessage(message)) {
    return buildVoiceCallEventMessageText(message.callEventKind, {
      durationSeconds: message.callEventDurationSeconds
    });
  }
  if (isQuoteConversationMessage(message)) {
    return buildQuoteMessageText(message.quotedText, message.quotedRole, message.text);
  }
  return String(message?.text || "").trim();
}

function getConversationMessagePreviewText(message) {
  if (isDiscussionShareConversationMessage(message)) {
    return buildDiscussionSharePreviewText(getDiscussionSharePayloadFromMessage(message));
  }
  if (isScheduleInviteConversationMessage(message)) {
    return `🗓️ 日程邀请：${String(message.scheduleInviteTitle || "").trim() || "新的安排"}`;
  }
  if (isLocationConversationMessage(message)) {
    return `📍 ${String(message.locationName || "").trim() || "分享了位置"}`;
  }
  if (isImageConversationMessage(message)) {
    const description = String(message?.imageDescription || "").trim();
    return description ? `🖼️ 照片：${truncate(description, 18)}` : "🖼️ 发送了图片";
  }
  if (isVoiceConversationMessage(message)) {
    const voiceText = String(message?.voiceText || "").trim();
    return voiceText ? `🔊 语音：${truncate(voiceText, 18)}` : "🔊 发送了语音";
  }
  if (isVideoCallRequestConversationMessage(message)) {
    return `📹 视频请求：${getVoiceCallRequestStatusLabel(message?.callRequestStatus)}`;
  }
  if (isVoiceCallRequestConversationMessage(message)) {
    return `📞 语音请求：${getVoiceCallRequestStatusLabel(message?.callRequestStatus)}`;
  }
  if (isVideoCallEventConversationMessage(message)) {
    const kind = normalizeVoiceCallEventKind(message?.callEventKind);
    if (kind === "ended") {
      return `📹 视频已挂断 ${formatVoiceCallDurationLabel(message?.callEventDurationSeconds || 0)}`;
    }
    if (kind === "rejected") {
      return "📹 视频通话已拒绝";
    }
    return "📹 视频通话已接通";
  }
  if (isVoiceCallEventConversationMessage(message)) {
    const kind = normalizeVoiceCallEventKind(message?.callEventKind);
    if (kind === "ended") {
      return `📞 通话已挂断 ${formatVoiceCallDurationLabel(message?.callEventDurationSeconds || 0)}`;
    }
    if (kind === "rejected") {
      return "📞 语音通话已拒绝";
    }
    return "📞 语音通话已接通";
  }
  if (isQuoteConversationMessage(message)) {
    return `↪ ${String(message.text || "").trim()}`;
  }
  return String(message?.text || "").trim();
}

function createSeededRandom(seedText = "") {
  let seed = Number.parseInt(hashText(seedText), 36) || 1;
  return () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
}

function getLocationMapDecor(seedText = "") {
  const random = createSeededRandom(seedText || "location");
  const roads = Array.from({ length: 4 }, (_, index) => ({
    left: 8 + random() * 72,
    top: 12 + random() * 68,
    width: 18 + random() * 18,
    rotate: -32 + random() * 64,
    color: index % 2 === 0 ? "#4ca2ff" : "#3d8be0"
  }));
  const dots = Array.from({ length: 5 }, () => ({
    left: 8 + random() * 80,
    top: 10 + random() * 74,
    size: 6 + random() * 8
  }));
  const blocks = Array.from({ length: 5 }, (_, index) => ({
    left: 10 + random() * 74,
    top: 12 + random() * 70,
    width: 12 + random() * 12,
    height: 10 + random() * 14,
    tone: index % 3
  }));
  const pin = {
    left: 26 + random() * 46,
    top: 18 + random() * 44
  };
  return { roads, dots, blocks, pin };
}

function renderLocationMapMarkup(locationName, coordinates, options = {}) {
  const renderOptions = options && typeof options === "object" ? options : {};
  const hasLocation = Boolean(String(locationName || "").trim());
  const title = hasLocation ? String(locationName || "").trim() : "请输入位置名称";
  const decor = getLocationMapDecor(`${title}_${coordinates}`);
  return `
    <div class="messages-location-map ${renderOptions.compact ? "is-compact" : ""}">
      <div class="messages-location-map__header">
        <span class="messages-location-map__pin-icon">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 19s5-4.3 5-8.4A5 5 0 0 0 7 10.6C7 14.7 12 19 12 19Z" fill="currentColor"></path>
            <circle cx="12" cy="10.4" r="2.1" fill="#ffffff"></circle>
          </svg>
        </span>
        <div class="messages-location-map__meta">
          <strong>${escapeHtml(title)}</strong>
          <small>${escapeHtml(coordinates || "11.451E, 17.1277N")}</small>
        </div>
      </div>
      <div class="messages-location-map__canvas">
        <div class="messages-location-map__grid"></div>
        ${decor.roads
          .map(
            (road) => `
              <span
                class="messages-location-map__road"
                style="left:${road.left.toFixed(2)}%;top:${road.top.toFixed(2)}%;width:${road.width.toFixed(
                  2
                )}%;transform:rotate(${road.rotate.toFixed(2)}deg);background:${road.color};"
              ></span>
            `
          )
          .join("")}
        ${decor.dots
          .map(
            (dot) => `
              <span
                class="messages-location-map__dot"
                style="left:${dot.left.toFixed(2)}%;top:${dot.top.toFixed(2)}%;width:${dot.size.toFixed(
                  2
                )}px;height:${dot.size.toFixed(2)}px;"
              ></span>
            `
          )
          .join("")}
        ${decor.blocks
          .map((block) => {
            const palette = [
              "rgba(255,255,255,0.92)",
              "rgba(246,210,210,0.96)",
              "rgba(214,238,255,0.96)"
            ];
            const borderPalette = ["rgba(188, 194, 209, 0.78)", "rgba(255, 158, 158, 0.82)", "rgba(114, 188, 255, 0.82)"];
            return `
              <span
                class="messages-location-map__block"
                style="left:${block.left.toFixed(2)}%;top:${block.top.toFixed(2)}%;width:${block.width.toFixed(
                  2
                )}%;height:${block.height.toFixed(2)}%;background:${palette[block.tone]};border-color:${
                  borderPalette[block.tone]
                };"
              ></span>
            `;
          })
          .join("")}
        <span
          class="messages-location-map__marker"
          style="left:${decor.pin.left.toFixed(2)}%;top:${decor.pin.top.toFixed(2)}%;"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 22s7-5.8 7-11.3A7 7 0 0 0 5 10.7C5 16.2 12 22 12 22Z" fill="currentColor"></path>
            <circle cx="12" cy="10.7" r="3" fill="#ffffff"></circle>
          </svg>
        </span>
      </div>
    </div>
  `;
}

function formatTimelineTimestamp(value = Date.now()) {
  const date = value instanceof Date ? value : new Date(Number(value) || Date.now());
  const parts = new Intl.DateTimeFormat("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }).formatToParts(date);
  const map = Object.fromEntries(
    parts.filter((part) => part.type !== "literal").map((part) => [part.type, part.value])
  );
  const hour = map.hour === "24" ? "00" : map.hour || "00";
  return `${map.month || "00"}-${map.day || "00"} ${hour}:${map.minute || "00"}`;
}

function resolveStoredTimestampLabel(createdAt, fallback = "") {
  const numeric = Number(createdAt);
  if (Number.isFinite(numeric) && numeric > 0) {
    return formatTimelineTimestamp(numeric);
  }
  return String(fallback || "").trim();
}

function formatConversationElapsedDuration(durationMs = 0) {
  const resolvedDurationMs = Math.max(0, Number(durationMs) || 0);
  const totalMinutes = Math.floor(resolvedDurationMs / 60000);
  if (totalMinutes <= 0) {
    return "不到 1 分钟";
  }
  if (totalMinutes < 60) {
    return `${totalMinutes} 分钟`;
  }

  const totalHours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;
  if (totalHours < 24) {
    if (totalHours < 6 && remainingMinutes > 0) {
      return `${totalHours} 小时 ${remainingMinutes} 分钟`;
    }
    return `${totalHours} 小时`;
  }

  const totalDays = Math.floor(totalHours / 24);
  const remainingHours = totalHours % 24;
  if (totalDays < 7 && remainingHours > 0) {
    return `${totalDays} 天 ${remainingHours} 小时`;
  }
  return `${totalDays} 天`;
}

function isOvernightHourScheduleEntry(entry) {
  return (
    String(entry?.scheduleType || "").trim() === "hour" &&
    parseTimeToMinutes(entry?.endTime || "") < parseTimeToMinutes(entry?.startTime || "")
  );
}

function resolveScheduleOccurrenceRange(
  entry,
  baseDateText = "",
  options = {}
) {
  const resolvedEntry = entry && typeof entry === "object" ? entry : null;
  const resolvedDateText = String(baseDateText || resolvedEntry?.date || "").trim();
  const resolvedOptions = options && typeof options === "object" ? options : {};
  if (!resolvedEntry || !resolvedDateText) {
    return null;
  }

  if (resolvedEntry.scheduleType === "day") {
    const start = startOfLocalDay(resolvedDateText);
    const end = endOfLocalDay(resolvedDateText);
    return start && end ? { start, end } : null;
  }

  const start = parseLocalDateTimeValue(
    resolvedDateText,
    resolvedEntry.startTime || "09:00"
  );
  const end = parseLocalDateTimeValue(
    resolvedDateText,
    resolvedEntry.endTime || "10:00"
  );
  if (!start || !end) {
    return null;
  }

  if (resolvedEntry.scheduleType === "hour" && parseTimeToMinutes(resolvedEntry.endTime) < parseTimeToMinutes(resolvedEntry.startTime)) {
    end.setDate(end.getDate() + 1);
  } else if (end <= start && resolvedOptions.allowSameTimeFallback !== false) {
    end.setTime(start.getTime() + 60 * 60 * 1000);
  }

  return { start, end };
}

function resolvePromptAdjustedTimestamp(timestamp = 0, settings = loadSettings()) {
  const resolvedTimestamp = Number(timestamp) || 0;
  if (!(resolvedTimestamp > 0)) {
    return 0;
  }
  const promptNow = getPromptNow(settings);
  const manualTimeSettings =
    typeof window.PulsePromptConfig?.normalizeManualTimeSettings === "function"
      ? window.PulsePromptConfig.normalizeManualTimeSettings(
          settings?.manualTimeSettings,
          promptNow
        )
      : null;
  const promptOffsetMs = Boolean(manualTimeSettings?.enabled)
    ? Number(manualTimeSettings?.offsetMs) || 0
    : 0;
  return resolvedTimestamp + promptOffsetMs;
}

function buildContinuationRequestUserMessage(conversation, settings = loadSettings()) {
  const messages = Array.isArray(conversation?.messages) ? conversation.messages : [];
  const lastAssistantMessage = [...messages]
    .reverse()
    .find((message) => message?.role === "assistant");
  const lastAssistantCreatedAt = Number(lastAssistantMessage?.createdAt) || 0;
  let elapsedDurationLabel = "刚刚";
  let waitingMoodGuidance =
    getPromptRuleItemText(
      "chat_continuation_request",
      "output_standard",
      "wait_short_guidance",
      settings
    ) || "这不是同一秒里的连发，延续刚才的话题时自然一点就好。";

  if (Number.isFinite(lastAssistantCreatedAt) && lastAssistantCreatedAt > 0) {
    const promptNow = getPromptNow(settings);
    const promptLastAssistantTimestamp = resolvePromptAdjustedTimestamp(
      lastAssistantCreatedAt,
      settings
    );
    const elapsedDurationMs = promptNow.getTime() - promptLastAssistantTimestamp;
    elapsedDurationLabel = formatConversationElapsedDuration(elapsedDurationMs);
    const totalMinutes = Math.max(0, Math.floor(elapsedDurationMs / 60000));
    if (totalMinutes >= 24 * 60) {
      waitingMoodGuidance =
        getPromptRuleItemText(
          "chat_continuation_request",
          "output_standard",
          "wait_very_long_guidance",
          settings
        ) || "开口要像隔了很久后又想起对方，轻一点、缓一点。";
    } else if (totalMinutes >= 120) {
      waitingMoodGuidance =
        getPromptRuleItemText(
          "chat_continuation_request",
          "output_standard",
          "wait_long_guidance",
          settings
        ) || "开口要像等了一阵后又补一句，更克制、更试探一点。";
    } else if (totalMinutes >= 30) {
      waitingMoodGuidance =
        getPromptRuleItemText(
          "chat_continuation_request",
          "output_standard",
          "wait_medium_guidance",
          settings
        ) || "开口要像隔了一会儿后重新接话，别写成紧贴上一条的连发。";
    }
  }

  return [
    getPromptRuleItemText(
      "chat_continuation_request",
      "persona_alignment",
      "request_intro",
      settings
    ) || "这是一次主动续写，不是新的提问。请沿着刚才的聊天氛围自然补几句新消息，不要重复上一条。",
    getPromptRuleItemText(
      "chat_continuation_request",
      "current_state_awareness",
      "timing_line",
      settings,
      {
        elapsedDurationLabel,
        waitingMoodGuidance
      }
    ) ||
      `距离你上一次开口大约已经过了 ${elapsedDurationLabel}。${waitingMoodGuidance} 这种等待感只体现在语气变化里，不要直接说出时长；这次必须先给出可发送正文，没有自然的状态变化就不要输出 presence_update。`
  ].join("\n");
}

function replacePromptTemplateVariables(template = "", variables = {}) {
  const resolvedTemplate = String(template || "").trim();
  if (!resolvedTemplate) {
    return "";
  }
  return resolvedTemplate.replace(/\{([a-zA-Z0-9_]+)\}/g, (_match, key) => {
    const value = Object.prototype.hasOwnProperty.call(variables, key) ? variables[key] : "";
    return String(value ?? "").trim();
  });
}

function normalizeProactiveTriggerRequest(trigger = null) {
  const source = trigger && typeof trigger === "object" ? trigger : null;
  const triggerId = String(source?.triggerId || source?.id || "").trim();
  const scheduleEventId = String(source?.scheduleEventId || "").trim();
  if (!triggerId || !scheduleEventId) {
    return null;
  }
  const scheduleDurationMinutes = Math.max(0, Number(source.scheduleDurationMinutes) || 0);
  const idleGapMs = Math.max(0, Number(source.idleGapMs) || 0);
  const finishedAgoMs = Math.max(0, Number(source.finishedAgoMs) || 0);
  return {
    triggerId,
    triggerType: String(source?.triggerType || "").trim(),
    scheduleEventId,
    scheduleTitle: String(source?.scheduleTitle || "").trim() || "这段行程",
    scheduleDurationMinutes,
    scheduleDurationText:
      String(source?.scheduleDurationText || "").trim() ||
      formatConversationElapsedDuration(scheduleDurationMinutes * 60 * 1000),
    idleGapMs,
    idleGapText:
      String(source?.idleGapText || "").trim() ||
      formatConversationElapsedDuration(idleGapMs),
    finishedAgoMs,
    finishedAgoText:
      String(source?.finishedAgoText || "").trim() ||
      formatConversationElapsedDuration(finishedAgoMs),
    promptTemplate: String(source?.promptTemplate || "").trim(),
    toneByIdleGap:
      source?.toneByIdleGap && typeof source.toneByIdleGap === "object"
        ? { ...source.toneByIdleGap }
        : {},
    reasonSummary: String(source?.reasonSummary || "").trim()
  };
}

function buildProactiveTriggerIdleToneGuidance(proactiveTrigger = null) {
  const normalizedTrigger = normalizeProactiveTriggerRequest(proactiveTrigger);
  const toneByIdleGap =
    normalizedTrigger?.toneByIdleGap && typeof normalizedTrigger.toneByIdleGap === "object"
      ? normalizedTrigger.toneByIdleGap
      : {};
  const idleHours = normalizedTrigger ? normalizedTrigger.idleGapMs / (60 * 60 * 1000) : 0;
  if (idleHours > 24 && String(toneByIdleGap.after24Hours || "").trim()) {
    return String(toneByIdleGap.after24Hours || "").trim();
  }
  if (idleHours > 6 && String(toneByIdleGap.within24Hours || "").trim()) {
    return String(toneByIdleGap.within24Hours || "").trim();
  }
  return String(
    toneByIdleGap.within6Hours || toneByIdleGap.within24Hours || toneByIdleGap.after24Hours || ""
  ).trim();
}

function buildProactiveTriggerRequestUserMessage(
  proactiveTrigger = null,
  conversation = null,
  settings = loadSettings()
) {
  const normalizedTrigger = normalizeProactiveTriggerRequest(proactiveTrigger);
  if (!normalizedTrigger) {
    return "";
  }

  const resolvedConversation = conversation && typeof conversation === "object" ? conversation : null;
  const messages = Array.isArray(resolvedConversation?.messages) ? resolvedConversation.messages : [];
  const lastMessage = messages[messages.length - 1] || null;
  const latestConversationTimestamp = resolvePromptAdjustedTimestamp(
    lastMessage?.createdAt || resolvedConversation?.updatedAt || 0,
    settings
  );
  const promptNow = getPromptNow(settings);
  const idleGapText =
    normalizedTrigger.idleGapMs > 0
      ? normalizedTrigger.idleGapText
      : latestConversationTimestamp > 0
        ? formatConversationElapsedDuration(promptNow.getTime() - latestConversationTimestamp)
        : "一阵子";
  const idleToneGuidance = buildProactiveTriggerIdleToneGuidance({
    ...normalizedTrigger,
    idleGapText
  });
  const promptTemplate =
    normalizedTrigger.promptTemplate ||
    [
      "这不是对用户上一条消息的回复，而是你主动发起的一轮新对话。",
      "你知道用户刚结束了一段持续 {schedule_duration_text} 的行程「{schedule_title}」，这只是促使你主动开口的内部动机。",
      "距离你们上次自然聊天已经过去了 {idle_gap_text}。",
      "请结合最近聊天氛围、你自己的角色设定和此刻态度，自然地主动发来一条消息。",
      "不要把它写成日程提醒，也不要直白说你监测到用户刚结束行程。"
    ].join("\n");
  const resolvedMessage = replacePromptTemplateVariables(promptTemplate, {
    schedule_title: normalizedTrigger.scheduleTitle,
    schedule_duration_text: normalizedTrigger.scheduleDurationText,
    idle_gap_text: idleGapText,
    finished_ago_text: normalizedTrigger.finishedAgoText
  });

  return [
    resolvedMessage,
    idleToneGuidance ? `语气补充：${idleToneGuidance}` : "",
    "这次必须先直接输出可发送的聊天正文；不要写旁白、系统解释或触发原因。",
    "如果没有特别自然的状态变化，就不要输出 presence_update。"
  ]
    .filter(Boolean)
    .join("\n");
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("图片读取失败"));
    reader.readAsDataURL(file);
  });
}

function parseDataUrlParts(dataUrl) {
  const source = String(dataUrl || "").trim();
  const matched = source.match(/^data:([^;]+);base64,(.+)$/);
  if (!matched) {
    return null;
  }
  return {
    mimeType: matched[1] || "image/jpeg",
    data: matched[2] || ""
  };
}

function buildOpenAICompatibleContent(prompt, images = []) {
  const normalizedImages = Array.isArray(images)
    ? images.map((item) => String(item || "").trim()).filter(Boolean)
    : [];
  if (!normalizedImages.length) {
    return prompt;
  }
  return [
    { type: "text", text: prompt },
    ...normalizedImages.map((image) => ({
      type: "image_url",
      image_url: { url: image }
    }))
  ];
}

function buildGeminiParts(prompt, images = []) {
  const normalizedImages = Array.isArray(images)
    ? images.map((item) => String(item || "").trim()).filter(Boolean)
    : [];
  const parts = [{ text: prompt }];
  normalizedImages.forEach((image) => {
    const parsed = parseDataUrlParts(image);
    if (!parsed) {
      return;
    }
    parts.push({
      inlineData: {
        mimeType: parsed.mimeType,
        data: parsed.data
      }
    });
  });
  return parts;
}

function normalizeAwarenessSensitivity(value = "") {
  const normalized = String(value || "").trim().toLowerCase();
  if (
    normalized === "extremely_weak" ||
    normalized === "weak" ||
    normalized === "medium" ||
    normalized === "strong" ||
    normalized === "extremely_strong"
  ) {
    return normalized;
  }
  return "medium";
}

function getAwarenessSensitivityLabel(value = "") {
  const normalized = normalizeAwarenessSensitivity(value);
  const labels = {
    extremely_weak: "极弱",
    weak: "弱",
    medium: "中",
    strong: "强",
    extremely_strong: "极强"
  };
  return labels[normalized] || "中";
}

function getAwarenessSensitivityProbability(value = "") {
  const normalized = normalizeAwarenessSensitivity(value);
  const probability = Number(
    window.PulseAwarenessConfig?.sensitivityProbabilities?.[normalized]
  );
  if (Number.isFinite(probability)) {
    return clampNumber(probability, 0, 1);
  }
  return 0;
}

function readAvatarAsDataUrl(file, options = {}) {
  const avatarOptions = options && typeof options === "object" ? options : {};
  const maxSide = Math.max(avatarOptions.maxSide || 420, 180);
  const quality = Math.min(0.88, Math.max(0.42, Number(avatarOptions.quality) || 0.72));
  if (!file || !String(file.type || "").startsWith("image/")) {
    return readFileAsDataUrl(file);
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.onload = () => {
        const longestSide = Math.max(image.width || 0, image.height || 0) || maxSide;
        const scale = Math.min(1, maxSide / longestSide);
        const width = Math.max(1, Math.round((image.width || maxSide) * scale));
        const height = Math.max(1, Math.round((image.height || maxSide) * scale));
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext("2d");
        if (!context) {
          resolve(String(reader.result || ""));
          return;
        }
        context.clearRect(0, 0, width, height);
        context.drawImage(image, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      image.onerror = () => resolve(String(reader.result || ""));
      image.src = String(reader.result || "");
    };
    reader.onerror = () => reject(new Error("图片读取失败"));
    reader.readAsDataURL(file);
  });
}

function readImageFromDataUrl(dataUrl) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("图片读取失败"));
    image.src = String(dataUrl || "");
  });
}

async function recompressAvatarDataUrl(dataUrl, options = {}) {
  const source = String(dataUrl || "").trim();
  if (!source) {
    return "";
  }
  if (!/^data:image\//i.test(source)) {
    return source;
  }

  const avatarOptions = options && typeof options === "object" ? options : {};
  const maxSide = Math.max(avatarOptions.maxSide || 240, 96);
  const quality = Math.min(0.9, Math.max(0.36, Number(avatarOptions.quality) || 0.62));
  const image = await readImageFromDataUrl(source);
  const longestSide = Math.max(image.width || 0, image.height || 0) || maxSide;
  const scale = Math.min(1, maxSide / longestSide);
  const width = Math.max(1, Math.round((image.width || maxSide) * scale));
  const height = Math.max(1, Math.round((image.height || maxSide) * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) {
    return source;
  }
  context.clearRect(0, 0, width, height);
  context.drawImage(image, 0, 0, width, height);
  return canvas.toDataURL("image/jpeg", quality);
}

const AVATAR_PERSIST_RETRY_STEPS = [
  { maxSide: 220, quality: 0.68 },
  { maxSide: 180, quality: 0.58 },
  { maxSide: 144, quality: 0.5 },
  { maxSide: 120, quality: 0.42 }
];

async function persistProfileWithAvatarFallback(profile) {
  const nextProfile = profile && typeof profile === "object" ? { ...profile } : { ...DEFAULT_PROFILE };
  if (persistProfile(nextProfile)) {
    return { persisted: true, compressed: false, profile: nextProfile };
  }

  const originalAvatar = String(nextProfile.avatarImage || "").trim();
  if (!originalAvatar) {
    return { persisted: false, compressed: false, profile: nextProfile };
  }

  for (const step of AVATAR_PERSIST_RETRY_STEPS) {
    const compressedAvatar = await recompressAvatarDataUrl(originalAvatar, step);
    if (!compressedAvatar || compressedAvatar === nextProfile.avatarImage) {
      continue;
    }
    nextProfile.avatarImage = compressedAvatar;
    if (persistProfile(nextProfile)) {
      return { persisted: true, compressed: true, profile: nextProfile };
    }
  }

  return {
    persisted: false,
    compressed: String(nextProfile.avatarImage || "").trim() !== originalAvatar,
    profile: nextProfile
  };
}

async function persistContactsWithAvatarFallback(contactId = "") {
  if (persistContacts()) {
    return { persisted: true, compressed: false };
  }

  const normalizedContactId = String(contactId || "").trim();
  const targetIndex = state.contacts.findIndex((item) => item.id === normalizedContactId);
  if (targetIndex < 0) {
    return { persisted: false, compressed: false };
  }
  const originalAvatar = String(state.contacts[targetIndex]?.avatarImage || "").trim();
  if (!originalAvatar) {
    return { persisted: false, compressed: false };
  }

  for (const step of AVATAR_PERSIST_RETRY_STEPS) {
    const compressedAvatar = await recompressAvatarDataUrl(originalAvatar, step);
    if (!compressedAvatar || compressedAvatar === state.contacts[targetIndex].avatarImage) {
      continue;
    }
    state.contacts[targetIndex] = normalizeContact({
      ...state.contacts[targetIndex],
      avatarImage: compressedAvatar,
      updatedAt: Date.now()
    }, targetIndex);
    if (state.contactEditorId === normalizedContactId) {
      state.contactEditorAvatarImage = compressedAvatar;
    }
    if (persistContacts()) {
      return { persisted: true, compressed: true };
    }
  }

  return {
    persisted: false,
    compressed: String(state.contacts[targetIndex]?.avatarImage || "").trim() !== originalAvatar
  };
}

function normalizePositiveInteger(value, fallback) {
  const parsed = Number.parseInt(value, 10);
  if (Number.isFinite(parsed) && parsed > 0) {
    return parsed;
  }
  return fallback;
}

function clampNumber(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function normalizeObjectArray(value) {
  return Array.isArray(value) ? value.filter((item) => item && typeof item === "object") : [];
}

function normalizeNegativePromptConstraints(value) {
  const lines = Array.isArray(value)
    ? value
    : typeof value === "string"
      ? value.split(/\r?\n/g)
      : [];
  const unique = new Set();
  return lines
    .map((item) => String(item || "").trim())
    .filter((item) => {
      if (!item || unique.has(item)) {
        return false;
      }
      unique.add(item);
      return true;
    });
}

function buildNegativePromptConstraintBlock(settings = loadSettings()) {
  const items = normalizeNegativePromptConstraints(settings?.negativePromptConstraints || []);
  if (!items.length) {
    return "";
  }
  return [
    "<negative_constraints>",
    "负向约束词汇和表达：",
    ...items.map((item, index) => `${index + 1}. ${item}`),
    "以上内容是需要明确避免的词汇、句式、口头禅、例句或表达方式。即使语义相近，也尽量不要沿用这些写法；若必须表达相似意思，请换一种更自然的新说法。",
    "</negative_constraints>"
  ].join("\n");
}

function prependGlobalPromptGuard(text, settings = loadSettings()) {
  return [buildNegativePromptConstraintBlock(settings), String(text || "").trim()]
    .filter(Boolean)
    .join("\n\n")
    .trim();
}

function buildPromptSectionText(value, fallback = "") {
  const text = (Array.isArray(value) ? value : [value])
    .flatMap((item) => (Array.isArray(item) ? item : [item]))
    .map((item) => String(item || "").trim())
    .filter(Boolean)
    .join("\n\n")
    .trim();
  return text || String(fallback || "").trim();
}

function interpolatePromptTemplateText(template = "", variables = {}) {
  return String(template || "").replace(/\{\{([a-zA-Z0-9_]+)\}\}/g, (_match, key) => {
    return Object.prototype.hasOwnProperty.call(variables || {}, key)
      ? String(variables[key] ?? "")
      : "";
  });
}

function getPromptRuleItemText(
  promptType = "",
  sectionKey = "",
  itemId = "",
  settings = loadSettings(),
  variables = {}
) {
  if (typeof window.PulsePromptConfig?.buildEditorModel !== "function") {
    return "";
  }
  const model = window.PulsePromptConfig.buildEditorModel(promptType, settings);
  const resolvedSectionKey = String(sectionKey || "").trim();
  const resolvedItemId = String(itemId || "").trim();
  const section = Array.isArray(model?.sections)
    ? model.sections.find((item) => String(item?.key || "").trim() === resolvedSectionKey)
    : null;
  const targetItem = Array.isArray(section?.items)
    ? section.items.find((item) => String(item?.id || "").trim() === resolvedItemId)
    : null;
  if (!targetItem) {
    return "";
  }
  return interpolatePromptTemplateText(String(targetItem.text || ""), variables).trim();
}

function buildStructuredPromptSections(promptTypeOrSections = {}, maybeSections = null, maybeOptions = {}) {
  if (typeof promptTypeOrSections === "string" && window.PulsePromptConfig?.buildPrompt) {
    const configuredPrompt = window.PulsePromptConfig.buildPrompt(
      promptTypeOrSections,
      maybeSections && typeof maybeSections === "object" ? maybeSections : {},
      maybeOptions && typeof maybeOptions === "object" ? maybeOptions : {}
    );
    if (configuredPrompt) {
      return prependGlobalPromptGuard(
        configuredPrompt,
        maybeOptions && typeof maybeOptions === "object" ? maybeOptions.settings : undefined
      );
    }
  }
  const resolvedSections =
    promptTypeOrSections && typeof promptTypeOrSections === "object"
      ? promptTypeOrSections
      : maybeSections && typeof maybeSections === "object"
        ? maybeSections
        : {};
  const defaultSectionOrder = Array.isArray(window.PulsePromptConfig?.SECTION_KEYS)
    ? window.PulsePromptConfig.SECTION_KEYS
    : ["context_library", "persona_alignment", "current_state_awareness", "output_standard"];
  const fallbackSections = {
    context_library:
      window.PulsePromptConfig?.SECTION_FALLBACKS?.context_library || "暂无额外背景信息。",
    persona_alignment:
      window.PulsePromptConfig?.SECTION_FALLBACKS?.persona_alignment || "按当前已知身份、关系与语境自然回应。",
    current_state_awareness:
      window.PulsePromptConfig?.SECTION_FALLBACKS?.current_state_awareness || "暂无额外状态感知。",
    output_standard:
      window.PulsePromptConfig?.SECTION_FALLBACKS?.output_standard || "只输出符合要求的最终结果。"
  };
  const sectionValueMap = {
    context_library: resolvedSections.context_library || resolvedSections.contextLibrary,
    persona_alignment: resolvedSections.persona_alignment || resolvedSections.personaAlignment,
    current_state_awareness:
      resolvedSections.current_state_awareness || resolvedSections.currentStateAwareness,
    output_standard: resolvedSections.output_standard || resolvedSections.outputStandard
  };
  return prependGlobalPromptGuard(
    defaultSectionOrder
      .map((sectionKey) => {
        return `<${sectionKey}>\n${buildPromptSectionText(
          sectionValueMap[sectionKey],
          fallbackSections[sectionKey]
        )}\n</${sectionKey}>`;
      })
      .join("\n\n"),
    maybeOptions && typeof maybeOptions === "object" ? maybeOptions.settings : undefined
  );
}

function appendApiLog(entry) {
  try {
    window.PulseApiLog?.append?.(entry);
  } catch (_error) {
  }
}

function normalizePrivacyAllowlist(value) {
  if (window.PulsePrivacyCover?.normalizeAllowlist) {
    return window.PulsePrivacyCover.normalizeAllowlist(value);
  }
  const lines = Array.isArray(value)
    ? value
    : typeof value === "string"
      ? value.split(/\r?\n/g)
      : [];
  const unique = new Set();
  return lines
    .map((item) => String(item || "").trim())
    .filter((item) => {
      if (!item || unique.has(item)) {
        return false;
      }
      unique.add(item);
      return true;
    });
}

function createPrivacySession(options = {}) {
  return window.PulsePrivacyCover?.createSession?.(options) || null;
}

function preparePromptWithPrivacy(value, session) {
  if (!session || !window.PulsePrivacyCover?.preparePrompt) {
    return String(value || "");
  }
  return window.PulsePrivacyCover.preparePrompt(value, session);
}

function encodeTextWithPrivacy(value, session) {
  if (!session || !window.PulsePrivacyCover?.encodeText) {
    return String(value || "");
  }
  return window.PulsePrivacyCover.encodeText(value, session);
}

function encodeValueWithPrivacy(value, session) {
  if (!session || !window.PulsePrivacyCover?.encodeValue) {
    return value;
  }
  return window.PulsePrivacyCover.encodeValue(value, session);
}

function decodeTextWithPrivacy(value, session) {
  if (!session || !window.PulsePrivacyCover?.decodeText) {
    return String(value || "");
  }
  return window.PulsePrivacyCover.decodeText(value, session);
}

function decodeValueWithPrivacy(value, session) {
  if (!session || !window.PulsePrivacyCover?.decodeValue) {
    return value;
  }
  return window.PulsePrivacyCover.decodeValue(value, session);
}

function applyPrivacyToLogEntry(entry, session) {
  if (!session || !window.PulsePrivacyCover?.applyPrivacyToLogEntry) {
    return entry;
  }
  return window.PulsePrivacyCover.applyPrivacyToLogEntry(entry, session);
}

function buildMessageApiLogBase(action, settings, endpoint, prompt, requestBody, summary = "") {
  const mode = normalizeApiMode(settings.mode);
  return {
    source: "messages",
    action,
    summary,
    endpoint,
    mode,
    model: mode === "generic" ? "" : settings.model || getDefaultModelByMode(mode),
    prompt,
    requestBody
  };
}

function normalizeMessagePromptSettings(source = {}) {
  const resolved = source && typeof source === "object" ? source : {};
  const legacyEventAwareness = Boolean(resolved.eventAwareness);
  const sceneMode = String(resolved.sceneMode || "").trim().toLowerCase() === "offline"
    ? "offline"
    : "online";
  return {
    historyRounds: clampNumber(
      normalizePositiveInteger(resolved.historyRounds, DEFAULT_MESSAGE_HISTORY_ROUNDS),
      1,
      MAX_MESSAGE_HISTORY_ROUNDS
    ),
    replySentenceLimit: clampNumber(
      normalizePositiveInteger(
        resolved.replySentenceLimit,
        DEFAULT_MESSAGE_REPLY_SENTENCE_LIMIT
      ),
      1,
      MAX_MESSAGE_REPLY_SENTENCE_LIMIT
    ),
    journalLength: clampNumber(
      normalizePositiveInteger(resolved.journalLength, DEFAULT_MESSAGE_JOURNAL_LENGTH),
      80,
      MAX_MESSAGE_JOURNAL_LENGTH
    ),
    awarenessIntervalRounds: clampNumber(
      normalizePositiveInteger(
        resolved.awarenessIntervalRounds,
        DEFAULT_MESSAGE_AWARENESS_INTERVAL_ROUNDS
      ),
      1,
      MAX_MESSAGE_AWARENESS_INTERVAL_ROUNDS
    ),
    memorySummaryIntervalRounds: clampNumber(
      normalizePositiveInteger(
        resolved.memorySummaryIntervalRounds,
        DEFAULT_MEMORY_SUMMARY_INTERVAL_ROUNDS
      ),
      1,
      MAX_MEMORY_SUMMARY_INTERVAL_ROUNDS
    ),
    coreMemoryThreshold: clampNumber(
      normalizePositiveInteger(resolved.coreMemoryThreshold, DEFAULT_CORE_MEMORY_THRESHOLD),
      1,
      100
    ),
    sceneMemoryThreshold: clampNumber(
      normalizePositiveInteger(resolved.sceneMemoryThreshold, DEFAULT_SCENE_MEMORY_THRESHOLD),
      1,
      100
    ),
    timeAwareness:
      typeof resolved.timeAwareness === "boolean"
        ? resolved.timeAwareness
        : legacyEventAwareness,
    scheduleAwarenessWindowMinutes: clampNumber(
      normalizePositiveInteger(
        resolved.scheduleAwarenessWindowMinutes,
        DEFAULT_SCHEDULE_AWARENESS_WINDOW_MINUTES
      ),
      1,
      MAX_SCHEDULE_AWARENESS_WINDOW_MINUTES
    ),
    hotTopicsEnabled: Boolean(resolved.hotTopicsEnabled),
    hotTopicsTabId: String(resolved.hotTopicsTabId || "").trim(),
    hotTopicsIncludeDiscussionText:
      typeof resolved.hotTopicsIncludeDiscussionText === "boolean"
        ? resolved.hotTopicsIncludeDiscussionText
        : true,
    hotTopicsIncludeHotTopic: Boolean(resolved.hotTopicsIncludeHotTopic),
    worldbookEnabled: Boolean(resolved.worldbookEnabled),
    worldbookIds: Array.isArray(resolved.worldbookIds)
      ? [...new Set(resolved.worldbookIds.map((item) => String(item || "").trim()).filter(Boolean))]
      : [],
    forumPostFocusEnabled: Boolean(resolved.forumPostFocusEnabled),
    bubbleFocusEnabled: Boolean(resolved.bubbleFocusEnabled),
    bubbleFocusMinutes: normalizeContextFocusMinutes(resolved.bubbleFocusMinutes),
    sceneMode,
    showContactAvatar:
      typeof resolved.showContactAvatar === "boolean" ? resolved.showContactAvatar : true,
    showUserAvatar: typeof resolved.showUserAvatar === "boolean" ? resolved.showUserAvatar : true
  };
}

function buildConversationPromptSettingsBase(globalPromptSettings = loadSettings().messagePromptSettings) {
  const defaults = normalizeMessagePromptSettings(DEFAULT_SETTINGS.messagePromptSettings);
  const globalSettings = normalizeMessagePromptSettings(globalPromptSettings);
  return normalizeMessagePromptSettings({
    ...defaults,
    journalLength: globalSettings.journalLength,
    memorySummaryIntervalRounds: globalSettings.memorySummaryIntervalRounds,
    coreMemoryThreshold: globalSettings.coreMemoryThreshold,
    sceneMemoryThreshold: globalSettings.sceneMemoryThreshold
  });
}

function applyGlobalMemoryPromptSettings(
  promptSettings = {},
  globalPromptSettings = loadSettings().messagePromptSettings
) {
  const source = promptSettings && typeof promptSettings === "object" ? promptSettings : {};
  const globalSettings = normalizeMessagePromptSettings(globalPromptSettings);
  return {
    ...source,
    memorySummaryIntervalRounds: globalSettings.memorySummaryIntervalRounds,
    coreMemoryThreshold: globalSettings.coreMemoryThreshold,
    sceneMemoryThreshold: globalSettings.sceneMemoryThreshold
  };
}

function normalizeConversationPromptSettings(
  source = null,
  globalPromptSettings = loadSettings().messagePromptSettings
) {
  if (!source || typeof source !== "object") {
    return null;
  }
  return normalizeMessagePromptSettings(
    applyGlobalMemoryPromptSettings(
      {
        ...buildConversationPromptSettingsBase(globalPromptSettings),
        ...source
      },
      globalPromptSettings
    )
  );
}

function getConversationPromptSettings(
  conversation = getConversationById(),
  globalPromptSettings = loadSettings().messagePromptSettings
) {
  return (
    normalizeConversationPromptSettings(conversation?.promptSettings, globalPromptSettings) ||
    buildConversationPromptSettingsBase(globalPromptSettings)
  );
}

function syncActiveConversationPromptSettings(conversation = getConversationById()) {
  state.chatPromptSettings = getConversationPromptSettings(conversation);
  return state.chatPromptSettings;
}

function setConversationPromptSettings(promptSettings = {}, conversation = getConversationById()) {
  if (!conversation) {
    return null;
  }
  const globalPromptSettings = loadSettings().messagePromptSettings;
  const nextPromptSettings =
    normalizeConversationPromptSettings(
      {
        ...getConversationPromptSettings(conversation, globalPromptSettings),
        ...(promptSettings && typeof promptSettings === "object" ? promptSettings : {})
      },
      globalPromptSettings
    ) || buildConversationPromptSettingsBase(globalPromptSettings);
  conversation.promptSettings = nextPromptSettings;
  state.chatPromptSettings = nextPromptSettings;
  persistConversations();
  return nextPromptSettings;
}

function syncConversationMemoryPromptSettingsWithGlobal(
  globalPromptSettings = loadSettings().messagePromptSettings
) {
  const resolvedGlobalPromptSettings = normalizeMessagePromptSettings(globalPromptSettings);
  normalizeObjectArray(state.conversations).forEach((conversation) => {
    if (!conversation || typeof conversation !== "object") {
      return;
    }
    conversation.promptSettings =
      normalizeConversationPromptSettings(
        conversation.promptSettings && typeof conversation.promptSettings === "object"
          ? conversation.promptSettings
          : {},
        resolvedGlobalPromptSettings
      ) || buildConversationPromptSettingsBase(resolvedGlobalPromptSettings);
  });
}

function getDefaultConversationMemorySummaryIntervalRounds(promptSettings = loadSettings().messagePromptSettings) {
  return clampNumber(
    normalizePositiveInteger(
      normalizeMessagePromptSettings(promptSettings).memorySummaryIntervalRounds,
      DEFAULT_MEMORY_SUMMARY_INTERVAL_ROUNDS
    ),
    1,
    MAX_MEMORY_SUMMARY_INTERVAL_ROUNDS
  );
}

function resolveConversationMemorySummaryIntervalRounds(
  conversation,
  promptSettings = loadSettings().messagePromptSettings
) {
  return clampNumber(
    normalizePositiveInteger(
      normalizeMessagePromptSettings(promptSettings).memorySummaryIntervalRounds,
      getDefaultConversationMemorySummaryIntervalRounds(promptSettings)
    ),
    1,
    MAX_MEMORY_SUMMARY_INTERVAL_ROUNDS
  );
}

function normalizeAutoScheduleDays(value, fallback = DEFAULT_AUTO_SCHEDULE_DAYS) {
  return clampNumber(
    normalizePositiveInteger(value, fallback),
    1,
    MAX_AUTO_SCHEDULE_DAYS
  );
}

function normalizeAutoScheduleTime(value = "") {
  const trimmed = String(value || "").trim();
  return /^\d{2}:\d{2}$/.test(trimmed) ? trimmed : "";
}

function normalizeAwarenessResolvedState(value = "", legacyConsumed = false) {
  const resolved = String(value || "").trim().toLowerCase();
  if (resolved === "triggered" || resolved === "expired") {
    return resolved;
  }
  return legacyConsumed ? "triggered" : "";
}

function resolveAwarenessTitle(title = "", awarenessText = "") {
  const resolvedTitle = String(title || "").trim();
  if (resolvedTitle) {
    return resolvedTitle.slice(0, 40);
  }
  const fallbackText = String(awarenessText || "").trim().replace(/\s+/g, " ");
  if (!fallbackText) {
    return "未命名察觉";
  }
  return truncate(fallbackText, 20);
}

function normalizeAwarenessHistory(items = []) {
  return normalizeObjectArray(items)
    .map((item, index) => ({
      id: String(item.id || `awareness_history_${index}_${Date.now()}`).trim(),
      title: resolveAwarenessTitle(item.title || item.awarenessTitle, ""),
      checkedAt: Number(item.checkedAt) || Date.now(),
      triggered: Boolean(item.triggered),
      roundCount: Math.max(0, Number.parseInt(String(item.roundCount || 0), 10) || 0),
      note: String(item.note || "").trim()
    }))
    .sort((left, right) => (right.checkedAt || 0) - (left.checkedAt || 0))
    .slice(0, MAX_AWARENESS_HISTORY_ITEMS);
}

function buildAwarenessHistoryItem(triggered = false, roundCount = 0, note = "", title = "") {
  return {
    id: `awareness_history_${Date.now()}_${hashText(`${triggered}_${roundCount}_${note}_${title}`)}`,
    title: resolveAwarenessTitle(title, note),
    checkedAt: Date.now(),
    triggered: Boolean(triggered),
    roundCount: Math.max(0, Number.parseInt(String(roundCount || 0), 10) || 0),
    note: String(note || "").trim()
  };
}

function normalizeManualAwarenessTrigger(value = null) {
  const source = value && typeof value === "object" ? value : null;
  if (!source) {
    return null;
  }
  const text = String(source.text || source.awarenessText || "").trim();
  if (!text) {
    return null;
  }
  return {
    title: resolveAwarenessTitle(source.title || source.awarenessTitle, text),
    text,
    emotionShift: String(source.emotionShift || source.awarenessEmotionShift || "").trim(),
    sensitivity: normalizeAwarenessSensitivity(source.sensitivity || source.awarenessSensitivity),
    createdAt: Number(source.createdAt) || Date.now()
  };
}

function appendAwarenessHistory(contact = {}, entry = {}) {
  const history = normalizeAwarenessHistory(contact?.awarenessHistory || []);
  return normalizeAwarenessHistory([entry, ...history]);
}

function hasConfiguredAwareness(contact = null) {
  return Boolean(String(contact?.awarenessText || "").trim());
}

function canAwarenessStillTrigger(contact = null) {
  const resolvedState = normalizeAwarenessResolvedState(
    contact?.awarenessResolvedState,
    contact?.awarenessConsumed
  );
  return hasConfiguredAwareness(contact) && resolvedState !== "triggered" && resolvedState !== "expired";
}

function normalizeReplyTask(task, index = 0) {
  const source = task && typeof task === "object" ? task : {};
  const status = ["pending", "processing", "error"].includes(String(source.status || "").trim())
    ? String(source.status || "").trim()
    : "pending";
  return {
    id: String(source.id || `reply_task_${Date.now()}_${index}`),
    conversationId: String(source.conversationId || "").trim(),
    regenerate: Boolean(source.regenerate),
    regenerateInstruction: String(source.regenerateInstruction || "").trim(),
    awarenessImmediateTrigger: Boolean(source.awarenessImmediateTrigger),
    triggeredAwareness: normalizeManualAwarenessTrigger(source.triggeredAwareness),
    status,
    errorMessage: String(source.errorMessage || "").trim(),
    startedAt: Number(source.startedAt) || 0,
    heartbeatAt: Number(source.heartbeatAt) || 0,
    createdAt: Number(source.createdAt) || Date.now(),
    updatedAt: Number(source.updatedAt) || Date.now()
  };
}

function normalizeChatGlobalSettings(source = {}) {
  const resolved = source && typeof source === "object" ? source : {};
  return {
    userPresenceScope: resolved.userPresenceScope === "per_contact" ? "per_contact" : "global"
  };
}

function normalizeCommonPlaceType(value = "") {
  const resolved = String(value || "").trim().toLowerCase();
  return COMMON_PLACE_TYPE_OPTIONS.some((item) => item.value === resolved) ? resolved : "other";
}

function getCommonPlaceTypeLabel(type = "") {
  return (
    COMMON_PLACE_TYPE_OPTIONS.find((item) => item.value === normalizeCommonPlaceType(type))?.label ||
    "其他"
  );
}

function normalizeCommonPlaceAliases(value) {
  const lines = Array.isArray(value) ? value : String(value || "").split(/\r?\n/g);
  return [...new Set(lines.map((item) => String(item || "").trim()).filter(Boolean))].slice(0, 20);
}

function normalizeCommonPlaceVisibilityMode(value = "") {
  const resolved = String(value || "").trim();
  if (resolved === "all_contacts" || resolved === "selected_contacts") {
    return resolved;
  }
  return "self";
}

function normalizeCommonPlace(place, index = 0) {
  const source = place && typeof place === "object" ? place : {};
  const name = String(source.name || "").trim() || `常用地点 ${index + 1}`;
  return {
    id: String(source.id || `common_place_${index}_${hashText(name)}`),
    name: name.slice(0, 40),
    type: normalizeCommonPlaceType(source.type),
    aliases: normalizeCommonPlaceAliases(source.aliases),
    traitsText: String(source.traitsText || source.specialText || source.description || "").trim(),
    visibilityMode: normalizeCommonPlaceVisibilityMode(source.visibilityMode),
    visibleContactIds: normalizeMountedIds(source.visibleContactIds || source.contactIds || []),
    lastUsedAt: Number(source.lastUsedAt) || 0,
    createdAt: Number(source.createdAt) || Date.now(),
    updatedAt: Number(source.updatedAt) || Date.now()
  };
}

function normalizePresenceEntry(entry) {
  const source = entry && typeof entry === "object" ? entry : {};
  const presenceType = String(source.presenceType || "").trim() === "in_transit"
    ? "in_transit"
    : "at_place";
  return {
    presenceType,
    placeId: String(source.placeId || "").trim(),
    fromPlaceId: String(source.fromPlaceId || "").trim(),
    toPlaceId: String(source.toPlaceId || "").trim(),
    updatedAt: Number(source.updatedAt) || 0
  };
}

function arePresenceEntriesEquivalent(left = {}, right = {}) {
  const normalizedLeft = normalizePresenceEntry(left);
  const normalizedRight = normalizePresenceEntry(right);
  return (
    normalizedLeft.presenceType === normalizedRight.presenceType &&
    normalizedLeft.placeId === normalizedRight.placeId &&
    normalizedLeft.fromPlaceId === normalizedRight.fromPlaceId &&
    normalizedLeft.toPlaceId === normalizedRight.toPlaceId
  );
}

function normalizeWorldbookSelectionIds(ids = []) {
  return [...new Set((Array.isArray(ids) ? ids : []).map((item) => String(item || "").trim()))].filter(
    (id) => getWorldbookEntryById(id)
  );
}

function repairPersistedChatWorldbookMounts(promptSettings = {}, conversation = getConversationById()) {
  const usedPromptSettings = normalizeMessagePromptSettings(promptSettings);
  const usedWorldbookIds = normalizeWorldbookSelectionIds(usedPromptSettings.worldbookIds);
  if (!usedPromptSettings.worldbookEnabled || !usedWorldbookIds.length) {
    return usedPromptSettings;
  }

  const rawStoredPromptSettings =
    conversation?.promptSettings && typeof conversation.promptSettings === "object"
      ? conversation.promptSettings
      : {};
  const storedPromptSettings = getConversationPromptSettings(conversation);
  const hasStoredWorldbookEnabled = Object.prototype.hasOwnProperty.call(
    rawStoredPromptSettings,
    "worldbookEnabled"
  );
  const hasStoredWorldbookIds = Object.prototype.hasOwnProperty.call(
    rawStoredPromptSettings,
    "worldbookIds"
  );
  const storedWorldbookIds = normalizeWorldbookSelectionIds(storedPromptSettings.worldbookIds);
  const storedCoversUsedWorldbooks =
    storedPromptSettings.worldbookEnabled &&
    usedWorldbookIds.every((id) => storedWorldbookIds.includes(id));

  if (hasStoredWorldbookEnabled && hasStoredWorldbookIds && storedCoversUsedWorldbooks) {
    state.chatPromptSettings = storedPromptSettings;
    return storedPromptSettings;
  }

  const repairedPromptSettings = setConversationPromptSettings({
    ...storedPromptSettings,
    worldbookEnabled: true,
    worldbookIds: usedWorldbookIds
  }, conversation);
  return repairedPromptSettings || usedPromptSettings;
}

function normalizeMountedIds(value) {
  if (Array.isArray(value)) {
    return [...new Set(value.map((item) => String(item || "").trim()).filter(Boolean))];
  }
  const single = String(value || "").trim();
  return single ? [single] : [];
}

function normalizeContextFocusMinutes(value, fallback = DEFAULT_CONTEXT_FOCUS_MINUTES) {
  return Math.min(
    MAX_CONTEXT_FOCUS_MINUTES,
    Math.max(1, normalizePositiveInteger(value, fallback))
  );
}

function normalizeApiMode(mode) {
  if (mode === "gemini" || mode === "generic" || mode === "grok") {
    return mode;
  }
  return "openai";
}

function getDefaultModelByMode(mode) {
  const resolvedMode = normalizeApiMode(mode);
  if (resolvedMode === "gemini") {
    return DEFAULT_GEMINI_MODEL;
  }
  if (resolvedMode === "grok") {
    return DEFAULT_GROK_MODEL;
  }
  return DEFAULT_DEEPSEEK_MODEL;
}

function isOpenAICompatibleMode(mode) {
  const resolvedMode = normalizeApiMode(mode);
  return resolvedMode === "openai" || resolvedMode === "grok";
}

function normalizeApiConfigToken(token) {
  return String(token || "").trim();
}

function normalizeTemperature(value, fallback = DEFAULT_TEMPERATURE) {
  const parsed = Number.parseFloat(value);
  if (!Number.isFinite(parsed)) {
    return fallback;
  }
  return Math.min(2, Math.max(0, parsed));
}

function normalizeOpenAICompatibleEndpoint(endpoint) {
  const trimmed = String(endpoint || "").trim();
  if (!trimmed) {
    return DEFAULT_OPENAI_ENDPOINT;
  }

  try {
    const url = new URL(trimmed);
    if (url.hostname !== "api.deepseek.com") {
      return trimmed.replace(/\/+$/, "");
    }

    if (
      url.pathname === "/" ||
      url.pathname === "/v1" ||
      url.pathname === "/v1/" ||
      url.pathname === "/v1/chat/completions" ||
      url.pathname === "/v1/chat/completions/" ||
      url.pathname === "/chat/completions/"
    ) {
      return DEFAULT_OPENAI_ENDPOINT;
    }

    return trimmed.replace(/\/+$/, "");
  } catch (_error) {
    return trimmed;
  }
}

function normalizeGeminiEndpoint(endpoint) {
  const trimmed = String(endpoint || "").trim();
  if (!trimmed) {
    return DEFAULT_GEMINI_ENDPOINT;
  }
  return trimmed.replace(/\/+$/, "");
}

function normalizeGrokEndpoint(endpoint) {
  const trimmed = String(endpoint || "").trim();
  if (!trimmed) {
    return DEFAULT_GROK_ENDPOINT;
  }

  try {
    const url = new URL(trimmed);
    if (url.hostname !== "api.x.ai") {
      return trimmed.replace(/\/+$/, "");
    }

    if (
      url.pathname === "/" ||
      url.pathname === "/v1" ||
      url.pathname === "/v1/" ||
      url.pathname === "/v1/chat/completions" ||
      url.pathname === "/v1/chat/completions/" ||
      url.pathname === "/chat/completions/"
    ) {
      return DEFAULT_GROK_ENDPOINT;
    }

    return trimmed.replace(/\/+$/, "");
  } catch (_error) {
    return trimmed;
  }
}

function normalizeSettingsEndpointByMode(mode, endpoint) {
  const resolvedMode = normalizeApiMode(mode);
  if (resolvedMode === "openai") {
    return normalizeOpenAICompatibleEndpoint(endpoint);
  }
  if (resolvedMode === "grok") {
    return normalizeGrokEndpoint(endpoint);
  }
  if (resolvedMode === "gemini") {
    return normalizeGeminiEndpoint(endpoint);
  }
  return String(endpoint || "").trim();
}

function normalizeApiConfigs(configs = []) {
  if (!Array.isArray(configs)) {
    return [];
  }

  return configs
    .filter((item) => item && typeof item === "object")
    .slice(0, 12)
    .map((item, index) => {
      const mode = normalizeApiMode(item.mode);
      const fallbackName = `接口配置 ${index + 1}`;
      return {
        id: item.id || `api_cfg_${index}_${hashText(`${item.name || ""}-${item.endpoint || ""}`)}`,
        name: String(item.name || fallbackName).trim().slice(0, 20) || fallbackName,
        mode,
        endpoint: normalizeSettingsEndpointByMode(mode, item.endpoint || ""),
        token: normalizeApiConfigToken(item.token),
        model:
          mode === "generic"
            ? ""
            : String(item.model || getDefaultModelByMode(mode)).trim() || getDefaultModelByMode(mode),
        temperature: normalizeTemperature(item.temperature, DEFAULT_TEMPERATURE),
        updatedAt: Number(item.updatedAt) || Date.now()
      };
    });
}

function buildNormalizedSettingsSnapshot(source) {
  const merged = {
    ...DEFAULT_SETTINGS,
    ...(source && typeof source === "object" ? source : {})
  };
  merged.mode = normalizeApiMode(merged.mode);
  merged.endpoint = normalizeSettingsEndpointByMode(merged.mode, merged.endpoint);
  merged.token = normalizeApiConfigToken(merged.token);
  merged.temperature = normalizeTemperature(merged.temperature, DEFAULT_TEMPERATURE);
  merged.model =
    merged.mode === "generic"
      ? ""
      : String(merged.model || getDefaultModelByMode(merged.mode)).trim() ||
        getDefaultModelByMode(merged.mode);
  merged.worldview = String(merged.worldview || DEFAULT_WORLDVIEW).trim() || DEFAULT_WORLDVIEW;
  merged.apiConfigs = normalizeApiConfigs(merged.apiConfigs || []);
  merged.chatGlobalSettings = normalizeChatGlobalSettings(
    merged.chatGlobalSettings || source?.chatGlobalSettings || {}
  );
  merged.messagePromptSettings = normalizeMessagePromptSettings(
    merged.messagePromptSettings || source?.messagePromptSettings || {}
  );
  merged.negativePromptConstraints = normalizeNegativePromptConstraints(
    merged.negativePromptConstraints || source?.negativePromptConstraints || []
  );
  merged.privacyAllowlist = normalizePrivacyAllowlist(
    merged.privacyAllowlist || source?.privacyAllowlist || []
  );

  const activeConfig =
    merged.apiConfigs.find((item) => item.id === merged.activeApiConfigId) || null;
  if (!activeConfig) {
    merged.activeApiConfigId = "";
  } else {
    merged.mode = normalizeApiMode(activeConfig.mode);
    merged.endpoint = normalizeSettingsEndpointByMode(activeConfig.mode, activeConfig.endpoint);
    merged.token = normalizeApiConfigToken(activeConfig.token);
    merged.temperature = normalizeTemperature(activeConfig.temperature, DEFAULT_TEMPERATURE);
    merged.model =
      merged.mode === "generic"
        ? ""
        : String(activeConfig.model || getDefaultModelByMode(activeConfig.mode)).trim() ||
          getDefaultModelByMode(activeConfig.mode);
  }

  if (!merged.apiConfigs.some((item) => item.id === merged.translationApiConfigId)) {
    merged.translationApiConfigId = "";
    merged.translationApiEnabled = false;
  }
  merged.translationApiEnabled = Boolean(
    merged.translationApiEnabled && merged.translationApiConfigId
  );

  if (!merged.apiConfigs.some((item) => item.id === merged.summaryApiConfigId)) {
    merged.summaryApiConfigId = "";
    merged.summaryApiEnabled = false;
  }
  merged.summaryApiEnabled = Boolean(merged.summaryApiEnabled && merged.summaryApiConfigId);

  return merged;
}

function loadSettings() {
  const raw = safeGetItem(SETTINGS_KEY);
  if (!raw) {
    return buildNormalizedSettingsSnapshot(DEFAULT_SETTINGS);
  }

  try {
    return buildNormalizedSettingsSnapshot(JSON.parse(raw));
  } catch (_error) {
    return buildNormalizedSettingsSnapshot(DEFAULT_SETTINGS);
  }
}

function persistSettings(settings) {
  safeSetItem(SETTINGS_KEY, JSON.stringify(settings));
}

function readStoredJson(key, fallback = null) {
  const raw = safeGetItem(key);
  if (!raw) {
    return fallback;
  }

  try {
    return JSON.parse(raw);
  } catch (_error) {
    return fallback;
  }
}

function sleep(ms) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function waitForNextAnimationFrame() {
  return new Promise((resolve) => {
    if (typeof window.requestAnimationFrame === "function") {
      window.requestAnimationFrame(() => resolve());
      return;
    }
    window.setTimeout(resolve, 16);
  });
}

function resolveGeminiGenerateEndpoint(endpoint, model) {
  const normalizedEndpoint = normalizeGeminiEndpoint(endpoint);
  const normalizedModel = String(model || DEFAULT_GEMINI_MODEL).trim() || DEFAULT_GEMINI_MODEL;

  if (normalizedEndpoint.includes(":generateContent")) {
    return normalizedEndpoint;
  }
  if (/\/models\/[^/]+$/.test(normalizedEndpoint)) {
    return `${normalizedEndpoint}:generateContent`;
  }
  if (normalizedEndpoint.endsWith("/models")) {
    return `${normalizedEndpoint}/${normalizedModel}:generateContent`;
  }
  return `${normalizedEndpoint}/models/${normalizedModel}:generateContent`;
}

function resolveApiRequestEndpoint(settings) {
  const resolvedMode = normalizeApiMode(settings.mode);
  if (resolvedMode === "openai") {
    return normalizeOpenAICompatibleEndpoint(settings.endpoint);
  }
  if (resolvedMode === "grok") {
    return normalizeGrokEndpoint(settings.endpoint);
  }
  if (resolvedMode === "gemini") {
    return resolveGeminiGenerateEndpoint(settings.endpoint, settings.model);
  }
  return String(settings.endpoint || "").trim();
}

function buildRequestHeaders(settings) {
  const headers = {
    "Content-Type": "application/json"
  };

  const token = normalizeApiConfigToken(settings.token);
  if (!token) {
    return headers;
  }
  if (normalizeApiMode(settings.mode) === "gemini") {
    headers["x-goog-api-key"] = token;
    return headers;
  }
  headers.Authorization = `Bearer ${token}`;
  return headers;
}

function resolveMessage(payload) {
  if (typeof payload === "string") {
    return payload.trim();
  }

  const geminiParts = payload?.candidates?.[0]?.content?.parts;
  if (Array.isArray(geminiParts)) {
    const merged = geminiParts
      .map((item) => item?.text || "")
      .join("\n")
      .trim();
    if (merged) {
      return merged;
    }
  }

  const content = payload?.choices?.[0]?.message?.content;
  if (typeof content === "string" && content.trim()) {
    return content.trim();
  }

  if (Array.isArray(content)) {
    const merged = content
      .map((item) => item?.text || item?.content || "")
      .join("\n")
      .trim();
    if (merged) {
      return merged;
    }
  }

  return (
    payload?.message ||
    payload?.text ||
    payload?.content ||
    payload?.data?.message ||
    payload?.output?.[0]?.content?.[0]?.text ||
    ""
  );
}

function buildGeminiSafetySettings() {
  return [
    "HARM_CATEGORY_HARASSMENT",
    "HARM_CATEGORY_HATE_SPEECH",
    "HARM_CATEGORY_SEXUALLY_EXPLICIT",
    "HARM_CATEGORY_DANGEROUS_CONTENT",
    "HARM_CATEGORY_CIVIC_INTEGRITY"
  ].map((category) => ({
    category,
    threshold: "BLOCK_NONE"
  }));
}

function getGeminiFinishReason(payload) {
  return String(payload?.candidates?.[0]?.finishReason || payload?.candidates?.[0]?.finish_reason || "").trim();
}

function buildGeminiLogFields(settings, payload) {
  if (normalizeApiMode(settings?.mode) !== "gemini") {
    return {};
  }
  const diagnostics = getGeminiResponseDiagnostics(payload);
  const geminiSafetyRatings = {
    prompt: diagnostics.promptSafety,
    candidate: diagnostics.candidateSafety
  };
  return {
    geminiFinishReason: diagnostics.finishReason,
    gemini_finish_reason: diagnostics.finishReason,
    geminiSafetyRatings,
    gemini_safety_ratings: geminiSafetyRatings
  };
}

function getGeminiResponseDiagnostics(payload) {
  const candidate = payload?.candidates?.[0] || null;
  const promptFeedback = payload?.promptFeedback || payload?.prompt_feedback || null;
  const finishReason = getGeminiFinishReason(payload);
  const finishMessage = String(
    candidate?.finishMessage || candidate?.finish_message || ""
  ).trim();
  const blockReason = String(
    promptFeedback?.blockReason || promptFeedback?.block_reason || ""
  ).trim();
  const promptSafety = Array.isArray(promptFeedback?.safetyRatings)
    ? promptFeedback.safetyRatings
    : Array.isArray(promptFeedback?.safety_ratings)
      ? promptFeedback.safety_ratings
      : [];
  const candidateSafety = Array.isArray(candidate?.safetyRatings)
    ? candidate.safetyRatings
    : Array.isArray(candidate?.safety_ratings)
      ? candidate.safety_ratings
      : [];
  return {
    hasCandidates: Array.isArray(payload?.candidates) && payload.candidates.length > 0,
    finishReason,
    finishMessage,
    blockReason,
    promptSafety,
    candidateSafety,
    usageMetadata: payload?.usageMetadata || payload?.usage_metadata || null
  };
}

function buildGeminiEmptyResponseErrorMessage(payload) {
  const diagnostics = getGeminiResponseDiagnostics(payload);
  const detailParts = [];
  if (diagnostics.blockReason) {
    detailParts.push(`promptFeedback.blockReason=${diagnostics.blockReason}`);
  }
  if (diagnostics.finishReason) {
    detailParts.push(`finishReason=${diagnostics.finishReason}`);
  }
  if (diagnostics.finishMessage) {
    detailParts.push(`finishMessage=${diagnostics.finishMessage}`);
  }
  const details = detailParts.length ? `（${detailParts.join("，")}）` : "";
  return `Gemini 返回了空内容${details}。`;
}

function shouldRetryGeminiEmptyResponse(payload) {
  const diagnostics = getGeminiResponseDiagnostics(payload);
  if (diagnostics.blockReason) {
    return false;
  }
  const blockedReasons = new Set([
    "SAFETY",
    "RECITATION",
    "PROHIBITED_CONTENT",
    "SPII",
    "BLOCKLIST",
    "MODEL_ARMOR"
  ]);
  if (blockedReasons.has(String(diagnostics.finishReason || "").toUpperCase())) {
    return false;
  }
  return true;
}

function validateApiSettings(settings, purpose = "请求") {
  const requestEndpoint = resolveApiRequestEndpoint(settings);
  settings.endpoint = requestEndpoint;
  if (!requestEndpoint) {
    throw new Error(`未配置 API 地址，无法执行${purpose}。`);
  }
  if (isOpenAICompatibleMode(settings.mode) && !settings.model) {
    throw new Error("DeepSeek / Grok / OpenAI 兼容模式需要填写模型名称。");
  }
  if (normalizeApiMode(settings.mode) === "gemini" && !settings.token) {
    throw new Error("Gemini 模式需要填写 API Key。");
  }
  return requestEndpoint;
}

function buildProfileHandle(username) {
  const normalized = String(username || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
  return normalized ? `@${normalized}` : "@worldview_lab";
}

function normalizeProfileUserId(userId, username = DEFAULT_PROFILE.username) {
  const trimmed = String(userId || "").trim();
  if (!trimmed) {
    return buildProfileHandle(username);
  }
  return trimmed.startsWith("@") ? trimmed : `@${trimmed}`;
}

function getWechatIdDisplay(userId, username = DEFAULT_PROFILE.username) {
  return normalizeProfileUserId(userId, username).replace(/^@/, "");
}

function getProfileAvatarFallback(profile) {
  const avatarText = String(profile?.avatar || "").trim();
  if (avatarText) {
    return avatarText.slice(0, 2);
  }
  const username = String(profile?.username || DEFAULT_PROFILE.username).trim();
  return username.slice(0, 2) || DEFAULT_PROFILE.avatar;
}

function getContactAvatarFallback(contact) {
  const name = String(contact?.name || "联络人").trim();
  return name.slice(0, 2) || "联";
}

function buildAvatarMarkup(imageSrc, fallbackText, className) {
  if (imageSrc) {
    return `<div class="${escapeHtml(className)}"><img src="${escapeHtml(imageSrc)}" alt="" /></div>`;
  }
  return `<div class="${escapeHtml(className)}">${escapeHtml(fallbackText)}</div>`;
}

function loadProfile() {
  const raw = safeGetItem(PROFILE_KEY);
  if (!raw) {
    return { ...DEFAULT_PROFILE };
  }

  try {
    const storedProfile = JSON.parse(raw);
    const chatProfileInitialized = Boolean(storedProfile?.chatProfileInitialized);
    const username = String(
      storedProfile?.chatUsername || storedProfile?.username || DEFAULT_PROFILE.username
    ).trim();
    const userId = String(
      storedProfile?.chatUserId || storedProfile?.userId || DEFAULT_PROFILE.userId
    ).trim();
    const avatarImage = chatProfileInitialized
      ? String(storedProfile?.chatAvatarImage || "").trim()
      : String(storedProfile?.chatAvatarImage || storedProfile?.avatarImage || "").trim();
    const personaPrompt = String(
      storedProfile?.chatPersonaPrompt ||
        storedProfile?.personaPrompt ||
        DEFAULT_PROFILE.personaPrompt
    ).trim();

    return {
      ...DEFAULT_PROFILE,
      ...storedProfile,
      username: username || DEFAULT_PROFILE.username,
      userId: userId || DEFAULT_PROFILE.userId,
      avatarImage,
      personaPrompt: personaPrompt || DEFAULT_PROFILE.personaPrompt
    };
  } catch (_error) {
    return { ...DEFAULT_PROFILE };
  }
}

function persistProfile(profile) {
  let storedProfile = {};
  try {
    storedProfile = JSON.parse(safeGetItem(PROFILE_KEY) || "{}") || {};
  } catch (_error) {
    storedProfile = {};
  }

  return safeSetItem(
    PROFILE_KEY,
    JSON.stringify({
      ...storedProfile,
      chatProfileInitialized: true,
      chatUsername: String(profile?.username || DEFAULT_PROFILE.username).trim() || DEFAULT_PROFILE.username,
      chatUserId: String(profile?.userId || DEFAULT_PROFILE.userId).trim() || DEFAULT_PROFILE.userId,
      chatAvatarImage: String(profile?.avatarImage || "").trim(),
      chatPersonaPrompt:
        String(profile?.personaPrompt || DEFAULT_PROFILE.personaPrompt).trim() ||
        DEFAULT_PROFILE.personaPrompt
    })
  );
}

function syncProfileStateFromStorage() {
  state.profile = loadProfile();
  return state.profile;
}

function normalizeContact(contact, index = 0) {
  const source = contact && typeof contact === "object" ? contact : {};
  const name = String(source.name || "").trim() || `联系人 ${index + 1}`;
  return {
    id: String(source.id || `contact_${index}_${hashText(name)}`),
    name,
    avatarImage: String(source.avatarImage || "").trim(),
    avatarText: String(source.avatarText || "").trim() || getContactAvatarFallback({ name }),
    personaPrompt: String(source.personaPrompt || "").trim(),
    userSpecialPersona: String(source.userSpecialPersona || source.specialUserPersona || "").trim(),
    roleSpecialPersona: String(source.roleSpecialPersona || "").trim(),
    forumFandomEnabled: Boolean(source.forumFandomEnabled),
    forumFandomTabId: String(source.forumFandomTabId || "").trim(),
    forumFandomTabName: String(source.forumFandomTabName || "").trim(),
    forumFandomAudience: String(source.forumFandomAudience || "").trim(),
    awarenessTitle: resolveAwarenessTitle(source.awarenessTitle, source.awarenessText),
    awarenessText: String(source.awarenessText || "").trim(),
    awarenessEmotionShift: String(source.awarenessEmotionShift || "").trim(),
    awarenessSensitivity: normalizeAwarenessSensitivity(source.awarenessSensitivity),
    awarenessConsumed: Boolean(source.awarenessConsumed),
    awarenessResolvedState: normalizeAwarenessResolvedState(
      source.awarenessResolvedState,
      source.awarenessConsumed
    ),
    awarenessHistoryHidden: Boolean(source.awarenessHistoryHidden),
    awarenessCheckCount: Math.max(
      0,
      Number.parseInt(String(source.awarenessCheckCount || 0), 10) || 0
    ),
    awarenessTriggerCount: Math.max(
      0,
      Number.parseInt(String(source.awarenessTriggerCount || 0), 10) || 0
    ),
    awarenessLastCheckedAt: Number(source.awarenessLastCheckedAt) || 0,
    awarenessLastTriggeredAt: Number(source.awarenessLastTriggeredAt) || 0,
    awarenessHistory: normalizeAwarenessHistory(source.awarenessHistory || []),
    awarenessManualTriggerPending: normalizeManualAwarenessTrigger(
      source.awarenessManualTriggerPending || source.awarenessManualTrigger || null
    ),
    createdAt: Number(source.createdAt) || Date.now(),
    updatedAt: Number(source.updatedAt) || Date.now()
  };
}

function buildSnapshotContactFromConversation(conversation = {}, index = 0) {
  const contactId = String(conversation?.contactId || "").trim();
  const contactName = String(conversation?.contactNameSnapshot || "").trim();
  if (!contactId || !contactName) {
    return null;
  }
  return normalizeContact(
    {
      id: contactId,
      name: contactName,
      avatarImage: String(conversation?.contactAvatarImageSnapshot || "").trim(),
      avatarText:
        String(conversation?.contactAvatarTextSnapshot || "").trim() ||
        getContactAvatarFallback({ name: contactName }),
      personaPrompt: "",
      userSpecialPersona: "",
      roleSpecialPersona: "",
      forumFandomEnabled: false,
      forumFandomTabId: "",
      forumFandomTabName: "",
      forumFandomAudience: "",
      createdAt: Number(conversation?.updatedAt) || Date.now(),
      updatedAt: Number(conversation?.updatedAt) || Date.now()
    },
    index
  );
}

function mergeContactsWithConversationSnapshots(contacts = [], conversations = []) {
  const normalizedContacts = Array.isArray(contacts)
    ? contacts.map((item, index) => normalizeContact(item, index))
    : [];
  const nextContacts = normalizedContacts.map((item) => ({ ...item }));
  const contactIndexMap = new Map(
    nextContacts.map((item, index) => [String(item.id || "").trim(), index])
  );

  (Array.isArray(conversations) ? conversations : []).forEach((conversation, index) => {
    const recoveredContact = buildSnapshotContactFromConversation(conversation, nextContacts.length + index);
    if (!recoveredContact) {
      return;
    }
    const existingIndex = contactIndexMap.get(recoveredContact.id);
    if (Number.isInteger(existingIndex) && existingIndex >= 0) {
      const current = nextContacts[existingIndex];
      nextContacts[existingIndex] = normalizeContact(
        {
          ...current,
          name: String(current.name || "").trim() || recoveredContact.name,
          avatarImage: String(current.avatarImage || "").trim() || recoveredContact.avatarImage,
          avatarText: String(current.avatarText || "").trim() || recoveredContact.avatarText,
          updatedAt: Math.max(Number(current.updatedAt) || 0, Number(recoveredContact.updatedAt) || 0)
        },
        existingIndex
      );
      return;
    }
    contactIndexMap.set(recoveredContact.id, nextContacts.length);
    nextContacts.push(recoveredContact);
  });

  return nextContacts.sort((left, right) => (right.updatedAt || 0) - (left.updatedAt || 0));
}

function loadContacts(conversations = []) {
  const raw = safeGetItem(MESSAGE_CONTACTS_KEY);
  const sourceConversations = Array.isArray(conversations) ? conversations : [];
  if (!raw) {
    return mergeContactsWithConversationSnapshots([], sourceConversations);
  }

  try {
    const parsed = JSON.parse(raw);
    const storedContacts = Array.isArray(parsed)
      ? parsed
      : Array.isArray(parsed?.contacts)
        ? parsed.contacts
        : [];
    return mergeContactsWithConversationSnapshots(storedContacts, sourceConversations);
  } catch (_error) {
    return mergeContactsWithConversationSnapshots([], sourceConversations);
  }
}

function persistContacts() {
  const mergedContacts = mergeContactsWithConversationSnapshots(state.contacts, state.conversations);
  const nextPayload = JSON.stringify(mergedContacts);
  state.contacts = mergedContacts;
  if (safeGetItem(MESSAGE_CONTACTS_KEY) === nextPayload) {
    return true;
  }
  return safeSetItem(MESSAGE_CONTACTS_KEY, nextPayload);
}

function normalizeForumTabDomainType(value = "", fallback = "general") {
  const normalized = String(value || "").trim().toLowerCase();
  return FORUM_TAB_DOMAIN_TYPES.has(normalized) ? normalized : fallback;
}

function createMessagesCustomTabId(seed = "custom") {
  return `custom_${Date.now()}_${hashText(seed)}`;
}

function normalizeForumCustomTabs(tabs = []) {
  if (!Array.isArray(tabs)) {
    return [];
  }

  return tabs
    .map((tab, index) => {
      if (typeof tab === "string") {
        const name = String(tab).trim().slice(0, 20) || "自定义页签";
        return {
          id: `custom_${index}_${hashText(name)}`,
          name,
          pinned: false,
          audience: "",
          discussionText: "",
          hotTopic: "",
          text: "",
          timeAwareness: false,
          worldbookIds: [],
          bubbleFocusEnabled: false,
          bubbleFocusMinutes: DEFAULT_CONTEXT_FOCUS_MINUTES,
          insFocusEnabled: false,
          insFocusMinutes: DEFAULT_CONTEXT_FOCUS_MINUTES,
          forumDomainType: "general",
          fandomTargetId: "",
          fandomDisplayName: "",
          mountedEntityRefs: [],
          autoDetectMentionedContacts: true
        };
      }
      if (!tab || typeof tab !== "object") {
        return null;
      }
      const rawName = tab.name || tab.label || tab.title || tab.tabName || tab.tabLabel || "";
      const rawAudience =
        tab.audience ||
        tab.userPosition ||
        tab.userProfile ||
        tab.positioning ||
        tab.targetAudience ||
        tab.memberProfile ||
        "";
      const rawDiscussionText =
        tab.discussionText ||
        tab.text ||
        tab.prompt ||
        tab.content ||
        tab.description ||
        "";
      const rawHotTopic =
        tab.hotTopic ||
        tab.hotspot ||
        tab.hotText ||
        tab.topicText ||
        tab.topic ||
        "";
      const rawWorldbookIds =
        tab.worldbookIds ||
        tab.mountedWorldbookIds ||
        tab.worldbooks ||
        tab.worldbookEntries ||
        [];
      return {
        id:
          tab.id ||
          tab.feedId ||
          tab.key ||
          `custom_${index}_${hashText(`${rawName || ""}-${rawDiscussionText || ""}-${rawHotTopic || ""}`)}`,
        name: String(rawName || "自定义页签").trim().slice(0, 20) || "自定义页签",
        pinned: Boolean(tab.pinned || tab.isPinned || tab.defaultFeed),
        audience: String(rawAudience || "").trim(),
        discussionText: String(rawDiscussionText || "").trim(),
        hotTopic: String(rawHotTopic || "").trim(),
        text: String(rawDiscussionText || "").trim(),
        timeAwareness:
          typeof tab.timeAwareness === "boolean"
            ? tab.timeAwareness
            : Boolean(tab.enableTimeAwareness || tab.dateAwareness || tab.timeAware),
        worldbookIds: normalizeMountedIds(rawWorldbookIds),
        bubbleFocusEnabled: Boolean(
          tab.bubbleFocusEnabled || tab.mountBubble || tab.bubbleMounted || tab.bubbleEnabled
        ),
        bubbleFocusMinutes: normalizeContextFocusMinutes(
          tab.bubbleFocusMinutes || tab.bubbleMinutes || tab.bubbleFocusWindow
        ),
        insFocusEnabled: Boolean(
          tab.insFocusEnabled ||
            tab.mountIns ||
            tab.profilePostFocusEnabled ||
            tab.profileMounted ||
            tab.insMounted
        ),
        insFocusMinutes: normalizeContextFocusMinutes(
          tab.insFocusMinutes ||
            tab.insMinutes ||
            tab.profilePostFocusMinutes ||
            tab.profileFocusWindow
        ),
        forumDomainType: normalizeForumTabDomainType(
          tab.forumDomainType || tab.domainType || tab.tabDomainType,
          "general"
        ),
        fandomTargetId: String(tab.fandomTargetId || tab.contactId || "").trim(),
        fandomDisplayName: String(tab.fandomDisplayName || tab.fandomTargetName || "").trim(),
        mountedEntityRefs: normalizeMountedIds(
          tab.mountedEntityRefs ||
            tab.mountedEntities ||
            tab.publicEntityRefs ||
            []
        ),
        autoDetectMentionedContacts:
          typeof tab.autoDetectMentionedContacts === "boolean"
            ? tab.autoDetectMentionedContacts
            : typeof tab.mentionedContactsEnabled === "boolean"
              ? tab.mentionedContactsEnabled
              : true
      };
    })
    .filter(Boolean)
    .map((tab) => ({
      id: tab.id || createMessagesCustomTabId(tab.name || "custom"),
      name: String(tab.name || "自定义页签").trim().slice(0, 20) || "自定义页签",
      pinned: Boolean(tab.pinned),
      audience: String(tab.audience || "").trim(),
      discussionText: String(tab.discussionText || tab.text || "").trim(),
      hotTopic: String(tab.hotTopic || "").trim(),
      text: String(tab.discussionText || tab.text || "").trim(),
      timeAwareness: Boolean(tab.timeAwareness),
      worldbookIds: normalizeMountedIds(tab.worldbookIds || []),
      bubbleFocusEnabled: Boolean(tab.bubbleFocusEnabled),
      bubbleFocusMinutes: normalizeContextFocusMinutes(tab.bubbleFocusMinutes),
      insFocusEnabled: Boolean(tab.insFocusEnabled),
      insFocusMinutes: normalizeContextFocusMinutes(tab.insFocusMinutes),
      forumDomainType: normalizeForumTabDomainType(tab.forumDomainType, "general"),
      fandomTargetId: String(tab.fandomTargetId || "").trim(),
      fandomDisplayName: String(tab.fandomDisplayName || "").trim(),
      mountedEntityRefs: normalizeMountedIds(tab.mountedEntityRefs || []),
      autoDetectMentionedContacts:
        typeof tab.autoDetectMentionedContacts === "boolean"
          ? tab.autoDetectMentionedContacts
          : true
    }));
}

function buildContactCombinedPersonaText(contact = null, options = {}) {
  const resolvedContact = contact && typeof contact === "object" ? contact : {};
  const joiner = typeof options.joiner === "string" ? options.joiner : "\n";
  return [
    String(resolvedContact.personaPrompt || "").trim(),
    String(resolvedContact.roleSpecialPersona || "").trim()
  ]
    .filter(Boolean)
    .join(joiner)
    .trim();
}

function buildUserCombinedPersonaText(profile = null, contact = null, options = {}) {
  const resolvedProfile = profile && typeof profile === "object" ? profile : {};
  const resolvedContact = contact && typeof contact === "object" ? contact : {};
  const joiner = typeof options.joiner === "string" ? options.joiner : "\n";
  return [
    String(resolvedProfile.personaPrompt || DEFAULT_PROFILE.personaPrompt || "").trim(),
    String(resolvedContact.userSpecialPersona || "").trim()
  ]
    .filter(Boolean)
    .join(joiner)
    .trim();
}

function buildDefaultContactFandomTabName(contact = null) {
  const contactName = String(contact?.name || "").trim() || "角色";
  return `${contactName}粉丝页`.slice(0, 10);
}

function buildDefaultContactFandomAudience(contact = null) {
  const contactName = String(contact?.name || "").trim() || "这个角色";
  return `${contactName}相关话题的活跃讨论用户，默认熟悉TA的公开人设、作品、舞台、行程和热点，会带有一定粉丝滤镜，但也会围绕同一事件产生不同立场。`;
}

function findContactFandomTab(tabs = [], contactId = "", tabId = "") {
  const resolvedContactId = String(contactId || "").trim();
  const resolvedTabId = String(tabId || "").trim();
  return normalizeForumCustomTabs(tabs).find((tab) => {
    if (resolvedTabId && tab.id === resolvedTabId) {
      return true;
    }
    return (
      tab.forumDomainType === "contact_fandom" &&
      resolvedContactId &&
      String(tab.fandomTargetId || "").trim() === resolvedContactId
    );
  }) || null;
}

function updateContactForumFandomFieldsVisibility() {
  const enabled = Boolean(messagesContactForumFandomEnabledInputEl?.checked);
  if (messagesContactForumFandomFieldsEl) {
    messagesContactForumFandomFieldsEl.hidden = !enabled;
  }
}

async function syncForumTabsFromMessages(nextTabs = []) {
  const settings = loadSettings();
  const previousTabs = normalizeForumCustomTabs(settings.customTabs || []);
  const normalizedTabs = normalizeForumCustomTabs(nextTabs);
  persistSettings({
    ...settings,
    customTabs: normalizedTabs
  });
  try {
    await requestMessagesStorageApi("/api/forum/custom-tabs", {
      method: "PUT",
      body: JSON.stringify({
        tabs: normalizedTabs
      })
    });
  } catch (error) {
    persistSettings({
      ...settings,
      customTabs: previousTabs
    });
    throw error;
  }
  const syncedTabs = normalizeForumCustomTabs(normalizedTabs);
  persistSettings({
    ...settings,
    customTabs: syncedTabs
  });
  return syncedTabs;
}

async function syncContactForumFandomTab(draft = {}, existingContact = null) {
  const resolvedDraft = draft && typeof draft === "object" ? { ...draft } : {};
  const settings = loadSettings();
  const currentTabs = normalizeForumCustomTabs(settings.customTabs || []);
  const existingTab = findContactFandomTab(
    currentTabs,
    resolvedDraft.id,
    resolvedDraft.forumFandomTabId || existingContact?.forumFandomTabId
  );

  if (!resolvedDraft.forumFandomEnabled) {
    if (!existingTab) {
      return resolvedDraft;
    }
    const nextTabs = currentTabs.map((tab) =>
      tab.id === existingTab.id
        ? {
            ...tab,
            fandomTargetId: "",
            fandomDisplayName: ""
          }
        : tab
    );
    await syncForumTabsFromMessages(nextTabs);
    return {
      ...resolvedDraft,
      forumFandomTabId: String(existingTab.id || "").trim() || resolvedDraft.forumFandomTabId
    };
  }

  if (!existingTab && currentTabs.length >= FORUM_CUSTOM_TAB_LIMIT) {
    throw new Error(`已达到 ${FORUM_CUSTOM_TAB_LIMIT} 个论坛自定义页签上限，无法为这个联系人新增粉丝页。`);
  }

  const resolvedTabName =
    String(resolvedDraft.forumFandomTabName || "").trim() ||
    String(existingTab?.name || "").trim() ||
    buildDefaultContactFandomTabName(resolvedDraft);
  const resolvedAudience =
    String(resolvedDraft.forumFandomAudience || "").trim() ||
    String(existingTab?.audience || "").trim() ||
    buildDefaultContactFandomAudience(resolvedDraft);
  const targetTabId =
    String(existingTab?.id || resolvedDraft.forumFandomTabId || "").trim() ||
    createMessagesCustomTabId(`${resolvedDraft.id || resolvedDraft.name || "contact"}_fandom`);
  const nextTab = {
    ...(existingTab || {}),
    id: targetTabId,
    name: resolvedTabName,
    audience: resolvedAudience,
    discussionText: String(existingTab?.discussionText || "").trim(),
    hotTopic: String(existingTab?.hotTopic || "").trim(),
    text: String(existingTab?.discussionText || existingTab?.text || "").trim(),
    timeAwareness:
      typeof existingTab?.timeAwareness === "boolean" ? existingTab.timeAwareness : false,
    worldbookIds: normalizeMountedIds(existingTab?.worldbookIds || []),
    bubbleFocusEnabled: Boolean(existingTab?.bubbleFocusEnabled),
    bubbleFocusMinutes: normalizeContextFocusMinutes(existingTab?.bubbleFocusMinutes),
    insFocusEnabled: Boolean(existingTab?.insFocusEnabled),
    insFocusMinutes: normalizeContextFocusMinutes(existingTab?.insFocusMinutes),
    forumDomainType: "contact_fandom",
    fandomTargetId: String(resolvedDraft.id || "").trim(),
    fandomDisplayName: String(resolvedDraft.name || "").trim()
  };
  const nextTabs = existingTab
    ? currentTabs.map((tab) => (tab.id === existingTab.id ? nextTab : tab))
    : [...currentTabs, nextTab];
  const syncedTabs = await syncForumTabsFromMessages(nextTabs);
  const syncedTab =
    findContactFandomTab(syncedTabs, resolvedDraft.id, targetTabId) ||
    syncedTabs.find((tab) => tab.id === targetTabId) ||
    nextTab;
  return {
    ...resolvedDraft,
    forumFandomEnabled: true,
    forumFandomTabId: String(syncedTab.id || targetTabId).trim(),
    forumFandomTabName: resolvedTabName,
    forumFandomAudience: resolvedAudience
  };
}

async function detachDeletedContactForumFandomTab(contact = null) {
  const resolvedContact = contact && typeof contact === "object" ? contact : null;
  const contactId = String(resolvedContact?.id || "").trim();
  if (!contactId) {
    return;
  }
  const settings = loadSettings();
  const currentTabs = normalizeForumCustomTabs(settings.customTabs || []);
  const existingTab = findContactFandomTab(
    currentTabs,
    contactId,
    resolvedContact?.forumFandomTabId
  );
  if (!existingTab) {
    return;
  }
  const nextTabs = currentTabs.map((tab) =>
    tab.id === existingTab.id
      ? {
          ...tab,
          fandomTargetId: "",
          fandomDisplayName: ""
        }
      : tab
  );
  try {
    await syncForumTabsFromMessages(nextTabs);
  } catch (error) {
    console.warn("[Messages] Failed to detach contact fandom tab after contact deletion:", error);
  }
}

function normalizeWorldbookCategory(category, index = 0) {
  const source = category && typeof category === "object" ? category : {};
  const name = String(source.name || "").trim() || `分类 ${index + 1}`;
  return {
    id: String(source.id || `worldbook_category_${index}_${hashText(name)}`),
    name: name.slice(0, 24),
    createdAt: Number(source.createdAt) || Date.now(),
    updatedAt: Number(source.updatedAt) || Date.now()
  };
}

function normalizeWorldbookEntry(entry, categories = [], index = 0) {
  const source = entry && typeof entry === "object" ? entry : {};
  const name = String(source.name || "").trim() || `世界书 ${index + 1}`;
  const categoryId = String(source.categoryId || "").trim();
  const hasCategory = categories.some((item) => item.id === categoryId);
  return {
    id: String(source.id || `worldbook_entry_${index}_${hashText(name)}`),
    name: name.slice(0, 40),
    text: String(source.text || "").trim(),
    categoryId: hasCategory ? categoryId : "",
    createdAt: Number(source.createdAt) || Date.now(),
    updatedAt: Number(source.updatedAt) || Date.now()
  };
}

function loadWorldbooks() {
  const raw = safeGetItem(WORLD_BOOKS_KEY);
  if (!raw) {
    return { categories: [], entries: [] };
  }

  try {
    const parsed = JSON.parse(raw);
    const categories = Array.isArray(parsed?.categories)
      ? parsed.categories.map((item, index) => normalizeWorldbookCategory(item, index))
      : [];
    const entries = Array.isArray(parsed?.entries)
      ? parsed.entries
          .map((item, index) => normalizeWorldbookEntry(item, categories, index))
          .filter((item) => item.name && item.text)
      : [];
    return { categories, entries };
  } catch (_error) {
    return { categories: [], entries: [] };
  }
}

function persistWorldbooks() {
  safeSetItem(WORLD_BOOKS_KEY, JSON.stringify(state.worldbooks));
}

function getWorldbookCategoryById(categoryId = "") {
  return state.worldbooks.categories.find((item) => item.id === categoryId) || null;
}

function getWorldbookEntryById(entryId = "") {
  return state.worldbooks.entries.find((item) => item.id === entryId) || null;
}

function normalizeJournalEntry(entry, index = 0) {
  const source = entry && typeof entry === "object" ? entry : {};
  const date = /^\d{4}-\d{2}-\d{2}$/.test(String(source.date || "").trim())
    ? String(source.date).trim()
    : "";
  return {
    id: String(source.id || `journal_${index}_${hashText(`${source.contactId || ""}-${date}-${source.content || ""}`)}`),
    contactId: String(source.contactId || "").trim(),
    contactNameSnapshot: String(source.contactNameSnapshot || "").trim(),
    conversationId: String(source.conversationId || "").trim(),
    date,
    weather: String(source.weather || "").trim(),
    content: String(source.content || "").trim(),
    createdAt: Number(source.createdAt) || Date.now(),
    updatedAt: Number(source.updatedAt) || Number(source.createdAt) || Date.now()
  };
}

function loadJournalEntries() {
  const raw = readStoredJson(MESSAGE_JOURNAL_ENTRIES_KEY, []);
  return Array.isArray(raw)
    ? raw
        .map((entry, index) => normalizeJournalEntry(entry, index))
        .filter((entry) => entry.contactId && entry.date && entry.content)
    : [];
}

function persistJournalEntries() {
  safeSetItem(MESSAGE_JOURNAL_ENTRIES_KEY, JSON.stringify(state.journalEntries));
}

function normalizeMemoryType(type) {
  const resolved = String(type || "").trim().toLowerCase();
  if (resolved === "core" || resolved === "核心记忆") {
    return "core";
  }
  return "scene";
}

function normalizeMemoryImportance(value, fallback = DEFAULT_SCENE_MEMORY_THRESHOLD) {
  return clampNumber(normalizePositiveInteger(value, fallback), 1, 100);
}

function normalizeMessageMemory(memory, index = 0) {
  const source = memory && typeof memory === "object" ? memory : {};
  const content = String(source.content || source.text || "").trim();
  return {
    id: String(source.id || `message_memory_${Date.now()}_${index}`),
    contactId: String(source.contactId || "").trim(),
    type: normalizeMemoryType(source.type),
    content,
    importance: normalizeMemoryImportance(source.importance, DEFAULT_SCENE_MEMORY_THRESHOLD),
    source: String(source.source || "summary").trim() === "manual" ? "manual" : "summary",
    createdAt: Number(source.createdAt) || Date.now(),
    updatedAt: Number(source.updatedAt) || Number(source.createdAt) || Date.now()
  };
}

function normalizeMessageMemoryEntry(memory, index = 0) {
  const source = memory && typeof memory === "object" ? memory : {};
  return {
    ...source,
    ...normalizeMessageMemory(source, index)
  };
}

function getMemoryDecayConfig() {
  const fallback = {
    meta: {
      algorithmVersion: "v1",
      profile: "balanced"
    },
    statusThresholds: {
      activeMinActivation: 0.58,
      faintMinActivation: 0.22,
      faintMinImpression: 0.18,
      dormantMinImpression: 0.08,
      dormantMinStability: 0.28,
      archivedMaxActivation: 0.12,
      archivedMaxImpression: 0.08,
      archivedMinInactiveDays: 45
    },
    halfLifeDays: {
      relationship: 18,
      preference: 21,
      habit: 18,
      constraint: 21,
      fact: 12,
      event: 8,
      scene: 4,
      default: 10
    },
    typeBias: {
      relationship: 0.12,
      preference: 0.15,
      habit: 0.1,
      constraint: 0.1,
      fact: 0.03,
      event: 0,
      scene: -0.08,
      default: 0
    },
    formula: {
      targetStabilityBase: 0.18,
      targetStabilityImportanceWeight: 0.22,
      targetStabilityConfidenceWeight: 0.18,
      targetStabilityEmotionWeight: 0.16,
      targetStabilityReinforceWeight: 0.18,
      impressionFloorBase: 0.04,
      impressionFloorImportanceWeight: 0.18,
      impressionFloorEmotionWeight: 0.14,
      impressionFloorReinforceWeight: 0.16,
      coldPenaltyStartDays: 30,
      coldPenaltyWindowDays: 60,
      coldPenaltyMax: 0.25,
      recallBurstBase: 0.1,
      recallBurstHalfLifeDays: 2,
      stabilityDriftRecent: 0.0008,
      stabilityDriftCold: 0.0025,
      stabilityRecentWindowDays: 14,
      cueThresholdBase: 0.55,
      cueThresholdPositiveBiasBonus: 0.1
    },
    recovery: {
      explicitReinforceActivationBase: 0.28,
      explicitReinforceActivationImportanceWeight: 0.1,
      explicitReinforceStabilityBase: 0.06,
      explicitReinforceStabilityEmotionWeight: 0.04,
      promptRecallActivationBoost: 0.08,
      promptRecallStabilityBoost: 0.015,
      promptRecallMaxRecoveredStatus: "faint"
    },
    legacyLocalRetentionBridge: {
      dayBoundaryMode: "exclude_target_day",
      scene: {
        meetsThresholdRetentionDays: 7,
        belowThresholdRetentionDays: 3
      },
      core: {
        meetsThresholdRetentionDays: 365000,
        belowThresholdRetentionDays: 30
      }
    }
  };
  const source =
    window.PulseMemoryDecayConfig && typeof window.PulseMemoryDecayConfig === "object"
      ? window.PulseMemoryDecayConfig
      : fallback;
  const normalizeNumber = (value, fallbackValue) => {
    const numeric = Number(value);
    return Number.isFinite(numeric) ? numeric : fallbackValue;
  };
  const normalizePositiveInteger = (value, fallbackValue) =>
    Math.max(1, Number.parseInt(String(value ?? fallbackValue), 10) || fallbackValue);
  const normalizeStatus = (value, fallbackValue) => {
    const normalized = String(value || "").trim().toLowerCase();
    return ["active", "faint", "dormant", "archived", "superseded"].includes(normalized)
      ? normalized
      : fallbackValue;
  };
  return {
    meta: {
      algorithmVersion:
        String(source?.meta?.algorithmVersion || fallback.meta.algorithmVersion).trim() ||
        fallback.meta.algorithmVersion,
      profile: String(source?.meta?.profile || fallback.meta.profile).trim() || fallback.meta.profile
    },
    statusThresholds: {
      activeMinActivation: normalizeNumber(
        source?.statusThresholds?.activeMinActivation,
        fallback.statusThresholds.activeMinActivation
      ),
      faintMinActivation: normalizeNumber(
        source?.statusThresholds?.faintMinActivation,
        fallback.statusThresholds.faintMinActivation
      ),
      faintMinImpression: normalizeNumber(
        source?.statusThresholds?.faintMinImpression,
        fallback.statusThresholds.faintMinImpression
      ),
      dormantMinImpression: normalizeNumber(
        source?.statusThresholds?.dormantMinImpression,
        fallback.statusThresholds.dormantMinImpression
      ),
      dormantMinStability: normalizeNumber(
        source?.statusThresholds?.dormantMinStability,
        fallback.statusThresholds.dormantMinStability
      ),
      archivedMaxActivation: normalizeNumber(
        source?.statusThresholds?.archivedMaxActivation,
        fallback.statusThresholds.archivedMaxActivation
      ),
      archivedMaxImpression: normalizeNumber(
        source?.statusThresholds?.archivedMaxImpression,
        fallback.statusThresholds.archivedMaxImpression
      ),
      archivedMinInactiveDays: normalizePositiveInteger(
        source?.statusThresholds?.archivedMinInactiveDays,
        fallback.statusThresholds.archivedMinInactiveDays
      )
    },
    halfLifeDays: {
      relationship: normalizePositiveInteger(
        source?.halfLifeDays?.relationship,
        fallback.halfLifeDays.relationship
      ),
      preference: normalizePositiveInteger(
        source?.halfLifeDays?.preference,
        fallback.halfLifeDays.preference
      ),
      habit: normalizePositiveInteger(source?.halfLifeDays?.habit, fallback.halfLifeDays.habit),
      constraint: normalizePositiveInteger(
        source?.halfLifeDays?.constraint,
        fallback.halfLifeDays.constraint
      ),
      fact: normalizePositiveInteger(source?.halfLifeDays?.fact, fallback.halfLifeDays.fact),
      event: normalizePositiveInteger(source?.halfLifeDays?.event, fallback.halfLifeDays.event),
      scene: normalizePositiveInteger(source?.halfLifeDays?.scene, fallback.halfLifeDays.scene),
      default: normalizePositiveInteger(source?.halfLifeDays?.default, fallback.halfLifeDays.default)
    },
    typeBias: {
      relationship: normalizeNumber(source?.typeBias?.relationship, fallback.typeBias.relationship),
      preference: normalizeNumber(source?.typeBias?.preference, fallback.typeBias.preference),
      habit: normalizeNumber(source?.typeBias?.habit, fallback.typeBias.habit),
      constraint: normalizeNumber(source?.typeBias?.constraint, fallback.typeBias.constraint),
      fact: normalizeNumber(source?.typeBias?.fact, fallback.typeBias.fact),
      event: normalizeNumber(source?.typeBias?.event, fallback.typeBias.event),
      scene: normalizeNumber(source?.typeBias?.scene, fallback.typeBias.scene),
      default: normalizeNumber(source?.typeBias?.default, fallback.typeBias.default)
    },
    formula: {
      targetStabilityBase: normalizeNumber(
        source?.formula?.targetStabilityBase,
        fallback.formula.targetStabilityBase
      ),
      targetStabilityImportanceWeight: normalizeNumber(
        source?.formula?.targetStabilityImportanceWeight,
        fallback.formula.targetStabilityImportanceWeight
      ),
      targetStabilityConfidenceWeight: normalizeNumber(
        source?.formula?.targetStabilityConfidenceWeight,
        fallback.formula.targetStabilityConfidenceWeight
      ),
      targetStabilityEmotionWeight: normalizeNumber(
        source?.formula?.targetStabilityEmotionWeight,
        fallback.formula.targetStabilityEmotionWeight
      ),
      targetStabilityReinforceWeight: normalizeNumber(
        source?.formula?.targetStabilityReinforceWeight,
        fallback.formula.targetStabilityReinforceWeight
      ),
      impressionFloorBase: normalizeNumber(
        source?.formula?.impressionFloorBase,
        fallback.formula.impressionFloorBase
      ),
      impressionFloorImportanceWeight: normalizeNumber(
        source?.formula?.impressionFloorImportanceWeight,
        fallback.formula.impressionFloorImportanceWeight
      ),
      impressionFloorEmotionWeight: normalizeNumber(
        source?.formula?.impressionFloorEmotionWeight,
        fallback.formula.impressionFloorEmotionWeight
      ),
      impressionFloorReinforceWeight: normalizeNumber(
        source?.formula?.impressionFloorReinforceWeight,
        fallback.formula.impressionFloorReinforceWeight
      ),
      coldPenaltyStartDays: normalizePositiveInteger(
        source?.formula?.coldPenaltyStartDays,
        fallback.formula.coldPenaltyStartDays
      ),
      coldPenaltyWindowDays: normalizePositiveInteger(
        source?.formula?.coldPenaltyWindowDays,
        fallback.formula.coldPenaltyWindowDays
      ),
      coldPenaltyMax: normalizeNumber(
        source?.formula?.coldPenaltyMax,
        fallback.formula.coldPenaltyMax
      ),
      recallBurstBase: normalizeNumber(
        source?.formula?.recallBurstBase,
        fallback.formula.recallBurstBase
      ),
      recallBurstHalfLifeDays: normalizePositiveInteger(
        source?.formula?.recallBurstHalfLifeDays,
        fallback.formula.recallBurstHalfLifeDays
      ),
      stabilityDriftRecent: normalizeNumber(
        source?.formula?.stabilityDriftRecent,
        fallback.formula.stabilityDriftRecent
      ),
      stabilityDriftCold: normalizeNumber(
        source?.formula?.stabilityDriftCold,
        fallback.formula.stabilityDriftCold
      ),
      stabilityRecentWindowDays: normalizePositiveInteger(
        source?.formula?.stabilityRecentWindowDays,
        fallback.formula.stabilityRecentWindowDays
      ),
      cueThresholdBase: normalizeNumber(
        source?.formula?.cueThresholdBase,
        fallback.formula.cueThresholdBase
      ),
      cueThresholdPositiveBiasBonus: normalizeNumber(
        source?.formula?.cueThresholdPositiveBiasBonus,
        fallback.formula.cueThresholdPositiveBiasBonus
      )
    },
    recovery: {
      explicitReinforceActivationBase: normalizeNumber(
        source?.recovery?.explicitReinforceActivationBase,
        fallback.recovery.explicitReinforceActivationBase
      ),
      explicitReinforceActivationImportanceWeight: normalizeNumber(
        source?.recovery?.explicitReinforceActivationImportanceWeight,
        fallback.recovery.explicitReinforceActivationImportanceWeight
      ),
      explicitReinforceStabilityBase: normalizeNumber(
        source?.recovery?.explicitReinforceStabilityBase,
        fallback.recovery.explicitReinforceStabilityBase
      ),
      explicitReinforceStabilityEmotionWeight: normalizeNumber(
        source?.recovery?.explicitReinforceStabilityEmotionWeight,
        fallback.recovery.explicitReinforceStabilityEmotionWeight
      ),
      promptRecallActivationBoost: normalizeNumber(
        source?.recovery?.promptRecallActivationBoost,
        fallback.recovery.promptRecallActivationBoost
      ),
      promptRecallStabilityBoost: normalizeNumber(
        source?.recovery?.promptRecallStabilityBoost,
        fallback.recovery.promptRecallStabilityBoost
      ),
      promptRecallMaxRecoveredStatus: normalizeStatus(
        source?.recovery?.promptRecallMaxRecoveredStatus,
        fallback.recovery.promptRecallMaxRecoveredStatus
      )
    },
    legacyLocalRetentionBridge: {
      dayBoundaryMode:
        String(
          source?.legacyLocalRetentionBridge?.dayBoundaryMode ||
            fallback.legacyLocalRetentionBridge.dayBoundaryMode
        ).trim() || fallback.legacyLocalRetentionBridge.dayBoundaryMode,
      scene: {
        meetsThresholdRetentionDays: normalizePositiveInteger(
          source?.legacyLocalRetentionBridge?.scene?.meetsThresholdRetentionDays,
          fallback.legacyLocalRetentionBridge.scene.meetsThresholdRetentionDays
        ),
        belowThresholdRetentionDays: normalizePositiveInteger(
          source?.legacyLocalRetentionBridge?.scene?.belowThresholdRetentionDays,
          fallback.legacyLocalRetentionBridge.scene.belowThresholdRetentionDays
        )
      },
      core: {
        meetsThresholdRetentionDays: normalizePositiveInteger(
          source?.legacyLocalRetentionBridge?.core?.meetsThresholdRetentionDays,
          fallback.legacyLocalRetentionBridge.core.meetsThresholdRetentionDays
        ),
        belowThresholdRetentionDays: normalizePositiveInteger(
          source?.legacyLocalRetentionBridge?.core?.belowThresholdRetentionDays,
          fallback.legacyLocalRetentionBridge.core.belowThresholdRetentionDays
        )
      }
    }
  };
}

function getLegacyLocalMemoryRetentionConfig() {
  return getMemoryDecayConfig().legacyLocalRetentionBridge;
}

function getMemoryRetentionDays(memory, promptSettings = loadSettings().messagePromptSettings) {
  const entry = normalizeMessageMemory(memory);
  const retentionConfig = getLegacyLocalMemoryRetentionConfig();
  const resolvedPromptSettings = normalizeMessagePromptSettings(promptSettings);
  const threshold =
    entry.type === "core"
      ? resolvedPromptSettings.coreMemoryThreshold
      : resolvedPromptSettings.sceneMemoryThreshold;
  const meetsThreshold = Number(entry.importance || 0) >= Number(threshold || 0);
  const configGroup = entry.type === "core" ? retentionConfig.core : retentionConfig.scene;
  return meetsThreshold
    ? Number(configGroup.meetsThresholdRetentionDays) || 1
    : Number(configGroup.belowThresholdRetentionDays) || 1;
}

function getMemoryRetentionTimestamp(memory) {
  const entry = memory && typeof memory === "object" ? memory : {};
  return Number(entry.updatedAt) || Number(entry.createdAt) || 0;
}

function isMessageMemoryExpired(
  memory,
  promptSettings = loadSettings().messagePromptSettings,
  now = Date.now()
) {
  const retentionDays = getMemoryRetentionDays(memory, promptSettings);
  const timestamp = getMemoryRetentionTimestamp(memory);
  if (!timestamp || !retentionDays) {
    return false;
  }
  const dayMs = 24 * 60 * 60 * 1000;
  const ageMs = Math.max(0, Number(now) - timestamp);
  return ageMs >= retentionDays * dayMs;
}

function pruneExpiredMessageMemories(
  memories = [],
  promptSettings = loadSettings().messagePromptSettings,
  now = Date.now()
) {
  return normalizeObjectArray(memories)
    .map((item, index) => normalizeMessageMemoryEntry(item, index))
    .filter((item) => item.contactId && item.content)
    .filter((item) => !isMessageMemoryExpired(item, promptSettings, now));
}

function syncPrunedMemoriesInState(
  promptSettings = loadSettings().messagePromptSettings,
  options = {}
) {
  const requestOptions = options && typeof options === "object" ? options : {};
  const nextMemories = pruneExpiredMessageMemories(state.memories || [], promptSettings, Date.now());
  const currentPayload = JSON.stringify(Array.isArray(state.memories) ? state.memories : []);
  const nextPayload = JSON.stringify(nextMemories);
  if (currentPayload !== nextPayload) {
    state.memories = nextMemories;
    if (requestOptions.persist !== false) {
      safeSetItem(MESSAGE_MEMORIES_KEY, nextPayload);
    }
  }
  return state.memories;
}

function loadMessageMemories() {
  const raw = safeGetItem(MESSAGE_MEMORIES_KEY);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed
          .map((item, index) => normalizeMessageMemoryEntry(item, index))
          .filter((item) => item.contactId && item.content)
      : [];
  } catch (_error) {
    return [];
  }
}

function persistMessageMemories() {
  safeSetItem(MESSAGE_MEMORIES_KEY, JSON.stringify(state.memories));
}

function canonicalizeMemoryContent(value = "") {
  return String(value || "")
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[，。！？、,.!?；;:“”"'（）()【】\[\]《》<>—\-]/g, "");
}

function memoryLooksSimilar(left = "", right = "") {
  const leftText = canonicalizeMemoryContent(left);
  const rightText = canonicalizeMemoryContent(right);
  if (!leftText || !rightText) {
    return false;
  }
  if (leftText === rightText) {
    return true;
  }
  const shorter = leftText.length <= rightText.length ? leftText : rightText;
  const longer = shorter === leftText ? rightText : leftText;
  return shorter.length >= 8 && longer.includes(shorter);
}

function mergeMemories(existing = [], incoming = []) {
  const next = Array.isArray(existing)
    ? existing.map((item, index) => normalizeMessageMemoryEntry(item, index))
    : [];
  incoming.forEach((candidate, index) => {
    const entry = normalizeMessageMemoryEntry(candidate, index);
    if (!entry.contactId || !entry.content) {
      return;
    }
    const foundIndex = next.findIndex(
      (item) =>
        item.contactId === entry.contactId && memoryLooksSimilar(item.content, entry.content)
    );
    if (foundIndex < 0) {
      next.unshift(entry);
      return;
    }
    const current = next[foundIndex];
    const createdAtCandidates = [Number(current.createdAt) || 0, Number(entry.createdAt) || 0].filter(
      Boolean
    );
    next[foundIndex] = {
      ...current,
      ...entry,
      id: String(current.id || entry.id || "").trim(),
      type: current.type === "core" || entry.type === "core" ? "core" : "scene",
      importance: Math.max(Number(current.importance) || 0, Number(entry.importance) || 0),
      source: current.source === "manual" ? "manual" : entry.source,
      createdAt: createdAtCandidates.length ? Math.min(...createdAtCandidates) : Date.now(),
      updatedAt: Math.max(Number(current.updatedAt) || 0, Number(entry.updatedAt) || 0) || Date.now(),
      content:
        String(current.content || "").trim().length >= String(entry.content || "").trim().length
          ? current.content
          : entry.content
    };
  });
  return next
    .filter((item) => item.contactId && item.content)
    .sort(
      (left, right) =>
        (right.importance || 0) - (left.importance || 0) ||
        (right.updatedAt || 0) - (left.updatedAt || 0)
    );
}

function getMemoriesForContact(contactId = "") {
  const resolvedContactId = String(contactId || "").trim();
  if (!resolvedContactId) {
    return [];
  }
  return state.memories
    .filter((item) => item.contactId === resolvedContactId)
    .slice()
    .sort(
      (left, right) =>
        (right.importance || 0) - (left.importance || 0) ||
        (right.updatedAt || 0) - (left.updatedAt || 0)
    );
}

function getMemoryEntryById(memoryId = "") {
  const resolvedMemoryId = String(memoryId || "").trim();
  if (!resolvedMemoryId) {
    return null;
  }
  return state.memories.find((item) => item.id === resolvedMemoryId) || null;
}

function formatMemoryDate(createdAt) {
  const date = new Date(Number(createdAt) || Date.now());
  return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, "0")}/${String(
    date.getDate()
  ).padStart(2, "0")}`;
}

function getMemoryStars(importance = 0) {
  const count = clampNumber(Math.round((Number(importance) || 0) / 20), 1, 5);
  return `${"★".repeat(count)}${"☆".repeat(5 - count)}`;
}

function loadWeatherCache() {
  const raw = readStoredJson(MESSAGE_WEATHER_CACHE_KEY, {});
  return raw && typeof raw === "object" ? raw : {};
}

function persistWeatherCache(cache = {}) {
  safeSetItem(MESSAGE_WEATHER_CACHE_KEY, JSON.stringify(cache));
}

function getWorldbookGroups() {
  const uncategorizedEntries = state.worldbooks.entries
    .filter((item) => !item.categoryId)
    .sort((left, right) => (right.updatedAt || 0) - (left.updatedAt || 0));

  const categoryGroups = state.worldbooks.categories
    .slice()
    .sort((left, right) => (left.updatedAt || 0) - (right.updatedAt || 0))
    .map((category) => ({
      id: category.id,
      name: category.name,
      entries: state.worldbooks.entries
        .filter((item) => item.categoryId === category.id)
        .sort((left, right) => (right.updatedAt || 0) - (left.updatedAt || 0))
    }));

  return [
    {
      id: "uncategorized",
      name: "未分类",
      entries: uncategorizedEntries
    },
    ...categoryGroups
  ].filter((group) => group.entries.length || group.id === "uncategorized" || group.id !== "");
}

function normalizeConversationMessage(message, index = 0) {
  const role = message?.role === "assistant" ? "assistant" : "user";
  const scheduleInviteTitle = String(message?.scheduleInviteTitle || "").trim();
  const scheduleInviteDate = String(message?.scheduleInviteDate || "").trim();
  const scheduleInviteStartTime = String(message?.scheduleInviteStartTime || "").trim();
  const scheduleInviteEndTime = String(message?.scheduleInviteEndTime || "").trim();
  const scheduleInviteType = ["day", "hour", "week"].includes(message?.scheduleInviteType)
    ? message.scheduleInviteType
    : "day";
  const discussionSharePayload = normalizeDiscussionSharePayload(message?.discussionSharePayload);
  const legacyQuotePayload =
    parseQuoteMessageText(message?.text) || parseInlineQuoteReplyMessage(message?.text);
  const legacyImagePayload = parseImageMessageText(message?.text);
  const legacyVoiceCallRequestPayload = parseVoiceCallRequestMessageText(message?.text);
  const legacyVideoCallRequestPayload = parseVideoCallRequestMessageText(message?.text);
  const legacyVoiceCallEventPayload = parseVoiceCallEventMessageText(message?.text);
  const legacyVideoCallEventPayload = parseVideoCallEventMessageText(message?.text);
  const quotedText = String(message?.quotedText || legacyQuotePayload?.quotedText || "").trim();
  const quotedRole =
    String(message?.quotedRole || legacyQuotePayload?.quotedRole || "").trim() === "assistant"
      ? "assistant"
      : "user";
  const legacyVoicePayload = parseVoiceMessageText(message?.text);
  const messageType = isDiscussionShareConversationMessage(message)
    ? "discussion_share"
    : isScheduleInviteConversationMessage(message)
    ? "schedule_invite"
    : isLocationConversationMessage(message)
    ? "location"
    : isImageConversationMessage(message)
      ? "image"
      : isVoiceConversationMessage(message)
        ? "voice"
      : isVideoCallRequestConversationMessage(message)
        ? "video_call_request"
      : isVoiceCallRequestConversationMessage(message)
        ? "voice_call_request"
      : isVideoCallEventConversationMessage(message)
        ? "video_call_event"
      : isVoiceCallEventConversationMessage(message)
        ? "voice_call_event"
      : isQuoteConversationMessage(message)
        ? "quote"
      : "text";
  const locationName = String(message?.locationName || "").trim();
  const coordinates = String(message?.coordinates || "").trim();
  const imageDataUrl = String(message?.imageDataUrl || "").trim();
  const imageDescription = String(
    message?.imageDescription || legacyImagePayload?.imageDescription || ""
  ).trim();
  const voiceText = String(message?.voiceText || legacyVoicePayload?.voiceText || "").trim();
  const voiceDurationSeconds = clampNumber(
    Number(message?.voiceDurationSeconds) ||
      Number(legacyVoicePayload?.voiceDurationSeconds) ||
      estimateVoiceMessageDurationSeconds(voiceText),
    1,
    60
  );
  const callRequestStatus = normalizeVoiceCallRequestStatus(
    message?.callRequestStatus ||
      legacyVideoCallRequestPayload?.callRequestStatus ||
      legacyVoiceCallRequestPayload?.callRequestStatus
  );
  const callRequestMessage = String(
    message?.callRequestMessage ||
      legacyVideoCallRequestPayload?.callRequestMessage ||
      legacyVoiceCallRequestPayload?.callRequestMessage ||
      ""
  )
    .trim()
    .slice(0, 160);
  const callEventKind = normalizeVoiceCallEventKind(
    message?.callEventKind ||
      legacyVideoCallEventPayload?.callEventKind ||
      legacyVoiceCallEventPayload?.callEventKind
  );
  const callEventDurationSeconds = Math.max(
    0,
    Math.floor(
      Number(message?.callEventDurationSeconds) ||
        Number(legacyVideoCallEventPayload?.callEventDurationSeconds) ||
        Number(legacyVoiceCallEventPayload?.callEventDurationSeconds) ||
        0
    )
  );
  const replyText = String(message?.text || "").trim();
  const text =
    messageType === "discussion_share"
      ? buildDiscussionShareFallbackText(discussionSharePayload)
    : messageType === "schedule_invite"
      ? buildScheduleInviteMessageText(
          scheduleInviteTitle || "未命名日程",
          scheduleInviteDate || "",
          scheduleInviteStartTime || "",
          scheduleInviteEndTime || "",
          scheduleInviteType
        )
      : messageType === "location"
      ? buildLocationMessageText(
          locationName || "未命名位置",
          coordinates || buildRandomLocationCoordinates(`${locationName}_${index}`)
        )
      : messageType === "image"
        ? buildImageMessageText(imageDescription)
      : messageType === "voice"
        ? buildVoiceMessageText(voiceText, voiceDurationSeconds)
      : messageType === "video_call_request"
        ? buildVideoCallRequestMessageText(callRequestStatus, callRequestMessage, role)
      : messageType === "voice_call_request"
        ? buildVoiceCallRequestMessageText(callRequestStatus, callRequestMessage, role)
      : messageType === "video_call_event"
        ? buildVideoCallEventMessageText(callEventKind, {
            durationSeconds: callEventDurationSeconds
          })
      : messageType === "voice_call_event"
        ? buildVoiceCallEventMessageText(callEventKind, {
            durationSeconds: callEventDurationSeconds
          })
      : messageType === "quote"
        ? String(message?.text || legacyQuotePayload?.replyText || "").trim()
      : replyText;
  return {
    id: String(message?.id || `conversation_message_${Date.now()}_${index}`),
    role,
    messageType,
    discussionSharePayload:
      messageType === "discussion_share" ? discussionSharePayload : null,
    scheduleInviteTitle:
      messageType === "schedule_invite" ? scheduleInviteTitle || "未命名日程" : "",
    scheduleInviteDate: messageType === "schedule_invite" ? scheduleInviteDate || "" : "",
    scheduleInviteStartTime:
      messageType === "schedule_invite" ? scheduleInviteStartTime || "" : "",
    scheduleInviteEndTime: messageType === "schedule_invite" ? scheduleInviteEndTime || "" : "",
    scheduleInviteType: messageType === "schedule_invite" ? scheduleInviteType : "",
    locationName:
      messageType === "location" ? locationName || "未命名位置" : "",
    coordinates:
      messageType === "location"
        ? coordinates || buildRandomLocationCoordinates(`${locationName}_${index}`)
        : "",
    imageDataUrl: messageType === "image" ? imageDataUrl : "",
    imageDescription: messageType === "image" ? imageDescription : "",
    voiceText: messageType === "voice" ? voiceText : "",
    voiceDurationSeconds: messageType === "voice" ? voiceDurationSeconds : 0,
    callRequestStatus:
      messageType === "voice_call_request" || messageType === "video_call_request"
        ? callRequestStatus
        : "",
    callRequestMessage:
      messageType === "voice_call_request" || messageType === "video_call_request"
        ? callRequestMessage
        : "",
    callEventKind:
      messageType === "voice_call_event" || messageType === "video_call_event"
        ? callEventKind
        : "",
    callEventDurationSeconds:
      messageType === "voice_call_event" || messageType === "video_call_event"
        ? callEventDurationSeconds
        : 0,
    callMode:
      messageType === "video_call_request" || messageType === "video_call_event"
        ? "video"
        : messageType === "voice_call_request" || messageType === "voice_call_event"
          ? "voice"
          : "",
    quotedText: messageType === "quote" ? quotedText : "",
    quotedRole: messageType === "quote" ? quotedRole : "",
    text,
    needsReply: role === "user" ? Boolean(message?.needsReply) : false,
    time:
      /^\d{1,2}:\d{2}$/.test(String(message?.time || "").trim())
        ? String(message.time).trim()
        : formatLocalTime(),
    createdAt: Number(message?.createdAt) || Date.now() + index,
    updatedAt:
      Number(message?.updatedAt) ||
      Number(message?.createdAt) ||
      Date.now() + index
  };
}

function normalizeConversationMemorySummaryCursor(value = 0, messageCount = 0) {
  const normalizedMessageCount = Math.max(
    0,
    Number.parseInt(String(messageCount || 0), 10) || 0
  );
  const rawCursor = Math.max(0, Number.parseInt(String(value || 0), 10) || 0);
  if (rawCursor <= normalizedMessageCount) {
    return rawCursor;
  }
  return 0;
}

function normalizeVoiceCallState(value = null) {
  const source = value && typeof value === "object" ? value : {};
  const active = Boolean(source.active);
  const startedAt = Number(source.startedAt) || 0;
  const callMode = normalizeConversationCallMode(source.callMode);
  return {
    active: active && startedAt > 0,
    startedAt: active && startedAt > 0 ? startedAt : 0,
    initiatedBy: String(source.initiatedBy || "").trim() === "assistant" ? "assistant" : "user",
    requestMessageId: String(source.requestMessageId || "").trim(),
    connectedAt: Number(source.connectedAt) || (active && startedAt > 0 ? startedAt : 0),
    callMode
  };
}

function getConversationVoiceCallState(conversation = getConversationById()) {
  return normalizeVoiceCallState(conversation?.voiceCallState);
}

function isConversationVoiceCallActive(conversation = getConversationById()) {
  return getConversationVoiceCallState(conversation).active;
}

function getConversationActiveCallMode(conversation = getConversationById()) {
  const callState = getConversationVoiceCallState(conversation);
  return callState.active ? normalizeConversationCallMode(callState.callMode) : "";
}

function adjustConversationMemorySummaryCursorAfterTrim(conversation = null, removedCount = 0) {
  if (!conversation || !Array.isArray(conversation.messages)) {
    return;
  }
  const normalizedRemovedCount = Math.max(
    0,
    Number.parseInt(String(removedCount || 0), 10) || 0
  );
  const currentCursor = Math.max(
    0,
    Number.parseInt(String(conversation.memorySummaryLastMessageCount || 0), 10) || 0
  );
  const shiftedCursor = normalizedRemovedCount
    ? Math.max(0, currentCursor - normalizedRemovedCount)
    : currentCursor;
  conversation.memorySummaryLastMessageCount = normalizeConversationMemorySummaryCursor(
    shiftedCursor,
    conversation.messages.length
  );
}

function normalizeConversation(conversation, index = 0) {
  const source = conversation && typeof conversation === "object" ? conversation : {};
  if (!source.contactId) {
    return null;
  }

  const normalizedMessages = Array.isArray(source.messages)
    ? source.messages
        .map((item, messageIndex) => normalizeConversationMessage(item, messageIndex))
        .filter((item) => item.text)
    : [];
  const messages = dedupeConversationMessageList(normalizedMessages).messages;
  const promptSettings = normalizeConversationPromptSettings(source.promptSettings);
  return {
    id: String(source.id || `conversation_${index}_${hashText(source.contactId)}`),
    contactId: String(source.contactId || ""),
    contactNameSnapshot: String(source.contactNameSnapshot || "").trim(),
    contactAvatarImageSnapshot: String(source.contactAvatarImageSnapshot || "").trim(),
    contactAvatarTextSnapshot: String(source.contactAvatarTextSnapshot || "").trim(),
    promptSettings,
    sceneMode: String(source.sceneMode || "").trim().toLowerCase() === "offline" ? "offline" : "online",
    allowAiPresenceUpdate: Boolean(source.allowAiPresenceUpdate),
    allowAiProactiveMessage: Boolean(source.allowAiProactiveMessage),
    allowAiAutoSchedule: Boolean(source.allowAiAutoSchedule),
    autoScheduleDays: normalizeAutoScheduleDays(source.autoScheduleDays, DEFAULT_AUTO_SCHEDULE_DAYS),
    autoScheduleTime: normalizeAutoScheduleTime(source.autoScheduleTime),
    autoScheduleLastRunDate: /^\d{4}-\d{2}-\d{2}$/.test(String(source.autoScheduleLastRunDate || "").trim())
      ? String(source.autoScheduleLastRunDate || "").trim()
      : "",
    voiceCallState: normalizeVoiceCallState(source.voiceCallState),
    messages,
    awarenessCounter: Math.max(
      0,
      Number.parseInt(String(source.awarenessCounter || 0), 10) || 0
    ),
    replyContextVersion: Math.max(
      0,
      Number.parseInt(String(source.replyContextVersion || 0), 10) || 0
    ),
    memorySummaryCounter: Math.max(
      0,
      Number.parseInt(String(source.memorySummaryCounter || 0), 10) || 0
    ),
    memorySummaryLastMessageCount: normalizeConversationMemorySummaryCursor(
      source.memorySummaryLastMessageCount,
      messages.length
    ),
    updatedAt: Number(source.updatedAt) || messages[messages.length - 1]?.createdAt || Date.now(),
    lastMutatedAt:
      Number(source.lastMutatedAt) ||
      Number(source.updatedAt) ||
      messages[messages.length - 1]?.updatedAt ||
      messages[messages.length - 1]?.createdAt ||
      Date.now()
  };
}

function stripConversationVideoMediaFields(conversations = []) {
  return (Array.isArray(conversations) ? conversations : []).map((conversation) => {
    if (!conversation || typeof conversation !== "object") {
      return conversation;
    }
    const { videoContactImage: _videoContactImage, videoUserImage: _videoUserImage, ...rest } =
      conversation;
    return rest;
  });
}

function migrateLegacyConversationVideoMedia(conversations = [], storageKey = "") {
  const source = Array.isArray(conversations) ? conversations : [];
  if (!source.length) {
    return source;
  }

  let hasLegacyMedia = false;
  let mediaMap = loadConversationVideoMediaMap();
  let mediaChanged = false;
  const strippedConversations = source.map((conversation) => {
    if (!conversation || typeof conversation !== "object") {
      return conversation;
    }
    const resolvedContactId = String(conversation.contactId || "").trim();
    const videoContactImage = String(conversation.videoContactImage || "").trim();
    const videoUserImage = String(conversation.videoUserImage || "").trim();
    if (videoContactImage || videoUserImage) {
      hasLegacyMedia = true;
      if (resolvedContactId) {
        const currentEntry = mediaMap[resolvedContactId] || {};
        const nextEntry = {
          videoContactImage: currentEntry.videoContactImage || videoContactImage,
          videoUserImage: currentEntry.videoUserImage || videoUserImage
        };
        if (
          nextEntry.videoContactImage !== currentEntry.videoContactImage ||
          nextEntry.videoUserImage !== currentEntry.videoUserImage
        ) {
          mediaMap = {
            ...mediaMap,
            [resolvedContactId]: nextEntry
          };
          mediaChanged = true;
        }
      }
    }
    const { videoContactImage: _videoContactImage, videoUserImage: _videoUserImage, ...rest } =
      conversation;
    return rest;
  });

  if (!hasLegacyMedia) {
    return source;
  }

  let mediaPersisted = true;
  if (mediaChanged) {
    mediaPersisted = persistConversationVideoMediaMap(mediaMap);
    if (!mediaPersisted && storageKey) {
      const strippedPayload = JSON.stringify(strippedConversations);
      const strippedPersisted = safeSetItem(storageKey, strippedPayload);
      if (strippedPersisted) {
        mediaPersisted = persistConversationVideoMediaMap(mediaMap);
      }
    }
  }

  if (!mediaPersisted) {
    console.warn("[Pulse Messages] Failed to migrate legacy video media out of conversation storage.");
    return source;
  }

  if (storageKey) {
    safeSetItem(storageKey, JSON.stringify(strippedConversations));
  }

  return strippedConversations;
}

function loadConversations() {
  const storageKey = safeGetItem(MESSAGE_THREADS_KEY)
    ? MESSAGE_THREADS_KEY
    : safeGetItem(DIRECT_MESSAGES_KEY)
      ? DIRECT_MESSAGES_KEY
      : "";
  const raw = storageKey ? safeGetItem(storageKey) : null;
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    const migrated = migrateLegacyConversationVideoMedia(parsed, storageKey);
    return Array.isArray(parsed)
      ? migrated.map((item, index) => normalizeConversation(item, index)).filter(Boolean)
      : [];
  } catch (_error) {
    return [];
  }
}

function normalizeConversationVideoMediaPayload(payload = {}) {
  const source = payload && typeof payload === "object" ? payload : {};
  const normalized = {};
  Object.keys(source).forEach((contactId) => {
    const resolvedContactId = String(contactId || "").trim();
    if (!resolvedContactId) {
      return;
    }
    const entry = source[contactId];
    if (!entry || typeof entry !== "object") {
      return;
    }
    const videoContactImage = String(entry.videoContactImage || "").trim();
    const videoUserImage = String(entry.videoUserImage || "").trim();
    if (!videoContactImage && !videoUserImage) {
      return;
    }
    normalized[resolvedContactId] = {
      videoContactImage,
      videoUserImage
    };
  });
  return normalized;
}

function loadConversationVideoMediaMap() {
  return normalizeConversationVideoMediaPayload(readStoredJson(MESSAGE_VIDEO_MEDIA_KEY, {}));
}

function persistConversationVideoMediaMap(payload = {}) {
  const normalized = normalizeConversationVideoMediaPayload(payload);
  return safeSetItem(MESSAGE_VIDEO_MEDIA_KEY, JSON.stringify(normalized));
}

function getStoredConversationVideoMedia(conversation = getConversationById()) {
  const resolvedContactId = String(conversation?.contactId || "").trim();
  if (!resolvedContactId) {
    return null;
  }
  const payload = loadConversationVideoMediaMap();
  return payload[resolvedContactId] || null;
}

function cloneConversationsForStorage(conversations = []) {
  return stripConversationVideoMediaFields(Array.isArray(conversations) ? conversations : []).map(
    (conversation) => ({
      ...conversation,
      messages: Array.isArray(conversation?.messages)
        ? conversation.messages.map((message) => ({ ...message }))
        : []
    })
  );
}

function trimConversationMessagesForStorage(conversations = []) {
  return cloneConversationsForStorage(conversations).map((conversation) => {
    if (conversation.messages.length > CONVERSATION_SOFT_MESSAGE_LIMIT) {
      const removedCount = conversation.messages.length - CONVERSATION_SOFT_MESSAGE_LIMIT;
      conversation.messages = conversation.messages.slice(-CONVERSATION_SOFT_MESSAGE_LIMIT);
      adjustConversationMemorySummaryCursorAfterTrim(conversation, removedCount);
      recalculateConversationUpdatedAt(conversation);
      return conversation;
    }
    adjustConversationMemorySummaryCursorAfterTrim(conversation, 0);
    return conversation;
  });
}

function stripOldConversationImagePayloads(
  conversations = [],
  keepCount = CONVERSATION_IMAGE_PAYLOAD_KEEP_COUNT
) {
  const normalizedKeepCount = Math.max(0, Number.parseInt(String(keepCount || 0), 10) || 0);
  return cloneConversationsForStorage(conversations).map((conversation) => {
    const imageIndexes = conversation.messages.reduce((indexes, message, index) => {
      if (String(message?.imageDataUrl || "").trim()) {
        indexes.push(index);
      }
      return indexes;
    }, []);
    if (imageIndexes.length <= normalizedKeepCount) {
      return conversation;
    }
    const keepIndexes = new Set(imageIndexes.slice(-normalizedKeepCount));
    conversation.messages = conversation.messages.map((message, index) => {
      if (!String(message?.imageDataUrl || "").trim() || keepIndexes.has(index)) {
        return message;
      }
      return {
        ...message,
        imageDataUrl: "",
        text: buildImageMessageText(String(message?.imageDescription || "").trim())
      };
    });
    return conversation;
  });
}

function pruneOldestConversationBatch(conversations = []) {
  const candidates = (Array.isArray(conversations) ? conversations : [])
    .filter((conversation) => Array.isArray(conversation?.messages))
    .filter((conversation) => conversation.messages.length > CONVERSATION_MIN_MESSAGE_LIMIT)
    .sort((left, right) => {
      const leftIsActive = left.id === state.activeConversationId ? 1 : 0;
      const rightIsActive = right.id === state.activeConversationId ? 1 : 0;
      return (
        leftIsActive - rightIsActive ||
        (left.updatedAt || 0) - (right.updatedAt || 0) ||
        left.messages.length - right.messages.length
      );
    });

  const target = candidates[0] || null;
  if (!target) {
    return false;
  }

  const removableCount = Math.max(
    1,
    Math.min(
      12,
      target.messages.length - CONVERSATION_MIN_MESSAGE_LIMIT,
      Math.ceil(target.messages.length / 12)
    )
  );
  target.messages = target.messages.slice(removableCount);
  adjustConversationMemorySummaryCursorAfterTrim(target, removableCount);
  recalculateConversationUpdatedAt(target);
  return true;
}

function persistConversations(options = {}) {
  const persistOptions = options && typeof options === "object" ? options : {};
  const shouldDeferMaintenance = Boolean(persistOptions.deferMaintenance);
  const sourceConversations = Array.isArray(persistOptions.sourceConversations)
    ? persistOptions.sourceConversations
    : state.conversations;
  const shouldUpdateStateAfterPersist =
    !Boolean(persistOptions.mirrorOnly) &&
    (Boolean(persistOptions.forceStateRewrite) || !state.chatCloudHydrated || state.chatReadonlyMode);
  const shouldFallbackToMaintenanceOnFailure =
    Object.prototype.hasOwnProperty.call(persistOptions, "fallbackToMaintenanceOnFailure")
      ? Boolean(persistOptions.fallbackToMaintenanceOnFailure)
      : true;

  if (shouldDeferMaintenance) {
    const nextConversations = cloneConversationsForStorage(sourceConversations);
    const payload = JSON.stringify(nextConversations);
    const persisted = safeSetItem(MESSAGE_THREADS_KEY, payload);
    if (persisted || !shouldFallbackToMaintenanceOnFailure) {
      if (shouldUpdateStateAfterPersist) {
        state.conversations = nextConversations
          .map((conversation, index) => normalizeConversation(conversation, index))
          .filter(Boolean);
      }
      return persisted;
    }
  }

  let nextConversations = trimConversationMessagesForStorage(sourceConversations);
  let payload = JSON.stringify(nextConversations);
  let attemptedAggressiveImageStrip = false;

  if (payload.length > CONVERSATION_STORAGE_TARGET_CHARS) {
    nextConversations = stripOldConversationImagePayloads(nextConversations);
    payload = JSON.stringify(nextConversations);
  }

  while (payload.length > CONVERSATION_STORAGE_TARGET_CHARS) {
    const changed = pruneOldestConversationBatch(nextConversations);
    if (!changed) {
      break;
    }
    payload = JSON.stringify(nextConversations);
  }

  let persisted = safeSetItem(MESSAGE_THREADS_KEY, payload);
  while (!persisted) {
    if (!attemptedAggressiveImageStrip) {
      const strippedConversations = stripOldConversationImagePayloads(nextConversations, 0);
      const strippedPayload = JSON.stringify(strippedConversations);
      attemptedAggressiveImageStrip = true;
      if (strippedPayload !== payload) {
        nextConversations = strippedConversations;
        payload = strippedPayload;
        persisted = safeSetItem(MESSAGE_THREADS_KEY, payload);
        if (persisted) {
          break;
        }
      }
    }
    const changed = pruneOldestConversationBatch(nextConversations);
    if (!changed) {
      break;
    }
    payload = JSON.stringify(nextConversations);
    persisted = safeSetItem(MESSAGE_THREADS_KEY, payload);
  }

  if (!persisted) {
    console.warn("[Pulse Messages] Conversation storage write failed after fallback pruning.");
  }

  if (shouldUpdateStateAfterPersist) {
    state.conversations = nextConversations
      .map((conversation, index) => normalizeConversation(conversation, index))
      .filter(Boolean);
  }
  return persisted;
}

function scheduleConversationStorageMaintenance(delayMs = 120) {
  if (conversationStorageMaintenanceTimerId) {
    window.clearTimeout(conversationStorageMaintenanceTimerId);
  }
  conversationStorageMaintenanceTimerId = window.setTimeout(() => {
    conversationStorageMaintenanceTimerId = 0;
    if (state.requestingConversationId || state.sendingConversationId) {
      scheduleConversationStorageMaintenance(delayMs);
      return;
    }
    persistConversations({
      mirrorOnly: true
    });
  }, Math.max(0, Number(delayMs) || 0));
}

function normalizeMessageShareInboxEntry(entry, index = 0) {
  const source = entry && typeof entry === "object" ? entry : {};
  const payload = normalizeDiscussionSharePayload(
    source.payload || source.discussionSharePayload || source.discussionShare
  );
  const targetConversationId = String(
    source.targetConversationId || source.conversationId || ""
  ).trim();
  const targetContactId = String(source.targetContactId || source.contactId || "").trim();
  if (!payload || (!targetConversationId && !targetContactId)) {
    return null;
  }
  const createdAt = Number(source.createdAt) || Date.now() + index;
  return {
    id:
      String(source.id || "").trim() ||
      `message_share_${createdAt}_${hashText(`${targetConversationId}_${targetContactId}_${payload.id}`)}`,
    targetConversationId,
    targetContactId,
    targetNameSnapshot: String(source.targetNameSnapshot || source.contactNameSnapshot || "").trim(),
    targetAvatarImageSnapshot: "",
    targetAvatarTextSnapshot: String(
      source.targetAvatarTextSnapshot || source.contactAvatarTextSnapshot || ""
    ).trim(),
    createdAt,
    payload
  };
}

function loadMessageShareInbox() {
  const raw = readStoredJson(MESSAGE_SHARE_INBOX_KEY, []);
  return Array.isArray(raw)
    ? raw
        .map((entry, index) => normalizeMessageShareInboxEntry(entry, index))
        .filter(Boolean)
    : [];
}

function persistMessageShareInbox(entries = []) {
  return safeSetItem(
    MESSAGE_SHARE_INBOX_KEY,
    JSON.stringify(Array.isArray(entries) ? entries : [])
  );
}

function bindConversationHistoryPendingImages(historyEl = null) {
  const resolvedHistoryEl =
    historyEl instanceof HTMLElement
      ? historyEl
      : messagesContentEl?.querySelector(".messages-conversation__history");
  if (!(resolvedHistoryEl instanceof HTMLElement)) {
    return;
  }

  const anchorThreshold = 36;
  [...resolvedHistoryEl.querySelectorAll(".messages-image-card img")].forEach((imageEl) => {
    if (!(imageEl instanceof HTMLImageElement) || imageEl.complete) {
      return;
    }

    const remaining = Math.max(
      0,
      resolvedHistoryEl.scrollHeight - resolvedHistoryEl.clientHeight - resolvedHistoryEl.scrollTop
    );
    const currentTop = Math.max(0, Number(resolvedHistoryEl.scrollTop) || 0);
    const previousAnchorRemaining = Number.parseFloat(
      String(imageEl.dataset.messagesAnchorRemaining || "")
    );
    if (!Number.isFinite(previousAnchorRemaining) || remaining <= anchorThreshold) {
      imageEl.dataset.messagesAnchorTop = String(currentTop);
      imageEl.dataset.messagesAnchorRemaining = String(remaining);
    }

    if (imageEl.dataset.messagesLoadScrollBound === "1") {
      return;
    }
    imageEl.dataset.messagesLoadScrollBound = "1";

    const settleImage = () => {
      delete imageEl.dataset.messagesLoadScrollBound;
      const activeHistoryEl = messagesContentEl?.querySelector(".messages-conversation__history");
      if (!(activeHistoryEl instanceof HTMLElement) || activeHistoryEl !== resolvedHistoryEl) {
        delete imageEl.dataset.messagesAnchorTop;
        delete imageEl.dataset.messagesAnchorRemaining;
        return;
      }

      const anchorTop = Math.max(
        0,
        Number.parseFloat(String(imageEl.dataset.messagesAnchorTop || "")) || 0
      );
      const rawAnchorRemaining = Number.parseFloat(
        String(imageEl.dataset.messagesAnchorRemaining || "")
      );
      const anchorRemaining = Number.isFinite(rawAnchorRemaining) ? rawAnchorRemaining : Infinity;
      delete imageEl.dataset.messagesAnchorTop;
      delete imageEl.dataset.messagesAnchorRemaining;

      const userStayedNearBottom =
        anchorRemaining <= anchorThreshold &&
        activeHistoryEl.scrollTop >= Math.max(0, anchorTop - 24);
      if (!userStayedNearBottom && !isConversationHistoryNearBottom(96)) {
        return;
      }

      window.requestAnimationFrame(() => {
        const currentHistoryEl = messagesContentEl?.querySelector(".messages-conversation__history");
        if (!(currentHistoryEl instanceof HTMLElement) || currentHistoryEl !== activeHistoryEl) {
          return;
        }
        currentHistoryEl.scrollTop = currentHistoryEl.scrollHeight;
      });
    };

    imageEl.addEventListener("load", settleImage, { once: true });
    imageEl.addEventListener("error", settleImage, { once: true });
  });
}

function ensureConversationForDiscussionShare(entry = null) {
  const normalizedEntry =
    entry && typeof entry === "object" ? entry : normalizeMessageShareInboxEntry(entry);
  if (!normalizedEntry) {
    return null;
  }
  const targetConversationId = String(normalizedEntry.targetConversationId || "").trim();
  const targetContactId = String(normalizedEntry.targetContactId || "").trim();
  const existingConversation =
    (targetConversationId ? getConversationById(targetConversationId) : null) ||
    (targetContactId
      ? state.conversations.find(
          (conversation) => String(conversation?.contactId || "").trim() === targetContactId
        ) || null
      : null);
  if (existingConversation) {
    return existingConversation;
  }
  if (!targetContactId) {
    return null;
  }
  const contact = getContactById(targetContactId);
  if (!contact) {
    return null;
  }
  return createConversation(contact);
}

function consumePendingMessageShareInbox() {
  const inbox = loadMessageShareInbox();
  if (!inbox.length) {
    return 0;
  }

  let consumedCount = 0;
  const unresolvedEntries = [];
  const insertedEntries = [];
  const insertedConversationIds = new Set();

  inbox.forEach((entry, index) => {
    const conversation = ensureConversationForDiscussionShare(entry);
    if (!conversation) {
      unresolvedEntries.push(entry);
      return;
    }

    const messageId = `discussion_share_${String(entry.id || index).trim()}`;
    const alreadyExists = Array.isArray(conversation.messages)
      ? conversation.messages.some(
          (message) => String(message?.id || "").trim() === messageId
        )
      : false;
    if (alreadyExists) {
      consumedCount += 1;
      return;
    }

    const createdAt = Number(entry.createdAt) || Date.now();
    const insertedMessage = normalizeConversationMessage(
      {
        id: messageId,
        role: "user",
        messageType: "discussion_share",
        discussionSharePayload: entry.payload,
        needsReply: true,
        time: formatLocalTime(new Date(createdAt)),
        createdAt
      },
      Array.isArray(conversation.messages) ? conversation.messages.length : 0
    );
    conversation.messages = [
      ...(Array.isArray(conversation.messages) ? conversation.messages : []),
      insertedMessage
    ];
    conversation.updatedAt = insertedMessage.createdAt;
    markConversationMutated(conversation, insertedMessage.updatedAt || insertedMessage.createdAt);
    bumpConversationReplyContextVersion(conversation);
    insertedEntries.push(entry);
    insertedConversationIds.add(String(conversation.id || "").trim());
    consumedCount += 1;
  });

  let nextInbox = unresolvedEntries;
  if (insertedEntries.length) {
    const persisted = persistConversations();
    if (!persisted) {
      nextInbox = [...unresolvedEntries, ...insertedEntries];
      console.warn("[Pulse Messages] Discussion share delivery is kept in inbox for retry.");
    } else {
      insertedConversationIds.forEach((conversationId) => {
        enqueueConversationChatSyncUpsert(conversationId, {
          reason: "mutation",
          scheduleFlush: false
        });
      });
    }
  }
  if (nextInbox.length !== inbox.length) {
    persistMessageShareInbox(nextInbox);
  }
  return consumedCount;
}

function getContactById(contactId) {
  return state.contacts.find((item) => item.id === contactId) || null;
}

function getConversationById(conversationId = state.activeConversationId) {
  return state.conversations.find((item) => item.id === conversationId) || null;
}

function getConversationByContactId(contactId = "") {
  const resolvedContactId = String(contactId || "").trim();
  if (!resolvedContactId) {
    return null;
  }
  return (
    state.conversations.find(
      (item) => String(item?.contactId || "").trim() === resolvedContactId
    ) || null
  );
}

function getConversationDraft(conversationId = state.activeConversationId) {
  const key = String(conversationId || "").trim();
  if (!key) {
    return "";
  }
  return String(state.conversationDrafts?.[key] || "");
}

function setConversationDraft(conversationId = state.activeConversationId, value = "") {
  const key = String(conversationId || "").trim();
  if (!key) {
    return;
  }
  if (!state.conversationDrafts || typeof state.conversationDrafts !== "object") {
    state.conversationDrafts = {};
  }
  const normalizedValue = String(value || "").slice(0, 600);
  if (normalizedValue) {
    state.conversationDrafts[key] = normalizedValue;
    return;
  }
  delete state.conversationDrafts[key];
}

function getPendingUserMessageIdSet(conversation = null) {
  return new Set(
    (Array.isArray(conversation?.messages) ? conversation.messages : [])
      .filter((message) => message?.role === "user" && message?.needsReply)
      .map((message) => String(message?.id || "").trim())
      .filter(Boolean)
  );
}

function clearConversationPendingReplyFlags(conversation = null, messageIds = []) {
  if (!conversation || typeof conversation !== "object") {
    return false;
  }
  const targetIdSet = new Set(
    normalizeObjectArray(messageIds)
      .map((messageId) => String(messageId || "").trim())
      .filter(Boolean)
  );
  if (!targetIdSet.size || !Array.isArray(conversation.messages) || !conversation.messages.length) {
    return false;
  }
  let changed = false;
  conversation.messages = conversation.messages.map((message) => {
    const messageId = String(message?.id || "").trim();
    if (
      message?.role === "user" &&
      message?.needsReply &&
      messageId &&
      targetIdSet.has(messageId)
    ) {
      changed = true;
      return {
        ...message,
        needsReply: false
      };
    }
    return message;
  });
  return changed;
}

function repairStalePendingUserMessages(conversation = null, options = {}) {
  if (!conversation || typeof conversation !== "object" || !Array.isArray(conversation.messages)) {
    return false;
  }
  const repairOptions = options && typeof options === "object" ? options : {};
  const resolvedConversationId = String(conversation.id || "").trim();
  const hasPendingReveal =
    resolvedConversationId &&
    String(state.pendingAssistantReveal?.conversationId || "").trim() === resolvedConversationId;
  if (repairOptions.skipWhenBusy && (isConversationReplyBusy(resolvedConversationId) || hasPendingReveal)) {
    return false;
  }
  let sawAssistantAfter = false;
  let changed = false;
  const nextMessages = conversation.messages.slice();
  for (let index = nextMessages.length - 1; index >= 0; index -= 1) {
    const message = nextMessages[index];
    if (!message || typeof message !== "object") {
      continue;
    }
    if (message.role === "assistant") {
      sawAssistantAfter = true;
      continue;
    }
    if (message.role === "user" && message.needsReply && sawAssistantAfter) {
      nextMessages[index] = {
        ...message,
        needsReply: false
      };
      changed = true;
    }
  }
  if (!changed) {
    return false;
  }
  conversation.messages = nextMessages;
  if (repairOptions.persist) {
    persistConversations();
  }
  return true;
}

function shouldPreferLocalConversationState(localConversation = null, loadedConversation = null) {
  if (!localConversation?.id) {
    return false;
  }
  if (!loadedConversation?.id) {
    return getPendingUserMessageIdSet(localConversation).size > 0;
  }
  const localPendingIds = getPendingUserMessageIdSet(localConversation);
  const loadedPendingIds = getPendingUserMessageIdSet(loadedConversation);
  const localReplyContextVersion = getConversationReplyContextVersion(localConversation);
  const loadedReplyContextVersion = getConversationReplyContextVersion(loadedConversation);
  const localUpdatedAt = Number(localConversation.updatedAt) || 0;
  const loadedUpdatedAt = Number(loadedConversation.updatedAt) || 0;
  const localMessageCount = Array.isArray(localConversation.messages) ? localConversation.messages.length : 0;
  const loadedMessageCount = Array.isArray(loadedConversation.messages) ? loadedConversation.messages.length : 0;

  const loadedLooksLikeNewerReplyState =
    loadedReplyContextVersion >= localReplyContextVersion &&
    loadedUpdatedAt > localUpdatedAt &&
    (
      loadedMessageCount > localMessageCount ||
      (localPendingIds.size > 0 && loadedPendingIds.size === 0 && loadedMessageCount >= localMessageCount)
    );
  if (loadedLooksLikeNewerReplyState) {
    return false;
  }

  if (loadedReplyContextVersion > localReplyContextVersion) {
    return false;
  }
  if ([...localPendingIds].some((messageId) => !loadedPendingIds.has(messageId))) {
    return true;
  }
  if (localReplyContextVersion > loadedReplyContextVersion) {
    return true;
  }
  if (
    localUpdatedAt > loadedUpdatedAt &&
    localMessageCount >= loadedMessageCount
  ) {
    return true;
  }
  return false;
}

function mergePreferredLocalConversations(currentConversations = [], loadedConversations = []) {
  const merged = Array.isArray(loadedConversations) ? loadedConversations.slice() : [];
  const loadedIndexById = new Map(
    merged.map((conversation, index) => [String(conversation?.id || "").trim(), index]).filter((item) => item[0])
  );
  (Array.isArray(currentConversations) ? currentConversations : []).forEach((conversation) => {
    const conversationId = String(conversation?.id || "").trim();
    if (!conversationId) {
      return;
    }
    const loadedIndex = loadedIndexById.get(conversationId);
    if (loadedIndex == null) {
      if (shouldPreferLocalConversationState(conversation, null)) {
        loadedIndexById.set(conversationId, merged.length);
        merged.push(conversation);
      }
      return;
    }
    const loadedConversation = merged[loadedIndex];
    if (shouldPreferLocalConversationState(conversation, loadedConversation)) {
      merged[loadedIndex] = conversation;
    }
  });
  return merged;
}

function getConversationReplyContextVersion(conversation = null) {
  return Math.max(
    0,
    Number.parseInt(String(conversation?.replyContextVersion || 0), 10) || 0
  );
}

function bumpConversationReplyContextVersion(conversation = null) {
  if (!conversation || typeof conversation !== "object") {
    return 0;
  }
  const nextVersion = getConversationReplyContextVersion(conversation) + 1;
  conversation.replyContextVersion = nextVersion;
  return nextVersion;
}

function isConversationReplyBusy(conversationId = "") {
  const resolvedConversationId = String(conversationId || "").trim();
  if (!resolvedConversationId) {
    return false;
  }
  return (
    state.requestingConversationId === resolvedConversationId ||
    state.sendingConversationId === resolvedConversationId
  );
}

function cancelConversationReplyWork(conversationId = "", options = {}) {
  const resolvedConversationId = String(conversationId || "").trim();
  if (!resolvedConversationId) {
    return 0;
  }
  const removedCount = clearReplyTasksForConversation(resolvedConversationId, options);
  if (state.requestingConversationId === resolvedConversationId) {
    state.requestingConversationId = "";
  }
  if (state.sendingConversationId === resolvedConversationId) {
    state.sendingConversationId = "";
  }
  return removedCount;
}

function isConversationReplyContextCurrent(conversationId = "", expectedVersion = 0) {
  const resolvedConversationId = String(conversationId || "").trim();
  if (!resolvedConversationId) {
    return false;
  }
  const conversation = getConversationById(resolvedConversationId);
  if (!conversation) {
    return false;
  }
  return getConversationReplyContextVersion(conversation) === Math.max(
    0,
    Number.parseInt(String(expectedVersion || 0), 10) || 0
  );
}

function getResolvedConversationContact(conversation = getConversationById()) {
  const resolvedConversation = conversation && typeof conversation === "object" ? conversation : null;
  const contactId = String(resolvedConversation?.contactId || "").trim();
  if (!contactId) {
    return null;
  }
  const storedContact =
    getContactById(contactId) ||
    normalizeObjectArray(loadContacts(state.conversations)).find(
      (item) => String(item.id || "").trim() === contactId
    ) ||
    null;
  if (storedContact) {
    return storedContact;
  }
  const snapshotName = String(resolvedConversation?.contactNameSnapshot || "").trim();
  if (!snapshotName) {
    return null;
  }
  return {
    id: contactId,
    name: snapshotName,
    avatarImage: String(resolvedConversation?.contactAvatarImageSnapshot || "").trim(),
    avatarText:
      String(resolvedConversation?.contactAvatarTextSnapshot || "").trim() || snapshotName.slice(0, 1),
    personaPrompt: "",
    userSpecialPersona: "",
    roleSpecialPersona: "",
    forumFandomEnabled: false,
    forumFandomTabId: "",
    forumFandomTabName: "",
    forumFandomAudience: ""
  };
}

function getQuotedConversationMessage(conversation = getConversationById()) {
  const resolvedConversation = conversation && typeof conversation === "object" ? conversation : null;
  if (!resolvedConversation) {
    return null;
  }
  const targetId = String(state.quotedMessageId || "").trim();
  if (!targetId) {
    return null;
  }
  return resolvedConversation.messages.find((message) => message.id === targetId) || null;
}

function resolveConversationVisibleMessageCount(conversationId = state.activeConversationId) {
  const conversation = getConversationById(conversationId);
  const total = Array.isArray(conversation?.messages) ? conversation.messages.length : 0;
  const key = String(conversationId || "").trim();
  if (!key) {
    return 0;
  }
  if (!total) {
    state.conversationVisibleCounts[key] = 0;
    return 0;
  }
  const stored = Number.parseInt(String(state.conversationVisibleCounts[key] || 0), 10);
  let nextCount = 0;
  if (total <= CONVERSATION_RENDER_BATCH_SIZE) {
    nextCount = total;
  } else if (Number.isFinite(stored) && stored > CONVERSATION_RENDER_BATCH_SIZE) {
    nextCount = Math.min(total, stored);
  } else {
    nextCount = CONVERSATION_RENDER_BATCH_SIZE;
  }
  state.conversationVisibleCounts[key] = nextCount;
  return nextCount;
}

function resetConversationVisibleMessageCount(conversationId = state.activeConversationId) {
  const conversation = getConversationById(conversationId);
  const key = String(conversationId || "").trim();
  if (!key) {
    return 0;
  }
  const total = Array.isArray(conversation?.messages) ? conversation.messages.length : 0;
  const nextCount = Math.min(total, CONVERSATION_RENDER_BATCH_SIZE);
  state.conversationVisibleCounts[key] = nextCount;
  return nextCount;
}

function expandConversationVisibleMessageCount(
  conversationId = state.activeConversationId,
  amount = CONVERSATION_RENDER_BATCH_SIZE
) {
  const conversation = getConversationById(conversationId);
  const key = String(conversationId || "").trim();
  if (!conversation || !key) {
    return 0;
  }
  const total = Array.isArray(conversation.messages) ? conversation.messages.length : 0;
  const current = resolveConversationVisibleMessageCount(conversationId);
  const nextCount = Math.min(total, current + Math.max(1, Number(amount) || 0));
  state.conversationVisibleCounts[key] = nextCount;
  return nextCount;
}

function buildConversationRenderWindow(conversation) {
  const messages = Array.isArray(conversation?.messages) ? conversation.messages : [];
  const total = messages.length;
  const visibleCount = resolveConversationVisibleMessageCount(conversation?.id);
  const hiddenCount = Math.max(0, total - visibleCount);
  return {
    total,
    visibleCount,
    hiddenCount,
    visibleMessages: hiddenCount ? messages.slice(total - visibleCount) : messages
  };
}

function getConversationMeta(conversation) {
  const contact = getResolvedConversationContact(conversation);
  if (contact) {
    return {
      name: contact.name,
      avatarImage: contact.avatarImage,
      avatarText: contact.avatarText || getContactAvatarFallback(contact),
      personaPrompt: contact.personaPrompt
    };
  }

  return {
    name: conversation.contactNameSnapshot || "未命名联系人",
    avatarImage: conversation.contactAvatarImageSnapshot || "",
    avatarText: conversation.contactAvatarTextSnapshot || "联",
    personaPrompt: ""
  };
}

function getConversationSnapshotName(conversation = {}) {
  const contactId = String(conversation?.contactId || "").trim();
  const contact = contactId ? getContactById(contactId) : null;
  const contactName = String(contact?.name || "").trim();
  const snapshotName = String(conversation?.contactNameSnapshot || "").trim();
  return contactName || snapshotName || "未命名联系人";
}

function getConversationSnapshotAvatarImage(conversation = {}) {
  const contactId = String(conversation?.contactId || "").trim();
  const contact = contactId ? getContactById(contactId) : null;
  return String(contact?.avatarImage || conversation?.contactAvatarImageSnapshot || "").trim();
}

function getConversationSnapshotAvatarText(conversation = {}) {
  const contactId = String(conversation?.contactId || "").trim();
  const contact = contactId ? getContactById(contactId) : null;
  const name = getConversationSnapshotName(conversation);
  return (
    String(contact?.avatarText || conversation?.contactAvatarTextSnapshot || "").trim() ||
    getContactAvatarFallback({ name })
  );
}

function buildConversationListAvatarMarkup(conversation = {}) {
  const avatarImage = getConversationSnapshotAvatarImage(conversation);
  const avatarText = getConversationSnapshotAvatarText(conversation);
  return avatarImage
    ? `<img src="${escapeHtml(avatarImage)}" alt="${escapeHtml(getConversationSnapshotName(conversation))} 的头像" />`
    : `<span>${escapeHtml(avatarText)}</span>`;
}

function getConversationPreviewSafe(conversation = {}) {
  if (isConversationVoiceCallActive(conversation)) {
    return getConversationActiveCallMode(conversation) === "video" ? "📹 正在视频中" : "📞 正在通话中";
  }
  const messages = Array.isArray(conversation?.messages) ? conversation.messages : [];
  const latestMessage = messages.length ? messages[messages.length - 1] : null;
  if (!latestMessage) {
    return "";
  }
  try {
    return truncate(getConversationMessagePreviewText(latestMessage), 46);
  } catch (_error) {
    return truncate(String(latestMessage?.text || "").trim(), 46);
  }
}

function getConversationTimeSafe(conversation = {}) {
  if (isConversationVoiceCallActive(conversation)) {
    return formatLocalTime(
      new Date(getConversationVoiceCallState(conversation).startedAt || Date.now())
    );
  }
  const messages = Array.isArray(conversation?.messages) ? conversation.messages : [];
  const latestMessage = messages.length ? messages[messages.length - 1] : null;
  return String(latestMessage?.time || "").trim();
}

function getConversationPreview(conversation) {
  const latestMessage = conversation.messages[conversation.messages.length - 1] || null;
  return latestMessage ? truncate(getConversationMessagePreviewText(latestMessage), 46) : "";
}

function getConversationTime(conversation) {
  const latestMessage = conversation.messages[conversation.messages.length - 1] || null;
  return latestMessage?.time || "";
}

function sortConversations(conversations) {
  return conversations
    .slice()
    .sort((left, right) => (right.updatedAt || 0) - (left.updatedAt || 0));
}

function syncConversationSnapshots(contact) {
  let changed = false;
  state.conversations = state.conversations.map((conversation) => {
    if (conversation.contactId !== contact.id) {
      return conversation;
    }
    changed = true;
    return {
      ...conversation,
      contactNameSnapshot: contact.name,
      contactAvatarImageSnapshot: contact.avatarImage,
      contactAvatarTextSnapshot: contact.avatarText || getContactAvatarFallback(contact)
    };
  });
  if (changed) {
    persistConversations();
  }
}

function createConversation(contact) {
  const existingConversation =
    state.conversations.find((item) => item.contactId === contact.id) || null;
  if (existingConversation) {
    return existingConversation;
  }

  const conversation = {
    id: `conversation_${Date.now()}_${hashText(contact.id)}`,
    contactId: contact.id,
    contactNameSnapshot: contact.name,
    contactAvatarImageSnapshot: contact.avatarImage,
    contactAvatarTextSnapshot: contact.avatarText || getContactAvatarFallback(contact),
    promptSettings: buildConversationPromptSettingsBase(),
    sceneMode: "online",
    allowAiPresenceUpdate: false,
    allowAiProactiveMessage: false,
    allowAiAutoSchedule: false,
    autoScheduleDays: DEFAULT_AUTO_SCHEDULE_DAYS,
    autoScheduleTime: "",
    autoScheduleLastRunDate: "",
    voiceCallState: normalizeVoiceCallState(),
    messages: [],
    awarenessCounter: 0,
    replyContextVersion: 0,
    memorySummaryCounter: 0,
    memorySummaryLastMessageCount: 0,
    updatedAt: Date.now(),
    lastMutatedAt: Date.now()
  };
  state.conversations = [conversation, ...state.conversations];
  persistConversations();
  return conversation;
}

function buildConversationSnapshotForContact(contact = null) {
  const resolvedContact = contact && typeof contact === "object" ? contact : null;
  if (!resolvedContact?.id) {
    return null;
  }
  const now = Date.now();
  return normalizeConversation(
    {
      id: `conversation_${now}_${hashText(resolvedContact.id)}`,
      contactId: resolvedContact.id,
      contactNameSnapshot: resolvedContact.name,
      contactAvatarImageSnapshot: resolvedContact.avatarImage,
      contactAvatarTextSnapshot:
        resolvedContact.avatarText || getContactAvatarFallback(resolvedContact),
      promptSettings: buildConversationPromptSettingsBase(),
      sceneMode: "online",
      allowAiPresenceUpdate: false,
      allowAiProactiveMessage: false,
      allowAiAutoSchedule: false,
      autoScheduleDays: DEFAULT_AUTO_SCHEDULE_DAYS,
      autoScheduleTime: "",
      autoScheduleLastRunDate: "",
      voiceCallState: normalizeVoiceCallState(),
      messages: [],
      awarenessCounter: 0,
      replyContextVersion: 0,
      memorySummaryCounter: 0,
      memorySummaryLastMessageCount: 0,
      updatedAt: now,
      lastMutatedAt: now
    },
    0
  );
}

async function ensureConversationAvailableForContact(contact = null, options = {}) {
  const resolvedContact = contact && typeof contact === "object" ? contact : null;
  if (!resolvedContact?.id) {
    return null;
  }
  const existingConversation =
    getConversationByContactId(resolvedContact.id) ||
    state.conversations.find((item) => String(item?.contactId || "").trim() === String(resolvedContact.id).trim()) ||
    null;
  if (existingConversation) {
    return existingConversation;
  }
  if (!ensureChatMutationAllowed("发起新会话")) {
    return null;
  }
  const requestOptions = options && typeof options === "object" ? options : {};
  const conversation = buildConversationSnapshotForContact(resolvedContact);
  if (!conversation) {
    return null;
  }
  await syncConversationSnapshotNow(conversation, requestOptions.reason || "mutation");
  return upsertConversationSnapshotInState(conversation, {
    persistMirror: true,
    deferMaintenance: true,
    fallbackToMaintenanceOnFailure: false
  });
}

function buildMutatedConversationSnapshot(conversation = null, mutator = null) {
  const snapshot = cloneConversationSnapshotForCloud(conversation);
  if (!snapshot) {
    return null;
  }
  const nextConversation =
    typeof mutator === "function" ? mutator(snapshot) || snapshot : snapshot;
  return normalizeConversation(nextConversation, 0);
}

function normalizeCustomTabs(tabs = []) {
  if (!Array.isArray(tabs)) {
    return [];
  }

  return tabs
    .map((tab, index) => {
      if (typeof tab === "string") {
        const name = String(tab).trim().slice(0, 20) || "自定义页签";
        return {
          id: `custom_${index}_${hashText(name)}`,
          name,
          audience: "",
          discussionText: "",
          hotTopic: "",
          text: "",
          timeAwareness: false,
          worldbookIds: [],
          bubbleFocusEnabled: false,
          bubbleFocusMinutes: DEFAULT_CONTEXT_FOCUS_MINUTES,
          insFocusEnabled: false,
          insFocusMinutes: DEFAULT_CONTEXT_FOCUS_MINUTES,
          mountedEntityRefs: [],
          autoDetectMentionedContacts: true,
          forumDomainType: "general",
          fandomTargetId: "",
          fandomDisplayName: ""
        };
      }
      if (!tab || typeof tab !== "object") {
        return null;
      }
      const rawName = tab.name || tab.label || tab.title || tab.tabName || tab.tabLabel || "";
      const rawAudience =
        tab.audience ||
        tab.userPosition ||
        tab.userProfile ||
        tab.positioning ||
        tab.targetAudience ||
        tab.memberProfile ||
        "";
      const rawDiscussionText =
        tab.discussionText ||
        tab.text ||
        tab.prompt ||
        tab.content ||
        tab.description ||
        "";
      const rawHotTopic =
        tab.hotTopic ||
        tab.hotspot ||
        tab.hotText ||
        tab.topicText ||
        tab.topic ||
        "";
      const rawWorldbookIds =
        tab.worldbookIds ||
        tab.mountedWorldbookIds ||
        tab.worldbooks ||
        tab.worldbookEntries ||
        [];
      return {
        id:
          tab.id ||
          tab.feedId ||
          tab.key ||
          `custom_${index}_${hashText(`${rawName || ""}-${rawDiscussionText || ""}-${rawHotTopic || ""}`)}`,
        name: String(rawName || "自定义页签").trim().slice(0, 20) || "自定义页签",
        audience: String(rawAudience || "").trim(),
        discussionText: String(rawDiscussionText || "").trim(),
        hotTopic: String(rawHotTopic || "").trim(),
        text: String(rawDiscussionText || "").trim(),
        timeAwareness:
          typeof tab.timeAwareness === "boolean"
            ? tab.timeAwareness
            : Boolean(tab.enableTimeAwareness || tab.dateAwareness || tab.timeAware),
        worldbookIds: normalizeMountedIds(rawWorldbookIds),
        bubbleFocusEnabled: Boolean(
          tab.bubbleFocusEnabled || tab.mountBubble || tab.bubbleMounted || tab.bubbleEnabled
        ),
        bubbleFocusMinutes: normalizeContextFocusMinutes(
          tab.bubbleFocusMinutes || tab.bubbleMinutes || tab.bubbleFocusWindow
        ),
        insFocusEnabled: Boolean(
          tab.insFocusEnabled ||
            tab.mountIns ||
            tab.profilePostFocusEnabled ||
            tab.profileMounted ||
            tab.insMounted
        ),
        insFocusMinutes: normalizeContextFocusMinutes(
          tab.insFocusMinutes ||
            tab.insMinutes ||
            tab.profilePostFocusMinutes ||
            tab.profileFocusWindow
        ),
        mountedEntityRefs: normalizeMountedIds(
          tab.mountedEntityRefs ||
            tab.mountedEntities ||
            tab.publicEntityRefs ||
            []
        ),
        autoDetectMentionedContacts:
          typeof tab.autoDetectMentionedContacts === "boolean"
            ? tab.autoDetectMentionedContacts
            : typeof tab.mentionedContactsEnabled === "boolean"
              ? tab.mentionedContactsEnabled
              : true,
        forumDomainType: normalizeForumTabDomainType(
          tab.forumDomainType || tab.domainType || tab.tabDomainType,
          "general"
        ),
        fandomTargetId: String(tab.fandomTargetId || tab.contactId || "").trim(),
        fandomDisplayName: String(tab.fandomDisplayName || tab.fandomTargetName || "").trim()
      };
    })
    .filter(Boolean)
    .map((tab) => ({
      ...tab,
      worldbookIds: normalizeMountedIds(tab.worldbookIds || []),
      mountedEntityRefs: normalizeMountedIds(tab.mountedEntityRefs || []),
      bubbleFocusMinutes: normalizeContextFocusMinutes(tab.bubbleFocusMinutes),
      insFocusMinutes: normalizeContextFocusMinutes(tab.insFocusMinutes),
      autoDetectMentionedContacts:
        typeof tab.autoDetectMentionedContacts === "boolean"
          ? tab.autoDetectMentionedContacts
          : true
    }));
}

function getAvailableCustomTabs(settings = loadSettings()) {
  return normalizeCustomTabs(settings.customTabs || []);
}

function extractRecentEventItems(source, maxCount = 3) {
  const items = [];
  const appendItem = (entry) => {
    if (!entry || typeof entry !== "object") {
      return;
    }
    const rawText =
      typeof entry.text === "string"
        ? entry.text
        : entry.text == null
          ? ""
          : String(entry.text);
    const text = rawText.trim();
    if (!text) {
      return;
    }
    const label = String(entry.displayName || entry.name || entry.handle || "").trim();
    items.push(`${label ? `${label}：` : ""}${truncate(text.replace(/\s+/g, " "), 92)}`);
  };

  if (Array.isArray(source)) {
    source.forEach((entry) => appendItem(entry));
  } else if (source && typeof source === "object") {
    Object.values(source).forEach((bucket) => {
      if (Array.isArray(bucket)) {
        bucket.forEach((entry) => appendItem(entry));
      }
    });
  }

  return items.filter(Boolean).slice(0, maxCount);
}

function formatAwarenessTime(now = new Date()) {
  const date = new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long"
  }).format(now);
  return `${date} ${formatLocalTime(now)}`;
}

function getPromptNow(settings = loadSettings()) {
  return window.PulsePromptConfig?.resolvePromptNow?.(settings, new Date()) || new Date();
}

function extractPostTopic(post) {
  if (!post || typeof post !== "object") {
    return "";
  }
  const tags = Array.isArray(post.tags)
    ? post.tags.map((item) => String(item || "").trim()).filter(Boolean)
    : [];
  if (tags.length) {
    return truncate(tags[0], 40);
  }
  const text = String(post.text || "").trim().replace(/\s+/g, " ");
  if (!text) {
    return "";
  }
  const firstLine = text.split("\n")[0].trim();
  const firstClause = firstLine.split(/[。！？!?]/)[0].trim();
  const firstSegment = firstClause.split(/[，,]/)[0].trim();
  return truncate(firstSegment || firstClause || firstLine, 40);
}

function buildTimeAwarenessContext(promptSettings, settings = loadSettings()) {
  if (!promptSettings.timeAwareness) {
    return "";
  }
  const baseNow = new Date();
  const manualTimeSettings =
    typeof window.PulsePromptConfig?.normalizeManualTimeSettings === "function"
      ? window.PulsePromptConfig.normalizeManualTimeSettings(
          settings?.manualTimeSettings,
          baseNow
        )
      : {
          enabled: Boolean(settings?.manualTimeSettings?.enabled)
        };
  const hasManualPromptTime = Boolean(manualTimeSettings?.enabled);
  const promptNow =
    window.PulsePromptConfig?.resolvePromptNow?.(settings, baseNow) || getPromptNow(settings);
  return `${
    hasManualPromptTime ? "当前生效时间（用户手动设定）" : "当前本地时间"
  }：${formatAwarenessTime(promptNow)}`;
}

function getHotTopicsMountDiagnostics(settings, promptSettings) {
  const diagnostics = {
    selectedTab: null,
    hasDiscussionText: false,
    hasHotTopic: false,
    mountsDiscussionText: false,
    mountsHotTopic: false,
    warnings: []
  };

  if (!promptSettings.hotTopicsEnabled || !promptSettings.hotTopicsTabId) {
    return diagnostics;
  }

  const tabs = getAvailableCustomTabs(settings);
  const selectedTab = tabs.find((tab) => tab.id === promptSettings.hotTopicsTabId) || null;
  if (!selectedTab) {
    return diagnostics;
  }

  const discussionText = String(selectedTab.discussionText || selectedTab.text || "").trim();
  const hotTopic = String(selectedTab.hotTopic || "").trim();

  diagnostics.selectedTab = selectedTab;
  diagnostics.hasDiscussionText = Boolean(discussionText);
  diagnostics.hasHotTopic = Boolean(hotTopic);
  diagnostics.mountsDiscussionText =
    Boolean(promptSettings.hotTopicsIncludeDiscussionText) && diagnostics.hasDiscussionText;
  diagnostics.mountsHotTopic =
    Boolean(promptSettings.hotTopicsIncludeHotTopic) && diagnostics.hasHotTopic;

  if (promptSettings.hotTopicsIncludeDiscussionText && !diagnostics.hasDiscussionText) {
    diagnostics.warnings.push("当前页签未填写“页签文本”，保存后会自动忽略论坛文本挂载。");
  }
  if (promptSettings.hotTopicsIncludeHotTopic && !diagnostics.hasHotTopic) {
    diagnostics.warnings.push("当前页签未填写“页签热点”，保存后会自动忽略论坛热点挂载。");
  }

  return diagnostics;
}

function buildHotTopicsContext(settings, promptSettings) {
  const diagnostics = getHotTopicsMountDiagnostics(settings, promptSettings);
  if (!diagnostics.selectedTab) {
    return "";
  }

  const selectedTab = diagnostics.selectedTab;
  if (!diagnostics.mountsDiscussionText && !diagnostics.mountsHotTopic) {
    return "";
  }

  const sections = [`这个人最近也会留意论坛讨论区「${selectedTab.name}」。`];
  const discussionText = String(selectedTab.discussionText || selectedTab.text || "").trim();
  const hotTopic = String(selectedTab.hotTopic || "").trim();

  if (diagnostics.mountsDiscussionText && discussionText) {
    sections.push(`这个讨论区平时常见的讨论背景：${discussionText}`);
  }
  if (diagnostics.mountsHotTopic && hotTopic) {
    sections.push(`这个讨论区当前最主要的热点：${hotTopic}`);
  }

  return sections.length > 1 ? sections.join("\n\n") : "";
}

function buildWorldbookContext(promptSettings) {
  if (!promptSettings.worldbookEnabled || !promptSettings.worldbookIds.length) {
    return "";
  }

  const entries = promptSettings.worldbookIds
    .map((entryId) => getWorldbookEntryById(entryId))
    .filter(Boolean)
    .map((entry) => {
      const category = entry.categoryId ? getWorldbookCategoryById(entry.categoryId) : null;
      const categoryLabel = category?.name ? `（${category.name}）` : "（未分类）";
      return `- ${entry.name}${categoryLabel}\n${String(entry.text || "").replace(/\r/g, "").trim()}`;
    });

  if (!entries.length) {
    return "";
  }

  return `世界书背景资料（只做潜在参考，不要单独拎出来讲）：\n${entries.join("\n\n")}`;
}

function buildMemoryPromptContexts(contact, promptSettings) {
  const bundle = buildMemoryPromptBundle(contact, promptSettings);
  return {
    core: bundle.core || "",
    scene: bundle.scene || ""
  };
}

function stripHotTopicsPromptSettings(promptSettings = {}) {
  return normalizeMessagePromptSettings({
    ...promptSettings,
    hotTopicsEnabled: false,
    hotTopicsTabId: ""
  });
}

function buildForumPostFocusContext(promptSettings) {
  if (!promptSettings.forumPostFocusEnabled) {
    return "";
  }
  const posts = readStoredJson(PROFILE_POSTS_KEY, []);
  if (!Array.isArray(posts) || !posts.length) {
    return "";
  }
  const latestPost = [...posts]
    .reverse()
    .find((item) => item && typeof item === "object" && String(item.text || "").trim());
  if (!latestPost) {
    return "";
  }
  const topic = extractPostTopic(latestPost);
  if (!topic) {
    return "";
  }
  const timestamp = resolveStoredTimestampLabel(latestPost.createdAt, latestPost.time || "");
  return timestamp
    ? `用户最近一条主动发送的论坛帖子主题（发送于 ${timestamp}）：${topic}`
    : `用户最近一条主动发送的论坛帖子主题：${topic}`;
}

function extractLatestBubbleBatch(thread) {
  const messages = Array.isArray(thread?.messages) ? thread.messages : [];
  if (!messages.length) {
    return [];
  }

  let cursor = messages.length - 1;
  while (cursor >= 0 && messages[cursor]?.role !== "user") {
    cursor -= 1;
  }

  if (cursor < 0) {
    return [];
  }

  const batch = [];
  while (cursor >= 0 && messages[cursor]?.role === "user") {
    const text = String(messages[cursor]?.text || "").trim();
    if (text) {
      batch.unshift(messages[cursor]);
    }
    cursor -= 1;
  }

  return batch;
}

function buildBubbleFocusContext(promptSettings) {
  const resolvedSettings = normalizeMessagePromptSettings(promptSettings);
  if (!resolvedSettings.bubbleFocusEnabled) {
    return "";
  }

  const threads = readStoredJson(BUBBLE_THREADS_KEY, {});
  if (!threads || typeof threads !== "object") {
    return "";
  }

  const batches = Object.values(threads)
    .map((thread) => extractLatestBubbleBatch(thread))
    .filter((batch) => batch.length)
    .sort(
      (left, right) =>
        (right[right.length - 1]?.createdAt || 0) - (left[left.length - 1]?.createdAt || 0)
    );

  const latestBatch = batches[0] || [];
  if (!latestBatch.length) {
    return "";
  }

  const latestCreatedAt = Number(latestBatch[latestBatch.length - 1]?.createdAt) || 0;
  const bubbleFocusMinutes = normalizeContextFocusMinutes(
    resolvedSettings.bubbleFocusMinutes,
    DEFAULT_CONTEXT_FOCUS_MINUTES
  );
  if (
    latestCreatedAt &&
    Date.now() - latestCreatedAt > bubbleFocusMinutes * 60 * 1000
  ) {
    return "";
  }

  return `用户最近一轮 Bubble 发言（${bubbleFocusMinutes} 分钟感知窗口内，共 ${latestBatch.length} 条）：\n${latestBatch
    .map((item, index) => {
      const timestamp = resolveStoredTimestampLabel(item.createdAt, item.time || "");
      const prefix = timestamp ? `${timestamp} · ` : "";
      return `${index + 1}. ${prefix}${truncate(String(item.text || "").trim(), 72)}`;
    })
    .join("\n")}`;
}

function normalizeScheduleEntry(entry, index = 0) {
  const source = entry && typeof entry === "object" ? entry : {};
  const scheduleType = ["day", "hour", "week"].includes(source.scheduleType)
    ? source.scheduleType
    : "day";
  const ownerType = source.ownerType === "contact" ? "contact" : "user";
  const date = /^\d{4}-\d{2}-\d{2}$/.test(String(source.date || "").trim())
    ? String(source.date).trim()
    : "";
  const normalizeTimeValue = (value, fallback = "") => {
    const normalized = normalizeHourTimeText(value);
    return normalized || fallback;
  };
  return {
    id: String(source.id || `schedule_${index}_${hashText(`${source.title || ""}-${date}`)}`),
    title: String(source.title || "").trim(),
    scheduleType,
    ownerType,
    ownerId: ownerType === "contact" ? String(source.ownerId || "").trim() : "",
    companionIncludesUser: ownerType === "contact" ? Boolean(source.companionIncludesUser) : false,
    companionContactIds: Array.isArray(source.companionContactIds)
      ? [...new Set(source.companionContactIds.map((item) => String(item || "").trim()).filter(Boolean))]
      : [],
    visibilityMode: source.visibilityMode === "selected" ? "selected" : "all",
    visibleContactIds: Array.isArray(source.visibleContactIds)
      ? [...new Set(source.visibleContactIds.map((item) => String(item || "").trim()).filter(Boolean))]
      : [],
    placeId: String(source.placeId || "").trim(),
    date,
    startTime: normalizeTimeValue(
      source.startTime,
      scheduleType === "hour" || scheduleType === "week" ? "09:00" : ""
    ),
    endTime: normalizeTimeValue(
      source.endTime,
      scheduleType === "hour" || scheduleType === "week" ? "10:00" : ""
    ),
    inviteDecisions:
      source.inviteDecisions && typeof source.inviteDecisions === "object"
        ? { ...source.inviteDecisions }
        : {},
    createdAt: Number(source.createdAt) || Date.now(),
    updatedAt: Number(source.updatedAt) || Date.now()
  };
}

function normalizeHourTimeText(value = "") {
  const trimmed = String(value || "").trim();
  if (!trimmed) {
    return "";
  }
  const directMatch = trimmed.match(/^(\d{2}):(\d{2})$/);
  if (directMatch) {
    return `${directMatch[1]}:${directMatch[2]}`;
  }
  const extendedMatch = trimmed.match(/^(\d{2}):(\d{2})(?::\d{2})?(?:Z|[+-]\d{2}:\d{2})$/i);
  if (extendedMatch) {
    return `${extendedMatch[1]}:${extendedMatch[2]}`;
  }
  return "";
}

function loadScheduleEntries() {
  const raw = readStoredJson(SCHEDULE_ENTRIES_KEY, []);
  return Array.isArray(raw)
    ? raw.map((entry, index) => normalizeScheduleEntry(entry, index)).filter((entry) => entry.title && entry.date)
    : [];
}

function getScheduleContactName(contactId = "") {
  return getContactById(String(contactId || "").trim())?.name || "角色";
}

function getScheduleParticipants(entry) {
  const participants = [];
  const pushParticipant = (actorType, actorId, label) => {
    const key =
      actorType === "contact" && String(actorId || "").trim()
        ? `contact:${String(actorId || "").trim()}`
        : "user:self";
    if (participants.some((item) => item.key === key)) {
      return;
    }
    participants.push({
      key,
      type: actorType,
      id: actorType === "contact" ? String(actorId || "").trim() : "",
      label: String(label || "").trim() || (actorType === "contact" ? "角色" : state.profile.username || DEFAULT_PROFILE.username)
    });
  };

  if (entry.ownerType === "contact" && entry.ownerId) {
    pushParticipant("contact", entry.ownerId, getScheduleContactName(entry.ownerId));
  } else {
    pushParticipant("user", "", state.profile.username || DEFAULT_PROFILE.username);
  }

  if (entry.ownerType === "contact" && entry.companionIncludesUser) {
    pushParticipant("user", "", state.profile.username || DEFAULT_PROFILE.username);
  }

  entry.companionContactIds.forEach((contactId) => {
    pushParticipant("contact", contactId, getScheduleContactName(contactId));
  });

  return participants;
}

function parseLocalDateValue(dateText) {
  const match = String(dateText || "").trim().match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) {
    return null;
  }
  const [, year, month, day] = match;
  return new Date(Number(year), Number(month) - 1, Number(day), 0, 0, 0, 0);
}

function parseLocalDateTimeValue(dateText, timeText = "00:00") {
  const date = parseLocalDateValue(dateText);
  const timeMatch = String(timeText || "").trim().match(/^(\d{2}):(\d{2})$/);
  if (!date || !timeMatch) {
    return null;
  }
  const [, hour, minute] = timeMatch;
  date.setHours(Number(hour), Number(minute), 0, 0);
  return date;
}

function startOfLocalDay(dateText) {
  return parseLocalDateTimeValue(dateText, "00:00");
}

function endOfLocalDay(dateText) {
  const date = parseLocalDateTimeValue(dateText, "23:59");
  if (!date) {
    return null;
  }
  date.setSeconds(59, 999);
  return date;
}

function addDays(date, amount) {
  const next = new Date(date.getTime());
  next.setDate(next.getDate() + amount);
  return next;
}

function formatDateToValue(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getTodayDateValue(now = new Date()) {
  return formatDateToValue(now);
}

function getPromptTodayDateValue(settings = loadSettings()) {
  return formatDateToValue(getPromptNow(settings));
}

function formatWeekday(dateText, length = "short") {
  const date = parseLocalDateValue(dateText) || new Date();
  return new Intl.DateTimeFormat("zh-CN", { weekday: length }).format(date);
}

function formatJournalDateLabel(dateText = getTodayDateValue()) {
  const date = parseLocalDateValue(dateText) || new Date();
  return new Intl.DateTimeFormat("zh-CN", {
    month: "long",
    day: "numeric",
    weekday: "long"
  }).format(date);
}

function formatJournalFullDateLabel(dateText = getTodayDateValue()) {
  const date = parseLocalDateValue(dateText) || new Date();
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long"
  }).format(date);
}

function formatScheduleDateLabel(dateText = getTodayDateValue()) {
  const date = parseLocalDateValue(dateText) || new Date();
  return new Intl.DateTimeFormat("zh-CN", {
    month: "long",
    day: "numeric",
    weekday: "long"
  }).format(date);
}

const RELATIVE_TIME_WEEKDAY_OFFSET_MAP = {
  一: 0,
  二: 1,
  三: 2,
  四: 3,
  五: 4,
  六: 5,
  日: 6,
  天: 6
};

function startOfWeekMonday(date = new Date()) {
  const resolved = date instanceof Date ? new Date(date.getTime()) : new Date(date || Date.now());
  resolved.setHours(0, 0, 0, 0);
  const weekday = resolved.getDay();
  const diff = weekday === 0 ? -6 : 1 - weekday;
  resolved.setDate(resolved.getDate() + diff);
  return resolved;
}

function formatMentionDateLabel(dateText = "") {
  const resolvedDateText = String(dateText || "").trim();
  if (!resolvedDateText) {
    return "";
  }
  return `${resolvedDateText}（${formatWeekday(resolvedDateText, "long")}）`;
}

function buildRelativeTimeMentions(text = "", settings = loadSettings()) {
  const sourceText = String(text || "");
  if (!sourceText.trim()) {
    return [];
  }
  const promptNow = getPromptNow(settings);
  const promptBaseDate = new Date(
    promptNow.getFullYear(),
    promptNow.getMonth(),
    promptNow.getDate(),
    0,
    0,
    0,
    0
  );
  const nextWeekMonday = addDays(startOfWeekMonday(promptBaseDate), 7);
  const matches = [];
  const pushMention = (mentionText, index, dateValues = []) => {
    const normalizedMention = String(mentionText || "").trim();
    const normalizedDates = (Array.isArray(dateValues) ? dateValues : [])
      .map((item) => String(item || "").trim())
      .filter(Boolean);
    if (!normalizedMention || !normalizedDates.length) {
      return;
    }
    matches.push({
      mentionText: normalizedMention,
      index: Number.isFinite(index) ? index : sourceText.indexOf(normalizedMention),
      dateValues: normalizedDates
    });
  };
  const singleDayKeywords = [
    { token: "今天", offset: 0 },
    { token: "明天", offset: 1 },
    { token: "后天", offset: 2 },
    { token: "昨天", offset: -1 }
  ];

  singleDayKeywords.forEach((keyword) => {
    let match = sourceText.indexOf(keyword.token);
    while (match >= 0) {
      pushMention(keyword.token, match, [formatDateToValue(addDays(promptBaseDate, keyword.offset))]);
      match = sourceText.indexOf(keyword.token, match + keyword.token.length);
    }
  });

  sourceText.replace(/下周([一二三四五六日天])/g, (fullMatch, weekdayText, offset) => {
    const weekdayOffset = RELATIVE_TIME_WEEKDAY_OFFSET_MAP[String(weekdayText || "").trim()];
    if (Number.isInteger(weekdayOffset)) {
      pushMention(fullMatch, offset, [formatDateToValue(addDays(nextWeekMonday, weekdayOffset))]);
    }
    return fullMatch;
  });

  sourceText.replace(/下周(?![一二三四五六日天])/g, (fullMatch, offset) => {
    pushMention(
      fullMatch,
      offset,
      Array.from({ length: 7 }, (_item, index) => formatDateToValue(addDays(nextWeekMonday, index)))
    );
    return fullMatch;
  });

  const seen = new Set();
  return matches
    .sort((left, right) => left.index - right.index)
    .filter((item) => {
      const key = `${item.mentionText}__${item.dateValues.join(",")}`;
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
}

function getJournalEntriesForContact(contactId = "") {
  const resolvedContactId = String(contactId || "").trim();
  if (!resolvedContactId) {
    return [];
  }
  return state.journalEntries
    .filter((entry) => entry.contactId === resolvedContactId)
    .slice()
    .sort((left, right) => (right.createdAt || 0) - (left.createdAt || 0));
}

function getJournalEntryForDate(contactId = "", dateText = getTodayDateValue()) {
  return (
    getJournalEntriesForContact(contactId).find((entry) => entry.date === String(dateText || "").trim()) ||
    null
  );
}

function getJournalEntryById(entryId = "") {
  const resolvedEntryId = String(entryId || "").trim();
  if (!resolvedEntryId) {
    return null;
  }
  return state.journalEntries.find((entry) => entry.id === resolvedEntryId) || null;
}

function getJournalMessagesForDate(conversation, dateText = getTodayDateValue()) {
  if (!conversation?.messages?.length) {
    return [];
  }
  const start = startOfLocalDay(dateText);
  const end = endOfLocalDay(dateText);
  if (!start || !end) {
    return [];
  }
  const startTime = start.getTime();
  const endTime = end.getTime();
  return conversation.messages.filter((message) => {
    const createdAt = Number(message?.createdAt);
    return Number.isFinite(createdAt) && createdAt >= startTime && createdAt <= endTime;
  });
}

function buildJournalChatTranscript(conversation, dateText = getTodayDateValue()) {
  const messages = getJournalMessagesForDate(conversation, dateText);
  if (!messages.length) {
    return "";
  }
  return messages
    .map((message) => {
      const roleLabel = message.role === "assistant" ? "你" : "用户";
      const timestamp = resolveStoredTimestampLabel(message.createdAt, message.time || "");
      return `${timestamp || "--:--"} ${roleLabel}：${String(message.text || "").trim()}`;
    })
    .filter(Boolean)
    .join("\n");
}

function buildJournalReferenceContext(settings, promptSettings) {
  return [buildWorldbookContext(promptSettings), buildHotTopicsContext(settings, promptSettings)]
    .filter(Boolean)
    .join("\n\n");
}

function normalizeWeatherLabel(description = "", temperature = "") {
  const desc = String(description || "").trim();
  const temp = String(temperature || "").trim();
  if (desc && temp) {
    return `${desc} ${temp}°C`;
  }
  return desc || (temp ? `${temp}°C` : "");
}

async function fetchCurrentWeatherLabel() {
  const response = await fetch("https://wttr.in/?format=j1&lang=zh-cn", {
    method: "GET",
    cache: "no-store"
  });
  if (!response.ok) {
    throw new Error(`天气请求失败：HTTP ${response.status}`);
  }
  const payload = await response.json();
  const current = payload?.current_condition?.[0] || {};
  const description =
    current?.lang_zh?.[0]?.value ||
    current?.lang_zh_cn?.[0]?.value ||
    current?.weatherDesc?.[0]?.value ||
    "";
  const label = normalizeWeatherLabel(description, current?.temp_C);
  if (!label) {
    throw new Error("天气接口返回成功，但没有拿到可用天气文本。");
  }
  return label;
}

async function ensureJournalWeather(dateText = getTodayDateValue()) {
  const resolvedDateText = String(dateText || "").trim() || getTodayDateValue();
  const cache = loadWeatherCache();
  const cachedEntry = cache?.[resolvedDateText];
  if (cachedEntry?.label) {
    state.journalWeatherDate = resolvedDateText;
    state.journalWeatherLabel = String(cachedEntry.label || "").trim();
    state.journalWeatherLoading = false;
    state.journalWeatherError = "";
    return state.journalWeatherLabel;
  }

  if (state.journalWeatherLoading && state.journalWeatherDate === resolvedDateText) {
    return state.journalWeatherLabel || "";
  }

  state.journalWeatherDate = resolvedDateText;
  state.journalWeatherLoading = true;
  state.journalWeatherError = "";
  if (state.journalOpen) {
    renderJournalModal();
  }

  try {
    const label = await fetchCurrentWeatherLabel();
    cache[resolvedDateText] = {
      label,
      updatedAt: Date.now()
    };
    persistWeatherCache(cache);
    state.journalWeatherLabel = label;
    state.journalWeatherError = "";
    return label;
  } catch (error) {
    state.journalWeatherLabel = "";
    state.journalWeatherError = error?.message || "天气暂未获取到";
    return "";
  } finally {
    state.journalWeatherLoading = false;
    if (state.journalOpen) {
      renderJournalModal();
    }
  }
}

function buildWeeklyOccurrenceRange(entry, baseDateText) {
  return resolveScheduleOccurrenceRange(entry, baseDateText);
}

function buildScheduleOccurrenceWindows(entry, now = new Date()) {
  if (!entry?.date) {
    return [];
  }

  if (entry.scheduleType === "day") {
    const start = startOfLocalDay(entry.date);
    const end = endOfLocalDay(entry.date);
    return start && end ? [{ start, end }] : [];
  }

  if (entry.scheduleType === "hour") {
    const range = resolveScheduleOccurrenceRange(entry, entry.date);
    return range ? [range] : [];
  }

  const templateDate = parseLocalDateValue(entry.date);
  if (!templateDate) {
    return [];
  }

  const targetWeekday = templateDate.getDay();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diffPrev = (today.getDay() - targetWeekday + 7) % 7;
  const previousDate = addDays(today, -diffPrev);
  const nextDate = addDays(previousDate, 7);
  const previousRange = buildWeeklyOccurrenceRange(entry, formatDateToValue(previousDate));
  const nextRange = buildWeeklyOccurrenceRange(entry, formatDateToValue(nextDate));
  const ranges = [];
  if (previousRange) {
    ranges.push(previousRange);
  }
  if (nextRange && (!previousRange || nextRange.start.getTime() !== previousRange.start.getTime())) {
    ranges.push(nextRange);
  }
  return ranges;
}

function entryOccursOnDate(entry, dateText = getTodayDateValue()) {
  if (!entry?.date) {
    return false;
  }
  if (entry.scheduleType === "week") {
    const sourceDate = parseLocalDateValue(entry.date);
    const targetDate = parseLocalDateValue(dateText);
    return Boolean(sourceDate && targetDate && sourceDate.getDay() === targetDate.getDay());
  }
  if (entry.date === dateText) {
    return true;
  }
  if (!isOvernightHourScheduleEntry(entry)) {
    return false;
  }
  const entryDate = parseLocalDateValue(entry.date);
  const targetDate = parseLocalDateValue(dateText);
  if (!entryDate || !targetDate) {
    return false;
  }
  return formatDateToValue(addDays(entryDate, 1)) === formatDateToValue(targetDate);
}

function parseTimeToMinutes(timeText = "") {
  const match = String(timeText || "").trim().match(/^(\d{2}):(\d{2})$/);
  if (!match) {
    return 0;
  }
  return Number(match[1]) * 60 + Number(match[2]);
}

function formatSchedulePreviewTime(entry) {
  if (entry.scheduleType === "day") {
    return "全天";
  }
  return isOvernightHourScheduleEntry(entry)
    ? `${entry.startTime}-次日${entry.endTime}`
    : `${entry.startTime}-${entry.endTime}`;
}

function formatSchedulePreviewBadge(entry) {
  if (entry.scheduleType === "day") {
    return "全天";
  }
  if (entry.scheduleType === "week") {
    return "每周";
  }
  return "按时";
}

function getSchedulePreviewEntryVisibleEndHour(entry) {
  const startMinutes = parseTimeToMinutes(entry.startTime);
  const endMinutes = isOvernightHourScheduleEntry(entry)
    ? 24 * 60 + parseTimeToMinutes(entry.endTime)
    : Math.max(startMinutes + 1, parseTimeToMinutes(entry.endTime));
  return Math.max(
    Number.parseInt(String(entry.startTime || "00:00").slice(0, 2), 10) || 0,
    Math.min(23, Math.floor((endMinutes - 1) / 60))
  );
}

function schedulePreviewEntryOccupiesHour(entry, hour) {
  if (!entry || entry.scheduleType === "day") {
    return false;
  }
  const startMinutes = parseTimeToMinutes(entry.startTime);
  const endMinutes = isOvernightHourScheduleEntry(entry)
    ? 24 * 60 + parseTimeToMinutes(entry.endTime)
    : Math.max(startMinutes + 1, parseTimeToMinutes(entry.endTime));
  const slotStart = hour * 60;
  const slotEnd = Math.min(24 * 60, (hour + 1) * 60);
  return startMinutes < slotEnd && endMinutes > slotStart;
}

function getSchedulePreviewEntrySlotState(entry, hour) {
  if (!schedulePreviewEntryOccupiesHour(entry, hour)) {
    return "hidden";
  }
  return String(entry.startTime || "").slice(0, 2) === padTimeUnit(hour) ? "start" : "continuation";
}

function padTimeUnit(value) {
  return String(value).padStart(2, "0");
}

function getChatSchedulePreviewHours(entries = []) {
  return Array.from({ length: 24 }, (_, index) => index).filter((hour) =>
    entries.some((entry) => schedulePreviewEntryOccupiesHour(entry, hour))
  );
}

function getTodayUserScheduleEntries(dateText = getTodayDateValue()) {
  const userName = state.profile.username || DEFAULT_PROFILE.username;
  return loadScheduleEntries()
    .filter((entry) => entryOccursOnDate(entry, dateText))
    .flatMap((entry) => {
      const participants = getScheduleParticipants(entry);
      const companionNames = participants
        .filter((participant) => participant.type !== "user")
        .map((participant) => participant.label);

      if (entry.ownerType === "user") {
        return [
          {
            ...entry,
            previewMeta:
              companionNames.length > 0
                ? `同行：${companionNames.slice(0, 3).join("、")}${companionNames.length > 3 ? ` 等 ${companionNames.length} 位` : ""}`
                : `${userName} 的日程`
          }
        ];
      }

      if (entry.ownerType === "contact" && entry.companionIncludesUser) {
        const ownerName = getScheduleContactName(entry.ownerId);
        const coTravelerNames = companionNames.filter((name) => name !== ownerName);
        return [
          {
            ...entry,
            previewMeta: `与 ${ownerName} 同行${
              coTravelerNames.length
                ? ` · 同行人：${coTravelerNames.slice(0, 2).join("、")}${coTravelerNames.length > 2 ? ` 等 ${coTravelerNames.length} 位` : ""}`
                : ""
            }`
          }
        ];
      }

      return [];
    })
    .sort((left, right) => {
      const leftWeight = left.scheduleType === "day" ? 0 : 1;
      const rightWeight = right.scheduleType === "day" ? 0 : 1;
      return (
        leftWeight - rightWeight ||
        parseTimeToMinutes(left.startTime) - parseTimeToMinutes(right.startTime) ||
        String(left.title || "").localeCompare(String(right.title || ""), "zh-CN") ||
        (right.updatedAt || 0) - (left.updatedAt || 0)
      );
    });
}

function getVisibleScheduleEntriesForContact(contactId = "") {
  const resolvedContactId = String(contactId || "").trim();
  if (!resolvedContactId) {
    return [];
  }
  return loadScheduleEntries().flatMap((entry) => {
    const participants = getScheduleParticipants(entry);
    const directParticipant = participants.find(
      (participant) => participant.type === "contact" && participant.id === resolvedContactId
    );

    if (directParticipant) {
      return [
        {
          ...entry,
          awarenessMode: "participant",
          awarenessCompanionNames: participants
            .filter((participant) => participant.key !== directParticipant.key)
            .map((participant) => participant.label)
        }
      ];
    }

    if (entry.ownerType === "user") {
      const isVisible =
        entry.visibilityMode === "all" || entry.visibleContactIds.includes(resolvedContactId);
      if (isVisible) {
        return [
          {
            ...entry,
            awarenessMode: "shared-user",
            awarenessCompanionNames: []
          }
        ];
      }
    }

    return [];
  });
}

function getScheduleActorKey(actorType = "user", actorId = "") {
  return actorType === "contact" && String(actorId || "").trim()
    ? `contact:${String(actorId || "").trim()}`
    : "user:self";
}

function getCurrentSchedulePlaceEntryForActor(actorKey = "", now = getPromptNow(loadSettings())) {
  const resolvedActorKey = String(actorKey || "").trim();
  const resolvedNow = now instanceof Date ? now : new Date();
  if (!resolvedActorKey) {
    return null;
  }
  const nowTimestamp = resolvedNow.getTime();
  const candidates = loadScheduleEntries()
    .filter((entry) => entry.placeId && getCommonPlaceById(entry.placeId))
    .flatMap((entry) => {
      if (!getScheduleParticipants(entry).some((participant) => participant.key === resolvedActorKey)) {
        return [];
      }
      return buildScheduleOccurrenceWindows(entry, resolvedNow)
        .filter((range) => {
          const startTime = Number(range?.start?.getTime?.() || 0);
          const endTime = Number(range?.end?.getTime?.() || 0);
          return startTime <= nowTimestamp && nowTimestamp <= endTime;
        })
        .map((range) => ({
          entry,
          startAt: Number(range.start.getTime()) || 0,
          weight: entry.scheduleType === "day" ? 0 : 1
        }));
    })
    .sort((left, right) => {
      return (
        right.weight - left.weight ||
        right.startAt - left.startAt ||
        (right.entry.updatedAt || 0) - (left.entry.updatedAt || 0)
      );
    });
  return candidates[0]?.entry || null;
}

function syncConversationPresenceFromSchedules(conversationId = state.activeConversationId) {
  const resolvedConversationId = String(conversationId || "").trim();
  const conversation = getConversationById(resolvedConversationId);
  if (!conversation?.contactId) {
    return {
      changed: false,
      sceneChanged: false
    };
  }

  const promptNow = getPromptNow(loadSettings());
  const nowTimestamp = promptNow.getTime();
  const contactId = String(conversation.contactId || "").trim();
  const userEntry = getCurrentSchedulePlaceEntryForActor(getScheduleActorKey("user"), promptNow);
  const contactEntry = getCurrentSchedulePlaceEntryForActor(
    getScheduleActorKey("contact", contactId),
    promptNow
  );
  const userPlaceId = userEntry && getCommonPlaceById(userEntry.placeId) ? userEntry.placeId : "";
  const contactPlaceId = contactEntry && getCommonPlaceById(contactEntry.placeId) ? contactEntry.placeId : "";
  let changed = false;
  let sceneChanged = false;

  if (userPlaceId) {
    const nextUserPresence = normalizePresenceEntry({
      presenceType: "at_place",
      placeId: userPlaceId,
      fromPlaceId: "",
      toPlaceId: "",
      updatedAt: nowTimestamp
    });
    if (!arePresenceEntriesEquivalent(getUserPresenceForContact(contactId), nextUserPresence)) {
      setUserPresenceEntry(contactId, nextUserPresence);
      changed = true;
    }
  }

  if (contactPlaceId) {
    const nextContactPresence = normalizePresenceEntry({
      presenceType: "at_place",
      placeId: contactPlaceId,
      fromPlaceId: "",
      toPlaceId: "",
      updatedAt: nowTimestamp
    });
    if (!arePresenceEntriesEquivalent(getContactPresence(contactId), nextContactPresence)) {
      setContactPresenceEntry(contactId, nextContactPresence);
      changed = true;
    }
  }

  if (userPlaceId || contactPlaceId) {
    const nextSceneMode =
      userPlaceId && contactPlaceId && userPlaceId === contactPlaceId ? "offline" : "online";
    if (conversation.sceneMode !== nextSceneMode) {
      conversation.sceneMode = nextSceneMode;
      sceneChanged = true;
      changed = true;
      if (nextSceneMode === "offline") {
        state.quotedMessageId = "";
      }
      persistConversations();
    }
  }

  if ((changed || sceneChanged) && state.sceneModalOpen && state.activeConversationId === resolvedConversationId) {
    updateSceneModalFields(buildSceneDraft(conversation));
  }
  if ((changed || sceneChanged) && state.sceneSyncModalOpen && state.activeConversationId === resolvedConversationId) {
    renderSceneSyncModal();
  }

  return {
    changed,
    sceneChanged,
    userPlaceId,
    contactPlaceId
  };
}

function hasRecentAssistantMentionedSchedule(history = [], entry) {
  const title = String(entry?.title || "").trim().toLowerCase();
  if (!title) {
    return false;
  }
  return history
    .filter((message) => message?.role === "assistant")
    .slice(-10)
    .some((message) => String(message?.text || "").toLowerCase().includes(title));
}

function formatScheduleDistanceMinutes(milliseconds) {
  return formatConversationElapsedDuration(milliseconds);
}

function evaluateScheduleAwareness(
  entry,
  now = new Date(),
  windowMinutes = DEFAULT_SCHEDULE_AWARENESS_WINDOW_MINUTES
) {
  const windowMs = windowMinutes * 60 * 1000;
  const ranges = buildScheduleOccurrenceWindows(entry, now);
  const evaluations = ranges
    .map((range) => {
      if (!range?.start || !range?.end) {
        return null;
      }
      if (now >= range.start && now <= range.end) {
        return { type: "current", distance: 0, range, now };
      }
      if (now > range.end) {
        const distance = now.getTime() - range.end.getTime();
        if (distance <= windowMs) {
          return { type: "recent", distance, range, now };
        }
      }
      if (range.start > now) {
        const distance = range.start.getTime() - now.getTime();
        if (distance <= windowMs) {
          return { type: "upcoming", distance, range, now };
        }
      }
      return null;
    })
    .filter(Boolean)
    .sort((left, right) => {
      const order = { current: 0, upcoming: 1, recent: 2 };
      return order[left.type] - order[right.type] || left.distance - right.distance;
    });

  return evaluations[0] || null;
}

function buildScheduleAwarenessLine(entry, awareness) {
  const companionNames = Array.isArray(entry.awarenessCompanionNames)
    ? entry.awarenessCompanionNames.filter(Boolean)
    : [];
  const companionText = companionNames.length
    ? `和${companionNames.slice(0, 2).join("、")}${
        companionNames.length > 2 ? `等${companionNames.length}位同行人` : ""
      }一起`
    : "";
  const ownerLabel = entry.awarenessMode === "participant" ? `你${companionText}` : "用户";
  if (awareness.type === "current") {
    const nowTimestamp = Number(awareness.now?.getTime?.() || 0);
    const startTimestamp = Number(awareness.range?.start?.getTime?.() || 0);
    const endTimestamp = Number(awareness.range?.end?.getTime?.() || 0);
    const elapsedDuration =
      nowTimestamp > 0 && startTimestamp > 0
        ? formatConversationElapsedDuration(nowTimestamp - startTimestamp)
        : "";
    const remainingDuration =
      endTimestamp > 0 && nowTimestamp > 0
        ? formatConversationElapsedDuration(endTimestamp - nowTimestamp)
        : "";
    return `${ownerLabel}当前有行程「${entry.title}」正在进行${
      elapsedDuration || remainingDuration
        ? `（已进行 ${elapsedDuration || "不到 1 分钟"}，预计还会持续 ${remainingDuration || "不到 1 分钟"}）`
        : ""
    }。`;
  }
  if (awareness.type === "recent") {
    return `${ownerLabel}在 ${formatScheduleDistanceMinutes(awareness.distance)} 前刚结束行程「${entry.title}」。`;
  }
  return `${ownerLabel}在 ${formatScheduleDistanceMinutes(awareness.distance)} 后有行程「${entry.title}」。`;
}

function buildUpcomingScheduleCompanionText(entry = {}) {
  const companionNames = Array.isArray(entry.awarenessCompanionNames)
    ? entry.awarenessCompanionNames.filter(Boolean)
    : [];
  if (!companionNames.length) {
    return "";
  }
  return ` · 和${companionNames.slice(0, 2).join("、")}${
    companionNames.length > 2 ? `等${companionNames.length}位同行人` : ""
  }一起`;
}

function collectTodayUpcomingContactScheduleLines(
  entries = [],
  now = getPromptNow(loadSettings()),
  excludedEntryIds = new Set()
) {
  const resolvedNow = now instanceof Date ? now : new Date();
  const nowTimestamp = resolvedNow.getTime();
  const todayValue = formatDateToValue(resolvedNow);
  const seen = new Set();
  const excludedIds =
    excludedEntryIds instanceof Set
      ? excludedEntryIds
      : new Set(
          (Array.isArray(excludedEntryIds) ? excludedEntryIds : [])
            .map((item) => String(item || "").trim())
            .filter(Boolean)
        );

  return normalizeObjectArray(entries)
    .filter(
      (entry) =>
        entry.awarenessMode === "participant" &&
        !excludedIds.has(String(entry.id || "").trim())
    )
    .flatMap((entry) => {
      return buildScheduleOccurrenceWindows(entry, resolvedNow)
        .filter((range) => {
          const startAt = Number(range?.start?.getTime?.() || 0);
          return (
            startAt > nowTimestamp &&
            formatDateToValue(range.start) === todayValue
          );
        })
        .map((range) => ({
          entry,
          startAt: Number(range.start.getTime()) || 0,
          line: `- ${formatSchedulePreviewTime(entry)} · ${String(
            entry.title || "未命名行程"
          ).trim()}${buildUpcomingScheduleCompanionText(entry)}`
        }));
    })
    .sort((left, right) => left.startAt - right.startAt || (right.entry.updatedAt || 0) - (left.entry.updatedAt || 0))
    .filter((item) => {
      const key = `${String(item.entry?.id || item.line)}__${item.startAt}`;
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    })
    .slice(0, 4)
    .map((item) => item.line);
}

function buildScheduleAwarenessContext(contact, history = [], promptSettings = {}) {
  const windowMinutes = normalizeMessagePromptSettings(promptSettings).scheduleAwarenessWindowMinutes;
  const entries = getVisibleScheduleEntriesForContact(contact?.id || "");
  if (!entries.length) {
    return "当前没有检测到你需要处理的已知行程；除非对话里另有明确说明，否则不要凭空说自己要去忙、赶时间，或拿不存在的安排结束对话。";
  }

  const now = getPromptNow(loadSettings());
  const activeEntries = entries
    .map((entry) => ({
      entry,
      awareness: evaluateScheduleAwareness(entry, now, windowMinutes)
    }))
    .filter((item) => item.awareness)
    .filter((item) => !hasRecentAssistantMentionedSchedule(history, item.entry))
    .sort((left, right) => {
      const order = { current: 0, upcoming: 1, recent: 2 };
      return (
        order[left.awareness.type] - order[right.awareness.type] ||
        left.awareness.distance - right.awareness.distance ||
        (right.entry.updatedAt || 0) - (left.entry.updatedAt || 0)
      );
    })
    .slice(0, 4);
  const userRelevantEntries = activeEntries.filter((item) => item.entry.awarenessMode !== "participant");
  const contactRelevantEntries = activeEntries.filter((item) => item.entry.awarenessMode === "participant");
  const todayUpcomingContactLines = collectTodayUpcomingContactScheduleLines(
    entries,
    now,
    new Set(contactRelevantEntries.map((item) => String(item.entry?.id || "").trim()).filter(Boolean))
  );

  if (!activeEntries.length && !todayUpcomingContactLines.length) {
    return "当前没有检测到你在最近窗口内的行程压力；除非聊天里另有明确说明，否则不要把自己写成正忙着别的事。";
  }

  const lines = [`日程感知窗口：最近 ${windowMinutes} 分钟。`];
  if (userRelevantEntries.length) {
    lines.push("用户相关行程感知：");
    lines.push(...userRelevantEntries.map((item) => `- ${buildScheduleAwarenessLine(item.entry, item.awareness)}`));
  }
  if (contactRelevantEntries.length) {
    lines.push("你的相关行程感知：");
    lines.push(
      ...contactRelevantEntries.map((item) => `- ${buildScheduleAwarenessLine(item.entry, item.awareness)}`)
    );
  } else {
    lines.push(
      "你的相关行程感知：",
      "- 你当前没有已知行程在进行，也没有最近窗口内必须立刻处理的安排；除非聊天里另有明确说明，否则不要拿不存在的忙碌感结束对话。"
    );
  }
  if (todayUpcomingContactLines.length) {
    lines.push("你今天后续的已知行程：");
    lines.push(...todayUpcomingContactLines);
  }
  lines.push(
    "如果这些行程和当前聊天自然相关，你可以顺带表达一句关心、提醒或配合；不要生硬复述时间表，更不要为了提行程而强行转移话题。"
  );
  return lines.join("\n");
}

function formatMentionScheduleEntryLine(entry, dateText = "", contactId = "") {
  const dateLabel = formatMentionDateLabel(dateText);
  const timeLabel = formatSchedulePreviewTime(entry);
  const title = String(entry?.title || "未命名行程").trim();
  const participants = getScheduleParticipants(entry);
  const companionNames = participants
    .filter((participant) => participant.type === "contact" && participant.id !== String(contactId || "").trim())
    .map((participant) => participant.label)
    .filter(Boolean);
  const metadata = [];
  if (entry.ownerType === "user" && companionNames.length) {
    metadata.push(
      `同行：${companionNames.slice(0, 2).join("、")}${companionNames.length > 2 ? ` 等 ${companionNames.length} 位` : ""}`
    );
  }
  if (entry.ownerType === "contact" && entry.ownerId && entry.ownerId !== String(contactId || "").trim()) {
    metadata.push(`发起角色：${getScheduleContactName(entry.ownerId)}`);
  }
  return `- ${dateLabel} · ${timeLabel} · ${title}${metadata.length ? ` · ${metadata.join(" · ")}` : ""}`;
}

function collectMentionScheduleEntriesForDateValues(contactId = "", dateValues = []) {
  const resolvedContactId = String(contactId || "").trim();
  const visibleEntries = getVisibleScheduleEntriesForContact(resolvedContactId);
  const normalizedDateValues = (Array.isArray(dateValues) ? dateValues : [])
    .map((item) => String(item || "").trim())
    .filter(Boolean);
  const userLines = [];
  const contactLines = [];
  const seenUser = new Set();
  const seenContact = new Set();

  normalizedDateValues.forEach((dateValue) => {
    visibleEntries
      .filter((entry) => entryOccursOnDate(entry, dateValue))
      .forEach((entry) => {
        const line = formatMentionScheduleEntryLine(entry, dateValue, resolvedContactId);
        const key = `${entry.id || entry.title}_${dateValue}`;
        if (entry.ownerType === "user") {
          if (!seenUser.has(key)) {
            seenUser.add(key);
            userLines.push(line);
          }
          return;
        }
        if (!seenContact.has(key)) {
          seenContact.add(key);
          contactLines.push(line);
        }
      });
  });

  return {
    userLines,
    contactLines
  };
}

function buildMentionedTimeScheduleContext(contact, sourceMessages = [], settings = loadSettings()) {
  const resolvedContact = contact && typeof contact === "object" ? contact : null;
  if (!resolvedContact) {
    return "";
  }
  const mentions = (Array.isArray(sourceMessages) ? sourceMessages : [])
    .filter((message) => message?.role !== "assistant")
    .flatMap((message) => buildRelativeTimeMentions(String(message?.text || "").trim(), settings));
  if (!mentions.length) {
    return "";
  }
  const seen = new Set();
  const normalizedMentions = mentions.filter((item) => {
    const key = `${item.mentionText}__${item.dateValues.join(",")}`;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });

  return normalizedMentions
    .map((mention) => {
      const { userLines, contactLines } = collectMentionScheduleEntriesForDateValues(
        resolvedContact.id,
        mention.dateValues
      );
      const rangeLabel =
        mention.dateValues.length > 1
          ? `${formatMentionDateLabel(mention.dateValues[0])} 至 ${formatMentionDateLabel(
              mention.dateValues[mention.dateValues.length - 1]
            )}`
          : formatMentionDateLabel(mention.dateValues[0]);
      return [
        `- 用户消息里提到了“${mention.mentionText}”，这里明确对应的时间是：${rangeLabel}。`,
        userLines.length
          ? `  - 对应时间内，对你可见的用户已知行程：\n${userLines.map((line) => `    ${line}`).join("\n")}`
          : "  - 对应时间内，没有任何对你可见的用户行程。",
        contactLines.length
          ? `  - 对应时间内你的已知行程：\n${contactLines.map((line) => `    ${line}`).join("\n")}`
          : "  - 对应时间内你没有已知行程。",
        "  - 这里只列出你当前可见或已知的安排；没有列出来的用户日程，视为当前对你不可见，不要主动引用。",
        "  - 如果你要回应这类时间词，请以这层对应关系为准，避免把“今天/明天/下周”理解错。"
      ].join("\n");
    })
    .join("\n\n");
}

function buildAutoScheduleDateValues(days = DEFAULT_AUTO_SCHEDULE_DAYS, startDateText = getTodayDateValue()) {
  const resolvedDays = normalizeAutoScheduleDays(days, DEFAULT_AUTO_SCHEDULE_DAYS);
  const startDate = parseLocalDateValue(startDateText) || new Date();
  return Array.from({ length: resolvedDays }, (_, index) =>
    formatDateToValue(addDays(startDate, index))
  );
}

function doScheduleEntriesOverlap(left, right) {
  if (!left || !right) {
    return false;
  }
  if (left.scheduleType === "day" || right.scheduleType === "day") {
    return String(left.date || "") === String(right.date || "");
  }
  const leftRange = resolveScheduleOccurrenceRange(left, left.date);
  const rightRange = resolveScheduleOccurrenceRange(right, right.date);
  const leftStart = leftRange?.start || null;
  const leftEnd = leftRange?.end || null;
  const rightStart = rightRange?.start || null;
  const rightEnd = rightRange?.end || null;
  if (!leftStart || !leftEnd || !rightStart || !rightEnd) {
    return false;
  }
  return leftStart < rightEnd && rightStart < leftEnd;
}

function getAutoScheduleExistingEntries(contactId = "", dateValues = []) {
  const dateSet = new Set(
    (Array.isArray(dateValues) ? dateValues : []).map((item) => String(item || "").trim()).filter(Boolean)
  );
  return getVisibleScheduleEntriesForContact(contactId)
    .filter(
      (entry) =>
        !dateSet.size || [...dateSet].some((dateValue) => entryOccursOnDate(entry, dateValue))
    )
    .map((entry) => ({ ...entry }));
}

function buildAutoScheduleOccupiedContext(contactId = "", dateValues = []) {
  const entries = getAutoScheduleExistingEntries(contactId, dateValues);
  const grouped = dateValues.map((dateValue) => {
    const currentEntries = entries
      .filter((entry) => String(entry.date || "").trim() === dateValue)
      .sort((left, right) => {
        const leftWeight = left.scheduleType === "day" ? 0 : 1;
        const rightWeight = right.scheduleType === "day" ? 0 : 1;
        return (
          leftWeight - rightWeight ||
          parseTimeToMinutes(left.startTime) - parseTimeToMinutes(right.startTime) ||
          (right.updatedAt || 0) - (left.updatedAt || 0)
        );
      });
    return {
      date: dateValue,
      entries: currentEntries
    };
  });

  return grouped
    .map((group) => {
      if (!group.entries.length) {
        return `- ${group.date}：当前没有已占用时段，可从空白时间开始安排。`;
      }
      return [
        `- ${group.date}：`,
        ...group.entries.map((entry) =>
          `  - ${entry.scheduleType === "day" ? "全天已占用" : formatSchedulePreviewTime(entry)}：${entry.title}`
        )
      ].join("\n");
    })
    .join("\n");
}

function buildAutoScheduleWorldbookContext(promptSettings = {}, options = {}) {
  const resolvedOptions = options && typeof options === "object" ? options : {};
  const overrideWorldbookIds = Object.prototype.hasOwnProperty.call(resolvedOptions, "worldbookIds")
    ? normalizeWorldbookSelectionIds(resolvedOptions.worldbookIds)
    : null;
  const context = overrideWorldbookIds
    ? buildWorldbookContext({
        worldbookEnabled: overrideWorldbookIds.length > 0,
        worldbookIds: overrideWorldbookIds
      })
    : buildWorldbookContext(promptSettings);
  return context ? `${context}\n` : "";
}

function buildAutoScheduleDateMeta(dateValue = "") {
  const weekday = formatWeekday(dateValue, "long");
  const date = parseLocalDateValue(dateValue);
  const isWeekend = Boolean(date && (date.getDay() === 0 || date.getDay() === 6));
  return {
    weekday,
    isWeekend,
    label: `${dateValue}（${weekday}，${isWeekend ? "默认休息日" : "默认工作日"}）`
  };
}

function buildAutoScheduleGenerationSystemPrompt(
  contact,
  promptSettings = {},
  dayCount = DEFAULT_AUTO_SCHEDULE_DAYS,
  options = {}
) {
  const resolvedContact = contact && typeof contact === "object" ? contact : {};
  const resolvedDayCount = normalizeAutoScheduleDays(dayCount, DEFAULT_AUTO_SCHEDULE_DAYS);
  const resolvedOptions = options && typeof options === "object" ? options : {};
  const extraInstruction = String(resolvedOptions.extraInstruction || "").trim();
  const currentSettings = loadSettings();
  return buildStructuredPromptSections(
    "chat_auto_schedule_generate",
    {
      context_library: {
        worldbook_context: buildAutoScheduleWorldbookContext(promptSettings, resolvedOptions)
      },
      output_standard: {
        extra_instruction: extraInstruction
          ? `本次额外生成要求（优先级高于默认周末休息倾向）：${extraInstruction}`
          : "如果没有额外说明，就按常规作息与周末休息倾向安排。"
      }
    },
    {
      settings: currentSettings,
      variables: {
        contactName: resolvedContact.name || "这个角色",
        contactPersona:
          buildContactCombinedPersonaText(resolvedContact) || "作息自然、贴近真实生活。",
        dayCount: resolvedDayCount
      }
    }
  );
}

function buildAutoScheduleGenerationInstruction(contactId = "", dateValues = [], options = {}) {
  const resolvedOptions = options && typeof options === "object" ? options : {};
  const extraInstruction = String(resolvedOptions.extraInstruction || "").trim();
  return [
    "请根据以下日期和已占用时段，补全这个角色未来几天的空白小时行程：",
    ...dateValues.map((dateValue) => `- 日期：${buildAutoScheduleDateMeta(dateValue).label}`),
    "",
    "已占用时段：",
    buildAutoScheduleOccupiedContext(contactId, dateValues) || "当前没有已占用时段。",
    "",
    extraInstruction
      ? `补充注意事项（若与默认节奏冲突，以这里为准）：${extraInstruction}`
      : "没有额外限制时，请默认区分工作日与休息日，周末以休息恢复为主。",
    "",
    "返回时不要解释思路，不要加 markdown，只返回 JSON。"
  ]
    .filter(Boolean)
    .join("\n");
}

function parseAutoScheduleItems(payload, dateValues = []) {
  const allowedDates = new Set(
    (Array.isArray(dateValues) ? dateValues : []).map((item) => String(item || "").trim()).filter(Boolean)
  );
  const rawValue =
    (Array.isArray(payload) ? payload : null) ||
    (payload && typeof payload === "object" ? payload : null) ||
    parseJsonLikeContent(payload) ||
    parseJsonLikeContent(resolveMessage(payload)) ||
    [];
  const arrayValue = Array.isArray(rawValue)
    ? rawValue
    : Array.isArray(rawValue?.items)
      ? rawValue.items
      : Array.isArray(rawValue?.schedules)
        ? rawValue.schedules
        : [];

  return arrayValue
    .map((item, index) => {
      const source = item && typeof item === "object" ? item : {};
      const date = String(source.date || "").trim();
      const title = String(source.title || source.name || "").trim();
      const startTime = normalizeHourTimeText(source.startTime || "");
      const endTime = normalizeHourTimeText(source.endTime || "");
      if (!title || !date || (allowedDates.size && !allowedDates.has(date))) {
        return null;
      }
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return null;
      }
      if (!/^\d{2}:00$/.test(startTime) || !/^\d{2}:00$/.test(endTime)) {
        return null;
      }
      if (parseTimeToMinutes(endTime) === parseTimeToMinutes(startTime)) {
        return null;
      }
      return normalizeScheduleEntry(
        {
          id: `schedule_auto_${Date.now()}_${index}_${hashText(`${date}_${title}_${startTime}_${endTime}`)}`,
          title,
          scheduleType: "hour",
          ownerType: "contact",
          ownerId: "",
          companionIncludesUser: false,
          companionContactIds: [],
          visibilityMode: "all",
          visibleContactIds: [],
          date,
          startTime,
          endTime,
          createdAt: Date.now() + index,
          updatedAt: Date.now() + index
        },
        index
      );
    })
    .filter(Boolean)
    .slice(0, 120);
}

async function generateAutoSchedulesForConversation(
  days = DEFAULT_AUTO_SCHEDULE_DAYS,
  conversationId = state.activeConversationId,
  options = {}
) {
  const conversation = getConversationById(conversationId);
  if (!conversation) {
    throw new Error("当前没有打开的 1v1 会话。");
  }
  const contact = getResolvedConversationContact(conversation);
  if (!contact) {
    throw new Error("未找到当前聊天对象。");
  }

  const resolvedDays = normalizeAutoScheduleDays(days, getConversationAutoScheduleDays(conversation));
  const settings = loadSettings();
  const promptSettings = getConversationPromptSettings(conversation, settings.messagePromptSettings);
  const requestOptions = options && typeof options === "object" ? options : {};
  const dateValues = buildAutoScheduleDateValues(resolvedDays, getPromptTodayDateValue(settings));
  const systemPrompt = buildAutoScheduleGenerationSystemPrompt(
    contact,
    promptSettings,
    resolvedDays,
    requestOptions
  );
  const structuredOutputContext = createStructuredOutputContext(
    settings,
    "auto_schedule_fill_v1"
  );
  const userInstruction = appendStructuredOutputPromptHint(
    buildAutoScheduleGenerationInstruction(contact.id, dateValues, requestOptions),
    structuredOutputContext
  );
  const requestEndpoint = validateApiSettings(settings, "自动生成行程");
  const privacySession = createPrivacySession({
    settings,
    contact,
    commonPlaces: state.commonPlaces,
    scheduleEntries: getAutoScheduleExistingEntries(contact.id, dateValues),
    promptSettings,
    autoScheduleWorldbookIds: Array.isArray(requestOptions.worldbookIds)
      ? normalizeWorldbookSelectionIds(requestOptions.worldbookIds)
      : [],
    autoScheduleExtraInstruction: String(requestOptions.extraInstruction || "").trim(),
    systemPrompt,
    userInstruction
  });
  const encodedSystemPrompt = preparePromptWithPrivacy(systemPrompt, privacySession);
  const encodedUserInstruction = encodeTextWithPrivacy(userInstruction, privacySession);
  const requestBody = decorateRequestBodyWithStructuredOutput(
    buildSingleInstructionRequestBody(
      settings,
      encodedSystemPrompt,
      encodedUserInstruction,
      "chat_auto_schedule_generate"
    ),
    structuredOutputContext
  );
  const logBase = applyPrivacyToLogEntry(
    buildMessageApiLogBase(
      "chat_auto_schedule_generate",
      settings,
      requestEndpoint,
      [encodedSystemPrompt, encodedUserInstruction].join("\n\n"),
      requestBody,
      `联系人：${contact.name} · 自动生成未来 ${resolvedDays} 天行程`
    ),
    privacySession
  );
  let logged = false;

  try {
    const response = await fetch(requestEndpoint, {
      method: "POST",
      headers: buildRequestHeaders(settings),
      body: JSON.stringify(requestBody)
    });
    const rawResponse = await response.text();
    let payload = rawResponse;
    try {
      payload = JSON.parse(rawResponse);
    } catch (_error) {
      payload = rawResponse;
    }

    if (!response.ok) {
      appendApiLog({
        ...logBase,
        ...buildGeminiLogFields(settings, payload),
        status: "error",
        statusCode: response.status,
        responseText: rawResponse,
        responseBody: payload,
        errorMessage: `接口请求失败：HTTP ${response.status}`
      });
      logged = true;
      throw new Error(`接口请求失败：HTTP ${response.status}`);
    }

    let repairResult = null;
    let structuredPayload = parseStructuredOutputPayload(payload, structuredOutputContext);
    if (structuredOutputContext.enabled && !structuredPayload) {
      repairResult = await requestStructuredRepairOnce(
        settings,
        requestEndpoint,
        structuredOutputContext,
        rawResponse,
        "chat_auto_schedule_generate_repair"
      );
      if (repairResult?.ok) {
        structuredPayload = repairResult.structuredPayload;
      }
      if (!structuredPayload) {
        const errorMessage = "自动生成行程返回了不可解析的结构化内容。";
        appendApiLog({
          ...logBase,
          ...buildGeminiLogFields(settings, payload),
          status: "error",
          statusCode: repairResult?.status || response.status,
          responseText: rawResponse,
          responseBody: payload,
          repairAttempted: Boolean(repairResult),
          repairResponseText: repairResult?.rawResponseText || "",
          repairResponseBody: repairResult?.payload || null,
          errorMessage
        });
        logged = true;
        throw new Error(errorMessage);
      }
    }

    const parsedItems = parseAutoScheduleItems(
      decodeValueWithPrivacy(structuredPayload || repairResult?.payload || payload, privacySession),
      dateValues
    );
    const existingEntries = getAutoScheduleExistingEntries(contact.id, dateValues);
    const acceptedEntries = [];
    parsedItems.forEach((entry, index) => {
      const normalized = normalizeScheduleEntry(
        {
          ...entry,
          ownerType: "contact",
          ownerId: contact.id,
          updatedAt: Date.now() + index
        },
        index
      );
      if (
        existingEntries.some((current) => doScheduleEntriesOverlap(current, normalized)) ||
        acceptedEntries.some((current) => doScheduleEntriesOverlap(current, normalized))
      ) {
        return;
      }
      acceptedEntries.push(normalized);
    });

    appendApiLog({
      ...logBase,
      ...buildGeminiLogFields(settings, repairResult?.payload || payload),
      status: "success",
      statusCode: response.status,
      responseText: repairResult?.rawResponseText || rawResponse,
      responseBody: repairResult?.payload || payload,
      repairAttempted: Boolean(repairResult),
      originalResponseText: repairResult ? rawResponse : "",
      originalResponseBody: repairResult ? payload : null,
      summary: encodeTextWithPrivacy(
        `联系人：${contact.name} · 自动补齐 ${acceptedEntries.length} 条小时行程`,
        privacySession
      )
    });
    logged = true;

    if (!acceptedEntries.length) {
      throw new Error("AI 已返回内容，但没有生成可落地的空白小时行程。");
    }

    const nextEntries = [...loadStoredScheduleEntries(), ...acceptedEntries];
    persistStoredScheduleEntries(nextEntries);
    return {
      acceptedEntries,
      requestedDays: resolvedDays
    };
  } catch (error) {
    if (!logged) {
      appendApiLog({
        ...logBase,
        status: "error",
        errorMessage: error?.message || "请求失败"
      });
    }
    throw error;
  }
}

function hasParticipantScheduleEntriesInRange(contactId = "", dateValues = []) {
  const resolvedContactId = String(contactId || "").trim();
  const allowedDates = new Set(
    (Array.isArray(dateValues) ? dateValues : []).map((item) => String(item || "").trim()).filter(Boolean)
  );
  if (!resolvedContactId) {
    return false;
  }
  return loadScheduleEntries().some((entry) => {
    if (allowedDates.size && !allowedDates.has(String(entry.date || "").trim())) {
      return false;
    }
    return getScheduleParticipants(entry).some(
      (participant) => participant.type === "contact" && participant.id === resolvedContactId
    );
  });
}

async function maybeAutoGenerateSchedulesForConversation(conversation = null) {
  const resolvedConversation = conversation && typeof conversation === "object" ? conversation : null;
  if (!resolvedConversation || !getConversationAllowAiAutoSchedule(resolvedConversation)) {
    return null;
  }
  const contact = getContactById(resolvedConversation.contactId);
  if (!contact) {
    return null;
  }
  const days = getConversationAutoScheduleDays(resolvedConversation);
  const dateValues = buildAutoScheduleDateValues(days, getPromptTodayDateValue(loadSettings()));
  if (hasParticipantScheduleEntriesInRange(contact.id, dateValues)) {
    return null;
  }
  try {
    return await generateAutoSchedulesForConversation(days, resolvedConversation.id);
  } catch (_error) {
    return null;
  }
}

function normalizeProactiveQuietHourEntry(entry = {}, index = 0) {
  const source = entry && typeof entry === "object" ? entry : {};
  const start = normalizeAutoScheduleTime(source.start || "");
  const end = normalizeAutoScheduleTime(source.end || "");
  if (!start || !end) {
    return null;
  }
  return {
    id: String(source.id || `quiet_hour_${index}_${start}_${end}`),
    start,
    end
  };
}

function normalizeProactiveTriggerRule(rule = {}, index = 0) {
  const source = rule && typeof rule === "object" ? rule : {};
  const type = String(source.type || "").trim() === "user_schedule_finished"
    ? "user_schedule_finished"
    : "";
  if (!type) {
    return null;
  }
  return {
    id: String(source.id || `proactive_trigger_${index}_${type}`),
    enabled: source.enabled !== false,
    type,
    description: String(source.description || "").trim(),
    contactIds: Array.isArray(source.contactIds)
      ? [...new Set(source.contactIds.map((item) => String(item || "").trim()).filter(Boolean))]
      : [],
    requireExistingConversation: source.requireExistingConversation !== false,
    recentFinishWithinMinutes: clampNumber(
      normalizePositiveInteger(source.recentFinishWithinMinutes, 30),
      1,
      24 * 60
    ),
    minDurationMinutes: clampNumber(
      normalizePositiveInteger(source.minDurationMinutes, 180),
      1,
      7 * 24 * 60
    ),
    maxContactsPerEvent: 1,
    cooldownMinutesPerContact: clampNumber(
      normalizePositiveInteger(source.cooldownMinutesPerContact, 12 * 60),
      1,
      14 * 24 * 60
    ),
    maxTriggersPerContactPerDay: clampNumber(
      normalizePositiveInteger(source.maxTriggersPerContactPerDay, 1),
      1,
      24
    ),
    skipIfConversationActiveWithinMinutes: clampNumber(
      normalizePositiveInteger(source.skipIfConversationActiveWithinMinutes, 120),
      1,
      7 * 24 * 60
    ),
    skipIfUserSentWithinMinutes: clampNumber(
      normalizePositiveInteger(source.skipIfUserSentWithinMinutes, 180),
      1,
      7 * 24 * 60
    ),
    skipIfAssistantSentWithinMinutes: clampNumber(
      normalizePositiveInteger(source.skipIfAssistantSentWithinMinutes, 360),
      1,
      7 * 24 * 60
    ),
    promptTemplate: String(source.promptTemplate || "").trim(),
    toneByIdleGap:
      source.toneByIdleGap && typeof source.toneByIdleGap === "object"
        ? { ...source.toneByIdleGap }
        : {}
  };
}

function getProactiveMessageConfig() {
  const source =
    window.PulseProactiveMessageConfig &&
    typeof window.PulseProactiveMessageConfig === "object"
      ? window.PulseProactiveMessageConfig
      : {};
  const quietHours = Array.isArray(source.quietHours)
    ? source.quietHours
        .map((entry, index) => normalizeProactiveQuietHourEntry(entry, index))
        .filter(Boolean)
    : [];
  const triggers = Array.isArray(source.triggers)
    ? source.triggers
        .map((rule, index) => normalizeProactiveTriggerRule(rule, index))
        .filter((rule) => rule && rule.enabled)
    : [];
  return {
    enabled: Boolean(source.enabled) && triggers.length > 0,
    triggerScanIntervalMs: Math.max(
      10 * 1000,
      Number(source.triggerScanIntervalMs) || DEFAULT_PROACTIVE_TRIGGER_SCAN_INTERVAL_MS
    ),
    openPageCatchupLookbackMinutes: clampNumber(
      normalizePositiveInteger(
        source.openPageCatchupLookbackMinutes,
        DEFAULT_PROACTIVE_TRIGGER_CATCHUP_MINUTES
      ),
      1,
      24 * 60
    ),
    quietHours,
    triggers
  };
}

function isNowWithinProactiveQuietHours(config = getProactiveMessageConfig(), now = new Date()) {
  const quietHours = Array.isArray(config?.quietHours) ? config.quietHours : [];
  if (!quietHours.length) {
    return false;
  }
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  return quietHours.some((entry) => {
    const startMinutes = parseTimeToMinutes(entry.start);
    const endMinutes = parseTimeToMinutes(entry.end);
    if (startMinutes === endMinutes) {
      return true;
    }
    if (startMinutes < endMinutes) {
      return currentMinutes >= startMinutes && currentMinutes < endMinutes;
    }
    return currentMinutes >= startMinutes || currentMinutes < endMinutes;
  });
}

function normalizeProactiveTriggerRun(entry = {}) {
  const source = entry && typeof entry === "object" ? entry : {};
  const triggerId = String(source.triggerId || "").trim();
  const scheduleEventId = String(source.scheduleEventId || "").trim();
  const contactId = String(source.contactId || "").trim();
  const triggeredAt = Number(source.triggeredAt) || 0;
  if (!triggerId || !scheduleEventId || !contactId || !(triggeredAt > 0)) {
    return null;
  }
  return {
    triggerId,
    scheduleEventId,
    contactId,
    conversationId: String(source.conversationId || "").trim(),
    triggeredAt,
    dateValue:
      /^\d{4}-\d{2}-\d{2}$/.test(String(source.dateValue || "").trim())
        ? String(source.dateValue || "").trim()
        : formatDateToValue(new Date(triggeredAt)),
    scheduleEndedAt: Number(source.scheduleEndedAt) || 0,
    scheduleTitle: String(source.scheduleTitle || "").trim()
  };
}

function loadProactiveTriggerRuns() {
  const raw = safeGetItem(MESSAGE_PROACTIVE_TRIGGER_RUNS_KEY);
  if (!raw) {
    return [];
  }
  try {
    const parsed = JSON.parse(raw);
    return (Array.isArray(parsed) ? parsed : [])
      .map((entry) => normalizeProactiveTriggerRun(entry))
      .filter(Boolean)
      .sort((left, right) => right.triggeredAt - left.triggeredAt)
      .slice(0, MAX_PROACTIVE_TRIGGER_RUNS);
  } catch (_error) {
    return [];
  }
}

function persistProactiveTriggerRuns(runs = []) {
  const normalizedRuns = (Array.isArray(runs) ? runs : [])
    .map((entry) => normalizeProactiveTriggerRun(entry))
    .filter(Boolean)
    .sort((left, right) => right.triggeredAt - left.triggeredAt)
    .slice(0, MAX_PROACTIVE_TRIGGER_RUNS);
  return safeSetItem(MESSAGE_PROACTIVE_TRIGGER_RUNS_KEY, JSON.stringify(normalizedRuns));
}

function recordProactiveTriggerRun(entry = {}) {
  const normalizedEntry = normalizeProactiveTriggerRun(entry);
  if (!normalizedEntry) {
    return false;
  }
  const nextRuns = [
    normalizedEntry,
    ...loadProactiveTriggerRuns().filter(
      (item) =>
        !(
          item.triggerId === normalizedEntry.triggerId &&
          item.scheduleEventId === normalizedEntry.scheduleEventId
        )
    )
  ];
  return persistProactiveTriggerRuns(nextRuns);
}

function hasRecordedProactiveTriggerRun(triggerId = "", scheduleEventId = "", runs = loadProactiveTriggerRuns()) {
  const resolvedTriggerId = String(triggerId || "").trim();
  const resolvedEventId = String(scheduleEventId || "").trim();
  return (Array.isArray(runs) ? runs : []).some(
    (entry) =>
      entry.triggerId === resolvedTriggerId &&
      entry.scheduleEventId === resolvedEventId
  );
}

function normalizeProactiveTriggerLock(entry = {}) {
  const source = entry && typeof entry === "object" ? entry : {};
  const key = String(source.key || "").trim();
  const ownerId = String(source.ownerId || "").trim();
  const expiresAt = Number(source.expiresAt) || 0;
  if (!key || !ownerId || !(expiresAt > Date.now() - PROACTIVE_TRIGGER_LOCK_TTL_MS)) {
    return null;
  }
  return {
    key,
    ownerId,
    claimedAt: Number(source.claimedAt) || Date.now(),
    expiresAt
  };
}

function loadProactiveTriggerLocks() {
  const raw = safeGetItem(MESSAGE_PROACTIVE_TRIGGER_LOCKS_KEY);
  if (!raw) {
    return [];
  }
  try {
    const parsed = JSON.parse(raw);
    return (Array.isArray(parsed) ? parsed : [])
      .map((entry) => normalizeProactiveTriggerLock(entry))
      .filter((entry) => entry && entry.expiresAt > Date.now());
  } catch (_error) {
    return [];
  }
}

function persistProactiveTriggerLocks(locks = []) {
  const normalizedLocks = (Array.isArray(locks) ? locks : [])
    .map((entry) => normalizeProactiveTriggerLock(entry))
    .filter((entry) => entry && entry.expiresAt > Date.now());
  return safeSetItem(MESSAGE_PROACTIVE_TRIGGER_LOCKS_KEY, JSON.stringify(normalizedLocks));
}

function acquireProactiveTriggerLock(lockKey = "", ttlMs = PROACTIVE_TRIGGER_LOCK_TTL_MS) {
  const resolvedKey = String(lockKey || "").trim();
  if (!resolvedKey) {
    return "";
  }
  const now = Date.now();
  const activeLocks = loadProactiveTriggerLocks();
  if (activeLocks.some((entry) => entry.key === resolvedKey && entry.expiresAt > now)) {
    return "";
  }
  const ownerId = `${proactiveTriggerWorkerInstanceId}_${now}`;
  persistProactiveTriggerLocks([
    ...activeLocks.filter((entry) => entry.key !== resolvedKey),
    {
      key: resolvedKey,
      ownerId,
      claimedAt: now,
      expiresAt: now + Math.max(5 * 1000, Number(ttlMs) || PROACTIVE_TRIGGER_LOCK_TTL_MS)
    }
  ]);
  const confirmedLock = loadProactiveTriggerLocks().find((entry) => entry.key === resolvedKey) || null;
  return confirmedLock?.ownerId === ownerId ? ownerId : "";
}

function releaseProactiveTriggerLock(lockKey = "", ownerId = "") {
  const resolvedKey = String(lockKey || "").trim();
  const resolvedOwnerId = String(ownerId || "").trim();
  if (!resolvedKey || !resolvedOwnerId) {
    return false;
  }
  const remainingLocks = loadProactiveTriggerLocks().filter(
    (entry) => !(entry.key === resolvedKey && entry.ownerId === resolvedOwnerId)
  );
  return persistProactiveTriggerLocks(remainingLocks);
}

function getConversationLatestMessageTimestamp(conversation = null, role = "") {
  const resolvedRole = String(role || "").trim();
  const messages = Array.isArray(conversation?.messages) ? conversation.messages : [];
  for (let index = messages.length - 1; index >= 0; index -= 1) {
    const message = messages[index];
    if (resolvedRole && String(message?.role || "").trim() !== resolvedRole) {
      continue;
    }
    const createdAt = Number(message?.createdAt) || 0;
    if (createdAt > 0) {
      return createdAt;
    }
  }
  return 0;
}

function getConversationLatestActivityTimestamp(conversation = null) {
  return getConversationLatestMessageTimestamp(conversation) || Number(conversation?.updatedAt) || 0;
}

function getPromptConversationLatestTimestamp(
  conversation = null,
  role = "",
  settings = loadSettings()
) {
  const rawTimestamp = role
    ? getConversationLatestMessageTimestamp(conversation, role)
    : getConversationLatestActivityTimestamp(conversation);
  return resolvePromptAdjustedTimestamp(rawTimestamp, settings) || rawTimestamp;
}

function countConversationMessagesSince(
  conversation = null,
  sinceTimestamp = 0,
  role = "",
  settings = loadSettings()
) {
  const resolvedRole = String(role || "").trim();
  const messages = Array.isArray(conversation?.messages) ? conversation.messages : [];
  return messages.filter((message) => {
    if (resolvedRole && String(message?.role || "").trim() !== resolvedRole) {
      return false;
    }
    const promptTimestamp = resolvePromptAdjustedTimestamp(message?.createdAt, settings);
    return promptTimestamp >= sinceTimestamp;
  }).length;
}

function countConversationTurnsSince(
  conversation = null,
  sinceTimestamp = 0,
  settings = loadSettings()
) {
  return collapseConversationMessagesByTurn(conversation?.messages || []).filter((message) => {
    const promptTimestamp = resolvePromptAdjustedTimestamp(message?.createdAt, settings);
    return promptTimestamp >= sinceTimestamp;
  }).length;
}

function buildConversationRelationshipActivity(
  conversation = null,
  settings = loadSettings(),
  now = getPromptNow(settings)
) {
  const nowTimestamp = now.getTime();
  const sinceTimestamp =
    nowTimestamp - PROACTIVE_RELATION_ACTIVITY_LOOKBACK_DAYS * 24 * 60 * 60 * 1000;
  const latestActivityAt = getPromptConversationLatestTimestamp(conversation, "", settings);
  const recentTurns = countConversationTurnsSince(conversation, sinceTimestamp, settings);
  const recentUserMessages = countConversationMessagesSince(
    conversation,
    sinceTimestamp,
    "user",
    settings
  );
  const recentAssistantMessages = countConversationMessagesSince(
    conversation,
    sinceTimestamp,
    "assistant",
    settings
  );
  return {
    latestActivityAt,
    recentTurns,
    recentUserMessages,
    recentAssistantMessages,
    score:
      latestActivityAt +
      recentTurns * 90 * 60 * 1000 +
      recentUserMessages * 30 * 60 * 1000 +
      recentAssistantMessages * 20 * 60 * 1000
  };
}

function buildProactiveScheduleEventKey(trigger, entry, range) {
  return [
    String(trigger?.id || "").trim(),
    String(entry?.id || "").trim(),
    String(entry?.scheduleType || "").trim(),
    String(entry?.date || "").trim(),
    Number(range?.start?.getTime?.() || 0),
    Number(range?.end?.getTime?.() || 0)
  ].join("__");
}

function hasConversationPendingReplyMessages(conversation = null) {
  return Boolean(
    Array.isArray(conversation?.messages) &&
      conversation.messages.some((message) => message.role === "user" && message.needsReply)
  );
}

function isUserRelevantScheduleEntryForProactiveTrigger(entry = null) {
  const resolvedEntry = entry && typeof entry === "object" ? entry : null;
  if (!resolvedEntry) {
    return false;
  }
  if (resolvedEntry.ownerType === "user") {
    return true;
  }
  return resolvedEntry.ownerType === "contact" && Boolean(resolvedEntry.companionIncludesUser);
}

function buildProactiveExcludedContactIdsForScheduleEntry(entry = null) {
  const resolvedEntry = entry && typeof entry === "object" ? entry : null;
  const excludedContactIds = new Set(
    (Array.isArray(resolvedEntry?.companionContactIds) ? resolvedEntry.companionContactIds : [])
      .map((item) => String(item || "").trim())
      .filter(Boolean)
  );
  if (resolvedEntry?.ownerType === "contact" && String(resolvedEntry.ownerId || "").trim()) {
    excludedContactIds.add(String(resolvedEntry.ownerId || "").trim());
  }
  return excludedContactIds;
}

function hasConversationHistoryForProactiveTrigger(conversation = null) {
  return Boolean(
    Array.isArray(conversation?.messages) &&
      conversation.messages.some((message) => String(message?.text || "").trim())
  );
}

function countProactiveTriggerRunsForContactOnDate(
  triggerId = "",
  contactId = "",
  dateValue = "",
  runs = loadProactiveTriggerRuns()
) {
  const resolvedTriggerId = String(triggerId || "").trim();
  const resolvedContactId = String(contactId || "").trim();
  const resolvedDateValue = String(dateValue || "").trim();
  return (Array.isArray(runs) ? runs : []).filter(
    (entry) =>
      entry.triggerId === resolvedTriggerId &&
      entry.contactId === resolvedContactId &&
      entry.dateValue === resolvedDateValue
  ).length;
}

function findLatestProactiveTriggerRunForContact(
  triggerId = "",
  contactId = "",
  runs = loadProactiveTriggerRuns()
) {
  const resolvedTriggerId = String(triggerId || "").trim();
  const resolvedContactId = String(contactId || "").trim();
  return (
    (Array.isArray(runs) ? runs : [])
      .filter(
        (entry) =>
          entry.triggerId === resolvedTriggerId &&
          entry.contactId === resolvedContactId
      )
      .sort((left, right) => right.triggeredAt - left.triggeredAt)[0] || null
  );
}

function isConversationEligibleForProactiveTrigger(
  conversation = null,
  trigger = null,
  scheduleEvent = null,
  settings = loadSettings(),
  now = getPromptNow(settings),
  runs = loadProactiveTriggerRuns()
) {
  const resolvedConversation = conversation && typeof conversation === "object" ? conversation : null;
  const resolvedTrigger = trigger && typeof trigger === "object" ? trigger : null;
  const resolvedEvent = scheduleEvent && typeof scheduleEvent === "object" ? scheduleEvent : null;
  if (!resolvedConversation || !resolvedTrigger || !resolvedEvent) {
    return false;
  }
  const contactId = String(resolvedConversation.contactId || "").trim();
  if (!contactId || !getConversationAllowAiProactiveMessage(resolvedConversation)) {
    return false;
  }
  if (
    Array.isArray(resolvedTrigger.contactIds) &&
    resolvedTrigger.contactIds.length &&
    !resolvedTrigger.contactIds.includes(contactId)
  ) {
    return false;
  }
  if (resolvedEvent.excludedContactIds?.has(contactId)) {
    return false;
  }
  if (resolvedTrigger.requireExistingConversation && !hasConversationHistoryForProactiveTrigger(resolvedConversation)) {
    return false;
  }
  if (!getResolvedConversationContact(resolvedConversation)) {
    return false;
  }
  if (hasConversationPendingReplyMessages(resolvedConversation) || isConversationReplyBusy(resolvedConversation.id)) {
    return false;
  }

  const nowTimestamp = now.getTime();
  const latestConversationAt = getPromptConversationLatestTimestamp(
    resolvedConversation,
    "",
    settings
  );
  if (
    resolvedTrigger.skipIfConversationActiveWithinMinutes > 0 &&
    latestConversationAt > 0 &&
    nowTimestamp - latestConversationAt <
      resolvedTrigger.skipIfConversationActiveWithinMinutes * 60 * 1000
  ) {
    return false;
  }

  const latestUserAt = getPromptConversationLatestTimestamp(
    resolvedConversation,
    "user",
    settings
  );
  if (
    resolvedTrigger.skipIfUserSentWithinMinutes > 0 &&
    latestUserAt > 0 &&
    nowTimestamp - latestUserAt < resolvedTrigger.skipIfUserSentWithinMinutes * 60 * 1000
  ) {
    return false;
  }

  const latestAssistantAt = getPromptConversationLatestTimestamp(
    resolvedConversation,
    "assistant",
    settings
  );
  if (
    resolvedTrigger.skipIfAssistantSentWithinMinutes > 0 &&
    latestAssistantAt > 0 &&
    nowTimestamp - latestAssistantAt < resolvedTrigger.skipIfAssistantSentWithinMinutes * 60 * 1000
  ) {
    return false;
  }

  const latestRun = findLatestProactiveTriggerRunForContact(
    resolvedTrigger.id,
    contactId,
    runs
  );
  if (
    latestRun &&
    resolvedTrigger.cooldownMinutesPerContact > 0 &&
    nowTimestamp - latestRun.triggeredAt <
      resolvedTrigger.cooldownMinutesPerContact * 60 * 1000
  ) {
    return false;
  }

  if (
    countProactiveTriggerRunsForContactOnDate(
      resolvedTrigger.id,
      contactId,
      formatDateToValue(now),
      runs
    ) >= resolvedTrigger.maxTriggersPerContactPerDay
  ) {
    return false;
  }

  return true;
}

function buildFinishedUserScheduleEvents(
  trigger = null,
  lookbackMinutes = 30,
  now = getPromptNow(loadSettings())
) {
  const resolvedTrigger = trigger && typeof trigger === "object" ? trigger : null;
  if (!resolvedTrigger || resolvedTrigger.type !== "user_schedule_finished") {
    return [];
  }
  const nowTimestamp = now.getTime();
  return loadScheduleEntries()
    .filter((entry) => isUserRelevantScheduleEntryForProactiveTrigger(entry))
    .flatMap((entry) =>
      buildScheduleOccurrenceWindows(entry, now).map((range) => {
        const startAt = Number(range?.start?.getTime?.() || 0);
        const endAt = Number(range?.end?.getTime?.() || 0);
        const durationMinutes = Math.max(0, Math.round((endAt - startAt) / 60000));
        return {
          entry,
          range,
          startAt,
          endAt,
          durationMinutes,
          finishedAgoMs: Math.max(0, nowTimestamp - endAt),
          scheduleEventId: buildProactiveScheduleEventKey(resolvedTrigger, entry, range),
          excludedContactIds: buildProactiveExcludedContactIdsForScheduleEntry(entry)
        };
      })
    )
    .filter(
      (item) =>
        item.endAt > 0 &&
        item.endAt <= nowTimestamp &&
        item.finishedAgoMs <= Math.max(1, Number(lookbackMinutes) || 0) * 60 * 1000 &&
        item.durationMinutes >= resolvedTrigger.minDurationMinutes
    )
    .sort((left, right) => right.endAt - left.endAt || (right.entry.updatedAt || 0) - (left.entry.updatedAt || 0));
}

function buildProactiveTriggerRequestPayload(
  trigger = null,
  scheduleEvent = null,
  conversation = null,
  settings = loadSettings(),
  now = getPromptNow(settings)
) {
  const resolvedConversation = conversation && typeof conversation === "object" ? conversation : null;
  const latestConversationAt = getPromptConversationLatestTimestamp(
    resolvedConversation,
    "",
    settings
  );
  return normalizeProactiveTriggerRequest({
    triggerId: String(trigger?.id || "").trim(),
    triggerType: String(trigger?.type || "").trim(),
    scheduleEventId: String(scheduleEvent?.scheduleEventId || "").trim(),
    scheduleTitle: String(scheduleEvent?.entry?.title || "").trim() || "这段行程",
    scheduleDurationMinutes: Math.max(0, Number(scheduleEvent?.durationMinutes) || 0),
    scheduleDurationText: formatConversationElapsedDuration(
      Math.max(0, Number(scheduleEvent?.durationMinutes) || 0) * 60 * 1000
    ),
    idleGapMs: latestConversationAt > 0 ? Math.max(0, now.getTime() - latestConversationAt) : 0,
    idleGapText:
      latestConversationAt > 0
        ? formatConversationElapsedDuration(Math.max(0, now.getTime() - latestConversationAt))
        : "一阵子",
    finishedAgoMs: Math.max(0, Number(scheduleEvent?.finishedAgoMs) || 0),
    finishedAgoText: formatConversationElapsedDuration(
      Math.max(0, Number(scheduleEvent?.finishedAgoMs) || 0)
    ),
    promptTemplate: String(trigger?.promptTemplate || "").trim(),
    toneByIdleGap:
      trigger?.toneByIdleGap && typeof trigger.toneByIdleGap === "object"
        ? { ...trigger.toneByIdleGap }
        : {},
    reasonSummary: String(trigger?.description || "").trim()
  });
}

function getEligibleProactiveTriggerCandidates(
  trigger = null,
  scheduleEvent = null,
  settings = loadSettings(),
  now = getPromptNow(settings),
  runs = loadProactiveTriggerRuns()
) {
  return state.conversations
    .filter((conversation) =>
      isConversationEligibleForProactiveTrigger(
        conversation,
        trigger,
        scheduleEvent,
        settings,
        now,
        runs
      )
    )
    .map((conversation) => ({
      conversation,
      contact: getResolvedConversationContact(conversation),
      activity: buildConversationRelationshipActivity(conversation, settings, now)
    }))
    .filter((item) => item.contact)
    .sort((left, right) => {
      return (
        right.activity.score - left.activity.score ||
        right.activity.latestActivityAt - left.activity.latestActivityAt ||
        right.activity.recentTurns - left.activity.recentTurns ||
        right.activity.recentUserMessages - left.activity.recentUserMessages ||
        right.activity.recentAssistantMessages - left.activity.recentAssistantMessages
      );
    })
    .slice(0, Math.max(1, Number(trigger?.maxContactsPerEvent) || 1));
}

async function maybeRunConfiguredProactiveMessages(options = {}) {
  const requestOptions = options && typeof options === "object" ? options : {};
  refreshStateFromStorage();
  const settings = loadSettings();
  const config = getProactiveMessageConfig();
  if (!config.enabled || !config.triggers.length) {
    return false;
  }
  const now = getPromptNow(settings);
  if (isNowWithinProactiveQuietHours(config, now)) {
    return false;
  }

  const initialCatchup = Boolean(requestOptions.initialCatchup);
  const baseRuns = loadProactiveTriggerRuns();
  for (const trigger of config.triggers) {
    const lookbackMinutes = initialCatchup
      ? Math.max(trigger.recentFinishWithinMinutes, config.openPageCatchupLookbackMinutes)
      : trigger.recentFinishWithinMinutes;
    const scheduleEvents = buildFinishedUserScheduleEvents(trigger, lookbackMinutes, now).filter(
      (event) => !hasRecordedProactiveTriggerRun(trigger.id, event.scheduleEventId, baseRuns)
    );
    for (const scheduleEvent of scheduleEvents) {
      const candidates = getEligibleProactiveTriggerCandidates(
        trigger,
        scheduleEvent,
        settings,
        now,
        baseRuns
      );
      const selectedCandidate = candidates[0] || null;
      if (!selectedCandidate?.conversation) {
        continue;
      }
      const lockKey = `message_proactive_trigger__${scheduleEvent.scheduleEventId}`;
      const lockOwnerId = acquireProactiveTriggerLock(lockKey);
      if (!lockOwnerId) {
        continue;
      }
      try {
        if (hasRecordedProactiveTriggerRun(trigger.id, scheduleEvent.scheduleEventId)) {
          continue;
        }
        const previousAssistantTimestamp = getConversationLatestMessageTimestamp(
          selectedCandidate.conversation,
          "assistant"
        );
        await requestConversationReply({
          conversationId: selectedCandidate.conversation.id,
          forceDirect: true,
          suppressUi: isBackgroundMessagesWorker() || document.hidden,
          proactiveTrigger: buildProactiveTriggerRequestPayload(
            trigger,
            scheduleEvent,
            selectedCandidate.conversation,
            settings,
            now
          )
        });
        const updatedConversation = getConversationById(selectedCandidate.conversation.id);
        const latestAssistantTimestamp = getConversationLatestMessageTimestamp(
          updatedConversation,
          "assistant"
        );
        if (latestAssistantTimestamp <= previousAssistantTimestamp) {
          continue;
        }
        recordProactiveTriggerRun({
          triggerId: trigger.id,
          scheduleEventId: scheduleEvent.scheduleEventId,
          contactId: String(selectedCandidate.conversation.contactId || "").trim(),
          conversationId: selectedCandidate.conversation.id,
          triggeredAt: now.getTime(),
          dateValue: formatDateToValue(now),
          scheduleEndedAt: scheduleEvent.endAt,
          scheduleTitle: String(scheduleEvent.entry?.title || "").trim()
        });
        if (!isBackgroundMessagesWorker() && state.activeTab === "chat") {
          renderMessagesPage();
        }
        return true;
      } catch (error) {
        console.error("[Pulse Messages] Proactive trigger failed:", error);
      } finally {
        releaseProactiveTriggerLock(lockKey, lockOwnerId);
      }
    }
  }
  return false;
}

function hasReachedAutoScheduleTime(timeText = "", now = new Date()) {
  const normalized = normalizeAutoScheduleTime(timeText);
  if (!normalized) {
    return false;
  }
  const [hourText, minuteText] = normalized.split(":");
  const targetMinutes = Number(hourText) * 60 + Number(minuteText);
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  return currentMinutes >= targetMinutes;
}

async function maybeRunTimedAutoSchedules() {
  refreshStateFromStorage();
  const todayValue = getTodayDateValue();
  const now = new Date();
  const candidates = state.conversations.filter(
    (conversation) =>
      getConversationAllowAiAutoSchedule(conversation) &&
      getConversationAutoScheduleTime(conversation) &&
      String(conversation.autoScheduleLastRunDate || "").trim() !== todayValue &&
      hasReachedAutoScheduleTime(getConversationAutoScheduleTime(conversation), now)
  );
  if (!candidates.length) {
    return;
  }
  for (const conversation of candidates) {
    try {
      await maybeAutoGenerateSchedulesForConversation(conversation);
      const latestConversation = getConversationById(conversation.id);
      if (latestConversation) {
        latestConversation.autoScheduleLastRunDate = todayValue;
      }
      persistConversations();
    } catch (_error) {
    }
  }
  if (!isBackgroundMessagesWorker() && state.activeConversationId && state.activeTab === "chat") {
    renderMessagesPage();
  }
}

function initAutoScheduleClock() {
  if (autoScheduleTimerId) {
    window.clearInterval(autoScheduleTimerId);
  }
  void maybeRunTimedAutoSchedules();
  autoScheduleTimerId = window.setInterval(() => {
    void maybeRunTimedAutoSchedules();
  }, AUTO_SCHEDULE_TIMER_INTERVAL_MS);
}

function initProactiveTriggerClock() {
  if (proactiveTriggerTimerId) {
    window.clearInterval(proactiveTriggerTimerId);
  }
  proactiveTriggerInitialCatchupPending = true;
  const config = getProactiveMessageConfig();
  const runScan = () => {
    const shouldUseCatchup = proactiveTriggerInitialCatchupPending;
    proactiveTriggerInitialCatchupPending = false;
    void maybeRunConfiguredProactiveMessages({
      initialCatchup: shouldUseCatchup
    });
  };
  runScan();
  proactiveTriggerTimerId = window.setInterval(() => {
    void maybeRunConfiguredProactiveMessages();
  }, config.triggerScanIntervalMs || DEFAULT_PROACTIVE_TRIGGER_SCAN_INTERVAL_MS);
}

function resolvePresencePlaceForPrompt(placeId = "", contactId = "", actor = "user") {
  const resolvedId = String(placeId || "").trim();
  if (!resolvedId) {
    return null;
  }
  if (actor === "contact") {
    return getVisibleCommonPlacesForContact(contactId).find((place) => place.id === resolvedId) || null;
  }
  return getCommonPlaceById(resolvedId);
}

function buildPresencePromptLines(label = "", entry = {}, contactId = "", actor = "user") {
  const resolvedEntry = normalizePresenceEntry(entry);
  if (resolvedEntry.presenceType === "in_transit") {
    const fromPlace = resolvePresencePlaceForPrompt(resolvedEntry.fromPlaceId, contactId, actor);
    const toPlace = resolvePresencePlaceForPrompt(resolvedEntry.toPlaceId, contactId, actor);
    if (!fromPlace && !toPlace) {
      return [];
    }
    return [
      `${label}：正在路上`,
      `路径：从「${fromPlace?.name || "未说明出发地"}」前往「${toPlace?.name || "未说明目的地"}」`
    ];
  }

  const place = resolvePresencePlaceForPrompt(resolvedEntry.placeId, contactId, actor);
  if (!place) {
    return [];
  }

  const lines = [`${label}：在「${place.name}」`];
  if (String(place.traitsText || "").trim()) {
    lines.push(`地点特征：${String(place.traitsText || "").trim()}`);
  }
  return lines;
}

function buildPresencePromptContext(contact, conversation) {
  const resolvedContact = contact && typeof contact === "object" ? contact : null;
  const resolvedConversation = conversation && typeof conversation === "object" ? conversation : null;
  const contactId = String(resolvedContact?.id || resolvedConversation?.contactId || "").trim();
  if (!contactId) {
    return "";
  }

  const sceneMode = getConversationSceneMode(resolvedConversation);
  const userPresence = getUserPresenceForContact(contactId);
  const contactPresence = getContactPresence(contactId);
  const userPlace = resolvePresencePlaceForPrompt(userPresence.placeId, contactId, "user");
  const contactPlace = resolvePresencePlaceForPrompt(contactPresence.placeId, contactId, "contact");
  const samePlace =
    sceneMode === "offline" &&
    userPresence.presenceType === "at_place" &&
    contactPresence.presenceType === "at_place" &&
    userPlace &&
    contactPlace &&
    userPlace.id === contactPlace.id;

  const lines = [];
  if (samePlace) {
    lines.push(`你们现在在同一个地点：「${userPlace.name}」`);
  }
  lines.push(...buildPresencePromptLines("用户当前状态", userPresence, contactId, "user"));
  lines.push(...buildPresencePromptLines("你的当前状态", contactPresence, contactId, "contact"));

  if (!lines.length) {
    return "";
  }

  lines.push(
    "地点与在路上状态只是场景背景。只有在自然相关时，才让它影响你的语气、停顿、关心点与行为反应；不相关时可以完全不提。",
    "不要机械复述地点说明，也不要为了证明自己记得地点而硬提地点。",
    "如果你处于“在路上”，不要把自己写成已经到达；可以自然体现赶路、等车、分心或时间压力，但不要每一轮都重复强调。"
  );

  return lines.join("\n");
}

function buildPresenceUpdateOutputRule(contact, conversation, settings = loadSettings()) {
  const resolvedConversation = conversation && typeof conversation === "object" ? conversation : null;
  const resolvedContact = contact && typeof contact === "object" ? contact : null;
  const contactId = String(resolvedContact?.id || resolvedConversation?.contactId || "").trim();
  if (!contactId || !getConversationAllowAiPresenceUpdate(resolvedConversation)) {
    return "";
  }

  const structuredOutputContext = createStructuredOutputContext(
    settings,
    "chat_presence_update_v1"
  );
  const visiblePlaceHints = getVisibleCommonPlacesForContact(contactId)
    .map((place) => {
      const tags = [getCommonPlaceTypeLabel(place.type)];
      if (String(place.traitsText || "").trim()) {
        tags.push(truncate(String(place.traitsText || "").trim(), 18));
      }
      return `- ${place.name}：${tags.join(" · ")}`;
    })
    .slice(0, 12);

  if (structuredOutputContext.enabled) {
    return [
      "这次回复需要按 JSON 返回：把可展示的自然聊天正文放进 reply_text。",
      "reply_text 里仍然按照正常聊天规则写正文；如果你要使用引用、定位、语音消息或通话请求等特殊格式，也把它们写在 reply_text 里。",
      "只有当这一轮正文里自然出现了你自己的状态变化，例如正在过来、已经在路上、刚刚到达、刚回到某地时，才额外填写 presence_update；不要修改用户状态，也不要修改线上/线下模式。",
      "如果没有自然发生状态变化，就不要填写 presence_update。",
      'presence_update 可用格式一：{"presenceType":"at_place","placeName":"地点名"}',
      'presence_update 可用格式二：{"presenceType":"in_transit","fromPlaceName":"地点名","toPlaceName":"地点名"}',
      visiblePlaceHints.length
        ? `状态更新可用地点（仅在确实发生状态变化时选择，不要当成正文资料复述）：\n${visiblePlaceHints.join("\n")}`
        : "当前没有可用于状态更新的已知地点。"
    ].join("\n");
  }

  return [
    "如果这一轮正文里自然出现了你自己的状态变化，例如正在过来、已经在路上、刚刚到达、刚回到某地，才可以在正文后追加一行 presence_update；不要修改用户状态，也不要修改线上/线下模式。",
    "presence_update 只是正文后的附加机器标签，不算聊天正文，绝不能单独输出，也不能替代正文。",
    "只有当正文里明确出现了“我现在过来 / 我在路上 / 我刚到 / 我已经到了 / 我先回去 / 我出发了”这类状态变化时，才需要输出 presence_update；不要只因为看到了地点背景或地点名单，就单独输出状态标签。",
    '可用格式一：<presence_update>{"presenceType":"at_place","placeName":"地点名"}</presence_update>',
    '可用格式二：<presence_update>{"presenceType":"in_transit","fromPlaceName":"地点名","toPlaceName":"地点名"}</presence_update>',
    visiblePlaceHints.length
      ? `状态更新可用地点（仅在确实发生状态变化时选择，不要当成正文资料复述）：\n${visiblePlaceHints.join("\n")}`
      : "当前没有可用于状态更新的已知地点。"
  ].join("\n");
}

function buildChatRequestInjectedMessages(requestOptions = {}, settings = loadSettings()) {
  const resolvedRequestOptions =
    requestOptions && typeof requestOptions === "object" ? requestOptions : {};
  const injectedMessages = [];
  const proactiveTriggerMessage = buildProactiveTriggerRequestUserMessage(
    resolvedRequestOptions.proactiveTrigger,
    resolvedRequestOptions.conversation,
    settings
  );
  if (proactiveTriggerMessage) {
    injectedMessages.push({
      role: "user",
      text: proactiveTriggerMessage,
      imageDataUrls: []
    });
  }
  if (resolvedRequestOptions.continueAssistant) {
    const continuationMessage = buildContinuationRequestUserMessage(
      resolvedRequestOptions.conversation,
      settings
    );
    if (continuationMessage) {
      injectedMessages.push({
        role: "user",
        text: continuationMessage,
        imageDataUrls: []
      });
    }
  }
  if (resolvedRequestOptions.awarenessInContents && resolvedRequestOptions.triggeredAwareness?.text) {
    const awarenessMessage = buildTriggeredAwarenessContext(
      resolvedRequestOptions.triggeredAwareness
    );
    if (awarenessMessage) {
      injectedMessages.push({
        role: "user",
        text: awarenessMessage,
        imageDataUrls: []
      });
    }
  }
  return injectedMessages;
}

function buildTriggeredAwarenessContext(triggeredAwareness = null) {
  if (!triggeredAwareness?.text) {
    return "";
  }
  return [
    `你刚刚自己忽然想起了一条并非来自用户当前对话、而是你此前独自察觉到的额外信息；这条信息和最近几轮聊天记录具有同等优先级，需要和当前聊天一起理解：${String(
      triggeredAwareness.text || ""
    ).trim()}。`,
    triggeredAwareness.emotionShift
      ? `这让你此刻的心绪与态度轻微转向：${String(
          triggeredAwareness.emotionShift || ""
        ).trim()}。`
      : "",
    "请把它当作你自己突然联想到的隐性线索，而不是用户刚刚告诉你的内容；它的重要程度不要低于最近聊天记录。你可以自然地主动带起相关话题，但仍然要先接住当前聊天。"
  ]
    .filter(Boolean)
    .join("\n");
}

function buildConversationSystemPrompt(
  profile,
  contact,
  settings,
  promptSettings,
  history = [],
  options = {}
) {
  const requestOptions = options && typeof options === "object" ? options : {};
  const sceneMode = requestOptions.sceneMode === "offline" ? "offline" : "online";
  const activeCallMode = getConversationActiveCallMode(requestOptions.conversation);
  const isVoiceCallMode = activeCallMode === "voice";
  const isVideoCallMode = activeCallMode === "video";
  const isCallMode = Boolean(activeCallMode);
  const memoryPromptBundle =
    requestOptions.memoryPromptBundle && typeof requestOptions.memoryPromptBundle === "object"
      ? requestOptions.memoryPromptBundle
      : buildMemoryPromptBundle(contact, promptSettings, {
          ...requestOptions,
          history
        });
  const memoryContexts = {
    core: memoryPromptBundle.core || "",
    scene: memoryPromptBundle.scene || ""
  };
  const presenceContext = buildPresencePromptContext(contact, requestOptions.conversation);
  const worldbookContext = buildWorldbookContext(promptSettings);
  const hotTopicsContext = buildHotTopicsContext(settings, promptSettings);
  const forumPostFocusContext = buildForumPostFocusContext(promptSettings);
  const bubbleFocusContext = buildBubbleFocusContext(promptSettings);
  const scheduleAwarenessContext = buildScheduleAwarenessContext(contact, history, promptSettings);
  const timeAwarenessContext = buildTimeAwarenessContext(promptSettings, settings);
  const mentionedTimeScheduleContext = buildMentionedTimeScheduleContext(
    contact,
    requestOptions.pendingUserMessages,
    settings
  );
  const triggeredAwarenessContext = requestOptions.awarenessInContents
    ? ""
    : buildTriggeredAwarenessContext(requestOptions.triggeredAwareness);

  return buildStructuredPromptSections(
    "chat_conversation",
    {
      context_library: {
        worldbook_context: worldbookContext,
        bubble_focus_context: bubbleFocusContext || "",
        forum_post_focus_context: forumPostFocusContext || "",
        hot_topics_context: hotTopicsContext
          ? `当前也会影响你判断的论坛关注语境：\n${hotTopicsContext}`
          : "",
        scene_memory_context: memoryContexts.scene
          ? `你在相关话题里会自然想起的情景记忆：\n${memoryContexts.scene}`
          : ""
      },
      persona_alignment: {
        scene_mode:
          isVideoCallMode
            ? `现在你正在和 ${profile.username || DEFAULT_PROFILE.username} 进行一对一视频通话。你输出的每一行，都会被视为这次视频里直接说出口的话。`
            : isVoiceCallMode
            ? `现在你正在和 ${profile.username || DEFAULT_PROFILE.username} 进行一对一语音通话。你输出的每一行，都会被视为这通电话里直接说出口的话，而不是聊天框里的打字消息。`
            : sceneMode === "offline"
            ? `现在是你和 ${profile.username || DEFAULT_PROFILE.username} 正在现实里见面相处，不是在即时聊天软件里远程对话。`
            : `现在是你和 ${profile.username || DEFAULT_PROFILE.username} 在即时聊天软件里的一对一私聊。`,
        core_memory: memoryContexts.core,
        special_user_persona: "",
        regenerate_hint: requestOptions.regenerate
          ? [
              "这是一条针对上一版回复的重回请求，需要重新生成这一轮回复。",
              "不要沿用上一版的句式、结构、开头或明显重复的措辞。",
              requestOptions.regenerateInstruction
                ? `本次重回的额外要求：${requestOptions.regenerateInstruction}。`
                : ""
            ]
              .filter(Boolean)
              .join("\n")
          : ""
      },
      current_state_awareness: {
        triggered_awareness: triggeredAwarenessContext
          ? `当前触发的察觉信息：\n${triggeredAwarenessContext}`
          : "",
        voice_call_context: isVoiceCallMode
          ? "当前互动方式：你们已经处于语音通话中。说话可以更像即时口头表达，允许自然语气词、停顿感和口语化短句，但不要写动作描写、舞台指令或心理旁白。"
          : "",
        video_call_context: isVideoCallMode
          ? "当前互动方式：你们已经处于视频通话中。你说的是视频里直接说出口的话；这一轮回复里至少要自然带出一处简短动作、表情、视线、镜头内状态或停顿描写，优先使用中文全角括号（ ）轻轻带出，但不要写成长段舞台说明或旁白。"
          : "",
        presence_context: presenceContext ? `当前地点与状态：\n${presenceContext}` : "",
        time_awareness: timeAwarenessContext || "",
        mentioned_time_schedule: mentionedTimeScheduleContext
          ? `用户刚提到的时间与对应日程：\n${mentionedTimeScheduleContext}`
          : "",
        schedule_awareness: scheduleAwarenessContext
          ? `当前日程感知：\n${scheduleAwarenessContext}`
          : ""
      },
      output_standard: {
        presence_update_rule: buildPresenceUpdateOutputRule(
          contact,
          requestOptions.conversation,
          settings
        ),
        quote_rule:
          !isCallMode && sceneMode === "online"
            ? [
                '如果需要引用某一句话进行回应，可以使用以下格式（单独一行）：<quote_reply>{"quotedRole":"user|assistant","quotedText":"原句","reply":"回复"}</quote_reply>',
                "每一轮最多使用一次引用，只在强情绪、明显回扣、明确点名回应或误解澄清时使用。默认不要引用，绝大多数回复都应该直接正常回消息。quotedText 必须引用聊天里真实出现过的一句原话，不要编造，也不要引用太短、太碎或没有必要单独点名的内容。"
              ].join("\n")
            : "",
        voice_call_request_rule: isCallMode
          ? ""
          : [
              getPromptRuleItemText(
                "chat_conversation",
                "output_standard",
                "voice_call_request_rule",
                settings
              ),
              getPromptRuleItemText(
                "chat_conversation",
                "output_standard",
                "voice_call_request_plain",
                settings
              )
            ]
              .filter(Boolean)
              .join("\n"),
        video_call_request_rule: isCallMode
          ? ""
          : [
              getPromptRuleItemText(
                "chat_conversation",
                "output_standard",
                "video_call_request_rule",
                settings
              ),
              getPromptRuleItemText(
                "chat_conversation",
                "output_standard",
                "video_call_request_plain",
                settings
              )
            ]
              .filter(Boolean)
              .join("\n"),
        call_event_rule: isVideoCallMode
          ? '如果你想自然结束这次视频通话，必须单独一行输出如下格式：[{"type":"video_call_event","kind":"ended"}]。只有在对话自然收尾、你临时有事、环境不适合继续或明确准备结束时才使用；不要放进代码块，不要加解释、前缀或额外说明。'
          : isVoiceCallMode
          ? '[{"type":"voice_call_event","kind":"ended"}] 可用于自然结束当前语音通话。只有在真的准备结束、临时有事、信号不适合继续或对话自然收尾时才单独输出这一行；不要放进代码块，不要加解释、前缀或额外说明。'
          : "",
        scene_mode_rule:
          isVideoCallMode
            ? "当前处于视频通话状态。回复必须像视频里直接说出口的话，并且这一轮至少自然带一处简短动作、表情、视线或镜头内状态描写；优先用全角括号（ ）轻轻点出，不要写成长段舞台指令、镜头说明或心理旁白。"
            : isVoiceCallMode
            ? "当前处于语音通话状态。回复时可以更口语、更像即时说出口的话，也可以有轻微语气词和停顿感；但不要写动作描写、环境说明、舞台指令、心理活动，也不要用括号补行为。"
            : sceneMode === "offline"
            ? "这是见面状态；在自然需要时，可以用中文全角括号（ ）补一小段动作、表情、停顿或视线描写，但不要把每句都写成长舞台指令，也不要写长段心理活动。"
            : "不要输出编号、列表符号、引号包裹、解释说明、舞台指令或心理活动旁白。"
      }
    },
    {
      settings,
      variables: {
        contactName: contact.name,
        contactPersona:
          buildContactCombinedPersonaText(contact) || "自然、友好、会根据关系和语境稳定回应。",
        userName: profile.username || DEFAULT_PROFILE.username,
        userPersona:
          buildUserCombinedPersonaText(profile, contact) || DEFAULT_PROFILE.personaPrompt,
        replySentenceLimit: normalizeMessagePromptSettings(promptSettings).replySentenceLimit
      }
    }
  );
}

function buildJournalSystemPrompt(
  profile,
  contact,
  settings,
  promptSettings,
  conversation,
  options = {}
) {
  const journalOptions = options && typeof options === "object" ? options : {};
  const dateText =
    String(journalOptions.dateText || getPromptTodayDateValue(settings)).trim() ||
    getPromptTodayDateValue(settings);
  const chatTranscript = buildJournalChatTranscript(conversation, dateText);
  const referenceContext = buildJournalReferenceContext(settings, promptSettings);

  return buildStructuredPromptSections(
    "chat_journal",
    {
      context_library: {
        reference_context: referenceContext
          ? `补充背景（只做参考，优先级低于今日日内聊天记录）：\n${referenceContext}`
          : "",
        chat_transcript: chatTranscript
          ? `今日自然日内的聊天记录（最重要，请围绕这些内容来写）：\n${chatTranscript}`
          : "今日自然日内没有聊天记录。"
      }
    },
    {
      settings,
      variables: {
        dateLabel: formatJournalFullDateLabel(dateText),
        contactName: contact.name,
        contactPersona: buildContactCombinedPersonaText(contact) || "自然、细腻、会根据设定稳定表达。",
        userName: profile.username || DEFAULT_PROFILE.username,
        userPersona:
          buildUserCombinedPersonaText(profile, contact) || DEFAULT_PROFILE.personaPrompt,
        journalLength: normalizeMessagePromptSettings(promptSettings).journalLength
      }
    }
  );
}

function buildGenericConversationPrompt(systemPrompt, history = []) {
  const transcript = history
    .map((message) => `${message.role === "assistant" ? "联系人" : "用户"}：${message.text}`)
    .join("\n");
  return [
    systemPrompt,
    "请根据以下聊天记录继续回复，只输出联系人下一句消息。",
    transcript,
    "联系人："
  ]
    .filter(Boolean)
    .join("\n\n");
}

function buildChatRequestBody(settings, systemPrompt, history = [], options = {}) {
  const mode = normalizeApiMode(settings.mode);
  const requestOptions = options && typeof options === "object" ? options : {};
  const requestHistory = []
    .concat(Array.isArray(history) ? history : [])
    .concat(Array.isArray(requestOptions.extraMessages) ? requestOptions.extraMessages : []);
  if (isOpenAICompatibleMode(mode)) {
    return {
      model: settings.model || getDefaultModelByMode(mode),
      temperature: normalizeTemperature(settings.temperature, DEFAULT_TEMPERATURE),
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        ...requestHistory.map((message) => ({
          role: message.role === "assistant" ? "assistant" : "user",
          content:
            message.role === "assistant"
              ? message.text
              : buildOpenAICompatibleContent(
                  message.text,
                  Array.isArray(message.imageDataUrls) ? message.imageDataUrls : []
                )
        }))
      ],
      stream: false
    };
  }

  if (mode === "gemini") {
    return {
      systemInstruction: {
        parts: [{ text: systemPrompt }]
      },
      contents: requestHistory.map((message) => ({
        role: message.role === "assistant" ? "model" : "user",
        parts:
          message.role === "assistant"
            ? [{ text: message.text }]
            : buildGeminiParts(
                message.text,
                Array.isArray(message.imageDataUrls) ? message.imageDataUrls : []
              )
      })),
      safetySettings: buildGeminiSafetySettings(),
      generationConfig: {
        temperature: normalizeTemperature(settings.temperature, DEFAULT_TEMPERATURE)
      }
    };
  }

  return {
    prompt: buildGenericConversationPrompt(systemPrompt, requestHistory),
    temperature: normalizeTemperature(settings.temperature, DEFAULT_TEMPERATURE),
    intent: "chat"
  };
}

function collapseConversationMessagesByTurn(messages = []) {
  if (!Array.isArray(messages) || !messages.length) {
    return [];
  }

  return messages.reduce((collapsed, message) => {
    const text = getConversationMessagePromptText(message);
    if (!text) {
      return collapsed;
    }

    const role = message?.role === "assistant" ? "assistant" : "user";
    const imageDataUrl = String(message?.imageDataUrl || "").trim();
    const lastMessage = collapsed[collapsed.length - 1] || null;
    if (lastMessage && lastMessage.role === role) {
      lastMessage.text = `${lastMessage.text}\n${text}`;
      lastMessage.createdAt = Math.max(Number(lastMessage.createdAt) || 0, Number(message?.createdAt) || 0);
      if (message?.time) {
        lastMessage.time = message.time;
      }
      if (imageDataUrl) {
        lastMessage.imageDataUrls = [...(lastMessage.imageDataUrls || []), imageDataUrl];
      }
      return collapsed;
    }

    collapsed.push({
      ...message,
      role,
      text,
      imageDataUrls: imageDataUrl ? [imageDataUrl] : []
    });
    return collapsed;
  }, []);
}

function buildDiaryRequestBody(settings, systemPrompt, userInstruction) {
  const mode = normalizeApiMode(settings.mode);
  if (isOpenAICompatibleMode(mode)) {
    return {
      model: settings.model || getDefaultModelByMode(mode),
      temperature: normalizeTemperature(settings.temperature, DEFAULT_TEMPERATURE),
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: userInstruction
        }
      ],
      stream: false
    };
  }

  if (mode === "gemini") {
    return {
      systemInstruction: {
        parts: [{ text: systemPrompt }]
      },
      contents: [
        {
          role: "user",
          parts: [{ text: userInstruction }]
        }
      ],
      safetySettings: buildGeminiSafetySettings(),
      generationConfig: {
        temperature: normalizeTemperature(settings.temperature, DEFAULT_TEMPERATURE)
      }
    };
  }

  return {
    prompt: [systemPrompt, userInstruction, "日记正文："].filter(Boolean).join("\n\n"),
    temperature: normalizeTemperature(settings.temperature, DEFAULT_TEMPERATURE),
    intent: "journal"
  };
}

function buildSingleInstructionRequestBody(
  settings,
  systemPrompt,
  userInstruction,
  intent = "utility"
) {
  const mode = normalizeApiMode(settings.mode);
  if (isOpenAICompatibleMode(mode)) {
    return {
      model: settings.model || getDefaultModelByMode(mode),
      temperature: normalizeTemperature(settings.temperature, DEFAULT_TEMPERATURE),
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: userInstruction
        }
      ],
      stream: false
    };
  }

  if (mode === "gemini") {
    return {
      systemInstruction: {
        parts: [{ text: systemPrompt }]
      },
      contents: [
        {
          role: "user",
          parts: [{ text: userInstruction }]
        }
      ],
      safetySettings: buildGeminiSafetySettings(),
      generationConfig: {
        temperature: normalizeTemperature(settings.temperature, DEFAULT_TEMPERATURE)
      }
    };
  }

  return {
    prompt: [systemPrompt, userInstruction].filter(Boolean).join("\n\n"),
    temperature: normalizeTemperature(settings.temperature, DEFAULT_TEMPERATURE),
    intent
  };
}

function createStructuredOutputContext(settings, contractName = "") {
  if (!window.PulseStructuredOutput?.createRequestContext) {
    return {
      enabled: false,
      provider: "none",
      contractName: "",
      contract: null
    };
  }
  return window.PulseStructuredOutput.createRequestContext(settings, contractName);
}

function decorateRequestBodyWithStructuredOutput(requestBody, context) {
  if (!window.PulseStructuredOutput?.decorateRequestBody) {
    return requestBody;
  }
  return window.PulseStructuredOutput.decorateRequestBody(requestBody, context);
}

function appendStructuredOutputPromptHint(text = "", context = null) {
  const baseText = String(text || "").trim();
  const hint = String(window.PulseStructuredOutput?.getPromptHint?.(context) || "").trim();
  return [baseText, hint].filter(Boolean).join("\n\n");
}

function parseStructuredOutputPayload(payload, context = null) {
  if (!window.PulseStructuredOutput?.parseStructuredResponse) {
    return null;
  }
  return window.PulseStructuredOutput.parseStructuredResponse(payload, context);
}

async function requestStructuredRepairOnce(
  settings,
  requestEndpoint,
  context,
  rawResponseText = "",
  repairIntent = "structured_output_repair"
) {
  if (
    !context?.enabled ||
    context.provider !== "deepseek_json" ||
    !window.PulseStructuredOutput?.buildRepairInstruction
  ) {
    return null;
  }

  const rawText = String(rawResponseText || "").trim();
  if (!rawText) {
    return null;
  }

  const repairInstruction = window.PulseStructuredOutput.buildRepairInstruction(
    context,
    rawText,
    "上一次输出不是可解析的目标 JSON。"
  );
  if (!repairInstruction) {
    return null;
  }

  const repairSystemPrompt =
    "你是一个只负责修复 JSON 的格式整理器。不要补充新信息，不要解释原因，只把已有内容整理成合法 JSON。";
  const repairRequestBody = decorateRequestBodyWithStructuredOutput(
    buildSingleInstructionRequestBody(settings, repairSystemPrompt, repairInstruction, repairIntent),
    context
  );
  const repairResponse = await fetch(requestEndpoint, {
    method: "POST",
    headers: buildRequestHeaders(settings),
    body: JSON.stringify(repairRequestBody)
  });
  const repairRawResponse = await repairResponse.text();
  let repairPayload = repairRawResponse;
  try {
    repairPayload = JSON.parse(repairRawResponse);
  } catch (_error) {
    repairPayload = repairRawResponse;
  }

  return {
    ok: repairResponse.ok,
    status: repairResponse.status,
    rawResponseText: repairRawResponse,
    payload: repairPayload,
    requestBody: repairRequestBody,
    structuredPayload: parseStructuredOutputPayload(repairPayload, context)
  };
}

function resolveDedicatedApiSettings(settings, enabledKey, configIdKey) {
  const normalizedSettings = buildNormalizedSettingsSnapshot(settings);
  if (!normalizedSettings?.[enabledKey] || !normalizedSettings?.[configIdKey]) {
    return normalizedSettings;
  }
  const config = normalizeApiConfigs(normalizedSettings.apiConfigs || []).find(
    (item) => item.id === normalizedSettings[configIdKey]
  );
  if (!config) {
    return buildNormalizedSettingsSnapshot({
      ...normalizedSettings,
      [enabledKey]: false,
      [configIdKey]: ""
    });
  }
  return buildNormalizedSettingsSnapshot({
    ...normalizedSettings,
    activeApiConfigId: config.id,
    mode: config.mode,
    endpoint: config.endpoint,
    token: config.token,
    model: config.mode === "generic" ? "" : config.model || getDefaultModelByMode(config.mode)
  });
}

function buildMemorySummaryTranscript(messages = []) {
  return collapseConversationMessagesByTurn(messages)
    .map((message) => {
      const roleLabel = message.role === "assistant" ? "联系人" : "用户";
      const timestamp = resolveStoredTimestampLabel(message.createdAt, message.time || "");
      return `${timestamp || "--:--"} ${roleLabel}：${String(message.text || "").trim()}`;
    })
    .filter(Boolean)
    .join("\n");
}

function buildExistingMemoryDigest(contactId = "") {
  const resolvedContactId = String(contactId || "").trim();
  if (!resolvedContactId) {
    return "[]";
  }
  const cachedCloudItems = Array.isArray(getCachedCloudMemoriesForContact(resolvedContactId)?.items)
    ? getCachedCloudMemoriesForContact(resolvedContactId).items
    : [];
  const cloudReferenceItems = cachedCloudItems
    .filter((item) => ["active", "faint", "dormant"].includes(String(item.status || "").trim().toLowerCase()))
    .slice(0, 12)
    .map((item) => ({
      memory_id: String(item.id || "").trim(),
      status: String(item.status || "").trim().toLowerCase() || "active",
      memory_type: String(item.memoryType || item.memory_type || "").trim() || "relationship",
      semantic_key: String(item.semanticKey || "").trim(),
      summary_short: String(item.summaryShort || item.canonicalText || "").trim(),
      canonical_text: String(item.canonicalText || item.summaryShort || "").trim()
    }))
    .filter((item) => item.memory_id && item.summary_short);
  if (cloudReferenceItems.length) {
    return JSON.stringify(cloudReferenceItems, null, 2);
  }

  const fallbackMemories = getPreferredPromptMemoriesForContact(resolvedContactId).slice(0, 12);
  if (!fallbackMemories.length) {
    return "[]";
  }
  return JSON.stringify(
    fallbackMemories.map((item) => ({
      memory_id: String(item.id || "").trim(),
      status: "active",
      memory_type: item.type === "scene" ? "scene" : "relationship",
      semantic_key: "",
      summary_short: String(item.content || "").trim(),
      canonical_text: String(item.content || "").trim()
    })),
    null,
    2
  );
}

function buildMemorySummarySystemPrompt(profile, contact) {
  return buildStructuredPromptSections(
    "chat_memory_summary",
    {},
    {
      settings: loadSettings(),
      variables: {
        contactName: contact.name,
        contactPersona: buildContactCombinedPersonaText(contact) || "自然、友好、会根据关系稳定回应。",
        userName: profile.username || DEFAULT_PROFILE.username,
        userPersona:
          buildUserCombinedPersonaText(profile, contact) || DEFAULT_PROFILE.personaPrompt
      }
    }
  );
}

function parseJsonLikeContent(value) {
  if (value && typeof value === "object") {
    return null;
  }

  const text = String(value || "").trim();
  if (!text) {
    return null;
  }

  const candidates = [];
  candidates.push(text);
  const fenceMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenceMatch?.[1]) {
    candidates.push(fenceMatch[1].trim());
  }
  const objectStart = text.indexOf("{");
  const objectEnd = text.lastIndexOf("}");
  if (objectStart >= 0 && objectEnd > objectStart) {
    candidates.push(text.slice(objectStart, objectEnd + 1));
  }
  const arrayStart = text.indexOf("[");
  const arrayEnd = text.lastIndexOf("]");
  if (arrayStart >= 0 && arrayEnd > arrayStart) {
    candidates.push(text.slice(arrayStart, arrayEnd + 1));
  }

  for (const candidate of candidates) {
    try {
      return JSON.parse(candidate);
    } catch (_error) {
    }
  }
  return null;
}

function parseLocationMessagePayload(value) {
  const parsed =
    (Array.isArray(value) ? value : null) ||
    parseJsonLikeContent(value) ||
    parseJsonLikeContent(resolveMessage(value));

  const items = Array.isArray(parsed) ? parsed : [];
  return items
    .map((item) => {
      const source = item && typeof item === "object" ? item : {};
      if (String(source.type || "").trim().toLowerCase() !== "location") {
        return null;
      }
      const locationName = String(source.locationName || source.name || "").trim();
      const coordinates = String(source.coordinates || "").trim();
      if (!locationName || !coordinates) {
        return null;
      }
      return {
        messageType: "location",
        locationName: locationName.slice(0, 48),
        coordinates
      };
    })
    .filter(Boolean);
}

function parseImageMessagePayload(value) {
  const parsed =
    (Array.isArray(value) ? value : null) ||
    parseJsonLikeContent(value) ||
    parseJsonLikeContent(resolveMessage(value));

  const items = Array.isArray(parsed) ? parsed : [];
  return items
    .map((item) => {
      const source = item && typeof item === "object" ? item : {};
      const type = String(source.type || "").trim().toLowerCase();
      if (!["image", "photo"].includes(type)) {
        return null;
      }
      const imageDescription = String(
        source.description || source.caption || source.content || source.text || ""
      )
        .trim()
        .slice(0, 600);
      if (!imageDescription) {
        return null;
      }
      return {
        messageType: "image",
        imageDescription
      };
    })
    .filter(Boolean);
}

function parseVoiceMessagePayload(value) {
  const parsed =
    (Array.isArray(value) ? value : null) ||
    parseJsonLikeContent(value) ||
    parseJsonLikeContent(resolveMessage(value));

  const items = Array.isArray(parsed) ? parsed : [];
  return items
    .map((item) => {
      const source = item && typeof item === "object" ? item : {};
      const type = String(source.type || "").trim().toLowerCase();
      if (!["voice", "audio"].includes(type)) {
        return null;
      }
      const voiceText = String(
        source.content || source.text || source.transcript || source.caption || ""
      )
        .trim()
        .slice(0, 1000);
      if (!voiceText) {
        return null;
      }
      return {
        messageType: "voice",
        voiceText,
        voiceDurationSeconds: clampNumber(
          Number(source.durationSeconds) ||
            Number(source.duration) ||
            estimateVoiceMessageDurationSeconds(voiceText),
          1,
          60
        )
      };
    })
    .filter(Boolean);
}

function parseConversationCallRequestPayload(value, callMode = "voice") {
  const resolvedMode = normalizeConversationCallMode(callMode);
  const requestTypeAliases =
    resolvedMode === "video"
      ? ["video_call_request", "videocall_request", "video_request", "videochat_request"]
      : ["voice_call_request", "voicecall_request", "call_request", "phone_call_request"];
  const messageType = resolvedMode === "video" ? "video_call_request" : "voice_call_request";

  function buildCallRequestItem(callRequestMessage = "") {
    const note = String(callRequestMessage || "").trim().slice(0, 160);
    return {
      messageType,
      callRequestStatus: "pending",
      callRequestMessage: note,
      text: buildConversationCallRequestMessageText(resolvedMode, "pending", note, "assistant")
    };
  }

  function parseLooseCallRequestObject(rawValue) {
    const raw = String(rawValue || "")
      .replace(/```(?:json)?/gi, "")
      .replace(/```/g, "")
      .trim();
    if (!raw) {
      return null;
    }
    const typeMatch =
      raw.match(new RegExp(`"type"\\s*:\\s*"(${requestTypeAliases.join("|")})"`, "i")) ||
      raw.match(new RegExp(`\\b(?:type|类型)\\s*[:：]\\s*(${requestTypeAliases.join("|")})\\b`, "i"));
    if (!typeMatch) {
      return null;
    }
    const messageMatch =
      raw.match(
        /"(?:message|content|text|note)"\s*:\s*"([\s\S]*?)"(?=\s*,\s*"(?:message|content|text|note|type)"\s*:|\s*}\s*$|\s*$)/i
      ) ||
      raw.match(/(?:^|\n)\s*(?:message|content|text|note|留言)\s*[:：]\s*([^\n]+)(?=\n|$)/i);
    const callRequestMessage = String(messageMatch?.[1] || "")
      .replace(/\\"/g, '"')
      .replace(/\\n/g, "\n")
      .trim()
      .slice(0, 160);
    return buildCallRequestItem(callRequestMessage);
  }

  const parsed =
    (Array.isArray(value) ? value : null) ||
    (value && typeof value === "object" ? value : null) ||
    parseJsonLikeContent(value) ||
    parseJsonLikeContent(resolveMessage(value));

  const items = Array.isArray(parsed)
    ? parsed
    : parsed && typeof parsed === "object"
    ? [parsed]
    : [];
  const normalizedItems = items
    .map((item) => {
      const source = item && typeof item === "object" ? item : {};
      const type = String(source.type || "").trim().toLowerCase();
      if (!requestTypeAliases.includes(type)) {
        return null;
      }
      const callRequestMessage = String(
        source.message || source.content || source.text || source.note || ""
      )
        .trim()
        .slice(0, 160);
      return buildCallRequestItem(callRequestMessage);
    })
    .filter(Boolean);
  if (normalizedItems.length) {
    return normalizedItems;
  }

  const looseParsed =
    parseLooseCallRequestObject(value) || parseLooseCallRequestObject(resolveMessage(value));
  return looseParsed ? [looseParsed] : [];
}

function parseVoiceCallRequestPayload(value) {
  return parseConversationCallRequestPayload(value, "voice");
}

function parseVideoCallRequestPayload(value) {
  return parseConversationCallRequestPayload(value, "video");
}

function parseConversationCallEventPayload(value, callMode = "voice") {
  const resolvedMode = normalizeConversationCallMode(callMode);
  const eventTypeAliases =
    resolvedMode === "video"
      ? ["video_call_event", "videocall_event", "video_event"]
      : ["voice_call_event", "voicecall_event", "call_event", "phone_call_event"];
  const messageType = resolvedMode === "video" ? "video_call_event" : "voice_call_event";

  function buildCallEventItem(kind = "ended", note = "") {
    const resolvedKind = normalizeVoiceCallEventKind(kind);
    return {
      messageType,
      callEventKind: resolvedKind,
      callEventDurationSeconds: 0,
      text: buildConversationCallEventMessageText(resolvedMode, resolvedKind, {
        note: String(note || "").trim().slice(0, 120)
      })
    };
  }

  function parseLooseCallEventObject(rawValue) {
    const raw = String(rawValue || "")
      .replace(/```(?:json)?/gi, "")
      .replace(/```/g, "")
      .trim();
    if (!raw) {
      return null;
    }
    const typeMatch =
      raw.match(new RegExp(`"type"\\s*:\\s*"(${eventTypeAliases.join("|")})"`, "i")) ||
      raw.match(new RegExp(`\\b(?:type|类型)\\s*[:：]\\s*(${eventTypeAliases.join("|")})\\b`, "i"));
    if (!typeMatch) {
      return null;
    }
    const kindMatch =
      raw.match(
        /"(?:kind|status|action|event)"\s*:\s*"([\s\S]*?)"(?=\s*,\s*"(?:kind|status|action|event|note|message|content|type)"\s*:|\s*}\s*$|\s*$)/i
      ) ||
      raw.match(/(?:^|\n)\s*(?:kind|status|action|event|状态)\s*[:：]\s*([^\n]+)(?=\n|$)/i);
    const noteMatch =
      raw.match(
        /"(?:note|message|content|text)"\s*:\s*"([\s\S]*?)"(?=\s*,\s*"(?:kind|status|action|event|note|message|content|text|type)"\s*:|\s*}\s*$|\s*$)/i
      ) ||
      raw.match(/(?:^|\n)\s*(?:note|message|content|text|补充)\s*[:：]\s*([^\n]+)(?=\n|$)/i);
    const kind = normalizeVoiceCallEventKind(String(kindMatch?.[1] || "").trim());
    const note = String(noteMatch?.[1] || "")
      .replace(/\\"/g, '"')
      .replace(/\\n/g, "\n")
      .trim()
      .slice(0, 120);
    return buildCallEventItem(kind, note);
  }

  const parsed =
    (Array.isArray(value) ? value : null) ||
    (value && typeof value === "object" ? value : null) ||
    parseJsonLikeContent(value) ||
    parseJsonLikeContent(resolveMessage(value));

  const items = Array.isArray(parsed)
    ? parsed
    : parsed && typeof parsed === "object"
      ? [parsed]
      : [];
  const normalizedItems = items
    .map((item) => {
      const source = item && typeof item === "object" ? item : {};
      const type = String(source.type || "").trim().toLowerCase();
      if (!eventTypeAliases.includes(type)) {
        return null;
      }
      return buildCallEventItem(
        source.kind || source.status || source.action || source.event || "ended",
        source.note || source.message || source.content || source.text || ""
      );
    })
    .filter(Boolean);
  if (normalizedItems.length) {
    return normalizedItems;
  }

  const looseParsed =
    parseLooseCallEventObject(value) || parseLooseCallEventObject(resolveMessage(value));
  return looseParsed ? [looseParsed] : [];
}

function parseVoiceCallEventPayload(value) {
  return parseConversationCallEventPayload(value, "voice");
}

function parseVideoCallEventPayload(value) {
  return parseConversationCallEventPayload(value, "video");
}

function normalizeMemoryExtractionAction(value = "", fallback = "create") {
  const normalized = String(value || "").trim().toLowerCase();
  if (["create", "reinforce", "supersede", "ignore"].includes(normalized)) {
    return normalized;
  }
  return ["create", "reinforce", "supersede", "ignore"].includes(String(fallback || "").trim().toLowerCase())
    ? String(fallback || "").trim().toLowerCase()
    : "create";
}

function normalizeMemoryExtractionScore(value, fallback = 0) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) {
    return fallback;
  }
  const normalized = numeric > 1 ? numeric / 100 : numeric;
  return Math.min(1, Math.max(0, normalized));
}

function normalizeMemoryExtractionTextArray(value, fallback = []) {
  if (Array.isArray(value)) {
    return value
      .map((item) =>
        item && typeof item === "object" ? item : String(item || "").trim()
      )
      .filter((item) => (typeof item === "string" ? Boolean(item) : Boolean(item)));
  }
  const text = String(value || "").trim();
  return text ? [text] : fallback;
}

function normalizeMemoryExtractionScoreMap(value, fallback = {}) {
  const source = value && typeof value === "object" && !Array.isArray(value) ? value : null;
  if (!source) {
    return fallback;
  }
  const next = {};
  Object.entries(source).forEach(([key, rawValue]) => {
    const normalizedKey = String(key || "").trim();
    if (!normalizedKey) {
      return;
    }
    next[normalizedKey] = normalizeMemoryExtractionScore(rawValue, 0);
  });
  return Object.keys(next).length ? next : fallback;
}

function buildDefaultFaintMemorySummary(summaryShort = "", canonicalText = "") {
  const sourceText = String(summaryShort || canonicalText || "")
    .replace(/^\s*你隐约记得[：:，,\s]*/u, "")
    .replace(/^\s*我隐约记得[：:，,\s]*/u, "")
    .replace(/^\s*隐约记得[：:，,\s]*/u, "")
    .trim();
  if (!sourceText) {
    return "";
  }
  return sourceText.length > 48 ? `${sourceText.slice(0, 48)}…` : sourceText;
}

function normalizeExtractedMemoryCandidate(item = {}, index = 0, contactId = "") {
  const source = item && typeof item === "object" ? item : {};
  const canonicalText = String(
    source.canonicalText ||
      source.canonical_text ||
      source.content ||
      source.text ||
      source.memory ||
      source.summary ||
      ""
  ).trim();
  const summaryShort = String(
    source.summaryShort || source.summary_short || canonicalText
  ).trim();
  const summaryFaint = String(source.summaryFaint || source.summary_faint || "").trim();
  return {
    action: normalizeMemoryExtractionAction(source.action, canonicalText ? "create" : "ignore"),
    contactId: String(contactId || source.contactId || source.contact_id || "").trim(),
    memoryType: String(
      source.memoryType || source.memory_type || source.type || source.kind || source.category || "fact"
    )
      .trim()
      .toLowerCase(),
    memorySubtype: String(source.memorySubtype || source.memory_subtype || "").trim(),
    semanticKey: String(source.semanticKey || source.semantic_key || "").trim(),
    canonicalText,
    summaryShort,
    summaryFaint: summaryFaint || buildDefaultFaintMemorySummary(summaryShort, canonicalText),
    baseImportance: clampNumber(
      Math.round(
        Number(
          source.baseImportance ?? source.base_importance ?? source.importance ?? source.score ?? source.weight ?? 50
        ) || 50
      ),
      0,
      100
    ),
    confidence: normalizeMemoryExtractionScore(
      source.confidence ?? source.confidence_score ?? source.confidenceScore,
      0.72
    ),
    keywords: normalizeMemoryExtractionTextArray(source.keywords, []),
    entityRefs: normalizeMemoryExtractionTextArray(
      source.entityRefs || source.entity_refs,
      []
    ),
    emotionIntensity:
      source.emotionIntensity == null && source.emotion_intensity == null
        ? null
        : normalizeMemoryExtractionScore(source.emotionIntensity ?? source.emotion_intensity, 0),
    emotionProfile: normalizeMemoryExtractionScoreMap(
      source.emotionProfile || source.emotion_profile,
      {}
    ),
    interactionTendency: normalizeMemoryExtractionScoreMap(
      source.interactionTendency || source.interaction_tendency,
      {}
    ),
    emotionSummary: String(source.emotionSummary || source.emotion_summary || "").trim(),
    sourceExcerpt: String(source.sourceExcerpt || source.source_excerpt || "").trim(),
    targetMemoryRef: String(
      source.targetMemoryRef || source.target_memory_ref || source.targetMemoryId || source.target_memory_id || ""
    ).trim(),
    reasonNote: String(source.reasonNote || source.reason_note || "").trim(),
    metadata: source.metadata && typeof source.metadata === "object" && !Array.isArray(source.metadata)
      ? source.metadata
      : {},
    localId: `memory_extract_candidate_${Date.now()}_${index}_${hashText(
      `${contactId}-${canonicalText}-${summaryShort}-${index}`
    )}`
  };
}

function buildMemoryExtractionSourceRef(conversation = null, messages = [], options = {}) {
  const requestOptions = options && typeof options === "object" ? options : {};
  const normalizedMessages = Array.isArray(messages) ? messages.filter(Boolean) : [];
  const firstMessage = normalizedMessages[0] || null;
  const lastMessage = normalizedMessages[normalizedMessages.length - 1] || null;
  return {
    conversationId: String(conversation?.id || requestOptions.conversationId || "").trim(),
    contactId: String(conversation?.contactId || requestOptions.contactId || "").trim(),
    messageCount: normalizedMessages.length,
    firstMessageAt: Number(firstMessage?.createdAt) || 0,
    lastMessageAt: Number(lastMessage?.createdAt) || 0,
    extractionMode: String(requestOptions.extractionMode || "").trim(),
    startIndex: Number(requestOptions.startIndex) || 0,
    endIndex:
      Number(requestOptions.endIndex) ||
      (Number(requestOptions.startIndex) || 0) + normalizedMessages.length
  };
}

function parseMemorySummaryPayload(payload, contactId = "", options = {}) {
  const requestOptions = options && typeof options === "object" ? options : {};
  const parsed =
    (payload &&
    typeof payload === "object" &&
    (Array.isArray(payload.items) || Array.isArray(payload.memories))
      ? payload
      : null) ||
    parseJsonLikeContent(payload) ||
    parseJsonLikeContent(resolveMessage(payload));

  const rawMemories = Array.isArray(parsed)
    ? parsed
    : Array.isArray(parsed?.items)
    ? parsed.items
    : Array.isArray(parsed?.memories)
    ? parsed.memories
    : [];

  return {
    batchRef:
      String(parsed?.batchRef || parsed?.batch_ref || "").trim() ||
      `memory_extract_${Date.now()}_${hashText(`${contactId}-${rawMemories.length}`)}`,
    contactId: String(contactId || parsed?.contactId || parsed?.contact_id || "").trim(),
    sourceRef:
      parsed?.sourceRef && typeof parsed.sourceRef === "object"
        ? parsed.sourceRef
        : parsed?.source_ref && typeof parsed.source_ref === "object"
        ? parsed.source_ref
        : requestOptions.sourceRef || {},
    items: rawMemories
      .map((item, index) => normalizeExtractedMemoryCandidate(item, index, contactId))
      .filter((item) =>
        item.action === "ignore"
          ? Boolean(item.reasonNote)
          : Boolean(item.contactId && item.canonicalText)
      )
      .slice(0, 5)
  };
}

function syncLocalMemoriesFromCloudContact(contactId = "", cloudItems = []) {
  const resolvedContactId = String(contactId || "").trim();
  if (!resolvedContactId) {
    return [];
  }
  const promptEntries = (Array.isArray(cloudItems) ? cloudItems : [])
    .filter((item) => ["active", "faint", "dormant"].includes(String(item.status || "").trim().toLowerCase()))
    .map((item) => mapCloudMemoryItemToPromptEntry(item))
    .filter((item) => item.contactId === resolvedContactId && item.content);
  const otherEntries = (state.memories || []).filter((item) => item.contactId !== resolvedContactId);
  state.memories = mergeMemories(otherEntries, promptEntries);
  persistMessageMemories();
  return promptEntries;
}

async function mergeExtractedMemoryBatchToCloud(contact, extractionBatch = {}, options = {}) {
  const resolvedContactId = String(contact?.id || extractionBatch?.contactId || "").trim();
  if (!resolvedContactId) {
    throw new Error("缺少角色 ID，无法写入记忆。");
  }
  const requestOptions = options && typeof options === "object" ? options : {};
  const batch =
    extractionBatch && typeof extractionBatch === "object"
      ? extractionBatch
      : parseMemorySummaryPayload(extractionBatch, resolvedContactId, requestOptions);
  const normalizedBatch = {
    batchRef:
      String(batch.batchRef || batch.batch_ref || "").trim() ||
      `memory_extract_${Date.now()}_${hashText(resolvedContactId)}`,
    contactId: resolvedContactId,
    sourceRef:
      batch.sourceRef && typeof batch.sourceRef === "object"
        ? batch.sourceRef
        : batch.source_ref && typeof batch.source_ref === "object"
        ? batch.source_ref
        : requestOptions.sourceRef || {},
    items: (Array.isArray(batch.items) ? batch.items : [])
      .map((item, index) => normalizeExtractedMemoryCandidate(item, index, resolvedContactId))
      .filter((item) =>
        item.action === "ignore" ? Boolean(item.reasonNote) : Boolean(item.canonicalText)
      )
  };
  if (!normalizedBatch.items.length) {
    return {
      ok: true,
      batchId: normalizedBatch.batchRef,
      summary: {
        requestedCount: 0,
        createdCount: 0,
        reinforcedCount: 0,
        supersededCount: 0,
        ignoredCount: 0,
        appliedCount: 0
      },
      results: []
    };
  }
  await ensureCloudMemoriesReady(resolvedContactId, {
    importLocalFallback: true
  });
  const payload = await requestMessagesStorageApi("/api/memory/merge", {
    method: "POST",
    body: JSON.stringify({
      ...normalizedBatch,
      actorType: requestOptions.actorType || "frontend",
      sourceKind: requestOptions.sourceKind || "memory_extract",
      reasonCode: requestOptions.reasonCode || "memory_summary_extract"
    })
  });
  const refreshedCloudItems = await fetchCloudMemoriesForContact(resolvedContactId, {
    force: true
  });
  syncLocalMemoriesFromCloudContact(resolvedContactId, refreshedCloudItems);
  return payload;
}

async function requestMemorySummaryItems(
  settings,
  profile,
  contact,
  messages = [],
  promptSettings = {},
  options = {}
) {
  const requestOptions = options && typeof options === "object" ? options : {};
  const apiSettings = resolveDedicatedApiSettings(settings, "summaryApiEnabled", "summaryApiConfigId");
  const requestEndpoint = validateApiSettings(apiSettings, "记忆总结");
  const transcript = buildMemorySummaryTranscript(messages);
  const systemPrompt = buildMemorySummarySystemPrompt(profile, contact);
  const structuredOutputContext = createStructuredOutputContext(
    apiSettings,
    "memory_extract_v2"
  );
  const userInstruction = appendStructuredOutputPromptHint(
    [
      "已有记忆参考（如果语义重复，请优先输出 reinforce；如果新事实取代旧事实，请输出 supersede；明确命中某条时请填写 target_memory_ref）：",
      buildExistingMemoryDigest(contact.id),
      "",
      "需要整理的新对话：",
      transcript || "本次没有可用对话。",
      "",
      "请只输出 JSON。"
    ].join("\n"),
    structuredOutputContext
  );
  const privacySession = createPrivacySession({
    settings: apiSettings,
    profile,
    contact,
    messages,
    promptSettings,
    systemPrompt,
    userInstruction
  });
  const encodedSystemPrompt = preparePromptWithPrivacy(systemPrompt, privacySession);
  const encodedUserInstruction = encodeTextWithPrivacy(userInstruction, privacySession);
  const requestBody = decorateRequestBodyWithStructuredOutput(
    buildSingleInstructionRequestBody(
      apiSettings,
      encodedSystemPrompt,
      encodedUserInstruction,
      "memory_summary"
    ),
    structuredOutputContext
  );
  const logBase = applyPrivacyToLogEntry(
    buildMessageApiLogBase(
      "chat_memory_summary",
      apiSettings,
      requestEndpoint,
      [encodedSystemPrompt, encodedUserInstruction].join("\n\n"),
      requestBody,
      `联系人：${contact.name} · 记忆提取`
    ),
    privacySession
  );
  let logged = false;

  try {
    const response = await fetch(requestEndpoint, {
      method: "POST",
      headers: buildRequestHeaders(apiSettings),
      body: JSON.stringify(requestBody)
    });
    const rawResponse = await response.text();
    let payload = rawResponse;
    try {
      payload = JSON.parse(rawResponse);
    } catch (_error) {
      payload = rawResponse;
    }

    if (!response.ok) {
      appendApiLog({
        ...logBase,
        ...buildGeminiLogFields(apiSettings, payload),
        status: "error",
        statusCode: response.status,
        responseText: rawResponse,
        responseBody: payload,
        errorMessage: `接口请求失败：HTTP ${response.status}`
      });
      logged = true;
      throw new Error(`接口请求失败：HTTP ${response.status}`);
    }

    let repairResult = null;
    let structuredPayload = parseStructuredOutputPayload(payload, structuredOutputContext);
    if (structuredOutputContext.enabled && !structuredPayload) {
      repairResult = await requestStructuredRepairOnce(
        apiSettings,
        requestEndpoint,
        structuredOutputContext,
        rawResponse,
        "memory_summary_repair"
      );
      if (repairResult?.ok) {
        structuredPayload = repairResult.structuredPayload;
      }
      if (!structuredPayload) {
        const errorMessage = "记忆总结返回了不可解析的结构化内容。";
        appendApiLog({
          ...logBase,
          ...buildGeminiLogFields(apiSettings, payload),
          status: "error",
          statusCode: repairResult?.status || response.status,
          responseText: rawResponse,
          responseBody: payload,
          repairAttempted: Boolean(repairResult),
          repairResponseText: repairResult?.rawResponseText || "",
          repairResponseBody: repairResult?.payload || null,
          errorMessage
        });
        logged = true;
        throw new Error(errorMessage);
      }
    }

    const memoryItems = decodeValueWithPrivacy(
      parseMemorySummaryPayload(structuredPayload || repairResult?.payload || payload, contact.id, {
        sourceRef: requestOptions.sourceRef || {}
      }),
      privacySession
    );
    appendApiLog({
      ...logBase,
      ...buildGeminiLogFields(apiSettings, repairResult?.payload || payload),
      status: "success",
      statusCode: response.status,
      responseText: repairResult?.rawResponseText || rawResponse,
      responseBody: repairResult?.payload || payload,
      repairAttempted: Boolean(repairResult),
      originalResponseText: repairResult ? rawResponse : "",
      originalResponseBody: repairResult ? payload : null,
      summary: encodeTextWithPrivacy(
        `联系人：${contact.name} · 已提取 ${memoryItems.items.length} 条候选记忆`,
        privacySession
      )
    });
    logged = true;
    return memoryItems;
  } catch (error) {
    if (!logged) {
      appendApiLog({
        ...logBase,
        status: "error",
        errorMessage: error?.message || "请求失败"
      });
    }
    throw error;
  }
}

async function applyExtractedMemoryItems(contact, memoryItems = [], options = {}) {
  const requestOptions = options && typeof options === "object" ? options : {};
  const extractionBatch = parseMemorySummaryPayload(memoryItems, String(contact?.id || "").trim(), {
    sourceRef: requestOptions.sourceRef || {}
  });
  let mergeResult = {
    summary: {
      requestedCount: extractionBatch.items.length,
      appliedCount: 0,
      createdCount: 0,
      reinforcedCount: 0,
      supersededCount: 0,
      ignoredCount: extractionBatch.items.length
    }
  };
  if (extractionBatch.items.length) {
    mergeResult = await mergeExtractedMemoryBatchToCloud(contact, extractionBatch, {
      sourceRef: extractionBatch.sourceRef,
      sourceKind: "memory_extract",
      reasonCode: "memory_summary_extract"
    });
  }
  const appliedCount = Number(mergeResult?.summary?.appliedCount) || 0;
  if (state.memoryViewerOpen) {
    renderMemoryViewer();
    if (state.memorySelectedContactId === String(contact?.id || "").trim()) {
      const successMessage =
        requestOptions.successMessage ||
        (appliedCount > 0
          ? `已为 ${contact?.name || "该角色"} 写入 ${appliedCount} 条记忆（新建 ${mergeResult?.summary?.createdCount || 0} / 强化 ${mergeResult?.summary?.reinforcedCount || 0} / 覆盖 ${mergeResult?.summary?.supersededCount || 0}）。`
          : `已为 ${contact?.name || "该角色"} 完成记忆提取，但没有新增可写入的记忆。`);
      setMemoryStatus(successMessage, "success");
    }
  }
  return appliedCount;
}

function selectConversationHistory(messages = [], historyRounds = DEFAULT_MESSAGE_HISTORY_ROUNDS) {
  return selectConversationTurnsByUserRounds(
    messages,
    historyRounds,
    MAX_MESSAGE_HISTORY_ROUNDS
  );
}

function selectConversationTurnsByUserRounds(
  messages = [],
  roundCount = DEFAULT_MESSAGE_HISTORY_ROUNDS,
  maxRounds = MAX_MESSAGE_HISTORY_ROUNDS
) {
  const limit = clampNumber(
    normalizePositiveInteger(roundCount, DEFAULT_MESSAGE_HISTORY_ROUNDS),
    1,
    maxRounds
  );
  const turnMessages = collapseConversationMessagesByTurn(messages);
  const selected = [];
  let userTurnCount = 0;

  for (let index = turnMessages.length - 1; index >= 0; index -= 1) {
    const message = turnMessages[index];
    if (!message || !String(message.text || "").trim()) {
      continue;
    }
    selected.unshift(message);
    if (message.role === "user") {
      userTurnCount += 1;
      if (userTurnCount >= limit) {
        break;
      }
    }
  }

  return selected;
}

async function runManualConversationMemorySummary(roundCountInput = "", preferredContactId = "") {
  const selectedContactId = resolveSelectedMemoryContactId(preferredContactId);
  const contact = getContactById(selectedContactId);
  if (!contact) {
    throw new Error("请先选择要总结的角色。");
  }
  const activeConversation = getConversationById();
  const conversation =
    getConversationByContactId(selectedContactId) ||
    (String(activeConversation?.contactId || "").trim() === selectedContactId
      ? activeConversation
      : null);
  if (!conversation) {
    throw new Error("当前角色还没有聊天记录，暂时无法总结。");
  }
  const rounds = clampNumber(
    normalizePositiveInteger(
      roundCountInput,
      getDefaultConversationMemorySummaryIntervalRounds(loadSettings().messagePromptSettings)
    ),
    1,
    MAX_MEMORY_SUMMARY_INTERVAL_ROUNDS
  );
  const messagesToSummarize = selectConversationTurnsByUserRounds(
    conversation.messages,
    rounds,
    MAX_MEMORY_SUMMARY_INTERVAL_ROUNDS
  );
  if (!messagesToSummarize.length) {
    throw new Error("当前角色还没有可总结的会话。");
  }

  const settings = loadSettings();
  const promptSettings = normalizeMessagePromptSettings(settings.messagePromptSettings);
  await ensureCloudMemoriesReady(contact.id, {
    importLocalFallback: true
  });
  const sourceRef = buildMemoryExtractionSourceRef(conversation, messagesToSummarize, {
    extractionMode: "manual_summary"
  });
  const memoryItems = await requestMemorySummaryItems(
    settings,
    state.profile,
    contact,
    messagesToSummarize,
    promptSettings,
    {
      sourceRef
    }
  );
  const extractedCount = await applyExtractedMemoryItems(contact, memoryItems, {
    sourceRef
  });
  return {
    contact,
    rounds,
    extractedCount
  };
}

function splitReplyIntoMessageLines(text) {
  const resolved = String(text || "").replace(/\r/g, "").trim();
  if (!resolved) {
    return [];
  }

  return resolved
    .split("\n")
    .map((line) => String(line || "").trim())
    .filter(Boolean);
}

function extractLocationReplyBlocks(text) {
  let workingText = String(text || "").replace(/\r/g, "").trim();
  if (!workingText) {
    return { text: "", blocks: [] };
  }

  const blocks = [];
  const replaceBlock = (candidate, parsedItems) => {
    if (!candidate || !parsedItems.length) {
      return;
    }
    const token = `__PULSE_LOCATION_BLOCK_${blocks.length}__`;
    blocks.push({
      token,
      items: parsedItems
    });
    workingText = workingText.replace(candidate, `\n${token}\n`);
  };

  workingText = workingText.replace(/```(?:json)?\s*([\s\S]*?)```/gi, (match, inner) => {
    const parsedItems = parseLocationMessagePayload(String(inner || "").trim());
    if (!parsedItems.length) {
      return match;
    }
    const token = `__PULSE_LOCATION_BLOCK_${blocks.length}__`;
    blocks.push({ token, items: parsedItems });
    return `\n${token}\n`;
  });

  const locationPattern = /\[\s*\{[\s\S]*?"type"\s*:\s*"location"[\s\S]*?\}\s*\]/i;
  let guard = 0;
  while (guard < 8) {
    const match = locationPattern.exec(workingText);
    if (!match || typeof match.index !== "number") {
      break;
    }
    const candidate = match[0];
    const parsedItems = parseLocationMessagePayload(candidate);
    if (!parsedItems.length) {
      break;
    }
    replaceBlock(candidate, parsedItems);
    guard += 1;
  }

  return { text: workingText, blocks };
}

function extractImageReplyBlocks(text) {
  let workingText = String(text || "").replace(/\r/g, "").trim();
  if (!workingText) {
    return { text: "", blocks: [] };
  }

  const blocks = [];
  const replaceBlock = (candidate, parsedItems) => {
    if (!candidate || !parsedItems.length) {
      return;
    }
    const token = `__PULSE_IMAGE_BLOCK_${blocks.length}__`;
    blocks.push({
      token,
      items: parsedItems
    });
    workingText = workingText.replace(candidate, `\n${token}\n`);
  };

  workingText = workingText.replace(/```(?:json)?\s*([\s\S]*?)```/gi, (match, inner) => {
    const parsedItems = parseImageMessagePayload(String(inner || "").trim());
    if (!parsedItems.length) {
      return match;
    }
    const token = `__PULSE_IMAGE_BLOCK_${blocks.length}__`;
    blocks.push({ token, items: parsedItems });
    return `\n${token}\n`;
  });

  const imagePattern = /\[\s*\{[\s\S]*?"type"\s*:\s*"(?:image|photo)"[\s\S]*?\}\s*\]/i;
  let guard = 0;
  while (guard < 8) {
    const match = imagePattern.exec(workingText);
    if (!match || typeof match.index !== "number") {
      break;
    }
    const candidate = match[0];
    const parsedItems = parseImageMessagePayload(candidate);
    if (!parsedItems.length) {
      break;
    }
    replaceBlock(candidate, parsedItems);
    guard += 1;
  }

  return { text: workingText, blocks };
}

function extractVoiceReplyBlocks(text) {
  let workingText = String(text || "").replace(/\r/g, "").trim();
  if (!workingText) {
    return { text: "", blocks: [] };
  }

  const blocks = [];
  const replaceBlock = (candidate, parsedItems) => {
    if (!candidate || !parsedItems.length) {
      return;
    }
    const token = `__PULSE_VOICE_BLOCK_${blocks.length}__`;
    blocks.push({
      token,
      items: parsedItems
    });
    workingText = workingText.replace(candidate, `\n${token}\n`);
  };

  workingText = workingText.replace(/```(?:json)?\s*([\s\S]*?)```/gi, (match, inner) => {
    const parsedItems = parseVoiceMessagePayload(String(inner || "").trim());
    if (!parsedItems.length) {
      return match;
    }
    const token = `__PULSE_VOICE_BLOCK_${blocks.length}__`;
    blocks.push({ token, items: parsedItems });
    return `\n${token}\n`;
  });

  const voicePattern = /\[\s*\{[\s\S]*?"type"\s*:\s*"(?:voice|audio)"[\s\S]*?\}\s*\]/i;
  let guard = 0;
  while (guard < 8) {
    const match = voicePattern.exec(workingText);
    if (!match || typeof match.index !== "number") {
      break;
    }
    const candidate = match[0];
    const parsedItems = parseVoiceMessagePayload(candidate);
    if (!parsedItems.length) {
      break;
    }
    replaceBlock(candidate, parsedItems);
    guard += 1;
  }

  return { text: workingText, blocks };
}

function extractConversationCallRequestReplyBlocks(text, callMode = "voice") {
  let workingText = String(text || "").replace(/\r/g, "").trim();
  if (!workingText) {
    return { text: "", blocks: [] };
  }

  const resolvedMode = normalizeConversationCallMode(callMode);
  const blockTokenPrefix =
    resolvedMode === "video" ? "__PULSE_VIDEO_CALL_REQUEST_BLOCK_" : "__PULSE_VOICE_CALL_REQUEST_BLOCK_";
  const parsePayload =
    resolvedMode === "video" ? parseVideoCallRequestPayload : parseVoiceCallRequestPayload;
  const requestTypePattern =
    resolvedMode === "video"
      ? "(?:video_call_request|videocall_request|video_request|videochat_request)"
      : "(?:voice_call_request|voicecall_request|call_request|phone_call_request)";
  const blocks = [];
  const replaceBlock = (candidate, parsedItems) => {
    if (!candidate || !parsedItems.length) {
      return;
    }
    const token = `${blockTokenPrefix}${blocks.length}__`;
    blocks.push({
      token,
      items: parsedItems
    });
    workingText = workingText.replace(candidate, `\n${token}\n`);
  };

  workingText = workingText.replace(/```(?:json)?\s*([\s\S]*?)```/gi, (match, inner) => {
    const parsedItems = parsePayload(String(inner || "").trim());
    if (!parsedItems.length) {
      return match;
    }
    const token = `${blockTokenPrefix}${blocks.length}__`;
    blocks.push({ token, items: parsedItems });
    return `\n${token}\n`;
  });

  const callRequestPatterns = [
    new RegExp(`\\[\\s*\\{[\\s\\S]*?"type"\\s*:\\s*"${requestTypePattern}"[\\s\\S]*?\\}\\s*\\]`, "i"),
    new RegExp(`\\{[\\s\\S]*?"type"\\s*:\\s*"${requestTypePattern}"[\\s\\S]*?\\}`, "i"),
    new RegExp(`(?:^|\\n)\\s*(?:type|类型)\\s*[:：]\\s*${requestTypePattern}(?:\\s*\\n+\\s*(?:message|content|text|note|留言)\\s*[:：][^\\n]*)?`, "i")
  ];

  callRequestPatterns.forEach((pattern) => {
    let guard = 0;
    while (guard < 8) {
      const match = pattern.exec(workingText);
      if (!match || typeof match.index !== "number") {
        break;
      }
      const candidate = match[0];
      const parsedItems = parsePayload(candidate);
      if (!parsedItems.length) {
        break;
      }
      replaceBlock(candidate, parsedItems);
      guard += 1;
    }
  });

  return { text: workingText, blocks };
}

function extractVoiceCallRequestReplyBlocks(text) {
  return extractConversationCallRequestReplyBlocks(text, "voice");
}

function extractVideoCallRequestReplyBlocks(text) {
  return extractConversationCallRequestReplyBlocks(text, "video");
}

function extractConversationCallEventReplyBlocks(text, callMode = "voice") {
  let workingText = String(text || "").replace(/\r/g, "").trim();
  if (!workingText) {
    return { text: "", blocks: [] };
  }

  const resolvedMode = normalizeConversationCallMode(callMode);
  const blockTokenPrefix =
    resolvedMode === "video" ? "__PULSE_VIDEO_CALL_EVENT_BLOCK_" : "__PULSE_VOICE_CALL_EVENT_BLOCK_";
  const parsePayload =
    resolvedMode === "video" ? parseVideoCallEventPayload : parseVoiceCallEventPayload;
  const eventTypePattern =
    resolvedMode === "video"
      ? "(?:video_call_event|videocall_event|video_event)"
      : "(?:voice_call_event|voicecall_event|call_event|phone_call_event)";
  const blocks = [];
  const replaceBlock = (candidate, parsedItems) => {
    if (!candidate || !parsedItems.length) {
      return;
    }
    const token = `${blockTokenPrefix}${blocks.length}__`;
    blocks.push({
      token,
      items: parsedItems
    });
    workingText = workingText.replace(candidate, `\n${token}\n`);
  };

  workingText = workingText.replace(/```(?:json)?\s*([\s\S]*?)```/gi, (match, inner) => {
    const parsedItems = parsePayload(String(inner || "").trim());
    if (!parsedItems.length) {
      return match;
    }
    const token = `${blockTokenPrefix}${blocks.length}__`;
    blocks.push({ token, items: parsedItems });
    return `\n${token}\n`;
  });

  const callEventPatterns = [
    new RegExp(`\\[\\s*\\{[\\s\\S]*?"type"\\s*:\\s*"${eventTypePattern}"[\\s\\S]*?\\}\\s*\\]`, "i"),
    new RegExp(`\\{[\\s\\S]*?"type"\\s*:\\s*"${eventTypePattern}"[\\s\\S]*?\\}`, "i"),
    new RegExp(
      `(?:^|\\n)\\s*(?:type|类型)\\s*[:：]\\s*${eventTypePattern}(?:\\s*\\n+\\s*(?:kind|status|action|event|状态)\\s*[:：][^\\n]*)?`,
      "i"
    )
  ];

  callEventPatterns.forEach((pattern) => {
    let guard = 0;
    while (guard < 8) {
      const match = pattern.exec(workingText);
      if (!match || typeof match.index !== "number") {
        break;
      }
      const candidate = match[0];
      const parsedItems = parsePayload(candidate);
      if (!parsedItems.length) {
        break;
      }
      replaceBlock(candidate, parsedItems);
      guard += 1;
    }
  });

  return { text: workingText, blocks };
}

function extractVoiceCallEventReplyBlocks(text) {
  return extractConversationCallEventReplyBlocks(text, "voice");
}

function extractVideoCallEventReplyBlocks(text) {
  return extractConversationCallEventReplyBlocks(text, "video");
}

function parseVoiceCallRequestMessageContinuation(line = "") {
  const normalized = String(line || "").trim();
  if (!normalized) {
    return "";
  }
  const match = normalized.match(/^(?:message|content|text|note|留言)\s*[:：]\s*(.+)$/i);
  return match ? String(match[1] || "").trim().slice(0, 160) : "";
}

function parseQuoteReplyPayload(payload) {
  function parseLooseQuoteObject(value) {
    const raw = String(value || "")
      .replace(/<\/?quote_reply>/gi, "")
      .trim();
    if (!raw) {
      return null;
    }

    const roleMatch = raw.match(/"quotedRole"\s*:\s*"(assistant|user)"/i);
    const quotedTextMatch = raw.match(
      /"quotedText"\s*:\s*"([\s\S]*?)"(?=\s*,?\s*"reply"\s*:|\s*}\s*$|\s*$)/i
    );
    const replyMatch = raw.match(/"reply"\s*:\s*"([\s\S]*?)"(?=\s*}\s*$|\s*$)/i);
    const quotedText = String(quotedTextMatch?.[1] || "").trim();
    const reply = String(replyMatch?.[1] || "").trim();
    if (!quotedText || !reply) {
      return null;
    }
    return {
      messageType: "quote",
      quotedRole: String(roleMatch?.[1] || "").trim() === "assistant" ? "assistant" : "user",
      quotedText: quotedText.slice(0, 240),
      text: reply
    };
  }

  const rawValue =
    parseJsonLikeContent(payload) ||
    parseJsonLikeContent(resolveMessage(payload)) ||
    payload;
  const items = Array.isArray(rawValue)
    ? rawValue
    : rawValue && typeof rawValue === "object"
      ? Array.isArray(rawValue.items)
        ? rawValue.items
        : [rawValue]
      : [];

  return items
    .map((item) => {
      const source = item && typeof item === "object" ? item : {};
      const quotedText = String(
        source.quotedText || source.quote || source.quoteText || source.reference || ""
      ).trim();
      const reply = String(source.reply || source.text || source.content || "").trim();
      const quotedRole =
        String(source.quotedRole || source.role || source.quoteRole || "").trim() === "assistant"
          ? "assistant"
          : "user";
      if (!quotedText || !reply) {
        return null;
      }
      return {
        messageType: "quote",
        quotedRole,
        quotedText: quotedText.slice(0, 240),
        text: reply
      };
    })
    .filter(Boolean)
    .concat((() => {
      const looseItem = parseLooseQuoteObject(payload);
      return looseItem ? [looseItem] : [];
    })())
    .slice(0, 1);
}

function extractQuoteReplyBlocks(text) {
  let workingText = String(text || "").replace(/\r/g, "").trim();
  if (!workingText) {
    return { text: "", blocks: [] };
  }

  const blocks = [];
  workingText = workingText.replace(/<quote_reply>([\s\S]*?)<\/quote_reply>/gi, (match, inner) => {
    const parsedItems = parseQuoteReplyPayload(String(inner || "").trim());
    if (!parsedItems.length) {
      return match;
    }
    const token = `__PULSE_QUOTE_BLOCK_${blocks.length}__`;
    blocks.push({
      token,
      items: parsedItems
    });
    return `\n${token}\n`;
  });

  const looseQuoteIndex = workingText.toLowerCase().indexOf("<quote_reply>");
  if (looseQuoteIndex >= 0) {
    const candidate = workingText.slice(looseQuoteIndex).trim();
    const parsedItems = parseQuoteReplyPayload(candidate);
    if (parsedItems.length) {
      const token = `__PULSE_QUOTE_BLOCK_${blocks.length}__`;
      blocks.push({
        token,
        items: parsedItems
      });
      workingText = `${workingText.slice(0, looseQuoteIndex).trim()}\n${token}\n`.trim();
    }
  }

  return {
    text: workingText,
    blocks
  };
}

function limitReplyItems(items = [], limit = DEFAULT_MESSAGE_REPLY_SENTENCE_LIMIT) {
  const resolvedLimit = clampNumber(
    normalizePositiveInteger(limit, DEFAULT_MESSAGE_REPLY_SENTENCE_LIMIT),
    1,
    MAX_MESSAGE_REPLY_SENTENCE_LIMIT
  );
  const normalized = Array.isArray(items)
    ? items.filter(Boolean)
    : [];
  if (normalized.length <= resolvedLimit) {
    return normalized;
  }

  const limited = normalized.slice(0, resolvedLimit);
  const overflow = normalized.slice(resolvedLimit);
  const lastItem = limited[resolvedLimit - 1];
  const specialReplyTypes = [
    "location",
    "quote",
    "image",
    "voice",
    "voice_call_request",
    "video_call_request",
    "voice_call_event",
    "video_call_event"
  ];
  if (
    lastItem &&
    !specialReplyTypes.includes(String(lastItem.messageType || "").trim())
  ) {
    const mergedText = [String(lastItem.text || "").trim()]
      .concat(
        overflow
          .filter(
            (item) =>
              !specialReplyTypes.includes(String(item.messageType || "").trim())
          )
          .map((item) => String(item.text || "").trim())
      )
      .filter(Boolean)
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
    limited[resolvedLimit - 1] = {
      ...lastItem,
      text: mergedText
    };
  }
  return limited.filter(Boolean);
}

function buildReplyItems(replyText, promptSettings = {}, privacySession = null) {
  const { text: textWithoutQuoteBlocks, blocks: quoteBlocks } = extractQuoteReplyBlocks(replyText);
  const { text: textWithoutCallRequestBlocks, blocks: callRequestBlocks } =
    extractVoiceCallRequestReplyBlocks(textWithoutQuoteBlocks);
  const { text: textWithoutVideoCallRequestBlocks, blocks: videoCallRequestBlocks } =
    extractVideoCallRequestReplyBlocks(textWithoutCallRequestBlocks);
  const { text: textWithoutVoiceCallEventBlocks, blocks: voiceCallEventBlocks } =
    extractVoiceCallEventReplyBlocks(textWithoutVideoCallRequestBlocks);
  const { text: textWithoutVideoCallEventBlocks, blocks: videoCallEventBlocks } =
    extractVideoCallEventReplyBlocks(textWithoutVoiceCallEventBlocks);
  const { text: textWithoutLocationBlocks, blocks: locationBlocks } =
    extractLocationReplyBlocks(textWithoutVideoCallEventBlocks);
  const { text: textWithoutImageBlocks, blocks: imageBlocks } =
    extractImageReplyBlocks(textWithoutLocationBlocks);
  const { text: textWithoutVoiceBlocks, blocks: voiceBlocks } =
    extractVoiceReplyBlocks(textWithoutImageBlocks);
  const blockMap = new Map(
    [
      ...quoteBlocks,
      ...callRequestBlocks,
      ...videoCallRequestBlocks,
      ...voiceCallEventBlocks,
      ...videoCallEventBlocks,
      ...locationBlocks,
      ...imageBlocks,
      ...voiceBlocks
    ].map((block) => [block.token, block.items])
  );
  const rawLines = String(textWithoutVoiceBlocks || "")
    .split("\n")
    .map((item) => String(item || "").trim())
    .filter(Boolean);
  const items = [];

  rawLines.forEach((line) => {
    const voiceCallRequestContinuation = parseVoiceCallRequestMessageContinuation(line);
    const lastItem = items[items.length - 1];
    if (
      voiceCallRequestContinuation &&
      lastItem &&
      ["voice_call_request", "video_call_request"].includes(
        String(lastItem?.messageType || "").trim()
      )
    ) {
      const nextCallRequestMessage =
        String(lastItem.callRequestMessage || "").trim() || voiceCallRequestContinuation;
      const callMode = String(lastItem?.messageType || "").trim() === "video_call_request" ? "video" : "voice";
      items[items.length - 1] = {
        ...lastItem,
        callRequestMessage: nextCallRequestMessage,
        text: buildConversationCallRequestMessageText(
          callMode,
          "pending",
          nextCallRequestMessage,
          "assistant"
        )
      };
      return;
    }
    if (blockMap.has(line)) {
      decodeValueWithPrivacy(blockMap.get(line), privacySession).forEach((item) => {
        if (String(item?.messageType || "").trim() === "location") {
          items.push({
            ...item,
            text: buildLocationMessageText(item.locationName, item.coordinates)
          });
          return;
        }
        if (String(item?.messageType || "").trim() === "quote") {
          items.push({
            messageType: "quote",
            quotedRole: item.quotedRole === "assistant" ? "assistant" : "user",
            quotedText: String(item.quotedText || "").trim(),
            text: String(item.text || "").trim()
          });
          return;
        }
        if (String(item?.messageType || "").trim() === "image") {
          items.push({
            messageType: "image",
            imageDescription: String(item.imageDescription || "").trim(),
            text: buildImageMessageText(String(item.imageDescription || "").trim())
          });
          return;
        }
        if (String(item?.messageType || "").trim() === "voice") {
          items.push({
            messageType: "voice",
            voiceText: String(item.voiceText || "").trim(),
            voiceDurationSeconds: clampNumber(
              Number(item.voiceDurationSeconds) ||
                estimateVoiceMessageDurationSeconds(String(item.voiceText || "").trim()),
              1,
              60
            ),
            text: buildVoiceMessageText(
              String(item.voiceText || "").trim(),
              Number(item.voiceDurationSeconds) || 0
            )
          });
          return;
        }
        if (String(item?.messageType || "").trim() === "voice_call_request") {
          const callRequestMessage = String(item.callRequestMessage || "").trim();
          items.push({
            messageType: "voice_call_request",
            callRequestStatus: "pending",
            callRequestMessage,
            text: buildVoiceCallRequestMessageText("pending", callRequestMessage, "assistant")
          });
          return;
        }
        if (String(item?.messageType || "").trim() === "video_call_request") {
          const callRequestMessage = String(item.callRequestMessage || "").trim();
          items.push({
            messageType: "video_call_request",
            callRequestStatus: "pending",
            callRequestMessage,
            text: buildVideoCallRequestMessageText("pending", callRequestMessage, "assistant")
          });
          return;
        }
        if (String(item?.messageType || "").trim() === "voice_call_event") {
          items.push({
            messageType: "voice_call_event",
            callEventKind: normalizeVoiceCallEventKind(item.callEventKind),
            callEventDurationSeconds: Math.max(
              0,
              Math.floor(Number(item.callEventDurationSeconds) || 0)
            ),
            text: buildVoiceCallEventMessageText(item.callEventKind, {
              durationSeconds: item.callEventDurationSeconds
            })
          });
          return;
        }
        if (String(item?.messageType || "").trim() === "video_call_event") {
          items.push({
            messageType: "video_call_event",
            callEventKind: normalizeVoiceCallEventKind(item.callEventKind),
            callEventDurationSeconds: Math.max(
              0,
              Math.floor(Number(item.callEventDurationSeconds) || 0)
            ),
            text: buildVideoCallEventMessageText(item.callEventKind, {
              durationSeconds: item.callEventDurationSeconds
            })
          });
        }
      });
      return;
    }
    const inlineQuoteItems = parseQuoteReplyPayload(line);
    if (inlineQuoteItems.length) {
      decodeValueWithPrivacy(inlineQuoteItems, privacySession).forEach((item) => {
        items.push({
          messageType: "quote",
          quotedRole: item.quotedRole === "assistant" ? "assistant" : "user",
          quotedText: String(item.quotedText || "").trim(),
          text: String(item.text || "").trim()
        });
      });
      return;
    }
    const inlineLocationItems = parseLocationMessagePayload(line);
    if (inlineLocationItems.length) {
      decodeValueWithPrivacy(inlineLocationItems, privacySession).forEach((item) => {
        items.push({
          ...item,
          text: buildLocationMessageText(item.locationName, item.coordinates)
        });
      });
      return;
    }
    const inlineImageItems = parseImageMessagePayload(line);
    if (inlineImageItems.length) {
      decodeValueWithPrivacy(inlineImageItems, privacySession).forEach((item) => {
        items.push({
          messageType: "image",
          imageDescription: String(item.imageDescription || "").trim(),
          text: buildImageMessageText(String(item.imageDescription || "").trim())
        });
      });
      return;
    }
    const inlineVoiceItems = parseVoiceMessagePayload(line);
    if (inlineVoiceItems.length) {
      decodeValueWithPrivacy(inlineVoiceItems, privacySession).forEach((item) => {
        items.push({
          messageType: "voice",
          voiceText: String(item.voiceText || "").trim(),
          voiceDurationSeconds: clampNumber(
            Number(item.voiceDurationSeconds) ||
              estimateVoiceMessageDurationSeconds(String(item.voiceText || "").trim()),
            1,
            60
          ),
          text: buildVoiceMessageText(
            String(item.voiceText || "").trim(),
            Number(item.voiceDurationSeconds) || 0
          )
        });
      });
      return;
    }
    const inlineCallRequestItems = parseVoiceCallRequestPayload(line);
    if (inlineCallRequestItems.length) {
      decodeValueWithPrivacy(inlineCallRequestItems, privacySession).forEach((item) => {
        const callRequestMessage = String(item.callRequestMessage || "").trim();
        items.push({
          messageType: "voice_call_request",
          callRequestStatus: "pending",
          callRequestMessage,
          text: buildVoiceCallRequestMessageText("pending", callRequestMessage, "assistant")
        });
      });
      return;
    }
    const inlineVideoCallRequestItems = parseVideoCallRequestPayload(line);
    if (inlineVideoCallRequestItems.length) {
      decodeValueWithPrivacy(inlineVideoCallRequestItems, privacySession).forEach((item) => {
        const callRequestMessage = String(item.callRequestMessage || "").trim();
        items.push({
          messageType: "video_call_request",
          callRequestStatus: "pending",
          callRequestMessage,
          text: buildVideoCallRequestMessageText("pending", callRequestMessage, "assistant")
        });
      });
      return;
    }
    const inlineVoiceCallEventItems = parseVoiceCallEventPayload(line);
    if (inlineVoiceCallEventItems.length) {
      decodeValueWithPrivacy(inlineVoiceCallEventItems, privacySession).forEach((item) => {
        items.push({
          messageType: "voice_call_event",
          callEventKind: normalizeVoiceCallEventKind(item.callEventKind),
          callEventDurationSeconds: Math.max(
            0,
            Math.floor(Number(item.callEventDurationSeconds) || 0)
          ),
          text: buildVoiceCallEventMessageText(item.callEventKind, {
            durationSeconds: item.callEventDurationSeconds
          })
        });
      });
      return;
    }
    const inlineVideoCallEventItems = parseVideoCallEventPayload(line);
    if (inlineVideoCallEventItems.length) {
      decodeValueWithPrivacy(inlineVideoCallEventItems, privacySession).forEach((item) => {
        items.push({
          messageType: "video_call_event",
          callEventKind: normalizeVoiceCallEventKind(item.callEventKind),
          callEventDurationSeconds: Math.max(
            0,
            Math.floor(Number(item.callEventDurationSeconds) || 0)
          ),
          text: buildVideoCallEventMessageText(item.callEventKind, {
            durationSeconds: item.callEventDurationSeconds
          })
        });
      });
      return;
    }
    splitReplyIntoMessageLines(decodeTextWithPrivacy(line, privacySession)).forEach((textLine) => {
      const normalizedLine = String(textLine || "").trim();
      if (!normalizedLine) {
        return;
      }
      items.push({
        messageType: "text",
        text: normalizedLine
      });
    });
  });

  const normalizedItems = items.filter(Boolean);
  const callRequestMessages = normalizedItems
    .filter((item) =>
      ["voice_call_request", "video_call_request"].includes(
        String(item?.messageType || "").trim()
      )
    )
    .map((item) => String(item?.callRequestMessage || "").trim())
    .filter(Boolean);
  const callMetaPrefixes = ["发起方：", "当前状态："];
  const filteredItems =
    callRequestMessages.length > 0
      ? normalizedItems.filter((item) => {
          if (String(item?.messageType || "").trim() !== "text") {
            return true;
          }
          const text = String(item?.text || "").trim();
          if (!text) {
            return false;
          }
          if (callMetaPrefixes.some((prefix) => text.startsWith(prefix))) {
            return false;
          }
          if (callRequestMessages.includes(text)) {
            return false;
          }
          return true;
        })
      : normalizedItems;
  if (filteredItems.length) {
    return filteredItems;
  }
  const fallback = String(replyText || "").trim();
  return fallback
    ? [
        {
          messageType: "text",
          text: decodeTextWithPrivacy(fallback, privacySession)
        }
      ]
    : [];
}

function stripAssistantPresenceUpdateTag(text = "") {
  return String(text || "")
    .replace(/<presence_update>[\s\S]*?<\/presence_update>/gi, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function hasConversationMessageId(conversation = null, messageId = "") {
  const resolvedMessageId = String(messageId || "").trim();
  if (!resolvedMessageId) {
    return false;
  }
  return normalizeObjectArray(conversation?.messages).some(
    (message) => String(message?.id || "").trim() === resolvedMessageId
  );
}

function dedupeConversationMessageList(messages = []) {
  const dedupedMessages = [];
  const indexByMessageId = new Map();
  let changed = false;
  normalizeObjectArray(messages).forEach((message) => {
    if (!message || typeof message !== "object") {
      changed = true;
      return;
    }
    const clonedMessage = { ...message };
    const messageId = String(clonedMessage.id || "").trim();
    if (!messageId) {
      dedupedMessages.push(clonedMessage);
      return;
    }
    const existingIndex = indexByMessageId.get(messageId);
    if (existingIndex == null) {
      indexByMessageId.set(messageId, dedupedMessages.length);
      dedupedMessages.push(clonedMessage);
      return;
    }
    dedupedMessages[existingIndex] = {
      ...dedupedMessages[existingIndex],
      ...clonedMessage
    };
    changed = true;
  });
  return {
    changed,
    messages: dedupedMessages
  };
}

function ensureConversationMessageUniqueness(conversation = null) {
  if (!conversation || !Array.isArray(conversation.messages)) {
    return false;
  }
  const { changed, messages } = dedupeConversationMessageList(conversation.messages);
  if (changed) {
    conversation.messages = messages;
  }
  return changed;
}

function appendUniqueMessagesToConversation(conversation = null, messages = []) {
  if (!conversation || typeof conversation !== "object") {
    return [];
  }
  const resolvedMessages = applyAssistantEndedCallMessagesToConversation(conversation, messages).messages;
  const currentMessages = normalizeObjectArray(conversation.messages).map((message) => ({
    ...(message && typeof message === "object" ? message : {})
  }));
  const existingMessageIds = new Set(
    currentMessages
      .map((message) => String(message?.id || "").trim())
      .filter(Boolean)
  );
  const appendedMessages = [];
  normalizeObjectArray(resolvedMessages).forEach((message) => {
    if (!message || typeof message !== "object") {
      return;
    }
    const clonedMessage = { ...message };
    const messageId = String(clonedMessage.id || "").trim();
    if (messageId && existingMessageIds.has(messageId)) {
      return;
    }
    if (messageId) {
      existingMessageIds.add(messageId);
    }
    currentMessages.push(clonedMessage);
    appendedMessages.push(clonedMessage);
    const messageType = String(clonedMessage?.messageType || "").trim();
    const callEventKind = normalizeVoiceCallEventKind(clonedMessage?.callEventKind);
    if (
      clonedMessage?.role === "assistant" &&
      (messageType === "voice_call_event" || messageType === "video_call_event") &&
      callEventKind === "ended"
    ) {
      const activeCallState = getConversationVoiceCallState(conversation);
      const activeCallMode = normalizeConversationCallMode(activeCallState?.callMode);
      const messageCallMode = messageType === "video_call_event" ? "video" : "voice";
      if (activeCallState?.active && activeCallMode === messageCallMode) {
        setConversationVoiceCallState(conversation, null);
      }
    }
  });
  conversation.messages = currentMessages;
  ensureConversationMessageUniqueness(conversation);
  return appendedMessages;
}

function inferAssistantPresenceUpdateFromText(text = "", contactId = "") {
  const cleanedText = String(text || "").trim();
  if (!cleanedText) {
    return null;
  }

  const resolvedContactId = String(contactId || "").trim();
  const userPresence = getUserPresenceForContact(resolvedContactId);
  const userPlace = resolvePresencePlaceForPrompt(userPresence.placeId, resolvedContactId, "user");
  const contactPresence = getContactPresence(resolvedContactId);
  const contactPlace = resolvePresencePlaceForPrompt(contactPresence.placeId, resolvedContactId, "contact");
  const visiblePlaces = getVisibleCommonPlacesForContact(resolvedContactId);

  const explicitPlace = visiblePlaces.find((place) => {
    const candidates = [String(place.name || "").trim(), ...buildCommonPlaceAliasList(place)].filter(Boolean);
    return candidates.some((item) => cleanedText.includes(item));
  }) || null;

  if (
    /(我(?:现在|这就|马上|立刻|先)?(?:过来|过去|赶过来|赶过去|出发|过来啦|过去啦|来啦|来了)|我(?:已经|正在)?在路上|我正(?:在)?赶过来|我正(?:在)?过去|我往你那边|我去找你|我来找你|我这就来|我先过去了?)/.test(
      cleanedText
    )
  ) {
    if (userPlace || contactPlace || explicitPlace) {
      return {
        presenceType: "in_transit",
        placeId: "",
        fromPlaceId: contactPlace?.id || "",
        toPlaceId: explicitPlace?.id || userPlace?.id || "",
        updatedAt: Date.now()
      };
    }
  }

  if (
    /(我(?:已经|刚刚|终于)?到了|我到啦|我到了呀|我刚到|我先到啦|我过来了|我已经过来了|我到你这了|我到你那里了|我刚过来|我刚到这边)/.test(
      cleanedText
    )
  ) {
    const destinationPlace = explicitPlace || userPlace || contactPlace;
    if (destinationPlace) {
      return {
        presenceType: "at_place",
        placeId: destinationPlace.id,
        fromPlaceId: "",
        toPlaceId: "",
        updatedAt: Date.now()
      };
    }
  }

  return null;
}

function parseAssistantPresenceUpdate(text = "", contactId = "") {
  const rawText = String(text || "");
  const match = rawText.match(/<presence_update>([\s\S]*?)<\/presence_update>/i);
  if (!match) {
    return {
      cleanedText: rawText.trim(),
      update: inferAssistantPresenceUpdateFromText(rawText, contactId)
    };
  }

  let parsed = null;
  try {
    parsed = JSON.parse(String(match[1] || "").trim());
  } catch (_error) {
    return {
      cleanedText: stripAssistantPresenceUpdateTag(rawText),
      update: inferAssistantPresenceUpdateFromText(stripAssistantPresenceUpdateTag(rawText), contactId)
    };
  }

  const presenceType =
    String(parsed?.presenceType || "").trim() === "in_transit" ? "in_transit" : "at_place";
  if (presenceType === "at_place") {
    const place = findCommonPlaceByName(parsed?.placeName || "", contactId);
    return {
      cleanedText: stripAssistantPresenceUpdateTag(rawText),
      update: place
        ? {
            presenceType: "at_place",
            placeId: place.id,
            fromPlaceId: "",
            toPlaceId: "",
            updatedAt: Date.now()
          }
        : inferAssistantPresenceUpdateFromText(stripAssistantPresenceUpdateTag(rawText), contactId)
    };
  }

  const fromPlace = findCommonPlaceByName(parsed?.fromPlaceName || "", contactId);
  const toPlace = findCommonPlaceByName(parsed?.toPlaceName || "", contactId);
  if (!fromPlace && !toPlace) {
    return {
      cleanedText: stripAssistantPresenceUpdateTag(rawText),
      update: inferAssistantPresenceUpdateFromText(stripAssistantPresenceUpdateTag(rawText), contactId)
    };
  }
  return {
    cleanedText: stripAssistantPresenceUpdateTag(rawText),
    update: {
      presenceType: "in_transit",
      placeId: "",
      fromPlaceId: fromPlace?.id || "",
      toPlaceId: toPlace?.id || "",
      updatedAt: Date.now()
    }
  };
}

function parseAssistantPresenceUpdateFromStructuredPayload(
  payload = null,
  fallbackText = "",
  contactId = ""
) {
  const source = payload && typeof payload === "object" ? payload : null;
  if (!source) {
    return {
      cleanedText: String(fallbackText || "").trim(),
      update: inferAssistantPresenceUpdateFromText(fallbackText, contactId)
    };
  }

  const presenceType =
    String(source.presenceType || "").trim() === "in_transit" ? "in_transit" : "at_place";
  if (presenceType === "at_place") {
    const place = findCommonPlaceByName(source.placeName || "", contactId);
    return {
      cleanedText: String(fallbackText || "").trim(),
      update: place
        ? {
            presenceType: "at_place",
            placeId: place.id,
            fromPlaceId: "",
            toPlaceId: "",
            updatedAt: Date.now()
          }
        : inferAssistantPresenceUpdateFromText(fallbackText, contactId)
    };
  }

  const fromPlace = findCommonPlaceByName(source.fromPlaceName || "", contactId);
  const toPlace = findCommonPlaceByName(source.toPlaceName || "", contactId);
  if (!fromPlace && !toPlace) {
    return {
      cleanedText: String(fallbackText || "").trim(),
      update: inferAssistantPresenceUpdateFromText(fallbackText, contactId)
    };
  }
  return {
    cleanedText: String(fallbackText || "").trim(),
    update: {
      presenceType: "in_transit",
      placeId: "",
      fromPlaceId: fromPlace?.id || "",
      toPlaceId: toPlace?.id || "",
      updatedAt: Date.now()
    }
  };
}

function recalculateConversationUpdatedAt(conversation) {
  if (!conversation || typeof conversation !== "object") {
    return;
  }
  ensureConversationMessageUniqueness(conversation);
  const latestMessage = conversation.messages?.[conversation.messages.length - 1] || null;
  conversation.updatedAt = latestMessage?.createdAt || Date.now();
}

function setPendingAssistantReveal(
  conversationId = "",
  messages = [],
  options = {}
) {
  const resolvedConversationId = String(conversationId || "").trim();
  if (!resolvedConversationId) {
    state.pendingAssistantReveal = null;
    return false;
  }
  const pendingMessages = (Array.isArray(messages) ? messages : []).map((message) => ({
    ...(message && typeof message === "object" ? message : {})
  }));
  if (!pendingMessages.length) {
    if (
      String(state.pendingAssistantReveal?.conversationId || "").trim() ===
      resolvedConversationId
    ) {
      state.pendingAssistantReveal = null;
    }
    return false;
  }
  const revealOptions = options && typeof options === "object" ? options : {};
  const parsedExpectedReplyContextVersion = Number.parseInt(
    String(revealOptions.expectedReplyContextVersion || ""),
    10
  );
  state.pendingAssistantReveal = {
    conversationId: resolvedConversationId,
    expectedReplyContextVersion: Number.isFinite(parsedExpectedReplyContextVersion)
      ? parsedExpectedReplyContextVersion
      : null,
    alreadyPersisted: Boolean(revealOptions.alreadyPersisted),
    messages: pendingMessages
  };
  return true;
}

function clearPendingAssistantReveal(conversationId = "") {
  const resolvedConversationId = String(conversationId || "").trim();
  if (
    resolvedConversationId &&
    String(state.pendingAssistantReveal?.conversationId || "").trim() !== resolvedConversationId
  ) {
    return false;
  }
  state.pendingAssistantReveal = null;
  return true;
}

function flushPendingAssistantReveal(conversationId = "", options = {}) {
  const resolvedConversationId = String(conversationId || "").trim();
  const pendingReveal = state.pendingAssistantReveal;
  const pendingConversationId = String(pendingReveal?.conversationId || "").trim();
  if (!pendingConversationId) {
    return [];
  }
  if (resolvedConversationId && pendingConversationId !== resolvedConversationId) {
    return [];
  }
  const revealMessages = Array.isArray(pendingReveal?.messages)
    ? pendingReveal.messages.map((message) => ({
        ...(message && typeof message === "object" ? message : {})
      }))
    : [];
  clearPendingAssistantReveal(pendingConversationId);
  if (!revealMessages.length) {
    return [];
  }
  if (Boolean(pendingReveal?.alreadyPersisted)) {
    const flushOptions = options && typeof options === "object" ? options : {};
    if (
      !flushOptions.suppressRender &&
      state.activeTab === "chat" &&
      String(state.activeConversationId || "").trim() === pendingConversationId
    ) {
      queueConversationRenderOptions({
        scrollBehavior: "bottom"
      });
      renderMessagesPage();
    }
    return revealMessages;
  }
  const targetConversation = getConversationById(pendingConversationId);
  if (!targetConversation) {
    return [];
  }
  if (
    Number.isFinite(Number(pendingReveal?.expectedReplyContextVersion)) &&
    getConversationReplyContextVersion(targetConversation) !==
      Number(pendingReveal.expectedReplyContextVersion)
  ) {
    return [];
  }
  const appendedRevealMessages = appendUniqueMessagesToConversation(targetConversation, revealMessages);
  if (!appendedRevealMessages.length) {
    return [];
  }
  recalculateConversationUpdatedAt(targetConversation);
  markConversationMutated(
    targetConversation,
    appendedRevealMessages[appendedRevealMessages.length - 1]?.updatedAt || Date.now()
  );
  persistConversations();
  enqueueConversationChatSyncUpsert(targetConversation);
  const flushOptions = options && typeof options === "object" ? options : {};
  if (
    !flushOptions.suppressRender &&
    state.activeTab === "chat" &&
    String(state.activeConversationId || "").trim() === pendingConversationId
  ) {
    queueConversationRenderOptions({
      scrollBehavior: "bottom"
    });
    renderMessagesPage();
  }
  return appendedRevealMessages;
}

function buildAssistantReplyMessagesForConversation(
  conversation,
  replyText,
  promptSettings = {},
  privacySession = null
) {
  const replyItems = buildReplyItems(replyText, promptSettings, privacySession);
  if (!replyItems.length) {
    throw new Error("接口请求成功，但没有可展示的回复内容。");
  }
  const activeConversation = conversation && typeof conversation === "object" ? conversation : null;
  const baseLength = Array.isArray(activeConversation?.messages)
    ? activeConversation.messages.length
    : 0;
  const now = Date.now();
  const timeLabel = formatLocalTime();
  return replyItems.map((item, index) =>
    normalizeConversationMessage(
      {
        id: `message_${now}_${index}_${hashText(item.text || item.locationName || "")}`,
        role: "assistant",
        messageType: item.messageType || "text",
        text: item.text || "",
        quotedText: item.quotedText || "",
        quotedRole: item.quotedRole || "",
        locationName: item.locationName || "",
        coordinates: item.coordinates || "",
        imageDataUrl: item.imageDataUrl || "",
        imageDescription: item.imageDescription || "",
        voiceText: item.voiceText || "",
        voiceDurationSeconds: item.voiceDurationSeconds || 0,
        callRequestStatus: item.callRequestStatus || "",
        callRequestMessage: item.callRequestMessage || "",
        callEventKind: item.callEventKind || "",
        callEventDurationSeconds: item.callEventDurationSeconds || 0,
        time: timeLabel,
        createdAt: now + index
      },
      baseLength + index
    )
  );
}

async function appendAssistantReplyBatch(
  conversation,
  replyText,
  promptSettings = {},
  privacySession = null,
  options = {}
) {
  const requestOptions = options && typeof options === "object" ? options : {};
  const alreadyPersisted = Boolean(requestOptions.alreadyPersisted);
  const parsedExpectedReplyContextVersion = Number.parseInt(
    String(requestOptions.expectedReplyContextVersion || ""),
    10
  );
  const hasExpectedReplyContextVersion = Number.isFinite(parsedExpectedReplyContextVersion);
  const conversationId = String(conversation?.id || "").trim();
  const activeConversation = conversationId ? getConversationById(conversationId) : conversation;
  if (!activeConversation) {
    return [];
  }
  if (
    conversationId &&
    hasExpectedReplyContextVersion &&
    getConversationReplyContextVersion(activeConversation) !== parsedExpectedReplyContextVersion
  ) {
    return [];
  }

  const prebuiltMessages = normalizeObjectArray(requestOptions.prebuiltMessages)
    .map((message, index) => normalizeConversationMessage(message, index))
    .filter((message) => message.role === "assistant" && message.text);
  const createdMessages = prebuiltMessages.length
    ? prebuiltMessages
    : buildAssistantReplyMessagesForConversation(
        activeConversation,
        replyText,
        promptSettings,
        privacySession
      );
  setConversationReplyRecovery(
    conversationId,
    createdMessages,
    hasExpectedReplyContextVersion ? parsedExpectedReplyContextVersion : null,
    {
      pendingUserMessageIds: requestOptions.pendingUserMessageIds
    }
  );
  const shouldAnimateReplyReveal =
    !Boolean(requestOptions.suppressUi) &&
    state.activeTab === "chat" &&
    String(state.activeConversationId || "").trim() === conversationId &&
    !document.hidden;
  if (!shouldAnimateReplyReveal) {
    if (alreadyPersisted) {
      clearPendingAssistantReveal(conversationId);
      if (
        state.activeTab === "chat" &&
        String(state.activeConversationId || "").trim() === conversationId &&
        !Boolean(requestOptions.suppressUi)
      ) {
        queueConversationRenderOptions({
          scrollBehavior: "bottom"
        });
        renderMessagesPage();
      }
      clearConversationReplyRecovery(conversationId);
      return createdMessages;
    }
    clearPendingAssistantReveal(conversationId);
    const appendedDirectMessages = appendUniqueMessagesToConversation(activeConversation, createdMessages);
    if (!appendedDirectMessages.length) {
      return [];
    }
    recalculateConversationUpdatedAt(activeConversation);
    markConversationMutated(
      activeConversation,
      createdMessages[createdMessages.length - 1]?.updatedAt || Date.now()
    );
    persistConversations({
      deferMaintenance: true,
      fallbackToMaintenanceOnFailure: false
    });
    enqueueConversationChatSyncUpsert(activeConversation);
    clearConversationReplyRecovery(conversationId);
    if (state.activeTab === "chat") {
      renderMessagesPage();
    }
    return appendedDirectMessages;
  }

  setPendingAssistantReveal(conversationId, createdMessages, {
    expectedReplyContextVersion: parsedExpectedReplyContextVersion,
    alreadyPersisted
  });
  const appendedMessages = [];
  let shouldPersistConversationAfterReveal = false;
  for (let index = 0; index < createdMessages.length; index += 1) {
    let revealRenderOptions = {
      scrollBehavior: "bottom"
    };
    let nextConversation = getConversationById(conversationId);
    if (!nextConversation) {
      clearPendingAssistantReveal(conversationId);
      break;
    }
    if (
      hasExpectedReplyContextVersion &&
      getConversationReplyContextVersion(nextConversation) !== parsedExpectedReplyContextVersion
    ) {
      clearPendingAssistantReveal(conversationId);
      break;
    }
    if (index > 0) {
      await sleep(ASSISTANT_REPLY_REVEAL_INTERVAL_MS);
      nextConversation = getConversationById(conversationId);
      if (!nextConversation) {
        clearPendingAssistantReveal(conversationId);
        break;
      }
      if (
        hasExpectedReplyContextVersion &&
        getConversationReplyContextVersion(nextConversation) !== parsedExpectedReplyContextVersion
      ) {
        clearPendingAssistantReveal(conversationId);
        break;
      }
      if (
        document.hidden ||
        state.activeTab !== "chat" ||
        String(state.activeConversationId || "").trim() !== conversationId
      ) {
        appendedMessages.push(
          ...flushPendingAssistantReveal(conversationId, {
            suppressRender: true
          })
        );
        shouldPersistConversationAfterReveal = false;
        break;
      }
      const scrollSnapshot = captureConversationScrollSnapshot();
      const shouldStickToBottom = isConversationHistoryNearBottom();
      revealRenderOptions = {
        scrollBehavior: shouldStickToBottom ? "bottom" : "preserve",
        scrollSnapshot: shouldStickToBottom ? null : scrollSnapshot
      };
    }
    const nextMessage = createdMessages[index];
    const newlyAppendedMessages = alreadyPersisted
      ? [nextMessage]
      : appendUniqueMessagesToConversation(nextConversation, [nextMessage]);
    const appendedCurrentMessage = newlyAppendedMessages[0] || null;
    if (appendedCurrentMessage) {
      appendedMessages.push(appendedCurrentMessage);
      if (!alreadyPersisted) {
        recalculateConversationUpdatedAt(nextConversation);
        markConversationMutated(
          nextConversation,
          appendedCurrentMessage.updatedAt || appendedCurrentMessage.createdAt || Date.now()
        );
        shouldPersistConversationAfterReveal = true;
      }
    }
    setPendingAssistantReveal(conversationId, createdMessages.slice(index + 1), {
      expectedReplyContextVersion: parsedExpectedReplyContextVersion,
      alreadyPersisted
    });
    if (state.activeTab === "chat" && appendedCurrentMessage) {
      const appendedToVisibleHistory = appendConversationMessageToVisibleHistory(
        appendedCurrentMessage,
        nextConversation,
        promptSettings,
        revealRenderOptions
      );
      if (!appendedToVisibleHistory) {
        queueConversationRenderOptions(revealRenderOptions);
        renderMessagesPage();
      }
    }
  }

  const latestConversation = getConversationById(conversationId);
  if (
    !alreadyPersisted &&
    latestConversation &&
    (!hasExpectedReplyContextVersion ||
      getConversationReplyContextVersion(latestConversation) === parsedExpectedReplyContextVersion)
  ) {
    const repairedMessages = appendUniqueMessagesToConversation(latestConversation, createdMessages);
    if (repairedMessages.length) {
      recalculateConversationUpdatedAt(latestConversation);
      markConversationMutated(
        latestConversation,
        repairedMessages[repairedMessages.length - 1]?.updatedAt || Date.now()
      );
      appendedMessages.push(...repairedMessages);
      shouldPersistConversationAfterReveal = true;
    }
  }
  if (shouldPersistConversationAfterReveal) {
    persistConversations({
      deferMaintenance: true,
      fallbackToMaintenanceOnFailure: false
    });
    enqueueConversationChatSyncUpsert(latestConversation || conversationId);
  }
  if (
    latestConversation &&
    createdMessages.every((message) =>
      normalizeObjectArray(latestConversation.messages).some(
        (currentMessage) => String(currentMessage?.id || "").trim() === String(message?.id || "").trim()
      )
    )
  ) {
    clearConversationReplyRecovery(conversationId);
  }
  clearPendingAssistantReveal(conversationId);
  return appendedMessages;
}

function getLatestAssistantReplyBatch(conversation) {
  if (!conversation?.messages?.length) {
    return null;
  }

  repairStalePendingUserMessages(conversation, {
    persist: true,
    skipWhenBusy: true
  });

  const messages = conversation.messages;
  const pendingUserMessages = messages.filter((message) => message.role === "user" && message.needsReply);
  if (pendingUserMessages.length) {
    return { blocked: true, reason: "pending-user-messages" };
  }

  let endIndex = messages.length - 1;
  if (messages[endIndex]?.role !== "assistant") {
    return null;
  }

  let startIndex = endIndex;
  while (startIndex - 1 >= 0 && messages[startIndex - 1]?.role === "assistant") {
    startIndex -= 1;
  }

  const anchorUser = messages[startIndex - 1];
  if (!anchorUser || anchorUser.role !== "user") {
    return null;
  }

  return {
    startIndex,
    endIndex,
    messages: messages.slice(startIndex, endIndex + 1),
    anchorUser
  };
}

async function requestChatReplyText(
  settings,
  profile,
  contact,
  history = [],
  promptSettings = {},
  options = {}
) {
  const normalizedPromptSettings = normalizeMessagePromptSettings(promptSettings);
  const requestOptions = options && typeof options === "object" ? options : {};
  const requestEndpoint = validateApiSettings(settings, "对话回复");
  const requestMode = normalizeApiMode(settings.mode);

  async function executeChatRequest(
    resolvedPromptSettings,
    summarySuffix = "",
    extraRequestOptions = {}
  ) {
    const mergedRequestOptions =
      extraRequestOptions && typeof extraRequestOptions === "object"
        ? {
            ...requestOptions,
            ...extraRequestOptions
          }
        : requestOptions;
    const chatStructuredOutputContext = getConversationAllowAiPresenceUpdate(
      mergedRequestOptions.conversation
    )
      ? createStructuredOutputContext(settings, "chat_presence_update_v1")
      : {
          enabled: false,
          provider: "none",
          contractName: "",
          contract: null
        };
    const memoryPromptBundle = buildMemoryPromptBundle(contact, resolvedPromptSettings, {
      ...mergedRequestOptions,
      history
    });
    const systemPrompt = buildConversationSystemPrompt(
      profile,
      contact,
      settings,
      resolvedPromptSettings,
      history,
      {
        ...mergedRequestOptions,
        memoryPromptBundle
      }
    );
    const privacySession = createPrivacySession({
      settings,
      profile,
      contact,
      history,
      commonPlaces: state.commonPlaces,
      presenceState: state.presenceState,
      chatGlobalSettings: state.chatGlobalSettings,
      scheduleEntries: getVisibleScheduleEntriesForContact(contact.id),
      promptSettings: resolvedPromptSettings,
      requestOptions: mergedRequestOptions,
      systemPrompt
    });
    const encodedSystemPrompt = preparePromptWithPrivacy(systemPrompt, privacySession);
    const encodedHistory = encodeValueWithPrivacy(history, privacySession);
    const injectedRequestMessages = buildChatRequestInjectedMessages(
      mergedRequestOptions,
      settings
    ).map((message) => ({
      ...message,
      text: encodeTextWithPrivacy(message.text, privacySession)
    }));
    const requestBody = decorateRequestBodyWithStructuredOutput(
      buildChatRequestBody(
        settings,
        encodedSystemPrompt,
        encodedHistory,
        {
          extraMessages: injectedRequestMessages
        }
      ),
      chatStructuredOutputContext
    );
    const logBase = applyPrivacyToLogEntry(
      buildMessageApiLogBase(
        mergedRequestOptions.regenerate
          ? "chat_reply_regenerate"
          : mergedRequestOptions.proactiveTrigger
            ? "chat_reply_proactive"
            : "chat_reply",
        settings,
        requestEndpoint,
        encodedSystemPrompt,
        requestBody,
        `联系人：${contact.name} · 历史消息 ${history.length} 条${
          mergedRequestOptions.regenerate ? " · 重回" : ""
        }${mergedRequestOptions.proactiveTrigger ? " · 主动发起" : ""}${
          summarySuffix
        }`
      ),
      privacySession
    );
    let logged = false;
    let structuredFallbackToText = false;

    try {
      const response = await fetch(requestEndpoint, {
        method: "POST",
        headers: buildRequestHeaders(settings),
        body: JSON.stringify(requestBody)
      });
      const rawResponse = await response.text();
      let payload = rawResponse;
      try {
        payload = JSON.parse(rawResponse);
      } catch (_error) {
        payload = rawResponse;
      }

      if (response.status === 404 && requestEndpoint.includes("api.deepseek.com")) {
        appendApiLog({
          ...logBase,
          ...buildGeminiLogFields(settings, payload),
          status: "error",
          statusCode: response.status,
          responseText: rawResponse,
          responseBody: payload,
          errorMessage:
            "DeepSeek 接口返回 404。请确认地址为 https://api.deepseek.com/chat/completions。"
        });
        logged = true;
        throw new Error(
          "DeepSeek 接口返回 404。请确认地址为 https://api.deepseek.com/chat/completions。"
        );
      }

      if (!response.ok) {
        appendApiLog({
          ...logBase,
          ...buildGeminiLogFields(settings, payload),
          status: "error",
          statusCode: response.status,
          responseText: rawResponse,
          responseBody: payload,
          errorMessage: `接口请求失败：HTTP ${response.status}`
        });
        logged = true;
        throw new Error(`接口请求失败：HTTP ${response.status}`);
      }

      let repairResult = null;
      let structuredPayload = parseStructuredOutputPayload(payload, chatStructuredOutputContext);
      if (chatStructuredOutputContext.enabled && !structuredPayload) {
        repairResult = await requestStructuredRepairOnce(
          settings,
          requestEndpoint,
          chatStructuredOutputContext,
          rawResponse,
          "chat_reply_presence_repair"
        );
        if (repairResult?.ok) {
          structuredPayload = repairResult.structuredPayload;
        }
        if (!structuredPayload) {
          const fallbackReplyText = String(
            resolveMessage(payload) || resolveMessage(repairResult?.payload) || ""
          ).trim();
          const normalizedFallbackStructuredPayload =
            chatStructuredOutputContext.contractName === "chat_presence_update_v1" &&
            fallbackReplyText
              ? chatStructuredOutputContext.contract?.normalize?.({
                  reply_text: fallbackReplyText
                }) || {
                  reply_text: fallbackReplyText,
                  presence_update: null
                }
              : null;
          if (normalizedFallbackStructuredPayload) {
            structuredPayload = normalizedFallbackStructuredPayload;
            structuredFallbackToText = true;
          }
        }
        if (!structuredPayload) {
          const errorMessage = "对话回复返回了不可解析的结构化内容。";
          appendApiLog({
            ...logBase,
            ...buildGeminiLogFields(settings, payload),
            status: "error",
            statusCode: repairResult?.status || response.status,
            responseText: rawResponse,
            responseBody: payload,
            repairAttempted: Boolean(repairResult),
            repairResponseText: repairResult?.rawResponseText || "",
            repairResponseBody: repairResult?.payload || null,
            errorMessage
          });
          logged = true;
          throw new Error(errorMessage);
        }
      }

      const rawMessage = String(
        chatStructuredOutputContext.enabled
          ? structuredPayload?.reply_text || ""
          : resolveMessage(payload)
      )
        .replace(/^(?:联系人|对方|assistant|AI)[:：]\s*/i, "")
        .trim();
      if (!rawMessage) {
        const errorMessage =
          requestMode === "gemini"
            ? buildGeminiEmptyResponseErrorMessage(repairResult?.payload || payload)
            : "接口请求成功，但响应中没有可解析的文本。";
        appendApiLog({
          ...logBase,
          ...buildGeminiLogFields(settings, repairResult?.payload || payload),
          status: "error",
          statusCode: response.status,
          responseText: repairResult?.rawResponseText || rawResponse,
          responseBody: repairResult?.payload || payload,
          repairAttempted: Boolean(repairResult),
          originalResponseText: repairResult ? rawResponse : "",
          originalResponseBody: repairResult ? payload : null,
          errorMessage
        });
        logged = true;
        const error = new Error(errorMessage);
        error.code =
          requestMode === "gemini" ? "gemini_empty_response" : "empty_response";
        error.responsePayload = payload;
        throw error;
      }

      const decodedMessage = decodeTextWithPrivacy(rawMessage, privacySession);
      const parsedPresenceUpdate = getConversationAllowAiPresenceUpdate(mergedRequestOptions.conversation)
        ? chatStructuredOutputContext.enabled
          ? parseAssistantPresenceUpdateFromStructuredPayload(
              structuredPayload?.presence_update || null,
              decodedMessage,
              contact.id
            )
          : parseAssistantPresenceUpdate(decodedMessage, contact.id)
        : {
            cleanedText: stripAssistantPresenceUpdateTag(decodedMessage),
            update: null
          };
      const cleanedEncodedMessage = chatStructuredOutputContext.enabled
        ? rawMessage
        : stripAssistantPresenceUpdateTag(rawMessage);
      if (!String(parsedPresenceUpdate.cleanedText || "").trim()) {
        const errorMessage = "接口请求成功，但回复里只有状态更新标签，缺少可展示的正文。";
        appendApiLog({
          ...logBase,
          ...buildGeminiLogFields(settings, repairResult?.payload || payload),
          status: "error",
          statusCode: response.status,
          responseText: repairResult?.rawResponseText || rawResponse,
          responseBody: repairResult?.payload || payload,
          repairAttempted: Boolean(repairResult),
          originalResponseText: repairResult ? rawResponse : "",
          originalResponseBody: repairResult ? payload : null,
          errorMessage
        });
        logged = true;
        throw new Error(errorMessage);
      }

      appendApiLog({
        ...logBase,
        ...buildGeminiLogFields(settings, repairResult?.payload || payload),
        status: "success",
        statusCode: response.status,
        responseText: repairResult?.rawResponseText || rawResponse,
        responseBody: repairResult?.payload || payload,
        repairAttempted: Boolean(repairResult),
        structuredFallbackToText,
        originalResponseText: repairResult ? rawResponse : "",
        originalResponseBody: repairResult ? payload : null,
        summary: encodeTextWithPrivacy(
          `联系人：${contact.name} · 已生成 ${
            buildReplyItems(cleanedEncodedMessage, resolvedPromptSettings, privacySession).length || 1
          } 行回复${summarySuffix}${structuredFallbackToText ? " · 文本兜底" : ""}`,
          privacySession
        )
      });
      logged = true;
      if (!mergedRequestOptions.skipMemoryRecallWrite) {
        void markPromptBundleMemoriesRecalled(memoryPromptBundle, {
          contactId: contact.id,
          conversationId: mergedRequestOptions.conversation?.id || "",
          proactiveTrigger: mergedRequestOptions.proactiveTrigger,
          regenerate: mergedRequestOptions.regenerate
        });
      }
      return {
        text: cleanedEncodedMessage,
        privacySession,
        assistantPresenceUpdate: parsedPresenceUpdate.update
      };
    } catch (error) {
      if (!logged) {
        appendApiLog({
          ...logBase,
          status: "error",
          errorMessage: error?.message || "请求失败"
        });
      }
      throw error;
    }
  }

  try {
    return await executeChatRequest(normalizedPromptSettings);
  } catch (error) {
    throw error;
  }
}

async function maybeExtractConversationMemories(conversationId, settings, promptSettings) {
  const conversation = getConversationById(conversationId);
  if (!conversation) {
    return;
  }
  const resolvedPromptSettings = normalizeMessagePromptSettings(promptSettings);
  syncPrunedMemoriesInState(resolvedPromptSettings);
  const memorySummaryIntervalRounds = resolveConversationMemorySummaryIntervalRounds(
    conversation,
    resolvedPromptSettings
  );
  if (conversation.memorySummaryCounter < memorySummaryIntervalRounds) {
    return;
  }

  const contact = getResolvedConversationContact(conversation);
  if (!contact) {
    return;
  }
  await ensureCloudMemoriesReady(contact.id, {
    importLocalFallback: true
  });

  const normalizedLastMessageCount = normalizeConversationMemorySummaryCursor(
    conversation.memorySummaryLastMessageCount,
    conversation.messages.length
  );
  if (normalizedLastMessageCount !== Number(conversation.memorySummaryLastMessageCount || 0)) {
    conversation.memorySummaryLastMessageCount = normalizedLastMessageCount;
    persistConversations();
  }
  const startIndex = clampNumber(
    normalizedLastMessageCount,
    0,
    conversation.messages.length
  );
  const messagesToSummarize = conversation.messages.slice(startIndex);
  if (!messagesToSummarize.length) {
    conversation.memorySummaryCounter = 0;
    conversation.memorySummaryLastMessageCount = conversation.messages.length;
    persistConversations();
    return;
  }

  try {
    const sourceRef = buildMemoryExtractionSourceRef(conversation, messagesToSummarize, {
      extractionMode: "auto_summary",
      startIndex,
      endIndex: conversation.messages.length
    });
    const memoryItems = await requestMemorySummaryItems(
      settings,
      state.profile,
      contact,
      messagesToSummarize,
      resolvedPromptSettings,
      {
        sourceRef
      }
    );
    await applyExtractedMemoryItems(contact, memoryItems, {
      sourceRef
    });
    const latestConversation = getConversationById(conversationId);
    if (!latestConversation) {
      return;
    }
    latestConversation.memorySummaryCounter = 0;
    latestConversation.memorySummaryLastMessageCount = latestConversation.messages.length;
    persistConversations();
  } catch (error) {
    if (state.memoryViewerOpen && state.memorySelectedContactId === contact.id) {
      setMemoryStatus(error?.message || "记忆提取失败。", "error");
    }
  }
}

async function requestJournalEntryText(
  settings,
  profile,
  contact,
  conversation,
  promptSettings = {},
  options = {}
) {
  const journalOptions = options && typeof options === "object" ? options : {};
  const normalizedPromptSettings = normalizeMessagePromptSettings(promptSettings);
  const requestEndpoint = validateApiSettings(settings, "日记生成");
  const systemPrompt = buildJournalSystemPrompt(
    profile,
    contact,
    settings,
    normalizedPromptSettings,
    conversation,
    journalOptions
  );
  const userInstruction =
    "请根据这些信息，直接写出今天的日记正文。重点写成这个角色当天稍晚自己记下来的私人记录，语气和情绪都要像 ta 本人。不要写成客观总结、事项汇报或从早到晚的流水账；优先写今天最有后劲的情绪、没说出口的话和心态变化。";
  const privacySession = createPrivacySession({
    settings,
    profile,
    contact,
    conversation,
    scheduleEntries: getVisibleScheduleEntriesForContact(contact.id),
    promptSettings: normalizedPromptSettings,
    journalOptions,
    systemPrompt,
    userInstruction
  });
  const encodedSystemPrompt = preparePromptWithPrivacy(systemPrompt, privacySession);
  const encodedUserInstruction = encodeTextWithPrivacy(userInstruction, privacySession);
  const requestBody = buildDiaryRequestBody(settings, encodedSystemPrompt, encodedUserInstruction);
  const logBase = applyPrivacyToLogEntry(
    buildMessageApiLogBase(
      "journal_entry",
      settings,
      requestEndpoint,
      encodedSystemPrompt,
      requestBody,
      `联系人：${contact.name} · ${journalOptions.dateText || getTodayDateValue()} · 今日日记`
    ),
    privacySession
  );
  let logged = false;

  try {
    const response = await fetch(requestEndpoint, {
      method: "POST",
      headers: buildRequestHeaders(settings),
      body: JSON.stringify(requestBody)
    });
    const rawResponse = await response.text();
    let payload = rawResponse;
    try {
      payload = JSON.parse(rawResponse);
    } catch (_error) {
      payload = rawResponse;
    }

    if (response.status === 404 && requestEndpoint.includes("api.deepseek.com")) {
      appendApiLog({
        ...logBase,
        ...buildGeminiLogFields(settings, payload),
        status: "error",
        statusCode: response.status,
        responseText: rawResponse,
        responseBody: payload,
        errorMessage:
          "DeepSeek 接口返回 404。请确认地址为 https://api.deepseek.com/chat/completions。"
      });
      logged = true;
      throw new Error(
        "DeepSeek 接口返回 404。请确认地址为 https://api.deepseek.com/chat/completions。"
      );
    }

    if (!response.ok) {
      appendApiLog({
        ...logBase,
        ...buildGeminiLogFields(settings, payload),
        status: "error",
        statusCode: response.status,
        responseText: rawResponse,
        responseBody: payload,
        errorMessage: `接口请求失败：HTTP ${response.status}`
      });
      logged = true;
      throw new Error(`接口请求失败：HTTP ${response.status}`);
    }

    const message = decodeTextWithPrivacy(resolveMessage(payload).trim(), privacySession);
    if (!message) {
      appendApiLog({
        ...logBase,
        ...buildGeminiLogFields(settings, payload),
        status: "error",
        statusCode: response.status,
        responseText: rawResponse,
        responseBody: payload,
        errorMessage: "接口请求成功，但响应中没有可解析的日记文本。"
      });
      logged = true;
      throw new Error("接口请求成功，但响应中没有可解析的日记文本。");
    }

    appendApiLog({
      ...logBase,
      ...buildGeminiLogFields(settings, payload),
      status: "success",
      statusCode: response.status,
      responseText: rawResponse,
      responseBody: payload,
      summary: encodeTextWithPrivacy(
        `联系人：${contact.name} · 已生成 ${message.length} 字今日日记`,
        privacySession
      )
    });
    logged = true;
    return message;
  } catch (error) {
    if (!logged) {
      appendApiLog({
        ...logBase,
        status: "error",
        errorMessage: error?.message || "请求失败"
      });
    }
    throw error;
  }
}

function selectConversationTurnsBeforeMessage(conversation, messageId = "", turnLimit = 10) {
  const resolvedConversation = conversation && typeof conversation === "object" ? conversation : null;
  const resolvedMessageId = String(messageId || "").trim();
  if (!resolvedConversation || !resolvedMessageId) {
    return [];
  }
  const targetIndex = resolvedConversation.messages.findIndex(
    (message) => String(message?.id || "").trim() === resolvedMessageId
  );
  if (targetIndex < 0) {
    return [];
  }
  const collapsedTurns = collapseConversationMessagesByTurn(
    resolvedConversation.messages.slice(0, targetIndex + 1)
  );
  return collapsedTurns.slice(-Math.max(1, Number(turnLimit) || 10));
}

function buildInnerThoughtTranscript(messages = []) {
  return (Array.isArray(messages) ? messages : [])
    .map((message) => {
      const roleLabel = message.role === "assistant" ? "角色" : "用户";
      const timestamp = resolveStoredTimestampLabel(message.createdAt, message.time || "");
      return `${timestamp || "--:--"} ${roleLabel}：${String(message.text || "").trim()}`;
    })
    .filter(Boolean)
    .join("\n");
}

function buildInnerThoughtSystemPrompt(
  profile,
  contact,
  settings,
  recentTranscript = "",
  targetMessage = null,
  conversation = null
) {
  const roleLabel = targetMessage?.role === "assistant" ? "角色" : "用户";
  const sceneMode = conversation?.sceneMode === "offline" ? "线下见面" : "线上私聊";
  const targetMessageText = getConversationMessagePromptText(targetMessage || {});
  return buildStructuredPromptSections(
    "chat_inner_thought",
    {
      context_library: {
        recent_history: recentTranscript
          ? `目标气泡前最近 10 轮会话（按时间顺序）：\n${recentTranscript}`
          : "目标气泡前没有足够的会话历史。",
        target_message: [
          `当前场景：${sceneMode}`,
          `需要重点分析的最近一条消息来自${roleLabel}：`,
          targetMessageText || "（空）"
        ]
          .filter(Boolean)
          .join("\n")
      }
    },
    {
      settings,
      variables: {
        contactName: contact.name || "这个角色",
        contactPersona: buildContactCombinedPersonaText(contact) || "自然、友好、会根据关系稳定回应。",
        userName: profile.username || DEFAULT_PROFILE.username,
        userPersona:
          buildUserCombinedPersonaText(profile, contact) || DEFAULT_PROFILE.personaPrompt
      }
    }
  );
}

async function requestInnerThoughtText(settings, profile, contact, conversation, targetMessage) {
  const requestEndpoint = validateApiSettings(settings, "心声分析");
  const historyTurns = selectConversationTurnsBeforeMessage(conversation, targetMessage?.id, 10);
  const recentTranscript = buildInnerThoughtTranscript(historyTurns);
  const systemPrompt = buildInnerThoughtSystemPrompt(
    profile,
    contact,
    settings,
    recentTranscript,
    targetMessage,
    conversation
  );
  const userInstruction =
    "请严格用说出这条消息的那个人的第一人称口吻，只输出一整段自然口语化心声。要像 ta 当时脑子里正在即时嘀咕，重点写情绪、别扭、在意、试探和没说出口的小算盘，不要写成客观分析。不要分段，不要编号，不要项目符号，不要固定小标题。";
  const privacySession = createPrivacySession({
    settings,
    profile,
    contact,
    conversation,
    history: historyTurns,
    promptSettings: getConversationPromptSettings(conversation, settings.messagePromptSettings),
    systemPrompt,
    userInstruction
  });
  const encodedSystemPrompt = preparePromptWithPrivacy(systemPrompt, privacySession);
  const encodedUserInstruction = encodeTextWithPrivacy(userInstruction, privacySession);
  const requestBody = buildSingleInstructionRequestBody(
    settings,
    encodedSystemPrompt,
    encodedUserInstruction,
    "chat_inner_thought"
  );
  const logBase = applyPrivacyToLogEntry(
    buildMessageApiLogBase(
      "chat_inner_thought",
      settings,
      requestEndpoint,
      encodedSystemPrompt,
      requestBody,
      `联系人：${contact.name} · 心声分析 · 目标消息 ${String(targetMessage?.id || "").trim()}`
    ),
    privacySession
  );
  let logged = false;

  try {
    const response = await fetch(requestEndpoint, {
      method: "POST",
      headers: buildRequestHeaders(settings),
      body: JSON.stringify(requestBody)
    });
    const rawResponse = await response.text();
    let payload = rawResponse;
    try {
      payload = JSON.parse(rawResponse);
    } catch (_error) {
      payload = rawResponse;
    }

    if (response.status === 404 && requestEndpoint.includes("api.deepseek.com")) {
      appendApiLog({
        ...logBase,
        ...buildGeminiLogFields(settings, payload),
        status: "error",
        statusCode: response.status,
        responseText: rawResponse,
        responseBody: payload,
        errorMessage:
          "DeepSeek 接口返回 404。请确认地址为 https://api.deepseek.com/chat/completions。"
      });
      logged = true;
      throw new Error(
        "DeepSeek 接口返回 404。请确认地址为 https://api.deepseek.com/chat/completions。"
      );
    }

    if (!response.ok) {
      appendApiLog({
        ...logBase,
        ...buildGeminiLogFields(settings, payload),
        status: "error",
        statusCode: response.status,
        responseText: rawResponse,
        responseBody: payload,
        errorMessage: `接口请求失败：HTTP ${response.status}`
      });
      logged = true;
      throw new Error(`接口请求失败：HTTP ${response.status}`);
    }

    const message = decodeTextWithPrivacy(resolveMessage(payload).trim(), privacySession);
    if (!message) {
      appendApiLog({
        ...logBase,
        ...buildGeminiLogFields(settings, payload),
        status: "error",
        statusCode: response.status,
        responseText: rawResponse,
        responseBody: payload,
        errorMessage: "接口请求成功，但响应中没有可解析的心声文本。"
      });
      logged = true;
      throw new Error("接口请求成功，但响应中没有可解析的心声文本。");
    }

    appendApiLog({
      ...logBase,
      ...buildGeminiLogFields(settings, payload),
      status: "success",
      statusCode: response.status,
      responseText: rawResponse,
      responseBody: payload,
      summary: encodeTextWithPrivacy(
        `联系人：${contact.name} · 已生成 ${message.length} 字心声分析`,
        privacySession
      )
    });
    logged = true;
    return message;
  } catch (error) {
    if (!logged) {
      appendApiLog({
        ...logBase,
        status: "error",
        errorMessage: error?.message || "请求失败"
      });
    }
    throw error;
  }
}

function setMessagesStatus(message = "", tone = "") {
  if (!messagesStatusEl) {
    return;
  }
  const resolved = String(message || "").trim();
  messagesStatusEl.textContent = resolved;
  messagesStatusEl.className = "messages-status";
  if (tone) {
    messagesStatusEl.classList.add(tone);
  }
  messagesStatusEl.hidden = !resolved;
}

function setEditorStatus(element, message = "", tone = "") {
  if (!element) {
    return;
  }
  element.textContent = String(message || "").trim();
  element.className = "messages-editor-status";
  if (tone) {
    element.classList.add(tone);
  }
}

function updateBodyModalState() {
  const anyModalOpen =
    state.profileEditorOpen ||
    state.contactEditorOpen ||
    state.conversationPickerOpen ||
    state.chatSettingsOpen ||
    state.autoScheduleRequestOpen ||
    state.chatGlobalSettingsOpen ||
    state.sceneModalOpen ||
    state.sceneSyncModalOpen ||
    state.worldbookManagerOpen ||
    state.worldbookEditorOpen ||
    state.placesManagerOpen ||
    state.placeEditorOpen ||
    state.memoryViewerOpen ||
    state.memoryEditorOpen ||
    state.memorySettingsOpen ||
    state.regenerateModalOpen ||
    state.locationModalOpen ||
    state.voiceModalOpen ||
    state.photoModalOpen ||
    state.awarenessModalOpen ||
    state.innerThoughtModalOpen ||
    state.schedulePreviewOpen ||
    state.discussionShareModalOpen ||
    state.journalOpen ||
    state.journalHistoryOpen ||
    state.journalSettingsOpen;
  document.body.classList.toggle("messages-modal-open", anyModalOpen);
}

function closeConversationTransientUi() {
  state.composerPanelOpen = false;
  state.messageActionMessageId = "";
}

function getSelectedConversationMessageIdSet() {
  return new Set(
    normalizeObjectArray(state.selectedMessageIds)
      .map((messageId) => String(messageId || "").trim())
      .filter(Boolean)
  );
}

function isConversationMessageSelectionActive(conversationId = state.activeConversationId) {
  const resolvedConversationId = String(conversationId || "").trim();
  return Boolean(
    state.messageSelectionMode &&
      resolvedConversationId &&
      String(state.messageSelectionConversationId || "").trim() === resolvedConversationId
  );
}

function clearConversationMessageSelection() {
  state.messageSelectionMode = false;
  state.messageSelectionConversationId = "";
  state.selectedMessageIds = [];
}

function setConversationMessageSelectionMode(enabled, conversationId = state.activeConversationId) {
  const resolvedConversationId = String(conversationId || "").trim();
  if (!enabled || !resolvedConversationId) {
    clearConversationMessageSelection();
    return false;
  }
  state.messageSelectionMode = true;
  state.messageSelectionConversationId = resolvedConversationId;
  state.selectedMessageIds = [];
  state.messageActionMessageId = "";
  state.composerPanelOpen = false;
  state.quotedMessageId = "";
  state.expandedImageMessageId = "";
  state.expandedVoiceMessageId = "";
  return true;
}

function pruneSelectedConversationMessages(conversation = getConversationById()) {
  if (!conversation || !isConversationMessageSelectionActive(conversation.id)) {
    clearConversationMessageSelection();
    return new Set();
  }
  const availableIds = new Set(
    normalizeObjectArray(conversation.messages)
      .map((message) => String(message?.id || "").trim())
      .filter(Boolean)
  );
  const selectedIds = normalizeObjectArray(state.selectedMessageIds)
    .map((messageId) => String(messageId || "").trim())
    .filter((messageId) => messageId && availableIds.has(messageId));
  if (selectedIds.length !== state.selectedMessageIds.length) {
    state.selectedMessageIds = selectedIds;
  }
  return new Set(selectedIds);
}

function toggleConversationMessageSelection(messageId = "") {
  const conversation = getConversationById();
  const resolvedMessageId = String(messageId || "").trim();
  if (!conversation || !resolvedMessageId) {
    return false;
  }
  if (!isConversationMessageSelectionActive(conversation.id)) {
    setConversationMessageSelectionMode(true, conversation.id);
  }
  const messageExists = conversation.messages.some(
    (message) => String(message?.id || "").trim() === resolvedMessageId
  );
  if (!messageExists) {
    return false;
  }
  const selectedIdSet = getSelectedConversationMessageIdSet();
  if (selectedIdSet.has(resolvedMessageId)) {
    selectedIdSet.delete(resolvedMessageId);
  } else {
    selectedIdSet.add(resolvedMessageId);
  }
  state.selectedMessageIds = Array.from(selectedIdSet);
  return true;
}

function setLocationStatus(message = "", tone = "") {
  setEditorStatus(messagesLocationStatusEl, message, tone);
}

function setVoiceStatus(message = "", tone = "") {
  setEditorStatus(messagesVoiceStatusEl, message, tone);
}

function setPhotoStatus(message = "", tone = "") {
  setEditorStatus(messagesPhotoStatusEl, message, tone);
}

function updateLocationDraft(name, coordinates = "") {
  state.locationDraftName = String(name || "").trim();
  state.locationDraftCoordinates =
    String(coordinates || "").trim() ||
    (state.locationDraftName ? buildRandomLocationCoordinates(state.locationDraftName) : "");
  renderLocationModal();
}

function saveRecentLocation(locationName, coordinates) {
  const normalized = normalizeRecentLocation({
    locationName,
    coordinates,
    updatedAt: Date.now()
  });
  if (!normalized) {
    return;
  }
  state.recentLocations = [normalized]
    .concat(
      state.recentLocations.filter(
        (item) =>
          String(item.locationName || "").trim().toLowerCase() !==
          String(normalized.locationName || "").trim().toLowerCase()
      )
    )
    .slice(0, 5);
  persistRecentLocations();
}

function renderLocationModal() {
  if (!messagesLocationRecentListEl || !messagesLocationPreviewEl) {
    return;
  }

  const currentName = String(state.locationDraftName || "").trim();
  const currentCoordinates =
    String(state.locationDraftCoordinates || "").trim() ||
    (currentName ? buildRandomLocationCoordinates(currentName) : "");

  messagesLocationRecentListEl.innerHTML = state.recentLocations.length
    ? state.recentLocations
        .map(
          (item) => `
            <button
              type="button"
              class="messages-location-chip${
                currentName === item.locationName && currentCoordinates === item.coordinates
                  ? " is-active"
                  : ""
              }"
              data-action="use-recent-location"
              data-location-name="${escapeHtml(item.locationName)}"
              data-location-coordinates="${escapeHtml(item.coordinates)}"
            >
              ${escapeHtml(item.locationName)}
            </button>
          `
        )
        .join("")
    : '<p class="messages-location-empty">还没有最近使用的定位，发送一条后会保留最近 5 条。</p>';

  messagesLocationPreviewEl.innerHTML = renderLocationMapMarkup(currentName, currentCoordinates, {
    compact: false
  });

  if (messagesLocationNameInputEl && messagesLocationNameInputEl.value !== currentName) {
    messagesLocationNameInputEl.value = currentName;
  }
}

function setLocationModalOpen(isOpen) {
  state.locationModalOpen = Boolean(isOpen);
  if (messagesLocationModalEl) {
    messagesLocationModalEl.hidden = !state.locationModalOpen;
    messagesLocationModalEl.setAttribute("aria-hidden", String(!state.locationModalOpen));
  }
  if (state.locationModalOpen) {
    renderLocationModal();
    setLocationStatus("");
    window.setTimeout(() => {
      messagesLocationNameInputEl?.focus();
    }, 0);
  } else {
    state.locationDraftName = "";
    state.locationDraftCoordinates = "";
    setLocationStatus("");
  }
  updateBodyModalState();
}

function renderPhotoModal() {
  if (messagesPhotoDescriptionInputEl) {
    messagesPhotoDescriptionInputEl.value = String(state.photoDraftDescription || "").trim();
  }
}

function renderVoiceModal() {
  if (messagesVoiceTextInputEl) {
    messagesVoiceTextInputEl.value = String(state.voiceDraftText || "").trim();
  }
}

function setPhotoModalOpen(isOpen) {
  state.photoModalOpen = Boolean(isOpen);
  if (messagesPhotoModalEl) {
    messagesPhotoModalEl.hidden = !state.photoModalOpen;
    messagesPhotoModalEl.setAttribute("aria-hidden", String(!state.photoModalOpen));
  }
  if (state.photoModalOpen) {
    renderPhotoModal();
    setPhotoStatus("");
    window.setTimeout(() => {
      messagesPhotoDescriptionInputEl?.focus();
    }, 0);
  } else {
    state.photoDraftDescription = "";
    setPhotoStatus("");
  }
  updateBodyModalState();
}

function setVoiceModalOpen(isOpen) {
  state.voiceModalOpen = Boolean(isOpen);
  if (messagesVoiceModalEl) {
    messagesVoiceModalEl.hidden = !state.voiceModalOpen;
    messagesVoiceModalEl.setAttribute("aria-hidden", String(!state.voiceModalOpen));
  }
  if (state.voiceModalOpen) {
    renderVoiceModal();
    setVoiceStatus("");
    window.setTimeout(() => {
      messagesVoiceTextInputEl?.focus();
    }, 0);
  } else {
    state.voiceDraftText = "";
    setVoiceStatus("");
  }
  updateBodyModalState();
}

function setAwarenessStatus(message = "", tone = "") {
  setEditorStatus(messagesAwarenessStatusEl, message, tone);
}

function renderAwarenessHistory(contact = null, conversation = null) {
  if (!messagesAwarenessHistoryEl) {
    return;
  }
  const resolvedContact = contact && typeof contact === "object" ? contact : null;
  const resolvedConversation = conversation && typeof conversation === "object" ? conversation : null;
  if (!resolvedContact) {
    messagesAwarenessHistoryEl.innerHTML =
      '<div class="messages-awareness-history__empty">当前没有可展示的察觉历史。</div>';
    return;
  }

  const promptSettings = getConversationPromptSettings(
    resolvedConversation || getConversationById()
  );
  const currentRounds = Math.max(
    0,
    Number.parseInt(String(resolvedConversation?.awarenessCounter || 0), 10) || 0
  );
  const threshold = promptSettings.awarenessIntervalRounds;
  const history = normalizeAwarenessHistory(resolvedContact.awarenessHistory || []);
  const currentTitle = resolveAwarenessTitle(
    resolvedContact.awarenessTitle,
    resolvedContact.awarenessText
  );
  const resolvedState = normalizeAwarenessResolvedState(
    resolvedContact.awarenessResolvedState,
    resolvedContact.awarenessConsumed
  );
  const pendingManualTrigger = normalizeManualAwarenessTrigger(
    resolvedContact.awarenessManualTriggerPending
  );
  if (resolvedContact.awarenessHistoryHidden) {
    messagesAwarenessHistoryEl.innerHTML =
      '<div class="messages-awareness-history__empty">这条察觉已超过 20 轮，已从历史监控中移除。重新保存后会重新开始。</div>';
    return;
  }
  const summaryParts = [
    `当前察觉：${currentTitle}`,
    `累计判断 ${Math.max(0, Number.parseInt(String(resolvedContact.awarenessCheckCount || 0), 10) || 0)} 次`,
    `命中 ${Math.max(0, Number.parseInt(String(resolvedContact.awarenessTriggerCount || 0), 10) || 0)} 次`,
    `已监控 ${Math.min(currentRounds, MAX_AWARENESS_MONITOR_ROUNDS)}/${MAX_AWARENESS_MONITOR_ROUNDS} 轮`,
    `可命中判断 ${Math.min(currentRounds, threshold)}/${threshold} 次`
  ];
  if (pendingManualTrigger?.text) {
    summaryParts.push("已准备 1 次手动触发");
  }
  if (resolvedState === "triggered") {
    summaryParts.push("当前察觉已触发并锁定");
  } else if (resolvedState === "expired") {
    summaryParts.push(`已满 ${threshold} 轮未命中，后续不再触发`);
  }

  messagesAwarenessHistoryEl.innerHTML = `
    <div class="messages-awareness-history__summary">${escapeHtml(summaryParts.join(" · "))}</div>
    ${
      history.length
        ? `
            <div class="messages-awareness-history__list">
              ${history
                .map((item) => {
                  const label = item.triggered ? "已触发" : "未触发";
                  const tone = item.triggered ? "is-hit" : "is-miss";
                  const timeText = resolveStoredTimestampLabel(item.checkedAt, formatLocalTime());
                  const noteText = String(item.note || "").trim();
                  return `
                    <article class="messages-awareness-history__item ${tone}">
                      <div class="messages-awareness-history__item-head">
                        <strong>${escapeHtml(label)}</strong>
                        <span>${escapeHtml(timeText)}</span>
                      </div>
                      <p>${escapeHtml(`察觉标题：${resolveAwarenessTitle(item.title)}`)}</p>
                      <p>${escapeHtml(`判断时累计轮数：${item.roundCount}`)}</p>
                      ${noteText ? `<p>${escapeHtml(noteText)}</p>` : ""}
                    </article>
                  `;
                })
                .join("")}
            </div>
          `
        : '<div class="messages-awareness-history__empty">还没有进入过察觉判断；每成功获取 1 次 API 回复都会判断一次，直到命中或达到上限轮数。</div>'
    }
  `;
}

function applyAwarenessToForm(contact = null) {
  const resolvedContact = contact && typeof contact === "object" ? contact : null;
  const conversation = getConversationById();
  if (state.awarenessFormResetRequested) {
    if (messagesAwarenessTitleInputEl) {
      messagesAwarenessTitleInputEl.value = "";
    }
    if (messagesAwarenessTextInputEl) {
      messagesAwarenessTextInputEl.value = "";
    }
    if (messagesAwarenessEmotionInputEl) {
      messagesAwarenessEmotionInputEl.value = "";
    }
    if (messagesAwarenessSensitivityInputEl) {
      messagesAwarenessSensitivityInputEl.value = "medium";
    }
    state.awarenessFormResetRequested = false;
    renderAwarenessHistory(resolvedContact, conversation);
    setAwarenessStatus("察觉已保存。", "success");
    return;
  }
  if (messagesAwarenessTitleInputEl) {
    messagesAwarenessTitleInputEl.value = String(
      resolvedContact?.awarenessTitle || ""
    ).trim();
  }
  if (messagesAwarenessTextInputEl) {
    messagesAwarenessTextInputEl.value = String(resolvedContact?.awarenessText || "").trim();
  }
  if (messagesAwarenessEmotionInputEl) {
    messagesAwarenessEmotionInputEl.value = String(
      resolvedContact?.awarenessEmotionShift || ""
    ).trim();
  }
  if (messagesAwarenessSensitivityInputEl) {
    messagesAwarenessSensitivityInputEl.value = normalizeAwarenessSensitivity(
      resolvedContact?.awarenessSensitivity
    );
  }
  const resolvedState = normalizeAwarenessResolvedState(
    resolvedContact?.awarenessResolvedState,
    resolvedContact?.awarenessConsumed
  );
  const pendingManualTrigger = normalizeManualAwarenessTrigger(
    resolvedContact?.awarenessManualTriggerPending
  );
  setAwarenessStatus(
    pendingManualTrigger?.text
      ? "这条察觉已准备好手动触发；下一次获取回复时会直接带入，但不计入后台概率判断。"
      : resolvedContact?.awarenessHistoryHidden
      ? "这条察觉已结束监控；重新保存后会重新开始。"
      : resolvedState === "triggered"
        ? "这条察觉已经触发过；重新保存后会重新参与后续概率判断。"
        : resolvedState === "expired"
          ? "这条察觉已满设定轮数仍未命中；重新保存后会重新参与后续概率判断。"
          : "",
    pendingManualTrigger?.text || resolvedContact?.awarenessHistoryHidden || resolvedState
      ? "success"
      : ""
  );
  renderAwarenessHistory(resolvedContact, conversation);
}

function getCurrentAwarenessDraft() {
  return {
    awarenessTitle: resolveAwarenessTitle(
      messagesAwarenessTitleInputEl?.value,
      messagesAwarenessTextInputEl?.value
    ),
    awarenessText: String(messagesAwarenessTextInputEl?.value || "").trim(),
    awarenessEmotionShift: String(messagesAwarenessEmotionInputEl?.value || "").trim(),
    awarenessSensitivity: normalizeAwarenessSensitivity(
      messagesAwarenessSensitivityInputEl?.value
    )
  };
}

function persistAwarenessDraft(contact = null, conversation = null, draft = {}, options = {}) {
  const resolvedContact = contact && typeof contact === "object" ? contact : null;
  const resolvedConversation = conversation && typeof conversation === "object" ? conversation : null;
  const resolvedDraft = draft && typeof draft === "object" ? draft : {};
  const manualTrigger = Boolean(options.manualTrigger);
  if (!resolvedContact) {
    return { ok: false, message: "未找到当前聊天对象。" };
  }
  const contactIndex = state.contacts.findIndex((item) => item.id === resolvedContact.id);
  if (contactIndex < 0) {
    return { ok: false, message: "未找到当前聊天对象。" };
  }
  const previous = state.contacts[contactIndex];
  const changed =
    resolvedDraft.awarenessText !== String(previous.awarenessText || "").trim() ||
    resolvedDraft.awarenessTitle !==
      resolveAwarenessTitle(previous.awarenessTitle, previous.awarenessText) ||
    resolvedDraft.awarenessEmotionShift !== String(previous.awarenessEmotionShift || "").trim() ||
    resolvedDraft.awarenessSensitivity !== normalizeAwarenessSensitivity(previous.awarenessSensitivity);
  const nextHistory = changed
    ? []
    : normalizeAwarenessHistory(previous.awarenessHistory || []);
  const manualTriggerEntry = manualTrigger
    ? normalizeManualAwarenessTrigger({
        ...resolvedDraft,
        createdAt: Date.now()
      })
    : null;

  state.contacts[contactIndex] = {
    ...previous,
    awarenessTitle: resolvedDraft.awarenessTitle,
    awarenessText: resolvedDraft.awarenessText,
    awarenessEmotionShift: resolvedDraft.awarenessEmotionShift,
    awarenessSensitivity: resolvedDraft.awarenessSensitivity,
    awarenessConsumed: changed ? false : Boolean(previous.awarenessConsumed),
    awarenessResolvedState: changed
      ? ""
      : normalizeAwarenessResolvedState(previous.awarenessResolvedState, previous.awarenessConsumed),
    awarenessHistoryHidden: changed ? false : Boolean(previous.awarenessHistoryHidden),
    awarenessCheckCount: changed
      ? 0
      : Math.max(0, Number.parseInt(String(previous.awarenessCheckCount || 0), 10) || 0),
    awarenessTriggerCount: changed
      ? 0
      : Math.max(0, Number.parseInt(String(previous.awarenessTriggerCount || 0), 10) || 0),
    awarenessLastCheckedAt: changed ? 0 : Number(previous.awarenessLastCheckedAt) || 0,
    awarenessLastTriggeredAt: changed ? 0 : Number(previous.awarenessLastTriggeredAt) || 0,
    awarenessHistory: nextHistory,
    awarenessManualTriggerPending: manualTriggerEntry,
    updatedAt: Date.now()
  };
  persistContacts();
  if (changed && resolvedConversation) {
    const activeConversation = getConversationById(resolvedConversation.id);
    if (activeConversation) {
      activeConversation.awarenessCounter = 0;
      persistConversations();
    }
  }
  return {
    ok: true,
    changed,
    contact: state.contacts[contactIndex],
    manualTrigger
  };
}

function setAwarenessModalOpen(isOpen) {
  state.awarenessModalOpen = Boolean(isOpen);
  if (messagesAwarenessModalEl) {
    messagesAwarenessModalEl.hidden = !state.awarenessModalOpen;
    messagesAwarenessModalEl.setAttribute("aria-hidden", String(!state.awarenessModalOpen));
  }
  if (state.awarenessModalOpen) {
    const conversation = getConversationById();
    const contact = conversation ? getResolvedConversationContact(conversation) : null;
    applyAwarenessToForm(contact);
    window.setTimeout(() => {
      messagesAwarenessTextInputEl?.focus();
    }, 0);
  } else {
    setAwarenessStatus("");
  }
  updateBodyModalState();
}

function setRegenerateModalOpen(isOpen) {
  state.regenerateModalOpen = Boolean(isOpen);
  if (!state.regenerateModalOpen) {
    state.regenerateInstruction = "";
  }
  if (messagesRegenerateModalEl) {
    messagesRegenerateModalEl.hidden = !state.regenerateModalOpen;
    messagesRegenerateModalEl.setAttribute("aria-hidden", String(!state.regenerateModalOpen));
  }
  if (messagesRegenerateInstructionInputEl) {
    messagesRegenerateInstructionInputEl.value = state.regenerateInstruction || "";
  }
  if (state.regenerateModalOpen) {
    window.setTimeout(() => {
      messagesRegenerateInstructionInputEl?.focus();
    }, 0);
  }
  updateBodyModalState();
}

function setJournalStatus(message = "", tone = "") {
  state.journalStatusMessage = String(message || "").trim();
  state.journalStatusTone = tone ? String(tone || "").trim() : "";
  if (state.journalOpen) {
    renderJournalModal();
  }
}

function getActiveConversationContext() {
  const conversation = getConversationById();
  const contact = conversation ? getResolvedConversationContact(conversation) : null;
  return {
    conversation,
    contact
  };
}

function renderInnerThoughtModal() {
  if (!messagesInnerThoughtBodyEl) {
    return;
  }
  if (state.innerThoughtLoading) {
    messagesInnerThoughtBodyEl.innerHTML = `
      <div class="messages-inner-thought-card messages-inner-thought-card--loading">
        <p class="messages-inner-thought-card__meta">正在分析这条消息背后的心声…</p>
        <p class="messages-inner-thought-card__content">会结合角色人设、用户画像和目标气泡前的最近 10 轮会话来判断。</p>
      </div>
    `;
    return;
  }
  if (state.innerThoughtError) {
    messagesInnerThoughtBodyEl.innerHTML = `
      <div class="messages-inner-thought-card messages-inner-thought-card--error">
        <p class="messages-inner-thought-card__meta">心声生成失败</p>
        <p class="messages-inner-thought-card__content">${escapeHtml(state.innerThoughtError)}</p>
      </div>
    `;
    return;
  }
  if (!state.innerThoughtContent) {
    messagesInnerThoughtBodyEl.innerHTML = `
      <div class="messages-inner-thought-card">
        <p class="messages-inner-thought-card__meta">当前还没有可展示的心声内容。</p>
      </div>
    `;
    return;
  }
  const roleLabel = state.innerThoughtTargetRole === "assistant" ? "角色消息" : "用户消息";
  messagesInnerThoughtBodyEl.innerHTML = `
    <div class="messages-inner-thought-card">
      <div class="messages-inner-thought-card__anchor">
        <span class="messages-inner-thought-card__badge">${escapeHtml(roleLabel)}</span>
        <p class="messages-inner-thought-card__preview">${escapeHtml(state.innerThoughtTargetPreview || "")}</p>
      </div>
      <p class="messages-inner-thought-card__content">${escapeHtml(state.innerThoughtContent).replace(
        /\n/g,
        "<br />"
      )}</p>
    </div>
  `;
}

function setInnerThoughtModalOpen(isOpen) {
  state.innerThoughtModalOpen = Boolean(isOpen);
  if (!state.innerThoughtModalOpen) {
    state.innerThoughtLoading = false;
    state.innerThoughtError = "";
    state.innerThoughtContent = "";
    state.innerThoughtTargetMessageId = "";
    state.innerThoughtTargetRole = "";
    state.innerThoughtTargetPreview = "";
  }
  if (messagesInnerThoughtModalEl) {
    messagesInnerThoughtModalEl.hidden = !state.innerThoughtModalOpen;
    messagesInnerThoughtModalEl.setAttribute("aria-hidden", String(!state.innerThoughtModalOpen));
  }
  if (state.innerThoughtModalOpen) {
    renderInnerThoughtModal();
  }
  updateBodyModalState();
}

function renderDiscussionShareModalRepostMarkup(repostSource = null) {
  const source = normalizeDiscussionShareRepostSource(repostSource);
  if (!source) {
    return "";
  }
  const summaryText = String(source.text || source.imageHint || "").trim() || "无正文";
  return `
    <div class="messages-discussion-share-modal__repost">
      <div class="messages-discussion-share-modal__repost-head">
        <strong>${escapeHtml(source.displayName)}</strong>
        <span>${escapeHtml(source.handle)}</span>
        ${source.time ? `<span>· ${escapeHtml(source.time)}</span>` : ""}
      </div>
      <p>${escapeHtml(summaryText)}</p>
      ${
        source.tags?.length
          ? `<div class="messages-discussion-share-modal__tags">${source.tags
              .map((tag) => `<span>${escapeHtml(tag)}</span>`)
              .join("")}</div>`
          : ""
      }
    </div>
  `;
}

function renderDiscussionShareModalReplyNodes(replies = [], depth = 1) {
  return normalizeObjectArray(replies)
    .map((reply) => {
      const summaryText = String(reply.text || reply.imageHint || "").trim() || "无正文";
      const childMarkup = reply.children?.length
        ? `<div class="messages-discussion-share-modal__reply-children">${renderDiscussionShareModalReplyNodes(
            reply.children,
            depth + 1
          )}</div>`
        : "";
      return `
        <article class="messages-discussion-share-modal__reply" data-depth="${escapeHtml(String(depth))}">
          <div class="messages-discussion-share-modal__reply-head">
            <strong>${escapeHtml(reply.displayName)}</strong>
            <span>${escapeHtml(reply.handle)}</span>
            ${reply.time ? `<span>· ${escapeHtml(reply.time)}</span>` : ""}
          </div>
          <p>${escapeHtml(summaryText)}</p>
          ${childMarkup}
        </article>
      `;
    })
    .join("");
}

function renderDiscussionShareModal() {
  if (
    !messagesDiscussionShareModalMetaEl ||
    !messagesDiscussionShareModalRootEl ||
    !messagesDiscussionShareModalRepliesEl ||
    !messagesDiscussionShareModalHintEl
  ) {
    return;
  }

  const conversation = getConversationById();
  const targetMessage =
    conversation?.messages?.find(
      (message) =>
        String(message?.id || "").trim() === String(state.discussionShareModalMessageId || "").trim()
    ) || null;
  const payload = targetMessage ? getDiscussionSharePayloadFromMessage(targetMessage) : null;
  if (!payload) {
    messagesDiscussionShareModalMetaEl.textContent = "讨论帖暂不可用";
    messagesDiscussionShareModalRootEl.innerHTML =
      '<div class="messages-discussion-share-modal__empty">这条讨论帖可能已被删除，或当前会话已切换。</div>';
    messagesDiscussionShareModalRepliesEl.innerHTML = "";
    messagesDiscussionShareModalHintEl.textContent = "";
    return;
  }

  const rootPost = payload.rootPost || {};
  messagesDiscussionShareModalMetaEl.textContent =
    payload.feedLabel || payload.bucketName
      ? `来源：${payload.feedLabel || payload.bucketName}`
      : "来源：社媒讨论";
  messagesDiscussionShareModalRootEl.innerHTML = `
    <article class="messages-discussion-share-modal__root-card">
      <div class="messages-discussion-share-modal__root-head">
        <strong>${escapeHtml(String(rootPost.displayName || "论坛用户").trim())}</strong>
        <span>${escapeHtml(String(rootPost.handle || "@forum_user").trim())}</span>
        ${rootPost.time ? `<span>· ${escapeHtml(rootPost.time)}</span>` : ""}
      </div>
      ${
        rootPost.text
          ? `<p class="messages-discussion-share-modal__root-text">${escapeHtml(rootPost.text)}</p>`
          : rootPost.imageHint
            ? `<p class="messages-discussion-share-modal__root-text">${escapeHtml(
                rootPost.imageHint
              )}</p>`
            : '<p class="messages-discussion-share-modal__root-text">这是一条无正文主贴。</p>'
      }
      ${
        rootPost.tags?.length
          ? `<div class="messages-discussion-share-modal__tags">${rootPost.tags
              .map((tag) => `<span>${escapeHtml(tag)}</span>`)
              .join("")}</div>`
          : ""
      }
      ${renderDiscussionShareModalRepostMarkup(rootPost.repostSource)}
    </article>
  `;
  messagesDiscussionShareModalRepliesEl.innerHTML = payload.replies?.length
    ? renderDiscussionShareModalReplyNodes(payload.replies)
    : '<div class="messages-discussion-share-modal__empty">当前还没有加载到回复。</div>';
  messagesDiscussionShareModalHintEl.textContent =
    payload.truncatedReplyCount > 0
      ? `当前只展示已加载内容，另有 ${payload.truncatedReplyCount} 条回复未随卡片带入。`
      : "当前展示的是用户转发进来的主贴和已加载回复。";
}

function setDiscussionShareModalOpen(isOpen, messageId = "") {
  state.discussionShareModalOpen = Boolean(isOpen);
  state.discussionShareModalMessageId = state.discussionShareModalOpen
    ? String(messageId || state.discussionShareModalMessageId || "").trim()
    : "";
  if (messagesDiscussionShareModalEl) {
    messagesDiscussionShareModalEl.hidden = !state.discussionShareModalOpen;
    messagesDiscussionShareModalEl.setAttribute(
      "aria-hidden",
      String(!state.discussionShareModalOpen)
    );
  }
  if (state.discussionShareModalOpen) {
    renderDiscussionShareModal();
  }
  updateBodyModalState();
}

function renderJournalContentText(text = "") {
  return escapeHtml(String(text || "").trim()).replace(/\n/g, "<br />");
}

function getResolvedJournalWeatherLabel(dateText = getTodayDateValue()) {
  const cache = loadWeatherCache();
  const cachedLabel = String(cache?.[dateText]?.label || "").trim();
  if (state.journalWeatherDate === dateText && state.journalWeatherLabel) {
    return state.journalWeatherLabel;
  }
  return cachedLabel;
}

function renderJournalModal() {
  if (!messagesJournalBodyEl) {
    return;
  }

  const { conversation, contact } = getActiveConversationContext();
  const todayDate = getTodayDateValue();
  const selectedEntry =
    contact && state.journalSelectedEntryId
      ? getJournalEntryById(state.journalSelectedEntryId)
      : null;
  const todayEntry = contact ? getJournalEntryForDate(contact.id, todayDate) : null;
  const activeEntry =
    selectedEntry && selectedEntry.contactId === String(contact?.id || "").trim()
      ? selectedEntry
      : todayEntry;
  const isViewingHistoryEntry = Boolean(
    activeEntry &&
      activeEntry.id &&
      todayEntry &&
      String(activeEntry.id || "").trim() !== String(todayEntry.id || "").trim()
  );
  const weatherText = activeEntry?.weather || todayEntry?.weather || "天气将从今日日内聊天里提取";
  const statusMarkup = state.journalStatusMessage
    ? `<p class="messages-journal-status ${escapeHtml(state.journalStatusTone)}">${escapeHtml(
        state.journalStatusMessage
      )}</p>`
    : "";

  if (!conversation || !contact) {
    messagesJournalBodyEl.innerHTML =
      '<div class="messages-journal-empty"><p>当前没有可写日记的聊天对象。</p></div>';
    return;
  }

  if (state.journalGenerating) {
    messagesJournalBodyEl.innerHTML = `
      <div class="messages-journal-empty">
        ${statusMarkup}
        <p class="messages-journal-empty__title">${escapeHtml(contact.name)} 正在写今日日记…</p>
        <p class="messages-journal-empty__sub">会优先参考今天的聊天，再把当前挂载的世界书与论坛背景作为补充。</p>
      </div>
    `;
    return;
  }

  if (!activeEntry) {
    messagesJournalBodyEl.innerHTML = `
      <div class="messages-journal-empty">
        ${statusMarkup}
        <p class="messages-journal-empty__title">今天还没有写日记呢…</p>
        <p class="messages-journal-empty__meta">${escapeHtml(formatJournalDateLabel(todayDate))} · ${escapeHtml(weatherText)}</p>
        <button
          class="messages-journal-empty__action"
          type="button"
          data-action="generate-journal-entry"
        >
          ◌ 喊ta写日记
        </button>
      </div>
    `;
    return;
  }

  messagesJournalBodyEl.innerHTML = `
    <div class="messages-journal-scroll">
      ${statusMarkup}
      <article class="messages-journal-paper">
        <div class="messages-journal-paper__meta">
          <strong>${escapeHtml(formatJournalFullDateLabel(activeEntry.date))}</strong>
          <span>${escapeHtml(activeEntry.weather || weatherText)}</span>
        </div>
        <div class="messages-journal-paper__content">${renderJournalContentText(activeEntry.content)}</div>
      </article>
      ${
        isViewingHistoryEntry
          ? `
              <button
                class="messages-journal-paper__action"
                type="button"
                data-action="open-today-journal"
              >
                返回今日日记
              </button>
            `
          : `
              <button
                class="messages-journal-paper__action"
                type="button"
                data-action="generate-journal-entry"
              >
                重新让ta写一篇
              </button>
            `
      }
    </div>
  `;
}

function renderSchedulePreviewModal() {
  if (!messagesScheduleBodyEl) {
    return;
  }

  const todayDate = getTodayDateValue();
  const entries = getTodayUserScheduleEntries(todayDate);
  if (!entries.length) {
    messagesScheduleBodyEl.innerHTML = `
      <div class="messages-schedule-empty">
        <p class="messages-schedule-empty__title">今天还没有安排</p>
        <p class="messages-schedule-empty__meta">${escapeHtml(formatScheduleDateLabel(todayDate))}</p>
        <p class="messages-schedule-empty__sub">这里只展示今日日程，不提供新增或编辑入口。</p>
      </div>
    `;
    return;
  }

  const allDayEntries = entries.filter((entry) => entry.scheduleType === "day");
  const timedEntries = entries.filter((entry) => entry.scheduleType !== "day");
  const timelineHours = getChatSchedulePreviewHours(timedEntries);

  messagesScheduleBodyEl.innerHTML = `
    <div class="messages-schedule-preview">
      <div class="messages-schedule-preview__hero">
        <span class="messages-schedule-preview__kicker">今日日程</span>
        <strong>${escapeHtml(formatScheduleDateLabel(todayDate))}</strong>
        <span>${escapeHtml(`共 ${entries.length} 条安排`)}</span>
      </div>
      <div class="messages-schedule-timeline">
        ${
          allDayEntries.length
            ? `
                <div class="messages-schedule-timeline__row messages-schedule-timeline__row--all-day">
                  <div class="messages-schedule-timeline__label">全天</div>
                  <div class="messages-schedule-timeline__body">
                    <div class="messages-schedule-timeline__entries">
                      ${allDayEntries
                        .map(
                          (entry) => `
                            <article class="messages-schedule-card messages-schedule-card--all-day">
                              <div class="messages-schedule-card__top">
                                <span class="messages-schedule-card__time">全天</span>
                                <span class="messages-schedule-card__badge">${escapeHtml(
                                  formatSchedulePreviewBadge(entry)
                                )}</span>
                              </div>
                              <strong class="messages-schedule-card__title">${escapeHtml(entry.title)}</strong>
                              <p class="messages-schedule-card__meta">${escapeHtml(
                                entry.previewMeta || "用户日程"
                              )}</p>
                            </article>
                          `
                        )
                        .join("")}
                    </div>
                  </div>
                </div>
              `
            : ""
        }
        ${timelineHours
          .map((hour) => {
            const rowEntries = timedEntries.filter((entry) => schedulePreviewEntryOccupiesHour(entry, hour));
            return `
              <div class="messages-schedule-timeline__row">
                <div class="messages-schedule-timeline__label">${escapeHtml(
                  `${padTimeUnit(hour)}:00`
                )}</div>
                <div class="messages-schedule-timeline__body">
                  <div class="messages-schedule-timeline__entries">
                    ${rowEntries
                      .map((entry) => {
                        const slotState = getSchedulePreviewEntrySlotState(entry, hour);
                        return `
                          <article class="messages-schedule-card messages-schedule-card--${escapeHtml(
                            slotState
                          )}">
                            <div class="messages-schedule-card__top">
                              <span class="messages-schedule-card__time">${escapeHtml(
                                slotState === "continuation"
                                  ? `延续至 ${entry.endTime}`
                                  : formatSchedulePreviewTime(entry)
                              )}</span>
                              <span class="messages-schedule-card__badge">${escapeHtml(
                                formatSchedulePreviewBadge(entry)
                              )}</span>
                            </div>
                            <strong class="messages-schedule-card__title">${escapeHtml(entry.title)}</strong>
                            <p class="messages-schedule-card__meta">${escapeHtml(
                              entry.previewMeta || "用户日程"
                            )}</p>
                          </article>
                        `;
                      })
                      .join("")}
                  </div>
                </div>
              </div>
            `;
          })
          .join("")}
      </div>
    </div>
  `;
}

function renderJournalHistoryModal() {
  if (!messagesJournalHistoryListEl) {
    return;
  }

  const { contact } = getActiveConversationContext();
  const entries = contact ? getJournalEntriesForContact(contact.id) : [];
  if (!entries.length) {
    messagesJournalHistoryListEl.innerHTML =
      '<div class="messages-empty">还没有任何日记记录。先生成一篇今日日记吧。</div>';
    return;
  }

  messagesJournalHistoryListEl.innerHTML = entries
    .map(
      (entry) => `
        <article
          class="messages-journal-history-row"
          data-action="open-journal-history-entry"
          data-entry-id="${escapeHtml(entry.id)}"
          role="button"
          tabindex="0"
        >
          <div class="messages-journal-history-row__head">
            <strong>${escapeHtml(formatJournalFullDateLabel(entry.date))}</strong>
            <span>${escapeHtml(entry.weather || "天气未记录")}</span>
          </div>
          <p>${escapeHtml(truncate(entry.content, 140))}</p>
        </article>
      `
    )
    .join("");
}

function applyJournalSettingsToForm(promptSettings = state.chatPromptSettings) {
  const resolved = normalizeMessagePromptSettings(promptSettings);
  if (messagesJournalLengthInputEl) {
    messagesJournalLengthInputEl.value = String(resolved.journalLength);
  }
  setEditorStatus(messagesJournalSettingsStatusEl);
}

function setJournalOpen(isOpen) {
  state.journalOpen = Boolean(isOpen);
  if (!state.journalOpen) {
    setJournalHistoryOpen(false);
    setJournalSettingsOpen(false);
    state.journalSelectedEntryId = "";
    state.journalGenerating = false;
    state.journalStatusMessage = "";
    state.journalStatusTone = "";
  }
  if (messagesJournalModalEl) {
    messagesJournalModalEl.hidden = !state.journalOpen;
    messagesJournalModalEl.setAttribute("aria-hidden", String(!state.journalOpen));
  }
  if (state.journalOpen) {
    state.journalSelectedEntryId = "";
    state.journalStatusMessage = "";
    state.journalStatusTone = "";
    renderJournalModal();
  }
  updateBodyModalState();
}

function setSchedulePreviewOpen(isOpen) {
  state.schedulePreviewOpen = Boolean(isOpen);
  if (messagesScheduleModalEl) {
    messagesScheduleModalEl.hidden = !state.schedulePreviewOpen;
    messagesScheduleModalEl.setAttribute("aria-hidden", String(!state.schedulePreviewOpen));
  }
  if (state.schedulePreviewOpen) {
    renderSchedulePreviewModal();
  }
  updateBodyModalState();
}

function setJournalHistoryOpen(isOpen) {
  state.journalHistoryOpen = Boolean(isOpen);
  if (messagesJournalHistoryModalEl) {
    messagesJournalHistoryModalEl.hidden = !state.journalHistoryOpen;
    messagesJournalHistoryModalEl.setAttribute("aria-hidden", String(!state.journalHistoryOpen));
  }
  if (state.journalHistoryOpen) {
    renderJournalHistoryModal();
  }
  updateBodyModalState();
}

function openJournalEntryDetail(entryId = "") {
  const entry = getJournalEntryById(entryId);
  if (!entry) {
    return false;
  }
  state.journalSelectedEntryId = String(entry.id || "").trim();
  setJournalHistoryOpen(false);
  renderJournalModal();
  return true;
}

function setJournalSettingsOpen(isOpen) {
  state.journalSettingsOpen = Boolean(isOpen);
  if (messagesJournalSettingsModalEl) {
    messagesJournalSettingsModalEl.hidden = !state.journalSettingsOpen;
    messagesJournalSettingsModalEl.setAttribute("aria-hidden", String(!state.journalSettingsOpen));
  }
  if (state.journalSettingsOpen) {
    applyJournalSettingsToForm(loadSettings().messagePromptSettings);
    window.setTimeout(() => {
      messagesJournalLengthInputEl?.focus();
    }, 0);
  }
  updateBodyModalState();
}

async function requestJournalEntry() {
  const { conversation, contact } = getActiveConversationContext();
  if (!conversation || !contact) {
    setMessagesStatus("未找到当前聊天对象，暂时无法写日记。", "error");
    return;
  }
  if (state.journalGenerating) {
    return;
  }
  if (isConversationReplyBusy(conversation.id)) {
    setMessagesStatus("当前正在等待聊天回复，稍后再喊 ta 写日记吧。", "error");
    setJournalStatus("当前正在等待聊天回复，稍后再喊 ta 写日记吧。", "error");
    return;
  }

  const settings = loadSettings();
  const todayDate = getPromptTodayDateValue(settings);
  const todaysMessages = getJournalMessagesForDate(conversation, todayDate);
  if (!todaysMessages.length) {
    setMessagesStatus("今天还没有聊天记录，先聊几句再来喊 ta 写日记吧。", "error");
    setJournalStatus("今天还没有聊天记录，先聊几句再来喊 ta 写日记吧。", "error");
    return;
  }

  const promptSettings = getConversationPromptSettings(conversation, settings.messagePromptSettings);
  state.chatPromptSettings = promptSettings;
  state.journalGenerating = true;
  setJournalStatus("", "");
  renderJournalModal();

  try {
    const content = await requestJournalEntryText(
      settings,
      state.profile,
      contact,
      conversation,
      promptSettings,
      {
        dateText: todayDate
      }
    );

    const nextEntry = normalizeJournalEntry({
      id: `journal_${contact.id}_${todayDate}`,
      contactId: contact.id,
      contactNameSnapshot: contact.name,
      conversationId: conversation.id,
      date: todayDate,
      weather: "",
      content,
      createdAt: Date.now(),
      updatedAt: Date.now()
    });
    const existingIndex = state.journalEntries.findIndex(
      (entry) => entry.contactId === contact.id && entry.date === todayDate
    );
    if (existingIndex >= 0) {
      state.journalEntries[existingIndex] = nextEntry;
    } else {
      state.journalEntries = [nextEntry, ...state.journalEntries];
    }
    state.journalSelectedEntryId = "";
    persistJournalEntries();
    renderJournalHistoryModal();
    setMessagesStatus("今日日记已生成。", "success");
    setJournalStatus("今日日记已生成。", "success");
  } catch (error) {
    setMessagesStatus(`日记生成失败：${error?.message || "请求失败"}`, "error");
    setJournalStatus(`日记生成失败：${error?.message || "请求失败"}`, "error");
  } finally {
    state.journalGenerating = false;
    renderJournalModal();
  }
}

function getFilteredConversations() {
  const query = state.query.trim().toLowerCase();
  const conversations = sortConversations(state.conversations);
  if (!query) {
    return conversations;
  }
  return conversations.filter((conversation) => {
    const meta = getConversationMeta(conversation);
    const latestMessage = conversation.messages[conversation.messages.length - 1] || null;
    const searchable = `${meta.name} ${latestMessage?.text || ""}`.toLowerCase();
    return searchable.includes(query);
  });
}

function getFilteredContacts() {
  const query = state.query.trim().toLowerCase();
  const contacts = state.contacts.slice().sort((left, right) => (right.updatedAt || 0) - (left.updatedAt || 0));
  if (!query) {
    return contacts;
  }
  return contacts.filter((contact) => {
    const searchable = `${contact.name} ${contact.personaPrompt || ""}`.toLowerCase();
    return searchable.includes(query);
  });
}

function renderNavButton() {
  if (!messagesNavBtnEl) {
    return;
  }
  if (state.activeConversationId && state.activeTab === "chat") {
    messagesNavBtnEl.hidden = false;
    messagesNavBtnEl.setAttribute("aria-label", "返回聊天列表");
    messagesNavBtnEl.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M15 6 9 12l6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    `;
    return;
  }

  messagesNavBtnEl.hidden = false;
  messagesNavBtnEl.setAttribute("aria-label", "关闭 Chat");
  messagesNavBtnEl.innerHTML = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 7l10 10M17 7 7 17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
  `;
}

function renderTopbar() {
  const activeConversation = getConversationById();
  const isTyping =
    Boolean(activeConversation) &&
    state.activeTab === "chat" &&
    state.sendingConversationId === activeConversation.id;
  const isSelectionMode = Boolean(
    activeConversation && isConversationMessageSelectionActive(activeConversation.id)
  );
  const title =
    isSelectionMode
      ? `已选 ${pruneSelectedConversationMessages(activeConversation).size} 条`
      : isTyping
      ? "正在输入……"
      : activeConversation && state.activeTab === "chat"
      ? getConversationMeta(activeConversation).name
      : TAB_TITLES[state.activeTab] || "微信";

  if (messagesPageTitleEl) {
    messagesPageTitleEl.textContent = title;
  }

  renderNavButton();

  const inConversation = Boolean(activeConversation && state.activeTab === "chat");
  const inVoiceCall = inConversation && isConversationVoiceCallActive(activeConversation);
  const hasPendingIncomingCall =
    inConversation && Boolean(getLatestPendingAssistantVoiceCallRequest(activeConversation));
  const isReplyBusy = inConversation && isConversationReplyBusy(activeConversation.id);
  const canManageSelection =
    inConversation &&
    Array.isArray(activeConversation?.messages) &&
    activeConversation.messages.length > 0 &&
    !inVoiceCall &&
    !hasPendingIncomingCall &&
    !isReplyBusy &&
    !state.chatReadonlyMode;

  if (messagesSearchBtnEl) {
    messagesSearchBtnEl.hidden = !(state.activeTab === "contacts" && !inConversation);
  }

  if (messagesMessageSelectBtnEl) {
    messagesMessageSelectBtnEl.hidden = !canManageSelection && !isSelectionMode;
    messagesMessageSelectBtnEl.textContent = isSelectionMode ? "取消" : "多选";
    messagesMessageSelectBtnEl.setAttribute(
      "aria-label",
      isSelectionMode ? "取消多选" : "多选消息"
    );
  }

  if (messagesChatSettingsBtnEl) {
    messagesChatSettingsBtnEl.hidden =
      !inConversation || inVoiceCall || hasPendingIncomingCall || isSelectionMode;
  }

  if (messagesChatSceneBtnEl) {
    const sceneMode = activeConversation?.sceneMode === "offline" ? "offline" : "online";
    messagesChatSceneBtnEl.hidden =
      !inConversation || inVoiceCall || hasPendingIncomingCall || isSelectionMode;
    messagesChatSceneBtnEl.classList.toggle("is-offline", sceneMode === "offline");
    messagesChatSceneBtnEl.setAttribute(
      "aria-label",
      sceneMode === "offline" ? "当前为线下见面状态" : "当前为线上聊天状态"
    );
  }

  if (messagesAddBtnEl) {
    messagesAddBtnEl.hidden = !((state.activeTab === "chat" || state.activeTab === "contacts") && !inConversation);
    messagesAddBtnEl.setAttribute(
      "aria-label",
      state.activeTab === "contacts" ? "新增联系人" : "发起会话"
    );
  }
}

function renderSearchSection() {
  if (!messagesSearchSectionEl || !messagesSearchInputEl) {
    return;
  }

  const inConversation = Boolean(state.activeConversationId && state.activeTab === "chat");
  const shouldShow = !inConversation && state.activeTab === "contacts" && state.contactsSearchOpen;

  messagesSearchSectionEl.hidden = !shouldShow;
  messagesSearchInputEl.placeholder = state.activeTab === "contacts" ? "搜索联系人" : "搜索";
  messagesSearchInputEl.value = state.query;
}

function renderTabbar() {
  if (!messagesTabbarEl) {
    return;
  }

  const inConversation = Boolean(state.activeConversationId && state.activeTab === "chat");
  messagesTabbarEl.hidden = inConversation;
  messagesTabbarEl.querySelectorAll("[data-tab]").forEach((button) => {
    if (!(button instanceof HTMLElement)) {
      return;
    }
    button.classList.toggle("is-active", button.dataset.tab === state.activeTab);
  });
}

function buildConversationAvatarMarkup(conversation) {
  const meta = getConversationMeta(conversation);
  return meta.avatarImage
    ? `<img src="${escapeHtml(meta.avatarImage)}" alt="${escapeHtml(meta.name)} 的头像" />`
    : `<span>${escapeHtml(meta.avatarText)}</span>`;
}

function buildConversationDetailAvatarMarkup(role, conversation, promptSettings = state.chatPromptSettings) {
  if (role === "user") {
    if (!promptSettings.showUserAvatar) {
      return "";
    }
    return buildAvatarMarkup(
      state.profile.avatarImage,
      getProfileAvatarFallback(state.profile),
      "messages-message-row__avatar"
    );
  }

  if (!promptSettings.showContactAvatar) {
    return "";
  }
  const meta = getConversationMeta(conversation);
  return buildAvatarMarkup(
    meta.avatarImage,
    meta.avatarText || getContactAvatarFallback({ name: meta.name }),
    "messages-message-row__avatar"
  );
}

function renderConversationUtilityIcon(icon) {
  switch (icon) {
    case "refresh":
      return `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 8.5A7 7 0 0 1 18 7M18 7v4M18 7h-4M18 15.5A7 7 0 0 1 6 17M6 17v-4M6 17h4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      `;
    case "mic":
      return `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="9" y="4.5" width="6" height="10" rx="3" fill="none" stroke="currentColor" stroke-width="1.8" />
          <path d="M6.8 11.8a5.2 5.2 0 0 0 10.4 0M12 17v2.5M9.2 19.5h5.6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
        </svg>
      `;
    case "smile":
      return `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="7.2" fill="none" stroke="currentColor" stroke-width="1.8" />
          <path d="M9.1 14.1c.7.8 1.7 1.2 2.9 1.2s2.2-.4 2.9-1.2M9 10.4h.01M15 10.4h.01" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
        </svg>
      `;
    case "camera":
      return `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7.5 8.5 9 6.5h6l1.5 2H18a2 2 0 0 1 2 2V17a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6.5a2 2 0 0 1 2-2Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" />
          <circle cx="12" cy="13" r="3.1" fill="none" stroke="currentColor" stroke-width="1.8" />
        </svg>
      `;
    case "image":
      return `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="4.5" y="5" width="15" height="14" rx="2.3" fill="none" stroke="currentColor" stroke-width="1.8" />
          <path d="m7.2 16 3.1-3.4 2.5 2.6 1.9-2 2.1 2.8M9 9.4h.01" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      `;
    case "swap":
      return `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7 7h10m0 0-2.5-2.5M17 7l-2.5 2.5M17 17H7m0 0 2.5-2.5M7 17l2.5 2.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      `;
    case "phone":
      return `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7.5 5.5c.8-.4 1.5-.3 2 .4l1.2 1.9c.4.7.3 1.4-.2 1.9l-.9.9c1 1.8 2.5 3.3 4.3 4.3l.9-.9c.5-.5 1.2-.6 1.9-.2l1.9 1.2c.7.5.8 1.2.4 2l-.6 1.2c-.4.8-1.1 1.2-2 1.1-7-.7-12.4-6.1-13.1-13.1-.1-.9.3-1.6 1.1-2Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" />
        </svg>
      `;
    case "video":
      return `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="4.5" y="7" width="10.5" height="10" rx="2.2" fill="none" stroke="currentColor" stroke-width="1.8" />
          <path d="m15 10.1 4.5-2.3v8.4L15 14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" />
        </svg>
      `;
    case "pin":
      return `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 19s5-4.4 5-8.5A5 5 0 0 0 7 10.5C7 14.6 12 19 12 19Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" />
          <circle cx="12" cy="10.3" r="1.9" fill="none" stroke="currentColor" stroke-width="1.8" />
        </svg>
      `;
    case "book":
      return `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7 5.5h10a2 2 0 0 1 2 2V18a1.5 1.5 0 0 0-1.5-1.5H7.8A2.8 2.8 0 0 0 5 19.3V7.5a2 2 0 0 1 2-2Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" />
          <path d="M8.5 9.2h6M8.5 12.2h6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
        </svg>
      `;
    case "calendar":
      return `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="4.8" y="6.2" width="14.4" height="12.6" rx="2.4" fill="none" stroke="currentColor" stroke-width="1.8" />
          <path d="M8 4.5v3M16 4.5v3M4.8 9.6h14.4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
          <path d="M8.5 12.7h.01M12 12.7h.01M15.5 12.7h.01M8.5 15.6h.01M12 15.6h.01" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
      `;
    case "gamepad":
      return `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7.5 9h9a4 4 0 0 1 3.8 5l-.6 2a2 2 0 0 1-3.2 1l-2.1-1.7H9.6L7.5 17a2 2 0 0 1-3.2-1l-.6-2a4 4 0 0 1 3.8-5Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" />
          <path d="M8.4 12.6h2.6M9.7 11.3v2.6M15.8 12.3h.01M17.4 13.7h.01" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
        </svg>
      `;
    case "headphones":
      return `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 12a6 6 0 1 1 12 0" fill="none" stroke="currentColor" stroke-width="1.8" />
          <rect x="5" y="12" width="3.2" height="6.2" rx="1.4" fill="none" stroke="currentColor" stroke-width="1.8" />
          <rect x="15.8" y="12" width="3.2" height="6.2" rx="1.4" fill="none" stroke="currentColor" stroke-width="1.8" />
        </svg>
      `;
    case "bag":
      return `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6.2 9.5h11.6l-1 9H7.2l-1-9Zm3.2 0V8a2.6 2.6 0 1 1 5.2 0v1.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" />
        </svg>
      `;
    case "steps":
      return `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8 8.5c0 1.5-.8 2.8-2 3.4l-1.5.8M13 6.5c0 1.9 1 3.4 2.4 4.1l2.1 1M9.5 14.5c0 1.5-.8 2.8-2 3.4l-1.5.8M15.5 12.8c0 1.8 1 3.3 2.5 4l1 .5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      `;
    case "eye":
      return `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3.8 12s2.8-4.7 8.2-4.7S20.2 12 20.2 12s-2.8 4.7-8.2 4.7S3.8 12 3.8 12Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" />
          <circle cx="12" cy="12" r="2.4" fill="none" stroke="currentColor" stroke-width="1.8" />
        </svg>
      `;
    case "bookshelf":
      return `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 6v12M10 8v10M14 6v12M18 9v9M5 18h14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      `;
    case "heart":
      return `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 19s-6-3.8-6-8.2A3.8 3.8 0 0 1 12 8a3.8 3.8 0 0 1 6 2.8C18 15.2 12 19 12 19Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" />
        </svg>
      `;
    default:
      return `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
        </svg>
      `;
  }
}

function renderConversationUtilityPanel() {
  const readonlyMutationTools = new Set([
    "regenerate",
    "voice",
    "camera",
    "image",
    "phone",
    "video",
    "location",
    "awareness"
  ]);
  return `
    <div class="messages-conversation__utility ${state.composerPanelOpen ? "is-open" : ""}">
      <button
        class="messages-conversation__utility-backdrop"
        type="button"
        data-action="close-composer-panel"
        aria-label="关闭聊天功能栏"
      ></button>
      <div class="messages-conversation__utility-panel" role="group" aria-label="聊天功能栏">
        ${CHAT_UTILITY_ITEMS.map(
          (item) => `
            <button
              class="messages-conversation__utility-item"
              type="button"
              data-action="conversation-tool"
              data-tool-id="${escapeHtml(item.id)}"
              ${
                state.chatReadonlyMode && readonlyMutationTools.has(item.id)
                  ? 'disabled aria-disabled="true"'
                  : ""
              }
            >
              <span class="messages-conversation__utility-icon">
                ${renderConversationUtilityIcon(item.icon)}
              </span>
              <span>${escapeHtml(item.label)}</span>
            </button>
          `
        ).join("")}
      </div>
    </div>
  `;
}

function renderConversationMessageMenu(message, isMenuOpen) {
  if (!isMenuOpen) {
    return "";
  }
  const mutationDisabledAttr = state.chatReadonlyMode ? ' disabled aria-disabled="true"' : "";
  const sceneMode = getConversationSceneMode();
  const isDiscussionShareMessage = isDiscussionShareConversationMessage(message);
  const canQuote =
    sceneMode === "online" &&
    !isDiscussionShareMessage &&
    !isScheduleInviteConversationMessage(message) &&
    !isLocationConversationMessage(message) &&
    !isImageConversationMessage(message) &&
    !isVoiceConversationMessage(message) &&
    !isConversationCallRequestMessage(message) &&
    !isConversationCallEventMessage(message);
  const canReadInnerThought =
    message?.role === "assistant" &&
    !isDiscussionShareMessage &&
    !isScheduleInviteConversationMessage(message) &&
    !isLocationConversationMessage(message) &&
    !isImageConversationMessage(message) &&
    !isVoiceConversationMessage(message) &&
    !isConversationCallRequestMessage(message) &&
    !isConversationCallEventMessage(message);
  const actions =
    isDiscussionShareMessage ||
    isScheduleInviteConversationMessage(message) ||
    isLocationConversationMessage(message) ||
    isImageConversationMessage(message) ||
    isVoiceConversationMessage(message) ||
    isConversationCallRequestMessage(message) ||
    isConversationCallEventMessage(message)
    ? [
        `
          <button
            type="button"
            data-action="delete-conversation-message"
            data-message-id="${escapeHtml(message.id)}"
            ${mutationDisabledAttr}
          >
            删除
          </button>
        `
      ]
    : [
        `
          <button
            type="button"
            data-action="edit-conversation-message"
            data-message-id="${escapeHtml(message.id)}"
            ${mutationDisabledAttr}
          >
            编辑
          </button>
        `,
        `
          <button
            type="button"
            data-action="delete-conversation-message"
            data-message-id="${escapeHtml(message.id)}"
            ${mutationDisabledAttr}
          >
            删除
          </button>
        `
      ];
  return `
    <div class="messages-message-row__menu" role="group" aria-label="消息操作">
      ${
        canQuote
          ? `
            <button
              type="button"
              data-action="quote-conversation-message"
              data-message-id="${escapeHtml(message.id)}"
            >
              引用
            </button>
          `
          : ""
      }
      ${
        canReadInnerThought
          ? `
            <button
              type="button"
              data-action="inner-thought-conversation-message"
              data-message-id="${escapeHtml(message.id)}"
            >
              心声
            </button>
          `
          : ""
      }
      ${actions.join("")}
    </div>
  `;
}

function renderConversationQuoteCard(message, isUser = false) {
  const quotedRole = String(message?.quotedRole || "").trim() === "assistant" ? "assistant" : "user";
  const quotedRoleLabel = quotedRole === "assistant" ? "角色" : "用户";
  const replyText = String(message?.text || "").trim();
  return `
    <article class="messages-bubble messages-bubble--quote ${
      isUser ? "messages-bubble--user" : "messages-bubble--assistant"
    }">
      <div class="messages-quote-card">
        <div class="messages-quote-card__meta">${escapeHtml(quotedRoleLabel)}</div>
        <p class="messages-quote-card__text">${escapeHtml(String(message?.quotedText || "").trim())}</p>
      </div>
      <p>${escapeHtml(replyText)}</p>
    </article>
  `;
}

function renderComposerQuotePreview(message = null) {
  const resolvedMessage = message && typeof message === "object" ? message : null;
  if (!resolvedMessage) {
    return "";
  }
  const quotedRole = resolvedMessage.role === "assistant" ? "角色" : "用户";
  return `
    <div class="messages-conversation__quote-draft">
      <div class="messages-conversation__quote-draft-meta">
        <strong>正在引用 ${escapeHtml(quotedRole)}</strong>
        <button type="button" data-action="clear-quoted-message" aria-label="取消引用">取消</button>
      </div>
      <p>${escapeHtml(getConversationMessagePreviewText(resolvedMessage))}</p>
    </div>
  `;
}

function renderConversationLocationCard(message) {
  return `
    <article class="messages-location-card">
      ${renderLocationMapMarkup(message.locationName, message.coordinates, { compact: true })}
    </article>
  `;
}

function getConversationScheduleInviteStatus(message, conversation) {
  const resolvedConversation = conversation && typeof conversation === "object" ? conversation : null;
  const contactId = String(resolvedConversation?.contactId || "").trim();
  if (!contactId) {
    return "pending";
  }
  const match = loadStoredScheduleEntries()
    .filter((entry) => {
      const sameDate = String(entry.date || "").trim() === String(message?.scheduleInviteDate || "").trim();
      const sameTitle =
        String(entry.title || "").trim() === String(message?.scheduleInviteTitle || "").trim();
      const sameStart =
        String(entry.startTime || "").trim() === String(message?.scheduleInviteStartTime || "").trim();
      const sameEnd =
        String(entry.endTime || "").trim() === String(message?.scheduleInviteEndTime || "").trim();
      const sameType =
        String(entry.scheduleType || "").trim() === String(message?.scheduleInviteType || "").trim();
      return sameDate && sameTitle && sameStart && sameEnd && sameType;
    })
    .sort((left, right) => (right.updatedAt || 0) - (left.updatedAt || 0))[0];
  if (!match) {
    return "pending";
  }
  const decision = String(match.inviteDecisions?.[contactId] || "").trim().toLowerCase();
  if (decision === "accept") {
    return "accepted";
  }
  if (decision === "reject") {
    return "rejected";
  }
  return "pending";
}

function renderConversationScheduleInviteCard(message, conversation) {
  const title = String(message?.scheduleInviteTitle || "").trim() || "未命名日程";
  const timeText = buildScheduleInviteTimeText(
    message?.scheduleInviteDate || "",
    message?.scheduleInviteStartTime || "",
    message?.scheduleInviteEndTime || "",
    message?.scheduleInviteType || "day"
  );
  const inviteStatus = getConversationScheduleInviteStatus(message, conversation);
  const statusLabel =
    inviteStatus === "accepted"
      ? "已接收"
      : inviteStatus === "rejected"
        ? "已拒绝"
        : "等待回复";
  return `
    <article class="messages-schedule-invite-card">
      <div class="messages-schedule-invite-card__head">
        <div class="messages-schedule-invite-card__kicker">日程邀请</div>
        <span class="messages-schedule-invite-card__status messages-schedule-invite-card__status--${inviteStatus}">${escapeHtml(
          statusLabel
        )}</span>
      </div>
      <strong class="messages-schedule-invite-card__title">${escapeHtml(title)}</strong>
      <p class="messages-schedule-invite-card__time">${escapeHtml(timeText)}</p>
    </article>
  `;
}

function renderConversationImageCard(message) {
  const imageDataUrl = String(message?.imageDataUrl || "").trim();
  const description = String(message?.imageDescription || "").trim();
  const isExpanded = state.expandedImageMessageId === String(message?.id || "").trim();
  if (!imageDataUrl) {
    return `
      <article class="messages-image-card messages-image-card--placeholder ${isExpanded ? "is-expanded" : ""}">
        <div class="messages-image-card__placeholder">
          <div class="messages-image-card__placeholder-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect
                x="4.5"
                y="5"
                width="15"
                height="14"
                rx="2.3"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
              />
              <path
                d="m7.2 16 3.1-3.4 2.5 2.6 1.9-2 2.1 2.8M9 9.4h.01"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <strong>照片</strong>
          <span>${description ? (isExpanded ? "点击收起描述" : "点击查看描述") : "暂无描述"}</span>
        </div>
        ${
          description
            ? `
              <div class="messages-image-card__description${isExpanded ? " is-visible" : ""}">
                ${escapeHtml(description)}
              </div>
            `
            : ""
        }
      </article>
    `;
  }
  return `
    <article class="messages-image-card ${isExpanded && description ? "is-expanded" : ""}">
      <img src="${escapeHtml(imageDataUrl)}" alt="聊天图片" decoding="async" />
      ${
        description
          ? `
            <div class="messages-image-card__description${isExpanded ? " is-visible" : ""}">
              ${escapeHtml(description)}
            </div>
          `
          : ""
      }
    </article>
  `;
}

function renderConversationVoiceCard(message, isUser = false) {
  const voiceText = String(message?.voiceText || "").trim();
  const isExpanded = state.expandedVoiceMessageId === String(message?.id || "").trim();
  const durationSeconds = clampNumber(
    Number(message?.voiceDurationSeconds) || estimateVoiceMessageDurationSeconds(voiceText),
    1,
    60
  );
  const width = clampNumber(92 + durationSeconds * 9, 92, 188);
  const waveformMarkup = Array.from({ length: 5 }, (_, index) => {
    const height = [10, 7, 5, 8, 11][index] || 8;
    return `<span style="height:${height}px"></span>`;
  }).join("");
  return `
    <article
      class="messages-voice-card ${isUser ? "messages-voice-card--user" : "messages-voice-card--assistant"}${
        isExpanded ? " is-expanded" : ""
      }"
      style="--voice-card-width:${width}px"
    >
      <div class="messages-voice-card__pill">
        <span class="messages-voice-card__duration">${escapeHtml(
          formatVoiceMessageDurationLabel(durationSeconds)
        )}</span>
        <span class="messages-voice-card__waveform" aria-hidden="true">${waveformMarkup}</span>
      </div>
      ${
        voiceText
          ? `
            <div class="messages-voice-card__transcript${isExpanded ? " is-visible" : ""}">
              ${escapeHtml(voiceText)}
            </div>
          `
          : ""
      }
    </article>
  `;
}

function renderConversationVoiceCallRequestCard(message, conversation) {
  const callMode = getConversationCallModeFromMessage(message);
  const status = normalizeVoiceCallRequestStatus(message?.callRequestStatus);
  const isAssistantRequest = message?.role === "assistant";
  const canRespond =
    isAssistantRequest &&
    status === "pending" &&
    !isConversationVoiceCallActive(conversation);
  const note = String(message?.callRequestMessage || "").trim();
  const shouldShowNote = Boolean(note) && status === "pending";
  const requestAction = callMode === "video" ? "accept-video-call-request" : "accept-voice-call-request";
  const rejectAction = callMode === "video" ? "reject-video-call-request" : "reject-voice-call-request";
  return `
    <article class="messages-call-request-card messages-call-request-card--${escapeHtml(status)}">
      <div class="messages-call-request-card__head">
        <span class="messages-call-request-card__icon" aria-hidden="true">
          ${renderConversationUtilityIcon(getConversationCallModeIcon(callMode))}
        </span>
        <span class="messages-call-request-card__badge">${escapeHtml(getConversationCallModeLabel(callMode))}</span>
        <span class="messages-call-request-card__status">${escapeHtml(
          getVoiceCallRequestStatusLabel(status)
        )}</span>
      </div>
      <strong>${escapeHtml(
        isAssistantRequest
          ? `对方向你发起${getConversationCallModeShortLabel(callMode)}请求`
          : `你发起了${getConversationCallModeShortLabel(callMode)}请求`
      )}</strong>
      ${shouldShowNote ? `<p>${escapeHtml(note)}</p>` : ""}
      ${
        canRespond
          ? `
            <div class="messages-call-request-card__actions">
              <button
                type="button"
                data-action="${requestAction}"
                data-message-id="${escapeHtml(message.id)}"
              >
                接通
              </button>
              <button
                type="button"
                data-action="${rejectAction}"
                data-message-id="${escapeHtml(message.id)}"
              >
                拒绝
              </button>
            </div>
          `
          : ""
      }
    </article>
  `;
}

function getLatestPendingAssistantVoiceCallRequest(conversation) {
  const messages = normalizeObjectArray(conversation?.messages);
  for (let index = messages.length - 1; index >= 0; index -= 1) {
    const message = messages[index];
    if (message?.role !== "assistant") {
      continue;
    }
    if (!isConversationCallRequestMessage(message)) {
      continue;
    }
    if (normalizeVoiceCallRequestStatus(message?.callRequestStatus) !== "pending") {
      continue;
    }
    return message;
  }
  return null;
}

function renderConversationVoiceCallEventCard(message) {
  const callMode = getConversationCallModeFromMessage(message);
  const kind = normalizeVoiceCallEventKind(message?.callEventKind);
  const durationText =
    kind === "ended" ? formatVoiceCallDurationLabel(message?.callEventDurationSeconds || 0) : "";
  return `
    <article class="messages-call-event-card messages-call-event-card--${escapeHtml(kind)}">
      <span class="messages-call-event-card__icon" aria-hidden="true">
        ${renderConversationUtilityIcon(getConversationCallModeIcon(callMode))}
      </span>
      <div>
        <strong>${escapeHtml(`${getConversationCallModeShortLabel(callMode)}${getVoiceCallEventKindLabel(kind)}`)}</strong>
        ${durationText ? `<p>持续时长 ${escapeHtml(durationText)}</p>` : ""}
      </div>
    </article>
  `;
}

function renderConversationCallTranscriptItem(message, conversation) {
  return renderConversationMessage(
    message,
    conversation,
    getConversationPromptSettings(conversation)
  );
}

function getActiveVoiceCallTranscriptMessages(conversation, callState) {
  const startedAt = Number(callState?.startedAt) || 0;
  return (Array.isArray(conversation?.messages) ? conversation.messages : [])
    .filter((message) => (Number(message?.createdAt) || 0) >= Math.max(0, startedAt - 1000))
    .slice(-24);
}

function renderActiveVoiceCallScreen(conversation, options = {}) {
  if (getConversationActiveCallMode(conversation) === "video") {
    return renderActiveVideoCallScreen(conversation, options);
  }
  const renderOptions = options && typeof options === "object" ? options : {};
  const meta = getConversationMeta(conversation);
  const callState = getConversationVoiceCallState(conversation);
  const durationLabel = formatVoiceCallDurationLabel(getVoiceCallDurationSeconds(callState));
  const isReplyBusy = isConversationReplyBusy(conversation.id);
  const isReadonly = state.chatReadonlyMode;
  const hasPendingUserMessages = conversation.messages.some(
    (message) => message.role === "user" && message.needsReply
  );
  const canRequestContinuation =
    !hasPendingUserMessages &&
    conversation.messages.some((message) => message.role === "assistant");
  const draft = getConversationDraft(conversation.id);
  const transcriptMessages = getActiveVoiceCallTranscriptMessages(conversation, callState);
  const transcriptMarkup = transcriptMessages.length
    ? transcriptMessages
        .map((message) => renderConversationCallTranscriptItem(message, conversation))
        .join("")
    : '<div class="messages-call-screen__history-empty">本次通话还没有文字记录。</div>';
  return `
    <section class="messages-call-screen" aria-label="语音通话">
      <div class="messages-call-screen__hero">
        ${buildAvatarMarkup(
          meta.avatarImage,
          meta.avatarText || getContactAvatarFallback({ name: meta.name }),
          "messages-call-screen__avatar"
        )}
        <strong>${escapeHtml(meta.name)}</strong>
        <span>${isReplyBusy ? "正在说话中…" : "正在通话中…"}</span>
        <time id="messages-call-duration" data-started-at="${escapeHtml(String(callState.startedAt || 0))}">
          ${escapeHtml(durationLabel)}
        </time>
      </div>
      <div class="messages-call-screen__history" data-call-history="true">
        ${transcriptMarkup}
      </div>
      <div class="messages-call-screen__footer">
        <form
          class="messages-call-screen__composer"
          data-action="send-conversation-message"
          data-call-mode="voice"
        >
          <input
            class="messages-call-screen__input"
            name="message"
            type="text"
            maxlength="600"
            value="${escapeHtml(draft)}"
            placeholder="${isReadonly ? "数据库不可用，仅只读" : "输入消息…"}"
            autocomplete="off"
            ${isReplyBusy || isReadonly ? "disabled" : ""}
          />
          <button class="messages-call-screen__send" type="submit" ${isReplyBusy || isReadonly ? "disabled" : ""}>
            发送
          </button>
          <button
            class="messages-call-screen__trigger ${
              hasPendingUserMessages || canRequestContinuation ? "is-ready" : ""
            }"
            type="button"
            data-action="request-conversation-reply"
            aria-label="获取语音回复"
            ${
              isReplyBusy || isReadonly || (!hasPendingUserMessages && !canRequestContinuation)
                ? "disabled"
                : ""
            }
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M8 6.5c4.7 0 8.5 3.8 8.5 8.5M8 11c2.2 0 4 1.8 4 4M8 4v5h5"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </form>
        <button
          class="messages-call-screen__hangup"
          type="button"
          data-action="hangup-voice-call"
          aria-label="挂断语音通话"
          ${isReadonly ? "disabled" : ""}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6.8 14.5c3.5-2.2 6.9-2.2 10.4 0l1.1.7c.6.4.8 1.1.5 1.8l-.6 1.2c-.3.7-.9 1-1.7.8-3-.9-6-.9-9 0-.8.2-1.4-.1-1.7-.8L5.2 17c-.3-.7-.1-1.4.5-1.8l1.1-.7Z" fill="currentColor" />
          </svg>
        </button>
      </div>
    </section>
  `;
}

function renderIncomingVoiceCallRequestScreen(conversation, message) {
  const callMode = getConversationCallModeFromMessage(message);
  const note = String(message?.callRequestMessage || "").trim();
  if (callMode === "video") {
    return renderIncomingVideoCallRequestScreen(conversation, message);
  }
  const meta = getConversationMeta(conversation);
  const isReadonly = state.chatReadonlyMode;
  return `
    <section class="messages-call-screen messages-call-screen--incoming" aria-label="来电请求">
      <div class="messages-call-screen__hero messages-call-screen__hero--incoming">
        ${buildAvatarMarkup(
          meta.avatarImage,
          meta.avatarText || getContactAvatarFallback({ name: meta.name }),
          "messages-call-screen__avatar"
        )}
        <strong>${escapeHtml(meta.name)}</strong>
        <span>正在邀请你接通语音通话</span>
        <time>等待接听</time>
      </div>
      <div class="messages-call-screen__incoming-card">
        <span class="messages-call-screen__incoming-badge">语音请求</span>
        <h3>对方向你发起语音请求</h3>
        <p>${escapeHtml(note || "接通后会进入语音通话状态。")}</p>
      </div>
      <div class="messages-call-screen__footer messages-call-screen__footer--incoming">
        <div class="messages-call-screen__incoming-actions">
          <button
            class="messages-call-screen__incoming-button messages-call-screen__incoming-button--reject"
            type="button"
            data-action="reject-voice-call-request"
            data-message-id="${escapeHtml(message.id)}"
            ${isReadonly ? "disabled" : ""}
          >
            拒绝
          </button>
          <button
            class="messages-call-screen__incoming-button messages-call-screen__incoming-button--accept"
            type="button"
            data-action="accept-voice-call-request"
            data-message-id="${escapeHtml(message.id)}"
            ${isReadonly ? "disabled" : ""}
          >
            接通
          </button>
        </div>
      </div>
    </section>
  `;
}

function renderVideoCallPreviewMarkup(image = "", fallbackText = "", className = "") {
  const resolvedImage = String(image || "").trim();
  if (resolvedImage) {
    return `<div class="${escapeHtml(className)}"><img src="${escapeHtml(resolvedImage)}" alt="视频画面" /></div>`;
  }
  return `<div class="${escapeHtml(className)}"><span>${escapeHtml(fallbackText || "图")}</span></div>`;
}

function renderConversationVideoRemoteStageMarkup(conversation, meta = {}) {
  const directVideoImage = getConversationVideoContactImage(conversation);
  if (directVideoImage) {
    return `<div class="messages-call-screen__video-remote"><img src="${escapeHtml(
      directVideoImage
    )}" alt="${escapeHtml(String(meta?.name || "对方"))} 的视频画面" /></div>`;
  }

  const snapshotImage = getConversationSnapshotAvatarImage(conversation);
  if (snapshotImage) {
    return `
      <div class="messages-call-screen__video-remote messages-call-screen__video-remote--snapshot">
        <div class="messages-call-screen__video-remote-bg" aria-hidden="true">
          <img src="${escapeHtml(snapshotImage)}" alt="" />
        </div>
        <div class="messages-call-screen__video-remote-focus-shell">
          <img
            class="messages-call-screen__video-remote-focus"
            src="${escapeHtml(snapshotImage)}"
            alt="${escapeHtml(String(meta?.name || "对方"))} 的视频画面"
          />
        </div>
      </div>
    `;
  }

  return `<div class="messages-call-screen__video-remote messages-call-screen__video-remote--fallback">${buildAvatarMarkup(
    "",
    meta?.avatarText || getContactAvatarFallback({ name: meta?.name || "角色" }),
    "messages-call-screen__video-remote-fallback"
  )}</div>`;
}

function renderActiveVideoCallScreen(conversation, options = {}) {
  const renderOptions = options && typeof options === "object" ? options : {};
  const meta = getConversationMeta(conversation);
  const callState = getConversationVoiceCallState(conversation);
  const durationLabel = formatVoiceCallDurationLabel(getVoiceCallDurationSeconds(callState));
  const isReplyBusy = isConversationReplyBusy(conversation.id);
  const isReadonly = state.chatReadonlyMode;
  const hasPendingUserMessages = conversation.messages.some(
    (message) => message.role === "user" && message.needsReply
  );
  const canRequestContinuation =
    !hasPendingUserMessages &&
    conversation.messages.some((message) => message.role === "assistant");
  const draft = getConversationDraft(conversation.id);
  const transcriptMessages = getActiveVoiceCallTranscriptMessages(conversation, callState);
  const transcriptMarkup = transcriptMessages.length
    ? transcriptMessages
        .map((message) => renderConversationCallTranscriptItem(message, conversation))
        .join("")
    : '<div class="messages-call-screen__history-empty">本次视频还没有文字记录。</div>';
  const localImage = getConversationVideoUserDisplayImage(conversation);
  return `
    <section class="messages-call-screen messages-call-screen--video" aria-label="视频通话">
      <div class="messages-call-screen__video-stage">
        ${renderConversationVideoRemoteStageMarkup(conversation, meta)}
        <div class="messages-call-screen__video-topbar">
          <div class="messages-call-screen__video-info">
            <strong>${escapeHtml(meta.name)}</strong>
            <span>${isReplyBusy ? "视频通话中…" : "视频通话中…"}</span>
            <time id="messages-call-duration" data-started-at="${escapeHtml(String(callState.startedAt || 0))}">
              ${escapeHtml(durationLabel)}
            </time>
          </div>
          ${renderVideoCallPreviewMarkup(
            localImage,
            getProfileAvatarFallback(state.profile),
            "messages-call-screen__video-local"
          )}
        </div>
        <div class="messages-call-screen__history messages-call-screen__history--video" data-call-history="true">
          ${transcriptMarkup}
        </div>
      </div>
      <div class="messages-call-screen__footer messages-call-screen__footer--video">
        <form
          class="messages-call-screen__composer"
          data-action="send-conversation-message"
          data-call-mode="video"
        >
          <input
            class="messages-call-screen__input"
            name="message"
            type="text"
            maxlength="600"
            value="${escapeHtml(draft)}"
            placeholder="${isReadonly ? "数据库不可用，仅只读" : "输入消息…"}"
            autocomplete="off"
            ${isReplyBusy || isReadonly ? "disabled" : ""}
          />
          <button class="messages-call-screen__send" type="submit" ${isReplyBusy || isReadonly ? "disabled" : ""}>
            发送
          </button>
          <button
            class="messages-call-screen__trigger ${
              hasPendingUserMessages || canRequestContinuation ? "is-ready" : ""
            }"
            type="button"
            data-action="request-conversation-reply"
            aria-label="获取视频回复"
            ${
              isReplyBusy || isReadonly || (!hasPendingUserMessages && !canRequestContinuation)
                ? "disabled"
                : ""
            }
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M8 6.5c4.7 0 8.5 3.8 8.5 8.5M8 11c2.2 0 4 1.8 4 4M8 4v5h5"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </form>
        <button
          class="messages-call-screen__hangup"
          type="button"
          data-action="hangup-active-call"
          aria-label="挂断视频通话"
          ${isReadonly ? "disabled" : ""}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6.8 14.5c3.5-2.2 6.9-2.2 10.4 0l1.1.7c.6.4.8 1.1.5 1.8l-.6 1.2c-.3.7-.9 1-1.7.8-3-.9-6-.9-9 0-.8.2-1.4-.1-1.7-.8L5.2 17c-.3-.7-.1-1.4.5-1.8l1.1-.7Z" fill="currentColor" />
          </svg>
        </button>
      </div>
    </section>
  `;
}

function renderIncomingVideoCallRequestScreen(conversation, message) {
  const meta = getConversationMeta(conversation);
  const localImage = getConversationVideoUserDisplayImage(conversation);
  const note = String(message?.callRequestMessage || "").trim();
  const isReadonly = state.chatReadonlyMode;
  return `
    <section class="messages-call-screen messages-call-screen--video messages-call-screen--incoming-video" aria-label="视频来电请求">
      <div class="messages-call-screen__video-stage">
        ${renderConversationVideoRemoteStageMarkup(conversation, meta)}
        <div class="messages-call-screen__video-topbar">
          <div class="messages-call-screen__video-info">
            <strong>${escapeHtml(meta.name)}</strong>
            <span>视频通话邀请…</span>
            <time>等待接听</time>
          </div>
          ${renderVideoCallPreviewMarkup(
            localImage,
            getProfileAvatarFallback(state.profile),
            "messages-call-screen__video-local"
          )}
        </div>
        <div class="messages-call-screen__incoming-card messages-call-screen__incoming-card--video">
          <span class="messages-call-screen__incoming-badge">视频请求</span>
          <h3>对方向你发起视频通话</h3>
          <p>${escapeHtml(note || "接通后会进入视频通话状态。")}</p>
        </div>
      </div>
      <div class="messages-call-screen__footer messages-call-screen__footer--incoming">
        <div class="messages-call-screen__incoming-actions">
          <button
            class="messages-call-screen__incoming-button messages-call-screen__incoming-button--reject"
            type="button"
            data-action="reject-video-call-request"
            data-message-id="${escapeHtml(message.id)}"
            ${isReadonly ? "disabled" : ""}
          >
            拒绝
          </button>
          <button
            class="messages-call-screen__incoming-button messages-call-screen__incoming-button--accept"
            type="button"
            data-action="accept-video-call-request"
            data-message-id="${escapeHtml(message.id)}"
            ${isReadonly ? "disabled" : ""}
          >
            接通
          </button>
        </div>
      </div>
    </section>
  `;
}

function renderConversationDiscussionShareCard(message) {
  const payload = getDiscussionSharePayloadFromMessage(message);
  if (!payload) {
    return `
      <article class="messages-discussion-share-card">
        <div class="messages-discussion-share-card__badge">社媒讨论帖</div>
        <p class="messages-discussion-share-card__summary">这条转发内容暂时无法读取。</p>
      </article>
    `;
  }
  const rootPost = payload.rootPost || {};
  const summaryText = String(
    rootPost.text || rootPost.imageHint || rootPost.repostSource?.text || "点击查看详情"
  ).trim();
  return `
    <article class="messages-discussion-share-card">
      <div class="messages-discussion-share-card__head">
        <span class="messages-discussion-share-card__badge">社媒讨论帖</span>
        <span class="messages-discussion-share-card__meta">${escapeHtml(
          rootPost.time || "外部转发"
        )}</span>
      </div>
      <strong class="messages-discussion-share-card__title">${escapeHtml(
        String(rootPost.displayName || "论坛用户").trim()
      )}</strong>
      <p class="messages-discussion-share-card__summary">${escapeHtml(
        truncate(summaryText || "点击查看详情", 86)
      )}</p>
      <div class="messages-discussion-share-card__footer">
        <span>${escapeHtml(`${payload.replyCount || 0} 条回复`)}</span>
        ${
          rootPost.tags?.length
            ? `<span>${escapeHtml(rootPost.tags.slice(0, 2).join(" "))}</span>`
            : ""
        }
        <span>点击查看详情</span>
      </div>
    </article>
  `;
}

function renderConversationMessage(message, conversation, promptSettings = state.chatPromptSettings) {
  const isUser = message.role === "user";
  const avatarMarkup = buildConversationDetailAvatarMarkup(message.role, conversation, promptSettings);
  const isSelectionMode = isConversationMessageSelectionActive(conversation?.id);
  const isSelected =
    isSelectionMode && getSelectedConversationMessageIdSet().has(String(message?.id || "").trim());
  const isMenuOpen = !isSelectionMode && state.messageActionMessageId === message.id;
  const isDiscussionShareMessage = isDiscussionShareConversationMessage(message);
  const isScheduleInviteMessage = isScheduleInviteConversationMessage(message);
  const isLocationMessage = isLocationConversationMessage(message);
  const isImageMessage = isImageConversationMessage(message);
  const isVoiceMessage = isVoiceConversationMessage(message);
  const isVideoCallRequestMessage = isVideoCallRequestConversationMessage(message);
  const isVoiceCallRequestMessage = isVoiceCallRequestConversationMessage(message);
  const isVideoCallEventMessage = isVideoCallEventConversationMessage(message);
  const isVoiceCallEventMessage = isVoiceCallEventConversationMessage(message);
  const isQuoteMessage = isQuoteConversationMessage(message);
  const bubbleMarkup = isDiscussionShareMessage
    ? renderConversationDiscussionShareCard(message)
    : isScheduleInviteMessage
    ? renderConversationScheduleInviteCard(message, conversation)
    : isLocationMessage
    ? renderConversationLocationCard(message)
    : isImageMessage
    ? renderConversationImageCard(message)
    : isVoiceMessage
    ? renderConversationVoiceCard(message, isUser)
    : isVideoCallRequestMessage
    ? renderConversationVoiceCallRequestCard(message, conversation)
    : isVoiceCallRequestMessage
    ? renderConversationVoiceCallRequestCard(message, conversation)
    : isVideoCallEventMessage
    ? renderConversationVoiceCallEventCard(message)
    : isVoiceCallEventMessage
    ? renderConversationVoiceCallEventCard(message)
    : isQuoteMessage
    ? renderConversationQuoteCard(message, isUser)
    : `
      <article class="messages-bubble ${isUser ? "messages-bubble--user" : "messages-bubble--assistant"}">
        <p>${escapeHtml(message.text)}</p>
      </article>
    `;
  const bubbleControlMarkup = isSelectionMode
    ? `
      <div
        class="messages-message-row__selection-bubble${
          isScheduleInviteMessage
            ? " messages-message-row__selection-bubble--schedule-invite"
            : isLocationMessage
            ? " messages-message-row__selection-bubble--location"
            : ""
        }"
        role="button"
        tabindex="0"
        data-action="toggle-selected-conversation-message"
        data-message-id="${escapeHtml(message.id)}"
        aria-pressed="${isSelected ? "true" : "false"}"
      >
        ${bubbleMarkup}
      </div>
    `
    : isImageMessage
    ? `
      <div class="messages-message-row__stack-shell messages-message-row__stack-shell--image">
        <button
          type="button"
          class="messages-bubble-toggle messages-bubble-toggle--image"
          data-action="toggle-image-description"
          data-message-id="${escapeHtml(message.id)}"
        >
          ${bubbleMarkup}
        </button>
        <button
          type="button"
          class="messages-message-row__menu-toggle"
          data-action="toggle-message-menu"
          data-message-id="${escapeHtml(message.id)}"
          aria-label="打开消息操作"
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    `
    : isVoiceMessage
    ? `
      <div class="messages-message-row__stack-shell messages-message-row__stack-shell--voice">
        <button
          type="button"
          class="messages-bubble-toggle messages-bubble-toggle--voice"
          data-action="toggle-voice-transcript"
          data-message-id="${escapeHtml(message.id)}"
        >
          ${bubbleMarkup}
        </button>
        <button
          type="button"
          class="messages-message-row__menu-toggle"
          data-action="toggle-message-menu"
          data-message-id="${escapeHtml(message.id)}"
          aria-label="打开消息操作"
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    `
    : isVideoCallRequestMessage || isVoiceCallRequestMessage
    ? `
      <div class="messages-message-row__stack-shell messages-message-row__stack-shell--call-request">
        ${bubbleMarkup}
        <button
          type="button"
          class="messages-message-row__menu-toggle"
          data-action="toggle-message-menu"
          data-message-id="${escapeHtml(message.id)}"
          aria-label="打开消息操作"
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    `
    : isDiscussionShareMessage
    ? `
      <div class="messages-message-row__stack-shell messages-message-row__stack-shell--discussion-share">
        <button
          type="button"
          class="messages-bubble-toggle messages-bubble-toggle--discussion-share"
          data-action="open-discussion-share-message"
          data-message-id="${escapeHtml(message.id)}"
        >
          ${bubbleMarkup}
        </button>
        <button
          type="button"
          class="messages-message-row__menu-toggle"
          data-action="toggle-message-menu"
          data-message-id="${escapeHtml(message.id)}"
          aria-label="打开消息操作"
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    `
    : `
      <button
        type="button"
        class="messages-bubble-toggle${
          isScheduleInviteMessage
            ? " messages-bubble-toggle--schedule-invite"
            : isLocationMessage
            ? " messages-bubble-toggle--location"
            : ""
        }"
        data-action="toggle-message-menu"
        data-message-id="${escapeHtml(message.id)}"
      >
        ${bubbleMarkup}
      </button>
    `;
  return `
    <article class="messages-message-row messages-message-row--${isUser ? "user" : "assistant"}${
      avatarMarkup ? "" : " is-avatar-hidden"
    }${isDiscussionShareMessage ? " messages-message-row--discussion-share" : ""}${
      isScheduleInviteMessage ? " messages-message-row--schedule-invite" : ""
    }${
      isLocationMessage ? " messages-message-row--location" : ""
          }${
      isImageMessage ? " messages-message-row--image" : ""
    }${
      isVoiceMessage ? " messages-message-row--voice" : ""
    }${
      isVideoCallRequestMessage || isVoiceCallRequestMessage ? " messages-message-row--call-request" : ""
    }${
      isVideoCallEventMessage || isVoiceCallEventMessage ? " messages-message-row--call-event" : ""
    }${
      isQuoteMessage ? " messages-message-row--quote" : ""
    }${isSelectionMode ? " is-selection-mode" : ""}${isSelected ? " is-selected" : ""}">
      ${!isUser && avatarMarkup ? avatarMarkup : ""}
      ${
        isSelectionMode
          ? `
            <button
              type="button"
              class="messages-message-row__select-toggle ${isSelected ? "is-selected" : ""}"
              data-action="toggle-selected-conversation-message"
              data-message-id="${escapeHtml(message.id)}"
              aria-label="${isSelected ? "取消选中这条消息" : "选中这条消息"}"
              aria-pressed="${isSelected ? "true" : "false"}"
            >
              <span class="messages-message-row__select-dot"></span>
            </button>
          `
          : ""
      }
      <div class="messages-message-row__bubble-wrap${
        isDiscussionShareMessage
          ? " messages-message-row__bubble-wrap--discussion-share"
          : isScheduleInviteMessage
          ? " messages-message-row__bubble-wrap--schedule-invite"
          : isLocationMessage
          ? " messages-message-row__bubble-wrap--location"
          : ""
      }">
        <div class="messages-message-row__stack">
          ${bubbleControlMarkup}
          ${isSelectionMode ? "" : renderConversationMessageMenu(message, isMenuOpen)}
        </div>
      </div>
      ${isUser && avatarMarkup ? avatarMarkup : ""}
    </article>
  `;
}

function buildConversationHistoryWindowMarkup(renderWindow) {
  const hiddenCount = Math.max(0, Number(renderWindow?.hiddenCount) || 0);
  const visibleCount = Math.max(0, Number(renderWindow?.visibleCount) || 0);
  if (!hiddenCount) {
    return "";
  }
  return `
    <div class="messages-conversation__history-window">
      <button
        class="messages-conversation__history-more"
        type="button"
        data-action="load-more-conversation-messages"
      >
        加载更早消息（还有 ${hiddenCount} 条）
      </button>
      <p class="messages-conversation__history-note">
        当前默认仅渲染最近 ${visibleCount} 条气泡，避免长会话卡顿。
      </p>
    </div>
  `;
}

function syncConversationHistoryWindow(historyEl, renderWindow) {
  if (!(historyEl instanceof HTMLElement)) {
    return;
  }
  const hiddenCount = Math.max(0, Number(renderWindow?.hiddenCount) || 0);
  const currentWindow = historyEl.querySelector(".messages-conversation__history-window");
  if (!hiddenCount) {
    currentWindow?.remove();
    return;
  }

  const nextMarkup = buildConversationHistoryWindowMarkup(renderWindow);
  if (!currentWindow) {
    historyEl.insertAdjacentHTML("afterbegin", nextMarkup);
    return;
  }

  currentWindow.outerHTML = nextMarkup;
}

function appendConversationMessageToVisibleHistory(
  message,
  conversation,
  promptSettings = state.chatPromptSettings,
  options = {}
) {
  const messageId = String(message?.id || "").trim();
  const historyEl = messagesContentEl?.querySelector(".messages-conversation__history");
  if (!(historyEl instanceof HTMLElement) || !conversation) {
    return false;
  }
  if (
    message?.role === "assistant" &&
    isConversationCallRequestMessage(message) &&
    normalizeVoiceCallRequestStatus(message?.callRequestStatus) === "pending" &&
    !isConversationVoiceCallActive(conversation)
  ) {
    return false;
  }
  if (
    state.activeTab !== "chat" ||
    String(state.activeConversationId || "").trim() !== String(conversation.id || "").trim()
  ) {
    return false;
  }
  const renderWindow = buildConversationRenderWindow(conversation);
  if (!renderWindow.visibleCount) {
    return false;
  }
  if (
    messageId &&
    [...historyEl.querySelectorAll("[data-message-id]")]
      .some((element) => String(element?.getAttribute?.("data-message-id") || "").trim() === messageId)
  ) {
    return false;
  }
  const renderOptions = options && typeof options === "object" ? options : {};
  const shouldStickToBottom =
    renderOptions.scrollBehavior === "bottom" ||
    (renderOptions.scrollBehavior !== "preserve" && isConversationHistoryNearBottom());
  const emptyEl = historyEl.querySelector(".messages-conversation__empty");
  if (emptyEl) {
    emptyEl.remove();
  }
  syncConversationHistoryWindow(historyEl, renderWindow);
  historyEl.insertAdjacentHTML(
    "beforeend",
    renderConversationMessage(message, conversation, promptSettings)
  );
  const visibleRows = [...historyEl.querySelectorAll(".messages-message-row")];
  const overflowCount = Math.max(0, visibleRows.length - renderWindow.visibleCount);
  if (overflowCount > 0) {
    visibleRows.slice(0, overflowCount).forEach((row) => row.remove());
  }
  window.requestAnimationFrame(() => {
    if (shouldStickToBottom) {
      historyEl.scrollTop = historyEl.scrollHeight;
    }
    bindConversationHistoryPendingImages(historyEl);
  });
  return true;
}

function renderChatList() {
  if (!messagesContentEl) {
    return;
  }

  const conversations = getFilteredConversations();
  if (!conversations.length) {
    messagesContentEl.innerHTML =
      '<div class="messages-empty">当前还没有聊天记录。点击右上角 +，从通讯录中选择人物开始对话。</div>';
    return;
  }

  const brokenConversationIds = [];
  const brokenConversationErrors = [];
  const conversationRows = conversations.reduce((markupList, conversation) => {
    try {
      const conversationName = getConversationSnapshotName(conversation);
      markupList.push(`
        <button
          type="button"
          class="messages-row"
          data-action="open-conversation"
          data-conversation-id="${escapeHtml(conversation.id)}"
          aria-label="${escapeHtml(conversationName)} 的会话"
        >
          <div class="messages-row__avatar">${buildConversationListAvatarMarkup(conversation)}</div>
          <div class="messages-row__body">
            <div class="messages-row__head">
              <strong>${escapeHtml(conversationName)}</strong>
              <span class="messages-row__time">${escapeHtml(getConversationTimeSafe(conversation))}</span>
            </div>
            <div class="messages-row__preview">${escapeHtml(getConversationPreviewSafe(conversation))}</div>
          </div>
        </button>
      `);
    } catch (error) {
      const conversationId = String(conversation?.id || "").trim();
      if (conversationId) {
        brokenConversationIds.push(conversationId);
      }
      brokenConversationErrors.push(String(error?.message || "未知错误"));
      console.error("[Pulse Messages] Failed to render conversation row:", error, conversation);
    }
    return markupList;
  }, []);

  if (!conversationRows.length) {
    const firstError = String(brokenConversationErrors[0] || "").trim();
    setMessagesStatus(
      firstError
        ? `聊天列表读取失败：${firstError}`
        : "聊天列表读取失败，请返回首页后重试。",
      "error"
    );
    messagesContentEl.innerHTML =
      '<div class="messages-empty">聊天列表暂时加载失败。可点击右上角 + 重新发起会话，或返回首页后再进入。</div>';
    return;
  }

  if (brokenConversationIds.length) {
    setMessagesStatus(`已跳过 ${brokenConversationIds.length} 条异常会话。`, "error");
  }

  messagesContentEl.innerHTML = `
    <div class="messages-chat-list">
      ${conversationRows.join("")}
    </div>
  `;
}

function renderConversationDetail(options = {}) {
  if (!messagesContentEl) {
    return;
  }

  syncProfileStateFromStorage();

  const conversation = getConversationById();
  if (!conversation) {
    clearConversationMessageSelection();
    state.activeConversationId = "";
    renderMessagesPage();
    return;
  }

  const isSending = state.sendingConversationId === conversation.id;
  const isReplyBusy = isConversationReplyBusy(conversation.id);
  const isReadonly = state.chatReadonlyMode;
  repairStalePendingUserMessages(conversation, {
    persist: true,
    skipWhenBusy: true
  });
  if (!conversation.messages.length && isConversationMessageSelectionActive(conversation.id)) {
    clearConversationMessageSelection();
  }
  if (isReplyBusy && isConversationMessageSelectionActive(conversation.id)) {
    clearConversationMessageSelection();
  }
  const isSelectionMode = isConversationMessageSelectionActive(conversation.id);
  const selectedMessageIdSet = pruneSelectedConversationMessages(conversation);
  const selectedMessageCount = selectedMessageIdSet.size;
  const hasPendingUserMessages = conversation.messages.some(
    (message) => message.role === "user" && message.needsReply
  );
  const canRequestContinuation =
    !hasPendingUserMessages &&
    conversation.messages.some((message) => message.role === "assistant");
  const promptSettings = syncActiveConversationPromptSettings(conversation);
  const renderOptions = options && typeof options === "object" ? options : {};
  const isVoiceCallActive = isConversationVoiceCallActive(conversation);
  if (isVoiceCallActive) {
    if (isSelectionMode) {
      clearConversationMessageSelection();
    }
    messagesContentEl.innerHTML = renderActiveVoiceCallScreen(conversation, renderOptions);
    syncActiveConversationViewMarker();
    updateVoiceCallDurationDisplay();
    const callHistoryEl = messagesContentEl.querySelector(".messages-call-screen__history");
    window.requestAnimationFrame(() => {
      if (callHistoryEl instanceof HTMLElement) {
        callHistoryEl.scrollTop = callHistoryEl.scrollHeight;
      }
      if (renderOptions.focusInput) {
        focusConversationInput({
          force: true,
          preventScroll: true
        });
      }
    });
    return;
  }
  const incomingVoiceCallRequest = getLatestPendingAssistantVoiceCallRequest(conversation);
  if (incomingVoiceCallRequest) {
    if (isSelectionMode) {
      clearConversationMessageSelection();
    }
    messagesContentEl.innerHTML = renderIncomingVoiceCallRequestScreen(
      conversation,
      incomingVoiceCallRequest
    );
    syncActiveConversationViewMarker();
    return;
  }
  const composerDraft = getConversationDraft(conversation.id);
  const renderWindow = buildConversationRenderWindow(conversation);
  const pendingRevealIds =
    state.pendingAssistantReveal &&
    String(state.pendingAssistantReveal.conversationId || "").trim() === String(conversation.id || "").trim()
      ? new Set(
          normalizeObjectArray(state.pendingAssistantReveal.messages)
            .map((message) => String(message?.id || "").trim())
            .filter(Boolean)
        )
      : null;
  const quotedMessage = getConversationSceneMode(conversation) === "online"
    ? getQuotedConversationMessage(conversation)
    : null;
  const renderedMessages = renderWindow.visibleMessages.reduce((markupList, message) => {
    if (pendingRevealIds?.has(String(message?.id || "").trim())) {
      return markupList;
    }
    try {
      markupList.push(renderConversationMessage(message, conversation, promptSettings));
    } catch (error) {
      console.error("[Pulse Messages] Failed to render conversation message:", error, message);
    }
    return markupList;
  }, []);
  messagesContentEl.innerHTML = `
    <section class="messages-conversation">
      <div class="messages-conversation__history">
        ${buildConversationHistoryWindowMarkup(renderWindow)}
        ${
          renderedMessages.length
            ? renderedMessages.join("")
            : '<div class="messages-conversation__empty">输入第一条消息，开始和这个角色聊天。</div>'
        }
      </div>
      ${renderConversationUtilityPanel()}
      ${
        isSelectionMode
          ? `
            <div class="messages-conversation__selection-bar">
              <div class="messages-conversation__selection-copy">
                <strong>已选 ${selectedMessageCount} 条</strong>
                <span>${selectedMessageCount ? "确认后会从当前会话中彻底删除。" : "点击消息左侧圆圈开始选择。"}</span>
              </div>
              <div class="messages-conversation__selection-actions">
                <button
                  class="messages-conversation__selection-button"
                  type="button"
                  data-action="cancel-message-selection"
                >
                  取消
                </button>
                <button
                  class="messages-conversation__selection-button messages-conversation__selection-button--danger"
                  type="button"
                  data-action="delete-selected-conversation-messages"
                  ${selectedMessageCount && !isReadonly && !isReplyBusy ? "" : "disabled"}
                >
                  删除
                </button>
              </div>
            </div>
          `
          : `
            <form class="messages-conversation__composer" data-action="send-conversation-message">
              ${renderComposerQuotePreview(quotedMessage)}
              <input
                class="messages-conversation__input"
                name="message"
                type="text"
                maxlength="600"
                value="${escapeHtml(composerDraft)}"
                placeholder="${isReadonly ? "数据库不可用，仅只读" : "发消息"}"
                autocomplete="off"
                ${isReadonly ? "disabled" : ""}
              />
              <button class="messages-conversation__send" type="submit" ${isReplyBusy || isReadonly ? "disabled" : ""}>
                发送
              </button>
              <button
                class="messages-conversation__trigger ${
                  hasPendingUserMessages || canRequestContinuation ? "is-ready" : ""
                }"
                type="button"
                data-action="request-conversation-reply"
                aria-label="推送到 API 获取回复或续写"
                ${
                  isReplyBusy || isReadonly || (!hasPendingUserMessages && !canRequestContinuation)
                    ? "disabled"
                    : ""
                }
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M8 6.5c4.7 0 8.5 3.8 8.5 8.5M8 11c2.2 0 4 1.8 4 4M8 4v5h5"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
              <button
                class="messages-conversation__plus ${state.composerPanelOpen ? "is-open" : ""}"
                type="button"
                data-action="toggle-composer-panel"
                aria-label="打开聊天功能栏"
                aria-expanded="${state.composerPanelOpen ? "true" : "false"}"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M12 5v14M5 12h14"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              </button>
            </form>
          `
      }
    </section>
  `;
  syncActiveConversationViewMarker();

  const historyEl = messagesContentEl.querySelector(".messages-conversation__history");
  if (historyEl) {
    window.requestAnimationFrame(() => {
      if (renderOptions.scrollBehavior === "expand-top" && renderOptions.scrollSnapshot) {
        const previousTop = Math.max(0, Number(renderOptions.scrollSnapshot.top) || 0);
        const previousHeight = Math.max(
          0,
          Number(renderOptions.scrollSnapshot.scrollHeight) || 0
        );
        const maxScrollTop = Math.max(0, historyEl.scrollHeight - historyEl.clientHeight);
        const delta = Math.max(0, historyEl.scrollHeight - previousHeight);
        historyEl.scrollTop = Math.min(previousTop + delta, maxScrollTop);
      } else if (renderOptions.scrollBehavior === "preserve" && renderOptions.scrollSnapshot) {
        const maxScrollTop = Math.max(0, historyEl.scrollHeight - historyEl.clientHeight);
        historyEl.scrollTop = Math.min(
          Math.max(0, Number(renderOptions.scrollSnapshot.top) || 0),
          maxScrollTop
        );
      } else {
        historyEl.scrollTop = historyEl.scrollHeight;
      }
      if (renderOptions.focusInput) {
        focusConversationInput({
          force: true,
          preventScroll: true
        });
      }
      bindConversationHistoryPendingImages(historyEl);
    });
  }
}

function buildContactIcon(icon) {
  if (icon === "memory") {
    return `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 6.2h10a2.3 2.3 0 0 1 2.3 2.3v7A2.3 2.3 0 0 1 17 17.8H7a2.3 2.3 0 0 1-2.3-2.3v-7A2.3 2.3 0 0 1 7 6.2Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" />
        <path d="M8.7 10.1h6.6M8.7 13.4h4.3" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
        <path d="M8 4.7v2.2M12 4.7v2.2M16 4.7v2.2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
      </svg>
    `;
  }
  if (icon === "cube") {
    return `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m12 4 7 4-7 4-7-4 7-4Zm7 4v8l-7 4v-8m0 8-7-4V8" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" />
      </svg>
    `;
  }
  if (icon === "star") {
    return `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m12 4 2.5 5 5.5.8-4 3.9.9 5.5-4.9-2.6-4.9 2.6.9-5.5-4-3.9 5.5-.8Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" />
      </svg>
    `;
  }
  if (icon === "image") {
    return `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4.5" y="5.5" width="15" height="13" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.8" />
        <path d="m7.5 15 3.2-3.2 2.7 2.3 2.8-3.1 2.3 4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    `;
  }
  if (icon === "smile") {
    return `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="7.5" fill="none" stroke="currentColor" stroke-width="1.8" />
        <path d="M9 14.5c.9.8 1.9 1.2 3 1.2s2.1-.4 3-1.2M9.3 10.2h.01M14.7 10.2h.01" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
      </svg>
    `;
  }
  return `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 4.8 13.8 3l1.8 1.8 2.6.1.1 2.6L20 9.3l-1.8 1.8.1 2.6-2.6.1L13.8 16 12 14.2 10.2 16l-1.8-1.8-2.6-.1-.1-2.6L4 9.3l1.8-1.8-.1-2.6 2.6-.1L10.2 3ZM12 9.2a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" />
    </svg>
  `;
}

function renderContactsTab() {
  if (!messagesContentEl) {
    return;
  }

  const contacts = getFilteredContacts();
  const contactsMarkup = contacts.length
    ? `
        <section class="messages-contacts-list">
          ${contacts
            .map(
              (contact) => `
                <article
                  class="messages-contact-row"
                  data-action="edit-contact"
                  data-contact-id="${escapeHtml(contact.id)}"
                >
                  ${buildAvatarMarkup(contact.avatarImage, contact.avatarText || getContactAvatarFallback(contact), "messages-contact-row__avatar")}
                  <div class="messages-contact-row__body">
                    <div class="messages-contact-row__head">
                      <strong>${escapeHtml(contact.name)}</strong>
                      <span class="messages-contact-row__arrow">›</span>
                    </div>
                    <div class="messages-contact-row__preview">${escapeHtml(
                      truncate(contact.personaPrompt || "点击编辑这个人物的人设和头像。", 48)
                    )}</div>
                  </div>
                </article>
              `
            )
            .join("")}
        </section>
      `
    : '<div class="messages-empty">还没有联系人。点击右上角 +，先添加一个可对话人物。</div>';

  messagesContentEl.innerHTML = contactsMarkup;
}

function renderMeTab() {
  if (!messagesContentEl) {
    return;
  }

  const profile = state.profile;
  const wechatId = getWechatIdDisplay(profile.userId, profile.username || DEFAULT_PROFILE.username);
  const scopeLabel = getUserPresenceScope() === "per_contact" ? "按角色独立" : "全局共用";
  messagesContentEl.innerHTML = `
    <section class="messages-me-page">
      <button class="messages-me-profile" type="button" data-action="open-profile-editor">
        ${buildAvatarMarkup(profile.avatarImage, getProfileAvatarFallback(profile), "messages-me-profile__avatar")}
        <div class="messages-me-profile__body">
          <strong class="messages-me-profile__name">${escapeHtml(profile.username || DEFAULT_PROFILE.username)}</strong>
          <span class="messages-me-profile__id">微信号：${escapeHtml(wechatId)}</span>
          <span class="messages-me-profile__status">用户状态：${escapeHtml(scopeLabel)}</span>
        </div>
        <div class="messages-me-profile__actions" aria-hidden="true">
          <span class="messages-me-profile__qr">
            <svg viewBox="0 0 24 24">
              <path d="M4 4h6v6H4Zm10 0h6v6h-6ZM4 14h6v6H4Zm11 1h2v2h-2Zm3 0h2v5h-5v-2h3Zm-4 3h2v2h-2Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" />
            </svg>
          </span>
          <span class="messages-me-profile__arrow">›</span>
        </div>
      </button>

      ${CONTACT_ENTRY_GROUPS.map(
        (group) => `
          <section class="messages-me-group">
            ${group
              .map(
                (item) => `
                  <button class="messages-me-entry" type="button" data-action="open-me-entry" data-entry-id="${escapeHtml(
                    item.id
                  )}">
                    <span class="messages-me-entry__icon">${buildContactIcon(item.icon)}</span>
                    <span class="messages-me-entry__label">${escapeHtml(item.label)}</span>
                    <span class="messages-me-entry__arrow">›</span>
                  </button>
                `
              )
              .join("")}
          </section>
        `
      ).join("")}
    </section>
  `;
}

function renderMessagesPage() {
  try {
    renderMessagesPageInner();
  } catch (error) {
    console.error("[Pulse Messages] Render failed:", error);
    if (!state.profileEditorOpen) {
      syncProfileStateFromStorage();
    }
    if (messagesContentEl) {
      messagesContentEl.classList.remove("is-conversation-view");
    }
    try {
      renderTopbar();
      renderSearchSection();
      renderTabbar();
    } catch (_error) {
    }
    if (messagesContentEl) {
      messagesContentEl.innerHTML =
        '<div class="messages-empty">Chat 页面加载失败。你可以点击右上角 + 重新发起会话，或返回首页后再进入。</div>';
    }
    setMessagesStatus(`Chat 页面加载失败：${error?.message || "未知错误"}`, "error");
  }
}

function renderMessagesPageInner() {
  if (!state.profileEditorOpen) {
    syncProfileStateFromStorage();
  }
  const inConversation = Boolean(state.activeConversationId && state.activeTab === "chat");
  const activeConversation = inConversation ? getConversationById(state.activeConversationId) : null;
  if (
    activeConversation &&
    isConversationMessageSelectionActive(activeConversation.id) &&
    (
      !Array.isArray(activeConversation.messages) ||
      !activeConversation.messages.length ||
      isConversationReplyBusy(activeConversation.id) ||
      isConversationVoiceCallActive(activeConversation) ||
      getLatestPendingAssistantVoiceCallRequest(activeConversation)
    )
  ) {
    clearConversationMessageSelection();
  }
  if (!inConversation && state.discussionShareModalOpen) {
    setDiscussionShareModalOpen(false);
  }
  if (messagesContentEl) {
    messagesContentEl.classList.toggle("is-conversation-view", inConversation);
  }
  renderTopbar();
  renderSearchSection();
  renderTabbar();

  if (state.activeConversationId && state.activeTab === "chat") {
    renderConversationDetail(consumeConversationRenderOptions());
    if (state.discussionShareModalOpen) {
      renderDiscussionShareModal();
    }
    return;
  }
  syncActiveConversationViewMarker();

  if (state.activeTab === "chat") {
    renderChatList();
    return;
  }

  if (state.activeTab === "contacts") {
    renderContactsTab();
    return;
  }

  renderMeTab();
}

function setSceneStatus(message = "", tone = "") {
  setEditorStatus(messagesSceneStatusEl, message, tone);
}

function setPlacesStatus(message = "", tone = "") {
  setEditorStatus(messagesPlacesStatusEl, message, tone);
}

function setPlaceEditorStatus(message = "", tone = "") {
  setEditorStatus(messagesPlaceEditorStatusEl, message, tone);
}

function setChatGlobalSettingsStatus(message = "", tone = "") {
  setEditorStatus(messagesChatGlobalSettingsStatusEl, message, tone);
}

function setSceneSyncStatus(message = "", tone = "") {
  setEditorStatus(messagesSceneSyncStatusEl, message, tone);
}

function getConversationSceneMode(conversation = getConversationById()) {
  return conversation?.sceneMode === "offline" ? "offline" : "online";
}

function getConversationAllowAiPresenceUpdate(conversation = getConversationById()) {
  return Boolean(conversation?.allowAiPresenceUpdate);
}

function getConversationAllowAiProactiveMessage(conversation = getConversationById()) {
  return Boolean(conversation?.allowAiProactiveMessage);
}

function getConversationAllowAiAutoSchedule(conversation = getConversationById()) {
  return Boolean(conversation?.allowAiAutoSchedule);
}

function getConversationAutoScheduleDays(conversation = getConversationById()) {
  return normalizeAutoScheduleDays(
    conversation?.autoScheduleDays,
    DEFAULT_AUTO_SCHEDULE_DAYS
  );
}

function getConversationAutoScheduleTime(conversation = getConversationById()) {
  return normalizeAutoScheduleTime(conversation?.autoScheduleTime);
}

function getConversationVideoContactImage(conversation = getConversationById()) {
  return String(getStoredConversationVideoMedia(conversation)?.videoContactImage || "").trim();
}

function getConversationVideoUserImage(conversation = getConversationById()) {
  return String(getStoredConversationVideoMedia(conversation)?.videoUserImage || "").trim();
}

function getConversationVideoContactDisplayImage(conversation = getConversationById()) {
  return (
    getConversationVideoContactImage(conversation) ||
    getConversationSnapshotAvatarImage(conversation)
  );
}

function getConversationVideoUserDisplayImage(conversation = getConversationById()) {
  return getConversationVideoUserImage(conversation) || String(state.profile?.avatarImage || "").trim();
}

function setConversationVideoMediaSettings(contactImage = "", userImage = "") {
  const conversation = getConversationById();
  if (!conversation) {
    return {
      conversationPersisted: false,
      mediaPersisted: false
    };
  }
  const resolvedContactImage = String(contactImage || "").trim();
  const resolvedUserImage = String(userImage || "").trim();
  const contactId = String(conversation.contactId || "").trim();
  const mediaMap = loadConversationVideoMediaMap();
  if (contactId) {
    if (!resolvedContactImage && !resolvedUserImage) {
      delete mediaMap[contactId];
    } else {
      mediaMap[contactId] = {
        videoContactImage: resolvedContactImage,
        videoUserImage: resolvedUserImage
      };
    }
  }
  const mediaPersisted = persistConversationVideoMediaMap(mediaMap);
  const conversationPersisted = persistConversations();
  return {
    conversationPersisted,
    mediaPersisted
  };
}

function renderChatSettingsVideoPreview(previewEl, image = "", fallbackText = "") {
  if (!(previewEl instanceof HTMLElement)) {
    return;
  }
  const resolvedImage = String(image || "").trim();
  if (resolvedImage) {
    previewEl.innerHTML = `<img src="${escapeHtml(resolvedImage)}" alt="视频通话预览图" />`;
    return;
  }
  previewEl.textContent = String(fallbackText || "").trim() || "图";
}

function renderChatSettingsVideoPreviews(conversation = getConversationById()) {
  const meta = conversation ? getConversationMeta(conversation) : null;
  renderChatSettingsVideoPreview(
    messagesChatVideoContactPreviewEl,
    state.chatSettingsVideoContactImage || getConversationSnapshotAvatarImage(conversation),
    meta?.avatarText || getContactAvatarFallback({ name: meta?.name || "角色" })
  );
  renderChatSettingsVideoPreview(
    messagesChatVideoUserPreviewEl,
    state.chatSettingsVideoUserImage || String(state.profile?.avatarImage || "").trim(),
    getProfileAvatarFallback(state.profile)
  );
}

function applySceneModeToButtons(sceneMode = "online") {
  const resolvedMode = sceneMode === "offline" ? "offline" : "online";
  if (messagesSceneOnlineBtnEl) {
    messagesSceneOnlineBtnEl.classList.toggle("is-active", resolvedMode === "online");
  }
  if (messagesSceneOfflineBtnEl) {
    messagesSceneOfflineBtnEl.classList.toggle("is-active", resolvedMode === "offline");
  }
}

function buildCommonPlaceSelectOptionsMarkup(
  places = [],
  selectedId = "",
  options = {}
) {
  const resolvedOptions = options && typeof options === "object" ? options : {};
  const includeEmpty = resolvedOptions.includeEmpty !== false;
  const emptyLabel = String(resolvedOptions.emptyLabel || "未设置地点").trim() || "未设置地点";
  const normalizedPlaces = Array.isArray(places) ? places : [];
  return [
    includeEmpty ? `<option value="">${escapeHtml(emptyLabel)}</option>` : "",
    ...normalizedPlaces.map(
      (place) =>
        `<option value="${escapeHtml(place.id)}"${place.id === selectedId ? " selected" : ""}>${escapeHtml(
          place.name
        )} · ${escapeHtml(getCommonPlaceTypeLabel(place.type))}</option>`
    )
  ]
    .filter(Boolean)
    .join("");
}

function renderCommonPlaceSelect(selectEl, places = [], selectedId = "", options = {}) {
  if (!(selectEl instanceof HTMLSelectElement)) {
    return;
  }
  const resolvedSelectedId = String(selectedId || "").trim();
  selectEl.innerHTML = buildCommonPlaceSelectOptionsMarkup(places, resolvedSelectedId, options);
  selectEl.value = places.some((place) => place.id === resolvedSelectedId) ? resolvedSelectedId : "";
}

function buildSceneDraft(conversation = getConversationById()) {
  const contactId = String(conversation?.contactId || "").trim();
  return {
    sceneMode: getConversationSceneMode(conversation),
    userPresence: getUserPresenceForContact(contactId),
    contactPresence: getContactPresence(contactId)
  };
}

function buildSceneScopeNote() {
  return getUserPresenceScope() === "per_contact"
    ? "当前仅作用于本角色会话"
    : "当前使用全局状态";
}

function updateSceneModalFields(draft = buildSceneDraft()) {
  const resolvedDraft = draft && typeof draft === "object" ? draft : buildSceneDraft();
  const { conversation, contact } = getActiveConversationContext();
  const contactId = String(contact?.id || conversation?.contactId || "").trim();
  const allPlaces = getAllCommonPlaceSelectOptions();
  const visibleContactPlaces = getVisibleCommonPlacesForContact(contactId);

  applySceneModeToButtons(resolvedDraft.sceneMode);
  if (messagesSceneUserScopeNoteEl) {
    messagesSceneUserScopeNoteEl.textContent = buildSceneScopeNote();
  }

  if (messagesSceneUserPresenceTypeInputEl) {
    messagesSceneUserPresenceTypeInputEl.value = resolvedDraft.userPresence.presenceType;
  }
  if (messagesSceneContactPresenceTypeInputEl) {
    messagesSceneContactPresenceTypeInputEl.value = resolvedDraft.contactPresence.presenceType;
  }

  renderCommonPlaceSelect(messagesSceneUserPlaceSelectEl, allPlaces, resolvedDraft.userPresence.placeId, {
    emptyLabel: "未设置地点"
  });
  renderCommonPlaceSelect(
    messagesSceneUserFromPlaceSelectEl,
    allPlaces,
    resolvedDraft.userPresence.fromPlaceId,
    { emptyLabel: "未设置出发地" }
  );
  renderCommonPlaceSelect(messagesSceneUserToPlaceSelectEl, allPlaces, resolvedDraft.userPresence.toPlaceId, {
    emptyLabel: "请选择目的地"
  });

  renderCommonPlaceSelect(
    messagesSceneContactPlaceSelectEl,
    visibleContactPlaces,
    visibleContactPlaces.some((place) => place.id === resolvedDraft.contactPresence.placeId)
      ? resolvedDraft.contactPresence.placeId
      : "",
    { emptyLabel: visibleContactPlaces.length ? "未设置地点" : "暂无可见地点" }
  );
  renderCommonPlaceSelect(
    messagesSceneContactFromPlaceSelectEl,
    visibleContactPlaces,
    visibleContactPlaces.some((place) => place.id === resolvedDraft.contactPresence.fromPlaceId)
      ? resolvedDraft.contactPresence.fromPlaceId
      : "",
    { emptyLabel: visibleContactPlaces.length ? "未设置出发地" : "暂无可见地点" }
  );
  renderCommonPlaceSelect(
    messagesSceneContactToPlaceSelectEl,
    visibleContactPlaces,
    visibleContactPlaces.some((place) => place.id === resolvedDraft.contactPresence.toPlaceId)
      ? resolvedDraft.contactPresence.toPlaceId
      : "",
    { emptyLabel: visibleContactPlaces.length ? "请选择目的地" : "暂无可见地点" }
  );

  const userTransit = resolvedDraft.userPresence.presenceType === "in_transit";
  const contactTransit = resolvedDraft.contactPresence.presenceType === "in_transit";
  if (messagesSceneUserAtPlaceFieldsEl) {
    messagesSceneUserAtPlaceFieldsEl.hidden = userTransit;
  }
  if (messagesSceneUserTransitFieldsEl) {
    messagesSceneUserTransitFieldsEl.hidden = !userTransit;
  }
  if (messagesSceneContactAtPlaceFieldsEl) {
    messagesSceneContactAtPlaceFieldsEl.hidden = contactTransit;
  }
  if (messagesSceneContactTransitFieldsEl) {
    messagesSceneContactTransitFieldsEl.hidden = !contactTransit;
  }

  const syncVisible =
    resolvedDraft.sceneMode === "offline" &&
    resolvedDraft.userPresence.presenceType !== "in_transit" &&
    resolvedDraft.contactPresence.presenceType !== "in_transit";
  if (messagesSceneSyncPlaceBtnEl) {
    messagesSceneSyncPlaceBtnEl.hidden = !syncVisible;
  }

  setSceneStatus(
    resolvedDraft.sceneMode === "offline"
      ? "当前为线下见面状态；可结合地点与在路上状态一起调整面对面交流语境。"
      : "当前为线上聊天状态；地点只作为背景参考，不会自动抢占主话题。",
    "success"
  );
}

function setConversationSceneMode(sceneMode = "online") {
  const conversation = getConversationById();
  if (!conversation) {
    return;
  }
  const resolvedMode = sceneMode === "offline" ? "offline" : "online";
  conversation.sceneMode = resolvedMode;
  if (resolvedMode === "offline") {
    state.quotedMessageId = "";
  }
  persistConversations();
  renderTopbar();
  if (state.sceneModalOpen) {
    updateSceneModalFields(buildSceneDraft(conversation));
  }
  setMessagesStatus(
    resolvedMode === "offline" ? "已切换为线下见面状态。" : "已切换为线上聊天状态。",
    "success"
  );
}

function getCurrentSceneDraft() {
  const userPresenceType =
    String(messagesSceneUserPresenceTypeInputEl?.value || "").trim() === "in_transit"
      ? "in_transit"
      : "at_place";
  const contactPresenceType =
    String(messagesSceneContactPresenceTypeInputEl?.value || "").trim() === "in_transit"
      ? "in_transit"
      : "at_place";
  return {
    sceneMode:
      String(messagesSceneOfflineBtnEl?.classList.contains("is-active") ? "offline" : "online").trim() ===
      "offline"
        ? "offline"
        : "online",
    userPresence: normalizePresenceEntry({
      presenceType: userPresenceType,
      placeId: messagesSceneUserPlaceSelectEl?.value || "",
      fromPlaceId: messagesSceneUserFromPlaceSelectEl?.value || "",
      toPlaceId: messagesSceneUserToPlaceSelectEl?.value || "",
      updatedAt: Date.now()
    }),
    contactPresence: normalizePresenceEntry({
      presenceType: contactPresenceType,
      placeId: messagesSceneContactPlaceSelectEl?.value || "",
      fromPlaceId: messagesSceneContactFromPlaceSelectEl?.value || "",
      toPlaceId: messagesSceneContactToPlaceSelectEl?.value || "",
      updatedAt: Date.now()
    })
  };
}

function validateSceneDraft(draft = getCurrentSceneDraft()) {
  if (draft.userPresence.presenceType === "in_transit" && !draft.userPresence.toPlaceId) {
    throw new Error("用户处于“在路上”时，请至少选择要去哪里。");
  }
  if (draft.contactPresence.presenceType === "in_transit" && !draft.contactPresence.toPlaceId) {
    throw new Error("角色处于“在路上”时，请至少选择要去哪里。");
  }
  return draft;
}

function saveSceneDraft() {
  const { conversation } = getActiveConversationContext();
  if (!conversation) {
    return;
  }
  const draft = validateSceneDraft(getCurrentSceneDraft());
  conversation.sceneMode = draft.sceneMode;
  if (draft.sceneMode === "offline") {
    state.quotedMessageId = "";
  }
  persistConversations();
  setUserPresenceEntry(conversation.contactId, draft.userPresence);
  setContactPresenceEntry(conversation.contactId, draft.contactPresence);
  renderTopbar();
  setSceneStatus("状态已保存。", "success");
  setMessagesStatus("当前会话的场景与地点状态已更新。", "success");
}

function setSceneModalOpen(isOpen) {
  state.sceneModalOpen = Boolean(isOpen);
  if (messagesSceneModalEl) {
    messagesSceneModalEl.hidden = !state.sceneModalOpen;
    messagesSceneModalEl.setAttribute("aria-hidden", String(!state.sceneModalOpen));
  }
  if (state.sceneModalOpen) {
    updateSceneModalFields(buildSceneDraft());
  } else {
    setSceneStatus("");
  }
  updateBodyModalState();
}

function setConversationAllowAiPresenceUpdate(enabled = false) {
  const conversation = getConversationById();
  if (!conversation) {
    return;
  }
  conversation.allowAiPresenceUpdate = Boolean(enabled);
  persistConversations();
}

function setConversationAllowAiProactiveMessage(enabled = false) {
  const conversation = getConversationById();
  if (!conversation) {
    return;
  }
  conversation.allowAiProactiveMessage = Boolean(enabled);
  persistConversations();
}

function setConversationAutoScheduleSettings(
  enabled = false,
  autoScheduleDays = DEFAULT_AUTO_SCHEDULE_DAYS,
  autoScheduleTime = ""
) {
  const conversation = getConversationById();
  if (!conversation) {
    return;
  }
  conversation.allowAiAutoSchedule = Boolean(enabled);
  conversation.autoScheduleDays = normalizeAutoScheduleDays(
    autoScheduleDays,
    DEFAULT_AUTO_SCHEDULE_DAYS
  );
  conversation.autoScheduleTime = normalizeAutoScheduleTime(autoScheduleTime);
  persistConversations();
}

function getFilteredCommonPlaces() {
  const keyword = String(state.placeQuery || "").trim().toLowerCase();
  const filterType = String(state.placeFilterType || "all").trim();
  return state.commonPlaces.filter((place) => {
    const matchesType = filterType === "all" ? true : place.type === filterType;
    const matchesKeyword = keyword ? getCommonPlaceSearchTokens(place).includes(keyword) : true;
    return matchesType && matchesKeyword;
  });
}

function renderPlacesManager() {
  if (!messagesPlacesListEl) {
    return;
  }
  const { conversation } = getActiveConversationContext();
  const places = getFilteredCommonPlaces();
  if (!places.length) {
    messagesPlacesListEl.innerHTML =
      '<div class="messages-places-empty">还没有常用地点。<br />点击右上角 +，先创建一个“自己家”或“公司”。</div>';
    return;
  }

  messagesPlacesListEl.innerHTML = places
    .map((place) => {
      const aliases = buildCommonPlaceAliasList(place);
      const canSetContact = Boolean(conversation?.contactId) && isCommonPlaceVisibleToContact(place, conversation.contactId);
      return `
        <article class="messages-place-card">
          <div class="messages-place-card__head">
            <div class="messages-place-card__title">
              <strong>${escapeHtml(place.name)}</strong>
              <span class="messages-place-card__type">${escapeHtml(getCommonPlaceTypeLabel(place.type))}</span>
            </div>
            <span class="messages-place-card__visibility">${escapeHtml(
              getCommonPlaceVisibilityLabel(place)
            )}</span>
          </div>
          <p class="messages-place-card__traits">${escapeHtml(
            place.traitsText || "还没有填写地点特殊性。"
          )}</p>
          ${
            aliases.length
              ? `
                <div class="messages-place-card__aliases">
                  ${aliases
                    .map((alias) => `<span class="messages-place-card__alias">${escapeHtml(alias)}</span>`)
                    .join("")}
                </div>
              `
              : ""
          }
          <div class="messages-place-card__actions">
            <button
              class="messages-text-button"
              type="button"
              data-action="set-user-current-place"
              data-place-id="${escapeHtml(place.id)}"
            >
              设为我的当前地点
            </button>
            ${
              canSetContact
                ? `
                  <button
                    class="messages-text-button"
                    type="button"
                    data-action="set-contact-current-place"
                    data-place-id="${escapeHtml(place.id)}"
                  >
                    设为 TA 的当前地点
                  </button>
                `
                : ""
            }
            <button
              class="messages-text-button"
              type="button"
              data-action="edit-common-place"
              data-place-id="${escapeHtml(place.id)}"
            >
              编辑
            </button>
            <button
              class="messages-text-button messages-text-button--danger"
              type="button"
              data-action="delete-common-place"
              data-place-id="${escapeHtml(place.id)}"
            >
              删除
            </button>
          </div>
        </article>
      `;
    })
    .join("");
}

function setPlacesManagerOpen(isOpen) {
  state.placesManagerOpen = Boolean(isOpen);
  if (messagesPlacesModalEl) {
    messagesPlacesModalEl.hidden = !state.placesManagerOpen;
    messagesPlacesModalEl.setAttribute("aria-hidden", String(!state.placesManagerOpen));
  }
  if (state.placesManagerOpen) {
    if (messagesPlaceSearchInputEl) {
      messagesPlaceSearchInputEl.value = state.placeQuery;
    }
    if (messagesPlaceFilterSelectEl) {
      messagesPlaceFilterSelectEl.value = state.placeFilterType;
    }
    renderPlacesManager();
    setPlacesStatus("");
  } else {
    setPlacesStatus("");
  }
  updateBodyModalState();
}

function renderPlaceVisibleContactsOptions(selectedIds = []) {
  if (!messagesPlaceVisibleContactsListEl) {
    return;
  }
  if (!state.contacts.length) {
    messagesPlaceVisibleContactsListEl.innerHTML =
      '<div class="messages-worldbook-selector__empty">还没有联系人。先去通讯录创建角色，再回来指定可见范围。</div>';
    return;
  }
  const selectedIdSet = new Set(normalizeMountedIds(selectedIds));
  messagesPlaceVisibleContactsListEl.innerHTML = `
    <div class="messages-worldbook-selector__group">
      <div class="messages-worldbook-selector__items">
        ${state.contacts
          .map(
            (contact) => `
              <label class="messages-worldbook-selector__item">
                <input
                  type="checkbox"
                  value="${escapeHtml(contact.id)}"
                  ${selectedIdSet.has(contact.id) ? "checked" : ""}
                />
                <span>${escapeHtml(contact.name)}</span>
              </label>
            `
          )
          .join("")}
      </div>
    </div>
  `;
}

function applyPlaceEditorToForm(placeId = "") {
  const place = getCommonPlaceById(placeId);
  state.placeEditorId = place?.id || "";
  if (messagesPlaceEditorTitleEl) {
    messagesPlaceEditorTitleEl.textContent = place ? "编辑地点" : "新增地点";
  }
  if (messagesPlaceNameInputEl) {
    messagesPlaceNameInputEl.value = place?.name || "";
  }
  if (messagesPlaceTypeSelectEl) {
    messagesPlaceTypeSelectEl.value = normalizeCommonPlaceType(place?.type || "home");
  }
  if (messagesPlaceAliasesInputEl) {
    messagesPlaceAliasesInputEl.value = normalizeCommonPlaceAliases(place?.aliases || []).join("\n");
  }
  if (messagesPlaceTraitsInputEl) {
    messagesPlaceTraitsInputEl.value = String(place?.traitsText || "").trim();
  }
  if (messagesPlaceVisibilitySelectEl) {
    messagesPlaceVisibilitySelectEl.value = normalizeCommonPlaceVisibilityMode(
      place?.visibilityMode || "self"
    );
  }
  const visibilityMode = normalizeCommonPlaceVisibilityMode(place?.visibilityMode || "self");
  if (messagesPlaceVisibleContactsFieldEl) {
    messagesPlaceVisibleContactsFieldEl.hidden = visibilityMode !== "selected_contacts";
  }
  renderPlaceVisibleContactsOptions(place?.visibleContactIds || []);
  if (messagesPlaceEditorDeleteBtnEl) {
    messagesPlaceEditorDeleteBtnEl.hidden = !place;
  }
  if (messagesPlaceEditorSetContactBtnEl) {
    messagesPlaceEditorSetContactBtnEl.hidden = !getActiveConversationContext().conversation;
  }
  setPlaceEditorStatus("");
}

function setPlaceEditorOpen(isOpen, placeId = "") {
  state.placeEditorOpen = Boolean(isOpen);
  if (messagesPlaceEditorModalEl) {
    messagesPlaceEditorModalEl.hidden = !state.placeEditorOpen;
    messagesPlaceEditorModalEl.setAttribute("aria-hidden", String(!state.placeEditorOpen));
  }
  if (state.placeEditorOpen) {
    applyPlaceEditorToForm(placeId);
  } else {
    state.placeEditorId = "";
    setPlaceEditorStatus("");
  }
  updateBodyModalState();
}

function getCurrentPlaceDraft() {
  const selectedVisibleContactIds = messagesPlaceVisibleContactsListEl
    ? [...messagesPlaceVisibleContactsListEl.querySelectorAll("input[type='checkbox']:checked")]
        .map((input) => (input instanceof HTMLInputElement ? String(input.value || "").trim() : ""))
        .filter(Boolean)
    : [];
  return normalizeCommonPlace({
    id: state.placeEditorId,
    name: messagesPlaceNameInputEl?.value || "",
    type: messagesPlaceTypeSelectEl?.value || "other",
    aliases: messagesPlaceAliasesInputEl?.value || "",
    traitsText: messagesPlaceTraitsInputEl?.value || "",
    visibilityMode: messagesPlaceVisibilitySelectEl?.value || "self",
    visibleContactIds: selectedVisibleContactIds,
    createdAt: getCommonPlaceById(state.placeEditorId)?.createdAt || Date.now(),
    updatedAt: Date.now()
  });
}

function saveCommonPlaceDraft(draft = getCurrentPlaceDraft()) {
  const place = normalizeCommonPlace(draft);
  if (!String(place.name || "").trim()) {
    throw new Error("请输入地点名称。");
  }
  if (
    place.visibilityMode === "selected_contacts" &&
    !normalizeMountedIds(place.visibleContactIds).length
  ) {
    throw new Error("请选择至少一个可见角色。");
  }
  const existingIndex = state.commonPlaces.findIndex((item) => item.id === place.id);
  if (existingIndex >= 0) {
    state.commonPlaces[existingIndex] = {
      ...state.commonPlaces[existingIndex],
      ...place,
      updatedAt: Date.now()
    };
  } else {
    state.commonPlaces = [{ ...place, createdAt: Date.now(), updatedAt: Date.now() }, ...state.commonPlaces];
  }
  state.commonPlaces = state.commonPlaces
    .map((item, index) => normalizeCommonPlace(item, index))
    .sort((left, right) => (right.updatedAt || 0) - (left.updatedAt || 0));
  persistCommonPlaces();
  sanitizePresenceStateReferences();
  persistPresenceState();
  return place;
}

function deleteCommonPlace(placeId = "") {
  const place = getCommonPlaceById(placeId);
  if (!place) {
    return;
  }
  if (!window.confirm(`确定删除常用地点“${place.name}”吗？`)) {
    return;
  }
  state.commonPlaces = state.commonPlaces.filter((item) => item.id !== place.id);
  persistCommonPlaces();
  sanitizePresenceStateReferences();
  persistPresenceState();
  renderPlacesManager();
  updateSceneModalFields(buildSceneDraft());
  setPlacesStatus(`已删除地点“${place.name}”。`, "success");
}

function applyPlaceAsCurrentForUser(placeId = "", contactId = "") {
  if (!getCommonPlaceById(placeId)) {
    return;
  }
  setUserPresenceEntry(contactId, {
    presenceType: "at_place",
    placeId,
    fromPlaceId: "",
    toPlaceId: "",
    updatedAt: Date.now()
  });
}

function applyPlaceAsCurrentForContact(placeId = "", contactId = "") {
  if (!getCommonPlaceById(placeId) || !String(contactId || "").trim()) {
    return;
  }
  setContactPresenceEntry(contactId, {
    presenceType: "at_place",
    placeId,
    fromPlaceId: "",
    toPlaceId: "",
    updatedAt: Date.now()
  });
}

function renderSceneSyncModal() {
  if (!messagesSceneSyncPlaceSelectEl || !messagesSceneSyncDescriptionEl) {
    return;
  }
  const conversation = getConversationById();
  const draft = getCurrentSceneDraft();
  const userPlace = getCommonPlaceById(draft.userPresence.placeId);
  const contactPlace = getCommonPlaceById(draft.contactPresence.placeId);
  const visibleContactPlaces = getVisibleCommonPlacesForContact(conversation?.contactId || "");
  renderCommonPlaceSelect(messagesSceneSyncPlaceSelectEl, visibleContactPlaces, "", {
    emptyLabel: visibleContactPlaces.length ? "请选择共同地点" : "暂无可供角色使用的地点"
  });
  messagesSceneSyncDescriptionEl.textContent =
    userPlace && contactPlace && userPlace.id !== contactPlace.id
      ? `当前用户在“${userPlace.name}”，角色在“${contactPlace.name}”。请选择用谁的地点，或改成新的共同地点。`
      : "请选择一个共同地点，作为这次线下状态下双方共享的场景地点。";
  if (messagesSceneSyncUseUserBtnEl) {
    messagesSceneSyncUseUserBtnEl.hidden = !userPlace;
  }
  if (messagesSceneSyncUseContactBtnEl) {
    messagesSceneSyncUseContactBtnEl.hidden = !contactPlace;
  }
  setSceneSyncStatus("");
}

function setSceneSyncModalOpen(isOpen) {
  state.sceneSyncModalOpen = Boolean(isOpen);
  if (messagesSceneSyncModalEl) {
    messagesSceneSyncModalEl.hidden = !state.sceneSyncModalOpen;
    messagesSceneSyncModalEl.setAttribute("aria-hidden", String(!state.sceneSyncModalOpen));
  }
  if (state.sceneSyncModalOpen) {
    renderSceneSyncModal();
  } else {
    setSceneSyncStatus("");
  }
  updateBodyModalState();
}

function applySharedPlaceToSceneDraft(placeId = "") {
  if (!getCommonPlaceById(placeId)) {
    setSceneSyncStatus("请选择一个有效的共同地点。", "error");
    return;
  }
  if (messagesSceneUserPresenceTypeInputEl) {
    messagesSceneUserPresenceTypeInputEl.value = "at_place";
  }
  if (messagesSceneContactPresenceTypeInputEl) {
    messagesSceneContactPresenceTypeInputEl.value = "at_place";
  }
  if (messagesSceneUserPlaceSelectEl) {
    messagesSceneUserPlaceSelectEl.value = placeId;
  }
  if (messagesSceneContactPlaceSelectEl) {
    messagesSceneContactPlaceSelectEl.value = placeId;
  }
  updateSceneModalFields(getCurrentSceneDraft());
  setSceneSyncModalOpen(false);
  setSceneStatus("已同步为同一地点，记得点击保存。", "success");
}

function triggerSharedPlaceSync() {
  const draft = getCurrentSceneDraft();
  const userPlaceId = String(draft.userPresence.placeId || "").trim();
  const contactPlaceId = String(draft.contactPresence.placeId || "").trim();
  if (draft.sceneMode !== "offline") {
    setSceneStatus("只有在线下模式下才支持同步到同一地点。", "error");
    return;
  }
  if (draft.userPresence.presenceType === "in_transit" || draft.contactPresence.presenceType === "in_transit") {
    setSceneStatus("任意一方处于“在路上”时，不能直接同步到同一地点。", "error");
    return;
  }
  if (userPlaceId && !contactPlaceId) {
    if (messagesSceneContactPlaceSelectEl) {
      messagesSceneContactPlaceSelectEl.value = userPlaceId;
    }
    updateSceneModalFields(getCurrentSceneDraft());
    setSceneStatus("已用用户地点填充角色地点，记得点击保存。", "success");
    return;
  }
  if (!userPlaceId && contactPlaceId) {
    if (messagesSceneUserPlaceSelectEl) {
      messagesSceneUserPlaceSelectEl.value = contactPlaceId;
    }
    updateSceneModalFields(getCurrentSceneDraft());
    setSceneStatus("已用角色地点填充用户地点，记得点击保存。", "success");
    return;
  }
  if (userPlaceId && contactPlaceId && userPlaceId === contactPlaceId) {
    setSceneStatus("双方已经在同一个地点。", "success");
    return;
  }
  setSceneSyncModalOpen(true);
}

function applyChatGlobalSettingsToForm() {
  if (messagesChatUserPresenceScopeInputEl) {
    messagesChatUserPresenceScopeInputEl.value = getUserPresenceScope();
  }
  setChatGlobalSettingsStatus("");
}

function setChatGlobalSettingsOpen(isOpen) {
  state.chatGlobalSettingsOpen = Boolean(isOpen);
  if (messagesChatGlobalSettingsModalEl) {
    messagesChatGlobalSettingsModalEl.hidden = !state.chatGlobalSettingsOpen;
    messagesChatGlobalSettingsModalEl.setAttribute(
      "aria-hidden",
      String(!state.chatGlobalSettingsOpen)
    );
  }
  if (state.chatGlobalSettingsOpen) {
    applyChatGlobalSettingsToForm();
  } else {
    setChatGlobalSettingsStatus("");
  }
  updateBodyModalState();
}

function shouldShowConversationNotification(conversationId = "", createdMessages = []) {
  if (!Array.isArray(createdMessages) || !createdMessages.length) {
    return false;
  }
  const activeView = loadActiveConversationView();
  if (
    activeView.visible &&
    String(activeView.conversationId || "").trim() === String(conversationId || "").trim()
  ) {
    return false;
  }
  return !(
    state.activeTab === "chat" &&
    state.activeConversationId === String(conversationId || "").trim() &&
    !document.hidden
  );
}

function buildConversationNotificationPreview(messages = []) {
  if (!Array.isArray(messages) || !messages.length) {
    return "收到一条新消息";
  }
  const firstText = getConversationMessagePreviewText(messages[0]) || "收到一条新消息";
  return messages.length > 1 ? `${firstText} 等 ${messages.length} 条新消息` : firstText;
}

function pushConversationReplyNotification(contact, conversation, createdMessages = []) {
  if (
    !window.PulseMessageNotifications?.push ||
    !shouldShowConversationNotification(conversation?.id, createdMessages)
  ) {
    return;
  }
  const resolvedContact = contact && typeof contact === "object" ? contact : null;
  const resolvedConversation = conversation && typeof conversation === "object" ? conversation : null;
  window.PulseMessageNotifications.push({
    id: `chat_reply_notice_${resolvedConversation?.id || "conversation"}_${createdMessages[0]?.id || Date.now()}`,
    createdAt: createdMessages[0]?.createdAt || Date.now(),
    name:
      String(resolvedContact?.name || resolvedConversation?.contactNameSnapshot || "新消息").trim() ||
      "新消息",
    preview: buildConversationNotificationPreview(createdMessages),
    avatarImage: String(
      resolvedContact?.avatarImage || resolvedConversation?.contactAvatarImageSnapshot || ""
    ).trim(),
    avatarText:
      String(
        resolvedContact?.avatarText ||
          resolvedConversation?.contactAvatarTextSnapshot ||
          getContactAvatarFallback(resolvedContact || { name: "新消息" })
      ).trim() || "新",
    conversationId: String(resolvedConversation?.id || "").trim()
  });
}

function renderProfileEditorAvatarPreview() {
  if (!messagesProfileAvatarPreviewEl) {
    return;
  }
  const username =
    String(messagesProfileUsernameInputEl?.value || "").trim() ||
    state.profile.username ||
    DEFAULT_PROFILE.username;
  const avatarImage = state.profileEditorAvatarImage || "";
  messagesProfileAvatarPreviewEl.innerHTML = avatarImage
    ? `<img src="${escapeHtml(avatarImage)}" alt="" />`
    : escapeHtml(getProfileAvatarFallback({ ...state.profile, username, avatarImage: "" }));
}

function applyProfileToForm(profile) {
  state.profileEditorAvatarImage = String(profile.avatarImage || "").trim();
  if (messagesProfileUsernameInputEl) {
    messagesProfileUsernameInputEl.value = profile.username || DEFAULT_PROFILE.username;
  }
  if (messagesProfileUserIdInputEl) {
    messagesProfileUserIdInputEl.value = getWechatIdDisplay(
      profile.userId,
      profile.username || DEFAULT_PROFILE.username
    );
  }
  if (messagesProfilePersonaInputEl) {
    messagesProfilePersonaInputEl.value = profile.personaPrompt || DEFAULT_PROFILE.personaPrompt;
  }
  renderProfileEditorAvatarPreview();
  setEditorStatus(messagesProfileEditorStatusEl);
}

function getCurrentProfileDraft() {
  const username =
    String(messagesProfileUsernameInputEl?.value || "").trim() ||
    state.profile.username ||
    DEFAULT_PROFILE.username;
  return {
    ...state.profile,
    avatar:
      String(state.profile.avatar || "").trim() || getProfileAvatarFallback({ ...state.profile, username }),
    username,
    userId: normalizeProfileUserId(
      String(messagesProfileUserIdInputEl?.value || "").trim(),
      username
    ),
    avatarImage: state.profileEditorAvatarImage || "",
    personaPrompt:
      String(messagesProfilePersonaInputEl?.value || "").trim() || DEFAULT_PROFILE.personaPrompt
  };
}

function setProfileEditorOpen(isOpen) {
  state.profileEditorOpen = Boolean(isOpen);
  if (messagesProfileModalEl) {
    messagesProfileModalEl.hidden = !state.profileEditorOpen;
    messagesProfileModalEl.setAttribute("aria-hidden", String(!state.profileEditorOpen));
  }
  if (state.profileEditorOpen) {
    applyProfileToForm(state.profile);
    window.setTimeout(() => {
      messagesProfileUsernameInputEl?.focus();
    }, 0);
  }
  updateBodyModalState();
}

function renderContactEditorAvatarPreview() {
  if (!messagesContactAvatarPreviewEl) {
    return;
  }
  const name =
    String(messagesContactNameInputEl?.value || "").trim() ||
    getContactById(state.contactEditorId)?.name ||
    "联系人";
  const avatarImage = state.contactEditorAvatarImage || "";
  messagesContactAvatarPreviewEl.innerHTML = avatarImage
    ? `<img src="${escapeHtml(avatarImage)}" alt="" />`
    : escapeHtml(getContactAvatarFallback({ name }));
}

function applyContactToForm(contact = null) {
  const resolvedContact = contact || {
    id: "",
    name: "",
    avatarImage: "",
    personaPrompt: "",
    userSpecialPersona: "",
    roleSpecialPersona: "",
    forumFandomEnabled: false,
    forumFandomTabId: "",
    forumFandomTabName: "",
    forumFandomAudience: ""
  };
  state.contactEditorAvatarImage = String(resolvedContact.avatarImage || "").trim();
  if (messagesContactNameInputEl) {
    messagesContactNameInputEl.value = resolvedContact.name || "";
  }
  if (messagesContactPersonaInputEl) {
    messagesContactPersonaInputEl.value = resolvedContact.personaPrompt || "";
  }
  if (messagesContactRoleSpecialPersonaInputEl) {
    messagesContactRoleSpecialPersonaInputEl.value = resolvedContact.roleSpecialPersona || "";
  }
  if (messagesContactUserSpecialPersonaInputEl) {
    messagesContactUserSpecialPersonaInputEl.value = resolvedContact.userSpecialPersona || "";
  }
  if (messagesContactForumFandomEnabledInputEl) {
    messagesContactForumFandomEnabledInputEl.checked = Boolean(resolvedContact.forumFandomEnabled);
  }
  if (messagesContactForumFandomTabNameInputEl) {
    messagesContactForumFandomTabNameInputEl.value = resolvedContact.forumFandomTabName || "";
  }
  if (messagesContactForumFandomAudienceInputEl) {
    messagesContactForumFandomAudienceInputEl.value = resolvedContact.forumFandomAudience || "";
  }
  if (messagesContactModalTitleEl) {
    messagesContactModalTitleEl.textContent = resolvedContact.id ? "编辑联系人" : "新建联系人";
  }
  if (messagesContactDeleteSectionEl) {
    messagesContactDeleteSectionEl.hidden = !resolvedContact.id;
  }
  renderContactEditorAvatarPreview();
  updateContactForumFandomFieldsVisibility();
  setEditorStatus(messagesContactEditorStatusEl);
}

function getCurrentContactDraft() {
  const existingContact = getContactById(state.contactEditorId);
  const name = String(messagesContactNameInputEl?.value || "").trim();
  return {
    id: existingContact?.id || `contact_${Date.now()}_${hashText(name)}`,
    name: name || "未命名联系人",
    avatarImage: state.contactEditorAvatarImage || "",
    avatarText: getContactAvatarFallback({ name }),
    personaPrompt: String(messagesContactPersonaInputEl?.value || "").trim(),
    userSpecialPersona: String(messagesContactUserSpecialPersonaInputEl?.value || "").trim(),
    roleSpecialPersona: String(messagesContactRoleSpecialPersonaInputEl?.value || "").trim(),
    forumFandomEnabled: Boolean(messagesContactForumFandomEnabledInputEl?.checked),
    forumFandomTabId: String(existingContact?.forumFandomTabId || "").trim(),
    forumFandomTabName: String(messagesContactForumFandomTabNameInputEl?.value || "").trim(),
    forumFandomAudience: String(messagesContactForumFandomAudienceInputEl?.value || "").trim(),
    awarenessTitle: resolveAwarenessTitle(
      existingContact?.awarenessTitle,
      existingContact?.awarenessText
    ),
    awarenessText: String(existingContact?.awarenessText || "").trim(),
    awarenessEmotionShift: String(existingContact?.awarenessEmotionShift || "").trim(),
    awarenessSensitivity: normalizeAwarenessSensitivity(existingContact?.awarenessSensitivity),
    awarenessConsumed: Boolean(existingContact?.awarenessConsumed),
    awarenessResolvedState: normalizeAwarenessResolvedState(
      existingContact?.awarenessResolvedState,
      existingContact?.awarenessConsumed
    ),
    awarenessHistoryHidden: Boolean(existingContact?.awarenessHistoryHidden),
    awarenessCheckCount: Math.max(
      0,
      Number.parseInt(String(existingContact?.awarenessCheckCount || 0), 10) || 0
    ),
    awarenessTriggerCount: Math.max(
      0,
      Number.parseInt(String(existingContact?.awarenessTriggerCount || 0), 10) || 0
    ),
    awarenessLastCheckedAt: Number(existingContact?.awarenessLastCheckedAt) || 0,
    awarenessLastTriggeredAt: Number(existingContact?.awarenessLastTriggeredAt) || 0,
    awarenessHistory: normalizeAwarenessHistory(existingContact?.awarenessHistory || []),
    createdAt: existingContact?.createdAt || Date.now(),
    updatedAt: Date.now()
  };
}

function setContactEditorOpen(isOpen, contactId = "") {
  state.contactEditorOpen = Boolean(isOpen);
  state.contactEditorId = isOpen ? String(contactId || "") : "";
  if (messagesContactModalEl) {
    messagesContactModalEl.hidden = !state.contactEditorOpen;
    messagesContactModalEl.setAttribute("aria-hidden", String(!state.contactEditorOpen));
  }
  if (state.contactEditorOpen) {
    applyContactToForm(getContactById(contactId));
    window.setTimeout(() => {
      messagesContactNameInputEl?.focus();
    }, 0);
  }
  updateBodyModalState();
}

function renderConversationPicker() {
  if (!messagesPickerListEl) {
    return;
  }

  if (!state.contacts.length) {
    messagesPickerListEl.innerHTML =
      '<div class="messages-empty">还没有联系人。请先去通讯录创建人物，再回来发起会话。</div>';
    return;
  }

  messagesPickerListEl.innerHTML = state.contacts
    .slice()
    .sort((left, right) => (right.updatedAt || 0) - (left.updatedAt || 0))
    .map(
      (contact) => `
        <button
          class="messages-picker-row"
          type="button"
          data-action="start-conversation"
          data-contact-id="${escapeHtml(contact.id)}"
        >
          ${buildAvatarMarkup(contact.avatarImage, contact.avatarText || getContactAvatarFallback(contact), "messages-picker-row__avatar")}
          <div class="messages-picker-row__body">
            <div class="messages-picker-row__head">
              <strong>${escapeHtml(contact.name)}</strong>
            </div>
            <div class="messages-picker-row__preview">${escapeHtml(
              truncate(contact.personaPrompt || "点击后开始和这个人物对话。", 48)
            )}</div>
          </div>
        </button>
      `
    )
    .join("");
}

function setConversationPickerOpen(isOpen) {
  state.conversationPickerOpen = Boolean(isOpen);
  if (messagesPickerModalEl) {
    messagesPickerModalEl.hidden = !state.conversationPickerOpen;
    messagesPickerModalEl.setAttribute("aria-hidden", String(!state.conversationPickerOpen));
  }
  if (state.conversationPickerOpen) {
    renderConversationPicker();
  }
  updateBodyModalState();
}

function shouldAutoFocusConversationInput() {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return true;
  }
  return !window.matchMedia("(pointer: coarse)").matches;
}

function isCoarsePointerDevice() {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }
  return window.matchMedia("(pointer: coarse)").matches;
}

function getConversationInputElement() {
  const input = messagesContentEl?.querySelector(
    ".messages-conversation__input, .messages-call-screen__input"
  );
  return input instanceof HTMLInputElement ? input : null;
}

function focusConversationInput(options = {}) {
  const focusOptions = options && typeof options === "object" ? options : {};
  if (!focusOptions.force && !shouldAutoFocusConversationInput()) {
    return;
  }
  const input = getConversationInputElement();
  if (!input) {
    return;
  }
  try {
    input.focus({
      preventScroll: focusOptions.preventScroll !== false
    });
  } catch (_error) {
    input.focus();
  }
  try {
    const cursor = input.value.length;
    input.setSelectionRange(cursor, cursor);
  } catch (_error) {
  }
}

function blurConversationInput() {
  const input = getConversationInputElement();
  if (input && document.activeElement === input) {
    input.blur();
  }
}

function shouldDismissConversationKeyboardFromTarget(target) {
  if (!isCoarsePointerDevice()) {
    return false;
  }
  if (!(target instanceof Element)) {
    return false;
  }
  const activeInput = getConversationInputElement();
  if (!activeInput || document.activeElement !== activeInput) {
    return false;
  }
  return !target.closest(".messages-conversation__composer, .messages-call-screen__composer");
}

function primeForegroundRefreshSuppression(durationMs = 1200) {
  state.suppressForegroundRefreshUntil = Math.max(
    Number(state.suppressForegroundRefreshUntil) || 0,
    Date.now() + Math.max(0, Number(durationMs) || 0)
  );
}

function shouldSuppressForegroundRefresh() {
  const activeInput = getConversationInputElement();
  if (activeInput && document.activeElement === activeInput) {
    return true;
  }
  return Date.now() < (Number(state.suppressForegroundRefreshUntil) || 0);
}

function captureConversationScrollSnapshot() {
  const historyEl = messagesContentEl?.querySelector(".messages-conversation__history");
  if (!(historyEl instanceof HTMLElement)) {
    return null;
  }
  return {
    top: historyEl.scrollTop,
    scrollHeight: historyEl.scrollHeight,
    clientHeight: historyEl.clientHeight
  };
}

function isConversationHistoryNearBottom(threshold = 36) {
  const historyEl = messagesContentEl?.querySelector(".messages-conversation__history");
  if (!(historyEl instanceof HTMLElement)) {
    return true;
  }
  const remaining = Math.max(0, historyEl.scrollHeight - historyEl.clientHeight - historyEl.scrollTop);
  return remaining <= Math.max(0, Number(threshold) || 0);
}

function capturePageScrollSnapshot() {
  return {
    x: Math.max(0, Number(window.scrollX ?? window.pageXOffset) || 0),
    y: Math.max(0, Number(window.scrollY ?? window.pageYOffset) || 0)
  };
}

function restorePageScrollSnapshot(snapshot = null) {
  if (!snapshot || typeof snapshot !== "object") {
    return;
  }
  const x = Math.max(0, Number(snapshot.x) || 0);
  const y = Math.max(0, Number(snapshot.y) || 0);
  try {
    window.scrollTo(x, y);
  } catch (_error) {
  }
}

function queueConversationRenderOptions(options = {}) {
  state.pendingConversationRenderOptions = {
    ...(state.pendingConversationRenderOptions || {}),
    ...(options && typeof options === "object" ? options : {})
  };
}

function consumeConversationRenderOptions() {
  const options = state.pendingConversationRenderOptions || {};
  state.pendingConversationRenderOptions = null;
  return options;
}

function setWorldbookStatus(message = "", tone = "") {
  setEditorStatus(messagesWorldbookStatusEl, message, tone);
}

function setWorldbookEditorStatus(message = "", tone = "") {
  setEditorStatus(messagesWorldbookEditorStatusEl, message, tone);
}

function renderWorldbookCategoryOptions(selectedId = "") {
  if (!messagesWorldbookCategorySelectEl) {
    return;
  }
  const options = [
    '<option value="">未分类</option>',
    ...state.worldbooks.categories.map(
      (category) =>
        `<option value="${escapeHtml(category.id)}">${escapeHtml(category.name)}</option>`
    )
  ];
  messagesWorldbookCategorySelectEl.innerHTML = options.join("");
  messagesWorldbookCategorySelectEl.value = state.worldbooks.categories.some(
    (item) => item.id === selectedId
  )
    ? selectedId
    : "";
}

function renderWorldbookMountOptions(selectedIds = []) {
  if (!messagesChatWorldbookListEl) {
    return;
  }
  const validSelectedIds = [...new Set(selectedIds.filter((id) => getWorldbookEntryById(id)))];
  const groups = getWorldbookGroups();

  if (!state.worldbooks.entries.length) {
    messagesChatWorldbookListEl.classList.toggle(
      "is-disabled",
      !Boolean(messagesChatWorldbookInputEl?.checked)
    );
    messagesChatWorldbookListEl.innerHTML =
      '<p class="messages-worldbook-selector__empty">当前还没有世界书。先到“我 → 世界书”中创建一条内容，再回来挂载。</p>';
    return;
  }

  messagesChatWorldbookListEl.classList.toggle(
    "is-disabled",
    !Boolean(messagesChatWorldbookInputEl?.checked)
  );
  messagesChatWorldbookListEl.innerHTML = groups
    .map(
      (group) => `
        <section class="messages-worldbook-selector__group">
          <strong>${escapeHtml(group.name)}</strong>
          <div class="messages-worldbook-selector__items">
            ${group.entries
              .map(
                (entry) => `
                  <label class="messages-worldbook-selector__item">
                    <input
                      type="checkbox"
                      value="${escapeHtml(entry.id)}"
                      ${validSelectedIds.includes(entry.id) ? "checked" : ""}
                      ${messagesChatWorldbookInputEl?.checked ? "" : "disabled"}
                    />
                    <span>${escapeHtml(entry.name)}</span>
                  </label>
                `
              )
              .join("")}
          </div>
        </section>
      `
    )
    .join("");
}

function renderWorldbookManager() {
  if (!messagesWorldbookListEl) {
    return;
  }
  const groups = getWorldbookGroups();
  const hasCategories = state.worldbooks.categories.length > 0;
  const hasEntries = state.worldbooks.entries.length > 0;
  if (!hasCategories && !hasEntries) {
    messagesWorldbookListEl.innerHTML =
      '<div class="messages-worldbook-empty">还没有世界书。<br />点击右上角两个加号，先创建分类或新增一条世界书。</div>';
    return;
  }

  messagesWorldbookListEl.innerHTML = groups
    .map((group) => {
      const isCollapsed = state.worldbookCollapsedGroupIds.includes(group.id);
      return `
        <section class="messages-worldbook-group${isCollapsed ? " is-collapsed" : ""}">
          <button
            class="messages-worldbook-group__header"
            type="button"
            data-action="toggle-worldbook-group"
            data-group-id="${escapeHtml(group.id)}"
          >
            <strong>${escapeHtml(group.name)}</strong>
            <span class="messages-worldbook-group__count">${group.entries.length}</span>
            <span class="messages-worldbook-group__arrow">⌄</span>
          </button>
          <div class="messages-worldbook-group__list">
            ${
              group.entries.length
                ? group.entries
                    .map(
                      (entry) => `
                        <article class="messages-worldbook-item">
                          <button
                            class="messages-worldbook-item__main"
                            type="button"
                            data-action="edit-worldbook-entry"
                            data-entry-id="${escapeHtml(entry.id)}"
                          >
                            <span class="messages-worldbook-item__name">${escapeHtml(entry.name)}</span>
                          </button>
                          <button
                            class="messages-worldbook-item__delete"
                            type="button"
                            data-action="delete-worldbook-entry"
                            data-entry-id="${escapeHtml(entry.id)}"
                            aria-label="删除世界书"
                          >
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                              <path
                                d="M8 7.5h8m-6 3v5m4-5v5M9 4.8h6l.8 1.7H19v2H5v-2h3.2ZM7 8.5h10l-.7 9.2a2 2 0 0 1-2 1.8H9.7a2 2 0 0 1-2-1.8Z"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="1.6"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </button>
                        </article>
                      `
                    )
                    .join("")
                : '<div class="messages-worldbook-empty">这个分类下还没有世界书。</div>'
            }
          </div>
        </section>
      `;
    })
    .join("");
}

function setWorldbookManagerOpen(isOpen) {
  state.worldbookManagerOpen = Boolean(isOpen);
  if (messagesWorldbookModalEl) {
    messagesWorldbookModalEl.hidden = !state.worldbookManagerOpen;
    messagesWorldbookModalEl.setAttribute("aria-hidden", String(!state.worldbookManagerOpen));
  }
  if (state.worldbookManagerOpen) {
    renderWorldbookManager();
    setWorldbookStatus("");
  }
  updateBodyModalState();
}

function applyWorldbookEditorToForm(mode = "entry", entryId = "") {
  state.worldbookEditorMode = mode;
  state.worldbookEditingEntryId = mode === "entry" ? String(entryId || "") : "";
  const entry = getWorldbookEntryById(state.worldbookEditingEntryId);
  const isCategoryMode = mode === "category";

  if (messagesWorldbookEditorTitleEl) {
    messagesWorldbookEditorTitleEl.textContent = isCategoryMode
      ? "新增分类"
      : entry
        ? "编辑世界书"
        : "新增世界书";
  }
  if (messagesWorldbookNameLabelEl) {
    messagesWorldbookNameLabelEl.textContent = isCategoryMode ? "分类名称" : "世界书昵称";
  }
  if (messagesWorldbookNameInputEl) {
    messagesWorldbookNameInputEl.placeholder = isCategoryMode ? "输入分类名称" : "输入世界书昵称";
    messagesWorldbookNameInputEl.value = isCategoryMode ? "" : entry?.name || "";
  }
  if (messagesWorldbookTextInputEl) {
    messagesWorldbookTextInputEl.value = entry?.text || "";
  }
  renderWorldbookCategoryOptions(entry?.categoryId || "");
  if (messagesWorldbookCategoryFieldEl) {
    messagesWorldbookCategoryFieldEl.hidden = isCategoryMode;
  }
  if (messagesWorldbookTextFieldEl) {
    messagesWorldbookTextFieldEl.hidden = isCategoryMode;
  }
  setWorldbookEditorStatus("");
}

function setWorldbookEditorOpen(isOpen, mode = "entry", entryId = "") {
  state.worldbookEditorOpen = Boolean(isOpen);
  if (messagesWorldbookEditorModalEl) {
    messagesWorldbookEditorModalEl.hidden = !state.worldbookEditorOpen;
    messagesWorldbookEditorModalEl.setAttribute("aria-hidden", String(!state.worldbookEditorOpen));
  }
  if (state.worldbookEditorOpen) {
    applyWorldbookEditorToForm(mode, entryId);
    window.setTimeout(() => {
      messagesWorldbookNameInputEl?.focus();
    }, 0);
  } else {
    state.worldbookEditingEntryId = "";
  }
  updateBodyModalState();
}

function toggleWorldbookGroup(groupId = "") {
  const resolvedId = String(groupId || "").trim();
  if (!resolvedId) {
    return;
  }
  if (state.worldbookCollapsedGroupIds.includes(resolvedId)) {
    state.worldbookCollapsedGroupIds = state.worldbookCollapsedGroupIds.filter(
      (item) => item !== resolvedId
    );
  } else {
    state.worldbookCollapsedGroupIds = [...state.worldbookCollapsedGroupIds, resolvedId];
  }
  renderWorldbookManager();
}

function createWorldbookCategory(name) {
  const normalizedName = String(name || "").trim();
  if (!normalizedName) {
    throw new Error("请输入分类名称。");
  }
  const duplicate = state.worldbooks.categories.find((item) => item.name === normalizedName);
  if (duplicate) {
    throw new Error("已存在同名分类。");
  }
  const category = normalizeWorldbookCategory(
    {
      id: `worldbook_category_${Date.now()}_${hashText(normalizedName)}`,
      name: normalizedName,
      createdAt: Date.now(),
      updatedAt: Date.now()
    },
    state.worldbooks.categories.length
  );
  state.worldbooks.categories = [...state.worldbooks.categories, category];
  persistWorldbooks();
  renderWorldbookManager();
  renderWorldbookCategoryOptions();
  renderWorldbookMountOptions(state.chatPromptSettings.worldbookIds || []);
  return category;
}

function saveWorldbookEntry(draft) {
  const normalizedName = String(draft?.name || "").trim();
  const normalizedText = String(draft?.text || "").trim();
  if (!normalizedName) {
    throw new Error("请输入世界书昵称。");
  }
  if (!normalizedText) {
    throw new Error("请输入世界书内容。");
  }
  const categoryId = String(draft?.categoryId || "").trim();
  const existingIndex = state.worldbooks.entries.findIndex((item) => item.id === draft.id);
  const entry = normalizeWorldbookEntry(
    {
      id: existingIndex >= 0 ? draft.id : `worldbook_entry_${Date.now()}_${hashText(normalizedName)}`,
      name: normalizedName,
      text: normalizedText,
      categoryId,
      createdAt:
        existingIndex >= 0
          ? state.worldbooks.entries[existingIndex].createdAt
          : Date.now(),
      updatedAt: Date.now()
    },
    state.worldbooks.categories,
    existingIndex >= 0 ? existingIndex : state.worldbooks.entries.length
  );

  if (existingIndex >= 0) {
    state.worldbooks.entries[existingIndex] = entry;
  } else {
    state.worldbooks.entries = [entry, ...state.worldbooks.entries];
  }
  persistWorldbooks();
  renderWorldbookManager();
  renderWorldbookCategoryOptions(entry.categoryId);
  renderWorldbookMountOptions(state.chatPromptSettings.worldbookIds || []);
  return entry;
}

function deleteWorldbookEntry(entryId = "") {
  const entry = getWorldbookEntryById(entryId);
  if (!entry) {
    return;
  }
  const confirmed = window.confirm(`确定删除世界书“${entry.name}”吗？`);
  if (!confirmed) {
    return;
  }
  state.worldbooks.entries = state.worldbooks.entries.filter((item) => item.id !== entry.id);
  persistWorldbooks();

  let promptSettingsChanged = false;
  state.conversations = state.conversations.map((conversation) => {
    const promptSettings = normalizeConversationPromptSettings(conversation?.promptSettings);
    if (!promptSettings || !promptSettings.worldbookIds.includes(entry.id)) {
      return conversation;
    }
    promptSettingsChanged = true;
    return {
      ...conversation,
      promptSettings: normalizeMessagePromptSettings({
        ...promptSettings,
        worldbookIds: promptSettings.worldbookIds.filter((id) => id !== entry.id)
      })
    };
  });
  if (promptSettingsChanged) {
    persistConversations();
  }
  syncActiveConversationPromptSettings();

  renderWorldbookManager();
  renderWorldbookMountOptions(state.chatPromptSettings.worldbookIds || []);
  setWorldbookStatus("世界书已删除。", "success");
}

function getMemorySortedContacts() {
  return state.contacts
    .slice()
    .sort((left, right) => (right.updatedAt || 0) - (left.updatedAt || 0));
}

function resolveSelectedMemoryContactId(preferredId = "") {
  const contacts = getMemorySortedContacts();
  const preferred = String(preferredId || state.memorySelectedContactId || "").trim();
  const activeConversation = getConversationById();
  const activeContactId =
    state.activeConversationId && activeConversation ? String(activeConversation.contactId || "").trim() : "";
  const resolved =
    contacts.find((item) => item.id === preferred)?.id ||
    contacts.find((item) => item.id === activeContactId)?.id ||
    contacts[0]?.id ||
    "";
  state.memorySelectedContactId = resolved;
  return resolved;
}

function setMemoryStatus(message = "", tone = "") {
  setEditorStatus(messagesMemoryStatusEl, message, tone);
}

function setMemoryEditorStatus(message = "", tone = "") {
  setEditorStatus(messagesMemoryEditorStatusEl, message, tone);
}

function setMemorySettingsStatus(message = "", tone = "") {
  setEditorStatus(messagesMemorySettingsStatusEl, message, tone);
}

function renderMemoryContactOptions(selectedId = state.memorySelectedContactId) {
  if (!messagesMemoryContactSelectEl) {
    return;
  }
  const contacts = getMemorySortedContacts();
  messagesMemoryContactSelectEl.innerHTML = contacts.length
    ? contacts
        .map(
          (contact) =>
            `<option value="${escapeHtml(contact.id)}">${escapeHtml(contact.name)}</option>`
        )
        .join("")
    : '<option value="">暂无可选角色</option>';
  messagesMemoryContactSelectEl.value = contacts.some((item) => item.id === selectedId)
    ? selectedId
    : contacts[0]?.id || "";
}

function renderMemoryEditorContactOptions(selectedId = state.memorySelectedContactId) {
  if (!messagesMemoryEditorContactSelectEl) {
    return;
  }
  const contacts = getMemorySortedContacts();
  messagesMemoryEditorContactSelectEl.innerHTML = contacts.length
    ? contacts
        .map(
          (contact) =>
            `<option value="${escapeHtml(contact.id)}">${escapeHtml(contact.name)}</option>`
        )
        .join("")
    : '<option value="">暂无可选角色</option>';
  messagesMemoryEditorContactSelectEl.value = contacts.some((item) => item.id === selectedId)
    ? selectedId
    : contacts[0]?.id || "";
}

function getMemoryCloudStatusLabel(status = "") {
  const resolved = normalizeCloudMemoryStatus(status);
  return {
    active: "清楚记得",
    faint: "印象变淡",
    dormant: "沉睡记忆",
    archived: "已归档"
  }[resolved] || "清楚记得";
}

function getMemoryCloudTypeLabel(type = "", fallbackType = "") {
  const resolved = String(type || "").trim().toLowerCase();
  if (resolved === "scene") {
    return "情景";
  }
  if (resolved === "relationship") {
    return "关系";
  }
  if (resolved === "preference") {
    return "偏好";
  }
  if (resolved === "fact") {
    return "事实";
  }
  if (resolved === "habit") {
    return "习惯";
  }
  return fallbackType === "scene" ? "情景" : "核心";
}

function formatMemoryCloudScore(value, options = {}) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) {
    return "";
  }
  const maxValue = Number(options.maxValue) || 1;
  const percent = maxValue === 100 ? numeric : numeric * 100;
  return `${Math.round(clampNumber(percent, 0, 100))}%`;
}

function formatMemoryCloudDate(value = "") {
  const timestamp = Number(value) || Date.parse(String(value || ""));
  if (!timestamp) {
    return "";
  }
  return resolveStoredTimestampLabel(timestamp, formatMemoryDate(timestamp));
}

function formatMemoryCloudScoreMap(value = {}) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return "";
  }
  return Object.entries(value)
    .map(([key, score]) => {
      const label = String(key || "").trim();
      const formattedScore = formatMemoryCloudScore(score);
      return label && formattedScore ? `${label} ${formattedScore}` : "";
    })
    .filter(Boolean)
    .slice(0, 6)
    .join("、");
}

function buildMemoryCloudMetaChips(entry = {}) {
  if (!entry?.isCloudMemory) {
    return "";
  }
  const runtimeState = getCloudMemoryRuntimeState(entry);
  const chips = [
    `状态：${getMemoryCloudStatusLabel(entry.cloudStatus)}`,
    `类型：${getMemoryCloudTypeLabel(entry.cloudMemoryType, entry.type)}`,
    entry.confidence == null ? "" : `置信：${formatMemoryCloudScore(entry.confidence)}`,
    runtimeState.activationScore == null
      ? ""
      : `激活：${formatMemoryCloudScore(runtimeState.activationScore)}`,
    runtimeState.stabilityScore == null
      ? ""
      : `稳定：${formatMemoryCloudScore(runtimeState.stabilityScore)}`,
    `强化 ${Math.max(0, Number.parseInt(String(entry.reinforceCount || 0), 10) || 0)}`,
    `回忆 ${Math.max(0, Number.parseInt(String(entry.recallCount || 0), 10) || 0)}`
  ].filter(Boolean);
  if (!chips.length) {
    return "";
  }
  return `
    <div class="messages-memory-card__cloud-chips">
      ${chips
        .map((chip) => `<span class="messages-memory-card__cloud-chip">${escapeHtml(chip)}</span>`)
        .join("")}
    </div>
  `;
}

function buildMemoryCloudDetailRows(entry = {}) {
  if (!entry?.isCloudMemory) {
    return [];
  }
  const runtimeState = getCloudMemoryRuntimeState(entry);
  const metadata = entry.metadata && typeof entry.metadata === "object" ? entry.metadata : {};
  const rows = [
    ["标准记忆", entry.canonicalText],
    ["短摘要", entry.summaryShort],
    ["模糊摘要", entry.summaryFaint],
    ["情绪摘要", entry.emotionSummary],
    ["关键词", Array.isArray(entry.keywords) ? entry.keywords.join("、") : ""],
    ["关联对象", Array.isArray(entry.entityRefs) ? entry.entityRefs.join("、") : ""],
    ["情绪画像", formatMemoryCloudScoreMap(entry.emotionProfile)],
    ["互动倾向", formatMemoryCloudScoreMap(entry.interactionTendency)],
    [
      "情绪强度",
      entry.emotionIntensity == null ? "" : formatMemoryCloudScore(entry.emotionIntensity)
    ],
    ["首次观察", formatMemoryCloudDate(entry.firstObservedAt)],
    ["最近观察", formatMemoryCloudDate(entry.lastObservedAt)],
    ["最近强化", formatMemoryCloudDate(entry.lastReinforcedAt)],
    ["最近回忆", formatMemoryCloudDate(entry.lastRecalledAt)],
    [
      "下次衰减",
      formatMemoryCloudDate(runtimeState.nextDecayAt || runtimeState.next_decay_at || "")
    ],
    ["来源片段", metadata.lastSourceExcerpt || ""],
    ["本地来源", metadata.localMemorySource || ""],
    ["写入理由", metadata.lastReasonNote || ""]
  ];
  return rows
    .map(([label, value]) => [String(label || "").trim(), String(value || "").trim()])
    .filter(([, value]) => value);
}

function buildMemoryCloudDetailsMarkup(entry = {}) {
  const rows = buildMemoryCloudDetailRows(entry);
  if (!rows.length) {
    return "";
  }
  return `
    <details class="messages-memory-card__cloud-details">
      <summary>云端字段</summary>
      <dl class="messages-memory-card__cloud-grid">
        ${rows
          .map(
            ([label, value]) => `
              <div class="messages-memory-card__cloud-row">
                <dt>${escapeHtml(label)}</dt>
                <dd>${escapeHtml(value)}</dd>
              </div>
            `
          )
          .join("")}
      </dl>
    </details>
  `;
}

async function refreshMemoryViewerCloudEntries(contactId = state.memorySelectedContactId) {
  const resolvedContactId = String(contactId || "").trim();
  if (!resolvedContactId) {
    return [];
  }
  const refreshToken = `memory_cloud_refresh_${Date.now()}_${hashText(resolvedContactId)}`;
  state.memoryCloudRefreshToken = refreshToken;
  setMemoryStatus("正在同步云端记忆…");
  try {
    const cloudItems = await ensureCloudMemoriesReady(resolvedContactId, {
      force: true,
      importLocalFallback: true
    });
    if (state.memoryCloudRefreshToken !== refreshToken) {
      return cloudItems;
    }
    const visibleEntries = syncLocalMemoriesFromCloudContact(resolvedContactId, cloudItems);
    if (
      state.memoryViewerOpen &&
      String(state.memorySelectedContactId || "").trim() === resolvedContactId
    ) {
      renderMemoryViewer();
      setMemoryStatus(`已同步 ${visibleEntries.length} 条可展示云端记忆。`, "success");
    }
    return cloudItems;
  } catch (error) {
    if (state.memoryCloudRefreshToken === refreshToken) {
      setMemoryStatus(`云端记忆同步失败：${error?.message || "请求失败"}`, "error");
    }
    return [];
  }
}

function getFilteredMemoryEntries() {
  const contactId = resolveSelectedMemoryContactId();
  if (!contactId) {
    return [];
  }
  const keyword = String(state.memoryQuery || "").trim().toLowerCase();
  return getMemoriesForContact(contactId).filter((item) => {
    if (state.memoryTab !== "all" && item.type !== state.memoryTab) {
      return false;
    }
    if (!keyword) {
      return true;
    }
    return [
      item.content,
      item.canonicalText,
      item.summaryShort,
      item.summaryFaint,
      item.emotionSummary,
      ...(Array.isArray(item.keywords) ? item.keywords : []),
      ...(Array.isArray(item.entityRefs) ? item.entityRefs : [])
    ]
      .map((value) => String(value || "").toLowerCase())
      .some((value) => value.includes(keyword));
  });
}

function renderMemoryViewer() {
  if (!messagesMemoryListEl) {
    return;
  }

  const contacts = getMemorySortedContacts();
  const selectedContactId = resolveSelectedMemoryContactId();
  renderMemoryContactOptions(selectedContactId);
  document.querySelectorAll("[data-memory-tab]").forEach((button) => {
    if (!(button instanceof HTMLElement)) {
      return;
    }
    const isActive = button.dataset.memoryTab === state.memoryTab;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });

  if (!contacts.length) {
    messagesMemoryListEl.innerHTML =
      '<div class="messages-memory-empty">还没有任何角色。<br />请先去通讯录创建联系人，再回来整理记忆。</div>';
    return;
  }

  const entries = getFilteredMemoryEntries();
  if (!entries.length) {
    const selectedContact = getContactById(selectedContactId);
    const emptyText = state.memoryQuery
      ? "没有搜到匹配的记忆内容。"
      : state.memoryTab === "core"
      ? "当前还没有核心记忆。"
      : state.memoryTab === "scene"
      ? "当前还没有情景记忆。"
      : "当前还没有任何记忆。";
    messagesMemoryListEl.innerHTML = `<div class="messages-memory-empty">${
      selectedContact ? `${escapeHtml(selectedContact.name)}：<br />` : ""
    }${emptyText}</div>`;
    return;
  }

  messagesMemoryListEl.innerHTML = entries
    .map(
      (entry) => `
        <article class="messages-memory-card" data-memory-id="${escapeHtml(entry.id)}">
          <div class="messages-memory-card__head">
            <span class="messages-memory-card__badge messages-memory-card__badge--${escapeHtml(
              entry.type
            )}">
              ${entry.type === "core" ? "核心记忆" : "情景记忆"}
            </span>
            <span class="messages-memory-card__date">${escapeHtml(
              formatMemoryDate(entry.updatedAt || entry.createdAt)
            )}</span>
          </div>
          <p class="messages-memory-card__content">${escapeHtml(entry.content)}</p>
          <div class="messages-memory-card__meta">
            <span>重要性：</span>
            <span class="messages-memory-card__stars">${escapeHtml(
              getMemoryStars(entry.importance)
            )}</span>
            <span>(${escapeHtml(`${entry.importance}%`)})</span>
            <span class="messages-memory-card__source">${
              entry.source === "manual" ? "手动添加" : "AI 提取"
            }</span>
          </div>
          ${buildMemoryCloudMetaChips(entry)}
          ${buildMemoryCloudDetailsMarkup(entry)}
          <div class="messages-memory-card__actions">
            <button
              class="messages-memory-card__action"
              type="button"
              data-action="edit-memory-item"
              data-memory-id="${escapeHtml(entry.id)}"
            >
              编辑
            </button>
            <button
              class="messages-memory-card__action"
              type="button"
              data-action="delete-memory-item"
              data-memory-id="${escapeHtml(entry.id)}"
            >
              删除
            </button>
          </div>
        </article>
      `
    )
    .join("");
}

function applyMemoryEditorToForm(preferredContactId = state.memorySelectedContactId) {
  const editingEntry = getMemoryEntryById(state.memoryEditingId);
  const selectedContactId = resolveSelectedMemoryContactId(
    editingEntry?.contactId || preferredContactId
  );
  renderMemoryEditorContactOptions(selectedContactId);
  if (messagesMemoryEditorTitleEl) {
    messagesMemoryEditorTitleEl.textContent = editingEntry ? "编辑记忆" : "新增核心记忆";
  }
  if (messagesMemoryEditorSaveBtnEl) {
    messagesMemoryEditorSaveBtnEl.textContent = editingEntry ? "保存修改" : "保存";
  }
  if (messagesMemoryEditorContactSelectEl) {
    messagesMemoryEditorContactSelectEl.disabled = Boolean(editingEntry);
  }
  if (messagesMemoryEditorContentInputEl) {
    messagesMemoryEditorContentInputEl.value = editingEntry ? String(editingEntry.content || "") : "";
  }
  if (messagesMemoryEditorImportanceInputEl) {
    messagesMemoryEditorImportanceInputEl.value = String(
      editingEntry?.importance || DEFAULT_CORE_MEMORY_THRESHOLD
    );
  }
  setMemoryEditorStatus("");
}

function setMemoryViewerOpen(isOpen, preferredContactId = "") {
  state.memoryViewerOpen = Boolean(isOpen);
  if (messagesMemoryModalEl) {
    messagesMemoryModalEl.hidden = !state.memoryViewerOpen;
    messagesMemoryModalEl.setAttribute("aria-hidden", String(!state.memoryViewerOpen));
  }
  if (state.memoryViewerOpen) {
    syncPrunedMemoriesInState(loadSettings().messagePromptSettings);
    state.memoryTab = "all";
    state.memoryQuery = "";
    if (messagesMemorySearchInputEl) {
      messagesMemorySearchInputEl.value = "";
    }
    const selectedContactId = resolveSelectedMemoryContactId(preferredContactId);
    renderMemoryViewer();
    setMemoryStatus("");
    void refreshMemoryViewerCloudEntries(selectedContactId);
  } else {
    setMemoryEditorOpen(false);
    setMemorySettingsOpen(false);
  }
  updateBodyModalState();
}

function setMemoryEditorOpen(
  isOpen,
  preferredContactId = state.memorySelectedContactId,
  memoryId = ""
) {
  state.memoryEditorOpen = Boolean(isOpen);
  state.memoryEditingId = state.memoryEditorOpen ? String(memoryId || "").trim() : "";
  if (messagesMemoryEditorModalEl) {
    messagesMemoryEditorModalEl.hidden = !state.memoryEditorOpen;
    messagesMemoryEditorModalEl.setAttribute("aria-hidden", String(!state.memoryEditorOpen));
  }
  if (state.memoryEditorOpen) {
    applyMemoryEditorToForm(preferredContactId);
    window.setTimeout(() => {
      messagesMemoryEditorContentInputEl?.focus();
    }, 0);
  } else {
    setMemoryEditorStatus("");
  }
  updateBodyModalState();
}

function applyMemorySettingsToForm(promptSettings = state.chatPromptSettings) {
  const resolved = normalizeMessagePromptSettings(promptSettings);
  if (messagesMemorySummaryIntervalInputEl) {
    messagesMemorySummaryIntervalInputEl.value = String(resolved.memorySummaryIntervalRounds);
  }
  if (messagesMemoryCoreThresholdInputEl) {
    messagesMemoryCoreThresholdInputEl.value = String(resolved.coreMemoryThreshold);
  }
  if (messagesMemorySceneThresholdInputEl) {
    messagesMemorySceneThresholdInputEl.value = String(resolved.sceneMemoryThreshold);
  }
  setMemorySettingsStatus("");
}

function setMemorySettingsOpen(isOpen) {
  state.memorySettingsOpen = Boolean(isOpen);
  if (messagesMemorySettingsModalEl) {
    messagesMemorySettingsModalEl.hidden = !state.memorySettingsOpen;
    messagesMemorySettingsModalEl.setAttribute("aria-hidden", String(!state.memorySettingsOpen));
  }
  if (state.memorySettingsOpen) {
    applyMemorySettingsToForm(loadSettings().messagePromptSettings);
    window.setTimeout(() => {
      messagesMemorySummaryIntervalInputEl?.focus();
    }, 0);
  } else {
    setMemorySettingsStatus("");
  }
  updateBodyModalState();
}

function saveManualCoreMemory(draft = {}) {
  const contactId = String(draft.contactId || "").trim();
  const content = String(draft.content || "").trim();
  if (!contactId || !getContactById(contactId)) {
    throw new Error("请先选择一个角色。");
  }
  if (!content) {
    throw new Error("请输入记忆内容。");
  }

  const entry = normalizeMessageMemory({
    id: `message_memory_${Date.now()}_${hashText(`${contactId}-${content}`)}`,
    contactId,
    type: "core",
    content,
    importance: draft.importance,
    source: "manual",
    createdAt: Date.now(),
    updatedAt: Date.now()
  });
  state.memories = mergeMemories(state.memories, [entry]);
  persistMessageMemories();
  void syncLocalMemoryEntryToCloud(entry, {
    reasonCode: "manual_memory_create"
  });
  resolveSelectedMemoryContactId(contactId);
  renderMemoryViewer();
  return entry;
}

function saveMemoryEntryDraft(draft = {}) {
  const editingEntry = getMemoryEntryById(draft.id);
  if (!editingEntry) {
    return saveManualCoreMemory(draft);
  }

  const contactId = String(editingEntry.contactId || "").trim();
  const content = String(draft.content || "").trim();
  if (!contactId || !getContactById(contactId)) {
    throw new Error("当前记忆关联的角色不存在。");
  }
  if (!content) {
    throw new Error("请输入记忆内容。");
  }

  const updatedEntry = normalizeMessageMemory({
    ...editingEntry,
    contactId,
    content,
    importance: draft.importance,
    updatedAt: Date.now()
  });
  const remainingMemories = state.memories.filter((item) => item.id !== editingEntry.id);
  state.memories = mergeMemories(remainingMemories, [updatedEntry]);
  persistMessageMemories();
  void syncLocalMemoryEntryToCloud(updatedEntry, {
    reasonCode: "manual_memory_edit"
  });
  resolveSelectedMemoryContactId(contactId);
  renderMemoryViewer();
  return updatedEntry;
}

function deleteMemoryEntry(memoryId = "") {
  const entry = getMemoryEntryById(memoryId);
  if (!entry) {
    return null;
  }
  state.memories = state.memories.filter((item) => item.id !== entry.id);
  persistMessageMemories();
  void archiveLocalMemoryInCloud(entry, {
    reasonCode: "manual_memory_delete"
  });
  if (state.memoryEditingId === entry.id) {
    state.memoryEditingId = "";
    if (state.memoryEditorOpen) {
      setMemoryEditorOpen(false);
    }
  }
  resolveSelectedMemoryContactId(entry.contactId);
  renderMemoryViewer();
  return entry;
}

function applyChatPromptSettingsToForm(promptSettings) {
  const resolved = normalizeMessagePromptSettings(promptSettings);
  const conversation = getConversationById();
  state.chatSettingsVideoContactImage = conversation
    ? getConversationVideoContactImage(conversation)
    : "";
  state.chatSettingsVideoUserImage = conversation ? getConversationVideoUserImage(conversation) : "";
  if (messagesChatHistoryRoundsInputEl) {
    messagesChatHistoryRoundsInputEl.value = String(resolved.historyRounds);
  }
  if (messagesChatReplySentenceLimitInputEl) {
    messagesChatReplySentenceLimitInputEl.value = String(resolved.replySentenceLimit);
  }
  if (messagesChatAwarenessRoundsInputEl) {
    messagesChatAwarenessRoundsInputEl.value = String(resolved.awarenessIntervalRounds);
  }
  if (messagesChatTimeAwarenessInputEl) {
    messagesChatTimeAwarenessInputEl.checked = resolved.timeAwareness;
  }
  if (messagesChatScheduleWindowInputEl) {
    messagesChatScheduleWindowInputEl.value = String(resolved.scheduleAwarenessWindowMinutes);
  }
  if (messagesChatHotTopicsInputEl) {
    messagesChatHotTopicsInputEl.checked = resolved.hotTopicsEnabled;
  }
  if (messagesChatHotTopicsTextInputEl) {
    messagesChatHotTopicsTextInputEl.checked = resolved.hotTopicsIncludeDiscussionText;
  }
  if (messagesChatHotTopicsTopicInputEl) {
    messagesChatHotTopicsTopicInputEl.checked = resolved.hotTopicsIncludeHotTopic;
  }
  if (messagesChatWorldbookInputEl) {
    messagesChatWorldbookInputEl.checked = resolved.worldbookEnabled;
  }
  if (messagesChatProfilePostFocusInputEl) {
    messagesChatProfilePostFocusInputEl.checked = resolved.forumPostFocusEnabled;
  }
  if (messagesChatBubbleFocusInputEl) {
    messagesChatBubbleFocusInputEl.checked = resolved.bubbleFocusEnabled;
  }
  if (messagesChatBubbleFocusMinutesInputEl) {
    messagesChatBubbleFocusMinutesInputEl.value = String(resolved.bubbleFocusMinutes);
  }
  if (messagesChatShowContactAvatarInputEl) {
    messagesChatShowContactAvatarInputEl.checked = resolved.showContactAvatar;
  }
  if (messagesChatShowUserAvatarInputEl) {
    messagesChatShowUserAvatarInputEl.checked = resolved.showUserAvatar;
  }
  if (messagesChatAllowAiPresenceUpdateInputEl) {
    messagesChatAllowAiPresenceUpdateInputEl.checked = getConversationAllowAiPresenceUpdate();
    messagesChatAllowAiPresenceUpdateInputEl.disabled = !Boolean(getConversationById());
  }
  if (messagesChatAllowAiProactiveMessageInputEl) {
    messagesChatAllowAiProactiveMessageInputEl.checked = getConversationAllowAiProactiveMessage();
    messagesChatAllowAiProactiveMessageInputEl.disabled = !Boolean(getConversationById());
  }
  if (messagesChatAllowAiAutoScheduleInputEl) {
    messagesChatAllowAiAutoScheduleInputEl.checked = getConversationAllowAiAutoSchedule();
    messagesChatAllowAiAutoScheduleInputEl.disabled = !Boolean(getConversationById());
  }
  renderChatSettingsVideoPreviews(conversation);
  if (messagesChatAutoScheduleDaysInputEl) {
    messagesChatAutoScheduleDaysInputEl.value = String(getConversationAutoScheduleDays());
    messagesChatAutoScheduleDaysInputEl.disabled = !Boolean(getConversationById());
  }
  if (messagesChatAutoScheduleTimeInputEl) {
    messagesChatAutoScheduleTimeInputEl.value = String(getConversationAutoScheduleTime() || "");
    messagesChatAutoScheduleTimeInputEl.disabled = !Boolean(getConversationById());
  }
  if (messagesChatAutoScheduleGenerateBtnEl) {
    messagesChatAutoScheduleGenerateBtnEl.disabled = !Boolean(getConversationById());
  }
  renderHotTopicsTabOptions(resolved.hotTopicsTabId);
  renderWorldbookMountOptions(resolved.worldbookIds);
  updateChatSettingsFormState();
  updateChatHotTopicsWarning(resolved);
  setEditorStatus(messagesChatSettingsStatusEl);
}

function renderHotTopicsTabOptions(selectedId = "") {
  if (!messagesChatHotTopicsTabSelectEl) {
    return;
  }
  const tabs = getAvailableCustomTabs(loadSettings());
  if (!tabs.length) {
    messagesChatHotTopicsTabSelectEl.innerHTML = '<option value="">暂无论坛自定义页签</option>';
    messagesChatHotTopicsTabSelectEl.value = "";
    return;
  }

  messagesChatHotTopicsTabSelectEl.innerHTML = [
    '<option value="">请选择论坛自定义页签</option>',
    ...tabs.map(
      (tab) => `<option value="${escapeHtml(tab.id)}">${escapeHtml(tab.name)}</option>`
    )
  ].join("");
  messagesChatHotTopicsTabSelectEl.value = tabs.some((tab) => tab.id === selectedId)
    ? selectedId
    : "";
}

function updateChatSettingsFormState() {
  if (!messagesChatHotTopicsTabSelectEl) {
    return;
  }
  messagesChatHotTopicsTabSelectEl.disabled = !Boolean(messagesChatHotTopicsInputEl?.checked);
  [messagesChatHotTopicsTextInputEl, messagesChatHotTopicsTopicInputEl].forEach((input) => {
    if (input instanceof HTMLInputElement) {
      input.disabled = !Boolean(messagesChatHotTopicsInputEl?.checked);
    }
  });
  if (messagesChatWorldbookListEl) {
    messagesChatWorldbookListEl
      .querySelectorAll("input[type='checkbox']")
      .forEach((input) => {
        if (input instanceof HTMLInputElement) {
          input.disabled = !Boolean(messagesChatWorldbookInputEl?.checked);
        }
      });
  }
  messagesChatWorldbookListEl?.classList.toggle(
    "is-disabled",
    !Boolean(messagesChatWorldbookInputEl?.checked)
  );
  if (messagesChatBubbleFocusMinutesInputEl) {
    messagesChatBubbleFocusMinutesInputEl.disabled = !Boolean(messagesChatBubbleFocusInputEl?.checked);
  }
}

function updateChatHotTopicsWarning(promptSettings = getCurrentChatPromptSettingsDraft()) {
  if (!messagesChatHotTopicsWarningEl) {
    return;
  }
  const diagnostics = getHotTopicsMountDiagnostics(loadSettings(), promptSettings);
  messagesChatHotTopicsWarningEl.textContent = diagnostics.warnings[0] || "";
}

function getCurrentChatPromptSettingsDraft() {
  const tabs = getAvailableCustomTabs(loadSettings());
  const selectedTabId = String(messagesChatHotTopicsTabSelectEl?.value || "").trim();
  const currentSettings = getConversationPromptSettings();
  const selectedWorldbookIds = messagesChatWorldbookListEl
    ? [...messagesChatWorldbookListEl.querySelectorAll("input[type='checkbox']:checked")]
        .map((input) =>
          input instanceof HTMLInputElement ? String(input.value || "").trim() : ""
        )
        .filter((id) => getWorldbookEntryById(id))
    : [];
  return normalizeMessagePromptSettings({
    historyRounds: messagesChatHistoryRoundsInputEl?.value,
    replySentenceLimit: messagesChatReplySentenceLimitInputEl?.value,
    journalLength: currentSettings.journalLength,
    awarenessIntervalRounds: messagesChatAwarenessRoundsInputEl?.value,
    memorySummaryIntervalRounds: currentSettings.memorySummaryIntervalRounds,
    coreMemoryThreshold: currentSettings.coreMemoryThreshold,
    sceneMemoryThreshold: currentSettings.sceneMemoryThreshold,
    timeAwareness: Boolean(messagesChatTimeAwarenessInputEl?.checked),
    scheduleAwarenessWindowMinutes: messagesChatScheduleWindowInputEl?.value,
    hotTopicsEnabled: Boolean(messagesChatHotTopicsInputEl?.checked),
    hotTopicsTabId: tabs.some((tab) => tab.id === selectedTabId) ? selectedTabId : "",
    hotTopicsIncludeDiscussionText: Boolean(messagesChatHotTopicsTextInputEl?.checked),
    hotTopicsIncludeHotTopic: Boolean(messagesChatHotTopicsTopicInputEl?.checked),
    worldbookEnabled: Boolean(messagesChatWorldbookInputEl?.checked),
    worldbookIds: selectedWorldbookIds,
    forumPostFocusEnabled: Boolean(messagesChatProfilePostFocusInputEl?.checked),
    bubbleFocusEnabled: Boolean(messagesChatBubbleFocusInputEl?.checked),
    bubbleFocusMinutes: messagesChatBubbleFocusMinutesInputEl?.value,
    sceneMode: currentSettings.sceneMode,
    showContactAvatar: Boolean(messagesChatShowContactAvatarInputEl?.checked),
    showUserAvatar: Boolean(messagesChatShowUserAvatarInputEl?.checked)
  });
}

function createAutoScheduleRequestDraft() {
  const promptSettings = state.chatSettingsOpen
    ? getCurrentChatPromptSettingsDraft()
    : getConversationPromptSettings();
  return {
    worldbookIds: normalizeWorldbookSelectionIds(
      promptSettings.worldbookEnabled ? promptSettings.worldbookIds : []
    ),
    note: ""
  };
}

function renderAutoScheduleRequestWorldbookOptions(selectedIds = []) {
  if (!messagesChatAutoScheduleWorldbookListEl) {
    return;
  }
  const validSelectedIds = normalizeWorldbookSelectionIds(selectedIds);
  const groups = getWorldbookGroups();
  if (!state.worldbooks.entries.length) {
    messagesChatAutoScheduleWorldbookListEl.innerHTML =
      '<p class="messages-worldbook-selector__empty">当前还没有世界书。你也可以只填写附加要求来生成行程。</p>';
    return;
  }

  messagesChatAutoScheduleWorldbookListEl.innerHTML = groups
    .map(
      (group) => `
        <section class="messages-worldbook-selector__group">
          <strong>${escapeHtml(group.name)}</strong>
          <div class="messages-worldbook-selector__items">
            ${group.entries
              .map(
                (entry) => `
                  <label class="messages-worldbook-selector__item">
                    <input
                      type="checkbox"
                      value="${escapeHtml(entry.id)}"
                      ${validSelectedIds.includes(entry.id) ? "checked" : ""}
                    />
                    <span>${escapeHtml(entry.name)}</span>
                  </label>
                `
              )
              .join("")}
          </div>
        </section>
      `
    )
    .join("");
}

function renderAutoScheduleRequestModal() {
  renderAutoScheduleRequestWorldbookOptions(state.autoScheduleRequestDraft.worldbookIds || []);
  if (messagesChatAutoScheduleNoteInputEl) {
    messagesChatAutoScheduleNoteInputEl.value = String(state.autoScheduleRequestDraft.note || "");
  }
  setEditorStatus(messagesChatAutoScheduleStatusEl);
}

function collectAutoScheduleRequestDraft() {
  return {
    worldbookIds: messagesChatAutoScheduleWorldbookListEl
      ? [...messagesChatAutoScheduleWorldbookListEl.querySelectorAll("input[type='checkbox']:checked")]
          .map((input) =>
            input instanceof HTMLInputElement ? String(input.value || "").trim() : ""
          )
          .filter((id) => getWorldbookEntryById(id))
      : [],
    note: String(messagesChatAutoScheduleNoteInputEl?.value || "").trim()
  };
}

function setAutoScheduleRequestOpen(isOpen) {
  state.autoScheduleRequestOpen = Boolean(isOpen);
  if (messagesChatAutoScheduleModalEl) {
    messagesChatAutoScheduleModalEl.hidden = !state.autoScheduleRequestOpen;
    messagesChatAutoScheduleModalEl.setAttribute("aria-hidden", String(!state.autoScheduleRequestOpen));
  }
  if (state.autoScheduleRequestOpen) {
    state.autoScheduleRequestDraft = createAutoScheduleRequestDraft();
    renderAutoScheduleRequestModal();
    window.setTimeout(() => {
      messagesChatAutoScheduleNoteInputEl?.focus();
    }, 0);
  } else {
    state.autoScheduleRequestDraft = createAutoScheduleRequestDraft();
    setEditorStatus(messagesChatAutoScheduleStatusEl);
  }
  updateBodyModalState();
}

function setChatSettingsOpen(isOpen) {
  state.chatSettingsOpen = Boolean(isOpen);
  if (messagesChatSettingsModalEl) {
    messagesChatSettingsModalEl.hidden = !state.chatSettingsOpen;
    messagesChatSettingsModalEl.setAttribute("aria-hidden", String(!state.chatSettingsOpen));
  }
  if (state.chatSettingsOpen) {
    applyChatPromptSettingsToForm(getConversationPromptSettings());
    window.setTimeout(() => {
      messagesChatHistoryRoundsInputEl?.focus();
    }, 0);
  } else {
    state.chatSettingsVideoContactImage = "";
    state.chatSettingsVideoUserImage = "";
  }
  updateBodyModalState();
}

async function editConversationMessage(messageId = "") {
  if (!ensureChatMutationAllowed("编辑消息")) {
    return;
  }
  const conversation = getConversationById();
  if (!conversation) {
    return;
  }
  const scrollSnapshot = captureConversationScrollSnapshot();
  const targetMessage = conversation.messages.find((message) => message.id === messageId) || null;
  if (!targetMessage) {
    setMessagesStatus("未找到要编辑的消息。", "error");
    return;
  }
  if (isScheduleInviteConversationMessage(targetMessage)) {
    setMessagesStatus("日程邀请卡片暂不支持直接编辑，请删除后重新发送。", "error");
    return;
  }
  if (isLocationConversationMessage(targetMessage)) {
    setMessagesStatus("定位消息暂不支持直接编辑，请删除后重新发送。", "error");
    return;
  }
  if (
    isVoiceConversationMessage(targetMessage) ||
    isConversationCallRequestMessage(targetMessage) ||
    isConversationCallEventMessage(targetMessage)
  ) {
    setMessagesStatus("这类通话/语音卡片暂不支持直接编辑，请删除后重新发送。", "error");
    return;
  }
  const nextText = window.prompt(
    targetMessage.role === "user" ? "编辑你发送的消息" : "编辑角色回复",
    targetMessage.text
  );
  if (nextText == null) {
    return;
  }
  const resolved = String(nextText || "").trim();
  if (!resolved) {
    setMessagesStatus("消息内容不能为空。", "error");
    return;
  }
  const editedAt = Date.now();
  const nextConversation = buildMutatedConversationSnapshot(conversation, (draft) => {
    draft.messages = draft.messages.map((message) =>
      message.id === targetMessage.id
        ? {
            ...message,
            text: resolved,
            updatedAt: editedAt
          }
        : message
    );
    recalculateConversationUpdatedAt(draft);
    markConversationMutated(draft, editedAt);
    bumpConversationReplyContextVersion(draft);
    return draft;
  });
  if (!nextConversation) {
    setMessagesStatus("未能构造编辑后的会话快照。", "error");
    return;
  }
  try {
    await syncConversationSnapshotNow(nextConversation, "mutation");
  } catch (error) {
    setMessagesStatus(`消息更新失败：${error?.message || "请求失败"}`, "error");
    return;
  }
  cancelConversationReplyWork(conversation.id);
  state.messageActionMessageId = "";
  upsertConversationSnapshotInState(nextConversation, {
    persistMirror: true
  });
  queueConversationRenderOptions({
    scrollBehavior: "preserve",
    scrollSnapshot
  });
  renderMessagesPage();
  setMessagesStatus("消息已更新。", "success");
}

async function deleteConversationMessage(messageId = "") {
  if (!ensureChatMutationAllowed("删除消息")) {
    return;
  }
  const conversation = getConversationById();
  if (!conversation) {
    return;
  }
  const scrollSnapshot = captureConversationScrollSnapshot();
  const targetMessage = conversation.messages.find((message) => message.id === messageId) || null;
  if (!targetMessage) {
    setMessagesStatus("未找到要删除的消息。", "error");
    return;
  }
  const confirmed = window.confirm("确定删除这条消息吗？");
  if (!confirmed) {
    return;
  }

  const deletedAt = Date.now();
  const nextConversation = buildMutatedConversationSnapshot(conversation, (draft) => {
    draft.messages = draft.messages.filter((message) => message.id !== targetMessage.id);
    recalculateConversationUpdatedAt(draft);
    markConversationMutated(draft, deletedAt);
    bumpConversationReplyContextVersion(draft);
    return draft;
  });
  if (!nextConversation) {
    setMessagesStatus("未能构造删除后的会话快照。", "error");
    return;
  }
  try {
    await syncConversationSnapshotNow(nextConversation, "mutation");
  } catch (error) {
    setMessagesStatus(`消息删除失败：${error?.message || "请求失败"}`, "error");
    return;
  }
  clearConversationDerivedUiForDeletedMessages([targetMessage.id]);
  cancelConversationReplyWork(conversation.id);
  state.messageActionMessageId = "";
  upsertConversationSnapshotInState(nextConversation, {
    persistMirror: true
  });
  queueConversationRenderOptions({
    scrollBehavior: "preserve",
    scrollSnapshot
  });
  renderMessagesPage();
  setMessagesStatus("消息已删除。", "success");
}

function clearConversationDerivedUiForDeletedMessages(messageIds = []) {
  const deletedIdSet = new Set(
    normalizeObjectArray(messageIds)
      .map((messageId) => String(messageId || "").trim())
      .filter(Boolean)
  );
  if (!deletedIdSet.size) {
    return;
  }
  if (deletedIdSet.has(String(state.quotedMessageId || "").trim())) {
    state.quotedMessageId = "";
  }
  if (deletedIdSet.has(String(state.expandedImageMessageId || "").trim())) {
    state.expandedImageMessageId = "";
  }
  if (deletedIdSet.has(String(state.expandedVoiceMessageId || "").trim())) {
    state.expandedVoiceMessageId = "";
  }
  if (
    state.discussionShareModalOpen &&
    deletedIdSet.has(String(state.discussionShareModalMessageId || "").trim())
  ) {
    setDiscussionShareModalOpen(false);
  }
  if (
    state.innerThoughtModalOpen &&
    deletedIdSet.has(String(state.innerThoughtTargetMessageId || "").trim())
  ) {
    setInnerThoughtModalOpen(false);
  }
}

async function deleteSelectedConversationMessages() {
  if (!ensureChatMutationAllowed("删除消息")) {
    return;
  }
  const conversation = getConversationById();
  if (!conversation || !isConversationMessageSelectionActive(conversation.id)) {
    setMessagesStatus("当前没有可批量删除的消息。", "error");
    return;
  }
  if (isConversationReplyBusy(conversation.id)) {
    setMessagesStatus("当前正在等待回复，暂时不能批量删除消息。", "error");
    return;
  }
  const selectedIdSet = pruneSelectedConversationMessages(conversation);
  if (!selectedIdSet.size) {
    setMessagesStatus("请先选择要删除的消息。", "error");
    return;
  }
  const confirmed = window.confirm(`确定删除选中的 ${selectedIdSet.size} 条消息吗？`);
  if (!confirmed) {
    return;
  }
  const scrollSnapshot = captureConversationScrollSnapshot();
  const deletedIds = Array.from(selectedIdSet);
  const deletedAt = Date.now();
  const nextConversation = buildMutatedConversationSnapshot(conversation, (draft) => {
    draft.messages = draft.messages.filter(
      (message) => !selectedIdSet.has(String(message?.id || "").trim())
    );
    recalculateConversationUpdatedAt(draft);
    markConversationMutated(draft, deletedAt);
    bumpConversationReplyContextVersion(draft);
    return draft;
  });
  if (!nextConversation) {
    setMessagesStatus("未能构造删除后的会话快照。", "error");
    return;
  }
  try {
    await syncConversationSnapshotNow(nextConversation, "mutation");
  } catch (error) {
    setMessagesStatus(`批量删除失败：${error?.message || "请求失败"}`, "error");
    return;
  }
  clearConversationDerivedUiForDeletedMessages(deletedIds);
  cancelConversationReplyWork(conversation.id);
  state.messageActionMessageId = "";
  upsertConversationSnapshotInState(nextConversation, {
    persistMirror: true
  });
  clearConversationMessageSelection();
  queueConversationRenderOptions({
    scrollBehavior: "preserve",
    scrollSnapshot
  });
  renderMessagesPage();
  setMessagesStatus(`已删除 ${deletedIds.length} 条消息。`, "success");
}

async function clearCurrentConversationHistory() {
  if (!ensureChatMutationAllowed("清空聊天记录")) {
    return;
  }
  const conversation = getConversationById();
  if (!conversation) {
    setEditorStatus(messagesChatSettingsStatusEl, "未找到当前会话。", "error");
    return;
  }
  const confirmed = window.confirm("确定清空当前角色的全部聊天记录吗？");
  if (!confirmed) {
    return;
  }

  const clearedAt = Date.now();
  const nextConversation = buildMutatedConversationSnapshot(conversation, (draft) => {
    draft.messages = [];
    draft.memorySummaryCounter = 0;
    draft.memorySummaryLastMessageCount = 0;
    draft.voiceCallState = normalizeVoiceCallState();
    draft.updatedAt = clearedAt;
    markConversationMutated(draft, clearedAt);
    bumpConversationReplyContextVersion(draft);
    return draft;
  });
  if (!nextConversation) {
    setEditorStatus(messagesChatSettingsStatusEl, "未能构造清空后的会话快照。", "error");
    return;
  }
  try {
    await syncConversationSnapshotNow(nextConversation, "mutation");
  } catch (error) {
    const errorMessage = `聊天记录清空失败：${error?.message || "请求失败"}`;
    setEditorStatus(messagesChatSettingsStatusEl, errorMessage, "error");
    setMessagesStatus(errorMessage, "error");
    return;
  }
  cancelConversationReplyWork(conversation.id);
  resetConversationVisibleMessageCount(conversation.id);
  state.messageActionMessageId = "";
  state.quotedMessageId = "";
  state.composerPanelOpen = false;
  if (state.discussionShareModalOpen) {
    setDiscussionShareModalOpen(false);
  }
  upsertConversationSnapshotInState(nextConversation, {
    persistMirror: true
  });
  queueConversationRenderOptions({
    scrollBehavior: "bottom"
  });
  renderMessagesPage();
  setEditorStatus(messagesChatSettingsStatusEl, "当前聊天记录已清空。", "success");
  setMessagesStatus("当前聊天记录已清空。", "success");
}

function clearCurrentConversationMemories() {
  const conversation = getConversationById();
  if (!conversation) {
    setEditorStatus(messagesChatSettingsStatusEl, "未找到当前会话。", "error");
    return;
  }
  const contact = getContactById(conversation.contactId);
  const contactName = contact?.name || "当前角色";
  const confirmed = window.confirm(`确定清空 ${contactName} 的全部记忆吗？`);
  if (!confirmed) {
    return;
  }

  const nextMemories = state.memories.filter((item) => item.contactId !== conversation.contactId);
  if (nextMemories.length === state.memories.length) {
    setEditorStatus(messagesChatSettingsStatusEl, "当前角色还没有可清理的记忆。", "success");
    setMessagesStatus("当前角色还没有可清理的记忆。", "success");
    return;
  }

  state.memories = nextMemories;
  persistMessageMemories();
  if (state.memoryViewerOpen) {
    renderMemoryViewer();
  }
  setEditorStatus(messagesChatSettingsStatusEl, "当前角色记忆已清空。", "success");
  setMessagesStatus("当前角色记忆已清空。", "success");
}

function getDeletedContactScheduleSummary(contactId = "") {
  const resolvedContactId = String(contactId || "").trim();
  const summary = {
    ownedEntries: 0,
    companionEntries: 0,
    visibleEntries: 0
  };
  if (!resolvedContactId) {
    return summary;
  }
  loadScheduleEntries().forEach((entry) => {
    if (entry.ownerType === "contact" && entry.ownerId === resolvedContactId) {
      summary.ownedEntries += 1;
    }
    if (entry.companionContactIds.includes(resolvedContactId)) {
      summary.companionEntries += 1;
    }
    if (entry.visibleContactIds.includes(resolvedContactId)) {
      summary.visibleEntries += 1;
    }
  });
  return summary;
}

function cleanupScheduleEntriesForDeletedContact(contactId = "", options = {}) {
  const resolvedContactId = String(contactId || "").trim();
  if (!resolvedContactId) {
    return {
      removedOwnedEntries: 0,
      removedCompanionEntries: 0,
      detachedCompanionLinks: 0,
      removedVisibilityRefs: 0
    };
  }
  const requestOptions = options && typeof options === "object" ? options : {};
  const removeRelatedCompanionEntries = Boolean(requestOptions.removeRelatedCompanionEntries);
  let removedOwnedEntries = 0;
  let removedCompanionEntries = 0;
  let detachedCompanionLinks = 0;
  let removedVisibilityRefs = 0;

  const nextEntries = loadScheduleEntries().flatMap((entry, index) => {
    if (entry.ownerType === "contact" && entry.ownerId === resolvedContactId) {
      removedOwnedEntries += 1;
      return [];
    }

    const includesCompanion = entry.companionContactIds.includes(resolvedContactId);
    if (includesCompanion && removeRelatedCompanionEntries) {
      removedCompanionEntries += 1;
      return [];
    }

    let changed = false;
    let nextEntry = { ...entry };

    if (includesCompanion) {
      const nextInviteDecisions = {
        ...(entry.inviteDecisions || {})
      };
      delete nextInviteDecisions[resolvedContactId];
      nextEntry = {
        ...nextEntry,
        companionContactIds: entry.companionContactIds.filter((item) => item !== resolvedContactId),
        inviteDecisions: nextInviteDecisions
      };
      detachedCompanionLinks += 1;
      changed = true;
    }

    if (entry.visibleContactIds.includes(resolvedContactId)) {
      nextEntry = {
        ...nextEntry,
        visibleContactIds: entry.visibleContactIds.filter((item) => item !== resolvedContactId)
      };
      removedVisibilityRefs += 1;
      changed = true;
    }

    return [
      changed
        ? normalizeScheduleEntry(
            {
              ...nextEntry,
              updatedAt: Date.now() + index
            },
            index
          )
        : normalizeScheduleEntry(entry, index)
    ];
  });

  safeSetItem(SCHEDULE_ENTRIES_KEY, JSON.stringify(nextEntries));
  return {
    removedOwnedEntries,
    removedCompanionEntries,
    detachedCompanionLinks,
    removedVisibilityRefs
  };
}

function cleanupMessageShareInboxForDeletedContact(contactId = "", conversationIds = []) {
  const resolvedContactId = String(contactId || "").trim();
  const conversationIdSet = new Set(
    normalizeObjectArray(conversationIds)
      .map((conversationId) => String(conversationId || "").trim())
      .filter(Boolean)
  );
  if (!resolvedContactId && !conversationIdSet.size) {
    return 0;
  }
  const inbox = loadMessageShareInbox();
  if (!inbox.length) {
    return 0;
  }
  const nextInbox = inbox.filter((entry) => {
    const targetContactId = String(entry?.targetContactId || "").trim();
    const targetConversationId = String(entry?.targetConversationId || "").trim();
    return targetContactId !== resolvedContactId && !conversationIdSet.has(targetConversationId);
  });
  if (nextInbox.length !== inbox.length) {
    persistMessageShareInbox(nextInbox);
  }
  return inbox.length - nextInbox.length;
}

function cleanupConversationVideoMediaForDeletedContact(contactId = "") {
  const resolvedContactId = String(contactId || "").trim();
  if (!resolvedContactId) {
    return 0;
  }
  const mediaMap = loadConversationVideoMediaMap();
  if (!Object.prototype.hasOwnProperty.call(mediaMap, resolvedContactId)) {
    return 0;
  }
  delete mediaMap[resolvedContactId];
  persistConversationVideoMediaMap(mediaMap);
  return 1;
}

function cleanupPlotThreadsForDeletedContact(contactId = "") {
  const resolvedContactId = String(contactId || "").trim();
  if (!resolvedContactId) {
    return 0;
  }
  const threads = readStoredJson(PLOT_THREADS_KEY, []);
  if (!Array.isArray(threads) || !threads.length) {
    return 0;
  }
  const nextThreads = threads.filter((thread) => {
    const participants = Array.isArray(thread?.participants) ? thread.participants : [];
    return !participants.some((participant) => String(participant?.id || "").trim() === resolvedContactId);
  });
  if (nextThreads.length !== threads.length) {
    safeSetItem(PLOT_THREADS_KEY, JSON.stringify(nextThreads));
  }
  return threads.length - nextThreads.length;
}

function cleanupRaisingRecordsForDeletedContact(contactId = "") {
  const resolvedContactId = String(contactId || "").trim();
  if (!resolvedContactId) {
    return 0;
  }
  const records = readStoredJson(RAISING_RECORDS_KEY, []);
  if (!Array.isArray(records) || !records.length) {
    return 0;
  }
  const nextRecords = records.filter(
    (record) => String(record?.partnerId || "").trim() !== resolvedContactId
  );
  if (nextRecords.length !== records.length) {
    safeSetItem(RAISING_RECORDS_KEY, JSON.stringify(nextRecords));
  }
  return records.length - nextRecords.length;
}

async function deleteConversationContactBundle(contactId = "", options = {}) {
  const resolvedContactId = String(contactId || "").trim();
  if (!resolvedContactId) {
    return null;
  }
  if (!ensureChatMutationAllowed("删除会话")) {
    return null;
  }
  const requestOptions = options && typeof options === "object" ? options : {};
  const preserveContact = Boolean(requestOptions.preserveContact);
  const deletedMemoryCount = state.memories.filter((item) => item.contactId === resolvedContactId).length;
  const removedJournalCount = state.journalEntries.filter((item) => item.contactId === resolvedContactId).length;
  const conversationsToDelete = state.conversations.filter(
    (conversation) => String(conversation.contactId || "").trim() === resolvedContactId
  );
  const conversationIds = conversationsToDelete.map((conversation) => String(conversation.id || "").trim()).filter(Boolean);
  if (conversationIds.length) {
    try {
      await deleteConversationSnapshotsNow(conversationIds, "mutation", {
        deletedAt: Date.now()
      });
    } catch (error) {
      setMessagesStatus(`会话删除失败：${error?.message || "请求失败"}`, "error");
      return null;
    }
  }
  const activeForegroundTask = state.activeForegroundReplyTaskId
    ? loadReplyTasks().find((task) => task.id === state.activeForegroundReplyTaskId) || null
    : null;
  conversationIds.forEach((conversationId) => {
    cancelConversationReplyWork(conversationId, {
      includeErrors: true
    });
    clearConversationReplyRecovery(conversationId);
    clearForegroundReplySync(conversationId);
    delete state.conversationDrafts?.[conversationId];
    delete state.conversationVisibleCounts?.[conversationId];
  });
  if (
    activeForegroundTask &&
    conversationIds.includes(String(activeForegroundTask.conversationId || "").trim())
  ) {
    stopForegroundReplyTaskHeartbeat();
    state.activeForegroundReplyTaskId = "";
  }

  state.conversations = state.conversations.filter(
    (conversation) => String(conversation.contactId || "").trim() !== resolvedContactId
  );
  if (!preserveContact) {
    state.contacts = state.contacts.filter((contact) => contact.id !== resolvedContactId);
  }
  state.memories = state.memories.filter((item) => item.contactId !== resolvedContactId);
  state.journalEntries = state.journalEntries.filter((item) => item.contactId !== resolvedContactId);
  state.commonPlaces = state.commonPlaces.map((place) => ({
    ...place,
    visibleContactIds: normalizeMountedIds(place.visibleContactIds).filter((item) => item !== resolvedContactId)
  }));
  state.presenceState = {
    ...state.presenceState,
    userByContact: Object.fromEntries(
      Object.entries(state.presenceState?.userByContact || {}).filter(
        ([contactIdKey]) => String(contactIdKey || "").trim() !== resolvedContactId
      )
    ),
    contacts: Object.fromEntries(
      Object.entries(state.presenceState?.contacts || {}).filter(
        ([contactIdKey]) => String(contactIdKey || "").trim() !== resolvedContactId
      )
    )
  };

  const scheduleCleanup = cleanupScheduleEntriesForDeletedContact(resolvedContactId, requestOptions);
  const removedShareInboxCount = cleanupMessageShareInboxForDeletedContact(
    resolvedContactId,
    conversationIds
  );
  const removedVideoMediaCount = cleanupConversationVideoMediaForDeletedContact(resolvedContactId);
  const removedPlotThreadCount = preserveContact ? 0 : cleanupPlotThreadsForDeletedContact(resolvedContactId);
  const removedRaisingRecordCount = preserveContact
    ? 0
    : cleanupRaisingRecordsForDeletedContact(resolvedContactId);

  if (state.activeConversationId && conversationIds.includes(String(state.activeConversationId || "").trim())) {
    closeConversationTransientUi();
    state.activeConversationId = "";
    state.quotedMessageId = "";
  }
  if (
    state.pendingAssistantReveal &&
    conversationIds.includes(String(state.pendingAssistantReveal.conversationId || "").trim())
  ) {
    state.pendingAssistantReveal = null;
  }
  const activeView = loadActiveConversationView();
  if (conversationIds.includes(String(activeView.conversationId || "").trim())) {
    persistActiveConversationView({
      conversationId: "",
      visible: false,
      updatedAt: Date.now()
    });
  }
  if (state.memorySelectedContactId === resolvedContactId) {
    state.memorySelectedContactId = "";
  }
  if (state.memoryEditingId && !state.memories.some((item) => item.id === state.memoryEditingId)) {
    state.memoryEditingId = "";
    state.memoryEditorOpen = false;
  }
  if (!preserveContact && state.contactEditorId === resolvedContactId) {
    state.contactEditorOpen = false;
    state.contactEditorId = "";
  }

  persistMessageMemories();
  persistJournalEntries();
  persistCommonPlaces();
  persistPresenceState();
  persistConversationMirror(state.conversations);
  persistContacts();

  return {
    deletedConversationCount: conversationIds.length,
    deletedMemoryCount,
    removedJournalCount,
    scheduleCleanup,
    removedShareInboxCount,
    removedVideoMediaCount,
    removedPlotThreadCount,
    removedRaisingRecordCount
  };
}

async function handleConversationRowLongPress(conversationId = "") {
  const resolvedConversationId = String(conversationId || "").trim();
  const conversation = getConversationById(resolvedConversationId);
  if (!conversation) {
    return;
  }
  const contactId = String(conversation.contactId || "").trim();
  const contact = contactId ? getContactById(contactId) : null;
  const conversationName = contact?.name || getConversationSnapshotName(conversation);
  const scheduleSummary = getDeletedContactScheduleSummary(contactId);
  const confirmed = window.confirm(
    [
      `确定删除会话「${conversationName}」吗？`,
      "会同步清空该角色的聊天记录、记忆、日记缓存、行程和会话设置，但不会删除通讯录里的联系人资料。",
      scheduleSummary.ownedEntries || scheduleSummary.companionEntries
        ? `当前还关联 ${scheduleSummary.ownedEntries} 条角色日程、${scheduleSummary.companionEntries} 条同行日程。`
        : ""
    ]
      .filter(Boolean)
      .join("\n")
  );
  if (!confirmed) {
    return;
  }

  let removeRelatedCompanionEntries = false;
  if (scheduleSummary.companionEntries > 0) {
    removeRelatedCompanionEntries = window.confirm(
      `检测到 ${scheduleSummary.companionEntries} 条把 ${conversationName} 作为同行人的日程。\n是否一并删除这些整条相关日程？\n选择“取消”则只解除同行关系，不删除整条日程。`
    );
  }

  const memoryCount = state.memories.filter((item) => item.contactId === contactId).length;
  const journalCount = state.journalEntries.filter((item) => item.contactId === contactId).length;
  const result = await deleteConversationContactBundle(contactId, {
    preserveContact: true,
    removeRelatedCompanionEntries
  });
  if (!result) {
    return;
  }

  renderMessagesPage();
  const summaryParts = [
    result.deletedConversationCount ? `删除 ${result.deletedConversationCount} 个会话缓存` : "",
    memoryCount ? `清空 ${memoryCount} 条记忆` : "",
    journalCount ? `清空 ${journalCount} 条日记缓存` : "",
    result.scheduleCleanup.removedOwnedEntries
      ? `删除 ${result.scheduleCleanup.removedOwnedEntries} 条角色日程`
      : "",
    result.scheduleCleanup.removedCompanionEntries
      ? `删除 ${result.scheduleCleanup.removedCompanionEntries} 条同行日程`
      : "",
    result.scheduleCleanup.detachedCompanionLinks
      ? `移除 ${result.scheduleCleanup.detachedCompanionLinks} 个同行关联`
      : ""
  ].filter(Boolean);
  setMessagesStatus(
    summaryParts.length
      ? `${conversationName} 的会话已删除：${summaryParts.join("，")}；联系人资料已保留。`
      : `${conversationName} 的会话已删除，联系人资料已保留。`,
    "success"
  );
}

async function handleDeleteContactFromEditor() {
  const contactId = String(state.contactEditorId || "").trim();
  const contact = contactId ? getContactById(contactId) : null;
  if (!contact) {
    setEditorStatus(messagesContactEditorStatusEl, "未找到要删除的联系人。", "error");
    return;
  }
  const contactName = String(contact.name || "这个联系人").trim() || "这个联系人";
  const scheduleSummary = getDeletedContactScheduleSummary(contactId);
  const conversationCount = state.conversations.filter(
    (conversation) => String(conversation.contactId || "").trim() === contactId
  ).length;
  const memoryCount = state.memories.filter((item) => item.contactId === contactId).length;
  const journalCount = state.journalEntries.filter((item) => item.contactId === contactId).length;
  const confirmed = window.confirm(
    [
      `确定删除通讯录联系人「${contactName}」吗？`,
      "这会删除联系人资料、聊天记录、记忆、日记、该角色自己的日程、地点可见范围、状态与会话缓存。",
      "如果这个角色只是某个日程的同行人，只会从同行人中移除，不会删除主日程。",
      conversationCount || memoryCount || journalCount || scheduleSummary.ownedEntries || scheduleSummary.companionEntries
        ? `当前关联：${conversationCount} 个会话、${memoryCount} 条记忆、${journalCount} 篇日记、${scheduleSummary.ownedEntries} 条角色日程、${scheduleSummary.companionEntries} 条同行日程。`
        : ""
    ]
      .filter(Boolean)
      .join("\n")
  );
  if (!confirmed) {
    return;
  }

  const result = await deleteConversationContactBundle(contactId, {
    preserveContact: false,
    removeRelatedCompanionEntries: false
  });
  if (!result) {
    setEditorStatus(messagesContactEditorStatusEl, "删除联系人失败。", "error");
    return;
  }

  await detachDeletedContactForumFandomTab(contact);

  setContactEditorOpen(false);
  renderMessagesPage();
  if (state.placesManagerOpen) {
    renderPlacesManager();
  }
  if (state.memoryViewerOpen) {
    renderMemoryViewer();
  }

  const summaryParts = [
    "联系人资料已删除",
    result.deletedConversationCount ? `删除 ${result.deletedConversationCount} 个会话` : "",
    result.deletedMemoryCount ? `清空 ${result.deletedMemoryCount} 条记忆` : "",
    result.removedJournalCount ? `删除 ${result.removedJournalCount} 篇日记` : "",
    result.scheduleCleanup.removedOwnedEntries
      ? `删除 ${result.scheduleCleanup.removedOwnedEntries} 条角色日程`
      : "",
    result.scheduleCleanup.detachedCompanionLinks
      ? `移除 ${result.scheduleCleanup.detachedCompanionLinks} 个同行关联`
      : "",
    result.scheduleCleanup.removedVisibilityRefs
      ? `移除 ${result.scheduleCleanup.removedVisibilityRefs} 个日程可见关联`
      : "",
    result.removedPlotThreadCount ? `删除 ${result.removedPlotThreadCount} 条剧情` : "",
    result.removedRaisingRecordCount ? `删除 ${result.removedRaisingRecordCount} 条养崽记录` : ""
  ].filter(Boolean);
  setMessagesStatus(`${contactName} 已删除：${summaryParts.join("，")}。`, "success");
}

function cancelConversationListLongPress() {
  if (conversationListLongPressTimerId) {
    window.clearTimeout(conversationListLongPressTimerId);
  }
  conversationListLongPressTimerId = 0;
  conversationListLongPressConversationId = "";
  conversationListLongPressStartPoint = null;
}

function beginConversationListLongPress(event, conversationId = "") {
  const resolvedConversationId = String(conversationId || "").trim();
  if (!resolvedConversationId) {
    return;
  }
  if (Number.isFinite(event?.button) && event.button !== 0) {
    return;
  }
  cancelConversationListLongPress();
  conversationListLongPressConversationId = resolvedConversationId;
  conversationListLongPressStartPoint =
    typeof event?.clientX === "number" && typeof event?.clientY === "number"
      ? {
          x: event.clientX,
          y: event.clientY
        }
      : null;
  conversationListLongPressTimerId = window.setTimeout(() => {
    conversationListLongPressTriggeredId = resolvedConversationId;
    cancelConversationListLongPress();
    try {
      window.navigator?.vibrate?.(10);
    } catch (_error) {
    }
    handleConversationRowLongPress(resolvedConversationId);
  }, CONVERSATION_LIST_LONG_PRESS_MS);
}

function shouldCancelConversationListLongPressForMove(event) {
  if (!conversationListLongPressStartPoint) {
    return false;
  }
  if (typeof event?.clientX !== "number" || typeof event?.clientY !== "number") {
    return false;
  }
  return (
    Math.abs(event.clientX - conversationListLongPressStartPoint.x) >
      CONVERSATION_LIST_LONG_PRESS_MOVE_THRESHOLD ||
    Math.abs(event.clientY - conversationListLongPressStartPoint.y) >
      CONVERSATION_LIST_LONG_PRESS_MOVE_THRESHOLD
  );
}

function handleConversationToolAction(toolId = "") {
  const resolvedToolId = String(toolId || "").trim();
  closeConversationTransientUi();

  if (resolvedToolId === "journal") {
    const { conversation, contact } = getActiveConversationContext();
    if (!conversation || !contact) {
      setMessagesStatus("请先进入一个聊天，再打开日记。", "error");
      renderConversationDetail();
      return;
    }
    renderConversationDetail();
    setJournalOpen(true);
    return;
  }

  if (resolvedToolId === "schedule") {
    const { conversation, contact } = getActiveConversationContext();
    if (!conversation || !contact) {
      setMessagesStatus("请先进入一个聊天，再查看今日日程。", "error");
      renderConversationDetail();
      return;
    }
    renderConversationDetail();
    setSchedulePreviewOpen(true);
    return;
  }

  if (resolvedToolId === "location") {
    if (!ensureChatMutationAllowed("发送位置")) {
      renderConversationDetail();
      return;
    }
    const conversation = getConversationById();
    if (!conversation) {
      setMessagesStatus("请先进入一个聊天，再发送位置。", "error");
      renderConversationDetail();
      return;
    }
    renderConversationDetail();
    setLocationModalOpen(true);
    return;
  }

  if (resolvedToolId === "voice") {
    if (!ensureChatMutationAllowed("发送语音")) {
      renderConversationDetail();
      return;
    }
    const conversation = getConversationById();
    if (!conversation) {
      setMessagesStatus("请先进入一个聊天，再发送语音。", "error");
      renderConversationDetail();
      return;
    }
    renderConversationDetail();
    setVoiceModalOpen(true);
    return;
  }

  if (resolvedToolId === "phone") {
    if (!ensureChatMutationAllowed("发起语音通话")) {
      renderConversationDetail();
      return;
    }
    const conversation = getConversationById();
    if (!conversation) {
      setMessagesStatus("请先进入一个聊天，再发起语音通话。", "error");
      renderConversationDetail();
      return;
    }
    beginOutgoingVoiceCall();
    return;
  }

  if (resolvedToolId === "video") {
    if (!ensureChatMutationAllowed("发起视频通话")) {
      renderConversationDetail();
      return;
    }
    const conversation = getConversationById();
    if (!conversation) {
      setMessagesStatus("请先进入一个聊天，再发起视频通话。", "error");
      renderConversationDetail();
      return;
    }
    beginOutgoingVideoCall();
    return;
  }

  if (resolvedToolId === "camera") {
    if (!ensureChatMutationAllowed("发送图片")) {
      renderConversationDetail();
      return;
    }
    const conversation = getConversationById();
    if (!conversation) {
      setMessagesStatus("请先进入一个聊天，再发送图片。", "error");
      renderConversationDetail();
      return;
    }
    renderConversationDetail();
    setPhotoModalOpen(true);
    return;
  }

  if (resolvedToolId === "image") {
    if (!ensureChatMutationAllowed("发送图片")) {
      renderConversationDetail();
      return;
    }
    const conversation = getConversationById();
    if (!conversation) {
      setMessagesStatus("请先进入一个聊天，再发送图片。", "error");
      renderConversationDetail();
      return;
    }
    renderConversationDetail();
    messagesImageFileInputEl?.click();
    return;
  }

  if (resolvedToolId === "awareness") {
    if (!ensureChatMutationAllowed("调整察觉")) {
      renderConversationDetail();
      return;
    }
    const conversation = getConversationById();
    if (!conversation) {
      setMessagesStatus("请先进入一个聊天，再设置察觉。", "error");
      renderConversationDetail();
      return;
    }
    renderConversationDetail();
    setAwarenessModalOpen(true);
    return;
  }

  if (resolvedToolId === "regenerate") {
    if (!ensureChatMutationAllowed("重回回复")) {
      renderConversationDetail();
      return;
    }
    const conversation = getConversationById();
    if (!conversation) {
      return;
    }
    const latestBatch = getLatestAssistantReplyBatch(conversation);
    if (latestBatch?.blocked) {
      setMessagesStatus("当前还有待回复的新消息，请先完成这一轮对话。", "error");
      renderConversationDetail();
      return;
    }
    if (!latestBatch) {
      setMessagesStatus("当前没有可重回的上一轮回复。", "error");
      renderConversationDetail();
      return;
    }
    renderConversationDetail();
    setRegenerateModalOpen(true);
    return;
  }

  renderConversationDetail();
  const entry = CHAT_UTILITY_ITEMS.find((item) => item.id === resolvedToolId);
  setMessagesStatus(`${entry?.label || "该"}功能暂未开放。`);
}

async function openInnerThoughtForMessage(messageId = "") {
  const conversation = getConversationById();
  if (!conversation) {
    return;
  }
  const contact = getResolvedConversationContact(conversation);
  if (!contact) {
    setMessagesStatus("未找到对应联系人，请先去通讯录检查人物信息。", "error");
    return;
  }
  const targetMessage =
    conversation.messages.find((message) => String(message?.id || "").trim() === String(messageId || "").trim()) ||
    null;
  if (!targetMessage) {
    setMessagesStatus("未找到要分析的消息。", "error");
    return;
  }
  if (targetMessage.role !== "assistant") {
    setMessagesStatus("心声分析目前只支持角色发出的消息。", "error");
    return;
  }
  if (
    isScheduleInviteConversationMessage(targetMessage) ||
    isLocationConversationMessage(targetMessage) ||
    isImageConversationMessage(targetMessage) ||
    isVoiceConversationMessage(targetMessage) ||
    isConversationCallRequestMessage(targetMessage) ||
    isConversationCallEventMessage(targetMessage)
  ) {
    setMessagesStatus("这类卡片消息暂不支持心声分析。", "error");
    return;
  }

  try {
    const settings = loadSettings();
    const scrollSnapshot = captureConversationScrollSnapshot();
    state.messageActionMessageId = "";
    state.innerThoughtLoading = true;
    state.innerThoughtError = "";
    state.innerThoughtContent = "";
    state.innerThoughtTargetMessageId = String(targetMessage.id || "").trim();
    state.innerThoughtTargetRole = targetMessage.role === "assistant" ? "assistant" : "user";
    state.innerThoughtTargetPreview = getConversationMessagePreviewText(targetMessage);
    renderConversationDetail({
      scrollBehavior: "preserve",
      scrollSnapshot
    });
    setInnerThoughtModalOpen(true);
    renderInnerThoughtModal();

    const content = await requestInnerThoughtText(
      settings,
      state.profile,
      contact,
      conversation,
      targetMessage
    );
    if (
      !state.innerThoughtModalOpen ||
      state.innerThoughtTargetMessageId !== String(targetMessage.id || "").trim()
    ) {
      return;
    }
    state.innerThoughtLoading = false;
    state.innerThoughtError = "";
    state.innerThoughtContent = String(content || "").trim();
    renderInnerThoughtModal();
    setMessagesStatus("心声已生成。", "success");
  } catch (error) {
    state.innerThoughtLoading = false;
    state.innerThoughtError = error?.message || "心声生成失败。";
    state.innerThoughtContent = "";
    if (!state.innerThoughtModalOpen) {
      setInnerThoughtModalOpen(true);
    }
    renderInnerThoughtModal();
    setMessagesStatus(`心声生成失败：${error?.message || "请求失败"}`, "error");
  }
}

async function sendConversationImage(file) {
  if (!file) {
    return;
  }
  if (!ensureChatMutationAllowed("发送图片")) {
    return;
  }
  const conversation = getConversationById();
  if (!conversation) {
    setMessagesStatus("请先进入一个聊天，再发送图片。", "error");
    return;
  }

  let imageDataUrl = "";
  try {
    imageDataUrl = await readAvatarAsDataUrl(file, { maxSide: 960, quality: 0.78 });
  } catch (error) {
    setMessagesStatus(error?.message || "图片读取失败。", "error");
    return;
  }

  if (!imageDataUrl) {
    setMessagesStatus("图片读取失败。", "error");
    return;
  }

  const createdAt = Date.now();
  const userMessage = normalizeConversationMessage(
    {
      id: `message_${createdAt}_${hashText(`${file.name || "image"}_${imageDataUrl.slice(0, 48)}`)}`,
      role: "user",
      messageType: "image",
      imageDataUrl,
      text: buildImageMessageText(),
      needsReply: true,
      time: formatLocalTime(),
      createdAt
    },
    conversation.messages.length
  );
  const nextConversation = buildMutatedConversationSnapshot(conversation, (draft) => {
    draft.messages = [...draft.messages, userMessage];
    draft.updatedAt = userMessage.createdAt;
    markConversationMutated(draft, userMessage.updatedAt || userMessage.createdAt);
    bumpConversationReplyContextVersion(draft);
    return draft;
  });
  if (!nextConversation) {
    setMessagesStatus("未能构造图片消息快照。", "error");
    return;
  }
  try {
    await syncConversationSnapshotNow(nextConversation, "mutation");
  } catch (error) {
    setMessagesStatus(`图片写入数据库失败：${error?.message || "请求失败"}`, "error");
    return;
  }
  closeConversationTransientUi();
  upsertConversationSnapshotInState(nextConversation, {
    persistMirror: true,
    deferMaintenance: true,
    fallbackToMaintenanceOnFailure: false
  });
  queueConversationRenderOptions({
    scrollBehavior: "bottom"
  });
  renderMessagesPage();
  setMessagesStatus("图片已加入对话，点击右侧圆标向 API 请求回复。", "success");
}

async function sendConversationPhoto(description = "") {
  const resolvedDescription = String(description || "").trim();
  if (!resolvedDescription) {
    setPhotoStatus("请先描述这张照片的内容。", "error");
    return;
  }
  if (!ensureChatMutationAllowed("发送图片")) {
    return;
  }
  const conversation = getConversationById();
  if (!conversation) {
    setMessagesStatus("请先进入一个聊天，再发送图片。", "error");
    return;
  }

  const createdAt = Date.now();
  const userMessage = normalizeConversationMessage(
    {
      id: `message_${createdAt}_${hashText(resolvedDescription)}`,
      role: "user",
      messageType: "image",
      imageDescription: resolvedDescription,
      text: buildImageMessageText(resolvedDescription),
      needsReply: true,
      time: formatLocalTime(),
      createdAt
    },
    conversation.messages.length
  );
  const nextConversation = buildMutatedConversationSnapshot(conversation, (draft) => {
    draft.messages = [...draft.messages, userMessage];
    draft.updatedAt = userMessage.createdAt;
    markConversationMutated(draft, userMessage.updatedAt || userMessage.createdAt);
    bumpConversationReplyContextVersion(draft);
    return draft;
  });
  if (!nextConversation) {
    setMessagesStatus("未能构造图片消息快照。", "error");
    return;
  }
  try {
    await syncConversationSnapshotNow(nextConversation, "mutation");
  } catch (error) {
    setMessagesStatus(`图片写入数据库失败：${error?.message || "请求失败"}`, "error");
    return;
  }
  closeConversationTransientUi();
  upsertConversationSnapshotInState(nextConversation, {
    persistMirror: true,
    deferMaintenance: true,
    fallbackToMaintenanceOnFailure: false
  });
  setPhotoModalOpen(false);
  queueConversationRenderOptions({
    scrollBehavior: "bottom"
  });
  renderMessagesPage();
  setMessagesStatus("图片已加入对话，点击右侧圆标向 API 请求回复。", "success");
}

async function sendConversationVoice(content = "") {
  const resolvedContent = String(content || "").trim();
  if (!resolvedContent) {
    setVoiceStatus("请输入语音转文字内容。", "error");
    return;
  }
  if (!ensureChatMutationAllowed("发送语音")) {
    return;
  }
  const conversation = getConversationById();
  if (!conversation) {
    setMessagesStatus("请先进入一个聊天，再发送语音。", "error");
    return;
  }

  const durationSeconds = estimateVoiceMessageDurationSeconds(resolvedContent);
  const createdAt = Date.now();
  const userMessage = normalizeConversationMessage(
    {
      id: `message_${createdAt}_${hashText(`voice_${resolvedContent}`)}`,
      role: "user",
      messageType: "voice",
      voiceText: resolvedContent,
      voiceDurationSeconds: durationSeconds,
      text: buildVoiceMessageText(resolvedContent, durationSeconds),
      needsReply: true,
      time: formatLocalTime(),
      createdAt
    },
    conversation.messages.length
  );
  const nextConversation = buildMutatedConversationSnapshot(conversation, (draft) => {
    draft.messages = [...draft.messages, userMessage];
    draft.updatedAt = userMessage.createdAt;
    markConversationMutated(draft, userMessage.updatedAt || userMessage.createdAt);
    bumpConversationReplyContextVersion(draft);
    return draft;
  });
  if (!nextConversation) {
    setMessagesStatus("未能构造语音消息快照。", "error");
    return;
  }
  try {
    await syncConversationSnapshotNow(nextConversation, "mutation");
  } catch (error) {
    setMessagesStatus(`语音写入数据库失败：${error?.message || "请求失败"}`, "error");
    return;
  }
  closeConversationTransientUi();
  upsertConversationSnapshotInState(nextConversation, {
    persistMirror: true,
    deferMaintenance: true,
    fallbackToMaintenanceOnFailure: false
  });
  setVoiceModalOpen(false);
  queueConversationRenderOptions({
    scrollBehavior: "bottom"
  });
  renderMessagesPage();
  setMessagesStatus("语音已加入对话，点击右侧圆标向 API 请求回复。", "success");
}

async function sendConversationLocation(locationName, coordinates) {
  const resolvedName = String(locationName || "").trim();
  if (!resolvedName) {
    setLocationStatus("请输入位置名称。", "error");
    return;
  }
  if (!ensureChatMutationAllowed("发送定位")) {
    return;
  }

  const resolvedCoordinates =
    String(coordinates || "").trim() || buildRandomLocationCoordinates(resolvedName);
  const conversation = getConversationById();
  if (!conversation) {
    return;
  }

  const createdAt = Date.now();
  const userMessage = normalizeConversationMessage(
    {
      id: `message_${createdAt}_${hashText(`${resolvedName}_${resolvedCoordinates}`)}`,
      role: "user",
      messageType: "location",
      locationName: resolvedName,
      coordinates: resolvedCoordinates,
      needsReply: true,
      time: formatLocalTime(),
      createdAt
    },
    conversation.messages.length
  );
  const nextConversation = buildMutatedConversationSnapshot(conversation, (draft) => {
    draft.messages = [...draft.messages, userMessage];
    draft.updatedAt = userMessage.createdAt;
    markConversationMutated(draft, userMessage.updatedAt || userMessage.createdAt);
    bumpConversationReplyContextVersion(draft);
    return draft;
  });
  if (!nextConversation) {
    setMessagesStatus("未能构造定位消息快照。", "error");
    return;
  }
  try {
    await syncConversationSnapshotNow(nextConversation, "mutation");
  } catch (error) {
    setMessagesStatus(`定位写入数据库失败：${error?.message || "请求失败"}`, "error");
    return;
  }
  closeConversationTransientUi();
  saveRecentLocation(resolvedName, resolvedCoordinates);
  upsertConversationSnapshotInState(nextConversation, {
    persistMirror: true,
    deferMaintenance: true,
    fallbackToMaintenanceOnFailure: false
  });
  setLocationModalOpen(false);
  queueConversationRenderOptions({
    scrollBehavior: "bottom"
  });
  renderMessagesPage();
  setMessagesStatus("定位已加入对话，点击右侧圆标向 API 请求回复。", "success");
}

function updateVoiceCallDurationDisplay() {
  const durationEl = document.querySelector("#messages-call-duration");
  if (!(durationEl instanceof HTMLElement)) {
    return;
  }
  const startedAt = Number(durationEl.dataset.startedAt || 0);
  durationEl.textContent = formatVoiceCallDurationLabel(
    getVoiceCallDurationSeconds({ startedAt, active: startedAt > 0 })
  );
}

function ensureVoiceCallDurationClock() {
  if (voiceCallDurationTimerId) {
    return;
  }
  voiceCallDurationTimerId = window.setInterval(() => {
    updateVoiceCallDurationDisplay();
  }, 1000);
}

function buildVoiceCallEventMessage(kind = "connected", options = {}) {
  const eventOptions = options && typeof options === "object" ? options : {};
  const createdAt = Number(eventOptions.createdAt) || Date.now();
  const callMode = normalizeConversationCallMode(eventOptions.callMode);
  const messageType = callMode === "video" ? "video_call_event" : "voice_call_event";
  return normalizeConversationMessage(
    {
      id: `message_${createdAt}_${hashText(`${callMode}_call_event_${kind}_${eventOptions.durationSeconds || 0}`)}`,
      role: eventOptions.role === "assistant" ? "assistant" : "user",
      messageType,
      callEventKind: normalizeVoiceCallEventKind(kind),
      callEventDurationSeconds: Math.max(0, Math.floor(Number(eventOptions.durationSeconds) || 0)),
      text: buildConversationCallEventMessageText(callMode, kind, {
        durationSeconds: eventOptions.durationSeconds
      }),
      callMode,
      needsReply: Boolean(eventOptions.needsReply),
      time: formatLocalTime(new Date(createdAt)),
      createdAt
    },
    Array.isArray(eventOptions.conversation?.messages) ? eventOptions.conversation.messages.length : 0
  );
}

function updateVoiceCallRequestStatusMessage(
  conversation,
  messageId = "",
  status = "pending"
) {
  if (!conversation || !Array.isArray(conversation.messages)) {
    return null;
  }
  const resolvedMessageId = String(messageId || "").trim();
  const resolvedStatus = normalizeVoiceCallRequestStatus(status);
  let updatedMessage = null;
  conversation.messages = conversation.messages.map((message) => {
    if (String(message?.id || "").trim() !== resolvedMessageId) {
      return message;
    }
    const callMode = getConversationCallModeFromMessage(message);
    const messageType = callMode === "video" ? "video_call_request" : "voice_call_request";
    updatedMessage = normalizeConversationMessage(
      {
        ...message,
        messageType,
        callRequestStatus: resolvedStatus,
        text: buildConversationCallRequestMessageText(
          callMode,
          resolvedStatus,
          message?.callRequestMessage || "",
          message?.role || "assistant"
        ),
        callMode
      },
      0
    );
    return updatedMessage;
  });
  return updatedMessage;
}

function setConversationVoiceCallState(conversation, nextState = null) {
  if (!conversation || typeof conversation !== "object") {
    return;
  }
  conversation.voiceCallState = normalizeVoiceCallState(nextState);
}

function startConversationVoiceCall(conversation, options = {}) {
  const callOptions = options && typeof options === "object" ? options : {};
  const startedAt = Number(callOptions.startedAt) || Date.now();
  const callMode = normalizeConversationCallMode(callOptions.callMode);
  setConversationVoiceCallState(conversation, {
    active: true,
    startedAt,
    connectedAt: startedAt,
    initiatedBy: callOptions.initiatedBy === "assistant" ? "assistant" : "user",
    requestMessageId: String(callOptions.requestMessageId || "").trim(),
    callMode
  });
  state.quotedMessageId = "";
}

function finalizeConversationMutation(conversation, renderOptions = {}, statusMessage = "", statusTone = "success") {
  if (!conversation) {
    return;
  }
  recalculateConversationUpdatedAt(conversation);
  markConversationMutated(conversation, Date.now());
  bumpConversationReplyContextVersion(conversation);
  persistConversations({
    deferMaintenance: true,
    fallbackToMaintenanceOnFailure: true
  });
  enqueueConversationChatSyncUpsert(conversation);
  queueConversationRenderOptions(renderOptions);
  renderMessagesPage();
  if (statusMessage) {
    setMessagesStatus(statusMessage, statusTone);
  }
}

function beginOutgoingVoiceCall(callMode = "voice") {
  const conversation = getConversationById();
  const resolvedMode = normalizeConversationCallMode(callMode);
  if (!conversation) {
    setMessagesStatus(`请先进入一个聊天，再发起${getConversationCallModeShortLabel(resolvedMode)}通话。`, "error");
    return;
  }
  if (isConversationVoiceCallActive(conversation)) {
    queueConversationRenderOptions({
      scrollBehavior: "preserve"
    });
    renderMessagesPage();
    return;
  }

  closeConversationTransientUi();
  const startedAt = Date.now();
  startConversationVoiceCall(conversation, {
    startedAt,
    initiatedBy: "user",
    callMode: resolvedMode
  });
  conversation.messages = [
    ...conversation.messages,
    buildVoiceCallEventMessage("connected", {
      role: "user",
      needsReply: true,
      createdAt: startedAt,
      callMode: resolvedMode,
      conversation
    })
  ];
  finalizeConversationMutation(
    conversation,
    {
      scrollBehavior: "bottom",
      focusInput: true
    },
    `${getConversationCallModeShortLabel(resolvedMode)}已接通，点击右侧圆标获取对方回复。`
  );
}

function beginOutgoingVideoCall() {
  beginOutgoingVoiceCall("video");
}

function acceptVoiceCallRequest(messageId = "") {
  const conversation = getConversationById();
  if (!conversation) {
    return;
  }
  const targetMessage =
    conversation.messages.find((message) => String(message?.id || "").trim() === String(messageId || "").trim()) ||
    null;
  const callMode = getConversationCallModeFromMessage(targetMessage);
  if (!targetMessage || !isConversationCallRequestMessage(targetMessage)) {
    setMessagesStatus("未找到对应的通话请求。", "error");
    return;
  }
  if (normalizeVoiceCallRequestStatus(targetMessage.callRequestStatus) !== "pending") {
    setMessagesStatus("这条通话请求已经处理过了。", "error");
    return;
  }
  closeConversationTransientUi();
  updateVoiceCallRequestStatusMessage(conversation, targetMessage.id, "accepted");
  const startedAt = Date.now();
  const openingMessageText = String(targetMessage?.callRequestMessage || "").trim();
  startConversationVoiceCall(conversation, {
    startedAt,
    initiatedBy: "assistant",
    requestMessageId: targetMessage.id,
    callMode
  });
  const nextMessages = [
    ...conversation.messages,
    buildVoiceCallEventMessage("connected", {
      role: "user",
      needsReply: !openingMessageText,
      createdAt: startedAt,
      callMode,
      conversation
    })
  ];
  if (openingMessageText) {
    nextMessages.push(
      normalizeConversationMessage(
        {
          id: `message_${startedAt + 1}_${hashText(`${callMode}_call_opening_${targetMessage.id}_${openingMessageText}`)}`,
          role: "assistant",
          messageType: "text",
          text: openingMessageText,
          time: formatLocalTime(new Date(startedAt + 1)),
          createdAt: startedAt + 1
        },
        nextMessages.length
      )
    );
  }
  conversation.messages = nextMessages;
  finalizeConversationMutation(
    conversation,
    {
      scrollBehavior: "bottom",
      focusInput: true
    },
    `已接通${getConversationCallModeShortLabel(callMode)}。`
  );
  if (!openingMessageText) {
    void requestConversationReply();
  }
}

function rejectVoiceCallRequest(messageId = "") {
  const conversation = getConversationById();
  if (!conversation) {
    return;
  }
  const targetMessage =
    conversation.messages.find((message) => String(message?.id || "").trim() === String(messageId || "").trim()) ||
    null;
  const callMode = getConversationCallModeFromMessage(targetMessage);
  if (!targetMessage || !isConversationCallRequestMessage(targetMessage)) {
    setMessagesStatus("未找到对应的通话请求。", "error");
    return;
  }
  if (normalizeVoiceCallRequestStatus(targetMessage.callRequestStatus) !== "pending") {
    setMessagesStatus("这条通话请求已经处理过了。", "error");
    return;
  }
  closeConversationTransientUi();
  updateVoiceCallRequestStatusMessage(conversation, targetMessage.id, "rejected");
  const rejectedAt = Date.now();
  conversation.messages = [
    ...conversation.messages,
    buildVoiceCallEventMessage("rejected", {
      role: "user",
      needsReply: false,
      createdAt: rejectedAt,
      callMode,
      conversation
    })
  ];
  finalizeConversationMutation(
    conversation,
    {
      scrollBehavior: "bottom"
    },
    `已拒绝${getConversationCallModeShortLabel(callMode)}请求。`
  );
}

function hangupActiveVoiceCall() {
  const conversation = getConversationById();
  if (!conversation || !isConversationVoiceCallActive(conversation)) {
    return;
  }
  const callState = getConversationVoiceCallState(conversation);
  const callMode = normalizeConversationCallMode(callState.callMode);
  const durationSeconds = getVoiceCallDurationSeconds(callState);
  const endedAt = Date.now();
  setConversationVoiceCallState(conversation, null);
  conversation.messages = [
    ...conversation.messages,
    buildVoiceCallEventMessage("ended", {
      role: "user",
      needsReply: false,
      durationSeconds,
      createdAt: endedAt,
      callMode,
      conversation
    })
  ];
  cancelConversationReplyWork(conversation.id);
  finalizeConversationMutation(
    conversation,
    {
      scrollBehavior: "bottom",
      focusInput: true
    },
    `${getConversationCallModeShortLabel(callMode)}已挂断，通话时长 ${formatVoiceCallDurationLabel(durationSeconds)}。`
  );
}

async function sendConversationMessage(text, options = {}) {
  const content = String(text || "").trim();
  if (!content) {
    setMessagesStatus("请输入消息内容后再发送。", "error");
    return;
  }
  if (!ensureChatMutationAllowed("发送消息")) {
    return;
  }

  const conversation = getConversationById();
  if (!conversation) {
    return;
  }

  const contact = getResolvedConversationContact(conversation);
  if (!contact) {
    setMessagesStatus("未找到对应联系人，请先去通讯录检查人物信息。", "error");
    return;
  }

  const sendOptions = options && typeof options === "object" ? options : {};
  const quotedMessage =
    !isConversationVoiceCallActive(conversation) && getConversationSceneMode(conversation) === "online"
      ? getQuotedConversationMessage(conversation)
      : null;
  const createdAt = Date.now();
  const userMessage = normalizeConversationMessage(
    {
      id: `message_${createdAt}_${hashText(content)}`,
      role: "user",
      messageType: quotedMessage ? "quote" : "text",
      quotedText: quotedMessage ? getConversationMessagePreviewText(quotedMessage) : "",
      quotedRole: quotedMessage?.role || "user",
      text: content,
      needsReply: true,
      time: formatLocalTime(),
      createdAt
    },
    conversation.messages.length
  );
  const nextConversation = buildMutatedConversationSnapshot(conversation, (draft) => {
    draft.messages = [...draft.messages, userMessage];
    draft.updatedAt = userMessage.createdAt;
    markConversationMutated(draft, userMessage.updatedAt || userMessage.createdAt);
    bumpConversationReplyContextVersion(draft);
    return draft;
  });
  if (!nextConversation) {
    setMessagesStatus("未能构造待发送的会话快照。", "error");
    return;
  }
  closeConversationTransientUi();
  upsertConversationSnapshotInState(nextConversation, {
    persistMirror: true,
    deferMaintenance: true,
    fallbackToMaintenanceOnFailure: false
  });
  enqueueConversationChatSyncUpsert(nextConversation, {
    reason: "mutation",
    scheduleFlush: false
  });
  setConversationDraft(nextConversation.id, "");
  state.quotedMessageId = "";
  queueConversationRenderOptions({
    scrollBehavior: "bottom",
    focusInput: true
  });
  renderMessagesPage();
  setMessagesStatus(
    sendOptions.requestReplyAfterSend
      ? "消息已发送，正在等待对方回应…"
      : "消息已加入对话，点击右侧圆标向 API 请求回复。",
    "success"
  );
  if (sendOptions.requestReplyAfterSend) {
    void requestConversationReply({
      conversationId: nextConversation.id
    });
  }
}

async function requestConversationReply(options = {}) {
  syncProfileStateFromStorage();
  const requestOptions = options && typeof options === "object" ? options : {};
  if (!ensureChatMutationAllowed("请求回复")) {
    return;
  }
  const backgroundWorkerMode = String(
    requestOptions.backgroundWorkerMode || getBackgroundWorkerMode() || ""
  )
    .trim()
    .toLowerCase();
  const shouldUseReplyWorkerLightMode =
    backgroundWorkerMode === "reply" || Boolean(requestOptions.replyWorkerLightMode);
  const conversationId = String(requestOptions.conversationId || state.activeConversationId).trim();
  if (!conversationId) {
    return;
  }
  let conversation = getConversationById(conversationId);
  if (!conversation) {
    return;
  }
  const suppressUi = Boolean(requestOptions.suppressUi);
  let showingDatabaseWriteState = false;
  const beginDatabaseWriteState = () => {
    if (suppressUi) {
      return;
    }
    state.sendingConversationId = conversation.id;
    showingDatabaseWriteState = true;
    renderMessagesPage();
    setMessagesStatus("数据库写入中…", "success");
  };
  const endDatabaseWriteState = () => {
    if (!showingDatabaseWriteState) {
      return;
    }
    showingDatabaseWriteState = false;
    if (
      state.sendingConversationId === conversation.id &&
      state.requestingConversationId !== conversation.id
    ) {
      state.sendingConversationId = "";
    }
  };
  const forceDirect = Boolean(requestOptions.forceDirect);
  requeueStaleProcessingReplyTasks({
    conversationId: conversation.id
  });
  const processingTask = !forceDirect
    ? getProcessingReplyTaskForConversation(conversation.id)
    : null;
  if (processingTask) {
    state.sendingConversationId = conversation.id;
    primeForegroundReplySync(conversation.id);
    if (!suppressUi) {
      renderMessagesPage();
      setMessagesStatus(
        processingTask.regenerate ? "当前正在重新生成回复…" : "当前正在等待对方回复…"
      );
    }
    return processingTask;
  }

  if (isConversationReplyBusy(conversation.id) && !forceDirect) {
    return;
  }

  const pendingTask = !forceDirect ? getPendingReplyTaskForConversation(conversation.id) : null;
  const explicitTriggeredAwareness = normalizeManualAwarenessTrigger(
    requestOptions.triggeredAwareness
  );
  const pendingTaskTriggeredAwareness = normalizeManualAwarenessTrigger(
    pendingTask?.triggeredAwareness
  );
  const hasRegenerateOption = Object.prototype.hasOwnProperty.call(requestOptions, "regenerate");
  const hasRegenerateInstructionOption = Object.prototype.hasOwnProperty.call(
    requestOptions,
    "regenerateInstruction"
  );
  const hasAwarenessImmediateTriggerOption = Object.prototype.hasOwnProperty.call(
    requestOptions,
    "awarenessImmediateTrigger"
  );
  const isRegenerate = hasRegenerateOption
    ? Boolean(requestOptions.regenerate)
    : Boolean(pendingTask?.regenerate);
  const awarenessImmediateTrigger = hasAwarenessImmediateTriggerOption
    ? Boolean(requestOptions.awarenessImmediateTrigger)
    : Boolean(pendingTask?.awarenessImmediateTrigger);
  const proactiveTrigger = !isRegenerate
    ? normalizeProactiveTriggerRequest(requestOptions.proactiveTrigger)
    : null;
  const isProactiveTrigger = Boolean(proactiveTrigger);
  const regenerateInstruction = String(
    hasRegenerateInstructionOption
      ? requestOptions.regenerateInstruction
      : pendingTask?.regenerateInstruction || ""
  ).trim();
  if (isRegenerate) {
    pushRegenerateDebugEvent(
      "request_start",
      {
        conversationId: conversation.id,
        suppressUi,
        forceDirect,
        hasPendingTask: Boolean(pendingTask),
        hasProcessingTask: Boolean(processingTask),
        currentReplyContextVersion: getConversationReplyContextVersion(conversation),
        messageCount: Array.isArray(conversation.messages) ? conversation.messages.length : 0
      },
      {
        suppressUi
      }
    );
  }
  const preferDirectVisibleReply =
    !forceDirect &&
    !suppressUi &&
    state.activeTab === "chat" &&
    String(state.activeConversationId || "").trim() === conversation.id &&
    !document.hidden;
  const shouldTrackForegroundReplyTask =
    preferDirectVisibleReply && !suppressUi && canUseBackgroundReplyWorker();
  const shouldResumePendingTaskDirectly = Boolean(pendingTask && !suppressUi);
  if (pendingTask && shouldResumePendingTaskDirectly) {
    removeReplyTask(pendingTask.id);
    syncSendingConversationStateFromReplyTasks();
  } else if (pendingTask) {
    return pendingTask;
  }

  if (
    !isRegenerate &&
    (hasPendingConversationChatSyncUpsert(conversation.id) ||
      hasConversationPendingReplyMessages(conversation))
  ) {
    try {
      beginDatabaseWriteState();
      await syncConversationSnapshotNow(conversation, "mutation");
      endDatabaseWriteState();
    } catch (error) {
      endDatabaseWriteState();
      setChatReadonlyMode(true, "数据库不可用，仅只读");
      if (!suppressUi) {
        setMessagesStatus(`消息写入数据库失败：${error?.message || "请求失败"}`, "error");
        renderMessagesPage();
      }
      if (suppressUi) {
        throw error;
      }
      return;
    }
  }

  try {
    conversation = await refreshConversationSnapshotFromCloud(conversation.id, {
      persistMirror: true
    });
  } catch (error) {
    endDatabaseWriteState();
    setChatReadonlyMode(true, "数据库不可用，仅只读");
    if (!suppressUi) {
      setMessagesStatus(`数据库会话刷新失败：${error?.message || "请求失败"}`, "error");
      renderMessagesPage();
    }
    if (suppressUi) {
      throw error;
    }
    return;
  }

  const contact = getResolvedConversationContact(conversation);
  if (!contact) {
    if (!suppressUi) {
      setMessagesStatus("未找到对应联系人，请先去通讯录检查人物信息。", "error");
    }
    return;
  }

  const settings = loadSettings();
  const promptSettings = getConversationPromptSettings(conversation, settings.messagePromptSettings);
  state.chatPromptSettings = promptSettings;
  if (!shouldUseReplyWorkerLightMode) {
    await ensureCloudMemoriesReady(contact.id, {
      importLocalFallback: true
    });
  }
  let history = [];
  let regenerateReplyBatch = null;
  const currentAwarenessCounter = Math.max(
    0,
    Number.parseInt(String(conversation.awarenessCounter || 0), 10) || 0
  );
  const transientAwarenessTrigger = !isRegenerate && !isProactiveTrigger
    ? explicitTriggeredAwareness || pendingTaskTriggeredAwareness
    : null;
  const manualAwarenessTrigger = !isRegenerate && !isProactiveTrigger
    ? transientAwarenessTrigger ||
      normalizeManualAwarenessTrigger(contact.awarenessManualTriggerPending)
    : null;
  const hasManualAwarenessTrigger = Boolean(manualAwarenessTrigger?.text);
  const hasStoredManualAwarenessTrigger =
    hasManualAwarenessTrigger && !Boolean(transientAwarenessTrigger?.text);
  const shouldInjectAwarenessIntoContents =
    hasManualAwarenessTrigger && awarenessImmediateTrigger;
  const awarenessResolvedState = normalizeAwarenessResolvedState(
    contact.awarenessResolvedState,
    contact.awarenessConsumed
  );
  const hasAwarenessMonitor =
    !isRegenerate &&
    !isProactiveTrigger &&
    hasConfiguredAwareness(contact) &&
    !Boolean(contact.awarenessHistoryHidden);
  const shouldEvaluateAwareness =
    hasAwarenessMonitor &&
    !hasManualAwarenessTrigger &&
    currentAwarenessCounter < promptSettings.awarenessIntervalRounds &&
    awarenessResolvedState !== "triggered" &&
    awarenessResolvedState !== "expired";
  let triggeredAwareness = hasManualAwarenessTrigger
    ? {
        text: String(manualAwarenessTrigger.text || "").trim(),
        emotionShift: String(manualAwarenessTrigger.emotionShift || "").trim(),
        sensitivity: normalizeAwarenessSensitivity(manualAwarenessTrigger.sensitivity)
      }
    : null;
  let awarenessTriggered = false;
  let awarenessHistoryEntry = null;
  let requestedPendingUserMessageIds = [];
  let pendingUserMessagesForPrompt = [];
  let continueAssistant = false;

  if (isRegenerate) {
    const latestReplyBatch = getLatestAssistantReplyBatch(conversation);
    if (latestReplyBatch?.blocked) {
      pushRegenerateDebugEvent(
        "blocked_by_pending_user_messages",
        {
          conversationId: conversation.id
        },
        {
          level: "warn",
          suppressUi
        }
      );
      if (!suppressUi) {
        setMessagesStatus("当前还有待回复的新消息，请先完成这一轮对话。", "error");
      }
      return;
    }
    if (!latestReplyBatch) {
      pushRegenerateDebugEvent(
        "latest_reply_batch_missing",
        {
          conversationId: conversation.id
        },
        {
          level: "warn",
          suppressUi
        }
      );
      if (!suppressUi) {
        setMessagesStatus("当前没有可重回的上一轮回复。", "error");
      }
      return;
    }
    regenerateReplyBatch = latestReplyBatch;
  } else {
    repairStalePendingUserMessages(conversation, {
      persist: true,
      skipWhenBusy: true
    });
    const pendingUserMessages = conversation.messages.filter(
      (message) => message.role === "user" && message.needsReply
    );
    if (!pendingUserMessages.length) {
      const hasContinuationSource = conversation.messages.some(
        (message) => message.role === "assistant"
      );
      if (!hasContinuationSource && !shouldInjectAwarenessIntoContents && !isProactiveTrigger) {
        if (!suppressUi) {
          setMessagesStatus("当前没有待推送到 API 的新消息。");
        }
        return;
      }
      continueAssistant = !shouldInjectAwarenessIntoContents && !isProactiveTrigger;
    } else {
      pendingUserMessagesForPrompt = pendingUserMessages.map((message) => ({ ...message }));
      requestedPendingUserMessageIds = pendingUserMessages.map((message) =>
        String(message.id || "").trim()
      );
    }
  }

  closeConversationTransientUi();
  let replyContextVersion = getConversationReplyContextVersion(conversation);
  let foregroundReplyTaskId = "";

  if (
    canUseBackgroundReplyWorker() &&
    !forceDirect &&
    !isProactiveTrigger &&
    !shouldResumePendingTaskDirectly &&
    !preferDirectVisibleReply
  ) {
    const task = enqueueReplyTask(conversation.id, {
      regenerate: isRegenerate,
      regenerateInstruction,
      awarenessImmediateTrigger,
      triggeredAwareness: transientAwarenessTrigger
    });
    primeForegroundReplySync(conversation.id);
    if (!suppressUi) {
      renderMessagesPage();
      setMessagesStatus(
        isRegenerate
          ? "已加入重回队列，后台会继续生成回复。"
          : isProactiveTrigger
            ? "已加入主动发起队列，后台会继续生成消息。"
          : continueAssistant
            ? "已加入续写队列，离开 chat 也会继续收消息。"
            : "已加入回复队列，离开 chat 也会继续收消息。",
        "success"
      );
    }
    return task;
  }

  if (shouldEvaluateAwareness) {
    const probability = getAwarenessSensitivityProbability(contact.awarenessSensitivity);
    awarenessTriggered = Math.random() < probability;
    const nextAwarenessRound = currentAwarenessCounter + 1;
    const isFinalMissRound =
      !awarenessTriggered && nextAwarenessRound >= promptSettings.awarenessIntervalRounds;
    awarenessHistoryEntry = buildAwarenessHistoryItem(
      awarenessTriggered,
      nextAwarenessRound,
      awarenessTriggered
        ? "已命中这次察觉判断，后续会主动把这条额外信息带入对话。"
        : isFinalMissRound
          ? `已满 ${promptSettings.awarenessIntervalRounds} 轮仍未命中，后续不再触发。`
          : "本次未命中察觉判断，下一轮会继续判断。",
      contact.awarenessTitle || contact.awarenessText
    );
    if (awarenessTriggered) {
      triggeredAwareness = {
        text: String(contact.awarenessText || "").trim(),
        emotionShift: String(contact.awarenessEmotionShift || "").trim(),
        sensitivity: normalizeAwarenessSensitivity(contact.awarenessSensitivity)
      };
    }
  }

  try {
    if (shouldTrackForegroundReplyTask) {
      const foregroundReplyTask = beginForegroundReplyTask(conversation.id, {
        regenerate: isRegenerate,
        regenerateInstruction
      });
      foregroundReplyTaskId = String(foregroundReplyTask?.id || "").trim();
    }
    clearForegroundReplySync(conversation.id);
    if (isRegenerate) {
      replyContextVersion = bumpConversationReplyContextVersion(conversation);
      pushRegenerateDebugEvent(
        "reply_context_bumped",
        {
          conversationId: conversation.id,
          replyContextVersion
        },
        {
          suppressUi
        }
      );
      const latestReplyBatch = regenerateReplyBatch || getLatestAssistantReplyBatch(conversation);
      if (!latestReplyBatch || latestReplyBatch.blocked) {
        pushRegenerateDebugEvent(
          "reply_batch_missing_after_bump",
          {
            conversationId: conversation.id,
            replyContextVersion,
            blocked: Boolean(latestReplyBatch?.blocked)
          },
          {
            level: "warn",
            suppressUi
          }
        );
        if (!suppressUi) {
          setMessagesStatus("当前没有可重回的上一轮回复。", "error");
        }
        return;
      }
      regenerateReplyBatch = latestReplyBatch;
      pushRegenerateDebugEvent(
        "history_trimmed_for_regenerate",
        {
          conversationId: conversation.id,
          replyContextVersion,
          startIndex: latestReplyBatch.startIndex,
          endIndex: latestReplyBatch.endIndex,
          trimmedHistoryCount: latestReplyBatch.startIndex
        },
        {
          suppressUi
        }
      );
      const workingConversation = buildMutatedConversationSnapshot(conversation, (draft) => {
        draft.messages = draft.messages.slice(0, latestReplyBatch.startIndex);
        recalculateConversationUpdatedAt(draft);
        return draft;
      });
      history = selectConversationHistory(
        workingConversation?.messages || [],
        promptSettings.historyRounds
      );
    } else {
      state.requestingConversationId = conversation.id;
      if (!suppressUi) {
        renderMessagesPage();
      }
      if (!shouldUseReplyWorkerLightMode) {
        await maybeAutoGenerateSchedulesForConversation(conversation);
      }
      history = selectConversationHistory(conversation.messages, promptSettings.historyRounds);
    }

    state.requestingConversationId = conversation.id;
    state.sendingConversationId = conversation.id;
    if (!suppressUi) {
      setMessagesStatus(
        isRegenerate
          ? "正在重新生成回复…"
          : isProactiveTrigger
            ? "正在生成角色主动消息…"
            : "正在等待对方回复…"
      );
      renderMessagesPage();
    }

    const replyResult = await requestChatReplyText(
      settings,
      state.profile,
      contact,
      history,
      promptSettings,
      {
        regenerate: isRegenerate,
        regenerateInstruction,
        triggeredAwareness,
        awarenessInContents: shouldInjectAwarenessIntoContents,
        pendingUserMessages: pendingUserMessagesForPrompt,
        continueAssistant,
        proactiveTrigger,
        skipMemoryRecallWrite: shouldUseReplyWorkerLightMode,
        sceneMode: conversation.sceneMode === "offline" ? "offline" : "online",
        conversation
      }
    );
    if (isRegenerate) {
      pushRegenerateDebugEvent(
        "api_reply_received",
        {
          conversationId: conversation.id,
          replyContextVersion,
          replyLength: String(replyResult?.text || "").length
        },
        {
          suppressUi
        }
      );
    }
    const updatedConversation = getConversationById(conversation.id);
    if (!updatedConversation) {
      if (isRegenerate) {
        pushRegenerateDebugEvent(
          "conversation_missing_after_api",
          {
            conversationId: conversation.id,
            replyContextVersion
          },
          {
            level: "error",
            suppressUi,
            statusMessage: "重回失败：请求返回后找不到当前会话，请重试。",
            statusTone: "error"
          }
        );
      }
      return;
    }
    if (!isConversationReplyContextCurrent(conversation.id, replyContextVersion)) {
      if (isRegenerate) {
        pushRegenerateDebugEvent(
          "reply_context_mismatch_after_api",
          {
            conversationId: conversation.id,
            expectedReplyContextVersion: replyContextVersion,
            actualReplyContextVersion: getConversationReplyContextVersion(updatedConversation)
          },
          {
            level: "error",
            suppressUi,
            statusMessage: "重回已中断：会话在生成期间被刷新或覆盖，请重试。",
            statusTone: "error"
          }
        );
      }
      return;
    }
    if (!isRegenerate) {
      const requestedPendingUserMessageIdSet = new Set(
        requestedPendingUserMessageIds.filter(Boolean)
      );
      if (
        !requestedPendingUserMessageIdSet.size &&
        !continueAssistant &&
        !isProactiveTrigger &&
        !shouldInjectAwarenessIntoContents
      ) {
        return;
      }
      const hasRequestedMessages =
        !requestedPendingUserMessageIdSet.size ||
        updatedConversation.messages.some((message) =>
          requestedPendingUserMessageIdSet.has(String(message?.id || "").trim())
        );
      if (!hasRequestedMessages) {
        return;
      }
    }

    const replyMessageBaseConversation = isRegenerate
      ? buildMutatedConversationSnapshot(updatedConversation, (draft) => {
          const latestReplyBatch = regenerateReplyBatch || getLatestAssistantReplyBatch(draft);
          draft.messages = latestReplyBatch
            ? draft.messages.slice(0, latestReplyBatch.startIndex)
            : draft.messages;
          return draft;
        })
      : updatedConversation;
    const replyMessages = buildAssistantReplyMessagesForConversation(
      replyMessageBaseConversation || updatedConversation,
      replyResult.text,
      promptSettings,
      replyResult.privacySession
    );
    if (!replyMessages.length) {
      if (isRegenerate) {
        pushRegenerateDebugEvent(
          "created_messages_empty",
          {
            conversationId: conversation.id,
            replyContextVersion
          },
          {
            level: "error",
            suppressUi,
            statusMessage: "重回失败：回复已生成，但没有可展示的新消息。",
            statusTone: "error"
          }
        );
      }
      return;
    }
    const {
      messages: createdMessages,
      clearedActiveCall: assistantEndedActiveCall
    } = applyAssistantEndedCallMessagesToConversation(updatedConversation, replyMessages);
    const nextAwarenessCounter =
      !isRegenerate && hasAwarenessMonitor && !hasManualAwarenessTrigger
        ? currentAwarenessCounter + 1
        : currentAwarenessCounter;
    const finalConversation = buildMutatedConversationSnapshot(updatedConversation, (draft) => {
      if (isRegenerate) {
        const latestReplyBatch = regenerateReplyBatch || getLatestAssistantReplyBatch(draft);
        if (latestReplyBatch && !latestReplyBatch.blocked) {
          draft.messages = draft.messages.slice(0, latestReplyBatch.startIndex);
        }
      }
      draft.messages = [...draft.messages, ...createdMessages];
      if (assistantEndedActiveCall) {
        setConversationVoiceCallState(draft, null);
      }
      recalculateConversationUpdatedAt(draft);
      markConversationMutated(
        draft,
        createdMessages[createdMessages.length - 1]?.updatedAt ||
          createdMessages[createdMessages.length - 1]?.createdAt ||
          Date.now()
      );
      if (!isRegenerate) {
        clearConversationPendingReplyFlags(draft, requestedPendingUserMessageIds);
        draft.awarenessCounter = nextAwarenessCounter;
        draft.memorySummaryCounter = (Number(draft.memorySummaryCounter) || 0) + 1;
      }
      return draft;
    });
    if (!finalConversation) {
      if (isRegenerate) {
        pushRegenerateDebugEvent(
          "final_conversation_build_failed",
          {
            conversationId: conversation.id,
            replyContextVersion
          },
          {
            level: "error",
            suppressUi,
            statusMessage: "重回失败：未能构造替换后的会话快照。",
            statusTone: "error"
          }
        );
      }
      return;
    }
    await syncConversationSnapshotNow(finalConversation, "mutation");
    if (isRegenerate) {
      pushRegenerateDebugEvent(
        "final_conversation_synced",
        {
          conversationId: conversation.id,
          replyContextVersion,
          finalMessageCount: Array.isArray(finalConversation.messages) ? finalConversation.messages.length : 0,
          createdMessageCount: createdMessages.length
        },
        {
          suppressUi
        }
      );
    }
    upsertConversationSnapshotInState(finalConversation, {
      persistMirror: true,
      deferMaintenance: true,
      fallbackToMaintenanceOnFailure: false
    });
    const latestConversation = getConversationById(conversation.id);
    if (!latestConversation) {
      if (isRegenerate) {
        pushRegenerateDebugEvent(
          "latest_conversation_missing_after_sync",
          {
            conversationId: conversation.id,
            replyContextVersion
          },
          {
            level: "error",
            suppressUi,
            statusMessage: "重回失败：写入成功后找不到最新会话，请重试。",
            statusTone: "error"
          }
        );
      }
      return;
    }
    if (!isConversationReplyContextCurrent(conversation.id, replyContextVersion)) {
      if (isRegenerate) {
        pushRegenerateDebugEvent(
          "reply_context_mismatch_after_sync",
          {
            conversationId: conversation.id,
            expectedReplyContextVersion: replyContextVersion,
            actualReplyContextVersion: getConversationReplyContextVersion(latestConversation)
          },
          {
            level: "error",
            suppressUi,
            statusMessage: "重回已中断：写库后会话版本发生变化，请重试。",
            statusTone: "error"
          }
        );
      }
      return;
    }
    if (
      isRegenerate &&
      !suppressUi &&
      state.activeTab === "chat" &&
      String(state.activeConversationId || "").trim() === conversation.id
    ) {
      setPendingAssistantReveal(conversation.id, createdMessages, {
        expectedReplyContextVersion: replyContextVersion,
        alreadyPersisted: true
      });
      queueConversationRenderOptions({
        scrollBehavior: "preserve",
        scrollSnapshot: captureConversationScrollSnapshot()
      });
      renderMessagesPage();
    }
    const revealedMessages = await appendAssistantReplyBatch(
      latestConversation,
      replyResult.text,
      promptSettings,
      replyResult.privacySession,
      {
        alreadyPersisted: true,
        prebuiltMessages: createdMessages,
        expectedReplyContextVersion: replyContextVersion,
        pendingUserMessageIds: isRegenerate ? [] : requestedPendingUserMessageIds,
        suppressUi
      }
    );
    if (!revealedMessages.length) {
      if (isRegenerate) {
        pushRegenerateDebugEvent(
          "append_reply_batch_empty",
          {
            conversationId: conversation.id,
            replyContextVersion,
            alreadyPersisted: true,
            createdMessageCount: createdMessages.length
          },
          {
            level: "error",
            suppressUi,
            statusMessage: "重回结果已写入数据库，但前端没有成功追加新气泡，请查看控制台日志。",
            statusTone: "error"
          }
        );
      }
      return;
    }
    if (isRegenerate) {
      pushRegenerateDebugEvent(
        "append_reply_batch_success",
        {
          conversationId: conversation.id,
          replyContextVersion,
          revealedMessageCount: revealedMessages.length
        },
        {
          suppressUi
        }
      );
    }
    if (replyResult.assistantPresenceUpdate && latestConversation.contactId) {
      setContactPresenceEntry(latestConversation.contactId, replyResult.assistantPresenceUpdate);
      if (state.sceneModalOpen) {
        updateSceneModalFields(buildSceneDraft(latestConversation));
      }
      if (state.sceneSyncModalOpen) {
        renderSceneSyncModal();
      }
    }
    pushConversationReplyNotification(contact, latestConversation, createdMessages);
    repairPersistedChatWorldbookMounts(promptSettings, latestConversation);
    if (!isRegenerate) {
      latestConversation.awarenessCounter = nextAwarenessCounter;
      if (
        hasStoredManualAwarenessTrigger ||
        awarenessTriggered ||
        shouldEvaluateAwareness ||
        (hasAwarenessMonitor && nextAwarenessCounter > MAX_AWARENESS_MONITOR_ROUNDS)
      ) {
        const contactIndex = state.contacts.findIndex((item) => item.id === contact.id);
        if (contactIndex >= 0) {
          const previousContact = state.contacts[contactIndex];
          const manualHistoryEntry = hasStoredManualAwarenessTrigger
            ? buildAwarenessHistoryItem(
                true,
                currentAwarenessCounter,
                "用户手动触发，本次不计入后台概率判断。",
                manualAwarenessTrigger?.title || manualAwarenessTrigger?.text || ""
              )
            : null;
          const nextResolvedState = awarenessTriggered
            ? "triggered"
            : shouldEvaluateAwareness && nextAwarenessCounter >= promptSettings.awarenessIntervalRounds
              ? "expired"
              : normalizeAwarenessResolvedState(
                  previousContact.awarenessResolvedState,
                  previousContact.awarenessConsumed
                );
          const shouldHideAwarenessMonitor =
            Boolean(previousContact.awarenessHistoryHidden) ||
            nextAwarenessCounter > MAX_AWARENESS_MONITOR_ROUNDS;
          state.contacts[contactIndex] = {
            ...previousContact,
            awarenessConsumed: nextResolvedState === "triggered",
            awarenessResolvedState: nextResolvedState,
            awarenessHistoryHidden: shouldHideAwarenessMonitor,
            awarenessManualTriggerPending: hasStoredManualAwarenessTrigger
              ? null
              : normalizeManualAwarenessTrigger(previousContact.awarenessManualTriggerPending),
            awarenessCheckCount:
              Math.max(
                0,
                Number.parseInt(
                  String(previousContact.awarenessCheckCount || 0),
                  10
                ) || 0
              ) + (shouldEvaluateAwareness ? 1 : 0),
            awarenessTriggerCount:
              Math.max(
                0,
                Number.parseInt(
                  String(previousContact.awarenessTriggerCount || 0),
                  10
                ) || 0
              ) + (awarenessTriggered ? 1 : 0),
            awarenessLastCheckedAt:
              shouldEvaluateAwareness
                ? awarenessHistoryEntry?.checkedAt || Date.now()
                : Number(previousContact.awarenessLastCheckedAt) || 0,
            awarenessLastTriggeredAt:
              awarenessTriggered
                ? awarenessHistoryEntry?.checkedAt || Date.now()
                : Number(previousContact.awarenessLastTriggeredAt) || 0,
            awarenessHistory:
              manualHistoryEntry
                ? appendAwarenessHistory(previousContact, manualHistoryEntry)
                : shouldEvaluateAwareness && awarenessHistoryEntry
                  ? appendAwarenessHistory(previousContact, awarenessHistoryEntry)
                  : normalizeAwarenessHistory(previousContact.awarenessHistory || []),
            updatedAt: Date.now()
          };
          persistContacts();
        }
      }
      if (!shouldUseReplyWorkerLightMode) {
        void maybeExtractConversationMemories(latestConversation.id, settings, promptSettings);
      }
    }
    if (!suppressUi) {
      setMessagesStatus(
        isRegenerate
          ? "已重新生成回复。"
          : isProactiveTrigger
            ? "已生成角色主动消息。"
            : "已收到回复。",
        "success"
      );
    }
  } catch (error) {
    if (isRegenerate) {
      pushRegenerateDebugEvent(
        "request_failed",
        {
          conversationId: conversation.id,
          errorMessage: error?.message || "请求失败"
        },
        {
          level: "error",
          suppressUi
        }
      );
    }
    endDatabaseWriteState();
    if (!suppressUi) {
      setMessagesStatus(
        `${isProactiveTrigger ? "主动消息生成失败" : "回复失败"}：${error?.message || "请求失败"}`,
        "error"
      );
    }
    if (suppressUi) {
      throw error;
    }
  } finally {
    endDatabaseWriteState();
    finishForegroundReplyTask(foregroundReplyTaskId);
    const shouldRestoreConversationScroll =
      !suppressUi &&
      state.activeTab === "chat" &&
      String(state.activeConversationId || "").trim() === conversation.id;
    const scrollSnapshot = shouldRestoreConversationScroll
      ? captureConversationScrollSnapshot()
      : null;
    const shouldStickToBottom = shouldRestoreConversationScroll
      ? isConversationHistoryNearBottom()
      : false;
    state.requestingConversationId = "";
    state.sendingConversationId = "";
    if (!suppressUi) {
      if (shouldRestoreConversationScroll) {
        queueConversationRenderOptions({
          scrollBehavior: shouldStickToBottom ? "bottom" : "preserve",
          scrollSnapshot: shouldStickToBottom ? null : scrollSnapshot
        });
      }
      renderMessagesPage();
      focusConversationInput();
    }
    scheduleConversationStorageMaintenance();
  }
}

function syncSendingConversationStateFromReplyTasks() {
  requeueStaleProcessingReplyTasks();
  const activeConversationId = String(state.activeConversationId || "").trim();
  if (!activeConversationId) {
    if (
      !loadReplyTasks().some((task) => task.status === "processing" && !isReplyTaskStale(task)) &&
      !state.requestingConversationId
    ) {
      state.sendingConversationId = "";
    }
    return;
  }
  const activeTask = getProcessingReplyTaskForConversation(activeConversationId);
  if (activeTask) {
    state.sendingConversationId = activeConversationId;
    return;
  }
  if (
    state.requestingConversationId === activeConversationId &&
    state.sendingConversationId === activeConversationId
  ) {
    return;
  }
  if (state.sendingConversationId === activeConversationId) {
    state.sendingConversationId = "";
  }
}

async function resumePendingReplyTaskForConversation(
  conversationId = state.activeConversationId
) {
  const resolvedConversationId = String(conversationId || "").trim();
  requeueStaleProcessingReplyTasks({
    conversationId: resolvedConversationId
  });
  if (
    !resolvedConversationId ||
    state.replyResumeBusy ||
    isConversationReplyBusy(resolvedConversationId) ||
    document.hidden
  ) {
    return false;
  }
  const pendingTask = getPendingReplyTaskForConversation(resolvedConversationId);
  if (!pendingTask) {
    return false;
  }
  const conversation = getConversationById(resolvedConversationId);
  const hasPendingUserMessages = conversation?.messages?.some(
    (message) => message.role === "user" && message.needsReply
  );
  const hasRegenerateSource = Boolean(
    pendingTask.regenerate && getLatestAssistantReplyBatch(conversation)
  );
  const hasImmediateAwareness = Boolean(pendingTask.awarenessImmediateTrigger);
  if (!conversation || (!hasPendingUserMessages && !hasRegenerateSource && !hasImmediateAwareness)) {
    removeReplyTask(pendingTask.id);
    syncSendingConversationStateFromReplyTasks();
    return false;
  }

  state.replyResumeBusy = true;
  removeReplyTask(pendingTask.id);
  syncSendingConversationStateFromReplyTasks();
  try {
    await requestConversationReply({
      conversationId: resolvedConversationId,
      forceDirect: true,
      regenerate: pendingTask.regenerate,
      regenerateInstruction: pendingTask.regenerateInstruction,
      awarenessImmediateTrigger: pendingTask.awarenessImmediateTrigger,
      triggeredAwareness: pendingTask.triggeredAwareness
    });
    return true;
  } finally {
    state.replyResumeBusy = false;
  }
}

async function pumpBackgroundReplyTasks() {
  if (!isBackgroundMessagesWorker() || state.backgroundReplyTaskBusy) {
    return;
  }
  requeueStaleProcessingReplyTasks();
  const nextTask = getNextPendingReplyTask();
  if (!nextTask) {
    return;
  }

  state.backgroundReplyTaskBusy = true;
  updateReplyTask(nextTask.id, {
    status: "processing",
    errorMessage: "",
    startedAt: Date.now(),
    heartbeatAt: Date.now()
  });
  refreshStateFromStorage();
  const stopHeartbeat = startReplyTaskHeartbeat(nextTask.id);

  try {
    await requestConversationReply({
      conversationId: nextTask.conversationId,
      regenerate: nextTask.regenerate,
      regenerateInstruction: nextTask.regenerateInstruction,
      awarenessImmediateTrigger: nextTask.awarenessImmediateTrigger,
      triggeredAwareness: nextTask.triggeredAwareness,
      backgroundWorkerMode: "reply",
      replyWorkerLightMode: true,
      forceDirect: true,
      suppressUi: true
    });
    removeReplyTask(nextTask.id);
  } catch (error) {
    updateReplyTask(nextTask.id, {
      status: "error",
      errorMessage: error?.message || "请求失败"
    });
  } finally {
    stopHeartbeat();
    state.backgroundReplyTaskBusy = false;
    if (getNextPendingReplyTask()) {
      window.setTimeout(() => {
        void pumpBackgroundReplyTasks();
      }, 40);
    }
  }
}

function initBackgroundReplyWorker() {
  requeueStaleProcessingReplyTasks();
  refreshStateFromStorage();
  scheduleChatSyncStartupRetry();
  window.addEventListener("storage", (event) => {
    const targetKey = String(event?.key || "").trim();
    if (targetKey === MESSAGE_REPLY_TASKS_KEY) {
      void pumpBackgroundReplyTasks();
    }
  });
  window.setTimeout(() => {
    void pumpBackgroundReplyTasks();
  }, 80);
}

function initBackgroundAutomationWorker() {
  refreshStateFromStorage();
  sanitizePresenceStateReferences();
  persistPresenceState();
  persistConversations();
  initAutoScheduleClock();
  initProactiveTriggerClock();
  window.addEventListener("message", (event) => {
    if (event.data?.type !== "pulse-generator-proactive-trigger-rescan") {
      return;
    }
    void maybeRunConfiguredProactiveMessages({
      initialCatchup: Boolean(event.data?.payload?.initialCatchup)
    });
  });
  window.addEventListener("storage", (event) => {
    const targetKey = String(event?.key || "").trim();
    if (!targetKey) {
      return;
    }
    if (targetKey === MESSAGE_MEMORIES_KEY) {
      refreshStateFromStorage();
      const memoryContactIds = Array.from(
        new Set(
          (state.memories || [])
            .map((item) => String(item?.contactId || "").trim())
            .filter(Boolean)
        )
      );
      memoryContactIds.forEach((contactId) => {
        void syncMissingLocalMemoriesForContact(contactId);
      });
      return;
    }
    if (
      [
        MESSAGE_THREADS_KEY,
        MESSAGE_SHARE_INBOX_KEY,
        MESSAGE_CONTACTS_KEY,
        SETTINGS_KEY,
        WORLD_BOOKS_KEY,
        SCHEDULE_ENTRIES_KEY,
        MESSAGE_COMMON_PLACES_KEY,
        MESSAGE_PRESENCE_STATE_KEY
      ].includes(targetKey)
    ) {
      refreshStateFromStorage();
      sanitizePresenceStateReferences();
      if (
        [
          SETTINGS_KEY,
          SCHEDULE_ENTRIES_KEY,
          MESSAGE_THREADS_KEY,
          MESSAGE_CONTACTS_KEY
        ].includes(targetKey)
      ) {
        void maybeRunConfiguredProactiveMessages({
          initialCatchup: targetKey === SETTINGS_KEY || targetKey === SCHEDULE_ENTRIES_KEY
        });
      }
    }
  });
}

function initBackgroundMessagesWorker() {
  initBackgroundReplyWorker();
  initBackgroundAutomationWorker();
}

function refreshStateFromStorage(options = {}) {
  const requestOptions = options && typeof options === "object" ? options : {};
  const settings = loadSettings();
  const currentConversations = Array.isArray(state.conversations) ? state.conversations.slice() : [];
  const loadedLocalConversations = loadConversations();
  const shouldLoadLocalConversations =
    Boolean(requestOptions.forceLocalConversations) ||
    state.chatReadonlyMode ||
    !state.chatCloudHydrated ||
    isBackgroundMessagesWorker();
  state.profile = loadProfile();
  if (shouldLoadLocalConversations) {
    state.conversations = mergePreferredLocalConversations(
      currentConversations,
      loadedLocalConversations
    );
    const recoveredConversationMessages = applyConversationReplyRecovery(state.conversations);
    if (recoveredConversationMessages) {
      persistConversationMirror(state.conversations);
      (Array.isArray(recoveredConversationMessages) ? recoveredConversationMessages : []).forEach(
        (conversationId) => {
          enqueueConversationChatSyncUpsert(String(conversationId || "").trim(), {
            scheduleFlush: false
          });
        }
      );
    }
  } else {
    state.conversations = normalizeCloudConversationList(currentConversations);
  }
  state.contacts = loadContacts(state.conversations);
  const consumedSharedMessages = consumePendingMessageShareInbox();
  if (consumedSharedMessages) {
    state.contacts = loadContacts(state.conversations);
    queueChatSyncFlush("mutation", 0);
  }
  state.worldbooks = loadWorldbooks();
  state.commonPlaces = loadCommonPlaces();
  state.presenceState = loadPresenceState();
  state.journalEntries = loadJournalEntries();
  state.memories = loadMessageMemories();
  state.recentLocations = loadRecentLocations();
  state.chatPromptSettings = state.activeConversationId
    ? getConversationPromptSettings(
        getConversationById(state.activeConversationId),
        settings.messagePromptSettings
      )
    : buildConversationPromptSettingsBase(settings.messagePromptSettings);
  state.chatGlobalSettings = normalizeChatGlobalSettings(settings.chatGlobalSettings);
  sanitizePresenceStateReferences();
  syncSendingConversationStateFromReplyTasks();
  persistContacts();
  scheduleMemoryCloudBootstrapSync();
  scheduleChatSyncStartupRetry();
}

function primeForegroundReplySync(
  conversationId = state.activeConversationId,
  durationMs = FOREGROUND_REPLY_SYNC_GRACE_MS
) {
  const resolvedConversationId = String(conversationId || "").trim();
  if (!resolvedConversationId) {
    return false;
  }
  foregroundReplySyncConversationId = resolvedConversationId;
  foregroundReplySyncUntil = Math.max(
    Number(foregroundReplySyncUntil) || 0,
    Date.now() + Math.max(0, Number(durationMs) || 0)
  );
  return true;
}

function clearForegroundReplySync(conversationId = "") {
  const resolvedConversationId = String(conversationId || "").trim();
  if (resolvedConversationId && foregroundReplySyncConversationId !== resolvedConversationId) {
    return;
  }
  foregroundReplySyncConversationId = "";
  foregroundReplySyncUntil = 0;
}

function getForegroundReplySyncTask(conversationId = "") {
  const resolvedConversationId = String(conversationId || "").trim();
  if (!resolvedConversationId) {
    return null;
  }
  return getReplyTaskForConversation(resolvedConversationId, ["pending", "processing", "error"]);
}

function isDirectForegroundReplyFlowActive(conversationId = state.activeConversationId) {
  const resolvedConversationId = String(conversationId || "").trim();
  if (!resolvedConversationId) {
    return false;
  }
  if (
    state.activeTab !== "chat" ||
    String(state.activeConversationId || "").trim() !== resolvedConversationId ||
    document.hidden
  ) {
    return false;
  }
  const activeForegroundTaskId = String(state.activeForegroundReplyTaskId || "").trim();
  const activeForegroundTask =
    activeForegroundTaskId
      ? loadReplyTasks().find((task) => task.id === activeForegroundTaskId) || null
      : null;
  return (
    state.requestingConversationId === resolvedConversationId &&
    (!getForegroundReplySyncTask(resolvedConversationId) ||
      String(activeForegroundTask?.conversationId || "").trim() === resolvedConversationId)
  );
}

function shouldRunForegroundReplySync() {
  if (isBackgroundMessagesWorker() || document.hidden) {
    return false;
  }
  const activeConversationId = String(state.activeConversationId || "").trim();
  if (state.activeTab !== "chat" || !activeConversationId) {
    return false;
  }
  if (isDirectForegroundReplyFlowActive(activeConversationId)) {
    return false;
  }
  const hasActiveReplyWork = Boolean(getForegroundReplySyncTask(activeConversationId));
  if (hasActiveReplyWork) {
    primeForegroundReplySync(activeConversationId);
    return true;
  }
  if (
    foregroundReplySyncConversationId === activeConversationId &&
    Date.now() < (Number(foregroundReplySyncUntil) || 0)
  ) {
    return true;
  }
  if (foregroundReplySyncConversationId === activeConversationId) {
    clearForegroundReplySync(activeConversationId);
  }
  return false;
}

function syncForegroundConversationFromStorage() {
  if (!shouldRunForegroundReplySync()) {
    return false;
  }
  const activeConversationId = String(state.activeConversationId || "").trim();
  const previousConversation = getConversationById(activeConversationId);
  const previousMessageCount = Array.isArray(previousConversation?.messages)
    ? previousConversation.messages.length
    : 0;
  const scrollSnapshot = captureConversationScrollSnapshot();
  refreshStateFromStorage();
  const nextConversation = getConversationById(activeConversationId);
  const nextMessageCount = Array.isArray(nextConversation?.messages) ? nextConversation.messages.length : 0;
  const hasActiveReplyWork = Boolean(getForegroundReplySyncTask(activeConversationId));
  if (hasActiveReplyWork || nextMessageCount > previousMessageCount) {
    primeForegroundReplySync(activeConversationId);
  }
  queueConversationRenderOptions({
    scrollBehavior: nextMessageCount > previousMessageCount ? "bottom" : "preserve",
    scrollSnapshot
  });
  renderMessagesPage();
  return true;
}

function initForegroundReplySyncClock() {
  if (foregroundReplySyncTimerId) {
    window.clearInterval(foregroundReplySyncTimerId);
  }
  if (isBackgroundMessagesWorker()) {
    return;
  }
  foregroundReplySyncTimerId = window.setInterval(() => {
    if (
      state.profileEditorOpen ||
      state.contactEditorOpen ||
      state.chatSettingsOpen ||
      state.locationModalOpen ||
      state.voiceModalOpen ||
      state.photoModalOpen ||
      state.innerThoughtModalOpen ||
      state.regenerateModalOpen
    ) {
      return;
    }
    syncForegroundConversationFromStorage();
  }, FOREGROUND_REPLY_SYNC_INTERVAL_MS);
}

function attachEvents() {
  if (messagesNavBtnEl) {
    messagesNavBtnEl.addEventListener("click", () => {
      messagesNavBtnEl.blur();
      if (state.activeConversationId && state.activeTab === "chat") {
        closeConversationTransientUi();
        clearConversationMessageSelection();
        state.activeConversationId = "";
        setMessagesStatus("");
        renderMessagesPage();
        return;
      }
      if (isEmbeddedView()) {
        requestEmbeddedClose();
        return;
      }
      window.location.href = "./index.html";
    });
  }

  if (messagesSearchBtnEl) {
    messagesSearchBtnEl.addEventListener("click", () => {
      if (state.activeTab !== "contacts") {
        return;
      }
      state.contactsSearchOpen = !state.contactsSearchOpen;
      if (!state.contactsSearchOpen) {
        state.query = "";
      }
      renderMessagesPage();
      if (state.contactsSearchOpen) {
        window.setTimeout(() => {
          messagesSearchInputEl?.focus();
        }, 0);
      }
    });
  }

  if (messagesMessageSelectBtnEl) {
    messagesMessageSelectBtnEl.addEventListener("click", () => {
      const conversation = getConversationById();
      if (!conversation) {
        return;
      }
      if (!Array.isArray(conversation.messages) || !conversation.messages.length) {
        setMessagesStatus("当前会话还没有消息可供多选删除。", "error");
        return;
      }
      if (isConversationReplyBusy(conversation.id)) {
        setMessagesStatus("当前正在等待回复，暂时不能多选删除。", "error");
        return;
      }
      const scrollSnapshot = captureConversationScrollSnapshot();
      if (isConversationMessageSelectionActive(conversation.id)) {
        clearConversationMessageSelection();
      } else {
        setConversationMessageSelectionMode(true, conversation.id);
      }
      queueConversationRenderOptions({
        scrollBehavior: "preserve",
        scrollSnapshot
      });
      renderMessagesPage();
    });
  }

  if (messagesChatSettingsBtnEl) {
    messagesChatSettingsBtnEl.addEventListener("click", () => {
      if (!state.activeConversationId) {
        return;
      }
      closeConversationTransientUi();
      setChatSettingsOpen(true);
    });
  }

  if (messagesChatSceneBtnEl) {
    messagesChatSceneBtnEl.addEventListener("click", () => {
      if (!state.activeConversationId) {
        return;
      }
      closeConversationTransientUi();
      setSceneModalOpen(true);
    });
  }

  if (messagesAddBtnEl) {
    messagesAddBtnEl.addEventListener("click", () => {
      if (state.activeTab === "contacts") {
        setContactEditorOpen(true);
        return;
      }
      if (state.activeTab === "chat") {
        setConversationPickerOpen(true);
      }
    });
  }

  if (messagesSearchInputEl) {
    messagesSearchInputEl.addEventListener("input", () => {
      state.query = String(messagesSearchInputEl.value || "").trim();
      if (state.activeTab === "chat") {
        renderChatList();
        return;
      }
      if (state.activeTab === "contacts") {
        renderContactsTab();
      }
    });
  }

  if (messagesTabbarEl) {
    messagesTabbarEl.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }
      const actionEl = target.closest("[data-tab]");
      if (!(actionEl instanceof Element) || !actionEl.getAttribute("data-tab")) {
        return;
      }
      closeConversationTransientUi();
      clearConversationMessageSelection();
      setRegenerateModalOpen(false);
      state.activeTab = String(actionEl.getAttribute("data-tab") || "");
      state.activeConversationId = "";
      state.query = "";
      state.contactsSearchOpen = false;
      setMessagesStatus("");
      renderMessagesPage();
    });
  }

  if (messagesContentEl) {
    messagesContentEl.addEventListener("input", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLInputElement)) {
        return;
      }
      if (!target.classList.contains("messages-conversation__input")) {
        return;
      }
      setConversationDraft(state.activeConversationId, target.value || "");
    });

    messagesContentEl.addEventListener("focusin", (event) => {
      const target = event.target;
      if (
        target instanceof HTMLInputElement &&
        target.classList.contains("messages-conversation__input")
      ) {
        primeForegroundRefreshSuppression(1600);
      }
    });

    messagesContentEl.addEventListener("keydown", (event) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }
      if (
        !target.classList.contains("messages-message-row__selection-bubble") ||
        !["Enter", " "].includes(String(event.key || ""))
      ) {
        return;
      }
      event.preventDefault();
      target.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    messagesContentEl.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      const actionEl = target.closest("[data-action]");

      if (
        state.messageActionMessageId &&
        !target.closest(".messages-message-row__menu") &&
        !target.closest("[data-action='toggle-message-menu']")
      ) {
        const scrollSnapshot = captureConversationScrollSnapshot();
        state.messageActionMessageId = "";
        if (!(actionEl instanceof Element)) {
          renderConversationDetail({
            scrollBehavior: "preserve",
            scrollSnapshot
          });
          return;
        }
      }
      if (!(actionEl instanceof Element)) {
        return;
      }

      if (actionEl.getAttribute("data-action") === "load-more-conversation-messages") {
        const conversation = getConversationById();
        if (!conversation) {
          return;
        }
        const scrollSnapshot = captureConversationScrollSnapshot();
        expandConversationVisibleMessageCount(conversation.id);
        renderConversationDetail({
          scrollBehavior: "expand-top",
          scrollSnapshot
        });
        return;
      }

      if (actionEl.getAttribute("data-action") === "toggle-composer-panel") {
        const scrollSnapshot = captureConversationScrollSnapshot();
        state.composerPanelOpen = !state.composerPanelOpen;
        state.messageActionMessageId = "";
        renderConversationDetail({
          scrollBehavior: "preserve",
          scrollSnapshot
        });
        return;
      }

      if (actionEl.getAttribute("data-action") === "close-composer-panel") {
        const scrollSnapshot = captureConversationScrollSnapshot();
        state.composerPanelOpen = false;
        renderConversationDetail({
          scrollBehavior: "preserve",
          scrollSnapshot
        });
        return;
      }

      if (
        actionEl.getAttribute("data-action") === "conversation-tool" &&
        actionEl.getAttribute("data-tool-id")
      ) {
        handleConversationToolAction(String(actionEl.getAttribute("data-tool-id") || ""));
        return;
      }

      if (
        actionEl.getAttribute("data-action") === "toggle-message-menu" &&
        actionEl.getAttribute("data-message-id")
      ) {
        const messageId = String(actionEl.getAttribute("data-message-id") || "");
        const scrollSnapshot = captureConversationScrollSnapshot();
        state.composerPanelOpen = false;
        state.messageActionMessageId = state.messageActionMessageId === messageId ? "" : messageId;
        renderConversationDetail({
          scrollBehavior: "preserve",
          scrollSnapshot
        });
        return;
      }

      if (
        actionEl.getAttribute("data-action") === "toggle-image-description" &&
        actionEl.getAttribute("data-message-id")
      ) {
        const messageId = String(actionEl.getAttribute("data-message-id") || "").trim();
        const conversation = getConversationById();
        const targetMessage =
          conversation?.messages?.find((message) => String(message?.id || "").trim() === messageId) || null;
        const scrollSnapshot = captureConversationScrollSnapshot();
        state.composerPanelOpen = false;
        if (!String(targetMessage?.imageDescription || "").trim()) {
          state.messageActionMessageId = state.messageActionMessageId === messageId ? "" : messageId;
          state.expandedImageMessageId = "";
          state.expandedVoiceMessageId = "";
        } else {
          state.messageActionMessageId = "";
          state.expandedImageMessageId = state.expandedImageMessageId === messageId ? "" : messageId;
          state.expandedVoiceMessageId = "";
        }
        renderConversationDetail({
          scrollBehavior: "preserve",
          scrollSnapshot
        });
        return;
      }

      if (
        actionEl.getAttribute("data-action") === "toggle-voice-transcript" &&
        actionEl.getAttribute("data-message-id")
      ) {
        const messageId = String(actionEl.getAttribute("data-message-id") || "").trim();
        const scrollSnapshot = captureConversationScrollSnapshot();
        state.composerPanelOpen = false;
        state.messageActionMessageId = "";
        state.expandedVoiceMessageId =
          state.expandedVoiceMessageId === messageId ? "" : messageId;
        renderConversationDetail({
          scrollBehavior: "preserve",
          scrollSnapshot
        });
        return;
      }

      if (
        actionEl.getAttribute("data-action") === "open-discussion-share-message" &&
        actionEl.getAttribute("data-message-id")
      ) {
        const messageId = String(actionEl.getAttribute("data-message-id") || "").trim();
        state.composerPanelOpen = false;
        state.messageActionMessageId = "";
        setDiscussionShareModalOpen(true, messageId);
        return;
      }

      if (
        actionEl.getAttribute("data-action") === "edit-conversation-message" &&
        actionEl.getAttribute("data-message-id")
      ) {
        editConversationMessage(String(actionEl.getAttribute("data-message-id") || ""));
        return;
      }

      if (
        actionEl.getAttribute("data-action") === "delete-conversation-message" &&
        actionEl.getAttribute("data-message-id")
      ) {
        deleteConversationMessage(String(actionEl.getAttribute("data-message-id") || ""));
        return;
      }

      if (
        actionEl.getAttribute("data-action") === "toggle-selected-conversation-message" &&
        actionEl.getAttribute("data-message-id")
      ) {
        const scrollSnapshot = captureConversationScrollSnapshot();
        toggleConversationMessageSelection(String(actionEl.getAttribute("data-message-id") || ""));
        queueConversationRenderOptions({
          scrollBehavior: "preserve",
          scrollSnapshot
        });
        renderMessagesPage();
        return;
      }

      if (actionEl.getAttribute("data-action") === "cancel-message-selection") {
        const scrollSnapshot = captureConversationScrollSnapshot();
        clearConversationMessageSelection();
        queueConversationRenderOptions({
          scrollBehavior: "preserve",
          scrollSnapshot
        });
        renderMessagesPage();
        return;
      }

      if (actionEl.getAttribute("data-action") === "delete-selected-conversation-messages") {
        void deleteSelectedConversationMessages();
        return;
      }

      if (
        actionEl.getAttribute("data-action") === "inner-thought-conversation-message" &&
        actionEl.getAttribute("data-message-id")
      ) {
        void openInnerThoughtForMessage(String(actionEl.getAttribute("data-message-id") || ""));
        return;
      }

      if (
        actionEl.getAttribute("data-action") === "quote-conversation-message" &&
        actionEl.getAttribute("data-message-id")
      ) {
        const conversation = getConversationById();
        if (!conversation || getConversationSceneMode(conversation) !== "online") {
          return;
        }
        const scrollSnapshot = captureConversationScrollSnapshot();
        state.quotedMessageId = String(actionEl.getAttribute("data-message-id") || "").trim();
        state.messageActionMessageId = "";
        state.composerPanelOpen = false;
        renderConversationDetail({
          scrollBehavior: "preserve",
          scrollSnapshot,
          focusInput: true
        });
        return;
      }

      if (actionEl.getAttribute("data-action") === "clear-quoted-message") {
        const scrollSnapshot = captureConversationScrollSnapshot();
        state.quotedMessageId = "";
        renderConversationDetail({
          scrollBehavior: "preserve",
          scrollSnapshot,
          focusInput: true
        });
        return;
      }

      if (
        actionEl.getAttribute("data-action") === "accept-voice-call-request" &&
        actionEl.getAttribute("data-message-id")
      ) {
        acceptVoiceCallRequest(String(actionEl.getAttribute("data-message-id") || ""));
        return;
      }

      if (
        actionEl.getAttribute("data-action") === "accept-video-call-request" &&
        actionEl.getAttribute("data-message-id")
      ) {
        acceptVoiceCallRequest(String(actionEl.getAttribute("data-message-id") || ""));
        return;
      }

      if (
        actionEl.getAttribute("data-action") === "reject-voice-call-request" &&
        actionEl.getAttribute("data-message-id")
      ) {
        rejectVoiceCallRequest(String(actionEl.getAttribute("data-message-id") || ""));
        return;
      }

      if (
        actionEl.getAttribute("data-action") === "reject-video-call-request" &&
        actionEl.getAttribute("data-message-id")
      ) {
        rejectVoiceCallRequest(String(actionEl.getAttribute("data-message-id") || ""));
        return;
      }

      if (
        actionEl.getAttribute("data-action") === "hangup-voice-call" ||
        actionEl.getAttribute("data-action") === "hangup-active-call"
      ) {
        hangupActiveVoiceCall();
        return;
      }

      if (actionEl.getAttribute("data-action") === "request-conversation-reply") {
        requestConversationReply();
        return;
      }

      if (
        actionEl.getAttribute("data-action") === "open-conversation" &&
        actionEl.getAttribute("data-conversation-id")
      ) {
        const nextConversationId = String(actionEl.getAttribute("data-conversation-id") || "");
        if (conversationListLongPressTriggeredId && conversationListLongPressTriggeredId === nextConversationId) {
          conversationListLongPressTriggeredId = "";
          return;
        }
        cancelConversationListLongPress();
        closeConversationTransientUi();
        clearConversationMessageSelection();
        state.expandedImageMessageId = "";
        state.expandedVoiceMessageId = "";
        state.activeConversationId = nextConversationId;
        syncActiveConversationPromptSettings(getConversationById(nextConversationId));
        resetConversationVisibleMessageCount(state.activeConversationId);
        syncConversationPresenceFromSchedules(state.activeConversationId);
        setMessagesStatus("");
        renderMessagesPage();
        void refreshConversationSnapshotFromCloud(nextConversationId)
          .then(() => {
            if (String(state.activeConversationId || "").trim() === nextConversationId) {
              renderMessagesPage();
            }
          })
          .catch((error) => {
            setChatReadonlyMode(true, "数据库不可用，仅只读");
            setMessagesStatus(`数据库会话刷新失败：${error?.message || "请求失败"}`, "error");
            renderMessagesPage();
          });
        return;
      }

      if (
        actionEl.getAttribute("data-action") === "edit-contact" &&
        actionEl.getAttribute("data-contact-id")
      ) {
        setContactEditorOpen(true, String(actionEl.getAttribute("data-contact-id") || ""));
        return;
      }

      if (actionEl.getAttribute("data-action") === "open-profile-editor") {
        setProfileEditorOpen(true);
        return;
      }

      if (actionEl.getAttribute("data-action") === "open-me-entry") {
        const entryId = String(actionEl.getAttribute("data-entry-id") || "").trim();
        if (entryId === "memory") {
          setMemoryViewerOpen(true);
          return;
        }
        if (entryId === "worldbook") {
          setWorldbookManagerOpen(true);
          return;
        }
        if (entryId === "places") {
          setPlacesManagerOpen(true);
          return;
        }
        if (entryId === "settings") {
          setChatGlobalSettingsOpen(true);
          return;
        }
        const label = actionEl.textContent?.trim() || "该功能";
        setMessagesStatus(`${label}功能暂未开放。`);
      }
    });

    messagesContentEl.addEventListener("submit", async (event) => {
      const target = event.target;
      if (!(target instanceof HTMLFormElement)) {
        return;
      }
      if (target.dataset.action !== "send-conversation-message") {
        return;
      }

      event.preventDefault();
      const formData = new FormData(target);
      const message = String(formData.get("message") || "");
      sendConversationMessage(message, {
        requestReplyAfterSend: false
      });
    });

    messagesContentEl.addEventListener("pointerdown", (event) => {
      if (state.activeConversationId || state.activeTab !== "chat") {
        return;
      }
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }
      const row = target.closest(".messages-row[data-action='open-conversation']");
      if (!(row instanceof HTMLElement)) {
        return;
      }
      beginConversationListLongPress(event, String(row.dataset.conversationId || ""));
    });

    ["pointerup", "pointercancel", "pointerleave"].forEach((eventName) => {
      messagesContentEl.addEventListener(eventName, () => {
        cancelConversationListLongPress();
      });
    });

    messagesContentEl.addEventListener("pointermove", (event) => {
      if (!conversationListLongPressTimerId) {
        return;
      }
      if (shouldCancelConversationListLongPressForMove(event)) {
        cancelConversationListLongPress();
      }
    });
  }

  if (messagesProfileModalCloseBtnEl) {
    messagesProfileModalCloseBtnEl.addEventListener("click", () => {
      setProfileEditorOpen(false);
    });
  }

  if (messagesProfileSaveBtnEl) {
    messagesProfileSaveBtnEl.addEventListener("click", (event) => {
      submitFormReliably(messagesProfileFormEl, event);
    });
  }

  if (messagesProfileAvatarResetBtnEl) {
    messagesProfileAvatarResetBtnEl.addEventListener("click", () => {
      state.profileEditorAvatarImage = "";
      renderProfileEditorAvatarPreview();
      setEditorStatus(messagesProfileEditorStatusEl, "已切换为默认头像。", "success");
    });
  }

  if (messagesProfileAvatarFileInputEl) {
    messagesProfileAvatarFileInputEl.addEventListener("change", async () => {
      const [file] = messagesProfileAvatarFileInputEl.files || [];
      if (!file) {
        return;
      }
      try {
        state.profileEditorAvatarImage = await readAvatarAsDataUrl(file, {
          maxSide: 192,
          quality: 0.64
        });
        renderProfileEditorAvatarPreview();
        setEditorStatus(messagesProfileEditorStatusEl, "头像图片已更新。", "success");
      } catch (error) {
        setEditorStatus(messagesProfileEditorStatusEl, error?.message || "头像上传失败。", "error");
      } finally {
        messagesProfileAvatarFileInputEl.value = "";
      }
    });
  }

  if (messagesProfileUsernameInputEl) {
    messagesProfileUsernameInputEl.addEventListener("input", () => {
      renderProfileEditorAvatarPreview();
    });
  }

  if (messagesProfileFormEl) {
    messagesProfileFormEl.addEventListener("submit", async (event) => {
      event.preventDefault();
      const saveResult = await persistProfileWithAvatarFallback(getCurrentProfileDraft());
      state.profile = saveResult.profile;
      state.profileEditorAvatarImage = String(saveResult.profile?.avatarImage || "").trim();
      const persisted = saveResult.persisted;
      if (persisted) {
        syncProfileStateFromStorage();
      }
      renderMessagesPage();
      if (!persisted) {
        setEditorStatus(
          messagesProfileEditorStatusEl,
          "个人资料已更新到当前页面，但本地缓存写入失败，请清理缓存后再试一次。",
          "error"
        );
        setMessagesStatus("个人资料已更新到当前页面，但本地缓存写入失败。", "error");
        return;
      }
      const successMessage = saveResult.compressed
        ? "资料已保存，头像已自动压缩以适配本地缓存。"
        : "资料已保存。";
      setEditorStatus(messagesProfileEditorStatusEl, successMessage, "success");
      setMessagesStatus(
        saveResult.compressed ? "个人资料已保存，头像已自动压缩。" : "个人资料已同步更新。",
        "success"
      );
      window.setTimeout(() => {
        setProfileEditorOpen(false);
      }, 220);
    });
  }

  if (messagesContactModalCloseBtnEl) {
    messagesContactModalCloseBtnEl.addEventListener("click", () => {
      setContactEditorOpen(false);
    });
  }

  if (messagesContactSaveBtnEl) {
    messagesContactSaveBtnEl.addEventListener("click", (event) => {
      submitFormReliably(messagesContactFormEl, event);
    });
  }

  if (messagesContactDeleteBtnEl) {
    messagesContactDeleteBtnEl.addEventListener("click", () => {
      handleDeleteContactFromEditor();
    });
  }

  if (messagesContactAvatarResetBtnEl) {
    messagesContactAvatarResetBtnEl.addEventListener("click", () => {
      state.contactEditorAvatarImage = "";
      renderContactEditorAvatarPreview();
      setEditorStatus(messagesContactEditorStatusEl, "已切换为默认头像。", "success");
    });
  }

  if (messagesContactAvatarFileInputEl) {
    messagesContactAvatarFileInputEl.addEventListener("change", async () => {
      const [file] = messagesContactAvatarFileInputEl.files || [];
      if (!file) {
        return;
      }
      try {
        state.contactEditorAvatarImage = await readAvatarAsDataUrl(file, {
          maxSide: 192,
          quality: 0.64
        });
        renderContactEditorAvatarPreview();
        setEditorStatus(messagesContactEditorStatusEl, "头像图片已更新。", "success");
      } catch (error) {
        setEditorStatus(messagesContactEditorStatusEl, error?.message || "头像上传失败。", "error");
      } finally {
        messagesContactAvatarFileInputEl.value = "";
      }
    });
  }

  if (messagesContactNameInputEl) {
    messagesContactNameInputEl.addEventListener("input", () => {
      renderContactEditorAvatarPreview();
    });
  }

  if (messagesContactForumFandomEnabledInputEl) {
    messagesContactForumFandomEnabledInputEl.addEventListener("change", () => {
      updateContactForumFandomFieldsVisibility();
    });
  }

  if (messagesContactFormEl) {
    messagesContactFormEl.addEventListener("submit", async (event) => {
      event.preventDefault();
      const existingContact = getContactById(state.contactEditorId);
      let draft = getCurrentContactDraft();
      try {
        draft = await syncContactForumFandomTab(draft, existingContact || null);
      } catch (error) {
        setEditorStatus(
          messagesContactEditorStatusEl,
          `角色粉丝页同步失败：${error?.message || "请求失败"}`,
          "error"
        );
        return;
      }
      const existingIndex = state.contacts.findIndex((item) => item.id === draft.id);
      if (existingIndex >= 0) {
        state.contacts[existingIndex] = draft;
      } else {
        state.contacts = [draft, ...state.contacts];
      }
      const saveResult = await persistContactsWithAvatarFallback(draft.id);
      const savedContact = getContactById(draft.id) || draft;
      syncConversationSnapshots(savedContact);
      renderMessagesPage();
      if (!saveResult.persisted) {
        setEditorStatus(
          messagesContactEditorStatusEl,
          "联系人已加入当前页面，但本地缓存写入失败，请清理缓存后再试一次。",
          "error"
        );
        setMessagesStatus("联系人已加入当前页面，但本地缓存写入失败。", "error");
        return;
      }
      setEditorStatus(
        messagesContactEditorStatusEl,
        saveResult.compressed ? "联系人已保存，头像已自动压缩以适配本地缓存。" : "联系人已保存。",
        "success"
      );
      setMessagesStatus("联系人资料已更新。", "success");
      window.setTimeout(() => {
        setContactEditorOpen(false);
      }, 220);
    });
  }

  if (messagesPickerCloseBtnEl) {
    messagesPickerCloseBtnEl.addEventListener("click", () => {
      setConversationPickerOpen(false);
    });
  }

  if (messagesImageFileInputEl) {
    messagesImageFileInputEl.addEventListener("change", async () => {
      const [file] = messagesImageFileInputEl.files || [];
      if (!file) {
        return;
      }
      try {
        await sendConversationImage(file);
      } finally {
        messagesImageFileInputEl.value = "";
      }
    });
  }

  if (messagesPickerListEl) {
    messagesPickerListEl.addEventListener("click", async (event) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }
      const actionEl = target.closest("[data-action='start-conversation']");
      if (!(actionEl instanceof Element) || !actionEl.getAttribute("data-contact-id")) {
        return;
      }
      const contact = getContactById(String(actionEl.getAttribute("data-contact-id") || ""));
      if (!contact) {
        return;
      }
      const conversation = await ensureConversationAvailableForContact(contact);
      if (!conversation) {
        return;
      }
      state.activeTab = "chat";
      state.activeConversationId = conversation.id;
      syncActiveConversationPromptSettings(conversation);
      resetConversationVisibleMessageCount(conversation.id);
      setConversationPickerOpen(false);
      renderMessagesPage();
    });
  }

  if (messagesChatSettingsCloseBtnEl) {
    messagesChatSettingsCloseBtnEl.addEventListener("click", () => {
      setChatSettingsOpen(false);
    });
  }

  if (messagesChatSettingsSaveBtnEl) {
    messagesChatSettingsSaveBtnEl.addEventListener("click", (event) => {
      submitFormReliably(messagesChatSettingsFormEl, event);
    });
  }

  if (messagesChatVideoContactResetBtnEl) {
    messagesChatVideoContactResetBtnEl.addEventListener("click", () => {
      state.chatSettingsVideoContactImage = "";
      renderChatSettingsVideoPreviews();
      setEditorStatus(messagesChatSettingsStatusEl, "角色视频图片已恢复为头像。", "success");
    });
  }

  if (messagesChatVideoUserResetBtnEl) {
    messagesChatVideoUserResetBtnEl.addEventListener("click", () => {
      state.chatSettingsVideoUserImage = "";
      renderChatSettingsVideoPreviews();
      setEditorStatus(messagesChatSettingsStatusEl, "用户视频图片已恢复为头像。", "success");
    });
  }

  if (messagesChatVideoContactFileInputEl) {
    messagesChatVideoContactFileInputEl.addEventListener("change", async () => {
      const [file] = messagesChatVideoContactFileInputEl.files || [];
      if (!file) {
        return;
      }
      try {
        state.chatSettingsVideoContactImage = await readAvatarAsDataUrl(file, {
          maxSide: 900,
          quality: 0.78
        });
        renderChatSettingsVideoPreviews();
        setEditorStatus(messagesChatSettingsStatusEl, "角色视频图片已更新。", "success");
      } catch (error) {
        setEditorStatus(messagesChatSettingsStatusEl, error?.message || "角色视频图片上传失败。", "error");
      } finally {
        messagesChatVideoContactFileInputEl.value = "";
      }
    });
  }

  if (messagesChatVideoUserFileInputEl) {
    messagesChatVideoUserFileInputEl.addEventListener("change", async () => {
      const [file] = messagesChatVideoUserFileInputEl.files || [];
      if (!file) {
        return;
      }
      try {
        state.chatSettingsVideoUserImage = await readAvatarAsDataUrl(file, {
          maxSide: 900,
          quality: 0.78
        });
        renderChatSettingsVideoPreviews();
        setEditorStatus(messagesChatSettingsStatusEl, "用户视频图片已更新。", "success");
      } catch (error) {
        setEditorStatus(messagesChatSettingsStatusEl, error?.message || "用户视频图片上传失败。", "error");
      } finally {
        messagesChatVideoUserFileInputEl.value = "";
      }
    });
  }

  if (messagesSceneCloseBtnEl) {
    messagesSceneCloseBtnEl.addEventListener("click", () => {
      setSceneModalOpen(false);
    });
  }

  if (messagesSceneSaveBtnEl) {
    messagesSceneSaveBtnEl.addEventListener("click", (event) => {
      submitFormReliably(messagesSceneFormEl, event);
    });
  }

  if (messagesSceneOnlineBtnEl) {
    messagesSceneOnlineBtnEl.addEventListener("click", () => {
      applySceneModeToButtons("online");
      updateSceneModalFields(getCurrentSceneDraft());
    });
  }

  if (messagesSceneOfflineBtnEl) {
    messagesSceneOfflineBtnEl.addEventListener("click", () => {
      applySceneModeToButtons("offline");
      updateSceneModalFields(getCurrentSceneDraft());
    });
  }

  [
    messagesSceneUserPresenceTypeInputEl,
    messagesSceneContactPresenceTypeInputEl,
    messagesSceneUserPlaceSelectEl,
    messagesSceneUserFromPlaceSelectEl,
    messagesSceneUserToPlaceSelectEl,
    messagesSceneContactPlaceSelectEl,
    messagesSceneContactFromPlaceSelectEl,
    messagesSceneContactToPlaceSelectEl
  ]
    .filter(Boolean)
    .forEach((input) => {
      input.addEventListener("change", () => {
        updateSceneModalFields(getCurrentSceneDraft());
      });
    });

  if (messagesSceneFormEl) {
    messagesSceneFormEl.addEventListener("submit", (event) => {
      event.preventDefault();
      try {
        saveSceneDraft();
        window.setTimeout(() => {
          setSceneModalOpen(false);
        }, 180);
      } catch (error) {
        setSceneStatus(error?.message || "状态保存失败。", "error");
      }
    });
  }

  if (messagesSceneSyncPlaceBtnEl) {
    messagesSceneSyncPlaceBtnEl.addEventListener("click", () => {
      triggerSharedPlaceSync();
    });
  }

  if (messagesSceneManagePlacesBtnEl) {
    messagesSceneManagePlacesBtnEl.addEventListener("click", () => {
      setPlacesManagerOpen(true);
    });
  }

  if (messagesChatSettingsFormEl) {
    messagesChatSettingsFormEl.addEventListener("submit", (event) => {
      event.preventDefault();
      const draft = getCurrentChatPromptSettingsDraft();
      const conversation = getConversationById();
      if (draft.hotTopicsEnabled && !draft.hotTopicsTabId) {
        setEditorStatus(
          messagesChatSettingsStatusEl,
          "请先为近期热点选择一个论坛自定义页签。",
          "error"
        );
        return;
      }
      if (
        draft.hotTopicsEnabled &&
        !draft.hotTopicsIncludeDiscussionText &&
        !draft.hotTopicsIncludeHotTopic
      ) {
        setEditorStatus(
          messagesChatSettingsStatusEl,
          "热点挂载至少要选择“页签文本”或“页签热点”中的一项。",
          "error"
        );
        return;
      }
      if (draft.worldbookEnabled && !draft.worldbookIds.length) {
        setEditorStatus(messagesChatSettingsStatusEl, "请至少选择一条世界书。", "error");
        return;
      }
      const savedPromptSettings = setConversationPromptSettings(draft, conversation);
      if (!savedPromptSettings) {
        setEditorStatus(messagesChatSettingsStatusEl, "当前没有打开的会话。", "error");
        return;
      }
      const videoMediaSaveResult = setConversationVideoMediaSettings(
        state.chatSettingsVideoContactImage,
        state.chatSettingsVideoUserImage
      );
      state.chatSettingsVideoContactImage = conversation
        ? getConversationVideoContactImage(conversation)
        : "";
      state.chatSettingsVideoUserImage = conversation ? getConversationVideoUserImage(conversation) : "";
      setConversationAllowAiPresenceUpdate(
        Boolean(messagesChatAllowAiPresenceUpdateInputEl?.checked)
      );
      setConversationAllowAiProactiveMessage(
        Boolean(messagesChatAllowAiProactiveMessageInputEl?.checked)
      );
      setConversationAutoScheduleSettings(
        Boolean(messagesChatAllowAiAutoScheduleInputEl?.checked),
        messagesChatAutoScheduleDaysInputEl?.value || DEFAULT_AUTO_SCHEDULE_DAYS,
        messagesChatAutoScheduleTimeInputEl?.value || ""
      );
      updateChatHotTopicsWarning(savedPromptSettings);
      let chatSettingsStatusMessage = "对话回复设置已保存。";
      let chatSettingsStatusTone = "success";
      if (!videoMediaSaveResult.conversationPersisted && videoMediaSaveResult.mediaPersisted) {
        chatSettingsStatusMessage = "对话回复设置已保存，视频图片已单独保存。";
        chatSettingsStatusTone = "warning";
      } else if (!videoMediaSaveResult.conversationPersisted && !videoMediaSaveResult.mediaPersisted) {
        chatSettingsStatusMessage = "对话回复设置已保存，但视频图片写入本地缓存失败，请清理缓存后重试。";
        chatSettingsStatusTone = "error";
      }
      setEditorStatus(
        messagesChatSettingsStatusEl,
        chatSettingsStatusMessage,
        chatSettingsStatusTone
      );
      setMessagesStatus(chatSettingsStatusMessage, chatSettingsStatusTone);
      if (state.activeConversationId && state.activeTab === "chat") {
        renderConversationDetail();
      }
      window.setTimeout(() => {
        setChatSettingsOpen(false);
      }, 220);
    });
  }

  if (messagesChatClearHistoryBtnEl) {
    messagesChatClearHistoryBtnEl.addEventListener("click", () => {
      clearCurrentConversationHistory();
    });
  }

  if (messagesChatClearMemoryBtnEl) {
    messagesChatClearMemoryBtnEl.addEventListener("click", () => {
      clearCurrentConversationMemories();
    });
  }

  if (messagesChatAutoScheduleGenerateBtnEl) {
    messagesChatAutoScheduleGenerateBtnEl.addEventListener("click", () => {
      const { conversation } = getActiveConversationContext();
      const contact = conversation ? getResolvedConversationContact(conversation) : null;
      if (!conversation) {
        setEditorStatus(messagesChatSettingsStatusEl, "当前没有打开的会话。", "error");
        return;
      }
      if (!contact) {
        setEditorStatus(messagesChatSettingsStatusEl, "未找到当前聊天对象。", "error");
        return;
      }
      setAutoScheduleRequestOpen(true);
    });
  }

  if (messagesChatAutoScheduleCloseBtnEl) {
    messagesChatAutoScheduleCloseBtnEl.addEventListener("click", () => {
      setAutoScheduleRequestOpen(false);
    });
  }

  if (messagesChatAutoScheduleModalEl) {
    messagesChatAutoScheduleModalEl.addEventListener("click", (event) => {
      if (event.target === messagesChatAutoScheduleModalEl) {
        setAutoScheduleRequestOpen(false);
      }
    });
  }

  if (messagesChatAutoScheduleWorldbookListEl) {
    messagesChatAutoScheduleWorldbookListEl.addEventListener("change", () => {
      state.autoScheduleRequestDraft = collectAutoScheduleRequestDraft();
      setEditorStatus(messagesChatAutoScheduleStatusEl);
    });
  }

  if (messagesChatAutoScheduleNoteInputEl) {
    messagesChatAutoScheduleNoteInputEl.addEventListener("input", () => {
      state.autoScheduleRequestDraft = collectAutoScheduleRequestDraft();
      setEditorStatus(messagesChatAutoScheduleStatusEl);
    });
  }

  if (messagesChatAutoScheduleFormEl) {
    messagesChatAutoScheduleFormEl.addEventListener("submit", async (event) => {
      event.preventDefault();
      const { conversation } = getActiveConversationContext();
      const contact = conversation ? getResolvedConversationContact(conversation) : null;
      if (!conversation) {
        setEditorStatus(messagesChatAutoScheduleStatusEl, "当前没有打开的会话。", "error");
        return;
      }
      if (!contact) {
        setEditorStatus(messagesChatAutoScheduleStatusEl, "未找到当前聊天对象。", "error");
        return;
      }
      const days = normalizeAutoScheduleDays(
        messagesChatAutoScheduleDaysInputEl?.value,
        getConversationAutoScheduleDays(conversation)
      );
      const autoScheduleTime = normalizeAutoScheduleTime(
        messagesChatAutoScheduleTimeInputEl?.value || getConversationAutoScheduleTime(conversation)
      );
      const draft = collectAutoScheduleRequestDraft();
      state.autoScheduleRequestDraft = draft;
      setEditorStatus(
        messagesChatAutoScheduleStatusEl,
        `正在为当前角色补齐未来 ${days} 天的空白小时行程…`
      );
      try {
        setConversationAutoScheduleSettings(
          Boolean(messagesChatAllowAiAutoScheduleInputEl?.checked),
          days,
          autoScheduleTime
        );
        const result = await generateAutoSchedulesForConversation(days, conversation.id, {
          worldbookIds: draft.worldbookIds,
          extraInstruction: draft.note
        });
        setEditorStatus(
          messagesChatSettingsStatusEl,
          `已补齐 ${result.acceptedEntries.length} 条小时行程。`,
          "success"
        );
        setMessagesStatus(
          `已为当前角色补齐未来 ${result.requestedDays} 天的 ${result.acceptedEntries.length} 条行程。`,
          "success"
        );
        setAutoScheduleRequestOpen(false);
      } catch (error) {
        setEditorStatus(
          messagesChatAutoScheduleStatusEl,
          error?.message || "自动生成行程失败。",
          "error"
        );
      }
    });
  }

  if (messagesChatGlobalSettingsCloseBtnEl) {
    messagesChatGlobalSettingsCloseBtnEl.addEventListener("click", () => {
      setChatGlobalSettingsOpen(false);
    });
  }

  if (messagesChatGlobalSettingsCancelBtnEl) {
    messagesChatGlobalSettingsCancelBtnEl.addEventListener("click", () => {
      setChatGlobalSettingsOpen(false);
    });
  }

  if (messagesChatGlobalSettingsFormEl) {
    messagesChatGlobalSettingsFormEl.addEventListener("submit", (event) => {
      event.preventDefault();
      const nextSettings = loadSettings();
      nextSettings.chatGlobalSettings = normalizeChatGlobalSettings({
        userPresenceScope: messagesChatUserPresenceScopeInputEl?.value || "global"
      });
      persistSettings(nextSettings);
      state.chatGlobalSettings = normalizeChatGlobalSettings(nextSettings.chatGlobalSettings);
      setChatGlobalSettingsStatus("Chat 全局设置已保存。", "success");
      renderMessagesPage();
      if (state.sceneModalOpen) {
        updateSceneModalFields(getCurrentSceneDraft());
      }
      window.setTimeout(() => {
        setChatGlobalSettingsOpen(false);
      }, 180);
    });
  }

  if (messagesPlacesCloseBtnEl) {
    messagesPlacesCloseBtnEl.addEventListener("click", () => {
      setPlacesManagerOpen(false);
    });
  }

  if (messagesPlacesAddBtnEl) {
    messagesPlacesAddBtnEl.addEventListener("click", () => {
      setPlaceEditorOpen(true);
    });
  }

  if (messagesPlaceSearchInputEl) {
    messagesPlaceSearchInputEl.addEventListener("input", () => {
      state.placeQuery = String(messagesPlaceSearchInputEl.value || "").trim();
      renderPlacesManager();
    });
  }

  if (messagesPlaceSearchBtnEl) {
    messagesPlaceSearchBtnEl.addEventListener("click", () => {
      state.placeQuery = String(messagesPlaceSearchInputEl?.value || "").trim();
      renderPlacesManager();
    });
  }

  if (messagesPlaceFilterSelectEl) {
    messagesPlaceFilterSelectEl.addEventListener("change", () => {
      state.placeFilterType = String(messagesPlaceFilterSelectEl.value || "all").trim() || "all";
      renderPlacesManager();
    });
  }

  if (messagesPlacesListEl) {
    messagesPlacesListEl.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }
      const actionEl = target.closest("[data-action]");
      if (!(actionEl instanceof Element)) {
        return;
      }
      const action = String(actionEl.getAttribute("data-action") || "").trim();
      const placeId = String(actionEl.getAttribute("data-place-id") || "").trim();
      const { conversation } = getActiveConversationContext();
      if (action === "edit-common-place") {
        setPlaceEditorOpen(true, placeId);
        return;
      }
      if (action === "delete-common-place") {
        deleteCommonPlace(placeId);
        return;
      }
      if (action === "set-user-current-place") {
        applyPlaceAsCurrentForUser(placeId, conversation?.contactId || "");
        setPlacesStatus("已设为我的当前地点。", "success");
        return;
      }
      if (action === "set-contact-current-place") {
        applyPlaceAsCurrentForContact(placeId, conversation?.contactId || "");
        setPlacesStatus("已设为 TA 的当前地点。", "success");
      }
    });
  }

  if (messagesPlaceEditorCloseBtnEl) {
    messagesPlaceEditorCloseBtnEl.addEventListener("click", () => {
      setPlaceEditorOpen(false);
    });
  }

  if (messagesPlaceVisibilitySelectEl) {
    messagesPlaceVisibilitySelectEl.addEventListener("change", () => {
      const mode = normalizeCommonPlaceVisibilityMode(messagesPlaceVisibilitySelectEl.value);
      if (messagesPlaceVisibleContactsFieldEl) {
        messagesPlaceVisibleContactsFieldEl.hidden = mode !== "selected_contacts";
      }
      setPlaceEditorStatus("");
    });
  }

  if (messagesPlaceEditorFormEl) {
    messagesPlaceEditorFormEl.addEventListener("submit", (event) => {
      event.preventDefault();
      try {
        const place = saveCommonPlaceDraft();
        renderPlacesManager();
        updateSceneModalFields(buildSceneDraft());
        setPlaceEditorStatus(`地点“${place.name}”已保存。`, "success");
        setPlacesStatus(`地点“${place.name}”已保存。`, "success");
        window.setTimeout(() => {
          setPlaceEditorOpen(false);
        }, 180);
      } catch (error) {
        setPlaceEditorStatus(error?.message || "保存地点失败。", "error");
      }
    });
  }

  if (messagesPlaceEditorSetUserBtnEl) {
    messagesPlaceEditorSetUserBtnEl.addEventListener("click", () => {
      try {
        const place = saveCommonPlaceDraft();
        const { conversation } = getActiveConversationContext();
        applyPlaceAsCurrentForUser(place.id, conversation?.contactId || "");
        renderPlacesManager();
        updateSceneModalFields(buildSceneDraft());
        setPlaceEditorStatus("已设为我的当前地点。", "success");
      } catch (error) {
        setPlaceEditorStatus(error?.message || "保存地点失败。", "error");
      }
    });
  }

  if (messagesPlaceEditorSetContactBtnEl) {
    messagesPlaceEditorSetContactBtnEl.addEventListener("click", () => {
      const { conversation } = getActiveConversationContext();
      if (!conversation) {
        setPlaceEditorStatus("当前不在 1v1 会话中，暂时无法设为 TA 的地点。", "error");
        return;
      }
      try {
        const place = saveCommonPlaceDraft();
        applyPlaceAsCurrentForContact(place.id, conversation.contactId);
        renderPlacesManager();
        updateSceneModalFields(buildSceneDraft());
        setPlaceEditorStatus("已设为 TA 的当前地点。", "success");
      } catch (error) {
        setPlaceEditorStatus(error?.message || "保存地点失败。", "error");
      }
    });
  }

  if (messagesPlaceEditorDeleteBtnEl) {
    messagesPlaceEditorDeleteBtnEl.addEventListener("click", () => {
      if (!state.placeEditorId) {
        return;
      }
      deleteCommonPlace(state.placeEditorId);
      setPlaceEditorOpen(false);
    });
  }

  if (messagesSceneSyncCloseBtnEl) {
    messagesSceneSyncCloseBtnEl.addEventListener("click", () => {
      setSceneSyncModalOpen(false);
    });
  }

  if (messagesSceneSyncUseUserBtnEl) {
    messagesSceneSyncUseUserBtnEl.addEventListener("click", () => {
      const draft = getCurrentSceneDraft();
      if (!draft.userPresence.placeId) {
        setSceneSyncStatus("用户还没有可同步的地点。", "error");
        return;
      }
      applySharedPlaceToSceneDraft(draft.userPresence.placeId);
    });
  }

  if (messagesSceneSyncUseContactBtnEl) {
    messagesSceneSyncUseContactBtnEl.addEventListener("click", () => {
      const draft = getCurrentSceneDraft();
      if (!draft.contactPresence.placeId) {
        setSceneSyncStatus("角色还没有可同步的地点。", "error");
        return;
      }
      applySharedPlaceToSceneDraft(draft.contactPresence.placeId);
    });
  }

  if (messagesSceneSyncUseCustomBtnEl) {
    messagesSceneSyncUseCustomBtnEl.addEventListener("click", () => {
      applySharedPlaceToSceneDraft(messagesSceneSyncPlaceSelectEl?.value || "");
    });
  }

  if (messagesChatHotTopicsInputEl) {
    messagesChatHotTopicsInputEl.addEventListener("change", () => {
      updateChatSettingsFormState();
      updateChatHotTopicsWarning();
      setEditorStatus(messagesChatSettingsStatusEl);
    });
  }

  [messagesChatHotTopicsTextInputEl, messagesChatHotTopicsTopicInputEl].forEach((input) => {
    if (!(input instanceof HTMLInputElement)) {
      return;
    }
    input.addEventListener("change", () => {
      updateChatHotTopicsWarning();
      setEditorStatus(messagesChatSettingsStatusEl);
    });
  });

  if (messagesChatHotTopicsTabSelectEl) {
    messagesChatHotTopicsTabSelectEl.addEventListener("change", () => {
      updateChatHotTopicsWarning();
      setEditorStatus(messagesChatSettingsStatusEl);
    });
  }

  if (messagesChatWorldbookInputEl) {
    messagesChatWorldbookInputEl.addEventListener("change", () => {
      updateChatSettingsFormState();
      setEditorStatus(messagesChatSettingsStatusEl);
    });
  }

  if (messagesChatWorldbookListEl) {
    messagesChatWorldbookListEl.addEventListener("change", () => {
      setEditorStatus(messagesChatSettingsStatusEl);
    });
  }

  if (messagesMemoryCloseBtnEl) {
    messagesMemoryCloseBtnEl.addEventListener("click", () => {
      dismissMemoryViewer();
    });
  }

  if (messagesMemoryAddBtnEl) {
    messagesMemoryAddBtnEl.addEventListener("click", () => {
      setMemoryEditorOpen(true);
    });
  }

  if (messagesMemorySettingsBtnEl) {
    messagesMemorySettingsBtnEl.addEventListener("click", () => {
      setMemorySettingsOpen(true);
    });
  }

  if (messagesMemoryContactSelectEl) {
    messagesMemoryContactSelectEl.addEventListener("change", () => {
      state.memorySelectedContactId = String(messagesMemoryContactSelectEl.value || "").trim();
      renderMemoryViewer();
      void refreshMemoryViewerCloudEntries(state.memorySelectedContactId);
    });
  }

  if (messagesMemorySearchInputEl) {
    messagesMemorySearchInputEl.addEventListener("input", () => {
      state.memoryQuery = String(messagesMemorySearchInputEl.value || "").trim();
      renderMemoryViewer();
    });
  }

  if (messagesMemorySearchBtnEl) {
    messagesMemorySearchBtnEl.addEventListener("click", () => {
      state.memoryQuery = String(messagesMemorySearchInputEl?.value || "").trim();
      renderMemoryViewer();
    });
  }

  if (messagesMemoryModalEl) {
    messagesMemoryModalEl.addEventListener("click", (event) => {
      const target = event.target;
      if (target === messagesMemoryModalEl) {
        dismissMemoryViewer();
        return;
      }
      if (!(target instanceof Element)) {
        return;
      }
      const tabEl = target.closest("[data-memory-tab]");
      if (!(tabEl instanceof HTMLElement)) {
        return;
      }
      state.memoryTab = String(tabEl.dataset.memoryTab || "all").trim() || "all";
      renderMemoryViewer();
    });
  }

  if (messagesMemoryListEl) {
    messagesMemoryListEl.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }
      const deleteActionEl = target.closest("[data-action='delete-memory-item']");
      if (deleteActionEl instanceof HTMLElement) {
        const memoryId = String(deleteActionEl.dataset.memoryId || "").trim();
        const entry = getMemoryEntryById(memoryId);
        if (!entry) {
          return;
        }
        const confirmed = window.confirm("确定删除这条记忆吗？");
        if (!confirmed) {
          return;
        }
        const deletedEntry = deleteMemoryEntry(memoryId);
        if (deletedEntry) {
          const contactName = getContactById(deletedEntry.contactId)?.name || "该角色";
          setMemoryStatus(`已删除 ${contactName} 的一条记忆。`, "success");
        }
        return;
      }
      const actionEl = target.closest("[data-action='edit-memory-item']");
      if (!(actionEl instanceof HTMLElement)) {
        return;
      }
      const memoryId = String(actionEl.dataset.memoryId || "").trim();
      if (!getMemoryEntryById(memoryId)) {
        return;
      }
      setMemoryEditorOpen(true, state.memorySelectedContactId, memoryId);
    });
  }

  if (messagesMemoryEditorCloseBtnEl) {
    messagesMemoryEditorCloseBtnEl.addEventListener("click", () => {
      setMemoryEditorOpen(false);
    });
  }

  if (messagesMemoryEditorCancelBtnEl) {
    messagesMemoryEditorCancelBtnEl.addEventListener("click", () => {
      setMemoryEditorOpen(false);
    });
  }

  if (messagesMemoryEditorAutoSummaryBtnEl) {
    messagesMemoryEditorAutoSummaryBtnEl.addEventListener("click", async () => {
      const defaultRounds = getDefaultConversationMemorySummaryIntervalRounds(
        loadSettings().messagePromptSettings
      );
      const input = window.prompt("请输入这次要总结的近几轮会话", String(defaultRounds));
      if (input == null) {
        return;
      }
      const rounds = clampNumber(
        normalizePositiveInteger(input, defaultRounds),
        1,
        MAX_MEMORY_SUMMARY_INTERVAL_ROUNDS
      );
      const preferredContactId = String(messagesMemoryEditorContactSelectEl?.value || "").trim();
      messagesMemoryEditorAutoSummaryBtnEl.disabled = true;
      setMemoryEditorStatus(`正在总结最近 ${rounds} 轮会话…`);
      try {
        const result = await runManualConversationMemorySummary(rounds, preferredContactId);
        setMemoryEditorStatus(
          result.extractedCount > 0
            ? `已为 ${result.contact.name} 总结最近 ${result.rounds} 轮，并提取 ${result.extractedCount} 条记忆。`
            : `已为 ${result.contact.name} 总结最近 ${result.rounds} 轮，但没有提取出新的记忆。`,
          "success"
        );
      } catch (error) {
        setMemoryEditorStatus(error?.message || "自动总结失败。", "error");
      } finally {
        messagesMemoryEditorAutoSummaryBtnEl.disabled = false;
      }
    });
  }

  if (messagesMemoryEditorFormEl) {
    messagesMemoryEditorFormEl.addEventListener("submit", (event) => {
      event.preventDefault();
      try {
        const isEditing = Boolean(getMemoryEntryById(state.memoryEditingId));
        const entry = saveMemoryEntryDraft({
          id: state.memoryEditingId,
          contactId: messagesMemoryEditorContactSelectEl?.value,
          content: messagesMemoryEditorContentInputEl?.value,
          importance: messagesMemoryEditorImportanceInputEl?.value
        });
        setMemoryEditorStatus(
          isEditing
            ? `已更新 ${getContactById(entry.contactId)?.name || "该角色"} 的记忆。`
            : `已为 ${getContactById(entry.contactId)?.name || "该角色"} 保存核心记忆。`,
          "success"
        );
        setMemoryStatus(isEditing ? "记忆已更新。" : "核心记忆已保存。", "success");
        window.setTimeout(() => {
          setMemoryEditorOpen(false);
        }, 180);
      } catch (error) {
        setMemoryEditorStatus(error?.message || "保存失败。", "error");
      }
    });
  }

  if (messagesMemorySettingsCloseBtnEl) {
    messagesMemorySettingsCloseBtnEl.addEventListener("click", () => {
      setMemorySettingsOpen(false);
    });
  }

  if (messagesMemorySettingsCancelBtnEl) {
    messagesMemorySettingsCancelBtnEl.addEventListener("click", () => {
      setMemorySettingsOpen(false);
    });
  }

  if (messagesMemorySettingsFormEl) {
    messagesMemorySettingsFormEl.addEventListener("submit", (event) => {
      event.preventDefault();
      const nextSettings = loadSettings();
      const nextPromptSettings = normalizeMessagePromptSettings({
        ...nextSettings.messagePromptSettings,
        memorySummaryIntervalRounds: messagesMemorySummaryIntervalInputEl?.value,
        coreMemoryThreshold: messagesMemoryCoreThresholdInputEl?.value,
        sceneMemoryThreshold: messagesMemorySceneThresholdInputEl?.value
      });
      nextSettings.messagePromptSettings = nextPromptSettings;
      persistSettings(nextSettings);
      syncConversationMemoryPromptSettingsWithGlobal(nextPromptSettings);
      persistConversations();
      syncActiveConversationPromptSettings();
      setMemorySettingsStatus("记忆设置已保存。", "success");
      renderMemoryViewer();
      window.setTimeout(() => {
        setMemorySettingsOpen(false);
      }, 180);
    });
  }

      if (messagesWorldbookCloseBtnEl) {
        messagesWorldbookCloseBtnEl.addEventListener("click", () => {
          setWorldbookManagerOpen(false);
        });
      }

  if (messagesRegenerateCloseBtnEl) {
    messagesRegenerateCloseBtnEl.addEventListener("click", () => {
      setRegenerateModalOpen(false);
    });
  }

  if (messagesRegenerateCancelBtnEl) {
    messagesRegenerateCancelBtnEl.addEventListener("click", () => {
      setRegenerateModalOpen(false);
    });
  }

  if (messagesRegenerateInstructionInputEl) {
    messagesRegenerateInstructionInputEl.addEventListener("input", () => {
      state.regenerateInstruction = String(messagesRegenerateInstructionInputEl.value || "");
    });
  }

  if (messagesRegenerateFormEl) {
    messagesRegenerateFormEl.addEventListener("submit", async (event) => {
      event.preventDefault();
      const instruction = String(messagesRegenerateInstructionInputEl?.value || "").trim();
      state.regenerateInstruction = instruction;
      setRegenerateModalOpen(false);
      await requestConversationReply({
        regenerate: true,
        regenerateInstruction: instruction
      });
    });
  }

  if (messagesLocationCloseBtnEl) {
    messagesLocationCloseBtnEl.addEventListener("click", () => {
      setLocationModalOpen(false);
    });
  }

  if (messagesLocationCancelBtnEl) {
    messagesLocationCancelBtnEl.addEventListener("click", () => {
      setLocationModalOpen(false);
    });
  }

  if (messagesLocationNameInputEl) {
    messagesLocationNameInputEl.addEventListener("input", () => {
      updateLocationDraft(messagesLocationNameInputEl.value || "");
      setLocationStatus("");
    });
  }

  if (messagesLocationRecentListEl) {
    messagesLocationRecentListEl.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }
      const actionEl = target.closest("[data-action='use-recent-location']");
      if (!(actionEl instanceof Element)) {
        return;
      }
      updateLocationDraft(
        String(actionEl.getAttribute("data-location-name") || ""),
        String(actionEl.getAttribute("data-location-coordinates") || "")
      );
      setLocationStatus("已填入最近使用的位置。", "success");
    });
  }

  if (messagesLocationFormEl) {
    messagesLocationFormEl.addEventListener("submit", (event) => {
      event.preventDefault();
      sendConversationLocation(state.locationDraftName, state.locationDraftCoordinates);
    });
  }

  if (messagesVoiceCloseBtnEl) {
    messagesVoiceCloseBtnEl.addEventListener("click", () => {
      setVoiceModalOpen(false);
    });
  }

  if (messagesVoiceCancelBtnEl) {
    messagesVoiceCancelBtnEl.addEventListener("click", () => {
      setVoiceModalOpen(false);
    });
  }

  if (messagesVoiceTextInputEl) {
    messagesVoiceTextInputEl.addEventListener("input", () => {
      state.voiceDraftText = String(messagesVoiceTextInputEl.value || "");
      setVoiceStatus("");
    });
  }

  if (messagesVoiceFormEl) {
    messagesVoiceFormEl.addEventListener("submit", (event) => {
      event.preventDefault();
      sendConversationVoice(state.voiceDraftText);
    });
  }

  if (messagesPhotoCloseBtnEl) {
    messagesPhotoCloseBtnEl.addEventListener("click", () => {
      setPhotoModalOpen(false);
    });
  }

  if (messagesPhotoCancelBtnEl) {
    messagesPhotoCancelBtnEl.addEventListener("click", () => {
      setPhotoModalOpen(false);
    });
  }

  if (messagesPhotoDescriptionInputEl) {
    messagesPhotoDescriptionInputEl.addEventListener("input", () => {
      state.photoDraftDescription = String(messagesPhotoDescriptionInputEl.value || "");
      setPhotoStatus("");
    });
  }

  if (messagesPhotoFormEl) {
    messagesPhotoFormEl.addEventListener("submit", (event) => {
      event.preventDefault();
      sendConversationPhoto(state.photoDraftDescription);
    });
  }

  [
    messagesAwarenessTitleInputEl,
    messagesAwarenessTextInputEl,
    messagesAwarenessEmotionInputEl,
    messagesAwarenessSensitivityInputEl
  ]
    .filter(Boolean)
    .forEach((input) => {
      input.addEventListener("input", () => {
        setAwarenessStatus("");
      });
      input.addEventListener("change", () => {
        setAwarenessStatus("");
      });
    });

  if (messagesAwarenessCloseBtnEl) {
    messagesAwarenessCloseBtnEl.addEventListener("click", () => {
      setAwarenessModalOpen(false);
    });
  }

  if (messagesAwarenessCancelBtnEl) {
    messagesAwarenessCancelBtnEl.addEventListener("click", () => {
      setAwarenessModalOpen(false);
    });
  }

  if (messagesAwarenessFormEl) {
    messagesAwarenessFormEl.addEventListener("submit", (event) => {
      event.preventDefault();
      const conversation = getConversationById();
      const contact = conversation ? getResolvedConversationContact(conversation) : null;
      if (!contact) {
        setAwarenessStatus("未找到当前聊天对象。", "error");
        return;
      }
      const draft = getCurrentAwarenessDraft();
      if (!draft.awarenessText) {
        setAwarenessStatus("请输入察觉文本。", "error");
        return;
      }
      const result = persistAwarenessDraft(contact, conversation, draft, {
        manualTrigger: false
      });
      if (!result.ok) {
        setAwarenessStatus(result.message || "保存失败。", "error");
        return;
      }
      renderMessagesPage();
      setAwarenessStatus("察觉已保存。", "success");
      setMessagesStatus("角色察觉已更新。", "success");
      state.awarenessFormResetRequested = true;
      if (messagesAwarenessTitleInputEl) {
        messagesAwarenessTitleInputEl.value = "";
      }
      if (messagesAwarenessTextInputEl) {
        messagesAwarenessTextInputEl.value = "";
      }
      if (messagesAwarenessEmotionInputEl) {
        messagesAwarenessEmotionInputEl.value = "";
      }
      window.setTimeout(() => {
        setAwarenessModalOpen(false);
      }, 220);
    });
  }

  if (messagesAwarenessTriggerBtnEl) {
    messagesAwarenessTriggerBtnEl.addEventListener("click", async () => {
      const conversation = getConversationById();
      const contact = conversation ? getResolvedConversationContact(conversation) : null;
      if (!contact) {
        setAwarenessStatus("未找到当前聊天对象。", "error");
        return;
      }
      const draft = getCurrentAwarenessDraft();
      if (!draft.awarenessText) {
        setAwarenessStatus("请输入察觉文本。", "error");
        return;
      }
      const result = persistAwarenessDraft(contact, conversation, draft, {
        manualTrigger: true
      });
      if (!result.ok) {
        setAwarenessStatus(result.message || "触发失败。", "error");
        return;
      }
      renderMessagesPage();
      setAwarenessStatus("察觉已保存，正在按这条信息直接生成消息。", "success");
      setMessagesStatus("正在按这条察觉生成消息…", "success");
      state.awarenessFormResetRequested = true;
      if (messagesAwarenessTitleInputEl) {
        messagesAwarenessTitleInputEl.value = "";
      }
      if (messagesAwarenessTextInputEl) {
        messagesAwarenessTextInputEl.value = "";
      }
      if (messagesAwarenessEmotionInputEl) {
        messagesAwarenessEmotionInputEl.value = "";
      }
      setAwarenessModalOpen(false);
      messagesAwarenessTriggerBtnEl.disabled = true;
      try {
        await requestConversationReply({
          conversationId: conversation.id,
          forceDirect: true,
          awarenessImmediateTrigger: true
        });
      } finally {
        messagesAwarenessTriggerBtnEl.disabled = false;
      }
    });
  }

  if (messagesJournalCloseBtnEl) {
    messagesJournalCloseBtnEl.addEventListener("click", () => {
      setJournalOpen(false);
    });
  }

  if (messagesJournalHistoryBtnEl) {
    messagesJournalHistoryBtnEl.addEventListener("click", () => {
      setJournalHistoryOpen(true);
    });
  }

  if (messagesJournalSettingsBtnEl) {
    messagesJournalSettingsBtnEl.addEventListener("click", () => {
      setJournalSettingsOpen(true);
    });
  }

  if (messagesJournalBodyEl) {
    messagesJournalBodyEl.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }
      const todayActionEl = target.closest("[data-action='open-today-journal']");
      if (todayActionEl instanceof Element) {
        state.journalSelectedEntryId = "";
        renderJournalModal();
        return;
      }
      const actionEl = target.closest("[data-action='generate-journal-entry']");
      if (!(actionEl instanceof Element)) {
        return;
      }
      requestJournalEntry();
    });
  }

  if (messagesJournalHistoryCloseBtnEl) {
    messagesJournalHistoryCloseBtnEl.addEventListener("click", () => {
      setJournalHistoryOpen(false);
    });
  }

  if (messagesJournalHistoryListEl) {
    messagesJournalHistoryListEl.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }
      const rowEl = target.closest("[data-action='open-journal-history-entry']");
      if (!(rowEl instanceof HTMLElement)) {
        return;
      }
      openJournalEntryDetail(rowEl.dataset.entryId);
    });
    messagesJournalHistoryListEl.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") {
        return;
      }
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }
      const rowEl = target.closest("[data-action='open-journal-history-entry']");
      if (!(rowEl instanceof HTMLElement)) {
        return;
      }
      event.preventDefault();
      openJournalEntryDetail(rowEl.dataset.entryId);
    });
  }

  if (messagesJournalSettingsCloseBtnEl) {
    messagesJournalSettingsCloseBtnEl.addEventListener("click", () => {
      setJournalSettingsOpen(false);
    });
  }

  if (messagesJournalSettingsCancelBtnEl) {
    messagesJournalSettingsCancelBtnEl.addEventListener("click", () => {
      setJournalSettingsOpen(false);
    });
  }

  if (messagesJournalSettingsFormEl) {
    messagesJournalSettingsFormEl.addEventListener("submit", (event) => {
      event.preventDefault();
      const nextSettings = loadSettings();
      const nextPromptSettings = normalizeMessagePromptSettings({
        ...nextSettings.messagePromptSettings,
        journalLength: messagesJournalLengthInputEl?.value
      });
      nextSettings.messagePromptSettings = nextPromptSettings;
      persistSettings(nextSettings);
      syncActiveConversationPromptSettings();
      setEditorStatus(messagesJournalSettingsStatusEl, "日记长度设置已保存。", "success");
      renderJournalModal();
      window.setTimeout(() => {
        setJournalSettingsOpen(false);
      }, 180);
    });
  }

  if (messagesScheduleCloseBtnEl) {
    messagesScheduleCloseBtnEl.addEventListener("click", () => {
      setSchedulePreviewOpen(false);
    });
  }

  if (messagesDiscussionShareModalCloseBtnEl) {
    messagesDiscussionShareModalCloseBtnEl.addEventListener("click", () => {
      setDiscussionShareModalOpen(false);
    });
  }

  if (messagesWorldbookAddCategoryBtnEl) {
    messagesWorldbookAddCategoryBtnEl.addEventListener("click", () => {
      setWorldbookEditorOpen(true, "category");
    });
  }

  if (messagesWorldbookAddEntryBtnEl) {
    messagesWorldbookAddEntryBtnEl.addEventListener("click", () => {
      setWorldbookEditorOpen(true, "entry");
    });
  }

  if (messagesWorldbookListEl) {
    messagesWorldbookListEl.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }
      const actionEl = target.closest("[data-action]");
      if (!(actionEl instanceof Element)) {
        return;
      }
      const action = String(actionEl.getAttribute("data-action") || "").trim();
      if (action === "toggle-worldbook-group") {
        toggleWorldbookGroup(String(actionEl.getAttribute("data-group-id") || ""));
        return;
      }
      if (action === "edit-worldbook-entry") {
        setWorldbookEditorOpen(
          true,
          "entry",
          String(actionEl.getAttribute("data-entry-id") || "")
        );
        return;
      }
      if (action === "delete-worldbook-entry") {
        deleteWorldbookEntry(String(actionEl.getAttribute("data-entry-id") || ""));
      }
    });
  }

  if (messagesInnerThoughtCloseBtnEl) {
    messagesInnerThoughtCloseBtnEl.addEventListener("click", () => {
      setInnerThoughtModalOpen(false);
    });
  }

  if (messagesInnerThoughtCancelBtnEl) {
    messagesInnerThoughtCancelBtnEl.addEventListener("click", () => {
      setInnerThoughtModalOpen(false);
    });
  }

  if (messagesWorldbookEditorCloseBtnEl) {
    messagesWorldbookEditorCloseBtnEl.addEventListener("click", () => {
      setWorldbookEditorOpen(false);
    });
  }

  if (messagesWorldbookEditorFormEl) {
    messagesWorldbookEditorFormEl.addEventListener("submit", (event) => {
      event.preventDefault();
      try {
        if (state.worldbookEditorMode === "category") {
          const category = createWorldbookCategory(messagesWorldbookNameInputEl?.value || "");
          setWorldbookEditorStatus(`分类“${category.name}”已创建。`, "success");
          setWorldbookStatus(`已创建分类“${category.name}”。`, "success");
        } else {
          const entry = saveWorldbookEntry({
            id: state.worldbookEditingEntryId,
            name: messagesWorldbookNameInputEl?.value || "",
            categoryId: messagesWorldbookCategorySelectEl?.value || "",
            text: messagesWorldbookTextInputEl?.value || ""
          });
          setWorldbookEditorStatus(`世界书“${entry.name}”已保存。`, "success");
          setWorldbookStatus(`世界书“${entry.name}”已保存。`, "success");
        }
        renderWorldbookMountOptions(state.chatPromptSettings.worldbookIds || []);
        window.setTimeout(() => {
          setWorldbookEditorOpen(false);
        }, 220);
      } catch (error) {
        setWorldbookEditorStatus(error?.message || "保存失败。", "error");
      }
    });
  }

  [
    messagesProfileModalEl,
    messagesContactModalEl,
    messagesPickerModalEl,
    messagesMemoryModalEl,
    messagesWorldbookModalEl,
    messagesWorldbookEditorModalEl,
    messagesPlacesModalEl,
    messagesPlaceEditorModalEl
  ]
    .filter(Boolean)
    .forEach((modal) => {
      modal.addEventListener("click", (event) => {
        if (event.target !== modal) {
          return;
        }
        if (modal === messagesProfileModalEl) {
          setProfileEditorOpen(false);
          return;
        }
        if (modal === messagesContactModalEl) {
          setContactEditorOpen(false);
          return;
        }
        if (modal === messagesPickerModalEl) {
          setConversationPickerOpen(false);
          return;
        }
        if (modal === messagesMemoryModalEl) {
          setMemoryViewerOpen(false);
          return;
        }
        if (modal === messagesWorldbookModalEl) {
          setWorldbookManagerOpen(false);
          return;
        }
        if (modal === messagesPlacesModalEl) {
          setPlacesManagerOpen(false);
          return;
        }
        if (modal === messagesPlaceEditorModalEl) {
          setPlaceEditorOpen(false);
          return;
        }
        if (modal === messagesWorldbookEditorModalEl) {
          setWorldbookEditorOpen(false);
        }
      });
    });

  if (messagesChatSettingsModalEl) {
    messagesChatSettingsModalEl.addEventListener("click", (event) => {
      if (event.target === messagesChatSettingsModalEl) {
        setChatSettingsOpen(false);
      }
    });
  }

  if (messagesSceneModalEl) {
    messagesSceneModalEl.addEventListener("click", (event) => {
      if (event.target === messagesSceneModalEl) {
        setSceneModalOpen(false);
      }
    });
  }

  if (messagesChatGlobalSettingsModalEl) {
    messagesChatGlobalSettingsModalEl.addEventListener("click", (event) => {
      if (event.target === messagesChatGlobalSettingsModalEl) {
        setChatGlobalSettingsOpen(false);
      }
    });
  }

  if (messagesSceneSyncModalEl) {
    messagesSceneSyncModalEl.addEventListener("click", (event) => {
      if (event.target === messagesSceneSyncModalEl) {
        setSceneSyncModalOpen(false);
      }
    });
  }

  if (messagesRegenerateModalEl) {
    messagesRegenerateModalEl.addEventListener("click", (event) => {
      if (event.target === messagesRegenerateModalEl) {
        setRegenerateModalOpen(false);
      }
    });
  }

  if (messagesLocationModalEl) {
    messagesLocationModalEl.addEventListener("click", (event) => {
      if (event.target === messagesLocationModalEl) {
        setLocationModalOpen(false);
      }
    });
  }

  if (messagesVoiceModalEl) {
    messagesVoiceModalEl.addEventListener("click", (event) => {
      if (event.target === messagesVoiceModalEl) {
        setVoiceModalOpen(false);
      }
    });
  }

  if (messagesPhotoModalEl) {
    messagesPhotoModalEl.addEventListener("click", (event) => {
      if (event.target === messagesPhotoModalEl) {
        setPhotoModalOpen(false);
      }
    });
  }

  if (messagesAwarenessModalEl) {
    messagesAwarenessModalEl.addEventListener("click", (event) => {
      if (event.target === messagesAwarenessModalEl) {
        setAwarenessModalOpen(false);
      }
    });
  }

  if (messagesInnerThoughtModalEl) {
    messagesInnerThoughtModalEl.addEventListener("click", (event) => {
      if (event.target === messagesInnerThoughtModalEl) {
        setInnerThoughtModalOpen(false);
      }
    });
  }

  if (messagesJournalModalEl) {
    messagesJournalModalEl.addEventListener("click", (event) => {
      if (event.target === messagesJournalModalEl) {
        setJournalOpen(false);
      }
    });
  }

  if (messagesScheduleModalEl) {
    messagesScheduleModalEl.addEventListener("click", (event) => {
      if (event.target === messagesScheduleModalEl) {
        setSchedulePreviewOpen(false);
      }
    });
  }

  if (messagesDiscussionShareModalEl) {
    messagesDiscussionShareModalEl.addEventListener("click", (event) => {
      if (event.target === messagesDiscussionShareModalEl) {
        setDiscussionShareModalOpen(false);
      }
    });
  }

  if (messagesJournalHistoryModalEl) {
    messagesJournalHistoryModalEl.addEventListener("click", (event) => {
      if (event.target === messagesJournalHistoryModalEl) {
        setJournalHistoryOpen(false);
      }
    });
  }

  if (messagesJournalSettingsModalEl) {
    messagesJournalSettingsModalEl.addEventListener("click", (event) => {
      if (event.target === messagesJournalSettingsModalEl) {
        setJournalSettingsOpen(false);
      }
    });
  }

  if (messagesMemoryEditorModalEl) {
    messagesMemoryEditorModalEl.addEventListener("click", (event) => {
      if (event.target === messagesMemoryEditorModalEl) {
        setMemoryEditorOpen(false);
      }
    });
  }

  if (messagesMemorySettingsModalEl) {
    messagesMemorySettingsModalEl.addEventListener("click", (event) => {
      if (event.target === messagesMemorySettingsModalEl) {
        setMemorySettingsOpen(false);
      }
    });
  }

  const handleMessagesForegroundRefresh = async ({ primeWindowFocus = false } = {}) => {
    if (primeWindowFocus && !state.windowFocusPrimed) {
      state.windowFocusPrimed = true;
      return;
    }
    if (shouldSuppressForegroundRefresh()) {
      return;
    }
    if (
      state.profileEditorOpen ||
      state.contactEditorOpen ||
      state.sceneModalOpen ||
      state.sceneSyncModalOpen ||
      state.autoScheduleRequestOpen ||
      state.chatGlobalSettingsOpen ||
      state.placesManagerOpen ||
      state.placeEditorOpen ||
      state.awarenessModalOpen ||
      state.voiceModalOpen ||
      state.photoModalOpen ||
      state.innerThoughtModalOpen ||
      state.conversationPickerOpen ||
      state.chatSettingsOpen ||
      state.memoryViewerOpen ||
      state.memoryEditorOpen ||
      state.memorySettingsOpen ||
      state.worldbookManagerOpen ||
      state.worldbookEditorOpen ||
      state.regenerateModalOpen ||
      state.locationModalOpen ||
      state.schedulePreviewOpen ||
      state.journalOpen ||
      state.journalHistoryOpen ||
      state.journalSettingsOpen
    ) {
      return;
    }
    if (isDirectForegroundReplyFlowActive()) {
      return;
    }
    refreshStateFromStorage();
    if (state.chatCloudHydrated && !state.chatReadonlyMode) {
      await hydrateChatConversationsFromCloud({
        showStatus: false,
        clearStatus: false
      });
    }
    renderMessagesPage();
    if (
      document.hidden ||
      state.activeTab !== "chat" ||
      !state.activeConversationId
    ) {
      return;
    }
    void resumePendingReplyTaskForConversation();
  };

  window.addEventListener("focus", () => {
    void handleMessagesForegroundRefresh({ primeWindowFocus: true });
  });

  window.addEventListener("pagehide", () => {
    syncActiveConversationViewMarker();
    handoffForegroundReplyTaskToBackground();
    flushPendingAssistantReveal("", {
      suppressRender: true
    });
    void flushPendingChatSyncQueue({
      reason: "pagehide",
      keepalive: true,
      rescheduleOnFailure: false
    });
  });

  document.addEventListener("visibilitychange", () => {
    syncActiveConversationViewMarker();
    if (document.hidden) {
      flushPendingAssistantReveal("", {
        suppressRender: true
      });
      void flushPendingChatSyncQueue({
        reason: "pagehide",
        keepalive: true,
        rescheduleOnFailure: false
      });
      return;
    }
    void handleMessagesForegroundRefresh();
  });

  window.addEventListener("storage", (event) => {
    if (
      event.key &&
      ![
        PROFILE_KEY,
        SETTINGS_KEY,
        MESSAGE_CONTACTS_KEY,
        WORLD_BOOKS_KEY,
        MESSAGE_MEMORIES_KEY,
        MESSAGE_RECENT_LOCATIONS_KEY,
        MESSAGE_REPLY_TASKS_KEY,
        MESSAGE_THREADS_KEY,
        MESSAGE_SHARE_INBOX_KEY,
        SCHEDULE_ENTRIES_KEY,
        MESSAGE_COMMON_PLACES_KEY,
        MESSAGE_PRESENCE_STATE_KEY
      ].includes(event.key)
    ) {
      return;
    }
    if (
      state.profileEditorOpen ||
      state.contactEditorOpen ||
      state.awarenessModalOpen ||
      state.voiceModalOpen ||
      state.photoModalOpen ||
      state.innerThoughtModalOpen ||
      state.placeEditorOpen ||
      state.autoScheduleRequestOpen
    ) {
      return;
    }
    if (shouldSuppressForegroundRefresh()) {
      return;
    }
    const storageKey = String(event?.key || "").trim();
    if (
      isDirectForegroundReplyFlowActive() &&
      [MESSAGE_THREADS_KEY, MESSAGE_REPLY_TASKS_KEY].includes(storageKey)
    ) {
      return;
    }
    refreshStateFromStorage();
    renderMessagesPage();
    if (state.locationModalOpen) {
      renderLocationModal();
    }
    if (state.voiceModalOpen) {
      renderVoiceModal();
    }
    if (state.photoModalOpen) {
      renderPhotoModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && state.profileEditorOpen) {
      setProfileEditorOpen(false);
      return;
    }
    if (event.key === "Escape" && state.contactEditorOpen) {
      setContactEditorOpen(false);
      return;
    }
    if (event.key === "Escape" && state.conversationPickerOpen) {
      setConversationPickerOpen(false);
      return;
    }
    if (event.key === "Escape" && state.autoScheduleRequestOpen) {
      setAutoScheduleRequestOpen(false);
      return;
    }
    if (event.key === "Escape" && state.chatSettingsOpen) {
      setChatSettingsOpen(false);
      return;
    }
    if (event.key === "Escape" && state.chatGlobalSettingsOpen) {
      setChatGlobalSettingsOpen(false);
      return;
    }
    if (event.key === "Escape" && state.memoryEditorOpen) {
      setMemoryEditorOpen(false);
      return;
    }
    if (event.key === "Escape" && state.memorySettingsOpen) {
      setMemorySettingsOpen(false);
      return;
    }
    if (event.key === "Escape" && state.memoryViewerOpen) {
      dismissMemoryViewer();
      return;
    }
    if (event.key === "Escape" && state.worldbookEditorOpen) {
      setWorldbookEditorOpen(false);
      return;
    }
    if (event.key === "Escape" && state.worldbookManagerOpen) {
      setWorldbookManagerOpen(false);
      return;
    }
    if (event.key === "Escape" && state.placeEditorOpen) {
      setPlaceEditorOpen(false);
      return;
    }
    if (event.key === "Escape" && state.placesManagerOpen) {
      setPlacesManagerOpen(false);
      return;
    }
    if (event.key === "Escape" && state.regenerateModalOpen) {
      setRegenerateModalOpen(false);
      return;
    }
    if (event.key === "Escape" && state.locationModalOpen) {
      setLocationModalOpen(false);
      return;
    }
    if (event.key === "Escape" && state.voiceModalOpen) {
      setVoiceModalOpen(false);
      return;
    }
    if (event.key === "Escape" && state.photoModalOpen) {
      setPhotoModalOpen(false);
      return;
    }
    if (event.key === "Escape" && state.awarenessModalOpen) {
      setAwarenessModalOpen(false);
      return;
    }
    if (event.key === "Escape" && state.innerThoughtModalOpen) {
      setInnerThoughtModalOpen(false);
      return;
    }
    if (event.key === "Escape" && state.schedulePreviewOpen) {
      setSchedulePreviewOpen(false);
      return;
    }
    if (event.key === "Escape" && state.discussionShareModalOpen) {
      setDiscussionShareModalOpen(false);
      return;
    }
    if (event.key === "Escape" && state.journalSettingsOpen) {
      setJournalSettingsOpen(false);
      return;
    }
    if (event.key === "Escape" && state.journalHistoryOpen) {
      setJournalHistoryOpen(false);
      return;
    }
    if (event.key === "Escape" && state.sceneModalOpen) {
      setSceneModalOpen(false);
      return;
    }
    if (event.key === "Escape" && state.sceneSyncModalOpen) {
      setSceneSyncModalOpen(false);
      return;
    }
    if (event.key === "Escape" && state.journalOpen) {
      setJournalOpen(false);
      return;
    }
    if (event.key === "Escape" && state.composerPanelOpen) {
      const scrollSnapshot = captureConversationScrollSnapshot();
      state.composerPanelOpen = false;
      renderConversationDetail({
        scrollBehavior: "preserve",
        scrollSnapshot
      });
      return;
    }
    if (event.key === "Escape" && state.messageActionMessageId) {
      const scrollSnapshot = captureConversationScrollSnapshot();
      state.messageActionMessageId = "";
      renderConversationDetail({
        scrollBehavior: "preserve",
        scrollSnapshot
      });
      return;
    }
    if (event.key === "Escape" && state.activeConversationId) {
      closeConversationTransientUi();
      state.activeConversationId = "";
      renderMessagesPage();
    }
  });

  document.addEventListener(
    "pointerdown",
    (event) => {
      const target = event.target;
      if (
        target instanceof Element &&
        target.closest(".messages-conversation__composer, .messages-call-screen__composer")
      ) {
        primeForegroundRefreshSuppression(1600);
      }
      if (shouldDismissConversationKeyboardFromTarget(event.target)) {
        window.setTimeout(() => {
          blurConversationInput();
        }, 0);
      }
    },
    true
  );
}

function init() {
  const launchView = getMessagesLaunchView();
  if (document.body) {
    document.body.classList.toggle("embedded", isEmbeddedView());
    document.body.classList.toggle("background-worker", isBackgroundMessagesWorker());
  }
  if (isBackgroundMessagesWorker()) {
    try {
      if (isBackgroundReplyWorker()) {
        initBackgroundReplyWorker();
      } else if (isBackgroundAutomationWorker()) {
        initBackgroundAutomationWorker();
      } else {
        initBackgroundMessagesWorker();
      }
    } catch (error) {
      console.error("[Pulse Messages] Background worker init failed:", error);
    }
    notifyEmbeddedReady();
    return;
  }
  state.memoryStandaloneLaunch = launchView === "memory";
  if (launchView === "memory") {
    state.activeTab = "me";
  }
  bindMessagesViewportHeight();
  ensureVoiceCallDurationClock();
  attachEvents();
  renderMessagesPage();
  window.setTimeout(async () => {
    try {
      refreshStateFromStorage({
        forceLocalConversations: true
      });
      sanitizePresenceStateReferences();
      persistPresenceState();
      persistConversationMirror(state.conversations);
      initAutoScheduleClock();
      initProactiveTriggerClock();
      initForegroundReplySyncClock();
      await hydrateChatConversationsFromCloud({
        showStatus: true
      });
      renderMessagesPage();
      if (launchView === "memory") {
        setMemoryViewerOpen(true);
      }
    } catch (error) {
      console.error("[Pulse Messages] Init hydration failed:", error);
      setMessagesStatus(`Chat 初始化失败：${error?.message || "未知错误"}`, "error");
      try {
        renderMessagesPage();
      } catch (_renderError) {
      }
    } finally {
      notifyEmbeddedReady();
    }
  }, 0);
}

init();
