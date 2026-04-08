const DEFAULT_OPENAI_ENDPOINT = "https://api.deepseek.com/chat/completions";
const DEFAULT_GEMINI_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta";
const DEFAULT_DEEPSEEK_MODEL = "deepseek-chat";
const DEFAULT_GEMINI_MODEL = "gemini-2.0-flash";
const APP_BUILD_VERSION = "20260408-181553";
const APP_BUILD_UPDATED_AT = "2026-04-08 18:15:53";
const SETTINGS_KEY = "x_style_generator_settings_v2";
const POSTS_KEY = "x_style_generator_posts_v2";
const REFRESH_KEY = "x_style_generator_refresh_v2";
const PROFILE_KEY = "x_style_generator_profile_v1";
const PROFILE_POSTS_KEY = "x_style_generator_profile_posts_v1";
const DISCUSSIONS_KEY = "x_style_generator_discussions_v1";
const PLOT_THREADS_KEY = "x_style_generator_plot_threads_v1";
const WORLD_BOOKS_KEY = "x_style_generator_message_worldbooks_v1";
const MESSAGE_CONTACTS_KEY = "x_style_generator_message_contacts_v1";
const MESSAGE_THREADS_KEY = "x_style_generator_message_threads_v1";
const MESSAGE_MEMORIES_KEY = "x_style_generator_message_memories_v1";
const SCHEDULE_ENTRIES_KEY = "x_style_generator_schedule_entries_v1";
const MESSAGE_COMMON_PLACES_KEY = "x_style_generator_common_places_v1";
const MESSAGE_PRESENCE_STATE_KEY = "x_style_generator_presence_state_v1";
const PRIVACY_ALLOWLIST_META_KEY = "x_style_generator_privacy_allowlist_meta_v1";
const PRIVACY_PENDING_SCAN_KEY = "x_style_generator_privacy_scan_pending_v1";
const PRIVACY_ALLOWLIST_TERMS_KEY = "x_style_generator_privacy_allowlist_terms_v1";
const PRIVACY_IGNORELIST_TERMS_KEY = "x_style_generator_privacy_ignorelist_terms_v1";
const PRIVACY_RECENT_HITS_SINCE_KEY = "x_style_generator_privacy_recent_hits_since_v1";
const PRIVACY_RECENT_HITS_DISMISSED_KEY = "x_style_generator_privacy_recent_hits_dismissed_v1";
const DEFAULT_AUTO_SCHEDULE_DAYS = 3;
const DEFAULT_TRANSFER_MEMORY_IMPORTANCE = 65;
const API_CONFIG_LIMIT = 12;
const CONFIG_EXPORT_SCHEMA = "pulse-generator-config";
const TRANSFER_FORUM_BASE_ITEM_ID = "__forum_base__";
const TRANSFER_CONTACT_CHAT_HISTORY_PREFIX = "__contact_chat_history__:";
const TRANSFER_SCHEDULE_USER_ITEM_ID = "__schedule_owner__user";
const TRANSFER_SCHEDULE_CONTACT_ITEM_PREFIX = "__schedule_owner__contact:";
const TRANSFER_FORUM_FEED_POSTS_PREFIX = "__forum_feed_posts__:";
const TRANSFER_FORUM_PROFILE_POSTS_ITEM_ID = "__forum_profile_posts__";

const homeSceneEl = document.querySelector(".home-scene");
const phoneDateEl = document.querySelector("#phone-date");
const phoneClockEl = document.querySelector("#phone-clock");
const phoneEffectiveTimeEl = document.querySelector("#phone-effective-time");
const statusVersionEl = document.querySelector("#status-version");
const statusUpdatedEl = document.querySelector("#status-updated");
const homeTimeTriggerBtn = document.querySelector("#home-time-trigger");
const homeSettingsTriggerBtn = document.querySelector("#home-settings-trigger");
const homeRulesTriggerBtn = document.querySelector("#home-rules-trigger");
const homeSettingsModalEl = document.querySelector("#home-settings-modal");
const homeSettingsCloseBtn = document.querySelector("#home-settings-close-btn");
const homeTimeModalEl = document.querySelector("#home-time-modal");
const homeTimeCloseBtn = document.querySelector("#home-time-close-btn");
const homeTimeEnabledEl = document.querySelector("#home-time-enabled");
const homeTimeInputEl = document.querySelector("#home-time-input");
const homeTimeSummaryEl = document.querySelector("#home-time-summary");
const homeTimeStatusEl = document.querySelector("#home-time-status");
const homeTimeUseNowBtn = document.querySelector("#home-time-use-now-btn");
const homeTimeResetBtn = document.querySelector("#home-time-reset-btn");
const homeRulesModalEl = document.querySelector("#home-rules-modal");
const homeRulesCloseBtn = document.querySelector("#home-rules-close-btn");
const homeRulesTypeListEl = document.querySelector("#home-rules-type-list");
const homeRulesTitleEl = document.querySelector("#home-rules-title");
const homeRulesDescriptionEl = document.querySelector("#home-rules-description");
const homeRulesNegativeTriggerBtn = document.querySelector("#home-rules-negative-trigger");
const homeRulesNegativeSummaryEl = document.querySelector("#home-rules-negative-summary");
const homeRulesStatusEl = document.querySelector("#home-rules-status");
const homeRulesSectionsEl = document.querySelector("#home-rules-sections");
const homeRulesNegativeModalEl = document.querySelector("#home-rules-negative-modal");
const homeRulesNegativeCloseBtn = document.querySelector("#home-rules-negative-close-btn");
const homeRulesNegativeInputEl = document.querySelector("#home-rules-negative-input");
const homeRulesNegativeStatusEl = document.querySelector("#home-rules-negative-status");
const homeRulesNegativeSaveBtn = document.querySelector("#home-rules-negative-save-btn");
const homeRulesNegativeCancelBtn = document.querySelector("#home-rules-negative-cancel-btn");
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
const homeNegativePromptInputEl = document.querySelector("#home-negative-prompt-input");
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
const privacyAppIgnoreSummaryEl = document.querySelector("#privacy-app-ignore-summary");
const privacyAppIgnoreListEl = document.querySelector("#privacy-app-ignore-list");
const privacyAppRecentSummaryEl = document.querySelector("#privacy-app-recent-summary");
const privacyAppRecentListEl = document.querySelector("#privacy-app-recent-list");
const privacyAppClearRecentBtn = document.querySelector("#privacy-app-clear-recent-btn");
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
let homeBackgroundMessagesFrameEl = null;

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
  negativePromptConstraints: [],
  privacyAllowlist: [],
  manualTimeSettings: {
    enabled: false,
    value: "",
    offsetMs: 0,
    savedAt: 0
  },
  promptRules: {},
  chatGlobalSettings: {
    userPresenceScope: "global"
  }
};

