const DEFAULT_OPENAI_ENDPOINT = "https://api.deepseek.com/chat/completions";
const DEFAULT_GEMINI_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta";
const DEFAULT_DEEPSEEK_MODEL = "deepseek-chat";
const DEFAULT_GEMINI_MODEL = "gemini-2.0-flash";
const SETTINGS_KEY = "x_style_generator_settings_v2";
const PROFILE_KEY = "x_style_generator_profile_v1";
const PROFILE_POSTS_KEY = "x_style_generator_profile_posts_v1";
const DIRECT_MESSAGES_KEY = "x_style_generator_direct_messages_v1";
const BUBBLE_ROOMS_KEY = "x_style_generator_bubble_rooms_v1";
const BUBBLE_THREADS_KEY = "x_style_generator_bubble_threads_v1";
const BUBBLE_FAN_DETAILS_KEY = "x_style_generator_bubble_fan_details_v1";
const DEFAULT_TEMPERATURE = 0.8;
const FAN_DETAIL_REPLY_COUNT = 8;

const DEFAULT_SETTINGS = {
  mode: "openai",
  endpoint: DEFAULT_OPENAI_ENDPOINT,
  token: "",
  model: DEFAULT_DEEPSEEK_MODEL,
  apiConfigs: [],
  activeApiConfigId: "",
  translationApiEnabled: false,
  translationApiConfigId: ""
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
const bubbleFanDetailModalEl = document.querySelector("#bubble-fan-detail-modal");
const bubbleFanDetailCloseBtn = document.querySelector("#bubble-fan-detail-close-btn");
const bubbleFanDetailMoreBtn = document.querySelector("#bubble-fan-detail-more-btn");
const bubbleFanDetailStatusEl = document.querySelector("#bubble-fan-detail-status");
const bubbleFanDetailListEl = document.querySelector("#bubble-fan-detail-list");

const memoryStorage = {};

const state = {
  profile: loadProfile(),
  settings: loadSettings(),
  rooms: [],
  threads: {},
  fanDetails: {},
  searchOpen: false,
  query: "",
  chatOpen: false,
  activeRoomId: "",
  activeFanDetailId: "",
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
  const response = await fetch(requestEndpoint, {
    method: "POST",
    headers: buildRequestHeaders(settings),
    body: JSON.stringify(buildJsonArrayRequestBody(settings, prompt, count))
  });

  if (response.status === 404 && requestEndpoint.includes("api.deepseek.com")) {
    throw new Error(
      "DeepSeek 接口返回 404。请确认地址为 https://api.deepseek.com/chat/completions。"
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
  return message;
}

async function requestTranslatedText(settings, sourceText) {
  const originalText = String(sourceText || "").trim();
  if (!originalText) {
    return "";
  }

  const requestEndpoint = validateApiSettings(settings, "翻译");
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
  const directMessages = loadDirectMessages();
  const profilePosts = loadProfilePosts();
  const preview = resolveBubblePreview(profile, directMessages, profilePosts);
  return [
    {
      id: "bubble_profile_room",
      name: String(profile.username || DEFAULT_PROFILE.username).trim() || DEFAULT_PROFILE.username,
      avatarImage: String(profile.avatarImage || "").trim(),
      avatarText: getAvatarFallback(profile),
      preview: preview.text || "欢迎来到 Bubble。",
      time: preview.time || formatLocalTime(),
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
      time:
        /^\d{1,2}:\d{2}$/.test(String(message?.time || "").trim())
          ? String(message.time).trim()
          : formatLocalTime(),
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
    time:
      /^\d{1,2}:\d{2}$/.test(String(message?.time || "").trim())
        ? String(message.time).trim()
        : formatLocalTime(),
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
    translationZh: String(reply?.translationZh || "").trim(),
    translationVisible: Boolean(reply?.translationVisible),
    createdAt: Number(reply?.createdAt) || Date.now()
  };
}

function createDefaultFanDetail(detailId, roomId = "", parentMessageId = "", emojiSet = []) {
  return {
    detailId,
    roomId,
    parentMessageId,
    emojiSet: Array.isArray(emojiSet) ? emojiSet.slice(0, 6) : [],
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

function buildRoomPreviewFromMessage(message, fallbackText = "欢迎来到 Bubble。") {
  if (!message) {
    return fallbackText;
  }
  if (message.role === "fan") {
    return truncate((message.emojiSet || []).slice(0, 3).join(" "), 52);
  }
  return truncate(message.text || fallbackText, 52);
}

function syncRoomPreview(roomId) {
  const room = getRoomById(roomId);
  if (!room) {
    return;
  }
  const thread = ensureThread(roomId);
  const latestMessage = thread.messages.length ? thread.messages[thread.messages.length - 1] : null;
  room.name = String(state.profile.username || room.name || DEFAULT_PROFILE.username).trim();
  room.avatarImage = String(state.profile.avatarImage || room.avatarImage || "").trim();
  room.avatarText = getAvatarFallback(state.profile);
  if (latestMessage) {
    room.preview = buildRoomPreviewFromMessage(latestMessage, room.preview);
    room.time = latestMessage.time || formatLocalTime();
    room.updatedAt = latestMessage.createdAt || Date.now();
  }
}

function refreshBubbleData(options = {}) {
  const currentRoomId = state.activeRoomId;
  const currentDetailId = state.activeFanDetailId;
  state.profile = loadProfile();
  state.settings = loadSettings();
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

function buildEmojiTickerMarkup(emojiSet = []) {
  const resolved = emojiSet.length ? emojiSet.slice(0, 6) : buildEmojiFallbackSet("ticker");
  return `
    <div class="bubble-emoji-ticker">
      <div class="bubble-emoji-ticker__track">
        ${resolved.map((emoji) => `<span class="bubble-emoji-ticker__item">${escapeHtml(emoji)}</span>`).join("")}
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
      <p class="bubble-chat-label">FROM FAN</p>
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
            </div>
            <div class="bubble-fan-detail-bubble">
              <p>${escapeHtml(reply.text)}</p>
              ${translationMarkup}
            </div>
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
        </article>
      `;
    })
    .join("");

  bubbleFanDetailListEl.scrollTop = 0;
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
      time: formatLocalTime(),
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

  const parentMessage = [...thread.messages].reverse().find((item) => item.role === "user") || null;
  if (!parentMessage) {
    return;
  }

  const now = Date.now();
  const placeholders = Array.from({ length: 3 }, (_, index) => {
    const emojiSet = pickUniqueEmojis(6, `${parentMessage.id}-${index}`);
    const detailId = `fan_detail_${now}_${index}_${hashText(parentMessage.id)}`;
    ensureFanDetail(detailId, state.activeRoomId, parentMessage.id, emojiSet);
    return {
      id: `fan_placeholder_${now}_${index}`,
      role: "fan",
      time: formatLocalTime(),
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

function buildFanReplyPrompt(profile, sourceMessage, emojiSet = []) {
  const creatorName = String(profile.username || DEFAULT_PROFILE.username).trim();
  const creatorPersona = String(profile.personaPrompt || DEFAULT_PROFILE.personaPrompt).trim();
  const emojiMood = emojiSet.slice(0, 3).join(" ");
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
    `创作者昵称：${creatorName}`,
    `创作者人设：${creatorPersona}`,
    emojiMood ? `这批粉丝情绪关键词：${emojiMood}` : "",
    "创作者刚发出的消息：",
    sourceMessage
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
  if (!options.force && detail.replies.length) {
    renderFanDetailList();
    return;
  }

  const roomId = detail.roomId || state.activeRoomId;
  const parentMessage =
    findThreadMessageById(roomId, detail.parentMessageId) ||
    [...ensureThread(roomId).messages].reverse().find((item) => item.role === "user") ||
    null;

  if (!parentMessage?.text) {
    setFanDetailStatus("未找到可用于生成粉丝回复的用户消息。", "error");
    renderFanDetailList();
    return;
  }

  detail.sourceText = parentMessage.text;
  persistBubbleFanDetails();
  setFanDetailStatus("正在通过当前 API 生成粉丝回复…");
  bubbleFanDetailListEl.innerHTML =
    '<div class="bubble-fan-detail-empty">正在获取粉丝回复，请稍候…</div>';

  try {
    const rawText = await requestJsonArrayText(
      getCurrentSettings(),
      buildFanReplyPrompt(state.profile, parentMessage.text, detail.emojiSet),
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
    renderFanDetailList();
    setFanDetailStatus("已生成粉丝回复。点击右侧 A 可翻译为中文。", "success");
  } catch (error) {
    setFanDetailStatus(`粉丝回复生成失败：${error?.message || "请求失败"}`, "error");
    bubbleFanDetailListEl.innerHTML =
      '<div class="bubble-fan-detail-empty">粉丝回复生成失败，请检查 API 配置后重试。</div>';
  }
}

async function toggleFanReplyTranslation(replyId) {
  const detail = getActiveFanDetail();
  if (!detail) {
    return;
  }
  const reply = detail.replies.find((item) => item.id === replyId);
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
    reply.translationZh = translatedText;
    reply.translationVisible = true;
    persistBubbleFanDetails();
    setFanDetailStatus("已生成中文翻译。再次点击 A 可隐藏。", "success");
  } catch (error) {
    setFanDetailStatus(`翻译失败：${error?.message || "请求失败"}`, "error");
  } finally {
    delete state.translatingFanReplyIds[replyId];
    renderFanDetailList();
  }
}

function openFanDetail(detailId) {
  if (!detailId) {
    return;
  }
  const placeholder = findFanPlaceholderByDetailId(detailId);
  if (placeholder) {
    ensureFanDetail(detailId, state.activeRoomId, placeholder.parentMessageId, placeholder.emojiSet);
  }
  setFanDetailModalOpen(true, detailId);
  generateFanRepliesForDetail(detailId);
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
      setBubbleStatus("Bubble 聊天页目前保留本地消息、粉丝卡片和详情展开。");
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
