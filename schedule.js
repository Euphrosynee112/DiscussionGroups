const PROFILE_KEY = "x_style_generator_profile_v1";
const MESSAGE_CONTACTS_KEY = "x_style_generator_message_contacts_v1";
const SCHEDULE_ENTRIES_KEY = "x_style_generator_schedule_entries_v1";
const SETTINGS_KEY = "x_style_generator_settings_v2";
const MESSAGE_THREADS_KEY = "x_style_generator_message_threads_v1";
const DIRECT_MESSAGES_KEY = "x_style_generator_direct_messages_v1";
const DEFAULT_OPENAI_ENDPOINT = "https://api.deepseek.com/chat/completions";
const DEFAULT_GEMINI_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta";
const DEFAULT_DEEPSEEK_MODEL = "deepseek-chat";
const DEFAULT_GEMINI_MODEL = "gemini-2.0-flash";
const DEFAULT_TEMPERATURE = 0.85;
const GLOBAL_PROMPT_GUARD =
  "虚拟世界观，与真实世界无关。禁止搜索未提供的任何其他信息。";
const MAX_SCHEDULE_INVITE_CONCURRENCY = 3;
const DEFAULT_MESSAGE_HISTORY_ROUNDS = 6;

const DEFAULT_PROFILE = {
  username: "用户",
  personaPrompt: ""
};

const DEFAULT_SETTINGS = {
  mode: "openai",
  endpoint: DEFAULT_OPENAI_ENDPOINT,
  token: "",
  model: DEFAULT_DEEPSEEK_MODEL,
  apiConfigs: [],
  activeApiConfigId: "",
  privacyAllowlist: [],
  messagePromptSettings: {
    historyRounds: DEFAULT_MESSAGE_HISTORY_ROUNDS
  }
};

const scheduleBackBtnEl = document.querySelector("#schedule-back-btn");
const scheduleFilterBtnEl = document.querySelector("#schedule-filter-btn");
const scheduleAddBtnEl = document.querySelector("#schedule-add-btn");
const scheduleStatusEl = document.querySelector("#schedule-status");
const scheduleViewSwitchEl = document.querySelector("#schedule-view-switch");
const schedulePrevBtnEl = document.querySelector("#schedule-prev-btn");
const scheduleTodayBtnEl = document.querySelector("#schedule-today-btn");
const scheduleNextBtnEl = document.querySelector("#schedule-next-btn");
const scheduleRangeLabelEl = document.querySelector("#schedule-range-label");
const scheduleRangeSubtitleEl = document.querySelector("#schedule-range-subtitle");
const scheduleContentEl = document.querySelector("#schedule-content");

const scheduleEditorModalEl = document.querySelector("#schedule-editor-modal");
const scheduleEditorTitleEl = document.querySelector("#schedule-editor-title");
const scheduleEditorCloseBtnEl = document.querySelector("#schedule-editor-close-btn");
const scheduleEditorFormEl = document.querySelector("#schedule-editor-form");
const scheduleTitleInputEl = document.querySelector("#schedule-title-input");
const scheduleTypeSelectEl = document.querySelector("#schedule-type-select");
const scheduleTypeHintEl = document.querySelector("#schedule-type-hint");
const scheduleOwnerTypeSelectEl = document.querySelector("#schedule-owner-type-select");
const scheduleOwnerContactFieldEl = document.querySelector("#schedule-owner-contact-field");
const scheduleOwnerContactSelectEl = document.querySelector("#schedule-owner-contact-select");
const scheduleVisibilityFieldEl = document.querySelector("#schedule-visibility-field");
const scheduleVisibleAllInputEl = document.querySelector("#schedule-visible-all-input");
const scheduleVisibleContactsEl = document.querySelector("#schedule-visible-contacts");
const scheduleCompanionFieldEl = document.querySelector("#schedule-companion-field");
const scheduleCompanionOptionsEl = document.querySelector("#schedule-companion-options");
const scheduleNotifyCompanionsFieldEl = document.querySelector("#schedule-notify-companions-field");
const scheduleNotifyCompanionsInputEl = document.querySelector("#schedule-notify-companions-input");
const scheduleDateInputEl = document.querySelector("#schedule-date-input");
const scheduleTimeGridEl = document.querySelector("#schedule-time-grid");
const scheduleStartTimeInputEl = document.querySelector("#schedule-start-time-input");
const scheduleEndTimeInputEl = document.querySelector("#schedule-end-time-input");
const scheduleEditorStatusEl = document.querySelector("#schedule-editor-status");
const scheduleEditorCancelBtnEl = document.querySelector("#schedule-editor-cancel-btn");
const scheduleDeleteBtnEl = document.querySelector("#schedule-delete-btn");
const scheduleFilterModalEl = document.querySelector("#schedule-filter-modal");
const scheduleFilterCloseBtnEl = document.querySelector("#schedule-filter-close-btn");
const scheduleFilterOptionsEl = document.querySelector("#schedule-filter-options");
const scheduleFilterStatusEl = document.querySelector("#schedule-filter-status");
const scheduleFilterCancelBtnEl = document.querySelector("#schedule-filter-cancel-btn");
const scheduleFilterApplyBtnEl = document.querySelector("#schedule-filter-apply-btn");
const scheduleFilterSelectAllBtnEl = document.querySelector("#schedule-filter-select-all-btn");
const scheduleFilterClearBtnEl = document.querySelector("#schedule-filter-clear-btn");

const memoryStorage = {};
const USER_ACTOR_KEY = "user:self";

const state = {
  profile: loadProfile(),
  contacts: loadContacts(),
  entries: loadScheduleEntries(),
  viewMode: "day",
  cursorDate: getTodayValue(),
  editorOpen: false,
  filterOpen: false,
  editorMode: "create",
  editingEntryId: "",
  draft: createDefaultDraft(getTodayValue()),
  filterActorKeys: [],
  filterDraftActorKeys: []
};

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

function appendApiLog(entry) {
  try {
    window.PulseApiLog?.append?.(entry);
  } catch (_error) {
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
  merged.apiConfigs = normalizeApiConfigs(merged.apiConfigs || []);
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
          content: String(message.text || "").trim()
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
        parts: [{ text: String(message.text || "").trim() }]
      })),
      safetySettings: buildGeminiSafetySettings(),
      generationConfig: {
        temperature: DEFAULT_TEMPERATURE
      }
    };
  }

  return {
    prompt: [
      systemPrompt,
      "请根据以下聊天记录继续回复。",
      ...history.map((message) => `${message.role === "assistant" ? "角色" : "用户"}：${message.text}`)
    ]
      .filter(Boolean)
      .join("\n\n"),
    intent: "schedule_invite"
  };
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

function applyPrivacyToLogEntry(entry, session) {
  if (!session || !window.PulsePrivacyCover?.applyPrivacyToLogEntry) {
    return entry;
  }
  return window.PulsePrivacyCover.applyPrivacyToLogEntry(entry, session);
}