const homeState = {
  settings: loadSettings(),
  modalOpen: false,
  timeModalOpen: false,
  rulesModalOpen: false,
  rulesNegativeModalOpen: false,
  browserOpen: false,
  activeAppUrl: "",
  activeAppTab: "home",
  rulesActivePromptType: "",
  rulesDragState: null,
  exportTransferSelection: [],
  pendingImportTransferPayload: null,
  importTransferSelection: [],
  privacyAllowlistItems: [],
  privacyIgnorelistItems: [],
  privacyRecentHitItems: [],
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
  renderHomeEffectiveTime(homeState.settings);
  if (homeState.timeModalOpen && homeTimeSummaryEl) {
    const promptTimeLabel =
      typeof window.PulsePromptConfig?.formatPromptTimeLabel === "function"
        ? window.PulsePromptConfig.formatPromptTimeLabel(homeState.settings)
        : "跟随本地时间";
    homeTimeSummaryEl.textContent = normalizeHomeManualTimeSettings(homeState.settings).enabled
      ? `当前发送给 prompt 的时间：${promptTimeLabel}（会继续随真实时间流动）`
      : "当前发送给 prompt 的时间：跟随本地时间";
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

function normalizeChatGlobalSettings(source = {}) {
  const resolved = source && typeof source === "object" ? source : {};
  return {
    userPresenceScope: resolved.userPresenceScope === "per_contact" ? "per_contact" : "global"
  };
}

function normalizeAutoScheduleDays(value, fallback = DEFAULT_AUTO_SCHEDULE_DAYS) {
  const parsed = Number.parseInt(String(value ?? fallback), 10);
  if (!Number.isFinite(parsed)) {
    return fallback;
  }
  return Math.min(14, Math.max(1, parsed));
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
  merged.negativePromptConstraints = normalizeNegativePromptConstraints(
    merged.negativePromptConstraints || source?.negativePromptConstraints || []
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
  merged.manualTimeSettings =
    typeof window.PulsePromptConfig?.normalizeManualTimeSettings === "function"
      ? window.PulsePromptConfig.normalizeManualTimeSettings(merged.manualTimeSettings)
      : {
          enabled: Boolean(merged.manualTimeSettings?.enabled),
          value: String(merged.manualTimeSettings?.value || "").trim(),
          offsetMs: Number.isFinite(Number(merged.manualTimeSettings?.offsetMs))
            ? Math.round(Number(merged.manualTimeSettings.offsetMs))
            : 0,
          savedAt: Number.isFinite(Number(merged.manualTimeSettings?.savedAt))
            ? Number(merged.manualTimeSettings.savedAt)
            : Date.now()
        };
  merged.promptRules =
    typeof window.PulsePromptConfig?.normalizePromptRules === "function"
      ? window.PulsePromptConfig.normalizePromptRules(merged.promptRules)
      : merged.promptRules && typeof merged.promptRules === "object"
        ? { ...merged.promptRules }
        : {};
  merged.chatGlobalSettings = normalizeChatGlobalSettings(
    merged.chatGlobalSettings || source?.chatGlobalSettings || {}
  );
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

function setHomeTimeStatus(message, tone = "") {
  if (!homeTimeStatusEl) {
    return;
  }
  homeTimeStatusEl.textContent = message;
  homeTimeStatusEl.className = "home-settings-status";
  if (tone) {
    homeTimeStatusEl.classList.add(tone);
  }
}

function setHomeRulesStatus(message, tone = "") {
  if (!homeRulesStatusEl) {
    return;
  }
  homeRulesStatusEl.textContent = message;
  homeRulesStatusEl.className = "home-settings-status";
  if (tone) {
    homeRulesStatusEl.classList.add(tone);
  }
}

function setHomeRulesNegativeStatus(message, tone = "") {
  if (!homeRulesNegativeStatusEl) {
    return;
  }
  homeRulesNegativeStatusEl.textContent = message;
  homeRulesNegativeStatusEl.className = "home-settings-status";
  if (tone) {
    homeRulesNegativeStatusEl.classList.add(tone);
  }
}

function cloneHomePlain(value) {
  if (typeof window.PulsePromptConfig?.clonePlain === "function") {
    return window.PulsePromptConfig.clonePlain(value);
  }
  if (value == null) {
    return value;
  }
  return JSON.parse(JSON.stringify(value));
}

function normalizeHomeManualTimeSettings(settings = homeState.settings) {
  if (typeof window.PulsePromptConfig?.normalizeManualTimeSettings === "function") {
    return window.PulsePromptConfig.normalizeManualTimeSettings(settings?.manualTimeSettings);
  }
  return {
    enabled: Boolean(settings?.manualTimeSettings?.enabled),
    value: String(settings?.manualTimeSettings?.value || "").trim(),
    offsetMs: Number.isFinite(Number(settings?.manualTimeSettings?.offsetMs))
      ? Math.round(Number(settings.manualTimeSettings.offsetMs))
      : 0,
    savedAt: Number.isFinite(Number(settings?.manualTimeSettings?.savedAt))
      ? Number(settings.manualTimeSettings.savedAt)
      : Date.now()
  };
}

function normalizeHomePromptRules(settings = homeState.settings) {
  if (typeof window.PulsePromptConfig?.normalizePromptRules === "function") {
    return window.PulsePromptConfig.normalizePromptRules(settings?.promptRules || {});
  }
  return settings?.promptRules && typeof settings.promptRules === "object"
    ? cloneHomePlain(settings.promptRules)
    : {};
}

function getHomePromptCatalogList() {
  if (typeof window.PulsePromptConfig?.getPromptCatalogList === "function") {
    return window.PulsePromptConfig.getPromptCatalogList();
  }
  return [];
}

function getActiveHomeRulePromptType() {
  const promptCatalogList = getHomePromptCatalogList();
  const activePromptType = String(homeState.rulesActivePromptType || "").trim();
  if (promptCatalogList.some((item) => item.id === activePromptType)) {
    return activePromptType;
  }
  return promptCatalogList[0]?.id || "";
}

function renderHomeEffectiveTime(settings = homeState.settings) {
  if (!phoneEffectiveTimeEl) {
    return;
  }
  const timeLabel =
    typeof window.PulsePromptConfig?.formatPromptTimeLabel === "function"
      ? window.PulsePromptConfig.formatPromptTimeLabel(settings)
      : normalizeHomeManualTimeSettings(settings).enabled
        ? String(normalizeHomeManualTimeSettings(settings).value || "").trim() || "跟随本地时间"
        : "跟随本地时间";
  phoneEffectiveTimeEl.textContent = `Prompt 时间：${timeLabel || "跟随本地时间"}`;
}

function buildHomeManualTimeSettingsFromInput(targetValue = "", enabled = true) {
  if (typeof window.PulsePromptConfig?.createManualTimeSettings === "function") {
    return window.PulsePromptConfig.createManualTimeSettings(targetValue, enabled, new Date());
  }
  const value = String(targetValue || "").trim();
  const parsed = value ? new Date(value) : null;
  const parsedTimestamp = parsed && Number.isFinite(parsed.getTime()) ? parsed.getTime() : Number.NaN;
  const nowTimestamp = Date.now();
  return {
    enabled: Boolean(enabled && Number.isFinite(parsedTimestamp)),
    value,
    offsetMs: Number.isFinite(parsedTimestamp) ? Math.round(parsedTimestamp - nowTimestamp) : 0,
    savedAt: nowTimestamp
  };
}

function persistHomeSettingsSnapshot(nextSettings, options = {}) {
  homeState.settings = buildNormalizedSettingsSnapshot(nextSettings, {
    forceActiveConfig: Boolean(options.forceActiveConfig)
  });
  persistSettings(homeState.settings);
  renderHomeEffectiveTime(homeState.settings);
  return homeState.settings;
}

function ensureHomePromptRuleSectionConfig(promptType = "", sectionKey = "") {
  const resolvedPromptType = String(promptType || "").trim();
  const resolvedSectionKey = String(sectionKey || "").trim();
  const promptRules = normalizeHomePromptRules(homeState.settings);
  if (!resolvedPromptType || !resolvedSectionKey) {
    return {
      promptRules,
      promptConfig: null,
      sectionConfig: null
    };
  }

  if (!promptRules[resolvedPromptType] || typeof promptRules[resolvedPromptType] !== "object") {
    promptRules[resolvedPromptType] = {
      sectionOrder: [],
      sections: {}
    };
  }

  const promptConfig = promptRules[resolvedPromptType];
  if (!promptConfig.sections || typeof promptConfig.sections !== "object") {
    promptConfig.sections = {};
  }
  if (
    !promptConfig.sections[resolvedSectionKey] ||
    typeof promptConfig.sections[resolvedSectionKey] !== "object"
  ) {
    promptConfig.sections[resolvedSectionKey] = {
      itemOrder: [],
      overrides: {},
      customItems: []
    };
  }

  const sectionConfig = promptConfig.sections[resolvedSectionKey];
  sectionConfig.itemOrder = Array.isArray(sectionConfig.itemOrder)
    ? sectionConfig.itemOrder.map((item) => String(item || "").trim()).filter(Boolean)
    : [];
  sectionConfig.overrides =
    sectionConfig.overrides && typeof sectionConfig.overrides === "object"
      ? { ...sectionConfig.overrides }
      : {};
  sectionConfig.customItems = Array.isArray(sectionConfig.customItems)
    ? sectionConfig.customItems.map((item, index) => ({
        id: String(item?.id || `custom_${index}`).trim(),
        text: String(item?.text || "")
      }))
    : [];

  return {
    promptRules,
    promptConfig,
    sectionConfig
  };
}

function getHomePromptSectionItemOrder(promptType = "", sectionKey = "") {
  const editorModel =
    typeof window.PulsePromptConfig?.buildEditorModel === "function"
      ? window.PulsePromptConfig.buildEditorModel(promptType, homeState.settings)
      : null;
  const targetSection =
    editorModel?.sections?.find((section) => section.key === String(sectionKey || "").trim()) || null;
  return Array.isArray(targetSection?.items)
    ? targetSection.items.map((item) => String(item?.id || "").trim()).filter(Boolean)
    : [];
}

function getHomePromptEditorItem(promptType = "", sectionKey = "", itemId = "") {
  const resolvedPromptType = String(promptType || "").trim();
  const resolvedSectionKey = String(sectionKey || "").trim();
  const resolvedItemId = String(itemId || "").trim();
  if (!resolvedPromptType || !resolvedSectionKey || !resolvedItemId) {
    return null;
  }
  const editorModel =
    typeof window.PulsePromptConfig?.buildEditorModel === "function"
      ? window.PulsePromptConfig.buildEditorModel(resolvedPromptType, homeState.settings)
      : null;
  const section =
    editorModel?.sections?.find((item) => String(item?.key || "").trim() === resolvedSectionKey) || null;
  return section?.items?.find((item) => String(item?.id || "").trim() === resolvedItemId) || null;
}

function persistHomePromptRules(promptRules, statusMessage = "规则已保存。") {
  persistHomeSettingsSnapshot({
    ...homeState.settings,
    promptRules
  });
  if (statusMessage) {
    setHomeRulesStatus(statusMessage, "success");
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

function buildCommonPlaceTransferDescription(place = {}) {
  const typeMap = {
    home: "住宅",
    family: "家庭",
    work: "工作",
    school: "学校",
    leisure: "娱乐",
    other: "其他"
  };
  const typeLabel = typeMap[String(place.type || "").trim()] || "其他";
  const visibilityMode = String(place.visibilityMode || "").trim();
  const visibilityLabel =
    visibilityMode === "all_contacts"
      ? "全部角色可见"
      : visibilityMode === "selected_contacts"
        ? "指定角色可见"
        : "仅自己知道";
  return `${typeLabel} · ${visibilityLabel}`;
}

function pickConversationChatSettingsPayload(conversation = {}) {
  const source = conversation && typeof conversation === "object" ? conversation : {};
  const contactId = String(source.contactId || "").trim();
  if (!contactId) {
    return null;
  }
  return {
    contactId,
    sceneMode: String(source.sceneMode || "").trim() === "offline" ? "offline" : "online",
    allowAiPresenceUpdate: Boolean(source.allowAiPresenceUpdate),
    allowAiAutoSchedule: Boolean(source.allowAiAutoSchedule),
    autoScheduleDays: normalizeAutoScheduleDays(source.autoScheduleDays, DEFAULT_AUTO_SCHEDULE_DAYS),
    autoScheduleTime:
      /^\d{2}:\d{2}$/.test(String(source.autoScheduleTime || "").trim())
        ? String(source.autoScheduleTime || "").trim()
        : "",
    autoScheduleLastRunDate: /^\d{4}-\d{2}-\d{2}$/.test(
      String(source.autoScheduleLastRunDate || "").trim()
    )
      ? String(source.autoScheduleLastRunDate || "").trim()
      : ""
  };
}

function normalizeConversationChatSettingsPayloadItems(items = []) {
  return normalizeObjectArray(items)
    .map((item) => pickConversationChatSettingsPayload(item))
    .filter(Boolean);
}

function buildContactAvatarTextFallback(contact = {}) {
  const name = String(contact?.name || "").trim();
  return name ? name.slice(0, 1).toUpperCase() : "联";
}

function mergeConversationChatSettings(existingThreads = [], incomingItems = [], contacts = []) {
  const nextThreads = normalizeObjectArray(existingThreads).map((item) => ({
    ...item,
    messages: Array.isArray(item.messages) ? item.messages.map((message) => ({ ...message })) : []
  }));
  const normalizedIncoming = normalizeConversationChatSettingsPayloadItems(incomingItems);
  const contactMap = new Map(
    normalizeObjectArray(contacts).map((contact) => [String(contact.id || "").trim(), contact])
  );

  normalizedIncoming.forEach((item, index) => {
    const contactId = String(item.contactId || "").trim();
    if (!contactId) {
      return;
    }
    const existingIndex = nextThreads.findIndex(
      (thread) => String(thread.contactId || "").trim() === contactId
    );
    if (existingIndex >= 0) {
      nextThreads[existingIndex] = {
        ...nextThreads[existingIndex],
        sceneMode: item.sceneMode,
        allowAiPresenceUpdate: Boolean(item.allowAiPresenceUpdate),
        allowAiAutoSchedule: Boolean(item.allowAiAutoSchedule),
        autoScheduleDays: normalizeAutoScheduleDays(
          item.autoScheduleDays,
          nextThreads[existingIndex].autoScheduleDays || DEFAULT_AUTO_SCHEDULE_DAYS
        ),
        autoScheduleTime:
          /^\d{2}:\d{2}$/.test(String(item.autoScheduleTime || "").trim())
            ? String(item.autoScheduleTime || "").trim()
            : String(nextThreads[existingIndex].autoScheduleTime || "").trim(),
        autoScheduleLastRunDate: /^\d{4}-\d{2}-\d{2}$/.test(
          String(item.autoScheduleLastRunDate || "").trim()
        )
          ? String(item.autoScheduleLastRunDate || "").trim()
          : String(nextThreads[existingIndex].autoScheduleLastRunDate || "").trim()
      };
      return;
    }
    const contact = contactMap.get(contactId) || {};
    nextThreads.push({
      id: `conversation_imported_${Date.now()}_${index}_${contactId}`,
      contactId,
      contactNameSnapshot: String(contact.name || "").trim(),
      contactAvatarImageSnapshot: String(contact.avatarImage || "").trim(),
      contactAvatarTextSnapshot: String(
        contact.avatarText || buildContactAvatarTextFallback(contact)
      ).trim(),
      sceneMode: item.sceneMode,
      allowAiPresenceUpdate: Boolean(item.allowAiPresenceUpdate),
      allowAiAutoSchedule: Boolean(item.allowAiAutoSchedule),
      autoScheduleDays: normalizeAutoScheduleDays(
        item.autoScheduleDays,
        DEFAULT_AUTO_SCHEDULE_DAYS
      ),
      autoScheduleTime:
        /^\d{2}:\d{2}$/.test(String(item.autoScheduleTime || "").trim())
          ? String(item.autoScheduleTime || "").trim()
          : "",
      autoScheduleLastRunDate: /^\d{4}-\d{2}-\d{2}$/.test(
        String(item.autoScheduleLastRunDate || "").trim()
      )
        ? String(item.autoScheduleLastRunDate || "").trim()
        : "",
      messages: [],
      awarenessCounter: 0,
      memorySummaryCounter: 0,
      memorySummaryLastMessageCount: 0,
      updatedAt: Date.now()
    });
  });

  return nextThreads;
}

function normalizeConversationThreadPayloadItems(items = []) {
  return normalizeObjectArray(items)
    .map((item) => {
      const source = item && typeof item === "object" ? item : {};
      const contactId = String(source.contactId || "").trim();
      if (!contactId) {
        return null;
      }
      return {
        ...source,
        contactId,
        id: String(source.id || "").trim(),
        messages: Array.isArray(source.messages)
          ? source.messages.map((message) => ({
              ...(message && typeof message === "object" ? message : {}),
              needsReply: false
            }))
          : []
      };
    })
    .filter(Boolean);
}

function mergeConversationThreads(existingThreads = [], incomingThreads = [], contacts = []) {
  const contactMap = new Map(
    normalizeObjectArray(contacts).map((contact) => [String(contact.id || "").trim(), contact])
  );
  const nextThreads = normalizeObjectArray(existingThreads).map((thread) => ({
    ...thread,
    messages: Array.isArray(thread.messages) ? thread.messages.map((message) => ({ ...message })) : []
  }));

  normalizeConversationThreadPayloadItems(incomingThreads).forEach((incomingThread, index) => {
    const contactId = String(incomingThread.contactId || "").trim();
    const existingIndex = nextThreads.findIndex(
      (thread) => String(thread.contactId || "").trim() === contactId
    );
    const contact = contactMap.get(contactId) || {};
    if (existingIndex < 0) {
      nextThreads.push({
        ...incomingThread,
        id:
          String(incomingThread.id || "").trim() ||
          `conversation_imported_${Date.now()}_${index}_${contactId}`,
        contactNameSnapshot:
          String(incomingThread.contactNameSnapshot || contact.name || "").trim(),
        contactAvatarImageSnapshot:
          String(incomingThread.contactAvatarImageSnapshot || contact.avatarImage || "").trim(),
        contactAvatarTextSnapshot: String(
          incomingThread.contactAvatarTextSnapshot ||
            contact.avatarText ||
            buildContactAvatarTextFallback(contact)
        ).trim(),
        messages: Array.isArray(incomingThread.messages)
          ? incomingThread.messages.map((message) => ({ ...message }))
          : []
      });
      return;
    }

    const current = nextThreads[existingIndex];
    const mergedMessages = Array.isArray(current.messages) ? current.messages.map((message) => ({ ...message })) : [];
    normalizeObjectArray(incomingThread.messages).forEach((message) => {
      const messageId = String(message.id || "").trim();
      if (!messageId) {
        mergedMessages.push({ ...message });
        return;
      }
      const messageIndex = mergedMessages.findIndex(
        (currentMessage) => String(currentMessage.id || "").trim() === messageId
      );
      if (messageIndex >= 0) {
        mergedMessages[messageIndex] = {
          ...mergedMessages[messageIndex],
          ...message
        };
      } else {
        mergedMessages.push({ ...message });
      }
    });
    mergedMessages.sort(
      (left, right) =>
        (Number(left.createdAt) || 0) - (Number(right.createdAt) || 0) ||
        String(left.id || "").localeCompare(String(right.id || ""))
    );

    nextThreads[existingIndex] = {
      ...current,
      ...incomingThread,
      id: String(current.id || incomingThread.id || "").trim() || current.id,
      contactId,
      contactNameSnapshot:
        String(incomingThread.contactNameSnapshot || current.contactNameSnapshot || contact.name || "").trim(),
      contactAvatarImageSnapshot: String(
        incomingThread.contactAvatarImageSnapshot ||
          current.contactAvatarImageSnapshot ||
          contact.avatarImage ||
          ""
      ).trim(),
      contactAvatarTextSnapshot: String(
        incomingThread.contactAvatarTextSnapshot ||
          current.contactAvatarTextSnapshot ||
          contact.avatarText ||
          buildContactAvatarTextFallback(contact)
      ).trim(),
      messages: mergedMessages,
      updatedAt: Math.max(Number(current.updatedAt) || 0, Number(incomingThread.updatedAt) || 0) || Date.now()
    };
  });

  return nextThreads;
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

function normalizePresenceTransferState(value = {}) {
  const resolved = value && typeof value === "object" ? value : {};
  return {
    userGlobal: normalizePresenceTransferEntry(resolved.userGlobal),
    userByContact: Object.fromEntries(
      Object.entries(resolved.userByContact || {}).map(([contactId, entry]) => [
        String(contactId || "").trim(),
        normalizePresenceTransferEntry(entry)
      ])
    ),
    contacts: Object.fromEntries(
      Object.entries(resolved.contacts || {}).map(([contactId, entry]) => [
        String(contactId || "").trim(),
        normalizePresenceTransferEntry(entry)
      ])
    )
  };
}

function hasPresenceTransferEntryData(entry = {}) {
  const normalized = normalizePresenceTransferEntry(entry);
  return Boolean(
    normalized.placeId ||
      normalized.fromPlaceId ||
      normalized.toPlaceId ||
      normalized.updatedAt ||
      normalized.presenceType === "in_transit"
  );
}

function hasPresenceTransferStateData(value = {}) {
  const normalized = normalizePresenceTransferState(value);
  return (
    hasPresenceTransferEntryData(normalized.userGlobal) ||
    Object.values(normalized.userByContact).some((entry) => hasPresenceTransferEntryData(entry)) ||
    Object.values(normalized.contacts).some((entry) => hasPresenceTransferEntryData(entry))
  );
}

function buildScheduleActorTransferItems(entries = [], contacts = []) {
  const normalizedEntries = normalizeObjectArray(entries).filter(
    (entry) => String(entry.title || "").trim() && String(entry.date || "").trim()
  );
  const contactMap = new Map(
    normalizeObjectArray(contacts).map((contact) => [String(contact.id || "").trim(), contact])
  );
  const groupMap = new Map();

  const ensureGroup = (groupId, label, descriptionPrefix = "") => {
    if (!groupMap.has(groupId)) {
      groupMap.set(groupId, {
        id: groupId,
        label,
        descriptionPrefix,
        checked: true,
        scheduleIds: [],
        latestDate: ""
      });
    }
    return groupMap.get(groupId);
  };

  normalizedEntries.forEach((entry) => {
    const entryId = String(entry.id || "").trim();
    const dateText = String(entry.date || "").trim();
    const attachToGroup = (groupId, label, descriptionPrefix = "") => {
      if (!entryId || !groupId) {
        return;
      }
      const group = ensureGroup(groupId, label, descriptionPrefix);
      if (!group.scheduleIds.includes(entryId)) {
        group.scheduleIds.push(entryId);
      }
      if (!group.latestDate || group.latestDate < dateText) {
        group.latestDate = dateText;
      }
    };

    if (String(entry.ownerType || "").trim() === "contact") {
      const ownerId = String(entry.ownerId || "").trim();
      if (ownerId) {
        const contact = contactMap.get(ownerId);
        attachToGroup(
          `${TRANSFER_SCHEDULE_CONTACT_ITEM_PREFIX}${ownerId}`,
          contact?.name || "角色",
          "角色相关日程"
        );
      }
    } else {
      attachToGroup(TRANSFER_SCHEDULE_USER_ITEM_ID, "用户", "用户相关日程");
    }

    if (Boolean(entry.companionIncludesUser)) {
      attachToGroup(TRANSFER_SCHEDULE_USER_ITEM_ID, "用户", "用户相关日程");
    }

    (Array.isArray(entry.companionContactIds) ? entry.companionContactIds : []).forEach((contactIdValue) => {
      const contactId = String(contactIdValue || "").trim();
      if (!contactId) {
        return;
      }
      const contact = contactMap.get(contactId);
      attachToGroup(
        `${TRANSFER_SCHEDULE_CONTACT_ITEM_PREFIX}${contactId}`,
        contact?.name || "角色",
        "角色相关日程"
      );
    });
  });

  return [...groupMap.values()]
    .map((item) => ({
      id: item.id,
      label: item.label,
      description: `${item.descriptionPrefix} · ${item.scheduleIds.length} 条${
        item.latestDate ? ` · 最近 ${item.latestDate}` : ""
      }`,
      checked: true,
      scheduleIds: item.scheduleIds.slice()
    }))
    .sort((left, right) => {
      if (left.id === TRANSFER_SCHEDULE_USER_ITEM_ID) {
        return -1;
      }
      if (right.id === TRANSFER_SCHEDULE_USER_ITEM_ID) {
        return 1;
      }
      return String(left.label || "").localeCompare(String(right.label || ""), "zh-CN");
    });
}

function normalizeTransferMemoryType(type) {
  const resolved = String(type || "").trim().toLowerCase();
  if (resolved === "core" || resolved === "核心记忆") {
    return "core";
  }
  return "scene";
}

function normalizeTransferMemoryImportance(value, fallback = DEFAULT_TRANSFER_MEMORY_IMPORTANCE) {
  const resolved = Math.round(Number(value));
  if (!Number.isFinite(resolved)) {
    return fallback;
  }
  return Math.min(100, Math.max(1, resolved));
}

function normalizeMessageMemoryTransferItem(memory, index = 0) {
  const source = memory && typeof memory === "object" ? memory : {};
  const content = String(source.content || source.text || "").trim();
  return {
    id: String(source.id || `message_memory_${Date.now()}_${index}`),
    contactId: String(source.contactId || "").trim(),
    type: normalizeTransferMemoryType(source.type),
    content,
    importance: normalizeTransferMemoryImportance(
      source.importance,
      DEFAULT_TRANSFER_MEMORY_IMPORTANCE
    ),
    source: String(source.source || "summary").trim() === "manual" ? "manual" : "summary",
    createdAt: Number(source.createdAt) || Date.now(),
    updatedAt: Number(source.updatedAt) || Number(source.createdAt) || Date.now()
  };
}

function canonicalizeTransferMemoryContent(value = "") {
  return String(value || "")
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[，。！？、,.!?；;:“”"'（）()【】\[\]《》<>—\-]/g, "");
}

function transferMemoryLooksSimilar(left = "", right = "") {
  const leftText = canonicalizeTransferMemoryContent(left);
  const rightText = canonicalizeTransferMemoryContent(right);
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

function mergeMessageMemories(existing = [], incoming = []) {
  const next = normalizeObjectArray(existing)
    .map((item, index) => normalizeMessageMemoryTransferItem(item, index))
    .filter((item) => item.contactId && item.content);

  normalizeObjectArray(incoming).forEach((candidate, index) => {
    const entry = normalizeMessageMemoryTransferItem(candidate, index);
    if (!entry.contactId || !entry.content) {
      return;
    }
    const foundIndex = next.findIndex(
      (item) =>
        item.contactId === entry.contactId &&
        transferMemoryLooksSimilar(item.content, entry.content)
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
      updatedAt:
        Math.max(Number(current.updatedAt) || 0, Number(entry.updatedAt) || 0) || Date.now(),
      content:
        String(current.content || "").trim().length >= String(entry.content || "").trim().length
          ? current.content
          : entry.content
    };
  });

  return next
    .filter((item) => item.contactId && item.content)
    .sort(
      (left, right) =>
        (Number(right.importance) || 0) - (Number(left.importance) || 0) ||
        (Number(right.updatedAt) || 0) - (Number(left.updatedAt) || 0)
    );
}

function buildMemoryTransferItems(entries = [], contacts = []) {
  const contactMap = new Map(
    normalizeObjectArray(contacts).map((contact) => [String(contact.id || "").trim(), contact])
  );
  const grouped = new Map();

  mergeMessageMemories([], entries).forEach((entry) => {
    const contactId = String(entry.contactId || "").trim();
    if (!contactId) {
      return;
    }
    if (!grouped.has(contactId)) {
      const contact = contactMap.get(contactId);
      grouped.set(contactId, {
        id: contactId,
        label: String(contact?.name || "未匹配联系人").trim() || "未匹配联系人",
        coreCount: 0,
        sceneCount: 0
      });
    }
    const item = grouped.get(contactId);
    if (entry.type === "core") {
      item.coreCount += 1;
    } else {
      item.sceneCount += 1;
    }
  });

  return [...grouped.values()]
    .map((item) => ({
      id: item.id,
      label: item.label,
      description: [
        `核心 ${item.coreCount} 条`,
        `情景 ${item.sceneCount} 条`,
        item.label === "未匹配联系人" ? `ID ${item.id}` : ""
      ]
        .filter(Boolean)
        .join(" · "),
      checked: true
    }))
    .sort((left, right) => String(left.label || "").localeCompare(String(right.label || ""), "zh-CN"));
}

function getTransferLeafStats(section = {}) {
  const items = Array.isArray(section.items) ? section.items : [];
  let total = 0;
  let checked = 0;
  items.forEach((item) => {
    total += 1;
    if (item.checked) {
      checked += 1;
    }
    normalizeObjectArray(item.children).forEach((child) => {
      total += 1;
      if (child.checked) {
        checked += 1;
      }
    });
  });
  return { total, checked };
}

function syncTransferSectionChecked(section = {}) {
  const { checked } = getTransferLeafStats(section);
  section.checked = checked > 0;
}

function sanitizePresenceTransferStateForPlaces(value = {}, commonPlaces = []) {
  const normalized = normalizePresenceTransferState(value);
  const validPlaceIds = new Set(
    normalizeObjectArray(commonPlaces)
      .map((place) => String(place.id || "").trim())
      .filter(Boolean)
  );
  const sanitizeEntry = (entry) => {
    const resolved = normalizePresenceTransferEntry(entry);
    return {
      ...resolved,
      placeId: validPlaceIds.has(resolved.placeId) ? resolved.placeId : "",
      fromPlaceId: validPlaceIds.has(resolved.fromPlaceId) ? resolved.fromPlaceId : "",
      toPlaceId: validPlaceIds.has(resolved.toPlaceId) ? resolved.toPlaceId : ""
    };
  };

  return {
    userGlobal: sanitizeEntry(normalized.userGlobal),
    userByContact: Object.fromEntries(
      Object.entries(normalized.userByContact).map(([contactId, entry]) => [
        contactId,
        sanitizeEntry(entry)
      ])
    ),
    contacts: Object.fromEntries(
      Object.entries(normalized.contacts).map(([contactId, entry]) => [
        contactId,
        sanitizeEntry(entry)
      ])
    )
  };
}

function sanitizeForumRepostSourceTransferValue(source = {}) {
  if (!source || typeof source !== "object") {
    return null;
  }
  const text = String(source.text || "").trim();
  const imageDataUrl = String(source.imageDataUrl || source.imageUrl || "").trim();
  const tags = normalizeObjectArray(source.tags)
    .map((item) => String(item || "").trim())
    .filter(Boolean)
    .slice(0, 5);
  if (!text && !imageDataUrl) {
    return null;
  }
  return {
    id: String(source.id || "").trim(),
    displayName: String(source.displayName || source.username || "论坛用户").trim() || "论坛用户",
    handle: String(source.handle || source.userId || "@forum_user").trim() || "@forum_user",
    text,
    imageDataUrl,
    tags,
    time: String(source.time || "").trim(),
    createdAt: Number(source.createdAt) || 0
  };
}

function sanitizeForumPostTransferValue(post = {}, fallbackFeedType = "entertainment") {
  if (!post || typeof post !== "object") {
    return null;
  }
  const resolvedFeedType =
    String(post.feedType || fallbackFeedType || "entertainment").trim() || "entertainment";
  const text = typeof post.text === "string" ? post.text.trim() : String(post.text || "").trim();
  const imageDataUrl = String(post.imageDataUrl || post.imageUrl || "").trim();
  const repostSource = sanitizeForumRepostSourceTransferValue(post.repostSource);
  if (!text && !imageDataUrl && !repostSource) {
    return null;
  }
  return {
    id: String(post.id || "").trim(),
    displayName: String(post.displayName || "论坛用户").trim() || "论坛用户",
    handle: String(post.handle || "@forum_user").trim() || "@forum_user",
    text,
    imageDataUrl,
    tags: normalizeObjectArray(post.tags)
      .map((item) => String(item || "").trim())
      .filter(Boolean)
      .slice(0, 5),
    replies: String(post.replies || "").trim(),
    reposts: String(post.reposts || "").trim(),
    likes: String(post.likes || "").trim(),
    views: String(post.views || "").trim(),
    time: String(post.time || "").trim(),
    createdAt: Number(post.createdAt) || 0,
    edited: Boolean(post.edited),
    authorOwned: Boolean(post.authorOwned),
    feedType: resolvedFeedType,
    repostSource
  };
}

function sanitizeForumFeedPostsTransferValue(feeds = {}) {
  const normalized = {};
  Object.entries(feeds || {}).forEach(([feedType, posts]) => {
    const items = normalizeObjectArray(posts)
      .map((post) => sanitizeForumPostTransferValue(post, feedType))
      .filter(Boolean);
    if (items.length) {
      normalized[String(feedType || "").trim() || "entertainment"] = items;
    }
  });
  return normalized;
}

function sanitizePlotThreadTransferValue(thread = {}) {
  if (!thread || typeof thread !== "object") {
    return null;
  }
  const participants = normalizeObjectArray(thread.participants)
    .map((item) => ({
      id: String(item.id || "").trim(),
      type: String(item.type || "").trim() === "user" ? "user" : "contact",
      name: String(item.name || "").trim(),
      avatarImage: String(item.avatarImage || "").trim(),
      avatarText: String(item.avatarText || "").trim(),
      personaPrompt: String(item.personaPrompt || "").trim(),
      specialUserPersona: String(item.specialUserPersona || "").trim()
    }))
    .filter((item) => item.name);
  const customCharacters = normalizeObjectArray(thread.customCharacters)
    .map((item) => ({
      id: String(item.id || "").trim(),
      name: String(item.name || "").trim(),
      role: String(item.role || "").trim(),
      persona: String(item.persona || "").trim()
    }))
    .filter((item) => item.name || item.role || item.persona);
  const messages = normalizeObjectArray(thread.messages)
    .map((item) => ({
      id: String(item.id || "").trim(),
      role: String(item.role || "").trim() === "assistant" ? "assistant" : "user",
      text: String(item.text || "").trim(),
      createdAt: Number(item.createdAt) || 0
    }))
    .filter((item) => item.text);
  const openingPlot = String(thread.openingPlot || "").trim();
  const title = String(thread.title || "").trim();
  if (!title && !openingPlot && !messages.length) {
    return null;
  }
  return {
    id: String(thread.id || "").trim(),
    title,
    summary: String(thread.summary || "").trim(),
    openingPlot,
    participants,
    customCharacters,
    messages,
    createdAt: Number(thread.createdAt) || 0,
    updatedAt: Number(thread.updatedAt) || 0
  };
}

function getForumPostTransferFeedLabel(feedType = "", forumPayload = null) {
  const resolvedFeedType = String(feedType || "").trim();
  if (!resolvedFeedType || resolvedFeedType === "entertainment") {
    return "首页 / 页签主贴";
  }
  const customTabs = normalizeObjectArray(forumPayload?.customTabs || loadSettings().customTabs || []);
  const matchedTab = customTabs.find((tab) => String(tab.id || "").trim() === resolvedFeedType);
  return matchedTab?.name ? `${matchedTab.name} 主贴` : `${resolvedFeedType} 主贴`;
}

function mergeForumPostList(existing = [], incoming = []) {
  const merged = new Map();
  normalizeObjectArray(existing)
    .map((item) => sanitizeForumPostTransferValue(item, item?.feedType))
    .filter(Boolean)
    .forEach((item, index) => {
      const itemId = String(item.id || `forum_post_existing_${index}`).trim();
      merged.set(itemId, item);
    });
  normalizeObjectArray(incoming)
    .map((item) => sanitizeForumPostTransferValue(item, item?.feedType))
    .filter(Boolean)
    .forEach((item, index) => {
      const itemId = String(item.id || `forum_post_incoming_${index}`).trim();
      const current = merged.get(itemId);
      merged.set(itemId, current ? { ...current, ...item } : item);
    });
  return [...merged.values()].sort(
    (left, right) =>
      (Number(right.createdAt) || 0) - (Number(left.createdAt) || 0) ||
      String(left.id || "").localeCompare(String(right.id || ""))
  );
}

function mergeForumFeedPostBuckets(existing = {}, incoming = {}) {
  const normalized = sanitizeForumFeedPostsTransferValue(existing);
  Object.entries(sanitizeForumFeedPostsTransferValue(incoming)).forEach(([feedType, posts]) => {
    normalized[feedType] = mergeForumPostList(normalized[feedType] || [], posts);
  });
  return normalized;
}

function mergePlotThreadTransferItems(existing = [], incoming = []) {
  const merged = new Map();
  normalizeObjectArray(existing)
    .map((item) => sanitizePlotThreadTransferValue(item))
    .filter(Boolean)
    .forEach((item, index) => {
      const itemId = String(item.id || `plot_thread_existing_${index}`).trim();
      merged.set(itemId, item);
    });
  normalizeObjectArray(incoming)
    .map((item) => sanitizePlotThreadTransferValue(item))
    .filter(Boolean)
    .forEach((item, index) => {
      const itemId = String(item.id || `plot_thread_incoming_${index}`).trim();
      const current = merged.get(itemId);
      if (!current) {
        merged.set(itemId, item);
        return;
      }
      merged.set(itemId, {
        ...current,
        ...item,
        participants: item.participants?.length ? item.participants : current.participants,
        customCharacters: item.customCharacters?.length
          ? item.customCharacters
          : current.customCharacters,
        messages: item.messages?.length ? item.messages : current.messages,
        updatedAt: Math.max(Number(current.updatedAt) || 0, Number(item.updatedAt) || 0)
      });
    });
  return [...merged.values()].sort(
    (left, right) =>
      (Number(right.updatedAt) || 0) - (Number(left.updatedAt) || 0) ||
      String(left.id || "").localeCompare(String(right.id || ""))
  );
}

function buildTransferPayloadFromCurrentState() {
  const settings = loadSettings();
  const profile = readStoredJson(PROFILE_KEY, {}) || {};
  const chatProfile = pickChatProfilePayload(profile);
  const worldbooks = readStoredJson(WORLD_BOOKS_KEY, { categories: [], entries: [] }) || {};
  const contacts = readStoredJson(MESSAGE_CONTACTS_KEY, []) || [];
  const messageThreads = readStoredJson(MESSAGE_THREADS_KEY, []) || [];
  const messageMemories = readStoredJson(MESSAGE_MEMORIES_KEY, []) || [];
  const forumFeedPosts = readStoredJson(POSTS_KEY, {}) || {};
  const forumProfilePosts = readStoredJson(PROFILE_POSTS_KEY, []) || [];
  const plotThreads = readStoredJson(PLOT_THREADS_KEY, []) || [];
  const scheduleEntries = readStoredJson(SCHEDULE_ENTRIES_KEY, []) || [];
  const commonPlaces = readStoredJson(MESSAGE_COMMON_PLACES_KEY, []) || [];
  const presenceState =
    readStoredJson(MESSAGE_PRESENCE_STATE_KEY, {
      userGlobal: {},
      userByContact: {},
      contacts: {}
    }) || {};
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
    forumPosts: {
      feeds: sanitizeForumFeedPostsTransferValue(forumFeedPosts),
      profilePosts: normalizeObjectArray(forumProfilePosts)
        .map((item) => sanitizeForumPostTransferValue(item, item?.feedType || "profile"))
        .filter(Boolean)
    },
    chatPersona: chatProfile,
    worldbooks: {
      categories: normalizeObjectArray(worldbooks.categories),
      entries: normalizeObjectArray(worldbooks.entries).filter(
        (item) => String(item.name || "").trim() && String(item.text || "").trim()
      )
    },
    contacts: {
      contacts: normalizeObjectArray(contacts).filter((item) => String(item.name || "").trim()),
      chatThreads: normalizeConversationThreadPayloadItems(messageThreads)
    },
    memories: {
      entries: mergeMessageMemories([], messageMemories)
    },
    schedules: {
      entries: normalizeObjectArray(scheduleEntries).filter(
        (item) => String(item.title || "").trim() && String(item.date || "").trim()
      )
    },
    plotThreads: normalizeObjectArray(plotThreads)
      .map((item) => sanitizePlotThreadTransferValue(item))
      .filter(Boolean),
    commonPlaces: {
      entries: normalizeObjectArray(commonPlaces).filter((item) => String(item.name || "").trim())
    },
    presenceState:
      presenceState && typeof presenceState === "object"
        ? {
            userGlobal:
              presenceState.userGlobal && typeof presenceState.userGlobal === "object"
                ? { ...presenceState.userGlobal }
                : {},
            userByContact:
              presenceState.userByContact && typeof presenceState.userByContact === "object"
                ? { ...presenceState.userByContact }
                : {},
            contacts:
              presenceState.contacts && typeof presenceState.contacts === "object"
                ? { ...presenceState.contacts }
                : {}
          }
        : null,
    privacyAllowlist: normalizePrivacyAllowlist(settings.privacyAllowlist || []),
    privacyAllowlistMeta: loadPrivacyAllowlistMetaItems(),
    contactChatSettings:
      (settings.messagePromptSettings && typeof settings.messagePromptSettings === "object") ||
      (settings.chatGlobalSettings && typeof settings.chatGlobalSettings === "object") ||
      Array.isArray(messageThreads)
        ? {
            promptSettings:
              settings.messagePromptSettings && typeof settings.messagePromptSettings === "object"
                ? { ...settings.messagePromptSettings }
                : {},
            chatGlobalSettings:
              settings.chatGlobalSettings && typeof settings.chatGlobalSettings === "object"
                ? { ...settings.chatGlobalSettings }
                : {},
            conversations: normalizeObjectArray(messageThreads)
              .map((item) => pickConversationChatSettingsPayload(item))
              .filter(Boolean)
          }
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

function normalizePrivacyAllowlistCategory(value = "", fallbackText = "") {
  const detected = window.PulsePrivacyCover?.detectCategory
    ? window.PulsePrivacyCover.detectCategory(fallbackText, value)
    : String(value || "").trim().toUpperCase();
  if (detected === "NAME" || detected === "TITLE") {
    return detected;
  }
  return "TERM";
}

function normalizePrivacyNameAliasLevel(value = "") {
  if (window.PulsePrivacyCover?.normalizeNameAliasLevel) {
    return window.PulsePrivacyCover.normalizeNameAliasLevel(value);
  }
  const normalized = String(value || "").trim().toUpperCase();
  return ["FULL", "COMMON", "NICK", "PET", "HONOR"].includes(normalized)
    ? normalized
    : "COMMON";
}

function normalizePrivacyNameGroupId(value = "", fallbackText = "") {
  return String(value || "").trim().slice(0, 40) || String(fallbackText || "").trim().slice(0, 40);
}

function getPrivacyAllowlistCategoryLabel(category = "") {
  if (category === "NAME") {
    return "人名";
  }
  if (category === "TITLE") {
    return "标题";
  }
  return "普通词";
}

function getPrivacyNameLevelLabel(level = "") {
  const map = {
    FULL: "全名",
    COMMON: "常规",
    NICK: "昵称",
    PET: "爱称",
    HONOR: "称谓"
  };
  return map[normalizePrivacyNameAliasLevel(level)] || "常规";
}

function getPrivacyLogSourceLabel(source = "") {
  if (source === "discussion") {
    return "论坛";
  }
  if (source === "bubble") {
    return "Bubble";
  }
  if (source === "messages") {
    return "Message";
  }
  if (source === "raising") {
    return "养崽";
  }
  return String(source || "未知").trim() || "未知";
}

function getPrivacyLogActionLabel(action = "") {
  const map = {
    generate_posts: "生成帖子",
    generate_replies: "生成回复",
    translate_post: "翻译帖子",
    translate_reply: "翻译回复",
    chat_reply: "聊天回复",
    chat_reply_regenerate: "重回回复",
    chat_memory_summary: "记忆总结",
    chat_auto_schedule_generate: "自动生成行程",
    journal_entry: "日记生成",
    fan_reply_generate: "粉丝回复生成",
    fan_reply_translate: "粉丝回复翻译",
    kid_archive_generate: "成长档案生成",
    schedule_invite: "日程邀请"
  };
  return map[action] || String(action || "请求").trim() || "请求";
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
      source: normalizePrivacyAllowlistItemSource(item.source),
      category: normalizePrivacyAllowlistCategory(item.category, item.text),
      nameGroupId: normalizePrivacyNameGroupId(item.nameGroupId, item.text),
      nameLevel: normalizePrivacyNameAliasLevel(item.nameLevel)
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

function getEffectivePrivacyAllowlistTerms(settings = loadSettings({ forceActiveConfig: false })) {
  return normalizePrivacyAllowlist([
    ...(window.PulsePrivacyAllowlistDefaults || []),
    ...loadStoredPrivacyAllowlistTerms(),
    ...(settings?.privacyAllowlist || [])
  ]);
}

function persistStoredPrivacyAllowlistTerms(terms = []) {
  safeSetItem(
    PRIVACY_ALLOWLIST_TERMS_KEY,
    JSON.stringify(normalizePrivacyAllowlist(terms))
  );
}

function loadStoredPrivacyIgnorelistTerms() {
  return normalizePrivacyAllowlist(readStoredJson(PRIVACY_IGNORELIST_TERMS_KEY, []));
}

function persistStoredPrivacyIgnorelistTerms(terms = []) {
  safeSetItem(
    PRIVACY_IGNORELIST_TERMS_KEY,
    JSON.stringify(normalizePrivacyAllowlist(terms))
  );
}

function readPrivacyRecentHitsSince() {
  return Number(readStoredJson(PRIVACY_RECENT_HITS_SINCE_KEY, 0)) || 0;
}

function persistPrivacyRecentHitsSince(value = 0) {
  const timestamp = Number(value) || 0;
  safeSetItem(PRIVACY_RECENT_HITS_SINCE_KEY, JSON.stringify(timestamp));
  return timestamp;
}

function loadDismissedPrivacyRecentHitIds() {
  return normalizePrivacyAllowlist(readStoredJson(PRIVACY_RECENT_HITS_DISMISSED_KEY, []));
}

function persistDismissedPrivacyRecentHitIds(ids = []) {
  const normalizedIds = normalizePrivacyAllowlist(ids);
  safeSetItem(PRIVACY_RECENT_HITS_DISMISSED_KEY, JSON.stringify(normalizedIds));
  return normalizedIds;
}

function dismissPrivacyRecentHitItem(itemId = "") {
  const resolvedItemId = String(itemId || "").trim();
  if (!resolvedItemId) {
    return [];
  }
  const dismissedIds = new Set(loadDismissedPrivacyRecentHitIds());
  dismissedIds.add(resolvedItemId);
  const nextIds = persistDismissedPrivacyRecentHitIds([...dismissedIds]);
  homeState.privacyRecentHitItems = homeState.privacyRecentHitItems.filter(
    (item) => item.id !== resolvedItemId
  );
  return nextIds;
}

function resetPrivacyRecentHitsBaseline(value = Date.now()) {
  const nextValue = persistPrivacyRecentHitsSince(value);
  persistDismissedPrivacyRecentHitIds([]);
  homeState.privacyRecentHitItems = loadRecentPrivacyHitItems();
  return nextValue;
}

function normalizePrivacyIgnorelistItems(items = []) {
  const unique = new Set();
  return normalizeObjectArray(items)
    .map((item) => ({
      id: String(item.id || buildPrivacyItemId(item.text || "", "privacy_ignore")).trim(),
      text: String(item.text || "").trim()
    }))
    .filter((item) => {
      if (!item.text || unique.has(item.text)) {
        return false;
      }
      unique.add(item.text);
      return true;
    });
}

function loadPrivacyIgnorelistItems() {
  return loadStoredPrivacyIgnorelistTerms().map((text) => ({
    id: buildPrivacyItemId(text, "privacy_ignore"),
    text
  }));
}

function persistPrivacyIgnorelistItems(items = []) {
  const normalizedItems = normalizePrivacyIgnorelistItems(items);
  persistStoredPrivacyIgnorelistTerms(normalizedItems.map((item) => item.text));
  homeState.privacyIgnorelistItems = normalizedItems;
  refreshPrivacyRecentHitItems();
  persistPrivacyPendingCandidates(
    homeState.privacyPendingCandidates,
    homeState.privacyAllowlistItems.map((item) => item.text),
    normalizedItems.map((item) => item.text)
  );
}

function normalizePrivacyRecentHitItems(items = []) {
  const unique = new Set();
  return normalizeObjectArray(items)
    .map((item, index) => ({
      id: String(item.id || buildPrivacyItemId(`${item.text || ""}_${index}`, "privacy_recent")).trim(),
      text: String(item.text || "").trim(),
      placeholder: String(item.placeholder || "").trim(),
      category: String(item.category || "TERM").trim() || "TERM",
      source: String(item.source || "").trim() || "未记录",
      createdAt: Number(item.createdAt) || 0,
      logId: String(item.logId || "").trim()
    }))
    .filter((item) => {
      if (!item.text || unique.has(item.text)) {
        return false;
      }
      unique.add(item.text);
      return true;
    });
}

function loadRecentPrivacyHitItems(limit = 80) {
  const logs = window.PulseApiLog?.read ? window.PulseApiLog.read() : [];
  const since = readPrivacyRecentHitsSince();
  const dismissedIds = new Set(loadDismissedPrivacyRecentHitIds());
  const result = [];
  logs
    .slice()
    .reverse()
    .forEach((entry) => {
      const createdAt = Number(entry?.createdAt) || 0;
      if (since && createdAt && createdAt < since) {
        return;
      }
      const session = window.PulseApiLog?.getPrivacySession
        ? window.PulseApiLog.getPrivacySession(entry.id)
        : null;
      const replacements = Array.isArray(session?.replacements) ? session.replacements : [];
      replacements.forEach((replacement, index) => {
        const text = String(replacement?.raw || "").trim();
        if (!text) {
          return;
        }
        result.push({
          id: buildPrivacyItemId(`${entry.id}_${replacement.placeholder || text}_${index}`, "privacy_recent"),
          text,
          placeholder: String(replacement?.placeholder || "").trim(),
          category: String(replacement?.category || "TERM").trim() || "TERM",
          source: `${getPrivacyLogSourceLabel(entry.source)} · ${getPrivacyLogActionLabel(entry.action)}`,
          createdAt,
          logId: String(entry.id || "").trim()
        });
      });
    });
  return normalizePrivacyRecentHitItems(result)
    .filter((item) => !dismissedIds.has(item.id))
    .slice(0, limit);
}

function refreshPrivacyRecentHitItems(limit = 80) {
  const allowlistSet = new Set(homeState.privacyAllowlistItems.map((item) => item.text));
  const ignorelistSet = new Set(homeState.privacyIgnorelistItems.map((item) => item.text));
  homeState.privacyRecentHitItems = loadRecentPrivacyHitItems(limit).filter((item) => {
    const text = String(item.text || "").trim();
    return text && !allowlistSet.has(text) && !ignorelistSet.has(text);
  });
  return homeState.privacyRecentHitItems;
}

function loadPrivacyAllowlistMetaItems() {
  return normalizePrivacyAllowlistMetaItems(readStoredJson(PRIVACY_ALLOWLIST_META_KEY, []));
}

function persistPrivacyAllowlistMetaItems(items = []) {
  safeSetItem(PRIVACY_ALLOWLIST_META_KEY, JSON.stringify(normalizePrivacyAllowlistMetaItems(items)));
}

function loadPrivacyAllowlistItems() {
  const settings = loadSettings({ forceActiveConfig: false });
  const terms = getEffectivePrivacyAllowlistTerms(settings);
  const metaMap = new Map(
    loadPrivacyAllowlistMetaItems().map((item) => [item.text, item])
  );
  return terms.map((text) => ({
    id: buildPrivacyItemId(text, "privacy_allowlist"),
    text,
    source: normalizePrivacyAllowlistItemSource(metaMap.get(text)?.source || "manual"),
    category: normalizePrivacyAllowlistCategory(metaMap.get(text)?.category, text),
    nameGroupId: normalizePrivacyNameGroupId(metaMap.get(text)?.nameGroupId, text),
    nameLevel: normalizePrivacyNameAliasLevel(metaMap.get(text)?.nameLevel)
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
    const category = normalizePrivacyAllowlistCategory(item.category, text);
    indexMap.set(text, result.length);
    result.push({
      id: String(item.id || buildPrivacyItemId(text, "privacy_allowlist")).trim(),
      text,
      source,
      category,
      nameGroupId: category === "NAME" ? normalizePrivacyNameGroupId(item.nameGroupId, text) : "",
      nameLevel: category === "NAME" ? normalizePrivacyNameAliasLevel(item.nameLevel) : "COMMON"
    });
  });
  return result;
}

function normalizePrivacyPendingCandidates(candidates = [], allowlistTerms = [], ignorelistTerms = []) {
  const allowlist = new Set(normalizePrivacyAllowlist(allowlistTerms));
  const ignorelist = new Set(normalizePrivacyAllowlist(ignorelistTerms));
  const merged = [];
  const indexMap = new Map();
  normalizeObjectArray(candidates).forEach((item, index) => {
    const text = String(item.text || "").trim();
    if (!text || allowlist.has(text) || ignorelist.has(text)) {
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

function loadPrivacyPendingCandidates(allowlistTerms = [], ignorelistTerms = []) {
  return normalizePrivacyPendingCandidates(
    readStoredJson(PRIVACY_PENDING_SCAN_KEY, []),
    allowlistTerms,
    ignorelistTerms
  );
}

function persistPrivacyPendingCandidates(candidates = [], allowlistTerms = [], ignorelistTerms = []) {
  const normalized = normalizePrivacyPendingCandidates(candidates, allowlistTerms, ignorelistTerms);
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
      source: item.source,
      category: normalizePrivacyAllowlistCategory(item.category, item.text),
      nameGroupId: normalizePrivacyNameGroupId(item.nameGroupId, item.text),
      nameLevel: normalizePrivacyNameAliasLevel(item.nameLevel)
    }))
  );
  homeState.settings = buildNormalizedSettingsSnapshot(nextSettings, {
    forceActiveConfig: false
  });
  homeState.privacyAllowlistItems = normalizedItems;
  refreshPrivacyRecentHitItems();
  persistPrivacyPendingCandidates(
    homeState.privacyPendingCandidates,
    normalizedItems.map((item) => item.text),
    homeState.privacyIgnorelistItems.map((item) => item.text)
  );
}

function collectPrivacyScanTexts() {
  const settings = loadSettings({ forceActiveConfig: false });
  const profile = readStoredJson(PROFILE_KEY, {}) || {};
  const worldbooks = readStoredJson(WORLD_BOOKS_KEY, { categories: [], entries: [] }) || {};
  const contacts = normalizeObjectArray(readStoredJson(MESSAGE_CONTACTS_KEY, []));
  const commonPlaces = normalizeObjectArray(readStoredJson(MESSAGE_COMMON_PLACES_KEY, []));
  const texts = [];
  const counts = {
    rolePersona: 0,
    userPersona: 0,
    specialUserPersona: 0,
    worldbook: 0,
    forum: 0,
    commonPlace: 0
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

  commonPlaces.forEach((place) => {
    const placeName = String(place.name || "未命名地点").trim() || "未命名地点";
    pushText("commonPlace", place.name, `常用地点 · ${placeName} · 名称`);
    normalizePrivacyAllowlist(place.aliases || []).forEach((alias) => {
      pushText("commonPlace", alias, `常用地点 · ${placeName} · 别名`);
    });
    pushText("commonPlace", place.traitsText, `常用地点 · ${placeName} · 特殊性`);
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
  const ignorelistTerms = homeState.privacyIgnorelistItems.map((item) => item.text);
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
          !ignorelistTerms.includes(text) &&
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
  const groupedNameCount = items.filter((item) => item.category === "NAME").length;
  privacyAppWhitelistSummaryEl.textContent = total
    ? `共 ${total} 个白名单词条，其中手动 ${manualCount} 个、扫描确认 ${scanCount} 个；当前有 ${groupedNameCount} 个人名别称条目。直接修改会自动生效。`
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
          <div class="privacy-app-item__head privacy-app-item__head--single-action">
            <div class="privacy-app-item__meta">
              <span class="home-badge">${escapeHtml(item.source === "manual" ? "手动" : "扫描确认")}</span>
              <span class="home-badge">${escapeHtml(getPrivacyAllowlistCategoryLabel(item.category))}</span>
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
            <div class="privacy-app-item__meta privacy-app-item__meta--stacked">
              <label class="privacy-app-item__field">
                <span>类型</span>
                <select
                  class="privacy-app-item__select"
                  data-role="privacy-allowlist-category"
                  data-item-id="${escapeHtml(item.id)}"
                >
                  <option value="TERM" ${item.category === "TERM" ? "selected" : ""}>普通词</option>
                  <option value="TITLE" ${item.category === "TITLE" ? "selected" : ""}>标题</option>
                  <option value="NAME" ${item.category === "NAME" ? "selected" : ""}>人名</option>
                </select>
              </label>
              ${
                item.category === "NAME"
                  ? `
                    <label class="privacy-app-item__field">
                      <span>同一人分组</span>
                      <input
                        class="privacy-app-item__input privacy-app-item__input--compact"
                        type="text"
                        value="${escapeHtml(item.nameGroupId || item.text)}"
                        data-role="privacy-allowlist-name-group"
                        data-item-id="${escapeHtml(item.id)}"
                        placeholder="相同分组 = 同一个人"
                      />
                    </label>
                    <label class="privacy-app-item__field">
                      <span>称呼层级</span>
                      <select
                        class="privacy-app-item__select"
                        data-role="privacy-allowlist-name-level"
                        data-item-id="${escapeHtml(item.id)}"
                      >
                        <option value="FULL" ${item.nameLevel === "FULL" ? "selected" : ""}>全名</option>
                        <option value="COMMON" ${item.nameLevel === "COMMON" ? "selected" : ""}>常规</option>
                        <option value="NICK" ${item.nameLevel === "NICK" ? "selected" : ""}>昵称</option>
                        <option value="PET" ${item.nameLevel === "PET" ? "selected" : ""}>爱称</option>
                        <option value="HONOR" ${item.nameLevel === "HONOR" ? "selected" : ""}>称谓</option>
                      </select>
                    </label>
                  `
                  : ""
              }
            </div>
            <p class="privacy-app-item__hint">
              ${escapeHtml(
                item.category === "NAME"
                  ? "同一人物的多个称呼请设置成同一个“同一人分组”；称呼层级会保留亲密度差异。"
                  : item.source === "manual"
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

function renderPrivacyIgnorelistSummary() {
  if (!privacyAppIgnoreSummaryEl) {
    return;
  }
  const items = homeState.privacyIgnorelistItems;
  privacyAppIgnoreSummaryEl.textContent = items.length
    ? `当前有 ${items.length} 个自动屏蔽排除词；这些词之后不会再被自动隐私覆盖。`
    : "当前还没有自动屏蔽排除词。若最近命中里有误伤词，可直接加入这里。";
}

function renderPrivacyIgnorelistItems() {
  if (!privacyAppIgnoreListEl) {
    return;
  }
  const items = homeState.privacyIgnorelistItems;
  if (!items.length) {
    privacyAppIgnoreListEl.innerHTML =
      '<div class="privacy-app__empty">当前还没有自动屏蔽排除词。</div>';
    renderPrivacyIgnorelistSummary();
    return;
  }

  privacyAppIgnoreListEl.innerHTML = items
    .map(
      (item) => `
        <section class="home-transfer-group privacy-app-item">
          <div class="privacy-app-item__head privacy-app-item__head--single-action">
            <div class="privacy-app-item__meta">
              <span class="home-badge">排除</span>
            </div>
            <button
              class="home-chip home-chip--danger"
              type="button"
              data-action="remove-privacy-ignore-item"
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
              data-role="privacy-ignore-text"
              data-item-id="${escapeHtml(item.id)}"
              placeholder="输入排除词"
            />
            <p class="privacy-app-item__hint">加入这里后，这个词不会再被自动隐私覆盖。</p>
          </div>
        </section>
      `
    )
    .join("");
  renderPrivacyIgnorelistSummary();
}

function renderPrivacyRecentSummary() {
  if (!privacyAppRecentSummaryEl) {
    return;
  }
  const total = homeState.privacyRecentHitItems.length;
  privacyAppRecentSummaryEl.textContent = total
    ? `最近命中了 ${total} 个真实屏蔽词；加入白名单或加入排除后，只会移除对应词，不会整页清空。`
    : "当前还没有最近实际屏蔽词记录；先触发一次 API 请求再回来查看。";
}

function renderPrivacyRecentHitItems() {
  if (!privacyAppRecentListEl) {
    return;
  }
  const allowlistSet = new Set(homeState.privacyAllowlistItems.map((item) => item.text));
  const ignorelistSet = new Set(homeState.privacyIgnorelistItems.map((item) => item.text));
  const items = homeState.privacyRecentHitItems;
  if (!items.length) {
    privacyAppRecentListEl.innerHTML =
      '<div class="privacy-app__empty">当前还没有最近实际屏蔽词记录。</div>';
    renderPrivacyRecentSummary();
    return;
  }

  privacyAppRecentListEl.innerHTML = items
    .map((item) => {
      const text = String(item.text || "").trim();
      const inAllowlist = allowlistSet.has(text);
      const inIgnorelist = ignorelistSet.has(text);
      return `
        <section class="home-transfer-group privacy-app-item">
          <div class="privacy-app-item__head">
            <div class="home-transfer-group__meta">
              <span>${escapeHtml(item.placeholder || text)}</span>
              <span class="home-transfer-group__desc">${escapeHtml(item.source || "未记录")}</span>
            </div>
            <div class="privacy-app-item__actions">
              <button
                class="home-chip"
                type="button"
                data-action="add-recent-hit-to-allowlist"
                data-item-id="${escapeHtml(item.id)}"
                ${inAllowlist ? "disabled" : ""}
              >
                ${inAllowlist ? "已在白名单" : "加入白名单"}
              </button>
              <button
                class="home-chip"
                type="button"
                data-action="add-recent-hit-to-ignorelist"
                data-item-id="${escapeHtml(item.id)}"
                ${inIgnorelist ? "disabled" : ""}
              >
                ${inIgnorelist ? "已排除" : "加入排除"}
              </button>
            </div>
          </div>
          <div class="privacy-app-item__editor">
            <input
              class="privacy-app-item__input"
              type="text"
              value="${escapeHtml(text)}"
              data-role="privacy-recent-text"
              data-item-id="${escapeHtml(item.id)}"
              placeholder="可直接编辑最近命中的词"
            />
            <div class="privacy-app-item__meta">
              <span class="home-badge">${escapeHtml(item.category)}</span>
              <span class="home-field-hint">${escapeHtml(item.placeholder || "未记录占位符")}</span>
            </div>
          </div>
        </section>
      `;
    })
    .join("");
  renderPrivacyRecentSummary();
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
  renderPrivacyIgnorelistItems();
  renderPrivacyRecentHitItems();
  renderPrivacyPendingCandidates();
}

function refreshPrivacyAppFromStorage(options = {}) {
  if (!isPrivacyAppView()) {
    return;
  }
  const { preserveStatus = true } = options;
  const previousStatus = privacyAppStatusEl?.textContent || "";
  const previousTone = privacyAppStatusEl?.classList.contains("success")
    ? "success"
    : privacyAppStatusEl?.classList.contains("error")
      ? "error"
      : "";
  initPrivacyAppState();
  renderPrivacyApp();
  if (preserveStatus && previousStatus) {
    setPrivacyAppStatus(previousStatus, previousTone);
  }
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
  const normalizedValues = Array.isArray(value) ? value : [value];
  const nextItems = normalizePrivacyAllowlistItems([
    ...homeState.privacyAllowlistItems,
    ...normalizedValues.flatMap((item) => {
      if (typeof item === "string") {
        return normalizePrivacyAllowlist(item).map((text) => ({
          text,
          source
        }));
      }
      if (item && typeof item === "object") {
        const text = String(item.text || "").trim();
        if (!text) {
          return [];
        }
        return [
          {
            text,
            source: normalizePrivacyAllowlistItemSource(item.source || source),
            category: normalizePrivacyAllowlistCategory(item.category, text),
            nameGroupId: normalizePrivacyNameGroupId(item.nameGroupId, text),
            nameLevel: normalizePrivacyNameAliasLevel(item.nameLevel)
          }
        ];
      }
      return [];
    })
  ]);
  persistPrivacyAllowlistItems(nextItems);
  renderPrivacyApp();
}

function applyPrivacyPendingCandidates() {
  const selectedCandidates = homeState.privacyPendingCandidates
    .filter((item) => item.selected)
    .map((item) => ({
      text: String(item.text || "").trim(),
      source: "scan",
      category: normalizePrivacyAllowlistCategory(item.category, item.text)
    }))
    .filter((item) => item.text);

  if (!selectedCandidates.length) {
    setPrivacyAppStatus("请至少勾选一个非空的候选词。", "error");
    return;
  }

  addPrivacyAllowlistItemsByLines(selectedCandidates, "scan");
  const selectedTexts = new Set(selectedCandidates.map((item) => item.text));
  homeState.privacyPendingCandidates = homeState.privacyPendingCandidates.filter(
    (item) => !selectedTexts.has(String(item.text || "").trim())
  );
  persistPrivacyPendingCandidates(
    homeState.privacyPendingCandidates,
    homeState.privacyAllowlistItems.map((item) => item.text),
    homeState.privacyIgnorelistItems.map((item) => item.text)
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
    homeState.privacyAllowlistItems.map((item) => item.text),
    homeState.privacyIgnorelistItems.map((item) => item.text)
  );
  persistPrivacyPendingCandidates(
    homeState.privacyPendingCandidates,
    homeState.privacyAllowlistItems.map((item) => item.text),
    homeState.privacyIgnorelistItems.map((item) => item.text)
  );
  renderPrivacyPendingCandidates();

  const sourceCount =
    counts.rolePersona +
    counts.userPersona +
    counts.specialUserPersona +
    counts.worldbook +
    counts.forum +
    counts.commonPlace;
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

function removePrivacyIgnorelistItem(itemId) {
  homeState.privacyIgnorelistItems = homeState.privacyIgnorelistItems.filter((item) => item.id !== itemId);
  persistPrivacyIgnorelistItems(homeState.privacyIgnorelistItems);
  renderPrivacyApp();
  setPrivacyAppStatus("已从自动屏蔽排除词中删除该词条。", "success");
}

function addPrivacyIgnorelistItemsByLines(value) {
  const nextItems = normalizePrivacyIgnorelistItems([
    ...homeState.privacyIgnorelistItems,
    ...normalizePrivacyAllowlist(value).map((text) => ({
      text
    }))
  ]);
  persistPrivacyIgnorelistItems(nextItems);
  renderPrivacyApp();
}

function removePrivacyPendingItem(itemId) {
  homeState.privacyPendingCandidates = homeState.privacyPendingCandidates.filter(
    (item) => item.id !== itemId
  );
  persistPrivacyPendingCandidates(
    homeState.privacyPendingCandidates,
    homeState.privacyAllowlistItems.map((item) => item.text),
    homeState.privacyIgnorelistItems.map((item) => item.text)
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
  addPrivacyAllowlistItemsByLines(
    [
      {
        text: nextText,
        source: "scan",
        category: normalizePrivacyAllowlistCategory(targetItem?.category, nextText)
      }
    ],
    "scan"
  );
  persistPrivacyPendingCandidates(
    homeState.privacyPendingCandidates,
    homeState.privacyAllowlistItems.map((item) => item.text),
    homeState.privacyIgnorelistItems.map((item) => item.text)
  );
  renderPrivacyApp();
  setPrivacyAppStatus(`已将“${nextText}”加入白名单。`, "success");
}

function addRecentPrivacyHitToAllowlist(itemId) {
  const targetItem = homeState.privacyRecentHitItems.find((item) => item.id === itemId) || null;
  const nextText = String(targetItem?.text || "").trim();
  if (!nextText) {
    setPrivacyAppStatus("这个最近命中词为空，无法加入白名单。", "error");
    return;
  }
  addPrivacyAllowlistItemsByLines(
    [
      {
        text: nextText,
        source: "scan",
        category: normalizePrivacyAllowlistCategory(targetItem?.category, nextText)
      }
    ],
    "scan"
  );
  dismissPrivacyRecentHitItem(itemId);
  renderPrivacyApp();
  setPrivacyAppStatus(`已将“${nextText}”加入白名单。`, "success");
}

function addRecentPrivacyHitToIgnorelist(itemId) {
  const targetItem = homeState.privacyRecentHitItems.find((item) => item.id === itemId) || null;
  const nextText = String(targetItem?.text || "").trim();
  if (!nextText) {
    setPrivacyAppStatus("这个最近命中词为空，无法加入排除。", "error");
    return;
  }
  addPrivacyIgnorelistItemsByLines([nextText]);
  dismissPrivacyRecentHitItem(itemId);
  renderPrivacyApp();
  setPrivacyAppStatus(`已将“${nextText}”加入自动屏蔽排除词。`, "success");
}

function clearPrivacyRecentHits() {
  resetPrivacyRecentHitsBaseline();
  renderPrivacyRecentHitItems();
  setPrivacyAppStatus("已清空最近命中；后续只显示新的真实命中。", "success");
}

function handlePrivacyAllowlistInput(event) {
  const target = event.target;
  if (
    !(target instanceof HTMLInputElement) ||
    ![
      "privacy-allowlist-text",
      "privacy-allowlist-name-group"
    ].includes(target.dataset.role || "")
  ) {
    return;
  }
  const itemId = String(target.dataset.itemId || "").trim();
  if (!itemId) {
    return;
  }
  homeState.privacyAllowlistItems = homeState.privacyAllowlistItems.map((item) => {
    if (item.id !== itemId) {
      return item;
    }
    if (target.dataset.role === "privacy-allowlist-name-group") {
      return {
        ...item,
        nameGroupId: normalizePrivacyNameGroupId(target.value, item.text)
      };
    }
    return { ...item, text: String(target.value || "") };
  });
  persistPrivacyAllowlistItems(homeState.privacyAllowlistItems);
}

function handlePrivacyAllowlistChange(event) {
  const target = event.target;
  if (!(target instanceof HTMLInputElement || target instanceof HTMLSelectElement)) {
    return;
  }
  const role = String(target.dataset.role || "").trim();
  if (
    ![
      "privacy-allowlist-text",
      "privacy-allowlist-name-group",
      "privacy-allowlist-category",
      "privacy-allowlist-name-level"
    ].includes(role)
  ) {
    return;
  }
  const itemId = String(target.dataset.itemId || "").trim();
  if (!itemId) {
    return;
  }
  homeState.privacyAllowlistItems = homeState.privacyAllowlistItems.map((item) => {
    if (item.id !== itemId) {
      return item;
    }
    if (role === "privacy-allowlist-category") {
      const nextCategory = normalizePrivacyAllowlistCategory(target.value, item.text);
      return {
        ...item,
        category: nextCategory,
        nameGroupId:
          nextCategory === "NAME"
            ? normalizePrivacyNameGroupId(item.nameGroupId, item.text)
            : "",
        nameLevel: nextCategory === "NAME" ? normalizePrivacyNameAliasLevel(item.nameLevel) : "COMMON"
      };
    }
    if (role === "privacy-allowlist-name-level") {
      return {
        ...item,
        nameLevel: normalizePrivacyNameAliasLevel(target.value)
      };
    }
    if (role === "privacy-allowlist-name-group") {
      return {
        ...item,
        nameGroupId: normalizePrivacyNameGroupId(target.value, item.text)
      };
    }
    return {
      ...item,
      text: String(target.value || "").trim()
    };
  });
  persistPrivacyAllowlistItems(homeState.privacyAllowlistItems);
  renderPrivacyApp();
  setPrivacyAppStatus("白名单修改已生效。", "success");
}

function handlePrivacyIgnorelistInput(event) {
  const target = event.target;
  if (!(target instanceof HTMLInputElement) || target.dataset.role !== "privacy-ignore-text") {
    return;
  }
  const itemId = String(target.dataset.itemId || "").trim();
  if (!itemId) {
    return;
  }
  homeState.privacyIgnorelistItems = homeState.privacyIgnorelistItems.map((item) =>
    item.id === itemId ? { ...item, text: String(target.value || "") } : item
  );
  persistPrivacyIgnorelistItems(homeState.privacyIgnorelistItems);
}

function handlePrivacyIgnorelistChange(event) {
  const target = event.target;
  if (!(target instanceof HTMLInputElement) || target.dataset.role !== "privacy-ignore-text") {
    return;
  }
  persistPrivacyIgnorelistItems(homeState.privacyIgnorelistItems);
  renderPrivacyApp();
  setPrivacyAppStatus("自动屏蔽排除词修改已生效。", "success");
}

function handlePrivacyRecentHitChange(event) {
  const target = event.target;
  if (!(target instanceof HTMLInputElement) || target.dataset.role !== "privacy-recent-text") {
    return;
  }
  const itemId = String(target.dataset.itemId || "").trim();
  if (!itemId) {
    return;
  }
  homeState.privacyRecentHitItems = homeState.privacyRecentHitItems.map((item) =>
    item.id === itemId ? { ...item, text: String(target.value || "") } : item
  );
  if (event.type === "change") {
    renderPrivacyRecentHitItems();
    setPrivacyAppStatus("最近实际屏蔽词修改已更新，可直接加入白名单或加入排除。", "success");
  }
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
      homeState.privacyAllowlistItems.map((item) => item.text),
      homeState.privacyIgnorelistItems.map((item) => item.text)
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
      homeState.privacyAllowlistItems.map((item) => item.text),
      homeState.privacyIgnorelistItems.map((item) => item.text)
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
  } else if (actionEl.dataset.action === "remove-privacy-ignore-item") {
    removePrivacyIgnorelistItem(itemId);
  } else if (actionEl.dataset.action === "add-recent-hit-to-allowlist") {
    addRecentPrivacyHitToAllowlist(itemId);
  } else if (actionEl.dataset.action === "add-recent-hit-to-ignorelist") {
    addRecentPrivacyHitToIgnorelist(itemId);
  } else if (actionEl.dataset.action === "confirm-privacy-pending-item") {
    confirmPrivacyPendingItem(itemId);
  } else if (actionEl.dataset.action === "remove-privacy-pending-item") {
    removePrivacyPendingItem(itemId);
  }
}

function initPrivacyAppState() {
  if (!readPrivacyRecentHitsSince()) {
    persistPrivacyRecentHitsSince(Date.now());
  }
  homeState.settings = loadSettings({ forceActiveConfig: false });
  homeState.privacyAllowlistItems = loadPrivacyAllowlistItems();
  homeState.privacyIgnorelistItems = loadPrivacyIgnorelistItems();
  refreshPrivacyRecentHitItems();
  homeState.privacyPendingCandidates = loadPrivacyPendingCandidates(
    homeState.privacyAllowlistItems.map((item) => item.text),
    homeState.privacyIgnorelistItems.map((item) => item.text)
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
      forumPosts:
        source.forumPosts && typeof source.forumPosts === "object" ? source.forumPosts : null,
      chatPersona:
        source.chatPersona && typeof source.chatPersona === "object" ? source.chatPersona : null,
      worldbooks:
        source.worldbooks && typeof source.worldbooks === "object" ? source.worldbooks : null,
      contacts: source.contacts && typeof source.contacts === "object" ? source.contacts : null,
      memories: Array.isArray(source.memories)
        ? { entries: source.memories }
        : source.memories && typeof source.memories === "object"
          ? source.memories
          : null,
      schedules: source.schedules && typeof source.schedules === "object" ? source.schedules : null,
      plotThreads: Array.isArray(source.plotThreads) ? source.plotThreads : null,
      commonPlaces:
        source.commonPlaces && typeof source.commonPlaces === "object" ? source.commonPlaces : null,
      presenceState:
        source.presenceState && typeof source.presenceState === "object" ? source.presenceState : null,
      privacyAllowlist: normalizePrivacyAllowlist(source.privacyAllowlist || []),
      privacyAllowlistMeta: normalizePrivacyAllowlistMetaItems(source.privacyAllowlistMeta || []),
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
    forumPosts: null,
    chatPersona: hasAnyTextValue(pickChatProfilePayload(profile))
      ? pickChatProfilePayload(profile)
      : null,
    worldbooks: parsed.worldbooks && typeof parsed.worldbooks === "object" ? parsed.worldbooks : null,
    contacts: parsed.contacts && typeof parsed.contacts === "object" ? parsed.contacts : null,
    memories: Array.isArray(parsed.memories)
      ? { entries: parsed.memories }
      : parsed.memories && typeof parsed.memories === "object"
        ? parsed.memories
        : null,
    schedules: parsed.schedules && typeof parsed.schedules === "object" ? parsed.schedules : null,
    plotThreads: Array.isArray(parsed.plotThreads) ? parsed.plotThreads : null,
    commonPlaces:
      parsed.commonPlaces && typeof parsed.commonPlaces === "object" ? parsed.commonPlaces : null,
    presenceState:
      parsed.presenceState && typeof parsed.presenceState === "object" ? parsed.presenceState : null,
    privacyAllowlist: normalizePrivacyAllowlist(parsed.privacyAllowlist || []),
    privacyAllowlistMeta: normalizePrivacyAllowlistMetaItems(parsed.privacyAllowlistMeta || []),
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
  const forumFeedPostBuckets = sanitizeForumFeedPostsTransferValue(payload?.forumPosts?.feeds || {});
  const forumProfilePosts = normalizeObjectArray(payload?.forumPosts?.profilePosts || [])
    .map((item) => sanitizeForumPostTransferValue(item, item?.feedType || "profile"))
    .filter(Boolean);
  const contacts = normalizeObjectArray(payload?.contacts?.contacts).filter((item) =>
    String(item.name || "").trim()
  );
  const chatThreads = normalizeConversationThreadPayloadItems(payload?.contacts?.chatThreads || []);
  const chatThreadMap = new Map(
    chatThreads.map((thread) => [String(thread.contactId || "").trim(), thread])
  );
  const memoryEntries = mergeMessageMemories([], payload?.memories?.entries || []);
  const memoryItems = buildMemoryTransferItems(memoryEntries, contacts);
  const scheduleEntries = normalizeObjectArray(payload?.schedules?.entries).filter(
    (item) => String(item.title || "").trim() && String(item.date || "").trim()
  );
  const plotThreads = normalizeObjectArray(payload?.plotThreads || [])
    .map((item) => sanitizePlotThreadTransferValue(item))
    .filter(Boolean);
  const scheduleActorItems = buildScheduleActorTransferItems(scheduleEntries, contacts);
  const commonPlaceEntries = normalizeObjectArray(payload?.commonPlaces?.entries).filter((item) =>
    String(item.name || "").trim()
  );
  const privacyAllowlist = normalizePrivacyAllowlist(payload?.privacyAllowlist || []);
  const privacyAllowlistMeta = normalizePrivacyAllowlistMetaItems(payload?.privacyAllowlistMeta || []);
  const hasPresenceState = hasPresenceTransferStateData(payload?.presenceState || {});
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
      id: "forumPosts",
      label: "论坛主贴缓存",
      description: "论坛页已加载的主贴信息；不含回复树与翻译内容。",
      checked: Object.keys(forumFeedPostBuckets).length > 0 || forumProfilePosts.length > 0,
      disabled: Object.keys(forumFeedPostBuckets).length === 0 && forumProfilePosts.length === 0,
      items: [
        ...Object.entries(forumFeedPostBuckets).map(([feedType, posts]) => ({
          id: `${TRANSFER_FORUM_FEED_POSTS_PREFIX}${feedType}`,
          label: getForumPostTransferFeedLabel(feedType, payload?.forum),
          description: `${posts.length} 条主贴`,
          checked: true
        })),
        ...(forumProfilePosts.length
          ? [
              {
                id: TRANSFER_FORUM_PROFILE_POSTS_ITEM_ID,
                label: "个人主页主贴",
                description: `${forumProfilePosts.length} 条主贴`,
                checked: true
              }
            ]
          : [])
      ]
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
      description: "支持按联系人导入导出；联系人下可额外勾选是否附带该角色的聊天记录。",
      checked: contacts.length > 0,
      disabled: contacts.length === 0,
      items: contacts.map((contact) => {
        const contactId = String(contact.id || "").trim();
        const thread = chatThreadMap.get(contactId) || null;
        const chatMessageCount = normalizeObjectArray(thread?.messages).length;
        return {
          id: contactId,
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
          checked: true,
          children:
            chatMessageCount > 0
              ? [
                  {
                    id: `${TRANSFER_CONTACT_CHAT_HISTORY_PREFIX}${contactId}`,
                    label: "聊天记录",
                    description: `${chatMessageCount} 条消息`,
                    checked: mode === "import"
                  }
                ]
              : []
        };
      })
    },
    {
      id: "memories",
      label: "记忆",
      description: "按角色聚合导入导出核心记忆与情景记忆。",
      checked: memoryItems.length > 0,
      disabled: memoryItems.length === 0,
      items: memoryItems
    },
    {
      id: "schedules",
      label: "日程",
      description: "按用户 / 角色维度导入导出相关日程；会自动带出对应人的全部相关安排。",
      checked: scheduleActorItems.length > 0,
      disabled: scheduleActorItems.length === 0,
      items: scheduleActorItems
    },
    {
      id: "plotThreads",
      label: "历史剧情",
      description: "剧情页的历史剧情线与已生成正文。",
      checked: plotThreads.length > 0,
      disabled: plotThreads.length === 0,
      items: plotThreads.map((thread) => ({
        id: String(thread.id || "").trim(),
        label: String(thread.title || "剧情").trim() || "剧情",
        description: truncateText(
          String(thread.summary || thread.openingPlot || "尚未生成正文").trim() || "尚未生成正文",
          80
        ),
        checked: true
      }))
    },
    {
      id: "commonPlaces",
      label: "常用地点",
      description: "支持按地点局部导入导出；包含地点名称、别名、特殊性与可见角色。",
      checked: commonPlaceEntries.length > 0,
      disabled: commonPlaceEntries.length === 0,
      items: commonPlaceEntries.map((place) => ({
        id: String(place.id || "").trim(),
        label: String(place.name || "常用地点").trim() || "常用地点",
        description: truncateText(
          [
            buildCommonPlaceTransferDescription(place),
            String(place.traitsText || "").trim()
          ]
            .filter(Boolean)
            .join(" · "),
          80
        ),
        checked: true
      }))
    },
    {
      id: "presenceState",
      label: "地点状态",
      description: "用户与角色当前的“在某地 / 在路上”状态快照。",
      checked: hasPresenceState,
      disabled: !hasPresenceState,
      items: []
    },
    {
      id: "privacyAllowlist",
      label: "隐私白名单",
      description: "首页设置里手动补充的强制匿名化名单，以及人名同人分组 / 称呼层级元数据；代码内默认白名单不在这里导出。",
      checked: privacyAllowlist.length > 0 || privacyAllowlistMeta.length > 0,
      disabled: privacyAllowlist.length === 0 && privacyAllowlistMeta.length === 0,
      items: []
    },
    {
      id: "contactChatSettings",
      label: "通讯录对应的聊天设置",
      description: "1v1 聊天页右上角设置内的历史轮数、时间感知、热点挂载、世界书挂载与自动行程配置。",
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

  sections.forEach((section) => {
    syncTransferSectionChecked(section);
  });

  return sections.filter((section) => mode === "export" || !section.disabled);
}

function cloneTransferSections(sections = []) {
  return sections.map((section) => ({
    ...section,
    items: Array.isArray(section.items)
      ? section.items.map((item) => ({
          ...item,
          children: normalizeObjectArray(item.children).map((child) => ({ ...child }))
        }))
      : []
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
    section.items = section.items.map((item) => ({
      ...item,
      checked: Boolean(checked),
      children: normalizeObjectArray(item.children).map((child) => ({
        ...child,
        checked: Boolean(checked)
      }))
    }));
  }
}

function toggleTransferItemSelection(selection, sectionId, itemId, checked) {
  const section = getTransferSection(selection, sectionId);
  if (!section || section.disabled) {
    return;
  }
  section.items = section.items.map((item) => {
    if (item.id !== itemId) {
      return item;
    }
    return {
      ...item,
      checked: Boolean(checked),
      children: normalizeObjectArray(item.children).map((child) => ({
        ...child,
        checked: checked ? Boolean(child.checked) : false
      }))
    };
  });
  syncTransferSectionChecked(section);
}

function toggleTransferChildSelection(selection, sectionId, itemId, childId, checked) {
  const section = getTransferSection(selection, sectionId);
  if (!section || section.disabled) {
    return;
  }
  section.items = section.items.map((item) => {
    if (item.id !== itemId) {
      return item;
    }
    return {
      ...item,
      checked: item.checked || Boolean(checked),
      children: normalizeObjectArray(item.children).map((child) =>
        child.id === childId ? { ...child, checked: Boolean(checked) } : child
      )
    };
  });
  syncTransferSectionChecked(section);
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
  const { checked, total } = getTransferLeafStats(section);
  return `已选择 ${checked} / ${total}`;
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
                        <div class="home-transfer-item-wrap">
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
                          ${
                            normalizeObjectArray(item.children).length
                              ? `
                                <div class="home-transfer-subitems">
                                  ${normalizeObjectArray(item.children)
                                    .map(
                                      (child) => `
                                        <label class="home-transfer-subitem${
                                          !item.checked ? " is-disabled" : ""
                                        }">
                                          <input
                                            type="checkbox"
                                            data-scope="${escapeHtml(scope)}"
                                            data-role="item-child"
                                            data-section-id="${escapeHtml(section.id)}"
                                            data-item-id="${escapeHtml(item.id)}"
                                            data-child-id="${escapeHtml(child.id)}"
                                            ${child.checked ? "checked" : ""}
                                            ${section.disabled || !item.checked ? "disabled" : ""}
                                          />
                                          <span class="home-transfer-item__meta">
                                            <span class="home-transfer-item__title">${escapeHtml(child.label)}</span>
                                            <span class="home-transfer-item__desc">${escapeHtml(
                                              child.description || ""
                                            )}</span>
                                          </span>
                                        </label>
                                      `
                                    )
                                    .join("")}
                                </div>
                              `
                              : ""
                          }
                        </div>
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
    const { checked, total } = getTransferLeafStats(section);
    input.indeterminate = checked > 0 && checked < total;
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
    const stats = getTransferLeafStats(section);
    return total + stats.checked;
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
  setAllTransferSections(homeState.importTransferSelection, true);
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

  const forumPostsSection = sectionMap.get("forumPosts");
  if (forumPostsSection?.checked && payload.forumPosts) {
    const selectedIds = new Set(
      forumPostsSection.items.filter((item) => item.checked).map((item) => item.id)
    );
    const feeds = Object.fromEntries(
      Object.entries(sanitizeForumFeedPostsTransferValue(payload.forumPosts.feeds || {})).filter(
        ([feedType]) => selectedIds.has(`${TRANSFER_FORUM_FEED_POSTS_PREFIX}${feedType}`)
      )
    );
    const profilePosts = selectedIds.has(TRANSFER_FORUM_PROFILE_POSTS_ITEM_ID)
      ? normalizeObjectArray(payload.forumPosts.profilePosts)
          .map((item) => sanitizeForumPostTransferValue(item, item?.feedType || "profile"))
          .filter(Boolean)
      : [];
    if (Object.keys(feeds).length || profilePosts.length) {
      selected.forumPosts = {
        feeds,
        profilePosts
      };
    }
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
    const selectedChatHistoryIds = new Set(
      contactsSection.items
        .filter((item) => item.checked)
        .flatMap((item) =>
          normalizeObjectArray(item.children)
            .filter((child) => child.checked && String(child.id || "").startsWith(TRANSFER_CONTACT_CHAT_HISTORY_PREFIX))
            .map(() => item.id)
        )
    );
    selected.contacts = {
      contacts: normalizeObjectArray(payload.contacts.contacts).filter((contact) =>
        selectedIds.has(String(contact.id || "").trim())
      ),
      chatThreads: normalizeConversationThreadPayloadItems(payload.contacts.chatThreads || []).filter((thread) =>
        selectedChatHistoryIds.has(String(thread.contactId || "").trim())
      )
    };
  }

  const memoriesSection = sectionMap.get("memories");
  if (memoriesSection?.checked && payload.memories) {
    const selectedIds = new Set(
      memoriesSection.items.filter((item) => item.checked).map((item) => item.id)
    );
    const entries = mergeMessageMemories(
      [],
      normalizeObjectArray(payload.memories.entries).filter((entry) =>
        selectedIds.has(String(entry.contactId || "").trim())
      )
    );
    if (entries.length) {
      selected.memories = { entries };
    }
  }

  const schedulesSection = sectionMap.get("schedules");
  if (schedulesSection?.checked && payload.schedules) {
    const selectedScheduleIds = new Set(
      schedulesSection.items
        .filter((item) => item.checked)
        .flatMap((item) =>
          (Array.isArray(item.scheduleIds) ? item.scheduleIds : []).map((scheduleId) =>
            String(scheduleId || "").trim()
          )
        )
    );
    selected.schedules = {
      entries: normalizeObjectArray(payload.schedules.entries).filter((entry) =>
        selectedScheduleIds.has(String(entry.id || "").trim())
      )
    };
  }

  const plotThreadsSection = sectionMap.get("plotThreads");
  if (plotThreadsSection?.checked && Array.isArray(payload.plotThreads)) {
    const selectedIds = new Set(
      plotThreadsSection.items.filter((item) => item.checked).map((item) => item.id)
    );
    selected.plotThreads = normalizeObjectArray(payload.plotThreads)
      .map((item) => sanitizePlotThreadTransferValue(item))
      .filter((item) => item && selectedIds.has(String(item.id || "").trim()));
  }

  const commonPlacesSection = sectionMap.get("commonPlaces");
  if (commonPlacesSection?.checked && payload.commonPlaces) {
    const selectedIds = new Set(
      commonPlacesSection.items.filter((item) => item.checked).map((item) => item.id)
    );
    selected.commonPlaces = {
      entries: normalizeObjectArray(payload.commonPlaces.entries).filter((place) =>
        selectedIds.has(String(place.id || "").trim())
      )
    };
  }

  const presenceStateSection = sectionMap.get("presenceState");
  if (presenceStateSection?.checked && payload.presenceState) {
    selected.presenceState = normalizePresenceTransferState(payload.presenceState);
  }

  const privacyAllowlistSection = sectionMap.get("privacyAllowlist");
  if (privacyAllowlistSection?.checked) {
    const terms = normalizePrivacyAllowlist(payload.privacyAllowlist || []);
    const meta = normalizePrivacyAllowlistMetaItems(payload.privacyAllowlistMeta || []);
    if (terms.length) {
      selected.privacyAllowlist = terms;
    }
    if (meta.length) {
      selected.privacyAllowlistMeta = meta;
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
    version: 12,
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
  let nextForumFeeds = sanitizeForumFeedPostsTransferValue(readStoredJson(POSTS_KEY, {}) || {});
  let nextForumProfilePosts = normalizeObjectArray(readStoredJson(PROFILE_POSTS_KEY, []))
    .map((item) => sanitizeForumPostTransferValue(item, item?.feedType || "profile"))
    .filter(Boolean);
  let nextWorldbooks =
    readStoredJson(WORLD_BOOKS_KEY, {
      categories: [],
      entries: []
    }) || { categories: [], entries: [] };
  let nextContacts = normalizeObjectArray(readStoredJson(MESSAGE_CONTACTS_KEY, []));
  let nextMemories = mergeMessageMemories([], readStoredJson(MESSAGE_MEMORIES_KEY, []) || []);
  let nextSchedules = normalizeObjectArray(readStoredJson(SCHEDULE_ENTRIES_KEY, []));
  let nextPlotThreads = normalizeObjectArray(readStoredJson(PLOT_THREADS_KEY, []))
    .map((item) => sanitizePlotThreadTransferValue(item))
    .filter(Boolean);
  let nextCommonPlaces = normalizeObjectArray(readStoredJson(MESSAGE_COMMON_PLACES_KEY, []));
  let nextPresenceState = normalizePresenceTransferState(
    readStoredJson(MESSAGE_PRESENCE_STATE_KEY, {
      userGlobal: {},
      userByContact: {},
      contacts: {}
    }) || {}
  );
  let nextMessageThreads = normalizeObjectArray(readStoredJson(MESSAGE_THREADS_KEY, []));

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

  if (imported.forumPosts && typeof imported.forumPosts === "object") {
    nextForumFeeds = mergeForumFeedPostBuckets(nextForumFeeds, imported.forumPosts.feeds || {});
    nextForumProfilePosts = mergeForumPostList(
      nextForumProfilePosts,
      imported.forumPosts.profilePosts || []
    );
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
    if (Array.isArray(imported.contacts.chatThreads)) {
      nextMessageThreads = mergeConversationThreads(
        nextMessageThreads,
        imported.contacts.chatThreads,
        nextContacts
      );
    }
  }

  if (imported.memories) {
    nextMemories = mergeMessageMemories(nextMemories, imported.memories.entries);
  }

  if (imported.schedules) {
    nextSchedules = mergeById(nextSchedules, imported.schedules.entries);
  }

  if (Array.isArray(imported.plotThreads)) {
    nextPlotThreads = mergePlotThreadTransferItems(nextPlotThreads, imported.plotThreads);
  }

  if (imported.commonPlaces) {
    nextCommonPlaces = mergeById(nextCommonPlaces, imported.commonPlaces.entries);
  }

  if (imported.presenceState && typeof imported.presenceState === "object") {
    nextPresenceState = normalizePresenceTransferState(imported.presenceState);
  }

  const shouldApplyPrivacyAllowlist =
    Object.prototype.hasOwnProperty.call(imported, "privacyAllowlist") ||
    Object.prototype.hasOwnProperty.call(imported, "privacyAllowlistMeta");

  if (Array.isArray(imported.privacyAllowlist) || typeof imported.privacyAllowlist === "string") {
    nextSettings.privacyAllowlist = normalizePrivacyAllowlist(imported.privacyAllowlist);
  }
  const importedPrivacyAllowlistMeta = normalizePrivacyAllowlistMetaItems(
    imported.privacyAllowlistMeta || []
  );

  if (imported.contactChatSettings && typeof imported.contactChatSettings === "object") {
    const nestedPromptSettings =
      imported.contactChatSettings.promptSettings &&
      typeof imported.contactChatSettings.promptSettings === "object"
        ? imported.contactChatSettings.promptSettings
        : null;
    const legacyPromptSettings =
      !nestedPromptSettings &&
      !Object.prototype.hasOwnProperty.call(imported.contactChatSettings, "chatGlobalSettings") &&
      !Object.prototype.hasOwnProperty.call(imported.contactChatSettings, "conversations")
        ? imported.contactChatSettings
        : null;

    if (nestedPromptSettings || legacyPromptSettings) {
      nextSettings.messagePromptSettings = {
        ...(nestedPromptSettings || legacyPromptSettings)
      };
    }
    if (
      imported.contactChatSettings.chatGlobalSettings &&
      typeof imported.contactChatSettings.chatGlobalSettings === "object"
    ) {
      nextSettings.chatGlobalSettings = normalizeChatGlobalSettings(
        imported.contactChatSettings.chatGlobalSettings
      );
    }
    if (Array.isArray(imported.contactChatSettings.conversations)) {
      nextMessageThreads = mergeConversationChatSettings(
        nextMessageThreads,
        imported.contactChatSettings.conversations,
        nextContacts
      );
    }
  }

  if (imported.bubbleMountSettings && typeof imported.bubbleMountSettings === "object") {
    nextSettings.bubblePromptSettings = {
      ...imported.bubbleMountSettings
    };
  }

  nextSettings = buildNormalizedSettingsSnapshot(nextSettings, {
    forceActiveConfig: Boolean(imported.apiConfig || imported.apiSecrets)
  });
  nextPresenceState = sanitizePresenceTransferStateForPlaces(nextPresenceState, nextCommonPlaces);

  safeSetItem(SETTINGS_KEY, JSON.stringify(nextSettings));
  safeSetItem(PROFILE_KEY, JSON.stringify(nextProfile));
  safeSetItem(POSTS_KEY, JSON.stringify(nextForumFeeds));
  safeSetItem(PROFILE_POSTS_KEY, JSON.stringify(nextForumProfilePosts));
  safeSetItem(WORLD_BOOKS_KEY, JSON.stringify(nextWorldbooks));
  safeSetItem(MESSAGE_CONTACTS_KEY, JSON.stringify(nextContacts));
  safeSetItem(MESSAGE_MEMORIES_KEY, JSON.stringify(nextMemories));
  safeSetItem(SCHEDULE_ENTRIES_KEY, JSON.stringify(nextSchedules));
  safeSetItem(PLOT_THREADS_KEY, JSON.stringify(nextPlotThreads));
  safeSetItem(MESSAGE_COMMON_PLACES_KEY, JSON.stringify(nextCommonPlaces));
  safeSetItem(MESSAGE_PRESENCE_STATE_KEY, JSON.stringify(nextPresenceState));
  safeSetItem(MESSAGE_THREADS_KEY, JSON.stringify(nextMessageThreads));
  if (shouldApplyPrivacyAllowlist) {
    persistPrivacyAllowlistMetaItems(importedPrivacyAllowlistMeta);
    persistStoredPrivacyAllowlistTerms(nextSettings.privacyAllowlist || []);
    resetPrivacyRecentHitsBaseline();
  }

  homeState.settings = loadSettings();
  persistSettings(homeState.settings);
  applySettingsToHomeForm(homeState.settings);
  syncHomeActiveConfigSummary();
  renderHomeEffectiveTime(homeState.settings);
  if (homeState.timeModalOpen) {
    renderHomeTimeModal();
  }
  if (homeState.rulesModalOpen) {
    renderHomeRulesModal();
  }
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
  if (homeNegativePromptInputEl) {
    homeNegativePromptInputEl.value = normalizeNegativePromptConstraints(
      settings.negativePromptConstraints || []
    ).join("\n");
  }
  updateHomeModeUI();
  renderHomeApiConfigList();
  syncHomeActiveConfigSummary();
}

function readHomeSettingsFromForm() {
  const mode = normalizeApiMode(homeApiModeSelect?.value);
  const negativePromptConstraints = homeNegativePromptInputEl
    ? normalizeNegativePromptConstraints(homeNegativePromptInputEl.value)
    : normalizeNegativePromptConstraints(homeState.settings.negativePromptConstraints || []);
  return {
    ...homeState.settings,
    mode,
    endpoint: normalizeSettingsEndpointByMode(mode, homeApiEndpointInput?.value),
    token: normalizeApiConfigToken(homeApiTokenInput?.value),
    model:
      mode === "generic"
        ? ""
        : String(homeApiModelInput?.value || "").trim() || getDefaultModelByMode(mode),
    negativePromptConstraints,
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
    if (homeState.timeModalOpen) {
      setHomeTimeModalOpen(false);
    }
    if (homeState.rulesModalOpen) {
      setHomeRulesModalOpen(false);
    }
    if (homeState.rulesNegativeModalOpen) {
      setHomeRulesNegativeModalOpen(false);
    }
    homeState.settings = loadSettings();
    applySettingsToHomeForm(homeState.settings);
    renderHomeEffectiveTime(homeState.settings);
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

function renderHomeTimeModal() {
  const manualTimeSettings = normalizeHomeManualTimeSettings(homeState.settings);
  const fallbackPromptNow =
    typeof window.PulsePromptConfig?.resolvePromptNow === "function"
      ? window.PulsePromptConfig.resolvePromptNow(homeState.settings, new Date())
      : new Date();
  const inputValue =
    typeof window.PulsePromptConfig?.formatDateTimeInputValue === "function"
      ? window.PulsePromptConfig.formatDateTimeInputValue(fallbackPromptNow)
      : "";

  if (homeTimeEnabledEl) {
    homeTimeEnabledEl.checked = manualTimeSettings.enabled;
  }
  if (homeTimeInputEl) {
    homeTimeInputEl.value = inputValue;
  }
  if (homeTimeSummaryEl) {
    homeTimeSummaryEl.textContent = manualTimeSettings.enabled
      ? `当前发送给 prompt 的时间：${
          typeof window.PulsePromptConfig?.formatPromptTimeLabel === "function"
            ? window.PulsePromptConfig.formatPromptTimeLabel(homeState.settings)
            : inputValue || "跟随本地时间"
        }（会继续随真实时间流动）`
      : "当前发送给 prompt 的时间：跟随本地时间";
  }
}

function saveHomeManualTimeSettings(nextManualTimeSettings, options = {}) {
  persistHomeSettingsSnapshot({
    ...homeState.settings,
    manualTimeSettings: nextManualTimeSettings
  });
  renderHomeTimeModal();
  if (options.statusMessage) {
    setHomeTimeStatus(options.statusMessage, options.statusTone || "success");
  }
}

function commitHomeManualTimeFromControls(options = {}) {
  const nextEnabled = Boolean(homeTimeEnabledEl?.checked);
  const nextValue = String(homeTimeInputEl?.value || "").trim();
  const currentSettings = normalizeHomeManualTimeSettings(homeState.settings);
  const resolvedValue = nextValue || currentSettings.value || "";

  if (nextEnabled && !resolvedValue) {
    setHomeTimeStatus("请先选择一个生效时间。", "error");
    return false;
  }

  saveHomeManualTimeSettings(
    buildHomeManualTimeSettingsFromInput(resolvedValue, nextEnabled),
    {
      statusMessage: options.statusMessage || "Prompt 时间偏移已保存。",
      statusTone: options.statusTone || "success"
    }
  );
  return true;
}

function setHomeTimeModalOpen(isOpen) {
  homeState.timeModalOpen = Boolean(isOpen);
  if (!homeTimeModalEl) {
    return;
  }

  if (homeState.timeModalOpen) {
    if (homeState.modalOpen) {
      setHomeSettingsModalOpen(false);
    }
    if (homeState.rulesModalOpen) {
      setHomeRulesModalOpen(false);
    }
    if (homeState.rulesNegativeModalOpen) {
      setHomeRulesNegativeModalOpen(false);
    }
    homeState.settings = loadSettings({ forceActiveConfig: false });
    renderHomeEffectiveTime(homeState.settings);
    setHomeTimeStatus("");
    renderHomeTimeModal();
    showHomeLayer(homeTimeModalEl, "grid");
    refreshBodyModalState();
    window.setTimeout(() => {
      if (homeTimeEnabledEl?.checked) {
        homeTimeInputEl?.focus();
        return;
      }
      homeTimeEnabledEl?.focus();
    }, 0);
    return;
  }

  hideHomeLayer(homeTimeModalEl);
  refreshBodyModalState();
}

function renderHomeRulesModal() {
  const promptCatalogList = getHomePromptCatalogList();
  const activePromptType = getActiveHomeRulePromptType();
  homeState.rulesActivePromptType = activePromptType;
  renderHomeNegativePromptSummary(homeState.settings);

  if (homeRulesTypeListEl) {
    homeRulesTypeListEl.innerHTML = promptCatalogList.length
      ? promptCatalogList
          .map((item) => {
            const isActive = item.id === activePromptType;
            return `
              <button
                class="home-rules-type-btn${isActive ? " is-active" : ""}"
                type="button"
                data-action="select-home-rule-type"
                data-prompt-type="${escapeHtml(item.id)}"
              >
                <p class="home-rules-type-btn__group">${escapeHtml(item.group || "Prompt")}</p>
                <h3 class="home-rules-type-btn__title">${escapeHtml(item.label || item.id)}</h3>
                <p class="home-rules-type-btn__desc">${escapeHtml(item.description || "未填写说明")}</p>
              </button>
            `;
          })
          .join("")
      : '<p class="home-empty-state">当前没有可编辑的 prompt 规则。</p>';
  }

  const editorModel =
    typeof window.PulsePromptConfig?.buildEditorModel === "function"
      ? window.PulsePromptConfig.buildEditorModel(activePromptType, homeState.settings)
      : null;

  if (homeRulesTitleEl) {
    homeRulesTitleEl.textContent = editorModel?.label || "规则配置";
  }
  if (homeRulesDescriptionEl) {
    homeRulesDescriptionEl.textContent = editorModel?.description || "可拖动排序并调整内置文字。";
  }

  if (!homeRulesSectionsEl) {
    return;
  }

  homeRulesSectionsEl.innerHTML =
    editorModel?.sections?.length
      ? editorModel.sections
          .map((section) => {
            const sectionKey = String(section.key || "").trim();
            const itemsMarkup = (section.items || [])
              .map((item) => {
                const itemId = String(item.id || "").trim();
                const kindLabel =
                  item.kind === "dynamic"
                    ? "运行时读取"
                    : item.kind === "custom"
                      ? "自定义文字"
                      : "内置文字";
                const kindClass =
                  item.kind === "dynamic"
                    ? " home-rules-badge--dynamic"
                    : item.kind === "custom"
                      ? " home-rules-badge--custom"
                      : "";
                const contentMarkup = item.editable && item.hasLockedTemplateSlots
                  ? `
                    <div class="home-rules-item__segments">
                      ${(Array.isArray(item.templateSegments) ? item.templateSegments : [])
                        .map((segment, segmentIndex) =>
                          segment?.type === "placeholder"
                            ? `
                              <span class="home-rules-item__token" aria-label="运行时变量">
                                ${escapeHtml(segment.value || "")}
                              </span>
                            `
                            : `
                              <textarea
                                class="home-rules-item__segment-input"
                                data-action="edit-home-rule-template-segment"
                                data-prompt-type="${escapeHtml(activePromptType)}"
                                data-section-key="${escapeHtml(sectionKey)}"
                                data-item-id="${escapeHtml(itemId)}"
                                data-segment-index="${escapeHtml(segmentIndex)}"
                                spellcheck="false"
                                placeholder="可编辑文字"
                              >${escapeHtml(segment.value || "")}</textarea>
                            `
                        )
                        .join("")}
                    </div>
                  `
                  : item.editable
                  ? `
                    <textarea
                      class="home-rules-item__textarea"
                      data-action="edit-home-rule-item"
                      data-prompt-type="${escapeHtml(activePromptType)}"
                      data-section-key="${escapeHtml(sectionKey)}"
                      data-item-id="${escapeHtml(itemId)}"
                      spellcheck="false"
                    >${escapeHtml(item.text || "")}</textarea>
                  `
                  : `
                    <div class="home-rules-item__runtime">${escapeHtml(
                      item.hint || "运行时读取"
                    )}</div>
                  `;
                const removeMarkup =
                  item.kind === "custom"
                    ? `
                      <button
                        class="home-chip home-chip--danger home-rules-item__remove"
                        type="button"
                        data-action="remove-home-rule-custom"
                        data-prompt-type="${escapeHtml(activePromptType)}"
                        data-section-key="${escapeHtml(sectionKey)}"
                        data-item-id="${escapeHtml(itemId)}"
                      >
                        删除
                      </button>
                    `
                    : '<span aria-hidden="true"></span>';
                return `
                  <article
                    class="home-rules-item"
                    draggable="true"
                    data-prompt-type="${escapeHtml(activePromptType)}"
                    data-section-key="${escapeHtml(sectionKey)}"
                    data-item-id="${escapeHtml(itemId)}"
                  >
                    <button
                      class="home-rules-item__drag"
                      type="button"
                      tabindex="-1"
                      aria-label="拖动排序"
                    >
                      ⋮⋮
                    </button>
                    <div class="home-rules-item__body">
                      <div class="home-rules-item__meta">
                        <p class="home-rules-item__title">${escapeHtml(item.label || itemId)}</p>
                        <span class="home-rules-badge${kindClass}">${escapeHtml(kindLabel)}</span>
                      </div>
                      ${contentMarkup}
                      <p class="home-rules-item__hint">${escapeHtml(
                        item.hasLockedTemplateSlots
                          ? "可修改普通文字；形如 {{userName}} 的运行时变量已锁定，避免误改。"
                          : item.hint || "可拖动排序"
                      )}</p>
                    </div>
                    ${removeMarkup}
                  </article>
                `;
              })
              .join("");
            return `
              <section class="home-rules-section">
                <div class="home-rules-section__head">
                  <h4 class="home-rules-section__title">${escapeHtml(section.label || sectionKey)}</h4>
                  <button
                    class="home-chip"
                    type="button"
                    data-action="add-home-rule-custom"
                    data-prompt-type="${escapeHtml(activePromptType)}"
                    data-section-key="${escapeHtml(sectionKey)}"
                  >
                    添加自定义文字
                  </button>
                </div>
                <div
                  class="home-rules-section__list"
                  data-prompt-type="${escapeHtml(activePromptType)}"
                  data-section-key="${escapeHtml(sectionKey)}"
                >
                  ${itemsMarkup}
                </div>
              </section>
            `;
          })
          .join("")
      : '<p class="home-empty-state">当前 prompt 暂无可编辑内容。</p>';
}

function renderHomeNegativePromptSummary(settings = homeState.settings) {
  if (!homeRulesNegativeSummaryEl) {
    return;
  }
  const items = normalizeNegativePromptConstraints(settings?.negativePromptConstraints || []);
  if (!items.length) {
    homeRulesNegativeSummaryEl.textContent = "全局负向约束：未设置";
    return;
  }
  const preview = items.slice(0, 2).join(" / ");
  homeRulesNegativeSummaryEl.textContent =
    items.length > 2
      ? `全局负向约束：已配置 ${items.length} 条 · ${preview}…`
      : `全局负向约束：已配置 ${items.length} 条 · ${preview}`;
}

function renderHomeRulesNegativeModal() {
  if (homeRulesNegativeInputEl) {
    homeRulesNegativeInputEl.value = normalizeNegativePromptConstraints(
      homeState.settings?.negativePromptConstraints || []
    ).join("\n");
  }
  setHomeRulesNegativeStatus("");
}

function saveHomeNegativePromptConstraints() {
  const nextConstraints = normalizeNegativePromptConstraints(homeRulesNegativeInputEl?.value);
  homeState.settings = buildNormalizedSettingsSnapshot(
    {
      ...homeState.settings,
      negativePromptConstraints: nextConstraints
    },
    { forceActiveConfig: false }
  );
  persistSettings(homeState.settings);
  renderHomeNegativePromptSummary(homeState.settings);
  setHomeRulesNegativeStatus("负向约束已保存。", "success");
  setHomeRulesStatus("负向约束已保存。", "success");
  window.setTimeout(() => {
    setHomeRulesNegativeModalOpen(false);
  }, 160);
}

function updateHomeRuleItemText(promptType = "", sectionKey = "", itemId = "", value = "") {
  const resolvedPromptType = String(promptType || "").trim();
  const resolvedSectionKey = String(sectionKey || "").trim();
  const resolvedItemId = String(itemId || "").trim();
  if (!resolvedPromptType || !resolvedSectionKey || !resolvedItemId) {
    return;
  }

  const { promptRules, sectionConfig } = ensureHomePromptRuleSectionConfig(
    resolvedPromptType,
    resolvedSectionKey
  );
  if (!sectionConfig) {
    return;
  }

  const customItemIndex = sectionConfig.customItems.findIndex((item) => item.id === resolvedItemId);
  if (customItemIndex >= 0) {
    sectionConfig.customItems[customItemIndex] = {
      ...sectionConfig.customItems[customItemIndex],
      text: String(value || "")
    };
  } else {
    sectionConfig.overrides[resolvedItemId] = String(value || "");
  }

  persistHomePromptRules(promptRules, "");
  setHomeRulesStatus("规则已保存。", "success");
}

function updateHomeRuleTemplateSegmentText(
  promptType = "",
  sectionKey = "",
  itemId = "",
  segmentIndex = -1,
  value = ""
) {
  const resolvedPromptType = String(promptType || "").trim();
  const resolvedSectionKey = String(sectionKey || "").trim();
  const resolvedItemId = String(itemId || "").trim();
  if (!resolvedPromptType || !resolvedSectionKey || !resolvedItemId) {
    return;
  }
  const targetItem = getHomePromptEditorItem(resolvedPromptType, resolvedSectionKey, resolvedItemId);
  if (!targetItem) {
    return;
  }
  const nextText =
    typeof window.PulsePromptConfig?.updateTemplateTextSegment === "function"
      ? window.PulsePromptConfig.updateTemplateTextSegment(
          String(targetItem.text || ""),
          segmentIndex,
          value
        )
      : String(targetItem.text || "");
  updateHomeRuleItemText(
    resolvedPromptType,
    resolvedSectionKey,
    resolvedItemId,
    nextText
  );
}

function addHomeRuleCustomItem(promptType = "", sectionKey = "") {
  const resolvedPromptType = String(promptType || "").trim();
  const resolvedSectionKey = String(sectionKey || "").trim();
  if (!resolvedPromptType || !resolvedSectionKey) {
    return;
  }

  const { promptRules, sectionConfig } = ensureHomePromptRuleSectionConfig(
    resolvedPromptType,
    resolvedSectionKey
  );
  if (!sectionConfig) {
    return;
  }

  const customItemId =
    typeof window.PulsePromptConfig?.createCustomItemId === "function"
      ? window.PulsePromptConfig.createCustomItemId(resolvedPromptType, resolvedSectionKey)
      : `custom_${resolvedPromptType}_${resolvedSectionKey}_${Date.now()}`;
  sectionConfig.customItems = [
    ...sectionConfig.customItems,
    {
      id: customItemId,
      text: ""
    }
  ];
  sectionConfig.itemOrder = [
    ...getHomePromptSectionItemOrder(resolvedPromptType, resolvedSectionKey),
    customItemId
  ];
  persistHomePromptRules(promptRules, "已新增一条自定义文字。");
  renderHomeRulesModal();
  window.setTimeout(() => {
    homeRulesSectionsEl
      ?.querySelector(
        `[data-action="edit-home-rule-item"][data-prompt-type="${CSS.escape(
          resolvedPromptType
        )}"][data-section-key="${CSS.escape(resolvedSectionKey)}"][data-item-id="${CSS.escape(
          customItemId
        )}"]`
      )
      ?.focus();
  }, 0);
}

function removeHomeRuleCustomItem(promptType = "", sectionKey = "", itemId = "") {
  const resolvedPromptType = String(promptType || "").trim();
  const resolvedSectionKey = String(sectionKey || "").trim();
  const resolvedItemId = String(itemId || "").trim();
  if (!resolvedPromptType || !resolvedSectionKey || !resolvedItemId) {
    return;
  }

  const { promptRules, sectionConfig } = ensureHomePromptRuleSectionConfig(
    resolvedPromptType,
    resolvedSectionKey
  );
  if (!sectionConfig) {
    return;
  }
  sectionConfig.customItems = sectionConfig.customItems.filter((item) => item.id !== resolvedItemId);
  sectionConfig.itemOrder = sectionConfig.itemOrder.filter((item) => item !== resolvedItemId);
  delete sectionConfig.overrides[resolvedItemId];
  persistHomePromptRules(promptRules, "已删除这条自定义文字。");
  renderHomeRulesModal();
}

function moveHomeRuleItem(promptType = "", sectionKey = "", sourceItemId = "", targetItemId = "") {
  const resolvedPromptType = String(promptType || "").trim();
  const resolvedSectionKey = String(sectionKey || "").trim();
  const resolvedSourceItemId = String(sourceItemId || "").trim();
  const resolvedTargetItemId = String(targetItemId || "").trim();
  if (!resolvedPromptType || !resolvedSectionKey || !resolvedSourceItemId) {
    return;
  }
  if (resolvedTargetItemId && resolvedTargetItemId === resolvedSourceItemId) {
    return;
  }

  const { promptRules, sectionConfig } = ensureHomePromptRuleSectionConfig(
    resolvedPromptType,
    resolvedSectionKey
  );
  if (!sectionConfig) {
    return;
  }

  const currentOrder = getHomePromptSectionItemOrder(resolvedPromptType, resolvedSectionKey);
  const nextOrder = currentOrder.filter((item) => item !== resolvedSourceItemId);
  if (!currentOrder.includes(resolvedSourceItemId)) {
    return;
  }

  if (resolvedTargetItemId && nextOrder.includes(resolvedTargetItemId)) {
    const targetIndex = nextOrder.indexOf(resolvedTargetItemId);
    nextOrder.splice(targetIndex, 0, resolvedSourceItemId);
  } else {
    nextOrder.push(resolvedSourceItemId);
  }

  sectionConfig.itemOrder = nextOrder;
  persistHomePromptRules(promptRules, "顺序已更新。");
  renderHomeRulesModal();
}

function setHomeRulesModalOpen(isOpen) {
  homeState.rulesModalOpen = Boolean(isOpen);
  if (!homeRulesModalEl) {
    return;
  }

  if (homeState.rulesModalOpen) {
    if (homeState.modalOpen) {
      setHomeSettingsModalOpen(false);
    }
    if (homeState.timeModalOpen) {
      setHomeTimeModalOpen(false);
    }
    homeState.settings = loadSettings({ forceActiveConfig: false });
    homeState.rulesActivePromptType = getActiveHomeRulePromptType();
    homeState.rulesDragState = null;
    setHomeRulesStatus("");
    renderHomeRulesModal();
    showHomeLayer(homeRulesModalEl, "grid");
    refreshBodyModalState();
    window.setTimeout(() => {
      homeRulesTypeListEl?.querySelector(".home-rules-type-btn.is-active")?.focus();
    }, 0);
    return;
  }

  homeState.rulesDragState = null;
  setHomeRulesNegativeModalOpen(false);
  hideHomeLayer(homeRulesModalEl);
  refreshBodyModalState();
}

function setHomeRulesNegativeModalOpen(isOpen) {
  homeState.rulesNegativeModalOpen = Boolean(isOpen);
  if (!homeRulesNegativeModalEl) {
    return;
  }

  if (homeState.rulesNegativeModalOpen) {
    renderHomeRulesNegativeModal();
    showHomeLayer(homeRulesNegativeModalEl, "grid");
    refreshBodyModalState();
    window.setTimeout(() => {
      homeRulesNegativeInputEl?.focus();
    }, 0);
    return;
  }

  hideHomeLayer(homeRulesNegativeModalEl);
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
  if (tabName === "plot") {
    return {
      tab: "plot",
      kicker: "Story",
      title: "剧情"
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
    homeState.modalOpen ||
      homeState.timeModalOpen ||
      homeState.rulesModalOpen ||
      homeState.rulesNegativeModalOpen ||
      homeState.browserOpen ||
      homeState.privacyAddModalOpen
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
    if (homeState.timeModalOpen) {
      setHomeTimeModalOpen(false);
    }
    if (homeState.rulesModalOpen) {
      setHomeRulesModalOpen(false);
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
  } else if (role === "item-child") {
    toggleTransferChildSelection(
      selection,
      sectionId,
      String(target.dataset.itemId || ""),
      String(target.dataset.childId || ""),
      target.checked
    );
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

  if (tabName === "plot") {
    setHomeBrowserModalOpen(
      true,
      `./plot.html?embed=1&v=${APP_BUILD_VERSION}`,
      getHomeAppMeta("plot")
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

function ensureBackgroundMessagesWorker() {
  if (isPrivacyAppView() || homeBackgroundMessagesFrameEl) {
    return;
  }
  const iframe = document.createElement("iframe");
  iframe.id = "home-background-messages-frame";
  iframe.setAttribute("aria-hidden", "true");
  iframe.tabIndex = -1;
  iframe.src = `./messages.html?embed=1&background=1&v=${APP_BUILD_VERSION}`;
  iframe.style.position = "fixed";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "0";
  iframe.style.opacity = "0";
  iframe.style.pointerEvents = "none";
  iframe.style.inset = "auto";
  document.body?.appendChild(iframe);
  homeBackgroundMessagesFrameEl = iframe;
}

function attachHomeSettingsEvents() {
  homeAppTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const targetTab = trigger.dataset.openApp || "home";
      openHomeApp(targetTab);
    });
  });

  if (homeTimeTriggerBtn) {
    homeTimeTriggerBtn.addEventListener("click", () => {
      setHomeTimeModalOpen(true);
    });
  }

  if (homeSettingsTriggerBtn) {
    homeSettingsTriggerBtn.addEventListener("click", () => {
      setHomeSettingsModalOpen(true);
    });
  }

  if (homeRulesTriggerBtn) {
    homeRulesTriggerBtn.addEventListener("click", () => {
      setHomeRulesModalOpen(true);
    });
  }

  if (homeSettingsCloseBtn) {
    homeSettingsCloseBtn.addEventListener("click", () => {
      setHomeSettingsModalOpen(false);
    });
  }

  if (homeTimeCloseBtn) {
    homeTimeCloseBtn.addEventListener("click", () => {
      setHomeTimeModalOpen(false);
    });
  }

  if (homeRulesCloseBtn) {
    homeRulesCloseBtn.addEventListener("click", () => {
      setHomeRulesModalOpen(false);
    });
  }

  if (homeRulesNegativeTriggerBtn) {
    homeRulesNegativeTriggerBtn.addEventListener("click", () => {
      setHomeRulesNegativeModalOpen(true);
    });
  }

  if (homeRulesNegativeCloseBtn) {
    homeRulesNegativeCloseBtn.addEventListener("click", () => {
      setHomeRulesNegativeModalOpen(false);
    });
  }

  if (homeRulesNegativeCancelBtn) {
    homeRulesNegativeCancelBtn.addEventListener("click", () => {
      setHomeRulesNegativeModalOpen(false);
    });
  }

  if (homeRulesNegativeSaveBtn) {
    homeRulesNegativeSaveBtn.addEventListener("click", () => {
      saveHomeNegativePromptConstraints();
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

  if (homeTimeModalEl) {
    homeTimeModalEl.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) {
        return;
      }
      if (target.hasAttribute("data-close-home-time")) {
        setHomeTimeModalOpen(false);
      }
    });
  }

  if (homeRulesModalEl) {
    homeRulesModalEl.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) {
        return;
      }
      if (target.hasAttribute("data-close-home-rules")) {
        setHomeRulesModalOpen(false);
      }
    });
  }

  if (homeRulesNegativeModalEl) {
    homeRulesNegativeModalEl.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) {
        return;
      }
      if (target.hasAttribute("data-close-home-rules-negative")) {
        setHomeRulesNegativeModalOpen(false);
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
    const backgroundFrameWindow = homeBackgroundMessagesFrameEl?.contentWindow || null;
    const acceptedSources = [frameWindow, backgroundFrameWindow].filter(Boolean);
    if (event.source && acceptedSources.length && !acceptedSources.includes(event.source)) {
      return;
    }
    if (event.data?.type === "pulse-generator-close-app") {
      setHomeBrowserModalOpen(false);
      return;
    }
    if (event.data?.type === "pulse-generator-message-notification") {
      window.PulseMessageNotifications?.push?.(event.data.payload || {});
    }
  });

  if (homeTimeEnabledEl) {
    homeTimeEnabledEl.addEventListener("change", () => {
      if (
        homeTimeEnabledEl.checked &&
        !String(homeTimeInputEl?.value || "").trim() &&
        typeof window.PulsePromptConfig?.formatDateTimeInputValue === "function"
      ) {
        homeTimeInputEl.value = window.PulsePromptConfig.formatDateTimeInputValue(new Date());
      }
      commitHomeManualTimeFromControls({
        statusMessage: homeTimeEnabledEl.checked ? "已启用手动时间。" : "已恢复跟随本地时间。"
      });
    });
  }

  if (homeTimeInputEl) {
    homeTimeInputEl.addEventListener("change", () => {
      if (!homeTimeEnabledEl?.checked) {
        renderHomeTimeModal();
        return;
      }
      commitHomeManualTimeFromControls();
    });
  }

  if (homeTimeUseNowBtn) {
    homeTimeUseNowBtn.addEventListener("click", () => {
      if (typeof window.PulsePromptConfig?.formatDateTimeInputValue === "function") {
        homeTimeInputEl.value = window.PulsePromptConfig.formatDateTimeInputValue(new Date());
      }
      if (homeTimeEnabledEl) {
        homeTimeEnabledEl.checked = true;
      }
      commitHomeManualTimeFromControls({
        statusMessage: "已设置为当前本地时间。"
      });
    });
  }

  if (homeTimeResetBtn) {
    homeTimeResetBtn.addEventListener("click", () => {
      if (homeTimeEnabledEl) {
        homeTimeEnabledEl.checked = false;
      }
      saveHomeManualTimeSettings(
        buildHomeManualTimeSettingsFromInput(String(homeTimeInputEl?.value || "").trim(), false),
        {
          statusMessage: "已恢复跟随本地时间。"
        }
      );
    });
  }

  if (homeRulesTypeListEl) {
    homeRulesTypeListEl.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }
      const actionEl = target.closest("[data-action='select-home-rule-type']");
      if (!(actionEl instanceof HTMLElement)) {
        return;
      }
      homeState.rulesActivePromptType = String(actionEl.dataset.promptType || "").trim();
      setHomeRulesStatus("");
      renderHomeRulesModal();
    });
  }

  if (homeRulesSectionsEl) {
    homeRulesSectionsEl.addEventListener("input", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLTextAreaElement)) {
        return;
      }
      if (target.dataset.action === "edit-home-rule-template-segment") {
        updateHomeRuleTemplateSegmentText(
          String(target.dataset.promptType || ""),
          String(target.dataset.sectionKey || ""),
          String(target.dataset.itemId || ""),
          Number.parseInt(String(target.dataset.segmentIndex || ""), 10),
          target.value
        );
        return;
      }
      if (target.dataset.action !== "edit-home-rule-item") {
        return;
      }
      updateHomeRuleItemText(
        String(target.dataset.promptType || ""),
        String(target.dataset.sectionKey || ""),
        String(target.dataset.itemId || ""),
        target.value
      );
    });

    homeRulesSectionsEl.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }
      const actionEl = target.closest("[data-action]");
      if (!(actionEl instanceof HTMLElement)) {
        return;
      }
      const action = String(actionEl.dataset.action || "").trim();
      if (action === "add-home-rule-custom") {
        addHomeRuleCustomItem(
          String(actionEl.dataset.promptType || ""),
          String(actionEl.dataset.sectionKey || "")
        );
        return;
      }
      if (action === "remove-home-rule-custom") {
        removeHomeRuleCustomItem(
          String(actionEl.dataset.promptType || ""),
          String(actionEl.dataset.sectionKey || ""),
          String(actionEl.dataset.itemId || "")
        );
      }
    });

    homeRulesSectionsEl.addEventListener("dragstart", (event) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }
      const itemEl = target.closest(".home-rules-item");
      if (!(itemEl instanceof HTMLElement)) {
        return;
      }
      const promptType = String(itemEl.dataset.promptType || "").trim();
      const sectionKey = String(itemEl.dataset.sectionKey || "").trim();
      const itemId = String(itemEl.dataset.itemId || "").trim();
      if (!promptType || !sectionKey || !itemId) {
        return;
      }
      homeState.rulesDragState = {
        promptType,
        sectionKey,
        itemId
      };
      itemEl.classList.add("is-dragging");
      if (event.dataTransfer) {
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/plain", itemId);
      }
    });

    homeRulesSectionsEl.addEventListener("dragover", (event) => {
      const dragState = homeState.rulesDragState;
      if (!dragState) {
        return;
      }
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }
      const sectionListEl = target.closest(".home-rules-section__list");
      if (!(sectionListEl instanceof HTMLElement)) {
        return;
      }
      const promptType = String(sectionListEl.dataset.promptType || "").trim();
      const sectionKey = String(sectionListEl.dataset.sectionKey || "").trim();
      if (promptType !== dragState.promptType || sectionKey !== dragState.sectionKey) {
        return;
      }
      event.preventDefault();
      homeRulesSectionsEl
        .querySelectorAll(".home-rules-item.drag-over")
        .forEach((item) => item.classList.remove("drag-over"));
      const targetItemEl = target.closest(".home-rules-item");
      if (targetItemEl instanceof HTMLElement) {
        targetItemEl.classList.add("drag-over");
      }
    });

    homeRulesSectionsEl.addEventListener("drop", (event) => {
      const dragState = homeState.rulesDragState;
      if (!dragState) {
        return;
      }
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }
      const sectionListEl = target.closest(".home-rules-section__list");
      if (!(sectionListEl instanceof HTMLElement)) {
        return;
      }
      const promptType = String(sectionListEl.dataset.promptType || "").trim();
      const sectionKey = String(sectionListEl.dataset.sectionKey || "").trim();
      if (promptType !== dragState.promptType || sectionKey !== dragState.sectionKey) {
        return;
      }
      event.preventDefault();
      const targetItemEl = target.closest(".home-rules-item");
      moveHomeRuleItem(
        promptType,
        sectionKey,
        dragState.itemId,
        targetItemEl instanceof HTMLElement ? String(targetItemEl.dataset.itemId || "") : ""
      );
    });

    homeRulesSectionsEl.addEventListener("dragend", () => {
      homeState.rulesDragState = null;
      homeRulesSectionsEl
        .querySelectorAll(".home-rules-item.is-dragging, .home-rules-item.drag-over")
        .forEach((item) => item.classList.remove("is-dragging", "drag-over"));
    });
  }

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

  if (privacyAppClearRecentBtn) {
    privacyAppClearRecentBtn.addEventListener("click", () => {
      clearPrivacyRecentHits();
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
        homeState.privacyAllowlistItems.map((item) => item.text),
        homeState.privacyIgnorelistItems.map((item) => item.text)
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
        homeState.privacyAllowlistItems.map((item) => item.text),
        homeState.privacyIgnorelistItems.map((item) => item.text)
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

  if (privacyAppIgnoreListEl) {
    privacyAppIgnoreListEl.addEventListener("input", handlePrivacyIgnorelistInput);
    privacyAppIgnoreListEl.addEventListener("change", handlePrivacyIgnorelistChange);
    privacyAppIgnoreListEl.addEventListener("click", handlePrivacyAppClick);
  }

  if (privacyAppRecentListEl) {
    privacyAppRecentListEl.addEventListener("input", handlePrivacyRecentHitChange);
    privacyAppRecentListEl.addEventListener("change", handlePrivacyRecentHitChange);
    privacyAppRecentListEl.addEventListener("click", handlePrivacyAppClick);
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
    if (event.key === "Escape" && homeState.rulesNegativeModalOpen) {
      setHomeRulesNegativeModalOpen(false);
      return;
    }
    if (event.key === "Escape" && homeState.timeModalOpen) {
      setHomeTimeModalOpen(false);
      return;
    }
    if (event.key === "Escape" && homeState.rulesModalOpen) {
      setHomeRulesModalOpen(false);
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
  hideHomeLayer(homeTimeModalEl);
  hideHomeLayer(homeRulesModalEl);
  hideHomeLayer(homeRulesNegativeModalEl);
  hideHomeLayer(homeBrowserModalEl);
  hideHomeLayer(privacyAppAddModalEl);
  setHomeExportReviewOpen(false);
  setHomeImportReviewOpen(false);
  homeState.settings = loadSettings({ forceActiveConfig: false });
  updateLocalClock();
  renderBuildBadge();
  renderHomeEffectiveTime(homeState.settings);
  setInterval(updateLocalClock, 1000);
  attachHomeSettingsEvents();

  if (isPrivacyAppView()) {
    setPrivacyAppVisible(true);
    initPrivacyAppState();
    renderPrivacyApp();
    setPrivacyAppStatus("");
    window.addEventListener("storage", (event) => {
      const targetKey = String(event?.key || "").trim();
      if (
        !targetKey ||
        ![
          SETTINGS_KEY,
          PRIVACY_ALLOWLIST_TERMS_KEY,
          PRIVACY_ALLOWLIST_META_KEY,
          PRIVACY_PENDING_SCAN_KEY,
          PRIVACY_IGNORELIST_TERMS_KEY,
          PRIVACY_RECENT_HITS_SINCE_KEY
        ].includes(targetKey)
      ) {
        return;
      }
      refreshPrivacyAppFromStorage();
    });
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) {
        refreshPrivacyAppFromStorage();
      }
    });
    refreshBodyModalState();
    return;
  }

  setPrivacyAppVisible(false);
  ensureBackgroundMessagesWorker();
  syncHomeActiveConfigSummary();
  refreshHomeTransferExportSelection();
  renderHomeEffectiveTime(homeState.settings);
  refreshBodyModalState();
}

initHome();
