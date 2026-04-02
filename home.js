const DEFAULT_OPENAI_ENDPOINT = "https://api.deepseek.com/chat/completions";
const DEFAULT_GEMINI_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta";
const DEFAULT_DEEPSEEK_MODEL = "deepseek-chat";
const DEFAULT_GEMINI_MODEL = "gemini-2.0-flash";
const APP_BUILD_VERSION = "20260402-230812";
const APP_BUILD_UPDATED_AT = "2026-04-02 23:08:12";
const SETTINGS_KEY = "x_style_generator_settings_v2";
const POSTS_KEY = "x_style_generator_posts_v2";
const REFRESH_KEY = "x_style_generator_refresh_v2";
const PROFILE_KEY = "x_style_generator_profile_v1";
const PROFILE_POSTS_KEY = "x_style_generator_profile_posts_v1";
const DISCUSSIONS_KEY = "x_style_generator_discussions_v1";
const WORLD_BOOKS_KEY = "x_style_generator_message_worldbooks_v1";
const MESSAGE_CONTACTS_KEY = "x_style_generator_message_contacts_v1";
const SCHEDULE_ENTRIES_KEY = "x_style_generator_schedule_entries_v1";
const PRIVACY_ALLOWLIST_META_KEY = "x_style_generator_privacy_allowlist_meta_v1";
const PRIVACY_PENDING_SCAN_KEY = "x_style_generator_privacy_scan_pending_v1";
const PRIVACY_ALLOWLIST_TERMS_KEY = "x_style_generator_privacy_allowlist_terms_v1";
const API_CONFIG_LIMIT = 12;
const CONFIG_EXPORT_SCHEMA = "pulse-generator-config";
const TRANSFER_FORUM_BASE_ITEM_ID = "__forum_base__";

const homeSceneEl = document.querySelector(".home-scene");
const phoneDateEl = document.querySelector("#phone-date");
const phoneClockEl = document.querySelector("#phone-clock");
const statusVersionEl = document.querySelector("#status-version");
const statusUpdatedEl = document.querySelector("#status-updated");
const homeSettingsTriggerBtn = document.querySelector("#home-settings-trigger");
const homeSettingsModalEl = document.querySelector("#home-settings-modal");
const homeSettingsCloseBtn = document.querySelector("#home-settings-close-btn");
const homeActiveConfigSummaryEl = document.querySelector("#home-active-config-summary");
const homeApiModeSelect = document.querySelector("#home-api-mode");
const homeApiEndpointInput = document.querySelector("#home-api-endpoint");
const homeApiTokenInput = document.querySelector("#home-api-token");
const homeApiModelInput = document.querySelector("#home-api-model");
const homeApiConfigNameInput = document.querySelector("#home-api-config-name-input");
const homeApiConfigSaveBtn = document.querySelector("#home-api-config-save-btn");
const homeApiConfigStatusEl = document.querySelector("#home-api-config-status");
const homeApiConfigListEl = document.querySelector("#home-api-config-list");
const homeTranslationApiEnabledEl = document.querySelector("#home-translation-api-enabled");
const homeTranslationApiConfigSelectEl = document.querySelector(
  "#home-translation-api-config-select"
);
const homeSummaryApiEnabledEl = document.querySelector("#home-summary-api-enabled");
const homeSummaryApiConfigSelectEl = document.querySelector("#home-summary-api-config-select");
const homeConfigExportBtn = document.querySelector("#home-config-export-btn");
const homeConfigImportBtn = document.querySelector("#home-config-import-btn");
const homeConfigImportInput = document.querySelector("#home-config-import-input");
const homeApiLogBtn = document.querySelector("#home-api-log-btn");
const homeConfigTransferStatusEl = document.querySelector("#home-config-transfer-status");
const homeTransferSelectAllBtn = document.querySelector("#home-transfer-select-all-btn");
const homeTransferClearBtn = document.querySelector("#home-transfer-clear-btn");
const homeExportReviewEl = document.querySelector("#home-export-review");
const homeExportReviewSummaryEl = document.querySelector("#home-export-review-summary");
const homeTransferExportOptionsEl = document.querySelector("#home-transfer-export-options");
const homeExportApplyBtn = document.querySelector("#home-export-apply-btn");
const homeExportCancelBtn = document.querySelector("#home-export-cancel-btn");
const homeImportReviewEl = document.querySelector("#home-import-review");
const homeImportReviewSummaryEl = document.querySelector("#home-import-review-summary");
const homeImportReviewOptionsEl = document.querySelector("#home-import-review-options");
const homeImportApplyBtn = document.querySelector("#home-import-apply-btn");
const homeImportCancelBtn = document.querySelector("#home-import-cancel-btn");
const homeAppTriggers = [...document.querySelectorAll("[data-open-app]")];
const homeBrowserModalEl = document.querySelector("#home-browser-modal");
const homeBrowserFrameEl = document.querySelector("#home-browser-frame");
const homeBrowserKickerEl = document.querySelector("#home-browser-kicker");
const homeBrowserTitleEl = document.querySelector("#home-browser-title");
const homeBrowserCloseBtn = document.querySelector("#home-browser-close-btn");
const privacyAppScreenEl = document.querySelector("#privacy-app-screen");
const privacyAppCloseBtn = document.querySelector("#privacy-app-close-btn");
const privacyAppAddBtn = document.querySelector("#privacy-app-add-btn");
const privacyAppWhitelistSummaryEl = document.querySelector("#privacy-app-whitelist-summary");
const privacyAppWhitelistListEl = document.querySelector("#privacy-app-whitelist-list");
const privacyAppPendingSummaryEl = document.querySelector("#privacy-app-pending-summary");
const privacyAppPendingListEl = document.querySelector("#privacy-app-pending-list");
const privacyAppPendingSelectAllBtn = document.querySelector("#privacy-app-pending-select-all-btn");
const privacyAppPendingClearBtn = document.querySelector("#privacy-app-pending-clear-btn");
const privacyAppPendingApplyBtn = document.querySelector("#privacy-app-pending-apply-btn");
const privacyAppScanBtn = document.querySelector("#privacy-app-scan-btn");
const privacyAppStatusEl = document.querySelector("#privacy-app-status");
const privacyAppAddModalEl = document.querySelector("#privacy-app-add-modal");
const privacyAppAddCloseBtn = document.querySelector("#privacy-app-add-close-btn");
const privacyAppAddCancelBtn = document.querySelector("#privacy-app-add-cancel-btn");
const privacyAppAddApplyBtn = document.querySelector("#privacy-app-add-apply-btn");
const privacyAppAddTextareaEl = document.querySelector("#privacy-app-add-textarea");

const weekdayLabels = [
  "星期日",
  "星期一",
  "星期二",
  "星期三",
  "星期四",
  "星期五",
  "星期六"
];

const memoryStorage = {};

const DEFAULT_SETTINGS = {
  mode: "openai",
  endpoint: DEFAULT_OPENAI_ENDPOINT,
  token: "",
  model: DEFAULT_DEEPSEEK_MODEL,
  apiConfigs: [],
  activeApiConfigId: "",
  translationApiEnabled: false,
  translationApiConfigId: "",
  summaryApiEnabled: false,
  summaryApiConfigId: "",
  privacyAllowlist: []
};

const homeState = {
  settings: loadSettings(),
  modalOpen: false,
  browserOpen: false,
  activeAppUrl: "",
  activeAppTab: "home",
  exportTransferSelection: [],
  pendingImportTransferPayload: null,
  importTransferSelection: [],
  privacyAllowlistItems: [],
  privacyPendingCandidates: [],
  privacyAddModalOpen: false
};

function showHomeLayer(element, displayValue = "block") {
  if (!element) {
    return;
  }
  element.hidden = false;
  element.setAttribute("aria-hidden", "false");
  element.style.display = displayValue;
}

function hideHomeLayer(element) {
  if (!element) {
    return;
  }
  element.hidden = true;
  element.setAttribute("aria-hidden", "true");
  element.style.display = "none";
}

function safeGetItem(key) {
  if (Object.prototype.hasOwnProperty.call(memoryStorage, key)) {
    return memoryStorage[key];
  }
  try {
    return window.localStorage.getItem(key);
  } catch (_error) {
    return null;
  }
}

function safeSetItem(key, value) {
  memoryStorage[key] = value;
  try {
    window.localStorage.setItem(key, value);
  } catch (_error) {
  }
}

