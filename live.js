const DEFAULT_OPENAI_ENDPOINT = "https://api.deepseek.com/chat/completions";
const DEFAULT_GROK_ENDPOINT = "https://api.x.ai/v1/chat/completions";
const DEFAULT_GEMINI_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta";
const DEFAULT_DEEPSEEK_MODEL = "deepseek-chat";
const DEFAULT_GROK_MODEL = "grok-4";
const DEFAULT_GEMINI_MODEL = "gemini-2.0-flash";
const DEFAULT_TEMPERATURE = 0.85;
const DEFAULT_LIVE_AUTO_REPLY_INTERVAL_SECONDS = 30;
const LOCAL_STORAGE_API_BASE_URL = "http://localhost:3000";
const DEPLOYED_STORAGE_API_BASE_URL = "https://spring-field-3219.fly.dev";
const PROFILE_KEY = "x_style_generator_profile_v1";
const SETTINGS_KEY = "x_style_generator_settings_v2";
const MESSAGE_CONTACTS_KEY = "x_style_generator_message_contacts_v1";
const MESSAGE_THREADS_KEY = "x_style_generator_message_threads_v1";
const MESSAGE_MEMORIES_KEY = "x_style_generator_message_memories_v1";
const WORLD_BOOKS_KEY = "x_style_generator_message_worldbooks_v1";
const LIVE_ENTRY_CONFIG_KEY = "x_style_generator_live_entry_config_v1";
const DEFAULT_CORE_MEMORY_THRESHOLD = 80;
const DEFAULT_SCENE_MEMORY_THRESHOLD = 65;
const memoryStorage = {};

const DEFAULT_PROFILE = {
  avatar: "WG",
  username: "Worldview Generator",
  userId: "@worldview_lab",
  avatarImage: "",
  followers: "8.6K",
  signature: "",
  personaPrompt: ""
};

const liveCloseBtnEl = document.querySelector("#live-close-btn");
const liveHostAvatarEl = document.querySelector("#live-host-avatar");
const liveHostNameEl = document.querySelector("#live-host-name");
const liveHostIdEl = document.querySelector("#live-host-id");
const liveViewerCountEl = document.querySelector("#live-viewer-count");
const liveCaptionKickerEl = document.querySelector("#live-caption-kicker");
const liveCaptionTitleEl = document.querySelector("#live-caption-title");
const liveCaptionMetaEl = document.querySelector("#live-caption-meta");
const liveCaptionHintEl = document.querySelector("#live-caption-hint");
const liveBulletLayerEl = document.querySelector("#live-bullet-layer");
const liveHostUpdateCardEl = document.querySelector("#live-host-update-card");
const liveHostUpdateTextEl = document.querySelector("#live-host-update-text");
const liveRoleToolsEl = document.querySelector("#live-role-tools");
const liveAnonymousToggleEl = document.querySelector("#live-anonymous-toggle");
const liveGuideBtnEl = document.querySelector("#live-guide-btn");
const liveComposerFormEl = document.querySelector("#live-composer-form");
const liveComposerInputEl = document.querySelector("#live-composer-input");
const liveSummaryModalEl = document.querySelector("#live-summary-modal");
const liveSummaryCloseBtnEl = document.querySelector("#live-summary-close-btn");
const liveSummaryTabSelectEl = document.querySelector("#live-summary-tab-select");
const liveSummaryControversyEl = document.querySelector("#live-summary-controversy");
const liveSummaryStatusEl = document.querySelector("#live-summary-status");
const liveSummaryDirectEndBtnEl = document.querySelector("#live-summary-direct-end-btn");
const liveSummaryGenerateBtnEl = document.querySelector("#live-summary-generate-btn");
const liveGuideModalEl = document.querySelector("#live-guide-modal");
const liveGuideCloseBtnEl = document.querySelector("#live-guide-close-btn");
const liveGuideTextEl = document.querySelector("#live-guide-text");
const liveGuideEmotionEl = document.querySelector("#live-guide-emotion");
const liveGuideStatusEl = document.querySelector("#live-guide-status");
const liveGuideCancelBtnEl = document.querySelector("#live-guide-cancel-btn");
const liveGuideFansBtnEl = document.querySelector("#live-guide-fans-btn");
const liveGuideRoleBtnEl = document.querySelector("#live-guide-role-btn");

const state = {
  profile: null,
  settings: null,
  contacts: [],
  hostContact: null,
  liveEntryConfig: null,
  liveMessages: [],
  sessionMessages: [],
  queuedRequests: [],
  apiPending: false,
  summaryPending: false,
  summaryModalOpen: false,
  guideModalOpen: false,
  nextStage: "role",
  currentHostCard: "",
  anonymousViewerId: "",
  anonymousMode: true,
  pendingRoleGuide: null,
  pendingFanGuide: null,
  bulletTimer: 0,
  bulletSeedTimers: [],
  viewerTimer: 0,
  autoReplyTimer: 0,
  viewers: 0,
  bulletSeq: 0,
  apiViewerCommentPool: [],
  apiViewerCommentQueue: [],
  apiCommentBatchSeq: 0,
  apiCommentRecycleIndex: 0
};

const LIVE_BULLET_LIMIT = 8;
const LIVE_BULLET_LIFETIME_MS = 14000;
const LIVE_BULLET_INTERVAL_MS = 2600;
const LIVE_HISTORY_LIMIT = 32;
const LIVE_SESSION_HISTORY_LIMIT = 140;
const LIVE_API_COMMENT_POOL_LIMIT = 120;

function isEmbeddedView() {
  try {
    return new URLSearchParams(window.location.search).get("embed") === "1";
  } catch (_error) {
    return false;
  }
}

function requestEmbeddedClose() {
  if (!isEmbeddedView()) {
    window.location.href = "./index.html";
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

function safeTrim(value = "") {
  return String(value || "").trim();
}

function normalizePositiveInteger(value, fallback = 0) {
  const parsed = Number.parseInt(String(value ?? fallback), 10);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return fallback;
  }
  return parsed;
}

function clampNumber(value, min, max) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) {
    return min;
  }
  return Math.min(max, Math.max(min, numeric));
}

function hashText(value) {
  const text = String(value || "");
  let hash = 0;
  for (let index = 0; index < text.length; index += 1) {
    hash = (hash * 31 + text.charCodeAt(index)) >>> 0;
  }
  return hash.toString(36);
}

function normalizeApiMode(mode) {
  return mode === "gemini" || mode === "generic" || mode === "grok" ? mode : "openai";
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
  return safeTrim(token);
}

function normalizeTemperature(value, fallback = DEFAULT_TEMPERATURE) {
  const parsed = Number.parseFloat(value);
  if (!Number.isFinite(parsed)) {
    return fallback;
  }
  return Math.min(2, Math.max(0, parsed));
}

function normalizeLiveAutoReplyIntervalSeconds(
  value,
  fallback = DEFAULT_LIVE_AUTO_REPLY_INTERVAL_SECONDS
) {
  const parsed = Number.parseInt(String(value ?? fallback), 10);
  if (!Number.isFinite(parsed)) {
    return fallback;
  }
  return Math.min(300, Math.max(10, parsed));
}

function normalizeOpenAICompatibleEndpoint(endpoint) {
  const trimmed = safeTrim(endpoint);
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
  const trimmed = safeTrim(endpoint);
  if (!trimmed) {
    return DEFAULT_GEMINI_ENDPOINT;
  }
  return trimmed.replace(/\/+$/, "");
}

function normalizeGrokEndpoint(endpoint) {
  const trimmed = safeTrim(endpoint);
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
  return safeTrim(endpoint);
}

function resolveGeminiGenerateEndpoint(endpoint, model) {
  const normalizedEndpoint = normalizeGeminiEndpoint(endpoint);
  const normalizedModel = safeTrim(model || DEFAULT_GEMINI_MODEL) || DEFAULT_GEMINI_MODEL;
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
  return safeTrim(settings.endpoint);
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
        name: safeTrim(item.name || fallbackName).slice(0, 20) || fallbackName,
        mode,
        endpoint: normalizeSettingsEndpointByMode(mode, item.endpoint || ""),
        token: normalizeApiConfigToken(item.token),
        model:
          mode === "generic"
            ? ""
            : safeTrim(item.model || getDefaultModelByMode(mode)) || getDefaultModelByMode(mode),
        temperature: normalizeTemperature(item.temperature, DEFAULT_TEMPERATURE),
        updatedAt: Number(item.updatedAt) || Date.now()
      };
    });
}

function normalizeNegativePromptConstraints(value) {
  const lines = Array.isArray(value)
    ? value
    : typeof value === "string"
      ? value.split(/\r?\n/g)
      : [];
  const unique = new Set();
  return lines
    .map((item) => safeTrim(item))
    .filter((item) => {
      if (!item || unique.has(item)) {
        return false;
      }
      unique.add(item);
      return true;
    });
}

function buildNormalizedSettingsSnapshot(source = {}) {
  const merged = {
    mode: "openai",
    endpoint: DEFAULT_OPENAI_ENDPOINT,
    token: "",
    model: DEFAULT_DEEPSEEK_MODEL,
    temperature: DEFAULT_TEMPERATURE,
    apiConfigs: [],
    activeApiConfigId: "",
    summaryApiEnabled: false,
    summaryApiConfigId: "",
    privacyCoverEnabled: true,
    negativePromptConstraints: [],
    customTabs: [],
    bubblePromptSettings: {},
    liveAutoReplyIntervalSeconds: DEFAULT_LIVE_AUTO_REPLY_INTERVAL_SECONDS,
    ...(source && typeof source === "object" ? source : {})
  };
  merged.mode = normalizeApiMode(merged.mode);
  merged.endpoint = normalizeSettingsEndpointByMode(merged.mode, merged.endpoint);
  merged.token = normalizeApiConfigToken(merged.token);
  merged.temperature = normalizeTemperature(merged.temperature, DEFAULT_TEMPERATURE);
  merged.model =
    merged.mode === "generic"
      ? ""
      : safeTrim(merged.model || getDefaultModelByMode(merged.mode)) || getDefaultModelByMode(merged.mode);
  merged.apiConfigs = normalizeApiConfigs(merged.apiConfigs || []);
  merged.negativePromptConstraints = normalizeNegativePromptConstraints(
    merged.negativePromptConstraints || []
  );
  merged.customTabs = normalizeObjectArray(merged.customTabs);
  merged.bubblePromptSettings =
    merged.bubblePromptSettings && typeof merged.bubblePromptSettings === "object"
      ? { ...merged.bubblePromptSettings }
      : {};
  merged.liveAutoReplyIntervalSeconds = normalizeLiveAutoReplyIntervalSeconds(
    merged.liveAutoReplyIntervalSeconds,
    DEFAULT_LIVE_AUTO_REPLY_INTERVAL_SECONDS
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
        : safeTrim(activeConfig.model || getDefaultModelByMode(activeConfig.mode)) ||
          getDefaultModelByMode(activeConfig.mode);
    merged.temperature = normalizeTemperature(activeConfig.temperature, DEFAULT_TEMPERATURE);
  }
  if (!merged.apiConfigs.some((item) => item.id === merged.summaryApiConfigId)) {
    merged.summaryApiConfigId = "";
    merged.summaryApiEnabled = false;
  }
  merged.summaryApiEnabled = Boolean(merged.summaryApiEnabled && merged.summaryApiConfigId);
  return merged;
}