function isEmbeddedView() {
  try {
    return new URLSearchParams(window.location.search).get("embed") === "1";
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

function updateScheduleViewportHeight() {
  const viewportHeight = Math.round(
    Math.max(window.visualViewport?.height || 0, window.innerHeight || 0, 0)
  );
  if (!viewportHeight) {
    return;
  }
  document.documentElement.style.setProperty("--schedule-app-height", `${viewportHeight}px`);
}

function bindScheduleViewportHeight() {
  updateScheduleViewportHeight();
  window.addEventListener("resize", updateScheduleViewportHeight);
  window.addEventListener("orientationchange", updateScheduleViewportHeight);
  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", updateScheduleViewportHeight);
    window.visualViewport.addEventListener("scroll", updateScheduleViewportHeight);
  }
}

function loadProfile() {
  const raw = readStoredJson(PROFILE_KEY, null);
  return raw && typeof raw === "object"
    ? { ...DEFAULT_PROFILE, ...raw }
    : { ...DEFAULT_PROFILE };
}

function normalizeContact(contact, index = 0) {
  const source = contact && typeof contact === "object" ? contact : {};
  const name = String(source.name || "").trim() || `角色 ${index + 1}`;
  return {
    id: String(source.id || `contact_${index}_${hashText(name)}`),
    name,
    avatarImage: String(source.avatarImage || "").trim(),
    avatarText: String(source.avatarText || "").trim() || name.slice(0, 2) || "角色",
    personaPrompt: String(source.personaPrompt || "").trim(),
    specialUserPersona: String(source.specialUserPersona || "").trim()
  };
}

function loadContacts() {
  const raw = readStoredJson(MESSAGE_CONTACTS_KEY, []);
  return Array.isArray(raw) ? raw.map((contact, index) => normalizeContact(contact, index)) : [];
}

function getContactById(contactId = "") {
  const resolvedId = String(contactId || "").trim();
  return state.contacts.find((contact) => contact.id === resolvedId) || null;
}

function buildScheduleInviteTimeLabel(entry) {
  if (!entry || entry.scheduleType === "day") {
    return `${entry?.date || getTodayValue()} · 全天`;
  }
  if (entry.scheduleType === "week") {
    return `每周${formatWeekday(entry.date, "long")} · ${entry.startTime}-${entry.endTime}`;
  }
  return `${entry.date} · ${entry.startTime}-${entry.endTime}`;
}

function buildScheduleInviteMessageText(entry) {
  const safeEntry = entry && typeof entry === "object" ? entry : {};
  return [
    "[日程邀请]",
    `日程名称：${String(safeEntry.title || "").trim()}`,
    `日程时间：${buildScheduleInviteTimeLabel(safeEntry)}`
  ]
    .filter(Boolean)
    .join("\n");
}

function normalizeConversationMessage(message, index = 0) {
  const source = message && typeof message === "object" ? message : {};
  const isInvite = String(source.messageType || "").trim() === "schedule_invite";
  const inviteEntry = {
    title: String(source.scheduleInviteTitle || "").trim(),
    date: String(source.scheduleInviteDate || "").trim(),
    startTime: String(source.scheduleInviteStartTime || "").trim(),
    endTime: String(source.scheduleInviteEndTime || "").trim(),
    scheduleType: ["day", "hour", "week"].includes(source.scheduleInviteType)
      ? source.scheduleInviteType
      : "day"
  };
  const text = isInvite
    ? buildScheduleInviteMessageText(inviteEntry)
    : String(source.text || "").trim();
  return {
    id: String(source.id || `conversation_message_${Date.now()}_${index}`),
    role: source.role === "assistant" ? "assistant" : "user",
    messageType: isInvite ? "schedule_invite" : "text",
    text,
    scheduleInviteTitle: isInvite ? inviteEntry.title : "",
    scheduleInviteDate: isInvite ? inviteEntry.date : "",
    scheduleInviteStartTime: isInvite ? inviteEntry.startTime : "",
    scheduleInviteEndTime: isInvite ? inviteEntry.endTime : "",
    scheduleInviteType: isInvite ? inviteEntry.scheduleType : "",
    needsReply: source.role === "assistant" ? false : Boolean(source.needsReply),
    time:
      /^\d{1,2}:\d{2}$/.test(String(source.time || "").trim())
        ? String(source.time).trim()
        : formatTimeLabel(Date.now()),
    createdAt: Number(source.createdAt) || Date.now() + index
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
    contactId: String(source.contactId || "").trim(),
    contactNameSnapshot: String(source.contactNameSnapshot || "").trim(),
    contactAvatarImageSnapshot: String(source.contactAvatarImageSnapshot || "").trim(),
    contactAvatarTextSnapshot: String(source.contactAvatarTextSnapshot || "").trim(),
    messages,
    awarenessCounter: Math.max(0, Number.parseInt(String(source.awarenessCounter || 0), 10) || 0),
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

function persistConversations(conversations = []) {
  safeSetItem(MESSAGE_THREADS_KEY, JSON.stringify(conversations));
}

function getConversationByContactId(contactId = "") {
  const conversations = loadConversations();
  return conversations.find((item) => item.contactId === String(contactId || "").trim()) || null;
}

function createConversation(contact) {
  const normalizedContact = contact && typeof contact === "object" ? contact : null;
  if (!normalizedContact?.id) {
    return null;
  }
  const existingConversation = getConversationByContactId(normalizedContact.id);
  if (existingConversation) {
    return existingConversation;
  }
  return normalizeConversation(
    {
      id: `conversation_${Date.now()}_${hashText(normalizedContact.id)}`,
      contactId: normalizedContact.id,
      contactNameSnapshot: normalizedContact.name,
      contactAvatarImageSnapshot: normalizedContact.avatarImage || "",
      contactAvatarTextSnapshot: normalizedContact.avatarText || normalizedContact.name.slice(0, 2),
      messages: [],
      awarenessCounter: 0,
      memorySummaryCounter: 0,
      memorySummaryLastMessageCount: 0,
      updatedAt: Date.now()
    },
    0
  );
}

function normalizeScheduleEntry(entry, index = 0) {
  const source = entry && typeof entry === "object" ? entry : {};
  const scheduleType = ["day", "hour", "week"].includes(source.scheduleType)
    ? source.scheduleType
    : "day";
  const ownerType = source.ownerType === "contact" ? "contact" : "user";
  const date = /^\d{4}-\d{2}-\d{2}$/.test(String(source.date || "").trim())
    ? String(source.date).trim()
    : getTodayValue();
  const normalizeTimeValue = (value, fallback) => {
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
    startTime: normalizeTimeValue(source.startTime, "09:00"),
    endTime: normalizeTimeValue(source.endTime, "10:00"),
    inviteDecisions:
      source.inviteDecisions && typeof source.inviteDecisions === "object"
        ? { ...source.inviteDecisions }
        : {},
    createdAt: Number(source.createdAt) || Date.now(),
    updatedAt: Number(source.updatedAt) || Date.now()
  };
}

function loadScheduleEntries() {
  const raw = readStoredJson(SCHEDULE_ENTRIES_KEY, []);
  return Array.isArray(raw)
    ? raw.map((entry, index) => normalizeScheduleEntry(entry, index)).filter((entry) => entry.title)
    : [];
}

function persistScheduleEntries() {
  safeSetItem(SCHEDULE_ENTRIES_KEY, JSON.stringify(state.entries));
}

function formatTimeLabel(timestamp = Date.now()) {
  const date = new Date(Number(timestamp) || Date.now());
  return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}

function prependGlobalPromptGuard(text) {
  const resolvedText = String(text || "").trim();
  if (!resolvedText) {
    return GLOBAL_PROMPT_GUARD;
  }
  if (resolvedText.startsWith(GLOBAL_PROMPT_GUARD)) {
    return resolvedText;
  }
  return `${GLOBAL_PROMPT_GUARD}\n\n${resolvedText}`;
}

function parseJsonLikeContent(value) {
  if (value && typeof value === "object") {
    return null;
  }

  const text = String(value || "").trim();
  if (!text) {
    return null;
  }

  const candidates = [text];
  const fenceMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenceMatch?.[1]) {
    candidates.push(fenceMatch[1].trim());
  }
  const objectStart = text.indexOf("{");
  const objectEnd = text.lastIndexOf("}");
  if (objectStart >= 0 && objectEnd > objectStart) {
    candidates.push(text.slice(objectStart, objectEnd + 1));
  }

  for (const candidate of candidates) {
    try {
      return JSON.parse(candidate);
    } catch (_error) {
    }
  }
  return null;
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
    const lastMessage = collapsed[collapsed.length - 1] || null;
    if (lastMessage && lastMessage.role === role) {
      lastMessage.text = `${lastMessage.text}\n${text}`;
      lastMessage.createdAt = Math.max(
        Number(lastMessage.createdAt) || 0,
        Number(message?.createdAt) || 0
      );
      if (message?.time) {
        lastMessage.time = message.time;
      }
      return collapsed;
    }

    collapsed.push({
      role,
      text,
      time: message?.time || "",
      createdAt: Number(message?.createdAt) || Date.now()
    });
    return collapsed;
  }, []);
}

function selectConversationHistory(messages = [], rounds = DEFAULT_MESSAGE_HISTORY_ROUNDS) {
  const collapsed = collapseConversationMessagesByTurn(messages);
  if (!collapsed.length) {
    return [];
  }

  const resolvedRounds = Math.max(
    1,
    Number.parseInt(String(rounds || DEFAULT_MESSAGE_HISTORY_ROUNDS), 10) || DEFAULT_MESSAGE_HISTORY_ROUNDS
  );
  const maxTurns = resolvedRounds * 2;
  return collapsed.slice(-maxTurns);
}

function saveConversation(conversation) {
  const normalized = normalizeConversation(conversation, 0);
  if (!normalized) {
    return null;
  }
  const conversations = loadConversations();
  const existingIndex = conversations.findIndex(
    (item) => item.id === normalized.id || item.contactId === normalized.contactId
  );
  if (existingIndex >= 0) {
    conversations[existingIndex] = normalized;
  } else {
    conversations.unshift(normalized);
  }
  const sorted = conversations
    .map((item, index) => normalizeConversation(item, index))
    .filter(Boolean)
    .sort((left, right) => (right.updatedAt || 0) - (left.updatedAt || 0));
  persistConversations(sorted);
  return sorted.find((item) => item.id === normalized.id || item.contactId === normalized.contactId) || null;
}

function appendMessagesToConversation(contact, messages = []) {
  const targetContact = contact && typeof contact === "object" ? contact : null;
  if (!targetContact?.id) {
    return null;
  }

  const existingConversation = getConversationByContactId(targetContact.id) || createConversation(targetContact);
  if (!existingConversation) {
    return null;
  }

  const normalizedMessages = (Array.isArray(messages) ? messages : [])
    .map((message, index) => normalizeConversationMessage(message, existingConversation.messages.length + index))
    .filter((message) => message.text);
  const nextConversation = {
    ...existingConversation,
    contactNameSnapshot: targetContact.name,
    contactAvatarImageSnapshot: targetContact.avatarImage || "",
    contactAvatarTextSnapshot: targetContact.avatarText || targetContact.name.slice(0, 2),
    messages: [...existingConversation.messages, ...normalizedMessages]
  };
  nextConversation.updatedAt =
    normalizedMessages[normalizedMessages.length - 1]?.createdAt ||
    nextConversation.updatedAt ||
    Date.now();
  return saveConversation(nextConversation);
}

function getScheduleInviteCompanionNames(entry, inviteeId = "") {
  return getEntryParticipants(entry)
    .filter((participant) => participant.type === "contact")
    .filter((participant) => participant.id !== String(inviteeId || "").trim())
    .map((participant) => participant.label)
    .filter(Boolean);
}

function doEntriesOverlap(left, right) {
  if (!left || !right) {
    return false;
  }
  const leftAllDay = left.scheduleType === "day";
  const rightAllDay = right.scheduleType === "day";
  if (leftAllDay || rightAllDay) {
    return true;
  }
  const leftStart = parseLocalDateTimeValue(left.date, left.startTime);
  const leftEnd = parseLocalDateTimeValue(left.date, left.endTime);
  const rightStart = parseLocalDateTimeValue(right.date, right.startTime);
  const rightEnd = parseLocalDateTimeValue(right.date, right.endTime);
  if (!leftStart || !leftEnd || !rightStart || !rightEnd) {
    return false;
  }
  return leftStart < rightEnd && rightStart < leftEnd;
}

function getEntriesVisibleToContact(contactId = "", dateText = "") {
  const resolvedContactId = String(contactId || "").trim();
  return state.entries.filter((entry) => {
    if (dateText && !entryOccursOnDate(entry, dateText)) {
      return false;
    }
    if (entry.companionContactIds.includes(resolvedContactId)) {
      return true;
    }
    if (entry.ownerType === "contact") {
      return entry.ownerId === resolvedContactId || entry.companionContactIds.includes(resolvedContactId);
    }
    if (entry.visibilityMode === "all") {
      return true;
    }
    return entry.visibleContactIds.includes(resolvedContactId);
  });
}

