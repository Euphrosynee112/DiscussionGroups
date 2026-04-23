const APP_BUILD_VERSION = "20260423-111157";
const PROFILE_KEY = "x_style_generator_profile_v1";
const SETTINGS_KEY = "x_style_generator_settings_v2";
const MESSAGE_CONTACTS_KEY = "x_style_generator_message_contacts_v1";
const WORLD_BOOKS_KEY = "x_style_generator_message_worldbooks_v1";
const LIVE_ENTRY_CONFIG_KEY = "x_style_generator_live_entry_config_v1";
const LIVE_CONTACT_ENTRY_CONFIGS_KEY = "x_style_generator_live_contact_entry_configs_v1";
const DEFAULT_LIVE_AUTO_REPLY_INTERVAL_SECONDS = 30;
const memoryStorage = {};

const liveLobbyBackBtnEl = document.querySelector("#live-lobby-back-btn");
const liveLobbyStatusEl = document.querySelector("#live-lobby-status");
const liveLobbyCardListEl = document.querySelector("#live-lobby-card-list");
const liveLobbyUserCreateBtnEl = document.querySelector("#live-lobby-user-create-btn");
const liveLobbySetupModalEl = document.querySelector("#live-lobby-setup-modal");
const liveLobbySetupCloseBtnEl = document.querySelector("#live-lobby-setup-close-btn");
const liveLobbySetupCancelBtnEl = document.querySelector("#live-lobby-setup-cancel-btn");
const liveLobbySetupTitleEl = document.querySelector(".live-lobby-modal__title");
const liveLobbySetupEyebrowEl = document.querySelector(".live-lobby-modal__eyebrow");
const liveLobbyTopicInputEl = document.querySelector("#live-lobby-topic-input");
const liveLobbyOpeningInputEl = document.querySelector("#live-lobby-opening-input");
const liveLobbyIntervalInputEl = document.querySelector("#live-lobby-interval-input");
const liveLobbyForumEnabledEl = document.querySelector("#live-lobby-forum-enabled");
const liveLobbyForumSelectEl = document.querySelector("#live-lobby-forum-select");
const liveLobbyBubbleEnabledEl = document.querySelector("#live-lobby-bubble-enabled");
const liveLobbyWorldbookEnabledEl = document.querySelector("#live-lobby-worldbook-enabled");
const liveLobbyWorldbookListEl = document.querySelector("#live-lobby-worldbook-list");
const liveLobbySetupStatusEl = document.querySelector("#live-lobby-setup-status");
const liveLobbySetupConfirmBtnEl = document.querySelector("#live-lobby-setup-confirm-btn");

const DEFAULT_PROFILE = {
  username: "Worldview Generator",
  userId: "@worldview_lab",
  avatar: "WG",
  avatarImage: ""
};

const state = {
  profile: loadProfile(),
  settings: loadSettings(),
  contacts: loadContacts(),
  setupModalOpen: false,
  setupMode: "user",
  setupContactId: ""
};

