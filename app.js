const DEFAULT_OPENAI_ENDPOINT = "https://api.deepseek.com/chat/completions";
const DEFAULT_GEMINI_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta";
const SETTINGS_KEY = "x_style_generator_settings_v2";
const POSTS_KEY = "x_style_generator_posts_v2";
const REFRESH_KEY = "x_style_generator_refresh_v2";
const PROFILE_KEY = "x_style_generator_profile_v1";
const PROFILE_POSTS_KEY = "x_style_generator_profile_posts_v1";
const DIRECT_MESSAGES_KEY = "x_style_generator_direct_messages_v1";
const DISCUSSIONS_KEY = "x_style_generator_discussions_v1";
const CHAT_ROOM_KEY = "x_style_generator_chat_room_v1";
const DEFAULT_POST_COUNT = 10;
const DEFAULT_DM_COUNT = 4;
const DEFAULT_REPLY_COUNT = 4;
const DEFAULT_CHAT_REPLY_COUNT = 20;
const CHAT_REPLY_APPEND_INTERVAL_MS = 3000;
const MAX_FEED_ITEMS = 50;
const MAX_POST_TEXT_LENGTH = 1400;
const MAX_REPLY_TEXT_LENGTH = 1400;
const MAX_CHAT_TEXT_LENGTH = 2000;
const DEFAULT_TEMPERATURE = 0.8;
const PULL_THRESHOLD = 88;
const DEFAULT_CONTENT_FEED = "entertainment";
const CUSTOM_TAB_LIMIT = 4;
const API_CONFIG_LIMIT = 12;
const DEFAULT_DEEPSEEK_MODEL = "deepseek-chat";
const DEFAULT_GEMINI_MODEL = "gemini-2.0-flash";
const HOME_FEED_LABELS = {
  entertainment: "系统内容",
  tags: "热门标签"
};
const NESTED_REPLY_COUNT = 3;
const THREAD_MODAL_LOAD_COOLDOWN_MS = 420;
let lastKnownContentFeed = DEFAULT_CONTENT_FEED;

const DEFAULT_SETTINGS = {
  mode: "openai",
  endpoint: DEFAULT_OPENAI_ENDPOINT,
  token: "",
  model: DEFAULT_DEEPSEEK_MODEL,
  worldview:
    "这是一个强调长期主义、产品洞察和公共讨论质量的中文社交世界。用户习惯像在 X 上一样快速表达观点，但会天然追问效率、增长、AI 和平台变迁。整体语气要真实、犀利、能引发跟帖，不要写成官方通稿。",
  homeCount: DEFAULT_POST_COUNT,
  dmCount: DEFAULT_DM_COUNT,
  replyCount: DEFAULT_REPLY_COUNT,
  chatReplyCount: DEFAULT_CHAT_REPLY_COUNT,
  chatContextTabIds: [],
  temperature: DEFAULT_TEMPERATURE,
  customTabs: [],
  apiConfigs: [],
  activeApiConfigId: "",
  translationApiEnabled: false,
  translationApiConfigId: ""
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

const FOLLOWING_CARDS = [
  {
    name: "Open Product Journal",
    handle: "@openproduct",
    note: "每天拆解产品增长、内容节奏和用户决策逻辑。"
  },
  {
    name: "Agent Protocol",
    handle: "@agentproto",
    note: "跟踪 AI Agent 工作流、自动化协作和前沿工具链。"
  },
  {
    name: "Indie Ledger",
    handle: "@indieledger",
    note: "关注独立开发者收入结构、冷启动与复利模型。"
  }
];

const MESSAGE_SENDERS = [
  ["内容策略组", "下一个热点最好做成对立观点串联，我觉得会更像 X 的讨论氛围。"],
  ["产品同路人", "首页刷新逻辑不错，可以把模型返回固定成 JSON 数组，后续接后端会更稳。"],
  ["运营雷达", "今天的热点里 AI Agent 和独立开发收入很适合放在同一轮讨论里。"]
];

const pageTitleMap = {
  home: "首页",
  following: "聊天",
  messages: "私信",
  profile: "个人主页",
  settings: "设置"
};

const pages = {
  home: document.querySelector("#home-page"),
  following: document.querySelector("#following-page"),
  messages: document.querySelector("#messages-page"),
  profile: document.querySelector("#profile-page"),
  settings: document.querySelector("#settings-page")
};

const navItems = [...document.querySelectorAll(".nav-item[data-tab]")];
const jumpLinks = [...document.querySelectorAll("[data-jump-tab]")];
const homeMiniTabsContainer = document.querySelector("#home-mini-tabs");
const pageTitleEl = document.querySelector("#page-title");
const feedEl = document.querySelector("#feed");
const followingListEl = document.querySelector("#following-list");
const messagesListEl = document.querySelector("#messages-list");
const messagesGenerateBtn = document.querySelector("#messages-generate-btn");
const messagesStatusEl = document.querySelector("#messages-status");
const profilePostsEl = document.querySelector("#profile-posts");
const profileScrollEl = document.querySelector("#profile-page .page-scroll");
const homeStatusEl = document.querySelector("#home-status");
const homeComposerCardEl = document.querySelector("#home-composer-card");
const homeComposerToggleBtn = document.querySelector("#home-composer-toggle-btn");
const homeComposerForm = document.querySelector("#home-composer-form");
const homeComposerInput = document.querySelector("#home-composer-input");
const homeComposerTagsInput = document.querySelector("#home-composer-tags-input");
const homeComposerImageInput = document.querySelector("#home-composer-image-input");
const homeComposerImagePreviewEl = document.querySelector("#home-composer-image-preview");
const homeComposerStatusEl = document.querySelector("#home-composer-status");
const settingsStatusEl = document.querySelector("#settings-status");
const promptPreviewEl = document.querySelector("#prompt-preview");
const messagePromptPreviewEl = document.querySelector("#message-prompt-preview");
const replyPromptPreviewEl = document.querySelector("#reply-prompt-preview");
const topRefreshBtn = document.querySelector("#top-refresh-btn");
const settingsGenerateBtn = document.querySelector("#settings-generate-btn");
const settingsForm = document.querySelector("#settings-form");
const customTabsManageBtn = document.querySelector("#custom-tabs-manage-btn");
const customTabsPanel = document.querySelector("#custom-tabs-manager");
const customTabsListEl = document.querySelector("#custom-tabs-list");
const customTabForm = document.querySelector("#custom-tab-form");
const customTabNameInput = document.querySelector("#custom-tab-name-input");
const customTabTextInput = document.querySelector("#custom-tab-text-input");
const customTabFormStatusEl = document.querySelector("#custom-tab-form-status");
const customTabCancelBtn = document.querySelector("#custom-tab-cancel-btn");
const customTabsCloseBtn = document.querySelector("#custom-tabs-close-btn");
const customTabsLimitHintEl = document.querySelector("#custom-tabs-limit-hint");
const customTabSettingsSection = document.querySelector("#custom-tabs-settings-section");
const customTabSettingsListEl = document.querySelector("#custom-tabs-settings-list");
const customTabSettingsEmptyEl = document.querySelector("#custom-tabs-settings-empty");
const homeScrollEl = document.querySelector("#home-scroll");
const pullIndicatorEl = document.querySelector("#pull-indicator");
const pullLabelEl = document.querySelector("#pull-label");
const pullMetaEl = document.querySelector("#pull-meta");
const threadModalEl = document.querySelector("#thread-modal");
const threadModalCloseBtn = document.querySelector("#thread-modal-close-btn");
const threadModalBodyEl = document.querySelector("#thread-modal-body");
const threadModalRootEl = document.querySelector("#thread-modal-root");
const threadModalRepliesEl = document.querySelector("#thread-modal-replies");
const threadModalLoadHintEl = document.querySelector("#thread-modal-load-hint");
const chatContextTriggerBtnEl = document.querySelector("#chat-context-trigger-btn");
const chatContextModalEl = document.querySelector("#chat-context-modal");
const chatContextModalCloseBtnEl = document.querySelector("#chat-context-modal-close-btn");
const chatContextModalCancelBtnEl = document.querySelector("#chat-context-modal-cancel-btn");
const chatContextModalConfirmBtnEl = document.querySelector("#chat-context-modal-confirm-btn");
const chatContextModalListEl = document.querySelector("#chat-context-modal-list");
const chatContextModalEmptyEl = document.querySelector("#chat-context-modal-empty");
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
const dmCountInput = document.querySelector("#dm-count");
const replyCountInput = document.querySelector("#reply-count");
const chatReplyCountInput = document.querySelector("#chat-reply-count");
const worldviewInput = document.querySelector("#worldview-text");
const apiConfigNameInput = document.querySelector("#api-config-name-input");
const apiConfigSaveBtn = document.querySelector("#api-config-save-btn");
const apiConfigStatusEl = document.querySelector("#api-config-status");
const apiConfigListEl = document.querySelector("#api-config-list");
const translationApiEnabledEl = document.querySelector("#translation-api-enabled");
const translationApiConfigSelectEl = document.querySelector("#translation-api-config-select");
const chatStatusEl = document.querySelector("#chat-status");
const chatHistoryEl = document.querySelector("#chat-history");
const chatComposeFormEl = document.querySelector("#chat-compose-form");
const chatComposeInputEl = document.querySelector("#chat-compose-input");
const chatComposeImageInputEl = document.querySelector("#chat-compose-image-input");
const chatComposeImagePreviewEl = document.querySelector("#chat-compose-image-preview");
const chatSendBtnEl = document.querySelector("#chat-send-btn");
const chatGenerateBtnEl = document.querySelector("#chat-generate-btn");
const chatClearBtnEl = document.querySelector("#chat-clear-btn");

const state = {
  activeTab: "home",
  settings: loadSettings(),
  feeds: loadFeeds(),
  directMessages: loadDirectMessages(),
  chatRoom: loadChatRoom(),
  profile: loadProfile(),
  profilePosts: loadProfilePosts(),
  discussions: loadDiscussions(),
  customTabs: [],
  customTabEditorOpen: false,
  customTabEditingId: "",
  draggingCustomTabId: "",
  chatContextModalOpen: false,
  chatContextDraftTabIds: [],
  activeFeed: DEFAULT_CONTENT_FEED,
  lastContentFeed: DEFAULT_CONTENT_FEED,
  activeTagFilter: "",
  activeConversationId: null,
  replyingConversationId: null,
  profileEditorOpen: false,
  profilePostMenuId: null,
  profilePostEditingId: null,
  profilePostEditingDraft: "",
  composerOpen: false,
  homeComposerImageDataUrl: "",
  isRefreshing: false,
  lastRefreshAt: localStorage.getItem(REFRESH_KEY) || "",
  pullDistance: 0,
  feedTopAnchorAt: Date.now(),
  touchStartY: 0,
  touchTracking: false,
  wheelReleaseTimer: null,
  threadModalOpen: false,
  threadModalBucket: "",
  threadModalPostId: "",
  threadModalTouchTracking: false,
  threadModalTouchStartY: 0,
  threadModalLoadingMore: false,
  threadModalLastLoadAt: 0,
  threadReplyTargetType: "",
  threadReplyTargetId: "",
  threadReplyDraft: "",
  threadReplyStatus: "",
  threadReplyStatusTone: "",
  threadReplySubmitting: false,
  translatingPosts: {},
  translatingReplies: {},
  translatingChatMessages: {},
  chatReplying: false,
  chatDraftImageDataUrl: ""
};

state.customTabs = normalizeCustomTabs(state.settings.customTabs);
state.settings.customTabs = [...state.customTabs];
state.settings.chatContextTabIds = normalizeChatContextTabIds(
  state.settings.chatContextTabIds,
  state.customTabs
);
state.settings.apiConfigs = normalizeApiConfigs(state.settings.apiConfigs);
if (
  state.settings.activeApiConfigId &&
  !state.settings.apiConfigs.some((item) => item.id === state.settings.activeApiConfigId)
) {
  state.settings.activeApiConfigId = "";
}
synchronizeCustomTabBuckets();

function normalizeTabName(tabName) {
  const normalized = String(tabName || "").trim();
  if (normalized === "chat") {
    return "following";
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

  return tabs
    .map((tab, index) => {
      if (typeof tab === "string") {
        const name = String(tab).trim().slice(0, 20) || "自定义页签";
        return {
          id: `custom_${index}_${hashText(name)}`,
          name,
          text: ""
        };
      }
      if (!tab || typeof tab !== "object") {
        return null;
      }
      const rawName = tab.name || tab.label || tab.title || tab.tabName || tab.tabLabel || "";
      const rawText =
        tab.text ||
        tab.prompt ||
        tab.content ||
        tab.description ||
        tab.topicText ||
        tab.topic ||
        "";
      return {
        id:
          tab.id ||
          tab.feedId ||
          tab.key ||
          `custom_${index}_${hashText(`${rawName || ""}-${rawText || ""}`)}`,
        name: String(rawName || "自定义页签").trim().slice(0, 20) || "自定义页签",
        text: String(rawText || "").trim()
      };
    })
    .filter(Boolean)
    .slice(0, CUSTOM_TAB_LIMIT)
    .map((tab) => ({
      id: tab.id || createCustomTabId(tab.name || "custom"),
      name: String(tab.name || "自定义页签").trim().slice(0, 20) || "自定义页签",
      text: String(tab.text || "").trim()
    }));
}

function normalizeChatContextTabIds(ids = [], availableTabs = []) {
  const validIds = new Set(
    Array.isArray(availableTabs) ? availableTabs.map((tab) => String(tab?.id || "")) : []
  );
  if (!Array.isArray(ids)) {
    return [];
  }
  const seen = new Set();
  return ids
    .map((item) => String(item || "").trim())
    .filter((item) => {
      if (!item || !validIds.has(item) || seen.has(item)) {
        return false;
      }
      seen.add(item);
      return true;
    });
}

function normalizeApiMode(mode) {
  if (mode === "gemini" || mode === "generic") {
    return mode;
  }
  return "openai";
}

function getApiModeLabel(mode) {
  const resolvedMode = normalizeApiMode(mode);
  if (resolvedMode === "gemini") {
    return "Gemini API";
  }
  if (resolvedMode === "generic") {
    return "通用 JSON 接口";
  }
  return "DeepSeek / OpenAI 兼容";
}

function getDefaultModelByMode(mode) {
  return normalizeApiMode(mode) === "gemini" ? DEFAULT_GEMINI_MODEL : DEFAULT_DEEPSEEK_MODEL;
}

function normalizeApiConfigToken(token) {
  return String(token || "").trim();
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
        updatedAt: Number(item.updatedAt) || Date.now()
      };
    });
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
  state.settings.chatContextTabIds = normalizeChatContextTabIds(
    state.settings.chatContextTabIds,
    state.customTabs
  );
  synchronizeCustomTabBuckets();
  persistSettings(state.settings);
  persistFeeds(state.feeds);
  persistDiscussions();
  renderHomeTabs();
  renderCustomTabsManager();
  renderCustomTabSettings();
  renderActiveFeed();
  updatePromptPreview();
  updateMessagePromptPreview();
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
  const raw = localStorage.getItem(DISCUSSIONS_KEY);
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
  localStorage.setItem(DISCUSSIONS_KEY, JSON.stringify(state.discussions));
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
  const mode = normalizeApiMode(modeSelect.value);
  const translationApiEnabled = Boolean(translationApiEnabledEl?.checked);
  const translationApiConfigId = String(
    translationApiConfigSelectEl?.value || state.settings.translationApiConfigId || ""
  ).trim();
  return {
    mode,
    endpoint: endpointInput.value.trim(),
    token: tokenInput.value.trim(),
    model: modelInput.value.trim(),
    temperature: normalizeTemperature(temperatureInput.value, DEFAULT_TEMPERATURE),
    homeCount: normalizePositiveInteger(homeCountInput.value, DEFAULT_POST_COUNT),
    dmCount: normalizePositiveInteger(dmCountInput.value, DEFAULT_DM_COUNT),
    replyCount: normalizePositiveInteger(replyCountInput.value, DEFAULT_REPLY_COUNT),
    chatReplyCount: normalizePositiveInteger(
      chatReplyCountInput?.value,
      DEFAULT_CHAT_REPLY_COUNT
    ),
    chatContextTabIds: normalizeChatContextTabIds(
      state.settings.chatContextTabIds,
      state.customTabs
    ),
    worldview: worldviewInput.value.trim(),
    customTabs: [...state.customTabs],
    apiConfigs: normalizeApiConfigs(state.settings.apiConfigs),
    activeApiConfigId: state.settings.activeApiConfigId || "",
    translationApiEnabled: translationApiEnabled && Boolean(translationApiConfigId),
    translationApiConfigId
  };
}

