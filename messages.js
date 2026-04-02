const DEFAULT_OPENAI_ENDPOINT = "https://api.deepseek.com/chat/completions";
const DEFAULT_GEMINI_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta";
const DEFAULT_DEEPSEEK_MODEL = "deepseek-chat";
const DEFAULT_GEMINI_MODEL = "gemini-2.0-flash";
const SETTINGS_KEY = "x_style_generator_settings_v2";
const POSTS_KEY = "x_style_generator_posts_v2";
const PROFILE_KEY = "x_style_generator_profile_v1";
const PROFILE_POSTS_KEY = "x_style_generator_profile_posts_v1";
const DIRECT_MESSAGES_KEY = "x_style_generator_direct_messages_v1";
const MESSAGE_CONTACTS_KEY = "x_style_generator_message_contacts_v1";
const MESSAGE_THREADS_KEY = "x_style_generator_message_threads_v1";
const WORLD_BOOKS_KEY = "x_style_generator_message_worldbooks_v1";
const BUBBLE_THREADS_KEY = "x_style_generator_bubble_threads_v1";
const SCHEDULE_ENTRIES_KEY = "x_style_generator_schedule_entries_v1";
const MESSAGE_JOURNAL_ENTRIES_KEY = "x_style_generator_message_journal_entries_v1";
const MESSAGE_WEATHER_CACHE_KEY = "x_style_generator_message_weather_cache_v1";
const MESSAGE_MEMORIES_KEY = "x_style_generator_message_memories_v1";
const MESSAGE_RECENT_LOCATIONS_KEY = "x_style_generator_message_recent_locations_v1";
const DEFAULT_TEMPERATURE = 0.85;
const DEFAULT_MESSAGE_HISTORY_ROUNDS = 6;
const MAX_MESSAGE_HISTORY_ROUNDS = 20;
const DEFAULT_MESSAGE_REPLY_SENTENCE_LIMIT = 7;
const MAX_MESSAGE_REPLY_SENTENCE_LIMIT = 20;
const DEFAULT_MESSAGE_JOURNAL_LENGTH = 320;
const MAX_MESSAGE_JOURNAL_LENGTH = 1600;
const DEFAULT_SCHEDULE_AWARENESS_WINDOW_MINUTES = 30;
const MAX_SCHEDULE_AWARENESS_WINDOW_MINUTES = 720;
const DEFAULT_MESSAGE_AWARENESS_INTERVAL_ROUNDS = 15;
const MAX_MESSAGE_AWARENESS_INTERVAL_ROUNDS = 200;
const DEFAULT_MEMORY_SUMMARY_INTERVAL_ROUNDS = 4;
const MAX_MEMORY_SUMMARY_INTERVAL_ROUNDS = 20;
const DEFAULT_CORE_MEMORY_THRESHOLD = 80;
const DEFAULT_SCENE_MEMORY_THRESHOLD = 65;
const DEFAULT_CONTEXT_FOCUS_MINUTES = 60;
const MAX_CONTEXT_FOCUS_MINUTES = 1440;
const CONVERSATION_SOFT_MESSAGE_LIMIT = 240;
const CONVERSATION_MIN_MESSAGE_LIMIT = 80;
const CONVERSATION_STORAGE_TARGET_CHARS = 1400000;
const CONVERSATION_IMAGE_PAYLOAD_KEEP_COUNT = 20;
const DEFAULT_WORLDVIEW =
  "这是一个强调长期主义、产品洞察和公共讨论质量的中文社交世界。用户习惯像在 X 上一样快速表达观点，但会天然追问效率、增长、AI 和平台变迁。整体语气要真实、犀利、能引发跟帖，不要写成官方通稿。";

