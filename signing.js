const DEFAULT_OPENAI_ENDPOINT = "https://api.deepseek.com/chat/completions";
const DEFAULT_GROK_ENDPOINT = "https://api.x.ai/v1/chat/completions";
const DEFAULT_GEMINI_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta";
const DEFAULT_DEEPSEEK_MODEL = "deepseek-chat";
const DEFAULT_GROK_MODEL = "grok-4";
const DEFAULT_GEMINI_MODEL = "gemini-2.0-flash";
const DEFAULT_TEMPERATURE = 0.85;
const DEFAULT_SIGNING_SEGMENT_DURATION_MINUTES = 5;
const SIGNING_COOLDOWN_SECONDS = 15;
const LOCAL_STORAGE_API_BASE_URL = "http://localhost:3000";
const DEPLOYED_STORAGE_API_BASE_URL = "https://spring-field-3219.fly.dev";
const PROFILE_KEY = "x_style_generator_profile_v1";
const SETTINGS_KEY = "x_style_generator_settings_v2";
const WORLD_BOOKS_KEY = "x_style_generator_message_worldbooks_v1";
const SIGNING_ENTRY_CONFIG_KEY = "x_style_generator_signing_entry_config_v1";
const SIGNING_SESSION_STATE_KEY = "x_style_generator_signing_session_state_v1";
const SIGNING_SESSION_HISTORY_LIMIT = 260;
const SIGNING_HISTORY_PROMPT_LIMIT = 24;
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

const signingCloseBtnEl = document.querySelector("#signing-close-btn");
const signingRemoteVisualEl = document.querySelector("#signing-remote-visual");
const signingRemoteNameEl = document.querySelector("#signing-remote-name");
const signingRemoteHandleEl = document.querySelector("#signing-remote-handle");
const signingSessionKickerEl = document.querySelector("#signing-session-kicker");
const signingKindBadgeEl = document.querySelector("#signing-kind-badge");
const signingContextBadgeEl = document.querySelector("#signing-context-badge");
const signingCallTimerEl = document.querySelector("#signing-call-timer");
const signingConfigTagsEl = document.querySelector("#signing-config-tags");
const signingLocalPreviewEl = document.querySelector("#signing-local-preview");
const signingHistoryEl = document.querySelector("#signing-history");
const signingStatusHintEl = document.querySelector("#signing-status-hint");
const signingComposerFormEl = document.querySelector("#signing-composer-form");
const signingComposerInputEl = document.querySelector("#signing-composer-input");
const signingSendBtnEl = document.querySelector("#signing-send-btn");
const signingReplyBtnEl = document.querySelector("#signing-reply-btn");
const signingSummaryModalEl = document.querySelector("#signing-summary-modal");
const signingSummaryDescriptionEl = document.querySelector("#signing-summary-description");
const signingSummaryStatusEl = document.querySelector("#signing-summary-status");
const signingSummaryCloseBtnEl = document.querySelector("#signing-summary-close-btn");
const signingSummarySkipBtnEl = document.querySelector("#signing-summary-skip-btn");
const signingSummaryGenerateBtnEl = document.querySelector("#signing-summary-generate-btn");
const signingCooldownOverlayEl = document.querySelector("#signing-cooldown-overlay");
const signingCooldownTimerEl = document.querySelector("#signing-cooldown-timer");
const signingCooldownExitBtnEl = document.querySelector("#signing-cooldown-exit-btn");

const RANDOM_FAN_NAME_POOL = [
  "小满",
  "阿柚",
  "眠眠",
  "阿卷",
  "小岛",
  "栀栀",
  "莓莓",
  "阿朝",
  "小澄",
  "晚晚"
];

const RANDOM_FAN_TRAIT_POOL = [
  "第一次来线下签售，有点紧张但特别激动",
  "平时更爱潜水，这次为了签售特地抢到资格",
  "会认真记住细节，回去后大概率会写长评",
  "讲话会有一点跳跃，情绪上来时容易连着追问",
  "对活动流程很敏感，会注意时间和现场氛围",
  "本来准备了问题，但见到本人时会有点卡壳",
  "更在意当下的情绪回应和真实感，不喜欢太客套",
  "容易因为一个小动作或一句接话就被安抚到"
];

const state = {
  profile: null,
  settings: null,
  signingEntryConfig: null,
  personaPool: [],
  personaPoolTabId: "",
  currentFan: null,
  currentSegmentId: "",
  segmentStatus: "connecting",
  segmentEndsAt: 0,
  cooldownEndsAt: 0,
  pendingSummaryFan: null,
  usedSeedIds: [],
  history: [],
  sessionId: "",
  configSignature: "",
  apiPending: false,
  summaryPending: false,
  pendingReminder: false,
  pendingSegmentEnd: false,
  lastMinuteReminderTriggered: false,
  lastRandomFanKey: "",
  timerId: 0,
  summaryModalOpen: false,
  summaryStatusMessage: "",
  summaryStatusTone: ""
};

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

function safeRemoveItem(key) {
  delete memoryStorage[key];
  try {
    window.localStorage.removeItem(key);
    return true;
  } catch (_error) {
    return false;
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

function normalizeStringArray(value = []) {
  const source = Array.isArray(value) ? value : [];
  const unique = [];
  const seen = new Set();
  source.forEach((item) => {
    const normalized = safeTrim(item);
    if (!normalized || seen.has(normalized)) {
      return;
    }
    seen.add(normalized);
    unique.push(normalized);
  });
  return unique;
}

function normalizeObjectArray(value) {
  return Array.isArray(value) ? value.filter((item) => item && typeof item === "object") : [];
}

function hashText(value = "") {
  const text = String(value || "");
  let hash = 0;
  for (let index = 0; index < text.length; index += 1) {
    hash = (hash * 31 + text.charCodeAt(index)) >>> 0;
  }
  return hash.toString(36);
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

function clampNumber(value, min, max, fallback = min) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) {
    return fallback;
  }
  return Math.min(max, Math.max(min, numeric));
}

function normalizeApiMode(mode) {
  return mode === "gemini" || mode === "generic" || mode === "grok" ? mode : "openai";
}

function isOpenAICompatibleMode(mode) {
  const resolvedMode = normalizeApiMode(mode);
  return resolvedMode === "openai" || resolvedMode === "grok";
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

function normalizeTemperature(value, fallback = DEFAULT_TEMPERATURE) {
  const parsed = Number.parseFloat(value);
  if (!Number.isFinite(parsed)) {
    return fallback;
  }
  return Math.min(2, Math.max(0, parsed));
}

function normalizeApiConfigToken(token) {
  return safeTrim(token);
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
      hotTopic: safeTrim(rawHotTopic)
    };
  });
}

function getSigningContextPresetOptions() {
  return [
    { id: "endorsement_signing", label: "代言签售" },
    { id: "album_signing", label: "专辑签售" },
    { id: "fanmeeting_signing", label: "见面会签售" }
  ];
}

function getSigningPresetLabel(presetId = "") {
  return (
    getSigningContextPresetOptions().find((item) => item.id === safeTrim(presetId))?.label ||
    "签售"
  );
}