function normalizePositiveInteger(value, fallback) {
  const parsed = Number.parseInt(value, 10);
  if (Number.isFinite(parsed) && parsed > 0) {
    return parsed;
  }
  return fallback;
}

function normalizeTemperature(value, fallback = DEFAULT_TEMPERATURE) {
  const parsed = Number.parseFloat(value);
  if (!Number.isFinite(parsed)) {
    return fallback;
  }
  return Math.min(2, Math.max(0, parsed));
}

function persistSettings(nextSettings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(nextSettings));
}

function loadSettings() {
  const raw = localStorage.getItem(SETTINGS_KEY);
  if (!raw) {
    return {
      ...DEFAULT_SETTINGS,
      customTabs: normalizeCustomTabs(DEFAULT_SETTINGS.customTabs),
      chatContextTabIds: [],
      apiConfigs: normalizeApiConfigs(DEFAULT_SETTINGS.apiConfigs),
      activeApiConfigId: "",
      translationApiEnabled: false,
      translationApiConfigId: ""
    };
  }

  try {
    const parsed = JSON.parse(raw);
    const merged = {
      ...DEFAULT_SETTINGS,
      ...parsed
    };
    merged.mode = normalizeApiMode(merged.mode);
    const legacyCustomTabs =
      merged.customTabs ||
      parsed?.customTabs ||
      parsed?.customFeeds ||
      parsed?.customTabList ||
      [];
    merged.customTabs = normalizeCustomTabs(legacyCustomTabs);
    merged.chatContextTabIds = normalizeChatContextTabIds(
      merged.chatContextTabIds || parsed?.chatContextTabIds || [],
      merged.customTabs
    );
    const legacyApiConfigs =
      merged.apiConfigs || parsed?.apiConfigs || parsed?.apiPresets || parsed?.apiProfiles || [];
    merged.apiConfigs = normalizeApiConfigs(legacyApiConfigs);
    if (!merged.apiConfigs.some((item) => item.id === merged.activeApiConfigId)) {
      merged.activeApiConfigId = "";
    }
    if (!merged.apiConfigs.some((item) => item.id === merged.translationApiConfigId)) {
      merged.translationApiConfigId = "";
      merged.translationApiEnabled = false;
    }
    return merged;
  } catch (_error) {
    return {
      ...DEFAULT_SETTINGS,
      customTabs: normalizeCustomTabs(DEFAULT_SETTINGS.customTabs),
      chatContextTabIds: [],
      apiConfigs: normalizeApiConfigs(DEFAULT_SETTINGS.apiConfigs),
      activeApiConfigId: "",
      translationApiEnabled: false,
      translationApiConfigId: ""
    };
  }
}

function persistFeeds(feeds) {
  localStorage.setItem(POSTS_KEY, JSON.stringify(feeds));
}

function loadProfile() {
  const raw = localStorage.getItem(PROFILE_KEY);
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
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("图片读取失败"));
    reader.readAsDataURL(file);
  });
}

function createDefaultDirectMessages() {
  return MESSAGE_SENDERS.map((item, index) => ({
    id: `dm_${index}_${hashText(item[0])}`,
    sender: item[0],
    handle: `@dm_${index + 1}`,
    messages: [
      {
        role: "incoming",
        sender: item[0],
        text: item[1],
        time: `${index + 1}h`
      }
    ],
    context: index === 0 ? "热点跟进" : index === 1 ? "内容协作" : "灵感交换",
    time: `${index + 1}h`
  }));
}

function persistDirectMessages(messages) {
  localStorage.setItem(DIRECT_MESSAGES_KEY, JSON.stringify(messages));
}

function loadDirectMessages() {
  const raw = localStorage.getItem(DIRECT_MESSAGES_KEY);
  if (!raw) {
    return createDefaultDirectMessages();
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : createDefaultDirectMessages();
  } catch (_error) {
    return createDefaultDirectMessages();
  }
}

function normalizeChatMessage(item, senderFallback = "联系人", index = 0) {
  const role = item?.role === "user" ? "user" : "incoming";
  const rawText =
    typeof item?.text === "string"
      ? item.text
      : item?.text == null
        ? ""
        : String(item.text);
  const rawImage =
    typeof item?.imageDataUrl === "string"
      ? item.imageDataUrl
      : typeof item?.imageUrl === "string"
        ? item.imageUrl
        : "";
  return {
    id: item?.id || `chat_${index}_${hashText(`${item?.text || ""}-${role}`)}`,
    role,
    sender:
      role === "user"
        ? "你"
        : truncate(item?.sender || item?.displayName || senderFallback, 24),
    handle: truncate(
      item?.handle ||
        normalizeProfileUserId(
          item?.userId,
          item?.sender || item?.displayName || DEFAULT_PROFILE.username
        ) ||
        `@fan_${index + 1}`,
      24
    ),
    text: truncate(rawText, MAX_CHAT_TEXT_LENGTH),
    translationZh: truncate(String(item?.translationZh || item?.translatedText || "").trim(), 2400),
    imageDataUrl: rawImage.trim(),
    time: item?.time || `${index + 1}m`,
    status: item?.status === "pending" ? "pending" : "sent"
  };
}

function loadChatRoom() {
  const raw = localStorage.getItem(CHAT_ROOM_KEY);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed
      .filter((item) => item && typeof item === "object")
      .map((item, index) =>
        normalizeChatMessage(
          item,
          item?.sender || item?.displayName || `粉丝 ${index + 1}`,
          index
        )
      );
  } catch (_error) {
    return [];
  }
}

function persistChatRoom(messages = state.chatRoom) {
  localStorage.setItem(CHAT_ROOM_KEY, JSON.stringify(messages || []));
}

function loadProfilePosts() {
  const raw = localStorage.getItem(PROFILE_POSTS_KEY);
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
  localStorage.setItem(PROFILE_POSTS_KEY, JSON.stringify(posts));
}

function createDefaultFeeds() {
  return {
    entertainment: buildLocalPosts(DEFAULT_SETTINGS, DEFAULT_POST_COUNT, "entertainment")
  };
}

function loadFeeds() {
  const raw = localStorage.getItem(POSTS_KEY);
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
        normalized.entertainment = buildLocalPosts(
          DEFAULT_SETTINGS,
          DEFAULT_POST_COUNT,
          "entertainment"
        );
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
  modeSelect.value = resolvedMode;
  endpointInput.value = normalizeSettingsEndpointByMode(
    resolvedMode,
    settings.endpoint || ""
  );
  tokenInput.value = settings.token || "";
  modelInput.value = settings.model || getDefaultModelByMode(resolvedMode);
  temperatureInput.value = String(normalizeTemperature(settings.temperature, DEFAULT_TEMPERATURE));
  homeCountInput.value = String(settings.homeCount || DEFAULT_POST_COUNT);
  dmCountInput.value = String(settings.dmCount || DEFAULT_DM_COUNT);
  replyCountInput.value = String(settings.replyCount || DEFAULT_REPLY_COUNT);
  if (chatReplyCountInput) {
    chatReplyCountInput.value = String(settings.chatReplyCount || DEFAULT_CHAT_REPLY_COUNT);
  }
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
  profilePersonaInput.value = profile.personaPrompt || DEFAULT_PROFILE.personaPrompt;
}

