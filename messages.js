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
const BUBBLE_THREADS_KEY = "x_style_generator_bubble_threads_v1";
const DEFAULT_TEMPERATURE = 0.85;
const DEFAULT_MESSAGE_HISTORY_ROUNDS = 6;
const MAX_MESSAGE_HISTORY_ROUNDS = 20;
const DEFAULT_WORLDVIEW =
  "这是一个强调长期主义、产品洞察和公共讨论质量的中文社交世界。用户习惯像在 X 上一样快速表达观点，但会天然追问效率、增长、AI 和平台变迁。整体语气要真实、犀利、能引发跟帖，不要写成官方通稿。";

const DEFAULT_SETTINGS = {
  mode: "openai",
  endpoint: DEFAULT_OPENAI_ENDPOINT,
  token: "",
  model: DEFAULT_DEEPSEEK_MODEL,
  apiConfigs: [],
  activeApiConfigId: "",
  worldview: DEFAULT_WORLDVIEW,
  messagePromptSettings: {
    historyRounds: DEFAULT_MESSAGE_HISTORY_ROUNDS,
    timeAwareness: false,
    hotTopicsEnabled: false,
    hotTopicsTabId: "",
    forumPostFocusEnabled: false,
    bubbleFocusEnabled: false
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
    { id: "worldbook", label: "世界书", icon: "cube" },
    { id: "favorites", label: "收藏", icon: "star" },
    { id: "moments", label: "朋友圈", icon: "image" },
    { id: "emoji", label: "表情", icon: "smile" }
  ],
  [{ id: "settings", label: "设置", icon: "gear" }]
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
const messagesChatTimeAwarenessInputEl = document.querySelector(
  "#messages-chat-time-awareness-input"
);
const messagesChatHotTopicsInputEl = document.querySelector("#messages-chat-hot-topics-input");
const messagesChatHotTopicsTabSelectEl = document.querySelector(
  "#messages-chat-hot-topics-tab-select"
);
const messagesChatProfilePostFocusInputEl = document.querySelector(
  "#messages-chat-profile-post-focus-input"
);
const messagesChatBubbleFocusInputEl = document.querySelector(
  "#messages-chat-bubble-focus-input"
);
const messagesChatSettingsStatusEl = document.querySelector("#messages-chat-settings-status");

const memoryStorage = {};

const state = {
  profile: loadProfile(),
  contacts: loadContacts(),
  conversations: loadConversations(),
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
  sendingConversationId: ""
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

function safeGetItem(key) {
  try {
    return window.localStorage.getItem(key);
  } catch (_error) {
    return Object.prototype.hasOwnProperty.call(memoryStorage, key) ? memoryStorage[key] : null;
  }
}

function safeSetItem(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch (_error) {
    memoryStorage[key] = value;
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
    timeAwareness:
      typeof resolved.timeAwareness === "boolean"
        ? resolved.timeAwareness
        : legacyEventAwareness,
    hotTopicsEnabled: Boolean(resolved.hotTopicsEnabled),
    hotTopicsTabId: String(resolved.hotTopicsTabId || "").trim(),
    forumPostFocusEnabled: Boolean(resolved.forumPostFocusEnabled),
    bubbleFocusEnabled: Boolean(resolved.bubbleFocusEnabled)
  };
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
    return {
      ...DEFAULT_PROFILE,
      ...JSON.parse(raw)
    };
  } catch (_error) {
    return { ...DEFAULT_PROFILE };
  }
}

function persistProfile(profile) {
  safeSetItem(PROFILE_KEY, JSON.stringify(profile));
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

function normalizeConversationMessage(message, index = 0) {
  const role = message?.role === "assistant" ? "assistant" : "user";
  const text = String(message?.text || "").trim();
  return {
    id: String(message?.id || `conversation_message_${Date.now()}_${index}`),
    role,
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

function persistConversations() {
  safeSetItem(MESSAGE_THREADS_KEY, JSON.stringify(state.conversations));
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
  return latestMessage ? truncate(latestMessage.text, 46) : "";
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
    .filter(Boolean);
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

function buildHotTopicsContext(settings, promptSettings) {
  if (!promptSettings.hotTopicsEnabled || !promptSettings.hotTopicsTabId) {
    return "";
  }

  const tabs = getAvailableCustomTabs(settings);
  const selectedTab = tabs.find((tab) => tab.id === promptSettings.hotTopicsTabId) || null;
  if (!selectedTab) {
    return "";
  }

  const feeds = readStoredJson(POSTS_KEY, {});
  const bucket = Array.isArray(feeds?.[selectedTab.id]) ? feeds[selectedTab.id] : [];
  const items = extractRecentEventItems(bucket, 4);
  if (items.length) {
    return `近期热点来自论坛自定义页签「${selectedTab.name}」：\n${items
      .map((item, index) => `${index + 1}. ${item}`)
      .join("\n")}`;
  }

  const tabIntro = String(selectedTab.text || "").trim();
  if (tabIntro) {
    return `论坛热点挂载页签：${selectedTab.name}。该页签当前设定为：${truncate(tabIntro, 180)}`;
  }

  return "";
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

function buildConversationSystemPrompt(profile, contact, settings, promptSettings) {
  const parts = [
    `你正在扮演一个即时聊天应用中的联系人：${contact.name}。`,
    `你的角色人设：${contact.personaPrompt || "自然、友好、会根据设定稳定回应。"}。`,
    `正在和你聊天的用户昵称：${profile.username || DEFAULT_PROFILE.username}。`,
    `用户的人设设定：${profile.personaPrompt || DEFAULT_PROFILE.personaPrompt}。`,
    "这是一个一对一聊天场景。",
    "请只输出联系人下一条回复，不要添加角色标签、前缀、旁白或解释。",
    "回复要像真实聊天，简洁自然，可以带情绪，但不要超过4句话。",
    "如果一句话里自然出现逗号或句号，请按分句拆成多行输出。",
    "每一行都会被视为一条单独发出的聊天消息。",
    "每一行结尾若原本是逗号或句号，请去掉这一枚逗号或句号。",
    "不要去掉感叹号、问号、波浪号、省略号等表达情绪的标点。",
    "不要输出编号、列表符号、引号包裹、解释说明或舞台指令。"
  ];

  const awarenessSections = [
    buildTimeAwarenessContext(promptSettings),
    buildHotTopicsContext(settings, promptSettings),
    buildForumPostFocusContext(promptSettings),
    buildBubbleFocusContext(promptSettings)
  ].filter(Boolean);

  if (awarenessSections.length) {
    parts.push(
      `补充语境信息（仅用于感知语气与背景，不要机械复述）：\n${awarenessSections.join("\n\n")}`
    );
  }

  return parts.join("\n\n");
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
          content: message.text
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
        parts: [{ text: message.text }]
      })),
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

function selectConversationHistory(messages = [], historyRounds = DEFAULT_MESSAGE_HISTORY_ROUNDS) {
  const limit = normalizeMessagePromptSettings({ historyRounds }).historyRounds;
  const selected = [];
  let userTurnCount = 0;

  for (let index = messages.length - 1; index >= 0; index -= 1) {
    const message = messages[index];
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

async function requestChatReplyText(settings, profile, contact, history = [], promptSettings = {}) {
  const requestEndpoint = validateApiSettings(settings, "对话回复");
  const normalizedPromptSettings = normalizeMessagePromptSettings(promptSettings);
  const systemPrompt = buildConversationSystemPrompt(
    profile,
    contact,
    settings,
    normalizedPromptSettings
  );
  const requestBody = buildChatRequestBody(settings, systemPrompt, history);
  const logBase = buildMessageApiLogBase(
    "chat_reply",
    settings,
    requestEndpoint,
    systemPrompt,
    requestBody,
    `联系人：${contact.name} · 历史消息 ${history.length} 条`
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
      appendApiLog({
        ...logBase,
        status: "error",
        statusCode: response.status,
        responseText: rawResponse,
        responseBody: payload,
        errorMessage: "接口请求成功，但响应中没有可解析的文本。"
      });
      logged = true;
      throw new Error("接口请求成功，但响应中没有可解析的文本。");
    }

    appendApiLog({
      ...logBase,
      status: "success",
      statusCode: response.status,
      responseText: rawResponse,
      responseBody: payload,
      summary: `联系人：${contact.name} · 已生成 ${splitReplyIntoMessageLines(message).length || 1} 条分句`
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
    state.chatSettingsOpen;
  document.body.classList.toggle("messages-modal-open", anyModalOpen);
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
            <article
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
            </article>
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
  messagesContentEl.innerHTML = `
    <section class="messages-conversation">
      <div class="messages-conversation__history">
        ${
          conversation.messages.length
            ? conversation.messages
                .map(
                  (message) => `
                    <article class="messages-bubble ${message.role === "user" ? "messages-bubble--user" : ""}">
                      <p>${escapeHtml(message.text)}</p>
                      <span class="messages-bubble__time">${escapeHtml(message.time)}</span>
                    </article>
                  `
                )
                .join("")
            : '<div class="messages-conversation__empty">输入第一条消息，开始和这个角色聊天。</div>'
        }
      </div>
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
      </form>
    </section>
  `;

  const historyEl = messagesContentEl.querySelector(".messages-conversation__history");
  if (historyEl) {
    historyEl.scrollTop = historyEl.scrollHeight;
  }
}

function buildContactIcon(icon) {
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
    personaPrompt: ""
  };
  state.contactEditorAvatarImage = String(resolvedContact.avatarImage || "").trim();
  if (messagesContactNameInputEl) {
    messagesContactNameInputEl.value = resolvedContact.name || "";
  }
  if (messagesContactPersonaInputEl) {
    messagesContactPersonaInputEl.value = resolvedContact.personaPrompt || "";
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

function focusConversationInput() {
  const input = messagesContentEl?.querySelector(".messages-conversation__input");
  input?.focus();
}

function applyChatPromptSettingsToForm(promptSettings) {
  const resolved = normalizeMessagePromptSettings(promptSettings);
  if (messagesChatHistoryRoundsInputEl) {
    messagesChatHistoryRoundsInputEl.value = String(resolved.historyRounds);
  }
  if (messagesChatTimeAwarenessInputEl) {
    messagesChatTimeAwarenessInputEl.checked = resolved.timeAwareness;
  }
  if (messagesChatHotTopicsInputEl) {
    messagesChatHotTopicsInputEl.checked = resolved.hotTopicsEnabled;
  }
  if (messagesChatProfilePostFocusInputEl) {
    messagesChatProfilePostFocusInputEl.checked = resolved.forumPostFocusEnabled;
  }
  if (messagesChatBubbleFocusInputEl) {
    messagesChatBubbleFocusInputEl.checked = resolved.bubbleFocusEnabled;
  }
  renderHotTopicsTabOptions(resolved.hotTopicsTabId);
  updateChatSettingsFormState();
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
}

function getCurrentChatPromptSettingsDraft() {
  const tabs = getAvailableCustomTabs(loadSettings());
  const selectedTabId = String(messagesChatHotTopicsTabSelectEl?.value || "").trim();
  return normalizeMessagePromptSettings({
    historyRounds: messagesChatHistoryRoundsInputEl?.value,
    timeAwareness: Boolean(messagesChatTimeAwarenessInputEl?.checked),
    hotTopicsEnabled: Boolean(messagesChatHotTopicsInputEl?.checked),
    hotTopicsTabId: tabs.some((tab) => tab.id === selectedTabId) ? selectedTabId : "",
    forumPostFocusEnabled: Boolean(messagesChatProfilePostFocusInputEl?.checked),
    bubbleFocusEnabled: Boolean(messagesChatBubbleFocusInputEl?.checked)
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
  focusConversationInput();
  setMessagesStatus("消息已加入对话，点击右侧圆标向 API 请求回复。", "success");
}

async function requestConversationReply() {
  const conversation = getConversationById();
  if (!conversation) {
    return;
  }

  if (state.sendingConversationId === conversation.id) {
    return;
  }

  const contact = getContactById(conversation.contactId);
  if (!contact) {
    setMessagesStatus("未找到对应联系人，请先去通讯录检查人物信息。", "error");
    return;
  }

  const pendingUserMessages = conversation.messages.filter(
    (message) => message.role === "user" && message.needsReply
  );
  if (!pendingUserMessages.length) {
    setMessagesStatus("当前没有待推送到 API 的新消息。");
    return;
  }

  const settings = loadSettings();
  const promptSettings = normalizeMessagePromptSettings(settings.messagePromptSettings);
  state.chatPromptSettings = promptSettings;
  const history = selectConversationHistory(conversation.messages, promptSettings.historyRounds);

  state.sendingConversationId = conversation.id;
  renderMessagesPage();
  setMessagesStatus("正在等待对方回复…");

  try {
    const replyText = await requestChatReplyText(
      settings,
      state.profile,
      contact,
      history,
      promptSettings
    );
    const updatedConversation = getConversationById(conversation.id);
    if (!updatedConversation) {
      return;
    }
    updatedConversation.messages = updatedConversation.messages.map((message) =>
      message.role === "user" && message.needsReply ? { ...message, needsReply: false } : message
    );

    const replyLines = splitReplyIntoMessageLines(replyText);
    const now = Date.now();
    const timeLabel = formatLocalTime();
    const createdMessages = [];

    for (let index = 0; index < replyLines.length; index += 1) {
      await sleep(index === 0 ? 640 : 460);
      const line = replyLines[index];
      const replyMessage = normalizeConversationMessage(
        {
          id: `message_${now}_${index}_${hashText(line)}`,
          role: "assistant",
          text: line,
          time: timeLabel,
          createdAt: now + index
        },
        updatedConversation.messages.length + index
      );
      updatedConversation.messages = [...updatedConversation.messages, replyMessage];
      updatedConversation.updatedAt = replyMessage.createdAt;
      createdMessages.push(replyMessage);
      persistConversations();
      renderMessagesPage();
    }

    setMessagesStatus(
      createdMessages.length > 1 ? `已收到 ${createdMessages.length} 条分句回复。` : "已收到回复。",
      "success"
    );
  } catch (error) {
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
  state.chatPromptSettings = normalizeMessagePromptSettings(loadSettings().messagePromptSettings);
}

function attachEvents() {
  if (messagesNavBtnEl) {
    messagesNavBtnEl.addEventListener("click", () => {
      if (state.activeConversationId && state.activeTab === "chat") {
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
      if (!(actionEl instanceof Element)) {
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
        state.profileEditorAvatarImage = await readFileAsDataUrl(file);
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
        state.contactEditorAvatarImage = await readFileAsDataUrl(file);
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
      const nextSettings = loadSettings();
      nextSettings.messagePromptSettings = draft;
      persistSettings(nextSettings);
      state.chatPromptSettings = draft;
      setEditorStatus(messagesChatSettingsStatusEl, "对话回复设置已保存。", "success");
      setMessagesStatus("对话 prompt 设置已更新。", "success");
      window.setTimeout(() => {
        setChatSettingsOpen(false);
      }, 220);
    });
  }

  if (messagesChatHotTopicsInputEl) {
    messagesChatHotTopicsInputEl.addEventListener("change", () => {
      updateChatSettingsFormState();
      setEditorStatus(messagesChatSettingsStatusEl);
    });
  }

  [messagesProfileModalEl, messagesContactModalEl, messagesPickerModalEl]
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

  window.addEventListener("focus", () => {
    if (
      state.profileEditorOpen ||
      state.contactEditorOpen ||
      state.conversationPickerOpen ||
      state.chatSettingsOpen
    ) {
      return;
    }
    refreshStateFromStorage();
    renderMessagesPage();
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
    if (event.key === "Escape" && state.activeConversationId) {
      state.activeConversationId = "";
      renderMessagesPage();
    }
  });
}

function init() {
  if (document.body) {
    document.body.classList.toggle("embedded", isEmbeddedView());
  }
  persistConversations();
  renderMessagesPage();
  attachEvents();
}

init();
