const DEFAULT_OPENAI_ENDPOINT = "https://api.deepseek.com/chat/completions";
const DEFAULT_GROK_ENDPOINT = "https://api.x.ai/v1/chat/completions";
const DEFAULT_GEMINI_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta";
const DEFAULT_DEEPSEEK_MODEL = "deepseek-chat";
const DEFAULT_GROK_MODEL = "grok-4";
const DEFAULT_GEMINI_MODEL = "gemini-2.0-flash";
const DEFAULT_TEMPERATURE = 0.85;
const DEFAULT_LIVE_AUTO_REPLY_INTERVAL_SECONDS = 30;
const PROFILE_KEY = "x_style_generator_profile_v1";
const SETTINGS_KEY = "x_style_generator_settings_v2";
const WORLD_BOOKS_KEY = "x_style_generator_message_worldbooks_v1";
const LIVE_ENTRY_CONFIG_KEY = "x_style_generator_live_entry_config_v1";
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
const liveComposerFormEl = document.querySelector("#live-composer-form");
const liveComposerInputEl = document.querySelector("#live-composer-input");

const state = {
  profile: null,
  settings: null,
  liveEntryConfig: null,
  liveMessages: [],
  queuedRequests: [],
  apiPending: false,
  bulletTimer: 0,
  viewerTimer: 0,
  autoReplyTimer: 0,
  viewers: 0,
  bulletSeq: 0
};

const LIVE_BULLET_LIMIT = 8;
const LIVE_BULLET_LIFETIME_MS = 14000;
const LIVE_HISTORY_LIMIT = 16;

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

function computeViewerEstimate(profile = state.profile) {
  const followers = parseCompactNumber(profile.followers);
  const base = followers > 0 ? Math.max(88, Math.round(followers * 0.018)) : 128;
  const seeded = String(profile.username || "user")
    .split("")
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const jitter = ((seeded + new Date().getDate()) % 36) - 18;
  return Math.max(66, base + jitter);
}

