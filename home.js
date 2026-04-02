const DEFAULT_OPENAI_ENDPOINT = "https://api.deepseek.com/chat/completions";
const DEFAULT_GEMINI_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta";
const DEFAULT_DEEPSEEK_MODEL = "deepseek-chat";
const DEFAULT_GEMINI_MODEL = "gemini-2.0-flash";
const APP_BUILD_VERSION = "20260402f";
const APP_BUILD_UPDATED_AT = "2026-04-02 14:02:38";
const SETTINGS_KEY = "x_style_generator_settings_v2";
const POSTS_KEY = "x_style_generator_posts_v2";
const REFRESH_KEY = "x_style_generator_refresh_v2";
const PROFILE_KEY = "x_style_generator_profile_v1";
const PROFILE_POSTS_KEY = "x_style_generator_profile_posts_v1";
const DISCUSSIONS_KEY = "x_style_generator_discussions_v1";
const WORLD_BOOKS_KEY = "x_style_generator_message_worldbooks_v1";
const MESSAGE_CONTACTS_KEY = "x_style_generator_message_contacts_v1";
const API_CONFIG_LIMIT = 12;
const CONFIG_EXPORT_SCHEMA = "pulse-generator-config";
const TRANSFER_FORUM_BASE_ITEM_ID = "__forum_base__";

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
  summaryApiConfigId: ""
};

const homeState = {
  settings: loadSettings(),
  modalOpen: false,
  browserOpen: false,
  activeAppUrl: "",
  activeAppTab: "home",
  exportTransferSelection: [],
  pendingImportTransferPayload: null,
  importTransferSelection: []
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
  safeSetItem(SETTINGS_KEY, JSON.stringify(settings));
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

function buildTransferPayloadFromCurrentState() {
  const settings = loadSettings();
  const profile = readStoredJson(PROFILE_KEY, {}) || {};
  const chatProfile = pickChatProfilePayload(profile);
  const worldbooks = readStoredJson(WORLD_BOOKS_KEY, { categories: [], entries: [] }) || {};
  const contacts = readStoredJson(MESSAGE_CONTACTS_KEY, []) || [];
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
    version: 5,
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
  document.body.classList.toggle("modal-open", homeState.modalOpen || homeState.browserOpen);
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
  setHomeExportReviewOpen(false);
  setHomeImportReviewOpen(false);
  updateLocalClock();
  renderBuildBadge();
  setInterval(updateLocalClock, 1000);
  attachHomeSettingsEvents();
  syncHomeActiveConfigSummary();
  refreshHomeTransferExportSelection();
}

initHome();
