const DEFAULT_OPENAI_ENDPOINT = "https://api.deepseek.com/chat/completions";
const DEFAULT_GEMINI_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta";
const DEFAULT_DEEPSEEK_MODEL = "deepseek-chat";
const DEFAULT_GEMINI_MODEL = "gemini-2.0-flash";
const DEFAULT_TEMPERATURE = 0.85;
const SETTINGS_KEY = "x_style_generator_settings_v2";
const PROFILE_KEY = "x_style_generator_profile_v1";
const MESSAGE_CONTACTS_KEY = "x_style_generator_message_contacts_v1";
const RAISING_RECORDS_KEY = "x_style_generator_raising_records_v1";
const MAX_RAISING_RECORDS = 5;

const raisingBackBtnEl = document.querySelector("#raising-back-btn");
const raisingCreateBtnEl = document.querySelector("#raising-create-btn");
const raisingTrashBtnEl = document.querySelector("#raising-trash-btn");
const raisingStatusEl = document.querySelector("#raising-status");
const raisingListEl = document.querySelector("#raising-list");
const raisingRoomViewEl = document.querySelector("#raising-room-view");
const raisingRoomBackBtnEl = document.querySelector("#raising-room-back-btn");
const raisingRoomTitleEl = document.querySelector("#raising-room-title");
const raisingRoomActionBtnEl = document.querySelector("#raising-room-action-btn");
const raisingRoomContentEl = document.querySelector("#raising-room-content");
const raisingRoomTabbarEl = document.querySelector("#raising-room-tabbar");
const raisingDetailViewEl = document.querySelector("#raising-detail-view");
const raisingDetailBackBtnEl = document.querySelector("#raising-detail-back-btn");
const raisingDetailRetryBtnEl = document.querySelector("#raising-detail-retry-btn");
const raisingArchiveContentEl = document.querySelector("#raising-archive-content");

