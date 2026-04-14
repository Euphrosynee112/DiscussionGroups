const PROFILE_KEY = "x_style_generator_profile_v1";
const MESSAGE_CONTACTS_KEY = "x_style_generator_message_contacts_v1";
const SCHEDULE_ENTRIES_KEY = "x_style_generator_schedule_entries_v1";
const MESSAGE_COMMON_PLACES_KEY = "x_style_generator_common_places_v1";
const MESSAGE_PRESENCE_STATE_KEY = "x_style_generator_presence_state_v1";
const SETTINGS_KEY = "x_style_generator_settings_v2";
const MESSAGE_THREADS_KEY = "x_style_generator_message_threads_v1";
const DIRECT_MESSAGES_KEY = "x_style_generator_direct_messages_v1";
const DEFAULT_OPENAI_ENDPOINT = "https://api.deepseek.com/chat/completions";
const DEFAULT_GROK_ENDPOINT = "https://api.x.ai/v1/chat/completions";
const DEFAULT_GEMINI_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta";
const DEFAULT_DEEPSEEK_MODEL = "deepseek-chat";
const DEFAULT_GROK_MODEL = "grok-4";
const DEFAULT_GEMINI_MODEL = "gemini-2.0-flash";
const DEFAULT_TEMPERATURE = 0.85;
const MAX_SCHEDULE_INVITE_CONCURRENCY = 3;
const DEFAULT_MESSAGE_HISTORY_ROUNDS = 6;

const COMMON_PLACE_TYPE_OPTIONS = [
  { value: "home", label: "住宅" },
  { value: "family", label: "家庭" },
  { value: "work", label: "工作" },
  { value: "school", label: "学校" },
  { value: "leisure", label: "娱乐" },
  { value: "other", label: "其他" }
];

const DEFAULT_PROFILE = {
  username: "用户",
  personaPrompt: ""
};

const DEFAULT_SETTINGS = {
  mode: "openai",
  endpoint: DEFAULT_OPENAI_ENDPOINT,
  token: "",
  model: DEFAULT_DEEPSEEK_MODEL,
  temperature: DEFAULT_TEMPERATURE,
  apiConfigs: [],
  activeApiConfigId: "",
  negativePromptConstraints: [],
  privacyAllowlist: [],
  messagePromptSettings: {
    historyRounds: DEFAULT_MESSAGE_HISTORY_ROUNDS
  }
};

const scheduleBackBtnEl = document.querySelector("#schedule-back-btn");
const scheduleFilterBtnEl = document.querySelector("#schedule-filter-btn");
const scheduleClearRangeBtnEl = document.querySelector("#schedule-clear-range-btn");
const schedulePlacesBtnEl = document.querySelector("#schedule-places-btn");
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
const schedulePlaceSelectEl = document.querySelector("#schedule-place-select");
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
const scheduleClearModalEl = document.querySelector("#schedule-clear-modal");
const scheduleClearCloseBtnEl = document.querySelector("#schedule-clear-close-btn");
const scheduleClearCancelBtnEl = document.querySelector("#schedule-clear-cancel-btn");
const scheduleClearFormEl = document.querySelector("#schedule-clear-form");
const scheduleClearActorSelectEl = document.querySelector("#schedule-clear-actor-select");
const scheduleClearPresetTodayBtnEl = document.querySelector("#schedule-clear-preset-today-btn");
const scheduleClearPresetWeekBtnEl = document.querySelector("#schedule-clear-preset-week-btn");
const scheduleClearPresetMonthBtnEl = document.querySelector("#schedule-clear-preset-month-btn");
const scheduleClearStartDateInputEl = document.querySelector("#schedule-clear-start-date-input");
const scheduleClearStartTimeInputEl = document.querySelector("#schedule-clear-start-time-input");
const scheduleClearEndDateInputEl = document.querySelector("#schedule-clear-end-date-input");
const scheduleClearEndTimeInputEl = document.querySelector("#schedule-clear-end-time-input");
const scheduleClearStatusEl = document.querySelector("#schedule-clear-status");
const schedulePlacesModalEl = document.querySelector("#schedule-places-modal");
const schedulePlacesCloseBtnEl = document.querySelector("#schedule-places-close-btn");
const schedulePlacesAddBtnEl = document.querySelector("#schedule-places-add-btn");
const schedulePlacesStatusEl = document.querySelector("#schedule-places-status");
const schedulePlacesListEl = document.querySelector("#schedule-places-list");
const schedulePlaceEditorModalEl = document.querySelector("#schedule-place-editor-modal");
const schedulePlaceEditorCloseBtnEl = document.querySelector("#schedule-place-editor-close-btn");
const schedulePlaceEditorTitleEl = document.querySelector("#schedule-place-editor-title");
const schedulePlaceEditorFormEl = document.querySelector("#schedule-place-editor-form");
const schedulePlaceNameInputEl = document.querySelector("#schedule-place-name-input");
const schedulePlaceTypeSelectEl = document.querySelector("#schedule-place-type-select");
const schedulePlaceAliasesInputEl = document.querySelector("#schedule-place-aliases-input");
const schedulePlaceTraitsInputEl = document.querySelector("#schedule-place-traits-input");
const schedulePlaceVisibilitySelectEl = document.querySelector("#schedule-place-visibility-select");
const schedulePlaceVisibleContactsFieldEl = document.querySelector("#schedule-place-visible-contacts-field");
const schedulePlaceVisibleContactsListEl = document.querySelector("#schedule-place-visible-contacts-list");
const schedulePlaceEditorStatusEl = document.querySelector("#schedule-place-editor-status");
const schedulePlaceEditorDeleteBtnEl = document.querySelector("#schedule-place-editor-delete-btn");
const schedulePlaceEditorCancelBtnEl = document.querySelector("#schedule-place-editor-cancel-btn");

const memoryStorage = {};
const USER_ACTOR_KEY = "user:self";