function loadSettings() {
  return buildNormalizedSettingsSnapshot(readStoredJson(SETTINGS_KEY, {}) || {});
}

function loadProfile() {
  const source = readStoredJson(PROFILE_KEY, {}) || {};
  return {
    avatar: safeTrim(source.avatar || DEFAULT_PROFILE.avatar) || DEFAULT_PROFILE.avatar,
    username: safeTrim(source.username || DEFAULT_PROFILE.username) || DEFAULT_PROFILE.username,
    userId: safeTrim(source.userId || DEFAULT_PROFILE.userId) || DEFAULT_PROFILE.userId,
    avatarImage: safeTrim(source.avatarImage || ""),
    followers: safeTrim(source.followers || DEFAULT_PROFILE.followers) || DEFAULT_PROFILE.followers,
    signature: safeTrim(source.signature || ""),
    personaPrompt: safeTrim(source.personaPrompt || source.chatPersonaPrompt || "")
  };
}

function loadContacts() {
  return normalizeObjectArray(readStoredJson(MESSAGE_CONTACTS_KEY, []))
    .map((contact) => {
      const name = safeTrim(contact.name || "");
      const contactId = safeTrim(contact.id || "");
      return {
        id: contactId,
        name,
        avatarImage: safeTrim(contact.avatarImage || ""),
        avatarText: safeTrim(contact.avatarText || "") || getAvatarFallback(name || "联"),
        personaPrompt: safeTrim(contact.personaPrompt || ""),
        specialUserPersona: safeTrim(contact.specialUserPersona || "")
      };
    })
    .filter((contact) => contact.id && contact.name);
}

function normalizeObjectArray(value) {
  return Array.isArray(value) ? value.filter((item) => item && typeof item === "object") : [];
}

function normalizeCustomTabs(tabs = []) {
  return normalizeObjectArray(tabs).map((tab, index) => {
    const rawName = tab.name || tab.label || tab.title || tab.tabName || tab.tabLabel || "";
    const rawAudience =
      tab.audience ||
      tab.userPosition ||
      tab.userProfile ||
      tab.positioning ||
      tab.targetAudience ||
      tab.memberProfile ||
      "";
    const rawDiscussionText = tab.discussionText || tab.text || tab.prompt || tab.content || tab.description || "";
    const rawHotTopic = tab.hotTopic || tab.hotspot || tab.hotText || tab.topicText || tab.topic || "";
    return {
      id:
        safeTrim(tab.id || tab.feedId || tab.key) ||
        `custom_${index}_${hashText(`${rawName || ""}-${rawDiscussionText || ""}-${rawHotTopic || ""}`)}`,
      name: safeTrim(rawName || "自定义页签").slice(0, 20) || "自定义页签",
      audience: safeTrim(rawAudience),
      discussionText: safeTrim(rawDiscussionText),
      hotTopic: safeTrim(rawHotTopic),
      text: safeTrim(rawDiscussionText)
    };
  });
}

function getLiveForumOptions() {
  const settings = state.settings || loadSettings();
  const items = [{ id: "entertainment", name: "默认论坛首页" }];
  const seen = new Set(items.map((item) => item.id));
  normalizeCustomTabs(settings.customTabs).forEach((tab) => {
    if (!tab.id || !tab.name || seen.has(tab.id)) {
      return;
    }
    seen.add(tab.id);
    items.push({ id: tab.id, name: tab.name });
  });
  return items;
}

function getWorldbookPayload() {
  return readStoredJson(WORLD_BOOKS_KEY, { categories: [], entries: [] }) || {
    categories: [],
    entries: []
  };
}

function getLiveWorldbookOptions() {
  const payload = getWorldbookPayload();
  const categoryMap = new Map(
    normalizeObjectArray(payload.categories).map((category, index) => {
      const categoryId = safeTrim(category.id || `category_${index}`);
      const categoryName = safeTrim(category.name || "");
      return [categoryId, categoryName];
    })
  );
  return normalizeObjectArray(payload.entries)
    .map((entry, index) => {
      const name = safeTrim(entry.name || "");
      if (!name) {
        return null;
      }
      const entryId = safeTrim(entry.id || "") || `worldbook_${safeTrim(name).slice(0, 24)}_${index}`;
      return {
        id: entryId,
        name,
        categoryName: categoryMap.get(safeTrim(entry.categoryId || "")) || "",
        text: safeTrim(entry.text || entry.content || "")
      };
    })
    .filter(Boolean);
}

function normalizeWorldbookIds(value = []) {
  const validWorldbookIds = new Set(getLiveWorldbookOptions().map((item) => item.id));
  const source = Array.isArray(value) ? value : [];
  const uniqueIds = [];
  const seenIds = new Set();
  source.forEach((item) => {
    const entryId = safeTrim(item);
    if (!entryId || seenIds.has(entryId) || !validWorldbookIds.has(entryId)) {
      return;
    }
    seenIds.add(entryId);
    uniqueIds.push(entryId);
  });
  return uniqueIds;
}

function buildWorldbookContextFromIds(entryIds = [], options = {}) {
  const resolvedIds = normalizeWorldbookIds(entryIds);
  const entries = getLiveWorldbookOptions().filter((entry) => resolvedIds.includes(entry.id));
  if (!entries.length) {
    return safeTrim(options.emptyText || "");
  }
  const title = safeTrim(options.title || "挂载世界书：") || "挂载世界书：";
  return [
    title,
    ...entries.slice(0, 8).map((entry) =>
      [
        `- ${entry.name}${entry.categoryName ? `（${entry.categoryName}）` : ""}`,
        entry.text ? `  ${truncateText(entry.text, 520)}` : ""
      ]
        .filter(Boolean)
        .join("\n")
    )
  ].join("\n");
}

function getLiveConversationPromptSettings() {
  const contactId = safeTrim(state.liveEntryConfig?.contactId || state.hostContact?.id || "");
  const globalPromptSettings =
    state.settings?.messagePromptSettings && typeof state.settings.messagePromptSettings === "object"
      ? state.settings.messagePromptSettings
      : {};
  const conversations = normalizeObjectArray(readStoredJson(MESSAGE_THREADS_KEY, []));
  const conversation =
    conversations.find((item) => safeTrim(item?.contactId || "") === contactId) || null;
  const promptSettings =
    conversation?.promptSettings && typeof conversation.promptSettings === "object"
      ? conversation.promptSettings
      : {};
  return {
    worldbookEnabled: Boolean(promptSettings.worldbookEnabled),
    worldbookIds: normalizeWorldbookIds(promptSettings.worldbookIds),
    coreMemoryThreshold: clampNumber(
      normalizePositiveInteger(
        promptSettings.coreMemoryThreshold,
        normalizePositiveInteger(
          globalPromptSettings.coreMemoryThreshold,
          DEFAULT_CORE_MEMORY_THRESHOLD
        )
      ),
      1,
      100
    ),
    sceneMemoryThreshold: clampNumber(
      normalizePositiveInteger(
        promptSettings.sceneMemoryThreshold,
        normalizePositiveInteger(
          globalPromptSettings.sceneMemoryThreshold,
          DEFAULT_SCENE_MEMORY_THRESHOLD
        )
      ),
      1,
      100
    )
  };
}

function buildRoleMergedWorldbookContextText() {
  const liveWorldbookIds = state.liveEntryConfig?.worldbookEnabled
    ? normalizeWorldbookIds(state.liveEntryConfig.worldbookIds)
    : [];
  const conversationPromptSettings = getLiveConversationPromptSettings();
  const privateWorldbookIds = conversationPromptSettings.worldbookEnabled
    ? normalizeWorldbookIds(conversationPromptSettings.worldbookIds)
    : [];
  const mergedWorldbookIds = [...new Set([...liveWorldbookIds, ...privateWorldbookIds])];
  const hasSharedSelection = Boolean(liveWorldbookIds.length);
  const hasPrivateSelection = Boolean(privateWorldbookIds.length);
  const title = hasSharedSelection && hasPrivateSelection
    ? "挂载世界书（直播共享 + 角色私有去重合并）："
    : hasPrivateSelection
      ? "角色 1v1 私有世界书（仅角色侧可见）："
      : "挂载世界书：";
  if (!mergedWorldbookIds.length) {
    return state.liveEntryConfig?.worldbookEnabled
      ? "已勾选挂载世界书基础设置，但未选择具体世界书条目。"
      : "";
  }
  return buildWorldbookContextFromIds(mergedWorldbookIds, { title });
}

function normalizeLiveMemoryEntry(memory = {}, index = 0) {
  const source = memory && typeof memory === "object" ? memory : {};
  const content = safeTrim(source.content || source.text || "");
  return {
    id: String(source.id || `live_memory_${Date.now()}_${index}`),
    contactId: safeTrim(source.contactId || source.contact_id || ""),
    type: safeTrim(source.type || "").toLowerCase() === "core" ? "core" : "scene",
    content,
    importance: clampNumber(
      normalizePositiveInteger(source.importance, DEFAULT_SCENE_MEMORY_THRESHOLD),
      1,
      100
    ),
    updatedAt: Number(source.updatedAt) || Number(source.createdAt) || 0
  };
}

function getLiveMemoriesForContact(contactId = "") {
  const resolvedContactId = safeTrim(contactId);
  if (!resolvedContactId) {
    return [];
  }
  return normalizeObjectArray(readStoredJson(MESSAGE_MEMORIES_KEY, []))
    .map((item, index) => normalizeLiveMemoryEntry(item, index))
    .filter((item) => item.contactId === resolvedContactId && item.content)
    .sort(
      (left, right) =>
        (right.importance || 0) - (left.importance || 0) ||
        (right.updatedAt || 0) - (left.updatedAt || 0)
    );
}

function buildLiveMemorySection(title = "", entries = []) {
  if (!entries.length) {
    return "";
  }
  return [
    safeTrim(title),
    "清楚记得的部分：",
    ...entries.map((entry) => `- ${entry.content}`)
  ]
    .filter(Boolean)
    .join("\n");
}