const DEFAULT_SETTINGS = {
  mode: "openai",
  endpoint: DEFAULT_OPENAI_ENDPOINT,
  token: "",
  model: DEFAULT_DEEPSEEK_MODEL,
  apiConfigs: [],
  activeApiConfigId: "",
  translationApiEnabled: false,
  translationApiConfigId: "",
  summaryApiEnabled: false,
  summaryApiConfigId: "",
  worldview: DEFAULT_WORLDVIEW,
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

const TAB_TITLES = {
  chat: "微信",
  contacts: "通讯录",
  me: "我"
};

const CONTACT_ENTRY_GROUPS = [
  [
    { id: "memory", label: "记忆", icon: "memory" },
    { id: "worldbook", label: "世界书", icon: "cube" },
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
const messagesContactFormEl = document.querySelector("#messages-contact-form");
const messagesContactAvatarPreviewEl = document.querySelector("#messages-contact-avatar-preview");
const messagesContactAvatarFileInputEl = document.querySelector("#messages-contact-avatar-file-input");
const messagesContactAvatarResetBtnEl = document.querySelector("#messages-contact-avatar-reset-btn");
const messagesContactNameInputEl = document.querySelector("#messages-contact-name-input");
const messagesContactPersonaInputEl = document.querySelector("#messages-contact-persona-input");
const messagesContactSpecialPersonaInputEl = document.querySelector(
  "#messages-contact-special-persona-input"
);
const messagesContactEditorStatusEl = document.querySelector("#messages-contact-editor-status");

const messagesPickerModalEl = document.querySelector("#messages-picker-modal");
const messagesPickerCloseBtnEl = document.querySelector("#messages-picker-close-btn");
const messagesPickerListEl = document.querySelector("#messages-picker-list");

const messagesChatSettingsModalEl = document.querySelector("#messages-chat-settings-modal");
const messagesChatSettingsCloseBtnEl = document.querySelector(
  "#messages-chat-settings-close-btn"
);
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
const messagesChatShowContactAvatarInputEl = document.querySelector(
  "#messages-chat-show-contact-avatar-input"
);
const messagesChatShowUserAvatarInputEl = document.querySelector(
  "#messages-chat-show-user-avatar-input"
);
const messagesChatSettingsStatusEl = document.querySelector("#messages-chat-settings-status");

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
const messagesAwarenessModalEl = document.querySelector("#messages-awareness-modal");
const messagesAwarenessCloseBtnEl = document.querySelector("#messages-awareness-close-btn");
const messagesAwarenessCancelBtnEl = document.querySelector("#messages-awareness-cancel-btn");
const messagesAwarenessFormEl = document.querySelector("#messages-awareness-form");
const messagesAwarenessTextInputEl = document.querySelector("#messages-awareness-text-input");
const messagesAwarenessEmotionInputEl = document.querySelector(
  "#messages-awareness-emotion-input"
);
const messagesAwarenessSensitivityInputEl = document.querySelector(
  "#messages-awareness-sensitivity-input"
);
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

const state = {
  profile: loadProfile(),
  contacts: loadContacts(),
  conversations: loadConversations(),
  worldbooks: loadWorldbooks(),
  journalEntries: loadJournalEntries(),
  memories: loadMessageMemories(),
  recentLocations: loadRecentLocations(),
  chatPromptSettings: loadSettings().messagePromptSettings,
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
  worldbookManagerOpen: false,
  worldbookEditorOpen: false,
  worldbookEditorMode: "entry",
  worldbookEditingEntryId: "",
  worldbookCollapsedGroupIds: [],
  sendingConversationId: "",
  composerPanelOpen: false,
  messageActionMessageId: "",
  regenerateModalOpen: false,
  regenerateInstruction: "",
  locationModalOpen: false,
  awarenessModalOpen: false,
  locationDraftName: "",
  locationDraftCoordinates: "",
  journalOpen: false,
  journalHistoryOpen: false,
  journalSettingsOpen: false,
  schedulePreviewOpen: false,
  memoryViewerOpen: false,
  memoryEditorOpen: false,
  memorySettingsOpen: false,
  memoryStandaloneLaunch: false,
  memorySelectedContactId: "",
  memoryQuery: "",
  memoryTab: "all",
  journalGenerating: false,
  journalWeatherDate: "",
  journalWeatherLabel: "",
  journalWeatherLoading: false,
  journalWeatherError: "",
  journalStatusMessage: "",
  journalStatusTone: "",
  windowFocusPrimed: initialWindowFocusPrimed
};

function isEmbeddedView() {
  try {
    const params = new URLSearchParams(window.location.search);
    return params.get("embed") === "1";
  } catch (_error) {
    return false;
  }
}

function requestEmbeddedClose() {
  if (!isEmbeddedView()) {
    return;
  }

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
  if (Object.prototype.hasOwnProperty.call(memoryStorage, key)) {
    return memoryStorage[key];
  }
  try {
    return window.localStorage.getItem(key);
  } catch (_error) {
    return null;
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

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
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

function buildImageMessageText() {
  return "[图片消息]";
}

function isLocationConversationMessage(message) {
  const explicitType = String(message?.messageType || "").trim() === "location";
  const hasPayload =
    Boolean(String(message?.locationName || "").trim()) &&
    Boolean(String(message?.coordinates || "").trim());
  return explicitType || hasPayload;
}

function isImageConversationMessage(message) {
  const explicitType = String(message?.messageType || "").trim() === "image";
  const hasPayload = Boolean(String(message?.imageDataUrl || "").trim());
  return explicitType || hasPayload;
}

function getConversationMessagePreviewText(message) {
  if (isLocationConversationMessage(message)) {
    return `📍 ${String(message.locationName || "").trim() || "分享了位置"}`;
  }
  if (isImageConversationMessage(message)) {
    return "🖼️ 发送了图片";
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
  const quality = Math.min(0.92, Math.max(0.68, Number(avatarOptions.quality) || 0.8));
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

function appendApiLog(entry) {
  try {
    window.PulseApiLog?.append?.(entry);
  } catch (_error) {
  }
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
    showContactAvatar:
      typeof resolved.showContactAvatar === "boolean" ? resolved.showContactAvatar : true,
    showUserAvatar: typeof resolved.showUserAvatar === "boolean" ? resolved.showUserAvatar : true
  };
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
  if (mode === "gemini" || mode === "generic") {
    return mode;
  }
  return "openai";
}

function getDefaultModelByMode(mode) {
  return normalizeApiMode(mode) === "gemini" ? DEFAULT_GEMINI_MODEL : DEFAULT_DEEPSEEK_MODEL;
}

function normalizeApiConfigToken(token) {
  return String(token || "").trim();
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

function normalizeSettingsEndpointByMode(mode, endpoint) {
  const resolvedMode = normalizeApiMode(mode);
  if (resolvedMode === "openai") {
    return normalizeOpenAICompatibleEndpoint(endpoint);
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
  merged.model =
    merged.mode === "generic"
      ? ""
      : String(merged.model || getDefaultModelByMode(merged.mode)).trim() ||
        getDefaultModelByMode(merged.mode);
  merged.worldview = String(merged.worldview || DEFAULT_WORLDVIEW).trim() || DEFAULT_WORLDVIEW;
  merged.apiConfigs = normalizeApiConfigs(merged.apiConfigs || []);
  merged.messagePromptSettings = normalizeMessagePromptSettings(
    merged.messagePromptSettings || source?.messagePromptSettings || {}
  );

  const activeConfig =
    merged.apiConfigs.find((item) => item.id === merged.activeApiConfigId) || null;
  if (!activeConfig) {
    merged.activeApiConfigId = "";
  } else {
    merged.mode = normalizeApiMode(activeConfig.mode);
    merged.endpoint = normalizeSettingsEndpointByMode(activeConfig.mode, activeConfig.endpoint);
    merged.token = normalizeApiConfigToken(activeConfig.token);
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
  const finishReason = getGeminiFinishReason(payload);
  return {
    geminiFinishReason: finishReason,
    gemini_finish_reason: finishReason
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
  if (normalizeApiMode(settings.mode) === "openai" && !settings.model) {
    throw new Error("DeepSeek / OpenAI 兼容模式需要填写模型名称。");
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

  safeSetItem(
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
    specialUserPersona: String(source.specialUserPersona || "").trim(),
    awarenessText: String(source.awarenessText || "").trim(),
    awarenessEmotionShift: String(source.awarenessEmotionShift || "").trim(),
    awarenessSensitivity: normalizeAwarenessSensitivity(source.awarenessSensitivity),
    awarenessConsumed: Boolean(source.awarenessConsumed),
    createdAt: Number(source.createdAt) || Date.now(),
    updatedAt: Number(source.updatedAt) || Date.now()
  };
}

function loadContacts() {
  const raw = safeGetItem(MESSAGE_CONTACTS_KEY);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.map((item, index) => normalizeContact(item, index))
      : [];
  } catch (_error) {
    return [];
  }
}

function persistContacts() {
  safeSetItem(MESSAGE_CONTACTS_KEY, JSON.stringify(state.contacts));
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

function loadMessageMemories() {
  const raw = safeGetItem(MESSAGE_MEMORIES_KEY);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed
          .map((item, index) => normalizeMessageMemory(item, index))
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
  const next = Array.isArray(existing) ? [...existing] : [];
  incoming.forEach((candidate, index) => {
    const entry = normalizeMessageMemory(candidate, index);
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
    next[foundIndex] = {
      ...current,
      type: current.type === "core" || entry.type === "core" ? "core" : "scene",
      importance: Math.max(Number(current.importance) || 0, Number(entry.importance) || 0),
      source: current.source === "manual" ? "manual" : entry.source,
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
  const messageType = isLocationConversationMessage(message)
    ? "location"
    : isImageConversationMessage(message)
      ? "image"
      : "text";
  const locationName = String(message?.locationName || "").trim();
  const coordinates = String(message?.coordinates || "").trim();
  const imageDataUrl = String(message?.imageDataUrl || "").trim();
  const text =
    messageType === "location"
      ? buildLocationMessageText(
          locationName || "未命名位置",
          coordinates || buildRandomLocationCoordinates(`${locationName}_${index}`)
        )
      : messageType === "image"
        ? buildImageMessageText()
      : String(message?.text || "").trim();
  return {
    id: String(message?.id || `conversation_message_${Date.now()}_${index}`),
    role,
    messageType,
    locationName:
      messageType === "location" ? locationName || "未命名位置" : "",
    coordinates:
      messageType === "location"
        ? coordinates || buildRandomLocationCoordinates(`${locationName}_${index}`)
        : "",
    imageDataUrl: messageType === "image" ? imageDataUrl : "",
    text,
    needsReply: role === "user" ? Boolean(message?.needsReply) : false,
    time:
      /^\d{1,2}:\d{2}$/.test(String(message?.time || "").trim())
        ? String(message.time).trim()
        : formatLocalTime(),
    createdAt: Number(message?.createdAt) || Date.now() + index
  };
}

function normalizeConversation(conversation, index = 0) {
  const source = conversation && typeof conversation === "object" ? conversation : {};
  if (!source.contactId) {
    return null;
  }

  const messages = Array.isArray(source.messages)
    ? source.messages
        .map((item, messageIndex) => normalizeConversationMessage(item, messageIndex))
        .filter((item) => item.text)
    : [];

  return {
    id: String(source.id || `conversation_${index}_${hashText(source.contactId)}`),
    contactId: String(source.contactId || ""),
    contactNameSnapshot: String(source.contactNameSnapshot || "").trim(),
    contactAvatarImageSnapshot: String(source.contactAvatarImageSnapshot || "").trim(),
    contactAvatarTextSnapshot: String(source.contactAvatarTextSnapshot || "").trim(),
    messages,
    awarenessCounter: Math.max(
      0,
      Number.parseInt(String(source.awarenessCounter || 0), 10) || 0
    ),
    memorySummaryCounter: Math.max(
      0,
      Number.parseInt(String(source.memorySummaryCounter || 0), 10) || 0
    ),
    memorySummaryLastMessageCount: Math.max(
      0,
      Number.parseInt(String(source.memorySummaryLastMessageCount || 0), 10) || 0
    ),
    updatedAt: Number(source.updatedAt) || messages[messages.length - 1]?.createdAt || Date.now()
  };
}

function loadConversations() {
  const raw = safeGetItem(MESSAGE_THREADS_KEY) || safeGetItem(DIRECT_MESSAGES_KEY);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.map((item, index) => normalizeConversation(item, index)).filter(Boolean)
      : [];
  } catch (_error) {
    return [];
  }
}

function cloneConversationsForStorage(conversations = []) {
  return (Array.isArray(conversations) ? conversations : []).map((conversation) => ({
    ...conversation,
    messages: Array.isArray(conversation?.messages)
      ? conversation.messages.map((message) => ({ ...message }))
      : []
  }));
}

function trimConversationMessagesForStorage(conversations = []) {
  return cloneConversationsForStorage(conversations).map((conversation) => {
    if (conversation.messages.length > CONVERSATION_SOFT_MESSAGE_LIMIT) {
      conversation.messages = conversation.messages.slice(-CONVERSATION_SOFT_MESSAGE_LIMIT);
      recalculateConversationUpdatedAt(conversation);
    }
    return conversation;
  });
}

function stripOldConversationImagePayloads(conversations = []) {
  return cloneConversationsForStorage(conversations).map((conversation) => {
    const imageIndexes = conversation.messages.reduce((indexes, message, index) => {
      if (String(message?.imageDataUrl || "").trim()) {
        indexes.push(index);
      }
      return indexes;
    }, []);
    if (imageIndexes.length <= CONVERSATION_IMAGE_PAYLOAD_KEEP_COUNT) {
      return conversation;
    }
    const keepIndexes = new Set(
      imageIndexes.slice(-CONVERSATION_IMAGE_PAYLOAD_KEEP_COUNT)
    );
    conversation.messages = conversation.messages.map((message, index) => {
      if (!String(message?.imageDataUrl || "").trim() || keepIndexes.has(index)) {
        return message;
      }
      return {
        ...message,
        imageDataUrl: "",
        text: buildImageMessageText()
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
  recalculateConversationUpdatedAt(target);
  return true;
}

function persistConversations() {
  let nextConversations = trimConversationMessagesForStorage(state.conversations);
  let payload = JSON.stringify(nextConversations);

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

  while (!safeSetItem(MESSAGE_THREADS_KEY, payload)) {
    const changed = pruneOldestConversationBatch(nextConversations);
    if (!changed) {
      break;
    }
    payload = JSON.stringify(nextConversations);
  }

  state.conversations = nextConversations
    .map((conversation, index) => normalizeConversation(conversation, index))
    .filter(Boolean);
}

function getContactById(contactId) {
  return state.contacts.find((item) => item.id === contactId) || null;
}

function getConversationById(conversationId = state.activeConversationId) {
  return state.conversations.find((item) => item.id === conversationId) || null;
}

function getConversationMeta(conversation) {
  const contact = getContactById(conversation.contactId);
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
    messages: [],
    awarenessCounter: 0,
    memorySummaryCounter: 0,
    memorySummaryLastMessageCount: 0,
    updatedAt: Date.now()
  };
  state.conversations = [conversation, ...state.conversations];
  persistConversations();
  return conversation;
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
          insFocusMinutes: DEFAULT_CONTEXT_FOCUS_MINUTES
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
        )
      };
    })
    .filter(Boolean)
    .map((tab) => ({
      ...tab,
      worldbookIds: normalizeMountedIds(tab.worldbookIds || []),
      bubbleFocusMinutes: normalizeContextFocusMinutes(tab.bubbleFocusMinutes),
      insFocusMinutes: normalizeContextFocusMinutes(tab.insFocusMinutes)
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

function buildTimeAwarenessContext(promptSettings) {
  if (!promptSettings.timeAwareness) {
    return "";
  }
  return `当前本地时间：${formatAwarenessTime(new Date())}`;
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
  const memories = getMemoriesForContact(contact?.id || "");
  if (!memories.length) {
    return {
      core: "",
      scene: ""
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

  return {
    core: coreMemories.length
      ? [
          "这些核心记忆会稳定影响你当下的心情、判断和对用户的态度，请像真的记得它们一样自然体现：",
          ...coreMemories.map(
            (item) => `- 重要度 ${item.importance}/100：${String(item.content || "").trim()}`
          )
        ].join("\n")
      : "",
    scene: sceneMemories.length
      ? [
          "这些情景记忆只在聊天内容自然触发时再想起来，不需要主动硬提：",
          ...sceneMemories.map(
            (item) => `- 重要度 ${item.importance}/100：${String(item.content || "").trim()}`
          )
        ].join("\n")
      : ""
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
  if (!promptSettings.bubbleFocusEnabled) {
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

  return `用户最近一轮 Bubble 发言（共 ${latestBatch.length} 条）：\n${latestBatch
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
    const trimmed = String(value || "").trim();
    return /^\d{2}:\d{2}$/.test(trimmed) ? trimmed : fallback;
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
    date,
    startTime: normalizeTimeValue(
      source.startTime,
      scheduleType === "hour" || scheduleType === "week" ? "09:00" : ""
    ),
    endTime: normalizeTimeValue(
      source.endTime,
      scheduleType === "hour" || scheduleType === "week" ? "10:00" : ""
    ),
    createdAt: Number(source.createdAt) || Date.now(),
    updatedAt: Number(source.updatedAt) || Date.now()
  };
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
  const start = parseLocalDateTimeValue(baseDateText, entry.startTime || "09:00");
  const end = parseLocalDateTimeValue(baseDateText, entry.endTime || "10:00");
  if (!start || !end) {
    return null;
  }
  if (end <= start) {
    end.setTime(start.getTime() + 60 * 60 * 1000);
  }
  return { start, end };
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
    const start = parseLocalDateTimeValue(entry.date, entry.startTime || "09:00");
    const end = parseLocalDateTimeValue(entry.date, entry.endTime || "10:00");
    if (!start || !end) {
      return [];
    }
    if (end <= start) {
      end.setTime(start.getTime() + 60 * 60 * 1000);
    }
    return [{ start, end }];
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
  return entry.date === dateText;
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
  return `${entry.startTime}-${entry.endTime}`;
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
  const endMinutes = Math.max(startMinutes + 1, parseTimeToMinutes(entry.endTime));
  return Math.max(
    Number.parseInt(String(entry.startTime || "00:00").slice(0, 2), 10) || 0,
    Math.min(23, Math.floor(endMinutes / 60))
  );
}

function schedulePreviewEntryOccupiesHour(entry, hour) {
  if (!entry || entry.scheduleType === "day") {
    return false;
  }
  const startMinutes = parseTimeToMinutes(entry.startTime);
  const endMinutes = Math.max(startMinutes + 1, parseTimeToMinutes(entry.endTime));
  const slotStart = hour * 60;
  const slotEnd = Math.min(24 * 60, (hour + 1) * 60);
  return startMinutes < slotEnd && endMinutes >= slotStart;
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
  const minutes = Math.max(1, Math.round(milliseconds / 60000));
  return `${minutes} 分钟`;
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
        return { type: "current", distance: 0, range };
      }
      if (now > range.end) {
        const distance = now.getTime() - range.end.getTime();
        if (distance <= windowMs) {
          return { type: "recent", distance, range };
        }
      }
      if (range.start > now) {
        const distance = range.start.getTime() - now.getTime();
        if (distance <= windowMs) {
          return { type: "upcoming", distance, range };
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
    return `${ownerLabel}当前有行程「${entry.title}」正在进行。`;
  }
  if (awareness.type === "recent") {
    return `${ownerLabel}在 ${formatScheduleDistanceMinutes(awareness.distance)} 前刚结束行程「${entry.title}」。`;
  }
  return `${ownerLabel}在 ${formatScheduleDistanceMinutes(awareness.distance)} 后有行程「${entry.title}」。`;
}

function buildScheduleAwarenessContext(contact, history = [], promptSettings = {}) {
  const windowMinutes = normalizeMessagePromptSettings(promptSettings).scheduleAwarenessWindowMinutes;
  const entries = getVisibleScheduleEntriesForContact(contact?.id || "");
  if (!entries.length) {
    return "";
  }

  const now = new Date();
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

  if (!activeEntries.length) {
    return "";
  }

  return [
    `日程感知窗口：最近 ${windowMinutes} 分钟。`,
    ...activeEntries.map((item) => `- ${buildScheduleAwarenessLine(item.entry, item.awareness)}`),
    "如果这些行程和当前聊天自然相关，你可以顺带表达一句关心、提醒或配合；不要为了提行程而生硬转移话题，也不要重复提起刚刚已经主动说过的同一条行程。"
  ].join("\n");
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
  const memoryContexts = buildMemoryPromptContexts(contact, promptSettings);
  const parts = [
    `你叫 ${contact.name}。`,
    `现在是你和 ${profile.username || DEFAULT_PROFILE.username} 在即时聊天软件里的一对一私聊。`,
    "先像这个人本人一样去理解这段关系、语气和情绪，不要把自己当成解释设定或执行任务的助手。",
    "下面的信息都是你已经拥有的长期记忆与当下语境；只有在自然相关时才轻轻带出，不需要像背资料一样复述。",
    "如果信息之间出现冲突，请按以下优先级从低到高理解：热点挂载 < 世界书挂载 < INS 关注 < Bubble 关注 < 情景记忆 < 日程感知 < 时间感知 < 核心记忆与自身稳定心态 < 最近对话轮数消息 < 回复格式要求。"
  ];

  const awarenessSections = [
    buildHotTopicsContext(settings, promptSettings),
    buildWorldbookContext(promptSettings),
    buildForumPostFocusContext(promptSettings),
    buildBubbleFocusContext(promptSettings),
    memoryContexts.scene,
    buildScheduleAwarenessContext(contact, history, promptSettings),
    buildTimeAwarenessContext(promptSettings)
  ].filter(Boolean);

  parts.push(
    `你的稳定性格、表达习惯和关系底色：${
      contact.personaPrompt || "自然、友好、会根据关系和语境稳定回应。"
    }。`
  );

  if (memoryContexts.core) {
    parts.push(memoryContexts.core);
  }

  if (awarenessSections.length) {
    parts.push(
      `补充语境信息（相关时轻微融入；不相关就完全不提，也不要像总结背景一样复述）：\n${awarenessSections.join(
        "\n\n"
      )}`
    );
  }

  parts.push(
    `正在和你聊天的用户昵称：${profile.username || DEFAULT_PROFILE.username}。`,
    `你对这个用户已知的整体印象：${
      profile.personaPrompt || DEFAULT_PROFILE.personaPrompt
    }。`
  );

  if (String(contact.specialUserPersona || "").trim()) {
    parts.push(
      `你对这个用户的特别认知：${String(contact.specialUserPersona || "").trim()}。这部分是你基于相处形成的更私人、更具体的认识，重要程度略高于用户的通用画像。`
    );
  }

  if (requestOptions.triggeredAwareness?.text) {
    parts.push(
      [
        `你刚刚自己忽然想起了一条并非来自用户当前对话、而是你此前独自察觉到的额外信息：${String(
          requestOptions.triggeredAwareness.text || ""
        ).trim()}。`,
        requestOptions.triggeredAwareness.emotionShift
          ? `这让你此刻的心绪与态度轻微转向：${String(
              requestOptions.triggeredAwareness.emotionShift || ""
            ).trim()}。`
          : "",
        "请把它当作你自己突然联想到的隐性线索，而不是用户刚刚告诉你的内容；这次回复里可以自然地主动带起相关话题，但仍然要先接住当前聊天。"
      ]
        .filter(Boolean)
        .join("\n")
    );
  }

  if (requestOptions.regenerate) {
    parts.push(
      [
        "这是一条针对上一版回复的重回请求，需要重新生成这一轮回复。",
        "不要沿用上一版的句式、结构、开头或明显重复的措辞。",
        requestOptions.regenerateInstruction
          ? `本次重回的额外要求：${requestOptions.regenerateInstruction}。`
          : ""
      ]
        .filter(Boolean)
        .join("\n")
    );
  }

  parts.push(
    "先接住这一轮对话里最真实的情绪、关系推进和潜台词，再决定是否需要带出任何背景信息。",
    "如果某些背景对这一句回复没有帮助，可以完全不提。",
    "回复要像真人在聊天软件里即时回消息，可以有自然口语、省略、停顿、转折和情绪，不要像客服、摘要、设定说明或任务执行结果。",
    "不要为了显得自己记得很多事，就生硬提论坛、世界书、Bubble、INS、日程、时间或记忆条目本身；只有真的会自然想到时才轻轻带过。",
    "不要使用“根据设定”“结合以上信息”“从背景来看”“你最近关注”这类机械引入。",
    "请只输出联系人下一条回复，不要添加角色标签、前缀、旁白或解释。",
    `回复要像真实聊天，简洁自然，可以带情绪，总共不要超过${promptSettings.replySentenceLimit}行。`,
    "如果一句话里自然出现逗号或句号，请按分句拆成多行输出。",
    "每一行都会被视为一条单独发出的聊天消息。",
    "每一行结尾若原本是逗号或句号，请去掉这一枚逗号或句号。",
    "如果聊天记录里出现“[定位消息]”，那代表对方真实发送了一条位置卡片，而不是普通文本。",
    "如果某条用户消息里出现“[图片消息]”，你会直接看到那条消息附带的图片内容；如有需要可以自然参考图片，但不要机械描述图片本身。",
    '如果你也要发送定位，必须单独输出一行严格 JSON，格式固定为：[{"type":"location","locationName":"位置名","coordinates":"116.417E, 40.1277N"}]。',
    "定位 JSON 不要放进代码块，不要添加解释、前缀、序号或额外说明；它本身就算一行回复。",
    "不要去掉感叹号、问号、波浪号、省略号等表达情绪的标点。",
    "不要输出编号、列表符号、引号包裹、解释说明、舞台指令或心理活动旁白。"
  );

  return parts.join("\n\n");
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
  const dateText = String(journalOptions.dateText || getTodayDateValue()).trim() || getTodayDateValue();
  const chatTranscript = buildJournalChatTranscript(conversation, dateText);
  const referenceContext = buildJournalReferenceContext(settings, promptSettings);

  return [
    `你是即时聊天联系人：${contact.name}。`,
    "现在不是聊天回复，而是以这个角色的第一人称口吻写一篇今日日记。",
    `日期：${formatJournalFullDateLabel(dateText)}。`,
    `角色人设：${contact.personaPrompt || "自然、细腻、会根据设定稳定表达。"}。`,
    `和你聊天的用户昵称：${profile.username || DEFAULT_PROFILE.username}。`,
    `用户的人设：${profile.personaPrompt || DEFAULT_PROFILE.personaPrompt}。`,
    referenceContext
      ? `补充背景（只做参考，优先级低于今日日内聊天记录）：\n${referenceContext}`
      : "",
    chatTranscript
      ? `今日自然日内的聊天记录（最重要，请围绕这些内容来写）：\n${chatTranscript}`
      : "今日自然日内没有聊天记录。",
    [
      "输出要求：",
      "1. 只输出日记正文，不要标题、署名、编号、项目符号、解释或 markdown。",
      "2. 正文里要自然写出今天是几月几日、星期几；天气只能从今天的聊天记录里提取，若聊天里没有提到天气，就自然写成没特别留意到天气，不要硬编温度、天气现象或城市。",
      "3. 今日聊天记录是核心，挂载的世界书和论坛背景只做辅助参考。",
      `4. 控制在 ${normalizeMessagePromptSettings(promptSettings).journalLength} 字以内。`,
      "5. 语气要像当天稍晚写下来的私人记录，细节真实，不要写成总结报告。",
      "6. 适当增加一些心理活动、犹豫、回味和没说出口的小念头。"
    ].join("\n")
  ]
    .filter(Boolean)
    .join("\n\n");
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

function buildChatRequestBody(settings, systemPrompt, history = []) {
  const mode = normalizeApiMode(settings.mode);
  if (mode === "openai") {
    return {
      model: settings.model || DEFAULT_DEEPSEEK_MODEL,
      temperature: DEFAULT_TEMPERATURE,
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        ...history.map((message) => ({
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
      contents: history.map((message) => ({
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
        temperature: DEFAULT_TEMPERATURE
      }
    };
  }

  return {
    prompt: buildGenericConversationPrompt(systemPrompt, history),
    intent: "chat"
  };
}

function collapseConversationMessagesByTurn(messages = []) {
  if (!Array.isArray(messages) || !messages.length) {
    return [];
  }

  return messages.reduce((collapsed, message) => {
    const text = String(message?.text || "").trim();
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
  if (mode === "openai") {
    return {
      model: settings.model || DEFAULT_DEEPSEEK_MODEL,
      temperature: DEFAULT_TEMPERATURE,
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
        temperature: DEFAULT_TEMPERATURE
      }
    };
  }

  return {
    prompt: [systemPrompt, userInstruction, "日记正文："].filter(Boolean).join("\n\n"),
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
  if (mode === "openai") {
    return {
      model: settings.model || DEFAULT_DEEPSEEK_MODEL,
      temperature: DEFAULT_TEMPERATURE,
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
        temperature: DEFAULT_TEMPERATURE
      }
    };
  }

  return {
    prompt: [systemPrompt, userInstruction].filter(Boolean).join("\n\n"),
    intent
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
  const memories = getMemoriesForContact(contactId).slice(0, 16);
  if (!memories.length) {
    return "暂无已有记忆。";
  }
  return memories
    .map(
      (item) =>
        `- [${item.type === "core" ? "核心" : "情景"} ${item.importance}/100] ${String(
          item.content || ""
        ).trim()}`
    )
    .join("\n");
}

function buildMemorySummarySystemPrompt(profile, contact) {
  return [
    `你正在为联系人 ${contact.name} 整理一对一聊天里的长期记忆。`,
    `这个联系人的稳定性格与表达底色：${
      contact.personaPrompt || "自然、友好、会根据关系稳定回应。"
    }。`,
    `聊天对象昵称：${profile.username || DEFAULT_PROFILE.username}。`,
    `用户整体画像：${profile.personaPrompt || DEFAULT_PROFILE.personaPrompt}。`,
    "你的目标不是写摘要，而是从新对话中提取未来聊天真正值得记住的内容。",
    "核心记忆的标准非常严格：只有会改变联系人对用户的态度、距离感、信任、期待、介意点，或改变联系人看待某个话题/事物的心境与立场，才算核心记忆。",
    "除此之外，其他能在相关话题里帮助回想上下文的内容，都归为情景记忆。",
    "不要把普通闲聊、礼貌回应、表层信息重复写成核心记忆。",
    "输出必须是 JSON，对象格式固定为：{\"memories\":[{\"type\":\"core|scene\",\"content\":\"...\",\"importance\":1-100}]}",
    "importance 使用整数。1 越低越不重要，100 越重要。",
    "最多输出 6 条；如果没有值得保留的内容，就输出 {\"memories\":[]}。",
    "不要输出 markdown，不要代码块，不要解释，不要额外字段。"
  ].join("\n\n");
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

function parseMemorySummaryPayload(payload, contactId = "") {
  const parsed =
    (payload && typeof payload === "object" && Array.isArray(payload.memories) ? payload : null) ||
    parseJsonLikeContent(payload) ||
    parseJsonLikeContent(resolveMessage(payload));

  const rawMemories = Array.isArray(parsed)
    ? parsed
    : Array.isArray(parsed?.memories)
    ? parsed.memories
    : [];

  return rawMemories
    .map((item, index) =>
      normalizeMessageMemory(
        {
          id: `message_memory_${Date.now()}_${index}_${hashText(
            `${contactId}-${item?.content || item?.text || item?.memory || ""}`
          )}`,
          contactId,
          type: item?.type || item?.memoryType || item?.kind || item?.category,
          content: item?.content || item?.text || item?.memory || item?.summary,
          importance: item?.importance || item?.score || item?.weight,
          source: "summary",
          createdAt: Date.now(),
          updatedAt: Date.now()
        },
        index
      )
    )
    .filter((item) => item.contactId && item.content)
    .slice(0, 6);
}

async function requestMemorySummaryItems(
  settings,
  profile,
  contact,
  messages = [],
  promptSettings = {}
) {
  const apiSettings = resolveDedicatedApiSettings(settings, "summaryApiEnabled", "summaryApiConfigId");
  const requestEndpoint = validateApiSettings(apiSettings, "记忆总结");
  const transcript = buildMemorySummaryTranscript(messages);
  const systemPrompt = buildMemorySummarySystemPrompt(profile, contact);
  const userInstruction = [
    "已有记忆（用于去重；如果语义重复，请不要重新生成）：",
    buildExistingMemoryDigest(contact.id),
    "",
    "需要整理的新对话：",
    transcript || "本次没有可用对话。",
    "",
    "请只输出 JSON。"
  ].join("\n");
  const requestBody = buildSingleInstructionRequestBody(
    apiSettings,
    systemPrompt,
    userInstruction,
    "memory_summary"
  );
  const logBase = buildMessageApiLogBase(
    "chat_memory_summary",
    apiSettings,
    requestEndpoint,
    [systemPrompt, userInstruction].join("\n\n"),
    requestBody,
    `联系人：${contact.name} · 记忆提取`
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

    const memoryItems = parseMemorySummaryPayload(payload, contact.id);
    appendApiLog({
      ...logBase,
      ...buildGeminiLogFields(apiSettings, payload),
      status: "success",
      statusCode: response.status,
      responseText: rawResponse,
      responseBody: payload,
      summary: `联系人：${contact.name} · 已提取 ${memoryItems.length} 条记忆`
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

function selectConversationHistory(messages = [], historyRounds = DEFAULT_MESSAGE_HISTORY_ROUNDS) {
  const limit = normalizeMessagePromptSettings({ historyRounds }).historyRounds;
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

function splitReplyIntoMessageLines(text) {
  const resolved = String(text || "").replace(/\r/g, "").trim();
  if (!resolved) {
    return [];
  }

  const lines = [];
  let current = "";
  const separators = new Set(["\n", "，", "。", ",", "."]);
  const pushCurrent = () => {
    const value = current.trim();
    if (value) {
      lines.push(value);
    }
    current = "";
  };

  for (const character of resolved) {
    if (separators.has(character)) {
      pushCurrent();
      continue;
    }
    current += character;
  }
  pushCurrent();

  return lines.length ? lines : [resolved];
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
  if (lastItem && lastItem.messageType !== "location") {
    const mergedText = [String(lastItem.text || "").trim()]
      .concat(
        overflow
          .filter((item) => item.messageType !== "location")
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

function buildReplyItems(replyText, promptSettings = {}) {
  const { text: textWithoutLocationBlocks, blocks } = extractLocationReplyBlocks(replyText);
  const blockMap = new Map(blocks.map((block) => [block.token, block.items]));
  const rawLines = String(textWithoutLocationBlocks || "")
    .split("\n")
    .map((item) => String(item || "").trim())
    .filter(Boolean);
  const items = [];

  rawLines.forEach((line) => {
    if (blockMap.has(line)) {
      blockMap.get(line).forEach((item) => {
        items.push({
          ...item,
          text: buildLocationMessageText(item.locationName, item.coordinates)
        });
      });
      return;
    }
    splitReplyIntoMessageLines(line).forEach((textLine) => {
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

  const limitedItems = limitReplyItems(
    items,
    normalizeMessagePromptSettings(promptSettings).replySentenceLimit
  ).filter(Boolean);
  if (limitedItems.length) {
    return limitedItems;
  }
  const fallback = String(replyText || "").trim();
  return fallback
    ? [
        {
          messageType: "text",
          text: fallback
        }
      ]
    : [];
}

function recalculateConversationUpdatedAt(conversation) {
  if (!conversation || typeof conversation !== "object") {
    return;
  }
  const latestMessage = conversation.messages?.[conversation.messages.length - 1] || null;
  conversation.updatedAt = latestMessage?.createdAt || Date.now();
}

async function appendAssistantReplyBatch(conversation, replyText, promptSettings = {}) {
  const replyItems = buildReplyItems(replyText, promptSettings);
  if (!replyItems.length) {
    throw new Error("接口请求成功，但没有可展示的回复内容。");
  }
  const now = Date.now();
  const timeLabel = formatLocalTime();
  const createdMessages = [];

  for (let index = 0; index < replyItems.length; index += 1) {
    await sleep(index === 0 ? 1640 : 1460);
    const item = replyItems[index];
    const replyMessage = normalizeConversationMessage(
      {
        id: `message_${now}_${index}_${hashText(item.text || item.locationName || "")}`,
        role: "assistant",
        messageType: item.messageType || "text",
        text: item.text || "",
        locationName: item.locationName || "",
        coordinates: item.coordinates || "",
        time: timeLabel,
        createdAt: now + index
      },
      conversation.messages.length + index
    );
    conversation.messages = [...conversation.messages, replyMessage];
    recalculateConversationUpdatedAt(conversation);
    createdMessages.push(replyMessage);
    persistConversations();
    renderMessagesPage();
  }

  return createdMessages;
}

function getLatestAssistantReplyBatch(conversation) {
  if (!conversation?.messages?.length) {
    return null;
  }

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

  async function executeChatRequest(resolvedPromptSettings, summarySuffix = "") {
    const systemPrompt = buildConversationSystemPrompt(
      profile,
      contact,
      settings,
      resolvedPromptSettings,
      history,
      requestOptions
    );
    const requestBody = buildChatRequestBody(settings, systemPrompt, history);
    const logBase = buildMessageApiLogBase(
      requestOptions.regenerate ? "chat_reply_regenerate" : "chat_reply",
      settings,
      requestEndpoint,
      systemPrompt,
      requestBody,
      `联系人：${contact.name} · 历史消息 ${history.length} 条${
        requestOptions.regenerate ? " · 重回" : ""
      }${summarySuffix}`
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

      const message = resolveMessage(payload)
        .replace(/^(?:联系人|对方|assistant|AI)[:：]\s*/i, "")
        .trim();
      if (!message) {
        const errorMessage =
          requestMode === "gemini"
            ? buildGeminiEmptyResponseErrorMessage(payload)
            : "接口请求成功，但响应中没有可解析的文本。";
        appendApiLog({
          ...logBase,
          ...buildGeminiLogFields(settings, payload),
          status: "error",
          statusCode: response.status,
          responseText: rawResponse,
          responseBody: payload,
          errorMessage
        });
        logged = true;
        const error = new Error(errorMessage);
        error.code =
          requestMode === "gemini" ? "gemini_empty_response" : "empty_response";
        error.responsePayload = payload;
        throw error;
      }

      appendApiLog({
        ...logBase,
        ...buildGeminiLogFields(settings, payload),
        status: "success",
        statusCode: response.status,
        responseText: rawResponse,
        responseBody: payload,
        summary: `联系人：${contact.name} · 已生成 ${
          buildReplyItems(message, resolvedPromptSettings).length || 1
        } 行回复${summarySuffix}`
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

  try {
    return await executeChatRequest(normalizedPromptSettings);
  } catch (error) {
    const shouldRetryGeminiDirectly =
      requestMode === "gemini" &&
      error?.code === "gemini_empty_response" &&
      shouldRetryGeminiEmptyResponse(error?.responsePayload);

    if (shouldRetryGeminiDirectly) {
      try {
        await sleep(420);
        return await executeChatRequest(normalizedPromptSettings, " · Gemini 空响应重试");
      } catch (retryError) {
        error = retryError;
      }
    }

    const shouldRetryWithoutHotTopics =
      normalizedPromptSettings.hotTopicsEnabled &&
      /没有可解析的文本|Gemini 返回了空内容|HTTP 400|HTTP 413|finishReason=MAX_TOKENS/i.test(
        String(error?.message || "")
      );

    if (!shouldRetryWithoutHotTopics) {
      throw error;
    }

    return executeChatRequest(
      stripHotTopicsPromptSettings(normalizedPromptSettings),
      " · 热点挂载自动回退"
    );
  }
}

async function maybeExtractConversationMemories(conversationId, settings, promptSettings) {
  const conversation = getConversationById(conversationId);
  if (!conversation) {
    return;
  }
  const resolvedPromptSettings = normalizeMessagePromptSettings(promptSettings);
  if (conversation.memorySummaryCounter < resolvedPromptSettings.memorySummaryIntervalRounds) {
    return;
  }

  const contact = getContactById(conversation.contactId);
  if (!contact) {
    return;
  }

  const startIndex = clampNumber(
    Number.parseInt(String(conversation.memorySummaryLastMessageCount || 0), 10) || 0,
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
    const memoryItems = await requestMemorySummaryItems(
      settings,
      state.profile,
      contact,
      messagesToSummarize,
      resolvedPromptSettings
    );
    if (memoryItems.length) {
      state.memories = mergeMemories(state.memories, memoryItems);
      persistMessageMemories();
      if (state.memoryViewerOpen) {
        renderMemoryViewer();
        if (state.memorySelectedContactId === contact.id) {
          setMemoryStatus(`已为 ${contact.name} 提取 ${memoryItems.length} 条记忆。`, "success");
        }
      }
    }
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
  const userInstruction = "请根据这些信息，直接写出今天的日记正文。";
  const requestBody = buildDiaryRequestBody(settings, systemPrompt, userInstruction);
  const logBase = buildMessageApiLogBase(
    "journal_entry",
    settings,
    requestEndpoint,
    systemPrompt,
    requestBody,
    `联系人：${contact.name} · ${journalOptions.dateText || getTodayDateValue()} · 今日日记`
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

    const message = resolveMessage(payload).trim();
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
      summary: `联系人：${contact.name} · 已生成 ${message.length} 字今日日记`
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
    state.worldbookManagerOpen ||
    state.worldbookEditorOpen ||
    state.memoryViewerOpen ||
    state.memoryEditorOpen ||
    state.memorySettingsOpen ||
    state.regenerateModalOpen ||
    state.locationModalOpen ||
    state.awarenessModalOpen ||
    state.schedulePreviewOpen ||
    state.journalOpen ||
    state.journalHistoryOpen ||
    state.journalSettingsOpen;
  document.body.classList.toggle("messages-modal-open", anyModalOpen);
}

function closeConversationTransientUi() {
  state.composerPanelOpen = false;
  state.messageActionMessageId = "";
}

function setLocationStatus(message = "", tone = "") {
  setEditorStatus(messagesLocationStatusEl, message, tone);
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

function setAwarenessStatus(message = "", tone = "") {
  setEditorStatus(messagesAwarenessStatusEl, message, tone);
}

function applyAwarenessToForm(contact = null) {
  const resolvedContact = contact && typeof contact === "object" ? contact : null;
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
  setAwarenessStatus(
    resolvedContact?.awarenessConsumed
      ? "这条察觉已经触发过；重新保存后会重新参与后续概率判断。"
      : "",
    resolvedContact?.awarenessConsumed ? "success" : ""
  );
}

function getCurrentAwarenessDraft() {
  return {
    awarenessText: String(messagesAwarenessTextInputEl?.value || "").trim(),
    awarenessEmotionShift: String(messagesAwarenessEmotionInputEl?.value || "").trim(),
    awarenessSensitivity: normalizeAwarenessSensitivity(
      messagesAwarenessSensitivityInputEl?.value
    )
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
    const contact = conversation ? getContactById(conversation.contactId) : null;
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
  const contact = conversation ? getContactById(conversation.contactId) : null;
  return {
    conversation,
    contact
  };
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
  const todayEntry = contact ? getJournalEntryForDate(contact.id, todayDate) : null;
  const weatherText = todayEntry?.weather || "天气将从今日日内聊天里提取";
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

  if (!todayEntry) {
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
          <strong>${escapeHtml(formatJournalFullDateLabel(todayEntry.date))}</strong>
          <span>${escapeHtml(todayEntry.weather || weatherText)}</span>
        </div>
        <div class="messages-journal-paper__content">${renderJournalContentText(todayEntry.content)}</div>
      </article>
      <button
        class="messages-journal-paper__action"
        type="button"
        data-action="generate-journal-entry"
      >
        重新让ta写一篇
      </button>
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
        <article class="messages-journal-history-row">
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
    state.journalGenerating = false;
    state.journalStatusMessage = "";
    state.journalStatusTone = "";
  }
  if (messagesJournalModalEl) {
    messagesJournalModalEl.hidden = !state.journalOpen;
    messagesJournalModalEl.setAttribute("aria-hidden", String(!state.journalOpen));
  }
  if (state.journalOpen) {
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
  if (state.sendingConversationId === conversation.id) {
    setMessagesStatus("当前正在等待聊天回复，稍后再喊 ta 写日记吧。", "error");
    setJournalStatus("当前正在等待聊天回复，稍后再喊 ta 写日记吧。", "error");
    return;
  }

  const todayDate = getTodayDateValue();
  const todaysMessages = getJournalMessagesForDate(conversation, todayDate);
  if (!todaysMessages.length) {
    setMessagesStatus("今天还没有聊天记录，先聊几句再来喊 ta 写日记吧。", "error");
    setJournalStatus("今天还没有聊天记录，先聊几句再来喊 ta 写日记吧。", "error");
    return;
  }

  const settings = loadSettings();
  const promptSettings = normalizeMessagePromptSettings(settings.messagePromptSettings);
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

  if (isEmbeddedView()) {
    messagesNavBtnEl.hidden = false;
    messagesNavBtnEl.setAttribute("aria-label", "关闭 Chat");
    messagesNavBtnEl.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 7l10 10M17 7 7 17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      </svg>
    `;
    return;
  }

  messagesNavBtnEl.hidden = true;
  messagesNavBtnEl.innerHTML = "";
}

function renderTopbar() {
  const activeConversation = getConversationById();
  const isTyping =
    Boolean(activeConversation) &&
    state.activeTab === "chat" &&
    state.sendingConversationId === activeConversation.id;
  const title =
    isTyping
      ? "正在输入……"
      : activeConversation && state.activeTab === "chat"
      ? getConversationMeta(activeConversation).name
      : TAB_TITLES[state.activeTab] || "微信";

  if (messagesPageTitleEl) {
    messagesPageTitleEl.textContent = title;
  }

  renderNavButton();

  const inConversation = Boolean(activeConversation && state.activeTab === "chat");

  if (messagesSearchBtnEl) {
    messagesSearchBtnEl.hidden = !(state.activeTab === "contacts" && !inConversation);
  }

  if (messagesChatSettingsBtnEl) {
    messagesChatSettingsBtnEl.hidden = !inConversation;
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
  const actions = isLocationConversationMessage(message) || isImageConversationMessage(message)
    ? [
        `
          <button
            type="button"
            data-action="delete-conversation-message"
            data-message-id="${escapeHtml(message.id)}"
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
          >
            编辑
          </button>
        `,
        `
          <button
            type="button"
            data-action="delete-conversation-message"
            data-message-id="${escapeHtml(message.id)}"
          >
            删除
          </button>
        `
      ];
  return `
    <div class="messages-message-row__menu" role="group" aria-label="消息操作">
      ${actions.join("")}
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

function renderConversationImageCard(message) {
  const imageDataUrl = String(message?.imageDataUrl || "").trim();
  if (!imageDataUrl) {
    return `
      <article class="messages-bubble">
        <p>${escapeHtml(buildImageMessageText())}</p>
      </article>
    `;
  }
  return `
    <article class="messages-image-card">
      <img src="${escapeHtml(imageDataUrl)}" alt="聊天图片" loading="lazy" />
    </article>
  `;
}

function renderConversationMessage(message, conversation, promptSettings = state.chatPromptSettings) {
  const isUser = message.role === "user";
  const avatarMarkup = buildConversationDetailAvatarMarkup(message.role, conversation, promptSettings);
  const isMenuOpen = state.messageActionMessageId === message.id;
  const isLocationMessage = isLocationConversationMessage(message);
  const isImageMessage = isImageConversationMessage(message);
  const bubbleMarkup = isLocationMessage
    ? renderConversationLocationCard(message)
    : isImageMessage
      ? renderConversationImageCard(message)
    : `
      <article class="messages-bubble ${isUser ? "messages-bubble--user" : "messages-bubble--assistant"}">
        <p>${escapeHtml(message.text)}</p>
      </article>
    `;
  return `
    <article class="messages-message-row messages-message-row--${isUser ? "user" : "assistant"}${
      avatarMarkup ? "" : " is-avatar-hidden"
    }${isLocationMessage ? " messages-message-row--location" : ""}${
      isImageMessage ? " messages-message-row--image" : ""
    }">
      ${!isUser && avatarMarkup ? avatarMarkup : ""}
      <div class="messages-message-row__bubble-wrap${
        isLocationMessage ? " messages-message-row__bubble-wrap--location" : ""
      }">
        <div class="messages-message-row__stack">
          <button
            type="button"
            class="messages-bubble-toggle${isLocationMessage ? " messages-bubble-toggle--location" : ""}"
            data-action="toggle-message-menu"
            data-message-id="${escapeHtml(message.id)}"
          >
            ${bubbleMarkup}
          </button>
          ${renderConversationMessageMenu(message, isMenuOpen)}
        </div>
      </div>
      ${isUser && avatarMarkup ? avatarMarkup : ""}
    </article>
  `;
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

  messagesContentEl.innerHTML = `
    <div class="messages-chat-list">
      ${conversations
        .map((conversation) => {
          const meta = getConversationMeta(conversation);
          return `
            <button
              type="button"
              class="messages-row"
              data-action="open-conversation"
              data-conversation-id="${escapeHtml(conversation.id)}"
              aria-label="${escapeHtml(meta.name)} 的会话"
            >
              <div class="messages-row__avatar">${buildConversationAvatarMarkup(conversation)}</div>
              <div class="messages-row__body">
                <div class="messages-row__head">
                  <strong>${escapeHtml(meta.name)}</strong>
                  <span class="messages-row__time">${escapeHtml(getConversationTime(conversation))}</span>
                </div>
                <div class="messages-row__preview">${escapeHtml(getConversationPreview(conversation))}</div>
              </div>
            </button>
          `;
        })
        .join("")}
    </div>
  `;
}

function renderConversationDetail() {
  if (!messagesContentEl) {
    return;
  }

  syncProfileStateFromStorage();

  const conversation = getConversationById();
  if (!conversation) {
    state.activeConversationId = "";
    renderMessagesPage();
    return;
  }

  const isSending = state.sendingConversationId === conversation.id;
  const hasPendingUserMessages = conversation.messages.some(
    (message) => message.role === "user" && message.needsReply
  );
  const promptSettings = normalizeMessagePromptSettings(state.chatPromptSettings);
  messagesContentEl.innerHTML = `
    <section class="messages-conversation">
      <div class="messages-conversation__history">
        ${
          conversation.messages.length
            ? conversation.messages
                .map((message) => renderConversationMessage(message, conversation, promptSettings))
                .join("")
            : '<div class="messages-conversation__empty">输入第一条消息，开始和这个角色聊天。</div>'
        }
      </div>
      ${renderConversationUtilityPanel()}
      <form class="messages-conversation__composer" data-action="send-conversation-message">
        <input
          class="messages-conversation__input"
          name="message"
          type="text"
          maxlength="600"
          placeholder="发消息"
          autocomplete="off"
        />
        <button class="messages-conversation__send" type="submit" ${isSending ? "disabled" : ""}>
          发送
        </button>
        <button
          class="messages-conversation__trigger ${hasPendingUserMessages ? "is-ready" : ""}"
          type="button"
          data-action="request-conversation-reply"
          aria-label="推送到 API 获取回复"
          ${isSending || !hasPendingUserMessages ? "disabled" : ""}
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
    </section>
  `;

  const historyEl = messagesContentEl.querySelector(".messages-conversation__history");
  if (historyEl) {
    window.requestAnimationFrame(() => {
      historyEl.scrollTop = historyEl.scrollHeight;
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
  messagesContentEl.innerHTML = `
    <section class="messages-me-page">
      <button class="messages-me-profile" type="button" data-action="open-profile-editor">
        ${buildAvatarMarkup(profile.avatarImage, getProfileAvatarFallback(profile), "messages-me-profile__avatar")}
        <div class="messages-me-profile__body">
          <strong class="messages-me-profile__name">${escapeHtml(profile.username || DEFAULT_PROFILE.username)}</strong>
          <span class="messages-me-profile__id">微信号：${escapeHtml(wechatId)}</span>
          <span class="messages-me-profile__status">＋ 状态</span>
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
  if (!state.profileEditorOpen) {
    syncProfileStateFromStorage();
  }
  const inConversation = Boolean(state.activeConversationId && state.activeTab === "chat");
  if (messagesContentEl) {
    messagesContentEl.classList.toggle("is-conversation-view", inConversation);
  }
  renderTopbar();
  renderSearchSection();
  renderTabbar();

  if (state.activeConversationId && state.activeTab === "chat") {
    renderConversationDetail();
    return;
  }

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
    specialUserPersona: ""
  };
  state.contactEditorAvatarImage = String(resolvedContact.avatarImage || "").trim();
  if (messagesContactNameInputEl) {
    messagesContactNameInputEl.value = resolvedContact.name || "";
  }
  if (messagesContactPersonaInputEl) {
    messagesContactPersonaInputEl.value = resolvedContact.personaPrompt || "";
  }
  if (messagesContactSpecialPersonaInputEl) {
    messagesContactSpecialPersonaInputEl.value = resolvedContact.specialUserPersona || "";
  }
  if (messagesContactModalTitleEl) {
    messagesContactModalTitleEl.textContent = resolvedContact.id ? "编辑联系人" : "新建联系人";
  }
  renderContactEditorAvatarPreview();
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
    specialUserPersona: String(messagesContactSpecialPersonaInputEl?.value || "").trim(),
    awarenessText: String(existingContact?.awarenessText || "").trim(),
    awarenessEmotionShift: String(existingContact?.awarenessEmotionShift || "").trim(),
    awarenessSensitivity: normalizeAwarenessSensitivity(existingContact?.awarenessSensitivity),
    awarenessConsumed: Boolean(existingContact?.awarenessConsumed),
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

function focusConversationInput(options = {}) {
  const focusOptions = options && typeof options === "object" ? options : {};
  if (!focusOptions.force && !shouldAutoFocusConversationInput()) {
    return;
  }
  const input = messagesContentEl?.querySelector(".messages-conversation__input");
  input?.focus();
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

  const nextPromptSettings = normalizeMessagePromptSettings({
    ...state.chatPromptSettings,
    worldbookIds: (state.chatPromptSettings.worldbookIds || []).filter((id) => id !== entry.id)
  });
  state.chatPromptSettings = nextPromptSettings;
  const nextSettings = loadSettings();
  nextSettings.messagePromptSettings = nextPromptSettings;
  persistSettings(nextSettings);

  renderWorldbookManager();
  renderWorldbookMountOptions(nextPromptSettings.worldbookIds || []);
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
    return String(item.content || "").toLowerCase().includes(keyword);
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
        <article class="messages-memory-card">
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
        </article>
      `
    )
    .join("");
}

function applyMemoryEditorToForm(preferredContactId = state.memorySelectedContactId) {
  const selectedContactId = resolveSelectedMemoryContactId(preferredContactId);
  renderMemoryEditorContactOptions(selectedContactId);
  if (messagesMemoryEditorContentInputEl) {
    messagesMemoryEditorContentInputEl.value = "";
  }
  if (messagesMemoryEditorImportanceInputEl) {
    messagesMemoryEditorImportanceInputEl.value = String(DEFAULT_CORE_MEMORY_THRESHOLD);
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
    state.memoryTab = "all";
    state.memoryQuery = "";
    if (messagesMemorySearchInputEl) {
      messagesMemorySearchInputEl.value = "";
    }
    resolveSelectedMemoryContactId(preferredContactId);
    renderMemoryViewer();
    setMemoryStatus("");
  } else {
    setMemoryEditorOpen(false);
    setMemorySettingsOpen(false);
  }
  updateBodyModalState();
}

function setMemoryEditorOpen(isOpen, preferredContactId = state.memorySelectedContactId) {
  state.memoryEditorOpen = Boolean(isOpen);
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
  resolveSelectedMemoryContactId(contactId);
  renderMemoryViewer();
  return entry;
}

function applyChatPromptSettingsToForm(promptSettings) {
  const resolved = normalizeMessagePromptSettings(promptSettings);
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
  if (messagesChatShowContactAvatarInputEl) {
    messagesChatShowContactAvatarInputEl.checked = resolved.showContactAvatar;
  }
  if (messagesChatShowUserAvatarInputEl) {
    messagesChatShowUserAvatarInputEl.checked = resolved.showUserAvatar;
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
  const currentSettings = normalizeMessagePromptSettings(state.chatPromptSettings);
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
    showContactAvatar: Boolean(messagesChatShowContactAvatarInputEl?.checked),
    showUserAvatar: Boolean(messagesChatShowUserAvatarInputEl?.checked)
  });
}

function setChatSettingsOpen(isOpen) {
  state.chatSettingsOpen = Boolean(isOpen);
  if (messagesChatSettingsModalEl) {
    messagesChatSettingsModalEl.hidden = !state.chatSettingsOpen;
    messagesChatSettingsModalEl.setAttribute("aria-hidden", String(!state.chatSettingsOpen));
  }
  if (state.chatSettingsOpen) {
    applyChatPromptSettingsToForm(state.chatPromptSettings);
    window.setTimeout(() => {
      messagesChatHistoryRoundsInputEl?.focus();
    }, 0);
  }
  updateBodyModalState();
}

function editConversationMessage(messageId = "") {
  const conversation = getConversationById();
  if (!conversation) {
    return;
  }
  const targetMessage = conversation.messages.find((message) => message.id === messageId) || null;
  if (!targetMessage) {
    setMessagesStatus("未找到要编辑的消息。", "error");
    return;
  }
  if (isLocationConversationMessage(targetMessage)) {
    setMessagesStatus("定位消息暂不支持直接编辑，请删除后重新发送。", "error");
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

  conversation.messages = conversation.messages.map((message) =>
    message.id === targetMessage.id ? { ...message, text: resolved } : message
  );
  recalculateConversationUpdatedAt(conversation);
  state.messageActionMessageId = "";
  persistConversations();
  renderMessagesPage();
  setMessagesStatus("消息已更新。", "success");
}

function deleteConversationMessage(messageId = "") {
  const conversation = getConversationById();
  if (!conversation) {
    return;
  }
  const targetMessage = conversation.messages.find((message) => message.id === messageId) || null;
  if (!targetMessage) {
    setMessagesStatus("未找到要删除的消息。", "error");
    return;
  }
  const confirmed = window.confirm("确定删除这条消息吗？");
  if (!confirmed) {
    return;
  }

  conversation.messages = conversation.messages.filter((message) => message.id !== targetMessage.id);
  recalculateConversationUpdatedAt(conversation);
  state.messageActionMessageId = "";
  persistConversations();
  renderMessagesPage();
  setMessagesStatus("消息已删除。", "success");
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

  if (resolvedToolId === "image") {
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

async function sendConversationImage(file) {
  if (!file) {
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

  closeConversationTransientUi();
  const userMessage = normalizeConversationMessage(
    {
      id: `message_${Date.now()}_${hashText(`${file.name || "image"}_${imageDataUrl.slice(0, 48)}`)}`,
      role: "user",
      messageType: "image",
      imageDataUrl,
      text: buildImageMessageText(),
      needsReply: true,
      time: formatLocalTime(),
      createdAt: Date.now()
    },
    conversation.messages.length
  );

  conversation.messages = [...conversation.messages, userMessage];
  conversation.updatedAt = userMessage.createdAt;
  persistConversations();
  renderMessagesPage();
  focusConversationInput({ force: false });
  setMessagesStatus("图片已加入对话，点击右侧圆标向 API 请求回复。", "success");
}

function sendConversationLocation(locationName, coordinates) {
  const resolvedName = String(locationName || "").trim();
  if (!resolvedName) {
    setLocationStatus("请输入位置名称。", "error");
    return;
  }

  const resolvedCoordinates =
    String(coordinates || "").trim() || buildRandomLocationCoordinates(resolvedName);
  const conversation = getConversationById();
  if (!conversation) {
    return;
  }

  closeConversationTransientUi();
  const userMessage = normalizeConversationMessage(
    {
      id: `message_${Date.now()}_${hashText(`${resolvedName}_${resolvedCoordinates}`)}`,
      role: "user",
      messageType: "location",
      locationName: resolvedName,
      coordinates: resolvedCoordinates,
      needsReply: true,
      time: formatLocalTime(),
      createdAt: Date.now()
    },
    conversation.messages.length
  );

  conversation.messages = [...conversation.messages, userMessage];
  conversation.updatedAt = userMessage.createdAt;
  saveRecentLocation(resolvedName, resolvedCoordinates);
  persistConversations();
  setLocationModalOpen(false);
  renderMessagesPage();
  focusConversationInput({ force: false });
  setMessagesStatus("定位已加入对话，点击右侧圆标向 API 请求回复。", "success");
}

function sendConversationMessage(text) {
  const content = String(text || "").trim();
  if (!content) {
    setMessagesStatus("请输入消息内容后再发送。", "error");
    return;
  }

  const conversation = getConversationById();
  if (!conversation) {
    return;
  }

  const contact = getContactById(conversation.contactId);
  if (!contact) {
    setMessagesStatus("未找到对应联系人，请先去通讯录检查人物信息。", "error");
    return;
  }

  closeConversationTransientUi();
  const userMessage = normalizeConversationMessage(
    {
      id: `message_${Date.now()}_${hashText(content)}`,
      role: "user",
      text: content,
      needsReply: true,
      time: formatLocalTime(),
      createdAt: Date.now()
    },
    conversation.messages.length
  );

  conversation.messages = [...conversation.messages, userMessage];
  conversation.updatedAt = userMessage.createdAt;
  persistConversations();
  renderMessagesPage();
  focusConversationInput({ force: false });
  setMessagesStatus("消息已加入对话，点击右侧圆标向 API 请求回复。", "success");
}

async function requestConversationReply(options = {}) {
  syncProfileStateFromStorage();
  const conversation = getConversationById();
  if (!conversation) {
    return;
  }

  const requestOptions = options && typeof options === "object" ? options : {};
  const isRegenerate = Boolean(requestOptions.regenerate);
  const regenerateInstruction = String(requestOptions.regenerateInstruction || "").trim();

  if (state.sendingConversationId === conversation.id) {
    return;
  }

  const contact = getContactById(conversation.contactId);
  if (!contact) {
    setMessagesStatus("未找到对应联系人，请先去通讯录检查人物信息。", "error");
    return;
  }

  const settings = loadSettings();
  const promptSettings = normalizeMessagePromptSettings(settings.messagePromptSettings);
  state.chatPromptSettings = promptSettings;
  let history = [];
  let removedReplyBatch = [];
  const currentAwarenessCounter = Math.max(
    0,
    Number.parseInt(String(conversation.awarenessCounter || 0), 10) || 0
  );
  const shouldEvaluateAwareness =
    !isRegenerate &&
    currentAwarenessCounter + 1 >= promptSettings.awarenessIntervalRounds;
  const hasActiveAwareness =
    Boolean(String(contact.awarenessText || "").trim()) && !Boolean(contact.awarenessConsumed);
  let triggeredAwareness = null;
  let awarenessTriggered = false;

  if (shouldEvaluateAwareness && hasActiveAwareness) {
    const probability = getAwarenessSensitivityProbability(contact.awarenessSensitivity);
    awarenessTriggered = Math.random() < probability;
    if (awarenessTriggered) {
      triggeredAwareness = {
        text: String(contact.awarenessText || "").trim(),
        emotionShift: String(contact.awarenessEmotionShift || "").trim(),
        sensitivity: normalizeAwarenessSensitivity(contact.awarenessSensitivity)
      };
    }
  }

  closeConversationTransientUi();
  state.sendingConversationId = conversation.id;
  if (isRegenerate) {
    const latestReplyBatch = getLatestAssistantReplyBatch(conversation);
    if (latestReplyBatch?.blocked) {
      state.sendingConversationId = "";
      setMessagesStatus("当前还有待回复的新消息，请先完成这一轮对话。", "error");
      return;
    }
    if (!latestReplyBatch) {
      state.sendingConversationId = "";
      setMessagesStatus("当前没有可重回的上一轮回复。", "error");
      return;
    }

    removedReplyBatch = latestReplyBatch.messages.map((message) => ({ ...message }));
    conversation.messages = conversation.messages.slice(0, latestReplyBatch.startIndex);
    recalculateConversationUpdatedAt(conversation);
    persistConversations();
    history = selectConversationHistory(conversation.messages, promptSettings.historyRounds);
    renderMessagesPage();
    setMessagesStatus("正在重新生成回复…");
  } else {
    const pendingUserMessages = conversation.messages.filter(
      (message) => message.role === "user" && message.needsReply
    );
    if (!pendingUserMessages.length) {
      state.sendingConversationId = "";
      setMessagesStatus("当前没有待推送到 API 的新消息。");
      return;
    }
    history = selectConversationHistory(conversation.messages, promptSettings.historyRounds);
    renderMessagesPage();
    setMessagesStatus("正在等待对方回复…");
  }

  try {
    const replyText = await requestChatReplyText(
      settings,
      state.profile,
      contact,
      history,
      promptSettings,
      {
        regenerate: isRegenerate,
        regenerateInstruction,
        triggeredAwareness
      }
    );
    const updatedConversation = getConversationById(conversation.id);
    if (!updatedConversation) {
      return;
    }
    if (!isRegenerate) {
      updatedConversation.messages = updatedConversation.messages.map((message) =>
        message.role === "user" && message.needsReply ? { ...message, needsReply: false } : message
      );
    }

    await appendAssistantReplyBatch(updatedConversation, replyText, promptSettings);
    if (!isRegenerate) {
      updatedConversation.awarenessCounter = shouldEvaluateAwareness
        ? 0
        : currentAwarenessCounter + 1;
      if (awarenessTriggered) {
        const contactIndex = state.contacts.findIndex((item) => item.id === contact.id);
        if (contactIndex >= 0) {
          state.contacts[contactIndex] = {
            ...state.contacts[contactIndex],
            awarenessConsumed: true,
            updatedAt: Date.now()
          };
          persistContacts();
        }
      }
      updatedConversation.memorySummaryCounter =
        (Number(updatedConversation.memorySummaryCounter) || 0) + 1;
      persistConversations();
      void maybeExtractConversationMemories(updatedConversation.id, settings, promptSettings);
    }
    setMessagesStatus(isRegenerate ? "已重新生成回复。" : "已收到回复。", "success");
  } catch (error) {
    if (isRegenerate) {
      const rollbackConversation = getConversationById(conversation.id);
      if (rollbackConversation && removedReplyBatch.length) {
        rollbackConversation.messages = [...rollbackConversation.messages, ...removedReplyBatch];
        recalculateConversationUpdatedAt(rollbackConversation);
        persistConversations();
      }
    }
    setMessagesStatus(`回复失败：${error?.message || "请求失败"}`, "error");
  } finally {
    state.sendingConversationId = "";
    renderMessagesPage();
    focusConversationInput();
  }
}

function refreshStateFromStorage() {
  state.profile = loadProfile();
  state.contacts = loadContacts();
  state.conversations = loadConversations();
  state.worldbooks = loadWorldbooks();
  state.journalEntries = loadJournalEntries();
  state.memories = loadMessageMemories();
  state.recentLocations = loadRecentLocations();
  state.chatPromptSettings = normalizeMessagePromptSettings(loadSettings().messagePromptSettings);
}

function attachEvents() {
  if (messagesNavBtnEl) {
    messagesNavBtnEl.addEventListener("click", () => {
      if (state.activeConversationId && state.activeTab === "chat") {
        closeConversationTransientUi();
        state.activeConversationId = "";
        setMessagesStatus("");
        renderMessagesPage();
        return;
      }
      requestEmbeddedClose();
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

  if (messagesChatSettingsBtnEl) {
    messagesChatSettingsBtnEl.addEventListener("click", () => {
      if (!state.activeConversationId) {
        return;
      }
      closeConversationTransientUi();
      setChatSettingsOpen(true);
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
        state.messageActionMessageId = "";
        if (!(actionEl instanceof Element)) {
          renderConversationDetail();
          return;
        }
      }
      if (!(actionEl instanceof Element)) {
        return;
      }

      if (actionEl.getAttribute("data-action") === "toggle-composer-panel") {
        state.composerPanelOpen = !state.composerPanelOpen;
        state.messageActionMessageId = "";
        renderConversationDetail();
        return;
      }

      if (actionEl.getAttribute("data-action") === "close-composer-panel") {
        state.composerPanelOpen = false;
        renderConversationDetail();
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
        state.composerPanelOpen = false;
        state.messageActionMessageId = state.messageActionMessageId === messageId ? "" : messageId;
        renderConversationDetail();
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

      if (actionEl.getAttribute("data-action") === "request-conversation-reply") {
        requestConversationReply();
        return;
      }

      if (
        actionEl.getAttribute("data-action") === "open-conversation" &&
        actionEl.getAttribute("data-conversation-id")
      ) {
        closeConversationTransientUi();
        state.activeConversationId = String(actionEl.getAttribute("data-conversation-id") || "");
        setMessagesStatus("");
        renderMessagesPage();
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
      target.reset();
      sendConversationMessage(message);
    });
  }

  if (messagesProfileModalCloseBtnEl) {
    messagesProfileModalCloseBtnEl.addEventListener("click", () => {
      setProfileEditorOpen(false);
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
          maxSide: 280,
          quality: 0.74
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
    messagesProfileFormEl.addEventListener("submit", (event) => {
      event.preventDefault();
      state.profile = getCurrentProfileDraft();
      persistProfile(state.profile);
      syncProfileStateFromStorage();
      renderMessagesPage();
      setEditorStatus(messagesProfileEditorStatusEl, "资料已保存。", "success");
      setMessagesStatus("个人资料已同步更新。", "success");
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
          maxSide: 280,
          quality: 0.74
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

  if (messagesContactFormEl) {
    messagesContactFormEl.addEventListener("submit", (event) => {
      event.preventDefault();
      const draft = getCurrentContactDraft();
      const existingIndex = state.contacts.findIndex((item) => item.id === draft.id);
      if (existingIndex >= 0) {
        state.contacts[existingIndex] = draft;
      } else {
        state.contacts = [draft, ...state.contacts];
      }
      persistContacts();
      syncConversationSnapshots(draft);
      renderMessagesPage();
      setEditorStatus(messagesContactEditorStatusEl, "联系人已保存。", "success");
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
    messagesPickerListEl.addEventListener("click", (event) => {
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
      const conversation = createConversation(contact);
      state.activeTab = "chat";
      state.activeConversationId = conversation.id;
      setConversationPickerOpen(false);
      renderMessagesPage();
    });
  }

  if (messagesChatSettingsCloseBtnEl) {
    messagesChatSettingsCloseBtnEl.addEventListener("click", () => {
      setChatSettingsOpen(false);
    });
  }

  if (messagesChatSettingsFormEl) {
    messagesChatSettingsFormEl.addEventListener("submit", (event) => {
      event.preventDefault();
      const draft = getCurrentChatPromptSettingsDraft();
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
      const nextSettings = loadSettings();
      nextSettings.messagePromptSettings = draft;
      persistSettings(nextSettings);
      state.chatPromptSettings = draft;
      updateChatHotTopicsWarning(draft);
      setEditorStatus(messagesChatSettingsStatusEl, "对话回复设置已保存。", "success");
      setMessagesStatus("对话 prompt 设置已更新。", "success");
      if (state.activeConversationId && state.activeTab === "chat") {
        renderConversationDetail();
      }
      window.setTimeout(() => {
        setChatSettingsOpen(false);
      }, 220);
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

  if (messagesMemoryEditorFormEl) {
    messagesMemoryEditorFormEl.addEventListener("submit", (event) => {
      event.preventDefault();
      try {
        const entry = saveManualCoreMemory({
          contactId: messagesMemoryEditorContactSelectEl?.value,
          content: messagesMemoryEditorContentInputEl?.value,
          importance: messagesMemoryEditorImportanceInputEl?.value
        });
        setMemoryEditorStatus(`已为 ${getContactById(entry.contactId)?.name || "该角色"} 保存核心记忆。`, "success");
        setMemoryStatus("核心记忆已保存。", "success");
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
      state.chatPromptSettings = nextPromptSettings;
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

  [messagesAwarenessTextInputEl, messagesAwarenessEmotionInputEl, messagesAwarenessSensitivityInputEl]
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
      const contact = conversation ? getContactById(conversation.contactId) : null;
      if (!contact) {
        setAwarenessStatus("未找到当前聊天对象。", "error");
        return;
      }
      const draft = getCurrentAwarenessDraft();
      if (!draft.awarenessText) {
        setAwarenessStatus("请输入察觉文本。", "error");
        return;
      }
      const contactIndex = state.contacts.findIndex((item) => item.id === contact.id);
      if (contactIndex < 0) {
        setAwarenessStatus("未找到当前聊天对象。", "error");
        return;
      }
      const previous = state.contacts[contactIndex];
      const changed =
        draft.awarenessText !== String(previous.awarenessText || "").trim() ||
        draft.awarenessEmotionShift !== String(previous.awarenessEmotionShift || "").trim() ||
        draft.awarenessSensitivity !== normalizeAwarenessSensitivity(previous.awarenessSensitivity);
      state.contacts[contactIndex] = {
        ...previous,
        awarenessText: draft.awarenessText,
        awarenessEmotionShift: draft.awarenessEmotionShift,
        awarenessSensitivity: draft.awarenessSensitivity,
        awarenessConsumed: changed ? false : Boolean(previous.awarenessConsumed),
        updatedAt: Date.now()
      };
      persistContacts();
      renderMessagesPage();
      setAwarenessStatus("察觉已保存。", "success");
      setMessagesStatus("角色察觉已更新。", "success");
      window.setTimeout(() => {
        setAwarenessModalOpen(false);
      }, 220);
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
      state.chatPromptSettings = nextPromptSettings;
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
    messagesWorldbookEditorModalEl
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

  if (messagesAwarenessModalEl) {
    messagesAwarenessModalEl.addEventListener("click", (event) => {
      if (event.target === messagesAwarenessModalEl) {
        setAwarenessModalOpen(false);
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

  window.addEventListener("focus", () => {
    if (!state.windowFocusPrimed) {
      state.windowFocusPrimed = true;
      return;
    }
    if (
      state.profileEditorOpen ||
      state.contactEditorOpen ||
      state.awarenessModalOpen ||
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
    refreshStateFromStorage();
    renderMessagesPage();
  });

  window.addEventListener("storage", (event) => {
    if (event.key && ![PROFILE_KEY, MESSAGE_RECENT_LOCATIONS_KEY, MESSAGE_THREADS_KEY].includes(event.key)) {
      return;
    }
    if (state.profileEditorOpen || state.contactEditorOpen || state.awarenessModalOpen) {
      return;
    }
    refreshStateFromStorage();
    renderMessagesPage();
    if (state.locationModalOpen) {
      renderLocationModal();
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
    if (event.key === "Escape" && state.chatSettingsOpen) {
      setChatSettingsOpen(false);
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
    if (event.key === "Escape" && state.regenerateModalOpen) {
      setRegenerateModalOpen(false);
      return;
    }
    if (event.key === "Escape" && state.locationModalOpen) {
      setLocationModalOpen(false);
      return;
    }
    if (event.key === "Escape" && state.awarenessModalOpen) {
      setAwarenessModalOpen(false);
      return;
    }
    if (event.key === "Escape" && state.schedulePreviewOpen) {
      setSchedulePreviewOpen(false);
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
    if (event.key === "Escape" && state.journalOpen) {
      setJournalOpen(false);
      return;
    }
    if (event.key === "Escape" && state.composerPanelOpen) {
      state.composerPanelOpen = false;
      renderConversationDetail();
      return;
    }
    if (event.key === "Escape" && state.messageActionMessageId) {
      state.messageActionMessageId = "";
      renderConversationDetail();
      return;
    }
    if (event.key === "Escape" && state.activeConversationId) {
      closeConversationTransientUi();
      state.activeConversationId = "";
      renderMessagesPage();
    }
  });
}

function init() {
  const launchView = getMessagesLaunchView();
  if (document.body) {
    document.body.classList.toggle("embedded", isEmbeddedView());
  }
  state.memoryStandaloneLaunch = launchView === "memory";
  if (launchView === "memory") {
    state.activeTab = "me";
  }
  bindMessagesViewportHeight();
  persistConversations();
  renderMessagesPage();
  attachEvents();
  if (launchView === "memory") {
    setMemoryViewerOpen(true);
  }
  notifyEmbeddedReady();
}

init();