function formatTime(now) {
  return new Intl.DateTimeFormat("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  })
    .format(now)
    .replace(/^24:/, "00:");
}

function formatDate(now) {
  return `${now.getMonth() + 1}月${now.getDate()}日 ${weekdayLabels[now.getDay()]}`;
}

function updateLocalClock() {
  const now = new Date();
  const timeText = formatTime(now);
  const dateText = formatDate(now);

  if (phoneDateEl) {
    phoneDateEl.textContent = dateText;
  }
  if (phoneClockEl) {
    phoneClockEl.textContent = timeText;
  }
}

function renderBuildBadge() {
  if (statusVersionEl) {
    statusVersionEl.textContent = `FE v${APP_BUILD_VERSION}`;
  }
  if (statusUpdatedEl) {
    statusUpdatedEl.textContent = `更新于 ${APP_BUILD_UPDATED_AT}`;
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

function normalizeApiMode(mode) {
  if (mode === "gemini" || mode === "generic") {
    return mode;
  }
  return "openai";
}

function getApiModeLabel(mode) {
  const resolvedMode = normalizeApiMode(mode);
  if (resolvedMode === "gemini") {
    return "Gemini API";
  }
  if (resolvedMode === "generic") {
    return "通用 JSON 接口";
  }
  return "DeepSeek / OpenAI 兼容";
}

function getDefaultModelByMode(mode) {
  return normalizeApiMode(mode) === "gemini" ? DEFAULT_GEMINI_MODEL : DEFAULT_DEEPSEEK_MODEL;
}

function normalizeApiConfigToken(token) {
  return String(token || "").trim();
}

function normalizePrivacyAllowlist(value) {
  if (window.PulsePrivacyCover?.normalizeAllowlist) {
    return window.PulsePrivacyCover.normalizeAllowlist(value);
  }

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
    .slice(0, API_CONFIG_LIMIT)
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
  const hasExplicitPrivacyAllowlist =
    source &&
    typeof source === "object" &&
    Object.prototype.hasOwnProperty.call(source, "privacyAllowlist");
  const persistedPrivacyAllowlist = loadStoredPrivacyAllowlistTerms();
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
  if (!merged.apiConfigs.some((item) => item.id === merged.summaryApiConfigId)) {
    merged.summaryApiConfigId = "";
    merged.summaryApiEnabled = false;
  }
  merged.summaryApiEnabled = Boolean(merged.summaryApiEnabled && merged.summaryApiConfigId);
  merged.privacyAllowlist = normalizePrivacyAllowlist(
    hasExplicitPrivacyAllowlist
      ? merged.privacyAllowlist || source?.privacyAllowlist || []
      : [...persistedPrivacyAllowlist, ...(merged.privacyAllowlist || source?.privacyAllowlist || [])]
  );
  return merged;
}

function loadSettings(options = {}) {
  const raw = safeGetItem(SETTINGS_KEY);
  if (!raw) {
    return buildNormalizedSettingsSnapshot(DEFAULT_SETTINGS, options);
  }

  try {
    return buildNormalizedSettingsSnapshot(JSON.parse(raw), options);
  } catch (_error) {
    return buildNormalizedSettingsSnapshot(DEFAULT_SETTINGS, options);
  }
}

function persistSettings(settings) {
  const normalized = buildNormalizedSettingsSnapshot(settings, {
    forceActiveConfig: false
  });
  safeSetItem(SETTINGS_KEY, JSON.stringify(normalized));
  persistStoredPrivacyAllowlistTerms(normalized.privacyAllowlist || []);
}

function setHomeApiConfigStatus(message, tone = "") {
  if (!homeApiConfigStatusEl) {
    return;
  }
  homeApiConfigStatusEl.textContent = message;
  homeApiConfigStatusEl.className = "home-settings-status";
  if (tone) {
    homeApiConfigStatusEl.classList.add(tone);
  }
}

function setHomeTransferStatus(message, tone = "") {
  if (!homeConfigTransferStatusEl) {
    return;
  }
  homeConfigTransferStatusEl.textContent = message;
  homeConfigTransferStatusEl.className = "home-settings-status";
  if (tone) {
    homeConfigTransferStatusEl.classList.add(tone);
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

function downloadJsonFile(filename, payload) {
  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json"
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 0);
}

function truncateText(value, length = 60) {
  const text = String(value || "").trim();
  if (text.length <= length) {
    return text;
  }
  return `${text.slice(0, length - 1)}…`;
}

function normalizeObjectArray(value) {
  return Array.isArray(value) ? value.filter((item) => item && typeof item === "object") : [];
}

function pickForumProfilePayload(profile = {}) {
  return {
    avatar: String(profile.avatar || "").trim(),
    username: String(profile.username || "").trim(),
    userId: String(profile.userId || "").trim(),
    avatarImage: String(profile.avatarImage || "").trim(),
    bannerImage: String(profile.bannerImage || "").trim(),
    following: String(profile.following || "").trim(),
    followers: String(profile.followers || "").trim(),
    signature: String(profile.signature || "").trim()
  };
}

function pickChatProfilePayload(profile = {}) {
  const source = profile && typeof profile === "object" ? profile : {};
  const chatProfileInitialized = Boolean(source.chatProfileInitialized);
  return {
    username: String(source.chatUsername || source.username || "").trim(),
    userId: String(source.chatUserId || source.userId || "").trim(),
    avatarImage: chatProfileInitialized
      ? String(source.chatAvatarImage || "").trim()
      : String(source.chatAvatarImage || source.avatarImage || "").trim(),
    personaPrompt: String(
      source.chatPersonaPrompt || source.personaPrompt || ""
    ).trim()
  };
}

function hasAnyTextValue(source = {}) {
  return Object.values(source).some((value) => String(value || "").trim());
}

function buildScheduleTransferLabel(entry = {}) {
  const title = String(entry.title || "").trim() || "未命名日程";
  const date = String(entry.date || "").trim();
  return date ? `${date} · ${title}` : title;
}

function buildScheduleTransferDescription(entry = {}) {
  const scheduleType = String(entry.scheduleType || "").trim();
  const ownerType = entry.ownerType === "contact" ? "角色" : "用户";
  const timeText =
    scheduleType === "day"
      ? "全天"
      : entry.startTime && entry.endTime
        ? `${entry.startTime}-${entry.endTime}`
        : "未设时间";
  return `${ownerType} · ${timeText}`;
}

function buildTransferPayloadFromCurrentState() {
  const settings = loadSettings();
  const profile = readStoredJson(PROFILE_KEY, {}) || {};
  const chatProfile = pickChatProfilePayload(profile);
  const worldbooks = readStoredJson(WORLD_BOOKS_KEY, { categories: [], entries: [] }) || {};
  const contacts = readStoredJson(MESSAGE_CONTACTS_KEY, []) || [];
  const scheduleEntries = readStoredJson(SCHEDULE_ENTRIES_KEY, []) || [];
  const apiConfigs = normalizeApiConfigs(settings.apiConfigs || []);

  return {
    apiConfig: {
      current: {
        mode: normalizeApiMode(settings.mode),
        endpoint: normalizeSettingsEndpointByMode(settings.mode, settings.endpoint),
        model:
          normalizeApiMode(settings.mode) === "generic"
            ? ""
            : String(settings.model || getDefaultModelByMode(settings.mode)).trim() ||
              getDefaultModelByMode(settings.mode),
        activeApiConfigId: String(settings.activeApiConfigId || "").trim(),
        translationApiEnabled: Boolean(settings.translationApiEnabled),
        translationApiConfigId: String(settings.translationApiConfigId || "").trim(),
        summaryApiEnabled: Boolean(settings.summaryApiEnabled),
        summaryApiConfigId: String(settings.summaryApiConfigId || "").trim()
      },
      apiConfigs: apiConfigs.map(({ token, ...rest }) => ({ ...rest }))
    },
    apiSecrets: {
      currentToken: normalizeApiConfigToken(settings.token),
      apiConfigs: apiConfigs
        .filter((item) => item.token)
        .map((item) => ({ id: item.id, token: normalizeApiConfigToken(item.token) }))
    },
    forum: {
      baseSettings: {
        worldview: String(settings.worldview || "").trim(),
        homeCount: Number(settings.homeCount) || "",
        replyCount: Number(settings.replyCount) || "",
        temperature: Number.isFinite(Number(settings.temperature))
          ? Number(settings.temperature)
          : ""
      },
      customTabs: normalizeObjectArray(settings.customTabs)
    },
    forumProfile: pickForumProfilePayload(profile),
    chatPersona: chatProfile,
    worldbooks: {
      categories: normalizeObjectArray(worldbooks.categories),
      entries: normalizeObjectArray(worldbooks.entries).filter(
        (item) => String(item.name || "").trim() && String(item.text || "").trim()
      )
    },
    contacts: {
      contacts: normalizeObjectArray(contacts).filter((item) => String(item.name || "").trim())
    },
    schedules: {
      entries: normalizeObjectArray(scheduleEntries).filter(
        (item) => String(item.title || "").trim() && String(item.date || "").trim()
      )
    },
    privacyAllowlist: normalizePrivacyAllowlist(settings.privacyAllowlist || []),
    contactChatSettings:
      settings.messagePromptSettings && typeof settings.messagePromptSettings === "object"
        ? { ...settings.messagePromptSettings }
        : null,
    bubbleMountSettings:
      settings.bubblePromptSettings && typeof settings.bubblePromptSettings === "object"
        ? { ...settings.bubblePromptSettings }
        : null
  };
}

function getCurrentHomeQuery() {
  try {
    return new URLSearchParams(window.location.search);
  } catch (_error) {
    return new URLSearchParams();
  }
}

function isPrivacyAppView() {
  return getCurrentHomeQuery().get("view") === "privacy";
}

function isEmbeddedHomeView() {
  return getCurrentHomeQuery().get("embed") === "1";
}

function requestEmbeddedClose() {
  if (isEmbeddedHomeView()) {
    try {
      if (window.parent && window.parent !== window) {
        window.parent.postMessage({ type: "pulse-generator-close-app" }, "*");
        return;
      }
    } catch (_error) {
    }
  }
  window.location.href = "./index.html";
}

function normalizePrivacyAllowlistItemSource(value) {
  return value === "scan" ? "scan" : "manual";
}

function buildPrivacyItemId(value, prefix = "privacy_item") {
  const text = String(value || "").trim();
  return `${prefix}_${hashText(text || `${prefix}_${Date.now()}`)}`;
}

function setPrivacyAppStatus(message = "", tone = "") {
  if (!privacyAppStatusEl) {
    return;
  }
  privacyAppStatusEl.textContent = String(message || "").trim();
  privacyAppStatusEl.className = "home-settings-status";
  if (tone) {
    privacyAppStatusEl.classList.add(tone);
  }
}

function normalizePrivacyAllowlistMetaItems(value = []) {
  const items = normalizeObjectArray(value);
  const unique = new Set();
  return items
    .map((item) => ({
      text: String(item.text || "").trim(),
      source: normalizePrivacyAllowlistItemSource(item.source)
    }))
    .filter((item) => {
      if (!item.text || unique.has(item.text)) {
        return false;
      }
      unique.add(item.text);
      return true;
    });
}

function loadStoredPrivacyAllowlistTerms() {
  return normalizePrivacyAllowlist(readStoredJson(PRIVACY_ALLOWLIST_TERMS_KEY, []));
}

function persistStoredPrivacyAllowlistTerms(terms = []) {
  safeSetItem(
    PRIVACY_ALLOWLIST_TERMS_KEY,
    JSON.stringify(normalizePrivacyAllowlist(terms))
  );
}

function loadPrivacyAllowlistMetaItems() {
  return normalizePrivacyAllowlistMetaItems(readStoredJson(PRIVACY_ALLOWLIST_META_KEY, []));
}

function persistPrivacyAllowlistMetaItems(items = []) {
  safeSetItem(PRIVACY_ALLOWLIST_META_KEY, JSON.stringify(normalizePrivacyAllowlistMetaItems(items)));
}

function loadPrivacyAllowlistItems() {
  const settings = loadSettings({ forceActiveConfig: false });
  const terms = normalizePrivacyAllowlist([
    ...loadStoredPrivacyAllowlistTerms(),
    ...(settings.privacyAllowlist || [])
  ]);
  const metaMap = new Map(
    loadPrivacyAllowlistMetaItems().map((item) => [item.text, item.source])
  );
  return terms.map((text) => ({
    id: buildPrivacyItemId(text, "privacy_allowlist"),
    text,
    source: normalizePrivacyAllowlistItemSource(metaMap.get(text) || "manual")
  }));
}

function syncPrivacyAllowlistItemsFromStorage() {
  homeState.privacyAllowlistItems = loadPrivacyAllowlistItems();
  return homeState.privacyAllowlistItems;
}

function normalizePrivacyAllowlistItems(items = []) {
  const result = [];
  const indexMap = new Map();
  normalizeObjectArray(items).forEach((item) => {
    const text = String(item.text || "").trim();
    if (!text) {
      return;
    }
    const source = normalizePrivacyAllowlistItemSource(item.source);
    if (indexMap.has(text)) {
      const existingIndex = indexMap.get(text);
      if (source === "manual") {
        result[existingIndex].source = "manual";
      }
      return;
    }
    indexMap.set(text, result.length);
    result.push({
      id: String(item.id || buildPrivacyItemId(text, "privacy_allowlist")).trim(),
      text,
      source
    });
  });
  return result;
}

function normalizePrivacyPendingCandidates(candidates = [], allowlistTerms = []) {
  const allowlist = new Set(normalizePrivacyAllowlist(allowlistTerms));
  const merged = [];
  const indexMap = new Map();
  normalizeObjectArray(candidates).forEach((item, index) => {
    const text = String(item.text || "").trim();
    if (!text || allowlist.has(text)) {
      return;
    }
    const normalized = {
      id: String(item.id || buildPrivacyItemId(`${text}_${index}`, "privacy_pending")).trim(),
      text,
      category: String(item.category || "TERM").trim() || "TERM",
      sources: normalizePrivacyAllowlist(item.sources || []),
      sample: String(item.sample || "").trim(),
      selected: item.selected !== false
    };
    if (indexMap.has(text)) {
      const target = merged[indexMap.get(text)];
      target.sources = normalizePrivacyAllowlist([...target.sources, ...normalized.sources]);
      if (target.category === "TERM" && normalized.category !== "TERM") {
        target.category = normalized.category;
      }
      if (!target.sample && normalized.sample) {
        target.sample = normalized.sample;
      }
      target.selected = Boolean(target.selected || normalized.selected);
      return;
    }
    indexMap.set(text, merged.length);
    merged.push(normalized);
  });
  return merged;
}

function loadPrivacyPendingCandidates(allowlistTerms = []) {
  return normalizePrivacyPendingCandidates(
    readStoredJson(PRIVACY_PENDING_SCAN_KEY, []),
    allowlistTerms
  );
}

function persistPrivacyPendingCandidates(candidates = [], allowlistTerms = []) {
  const normalized = normalizePrivacyPendingCandidates(candidates, allowlistTerms);
  safeSetItem(PRIVACY_PENDING_SCAN_KEY, JSON.stringify(normalized));
  homeState.privacyPendingCandidates = normalized;
}

function persistPrivacyAllowlistItems(items = []) {
  const normalizedItems = normalizePrivacyAllowlistItems(items);
  const nextSettings = loadSettings({ forceActiveConfig: false });
  nextSettings.privacyAllowlist = normalizedItems.map((item) => item.text);
  persistSettings(nextSettings);
  persistStoredPrivacyAllowlistTerms(nextSettings.privacyAllowlist);
  persistPrivacyAllowlistMetaItems(
    normalizedItems.map((item) => ({
      text: item.text,
      source: item.source
    }))
  );
  homeState.settings = buildNormalizedSettingsSnapshot(nextSettings, {
    forceActiveConfig: false
  });
  homeState.privacyAllowlistItems = normalizedItems;
  persistPrivacyPendingCandidates(
    homeState.privacyPendingCandidates,
    normalizedItems.map((item) => item.text)
  );
}

function collectPrivacyScanTexts() {
  const settings = loadSettings({ forceActiveConfig: false });
  const profile = readStoredJson(PROFILE_KEY, {}) || {};
  const worldbooks = readStoredJson(WORLD_BOOKS_KEY, { categories: [], entries: [] }) || {};
  const contacts = normalizeObjectArray(readStoredJson(MESSAGE_CONTACTS_KEY, []));
  const texts = [];
  const counts = {
    rolePersona: 0,
    userPersona: 0,
    specialUserPersona: 0,
    worldbook: 0,
    forum: 0
  };

  function pushText(bucket, value, source) {
    const text = String(value || "").trim();
    if (!text) {
      return;
    }
    texts.push({
      text,
      source: String(source || "未分类").trim() || "未分类"
    });
    if (Object.prototype.hasOwnProperty.call(counts, bucket)) {
      counts[bucket] += 1;
    }
  }

  pushText("userPersona", profile.chatPersonaPrompt || profile.personaPrompt || "", "用户人设");

  contacts.forEach((contact) => {
    const contactName = String(contact.name || "未命名角色").trim() || "未命名角色";
    pushText("rolePersona", contact.personaPrompt, `角色人设 · ${contactName}`);
    pushText("specialUserPersona", contact.specialUserPersona, `用户特别人设 · ${contactName}`);
  });

  normalizeObjectArray(worldbooks.categories).forEach((category) => {
    const categoryName = String(category.name || "未分类").trim() || "未分类";
    pushText("worldbook", category.name, `世界书分类 · ${categoryName}`);
  });
  normalizeObjectArray(worldbooks.entries).forEach((entry) => {
    const entryName = String(entry.name || "未命名世界书").trim() || "未命名世界书";
    pushText("worldbook", entry.name, `世界书标题 · ${entryName}`);
    pushText("worldbook", entry.text, `世界书正文 · ${entryName}`);
  });

  pushText("forum", settings.worldview, "论坛设置 · 世界观");
  normalizeObjectArray(settings.customTabs).forEach((tab) => {
    const tabName = String(tab.name || "未命名页签").trim() || "未命名页签";
    pushText("forum", tab.name, `论坛页签 · ${tabName} · 名称`);
    pushText("forum", tab.audience, `论坛页签 · ${tabName} · 用户定位`);
    pushText("forum", tab.discussionText || tab.text, `论坛页签 · ${tabName} · 页签文本`);
    pushText("forum", tab.hotTopic, `论坛页签 · ${tabName} · 页签热点`);
  });

  return { texts, counts };
}

function summarizePrivacyCandidateSources(sources = []) {
  const normalized = normalizePrivacyAllowlist(sources);
  if (normalized.length <= 3) {
    return normalized.join(" · ");
  }
  return `${normalized.slice(0, 3).join(" · ")} · +${normalized.length - 3}`;
}

function buildPrivacyScanCandidates(texts = []) {
  const allowlistTerms = homeState.privacyAllowlistItems.map((item) => item.text);
  const pendingTerms = new Set(homeState.privacyPendingCandidates.map((item) => item.text));
  const scannedEntries = window.PulsePrivacyCover?.scanTerms
    ? window.PulsePrivacyCover.scanTerms(texts)
    : [];
  return normalizePrivacyPendingCandidates(
    scannedEntries
      .filter((entry) => {
        const text = String(entry?.text || "").trim();
        return (
          text &&
          !allowlistTerms.includes(text) &&
          !pendingTerms.has(text)
        );
      })
      .map((entry) => ({
        id: buildPrivacyItemId(entry?.text || "", "privacy_pending"),
        text: String(entry?.text || "").trim(),
        category: String(entry?.category || "TERM").trim() || "TERM",
        sources: normalizePrivacyAllowlist(entry?.sources || []),
        sample: String(entry?.sample || "").trim(),
        selected: true
      })),
    allowlistTerms
  );
}

function renderPrivacyAllowlistSummary() {
  if (!privacyAppWhitelistSummaryEl) {
    return;
  }
  const items = syncPrivacyAllowlistItemsFromStorage();
  const total = items.length;
  const manualCount = items.filter((item) => item.source === "manual").length;
  const scanCount = total - manualCount;
  privacyAppWhitelistSummaryEl.textContent = total
    ? `共 ${total} 个白名单词条，其中手动 ${manualCount} 个、扫描确认 ${scanCount} 个；直接修改输入框会自动生效。`
    : "当前还没有白名单词条。点击右上角新增，或先扫描配置后确认加入。";
}

function renderPrivacyAllowlistItems() {
  if (!privacyAppWhitelistListEl) {
    return;
  }
  const items = syncPrivacyAllowlistItemsFromStorage();
  if (!items.length) {
    privacyAppWhitelistListEl.innerHTML =
      '<div class="privacy-app__empty">当前还没有白名单词条。你可以先手动新增，或先扫描当前配置。</div>';
    renderPrivacyAllowlistSummary();
    return;
  }

  privacyAppWhitelistListEl.innerHTML = items
    .map(
      (item) => `
        <section class="home-transfer-group privacy-app-item${
          item.source === "manual" ? " privacy-app-item--manual" : ""
        }">
          <div class="privacy-app-item__head">
            <div class="privacy-app-item__meta">
              <span class="home-badge">${escapeHtml(item.source === "manual" ? "手动" : "扫描确认")}</span>
            </div>
            <button
              class="home-chip home-chip--danger"
              type="button"
              data-action="remove-privacy-allowlist-item"
              data-item-id="${escapeHtml(item.id)}"
            >
              删除
            </button>
          </div>
          <div class="privacy-app-item__editor">
            <input
              class="privacy-app-item__input"
              type="text"
              value="${escapeHtml(item.text)}"
              data-role="privacy-allowlist-text"
              data-item-id="${escapeHtml(item.id)}"
              placeholder="输入白名单词条"
            />
            <p class="privacy-app-item__hint">
              ${escapeHtml(
                item.source === "manual"
                  ? "这是手动加入的词条，会在扫描预览中高亮区分。"
                  : "这是从扫描候选确认加入的词条。"
              )}
            </p>
          </div>
        </section>
      `
    )
    .join("");

  renderPrivacyAllowlistSummary();
}

function renderPrivacyPendingSummary() {
  if (!privacyAppPendingSummaryEl) {
    return;
  }
  const total = homeState.privacyPendingCandidates.length;
  privacyAppPendingSummaryEl.textContent = total
    ? `当前有 ${total} 个待确认候选词；每条都可以直接加入白名单或删除，确认后会立刻从这里移除。`
    : "当前没有待确认候选词；点击上方按钮可重新扫描当前配置。";
}

function renderPrivacyPendingCandidates() {
  if (!privacyAppPendingListEl) {
    return;
  }
  if (!homeState.privacyPendingCandidates.length) {
    privacyAppPendingListEl.innerHTML =
      '<div class="privacy-app__empty">当前没有待确认扫描候选。重新扫描时，已在白名单里的词会自动跳过。</div>';
    renderPrivacyPendingSummary();
    return;
  }

  privacyAppPendingListEl.innerHTML = homeState.privacyPendingCandidates
    .map(
      (item) => `
        <section class="home-transfer-group privacy-app-item">
          <div class="privacy-app-item__head">
            <div class="home-transfer-group__meta">
              <span>${escapeHtml(item.text)}</span>
              <span class="home-transfer-group__desc">${escapeHtml(
                summarizePrivacyCandidateSources(item.sources)
              )}</span>
            </div>
            <div class="privacy-app-item__actions">
              <button
                class="home-chip"
                type="button"
                data-action="confirm-privacy-pending-item"
                data-item-id="${escapeHtml(item.id)}"
              >
                加入白名单
              </button>
              <button
                class="home-chip home-chip--danger"
                type="button"
                data-action="remove-privacy-pending-item"
                data-item-id="${escapeHtml(item.id)}"
              >
                删除
              </button>
            </div>
          </div>
          <div class="privacy-app-item__editor">
            <input
              class="privacy-app-item__input"
              type="text"
              value="${escapeHtml(item.text)}"
              data-role="privacy-pending-text"
              data-item-id="${escapeHtml(item.id)}"
              placeholder="可直接编辑待确认词条"
            />
            <div class="privacy-app-item__meta">
              <span class="home-badge">${escapeHtml(item.category)}</span>
              <span class="home-field-hint">来源：${escapeHtml(item.sources.join(" · ")) || "未记录"}</span>
            </div>
            <p class="privacy-app-item__hint">样例：${escapeHtml(item.sample || "未记录")}</p>
          </div>
        </section>
      `
    )
    .join("");
  renderPrivacyPendingSummary();
}

function renderPrivacyApp() {
  renderPrivacyAllowlistItems();
  renderPrivacyPendingCandidates();
}

function setPrivacyAppAddModalOpen(isOpen) {
  homeState.privacyAddModalOpen = Boolean(isOpen);
  if (!privacyAppAddModalEl) {
    return;
  }
  if (homeState.privacyAddModalOpen) {
    showHomeLayer(privacyAppAddModalEl, "grid");
    window.setTimeout(() => {
      privacyAppAddTextareaEl?.focus();
    }, 0);
  } else {
    hideHomeLayer(privacyAppAddModalEl);
    if (privacyAppAddTextareaEl) {
      privacyAppAddTextareaEl.value = "";
    }
  }
  refreshBodyModalState();
}

function addPrivacyAllowlistItemsByLines(value, source = "manual") {
  const nextItems = normalizePrivacyAllowlistItems([
    ...homeState.privacyAllowlistItems,
    ...normalizePrivacyAllowlist(value).map((text) => ({
      text,
      source
    }))
  ]);
  persistPrivacyAllowlistItems(nextItems);
  renderPrivacyApp();
}

function applyPrivacyPendingCandidates() {
  const selectedCandidates = homeState.privacyPendingCandidates
    .filter((item) => item.selected)
    .map((item) => ({
      text: String(item.text || "").trim(),
      source: "scan"
    }))
    .filter((item) => item.text);

  if (!selectedCandidates.length) {
    setPrivacyAppStatus("请至少勾选一个非空的候选词。", "error");
    return;
  }

  addPrivacyAllowlistItemsByLines(selectedCandidates.map((item) => item.text), "scan");
  const selectedTexts = new Set(selectedCandidates.map((item) => item.text));
  homeState.privacyPendingCandidates = homeState.privacyPendingCandidates.filter(
    (item) => !selectedTexts.has(String(item.text || "").trim())
  );
  persistPrivacyPendingCandidates(
    homeState.privacyPendingCandidates,
    homeState.privacyAllowlistItems.map((item) => item.text)
  );
  renderPrivacyApp();
  setPrivacyAppStatus(`已确认 ${selectedCandidates.length} 个候选词，已加入白名单。`, "success");
}

function scanCurrentPrivacyAllowlistCandidates() {
  const { texts, counts } = collectPrivacyScanTexts();
  if (!texts.length) {
    renderPrivacyPendingCandidates();
    setPrivacyAppStatus("当前没有可扫描的人设、世界书或论坛文本。", "error");
    return;
  }

  const nextCandidates = buildPrivacyScanCandidates(texts);
  if (!nextCandidates.length) {
    renderPrivacyPendingCandidates();
    setPrivacyAppStatus("扫描完成，但没有新的候选词进入待确认区。", "");
    return;
  }

  homeState.privacyPendingCandidates = normalizePrivacyPendingCandidates(
    [...homeState.privacyPendingCandidates, ...nextCandidates],
    homeState.privacyAllowlistItems.map((item) => item.text)
  );
  persistPrivacyPendingCandidates(
    homeState.privacyPendingCandidates,
    homeState.privacyAllowlistItems.map((item) => item.text)
  );
  renderPrivacyPendingCandidates();

  const sourceCount =
    counts.rolePersona +
    counts.userPersona +
    counts.specialUserPersona +
    counts.worldbook +
    counts.forum;
  setPrivacyAppStatus(
    `已扫描 ${sourceCount} 段配置文本，新增 ${nextCandidates.length} 个候选词到待确认区。`,
    "success"
  );
}

function removePrivacyAllowlistItem(itemId) {
  homeState.privacyAllowlistItems = homeState.privacyAllowlistItems.filter((item) => item.id !== itemId);
  persistPrivacyAllowlistItems(homeState.privacyAllowlistItems);
  renderPrivacyApp();
  setPrivacyAppStatus("已从白名单中删除该词条。", "success");
}

function removePrivacyPendingItem(itemId) {
  homeState.privacyPendingCandidates = homeState.privacyPendingCandidates.filter(
    (item) => item.id !== itemId
  );
  persistPrivacyPendingCandidates(
    homeState.privacyPendingCandidates,
    homeState.privacyAllowlistItems.map((item) => item.text)
  );
  renderPrivacyPendingCandidates();
}

function confirmPrivacyPendingItem(itemId) {
  const targetItem =
    homeState.privacyPendingCandidates.find((item) => item.id === itemId) || null;
  const nextText = String(targetItem?.text || "").trim();
  if (!nextText) {
    setPrivacyAppStatus("这个候选词为空，无法加入白名单。", "error");
    return;
  }

  homeState.privacyPendingCandidates = homeState.privacyPendingCandidates.filter(
    (item) => item.id !== itemId
  );
  addPrivacyAllowlistItemsByLines([nextText], "scan");
  persistPrivacyPendingCandidates(
    homeState.privacyPendingCandidates,
    homeState.privacyAllowlistItems.map((item) => item.text)
  );
  renderPrivacyApp();
  setPrivacyAppStatus(`已将“${nextText}”加入白名单。`, "success");
}

function handlePrivacyAllowlistInput(event) {
  const target = event.target;
  if (!(target instanceof HTMLInputElement) || target.dataset.role !== "privacy-allowlist-text") {
    return;
  }
  const itemId = String(target.dataset.itemId || "").trim();
  if (!itemId) {
    return;
  }
  homeState.privacyAllowlistItems = homeState.privacyAllowlistItems.map((item) =>
    item.id === itemId ? { ...item, text: String(target.value || "") } : item
  );
  persistPrivacyAllowlistItems(homeState.privacyAllowlistItems);
}

function handlePrivacyAllowlistChange(event) {
  const target = event.target;
  if (!(target instanceof HTMLInputElement) || target.dataset.role !== "privacy-allowlist-text") {
    return;
  }
  persistPrivacyAllowlistItems(homeState.privacyAllowlistItems);
  renderPrivacyApp();
  setPrivacyAppStatus("白名单修改已生效。", "success");
}

function handlePrivacyPendingChange(event) {
  const target = event.target;
  if (!(target instanceof HTMLInputElement)) {
    return;
  }
  const itemId = String(target.dataset.itemId || "").trim();
  if (!itemId) {
    return;
  }

  if (target.dataset.role === "privacy-pending-select") {
    if (event.type !== "change") {
      return;
    }
    homeState.privacyPendingCandidates = homeState.privacyPendingCandidates.map((item) =>
      item.id === itemId ? { ...item, selected: target.checked } : item
    );
    persistPrivacyPendingCandidates(
      homeState.privacyPendingCandidates,
      homeState.privacyAllowlistItems.map((item) => item.text)
    );
    renderPrivacyPendingCandidates();
    return;
  }

  if (target.dataset.role === "privacy-pending-text") {
    homeState.privacyPendingCandidates = homeState.privacyPendingCandidates.map((item) =>
      item.id === itemId ? { ...item, text: String(target.value || "") } : item
    );
    persistPrivacyPendingCandidates(
      homeState.privacyPendingCandidates,
      homeState.privacyAllowlistItems.map((item) => item.text)
    );
    if (event.type === "change") {
      renderPrivacyPendingCandidates();
    }
  }
}

function handlePrivacyAppClick(event) {
  const target = event.target;
  if (!(target instanceof HTMLElement)) {
    return;
  }
  const actionEl = target.closest("[data-action]");
  if (!(actionEl instanceof HTMLElement)) {
    return;
  }
  const itemId = String(actionEl.dataset.itemId || "").trim();
  if (!itemId) {
    return;
  }
  if (actionEl.dataset.action === "remove-privacy-allowlist-item") {
    removePrivacyAllowlistItem(itemId);
  } else if (actionEl.dataset.action === "confirm-privacy-pending-item") {
    confirmPrivacyPendingItem(itemId);
  } else if (actionEl.dataset.action === "remove-privacy-pending-item") {
    removePrivacyPendingItem(itemId);
  }
}

function initPrivacyAppState() {
  homeState.settings = loadSettings({ forceActiveConfig: false });
  homeState.privacyAllowlistItems = loadPrivacyAllowlistItems();
  homeState.privacyPendingCandidates = loadPrivacyPendingCandidates(
    homeState.privacyAllowlistItems.map((item) => item.text)
  );
}

function setPrivacyAppVisible(isVisible) {
  if (isVisible) {
    hideHomeLayer(homeSceneEl);
    showHomeLayer(privacyAppScreenEl);
    return;
  }
  showHomeLayer(homeSceneEl);
  hideHomeLayer(privacyAppScreenEl);
}

function resolveLegacyImportedConfigPayload(parsed) {
  if (!parsed || typeof parsed !== "object") {
    throw new Error("导入文件不是有效的 JSON 对象。");
  }

  const source =
    parsed.schema === CONFIG_EXPORT_SCHEMA && parsed.data && typeof parsed.data === "object"
      ? parsed.data
      : parsed;
  const forumSource =
    source.forum && typeof source.forum === "object" ? source.forum : source;

  if (
    !(
      source.settings ||
      forumSource.feeds ||
      forumSource.profile ||
      forumSource.profilePosts ||
      forumSource.discussions ||
      Object.prototype.hasOwnProperty.call(source, "lastRefreshAt") ||
      Object.prototype.hasOwnProperty.call(forumSource, "lastRefreshAt")
    )
  ) {
    throw new Error("导入文件中没有识别到可恢复的配置内容。");
  }

  return {
    settings: source.settings,
    feeds: forumSource.feeds,
    profile: forumSource.profile,
    profilePosts: forumSource.profilePosts,
    discussions: forumSource.discussions,
    hasLastRefreshAt:
      Object.prototype.hasOwnProperty.call(source, "lastRefreshAt") ||
      Object.prototype.hasOwnProperty.call(forumSource, "lastRefreshAt") ||
      Object.prototype.hasOwnProperty.call(source, "refresh") ||
      Object.prototype.hasOwnProperty.call(forumSource, "refresh"),
    lastRefreshAt:
      source.lastRefreshAt ??
      forumSource.lastRefreshAt ??
      source.refresh ??
      forumSource.refresh ??
      ""
  };
}

function normalizeTransferPayload(parsed) {
  if (!parsed || typeof parsed !== "object") {
    throw new Error("导入文件不是有效的 JSON 对象。");
  }

  if (parsed.schema === CONFIG_EXPORT_SCHEMA && Number(parsed.version) >= 3) {
    const source = parsed.data && typeof parsed.data === "object" ? parsed.data : parsed;
    return {
      apiConfig:
        source.apiConfig && typeof source.apiConfig === "object" ? source.apiConfig : null,
      apiSecrets:
        source.apiSecrets && typeof source.apiSecrets === "object" ? source.apiSecrets : null,
      forum: source.forum && typeof source.forum === "object" ? source.forum : null,
      forumProfile:
        source.forumProfile && typeof source.forumProfile === "object" ? source.forumProfile : null,
      chatPersona:
        source.chatPersona && typeof source.chatPersona === "object" ? source.chatPersona : null,
      worldbooks:
        source.worldbooks && typeof source.worldbooks === "object" ? source.worldbooks : null,
      contacts: source.contacts && typeof source.contacts === "object" ? source.contacts : null,
      schedules: source.schedules && typeof source.schedules === "object" ? source.schedules : null,
      privacyAllowlist: normalizePrivacyAllowlist(source.privacyAllowlist || []),
      contactChatSettings:
        source.contactChatSettings && typeof source.contactChatSettings === "object"
          ? source.contactChatSettings
          : null,
      bubbleMountSettings:
        source.bubbleMountSettings && typeof source.bubbleMountSettings === "object"
          ? source.bubbleMountSettings
          : null
    };
  }

  const legacy = resolveLegacyImportedConfigPayload(parsed);
  const settings =
    legacy.settings && typeof legacy.settings === "object"
      ? buildNormalizedSettingsSnapshot(legacy.settings, { forceActiveConfig: false })
      : null;
  const profile = legacy.profile && typeof legacy.profile === "object" ? legacy.profile : {};
  return {
    apiConfig: settings
      ? {
          current: {
            mode: settings.mode,
            endpoint: settings.endpoint,
            model: settings.model,
            activeApiConfigId: settings.activeApiConfigId || "",
            translationApiEnabled: Boolean(settings.translationApiEnabled),
            translationApiConfigId: settings.translationApiConfigId || "",
            summaryApiEnabled: Boolean(settings.summaryApiEnabled),
            summaryApiConfigId: settings.summaryApiConfigId || ""
          },
          apiConfigs: normalizeApiConfigs(settings.apiConfigs || []).map(({ token, ...rest }) => ({
            ...rest
          }))
        }
      : null,
    apiSecrets: settings
      ? {
          currentToken: normalizeApiConfigToken(settings.token),
          apiConfigs: normalizeApiConfigs(settings.apiConfigs || [])
            .filter((item) => item.token)
            .map((item) => ({ id: item.id, token: normalizeApiConfigToken(item.token) }))
        }
      : null,
    forum: settings
      ? {
          baseSettings: {
            worldview: String(settings.worldview || "").trim(),
            homeCount: Number(settings.homeCount) || "",
            replyCount: Number(settings.replyCount) || "",
            temperature: Number.isFinite(Number(settings.temperature))
              ? Number(settings.temperature)
              : ""
          },
          customTabs: normalizeObjectArray(settings.customTabs)
        }
      : null,
    forumProfile: hasAnyTextValue(pickForumProfilePayload(profile))
      ? pickForumProfilePayload(profile)
      : null,
    chatPersona: hasAnyTextValue(pickChatProfilePayload(profile))
      ? pickChatProfilePayload(profile)
      : null,
    worldbooks: parsed.worldbooks && typeof parsed.worldbooks === "object" ? parsed.worldbooks : null,
    contacts: parsed.contacts && typeof parsed.contacts === "object" ? parsed.contacts : null,
    schedules: parsed.schedules && typeof parsed.schedules === "object" ? parsed.schedules : null,
    privacyAllowlist: normalizePrivacyAllowlist(parsed.privacyAllowlist || []),
    contactChatSettings:
      settings?.messagePromptSettings && typeof settings.messagePromptSettings === "object"
        ? { ...settings.messagePromptSettings }
        : null,
    bubbleMountSettings:
      settings?.bubblePromptSettings && typeof settings.bubblePromptSettings === "object"
        ? { ...settings.bubblePromptSettings }
        : null
  };
}

function buildTransferSections(payload, options = {}) {
  const mode = options.mode || "export";
  const forumTabs = normalizeObjectArray(payload?.forum?.customTabs);
  const worldbookEntries = normalizeObjectArray(payload?.worldbooks?.entries).filter(
    (item) => String(item.name || "").trim()
  );
  const contacts = normalizeObjectArray(payload?.contacts?.contacts).filter((item) =>
    String(item.name || "").trim()
  );
  const scheduleEntries = normalizeObjectArray(payload?.schedules?.entries).filter(
    (item) => String(item.title || "").trim() && String(item.date || "").trim()
  );
  const privacyAllowlist = normalizePrivacyAllowlist(payload?.privacyAllowlist || []);
  const hasApiSecrets = Boolean(
    payload?.apiSecrets &&
      (String(payload.apiSecrets.currentToken || "").trim() ||
        normalizeObjectArray(payload.apiSecrets.apiConfigs).some((item) =>
          String(item.token || "").trim()
        ))
  );

  const sections = [
    {
      id: "apiConfig",
      label: "API 配置",
      description: "当前接口类型、地址、模型、翻译专用指向与缓存预设（不含密钥）。",
      checked: Boolean(payload?.apiConfig),
      disabled: !payload?.apiConfig,
      items: []
    },
    {
      id: "apiSecrets",
      label: "已缓存的 API 密钥",
      description: "当前 API Key / Token 与缓存预设内的密钥字段。",
      checked: hasApiSecrets,
      disabled: !hasApiSecrets,
      items: []
    },
    {
      id: "forum",
      label: "论坛设置",
      description: "内容生成配置、自定义页签，以及页签内的时间感知 / 世界书 / Bubble / INS 挂载设置。",
      checked: Boolean(payload?.forum),
      disabled: !payload?.forum,
      items: [
        ...(payload?.forum
          ? [
              {
                id: TRANSFER_FORUM_BASE_ITEM_ID,
                label: "内容生成配置",
                description: truncateText(
                  String(payload.forum.baseSettings?.worldview || "").trim() ||
                    "论坛世界观、首页数量、回复数量与温度参数。",
                  80
                ),
                checked: true
              }
            ]
          : []),
        ...forumTabs.map((tab) => ({
          id: String(tab.id || "").trim(),
          label: String(tab.name || "自定义页签").trim() || "自定义页签",
          description: truncateText(
            String(tab.hotTopic || tab.discussionText || tab.audience || "尚未填写内容"),
            80
          ),
          checked: true
        }))
      ]
    },
    {
      id: "forumProfile",
      label: "论坛个人主页信息",
      description: "用户名、头像、横幅、签名与粉丝数据显示。",
      checked: Boolean(payload?.forumProfile && hasAnyTextValue(payload.forumProfile)),
      disabled: !(payload?.forumProfile && hasAnyTextValue(payload.forumProfile)),
      items: []
    },
    {
      id: "chatPersona",
      label: "Chat 用户资料",
      description: "Chat / Bubble 共用的昵称、头像、微信号与人设 prompt。",
      checked: Boolean(payload?.chatPersona && hasAnyTextValue(payload.chatPersona)),
      disabled: !(payload?.chatPersona && hasAnyTextValue(payload.chatPersona)),
      items: []
    },
    {
      id: "worldbooks",
      label: "世界书",
      description: "支持按条选择；分类会随所选世界书一起带出。",
      checked: worldbookEntries.length > 0,
      disabled: worldbookEntries.length === 0,
      items: worldbookEntries.map((entry) => ({
        id: String(entry.id || "").trim(),
        label: String(entry.name || "世界书").trim() || "世界书",
        description: truncateText(String(entry.text || "").trim(), 80),
        checked: true
      }))
    },
    {
      id: "contacts",
      label: "通讯录",
      description: "支持按联系人局部导入导出；包含头像、人设、用户特别人设与察觉设置。",
      checked: contacts.length > 0,
      disabled: contacts.length === 0,
      items: contacts.map((contact) => ({
        id: String(contact.id || "").trim(),
        label: String(contact.name || "联系人").trim() || "联系人",
        description: truncateText(
          [
            String(contact.personaPrompt || "").trim(),
            String(contact.specialUserPersona || "").trim(),
            String(contact.awarenessText || "").trim()
          ]
            .filter(Boolean)
            .join(" · ") || "未设置人设。",
          80
        ),
        checked: true
      }))
    },
    {
      id: "schedules",
      label: "日程",
      description: "支持按日程局部导入导出；包含用户 / 角色日程、可见范围与同行人信息。",
      checked: scheduleEntries.length > 0,
      disabled: scheduleEntries.length === 0,
      items: scheduleEntries.map((entry) => ({
        id: String(entry.id || "").trim(),
        label: buildScheduleTransferLabel(entry),
        description: buildScheduleTransferDescription(entry),
        checked: true
      }))
    },
    {
      id: "privacyAllowlist",
      label: "隐私白名单",
      description: "首页设置里手动补充的强制匿名化名单；代码内的默认白名单不在这里导出。",
      checked: privacyAllowlist.length > 0,
      disabled: privacyAllowlist.length === 0,
      items: []
    },
    {
      id: "contactChatSettings",
      label: "通讯录对应的聊天设置",
      description: "1v1 聊天页右上角设置内的历史轮数、时间感知、热点挂载与世界书挂载。",
      checked: Boolean(
        payload?.contactChatSettings && typeof payload.contactChatSettings === "object"
      ),
      disabled: !(payload?.contactChatSettings && typeof payload.contactChatSettings === "object"),
      items: []
    },
    {
      id: "bubbleMountSettings",
      label: "Bubble 挂载设置",
      description: "Bubble 的论坛热点挂载与世界书挂载设置。",
      checked: Boolean(payload?.bubbleMountSettings && typeof payload.bubbleMountSettings === "object"),
      disabled: !(payload?.bubbleMountSettings && typeof payload.bubbleMountSettings === "object"),
      items: []
    }
  ];

  return sections.filter((section) => mode === "export" || !section.disabled);
}

function cloneTransferSections(sections = []) {
  return sections.map((section) => ({
    ...section,
    items: Array.isArray(section.items) ? section.items.map((item) => ({ ...item })) : []
  }));
}

function getTransferSection(selection, sectionId) {
  return selection.find((section) => section.id === sectionId) || null;
}

function setTransferSectionChecked(section, checked) {
  if (!section || section.disabled) {
    return;
  }
  section.checked = Boolean(checked);
  if (section.items.length) {
    section.items = section.items.map((item) => ({ ...item, checked: Boolean(checked) }));
  }
}

function toggleTransferItemSelection(selection, sectionId, itemId, checked) {
  const section = getTransferSection(selection, sectionId);
  if (!section || section.disabled) {
    return;
  }
  section.items = section.items.map((item) =>
    item.id === itemId ? { ...item, checked: Boolean(checked) } : item
  );
  section.checked = section.items.some((item) => item.checked);
}

function setAllTransferSections(selection, checked) {
  selection.forEach((section) => {
    setTransferSectionChecked(section, checked);
  });
}

function buildTransferGroupCountText(section) {
  if (!section.items.length) {
    return section.disabled ? "当前没有可选内容" : "当前项可整体导入 / 导出";
  }
  const selectedCount = section.items.filter((item) => item.checked).length;
  return `已选择 ${selectedCount} / ${section.items.length}`;
}

function renderTransferSelection(containerEl, selection, scope) {
  if (!containerEl) {
    return;
  }
  if (!selection.length) {
    containerEl.innerHTML = '<div class="home-empty-state">当前没有可选配置。</div>';
    return;
  }

  containerEl.innerHTML = selection
    .map((section) => {
      const groupId = `${scope}-${section.id}`;
      return `
        <section class="home-transfer-group${section.disabled ? " is-disabled" : ""}">
          <div class="home-transfer-group__top">
            <label class="home-transfer-group__label">
              <input
                type="checkbox"
                data-scope="${escapeHtml(scope)}"
                data-role="section"
                data-section-id="${escapeHtml(section.id)}"
                ${section.checked ? "checked" : ""}
                ${section.disabled ? "disabled" : ""}
              />
              <span class="home-transfer-group__meta">
                <span>${escapeHtml(section.label)}</span>
                <span class="home-transfer-group__desc">${escapeHtml(section.description)}</span>
              </span>
            </label>
            <p class="home-transfer-group__count" data-count-for="${escapeHtml(groupId)}">${escapeHtml(
              buildTransferGroupCountText(section)
            )}</p>
          </div>
          ${
            section.items.length
              ? `
                <div class="home-transfer-group__items">
                  ${section.items
                    .map(
                      (item) => `
                        <label class="home-transfer-item">
                          <input
                            type="checkbox"
                            data-scope="${escapeHtml(scope)}"
                            data-role="item"
                            data-section-id="${escapeHtml(section.id)}"
                            data-item-id="${escapeHtml(item.id)}"
                            ${item.checked ? "checked" : ""}
                            ${section.disabled ? "disabled" : ""}
                          />
                          <span class="home-transfer-item__meta">
                            <span class="home-transfer-item__title">${escapeHtml(item.label)}</span>
                            <span class="home-transfer-item__desc">${escapeHtml(item.description || "")}</span>
                          </span>
                        </label>
                      `
                    )
                    .join("")}
                </div>
              `
              : ""
          }
        </section>
      `;
    })
    .join("");

  selection.forEach((section) => {
    if (!section.items.length) {
      return;
    }
    const input = containerEl.querySelector(
      `input[data-role="section"][data-section-id="${section.id}"]`
    );
    if (!(input instanceof HTMLInputElement)) {
      return;
    }
    const checkedCount = section.items.filter((item) => item.checked).length;
    input.indeterminate = checkedCount > 0 && checkedCount < section.items.length;
  });
}

function refreshHomeTransferExportSelection() {
  const currentPayload = buildTransferPayloadFromCurrentState();
  homeState.exportTransferSelection = buildTransferSections(currentPayload, { mode: "export" });
  renderTransferSelection(homeTransferExportOptionsEl, homeState.exportTransferSelection, "export");
  renderHomeExportReviewSummary();
}

function renderHomeExportReviewSummary() {
  if (!homeExportReviewSummaryEl) {
    return;
  }
  const sectionCount = homeState.exportTransferSelection.filter((section) => section.checked).length;
  const itemCount = homeState.exportTransferSelection.reduce((total, section) => {
    if (!section.checked) {
      return total;
    }
    if (!section.items.length) {
      return total + 1;
    }
    return total + section.items.filter((item) => item.checked).length;
  }, 0);
  homeExportReviewSummaryEl.textContent = `已选择 ${sectionCount} 个分组、${itemCount} 项内容；确认后将写入本次导出的 JSON。`;
}

function setHomeExportReviewOpen(isOpen) {
  if (!homeExportReviewEl) {
    return;
  }
  homeExportReviewEl.hidden = !isOpen;
  if (isOpen) {
    renderHomeExportReviewSummary();
  }
}

function setHomeImportReviewOpen(isOpen) {
  if (!homeImportReviewEl) {
    return;
  }
  homeImportReviewEl.hidden = !isOpen;
  if (!isOpen) {
    homeState.pendingImportTransferPayload = null;
    homeState.importTransferSelection = [];
    if (homeImportReviewOptionsEl) {
      homeImportReviewOptionsEl.innerHTML = "";
    }
  }
}

function renderHomeImportReview(filename = "") {
  if (!homeState.pendingImportTransferPayload) {
    setHomeImportReviewOpen(false);
    return;
  }
  homeState.importTransferSelection = buildTransferSections(homeState.pendingImportTransferPayload, {
    mode: "import"
  });
  if (!homeState.importTransferSelection.length) {
    throw new Error("导入文件里没有可恢复到当前版本的配置内容。");
  }
  if (homeImportReviewSummaryEl) {
    homeImportReviewSummaryEl.textContent = filename
      ? `已读取 ${filename}，请选择要恢复到本地的内容。`
      : "请选择要从当前 JSON 中恢复到本地的内容。";
  }
  renderTransferSelection(homeImportReviewOptionsEl, homeState.importTransferSelection, "import");
  setHomeImportReviewOpen(true);
}

function getSelectionStateByScope(scope) {
  return scope === "import" ? homeState.importTransferSelection : homeState.exportTransferSelection;
}

function buildSelectedTransferPayload(payload, selection) {
  const selected = {};
  const sectionMap = new Map(selection.map((section) => [section.id, section]));

  const apiConfigSection = sectionMap.get("apiConfig");
  if (apiConfigSection?.checked && payload.apiConfig) {
    selected.apiConfig = payload.apiConfig;
  }

  const apiSecretsSection = sectionMap.get("apiSecrets");
  if (apiSecretsSection?.checked && payload.apiSecrets) {
    selected.apiSecrets = payload.apiSecrets;
  }

  const forumSection = sectionMap.get("forum");
  if (forumSection?.checked && payload.forum) {
    const selectedIds = new Set(forumSection.items.filter((item) => item.checked).map((item) => item.id));
    const customTabs = normalizeObjectArray(payload.forum.customTabs).filter((tab) =>
      selectedIds.has(String(tab.id || "").trim())
    );
    const includeBaseSettings = selectedIds.has(TRANSFER_FORUM_BASE_ITEM_ID);
    if (includeBaseSettings || customTabs.length) {
      selected.forum = {
        baseSettings: includeBaseSettings ? payload.forum.baseSettings : null,
        customTabs
      };
    }
  }

  const forumProfileSection = sectionMap.get("forumProfile");
  if (forumProfileSection?.checked && payload.forumProfile) {
    selected.forumProfile = payload.forumProfile;
  }

  const chatPersonaSection = sectionMap.get("chatPersona");
  if (chatPersonaSection?.checked && payload.chatPersona) {
    selected.chatPersona = payload.chatPersona;
  }

  const worldbooksSection = sectionMap.get("worldbooks");
  if (worldbooksSection?.checked && payload.worldbooks) {
    const selectedIds = new Set(
      worldbooksSection.items.filter((item) => item.checked).map((item) => item.id)
    );
    const entries = normalizeObjectArray(payload.worldbooks.entries).filter((entry) =>
      selectedIds.has(String(entry.id || "").trim())
    );
    const referencedCategoryIds = new Set(
      entries.map((entry) => String(entry.categoryId || "").trim()).filter(Boolean)
    );
    selected.worldbooks = {
      categories: normalizeObjectArray(payload.worldbooks.categories).filter((category) =>
        referencedCategoryIds.has(String(category.id || "").trim())
      ),
      entries
    };
  }

  const contactsSection = sectionMap.get("contacts");
  if (contactsSection?.checked && payload.contacts) {
    const selectedIds = new Set(contactsSection.items.filter((item) => item.checked).map((item) => item.id));
    selected.contacts = {
      contacts: normalizeObjectArray(payload.contacts.contacts).filter((contact) =>
        selectedIds.has(String(contact.id || "").trim())
      )
    };
  }

  const schedulesSection = sectionMap.get("schedules");
  if (schedulesSection?.checked && payload.schedules) {
    const selectedIds = new Set(schedulesSection.items.filter((item) => item.checked).map((item) => item.id));
    selected.schedules = {
      entries: normalizeObjectArray(payload.schedules.entries).filter((entry) =>
        selectedIds.has(String(entry.id || "").trim())
      )
    };
  }

  const privacyAllowlistSection = sectionMap.get("privacyAllowlist");
  if (privacyAllowlistSection?.checked) {
    const terms = normalizePrivacyAllowlist(payload.privacyAllowlist || []);
    if (terms.length) {
      selected.privacyAllowlist = terms;
    }
  }

  const contactChatSettingsSection = sectionMap.get("contactChatSettings");
  if (contactChatSettingsSection?.checked && payload.contactChatSettings) {
    selected.contactChatSettings = payload.contactChatSettings;
  }

  const bubbleMountSettingsSection = sectionMap.get("bubbleMountSettings");
  if (bubbleMountSettingsSection?.checked && payload.bubbleMountSettings) {
    selected.bubbleMountSettings = payload.bubbleMountSettings;
  }

  return selected;
}

function buildHomeConfigExportPayload(selection = homeState.exportTransferSelection) {
  const fullPayload = buildTransferPayloadFromCurrentState();
  return {
    schema: CONFIG_EXPORT_SCHEMA,
    version: 7,
    exportedAt: new Date().toISOString(),
    data: buildSelectedTransferPayload(fullPayload, selection)
  };
}

function exportHomeConfig() {
  saveCurrentHomeSettings({ silent: true });
  const exportedAt = new Date();
  const payload = buildHomeConfigExportPayload(homeState.exportTransferSelection);
  if (!payload.data || !Object.keys(payload.data).length) {
    setHomeTransferStatus("请至少勾选一项后再导出。", "error");
    return false;
  }
  const filename = `pulse-generator-config-${exportedAt
    .toISOString()
    .replaceAll(":", "-")}.json`;
  downloadJsonFile(filename, payload);
  setHomeTransferStatus("已按所选范围导出配置 JSON。", "success");
  return true;
}

function mergeById(existing = [], incoming = []) {
  const merged = normalizeObjectArray(existing).map((item) => ({ ...item }));
  normalizeObjectArray(incoming).forEach((item) => {
    const id = String(item.id || "").trim();
    if (!id) {
      merged.push({ ...item });
      return;
    }
    const index = merged.findIndex((current) => String(current.id || "").trim() === id);
    if (index >= 0) {
      merged[index] = { ...merged[index], ...item };
    } else {
      merged.push({ ...item });
    }
  });
  return merged;
}

function mergeCustomTabs(existing = [], incoming = []) {
  const normalizedIncoming = normalizeObjectArray(incoming);
  const incomingIds = new Set(normalizedIncoming.map((item) => String(item.id || "").trim()));
  const preserved = normalizeObjectArray(existing).filter(
    (item) => !incomingIds.has(String(item.id || "").trim())
  );
  return [...normalizedIncoming, ...preserved].slice(0, 4);
}

function mergeWorldbooks(existing, incoming) {
  const current = existing && typeof existing === "object" ? existing : { categories: [], entries: [] };
  const nextEntries = mergeById(current.entries, incoming.entries);
  const nextCategories = mergeById(current.categories, incoming.categories);
  return {
    categories: nextCategories,
    entries: nextEntries
  };
}

function applyImportedConfig(payload, selection = homeState.importTransferSelection) {
  const imported = buildSelectedTransferPayload(payload, selection);
  if (!Object.keys(imported).length) {
    throw new Error("请至少勾选一项后再导入。");
  }

  let nextSettings = {
    ...loadSettings({ forceActiveConfig: false })
  };
  let nextProfile = {
    ...(readStoredJson(PROFILE_KEY, {}) || {})
  };
  let nextWorldbooks =
    readStoredJson(WORLD_BOOKS_KEY, {
      categories: [],
      entries: []
    }) || { categories: [], entries: [] };
  let nextContacts = normalizeObjectArray(readStoredJson(MESSAGE_CONTACTS_KEY, []));
  let nextSchedules = normalizeObjectArray(readStoredJson(SCHEDULE_ENTRIES_KEY, []));

  if (imported.apiConfig) {
    nextSettings.mode = normalizeApiMode(imported.apiConfig.current?.mode);
    nextSettings.endpoint = normalizeSettingsEndpointByMode(
      imported.apiConfig.current?.mode,
      imported.apiConfig.current?.endpoint
    );
    nextSettings.model =
      normalizeApiMode(imported.apiConfig.current?.mode) === "generic"
        ? ""
        : String(
            imported.apiConfig.current?.model || getDefaultModelByMode(imported.apiConfig.current?.mode)
          ).trim() || getDefaultModelByMode(imported.apiConfig.current?.mode);
    nextSettings.activeApiConfigId = String(imported.apiConfig.current?.activeApiConfigId || "").trim();
    nextSettings.translationApiEnabled = Boolean(imported.apiConfig.current?.translationApiEnabled);
    nextSettings.translationApiConfigId = String(
      imported.apiConfig.current?.translationApiConfigId || ""
    ).trim();
    nextSettings.summaryApiEnabled = Boolean(imported.apiConfig.current?.summaryApiEnabled);
    nextSettings.summaryApiConfigId = String(
      imported.apiConfig.current?.summaryApiConfigId || ""
    ).trim();
    nextSettings.token = "";
    nextSettings.apiConfigs = normalizeApiConfigs(
      normalizeObjectArray(imported.apiConfig.apiConfigs).map((item) => ({
        ...item,
        token: ""
      }))
    );
  }

  if (imported.apiSecrets) {
    if (typeof imported.apiSecrets.currentToken === "string") {
      nextSettings.token = normalizeApiConfigToken(imported.apiSecrets.currentToken);
    }
    const tokenMap = new Map(
      normalizeObjectArray(imported.apiSecrets.apiConfigs).map((item) => [
        String(item.id || "").trim(),
        normalizeApiConfigToken(item.token)
      ])
    );
    nextSettings.apiConfigs = normalizeApiConfigs(nextSettings.apiConfigs || []).map((item) => ({
      ...item,
      token: tokenMap.has(item.id) ? tokenMap.get(item.id) : normalizeApiConfigToken(item.token)
    }));
  }

  if (imported.forum) {
    if (imported.forum.baseSettings && typeof imported.forum.baseSettings === "object") {
      if (Object.prototype.hasOwnProperty.call(imported.forum.baseSettings, "worldview")) {
        nextSettings.worldview = String(imported.forum.baseSettings.worldview || "").trim();
      }
      if (Object.prototype.hasOwnProperty.call(imported.forum.baseSettings, "homeCount")) {
        nextSettings.homeCount = Number(imported.forum.baseSettings.homeCount) || nextSettings.homeCount;
      }
      if (Object.prototype.hasOwnProperty.call(imported.forum.baseSettings, "replyCount")) {
        nextSettings.replyCount =
          Number(imported.forum.baseSettings.replyCount) || nextSettings.replyCount;
      }
      if (Object.prototype.hasOwnProperty.call(imported.forum.baseSettings, "temperature")) {
        nextSettings.temperature =
          Number(imported.forum.baseSettings.temperature) || nextSettings.temperature;
      }
    }
    nextSettings.customTabs = mergeCustomTabs(nextSettings.customTabs, imported.forum.customTabs);
  }

  if (imported.forumProfile) {
    nextProfile = {
      ...nextProfile,
      ...pickForumProfilePayload(imported.forumProfile)
    };
  }

  if (imported.chatPersona) {
    const shouldInitializeChatProfile =
      nextProfile.chatProfileInitialized ||
      Object.prototype.hasOwnProperty.call(imported.chatPersona, "username") ||
      Object.prototype.hasOwnProperty.call(imported.chatPersona, "userId") ||
      Object.prototype.hasOwnProperty.call(imported.chatPersona, "avatarImage");
    nextProfile.chatProfileInitialized = Boolean(shouldInitializeChatProfile);
    if (Object.prototype.hasOwnProperty.call(imported.chatPersona, "username")) {
      nextProfile.chatUsername = String(imported.chatPersona.username || "").trim();
    }
    if (Object.prototype.hasOwnProperty.call(imported.chatPersona, "userId")) {
      nextProfile.chatUserId = String(imported.chatPersona.userId || "").trim();
    }
    if (Object.prototype.hasOwnProperty.call(imported.chatPersona, "avatarImage")) {
      nextProfile.chatAvatarImage = String(imported.chatPersona.avatarImage || "").trim();
    }
    if (Object.prototype.hasOwnProperty.call(imported.chatPersona, "personaPrompt")) {
      nextProfile.chatPersonaPrompt = String(imported.chatPersona.personaPrompt || "").trim();
    }
  }

  if (imported.worldbooks) {
    nextWorldbooks = mergeWorldbooks(nextWorldbooks, imported.worldbooks);
  }

  if (imported.contacts) {
    nextContacts = mergeById(nextContacts, imported.contacts.contacts);
  }

  if (imported.schedules) {
    nextSchedules = mergeById(nextSchedules, imported.schedules.entries);
  }

  if (Array.isArray(imported.privacyAllowlist) || typeof imported.privacyAllowlist === "string") {
    nextSettings.privacyAllowlist = normalizePrivacyAllowlist(imported.privacyAllowlist);
  }

  if (imported.contactChatSettings && typeof imported.contactChatSettings === "object") {
    nextSettings.messagePromptSettings = {
      ...imported.contactChatSettings
    };
  }

  if (imported.bubbleMountSettings && typeof imported.bubbleMountSettings === "object") {
    nextSettings.bubblePromptSettings = {
      ...imported.bubbleMountSettings
    };
  }

  nextSettings = buildNormalizedSettingsSnapshot(nextSettings, {
    forceActiveConfig: Boolean(imported.apiConfig || imported.apiSecrets)
  });

  safeSetItem(SETTINGS_KEY, JSON.stringify(nextSettings));
  safeSetItem(PROFILE_KEY, JSON.stringify(nextProfile));
  safeSetItem(WORLD_BOOKS_KEY, JSON.stringify(nextWorldbooks));
  safeSetItem(MESSAGE_CONTACTS_KEY, JSON.stringify(nextContacts));
  safeSetItem(SCHEDULE_ENTRIES_KEY, JSON.stringify(nextSchedules));

  homeState.settings = loadSettings();
  persistSettings(homeState.settings);
  applySettingsToHomeForm(homeState.settings);
  syncHomeActiveConfigSummary();
  refreshHomeTransferExportSelection();
  setHomeImportReviewOpen(false);
}

async function handleHomeConfigImport(file) {
  if (!file) {
    return;
  }

  try {
    setHomeExportReviewOpen(false);
    const text = await file.text();
    const parsed = JSON.parse(text);
    homeState.pendingImportTransferPayload = normalizeTransferPayload(parsed);
    renderHomeImportReview(file.name);
    setHomeTransferStatus("已读取导入文件，请确认要恢复的内容。", "");
  } catch (error) {
    setHomeImportReviewOpen(false);
    setHomeTransferStatus(`导入失败：${error?.message || "无法解析该 JSON 文件。"}`, "error");
  }
}

function updateHomeModeUI() {
  if (!homeApiModeSelect || !homeApiEndpointInput || !homeApiModelInput) {
    return;
  }

  const mode = normalizeApiMode(homeApiModeSelect.value);
  const modelField = homeApiModelInput.closest(".home-field");
  const needsModel = mode === "openai" || mode === "gemini";
  if (modelField) {
    modelField.style.display = needsModel ? "grid" : "none";
  }

  if (mode === "openai" && !homeApiEndpointInput.value.trim()) {
    homeApiEndpointInput.value = DEFAULT_OPENAI_ENDPOINT;
  }
  if (mode === "gemini" && !homeApiEndpointInput.value.trim()) {
    homeApiEndpointInput.value = DEFAULT_GEMINI_ENDPOINT;
  }
  if (needsModel && !homeApiModelInput.value.trim()) {
    homeApiModelInput.value = getDefaultModelByMode(mode);
  }
  homeApiModelInput.placeholder =
    mode === "gemini" ? DEFAULT_GEMINI_MODEL : DEFAULT_DEEPSEEK_MODEL;
}

function applySettingsToHomeForm(settings) {
  if (homeApiModeSelect) {
    homeApiModeSelect.value = normalizeApiMode(settings.mode);
  }
  if (homeApiEndpointInput) {
    homeApiEndpointInput.value = normalizeSettingsEndpointByMode(settings.mode, settings.endpoint);
  }
  if (homeApiTokenInput) {
    homeApiTokenInput.value = settings.token || "";
  }
  if (homeApiModelInput) {
    homeApiModelInput.value =
      normalizeApiMode(settings.mode) === "generic"
        ? ""
        : settings.model || getDefaultModelByMode(settings.mode);
  }
  updateHomeModeUI();
  renderHomeApiConfigList();
  syncHomeActiveConfigSummary();
}

function readHomeSettingsFromForm() {
  const mode = normalizeApiMode(homeApiModeSelect?.value);
  return {
    ...homeState.settings,
    mode,
    endpoint: normalizeSettingsEndpointByMode(mode, homeApiEndpointInput?.value),
    token: normalizeApiConfigToken(homeApiTokenInput?.value),
    model:
      mode === "generic"
        ? ""
        : String(homeApiModelInput?.value || "").trim() || getDefaultModelByMode(mode),
    privacyAllowlist: normalizePrivacyAllowlist(homeState.settings.privacyAllowlist || []),
    apiConfigs: normalizeApiConfigs(homeState.settings.apiConfigs)
  };
}

function saveCurrentHomeSettings(options = {}) {
  homeState.settings = readHomeSettingsFromForm();
  if (
    homeState.settings.activeApiConfigId &&
    !homeState.settings.apiConfigs.some((item) => item.id === homeState.settings.activeApiConfigId)
  ) {
    homeState.settings.activeApiConfigId = "";
  }
  if (
    homeState.settings.translationApiConfigId &&
    !homeState.settings.apiConfigs.some(
      (item) => item.id === homeState.settings.translationApiConfigId
    )
  ) {
    homeState.settings.translationApiConfigId = "";
    homeState.settings.translationApiEnabled = false;
  }
  if (
    homeState.settings.summaryApiConfigId &&
    !homeState.settings.apiConfigs.some((item) => item.id === homeState.settings.summaryApiConfigId)
  ) {
    homeState.settings.summaryApiConfigId = "";
    homeState.settings.summaryApiEnabled = false;
  }
  persistSettings(homeState.settings);
  renderHomeApiConfigList();
  syncHomeActiveConfigSummary();
  if (!options.silent) {
    setHomeApiConfigStatus("当前 API 参数已同步到本地缓存。", "success");
  }
}

function buildHomeApiConfigSnapshot() {
  const mode = normalizeApiMode(homeApiModeSelect?.value);
  return {
    mode,
    endpoint: normalizeSettingsEndpointByMode(mode, homeApiEndpointInput?.value),
    token: normalizeApiConfigToken(homeApiTokenInput?.value),
    model:
      mode === "generic"
        ? ""
        : String(homeApiModelInput?.value || "").trim() || getDefaultModelByMode(mode)
  };
}

function renderHomeTranslationApiControls() {
  if (!homeTranslationApiEnabledEl || !homeTranslationApiConfigSelectEl) {
    return;
  }

  const configs = normalizeApiConfigs(homeState.settings.apiConfigs)
    .slice()
    .sort((left, right) => (right.updatedAt || 0) - (left.updatedAt || 0));

  if (
    homeState.settings.translationApiConfigId &&
    !configs.some((item) => item.id === homeState.settings.translationApiConfigId)
  ) {
    homeState.settings.translationApiConfigId = "";
    homeState.settings.translationApiEnabled = false;
  }

  const hasConfigs = configs.length > 0;
  if (!hasConfigs) {
    homeState.settings.translationApiEnabled = false;
    homeState.settings.translationApiConfigId = "";
  }

  homeTranslationApiEnabledEl.checked = Boolean(
    homeState.settings.translationApiEnabled && hasConfigs
  );
  homeTranslationApiEnabledEl.disabled = !hasConfigs;
  homeTranslationApiConfigSelectEl.disabled =
    !hasConfigs || !homeTranslationApiEnabledEl.checked;
  homeTranslationApiConfigSelectEl.innerHTML = hasConfigs
    ? [
        '<option value="">请选择一套已缓存的 API 配置</option>',
        ...configs.map(
          (item) =>
            `<option value="${escapeHtml(item.id)}">${escapeHtml(item.name)} · ${escapeHtml(
              getApiModeLabel(item.mode)
            )}</option>`
        )
      ].join("")
    : '<option value="">暂无缓存配置</option>';
  homeTranslationApiConfigSelectEl.value = homeState.settings.translationApiConfigId || "";
}

function renderHomeSummaryApiControls() {
  if (!homeSummaryApiEnabledEl || !homeSummaryApiConfigSelectEl) {
    return;
  }

  const configs = normalizeApiConfigs(homeState.settings.apiConfigs)
    .slice()
    .sort((left, right) => (right.updatedAt || 0) - (left.updatedAt || 0));

  if (
    homeState.settings.summaryApiConfigId &&
    !configs.some((item) => item.id === homeState.settings.summaryApiConfigId)
  ) {
    homeState.settings.summaryApiConfigId = "";
    homeState.settings.summaryApiEnabled = false;
  }

  const hasConfigs = configs.length > 0;
  if (!hasConfigs) {
    homeState.settings.summaryApiEnabled = false;
    homeState.settings.summaryApiConfigId = "";
  }

  homeSummaryApiEnabledEl.checked = Boolean(homeState.settings.summaryApiEnabled && hasConfigs);
  homeSummaryApiEnabledEl.disabled = !hasConfigs;
  homeSummaryApiConfigSelectEl.disabled = !hasConfigs || !homeSummaryApiEnabledEl.checked;
  homeSummaryApiConfigSelectEl.innerHTML = hasConfigs
    ? [
        '<option value="">请选择一套已缓存的 API 配置</option>',
        ...configs.map(
          (item) =>
            `<option value="${escapeHtml(item.id)}">${escapeHtml(item.name)} · ${escapeHtml(
              getApiModeLabel(item.mode)
            )}</option>`
        )
      ].join("")
    : '<option value="">暂无缓存配置</option>';
  homeSummaryApiConfigSelectEl.value = homeState.settings.summaryApiConfigId || "";
}

function renderHomeApiConfigList() {
  if (!homeApiConfigListEl) {
    return;
  }

  homeState.settings.apiConfigs = normalizeApiConfigs(homeState.settings.apiConfigs);
  if (
    homeState.settings.activeApiConfigId &&
    !homeState.settings.apiConfigs.some((item) => item.id === homeState.settings.activeApiConfigId)
  ) {
    homeState.settings.activeApiConfigId = "";
  }

  if (!homeState.settings.apiConfigs.length) {
    homeApiConfigListEl.innerHTML =
      '<p class="home-empty-state">还没有缓存的 API 配置，可先填写参数后点击“保存当前 API 配置”。</p>';
    renderHomeTranslationApiControls();
    renderHomeSummaryApiControls();
    return;
  }

  homeApiConfigListEl.innerHTML = homeState.settings.apiConfigs
    .slice()
    .sort((left, right) => (right.updatedAt || 0) - (left.updatedAt || 0))
    .map((item) => {
      const isActive = item.id === homeState.settings.activeApiConfigId;
      const isTranslationSelected =
        homeState.settings.translationApiEnabled &&
        item.id === homeState.settings.translationApiConfigId;
      const isSummarySelected =
        homeState.settings.summaryApiEnabled && item.id === homeState.settings.summaryApiConfigId;
      const modelText = item.model ? `模型：${item.model}` : "模型：无";
      const tokenText = item.token ? "密钥：已保存" : "密钥：未保存";
      return `
        <article class="home-api-item${isActive ? " active" : ""}">
          <div class="home-api-item__head">
            <h3 class="home-api-item__title">${escapeHtml(item.name)}</h3>
            <div class="home-api-badges">
              <span class="home-badge">${isActive ? "当前配置" : "已缓存"}</span>
              ${isTranslationSelected ? '<span class="home-badge">翻译专用</span>' : ""}
              ${isSummarySelected ? '<span class="home-badge">总结专用</span>' : ""}
            </div>
          </div>
          <p class="home-api-item__meta">
            类型：${escapeHtml(getApiModeLabel(item.mode))}
            \n地址：${escapeHtml(item.endpoint || "未填写")}
            \n${escapeHtml(modelText)} · ${escapeHtml(tokenText)}
          </p>
          <div class="home-api-actions">
            <button class="home-chip" type="button" data-action="switch-home-api-config" data-config-id="${escapeHtml(
              item.id
            )}">一键切换</button>
            <button class="home-chip home-chip--danger" type="button" data-action="delete-home-api-config" data-config-id="${escapeHtml(
              item.id
            )}">删除</button>
          </div>
        </article>
      `;
    })
    .join("");

  renderHomeTranslationApiControls();
  renderHomeSummaryApiControls();
}

function saveCurrentHomeApiConfig() {
  const snapshot = buildHomeApiConfigSnapshot();
  if (!snapshot.endpoint) {
    setHomeApiConfigStatus("请先填写 API 地址后再保存配置。", "error");
    return;
  }

  homeState.settings = readHomeSettingsFromForm();
  homeState.settings.apiConfigs = normalizeApiConfigs(homeState.settings.apiConfigs);

  const customName = String(homeApiConfigNameInput?.value || "").trim();
  let targetConfig = null;

  if (customName) {
    targetConfig = homeState.settings.apiConfigs.find((item) => item.name === customName) || null;
  }
  if (!targetConfig && homeState.settings.activeApiConfigId) {
    targetConfig =
      homeState.settings.apiConfigs.find(
        (item) => item.id === homeState.settings.activeApiConfigId
      ) || null;
  }

  if (targetConfig) {
    targetConfig.name = customName || targetConfig.name;
    targetConfig.mode = snapshot.mode;
    targetConfig.endpoint = snapshot.endpoint;
    targetConfig.token = snapshot.token;
    targetConfig.model = snapshot.model;
    targetConfig.updatedAt = Date.now();
  } else {
    targetConfig = {
      id: `api_cfg_${Date.now()}_${hashText(`${customName}-${snapshot.endpoint}`)}`,
      name:
        customName ||
        `${getApiModeLabel(snapshot.mode)} ${formatDate(new Date())} ${formatTime(new Date())}`,
      ...snapshot,
      updatedAt: Date.now()
    };
    homeState.settings.apiConfigs = [targetConfig, ...homeState.settings.apiConfigs].slice(
      0,
      API_CONFIG_LIMIT
    );
  }

  homeState.settings.mode = snapshot.mode;
  homeState.settings.endpoint = snapshot.endpoint;
  homeState.settings.token = snapshot.token;
  homeState.settings.model = snapshot.model;
  homeState.settings.activeApiConfigId = targetConfig.id;
  persistSettings(homeState.settings);
  if (homeApiConfigNameInput) {
    homeApiConfigNameInput.value = "";
  }
  applySettingsToHomeForm(homeState.settings);
  setHomeApiConfigStatus(`API 配置“${targetConfig.name}”已保存并设为当前。`, "success");
}

function switchHomeApiConfig(configId) {
  const config =
    normalizeApiConfigs(homeState.settings.apiConfigs).find((item) => item.id === configId) ||
    null;
  if (!config) {
    setHomeApiConfigStatus("未找到对应的 API 配置。", "error");
    return;
  }

  homeState.settings.mode = normalizeApiMode(config.mode);
  homeState.settings.endpoint = normalizeSettingsEndpointByMode(config.mode, config.endpoint);
  homeState.settings.token = config.token || "";
  homeState.settings.model = config.model || getDefaultModelByMode(config.mode);
  homeState.settings.activeApiConfigId = config.id;
  persistSettings(homeState.settings);
  applySettingsToHomeForm(homeState.settings);
  setHomeApiConfigStatus(`已一键切换到“${config.name}”。`, "success");
}

function deleteHomeApiConfig(configId) {
  const configs = normalizeApiConfigs(homeState.settings.apiConfigs);
  const target = configs.find((item) => item.id === configId);
  if (!target) {
    return;
  }

  const confirmed = window.confirm(`确定删除 API 配置“${target.name}”吗？`);
  if (!confirmed) {
    return;
  }

  homeState.settings.apiConfigs = configs.filter((item) => item.id !== configId);
  if (homeState.settings.activeApiConfigId === configId) {
    homeState.settings.activeApiConfigId = "";
  }
  if (homeState.settings.translationApiConfigId === configId) {
    homeState.settings.translationApiConfigId = "";
    homeState.settings.translationApiEnabled = false;
  }
  if (homeState.settings.summaryApiConfigId === configId) {
    homeState.settings.summaryApiConfigId = "";
    homeState.settings.summaryApiEnabled = false;
  }
  persistSettings(homeState.settings);
  renderHomeApiConfigList();
  syncHomeActiveConfigSummary();
  setHomeApiConfigStatus(`API 配置“${target.name}”已删除。`, "success");
}

function syncHomeActiveConfigSummary() {
  if (!homeActiveConfigSummaryEl) {
    return;
  }
  const activeConfig =
    normalizeApiConfigs(homeState.settings.apiConfigs).find(
      (item) => item.id === homeState.settings.activeApiConfigId
    ) || null;

  if (activeConfig) {
    homeActiveConfigSummaryEl.textContent = `当前已切换：${activeConfig.name} · ${getApiModeLabel(
      activeConfig.mode
    )}`;
    return;
  }

  homeActiveConfigSummaryEl.textContent = "当前为未缓存配置；保存后可在这里一键切换。";
}

function setHomeSettingsModalOpen(isOpen) {
  homeState.modalOpen = Boolean(isOpen);
  if (!homeSettingsModalEl) {
    return;
  }

  if (homeState.modalOpen) {
    homeState.settings = loadSettings();
    applySettingsToHomeForm(homeState.settings);
    refreshHomeTransferExportSelection();
    setHomeExportReviewOpen(false);
    setHomeImportReviewOpen(false);
    showHomeLayer(homeSettingsModalEl, "grid");
    refreshBodyModalState();
    window.setTimeout(() => {
      homeApiEndpointInput?.focus();
    }, 0);
    return;
  }

  saveCurrentHomeSettings({ silent: true });
  setHomeExportReviewOpen(false);
  setHomeImportReviewOpen(false);
  hideHomeLayer(homeSettingsModalEl);
  refreshBodyModalState();
}

function getHomeAppMeta(tabName = "home") {
  if (tabName === "privacy") {
    return {
      tab: "privacy",
      kicker: "Privacy",
      title: "白名单"
    };
  }
  if (tabName === "messages") {
    return {
      tab: "messages",
      kicker: "Messages",
      title: "Chat"
    };
  }
  if (tabName === "bubble") {
    return {
      tab: "bubble",
      kicker: "Bubble",
      title: "Bubble"
    };
  }
  if (tabName === "raising") {
    return {
      tab: "raising",
      kicker: "Game",
      title: "养崽"
    };
  }
  if (tabName === "schedule") {
    return {
      tab: "schedule",
      kicker: "Schedule",
      title: "日程"
    };
  }
  if (tabName === "memory") {
    return {
      tab: "memory",
      kicker: "Memory",
      title: "记忆"
    };
  }
  if (tabName === "logs") {
    return {
      tab: "logs",
      kicker: "Logs",
      title: "API Log"
    };
  }
  return {
    tab: "home",
    kicker: "Discussion",
    title: "X"
  };
}

function refreshBodyModalState() {
  document.body.classList.toggle(
    "modal-open",
    homeState.modalOpen || homeState.browserOpen || homeState.privacyAddModalOpen
  );
}

function setHomeBrowserModalOpen(
  isOpen,
  url = homeState.activeAppUrl,
  appMeta = getHomeAppMeta(homeState.activeAppTab)
) {
  homeState.browserOpen = Boolean(isOpen);
  if (!homeBrowserModalEl || !homeBrowserFrameEl) {
    return;
  }

  if (homeState.browserOpen) {
    if (homeState.modalOpen) {
      setHomeSettingsModalOpen(false);
    }
    const resolvedAppMeta = appMeta || getHomeAppMeta(homeState.activeAppTab);
    homeState.activeAppUrl = url || homeState.activeAppUrl || "./discussion.html?tab=home";
    homeState.activeAppTab = resolvedAppMeta.tab;
    showHomeLayer(homeBrowserModalEl, "grid");
    homeBrowserFrameEl.style.pointerEvents = "auto";
    homeBrowserFrameEl.src = homeState.activeAppUrl;
    if (homeBrowserKickerEl) {
      homeBrowserKickerEl.textContent = resolvedAppMeta.kicker;
    }
    if (homeBrowserTitleEl) {
      homeBrowserTitleEl.textContent = resolvedAppMeta.title;
    }
    refreshBodyModalState();
    return;
  }

  hideHomeLayer(homeBrowserModalEl);
  homeBrowserFrameEl.src = "about:blank";
  homeBrowserFrameEl.style.pointerEvents = "auto";
  homeState.activeAppUrl = "";
  homeState.activeAppTab = "home";
  refreshBodyModalState();
}

function handleTransferSelectionChange(event) {
  const target = event.target;
  if (!(target instanceof HTMLInputElement) || target.type !== "checkbox") {
    return;
  }
  const scope = String(target.dataset.scope || "export").trim();
  const sectionId = String(target.dataset.sectionId || "").trim();
  const role = String(target.dataset.role || "").trim();
  const selection = getSelectionStateByScope(scope);
  if (!sectionId || !selection.length) {
    return;
  }

  if (role === "section") {
    const section = getTransferSection(selection, sectionId);
    if (section) {
      setTransferSectionChecked(section, target.checked);
    }
  } else if (role === "item") {
    toggleTransferItemSelection(selection, sectionId, String(target.dataset.itemId || ""), target.checked);
  }

  if (scope === "import") {
    renderTransferSelection(homeImportReviewOptionsEl, selection, "import");
  } else {
    renderTransferSelection(homeTransferExportOptionsEl, selection, "export");
    renderHomeExportReviewSummary();
  }
}

function openHomeApp(tabName) {
  if (tabName === "privacy") {
    setHomeBrowserModalOpen(
      true,
      `./index.html?view=privacy&embed=1&v=${APP_BUILD_VERSION}`,
      getHomeAppMeta("privacy")
    );
    return;
  }

  if (tabName === "messages") {
    setHomeBrowserModalOpen(
      true,
      `./messages.html?embed=1&v=${APP_BUILD_VERSION}`,
      getHomeAppMeta("messages")
    );
    return;
  }

  if (tabName === "bubble") {
    setHomeBrowserModalOpen(
      true,
      `./bubble.html?embed=1&v=${APP_BUILD_VERSION}`,
      getHomeAppMeta("bubble")
    );
    return;
  }

  if (tabName === "raising") {
    setHomeBrowserModalOpen(
      true,
      `./raising.html?embed=1&v=${APP_BUILD_VERSION}`,
      getHomeAppMeta("raising")
    );
    return;
  }

  if (tabName === "schedule") {
    setHomeBrowserModalOpen(
      true,
      `./schedule.html?embed=1&v=${APP_BUILD_VERSION}`,
      getHomeAppMeta("schedule")
    );
    return;
  }

  if (tabName === "memory") {
    setHomeBrowserModalOpen(
      true,
      `./messages.html?embed=1&view=memory&v=${APP_BUILD_VERSION}`,
      getHomeAppMeta("memory")
    );
    return;
  }

  if (tabName === "logs") {
    setHomeBrowserModalOpen(
      true,
      `./api-log.html?embed=1&v=${APP_BUILD_VERSION}`,
      getHomeAppMeta("logs")
    );
    return;
  }

  const targetUrl = `./discussion.html?tab=home&embed=1&v=${APP_BUILD_VERSION}`;
  setHomeBrowserModalOpen(true, targetUrl, getHomeAppMeta("home"));
}

function attachHomeSettingsEvents() {
  homeAppTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const targetTab = trigger.dataset.openApp || "home";
      openHomeApp(targetTab);
    });
  });

  if (homeSettingsTriggerBtn) {
    homeSettingsTriggerBtn.addEventListener("click", () => {
      setHomeSettingsModalOpen(true);
    });
  }

  if (homeSettingsCloseBtn) {
    homeSettingsCloseBtn.addEventListener("click", () => {
      setHomeSettingsModalOpen(false);
    });
  }

  if (homeSettingsModalEl) {
    homeSettingsModalEl.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) {
        return;
      }
      if (target.hasAttribute("data-close-home-settings")) {
        setHomeSettingsModalOpen(false);
      }
    });
  }

  if (homeBrowserModalEl) {
    homeBrowserModalEl.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) {
        return;
      }
      if (target.hasAttribute("data-close-home-browser")) {
        setHomeBrowserModalOpen(false);
      }
    });
  }

  window.addEventListener("message", (event) => {
    const frameWindow = homeBrowserFrameEl?.contentWindow || null;
    if (frameWindow && event.source && event.source !== frameWindow) {
      return;
    }
    if (event.data?.type === "pulse-generator-close-app") {
      setHomeBrowserModalOpen(false);
      return;
    }
  });

  [homeApiModeSelect, homeApiEndpointInput, homeApiTokenInput, homeApiModelInput]
    .filter(Boolean)
    .forEach((field) => {
      field.addEventListener("input", () => {
        if (homeState.settings.activeApiConfigId) {
          homeState.settings.activeApiConfigId = "";
          renderHomeApiConfigList();
          syncHomeActiveConfigSummary();
        }
        updateHomeModeUI();
      });

      field.addEventListener("change", () => {
        saveCurrentHomeSettings({ silent: true });
      });
    });

  if (homeApiConfigSaveBtn) {
    homeApiConfigSaveBtn.addEventListener("click", () => {
      saveCurrentHomeApiConfig();
    });
  }

  if (privacyAppScanBtn) {
    privacyAppScanBtn.addEventListener("click", () => {
      scanCurrentPrivacyAllowlistCandidates();
    });
  }

  if (privacyAppPendingSelectAllBtn) {
    privacyAppPendingSelectAllBtn.addEventListener("click", () => {
      homeState.privacyPendingCandidates = homeState.privacyPendingCandidates.map((item) => ({
        ...item,
        selected: true
      }));
      persistPrivacyPendingCandidates(
        homeState.privacyPendingCandidates,
        homeState.privacyAllowlistItems.map((item) => item.text)
      );
      renderPrivacyPendingCandidates();
    });
  }

  if (privacyAppPendingClearBtn) {
    privacyAppPendingClearBtn.addEventListener("click", () => {
      homeState.privacyPendingCandidates = homeState.privacyPendingCandidates.map((item) => ({
        ...item,
        selected: false
      }));
      persistPrivacyPendingCandidates(
        homeState.privacyPendingCandidates,
        homeState.privacyAllowlistItems.map((item) => item.text)
      );
      renderPrivacyPendingCandidates();
    });
  }

  if (privacyAppPendingApplyBtn) {
    privacyAppPendingApplyBtn.addEventListener("click", () => {
      applyPrivacyPendingCandidates();
    });
  }

  if (privacyAppWhitelistListEl) {
    privacyAppWhitelistListEl.addEventListener("input", handlePrivacyAllowlistInput);
    privacyAppWhitelistListEl.addEventListener("change", handlePrivacyAllowlistChange);
    privacyAppWhitelistListEl.addEventListener("click", handlePrivacyAppClick);
  }

  if (privacyAppPendingListEl) {
    privacyAppPendingListEl.addEventListener("input", handlePrivacyPendingChange);
    privacyAppPendingListEl.addEventListener("change", handlePrivacyPendingChange);
    privacyAppPendingListEl.addEventListener("click", handlePrivacyAppClick);
  }

  if (privacyAppAddBtn) {
    privacyAppAddBtn.addEventListener("click", () => {
      setPrivacyAppAddModalOpen(true);
    });
  }

  if (privacyAppCloseBtn) {
    privacyAppCloseBtn.addEventListener("click", () => {
      requestEmbeddedClose();
    });
  }

  if (privacyAppAddCloseBtn) {
    privacyAppAddCloseBtn.addEventListener("click", () => {
      setPrivacyAppAddModalOpen(false);
    });
  }

  if (privacyAppAddCancelBtn) {
    privacyAppAddCancelBtn.addEventListener("click", () => {
      setPrivacyAppAddModalOpen(false);
    });
  }

  if (privacyAppAddApplyBtn) {
    privacyAppAddApplyBtn.addEventListener("click", () => {
      const values = normalizePrivacyAllowlist(privacyAppAddTextareaEl?.value || "");
      if (!values.length) {
        setPrivacyAppStatus("请至少填写一个词条后再确认添加。", "error");
        return;
      }
      addPrivacyAllowlistItemsByLines(values, "manual");
      setPrivacyAppAddModalOpen(false);
      setPrivacyAppStatus(`已手动加入 ${values.length} 个词条到白名单。`, "success");
    });
  }

  if (privacyAppAddModalEl) {
    privacyAppAddModalEl.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) {
        return;
      }
      if (target.hasAttribute("data-close-privacy-add")) {
        setPrivacyAppAddModalOpen(false);
      }
    });
  }

  if (homeApiConfigListEl) {
    homeApiConfigListEl.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) {
        return;
      }
      const actionEl = target.closest("[data-action]");
      if (!(actionEl instanceof HTMLElement)) {
        return;
      }
      const configId = actionEl.dataset.configId;
      if (!configId) {
        return;
      }
      const { action } = actionEl.dataset;
      if (action === "switch-home-api-config") {
        switchHomeApiConfig(configId);
      } else if (action === "delete-home-api-config") {
        deleteHomeApiConfig(configId);
      }
    });
  }

  if (homeTranslationApiEnabledEl) {
    homeTranslationApiEnabledEl.addEventListener("change", () => {
      if (homeTranslationApiEnabledEl.checked && !homeState.settings.translationApiConfigId) {
        const configs = normalizeApiConfigs(homeState.settings.apiConfigs);
        homeState.settings.translationApiConfigId =
          homeState.settings.activeApiConfigId || configs[0]?.id || "";
      }
      homeState.settings.translationApiEnabled = Boolean(
        homeTranslationApiEnabledEl.checked && homeState.settings.translationApiConfigId
      );
      persistSettings(homeState.settings);
      renderHomeTranslationApiControls();
    });
  }

  if (homeTranslationApiConfigSelectEl) {
    homeTranslationApiConfigSelectEl.addEventListener("change", () => {
      homeState.settings.translationApiConfigId = String(
        homeTranslationApiConfigSelectEl.value || ""
      ).trim();
      homeState.settings.translationApiEnabled = Boolean(
        homeTranslationApiEnabledEl?.checked && homeState.settings.translationApiConfigId
      );
      persistSettings(homeState.settings);
      renderHomeApiConfigList();
    });
  }

  if (homeSummaryApiEnabledEl) {
    homeSummaryApiEnabledEl.addEventListener("change", () => {
      if (homeSummaryApiEnabledEl.checked && !homeState.settings.summaryApiConfigId) {
        const configs = normalizeApiConfigs(homeState.settings.apiConfigs);
        homeState.settings.summaryApiConfigId =
          homeState.settings.activeApiConfigId || configs[0]?.id || "";
      }
      homeState.settings.summaryApiEnabled = Boolean(
        homeSummaryApiEnabledEl.checked && homeState.settings.summaryApiConfigId
      );
      persistSettings(homeState.settings);
      renderHomeSummaryApiControls();
    });
  }

  if (homeSummaryApiConfigSelectEl) {
    homeSummaryApiConfigSelectEl.addEventListener("change", () => {
      homeState.settings.summaryApiConfigId = String(
        homeSummaryApiConfigSelectEl.value || ""
      ).trim();
      homeState.settings.summaryApiEnabled = Boolean(
        homeSummaryApiEnabledEl?.checked && homeState.settings.summaryApiConfigId
      );
      persistSettings(homeState.settings);
      renderHomeApiConfigList();
    });
  }

  if (homeTransferSelectAllBtn) {
    homeTransferSelectAllBtn.addEventListener("click", () => {
      setAllTransferSections(homeState.exportTransferSelection, true);
      renderTransferSelection(homeTransferExportOptionsEl, homeState.exportTransferSelection, "export");
      renderHomeExportReviewSummary();
    });
  }

  if (homeTransferClearBtn) {
    homeTransferClearBtn.addEventListener("click", () => {
      setAllTransferSections(homeState.exportTransferSelection, false);
      renderTransferSelection(homeTransferExportOptionsEl, homeState.exportTransferSelection, "export");
      renderHomeExportReviewSummary();
    });
  }

  if (homeTransferExportOptionsEl) {
    homeTransferExportOptionsEl.addEventListener("change", handleTransferSelectionChange);
  }

  if (homeImportReviewOptionsEl) {
    homeImportReviewOptionsEl.addEventListener("change", handleTransferSelectionChange);
  }

  if (homeConfigExportBtn) {
    homeConfigExportBtn.addEventListener("click", () => {
      refreshHomeTransferExportSelection();
      setHomeImportReviewOpen(false);
      setHomeExportReviewOpen(true);
    });
  }

  if (homeConfigImportBtn && homeConfigImportInput) {
    homeConfigImportBtn.addEventListener("click", () => {
      homeConfigImportInput.click();
    });
  }

  if (homeConfigImportInput) {
    homeConfigImportInput.addEventListener("change", async () => {
      const [file] = homeConfigImportInput.files || [];
      await handleHomeConfigImport(file);
      homeConfigImportInput.value = "";
    });
  }

  if (homeImportApplyBtn) {
    homeImportApplyBtn.addEventListener("click", () => {
      try {
        applyImportedConfig(
          homeState.pendingImportTransferPayload,
          homeState.importTransferSelection
        );
        setHomeTransferStatus("已导入所选配置，API 密钥与挂载设置已同步到本地。", "success");
      } catch (error) {
        setHomeTransferStatus(`导入失败：${error?.message || "无法应用所选配置。"}`, "error");
      }
    });
  }

  if (homeExportApplyBtn) {
    homeExportApplyBtn.addEventListener("click", () => {
      if (exportHomeConfig()) {
        setHomeExportReviewOpen(false);
      }
    });
  }

  if (homeExportCancelBtn) {
    homeExportCancelBtn.addEventListener("click", () => {
      setHomeExportReviewOpen(false);
      setHomeTransferStatus("已取消本次导出。", "");
    });
  }

  if (homeImportCancelBtn) {
    homeImportCancelBtn.addEventListener("click", () => {
      setHomeImportReviewOpen(false);
      setHomeTransferStatus("已取消本次导入。", "");
    });
  }

  if (homeApiLogBtn) {
    homeApiLogBtn.addEventListener("click", () => {
      openHomeApp("logs");
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && homeState.privacyAddModalOpen) {
      setPrivacyAppAddModalOpen(false);
      return;
    }
    if (event.key === "Escape" && homeState.modalOpen) {
      setHomeSettingsModalOpen(false);
      return;
    }
    if (event.key === "Escape" && homeState.browserOpen) {
      setHomeBrowserModalOpen(false);
    }
  });
}

function initHome() {
  hideHomeLayer(homeSettingsModalEl);
  hideHomeLayer(homeBrowserModalEl);
  hideHomeLayer(privacyAppAddModalEl);
  setHomeExportReviewOpen(false);
  setHomeImportReviewOpen(false);
  updateLocalClock();
  renderBuildBadge();
  setInterval(updateLocalClock, 1000);
  attachHomeSettingsEvents();

  if (isPrivacyAppView()) {
    setPrivacyAppVisible(true);
    initPrivacyAppState();
    renderPrivacyApp();
    setPrivacyAppStatus("");
    refreshBodyModalState();
    return;
  }

  setPrivacyAppVisible(false);
  syncHomeActiveConfigSummary();
  refreshHomeTransferExportSelection();
}

initHome();