function buildRolePrivateMemoryContextText() {
  const contactId = safeTrim(state.liveEntryConfig?.contactId || state.hostContact?.id || "");
  if (!contactId) {
    return "";
  }
  const promptSettings = getLiveConversationPromptSettings();
  const memories = getLiveMemoriesForContact(contactId);
  if (!memories.length) {
    return "";
  }
  const coreEntries = memories
    .filter(
      (item) => item.type === "core" && item.importance >= promptSettings.coreMemoryThreshold
    )
    .slice(0, 8);
  const sceneEntries = memories
    .filter(
      (item) => item.type === "scene" && item.importance >= promptSettings.sceneMemoryThreshold
    )
    .slice(0, 10);
  return [
    buildLiveMemorySection(
      "这些核心记忆会持续影响你当下的情绪走向、判断和对用户的态度，请像真的记得它们一样自然体现：",
      coreEntries
    ),
    buildLiveMemorySection(
      "这些情景记忆只在直播内容自然相关时再想起来，不必刻意提前提起：",
      sceneEntries
    )
  ]
    .filter(Boolean)
    .join("\n\n");
}

function normalizeLiveEntryConfig(source = {}) {
  const raw = source && typeof source === "object" ? source : {};
  const forumOptions = getLiveForumOptions();
  const validForumIds = new Set(forumOptions.map((item) => item.id));
  const validWorldbookIds = new Set(getLiveWorldbookOptions().map((item) => item.id));
  const worldbookIds = Array.isArray(raw.worldbookIds) ? raw.worldbookIds : [];
  const uniqueWorldbookIds = [];
  const seenWorldbookIds = new Set();

  worldbookIds.forEach((item) => {
    const value = safeTrim(item);
    if (!value || seenWorldbookIds.has(value) || !validWorldbookIds.has(value)) {
      return;
    }
    seenWorldbookIds.add(value);
    uniqueWorldbookIds.push(value);
  });

  const fallbackForumId = forumOptions[0]?.id || "entertainment";
  const forumTabId = safeTrim(
    raw.forumTabId ||
      raw.forumTab ||
      (Array.isArray(raw.forumTabIds) ? raw.forumTabIds[0] : "") ||
      (Array.isArray(raw.forumTabs) ? raw.forumTabs[0] : "") ||
      fallbackForumId
  );
  return {
    mode: raw.mode === "contact" ? "contact" : "user",
    contactId: safeTrim(raw.contactId || raw.contact_id || ""),
    topic: safeTrim(raw.topic || ""),
    openingDescription: safeTrim(
      raw.openingDescription || raw.initialDescription || raw.liveOpeningText || ""
    ),
    autoReplyIntervalSeconds: normalizeLiveAutoReplyIntervalSeconds(
      raw.autoReplyIntervalSeconds ||
        raw.intervalSeconds ||
        raw.liveAutoReplyIntervalSeconds ||
        DEFAULT_LIVE_AUTO_REPLY_INTERVAL_SECONDS,
      DEFAULT_LIVE_AUTO_REPLY_INTERVAL_SECONDS
    ),
    forumEnabled: Boolean(raw.forumEnabled),
    forumTabId: validForumIds.has(forumTabId) ? forumTabId : fallbackForumId,
    bubbleEnabled: Boolean(raw.bubbleEnabled),
    worldbookEnabled: Boolean(raw.worldbookEnabled),
    worldbookIds: uniqueWorldbookIds,
    updatedAt: Number.isFinite(Number(raw.updatedAt)) ? Number(raw.updatedAt) : 0
  };
}

function loadLiveEntryConfig() {
  return normalizeLiveEntryConfig(readStoredJson(LIVE_ENTRY_CONFIG_KEY, {}) || {});
}