const state = {
  profile: loadProfile(),
  contacts: loadContacts(),
  entries: loadScheduleEntries(),
  commonPlaces: loadCommonPlaces(),
  viewMode: "day",
  cursorDate: getTodayValue(),
  editorOpen: false,
  filterOpen: false,
  clearRangeOpen: false,
  placesManagerOpen: false,
  placeEditorOpen: false,
  editorMode: "create",
  editingEntryId: "",
  placeEditorId: "",
  draft: createDefaultDraft(getTodayValue()),
  clearDraft: createDefaultClearDraft(getTodayValue()),
  filterActorKeys: [],
  filterDraftActorKeys: [],
  monthExpandedDates: []
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

function normalizeMountedIds(value) {
  if (Array.isArray(value)) {
    return [...new Set(value.map((item) => String(item || "").trim()).filter(Boolean))];
  }
  const single = String(value || "").trim();
  return single ? [single] : [];
}

function normalizeCommonPlaceType(value = "") {
  const resolved = String(value || "").trim().toLowerCase();
  return COMMON_PLACE_TYPE_OPTIONS.some((item) => item.value === resolved) ? resolved : "other";
}

function getCommonPlaceTypeLabel(type = "") {
  return (
    COMMON_PLACE_TYPE_OPTIONS.find((item) => item.value === normalizeCommonPlaceType(type))?.label ||
    "其他"
  );
}

function normalizeCommonPlaceAliases(value) {
  const lines = Array.isArray(value) ? value : String(value || "").split(/\r?\n/g);
  return [...new Set(lines.map((item) => String(item || "").trim()).filter(Boolean))].slice(0, 20);
}

function normalizeCommonPlaceVisibilityMode(value = "") {
  const resolved = String(value || "").trim();
  if (resolved === "all_contacts" || resolved === "selected_contacts") {
    return resolved;
  }
  return "self";
}

function normalizeCommonPlace(place, index = 0) {
  const source = place && typeof place === "object" ? place : {};
  const name = String(source.name || "").trim() || `常用地点 ${index + 1}`;
  return {
    id: String(source.id || `common_place_${index}_${hashText(name)}`),
    name: name.slice(0, 40),
    type: normalizeCommonPlaceType(source.type),
    aliases: normalizeCommonPlaceAliases(source.aliases),
    traitsText: String(source.traitsText || source.specialText || source.description || "").trim(),
    visibilityMode: normalizeCommonPlaceVisibilityMode(source.visibilityMode),
    visibleContactIds: normalizeMountedIds(source.visibleContactIds || source.contactIds || []),
    lastUsedAt: Number(source.lastUsedAt) || 0,
    createdAt: Number(source.createdAt) || Date.now(),
    updatedAt: Number(source.updatedAt) || Date.now()
  };
}

function loadCommonPlaces() {
  const raw = readStoredJson(MESSAGE_COMMON_PLACES_KEY, []);
  return Array.isArray(raw)
    ? raw
        .map((item, index) => normalizeCommonPlace(item, index))
        .filter((item) => String(item.name || "").trim())
        .sort((left, right) => (right.updatedAt || 0) - (left.updatedAt || 0))
    : [];
}

function persistCommonPlaces() {
  safeSetItem(MESSAGE_COMMON_PLACES_KEY, JSON.stringify(state.commonPlaces));
}

function getCommonPlaceById(placeId = "") {
  const resolvedId = String(placeId || "").trim();
  if (!resolvedId) {
    return null;
  }
  return state.commonPlaces.find((item) => item.id === resolvedId) || null;
}

function buildCommonPlaceAliasList(place) {
  return normalizeCommonPlaceAliases(place?.aliases || []).filter(
    (alias) => alias.toLowerCase() !== String(place?.name || "").trim().toLowerCase()
  );
}

function getCommonPlaceVisibilityLabel(place) {
  const resolvedPlace = place && typeof place === "object" ? place : {};
  if (resolvedPlace.visibilityMode === "all_contacts") {
    return "全部角色可见";
  }
  if (resolvedPlace.visibilityMode === "selected_contacts") {
    const names = normalizeMountedIds(resolvedPlace.visibleContactIds)
      .map((contactId) => getContactById(contactId)?.name || "")
      .filter(Boolean);
    return names.length ? `指定角色 · ${names.slice(0, 2).join("、")}${names.length > 2 ? "…" : ""}` : "指定角色";
  }
  return "仅自己知道";
}

function normalizePresenceTransferEntry(source = {}) {
  const resolved = source && typeof source === "object" ? source : {};
  return {
    presenceType: String(resolved.presenceType || "").trim() === "in_transit" ? "in_transit" : "at_place",
    placeId: String(resolved.placeId || "").trim(),
    fromPlaceId: String(resolved.fromPlaceId || "").trim(),
    toPlaceId: String(resolved.toPlaceId || "").trim(),
    updatedAt: Number(resolved.updatedAt) || 0
  };
}

function sanitizePresenceStateForPlaces(value = {}, places = state.commonPlaces) {
  const validPlaceIds = new Set(
    (Array.isArray(places) ? places : [])
      .map((place) => String(place?.id || "").trim())
      .filter(Boolean)
  );
  const sanitizeEntry = (entry = {}) => {
    const normalized = normalizePresenceTransferEntry(entry);
    return {
      ...normalized,
      placeId: validPlaceIds.has(normalized.placeId) ? normalized.placeId : "",
      fromPlaceId: validPlaceIds.has(normalized.fromPlaceId) ? normalized.fromPlaceId : "",
      toPlaceId: validPlaceIds.has(normalized.toPlaceId) ? normalized.toPlaceId : ""
    };
  };
  const resolved = value && typeof value === "object" ? value : {};
  return {
    userGlobal: sanitizeEntry(resolved.userGlobal),
    userByContact: Object.fromEntries(
      Object.entries(resolved.userByContact || {}).map(([contactId, entry]) => [
        String(contactId || "").trim(),
        sanitizeEntry(entry)
      ])
    ),
    contacts: Object.fromEntries(
      Object.entries(resolved.contacts || {}).map(([contactId, entry]) => [
        String(contactId || "").trim(),
        sanitizeEntry(entry)
      ])
    )
  };
}

function sanitizeStoredPresenceStateForCommonPlaces() {
  const rawPresenceState =
    readStoredJson(MESSAGE_PRESENCE_STATE_KEY, {
      userGlobal: {},
      userByContact: {},
      contacts: {}
    }) || {};
  const nextPresenceState = sanitizePresenceStateForPlaces(rawPresenceState, state.commonPlaces);
  safeSetItem(MESSAGE_PRESENCE_STATE_KEY, JSON.stringify(nextPresenceState));
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
  if (mode === "gemini" || mode === "generic" || mode === "grok") {
    return mode;
  }
  return "openai";
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
        temperature: normalizeTemperature(item.temperature, DEFAULT_TEMPERATURE),
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
  merged.temperature = normalizeTemperature(merged.temperature, DEFAULT_TEMPERATURE);
  merged.model =
    merged.mode === "generic"
      ? ""
      : String(merged.model || getDefaultModelByMode(merged.mode)).trim() ||
        getDefaultModelByMode(merged.mode);
  merged.apiConfigs = normalizeApiConfigs(merged.apiConfigs || []);
  merged.negativePromptConstraints = normalizeNegativePromptConstraints(
    merged.negativePromptConstraints || source?.negativePromptConstraints || []
  );
  const activeConfig =
    merged.apiConfigs.find((item) => item.id === merged.activeApiConfigId) || null;
  if (!activeConfig) {
    merged.activeApiConfigId = "";
  } else {
    merged.mode = normalizeApiMode(activeConfig.mode);
    merged.endpoint = normalizeSettingsEndpointByMode(activeConfig.mode, activeConfig.endpoint);
    merged.token = normalizeApiConfigToken(activeConfig.token);
    merged.temperature = normalizeTemperature(activeConfig.temperature, DEFAULT_TEMPERATURE);
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
  if (isOpenAICompatibleMode(mode)) {
    return {
      model: settings.model || getDefaultModelByMode(mode),
      temperature: normalizeTemperature(settings.temperature, DEFAULT_TEMPERATURE),
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
        temperature: normalizeTemperature(settings.temperature, DEFAULT_TEMPERATURE)
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
    temperature: normalizeTemperature(settings.temperature, DEFAULT_TEMPERATURE),
    intent: "schedule_invite"
  };
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
  return `${entry.date} · ${
    isOvernightHourEntry(entry) ? `${entry.startTime}-次日${entry.endTime}` : `${entry.startTime}-${entry.endTime}`
  }`;
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
    placeId: String(source.placeId || "").trim(),
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

function sanitizeScheduleEntriesForPlaces(entries = state.entries) {
  const validPlaceIds = new Set(state.commonPlaces.map((place) => String(place.id || "").trim()).filter(Boolean));
  let changed = false;
  const nextEntries = (Array.isArray(entries) ? entries : []).map((entry, index) => {
    const normalized = normalizeScheduleEntry(entry, index);
    const nextPlaceId = validPlaceIds.has(String(normalized.placeId || "").trim())
      ? String(normalized.placeId || "").trim()
      : "";
    if (nextPlaceId === normalized.placeId) {
      return normalized;
    }
    changed = true;
    return normalizeScheduleEntry(
      {
        ...normalized,
        placeId: nextPlaceId
      },
      index
    );
  });
  return {
    nextEntries,
    changed
  };
}

function formatTimeLabel(timestamp = Date.now()) {
  const date = new Date(Number(timestamp) || Date.now());
  return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
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

function buildStructuredPromptSections(promptTypeOrSections = {}, maybeSections = null, maybeOptions = {}) {
  if (typeof promptTypeOrSections === "string" && window.PulsePromptConfig?.buildPrompt) {
    const configuredPrompt = window.PulsePromptConfig.buildPrompt(
      promptTypeOrSections,
      maybeSections && typeof maybeSections === "object" ? maybeSections : {},
      maybeOptions && typeof maybeOptions === "object" ? maybeOptions : {}
    );
    if (configuredPrompt) {
      return prependGlobalPromptGuard(
        configuredPrompt,
        maybeOptions && typeof maybeOptions === "object" ? maybeOptions.settings : undefined
      );
    }
  }
  const resolvedSections =
    promptTypeOrSections && typeof promptTypeOrSections === "object"
      ? promptTypeOrSections
      : maybeSections && typeof maybeSections === "object"
        ? maybeSections
        : {};
  return prependGlobalPromptGuard(
    [
      `<context_library>\n${buildPromptSectionText(
        resolvedSections.contextLibrary,
        "暂无额外背景信息。"
      )}\n</context_library>`,
      `<persona_alignment>\n${buildPromptSectionText(
        resolvedSections.personaAlignment,
        "按当前已知身份与关系自然回应。"
      )}\n</persona_alignment>`,
      `<output_standard>\n${buildPromptSectionText(
        resolvedSections.outputStandard,
        "只输出符合要求的最终结果。"
      )}\n</output_standard>`
    ].join("\n\n"),
    maybeOptions && typeof maybeOptions === "object" ? maybeOptions.settings : undefined
  );
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
  const leftRange = buildEntryOccurrenceRange(left, left.date);
  const rightRange = buildEntryOccurrenceRange(right, right.date);
  const leftStart = leftRange?.start || null;
  const leftEnd = leftRange?.end || null;
  const rightStart = rightRange?.start || null;
  const rightEnd = rightRange?.end || null;
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
    return "你当前没有明确冲突的已知行程，也不要凭空说自己要去忙、赶时间，或拿不存在的安排当理由。";
  }

  return [
    "你当前已知的同时间段相关行程：",
    ...relevantEntries.map((entry) => `- ${entry.title} · ${buildScheduleInviteTimeLabel(entry)}`)
  ].join("\n");
}

function buildScheduleInviteSystemPrompt(profile, contact, inviteEntry, options = {}) {
  const companionNames = Array.isArray(options.companionNames) ? options.companionNames : [];
  return buildStructuredPromptSections(
    "schedule_invite",
    {
      context_library: {
        conflict_context: buildInviteConflictContext(contact, inviteEntry),
        companion_names: companionNames.length
          ? `除你之外，这次同行人还有：${companionNames.join("、")}。`
          : "这次邀请没有其他角色同行人。"
      },
      persona_alignment: {
        special_user_persona: contact.specialUserPersona
          ? `你对这个用户的特别认知：${contact.specialUserPersona}。`
          : ""
      }
    },
    {
      settings: loadSettings(),
      variables: {
        contactName: contact.name,
        contactPersona: contact.personaPrompt || "自然、友好，会根据关系和现实安排做决定。",
        userName: profile.username || DEFAULT_PROFILE.username,
        userPersona:
          profile.personaPrompt || DEFAULT_PROFILE.personaPrompt || "用户有自己稳定的人设和表达方式。"
      }
    }
  );
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
  function extractDecisionCandidate(value, depth = 0) {
    if (depth > 6 || value == null) {
      return null;
    }
    if (typeof value === "string") {
      const parsed = parseJsonLikeContent(value);
      return parsed ? extractDecisionCandidate(parsed, depth + 1) : null;
    }
    if (Array.isArray(value)) {
      for (const item of value) {
        const match = extractDecisionCandidate(item, depth + 1);
        if (match) {
          return match;
        }
      }
      return null;
    }
    if (typeof value !== "object") {
      return null;
    }
    const decision = String(value.decision || "").trim().toLowerCase();
    const reply = String(value.reply || "").trim();
    if (["accept", "reject"].includes(decision) && reply) {
      return {
        decision,
        reply
      };
    }
    const nestedKeys = [
      "message",
      "text",
      "content",
      "data",
      "output",
      "choices",
      "candidates",
      "parts",
      "result",
      "response"
    ];
    for (const key of nestedKeys) {
      if (!Object.prototype.hasOwnProperty.call(value, key)) {
        continue;
      }
      const match = extractDecisionCandidate(value[key], depth + 1);
      if (match) {
        return match;
      }
    }
    return null;
  }

  const fallbackText = String(resolveMessage(payload) || "").trim();
  const parsed =
    extractDecisionCandidate(payload) ||
    extractDecisionCandidate(parseJsonLikeContent(payload)) ||
    extractDecisionCandidate(parseJsonLikeContent(fallbackText));
  if (parsed) {
    return parsed;
  }
  const normalizedText = fallbackText.replace(/\s+/g, " ").trim();
  const accepts = /(accept|接受|答应|同意|可以|好呀|好啊|行呀|行啊|没问题|可以呀|可以的|去呀|去啊)/i.test(
    normalizedText
  );
  const rejects = /(reject|拒绝|不行|没空|不方便|改天|下次|抱歉|去不了|不能去|撞时间|有安排了)/i.test(
    normalizedText
  );
  if (normalizedText && accepts !== rejects) {
    return {
      decision: accepts ? "accept" : "reject",
      reply: normalizedText
    };
  }
  throw new Error("日程邀请响应格式错误：缺少有效的 accept/reject 决策或回复文本。");
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
  const structuredOutputContext = createStructuredOutputContext(
    settings,
    "schedule_invite_decision_v1"
  );
  const userInstruction = appendStructuredOutputPromptHint(
    buildScheduleInviteUserInstruction(inviteEntry, companionNames),
    structuredOutputContext
  );
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
  const requestBody = decorateRequestBodyWithStructuredOutput(
    buildChatRequestBody(settings, encodedSystemPrompt, encodedHistory),
    structuredOutputContext
  );
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

    let repairResult = null;
    let structuredPayload = parseStructuredOutputPayload(payload, structuredOutputContext);
    if (structuredOutputContext.enabled && !structuredPayload) {
      repairResult = await requestStructuredRepairOnce(
        settings,
        requestEndpoint,
        structuredOutputContext,
        rawResponse,
        "schedule_invite_repair"
      );
      if (repairResult?.ok) {
        structuredPayload = repairResult.structuredPayload;
      }
      if (!structuredPayload) {
        const errorMessage = "日程邀请返回了不可解析的结构化内容。";
        appendApiLog({
          ...logEntry,
          status: "error",
          statusCode: repairResult?.status || response.status,
          responseText: rawResponse,
          responseBody: payload,
          repairAttempted: Boolean(repairResult),
          repairResponseText: repairResult?.rawResponseText || "",
          repairResponseBody: repairResult?.payload || null,
          errorMessage
        });
        logged = true;
        throw new Error(errorMessage);
      }
    }

    const decision = parseScheduleInviteDecision(structuredPayload || repairResult?.payload || payload);
    appendApiLog({
      ...logEntry,
      status: "success",
      statusCode: response.status,
      responseText: repairResult?.rawResponseText || rawResponse,
      responseBody: repairResult?.payload || payload,
      repairAttempted: Boolean(repairResult),
      originalResponseText: repairResult ? rawResponse : "",
      originalResponseBody: repairResult ? payload : null
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
    placeId: "",
    date: dateText,
    startTime: "09:00",
    endTime: "10:00",
    notifyCompanions: false,
    ...overrides
  };
}

function createDefaultClearDraft(dateText = getTodayValue(), overrides = {}) {
  return {
    actorKey: USER_ACTOR_KEY,
    startDate: dateText,
    startTime: "00:00",
    endDate: dateText,
    endTime: "23:59",
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

function getActorLabelByKey(actorKey = USER_ACTOR_KEY) {
  const option = getFilterActorOptions().find((item) => item.key === actorKey);
  return option?.label || (actorKey === USER_ACTOR_KEY ? getUserDisplayName() : "角色");
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

function buildDisplayScheduleEntriesForDate(entry, dateText = "") {
  const resolvedDateText = String(dateText || "").trim();
  const resolvedEntry = entry && typeof entry === "object" ? entry : null;
  if (!resolvedEntry || !resolvedDateText) {
    return [];
  }

  const expandedEntries = expandScheduleEntryForDisplay(resolvedEntry);
  if (!isOvernightHourEntry(resolvedEntry)) {
    return expandedEntries;
  }

  if (resolvedDateText === String(resolvedEntry.date || "").trim()) {
    return expandedEntries.map((item) => ({
      ...item,
      displaySegment: "start-day",
      originalEndTime: item.endTime,
      endTime: "23:59"
    }));
  }

  const nextDate = addDays(String(resolvedEntry.date || "").trim(), 1);
  if (resolvedDateText === nextDate) {
    return expandedEntries.map((item) => ({
      ...item,
      displaySegment: "next-day",
      originalEndTime: item.endTime,
      startTime: "00:00"
    }));
  }

  return expandedEntries;
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
  if (isSameDateValue(entry.date, dateText)) {
    return true;
  }
  if (!isOvernightHourEntry(entry)) {
    return false;
  }
  return isSameDateValue(addDays(entry.date, 1), dateText);
}

function isDisplayEntryVisible(entry) {
  return !hasActiveOwnerFilter() || state.filterActorKeys.includes(entry.displayOwnerKey);
}

function getEntriesForDate(dateText) {
  return state.entries
    .filter((entry) => entryOccursOnDate(entry, dateText))
    .flatMap((entry) => buildDisplayScheduleEntriesForDate(entry, dateText))
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
  return getScheduleDisplayTimeText(entry);
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

function isOvernightHourEntry(entry) {
  return (
    String(entry?.scheduleType || "").trim() === "hour" &&
    parseTimeToMinutes(entry?.endTime || "") < parseTimeToMinutes(entry?.startTime || "")
  );
}

function getScheduleDisplayTimeText(entry) {
  if (!entry || entry.scheduleType === "day") {
    return "全天";
  }
  if (entry.scheduleType === "week") {
    return `每周 ${formatWeekday(entry.date, "short")} ${entry.startTime}-${entry.endTime}`;
  }
  if (String(entry.displaySegment || "").trim() === "next-day") {
    return `次日00:00-${entry.endTime}`;
  }
  if (isOvernightHourEntry(entry) || String(entry.displaySegment || "").trim() === "start-day") {
    return `${entry.startTime}-次日${entry.originalEndTime || entry.endTime}`;
  }
  return `${entry.startTime}-${entry.endTime}`;
}

function getEntryVisibleEndHour(entry) {
  const startMinutes = parseTimeToMinutes(entry.startTime);
  const endMinutes = isOvernightHourEntry(entry)
    ? 24 * 60 + parseTimeToMinutes(entry.endTime)
    : Math.max(startMinutes + 1, parseTimeToMinutes(entry.endTime));
  return Math.max(parseTimeHour(entry.startTime), Math.min(23, Math.floor((endMinutes - 1) / 60)));
}

function entryOccupiesHour(entry, hour) {
  if (!entry || entry.scheduleType === "day") {
    return false;
  }
  const startMinutes = parseTimeToMinutes(entry.startTime);
  const endMinutes = isOvernightHourEntry(entry)
    ? 24 * 60 + parseTimeToMinutes(entry.endTime)
    : Math.max(startMinutes + 1, parseTimeToMinutes(entry.endTime));
  const slotStart = hour * 60;
  const slotEnd = Math.min(24 * 60, (hour + 1) * 60);
  return startMinutes < slotEnd && endMinutes > slotStart;
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

const SCHEDULE_ENTRY_PALETTE = [
  "93,131,222",
  "81,167,121",
  "208,123,84",
  "170,109,214",
  "71,168,180",
  "224,148,74",
  "214,104,144",
  "118,144,213"
];

function getScheduleActorTone(entry) {
  const actorKey =
    String(entry?.displayOwnerKey || "").trim() ||
    getActorKey(entry?.displayOwnerType || entry?.ownerType || "user", entry?.displayOwnerId || entry?.ownerId || "");
  const index = Number.parseInt(hashText(actorKey), 36) % SCHEDULE_ENTRY_PALETTE.length;
  return SCHEDULE_ENTRY_PALETTE[Math.max(0, index)];
}

function buildScheduleActorToneStyle(entry) {
  return `--schedule-entry-rgb:${getScheduleActorTone(entry)};`;
}

function isMonthDateExpanded(dateText = "") {
  const resolvedDate = String(dateText || "").trim();
  return resolvedDate ? (Array.isArray(state.monthExpandedDates) ? state.monthExpandedDates : []).includes(resolvedDate) : false;
}

function toggleMonthDateExpanded(dateText = "") {
  const resolvedDate = String(dateText || "").trim();
  if (!resolvedDate) {
    return;
  }
  const current = new Set(Array.isArray(state.monthExpandedDates) ? state.monthExpandedDates : []);
  if (current.has(resolvedDate)) {
    current.delete(resolvedDate);
  } else {
    current.add(resolvedDate);
  }
  state.monthExpandedDates = [...current];
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

function getScheduleEntryPlaceName(entry) {
  const place = getCommonPlaceById(entry?.placeId || "");
  return String(place?.name || "").trim();
}

function renderEntryCard(entry) {
  const ownerType = entry.displayOwnerType || entry.ownerType;
  const ownerLabel =
    entry.displayOwnerName ||
    (ownerType === "contact" ? getContactName(entry.displayOwnerId || entry.ownerId) : getUserDisplayName());
  const participantLabel = formatParticipantLabel(entry);
  const placeName = getScheduleEntryPlaceName(entry);
  return `
    <button class="schedule-entry" style="${escapeHtml(buildScheduleActorToneStyle(entry))}" type="button" data-action="edit-entry" data-entry-id="${escapeHtml(entry.sourceEntryId || entry.id)}">
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
        ${
          placeName
            ? `<span class="schedule-chip schedule-chip--visibility">${escapeHtml(`地点 · ${placeName}`)}</span>`
            : ""
        }
      </div>
    </button>
  `;
}

function renderMiniEntries(entries, maxCount = 2, options = {}) {
  const resolvedOptions = options && typeof options === "object" ? options : {};
  const dateText = String(resolvedOptions.date || "").trim();
  const expanded = Boolean(resolvedOptions.expanded);
  if (!entries.length) {
    return '<div class="schedule-month-cell__empty">点击查看</div>';
  }
  const visibleEntries = expanded ? entries : entries.slice(0, maxCount);
  const moreCount = expanded ? 0 : entries.length - visibleEntries.length;
  return [
    ...visibleEntries.map(
      (entry) => `
        <div class="schedule-mini-entry">
          <div class="schedule-mini-entry__surface" style="${escapeHtml(buildScheduleActorToneStyle(entry))}">
          <strong>${escapeHtml(entry.title)}</strong>
          <span>${escapeHtml(formatEntryTime(entry))}</span>
          </div>
        </div>
      `
    ),
    moreCount > 0
      ? `<div class="schedule-mini-entry schedule-mini-entry--more" data-action="toggle-date-entries" data-date="${escapeHtml(
          dateText
        )}">+${moreCount} 条更多</div>`
      : "",
    expanded && entries.length > maxCount
      ? `<div class="schedule-mini-entry schedule-mini-entry--collapse" data-action="toggle-date-entries" data-date="${escapeHtml(
          dateText
        )}">收起</div>`
      : ""
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
                              style="${escapeHtml(buildScheduleActorToneStyle(entry))}"
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
                                }${getScheduleEntryPlaceName(entry) ? ` · ${getScheduleEntryPlaceName(entry)}` : ""}`
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
                                    style="${escapeHtml(buildScheduleActorToneStyle(entry))}"
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
                                      }${getScheduleEntryPlaceName(entry) ? ` · ${getScheduleEntryPlaceName(entry)}` : ""}`
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
                                style="${escapeHtml(buildScheduleActorToneStyle(entry))}"
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
                                      style="${escapeHtml(buildScheduleActorToneStyle(entry))}"
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
      const expanded = isMonthDateExpanded(value);
      return `
        <button
          class="schedule-month-cell${isOutside ? " is-outside" : ""}${isToday ? " is-today" : ""}${isSelected ? " is-selected" : ""}${expanded ? " is-expanded" : ""}"
          type="button"
          data-action="open-date"
          data-date="${escapeHtml(value)}"
        >
          <div class="schedule-month-cell__top">
            <span class="schedule-month-cell__weekday">${escapeHtml(formatWeekday(value, "short"))}</span>
            <span class="schedule-month-cell__day">${escapeHtml(String(date.getDate()))}</span>
          </div>
          <div class="schedule-month-cell__items">${renderMiniEntries(entries, 2, { date: value, expanded })}</div>
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
  document.body.classList.toggle(
    "schedule-modal-open",
    state.editorOpen ||
      state.filterOpen ||
      state.clearRangeOpen ||
      state.placesManagerOpen ||
      state.placeEditorOpen
  );
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
        placeId: entry.placeId || "",
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
      placeId: options.placeId || "",
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

function setClearRangeOpen(isOpen, options = {}) {
  state.clearRangeOpen = Boolean(isOpen);
  if (!scheduleClearModalEl) {
    return;
  }
  scheduleClearModalEl.hidden = !state.clearRangeOpen;
  scheduleClearModalEl.setAttribute("aria-hidden", String(!state.clearRangeOpen));
  refreshModalOpenState();

  if (!state.clearRangeOpen) {
    state.clearDraft = createDefaultClearDraft(state.cursorDate, {
      actorKey: getDefaultClearActorKey()
    });
    setClearStatus("");
    return;
  }

  const resolvedDate = String(options.date || state.cursorDate).trim() || state.cursorDate;
  state.clearDraft = createDefaultClearDraft(resolvedDate, {
    actorKey: String(options.actorKey || getDefaultClearActorKey()).trim() || getDefaultClearActorKey(),
    startDate: resolvedDate,
    endDate: resolvedDate
  });
  renderClearModal();
  window.setTimeout(() => {
    scheduleClearActorSelectEl?.focus();
  }, 0);
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

function renderSchedulePlaceOptions() {
  if (!schedulePlaceSelectEl) {
    return;
  }
  const options = [
    '<option value="">不设置地点</option>',
    ...state.commonPlaces.map(
      (place) =>
        `<option value="${escapeHtml(place.id)}">${escapeHtml(
          `${place.name} · ${getCommonPlaceTypeLabel(place.type)}`
        )}</option>`
    )
  ];
  schedulePlaceSelectEl.innerHTML = options.join("");
  const selectedPlaceId = state.commonPlaces.some((place) => place.id === state.draft.placeId)
    ? state.draft.placeId
    : "";
  schedulePlaceSelectEl.value = selectedPlaceId;
}

function setPlacesStatus(message = "", tone = "") {
  if (!schedulePlacesStatusEl) {
    return;
  }
  schedulePlacesStatusEl.textContent = message;
  schedulePlacesStatusEl.className = `schedule-editor-status${tone ? ` ${tone}` : ""}`;
}

function setPlaceEditorStatus(message = "", tone = "") {
  if (!schedulePlaceEditorStatusEl) {
    return;
  }
  schedulePlaceEditorStatusEl.textContent = message;
  schedulePlaceEditorStatusEl.className = `schedule-editor-status${tone ? ` ${tone}` : ""}`;
}

function renderPlacesManager() {
  if (!schedulePlacesListEl) {
    return;
  }
  if (!state.commonPlaces.length) {
    schedulePlacesListEl.innerHTML =
      '<div class="schedule-places-empty">还没有常用地点。<br />点击右上角“新增”，先创建一个自己家、公司或常去地点。</div>';
    return;
  }

  schedulePlacesListEl.innerHTML = state.commonPlaces
    .map((place) => {
      const aliases = buildCommonPlaceAliasList(place);
      return `
        <article class="schedule-place-card">
          <div class="schedule-place-card__head">
            <div class="schedule-place-card__title">
              <strong>${escapeHtml(place.name)}</strong>
              <span class="schedule-place-card__type">${escapeHtml(getCommonPlaceTypeLabel(place.type))}</span>
            </div>
            <span class="schedule-place-card__visibility">${escapeHtml(
              getCommonPlaceVisibilityLabel(place)
            )}</span>
          </div>
          <p class="schedule-place-card__traits">${escapeHtml(
            place.traitsText || "还没有填写地点特殊性。"
          )}</p>
          ${
            aliases.length
              ? `
                <div class="schedule-place-card__aliases">
                  ${aliases
                    .map((alias) => `<span class="schedule-place-card__alias">${escapeHtml(alias)}</span>`)
                    .join("")}
                </div>
              `
              : ""
          }
          <div class="schedule-place-card__actions">
            <button
              class="schedule-text-button"
              type="button"
              data-action="edit-common-place"
              data-place-id="${escapeHtml(place.id)}"
            >
              编辑
            </button>
            <button
              class="schedule-text-button schedule-text-button--danger"
              type="button"
              data-action="delete-common-place"
              data-place-id="${escapeHtml(place.id)}"
            >
              删除
            </button>
          </div>
        </article>
      `;
    })
    .join("");
}

function setPlacesManagerOpen(isOpen) {
  state.placesManagerOpen = Boolean(isOpen);
  if (!schedulePlacesModalEl) {
    return;
  }
  schedulePlacesModalEl.hidden = !state.placesManagerOpen;
  schedulePlacesModalEl.setAttribute("aria-hidden", String(!state.placesManagerOpen));
  refreshModalOpenState();

  if (state.placesManagerOpen) {
    renderPlacesManager();
  }
  setPlacesStatus("");
}

function renderPlaceVisibleContactsOptions(selectedIds = []) {
  if (!schedulePlaceVisibleContactsListEl) {
    return;
  }
  if (!state.contacts.length) {
    schedulePlaceVisibleContactsListEl.innerHTML =
      '<div class="schedule-visibility-empty">当前还没有角色。先去 Chat 通讯录创建人物，再回来指定可见范围。</div>';
    return;
  }
  const selectedIdSet = new Set(normalizeMountedIds(selectedIds));
  schedulePlaceVisibleContactsListEl.innerHTML = state.contacts
    .map(
      (contact) => `
        <label class="schedule-visibility-option">
          <input
            type="checkbox"
            value="${escapeHtml(contact.id)}"
            ${selectedIdSet.has(contact.id) ? "checked" : ""}
          />
          <span>${escapeHtml(contact.name)}</span>
        </label>
      `
    )
    .join("");
}

function applyPlaceEditorToForm(placeId = "") {
  const place = getCommonPlaceById(placeId);
  state.placeEditorId = place?.id || "";
  if (schedulePlaceEditorTitleEl) {
    schedulePlaceEditorTitleEl.textContent = place ? "编辑地点" : "新增地点";
  }
  if (schedulePlaceNameInputEl) {
    schedulePlaceNameInputEl.value = place?.name || "";
  }
  if (schedulePlaceTypeSelectEl) {
    schedulePlaceTypeSelectEl.value = normalizeCommonPlaceType(place?.type || "home");
  }
  if (schedulePlaceAliasesInputEl) {
    schedulePlaceAliasesInputEl.value = normalizeCommonPlaceAliases(place?.aliases || []).join("\n");
  }
  if (schedulePlaceTraitsInputEl) {
    schedulePlaceTraitsInputEl.value = String(place?.traitsText || "").trim();
  }
  if (schedulePlaceVisibilitySelectEl) {
    schedulePlaceVisibilitySelectEl.value = normalizeCommonPlaceVisibilityMode(
      place?.visibilityMode || "self"
    );
  }
  if (schedulePlaceVisibleContactsFieldEl) {
    schedulePlaceVisibleContactsFieldEl.hidden =
      normalizeCommonPlaceVisibilityMode(place?.visibilityMode || "self") !== "selected_contacts";
  }
  renderPlaceVisibleContactsOptions(place?.visibleContactIds || []);
  if (schedulePlaceEditorDeleteBtnEl) {
    schedulePlaceEditorDeleteBtnEl.hidden = !place;
  }
  setPlaceEditorStatus("");
}

function setPlaceEditorOpen(isOpen, placeId = "") {
  state.placeEditorOpen = Boolean(isOpen);
  if (!schedulePlaceEditorModalEl) {
    return;
  }
  schedulePlaceEditorModalEl.hidden = !state.placeEditorOpen;
  schedulePlaceEditorModalEl.setAttribute("aria-hidden", String(!state.placeEditorOpen));
  refreshModalOpenState();
  if (state.placeEditorOpen) {
    applyPlaceEditorToForm(placeId);
  } else {
    state.placeEditorId = "";
    setPlaceEditorStatus("");
  }
}

function getCurrentPlaceDraft() {
  const selectedVisibleContactIds = schedulePlaceVisibleContactsListEl
    ? [...schedulePlaceVisibleContactsListEl.querySelectorAll("input[type='checkbox']:checked")]
        .map((input) => (input instanceof HTMLInputElement ? String(input.value || "").trim() : ""))
        .filter(Boolean)
    : [];
  return normalizeCommonPlace({
    id: state.placeEditorId,
    name: schedulePlaceNameInputEl?.value || "",
    type: schedulePlaceTypeSelectEl?.value || "other",
    aliases: schedulePlaceAliasesInputEl?.value || "",
    traitsText: schedulePlaceTraitsInputEl?.value || "",
    visibilityMode: schedulePlaceVisibilitySelectEl?.value || "self",
    visibleContactIds: selectedVisibleContactIds,
    createdAt: getCommonPlaceById(state.placeEditorId)?.createdAt || Date.now(),
    updatedAt: Date.now()
  });
}

function saveCommonPlaceDraft(draft = getCurrentPlaceDraft()) {
  const place = normalizeCommonPlace(draft);
  if (!String(place.name || "").trim()) {
    throw new Error("请输入地点名称。");
  }
  if (
    place.visibilityMode === "selected_contacts" &&
    !normalizeMountedIds(place.visibleContactIds).length
  ) {
    throw new Error("请选择至少一个可见角色。");
  }
  const existingIndex = state.commonPlaces.findIndex((item) => item.id === place.id);
  if (existingIndex >= 0) {
    state.commonPlaces[existingIndex] = {
      ...state.commonPlaces[existingIndex],
      ...place,
      updatedAt: Date.now()
    };
  } else {
    state.commonPlaces = [{ ...place, createdAt: Date.now(), updatedAt: Date.now() }, ...state.commonPlaces];
  }
  state.commonPlaces = state.commonPlaces
    .map((item, index) => normalizeCommonPlace(item, index))
    .sort((left, right) => (right.updatedAt || 0) - (left.updatedAt || 0));
  persistCommonPlaces();
  sanitizeStoredPresenceStateForCommonPlaces();
  const { nextEntries, changed } = sanitizeScheduleEntriesForPlaces(state.entries);
  if (changed) {
    state.entries = nextEntries;
    persistScheduleEntries();
  }
  return place;
}

function deleteCommonPlace(placeId = "") {
  const place = getCommonPlaceById(placeId);
  if (!place) {
    return;
  }
  if (!window.confirm(`确定删除常用地点“${place.name}”吗？`)) {
    return;
  }
  state.commonPlaces = state.commonPlaces.filter((item) => item.id !== place.id);
  persistCommonPlaces();
  const { nextEntries, changed } = sanitizeScheduleEntriesForPlaces(state.entries);
  if (changed) {
    state.entries = nextEntries;
    persistScheduleEntries();
  }
  sanitizeStoredPresenceStateForCommonPlaces();
  renderPlacesManager();
  renderSchedulePage();
  if (state.editorOpen) {
    renderEditor();
  }
  if (state.placeEditorOpen && state.placeEditorId === place.id) {
    setPlaceEditorOpen(false);
  }
  setPlacesStatus(`已删除地点“${place.name}”。`, "success");
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

function setClearStatus(message = "", tone = "") {
  if (!scheduleClearStatusEl) {
    return;
  }
  scheduleClearStatusEl.textContent = message;
  scheduleClearStatusEl.className = `schedule-editor-status${tone ? ` ${tone}` : ""}`;
}

function getDefaultClearActorKey() {
  const filteredKeys = normalizeFilterActorKeys(state.filterActorKeys);
  const filteredContactKeys = filteredKeys.filter((key) => key !== USER_ACTOR_KEY);
  if (filteredContactKeys.length === 1) {
    return filteredContactKeys[0];
  }
  if (filteredKeys.length === 1) {
    return filteredKeys[0];
  }
  if (state.contacts.length === 1) {
    return getActorKey("contact", state.contacts[0].id);
  }
  return USER_ACTOR_KEY;
}

function renderClearActorOptions() {
  if (!scheduleClearActorSelectEl) {
    return;
  }

  const options = getFilterActorOptions();
  scheduleClearActorSelectEl.innerHTML = options
    .map(
      (option) =>
        `<option value="${escapeHtml(option.key)}">${escapeHtml(
          option.type === "user" ? `用户 · ${option.label}` : `角色 · ${option.label}`
        )}</option>`
    )
    .join("");

  const availableKeys = new Set(options.map((option) => option.key));
  const nextActorKey = availableKeys.has(state.clearDraft.actorKey)
    ? state.clearDraft.actorKey
    : getDefaultClearActorKey();
  scheduleClearActorSelectEl.value = nextActorKey;
  state.clearDraft = {
    ...state.clearDraft,
    actorKey: nextActorKey
  };
}

function renderClearModal() {
  renderClearActorOptions();
  if (scheduleClearStartDateInputEl) {
    scheduleClearStartDateInputEl.value = state.clearDraft.startDate || state.cursorDate;
  }
  if (scheduleClearStartTimeInputEl) {
    scheduleClearStartTimeInputEl.value = state.clearDraft.startTime || "00:00";
  }
  if (scheduleClearEndDateInputEl) {
    scheduleClearEndDateInputEl.value = state.clearDraft.endDate || state.clearDraft.startDate || state.cursorDate;
  }
  if (scheduleClearEndTimeInputEl) {
    scheduleClearEndTimeInputEl.value = state.clearDraft.endTime || "23:59";
  }
  setClearStatus("");
}

function collectClearDraft() {
  return {
    actorKey: String(scheduleClearActorSelectEl?.value || getDefaultClearActorKey()).trim() || USER_ACTOR_KEY,
    startDate: String(scheduleClearStartDateInputEl?.value || state.cursorDate).trim() || state.cursorDate,
    startTime: String(scheduleClearStartTimeInputEl?.value || "00:00").trim() || "00:00",
    endDate:
      String(scheduleClearEndDateInputEl?.value || state.cursorDate).trim() ||
      String(scheduleClearStartDateInputEl?.value || state.cursorDate).trim() ||
      state.cursorDate,
    endTime: String(scheduleClearEndTimeInputEl?.value || "23:59").trim() || "23:59"
  };
}

function syncClearDraft(overrides = {}) {
  state.clearDraft = {
    ...collectClearDraft(),
    ...(overrides && typeof overrides === "object" ? overrides : {})
  };
  renderClearModal();
  return state.clearDraft;
}

function getClearPresetRange(preset = "today") {
  const today = getTodayValue();
  if (preset === "week") {
    const startDate = getWeekStart(today);
    return {
      startDate,
      startTime: "00:00",
      endDate: addDays(startDate, 6),
      endTime: "23:59"
    };
  }
  if (preset === "month") {
    const baseDate = parseLocalDateValue(today) || new Date();
    const monthStart = new Date(baseDate.getFullYear(), baseDate.getMonth(), 1);
    const monthEnd = new Date(baseDate.getFullYear(), baseDate.getMonth() + 1, 0);
    return {
      startDate: formatDateValue(monthStart),
      startTime: "00:00",
      endDate: formatDateValue(monthEnd),
      endTime: "23:59"
    };
  }
  return {
    startDate: today,
    startTime: "00:00",
    endDate: today,
    endTime: "23:59"
  };
}

function applyClearPreset(preset = "today") {
  syncClearDraft(getClearPresetRange(preset));
  const presetLabel = preset === "week" ? "本周" : preset === "month" ? "本月" : "今天";
  setClearStatus(`已切换为“${presetLabel}”范围。`, "success");
}

function buildEntryOccurrenceRange(entry, occurrenceDateText = "") {
  const resolvedEntry = entry && typeof entry === "object" ? entry : null;
  const dateText = String(occurrenceDateText || resolvedEntry?.date || "").trim();
  if (!resolvedEntry || !dateText) {
    return null;
  }

  if (resolvedEntry.scheduleType === "day") {
    const start = parseLocalDateTimeValue(dateText, "00:00");
    const end = parseLocalDateTimeValue(addDays(dateText, 1), "00:00");
    return start && end ? { start, end } : null;
  }

  const start = parseLocalDateTimeValue(dateText, resolvedEntry.startTime || "09:00");
  const end = parseLocalDateTimeValue(dateText, resolvedEntry.endTime || "10:00");
  if (!start || !end) {
    return null;
  }
  if (resolvedEntry.scheduleType === "hour" && parseTimeToMinutes(resolvedEntry.endTime) < parseTimeToMinutes(resolvedEntry.startTime)) {
    end.setDate(end.getDate() + 1);
  } else if (end <= start) {
    end.setTime(start.getTime() + 60 * 60 * 1000);
  }
  return { start, end };
}

function getEntryOccurrenceRangesWithinRange(entry, rangeStart, rangeEnd) {
  const resolvedEntry = entry && typeof entry === "object" ? entry : null;
  if (!resolvedEntry || !(rangeStart instanceof Date) || !(rangeEnd instanceof Date) || rangeEnd <= rangeStart) {
    return [];
  }

  if (resolvedEntry.scheduleType !== "week") {
    const occurrence = buildEntryOccurrenceRange(resolvedEntry, resolvedEntry.date);
    if (!occurrence) {
      return [];
    }
    return occurrence.start < rangeEnd && rangeStart < occurrence.end ? [occurrence] : [];
  }

  const targetWeekday = getDateWeekday(resolvedEntry.date);
  const startDate = new Date(rangeStart.getFullYear(), rangeStart.getMonth(), rangeStart.getDate());
  const endDate = new Date(rangeEnd.getFullYear(), rangeEnd.getMonth(), rangeEnd.getDate());
  const ranges = [];

  for (
    const cursor = new Date(startDate.getTime());
    cursor.getTime() <= endDate.getTime();
    cursor.setDate(cursor.getDate() + 1)
  ) {
    if (cursor.getDay() !== targetWeekday) {
      continue;
    }
    const occurrence = buildEntryOccurrenceRange(resolvedEntry, formatDateValue(cursor));
    if (!occurrence) {
      continue;
    }
    if (occurrence.start < rangeEnd && rangeStart < occurrence.end) {
      ranges.push(occurrence);
    }
  }

  return ranges;
}

function entryOverlapsDateTimeRange(entry, rangeStart, rangeEnd) {
  return getEntryOccurrenceRangesWithinRange(entry, rangeStart, rangeEnd).length > 0;
}

function getEntryClearAction(entry, actorKey = USER_ACTOR_KEY) {
  const resolvedKey = String(actorKey || "").trim() || USER_ACTOR_KEY;
  if (resolvedKey === USER_ACTOR_KEY) {
    if (entry.ownerType === "user") {
      return "remove_entry";
    }
    if (entry.companionIncludesUser) {
      return "detach_user";
    }
    return "";
  }

  const contactId = resolvedKey.startsWith("contact:") ? resolvedKey.slice("contact:".length) : "";
  if (!contactId) {
    return "";
  }
  if (entry.ownerType === "contact" && entry.ownerId === contactId) {
    return "remove_entry";
  }
  if (entry.companionContactIds.includes(contactId)) {
    return "detach_contact";
  }
  return "";
}

function clearSchedulesInRange(draft = state.clearDraft) {
  const resolvedDraft = draft && typeof draft === "object" ? draft : state.clearDraft;
  const rangeStart = parseLocalDateTimeValue(resolvedDraft.startDate, resolvedDraft.startTime || "00:00");
  const rangeEnd = parseLocalDateTimeValue(resolvedDraft.endDate, resolvedDraft.endTime || "23:59");
  if (!rangeStart || !rangeEnd) {
    throw new Error("请填写完整的开始和结束时间。");
  }
  if (rangeEnd <= rangeStart) {
    throw new Error("结束时间需要晚于开始时间。");
  }

  const targetActorKey = String(resolvedDraft.actorKey || "").trim() || USER_ACTOR_KEY;
  let removedEntries = 0;
  let detachedParticipants = 0;
  const nextEntries = [];

  state.entries.forEach((entry, index) => {
    if (!entryOverlapsDateTimeRange(entry, rangeStart, rangeEnd)) {
      nextEntries.push(entry);
      return;
    }

    const action = getEntryClearAction(entry, targetActorKey);
    if (action === "remove_entry") {
      removedEntries += 1;
      return;
    }
    if (action === "detach_user") {
      detachedParticipants += 1;
      nextEntries.push(
        normalizeScheduleEntry(
          {
            ...entry,
            companionIncludesUser: false,
            updatedAt: Date.now() + index
          },
          index
        )
      );
      return;
    }
    if (action === "detach_contact") {
      const contactId = targetActorKey.slice("contact:".length);
      const nextInviteDecisions = {
        ...(entry.inviteDecisions || {})
      };
      delete nextInviteDecisions[contactId];
      detachedParticipants += 1;
      nextEntries.push(
        normalizeScheduleEntry(
          {
            ...entry,
            companionContactIds: entry.companionContactIds.filter((item) => item !== contactId),
            inviteDecisions: nextInviteDecisions,
            updatedAt: Date.now() + index
          },
          index
        )
      );
      return;
    }

    nextEntries.push(entry);
  });

  return {
    nextEntries,
    removedEntries,
    detachedParticipants
  };
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
  renderSchedulePlaceOptions();

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
    placeId: String(schedulePlaceSelectEl?.value || "").trim(),
    date: String(scheduleDateInputEl?.value || "").trim() || state.cursorDate,
    startTime: String(scheduleStartTimeInputEl?.value || "09:00").trim(),
    endTime: String(scheduleEndTimeInputEl?.value || "10:00").trim(),
    notifyCompanions: Boolean(scheduleNotifyCompanionsInputEl?.checked)
  });
}

function syncDraftFromEditor(overrides = {}, options = {}) {
  const nextDraft = sanitizeDraftCompanions({
    ...state.draft,
    ...collectEditorDraft(),
    ...(overrides && typeof overrides === "object" ? overrides : {})
  });
  state.draft = nextDraft;
  if (options.render !== false) {
    renderEditor();
  }
  return nextDraft;
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

function pushScheduleInviteNotification(contact, conversation, replyLines = []) {
  if (!window.PulseMessageNotifications?.push || !Array.isArray(replyLines) || !replyLines.length) {
    return;
  }
  window.PulseMessageNotifications.push({
    id: `schedule_invite_notice_${conversation?.id || contact?.id || Date.now()}_${Date.now()}`,
    createdAt: Date.now(),
    name: String(contact?.name || conversation?.contactNameSnapshot || "新消息").trim() || "新消息",
    preview: replyLines.length > 1 ? `${replyLines[0]} 等 ${replyLines.length} 条新消息` : replyLines[0],
    avatarImage: String(contact?.avatarImage || conversation?.contactAvatarImageSnapshot || "").trim(),
    avatarText:
      String(contact?.avatarText || conversation?.contactAvatarTextSnapshot || contact?.name?.slice(0, 2) || "新")
        .trim() || "新",
    conversationId: String(conversation?.id || "").trim()
  });
}

async function notifyCompanionsForEntry(entry, targetInviteeIds = []) {
  const inviteEntry = normalizeScheduleEntry(entry, 0);
  const sourceInviteeIds = Array.isArray(targetInviteeIds) && targetInviteeIds.length
    ? targetInviteeIds
    : inviteEntry.companionContactIds;
  const inviteeIds = [...new Set(sourceInviteeIds.map((item) => String(item || "").trim()).filter(Boolean))];
  if (!inviteeIds.length) {
    return {
      total: 0,
      acceptedCount: 0,
      rejectedCount: 0,
      failedCount: 0,
      failedIds: []
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
        const nextConversation = appendMessagesToConversation(
          contact,
          replyLines.map((line, index) => ({
            id: `message_${Date.now()}_${index}_${hashText(`${contact.id}_${line}`)}`,
            role: "assistant",
            text: line,
            time: formatTimeLabel(Date.now()),
            createdAt: Date.now() + index
          }))
        );
        pushScheduleInviteNotification(contact, nextConversation, replyLines);
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
  const failedIds = [];
  results.forEach((result) => {
    const contactId = String(result?.item || "").trim();
    if (result.status !== "success") {
      failedCount += 1;
      if (contactId) {
        failedIds.push(contactId);
      }
      return;
    }
    const decision = String(result.value?.decision || "").trim();
    if (!contactId || !decision) {
      failedCount += 1;
      if (contactId) {
        failedIds.push(contactId);
      }
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
    failedCount,
    failedIds
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
    const startMinutes = parseTimeToMinutes(draft.startTime);
    const endMinutes = parseTimeToMinutes(draft.endTime);
    if (draft.scheduleType === "hour") {
      if (startMinutes === endMinutes) {
        setEditorStatus("按小时行程的结束时间不能和开始时间相同。", "error");
        return;
      }
    } else if (end <= start) {
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
      let summary = await notifyCompanionsForEntry(savedEntry);
      if (summary.failedCount && summary.failedIds.length) {
        const shouldRetry = window.confirm(
          `有 ${summary.failedCount} 位同行人邀请失败，是否再次发送邀请？`
        );
        if (shouldRetry) {
          setStatus("正在重新发送失败的同行人邀请…", "success");
          const retrySummary = await notifyCompanionsForEntry(savedEntry, summary.failedIds);
          summary = {
            total: summary.total,
            acceptedCount: summary.acceptedCount + retrySummary.acceptedCount,
            rejectedCount: summary.rejectedCount + retrySummary.rejectedCount,
            failedCount: retrySummary.failedCount,
            failedIds: retrySummary.failedIds
          };
        }
      }
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

function handleClearRangeSubmit(event) {
  event.preventDefault();
  const draft = collectClearDraft();
  state.clearDraft = draft;

  const actorLabel = getActorLabelByKey(draft.actorKey);
  const confirmed = window.confirm(
    `确定清除 ${actorLabel} 在 ${draft.startDate} ${draft.startTime} 到 ${draft.endDate} ${draft.endTime} 之间的相关日程吗？`
  );
  if (!confirmed) {
    return;
  }

  try {
    const result = clearSchedulesInRange(draft);
    if (!result.removedEntries && !result.detachedParticipants) {
      setClearStatus("所选时间段内没有可清除的日程。", "error");
      return;
    }

    state.entries = result.nextEntries;
    persistScheduleEntries();
    renderSchedulePage();
    setClearRangeOpen(false);

    const summaryParts = [];
    if (result.removedEntries) {
      summaryParts.push(`删除 ${result.removedEntries} 条`);
    }
    if (result.detachedParticipants) {
      summaryParts.push(`移除 ${result.detachedParticipants} 个同行关联`);
    }
    setStatus(`${actorLabel} 的行程已清除：${summaryParts.join("，")}。`, "success");
  } catch (error) {
    setClearStatus(error?.message || "清除日程失败。", "error");
  }
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

  scheduleClearRangeBtnEl?.addEventListener("click", () => {
    setClearRangeOpen(true, { date: state.cursorDate });
  });

  schedulePlacesBtnEl?.addEventListener("click", () => {
    setPlacesManagerOpen(true);
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
    const toggleDateEntriesEl = target.closest("[data-action='toggle-date-entries']");
    if (toggleDateEntriesEl instanceof HTMLElement) {
      event.preventDefault();
      event.stopPropagation();
      const date = String(toggleDateEntriesEl.dataset.date || state.cursorDate).trim() || state.cursorDate;
      toggleMonthDateExpanded(date);
      renderSchedulePage();
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
    const openDateEl = target.closest("[data-action='open-date']");
    if (openDateEl instanceof HTMLElement) {
      const date = String(openDateEl.dataset.date || state.cursorDate).trim() || state.cursorDate;
      state.cursorDate = date;
      state.viewMode = "day";
      renderSchedulePage();
      setStatus(`已展开查看 ${formatFullDate(date)}。`, "success");
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
    syncDraftFromEditor({
      scheduleType: String(scheduleTypeSelectEl.value || "day").trim()
    });
    setEditorStatus("");
  });

  scheduleOwnerTypeSelectEl?.addEventListener("change", () => {
    const ownerType = String(scheduleOwnerTypeSelectEl.value || "user").trim();
    syncDraftFromEditor({
      ownerType,
      ownerId: ownerType === "contact" ? state.draft.ownerId : "",
      visibilityMode: ownerType === "user" ? state.draft.visibilityMode : "all"
    });
    setEditorStatus("");
  });

  scheduleOwnerContactSelectEl?.addEventListener("change", () => {
    syncDraftFromEditor({
      ownerId: String(scheduleOwnerContactSelectEl.value || "").trim()
    });
    setEditorStatus("");
  });

  scheduleVisibleAllInputEl?.addEventListener("change", () => {
    syncDraftFromEditor(
      {
      visibilityMode: scheduleVisibleAllInputEl.checked ? "all" : "selected"
      },
      { render: false }
    );
    renderVisibilityOptions();
    setEditorStatus("");
  });

  scheduleVisibleContactsEl?.addEventListener("change", () => {
    syncDraftFromEditor(
      {
      visibleContactIds: collectEditorDraft().visibleContactIds
      },
      { render: false }
    );
    setEditorStatus("");
  });

  scheduleDateInputEl?.addEventListener("change", () => {
    syncDraftFromEditor({
      date: String(scheduleDateInputEl.value || state.cursorDate).trim()
    });
    setEditorStatus("");
  });

  scheduleCompanionOptionsEl?.addEventListener("change", () => {
    const draft = collectEditorDraft();
    syncDraftFromEditor({
      companionIncludesUser: draft.companionIncludesUser,
      companionContactIds: draft.companionContactIds,
      notifyCompanions:
        draft.companionContactIds.length > 0 && Boolean(scheduleNotifyCompanionsInputEl?.checked)
    });
    setEditorStatus("");
  });

  scheduleNotifyCompanionsInputEl?.addEventListener("change", () => {
    syncDraftFromEditor(
      {
      notifyCompanions: Boolean(scheduleNotifyCompanionsInputEl.checked)
      },
      { render: false }
    );
    setEditorStatus("");
  });

  schedulePlaceSelectEl?.addEventListener("change", () => {
    syncDraftFromEditor(
      {
        placeId: String(schedulePlaceSelectEl.value || "").trim()
      },
      { render: false }
    );
    setEditorStatus("");
  });

  [scheduleTitleInputEl, scheduleStartTimeInputEl, scheduleEndTimeInputEl].forEach((input) => {
    input?.addEventListener("input", () => {
      syncDraftFromEditor({}, { render: false });
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

  scheduleClearCloseBtnEl?.addEventListener("click", () => {
    setClearRangeOpen(false);
  });

  scheduleClearCancelBtnEl?.addEventListener("click", () => {
    setClearRangeOpen(false);
  });

  scheduleClearFormEl?.addEventListener("submit", handleClearRangeSubmit);

  [
    scheduleClearActorSelectEl,
    scheduleClearStartDateInputEl,
    scheduleClearStartTimeInputEl,
    scheduleClearEndDateInputEl,
    scheduleClearEndTimeInputEl
  ].forEach((input) => {
    input?.addEventListener("input", () => {
      state.clearDraft = collectClearDraft();
      setClearStatus("");
    });
    input?.addEventListener("change", () => {
      state.clearDraft = collectClearDraft();
      setClearStatus("");
    });
  });

  scheduleClearPresetTodayBtnEl?.addEventListener("click", () => {
    applyClearPreset("today");
  });

  scheduleClearPresetWeekBtnEl?.addEventListener("click", () => {
    applyClearPreset("week");
  });

  scheduleClearPresetMonthBtnEl?.addEventListener("click", () => {
    applyClearPreset("month");
  });

  scheduleClearModalEl?.addEventListener("click", (event) => {
    if (
      event.target === scheduleClearModalEl ||
      event.target?.classList?.contains("schedule-modal__backdrop")
    ) {
      setClearRangeOpen(false);
    }
  });

  schedulePlacesCloseBtnEl?.addEventListener("click", () => {
    setPlacesManagerOpen(false);
  });

  schedulePlacesAddBtnEl?.addEventListener("click", () => {
    setPlaceEditorOpen(true);
  });

  schedulePlacesListEl?.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) {
      return;
    }
    const actionEl = target.closest("[data-action]");
    if (!(actionEl instanceof HTMLElement)) {
      return;
    }
    const action = String(actionEl.dataset.action || "").trim();
    const placeId = String(actionEl.dataset.placeId || "").trim();
    if (action === "edit-common-place" && placeId) {
      setPlaceEditorOpen(true, placeId);
      return;
    }
    if (action === "delete-common-place" && placeId) {
      deleteCommonPlace(placeId);
    }
  });

  schedulePlacesModalEl?.addEventListener("click", (event) => {
    if (
      event.target === schedulePlacesModalEl ||
      event.target?.classList?.contains("schedule-modal__backdrop")
    ) {
      setPlacesManagerOpen(false);
    }
  });

  schedulePlaceEditorCloseBtnEl?.addEventListener("click", () => {
    setPlaceEditorOpen(false);
  });

  schedulePlaceEditorCancelBtnEl?.addEventListener("click", () => {
    setPlaceEditorOpen(false);
  });

  schedulePlaceVisibilitySelectEl?.addEventListener("change", () => {
    const visibilityMode = normalizeCommonPlaceVisibilityMode(schedulePlaceVisibilitySelectEl.value);
    if (schedulePlaceVisibleContactsFieldEl) {
      schedulePlaceVisibleContactsFieldEl.hidden = visibilityMode !== "selected_contacts";
    }
    setPlaceEditorStatus("");
  });

  schedulePlaceEditorFormEl?.addEventListener("submit", (event) => {
    event.preventDefault();
    try {
      const place = saveCommonPlaceDraft();
      renderPlacesManager();
      renderSchedulePage();
      if (state.editorOpen) {
        renderEditor();
      }
      setPlaceEditorOpen(false);
      setPlacesStatus(`已保存地点“${place.name}”。`, "success");
    } catch (error) {
      setPlaceEditorStatus(error?.message || "保存地点失败。", "error");
    }
  });

  schedulePlaceEditorDeleteBtnEl?.addEventListener("click", () => {
    if (!state.placeEditorId) {
      return;
    }
    deleteCommonPlace(state.placeEditorId);
  });

  schedulePlaceEditorModalEl?.addEventListener("click", (event) => {
    if (
      event.target === schedulePlaceEditorModalEl ||
      event.target?.classList?.contains("schedule-modal__backdrop")
    ) {
      setPlaceEditorOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && state.placeEditorOpen) {
      setPlaceEditorOpen(false);
      return;
    }
    if (event.key === "Escape" && state.placesManagerOpen) {
      setPlacesManagerOpen(false);
      return;
    }
    if (event.key === "Escape" && state.editorOpen) {
      setEditorOpen(false);
      return;
    }
    if (event.key === "Escape" && state.filterOpen) {
      setFilterOpen(false);
      return;
    }
    if (event.key === "Escape" && state.clearRangeOpen) {
      setClearRangeOpen(false);
      return;
    }
    if (event.key === "Escape" && isEmbeddedView()) {
      requestEmbeddedClose();
    }
  });
}

function init() {
  document.body.classList.toggle("embedded", isEmbeddedView());
  state.commonPlaces = loadCommonPlaces();
  const { nextEntries, changed } = sanitizeScheduleEntriesForPlaces(state.entries);
  if (changed) {
    state.entries = nextEntries;
    persistScheduleEntries();
  }
  sanitizeStoredPresenceStateForCommonPlaces();
  bindScheduleViewportHeight();
  renderSchedulePage();
  attachEvents();
}

init();