function getSigningForumOptions() {
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

function getSigningWorldbookOptions() {
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
  const validWorldbookIds = new Set(getSigningWorldbookOptions().map((item) => item.id));
  return normalizeStringArray(value).filter((item) => validWorldbookIds.has(item));
}

function buildWorldbookContextFromIds(entryIds = [], options = {}) {
  const resolvedIds = normalizeWorldbookIds(entryIds);
  const entries = getSigningWorldbookOptions().filter((entry) => resolvedIds.includes(entry.id));
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

function normalizeSigningSegmentDurationMinutes(
  value,
  fallback = DEFAULT_SIGNING_SEGMENT_DURATION_MINUTES
) {
  const parsed = Number.parseInt(String(value ?? fallback), 10);
  if (!Number.isFinite(parsed)) {
    return fallback;
  }
  return Math.min(30, Math.max(1, parsed));
}

function normalizeSigningEntryConfig(source = {}) {
  const raw = source && typeof source === "object" ? source : {};
  const presetOptions = getSigningContextPresetOptions();
  const validPresetIds = new Set(presetOptions.map((item) => item.id));
  const forumOptions = getSigningForumOptions();
  const validForumIds = new Set(forumOptions.map((item) => item.id));
  const fallbackForumId = forumOptions[0]?.id || "entertainment";
  const resolvedForumId = safeTrim(
    raw.forumTabId ||
      raw.forumTab ||
      (Array.isArray(raw.forumTabIds) ? raw.forumTabIds[0] : "") ||
      fallbackForumId
  );
  const contextPreset = safeTrim(raw.contextPreset || raw.preset);
  return {
    contextPreset: validPresetIds.has(contextPreset) ? contextPreset : presetOptions[0].id,
    contextText: safeTrim(raw.contextText || raw.description || raw.openingDescription || ""),
    segmentDurationMinutes: normalizeSigningSegmentDurationMinutes(
      raw.segmentDurationMinutes || raw.durationMinutes || raw.signingDurationMinutes,
      DEFAULT_SIGNING_SEGMENT_DURATION_MINUTES
    ),
    forumEnabled: Boolean(raw.forumEnabled),
    forumTabId: validForumIds.has(resolvedForumId) ? resolvedForumId : fallbackForumId,
    worldbookEnabled: Boolean(raw.worldbookEnabled),
    worldbookIds: normalizeWorldbookIds(raw.worldbookIds),
    updatedAt: Number.isFinite(Number(raw.updatedAt)) ? Number(raw.updatedAt) : 0
  };
}

function loadSigningEntryConfig() {
  return normalizeSigningEntryConfig(readStoredJson(SIGNING_ENTRY_CONFIG_KEY, {}) || {});
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
  const config = state.signingEntryConfig || {};
  if (!config.forumEnabled) {
    return null;
  }
  return (
    normalizeCustomTabs((state.settings || loadSettings()).customTabs).find(
      (tab) => tab.id === config.forumTabId
    ) || null
  );
}

function buildSigningForumContextText() {
  const config = state.signingEntryConfig || {};
  if (!config.forumEnabled) {
    return "";
  }
  const selectedTab = getSelectedForumTab();
  if (!selectedTab) {
    return "已挂载默认论坛首页。";
  }
  return [
    `挂载论坛页签：${selectedTab.name}`,
    selectedTab.audience ? `页签用户定位：${selectedTab.audience}` : "",
    selectedTab.discussionText ? `页签长期讨论背景：${truncateText(selectedTab.discussionText, 520)}` : "",
    selectedTab.hotTopic ? `页签热门参考：${truncateText(selectedTab.hotTopic, 360)}` : ""
  ]
    .filter(Boolean)
    .join("\n");
}

function buildSigningWorldbookContextText() {
  if (!state.signingEntryConfig?.worldbookEnabled) {
    return "";
  }
  return buildWorldbookContextFromIds(state.signingEntryConfig.worldbookIds, {
    emptyText: "已勾选挂载世界书基础设置，但未选择具体世界书条目。"
  });
}

function resolveSigningStorageApiBaseUrl() {
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

function buildSigningStorageApiUrl(pathname = "/api/health") {
  const baseUrl = resolveSigningStorageApiBaseUrl();
  return new URL(String(pathname || "").replace(/^\/+/, ""), `${baseUrl}/`).toString();
}

async function requestSigningStorageApi(pathname, options = {}) {
  const response = await fetch(buildSigningStorageApiUrl(pathname), {
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
  const config = resolvedBase.apiConfigs.find((item) => item.id === safeTrim(configId));
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

function resolveSigningSummaryApiSettings() {
  const settings = state.settings || loadSettings();
  if (settings.summaryApiEnabled && settings.summaryApiConfigId) {
    return resolveApiSettingsFromConfig(settings, settings.summaryApiConfigId);
  }
  return settings;
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

function buildSigningRequestBody(settings, systemPrompt, userInstruction) {
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
    intent: "signing_reply"
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

function buildSigningApiLogBase(action, settings, endpoint, prompt, requestBody, summary = "") {
  const mode = normalizeApiMode(settings.mode);
  return {
    source: "signing",
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
  const hint = safeTrim(window.PulseStructuredOutput?.getPromptHint?.(context) || "");
  return hint ? [safeTrim(text), hint].filter(Boolean).join("\n\n") : String(text || "");
}

function parseStructuredOutputPayload(payload, context = null) {
  if (!window.PulseStructuredOutput?.parseStructuredResponse) {
    return null;
  }
  return window.PulseStructuredOutput.parseStructuredResponse(payload, context);
}

function buildAvatarMarkup(image = "", fallback = "", className = "") {
  return image
    ? `<img src="${escapeHtml(image)}" alt="${escapeHtml(fallback)} 的头像" class="${escapeHtml(className)}" />`
    : `<span>${escapeHtml(fallback)}</span>`;
}

function formatSeedStanceProfile(value = null) {
  if (typeof value === "string") {
    return safeTrim(value);
  }
  if (!value || typeof value !== "object") {
    return "";
  }
  const entries = Object.entries(value)
    .map(([key, val]) => `${safeTrim(key)}:${safeTrim(val)}`)
    .filter((item) => !item.endsWith(":"));
  return entries.join("；");
}

function normalizeFanSnapshot(source = {}) {
  const raw = source && typeof source === "object" ? source : {};
  const kind = safeTrim(raw.kind) === "seed" ? "seed" : "random";
  const displayName = safeTrim(raw.displayName || raw.name || (kind === "seed" ? "论坛粉丝" : "随机粉丝"));
  const handle = safeTrim(raw.handle || raw.userId || "");
  return {
    kind,
    id: safeTrim(raw.id || `${kind}_${hashText(`${displayName}-${handle}`)}`),
    displayName,
    handle,
    avatarImage: safeTrim(raw.avatarImage || ""),
    avatarText: safeTrim(raw.avatarText || "") || getAvatarFallback(displayName),
    personaPrompt: safeTrim(raw.personaPrompt || ""),
    speakingTone: safeTrim(raw.speakingTone || ""),
    hotStancePrompt: safeTrim(raw.hotStancePrompt || ""),
    stanceProfile: safeTrim(raw.stanceProfile || ""),
    knowledgeLevel: safeTrim(raw.knowledgeLevel || ""),
    enteredForumAt: safeTrim(raw.enteredForumAt || ""),
    interestTags: normalizeStringArray(raw.interestTags),
    avoidTags: normalizeStringArray(raw.avoidTags),
    profileText: safeTrim(raw.profileText || ""),
    sourceTabId: safeTrim(raw.sourceTabId || ""),
    sourceTabName: safeTrim(raw.sourceTabName || "")
  };
}

function normalizeSigningMessage(item = {}, index = 0) {
  const source = item && typeof item === "object" ? item : {};
  const role = safeTrim(source.role) === "fan" ? "fan" : safeTrim(source.role) === "system" ? "system" : "user";
  return {
    id: safeTrim(source.id || `signing_message_${Date.now()}_${index}`),
    segmentId: safeTrim(source.segmentId || ""),
    fanId: safeTrim(source.fanId || ""),
    fanKind: safeTrim(source.fanKind) === "seed" ? "seed" : "random",
    role,
    text: safeTrim(source.text || ""),
    trigger: safeTrim(source.trigger || ""),
    createdAt: Number(source.createdAt) || Date.now()
  };
}

function normalizeSigningSessionState(source = {}) {
  const raw = source && typeof source === "object" ? source : {};
  const history = normalizeObjectArray(raw.history)
    .map((item, index) => normalizeSigningMessage(item, index))
    .filter((item) => item.segmentId && item.text);
  const segmentStatus = ["connecting", "active", "awaiting_summary", "cooldown"].includes(
    safeTrim(raw.segmentStatus)
  )
    ? safeTrim(raw.segmentStatus)
    : "connecting";
  return {
    sessionId: safeTrim(raw.sessionId || `signing_session_${Date.now()}`),
    configSignature: safeTrim(raw.configSignature || ""),
    currentSegmentId: safeTrim(raw.currentSegmentId || ""),
    segmentStatus,
    segmentEndsAt: Number(raw.segmentEndsAt) || 0,
    cooldownEndsAt: Number(raw.cooldownEndsAt) || 0,
    usedSeedIds: normalizeStringArray(raw.usedSeedIds),
    currentFan: raw.currentFan ? normalizeFanSnapshot(raw.currentFan) : null,
    pendingSummaryFan: raw.pendingSummaryFan ? normalizeFanSnapshot(raw.pendingSummaryFan) : null,
    history: history.slice(-SIGNING_SESSION_HISTORY_LIMIT)
  };
}

function loadSigningSessionState() {
  return normalizeSigningSessionState(readStoredJson(SIGNING_SESSION_STATE_KEY, {}) || {});
}

function persistSigningSessionState() {
  const payload = {
    sessionId: state.sessionId,
    configSignature: state.configSignature,
    currentSegmentId: state.currentSegmentId,
    segmentStatus: state.segmentStatus,
    segmentEndsAt: state.segmentEndsAt,
    cooldownEndsAt: state.cooldownEndsAt,
    usedSeedIds: state.usedSeedIds,
    currentFan: state.currentFan,
    pendingSummaryFan: state.pendingSummaryFan,
    history: state.history.slice(-SIGNING_SESSION_HISTORY_LIMIT)
  };
  safeSetItem(SIGNING_SESSION_STATE_KEY, JSON.stringify(payload));
}

function clearSigningSessionState() {
  safeRemoveItem(SIGNING_SESSION_STATE_KEY);
}

function buildConfigSignature(config = state.signingEntryConfig) {
  return hashText(JSON.stringify(normalizeSigningEntryConfig(config || {})));
}

function shouldStartFreshSigningSession() {
  const referrer = safeTrim(document.referrer || "");
  if (!referrer) {
    return false;
  }
  try {
    const referrerUrl = new URL(referrer);
    const pathname = safeTrim(referrerUrl.pathname || "");
    return pathname.endsWith("/index.html") || pathname === "/" || pathname === "";
  } catch (_error) {
    return referrer.includes("index.html");
  }
}

function formatDurationClock(ms = 0, { includeHours = false } = {}) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  if (includeHours || hours > 0) {
    return [hours, minutes, seconds].map((item) => String(item).padStart(2, "0")).join(":");
  }
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function getCurrentSegmentMessages() {
  if (!state.currentSegmentId) {
    return [];
  }
  return state.history.filter((item) => item.segmentId === state.currentSegmentId);
}

function getLatestCurrentSegmentUserText() {
  const message = [...getCurrentSegmentMessages()].reverse().find((item) => item.role === "user");
  return safeTrim(message?.text || "");
}

function appendSegmentMessage(role, text, options = {}) {
  const messageText = safeTrim(text);
  if (!messageText) {
    return null;
  }
  const item = normalizeSigningMessage({
    id: `signing_msg_${Date.now()}_${hashText(`${role}_${messageText}`)}`,
    segmentId: state.currentSegmentId,
    fanId: state.currentFan?.id || "",
    fanKind: state.currentFan?.kind || "random",
    role,
    text: messageText,
    trigger: options.trigger || "",
    createdAt: Date.now()
  });
  state.history.push(item);
  if (state.history.length > SIGNING_SESSION_HISTORY_LIMIT) {
    state.history = state.history.slice(-SIGNING_SESSION_HISTORY_LIMIT);
  }
  persistSigningSessionState();
  renderHistory();
  return item;
}

function setSigningHint(message = "") {
  if (!signingStatusHintEl) {
    return;
  }
  signingStatusHintEl.textContent =
    safeTrim(message) ||
    "接通后会由粉丝先开口，之后你可以发送消息，再点击“回应”获取下一轮。";
}

function setSummaryStatus(message = "", tone = "") {
  state.summaryStatusMessage = safeTrim(message);
  state.summaryStatusTone = safeTrim(tone);
  if (!signingSummaryStatusEl) {
    return;
  }
  signingSummaryStatusEl.textContent = state.summaryStatusMessage;
  signingSummaryStatusEl.className = "signing-modal__status";
  if (state.summaryStatusTone) {
    signingSummaryStatusEl.classList.add(`is-${state.summaryStatusTone}`);
  }
}

function setSummaryButtonsDisabled(disabled) {
  if (signingSummarySkipBtnEl) {
    signingSummarySkipBtnEl.disabled = Boolean(disabled);
  }
  if (signingSummaryGenerateBtnEl) {
    signingSummaryGenerateBtnEl.disabled = Boolean(disabled);
  }
}

function canInteract() {
  return (
    state.segmentStatus === "active" &&
    !state.apiPending &&
    !state.summaryPending &&
    !state.summaryModalOpen
  );
}

function syncComposerAvailability() {
  const disabled = !canInteract();
  if (signingComposerInputEl) {
    signingComposerInputEl.disabled = disabled;
  }
  if (signingSendBtnEl) {
    signingSendBtnEl.disabled = disabled;
  }
  if (signingReplyBtnEl) {
    signingReplyBtnEl.disabled = disabled;
  }
}

function lookupForumTabName(tabId = "") {
  const resolvedTabId = safeTrim(tabId);
  if (!resolvedTabId) {
    return "默认论坛首页";
  }
  return (
    getSigningForumOptions().find((item) => item.id === resolvedTabId)?.name || "默认论坛首页"
  );
}

function renderRemoteVisual() {
  const fan = state.currentFan;
  signingRemoteNameEl.textContent = fan?.displayName || "下一位粉丝";
  signingRemoteHandleEl.textContent = fan?.handle || "@fan";
  if (signingRemoteVisualEl) {
    signingRemoteVisualEl.innerHTML = fan?.avatarImage
      ? `<img src="${escapeHtml(fan.avatarImage)}" alt="${escapeHtml(fan.displayName || "粉丝")} 的画面" />`
      : `<div class="signing-video-stage__remote-fallback">${escapeHtml(
          fan?.avatarText || "签"
        )}</div>`;
  }
  const presetLabel = getSigningPresetLabel(state.signingEntryConfig?.contextPreset);
  if (signingContextBadgeEl) {
    signingContextBadgeEl.textContent = presetLabel;
  }
  if (signingKindBadgeEl) {
    signingKindBadgeEl.textContent = fan?.kind === "seed" ? "Seed 粉丝" : "随机粉丝";
  }
  if (signingSessionKickerEl) {
    if (state.segmentStatus === "cooldown") {
      signingSessionKickerEl.textContent = "准备接入下一位粉丝";
    } else if (state.segmentStatus === "awaiting_summary") {
      signingSessionKickerEl.textContent = "本轮签售已结束";
    } else if (state.segmentStatus === "active") {
      signingSessionKickerEl.textContent =
        fan?.kind === "seed" ? "Seed 粉丝签售中" : "随机粉丝签售中";
    } else {
      signingSessionKickerEl.textContent = "正在连接下一位粉丝";
    }
  }
}

function renderLocalPreview() {
  signingLocalPreviewEl.innerHTML = buildAvatarMarkup(
    state.profile?.avatarImage,
    state.profile?.avatar || getAvatarFallback(state.profile?.username),
    ""
  );
}

function renderTimer() {
  let text = formatDurationClock(
    state.signingEntryConfig?.segmentDurationMinutes * 60 * 1000 || DEFAULT_SIGNING_SEGMENT_DURATION_MINUTES * 60000
  );
  if (state.segmentStatus === "active" || state.segmentStatus === "awaiting_summary") {
    text = formatDurationClock(Math.max(0, state.segmentEndsAt - Date.now()));
  }
  if (signingCallTimerEl) {
    signingCallTimerEl.textContent = text;
  }
  if (signingCooldownTimerEl) {
    signingCooldownTimerEl.textContent = formatDurationClock(
      Math.max(0, state.cooldownEndsAt - Date.now())
    );
  }
}

function renderConfigTags() {
  if (!signingConfigTagsEl) {
    return;
  }
  const tags = [];
  if (state.signingEntryConfig?.forumEnabled) {
    tags.push(`论坛 · ${lookupForumTabName(state.signingEntryConfig.forumTabId)}`);
  }
  if (state.signingEntryConfig?.worldbookEnabled) {
    const selectedCount = getSigningWorldbookOptions().filter((item) =>
      state.signingEntryConfig.worldbookIds.includes(item.id)
    ).length;
    tags.push(selectedCount ? `世界书 · ${selectedCount} 条` : "世界书 · 已开启");
  }
  tags.push(`单粉丝 · ${state.signingEntryConfig?.segmentDurationMinutes || DEFAULT_SIGNING_SEGMENT_DURATION_MINUTES} 分钟`);
  signingConfigTagsEl.hidden = !tags.length;
  signingConfigTagsEl.innerHTML = tags
    .map((item) => `<span class="signing-config-tag">${escapeHtml(item)}</span>`)
    .join("");
}

function renderHistory() {
  if (!signingHistoryEl) {
    return;
  }
  const items = getCurrentSegmentMessages();
  if (!items.length) {
    let placeholder = "接通后会由粉丝先开口。";
    if (state.segmentStatus === "connecting") {
      placeholder = "正在连接这位粉丝…";
    } else if (state.segmentStatus === "cooldown") {
      placeholder = "本轮签售已结束，正在切换下一位粉丝。";
    } else if (state.apiPending) {
      placeholder = "正在等待粉丝回应…";
    }
    signingHistoryEl.innerHTML = `<div class="signing-history-empty">${escapeHtml(placeholder)}</div>`;
    return;
  }
  signingHistoryEl.innerHTML = items
    .map(
      (item) => `
        <div class="signing-message signing-message--${escapeHtml(item.role)}">${escapeHtml(item.text)}</div>
      `
    )
    .join("");
  signingHistoryEl.scrollTop = signingHistoryEl.scrollHeight;
}

function renderSummaryModal() {
  if (!signingSummaryModalEl) {
    return;
  }
  const tabName = lookupForumTabName(state.signingEntryConfig?.forumTabId);
  const fanName = state.pendingSummaryFan?.displayName || state.currentFan?.displayName || "这位粉丝";
  if (signingSummaryDescriptionEl) {
    signingSummaryDescriptionEl.textContent = `如果生成，会把 ${fanName} 这段签售的感想正文写入「${tabName}」的 discussion，不显示粉丝身份。`;
  }
  signingSummaryModalEl.hidden = !state.summaryModalOpen;
  signingSummaryModalEl.setAttribute("aria-hidden", state.summaryModalOpen ? "false" : "true");
  setSummaryStatus(state.summaryStatusMessage, state.summaryStatusTone);
}

function renderCooldownOverlay() {
  if (!signingCooldownOverlayEl) {
    return;
  }
  const open = state.segmentStatus === "cooldown";
  signingCooldownOverlayEl.hidden = !open;
  signingCooldownOverlayEl.setAttribute("aria-hidden", open ? "false" : "true");
}

function renderAll() {
  renderRemoteVisual();
  renderLocalPreview();
  renderTimer();
  renderConfigTags();
  renderHistory();
  renderSummaryModal();
  renderCooldownOverlay();
  syncComposerAvailability();
}

function formatSigningHistoryForPrompt(limit = SIGNING_HISTORY_PROMPT_LIMIT) {
  const items = getCurrentSegmentMessages().slice(-Math.max(1, limit));
  if (!items.length) {
    return "当前这位粉丝刚接通，还没有真实互动记录。";
  }
  return items
    .map((item) => {
      const label = item.role === "fan" ? "粉丝" : item.role === "system" ? "系统" : "用户";
      return `${label}：${item.text}`;
    })
    .join("\n");
}

function buildCurrentFanPersonaBlock(fan = state.currentFan) {
  if (!fan) {
    return "当前尚未选定粉丝。";
  }
  if (fan.kind === "seed") {
    return [
      `这位粉丝来自挂载论坛页签的人设池。`,
      `名字：${fan.displayName}`,
      fan.handle ? `账号：${fan.handle}` : "",
      fan.personaPrompt ? `稳定人设：${fan.personaPrompt}` : "",
      fan.speakingTone ? `说话风格：${fan.speakingTone}` : "",
      fan.hotStancePrompt ? `讨论倾向：${fan.hotStancePrompt}` : "",
      fan.stanceProfile ? `立场补充：${fan.stanceProfile}` : "",
      fan.knowledgeLevel ? `熟悉度：${fan.knowledgeLevel}` : "",
      fan.enteredForumAt ? `进入论坛时间：${fan.enteredForumAt}` : "",
      fan.interestTags.length ? `关注标签：${fan.interestTags.join("、")}` : "",
      fan.avoidTags.length ? `避开标签：${fan.avoidTags.join("、")}` : ""
    ]
      .filter(Boolean)
      .join("\n");
  }
  return [
    "这位粉丝是本场临时生成的随机粉丝，不带论坛历史身份。",
    `名字：${fan.displayName}`,
    fan.handle ? `账号：${fan.handle}` : "",
    fan.profileText ? `当前粉丝画像：${fan.profileText}` : ""
  ]
    .filter(Boolean)
    .join("\n");
}

function buildSigningSystemPrompt(kind = "reply", latestUserText = "") {
  const fan = state.currentFan;
  const presetLabel = getSigningPresetLabel(state.signingEntryConfig?.contextPreset);
  const negativeBlock = buildNegativePromptConstraintBlock(state.settings);
  const remainingMs = Math.max(0, state.segmentEndsAt - Date.now());
  const contextLibrary = [
    `当前签售背景：${presetLabel}`,
    state.signingEntryConfig?.contextText
      ? `签售背景补充：${state.signingEntryConfig.contextText}`
      : "",
    buildSigningForumContextText(),
    buildSigningWorldbookContextText()
  ]
    .filter(Boolean)
    .join("\n\n");
  const personaAlignment = [
    "这不是角色私聊，也不是论坛发帖，而是一场用户本人正在进行的视频签售互动。",
    `签售主角 / 被签售的人是用户：${state.profile.username}（${state.profile.userId}）。`,
    state.profile.personaPrompt ? `用户对外人设 / 表达参考：${state.profile.personaPrompt}` : "",
    state.profile.signature ? `用户公开简介：${state.profile.signature}` : "",
    "你现在只能扮演当前被接入的这位粉丝本人，不要切换成工作人员、主持人、系统旁白或其他观众。",
    buildCurrentFanPersonaBlock(fan)
  ]
    .filter(Boolean)
    .join("\n");
  const currentStateAwareness = [
    `当前阶段：${kind === "opening" ? "粉丝刚接通视频签售，需要主动开口" : kind === "last_minute" ? "工作人员刚提醒时间快结束，需要自然带出赶时间和收尾情绪" : "粉丝正在继续和用户对话"}`,
    `当前这一位粉丝单独签售剩余时间：${formatDurationClock(remainingMs)}`,
    latestUserText ? `用户刚刚说的话：${latestUserText}` : "",
    kind === "last_minute" ? "工作人员刚提醒：这段签售只剩不到 1 分钟了。你要自然体现这种时间压力，但不要把自己写成工作人员。" : "",
    "当前这位粉丝的真实互动记录：",
    formatSigningHistoryForPrompt()
  ]
    .filter(Boolean)
    .join("\n");
  const outputStandard = [
    "你的输出必须像当前这位粉丝在视频签售里自然说出来的话。",
    "不要写旁白、动作描述、镜头调度、系统提示或工作人员播报。",
    "可以有情绪、停顿和口语化表达，但仍然要像即时对话。",
    "每一行代表一条单独发送的消息，总行数不超过 6 行。",
    "不要输出 JSON、Markdown、编号、列表或解释性文字。",
    kind === "opening"
      ? "这一轮必须像粉丝刚接通视频签售后主动开口，不要等用户先问。"
      : "这一轮要直接接住用户刚刚的话，而不是重复背景事实。",
    kind === "last_minute"
      ? "要自然带出赶时间、舍不得、想抓紧补一句的感觉，但不要套固定告别模板。"
      : ""
  ]
    .filter(Boolean)
    .join("\n");
  return [
    negativeBlock,
    `<context_library>\n${contextLibrary || "暂无额外背景。"}\n</context_library>`,
    `<persona_alignment>\n${personaAlignment}\n</persona_alignment>`,
    `<current_state_awareness>\n${currentStateAwareness}\n</current_state_awareness>`,
    `<output_standard>\n${outputStandard}\n</output_standard>`
  ]
    .filter(Boolean)
    .join("\n\n");
}

function buildSigningUserInstruction(kind = "reply", latestUserText = "") {
  if (kind === "opening") {
    return "请让这位粉丝像刚接通视频签售一样，主动自然开口。";
  }
  if (kind === "last_minute") {
    return "请让这位粉丝在时间快结束的状态下，自然继续对话并带出收尾情绪。";
  }
  return latestUserText
    ? "请让这位粉丝直接接住用户刚刚的话，继续自然对话。"
    : "请让这位粉丝继续自然对话。";
}

function parseReplyLineCandidates(text = "") {
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
      return parsed.map((item) => (typeof item === "string" ? item : item?.text || item?.content || ""));
    }
    if (Array.isArray(parsed?.items)) {
      return parsed.items.map((item) => (typeof item === "string" ? item : item?.text || item?.content || ""));
    }
    if (Array.isArray(parsed?.messages)) {
      return parsed.messages.map((item) => (typeof item === "string" ? item : item?.text || item?.content || ""));
    }
  } catch (_error) {
  }
  return raw.split(/\r?\n/g);
}

function parseSigningReplyLines(text = "") {
  return parseReplyLineCandidates(text)
    .map((line) =>
      safeTrim(
        String(line || "")
          .replace(/^\d+[\).、]\s*/, "")
          .replace(/^[-*•]\s*/, "")
          .replace(/^(AI|assistant|Assistant|粉丝|Fan)\s*[：:]/i, "")
      )
    )
    .filter(Boolean)
    .slice(0, 6);
}

async function requestSigningAssistantTurn(kind = "reply", latestUserText = "") {
  if (!state.currentFan || state.segmentStatus !== "active") {
    return;
  }
  if (state.apiPending) {
    if (kind === "last_minute") {
      state.pendingReminder = true;
      persistSigningSessionState();
    } else {
      setSigningHint("上一条回复还在返回中…");
    }
    return;
  }
  state.apiPending = true;
  syncComposerAvailability();
  setSigningHint(
    kind === "opening"
      ? "这位粉丝正在接通…"
      : kind === "last_minute"
        ? "工作人员提醒后，粉丝正在抓紧说最后几句…"
        : "粉丝正在回应你…"
  );

  state.settings = loadSettings();
  const settings = state.settings;
  const requestEndpoint = resolveApiRequestEndpoint(settings);
  const systemPrompt = buildSigningSystemPrompt(kind, latestUserText);
  const userInstruction = buildSigningUserInstruction(kind, latestUserText);
  const privacySession = createPrivacySession({
    settings,
    profile: state.profile,
    signingEntryConfig: state.signingEntryConfig,
    currentFan: state.currentFan,
    signingMessages: getCurrentSegmentMessages(),
    systemPrompt,
    userInstruction
  });
  const encodedSystemPrompt = preparePromptWithPrivacy(systemPrompt, privacySession);
  const encodedInstruction = encodeTextWithPrivacy(userInstruction, privacySession);
  const requestBody = buildSigningRequestBody(settings, encodedSystemPrompt, encodedInstruction);
  const logBase = applyPrivacyToLogEntry(
    buildSigningApiLogBase(
      `signing_${kind}`,
      settings,
      requestEndpoint,
      [encodedSystemPrompt, encodedInstruction].join("\n\n"),
      requestBody,
      `签售：${getSigningPresetLabel(state.signingEntryConfig?.contextPreset)} · ${state.currentFan.displayName}`
    ),
    privacySession
  );
  let succeeded = false;
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
        errorMessage: `签售请求失败：HTTP ${response.status}`
      });
      logged = true;
      throw new Error(`签售请求失败：HTTP ${response.status}`);
    }
    const decodedText = decodeTextWithPrivacy(resolveMessage(payload), privacySession);
    const replyLines = parseSigningReplyLines(decodedText);
    if (!replyLines.length) {
      appendApiLog({
        ...logBase,
        ...buildGeminiLogFields(settings, payload),
        status: "error",
        statusCode: response.status,
        responseText: rawResponse,
        responseBody: payload,
        errorMessage: "签售回复为空。"
      });
      logged = true;
      throw new Error("签售回复为空。");
    }
    replyLines.forEach((line) => {
      appendSegmentMessage("fan", line, { trigger: kind });
    });
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
    succeeded = true;
    if (kind === "last_minute") {
      setSigningHint("已经进入最后一分钟，可以再说几句就准备切场。");
    } else {
      setSigningHint("你可以继续发送消息，再点击“回应”获取下一轮。");
    }
  } catch (error) {
    if (!logged) {
      appendApiLog({
        ...logBase,
        status: "error",
        errorMessage: error?.message || "签售请求失败。"
      });
    }
    setSigningHint(error?.message || "签售请求失败，请稍后再试。");
    if (kind !== "last_minute") {
      appendSegmentMessage(
        "system",
        kind === "opening" ? "系统：接通失败，请点击“回应”重试。" : "系统：回复失败，请稍后再试。",
        { trigger: "system_error" }
      );
    }
  } finally {
    state.apiPending = false;
    syncComposerAvailability();
    renderTimer();
    if (state.pendingSegmentEnd && !succeeded) {
      endCurrentSegment();
      return;
    }
    if (state.pendingSegmentEnd) {
      endCurrentSegment();
      return;
    }
    if (
      state.pendingReminder &&
      state.segmentStatus === "active" &&
      Math.max(0, state.segmentEndsAt - Date.now()) > 0
    ) {
      state.pendingReminder = false;
      requestSigningAssistantTurn("last_minute", getLatestCurrentSegmentUserText());
      return;
    }
    persistSigningSessionState();
    renderAll();
  }
}

function createSeedFanFromPersona(persona = {}) {
  const source = persona && typeof persona === "object" ? persona : {};
  const displayName = safeTrim(source.displayName || source.name || "论坛粉丝");
  return normalizeFanSnapshot({
    kind: "seed",
    id: safeTrim(source.id || `seed_${hashText(displayName)}`),
    displayName,
    handle: safeTrim(source.handle || ""),
    avatarText: getAvatarFallback(displayName),
    personaPrompt: safeTrim(source.personaPrompt || ""),
    speakingTone: safeTrim(source.speakingTone || ""),
    hotStancePrompt: safeTrim(source.hotStancePrompt || ""),
    stanceProfile: formatSeedStanceProfile(source.stanceProfile),
    knowledgeLevel: safeTrim(source.knowledgeLevel || ""),
    enteredForumAt: safeTrim(source.enteredForumAt || ""),
    interestTags: normalizeStringArray(source.interestTags),
    avoidTags: normalizeStringArray(source.avoidTags),
    sourceTabId: safeTrim(state.signingEntryConfig?.forumTabId || ""),
    sourceTabName: lookupForumTabName(state.signingEntryConfig?.forumTabId || "")
  });
}

function createRandomSigningFan() {
  let handle = "";
  let key = "";
  let displayName = "";
  let guard = 0;
  do {
    displayName = RANDOM_FAN_NAME_POOL[Math.floor(Math.random() * RANDOM_FAN_NAME_POOL.length)];
    const suffix = Math.random().toString(36).slice(2, 6);
    handle = `@u${Math.floor(1000 + Math.random() * 9000)}${suffix}`;
    key = `${displayName}_${handle}`;
    guard += 1;
  } while (key === state.lastRandomFanKey && guard < 6);
  state.lastRandomFanKey = key;
  const shuffledTraits = [...RANDOM_FAN_TRAIT_POOL].sort(() => Math.random() - 0.5).slice(0, 2);
  return normalizeFanSnapshot({
    kind: "random",
    id: `random_${hashText(key)}_${Date.now()}`,
    displayName,
    handle,
    avatarText: getAvatarFallback(displayName),
    profileText: shuffledTraits.join("；")
  });
}

async function ensurePersonaPoolLoaded(force = false) {
  const config = state.signingEntryConfig || {};
  const targetTabId = safeTrim(config.forumTabId || "");
  if (!config.forumEnabled || !targetTabId) {
    state.personaPool = [];
    state.personaPoolTabId = "";
    return [];
  }
  if (!force && state.personaPoolTabId === targetTabId && state.personaPool.length) {
    return state.personaPool;
  }
  try {
    const payload = await requestSigningStorageApi(
      `/api/forum/personas?tabId=${encodeURIComponent(targetTabId)}`
    );
    state.personaPool = normalizeObjectArray(payload.personas || []);
    state.personaPoolTabId = targetTabId;
  } catch (error) {
    state.personaPool = [];
    state.personaPoolTabId = targetTabId;
    setSigningHint(`论坛 persona 读取失败，已回退随机粉丝：${error?.message || "请稍后重试"}`);
  }
  return state.personaPool;
}

async function pickNextSigningFan() {
  const config = state.signingEntryConfig || {};
  const personaPool = await ensurePersonaPoolLoaded();
  const unusedSeeds = config.forumEnabled
    ? personaPool.filter((persona) => !state.usedSeedIds.includes(safeTrim(persona.id || "")))
    : [];
  const shouldUseSeed = Boolean(unusedSeeds.length && Math.random() < 0.6);
  if (shouldUseSeed) {
    const selected = unusedSeeds[Math.floor(Math.random() * unusedSeeds.length)];
    const fan = createSeedFanFromPersona(selected);
    state.usedSeedIds = [...new Set([...state.usedSeedIds, fan.id])];
    return fan;
  }
  return createRandomSigningFan();
}

function canGenerateSummaryForFan(fan = state.currentFan) {
  return Boolean(
    fan &&
      fan.kind === "seed" &&
      state.signingEntryConfig?.forumEnabled &&
      safeTrim(state.signingEntryConfig?.forumTabId || "")
  );
}

async function startNextSegment() {
  state.segmentStatus = "connecting";
  state.summaryModalOpen = false;
  state.pendingSummaryFan = null;
  state.summaryPending = false;
  state.pendingReminder = false;
  state.pendingSegmentEnd = false;
  state.lastMinuteReminderTriggered = false;
  setSummaryStatus("");
  setSigningHint("正在连接下一位粉丝…");
  renderAll();
  persistSigningSessionState();
  const fan = await pickNextSigningFan();
  state.currentFan = fan;
  state.currentSegmentId = `segment_${Date.now()}_${hashText(fan.id)}`;
  state.segmentStatus = "active";
  state.segmentEndsAt =
    Date.now() +
    normalizeSigningSegmentDurationMinutes(
      state.signingEntryConfig?.segmentDurationMinutes,
      DEFAULT_SIGNING_SEGMENT_DURATION_MINUTES
    ) *
      60 *
      1000;
  state.cooldownEndsAt = 0;
  persistSigningSessionState();
  renderAll();
  requestSigningAssistantTurn("opening", "");
}

function startCooldown() {
  state.segmentStatus = "cooldown";
  state.summaryModalOpen = false;
  state.pendingSummaryFan = null;
  state.summaryPending = false;
  state.cooldownEndsAt = Date.now() + SIGNING_COOLDOWN_SECONDS * 1000;
  setSummaryStatus("");
  setSigningHint("本轮签售已结束，正在准备下一位粉丝…");
  persistSigningSessionState();
  renderAll();
}

function endCurrentSegment() {
  if (!state.currentFan || state.segmentStatus === "cooldown" || state.segmentStatus === "awaiting_summary") {
    return;
  }
  if (state.apiPending) {
    state.pendingSegmentEnd = true;
    setSigningHint("当前粉丝时间已到，正在等待这轮回复完成…");
    renderAll();
    return;
  }
  state.pendingSegmentEnd = false;
  if (canGenerateSummaryForFan()) {
    state.segmentStatus = "awaiting_summary";
    state.pendingSummaryFan = { ...state.currentFan };
    state.summaryModalOpen = true;
    setSummaryStatus("");
    setSigningHint("这位粉丝的签售时间已结束。请选择是否生成签后感想。");
    persistSigningSessionState();
    renderAll();
    return;
  }
  startCooldown();
}

async function requestSigningStructuredOutput({
  action = "signing_summary",
  contractName = "",
  systemPrompt = "",
  userInstruction = "",
  summary = ""
} = {}) {
  const settings = resolveSigningSummaryApiSettings();
  const requestEndpoint = resolveApiRequestEndpoint(settings);
  const structuredContext = createStructuredOutputContext(settings, contractName);
  const privacySession = createPrivacySession({
    settings,
    profile: state.profile,
    signingEntryConfig: state.signingEntryConfig,
    currentFan: state.pendingSummaryFan || state.currentFan,
    signingMessages: getCurrentSegmentMessages(),
    systemPrompt,
    userInstruction
  });
  const encodedSystemPrompt = preparePromptWithPrivacy(systemPrompt, privacySession);
  const encodedInstruction = encodeTextWithPrivacy(
    appendStructuredOutputPromptHint(userInstruction, structuredContext),
    privacySession
  );
  let requestBody = buildSigningRequestBody(settings, encodedSystemPrompt, encodedInstruction);
  requestBody = decorateRequestBodyWithStructuredOutput(requestBody, structuredContext);
  const logBase = applyPrivacyToLogEntry(
    buildSigningApiLogBase(
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
      errorMessage: `签售结构化请求失败：HTTP ${response.status}`
    });
    throw new Error(`签售结构化请求失败：HTTP ${response.status}`);
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
    errorMessage: parsed ? "" : "签售结构化输出解析失败。"
  });
  if (!parsed) {
    throw new Error("AI 已返回内容，但没有生成可解析的结构化结果。");
  }
  return parsed;
}

