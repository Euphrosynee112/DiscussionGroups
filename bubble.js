const DEFAULT_OPENAI_ENDPOINT = "https://api.deepseek.com/chat/completions";
const DEFAULT_GEMINI_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta";
const DEFAULT_DEEPSEEK_MODEL = "deepseek-chat";
const DEFAULT_GEMINI_MODEL = "gemini-2.0-flash";
const SETTINGS_KEY = "x_style_generator_settings_v2";
const PROFILE_KEY = "x_style_generator_profile_v1";
const PROFILE_POSTS_KEY = "x_style_generator_profile_posts_v1";
const WORLD_BOOKS_KEY = "x_style_generator_message_worldbooks_v1";
const DIRECT_MESSAGES_KEY = "x_style_generator_direct_messages_v1";
const BUBBLE_ROOMS_KEY = "x_style_generator_bubble_rooms_v1";
const BUBBLE_THREADS_KEY = "x_style_generator_bubble_threads_v1";
const BUBBLE_FAN_DETAILS_KEY = "x_style_generator_bubble_fan_details_v1";
const DEFAULT_TEMPERATURE = 0.8;
const FAN_DETAIL_REPLY_COUNT = 15;

const DEFAULT_SETTINGS = {
  mode: "openai",
  endpoint: DEFAULT_OPENAI_ENDPOINT,
  token: "",
  model: DEFAULT_DEEPSEEK_MODEL,
  apiConfigs: [],
  activeApiConfigId: "",
  translationApiEnabled: false,
  translationApiConfigId: "",
  bubblePromptSettings: {
    hotTopicsEnabled: false,
    hotTopicsTabId: "",
    hotTopicsIncludeDiscussionText: true,
    hotTopicsIncludeHotTopic: false,
    worldbookEnabled: false,
    worldbookIds: []
  }
};

const DEFAULT_PROFILE = {
  avatar: "WG",
  avatarImage: "",
  username: "Worldview Generator",
  userId: "@worldview_lab",
  signature: "长期主义、产品洞察、AI 讨论。",
  personaPrompt:
    "这个用户理性、克制、对产品与内容趋势敏感，说话直接但不失礼貌，偏爱长期主义和结构化表达。"
};

const FAN_EMOJI_POOL = [
  "🥺",
  "🥹",
  "🫧",
  "🫶",
  "💖",
  "✨",
  "🍓",
  "🦋",
  "🍀",
  "🐣",
  "🧸",
  "🌷",
  "🌊",
  "🧊",
  "🪄",
  "🍥",
  "💫",
  "🪷"
];

const FAN_AVATAR_POOL = ["🦄", "🐥", "🌴", "🦦", "🦙", "🪐", "🐯", "🐰", "🐼", "🐬"];

const bubbleListEl = document.querySelector("#bubble-list");
const bubbleStatusEl = document.querySelector("#bubble-status");
const bubbleSearchBtn = document.querySelector("#bubble-search-btn");
const bubbleClearBtn = document.querySelector("#bubble-clear-btn");
const bubbleSearchWrapEl = document.querySelector("#bubble-search-wrap");
const bubbleSearchInput = document.querySelector("#bubble-search-input");
const bubbleEmbeddedCloseBtn = document.querySelector("#bubble-embedded-close-btn");
const bubbleChatModalEl = document.querySelector("#bubble-chat-modal");
const bubbleChatRoomNameEl = document.querySelector("#bubble-chat-room-name");
const bubbleChatBackBtn = document.querySelector("#bubble-chat-back-btn");
const bubbleChatMoreBtn = document.querySelector("#bubble-chat-more-btn");
const bubbleChatHistoryEl = document.querySelector("#bubble-chat-history");
const bubbleFanActionWrapEl = document.querySelector("#bubble-fan-action-wrap");
const bubbleAcceptFanBtn = document.querySelector("#bubble-accept-fan-btn");
const bubbleChatForm = document.querySelector("#bubble-chat-form");
const bubbleChatInput = document.querySelector("#bubble-chat-input");
const bubbleChatPlusBtn = document.querySelector("#bubble-chat-plus-btn");
const bubbleChatLoadingOverlayEl = document.querySelector("#bubble-chat-loading-overlay");
const bubbleChatSettingsModalEl = document.querySelector("#bubble-chat-settings-modal");
const bubbleChatSettingsCloseBtn = document.querySelector("#bubble-chat-settings-close-btn");
const bubbleChatSettingsFormEl = document.querySelector("#bubble-chat-settings-form");
const bubbleChatHotTopicsInputEl = document.querySelector("#bubble-chat-hot-topics-input");
const bubbleChatHotTopicsTabSelectEl = document.querySelector("#bubble-chat-hot-topics-tab-select");
const bubbleChatHotTopicsTextInputEl = document.querySelector("#bubble-chat-hot-topics-text-input");
const bubbleChatHotTopicsTopicInputEl = document.querySelector("#bubble-chat-hot-topics-topic-input");
const bubbleChatHotTopicsWarningEl = document.querySelector("#bubble-chat-hot-topics-warning");
const bubbleChatWorldbookInputEl = document.querySelector("#bubble-chat-worldbook-enabled-input");
const bubbleChatWorldbookListEl = document.querySelector("#bubble-chat-worldbook-list");
const bubbleChatSettingsStatusEl = document.querySelector("#bubble-chat-settings-status");
const bubbleFanDetailModalEl = document.querySelector("#bubble-fan-detail-modal");
const bubbleFanDetailCloseBtn = document.querySelector("#bubble-fan-detail-close-btn");
const bubbleFanDetailMoreBtn = document.querySelector("#bubble-fan-detail-more-btn");
const bubbleFanDetailStatusEl = document.querySelector("#bubble-fan-detail-status");
const bubbleFanDetailListEl = document.querySelector("#bubble-fan-detail-list");

const memoryStorage = {};

