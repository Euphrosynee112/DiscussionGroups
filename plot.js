const DEFAULT_OPENAI_ENDPOINT = "https://api.deepseek.com/chat/completions";
const DEFAULT_GEMINI_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta";
const DEFAULT_DEEPSEEK_MODEL = "deepseek-chat";
const DEFAULT_GEMINI_MODEL = "gemini-2.0-flash";
const DEFAULT_TEMPERATURE = 0.85;
const SETTINGS_KEY = "x_style_generator_settings_v2";
const PROFILE_KEY = "x_style_generator_profile_v1";
const MESSAGE_CONTACTS_KEY = "x_style_generator_message_contacts_v1";
const PLOT_THREADS_KEY = "x_style_generator_plot_threads_v1";
const USER_PARTICIPANT_ID = "__plot_user__";
const MAX_PLOT_HISTORY_ITEMS = 18;

const plotBackBtnEl = document.querySelector("#plot-back-btn");
const plotCreateBtnEl = document.querySelector("#plot-create-btn");
const plotStatusEl = document.querySelector("#plot-status");
const plotTopbarKickerEl = document.querySelector("#plot-topbar-kicker");
const plotTopbarTitleEl = document.querySelector("#plot-topbar-title");
const plotListViewEl = document.querySelector("#plot-list-view");
const plotThreadListEl = document.querySelector("#plot-thread-list");
const plotDetailViewEl = document.querySelector("#plot-detail-view");
const plotMessageStreamEl = document.querySelector("#plot-message-stream");
const plotDetailParticipantsEl = document.querySelector("#plot-detail-participants");
const plotComposerFormEl = document.querySelector("#plot-composer-form");
const plotComposerInputEl = document.querySelector("#plot-composer-input");
const plotComposerContinueBtnEl = document.querySelector("#plot-composer-continue-btn");
const plotComposerSendBtnEl = document.querySelector("#plot-composer-send-btn");

const plotCreateModalEl = document.querySelector("#plot-create-modal");
const plotCreateCloseBtnEl = document.querySelector("#plot-create-close-btn");
const plotCreateCancelBtnEl = document.querySelector("#plot-create-cancel-btn");
const plotCreateFormEl = document.querySelector("#plot-create-form");
const plotCreateStatusEl = document.querySelector("#plot-create-status");
const plotParticipantOptionsEl = document.querySelector("#plot-participant-options");
const plotExtraAddBtnEl = document.querySelector("#plot-extra-add-btn");
const plotExtraListEl = document.querySelector("#plot-extra-list");
const plotOpeningInputEl = document.querySelector("#plot-opening-input");

const memoryStorage = {};