const raisingCreateModalEl = document.querySelector("#raising-create-modal");
const raisingCreateFormEl = document.querySelector("#raising-create-form");
const raisingCreateOptionsEl = document.querySelector("#raising-create-options");

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
        "按当前已知身份与语境自然输出。"
      )}\n</persona_alignment>`,
      `<output_standard>\n${buildPromptSectionText(
        resolvedSections.outputStandard,
        "只输出符合要求的最终结果。"
      )}\n</output_standard>`
    ].join("\n\n"),
    maybeOptions && typeof maybeOptions === "object" ? maybeOptions.settings : undefined
  );
}
const raisingCreateStatusEl = document.querySelector("#raising-create-status");
const raisingCreateCancelBtnEl = document.querySelector("#raising-create-cancel-btn");
const raisingCreateConfirmBtnEl = document.querySelector("#raising-create-confirm-btn");

const raisingRegistrationModalEl = document.querySelector("#raising-registration-modal");
const raisingRegistrationFormEl = document.querySelector("#raising-registration-form");
const raisingRegistrationGenderEl = document.querySelector("#raising-registration-gender");
const raisingRegistrationAvatarEl = document.querySelector("#raising-registration-avatar");
const raisingRegistrationNameInputEl = document.querySelector("#raising-registration-name-input");
const raisingRegistrationDateEl = document.querySelector("#raising-registration-date");
const raisingRegistrationBirthdayTextEl = document.querySelector("#raising-registration-birthday-text");
const raisingRegistrationBirthdayInputEl = document.querySelector("#raising-registration-birthday-input");
const raisingRegistrationStatusEl = document.querySelector("#raising-registration-status");
const raisingRegistrationSubmitBtnEl = document.querySelector("#raising-registration-submit-btn");

const memoryStorage = {};

const state = {
  settings: loadSettings(),
  profile: loadProfile(),
  contacts: loadContacts(),
  records: loadRaisingRecords(),
  createModalOpen: false,
  registrationModalOpen: false,
  roomOpen: false,
  roomTab: "home",
  detailOpen: false,
  activeRecordId: "",
  registrationDraft: null,
  generatingRecordIds: {}
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

function hashText(value) {
  const text = String(value || "");
  let hash = 0;
  for (let index = 0; index < text.length; index += 1) {
    hash = (hash * 31 + text.charCodeAt(index)) >>> 0;
  }
  return hash.toString(36);
}

function clampNumber(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function sleep(ms) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
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

function appendApiLog(entry) {
  try {
    window.PulseApiLog?.append?.(entry);
  } catch (_error) {
  }
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

function normalizePositiveInteger(value, fallback) {
  const numeric = Number.parseInt(value, 10);
  if (Number.isFinite(numeric) && numeric > 0) {
    return numeric;
  }
  return fallback;
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
  const profile = readStoredJson(PROFILE_KEY, {});
  const chatProfileInitialized = Boolean(profile?.chatProfileInitialized);
  return {
    username: String(profile?.chatUsername || profile?.username || "你").trim() || "你",
    avatarImage: chatProfileInitialized
      ? String(profile?.chatAvatarImage || "").trim()
      : String(profile?.chatAvatarImage || profile?.avatarImage || "").trim(),
    personaPrompt:
      String(profile?.chatPersonaPrompt || profile?.personaPrompt || "").trim() ||
      "温柔、细腻、会认真照顾孩子。"
  };
}

function getContactAvatarFallback(contact) {
  const name = String(contact?.name || "联络人").trim();
  return name.slice(0, 2) || "联";
}

function normalizeContact(contact, index = 0) {
  const source = contact && typeof contact === "object" ? contact : {};
  const name = String(source.name || "").trim() || `联系人 ${index + 1}`;
  return {
    id: String(source.id || `contact_${index}_${hashText(name)}`),
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

function normalizeGender(value = "") {
  return String(value || "").trim() === "boy" ? "boy" : "girl";
}

function getGenderLabel(gender = "girl") {
  return normalizeGender(gender) === "boy" ? "男孩" : "女孩";
}

function getGenderShortLabel(gender = "girl") {
  return normalizeGender(gender) === "boy" ? "男宝" : "女宝";
}

function getGenderSymbol(gender = "girl") {
  return normalizeGender(gender) === "boy" ? "♂" : "♀";
}

function getDateInputValue(date = new Date()) {
  const resolvedDate = date instanceof Date ? date : new Date(date);
  const year = resolvedDate.getFullYear();
  const month = String(resolvedDate.getMonth() + 1).padStart(2, "0");
  const day = String(resolvedDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatBirthdayText(value) {
  const text = String(value || "").trim();
  if (!text) {
    return "未设置生日";
  }
  const [year = "", month = "", day = ""] = text.split("-");
  return `${Number(year) || year}年${Number(month) || month}月${Number(day) || day}日`;
}

function clampBirthdayToToday(value) {
  const today = getDateInputValue(new Date());
  const text = String(value || "").trim();
  if (!text) {
    return today;
  }
  return text > today ? today : text;
}

function getDisplayAgeLabel(record) {
  const ageLabel = String(record?.ageLabel || "").trim();
  return ageLabel || "3岁";
}

function normalizeRoomTab(tab = "home") {
  const allowedTabs = ["home", "chat", "diary", "activities"];
  const resolvedTab = String(tab || "").trim();
  return allowedTabs.includes(resolvedTab) ? resolvedTab : "home";
}

function buildChildAvatarFallback(childName = "", gender = "girl") {
  const normalizedName = String(childName || "").trim();
  if (normalizedName) {
    return normalizedName.slice(0, 1);
  }
  return getGenderSymbol(gender);
}

function normalizeArchiveData(archive = {}) {
  const source = archive && typeof archive === "object" ? archive : {};
  return {
    appearanceRating: String(source.appearanceRating || source.looksRating || "A").trim().slice(0, 8) || "A",
    appearanceSummary:
      String(source.appearanceSummary || source.looksSummary || source.appearanceText || "")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 220) || "还在等待成长档案生成中。",
    hobbies: Array.isArray(source.hobbies)
      ? source.hobbies.map((item) => String(item || "").trim()).filter(Boolean).slice(0, 4)
      : [],
    habits: Array.isArray(source.habits || source.badHabits)
      ? (source.habits || source.badHabits)
          .map((item) => String(item || "").trim())
          .filter(Boolean)
          .slice(0, 3)
      : []
  };
}

function normalizeRaisingRecord(record, index = 0) {
  const source = record && typeof record === "object" ? record : {};
  const gender = normalizeGender(source.childGender || source.gender);
  const childName = String(source.childName || "").trim() || `宝宝 ${index + 1}`;
  const birthday = String(source.birthday || "").trim() || getDateInputValue(new Date());
  return {
    id: String(source.id || `raising_${index}_${hashText(`${source.partnerId || ""}-${childName}`)}`),
    partnerId: String(source.partnerId || "").trim(),
    partnerName: String(source.partnerName || "").trim() || `伙伴 ${index + 1}`,
    partnerAvatarImage: String(source.partnerAvatarImage || "").trim(),
    partnerPersonaPrompt: String(source.partnerPersonaPrompt || "").trim(),
    childName,
    childGender: gender,
    birthday,
    ageLabel: String(source.ageLabel || "3岁").trim() || "3岁",
    avatarImage: String(source.avatarImage || "").trim(),
    avatarText: String(source.avatarText || "").trim() || buildChildAvatarFallback(childName, gender),
    createdAt: Number(source.createdAt) || Date.now(),
    updatedAt: Number(source.updatedAt) || Date.now(),
    archiveStatus: ["loading", "success", "error"].includes(source.archiveStatus)
      ? source.archiveStatus
      : "loading",
    archiveError: String(source.archiveError || "").trim(),
    archive: normalizeArchiveData(source.archive || {}),
    archiveGeneratedAt: Number(source.archiveGeneratedAt) || 0
  };
}

function loadRaisingRecords() {
  const parsed = readStoredJson(RAISING_RECORDS_KEY, []);
  return Array.isArray(parsed)
    ? parsed.map((item, index) => normalizeRaisingRecord(item, index)).slice(0, MAX_RAISING_RECORDS)
    : [];
}

function persistRaisingRecords() {
  safeSetItem(RAISING_RECORDS_KEY, JSON.stringify(state.records));
}

function getAvailablePartners() {
  const usedPartnerIds = new Set(
    state.records.map((item) => String(item.partnerId || "").trim()).filter(Boolean)
  );
  return state.contacts
    .filter((contact) => !usedPartnerIds.has(contact.id))
    .sort((left, right) => (right.updatedAt || 0) - (left.updatedAt || 0));
}

function getRecordById(recordId = "") {
  return state.records.find((item) => item.id === String(recordId || "").trim()) || null;
}

function setStatus(message = "", tone = "") {
  if (!raisingStatusEl) {
    return;
  }
  raisingStatusEl.textContent = String(message || "").trim();
  raisingStatusEl.className = "raising-status";
  if (tone) {
    raisingStatusEl.classList.add(tone);
  }
}

function setCreateStatus(message = "", tone = "") {
  if (!raisingCreateStatusEl) {
    return;
  }
  raisingCreateStatusEl.textContent = String(message || "").trim();
  raisingCreateStatusEl.className = "raising-modal__status";
  if (tone) {
    raisingCreateStatusEl.classList.add(tone);
  }
}

function setRegistrationStatus(message = "", tone = "") {
  if (!raisingRegistrationStatusEl) {
    return;
  }
  raisingRegistrationStatusEl.textContent = String(message || "").trim();
  raisingRegistrationStatusEl.className = "raising-modal__status";
  if (tone) {
    raisingRegistrationStatusEl.classList.add(tone);
  }
}

function updateBodyModalState() {
  document.body.classList.toggle(
    "raising-modal-open",
    state.createModalOpen || state.registrationModalOpen
  );
}

function buildChildAvatarMarkup(record, className = "raising-card__avatar") {
  const fallback = buildChildAvatarFallback(record.childName, record.childGender);
  const genderClass =
    normalizeGender(record.childGender) === "boy" ? " is-boy" : " is-girl";
  if (record.avatarImage) {
    return `<div class="${escapeHtml(className)}${genderClass}"><img src="${escapeHtml(record.avatarImage)}" alt="" /></div>`;
  }
  return `<div class="${escapeHtml(className)}${genderClass}">${escapeHtml(
    record.avatarText || fallback
  )}</div>`;
}

function renderRecords() {
  if (!raisingListEl) {
    return;
  }

  if (!state.records.length) {
    raisingListEl.innerHTML = `
      <section class="raising-empty">
        <strong>还没有开始养崽</strong>
        <span>点击右上角的 +，先选择一位还没共同抚养过宝宝的联系人；下一步会进入新生儿登记卡。</span>
      </section>
    `;
    return;
  }

  raisingListEl.innerHTML = state.records
    .slice()
    .sort((left, right) => (right.updatedAt || 0) - (left.updatedAt || 0))
    .map((record) => {
      const genderLabel = getGenderShortLabel(record.childGender);
      const statusBadge =
        record.archiveStatus === "loading"
          ? '<span class="raising-card__status">生成中</span>'
          : record.archiveStatus === "error"
            ? '<span class="raising-card__status is-error">待重试</span>'
            : "";
      return `
        <button
          class="raising-card"
          type="button"
          data-action="open-record"
          data-record-id="${escapeHtml(record.id)}"
        >
          ${buildChildAvatarMarkup(record)}
          <div class="raising-card__body">
            <div class="raising-card__name-row">
              <strong class="raising-card__name">${escapeHtml(record.childName)}</strong>
              <span class="raising-card__meta-tag">${escapeHtml(genderLabel)}</span>
              ${statusBadge}
            </div>
            <span class="raising-card__meta">你和 ${escapeHtml(record.partnerName)} 的宝宝 · ${escapeHtml(
              getDisplayAgeLabel(record)
            )}</span>
          </div>
          <span class="raising-card__arrow" aria-hidden="true">›</span>
        </button>
      `;
    })
    .join("");
}

function renderRoomHome(record) {
  return `
    <section class="raising-room-scene ${record.childGender === "boy" ? "is-boy" : "is-girl"}">
      <div class="raising-room-scene__clouds">
        <span class="raising-room-scene__cloud">☁</span>
        <span class="raising-room-scene__bubble">${escapeHtml(getDisplayAgeLabel(record))}</span>
      </div>

      <div class="raising-room-scene__window">
        <div class="raising-room-scene__curtain raising-room-scene__curtain--left"></div>
        <div class="raising-room-scene__curtain raising-room-scene__curtain--right"></div>
        <div class="raising-room-scene__sky"></div>
        <div class="raising-room-scene__sill">
          <span>Cute</span>
        </div>
      </div>

      <div class="raising-room-scene__floor"></div>
      <div class="raising-room-scene__rug"></div>
      <div class="raising-room-scene__toy raising-room-scene__toy--left">✎</div>
      <div class="raising-room-scene__toy raising-room-scene__toy--right">♡</div>

      <div class="raising-room-scene__child">
        ${buildChildAvatarMarkup(record, "raising-room-scene__child-avatar")}
        <div class="raising-room-scene__nameplate">
          <strong>${escapeHtml(record.childName)}</strong>
          <span>${escapeHtml(getGenderLabel(record.childGender))} · ${escapeHtml(
            getDisplayAgeLabel(record)
          )}</span>
        </div>
      </div>
    </section>
  `;
}

function renderRoomChat(record) {
  return `
    <section class="raising-room-placeholder">
      <div class="raising-room-placeholder__icon">◦◦</div>
      <strong>${escapeHtml(record.childName)} 的聊天入口</strong>
      <p>聊天 icon 先保留在这里，后续再接互动逻辑。</p>
    </section>
  `;
}

function renderRoomDiary() {
  return `
    <section class="raising-diary">
      <article class="raising-diary__paper">
        <p class="raising-diary__hint">
          手账本还空着呢<br />
          点右上右上角让宝宝记录今天呀
        </p>
      </article>
    </section>
  `;
}

function renderRoomActivities() {
  const cards = [
    {
      icon: "▣",
      title: "幼儿园（学习）",
      subtitle: "提升属性、触发事件与考试"
    },
    {
      icon: "⌁",
      title: "环游世界（旅行）",
      subtitle: "寄希望信件、带回小礼物"
    },
    {
      icon: "⊙",
      title: "了解宝宝",
      subtitle: "照看衣柜、玩具箱与各种小秘密"
    },
    {
      icon: "△",
      title: "家庭许愿瓶",
      subtitle: "收集角色与宝宝的每日心愿"
    }
  ];

  return `
    <section class="raising-activities">
      ${cards
        .map(
          (card) => `
            <article class="raising-activity-card">
              <span class="raising-activity-card__icon">${escapeHtml(card.icon)}</span>
              <div class="raising-activity-card__body">
                <strong>${escapeHtml(card.title)}</strong>
                <span>${escapeHtml(card.subtitle)}</span>
              </div>
              <span class="raising-activity-card__arrow">›</span>
            </article>
          `
        )
        .join("")}
    </section>
  `;
}

function renderRoomView() {
  if (!raisingRoomViewEl || !raisingRoomTitleEl || !raisingRoomContentEl || !raisingRoomTabbarEl) {
    return;
  }

  if (!state.roomOpen || !state.activeRecordId) {
    raisingRoomViewEl.hidden = true;
    raisingRoomViewEl.setAttribute("aria-hidden", "true");
    return;
  }

  const record = getRecordById(state.activeRecordId);
  if (!record) {
    state.roomOpen = false;
    state.detailOpen = false;
    state.activeRecordId = "";
    raisingRoomViewEl.hidden = true;
    raisingRoomViewEl.setAttribute("aria-hidden", "true");
    return;
  }

  raisingRoomViewEl.hidden = false;
  raisingRoomViewEl.setAttribute("aria-hidden", "false");

  const roomTab = normalizeRoomTab(state.roomTab);
  state.roomTab = roomTab;

  const title =
    roomTab === "home"
      ? `${record.childName}的房间`
      : roomTab === "chat"
        ? "聊天"
        : roomTab === "diary"
          ? "日记手账"
          : "活动中心";
  raisingRoomTitleEl.textContent = title;

  if (raisingRoomActionBtnEl) {
    const showAction = roomTab === "diary";
    raisingRoomActionBtnEl.hidden = !showAction;
    raisingRoomActionBtnEl.textContent = "辅导";
  }

  if (roomTab === "chat") {
    raisingRoomContentEl.innerHTML = renderRoomChat(record);
  } else if (roomTab === "diary") {
    raisingRoomContentEl.innerHTML = renderRoomDiary(record);
  } else if (roomTab === "activities") {
    raisingRoomContentEl.innerHTML = renderRoomActivities(record);
  } else {
    raisingRoomContentEl.innerHTML = renderRoomHome(record);
  }

  raisingRoomTabbarEl.querySelectorAll("[data-room-tab]").forEach((button) => {
    if (!(button instanceof HTMLElement)) {
      return;
    }
    const tabName = String(button.dataset.roomTab || "").trim();
    button.classList.toggle("is-active", tabName === roomTab);
  });
}

function renderCreateOptions() {
  if (!raisingCreateOptionsEl) {
    return;
  }

  if (state.records.length >= MAX_RAISING_RECORDS) {
    raisingCreateOptionsEl.innerHTML =
      '<div class="raising-partner-empty">已经达到最多 5 个宝宝的上限啦。先删除现有养崽记录，再来创建新的宝宝吧。</div>';
    if (raisingCreateConfirmBtnEl) {
      raisingCreateConfirmBtnEl.disabled = true;
    }
    return;
  }

  const availablePartners = getAvailablePartners();
  if (!availablePartners.length) {
    raisingCreateOptionsEl.innerHTML =
      '<div class="raising-partner-empty">通讯录里暂时没有可选联系人，或者这些联系人都已经创建过崽崽了。</div>';
    if (raisingCreateConfirmBtnEl) {
      raisingCreateConfirmBtnEl.disabled = true;
    }
    return;
  }

  if (raisingCreateConfirmBtnEl) {
    raisingCreateConfirmBtnEl.disabled = false;
  }

  raisingCreateOptionsEl.innerHTML = availablePartners
    .map(
      (contact, index) => `
        <label class="raising-partner-option">
          <input
            type="radio"
            name="partnerId"
            value="${escapeHtml(contact.id)}"
            ${index === 0 ? "checked" : ""}
          />
          <span>${escapeHtml(contact.name)}</span>
        </label>
      `
    )
    .join("");
}

function createRegistrationDraft(partner) {
  const gender = Math.random() >= 0.5 ? "boy" : "girl";
  return {
    partnerId: partner.id,
    partnerName: partner.name,
    partnerAvatarImage: partner.avatarImage || "",
    partnerPersonaPrompt: partner.personaPrompt || "",
    childGender: gender,
    childName: "",
    birthday: getDateInputValue(new Date())
  };
}

function renderRegistrationDraft() {
  const draft = state.registrationDraft;
  if (!draft) {
    return;
  }
  draft.birthday = clampBirthdayToToday(draft.birthday);

  if (raisingRegistrationGenderEl) {
    raisingRegistrationGenderEl.className = `raising-registration__gender ${
      draft.childGender === "boy" ? "is-boy" : "is-girl"
    }`;
    raisingRegistrationGenderEl.textContent = `${getGenderLabel(draft.childGender)} ${getGenderSymbol(
      draft.childGender
    )}`;
  }

  if (raisingRegistrationAvatarEl) {
    const genderClass = draft.childGender === "boy" ? " is-boy" : " is-girl";
    const fallback = buildChildAvatarFallback(draft.childName, draft.childGender);
    raisingRegistrationAvatarEl.className = `raising-registration__avatar${genderClass}`;
    raisingRegistrationAvatarEl.textContent = fallback;
  }

  if (raisingRegistrationNameInputEl) {
    raisingRegistrationNameInputEl.value = draft.childName;
  }

  if (raisingRegistrationBirthdayTextEl) {
    raisingRegistrationBirthdayTextEl.textContent = formatBirthdayText(draft.birthday);
  }

  if (raisingRegistrationBirthdayInputEl) {
    raisingRegistrationBirthdayInputEl.value = draft.birthday;
    raisingRegistrationBirthdayInputEl.max = getDateInputValue(new Date());
  }
}

function setCreateModalOpen(isOpen) {
  state.createModalOpen = Boolean(isOpen);
  if (raisingCreateModalEl) {
    raisingCreateModalEl.hidden = !state.createModalOpen;
    raisingCreateModalEl.setAttribute("aria-hidden", String(!state.createModalOpen));
  }
  updateBodyModalState();

  if (state.createModalOpen) {
    renderCreateOptions();
    setCreateStatus("");
    window.setTimeout(() => {
      raisingCreateOptionsEl?.querySelector("input[type='radio']")?.focus();
    }, 0);
  }
}

function setRegistrationModalOpen(isOpen) {
  state.registrationModalOpen = Boolean(isOpen);
  if (raisingRegistrationModalEl) {
    raisingRegistrationModalEl.hidden = !state.registrationModalOpen;
    raisingRegistrationModalEl.setAttribute("aria-hidden", String(!state.registrationModalOpen));
  }
  updateBodyModalState();

  if (state.registrationModalOpen) {
    renderRegistrationDraft();
    setRegistrationStatus("");
    if (raisingRegistrationSubmitBtnEl) {
      raisingRegistrationSubmitBtnEl.disabled = false;
      raisingRegistrationSubmitBtnEl.textContent = "完成登记（AI 生成档案）";
    }
    window.setTimeout(() => {
      raisingRegistrationNameInputEl?.focus();
    }, 0);
  }
}

function renderArchiveSection(title, bodyMarkup, accentClass = "") {
  return `
    <section class="raising-archive__note ${accentClass}">
      <div class="raising-archive__note-head">
        <strong>${escapeHtml(title)}</strong>
      </div>
      <div class="raising-archive__note-body">
        ${bodyMarkup}
      </div>
    </section>
  `;
}

function renderChipList(items = [], type = "hobby") {
  const normalizedItems = Array.isArray(items)
    ? items.map((item) => String(item || "").trim()).filter(Boolean)
    : [];
  if (!normalizedItems.length) {
    return '<div class="raising-chip-list"><span class="raising-chip is-empty">等待生成中…</span></div>';
  }
  return `
    <div class="raising-chip-list">
      ${normalizedItems
        .map(
          (item) =>
            `<span class="raising-chip ${
              type === "habit" ? "raising-chip--habit" : "raising-chip--hobby"
            }">${escapeHtml(item)}</span>`
        )
        .join("")}
    </div>
  `;
}

function renderArchiveContent(record) {
  const archive = normalizeArchiveData(record.archive || {});
  if (record.archiveStatus === "loading") {
    return `
      ${renderArchiveSection(
        "成长档案生成中",
        '<p class="raising-archive__loading">AI 正在根据双方人设生成这位宝宝的成长档案，请稍候片刻…</p>',
        "is-loading"
      )}
    `;
  }

  if (record.archiveStatus === "error") {
    return `
      ${renderArchiveSection(
        "成长档案生成失败",
        `
          <p class="raising-archive__error">${escapeHtml(
            record.archiveError || "暂时没能生成成长档案，请稍后重试。"
          )}</p>
          <button class="raising-inline-button" type="button" data-action="retry-record" data-record-id="${escapeHtml(
            record.id
          )}">重新生成档案</button>
        `,
        "is-error"
      )}
    `;
  }

  return [
    renderArchiveSection(
      `颜值鉴定（${archive.appearanceRating}）`,
      `<p class="raising-archive__paragraph">${escapeHtml(archive.appearanceSummary)}</p>`,
      "is-accent"
    ),
    renderArchiveSection("兴趣爱好", renderChipList(archive.hobbies, "hobby")),
    renderArchiveSection("待纠正的小毛病", renderChipList(archive.habits, "habit"))
  ].join("");
}

function renderDetailView() {
  if (!raisingArchiveContentEl || !raisingDetailRetryBtnEl) {
    return;
  }

  if (!state.detailOpen || !state.activeRecordId) {
    if (raisingDetailViewEl) {
      raisingDetailViewEl.hidden = true;
      raisingDetailViewEl.setAttribute("aria-hidden", "true");
    }
    return;
  }

  const record = getRecordById(state.activeRecordId);
  if (!record) {
    state.detailOpen = false;
    state.activeRecordId = "";
    if (raisingDetailViewEl) {
      raisingDetailViewEl.hidden = true;
      raisingDetailViewEl.setAttribute("aria-hidden", "true");
    }
    return;
  }

  if (raisingDetailViewEl) {
    raisingDetailViewEl.hidden = false;
    raisingDetailViewEl.setAttribute("aria-hidden", "false");
  }

  const heroGenderClass = record.childGender === "boy" ? " is-boy" : " is-girl";
  const shouldShowRetry = record.archiveStatus === "error";
  raisingDetailRetryBtnEl.hidden = !shouldShowRetry;
  raisingDetailRetryBtnEl.dataset.recordId = record.id;

  raisingArchiveContentEl.innerHTML = `
    <section class="raising-archive__board">
      <article class="raising-archive__hero${heroGenderClass}">
        <div class="raising-archive__paper">
          <div class="raising-archive__tape"></div>
          ${buildChildAvatarMarkup(record, "raising-archive__hero-avatar")}
          <strong class="raising-archive__hero-name">${escapeHtml(record.childName)}</strong>
          <span class="raising-archive__hero-meta">${escapeHtml(
            getGenderLabel(record.childGender)
          )} · ${escapeHtml(getDisplayAgeLabel(record))}</span>
          <span class="raising-archive__hero-birthday">${escapeHtml(
            formatBirthdayText(record.birthday)
          )} 出生</span>
          <span class="raising-archive__hero-parents">你和 ${escapeHtml(
            record.partnerName
          )} 的宝宝</span>
        </div>
      </article>

      <div class="raising-archive__notes">
        ${renderArchiveContent(record)}
      </div>
    </section>
  `;
}

function setRoomOpen(isOpen, recordId = state.activeRecordId, options = {}) {
  state.roomOpen = Boolean(isOpen);
  if (!state.roomOpen) {
    state.detailOpen = false;
    state.activeRecordId = "";
    state.roomTab = "home";
    renderRoomView();
    renderDetailView();
    return;
  }

  state.activeRecordId = String(recordId || state.activeRecordId || "").trim();
  state.detailOpen = false;
  state.roomTab = normalizeRoomTab(options.tab || state.roomTab || "home");
  renderRoomView();
  renderDetailView();
}

function setDetailOpen(isOpen, recordId = state.activeRecordId) {
  if (isOpen) {
    state.activeRecordId = String(recordId || state.activeRecordId || "").trim();
    state.roomOpen = true;
    state.detailOpen = true;
  } else {
    state.detailOpen = false;
  }
  renderRoomView();
  renderDetailView();
}

function buildRaisingApiLogBase(action, settings, endpoint, prompt, requestBody, summary = "") {
  const mode = normalizeApiMode(settings.mode);
  return {
    source: "raising",
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

function buildJsonObjectRequestBody(settings, prompt) {
  const mode = normalizeApiMode(settings.mode);
  if (mode === "openai") {
    return {
      model: settings.model || DEFAULT_DEEPSEEK_MODEL,
      temperature: DEFAULT_TEMPERATURE,
      messages: [
        {
          role: "system",
          content: "你只输出一个 JSON 对象，不要输出额外解释。"
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
        parts: [{ text: "你只输出一个 JSON 对象，不要输出额外解释。" }]
      },
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }]
        }
      ],
      safetySettings: buildGeminiSafetySettings(),
      generationConfig: {
        temperature: DEFAULT_TEMPERATURE
      }
    };
  }

  return {
    prompt,
    temperature: DEFAULT_TEMPERATURE,
    format: "json-object",
    intent: "raising_archive"
  };
}

function extractJsonObject(text) {
  if (!text) {
    return "";
  }

  const fenced = String(text).match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenced?.[1]) {
    return fenced[1].trim();
  }

  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start !== -1 && end !== -1 && end > start) {
    return text.slice(start, end + 1);
  }
  return "";
}

function repairMalformedJsonObjectText(jsonText) {
  return String(jsonText || "").replace(/,\s*([}\]])/g, "$1");
}

function parseJsonObjectWithRepair(jsonText, errorMessage) {
  try {
    return JSON.parse(jsonText);
  } catch (originalError) {
    const repairedJsonText = repairMalformedJsonObjectText(jsonText);
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

function buildKidArchivePrompt(profile, partner, record) {
  return buildStructuredPromptSections(
    "raising_kid_archive",
    {
      persona_alignment: {
        special_user_persona: partner.specialUserPersona
          ? `这个共同抚养人对用户的特别认知：${partner.specialUserPersona}。这部分比用户通用人设更私人、更贴近两人的相处感受，请适度提高参考权重。`
          : ""
      }
    },
    {
      settings: loadSettings(),
      variables: {
        childName: record.childName,
        childGender: getGenderLabel(record.childGender),
        userName: profile.username,
        userPersona: profile.personaPrompt || "温柔、细腻、会认真照顾孩子。",
        partnerName: partner.name,
        partnerPersona: partner.personaPrompt || "有鲜明性格，会把自己的气质投射到孩子身上。"
      }
    }
  );
}

async function requestKidArchive(settings, profile, partner, record) {
  const requestEndpoint = validateApiSettings(settings, "成长档案生成");
  const prompt = buildKidArchivePrompt(profile, partner, record);
  const privacySession = createPrivacySession({
    settings,
    profile,
    partner,
    record,
    prompt
  });
  const encodedPrompt = preparePromptWithPrivacy(prompt, privacySession);
  const requestBody = buildJsonObjectRequestBody(settings, encodedPrompt);
  const logBase = applyPrivacyToLogEntry(
    buildRaisingApiLogBase(
      "kid_archive_generate",
      settings,
      requestEndpoint,
      encodedPrompt,
      requestBody,
      `宝宝：${record.childName} · 共同抚养人：${partner.name}`
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

    if (response.status === 404 && requestEndpoint.includes("api.deepseek.com")) {
      appendApiLog({
        ...logBase,
        ...buildGeminiLogFields(settings, payload),
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

    const message = resolveMessage(payload).trim();
    const jsonText = extractJsonObject(message);
    if (!jsonText) {
      appendApiLog({
        ...logBase,
        ...buildGeminiLogFields(settings, payload),
        status: "error",
        statusCode: response.status,
        responseText: rawResponse,
        responseBody: payload,
        errorMessage: "接口请求成功，但没有返回可解析的 JSON 对象。"
      });
      logged = true;
      throw new Error("接口请求成功，但没有返回可解析的 JSON 对象。");
    }

    const parsed = parseJsonObjectWithRepair(jsonText, "成长档案 JSON 解析失败。");
    const archive = normalizeArchiveData(decodeValueWithPrivacy(parsed, privacySession));
    if (!archive.appearanceSummary || !archive.hobbies.length || !archive.habits.length) {
      appendApiLog({
        ...logBase,
        ...buildGeminiLogFields(settings, payload),
        status: "error",
        statusCode: response.status,
        responseText: rawResponse,
        responseBody: payload,
        errorMessage: "接口返回成功，但成长档案字段不完整。"
      });
      logged = true;
      throw new Error("接口返回成功，但成长档案字段不完整。");
    }

    appendApiLog({
      ...logBase,
      ...buildGeminiLogFields(settings, payload),
      status: "success",
      statusCode: response.status,
      responseText: rawResponse,
      responseBody: payload,
      summary: encodeTextWithPrivacy(
        `宝宝：${record.childName} · 已生成成长档案`,
        privacySession
      )
    });
    logged = true;
    return archive;
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

async function generateArchiveForRecord(recordId, options = {}) {
  const record = getRecordById(recordId);
  if (!record) {
    return;
  }

  if (state.generatingRecordIds[recordId]) {
    return;
  }

  if (!options.force && record.archiveStatus === "success") {
    if (state.detailOpen && state.activeRecordId === recordId) {
      renderDetailView();
    }
    return;
  }

  const partner =
    state.contacts.find((contact) => contact.id === record.partnerId) || {
      id: record.partnerId,
      name: record.partnerName,
      avatarImage: record.partnerAvatarImage,
      personaPrompt: record.partnerPersonaPrompt
    };
  const targetRecord = getRecordById(recordId);
  if (!targetRecord) {
    return;
  }

  targetRecord.archiveStatus = "loading";
  targetRecord.archiveError = "";
  targetRecord.updatedAt = Date.now();
  persistRaisingRecords();
  renderRecords();
  renderRoomView();
  renderDetailView();

  state.generatingRecordIds[recordId] = true;
  setStatus(`正在为 ${targetRecord.childName} 生成成长档案…`);

  try {
    const settings = loadSettings();
    state.settings = settings;
    const archive = await requestKidArchive(settings, state.profile, partner, targetRecord);
    const refreshedRecord = getRecordById(recordId);
    if (!refreshedRecord) {
      return;
    }
    refreshedRecord.archive = archive;
    refreshedRecord.archiveStatus = "success";
    refreshedRecord.archiveError = "";
    refreshedRecord.archiveGeneratedAt = Date.now();
    refreshedRecord.updatedAt = Date.now();
    await sleep(180);
    persistRaisingRecords();
    renderRecords();
    renderRoomView();
    renderDetailView();
    setStatus(`${refreshedRecord.childName} 的成长档案已生成。`, "success");
  } catch (error) {
    const refreshedRecord = getRecordById(recordId);
    if (refreshedRecord) {
      refreshedRecord.archiveStatus = "error";
      refreshedRecord.archiveError = error?.message || "成长档案生成失败。";
      refreshedRecord.updatedAt = Date.now();
      persistRaisingRecords();
      renderRecords();
      renderRoomView();
      renderDetailView();
    }
    setStatus(`成长档案生成失败：${error?.message || "请求失败"}`, "error");
  } finally {
    delete state.generatingRecordIds[recordId];
  }
}

function handleCreateSubmit(event) {
  event.preventDefault();
  const selectedInput = raisingCreateFormEl?.querySelector("input[name='partnerId']:checked");
  if (!(selectedInput instanceof HTMLInputElement) || !selectedInput.value) {
    setCreateStatus("请先选择一位共同抚养人。", "error");
    return;
  }

  const selectedPartner =
    state.contacts.find((contact) => contact.id === selectedInput.value) || null;
  if (!selectedPartner) {
    setCreateStatus("未找到选中的联系人，请重新选择。", "error");
    return;
  }

  state.registrationDraft = createRegistrationDraft(selectedPartner);
  setCreateModalOpen(false);
  setRegistrationModalOpen(true);
}

function handleRegistrationSubmit(event) {
  event.preventDefault();
  const draft = state.registrationDraft;
  if (!draft) {
    setRegistrationStatus("请先回到上一步选择共同抚养人。", "error");
    return;
  }

  const childName = String(raisingRegistrationNameInputEl?.value || "").trim();
  if (!childName) {
    setRegistrationStatus("请先给宝宝起个名字。", "error");
    return;
  }

  draft.childName = childName;
  draft.birthday = clampBirthdayToToday(
    String(raisingRegistrationBirthdayInputEl?.value || draft.birthday || "").trim()
  );
  if (!draft.birthday) {
    setRegistrationStatus("请确认宝宝的生日。", "error");
    return;
  }

  if (raisingRegistrationSubmitBtnEl) {
    raisingRegistrationSubmitBtnEl.disabled = true;
    raisingRegistrationSubmitBtnEl.textContent = "AI 生成档案中…";
  }
  setRegistrationStatus("登记完成，正在生成成长档案…");

  const record = normalizeRaisingRecord(
    {
      id: `raising_${Date.now()}_${hashText(`${draft.partnerId}-${draft.childName}`)}`,
      partnerId: draft.partnerId,
      partnerName: draft.partnerName,
      partnerAvatarImage: draft.partnerAvatarImage || "",
      partnerPersonaPrompt: draft.partnerPersonaPrompt || "",
      childName: draft.childName,
      childGender: draft.childGender,
      birthday: clampBirthdayToToday(draft.birthday),
      ageLabel: "3岁",
      avatarText: buildChildAvatarFallback(draft.childName, draft.childGender),
      archiveStatus: "loading",
      archive: {
        appearanceRating: "A",
        appearanceSummary: "",
        hobbies: [],
        habits: []
      },
      createdAt: Date.now(),
      updatedAt: Date.now()
    },
    state.records.length
  );

  state.records = [record, ...state.records].slice(0, MAX_RAISING_RECORDS);
  persistRaisingRecords();
  renderRecords();
  state.registrationDraft = null;
  setRegistrationModalOpen(false);
  setRoomOpen(true, record.id, { tab: "home" });
  setDetailOpen(true, record.id);
  setStatus(`已完成 ${record.childName} 的新生儿登记，正在生成成长档案…`);
  generateArchiveForRecord(record.id, { force: true });
}

function openRecord(recordId) {
  const record = getRecordById(recordId);
  if (!record) {
    return;
  }
  setRoomOpen(true, record.id, { tab: "home" });
}

function renderRegistrationStateFromInputs() {
  if (!state.registrationDraft) {
    return;
  }
  state.registrationDraft.childName = String(raisingRegistrationNameInputEl?.value || "").trim();
  state.registrationDraft.birthday = clampBirthdayToToday(
    String(
      raisingRegistrationBirthdayInputEl?.value || state.registrationDraft.birthday || ""
    ).trim()
  );
  renderRegistrationDraft();
}

function attachEvents() {
  if (raisingBackBtnEl) {
    raisingBackBtnEl.addEventListener("click", () => {
      requestEmbeddedClose();
    });
  }

  if (raisingCreateBtnEl) {
    raisingCreateBtnEl.addEventListener("click", () => {
      if (state.records.length >= MAX_RAISING_RECORDS) {
        setStatus("最多只能同时养 5 个宝宝；请先删除一位再继续。", "error");
        return;
      }
      setCreateModalOpen(true);
    });
  }

  if (raisingTrashBtnEl) {
    raisingTrashBtnEl.addEventListener("click", () => {
      if (!state.records.length) {
        setStatus("当前还没有崽崽可以删除。");
        return;
      }
      const confirmed = window.confirm("确定清空当前所有养崽记录吗？");
      if (!confirmed) {
        return;
      }
      state.records = [];
      persistRaisingRecords();
      renderRecords();
      renderRoomView();
      setDetailOpen(false);
      setRoomOpen(false);
      setStatus("已清空当前养崽记录。", "success");
    });
  }

  if (raisingListEl) {
    raisingListEl.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }
      const actionEl = target.closest("[data-action='open-record']");
      if (!(actionEl instanceof HTMLElement) || !actionEl.dataset.recordId) {
        return;
      }
      openRecord(actionEl.dataset.recordId);
    });
  }

  if (raisingRoomBackBtnEl) {
    raisingRoomBackBtnEl.addEventListener("click", () => {
      requestEmbeddedClose();
    });
  }

  if (raisingRoomActionBtnEl) {
    raisingRoomActionBtnEl.addEventListener("click", () => {
      if (state.roomTab === "diary") {
        setStatus("日记手帐的具体逻辑我们下一步再接。");
      }
    });
  }

  if (raisingRoomTabbarEl) {
    raisingRoomTabbarEl.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }
      const actionEl = target.closest("[data-room-tab]");
      if (!(actionEl instanceof HTMLElement) || !actionEl.dataset.roomTab) {
        return;
      }
      const tabName = String(actionEl.dataset.roomTab || "").trim();
      if (tabName === "archive") {
        if (state.activeRecordId) {
          setDetailOpen(true, state.activeRecordId);
        }
        return;
      }
      state.roomTab = normalizeRoomTab(tabName);
      renderRoomView();
    });
  }

  if (raisingDetailBackBtnEl) {
    raisingDetailBackBtnEl.addEventListener("click", () => {
      setDetailOpen(false);
      renderRoomView();
    });
  }

  if (raisingDetailRetryBtnEl) {
    raisingDetailRetryBtnEl.addEventListener("click", () => {
      const recordId = String(raisingDetailRetryBtnEl.dataset.recordId || "").trim();
      if (!recordId) {
        return;
      }
      generateArchiveForRecord(recordId, { force: true });
    });
  }

  if (raisingArchiveContentEl) {
    raisingArchiveContentEl.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }
      const actionEl = target.closest("[data-action='retry-record']");
      if (!(actionEl instanceof HTMLElement) || !actionEl.dataset.recordId) {
        return;
      }
      generateArchiveForRecord(actionEl.dataset.recordId, { force: true });
    });
  }

  if (raisingCreateCancelBtnEl) {
    raisingCreateCancelBtnEl.addEventListener("click", () => {
      setCreateModalOpen(false);
      setCreateStatus("");
    });
  }

  if (raisingCreateFormEl) {
    raisingCreateFormEl.addEventListener("submit", handleCreateSubmit);
  }

  if (raisingCreateModalEl) {
    raisingCreateModalEl.addEventListener("click", (event) => {
      if (
        event.target === raisingCreateModalEl ||
        event.target?.classList?.contains("raising-modal__backdrop")
      ) {
        setCreateModalOpen(false);
        setCreateStatus("");
      }
    });
  }

  if (raisingRegistrationFormEl) {
    raisingRegistrationFormEl.addEventListener("submit", handleRegistrationSubmit);
  }

  if (raisingRegistrationNameInputEl) {
    raisingRegistrationNameInputEl.addEventListener("input", () => {
      renderRegistrationStateFromInputs();
      setRegistrationStatus("");
    });
  }

  if (raisingRegistrationBirthdayInputEl) {
    raisingRegistrationBirthdayInputEl.addEventListener("input", () => {
      renderRegistrationStateFromInputs();
      setRegistrationStatus("");
    });
  }

  if (raisingRegistrationDateEl && raisingRegistrationBirthdayInputEl) {
    raisingRegistrationDateEl.addEventListener("click", (event) => {
      try {
        if (typeof raisingRegistrationBirthdayInputEl.showPicker === "function") {
          raisingRegistrationBirthdayInputEl.showPicker();
          return;
        }
      } catch (_error) {
      }
      raisingRegistrationBirthdayInputEl.focus();
      raisingRegistrationBirthdayInputEl.click();
    });
  }

  if (raisingRegistrationModalEl) {
    raisingRegistrationModalEl.addEventListener("click", (event) => {
      if (
        event.target === raisingRegistrationModalEl ||
        event.target?.classList?.contains("raising-modal__backdrop")
      ) {
        setRegistrationModalOpen(false);
        setRegistrationStatus("");
      }
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && state.registrationModalOpen) {
      setRegistrationModalOpen(false);
      setRegistrationStatus("");
      return;
    }

    if (event.key === "Escape" && state.createModalOpen) {
      setCreateModalOpen(false);
      setCreateStatus("");
      return;
    }

    if (event.key === "Escape" && state.detailOpen) {
      setDetailOpen(false);
      return;
    }

    if (event.key === "Escape" && state.roomOpen) {
      setRoomOpen(false);
      return;
    }

    if (event.key === "Escape" && isEmbeddedView()) {
      requestEmbeddedClose();
    }
  });
}

function init() {
  document.body.classList.toggle("embedded", isEmbeddedView());
  renderRecords();
  renderRoomView();
  renderDetailView();
  attachEvents();
  setStatus("点击右上角的 +，先选择共同抚养人，再进入新生儿登记卡。");
}

init();