function renderHostCard() {
  const profile = state.profile;
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
  state.liveMessages.push({
    role,
    text: messageText,
    trigger: safeTrim(options.trigger || ""),
    createdAt: Date.now()
  });
  if (state.liveMessages.length > LIVE_HISTORY_LIMIT) {
    state.liveMessages = state.liveMessages.slice(-LIVE_HISTORY_LIMIT);
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
  const profile = state.profile;
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

function seedAmbientBullets() {
  const pool = buildAudienceTextPool();
  pool.slice(0, 4).forEach((item, index) => {
    window.setTimeout(() => createBullet(ensureViewerCommentLine(item)), 240 * index + 120);
  });
  window.clearInterval(state.bulletTimer);
  state.bulletTimer = window.setInterval(() => {
    const next = pool[Math.floor(Math.random() * pool.length)];
    if (next) {
      createBullet(ensureViewerCommentLine(next));
    }
  }, 2600);
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
  const liveTopic = safeTrim(state.liveEntryConfig?.topic || "");
  if (liveCaptionKickerEl) {
    liveCaptionKickerEl.textContent = `${state.profile.username} 正在直播`;
  }
  liveCaptionTitleEl.textContent = liveTopic || "随便聊聊今天的状态";
  if (liveCaptionHintEl) {
    liveCaptionHintEl.textContent = "发送主播内容后，会生成观众弹幕";
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
  const selectedIds = new Set(state.liveEntryConfig.worldbookIds || []);
  const entries = getLiveWorldbookOptions().filter((entry) => selectedIds.has(entry.id));
  if (!entries.length) {
    return "已勾选挂载世界书基础设置，但未选择具体世界书条目。";
  }
  return [
    "挂载世界书：",
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

function buildRecentLiveHistoryText() {
  const items = state.liveMessages.slice(-12);
  if (!items.length) {
    return "当前直播刚开始，还没有真实主播发言或观众弹幕。";
  }
  return items
    .map((item) => {
      const roleLabel =
        item.role === "streamer" || item.role === "host"
          ? "主播发言"
          : item.role === "viewer" || item.role === "user"
            ? "观众弹幕"
            : "系统";
      return `${roleLabel}：${item.text}`;
    })
    .join("\n");
}

function buildLiveSystemPrompt(trigger = "auto", latestUserText = "") {
  const profile = state.profile;
  const config = state.liveEntryConfig || {};
  const selectedForumTab = getSelectedForumTab();
  const forumAudience = safeTrim(selectedForumTab?.audience || "");
  const topic = safeTrim(config.topic || "随便聊聊今天的状态");
  const openingDescription = safeTrim(config.openingDescription || "");
  const negativeBlock = buildNegativePromptConstraintBlock(state.settings);
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
    `直播发起人 / 主播是用户：${profile.username}（${profile.userId}）。`,
    profile.signature ? `主播账号简介：${profile.signature}` : "",
    profile.personaPrompt ? `主播人设与表达参考：${profile.personaPrompt}` : "",
    "你不是主播本人，也不要替主播发言；你要模拟直播间里不同观众的即时弹幕反应。"
  ]
    .filter(Boolean)
    .join("\n");
  const currentStateAwareness = [
    `当前直播主题：${topic}`,
    openingDescription ? `开场画面 / 初始状态：${openingDescription}` : "",
    forumAudience
      ? `当前直播观众定位：${forumAudience}（来自唯一挂载论坛页签「${selectedForumTab.name}」，不要串用其他页签用户定位。）`
      : "",
    latestUserText ? `最新主播发言：${latestUserText}` : "最新主播发言：暂无新的主播发言。",
    `本次触发：${
      trigger === "streamer"
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
    "当前直播主题、初始直播描写和主播的实际发言优先级最高；如果有最新主播发言，先围绕这句话生成观众反应。",
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

function buildLiveUserInstruction(trigger = "auto") {
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

function clearAutoReplyTimer() {
  window.clearTimeout(state.autoReplyTimer);
  state.autoReplyTimer = 0;
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
    requestLiveApiReply("auto", "");
  }, Math.max(1000, intervalMs));
}

async function requestLiveApiReply(trigger = "auto", latestUserText = "") {
  if (state.apiPending) {
    if (trigger === "streamer") {
      state.queuedRequests.push({ trigger, latestUserText: safeTrim(latestUserText) });
    }
    return;
  }

  clearAutoReplyTimer();
  state.apiPending = true;
  setLiveHint("直播间正在刷弹幕…");

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
      `直播：${state.liveEntryConfig?.topic || "未命名直播"} · ${trigger === "streamer" ? "主播发言触发" : "自动弹幕"}`
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

    replyLines.forEach((line, index) => {
      window.setTimeout(() => {
        createBullet(line);
      }, index * 380);
      pushLiveMessage("viewer", line, { trigger });
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
    setLiveHint("发送主播内容后，会生成观众弹幕");
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
      window.setTimeout(() => {
        requestLiveApiReply(nextRequest.trigger, nextRequest.latestUserText);
      }, 300);
    } else {
      scheduleNextAutoReply();
    }
  }
}

function handleSendBullet(event) {
  event?.preventDefault();
  const text = safeTrim(liveComposerInputEl?.value || "");
  if (!text) {
    liveComposerInputEl?.focus();
    return;
  }
  const streamerLabel = safeTrim(state.profile?.username || "我");
  createBullet(`${streamerLabel}（主播）：${text}`, { isUser: true });
  pushLiveMessage("streamer", text, { trigger: "streamer" });
  state.viewers = Math.max(36, state.viewers + 1);
  renderViewerCount();
  liveComposerInputEl.value = "";
  liveComposerInputEl.focus();
  requestLiveApiReply("streamer", text);
}

function bindEvents() {
  liveCloseBtnEl?.addEventListener("click", requestEmbeddedClose);
  liveComposerFormEl?.addEventListener("submit", handleSendBullet);
}

function init() {
  document.body.classList.toggle("embedded", isEmbeddedView());
  state.settings = loadSettings();
  state.profile = loadProfile();
  state.liveEntryConfig = loadLiveEntryConfig();
  renderHostCard();
  syncCaption();
  startViewerTicker();
  seedAmbientBullets();
  bindEvents();
  scheduleNextAutoReply(700);
}

init();