function buildInviteConflictContext(contact, inviteEntry) {
  const relevantEntries = getEntriesVisibleToContact(contact?.id || "", inviteEntry.date)
    .filter((entry) => entry.id !== inviteEntry.id)
    .filter((entry) => doEntriesOverlap(entry, inviteEntry))
    .slice(0, 4);

  if (!relevantEntries.length) {
    return "你当前没有明确冲突的已知行程。";
  }

  return [
    "你当前已知的同时间段相关行程：",
    ...relevantEntries.map((entry) => `- ${entry.title} · ${buildScheduleInviteTimeLabel(entry)}`)
  ].join("\n");
}

function buildScheduleInviteSystemPrompt(profile, contact, inviteEntry, options = {}) {
  const companionNames = Array.isArray(options.companionNames) ? options.companionNames : [];
  return prependGlobalPromptGuard([
    `你叫 ${contact.name}。`,
    `现在是你和 ${profile.username || DEFAULT_PROFILE.username} 在即时聊天软件里的一对一私聊。`,
    "这不是任务扮演，而是你本人正在收到对方发来的一个日程邀请。",
    `你的稳定性格、表达习惯和关系底色：${
      contact.personaPrompt || "自然、友好，会根据关系和现实安排做决定。"
    }。`,
    `正在和你聊天的用户昵称：${profile.username || DEFAULT_PROFILE.username}。`,
    `用户整体画像：${profile.personaPrompt || DEFAULT_PROFILE.personaPrompt || "用户有自己稳定的人设和表达方式。"}。`,
    contact.specialUserPersona
      ? `你对这个用户的特别认知：${contact.specialUserPersona}。`
      : "",
    [
      "你需要先判断是否接受这个邀请，再给出一条自然聊天式回复。",
      "接受时要显得像真的愿意赴约；拒绝时要像真实生活中的婉拒，可以简短带一点理由，但不要冷冰冰。",
      "优先考虑你的人设、和用户的关系、你当前已知的行程冲突，以及这个邀请本身是否合理。",
      "如果没有明显冲突且关系允许，默认更偏向接受；如果确实撞时间、明显不合适，或以你的性格不想去，就拒绝。"
    ].join(" "),
    buildInviteConflictContext(contact, inviteEntry),
    companionNames.length
      ? `除你之外，这次同行人还有：${companionNames.join("、")}。`
      : "这次邀请没有其他角色同行人。",
    '输出必须是严格 JSON：{"decision":"accept|reject","reply":"自然回复"}。',
    "reply 只写你真正会发出去的话，不要解释 JSON，不要加 markdown，不要附加其他字段。"
  ]
    .filter(Boolean)
    .join("\n\n"));
}

function buildScheduleInviteUserInstruction(inviteEntry, companionNames = []) {
  return [
    "这是用户刚刚发给你的日程邀请卡片：",
    `- 日程名称：${inviteEntry.title}`,
    `- 日程时间：${buildScheduleInviteTimeLabel(inviteEntry)}`,
    companionNames.length ? `- 其他同行人：${companionNames.join("、")}` : "",
    "请按要求返回 JSON。"
  ]
    .filter(Boolean)
    .join("\n");
}

function parseScheduleInviteDecision(payload) {
  const parsed =
    (payload && typeof payload === "object" && !Array.isArray(payload) ? payload : null) ||
    parseJsonLikeContent(payload) ||
    parseJsonLikeContent(resolveMessage(payload));
  const decision = String(parsed?.decision || "").trim().toLowerCase();
  const reply = String(parsed?.reply || "").trim();
  if (!["accept", "reject"].includes(decision) || !reply) {
    throw new Error("日程邀请响应格式错误：缺少有效的 accept/reject 决策或回复文本。");
  }
  return {
    decision,
    reply
  };
}

function splitAssistantReplyText(replyText = "") {
  return String(replyText || "")
    .split(/\n+/)
    .map((item) => String(item || "").trim())
    .filter(Boolean);
}

async function requestScheduleInviteDecision(settings, profile, contact, inviteEntry, history = []) {
  const requestEndpoint = validateApiSettings(settings, "日程邀请");
  const companionNames = getScheduleInviteCompanionNames(inviteEntry, contact.id);
  const systemPrompt = buildScheduleInviteSystemPrompt(profile, contact, inviteEntry, {
    companionNames
  });
  const userInstruction = buildScheduleInviteUserInstruction(inviteEntry, companionNames);
  const collapsedHistory = selectConversationHistory(history, settings.messagePromptSettings?.historyRounds);
  const requestHistory = collapsedHistory.concat([
    {
      role: "user",
      text: buildScheduleInviteMessageText(inviteEntry)
    },
    {
      role: "user",
      text: userInstruction
    }
  ]);
  const privacySession = createPrivacySession({
    settings,
    profile,
    contact,
    inviteEntry,
    history: requestHistory,
    companionNames,
    systemPrompt,
    userInstruction,
    relatedScheduleEntries: getEntriesVisibleToContact(contact.id, inviteEntry.date)
  });
  const encodedSystemPrompt = preparePromptWithPrivacy(systemPrompt, privacySession);
  const encodedHistory = encodeValueWithPrivacy(requestHistory, privacySession);
  const requestBody = buildChatRequestBody(settings, encodedSystemPrompt, encodedHistory);
  const logEntry = applyPrivacyToLogEntry(
    {
      source: "schedule",
      action: "schedule_invite",
      summary: `角色：${contact.name} · 日程邀请「${inviteEntry.title}」`,
      endpoint: requestEndpoint,
      mode: normalizeApiMode(settings.mode),
      prompt: encodedSystemPrompt,
      requestBody
    },
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
        ...logEntry,
        status: "error",
        statusCode: response.status,
        responseText: rawResponse,
        responseBody: payload,
        errorMessage: `接口请求失败：HTTP ${response.status}`
      });
      logged = true;
      throw new Error(`接口请求失败：HTTP ${response.status}`);
    }

    const decision = parseScheduleInviteDecision(payload);
    appendApiLog({
      ...logEntry,
      status: "success",
      statusCode: response.status,
      responseText: rawResponse,
      responseBody: payload
    });
    logged = true;
    return decision;
  } catch (error) {
    if (!logged) {
      appendApiLog({
        ...logEntry,
        status: "error",
        errorMessage: error?.message || "请求失败"
      });
    }
    throw error;
  }
}

async function runTasksWithConcurrency(items = [], limit = MAX_SCHEDULE_INVITE_CONCURRENCY, worker) {
  const queue = Array.isArray(items) ? items.slice() : [];
  const results = [];
  const resolvedLimit = Math.max(1, Math.min(MAX_SCHEDULE_INVITE_CONCURRENCY, Number(limit) || 1));

  async function consume() {
    while (queue.length) {
      const item = queue.shift();
      if (typeof worker !== "function") {
        results.push({ item, status: "error", error: new Error("缺少任务处理函数。") });
        continue;
      }
      try {
        const value = await worker(item);
        results.push({ item, status: "success", value });
      } catch (error) {
        results.push({ item, status: "error", error });
      }
      await sleep(120);
    }
  }

  await Promise.all(Array.from({ length: Math.min(resolvedLimit, queue.length || 1) }, () => consume()));
  return results;
}

function getTodayValue() {
  return formatDateValue(new Date());
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

function formatDateValue(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function addDays(dateText, amount) {
  const date = parseLocalDateValue(dateText) || new Date();
  date.setDate(date.getDate() + amount);
  return formatDateValue(date);
}

function addMonths(dateText, amount) {
  const date = parseLocalDateValue(dateText) || new Date();
  date.setMonth(date.getMonth() + amount);
  return formatDateValue(date);
}

function getWeekStart(dateText) {
  const date = parseLocalDateValue(dateText) || new Date();
  const weekday = date.getDay();
  const offset = weekday === 0 ? -6 : 1 - weekday;
  date.setDate(date.getDate() + offset);
  return formatDateValue(date);
}

function getWeekDates(dateText) {
  const start = getWeekStart(dateText);
  return Array.from({ length: 7 }, (_, index) => addDays(start, index));
}

function formatWeekday(dateText, length = "short") {
  const date = parseLocalDateValue(dateText) || new Date();
  return new Intl.DateTimeFormat("zh-CN", { weekday: length }).format(date);
}

function formatFullDate(dateText) {
  const date = parseLocalDateValue(dateText) || new Date();
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long"
  }).format(date);
}

function formatMonthTitle(dateText) {
  const date = parseLocalDateValue(dateText) || new Date();
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long"
  }).format(date);
}

function formatShortDate(dateText) {
  const date = parseLocalDateValue(dateText) || new Date();
  return new Intl.DateTimeFormat("zh-CN", {
    month: "numeric",
    day: "numeric"
  }).format(date);
}

function getDateWeekday(dateText) {
  return (parseLocalDateValue(dateText) || new Date()).getDay();
}

function isSameDateValue(left, right) {
  return String(left || "") === String(right || "");
}

function clampViewMode(viewMode) {
  return ["day", "week", "month"].includes(viewMode) ? viewMode : "day";
}

function createDefaultDraft(dateText = getTodayValue(), overrides = {}) {
  return {
    title: "",
    scheduleType: "day",
    ownerType: "user",
    ownerId: "",
    companionIncludesUser: false,
    companionContactIds: [],
    visibilityMode: "all",
    visibleContactIds: [],
    date: dateText,
    startTime: "09:00",
    endTime: "10:00",
    notifyCompanions: false,
    ...overrides
  };
}

function getUserDisplayName() {
  return String(state.profile.username || DEFAULT_PROFILE.username).trim() || DEFAULT_PROFILE.username;
}

function getActorKey(actorType = "user", actorId = "") {
  return actorType === "contact" && String(actorId || "").trim()
    ? `contact:${String(actorId || "").trim()}`
    : USER_ACTOR_KEY;
}

function getFilterActorOptions() {
  return [
    {
      key: USER_ACTOR_KEY,
      type: "user",
      id: "",
      label: getUserDisplayName()
    },
    ...state.contacts.map((contact) => ({
      key: getActorKey("contact", contact.id),
      type: "contact",
      id: contact.id,
      label: contact.name
    }))
  ];
}