function escapeHtml(value = "") {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function truncateText(value = "", length = 180) {
  const text = safeTrim(value).replace(/\s+/g, " ");
  if (text.length <= length) {
    return text;
  }
  return `${text.slice(0, Math.max(1, length - 1))}…`;
}

function getAvatarFallback(name = "") {
  const text = safeTrim(name);
  if (!text) {
    return DEFAULT_PROFILE.avatar;
  }
  return text.slice(0, 2).toUpperCase();
}

function parseCompactNumber(value = "") {
  const text = safeTrim(value).toUpperCase().replace(/,/g, "");
  if (!text) {
    return 0;
  }
  const matched = text.match(/^(\d+(?:\.\d+)?)([KM万W]?)$/);
  if (!matched) {
    const numeric = Number(text);
    return Number.isFinite(numeric) ? numeric : 0;
  }
  const base = Number(matched[1]) || 0;
  const unit = matched[2];
  if (unit === "K") {
    return Math.round(base * 1000);
  }
  if (unit === "M") {
    return Math.round(base * 1000000);
  }
  if (unit === "万" || unit === "W") {
    return Math.round(base * 10000);
  }
  return Math.round(base);
}

function formatCompactNumber(value = 0) {
  const numeric = Math.max(0, Math.round(Number(value) || 0));
  if (numeric >= 10000) {
    return `${(numeric / 10000).toFixed(numeric >= 100000 ? 0 : 1).replace(/\.0$/, "")}万`;
  }
  if (numeric >= 1000) {
    return `${(numeric / 1000).toFixed(numeric >= 10000 ? 0 : 1).replace(/\.0$/, "")}K`;
  }
  return String(numeric);
}

function isContactLiveMode() {
  return state.liveEntryConfig?.mode === "contact" && Boolean(state.hostContact?.id);
}

function getLiveHostProfile() {
  if (isContactLiveMode()) {
    const contact = state.hostContact || {};
    return {
      username: contact.name || "角色",
      userId: "@role_live",
      avatar: contact.avatarText || getAvatarFallback(contact.name || "角色"),
      avatarImage: contact.avatarImage || "",
      followers: state.profile?.followers || DEFAULT_PROFILE.followers,
      signature: "",
      personaPrompt: contact.personaPrompt || ""
    };
  }
  return state.profile || DEFAULT_PROFILE;
}

function computeViewerEstimate(profile = getLiveHostProfile()) {
  const followers = parseCompactNumber(profile.followers);
  const base = followers > 0 ? Math.max(88, Math.round(followers * 0.018)) : 128;
  const seeded = String(profile.username || "user")
    .split("")
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const jitter = ((seeded + new Date().getDate()) % 36) - 18;
  return Math.max(66, base + jitter);
}

function renderHostCard() {
  const profile = getLiveHostProfile();
  liveHostNameEl.textContent = profile.username;
  liveHostIdEl.textContent = profile.userId;
  liveHostAvatarEl.innerHTML = profile.avatarImage
    ? `<img src="${escapeHtml(profile.avatarImage)}" alt="${escapeHtml(profile.username)} 的头像" />`
    : escapeHtml(profile.avatar || getAvatarFallback(profile.username));
}

function renderViewerCount() {
  liveViewerCountEl.textContent = `${formatCompactNumber(state.viewers)} 人在看`;
}

function buildLiveCaptionSummary() {
  const config = state.liveEntryConfig || loadLiveEntryConfig();
  const summary = [];
  if (config.forumEnabled) {
    const forumLabel =
      getLiveForumOptions().find((item) => item.id === config.forumTabId)?.name || "默认论坛首页";
    summary.push(`论坛 · ${forumLabel}`);
  }
  if (config.bubbleEnabled) {
    summary.push("Bubble · 已挂载");
  }
  if (config.worldbookEnabled) {
    const selectedCount = getLiveWorldbookOptions().filter((item) =>
      config.worldbookIds.includes(item.id)
    ).length;
    summary.push(selectedCount ? `世界书 · ${selectedCount} 条` : "世界书 · 已开启");
  }
  return summary;
}

function pushLiveMessage(role, text, options = {}) {
  const messageText = safeTrim(text);
  if (!messageText) {
    return;
  }
  const item = {
    role,
    text: messageText,
    trigger: safeTrim(options.trigger || ""),
    meta: options.meta && typeof options.meta === "object" ? { ...options.meta } : {},
    createdAt: Date.now()
  };
  state.liveMessages.push(item);
  state.sessionMessages.push(item);
  if (state.liveMessages.length > LIVE_HISTORY_LIMIT) {
    state.liveMessages = state.liveMessages.slice(-LIVE_HISTORY_LIMIT);
  }
  if (state.sessionMessages.length > LIVE_SESSION_HISTORY_LIMIT) {
    state.sessionMessages = state.sessionMessages.slice(-LIVE_SESSION_HISTORY_LIMIT);
  }
}

function createRandomViewerId() {
  const number = Math.floor(1000 + Math.random() * 9000);
  const suffix = Math.random().toString(36).slice(2, 4);
  return `@u${number}${suffix}`;
}

function hasViewerIdPrefix(text = "") {
  return /^@[A-Za-z0-9_\-]{2,18}\s*[：:]/.test(safeTrim(text));
}

function ensureViewerCommentLine(text = "") {
  const line = safeTrim(text);
  if (!line) {
    return "";
  }
  return hasViewerIdPrefix(line) ? line : `${createRandomViewerId()}：${line}`;
}

function clearBulletSeedTimers() {
  state.bulletSeedTimers.forEach((timerId) => window.clearTimeout(timerId));
  state.bulletSeedTimers = [];
}

function clearBulletTicker() {
  window.clearInterval(state.bulletTimer);
  state.bulletTimer = 0;
}

function createBullet(text, options = {}) {
  if (!liveBulletLayerEl) {
    return;
  }
  const item = document.createElement("div");
  state.bulletSeq += 1;
  item.className = [
    "live-bullet",
    options.isUser ? "live-bullet--user" : "",
    options.isHost ? "live-bullet--host" : "",
    options.isSystem ? "live-bullet--system" : ""
  ]
    .filter(Boolean)
    .join(" ");
  item.dataset.bulletId = String(state.bulletSeq);
  item.textContent = safeTrim(text);
  liveBulletLayerEl.appendChild(item);
  trimBulletQueue();
  window.setTimeout(() => {
    removeBullet(item);
  }, LIVE_BULLET_LIFETIME_MS);
}

function removeBullet(item) {
  if (!(item instanceof HTMLElement) || !item.isConnected) {
    return;
  }
  item.classList.add("is-leaving");
  window.setTimeout(() => {
    item.remove();
  }, 220);
}

function trimBulletQueue() {
  if (!liveBulletLayerEl) {
    return;
  }
  const items = [...liveBulletLayerEl.querySelectorAll(".live-bullet")];
  if (items.length <= LIVE_BULLET_LIMIT) {
    return;
  }
  items.slice(0, items.length - LIVE_BULLET_LIMIT).forEach((item) => removeBullet(item));
}

function buildAudienceTextPool() {
  const profile = getLiveHostProfile();
  const settings = state.settings || loadSettings();
  const liveTopic = safeTrim(state.liveEntryConfig?.topic || "");
  return [
    liveTopic ? `今天的直播主题是：${liveTopic}` : "",
    `${profile.username} 今天状态好好`,
    `这个灯光也太适合 ${profile.username} 了吧`,
    `救命 这一场也太像深夜直播了`,
    `刚点进来就听到在聊天 好自然`,
    `今天的氛围好舒服`,
    `${profile.userId} 这句我真的会记住`,
    `${safeTrim(settings.worldview || "").slice(0, 12) || "这个话题"} 也太会聊了`,
    `弹幕路过打卡一下`,
    `这个镜头感太强了`,
    `今天会播多久呀`
  ].filter(Boolean);
}

function pickAmbientBulletText(pool = buildAudienceTextPool()) {
  const next = pool[Math.floor(Math.random() * pool.length)];
  return next ? ensureViewerCommentLine(next) : "";
}

function addApiViewerComments(lines = []) {
  const seenTexts = new Set();
  const normalizedLines = lines
    .map(ensureViewerCommentLine)
    .filter((line) => {
      if (!line || seenTexts.has(line)) {
        return false;
      }
      seenTexts.add(line);
      return true;
    });
  if (!normalizedLines.length) {
    return;
  }
  clearBulletSeedTimers();
  state.apiCommentBatchSeq += 1;
  const batchId = state.apiCommentBatchSeq;
  const createdAt = Date.now();
  const existingTexts = new Set(state.apiViewerCommentPool.map((item) => item.text));
  const nextItems = normalizedLines
    .filter((text) => !existingTexts.has(text))
    .map((text, index) => ({
      id: `${batchId}_${index}_${hashText(text)}`,
      text,
      batchId,
      createdAt,
      shownCount: 0,
      lastShownAt: 0
    }));
  if (!nextItems.length) {
    return;
  }
  state.apiViewerCommentPool = [...nextItems, ...state.apiViewerCommentPool]
    .filter((item, index, array) => array.findIndex((candidate) => candidate.text === item.text) === index)
    .slice(0, LIVE_API_COMMENT_POOL_LIMIT);
  state.apiViewerCommentQueue = [
    ...nextItems,
    ...state.apiViewerCommentQueue.filter((item) => !nextItems.some((candidate) => candidate.text === item.text))
  ].slice(0, LIVE_API_COMMENT_POOL_LIMIT);
  state.apiCommentRecycleIndex = 0;
}

function markApiViewerCommentShown(selected) {
  if (!selected) {
    return "";
  }
  selected.shownCount = Number(selected.shownCount || 0) + 1;
  selected.lastShownAt = Date.now();
  const poolIndex = state.apiViewerCommentPool.findIndex((item) => item.text === selected.text);
  if (poolIndex >= 0) {
    state.apiViewerCommentPool[poolIndex].shownCount = selected.shownCount;
    state.apiViewerCommentPool[poolIndex].lastShownAt = selected.lastShownAt;
    state.apiCommentRecycleIndex = (poolIndex + 1) % Math.max(1, state.apiViewerCommentPool.length);
  }
  return selected.text;
}

function pickApiViewerCommentText() {
  if (state.apiViewerCommentQueue.length) {
    return markApiViewerCommentShown(state.apiViewerCommentQueue.shift());
  }
  const pool = state.apiViewerCommentPool;
  if (!pool.length) {
    return "";
  }
  const index = state.apiCommentRecycleIndex % pool.length;
  return markApiViewerCommentShown(pool[index] || pool[0]);
}

function pickLiveBulletText(pool = buildAudienceTextPool()) {
  return state.apiViewerCommentPool.length ? pickApiViewerCommentText() : pickAmbientBulletText(pool);
}

function flushImmediateViewerComments(count = 2, spacingMs = 180) {
  const total = Math.max(0, Number(count) || 0);
  for (let index = 0; index < total; index += 1) {
    const timerId = window.setTimeout(() => {
      const next = pickApiViewerCommentText();
      if (!next) {
        return;
      }
      createBullet(next);
      pushLiveMessage("viewer", next, { trigger: "cached_api" });
    }, index * spacingMs);
    state.bulletSeedTimers.push(timerId);
  }
}

function startBulletTicker(pool = buildAudienceTextPool()) {
  clearBulletTicker();
  state.bulletTimer = window.setInterval(() => {
    const isApiComment = Boolean(state.apiViewerCommentPool.length);
    const next = pickLiveBulletText(pool);
    if (next) {
      createBullet(next);
      if (isApiComment) {
        pushLiveMessage("viewer", next, { trigger: "cached_api" });
      }
    }
  }, LIVE_BULLET_INTERVAL_MS);
}

function seedAmbientBullets() {
  const pool = buildAudienceTextPool();
  pool.slice(0, 4).forEach((item, index) => {
    const timerId = window.setTimeout(() => {
      if (!state.apiViewerCommentPool.length) {
        createBullet(ensureViewerCommentLine(item));
      }
    }, 240 * index + 120);
    state.bulletSeedTimers.push(timerId);
  });
  startBulletTicker(pool);
}

function startViewerTicker() {
  state.viewers = computeViewerEstimate();
  renderViewerCount();
  window.clearInterval(state.viewerTimer);
  state.viewerTimer = window.setInterval(() => {
    const drift = Math.round((Math.random() - 0.4) * 12);
    state.viewers = Math.max(36, state.viewers + drift);
    renderViewerCount();
  }, 5000);
}

function syncCaption() {
  const hostProfile = getLiveHostProfile();
  const liveTopic = safeTrim(state.liveEntryConfig?.topic || "");
  if (liveCaptionKickerEl) {
    liveCaptionKickerEl.textContent = `${hostProfile.username} 正在直播`;
  }
  liveCaptionTitleEl.textContent = liveTopic || "随便聊聊今天的状态";
  if (liveCaptionHintEl) {
    liveCaptionHintEl.textContent = isContactLiveMode()
      ? "发送评论后，会按当前节奏触发角色或观众反应"
      : "发送主播内容后，会生成观众弹幕";
  }
  if (liveCaptionMetaEl) {
    const summaryItems = buildLiveCaptionSummary();
    liveCaptionMetaEl.hidden = !summaryItems.length;
    liveCaptionMetaEl.innerHTML = summaryItems
      .map((item) => `<span class="live-caption__tag">${escapeHtml(item)}</span>`)
      .join("");
  }
}

function setLiveHint(message = "") {
  if (!liveCaptionHintEl) {
    return;
  }
  liveCaptionHintEl.textContent = message || "发送主播内容后，会生成观众弹幕";
}

function setSummaryStatus(message = "", tone = "") {
  if (!liveSummaryStatusEl) {
    return;
  }
  liveSummaryStatusEl.textContent = message;
  liveSummaryStatusEl.className = "live-modal__status";
  if (tone) {
    liveSummaryStatusEl.classList.add(`is-${tone}`);
  }
}

function setGuideStatus(message = "", tone = "") {
  if (!liveGuideStatusEl) {
    return;
  }
  liveGuideStatusEl.textContent = message;
  liveGuideStatusEl.className = "live-modal__status";
  if (tone) {
    liveGuideStatusEl.classList.add(`is-${tone}`);
  }
}

function renderHostUpdateCard(text = "") {
  const content = safeTrim(text);
  state.currentHostCard = content;
  if (!liveHostUpdateCardEl || !liveHostUpdateTextEl) {
    return;
  }
  liveHostUpdateCardEl.hidden = !content;
  liveHostUpdateTextEl.textContent = content;
}

function renderRoleTools() {
  if (!liveRoleToolsEl) {
    return;
  }
  const enabled = isContactLiveMode();
  liveRoleToolsEl.hidden = !enabled;
  if (liveAnonymousToggleEl) {
    liveAnonymousToggleEl.classList.toggle("is-active", Boolean(state.anonymousMode));
    liveAnonymousToggleEl.textContent = state.anonymousMode ? "匿名评论" : "实名评论";
  }
  if (liveComposerInputEl) {
    liveComposerInputEl.placeholder = enabled
      ? state.anonymousMode
        ? "输入匿名评论…"
        : "输入实名评论…"
      : "输入主播要说的话…";
  }
}

function buildNegativePromptConstraintBlock(settings = state.settings) {
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

function getSelectedForumTab() {
  const config = state.liveEntryConfig || {};
  if (!config.forumEnabled) {
    return null;
  }
  return normalizeCustomTabs((state.settings || loadSettings()).customTabs).find(
    (tab) => tab.id === config.forumTabId
  ) || null;
}

function buildForumContextText() {
  const tab = getSelectedForumTab();
  if (!tab) {
    return state.liveEntryConfig?.forumEnabled ? "已挂载默认论坛首页。" : "";
  }
  const audience = safeTrim(tab.audience || "");
  return [
    `挂载论坛页签：${tab.name}`,
    "本次直播只能挂载一个论坛页签；如果挂载了论坛页签，直播间观众定位默认沿用该页签的用户定位，不要混用其他页签定位。",
    audience ? `直播间观众定位（来自唯一挂载页签「${tab.name}」）：${audience}` : "",
    tab.discussionText ? `页签文本：${truncateText(tab.discussionText, 520)}` : "",
    tab.hotTopic ? `页签热点：${truncateText(tab.hotTopic, 360)}` : ""
  ]
    .filter(Boolean)
    .join("\n");
}

function buildBubbleContextText() {
  if (!state.liveEntryConfig?.bubbleEnabled) {
    return "";
  }
  const bubbleSettings = state.settings?.bubblePromptSettings || {};
  return [
    "已勾选挂载 Bubble 设置。",
    bubbleSettings.hotTopicsEnabled ? "Bubble 热点：开启" : "Bubble 热点：未开启或无额外设置",
    bubbleSettings.hotTopicsTabId ? `Bubble 热点页签：${bubbleSettings.hotTopicsTabId}` : "",
    bubbleSettings.worldbookEnabled ? "Bubble 世界书挂载：开启" : ""
  ]
    .filter(Boolean)
    .join("\n");
}

function buildWorldbookContextText() {
  if (!state.liveEntryConfig?.worldbookEnabled) {
    return "";
  }
  return buildWorldbookContextFromIds(state.liveEntryConfig.worldbookIds, {
    emptyText: "已勾选挂载世界书基础设置，但未选择具体世界书条目。"
  });
}

function buildRecentLiveHistoryText() {
  const items = state.liveMessages.slice(-12);
  if (!items.length) {
    return "当前直播刚开始，还没有真实主播发言或观众弹幕。";
  }
  return items
    .map((item) => {
      const roleLabel = mapLiveMessageRoleLabel(item.role, item.meta || {});
      return `${roleLabel}：${item.text}`;
    })
    .join("\n");
}

function buildFullLiveSessionHistoryText(limit = 80) {
  const items = state.sessionMessages.slice(-Math.max(1, limit));
  if (!items.length) {
    return "当前直播刚开始，还没有真实记录。";
  }
  return items
    .map((item) => `${mapLiveMessageRoleLabel(item.role, item.meta || {})}：${item.text}`)
    .join("\n");
}

function mapLiveMessageRoleLabel(role = "", meta = {}) {
  if (role === "streamer" || role === "host") {
    return "主播发言";
  }
  if (role === "role_host") {
    return "角色主播动态";
  }
  if (role === "viewer_named") {
    return "实名用户评论";
  }
  if (role === "viewer_anonymous") {
    return "匿名用户评论";
  }
  if (role === "viewer" || role === "user") {
    return meta.isUser ? "用户评论" : "观众弹幕";
  }
  return "系统";
}

function consumePendingGuide(type = "role") {
  if (type === "role") {
    const guide = state.pendingRoleGuide;
    state.pendingRoleGuide = null;
    return guide;
  }
  const guide = state.pendingFanGuide;
  state.pendingFanGuide = null;
  return guide;
}

function buildRoleLiveSystemPrompt(trigger = "auto", latestUserText = "") {
  const hostProfile = getLiveHostProfile();
  const userProfile = state.profile || DEFAULT_PROFILE;
  const config = state.liveEntryConfig || {};
  const topic = safeTrim(config.topic || "随便聊聊今天的状态");
  const openingDescription = safeTrim(config.openingDescription || "");
  const negativeBlock = buildNegativePromptConstraintBlock(state.settings);
  const guide = consumePendingGuide("role");
  const contextLibrary = [
    `直播主题：${topic}`,
    openingDescription ? `初始直播描写：${openingDescription}` : "",
    buildForumContextText(),
    buildBubbleContextText(),
    buildRoleMergedWorldbookContextText(),
    buildRolePrivateMemoryContextText()
  ]
    .filter(Boolean)
    .join("\n\n");
  const personaAlignment = [
    `当前直播主播是角色：${hostProfile.username}。`,
    hostProfile.personaPrompt ? `角色人设：${hostProfile.personaPrompt}` : "",
    "你只能让当前被选中的这个角色作为主播行动，不要调动未被选择的其他角色。",
    "角色自己的 1v1 私有世界书与记忆只用于你理解主播状态，不代表直播间观众公开知道；不要把这些内容硬讲成所有人都知道的公开事实。",
    `直播间中真实存在的用户账号是：${userProfile.username}（${userProfile.userId}）。只有当历史里出现实名用户评论时，才可以把她当作被识别出的本人；匿名评论一律视为普通观众。`
  ]
    .filter(Boolean)
    .join("\n");
  const currentStateAwareness = [
    `当前直播主题：${topic}`,
    openingDescription ? `开场画面：${openingDescription}` : "",
    latestUserText ? `最新触发内容：${latestUserText}` : "",
    guide
      ? `本轮角色引导：${guide.text}${guide.emotion ? `；情感倾向：${guide.emotion}` : ""}`
      : "",
    `当前阶段：角色主播输出。触发原因：${
      trigger === "named_comment"
        ? "用户实名评论打断后，需要角色立刻根据当前节奏做出下一步反应。"
        : "到了角色主播发新动态的时间点。"
    }`,
    state.currentHostCard ? `上一条主播动态：${state.currentHostCard}` : "",
    "最近真实互动：",
    buildRecentLiveHistoryText()
  ]
    .filter(Boolean)
    .join("\n");
  const outputStandard = [
    "只输出 1 段角色主播动态，不要输出 JSON、Markdown、列表或说明。",
    "这一段可以把发言、动作、神态、镜头反应自然写在一起，但要保持像直播里刚刚发生的一瞬间。",
    "不要复述背景事实，不要写成长篇叙述，直接进入情绪和现场感。",
    "不要让未被选择的其他角色突然出现或接管剧情。"
  ].join("\n");
  return [
    negativeBlock,
    `<context_library>\n${contextLibrary || "暂无额外背景信息。"}\n</context_library>`,
    `<persona_alignment>\n${personaAlignment}\n</persona_alignment>`,
    `<current_state_awareness>\n${currentStateAwareness}\n</current_state_awareness>`,
    `<output_standard>\n${outputStandard}\n</output_standard>`
  ]
    .filter(Boolean)
    .join("\n\n");
}

function buildFanLiveSystemPrompt(trigger = "auto", latestUserText = "") {
  const hostProfile = getLiveHostProfile();
  const config = state.liveEntryConfig || {};
  const selectedForumTab = getSelectedForumTab();
  const forumAudience = safeTrim(selectedForumTab?.audience || "");
  const topic = safeTrim(config.topic || "随便聊聊今天的状态");
  const openingDescription = safeTrim(config.openingDescription || "");
  const negativeBlock = buildNegativePromptConstraintBlock(state.settings);
  const guide = isContactLiveMode() ? consumePendingGuide("fan") : null;
  const contextLibrary = [
    `直播主题：${topic}`,
    openingDescription ? `初始直播描写：${openingDescription}` : "",
    buildForumContextText(),
    buildBubbleContextText(),
    buildWorldbookContextText()
  ]
    .filter(Boolean)
    .join("\n\n");
  const personaAlignment = [
    isContactLiveMode()
      ? `当前直播主播是角色：${hostProfile.username}。`
      : `直播发起人 / 主播是用户：${hostProfile.username}（${hostProfile.userId}）。`,
    !isContactLiveMode() && hostProfile.signature ? `主播账号简介：${hostProfile.signature}` : "",
    !isContactLiveMode() && hostProfile.personaPrompt
      ? `主播人设与表达参考：${hostProfile.personaPrompt}`
      : "",
    isContactLiveMode()
      ? "你不是主播本人；你要模拟直播间里不同观众对角色主播动态的即时弹幕反应。"
      : "你不是主播本人，也不要替主播发言；你要模拟直播间里不同观众的即时弹幕反应。"
  ]
    .filter(Boolean)
    .join("\n");
  const currentStateAwareness = [
    `当前直播主题：${topic}`,
    openingDescription ? `开场画面 / 初始状态：${openingDescription}` : "",
    forumAudience
      ? `当前直播观众定位：${forumAudience}（来自唯一挂载论坛页签「${selectedForumTab.name}」，不要串用其他页签用户定位。）`
      : "",
    latestUserText
      ? `${isContactLiveMode() ? "最新角色主播动态" : "最新主播发言"}：${latestUserText}`
      : isContactLiveMode()
        ? "最新角色主播动态：暂无新的主播动态。"
        : "最新主播发言：暂无新的主播发言。",
    guide
      ? `本轮粉丝引导：${guide.text}${guide.emotion ? `；情感倾向：${guide.emotion}` : ""}`
      : "",
    `本次触发：${
      isContactLiveMode()
        ? trigger === "named_comment"
          ? "用户实名评论打断后，当前下一步轮到观众先发现并起反应。"
          : "角色主播刚刚有了新动态，需要观众立刻给出一批即时弹幕。"
        : trigger === "streamer"
          ? "主播刚发送内容，需要生成观众对这句话的即时弹幕。"
          : "直播间自动刷弹幕，需要基于主题、初始描写和最近互动生成自然观众弹幕。"
    }`,
    "最近真实互动：",
    buildRecentLiveHistoryText()
  ]
    .filter(Boolean)
    .join("\n");
  const outputStandard = [
    "只输出观众弹幕，不要输出主播发言，不要输出 JSON、Markdown、列表、编号、角色标签或解释。",
    "一次必须生成 15 条互不相同的观众弹幕；每一行就是一条弹幕。",
    "每条弹幕必须自带随机观众 ID，格式固定为：@u1234：弹幕内容。",
    "弹幕要像不同观众同时在直播间刷屏，可以有短句、追问、玩笑、惊讶、接梗、情绪反应和轻微跑题。",
    `当前直播主题、初始直播描写和${isContactLiveMode() ? "角色主播的最新动态" : "主播的实际发言"}优先级最高；如果有最新触发内容，先围绕这句话生成观众反应。`,
    "不要复述设定，不要总结背景，不要长篇说明，不要让 15 条弹幕语气完全一样。"
  ].join("\n");
  return [
    negativeBlock,
    `<context_library>\n${contextLibrary || "暂无额外背景信息。"}\n</context_library>`,
    `<persona_alignment>\n${personaAlignment}\n</persona_alignment>`,
    `<current_state_awareness>\n${currentStateAwareness}\n</current_state_awareness>`,
    `<output_standard>\n${outputStandard}\n</output_standard>`
  ]
    .filter(Boolean)
    .join("\n\n");
}

function buildLiveSystemPrompt(trigger = "auto", latestUserText = "") {
  if (isContactLiveMode()) {
    return buildFanLiveSystemPrompt(trigger, latestUserText);
  }
  return buildFanLiveSystemPrompt(trigger, latestUserText);
}

function buildRoleLiveUserInstruction(trigger = "auto") {
  return trigger === "named_comment"
    ? "请让角色主播基于刚刚的实名用户评论，立即给出下一步自然直播动态。只输出 1 段。"
    : "请让角色主播给出下一条自然的直播动态。只输出 1 段。";
}

function buildLiveUserInstruction(trigger = "auto") {
  if (isContactLiveMode()) {
    return trigger === "named_comment"
      ? "请根据实名用户评论和刚刚的现场状态，生成 15 条观众即时反应弹幕。每条单独一行，并带随机观众 ID。"
      : "请根据角色主播刚刚的动态、当前直播主题和最近互动，生成 15 条不同观众弹幕。每条单独一行，并带随机观众 ID。";
  }
  return trigger === "streamer"
    ? "请根据最新主播发言，生成 15 条不同观众弹幕。每条单独一行，并带随机观众 ID。"
    : "请根据当前直播主题、初始直播描写和最近互动，生成 15 条不同观众弹幕。每条单独一行，并带随机观众 ID。";
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

function buildRequestHeaders(settings) {
  const headers = { "Content-Type": "application/json" };
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

function buildLiveRequestBody(settings, systemPrompt, userInstruction) {
  const mode = normalizeApiMode(settings.mode);
  if (isOpenAICompatibleMode(mode)) {
    return {
      model: settings.model || getDefaultModelByMode(mode),
      temperature: normalizeTemperature(settings.temperature, DEFAULT_TEMPERATURE),
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userInstruction }
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
    intent: "live_reply"
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
    const merged = geminiParts.map((item) => item?.text || "").join("\n").trim();
    if (merged) {
      return merged;
    }
  }
  const content = payload?.choices?.[0]?.message?.content;
  if (typeof content === "string" && content.trim()) {
    return content.trim();
  }
  if (Array.isArray(content)) {
    const merged = content.map((item) => item?.text || item?.content || "").join("\n").trim();
    if (merged) {
      return merged;
    }
  }
  return safeTrim(
    payload?.message || payload?.text || payload?.content || payload?.data?.message || payload?.output?.[0]?.content?.[0]?.text || ""
  );
}

function buildGeminiLogFields(settings, payload) {
  if (normalizeApiMode(settings?.mode) !== "gemini") {
    return {};
  }
  const finishReason = safeTrim(
    payload?.candidates?.[0]?.finishReason || payload?.candidates?.[0]?.finish_reason || ""
  );
  return {
    geminiFinishReason: finishReason,
    gemini_finish_reason: finishReason
  };
}

function appendApiLog(entry) {
  try {
    window.PulseApiLog?.append?.(entry);
  } catch (_error) {
  }
}

function createPrivacySession(options = {}) {
  if (state.settings?.privacyCoverEnabled === false) {
    return null;
  }
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

function applyPrivacyToLogEntry(entry, session) {
  if (!session || !window.PulsePrivacyCover?.applyPrivacyToLogEntry) {
    return entry;
  }
  return window.PulsePrivacyCover.applyPrivacyToLogEntry(entry, session);
}

function buildLiveApiLogBase(action, settings, endpoint, prompt, requestBody, summary = "") {
  const mode = normalizeApiMode(settings.mode);
  return {
    source: "live",
    action,
    summary,
    endpoint,
    mode,
    model: mode === "generic" ? "" : settings.model || getDefaultModelByMode(mode),
    prompt,
    requestBody
  };
}

function createStructuredOutputContext(settings, contractName = "") {
  if (!window.PulseStructuredOutput?.createRequestContext) {
    return { enabled: false, contractName: "", contract: null, provider: "none" };
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
  const hint = String(window.PulseStructuredOutput?.getPromptHint?.(context) || "").trim();
  return hint ? [String(text || "").trim(), hint].filter(Boolean).join("\n\n") : String(text || "");
}

function parseStructuredOutputPayload(payload, context = null) {
  if (!window.PulseStructuredOutput?.parseStructuredResponse) {
    return null;
  }
  return window.PulseStructuredOutput.parseStructuredResponse(payload, context);
}

function resolveLiveStorageApiBaseUrl() {
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

function buildLiveStorageApiUrl(pathname = "/api/health") {
  const baseUrl = resolveLiveStorageApiBaseUrl();
  return new URL(String(pathname || "").replace(/^\/+/, ""), `${baseUrl}/`).toString();
}

async function requestLiveStorageApi(pathname, options = {}) {
  const response = await fetch(buildLiveStorageApiUrl(pathname), {
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

function resolveApiSettingsFromConfig(baseSettings, configId = "") {
  const resolvedBase = buildNormalizedSettingsSnapshot(baseSettings || {});
  const config = resolvedBase.apiConfigs.find((item) => item.id === String(configId || "").trim());
  if (!config) {
    return resolvedBase;
  }
  return {
    ...resolvedBase,
    mode: normalizeApiMode(config.mode),
    endpoint: normalizeSettingsEndpointByMode(config.mode, config.endpoint),
    token: normalizeApiConfigToken(config.token),
    model:
      config.mode === "generic"
        ? ""
        : safeTrim(config.model || getDefaultModelByMode(config.mode)) || getDefaultModelByMode(config.mode),
    temperature: normalizeTemperature(config.temperature, DEFAULT_TEMPERATURE)
  };
}

function resolveLiveSummaryApiSettings() {
  const settings = state.settings || loadSettings();
  if (settings.summaryApiEnabled && settings.summaryApiConfigId) {
    return resolveApiSettingsFromConfig(settings, settings.summaryApiConfigId);
  }
  return settings;
}

function extractLiveReplyLineCandidates(text = "") {
  const raw = String(text || "")
    .replace(/```[a-z]*\s*/gi, "")
    .replace(/```/g, "")
    .trim();
  if (!raw) {
    return [];
  }
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.map((item) =>
        typeof item === "string" ? item : item?.text || item?.content || item?.comment || ""
      );
    }
    if (Array.isArray(parsed?.items)) {
      return parsed.items.map((item) =>
        typeof item === "string" ? item : item?.text || item?.content || item?.comment || ""
      );
    }
    if (Array.isArray(parsed?.comments)) {
      return parsed.comments.map((item) =>
        typeof item === "string" ? item : item?.text || item?.content || item?.comment || ""
      );
    }
  } catch (_error) {
  }
  return raw.split(/\r?\n/g);
}

function parseLiveReplyLines(text = "") {
  return extractLiveReplyLineCandidates(text)
    .map((line) =>
      safeTrim(String(line || ""))
        .replace(/```[a-z]*\s*/gi, "")
        .replace(/```/g, "")
        .replace(/^\d+[\).、]\s*/, "")
        .replace(/^[-*•]\s*/, "")
        .replace(/^(观众|弹幕|用户|viewer|audience)[A-Za-z0-9_\-\u4e00-\u9fa5]*\s*[：:]/i, "")
        .replace(/^(AI|assistant|Assistant)\s*[：:]/i, "")
        .replace(/^(u[0-9a-z_-]{2,18})\s*([：:])/i, "@$1$2")
        .trim()
    )
    .map(ensureViewerCommentLine)
    .filter(Boolean)
    .slice(0, 15);
}

function parseRoleHostReply(text = "") {
  return safeTrim(
    String(text || "")
      .replace(/```[a-z]*\s*/gi, "")
      .replace(/```/g, "")
      .replace(/^\d+[\).、]\s*/, "")
      .replace(/^[-*•]\s*/, "")
  )
    .split(/\r?\n/g)
    .map((line) => safeTrim(line))
    .filter(Boolean)
    .join("\n")
    .trim();
}

function getLiveSummaryForumOptions() {
  return normalizeCustomTabs((state.settings || loadSettings()).customTabs).filter(
    (tab) => tab.id && tab.name
  );
}

function parseLegacyHotTopicLines(value = "") {
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
  if (numberedMatches.length) {
    return numberedMatches;
  }
  return normalized
    .split("\n")
    .map((line) => String(line || "").replace(/^\s*\d+[\.\)、]\s*/, "").trim())
    .filter(Boolean);
}

function updateLocalForumTabHotTopic(tabId = "", contentText = "") {
  const resolvedTabId = safeTrim(tabId);
  const text = safeTrim(contentText);
  if (!resolvedTabId || !text) {
    return;
  }
  const settings = state.settings || loadSettings();
  const nextTabs = normalizeObjectArray(settings.customTabs).map((tab) => {
    const currentId = safeTrim(tab.id || tab.feedId || tab.key);
    if (currentId !== resolvedTabId) {
      return { ...tab };
    }
    const existingLines = parseLegacyHotTopicLines(tab.hotTopic || tab.hotspot || tab.hotText || "");
    const mergedLines = [text, ...existingLines.filter((item) => item !== text)].slice(0, 24);
    return {
      ...tab,
      hotTopic: mergedLines.map((item, index) => `${index + 1}. ${item}`).join("\n")
    };
  });
  const nextSettings = {
    ...settings,
    customTabs: nextTabs
  };
  safeSetItem(SETTINGS_KEY, JSON.stringify(nextSettings));
  state.settings = buildNormalizedSettingsSnapshot(nextSettings);
}

async function writeLiveHotTopic(tabId = "", contentText = "", topicTags = []) {
  const resolvedTabId = safeTrim(tabId);
  const text = safeTrim(contentText);
  if (!resolvedTabId || !text) {
    throw new Error("请选择要挂载的论坛页签。");
  }
  const payload = await requestLiveStorageApi("/api/forum/tab-content/items", {
    method: "POST",
    body: JSON.stringify({
      tabId: resolvedTabId,
      bucket: "hot_topic",
      contentText: text,
      discussionDate: new Date().toISOString().slice(0, 10),
      topicTags: Array.isArray(topicTags) ? topicTags.slice(0, 3) : []
    })
  });
  updateLocalForumTabHotTopic(resolvedTabId, text);
  return payload;
}

async function requestLiveStructuredOutput({
  action = "live_summary",
  contractName = "",
  systemPrompt = "",
  userInstruction = "",
  summary = ""
} = {}) {
  const settings = resolveLiveSummaryApiSettings();
  const requestEndpoint = resolveApiRequestEndpoint(settings);
  const structuredContext = createStructuredOutputContext(settings, contractName);
  const privacySession = createPrivacySession({
    settings,
    profile: state.profile,
    liveEntryConfig: state.liveEntryConfig,
    liveMessages: state.sessionMessages,
    systemPrompt,
    userInstruction
  });
  const encodedSystemPrompt = preparePromptWithPrivacy(systemPrompt, privacySession);
  const encodedInstruction = encodeTextWithPrivacy(
    appendStructuredOutputPromptHint(userInstruction, structuredContext),
    privacySession
  );
  let requestBody = buildLiveRequestBody(settings, encodedSystemPrompt, encodedInstruction);
  requestBody = decorateRequestBodyWithStructuredOutput(requestBody, structuredContext);
  const logBase = applyPrivacyToLogEntry(
    buildLiveApiLogBase(
      action,
      settings,
      requestEndpoint,
      [encodedSystemPrompt, encodedInstruction].join("\n\n"),
      requestBody,
      summary
    ),
    privacySession
  );
  if (!requestEndpoint) {
    throw new Error("请先在首页设置里配置 API 地址。");
  }
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
      errorMessage: `直播结构化请求失败：HTTP ${response.status}`
    });
    throw new Error(`直播结构化请求失败：HTTP ${response.status}`);
  }
  const parsed = parseStructuredOutputPayload(payload, structuredContext);
  const decodedText = decodeTextWithPrivacy(resolveMessage(payload), privacySession);
  appendApiLog({
    ...logBase,
    ...buildGeminiLogFields(settings, payload),
    status: parsed ? "success" : "error",
    statusCode: response.status,
    responseText: rawResponse,
    responseBody: payload,
    decodedResponseText: decodedText,
    errorMessage: parsed ? "" : "直播结构化输出解析失败。"
  });
  if (!parsed) {
    throw new Error("AI 已返回内容，但没有生成可解析的结构化结果。");
  }
  return parsed;
}

function clearAutoReplyTimer() {
  window.clearTimeout(state.autoReplyTimer);
  state.autoReplyTimer = 0;
}

function setSummaryButtonsDisabled(disabled) {
  if (liveSummaryDirectEndBtnEl) {
    liveSummaryDirectEndBtnEl.disabled = Boolean(disabled);
  }
  if (liveSummaryGenerateBtnEl) {
    liveSummaryGenerateBtnEl.disabled = Boolean(disabled);
  }
  if (liveSummaryTabSelectEl) {
    liveSummaryTabSelectEl.disabled = Boolean(disabled);
  }
  if (liveSummaryControversyEl) {
    liveSummaryControversyEl.disabled = Boolean(disabled);
  }
}

function renderSummaryTabOptions() {
  if (!liveSummaryTabSelectEl) {
    return;
  }
  const options = getLiveSummaryForumOptions();
  if (!options.length) {
    liveSummaryTabSelectEl.innerHTML = '<option value="">暂无可挂载论坛页签</option>';
    liveSummaryTabSelectEl.value = "";
    liveSummaryTabSelectEl.disabled = true;
    if (liveSummaryGenerateBtnEl) {
      liveSummaryGenerateBtnEl.disabled = true;
    }
    setSummaryStatus("当前没有可写入的论坛页签；你仍然可以直接结束直播。");
    return;
  }
  liveSummaryTabSelectEl.disabled = false;
  if (liveSummaryGenerateBtnEl) {
    liveSummaryGenerateBtnEl.disabled = false;
  }
  liveSummaryTabSelectEl.innerHTML = options
    .map((tab) => `<option value="${escapeHtml(tab.id)}">${escapeHtml(tab.name)}</option>`)
    .join("");
  const preferredTabId = safeTrim(state.liveEntryConfig?.forumTabId || "");
  liveSummaryTabSelectEl.value =
    options.some((tab) => tab.id === preferredTabId) ? preferredTabId : options[0].id;
}

function setSummaryModalOpen(isOpen) {
  state.summaryModalOpen = Boolean(isOpen);
  if (!liveSummaryModalEl) {
    return;
  }
  liveSummaryModalEl.hidden = !state.summaryModalOpen;
  liveSummaryModalEl.setAttribute("aria-hidden", state.summaryModalOpen ? "false" : "true");
  if (state.summaryModalOpen) {
    setSummaryStatus("");
    setSummaryButtonsDisabled(false);
    if (liveSummaryControversyEl) {
      liveSummaryControversyEl.checked = false;
    }
    renderSummaryTabOptions();
    window.setTimeout(() => {
      liveSummaryTabSelectEl?.focus();
    }, 0);
  }
}

function setGuideModalOpen(isOpen) {
  state.guideModalOpen = Boolean(isOpen);
  if (!liveGuideModalEl) {
    return;
  }
  liveGuideModalEl.hidden = !state.guideModalOpen;
  liveGuideModalEl.setAttribute("aria-hidden", state.guideModalOpen ? "false" : "true");
  if (state.guideModalOpen) {
    setGuideStatus("");
    window.setTimeout(() => {
      liveGuideTextEl?.focus();
    }, 0);
  }
}

function queueLiveRequest(kind = "fans", trigger = "auto", latestUserText = "") {
  state.queuedRequests.push({
    kind,
    trigger,
    latestUserText: safeTrim(latestUserText)
  });
}

function runQueuedLiveRequest(request = null) {
  const nextRequest = request || state.queuedRequests.shift();
  if (!nextRequest) {
    return false;
  }
  window.setTimeout(() => {
    if (nextRequest.kind === "role") {
      requestRoleHostUpdate(nextRequest.trigger, nextRequest.latestUserText);
      return;
    }
    requestLiveApiReply(nextRequest.trigger, nextRequest.latestUserText);
  }, 220);
  return true;
}

function scheduleNextAutoReply(delayMs = null) {
  clearAutoReplyTimer();
  const configuredInterval =
    state.liveEntryConfig?.autoReplyIntervalSeconds ??
    state.settings?.liveAutoReplyIntervalSeconds ??
    DEFAULT_LIVE_AUTO_REPLY_INTERVAL_SECONDS;
  const intervalMs =
    delayMs == null
      ? normalizeLiveAutoReplyIntervalSeconds(
          configuredInterval,
          DEFAULT_LIVE_AUTO_REPLY_INTERVAL_SECONDS
        ) * 1000
      : delayMs;
  state.autoReplyTimer = window.setTimeout(() => {
    if (isContactLiveMode()) {
      if (state.nextStage === "fans") {
        requestLiveApiReply("auto", state.currentHostCard || "");
        return;
      }
      requestRoleHostUpdate("auto", "");
      return;
    }
    requestLiveApiReply("auto", "");
  }, Math.max(1000, intervalMs));
}

async function requestRoleHostUpdate(trigger = "auto", latestUserText = "") {
  if (!isContactLiveMode()) {
    return;
  }
  if (state.apiPending) {
    queueLiveRequest("role", trigger, latestUserText);
    return;
  }

  clearAutoReplyTimer();
  state.apiPending = true;
  setLiveHint("主播正在推进直播…");

  const settings = loadSettings();
  state.settings = settings;
  const requestEndpoint = resolveApiRequestEndpoint(settings);
  const systemPrompt = buildRoleLiveSystemPrompt(trigger, latestUserText);
  const userInstruction = buildRoleLiveUserInstruction(trigger);
  const privacySession = createPrivacySession({
    settings,
    profile: state.profile,
    hostContact: state.hostContact,
    liveEntryConfig: state.liveEntryConfig,
    liveMessages: state.sessionMessages,
    systemPrompt,
    userInstruction
  });
  const encodedSystemPrompt = preparePromptWithPrivacy(systemPrompt, privacySession);
  const encodedUserInstruction = encodeTextWithPrivacy(userInstruction, privacySession);
  const requestBody = buildLiveRequestBody(settings, encodedSystemPrompt, encodedUserInstruction);
  const logBase = applyPrivacyToLogEntry(
    buildLiveApiLogBase(
      "live_contact_role_stage",
      settings,
      requestEndpoint,
      [encodedSystemPrompt, encodedUserInstruction].join("\n\n"),
      requestBody,
      `角色直播：${state.hostContact?.name || "未命名角色"} · 角色阶段`
    ),
    privacySession
  );
  let success = false;
  let logged = false;
  try {
    if (!requestEndpoint) {
      throw new Error("请先在首页设置里配置 API 地址。");
    }
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
        errorMessage: `角色直播回复失败：HTTP ${response.status}`
      });
      logged = true;
      throw new Error(`角色直播回复失败：HTTP ${response.status}`);
    }
    const decodedText = decodeTextWithPrivacy(resolveMessage(payload), privacySession);
    const hostText = parseRoleHostReply(decodedText);
    if (!hostText) {
      appendApiLog({
        ...logBase,
        ...buildGeminiLogFields(settings, payload),
        status: "error",
        statusCode: response.status,
        responseText: rawResponse,
        responseBody: payload,
        errorMessage: "角色直播动态为空。"
      });
      logged = true;
      throw new Error("角色直播动态为空。");
    }
    renderHostUpdateCard(hostText);
    pushLiveMessage("role_host", hostText, { trigger });
    appendApiLog({
      ...logBase,
      ...buildGeminiLogFields(settings, payload),
      status: "success",
      statusCode: response.status,
      responseText: rawResponse,
      responseBody: payload,
      decodedResponseText: decodedText
    });
    logged = true;
    success = true;
    state.nextStage = "fans";
    setLiveHint("主播刚有新动态，观众正在跟上反应…");
  } catch (error) {
    if (!logged) {
      appendApiLog({
        ...logBase,
        status: "error",
        errorMessage: error?.message || "角色直播回复失败。"
      });
    }
    setLiveHint(`角色直播回复失败：${error?.message || "请检查 API 配置"}`);
    createBullet("系统：角色直播暂时失败，请稍后重试", { isSystem: true });
  } finally {
    state.apiPending = false;
    if (!success) {
      if (!runQueuedLiveRequest()) {
        scheduleNextAutoReply();
      }
      return;
    }
    requestLiveApiReply(trigger, state.currentHostCard || latestUserText);
  }
}

