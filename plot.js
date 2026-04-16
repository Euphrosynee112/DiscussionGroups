const DEFAULT_OPENAI_ENDPOINT = "https://api.deepseek.com/chat/completions";
const DEFAULT_GROK_ENDPOINT = "https://api.x.ai/v1/chat/completions";
const DEFAULT_GEMINI_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta";
const DEFAULT_DEEPSEEK_MODEL = "deepseek-chat";
const DEFAULT_GROK_MODEL = "grok-4";
const DEFAULT_GEMINI_MODEL = "gemini-2.0-flash";
const DEFAULT_TEMPERATURE = 0.85;
const SETTINGS_KEY = "x_style_generator_settings_v2";
const PROFILE_KEY = "x_style_generator_profile_v1";
const MESSAGE_CONTACTS_KEY = "x_style_generator_message_contacts_v1";
const DIRECT_MESSAGES_KEY = "x_style_generator_direct_messages_v1";
const MESSAGE_THREADS_KEY = "x_style_generator_message_threads_v1";
const MESSAGE_MEMORIES_KEY = "x_style_generator_message_memories_v1";
const MESSAGE_REPLY_TASKS_KEY = "x_style_generator_message_reply_tasks_v1";
const PLOT_THREADS_KEY = "x_style_generator_plot_threads_v1";
const USER_PARTICIPANT_ID = "__plot_user__";
const MAX_PLOT_HISTORY_ITEMS = 18;
const DEFAULT_SCENE_MEMORY_IMPORTANCE = 72;

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
const plotMessageEditModalEl = document.querySelector("#plot-message-edit-modal");
const plotMessageEditCloseBtnEl = document.querySelector("#plot-message-edit-close-btn");
const plotMessageEditCancelBtnEl = document.querySelector("#plot-message-edit-cancel-btn");
const plotMessageEditFormEl = document.querySelector("#plot-message-edit-form");
const plotMessageEditInputEl = document.querySelector("#plot-message-edit-input");
const plotMessageEditStatusEl = document.querySelector("#plot-message-edit-status");
const plotSummaryModalEl = document.querySelector("#plot-summary-modal");
const plotSummaryCloseBtnEl = document.querySelector("#plot-summary-close-btn");
const plotSummaryCancelBtnEl = document.querySelector("#plot-summary-cancel-btn");
const plotSummaryFormEl = document.querySelector("#plot-summary-form");
const plotSummaryContactSelectEl = document.querySelector("#plot-summary-contact-select");
const plotSummaryContentInputEl = document.querySelector("#plot-summary-content-input");
const plotSummaryEmotionInputEl = document.querySelector("#plot-summary-emotion-input");
const plotSummaryImportanceInputEl = document.querySelector("#plot-summary-importance-input");
const plotSummaryAwarenessInputEl = document.querySelector("#plot-summary-awareness-input");
const plotSummaryStatusEl = document.querySelector("#plot-summary-status");
const plotSummaryLoadingOverlayEl = document.querySelector("#plot-summary-loading-overlay");

const memoryStorage = {};
let plotBackgroundMessagesFrameEl = null;

const state = {
  settings: loadSettings(),
  profile: loadProfile(),
  contacts: loadContacts(),
  threads: loadThreads(),
  activeThreadId: "",
  createModalOpen: false,
  messageEditModalOpen: false,
  editingThreadId: "",
  editingMessageId: "",
  summaryModalOpen: false,
  summaryThreadId: "",
  summaryLoading: false,
  summarySaving: false,
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

function normalizeObjectArray(value) {
  return Array.isArray(value) ? value.filter(Boolean) : [];
}

function normalizeObjectValue(value) {
  return value && typeof value === "object" && !Array.isArray(value) ? value : null;
}

function clampNumber(value, minimum, maximum) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    return minimum;
  }
  return Math.min(maximum, Math.max(minimum, parsed));
}

function normalizePositiveInteger(value, fallback = 0) {
  const parsed = Number.parseInt(String(value ?? ""), 10);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return fallback;
  }
  return parsed;
}