function normalizeFilterActorKeys(actorKeys = []) {
  const availableKeys = new Set(getFilterActorOptions().map((option) => option.key));
  return [...new Set(actorKeys.map((item) => String(item || "").trim()).filter((item) => availableKeys.has(item)))];
}

function hasActiveOwnerFilter() {
  return Array.isArray(state.filterActorKeys) && state.filterActorKeys.length > 0;
}

function getActiveOwnerFilterSummary() {
  if (!hasActiveOwnerFilter()) {
    return "全部";
  }
  const optionMap = new Map(getFilterActorOptions().map((option) => [option.key, option.label]));
  const labels = state.filterActorKeys.map((key) => optionMap.get(key)).filter(Boolean);
  if (!labels.length) {
    return "全部";
  }
  if (labels.length === 1) {
    return labels[0];
  }
  if (labels.length === 2) {
    return labels.join("、");
  }
  return `${labels.slice(0, 2).join("、")} 等 ${labels.length} 位`;
}

function getAvailableCompanionOptions(draft = state.draft) {
  const resolvedDraft = draft && typeof draft === "object" ? draft : state.draft;
  const options = [];

  if (resolvedDraft.ownerType === "contact") {
    options.push({
      key: USER_ACTOR_KEY,
      type: "user",
      id: "",
      label: getUserDisplayName()
    });
  }

  state.contacts.forEach((contact) => {
    if (resolvedDraft.ownerType === "contact" && contact.id === resolvedDraft.ownerId) {
      return;
    }
    options.push({
      key: getActorKey("contact", contact.id),
      type: "contact",
      id: contact.id,
      label: contact.name
    });
  });

  return options;
}

function sanitizeDraftCompanions(draft = state.draft) {
  const resolvedDraft = draft && typeof draft === "object" ? draft : state.draft;
  const options = getAvailableCompanionOptions(resolvedDraft);
  const contactIdSet = new Set(
    options.filter((option) => option.type === "contact").map((option) => option.id)
  );
  return {
    ...resolvedDraft,
    companionIncludesUser:
      resolvedDraft.ownerType === "contact" &&
      options.some((option) => option.type === "user") &&
      Boolean(resolvedDraft.companionIncludesUser),
    companionContactIds: [...new Set(
      (Array.isArray(resolvedDraft.companionContactIds) ? resolvedDraft.companionContactIds : [])
        .map((item) => String(item || "").trim())
        .filter((item) => contactIdSet.has(item))
    )]
  };
}

function getEntryParticipants(entry) {
  const participants = [];
  const pushParticipant = (actorType, actorId, label, relation = "companion") => {
    const key = getActorKey(actorType, actorId);
    if (participants.some((item) => item.key === key)) {
      return;
    }
    participants.push({
      key,
      type: actorType,
      id: actorType === "contact" ? String(actorId || "").trim() : "",
      label: String(label || "").trim() || (actorType === "contact" ? "角色" : getUserDisplayName()),
      relation
    });
  };

  if (entry.ownerType === "contact" && entry.ownerId) {
    pushParticipant("contact", entry.ownerId, getContactName(entry.ownerId), "owner");
  } else {
    pushParticipant("user", "", getUserDisplayName(), "owner");
  }

  if (entry.ownerType === "contact" && entry.companionIncludesUser) {
    pushParticipant("user", "", getUserDisplayName(), "companion");
  }

  entry.companionContactIds.forEach((contactId) => {
    pushParticipant("contact", contactId, getContactName(contactId), "companion");
  });

  return participants;
}

function expandScheduleEntryForDisplay(entry) {
  const participants = getEntryParticipants(entry);
  return participants.map((participant) => ({
    ...entry,
    sourceEntryId: entry.id,
    displayOwnerKey: participant.key,
    displayOwnerType: participant.type,
    displayOwnerId: participant.id,
    displayOwnerName: participant.label,
    displayRelation: participant.relation,
    displayCompanionNames: participants
      .filter((item) => item.key !== participant.key)
      .map((item) => item.label)
  }));
}

function setStatus(message = "", tone = "") {
  if (!scheduleStatusEl) {
    return;
  }
  scheduleStatusEl.textContent = message;
  scheduleStatusEl.className = `schedule-status${tone ? ` ${tone}` : ""}`;
}

function setEditorStatus(message = "", tone = "") {
  if (!scheduleEditorStatusEl) {
    return;
  }
  scheduleEditorStatusEl.textContent = message;
  scheduleEditorStatusEl.className = `schedule-editor-status${tone ? ` ${tone}` : ""}`;
}

function getContactName(contactId = "") {
  return getContactById(contactId)?.name || "角色";
}

function entryOccursOnDate(entry, dateText) {
  if (entry.scheduleType === "week") {
    return getDateWeekday(entry.date) === getDateWeekday(dateText);
  }
  return isSameDateValue(entry.date, dateText);
}

function isDisplayEntryVisible(entry) {
  return !hasActiveOwnerFilter() || state.filterActorKeys.includes(entry.displayOwnerKey);
}

function getEntriesForDate(dateText) {
  return state.entries
    .filter((entry) => entryOccursOnDate(entry, dateText))
    .flatMap((entry) => expandScheduleEntryForDisplay(entry))
    .filter((entry) => isDisplayEntryVisible(entry))
    .sort((left, right) => {
      const leftTime = left.scheduleType === "day" ? "00:00" : left.startTime;
      const rightTime = right.scheduleType === "day" ? "00:00" : right.startTime;
      return (
        leftTime.localeCompare(rightTime) ||
        (left.scheduleType === "day" ? -1 : 1) - (right.scheduleType === "day" ? -1 : 1) ||
        String(left.displayOwnerName || "").localeCompare(String(right.displayOwnerName || ""), "zh-CN") ||
        (right.updatedAt || 0) - (left.updatedAt || 0)
      );
    });
}

function getEntriesCountInDateList(dateList = []) {
  return dateList.reduce((total, dateText) => total + getEntriesForDate(dateText).length, 0);
}

function formatEntryTime(entry) {
  if (entry.scheduleType === "day") {
    return "全天";
  }
  if (entry.scheduleType === "week") {
    return `每周 ${formatWeekday(entry.date, "short")} ${entry.startTime}-${entry.endTime}`;
  }
  return `${entry.startTime}-${entry.endTime}`;
}

function padNumber(value) {
  return String(value).padStart(2, "0");
}

function getHourTimeText(hour) {
  return `${padNumber(hour)}:00`;
}

function getNextHourTimeText(hour) {
  return `${padNumber(Math.min(23, hour + 1))}:${hour >= 23 ? "59" : "00"}`;
}

function parseTimeHour(timeText = "") {
  const match = String(timeText || "").trim().match(/^(\d{2}):(\d{2})$/);
  return match ? Number(match[1]) : 0;
}

function parseTimeMinute(timeText = "") {
  const match = String(timeText || "").trim().match(/^(\d{2}):(\d{2})$/);
  return match ? Number(match[2]) : 0;
}

function parseTimeToMinutes(timeText = "") {
  return parseTimeHour(timeText) * 60 + parseTimeMinute(timeText);
}

function getEntryVisibleEndHour(entry) {
  const startMinutes = parseTimeToMinutes(entry.startTime);
  const endMinutes = Math.max(startMinutes + 1, parseTimeToMinutes(entry.endTime));
  return Math.max(parseTimeHour(entry.startTime), Math.min(23, Math.floor(endMinutes / 60)));
}

function entryOccupiesHour(entry, hour) {
  if (!entry || entry.scheduleType === "day") {
    return false;
  }
  const startMinutes = parseTimeToMinutes(entry.startTime);
  const endMinutes = Math.max(startMinutes + 1, parseTimeToMinutes(entry.endTime));
  const slotStart = hour * 60;
  const slotEnd = Math.min(24 * 60, (hour + 1) * 60);
  return startMinutes < slotEnd && endMinutes >= slotStart;
}

function getTimedEntrySlotState(entry, hour) {
  if (!entryOccupiesHour(entry, hour)) {
    return "hidden";
  }
  return parseTimeHour(entry.startTime) === hour ? "start" : "continuation";
}

function getDayEntryBuckets(dateText) {
  const entries = getEntriesForDate(dateText);
  return {
    allDayEntries: entries.filter((entry) => entry.scheduleType === "day"),
    timedEntries: entries.filter((entry) => entry.scheduleType !== "day")
  };
}

function getVisibleTimelineHours(dateText) {
  return Array.from({ length: 24 }, (_, index) => index);
}

function getDefaultAddHourForDate(dateText) {
  if (isSameDateValue(dateText, getTodayValue())) {
    return Math.min(23, Math.max(0, new Date().getHours()));
  }
  return 9;
}

function getTimedEntriesForHour(dateText, hour) {
  return getDayEntryBuckets(dateText).timedEntries.filter((entry) => entryOccupiesHour(entry, hour));
}

function getWeekTimelineHours() {
  return Array.from({ length: 24 }, (_, index) => index);
}

function formatVisibilityLabel(entry) {
  if (entry.ownerType !== "user") {
    return getContactName(entry.ownerId);
  }
  if (entry.visibilityMode === "all") {
    return "全部角色可见";
  }
  if (entry.visibleContactIds.length) {
    return `可见 ${entry.visibleContactIds.length} 位角色`;
  }
  return "仅自己";
}

function getOwnerChipClass(entry) {
  return entry.displayOwnerType === "contact" || entry.ownerType === "contact"
    ? "schedule-chip schedule-chip--contact"
    : "schedule-chip schedule-chip--user";
}

function formatParticipantLabel(entry) {
  const names = Array.isArray(entry.displayCompanionNames) ? entry.displayCompanionNames.filter(Boolean) : [];
  if (!names.length) {
    if (entry.ownerType === "user" && (entry.displayOwnerType || entry.ownerType) === "user") {
      return formatVisibilityLabel(entry);
    }
    return "";
  }
  return `同行：${names.slice(0, 2).join("、")}${names.length > 2 ? ` 等 ${names.length} 位` : ""}`;
}