async function requestLiveApiReply(trigger = "auto", latestUserText = "") {
  if (state.apiPending) {
    queueLiveRequest("fans", trigger, latestUserText);
    return;
  }

  clearAutoReplyTimer();
  state.apiPending = true;
  setLiveHint(isContactLiveMode() ? "直播间正在刷新观众反应…" : "直播间正在刷弹幕…");

  const settings = loadSettings();
  state.settings = settings;
  const requestEndpoint = resolveApiRequestEndpoint(settings);
  const systemPrompt = buildLiveSystemPrompt(trigger, latestUserText);
  const userInstruction = buildLiveUserInstruction(trigger);
  const privacySession = createPrivacySession({
    settings,
    profile: state.profile,
    liveEntryConfig: state.liveEntryConfig,
    liveMessages: state.liveMessages,
    systemPrompt,
    userInstruction
  });
  const encodedSystemPrompt = preparePromptWithPrivacy(systemPrompt, privacySession);
  const encodedUserInstruction = encodeTextWithPrivacy(userInstruction, privacySession);
  const requestBody = buildLiveRequestBody(settings, encodedSystemPrompt, encodedUserInstruction);
  const logBase = applyPrivacyToLogEntry(
    buildLiveApiLogBase(
      trigger === "streamer" ? "live_comments_streamer" : "live_comments_auto",
      settings,
      requestEndpoint,
      [encodedSystemPrompt, encodedUserInstruction].join("\n\n"),
      requestBody,
      `直播：${state.liveEntryConfig?.topic || "未命名直播"} · ${
        isContactLiveMode()
          ? trigger === "named_comment"
            ? "实名评论触发观众阶段"
            : "观众阶段"
          : trigger === "streamer"
            ? "主播发言触发"
            : "自动弹幕"
      }`
    ),
    privacySession
  );
  let logged = false;

  try {
    if (!requestEndpoint) {
      throw new Error("请先在首页设置里配置 API 地址。");
    }
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
        errorMessage: `直播回复请求失败：HTTP ${response.status}`
      });
      logged = true;
      throw new Error(`直播回复请求失败：HTTP ${response.status}`);
    }

    const decodedText = decodeTextWithPrivacy(resolveMessage(payload), privacySession);
    const replyLines = parseLiveReplyLines(decodedText);
    if (!replyLines.length) {
      appendApiLog({
        ...logBase,
        ...buildGeminiLogFields(settings, payload),
        status: "error",
        statusCode: response.status,
        responseText: rawResponse,
        responseBody: payload,
        errorMessage: "直播回复为空。"
      });
      logged = true;
      throw new Error("直播回复为空。");
    }

    addApiViewerComments(replyLines);
    if (isContactLiveMode()) {
      flushImmediateViewerComments(3, 210);
    }
    appendApiLog({
      ...logBase,
      ...buildGeminiLogFields(settings, payload),
      status: "success",
      statusCode: response.status,
      responseText: rawResponse,
      responseBody: payload,
      decodedResponseText: decodedText
    });
    logged = true;
    setLiveHint(
      isContactLiveMode() ? "下一轮会继续生成角色主播动态" : "发送主播内容后，会生成观众弹幕"
    );
  } catch (error) {
    if (!logged) {
      appendApiLog({
        ...logBase,
        status: "error",
        errorMessage: error?.message || "直播回复请求失败。"
      });
    }
    setLiveHint(`直播回复失败：${error?.message || "请检查 API 配置"}`);
    createBullet("系统：直播回复暂时失败，请检查 API 配置", { isSystem: true });
  } finally {
    state.apiPending = false;
    const nextRequest = state.queuedRequests.shift();
    if (nextRequest) {
      runQueuedLiveRequest(nextRequest);
    } else if (isContactLiveMode()) {
      state.nextStage = "role";
      scheduleNextAutoReply();
    } else {
      scheduleNextAutoReply();
    }
  }
}

