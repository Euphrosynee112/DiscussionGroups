const DEFAULT_OPENAI_ENDPOINT = "https://api.deepseek.com/chat/completions";
const DEFAULT_GROK_ENDPOINT = "https://api.x.ai/v1/chat/completions";
const DEFAULT_GEMINI_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta";
const SETTINGS_KEY = "x_style_generator_settings_v2";
const POSTS_KEY = "x_style_generator_posts_v2";
const REFRESH_KEY = "x_style_generator_refresh_v2";
const PROFILE_KEY = "x_style_generator_profile_v1";
const PROFILE_POSTS_KEY = "x_style_generator_profile_posts_v1";
const WORLD_BOOKS_KEY = "x_style_generator_message_worldbooks_v1";
const BUBBLE_THREADS_KEY = "x_style_generator_bubble_threads_v1";
const DISCUSSIONS_KEY = "x_style_generator_discussions_v1";
const DIRECT_MESSAGES_KEY = "x_style_generator_direct_messages_v1";
const MESSAGE_CONTACTS_KEY = "x_style_generator_message_contacts_v1";
const MESSAGE_THREADS_KEY = "x_style_generator_message_threads_v1";
const MESSAGE_SHARE_INBOX_KEY = "x_style_generator_message_share_inbox_v1";
const MESSAGE_VIDEO_MEDIA_KEY = "x_style_generator_message_video_media_v1";
const DEFAULT_POST_COUNT = 10;
const DEFAULT_REPLY_COUNT = 4;
const MAX_FEED_ITEMS = 50;
const MAX_POST_TEXT_LENGTH = 1400;
const MAX_REPLY_TEXT_LENGTH = 1400;
const DEFAULT_TEMPERATURE = 0.85;
const DEFAULT_CONTEXT_FOCUS_MINUTES = 60;
const MAX_CONTEXT_FOCUS_MINUTES = 1440;
const PULL_THRESHOLD = 88;
const DEFAULT_CONTENT_FEED = "entertainment";
const CUSTOM_TAB_LIMIT = 4;
const API_CONFIG_LIMIT = 12;
const DEFAULT_DEEPSEEK_MODEL = "deepseek-chat";
const DEFAULT_GROK_MODEL = "grok-4";
const DEFAULT_GEMINI_MODEL = "gemini-2.0-flash";
const LOCAL_STORAGE_API_BASE_URL = "http://localhost:3000";
const DEPLOYED_STORAGE_API_BASE_URL = "https://spring-field-3219.fly.dev";
const THREAD_SHARE_INBOX_LIMIT = 24;
const CHAT_SHARE_STORAGE_TARGET_CHARS = 1400000;
const CHAT_SHARE_STORAGE_SOFT_MESSAGE_LIMIT = 240;
const CHAT_SHARE_STORAGE_MIN_MESSAGE_LIMIT = 80;
const CHAT_SHARE_STORAGE_IMAGE_KEEP_COUNT = 20;
const THREAD_SHARE_STORAGE_RESERVE_CHARS = 48000;
const CUSTOM_TAB_DISCUSSION_VISIBLE_LIMIT = 10;
const CUSTOM_TAB_TOPIC_TAG_MIN_COUNT = 1;
const CUSTOM_TAB_TOPIC_TAG_MAX_COUNT = 3;
const FORUM_TOPIC_TAG_CATALOG = [
  { id: "chart_sales", label: "榜单/销量", description: "榜单、销量、一位、商业成绩" },
  { id: "stage_live", label: "舞台/现场", description: "舞台表现、开麦、唱跳、巡演现场" },
  { id: "music_work", label: "作品内容", description: "歌曲、专辑、作品内容本身" },
  { id: "schedule_travel", label: "行程/赶场", description: "行程、赶场、两国飞、工作安排" },
  { id: "health_official", label: "健康/官宣", description: "身体状态、工作室声明、退出活动、复工安排" },
  { id: "visual_style", label: "造型/视觉", description: "造型、妆发、穿搭、颜值图" },
  { id: "social_update", label: "社媒动态", description: "泡泡、微博、ins、直播发言、公开互动" },
  { id: "offline_sighting", label: "线下目击", description: "机场、医院、签售、路透、线下目击" },
  { id: "dating_rumor", label: "恋情传闻", description: "恋情爆料、约会传闻、绯闻链路" },
  { id: "cp_interaction", label: "CP互动", description: "同框张力、互动糖、舞台嗑点" },
  { id: "fandom_dynamics", label: "饭圈风向", description: "站姐、脱粉、控评、粉圈风向、粉丝情绪" },
  { id: "public_buzz", label: "公共讨论", description: "热搜、营销号、外网讨论、行业规则、公共舆论" }
];
const FORUM_TOPIC_TAG_IDS = new Set(FORUM_TOPIC_TAG_CATALOG.map((item) => item.id));
const HOME_FEED_LABELS = {
  entertainment: "系统内容",
  tags: "热门标签"
};
const NESTED_REPLY_COUNT = 3;
const DISCUSSION_SHARE_REPLY_NODE_LIMIT = 24;
const THREAD_MODAL_LOAD_COOLDOWN_MS = 420;
let lastKnownContentFeed = DEFAULT_CONTENT_FEED;
const memoryStorage = {};

const DEFAULT_SETTINGS = {
  mode: "openai",
  endpoint: DEFAULT_OPENAI_ENDPOINT,
  token: "",
  model: DEFAULT_DEEPSEEK_MODEL,
  temperature: DEFAULT_TEMPERATURE,
  privacyCoverEnabled: true,
  worldview:
    "这是一个强调长期主义、产品洞察和公共讨论质量的中文社交世界。用户习惯像在 X 上一样快速表达观点，但会天然追问效率、增长、AI 和平台变迁。整体语气要真实、犀利、能引发跟帖，不要写成官方通稿。",
  homeCount: DEFAULT_POST_COUNT,
  replyCount: DEFAULT_REPLY_COUNT,
  customTabs: [],
  apiConfigs: [],
  activeApiConfigId: "",
  translationApiEnabled: false,
  translationApiConfigId: "",
  summaryApiEnabled: false,
  summaryApiConfigId: "",
  floatingApiSwitcherEnabled: false,
  negativePromptConstraints: [],
  privacyAllowlist: []
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

const FEED_NAMES = [
  ["Astra Lin", "@astra_builds"],
  ["Ming Pulse", "@mingpulse"],
  ["Rhea Byte", "@rheabyte"],
  ["Noah Drift", "@noahsignal"],
  ["Ivy Orbit", "@ivyorbit"],
  ["Kite Workshop", "@kitewrk"],
  ["Luna Frame", "@lunaframe"],
  ["Delta Note", "@deltanote"],
  ["Sora Stack", "@sorastack"],
  ["Echo Matrix", "@echomatrix"],
  ["Nova Path", "@novapath"],
  ["Pixel Harbor", "@pixelharbor"]
];

const pageTitleMap = {
  home: "首页",
  profile: "个人主页",
  settings: "设置"
};

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

function buildStructuredPromptSections(promptTypeOrSections = {}, maybeSections = null, maybeOptions = {}) {
  const resolvedOptions = maybeOptions && typeof maybeOptions === "object" ? maybeOptions : {};
  const shouldIncludeNegativeConstraints = resolvedOptions.includeNegativeConstraints !== false;
  const wrapPrompt = (text) =>
    shouldIncludeNegativeConstraints
      ? prependGlobalPromptGuard(text, resolvedOptions.settings)
      : String(text || "").trim();
  if (typeof promptTypeOrSections === "string" && window.PulsePromptConfig?.buildPrompt) {
    const configuredPrompt = window.PulsePromptConfig.buildPrompt(
      promptTypeOrSections,
      maybeSections && typeof maybeSections === "object" ? maybeSections : {},
      resolvedOptions
    );
    if (configuredPrompt) {
      return wrapPrompt(configuredPrompt);
    }
  }
  const resolvedSections =
    promptTypeOrSections && typeof promptTypeOrSections === "object"
      ? promptTypeOrSections
      : maybeSections && typeof maybeSections === "object"
        ? maybeSections
        : {};
  return wrapPrompt(
    [
      `<context_library>\n${buildPromptSectionText(
        resolvedSections.contextLibrary,
        "暂无额外背景信息。"
      )}\n</context_library>`,
      `<persona_alignment>\n${buildPromptSectionText(
        resolvedSections.personaAlignment,
        "按当前已知身份与语境自然输出。"
      )}\n</persona_alignment>`,
      `<output_standard>\n${buildPromptSectionText(
        resolvedSections.outputStandard,
        "只输出符合要求的最终结果。"
      )}\n</output_standard>`
    ].join("\n\n")
  );
}

const pages = {
  home: document.querySelector("#home-page"),
  profile: document.querySelector("#profile-page"),
  settings: document.querySelector("#settings-page")
};

const navItems = [...document.querySelectorAll(".nav-item[data-tab]")];
const jumpLinks = [...document.querySelectorAll("[data-jump-tab]")];
const homeMiniTabsContainer = document.querySelector("#home-mini-tabs");
const pageTitleEl = document.querySelector("#page-title");
const feedEl = document.querySelector("#feed");
const profilePostsEl = document.querySelector("#profile-posts");
const profileScrollEl = document.querySelector("#profile-page .page-scroll");
const homeStatusEl = document.querySelector("#home-status");
const homeComposerCardEl = document.querySelector("#home-composer-card");
const homeComposerToggleBtn = document.querySelector("#home-composer-toggle-btn");
const homeComposerForm = document.querySelector("#home-composer-form");
const homeComposerKickerEl = document.querySelector("#home-composer-kicker");
const homeComposerTitleEl = document.querySelector("#home-composer-title");
const homeComposerMetaEl = document.querySelector("#home-composer-meta");
const homeComposerInput = document.querySelector("#home-composer-input");
const homeComposerTagsInput = document.querySelector("#home-composer-tags-input");
const homeComposerTagsFieldEl = document.querySelector("#home-composer-tags-field");
const homeComposerImageInput = document.querySelector("#home-composer-image-input");
const homeComposerImageFieldEl = document.querySelector("#home-composer-image-field");
const homeComposerImagePreviewEl = document.querySelector("#home-composer-image-preview");
const homeComposerQuotePreviewEl = document.querySelector("#home-composer-quote-preview");
const homeComposerStatusEl = document.querySelector("#home-composer-status");
const settingsStatusEl = document.querySelector("#settings-status");
const promptPreviewEl = document.querySelector("#prompt-preview");
const replyPromptPreviewEl = document.querySelector("#reply-prompt-preview");
const topRefreshBtn = document.querySelector("#top-refresh-btn");
const settingsGenerateBtn = document.querySelector("#settings-generate-btn");
const settingsForm = document.querySelector("#settings-form");
const customTabsManageBtn = document.querySelector("#custom-tabs-manage-btn");
const customTabsPanel = document.querySelector("#custom-tabs-manager");
const customTabsWorkspaceEl = document.querySelector("#custom-tabs-workspace");
const customTabsListEl = document.querySelector("#custom-tabs-list");
const customTabCreateBtn = document.querySelector("#custom-tab-create-btn");
const customTabForm = document.querySelector("#custom-tab-form");
const customTabEditorKickerEl = document.querySelector("#custom-tab-editor-kicker");
const customTabEditorTitleEl = document.querySelector("#custom-tab-editor-title");
const customTabEditorDescriptionEl = document.querySelector("#custom-tab-editor-description");
const customTabEditorResetBtn = document.querySelector("#custom-tab-editor-reset-btn");
const customTabNameInput = document.querySelector("#custom-tab-name-input");
const customTabAudienceInput = document.querySelector("#custom-tab-audience-input");
const customTabDiscussionItemsEditorEl = document.querySelector("#custom-tab-discussion-items-editor");
const customTabHotTopicItemsEditorEl = document.querySelector("#custom-tab-hot-topic-items-editor");
const customTabTimeAwarenessInput = document.querySelector("#custom-tab-time-awareness-input");
const customTabWorldbookListEl = document.querySelector("#custom-tab-worldbook-list");
const customTabBubbleFocusEnabledInput = document.querySelector(
  "#custom-tab-bubble-focus-enabled-input"
);
const customTabBubbleFocusMinutesInput = document.querySelector(
  "#custom-tab-bubble-focus-minutes-input"
);
const customTabInsFocusEnabledInput = document.querySelector("#custom-tab-ins-focus-enabled-input");
const customTabInsFocusMinutesInput = document.querySelector("#custom-tab-ins-focus-minutes-input");
const customTabFormStatusEl = document.querySelector("#custom-tab-form-status");
const customTabBackgroundRefreshBtn = document.querySelector("#custom-tab-background-refresh-btn");
const customTabBackgroundExtractBtn = document.querySelector("#custom-tab-background-extract-btn");
const customTabBackgroundHistoryExtractBtn = document.querySelector(
  "#custom-tab-background-history-extract-btn"
);
const customTabBackgroundMetaEl = document.querySelector("#custom-tab-background-meta");
const customTabBackgroundProgressEl = document.querySelector("#custom-tab-background-progress");
const customTabBackgroundProgressBarEl = document.querySelector(
  "#custom-tab-background-progress-bar"
);
const customTabBackgroundProgressLabelEl = document.querySelector(
  "#custom-tab-background-progress-label"
);
const customTabBackgroundProgressListEl = document.querySelector(
  "#custom-tab-background-progress-list"
);
const customTabBackgroundListEl = document.querySelector("#custom-tab-background-list");
const customTabBackgroundStatusEl = document.querySelector("#custom-tab-background-status");
const customTabCancelBtn = document.querySelector("#custom-tab-cancel-btn");
const customTabsCloseBtn = document.querySelector("#custom-tabs-close-btn");
const customTabsLimitHintEl = document.querySelector("#custom-tabs-limit-hint");
const homeScrollEl = document.querySelector("#home-scroll");
const pullIndicatorEl = document.querySelector("#pull-indicator");
const pullLabelEl = document.querySelector("#pull-label");
const pullMetaEl = document.querySelector("#pull-meta");
const threadModalEl = document.querySelector("#thread-modal");
const threadModalCloseBtn = document.querySelector("#thread-modal-close-btn");
const threadModalShareBtn = document.querySelector("#thread-modal-share-btn");
const threadModalBodyEl = document.querySelector("#thread-modal-body");
const threadModalRootEl = document.querySelector("#thread-modal-root");
const threadModalRepliesEl = document.querySelector("#thread-modal-replies");
const threadModalLoadHintEl = document.querySelector("#thread-modal-load-hint");
const threadShareModalEl = document.querySelector("#thread-share-modal");
const threadShareCloseBtn = document.querySelector("#thread-share-close-btn");
const threadShareListEl = document.querySelector("#thread-share-list");
const threadShareStatusEl = document.querySelector("#thread-share-status");
const embeddedCloseBtn = document.querySelector("#embedded-close-btn");
const profileBannerEl = document.querySelector("#profile-banner");
const profileAvatarEl = document.querySelector("#profile-avatar");
const profileUsernameEl = document.querySelector("#profile-username");
const profileBioEl = document.querySelector("#profile-bio");
const profileHandleEl = document.querySelector("#profile-handle");
const profileFollowersEl = document.querySelector("#profile-followers");
const profileFollowingEl = document.querySelector("#profile-following");
const profilePostCountEl = document.querySelector("#profile-post-count");
const profileEditorCardEl = document.querySelector("#profile-editor-card");
const profileForm = document.querySelector("#profile-form");
const profileStatusEl = document.querySelector("#profile-status");
const profileEditToggleBtn = document.querySelector("#profile-header-edit-btn");
const profileEditorCloseBtn = document.querySelector("#profile-editor-close-btn");
const profileCancelBtn = document.querySelector("#profile-cancel-btn");
const profileAvatarInput = document.querySelector("#profile-avatar-input");
const profileAvatarFileInput = document.querySelector("#profile-avatar-file-input");
const profileUsernameInput = document.querySelector("#profile-username-input");
const profileUserIdInput = document.querySelector("#profile-userid-input");
const profileFollowingInput = document.querySelector("#profile-following-input");
const profileFollowersInput = document.querySelector("#profile-followers-input");
const profileBannerFileInput = document.querySelector("#profile-banner-file-input");
const profileSignatureInput = document.querySelector("#profile-signature-input");
const profilePersonaInput = document.querySelector("#profile-persona-input");
const modeSelect = document.querySelector("#api-mode");
const endpointInput = document.querySelector("#api-endpoint");
const tokenInput = document.querySelector("#api-token");
const modelInput = document.querySelector("#api-model");
const temperatureInput = document.querySelector("#api-temperature");
const modelWrap = document.querySelector("#model-wrap");
const homeCountInput = document.querySelector("#home-count");
const replyCountInput = document.querySelector("#reply-count");
const worldviewInput = document.querySelector("#worldview-text");
const apiConfigNameInput = document.querySelector("#api-config-name-input");
const apiConfigSaveBtn = document.querySelector("#api-config-save-btn");
const apiConfigStatusEl = document.querySelector("#api-config-status");
const apiConfigListEl = document.querySelector("#api-config-list");
const translationApiEnabledEl = document.querySelector("#translation-api-enabled");
const translationApiConfigSelectEl = document.querySelector("#translation-api-config-select");

const state = {
  activeTab: "home",
  settings: loadSettings(),
  feeds: loadFeeds(),
  profile: loadProfile(),
  profilePosts: loadProfilePosts(),
  discussions: loadDiscussions(),
  customTabs: [],
  customTabEditorOpen: false,
  customTabEditingId: "",
  customTabContentDraft: null,
  draggingCustomTabId: "",
  activeFeed: DEFAULT_CONTENT_FEED,
  lastContentFeed: DEFAULT_CONTENT_FEED,
  activeTagFilter: "",
  profileEditorOpen: false,
  profilePostMenuId: null,
  profilePostEditingId: null,
  profilePostEditingDraft: "",
  composerOpen: false,
  homeComposerImageDataUrl: "",
  homeComposerRepostSource: null,
  homeComposerRepostPostId: "",
  isRefreshing: false,
  lastRefreshAt: safeGetItem(REFRESH_KEY) || "",
  pullDistance: 0,
  feedTopAnchorAt: Date.now(),
  touchStartY: 0,
  touchTracking: false,
  touchStartedAtTop: false,
  wheelReleaseTimer: null,
  threadModalOpen: false,
  threadModalBucket: "",
  threadModalPostId: "",
  threadModalTouchTracking: false,
  threadModalTouchStartY: 0,
  threadModalLoadingMore: false,
  threadModalLastLoadAt: 0,
  threadShareModalOpen: false,
  threadShareSubmitting: false,
  threadReplyTargetType: "",
  threadReplyTargetId: "",
  threadReplyDraft: "",
  threadReplyStatus: "",
  threadReplyStatusTone: "",
  threadReplySubmitting: false,
  translatingPosts: {},
  translatingReplies: {},
  forumBackgroundByTab: {},
  forumBackgroundPanelLoading: false,
  forumBackgroundPanelExtracting: false,
  forumBackgroundExtractionProgress: null
};

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

state.customTabs = normalizeCustomTabs(state.settings.customTabs);
state.settings.customTabs = [...state.customTabs];
state.settings.apiConfigs = normalizeApiConfigs(state.settings.apiConfigs);
if (
  state.settings.activeApiConfigId &&
  !state.settings.apiConfigs.some((item) => item.id === state.settings.activeApiConfigId)
) {
  state.settings.activeApiConfigId = "";
}
synchronizeCustomTabBuckets();

function isEmbeddedView() {
  try {
    const params = new URLSearchParams(window.location.search);
    return params.get("embed") === "1";
  } catch (_error) {
    return false;
  }
}

function normalizeTabName(tabName) {
  const normalized = String(tabName || "").trim();
  if (normalized === "chat" || normalized === "following" || normalized === "messages") {
    return "home";
  }
  if (normalized === "x") {
    return "home";
  }
  if (Object.prototype.hasOwnProperty.call(pages, normalized)) {
    return normalized;
  }
  return "home";
}

function getInitialTabFromLocation() {
  try {
    const params = new URLSearchParams(window.location.search);
    return normalizeTabName(params.get("tab"));
  } catch (_error) {
    return "home";
  }
}

function syncTabToLocation(tabName) {
  if (!window.history || typeof window.history.replaceState !== "function") {
    return;
  }

  try {
    const nextUrl = new URL(window.location.href);
    nextUrl.searchParams.set("tab", normalizeTabName(tabName));
    window.history.replaceState({}, "", nextUrl.toString());
  } catch (_error) {
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

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getEventHTMLElement(event) {
  const target = event.target;
  if (target instanceof HTMLElement) {
    return target;
  }
  if (target instanceof Node && target.parentElement instanceof HTMLElement) {
    return target.parentElement;
  }
  return null;
}

function formatDateTime(value = new Date()) {
  return new Intl.DateTimeFormat("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(value);
}

function formatForumTimestamp(value = Date.now()) {
  return formatDateTime(value instanceof Date ? value : new Date(Number(value) || Date.now())).replaceAll(
    "/",
    "-"
  );
}

function normalizeDateInputValue(value = "") {
  const normalized = String(value || "").trim();
  return /^\d{4}-\d{2}-\d{2}$/.test(normalized) ? normalized : "";
}

function formatAwarenessDateTime(now = new Date()) {
  const date = new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long"
  }).format(now);
  const time = new Intl.DateTimeFormat("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  })
    .format(now)
    .replace(/^24:/, "00:");
  return `${date} ${time}`;
}

function getPromptNow(settings = state.settings || DEFAULT_SETTINGS) {
  return window.PulsePromptConfig?.resolvePromptNow?.(settings, new Date()) || new Date();
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

function buildDiscussionApiLogBase(action, settings, endpoint, prompt, requestBody, summary = "") {
  const mode = normalizeApiMode(settings.mode);
  return {
    source: "discussion",
    action,
    summary,
    endpoint,
    mode,
    model: mode === "generic" ? "" : settings.model || getDefaultModelByMode(mode),
    prompt,
    requestBody
  };
}

function resolveDiscussionStorageApiBaseUrl() {
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

function buildDiscussionStorageApiUrl(pathname = "/api/health") {
  const baseUrl = resolveDiscussionStorageApiBaseUrl();
  return new URL(String(pathname || "").replace(/^\/+/, ""), `${baseUrl}/`).toString();
}

async function requestDiscussionStorageApi(pathname, options = {}) {
  const response = await fetch(buildDiscussionStorageApiUrl(pathname), {
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

function truncate(text, length = 120) {
  const normalized = String(text || "").trim();
  if (normalized.length <= length) {
    return normalized;
  }
  return `${normalized.slice(0, length - 1)}…`;
}

function normalizePersistedFeedType(feedType, fallback = DEFAULT_CONTENT_FEED) {
  const normalized = String(feedType || "").trim();
  if (!normalized || normalized === "profile" || normalized === "tags") {
    return fallback;
  }
  if (normalized === "hot") {
    return "entertainment";
  }
  return normalized;
}

function parseTopics(source) {
  return String(source || "")
    .split(/\n|,|，/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseWorldviewFragments(source) {
  return String(source || "")
    .split(/[\n。！？!?]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeCustomTabs(tabs = []) {
  if (!Array.isArray(tabs)) {
    return [];
  }

  const normalizedTabs = tabs
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
        )
      };
    })
    .filter(Boolean)
    .slice(0, CUSTOM_TAB_LIMIT)
    .map((tab) => ({
      id: tab.id || createCustomTabId(tab.name || "custom"),
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
      insFocusMinutes: normalizeContextFocusMinutes(tab.insFocusMinutes)
    }));
  const pinnedTab = normalizedTabs.find((tab) => tab.pinned) || null;
  if (!pinnedTab) {
    return normalizedTabs;
  }
  return [
    {
      ...pinnedTab,
      pinned: true
    },
    ...normalizedTabs
      .filter((tab) => tab.id !== pinnedTab.id)
      .map((tab) => ({
        ...tab,
        pinned: false
      }))
  ];
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
  return {
    id: String(source.id || `worldbook_entry_${index}_${hashText(name)}`),
    name: name.slice(0, 40),
    text: String(source.text || "").trim(),
    categoryId: categories.some((item) => item.id === categoryId) ? categoryId : "",
    createdAt: Number(source.createdAt) || Date.now(),
    updatedAt: Number(source.updatedAt) || Date.now()
  };
}

function loadWorldbookLibrary() {
  const raw = readStoredJson(WORLD_BOOKS_KEY, { categories: [], entries: [] });
  const categories = Array.isArray(raw?.categories)
    ? raw.categories.map((item, index) => normalizeWorldbookCategory(item, index))
    : [];
  const entries = Array.isArray(raw?.entries)
    ? raw.entries
        .map((item, index) => normalizeWorldbookEntry(item, categories, index))
        .filter((item) => item.name && item.text)
    : [];
  return { categories, entries };
}

function getMountedWorldbookEntries(tab) {
  const library = loadWorldbookLibrary();
  return normalizeMountedIds(tab?.worldbookIds || [])
    .map((entryId) => library.entries.find((item) => item.id === entryId) || null)
    .filter(Boolean)
    .map((entry) => ({
      ...entry,
      categoryName:
        library.categories.find((category) => category.id === entry.categoryId)?.name || "未分类"
    }));
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
    const current = messages[cursor];
    const text = String(current?.text || "").trim();
    if (text) {
      batch.unshift(current);
    }
    cursor -= 1;
  }
  return batch;
}

function getRecentBubbleBatchForTab(tab) {
  if (!tab?.bubbleFocusEnabled) {
    return null;
  }

  const threads = readStoredJson(BUBBLE_THREADS_KEY, {});
  if (!threads || typeof threads !== "object") {
    return null;
  }

  const latestBatch = Object.values(threads)
    .map((thread) => extractLatestBubbleBatch(thread))
    .filter((batch) => batch.length)
    .sort(
      (left, right) =>
        (Number(right[right.length - 1]?.createdAt) || 0) -
        (Number(left[left.length - 1]?.createdAt) || 0)
    )[0];

  if (!latestBatch?.length) {
    return null;
  }

  const latestCreatedAt = Number(latestBatch[latestBatch.length - 1]?.createdAt) || 0;
  if (!latestCreatedAt) {
    return null;
  }

  if (Date.now() - latestCreatedAt > normalizeContextFocusMinutes(tab.bubbleFocusMinutes) * 60_000) {
    return null;
  }

  return {
    messages: latestBatch,
    createdAt: latestCreatedAt,
    time:
      String(latestBatch[latestBatch.length - 1]?.time || "").trim() ||
      formatForumTimestamp(latestCreatedAt)
  };
}

function normalizeRepostSource(source, fallbackId = "") {
  if (!source || typeof source !== "object") {
    return null;
  }

  const rawText =
    typeof source.text === "string"
      ? source.text
      : source.text == null
        ? ""
        : String(source.text);
  const imageDataUrl = String(source.imageDataUrl || source.imageUrl || "").trim();
  const text = rawText.trim() ? truncate(rawText, MAX_POST_TEXT_LENGTH) : "";
  const tags = normalizeTags(source.tags || [], 5);
  if (!text && !imageDataUrl) {
    return null;
  }

  const createdAt = Number(source.createdAt) || 0;
  return {
    id:
      String(source.id || "").trim() ||
      fallbackId ||
      `repost_source_${hashText(`${source.displayName || ""}-${source.handle || ""}-${text}`)}`,
    displayName: truncate(source.displayName || source.username || "论坛用户", 28),
    handle: truncate(source.handle || source.userId || "@forum_user", 28),
    text,
    imageDataUrl,
    tags,
    time:
      String(source.time || "").trim() ||
      (createdAt ? formatForumTimestamp(createdAt) : ""),
    createdAt
  };
}

function createRepostSourceSnapshotFromPost(post) {
  if (!post || typeof post !== "object") {
    return null;
  }
  if (post.repostSource) {
    return normalizeRepostSource(post.repostSource, post.repostSource.id || post.id || "");
  }
  return normalizeRepostSource(
    {
      id: post.id,
      displayName: post.displayName,
      handle: post.handle,
      text: post.text,
      imageDataUrl: post.imageDataUrl,
      tags: getRenderableTags(post, post.feedType || DEFAULT_CONTENT_FEED),
      time: post.time,
      createdAt: post.createdAt
    },
    post.id || ""
  );
}

function extractPostTopic(post) {
  if (!post || typeof post !== "object") {
    return "";
  }
  const sourceText = String(post.text || post.repostSource?.text || "").replace(/\s+/g, " ").trim();
  const tags = normalizeTags(post.tags || post.repostSource?.tags || [], 3);
  if (tags.length) {
    return tags.join(" ");
  }
  if (!sourceText) {
    return "";
  }
  const firstLine = sourceText.split("\n")[0].trim();
  const firstClause = firstLine.split(/[。！？!?]/)[0].trim();
  const firstSegment = firstClause.split(/[，,]/)[0].trim();
  return truncate(firstSegment || firstClause || firstLine, 72);
}

function getRecentProfilePostForTab(tab) {
  if (!tab?.insFocusEnabled) {
    return null;
  }

  const posts = state.profilePosts.length ? state.profilePosts : loadProfilePosts();
  const latestPost = [...posts]
    .sort((left, right) => (Number(right?.createdAt) || 0) - (Number(left?.createdAt) || 0))
    .find((item) => item && typeof item === "object" && (String(item.text || "").trim() || item.repostSource));

  if (!latestPost) {
    return null;
  }

  const createdAt = Number(latestPost.createdAt) || 0;
  if (!createdAt) {
    return null;
  }

  if (Date.now() - createdAt > normalizeContextFocusMinutes(tab.insFocusMinutes) * 60_000) {
    return null;
  }

  return {
    post: latestPost,
    repostSource: createRepostSourceSnapshotFromPost(latestPost),
    createdAt,
    time: String(latestPost.time || "").trim() || formatForumTimestamp(createdAt)
  };
}

function buildCustomTabTimeAwarenessContext(tab) {
  if (!tab?.timeAwareness) {
    return "";
  }
  const promptNow = getPromptNow(getCurrentSettings());
  return [
    `当前本地时间：${formatAwarenessDateTime(promptNow)}`,
    "请结合这个讨论区的长期讨论背景与当前核心热点里提到的日期、星期、倒计时或事件节点来判断时效性。",
    "如果设定内容指向未来某一天，请自然表现期待、等结果、预测或临近发生前的情绪；如果指向已经过去的日期，请自然表现回顾、复盘、后劲、落差或继续争论过去某天发生的事。"
  ].join("\n");
}

function buildCustomTabWorldbookContext(tab) {
  const entries = getMountedWorldbookEntries(tab);
  if (!entries.length) {
    return "";
  }
  return [
    "世界书辅助背景（重要程度低于当前论坛讨论区设定，仅作隐性参考；禁止单独提起这些设定来源，也不要直接照抄原文）：",
    ...entries.map(
      (entry) => `- ${entry.name}（${entry.categoryName || "未分类"}）\n${entry.text}`
    )
  ].join("\n");
}

function buildCustomTabBubbleContext(tab) {
  const batch = getRecentBubbleBatchForTab(tab);
  if (!batch?.messages?.length) {
    return { text: "", batch: null };
  }
  return {
    batch,
    text: [
      `爆炸性即时动态（权重与当前讨论区主导热点等同）：用户最近一轮 Bubble 消息最后发送于 ${batch.time}。`,
      "请把这轮 Bubble 动态当成突然引爆论坛的大新闻来理解：如果挂载生效，本轮生成的大部分帖子都应围绕它展开，讨论密度要明显升高，不要只把它当成轻描淡写的补充信息。",
      "允许不同帖子围绕同一轮 Bubble 动态拆成不同立场、不同情绪、不同细节、不同猜测与不同争议点，但中心讨论必须足够集中。",
      ...batch.messages.map(
        (item, index) =>
          `${index + 1}. ${String(item.time || "").trim() || formatForumTimestamp(item.createdAt)} · ${truncate(
            String(item.text || "").trim(),
            120
          )}`
      )
    ].join("\n")
  };
}

function buildCustomTabInsContext(tab) {
  const recentProfilePost = getRecentProfilePostForTab(tab);
  if (!recentProfilePost?.post || !recentProfilePost.repostSource) {
    return { text: "", repostSource: null, post: null };
  }

  const topic = extractPostTopic(recentProfilePost.post);
  return {
    post: recentProfilePost.post,
    repostSource: recentProfilePost.repostSource,
    text: [
      `补充转发话题（重要程度接近当前讨论区主导热点）：用户最近在论坛发了一条动态，时间是 ${recentProfilePost.time}。`,
      topic ? `这条动态的主题：${topic}` : "这条动态以原帖内容为主，没有额外说明。",
      "如果本轮帖子需要围绕这条动态讨论，请使用“转发/引用这条原帖再评论”的发帖形式，而不是脱离原帖凭空讨论。"
    ].join("\n")
  };
}

function buildForumPromptContext(settings, feedType = state.activeFeed) {
  const resolvedFeedType = getCurrentContentFeed(feedType);
  const customTab = findCustomTabInSettings(settings, resolvedFeedType);
  if (!customTab) {
    return {
      resolvedFeedType,
      customTab: null,
      timeAwarenessText: "",
      worldbookReferenceText: "",
      supplementalTopicTexts: [],
      repostSource: null
    };
  }

  const bubbleContext = buildCustomTabBubbleContext(customTab);
  const insContext = buildCustomTabInsContext(customTab);
  return {
    resolvedFeedType,
    customTab,
    timeAwarenessText: buildCustomTabTimeAwarenessContext(customTab),
    worldbookReferenceText: buildCustomTabWorldbookContext(customTab),
    supplementalTopicTexts: [bubbleContext.text, insContext.text].filter(Boolean),
    repostSource: insContext.repostSource || null
  };
}

function formatRepostSourceForPrompt(source) {
  const normalized = normalizeRepostSource(source);
  if (!normalized) {
    return "";
  }
  return [
    `原帖用户：${normalized.displayName} ${normalized.handle}`,
    normalized.time ? `原帖时间：${normalized.time}` : "",
    normalized.text ? `原帖正文：${normalized.text}` : "原帖正文：这是一条以图片为主的帖子。",
    normalized.tags.length ? `原帖标签：${normalized.tags.join(" ")}` : ""
  ]
    .filter(Boolean)
    .join("\n");
}

function getMountedInsRepostSource(settings, feedType = state.activeFeed) {
  return buildForumPromptContext(settings, feedType).repostSource || null;
}

function buildCustomTabSourceText(tab, options = {}) {
  if (!tab || typeof tab !== "object") {
    return "";
  }
  const {
    includeAudience = true,
    includeDiscussionText = true,
    includeHotTopic = true
  } = options;
  const sections = [];
  const audience = String(tab.audience || "").trim();
  const discussionText = String(tab.discussionText || tab.text || "").trim();
  const hotTopic = String(tab.hotTopic || "").trim();

  if (includeAudience && audience) {
    sections.push(`论坛活跃用户定位：${audience}`);
  }
  if (includeDiscussionText && discussionText) {
    sections.push(`论坛长期讨论背景：${discussionText}`);
  }
  if (includeHotTopic && hotTopic) {
    sections.push(`论坛当前核心热点：${hotTopic}`);
  }

  return sections.join("\n");
}

function buildCustomTabTopicSeedText(settings, feedType = state.activeFeed) {
  const resolvedFeedType = getCurrentContentFeed(feedType);
  const customTab = findCustomTabInSettings(settings, resolvedFeedType);
  if (!customTab) {
    return "";
  }
  return [
    String(customTab.hotTopic || "").trim(),
    String(customTab.discussionText || customTab.text || "").trim(),
    String(customTab.name || "").trim()
  ]
    .filter(Boolean)
    .join("\n");
}

function normalizeApiMode(mode) {
  if (mode === "gemini" || mode === "generic" || mode === "grok") {
    return mode;
  }
  return "openai";
}

function getApiModeLabel(mode) {
  const resolvedMode = normalizeApiMode(mode);
  if (resolvedMode === "grok") {
    return "Grok API";
  }
  if (resolvedMode === "gemini") {
    return "Gemini API";
  }
  if (resolvedMode === "generic") {
    return "通用 JSON 接口";
  }
  return "DeepSeek / OpenAI 兼容";
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

function normalizeApiConfigs(configs = []) {
  if (!Array.isArray(configs)) {
    return [];
  }

  return configs
    .filter((item) => item && typeof item === "object")
    .slice(0, API_CONFIG_LIMIT)
    .map((item, index) => {
      const mode = normalizeApiMode(item.mode);
      const fallbackName = `接口配置 ${index + 1}`;
      return {
        id: item.id || `api_cfg_${index}_${hashText(`${item.name || ""}-${item.endpoint || ""}`)}`,
        name: String(item.name || fallbackName).trim().slice(0, 20) || fallbackName,
        mode,
        endpoint: String(item.endpoint || "").trim(),
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

function findCustomTabInSettings(settings, tabId) {
  if (!Array.isArray(settings?.customTabs)) {
    return null;
  }
  return settings.customTabs.find((tab) => tab.id === tabId) || null;
}

function getCustomTab(tabId) {
  return state.customTabs.find((tab) => tab.id === tabId) || null;
}

function isBuiltinFeed(feedType) {
  return feedType === "entertainment";
}

function isCustomFeed(feedType) {
  return state.customTabs.some((tab) => tab.id === feedType);
}

function isTimelineFeed(feedType) {
  return isBuiltinFeed(feedType) || isCustomFeed(feedType);
}

function getDefaultVisibleHomeFeed() {
  if (state.customTabs.length) {
    return state.customTabs[0].id;
  }
  return "tags";
}

function getFeedLabel(feedType = DEFAULT_CONTENT_FEED) {
  if (isBuiltinFeed(feedType)) {
    return HOME_FEED_LABELS[feedType] || "默认话题";
  }
  const tab = getCustomTab(feedType);
  if (tab) {
    return tab.name || "自定义页签";
  }
  return HOME_FEED_LABELS.entertainment;
}

function createCustomTabId(seed = "custom") {
  return `custom_${Date.now()}_${hashText(seed)}`;
}

function synchronizeCustomTabBuckets() {
  const validIds = new Set(state.customTabs.map((tab) => tab.id));
  state.customTabs.forEach((tab) => {
    if (!state.feeds[tab.id]) {
      state.feeds[tab.id] = [];
    }
    if (!state.discussions[tab.id]) {
      state.discussions[tab.id] = {};
    }
  });

  Object.keys(state.feeds).forEach((key) => {
    if (!isBuiltinFeed(key) && !validIds.has(key)) {
      delete state.feeds[key];
    }
  });

  Object.keys(state.discussions).forEach((key) => {
    if (key !== "profile" && !isBuiltinFeed(key) && !validIds.has(key)) {
      delete state.discussions[key];
    }
  });

  if (state.activeFeed !== "tags" && !isCustomFeed(state.activeFeed)) {
    state.activeFeed = getDefaultVisibleHomeFeed();
  }
  if (state.customTabs.length) {
    if (!isCustomFeed(state.lastContentFeed)) {
      state.lastContentFeed = state.customTabs[0].id;
    }
  } else if (!isTimelineFeed(state.lastContentFeed)) {
    state.lastContentFeed = DEFAULT_CONTENT_FEED;
  }
}

function commitCustomTabs(nextTabs) {
  state.customTabs = normalizeCustomTabs(nextTabs);
  state.settings.customTabs = [...state.customTabs];
  synchronizeCustomTabBuckets();
  persistSettings(state.settings);
  persistFeeds(state.feeds);
  persistDiscussions();
  renderHomeTabs();
  renderCustomTabsManager();
  renderActiveFeed();
  updatePromptPreview();
  updateReplyPromptPreview();
  updateInsightPanel();
}

function normalizeSingleTag(value) {
  const trimmed = String(value || "")
    .trim()
    .replace(/^#+/, "")
    .replace(/\s+/g, "");
  if (!trimmed) {
    return "";
  }
  return `#${trimmed}`;
}

function normalizeTags(value, max = 5) {
  const source = Array.isArray(value)
    ? value
    : String(value || "").match(/#?[^\s,，、#]+/g) || [];

  const seen = new Set();
  return source
    .map((item) => normalizeSingleTag(item))
    .filter((item) => {
      if (!item || seen.has(item)) {
        return false;
      }
      seen.add(item);
      return true;
    })
    .slice(0, max);
}

function ensurePostTags(tags, feedType = DEFAULT_CONTENT_FEED, index = 0) {
  const normalized = normalizeTags(tags, 5);
  if (normalized.length >= 2) {
    return normalized;
  }

  const fallbackPools = {
    hot: ["#热点追踪", "#行业洞察", "#趋势判断", "#平台观察", "#公共讨论"],
    entertainment: ["#文娱热议", "#口碑观察", "#热搜现场", "#角色讨论", "#二创发酵"]
  };
  const pool = fallbackPools[feedType] || fallbackPools.hot;
  const extra = [];

  for (let offset = 0; offset < pool.length && normalized.length + extra.length < 2; offset += 1) {
    const candidate = pool[(index + offset) % pool.length];
    if (!normalized.includes(candidate) && !extra.includes(candidate)) {
      extra.push(candidate);
    }
  }

  return [...normalized, ...extra].slice(0, 5);
}

function getRenderableTags(post, fallbackFeedType = DEFAULT_CONTENT_FEED) {
  if (Array.isArray(post?.tags)) {
    return normalizeTags(post.tags, 5);
  }
  if (post?.topic) {
    return normalizeTags([post.topic], 5);
  }
  return ensurePostTags([], fallbackFeedType, 0);
}

function renderPostTags(post, fallbackFeedType = DEFAULT_CONTENT_FEED) {
  const tags = getRenderableTags(post, fallbackFeedType);
  if (!tags.length) {
    return "";
  }
  return `<p class="post-tags">${tags
    .map((tag) => `<span class="post-tag">${escapeHtml(tag)}</span>`)
    .join(" ")}</p>`;
}

function getCurrentContentFeed(feedType = state.activeFeed) {
  if (isCustomFeed(feedType)) {
    return feedType;
  }
  if (isBuiltinFeed(feedType) && !state.customTabs.length) {
    return feedType;
  }
  if (isCustomFeed(state.lastContentFeed)) {
    return state.lastContentFeed;
  }
  if (state.customTabs.length) {
    return state.customTabs[0].id;
  }
  if (isBuiltinFeed(state.lastContentFeed)) {
    return state.lastContentFeed;
  }
  return DEFAULT_CONTENT_FEED;
}

function createDiscussionState() {
  return {
    entertainment: {},
    profile: {}
  };
}

function normalizeCachedReplyTree(replies = []) {
  if (!Array.isArray(replies)) {
    return [];
  }

  return replies
    .filter((reply) => reply && typeof reply === "object")
    .map((reply, index) => normalizeReply(reply, index, `cached_${reply.id || index}`))
    .map((reply, index) => ({
      ...reply,
      expanded: false,
      loading: false,
      children: normalizeCachedReplyTree(replies[index]?.children || [])
    }));
}

function normalizeDiscussionBucket(bucket = {}) {
  if (!bucket || typeof bucket !== "object") {
    return {};
  }

  const normalized = {};
  Object.entries(bucket).forEach(([postId, thread]) => {
    if (!postId || !thread || typeof thread !== "object") {
      return;
    }
    const replies = normalizeCachedReplyTree(thread.replies || []);
    if (!replies.length) {
      return;
    }
    normalized[postId] = {
      expanded: false,
      loading: false,
      replies
    };
  });
  return normalized;
}

function loadDiscussions() {
  const raw = safeGetItem(DISCUSSIONS_KEY);
  if (!raw) {
    return createDiscussionState();
  }

  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") {
      return createDiscussionState();
    }
    const normalized = createDiscussionState();
    Object.entries(parsed).forEach(([bucketName, bucket]) => {
      normalized[bucketName] = normalizeDiscussionBucket(bucket);
    });
    return normalized;
  } catch (_error) {
    return createDiscussionState();
  }
}

function trimDiscussionBucketsByFeed() {
  Object.keys(state.discussions).forEach((bucketName) => {
    if (bucketName === "profile") {
      return;
    }
    const bucket = state.discussions[bucketName] || {};
    const validPostIds = new Set(
      (state.feeds[bucketName] || []).slice(0, MAX_FEED_ITEMS).map((post) => post.id)
    );
    const trimmed = {};
    Object.keys(bucket).forEach((postId) => {
      if (validPostIds.has(postId)) {
        trimmed[postId] = bucket[postId];
      }
    });
    state.discussions[bucketName] = trimmed;
  });
}

function persistDiscussions() {
  trimDiscussionBucketsByFeed();
  safeSetItem(DISCUSSIONS_KEY, JSON.stringify(state.discussions));
}

function hashText(value) {
  const text = String(value || "");
  let hash = 0;
  for (let index = 0; index < text.length; index += 1) {
    hash = (hash * 31 + text.charCodeAt(index)) >>> 0;
  }
  return hash.toString(36);
}

function getCurrentSettings() {
  const mode = normalizeApiMode(modeSelect?.value || state.settings.mode);
  const translationApiEnabled = translationApiEnabledEl
    ? Boolean(translationApiEnabledEl.checked)
    : Boolean(state.settings.translationApiEnabled);
  const translationApiConfigId = String(
    translationApiConfigSelectEl?.value || state.settings.translationApiConfigId || ""
  ).trim();
  return {
    ...state.settings,
    mode,
    endpoint: String(endpointInput?.value || state.settings.endpoint || "").trim(),
    token: String(tokenInput?.value || state.settings.token || "").trim(),
    model: String(modelInput?.value || state.settings.model || "").trim(),
    temperature: normalizeTemperature(temperatureInput.value, DEFAULT_TEMPERATURE),
    homeCount: normalizePositiveInteger(homeCountInput.value, DEFAULT_POST_COUNT),
    replyCount: normalizePositiveInteger(replyCountInput.value, DEFAULT_REPLY_COUNT),
    worldview: worldviewInput.value.trim(),
    customTabs: [...state.customTabs],
    apiConfigs: normalizeApiConfigs(state.settings.apiConfigs),
    activeApiConfigId: state.settings.activeApiConfigId || "",
    translationApiEnabled: translationApiEnabled && Boolean(translationApiConfigId),
    translationApiConfigId,
    summaryApiEnabled: Boolean(state.settings.summaryApiEnabled),
    summaryApiConfigId: String(state.settings.summaryApiConfigId || "").trim()
  };
}

function normalizePositiveInteger(value, fallback) {
  const parsed = Number.parseInt(value, 10);
  if (Number.isFinite(parsed) && parsed > 0) {
    return parsed;
  }
  return fallback;
}

function persistSettings(nextSettings) {
  safeSetItem(SETTINGS_KEY, JSON.stringify(nextSettings));
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

function refreshRuntimeApiSettingsFromStorage() {
  const nextSettings = loadSettings();
  state.settings = {
    ...state.settings,
    mode: nextSettings.mode,
    endpoint: nextSettings.endpoint,
    token: nextSettings.token,
    model: nextSettings.model,
    temperature: normalizeTemperature(nextSettings.temperature, DEFAULT_TEMPERATURE),
    apiConfigs: normalizeApiConfigs(nextSettings.apiConfigs),
    activeApiConfigId: nextSettings.activeApiConfigId || "",
    translationApiEnabled: Boolean(nextSettings.translationApiEnabled),
    translationApiConfigId: nextSettings.translationApiConfigId || "",
    summaryApiEnabled: Boolean(nextSettings.summaryApiEnabled),
    summaryApiConfigId: nextSettings.summaryApiConfigId || "",
    floatingApiSwitcherEnabled: Boolean(nextSettings.floatingApiSwitcherEnabled)
  };
  if (modeSelect) {
    modeSelect.value = state.settings.mode;
  }
  if (endpointInput) {
    endpointInput.value = state.settings.endpoint;
  }
  if (tokenInput) {
    tokenInput.value = state.settings.token || "";
  }
  if (modelInput) {
    modelInput.value = state.settings.model || getDefaultModelByMode(state.settings.mode);
  }
  if (temperatureInput) {
    temperatureInput.value = String(state.settings.temperature);
  }
  if (translationApiEnabledEl) {
    translationApiEnabledEl.checked = Boolean(state.settings.translationApiEnabled);
  }
  updateModeUI();
  renderApiConfigList();
  updatePromptPreview();
  updateReplyPromptPreview();
  updateInsightPanel();
}

function buildNormalizedSettingsSnapshot(source, options = {}) {
  const merged = {
    ...DEFAULT_SETTINGS,
    ...(source && typeof source === "object" ? source : {})
  };
  merged.mode = normalizeApiMode(merged.mode);
  merged.endpoint = normalizeSettingsEndpointByMode(merged.mode, merged.endpoint);
  merged.token = normalizeApiConfigToken(merged.token);
  merged.temperature = normalizeTemperature(merged.temperature, DEFAULT_TEMPERATURE);
  const legacyCustomTabs =
    merged.customTabs || source?.customTabs || source?.customFeeds || source?.customTabList || [];
  merged.customTabs = normalizeCustomTabs(legacyCustomTabs);
  const legacyApiConfigs =
    merged.apiConfigs || source?.apiConfigs || source?.apiPresets || source?.apiProfiles || [];
  merged.apiConfigs = normalizeApiConfigs(legacyApiConfigs);
  merged.model =
    merged.mode === "generic"
      ? ""
      : String(merged.model || getDefaultModelByMode(merged.mode)).trim() ||
        getDefaultModelByMode(merged.mode);
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
    const shouldSyncActiveConfig =
      options.forceActiveConfig ||
      !merged.endpoint ||
      (!merged.token && activeConfig.token) ||
      normalizeApiMode(merged.mode) !== normalizeApiMode(activeConfig.mode);

    if (shouldSyncActiveConfig) {
      merged.mode = normalizeApiMode(activeConfig.mode);
      merged.endpoint = normalizeSettingsEndpointByMode(activeConfig.mode, activeConfig.endpoint);
      merged.token = normalizeApiConfigToken(activeConfig.token);
      merged.model =
        merged.mode === "generic"
          ? ""
          : String(activeConfig.model || getDefaultModelByMode(activeConfig.mode)).trim() ||
            getDefaultModelByMode(activeConfig.mode);
      merged.temperature = normalizeTemperature(activeConfig.temperature, DEFAULT_TEMPERATURE);
    }
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

function persistFeeds(feeds) {
  safeSetItem(POSTS_KEY, JSON.stringify(feeds));
}

function loadProfile() {
  const raw = safeGetItem(PROFILE_KEY);
  if (!raw) {
    return { ...DEFAULT_PROFILE };
  }

  try {
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_PROFILE,
      ...parsed
    };
  } catch (_error) {
    return { ...DEFAULT_PROFILE };
  }
}

function persistProfile(profile) {
  safeSetItem(PROFILE_KEY, JSON.stringify(profile));
}

function refreshSharedProfileState() {
  if (state.profileEditorOpen) {
    return false;
  }
  state.profile = loadProfile();
  if (typeof applyProfileToForm === "function") {
    applyProfileToForm(state.profile);
  }
  return true;
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("图片读取失败"));
    reader.readAsDataURL(file);
  });
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

function loadProfilePosts() {
  const raw = safeGetItem(PROFILE_POSTS_KEY);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.map((item, index) => {
          const resolvedFeedType = normalizePersistedFeedType(item?.feedType);
          const post = normalizePost(item, index, resolvedFeedType);
          post.authorOwned = true;
          post.feedType = normalizePersistedFeedType(item?.feedType, post.feedType);
          return post;
        })
      : [];
  } catch (_error) {
    return [];
  }
}

function persistProfilePosts(posts) {
  safeSetItem(PROFILE_POSTS_KEY, JSON.stringify(posts));
}

function createDefaultFeeds() {
  return {
    entertainment: []
  };
}

function loadFeeds() {
  const raw = safeGetItem(POSTS_KEY);
  if (!raw) {
    return createDefaultFeeds();
  }

  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length) {
      return {
        entertainment: parsed
          .map((item, index) => normalizePost(item, index, "entertainment"))
          .slice(0, MAX_FEED_ITEMS)
      };
    }
    if (parsed && typeof parsed === "object") {
      const normalized = {};
      Object.keys(parsed).forEach((key) => {
        if (Array.isArray(parsed[key])) {
          const mappedKey = key === "hot" ? "entertainment" : key;
          const mappedPosts = parsed[key].map((item, index) =>
            normalizePost(item, index, mappedKey)
          );
          normalized[mappedKey] = [...(normalized[mappedKey] || []), ...mappedPosts].slice(
            0,
            MAX_FEED_ITEMS
          );
        }
      });
      if (!normalized.entertainment) {
        normalized.entertainment = [];
      }
      const totalPosts = Object.values(normalized).reduce(
        (total, posts) => total + (Array.isArray(posts) ? posts.length : 0),
        0
      );
      if (totalPosts === 0) {
        normalized.entertainment = [];
      }
      return normalized;
    }
  } catch (_error) {
    return createDefaultFeeds();
  }

  return createDefaultFeeds();
}

function applySettingsToForm(settings) {
  const resolvedMode = normalizeApiMode(settings.mode);
  if (modeSelect) {
    modeSelect.value = resolvedMode;
  }
  if (endpointInput) {
    endpointInput.value = normalizeSettingsEndpointByMode(
      resolvedMode,
      settings.endpoint || ""
    );
  }
  if (tokenInput) {
    tokenInput.value = settings.token || "";
  }
  if (modelInput) {
    modelInput.value = settings.model || getDefaultModelByMode(resolvedMode);
  }
  temperatureInput.value = String(normalizeTemperature(settings.temperature, DEFAULT_TEMPERATURE));
  homeCountInput.value = String(settings.homeCount || DEFAULT_POST_COUNT);
  replyCountInput.value = String(settings.replyCount || DEFAULT_REPLY_COUNT);
  worldviewInput.value = settings.worldview || DEFAULT_SETTINGS.worldview;
  if (translationApiEnabledEl) {
    translationApiEnabledEl.checked = Boolean(settings.translationApiEnabled);
  }
  updateModeUI();
  renderApiConfigList();
}

function applyProfileToForm(profile) {
  profileAvatarInput.value = profile.avatar || DEFAULT_PROFILE.avatar;
  profileUsernameInput.value = profile.username || DEFAULT_PROFILE.username;
  profileUserIdInput.value = normalizeProfileUserId(
    profile.userId,
    profile.username || DEFAULT_PROFILE.username
  );
  profileFollowingInput.value = profile.following || DEFAULT_PROFILE.following;
  profileFollowersInput.value = profile.followers || DEFAULT_PROFILE.followers;
  profileSignatureInput.value = profile.signature || DEFAULT_PROFILE.signature;
  if (profilePersonaInput) {
    profilePersonaInput.value = profile.personaPrompt || DEFAULT_PROFILE.personaPrompt;
  }
}

function updateModeUI() {
  if (!modeSelect || !endpointInput || !modelInput || !modelWrap) {
    return;
  }
  const mode = normalizeApiMode(modeSelect.value);
  const needsModel = mode !== "generic";
  modelWrap.style.display = needsModel ? "grid" : "none";
  if (mode === "openai" && !endpointInput.value.trim()) {
    endpointInput.value = DEFAULT_OPENAI_ENDPOINT;
  }
  if (mode === "grok" && !endpointInput.value.trim()) {
    endpointInput.value = DEFAULT_GROK_ENDPOINT;
  }
  if (mode === "gemini" && !endpointInput.value.trim()) {
    endpointInput.value = DEFAULT_GEMINI_ENDPOINT;
  }
  if (needsModel && !modelInput.value.trim()) {
    modelInput.value = getDefaultModelByMode(mode);
  }
  if (mode === "gemini") {
    modelInput.placeholder = DEFAULT_GEMINI_MODEL;
  } else if (mode === "grok") {
    modelInput.placeholder = DEFAULT_GROK_MODEL;
  } else {
    modelInput.placeholder = DEFAULT_DEEPSEEK_MODEL;
  }
}

function getCurrentProfile() {
  return {
    avatar: profileAvatarInput.value.trim() || DEFAULT_PROFILE.avatar,
    username: profileUsernameInput.value.trim() || DEFAULT_PROFILE.username,
    userId: normalizeProfileUserId(
      profileUserIdInput.value.trim(),
      profileUsernameInput.value.trim() || DEFAULT_PROFILE.username
    ),
    avatarImage: state.profile.avatarImage || DEFAULT_PROFILE.avatarImage,
    bannerImage: state.profile.bannerImage || DEFAULT_PROFILE.bannerImage,
    following: profileFollowingInput.value.trim() || DEFAULT_PROFILE.following,
    followers: profileFollowersInput.value.trim() || DEFAULT_PROFILE.followers,
    signature: profileSignatureInput.value.trim() || DEFAULT_PROFILE.signature,
    personaPrompt:
      String(state.profile.personaPrompt || "").trim() || DEFAULT_PROFILE.personaPrompt
  };
}

function setProfileStatus(message, tone = "") {
  if (!profileStatusEl) {
    return;
  }
  profileStatusEl.textContent = message;
  profileStatusEl.className = "status-text";
  if (tone) {
    profileStatusEl.classList.add(tone);
  }
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

function saveCurrentProfile() {
  state.profile = getCurrentProfile();
  syncAuthoredPostIdentity(state.profile);
  persistProfile(state.profile);
  renderActiveFeed();
  renderProfilePage();
  renderThreadModal();
  updateReplyPromptPreview();
}

function setProfileEditorOpen(isOpen) {
  state.profileEditorOpen = isOpen;
  if (profileEditorCardEl) {
    profileEditorCardEl.classList.toggle("hidden", !isOpen);
  }
  if (profileEditToggleBtn) {
    profileEditToggleBtn.textContent = isOpen ? "收起编辑" : "编辑资料";
  }
}

function renderAvatarMarkup(label, className = "avatar", imageSrc = "") {
  if (imageSrc) {
    return `<div class="${escapeHtml(className)} ${escapeHtml(className)}--image"><img src="${escapeHtml(
      imageSrc
    )}" alt="" /></div>`;
  }
  return `<div class="${escapeHtml(className)}">${escapeHtml(label)}</div>`;
}

function renderEditedNote(post) {
  return post.edited ? '<p class="post-edited-note">（已编辑）</p>' : "";
}

function renderInlineMediaPreview(dataUrl, removeAction) {
  const imageSrc = String(dataUrl || "").trim();
  if (!imageSrc) {
    return "";
  }
  const removeButtonMarkup = removeAction
    ? `<button class="ghost-chip" type="button" data-action="${escapeHtml(removeAction)}">移除图片</button>`
    : "";
  return `
    <div class="composer-media-preview__card">
      <img class="composer-media-preview__image" src="${escapeHtml(imageSrc)}" alt="预览图片" />
      <div class="composer-media-preview__actions">
        ${removeButtonMarkup}
      </div>
    </div>
  `;
}

function renderComposerMediaPreview(containerEl, dataUrl, removeAction) {
  if (!containerEl) {
    return;
  }
  const imageSrc = String(dataUrl || "").trim();
  containerEl.classList.toggle("hidden", !imageSrc);
  containerEl.innerHTML = imageSrc ? renderInlineMediaPreview(imageSrc, removeAction) : "";
}

function getHomeComposerRepostSource() {
  return normalizeRepostSource(state.homeComposerRepostSource || null);
}

function isHomeComposerQuoteMode() {
  return Boolean(getHomeComposerRepostSource());
}

function renderHomeComposerQuotePreview() {
  if (!homeComposerQuotePreviewEl) {
    return;
  }
  const repostSource = getHomeComposerRepostSource();
  homeComposerQuotePreviewEl.classList.toggle("hidden", !repostSource);
  if (!repostSource) {
    homeComposerQuotePreviewEl.innerHTML = "";
    return;
  }
  homeComposerQuotePreviewEl.innerHTML = `
    <p class="composer-quote-preview__hint">这是一条引用转发：最终只会保留你的转发文字和被引用原帖，不会附带图片，也不会生成新的 Tag。</p>
    ${renderRepostSourceBlock(repostSource)}
    <div class="composer-media-preview__actions">
      <button class="ghost-chip" type="button" data-action="clear-home-composer-quote">取消引用</button>
    </div>
  `;
}

function syncHomeComposerModeUI() {
  const isQuoteMode = isHomeComposerQuoteMode();
  if (homeComposerCardEl) {
    homeComposerCardEl.classList.toggle("section-card--quote", isQuoteMode);
  }
  if (homeComposerKickerEl) {
    homeComposerKickerEl.textContent = isQuoteMode ? "Quote post" : "Composer";
  }
  if (homeComposerTitleEl) {
    homeComposerTitleEl.textContent = isQuoteMode ? "引用转发" : "新帖子";
  }
  if (homeComposerMetaEl) {
    const message = isQuoteMode
      ? "当前为引用转发模式：只编辑附带的转发文字；如果不想继续引用，可直接取消引用。"
      : "";
    homeComposerMetaEl.textContent = message;
    homeComposerMetaEl.classList.toggle("hidden", !message);
  }
  if (homeComposerInput) {
    homeComposerInput.placeholder = isQuoteMode
      ? "写下你想附带的转发文字（可留空）。"
      : "输入你想发送的新帖子内容，它会出现在个人主页，并可继续展开回复。";
  }
  if (homeComposerTagsFieldEl) {
    homeComposerTagsFieldEl.classList.toggle("hidden", isQuoteMode);
  }
  if (homeComposerImageFieldEl) {
    homeComposerImageFieldEl.classList.toggle("hidden", isQuoteMode);
  }
  if (homeComposerTagsInput) {
    homeComposerTagsInput.disabled = isQuoteMode;
    if (isQuoteMode) {
      homeComposerTagsInput.value = "";
    }
  }
  if (homeComposerImageInput) {
    homeComposerImageInput.disabled = isQuoteMode;
  }
  if (isQuoteMode && state.homeComposerImageDataUrl) {
    clearHomeComposerImage();
  }
  renderHomeComposerQuotePreview();
}

function clearHomeComposerImage() {
  state.homeComposerImageDataUrl = "";
  if (homeComposerImageInput) {
    homeComposerImageInput.value = "";
  }
  renderComposerMediaPreview(homeComposerImagePreviewEl, "", "remove-home-composer-image");
}

function clearHomeComposerRepostSource(options = {}) {
  state.homeComposerRepostSource = null;
  state.homeComposerRepostPostId = "";
  if (!options.preserveContent && homeComposerInput && !state.composerOpen) {
    homeComposerInput.value = "";
  }
  syncHomeComposerModeUI();
}

function parseDataUrlParts(dataUrl) {
  const source = String(dataUrl || "").trim();
  const matched = source.match(/^data:([^;]+);base64,(.+)$/);
  if (!matched) {
    return null;
  }
  return {
    mimeType: matched[1] || "image/png",
    data: matched[2] || ""
  };
}

function renderPostMedia(post) {
  const imageSrc = String(post?.imageDataUrl || post?.imageUrl || "").trim();
  if (!imageSrc) {
    return "";
  }
  return `
    <div class="post-media">
      <img class="post-media__image" src="${escapeHtml(imageSrc)}" alt="帖子图片" />
    </div>
  `;
}

function renderRepostSourceBlock(repostSource) {
  const source = normalizeRepostSource(repostSource);
  if (!source) {
    return "";
  }

  return `
    <section class="repost-card">
      <div class="repost-card__head">
        <strong>${escapeHtml(source.displayName)}</strong>
        <span class="post-handle">${escapeHtml(source.handle)}</span>
        ${source.time ? `<span class="post-time">· ${escapeHtml(source.time)}</span>` : ""}
      </div>
      ${source.text ? `<p class="repost-card__text">${escapeHtml(source.text)}</p>` : ""}
      ${
        source.imageDataUrl
          ? `
            <div class="repost-card__media">
              <img class="post-media__image" src="${escapeHtml(source.imageDataUrl)}" alt="转发原帖图片" />
            </div>
          `
          : ""
      }
      ${
        source.tags.length
          ? `<p class="repost-card__tags">${source.tags
              .map((tag) => `<span class="post-tag">${escapeHtml(tag)}</span>`)
              .join(" ")}</p>`
          : ""
      }
    </section>
  `;
}

function renderTranslationBlock(translationText, translatedTags = []) {
  const text = String(translationText || "").trim();
  const tags = normalizeTags(translatedTags, 5);
  if (!text && !tags.length) {
    return "";
  }
  return `
    <div class="translation-block">
      <p class="translation-divider">————————————————</p>
      ${text ? `<p class="translation-text">${escapeHtml(text)}</p>` : ""}
      ${tags.length ? `<p class="translation-tags">${escapeHtml(tags.join(" "))}</p>` : ""}
    </div>
  `;
}

function getPostTranslationKey(postId, bucketName = state.activeFeed) {
  return `${String(bucketName || "home")}::${String(postId || "")}`;
}

function getReplyTranslationKey(postId, replyId, bucketName = state.activeFeed) {
  return `${String(bucketName || "home")}::${String(postId || "")}::${String(replyId || "")}`;
}

function isPostTranslating(postId, bucketName = state.activeFeed) {
  return Boolean(state.translatingPosts[getPostTranslationKey(postId, bucketName)]);
}

function setPostTranslating(postId, bucketName = state.activeFeed, isLoading = false) {
  const key = getPostTranslationKey(postId, bucketName);
  if (isLoading) {
    state.translatingPosts[key] = true;
    return;
  }
  delete state.translatingPosts[key];
}

function isReplyTranslating(postId, replyId, bucketName = state.activeFeed) {
  return Boolean(state.translatingReplies[getReplyTranslationKey(postId, replyId, bucketName)]);
}

function setReplyTranslating(postId, replyId, bucketName = state.activeFeed, isLoading = false) {
  const key = getReplyTranslationKey(postId, replyId, bucketName);
  if (isLoading) {
    state.translatingReplies[key] = true;
    return;
  }
  delete state.translatingReplies[key];
}

function updatePostAcrossBuckets(postId, updater) {
  let hasUpdated = false;
  state.profilePosts = state.profilePosts.map((post) => {
    if (post.id !== postId) {
      return post;
    }
    hasUpdated = true;
    return updater({ ...post });
  });

  Object.keys(state.feeds).forEach((bucketName) => {
    state.feeds[bucketName] = (state.feeds[bucketName] || []).map((post) => {
      if (post.id !== postId) {
        return post;
      }
      hasUpdated = true;
      return updater({ ...post });
    });
  });

  if (!hasUpdated) {
    return false;
  }

  persistProfilePosts(state.profilePosts);
  persistFeeds(state.feeds);
  return true;
}

function syncPostAcrossViews(postId, updater) {
  let updatedPost = null;

  state.profilePosts = state.profilePosts.map((post) => {
    if (post.id !== postId) {
      return post;
    }
    updatedPost = updater({ ...post });
    return updatedPost;
  });

  Object.keys(state.feeds).forEach((bucketName) => {
    state.feeds[bucketName] = (state.feeds[bucketName] || []).map((post) => {
      if (post.id !== postId) {
        return post;
      }
      return updatedPost ? { ...updatedPost } : post;
    });
  });

  persistProfilePosts(state.profilePosts);
  persistFeeds(state.feeds);
  persistDiscussions();
}

function mapReplyTree(replies, updater) {
  if (!Array.isArray(replies)) {
    return [];
  }

  return replies.map((reply) => {
    const updatedReply = updater(reply);
    return {
      ...updatedReply,
      children: mapReplyTree(updatedReply.children || [], updater)
    };
  });
}

function syncAuthoredPostIdentity(profile) {
  const resolvedName = profile.username || DEFAULT_PROFILE.username;
  const resolvedHandle = normalizeProfileUserId(profile.userId, resolvedName);

  state.profilePosts = state.profilePosts.map((post) =>
    post.authorOwned
      ? {
          ...post,
          displayName: resolvedName,
          handle: resolvedHandle
        }
      : post
  );

  Object.keys(state.feeds).forEach((bucketName) => {
    state.feeds[bucketName] = (state.feeds[bucketName] || []).map((post) =>
      post.authorOwned
        ? {
            ...post,
            displayName: resolvedName,
            handle: resolvedHandle
          }
        : post
    );
  });

  Object.keys(state.discussions).forEach((bucketName) => {
    const bucket = state.discussions[bucketName] || {};
    Object.keys(bucket).forEach((postId) => {
      const threadState = bucket[postId];
      if (!threadState?.replies?.length) {
        return;
      }
      threadState.replies = mapReplyTree(threadState.replies, (reply) =>
        reply.authorOwned
          ? {
              ...reply,
              displayName: resolvedName,
              handle: resolvedHandle
            }
          : reply
      );
    });
  });

  persistProfilePosts(state.profilePosts);
  persistFeeds(state.feeds);
  persistDiscussions();
}

function removePostAcrossViews(postId) {
  state.profilePosts = state.profilePosts.filter((post) => post.id !== postId);
  Object.keys(state.feeds).forEach((bucketName) => {
    state.feeds[bucketName] = (state.feeds[bucketName] || []).filter(
      (post) => post.id !== postId
    );
    if (state.discussions[bucketName]) {
      delete state.discussions[bucketName][postId];
    }
  });
  persistProfilePosts(state.profilePosts);
  persistFeeds(state.feeds);
  persistDiscussions();
}

function clearPostTranslationLoadingState(postId = "") {
  const resolvedPostId = String(postId || "").trim();
  if (!resolvedPostId) {
    return;
  }
  Object.keys(state.translatingPosts).forEach((key) => {
    if (String(key || "").includes(`::${resolvedPostId}`)) {
      delete state.translatingPosts[key];
    }
  });
  Object.keys(state.translatingReplies).forEach((key) => {
    if (String(key || "").includes(`::${resolvedPostId}::`)) {
      delete state.translatingReplies[key];
    }
  });
}

function normalizeThreadStateForRender(threadState = null) {
  const source = threadState && typeof threadState === "object" ? threadState : {};
  return {
    expanded: Boolean(source.expanded),
    loading: Boolean(source.loading),
    replies: Array.isArray(source.replies) ? source.replies : []
  };
}

function clearCachedReplyTree(replies = []) {
  if (!Array.isArray(replies)) {
    return [];
  }
  return replies.reduce((list, reply) => {
    if (!reply || typeof reply !== "object") {
      return list;
    }
    const cleanedChildren = clearCachedReplyTree(reply.children || []);
    if (reply.authorOwned) {
      list.push({
        ...reply,
        translationZh: "",
        expanded: false,
        loading: false,
        children: cleanedChildren
      });
      return list;
    }
    if (cleanedChildren.length) {
      list.push(...cleanedChildren);
    }
    return list;
  }, []);
}

function clearCachedThreadState(threadState = null) {
  const normalized = normalizeThreadStateForRender(threadState);
  return {
    ...normalized,
    expanded: false,
    loading: false,
    replies: clearCachedReplyTree(normalized.replies)
  };
}

function removeReplyNodeFromTree(replies = [], replyId = "") {
  const resolvedReplyId = String(replyId || "").trim();
  const removedIds = [];
  let removed = false;

  function collectReplyIds(replyNode) {
    if (!replyNode || typeof replyNode !== "object") {
      return;
    }
    const currentId = String(replyNode.id || "").trim();
    if (currentId) {
      removedIds.push(currentId);
    }
    (Array.isArray(replyNode.children) ? replyNode.children : []).forEach((child) => {
      collectReplyIds(child);
    });
  }

  const nextReplies = (Array.isArray(replies) ? replies : []).reduce((list, reply) => {
    if (!reply || typeof reply !== "object") {
      return list;
    }
    if (String(reply.id || "").trim() === resolvedReplyId) {
      removed = true;
      collectReplyIds(reply);
      return list;
    }
    const childResult = removeReplyNodeFromTree(reply.children || [], resolvedReplyId);
    if (childResult.removed) {
      removed = true;
      removedIds.push(...childResult.removedIds);
      list.push({
        ...reply,
        children: childResult.replies
      });
      return list;
    }
    list.push(reply);
    return list;
  }, []);

  return {
    replies: nextReplies,
    removed,
    removedIds: [...new Set(removedIds.filter(Boolean))]
  };
}

function deleteForumPost(postId, bucketName = state.activeFeed) {
  const targetPost = findPostById(postId, bucketName);
  if (!targetPost) {
    setHomeStatus("未找到要删除的帖子。", "error");
    return;
  }
  const confirmed = window.confirm("确定要删除这条帖子吗？");
  if (!confirmed) {
    return;
  }
  removePostAcrossViews(postId);
  clearPostTranslationLoadingState(postId);
  if (state.homeComposerRepostPostId === String(postId || "").trim()) {
    clearHomeComposerRepostSource({ preserveContent: true });
  }
  if (state.threadModalPostId === String(postId || "").trim()) {
    setThreadShareModalOpen(false);
    setThreadModalOpen(false);
  }
  renderActiveFeed();
  renderProfilePage();
  updateReplyPromptPreview();
  setHomeStatus("帖子已删除。", "success");
}

function deleteForumReply(postId, replyId, bucketName = state.threadModalBucket || state.activeFeed) {
  const rootPost = findPostById(postId, bucketName);
  if (!rootPost) {
    setHomeStatus("未找到对应帖子。", "error");
    return;
  }
  const resolvedBucket = resolveThreadBucketName(bucketName, rootPost);
  const threadState = getPostThreadState(postId, resolvedBucket);
  if (!threadState?.replies?.length) {
    setHomeStatus("当前没有可删除的回复。", "error");
    return;
  }
  const confirmed = window.confirm("确定要删除这条回复吗？");
  if (!confirmed) {
    return;
  }
  const result = removeReplyNodeFromTree(threadState.replies, replyId);
  if (!result.removed) {
    setHomeStatus("未找到要删除的回复。", "error");
    return;
  }
  const nextThreadState = {
    ...normalizeThreadStateForRender(threadState),
    replies: result.replies,
    loading: false
  };
  getDiscussionBucket(resolvedBucket)[postId] = nextThreadState;
  syncDiscussionForAuthoredPost(rootPost, resolvedBucket, postId, nextThreadState);
  result.removedIds.forEach((removedId) => {
    setReplyTranslating(postId, removedId, resolvedBucket, false);
  });
  persistDiscussions();
  renderActiveFeed();
  renderProfilePage();
  if (
    state.threadModalOpen &&
    String(state.threadModalPostId || "").trim() === String(postId || "").trim()
  ) {
    renderThreadModal();
  }
  setHomeStatus("回复已删除。", "success");
}

function clearCustomTabGeneratedContent(tabId = "") {
  const resolvedTabId = String(tabId || "").trim();
  const tab = getCustomTab(resolvedTabId);
  if (!tab) {
    setCustomTabFormStatus("未找到对应页签。", "error");
    return;
  }
  const confirmed = window.confirm(
    `确定清空“${tab.name || "当前页签"}”下的 AI 缓存内容吗？这会删除 AI 生成的主贴、回复和翻译，但会保留用户自己发送的帖子。`
  );
  if (!confirmed) {
    return;
  }

  const currentFeedPosts = Array.isArray(state.feeds[resolvedTabId]) ? state.feeds[resolvedTabId] : [];
  const currentFeedPostIds = currentFeedPosts
    .map((post) => String(post?.id || "").trim())
    .filter(Boolean);
  const keptPosts = currentFeedPosts
    .filter((post) => Boolean(post?.authorOwned))
    .map((post) => ({
      ...post,
      translationZh: "",
      translatedTags: []
    }));
  const keptPostIds = new Set(keptPosts.map((post) => String(post.id || "").trim()).filter(Boolean));

  state.feeds[resolvedTabId] = keptPosts;
  state.profilePosts = state.profilePosts.map((post) => {
    if (Boolean(post?.authorOwned) && String(post.feedType || "").trim() === resolvedTabId) {
      return {
        ...post,
        translationZh: "",
        translatedTags: []
      };
    }
    return post;
  });

  const nextBucket = {};
  keptPosts.forEach((post) => {
    const postId = String(post.id || "").trim();
    if (!postId) {
      return;
    }
    const sourceThread =
      getDiscussionBucket(resolvedTabId)[postId] ||
      getDiscussionBucket("profile")[postId] ||
      null;
    const cleanedThreadState = clearCachedThreadState(sourceThread);
    nextBucket[postId] = cleanedThreadState;
    if (post.authorOwned) {
      state.discussions.profile[postId] = cleanedThreadState;
    }
  });
  state.discussions[resolvedTabId] = nextBucket;

  Object.keys(state.discussions.profile || {}).forEach((postId) => {
    const profilePost = state.profilePosts.find((post) => String(post.id || "").trim() === postId) || null;
    if (!profilePost || String(profilePost.feedType || "").trim() !== resolvedTabId) {
      return;
    }
    if (!keptPostIds.has(postId)) {
      delete state.discussions.profile[postId];
    }
  });

  currentFeedPostIds.forEach((postId) => {
    clearPostTranslationLoadingState(postId);
  });
  if (
    state.homeComposerRepostPostId &&
    currentFeedPostIds.includes(String(state.homeComposerRepostPostId || "").trim()) &&
    !keptPostIds.has(String(state.homeComposerRepostPostId || "").trim())
  ) {
    clearHomeComposerRepostSource({ preserveContent: true });
  }

  persistProfilePosts(state.profilePosts);
  persistFeeds(state.feeds);
  persistDiscussions();

  const currentModalPost = findPostById(state.threadModalPostId, state.threadModalBucket);
  if (
    state.threadModalOpen &&
    String(resolveThreadBucketName(state.threadModalBucket, currentModalPost || {})) === resolvedTabId
  ) {
    if (!currentModalPost) {
      setThreadShareModalOpen(false);
      setThreadModalOpen(false);
    } else {
      renderThreadModal();
    }
  }

  renderActiveFeed();
  renderProfilePage();
  updateReplyPromptPreview();
  setCustomTabFormStatus(`已清空“${tab.name || "当前页签"}”下的 AI 缓存内容。`, "success");
  setHomeStatus(`已清空“${tab.name || "当前页签"}”下的 AI 缓存内容。`, "success");
}

function getForumBackgroundPanelEntry(tabId = "") {
  const resolvedTabId = String(tabId || "").trim();
  if (!resolvedTabId) {
    return null;
  }
  if (!state.forumBackgroundByTab[resolvedTabId]) {
    state.forumBackgroundByTab[resolvedTabId] = {
      bundle: null,
      cards: [],
      counts: {},
      lastLoadedAt: 0
    };
  }
  return state.forumBackgroundByTab[resolvedTabId];
}

function setCustomTabBackgroundStatus(message, tone = "") {
  if (!customTabBackgroundStatusEl) {
    return;
  }
  customTabBackgroundStatusEl.textContent = message;
  customTabBackgroundStatusEl.className = "status-text";
  if (tone) {
    customTabBackgroundStatusEl.classList.add(tone);
  }
}

function formatForumBackgroundLayerLabel(value = "") {
  const labels = {
    history_base: "历史基底",
    recent_campaign: "近期主线",
    observable_timeline: "公开行程",
    tab_background: "页签背景",
    tab_background_history: "历史页签文本",
    hot_topic: "热点"
  };
  return labels[String(value || "").trim()] || String(value || "").trim() || "未知层";
}

function formatForumBackgroundTruthLabel(value = "") {
  const labels = {
    worldbook_fact: "世界书事实",
    tab_setting: "页签设定",
    community_viewpoint: "社区观点",
    community_speculation: "社区推测",
    interpretation_frame: "解释框架",
    discussion_structure: "讨论结构"
  };
  return labels[String(value || "").trim()] || String(value || "").trim() || "未知类型";
}

function formatForumBackgroundStatusLabel(value = "") {
  const labels = {
    candidate: "待审核",
    approved: "已确认",
    stable: "稳定卡",
    archived: "已归档",
    worldbook_candidate: "世界书候选"
  };
  return labels[String(value || "").trim()] || String(value || "").trim() || "未知状态";
}

function formatForumBackgroundSegmentLabel(value = "") {
  const labels = {
    forum_context: "论坛环境",
    recent_campaign: "近期主线",
    observable_timeline: "公开行程",
    discussion_archive: "历史页签文本",
    history_base: "历史基底"
  };
  return labels[String(value || "").trim()] || String(value || "").trim() || "未分段";
}

function formatForumBackgroundRunStatusLabel(value = "") {
  const labels = {
    dirty: "待重跑",
    pending_submission: "待提交",
    completed: "已完成",
    failed: "失败"
  };
  return labels[String(value || "").trim()] || String(value || "").trim() || "未知状态";
}

function formatForumBackgroundExtractionStepStatusLabel(value = "") {
  const labels = {
    pending: "待执行",
    running: "进行中",
    completed: "已完成",
    failed: "失败"
  };
  return labels[String(value || "").trim()] || String(value || "").trim() || "未知状态";
}

function buildForumBackgroundSegmentBundle(bundle = {}, segment = null) {
  const baseBundle = bundle && typeof bundle === "object" ? bundle : {};
  const resolvedSegment = segment && typeof segment === "object" ? segment : null;
  if (!resolvedSegment) {
    return {
      tab: baseBundle.tab || {},
      summaryApiEnabled: Boolean(baseBundle.summaryApiEnabled),
      summaryApiConfigId: String(baseBundle.summaryApiConfigId || "").trim(),
      segmentKey: "",
      segmentLabel: "",
      maxCards: 18,
      sources: Array.isArray(baseBundle.sources) ? baseBundle.sources : [],
      bundleHash: String(baseBundle.bundleHash || "").trim()
    };
  }
  return {
    tab: baseBundle.tab || {},
    summaryApiEnabled: Boolean(baseBundle.summaryApiEnabled),
    summaryApiConfigId: String(baseBundle.summaryApiConfigId || "").trim(),
    segmentKey: String(resolvedSegment.segmentKey || "").trim(),
    segmentLabel:
      String(resolvedSegment.segmentLabel || "").trim() ||
      formatForumBackgroundSegmentLabel(resolvedSegment.segmentKey),
    maxCards: Math.min(18, Math.max(1, Number(resolvedSegment.maxCards) || 8)),
    sources: Array.isArray(resolvedSegment.sources) ? resolvedSegment.sources : [],
    bundleHash: String(resolvedSegment.bundleHash || baseBundle.bundleHash || "").trim(),
    latestRun: resolvedSegment.latestRun || null,
    needsExtraction: Boolean(resolvedSegment.needsExtraction)
  };
}

function selectForumBackgroundSegmentsForExtraction(bundle = {}, options = {}) {
  const segmentKeyFilter = new Set(
    (Array.isArray(options?.segmentKeys) ? options.segmentKeys : [])
      .map((item) => String(item || "").trim())
      .filter(Boolean)
  );
  const segments = Array.isArray(bundle?.segments)
    ? bundle.segments.filter(
        (segment) => segment && Array.isArray(segment.sources) && segment.sources.length
      )
    : [];
  if (!segments.length) {
    return [buildForumBackgroundSegmentBundle(bundle, null)];
  }
  const dirtyOrMissingSegments = segments.filter((segment) => {
    const latestRun = segment?.latestRun || null;
    return (
      Boolean(segment?.needsExtraction) ||
      !latestRun ||
      String(latestRun.status || "").trim() !== "completed"
    );
  });
  const targetSegments = dirtyOrMissingSegments.length ? dirtyOrMissingSegments : segments;
  return targetSegments
    .filter(
      (segment) =>
        !segmentKeyFilter.size || segmentKeyFilter.has(String(segment?.segmentKey || "").trim())
    )
    .map((segment) => buildForumBackgroundSegmentBundle(bundle, segment))
    .filter((segmentBundle) => Array.isArray(segmentBundle.sources) && segmentBundle.sources.length);
}

function renderForumBackgroundCardActions(card = {}) {
  const cardId = String(card.id || "").trim();
  if (!cardId) {
    return "";
  }
  if (card.status === "candidate") {
    return `
      <button class="ghost-chip" type="button" data-action="forum-background-card-status" data-card-id="${escapeHtml(
        cardId
      )}" data-next-status="approved">确认</button>
      <button class="ghost-chip" type="button" data-action="forum-background-card-status" data-card-id="${escapeHtml(
        cardId
      )}" data-next-status="worldbook_candidate">标世界书候选</button>
      <button class="ghost-chip ghost-chip--danger" type="button" data-action="forum-background-card-status" data-card-id="${escapeHtml(
        cardId
      )}" data-next-status="archived">归档</button>
    `;
  }
  if (card.status === "approved") {
    return `
      <button class="ghost-chip" type="button" data-action="forum-background-card-status" data-card-id="${escapeHtml(
        cardId
      )}" data-next-status="stable">设为稳定卡</button>
      <button class="ghost-chip" type="button" data-action="forum-background-card-status" data-card-id="${escapeHtml(
        cardId
      )}" data-next-status="worldbook_candidate">标世界书候选</button>
      <button class="ghost-chip ghost-chip--danger" type="button" data-action="forum-background-card-status" data-card-id="${escapeHtml(
        cardId
      )}" data-next-status="archived">归档</button>
    `;
  }
  if (card.status === "stable") {
    return `
      <button class="ghost-chip" type="button" data-action="forum-background-card-status" data-card-id="${escapeHtml(
        cardId
      )}" data-next-status="worldbook_candidate">标世界书候选</button>
      <button class="ghost-chip ghost-chip--danger" type="button" data-action="forum-background-card-status" data-card-id="${escapeHtml(
        cardId
      )}" data-next-status="archived">归档</button>
    `;
  }
  if (card.status === "worldbook_candidate") {
    return `
      <button class="ghost-chip" type="button" data-action="forum-background-card-status" data-card-id="${escapeHtml(
        cardId
      )}" data-next-status="approved">恢复已确认</button>
      <button class="ghost-chip ghost-chip--danger" type="button" data-action="forum-background-card-status" data-card-id="${escapeHtml(
        cardId
      )}" data-next-status="archived">归档</button>
    `;
  }
  return `
    <button class="ghost-chip" type="button" data-action="forum-background-card-status" data-card-id="${escapeHtml(
      cardId
    )}" data-next-status="approved">恢复已确认</button>
  `;
}

function renderCustomTabBackgroundProgress(tabId = "") {
  if (
    !customTabBackgroundProgressEl ||
    !customTabBackgroundProgressBarEl ||
    !customTabBackgroundProgressLabelEl ||
    !customTabBackgroundProgressListEl
  ) {
    return;
  }
  const resolvedTabId = String(tabId || "").trim();
  const progress = state.forumBackgroundExtractionProgress;
  if (
    !resolvedTabId ||
    !progress ||
    String(progress.tabId || "").trim() !== resolvedTabId ||
    !Array.isArray(progress.segments) ||
    !progress.segments.length
  ) {
    customTabBackgroundProgressEl.classList.add("hidden");
    customTabBackgroundProgressLabelEl.textContent = "";
    customTabBackgroundProgressBarEl.style.width = "0%";
    customTabBackgroundProgressListEl.innerHTML = "";
    return;
  }

  const segments = progress.segments;
  const finishedCount = segments.filter(
    (segment) => segment?.status === "completed" || segment?.status === "failed"
  ).length;
  const failedCount = segments.filter((segment) => segment?.status === "failed").length;
  const runningSegment = segments.find((segment) => segment?.status === "running") || null;
  const percent = segments.length ? Math.round((finishedCount / segments.length) * 100) : 0;
  const labelParts = [`${finishedCount} / ${segments.length}`];
  if (runningSegment?.label) {
    labelParts.push(`正在处理 ${runningSegment.label}`);
  } else if (failedCount) {
    labelParts.push(`${failedCount} 段失败`);
  } else if (finishedCount === segments.length) {
    labelParts.push("已完成");
  }

  customTabBackgroundProgressEl.classList.remove("hidden");
  customTabBackgroundProgressLabelEl.textContent = labelParts.join(" · ");
  customTabBackgroundProgressBarEl.style.width = `${percent}%`;
  customTabBackgroundProgressListEl.innerHTML = segments
    .map((segment) => {
      const label = String(segment?.label || "").trim() || "未命名分段";
      const status = formatForumBackgroundExtractionStepStatusLabel(segment?.status);
      const note = String(segment?.note || "").trim();
      const tone =
        segment?.status === "completed"
          ? "success"
          : segment?.status === "failed"
            ? "error"
            : "";
      return `<p class="${tone ? `status-text ${tone}` : "tag-stat-meta"}" style="margin:0;">${escapeHtml(
        `${label}：${status}${note ? ` · ${note}` : ""}`
      )}</p>`;
    })
    .join("");
}

function renderCustomTabBackgroundPanel(tab = null) {
  if (
    !customTabBackgroundListEl ||
    !customTabBackgroundMetaEl ||
    !customTabBackgroundExtractBtn ||
    !customTabBackgroundRefreshBtn ||
    !customTabBackgroundHistoryExtractBtn
  ) {
    return;
  }
  const editingTab =
    tab && typeof tab === "object" && tab.id
      ? getCustomTab(tab.id) || tab
      : state.customTabEditingId
        ? getCustomTab(state.customTabEditingId)
        : null;
  const resolvedTabId = String(editingTab?.id || "").trim();
  const cached = resolvedTabId ? getForumBackgroundPanelEntry(resolvedTabId) : null;
  const hasSavedTab = Boolean(resolvedTabId && getCustomTab(resolvedTabId));
  const isBusy = state.forumBackgroundPanelLoading || state.forumBackgroundPanelExtracting;
  renderCustomTabBackgroundProgress(resolvedTabId);
  customTabBackgroundExtractBtn.disabled = !hasSavedTab || isBusy;
  customTabBackgroundRefreshBtn.disabled = !hasSavedTab || isBusy;
  customTabBackgroundHistoryExtractBtn.disabled = !hasSavedTab || isBusy;

  if (!hasSavedTab) {
    customTabBackgroundMetaEl.textContent =
      "先保存页签，再基于后端已保存的页签文本、热点和世界书来源做背景卡拆解。";
    customTabBackgroundListEl.innerHTML =
      '<p class="empty-state">当前是新增态，背景卡功能只对已保存页签开放。</p>';
    return;
  }

  const counts = cached?.counts || {};
  const latestRun = cached?.bundle?.latestRun || null;
  const segments = Array.isArray(cached?.bundle?.segments) ? cached.bundle.segments : [];
  const metaParts = [
    `当前页签：${editingTab?.name || "自定义页签"}`,
    `候选 ${counts.candidate || 0} / 已确认 ${counts.approved || 0} / 稳定 ${counts.stable || 0} / 归档 ${counts.archived || 0}`,
    `待历史提炼 ${cached?.bundle?.tab?.counts?.pendingHistorical || 0}`
  ];
  if (segments.length) {
    metaParts.push(
      segments
        .map((segment) => {
          const segmentLabel =
            String(segment?.segmentLabel || "").trim() ||
            formatForumBackgroundSegmentLabel(segment?.segmentKey);
          const runStatus =
            segment?.latestRun?.status || (segment?.needsExtraction ? "dirty" : "");
          return `${segmentLabel} ${formatForumBackgroundRunStatusLabel(runStatus)}`.trim();
        })
        .filter(Boolean)
        .join(" / ")
    );
  } else if (latestRun?.status === "dirty") {
    metaParts.push("后台检测到当前热点对应的拆卡任务是 dirty，可重跑拆卡。");
  }
  if (cached?.bundle?.summaryApiEnabled === false) {
    metaParts.push("服务端未启用总结预设 API，前端拆卡会回退当前激活配置。");
  }
  customTabBackgroundMetaEl.textContent = metaParts.join(" · ");

  if (state.forumBackgroundPanelLoading && !cached?.cards?.length) {
    customTabBackgroundListEl.innerHTML = '<p class="empty-state">正在读取背景卡与来源状态…</p>';
    return;
  }

  const cards = Array.isArray(cached?.cards) ? cached.cards : [];
  if (!cards.length) {
    customTabBackgroundListEl.innerHTML =
      '<p class="empty-state">还没有背景卡。可先点击“提取背景卡”，再在这里确认候选卡。</p>';
    return;
  }

  customTabBackgroundListEl.innerHTML = cards
    .map((card) => {
      const roles = Array.isArray(card.suitableRoles) ? card.suitableRoles.slice(0, 4).join("、") : "";
      const meta = [
        formatForumBackgroundStatusLabel(card.status),
        formatForumBackgroundLayerLabel(card.sourceLayer),
        formatForumBackgroundTruthLabel(card.truthLevel),
        card.knowledgeDomain || ""
      ]
        .filter(Boolean)
        .join("｜");
      const excerpt = truncate(card.sourceExcerpt || "", 88);
      const detail = truncate(card.detailText || "", 140);
      return `
        <article class="custom-tab-item" data-card-id="${escapeHtml(card.id || "")}">
          <div>
            <strong>${escapeHtml(card.summary || "未命名背景卡")}</strong>
            <p class="tag-stat-meta">${escapeHtml(meta)}</p>
            ${roles ? `<p class="tag-stat-meta">适用角色：${escapeHtml(roles)}</p>` : ""}
            ${detail ? `<p class="tag-stat-meta">${escapeHtml(detail)}</p>` : ""}
            ${excerpt ? `<p class="tag-stat-meta">来源片段：${escapeHtml(excerpt)}</p>` : ""}
          </div>
          <div class="custom-tab-item__actions">
            ${renderForumBackgroundCardActions(card)}
          </div>
        </article>
      `;
    })
    .join("");
}

async function loadForumBackgroundPanelData(tabId = "", options = {}) {
  const resolvedTabId = String(tabId || "").trim();
  if (!resolvedTabId) {
    return null;
  }
  const requestOptions = options && typeof options === "object" ? options : {};
  const entry = getForumBackgroundPanelEntry(resolvedTabId);
  if (
    !requestOptions.force &&
    entry?.lastLoadedAt &&
    Date.now() - entry.lastLoadedAt < 20_000 &&
    (entry.bundle || entry.cards.length)
  ) {
    return entry;
  }
  state.forumBackgroundPanelLoading = true;
  renderCustomTabBackgroundPanel(getCustomTab(resolvedTabId));
  try {
    const query = new URLSearchParams({
      tabId: resolvedTabId,
      status: "candidate,approved,stable,archived,worldbook_candidate"
    });
    const [bundlePayload, cardsPayload] = await Promise.all([
      requestDiscussionStorageApi(`/api/forum/background/source-bundle?tabId=${encodeURIComponent(resolvedTabId)}`),
      requestDiscussionStorageApi(`/api/forum/background/cards?${query.toString()}`)
    ]);
    entry.bundle = {
      ...bundlePayload,
      summaryApiEnabled: Boolean(bundlePayload.summaryApiEnabled),
      summaryApiConfigId: String(bundlePayload.summaryApiConfigId || "").trim()
    };
    entry.cards = Array.isArray(cardsPayload.cards) ? cardsPayload.cards : [];
    entry.counts = cardsPayload.counts && typeof cardsPayload.counts === "object" ? cardsPayload.counts : {};
    entry.lastLoadedAt = Date.now();
    return entry;
  } finally {
    state.forumBackgroundPanelLoading = false;
    renderCustomTabBackgroundPanel(getCustomTab(resolvedTabId));
  }
}

function buildForumBackgroundExtractionSystemPrompt(bundle = {}) {
  const tabName = String(bundle?.tab?.name || "当前论坛页签").trim();
  const segmentLabel = String(bundle?.segmentLabel || "").trim();
  return [
    `你是“${tabName}”论坛的背景卡候选拆解器。`,
    segmentLabel ? `当前拆解分段：${segmentLabel}。` : "",
    "你的任务不是写摘要，而是把来源拆成可供后端审核的候选背景卡。",
    "你只能做候选提炼，不能裁定世界观真相。",
    "必须保留来源层级、原文片段、真实性等级、知识域和适用角色。",
    "禁止把粉丝推测写成事实。",
    "禁止把部分观点写成全体共识。",
    "禁止输出唯一结论。",
    "热点来源只允许拆成推理卡、争议卡或讨论结构卡，不要硬写成事实卡。",
    segmentLabel && String(bundle?.segmentKey || "").trim() !== "forum_context"
      ? "本轮只处理当前分段提供的来源，不要主动综合未提供的其他世界书、热点或页签长文。"
      : "",
    "如果同一条信息可以拆成多种视角，请拆成多张卡，而不是糊成一段总述。"
  ]
    .filter(Boolean)
    .join("\n");
}

function buildForumBackgroundExtractionUserPrompt(bundle = {}) {
  const tab = bundle?.tab || {};
  const segmentKey = String(bundle?.segmentKey || "").trim();
  const segmentLabel = String(bundle?.segmentLabel || "").trim();
  const includeFullForumContext = !segmentKey || segmentKey === "forum_context";
  const maxCards = Math.min(18, Math.max(1, Number(bundle?.maxCards) || 18));
  const sources = Array.isArray(bundle?.sources) ? bundle.sources : [];
  const sourceBlocks = sources.length
    ? sources
        .map((source, index) =>
          [
            `来源 ${index + 1}`,
            `- source_type: ${source.sourceType || ""}`,
            `- source_id: ${source.sourceId || ""}`,
            `- source_title: ${source.sourceTitle || ""}`,
            `- source_layer: ${source.sourceLayer || ""}`,
            source.knowledgeDomains?.length
              ? `- 建议知识域: ${source.knowledgeDomains.join(", ")}`
              : "",
            "- 正文：",
            source.content || "（空）"
          ]
            .filter(Boolean)
            .join("\n")
        )
        .join("\n\n")
    : "当前没有可拆分的来源。";
  return [
    `页签名称：${tab.name || ""}`,
    includeFullForumContext ? `页签长期文本：${tab.discussionText || ""}` : "",
    includeFullForumContext ? `页签当前热点：${tab.hotTopic || ""}` : "",
    segmentLabel ? `当前拆卡分段：${segmentLabel}` : "",
    !includeFullForumContext ? "本轮为分段拆卡，只处理下面给出的来源，不要主动补入其他来源信息。" : "",
    "",
    "请基于以上分层来源输出候选背景卡，并满足这些规则：",
    "1. 只输出 JSON 对象，顶层为 {\"items\":[...]}。",
    "2. 每张卡必须给出 source_type, source_id, source_layer, source_excerpt, truth_level, knowledge_domain, summary, detail_text, suitable_roles, reason_note。",
    "3. truth_level 只能使用：worldbook_fact / tab_setting / community_viewpoint / community_speculation / interpretation_frame / discussion_structure。",
    "4. suitable_roles 请优先使用：newcomer / old_guard / schedule_tracker / career_fan / cp_digger / worldbook_seed / fact_checker。",
    "5. worldbook_fact 只能来自世界书或明确的公开事实来源；热点里的争议和粉丝判断不要写成 worldbook_fact。",
    "6. 如果一个点只适合让老角色知道，就不要把 newcomer 塞进去。",
    "7. detail_text 要写成后端可直接给模型的完整背景说明，不要只是重复 summary。",
    `8. 最多输出 ${maxCards} 张卡，宁缺毋滥。`,
    "",
    "可拆来源如下：",
    sourceBlocks
  ]
    .filter(Boolean)
    .join("\n");
}

async function requestForumBackgroundExtractionForBundle(
  resolvedTabId = "",
  bundle = {},
  apiSettings = {},
  options = {}
) {
  const requestEndpoint = validateApiSettings(apiSettings, "背景卡拆解");
  const structuredOutputContext = createStructuredOutputContext(
    apiSettings,
    "forum_background_extract_v1"
  );
  const runPayload = await requestDiscussionStorageApi("/api/forum/background/extraction-runs", {
    method: "POST",
    body: JSON.stringify({
      tabId: resolvedTabId,
      triggerReason:
        String(options.triggerReason || "").trim() || "manual_editor_extract",
      segmentKey: bundle.segmentKey || "",
      segmentLabel: bundle.segmentLabel || "",
      sourceBundle: bundle,
      sourceBundleHash: bundle.bundleHash || ""
    })
  });
  const systemPrompt = buildForumBackgroundExtractionSystemPrompt(bundle);
  const userInstruction = appendStructuredOutputPromptHint(
    buildForumBackgroundExtractionUserPrompt(bundle),
    structuredOutputContext
  );
  const privacySession = createPrivacySession({
    settings: apiSettings,
    profile: getCurrentProfile(),
    sourceBundle: bundle,
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
      "forum_background_extract"
    ),
    structuredOutputContext
  );
  const logBase = applyPrivacyToLogEntry(
    buildDiscussionApiLogBase(
      "forum_background_extract",
      apiSettings,
      requestEndpoint,
      [encodedSystemPrompt, encodedUserInstruction].join("\n\n"),
      requestBody,
      `页签：${bundle.tab?.name || resolvedTabId} · 分段：${
        bundle.segmentLabel || "全量来源"
      } · 来源 ${Array.isArray(bundle.sources) ? bundle.sources.length : 0} 条`
    ),
    privacySession
  );
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
      errorMessage: `背景卡拆解请求失败：HTTP ${response.status}`
    });
    throw new Error(`背景卡拆解请求失败：HTTP ${response.status}`);
  }
  let repairResult = null;
  let structuredPayload = parseStructuredOutputPayload(payload, structuredOutputContext);
  if (structuredOutputContext.enabled && !structuredPayload) {
    repairResult = await requestStructuredRepairOnce(
      apiSettings,
      requestEndpoint,
      structuredOutputContext,
      rawResponse,
      "forum_background_extract_repair"
    );
    if (repairResult?.ok) {
      structuredPayload = repairResult.structuredPayload;
    }
    if (!structuredPayload) {
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
        errorMessage: "背景卡拆解返回了不可解析的结构化内容。"
      });
      throw new Error("背景卡拆解返回了不可解析的结构化内容。");
    }
  }
  let extractedPayload =
    structuredPayload || parseStructuredOutputPayload(payload, structuredOutputContext) || null;
  if (!extractedPayload) {
    const rawObjectText =
      extractJsonObject(typeof payload === "string" ? payload : resolveMessage(payload || "")) ||
      extractJsonObject(rawResponse);
    if (rawObjectText) {
      try {
        extractedPayload = parseJsonObjectWithRepair(
          rawObjectText,
          "背景卡拆解 JSON 解析失败。"
        );
      } catch (_error) {
      }
    }
  }
  const items = Array.isArray(extractedPayload?.items) ? extractedPayload.items : [];
  const mergePayload = await requestDiscussionStorageApi(
    `/api/forum/background/extraction-runs/${encodeURIComponent(runPayload.run?.id || "")}/candidates`,
    {
      method: "POST",
      body: JSON.stringify({
        tabId: resolvedTabId,
        items,
        allowEmpty: !items.length
      })
    }
  );
  appendApiLog({
    ...logBase,
    ...buildGeminiLogFields(apiSettings, repairResult?.payload || payload),
    status: "success",
    statusCode: response.status,
    responseText: repairResult?.rawResponseText || rawResponse,
    responseBody: repairResult?.payload || payload,
    summary: encodeTextWithPrivacy(
      `页签：${bundle.tab?.name || resolvedTabId} · 分段：${
        bundle.segmentLabel || "全量来源"
      } · 已提交 ${items.length} 张候选背景卡`,
      privacySession
    )
  });
  return {
    ...mergePayload,
    segmentKey: bundle.segmentKey || "",
    segmentLabel: bundle.segmentLabel || "",
    emptyResult: !items.length
  };
}

async function requestForumBackgroundExtraction(tabId = "", options = {}) {
  const resolvedTabId = String(tabId || "").trim();
  if (!resolvedTabId) {
    return null;
  }
  const segmentKeys = Array.isArray(options.segmentKeys)
    ? options.segmentKeys.map((item) => String(item || "").trim()).filter(Boolean)
    : [];
  state.forumBackgroundPanelExtracting = true;
  state.forumBackgroundExtractionProgress = null;
  setCustomTabBackgroundStatus("正在读取来源包并按分段调用总结预设 API 做候选拆卡…", "");
  renderCustomTabBackgroundPanel(getCustomTab(resolvedTabId));
  try {
    const panelData =
      (await loadForumBackgroundPanelData(resolvedTabId, { force: true })) ||
      getForumBackgroundPanelEntry(resolvedTabId);
    const bundle = panelData?.bundle || null;
    if (!bundle?.tab?.id) {
      throw new Error("当前页签还没有可用的后端来源包。");
    }
    if (!Array.isArray(bundle.sources) || !bundle.sources.length) {
      throw new Error("当前页签还没有配置可拆分的背景来源策略。");
    }
    const segmentBundles = selectForumBackgroundSegmentsForExtraction(bundle, {
      segmentKeys
    });
    if (!segmentBundles.length) {
      const emptyMessage =
        String(options.emptyMessage || "").trim() || "当前没有待处理的来源分段。";
      setCustomTabBackgroundStatus(emptyMessage, "success");
      return {
        ok: true,
        noOp: true,
        segmentCount: 0,
        results: [],
        runs: [],
        summary: {
          requestedCount: 0,
          createdCount: 0,
          reinforcedCount: 0
        }
      };
    }
    state.forumBackgroundExtractionProgress = {
      tabId: resolvedTabId,
      segments: segmentBundles.map((segmentBundle, index) => ({
        key: segmentBundle.segmentKey || `segment-${index + 1}`,
        label:
          String(segmentBundle.segmentLabel || "").trim() ||
          formatForumBackgroundSegmentLabel(segmentBundle.segmentKey),
        status: "pending",
        note: ""
      }))
    };
    renderCustomTabBackgroundPanel(getCustomTab(resolvedTabId));
    const currentSettings = buildNormalizedSettingsSnapshot(getCurrentSettings());
    const usingSummaryPreset = Boolean(
      currentSettings.summaryApiEnabled && currentSettings.summaryApiConfigId
    );
    const apiSettings = resolveDedicatedApiSettings(
      currentSettings,
      "summaryApiEnabled",
      "summaryApiConfigId"
    );
    const aggregate = {
      ok: true,
      segmentCount: segmentBundles.length,
      results: [],
      runs: [],
      summary: {
        requestedCount: 0,
        createdCount: 0,
        reinforcedCount: 0
      }
    };
    for (const [index, segmentBundle] of segmentBundles.entries()) {
      if (
        state.forumBackgroundExtractionProgress?.tabId === resolvedTabId &&
        state.forumBackgroundExtractionProgress.segments[index]
      ) {
        state.forumBackgroundExtractionProgress.segments[index].status = "running";
        state.forumBackgroundExtractionProgress.segments[index].note = "";
      }
      setCustomTabBackgroundStatus(
        `正在拆解 ${segmentBundle.segmentLabel || "背景卡"}（${index + 1}/${segmentBundles.length}）…`,
        ""
      );
      renderCustomTabBackgroundPanel(getCustomTab(resolvedTabId));
      let mergePayload = null;
      try {
        mergePayload = await requestForumBackgroundExtractionForBundle(
          resolvedTabId,
          segmentBundle,
          apiSettings,
          options
        );
      } catch (error) {
        if (
          state.forumBackgroundExtractionProgress?.tabId === resolvedTabId &&
          state.forumBackgroundExtractionProgress.segments[index]
        ) {
          state.forumBackgroundExtractionProgress.segments[index].status = "failed";
          state.forumBackgroundExtractionProgress.segments[index].note =
            error?.message || "请求失败";
        }
        throw error;
      }
      if (
        state.forumBackgroundExtractionProgress?.tabId === resolvedTabId &&
        state.forumBackgroundExtractionProgress.segments[index]
      ) {
        const createdCount = Number(mergePayload.summary?.createdCount) || 0;
        const reinforcedCount = Number(mergePayload.summary?.reinforcedCount) || 0;
        const noteParts = [];
        if (createdCount) {
          noteParts.push(`新建 ${createdCount}`);
        }
        if (reinforcedCount) {
          noteParts.push(`强化 ${reinforcedCount}`);
        }
        if (!noteParts.length && mergePayload.emptyResult) {
          noteParts.push("无新增候选");
        }
        state.forumBackgroundExtractionProgress.segments[index].status = "completed";
        state.forumBackgroundExtractionProgress.segments[index].note = noteParts.join("，");
      }
      renderCustomTabBackgroundPanel(getCustomTab(resolvedTabId));
      aggregate.results.push(...(Array.isArray(mergePayload.results) ? mergePayload.results : []));
      if (mergePayload.run) {
        aggregate.runs.push(mergePayload.run);
      }
      aggregate.summary.requestedCount += Number(mergePayload.summary?.requestedCount) || 0;
      aggregate.summary.createdCount += Number(mergePayload.summary?.createdCount) || 0;
      aggregate.summary.reinforcedCount += Number(mergePayload.summary?.reinforcedCount) || 0;
    }
    await loadForumBackgroundPanelData(resolvedTabId, { force: true });
    const fallbackNotice = usingSummaryPreset
      ? ""
      : " 当前未启用总结预设 API，已回退到当前激活配置。";
    setCustomTabBackgroundStatus(
      `已完成 ${segmentBundles.length} 个分段拆卡（新建 ${aggregate.summary.createdCount || 0}，强化 ${
        aggregate.summary.reinforcedCount || 0
      }）。${fallbackNotice}`.trim(),
      "success"
    );
    return aggregate;
  } catch (error) {
    setCustomTabBackgroundStatus(`背景卡提取失败：${error?.message || "请求失败"}`, "error");
    throw error;
  } finally {
    state.forumBackgroundPanelExtracting = false;
    renderCustomTabBackgroundPanel(getCustomTab(resolvedTabId));
  }
}

async function updateForumBackgroundCardStatus(cardId = "", nextStatus = "") {
  const resolvedCardId = String(cardId || "").trim();
  const resolvedStatus = String(nextStatus || "").trim();
  if (!resolvedCardId || !resolvedStatus) {
    return null;
  }
  const tabId = String(state.customTabEditingId || "").trim();
  const payload = await requestDiscussionStorageApi(
    `/api/forum/background/cards/${encodeURIComponent(resolvedCardId)}`,
    {
      method: "PATCH",
      body: JSON.stringify({
        status: resolvedStatus,
        actorType: "frontend"
      })
    }
  );
  if (tabId) {
    await loadForumBackgroundPanelData(tabId, { force: true });
  }
  setCustomTabBackgroundStatus(
    `背景卡已更新为“${formatForumBackgroundStatusLabel(resolvedStatus)}”。`,
    "success"
  );
  return payload;
}

async function requestForumGenerationContext(tabId = "", payload = {}) {
  const resolvedTabId = String(tabId || "").trim();
  if (!resolvedTabId) {
    return null;
  }
  try {
    return await requestDiscussionStorageApi("/api/forum/generation-context", {
      method: "POST",
      body: JSON.stringify({
        tabId: resolvedTabId,
        ...payload
      })
    });
  } catch (error) {
    console.warn("[discussion] failed to load forum generation context", error);
    return null;
  }
}

function getForumBatchTaskFromGenerationContext(generationContext = null, itemIndex = -1) {
  const batchTasks = Array.isArray(generationContext?.batchTasks)
    ? generationContext.batchTasks
    : Array.isArray(generationContext?.generationBatches)
      ? generationContext.generationBatches.flatMap((batch) =>
          Array.isArray(batch?.tasks) ? batch.tasks : []
        )
      : [];
  return Number.isInteger(itemIndex) && itemIndex >= 0 ? batchTasks[itemIndex] || null : null;
}

function findForumPersonaFromGenerationContext(postLike = {}, generationContext = null, itemIndex = -1) {
  const batchTask = getForumBatchTaskFromGenerationContext(generationContext, itemIndex);
  if (batchTask?.persona) {
    return batchTask.persona;
  }
  const personaSlots = Array.isArray(generationContext?.personaSlots) ? generationContext.personaSlots : [];
  const slotPersona = Number.isInteger(itemIndex) && itemIndex >= 0 ? personaSlots[itemIndex] : null;
  if (slotPersona) {
    return slotPersona;
  }
  const personaPool = Array.isArray(generationContext?.personaPool) ? generationContext.personaPool : [];
  const displayName = String(postLike?.displayName || "").trim().toLowerCase();
  const handle = String(postLike?.handle || "").trim().toLowerCase();
  return (
    personaPool.find(
      (persona) =>
        String(persona?.displayName || "").trim().toLowerCase() === displayName ||
        String(persona?.handle || "").trim().toLowerCase() === handle
    ) || generationContext?.selectedPersona || null
  );
}

function attachForumGenerationMetadata(item = {}, generationContext = null, kind = "post", itemIndex = -1) {
  if (!generationContext || typeof generationContext !== "object") {
    return item;
  }
  const persona = findForumPersonaFromGenerationContext(item, generationContext, itemIndex);
  const batchTask = getForumBatchTaskFromGenerationContext(generationContext, itemIndex);
  const selectedItem = batchTask?.mainSource || generationContext?.selectedItem || null;
  const selectedStanceTask = batchTask?.stanceTask || generationContext?.selectedStanceTask || null;
  const selectedReplyMode = batchTask?.replyMode || generationContext?.selectedReplyMode || null;
  const baseMetadata = item?.metadata && typeof item.metadata === "object" ? { ...item.metadata } : {};
  return {
    ...item,
    displayName: String(persona?.displayName || item?.displayName || "").trim(),
    handle: String(persona?.handle || item?.handle || "").trim(),
    metadata: {
      ...baseMetadata,
      forumPersonaId: String(persona?.id || generationContext?.selectedPersona?.id || "").trim(),
      forumPersonaDisplayName: String(
        persona?.displayName || generationContext?.selectedPersona?.displayName || ""
      ).trim(),
      sourceItemId: String(selectedItem?.id || "").trim(),
      sourceItemRefKey: String(selectedItem?.refKey || "").trim(),
      sourceItemTags: Array.isArray(selectedItem?.topicTags) ? [...selectedItem.topicTags] : [],
      sourceBucket: String(selectedItem?.bucket || selectedItem?.sourceKind || "").trim(),
      stanceTaskKey: String(selectedStanceTask?.key || "").trim(),
      stanceTaskGroupKey: String(selectedStanceTask?.groupKey || "").trim(),
      stanceTaskLabel: String(selectedStanceTask?.label || "").trim(),
      knowledgeLevel: String(
        persona?.knowledgeLevel || generationContext?.selectedPersona?.knowledgeLevel || ""
      ).trim(),
      personaLanguageCode: String(
        persona?.languageCode || generationContext?.selectedPersona?.languageCode || ""
      ).trim(),
      personaEnteredForumAt: String(
        persona?.enteredForumAt || generationContext?.selectedPersona?.enteredForumAt || ""
      ).trim(),
      ...(kind === "reply"
        ? {
            replyMode: String(selectedReplyMode?.key || "").trim()
          }
        : {})
    }
  };
}

function openProfilePostEditor(postId) {
  const targetPost = state.profilePosts.find((post) => post.id === postId);
  if (!targetPost) {
    return;
  }
  state.profilePostMenuId = null;
  state.profilePostEditingId = postId;
  state.profilePostEditingDraft = targetPost.text || "";
  renderProfilePage();
}

function cancelProfilePostEditor() {
  state.profilePostEditingId = null;
  state.profilePostEditingDraft = "";
  renderProfilePage();
}

function saveProfilePostEdit(postId) {
  const nextText = state.profilePostEditingDraft.trim();
  if (!nextText) {
    setProfileStatus("帖子内容不能为空。", "error");
    return;
  }

  syncPostAcrossViews(postId, (post) => ({
    ...post,
    text: nextText,
    edited: true
  }));
  state.profilePostEditingId = null;
  state.profilePostEditingDraft = "";
  renderActiveFeed();
  renderProfilePage();
  updateReplyPromptPreview();
  setProfileStatus("帖子已更新。", "success");
}

function deleteProfilePost(postId) {
  const confirmed = window.confirm("确定要删除这条帖子吗？");
  if (!confirmed) {
    return;
  }

  removePostAcrossViews(postId);
  state.profilePostMenuId = null;
  if (state.profilePostEditingId === postId) {
    state.profilePostEditingId = null;
    state.profilePostEditingDraft = "";
  }
  renderActiveFeed();
  renderProfilePage();
  updateReplyPromptPreview();
  setProfileStatus("帖子已删除。", "success");
}

async function handleProfileImageUpload(file, targetKey, successMessage) {
  if (!file) {
    return;
  }

  try {
    const dataUrl = await readAvatarAsDataUrl(
      file,
      targetKey === "avatarImage"
        ? {
            maxSide: 192,
            quality: 0.64
          }
        : {
            maxSide: 1280,
            quality: 0.82
          }
    );
    state.profile = {
      ...getCurrentProfile(),
      [targetKey]: dataUrl
    };
    persistProfile(state.profile);
    renderProfilePage();
    updateReplyPromptPreview();
    setProfileStatus(successMessage, "success");
  } catch (_error) {
    setProfileStatus("图片上传失败，请重试。", "error");
  }
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

    if (url.pathname === "/" || url.pathname === "/v1" || url.pathname === "/v1/") {
      return DEFAULT_OPENAI_ENDPOINT;
    }

    if (
      url.pathname === "/v1/chat/completions" ||
      url.pathname === "/v1/chat/completions/"
    ) {
      return DEFAULT_OPENAI_ENDPOINT;
    }

    if (url.pathname === "/chat/completions/") {
      return "https://api.deepseek.com/chat/completions";
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

function buildApiConfigSnapshot() {
  const mode = normalizeApiMode(modeSelect?.value || state.settings.mode);
  const endpoint = normalizeSettingsEndpointByMode(
    mode,
    endpointInput?.value || state.settings.endpoint
  );
  const model =
    mode === "generic"
      ? ""
      : String(modelInput?.value || state.settings.model || "").trim() ||
        getDefaultModelByMode(mode);
  return {
    mode,
    endpoint,
    token: normalizeApiConfigToken(tokenInput?.value || state.settings.token),
    model,
    temperature: normalizeTemperature(temperatureInput?.value, DEFAULT_TEMPERATURE)
  };
}

function setApiConfigStatus(message, tone = "") {
  if (!apiConfigStatusEl) {
    return;
  }
  apiConfigStatusEl.textContent = message;
  apiConfigStatusEl.className = "status-text";
  if (tone) {
    apiConfigStatusEl.classList.add(tone);
  }
}

function renderTranslationApiControls() {
  if (!translationApiEnabledEl || !translationApiConfigSelectEl) {
    return;
  }

  const configs = normalizeApiConfigs(state.settings.apiConfigs)
    .slice()
    .sort((left, right) => (right.updatedAt || 0) - (left.updatedAt || 0));

  if (
    state.settings.translationApiConfigId &&
    !configs.some((item) => item.id === state.settings.translationApiConfigId)
  ) {
    state.settings.translationApiConfigId = "";
    state.settings.translationApiEnabled = false;
  }

  const hasConfigs = configs.length > 0;
  if (!hasConfigs) {
    state.settings.translationApiEnabled = false;
    state.settings.translationApiConfigId = "";
  }

  translationApiEnabledEl.checked = Boolean(state.settings.translationApiEnabled && hasConfigs);
  translationApiEnabledEl.disabled = !hasConfigs;
  translationApiConfigSelectEl.disabled = !hasConfigs || !translationApiEnabledEl.checked;
  translationApiConfigSelectEl.innerHTML = hasConfigs
    ? [
        '<option value="">请选择一套已缓存的 API 配置</option>',
        ...configs.map(
          (item) =>
            `<option value="${escapeHtml(item.id)}">${escapeHtml(item.name)} · ${escapeHtml(
              getApiModeLabel(item.mode)
            )}</option>`
        )
      ].join("")
    : '<option value="">暂无缓存配置</option>';
  translationApiConfigSelectEl.value = state.settings.translationApiConfigId || "";
}

function setTranslationApiConfig(configId) {
  const config =
    normalizeApiConfigs(state.settings.apiConfigs).find((item) => item.id === configId) || null;
  if (!config) {
    setApiConfigStatus("未找到可用于翻译的缓存 API 配置。", "error");
    return;
  }

  state.settings.translationApiEnabled = true;
  state.settings.translationApiConfigId = config.id;
  if (translationApiEnabledEl) {
    translationApiEnabledEl.checked = true;
  }
  if (translationApiConfigSelectEl) {
    translationApiConfigSelectEl.value = config.id;
  }
  saveCurrentSettings();
  setApiConfigStatus(`翻译专用 API 已切换到“${config.name}”。`, "success");
}

function getTranslationRequestSettings(settings = getCurrentSettings()) {
  if (!settings.translationApiEnabled || !settings.translationApiConfigId) {
    return settings;
  }

  const config =
    normalizeApiConfigs(settings.apiConfigs || state.settings.apiConfigs).find(
      (item) => item.id === settings.translationApiConfigId
    ) || null;
  if (!config) {
    return settings;
  }

  return {
    ...settings,
    mode: config.mode,
    endpoint: config.endpoint,
    token: config.token,
    model: config.model
  };
}

function renderApiConfigList() {
  state.settings.apiConfigs = normalizeApiConfigs(state.settings.apiConfigs);
  if (
    state.settings.activeApiConfigId &&
    !state.settings.apiConfigs.some((item) => item.id === state.settings.activeApiConfigId)
  ) {
    state.settings.activeApiConfigId = "";
  }
  if (
    state.settings.translationApiConfigId &&
    !state.settings.apiConfigs.some((item) => item.id === state.settings.translationApiConfigId)
  ) {
    state.settings.translationApiConfigId = "";
    state.settings.translationApiEnabled = false;
  }

  if (!apiConfigListEl) {
    return;
  }

  if (!state.settings.apiConfigs.length) {
    apiConfigListEl.innerHTML =
      '<p class="empty-state">还没有缓存的 API 配置，可先填写参数后点击“保存当前 API 配置”。</p>';
    renderTranslationApiControls();
    return;
  }

  apiConfigListEl.innerHTML = state.settings.apiConfigs
    .slice()
    .sort((left, right) => (right.updatedAt || 0) - (left.updatedAt || 0))
    .map((item) => {
      const isActive = item.id === state.settings.activeApiConfigId;
      const isTranslationSelected =
        state.settings.translationApiEnabled && item.id === state.settings.translationApiConfigId;
      const modelText = item.model ? `模型：${item.model}` : "模型：无";
      const temperatureText = `温度：${normalizeTemperature(
        item.temperature,
        DEFAULT_TEMPERATURE
      ).toFixed(2)}`;
      const tokenText = item.token ? "密钥：已保存" : "密钥：未保存";
      return `
        <article class="api-config-item${isActive ? " active" : ""}">
          <div class="api-config-item__head">
            <strong>${escapeHtml(item.name)}</strong>
            <div class="api-config-item__badges">
              <span class="badge">${isActive ? "当前配置" : "已缓存"}</span>
              ${isTranslationSelected ? '<span class="badge">翻译专用</span>' : ""}
            </div>
          </div>
          <p class="api-config-item__meta">
            类型：${escapeHtml(getApiModeLabel(item.mode))}
            \n地址：${escapeHtml(item.endpoint || "未填写")}
            \n${escapeHtml(modelText)} · ${escapeHtml(temperatureText)} · ${escapeHtml(tokenText)}
          </p>
          <div class="settings-actions">
            <button class="ghost-chip" type="button" data-action="switch-api-config" data-config-id="${escapeHtml(
              item.id
            )}">
              一键切换
            </button>
            <button class="ghost-chip" type="button" data-action="set-translation-api-config" data-config-id="${escapeHtml(
              item.id
            )}" ${isTranslationSelected ? "disabled" : ""}>
              ${isTranslationSelected ? "已用于翻译" : "设为翻译专用"}
            </button>
            <button class="ghost-chip ghost-chip--danger" type="button" data-action="delete-api-config" data-config-id="${escapeHtml(
              item.id
            )}">
              删除
            </button>
          </div>
        </article>
      `;
    })
    .join("");
  renderTranslationApiControls();
}

function saveCurrentApiConfig() {
  const snapshot = buildApiConfigSnapshot();
  if (!snapshot.endpoint) {
    setApiConfigStatus("请先填写 API 地址后再保存配置。", "error");
    return;
  }

  const customName = String(apiConfigNameInput?.value || "").trim();
  state.settings.apiConfigs = normalizeApiConfigs(state.settings.apiConfigs);
  let targetConfig = null;

  if (customName) {
    targetConfig =
      state.settings.apiConfigs.find((item) => item.name === customName) || null;
  }
  if (!targetConfig && state.settings.activeApiConfigId) {
    targetConfig =
      state.settings.apiConfigs.find((item) => item.id === state.settings.activeApiConfigId) ||
      null;
  }

  if (targetConfig) {
    targetConfig.name = customName || targetConfig.name;
    targetConfig.mode = snapshot.mode;
    targetConfig.endpoint = snapshot.endpoint;
    targetConfig.token = snapshot.token;
    targetConfig.model = snapshot.model;
    targetConfig.temperature = snapshot.temperature;
    targetConfig.updatedAt = Date.now();
  } else {
    targetConfig = {
      id: `api_cfg_${Date.now()}_${hashText(`${customName}-${snapshot.endpoint}`)}`,
      name: customName || `${getApiModeLabel(snapshot.mode)} ${formatDateTime()}`,
      ...snapshot,
      updatedAt: Date.now()
    };
    state.settings.apiConfigs = [targetConfig, ...state.settings.apiConfigs].slice(
      0,
      API_CONFIG_LIMIT
    );
  }

  state.settings.activeApiConfigId = targetConfig.id;
  if (apiConfigNameInput) {
    apiConfigNameInput.value = "";
  }
  saveCurrentSettings();
  setApiConfigStatus(`API 配置“${targetConfig.name}”已保存并设为当前。`, "success");
}

function switchApiConfig(configId) {
  const config =
    normalizeApiConfigs(state.settings.apiConfigs).find((item) => item.id === configId) || null;
  if (!config) {
    setApiConfigStatus("未找到对应的 API 配置。", "error");
    return;
  }

  state.settings.mode = normalizeApiMode(config.mode);
  state.settings.endpoint = normalizeSettingsEndpointByMode(config.mode, config.endpoint);
  state.settings.token = config.token || "";
  state.settings.model = config.model || getDefaultModelByMode(config.mode);
  state.settings.temperature = normalizeTemperature(config.temperature, DEFAULT_TEMPERATURE);
  if (modeSelect) {
    modeSelect.value = state.settings.mode;
  }
  if (endpointInput) {
    endpointInput.value = state.settings.endpoint;
  }
  if (tokenInput) {
    tokenInput.value = state.settings.token;
  }
  if (modelInput) {
    modelInput.value = state.settings.model;
  }
  if (temperatureInput) {
    temperatureInput.value = String(state.settings.temperature);
  }
  state.settings.activeApiConfigId = config.id;
  updateModeUI();
  saveCurrentSettings();
  setApiConfigStatus(`已一键切换到“${config.name}”。`, "success");
}

function deleteApiConfig(configId) {
  const currentConfigs = normalizeApiConfigs(state.settings.apiConfigs);
  const target = currentConfigs.find((item) => item.id === configId);
  if (!target) {
    return;
  }
  const confirmed = window.confirm(`确定删除 API 配置“${target.name}”吗？`);
  if (!confirmed) {
    return;
  }

  state.settings.apiConfigs = currentConfigs.filter((item) => item.id !== configId);
  if (state.settings.activeApiConfigId === configId) {
    state.settings.activeApiConfigId = "";
  }
  if (state.settings.translationApiConfigId === configId) {
    state.settings.translationApiConfigId = "";
    state.settings.translationApiEnabled = false;
  }
  if (state.settings.summaryApiConfigId === configId) {
    state.settings.summaryApiConfigId = "";
    state.settings.summaryApiEnabled = false;
  }
  saveCurrentSettings();
  setApiConfigStatus(`API 配置“${target.name}”已删除。`, "success");
}

function buildForumBatchReferenceLine(reference = {}, maxChars = 160) {
  const refKey = String(reference?.refKey || "").trim();
  const topicTags = normalizeForumTopicTags(reference?.topicTags, []);
  const previewText =
    String(reference?.previewText || "").trim() ||
    String(reference?.summaryText || "").trim() ||
    String(reference?.detailText || "").trim() ||
    String(reference?.contentText || "").trim();
  const tagText = topicTags.length ? ` [${topicTags.join("/")}]` : "";
  const bodyText = truncate(previewText.replace(/\s+/g, " ").trim(), maxChars);
  return `${refKey || "REF"}${tagText} ${bodyText}`.trim();
}

function isBubbleUserForumReference(reference = {}) {
  return (
    String(reference?.refType || "").trim() === "bubble_user_message" ||
    String(reference?.sourceKind || "").trim() === "bubble_user_message"
  );
}

function buildForumBubbleBackgroundLine(reference = {}, maxChars = 180) {
  const previewText =
    String(reference?.previewText || "").trim() ||
    String(reference?.summaryText || "").trim() ||
    String(reference?.detailText || "").trim() ||
    String(reference?.contentText || "").trim();
  let bodyText = truncate(previewText.replace(/\s+/g, " ").trim(), maxChars);
  bodyText = bodyText.replace(/^用户曾在\s*Bubble\s*里提到[:：]\s*/i, "").trim();
  return bodyText || "用户之前在 Bubble 里提到过相关内容。";
}

function buildForumBatchPublicContextText(
  settings = {},
  feedType = state.activeFeed,
  generationContext = null,
  options = {}
) {
  const resolvedFeedType = getCurrentContentFeed(feedType);
  const customTab = resolvePromptRuntimeCustomTab(
    findCustomTabInSettings(settings, resolvedFeedType),
    generationContext
  );
  const currentDateTime = typeof formatAwarenessDateTime === "function"
    ? formatAwarenessDateTime(getPromptNow(settings))
    : formatDateTime(getPromptNow(settings));
  const hotRefs = Array.isArray(options.hotRefs) ? options.hotRefs : [];
  const worldbookRefs = Array.isArray(generationContext?.worldbookRefs) ? generationContext.worldbookRefs : [];
  const lines = [
    "<public_context>",
    `当前论坛：${String(customTab?.name || getFeedLabel(resolvedFeedType) || "论坛").trim()}`,
    customTab?.audience ? `页签用户定位：${String(customTab.audience || "").trim()}` : "",
    `当前日期：${currentDateTime}`,
    hotRefs.length
      ? [
          "当前热点摘要：",
          ...hotRefs.map((reference) => buildForumBatchReferenceLine(reference, 120))
        ].join("\n")
      : "当前热点摘要：无",
    worldbookRefs.length
      ? [
          "必要世界书参考：",
          ...worldbookRefs.map((reference) => buildForumBatchReferenceLine(reference, 160))
        ].join("\n")
      : "",
    generationContext?.promptBlocks?.unknownBoundaryText
      ? generationContext.promptBlocks.unknownBoundaryText
      : "",
    "</public_context>"
  ];
  return lines.filter(Boolean).join("\n");
}

function buildForumBatchTasksText(batch = {}, generationType = "posts") {
  const tasks = Array.isArray(batch?.tasks) ? batch.tasks : [];
  const lines = ["<generation_tasks>"];
  tasks.forEach((task) => {
    const persona = task?.persona || {};
    const mainSource = task?.mainSource || {};
    const stanceTask = task?.stanceTask || {};
    const currentRefs = Array.isArray(task?.filteredCurrentDiscussionRefs)
      ? task.filteredCurrentDiscussionRefs
      : [];
    const privateRefs = Array.isArray(task?.privateBackgroundRefs)
      ? task.privateBackgroundRefs
      : [];
    const bubblePrivateRefs = privateRefs.filter((reference) => isBubbleUserForumReference(reference));
    const otherPrivateRefs = privateRefs.filter((reference) => !isBubbleUserForumReference(reference));
    lines.push(
      [
        `<task slotIndex="${Number(task?.slotIndex) || 0}">`,
        `固定用户：displayName=${String(persona.displayName || "").trim()}, handle=${String(persona.handle || "").trim()}, language=${String(persona.languageCode || "zh").trim()}`,
        persona.speakingTone ? `语气：${String(persona.speakingTone || "").trim()}` : "",
        Array.isArray(persona.interestTags) && persona.interestTags.length
          ? `兴趣标签：${persona.interestTags.join(", ")}`
          : "",
        Array.isArray(persona.avoidTags) && persona.avoidTags.length
          ? `回避标签：${persona.avoidTags.join(", ")}`
          : "",
        persona.hotStancePrompt ? `热点态度：${String(persona.hotStancePrompt || "").trim()}` : "",
        persona.personaPrompt ? `用户设定：${String(persona.personaPrompt || "").trim()}` : "",
        `主来源全文：${buildForumBatchReferenceLine(mainSource, 800)}`,
        stanceTask?.key
          ? [
              "本条立场任务：",
              `- stance=${String(stanceTask.key || "").trim()}${stanceTask.label ? `（${String(stanceTask.label || "").trim()}）` : ""}`,
              stanceTask.instruction ? `- 说明：${String(stanceTask.instruction || "").trim()}` : "",
              stanceTask.boundary ? `- 边界：${String(stanceTask.boundary || "").trim()}` : "",
              stanceTask.disagreementStyle ? `- 表达方式：${String(stanceTask.disagreementStyle || "").trim()}` : "",
              "- 允许不完全支持当前热门解读，但不要否认明确给定的事实。"
            ]
              .filter(Boolean)
              .join("\n")
          : "",
        currentRefs.length
          ? `可参考当前 discussion：\n${currentRefs
              .map((reference) => `- ${buildForumBatchReferenceLine(reference, 180)}`)
              .join("\n")}`
          : "可参考当前 discussion：无",
        bubblePrivateRefs.length
          ? `这个用户曾在 Bubble 里看到过以下用户发言背景：\n${bubblePrivateRefs
              .map((reference, index) => `${index + 1}. ${buildForumBubbleBackgroundLine(reference, 180)}`)
              .join("\n")}`
          : "这个用户曾在 Bubble 里看到过以下用户发言背景：无",
        otherPrivateRefs.length
          ? `私有历史背景：\n${otherPrivateRefs
              .map((reference) => `- ${buildForumBatchReferenceLine(reference, 180)}`)
              .join("\n")}`
          : "私有历史背景：无",
        generationType === "replies" && task?.replyMode?.key
          ? `回复模式：${String(task.replyMode.key || "").trim()}`
          : "",
        `规则：只能把本 task 的私有背景用于 slotIndex=${Number(task?.slotIndex) || 0}，不要传给其他 task。`,
        "</task>"
      ]
        .filter(Boolean)
        .join("\n")
    );
  });
  lines.push("</generation_tasks>");
  return lines.join("\n");
}

function buildForumBatchOutputContractText(batch = {}, generationType = "posts") {
  const tasks = Array.isArray(batch?.tasks) ? batch.tasks : [];
  const requiredFields = generationType === "replies"
    ? "slotIndex, displayName, handle, text, likes, replies"
    : "slotIndex, displayName, handle, text, tags, replies, reposts, likes, views";
  return [
    "<output_contract>",
    `输出 JSON 数组，长度必须等于 ${tasks.length}。`,
    "数组中的每个对象都必须包含 slotIndex，并严格对应同编号 task。",
    `每个对象必须包含字段：${requiredFields}。`,
    "必须使用对应 task 指定的 displayName / handle / language；不要擅自换人。",
    generationType === "posts" ? "每个 slot 都要体现对应的立场任务，不要把所有帖子写成同一种支持口径。" : "",
    "如果 slotIndex 对应的是中文 persona，就不要输出英文正文；其它语言同理。",
    "</output_contract>"
  ].join("\n");
}

function buildForumBatchScopedGenerationContext(
  settings = {},
  feedType = state.activeFeed,
  generationContext = null,
  batch = null,
  options = {}
) {
  const tasks = Array.isArray(batch?.tasks) ? batch.tasks : [];
  const generationType = String(options.generationType || generationContext?.generationType || "posts").trim();
  const hotRefs = tasks[0]?.publicHotRefs || [];
  const selectedPersona = tasks[0]?.persona || null;
  const selectedItem = tasks[0]?.mainSource || null;
  return {
    ...(generationContext && typeof generationContext === "object" ? generationContext : {}),
    selectedPersona,
    selectedItem,
    selectedStanceTask: tasks[0]?.stanceTask || null,
    selectedReplyMode: tasks[0]?.replyMode || null,
    personaSlots: tasks.map((task) => task.persona).filter(Boolean),
    batchTasks: tasks,
    promptBlocks: {
      ...(generationContext?.promptBlocks || {}),
      backgroundCardsText: "",
      sourceItemText: "",
      roleKnowledgeText: "",
      personaText: "",
      historyDigestsText: "",
      forumBatchPublicContext: buildForumBatchPublicContextText(
        settings,
        feedType,
        generationContext,
        { hotRefs }
      ),
      forumBatchGenerationTasks: buildForumBatchTasksText(batch, generationType),
      forumBatchOutputContract: buildForumBatchOutputContractText(batch, generationType)
    }
  };
}

function buildPrompt(
  settings,
  feedType = state.activeFeed,
  count = settings.homeCount || DEFAULT_POST_COUNT,
  options = {}
) {
  const generationContext = options && typeof options === "object" ? options.generationContext || null : null;
  const isBatchPrompt = Array.isArray(generationContext?.batchTasks) && generationContext.batchTasks.length > 0;
  const resolvedFeedType = getCurrentContentFeed(feedType);
  const feedLabel = getFeedLabel(resolvedFeedType);
  const customTab = findCustomTabInSettings(settings, resolvedFeedType);
  const runtimeCustomTab = resolvePromptRuntimeCustomTab(customTab, generationContext);
  const forumPromptContext = buildForumPromptContext(settings, resolvedFeedType);
  const feedSource = runtimeCustomTab
    ? buildCustomTabSourceText(runtimeCustomTab).trim()
    : buildFeedSourceText(settings, resolvedFeedType).trim();
  const forumSettingText = feedSource
    ? isBatchPrompt
      ? [
          `当前论坛讨论区：${feedLabel}`,
          runtimeCustomTab?.audience ? `页签用户定位：${String(runtimeCustomTab.audience || "").trim()}` : ""
        ]
          .filter(Boolean)
          .join("\n")
      : [
        `当前论坛讨论区：${feedLabel}`,
        "当前论坛讨论区一手设定（优先级高于世界书辅助背景）：",
        feedSource
      ].join("\n")
    : `当前论坛讨论区：${feedLabel}\n当前论坛讨论区一手设定暂未补充，请结合世界观与实时讨论语境自行展开内容。`;
  const historyAvoidanceText = buildFeedHistoryAvoidanceText(resolvedFeedType, count);
  const dominantHotTopicInstruction = String(runtimeCustomTab?.hotTopic || "").trim()
    ? `这个讨论区当前存在一个主导性热点：${runtimeCustomTab.hotTopic}。本轮生成的绝大部分帖子都应围绕这个热点展开，但仍要拆成不同立场、不同情绪、不同细节与不同争议点。`
    : "如果这个讨论区没有单一主导热点，可围绕长期讨论背景自由展开。";

  return buildStructuredPromptSections(
    "discussion_generate_posts",
    {
      context_library: {
        worldview_content: settings.worldview || DEFAULT_SETTINGS.worldview,
        forum_setting: forumSettingText,
        time_awareness: isBatchPrompt ? "" : forumPromptContext.timeAwarenessText,
        worldbook_reference: isBatchPrompt ? "" : forumPromptContext.worldbookReferenceText,
        background_cards_context: generationContext?.promptBlocks?.backgroundCardsText || "",
        source_item_context: generationContext?.promptBlocks?.sourceItemText || "",
        dominant_hot_topic: isBatchPrompt ? "" : dominantHotTopicInstruction,
        forum_role_knowledge: generationContext?.promptBlocks?.roleKnowledgeText || "",
        forum_persona_seed: generationContext?.promptBlocks?.personaText || "",
        unknown_boundary: generationContext?.promptBlocks?.unknownBoundaryText || "",
        supplemental_topics: !isBatchPrompt && forumPromptContext.supplementalTopicTexts.length
          ? `主导即时讨论语境（与页签热点同级，可共同成为主线）：\n${forumPromptContext.supplementalTopicTexts.join(
              "\n\n"
            )}`
          : "",
        repost_hint: !isBatchPrompt && forumPromptContext.repostSource
          ? "如果需要围绕用户最近一条论坛动态展开，请把它作为被转发原帖来写，再在外层加上不同用户各自的评论。"
          : "",
        history_avoidance:
          isBatchPrompt
            ? ""
            : historyAvoidanceText || "如果没有历史缓存，可自由生成，但仍要让每条帖子讨论方向明显不同。",
        forum_batch_public_context: generationContext?.promptBlocks?.forumBatchPublicContext || "",
        forum_batch_generation_tasks: generationContext?.promptBlocks?.forumBatchGenerationTasks || ""
      },
      output_standard: {
        forum_batch_output_contract: generationContext?.promptBlocks?.forumBatchOutputContract || ""
      }
    },
    {
      settings,
      variables: {
        count,
        feedLabel
      }
    }
  );
}

function buildFeedSourceText(settings, feedType = state.activeFeed) {
  const resolvedFeedType = getCurrentContentFeed(feedType);
  const customTab = findCustomTabInSettings(settings, resolvedFeedType);
  if (customTab) {
    return buildCustomTabSourceText(customTab);
  }
  return "";
}

function buildFeedHistoryAvoidanceText(
  feedType = state.activeFeed,
  count = DEFAULT_POST_COUNT
) {
  const resolvedFeedType = getCurrentContentFeed(feedType);
  const historyPosts = (state.feeds[resolvedFeedType] || [])
    .filter((post) => !post?.authorOwned)
    .slice(0, 8);
  if (!historyPosts.length) {
    return "";
  }

  const summaries = historyPosts.map((post, index) => {
    const tags = normalizeTags(post.tags || [], 3).join(" ");
    const baseSummary =
      String(post.text || post.repostSource?.text || "").trim() ||
      (post.imageDataUrl || post.repostSource?.imageDataUrl ? "带图帖子" : "已有历史讨论");
    const summaryText = truncate(
      baseSummary.replace(/\s+/g, " "),
      90
    );
    return `${index + 1}. ${tags || "无标签"}｜${summaryText || "已有历史讨论"}`;
  });

  return [
    "下面是当前讨论区最近已缓存、应尽量避开的讨论方向：",
    ...summaries,
    `新的 ${count} 条帖子请主动换争议点、换关注对象、换判断维度，不要沿着以上内容重复改写。`
  ].join("\n");
}

function buildCustomTabsSummary(settings) {
  const tabs = normalizeCustomTabs(settings.customTabs || []);
  if (!tabs.length) {
    return "暂无自定义页签。";
  }
  return tabs
    .map((tab) => {
      const worldbookNames = getMountedWorldbookEntries(tab).map((entry) => entry.name);
      return [
        `${tab.name || "自定义页签"}：`,
        tab.audience ? `用户定位：${tab.audience}` : "",
        tab.discussionText ? `页签文本：${tab.discussionText}` : "",
        tab.hotTopic ? `页签热点：${tab.hotTopic}` : "",
        tab.timeAwareness ? "时间感知：开启" : "",
        worldbookNames.length ? `挂载世界书：${worldbookNames.join("、")}` : "",
        tab.bubbleFocusEnabled
          ? `Bubble 关注：开启（${normalizeContextFocusMinutes(tab.bubbleFocusMinutes)} 分钟内）`
          : "",
        tab.insFocusEnabled
          ? `INS 关注：开启（${normalizeContextFocusMinutes(tab.insFocusMinutes)} 分钟内）`
          : ""
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");
}

function resolvePromptRuntimeCustomTab(customTab = null, generationContext = null) {
  const baseTab = customTab && typeof customTab === "object" ? customTab : null;
  const runtimeTab =
    generationContext?.tab && typeof generationContext.tab === "object" ? generationContext.tab : null;
  if (!baseTab) {
    return runtimeTab;
  }
  if (!runtimeTab) {
    return baseTab;
  }
  return {
    ...baseTab,
    discussionText: String(runtimeTab.discussionText || baseTab.discussionText || "").trim(),
    hotTopic: String(runtimeTab.hotTopic || baseTab.hotTopic || "").trim()
  };
}

function buildReplyPrompt(
  settings,
  profile,
  feedType,
  rootPost,
  parentReply = null,
  count = settings.replyCount || DEFAULT_REPLY_COUNT,
  options = {}
) {
  const generationContext = options && typeof options === "object" ? options.generationContext || null : null;
  const isBatchPrompt = Array.isArray(generationContext?.batchTasks) && generationContext.batchTasks.length > 0;
  const resolvedFeedType = getCurrentContentFeed(feedType);
  const feedLabel = getFeedLabel(resolvedFeedType);
  const customTab = findCustomTabInSettings(settings, resolvedFeedType);
  const runtimeCustomTab = resolvePromptRuntimeCustomTab(customTab, generationContext);
  const forumPromptContext = buildForumPromptContext(settings, resolvedFeedType);
  const targetText = parentReply ? parentReply.text : rootPost.text;
  const promptTitle = parentReply ? "楼中楼回复" : "主楼回复";
  const feedSourceText = runtimeCustomTab
    ? buildCustomTabSourceText(runtimeCustomTab, {
        includeAudience: false
      }).trim()
    : buildFeedSourceText(settings, resolvedFeedType).trim();
  const forumSettingText = feedSourceText
    ? isBatchPrompt
      ? [
          `当前论坛讨论区：${feedLabel}`,
          runtimeCustomTab?.audience ? `页签用户定位：${String(runtimeCustomTab.audience || "").trim()}` : ""
        ]
          .filter(Boolean)
          .join("\n")
      : [
        `当前论坛讨论区：${feedLabel}`,
        "当前论坛讨论区一手设定（回复时必须纳入判断，优先级高于世界书辅助背景）：",
        feedSourceText
      ].join("\n")
    : `当前论坛讨论区：${feedLabel}\n当前论坛讨论区一手设定暂未补充，请至少保留这个讨论区标签与语境判断。`;
  const rootHasImage = Boolean(rootPost?.imageDataUrl);
  const resolvedRootText =
    String(rootPost?.text || "").trim() ||
    (rootPost?.repostSource
      ? "这是一条转发/引用帖子，本体评论为空。"
      : "这是一条仅包含图片的帖子。");
  const resolvedTargetText = String(targetText || "").trim() || resolvedRootText;

  return buildStructuredPromptSections(
    "discussion_generate_replies",
    {
      context_library: {
        worldview_content: settings.worldview || DEFAULT_SETTINGS.worldview,
        forum_setting: forumSettingText,
        time_awareness: isBatchPrompt ? "" : forumPromptContext.timeAwarenessText,
        worldbook_reference: isBatchPrompt ? "" : forumPromptContext.worldbookReferenceText,
        background_cards_context: generationContext?.promptBlocks?.backgroundCardsText || "",
        source_item_context: generationContext?.promptBlocks?.sourceItemText || "",
        hot_topic: !isBatchPrompt && String(runtimeCustomTab?.hotTopic || "").trim()
          ? `当前这个讨论区的主导热点：${runtimeCustomTab.hotTopic}`
          : "",
        forum_role_knowledge: generationContext?.promptBlocks?.roleKnowledgeText || "",
        forum_persona_seed: generationContext?.promptBlocks?.personaText || "",
        unknown_boundary: generationContext?.promptBlocks?.unknownBoundaryText || "",
        supplemental_topics: !isBatchPrompt && forumPromptContext.supplementalTopicTexts.length
          ? `主导即时讨论语境（与页签热点同级，可共同成为主线）：\n${forumPromptContext.supplementalTopicTexts.join(
              "\n\n"
            )}`
          : "",
        root_image_hint: rootHasImage
          ? "主楼附带了一张图片；如果模型能看到图片，请把图片内容也一起纳入理解和回复。"
          : "主楼没有附图。",
        repost_source: rootPost?.repostSource
          ? `当前主楼是一条转发/引用帖子，请同时理解被转发的原帖：\n${formatRepostSourceForPrompt(
              rootPost.repostSource
            )}`
          : "",
        root_post_text: resolvedRootText,
        reply_target_intro: parentReply ? "当前正在回复的上一层内容：" : "当前需要围绕主楼展开讨论的内容：",
        reply_target_text: resolvedTargetText,
        forum_batch_public_context: generationContext?.promptBlocks?.forumBatchPublicContext || "",
        forum_batch_generation_tasks: generationContext?.promptBlocks?.forumBatchGenerationTasks || ""
      },
      persona_alignment: {
        forum_audience_text: String(runtimeCustomTab?.audience || "").trim()
          ? `当前这个讨论区里最常见、最典型的活跃回复人群画像：${String(
              runtimeCustomTab.audience || ""
            ).trim()}。生成回复时要自然体现这种人群的视角、措辞、关注点和情绪密度。`
          : "",
        author_persona_text: profile?.personaPrompt || DEFAULT_PROFILE.personaPrompt
      },
      output_standard: {
        forum_batch_output_contract: generationContext?.promptBlocks?.forumBatchOutputContract || ""
      }
    },
    {
      settings,
      variables: {
        count,
        promptTitle,
        feedLabel
      }
    }
  );
}

function getReplyPreviewSeedPost(settings) {
  const currentFeedPost = state.profilePosts.find(
    (post) => (post.feedType || getCurrentContentFeed()) === getCurrentContentFeed()
  );
  if (currentFeedPost) {
    return currentFeedPost;
  }

  if (state.profilePosts.length) {
    return state.profilePosts[0];
  }

  const resolvedFeedType = getCurrentContentFeed();
  const topicCandidates = parseTopics(buildCustomTabTopicSeedText(settings, resolvedFeedType));
  const topic = topicCandidates[0] || getFeedLabel(resolvedFeedType) || "当前讨论";
  return {
    id: "reply_preview_seed",
    feedType: resolvedFeedType,
    tags: ensurePostTags([topic], resolvedFeedType),
    text: `我觉得“${topic}”现在最值得讨论的，不是表面热度，而是它暴露出的判断分歧。很多人都在追热点，但真正能把这件事说透的人并不多。`
  };
}

function normalizeReply(item, index = 0, seed = "root") {
  const [fallbackName, fallbackHandle] =
    FEED_NAMES[(index + 3) % FEED_NAMES.length];
  const stableSeed = `${seed}-${item?.text || ""}-${item?.displayName || fallbackName}-${index}`;
  const translationZh = String(item?.translationZh || item?.translatedText || "").trim();
  const createdAt = Number(item?.createdAt) || Date.now() + index;
  const rawTime = String(item?.time || "").trim();
  const time =
    Boolean(item?.authorOwned) && createdAt && (!rawTime || rawTime === "刚刚")
      ? formatForumTimestamp(createdAt)
      : rawTime || `${index + 1}m`;
  return {
    id: item?.id || `reply_${index}_${hashText(stableSeed)}`,
    displayName: truncate(item?.displayName || fallbackName, 24),
    handle: truncate(item?.handle || fallbackHandle, 24),
    text: truncate(item?.text || "这条回复还在生成中。", MAX_REPLY_TEXT_LENGTH),
    translationZh: truncate(translationZh, 600),
    likes: formatMetric(item?.likes, 12 + index * 5),
    replies: formatMetric(item?.replies, 2 + index),
    time,
    createdAt,
    authorOwned: Boolean(item?.authorOwned),
    children: Array.isArray(item?.children) ? item.children : [],
    expanded: Boolean(item?.expanded),
    loading: Boolean(item?.loading),
    metadata: item?.metadata && typeof item.metadata === "object" ? { ...item.metadata } : {}
  };
}

function setSettingsStatus(message, tone = "") {
  if (!settingsStatusEl) {
    return;
  }
  settingsStatusEl.textContent = message;
  settingsStatusEl.className = "status-text";
  if (tone) {
    settingsStatusEl.classList.add(tone);
  }
}

function setHomeStatus(message, tone = "") {
  if (!homeStatusEl) {
    return;
  }
  homeStatusEl.textContent = message;
  homeStatusEl.className = "inline-status";
  if (tone) {
    homeStatusEl.classList.add(tone);
  }
}

function setFeedPullOffset(offset = 0) {
  if (!feedEl) {
    return;
  }
  feedEl.style.setProperty("--feed-offset", `${Math.max(0, Math.round(offset))}px`);
}

function setPullIndicator(distance = 0, mode = "idle") {
  if (!pullIndicatorEl || !pullLabelEl || !pullMetaEl) {
    return;
  }

  const progress = Math.max(0, Math.min(distance, 130));
  const isLoading = mode === "loading";
  const isVisible = progress > 0 || isLoading;
  const feedOffset = isLoading ? 42 : Math.min(36, progress * 0.32);
  const scale = 1 + progress / 420;
  pullIndicatorEl.style.transform = `scale(${scale})`;
  pullIndicatorEl.classList.toggle("visible", isVisible);
  pullIndicatorEl.classList.toggle("ready", mode === "ready");
  pullIndicatorEl.classList.toggle("loading", mode === "loading");
  setFeedPullOffset(feedOffset);

  const homeCount = getCurrentSettings().homeCount || DEFAULT_POST_COUNT;

  if (mode === "loading") {
    pullLabelEl.textContent = "正在刷新讨论流";
    pullMetaEl.textContent = "正在请求 API 生成内容";
    return;
  }

  if (mode === "ready") {
    pullLabelEl.textContent = "松开即可刷新";
    pullMetaEl.textContent = `将生成默认 ${homeCount} 条新的讨论信息`;
    return;
  }

  pullLabelEl.textContent = "向下滑动以刷新";
  pullMetaEl.textContent = `默认生成 ${homeCount} 条讨论信息`;
}

function saveCurrentSettings() {
  state.settings = getCurrentSettings();
  state.settings.mode = normalizeApiMode(state.settings.mode);
  state.settings.endpoint = normalizeSettingsEndpointByMode(
    state.settings.mode,
    state.settings.endpoint
  );
  if (state.settings.mode !== "generic") {
    state.settings.model = state.settings.model || getDefaultModelByMode(state.settings.mode);
    if (modelInput) {
      modelInput.value = state.settings.model;
    }
  }
  if (endpointInput) {
    endpointInput.value = state.settings.endpoint;
  }
  state.settings.apiConfigs = normalizeApiConfigs(state.settings.apiConfigs);
  if (
    state.settings.activeApiConfigId &&
    !state.settings.apiConfigs.some((item) => item.id === state.settings.activeApiConfigId)
  ) {
    state.settings.activeApiConfigId = "";
  }
  if (
    state.settings.translationApiConfigId &&
    !state.settings.apiConfigs.some((item) => item.id === state.settings.translationApiConfigId)
  ) {
    state.settings.translationApiConfigId = "";
    state.settings.translationApiEnabled = false;
  }
  if (
    state.settings.summaryApiConfigId &&
    !state.settings.apiConfigs.some((item) => item.id === state.settings.summaryApiConfigId)
  ) {
    state.settings.summaryApiConfigId = "";
    state.settings.summaryApiEnabled = false;
  }
  persistSettings(state.settings);
  updatePromptPreview();
  updateReplyPromptPreview();
  updateInsightPanel();
  renderProfilePage();
  renderApiConfigList();
}

function setHomeComposerOpen(isOpen) {
  const nextOpen = Boolean(isOpen);
  if (!nextOpen && state.composerOpen && isHomeComposerQuoteMode()) {
    clearHomeComposerRepostSource({ preserveContent: false });
  }
  state.composerOpen = nextOpen;
  if (homeComposerCardEl) {
    homeComposerCardEl.classList.toggle("hidden", !state.composerOpen);
  }
  if (homeComposerToggleBtn) {
    homeComposerToggleBtn.textContent =
      state.composerOpen && isHomeComposerQuoteMode() ? "收起引用" : state.composerOpen ? "收起发帖" : "发布新帖子";
  }
  syncHomeComposerModeUI();
  if (state.composerOpen) {
    renderComposerMediaPreview(
      homeComposerImagePreviewEl,
      state.homeComposerImageDataUrl,
      "remove-home-composer-image"
    );
    if (homeComposerInput && !homeComposerInput.value.trim()) {
      setHomeComposerStatus("");
    }
    window.setTimeout(() => {
      homeComposerInput?.focus();
    }, 0);
  }
}

function startHomeComposerQuote(post, bucketName = state.activeFeed) {
  const repostSource = createRepostSourceSnapshotFromPost(post);
  if (!repostSource) {
    setHomeStatus("这条帖子没有可引用的正文或图片。", "error");
    return;
  }
  const targetFeed = post.feedType || getCurrentContentFeed(bucketName);
  state.homeComposerRepostSource = repostSource;
  state.homeComposerRepostPostId = String(post.id || "").trim();
  switchHomeFeed(targetFeed);
  switchTab("home");
  setHomeComposerOpen(true);
  setHomeComposerStatus(`正在引用“${post.displayName || "论坛用户"}”的帖子。`, "");
}

function canRefreshCurrentHomeFeed() {
  return state.activeTab === "home" && state.activeFeed !== "tags";
}

function updateHomeRefreshAvailability() {
  if (!topRefreshBtn) {
    return;
  }
  topRefreshBtn.disabled = state.isRefreshing || !canRefreshCurrentHomeFeed();
}

function getHomeScrollTarget() {
  return homeScrollEl || feedEl || null;
}

function getDocumentScrollTop() {
  const scrollingElement = document.scrollingElement || document.documentElement || document.body;
  return Math.max(
    Number(window.scrollY || 0),
    Number(scrollingElement?.scrollTop || 0),
    0
  );
}

function isHomeScrollTargetAtTop(scrollTarget = getHomeScrollTarget()) {
  return !scrollTarget || Math.max(Number(scrollTarget.scrollTop || 0), 0) <= 0.5;
}

function isHomeRefreshStartPosition() {
  if (!canRefreshCurrentHomeFeed()) {
    return false;
  }
  if (!isHomeScrollTargetAtTop()) {
    return false;
  }
  if (!isEmbeddedView() && getDocumentScrollTop() > 2) {
    return false;
  }
  return true;
}

function syncHomeRefreshAnchor() {
  if (isHomeRefreshStartPosition()) {
    if (!state.feedTopAnchorAt) {
      state.feedTopAnchorAt = Date.now();
    }
    return;
  }

  state.feedTopAnchorAt = 0;
  state.touchStartedAtTop = false;
  if (state.pullDistance > 0 && !state.isRefreshing) {
    state.pullDistance = 0;
    setPullIndicator(0, "idle");
  }
}

function switchHomeFeed(nextFeed) {
  if (nextFeed === "tags") {
    state.activeFeed = "tags";
    state.activeTagFilter = "";
    state.pullDistance = 0;
    setPullIndicator(0, "idle");
    renderActiveFeed();
    updateHomeRefreshAvailability();
    setHomeStatus("当前查看：热门标签", "");
    return;
  }

  const resolvedFeed = isCustomFeed(nextFeed) ? nextFeed : getDefaultVisibleHomeFeed();
  state.activeFeed = resolvedFeed;
  if (isCustomFeed(resolvedFeed)) {
    state.lastContentFeed = resolvedFeed;
    lastKnownContentFeed = resolvedFeed;
  }
  state.activeTagFilter = "";
  renderActiveFeed();
  updatePromptPreview();
  updateReplyPromptPreview();
  updateInsightPanel();
  updateHomeRefreshAvailability();
  setHomeStatus(`当前查看：${getFeedLabel(state.activeFeed)}`, "");
}

function switchTab(tabName) {
  const nextTab = normalizeTabName(tabName);

  if (state.threadModalOpen && nextTab !== state.activeTab) {
    setThreadModalOpen(false);
  }
  if (state.customTabEditorOpen && nextTab !== state.activeTab) {
    setCustomTabsPanelOpen(false);
  }
  state.activeTab = nextTab;
  Object.entries(pages).forEach(([name, page]) => {
    if (page) {
      page.classList.toggle("active", name === nextTab);
    }
  });

  navItems.forEach((item) => {
    item.classList.toggle("active", item.dataset.tab === nextTab);
  });

  if (pageTitleEl) {
    pageTitleEl.textContent = pageTitleMap[nextTab] || "首页";
  }
  const isHomeTab = nextTab === "home";
  const isProfileTab = nextTab === "profile";
  if (topRefreshBtn) {
    topRefreshBtn.hidden = !isHomeTab;
    topRefreshBtn.style.display = isHomeTab ? "inline-flex" : "none";
  }
  updateHomeRefreshAvailability();
  if (homeComposerToggleBtn) {
    homeComposerToggleBtn.hidden = !isHomeTab;
    homeComposerToggleBtn.style.display = isHomeTab ? "inline-flex" : "none";
  }
  if (profileEditToggleBtn) {
    profileEditToggleBtn.hidden = !isProfileTab;
    profileEditToggleBtn.style.display = isProfileTab ? "inline-flex" : "none";
  }

  if (nextTab === "profile" && profileScrollEl) {
    profileScrollEl.scrollTop = 0;
  }
  if (nextTab === "home") {
    switchHomeFeed(state.customTabs.length ? getDefaultVisibleHomeFeed() : "tags");
  }

  syncTabToLocation(nextTab);
}

function updatePromptPreview() {
  if (!promptPreviewEl) {
    return;
  }
  promptPreviewEl.textContent = buildPrompt(getCurrentSettings(), getCurrentContentFeed());
}

function updateReplyPromptPreview() {
  if (!replyPromptPreviewEl) {
    return;
  }

  const settings = getCurrentSettings();
  const profile = getCurrentProfile();
  const previewPost = getReplyPreviewSeedPost(settings);
  replyPromptPreviewEl.textContent = buildReplyPrompt(
    settings,
    profile,
    previewPost.feedType || state.activeFeed,
    previewPost,
    null,
    settings.replyCount || DEFAULT_REPLY_COUNT
  );
}

function updateInsightPanel() {
  return;
}

function formatMetric(value, fallback) {
  const numeric = Number(value);
  if (Number.isFinite(numeric) && numeric >= 0) {
    return Math.round(numeric);
  }
  return fallback;
}

function parseAudienceSize(value) {
  const source = String(value || "")
    .trim()
    .toLowerCase()
    .replaceAll(",", "");
  if (!source) {
    return 0;
  }

  const match = source.match(/^([\d.]+)\s*([kmbw万亿]?)/i);
  if (!match) {
    return 0;
  }

  const amount = Number.parseFloat(match[1]);
  if (!Number.isFinite(amount)) {
    return 0;
  }

  const unit = match[2];
  const multiplier =
    unit === "k"
      ? 1_000
      : unit === "m"
        ? 1_000_000
        : unit === "b"
          ? 1_000_000_000
          : unit === "w" || unit === "万"
            ? 10_000
            : unit === "亿"
              ? 100_000_000
              : 1;
  return Math.round(amount * multiplier);
}

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function createRefreshedEngagement(post, followerCount) {
  const baseAudience = Math.max(120, followerCount || 0);
  const baseViews = Math.max(
    Number(post.views) || 0,
    Math.round(baseAudience * randomBetween(0.4, 2.8) + randomBetween(60, 480))
  );
  const views = Math.max(
    baseViews,
    (Number(post.views) || 0) + Math.round(baseAudience * randomBetween(0.05, 0.32))
  );
  const likes = Math.max(
    Number(post.likes) || 0,
    Math.round(views * randomBetween(0.04, 0.16))
  );
  const reposts = Math.max(
    Number(post.reposts) || 0,
    Math.round(likes * randomBetween(0.08, 0.24))
  );
  const replies = Math.max(
    Number(post.replies) || 0,
    Math.round(likes * randomBetween(0.05, 0.22))
  );

  return {
    ...post,
    views,
    likes,
    reposts,
    replies
  };
}

function refreshAuthoredPostsEngagement(profile) {
  const followerCount = parseAudienceSize(profile.followers);
  const updatedById = new Map();

  state.profilePosts = state.profilePosts.map((post) => {
    const updatedPost = createRefreshedEngagement(post, followerCount);
    updatedById.set(updatedPost.id, updatedPost);
    return updatedPost;
  });

  Object.keys(state.feeds).forEach((bucketName) => {
    state.feeds[bucketName] = (state.feeds[bucketName] || []).map((post) => {
      if (!post.authorOwned) {
        return post;
      }
      return updatedById.get(post.id) || post;
    });
  });

  persistProfilePosts(state.profilePosts);
  persistFeeds(state.feeds);
}

function dedupePosts(posts) {
  const seen = new Set();
  return posts.filter((post) => {
    if (!post?.id || seen.has(post.id)) {
      return false;
    }
    seen.add(post.id);
    return true;
  });
}

function mergeFeedHistory(existingPosts, incomingPosts, limit = MAX_FEED_ITEMS) {
  const authoredPosts = existingPosts.filter((post) => post.authorOwned);
  const historicalGeneratedPosts = existingPosts.filter((post) => !post.authorOwned);
  return dedupePosts([
    ...authoredPosts,
    ...incomingPosts,
    ...historicalGeneratedPosts
  ]).slice(0, limit);
}

function normalizeDirectionText(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[“”"'‘’`~!@#$%^&*()_+=|\\[\]{}:;,.<>/?，。！？、；：（）【】《》…—-]/g, " ")
    .trim();
}

function extractDirectionKeywords(text) {
  const source = normalizeDirectionText(text);
  if (!source) {
    return [];
  }
  const matches =
    source.match(/[a-z]{3,}|[\u4e00-\u9fff]{2,}|[\u3040-\u30ff]{2,}|[\uac00-\ud7af]{2,}/g) || [];
  return [...new Set(matches)].slice(0, 14);
}

function getPostDirectionSignature(post) {
  const tags = normalizeTags(post?.tags || [], 5)
    .map((tag) => tag.replace(/^#/, "").toLowerCase())
    .filter(Boolean);
  const textKeywords = extractDirectionKeywords(post?.text || "");
  return [...new Set([...tags, ...textKeywords])].slice(0, 16);
}

function computeKeywordOverlap(leftKeywords, rightKeywords) {
  const leftSet = new Set(leftKeywords || []);
  const rightSet = new Set(rightKeywords || []);
  if (!leftSet.size || !rightSet.size) {
    return 0;
  }
  let matches = 0;
  leftSet.forEach((item) => {
    if (rightSet.has(item)) {
      matches += 1;
    }
  });
  return matches / Math.max(leftSet.size, rightSet.size);
}

function isPostDirectionTooSimilar(candidate, references = []) {
  const candidateText = normalizeDirectionText(candidate?.text || "");
  const candidatePrefix = candidateText.slice(0, 88);
  const candidateKeywords = getPostDirectionSignature(candidate);
  const candidatePrimaryTag = normalizeTags(candidate?.tags || [], 1)[0] || "";

  return references.some((reference) => {
    const referenceText = normalizeDirectionText(reference?.text || "");
    const referencePrefix = referenceText.slice(0, 88);
    if (candidatePrefix && referencePrefix && candidatePrefix === referencePrefix) {
      return true;
    }

    const referenceKeywords = getPostDirectionSignature(reference);
    const overlap = computeKeywordOverlap(candidateKeywords, referenceKeywords);
    const referencePrimaryTag = normalizeTags(reference?.tags || [], 1)[0] || "";
    if (candidatePrimaryTag && referencePrimaryTag && candidatePrimaryTag === referencePrimaryTag) {
      return overlap >= 0.52;
    }
    return overlap >= 0.68;
  });
}

function ensureDistinctGeneratedPosts(
  incomingPosts,
  existingPosts,
  settings,
  feedType,
  count = DEFAULT_POST_COUNT
) {
  const historyRefs = (existingPosts || []).filter((post) => !post?.authorOwned).slice(0, 18);
  const chosen = [];

  (incomingPosts || []).forEach((post) => {
    if (!post) {
      return;
    }
    if (isPostDirectionTooSimilar(post, [...historyRefs, ...chosen])) {
      return;
    }
    chosen.push(post);
  });

  if (chosen.length >= count) {
    return chosen.slice(0, count);
  }

  (incomingPosts || []).forEach((post) => {
    if (chosen.length >= count) {
      return;
    }
    if (!chosen.some((item) => item.id === post.id)) {
      chosen.push(post);
    }
  });

  return chosen.slice(0, count);
}

function normalizePost(item, index = 0, fallbackFeedType = DEFAULT_CONTENT_FEED) {
  const [fallbackName, fallbackHandle] = FEED_NAMES[index % FEED_NAMES.length];
  const stableSeed = `${item?.text || ""}-${item?.displayName || fallbackName}-${item?.repostSource?.id || ""}-${index}`;
  const incomingFeedType =
    typeof item?.feedType === "string" ? String(item.feedType).trim() : "";
  const normalizedIncomingFeedType = incomingFeedType === "hot" ? "entertainment" : incomingFeedType;
  const resolvedFallbackFeedType =
    typeof fallbackFeedType === "string" && String(fallbackFeedType).trim()
      ? String(fallbackFeedType).trim()
      : DEFAULT_CONTENT_FEED;
  const normalizedFallbackFeedType =
    resolvedFallbackFeedType === "hot" ? "entertainment" : resolvedFallbackFeedType;
  const resolvedFeedType = normalizedIncomingFeedType || normalizedFallbackFeedType;
  const resolvedTags = getRenderableTags(item, resolvedFeedType);
  const translationZh = String(item?.translationZh || item?.translatedText || "").trim();
  const translatedTags = normalizeTags(item?.translatedTags || item?.translationTags || [], 5);
  const rawText =
    typeof item?.text === "string"
      ? item.text
      : item?.text == null
        ? ""
        : String(item.text);
  const imageDataUrl = String(item?.imageDataUrl || item?.imageUrl || "").trim();
  const repostSource = normalizeRepostSource(item?.repostSource || null, item?.id || "");
  const normalizedText = rawText.trim()
    ? truncate(rawText, MAX_POST_TEXT_LENGTH)
    : imageDataUrl || repostSource
      ? ""
      : "讨论内容生成中。";
  const createdAt = Number(item?.createdAt) || Date.now() + index;
  const rawTime = String(item?.time || "").trim();
  const time =
    Boolean(item?.authorOwned) && createdAt && (!rawTime || rawTime === "刚刚")
      ? formatForumTimestamp(createdAt)
      : rawTime || `${Math.max(1, index + 1)}m`;
  return {
    id: item?.id || `post_${index}_${hashText(stableSeed)}`,
    displayName: truncate(item?.displayName || fallbackName, 28),
    handle: truncate(item?.handle || fallbackHandle, 28),
    text: normalizedText,
    imageDataUrl,
    translationZh: truncate(translationZh, 1200),
    translatedTags,
    tags: resolvedTags,
    replies: formatMetric(item?.replies, 8 + index * 3),
    reposts: formatMetric(item?.reposts, 6 + index * 4),
    likes: formatMetric(item?.likes, 45 + index * 27),
    views: formatMetric(item?.views, 800 + index * 420),
    time,
    createdAt,
    edited: Boolean(item?.edited),
    authorOwned: Boolean(item?.authorOwned),
    feedType: resolvedFeedType,
    repostSource,
    metadata: item?.metadata && typeof item.metadata === "object" ? { ...item.metadata } : {}
  };
}

function renderFeedPost(post, bucketName = state.activeFeed) {
  const actualBucket = bucketName === "tags" ? post.feedType || getCurrentContentFeed() : bucketName;
  const avatarMarkup = post.authorOwned
    ? renderAvatarMarkup(
        truncate(state.profile.avatar || DEFAULT_PROFILE.avatar, 2),
        "avatar",
        state.profile.avatarImage || ""
      )
    : renderAvatarMarkup(post.displayName.slice(0, 2).toUpperCase(), "avatar");
  const tagMarkup = renderPostTags(post, post.feedType || actualBucket);
  const translationMarkup = renderTranslationBlock(post.translationZh, post.translatedTags);
  const mediaMarkup = renderPostMedia(post);
  const repostMarkup = renderRepostSourceBlock(post.repostSource);
  const translateLabel = isPostTranslating(post.id, actualBucket)
    ? "翻译中..."
    : post.translationZh
      ? "重新翻译"
      : "翻译";

  return `
    <article class="post" data-post-id="${escapeHtml(post.id)}">
      <div class="post-shell post-shell--interactive" data-action="open-thread-modal" data-bucket="${escapeHtml(
        actualBucket
      )}" data-post-id="${escapeHtml(post.id)}">
        ${avatarMarkup}
        <div>
          <div class="post-head">
            <strong>${escapeHtml(post.displayName)}</strong>
            <span class="post-handle">${escapeHtml(post.handle)}</span>
            <span class="post-time">· ${escapeHtml(post.time)}</span>
          </div>
          ${post.text ? `<p class="post-text">${escapeHtml(post.text)}</p>` : ""}
          ${repostMarkup}
          ${mediaMarkup}
          ${tagMarkup}
          ${translationMarkup}
          ${renderEditedNote(post)}
          <div class="post-actions">
            <button class="action-link" type="button" data-action="open-thread-modal" data-bucket="${escapeHtml(
              actualBucket
            )}" data-post-id="${escapeHtml(post.id)}">
              查看讨论
            </button>
            <button class="action-link" type="button" data-action="translate-post" data-bucket="${escapeHtml(
              actualBucket
            )}" data-post-id="${escapeHtml(post.id)}" ${
              isPostTranslating(post.id, actualBucket) ? "disabled" : ""
            }>
              ${translateLabel}
            </button>
            <button class="action-link" type="button" data-action="repost-post" data-bucket="${escapeHtml(
              actualBucket
            )}" data-post-id="${escapeHtml(post.id)}">
              转发
            </button>
            <button class="action-link" type="button" data-action="delete-forum-post" data-bucket="${escapeHtml(
              actualBucket
            )}" data-post-id="${escapeHtml(post.id)}">
              删除
            </button>
            <span>回复 ${post.replies}</span>
            <span>转发 ${post.reposts}</span>
            <span>喜欢 ${post.likes}</span>
            <span>浏览 ${post.views}</span>
          </div>
        </div>
      </div>
    </article>
  `;
}

function renderFeed(posts) {
  if (!feedEl) {
    return;
  }
  if (!posts.length) {
    feedEl.innerHTML = `<p class="empty-state">${escapeHtml(
      getFeedLabel(state.activeFeed)
    )} 还没有内容，请先刷新当前分页签。</p>`;
    return;
  }

  feedEl.innerHTML = posts.map((post) => renderFeedPost(post, state.activeFeed)).join("");
}

function getTagStatisticBuckets() {
  return Object.keys(state.feeds).filter(
    (key) => isTimelineFeed(key) && Array.isArray(state.feeds[key])
  );
}

function buildPopularTagStats() {
  const counts = new Map();
  const bucketNames = getTagStatisticBuckets();
  bucketNames.forEach((bucketName) => {
    (state.feeds[bucketName] || []).forEach((post) => {
      getRenderableTags(post, bucketName).forEach((tag) => {
        const current = counts.get(tag) || { tag, total: 0, feeds: {} };
        current.total += 1;
        current.feeds[bucketName] = (current.feeds[bucketName] || 0) + 1;
        counts.set(tag, current);
      });
    });
  });

  return [...counts.values()].sort((left, right) => {
    if (right.total !== left.total) {
      return right.total - left.total;
    }
    return left.tag.localeCompare(right.tag, "zh-CN");
  });
}

function renderPopularTags() {
  if (!feedEl) {
    return;
  }
  if (state.activeTagFilter) {
    const filteredPosts = getTagFilteredPosts(state.activeTagFilter);
    feedEl.innerHTML = `
      <section class="tag-filter-shell">
        <div class="tag-filter-shell__head">
          <button class="ghost-chip" type="button" data-action="clear-tag-filter">返回标签列表</button>
          <div>
            <strong class="post-tag">${escapeHtml(state.activeTagFilter)}</strong>
            <p class="tag-stat-meta">当前缓存中共命中 ${escapeHtml(String(filteredPosts.length))} 条讨论。</p>
          </div>
        </div>
      </section>
      ${filteredPosts.length ? filteredPosts.map((post) => renderFeedPost(post, "tags")).join("") : '<p class="empty-state">当前标签下还没有讨论内容。</p>'}
    `;
    return;
  }

  const tagStats = buildPopularTagStats();
  if (!tagStats.length) {
    feedEl.innerHTML =
      '<p class="empty-state">当前缓存里还没有可统计的标签，请先刷新首页或先创建自定义页签内容。</p>';
    return;
  }

  feedEl.innerHTML = `
    <section class="tag-stats-list">
      ${tagStats
        .map((item, index) => {
          const feedSummary = Object.entries(item.feeds || {})
            .filter(([feedId]) => feedId !== DEFAULT_CONTENT_FEED)
            .map(([feedId, total]) => `${escapeHtml(getFeedLabel(feedId))} ${escapeHtml(String(total))} 条`)
            .join(" · ");
          const tagLabel = `${item.tag}${index === 0 ? " 🔥" : ""}`;
          const feedSummaryMarkup = feedSummary
            ? `<p class="tag-stat-meta">${feedSummary}</p>`
            : "";
          return `
            <article class="tag-stat-card" data-action="open-tag-feed" data-tag="${escapeHtml(item.tag)}">
              <div class="tag-stat-card__head">
                <strong class="post-tag">${escapeHtml(tagLabel)}</strong>
                <span class="badge">${escapeHtml(String(item.total))} 条</span>
              </div>
              ${feedSummaryMarkup}
            </article>
          `;
        })
        .join("")}
    </section>
  `;
}

function getDiscussionBucket(bucketName = state.activeFeed) {
  if (!state.discussions[bucketName]) {
    state.discussions[bucketName] = {};
  }
  return state.discussions[bucketName];
}

function getPostThreadState(postId, bucketName = state.activeFeed) {
  const directThreadState = getDiscussionBucket(bucketName)[postId] || null;
  if (directThreadState) {
    return directThreadState;
  }

  const post = findPostById(postId, bucketName);
  if (!post?.authorOwned) {
    return null;
  }

  if (bucketName !== "profile") {
    return getDiscussionBucket("profile")[postId] || null;
  }

  const resolvedFeedType = normalizePersistedFeedType(post.feedType, DEFAULT_CONTENT_FEED);
  if (resolvedFeedType && resolvedFeedType !== "profile") {
    return getDiscussionBucket(resolvedFeedType)[postId] || null;
  }

  return null;
}

function syncDiscussionModalBodyLock() {
  document.body.style.overflow = state.threadModalOpen || state.threadShareModalOpen ? "hidden" : "";
}

function extractStoredContactEntries() {
  const parsed = readStoredJson(MESSAGE_CONTACTS_KEY, []);
  if (Array.isArray(parsed)) {
    return parsed.filter((item) => item && typeof item === "object");
  }
  if (Array.isArray(parsed?.contacts)) {
    return parsed.contacts.filter((item) => item && typeof item === "object");
  }
  return [];
}

function extractStoredConversationEntries() {
  const parsed =
    readStoredJson(MESSAGE_THREADS_KEY, null) ?? readStoredJson(DIRECT_MESSAGES_KEY, []);
  return Array.isArray(parsed) ? parsed.filter((item) => item && typeof item === "object") : [];
}

function resolveStoredConversationStorageKey() {
  if (safeGetItem(MESSAGE_THREADS_KEY)) {
    return MESSAGE_THREADS_KEY;
  }
  if (safeGetItem(DIRECT_MESSAGES_KEY)) {
    return DIRECT_MESSAGES_KEY;
  }
  return MESSAGE_THREADS_KEY;
}

function cloneStoredConversationEntries(entries = []) {
  return (Array.isArray(entries) ? entries : []).map((conversation) => ({
    ...(conversation && typeof conversation === "object" ? conversation : {}),
    messages: Array.isArray(conversation?.messages)
      ? conversation.messages.map((message) => ({
          ...(message && typeof message === "object" ? message : {})
        }))
      : []
  }));
}

function normalizeStoredConversationVideoMediaPayload(payload = {}) {
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

function loadStoredConversationVideoMediaMap() {
  return normalizeStoredConversationVideoMediaPayload(readStoredJson(MESSAGE_VIDEO_MEDIA_KEY, {}));
}

function persistStoredConversationVideoMediaMap(payload = {}) {
  const normalized = normalizeStoredConversationVideoMediaPayload(payload);
  return safeSetItem(MESSAGE_VIDEO_MEDIA_KEY, JSON.stringify(normalized));
}

function migrateStoredConversationVideoMedia(entries = []) {
  const sourceEntries = cloneStoredConversationEntries(entries);
  let mediaMap = loadStoredConversationVideoMediaMap();
  let hasLegacyMedia = false;
  let mediaChanged = false;

  const nextEntries = sourceEntries.map((conversation) => {
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
    delete conversation.videoContactImage;
    delete conversation.videoUserImage;
    return conversation;
  });

  return {
    entries: nextEntries,
    hasLegacyMedia,
    mediaChanged,
    mediaMap,
    mediaPersisted: mediaChanged ? persistStoredConversationVideoMediaMap(mediaMap) : true
  };
}

function buildStoredConversationImageFallbackText(description = "") {
  const resolvedDescription = String(description || "").trim();
  return ["[图片消息]", resolvedDescription ? `图片说明：${resolvedDescription}` : ""]
    .filter(Boolean)
    .join("\n");
}

function trimStoredConversationMessagesForShare(entries = []) {
  return cloneStoredConversationEntries(entries).map((conversation) => {
    if (conversation.messages.length > CHAT_SHARE_STORAGE_SOFT_MESSAGE_LIMIT) {
      conversation.messages = conversation.messages.slice(-CHAT_SHARE_STORAGE_SOFT_MESSAGE_LIMIT);
    }
    return conversation;
  });
}

function stripStoredConversationImagePayloads(
  entries = [],
  keepCount = CHAT_SHARE_STORAGE_IMAGE_KEEP_COUNT
) {
  const normalizedKeepCount = Math.max(0, Number.parseInt(String(keepCount || 0), 10) || 0);
  return cloneStoredConversationEntries(entries).map((conversation) => {
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
        text:
          String(message?.text || "").trim() ||
          buildStoredConversationImageFallbackText(String(message?.imageDescription || "").trim())
      };
    });
    return conversation;
  });
}

function pruneOldestStoredConversationBatch(entries = []) {
  const candidates = (Array.isArray(entries) ? entries : [])
    .filter((conversation) => Array.isArray(conversation?.messages))
    .filter((conversation) => conversation.messages.length > CHAT_SHARE_STORAGE_MIN_MESSAGE_LIMIT)
    .sort(
      (left, right) =>
        (Number(left?.updatedAt) || 0) - (Number(right?.updatedAt) || 0) ||
        (left.messages.length || 0) - (right.messages.length || 0)
    );

  const target = candidates[0] || null;
  if (!target) {
    return false;
  }

  const removableCount = Math.max(
    1,
    Math.min(
      12,
      target.messages.length - CHAT_SHARE_STORAGE_MIN_MESSAGE_LIMIT,
      Math.ceil(target.messages.length / 12)
    )
  );
  target.messages = target.messages.slice(removableCount);
  const latestMessage = target.messages[target.messages.length - 1] || null;
  target.updatedAt = Number(latestMessage?.createdAt) || Date.now();
  return true;
}

function relieveChatStorageForThreadShare(inboxEntries = [], options = {}) {
  const relieveOptions = options && typeof options === "object" ? options : {};
  const storageKey = resolveStoredConversationStorageKey();
  const currentPayload = String(safeGetItem(storageKey) || "[]");
  const storedConversations = extractStoredConversationEntries();
  if (!storedConversations.length) {
    return true;
  }

  const inboxPayloadLength = JSON.stringify(Array.isArray(inboxEntries) ? inboxEntries : []).length;
  const targetChars = Math.max(
    CHAT_SHARE_STORAGE_MIN_MESSAGE_LIMIT * 100,
    CHAT_SHARE_STORAGE_TARGET_CHARS -
      Math.max(THREAD_SHARE_STORAGE_RESERVE_CHARS, inboxPayloadLength * 2)
  );
  if (!relieveOptions.force && currentPayload.length <= targetChars) {
    return true;
  }

  const migratedVideoMedia = migrateStoredConversationVideoMedia(
    trimStoredConversationMessagesForShare(storedConversations)
  );
  let nextConversations = migratedVideoMedia.entries;
  let payload = JSON.stringify(nextConversations);
  let attemptedAggressiveImageStrip = false;

  if (payload.length > targetChars) {
    nextConversations = stripStoredConversationImagePayloads(nextConversations);
    payload = JSON.stringify(nextConversations);
  }

  while (payload.length > targetChars) {
    const changed = pruneOldestStoredConversationBatch(nextConversations);
    if (!changed) {
      break;
    }
    payload = JSON.stringify(nextConversations);
  }

  let persisted = safeSetItem(storageKey, payload);
  if (persisted && migratedVideoMedia.mediaChanged && !migratedVideoMedia.mediaPersisted) {
    migratedVideoMedia.mediaPersisted = persistStoredConversationVideoMediaMap(
      migratedVideoMedia.mediaMap
    );
  }
  while (!persisted) {
    if (!attemptedAggressiveImageStrip) {
      const strippedConversations = stripStoredConversationImagePayloads(nextConversations, 0);
      const strippedPayload = JSON.stringify(strippedConversations);
      attemptedAggressiveImageStrip = true;
      if (strippedPayload !== payload) {
        nextConversations = strippedConversations;
        payload = strippedPayload;
        persisted = safeSetItem(storageKey, payload);
        if (persisted) {
          break;
        }
      }
    }

    const changed = pruneOldestStoredConversationBatch(nextConversations);
    if (!changed) {
      break;
    }
    payload = JSON.stringify(nextConversations);
    persisted = safeSetItem(storageKey, payload);
    if (persisted && migratedVideoMedia.mediaChanged && !migratedVideoMedia.mediaPersisted) {
      migratedVideoMedia.mediaPersisted = persistStoredConversationVideoMediaMap(
        migratedVideoMedia.mediaMap
      );
    }
  }

  if (persisted && migratedVideoMedia.mediaChanged && !migratedVideoMedia.mediaPersisted) {
    console.warn("[Pulse Forum] Failed to persist migrated video media after relieving chat storage.");
  }

  return persisted;
}

function getChatShareAvatarFallback(source = {}) {
  const name = String(source.name || source.contactNameSnapshot || "聊天").trim();
  return name.slice(0, 2) || "聊";
}

function normalizeChatShareTarget(source, index = 0, kind = "contact") {
  const item = source && typeof source === "object" ? source : {};
  const contactId =
    kind === "conversation"
      ? String(item.contactId || "").trim()
      : String(item.id || item.contactId || "").trim();
  const conversationId = kind === "conversation" ? String(item.id || "").trim() : "";
  const name =
    String(
      kind === "conversation"
        ? item.contactNameSnapshot || item.name || item.contactName
        : item.name || item.contactNameSnapshot
    ).trim() || `聊天对象 ${index + 1}`;
  if (!contactId && !conversationId) {
    return null;
  }
  return {
    id:
      conversationId ||
      contactId ||
      `thread_share_target_${index}_${hashText(`${name}_${kind}`)}`,
    contactId,
    conversationId,
    name,
    avatarImage: String(
      kind === "conversation"
        ? item.contactAvatarImageSnapshot || item.avatarImage || ""
        : item.avatarImage || ""
    ).trim(),
    avatarText: String(
      kind === "conversation"
        ? item.contactAvatarTextSnapshot || item.avatarText || getChatShareAvatarFallback({ name })
        : item.avatarText || getChatShareAvatarFallback({ name })
    ).trim() || getChatShareAvatarFallback({ name }),
    updatedAt: Number(item.updatedAt) || Date.now(),
    hasConversation: Boolean(conversationId)
  };
}

function loadChatShareTargets() {
  const contactTargets = extractStoredContactEntries()
    .map((item, index) => normalizeChatShareTarget(item, index, "contact"))
    .filter(Boolean);
  const conversationTargets = extractStoredConversationEntries()
    .map((item, index) => normalizeChatShareTarget(item, index, "conversation"))
    .filter(Boolean);
  const merged = new Map();

  conversationTargets.forEach((target) => {
    const key = target.contactId || `conversation:${target.conversationId}`;
    merged.set(key, { ...target });
  });

  contactTargets.forEach((target) => {
    const key = target.contactId || `contact:${target.id}`;
    const existing = merged.get(key);
    if (!existing) {
      merged.set(key, { ...target });
      return;
    }
    merged.set(key, {
      ...existing,
      contactId: existing.contactId || target.contactId,
      name: target.name || existing.name,
      avatarImage: target.avatarImage || existing.avatarImage,
      avatarText: target.avatarText || existing.avatarText,
      updatedAt: Math.max(existing.updatedAt || 0, target.updatedAt || 0)
    });
  });

  return [...merged.values()].sort((left, right) => (right.updatedAt || 0) - (left.updatedAt || 0));
}

function sanitizeDiscussionShareRepostSource(repostSource) {
  const source = normalizeRepostSource(repostSource);
  if (!source) {
    return null;
  }
  return {
    id: String(source.id || "").trim(),
    displayName: String(source.displayName || "论坛用户").trim() || "论坛用户",
    handle: String(source.handle || "@forum_user").trim() || "@forum_user",
    time: String(source.time || "").trim(),
    text: String(source.text || "").trim().slice(0, MAX_POST_TEXT_LENGTH),
    imageHint: source.imageDataUrl ? "这条被引用的帖子附带图片。" : "",
    tags: Array.isArray(source.tags) ? source.tags.slice(0, 5) : []
  };
}

function countDiscussionShareReplies(replies = []) {
  return (Array.isArray(replies) ? replies : []).reduce((total, reply) => {
    return total + 1 + countDiscussionShareReplies(reply?.children || []);
  }, 0);
}

function sanitizeDiscussionShareReply(reply, budget, depth = 1) {
  if (!reply || typeof reply !== "object" || !budget || budget.remaining <= 0) {
    return null;
  }
  const text = String(reply.text || "").trim();
  const imageHint = reply.imageDataUrl ? "这条回复附带图片。" : "";
  if (!text && !imageHint) {
    return null;
  }
  budget.remaining -= 1;
  const children = [];
  (Array.isArray(reply.children) ? reply.children : []).forEach((childReply) => {
    const nextChild = sanitizeDiscussionShareReply(childReply, budget, depth + 1);
    if (nextChild) {
      children.push(nextChild);
    }
  });
  return {
    id: String(reply.id || `discussion_share_reply_${budget.remaining}_${hashText(text)}`),
    displayName: String(reply.displayName || "论坛用户").trim() || "论坛用户",
    handle: String(reply.handle || "@forum_user").trim() || "@forum_user",
    time: String(reply.time || "").trim(),
    text: text.slice(0, MAX_REPLY_TEXT_LENGTH),
    imageHint,
    depth,
    children
  };
}

function buildDiscussionSharePayload(post, bucketName = state.threadModalBucket || state.activeFeed) {
  const resolvedBucket = resolveThreadBucketName(bucketName, post);
  const threadState = getPostThreadState(post.id, resolvedBucket);
  const budget = { remaining: DISCUSSION_SHARE_REPLY_NODE_LIMIT };
  const replies = (Array.isArray(threadState?.replies) ? threadState.replies : [])
    .map((reply) => sanitizeDiscussionShareReply(reply, budget, 1))
    .filter(Boolean);
  const totalLoadedReplyCount = countDiscussionShareReplies(threadState?.replies || []);
  const includedReplyCount = countDiscussionShareReplies(replies);
  return {
    id: `discussion_share_${Date.now()}_${hashText(`${resolvedBucket}_${post.id}`)}`,
    sourceType: "forum_discussion",
    sharedAt: Date.now(),
    bucketName: resolvedBucket,
    feedLabel: getFeedLabel(resolvedBucket),
    postId: String(post.id || "").trim(),
    rootPost: {
      id: String(post.id || "").trim(),
      displayName: String(post.displayName || "论坛用户").trim() || "论坛用户",
      handle: String(post.handle || "@forum_user").trim() || "@forum_user",
      time: String(post.time || "").trim(),
      text: String(post.text || "").trim().slice(0, MAX_POST_TEXT_LENGTH),
      imageHint: post.imageDataUrl ? "这条主贴附带图片。" : "",
      tags: getRenderableTags(post, post.feedType || resolvedBucket).slice(0, 5),
      repostSource: sanitizeDiscussionShareRepostSource(post.repostSource)
    },
    replies,
    replyCount: includedReplyCount,
    truncatedReplyCount: Math.max(0, totalLoadedReplyCount - includedReplyCount)
  };
}

function loadMessageShareInbox() {
  const parsed = readStoredJson(MESSAGE_SHARE_INBOX_KEY, []);
  return Array.isArray(parsed)
    ? parsed
        .filter((item) => item && typeof item === "object")
        .map((item) => ({
          ...item,
          targetAvatarImageSnapshot: ""
        }))
    : [];
}

function persistMessageShareInbox(entries = []) {
  return safeSetItem(
    MESSAGE_SHARE_INBOX_KEY,
    JSON.stringify(Array.isArray(entries) ? entries : [])
  );
}

function setThreadShareStatus(message = "", tone = "") {
  if (!threadShareStatusEl) {
    return;
  }
  threadShareStatusEl.textContent = String(message || "");
  threadShareStatusEl.className = "thread-share-status";
  if (tone) {
    threadShareStatusEl.classList.add(tone);
  }
}

function renderThreadShareModal() {
  if (!threadShareListEl) {
    return;
  }
  const targets = loadChatShareTargets();
  if (!targets.length) {
    threadShareListEl.innerHTML =
      '<div class="thread-share-empty">当前还没有可转发的聊天对象。<br />请先到 Chat 中创建联系人或发起会话。</div>';
    return;
  }

  threadShareListEl.innerHTML = targets
    .map(
      (target) => `
        <button
          class="thread-share-row"
          type="button"
          data-action="share-thread-to-chat"
          data-target-contact-id="${escapeHtml(target.contactId || "")}"
          data-target-conversation-id="${escapeHtml(target.conversationId || "")}"
          ${state.threadShareSubmitting ? "disabled" : ""}
        >
          ${renderAvatarMarkup(target.avatarText, "thread-share-row__avatar", target.avatarImage)}
          <div class="thread-share-row__body">
            <strong>${escapeHtml(target.name)}</strong>
            <span>${escapeHtml(target.hasConversation ? "已有聊天记录" : "转发后会新建聊天")}</span>
          </div>
          <span class="thread-share-row__arrow">发送</span>
        </button>
      `
    )
    .join("");
}

function setThreadShareModalOpen(isOpen) {
  state.threadShareModalOpen = Boolean(isOpen);
  if (threadShareModalEl) {
    threadShareModalEl.classList.toggle("hidden", !state.threadShareModalOpen);
    threadShareModalEl.setAttribute("aria-hidden", String(!state.threadShareModalOpen));
  }
  if (state.threadShareModalOpen) {
    renderThreadShareModal();
    setThreadShareStatus("将当前主贴和已加载回复转发到聊天。");
  } else {
    state.threadShareSubmitting = false;
    setThreadShareStatus("");
  }
  syncDiscussionModalBodyLock();
}

function shareCurrentThreadToChat(targetConversationId = "", targetContactId = "") {
  const post = findPostById(state.threadModalPostId, state.threadModalBucket);
  if (!post) {
    setThreadShareStatus("未找到要转发的帖子。", "error");
    return;
  }
  const payload = buildDiscussionSharePayload(post, state.threadModalBucket);
  const target = loadChatShareTargets().find((item) => {
    return (
      String(item.conversationId || "").trim() === String(targetConversationId || "").trim() &&
      String(targetConversationId || "").trim()
    ) || (
      String(item.contactId || "").trim() === String(targetContactId || "").trim() &&
      !String(targetConversationId || "").trim()
    );
  });
  if (!target) {
    setThreadShareStatus("未找到目标聊天对象，请刷新后重试。", "error");
    return;
  }

  state.threadShareSubmitting = true;
  renderThreadShareModal();
  const inbox = loadMessageShareInbox();
  inbox.push({
    id: `discussion_share_inbox_${Date.now()}_${hashText(`${target.id}_${payload.id}`)}`,
    createdAt: Date.now(),
    targetConversationId: String(target.conversationId || "").trim(),
    targetContactId: String(target.contactId || "").trim(),
    targetNameSnapshot: target.name,
    targetAvatarTextSnapshot: target.avatarText || "",
    payload
  });
  const trimmedInbox = inbox.slice(-THREAD_SHARE_INBOX_LIMIT);
  relieveChatStorageForThreadShare(trimmedInbox);
  let persisted = persistMessageShareInbox(trimmedInbox);
  if (!persisted) {
    const relieved = relieveChatStorageForThreadShare(trimmedInbox, { force: true });
    if (relieved) {
      persisted = persistMessageShareInbox(trimmedInbox);
    }
  }
  state.threadShareSubmitting = false;
  renderThreadShareModal();
  if (!persisted) {
    setThreadShareStatus("转发失败：聊天存储空间不足，请先清理部分聊天或图片后重试。", "error");
    return;
  }
  setThreadShareStatus(`已转发到 ${target.name} 的聊天。`, "success");
  window.setTimeout(() => {
    setThreadShareModalOpen(false);
  }, 220);
}

function renderPostDiscussion(post, bucketName = state.activeFeed) {
  const threadState = getPostThreadState(post.id, bucketName);
  if (!threadState?.expanded) {
    return "";
  }

  if (threadState.loading) {
    return '<section class="thread-panel"><p class="thread-loading">正在生成相关回复…</p></section>';
  }

  if (!threadState.replies?.length) {
    return '<section class="thread-panel"><p class="thread-empty">这条讨论暂时还没有回复。</p></section>';
  }

  return `
    <section class="thread-panel">
      ${renderReplyBranch(post.id, threadState.replies, bucketName)}
    </section>
  `;
}

function renderReplyBranch(postId, replies, bucketName = state.activeFeed, depth = 1) {
  return replies
    .map((reply) => {
      const toggleLabel = reply.expanded ? "收起回复" : "展开回复";
      const nestedBlock = reply.expanded
        ? reply.loading
          ? '<div class="reply-children"><p class="thread-loading">正在生成楼中楼回复…</p></div>'
          : reply.children?.length
            ? `<div class="reply-children">${renderReplyBranch(
                postId,
                reply.children,
                bucketName,
                depth + 1
              )}</div>`
            : '<div class="reply-children"><p class="thread-empty">这层回复暂时还没有新内容。</p></div>'
        : "";

      return `
        <article class="reply-card" data-reply-id="${escapeHtml(reply.id)}" data-depth="${depth}">
          <div class="reply-shell">
            <div class="reply-avatar">${escapeHtml(reply.displayName.slice(0, 2).toUpperCase())}</div>
            <div>
              <div class="post-head">
                <strong>${escapeHtml(reply.displayName)}</strong>
                <span class="post-handle">${escapeHtml(reply.handle)}</span>
                <span class="post-time">· ${escapeHtml(reply.time)}</span>
              </div>
              <p class="reply-text">${escapeHtml(reply.text)}</p>
              <div class="reply-actions">
                <button
                  class="action-link"
                  type="button"
                  data-action="toggle-reply"
                  data-bucket="${escapeHtml(bucketName)}"
                  data-post-id="${escapeHtml(postId)}"
                  data-reply-id="${escapeHtml(reply.id)}"
                >
                  ${toggleLabel}
                </button>
                <span>回复 ${reply.replies}</span>
                <span>喜欢 ${reply.likes}</span>
              </div>
              ${nestedBlock}
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

function resolveThreadBucketName(bucketName, post) {
  const normalizedPostFeed = normalizePersistedFeedType(
    post?.feedType,
    getCurrentContentFeed()
  );
  if (bucketName === "tags") {
    return normalizedPostFeed;
  }
  if (bucketName === "profile" && post?.feedType && normalizedPostFeed !== "profile") {
    return normalizedPostFeed;
  }
  if (bucketName === "hot") {
    return "entertainment";
  }
  return bucketName || state.activeFeed;
}

function resetThreadReplyComposer() {
  state.threadReplyTargetType = "";
  state.threadReplyTargetId = "";
  state.threadReplyDraft = "";
  state.threadReplyStatus = "";
  state.threadReplyStatusTone = "";
  state.threadReplySubmitting = false;
}

function setThreadReplyStatus(message, tone = "") {
  state.threadReplyStatus = String(message || "");
  state.threadReplyStatusTone = tone;
}

function isThreadReplyComposerActive(targetType, targetId) {
  return (
    state.threadReplyTargetType === targetType &&
    state.threadReplyTargetId === String(targetId || "")
  );
}

function focusThreadReplyComposer() {
  if (!threadModalEl) {
    return;
  }
  window.setTimeout(() => {
    const activeComposer = threadModalEl.querySelector(".reply-composer textarea");
    if (activeComposer instanceof HTMLTextAreaElement) {
      activeComposer.focus();
      activeComposer.setSelectionRange(activeComposer.value.length, activeComposer.value.length);
    }
  }, 0);
}

function toggleThreadReplyComposer(targetType, targetId) {
  if (state.threadReplySubmitting) {
    return;
  }

  const resolvedTargetId = String(targetId || "");
  const shouldClose = isThreadReplyComposerActive(targetType, resolvedTargetId);
  if (shouldClose) {
    resetThreadReplyComposer();
    renderThreadModal();
    return;
  }

  state.threadReplyTargetType = targetType;
  state.threadReplyTargetId = resolvedTargetId;
  state.threadReplyDraft = "";
  setThreadReplyStatus("");
  renderThreadModal();
  focusThreadReplyComposer();
}

function renderReplyAvatarMarkup(reply) {
  if (reply?.authorOwned) {
    return renderAvatarMarkup(
      truncate(state.profile.avatar || DEFAULT_PROFILE.avatar, 2),
      "reply-avatar",
      state.profile.avatarImage || ""
    );
  }
  return `<div class="reply-avatar">${escapeHtml(
    String(reply?.displayName || "回复").slice(0, 2).toUpperCase()
  )}</div>`;
}

function createAuthoredReply(content, seed = "") {
  const profile = getCurrentProfile();
  const createdAt = Date.now();
  const reply = normalizeReply(
    {
      id: `reply_self_${createdAt}_${hashText(`${seed}-${content}`)}`,
      displayName: profile.username,
      handle: normalizeProfileUserId(profile.userId, profile.username),
      text: content,
      likes: 0,
      replies: 0,
      time: formatForumTimestamp(createdAt),
      createdAt,
      children: []
    },
    0,
    `self_${seed}`
  );
  reply.authorOwned = true;
  reply.children = [];
  reply.expanded = false;
  reply.loading = false;
  return reply;
}

function renderThreadReplyComposer(postId, bucketName, parentReply = null) {
  const targetType = parentReply ? "reply" : "post";
  const targetId = parentReply ? parentReply.id : postId;
  if (!isThreadReplyComposerActive(targetType, targetId)) {
    return "";
  }

  const profile = getCurrentProfile();
  const resolvedName = profile.username || DEFAULT_PROFILE.username;
  const resolvedHandle = normalizeProfileUserId(profile.userId, resolvedName);
  const targetLabel = parentReply
    ? `回复 ${parentReply.displayName}${parentReply.handle ? ` ${parentReply.handle}` : ""}`
    : "回复这条帖子";
  const personaHint = truncate(profile.personaPrompt || DEFAULT_PROFILE.personaPrompt, 42);

  return `
    <form
      class="reply-composer"
      data-post-id="${escapeHtml(postId)}"
      data-bucket="${escapeHtml(bucketName)}"
      data-target-type="${escapeHtml(targetType)}"
      data-target-id="${escapeHtml(targetId)}"
      ${parentReply ? `data-parent-reply-id="${escapeHtml(parentReply.id)}"` : ""}
    >
      <div class="reply-composer__head">
        ${renderAvatarMarkup(
          truncate(profile.avatar || DEFAULT_PROFILE.avatar, 2),
          "reply-avatar",
          profile.avatarImage || ""
        )}
        <div class="reply-composer__identity">
          <strong>${escapeHtml(resolvedName)}</strong>
          <span class="post-handle">${escapeHtml(resolvedHandle)}</span>
        </div>
      </div>
      <p class="reply-composer__meta">
        ${escapeHtml(targetLabel)} · 将沿用个人主页的人设风格：${escapeHtml(personaHint)}
      </p>
      <textarea
        data-thread-reply-input="true"
        rows="4"
        maxlength="600"
        placeholder="${escapeHtml(targetLabel)}…"
        ${state.threadReplySubmitting ? "disabled" : ""}
      >${escapeHtml(state.threadReplyDraft)}</textarea>
      ${
        state.threadReplyStatus
          ? `<p class="status-text${state.threadReplyStatusTone ? ` ${escapeHtml(
              state.threadReplyStatusTone
            )}` : ""}">${escapeHtml(state.threadReplyStatus)}</p>`
          : ""
      }
      <div class="reply-composer__actions">
        <button class="ghost-chip" type="button" data-action="cancel-thread-reply" ${
          state.threadReplySubmitting ? "disabled" : ""
        }>
          取消
        </button>
        <button class="solid-button reply-composer__submit" type="submit" ${
          state.threadReplySubmitting ? "disabled" : ""
        }>
          ${state.threadReplySubmitting ? "发送中..." : "发送回复"}
        </button>
      </div>
    </form>
  `;
}

function submitThreadReply(postId, bucketName, parentReplyId = "") {
  const content = state.threadReplyDraft.trim();
  if (!content) {
    setThreadReplyStatus("请输入回复内容后再发送。", "error");
    renderThreadModal();
    focusThreadReplyComposer();
    return;
  }

  const post = findPostById(postId, bucketName);
  if (!post) {
    setHomeStatus("未找到要回复的帖子。", "error");
    return;
  }

  const resolvedBucket = resolveThreadBucketName(bucketName, post);
  const bucket = getDiscussionBucket(resolvedBucket);
  const threadState = bucket[postId]
    ? bucket[postId]
    : {
        ...(getPostThreadState(postId, bucketName) || {
          expanded: true,
          loading: false,
          replies: []
        })
      };
  bucket[postId] = threadState;

  state.threadReplySubmitting = true;
  renderThreadModal();

  const newReply = createAuthoredReply(content, `${postId}-${parentReplyId || "root"}`);

  if (parentReplyId) {
    const parentReply = findReplyNode(threadState.replies || [], parentReplyId);
    if (!parentReply) {
      state.threadReplySubmitting = false;
      setThreadReplyStatus("未找到要回复的楼层，请重试。", "error");
      renderThreadModal();
      focusThreadReplyComposer();
      return;
    }
    parentReply.children = [newReply, ...(parentReply.children || [])];
    parentReply.expanded = true;
    parentReply.loading = false;
    parentReply.replies = Math.max(0, Number(parentReply.replies) || 0) + 1;
  } else {
    threadState.replies = [newReply, ...(threadState.replies || [])];
  }

  threadState.expanded = true;
  threadState.loading = false;
  updatePostAcrossBuckets(postId, (currentPost) => ({
    ...currentPost,
    replies: Math.max(0, Number(currentPost.replies) || 0) + 1
  }));
  syncDiscussionForAuthoredPost(post, resolvedBucket, postId, threadState);
  persistDiscussions();

  resetThreadReplyComposer();
  setHomeStatus("回复已发送。", "success");
  renderActiveFeed();
  renderProfilePage();
  renderThreadModal();
}

function renderThreadModalReplyCard(reply, bucketName, postId, depth = 1) {
  const translationMarkup = renderTranslationBlock(reply.translationZh);
  const isLoading = isReplyTranslating(postId, reply.id, bucketName);
  const translateLabel = isLoading
    ? "翻译中..."
    : reply.translationZh
      ? "重新翻译"
      : "翻译";
  const toggleLabel = reply.expanded ? "收起回复" : "展开回复";
  const replyComposerMarkup = renderThreadReplyComposer(postId, bucketName, reply);
  const replyComposerLabel = isThreadReplyComposerActive("reply", reply.id) ? "取消回复" : "回复";
  const nestedBlock = reply.expanded
    ? reply.loading
      ? '<div class="reply-children"><p class="thread-loading">正在加载回复…</p></div>'
      : reply.children?.length
        ? `<div class="reply-children">${reply.children
            .map((childReply) =>
              renderThreadModalReplyCard(childReply, bucketName, postId, depth + 1)
            )
            .join("")}</div>`
        : '<div class="reply-children"><p class="thread-empty">这层回复暂时还没有新内容。</p></div>'
    : "";

  return `
    <article class="reply-card" data-reply-id="${escapeHtml(reply.id)}" data-depth="${depth}">
      <div class="reply-shell">
        ${renderReplyAvatarMarkup(reply)}
        <div>
          <div class="post-head">
            <strong>${escapeHtml(reply.displayName)}</strong>
            <span class="post-handle">${escapeHtml(reply.handle)}</span>
            <span class="post-time">· ${escapeHtml(reply.time)}</span>
          </div>
          <p class="reply-text">${escapeHtml(reply.text)}</p>
          ${translationMarkup}
          <div class="reply-actions">
            <button class="action-link" type="button" data-action="toggle-thread-reply-composer" data-target-type="reply" data-target-id="${escapeHtml(
              reply.id
            )}" ${reply.loading ? "disabled" : ""}>
              ${replyComposerLabel}
            </button>
            <button class="action-link" type="button" data-action="toggle-reply" data-bucket="${escapeHtml(
              bucketName
            )}" data-post-id="${escapeHtml(postId)}" data-reply-id="${escapeHtml(reply.id)}">
              ${toggleLabel}
            </button>
            <button class="action-link" type="button" data-action="translate-reply" data-bucket="${escapeHtml(
              bucketName
            )}" data-post-id="${escapeHtml(postId)}" data-reply-id="${escapeHtml(reply.id)}" ${
              isLoading ? "disabled" : ""
            }>
              ${translateLabel}
            </button>
            <button class="action-link" type="button" data-action="delete-forum-reply" data-bucket="${escapeHtml(
              bucketName
            )}" data-post-id="${escapeHtml(postId)}" data-reply-id="${escapeHtml(reply.id)}">
              删除
            </button>
            <span>回复 ${reply.replies}</span>
            <span>喜欢 ${reply.likes}</span>
          </div>
          ${replyComposerMarkup}
          ${nestedBlock}
        </div>
      </div>
    </article>
  `;
}

function renderThreadModalRootPost(post, bucketName, threadState = null) {
  if (!threadModalRootEl) {
    return;
  }
  const avatarMarkup = post.authorOwned
    ? renderAvatarMarkup(
        truncate(state.profile.avatar || DEFAULT_PROFILE.avatar, 2),
        "avatar",
        state.profile.avatarImage || ""
      )
    : renderAvatarMarkup(post.displayName.slice(0, 2).toUpperCase(), "avatar");
  const tagMarkup = renderPostTags(post, post.feedType || bucketName);
  const translationMarkup = renderTranslationBlock(post.translationZh, post.translatedTags);
  const mediaMarkup = renderPostMedia(post);
  const repostMarkup = renderRepostSourceBlock(post.repostSource);
  const isLoading = isPostTranslating(post.id, bucketName);
  const translateLabel = isLoading ? "翻译中..." : post.translationZh ? "重新翻译" : "翻译";
  const canReply = Boolean(threadState) && !threadState.loading;
  const replyComposerMarkup = renderThreadReplyComposer(post.id, bucketName);
  const replyComposerLabel = isThreadReplyComposerActive("post", post.id) ? "取消回复" : "回复";
  threadModalRootEl.innerHTML = `
    <div class="post-shell">
      ${avatarMarkup}
      <div>
        <div class="post-head">
          <strong>${escapeHtml(post.displayName)}</strong>
          <span class="post-handle">${escapeHtml(post.handle)}</span>
          <span class="post-time">· ${escapeHtml(post.time)}</span>
        </div>
        ${post.text ? `<p class="post-text">${escapeHtml(post.text)}</p>` : ""}
        ${repostMarkup}
        ${mediaMarkup}
        ${tagMarkup}
        ${translationMarkup}
        <div class="post-actions">
          <button class="action-link" type="button" data-action="toggle-thread-reply-composer" data-target-type="post" data-target-id="${escapeHtml(
            post.id
          )}" ${canReply ? "" : "disabled"}>
            ${replyComposerLabel}
          </button>
          <button class="action-link" type="button" data-action="translate-post" data-bucket="${escapeHtml(
            bucketName
          )}" data-post-id="${escapeHtml(post.id)}" ${isLoading ? "disabled" : ""}>${translateLabel}</button>
          <button class="action-link" type="button" data-action="repost-post" data-bucket="${escapeHtml(
            bucketName
          )}" data-post-id="${escapeHtml(post.id)}">转发</button>
          <button class="action-link" type="button" data-action="delete-forum-post" data-bucket="${escapeHtml(
            bucketName
          )}" data-post-id="${escapeHtml(post.id)}">删除</button>
          <span>回复 ${post.replies}</span>
          <span>转发 ${post.reposts}</span>
          <span>喜欢 ${post.likes}</span>
          <span>浏览 ${post.views}</span>
        </div>
        ${replyComposerMarkup}
      </div>
    </div>
  `;
}

function renderThreadModal() {
  if (
    !threadModalEl ||
    !threadModalRootEl ||
    !threadModalRepliesEl ||
    !threadModalLoadHintEl ||
    !threadModalBodyEl
  ) {
    return;
  }
  if (!state.threadModalOpen) {
    threadModalEl.classList.add("hidden");
    threadModalEl.setAttribute("aria-hidden", "true");
    syncDiscussionModalBodyLock();
    return;
  }

  const post = findPostById(state.threadModalPostId, state.threadModalBucket);
  if (!post) {
    threadModalRootEl.innerHTML = '<p class="thread-empty">未找到对应帖子。</p>';
    threadModalRepliesEl.innerHTML = "";
    threadModalLoadHintEl.textContent = "帖子不存在";
    return;
  }

  const resolvedBucket = resolveThreadBucketName(state.threadModalBucket, post);
  const threadState = getPostThreadState(post.id, resolvedBucket);
  renderThreadModalRootPost(post, resolvedBucket, threadState);

  if (!threadState?.replies?.length && !threadState?.loading) {
    threadModalRepliesEl.innerHTML = '<p class="thread-empty">这条讨论暂时还没有回复。</p>';
  } else if (!threadState?.replies?.length) {
    threadModalRepliesEl.innerHTML = "";
  } else {
    threadModalRepliesEl.innerHTML = threadState.replies
      .map((reply) => renderThreadModalReplyCard(reply, resolvedBucket, post.id))
      .join("");
  }

  if (state.threadModalLoadingMore || threadState?.loading) {
    threadModalLoadHintEl.textContent = "正在加载更多回复…";
  } else {
    threadModalLoadHintEl.textContent = "滚动到底后继续上滑可加载更多回复";
  }

  threadModalEl.classList.remove("hidden");
  threadModalEl.setAttribute("aria-hidden", "false");
  syncDiscussionModalBodyLock();
}

function setThreadModalOpen(isOpen) {
  state.threadModalOpen = Boolean(isOpen);
  if (!state.threadModalOpen) {
    state.threadModalBucket = "";
    state.threadModalPostId = "";
    state.threadModalTouchTracking = false;
    state.threadModalLoadingMore = false;
    state.threadModalLastLoadAt = 0;
    state.threadShareModalOpen = false;
    state.threadShareSubmitting = false;
    resetThreadReplyComposer();
  }
  renderThreadModal();
  if (!state.threadModalOpen && threadShareModalEl) {
    threadShareModalEl.classList.add("hidden");
    threadShareModalEl.setAttribute("aria-hidden", "true");
    setThreadShareStatus("");
  }
  syncDiscussionModalBodyLock();
}

function mergeRepliesWithUniqueIds(existingReplies, incomingReplies) {
  const merged = [...(existingReplies || [])];
  const idSet = new Set(merged.map((reply) => reply.id));
  incomingReplies.forEach((reply, index) => {
    let nextId = reply.id || `reply_batch_${Date.now()}_${index}`;
    if (idSet.has(nextId)) {
      nextId = `${nextId}_${Date.now()}_${index}`;
    }
    idSet.add(nextId);
    merged.push({
      ...reply,
      id: nextId
    });
  });
  return merged;
}

function syncDiscussionForAuthoredPost(post, bucketName, postId, threadState) {
  if (!post?.authorOwned || !threadState) {
    return;
  }
  if (bucketName !== "profile") {
    state.discussions.profile[postId] = threadState;
    return;
  }
  if (post.feedType) {
    getDiscussionBucket(post.feedType)[postId] = threadState;
  }
}

async function loadPostDiscussionReplies(postId, bucketName = state.activeFeed, append = false) {
  const post = findPostById(postId, bucketName);
  if (!post) {
    return;
  }

  const resolvedBucket = resolveThreadBucketName(bucketName, post);
  const feedState = getDiscussionBucket(resolvedBucket);
  const currentThread = feedState[postId]
    ? feedState[postId]
    : {
        ...(getPostThreadState(postId, bucketName) || {
          expanded: true,
          loading: false,
          replies: []
        })
      };
  if (currentThread.loading) {
    return;
  }

  const existingReplies = currentThread.replies || [];
  feedState[postId] = {
    ...currentThread,
    expanded: true,
    loading: true,
    replies: existingReplies
  };
  renderThreadModal();

  const settings = { ...getCurrentSettings() };
  const profile = { ...getCurrentProfile() };
  const replyCount = settings.replyCount || DEFAULT_REPLY_COUNT;

  try {
    const replies = await requestGeneratedReplies(
      settings,
      profile,
      post.feedType || resolvedBucket,
      post,
      null,
      replyCount
    );

    const nextReplies = append
      ? mergeRepliesWithUniqueIds(existingReplies, replies)
      : replies;
    feedState[postId] = {
      expanded: true,
      loading: false,
      replies: nextReplies
    };
    syncDiscussionForAuthoredPost(post, bucketName, postId, feedState[postId]);
    persistDiscussions();
    renderThreadModal();
  } catch (error) {
    feedState[postId] = {
      expanded: true,
      loading: false,
      replies: existingReplies
    };
    persistDiscussions();
    setHomeStatus(`讨论回复加载失败：${error?.message || "请求失败"}`, "error");
    renderThreadModal();
  }
}

async function openThreadModal(postId, bucketName = state.activeFeed) {
  const post = findPostById(postId, bucketName);
  if (!post) {
    return;
  }
  resetThreadReplyComposer();
  state.threadModalPostId = postId;
  state.threadModalBucket = resolveThreadBucketName(bucketName, post);
  state.threadModalLoadingMore = false;
  setThreadModalOpen(true);
  if (threadModalBodyEl) {
    threadModalBodyEl.scrollTop = 0;
  }

  const threadState = getPostThreadState(postId, state.threadModalBucket);
  if (!threadState?.replies?.length) {
    await loadPostDiscussionReplies(postId, state.threadModalBucket, false);
  } else {
    renderThreadModal();
  }
}

async function loadMoreThreadModalReplies() {
  if (
    !state.threadModalOpen ||
    !state.threadModalPostId ||
    !state.threadModalBucket ||
    state.threadModalLoadingMore
  ) {
    return;
  }
  const threadState = getPostThreadState(state.threadModalPostId, state.threadModalBucket);
  if (threadState?.loading || !threadState?.replies?.length) {
    return;
  }
  if (Date.now() - state.threadModalLastLoadAt < THREAD_MODAL_LOAD_COOLDOWN_MS) {
    return;
  }
  state.threadModalLoadingMore = true;
  state.threadModalLastLoadAt = Date.now();
  renderThreadModal();
  await loadPostDiscussionReplies(state.threadModalPostId, state.threadModalBucket, true);
  state.threadModalLoadingMore = false;
  renderThreadModal();
}

function isThreadModalScrolledToBottom() {
  if (!threadModalBodyEl) {
    return false;
  }
  return (
    threadModalBodyEl.scrollHeight - threadModalBodyEl.scrollTop - threadModalBodyEl.clientHeight <=
    8
  );
}

function handleThreadModalWheel(event) {
  if (!state.threadModalOpen || !threadModalBodyEl || state.threadModalLoadingMore) {
    return;
  }
  if (!isThreadModalScrolledToBottom() || event.deltaY <= 0) {
    return;
  }
  event.preventDefault();
  loadMoreThreadModalReplies();
}

function handleThreadModalTouchStart(event) {
  if (!state.threadModalOpen || !threadModalBodyEl) {
    return;
  }
  state.threadModalTouchTracking = true;
  state.threadModalTouchStartY = event.touches[0].clientY;
}

function handleThreadModalTouchMove(event) {
  if (!state.threadModalOpen || !state.threadModalTouchTracking || !threadModalBodyEl) {
    return;
  }
  const delta = event.touches[0].clientY - state.threadModalTouchStartY;
  if (!isThreadModalScrolledToBottom() || delta >= -16 || state.threadModalLoadingMore) {
    return;
  }
  event.preventDefault();
  state.threadModalTouchTracking = false;
  loadMoreThreadModalReplies();
}

function handleThreadModalTouchEnd() {
  state.threadModalTouchTracking = false;
}

function renderHomeTabs() {
  if (!homeMiniTabsContainer) {
    return;
  }

  const customFeeds = state.customTabs.map((tab) => ({
    id: tab.id,
    label: tab.name || "自定义页签"
  }));

  if (!customFeeds.some((feed) => feed.id === state.activeFeed) && state.activeFeed !== "tags") {
    state.activeFeed = getDefaultVisibleHomeFeed();
  }

  const customButtons = customFeeds
    .map(
      (feed) => `
        <button class="mini-tab${state.activeFeed === feed.id ? " active" : ""}" data-feed="${escapeHtml(
          feed.id
        )}" type="button">
          ${escapeHtml(feed.label)}
        </button>
      `
    )
    .join("");

  const tagsButton = `
    <button class="mini-tab${state.activeFeed === "tags" ? " active" : ""}" data-feed="tags" type="button">
      ${escapeHtml(HOME_FEED_LABELS.tags)}
    </button>
  `;

  homeMiniTabsContainer.innerHTML = tagsButton + customButtons;
}

function renderActiveFeed() {
  renderHomeTabs();
  if (state.activeFeed === "tags") {
    renderPopularTags();
    return;
  }
  renderFeed(state.feeds[state.activeFeed] || []);
}

function setCustomTabFormStatus(message, tone = "") {
  if (!customTabFormStatusEl) {
    return;
  }
  customTabFormStatusEl.textContent = message;
  customTabFormStatusEl.className = "status-text";
  if (tone) {
    customTabFormStatusEl.classList.add(tone);
  }
}

function focusCustomTabNameField() {
  if (!customTabNameInput || customTabNameInput.disabled) {
    return;
  }
  window.requestAnimationFrame(() => {
    try {
      customTabNameInput.focus({ preventScroll: true });
    } catch (_error) {
      customTabNameInput.focus();
    }
  });
}

function renderCustomTabFormWorldbookSelector(selectedIds = []) {
  if (!customTabWorldbookListEl) {
    return;
  }
  const library = loadWorldbookLibrary();
  if (!library.entries.length) {
    customTabWorldbookListEl.innerHTML =
      '<div class="custom-tab-mount-empty">还没有世界书，可先到 Message → 我 → 世界书 创建。</div>';
    return;
  }

  const selectedIdSet = new Set(normalizeMountedIds(selectedIds));
  customTabWorldbookListEl.innerHTML = library.entries
    .map((entry) => {
      const categoryName =
        library.categories.find((category) => category.id === entry.categoryId)?.name || "未分类";
      return `
        <label class="custom-tab-mount-option">
          <input
            type="checkbox"
            value="${escapeHtml(entry.id)}"
            ${selectedIdSet.has(entry.id) ? "checked" : ""}
          />
          <span>${escapeHtml(entry.name)}<small>${escapeHtml(categoryName)}</small></span>
        </label>
      `;
    })
    .join("");
}

function updateCustomTabFormAdvancedState() {
  if (customTabBubbleFocusMinutesInput) {
    customTabBubbleFocusMinutesInput.disabled = !Boolean(customTabBubbleFocusEnabledInput?.checked);
  }
  if (customTabInsFocusMinutesInput) {
    customTabInsFocusMinutesInput.disabled = !Boolean(customTabInsFocusEnabledInput?.checked);
  }
}

function normalizeCustomTabContentBucket(value = "", fallback = "discussion") {
  const normalized = String(value || "").trim().toLowerCase();
  return normalized === "hot_topic" || normalized === "discussion" ? normalized : fallback;
}

function normalizeForumTopicTags(value = [], fallback = []) {
  const rawValues = Array.isArray(value)
    ? value
    : typeof value === "string"
      ? String(value)
          .split(/[|,]/g)
          .map((item) => item.trim())
      : [];
  const normalized = rawValues
    .map((item) => String(item || "").trim().toLowerCase())
    .filter((item) => FORUM_TOPIC_TAG_IDS.has(item));
  const unique = Array.from(new Set(normalized));
  return unique.length ? unique : [...fallback];
}

function getAvailableForumTopicTags(value = []) {
  const incoming = Array.isArray(value) ? value : [];
  const normalizedIncoming = incoming
    .map((item) => ({
      id: String(item?.id || "").trim().toLowerCase(),
      label: String(item?.label || "").trim(),
      description: String(item?.description || "").trim()
    }))
    .filter((item) => FORUM_TOPIC_TAG_IDS.has(item.id));
  return normalizedIncoming.length
    ? normalizedIncoming
    : FORUM_TOPIC_TAG_CATALOG.map((item) => ({ ...item }));
}

function parseCustomTabLegacyContentText(value = "") {
  const normalized = String(value || "")
    .replace(/\r\n?/g, "\n")
    .trim();
  if (!normalized) {
    return [];
  }
  const numberedMatches = Array.from(
    normalized.matchAll(/(?:^|\n)\s*\d+[\.\)、]\s*([\s\S]*?)(?=(?:\n\s*\d+[\.\)、]\s*)|$)/g)
  )
    .map((match) => String(match[1] || "").trim())
    .filter(Boolean);
  if (numberedMatches.length >= 2) {
    return numberedMatches;
  }
  const lineItems = normalized
    .split("\n")
    .map((line) => String(line || "").replace(/^\s*\d+[\.\)、]\s*/, "").trim())
    .filter(Boolean);
  if (lineItems.length >= 2) {
    return lineItems;
  }
  return [normalized];
}

function getCustomTabContentItemTimestamp(item = {}) {
  const parsed = Date.parse(String(item.enteredBucketAt || item.updatedAt || item.createdAt || "").trim());
  return Number.isFinite(parsed) ? parsed : 0;
}

function getCustomTabContentItemSortOrder(item = {}) {
  const parsed = Number(item?.sortOrder);
  return Number.isFinite(parsed) ? parsed : null;
}

function sortCustomTabContentItems(items = []) {
  return [...(Array.isArray(items) ? items : [])].sort((left, right) => {
    const leftSortOrder = getCustomTabContentItemSortOrder(left);
    const rightSortOrder = getCustomTabContentItemSortOrder(right);
    if (leftSortOrder !== null || rightSortOrder !== null) {
      if (leftSortOrder === null) {
        return 1;
      }
      if (rightSortOrder === null) {
        return -1;
      }
      const orderDiff = leftSortOrder - rightSortOrder;
      if (orderDiff !== 0) {
        return orderDiff;
      }
    }
    const timeDiff = getCustomTabContentItemTimestamp(right) - getCustomTabContentItemTimestamp(left);
    if (timeDiff !== 0) {
      return timeDiff;
    }
    return String(right.id || "").localeCompare(String(left.id || ""), "zh-CN");
  });
}

function cloneCustomTabContentItem(item = {}) {
  return {
    id: String(item.id || "").trim(),
    tabId: String(item.tabId || "").trim(),
    bucket: normalizeCustomTabContentBucket(item.bucket, "discussion"),
    contentText: String(item.contentText || "").trim(),
    discussionDate: normalizeDateInputValue(item.discussionDate || item.discussion_date || ""),
    enteredBucketAt: String(item.enteredBucketAt || "").trim() || new Date().toISOString(),
    sortOrder: getCustomTabContentItemSortOrder(item),
    refKey: String(item.refKey || item.ref_key || "").trim(),
    topicTags: normalizeForumTopicTags(item.topicTags, []),
    summaryText: String(item.summaryText || "").trim(),
    summaryUpdatedAt: String(item.summaryUpdatedAt || "").trim(),
    summarySourceHash: String(item.summarySourceHash || "").trim(),
    originBucket: normalizeCustomTabContentBucket(item.originBucket || item.bucket, "discussion"),
    lastHotTopicAt: String(item.lastHotTopicAt || "").trim(),
    archivedAt: String(item.archivedAt || "").trim(),
    backgroundExtractedAt: String(item.backgroundExtractedAt || "").trim(),
    lastExtractedHash: String(item.lastExtractedHash || "").trim(),
    metadata: item.metadata && typeof item.metadata === "object" ? { ...item.metadata } : {},
    createdAt: String(item.createdAt || "").trim(),
    updatedAt: String(item.updatedAt || "").trim()
  };
}

function createLocalCustomTabContentItem(bucket = "discussion", contentText = "") {
  const nowIso = new Date().toISOString();
  return {
    id: `local_tab_item_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    tabId: String(state.customTabEditingId || "").trim(),
    bucket: normalizeCustomTabContentBucket(bucket, "discussion"),
    contentText: String(contentText || "").trim(),
    discussionDate: "",
    enteredBucketAt: nowIso,
    sortOrder: null,
    refKey: "",
    topicTags: [],
    summaryText: "",
    summaryUpdatedAt: "",
    summarySourceHash: "",
    originBucket: normalizeCustomTabContentBucket(bucket, "discussion"),
    lastHotTopicAt: bucket === "hot_topic" ? nowIso : "",
    archivedAt: "",
    backgroundExtractedAt: "",
    lastExtractedHash: "",
    metadata: {},
    createdAt: nowIso,
    updatedAt: nowIso
  };
}

function buildCustomTabNumberedContentText(items = []) {
  return sortCustomTabContentItems(items)
    .map((item, index) => {
      const contentText = String(item?.contentText || "").trim();
      return contentText ? `${index + 1}. ${contentText}` : "";
    })
    .filter(Boolean)
    .join("\n");
}

function getCustomTabContentDraftState() {
  if (!state.customTabContentDraft || typeof state.customTabContentDraft !== "object") {
    state.customTabContentDraft = {
      tabId: "",
      items: [],
      originalItems: [],
      loadedFromServer: false,
      loading: false,
      historyExpanded: false,
      availableTopicTags: getAvailableForumTopicTags()
    };
  }
  return state.customTabContentDraft;
}

function getCustomTabTopicTagLabel(tagId = "", availableTopicTags = getAvailableForumTopicTags()) {
  return (
    availableTopicTags.find((item) => item.id === String(tagId || "").trim())?.label ||
    String(tagId || "").trim()
  );
}

function validateDraftItemTopicTags(item = {}) {
  const topicTags = normalizeForumTopicTags(item.topicTags, []);
  return topicTags.length >= CUSTOM_TAB_TOPIC_TAG_MIN_COUNT &&
    topicTags.length <= CUSTOM_TAB_TOPIC_TAG_MAX_COUNT;
}

function getNextCustomTabTopSortOrder(items = [], bucket = "discussion") {
  const bucketItems = sortCustomTabContentItems(items).filter(
    (item) => item.bucket === normalizeCustomTabContentBucket(bucket, "discussion")
  );
  const firstOrder = getCustomTabContentItemSortOrder(bucketItems[0]);
  return Number.isFinite(firstOrder) ? firstOrder - 1000 : -1000;
}

function applyCustomTabBucketSortOrders(items = [], bucket = "discussion") {
  const resolvedBucket = normalizeCustomTabContentBucket(bucket, "discussion");
  const sortedBucketItems = sortCustomTabContentItems(items).filter((item) => item.bucket === resolvedBucket);
  const orderMap = new Map(
    sortedBucketItems.map((item, index) => [item.id, (index + 1) * 1000])
  );
  return (Array.isArray(items) ? items : []).map((item) =>
    orderMap.has(item.id)
      ? {
          ...item,
          sortOrder: orderMap.get(item.id),
          updatedAt: new Date().toISOString()
        }
      : item
  );
}

function moveCustomTabDraftItemOrder(itemId = "", direction = "up") {
  const draft = getCustomTabContentDraftState();
  const resolvedItemId = String(itemId || "").trim();
  const targetItem = (draft.items || []).find((item) => item.id === resolvedItemId);
  if (!targetItem) {
    return;
  }
  const bucket = targetItem.bucket;
  const bucketItems = sortCustomTabContentItems(draft.items || []).filter((item) => item.bucket === bucket);
  const currentIndex = bucketItems.findIndex((item) => item.id === resolvedItemId);
  const nextIndex = direction === "down" ? currentIndex + 1 : currentIndex - 1;
  if (currentIndex < 0 || nextIndex < 0 || nextIndex >= bucketItems.length) {
    return;
  }
  const reordered = [...bucketItems];
  const [movedItem] = reordered.splice(currentIndex, 1);
  reordered.splice(nextIndex, 0, movedItem);
  const orderMap = new Map(reordered.map((item, index) => [item.id, (index + 1) * 1000]));
  draft.items = sortCustomTabContentItems(
    (draft.items || []).map((item) =>
      item.bucket === bucket && orderMap.has(item.id)
        ? {
            ...item,
            sortOrder: orderMap.get(item.id),
            updatedAt: new Date().toISOString()
          }
        : item
    )
  );
  renderCustomTabContentEditor();
}

function renderCustomTabContentEditor() {
  if (!customTabDiscussionItemsEditorEl || !customTabHotTopicItemsEditorEl) {
    return;
  }
  const draft = getCustomTabContentDraftState();
  const availableTopicTags = getAvailableForumTopicTags(draft.availableTopicTags);
  const items = sortCustomTabContentItems(draft.items || []);
  const discussionItems = items.filter((item) => item.bucket === "discussion");
  const hotTopicItems = items.filter((item) => item.bucket === "hot_topic");
  const latestDiscussionItems = discussionItems.slice(0, CUSTOM_TAB_DISCUSSION_VISIBLE_LIMIT);
  const olderDiscussionItems = discussionItems.slice(CUSTOM_TAB_DISCUSSION_VISIBLE_LIMIT);
  const disableEditing = !state.customTabEditingId && state.customTabs.length >= CUSTOM_TAB_LIMIT;

  const renderItem = (item, targetBucket, displayIndex = 0, promptIncluded = true, orderOptions = {}) => {
    const isDiscussion = targetBucket === "discussion";
    const moveLabel = isDiscussion ? "移到热点" : "移到普通";
    const moveTargetBucket = isDiscussion ? "hot_topic" : "discussion";
    const sequenceLabel = isDiscussion
      ? promptIncluded
        ? `普通 prompt #${displayIndex}`
        : `普通历史 #${displayIndex}`
      : `热点 prompt #${displayIndex}`;
    const topicTags = normalizeForumTopicTags(item.topicTags, []);
    const hasValidTags = validateDraftItemTopicTags(item);
    const refKey = String(item.refKey || "").trim();
    const discussionDate = normalizeDateInputValue(item.discussionDate || "");
    return `
      <article class="custom-tab-content-item" data-item-id="${escapeHtml(item.id || "")}">
        <div class="custom-tab-content-item__meta">
          <strong>${escapeHtml(`${displayIndex}.`)}</strong>
          <span>${escapeHtml(sequenceLabel)}</span>
          ${refKey ? `<code class="custom-tab-content-item__ref">${escapeHtml(refKey)}</code>` : ""}
          <small>${promptIncluded ? "会带进 prompt" : "不直接带进 prompt，可历史提炼"}</small>
        </div>
        <textarea
          rows="3"
          data-action="edit-custom-tab-content-item"
          data-item-id="${escapeHtml(item.id || "")}"
          placeholder="${isDiscussion ? "输入一条普通讨论内容。" : "输入一条热点内容。"}"
          ${disableEditing ? "disabled" : ""}
        >${escapeHtml(item.contentText || "")}</textarea>
        <div class="custom-tab-content-item__date-row">
          <label class="custom-tab-content-item__date-label">
            <span>讨论日期</span>
            <input
              type="date"
              data-action="edit-custom-tab-content-date"
              data-item-id="${escapeHtml(item.id || "")}"
              value="${escapeHtml(discussionDate)}"
              ${disableEditing ? "disabled" : ""}
            />
          </label>
          <small>${discussionDate ? "用于 seed 背景可见性判断" : "留空则保存时按创建日期补默认值"}</small>
        </div>
        <div class="custom-tab-content-item__tag-row">
          <div class="custom-tab-content-item__tag-meta">
            <span>${escapeHtml(
              topicTags.length
                ? `已选 ${topicTags.length} 个标签：${topicTags
                    .map((tag) => getCustomTabTopicTagLabel(tag, availableTopicTags))
                    .join(" / ")}`
                : `请选择 ${CUSTOM_TAB_TOPIC_TAG_MIN_COUNT}-${CUSTOM_TAB_TOPIC_TAG_MAX_COUNT} 个标签`
            )}</span>
            ${hasValidTags ? "" : "<small>未满足 1~3 个标签，暂不能进入新生成链路</small>"}
          </div>
          <div class="custom-tab-content-item__tags">
            ${availableTopicTags
              .map(
                (tag) => `
                  <button
                    class="topic-tag-chip ${topicTags.includes(tag.id) ? "is-active" : ""}"
                    type="button"
                    data-action="toggle-custom-tab-content-tag"
                    data-item-id="${escapeHtml(item.id || "")}"
                    data-tag-id="${escapeHtml(tag.id)}"
                    title="${escapeHtml(tag.description || tag.label || tag.id)}"
                    ${disableEditing ? "disabled" : ""}
                  >${escapeHtml(tag.label)}</button>
                `
              )
              .join("")}
          </div>
        </div>
        <div class="custom-tab-content-item__actions">
          <button
            class="ghost-chip"
            type="button"
            data-action="move-custom-tab-content-order"
            data-direction="up"
            data-item-id="${escapeHtml(item.id || "")}"
            ${disableEditing || !orderOptions.canMoveUp ? "disabled" : ""}
          >上移</button>
          <button
            class="ghost-chip"
            type="button"
            data-action="move-custom-tab-content-order"
            data-direction="down"
            data-item-id="${escapeHtml(item.id || "")}"
            ${disableEditing || !orderOptions.canMoveDown ? "disabled" : ""}
          >下移</button>
          <button
            class="ghost-chip"
            type="button"
            data-action="move-custom-tab-content-item"
            data-item-id="${escapeHtml(item.id || "")}"
            data-target-bucket="${escapeHtml(moveTargetBucket)}"
            ${disableEditing ? "disabled" : ""}
          >${moveLabel}</button>
          <button
            class="ghost-chip ghost-chip--danger"
            type="button"
            data-action="delete-custom-tab-content-item"
            data-item-id="${escapeHtml(item.id || "")}"
            ${disableEditing ? "disabled" : ""}
          >删除</button>
        </div>
      </article>
    `;
  };

  customTabDiscussionItemsEditorEl.innerHTML = `
    <div class="custom-tab-content-editor__toolbar">
      <span class="tag-stat-meta">普通条目 ${discussionItems.length} 条 · ${
        latestDiscussionItems.length
          ? `当前 prompt 顺序 1-${latestDiscussionItems.length}`
          : "当前 prompt 无条目"
      }，共带入 ${latestDiscussionItems.length} 条</span>
      <button
        class="ghost-chip"
        type="button"
        data-action="add-custom-tab-content-item"
        data-bucket="discussion"
        ${disableEditing ? "disabled" : ""}
      >新增普通条目</button>
    </div>
    <div class="custom-tab-content-editor__list">
      ${
        latestDiscussionItems.length
          ? latestDiscussionItems
              .map((item, index) => renderItem(item, "discussion", index + 1, true, {
                canMoveUp: index > 0,
                canMoveDown: index < discussionItems.length - 1
              }))
              .join("")
          : '<p class="empty-state">还没有普通条目，先新增至少 1 条。</p>'
      }
    </div>
    ${
      olderDiscussionItems.length
        ? `
          <div class="custom-tab-content-editor__history">
            <button
              class="ghost-chip"
              type="button"
              data-action="toggle-custom-tab-history"
            >${draft.historyExpanded ? "收起历史条目" : `展开历史条目（${olderDiscussionItems.length}）`}</button>
            ${
              draft.historyExpanded
                ? `<div class="custom-tab-content-editor__list">${olderDiscussionItems
                    .map((item, index) =>
                      renderItem(
                        item,
                        "discussion",
                        CUSTOM_TAB_DISCUSSION_VISIBLE_LIMIT + index + 1,
                        false,
                        {
                          canMoveUp: CUSTOM_TAB_DISCUSSION_VISIBLE_LIMIT + index > 0,
                          canMoveDown: CUSTOM_TAB_DISCUSSION_VISIBLE_LIMIT + index < discussionItems.length - 1
                        }
                      )
                    )
                    .join("")}</div>`
                : ""
            }
          </div>
        `
        : ""
    }
  `;

  customTabHotTopicItemsEditorEl.innerHTML = `
    <div class="custom-tab-content-editor__toolbar">
      <span class="tag-stat-meta">热点条目 ${hotTopicItems.length} 条 · 当前热点 prompt 共带入 ${hotTopicItems.length} 条</span>
      <button
        class="ghost-chip"
        type="button"
        data-action="add-custom-tab-content-item"
        data-bucket="hot_topic"
        ${disableEditing ? "disabled" : ""}
      >新增热点条目</button>
    </div>
    <div class="custom-tab-content-editor__list">
      ${
        hotTopicItems.length
          ? hotTopicItems
              .map((item, index) => renderItem(item, "hot_topic", index + 1, true, {
                canMoveUp: index > 0,
                canMoveDown: index < hotTopicItems.length - 1
              }))
              .join("")
          : '<p class="empty-state">当前没有热点条目，可留空。</p>'
      }
    </div>
  `;
}

function seedCustomTabContentDraftFromTab(tab = null) {
  const resolvedTab = tab && typeof tab === "object" ? tab : {};
  const discussionItems = parseCustomTabLegacyContentText(resolvedTab.discussionText || "").map(
    (contentText, index) => ({
      ...createLocalCustomTabContentItem("discussion", contentText),
      tabId: String(resolvedTab.id || "").trim(),
      enteredBucketAt: new Date(Date.now() - index * 1000).toISOString(),
      sortOrder: (index + 1) * 1000
    })
  );
  const hotTopicItems = parseCustomTabLegacyContentText(resolvedTab.hotTopic || "").map(
    (contentText, index) => ({
      ...createLocalCustomTabContentItem("hot_topic", contentText),
      tabId: String(resolvedTab.id || "").trim(),
      enteredBucketAt: new Date(Date.now() - index * 1000).toISOString(),
      sortOrder: (index + 1) * 1000
    })
  );
  state.customTabContentDraft = {
    tabId: String(resolvedTab.id || "").trim(),
    items: sortCustomTabContentItems([...discussionItems, ...hotTopicItems]),
    originalItems: [],
    loadedFromServer: false,
    loading: false,
    historyExpanded: false,
    availableTopicTags: getAvailableForumTopicTags()
  };
  renderCustomTabContentEditor();
}

function applyCustomTabContentPayloadToDraft(payload = {}, tabId = "") {
  const items = [
    ...(Array.isArray(payload.latestDiscussionItems) ? payload.latestDiscussionItems : []),
    ...(Array.isArray(payload.olderDiscussionItems) ? payload.olderDiscussionItems : []),
    ...(Array.isArray(payload.hotTopicItems) ? payload.hotTopicItems : [])
  ].map((item) => cloneCustomTabContentItem(item));
  state.customTabContentDraft = {
    tabId: String(tabId || payload?.tab?.id || "").trim(),
    items: sortCustomTabContentItems(items),
    originalItems: items.map((item) => cloneCustomTabContentItem(item)),
    loadedFromServer: true,
    loading: false,
    historyExpanded: false,
    availableTopicTags: getAvailableForumTopicTags(payload?.availableTopicTags)
  };
  renderCustomTabContentEditor();
}

function updateCustomTabDraftItem(itemId = "", patch = {}) {
  const draft = getCustomTabContentDraftState();
  const resolvedItemId = String(itemId || "").trim();
  if (!resolvedItemId) {
    return;
  }
  draft.items = sortCustomTabContentItems(
    (draft.items || []).map((item) =>
      item.id === resolvedItemId
        ? {
            ...item,
            ...patch,
            bucket: normalizeCustomTabContentBucket(patch.bucket || item.bucket, item.bucket),
            sortOrder: Object.prototype.hasOwnProperty.call(patch, "sortOrder")
              ? getCustomTabContentItemSortOrder(patch)
              : getCustomTabContentItemSortOrder(item),
            topicTags: Object.prototype.hasOwnProperty.call(patch, "topicTags")
              ? normalizeForumTopicTags(patch.topicTags, [])
              : normalizeForumTopicTags(item.topicTags, []),
            updatedAt: new Date().toISOString()
          }
        : item
    )
  );
  renderCustomTabContentEditor();
}

function addCustomTabDraftItem(bucket = "discussion") {
  const draft = getCustomTabContentDraftState();
  const resolvedBucket = normalizeCustomTabContentBucket(bucket, "discussion");
  const nextItem = createLocalCustomTabContentItem(resolvedBucket);
  nextItem.sortOrder = getNextCustomTabTopSortOrder(draft.items || [], resolvedBucket);
  draft.items = sortCustomTabContentItems([
    nextItem,
    ...(draft.items || [])
  ]);
  renderCustomTabContentEditor();
}

function removeCustomTabDraftItem(itemId = "") {
  const draft = getCustomTabContentDraftState();
  draft.items = (draft.items || []).filter((item) => item.id !== itemId);
  renderCustomTabContentEditor();
}

async function requestForumCustomTabsSave(tabs = []) {
  return requestDiscussionStorageApi("/api/forum/custom-tabs", {
    method: "PUT",
    body: JSON.stringify({
      tabs: normalizeCustomTabs(tabs)
    })
  });
}

async function requestForumTabContent(tabId = "") {
  const resolvedTabId = String(tabId || "").trim();
  if (!resolvedTabId) {
    return null;
  }
  return requestDiscussionStorageApi(
    `/api/forum/tab-content?tabId=${encodeURIComponent(resolvedTabId)}`
  );
}

async function loadCustomTabContentDraftFromServer(tabId = "") {
  const resolvedTabId = String(tabId || "").trim();
  if (!resolvedTabId) {
    return null;
  }
  const draft = getCustomTabContentDraftState();
  draft.loading = true;
  renderCustomTabContentEditor();
  try {
    const payload = await requestForumTabContent(resolvedTabId);
    if (String(state.customTabEditingId || "").trim() === resolvedTabId) {
      applyCustomTabContentPayloadToDraft(payload, resolvedTabId);
    }
    return payload;
  } finally {
    if (String(state.customTabEditingId || "").trim() === resolvedTabId) {
      getCustomTabContentDraftState().loading = false;
      renderCustomTabContentEditor();
    }
  }
}

async function syncCustomTabContentDraftWithServer(tabId = "") {
  const resolvedTabId = String(tabId || "").trim();
  if (!resolvedTabId) {
    return null;
  }
  const draft = getCustomTabContentDraftState();
  if (!draft.loadedFromServer && state.customTabEditingId === resolvedTabId) {
    try {
      const existingPayload = await requestForumTabContent(resolvedTabId);
      if (existingPayload) {
        draft.originalItems = [
          ...(Array.isArray(existingPayload.latestDiscussionItems)
            ? existingPayload.latestDiscussionItems
            : []),
          ...(Array.isArray(existingPayload.olderDiscussionItems)
            ? existingPayload.olderDiscussionItems
            : []),
          ...(Array.isArray(existingPayload.hotTopicItems) ? existingPayload.hotTopicItems : [])
        ].map((item) => cloneCustomTabContentItem(item));
        draft.availableTopicTags = getAvailableForumTopicTags(existingPayload.availableTopicTags);
      }
    } catch (_error) {
    }
  }
  const currentItems = sortCustomTabContentItems(
    (draft.items || [])
      .map((item) => ({
        ...cloneCustomTabContentItem(item),
        tabId: resolvedTabId,
        contentText: String(item.contentText || "").trim()
      }))
      .filter((item) => item.contentText)
  );
  const originalItems = Array.isArray(draft.originalItems) ? draft.originalItems : [];
  const originalMap = new Map(originalItems.map((item) => [item.id, item]));
  const currentMap = new Map(currentItems.map((item) => [item.id, item]));

  for (const originalItem of originalItems) {
    if (!currentMap.has(originalItem.id)) {
      await requestDiscussionStorageApi(
        `/api/forum/tab-content/items/${encodeURIComponent(originalItem.id)}`,
        { method: "DELETE" }
      );
    }
  }

  for (const item of [...currentItems].reverse()) {
    if (String(item.id || "").startsWith("local_tab_item_")) {
      await requestDiscussionStorageApi("/api/forum/tab-content/items", {
        method: "POST",
        body: JSON.stringify({
          tabId: resolvedTabId,
          bucket: item.bucket,
          contentText: item.contentText,
          discussionDate: normalizeDateInputValue(item.discussionDate || ""),
          sortOrder: getCustomTabContentItemSortOrder(item),
          topicTags: normalizeForumTopicTags(item.topicTags, [])
        })
      });
      continue;
    }
    const originalItem = originalMap.get(item.id);
    if (!originalItem) {
      await requestDiscussionStorageApi("/api/forum/tab-content/items", {
        method: "POST",
        body: JSON.stringify({
          tabId: resolvedTabId,
          bucket: item.bucket,
          contentText: item.contentText,
          discussionDate: normalizeDateInputValue(item.discussionDate || ""),
          sortOrder: getCustomTabContentItemSortOrder(item),
          topicTags: normalizeForumTopicTags(item.topicTags, [])
        })
      });
      continue;
    }
    if (
      originalItem.bucket !== item.bucket ||
      String(originalItem.contentText || "").trim() !== String(item.contentText || "").trim() ||
      normalizeDateInputValue(originalItem.discussionDate || "") !==
        normalizeDateInputValue(item.discussionDate || "") ||
      getCustomTabContentItemSortOrder(originalItem) !== getCustomTabContentItemSortOrder(item) ||
      JSON.stringify(normalizeForumTopicTags(originalItem.topicTags, [])) !==
        JSON.stringify(normalizeForumTopicTags(item.topicTags, []))
    ) {
      await requestDiscussionStorageApi(
        `/api/forum/tab-content/items/${encodeURIComponent(item.id)}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            bucket: item.bucket,
            contentText: item.contentText,
            discussionDate: normalizeDateInputValue(item.discussionDate || ""),
            sortOrder: getCustomTabContentItemSortOrder(item),
            topicTags: normalizeForumTopicTags(item.topicTags, [])
          })
        }
      );
    }
  }

  return loadCustomTabContentDraftFromServer(resolvedTabId);
}

function getCurrentCustomTabFormDraft() {
  const worldbookIds = customTabWorldbookListEl
    ? [...customTabWorldbookListEl.querySelectorAll("input[type='checkbox']:checked")]
        .map((input) => (input instanceof HTMLInputElement ? String(input.value || "").trim() : ""))
        .filter(Boolean)
    : [];
  const draftItems = sortCustomTabContentItems(getCustomTabContentDraftState().items || []);
  const discussionItems = draftItems
    .filter((item) => item.bucket === "discussion")
    .slice(0, CUSTOM_TAB_DISCUSSION_VISIBLE_LIMIT);
  const hotTopicItems = draftItems.filter((item) => item.bucket === "hot_topic");
  return {
    id: String(state.customTabEditingId || "").trim(),
    name: String(customTabNameInput?.value || "").trim().slice(0, 10) || "自定义页签",
    audience: String(customTabAudienceInput?.value || "").trim(),
    discussionText: buildCustomTabNumberedContentText(discussionItems),
    hotTopic: buildCustomTabNumberedContentText(hotTopicItems),
    text: buildCustomTabNumberedContentText(discussionItems),
    timeAwareness: Boolean(customTabTimeAwarenessInput?.checked),
    worldbookIds,
    bubbleFocusEnabled: Boolean(customTabBubbleFocusEnabledInput?.checked),
    bubbleFocusMinutes: normalizeContextFocusMinutes(customTabBubbleFocusMinutesInput?.value),
    insFocusEnabled: Boolean(customTabInsFocusEnabledInput?.checked),
    insFocusMinutes: normalizeContextFocusMinutes(customTabInsFocusMinutesInput?.value)
  };
}

function resetCustomTabForm(preserveStatus = false) {
  state.customTabEditingId = "";
  state.customTabContentDraft = {
    tabId: "",
    items: [],
    originalItems: [],
    loadedFromServer: false,
    loading: false,
    historyExpanded: false,
    availableTopicTags: getAvailableForumTopicTags()
  };
  if (customTabNameInput) {
    customTabNameInput.value = "";
  }
  if (customTabAudienceInput) {
    customTabAudienceInput.value = "";
  }
  if (customTabTimeAwarenessInput) {
    customTabTimeAwarenessInput.checked = false;
  }
  renderCustomTabFormWorldbookSelector([]);
  if (customTabBubbleFocusEnabledInput) {
    customTabBubbleFocusEnabledInput.checked = false;
  }
  if (customTabBubbleFocusMinutesInput) {
    customTabBubbleFocusMinutesInput.value = String(DEFAULT_CONTEXT_FOCUS_MINUTES);
  }
  if (customTabInsFocusEnabledInput) {
    customTabInsFocusEnabledInput.checked = false;
  }
  if (customTabInsFocusMinutesInput) {
    customTabInsFocusMinutesInput.value = String(DEFAULT_CONTEXT_FOCUS_MINUTES);
  }
  updateCustomTabFormAdvancedState();
  if (!preserveStatus) {
    setCustomTabFormStatus("");
  }
  if (!state.customTabEditingId) {
    setCustomTabBackgroundStatus("");
  }
  renderCustomTabContentEditor();
  renderCustomTabsManager();
}

function syncCustomTabEditorChrome() {
  const editingTab = state.customTabEditingId ? getCustomTab(state.customTabEditingId) : null;
  const isEditing = Boolean(editingTab);
  if (customTabsWorkspaceEl) {
    customTabsWorkspaceEl.classList.toggle("is-editing", isEditing);
  }
  if (customTabEditorKickerEl) {
    customTabEditorKickerEl.textContent = isEditing ? "Editing tab" : "New tab";
  }
  if (customTabEditorTitleEl) {
    customTabEditorTitleEl.textContent = isEditing
      ? `编辑「${editingTab?.name || "自定义页签"}」`
      : "新增自定义页签";
  }
  if (customTabEditorDescriptionEl) {
    customTabEditorDescriptionEl.textContent = isEditing
      ? "当前正在覆盖这个页签的论坛设定与高级挂载。保存后会直接影响首页与论坛生成逻辑。"
      : "新增状态下会创建一个新的论坛讨论区；建议先完成基础设定，再按需打开世界书、Bubble 或 INS 挂载。";
  }
  if (customTabEditorResetBtn) {
    customTabEditorResetBtn.textContent = isEditing ? "结束编辑" : "清空重填";
  }
  if (customTabCancelBtn) {
    customTabCancelBtn.textContent = isEditing ? "取消编辑" : "取消";
  }
}

function startCustomTabCreate() {
  resetCustomTabForm();
  setCustomTabBackgroundStatus("");
  setCustomTabFormStatus("正在新增新的自定义页签。", "");
  focusCustomTabNameField();
}

function updateCustomTabsManageButton() {
  if (!customTabsManageBtn) {
    return;
  }
  customTabsManageBtn.textContent = "管理自定义页签";
  customTabsManageBtn.setAttribute("aria-expanded", state.customTabEditorOpen ? "true" : "false");
}

function setCustomTabsPanelOpen(isOpen) {
  if (!customTabsPanel) {
    return;
  }
  state.customTabEditorOpen = Boolean(isOpen);
  customTabsPanel.classList.toggle("hidden", !state.customTabEditorOpen);
  customTabsPanel.setAttribute("aria-hidden", state.customTabEditorOpen ? "false" : "true");
  updateCustomTabsManageButton();
  if (state.customTabEditorOpen) {
    document.body.style.overflow = "hidden";
    renderCustomTabsManager();
    focusCustomTabNameField();
    return;
  }

  document.body.style.overflow = state.threadModalOpen ? "hidden" : "";
}

function startCustomTabEdit(tabId) {
  const tab = getCustomTab(tabId);
  if (!tab) {
    return;
  }
  state.customTabEditingId = tabId;
  if (customTabNameInput) {
    customTabNameInput.value = tab.name || "";
  }
  if (customTabAudienceInput) {
    customTabAudienceInput.value = tab.audience || "";
  }
  if (customTabTimeAwarenessInput) {
    customTabTimeAwarenessInput.checked = Boolean(tab.timeAwareness);
  }
  renderCustomTabFormWorldbookSelector(tab.worldbookIds || []);
  if (customTabBubbleFocusEnabledInput) {
    customTabBubbleFocusEnabledInput.checked = Boolean(tab.bubbleFocusEnabled);
  }
  if (customTabBubbleFocusMinutesInput) {
    customTabBubbleFocusMinutesInput.value = String(
      normalizeContextFocusMinutes(tab.bubbleFocusMinutes)
    );
  }
  if (customTabInsFocusEnabledInput) {
    customTabInsFocusEnabledInput.checked = Boolean(tab.insFocusEnabled);
  }
  if (customTabInsFocusMinutesInput) {
    customTabInsFocusMinutesInput.value = String(
      normalizeContextFocusMinutes(tab.insFocusMinutes)
    );
  }
  seedCustomTabContentDraftFromTab(tab);
  updateCustomTabFormAdvancedState();
  setCustomTabFormStatus(`正在编辑“${tab.name || "自定义页签"}”`, "");
  renderCustomTabsManager();
  requestForumCustomTabsSave(state.customTabs)
    .then(() => loadCustomTabContentDraftFromServer(tabId))
    .catch((error) => {
      setCustomTabFormStatus(
        `页签条目读取失败，暂时先用本地草稿：${error?.message || "请求失败"}`,
        "error"
      );
    });
  loadForumBackgroundPanelData(tabId).catch((error) => {
    setCustomTabBackgroundStatus(`背景卡读取失败：${error?.message || "请求失败"}`, "error");
  });
  focusCustomTabNameField();
}

async function deleteCustomTab(tabId) {
  const tab = getCustomTab(tabId);
  if (!tab) {
    return;
  }
  const confirmed = window.confirm(`确定删除“${tab.name || "自定义页签"}”页签吗？`);
  if (!confirmed) {
    return;
  }
  const nextTabs = state.customTabs.filter((item) => item.id !== tabId);
  try {
    await requestForumCustomTabsSave(nextTabs);
    commitCustomTabs(nextTabs);
    if (state.customTabEditingId === tabId) {
      resetCustomTabForm(true);
    } else {
      renderCustomTabsManager();
    }
    setCustomTabFormStatus("自定义页签已删除。", "success");
  } catch (error) {
    setCustomTabFormStatus(`删除失败：${error?.message || "请求失败"}`, "error");
  }
}

async function pinCustomTab(tabId) {
  const resolvedTabId = String(tabId || "").trim();
  const tab = getCustomTab(resolvedTabId);
  if (!tab) {
    return;
  }
  if (tab.pinned) {
    setCustomTabFormStatus(`“${tab.name || "当前页签"}”已置顶。`, "success");
    return;
  }
  const nextTabs = state.customTabs.map((item) => ({
    ...item,
    pinned: item.id === resolvedTabId
  }));
  try {
    await requestForumCustomTabsSave(nextTabs);
    commitCustomTabs(nextTabs);
    setCustomTabFormStatus(`已将“${tab.name || "当前页签"}”设为默认置顶页签。`, "success");
  } catch (error) {
    setCustomTabFormStatus(`置顶失败：${error?.message || "请求失败"}`, "error");
  }
}

function clearCustomTabDragClasses() {
  if (!customTabsListEl) {
    return;
  }
  customTabsListEl
    .querySelectorAll(".custom-tab-item.is-dragging, .custom-tab-item.drag-over")
    .forEach((item) => item.classList.remove("is-dragging", "drag-over"));
}

async function reorderCustomTabs(draggedId, targetId) {
  if (!draggedId || !targetId || draggedId === targetId) {
    return;
  }

  const sourceIndex = state.customTabs.findIndex((tab) => tab.id === draggedId);
  const targetIndex = state.customTabs.findIndex((tab) => tab.id === targetId);
  if (sourceIndex === -1 || targetIndex === -1) {
    return;
  }

  const nextTabs = [...state.customTabs];
  const [draggedTab] = nextTabs.splice(sourceIndex, 1);
  const resolvedTargetIndex = nextTabs.findIndex((tab) => tab.id === targetId);
  if (!draggedTab || resolvedTargetIndex === -1) {
    return;
  }
  nextTabs.splice(resolvedTargetIndex, 0, draggedTab);
  try {
    await requestForumCustomTabsSave(nextTabs);
    commitCustomTabs(nextTabs);
    setCustomTabFormStatus("已更新自定义页签顺序。", "success");
  } catch (error) {
    setCustomTabFormStatus(`更新顺序失败：${error?.message || "请求失败"}`, "error");
  }
}

function renderCustomTabsManager() {
  if (!customTabsListEl || !customTabForm) {
    return;
  }

  const editingTab = state.customTabEditingId ? getCustomTab(state.customTabEditingId) : null;
  const currentDraft = getCurrentCustomTabFormDraft();
  renderCustomTabFormWorldbookSelector(currentDraft?.worldbookIds || []);
  renderCustomTabContentEditor();

  if (!state.customTabs.length) {
    customTabsListEl.innerHTML =
      '<p class="empty-state">还没有自定义页签。先点击上方“新建页签”，再在右侧完成这个讨论区的完整编辑。</p>';
  } else {
    customTabsListEl.innerHTML = state.customTabs
      .map((tab) => {
        const snippet = truncate(
          tab.hotTopic || tab.discussionText || tab.text || tab.audience || "尚未设置内容",
          88
        );
        return `
          <article class="custom-tab-item${editingTab?.id === tab.id ? " is-active" : ""}" data-tab-id="${escapeHtml(
            tab.id
          )}" draggable="true">
            <div>
              <strong>${escapeHtml(tab.name || "未命名页签")}${tab.pinned ? " · 置顶" : ""}</strong>
              <p class="tag-stat-meta">${escapeHtml(snippet)}</p>
            </div>
            <div class="custom-tab-item__actions">
              <button class="ghost-chip" type="button" data-action="edit-custom-tab" data-tab-id="${escapeHtml(
                tab.id
              )}">编辑</button>
              <button class="ghost-chip" type="button" data-action="pin-custom-tab" data-tab-id="${escapeHtml(
                tab.id
              )}">${tab.pinned ? "已置顶" : "置顶"}</button>
              <button class="ghost-chip" type="button" data-action="clear-custom-tab-cache" data-tab-id="${escapeHtml(
                tab.id
              )}">清缓存</button>
              <button class="ghost-chip ghost-chip--danger" type="button" data-action="delete-custom-tab" data-tab-id="${escapeHtml(
                tab.id
              )}">删除</button>
            </div>
          </article>
        `;
      })
      .join("");
  }

  if (customTabsLimitHintEl) {
    const remaining = Math.max(0, CUSTOM_TAB_LIMIT - state.customTabs.length);
    customTabsLimitHintEl.textContent =
      remaining > 0
        ? `还可新增 ${remaining} 个自定义页签。`
        : `已达到 ${CUSTOM_TAB_LIMIT} 个自定义页签上限，需要删除后才能新增。`;
  }

  const isEditing = Boolean(state.customTabEditingId);
  const reachedLimit = state.customTabs.length >= CUSTOM_TAB_LIMIT;
  const disableCreation = !isEditing && reachedLimit;
  const saveButton = customTabForm.querySelector("#custom-tab-save-btn");
  [
    customTabNameInput,
    customTabAudienceInput,
    customTabTimeAwarenessInput,
    customTabBubbleFocusEnabledInput,
    customTabBubbleFocusMinutesInput,
    customTabInsFocusEnabledInput,
    customTabInsFocusMinutesInput,
    saveButton
  ].forEach((field) => {
    if (field) {
      field.disabled = disableCreation;
    }
  });
  if (customTabWorldbookListEl) {
    customTabWorldbookListEl
      .querySelectorAll("input[type='checkbox']")
      .forEach((input) => {
        if (input instanceof HTMLInputElement) {
          input.disabled = disableCreation;
        }
      });
  }
  [
    customTabDiscussionItemsEditorEl,
    customTabHotTopicItemsEditorEl
  ]
    .filter(Boolean)
    .forEach((container) => {
      container
        .querySelectorAll("textarea, button")
        .forEach((node) => {
          if (
            node instanceof HTMLTextAreaElement ||
            node instanceof HTMLButtonElement
          ) {
            node.disabled = disableCreation;
          }
        });
    });
  if (saveButton) {
    saveButton.textContent = isEditing ? "更新页签" : "保存页签";
  }
  if (customTabCreateBtn) {
    customTabCreateBtn.disabled = reachedLimit && !isEditing;
  }
  updateCustomTabFormAdvancedState();
  syncCustomTabEditorChrome();
  renderCustomTabBackgroundPanel(currentDraft || null);
  if (disableCreation) {
    setCustomTabFormStatus("已达到自定义页签上限，请删除后再新增。", "error");
  } else if (!isEditing && customTabFormStatusEl?.classList.contains("error")) {
    setCustomTabFormStatus("");
  }
}

async function handleCustomTabFormSubmit() {
  if (!customTabForm) {
    return;
  }
  const isEditing = Boolean(state.customTabEditingId);
  const draft = getCurrentCustomTabFormDraft();
  const draftItems = sortCustomTabContentItems(getCustomTabContentDraftState().items || []);
  const discussionCount = draftItems.filter((item) => item.bucket === "discussion" && item.contentText).length;
  const invalidTaggedItems = draftItems.filter(
    (item) => String(item.contentText || "").trim() && !validateDraftItemTopicTags(item)
  );
  const { name, audience } = draft;
  if (!audience) {
    setCustomTabFormStatus("请填写页签用户定位，用于告诉 AI 这个论坛里活跃的是什么人。", "error");
    return;
  }
  if (!discussionCount) {
    setCustomTabFormStatus("请至少添加 1 条普通页签文本，用于生成该讨论区的整体讨论内容。", "error");
    return;
  }
  if (invalidTaggedItems.length) {
    setCustomTabFormStatus("每条普通/热点内容都需要选择 1~3 个标签。", "error");
    return;
  }
  const saveButton = customTabForm.querySelector("#custom-tab-save-btn");
  if (saveButton instanceof HTMLButtonElement) {
    saveButton.disabled = true;
  }
  try {
    let tabId = String(state.customTabEditingId || "").trim();
    let nextTabs = [];
    if (tabId) {
      nextTabs = state.customTabs.map((tab) =>
        tab.id === tabId
          ? {
              ...tab,
              ...draft,
              id: tabId
            }
          : tab
      );
    } else {
      if (state.customTabs.length >= CUSTOM_TAB_LIMIT) {
        setCustomTabFormStatus("已达到自定义页签上限，请删除后再新增。", "error");
        return;
      }
      tabId = createCustomTabId(name);
      nextTabs = [...state.customTabs, { id: tabId, ...draft }];
    }
    state.customTabEditingId = tabId;
    getCustomTabContentDraftState().tabId = tabId;
    getCustomTabContentDraftState().items = (getCustomTabContentDraftState().items || []).map((item) => ({
      ...item,
      tabId
    }));
    await requestForumCustomTabsSave(nextTabs);
    await syncCustomTabContentDraftWithServer(tabId);
    commitCustomTabs(nextTabs);
    if (!isEditing) {
      switchHomeFeed(tabId);
    }
    setCustomTabFormStatus(isEditing ? "自定义页签已更新。" : "自定义页签已保存。", "success");
    resetCustomTabForm(true);
  } catch (error) {
    setCustomTabFormStatus(`保存失败：${error?.message || "请求失败"}`, "error");
  } finally {
    if (saveButton instanceof HTMLButtonElement) {
      saveButton.disabled = false;
    }
  }
}

function getTagFilteredPosts(tag) {
  const timelinePosts = getTagStatisticBuckets().flatMap((key) => state.feeds[key] || []);
  return dedupePosts(timelinePosts).filter((post) =>
    getRenderableTags(post, post.feedType || DEFAULT_CONTENT_FEED).includes(tag)
  );
}

function findPostById(postId, bucketName = state.activeFeed) {
  const preferredBucket =
    bucketName === "tags" ? getCurrentContentFeed() : bucketName;
  const profilePost = state.profilePosts.find((item) => item.id === postId) || null;
  if (preferredBucket === "profile" && profilePost) {
    return profilePost;
  }
  const bucketPost = (state.feeds[preferredBucket] || []).find((item) => item.id === postId);
  if (bucketPost) {
    return bucketPost;
  }

  const allFeedPost = Object.keys(state.feeds)
    .filter((key) => isTimelineFeed(key))
    .flatMap((bucket) => state.feeds[bucket] || [])
    .find((item) => item.id === postId);
  if (allFeedPost) {
    return allFeedPost;
  }

  return profilePost;
}

function renderProfilePage() {
  if (
    !profileAvatarEl ||
    !profileUsernameEl ||
    !profileBioEl ||
    !profileHandleEl ||
    !profileFollowingEl ||
    !profileFollowersEl ||
    !profilePostCountEl ||
    !profilePostsEl
  ) {
    return;
  }
  const profile = state.profile;
  const postCount = state.profilePosts.length;
  const resolvedUserId = normalizeProfileUserId(
    profile.userId,
    profile.username || DEFAULT_PROFILE.username
  );
  if (profile.avatarImage) {
    profileAvatarEl.innerHTML = `<img src="${escapeHtml(profile.avatarImage)}" alt="" />`;
  } else {
    profileAvatarEl.textContent = truncate(profile.avatar || DEFAULT_PROFILE.avatar, 4);
  }
  if (profileBannerEl) {
    profileBannerEl.style.backgroundImage = profile.bannerImage
      ? `linear-gradient(135deg, rgba(10, 16, 22, 0.28), rgba(10, 16, 22, 0.48)), url("${profile.bannerImage}")`
      : "";
  }
  profileUsernameEl.textContent = profile.username || DEFAULT_PROFILE.username;
  profileBioEl.textContent = profile.signature || DEFAULT_PROFILE.signature;
  profileHandleEl.textContent = resolvedUserId;
  profileFollowingEl.textContent = profile.following || DEFAULT_PROFILE.following;
  profileFollowersEl.textContent = profile.followers || DEFAULT_PROFILE.followers;
  profilePostCountEl.textContent = String(postCount);
  if (!state.profilePosts.length) {
    profilePostsEl.innerHTML =
      '<p class="empty-state">这个用户还没有发送任何文本内容。</p>';
    return;
  }

  profilePostsEl.innerHTML = state.profilePosts
    .map((post) => {
      const menuOpen = state.profilePostMenuId === post.id;
      const isEditing = state.profilePostEditingId === post.id;
      const avatarMarkup = renderAvatarMarkup(
        truncate(profile.avatar || DEFAULT_PROFILE.avatar, 2),
        "avatar",
        profile.avatarImage || ""
      );
      const editorBlock = isEditing
        ? `
          <div class="post-editor">
            <textarea data-post-editor-input data-post-id="${escapeHtml(post.id)}">${escapeHtml(
              state.profilePostEditingDraft
            )}</textarea>
            <div class="settings-actions">
              <button class="solid-button" type="button" data-action="save-post-edit" data-post-id="${escapeHtml(
                post.id
              )}">
                保存修改
              </button>
              <button class="ghost-button" type="button" data-action="cancel-post-edit" data-post-id="${escapeHtml(
                post.id
              )}">
                取消
              </button>
            </div>
          </div>
        `
        : `
          <div class="post-content-trigger" data-action="open-thread-modal" data-bucket="profile" data-post-id="${escapeHtml(
            post.id
          )}">
            ${post.text ? `<p class="post-text">${escapeHtml(post.text || "")}</p>` : ""}
            ${renderPostMedia(post)}
            ${renderEditedNote(post)}
          </div>
        `;
      const tagMarkup = renderPostTags(post, post.feedType || DEFAULT_CONTENT_FEED);
      const repostMarkup = renderRepostSourceBlock(post.repostSource);

      return `
        <article class="post" data-post-id="${escapeHtml(post.id)}">
          <div class="profile-post-shell">
            ${avatarMarkup}
            <div class="profile-post-main">
              <div class="profile-post-topline">
              <div class="post-head">
                <strong>${escapeHtml(profile.username || DEFAULT_PROFILE.username)}</strong>
                <span class="post-handle">${escapeHtml(resolvedUserId)}</span>
                <span class="post-time">· ${escapeHtml(post.time || "刚刚")}</span>
              </div>
                <div class="post-menu">
                  <button class="ghost-button post-menu__button" type="button" data-action="toggle-post-menu" data-post-id="${escapeHtml(
                    post.id
                  )}">
                    ...
                  </button>
                  ${
                    menuOpen
                      ? `<div class="post-menu__panel">
                          <button class="post-menu__item" type="button" data-action="start-post-edit" data-post-id="${escapeHtml(
                            post.id
                          )}">
                            编辑帖子
                          </button>
                          <button class="post-menu__item post-menu__item--danger" type="button" data-action="delete-post" data-post-id="${escapeHtml(
                            post.id
                          )}">
                            删除帖子
                          </button>
                        </div>`
                      : ""
                  }
                </div>
              </div>
              ${editorBlock}
              ${repostMarkup}
              ${tagMarkup}
              <div class="post-actions">
                <button class="action-link" type="button" data-action="open-thread-modal" data-bucket="profile" data-post-id="${escapeHtml(
                  post.id
                )}">
                  查看讨论
                </button>
                <button class="action-link" type="button" data-action="repost-post" data-bucket="profile" data-post-id="${escapeHtml(
                  post.id
                )}">
                  转发
                </button>
                <span>回复 ${post.replies || 0}</span>
                <span>转发 ${post.reposts || 0}</span>
                <span>喜欢 ${post.likes || 0}</span>
                <span>浏览 ${post.views || 0}</span>
              </div>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
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

function getGeminiSafetyRatings(payload) {
  const promptFeedback = payload?.promptFeedback || payload?.prompt_feedback || null;
  const candidate = payload?.candidates?.[0] || null;
  return {
    prompt: Array.isArray(promptFeedback?.safetyRatings)
      ? promptFeedback.safetyRatings
      : Array.isArray(promptFeedback?.safety_ratings)
        ? promptFeedback.safety_ratings
        : [],
    candidate: Array.isArray(candidate?.safetyRatings)
      ? candidate.safetyRatings
      : Array.isArray(candidate?.safety_ratings)
        ? candidate.safety_ratings
        : []
  };
}

function buildGeminiLogFields(settings, payload) {
  if (normalizeApiMode(settings?.mode) !== "gemini") {
    return {};
  }
  const finishReason = getGeminiFinishReason(payload);
  const geminiSafetyRatings = getGeminiSafetyRatings(payload);
  return {
    geminiFinishReason: finishReason,
    gemini_finish_reason: finishReason,
    geminiSafetyRatings,
    gemini_safety_ratings: geminiSafetyRatings
  };
}

function buildRequestBody(settings, prompt, count = DEFAULT_POST_COUNT, options = {}) {
  const images = Array.isArray(options?.images) ? options.images : [];
  if (isOpenAICompatibleMode(settings.mode)) {
    return {
      model: settings.model || getDefaultModelByMode(settings.mode),
      temperature: normalizeTemperature(settings.temperature, DEFAULT_TEMPERATURE),
      messages: [
        {
          role: "system",
          content: "你只输出 JSON 数组，不要输出额外解释。"
        },
        {
          role: "user",
          content: buildOpenAICompatibleContent(prompt, images)
        }
      ],
      stream: false
    };
  }

  if (normalizeApiMode(settings.mode) === "gemini") {
    return {
      systemInstruction: {
        parts: [{ text: "你只输出 JSON 数组，不要输出额外解释。" }]
      },
      contents: [
        {
          role: "user",
          parts: buildGeminiParts(prompt, images)
        }
      ],
      safetySettings: buildGeminiSafetySettings(),
      generationConfig: {
        temperature: normalizeTemperature(settings.temperature, DEFAULT_TEMPERATURE)
      }
    };
  }

  return {
    prompt,
    count,
    images,
    temperature: normalizeTemperature(settings.temperature, DEFAULT_TEMPERATURE),
    format: "json-array"
  };
}

function resolveMessage(payload) {
  if (typeof payload === "string") {
    return payload.trim();
  }

  if (Array.isArray(payload)) {
    return JSON.stringify(payload);
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

function extractJsonArray(text) {
  if (!text) {
    return "";
  }

  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenced?.[1]) {
    return fenced[1].trim();
  }

  const start = text.indexOf("[");
  const end = text.lastIndexOf("]");
  if (start !== -1 && end !== -1 && end > start) {
    return text.slice(start, end + 1);
  }

  return "";
}

function extractJsonObject(text) {
  if (!text) {
    return "";
  }
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenced?.[1]) {
    return fenced[1].trim();
  }
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start !== -1 && end !== -1 && end > start) {
    return text.slice(start, end + 1);
  }
  return "";
}

function repairMalformedJsonArrayText(jsonText) {
  return String(jsonText || "")
    .replace(/,\s*([}\]])/g, "$1")
    .replace(/([,\[]\s*)(#([^"\],\r\n]+))"(?=\s*[,}\]])/g, '$1"$2"')
    .replace(/([,\[]\s*)(#([^"\],\r\n]+))(?=\s*[,}\]])/g, '$1"$2"');
}

function repairMalformedJsonObjectText(jsonText) {
  return repairMalformedJsonArrayText(jsonText);
}

function parseJsonArrayWithRepair(jsonText, errorMessage) {
  try {
    return JSON.parse(jsonText);
  } catch (originalError) {
    const repairedJsonText = repairMalformedJsonArrayText(jsonText);
    if (repairedJsonText !== jsonText) {
      try {
        return JSON.parse(repairedJsonText);
      } catch (_repairError) {
        throw new Error(errorMessage || originalError.message);
      }
    }
    throw originalError;
  }
}

function parseJsonObjectWithRepair(jsonText, errorMessage) {
  try {
    return JSON.parse(jsonText);
  } catch (originalError) {
    const repairedJsonText = repairMalformedJsonObjectText(jsonText);
    if (repairedJsonText !== jsonText) {
      try {
        return JSON.parse(repairedJsonText);
      } catch (_repairError) {
        throw new Error(errorMessage || originalError.message);
      }
    }
    throw originalError;
  }
}

function parseGeneratedPosts(
  rawText,
  count = DEFAULT_POST_COUNT,
  feedType = DEFAULT_CONTENT_FEED
) {
  const jsonText = extractJsonArray(rawText);
  if (!jsonText) {
    throw new Error("接口已返回内容，但没有找到 JSON 数组。");
  }

  const parsed = parseJsonArrayWithRepair(
    jsonText,
    "接口返回的 JSON 解析失败，请检查 tags 是否都使用双引号包裹。"
  );
  if (!Array.isArray(parsed) || !parsed.length) {
    throw new Error("接口返回的 JSON 不是有效的讨论数组。");
  }

  return parsed
    .slice(0, count)
    .map((item, index) => normalizePost(item, index, feedType));
}

function parseGeneratedReplies(rawText, count = DEFAULT_REPLY_COUNT, seed = "reply") {
  const jsonText = extractJsonArray(rawText);
  if (!jsonText) {
    throw new Error("接口已返回内容，但没有找到 JSON 数组。");
  }

  const parsed = parseJsonArrayWithRepair(jsonText, "接口返回的回复 JSON 解析失败。");
  if (!Array.isArray(parsed) || !parsed.length) {
    throw new Error("接口返回的 JSON 不是有效的回复数组。");
  }

  return parsed
    .slice(0, count)
    .map((item, index) => normalizeReply(item, index, `${seed}-${index}`));
}

function findReplyNode(replies, replyId) {
  for (const reply of replies) {
    if (reply.id === replyId) {
      return reply;
    }
    const nested = findReplyNode(reply.children || [], replyId);
    if (nested) {
      return nested;
    }
  }
  return null;
}

function createAuthoredPost(
  content,
  feedType = state.activeFeed,
  tagsInput = "",
  imageDataUrl = "",
  options = {}
) {
  const profile = getCurrentProfile();
  const repostSource = normalizeRepostSource(options.repostSource || null);
  const tags = normalizeTags(tagsInput, 5);
  const imageSeed = String(imageDataUrl || "").slice(0, 64);
  const createdAt = Date.now();
  const post = normalizePost(
    {
      id: `profile_post_${createdAt}_${hashText(`${content}-${imageSeed}`)}`,
      displayName: profile.username,
      handle: normalizeProfileUserId(profile.userId, profile.username),
      text: content,
      imageDataUrl,
      tags,
      replies: 0,
      reposts: 0,
      likes: 0,
      views: 1,
      time: formatForumTimestamp(createdAt),
      createdAt,
      repostSource
    },
    0,
    feedType
  );

  post.authorOwned = true;
  post.feedType = feedType;
  return post;
}

function repostMainPost(postId, bucketName = state.activeFeed) {
  const sourcePost = findPostById(postId, bucketName);
  if (!sourcePost) {
    setHomeStatus("未找到要转发的帖子。", "error");
    return;
  }

  startHomeComposerQuote(sourcePost, bucketName);
  renderThreadModal();
  setHomeStatus("已进入引用转发模式。", "success");
}

function setHomeComposerStatus(message, tone = "") {
  homeComposerStatusEl.textContent = message;
  homeComposerStatusEl.className = "status-text";
  if (tone) {
    homeComposerStatusEl.classList.add(tone);
  }
}

function submitHomePost() {
  const content = homeComposerInput.value.trim();
  const repostSource = getHomeComposerRepostSource();
  const isQuoteMode = Boolean(repostSource);
  const tagsInput = isQuoteMode ? "" : homeComposerTagsInput?.value.trim() || "";
  const imageDataUrl = isQuoteMode ? "" : state.homeComposerImageDataUrl || "";
  const targetFeed = getCurrentContentFeed(state.activeFeed);
  if (!content && !imageDataUrl && !repostSource) {
    setHomeComposerStatus("请输入帖子内容或添加图片后再发送。", "error");
    return;
  }

  const post = createAuthoredPost(content, targetFeed, tagsInput, imageDataUrl, { repostSource });
  state.profilePosts = [post, ...state.profilePosts];
  state.feeds[targetFeed] = [post, ...(state.feeds[targetFeed] || [])].slice(
    0,
    MAX_FEED_ITEMS
  );
  if (isQuoteMode && state.homeComposerRepostPostId) {
    updatePostAcrossBuckets(state.homeComposerRepostPostId, (currentPost) => ({
      ...currentPost,
      reposts: Math.max(0, Number(currentPost.reposts) || 0) + 1
    }));
  }
  persistProfilePosts(state.profilePosts);
  persistFeeds(state.feeds);
  persistDiscussions();
  renderActiveFeed();
  renderProfilePage();
  updateReplyPromptPreview();
  homeComposerInput.value = "";
  if (homeComposerTagsInput) {
    homeComposerTagsInput.value = "";
  }
  clearHomeComposerImage();
  clearHomeComposerRepostSource({ preserveContent: true });
  setHomeComposerOpen(false);
  setHomeComposerStatus(
    isQuoteMode ? "引用转发已发送，并同步到个人主页。" : "帖子已发送，并同步到个人主页。",
    "success"
  );
}

function orderGeneratedBatchItemsBySlot(items = [], batchTasks = []) {
  const normalizedItems = Array.isArray(items) ? items : [];
  const tasks = Array.isArray(batchTasks) ? batchTasks : [];
  const slotMap = new Map();
  normalizedItems.forEach((item) => {
    const slotIndex = Number(item?.slotIndex);
    if (Number.isFinite(slotIndex) && !slotMap.has(slotIndex)) {
      slotMap.set(slotIndex, item);
    }
  });
  if (!slotMap.size) {
    return normalizedItems;
  }
  const ordered = tasks
    .map((task) => slotMap.get(Number(task?.slotIndex)))
    .filter(Boolean);
  const consumedSlots = new Set(ordered.map((item) => Number(item?.slotIndex)));
  const extras = normalizedItems.filter((item) => !consumedSlots.has(Number(item?.slotIndex)));
  return [...ordered, ...extras];
}

function parseGeneratedPostsForBatch(rawText, batch = null, feedType = DEFAULT_CONTENT_FEED) {
  const jsonText = extractJsonArray(rawText);
  if (!jsonText) {
    throw new Error("接口已返回内容，但没有找到 JSON 数组。");
  }
  const parsed = parseJsonArrayWithRepair(
    jsonText,
    "接口返回的 JSON 解析失败，请检查 tags 是否都使用双引号包裹。"
  );
  if (!Array.isArray(parsed) || !parsed.length) {
    throw new Error("接口返回的 JSON 不是有效的讨论数组。");
  }
  const ordered = orderGeneratedBatchItemsBySlot(parsed, batch?.tasks || []);
  const expectedCount = Array.isArray(batch?.tasks) ? batch.tasks.length : parsed.length;
  return ordered
    .slice(0, expectedCount)
    .map((item, index) => normalizePost(item, index, feedType));
}

function parseGeneratedRepliesForBatch(rawText, batch = null, seed = "reply") {
  const jsonText = extractJsonArray(rawText);
  if (!jsonText) {
    throw new Error("接口已返回内容，但没有找到 JSON 数组。");
  }
  const parsed = parseJsonArrayWithRepair(jsonText, "接口返回的回复 JSON 解析失败。");
  if (!Array.isArray(parsed) || !parsed.length) {
    throw new Error("接口返回的 JSON 不是有效的回复数组。");
  }
  const ordered = orderGeneratedBatchItemsBySlot(parsed, batch?.tasks || []);
  const expectedCount = Array.isArray(batch?.tasks) ? batch.tasks.length : parsed.length;
  return ordered
    .slice(0, expectedCount)
    .map((item, index) => normalizeReply(item, index, `${seed}-${index}`));
}

async function executeDiscussionGenerationBatchRequest(options = {}) {
  const settings = options.settings || {};
  const requestEndpoint = String(options.requestEndpoint || "").trim();
  const prompt = String(options.prompt || "").trim();
  const requestBody = options.requestBody || {};
  const privacySession = options.privacySession || null;
  const logBase = options.logBase || {};
  const parseItems = typeof options.parseItems === "function" ? options.parseItems : () => [];
  const successSummary = String(options.successSummary || "").trim();
  const emptyMessage = String(options.emptyMessage || "接口请求成功，但响应中没有可解析的文本。").trim();
  const httpErrorPrefix = String(options.httpErrorPrefix || "接口请求失败").trim();
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
          "DeepSeek 接口返回 404。请确认地址为 https://api.deepseek.com/chat/completions，而不是 /v1/chat/completions 或仅填写域名。"
      });
      logged = true;
      throw new Error(
        "DeepSeek 接口返回 404。请确认地址为 https://api.deepseek.com/chat/completions，而不是 /v1/chat/completions 或仅填写域名。"
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
        errorMessage: `${httpErrorPrefix}：HTTP ${response.status}`
      });
      logged = true;
      throw new Error(`${httpErrorPrefix}：HTTP ${response.status}`);
    }

    const message = resolveMessage(payload);
    if (!message) {
      appendApiLog({
        ...logBase,
        ...buildGeminiLogFields(settings, payload),
        status: "error",
        statusCode: response.status,
        responseText: rawResponse,
        responseBody: payload,
        errorMessage: emptyMessage
      });
      logged = true;
      throw new Error(emptyMessage);
    }

    const parsedItems = parseItems(message);
    appendApiLog({
      ...logBase,
      ...buildGeminiLogFields(settings, payload),
      status: "success",
      statusCode: response.status,
      responseText: rawResponse,
      responseBody: payload,
      summary: encodeTextWithPrivacy(successSummary, privacySession)
    });
    logged = true;
    return decodeValueWithPrivacy(parsedItems, privacySession);
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

async function requestGeneratedPosts(
  settings,
  feedType = state.activeFeed,
  count = settings.homeCount || DEFAULT_POST_COUNT
) {
  const resolvedFeedType = getCurrentContentFeed(feedType);
  const requestEndpoint = resolveApiRequestEndpoint(settings);
  settings.endpoint = requestEndpoint;

  if (!requestEndpoint) {
    throw new Error("未配置 API 地址，无法生成讨论流。");
  }

  if (isOpenAICompatibleMode(settings.mode) && !settings.model) {
    throw new Error("DeepSeek / Grok / OpenAI 兼容模式需要填写模型名称。");
  }
  if (normalizeApiMode(settings.mode) === "gemini" && !settings.token) {
    throw new Error("Gemini 模式需要填写 API Key。");
  }

  const generationContext = isCustomFeed(resolvedFeedType)
    ? await requestForumGenerationContext(resolvedFeedType, {
        generationType: "posts",
        requestedCount: count,
        maxCards: 10,
        detailLevel: "full"
      })
    : null;
  if (Array.isArray(generationContext?.generationBatches) && generationContext.generationBatches.length) {
    const mergedPosts = [];
    for (const batch of generationContext.generationBatches) {
      const batchCount = Array.isArray(batch?.tasks) ? batch.tasks.length : 0;
      if (!batchCount) {
        continue;
      }
      const batchContext = buildForumBatchScopedGenerationContext(
        settings,
        resolvedFeedType,
        generationContext,
        batch,
        { generationType: "posts" }
      );
      const prompt = buildPrompt(settings, resolvedFeedType, batchCount, {
        generationContext: batchContext
      });
      const privacySession = createPrivacySession({
        settings,
        profile: getCurrentProfile(),
        resolvedFeedType,
        generationContext: batchContext,
        prompt
      });
      const encodedPrompt = preparePromptWithPrivacy(prompt, privacySession);
      const requestBody = buildRequestBody(settings, encodedPrompt, batchCount);
      const logBase = applyPrivacyToLogEntry(
        buildDiscussionApiLogBase(
          "generate_posts",
          settings,
          requestEndpoint,
          encodedPrompt,
          requestBody,
          `页签：${getFeedLabel(resolvedFeedType)} · 批次 ${Number(batch.batchIndex) || 1} · 数量：${batchCount}`
        ),
        privacySession
      );
      const batchItems = await executeDiscussionGenerationBatchRequest({
        settings,
        requestEndpoint,
        prompt,
        requestBody,
        privacySession,
        logBase,
        parseItems: (message) =>
          parseGeneratedPostsForBatch(message, batch, resolvedFeedType).map((item, index) =>
            attachForumGenerationMetadata(item, batchContext, "post", index)
          ),
        successSummary: `页签：${getFeedLabel(resolvedFeedType)} · 批次 ${Number(batch.batchIndex) || 1} 已生成 ${batchCount} 条帖子`,
        emptyMessage: "接口请求成功，但响应中没有可解析的文本。",
        httpErrorPrefix: "接口请求失败"
      });
      mergedPosts.push(...batchItems);
    }
    return mergedPosts.slice(0, count);
  }
  const prompt = buildPrompt(settings, resolvedFeedType, count, {
    generationContext
  });
  const privacySession = createPrivacySession({
    settings,
    profile: getCurrentProfile(),
    resolvedFeedType,
    generationContext,
    prompt
  });
  const encodedPrompt = preparePromptWithPrivacy(prompt, privacySession);
  const requestBody = buildRequestBody(settings, encodedPrompt, count);
  const logBase = applyPrivacyToLogEntry(
    buildDiscussionApiLogBase(
      "generate_posts",
      settings,
      requestEndpoint,
      encodedPrompt,
      requestBody,
      `页签：${getFeedLabel(resolvedFeedType)} · 数量：${count}`
    ),
    privacySession
  );
  return executeDiscussionGenerationBatchRequest({
    settings,
    requestEndpoint,
    prompt,
    requestBody,
    privacySession,
    logBase,
    parseItems: (message) =>
      parseGeneratedPosts(message, count, resolvedFeedType).map((item, index) =>
        attachForumGenerationMetadata(item, generationContext, "post", index)
      ),
    successSummary: `页签：${getFeedLabel(resolvedFeedType)} · 已生成 ${count} 条帖子`,
    emptyMessage: "接口请求成功，但响应中没有可解析的文本。",
    httpErrorPrefix: "接口请求失败"
  });
}

function buildTranslatePrompt(sourceText) {
  return buildStructuredPromptSections(
    "discussion_translate_text",
    {
      context_library: {
        source_text: sourceText
      }
    },
    {
      settings: getCurrentSettings(),
      includeNegativeConstraints: false
    }
  );
}

function buildTranslatePostPrompt(post) {
  return buildStructuredPromptSections(
    "discussion_translate_post",
    {
      context_library: {
        post_text: post.text || "",
        post_tags: getRenderableTags(post, post.feedType || DEFAULT_CONTENT_FEED).join(" ")
      }
    },
    {
      settings: getCurrentSettings(),
      includeNegativeConstraints: false
    }
  );
}

function buildTranslateRequestBody(settings, prompt) {
  const mode = normalizeApiMode(settings.mode);
  if (isOpenAICompatibleMode(mode)) {
    return {
      model: settings.model || getDefaultModelByMode(mode),
      temperature: 0.2,
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      stream: false
    };
  }

  if (mode === "gemini") {
    return {
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }]
        }
      ],
      safetySettings: buildGeminiSafetySettings(),
      generationConfig: {
        temperature: 0.2
      }
    };
  }

  return {
    prompt,
    intent: "translate_to_zh"
  };
}

function normalizeTranslatedText(rawText, fallbackText = "") {
  let resolvedText = String(rawText || "").trim();
  const fenced = resolvedText.match(/```(?:json|text|markdown)?\s*([\s\S]*?)```/i);
  if (fenced?.[1]) {
    resolvedText = fenced[1].trim();
  }

  const jsonText = extractJsonArray(resolvedText);
  if (jsonText) {
    try {
      const parsed = parseJsonArrayWithRepair(jsonText, "翻译响应 JSON 解析失败。");
      if (Array.isArray(parsed) && parsed.length) {
        const first = parsed[0];
        if (typeof first === "string") {
          resolvedText = first.trim();
        } else if (first && typeof first === "object") {
          resolvedText = String(
            first.translation ||
              first.translatedText ||
              first.text ||
              first.output ||
              resolvedText
          ).trim();
        }
      }
    } catch (_error) {
      // ignore JSON parsing failures for translation responses
    }
  }

  resolvedText = resolvedText
    .replace(/^["'`“”]+/, "")
    .replace(/["'`“”]+$/, "")
    .trim();
  return resolvedText || fallbackText;
}

async function requestTranslatedPostContent(settings, post) {
  const requestEndpoint = resolveApiRequestEndpoint(settings);
  settings.endpoint = requestEndpoint;
  if (!requestEndpoint) {
    throw new Error("未配置 API 地址，无法执行翻译。");
  }
  if (isOpenAICompatibleMode(settings.mode) && !settings.model) {
    throw new Error("DeepSeek / Grok / OpenAI 兼容模式需要填写模型名称。");
  }
  if (normalizeApiMode(settings.mode) === "gemini" && !settings.token) {
    throw new Error("Gemini 模式需要填写 API Key。");
  }

  const prompt = buildTranslatePostPrompt(post);
  const privacySession = null;
  const encodedPrompt = prompt;
  const requestBody = buildTranslateRequestBody(settings, encodedPrompt);
  const logBase = applyPrivacyToLogEntry(
    buildDiscussionApiLogBase(
      "translate_post",
      settings,
      requestEndpoint,
      encodedPrompt,
      requestBody,
      `帖子：${truncate(post?.text || "图片帖子", 48)}`
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
        errorMessage: `翻译请求失败：HTTP ${response.status}`
      });
      logged = true;
      throw new Error(`翻译请求失败：HTTP ${response.status}`);
    }

    const message = resolveMessage(payload);
    if (!message) {
      appendApiLog({
        ...logBase,
        ...buildGeminiLogFields(settings, payload),
        status: "error",
        statusCode: response.status,
        responseText: rawResponse,
        responseBody: payload,
        errorMessage: "翻译请求成功，但响应为空。"
      });
      logged = true;
      throw new Error("翻译请求成功，但响应为空。");
    }

    const jsonText = extractJsonArray(message);
    if (!jsonText) {
      appendApiLog({
        ...logBase,
        ...buildGeminiLogFields(settings, payload),
        status: "error",
        statusCode: response.status,
        responseText: rawResponse,
        responseBody: payload,
        errorMessage: "翻译响应中没有可解析的 JSON 数组。"
      });
      logged = true;
      throw new Error("翻译响应中没有可解析的 JSON 数组。");
    }

    const parsed = parseJsonArrayWithRepair(jsonText, "翻译标签 JSON 解析失败。");
    const translatedPost = decodeValueWithPrivacy(
      Array.isArray(parsed) && parsed.length ? parsed[0] : null,
      privacySession
    );
    if (!translatedPost || typeof translatedPost !== "object") {
      appendApiLog({
        ...logBase,
        ...buildGeminiLogFields(settings, payload),
        status: "error",
        statusCode: response.status,
        responseText: rawResponse,
        responseBody: payload,
        errorMessage: "翻译响应格式不正确。"
      });
      logged = true;
      throw new Error("翻译响应格式不正确。");
    }

    const result = {
      text: normalizeTranslatedText(translatedPost.text || "", post.text || ""),
      tags: normalizeTags(translatedPost.tags || [], 5)
    };
    appendApiLog({
      ...logBase,
      ...buildGeminiLogFields(settings, payload),
      status: "success",
      statusCode: response.status,
      responseText: rawResponse,
      responseBody: payload,
      summary: encodeTextWithPrivacy(`帖子翻译完成：${truncate(result.text, 48)}`, privacySession)
    });
    logged = true;
    return result;
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

async function requestTranslatedText(settings, sourceText) {
  const originalText = String(sourceText || "").trim();
  if (!originalText) {
    return "";
  }

  const requestEndpoint = resolveApiRequestEndpoint(settings);
  settings.endpoint = requestEndpoint;
  if (!requestEndpoint) {
    throw new Error("未配置 API 地址，无法执行翻译。");
  }
  if (isOpenAICompatibleMode(settings.mode) && !settings.model) {
    throw new Error("DeepSeek / Grok / OpenAI 兼容模式需要填写模型名称。");
  }
  if (normalizeApiMode(settings.mode) === "gemini" && !settings.token) {
    throw new Error("Gemini 模式需要填写 API Key。");
  }

  const prompt = buildTranslatePrompt(originalText);
  const privacySession = null;
  const encodedPrompt = prompt;
  const requestBody = buildTranslateRequestBody(settings, encodedPrompt);
  const logBase = applyPrivacyToLogEntry(
    buildDiscussionApiLogBase(
      "translate_reply",
      settings,
      requestEndpoint,
      encodedPrompt,
      requestBody,
      `回复：${truncate(originalText, 48)}`
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
        errorMessage: `翻译请求失败：HTTP ${response.status}`
      });
      logged = true;
      throw new Error(`翻译请求失败：HTTP ${response.status}`);
    }

    const message = decodeTextWithPrivacy(resolveMessage(payload), privacySession);
    if (!message) {
      appendApiLog({
        ...logBase,
        ...buildGeminiLogFields(settings, payload),
        status: "error",
        statusCode: response.status,
        responseText: rawResponse,
        responseBody: payload,
        errorMessage: "翻译请求成功，但响应为空。"
      });
      logged = true;
      throw new Error("翻译请求成功，但响应为空。");
    }

    const translated = normalizeTranslatedText(message, originalText);
    appendApiLog({
      ...logBase,
      ...buildGeminiLogFields(settings, payload),
      status: "success",
      statusCode: response.status,
      responseText: rawResponse,
      responseBody: payload,
      summary: encodeTextWithPrivacy(`回复翻译完成：${truncate(translated, 48)}`, privacySession)
    });
    logged = true;
    return translated;
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

async function translatePostToChinese(postId, bucketName = state.activeFeed) {
  const post = findPostById(postId, bucketName);
  if (!post) {
    return;
  }
  const resolvedBucket = resolveThreadBucketName(bucketName, post);
  if (isPostTranslating(postId, resolvedBucket)) {
    return;
  }

  setPostTranslating(postId, resolvedBucket, true);
  renderActiveFeed();
  renderProfilePage();
  renderThreadModal();

  try {
    const translated = await requestTranslatedPostContent(
      getTranslationRequestSettings({ ...getCurrentSettings() }),
      post
    );
    updatePostAcrossBuckets(postId, (item) => ({
      ...item,
      translationZh: translated.text,
      translatedTags: translated.tags
    }));
    setHomeStatus("已生成帖子中文翻译。", "success");
  } catch (error) {
    setHomeStatus(`帖子翻译失败：${error.message || "请求失败"}`, "error");
  } finally {
    setPostTranslating(postId, resolvedBucket, false);
    renderActiveFeed();
    renderProfilePage();
    renderThreadModal();
  }
}

async function translateReplyToChinese(postId, replyId, bucketName = state.activeFeed) {
  const post = findPostById(postId, bucketName);
  if (!post) {
    return;
  }
  const resolvedBucket = resolveThreadBucketName(bucketName, post);
  const threadState = getPostThreadState(postId, resolvedBucket);
  const targetReply = findReplyNode(threadState?.replies || [], replyId);
  if (!targetReply) {
    return;
  }
  if (isReplyTranslating(postId, replyId, resolvedBucket)) {
    return;
  }

  setReplyTranslating(postId, replyId, resolvedBucket, true);
  renderThreadModal();

  try {
    const translatedText = await requestTranslatedText(
      getTranslationRequestSettings({ ...getCurrentSettings() }),
      targetReply.text || ""
    );
    targetReply.translationZh = translatedText;
    syncDiscussionForAuthoredPost(post, resolvedBucket, postId, threadState);
    persistDiscussions();
    setHomeStatus("已生成回复中文翻译。", "success");
  } catch (error) {
    setHomeStatus(`回复翻译失败：${error.message || "请求失败"}`, "error");
  } finally {
    setReplyTranslating(postId, replyId, resolvedBucket, false);
    renderThreadModal();
  }
}

async function requestGeneratedReplies(
  settings,
  profile,
  feedType,
  rootPost,
  parentReply = null,
  count = settings.replyCount || DEFAULT_REPLY_COUNT
) {
  const resolvedFeedType = getCurrentContentFeed(feedType);
  const requestEndpoint = resolveApiRequestEndpoint(settings);
  settings.endpoint = requestEndpoint;

  if (!requestEndpoint) {
    throw new Error("未配置 API 地址，无法生成回复。");
  }
  if (normalizeApiMode(settings.mode) === "gemini" && !settings.token) {
    throw new Error("Gemini 模式需要填写 API Key。");
  }

  const generationContext = isCustomFeed(resolvedFeedType)
    ? await requestForumGenerationContext(resolvedFeedType, {
        generationType: "replies",
        requestedCount: count,
        maxCards: 8,
        detailLevel: "full",
        rootPostMetadata: rootPost?.metadata || {},
        rootPostTags: Array.isArray(rootPost?.tags) ? rootPost.tags : [],
        parentReplyMetadata: parentReply?.metadata || {},
        isNestedReply: Boolean(parentReply)
      })
    : null;
  if (Array.isArray(generationContext?.generationBatches) && generationContext.generationBatches.length) {
    const mergedReplies = [];
    for (const batch of generationContext.generationBatches) {
      const batchCount = Array.isArray(batch?.tasks) ? batch.tasks.length : 0;
      if (!batchCount) {
        continue;
      }
      const batchContext = buildForumBatchScopedGenerationContext(
        settings,
        resolvedFeedType,
        generationContext,
        batch,
        { generationType: "replies" }
      );
      const prompt = buildReplyPrompt(
        settings,
        profile,
        resolvedFeedType,
        rootPost,
        parentReply,
        batchCount,
        {
          generationContext: batchContext
        }
      );
      const privacySession = createPrivacySession({
        settings,
        profile,
        rootPost,
        parentReply,
        feedType: resolvedFeedType,
        generationContext: batchContext,
        prompt
      });
      const encodedPrompt = preparePromptWithPrivacy(prompt, privacySession);
      const requestBody = buildRequestBody(settings, encodedPrompt, batchCount, {
        images: [rootPost?.imageDataUrl].filter(Boolean)
      });
      const logBase = applyPrivacyToLogEntry(
        buildDiscussionApiLogBase(
          "generate_replies",
          settings,
          requestEndpoint,
          encodedPrompt,
          requestBody,
          `页签：${getFeedLabel(resolvedFeedType)} · 批次 ${Number(batch.batchIndex) || 1} · 主贴：${truncate(rootPost?.text || "图片帖子", 48)}${parentReply ? " · 楼中楼" : ""}`
        ),
        privacySession
      );
      const batchItems = await executeDiscussionGenerationBatchRequest({
        settings,
        requestEndpoint,
        prompt,
        requestBody,
        privacySession,
        logBase,
        parseItems: (message) =>
          parseGeneratedRepliesForBatch(
            message,
            batch,
            `${rootPost.id}-${parentReply?.id || "root"}-${Number(batch.batchIndex) || 1}`
          ).map((item, index) => attachForumGenerationMetadata(item, batchContext, "reply", index)),
        successSummary: `页签：${getFeedLabel(resolvedFeedType)} · 批次 ${Number(batch.batchIndex) || 1} 已生成 ${batchCount} 条论坛回复${parentReply ? "（楼中楼）" : ""}`,
        emptyMessage: "接口返回成功，但没有可解析的回复内容。",
        httpErrorPrefix: "回复请求失败"
      });
      mergedReplies.push(...batchItems);
    }
    return mergedReplies.slice(0, count);
  }
  const prompt = buildReplyPrompt(
    settings,
    profile,
    resolvedFeedType,
    rootPost,
    parentReply,
    count,
    {
      generationContext
    }
  );
  const privacySession = createPrivacySession({
    settings,
    profile,
    rootPost,
    parentReply,
    feedType: resolvedFeedType,
    generationContext,
    prompt
  });
  const encodedPrompt = preparePromptWithPrivacy(prompt, privacySession);
  const requestBody = buildRequestBody(settings, encodedPrompt, count, {
    images: [rootPost?.imageDataUrl].filter(Boolean)
  });
  const logBase = applyPrivacyToLogEntry(
    buildDiscussionApiLogBase(
      "generate_replies",
      settings,
      requestEndpoint,
      encodedPrompt,
      requestBody,
      `页签：${getFeedLabel(resolvedFeedType)} · 主贴：${truncate(rootPost?.text || "图片帖子", 48)}${parentReply ? " · 楼中楼" : ""}`
    ),
    privacySession
  );
  return executeDiscussionGenerationBatchRequest({
    settings,
    requestEndpoint,
    prompt,
    requestBody,
    privacySession,
    logBase,
    parseItems: (message) =>
      parseGeneratedReplies(
        message,
        count,
        `${rootPost.id}-${parentReply?.id || "root"}`
      ).map((item, index) => attachForumGenerationMetadata(item, generationContext, "reply", index)),
    successSummary: `页签：${getFeedLabel(resolvedFeedType)} · 已生成 ${count} 条论坛回复${parentReply ? "（楼中楼）" : ""}`,
    emptyMessage: "接口返回成功，但没有可解析的回复内容。",
    httpErrorPrefix: "回复请求失败"
  });
}

async function expandPostDiscussion(postId, bucketName = state.activeFeed) {
  const post = findPostById(postId, bucketName);
  if (!post) {
    return;
  }

  const feedState = getDiscussionBucket(bucketName);
  if (feedState[postId]?.replies?.length) {
    feedState[postId] = {
      ...feedState[postId],
      expanded: true,
      loading: false
    };
    if (post.authorOwned && bucketName !== "profile") {
      state.discussions.profile[postId] = feedState[postId];
    }
    if (post.authorOwned && bucketName === "profile" && post.feedType) {
      getDiscussionBucket(post.feedType)[postId] = feedState[postId];
    }
    persistDiscussions();
    renderActiveFeed();
    renderProfilePage();
    return;
  }

  feedState[postId] = {
    expanded: true,
    loading: true,
    replies: feedState[postId]?.replies || []
  };
  renderActiveFeed();
  renderProfilePage();

  const settings = { ...getCurrentSettings() };
  const profile = { ...getCurrentProfile() };
  try {
    const replyCount = settings.replyCount || DEFAULT_REPLY_COUNT;
    const replies = await requestGeneratedReplies(
      settings,
      profile,
      post.feedType || state.activeFeed,
      post,
      null,
      replyCount
    );

    feedState[postId] = {
      expanded: true,
      loading: false,
      replies
    };
    if (post.authorOwned && bucketName !== "profile") {
      state.discussions.profile[postId] = feedState[postId];
    }
    if (post.authorOwned && bucketName === "profile" && post.feedType) {
      getDiscussionBucket(post.feedType)[postId] = feedState[postId];
    }
    persistDiscussions();
    renderActiveFeed();
    renderProfilePage();
  } catch (error) {
    feedState[postId] = {
      expanded: true,
      loading: false,
      replies: []
    };
    persistDiscussions();
    setHomeStatus(`讨论回复加载失败：${error?.message || "请求失败"}`, "error");
    renderActiveFeed();
    renderProfilePage();
  }
}

async function togglePostDiscussion(postId, bucketName = state.activeFeed) {
  const threadState = getPostThreadState(postId, bucketName);
  if (threadState?.expanded) {
    threadState.expanded = false;
    persistDiscussions();
    renderActiveFeed();
    renderProfilePage();
    return;
  }

  await expandPostDiscussion(postId, bucketName);
}

async function toggleNestedReply(postId, replyId, bucketName = state.activeFeed) {
  const threadState = getPostThreadState(postId, bucketName);
  if (!threadState) {
    return;
  }

  const targetReply = findReplyNode(threadState.replies || [], replyId);
  const rootPost = findPostById(postId, bucketName);
  if (!targetReply || !rootPost) {
    return;
  }

  if (targetReply.expanded) {
    targetReply.expanded = false;
    persistDiscussions();
    renderActiveFeed();
    renderProfilePage();
    renderThreadModal();
    return;
  }

  if (targetReply.children?.length) {
    targetReply.expanded = true;
    targetReply.loading = false;
    persistDiscussions();
    renderActiveFeed();
    renderProfilePage();
    renderThreadModal();
    return;
  }

  targetReply.expanded = true;
  targetReply.loading = true;
  renderActiveFeed();
  renderProfilePage();
  renderThreadModal();

  const settings = { ...getCurrentSettings() };
  const profile = { ...getCurrentProfile() };
  try {
    const replies = await requestGeneratedReplies(
      settings,
      profile,
      rootPost.feedType || state.activeFeed,
      rootPost,
      targetReply,
      NESTED_REPLY_COUNT
    );

    targetReply.children = replies;
    targetReply.loading = false;
    if (rootPost.authorOwned && bucketName === "profile" && rootPost.feedType) {
      getDiscussionBucket(rootPost.feedType)[postId] = threadState;
    }
    if (rootPost.authorOwned && bucketName !== "profile") {
      state.discussions.profile[postId] = threadState;
    }
    persistDiscussions();
    renderActiveFeed();
    renderProfilePage();
    renderThreadModal();
  } catch (error) {
    targetReply.children = [];
    targetReply.loading = false;
    persistDiscussions();
    setHomeStatus(`楼中楼加载失败：${error?.message || "请求失败"}`, "error");
    renderActiveFeed();
    renderProfilePage();
    renderThreadModal();
  }
}

async function handleImageSelection(file, target) {
  if (!file) {
    if (target === "home") {
      clearHomeComposerImage();
    }
    return;
  }

  try {
    const dataUrl = await readFileAsDataUrl(file);
    if (target === "home") {
      state.homeComposerImageDataUrl = dataUrl;
      renderComposerMediaPreview(
        homeComposerImagePreviewEl,
        dataUrl,
        "remove-home-composer-image"
      );
      setHomeComposerStatus("帖子图片已添加。", "success");
    }
  } catch (_error) {
    if (target === "home") {
      setHomeComposerStatus("帖子图片读取失败，请重试。", "error");
    }
  }
}

async function refreshHomeFeed(trigger = "manual") {
  if (state.isRefreshing) {
    return;
  }
  if (state.activeFeed === "tags") {
    state.pullDistance = 0;
    setPullIndicator(0, "idle");
    updateHomeRefreshAvailability();
    setHomeStatus("热门标签页不支持刷新，请切换到具体页签。", "error");
    return;
  }

  saveCurrentSettings();
  const targetFeed = getCurrentContentFeed(state.activeFeed);
  state.isRefreshing = true;
  updateHomeRefreshAvailability();
  setPullIndicator(Math.max(state.pullDistance, PULL_THRESHOLD), "loading");
  setHomeStatus(`正在生成“${getFeedLabel(targetFeed)}”讨论流…`, "");
  setSettingsStatus("如果接口可用，将优先使用 API 返回的 10 条讨论。");
  topRefreshBtn.disabled = true;
  settingsGenerateBtn.disabled = true;

  const settings = { ...state.settings };
  const profile = { ...getCurrentProfile() };
  const homeCount = settings.homeCount || DEFAULT_POST_COUNT;

  try {
    let posts;
    const sourceLabel = "API";

    try {
      posts = await requestGeneratedPosts(settings, targetFeed, homeCount);
    } catch (error) {
      const errorMessage = error.message || "请求失败";
      setSettingsStatus(errorMessage, "error");
      setHomeStatus(`刷新失败：${errorMessage}`, "error");
      return;
    }

    syncAuthoredPostIdentity(profile);
    refreshAuthoredPostsEngagement(profile);
    const mountedRepostSource = getMountedInsRepostSource(settings, targetFeed);
    const normalizedIncomingPosts = ensureDistinctGeneratedPosts(
      posts.map((item, index) =>
        normalizePost(
          mountedRepostSource
            ? {
                ...item,
                repostSource: mountedRepostSource
              }
            : item,
          index,
          targetFeed
        )
      ),
      state.feeds[targetFeed] || [],
      settings,
      targetFeed,
      homeCount
    );
    state.feeds[targetFeed] = mergeFeedHistory(
      state.feeds[targetFeed] || [],
      normalizedIncomingPosts,
      MAX_FEED_ITEMS
    );
    state.discussions[targetFeed] = {};
    persistFeeds(state.feeds);
    persistDiscussions();
    state.lastRefreshAt = `${formatDateTime()} · ${sourceLabel}`;
    safeSetItem(REFRESH_KEY, state.lastRefreshAt);
    renderActiveFeed();
    renderProfilePage();
    updateInsightPanel();
    setHomeStatus(
      `已通过${sourceLabel}刷新“${getFeedLabel(targetFeed)}”${homeCount} 条讨论 · 来源 ${trigger}`,
      "success"
    );
    setSettingsStatus(
      `配置已保存，当前分页签“${getFeedLabel(targetFeed)}”已使用 API 重新生成 ${homeCount} 条讨论。`,
      "success"
    );
    switchTab("home");
  } finally {
    state.isRefreshing = false;
    state.pullDistance = 0;
    setPullIndicator(0, "idle");
    updateHomeRefreshAvailability();
    settingsGenerateBtn.disabled = false;
  }
}

function releasePull() {
  if (!canRefreshCurrentHomeFeed()) {
    state.pullDistance = 0;
    setPullIndicator(0, "idle");
    return;
  }
  const shouldRefresh = state.pullDistance >= PULL_THRESHOLD && !state.isRefreshing;
  if (shouldRefresh) {
    state.pullDistance = 0;
    setPullIndicator(PULL_THRESHOLD, "loading");
    refreshHomeFeed("pull");
    return;
  }
  state.pullDistance = 0;
  setPullIndicator(0, "idle");
}

function handleTouchStart(event) {
  const atTop = isHomeRefreshStartPosition();
  if (!atTop || state.isRefreshing) {
    state.touchStartedAtTop = false;
    return;
  }
  state.touchTracking = true;
  state.touchStartedAtTop = true;
  state.touchStartY = event.touches[0].clientY;
}

function handleTouchMove(event) {
  if (
    !state.touchTracking ||
    !state.touchStartedAtTop ||
    !canRefreshCurrentHomeFeed() ||
    state.isRefreshing
  ) {
    return;
  }

  const delta = event.touches[0].clientY - state.touchStartY;
  if (delta <= 0) {
    return;
  }

  if (!isHomeRefreshStartPosition()) {
    state.touchStartedAtTop = false;
    return;
  }

  state.pullDistance = Math.min(delta * 0.45, 130);
  event.preventDefault();
  setPullIndicator(
    state.pullDistance,
    state.pullDistance >= PULL_THRESHOLD ? "ready" : "idle"
  );
}

function handleTouchEnd() {
  if (!state.touchTracking) {
    return;
  }
  state.touchTracking = false;
  const startedAtTop = state.touchStartedAtTop;
  state.touchStartedAtTop = false;
  if (!startedAtTop) {
    state.pullDistance = 0;
    setPullIndicator(0, "idle");
    return;
  }
  releasePull();
}

function handleWheel(event) {
  const atTop = isHomeRefreshStartPosition();
  const topStableLongEnough =
    state.feedTopAnchorAt > 0 && Date.now() - state.feedTopAnchorAt > 160;
  if (
    !canRefreshCurrentHomeFeed() ||
    state.isRefreshing ||
    !atTop ||
    !topStableLongEnough ||
    event.deltaY >= 0
  ) {
    return;
  }

  event.preventDefault();
  state.pullDistance = Math.min(
    130,
    state.pullDistance + Math.abs(event.deltaY) * 0.15
  );
  setPullIndicator(
    state.pullDistance,
    state.pullDistance >= PULL_THRESHOLD ? "ready" : "idle"
  );

  window.clearTimeout(state.wheelReleaseTimer);
  state.wheelReleaseTimer = window.setTimeout(() => {
    releasePull();
  }, 140);
}

function attachEvents() {
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      switchTab(item.dataset.tab);
    });
  });

  jumpLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      switchTab(link.dataset.jumpTab);
    });
  });

  [topRefreshBtn].filter(Boolean).forEach((button) => {
    button.addEventListener("click", () => {
      refreshHomeFeed("button");
    });
  });

  if (homeComposerToggleBtn) {
    homeComposerToggleBtn.addEventListener("click", () => {
      setHomeComposerOpen(!state.composerOpen);
    });
  }

  if (homeComposerForm) {
    homeComposerForm.addEventListener("submit", (event) => {
      event.preventDefault();
      submitHomePost();
    });
  }

  if (homeComposerImageInput) {
    homeComposerImageInput.addEventListener("change", async () => {
      const [file] = homeComposerImageInput.files || [];
      await handleImageSelection(file, "home");
    });
  }

  if (homeComposerImagePreviewEl) {
    homeComposerImagePreviewEl.addEventListener("click", (event) => {
      const target = getEventHTMLElement(event);
      if (!target) {
        return;
      }
      const actionEl = target.closest("[data-action]");
      if (!(actionEl instanceof HTMLElement)) {
        return;
      }
      if (actionEl.dataset.action === "remove-home-composer-image") {
        clearHomeComposerImage();
        setHomeComposerStatus("已移除帖子图片。", "");
      }
    });
  }

  if (homeComposerQuotePreviewEl) {
    homeComposerQuotePreviewEl.addEventListener("click", (event) => {
      const target = getEventHTMLElement(event);
      if (!target) {
        return;
      }
      const actionEl = target.closest("[data-action]");
      if (!(actionEl instanceof HTMLElement)) {
        return;
      }
      if (actionEl.dataset.action === "clear-home-composer-quote") {
        clearHomeComposerRepostSource({ preserveContent: true });
        setHomeComposerStatus("已取消引用，继续作为普通新帖子编辑。", "");
      }
    });
  }

  if (settingsGenerateBtn) {
    settingsGenerateBtn.addEventListener("click", () => {
      saveCurrentSettings();
      refreshHomeFeed("settings");
    });
  }

  if (settingsForm) {
    settingsForm.addEventListener("submit", (event) => {
      event.preventDefault();
      saveCurrentSettings();
      setSettingsStatus("配置已保存到本地浏览器存储。", "success");
    });
  }

  if (profileForm) {
    profileForm.addEventListener("submit", (event) => {
      event.preventDefault();
      saveCurrentProfile();
      setProfileEditorOpen(false);
      setProfileStatus("个人资料已保存到本地浏览器存储。", "success");
    });
  }

  if (profileEditToggleBtn) {
    profileEditToggleBtn.addEventListener("click", () => {
      setProfileEditorOpen(!state.profileEditorOpen);
    });
  }

  if (profileEditorCloseBtn) {
    profileEditorCloseBtn.addEventListener("click", () => {
      setProfileEditorOpen(false);
    });
  }

  if (profileCancelBtn) {
    profileCancelBtn.addEventListener("click", () => {
      applyProfileToForm(state.profile);
      setProfileEditorOpen(false);
    });
  }

  if (homeMiniTabsContainer) {
    homeMiniTabsContainer.addEventListener("click", (event) => {
      const target = getEventHTMLElement(event);
      if (!target) {
        return;
      }
      const button = target.closest(".mini-tab[data-feed]");
      if (!(button instanceof HTMLElement)) {
        return;
      }
      switchHomeFeed(button.dataset.feed);
    });
  }

  if (customTabsManageBtn) {
    customTabsManageBtn.addEventListener("click", () => {
      setCustomTabsPanelOpen(true);
      startCustomTabCreate();
    });
  }

  if (customTabsCloseBtn) {
    customTabsCloseBtn.addEventListener("click", () => {
      setCustomTabsPanelOpen(false);
    });
  }

  if (customTabCancelBtn) {
    customTabCancelBtn.addEventListener("click", () => {
      startCustomTabCreate();
    });
  }

  if (customTabCreateBtn) {
    customTabCreateBtn.addEventListener("click", () => {
      startCustomTabCreate();
    });
  }

  if (customTabEditorResetBtn) {
    customTabEditorResetBtn.addEventListener("click", () => {
      startCustomTabCreate();
    });
  }

  if (customTabForm) {
    customTabForm.addEventListener("submit", (event) => {
      event.preventDefault();
      handleCustomTabFormSubmit();
    });

    customTabForm.addEventListener("input", (event) => {
      const target = event.target;
      const action = String(target?.dataset?.action || "").trim();
      if (target instanceof HTMLTextAreaElement && action === "edit-custom-tab-content-item") {
        const draft = getCustomTabContentDraftState();
        const targetItem = (draft.items || []).find(
          (item) => item.id === String(target.dataset.itemId || "").trim()
        );
        if (targetItem) {
          targetItem.contentText = String(target.value || "");
          targetItem.updatedAt = new Date().toISOString();
        }
        if (customTabFormStatusEl?.classList.contains("error")) {
          setCustomTabFormStatus("");
        }
        return;
      }
      if (target instanceof HTMLInputElement && action === "edit-custom-tab-content-date") {
        updateCustomTabDraftItem(target.dataset.itemId || "", {
          discussionDate: normalizeDateInputValue(target.value || "")
        });
        if (customTabFormStatusEl?.classList.contains("error")) {
          setCustomTabFormStatus("");
        }
      }
    });

    customTabForm.addEventListener("click", (event) => {
      const target = getEventHTMLElement(event);
      if (!target) {
        return;
      }
      const actionEl = target.closest("[data-action]");
      if (!(actionEl instanceof HTMLElement)) {
        return;
      }
      const action = String(actionEl.dataset.action || "").trim();
      if (action === "add-custom-tab-content-item") {
        addCustomTabDraftItem(actionEl.dataset.bucket || "discussion");
        return;
      }
      if (action === "move-custom-tab-content-item") {
        const targetBucket = normalizeCustomTabContentBucket(actionEl.dataset.targetBucket || "discussion", "discussion");
        const draft = getCustomTabContentDraftState();
        updateCustomTabDraftItem(actionEl.dataset.itemId || "", {
          bucket: targetBucket,
          enteredBucketAt: new Date().toISOString(),
          sortOrder: getNextCustomTabTopSortOrder(
            (draft.items || []).filter((item) => item.id !== String(actionEl.dataset.itemId || "").trim()),
            targetBucket
          )
        });
        return;
      }
      if (action === "move-custom-tab-content-order") {
        moveCustomTabDraftItemOrder(
          actionEl.dataset.itemId || "",
          actionEl.dataset.direction === "down" ? "down" : "up"
        );
        return;
      }
      if (action === "toggle-custom-tab-content-tag") {
        const itemId = String(actionEl.dataset.itemId || "").trim();
        const tagId = String(actionEl.dataset.tagId || "").trim();
        const draft = getCustomTabContentDraftState();
        const targetItem = (draft.items || []).find((item) => item.id === itemId);
        if (!targetItem || !FORUM_TOPIC_TAG_IDS.has(tagId)) {
          return;
        }
        const currentTags = normalizeForumTopicTags(targetItem.topicTags, []);
        const nextTags = currentTags.includes(tagId)
          ? currentTags.filter((tag) => tag !== tagId)
          : currentTags.length >= CUSTOM_TAB_TOPIC_TAG_MAX_COUNT
            ? [...currentTags.slice(1), tagId]
            : [...currentTags, tagId];
        updateCustomTabDraftItem(itemId, {
          topicTags: nextTags
        });
        if (customTabFormStatusEl?.classList.contains("error")) {
          setCustomTabFormStatus("");
        }
        return;
      }
      if (action === "delete-custom-tab-content-item") {
        removeCustomTabDraftItem(actionEl.dataset.itemId || "");
        return;
      }
      if (action === "toggle-custom-tab-history") {
        const draft = getCustomTabContentDraftState();
        draft.historyExpanded = !draft.historyExpanded;
        renderCustomTabContentEditor();
      }
    });
  }

  [customTabBubbleFocusEnabledInput, customTabInsFocusEnabledInput].filter(Boolean).forEach((input) => {
    input.addEventListener("change", () => {
      updateCustomTabFormAdvancedState();
      if (customTabFormStatusEl?.classList.contains("error")) {
        setCustomTabFormStatus("");
      }
    });
  });

  if (customTabWorldbookListEl) {
    customTabWorldbookListEl.addEventListener("change", () => {
      if (customTabFormStatusEl?.classList.contains("error")) {
        setCustomTabFormStatus("");
      }
    });
  }

  if (customTabsPanel) {
    customTabsPanel.addEventListener("click", (event) => {
      const target = getEventHTMLElement(event);
      if (!target) {
        return;
      }
      const actionEl = target.closest("[data-action]");
      if (!(actionEl instanceof HTMLElement)) {
        return;
      }
      if (actionEl.dataset.action === "close-custom-tabs-modal") {
        setCustomTabsPanelOpen(false);
      }
    });
  }

  if (customTabsListEl) {
    customTabsListEl.addEventListener("click", (event) => {
      const target = getEventHTMLElement(event);
      if (!target) {
        return;
      }
      const actionEl = target.closest("[data-action]");
      if (!(actionEl instanceof HTMLElement)) {
        return;
      }
      const { action } = actionEl.dataset;
      const tabId = actionEl.dataset.tabId;
      if (!tabId) {
        return;
      }
      if (action === "edit-custom-tab") {
        startCustomTabEdit(tabId);
      } else if (action === "pin-custom-tab") {
        pinCustomTab(tabId);
      } else if (action === "clear-custom-tab-cache") {
        clearCustomTabGeneratedContent(tabId);
      } else if (action === "delete-custom-tab") {
        deleteCustomTab(tabId);
      }
    });

    customTabsListEl.addEventListener("dragstart", (event) => {
      const target = getEventHTMLElement(event);
      if (!target) {
        return;
      }
      const item = target.closest(".custom-tab-item[data-tab-id]");
      if (!(item instanceof HTMLElement)) {
        return;
      }
      const tabId = item.dataset.tabId || "";
      if (!tabId) {
        return;
      }
      state.draggingCustomTabId = tabId;
      clearCustomTabDragClasses();
      item.classList.add("is-dragging");
      if (event.dataTransfer) {
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/plain", tabId);
      }
    });

    customTabsListEl.addEventListener("dragover", (event) => {
      const target = getEventHTMLElement(event);
      if (!target) {
        return;
      }
      const item = target.closest(".custom-tab-item[data-tab-id]");
      if (!(item instanceof HTMLElement)) {
        return;
      }
      const targetId = item.dataset.tabId || "";
      const draggedId = state.draggingCustomTabId;
      if (!targetId || !draggedId || targetId === draggedId) {
        return;
      }
      event.preventDefault();
      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = "move";
      }
      customTabsListEl
        .querySelectorAll(".custom-tab-item.drag-over")
        .forEach((node) => node.classList.remove("drag-over"));
      item.classList.add("drag-over");
    });

    customTabsListEl.addEventListener("drop", (event) => {
      event.preventDefault();
      const target = getEventHTMLElement(event);
      if (!target) {
        return;
      }
      const item = target.closest(".custom-tab-item[data-tab-id]");
      if (!(item instanceof HTMLElement)) {
        return;
      }
      const targetId = item.dataset.tabId || "";
      const draggedId =
        state.draggingCustomTabId ||
        event.dataTransfer?.getData("text/plain") ||
        "";
      clearCustomTabDragClasses();
      state.draggingCustomTabId = "";
      reorderCustomTabs(draggedId, targetId);
    });

    customTabsListEl.addEventListener("dragend", () => {
      clearCustomTabDragClasses();
      state.draggingCustomTabId = "";
    });
  }

  if (customTabBackgroundRefreshBtn) {
    customTabBackgroundRefreshBtn.addEventListener("click", async () => {
      const tabId = String(state.customTabEditingId || "").trim();
      if (!tabId) {
        setCustomTabBackgroundStatus("请先进入一个已保存页签的编辑态。", "error");
        return;
      }
      try {
        setCustomTabBackgroundStatus("正在刷新背景卡数据…", "");
        await loadForumBackgroundPanelData(tabId, { force: true });
        setCustomTabBackgroundStatus("背景卡数据已刷新。", "success");
      } catch (error) {
        setCustomTabBackgroundStatus(`背景卡刷新失败：${error?.message || "请求失败"}`, "error");
      }
    });
  }

  if (customTabBackgroundExtractBtn) {
    customTabBackgroundExtractBtn.addEventListener("click", async () => {
      const tabId = String(state.customTabEditingId || "").trim();
      if (!tabId) {
        setCustomTabBackgroundStatus("请先进入一个已保存页签的编辑态。", "error");
        return;
      }
      try {
        await requestForumBackgroundExtraction(tabId);
      } catch (_error) {
      }
    });
  }

  if (customTabBackgroundHistoryExtractBtn) {
    customTabBackgroundHistoryExtractBtn.addEventListener("click", async () => {
      const tabId = String(state.customTabEditingId || "").trim();
      if (!tabId) {
        setCustomTabBackgroundStatus("请先进入一个已保存页签的编辑态。", "error");
        return;
      }
      try {
        await requestForumBackgroundExtraction(tabId, {
          segmentKeys: ["discussion_archive"],
          triggerReason: "manual_history_extract",
          emptyMessage: "当前没有待提炼的历史普通条目。"
        });
      } catch (_error) {
      }
    });
  }

  if (customTabBackgroundListEl) {
    customTabBackgroundListEl.addEventListener("click", async (event) => {
      const target = getEventHTMLElement(event);
      if (!target) {
        return;
      }
      const actionEl = target.closest("[data-action]");
      if (!(actionEl instanceof HTMLElement)) {
        return;
      }
      const action = String(actionEl.dataset.action || "").trim();
      if (action !== "forum-background-card-status") {
        return;
      }
      const cardId = String(actionEl.dataset.cardId || "").trim();
      const nextStatus = String(actionEl.dataset.nextStatus || "").trim();
      if (!cardId || !nextStatus) {
        return;
      }
      try {
        await updateForumBackgroundCardStatus(cardId, nextStatus);
      } catch (error) {
        setCustomTabBackgroundStatus(`背景卡更新失败：${error?.message || "请求失败"}`, "error");
      }
    });
  }

  if (embeddedCloseBtn) {
    embeddedCloseBtn.addEventListener("click", () => {
      requestEmbeddedClose();
    });
  }

  if (apiConfigSaveBtn) {
    apiConfigSaveBtn.addEventListener("click", () => {
      saveCurrentApiConfig();
    });
  }

  if (apiConfigListEl) {
    apiConfigListEl.addEventListener("click", (event) => {
      const target = getEventHTMLElement(event);
      if (!target) {
        return;
      }
      const actionEl = target.closest("[data-action]");
      if (!(actionEl instanceof HTMLElement)) {
        return;
      }
      const configId = actionEl.dataset.configId;
      if (!configId) {
        return;
      }
      const { action } = actionEl.dataset;
      if (action === "switch-api-config") {
        switchApiConfig(configId);
      } else if (action === "set-translation-api-config") {
        setTranslationApiConfig(configId);
      } else if (action === "delete-api-config") {
        deleteApiConfig(configId);
      }
    });
  }

  if (translationApiEnabledEl) {
    translationApiEnabledEl.addEventListener("change", () => {
      if (translationApiEnabledEl.checked && !state.settings.translationApiConfigId) {
        const configs = normalizeApiConfigs(state.settings.apiConfigs);
        state.settings.translationApiConfigId =
          state.settings.activeApiConfigId || configs[0]?.id || "";
      }
      if (translationApiConfigSelectEl) {
        translationApiConfigSelectEl.value = state.settings.translationApiConfigId || "";
      }
      saveCurrentSettings();
    });
  }

  if (translationApiConfigSelectEl) {
    translationApiConfigSelectEl.addEventListener("change", () => {
      state.settings.translationApiConfigId = String(translationApiConfigSelectEl.value || "").trim();
      state.settings.translationApiEnabled = Boolean(
        translationApiEnabledEl?.checked && state.settings.translationApiConfigId
      );
      saveCurrentSettings();
    });
  }

  if (feedEl) {
    feedEl.addEventListener("click", async (event) => {
      const target = getEventHTMLElement(event);
      if (!target) {
        return;
      }

      const actionEl = target.closest("[data-action]");
      if (!(actionEl instanceof HTMLElement)) {
        return;
      }

      const action = actionEl.dataset.action;
      if (!action) {
        return;
      }

      if (action === "open-tag-feed" && actionEl.dataset.tag) {
        state.activeTagFilter = actionEl.dataset.tag;
        renderActiveFeed();
        setHomeStatus(`当前查看标签：${state.activeTagFilter}`, "");
        return;
      }

      if (action === "clear-tag-filter") {
        state.activeTagFilter = "";
        renderActiveFeed();
        setHomeStatus("当前查看：热门标签", "");
        return;
      }

      if (action === "translate-post" && actionEl.dataset.postId) {
        await translatePostToChinese(
          actionEl.dataset.postId,
          actionEl.dataset.bucket || state.activeFeed
        );
        return;
      }

      if (action === "repost-post" && actionEl.dataset.postId) {
        repostMainPost(actionEl.dataset.postId, actionEl.dataset.bucket || state.activeFeed);
        return;
      }

      if (action === "delete-forum-post" && actionEl.dataset.postId) {
        deleteForumPost(actionEl.dataset.postId, actionEl.dataset.bucket || state.activeFeed);
        return;
      }

      if (action === "open-thread-modal" && actionEl.dataset.postId) {
        await openThreadModal(
          actionEl.dataset.postId,
          actionEl.dataset.bucket || state.activeFeed
        );
      }
    });

    const homeScrollTarget = getHomeScrollTarget();
    if (homeScrollTarget) {
      homeScrollTarget.addEventListener("scroll", syncHomeRefreshAnchor, { passive: true });
    }
  }

  if (profilePostsEl) {
    profilePostsEl.addEventListener("click", async (event) => {
      const target = getEventHTMLElement(event);
      if (!target) {
        return;
      }

      const actionEl = target.closest("[data-action]");
      if (!(actionEl instanceof HTMLElement)) {
        return;
      }

      if (actionEl.dataset.action === "toggle-post-menu" && actionEl.dataset.postId) {
        state.profilePostMenuId =
          state.profilePostMenuId === actionEl.dataset.postId
            ? null
            : actionEl.dataset.postId;
        renderProfilePage();
        return;
      }

      if (actionEl.dataset.action === "start-post-edit" && actionEl.dataset.postId) {
        openProfilePostEditor(actionEl.dataset.postId);
        return;
      }

      if (actionEl.dataset.action === "cancel-post-edit") {
        cancelProfilePostEditor();
        return;
      }

      if (actionEl.dataset.action === "save-post-edit" && actionEl.dataset.postId) {
        saveProfilePostEdit(actionEl.dataset.postId);
        return;
      }

      if (actionEl.dataset.action === "delete-post" && actionEl.dataset.postId) {
        deleteProfilePost(actionEl.dataset.postId);
        return;
      }

      if (actionEl.dataset.action === "open-thread-modal" && actionEl.dataset.postId) {
        state.profilePostMenuId = null;
        await openThreadModal(actionEl.dataset.postId, "profile");
        return;
      }

      if (actionEl.dataset.action === "repost-post" && actionEl.dataset.postId) {
        repostMainPost(actionEl.dataset.postId, "profile");
      }
    });

    profilePostsEl.addEventListener("input", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLTextAreaElement)) {
        return;
      }
      if (!("postEditorInput" in target.dataset)) {
        return;
      }
      state.profilePostEditingDraft = target.value;
    });
  }

  if (threadModalEl) {
    threadModalEl.addEventListener("click", async (event) => {
      const target = getEventHTMLElement(event);
      if (!target) {
        return;
      }
      const actionEl = target.closest("[data-action]");
      if (!(actionEl instanceof HTMLElement)) {
        return;
      }
      const action = actionEl.dataset.action;
      if (!action) {
        return;
      }

      if (action === "close-thread-modal") {
        setThreadModalOpen(false);
        return;
      }

      if (action === "open-thread-share-modal") {
        setThreadShareModalOpen(true);
        return;
      }

      if (action === "toggle-thread-reply-composer") {
        toggleThreadReplyComposer(
          actionEl.dataset.targetType || "post",
          actionEl.dataset.targetId || actionEl.dataset.postId || ""
        );
        return;
      }

      if (action === "cancel-thread-reply") {
        resetThreadReplyComposer();
        renderThreadModal();
        return;
      }

      if (action === "translate-post" && actionEl.dataset.postId) {
        await translatePostToChinese(
          actionEl.dataset.postId,
          actionEl.dataset.bucket || state.threadModalBucket || state.activeFeed
        );
        return;
      }

      if (action === "repost-post" && actionEl.dataset.postId) {
        repostMainPost(
          actionEl.dataset.postId,
          actionEl.dataset.bucket || state.threadModalBucket || state.activeFeed
        );
        return;
      }

      if (action === "delete-forum-post" && actionEl.dataset.postId) {
        deleteForumPost(
          actionEl.dataset.postId,
          actionEl.dataset.bucket || state.threadModalBucket || state.activeFeed
        );
        return;
      }

      if (action === "toggle-reply" && actionEl.dataset.postId && actionEl.dataset.replyId) {
        await toggleNestedReply(
          actionEl.dataset.postId,
          actionEl.dataset.replyId,
          actionEl.dataset.bucket || state.threadModalBucket || state.activeFeed
        );
        return;
      }

      if (action === "translate-reply" && actionEl.dataset.postId && actionEl.dataset.replyId) {
        await translateReplyToChinese(
          actionEl.dataset.postId,
          actionEl.dataset.replyId,
          actionEl.dataset.bucket || state.threadModalBucket || state.activeFeed
        );
        return;
      }

      if (action === "delete-forum-reply" && actionEl.dataset.postId && actionEl.dataset.replyId) {
        deleteForumReply(
          actionEl.dataset.postId,
          actionEl.dataset.replyId,
          actionEl.dataset.bucket || state.threadModalBucket || state.activeFeed
        );
        return;
      }
    });

    threadModalEl.addEventListener("input", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLTextAreaElement)) {
        return;
      }
      if (!("threadReplyInput" in target.dataset)) {
        return;
      }
      state.threadReplyDraft = target.value;
      if (state.threadReplyStatus) {
        setThreadReplyStatus("");
      }
    });

    threadModalEl.addEventListener("submit", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLFormElement)) {
        return;
      }
      if (!target.classList.contains("reply-composer")) {
        return;
      }
      event.preventDefault();
      submitThreadReply(
        target.dataset.postId || state.threadModalPostId,
        target.dataset.bucket || state.threadModalBucket || state.activeFeed,
        target.dataset.parentReplyId || ""
      );
    });
  }

  if (threadModalCloseBtn) {
    threadModalCloseBtn.addEventListener("click", () => {
      setThreadModalOpen(false);
    });
  }

  if (threadModalShareBtn) {
    threadModalShareBtn.addEventListener("click", () => {
      setThreadShareModalOpen(true);
    });
  }

  if (threadShareCloseBtn) {
    threadShareCloseBtn.addEventListener("click", () => {
      setThreadShareModalOpen(false);
    });
  }

  if (threadShareModalEl) {
    threadShareModalEl.addEventListener("click", (event) => {
      const target = getEventHTMLElement(event);
      if (!target) {
        return;
      }
      const actionEl = target.closest("[data-action]");
      if (actionEl instanceof HTMLElement) {
        const action = String(actionEl.dataset.action || "").trim();
        if (action === "close-thread-share-modal") {
          setThreadShareModalOpen(false);
          return;
        }
        if (action === "share-thread-to-chat") {
          shareCurrentThreadToChat(
            actionEl.dataset.targetConversationId || "",
            actionEl.dataset.targetContactId || ""
          );
          return;
        }
      }
      if (event.target === threadShareModalEl) {
        setThreadShareModalOpen(false);
      }
    });
  }

  if (threadModalBodyEl) {
    threadModalBodyEl.addEventListener("wheel", handleThreadModalWheel, { passive: false });
    threadModalBodyEl.addEventListener("touchstart", handleThreadModalTouchStart, {
      passive: true
    });
    threadModalBodyEl.addEventListener("touchmove", handleThreadModalTouchMove, {
      passive: false
    });
    threadModalBodyEl.addEventListener("touchend", handleThreadModalTouchEnd);
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && state.customTabEditorOpen) {
      setCustomTabsPanelOpen(false);
      return;
    }
    if (event.key === "Escape" && state.threadShareModalOpen) {
      setThreadShareModalOpen(false);
      return;
    }
    if (event.key === "Escape" && state.threadModalOpen) {
      setThreadModalOpen(false);
    }
  });

  const apiFields = [modeSelect, endpointInput, tokenInput, modelInput, temperatureInput];
  [modeSelect, endpointInput, tokenInput, modelInput, temperatureInput, homeCountInput, replyCountInput, worldviewInput]
    .filter(Boolean)
    .forEach(
    (field) => {
      field.addEventListener("input", () => {
        if (apiFields.includes(field) && state.settings.activeApiConfigId) {
          state.settings.activeApiConfigId = "";
          renderApiConfigList();
        }
        updateModeUI();
        updatePromptPreview();
        updateReplyPromptPreview();
        updateInsightPanel();
      });

      field.addEventListener("change", () => {
        saveCurrentSettings();
      });
    }
  );

  [profileAvatarInput, profileUsernameInput, profileUserIdInput, profileFollowingInput, profileFollowersInput, profileSignatureInput, profilePersonaInput]
    .filter(Boolean)
    .forEach(
    (field) => {
      field.addEventListener("input", () => {
        state.profile = getCurrentProfile();
        renderProfilePage();
        updateReplyPromptPreview();
      });

      field.addEventListener("change", () => {
        saveCurrentProfile();
      });
    }
  );

  if (profileAvatarFileInput) {
    profileAvatarFileInput.addEventListener("change", async () => {
      const [file] = profileAvatarFileInput.files || [];
      await handleProfileImageUpload(file, "avatarImage", "头像图片已更新。");
    });
  }

  if (profileBannerFileInput) {
    profileBannerFileInput.addEventListener("change", async () => {
      const [file] = profileBannerFileInput.files || [];
      await handleProfileImageUpload(file, "bannerImage", "主页背景图片已更新。");
    });
  }

  window.addEventListener("focus", () => {
    if (!refreshSharedProfileState()) {
      return;
    }
    renderActiveFeed();
    renderProfilePage();
    renderThreadModal();
    updateReplyPromptPreview();
  });

  window.addEventListener("storage", (event) => {
    if (event.key && event.key !== PROFILE_KEY) {
      return;
    }
    if (!refreshSharedProfileState()) {
      return;
    }
    renderActiveFeed();
    renderProfilePage();
    renderThreadModal();
    updateReplyPromptPreview();
  });

  window.addEventListener("storage", (event) => {
    if (String(event?.key || "").trim() !== SETTINGS_KEY) {
      return;
    }
    refreshRuntimeApiSettingsFromStorage();
  });

  window.addEventListener("pulse-api-config-switched", refreshRuntimeApiSettingsFromStorage);

  window.addEventListener("storage", (event) => {
    const key = String(event?.key || "").trim();
    if (![MESSAGE_CONTACTS_KEY, MESSAGE_THREADS_KEY, DIRECT_MESSAGES_KEY].includes(key)) {
      return;
    }
    if (state.threadShareModalOpen) {
      renderThreadShareModal();
    }
  });

  const homeScrollTarget = getHomeScrollTarget();
  if (homeScrollTarget) {
    homeScrollTarget.addEventListener("touchstart", handleTouchStart, { passive: true });
    homeScrollTarget.addEventListener("touchmove", handleTouchMove, { passive: false });
    homeScrollTarget.addEventListener("touchend", handleTouchEnd);
    homeScrollTarget.addEventListener("wheel", handleWheel, { passive: false });
  }
  window.addEventListener("scroll", syncHomeRefreshAnchor, { passive: true });
  window.addEventListener("resize", syncHomeRefreshAnchor, { passive: true });
}

function init() {
  if (document.body) {
    document.body.classList.toggle("embedded", isEmbeddedView());
  }
  window.__appBootstrap = {
    ready: false,
    errors: []
  };
  const safeRun = (label, fn) => {
    try {
      fn();
    } catch (error) {
      const errorText = error?.message || String(error);
      window.__appBootstrap.errors.push(`${label}: ${errorText}`);
      if (homeStatusEl && !homeStatusEl.textContent.includes("初始化异常")) {
        homeStatusEl.textContent = `初始化异常：${label}`;
        homeStatusEl.className = "inline-status error";
      }
      if (typeof console !== "undefined" && typeof console.error === "function") {
        console.error(`[init] ${label} failed`, error);
      }
    }
  };

  safeRun("apply settings", () => applySettingsToForm(state.settings));
  safeRun("apply profile", () => applyProfileToForm(state.profile));
  safeRun("profile editor", () => setProfileEditorOpen(false));
  safeRun("home composer", () => setHomeComposerOpen(false));
  safeRun("thread modal", () => setThreadModalOpen(false));
  safeRun("pull indicator", () => setPullIndicator(0, "idle"));
  safeRun("render active feed", () => renderActiveFeed());
  safeRun("render profile", () => renderProfilePage());
  safeRun("render custom tabs manager", () => renderCustomTabsManager());
  safeRun("custom tabs manage button", () => updateCustomTabsManageButton());
  safeRun("render api config list", () => renderApiConfigList());
  safeRun("persist discussions", () => persistDiscussions());
  safeRun("update prompt preview", () => updatePromptPreview());
  safeRun("update reply prompt preview", () => updateReplyPromptPreview());
  safeRun("update insight panel", () => updateInsightPanel());
  safeRun("set home status", () =>
    setHomeStatus(
      state.lastRefreshAt ? `已载入上次生成内容 · ${state.lastRefreshAt}` : "等待下一次刷新",
      state.lastRefreshAt ? "success" : ""
    )
  );
  safeRun("set settings status", () =>
    setSettingsStatus("设置页会自动保存内容生成配置。")
  );
  safeRun("set api status", () => setApiConfigStatus("可保存多套 API 配置，并在下方一键切换。"));
  safeRun("switch initial tab", () => switchTab(getInitialTabFromLocation()));
  safeRun("attach events", () => attachEvents());
  safeRun("sync home refresh anchor", () => syncHomeRefreshAnchor());
  window.__appBootstrap.ready = true;
}

init();