function updateModeUI() {
  const mode = normalizeApiMode(modeSelect.value);
  const needsModel = mode === "openai" || mode === "gemini";
  modelWrap.style.display = needsModel ? "grid" : "none";
  if (mode === "openai" && !endpointInput.value.trim()) {
    endpointInput.value = DEFAULT_OPENAI_ENDPOINT;
  }
  if (mode === "gemini" && !endpointInput.value.trim()) {
    endpointInput.value = DEFAULT_GEMINI_ENDPOINT;
  }
  if (needsModel && !modelInput.value.trim()) {
    modelInput.value = getDefaultModelByMode(mode);
  }
  if (mode === "gemini") {
    modelInput.placeholder = DEFAULT_GEMINI_MODEL;
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
    personaPrompt: profilePersonaInput.value.trim() || DEFAULT_PROFILE.personaPrompt
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
  renderFollowingPage();
  renderProfilePage();
  renderThreadModal();
  updateMessagePromptPreview();
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

function clearHomeComposerImage() {
  state.homeComposerImageDataUrl = "";
  if (homeComposerImageInput) {
    homeComposerImageInput.value = "";
  }
  renderComposerMediaPreview(homeComposerImagePreviewEl, "", "remove-home-composer-image");
}

function clearChatComposeImage() {
  state.chatDraftImageDataUrl = "";
  if (chatComposeImageInputEl) {
    chatComposeImageInputEl.value = "";
  }
  renderComposerMediaPreview(chatComposeImagePreviewEl, "", "remove-chat-compose-image");
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

function renderChatMessageMedia(message) {
  const imageSrc = String(message?.imageDataUrl || "").trim();
  if (!imageSrc) {
    return "";
  }
  return `
    <div class="chat-media">
      <img class="chat-media__image" src="${escapeHtml(imageSrc)}" alt="聊天图片" />
    </div>
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

function getChatMessageTranslationKey(messageId) {
  return `chat::${String(messageId || "")}`;
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

function isChatMessageTranslating(messageId) {
  return Boolean(state.translatingChatMessages[getChatMessageTranslationKey(messageId)]);
}

function setChatMessageTranslating(messageId, isLoading = false) {
  const key = getChatMessageTranslationKey(messageId);
  if (isLoading) {
    state.translatingChatMessages[key] = true;
    return;
  }
  delete state.translatingChatMessages[key];
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
    const dataUrl = await readFileAsDataUrl(file);
    state.profile = {
      ...getCurrentProfile(),
      [targetKey]: dataUrl
    };
    persistProfile(state.profile);
    renderProfilePage();
    updateMessagePromptPreview();
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

function buildApiConfigSnapshot() {
  const mode = normalizeApiMode(modeSelect.value);
  const endpoint = normalizeSettingsEndpointByMode(mode, endpointInput.value);
  const model =
    mode === "generic"
      ? ""
      : String(modelInput.value || "").trim() || getDefaultModelByMode(mode);
  return {
    mode,
    endpoint,
    token: normalizeApiConfigToken(tokenInput.value),
    model
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
  if (!apiConfigListEl) {
    return;
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
            \n${escapeHtml(modelText)} · ${escapeHtml(tokenText)}
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

  modeSelect.value = normalizeApiMode(config.mode);
  endpointInput.value = normalizeSettingsEndpointByMode(config.mode, config.endpoint);
  tokenInput.value = config.token || "";
  modelInput.value = config.model || getDefaultModelByMode(config.mode);
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
  saveCurrentSettings();
  setApiConfigStatus(`API 配置“${target.name}”已删除。`, "success");
}

function buildPrompt(
  settings,
  feedType = state.activeFeed,
  count = settings.homeCount || DEFAULT_POST_COUNT
) {
  const resolvedFeedType = getCurrentContentFeed(feedType);
  const feedLabel = getFeedLabel(resolvedFeedType);
  const feedSource = buildFeedSourceText(settings, resolvedFeedType).trim();
  const feedInstruction = `当前“${feedLabel}”页签文本：`;
  const resolvedSource =
    feedSource ||
    "暂无页签文本，请结合世界观与实时讨论语境自行展开内容。";
  const historyAvoidanceText = buildFeedHistoryAvoidanceText(resolvedFeedType, count);

  return [
    "你是一个负责生成 X 风格中文讨论流的内容助手。",
    `当前目标分页签是“${feedLabel}”。`,
    `请严格输出 JSON 数组，并且包含 ${count} 个对象，不要输出额外解释。`,
    "每个对象必须包含以下字段：displayName, handle, text, tags, replies, reposts, likes, views。",
    "输出必须是可以直接被 JSON.parse 解析的合法 JSON，所有字符串都必须使用双引号包裹。",
    "text 需要像 X 首页上的真实讨论帖，长度控制在 50 到 300 字之间，语气自然、有观点、有轻微冲突感。",
    "不同帖子需要分别模拟来自中国、日本、韩国、美国社区的用户发言风格。",
    "每一条帖子必须全文保持单一语言，只能四选一：中文、日文、韩文、英文。不要在同一条帖子里混用多种语言，也不要出现中文正文里夹几句英文或日文的情况。",
    "text 要避免整段大段文字，尽量拆成短句；每条至少 2 段，可使用换行或空一行让版式更像真人发帖。",
    "tags 必须是数组，至少 2 个、最多 5 个标签；每个标签都必须以 # 开头，例如 #榜单、#行业洞察。",
    "这些标签必须根据该条内容本身提炼，不能空泛重复；text 字段里不要重复输出标签行，标签只放在 tags 数组中。",
    "严禁直接复制、引用或轻微改写世界观文本或页签文本里的原句。你需要先理解这些设定，再把它们转化成更口语化、更具体的讨论表达。",
    "所有内容都应遵循以下世界观：",
    settings.worldview || DEFAULT_SETTINGS.worldview,
    feedInstruction,
    resolvedSource,
    historyAvoidanceText || "如果没有历史缓存，可自由生成，但仍要让每条帖子讨论方向明显不同。",
    `请保证 ${count} 条内容不重复，角度不同；即使围绕同一大主题，也要主动拆出不同争议点、不同立场、不同细节切口。`
  ].join("\n\n");
}

function buildFeedSourceText(settings, feedType = state.activeFeed) {
  const customTab = findCustomTabInSettings(settings, feedType);
  if (customTab) {
    return customTab.text || "";
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
      String(post.text || "").trim() || (post.imageDataUrl ? "带图帖子" : "已有历史讨论");
    const summaryText = truncate(
      baseSummary.replace(/\s+/g, " "),
      90
    );
    return `${index + 1}. ${tags || "无标签"}｜${summaryText || "已有历史讨论"}`;
  });

  return [
    "下面是当前页签最近已缓存、应尽量避开的讨论方向：",
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
    .map(
      (tab) =>
        `${tab.name || "自定义页签"}：${tab.text?.trim() || "尚未填写内容"}`
    )
    .join("\n");
}

function getSelectedChatContextTabs(settings = state.settings) {
  const selectedIds = normalizeChatContextTabIds(
    settings?.chatContextTabIds || [],
    state.customTabs
  );
  const selectedIdSet = new Set(selectedIds);
  return state.customTabs.filter((tab) => selectedIdSet.has(tab.id));
}

function buildChatContextSummary(settings = state.settings) {
  const selectedTabs = getSelectedChatContextTabs(settings);
  if (!selectedTabs.length) {
    return "当前没有额外勾选的自定义页签参考资料。";
  }
  return selectedTabs
    .map(
      (tab, index) =>
        `${index + 1}. ${tab.name || "自定义页签"}：${String(tab.text || "").trim() || "尚未填写内容"}`
    )
    .join("\n");
}

function buildMessagesPrompt(
  settings,
  profile,
  count = settings.dmCount || DEFAULT_DM_COUNT
) {
  const username = profile.username || DEFAULT_PROFILE.username;
  const handle = normalizeProfileUserId(profile.userId, username);
  const signature = profile.signature || DEFAULT_PROFILE.signature;
  return [
    "你正在生成一个 X 风格社交产品中的私信列表。",
    `请严格输出 JSON 数组，并且包含 ${count} 个对象，不要输出额外解释。`,
    "每个对象必须包含以下字段：sender, handle, text, context, time。",
    "这些消息应该像别人主动发给该用户的私信，语气比公开讨论更直接、更私密，但仍然要自然可信。",
    "当前私信收件人资料：",
    `用户名：${username}`,
    `主页标识：${handle}`,
    `个人签名：${signature}`,
    "私信内容必须让人看得出发件人知道自己是在联系这个具体用户，而不是在对一个模糊的第三方发消息。可以自然提到对方的公开表达风格、身份气质、近期发言方向或适合合作的原因。",
    "世界观文本：",
    settings.worldview || DEFAULT_SETTINGS.worldview,
    "自定义页签文本：",
    buildCustomTabsSummary(settings),
    "用户人设：",
    profile.personaPrompt || DEFAULT_PROFILE.personaPrompt,
    "请让不同私信发件人的动机不同，例如约稿、交流观点、递送情报、邀请合作或追问某条公开讨论。"
  ].join("\n\n");
}

function buildConversationReplyPrompt(settings, profile, conversation, userMessage) {
  const username = profile.username || DEFAULT_PROFILE.username;
  const handle = normalizeProfileUserId(profile.userId, username);
  const history = (conversation.messages || [])
    .slice(-6)
    .map((message) =>
      `${message.role === "user" ? "用户" : conversation.sender}：${message.text}`
    )
    .join("\n");

  return [
    "你正在生成一个 X 风格社交产品里的单条私信回复。",
    "请严格输出 JSON 数组，并且只包含 1 个对象，不要输出额外解释。",
    "对象必须包含以下字段：text, time。",
    `当前聊天对象：${conversation.sender} ${conversation.handle || ""}`.trim(),
    `当前会话主题：${conversation.context || "私信互动"}`,
    "你回复的对象不是陌生第三方，而是这个具体用户：",
    `用户名：${username}`,
    `主页标识：${handle}`,
    `个人签名：${profile.signature || DEFAULT_PROFILE.signature}`,
    `用户人设：${profile.personaPrompt || DEFAULT_PROFILE.personaPrompt}`,
    "最近聊天记录：",
    history || "暂无历史消息",
    "用户刚刚发送的新消息：",
    userMessage,
    "世界观文本：",
    settings.worldview || DEFAULT_SETTINGS.worldview,
    "自定义页签文本：",
    buildCustomTabsSummary(settings),
    "回复要像真实私聊，长度控制在 18 到 90 字之间，要直接回应用户刚发的内容，也要体现聊天对象知道用户是谁。"
  ].join("\n\n");
}

function formatChatRoomPromptMessages(messages = []) {
  if (!messages.length) {
    return "暂无消息。";
  }
  return messages
    .map((message, index) => {
      const senderLabel =
        message.role === "user"
          ? "用户"
          : `${message.sender || message.displayName || `粉丝${index + 1}`}`;
      const imageHint = message.imageDataUrl ? "（附图）" : "";
      const text = String(message.text || "").trim() || "【仅发送图片】";
      return `${index + 1}. ${senderLabel}${imageHint}：${text}`;
    })
    .join("\n");
}

function buildChatRoomReplyPrompt(
  settings,
  profile,
  chatRoom,
  pendingMessages,
  count = settings.chatReplyCount || DEFAULT_CHAT_REPLY_COUNT
) {
  const username = profile.username || DEFAULT_PROFILE.username;
  const handle = normalizeProfileUserId(profile.userId, username);
  const recentContext = (chatRoom || []).slice(-18);
  const hasImages = pendingMessages.some((message) => message.imageDataUrl);
  const chatContextSummary = buildChatContextSummary(settings);
  const hasFreshMessages = pendingMessages.some((message) => message.status === "pending");

  return [
    "你正在生成一个 X 风格社交产品里的单一聊天房间回复流。",
    `请严格输出 JSON 数组，并且包含 ${count} 个对象，不要输出额外解释。`,
    "每个对象必须包含以下字段：displayName, handle, text, time。",
    "这些回复都来自这个用户的订阅者、粉丝或支持者，默认立场是喜欢他、支持他、愿意捧场，但表达方式可以各不相同。",
    "回复要像连续刷出来的聊天消息，单条一般不超过 30 个字符，优先短句，避免长段落。",
    "不同回复可以分别模拟来自中国、日本、韩国、美国的粉丝发言风格。",
    "每一条回复必须全文保持单一语言，只能四选一：中文、日文、韩文、英文。不要在同一条消息里混用语言。",
    hasFreshMessages
      ? "如果用户连续发送了多条新消息，请把这些消息合并理解后再回复，不要只盯住最后一句。"
      : "当前没有新的用户消息，请围绕用户之前发过的内容继续往下聊，生成新的粉丝回复。",
    hasImages
      ? "这批用户消息里带有图片；如果模型能看到图片，请结合图片内容一起回复。"
      : "这批用户消息没有附图。",
    "当前被粉丝围绕的用户资料：",
    `用户名：${username}`,
    `主页标识：${handle}`,
    `个人签名：${profile.signature || DEFAULT_PROFILE.signature}`,
    `用户人设：${profile.personaPrompt || DEFAULT_PROFILE.personaPrompt}`,
    "最近聊天上下文：",
    formatChatRoomPromptMessages(recentContext),
    "这一次需要集中回应的用户新消息：",
    formatChatRoomPromptMessages(pendingMessages),
    "以下是用户手动勾选的自定义首页页签参考资料，仅作为低优先级背景信息；如果与当前聊天消息不一致，请优先理解当前聊天消息本身：",
    chatContextSummary,
    "整体世界观：",
    settings.worldview || DEFAULT_SETTINGS.worldview,
    "请让不同回复的切入点、情绪词和措辞尽量错开，但保持支持用户的核心立场。"
  ].join("\n\n");
}

function buildReplyPrompt(
  settings,
  profile,
  feedType,
  rootPost,
  parentReply = null,
  count = settings.replyCount || DEFAULT_REPLY_COUNT
) {
  const feedLabel = getFeedLabel(feedType);
  const targetText = parentReply ? parentReply.text : rootPost.text;
  const promptTitle = parentReply ? "楼中楼回复" : "主楼回复";
  const feedSourceText = buildFeedSourceText(settings, feedType);
  const rootHasImage = Boolean(rootPost?.imageDataUrl);
  const resolvedRootText = String(rootPost?.text || "").trim() || "这是一条仅包含图片的帖子。";
  const resolvedTargetText = String(targetText || "").trim() || resolvedRootText;

  return [
    `你正在生成 X 风格中文讨论串中的${promptTitle}。`,
    `当前所属分页签是“${feedLabel}”。`,
    "请严格输出 JSON 数组，不要输出额外解释。",
    `请生成 ${count} 条回复，每条都必须是不同用户的口吻。`,
    "每个对象必须包含以下字段：displayName, handle, text, likes, replies。",
    "回复语气要像真实网友跟帖，长度控制在 18 到 80 字之间，可以有赞同、反对、补充和追问。",
    "不同回复可以分别模拟来自中国、日本、韩国、美国社区的用户发言风格。",
    "每一条回复必须全文保持单一语言，只能四选一：中文、日文、韩文、英文。不要在同一条回复里混用多种语言。",
    "避免整段灌水，优先短句，必要时用换行提升可读性。",
    "回复生成优先级：",
    "1. 首先直接回应当前帖子或上一层回复的具体内容，抓住文本里的观点、情绪、判断、细节或矛盾点。",
    "2. 识别当前发帖用户的人设，让回复看起来像是在对这样一个具体的人说话，而不是对匿名文本发言。",
    "3. 再结合整体世界观与自定义页签文本补充背景判断，但这些背景只能辅助，不能盖过帖子内容本身。",
    "当前发帖用户人设：",
    profile?.personaPrompt || DEFAULT_PROFILE.personaPrompt,
    "整体世界观：",
    settings.worldview || DEFAULT_SETTINGS.worldview,
    "当前页签参考文本：",
    feedSourceText || "尚未提供页签文本，请根据帖子语境自行补充。",
    rootHasImage
      ? "主楼附带了一张图片；如果模型能看到图片，请把图片内容也一起纳入理解和回复。"
      : "主楼没有附图。",
    "主楼内容：",
    resolvedRootText,
    parentReply ? "当前正在回复的上一层内容：" : "当前需要围绕主楼展开讨论的内容：",
    resolvedTargetText,
    "当前板块参考素材：",
    buildFeedSourceText(settings, feedType),
    "请避免重复句式，并保持楼中讨论的连贯性。"
  ].join("\n\n");
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
  const topicCandidates = parseTopics(buildFeedSourceText(settings, resolvedFeedType));
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
  return {
    id: item?.id || `reply_${index}_${hashText(stableSeed)}`,
    displayName: truncate(item?.displayName || fallbackName, 24),
    handle: truncate(item?.handle || fallbackHandle, 24),
    text: truncate(item?.text || "这条回复还在生成中。", MAX_REPLY_TEXT_LENGTH),
    translationZh: truncate(translationZh, 600),
    likes: formatMetric(item?.likes, 12 + index * 5),
    replies: formatMetric(item?.replies, 2 + index),
    time: item?.time || `${index + 1}m`,
    authorOwned: Boolean(item?.authorOwned),
    children: Array.isArray(item?.children) ? item.children : [],
    expanded: Boolean(item?.expanded),
    loading: Boolean(item?.loading)
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

function syncBodyScrollLock() {
  document.body.style.overflow =
    state.threadModalOpen || state.chatContextModalOpen ? "hidden" : "";
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
    pullMetaEl.textContent = "正在请求 API 或本地回退生成内容";
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
  if (state.settings.mode === "openai" || state.settings.mode === "gemini") {
    state.settings.model = state.settings.model || getDefaultModelByMode(state.settings.mode);
    modelInput.value = state.settings.model;
  }
  endpointInput.value = state.settings.endpoint;
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
  persistSettings(state.settings);
  updatePromptPreview();
  updateMessagePromptPreview();
  updateReplyPromptPreview();
  updateInsightPanel();
  renderFollowingPage();
  renderMessagesPage();
  renderProfilePage();
  renderCustomTabSettings();
  renderApiConfigList();
}

function setHomeComposerOpen(isOpen) {
  state.composerOpen = Boolean(isOpen);
  if (homeComposerCardEl) {
    homeComposerCardEl.classList.toggle("hidden", !state.composerOpen);
  }
  if (homeComposerToggleBtn) {
    homeComposerToggleBtn.textContent = state.composerOpen ? "收起发帖" : "发布新帖子";
  }
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

function canRefreshCurrentHomeFeed() {
  return state.activeTab === "home" && state.activeFeed !== "tags";
}

function updateHomeRefreshAvailability() {
  if (!topRefreshBtn) {
    return;
  }
  topRefreshBtn.disabled = state.isRefreshing || !canRefreshCurrentHomeFeed();
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
  updateMessagePromptPreview();
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

  syncTabToLocation(nextTab);
}

function updatePromptPreview() {
  if (!promptPreviewEl) {
    return;
  }
  promptPreviewEl.textContent = buildPrompt(getCurrentSettings(), getCurrentContentFeed());
}

function updateMessagePromptPreview() {
  if (!messagePromptPreviewEl) {
    return;
  }
  messagePromptPreviewEl.textContent = buildMessagesPrompt(
    getCurrentSettings(),
    getCurrentProfile(),
    getCurrentSettings().dmCount || DEFAULT_DM_COUNT
  );
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

  const localCandidates = buildLocalPosts(settings, Math.max(count * 3, 12), feedType);
  localCandidates.forEach((post) => {
    if (chosen.length >= count) {
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
  const stableSeed = `${item?.text || ""}-${item?.displayName || fallbackName}-${index}`;
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
  const normalizedText = rawText.trim()
    ? truncate(rawText, MAX_POST_TEXT_LENGTH)
    : imageDataUrl
      ? ""
      : "讨论内容生成中。";
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
    time: item?.time || `${Math.max(1, index + 1)}m`,
    edited: Boolean(item?.edited),
    authorOwned: Boolean(item?.authorOwned),
    feedType: resolvedFeedType
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
  const reply = normalizeReply(
    {
      id: `reply_self_${Date.now()}_${hashText(`${seed}-${content}`)}`,
      displayName: profile.username,
      handle: normalizeProfileUserId(profile.userId, profile.username),
      text: content,
      likes: 0,
      replies: 0,
      time: "刚刚",
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
    syncBodyScrollLock();
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
  syncBodyScrollLock();
}

function setThreadModalOpen(isOpen) {
  state.threadModalOpen = Boolean(isOpen);
  if (!state.threadModalOpen) {
    state.threadModalBucket = "";
    state.threadModalPostId = "";
    state.threadModalTouchTracking = false;
    state.threadModalLoadingMore = false;
    state.threadModalLastLoadAt = 0;
    resetThreadReplyComposer();
  }
  renderThreadModal();
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
    let replies;
    try {
      replies = await requestGeneratedReplies(
        settings,
        profile,
        post.feedType || resolvedBucket,
        post,
        null,
        replyCount
      );
    } catch (_error) {
      replies = buildLocalReplies(
        settings,
        profile,
        post.feedType || resolvedBucket,
        post,
        null,
        replyCount
      );
    }

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
  } catch (_error) {
    feedState[postId] = {
      expanded: true,
      loading: false,
      replies: existingReplies
    };
    persistDiscussions();
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

function resetCustomTabForm(preserveStatus = false) {
  state.customTabEditingId = "";
  if (customTabNameInput) {
    customTabNameInput.value = "";
  }
  if (customTabTextInput) {
    customTabTextInput.value = "";
  }
  if (!preserveStatus) {
    setCustomTabFormStatus("");
  }
  renderCustomTabsManager();
}

function updateCustomTabsManageButton() {
  if (!customTabsManageBtn) {
    return;
  }
  customTabsManageBtn.textContent = state.customTabEditorOpen ? "收起自定义页签" : "管理自定义页签";
  customTabsManageBtn.setAttribute("aria-expanded", state.customTabEditorOpen ? "true" : "false");
}

function setCustomTabsPanelOpen(isOpen) {
  if (!customTabsPanel) {
    return;
  }
  state.customTabEditorOpen = Boolean(isOpen);
  customTabsPanel.classList.toggle("hidden", !state.customTabEditorOpen);
  updateCustomTabsManageButton();
  if (state.customTabEditorOpen) {
    renderCustomTabsManager();
    window.requestAnimationFrame(() => {
      customTabsPanel.scrollIntoView({
        block: "start",
        behavior: "smooth"
      });
      if (customTabNameInput && !customTabNameInput.disabled) {
        try {
          customTabNameInput.focus({ preventScroll: true });
        } catch (_error) {
          customTabNameInput.focus();
        }
      }
    });
  }
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
  if (customTabTextInput) {
    customTabTextInput.value = tab.text || "";
  }
  setCustomTabFormStatus(`正在编辑“${tab.name || "自定义页签"}”`, "");
  renderCustomTabsManager();
}

function deleteCustomTab(tabId) {
  const tab = getCustomTab(tabId);
  if (!tab) {
    return;
  }
  const confirmed = window.confirm(`确定删除“${tab.name || "自定义页签"}”页签吗？`);
  if (!confirmed) {
    return;
  }
  const nextTabs = state.customTabs.filter((item) => item.id !== tabId);
  commitCustomTabs(nextTabs);
  if (state.customTabEditingId === tabId) {
    resetCustomTabForm(true);
  } else {
    renderCustomTabsManager();
  }
  setCustomTabFormStatus("自定义页签已删除。", "success");
}

function clearCustomTabDragClasses() {
  if (!customTabsListEl) {
    return;
  }
  customTabsListEl
    .querySelectorAll(".custom-tab-item.is-dragging, .custom-tab-item.drag-over")
    .forEach((item) => item.classList.remove("is-dragging", "drag-over"));
}

function reorderCustomTabs(draggedId, targetId) {
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
  commitCustomTabs(nextTabs);
  setCustomTabFormStatus("已更新自定义页签顺序。", "success");
}

function renderCustomTabsManager() {
  if (!customTabsListEl || !customTabForm) {
    return;
  }

  if (!state.customTabs.length) {
    customTabsListEl.innerHTML =
      '<p class="empty-state">还没有自定义页签，使用下方表单新增。</p>';
  } else {
    customTabsListEl.innerHTML = state.customTabs
      .map((tab) => {
        const snippet = truncate(tab.text || "尚未设置文本", 88);
        return `
          <article class="custom-tab-item" data-tab-id="${escapeHtml(tab.id)}" draggable="true">
            <div>
              <strong>${escapeHtml(tab.name || "未命名页签")}</strong>
              <p class="tag-stat-meta">${escapeHtml(snippet)}</p>
            </div>
            <div class="custom-tab-item__actions">
              <button class="ghost-chip" type="button" data-action="edit-custom-tab" data-tab-id="${escapeHtml(
                tab.id
              )}">编辑</button>
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
  [customTabNameInput, customTabTextInput, saveButton].forEach((field) => {
    if (field) {
      field.disabled = disableCreation;
    }
  });
  if (disableCreation) {
    setCustomTabFormStatus("已达到自定义页签上限，请删除后再新增。", "error");
  } else if (!isEditing && customTabFormStatusEl?.classList.contains("error")) {
    setCustomTabFormStatus("");
  }
}

function renderCustomTabSettings() {
  if (!customTabSettingsListEl || !customTabSettingsEmptyEl) {
    return;
  }

  if (!state.customTabs.length) {
    customTabSettingsEmptyEl.style.display = "block";
    customTabSettingsListEl.innerHTML = "";
    return;
  }

  customTabSettingsEmptyEl.style.display = "none";
  const currentSettings = getCurrentSettings();
  const postCount = currentSettings.homeCount || DEFAULT_POST_COUNT;
  customTabSettingsListEl.innerHTML = state.customTabs
    .map((tab) => {
      const promptPreview = buildPrompt(currentSettings, tab.id, postCount);
      return `
        <article class="custom-tab-settings-item" data-custom-tab-id="${escapeHtml(tab.id)}">
          <div class="custom-tab-settings-head">
            <strong>${escapeHtml(tab.name || "未命名页签")}</strong>
            <span class="badge">${escapeHtml(getFeedLabel(tab.id))}</span>
          </div>
          <label>
            页签名称
            <input type="text" data-field="name" maxlength="10" value="${escapeHtml(tab.name || "")}" />
          </label>
          <label>
            页签文本
            <textarea data-field="text" rows="4" placeholder="输入该页签要聚焦的主题、设定或提示。">${escapeHtml(
              tab.text || ""
            )}</textarea>
          </label>
          <p class="tag-stat-meta">Prompt 预览</p>
          <pre class="prompt-preview custom-tab-prompt">${escapeHtml(promptPreview)}</pre>
        </article>
      `;
    })
    .join("");
}

function handleCustomTabFormSubmit() {
  if (!customTabForm) {
    return;
  }
  const rawName = customTabNameInput?.value || "";
  const rawText = customTabTextInput?.value || "";
  const name = rawName.trim().slice(0, 10) || "自定义页签";
  const text = rawText.trim();
  if (!text) {
    setCustomTabFormStatus("请填写页签文本，用于生成该页签的讨论内容。", "error");
    return;
  }

  if (state.customTabEditingId) {
    const tabId = state.customTabEditingId;
    const nextTabs = state.customTabs.map((tab) =>
      tab.id === tabId
        ? {
            ...tab,
            name,
            text
          }
        : tab
    );
    commitCustomTabs(nextTabs);
    setCustomTabFormStatus("自定义页签已更新。", "success");
    resetCustomTabForm(true);
    return;
  }

  if (state.customTabs.length >= CUSTOM_TAB_LIMIT) {
    setCustomTabFormStatus("已达到自定义页签上限，请删除后再新增。", "error");
    return;
  }

  const tabId = createCustomTabId(name);
  const nextTabs = [...state.customTabs, { id: tabId, name, text }];
  commitCustomTabs(nextTabs);
  switchHomeFeed(tabId);
  setCustomTabFormStatus("自定义页签已保存。", "success");
  resetCustomTabForm(true);
}

function handleCustomTabSettingsInput(event) {
  const target = event.target;
  if (!(target instanceof HTMLInputElement) && !(target instanceof HTMLTextAreaElement)) {
    return;
  }
  const wrapper = target.closest("[data-custom-tab-id]");
  if (!(wrapper instanceof HTMLElement)) {
    return;
  }
  const tabId = wrapper.dataset.customTabId;
  const field = target.dataset.field;
  if (!tabId || !field) {
    return;
  }

  const index = state.customTabs.findIndex((tab) => tab.id === tabId);
  if (index === -1) {
    return;
  }

  const value =
    field === "name" ? target.value.trim().slice(0, 10) || "自定义页签" : target.value;
  state.customTabs[index] = {
    ...state.customTabs[index],
    [field]: value
  };
  state.settings.customTabs = [...state.customTabs];
  persistSettings(state.settings);
  if (field === "name") {
    const headEl = wrapper.querySelector(".custom-tab-settings-head strong");
    if (headEl) {
      headEl.textContent = value;
    }
    renderHomeTabs();
    renderCustomTabsManager();
  }

  const currentSettings = getCurrentSettings();
  const promptPreview = buildPrompt(
    currentSettings,
    tabId,
    currentSettings.homeCount || DEFAULT_POST_COUNT
  );
  const previewEl = wrapper.querySelector(".custom-tab-prompt");
  if (previewEl) {
    previewEl.textContent = promptPreview;
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

function setChatStatus(message, tone = "") {
  if (!chatStatusEl) {
    return;
  }
  chatStatusEl.textContent = message;
  chatStatusEl.className = "status-text";
  if (tone) {
    chatStatusEl.classList.add(tone);
  }
}

function scrollChatHistoryToBottom(behavior = "auto") {
  if (!chatHistoryEl) {
    return;
  }
  chatHistoryEl.scrollTo({
    top: chatHistoryEl.scrollHeight,
    behavior
  });
}

function findChatMessageById(messageId) {
  return state.chatRoom.find((message) => message.id === messageId) || null;
}

function updateChatMessage(messageId, updater) {
  let updated = false;
  state.chatRoom = state.chatRoom.map((message) => {
    if (message.id !== messageId) {
      return message;
    }
    updated = true;
    return updater({ ...message });
  });
  if (updated) {
    persistChatRoom(state.chatRoom);
  }
  return updated;
}

function renderChatRoomMessage(message, index = 0) {
  const isUser = message.role === "user";
  const senderLabel = isUser
    ? state.profile.username || DEFAULT_PROFILE.username
    : message.sender || `粉丝 ${index + 1}`;
  const pendingLabel =
    isUser && message.status === "pending"
      ? '<span class="chat-bubble__pending">待统一回复</span>'
      : "";
  const showTranslate = Boolean(message.text);
  const translationMarkup = renderTranslationBlock(message.translationZh);
  const translateLabel = isChatMessageTranslating(message.id)
    ? "翻译中..."
    : message.translationZh
      ? "重新翻译"
      : "翻译";
  return `
    <article class="chat-bubble ${isUser ? "chat-bubble--user" : ""}">
      <div class="chat-bubble__meta">
        <strong class="chat-bubble__sender">${escapeHtml(senderLabel)}</strong>
        ${pendingLabel}
      </div>
      ${message.text ? `<p>${escapeHtml(message.text)}</p>` : ""}
      ${renderChatMessageMedia(message)}
      ${translationMarkup}
      ${
        showTranslate
          ? `<div class="chat-bubble__actions">
              <button class="action-link" type="button" data-action="translate-chat-message" data-message-id="${escapeHtml(
                message.id
              )}" ${isChatMessageTranslating(message.id) ? "disabled" : ""}>
                ${translateLabel}
              </button>
            </div>`
          : ""
      }
      <span class="post-time">${escapeHtml(message.time || "刚刚")}</span>
    </article>
  `;
}

function updateChatActionState() {
  if (chatGenerateBtnEl) {
    const pendingCount = state.chatRoom.filter(
      (message) => message.role === "user" && message.status === "pending"
    ).length;
    const hasUserMessages = state.chatRoom.some((message) => message.role === "user");
    chatGenerateBtnEl.disabled = state.chatReplying || (!pendingCount && !hasUserMessages);
  }
  if (chatClearBtnEl) {
    chatClearBtnEl.disabled = state.chatReplying || state.chatRoom.length === 0;
  }
  if (chatComposeInputEl) {
    chatComposeInputEl.disabled = state.chatReplying;
  }
  if (chatComposeImageInputEl) {
    chatComposeImageInputEl.disabled = state.chatReplying;
  }
  if (chatSendBtnEl) {
    chatSendBtnEl.disabled = state.chatReplying;
  }
  if (chatContextTriggerBtnEl) {
    const selectedCount = normalizeChatContextTabIds(
      state.settings.chatContextTabIds,
      state.customTabs
    ).length;
    chatContextTriggerBtnEl.textContent = selectedCount
      ? `参考页签（${selectedCount}）`
      : "参考页签";
    chatContextTriggerBtnEl.disabled = false;
  }
}

function renderChatContextOptions(containerEl, emptyEl, selectedIds = []) {
  if (!containerEl || !emptyEl) {
    return;
  }

  const selectedIdSet = new Set(normalizeChatContextTabIds(selectedIds, state.customTabs));

  if (!state.customTabs.length) {
    emptyEl.hidden = false;
    emptyEl.textContent = "暂无可勾选的自定义首页页签。";
    containerEl.innerHTML = "";
    return;
  }

  emptyEl.hidden = true;
  containerEl.innerHTML = state.customTabs
    .map((tab) => {
      const checked = selectedIdSet.has(tab.id);
      return `
        <label class="chat-context-option${checked ? " is-selected" : ""}">
          <input
            type="checkbox"
            data-action="toggle-chat-context-draft-tab"
            data-tab-id="${escapeHtml(tab.id)}"
            ${checked ? "checked" : ""}
          />
          <div class="chat-context-option__body">
            <strong>${escapeHtml(tab.name || "自定义页签")}</strong>
            <span>${escapeHtml(truncate(tab.text || "尚未填写内容", 72))}</span>
          </div>
        </label>
      `;
    })
    .join("");
}

function renderChatContextModal() {
  if (!chatContextModalEl || !chatContextModalListEl || !chatContextModalEmptyEl) {
    return;
  }
  if (!state.chatContextModalOpen) {
    chatContextModalEl.classList.add("hidden");
    chatContextModalEl.setAttribute("aria-hidden", "true");
    syncBodyScrollLock();
    return;
  }

  renderChatContextOptions(
    chatContextModalListEl,
    chatContextModalEmptyEl,
    state.chatContextDraftTabIds
  );
  chatContextModalEl.classList.remove("hidden");
  chatContextModalEl.setAttribute("aria-hidden", "false");
  syncBodyScrollLock();
}

function setChatContextModalOpen(isOpen) {
  state.chatContextModalOpen = Boolean(isOpen);
  if (state.chatContextModalOpen) {
    state.chatContextDraftTabIds = normalizeChatContextTabIds(
      state.settings.chatContextTabIds,
      state.customTabs
    );
  } else {
    state.chatContextDraftTabIds = [];
  }
  renderChatContextModal();
}

function toggleChatContextDraftTab(tabId, isChecked) {
  const currentIds = normalizeChatContextTabIds(state.chatContextDraftTabIds, state.customTabs);
  const nextIds = isChecked
    ? [...currentIds, tabId]
    : currentIds.filter((item) => item !== tabId);
  state.chatContextDraftTabIds = normalizeChatContextTabIds(nextIds, state.customTabs);
  renderChatContextModal();
}

function applyChatContextDraftSelection() {
  state.settings.chatContextTabIds = normalizeChatContextTabIds(
    state.chatContextDraftTabIds,
    state.customTabs
  );
  persistSettings(state.settings);
  setChatContextModalOpen(false);
  renderFollowingPage();
  setChatStatus("已更新聊天参考页签。", "success");
}

function renderFollowingPage() {
  if (!chatHistoryEl) {
    return;
  }
  if (!state.chatRoom.length) {
    chatHistoryEl.innerHTML =
      '<p class="empty-state">先发送几条消息，或发一张图片，再点击“获取回复”收粉丝回帖。</p>';
  } else {
    chatHistoryEl.innerHTML = state.chatRoom
      .map((message, index) => renderChatRoomMessage(message, index))
      .join("");
  }
  renderComposerMediaPreview(
    chatComposeImagePreviewEl,
    state.chatDraftImageDataUrl,
    "remove-chat-compose-image"
  );
  updateChatActionState();
}

function renderMessagesPage() {
  if (!messagesListEl) {
    return;
  }
  if (!state.directMessages.length) {
    state.activeConversationId = null;
    messagesListEl.innerHTML =
      '<p class="empty-state">还没有私信内容，点击“新建消息”生成新的私信会话。</p>';
    return;
  }

  const activeConversation = state.directMessages.find(
    (item) => item.id === state.activeConversationId
  );

  if (!activeConversation) {
    messagesListEl.innerHTML = state.directMessages
      .map((item) => `
        <article class="conversation-card conversation-card--interactive" data-action="open-conversation" data-conversation-id="${escapeHtml(
          item.id
        )}">
          <div class="conversation-card__head">
            <div>
              <strong>${escapeHtml(item.sender)}</strong>
              <div class="post-handle">${escapeHtml(item.handle || "@unknown")}</div>
            </div>
            <span class="post-time">${escapeHtml(item.time || "刚刚")}</span>
          </div>
          <p>${escapeHtml(item.text)}</p>
          <div class="reply-actions">
            <span>${escapeHtml(item.context || "相关私信")}</span>
            <span>${escapeHtml(String(item.messages?.length || 1))} 条消息</span>
          </div>
        </article>
      `)
      .join("");
    return;
  }

  messagesListEl.innerHTML = `
    <section class="chat-shell">
      <div class="chat-shell__head">
        <button class="ghost-chip" type="button" data-action="close-conversation">返回会话列表</button>
        <div>
          <strong>${escapeHtml(activeConversation.sender)}</strong>
          <div class="post-handle">${escapeHtml(activeConversation.handle || "@unknown")}</div>
        </div>
      </div>
      <p class="tag-stat-meta">${escapeHtml(activeConversation.context || "相关私信")}</p>
      <div class="chat-history">
        ${activeConversation.messages
          .map(
            (message) => `
              <article class="chat-bubble ${message.role === "user" ? "chat-bubble--user" : ""}">
                <p>${escapeHtml(message.text)}</p>
                <span class="post-time">${escapeHtml(message.time || "刚刚")}</span>
              </article>
            `
          )
          .join("")}
        ${
          state.replyingConversationId === activeConversation.id
            ? '<article class="chat-bubble"><p>正在生成回复…</p></article>'
            : ""
        }
      </div>
      <form class="chat-input-form" data-action="send-conversation-message" data-conversation-id="${escapeHtml(
        activeConversation.id
      )}">
        <textarea name="message" class="chat-textarea" rows="3" placeholder="输入你要回复的内容"></textarea>
        <div class="settings-actions">
          <button class="solid-button" type="submit" ${
            state.replyingConversationId === activeConversation.id ? "disabled" : ""
          }>
            发送消息
          </button>
        </div>
      </form>
    </section>
  `;
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
              ${tagMarkup}
              <div class="post-actions">
                <button class="action-link" type="button" data-action="open-thread-modal" data-bucket="profile" data-post-id="${escapeHtml(
                  post.id
                )}">
                  查看讨论
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