function renderEntryCard(entry) {
  const ownerType = entry.displayOwnerType || entry.ownerType;
  const ownerLabel =
    entry.displayOwnerName ||
    (ownerType === "contact" ? getContactName(entry.displayOwnerId || entry.ownerId) : getUserDisplayName());
  const participantLabel = formatParticipantLabel(entry);
  return `
    <button class="schedule-entry" type="button" data-action="edit-entry" data-entry-id="${escapeHtml(entry.sourceEntryId || entry.id)}">
      <div class="schedule-entry__top">
        <span class="schedule-entry__title">${escapeHtml(entry.title)}</span>
        <span class="schedule-entry__time">${escapeHtml(formatEntryTime(entry))}</span>
      </div>
      <div class="schedule-entry__meta">
        <span class="${getOwnerChipClass(entry)}">${escapeHtml(ownerType === "contact" ? "角色" : "用户")} · ${escapeHtml(ownerLabel)}</span>
        ${
          participantLabel
            ? `<span class="schedule-chip schedule-chip--visibility">${escapeHtml(participantLabel)}</span>`
            : ""
        }
      </div>
    </button>
  `;
}

function renderMiniEntries(entries, maxCount = 2) {
  if (!entries.length) {
    return '<div class="schedule-month-cell__empty">点击添加</div>';
  }
  const visibleEntries = entries.slice(0, maxCount);
  const moreCount = entries.length - visibleEntries.length;
  return [
    ...visibleEntries.map(
      (entry) => `
        <div class="schedule-mini-entry">
          <strong>${escapeHtml(entry.title)}</strong>
          <span>${escapeHtml(formatEntryTime(entry))}</span>
        </div>
      `
    ),
    moreCount > 0 ? `<div class="schedule-mini-entry schedule-mini-entry--more">+${moreCount} 条更多</div>` : ""
  ].join("");
}

function renderDayView(dateText) {
  const { allDayEntries } = getDayEntryBuckets(dateText);
  const timelineHours = getVisibleTimelineHours(dateText);
  const defaultAddHour = getDefaultAddHourForDate(dateText);
  return `
    <section class="schedule-day-view">
      <section class="schedule-timeline" aria-label="小时日程时间轴">
        <div class="schedule-time-row schedule-time-row--all-day">
          <div class="schedule-time-row__label schedule-time-row__label--all-day">全天</div>
          <div class="schedule-time-row__body schedule-time-row__body--all-day${allDayEntries.length ? " has-entry" : ""}">
            ${
              allDayEntries.length
                ? `
                    <div class="schedule-time-row__entries">
                      ${allDayEntries
                        .map(
                          (entry) => `
                            <button
                              class="schedule-time-entry schedule-time-entry--all-day"
                              type="button"
                              data-action="edit-entry"
                              data-entry-id="${escapeHtml(entry.sourceEntryId || entry.id)}"
                            >
                              <span class="schedule-time-entry__title">${escapeHtml(entry.title)}</span>
                              <span class="schedule-time-entry__meta">${escapeHtml(
                                `${(entry.displayOwnerType || entry.ownerType) === "contact" ? "角色" : "用户"} ${
                                  entry.displayOwnerName ||
                                  ((entry.displayOwnerType || entry.ownerType) === "contact"
                                    ? getContactName(entry.displayOwnerId || entry.ownerId)
                                    : getUserDisplayName())
                                }`
                              )}</span>
                            </button>
                          `
                        )
                        .join("")}
                    </div>
                  `
                : `
                    <button
                      class="schedule-day-all-day-add"
                      type="button"
                      data-action="add-hour-slot"
                      data-date="${escapeHtml(dateText)}"
                      data-hour="${escapeHtml(padNumber(defaultAddHour))}"
                      aria-label="默认按小时新增日程"
                    >
                      +
                    </button>
                  `
            }
          </div>
        </div>
        ${timelineHours
          .map((hour) => {
            const entries = getTimedEntriesForHour(dateText, hour);
            return `
              <div class="schedule-time-row">
                <div class="schedule-time-row__label">${escapeHtml(getHourTimeText(hour))}</div>
                <div class="schedule-time-row__body${entries.length ? " has-entry" : ""}">
                  ${
                    entries.length
                      ? `
                          <div class="schedule-time-row__entries">
                            ${entries
                              .map(
                                (entry) => `
                                  <button
                                    class="schedule-time-entry schedule-time-entry--${escapeHtml(
                                      getTimedEntrySlotState(entry, hour)
                                    )}"
                                    type="button"
                                    data-action="edit-entry"
                                    data-entry-id="${escapeHtml(entry.sourceEntryId || entry.id)}"
                                  >
                                    <span class="schedule-time-entry__title">${escapeHtml(entry.title)}</span>
                                    <span class="schedule-time-entry__meta">${escapeHtml(
                                      getTimedEntrySlotState(entry, hour) === "continuation"
                                        ? `延续中 · 至 ${entry.endTime}`
                                        : formatEntryTime(entry)
                                    )} · ${escapeHtml(
                                      `${(entry.displayOwnerType || entry.ownerType) === "contact" ? "角色" : "用户"} ${
                                        entry.displayOwnerName ||
                                        ((entry.displayOwnerType || entry.ownerType) === "contact"
                                          ? getContactName(entry.displayOwnerId || entry.ownerId)
                                          : getUserDisplayName())
                                      }`
                                    )}</span>
                                  </button>
                                `
                              )
                              .join("")}
                          </div>
                        `
                      : '<div class="schedule-time-row__empty" aria-hidden="true"></div>'
                  }
                </div>
              </div>
            `;
          })
          .join("")}
      </section>
    </section>
  `;
}

function renderWeekView(dateText) {
  const weekDates = getWeekDates(dateText);
  const hours = getWeekTimelineHours();
  return `
    <section class="schedule-week-view">
      <div class="schedule-week-timeline">
        <div
          class="schedule-week-timeline__grid"
          style="grid-template-columns: 58px repeat(${weekDates.length}, minmax(96px, 1fr));"
        >
          <div class="schedule-week-timeline__corner"></div>
          ${weekDates
            .map((value) => {
              const date = parseLocalDateValue(value);
              const isToday = isSameDateValue(value, getTodayValue());
              return `
                <div class="schedule-week-timeline__head${isToday ? " is-today" : ""}">
                  <span class="schedule-week-timeline__weekday">${escapeHtml(formatWeekday(value, "short"))}</span>
                  <strong class="schedule-week-timeline__day">${escapeHtml(String(date?.getDate() || ""))}</strong>
                </div>
              `;
            })
            .join("")}

          <div class="schedule-week-timeline__time schedule-week-timeline__time--all-day">全天</div>
          ${weekDates
            .map((value) => {
              const allDayEntries = getDayEntryBuckets(value).allDayEntries;
              const isToday = isSameDateValue(value, getTodayValue());
              return `
                <div class="schedule-week-timeline__cell schedule-week-timeline__cell--all-day${isToday ? " is-today" : ""}">
                  ${
                    allDayEntries.length
                      ? allDayEntries
                          .map(
                            (entry) => `
                              <button
                                class="schedule-week-timeline__entry schedule-week-timeline__entry--all-day"
                                type="button"
                                data-action="edit-entry"
                                data-entry-id="${escapeHtml(entry.sourceEntryId || entry.id)}"
                              >
                                ${escapeHtml(entry.title)}
                              </button>
                            `
                          )
                          .join("")
                      : `
                          <button
                            class="schedule-week-timeline__slot"
                            type="button"
                            data-action="add-day"
                            data-date="${escapeHtml(value)}"
                          >
                            +
                          </button>
                        `
                  }
                </div>
              `;
            })
            .join("")}

          ${hours
            .map(
              (hour) => `
                <div class="schedule-week-timeline__time">${escapeHtml(getHourTimeText(hour))}</div>
                ${weekDates
                  .map((value) => {
                    const entries = getTimedEntriesForHour(value, hour);
                    const isToday = isSameDateValue(value, getTodayValue());
                    return `
                      <div class="schedule-week-timeline__cell${isToday ? " is-today" : ""}">
                        ${
                          entries.length
                            ? entries
                                .map(
                                  (entry) => `
                                    <button
                                      class="schedule-week-timeline__entry schedule-week-timeline__entry--${escapeHtml(
                                        getTimedEntrySlotState(entry, hour)
                                      )}"
                                      type="button"
                                      data-action="edit-entry"
                                      data-entry-id="${escapeHtml(entry.sourceEntryId || entry.id)}"
                                    >
                                      <span class="schedule-week-timeline__entry-title">${escapeHtml(entry.title)}</span>
                                      <span class="schedule-week-timeline__entry-meta">${escapeHtml(
                                        getTimedEntrySlotState(entry, hour) === "continuation"
                                          ? `延续至 ${entry.endTime}`
                                          : `${entry.startTime}-${entry.endTime}`
                                      )}</span>
                                    </button>
                                  `
                                )
                                .join("")
                            : `
                                <button
                                  class="schedule-week-timeline__slot"
                                  type="button"
                                  data-action="add-hour-slot"
                                  data-date="${escapeHtml(value)}"
                                  data-hour="${escapeHtml(padNumber(hour))}"
                                  aria-label="新增 ${escapeHtml(
                                    `${formatShortDate(value)} ${getHourTimeText(hour)}`
                                  )} 的小时日程"
                                ></button>
                              `
                        }
                      </div>
                    `;
                  })
                  .join("")}
              `
            )
            .join("")}
        </div>
      </div>
    </section>
  `;
}

function buildMonthGridDates(dateText) {
  const baseDate = parseLocalDateValue(dateText) || new Date();
  const firstDay = new Date(baseDate.getFullYear(), baseDate.getMonth(), 1);
  const firstValue = formatDateValue(firstDay);
  const gridStart = getWeekStart(firstValue);
  return Array.from({ length: 42 }, (_, index) => addDays(gridStart, index));
}