function buildUserLiveSummarySystemPrompt() {
  const hostProfile = getLiveHostProfile();
  const topic = safeTrim(state.liveEntryConfig?.topic || "未命名直播");
  const openingDescription = safeTrim(state.liveEntryConfig?.openingDescription || "");
  const negativeBlock = buildNegativePromptConstraintBlock(state.settings);
  const contextLibrary = [
    `直播主题：${topic}`,
    openingDescription ? `开场描写：${openingDescription}` : "",
    buildForumContextText()
  ]
    .filter(Boolean)
    .join("\n\n");
  const personaAlignment = [
    `这是一场由用户 ${hostProfile.username} 发起的直播。`,
    hostProfile.personaPrompt ? `主播表达参考：${hostProfile.personaPrompt}` : "",
    "你现在要做的不是聊天回复，而是把这场直播沉淀成论坛热门里的一条文字描述。"
  ]
    .filter(Boolean)
    .join("\n");
  const outputStandard = [
    "只总结当前这场直播会话内已经发生的真实记录。",
    "summaryText 必须只生成 1 条 60-90 字中文描述。",
    "这段文字必须同时包含：直播里发生了什么、以及明确的情感/风向倾向。",
    "不要写成列表，不要添加标题，不要解释过程。"
  ].join("\n");
  return [
    negativeBlock,
    `<context_library>\n${contextLibrary || "暂无额外背景。"}\n</context_library>`,
    `<persona_alignment>\n${personaAlignment}\n</persona_alignment>`,
    `<current_state_awareness>\n当前直播真实记录：\n${buildFullLiveSessionHistoryText(120)}\n</current_state_awareness>`,
    `<output_standard>\n${outputStandard}\n</output_standard>`
  ]
    .filter(Boolean)
    .join("\n\n");
}