function buildSigningSummarySystemPrompt() {
  const fan = state.pendingSummaryFan || state.currentFan;
  const presetLabel = getSigningPresetLabel(state.signingEntryConfig?.contextPreset);
  const negativeBlock = buildNegativePromptConstraintBlock(state.settings);
  const contextLibrary = [
    `当前签售背景：${presetLabel}`,
    state.signingEntryConfig?.contextText
      ? `签售背景补充：${state.signingEntryConfig.contextText}`
      : "",
    buildSigningForumContextText(),
    buildSigningWorldbookContextText()
  ]
    .filter(Boolean)
    .join("\n\n");
  const personaAlignment = [
    "你现在要把当前这一段签售互动，整理成论坛页签 discussion 里的 1 段签后感想正文。",
    "这段内容要保留粉丝视角的真实感受，但最终只写正文，不要署名，不要出现粉丝名字、账号或自我介绍。",
    buildCurrentFanPersonaBlock(fan)
  ]
    .filter(Boolean)
    .join("\n");
  const outputStandard = [
    "只总结当前这一位粉丝刚刚完成的这段签售真实记录，不要拼接其他粉丝。",
    "discussionText 必须只生成 1 段中文正文，建议控制在 70-140 字。",
    "内容可以包含签售里的细节、当下情绪、签后体验和主观感受。",
    "不要写标题、不要写署名、不要写列表，不要出现这位粉丝的身份信息。"
  ].join("\n");
  return [
    negativeBlock,
    `<context_library>\n${contextLibrary || "暂无额外背景。"}\n</context_library>`,
    `<persona_alignment>\n${personaAlignment}\n</persona_alignment>`,
    `<current_state_awareness>\n当前这位粉丝刚刚完成的签售真实记录：\n${formatSigningHistoryForPrompt(
      40
    )}\n</current_state_awareness>`,
    `<output_standard>\n${outputStandard}\n</output_standard>`
  ]
    .filter(Boolean)
    .join("\n\n");
}