function renderMonthView(dateText) {
  const baseDate = parseLocalDateValue(dateText) || new Date();
  const baseMonth = baseDate.getMonth();
  const cells = buildMonthGridDates(dateText)
    .map((value) => {
      const date = parseLocalDateValue(value) || new Date();
      const entries = getEntriesForDate(value);
      const isOutside = date.getMonth() !== baseMonth;
      const isToday = isSameDateValue(value, getTodayValue());
      const isSelected = isSameDateValue(value, state.cursorDate);
      return `
        <button
          class="schedule-month-cell${isOutside ? " is-outside" : ""}${isToday ? " is-today" : ""}${isSelected ? " is-selected" : ""}"
          type="button"
          data-action="add-day"
          data-date="${escapeHtml(value)}"
        >
          <div class="schedule-month-cell__top">
            <span class="schedule-month-cell__weekday">${escapeHtml(formatWeekday(value, "short"))}</span>
            <span class="schedule-month-cell__day">${escapeHtml(String(date.getDate()))}</span>
          </div>
          <div class="schedule-month-cell__items">${renderMiniEntries(entries, 2)}</div>
        </button>
      `;
    })
    .join("");
  return `<section class="schedule-month-view"><div class="schedule-month-grid">${cells}</div></section>`;
}

function renderViewSwitch() {
  scheduleViewSwitchEl?.querySelectorAll("[data-view]").forEach((button) => {
    button.classList.toggle("is-active", button.getAttribute("data-view") === state.viewMode);
  });
}

function renderRangeSummary() {
  const filterSuffix = hasActiveOwnerFilter() ? ` 当前筛选：${getActiveOwnerFilterSummary()}。` : "";
  if (state.viewMode === "day") {
    const entries = getEntriesForDate(state.cursorDate);
    if (scheduleRangeLabelEl) {
      scheduleRangeLabelEl.textContent = formatFullDate(state.cursorDate);
    }
    if (scheduleRangeSubtitleEl) {
      scheduleRangeSubtitleEl.textContent = entries.length
        ? `当天共有 ${entries.length} 条日程；可用右上角 + 继续新增。${filterSuffix}`
        : `这一天还没有安排；可用右上角 + 新增日程。${filterSuffix}`;
    }
    return;
  }

  if (state.viewMode === "week") {
    const weekDates = getWeekDates(state.cursorDate);
    if (scheduleRangeLabelEl) {
      scheduleRangeLabelEl.textContent = `${formatShortDate(weekDates[0])} - ${formatShortDate(
        weekDates[6]
      )}`;
    }
    if (scheduleRangeSubtitleEl) {
      scheduleRangeSubtitleEl.textContent = `本周共 ${getEntriesCountInDateList(weekDates)} 条日程。${filterSuffix}`;
    }
    return;
  }

  const monthDates = buildMonthGridDates(state.cursorDate).filter((value) => {
    const date = parseLocalDateValue(value);
    const baseDate = parseLocalDateValue(state.cursorDate) || new Date();
    return date?.getMonth() === baseDate.getMonth();
  });
  if (scheduleRangeLabelEl) {
    scheduleRangeLabelEl.textContent = formatMonthTitle(state.cursorDate);
  }
  if (scheduleRangeSubtitleEl) {
    scheduleRangeSubtitleEl.textContent = `本月共 ${getEntriesCountInDateList(monthDates)} 条日程。${filterSuffix}`;
  }
}

function renderSchedulePage() {
  renderFilterButtonState();
  renderViewSwitch();
  renderRangeSummary();
  if (!scheduleContentEl) {
    return;
  }
  if (state.viewMode === "week") {
    scheduleContentEl.innerHTML = renderWeekView(state.cursorDate);
    return;
  }
  if (state.viewMode === "month") {
    scheduleContentEl.innerHTML = renderMonthView(state.cursorDate);
    return;
  }
  scheduleContentEl.innerHTML = renderDayView(state.cursorDate);
}

function refreshModalOpenState() {
  document.body.classList.toggle("schedule-modal-open", state.editorOpen || state.filterOpen);
}

function setEditorOpen(isOpen, options = {}) {
  state.editorOpen = Boolean(isOpen);
  if (!scheduleEditorModalEl) {
    return;
  }
  scheduleEditorModalEl.hidden = !state.editorOpen;
  scheduleEditorModalEl.setAttribute("aria-hidden", String(!state.editorOpen));
  refreshModalOpenState();

  if (!state.editorOpen) {
    state.editorMode = "create";
    state.editingEntryId = "";
    state.draft = createDefaultDraft(state.cursorDate);
    setEditorStatus("");
    return;
  }

  if (options.entryId) {
    const entry = state.entries.find((item) => item.id === options.entryId);
    if (entry) {
      state.editorMode = "edit";
      state.editingEntryId = entry.id;
      state.draft = {
        title: entry.title,
        scheduleType: entry.scheduleType,
        ownerType: entry.ownerType,
        ownerId: entry.ownerId,
        companionIncludesUser: Boolean(entry.companionIncludesUser),
        companionContactIds: [...entry.companionContactIds],
        visibilityMode: entry.visibilityMode,
        visibleContactIds: [...entry.visibleContactIds],
        date: entry.date,
        startTime: entry.startTime,
        endTime: entry.endTime,
        notifyCompanions: false
      };
    }
  } else {
    state.editorMode = "create";
    state.editingEntryId = "";
    state.draft = createDefaultDraft(options.date || state.cursorDate, {
      scheduleType: options.scheduleType || "day",
      startTime: options.startTime || "09:00",
      endTime: options.endTime || "10:00"
    });
  }

  renderEditor();
  window.setTimeout(() => {
    scheduleTitleInputEl?.focus();
  }, 0);
}

function setFilterOpen(isOpen) {
  state.filterOpen = Boolean(isOpen);
  if (!scheduleFilterModalEl) {
    return;
  }
  scheduleFilterModalEl.hidden = !state.filterOpen;
  scheduleFilterModalEl.setAttribute("aria-hidden", String(!state.filterOpen));
  refreshModalOpenState();

  if (!state.filterOpen) {
    state.filterDraftActorKeys = [];
    setFilterStatus("");
    return;
  }

  state.filterDraftActorKeys = hasActiveOwnerFilter()
    ? [...state.filterActorKeys]
    : getFilterActorOptions().map((option) => option.key);
  renderFilterOptions();
  setFilterStatus("");
}

function renderOwnerContactOptions() {
  if (!scheduleOwnerContactSelectEl) {
    return;
  }
  if (!state.contacts.length) {
    scheduleOwnerContactSelectEl.innerHTML = '<option value="">暂无可选角色</option>';
    scheduleOwnerContactSelectEl.value = "";
    return;
  }
  scheduleOwnerContactSelectEl.innerHTML = [
    '<option value="">请选择角色</option>',
    ...state.contacts.map(
      (contact) => `<option value="${escapeHtml(contact.id)}">${escapeHtml(contact.name)}</option>`
    )
  ].join("");
  scheduleOwnerContactSelectEl.value = state.contacts.some((contact) => contact.id === state.draft.ownerId)
    ? state.draft.ownerId
    : "";
}

function renderVisibilityOptions() {
  if (!scheduleVisibleContactsEl) {
    return;
  }
  if (!state.contacts.length) {
    scheduleVisibleContactsEl.innerHTML = '<div class="schedule-visibility-empty">当前还没有角色。先去 Chat 的通讯录创建人物，再回来选择可见范围。</div>';
    scheduleVisibleContactsEl.classList.toggle("is-disabled", true);
    return;
  }
  scheduleVisibleContactsEl.classList.toggle("is-disabled", state.draft.visibilityMode === "all");
  scheduleVisibleContactsEl.innerHTML = state.contacts
    .map(
      (contact) => `
        <label class="schedule-visibility-option">
          <input
            type="checkbox"
            value="${escapeHtml(contact.id)}"
            data-role="visible-contact"
            ${state.draft.visibleContactIds.includes(contact.id) ? "checked" : ""}
            ${state.draft.visibilityMode === "all" ? "disabled" : ""}
          />
          <span>${escapeHtml(contact.name)}</span>
        </label>
      `
    )
    .join("");
}

function renderCompanionOptions() {
  if (!scheduleCompanionOptionsEl || !scheduleCompanionFieldEl) {
    return;
  }

  state.draft = sanitizeDraftCompanions(state.draft);
  const options = getAvailableCompanionOptions(state.draft);
  scheduleCompanionFieldEl.toggleAttribute("hidden", !options.length);

  if (!options.length) {
    scheduleCompanionOptionsEl.innerHTML =
      '<div class="schedule-visibility-empty">当前没有可选同行人。</div>';
    return;
  }

  scheduleCompanionOptionsEl.innerHTML = options
    .map((option) => {
      if (option.type === "user") {
        return `
          <label class="schedule-visibility-option">
            <input
              type="checkbox"
              data-role="companion-user"
              ${state.draft.companionIncludesUser ? "checked" : ""}
            />
            <span>${escapeHtml(option.label)}</span>
          </label>
        `;
      }

      return `
        <label class="schedule-visibility-option">
          <input
            type="checkbox"
            value="${escapeHtml(option.id)}"
            data-role="companion-contact"
            ${state.draft.companionContactIds.includes(option.id) ? "checked" : ""}
          />
          <span>${escapeHtml(option.label)}</span>
        </label>
      `;
    })
    .join("");
}

function renderFilterButtonState() {
  if (!scheduleFilterBtnEl) {
    return;
  }
  const active = hasActiveOwnerFilter();
  scheduleFilterBtnEl.classList.toggle("is-active", active);
  scheduleFilterBtnEl.setAttribute(
    "aria-label",
    active ? `筛选查看对象（当前：${getActiveOwnerFilterSummary()}）` : "筛选查看对象"
  );
}

function renderFilterOptions() {
  if (!scheduleFilterOptionsEl) {
    return;
  }

  const options = getFilterActorOptions();
  if (!options.length) {
    scheduleFilterOptionsEl.innerHTML =
      '<div class="schedule-visibility-empty">当前没有可筛选的对象。</div>';
    return;
  }

  const draftKeySet = new Set(state.filterDraftActorKeys);
  scheduleFilterOptionsEl.innerHTML = options
    .map(
      (option) => `
        <label class="schedule-visibility-option">
          <input
            type="checkbox"
            value="${escapeHtml(option.key)}"
            data-role="filter-actor"
            ${draftKeySet.has(option.key) ? "checked" : ""}
          />
          <span>${escapeHtml(option.type === "user" ? `用户 · ${option.label}` : `角色 · ${option.label}`)}</span>
        </label>
      `
    )
    .join("");
}