function buildUserLiveControversialSystemPrompt() {
  const topic = safeTrim(state.liveEntryConfig?.topic || "未命名直播");
  const negativeBlock = buildNegativePromptConstraintBlock(state.settings);
  const outputStandard = [
    "只总结当前这场直播会话内已经发生的真实记录。",
    "controversialTopicText 必须只生成 1 条 60-90 字中文描述。",
    "必须基于直播中的 2-3 句片段或短语做断章取义，并加入偏极端、偏放大的外部解读倾向。",
    "不要写成列表，不要解释你如何断章取义。"
  ].join("\n");
  return [
    negativeBlock,
    `<context_library>\n直播主题：${topic}\n</context_library>`,
    `<persona_alignment>\n你要模拟论坛热门里一条更有争议性的外部讨论，不是客观纪要。\n</persona_alignment>`,
    `<current_state_awareness>\n当前直播真实记录：\n${buildFullLiveSessionHistoryText(120)}\n</current_state_awareness>`,
    `<output_standard>\n${outputStandard}\n</output_standard>`
  ]
    .filter(Boolean)
    .join("\n\n");
}

async function handleGenerateSummaryAndClose() {
  if (state.summaryPending) {
    return;
  }
  const tabId = safeTrim(liveSummaryTabSelectEl?.value || "");
  if (!tabId) {
    setSummaryStatus("请先选择一个论坛页签。", "error");
    return;
  }
  state.summaryPending = true;
  setSummaryButtonsDisabled(true);
  setSummaryStatus("正在总结直播并写入热门…");
  try {
    const summaryResult = await requestLiveStructuredOutput({
      action: "live_user_summary",
      contractName: "live_hot_topic_summary_v1",
      systemPrompt: buildUserLiveSummarySystemPrompt(),
      userInstruction: "请输出当前直播的 1 条热门总结。",
      summary: `直播总结：${state.liveEntryConfig?.topic || "未命名直播"}`
    });
    await writeLiveHotTopic(tabId, summaryResult.summaryText, ["social_update", "fandom_dynamics"]);
    if (liveSummaryControversyEl?.checked) {
      try {
        const controversyResult = await requestLiveStructuredOutput({
          action: "live_user_summary_controversy",
          contractName: "live_controversial_hot_topic_v1",
          systemPrompt: buildUserLiveControversialSystemPrompt(),
          userInstruction: "请输出当前直播的 1 条争议性热门。",
          summary: `直播争议热点：${state.liveEntryConfig?.topic || "未命名直播"}`
        });
        await writeLiveHotTopic(tabId, controversyResult.controversialTopicText, [
          "social_update",
          "public_buzz"
        ]);
      } catch (controversyError) {
        setSummaryStatus(
          `正常总结已写入；争议热点生成失败/未写入：${controversyError?.message || "请稍后重试"}`,
          "error"
        );
        window.setTimeout(() => {
          requestEmbeddedClose();
        }, 900);
        return;
      }
    }
    setSummaryStatus("直播总结已写入热门，正在结束直播…", "success");
    window.setTimeout(() => {
      requestEmbeddedClose();
    }, 420);
  } catch (error) {
    setSummaryStatus(error?.message || "直播总结生成失败。", "error");
  } finally {
    state.summaryPending = false;
    setSummaryButtonsDisabled(false);
  }
}