async function writeSigningReviewToDiscussion(tabId = "", contentText = "", fan = null) {
  const resolvedTabId = safeTrim(tabId);
  const text = safeTrim(contentText);
  if (!resolvedTabId || !text) {
    throw new Error("缺少签售感想的写入目标。");
  }
  return requestSigningStorageApi("/api/forum/tab-content/items", {
    method: "POST",
    body: JSON.stringify({
      tabId: resolvedTabId,
      bucket: "discussion",
      contentText: text,
      discussionDate: new Date().toISOString().slice(0, 10),
      topicTags: ["offline_sighting", "fandom_dynamics"],
      metadata: {
        source: "signing_review",
        signingMode: "single_segment_loop",
        seedPersonaId: safeTrim(fan?.id || ""),
        contextPreset: safeTrim(state.signingEntryConfig?.contextPreset || "")
      }
    })
  });
}

async function handleGenerateSummaryAndContinue() {
  if (state.summaryPending || !state.pendingSummaryFan) {
    return;
  }
  state.summaryPending = true;
  setSummaryButtonsDisabled(true);
  setSummaryStatus("正在生成签后感想…");
  try {
    const result = await requestSigningStructuredOutput({
      action: "signing_seed_review",
      contractName: "signing_seed_review_v1",
      systemPrompt: buildSigningSummarySystemPrompt(),
      userInstruction: "请输出当前这位 seed 粉丝的签后感想 discussion 正文。",
      summary: `签售感想：${state.pendingSummaryFan.displayName || "seed 粉丝"}`
    });
    await writeSigningReviewToDiscussion(
      state.signingEntryConfig?.forumTabId || "",
      result.discussionText,
      state.pendingSummaryFan
    );
    setSummaryStatus("签后感想已写入 discussion，准备接入下一位粉丝。", "success");
    window.setTimeout(() => {
      startCooldown();
    }, 280);
  } catch (error) {
    setSummaryStatus(error?.message || "签后感想生成失败。", "error");
  } finally {
    state.summaryPending = false;
    setSummaryButtonsDisabled(false);
    persistSigningSessionState();
    renderSummaryModal();
    syncComposerAvailability();
  }
}