function isEmbeddedView() {
  try {
    return new URLSearchParams(window.location.search).get("embed") === "1";
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

function safeTrim(value = "") {
  return String(value || "").trim();
}

function hashText(value) {
  const text = String(value || "");
  let hash = 0;
  for (let index = 0; index < text.length; index += 1) {
    hash = (hash * 31 + text.charCodeAt(index)) >>> 0;
  }
  return hash.toString(36);
}

function escapeHtml(value = "") {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function truncateText(value = "", length = 120) {
  const text = safeTrim(value).replace(/\s+/g, " ");
  if (text.length <= length) {
    return text;
  }
  return `${text.slice(0, Math.max(1, length - 1))}…`;
}

function normalizeObjectArray(value) {
  return Array.isArray(value) ? value.filter((item) => item && typeof item === "object") : [];
}

function normalizeStringArray(value) {
  const items = Array.isArray(value) ? value : [];
  const seen = new Set();
  return items
    .map((item) => safeTrim(item))
    .filter((item) => {
      if (!item || seen.has(item)) {
        return false;
      }
      seen.add(item);
      return true;
    });
}

function buildContactAvatarTextFallback(contact = {}) {
  const name = safeTrim(contact.name || "");
  return name ? name.slice(0, 1).toUpperCase() : "联";
}

function normalizeCustomTabs(tabs = []) {
  return normalizeObjectArray(tabs).map((tab, index) => {
    const rawName = tab.name || tab.label || tab.title || tab.tabName || tab.tabLabel || "";
    const rawAudience =
      tab.audience ||
      tab.userPosition ||
      tab.userProfile ||
      tab.positioning ||
      tab.targetAudience ||
      tab.memberProfile ||
      "";
    const rawDiscussionText = tab.discussionText || tab.text || tab.prompt || tab.content || tab.description || "";
    const rawHotTopic = tab.hotTopic || tab.hotspot || tab.hotText || tab.topicText || tab.topic || "";
    return {
      id:
        safeTrim(tab.id || tab.feedId || tab.key) ||
        `custom_${index}_${hashText(`${rawName || ""}-${rawDiscussionText || ""}-${rawHotTopic || ""}`)}`,
      name: safeTrim(rawName || "自定义页签").slice(0, 20) || "自定义页签",
      audience: safeTrim(rawAudience),
      discussionText: safeTrim(rawDiscussionText),
      hotTopic: safeTrim(rawHotTopic)
    };
  });
}

function normalizeLiveAutoReplyIntervalSeconds(
  value,
  fallback = DEFAULT_LIVE_AUTO_REPLY_INTERVAL_SECONDS
) {
  const parsed = Number.parseInt(String(value ?? fallback), 10);
  if (!Number.isFinite(parsed)) {
    return fallback;
  }
  return Math.min(300, Math.max(10, parsed));
}

function loadSettings() {
  const source = readStoredJson(SETTINGS_KEY, {}) || {};
  return {
    customTabs: normalizeObjectArray(source.customTabs),
    liveAutoReplyIntervalSeconds: normalizeLiveAutoReplyIntervalSeconds(
      source.liveAutoReplyIntervalSeconds,
      DEFAULT_LIVE_AUTO_REPLY_INTERVAL_SECONDS
    )
  };
}

function loadProfile() {
  const source = readStoredJson(PROFILE_KEY, {}) || {};
  return {
    username: safeTrim(source.username || DEFAULT_PROFILE.username) || DEFAULT_PROFILE.username,
    userId: safeTrim(source.userId || DEFAULT_PROFILE.userId) || DEFAULT_PROFILE.userId,
    avatar: safeTrim(source.avatar || DEFAULT_PROFILE.avatar) || DEFAULT_PROFILE.avatar,
    avatarImage: safeTrim(source.avatarImage || "")
  };
}

function loadContacts() {
  return normalizeObjectArray(readStoredJson(MESSAGE_CONTACTS_KEY, []))
    .map((contact) => ({
      id: safeTrim(contact.id || ""),
      name: safeTrim(contact.name || ""),
      avatarImage: safeTrim(contact.avatarImage || ""),
      avatarText: safeTrim(contact.avatarText || "") || buildContactAvatarTextFallback(contact),
      description: truncateText(
        safeTrim(contact.personaPrompt || contact.roleSpecialPersona || "角色直播入口已预留。"),
        78
      )
    }))
    .filter((contact) => contact.id && contact.name);
}

function getLiveForumOptions() {
  const items = [{ id: "entertainment", name: "默认论坛首页" }];
  const seen = new Set(items.map((item) => item.id));
  normalizeCustomTabs(state.settings.customTabs).forEach((tab) => {
    if (!tab.id || !tab.name || seen.has(tab.id)) {
      return;
    }
    seen.add(tab.id);
    items.push({
      id: tab.id,
      name: tab.name
    });
  });
  return items;
}

function getLiveWorldbookOptions() {
  const payload = readStoredJson(WORLD_BOOKS_KEY, { categories: [], entries: [] }) || {
    categories: [],
    entries: []
  };
  const categoryMap = new Map(
    normalizeObjectArray(payload.categories).map((category, index) => {
      const categoryId = safeTrim(category.id || `category_${index}`);
      return [categoryId, safeTrim(category.name || "")];
    })
  );
  return normalizeObjectArray(payload.entries)
    .map((entry, index) => {
      const name = safeTrim(entry.name || "");
      if (!name) {
        return null;
      }
      return {
        id: safeTrim(entry.id || "") || `worldbook_${safeTrim(name).slice(0, 24)}_${index}`,
        name,
        categoryName: categoryMap.get(safeTrim(entry.categoryId || "")) || ""
      };
    })
    .filter(Boolean);
}

function normalizeLiveEntryConfig(source = {}) {
  const raw = source && typeof source === "object" ? source : {};
  const forumOptions = getLiveForumOptions();
  const validForumIds = new Set(forumOptions.map((item) => item.id));
  const validWorldbookIds = new Set(getLiveWorldbookOptions().map((item) => item.id));
  const fallbackForumId = forumOptions[0]?.id || "entertainment";
  const forumTabId = safeTrim(
    raw.forumTabId ||
      raw.forumTab ||
      (Array.isArray(raw.forumTabIds) ? raw.forumTabIds[0] : "") ||
      (Array.isArray(raw.forumTabs) ? raw.forumTabs[0] : "") ||
      fallbackForumId
  );

  return {
    mode: raw.mode === "contact" ? "contact" : "user",
    contactId: safeTrim(raw.contactId || raw.contact_id || ""),
    topic: safeTrim(raw.topic || ""),
    openingDescription: safeTrim(
      raw.openingDescription || raw.initialDescription || raw.liveOpeningText || ""
    ),
    autoReplyIntervalSeconds: normalizeLiveAutoReplyIntervalSeconds(
      raw.autoReplyIntervalSeconds ||
        raw.intervalSeconds ||
        raw.liveAutoReplyIntervalSeconds ||
        state.settings.liveAutoReplyIntervalSeconds,
      state.settings.liveAutoReplyIntervalSeconds
    ),
    forumEnabled: Boolean(raw.forumEnabled),
    forumTabId: validForumIds.has(forumTabId) ? forumTabId : fallbackForumId,
    bubbleEnabled: Boolean(raw.bubbleEnabled),
    worldbookEnabled: Boolean(raw.worldbookEnabled),
    worldbookIds: normalizeStringArray(raw.worldbookIds).filter((item) => validWorldbookIds.has(item)),
    updatedAt: Number.isFinite(Number(raw.updatedAt)) ? Number(raw.updatedAt) : 0
  };
}

function loadLiveEntryConfig() {
  return normalizeLiveEntryConfig(readStoredJson(LIVE_ENTRY_CONFIG_KEY, {}) || {});
}

function persistLiveEntryConfig(config = {}) {
  safeSetItem(LIVE_ENTRY_CONFIG_KEY, JSON.stringify(normalizeLiveEntryConfig(config)));
}

function loadContactLiveEntryConfigs() {
  const source = readStoredJson(LIVE_CONTACT_ENTRY_CONFIGS_KEY, {}) || {};
  if (!source || typeof source !== "object" || Array.isArray(source)) {
    return {};
  }
  return Object.fromEntries(
    Object.entries(source)
      .map(([contactId, config]) => {
        const resolvedContactId = safeTrim(contactId);
        if (!resolvedContactId) {
          return null;
        }
        return [
          resolvedContactId,
          normalizeLiveEntryConfig({
            ...(config && typeof config === "object" ? config : {}),
            mode: "contact",
            contactId: resolvedContactId
          })
        ];
      })
      .filter(Boolean)
  );
}

function persistContactLiveEntryConfig(contactId = "", config = {}) {
  const resolvedContactId = safeTrim(contactId);
  if (!resolvedContactId) {
    return;
  }
  const allConfigs = loadContactLiveEntryConfigs();
  allConfigs[resolvedContactId] = normalizeLiveEntryConfig({
    ...config,
    mode: "contact",
    contactId: resolvedContactId
  });
  safeSetItem(LIVE_CONTACT_ENTRY_CONFIGS_KEY, JSON.stringify(allConfigs));
}

function getCurrentSetupContact() {
  const contactId = safeTrim(state.setupContactId || "");
  return state.contacts.find((item) => item.id === contactId) || null;
}

function loadSetupEntryConfig(mode = state.setupMode, contactId = state.setupContactId) {
  if (mode === "contact") {
    const resolvedContactId = safeTrim(contactId);
    const contactConfigs = loadContactLiveEntryConfigs();
    return normalizeLiveEntryConfig({
      ...(contactConfigs[resolvedContactId] || {}),
      mode: "contact",
      contactId: resolvedContactId
    });
  }
  return normalizeLiveEntryConfig({
    ...loadLiveEntryConfig(),
    mode: "user",
    contactId: ""
  });
}

function setStatus(message, tone = "") {
  if (!liveLobbyStatusEl) {
    return;
  }
  liveLobbyStatusEl.textContent = message;
  liveLobbyStatusEl.className = "live-lobby-status";
  if (tone) {
    liveLobbyStatusEl.classList.add(`is-${tone}`);
  }
}

function setSetupStatus(message, tone = "") {
  if (!liveLobbySetupStatusEl) {
    return;
  }
  liveLobbySetupStatusEl.textContent = message;
  liveLobbySetupStatusEl.className = "live-lobby-modal__status";
  if (tone) {
    liveLobbySetupStatusEl.classList.add(`is-${tone}`);
  }
}

function renderContactCards() {
  if (!liveLobbyCardListEl) {
    return;
  }

  if (!state.contacts.length) {
    liveLobbyCardListEl.innerHTML =
      '<div class="live-lobby-empty">当前还没有通讯录角色。先去 Chat 的通讯录创建角色，后续这里会直接显示对应直播卡片。</div>';
    return;
  }

  liveLobbyCardListEl.innerHTML = state.contacts
    .map(
      (contact) => `
        <button
          class="live-lobby-card"
          type="button"
          data-live-contact-id="${escapeHtml(contact.id)}"
          aria-label="查看 ${escapeHtml(contact.name)} 的角色直播入口"
        >
          <span class="live-lobby-card__badge">
            <span class="live-lobby-card__badge-dot"></span>
            角色直播
          </span>
          <span class="live-lobby-card__body">
            <h3 class="live-lobby-card__title">${escapeHtml(contact.name)} 的直播间</h3>
            <p class="live-lobby-card__desc">${escapeHtml(contact.description)}</p>
            <span class="live-lobby-card__meta">
              <span class="live-lobby-card__avatar">
                ${
                  contact.avatarImage
                    ? `<img src="${escapeHtml(contact.avatarImage)}" alt="${escapeHtml(contact.name)} 的头像" />`
                    : escapeHtml(contact.avatarText || buildContactAvatarTextFallback(contact))
                }
              </span>
              <span class="live-lobby-card__meta-text">
                <strong>${escapeHtml(contact.name)}</strong>
                <span>点击进入开播设置</span>
              </span>
            </span>
          </span>
        </button>
      `
    )
    .join("");
}

function getDraftConfig() {
  const worldbookIds = liveLobbyWorldbookListEl
    ? [...liveLobbyWorldbookListEl.querySelectorAll('input[type="checkbox"]:checked')].map((input) =>
        safeTrim(input.value)
      )
    : [];

  return normalizeLiveEntryConfig({
    mode: state.setupMode,
    contactId: state.setupContactId,
    topic: safeTrim(liveLobbyTopicInputEl?.value || ""),
    openingDescription: safeTrim(liveLobbyOpeningInputEl?.value || ""),
    autoReplyIntervalSeconds: normalizeLiveAutoReplyIntervalSeconds(
      liveLobbyIntervalInputEl?.value,
      state.settings.liveAutoReplyIntervalSeconds
    ),
    forumEnabled: Boolean(liveLobbyForumEnabledEl?.checked),
    forumTabId: safeTrim(liveLobbyForumSelectEl?.value || ""),
    bubbleEnabled: Boolean(liveLobbyBubbleEnabledEl?.checked),
    worldbookEnabled: Boolean(liveLobbyWorldbookEnabledEl?.checked),
    worldbookIds
  });
}

function renderSetupModal(config = loadSetupEntryConfig()) {
  const resolvedConfig = normalizeLiveEntryConfig(config);
  const forumOptions = getLiveForumOptions();
  const worldbookOptions = getLiveWorldbookOptions();
  const setupContact = getCurrentSetupContact();

  if (liveLobbySetupEyebrowEl) {
    liveLobbySetupEyebrowEl.textContent =
      state.setupMode === "contact" ? "Role Live Setup" : "Live Setup";
  }
  if (liveLobbySetupTitleEl) {
    liveLobbySetupTitleEl.textContent =
      state.setupMode === "contact" && setupContact
        ? `${setupContact.name} 的直播预设`
        : "直播预设";
  }

  if (liveLobbyTopicInputEl) {
    liveLobbyTopicInputEl.value = resolvedConfig.topic;
  }
  if (liveLobbyOpeningInputEl) {
    liveLobbyOpeningInputEl.value = resolvedConfig.openingDescription;
  }
  if (liveLobbyIntervalInputEl) {
    liveLobbyIntervalInputEl.value = String(
      normalizeLiveAutoReplyIntervalSeconds(
        resolvedConfig.autoReplyIntervalSeconds,
        state.settings.liveAutoReplyIntervalSeconds
      )
    );
  }
  if (liveLobbyForumEnabledEl) {
    liveLobbyForumEnabledEl.checked = resolvedConfig.forumEnabled;
  }
  if (liveLobbyForumSelectEl) {
    liveLobbyForumSelectEl.innerHTML = forumOptions
      .map(
        (item) =>
          `<option value="${escapeHtml(item.id)}">${escapeHtml(item.name)}</option>`
      )
      .join("");
    liveLobbyForumSelectEl.value = resolvedConfig.forumTabId;
    liveLobbyForumSelectEl.disabled = !resolvedConfig.forumEnabled;
  }
  if (liveLobbyBubbleEnabledEl) {
    liveLobbyBubbleEnabledEl.checked = resolvedConfig.bubbleEnabled;
  }
  if (liveLobbyWorldbookEnabledEl) {
    liveLobbyWorldbookEnabledEl.checked = resolvedConfig.worldbookEnabled;
  }
  if (liveLobbyWorldbookListEl) {
    const disabled = !resolvedConfig.worldbookEnabled;
    liveLobbyWorldbookListEl.classList.toggle("is-disabled", disabled);
    liveLobbyWorldbookListEl.classList.toggle("is-empty", !worldbookOptions.length);
    if (!worldbookOptions.length) {
      liveLobbyWorldbookListEl.innerHTML =
        '<p class="live-lobby-box__hint">当前还没有可选世界书，后续新增后这里会自动出现。</p>';
    } else {
      liveLobbyWorldbookListEl.innerHTML = worldbookOptions
        .map(
          (item) => `
            <label class="live-lobby-worldbook-item">
              <input
                type="checkbox"
                value="${escapeHtml(item.id)}"
                ${resolvedConfig.worldbookIds.includes(item.id) ? "checked" : ""}
                ${disabled ? "disabled" : ""}
              />
              <span class="live-lobby-worldbook-item__meta">
                <strong>${escapeHtml(item.name)}</strong>
                <span>${escapeHtml(item.categoryName || "未分类")}</span>
              </span>
            </label>
          `
        )
        .join("");
    }
  }
}

function setSetupModalOpen(isOpen, options = {}) {
  state.setupModalOpen = Boolean(isOpen);
  if (!liveLobbySetupModalEl) {
    return;
  }

  if (state.setupModalOpen) {
    state.setupMode = options.mode === "contact" ? "contact" : "user";
    state.setupContactId = state.setupMode === "contact" ? safeTrim(options.contactId || "") : "";
    renderSetupModal(loadSetupEntryConfig(state.setupMode, state.setupContactId));
    setSetupStatus("");
    liveLobbySetupModalEl.hidden = false;
    liveLobbySetupModalEl.setAttribute("aria-hidden", "false");
    window.setTimeout(() => {
      liveLobbyTopicInputEl?.focus();
    }, 0);
    return;
  }

  liveLobbySetupModalEl.hidden = true;
  liveLobbySetupModalEl.setAttribute("aria-hidden", "true");
  state.setupMode = "user";
  state.setupContactId = "";
  setSetupStatus("");
}

function openConfiguredLivePage() {
  window.location.href = `./live.html?embed=${isEmbeddedView() ? "1" : "0"}&v=${APP_BUILD_VERSION}`;
}

function handleRoleCardClick(contactId = "") {
  const contact = state.contacts.find((item) => item.id === contactId);
  if (!contact) {
    return;
  }
  setStatus("");
  setSetupModalOpen(true, {
    mode: "contact",
    contactId: contact.id
  });
}

function attachEvents() {
  liveLobbyBackBtnEl?.addEventListener("click", () => {
    requestEmbeddedClose();
  });

  liveLobbyUserCreateBtnEl?.addEventListener("click", () => {
    setStatus("");
    setSetupModalOpen(true, { mode: "user" });
  });

  liveLobbyCardListEl?.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }
    const actionEl = target.closest("[data-live-contact-id]");
    if (!(actionEl instanceof HTMLElement)) {
      return;
    }
    handleRoleCardClick(safeTrim(actionEl.getAttribute("data-live-contact-id") || ""));
  });

  liveLobbySetupCloseBtnEl?.addEventListener("click", () => {
    setSetupModalOpen(false);
  });

  liveLobbySetupCancelBtnEl?.addEventListener("click", () => {
    setSetupModalOpen(false);
  });

  liveLobbySetupModalEl?.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }
    if (target.hasAttribute("data-close-live-lobby-setup")) {
      setSetupModalOpen(false);
    }
  });

  [liveLobbyTopicInputEl, liveLobbyOpeningInputEl, liveLobbyIntervalInputEl, liveLobbyForumSelectEl]
    .filter(Boolean)
    .forEach((field) => {
      field.addEventListener("input", () => {
        setSetupStatus("");
      });
      field.addEventListener("change", () => {
        setSetupStatus("");
        if (field === liveLobbyIntervalInputEl) {
          liveLobbyIntervalInputEl.value = String(
            normalizeLiveAutoReplyIntervalSeconds(
              liveLobbyIntervalInputEl.value,
              state.settings.liveAutoReplyIntervalSeconds
            )
          );
        }
      });
    });

  liveLobbyForumEnabledEl?.addEventListener("change", () => {
    renderSetupModal(getDraftConfig());
    setSetupStatus("");
  });

  liveLobbyBubbleEnabledEl?.addEventListener("change", () => {
    setSetupStatus("");
  });

  liveLobbyWorldbookEnabledEl?.addEventListener("change", () => {
    renderSetupModal(getDraftConfig());
    setSetupStatus("");
  });

  liveLobbyWorldbookListEl?.addEventListener("change", () => {
    setSetupStatus("");
  });

  liveLobbySetupConfirmBtnEl?.addEventListener("click", () => {
    const draft = getDraftConfig();
    if (!draft.topic) {
      setSetupStatus("请输入直播主题。", "error");
      liveLobbyTopicInputEl?.focus();
      return;
    }

    persistLiveEntryConfig({
      ...draft,
      mode: state.setupMode,
      contactId: state.setupMode === "contact" ? state.setupContactId : "",
      updatedAt: Date.now()
    });
    if (state.setupMode === "contact") {
      persistContactLiveEntryConfig(state.setupContactId, {
        ...draft,
        updatedAt: Date.now()
      });
    }
    setSetupModalOpen(false);
    openConfiguredLivePage();
  });

  window.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") {
      return;
    }
    if (state.setupModalOpen) {
      setSetupModalOpen(false);
      return;
    }
    requestEmbeddedClose();
  });
}

function init() {
  renderContactCards();
  setStatus("");
  setSetupModalOpen(false);
  attachEvents();
}

init();