function setFilterStatus(message = "", tone = "") {
  if (!scheduleFilterStatusEl) {
    return;
  }
  scheduleFilterStatusEl.textContent = message;
  scheduleFilterStatusEl.className = `schedule-editor-status${tone ? ` ${tone}` : ""}`;
}

function renderEditor() {
  state.draft = sanitizeDraftCompanions(state.draft);
  if (scheduleEditorTitleEl) {
    scheduleEditorTitleEl.textContent = state.editorMode === "edit" ? "编辑日程" : "新增日程";
  }
  if (scheduleDeleteBtnEl) {
    scheduleDeleteBtnEl.hidden = state.editorMode !== "edit";
  }
  if (scheduleTitleInputEl) {
    scheduleTitleInputEl.value = state.draft.title || "";
  }
  if (scheduleTypeSelectEl) {
    scheduleTypeSelectEl.value = state.draft.scheduleType;
  }
  if (scheduleOwnerTypeSelectEl) {
    scheduleOwnerTypeSelectEl.value = state.draft.ownerType;
  }
  if (scheduleVisibleAllInputEl) {
    scheduleVisibleAllInputEl.checked = state.draft.visibilityMode === "all";
  }
  if (scheduleDateInputEl) {
    scheduleDateInputEl.value = state.draft.date;
  }
  if (scheduleStartTimeInputEl) {
    scheduleStartTimeInputEl.value = state.draft.startTime || "09:00";
  }
  if (scheduleEndTimeInputEl) {
    scheduleEndTimeInputEl.value = state.draft.endTime || "10:00";
  }
  if (scheduleNotifyCompanionsInputEl) {
    scheduleNotifyCompanionsInputEl.checked = Boolean(state.draft.notifyCompanions);
  }

  renderOwnerContactOptions();
  renderVisibilityOptions();
  renderCompanionOptions();

  const showContactField = state.draft.ownerType === "contact";
  scheduleOwnerContactFieldEl?.toggleAttribute("hidden", !showContactField);
  scheduleVisibilityFieldEl?.toggleAttribute("hidden", showContactField);
  scheduleNotifyCompanionsFieldEl?.toggleAttribute(
    "hidden",
    state.editorMode !== "create" || !state.draft.companionContactIds.length
  );

  const showTimeGrid = state.draft.scheduleType !== "day";
  scheduleTimeGridEl?.toggleAttribute("hidden", !showTimeGrid);

  if (scheduleTypeHintEl) {
    scheduleTypeHintEl.textContent =
      state.draft.scheduleType === "week"
        ? `每周按 ${formatWeekday(state.draft.date, "long")} 重复一次。`
        : state.draft.scheduleType === "hour"
          ? "按具体起止时间记录这一天的安排。"
          : "按全天安排记录，不区分小时。";
  }
}

function collectEditorDraft() {
  const visibleContactIds = scheduleVisibleContactsEl
    ? [...scheduleVisibleContactsEl.querySelectorAll("input[data-role='visible-contact']:checked")]
        .map((input) => (input instanceof HTMLInputElement ? String(input.value || "").trim() : ""))
        .filter(Boolean)
    : [];
  const companionContactIds = scheduleCompanionOptionsEl
    ? [...scheduleCompanionOptionsEl.querySelectorAll("input[data-role='companion-contact']:checked")]
        .map((input) => (input instanceof HTMLInputElement ? String(input.value || "").trim() : ""))
        .filter(Boolean)
    : [];
  const companionIncludesUser = Boolean(
    scheduleCompanionOptionsEl?.querySelector("input[data-role='companion-user']:checked")
  );
  return sanitizeDraftCompanions({
    title: String(scheduleTitleInputEl?.value || "").trim(),
    scheduleType: String(scheduleTypeSelectEl?.value || "day").trim(),
    ownerType: String(scheduleOwnerTypeSelectEl?.value || "user").trim(),
    ownerId: String(scheduleOwnerContactSelectEl?.value || "").trim(),
    companionIncludesUser,
    companionContactIds,
    visibilityMode: scheduleVisibleAllInputEl?.checked ? "all" : "selected",
    visibleContactIds,
    date: String(scheduleDateInputEl?.value || "").trim() || state.cursorDate,
    startTime: String(scheduleStartTimeInputEl?.value || "09:00").trim(),
    endTime: String(scheduleEndTimeInputEl?.value || "10:00").trim(),
    notifyCompanions: Boolean(scheduleNotifyCompanionsInputEl?.checked)
  });
}

function saveDraft(draft) {
  const existingEntry = state.entries.find((entry) => entry.id === state.editingEntryId);
  const base = {
    ...draft,
    id: state.editingEntryId || `schedule_${Date.now()}_${hashText(`${draft.title}-${draft.date}`)}`,
    inviteDecisions: existingEntry?.inviteDecisions || {},
    createdAt: existingEntry?.createdAt || Date.now(),
    updatedAt: Date.now()
  };
  const normalized = normalizeScheduleEntry(base, state.entries.length);
  if (state.editorMode === "edit" && state.editingEntryId) {
    state.entries = state.entries.map((entry) => (entry.id === state.editingEntryId ? normalized : entry));
  } else {
    state.entries = [normalized, ...state.entries];
  }
  persistScheduleEntries();
  renderSchedulePage();
  return normalized;
}

async function notifyCompanionsForEntry(entry) {
  const inviteEntry = normalizeScheduleEntry(entry, 0);
  const inviteeIds = [...new Set(inviteEntry.companionContactIds.map((item) => String(item || "").trim()).filter(Boolean))];
  if (!inviteeIds.length) {
    return {
      total: 0,
      acceptedCount: 0,
      rejectedCount: 0,
      failedCount: 0
    };
  }

  const settings = loadSettings();
  const results = await runTasksWithConcurrency(
    inviteeIds,
    MAX_SCHEDULE_INVITE_CONCURRENCY,
    async (contactId) => {
      const contact = getContactById(contactId);
      if (!contact) {
        throw new Error("未找到同行人角色。");
      }
      const existingConversation = getConversationByContactId(contact.id) || createConversation(contact);
      const historyMessages = Array.isArray(existingConversation?.messages)
        ? existingConversation.messages.map((message) => ({ ...message }))
        : [];
      const inviteTimestamp = Date.now();
      appendMessagesToConversation(contact, [
        {
          id: `message_${inviteTimestamp}_${hashText(`${inviteEntry.id}_${contact.id}`)}`,
          role: "user",
          messageType: "schedule_invite",
          scheduleInviteTitle: inviteEntry.title,
          scheduleInviteDate: inviteEntry.date,
          scheduleInviteStartTime: inviteEntry.startTime,
          scheduleInviteEndTime: inviteEntry.endTime,
          scheduleInviteType: inviteEntry.scheduleType,
          needsReply: false,
          time: formatTimeLabel(inviteTimestamp),
          createdAt: inviteTimestamp
        }
      ]);
      const decision = await requestScheduleInviteDecision(
        settings,
        state.profile,
        contact,
        inviteEntry,
        historyMessages
      );
      const replyLines = splitAssistantReplyText(decision.reply);
      if (replyLines.length) {
        appendMessagesToConversation(
          contact,
          replyLines.map((line, index) => ({
            id: `message_${Date.now()}_${index}_${hashText(`${contact.id}_${line}`)}`,
            role: "assistant",
            text: line,
            time: formatTimeLabel(Date.now()),
            createdAt: Date.now() + index
          }))
        );
      }
      return {
        contactId: contact.id,
        contactName: contact.name,
        decision: decision.decision
      };
    }
  );

  const resultMap = {};
  let acceptedCount = 0;
  let rejectedCount = 0;
  let failedCount = 0;
  results.forEach((result) => {
    const contactId = String(result?.item || "").trim();
    if (result.status !== "success") {
      failedCount += 1;
      return;
    }
    const decision = String(result.value?.decision || "").trim();
    if (!contactId || !decision) {
      failedCount += 1;
      return;
    }
    resultMap[contactId] = decision;
    if (decision === "accept") {
      acceptedCount += 1;
    } else if (decision === "reject") {
      rejectedCount += 1;
    }
  });

  state.entries = state.entries.map((currentEntry, index) => {
    if (currentEntry.id !== inviteEntry.id) {
      return currentEntry;
    }
    const nextInviteDecisions = {
      ...(currentEntry.inviteDecisions || {}),
      ...resultMap
    };
    const nextCompanionIds = currentEntry.companionContactIds.filter(
      (contactId) => nextInviteDecisions[contactId] !== "reject"
    );
    return normalizeScheduleEntry(
      {
        ...currentEntry,
        companionContactIds: nextCompanionIds,
        inviteDecisions: nextInviteDecisions,
        updatedAt: Date.now()
      },
      index
    );
  });
  persistScheduleEntries();
  renderSchedulePage();

  return {
    total: inviteeIds.length,
    acceptedCount,
    rejectedCount,
    failedCount
  };
}