function buildRequestBody(settings, prompt, count = DEFAULT_POST_COUNT, options = {}) {
  const images = Array.isArray(options?.images) ? options.images : [];
  if (normalizeApiMode(settings.mode) === "openai") {
    return {
      model: settings.model || DEFAULT_SETTINGS.model,
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

function repairMalformedJsonArrayText(jsonText) {
  return String(jsonText || "")
    .replace(/,\s*([}\]])/g, "$1")
    .replace(/([,\[]\s*)(#([^"\],\r\n]+))"(?=\s*[,}\]])/g, '$1"$2"')
    .replace(/([,\[]\s*)(#([^"\],\r\n]+))(?=\s*[,}\]])/g, '$1"$2"');
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

function parseGeneratedChatReplies(rawText, count = DEFAULT_CHAT_REPLY_COUNT) {
  const jsonText = extractJsonArray(rawText);
  if (!jsonText) {
    throw new Error("聊天回复中没有找到 JSON 数组。");
  }

  const parsed = parseJsonArrayWithRepair(jsonText, "聊天回复 JSON 解析失败。");
  if (!Array.isArray(parsed) || !parsed.length) {
    throw new Error("聊天回复不是有效数组。");
  }

  return parsed.slice(0, count).map((item, index) =>
    normalizeChatMessage(
      {
        ...item,
        role: "incoming",
        sender: item?.sender || item?.displayName || `粉丝 ${index + 1}`
      },
      item?.sender || item?.displayName || `粉丝 ${index + 1}`,
      index
    )
  );
}

function getFallbackLocaleProfile(index = 0) {
  const profiles = [
    {
      country: "中国",
      postTail: "评论区接下来一定会继续分层。",
      replyTail: "这条线往下聊，评论区很容易继续分成两派。",
      postText(topic, worldview, ending) {
        return [
          `如果只看${topic}的表面热度，很多人会误判这波讨论。`,
          worldview,
          ending
        ].join("\n\n");
      },
      replyText(focus, topic, viewpoint, tail) {
        return `${viewpoint}\n\n你提到“${focus}”这点很关键，放在“${topic}”这个语境里看，${tail}`;
      }
    },
    {
      country: "日本",
      postTail: "この話題、まだしばらく伸びると思う。",
      replyTail: "この一文、次の返信で空気が変わりそう。",
      postText(_topic, _worldview, ending) {
        return [
          "この話題、表面の熱量だけで判断するとズレる。",
          "本当の争点は好き嫌いじゃなくて、流れが変わったことを誰が先に読んだかだと思う。",
          ending
        ].join("\n\n");
      },
      replyText(_focus, _topic, _viewpoint, tail) {
        return [
          "その見方はわかるけど、まだ前提を分けて考えたい。",
          "この流れだと、解釈の違いがそのまま温度差として出てくる。",
          tail
        ].join("\n\n");
      }
    },
    {
      country: "韩国",
      postTail: "이 토론은 아직 더 커질 가능성이 높아요.",
      replyTail: "이 문장은 다음 답글에서 분위기를 바꿀 수 있어요.",
      postText(_topic, _worldview, ending) {
        return [
          "이 이슈는 겉으로 보이는 반응만 보면 방향을 잘못 읽기 쉽습니다.",
          "핵심은 호불호가 아니라, 서사가 이미 바뀌었다는 걸 누가 먼저 감지했는가에 있어요.",
          ending
        ].join("\n\n");
      },
      replyText(_focus, _topic, _viewpoint, tail) {
        return [
          "이 포인트는 공감하지만, 아직 전제를 더 나눠서 볼 필요가 있어요.",
          "지금은 문장 하나가 아니라 그 문장이 어떤 흐름을 만드는지가 더 중요해 보입니다.",
          tail
        ].join("\n\n");
      }
    },
    {
      country: "美国",
      postTail: "This discussion still has room to grow.",
      replyTail: "One more reply could shift the whole read of this thread.",
      postText(_topic, _worldview, ending) {
        return [
          "If you only look at the surface heat, this topic is easy to misread.",
          "The real split is not taste. It is about who noticed the narrative had already shifted.",
          ending
        ].join("\n\n");
      },
      replyText(_focus, _topic, _viewpoint, tail) {
        return [
          "I get the point, but I still think the premise needs to be separated first.",
          "What matters here is not the sentence alone. It is the chain reaction the sentence creates.",
          tail
        ].join("\n\n");
      }
    }
  ];

  return profiles[index % profiles.length];
}

function buildLocalReplies(
  settings,
  profile,
  feedType,
  rootPost,
  parentReply = null,
  count = settings.replyCount || DEFAULT_REPLY_COUNT
) {
  const parentText = parentReply ? parentReply.text : rootPost.text;
  const topic = getRenderableTags(rootPost, feedType)[0] || getFeedLabel(feedType) || "当前讨论";
  const focus = truncate(parentText, 30);
  const hasImage = Boolean(rootPost?.imageDataUrl);
  const viewpoints = [
    "你这句切得很准，但我觉得争议点其实就在这里。",
    "我不完全同意，因为这段话默认的前提可能还得再拆开。",
    "这条最有意思的就是把核心矛盾直接点出来了，所以大家才会接着聊。",
    "如果顺着你这个说法往下推，后面的结果可能比表面更明显。",
    "我更在意的是你这段表达会怎么被别人理解，这会直接影响讨论走向。"
  ];
  const followUps = [
    "这也解释了为什么评论区容易分成两派。",
    "所以我更想看有没有人能拿出反例。",
    "放在这个板块里，这种说法确实很容易带出连锁回复。",
    "要继续聊下去，关键还是得回到更具体的场景。",
    hasImage ? "而且附图把情绪又往前推了一层。" : "真正有意思的是，你这句其实还能继续往下拆。"
  ];
  const localeOffset = Number.parseInt(hashText(rootPost.id || topic), 36) || 0;
  return Array.from({ length: count }, (_, index) => {
    const [displayName, handle] = FEED_NAMES[(index + 5) % FEED_NAMES.length];
    const localeProfile = getFallbackLocaleProfile(index + localeOffset);
    const tail = localeProfile.country === "中国"
      ? followUps[index % followUps.length]
      : localeProfile.replyTail;
    const viewpoint = localeProfile.country === "中国"
      ? viewpoints[index % viewpoints.length]
      : "";
    return normalizeReply(
      {
        displayName,
        handle,
        text: localeProfile.replyText(focus, topic, viewpoint, tail),
        likes: 10 + index * 6,
        replies: 1 + (index % 3),
        time: `${index + 1}m`
      },
      index,
      `${rootPost.id}-${parentReply?.id || "root"}`
    );
  });
}

function buildLocalWorldviewAngle(fragment, feedType = DEFAULT_CONTENT_FEED, index = 0) {
  const source = String(fragment || "");
  const genericAngles =
    feedType === "entertainment"
      ? [
          "真正把讨论带起来的，通常不是表面热度，而是大家开始重新站队。",
          "这类内容一旦引发情绪分层，后面的讨论就会越滚越大。",
          "大家最后争的往往不是事实本身，而是谁先看懂风向。"
        ]
      : [
          "大家真正争论的，通常不是事件本身，而是谁更早形成判断。",
          "这类话题一旦牵到结构变化，讨论就不会停在表面。",
          "真正有信息量的讨论，往往都在拆判断逻辑，而不是复述消息。"
        ];

  if (/(长期|复利|持续)/.test(source)) {
    return "表面热度很快会过去，但最后留下来的还是长期判断。";
  }
  if (/(产品|洞察|用户)/.test(source)) {
    return "真正能把这件事讲透的人，通常会先回到产品和用户感受本身。";
  }
  if (/(ai|模型|agent|自动化)/i.test(source)) {
    return "一旦话题碰到 AI 或自动化，讨论重点很快就会转向谁更快适应变化。";
  }
  if (/(内容|表达|讨论)/.test(source)) {
    return "这类讨论最有意思的地方，在于大家会立刻暴露各自的表达立场。";
  }
  if (/(增长|平台|流量|收入)/.test(source)) {
    return "一旦牵到平台和增长，大家看问题的尺度就会马上拉开。";
  }
  return genericAngles[index % genericAngles.length];
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

function normalizeDirectMessage(item, index = 0) {
  const sender = truncate(item?.sender || item?.displayName || `联系人 ${index + 1}`, 24);
  const messages = Array.isArray(item?.messages) && item.messages.length
    ? item.messages.map((message, messageIndex) =>
        normalizeChatMessage(message, sender, messageIndex)
      )
    : [
        normalizeChatMessage(
          {
            role: "incoming",
            sender,
            text: item?.text || "一条新的私信正在生成。",
            time: item?.time || `${index + 1}m`
          },
          sender,
          0
        )
      ];
  const latestMessage = messages[messages.length - 1];
  return {
    id: item?.id || `dm_${index}_${hashText(item?.text || item?.sender || "")}`,
    sender,
    handle: truncate(item?.handle || `@contact_${index + 1}`, 24),
    text: latestMessage.text,
    context: truncate(item?.context || "私信互动", 24),
    time: latestMessage.time || item?.time || `${index + 1}m`,
    messages
  };
}

function buildLocalPosts(settings, count = DEFAULT_POST_COUNT, feedType = DEFAULT_CONTENT_FEED) {
  const sourceText = buildFeedSourceText(settings, feedType);
  const topics = parseTopics(sourceText);
  const worldviewParts = parseWorldviewFragments(settings.worldview);
  const fallbackTopic = feedType === "entertainment" ? "文娱趋势" : getFeedLabel(feedType) || "当前讨论";
  const baseTopics = topics.length ? topics : [fallbackTopic];
  const worldviewBase = worldviewParts.length
    ? worldviewParts
    : ["这个社区偏爱真实、锋利且能引发互动的观点。"];

  const openings = [
    "如果把",
    "我越来越觉得",
    "真正值得讨论的不是",
    "今天刷到一圈内容后，最大的感受是",
    "现在很多人低估了",
    "有点反直觉，但我认为"
  ];

  const endings = [
    "这类话题天然适合在 X 上持续发酵。",
    "评论区一定会出现两派人，但这正是讨论价值所在。",
    "谁能先把它说透，谁就能拿到更高质量的关注。",
    "如果只看表面热度，很容易错过真正的信号。",
    "这件事不是有没有机会，而是谁更快形成判断。"
  ];
  const tagPools = {
    entertainment: ["#文娱热议", "#口碑观察", "#热搜现场", "#角色讨论", "#二创发酵"],
    default: ["#趋势观察", "#行业洞察", "#观点交锋", "#平台观察", "#公共讨论"]
  };

  return Array.from({ length: count }, (_, index) => {
    const topic = baseTopics[index % baseTopics.length];
    const worldview = buildLocalWorldviewAngle(
      worldviewBase[index % worldviewBase.length],
      feedType,
      index
    );
    const [displayName, handle] = FEED_NAMES[index % FEED_NAMES.length];
    const localeProfile = getFallbackLocaleProfile(index);
    const tail = localeProfile.country === "中国"
      ? endings[index % endings.length]
      : localeProfile.postTail;
    const chineseText = [
      `${openings[index % openings.length]}${topic}，而是它背后暴露出的结构变化。`,
      worldview,
      tail
    ].join("\n\n");
    const text = localeProfile.country === "中国"
      ? chineseText
      : localeProfile.postText(topic, worldview, tail);
    const pool = tagPools[feedType] || tagPools.default;
    const tags = ensurePostTags(
      [topic, pool[index % pool.length], pool[(index + 2) % pool.length]],
      feedType,
      index
    );

    return normalizePost(
      {
        displayName,
        handle,
        text,
        tags,
        replies: 10 + index * 3,
        reposts: 7 + index * 4,
        likes: 80 + index * 29,
        views: 1300 + index * 520,
        time: `${index + 1}m`,
        feedType
      },
      index,
      feedType
    );
  });
}

function buildLocalDirectMessages(
  settings,
  profile,
  count = settings.dmCount || DEFAULT_DM_COUNT
) {
  const customTabTopics = normalizeCustomTabs(settings.customTabs || []).flatMap((tab) =>
    parseTopics(tab.text).map((topic) => `${tab.name || "自定义页签"} · ${topic}`)
  );
  const worldviewTopics = parseWorldviewFragments(settings.worldview);
  const allTopics = [...customTabTopics, ...worldviewTopics].filter(Boolean);
  const topics = allTopics.length ? allTopics : ["当前讨论"];
  const senders = [
    "内容合作者",
    "同圈观察者",
    "运营搭子",
    "匿名情报员",
    "文娱编辑",
    "品牌联络人"
  ];
  const openers = [
    "刚看到你最近的讨论，我觉得这个角度很适合继续深聊。",
    "想私下问一句，你对这件事的判断是不是已经比公开发言更靠前了？",
    "这两天这个话题在圈内发酵得很快，你的人设会很适合切进去。",
    "如果你愿意，我们可以把这条线索展开成一轮更完整的内容。"
  ];

  return Array.from({ length: count }, (_, index) =>
    normalizeDirectMessage(
      {
        sender: senders[index % senders.length],
        handle: `@dm_${index + 1}`,
        text: `${openers[index % openers.length]} 围绕“${topics[index % topics.length]}”，我第一反应就是这事挺适合直接来找${profile.username || DEFAULT_PROFILE.username}聊，你公开表达的那种判断方式和这个话题很贴。`,
        context: `${topics[index % topics.length]} · 私信`,
        time: `${index + 1}m`
      },
      index
    )
  );
}

function createAuthoredPost(
  content,
  feedType = state.activeFeed,
  tagsInput = "",
  imageDataUrl = ""
) {
  const profile = getCurrentProfile();
  const tags = normalizeTags(tagsInput, 5);
  const imageSeed = String(imageDataUrl || "").slice(0, 64);
  const post = normalizePost(
    {
      id: `profile_post_${Date.now()}_${hashText(`${content}-${imageSeed}`)}`,
      displayName: profile.username,
      handle: normalizeProfileUserId(profile.userId, profile.username),
      text: content,
      imageDataUrl,
      tags,
      replies: 0,
      reposts: 0,
      likes: 0,
      views: 1,
      time: "刚刚"
    },
    0,
    feedType
  );

  post.authorOwned = true;
  post.feedType = feedType;
  return post;
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
  const tagsInput = homeComposerTagsInput?.value.trim() || "";
  const imageDataUrl = state.homeComposerImageDataUrl || "";
  const targetFeed = getCurrentContentFeed(state.activeFeed);
  if (!content && !imageDataUrl) {
    setHomeComposerStatus("请输入帖子内容或添加图片后再发送。", "error");
    return;
  }

  const post = createAuthoredPost(content, targetFeed, tagsInput, imageDataUrl);
  state.profilePosts = [post, ...state.profilePosts];
  state.feeds[targetFeed] = [post, ...(state.feeds[targetFeed] || [])].slice(
    0,
    MAX_FEED_ITEMS
  );
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
  setHomeComposerOpen(false);
  setHomeComposerStatus("帖子已发送，并同步到个人主页。", "success");
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
    throw new Error("未配置 API 地址，已切换为本地回退生成。");
  }

  if (normalizeApiMode(settings.mode) === "openai" && !settings.model) {
    throw new Error("DeepSeek / OpenAI 兼容模式需要填写模型名称。");
  }
  if (normalizeApiMode(settings.mode) === "gemini" && !settings.token) {
    throw new Error("Gemini 模式需要填写 API Key。");
  }

  const prompt = buildPrompt(settings, resolvedFeedType, count);
  const headers = buildRequestHeaders(settings);

  const response = await fetch(requestEndpoint, {
    method: "POST",
    headers,
    body: JSON.stringify(buildRequestBody(settings, prompt, count))
  });

  if (response.status === 404 && requestEndpoint.includes("api.deepseek.com")) {
    throw new Error(
      "DeepSeek 接口返回 404。请确认地址为 https://api.deepseek.com/chat/completions，而不是 /v1/chat/completions 或仅填写域名。"
    );
  }

  if (!response.ok) {
    throw new Error(`接口请求失败：HTTP ${response.status}`);
  }

  const rawResponse = await response.text();
  let payload = rawResponse;

  try {
    payload = JSON.parse(rawResponse);
  } catch (_error) {
    payload = rawResponse;
  }

  const message = resolveMessage(payload);
  if (!message) {
    throw new Error("接口请求成功，但响应中没有可解析的文本。");
  }

  return parseGeneratedPosts(message, count, resolvedFeedType);
}

async function requestGeneratedDirectMessages(
  settings,
  profile,
  count = settings.dmCount || DEFAULT_DM_COUNT
) {
  const requestEndpoint = resolveApiRequestEndpoint(settings);
  settings.endpoint = requestEndpoint;

  if (!requestEndpoint) {
    throw new Error("未配置 API 地址，已切换为本地回退生成。");
  }
  if (normalizeApiMode(settings.mode) === "gemini" && !settings.token) {
    throw new Error("Gemini 模式需要填写 API Key。");
  }

  const prompt = buildMessagesPrompt(settings, profile, count);
  const headers = buildRequestHeaders(settings);

  const response = await fetch(requestEndpoint, {
    method: "POST",
    headers,
    body: JSON.stringify(buildRequestBody(settings, prompt, count))
  });

  if (!response.ok) {
    throw new Error(`私信请求失败：HTTP ${response.status}`);
  }

  const rawResponse = await response.text();
  let payload = rawResponse;

  try {
    payload = JSON.parse(rawResponse);
  } catch (_error) {
    payload = rawResponse;
  }

  const message = resolveMessage(payload);
  if (!message) {
    throw new Error("接口返回成功，但没有可解析的私信内容。");
  }

  const jsonText = extractJsonArray(message);
  if (!jsonText) {
    throw new Error("私信接口返回内容中没有 JSON 数组。");
  }

  const parsed = parseJsonArrayWithRepair(jsonText, "私信接口返回的 JSON 解析失败。");
  if (!Array.isArray(parsed) || !parsed.length) {
    throw new Error("接口返回的私信数据不是有效数组。");
  }

  return parsed.slice(0, count).map((item, index) => normalizeDirectMessage(item, index));
}

async function requestGeneratedConversationReply(settings, profile, conversation, userMessage) {
  const requestEndpoint = resolveApiRequestEndpoint(settings);
  settings.endpoint = requestEndpoint;

  if (!requestEndpoint) {
    throw new Error("未配置 API 地址，已切换为本地回退生成。");
  }
  if (normalizeApiMode(settings.mode) === "gemini" && !settings.token) {
    throw new Error("Gemini 模式需要填写 API Key。");
  }

  const prompt = buildConversationReplyPrompt(settings, profile, conversation, userMessage);
  const headers = buildRequestHeaders(settings);

  const response = await fetch(requestEndpoint, {
    method: "POST",
    headers,
    body: JSON.stringify(buildRequestBody(settings, prompt, 1))
  });

  if (!response.ok) {
    throw new Error(`私信回复请求失败：HTTP ${response.status}`);
  }

  const rawResponse = await response.text();
  let payload = rawResponse;

  try {
    payload = JSON.parse(rawResponse);
  } catch (_error) {
    payload = rawResponse;
  }

  const message = resolveMessage(payload);
  if (!message) {
    throw new Error("接口返回成功，但没有可解析的私信回复。");
  }

  const jsonText = extractJsonArray(message);
  if (!jsonText) {
    throw new Error("私信回复接口返回内容中没有 JSON 数组。");
  }

  const parsed = parseJsonArrayWithRepair(jsonText, "私信回复接口返回的 JSON 解析失败。");
  if (!Array.isArray(parsed) || !parsed.length) {
    throw new Error("接口返回的私信回复不是有效数组。");
  }

  return normalizeChatMessage(
    {
      role: "incoming",
      sender: conversation.sender,
      text: parsed[0]?.text || "收到，我接着跟你聊。",
      time: parsed[0]?.time || "刚刚"
    },
    conversation.sender,
    conversation.messages?.length || 0
  );
}

function buildLocalConversationReply(profile, conversation, userMessage) {
  const username = profile.username || DEFAULT_PROFILE.username;
  const persona = truncate(profile.personaPrompt || DEFAULT_PROFILE.personaPrompt, 18);
  const context = conversation.context || "当前讨论";
  return normalizeChatMessage(
    {
      role: "incoming",
      sender: conversation.sender,
      text: `你刚刚这句我收到了。围绕“${context}”继续聊的话，我会觉得这很像${username}一贯那种“${persona}”的判断方式，所以我更在意你想把这个观点往哪一步推进。`,
      time: "刚刚"
    },
    conversation.sender,
    conversation.messages?.length || 0
  );
}

async function requestGeneratedChatReplies(
  settings,
  profile,
  chatRoom,
  pendingMessages,
  count = settings.chatReplyCount || DEFAULT_CHAT_REPLY_COUNT
) {
  const requestEndpoint = resolveApiRequestEndpoint(settings);
  settings.endpoint = requestEndpoint;

  if (!requestEndpoint) {
    throw new Error("未配置 API 地址，已切换为本地回退生成。");
  }
  if (normalizeApiMode(settings.mode) === "openai" && !settings.model) {
    throw new Error("DeepSeek / OpenAI 兼容模式需要填写模型名称。");
  }
  if (normalizeApiMode(settings.mode) === "gemini" && !settings.token) {
    throw new Error("Gemini 模式需要填写 API Key。");
  }

  const prompt = buildChatRoomReplyPrompt(settings, profile, chatRoom, pendingMessages, count);
  const headers = buildRequestHeaders(settings);
  const images = pendingMessages
    .map((message) => String(message?.imageDataUrl || "").trim())
    .filter(Boolean);

  const response = await fetch(requestEndpoint, {
    method: "POST",
    headers,
    body: JSON.stringify(buildRequestBody(settings, prompt, count, { images }))
  });

  if (!response.ok) {
    throw new Error(`聊天回复请求失败：HTTP ${response.status}`);
  }

  const rawResponse = await response.text();
  let payload = rawResponse;

  try {
    payload = JSON.parse(rawResponse);
  } catch (_error) {
    payload = rawResponse;
  }

  const message = resolveMessage(payload);
  if (!message) {
    throw new Error("聊天回复接口返回为空。");
  }

  return parseGeneratedChatReplies(message, count);
}

function buildLocalChatRoomReplies(
  settings,
  profile,
  chatRoom,
  pendingMessages,
  count = settings.chatReplyCount || DEFAULT_CHAT_REPLY_COUNT
) {
  const username = profile.username || DEFAULT_PROFILE.username;
  const selectedTabs = getSelectedChatContextTabs(settings);
  const contextHint = selectedTabs[0]?.name || "";
  const recentUserText = pendingMessages
    .map((message) => String(message.text || "").trim())
    .filter(Boolean)
    .join(" / ");
  const hasImage = pendingMessages.some((message) => message.imageDataUrl);
  const focus = truncate(recentUserText || "这轮内容", 36);
  const cnLines = [
    `我超懂你这句，继续说！`,
    `支持，这个点你拿得很稳。`,
    `喜欢这个角度，继续发。`,
    hasImage ? "这张图也太有感觉了。" : `这句真的很像你会说的。`,
    `${username}这波表达很顶。`
  ];
  const jpLines = [
    "この流れ、かなり好き。",
    "その言い方、ちゃんと刺さる。",
    "応援してる、続けてほしい。",
    hasImage ? "写真の空気感もいい。" : "この一言、すごく良い。",
    "あなたの視点、やっぱり好き。"
  ];
  const krLines = [
    "이 흐름 정말 좋아요.",
    "이 포인트 완전 응원해요.",
    "계속 말해줘요, 듣고 싶어요.",
    hasImage ? "사진 분위기도 너무 좋아요." : "이 한마디가 딱이에요.",
    "역시 당신 말이라 더 믿겨요."
  ];
  const enLines = [
    "Love this take, keep going.",
    "Yep, I’m with you here.",
    "This is exactly why I follow you.",
    hasImage ? "That image really sells it." : "That line hits so well.",
    "Still fully on your side."
  ];
  const localePools = [cnLines, jpLines, krLines, enLines];
  const fanNames = [
    ["热心粉丝", "@supportive_cn"],
    ["推し勢", "@oshi_room"],
    ["응원계정", "@cheer_k"],
    ["Core Fan", "@corefan_us"]
  ];
  const roomOffset = Number.parseInt(hashText(focus || username), 36) || 0;

  return Array.from({ length: count }, (_, index) => {
    const localeIndex = (index + roomOffset) % localePools.length;
    const [displayName, handle] = fanNames[localeIndex];
    const linePool = localePools[localeIndex];
    const baseText = linePool[index % linePool.length];
    const withFocus =
      localeIndex === 0 && index % 5 === 0
        ? `${baseText}\n${truncate(contextHint || focus, 14)}`
        : baseText;
    return normalizeChatMessage(
      {
        role: "incoming",
        sender: displayName,
        handle,
        text: withFocus,
        time: `${index + 1}s`
      },
      displayName,
      index + (chatRoom?.length || 0)
    );
  });
}

function buildTranslatePrompt(sourceText) {
  return [
    "请把下面内容翻译成中文，保留原意、语气和换行，不要添加解释。",
    sourceText
  ].join("\n\n");
}

function buildTranslatePostPrompt(post) {
  return [
    "请把下面帖子翻译成中文，保留原意、语气和换行。",
    "请严格输出 JSON 数组，并且只包含 1 个对象。",
    '对象必须包含字段：text, tags。',
    "text 是翻译后的正文，tags 是翻译后的中文标签数组；每个标签都必须以 # 开头。",
    "原文正文：",
    post.text || "",
    "原文标签：",
    getRenderableTags(post, post.feedType || DEFAULT_CONTENT_FEED).join(" ")
  ].join("\n\n");
}

function buildTranslateRequestBody(settings, prompt) {
  const mode = normalizeApiMode(settings.mode);
  if (mode === "openai") {
    return {
      model: settings.model || DEFAULT_SETTINGS.model,
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
  if (normalizeApiMode(settings.mode) === "openai" && !settings.model) {
    throw new Error("DeepSeek / OpenAI 兼容模式需要填写模型名称。");
  }
  if (normalizeApiMode(settings.mode) === "gemini" && !settings.token) {
    throw new Error("Gemini 模式需要填写 API Key。");
  }

  const response = await fetch(requestEndpoint, {
    method: "POST",
    headers: buildRequestHeaders(settings),
    body: JSON.stringify(buildTranslateRequestBody(settings, buildTranslatePostPrompt(post)))
  });
  if (!response.ok) {
    throw new Error(`翻译请求失败：HTTP ${response.status}`);
  }

  const rawResponse = await response.text();
  let payload = rawResponse;
  try {
    payload = JSON.parse(rawResponse);
  } catch (_error) {
    payload = rawResponse;
  }

  const message = resolveMessage(payload);
  if (!message) {
    throw new Error("翻译请求成功，但响应为空。");
  }

  const jsonText = extractJsonArray(message);
  if (!jsonText) {
    throw new Error("翻译响应中没有可解析的 JSON 数组。");
  }

  const parsed = parseJsonArrayWithRepair(jsonText, "翻译标签 JSON 解析失败。");
  const translatedPost = Array.isArray(parsed) && parsed.length ? parsed[0] : null;
  if (!translatedPost || typeof translatedPost !== "object") {
    throw new Error("翻译响应格式不正确。");
  }

  return {
    text: normalizeTranslatedText(translatedPost.text || "", post.text || ""),
    tags: normalizeTags(translatedPost.tags || [], 5)
  };
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
  if (normalizeApiMode(settings.mode) === "openai" && !settings.model) {
    throw new Error("DeepSeek / OpenAI 兼容模式需要填写模型名称。");
  }
  if (normalizeApiMode(settings.mode) === "gemini" && !settings.token) {
    throw new Error("Gemini 模式需要填写 API Key。");
  }

  const response = await fetch(requestEndpoint, {
    method: "POST",
    headers: buildRequestHeaders(settings),
    body: JSON.stringify(buildTranslateRequestBody(settings, buildTranslatePrompt(originalText)))
  });
  if (!response.ok) {
    throw new Error(`翻译请求失败：HTTP ${response.status}`);
  }

  const rawResponse = await response.text();
  let payload = rawResponse;
  try {
    payload = JSON.parse(rawResponse);
  } catch (_error) {
    payload = rawResponse;
  }

  const message = resolveMessage(payload);
  if (!message) {
    throw new Error("翻译请求成功，但响应为空。");
  }
  return normalizeTranslatedText(message, originalText);
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

async function translateChatMessageToChinese(messageId) {
  const targetMessage = findChatMessageById(messageId);
  if (!targetMessage?.text) {
    setChatStatus("这条消息没有可翻译的文本。", "error");
    return;
  }
  if (isChatMessageTranslating(messageId)) {
    return;
  }

  setChatMessageTranslating(messageId, true);
  renderFollowingPage();

  try {
    const translatedText = await requestTranslatedText(
      getTranslationRequestSettings({ ...getCurrentSettings() }),
      targetMessage.text || ""
    );
    updateChatMessage(messageId, (message) => ({
      ...message,
      translationZh: translatedText
    }));
    setChatStatus("已生成聊天消息中文翻译。", "success");
  } catch (error) {
    setChatStatus(`聊天翻译失败：${error.message || "请求失败"}`, "error");
  } finally {
    setChatMessageTranslating(messageId, false);
    renderFollowingPage();
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
  const requestEndpoint = resolveApiRequestEndpoint(settings);
  settings.endpoint = requestEndpoint;

  if (!requestEndpoint) {
    throw new Error("未配置 API 地址，已切换为本地回退生成。");
  }
  if (normalizeApiMode(settings.mode) === "gemini" && !settings.token) {
    throw new Error("Gemini 模式需要填写 API Key。");
  }

  const prompt = buildReplyPrompt(settings, profile, feedType, rootPost, parentReply, count);
  const headers = buildRequestHeaders(settings);

  const response = await fetch(requestEndpoint, {
    method: "POST",
    headers,
    body: JSON.stringify(
      buildRequestBody(settings, prompt, count, {
        images: [rootPost?.imageDataUrl].filter(Boolean)
      })
    )
  });

  if (!response.ok) {
    throw new Error(`回复请求失败：HTTP ${response.status}`);
  }

  const rawResponse = await response.text();
  let payload = rawResponse;

  try {
    payload = JSON.parse(rawResponse);
  } catch (_error) {
    payload = rawResponse;
  }

  const message = resolveMessage(payload);
  if (!message) {
    throw new Error("接口返回成功，但没有可解析的回复内容。");
  }

  return parseGeneratedReplies(
    message,
    count,
    `${rootPost.id}-${parentReply?.id || "root"}`
  );
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
    let replies;
    const replyCount = settings.replyCount || DEFAULT_REPLY_COUNT;
    try {
      replies = await requestGeneratedReplies(
        settings,
        profile,
        post.feedType || state.activeFeed,
        post,
        null,
        replyCount
      );
    } catch (_error) {
      replies = buildLocalReplies(
        settings,
        profile,
        post.feedType || state.activeFeed,
        post,
        null,
        replyCount
      );
    }

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
  } catch (_error) {
    feedState[postId] = {
      expanded: true,
      loading: false,
      replies: []
    };
    persistDiscussions();
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
    let replies;
    try {
      replies = await requestGeneratedReplies(
        settings,
        profile,
        rootPost.feedType || state.activeFeed,
        rootPost,
        targetReply,
        NESTED_REPLY_COUNT
      );
    } catch (_error) {
      replies = buildLocalReplies(
        settings,
        profile,
        rootPost.feedType || state.activeFeed,
        rootPost,
        targetReply,
        NESTED_REPLY_COUNT
      );
    }

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
  } catch (_error) {
    targetReply.children = [];
    targetReply.loading = false;
    persistDiscussions();
    renderActiveFeed();
    renderProfilePage();
    renderThreadModal();
  }
}

async function generateDirectMessages() {
  const settings = { ...getCurrentSettings() };
  const profile = { ...getCurrentProfile() };
  const dmCount = settings.dmCount || DEFAULT_DM_COUNT;
  messagesGenerateBtn.disabled = true;
  messagesStatusEl.textContent = "正在根据当前设定生成新的私信内容…";
  messagesStatusEl.className = "status-text";

  try {
    let messages;
    let sourceLabel = "API";

    try {
      messages = await requestGeneratedDirectMessages(settings, profile, dmCount);
    } catch (error) {
      sourceLabel = "本地回退";
      messages = buildLocalDirectMessages(settings, profile, dmCount);
      messagesStatusEl.textContent = `${error.message || "请求失败"} 已自动使用本地模板生成私信。`;
      messagesStatusEl.classList.add("error");
    }

    state.directMessages = messages;
    state.activeConversationId = null;
    state.replyingConversationId = null;
    persistDirectMessages(state.directMessages);
    renderMessagesPage();
    if (sourceLabel === "API") {
      messagesStatusEl.textContent = "已使用 API 生成新的私信内容。";
      messagesStatusEl.classList.add("success");
    }
  } finally {
    messagesGenerateBtn.disabled = false;
  }
}

async function sendConversationMessage(conversationId, userMessage) {
  const trimmedMessage = String(userMessage || "").trim();
  if (!trimmedMessage) {
    messagesStatusEl.textContent = "请输入消息内容后再发送。";
    messagesStatusEl.className = "status-text error";
    return;
  }

  const conversation = state.directMessages.find((item) => item.id === conversationId);
  if (!conversation) {
    return;
  }

  const userEntry = normalizeChatMessage(
    {
      role: "user",
      text: trimmedMessage,
      time: "刚刚"
    },
    "你",
    conversation.messages?.length || 0
  );

  conversation.messages = [...(conversation.messages || []), userEntry];
  conversation.text = userEntry.text;
  conversation.time = userEntry.time;
  state.activeConversationId = conversationId;
  state.replyingConversationId = conversationId;
  persistDirectMessages(state.directMessages);
  renderMessagesPage();
  messagesStatusEl.textContent = "已发送，正在生成对方回复…";
  messagesStatusEl.className = "status-text";

  const settings = { ...getCurrentSettings() };
  const profile = { ...getCurrentProfile() };

  try {
    let replyMessage;
    try {
      replyMessage = await requestGeneratedConversationReply(
        settings,
        profile,
        conversation,
        trimmedMessage
      );
    } catch (_error) {
      replyMessage = buildLocalConversationReply(profile, conversation, trimmedMessage);
      messagesStatusEl.textContent = "接口不可用，已自动使用本地回复继续会话。";
      messagesStatusEl.className = "status-text error";
    }

    conversation.messages = [...conversation.messages, replyMessage];
    conversation.text = replyMessage.text;
    conversation.time = replyMessage.time;
    persistDirectMessages(state.directMessages);
    if (!messagesStatusEl.classList.contains("error")) {
      messagesStatusEl.textContent = "对方已回复。";
      messagesStatusEl.className = "status-text success";
    }
  } finally {
    state.replyingConversationId = null;
    renderMessagesPage();
  }
}

function delay(ms = 0) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

async function handleImageSelection(file, target) {
  if (!file) {
    if (target === "home") {
      clearHomeComposerImage();
    } else if (target === "chat") {
      clearChatComposeImage();
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
      return;
    }

    state.chatDraftImageDataUrl = dataUrl;
    renderComposerMediaPreview(chatComposeImagePreviewEl, dataUrl, "remove-chat-compose-image");
    setChatStatus("聊天图片已添加。", "success");
  } catch (_error) {
    if (target === "home") {
      setHomeComposerStatus("帖子图片读取失败，请重试。", "error");
    } else {
      setChatStatus("聊天图片读取失败，请重试。", "error");
    }
  }
}

function buildChatUserMessage(text, imageDataUrl = "") {
  const imageSeed = String(imageDataUrl || "").slice(0, 64);
  return normalizeChatMessage(
    {
      id: `chat_room_user_${Date.now()}_${hashText(`${text}-${imageSeed}`)}`,
      role: "user",
      text,
      imageDataUrl,
      time: "刚刚",
      status: "pending"
    },
    "你",
    state.chatRoom.length
  );
}

function appendChatMessages(messages = []) {
  if (!Array.isArray(messages) || !messages.length) {
    return;
  }
  state.chatRoom = [...state.chatRoom, ...messages];
  persistChatRoom(state.chatRoom);
}

async function submitChatRoomMessage() {
  if (state.chatReplying) {
    return;
  }
  const text = String(chatComposeInputEl?.value || "").trim();
  const imageDataUrl = state.chatDraftImageDataUrl || "";
  if (!text && !imageDataUrl) {
    setChatStatus("请输入消息或添加图片后再发送。", "error");
    return;
  }

  const nextMessage = buildChatUserMessage(text, imageDataUrl);
  appendChatMessages([nextMessage]);
  if (chatComposeInputEl) {
    chatComposeInputEl.value = "";
  }
  clearChatComposeImage();
  renderFollowingPage();
  setChatStatus("消息已加入待回复队列，可继续发送更多内容。", "success");
  scrollChatHistoryToBottom("smooth");
}

function markPendingChatMessagesAsSent(messageIds = []) {
  const idSet = new Set(messageIds);
  state.chatRoom = state.chatRoom.map((message) =>
    idSet.has(message.id)
      ? {
          ...message,
          status: "sent"
        }
      : message
  );
  persistChatRoom(state.chatRoom);
}

function getChatReplyFocusMessages() {
  const pendingMessages = state.chatRoom.filter(
    (message) => message.role === "user" && message.status === "pending"
  );
  if (pendingMessages.length) {
    return {
      messages: pendingMessages,
      hasFreshMessages: true
    };
  }

  const historicalUserMessages = state.chatRoom
    .filter((message) => message.role === "user")
    .slice(-6);
  return {
    messages: historicalUserMessages,
    hasFreshMessages: false
  };
}

async function appendChatRepliesGradually(replies = []) {
  for (let index = 0; index < replies.length; index += 1) {
    const reply = replies[index];
    appendChatMessages([reply]);
    renderFollowingPage();
    scrollChatHistoryToBottom("smooth");
    if (index < replies.length - 1) {
      await delay(CHAT_REPLY_APPEND_INTERVAL_MS);
    }
  }
}

async function generateChatRoomReplies() {
  if (state.chatReplying) {
    return;
  }
  const { messages: focusMessages, hasFreshMessages } = getChatReplyFocusMessages();
  if (!focusMessages.length) {
    setChatStatus("先发送至少一条用户消息，再获取回复。", "error");
    renderFollowingPage();
    return;
  }

  state.chatReplying = true;
  renderFollowingPage();
  const settings = { ...getCurrentSettings() };
  const profile = { ...getCurrentProfile() };
  const replyCount = settings.chatReplyCount || DEFAULT_CHAT_REPLY_COUNT;
  setChatStatus(
    hasFreshMessages
      ? `正在获取 ${replyCount} 条粉丝回复…`
      : `正在围绕之前的消息继续获取 ${replyCount} 条粉丝回复…`,
    ""
  );

  try {
    let replies;
    let usedFallback = false;
    try {
      replies = await requestGeneratedChatReplies(
        settings,
        profile,
        state.chatRoom,
        focusMessages,
        replyCount
      );
    } catch (_error) {
      usedFallback = true;
      replies = buildLocalChatRoomReplies(
        settings,
        profile,
        state.chatRoom,
        focusMessages,
        replyCount
      );
    }

    if (hasFreshMessages) {
      markPendingChatMessagesAsSent(focusMessages.map((message) => message.id));
    }
    renderFollowingPage();
    await appendChatRepliesGradually(replies);
    setChatStatus(
      usedFallback
        ? `接口不可用，已本地生成 ${replies.length} 条粉丝回复。`
        : `已收到 ${replies.length} 条粉丝回复。`,
      usedFallback ? "error" : "success"
    );
  } finally {
    state.chatReplying = false;
    renderFollowingPage();
  }
}

function clearChatRoom() {
  if (!state.chatRoom.length) {
    return;
  }
  const confirmed = window.confirm("确定清空当前聊天记录吗？");
  if (!confirmed) {
    return;
  }
  state.chatRoom = [];
  persistChatRoom(state.chatRoom);
  if (chatComposeInputEl) {
    chatComposeInputEl.value = "";
  }
  clearChatComposeImage();
  renderFollowingPage();
  setChatStatus("聊天记录已清空。", "success");
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
    const normalizedIncomingPosts = ensureDistinctGeneratedPosts(
      posts.map((item, index) => normalizePost(item, index, targetFeed)),
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
    localStorage.setItem(REFRESH_KEY, state.lastRefreshAt);
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
  const atTop = feedEl.scrollTop <= 1;
  if (!canRefreshCurrentHomeFeed() || !atTop || state.isRefreshing) {
    return;
  }
  state.touchTracking = true;
  state.touchStartY = event.touches[0].clientY;
}

function handleTouchMove(event) {
  if (!state.touchTracking || !canRefreshCurrentHomeFeed() || state.isRefreshing) {
    return;
  }

  const delta = event.touches[0].clientY - state.touchStartY;
  if (delta <= 0 || feedEl.scrollTop > 1) {
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
  releasePull();
}

function handleWheel(event) {
  const atTop = feedEl.scrollTop <= 1;
  const topStableLongEnough = Date.now() - state.feedTopAnchorAt > 160;
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

  if (messagesGenerateBtn) {
    messagesGenerateBtn.addEventListener("click", () => {
      generateDirectMessages();
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

  if (chatComposeFormEl) {
    chatComposeFormEl.addEventListener("submit", async (event) => {
      event.preventDefault();
      await submitChatRoomMessage();
    });
  }

  if (chatComposeImageInputEl) {
    chatComposeImageInputEl.addEventListener("change", async () => {
      const [file] = chatComposeImageInputEl.files || [];
      await handleImageSelection(file, "chat");
    });
  }

  if (chatComposeImagePreviewEl) {
    chatComposeImagePreviewEl.addEventListener("click", (event) => {
      const target = getEventHTMLElement(event);
      if (!target) {
        return;
      }
      const actionEl = target.closest("[data-action]");
      if (!(actionEl instanceof HTMLElement)) {
        return;
      }
      if (actionEl.dataset.action === "remove-chat-compose-image") {
        clearChatComposeImage();
        setChatStatus("已移除聊天图片。", "");
      }
    });
  }

  if (chatGenerateBtnEl) {
    chatGenerateBtnEl.addEventListener("click", async () => {
      await generateChatRoomReplies();
    });
  }

  if (chatClearBtnEl) {
    chatClearBtnEl.addEventListener("click", () => {
      clearChatRoom();
    });
  }

  if (chatContextTriggerBtnEl) {
    chatContextTriggerBtnEl.addEventListener("click", () => {
      setChatContextModalOpen(true);
    });
  }

  if (chatHistoryEl) {
    chatHistoryEl.addEventListener("click", async (event) => {
      const target = getEventHTMLElement(event);
      if (!target) {
        return;
      }
      const actionEl = target.closest("[data-action]");
      if (!(actionEl instanceof HTMLElement)) {
        return;
      }
      if (
        actionEl.dataset.action === "translate-chat-message" &&
        actionEl.dataset.messageId
      ) {
        await translateChatMessageToChinese(actionEl.dataset.messageId);
      }
    });
  }

  if (chatContextModalListEl) {
    chatContextModalListEl.addEventListener("change", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLInputElement) || target.type !== "checkbox") {
        return;
      }
      const tabId = target.dataset.tabId || "";
      if (!tabId) {
        return;
      }
      toggleChatContextDraftTab(tabId, target.checked);
    });
  }

  if (chatContextModalEl) {
    chatContextModalEl.addEventListener("click", (event) => {
      const target = getEventHTMLElement(event);
      if (!target) {
        return;
      }
      const actionEl = target.closest("[data-action]");
      if (!(actionEl instanceof HTMLElement)) {
        return;
      }
      if (actionEl.dataset.action === "close-chat-context-modal") {
        setChatContextModalOpen(false);
      }
    });
  }

  if (chatContextModalCloseBtnEl) {
    chatContextModalCloseBtnEl.addEventListener("click", () => {
      setChatContextModalOpen(false);
    });
  }

  if (chatContextModalCancelBtnEl) {
    chatContextModalCancelBtnEl.addEventListener("click", () => {
      setChatContextModalOpen(false);
    });
  }

  if (chatContextModalConfirmBtnEl) {
    chatContextModalConfirmBtnEl.addEventListener("click", () => {
      applyChatContextDraftSelection();
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
      const nextOpen = !state.customTabEditorOpen;
      setCustomTabsPanelOpen(nextOpen);
      if (nextOpen) {
        resetCustomTabForm();
      }
    });
  }

  if (customTabsCloseBtn) {
    customTabsCloseBtn.addEventListener("click", () => {
      setCustomTabsPanelOpen(false);
    });
  }

  if (customTabCancelBtn) {
    customTabCancelBtn.addEventListener("click", () => {
      resetCustomTabForm();
    });
  }

  if (customTabForm) {
    customTabForm.addEventListener("submit", (event) => {
      event.preventDefault();
      handleCustomTabFormSubmit();
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

  if (customTabSettingsListEl) {
    customTabSettingsListEl.addEventListener("input", (event) => {
      handleCustomTabSettingsInput(event);
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

      if (action === "open-thread-modal" && actionEl.dataset.postId) {
        await openThreadModal(
          actionEl.dataset.postId,
          actionEl.dataset.bucket || state.activeFeed
        );
      }
    });

    feedEl.addEventListener("scroll", () => {
      if (feedEl.scrollTop <= 1) {
        if (!state.feedTopAnchorAt) {
          state.feedTopAnchorAt = Date.now();
        }
        return;
      }

      state.feedTopAnchorAt = 0;
      if (state.pullDistance > 0 && !state.isRefreshing) {
        state.pullDistance = 0;
        setPullIndicator(0, "idle");
      }
    });
  }

  if (messagesListEl) {
    messagesListEl.addEventListener("click", (event) => {
      const target = getEventHTMLElement(event);
      if (!target) {
        return;
      }

      const actionEl = target.closest("[data-action]");
      if (!(actionEl instanceof HTMLElement)) {
        return;
      }

      if (actionEl.dataset.action === "open-conversation" && actionEl.dataset.conversationId) {
        state.activeConversationId = actionEl.dataset.conversationId;
        renderMessagesPage();
        return;
      }

      if (actionEl.dataset.action === "close-conversation") {
        state.activeConversationId = null;
        renderMessagesPage();
      }
    });

    messagesListEl.addEventListener("submit", async (event) => {
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
      const conversationId = target.dataset.conversationId;
      if (!conversationId) {
        return;
      }

      target.reset();
      await sendConversationMessage(conversationId, message);
    });
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
    if (event.key === "Escape" && state.chatContextModalOpen) {
      setChatContextModalOpen(false);
      return;
    }
    if (event.key === "Escape" && state.threadModalOpen) {
      setThreadModalOpen(false);
    }
  });

  const apiFields = [modeSelect, endpointInput, tokenInput, modelInput];
  [modeSelect, endpointInput, tokenInput, modelInput, temperatureInput, homeCountInput, dmCountInput, replyCountInput, chatReplyCountInput, worldviewInput]
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
        updateMessagePromptPreview();
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
        renderFollowingPage();
        renderProfilePage();
        updateMessagePromptPreview();
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

  if (feedEl) {
    feedEl.addEventListener("touchstart", handleTouchStart, { passive: true });
    feedEl.addEventListener("touchmove", handleTouchMove, { passive: false });
    feedEl.addEventListener("touchend", handleTouchEnd);
    feedEl.addEventListener("wheel", handleWheel, { passive: false });
  }
}

function init() {
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
  safeRun("chat context modal", () => setChatContextModalOpen(false));
  safeRun("pull indicator", () => setPullIndicator(0, "idle"));
  safeRun("render active feed", () => renderActiveFeed());
  safeRun("render following", () => renderFollowingPage());
  safeRun("render messages", () => renderMessagesPage());
  safeRun("render profile", () => renderProfilePage());
  safeRun("render custom tabs manager", () => renderCustomTabsManager());
  safeRun("custom tabs manage button", () => updateCustomTabsManageButton());
  safeRun("render custom tabs settings", () => renderCustomTabSettings());
  safeRun("render api config list", () => renderApiConfigList());
  safeRun("persist discussions", () => persistDiscussions());
  safeRun("update prompt preview", () => updatePromptPreview());
  safeRun("update dm prompt preview", () => updateMessagePromptPreview());
  safeRun("update reply prompt preview", () => updateReplyPromptPreview());
  safeRun("update insight panel", () => updateInsightPanel());
  safeRun("set home status", () =>
    setHomeStatus(
      state.lastRefreshAt ? `已载入上次生成内容 · ${state.lastRefreshAt}` : "等待下一次刷新",
      state.lastRefreshAt ? "success" : ""
    )
  );
  safeRun("set settings status", () =>
    setSettingsStatus("设置页会自动保存内容生成配置；API 参数请在下方独立管理。")
  );
  safeRun("set api status", () => setApiConfigStatus("可保存多套 API 配置，并在下方一键切换。"));
  safeRun("switch initial tab", () => switchTab(getInitialTabFromLocation()));
  safeRun("attach events", () => attachEvents());
  window.__appBootstrap.ready = true;
}

init();