const state = {
  settings: loadSettings(),
  profile: loadProfile(),
  contacts: loadContacts(),
  threads: loadThreads(),
  activeThreadId: "",
  createModalOpen: false,
  generatingThreadIds: {}
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

function hashText(value) {
  const text = String(value || "");
  let hash = 0;
  for (let index = 0; index < text.length; index += 1) {
    hash = (hash * 31 + text.charCodeAt(index)) >>> 0;
  }
  return hash.toString(36);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function truncateText(value, limit = 80) {
  const text = String(value || "").trim();
  if (text.length <= limit) {
    return text;
  }
  return `${text.slice(0, Math.max(0, limit - 1))}…`;
}

function stripLineBreaks(value) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .trim();
}

function formatTimeAgo(timestamp) {
  const numeric = Number(timestamp) || Date.now();
  const diff = Math.max(0, Date.now() - numeric);
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  if (diff < hour) {
    return `${Math.max(1, Math.round(diff / minute || 1))} 分钟前`;
  }
  if (diff < day) {
    return `${Math.max(1, Math.round(diff / hour))} 小时前`;
  }
  return `${Math.max(1, Math.round(diff / day))} 天前`;
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

function normalizePrivacyAllowlist(value) {
  if (window.PulsePrivacyCover?.normalizeAllowlist) {
    return window.PulsePrivacyCover.normalizeAllowlist(value);
  }
  return normalizeNegativePromptConstraints(value);
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

function buildStructuredPromptSections(sections = {}, settings = loadSettings()) {
  return prependGlobalPromptGuard(
    [
      `<context_library>\n${buildPromptSectionText(
        sections.context_library || sections.contextLibrary,
        "暂无额外背景信息。"
      )}\n</context_library>`,
      `<persona_alignment>\n${buildPromptSectionText(
        sections.persona_alignment || sections.personaAlignment,
        "按当前已知身份与语境自然输出。"
      )}\n</persona_alignment>`,
      `<output_standard>\n${buildPromptSectionText(
        sections.output_standard || sections.outputStandard,
        "只输出符合要求的最终结果。"
      )}\n</output_standard>`
    ].join("\n\n"),
    settings
  );
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
    mode: "openai",
    endpoint: DEFAULT_OPENAI_ENDPOINT,
    token: "",
    model: DEFAULT_DEEPSEEK_MODEL,
    apiConfigs: [],
    activeApiConfigId: "",
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
    return merged;
  }

  merged.mode = normalizeApiMode(activeConfig.mode);
  merged.endpoint = normalizeSettingsEndpointByMode(activeConfig.mode, activeConfig.endpoint);
  merged.token = normalizeApiConfigToken(activeConfig.token);
  merged.model =
    merged.mode === "generic"
      ? ""
      : String(activeConfig.model || getDefaultModelByMode(activeConfig.mode)).trim() ||
        getDefaultModelByMode(activeConfig.mode);
  return merged;
}

function loadSettings() {
  const raw = safeGetItem(SETTINGS_KEY);
  if (!raw) {
    return buildNormalizedSettingsSnapshot({});
  }

  try {
    return buildNormalizedSettingsSnapshot(JSON.parse(raw));
  } catch (_error) {
    return buildNormalizedSettingsSnapshot({});
  }
}

function loadProfile() {
  const profile = readStoredJson(PROFILE_KEY, {}) || {};
  const chatProfileInitialized = Boolean(profile?.chatProfileInitialized);
  return {
    id: USER_PARTICIPANT_ID,
    type: "user",
    name: String(profile?.chatUsername || profile?.username || "你").trim() || "你",
    avatarImage: chatProfileInitialized
      ? String(profile?.chatAvatarImage || "").trim()
      : String(profile?.chatAvatarImage || profile?.avatarImage || "").trim(),
    avatarText: String(profile?.avatar || "你").trim().slice(0, 2) || "你",
    personaPrompt: String(profile?.chatPersonaPrompt || profile?.personaPrompt || "").trim(),
    specialUserPersona: ""
  };
}

function getContactAvatarFallback(contact) {
  return String(contact?.name || "联络人").trim().slice(0, 2) || "联";
}

function normalizeContact(contact, index = 0) {
  const source = contact && typeof contact === "object" ? contact : {};
  const name = String(source.name || "").trim() || `联系人 ${index + 1}`;
  return {
    id: String(source.id || `contact_${index}_${hashText(name)}`),
    type: "contact",
    name,
    avatarImage: String(source.avatarImage || "").trim(),
    avatarText: String(source.avatarText || "").trim() || getContactAvatarFallback({ name }),
    personaPrompt: String(source.personaPrompt || "").trim(),
    specialUserPersona: String(source.specialUserPersona || "").trim(),
    updatedAt: Number(source.updatedAt) || Date.now()
  };
}

function loadContacts() {
  const parsed = readStoredJson(MESSAGE_CONTACTS_KEY, []);
  return Array.isArray(parsed)
    ? parsed.map((item, index) => normalizeContact(item, index))
    : [];
}

function normalizeThreadParticipant(source = {}, index = 0) {
  const type = String(source.type || "").trim() === "user" ? "user" : "contact";
  const name = String(source.name || (type === "user" ? "你" : `角色 ${index + 1}`)).trim();
  return {
    id: String(source.id || `${type}_${index}_${hashText(name)}`),
    type,
    name: name || (type === "user" ? "你" : `角色 ${index + 1}`),
    avatarImage: String(source.avatarImage || "").trim(),
    avatarText:
      String(source.avatarText || "").trim() ||
      (type === "user" ? "你" : getContactAvatarFallback({ name })),
    personaPrompt: String(source.personaPrompt || "").trim(),
    specialUserPersona: String(source.specialUserPersona || "").trim()
  };
}

function normalizeExtraCharacter(source = {}, index = 0) {
  return {
    id: String(source.id || `extra_${index}_${Date.now()}`),
    name: String(source.name || "").trim(),
    role: String(source.role || "").trim(),
    persona: String(source.persona || "").trim()
  };
}

function normalizePlotMessage(source = {}, index = 0) {
  const role = String(source.role || "").trim() === "assistant" ? "assistant" : "user";
  return {
    id: String(source.id || `plot_msg_${index}_${Date.now()}`),
    role,
    text: String(source.text || "").trim(),
    createdAt: Number(source.createdAt) || Date.now()
  };
}

function deriveThreadTitleFromSource(openingPlot = "", participants = [], extras = []) {
  const opening = stripLineBreaks(openingPlot).replace(/[。！？!?,，、；;]+$/, "");
  if (opening) {
    return truncateText(opening, 18);
  }
  const names = [...participants, ...extras]
    .map((item) => String(item?.name || "").trim())
    .filter(Boolean);
  if (names.length) {
    return truncateText(`${names.join(" / ")} 的剧情`, 20);
  }
  return "新剧情";
}

function deriveThreadSummary(thread) {
  const latestAssistant = [...(thread.messages || [])]
    .reverse()
    .find((message) => message.role === "assistant" && String(message.text || "").trim());
  if (latestAssistant) {
    return truncateText(stripLineBreaks(latestAssistant.text), 96);
  }
  return truncateText(stripLineBreaks(thread.openingPlot || ""), 96) || "等待开场剧情生成…";
}

function normalizePlotThread(source = {}, index = 0) {
  const participants = Array.isArray(source.participants)
    ? source.participants.map((item, itemIndex) => normalizeThreadParticipant(item, itemIndex))
    : [];
  const customCharacters = Array.isArray(source.customCharacters)
    ? source.customCharacters.map((item, itemIndex) => normalizeExtraCharacter(item, itemIndex))
    : [];
  const openingPlot = String(source.openingPlot || "").trim();
  const messages = Array.isArray(source.messages)
    ? source.messages.map((item, itemIndex) => normalizePlotMessage(item, itemIndex)).filter((item) => item.text)
    : [];
  const title =
    String(source.title || "").trim() ||
    deriveThreadTitleFromSource(openingPlot, participants, customCharacters);
  const normalized = {
    id: String(source.id || `plot_thread_${index}_${hashText(`${title}-${openingPlot}`)}`),
    title,
    summary: String(source.summary || "").trim(),
    openingPlot,
    participants,
    customCharacters,
    messages,
    createdAt: Number(source.createdAt) || Date.now(),
    updatedAt: Number(source.updatedAt) || Date.now()
  };
  normalized.summary = normalized.summary || deriveThreadSummary(normalized);
  return normalized;
}

function loadThreads() {
  const parsed = readStoredJson(PLOT_THREADS_KEY, []);
  return Array.isArray(parsed)
    ? parsed.map((item, index) => normalizePlotThread(item, index)).sort((a, b) => b.updatedAt - a.updatedAt)
    : [];
}

function persistThreads() {
  safeSetItem(PLOT_THREADS_KEY, JSON.stringify(state.threads));
}

function syncRuntimeData() {
  state.settings = loadSettings();
  state.profile = loadProfile();
  state.contacts = loadContacts();
}

function getThreadById(threadId = "") {
  return state.threads.find((thread) => thread.id === threadId) || null;
}

function getActiveThread() {
  return getThreadById(state.activeThreadId);
}

function resolveThreadParticipant(snapshot) {
  if (!snapshot) {
    return null;
  }
  if (snapshot.type === "user") {
    return {
      ...snapshot,
      ...state.profile,
      id: USER_PARTICIPANT_ID,
      type: "user"
    };
  }
  const matchedContact = state.contacts.find((contact) => contact.id === snapshot.id);
  return matchedContact ? { ...snapshot, ...matchedContact, type: "contact" } : snapshot;
}

function updateThread(threadId, updater) {
  state.threads = state.threads
    .map((thread) => {
      if (thread.id !== threadId) {
        return thread;
      }
      const nextThread = typeof updater === "function" ? updater(thread) : thread;
      return normalizePlotThread(nextThread);
    })
    .sort((a, b) => b.updatedAt - a.updatedAt);
  persistThreads();
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

function applyPrivacyToLogEntry(entry, session) {
  if (!session || !window.PulsePrivacyCover?.applyPrivacyToLogEntry) {
    return entry;
  }
  return window.PulsePrivacyCover.applyPrivacyToLogEntry(entry, session);
}

function buildPlotApiLogBase(action, settings, endpoint, prompt, requestBody, summary = "") {
  const mode = normalizeApiMode(settings.mode);
  return {
    source: "plot",
    action,
    summary,
    endpoint,
    mode,
    model: mode === "generic" ? "" : settings.model || getDefaultModelByMode(mode),
    prompt,
    requestBody
  };
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

function buildSingleInstructionRequestBody(settings, systemPrompt, userInstruction, intent = "plot_story") {
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
        temperature: DEFAULT_TEMPERATURE
      }
    };
  }
  return {
    prompt: [systemPrompt, userInstruction].filter(Boolean).join("\n\n"),
    intent
  };
}

function buildAvatarMarkup(entity) {
  const avatarImage = String(entity?.avatarImage || "").trim();
  const fallbackText =
    String(entity?.avatarText || entity?.name || "").trim().slice(0, 2) || "剧";
  if (avatarImage) {
    return `<span class="plot-avatar"><img src="${escapeHtml(avatarImage)}" alt="" /></span>`;
  }
  return `<span class="plot-avatar">${escapeHtml(fallbackText)}</span>`;
}

function setStatus(message = "", tone = "") {
  if (!plotStatusEl) {
    return;
  }
  plotStatusEl.textContent = String(message || "");
  plotStatusEl.className = "plot-status";
  if (tone) {
    plotStatusEl.classList.add(`is-${tone}`);
  }
}

function setCreateStatus(message = "", tone = "") {
  if (!plotCreateStatusEl) {
    return;
  }
  plotCreateStatusEl.textContent = String(message || "");
  plotCreateStatusEl.className = "plot-modal__status";
  if (tone) {
    plotCreateStatusEl.classList.add(`is-${tone}`);
  }
}

function getCombinedParticipantList() {
  return [
    {
      id: USER_PARTICIPANT_ID,
      type: "user",
      name: state.profile.name,
      avatarImage: state.profile.avatarImage,
      avatarText: state.profile.avatarText,
      personaPrompt: state.profile.personaPrompt,
      specialUserPersona: ""
    },
    ...state.contacts
  ];
}

function createBlankExtraCharacter() {
  return {
    id: `extra_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    name: "",
    role: "",
    persona: ""
  };
}

function openCreateModal() {
  syncRuntimeData();
  state.createModalOpen = true;
  if (plotCreateFormEl) {
    plotCreateFormEl.reset();
  }
  setCreateStatus("");
  renderCreateParticipantOptions();
  renderCreateExtraList([]);
  showCreateModal(true);
  window.setTimeout(() => {
    plotOpeningInputEl?.focus();
  }, 0);
}

function closeCreateModal() {
  state.createModalOpen = false;
  setCreateStatus("");
  showCreateModal(false);
}

function showCreateModal(isOpen) {
  if (!plotCreateModalEl) {
    return;
  }
  plotCreateModalEl.hidden = !isOpen;
  plotCreateModalEl.setAttribute("aria-hidden", isOpen ? "false" : "true");
}

function renderCreateParticipantOptions() {
  if (!plotParticipantOptionsEl) {
    return;
  }
  const items = getCombinedParticipantList();
  plotParticipantOptionsEl.innerHTML = items
    .map((item) => {
      const title = item.type === "user" ? `${item.name}（用户）` : item.name;
      const meta = item.type === "user"
        ? truncateText(item.personaPrompt || "当前用户角色", 42)
        : truncateText(item.personaPrompt || "未填写角色人设", 42);
      return `
        <label class="plot-participant-item">
          <input type="checkbox" name="plot-participant" value="${escapeHtml(item.id)}" />
          ${buildAvatarMarkup(item)}
          <span class="plot-participant-item__body">
            <span class="plot-participant-item__title">${escapeHtml(title)}</span>
            <span class="plot-participant-item__meta">${escapeHtml(meta)}</span>
          </span>
        </label>
      `;
    })
    .join("");
}

function renderCreateExtraList(items = []) {
  if (!plotExtraListEl) {
    return;
  }
  const resolvedItems = Array.isArray(items) ? items : [];
  if (!resolvedItems.length) {
    plotExtraListEl.innerHTML = `
      <div class="plot-empty">
        还没有额外人物。需要时点右上角“+ 添加人物”即可。
      </div>
    `;
    return;
  }
  plotExtraListEl.innerHTML = resolvedItems
    .map((item, index) => {
      return `
        <section class="plot-extra-card" data-extra-id="${escapeHtml(item.id)}">
          <div class="plot-extra-card__head">
            <span class="plot-extra-card__title">人物 ${index + 1}</span>
            <button class="plot-extra-card__remove" type="button" data-action="remove-extra-character" data-extra-id="${escapeHtml(item.id)}">
              删除
            </button>
          </div>
          <div class="plot-extra-grid">
            <input
              type="text"
              data-extra-field="name"
              placeholder="人物名字"
              value="${escapeHtml(item.name || "")}"
              autocomplete="off"
            />
            <input
              type="text"
              data-extra-field="role"
              placeholder="在剧情中的角色，例如：室友、经纪人、路人"
              value="${escapeHtml(item.role || "")}"
              autocomplete="off"
            />
            <textarea
              rows="3"
              data-extra-field="persona"
              placeholder="简单的性格描述"
            >${escapeHtml(item.persona || "")}</textarea>
          </div>
        </section>
      `;
    })
    .join("");
}

function collectCreateExtraCharactersFromDom() {
  const cards = [...document.querySelectorAll(".plot-extra-card[data-extra-id]")];
  return cards.map((card) => ({
    id: String(card.getAttribute("data-extra-id") || ""),
    name: String(card.querySelector('[data-extra-field="name"]')?.value || "").trim(),
    role: String(card.querySelector('[data-extra-field="role"]')?.value || "").trim(),
    persona: String(card.querySelector('[data-extra-field="persona"]')?.value || "").trim()
  }));
}

function getSelectedParticipantSnapshots() {
  const checkedIds = new Set(
    [...document.querySelectorAll('input[name="plot-participant"]:checked')].map((input) => String(input.value || ""))
  );
  return getCombinedParticipantList()
    .filter((item) => checkedIds.has(item.id))
    .map((item) => ({
      id: item.id,
      type: item.type,
      name: item.name,
      avatarImage: item.avatarImage,
      avatarText: item.avatarText,
      personaPrompt: item.personaPrompt,
      specialUserPersona: item.specialUserPersona
    }));
}

function getThreadParticipantLabel(thread) {
  const names = [
    ...(thread.participants || []).map((item) => resolveThreadParticipant(item) || item),
    ...(thread.customCharacters || [])
  ]
    .map((item) => String(item?.name || "").trim())
    .filter(Boolean);
  if (!names.length) {
    return "暂未指定在场人物";
  }
  return names.join(" · ");
}

function buildThreadCardParticipants(thread) {
  return [
    ...(thread.participants || []).map((item) => resolveThreadParticipant(item) || item),
    ...(thread.customCharacters || [])
  ]
    .map((item) => `<span class="plot-chip">${escapeHtml(item.name || "未命名")}</span>`)
    .join("");
}

function renderThreadList() {
  if (!plotThreadListEl) {
    return;
  }
  if (!state.threads.length) {
    plotThreadListEl.innerHTML = `
      <div class="plot-empty">
        还没有剧情线。点击右上角 <strong>+</strong>，先设定在场人物和开场剧情，再让 AI 帮你把场景写出来。
      </div>
    `;
    return;
  }

  plotThreadListEl.innerHTML = state.threads
    .map((thread) => {
      const summary = state.generatingThreadIds[thread.id]
        ? "剧情正在生成中…"
        : thread.summary || deriveThreadSummary(thread);
      return `
        <button
          class="plot-thread-card"
          type="button"
          data-action="open-thread"
          data-thread-id="${escapeHtml(thread.id)}"
        >
          <div class="plot-thread-card__top">
            <div>
              <h3 class="plot-thread-card__title">${escapeHtml(thread.title)}</h3>
            </div>
            <span class="plot-thread-card__time">${escapeHtml(formatTimeAgo(thread.updatedAt))}</span>
          </div>
          <div class="plot-thread-card__participants">${buildThreadCardParticipants(thread)}</div>
          <p class="plot-thread-card__summary">${escapeHtml(summary)}</p>
        </button>
      `;
    })
    .join("");
}

function renderMessageStream(thread) {
  if (!plotMessageStreamEl) {
    return;
  }
  const messageMarkup = (thread?.messages || [])
    .map((message) => {
      const isUser = message.role === "user";
      return `
        <div class="plot-bubble-row ${isUser ? "plot-bubble-row--user" : "plot-bubble-row--assistant"}">
          <article class="plot-bubble ${isUser ? "plot-bubble--user" : "plot-bubble--assistant"}">
            <span class="plot-bubble__role">${isUser ? "你的推进" : "剧情正文"}</span>
            ${escapeHtml(message.text)}
          </article>
        </div>
      `;
    })
    .join("");

  const pendingMarkup = state.generatingThreadIds[thread?.id]
    ? `
      <div class="plot-bubble-row plot-bubble-row--pending">
        <article class="plot-bubble plot-bubble--pending">
          <span class="plot-bubble__role">剧情正文</span>
          正在继续推进剧情……
        </article>
      </div>
    `
    : "";

  plotMessageStreamEl.innerHTML = messageMarkup || pendingMarkup
    ? `${messageMarkup}${pendingMarkup}`
    : `
        <div class="plot-empty">
          这条剧情线还没有正文。你可以先从开场描述开始。
        </div>
      `;
}

function renderDetailParticipants(thread) {
  if (!plotDetailParticipantsEl) {
    return;
  }
  const names = [
    ...(thread?.participants || []).map((item) => resolveThreadParticipant(item) || item),
    ...(thread?.customCharacters || [])
  ]
    .map((item) => String(item?.name || "").trim())
    .filter(Boolean);
  if (!names.length) {
    plotDetailParticipantsEl.hidden = true;
    plotDetailParticipantsEl.innerHTML = "";
    return;
  }
  plotDetailParticipantsEl.hidden = false;
  plotDetailParticipantsEl.innerHTML = names
    .map(
      (name, index) => `
        <span class="plot-detail-participants__tag">
          ${escapeHtml(index === 0 ? `在场：${name}` : name)}
        </span>
      `
    )
    .join("");
}

function renderDetailView() {
  const thread = getActiveThread();
  const detailOpen = Boolean(thread);
  if (plotDetailViewEl) {
    plotDetailViewEl.hidden = !detailOpen;
    plotDetailViewEl.setAttribute("aria-hidden", detailOpen ? "false" : "true");
  }
  if (plotListViewEl) {
    plotListViewEl.hidden = detailOpen;
    plotListViewEl.setAttribute("aria-hidden", detailOpen ? "true" : "false");
  }
  if (!detailOpen) {
    if (plotDetailParticipantsEl) {
      plotDetailParticipantsEl.hidden = true;
      plotDetailParticipantsEl.innerHTML = "";
    }
    return;
  }
  renderMessageStream(thread);
  renderDetailParticipants(thread);
  plotComposerSendBtnEl.disabled = Boolean(state.generatingThreadIds[thread.id]);
  if (plotComposerContinueBtnEl) {
    plotComposerContinueBtnEl.disabled = Boolean(state.generatingThreadIds[thread.id]);
  }
  window.requestAnimationFrame(() => {
    if (plotMessageStreamEl) {
      plotMessageStreamEl.scrollTop = plotMessageStreamEl.scrollHeight;
    }
  });
}

function renderTopbar() {
  const thread = getActiveThread();
  const detailOpen = Boolean(thread);
  if (plotTopbarKickerEl) {
    plotTopbarKickerEl.textContent = detailOpen ? "Story Room" : "Story";
  }
  if (plotTopbarTitleEl) {
    plotTopbarTitleEl.textContent = "剧情";
  }
  if (plotCreateBtnEl) {
    plotCreateBtnEl.hidden = detailOpen;
  }
}

function render() {
  renderTopbar();
  renderThreadList();
  renderDetailView();
  showCreateModal(state.createModalOpen);
}

function openThread(threadId = "") {
  const thread = getThreadById(threadId);
  if (!thread) {
    return;
  }
  state.activeThreadId = thread.id;
  render();
}

function closeThreadView() {
  state.activeThreadId = "";
  render();
}

function cleanupAssistantStoryText(value) {
  return String(value || "")
    .replace(/^```(?:text|markdown)?/i, "")
    .replace(/```$/i, "")
    .trim();
}

function buildStoryHistoryContext(messages = []) {
  const slicedMessages = Array.isArray(messages)
    ? messages.filter((item) => String(item?.text || "").trim()).slice(-MAX_PLOT_HISTORY_ITEMS)
    : [];
  if (!slicedMessages.length) {
    return "这是开场阶段，之前还没有生成过剧情正文。";
  }
  return slicedMessages
    .map((message) =>
      message.role === "assistant"
        ? `【已生成剧情】\n${message.text}`
        : `【用户推进】\n${message.text}`
    )
    .join("\n\n");
}

function buildStorySystemPrompt(thread, history = []) {
  const participants = (thread.participants || [])
    .map((item) => resolveThreadParticipant(item))
    .filter(Boolean);
  const customCharacters = Array.isArray(thread.customCharacters) ? thread.customCharacters : [];
  const userPresent = participants.some((item) => item.type === "user");
  const selectedRoleNames = participants
    .filter((item) => item.type === "contact")
    .map((item) => item.name)
    .filter(Boolean);

  const participantContext = [
    participants.length
      ? `在场的已知人物：\n${participants
          .map((item) => `- ${item.type === "user" ? "用户" : "角色"}：${item.name}`)
          .join("\n")}`
      : "",
    customCharacters.length
      ? `额外补充人物：\n${customCharacters
          .map((item) => `- ${item.name}${item.role ? `｜剧情身份：${item.role}` : ""}`)
          .join("\n")}`
      : "",
    thread.openingPlot ? `开场剧情描述：\n${thread.openingPlot}` : "",
    `已发生的剧情记录：\n${buildStoryHistoryContext(history)}`
  ]
    .filter(Boolean)
    .join("\n\n");

  const personaContext = [
    "你现在负责续写一条持续发展的剧情线。",
    "请直接根据人物设定和最新推进提示，以第三方视角写出一段小说式剧情，而不是像聊天助手一样回复。",
    selectedRoleNames.length
      ? `当前允许参与剧情扩写的已选角色只有：${selectedRoleNames.join("、")}。除这些角色外，不得擅自让其他未被选择的角色出场、介入、代替发言或推进剧情。`
      : "当前没有任何已选角色可以参与剧情扩写；除用户与明确添加的非角色人物外，不要擅自引入系统里其他角色。",
    userPresent
      ? "如果用户被勾选为在场人物，也只能把用户视为场景里的在场者或观察者。除非用户的推进提示明确写出，否则不得替用户新增动作、台词、心理、决定、立场或细节行为。"
      : "用户当前不在场；用户给你的只是剧情推进提示，不代表用户本人出现在场景里。",
    participants.length
      ? `已选人物设定：\n${participants
          .map((item) => {
            const lines = [
              `- ${item.type === "user" ? "用户" : "角色"}「${item.name}」`,
              item.personaPrompt ? `  人设：${item.personaPrompt}` : "",
              item.specialUserPersona && item.type === "contact" && userPresent
                ? `  对用户的特别认知：${item.specialUserPersona}`
                : ""
            ]
              .filter(Boolean)
              .join("\n");
            return lines;
          })
          .join("\n\n")}`
      : "",
    customCharacters.length
      ? `额外人物设定：\n${customCharacters
          .map((item) =>
            [
              `- ${item.name}`,
              item.role ? `  剧情身份：${item.role}` : "",
              item.persona ? `  性格：${item.persona}` : ""
            ]
              .filter(Boolean)
              .join("\n")
          )
          .join("\n\n")}`
      : ""
  ]
    .filter(Boolean)
    .join("\n\n");

  const outputContext = [
    "只输出继续发展的剧情正文，不要标题、编号、提纲、解释、分析或 markdown。",
    "文体要像小说场景扩写：可以有环境描写、动作、神态、心理活动和自然对话，但整体仍然是第三方叙事视角。",
    "最新一条用户推进提示是本轮最优先的方向，直接把情节往前推进，不要大段重复复述前文。",
    "不需要给每个角色平均分配台词；谁在这一段更重要，就重点写谁。",
    "可以分成 2 到 5 段，但整体保持紧凑、有画面感、有人物情绪。",
    "不要写成聊天软件回复，不要出现“好的”“以下是”“接下来”等助手式表达。",
    "若需要写到用户，只能使用用户提示里已经明确给出的信息；不要自行补完用户的具体行为或心理。"
  ].join("\n");

  return buildStructuredPromptSections(
    {
      context_library: participantContext,
      persona_alignment: personaContext,
      output_standard: outputContext
    },
    state.settings
  );
}

function buildStoryUserInstruction(text, mode = "guided") {
  if (mode === "continuation") {
    return [
      "这一次没有新的用户剧情引导。",
      "请仅基于当前已经出现的人物、关系、场景和上一段剧情，自然续写下一小段内容。",
      "不要跳过太多时间，不要擅自新增未被选择的角色，不要替用户补写未明确给出的行为信息。"
    ].join("\n");
  }
  return [
    "这是用户给你的本轮剧情推进提示。",
    "请直接据此继续写，不要解释提示本身：",
    String(text || "").trim()
  ]
    .filter(Boolean)
    .join("\n");
}

async function requestStoryTurn(threadId, userText, options = {}) {
  syncRuntimeData();
  const thread = getThreadById(threadId);
  if (!thread) {
    throw new Error("未找到当前剧情。");
  }
  const requestMode = String(options.mode || "guided").trim() === "continuation"
    ? "continuation"
    : "guided";
  const settings = { ...state.settings };
  const requestEndpoint = validateApiSettings(settings, "剧情生成");
  const history =
    requestMode === "continuation" ? thread.messages : thread.messages.slice(0, -1);
  const systemPrompt = buildStorySystemPrompt(thread, history);
  const userInstruction = buildStoryUserInstruction(userText, requestMode);
  const privacySession = createPrivacySession({
    settings,
    profile: state.profile,
    contacts: state.contacts,
    thread,
    history,
    userInstruction,
    systemPrompt,
    extraTerms: (thread.customCharacters || [])
      .map((item) => String(item?.name || "").trim())
      .filter(Boolean)
      .map((name) => ({ text: name, category: "NAME" }))
  });
  const encodedSystemPrompt = preparePromptWithPrivacy(systemPrompt, privacySession);
  const encodedUserInstruction = encodeTextWithPrivacy(userInstruction, privacySession);
  const requestBody = buildSingleInstructionRequestBody(
    settings,
    encodedSystemPrompt,
    encodedUserInstruction,
    "plot_story"
  );
  const logBase = applyPrivacyToLogEntry(
    buildPlotApiLogBase(
      requestMode === "continuation" ? "plot_story_continue" : "plot_story_generate",
      settings,
      requestEndpoint,
      [encodedSystemPrompt, encodedUserInstruction].join("\n\n"),
      requestBody,
      `剧情：${thread.title}`
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
        errorMessage: `接口请求失败：HTTP ${response.status}`
      });
      logged = true;
      throw new Error(`接口请求失败：HTTP ${response.status}`);
    }

    const rawMessage = resolveMessage(payload).trim();
    if (!rawMessage) {
      const errorMessage = "接口请求成功，但响应中没有可解析的剧情正文。";
      appendApiLog({
        ...logBase,
        ...buildGeminiLogFields(settings, payload),
        status: "error",
        statusCode: response.status,
        responseText: rawResponse,
        responseBody: payload,
        errorMessage
      });
      logged = true;
      throw new Error(errorMessage);
    }

    const decodedMessage = cleanupAssistantStoryText(
      decodeTextWithPrivacy(rawMessage, privacySession)
    );
    appendApiLog({
      ...logBase,
      ...buildGeminiLogFields(settings, payload),
      status: "success",
      statusCode: response.status,
      responseText: rawResponse,
      responseBody: payload,
      summary: encodeTextWithPrivacy(
        `剧情：${thread.title} · 已续写 ${truncateText(stripLineBreaks(decodedMessage), 36)}`,
        privacySession
      )
    });
    logged = true;
    return decodedMessage;
  } catch (error) {
    if (!logged) {
      appendApiLog({
        ...logBase,
        status: "error",
        errorMessage: error?.message || "剧情生成失败"
      });
    }
    throw error;
  }
}

async function submitStoryTurn(threadId, text, options = {}) {
  const requestMode = String(options.mode || "guided").trim() === "continuation"
    ? "continuation"
    : "guided";
  const trimmedText = String(text || "").trim();
  if (requestMode !== "continuation" && !trimmedText) {
    return;
  }
  if (state.generatingThreadIds[threadId]) {
    return;
  }

  if (requestMode !== "continuation") {
    const userMessage = {
      id: `plot_msg_user_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      role: "user",
      text: trimmedText,
      createdAt: Date.now()
    };

    updateThread(threadId, (thread) => ({
      ...thread,
      messages: [...thread.messages, userMessage],
      updatedAt: Date.now()
    }));
  }
  state.generatingThreadIds[threadId] = true;
  if (plotComposerInputEl && requestMode !== "continuation") {
    plotComposerInputEl.value = "";
  }
  setStatus(requestMode === "continuation" ? "剧情续写中…" : "剧情继续生成中…");
  render();

  try {
    const assistantText = await requestStoryTurn(threadId, trimmedText, {
      mode: requestMode
    });
    updateThread(threadId, (thread) => ({
      ...thread,
      messages: [
        ...thread.messages,
        {
          id: `plot_msg_assistant_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
          role: "assistant",
          text: assistantText,
          createdAt: Date.now()
        }
      ],
      summary: truncateText(stripLineBreaks(assistantText), 96),
      updatedAt: Date.now()
    }));
    setStatus("剧情已更新。", "success");
  } catch (error) {
    setStatus(error?.message || "剧情生成失败。", "error");
  } finally {
    delete state.generatingThreadIds[threadId];
    render();
  }
}

function createThreadFromForm() {
  const participants = getSelectedParticipantSnapshots();
  const customCharacters = collectCreateExtraCharactersFromDom()
    .map((item, index) => normalizeExtraCharacter(item, index))
    .filter((item) => item.name || item.role || item.persona);
  const openingPlot = String(plotOpeningInputEl?.value || "").trim();

  if (!openingPlot) {
    throw new Error("请先填写开场剧情描述。");
  }
  if (!participants.length && !customCharacters.length) {
    throw new Error("至少选择一个在场人物，或新增一个非角色人物。");
  }

  const now = Date.now();
  const thread = normalizePlotThread({
    id: `plot_thread_${now}_${Math.random().toString(36).slice(2, 8)}`,
    title: deriveThreadTitleFromSource(openingPlot, participants, customCharacters),
    summary: truncateText(stripLineBreaks(openingPlot), 96),
    openingPlot,
    participants,
    customCharacters,
    messages: [],
    createdAt: now,
    updatedAt: now
  });
  state.threads = [thread, ...state.threads].sort((a, b) => b.updatedAt - a.updatedAt);
  persistThreads();
  return thread;
}

function handleTopbarBack() {
  if (state.activeThreadId) {
    closeThreadView();
    return;
  }
  requestEmbeddedClose();
}

function handleRootClick(event) {
  const target = event.target;
  if (!(target instanceof Element)) {
    return;
  }

  if (target.closest("[data-close-plot-modal]")) {
    closeCreateModal();
    return;
  }

  const openThreadBtn = target.closest('[data-action="open-thread"]');
  if (openThreadBtn) {
    openThread(String(openThreadBtn.getAttribute("data-thread-id") || ""));
    return;
  }

  const removeExtraBtn = target.closest('[data-action="remove-extra-character"]');
  if (removeExtraBtn) {
    const nextItems = collectCreateExtraCharactersFromDom().filter(
      (item) => item.id !== String(removeExtraBtn.getAttribute("data-extra-id") || "")
    );
    renderCreateExtraList(nextItems);
  }
}

function bindEvents() {
  plotBackBtnEl?.addEventListener("click", handleTopbarBack);
  plotCreateBtnEl?.addEventListener("click", openCreateModal);
  plotCreateCloseBtnEl?.addEventListener("click", closeCreateModal);
  plotCreateCancelBtnEl?.addEventListener("click", closeCreateModal);

  plotExtraAddBtnEl?.addEventListener("click", () => {
    const nextItems = [...collectCreateExtraCharactersFromDom(), createBlankExtraCharacter()];
    renderCreateExtraList(nextItems);
  });

  plotCreateFormEl?.addEventListener("submit", async (event) => {
    event.preventDefault();
    setCreateStatus("");
    try {
      const thread = createThreadFromForm();
      closeCreateModal();
      openThread(thread.id);
      await sleep(20);
      await submitStoryTurn(thread.id, thread.openingPlot);
    } catch (error) {
      setCreateStatus(error?.message || "创建剧情失败。", "error");
    }
  });

  plotComposerContinueBtnEl?.addEventListener("click", async () => {
    const thread = getActiveThread();
    if (!thread) {
      return;
    }
    await submitStoryTurn(thread.id, "", {
      mode: "continuation"
    });
  });

  plotComposerFormEl?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const thread = getActiveThread();
    if (!thread) {
      return;
    }
    await submitStoryTurn(thread.id, plotComposerInputEl?.value || "");
  });

  document.addEventListener("click", handleRootClick);
}

function init() {
  syncRuntimeData();
  render();
  bindEvents();
}

init();