async function handleEditorSubmit(event) {
  event.preventDefault();
  const draft = collectEditorDraft();

  if (!draft.title) {
    setEditorStatus("请输入日程标题。", "error");
    return;
  }
  if (!draft.date) {
    setEditorStatus("请选择日程日期。", "error");
    return;
  }
  if (draft.ownerType === "contact" && !draft.ownerId) {
    setEditorStatus("请选择一个角色。", "error");
    return;
  }
  if (draft.scheduleType !== "day") {
    const start = parseLocalDateTimeValue(draft.date, draft.startTime);
    const end = parseLocalDateTimeValue(draft.date, draft.endTime);
    if (!start || !end) {
      setEditorStatus("请填写完整的开始和结束时间。", "error");
      return;
    }
    if (end <= start) {
      setEditorStatus("结束时间需要晚于开始时间。", "error");
      return;
    }
  }

  const actionMode = state.editorMode;
  const savedEntry = saveDraft(draft);
  setEditorOpen(false);
  if (actionMode === "create" && draft.notifyCompanions && savedEntry?.companionContactIds.length) {
    setStatus("日程已新增，正在通知同行人…", "success");
    try {
      const summary = await notifyCompanionsForEntry(savedEntry);
      const summaryParts = [];
      if (summary.acceptedCount) {
        summaryParts.push(`${summary.acceptedCount} 位接受`);
      }
      if (summary.rejectedCount) {
        summaryParts.push(`${summary.rejectedCount} 位拒绝`);
      }
      if (summary.failedCount) {
        summaryParts.push(`${summary.failedCount} 位失败`);
      }
      setStatus(
        summary.total
          ? `日程已新增，同行人邀请结果：${summaryParts.join("，") || "暂无返回结果"}。`
          : "日程已新增，没有可通知的角色同行人。",
        summary.failedCount && !summary.acceptedCount && !summary.rejectedCount ? "error" : "success"
      );
    } catch (error) {
      setStatus(`日程已新增，但通知同行人失败：${error?.message || "请求失败"}`, "error");
    }
    return;
  }
  setStatus(actionMode === "edit" ? "日程已更新。" : "日程已新增。", "success");
}

function handleDeleteEntry() {
  if (!state.editingEntryId) {
    return;
  }
  const target = state.entries.find((entry) => entry.id === state.editingEntryId);
  if (!target) {
    return;
  }
  const confirmed = window.confirm(`确定删除日程「${target.title}」吗？`);
  if (!confirmed) {
    return;
  }
  state.entries = state.entries.filter((entry) => entry.id !== state.editingEntryId);
  persistScheduleEntries();
  setEditorOpen(false);
  renderSchedulePage();
  setStatus("日程已删除。", "success");
}

function shiftCursor(step) {
  if (state.viewMode === "month") {
    state.cursorDate = addMonths(state.cursorDate, step);
  } else if (state.viewMode === "week") {
    state.cursorDate = addDays(state.cursorDate, step * 7);
  } else {
    state.cursorDate = addDays(state.cursorDate, step);
  }
  renderSchedulePage();
}

function attachEvents() {
  scheduleBackBtnEl?.addEventListener("click", () => {
    if (isEmbeddedView()) {
      requestEmbeddedClose();
      return;
    }
    window.location.href = "./index.html";
  });

  scheduleAddBtnEl?.addEventListener("click", () => {
    setEditorOpen(true, { date: state.cursorDate });
  });

  scheduleFilterBtnEl?.addEventListener("click", () => {
    setFilterOpen(true);
  });

  scheduleViewSwitchEl?.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) {
      return;
    }
    const button = target.closest("[data-view]");
    if (!(button instanceof HTMLElement)) {
      return;
    }
    state.viewMode = clampViewMode(button.dataset.view || "day");
    renderSchedulePage();
  });

  schedulePrevBtnEl?.addEventListener("click", () => {
    shiftCursor(-1);
  });

  scheduleNextBtnEl?.addEventListener("click", () => {
    shiftCursor(1);
  });

  scheduleTodayBtnEl?.addEventListener("click", () => {
    state.cursorDate = getTodayValue();
    renderSchedulePage();
  });

  scheduleContentEl?.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) {
      return;
    }
    const addDayEl = target.closest("[data-action='add-day']");
    if (addDayEl instanceof HTMLElement) {
      const date = String(addDayEl.dataset.date || state.cursorDate).trim() || state.cursorDate;
      state.cursorDate = date;
      setEditorOpen(true, { date, scheduleType: "day" });
      renderSchedulePage();
      return;
    }
    const addHourEl = target.closest("[data-action='add-hour-slot']");
    if (addHourEl instanceof HTMLElement) {
      const date = String(addHourEl.dataset.date || state.cursorDate).trim() || state.cursorDate;
      const hour = Number.parseInt(String(addHourEl.dataset.hour || "9").trim(), 10);
      const resolvedHour = Number.isFinite(hour) ? Math.min(23, Math.max(0, hour)) : 9;
      state.cursorDate = date;
      setEditorOpen(true, {
        date,
        scheduleType: "hour",
        startTime: getHourTimeText(resolvedHour),
        endTime: getNextHourTimeText(resolvedHour)
      });
      renderSchedulePage();
      return;
    }
    const editEntryEl = target.closest("[data-action='edit-entry']");
    if (editEntryEl instanceof HTMLElement) {
      const entryId = String(editEntryEl.dataset.entryId || "").trim();
      if (entryId) {
        setEditorOpen(true, { entryId });
      }
    }
  });

  scheduleEditorCloseBtnEl?.addEventListener("click", () => {
    setEditorOpen(false);
  });

  scheduleEditorCancelBtnEl?.addEventListener("click", () => {
    setEditorOpen(false);
  });

  scheduleEditorFormEl?.addEventListener("submit", handleEditorSubmit);

  scheduleDeleteBtnEl?.addEventListener("click", handleDeleteEntry);

  scheduleEditorModalEl?.addEventListener("click", (event) => {
    if (
      event.target === scheduleEditorModalEl ||
      event.target?.classList?.contains("schedule-modal__backdrop")
    ) {
      setEditorOpen(false);
    }
  });

  scheduleTypeSelectEl?.addEventListener("change", () => {
    state.draft = { ...state.draft, scheduleType: String(scheduleTypeSelectEl.value || "day").trim() };
    renderEditor();
    setEditorStatus("");
  });

  scheduleOwnerTypeSelectEl?.addEventListener("change", () => {
    const ownerType = String(scheduleOwnerTypeSelectEl.value || "user").trim();
    state.draft = sanitizeDraftCompanions({
      ...state.draft,
      ownerType,
      ownerId: ownerType === "contact" ? state.draft.ownerId : "",
      visibilityMode: ownerType === "user" ? state.draft.visibilityMode : "all"
    });
    renderEditor();
    setEditorStatus("");
  });

  scheduleOwnerContactSelectEl?.addEventListener("change", () => {
    state.draft = sanitizeDraftCompanions({
      ...state.draft,
      ownerId: String(scheduleOwnerContactSelectEl.value || "").trim()
    });
    renderEditor();
    setEditorStatus("");
  });

  scheduleVisibleAllInputEl?.addEventListener("change", () => {
    state.draft = {
      ...state.draft,
      visibilityMode: scheduleVisibleAllInputEl.checked ? "all" : "selected"
    };
    renderVisibilityOptions();
    setEditorStatus("");
  });

  scheduleVisibleContactsEl?.addEventListener("change", () => {
    state.draft = {
      ...state.draft,
      visibleContactIds: collectEditorDraft().visibleContactIds
    };
    setEditorStatus("");
  });

  scheduleDateInputEl?.addEventListener("change", () => {
    state.draft = { ...state.draft, date: String(scheduleDateInputEl.value || state.cursorDate).trim() };
    renderEditor();
    setEditorStatus("");
  });

  scheduleCompanionOptionsEl?.addEventListener("change", () => {
    const draft = collectEditorDraft();
    state.draft = {
      ...state.draft,
      companionIncludesUser: draft.companionIncludesUser,
      companionContactIds: draft.companionContactIds,
      notifyCompanions:
        draft.companionContactIds.length > 0 && Boolean(scheduleNotifyCompanionsInputEl?.checked)
    };
    renderEditor();
    setEditorStatus("");
  });

  scheduleNotifyCompanionsInputEl?.addEventListener("change", () => {
    state.draft = {
      ...state.draft,
      notifyCompanions: Boolean(scheduleNotifyCompanionsInputEl.checked)
    };
    setEditorStatus("");
  });

  [scheduleTitleInputEl, scheduleStartTimeInputEl, scheduleEndTimeInputEl].forEach((input) => {
    input?.addEventListener("input", () => {
      setEditorStatus("");
    });
  });

  scheduleFilterCloseBtnEl?.addEventListener("click", () => {
    setFilterOpen(false);
  });

  scheduleFilterCancelBtnEl?.addEventListener("click", () => {
    setFilterOpen(false);
  });

  scheduleFilterSelectAllBtnEl?.addEventListener("click", () => {
    state.filterDraftActorKeys = getFilterActorOptions().map((option) => option.key);
    renderFilterOptions();
    setFilterStatus("已选中全部对象。", "success");
  });

  scheduleFilterClearBtnEl?.addEventListener("click", () => {
    state.filterDraftActorKeys = [];
    renderFilterOptions();
    setFilterStatus("未选择对象时会恢复查看全部日程。", "success");
  });

  scheduleFilterOptionsEl?.addEventListener("change", () => {
    state.filterDraftActorKeys = normalizeFilterActorKeys(
      [...scheduleFilterOptionsEl.querySelectorAll("input[data-role='filter-actor']:checked")]
        .map((input) => (input instanceof HTMLInputElement ? input.value : ""))
    );
    setFilterStatus("");
  });

  scheduleFilterApplyBtnEl?.addEventListener("click", () => {
    const nextKeys = normalizeFilterActorKeys(state.filterDraftActorKeys);
    const allKeys = getFilterActorOptions().map((option) => option.key);
    state.filterActorKeys =
      nextKeys.length === 0 || nextKeys.length === allKeys.length ? [] : nextKeys;
    setFilterOpen(false);
    renderSchedulePage();
    setStatus(
      hasActiveOwnerFilter()
        ? `已筛选：${getActiveOwnerFilterSummary()}。`
        : "已恢复查看全部日程。",
      "success"
    );
  });

  scheduleFilterModalEl?.addEventListener("click", (event) => {
    if (
      event.target === scheduleFilterModalEl ||
      event.target?.classList?.contains("schedule-modal__backdrop")
    ) {
      setFilterOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && state.editorOpen) {
      setEditorOpen(false);
      return;
    }
    if (event.key === "Escape" && state.filterOpen) {
      setFilterOpen(false);
      return;
    }
    if (event.key === "Escape" && isEmbeddedView()) {
      requestEmbeddedClose();
    }
  });
}

function init() {
  document.body.classList.toggle("embedded", isEmbeddedView());
  bindScheduleViewportHeight();
  renderSchedulePage();
  attachEvents();
}

init();