function handleSaveGuide(targetType = "fans") {
  const text = safeTrim(liveGuideTextEl?.value || "");
  const emotion = safeTrim(liveGuideEmotionEl?.value || "");
  if (!text) {
    setGuideStatus("请先填写引导文本。", "error");
    liveGuideTextEl?.focus();
    return;
  }
  const payload = { text, emotion };
  if (targetType === "role") {
    state.pendingRoleGuide = payload;
    setLiveHint("下一次角色阶段会带上你的引导");
  } else {
    state.pendingFanGuide = payload;
    setLiveHint("下一次粉丝阶段会带上你的引导");
  }
  liveGuideTextEl.value = "";
  liveGuideEmotionEl.value = "";
  setGuideModalOpen(false);
}

function runImmediateNextStage(trigger = "named_comment", latestUserText = "") {
  clearAutoReplyTimer();
  if (state.nextStage === "fans") {
    requestLiveApiReply(trigger, latestUserText);
    return;
  }
  requestRoleHostUpdate(trigger, latestUserText);
}

function handleSendBullet(event) {
  event?.preventDefault();
  const text = safeTrim(liveComposerInputEl?.value || "");
  if (!text) {
    liveComposerInputEl?.focus();
    return;
  }

  if (isContactLiveMode()) {
    if (state.anonymousMode) {
      const viewerId = state.anonymousViewerId || createRandomViewerId();
      state.anonymousViewerId = viewerId;
      createBullet(`${viewerId}：${text}`);
      pushLiveMessage("viewer_anonymous", `${viewerId}：${text}`, {
        trigger: "anonymous_comment",
        meta: { viewerId, anonymous: true }
      });
      setLiveHint("匿名评论已进入会话，不会打断当前节奏");
    } else {
      const userLabel = safeTrim(state.profile?.username || "用户");
      createBullet(`${userLabel}：${text}`, { isUser: true });
      pushLiveMessage("viewer_named", `${userLabel}：${text}`, {
        trigger: "named_comment",
        meta: {
          viewerId: safeTrim(state.profile?.userId || ""),
          isUser: true
        }
      });
      runImmediateNextStage("named_comment", text);
    }
  } else {
    const streamerLabel = safeTrim(state.profile?.username || "我");
    createBullet(`${streamerLabel}（主播）：${text}`, { isUser: true });
    pushLiveMessage("streamer", text, { trigger: "streamer" });
    requestLiveApiReply("streamer", text);
  }

  state.viewers = Math.max(36, state.viewers + 1);
  renderViewerCount();
  liveComposerInputEl.value = "";
  liveComposerInputEl.focus();
}

function bindEvents() {
  liveCloseBtnEl?.addEventListener("click", () => {
    if (isContactLiveMode()) {
      requestEmbeddedClose();
      return;
    }
    setSummaryModalOpen(true);
  });
  liveComposerFormEl?.addEventListener("submit", handleSendBullet);
  liveAnonymousToggleEl?.addEventListener("click", () => {
    state.anonymousMode = !state.anonymousMode;
    renderRoleTools();
  });
  liveGuideBtnEl?.addEventListener("click", () => {
    setGuideModalOpen(true);
  });
  liveGuideCloseBtnEl?.addEventListener("click", () => {
    setGuideModalOpen(false);
  });
  liveGuideCancelBtnEl?.addEventListener("click", () => {
    setGuideModalOpen(false);
  });
  liveGuideFansBtnEl?.addEventListener("click", () => {
    handleSaveGuide("fans");
  });
  liveGuideRoleBtnEl?.addEventListener("click", () => {
    handleSaveGuide("role");
  });
  liveSummaryCloseBtnEl?.addEventListener("click", () => {
    setSummaryModalOpen(false);
  });
  liveSummaryDirectEndBtnEl?.addEventListener("click", () => {
    requestEmbeddedClose();
  });
  liveSummaryGenerateBtnEl?.addEventListener("click", () => {
    handleGenerateSummaryAndClose();
  });
  liveSummaryModalEl?.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }
    if (target.hasAttribute("data-close-live-summary")) {
      setSummaryModalOpen(false);
    }
  });
  liveGuideModalEl?.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }
    if (target.hasAttribute("data-close-live-guide")) {
      setGuideModalOpen(false);
    }
  });
  window.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") {
      return;
    }
    if (state.guideModalOpen) {
      setGuideModalOpen(false);
      return;
    }
    if (state.summaryModalOpen) {
      setSummaryModalOpen(false);
    }
  });
}

function init() {
  document.body.classList.toggle("embedded", isEmbeddedView());
  state.settings = loadSettings();
  state.profile = loadProfile();
  state.contacts = loadContacts();
  state.liveEntryConfig = loadLiveEntryConfig();
  state.hostContact = state.contacts.find(
    (contact) => contact.id === safeTrim(state.liveEntryConfig?.contactId || "")
  ) || null;
  state.anonymousViewerId = createRandomViewerId();
  state.anonymousMode = true;
  state.nextStage = isContactLiveMode() ? "role" : "fans";
  document.body.classList.toggle("live-mode-contact", isContactLiveMode());
  renderHostCard();
  renderHostUpdateCard("");
  renderRoleTools();
  syncCaption();
  startViewerTicker();
  if (isContactLiveMode()) {
    startBulletTicker([]);
  } else {
    seedAmbientBullets();
  }
  setSummaryModalOpen(false);
  setGuideModalOpen(false);
  bindEvents();
  scheduleNextAutoReply(700);
}

init();