function formatLocalTime(date = new Date()) {
  const resolvedDate = date instanceof Date ? date : new Date(date);
  return resolvedDate.toLocaleTimeString("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
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
    mode: "openai",
    endpoint: DEFAULT_OPENAI_ENDPOINT,
    token: "",
    model: DEFAULT_DEEPSEEK_MODEL,
    temperature: DEFAULT_TEMPERATURE,
    apiConfigs: [],
    activeApiConfigId: "",
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
  merged.temperature = normalizeTemperature(activeConfig.temperature, DEFAULT_TEMPERATURE);
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
  const contacts = Array.isArray(parsed)
    ? parsed
    : Array.isArray(parsed?.contacts)
      ? parsed.contacts
      : [];
  return contacts.map((item, index) => normalizeContact(item, index));
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

function normalizeMemoryType(type = "") {
  return String(type || "").trim().toLowerCase() === "core" ? "core" : "scene";
}

function normalizeMemoryImportance(value, fallback = DEFAULT_SCENE_MEMORY_IMPORTANCE) {
  return clampNumber(normalizePositiveInteger(value, fallback), 1, 100);
}

function normalizeMessageMemory(memory, index = 0) {
  const source = normalizeObjectValue(memory) || {};
  const content = String(source.content || source.text || "").trim();
  return {
    id: String(source.id || `plot_memory_${Date.now()}_${index}`).trim(),
    contactId: String(source.contactId || "").trim(),
    type: normalizeMemoryType(source.type),
    content,
    importance: normalizeMemoryImportance(source.importance, DEFAULT_SCENE_MEMORY_IMPORTANCE),
    source: String(source.source || "summary").trim() === "manual" ? "manual" : "summary",
    createdAt: Number(source.createdAt) || Date.now(),
    updatedAt: Number(source.updatedAt) || Number(source.createdAt) || Date.now()
  };
}

function canonicalizeMemoryContent(value = "") {
  return String(value || "")
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[，。！？、,.!?；;:“”"'（）()【】\[\]《》<>—\-]/g, "");
}

function memoryLooksSimilar(left = "", right = "") {
  const leftText = canonicalizeMemoryContent(left);
  const rightText = canonicalizeMemoryContent(right);
  if (!leftText || !rightText) {
    return false;
  }
  if (leftText === rightText) {
    return true;
  }
  const shorter = leftText.length <= rightText.length ? leftText : rightText;
  const longer = shorter === leftText ? rightText : leftText;
  return shorter.length >= 8 && longer.includes(shorter);
}

function mergeMemories(existing = [], incoming = []) {
  const next = normalizeObjectArray(existing).map((item, index) => normalizeMessageMemory(item, index));
  normalizeObjectArray(incoming).forEach((candidate, index) => {
    const entry = normalizeMessageMemory(candidate, index);
    if (!entry.contactId || !entry.content) {
      return;
    }
    const foundIndex = next.findIndex(
      (item) => item.contactId === entry.contactId && memoryLooksSimilar(item.content, entry.content)
    );
    if (foundIndex < 0) {
      next.unshift(entry);
      return;
    }
    const current = next[foundIndex];
    next[foundIndex] = {
      ...current,
      type: current.type === "core" || entry.type === "core" ? "core" : "scene",
      importance: Math.max(Number(current.importance) || 0, Number(entry.importance) || 0),
      source: current.source === "manual" ? "manual" : entry.source,
      updatedAt: Math.max(Number(current.updatedAt) || 0, Number(entry.updatedAt) || 0) || Date.now(),
      content:
        String(current.content || "").trim().length >= String(entry.content || "").trim().length
          ? current.content
          : entry.content
    };
  });
  return next;
}

function loadMessageMemories() {
  const parsed = readStoredJson(MESSAGE_MEMORIES_KEY, []);
  return Array.isArray(parsed)
    ? parsed
        .map((item, index) => normalizeMessageMemory(item, index))
        .filter((item) => item.contactId && item.content)
    : [];
}

function persistMessageMemories(memories = []) {
  safeSetItem(MESSAGE_MEMORIES_KEY, JSON.stringify(Array.isArray(memories) ? memories : []));
}

function resolveAwarenessTitle(title = "", awarenessText = "") {
  const resolvedTitle = String(title || "").trim();
  if (resolvedTitle) {
    return resolvedTitle.slice(0, 40);
  }
  const fallbackText = String(awarenessText || "").trim().replace(/\s+/g, " ");
  if (!fallbackText) {
    return "未命名察觉";
  }
  return truncateText(fallbackText, 20);
}

function normalizeAwarenessSensitivity(value = "") {
  const normalized = String(value || "").trim().toLowerCase();
  if (
    normalized === "extremely_weak" ||
    normalized === "weak" ||
    normalized === "medium" ||
    normalized === "strong" ||
    normalized === "extremely_strong"
  ) {
    return normalized;
  }
  return "medium";
}

function loadStoredContactsPayload() {
  const raw = readStoredJson(MESSAGE_CONTACTS_KEY, []);
  if (Array.isArray(raw)) {
    return {
      containerType: "array",
      root: raw,
      contacts: [...raw]
    };
  }
  if (raw && typeof raw === "object" && Array.isArray(raw.contacts)) {
    return {
      containerType: "object",
      root: raw,
      contacts: [...raw.contacts]
    };
  }
  return {
    containerType: "array",
    root: [],
    contacts: []
  };
}

function persistStoredContactsPayload(payloadInfo = {}, contacts = []) {
  const containerType = payloadInfo?.containerType === "object" ? "object" : "array";
  const nextContacts = Array.isArray(contacts) ? contacts : [];
  const nextPayload =
    containerType === "object"
      ? {
          ...(normalizeObjectValue(payloadInfo?.root) || {}),
          contacts: nextContacts
        }
      : nextContacts;
  safeSetItem(MESSAGE_CONTACTS_KEY, JSON.stringify(nextPayload));
  state.contacts = loadContacts();
}

function resolveConversationStorageKey() {
  return safeGetItem(MESSAGE_THREADS_KEY)
    ? MESSAGE_THREADS_KEY
    : safeGetItem(DIRECT_MESSAGES_KEY)
      ? DIRECT_MESSAGES_KEY
      : MESSAGE_THREADS_KEY;
}

function loadStoredConversationsPayload() {
  const storageKey = resolveConversationStorageKey();
  const parsed = readStoredJson(storageKey, []);
  return {
    storageKey,
    root: parsed,
    conversations: Array.isArray(parsed) ? [...parsed] : []
  };
}

function persistStoredConversationsPayload(payloadInfo = {}, conversations = []) {
  safeSetItem(
    String(payloadInfo?.storageKey || MESSAGE_THREADS_KEY),
    JSON.stringify(Array.isArray(conversations) ? conversations : [])
  );
}

function getContactSnapshotById(contactId = "") {
  const resolvedContactId = String(contactId || "").trim();
  if (!resolvedContactId) {
    return null;
  }
  return state.contacts.find((item) => item.id === resolvedContactId) || null;
}

function ensureStoredConversationForContact(contactId = "") {
  const resolvedContactId = String(contactId || "").trim();
  if (!resolvedContactId) {
    return null;
  }
  const payload = loadStoredConversationsPayload();
  const conversations = [...payload.conversations];
  let conversation =
    conversations.find((item) => String(item?.contactId || "").trim() === resolvedContactId) || null;
  if (conversation) {
    return {
      payload,
      conversations,
      conversation
    };
  }
  const contact = getContactSnapshotById(resolvedContactId);
  if (!contact) {
    return null;
  }
  conversation = {
    id: `conversation_${Date.now()}_${hashText(resolvedContactId)}`,
    contactId: resolvedContactId,
    contactNameSnapshot: contact.name,
    contactAvatarImageSnapshot: contact.avatarImage,
    contactAvatarTextSnapshot: contact.avatarText || getContactAvatarFallback(contact),
    promptSettings: {},
    sceneMode: "online",
    allowAiPresenceUpdate: false,
    allowAiProactiveMessage: false,
    allowAiAutoSchedule: false,
    autoScheduleTime: "",
    autoScheduleLastRunDate: "",
    voiceCallState: {},
    messages: [],
    awarenessCounter: 0,
    replyContextVersion: 0,
    memorySummaryCounter: 0,
    memorySummaryLastMessageCount: 0,
    updatedAt: Date.now()
  };
  conversations.unshift(conversation);
  persistStoredConversationsPayload(payload, conversations);
  return {
    payload,
    conversations,
    conversation
  };
}

function loadReplyTasks() {
  const parsed = readStoredJson(MESSAGE_REPLY_TASKS_KEY, []);
  return Array.isArray(parsed) ? [...parsed] : [];
}

function persistReplyTasks(tasks = []) {
  safeSetItem(MESSAGE_REPLY_TASKS_KEY, JSON.stringify(Array.isArray(tasks) ? tasks : []));
}

function enqueueReplyTask(conversationId = "", options = {}) {
  const resolvedConversationId = String(conversationId || "").trim();
  if (!resolvedConversationId) {
    return null;
  }
  const requestOptions = normalizeObjectValue(options) || {};
  const tasks = loadReplyTasks();
  const existingTask =
    tasks.find(
      (task) =>
        String(task?.conversationId || "").trim() === resolvedConversationId &&
        Boolean(task?.regenerate) === Boolean(requestOptions.regenerate) &&
        Boolean(task?.awarenessImmediateTrigger) === Boolean(requestOptions.awarenessImmediateTrigger) &&
        String(task?.status || "").trim() !== "error"
    ) || null;
  if (existingTask) {
    return existingTask;
  }
  const nextTask = {
    id: `reply_task_${Date.now()}_${hashText(`${resolvedConversationId}_${requestOptions.awarenessImmediateTrigger ? "awareness" : "reply"}`)}`,
    conversationId: resolvedConversationId,
    regenerate: Boolean(requestOptions.regenerate),
    regenerateInstruction: String(requestOptions.regenerateInstruction || "").trim(),
    awarenessImmediateTrigger: Boolean(requestOptions.awarenessImmediateTrigger),
    status: "pending",
    errorMessage: "",
    startedAt: 0,
    heartbeatAt: 0,
    createdAt: Date.now(),
    updatedAt: Date.now()
  };
  persistReplyTasks([...tasks, nextTask]);
  return nextTask;
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

function encodeValueWithPrivacy(value, session) {
  if (!session || !window.PulsePrivacyCover?.encodeValue) {
    return value;
  }
  return window.PulsePrivacyCover.encodeValue(value, session);
}

function decodeTextWithPrivacy(value, session) {
  if (!session || !window.PulsePrivacyCover?.decodeText) {
    return String(value || "");
  }
  return window.PulsePrivacyCover.decodeText(value, session);
}

function decodeValueWithPrivacy(value, session) {
  if (!session || !window.PulsePrivacyCover?.decodeValue) {
    return value;
  }
  return window.PulsePrivacyCover.decodeValue(value, session);
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
  if (isOpenAICompatibleMode(settings.mode) && !settings.model) {
    throw new Error("DeepSeek / Grok / OpenAI 兼容模式需要填写模型名称。");
  }
  if (normalizeApiMode(settings.mode) === "gemini" && !settings.token) {
    throw new Error("Gemini 模式需要填写 API Key。");
  }
  return requestEndpoint;
}

function buildSingleInstructionRequestBody(settings, systemPrompt, userInstruction, intent = "plot_story") {
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

function resolveDedicatedApiSettings(settings, enabledKey, configIdKey) {
  const normalizedSettings = buildNormalizedSettingsSnapshot(settings);
  if (!normalizedSettings?.[enabledKey] || !normalizedSettings?.[configIdKey]) {
    return normalizedSettings;
  }
  const config = normalizeApiConfigs(normalizedSettings.apiConfigs || []).find(
    (item) => item.id === normalizedSettings[configIdKey]
  );
  if (!config) {
    return buildNormalizedSettingsSnapshot({
      ...normalizedSettings,
      [enabledKey]: false,
      [configIdKey]: ""
    });
  }
  return buildNormalizedSettingsSnapshot({
    ...normalizedSettings,
    activeApiConfigId: config.id,
    mode: config.mode,
    endpoint: config.endpoint,
    token: config.token,
    model: config.mode === "generic" ? "" : config.model || getDefaultModelByMode(config.mode)
  });
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

function showMessageEditModal(isOpen) {
  state.messageEditModalOpen = Boolean(isOpen);
  if (!plotMessageEditModalEl) {
    return;
  }
  plotMessageEditModalEl.hidden = !state.messageEditModalOpen;
  plotMessageEditModalEl.setAttribute("aria-hidden", state.messageEditModalOpen ? "false" : "true");
}

function setMessageEditStatus(message = "", tone = "") {
  if (!plotMessageEditStatusEl) {
    return;
  }
  plotMessageEditStatusEl.textContent = String(message || "");
  plotMessageEditStatusEl.className = "plot-modal__status";
  if (tone) {
    plotMessageEditStatusEl.classList.add(`is-${tone}`);
  }
}

function openMessageEditModal(threadId = "", messageId = "") {
  const thread = getThreadById(threadId);
  const message =
    normalizeObjectArray(thread?.messages).find((item) => String(item?.id || "").trim() === String(messageId || "").trim()) ||
    null;
  if (!thread || !message || message.role !== "assistant") {
    return;
  }
  state.editingThreadId = thread.id;
  state.editingMessageId = message.id;
  setMessageEditStatus("");
  if (plotMessageEditInputEl) {
    plotMessageEditInputEl.value = message.text || "";
  }
  showMessageEditModal(true);
  window.setTimeout(() => {
    plotMessageEditInputEl?.focus();
  }, 0);
}

function closeMessageEditModal() {
  state.editingThreadId = "";
  state.editingMessageId = "";
  setMessageEditStatus("");
  if (plotMessageEditInputEl) {
    plotMessageEditInputEl.value = "";
  }
  showMessageEditModal(false);
}

function showSummaryModal(isOpen) {
  state.summaryModalOpen = Boolean(isOpen);
  if (!plotSummaryModalEl) {
    return;
  }
  plotSummaryModalEl.hidden = !state.summaryModalOpen;
  plotSummaryModalEl.setAttribute("aria-hidden", state.summaryModalOpen ? "false" : "true");
}

function showSummaryLoadingOverlay(isOpen) {
  if (!plotSummaryLoadingOverlayEl) {
    return;
  }
  plotSummaryLoadingOverlayEl.hidden = !isOpen;
  plotSummaryLoadingOverlayEl.setAttribute("aria-hidden", isOpen ? "false" : "true");
}

function setSummaryStatus(message = "", tone = "") {
  if (!plotSummaryStatusEl) {
    return;
  }
  plotSummaryStatusEl.textContent = String(message || "");
  plotSummaryStatusEl.className = "plot-modal__status";
  if (tone) {
    plotSummaryStatusEl.classList.add(`is-${tone}`);
  }
}

function clearSummaryForm() {
  if (plotSummaryContentInputEl) {
    plotSummaryContentInputEl.value = "";
  }
  if (plotSummaryEmotionInputEl) {
    plotSummaryEmotionInputEl.value = "";
  }
  if (plotSummaryImportanceInputEl) {
    plotSummaryImportanceInputEl.value = String(DEFAULT_SCENE_MEMORY_IMPORTANCE);
  }
  if (plotSummaryAwarenessInputEl) {
    plotSummaryAwarenessInputEl.checked = false;
  }
}

function closeSummaryModal() {
  state.summaryThreadId = "";
  state.summaryLoading = false;
  state.summarySaving = false;
  setSummaryStatus("");
  clearSummaryForm();
  if (plotSummaryContactSelectEl) {
    plotSummaryContactSelectEl.innerHTML = "";
  }
  showSummaryModal(false);
}

function ensurePlotBackgroundMessagesWorker() {
  if (isEmbeddedView() || plotBackgroundMessagesFrameEl) {
    return;
  }
  const iframe = document.createElement("iframe");
  iframe.id = "plot-background-messages-frame";
  iframe.setAttribute("aria-hidden", "true");
  iframe.tabIndex = -1;
  iframe.src = "./messages.html?embed=1&background=1";
  iframe.style.position = "fixed";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "0";
  iframe.style.opacity = "0";
  iframe.style.pointerEvents = "none";
  document.body?.appendChild(iframe);
  plotBackgroundMessagesFrameEl = iframe;
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
      const summaryBusy = state.summaryLoading && state.summaryThreadId === thread.id;
      return `
        <article class="plot-thread-card">
          <button
            class="plot-thread-card__main"
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
          <div class="plot-thread-card__actions">
            <button
              class="plot-thread-card__action"
              type="button"
              data-action="summarize-thread"
              data-thread-id="${escapeHtml(thread.id)}"
              ${summaryBusy ? "disabled" : ""}
            >
              ${summaryBusy ? "总结中…" : "总结剧情"}
            </button>
            <button
              class="plot-thread-card__action plot-thread-card__action--danger"
              type="button"
              data-action="delete-thread"
              data-thread-id="${escapeHtml(thread.id)}"
            >
              删除
            </button>
          </div>
        </article>
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
            <div class="plot-bubble__head">
              <span class="plot-bubble__role">${isUser ? "你的推进" : "剧情正文"}</span>
              ${
                isUser
                  ? ""
                  : `<button
                      class="plot-bubble__action"
                      type="button"
                      data-action="edit-plot-message"
                      data-thread-id="${escapeHtml(thread?.id || "")}"
                      data-message-id="${escapeHtml(message.id)}"
                    >编辑</button>`
              }
            </div>
            <div class="plot-bubble__text">${escapeHtml(message.text)}</div>
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
  showMessageEditModal(state.messageEditModalOpen);
  showSummaryModal(state.summaryModalOpen);
  showSummaryLoadingOverlay(state.summaryLoading && !state.summaryModalOpen);
  if (plotMessageEditInputEl) {
    plotMessageEditInputEl.disabled = false;
  }
  const summaryFormDisabled = state.summarySaving || state.summaryLoading;
  if (plotSummaryContentInputEl) {
    plotSummaryContentInputEl.disabled = summaryFormDisabled;
  }
  if (plotSummaryEmotionInputEl) {
    plotSummaryEmotionInputEl.disabled = summaryFormDisabled;
  }
  if (plotSummaryImportanceInputEl) {
    plotSummaryImportanceInputEl.disabled = summaryFormDisabled;
  }
  if (plotSummaryAwarenessInputEl) {
    plotSummaryAwarenessInputEl.disabled = summaryFormDisabled;
  }
  if (plotSummaryContactSelectEl) {
    plotSummaryContactSelectEl.disabled =
      summaryFormDisabled || !plotSummaryContactSelectEl.options.length;
  }
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

function getPlotSummaryTargetContacts(thread = null) {
  return normalizeObjectArray(thread?.participants)
    .filter((item) => String(item?.type || "").trim() === "contact")
    .map((item) => {
      const resolvedId = String(item?.id || "").trim();
      const resolved = getContactSnapshotById(resolvedId);
      if (!resolved) {
        return null;
      }
      return {
        id: String(resolved?.id || "").trim(),
        name: String(resolved?.name || "").trim()
      };
    })
    .filter((item) => item.id && item.name);
}

function renderSummaryTargetOptions(thread = null) {
  if (!plotSummaryContactSelectEl) {
    return [];
  }
  const contacts = getPlotSummaryTargetContacts(thread);
  plotSummaryContactSelectEl.innerHTML = contacts.length
    ? contacts
        .map(
          (item) => `<option value="${escapeHtml(item.id)}">${escapeHtml(item.name)}</option>`
        )
        .join("")
    : '<option value="">暂无可保存的角色</option>';
  plotSummaryContactSelectEl.disabled = !contacts.length || state.summarySaving;
  return contacts;
}

function buildPlotSummaryTranscript(thread = null) {
  const resolvedThread = thread && typeof thread === "object" ? thread : null;
  const historyLines = normalizeObjectArray(resolvedThread?.messages)
    .filter((message) => String(message?.text || "").trim())
    .map((message) =>
      message.role === "assistant"
        ? `【剧情正文】\n${String(message.text || "").trim()}`
        : `【用户推进】\n${String(message.text || "").trim()}`
    );
  return [
    resolvedThread?.openingPlot ? `【开场剧情】\n${resolvedThread.openingPlot}` : "",
    historyLines.join("\n\n")
  ]
    .filter(Boolean)
    .join("\n\n")
    .trim();
}

function buildPlotSummarySystemPrompt(thread, targetContact = null) {
  const participants = normalizeObjectArray(thread?.participants)
    .map((item) => resolveThreadParticipant(item) || item)
    .filter(Boolean);
  const customCharacters = normalizeObjectArray(thread?.customCharacters);
  const roleList = participants
    .filter((item) => item.type === "contact")
    .map((item) => item.name)
    .filter(Boolean);
  const participantBlock = [
    roleList.length ? `已选角色：${roleList.join("、")}` : "当前剧情没有选中任何角色。",
    customCharacters.length
      ? `额外人物：${customCharacters
          .map((item) => `${item.name}${item.role ? `（${item.role}）` : ""}`)
          .join("、")}`
      : "",
    targetContact?.name ? `这次需要保存到角色「${targetContact.name}」的情景记忆。` : "",
    `完整剧情记录：\n${buildPlotSummaryTranscript(thread) || "暂无剧情内容。"}`
  ]
    .filter(Boolean)
    .join("\n\n");
  const personaBlock = [
    "这不是剧情续写，也不是聊天回复，而是一条剧情记忆总结任务。",
    "请把整条剧情线压缩成一条最值得保留的情景记忆。",
    "总结文字尽量客观、克制、自然，不要写成流水账，不要写成小说段落，也不要做解释分析。",
    targetContact?.name
      ? `这条情景记忆最终会挂在角色「${targetContact.name}」下，因此情绪倾向请围绕这个角色在本段剧情中的情绪变化或关系变化概括。`
      : "情绪倾向请概括这段剧情最明显的情绪变化或关系变化。"
  ].join("\n");
  const outputBlock = [
    "必须只返回 1 条 items 项，不允许返回多条，也不允许空数组。",
    "action 固定写 create。",
    "memory_type 固定写 scene。",
    "canonical_text 写可直接保存进情景记忆的一句话总结。",
    "summary_short 写更短的提示版概括，但语义应与 canonical_text 一致。",
    "base_importance 填 0-100 的整数。",
    "emotion_summary 用一句话描述这段剧情带来的情绪或关系变化。",
    "reason_note 用极短的话说明为什么值得保留。",
    "只输出符合结构的 JSON。"
  ].join("\n");
  return buildStructuredPromptSections(
    {
      context_library: [
        `任务：总结剧情《${thread?.title || "未命名剧情"}》并提炼成一条情景记忆。`,
        participantBlock
      ],
      persona_alignment: personaBlock,
      output_standard: outputBlock
    },
    state.settings
  );
}

function buildPlotSummaryUserInstruction(thread, targetContact = null) {
  return [
    targetContact?.name
      ? `请只为角色「${targetContact.name}」提炼 1 条情景记忆。`
      : "请提炼 1 条情景记忆。",
    "如果剧情里出现多件事，只保留最值得长期记住的那一件。",
    "请只返回 JSON，不要解释，不要 markdown。"
  ]
    .filter(Boolean)
    .join("\n");
}

function extractPlotSummaryCandidate(payload = null) {
  const items = Array.isArray(payload?.items) ? payload.items : [];
  for (const item of items) {
    const source = normalizeObjectValue(item);
    if (!source) {
      continue;
    }
    const content = String(
      source.canonical_text || source.summary_short || source.summary_faint || source.source_excerpt || ""
    ).trim();
    if (!content) {
      continue;
    }
    return {
      content,
      importance: normalizeMemoryImportance(
        source.base_importance,
        DEFAULT_SCENE_MEMORY_IMPORTANCE
      ),
      emotionSummary: String(source.emotion_summary || "").trim()
    };
  }
  return null;
}

async function requestPlotSummary(threadId, targetContactId = "") {
  syncRuntimeData();
  const thread = getThreadById(threadId);
  if (!thread) {
    throw new Error("未找到当前剧情。");
  }
  const targetContact =
    getPlotSummaryTargetContacts(thread).find(
      (item) => item.id === String(targetContactId || "").trim()
    ) || getPlotSummaryTargetContacts(thread)[0] || null;
  if (!targetContact) {
    throw new Error("这条剧情没有可保存的角色。");
  }

  const settings = resolveDedicatedApiSettings(state.settings, "summaryApiEnabled", "summaryApiConfigId");
  const requestEndpoint = validateApiSettings(settings, "剧情总结");
  const systemPrompt = buildPlotSummarySystemPrompt(thread, targetContact);
  const structuredOutputContext = createStructuredOutputContext(settings, "memory_extract_v2");
  const userInstruction = appendStructuredOutputPromptHint(
    buildPlotSummaryUserInstruction(thread, targetContact),
    structuredOutputContext
  );
  const privacySession = createPrivacySession({
    settings,
    profile: state.profile,
    contacts: state.contacts,
    thread,
    systemPrompt,
    userInstruction,
    extraTerms: normalizeObjectArray(thread.customCharacters)
      .map((item) => String(item?.name || "").trim())
      .filter(Boolean)
      .map((name) => ({ text: name, category: "NAME" }))
  });
  const encodedSystemPrompt = preparePromptWithPrivacy(systemPrompt, privacySession);
  const encodedUserInstruction = encodeTextWithPrivacy(userInstruction, privacySession);
  const requestBody = decorateRequestBodyWithStructuredOutput(
    buildSingleInstructionRequestBody(
      settings,
      encodedSystemPrompt,
      encodedUserInstruction,
      "plot_summary"
    ),
    structuredOutputContext
  );
  const logBase = applyPrivacyToLogEntry(
    buildPlotApiLogBase(
      "plot_summary",
      settings,
      requestEndpoint,
      [encodedSystemPrompt, encodedUserInstruction].join("\n\n"),
      requestBody,
      `剧情：${thread.title} · 总结`
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

    let repairResult = null;
    let structuredPayload = parseStructuredOutputPayload(payload, structuredOutputContext);
    if (structuredOutputContext.enabled && !structuredPayload) {
      repairResult = await requestStructuredRepairOnce(
        settings,
        requestEndpoint,
        structuredOutputContext,
        rawResponse,
        "plot_summary_repair"
      );
      if (repairResult?.ok) {
        structuredPayload = repairResult.structuredPayload;
      }
    }

    const decodedStructuredPayload = decodeValueWithPrivacy(
      structuredPayload || repairResult?.payload || payload,
      privacySession
    );
    const summaryCandidate = extractPlotSummaryCandidate(decodedStructuredPayload);
    if (!summaryCandidate) {
      const errorMessage = "剧情总结返回了不可解析的记忆结构。";
      appendApiLog({
        ...logBase,
        ...buildGeminiLogFields(settings, repairResult?.payload || payload),
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

    appendApiLog({
      ...logBase,
      ...buildGeminiLogFields(settings, repairResult?.payload || payload),
      status: "success",
      statusCode: response.status,
      responseText: repairResult?.rawResponseText || rawResponse,
      responseBody: repairResult?.payload || payload,
      repairAttempted: Boolean(repairResult),
      originalResponseText: repairResult ? rawResponse : "",
      originalResponseBody: repairResult ? payload : null,
      summary: encodeTextWithPrivacy(
        `剧情：${thread.title} · 已生成 1 条剧情记忆`,
        privacySession
      )
    });
    logged = true;
    return summaryCandidate;
  } catch (error) {
    if (!logged) {
      appendApiLog({
        ...logBase,
        status: "error",
        errorMessage: error?.message || "剧情总结失败"
      });
    }
    throw error;
  }
}

async function openSummaryModal(threadId = "") {
  const thread = getThreadById(threadId);
  if (!thread) {
    return;
  }
  const targetContacts = renderSummaryTargetOptions(thread);
  if (!targetContacts.length) {
    setStatus("这条剧情没有可保存到记忆的角色。", "error");
    return;
  }
  state.summaryThreadId = thread.id;
  state.summaryLoading = true;
  state.summarySaving = false;
  clearSummaryForm();
  state.summaryModalOpen = false;
  showSummaryModal(false);
  setStatus("正在总结剧情中……");
  setSummaryStatus("");
  render();
  try {
    const summary = await requestPlotSummary(thread.id, plotSummaryContactSelectEl?.value || "");
    if (state.summaryThreadId !== thread.id) {
      return;
    }
    if (plotSummaryContentInputEl) {
      plotSummaryContentInputEl.value = summary.content;
    }
    if (plotSummaryEmotionInputEl) {
      plotSummaryEmotionInputEl.value = summary.emotionSummary || "";
    }
    if (plotSummaryImportanceInputEl) {
      plotSummaryImportanceInputEl.value = String(summary.importance || DEFAULT_SCENE_MEMORY_IMPORTANCE);
    }
    state.summaryModalOpen = true;
    setSummaryStatus("剧情总结已生成，你可以直接修改后再保存。", "success");
    setStatus("");
    window.setTimeout(() => {
      plotSummaryContentInputEl?.focus();
    }, 0);
  } catch (error) {
    if (state.summaryThreadId !== thread.id) {
      return;
    }
    setStatus(error?.message || "剧情总结失败。", "error");
  } finally {
    if (state.summaryThreadId === thread.id) {
      state.summaryLoading = false;
    }
    render();
  }
}

function savePlotSummaryMemoryEntry(contactId = "", content = "", importance = DEFAULT_SCENE_MEMORY_IMPORTANCE) {
  const memoryEntry = normalizeMessageMemory({
    id: `plot_scene_memory_${Date.now()}_${hashText(`${contactId}_${content}`)}`,
    contactId,
    type: "scene",
    content,
    importance,
    source: "summary",
    createdAt: Date.now(),
    updatedAt: Date.now()
  });
  const nextMemories = mergeMemories(loadMessageMemories(), [memoryEntry]);
  persistMessageMemories(nextMemories);
  return memoryEntry;
}

function savePlotSummaryAwareness(contactId = "", thread = null, content = "", emotionSummary = "") {
  const resolvedContactId = String(contactId || "").trim();
  if (!resolvedContactId || !thread) {
    return null;
  }
  const contactsPayload = loadStoredContactsPayload();
  const contacts = [...contactsPayload.contacts];
  const contactIndex = contacts.findIndex(
    (item) => String(item?.id || "").trim() === resolvedContactId
  );
  const contactSnapshot = getContactSnapshotById(resolvedContactId);
  const previous =
    normalizeObjectValue(contactIndex >= 0 ? contacts[contactIndex] : null) ||
    normalizeObjectValue(contactSnapshot) ||
    null;
  if (!previous) {
    throw new Error("未找到可写入察觉的角色。");
  }
  const nextTitle = resolveAwarenessTitle(`剧情总结：${thread.title}`, content);
  const nextSensitivity = normalizeAwarenessSensitivity(previous.awarenessSensitivity || "medium");
  const changed =
    String(previous.awarenessText || "").trim() !== String(content || "").trim() ||
    resolveAwarenessTitle(previous.awarenessTitle, previous.awarenessText) !== nextTitle ||
    String(previous.awarenessEmotionShift || "").trim() !== String(emotionSummary || "").trim() ||
    normalizeAwarenessSensitivity(previous.awarenessSensitivity) !== nextSensitivity;
  const nextContact = {
    ...previous,
    awarenessTitle: nextTitle,
    awarenessText: String(content || "").trim(),
    awarenessEmotionShift: String(emotionSummary || "").trim(),
    awarenessSensitivity: nextSensitivity,
    awarenessConsumed: changed ? false : Boolean(previous.awarenessConsumed),
    awarenessResolvedState: changed ? "" : String(previous.awarenessResolvedState || "").trim(),
    awarenessHistoryHidden: changed ? false : Boolean(previous.awarenessHistoryHidden),
    awarenessCheckCount: changed
      ? 0
      : Math.max(0, Number.parseInt(String(previous.awarenessCheckCount || 0), 10) || 0),
    awarenessTriggerCount: changed
      ? 0
      : Math.max(0, Number.parseInt(String(previous.awarenessTriggerCount || 0), 10) || 0),
    awarenessLastCheckedAt: changed ? 0 : Number(previous.awarenessLastCheckedAt) || 0,
    awarenessLastTriggeredAt: changed ? 0 : Number(previous.awarenessLastTriggeredAt) || 0,
    awarenessHistory: changed ? [] : normalizeObjectArray(previous.awarenessHistory),
    awarenessManualTriggerPending: {
      title: nextTitle,
      text: String(content || "").trim(),
      emotionShift: String(emotionSummary || "").trim(),
      sensitivity: nextSensitivity,
      createdAt: Date.now()
    },
    updatedAt: Date.now()
  };
  if (contactIndex >= 0) {
    contacts[contactIndex] = nextContact;
  } else {
    contacts.unshift(nextContact);
  }
  persistStoredContactsPayload(contactsPayload, contacts);

  const conversationResult = ensureStoredConversationForContact(resolvedContactId);
  if (!conversationResult?.conversation) {
    throw new Error("未找到对应聊天框，无法触发察觉消息。");
  }
  const nextConversations = conversationResult.conversations.map((item) => {
    if (String(item?.id || "").trim() !== String(conversationResult.conversation.id || "").trim()) {
      return item;
    }
    return {
      ...item,
      awarenessCounter: 0,
      updatedAt: Number(item?.updatedAt) || Date.now()
    };
  });
  persistStoredConversationsPayload(conversationResult.payload, nextConversations);
  enqueueReplyTask(conversationResult.conversation.id, {
    awarenessImmediateTrigger: true
  });
  return conversationResult.conversation;
}

async function savePlotSummaryFromModal() {
  const thread = getThreadById(state.summaryThreadId);
  if (!thread) {
    throw new Error("未找到当前剧情。");
  }
  const contactId = String(plotSummaryContactSelectEl?.value || "").trim();
  const content = String(plotSummaryContentInputEl?.value || "").trim();
  const emotionSummary = String(plotSummaryEmotionInputEl?.value || "").trim();
  const importance = normalizeMemoryImportance(
    plotSummaryImportanceInputEl?.value,
    DEFAULT_SCENE_MEMORY_IMPORTANCE
  );
  if (!contactId) {
    throw new Error("请先选择保存到哪个角色。");
  }
  if (!content) {
    throw new Error("请先填写情景记忆文本。");
  }
  savePlotSummaryMemoryEntry(contactId, content, importance);
  if (plotSummaryAwarenessInputEl?.checked) {
    ensurePlotBackgroundMessagesWorker();
    savePlotSummaryAwareness(contactId, thread, content, emotionSummary);
  }
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

  if (target.closest("[data-close-plot-message-edit-modal]")) {
    closeMessageEditModal();
    return;
  }

  if (target.closest("[data-close-plot-summary-modal]")) {
    closeSummaryModal();
    return;
  }

  const openThreadBtn = target.closest('[data-action="open-thread"]');
  if (openThreadBtn) {
    openThread(String(openThreadBtn.getAttribute("data-thread-id") || ""));
    return;
  }

  const summarizeThreadBtn = target.closest('[data-action="summarize-thread"]');
  if (summarizeThreadBtn) {
    openSummaryModal(String(summarizeThreadBtn.getAttribute("data-thread-id") || ""));
    return;
  }

  const deleteThreadBtn = target.closest('[data-action="delete-thread"]');
  if (deleteThreadBtn) {
    const threadId = String(deleteThreadBtn.getAttribute("data-thread-id") || "");
    const thread = getThreadById(threadId);
    if (!thread) {
      return;
    }
    const confirmed = window.confirm(`确定删除剧情「${thread.title}」吗？`);
    if (!confirmed) {
      return;
    }
    state.threads = state.threads.filter((item) => item.id !== threadId);
    if (state.activeThreadId === threadId) {
      state.activeThreadId = "";
    }
    if (state.summaryThreadId === threadId) {
      closeSummaryModal();
    }
    persistThreads();
    setStatus("剧情已删除。", "success");
    render();
    return;
  }

  const editPlotMessageBtn = target.closest('[data-action="edit-plot-message"]');
  if (editPlotMessageBtn) {
    openMessageEditModal(
      String(editPlotMessageBtn.getAttribute("data-thread-id") || ""),
      String(editPlotMessageBtn.getAttribute("data-message-id") || "")
    );
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

  plotMessageEditCloseBtnEl?.addEventListener("click", closeMessageEditModal);
  plotMessageEditCancelBtnEl?.addEventListener("click", closeMessageEditModal);
  plotMessageEditFormEl?.addEventListener("submit", (event) => {
    event.preventDefault();
    const threadId = String(state.editingThreadId || "").trim();
    const messageId = String(state.editingMessageId || "").trim();
    const nextText = String(plotMessageEditInputEl?.value || "").trim();
    if (!threadId || !messageId) {
      setMessageEditStatus("未找到当前剧情正文。", "error");
      return;
    }
    if (!nextText) {
      setMessageEditStatus("剧情正文不能为空。", "error");
      return;
    }
    updateThread(threadId, (thread) => {
      const nextMessages = normalizeObjectArray(thread.messages).map((message) =>
        message.id === messageId
          ? {
              ...message,
              text: nextText
            }
          : message
      );
      const nextThread = {
        ...thread,
        messages: nextMessages,
        updatedAt: Date.now()
      };
      nextThread.summary = deriveThreadSummary(nextThread);
      return nextThread;
    });
    setStatus("剧情正文已更新。", "success");
    closeMessageEditModal();
    render();
  });

  plotSummaryCloseBtnEl?.addEventListener("click", closeSummaryModal);
  plotSummaryCancelBtnEl?.addEventListener("click", closeSummaryModal);
  plotSummaryFormEl?.addEventListener("submit", async (event) => {
    event.preventDefault();
    state.summarySaving = true;
    setSummaryStatus("正在保存剧情总结…");
    render();
    try {
      await savePlotSummaryFromModal();
      setSummaryStatus(
        plotSummaryAwarenessInputEl?.checked
          ? "已保存到情景记忆，并已触发察觉消息。"
          : "已保存到情景记忆。",
        "success"
      );
      setStatus("剧情总结已保存。", "success");
      window.setTimeout(() => {
        closeSummaryModal();
        render();
      }, 180);
    } catch (error) {
      setSummaryStatus(error?.message || "保存失败。", "error");
    } finally {
      state.summarySaving = false;
      render();
    }
  });

  document.addEventListener("click", handleRootClick);

  window.addEventListener("storage", (event) => {
    if (String(event?.key || "").trim() === SETTINGS_KEY) {
      syncRuntimeData();
    }
  });
  window.addEventListener("pulse-api-config-switched", syncRuntimeData);
}

function init() {
  syncRuntimeData();
  ensurePlotBackgroundMessagesWorker();
  render();
  bindEvents();
}

init();
