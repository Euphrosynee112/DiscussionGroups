const DEFAULT_OPENAI_ENDPOINT = "https://api.deepseek.com/chat/completions";
const DEFAULT_GEMINI_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta";
const DEFAULT_DEEPSEEK_MODEL = "deepseek-chat";
const DEFAULT_GEMINI_MODEL = "gemini-2.0-flash";
const SETTINGS_KEY = "x_style_generator_settings_v2";
const API_CONFIG_LIMIT = 12;

const phoneDateEl = document.querySelector("#phone-date");
const phoneClockEl = document.querySelector("#phone-clock");
const statusTimeEl = document.querySelector("#status-time");
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
  translationApiConfigId: ""
};

const homeState = {
  settings: loadSettings(),
  modalOpen: false,
  browserOpen: false,
  activeAppUrl: "",
  activeAppTab: "home"
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
  if (statusTimeEl) {
    statusTimeEl.textContent = timeText;
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

function loadSettings() {
  const raw = safeGetItem(SETTINGS_KEY);
  if (!raw) {
    return {
      ...DEFAULT_SETTINGS,
      apiConfigs: []
    };
  }

  try {
    const parsed = JSON.parse(raw);
    const merged = {
      ...DEFAULT_SETTINGS,
      ...(parsed && typeof parsed === "object" ? parsed : {})
    };
    merged.mode = normalizeApiMode(merged.mode);
    merged.endpoint = normalizeSettingsEndpointByMode(merged.mode, merged.endpoint);
    merged.model =
      merged.mode === "generic"
        ? ""
        : String(merged.model || getDefaultModelByMode(merged.mode)).trim() ||
          getDefaultModelByMode(merged.mode);
    merged.apiConfigs = normalizeApiConfigs(
      merged.apiConfigs || parsed?.apiPresets || parsed?.apiProfiles || []
    );
    if (!merged.apiConfigs.some((item) => item.id === merged.activeApiConfigId)) {
      merged.activeApiConfigId = "";
    }
    if (!merged.apiConfigs.some((item) => item.id === merged.translationApiConfigId)) {
      merged.translationApiConfigId = "";
      merged.translationApiEnabled = false;
    }
    return merged;
  } catch (_error) {
    return {
      ...DEFAULT_SETTINGS,
      apiConfigs: []
    };
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
      const modelText = item.model ? `模型：${item.model}` : "模型：无";
      const tokenText = item.token ? "密钥：已保存" : "密钥：未保存";
      return `
        <article class="home-api-item${isActive ? " active" : ""}">
          <div class="home-api-item__head">
            <h3 class="home-api-item__title">${escapeHtml(item.name)}</h3>
            <div class="home-api-badges">
              <span class="home-badge">${isActive ? "当前配置" : "已缓存"}</span>
              ${isTranslationSelected ? '<span class="home-badge">翻译专用</span>' : ""}
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
            <button class="home-chip" type="button" data-action="set-home-translation-api-config" data-config-id="${escapeHtml(
              item.id
            )}" ${isTranslationSelected ? "disabled" : ""}>
              ${isTranslationSelected ? "已用于翻译" : "设为翻译专用"}
            </button>
            <button class="home-chip home-chip--danger" type="button" data-action="delete-home-api-config" data-config-id="${escapeHtml(
              item.id
            )}">删除</button>
          </div>
        </article>
      `;
    })
    .join("");

  renderHomeTranslationApiControls();
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

function setHomeTranslationApiConfig(configId) {
  const config =
    normalizeApiConfigs(homeState.settings.apiConfigs).find((item) => item.id === configId) ||
    null;
  if (!config) {
    setHomeApiConfigStatus("未找到可用于翻译的缓存 API 配置。", "error");
    return;
  }

  homeState.settings.translationApiEnabled = true;
  homeState.settings.translationApiConfigId = config.id;
  persistSettings(homeState.settings);
  renderHomeApiConfigList();
  setHomeApiConfigStatus(`翻译专用 API 已切换到“${config.name}”。`, "success");
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
    showHomeLayer(homeSettingsModalEl, "grid");
    refreshBodyModalState();
    window.setTimeout(() => {
      homeApiEndpointInput?.focus();
    }, 0);
    return;
  }

  saveCurrentHomeSettings({ silent: true });
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
  homeState.activeAppUrl = "";
  homeState.activeAppTab = "home";
  refreshBodyModalState();
}

function openHomeApp(tabName) {
  if (tabName === "messages") {
    setHomeBrowserModalOpen(true, "./messages.html?embed=1", getHomeAppMeta("messages"));
    return;
  }

  const targetUrl = "./discussion.html?tab=home&embed=1";
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

  if (homeBrowserCloseBtn) {
    homeBrowserCloseBtn.addEventListener("click", () => {
      setHomeBrowserModalOpen(false);
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
      } else if (action === "set-home-translation-api-config") {
        setHomeTranslationApiConfig(configId);
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
  updateLocalClock();
  setInterval(updateLocalClock, 1000);
  attachHomeSettingsEvents();
  syncHomeActiveConfigSummary();
}

initHome();