function handleSkipSummaryAndContinue() {
  if (state.summaryPending) {
    return;
  }
  startCooldown();
}

function finishSigningSession() {
  window.clearInterval(state.timerId);
  clearSigningSessionState();
  requestEmbeddedClose();
}

function tickSessionClock() {
  renderTimer();
  if (state.segmentStatus === "active") {
    const remaining = Math.max(0, state.segmentEndsAt - Date.now());
    if (remaining <= 60000 && !state.lastMinuteReminderTriggered) {
      state.lastMinuteReminderTriggered = true;
      if (state.apiPending) {
        state.pendingReminder = true;
      } else {
        requestSigningAssistantTurn("last_minute", getLatestCurrentSegmentUserText());
      }
      persistSigningSessionState();
    }
    if (remaining <= 0) {
      endCurrentSegment();
    }
  }
  if (state.segmentStatus === "cooldown" && Date.now() >= state.cooldownEndsAt) {
    startNextSegment();
  }
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

function computeOpeningHint() {
  const fan = state.currentFan;
  if (!fan) {
    return "正在准备签售…";
  }
  return fan.kind === "seed"
    ? `${fan.displayName} 已接入，这位是来自挂载页签的 seed 粉丝。`
    : `${fan.displayName} 已接入，这位是随机生成的粉丝。`;
}

function hydrateStateFromSession(sessionState = null) {
  const session = sessionState || loadSigningSessionState();
  state.sessionId = session.sessionId || `signing_session_${Date.now()}`;
  state.configSignature = buildConfigSignature(state.signingEntryConfig);
  state.currentSegmentId = session.currentSegmentId;
  state.segmentStatus = session.segmentStatus;
  state.segmentEndsAt = session.segmentEndsAt;
  state.cooldownEndsAt = session.cooldownEndsAt;
  state.usedSeedIds = session.usedSeedIds;
  state.currentFan = session.currentFan;
  state.pendingSummaryFan = session.pendingSummaryFan;
  state.history = session.history;
  state.summaryModalOpen = session.segmentStatus === "awaiting_summary" && Boolean(session.pendingSummaryFan);
  state.summaryPending = false;
  state.pendingReminder = false;
  state.pendingSegmentEnd = false;
  state.lastMinuteReminderTriggered = Math.max(0, state.segmentEndsAt - Date.now()) <= 60000;
  setSummaryStatus("");
  if (state.currentFan && state.segmentStatus === "active") {
    setSigningHint("你可以继续发送消息，再点击“回应”获取下一轮。");
  }
}

async function bootstrapSigningSession() {
  state.profile = loadProfile();
  state.settings = loadSettings();
  state.signingEntryConfig = loadSigningEntryConfig();
  renderLocalPreview();
  const savedSession = loadSigningSessionState();
  const currentSignature = buildConfigSignature(state.signingEntryConfig);
  const canResume =
    Boolean(savedSession.currentSegmentId) &&
    savedSession.configSignature === currentSignature &&
    !shouldStartFreshSigningSession();

  if (canResume) {
    hydrateStateFromSession(savedSession);
    renderAll();
    if (!state.currentFan || !state.currentSegmentId) {
      await startNextSegment();
      return;
    }
    if (state.segmentStatus === "awaiting_summary") {
      setSigningHint("这位粉丝的签售时间已结束。请选择是否生成签后感想。");
      return;
    }
    if (state.segmentStatus === "cooldown") {
      setSigningHint("本轮签售已结束，正在准备下一位粉丝…");
      return;
    }
    if (!getCurrentSegmentMessages().length) {
      setSigningHint("正在重新连接这位粉丝…");
      requestSigningAssistantTurn("opening", "");
      return;
    }
    setSigningHint("你可以继续发送消息，再点击“回应”获取下一轮。");
    return;
  }

  clearSigningSessionState();
  state.sessionId = `signing_session_${Date.now()}`;
  state.configSignature = currentSignature;
  state.currentFan = null;
  state.currentSegmentId = "";
  state.segmentStatus = "connecting";
  state.segmentEndsAt = 0;
  state.cooldownEndsAt = 0;
  state.pendingSummaryFan = null;
  state.usedSeedIds = [];
  state.history = [];
  state.summaryModalOpen = false;
  state.summaryPending = false;
  state.pendingReminder = false;
  state.pendingSegmentEnd = false;
  state.lastMinuteReminderTriggered = false;
  setSummaryStatus("");
  setSigningHint("正在准备签售…");
  renderAll();
  await startNextSegment();
  setSigningHint(computeOpeningHint());
}

function handleSend(event) {
  event?.preventDefault();
  if (!canInteract()) {
    return;
  }
  const text = safeTrim(signingComposerInputEl?.value || "");
  if (!text) {
    signingComposerInputEl?.focus();
    return;
  }
  appendSegmentMessage("user", text, { trigger: "user_send" });
  signingComposerInputEl.value = "";
  signingComposerInputEl.focus();
  setSigningHint("消息已发送，点击“回应”获取粉丝下一轮回复。");
}

function handleReply() {
  if (!canInteract()) {
    return;
  }
  requestSigningAssistantTurn("reply", getLatestCurrentSegmentUserText());
}

function bindEvents() {
  signingCloseBtnEl?.addEventListener("click", () => {
    finishSigningSession();
  });
  signingComposerFormEl?.addEventListener("submit", handleSend);
  signingReplyBtnEl?.addEventListener("click", handleReply);
  signingSummaryCloseBtnEl?.addEventListener("click", handleSkipSummaryAndContinue);
  signingSummarySkipBtnEl?.addEventListener("click", handleSkipSummaryAndContinue);
  signingSummaryGenerateBtnEl?.addEventListener("click", handleGenerateSummaryAndContinue);
  signingSummaryModalEl?.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }
    if (target.hasAttribute("data-close-signing-summary")) {
      handleSkipSummaryAndContinue();
    }
  });
  signingCooldownExitBtnEl?.addEventListener("click", () => {
    finishSigningSession();
  });
}

async function init() {
  document.body.classList.toggle("embedded", isEmbeddedView());
  bindEvents();
  renderLocalPreview();
  renderAll();
  await bootstrapSigningSession();
  window.clearInterval(state.timerId);
  state.timerId = window.setInterval(tickSessionClock, 1000);
}

init();