const state = {
  profile: loadProfile(),
  settings: loadSettings(),
  worldbooks: loadWorldbooks(),
  rooms: [],
  threads: {},
  fanDetails: {},
  searchOpen: false,
  query: "",
  chatOpen: false,
  chatSettingsOpen: false,
  activeRoomId: "",
  activeFanDetailId: "",
  loadingFanDetailId: "",
  translatingFanReplyIds: {}
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

function showLayer(element, displayValue = "block") {
  if (!element) {
    return;
  }
  element.hidden = false;
  element.setAttribute("aria-hidden", "false");
  element.style.display = displayValue;
}

function hideLayer(element) {
  if (!element) {
    return;
  }
  element.hidden = true;
  element.setAttribute("aria-hidden", "true");
  element.style.display = "none";
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

function safeRemoveItem(key) {
  try {
    window.localStorage.removeItem(key);
  } catch (_error) {
    delete memoryStorage[key];
  }
}

function hashText(value) {
  const text = String(value || "");
  let hash = 0;
  for (let index = 0; index < text.length; index += 1) {
    hash = (hash * 31 + text.charCodeAt(index)) >>> 0;
  }
  return hash.toString(36);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function truncate(text, length = 46) {
  const normalized = String(text || "").trim();
  if (normalized.length <= length) {
    return normalized;
  }
  return `${normalized.slice(0, length - 1)}…`;
}

function truncateFanReply(text, length = 50) {
  const normalized = String(text || "").trim().replace(/\s+/g, " ");
  if (normalized.length <= length) {
    return normalized;
  }
  return normalized.slice(0, length);
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

function formatBubbleTimestamp(value = Date.now()) {
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

function resolveBubbleTimeLabel(value, createdAt = Date.now()) {
  const text = String(value || "").trim();
  if (text) {
    return text;
  }
  return formatBubbleTimestamp(createdAt);
}

function appendApiLog(entry) {
  try {
    window.PulseApiLog?.append?.(entry);
  } catch (_error) {
  }
}

function buildBubbleApiLogBase(action, settings, endpoint, prompt, requestBody, summary = "") {
  const mode = normalizeApiMode(settings.mode);
  return {
    source: "bubble",
    action,
    summary,
    endpoint,
    mode,
    model: mode === "generic" ? "" : settings.model || getDefaultModelByMode(mode),
    prompt,
    requestBody
  };
}

function setBubbleStatus(message, tone = "") {
  if (!bubbleStatusEl) {
    return;
  }
  bubbleStatusEl.textContent = message;
  bubbleStatusEl.className = "bubble-status";
  if (tone) {
    bubbleStatusEl.classList.add(tone);
  }
}

function setFanDetailStatus(message, tone = "") {
  if (!bubbleFanDetailStatusEl) {
    return;
  }
  bubbleFanDetailStatusEl.textContent = message;
  bubbleFanDetailStatusEl.className = "bubble-fan-detail-status";
  if (tone) {
    bubbleFanDetailStatusEl.classList.add(tone);
  }
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

function normalizeMountedIds(value) {
  if (Array.isArray(value)) {
    return [...new Set(value.map((item) => String(item || "").trim()).filter(Boolean))];
  }
  const single = String(value || "").trim();
  return single ? [single] : [];
}

function normalizeBubblePromptSettings(source = {}) {
  const resolved = source && typeof source === "object" ? source : {};
  return {
    hotTopicsEnabled: Boolean(resolved.hotTopicsEnabled),
    hotTopicsTabId: String(resolved.hotTopicsTabId || "").trim(),
    hotTopicsIncludeDiscussionText:
      typeof resolved.hotTopicsIncludeDiscussionText === "boolean"
        ? resolved.hotTopicsIncludeDiscussionText
        : true,
    hotTopicsIncludeHotTopic: Boolean(resolved.hotTopicsIncludeHotTopic),
    worldbookEnabled: Boolean(resolved.worldbookEnabled),
    worldbookIds: normalizeMountedIds(resolved.worldbookIds || [])
  };
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
          text: ""
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
        text: String(rawDiscussionText || "").trim()
      };
    })
    .filter(Boolean);
}

function getAvailableCustomTabs(settings = loadSettings()) {
  return normalizeCustomTabs(settings.customTabs || []);
}

function buildNormalizedSettingsSnapshot(source, options = {}) {
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
  merged.apiConfigs = normalizeApiConfigs(
    merged.apiConfigs || source?.apiPresets || source?.apiProfiles || []
  );
  merged.bubblePromptSettings = normalizeBubblePromptSettings(
    merged.bubblePromptSettings || source?.bubblePromptSettings || {}
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
    }
  }

  if (!merged.apiConfigs.some((item) => item.id === merged.translationApiConfigId)) {
    merged.translationApiConfigId = "";
    merged.translationApiEnabled = false;
  }
  merged.translationApiEnabled = Boolean(
    merged.translationApiEnabled && merged.translationApiConfigId
  );
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

function getCurrentSettings() {
  state.settings = loadSettings();
  return { ...state.settings };
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

function buildJsonArrayRequestBody(settings, prompt, count = FAN_DETAIL_REPLY_COUNT) {
  const mode = normalizeApiMode(settings.mode);
  if (mode === "openai") {
    return {
      model: settings.model || DEFAULT_DEEPSEEK_MODEL,
      temperature: DEFAULT_TEMPERATURE,
      messages: [
        {
          role: "system",
          content: "你只输出 JSON 数组，不要输出额外解释。"
        },
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
      systemInstruction: {
        parts: [{ text: "你只输出 JSON 数组，不要输出额外解释。" }]
      },
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }]
        }
      ],
      generationConfig: {
        temperature: DEFAULT_TEMPERATURE
      }
    };
  }

  return {
    prompt,
    count,
    temperature: DEFAULT_TEMPERATURE,
    format: "json-array"
  };
}

function buildTranslatePrompt(sourceText) {
  return [
    "请把下面内容翻译成中文，保留原意、语气和换行，不要添加解释。",
    sourceText
  ].join("\n\n");
}

function buildTranslateRequestBody(settings, prompt) {
  const mode = normalizeApiMode(settings.mode);
  if (mode === "openai") {
    return {
      model: settings.model || DEFAULT_DEEPSEEK_MODEL,
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
    throw new Error(errorMessage || originalError.message);
  }
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
    }
  }

  resolvedText = resolvedText
    .replace(/^["'`“”]+/, "")
    .replace(/["'`“”]+$/, "")
    .trim();
  return resolvedText || fallbackText;
}

function inferReplyLanguage(text) {
  const source = String(text || "");
  if (/[\u3040-\u30ff]/.test(source)) {
    return "ja";
  }
  if (/[\uac00-\ud7af]/.test(source)) {
    return "ko";
  }
  if (/[a-z]/i.test(source) && !/[\u4e00-\u9fff]/.test(source)) {
    return "en";
  }
  return "zh";
}

function normalizeReplyLanguage(language, text = "") {
  const normalized = String(language || "").trim().toLowerCase();
  if (normalized === "zh" || normalized === "ja" || normalized === "en" || normalized === "ko") {
    return normalized;
  }
  return inferReplyLanguage(text);
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

async function requestJsonArrayText(settings, prompt, count = FAN_DETAIL_REPLY_COUNT) {
  const requestEndpoint = validateApiSettings(settings, "粉丝回复生成");
  const requestBody = buildJsonArrayRequestBody(settings, prompt, count);
  const logBase = buildBubbleApiLogBase(
    "fan_reply_generate",
    settings,
    requestEndpoint,
    prompt,
    requestBody,
    `请求生成 ${count} 条粉丝回复`
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

    const message = resolveMessage(payload);
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
      summary: `已返回粉丝回复原始文本 ${message.length} 字符`
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

async function requestTranslatedText(settings, sourceText) {
  const originalText = String(sourceText || "").trim();
  if (!originalText) {
    return "";
  }

  const requestEndpoint = validateApiSettings(settings, "翻译");
  const prompt = buildTranslatePrompt(originalText);
  const requestBody = buildTranslateRequestBody(settings, prompt);
  const logBase = buildBubbleApiLogBase(
    "fan_reply_translate",
    settings,
    requestEndpoint,
    prompt,
    requestBody,
    `翻译粉丝回复：${truncateFanReply(originalText, 36)}`
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
      status: "success",
      statusCode: response.status,
      responseText: rawResponse,
      responseBody: payload,
      summary: `翻译完成：${truncateFanReply(translated, 36)}`
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

function loadProfilePosts() {
  const raw = safeGetItem(PROFILE_POSTS_KEY);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (_error) {
    return [];
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
  return {
    id: String(source.id || `worldbook_entry_${index}_${hashText(name)}`),
    name: name.slice(0, 40),
    text: String(source.text || "").trim(),
    categoryId: categories.some((item) => item.id === categoryId) ? categoryId : "",
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

function getWorldbookEntryById(entryId = "") {
  return state.worldbooks.entries.find((item) => item.id === entryId) || null;
}

function getWorldbookCategoryById(categoryId = "") {
  return state.worldbooks.categories.find((item) => item.id === categoryId) || null;
}

function loadDirectMessages() {
  const raw = safeGetItem(DIRECT_MESSAGES_KEY);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (_error) {
    return [];
  }
}

function getAvatarFallback(profile) {
  const avatarText = String(profile.avatar || "").trim();
  if (avatarText) {
    return avatarText.slice(0, 2);
  }
  const username = String(profile.username || DEFAULT_PROFILE.username).trim();
  return username.slice(0, 1).toUpperCase() || DEFAULT_PROFILE.avatar;
}

function resolveBubblePreview(profile, directMessages, profilePosts) {
  const latestProfilePost = [...profilePosts]
    .reverse()
    .find((item) => item && typeof item === "object" && String(item.text || "").trim());
  if (latestProfilePost) {
    return {
      text: truncate(latestProfilePost.text, 52),
      time: formatLocalTime()
    };
  }

  const latestDirectMessage = directMessages.find(
    (item) => item && typeof item === "object" && String(item.text || "").trim()
  );
  if (latestDirectMessage) {
    return {
      text: truncate(latestDirectMessage.text, 52),
      time:
        /^\d{1,2}:\d{2}$/.test(String(latestDirectMessage.time || "").trim())
          ? String(latestDirectMessage.time).trim()
          : formatLocalTime()
    };
  }

  return {
    text: truncate(profile.signature || DEFAULT_PROFILE.signature, 52),
    time: formatLocalTime()
  };
}

function createDefaultBubbleRooms(profile = loadProfile()) {
  return [
    {
      id: "bubble_profile_room",
      name: String(profile.username || DEFAULT_PROFILE.username).trim() || DEFAULT_PROFILE.username,
      avatarImage: String(profile.avatarImage || "").trim(),
      avatarText: getAvatarFallback(profile),
      preview: "还没有 Bubble 消息。",
      time: formatLocalTime(),
      updatedAt: Date.now()
    }
  ];
}

function normalizeBubbleRooms(rooms, profile = loadProfile()) {
  const source = Array.isArray(rooms) ? rooms.filter((item) => item && typeof item === "object") : [];
  const baseRoom = createDefaultBubbleRooms(profile)[0];
  if (!source.length) {
    return [baseRoom];
  }

  const firstRoom = source[0];
  return [
    {
      id: String(firstRoom.id || baseRoom.id),
      name: String(profile.username || firstRoom.name || baseRoom.name).trim() || baseRoom.name,
      avatarImage: String(profile.avatarImage || firstRoom.avatarImage || "").trim(),
      avatarText: getAvatarFallback(profile),
      preview: truncate(firstRoom.preview || baseRoom.preview, 52) || baseRoom.preview,
      time:
        /^\d{1,2}:\d{2}$/.test(String(firstRoom.time || "").trim())
          ? String(firstRoom.time).trim()
          : baseRoom.time,
      updatedAt: Number(firstRoom.updatedAt) || Date.now()
    }
  ];
}

function loadBubbleRooms() {
  const raw = safeGetItem(BUBBLE_ROOMS_KEY);
  if (!raw) {
    return createDefaultBubbleRooms(loadProfile());
  }

  try {
    return normalizeBubbleRooms(JSON.parse(raw), loadProfile());
  } catch (_error) {
    return createDefaultBubbleRooms(loadProfile());
  }
}

function persistBubbleRooms() {
  safeSetItem(BUBBLE_ROOMS_KEY, JSON.stringify(state.rooms));
}

function pickUniqueEmojis(count = 6, seed = "") {
  const pool = [...FAN_EMOJI_POOL];
  const picked = [];
  let cursorSeed = hashText(`${seed}-${Date.now()}`);
  while (picked.length < count && pool.length) {
    const index =
      Math.abs(Number.parseInt(cursorSeed.slice(0, 6), 36) || Math.floor(Math.random() * 1000)) %
      pool.length;
    const [emoji] = pool.splice(index, 1);
    picked.push(emoji);
    cursorSeed = hashText(`${cursorSeed}-${picked.length}`);
  }
  return picked;
}

function buildEmojiFallbackSet(source = "") {
  return pickUniqueEmojis(6, source || "fan");
}

function normalizeBubbleMessage(message, index = 0) {
  const role = message?.role === "fan" ? "fan" : "user";
  if (role === "fan") {
    const emojiSet = Array.isArray(message?.emojiSet)
      ? message.emojiSet.map((item) => String(item || "").trim()).filter(Boolean)
      : [];
    const resolvedEmojiSet = emojiSet.length ? emojiSet.slice(0, 6) : buildEmojiFallbackSet(`${index}`);
    return {
      id: String(message?.id || `fan_placeholder_${index}_${Date.now()}`),
      role,
      time: resolveBubbleTimeLabel(message?.time, message?.createdAt),
      emojiSet: resolvedEmojiSet,
      detailId:
        String(message?.detailId || "").trim() ||
        `fan_detail_${Date.now()}_${hashText(`${index}-${resolvedEmojiSet.join("")}`)}`,
      parentMessageId: String(message?.parentMessageId || "").trim(),
      createdAt: Number(message?.createdAt) || Date.now()
    };
  }

  return {
    id: String(message?.id || `bubble_msg_${index}_${Date.now()}`),
    role,
    text: String(message?.text || "").trim(),
    time: resolveBubbleTimeLabel(message?.time, message?.createdAt),
    createdAt: Number(message?.createdAt) || Date.now()
  };
}

function createDefaultThread(roomId) {
  return {
    roomId,
    pendingFanReply: false,
    messages: []
  };
}

function normalizeThread(thread, roomId) {
  const source = thread && typeof thread === "object" ? thread : {};
  const messages = Array.isArray(source.messages)
    ? source.messages.map((item, index) => normalizeBubbleMessage(item, index))
    : [];
  return {
    roomId,
    pendingFanReply: Boolean(source.pendingFanReply),
    messages
  };
}

function loadBubbleThreads() {
  const raw = safeGetItem(BUBBLE_THREADS_KEY);
  if (!raw) {
    return {};
  }

  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") {
      return {};
    }
    return Object.fromEntries(
      Object.entries(parsed).map(([roomId, thread]) => [roomId, normalizeThread(thread, roomId)])
    );
  } catch (_error) {
    return {};
  }
}

function persistBubbleThreads() {
  safeSetItem(BUBBLE_THREADS_KEY, JSON.stringify(state.threads));
}

function createRandomFanId(seed = "") {
  const value = hashText(`${seed}-${Date.now()}-${Math.random()}`).replace(/[^a-z0-9]/gi, "");
  return `fan_${(value || "0000").slice(0, 4).toLowerCase().padEnd(4, "0")}`;
}

function pickRandomFanAvatar(seed = "") {
  const index =
    Math.abs(Number.parseInt(hashText(`${seed}-${Date.now()}`).slice(0, 6), 36) || 0) %
    FAN_AVATAR_POOL.length;
  return FAN_AVATAR_POOL[index];
}

function normalizeFanReply(reply, index = 0) {
  return {
    id: String(reply?.id || `fan_reply_${Date.now()}_${index}`),
    fanId: String(reply?.fanId || createRandomFanId(`${index}`)).trim(),
    avatar: String(reply?.avatar || pickRandomFanAvatar(`${index}`)).trim() || "🫧",
    language: normalizeReplyLanguage(reply?.language, reply?.text || ""),
    text: truncateFanReply(reply?.text || ""),
    time: resolveBubbleTimeLabel(reply?.time, reply?.createdAt),
    translationZh: String(reply?.translationZh || "").trim(),
    translationVisible: Boolean(reply?.translationVisible),
    createdAt: Number(reply?.createdAt) || Date.now()
  };
}

function normalizeFanDetailSourceMessage(message, index = 0) {
  return {
    id: String(message?.id || `fan_source_message_${index}`),
    text: String(message?.text || "").trim(),
    time: resolveBubbleTimeLabel(message?.time, message?.createdAt),
    createdAt: Number(message?.createdAt) || Date.now() + index
  };
}

function createDefaultFanDetail(detailId, roomId = "", parentMessageId = "", emojiSet = []) {
  return {
    detailId,
    roomId,
    parentMessageId,
    emojiSet: Array.isArray(emojiSet) ? emojiSet.slice(0, 6) : [],
    sourceMessages: [],
    sourceText: "",
    replies: [],
    generatedAt: 0
  };
}

function normalizeFanDetail(detail, detailId) {
  const source = detail && typeof detail === "object" ? detail : {};
  return {
    detailId,
    roomId: String(source.roomId || "").trim(),
    parentMessageId: String(source.parentMessageId || "").trim(),
    emojiSet: Array.isArray(source.emojiSet)
      ? source.emojiSet.map((item) => String(item || "").trim()).filter(Boolean).slice(0, 6)
      : [],
    sourceMessages: Array.isArray(source.sourceMessages)
      ? source.sourceMessages
          .map((item, index) => normalizeFanDetailSourceMessage(item, index))
          .filter((item) => item.text)
      : [],
    sourceText: String(source.sourceText || "").trim(),
    replies: Array.isArray(source.replies)
      ? source.replies.map((item, index) => normalizeFanReply(item, index))
      : [],
    generatedAt: Number(source.generatedAt) || 0
  };
}

function loadBubbleFanDetails() {
  const raw = safeGetItem(BUBBLE_FAN_DETAILS_KEY);
  if (!raw) {
    return {};
  }

  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") {
      return {};
    }
    return Object.fromEntries(
      Object.entries(parsed).map(([detailId, detail]) => [detailId, normalizeFanDetail(detail, detailId)])
    );
  } catch (_error) {
    return {};
  }
}

function persistBubbleFanDetails() {
  safeSetItem(BUBBLE_FAN_DETAILS_KEY, JSON.stringify(state.fanDetails));
}

function ensureThread(roomId) {
  if (!roomId) {
    return createDefaultThread("");
  }
  if (!state.threads[roomId]) {
    state.threads[roomId] = createDefaultThread(roomId);
  }
  state.threads[roomId] = normalizeThread(state.threads[roomId], roomId);
  return state.threads[roomId];
}

function getRoomById(roomId = state.activeRoomId) {
  return state.rooms.find((item) => item.id === roomId) || null;
}

function findThreadMessageById(roomId, messageId) {
  const thread = ensureThread(roomId);
  return thread.messages.find((item) => item.id === messageId) || null;
}

function findFanPlaceholderByDetailId(detailId) {
  const roomId = state.activeRoomId || state.fanDetails[detailId]?.roomId || state.rooms[0]?.id || "";
  const thread = ensureThread(roomId);
  return thread.messages.find((item) => item.role === "fan" && item.detailId === detailId) || null;
}

function ensureFanDetail(detailId, roomId = "", parentMessageId = "", emojiSet = []) {
  if (!state.fanDetails[detailId]) {
    state.fanDetails[detailId] = createDefaultFanDetail(detailId, roomId, parentMessageId, emojiSet);
  }
  state.fanDetails[detailId] = normalizeFanDetail(state.fanDetails[detailId], detailId);
  if (roomId) {
    state.fanDetails[detailId].roomId = roomId;
  }
  if (parentMessageId) {
    state.fanDetails[detailId].parentMessageId = parentMessageId;
  }
  if (Array.isArray(emojiSet) && emojiSet.length) {
    state.fanDetails[detailId].emojiSet = emojiSet.slice(0, 6);
  }
  return state.fanDetails[detailId];
}

function getActiveFanDetail() {
  if (!state.activeFanDetailId) {
    return null;
  }
  return ensureFanDetail(state.activeFanDetailId);
}

function hydrateFanDetailFromCache(detailId) {
  if (!detailId) {
    return null;
  }

  const persistedDetails = loadBubbleFanDetails();
  const persistedDetail = persistedDetails[detailId];
  if (!persistedDetail?.replies?.length) {
    return null;
  }

  const currentDetail = ensureFanDetail(detailId);
  state.fanDetails[detailId] = normalizeFanDetail(
    {
      ...persistedDetail,
      roomId: currentDetail.roomId || persistedDetail.roomId,
      parentMessageId: currentDetail.parentMessageId || persistedDetail.parentMessageId,
      emojiSet: currentDetail.emojiSet.length ? currentDetail.emojiSet : persistedDetail.emojiSet
    },
    detailId
  );
  return state.fanDetails[detailId];
}

function getFanReplyById(detailId, replyId) {
  if (!detailId || !replyId) {
    return null;
  }
  const detail = ensureFanDetail(detailId);
  return detail.replies.find((item) => item.id === replyId) || null;
}

function getLatestUserBubbleMessage(thread) {
  const messages = Array.isArray(thread?.messages) ? thread.messages : [];
  return (
    [...messages]
      .reverse()
      .find((item) => item?.role === "user" && String(item.text || "").trim()) || null
  );
}

function getLatestPendingUserBubbleBatch(thread) {
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
    const currentMessage = messages[cursor];
    const text = String(currentMessage?.text || "").trim();
    if (text) {
      batch.unshift(currentMessage);
    }
    cursor -= 1;
  }
  return batch;
}

function getUserBubbleBatchAroundMessage(thread, messageId = "") {
  const messages = Array.isArray(thread?.messages) ? thread.messages : [];
  if (!messages.length) {
    return [];
  }

  const anchorIndex = messageId
    ? messages.findIndex((item) => item?.id === messageId)
    : messages.length - 1;
  if (anchorIndex < 0 || messages[anchorIndex]?.role !== "user") {
    return [];
  }

  const batch = [];
  let cursor = anchorIndex;
  while (cursor >= 0 && messages[cursor]?.role === "user") {
    const currentMessage = messages[cursor];
    const text = String(currentMessage?.text || "").trim();
    if (text) {
      batch.unshift(currentMessage);
    }
    cursor -= 1;
  }
  return batch;
}

function buildRoomPreviewFromMessage(message, fallbackText = "还没有 Bubble 消息。") {
  if (!message) {
    return fallbackText;
  }
  return truncate(message.text || fallbackText, 52);
}

function syncRoomPreview(roomId) {
  const room = getRoomById(roomId);
  if (!room) {
    return;
  }
  const thread = ensureThread(roomId);
  const latestUserMessage = getLatestUserBubbleMessage(thread);
  room.name = String(state.profile.username || room.name || DEFAULT_PROFILE.username).trim();
  room.avatarImage = String(state.profile.avatarImage || room.avatarImage || "").trim();
  room.avatarText = getAvatarFallback(state.profile);
  if (latestUserMessage) {
    room.preview = buildRoomPreviewFromMessage(latestUserMessage, room.preview);
    room.time = formatLocalTime(new Date(latestUserMessage.createdAt || Date.now()));
    room.updatedAt = latestUserMessage.createdAt || Date.now();
    return;
  }

  room.preview = "还没有 Bubble 消息。";
  if (!/^\d{1,2}:\d{2}$/.test(String(room.time || "").trim())) {
    room.time = formatLocalTime();
  }
}

function refreshBubbleData(options = {}) {
  const currentRoomId = state.activeRoomId;
  const currentDetailId = state.activeFanDetailId;
  state.profile = loadProfile();
  state.settings = loadSettings();
  state.worldbooks = loadWorldbooks();
  state.threads = options.reset ? {} : loadBubbleThreads();
  state.fanDetails = options.reset ? {} : loadBubbleFanDetails();
  state.rooms = options.reset
    ? createDefaultBubbleRooms(state.profile)
    : normalizeBubbleRooms(loadBubbleRooms(), state.profile);

  state.rooms.forEach((room) => {
    ensureThread(room.id);
    syncRoomPreview(room.id);
  });

  if (currentRoomId && !state.rooms.some((room) => room.id === currentRoomId)) {
    state.activeRoomId = "";
  }
  if (currentDetailId && !state.fanDetails[currentDetailId]) {
    state.activeFanDetailId = "";
  }

  persistBubbleThreads();
  persistBubbleFanDetails();
  persistBubbleRooms();
}

function buildAvatarMarkup(room) {
  if (room.avatarImage) {
    return `<img src="${escapeHtml(room.avatarImage)}" alt="${escapeHtml(room.name)} 的头像" />`;
  }
  return `<span>${escapeHtml(room.avatarText || "B")}</span>`;
}

function setChatLoadingOverlayOpen(isOpen, detailId = "") {
  state.loadingFanDetailId = isOpen ? String(detailId || "") : "";
  if (!bubbleChatLoadingOverlayEl) {
    return;
  }
  if (isOpen) {
    showLayer(bubbleChatLoadingOverlayEl, "grid");
    return;
  }
  hideLayer(bubbleChatLoadingOverlayEl);
}

function getFilteredRooms() {
  const query = state.query.trim().toLowerCase();
  if (!query) {
    return state.rooms;
  }
  return state.rooms.filter((room) => {
    const searchableText = `${room.name || ""} ${room.preview || ""}`.toLowerCase();
    return searchableText.includes(query);
  });
}

function renderBubbleRooms() {
  if (!bubbleListEl) {
    return;
  }

  const rooms = getFilteredRooms();
  if (!rooms.length) {
    bubbleListEl.innerHTML =
      '<p class="bubble-empty">没有找到匹配的聊天室。试试搜索用户昵称，或者清空搜索后重新查看。</p>';
    return;
  }

  bubbleListEl.innerHTML = rooms
    .slice()
    .sort((left, right) => (right.updatedAt || 0) - (left.updatedAt || 0))
    .map(
      (room) => `
        <button class="bubble-room" type="button" data-action="open-room" data-room-id="${escapeHtml(
          room.id
        )}">
          <span class="bubble-avatar">${buildAvatarMarkup(room)}</span>
          <span class="bubble-room__body">
            <strong class="bubble-room__name">${escapeHtml(room.name)}</strong>
            <span class="bubble-room__preview">${escapeHtml(room.preview)}</span>
          </span>
          <span class="bubble-room__time">${escapeHtml(room.time || formatLocalTime())}</span>
        </button>
      `
    )
    .join("");
}

function setBubbleChatSettingsStatus(message, tone = "") {
  if (!bubbleChatSettingsStatusEl) {
    return;
  }
  bubbleChatSettingsStatusEl.textContent = message;
  bubbleChatSettingsStatusEl.className = "bubble-chat-settings-status";
  if (tone) {
    bubbleChatSettingsStatusEl.classList.add(tone);
  }
}

function renderBubbleHotTopicsTabOptions(selectedId = "") {
  if (!bubbleChatHotTopicsTabSelectEl) {
    return;
  }
  const tabs = getAvailableCustomTabs(loadSettings());
  if (!tabs.length) {
    bubbleChatHotTopicsTabSelectEl.innerHTML = '<option value="">暂无论坛自定义页签</option>';
    bubbleChatHotTopicsTabSelectEl.value = "";
    return;
  }

  bubbleChatHotTopicsTabSelectEl.innerHTML = [
    '<option value="">请选择论坛自定义页签</option>',
    ...tabs.map((tab) => `<option value="${escapeHtml(tab.id)}">${escapeHtml(tab.name)}</option>`)
  ].join("");
  bubbleChatHotTopicsTabSelectEl.value = tabs.some((tab) => tab.id === selectedId) ? selectedId : "";
}

function renderBubbleWorldbookMountOptions(selectedIds = []) {
  if (!bubbleChatWorldbookListEl) {
    return;
  }

  if (!state.worldbooks.entries.length) {
    bubbleChatWorldbookListEl.innerHTML =
      '<div class="bubble-chat-settings-empty">当前还没有世界书。先到 Message → 我 → 世界书 创建后再回来挂载。</div>';
    return;
  }

  const selectedIdSet = new Set(normalizeMountedIds(selectedIds));
  bubbleChatWorldbookListEl.innerHTML = state.worldbooks.entries
    .map((entry) => {
      const categoryName = entry.categoryId
        ? getWorldbookCategoryById(entry.categoryId)?.name || "未分类"
        : "未分类";
      return `
        <label class="bubble-chat-settings-option">
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

function updateBubbleChatSettingsFormState() {
  if (bubbleChatHotTopicsTabSelectEl) {
    bubbleChatHotTopicsTabSelectEl.disabled = !Boolean(bubbleChatHotTopicsInputEl?.checked);
  }
  [bubbleChatHotTopicsTextInputEl, bubbleChatHotTopicsTopicInputEl].forEach((input) => {
    if (input instanceof HTMLInputElement) {
      input.disabled = !Boolean(bubbleChatHotTopicsInputEl?.checked);
    }
  });
  if (bubbleChatWorldbookListEl) {
    bubbleChatWorldbookListEl
      .querySelectorAll("input[type='checkbox']")
      .forEach((input) => {
        if (input instanceof HTMLInputElement) {
          input.disabled = !Boolean(bubbleChatWorldbookInputEl?.checked);
        }
      });
  }
  bubbleChatWorldbookListEl?.classList.toggle(
    "is-disabled",
    !Boolean(bubbleChatWorldbookInputEl?.checked)
  );
}

function updateBubbleHotTopicsWarning(promptSettings = getCurrentBubblePromptSettingsDraft()) {
  if (!bubbleChatHotTopicsWarningEl) {
    return;
  }
  const diagnostics = getBubbleHotTopicsMountDiagnostics(loadSettings(), promptSettings);
  bubbleChatHotTopicsWarningEl.textContent = diagnostics.warnings[0] || "";
}

function applyBubblePromptSettingsToForm(promptSettings) {
  const resolved = normalizeBubblePromptSettings(promptSettings);
  if (bubbleChatHotTopicsInputEl) {
    bubbleChatHotTopicsInputEl.checked = resolved.hotTopicsEnabled;
  }
  if (bubbleChatHotTopicsTextInputEl) {
    bubbleChatHotTopicsTextInputEl.checked = resolved.hotTopicsIncludeDiscussionText;
  }
  if (bubbleChatHotTopicsTopicInputEl) {
    bubbleChatHotTopicsTopicInputEl.checked = resolved.hotTopicsIncludeHotTopic;
  }
  if (bubbleChatWorldbookInputEl) {
    bubbleChatWorldbookInputEl.checked = resolved.worldbookEnabled;
  }
  renderBubbleHotTopicsTabOptions(resolved.hotTopicsTabId);
  renderBubbleWorldbookMountOptions(resolved.worldbookIds);
  updateBubbleChatSettingsFormState();
  updateBubbleHotTopicsWarning(resolved);
  setBubbleChatSettingsStatus("");
}

function getCurrentBubblePromptSettingsDraft() {
  const tabs = getAvailableCustomTabs(loadSettings());
  const selectedTabId = String(bubbleChatHotTopicsTabSelectEl?.value || "").trim();
  const selectedWorldbookIds = bubbleChatWorldbookListEl
    ? [...bubbleChatWorldbookListEl.querySelectorAll("input[type='checkbox']:checked")]
        .map((input) => (input instanceof HTMLInputElement ? String(input.value || "").trim() : ""))
        .filter((id) => getWorldbookEntryById(id))
    : [];
  return normalizeBubblePromptSettings({
    hotTopicsEnabled: Boolean(bubbleChatHotTopicsInputEl?.checked),
    hotTopicsTabId: tabs.some((tab) => tab.id === selectedTabId) ? selectedTabId : "",
    hotTopicsIncludeDiscussionText: Boolean(bubbleChatHotTopicsTextInputEl?.checked),
    hotTopicsIncludeHotTopic: Boolean(bubbleChatHotTopicsTopicInputEl?.checked),
    worldbookEnabled: Boolean(bubbleChatWorldbookInputEl?.checked),
    worldbookIds: selectedWorldbookIds
  });
}

function setBubbleChatSettingsOpen(isOpen) {
  state.chatSettingsOpen = Boolean(isOpen);
  if (!bubbleChatSettingsModalEl) {
    return;
  }
  if (state.chatSettingsOpen) {
    state.settings = loadSettings();
    state.worldbooks = loadWorldbooks();
    bubbleChatSettingsModalEl.hidden = false;
    bubbleChatSettingsModalEl.setAttribute("aria-hidden", "false");
    applyBubblePromptSettingsToForm(state.settings.bubblePromptSettings);
    document.body.classList.add("bubble-settings-open");
    return;
  }
  bubbleChatSettingsModalEl.hidden = true;
  bubbleChatSettingsModalEl.setAttribute("aria-hidden", "true");
  document.body.classList.remove("bubble-settings-open");
}

function buildEmojiTickerMarkup(emojiSet = []) {
  const resolved = emojiSet.length ? emojiSet.slice(0, 6) : buildEmojiFallbackSet("ticker");
  const baseRows = Array.from({ length: 5 }, (_, rowIndex) =>
    Array.from({ length: 3 }, (_, columnIndex) => resolved[(rowIndex + columnIndex) % resolved.length])
  );
  const rows = [...baseRows, baseRows[0]];
  return `
    <div class="bubble-emoji-ticker">
      <div class="bubble-emoji-ticker__track">
        ${rows
          .map(
            (row) => `
              <span class="bubble-emoji-ticker__item">
                ${row.map((emoji) => `<span>${escapeHtml(emoji)}</span>`).join("")}
              </span>
            `
          )
          .join("")}
      </div>
    </div>
  `;
}

function buildUserMessageMarkup(message) {
  return `
    <article class="bubble-chat-item bubble-chat-item--user">
      <span class="bubble-chat-item__time">${escapeHtml(message.time || formatLocalTime())}</span>
      <div class="bubble-chat-bubble bubble-chat-bubble--user">
        <p>${escapeHtml(message.text || "")}</p>
      </div>
    </article>
  `;
}

function buildFanMessageMarkup(message, index = 0) {
  const avatarEmoji = (message.emojiSet || [])[index % ((message.emojiSet || []).length || 1)] || "🫧";
  return `
    <article class="bubble-chat-item bubble-chat-item--fan">
      <div class="bubble-chat-label-row">
        <p class="bubble-chat-label">FROM FAN</p>
        <span class="bubble-chat-item__time bubble-chat-item__time--fan">${escapeHtml(
          message.time || ""
        )}</span>
      </div>
      <div class="bubble-chat-fan-row">
        <span class="bubble-chat-fan-avatar">${escapeHtml(avatarEmoji)}</span>
        <div class="bubble-chat-bubble bubble-chat-bubble--fan">
          ${buildEmojiTickerMarkup(message.emojiSet || [])}
        </div>
        <button
          class="bubble-chat-fan-arrow"
          type="button"
          data-action="open-fan-detail"
          data-detail-id="${escapeHtml(message.detailId)}"
          aria-label="展开粉丝回复详情"
        >
          ›
        </button>
      </div>
    </article>
  `;
}

function renderActiveChat() {
  if (!bubbleChatHistoryEl) {
    return;
  }

  const room = getRoomById();
  const thread = ensureThread(state.activeRoomId);
  if (bubbleChatRoomNameEl) {
    bubbleChatRoomNameEl.textContent = room?.name || state.profile.username || "聊天室";
  }

  if (!thread.messages.length) {
    bubbleChatHistoryEl.innerHTML = `
      <div class="bubble-chat-empty">
        发一条本地消息试试。<br />
        发送后会出现“接收粉丝回复”按钮，再生成 3 张可展开的粉丝卡片。
      </div>
    `;
  } else {
    bubbleChatHistoryEl.innerHTML = thread.messages
      .map((message, index) =>
        message.role === "fan" ? buildFanMessageMarkup(message, index) : buildUserMessageMarkup(message)
      )
      .join("");
  }

  if (bubbleFanActionWrapEl) {
    bubbleFanActionWrapEl.hidden = !thread.pendingFanReply;
  }

  bubbleChatHistoryEl.scrollTop = bubbleChatHistoryEl.scrollHeight;
}

function setChatModalOpen(isOpen, roomId = state.activeRoomId) {
  state.chatOpen = Boolean(isOpen);
  if (state.chatOpen && roomId) {
    state.activeRoomId = roomId;
    ensureThread(roomId);
    showLayer(bubbleChatModalEl, "block");
    document.body.classList.add("chat-open");
    renderActiveChat();
    window.setTimeout(() => {
      bubbleChatInput?.focus();
    }, 0);
    return;
  }

  state.activeRoomId = "";
  setChatLoadingOverlayOpen(false);
  setBubbleChatSettingsOpen(false);
  document.body.classList.remove("chat-open");
  hideLayer(bubbleChatModalEl);
  setFanDetailModalOpen(false);
}

function renderFanDetailList() {
  if (!bubbleFanDetailListEl) {
    return;
  }

  const detail = getActiveFanDetail();
  if (!detail) {
    bubbleFanDetailListEl.innerHTML = '<div class="bubble-fan-detail-empty">未找到对应的粉丝回复。</div>';
    return;
  }

  if (!detail.replies.length) {
    bubbleFanDetailListEl.innerHTML =
      '<div class="bubble-fan-detail-empty">正在准备粉丝回复…</div>';
    return;
  }

  bubbleFanDetailListEl.innerHTML = detail.replies
    .map((reply) => {
      const isTranslating = Boolean(state.translatingFanReplyIds[reply.id]);
      const translationMarkup =
        reply.translationVisible && reply.translationZh
          ? `
              <div class="bubble-fan-detail-translation">
                <p class="bubble-fan-detail-translation-divider">--------</p>
                <p class="bubble-fan-detail-translation-text">${escapeHtml(reply.translationZh)}</p>
              </div>
            `
          : "";
      return `
        <article class="bubble-fan-detail-item">
          <span class="bubble-fan-detail-avatar">${escapeHtml(reply.avatar)}</span>
          <div class="bubble-fan-detail-body">
            <div class="bubble-fan-detail-head">
              <strong class="bubble-fan-detail-id">${escapeHtml(reply.fanId)}</strong>
              <span class="bubble-fan-detail-badge">粉丝</span>
              <span class="bubble-fan-detail-time">${escapeHtml(reply.time || "")}</span>
            </div>
            <div class="bubble-fan-detail-row">
              <div class="bubble-fan-detail-bubble">
                <p>${escapeHtml(reply.text)}</p>
                ${translationMarkup}
              </div>
              <button
                class="bubble-fan-detail-action${reply.translationVisible ? " is-active" : ""}"
                type="button"
                data-action="toggle-fan-translation"
                data-reply-id="${escapeHtml(reply.id)}"
                aria-label="翻译或隐藏翻译"
                ${isTranslating ? "disabled" : ""}
              >
                ${isTranslating ? "…" : "A"}
              </button>
            </div>
          </div>
        </article>
      `;
    })
    .join("");

}

function setFanDetailModalOpen(isOpen, detailId = state.activeFanDetailId) {
  const nextOpen = Boolean(isOpen && detailId);
  if (nextOpen) {
    state.activeFanDetailId = detailId;
    showLayer(bubbleFanDetailModalEl, "block");
    document.body.classList.add("fan-detail-open");
    renderFanDetailList();
    return;
  }

  state.activeFanDetailId = "";
  document.body.classList.remove("fan-detail-open");
  hideLayer(bubbleFanDetailModalEl);
}

function toggleSearch() {
  state.searchOpen = !state.searchOpen;
  if (!bubbleSearchWrapEl) {
    return;
  }
  bubbleSearchWrapEl.hidden = !state.searchOpen;
  if (state.searchOpen) {
    window.setTimeout(() => {
      bubbleSearchInput?.focus();
    }, 0);
    return;
  }
  state.query = "";
  if (bubbleSearchInput) {
    bubbleSearchInput.value = "";
  }
  renderBubbleRooms();
}

function resetBubbleRooms() {
  safeRemoveItem(BUBBLE_ROOMS_KEY);
  safeRemoveItem(BUBBLE_THREADS_KEY);
  safeRemoveItem(BUBBLE_FAN_DETAILS_KEY);
  state.translatingFanReplyIds = {};
  refreshBubbleData({ reset: true });
  renderBubbleRooms();
  if (state.chatOpen) {
    setChatModalOpen(false);
  }
  setBubbleStatus("已重置 Bubble 本地聊天室、粉丝卡片与详情缓存。", "success");
}

function handleRoomOpen(roomId) {
  const room = getRoomById(roomId);
  if (!room) {
    return;
  }
  room.updatedAt = Date.now();
  room.time = room.time || formatLocalTime();
  persistBubbleRooms();
  renderBubbleRooms();
  setChatModalOpen(true, roomId);
  setBubbleStatus(`已打开 ${room.name} 的 Bubble 聊天页面。`, "success");
}

function sendBubbleMessage(text) {
  const content = String(text || "").trim();
  if (!content || !state.activeRoomId) {
    return;
  }

  const thread = ensureThread(state.activeRoomId);
  thread.messages = [
    ...thread.messages,
    {
      id: `bubble_msg_${Date.now()}`,
      role: "user",
      text: content,
      time: formatBubbleTimestamp(Date.now()),
      createdAt: Date.now()
    }
  ];
  thread.pendingFanReply = true;
  syncRoomPreview(state.activeRoomId);
  persistBubbleThreads();
  persistBubbleRooms();
  renderActiveChat();
  renderBubbleRooms();
  setBubbleStatus("消息已发送，现在可以点击“接收粉丝回复”。", "success");
}

function acceptFanReplies() {
  if (!state.activeRoomId) {
    return;
  }

  const thread = ensureThread(state.activeRoomId);
  if (!thread.pendingFanReply) {
    return;
  }

  const userBatch = getLatestPendingUserBubbleBatch(thread);
  const parentMessage = userBatch[userBatch.length - 1] || null;
  if (!parentMessage || !userBatch.length) {
    return;
  }

  const now = Date.now();
  const placeholders = Array.from({ length: 3 }, (_, index) => {
    const emojiSet = pickUniqueEmojis(6, `${parentMessage.id}-${index}`);
    const detailId = `fan_detail_${now}_${index}_${hashText(parentMessage.id)}`;
    const detail = ensureFanDetail(detailId, state.activeRoomId, parentMessage.id, emojiSet);
    detail.sourceMessages = userBatch.map((item, itemIndex) =>
      normalizeFanDetailSourceMessage(item, itemIndex)
    );
    detail.sourceText = detail.sourceMessages.map((item) => item.text).join("\n");
    return {
      id: `fan_placeholder_${now}_${index}`,
      role: "fan",
      time: formatBubbleTimestamp(now + index),
      emojiSet,
      detailId,
      parentMessageId: parentMessage.id,
      createdAt: now + index
    };
  });

  thread.messages = [...thread.messages, ...placeholders];
  thread.pendingFanReply = false;
  syncRoomPreview(state.activeRoomId);
  persistBubbleThreads();
  persistBubbleFanDetails();
  persistBubbleRooms();
  renderActiveChat();
  renderBubbleRooms();
  setBubbleStatus("已生成 3 张粉丝卡片；点击右侧箭头查看真实粉丝回复。", "success");
}

function buildBubbleHotTopicsContext(settings, promptSettings) {
  const diagnostics = getBubbleHotTopicsMountDiagnostics(settings, promptSettings);
  if (!diagnostics.selectedTab || (!diagnostics.mountsDiscussionText && !diagnostics.mountsHotTopic)) {
    return "";
  }

  const selectedTab = diagnostics.selectedTab;
  const sections = [`这个粉丝团体最近也在关注论坛讨论区「${selectedTab.name}」。`];
  const discussionText = String(selectedTab.discussionText || selectedTab.text || "").trim();
  const hotTopic = String(selectedTab.hotTopic || "").trim();

  if (diagnostics.mountsDiscussionText && discussionText) {
    sections.push(`这个讨论区长期讨论的背景：${discussionText}`);
  }
  if (diagnostics.mountsHotTopic && hotTopic) {
    sections.push(`这个讨论区当前最主要的热点：${hotTopic}`);
  }

  sections.push(
    "这些论坛信息只用于补充这个粉丝群体最近共同关注的话题；回复仍要围绕创作者这一整轮 Bubble 消息本身来做反应。"
  );
  return sections.join("\n\n");
}

function getBubbleHotTopicsMountDiagnostics(settings, promptSettings) {
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

  const selectedTab =
    getAvailableCustomTabs(settings).find((tab) => tab.id === promptSettings.hotTopicsTabId) || null;
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

function buildBubbleWorldbookContext(promptSettings) {
  if (!promptSettings.worldbookEnabled || !promptSettings.worldbookIds.length) {
    return "";
  }

  const entries = promptSettings.worldbookIds
    .map((entryId) => getWorldbookEntryById(entryId))
    .filter(Boolean)
    .map((entry) => {
      const category = entry.categoryId ? getWorldbookCategoryById(entry.categoryId) : null;
      const categoryLabel = category?.name ? `（${category.name}）` : "（未分类）";
      return `- ${entry.name}${categoryLabel}\n${entry.text}`;
    });

  if (!entries.length) {
    return "";
  }

  return entries.join("\n\n");
}

function buildFanReplyPrompt(profile, sourceMessages = [], emojiSet = [], settings = getCurrentSettings()) {
  const creatorName = String(profile.username || DEFAULT_PROFILE.username).trim();
  const creatorPersona = String(profile.personaPrompt || DEFAULT_PROFILE.personaPrompt).trim();
  const promptSettings = normalizeBubblePromptSettings(settings.bubblePromptSettings);
  const normalizedMessages = Array.isArray(sourceMessages)
    ? sourceMessages
        .map((item, index) => normalizeFanDetailSourceMessage(item, index))
        .filter((item) => item.text)
    : [];
  const worldbookContext = buildBubbleWorldbookContext(promptSettings);
  const hotTopicsContext = buildBubbleHotTopicsContext(settings, promptSettings);
  return [
    "你正在模拟 Bubble 中创作者的粉丝回复列表。",
    "请严格输出 JSON 数组，不要输出额外解释。",
    `请输出 ${FAN_DETAIL_REPLY_COUNT} 个对象，每个对象只包含字段：language, text。`,
    "language 只能是 zh、ja、en、ko 四选一。",
    "四种语言都必须出现，尽量平均分配。",
    "text 是粉丝视角对创作者刚发消息的即时反应。",
    "每条 text 不得超过 50 个字符。",
    "语气要像真实粉丝：可以可爱、惊讶、夸赞、调侃、尖叫，但都要围绕原消息做反应。",
    "不要加编号、不要加标签、不要解释、不要输出用户名字段。",
    worldbookContext
      ? `补充背景设定（优先级低于粉丝团体近期关注话题、创作者人设与本轮 Bubble 消息，只作弱背景参考）：\n${worldbookContext}`
      : "",
    `创作者昵称：${creatorName}`,
    `创作者人设：${creatorPersona}`,
    hotTopicsContext
      ? `粉丝团体近期共同关注的话题：\n${hotTopicsContext}`
      : "",
    normalizedMessages.length
      ? `创作者这一轮连续发送了 ${normalizedMessages.length} 条 Bubble 消息；以下所有消息在理解上同等重要，请综合这一整轮内容生成粉丝回复：`
      : "",
    normalizedMessages.length
      ? normalizedMessages
          .map((item, index) => `${index + 1}. ${item.time ? `${item.time} · ` : ""}${item.text}`)
          .join("\n")
      : "",
    normalizedMessages.length
      ? "请把这一整轮消息视作同一组连续表达，回复可以综合回应其中的共同情绪、主题、转折和细节，不要只盯某一条。"
      : ""
  ]
    .filter(Boolean)
    .join("\n\n");
}

function parseFanReplies(rawText, count = FAN_DETAIL_REPLY_COUNT) {
  const jsonText = extractJsonArray(rawText);
  if (!jsonText) {
    throw new Error("接口已返回内容，但没有找到 JSON 数组。");
  }

  const parsed = parseJsonArrayWithRepair(jsonText, "粉丝回复 JSON 解析失败。");
  if (!Array.isArray(parsed) || !parsed.length) {
    throw new Error("接口返回的 JSON 不是有效的粉丝回复数组。");
  }

  return parsed
    .slice(0, count)
    .map((item) => {
      if (typeof item === "string") {
        return {
          language: inferReplyLanguage(item),
          text: truncateFanReply(item)
        };
      }
      return {
        language: normalizeReplyLanguage(item?.language, item?.text || ""),
        text: truncateFanReply(item?.text || "")
      };
    })
    .filter((item) => item.text);
}

async function generateFanRepliesForDetail(detailId, options = {}) {
  const placeholder = findFanPlaceholderByDetailId(detailId);
  const detail = ensureFanDetail(
    detailId,
    placeholder?.parentMessageId ? state.activeRoomId : state.fanDetails[detailId]?.roomId || state.activeRoomId,
    placeholder?.parentMessageId || state.fanDetails[detailId]?.parentMessageId || "",
    placeholder?.emojiSet || state.fanDetails[detailId]?.emojiSet || []
  );
  const cachedDetail = hydrateFanDetailFromCache(detailId);
  if (!options.force && cachedDetail?.replies?.length) {
    if (state.activeFanDetailId === detailId) {
      renderFanDetailList();
    }
    return true;
  }
  if (!options.force && detail.replies.length) {
    if (state.activeFanDetailId === detailId) {
      renderFanDetailList();
    }
    return true;
  }

  const roomId = detail.roomId || state.activeRoomId;
  const thread = ensureThread(roomId);
  const sourceMessages =
    detail.sourceMessages.length
      ? detail.sourceMessages
      : getUserBubbleBatchAroundMessage(thread, detail.parentMessageId);
  const parentMessage = sourceMessages[sourceMessages.length - 1] || null;

  if (!parentMessage?.text || !sourceMessages.length) {
    setFanDetailStatus("未找到可用于生成粉丝回复的用户消息。", "error");
    if (state.activeFanDetailId === detailId) {
      renderFanDetailList();
    }
    return false;
  }

  detail.sourceMessages = sourceMessages.map((item, index) =>
    normalizeFanDetailSourceMessage(item, index)
  );
  detail.sourceText = detail.sourceMessages.map((item) => item.text).join("\n");
  persistBubbleFanDetails();
  setFanDetailStatus("正在通过当前 API 生成粉丝回复…");
  if (state.activeFanDetailId === detailId && bubbleFanDetailListEl) {
    bubbleFanDetailListEl.innerHTML =
      '<div class="bubble-fan-detail-empty">正在获取粉丝回复，请稍候…</div>';
  }

  try {
    const rawText = await requestJsonArrayText(
      getCurrentSettings(),
      buildFanReplyPrompt(state.profile, detail.sourceMessages, detail.emojiSet, getCurrentSettings()),
      FAN_DETAIL_REPLY_COUNT
    );
    const replies = parseFanReplies(rawText, FAN_DETAIL_REPLY_COUNT).map((item, index) =>
      normalizeFanReply(
        {
          id: `fan_reply_${Date.now()}_${index}_${hashText(item.text)}`,
          fanId: createRandomFanId(`${detailId}-${index}-${item.text}`),
          avatar: pickRandomFanAvatar(`${detailId}-${index}`),
          language: item.language,
          text: item.text,
          time: formatBubbleTimestamp(Date.now() + index),
          translationZh: "",
          translationVisible: false,
          createdAt: Date.now() + index
        },
        index
      )
    );

    detail.replies = replies;
    detail.generatedAt = Date.now();
    persistBubbleFanDetails();
    if (state.activeFanDetailId === detailId) {
      renderFanDetailList();
    }
    setFanDetailStatus("已生成粉丝回复。点击右侧 A 可翻译为中文。", "success");
    return true;
  } catch (error) {
    setFanDetailStatus(`粉丝回复生成失败：${error?.message || "请求失败"}`, "error");
    if (state.activeFanDetailId === detailId && bubbleFanDetailListEl) {
      bubbleFanDetailListEl.innerHTML =
        '<div class="bubble-fan-detail-empty">粉丝回复生成失败，请检查 API 配置后重试。</div>';
    }
    return false;
  }
}

async function toggleFanReplyTranslation(replyId) {
  const detailId = state.activeFanDetailId;
  if (!detailId) {
    return;
  }
  let reply = getFanReplyById(detailId, replyId);
  if (!reply) {
    return;
  }

  if (reply.translationZh) {
    reply.translationVisible = !reply.translationVisible;
    persistBubbleFanDetails();
    renderFanDetailList();
    setFanDetailStatus(reply.translationVisible ? "已展示中文翻译。" : "已隐藏中文翻译。", "success");
    return;
  }

  if (state.translatingFanReplyIds[replyId]) {
    return;
  }

  state.translatingFanReplyIds[replyId] = true;
  renderFanDetailList();
  setFanDetailStatus("正在翻译该条粉丝回复…");

  try {
    const translatedText = await requestTranslatedText(
      getTranslationRequestSettings(getCurrentSettings()),
      reply.text
    );
    reply = getFanReplyById(detailId, replyId);
    if (!reply) {
      throw new Error("未找到需要写回翻译的粉丝回复。");
    }
    reply.translationZh = String(translatedText || "").trim() || reply.text;
    reply.translationVisible = true;
    persistBubbleFanDetails();
    setFanDetailStatus("已生成中文翻译。再次点击 A 可隐藏。", "success");
  } catch (error) {
    setFanDetailStatus(`翻译失败：${error?.message || "请求失败"}`, "error");
  } finally {
    delete state.translatingFanReplyIds[replyId];
    if (state.activeFanDetailId === detailId) {
      renderFanDetailList();
    }
  }
}

async function openFanDetail(detailId) {
  if (!detailId) {
    return;
  }
  const placeholder = findFanPlaceholderByDetailId(detailId);
  if (placeholder) {
    ensureFanDetail(detailId, state.activeRoomId, placeholder.parentMessageId, placeholder.emojiSet);
  }
  const detail = hydrateFanDetailFromCache(detailId) || ensureFanDetail(detailId);
  if (detail.replies.length) {
    setFanDetailModalOpen(true, detailId);
    renderFanDetailList();
    return;
  }

  const roomIdAtRequest = state.activeRoomId;
  setChatLoadingOverlayOpen(true, detailId);
  setBubbleStatus("粉丝回复中……");
  const success = await generateFanRepliesForDetail(detailId);
  const shouldOpenDetail =
    success &&
    state.chatOpen &&
    state.activeRoomId === roomIdAtRequest &&
    state.loadingFanDetailId === detailId;
  setChatLoadingOverlayOpen(false);
  if (shouldOpenDetail) {
    setFanDetailModalOpen(true, detailId);
    renderFanDetailList();
    return;
  }
  if (!success) {
    setBubbleStatus("粉丝回复生成失败，请检查 API 配置后重试。", "error");
  }
}

function attachEvents() {
  if (bubbleSearchBtn) {
    bubbleSearchBtn.addEventListener("click", () => {
      toggleSearch();
    });
  }

  if (bubbleClearBtn) {
    bubbleClearBtn.addEventListener("click", () => {
      resetBubbleRooms();
    });
  }

  if (bubbleSearchInput) {
    bubbleSearchInput.addEventListener("input", () => {
      state.query = String(bubbleSearchInput.value || "").trim();
      renderBubbleRooms();
    });
  }

  if (bubbleEmbeddedCloseBtn) {
    bubbleEmbeddedCloseBtn.addEventListener("click", () => {
      requestEmbeddedClose();
    });
  }

  if (bubbleChatBackBtn) {
    bubbleChatBackBtn.addEventListener("click", () => {
      setChatModalOpen(false);
    });
  }

  if (bubbleChatMoreBtn) {
    bubbleChatMoreBtn.addEventListener("click", () => {
      setBubbleChatSettingsOpen(true);
    });
  }

  if (bubbleChatSettingsCloseBtn) {
    bubbleChatSettingsCloseBtn.addEventListener("click", () => {
      setBubbleChatSettingsOpen(false);
    });
  }

  if (bubbleChatSettingsFormEl) {
    bubbleChatSettingsFormEl.addEventListener("submit", (event) => {
      event.preventDefault();
      const draft = getCurrentBubblePromptSettingsDraft();
      const selectedTab =
        getAvailableCustomTabs(loadSettings()).find((tab) => tab.id === draft.hotTopicsTabId) || null;
      if (draft.hotTopicsEnabled && !draft.hotTopicsTabId) {
        setBubbleChatSettingsStatus("请先为论坛挂载选择一个自定义页签。", "error");
        return;
      }
      if (
        draft.hotTopicsEnabled &&
        !draft.hotTopicsIncludeDiscussionText &&
        !draft.hotTopicsIncludeHotTopic
      ) {
        setBubbleChatSettingsStatus("论坛挂载至少要选择“页签文本”或“页签热点”中的一项。", "error");
        return;
      }
      if (draft.worldbookEnabled && !draft.worldbookIds.length) {
        setBubbleChatSettingsStatus("请至少选择一条世界书。", "error");
        return;
      }

      state.settings = loadSettings();
      state.settings.bubblePromptSettings = draft;
      safeSetItem(SETTINGS_KEY, JSON.stringify(state.settings));
      updateBubbleHotTopicsWarning(draft);
      setBubbleChatSettingsStatus("Bubble 回复设置已保存。", "success");
      setBubbleStatus("Bubble 粉丝回复 prompt 设置已更新。", "success");
      window.setTimeout(() => {
        setBubbleChatSettingsOpen(false);
      }, 180);
    });
  }

  if (bubbleChatHotTopicsInputEl) {
    bubbleChatHotTopicsInputEl.addEventListener("change", () => {
      updateBubbleChatSettingsFormState();
      updateBubbleHotTopicsWarning();
      setBubbleChatSettingsStatus("");
    });
  }

  if (bubbleChatWorldbookInputEl) {
    bubbleChatWorldbookInputEl.addEventListener("change", () => {
      updateBubbleChatSettingsFormState();
      setBubbleChatSettingsStatus("");
    });
  }

  [bubbleChatHotTopicsTabSelectEl, bubbleChatHotTopicsTextInputEl, bubbleChatHotTopicsTopicInputEl]
    .filter(Boolean)
    .forEach((element) => {
      element.addEventListener("change", () => {
        updateBubbleHotTopicsWarning();
        setBubbleChatSettingsStatus("");
      });
    });

  if (bubbleChatWorldbookListEl) {
    bubbleChatWorldbookListEl.addEventListener("change", () => {
      setBubbleChatSettingsStatus("");
    });
  }

  if (bubbleChatPlusBtn) {
    bubbleChatPlusBtn.addEventListener("click", () => {
      setBubbleStatus("附件和更多输入功能暂未接入，这里先保留本地聊天行为。");
    });
  }

  if (bubbleAcceptFanBtn) {
    bubbleAcceptFanBtn.addEventListener("click", () => {
      acceptFanReplies();
    });
  }

  if (bubbleChatForm) {
    bubbleChatForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const message = String(bubbleChatInput?.value || "");
      bubbleChatForm.reset();
      sendBubbleMessage(message);
    });
  }

  if (bubbleChatHistoryEl) {
    bubbleChatHistoryEl.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) {
        return;
      }
      const actionEl = target.closest("[data-action]");
      if (!(actionEl instanceof HTMLElement)) {
        return;
      }

      if (actionEl.dataset.action === "open-fan-detail" && actionEl.dataset.detailId) {
        openFanDetail(actionEl.dataset.detailId);
      }
    });
  }

  if (bubbleFanDetailCloseBtn) {
    bubbleFanDetailCloseBtn.addEventListener("click", () => {
      setFanDetailModalOpen(false);
    });
  }

  if (bubbleFanDetailMoreBtn) {
    bubbleFanDetailMoreBtn.addEventListener("click", () => {
      setFanDetailStatus("点击右侧 A 可翻译或隐藏中文；回复和翻译都会缓存下来。", "success");
    });
  }

  if (bubbleFanDetailListEl) {
    bubbleFanDetailListEl.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) {
        return;
      }
      const actionEl = target.closest("[data-action]");
      if (!(actionEl instanceof HTMLElement)) {
        return;
      }

      if (actionEl.dataset.action === "toggle-fan-translation" && actionEl.dataset.replyId) {
        toggleFanReplyTranslation(actionEl.dataset.replyId);
      }
    });
  }

  if (bubbleListEl) {
    bubbleListEl.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) {
        return;
      }
      const actionEl = target.closest("[data-action]");
      if (!(actionEl instanceof HTMLElement) || actionEl.dataset.action !== "open-room") {
        return;
      }
      const roomId = actionEl.dataset.roomId || "";
      handleRoomOpen(roomId);
    });
  }

  window.addEventListener("focus", () => {
    const activeRoomId = state.activeRoomId;
    const activeFanDetailId = state.activeFanDetailId;
    const shouldReopenChat = state.chatOpen && Boolean(activeRoomId);
    const shouldReopenDetail = Boolean(activeFanDetailId);
    if (!shouldReopenChat && !shouldReopenDetail) {
      return;
    }
    refreshBubbleData();
    renderBubbleRooms();
    if (shouldReopenChat) {
      setChatModalOpen(true, activeRoomId);
    }
    if (shouldReopenDetail) {
      setFanDetailModalOpen(true, activeFanDetailId);
      renderFanDetailList();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && state.chatSettingsOpen) {
      setBubbleChatSettingsOpen(false);
      return;
    }
    if (event.key === "Escape" && state.activeFanDetailId) {
      setFanDetailModalOpen(false);
      return;
    }
    if (event.key === "Escape" && state.chatOpen) {
      setChatModalOpen(false);
      return;
    }
    if (event.key === "Escape" && state.searchOpen) {
      toggleSearch();
      return;
    }
    if (event.key === "Escape" && isEmbeddedView()) {
      requestEmbeddedClose();
    }
  });
}

function init() {
  if (document.body) {
    document.body.classList.toggle("embedded", isEmbeddedView());
  }
  hideLayer(bubbleChatModalEl);
  hideLayer(bubbleFanDetailModalEl);
  refreshBubbleData();
  renderBubbleRooms();
  setBubbleStatus("Bubble 会自动读取论坛个人主页资料；详情页会使用当前 API 生成粉丝回复。");
  attachEvents();
}

init();
