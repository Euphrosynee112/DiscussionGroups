(function attachPulseApiSwitcher(globalScope) {
  const rootScope = globalScope || (typeof window !== "undefined" ? window : globalThis);
  const documentRef = rootScope.document;
  if (!documentRef) {
    return;
  }

  const SETTINGS_KEY = "x_style_generator_settings_v2";
  const POSITION_KEY = "x_style_generator_api_switcher_position_v1";
  const STYLE_ID = "pulse-api-switcher-style";
  const ROOT_ID = "pulse-api-switcher";

  const MODE_LABELS = {
    openai: "OpenAI兼容",
    gemini: "Gemini",
    grok: "Grok",
    generic: "通用接口"
  };
  const DEFAULT_MODELS = {
    openai: "deepseek-chat",
    gemini: "gemini-2.0-flash",
    grok: "grok-4",
    generic: ""
  };

  let switcherEl = null;
  let buttonEl = null;
  let panelEl = null;
  let dragState = null;
  let suppressNextClick = false;

  function isEmbeddedChildFrame() {
    try {
      return rootScope.self !== rootScope.top && new URLSearchParams(rootScope.location.search).get("embed") === "1";
    } catch (_error) {
      return false;
    }
  }

  if (isEmbeddedChildFrame()) {
    return;
  }

  function safeGetItem(key) {
    try {
      return rootScope.localStorage?.getItem(key) || "";
    } catch (_error) {
      return "";
    }
  }

  function safeSetItem(key, value) {
    try {
      rootScope.localStorage?.setItem(key, value);
      return true;
    } catch (_error) {
      return false;
    }
  }

  function dispatchLocalStorageUpdate(key, newValue) {
    try {
      rootScope.dispatchEvent(
        new StorageEvent("storage", {
          key,
          newValue,
          storageArea: rootScope.localStorage
        })
      );
    } catch (_error) {
      rootScope.dispatchEvent(
        new CustomEvent("pulse-local-storage-updated", {
          detail: {
            key,
            newValue
          }
        })
      );
    }
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function normalizeApiMode(mode) {
    return ["openai", "gemini", "grok", "generic"].includes(mode) ? mode : "openai";
  }

  function getApiModeLabel(mode) {
    return MODE_LABELS[normalizeApiMode(mode)] || MODE_LABELS.openai;
  }

  function getDefaultModelByMode(mode) {
    return DEFAULT_MODELS[normalizeApiMode(mode)] || DEFAULT_MODELS.openai;
  }

  function normalizeApiConfigToken(token) {
    return String(token || "").trim();
  }

  function normalizeTemperature(value, fallback = 0.85) {
    const parsed = Number.parseFloat(value);
    if (!Number.isFinite(parsed)) {
      return fallback;
    }
    return Math.min(2, Math.max(0, parsed));
  }

  function normalizeApiConfigs(configs) {
    if (!Array.isArray(configs)) {
      return [];
    }
    const seen = new Set();
    return configs
      .filter((item) => item && typeof item === "object")
      .map((item, index) => {
        const mode = normalizeApiMode(item.mode);
        const id = String(item.id || `api_cfg_${index}`).trim();
        const endpoint = String(item.endpoint || "").trim();
        const normalized = {
          id,
          name: String(item.name || "").trim() || `${getApiModeLabel(mode)} ${index + 1}`,
          mode,
          endpoint,
          token: normalizeApiConfigToken(item.token),
          model:
            mode === "generic"
              ? ""
              : String(item.model || getDefaultModelByMode(mode)).trim() || getDefaultModelByMode(mode),
          temperature: normalizeTemperature(item.temperature, 0.85),
          updatedAt: Number(item.updatedAt) || 0
        };
        return normalized.id && normalized.endpoint ? normalized : null;
      })
      .filter((item) => {
        if (!item || seen.has(item.id)) {
          return false;
        }
        seen.add(item.id);
        return true;
      });
  }

  function readRawSettings() {
    const raw = safeGetItem(SETTINGS_KEY);
    if (!raw) {
      return {};
    }
    try {
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch (_error) {
      return {};
    }
  }

  function readSwitcherSettings() {
    const settings = readRawSettings();
    const configs = normalizeApiConfigs(settings.apiConfigs || settings.apiPresets || settings.apiProfiles || []);
    const activeApiConfigId = String(settings.activeApiConfigId || "").trim();
    const activeConfig = configs.find((item) => item.id === activeApiConfigId) || null;
    return {
      raw: settings,
      enabled: Boolean(settings.floatingApiSwitcherEnabled),
      privacyCoverEnabled: settings.privacyCoverEnabled !== false,
      configs,
      activeApiConfigId: activeConfig ? activeConfig.id : "",
      activeConfig
    };
  }

  function readPosition() {
    const fallback = {
      x: Math.max(12, rootScope.innerWidth - 72),
      y: 86
    };
    const raw = safeGetItem(POSITION_KEY);
    if (!raw) {
      return fallback;
    }
    try {
      const parsed = JSON.parse(raw);
      return clampPosition({
        x: Number(parsed?.x),
        y: Number(parsed?.y)
      });
    } catch (_error) {
      return fallback;
    }
  }

  function clampPosition(position) {
    const size = 52;
    const margin = 10;
    const maxX = Math.max(margin, rootScope.innerWidth - size - margin);
    const maxY = Math.max(margin, rootScope.innerHeight - size - margin);
    const x = Number.isFinite(position?.x) ? position.x : Math.max(margin, rootScope.innerWidth - size - margin);
    const y = Number.isFinite(position?.y) ? position.y : 86;
    return {
      x: Math.min(maxX, Math.max(margin, x)),
      y: Math.min(maxY, Math.max(margin, y))
    };
  }

  function savePosition(position) {
    safeSetItem(POSITION_KEY, JSON.stringify(clampPosition(position)));
  }

  function ensureStyle() {
    if (documentRef.getElementById(STYLE_ID)) {
      return;
    }
    const style = documentRef.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      .pulse-api-switcher {
        position: fixed;
        z-index: 2147483000;
        width: 52px;
        height: 52px;
        font-family: "SF Pro Display", "Avenir Next", "PingFang SC", "Noto Sans SC", sans-serif;
        color: #0f172a;
      }
      .pulse-api-switcher__button {
        width: 52px;
        height: 52px;
        border: 0;
        border-radius: 999px;
        display: grid;
        place-items: center;
        gap: 0;
        background: rgba(15, 23, 42, 0.86);
        color: #ffffff;
        box-shadow: 0 18px 36px rgba(15, 23, 42, 0.24);
        -webkit-backdrop-filter: blur(16px);
        backdrop-filter: blur(16px);
        cursor: grab;
        touch-action: none;
        user-select: none;
      }
      .pulse-api-switcher__button:active {
        cursor: grabbing;
      }
      .pulse-api-switcher__button strong {
        font-size: 13px;
        line-height: 1;
        letter-spacing: 0.04em;
      }
      .pulse-api-switcher__button span {
        max-width: 38px;
        margin-top: 2px;
        overflow: hidden;
        color: rgba(255, 255, 255, 0.72);
        font-size: 9px;
        line-height: 1;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .pulse-api-switcher__panel {
        position: absolute;
        top: 60px;
        right: 0;
        width: min(300px, calc(100vw - 24px));
        max-height: min(430px, calc(100vh - 92px));
        overflow: hidden;
        display: none;
        border: 1px solid rgba(148, 163, 184, 0.24);
        border-radius: 24px;
        background: rgba(255, 255, 255, 0.94);
        box-shadow: 0 24px 58px rgba(15, 23, 42, 0.18);
        -webkit-backdrop-filter: blur(18px);
        backdrop-filter: blur(18px);
      }
      .pulse-api-switcher.is-open .pulse-api-switcher__panel {
        display: block;
      }
      .pulse-api-switcher.align-left .pulse-api-switcher__panel {
        right: auto;
        left: 0;
      }
      .pulse-api-switcher__head {
        padding: 14px 14px 10px;
        border-bottom: 1px solid rgba(148, 163, 184, 0.16);
      }
      .pulse-api-switcher__title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        margin: 0;
        font-size: 15px;
        font-weight: 800;
      }
      .pulse-api-switcher__active {
        margin: 7px 0 0;
        color: rgba(15, 23, 42, 0.58);
        font-size: 12px;
        line-height: 1.45;
      }
      .pulse-api-switcher__list {
        max-height: 300px;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        padding: 8px;
        touch-action: pan-y;
      }
      .pulse-api-switcher__item {
        width: 100%;
        border: 0;
        border-radius: 16px;
        display: grid;
        gap: 4px;
        padding: 11px 12px;
        background: transparent;
        color: #0f172a;
        text-align: left;
        cursor: pointer;
      }
      .pulse-api-switcher__item:hover,
      .pulse-api-switcher__item.is-active {
        background: rgba(29, 155, 240, 0.11);
      }
      .pulse-api-switcher__item strong {
        overflow: hidden;
        font-size: 14px;
        line-height: 1.25;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .pulse-api-switcher__item span {
        overflow: hidden;
        color: rgba(15, 23, 42, 0.56);
        font-size: 12px;
        line-height: 1.35;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .pulse-api-switcher__empty {
        margin: 0;
        padding: 18px 14px 20px;
        color: rgba(15, 23, 42, 0.58);
        font-size: 13px;
        line-height: 1.5;
      }
      .pulse-api-switcher__badge {
        flex: 0 0 auto;
        border-radius: 999px;
        padding: 3px 7px;
        background: rgba(34, 197, 94, 0.13);
        color: #15803d;
        font-size: 11px;
        font-weight: 700;
      }
      .pulse-api-switcher__controls {
        padding: 10px 14px 2px;
      }
      .pulse-api-switcher__toggle {
        width: 100%;
        border: 1px solid rgba(148, 163, 184, 0.22);
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        padding: 10px 12px;
        background: rgba(15, 23, 42, 0.04);
        color: #0f172a;
        cursor: pointer;
      }
      .pulse-api-switcher__toggle.is-on {
        background: rgba(34, 197, 94, 0.11);
        border-color: rgba(34, 197, 94, 0.2);
      }
      .pulse-api-switcher__toggle strong {
        font-size: 13px;
        font-weight: 800;
      }
      .pulse-api-switcher__toggle span {
        color: rgba(15, 23, 42, 0.6);
        font-size: 12px;
        line-height: 1.35;
      }
      @media (pointer: coarse) {
        .pulse-api-switcher__item,
        .pulse-api-switcher__button,
        .pulse-api-switcher__toggle {
          -webkit-tap-highlight-color: transparent;
        }
      }
    `;
    documentRef.head.appendChild(style);
  }

  function removeSwitcher() {
    switcherEl?.remove();
    switcherEl = null;
    buttonEl = null;
    panelEl = null;
  }

  function setOpen(isOpen) {
    if (!switcherEl) {
      return;
    }
    switcherEl.classList.toggle("is-open", Boolean(isOpen));
  }

  function updatePosition(position) {
    if (!switcherEl) {
      return;
    }
    const clamped = clampPosition(position);
    switcherEl.style.left = `${clamped.x}px`;
    switcherEl.style.top = `${clamped.y}px`;
    switcherEl.classList.toggle("align-left", clamped.x < rootScope.innerWidth / 2);
  }

  function getConfigSummary(config) {
    if (!config) {
      return "未选择";
    }
    const modelText = config.mode === "generic" ? "通用" : config.model || getDefaultModelByMode(config.mode);
    return `${getApiModeLabel(config.mode)} · ${modelText} · 温度 ${normalizeTemperature(
      config.temperature,
      0.85
    ).toFixed(2)}`;
  }

  function renderPanel() {
    if (!panelEl || !buttonEl) {
      return;
    }
    const state = readSwitcherSettings();
    const activeConfig = state.activeConfig;
    buttonEl.innerHTML = `<strong>API</strong><span>${escapeHtml(activeConfig ? getApiModeLabel(activeConfig.mode) : "未选")}</span>`;
    buttonEl.title = activeConfig
      ? `当前 API：${activeConfig.name}`
      : "快速切换 API";

    const listMarkup = state.configs.length
      ? state.configs
          .slice()
          .sort((left, right) => (right.updatedAt || 0) - (left.updatedAt || 0))
          .map((config) => {
            const isActive = config.id === state.activeApiConfigId;
            return `
              <button
                class="pulse-api-switcher__item${isActive ? " is-active" : ""}"
                type="button"
                data-api-config-id="${escapeHtml(config.id)}"
              >
                <strong>${escapeHtml(config.name)}${isActive ? " · 当前" : ""}</strong>
                <span>${escapeHtml(getConfigSummary(config))}</span>
              </button>
            `;
          })
          .join("")
      : '<p class="pulse-api-switcher__empty">暂无已保存的 API 配置。请先到首页设置里保存配置。</p>';

    panelEl.innerHTML = `
      <div class="pulse-api-switcher__head">
        <p class="pulse-api-switcher__title">
          <span>快速切换 API</span>
          ${activeConfig ? '<span class="pulse-api-switcher__badge">已启用</span>' : ""}
        </p>
        <p class="pulse-api-switcher__active">${
          activeConfig
            ? `当前：${escapeHtml(activeConfig.name)} · ${escapeHtml(getConfigSummary(activeConfig))}`
            : "当前没有选中的缓存配置"
        }</p>
      </div>
      <div class="pulse-api-switcher__controls">
        <button
          class="pulse-api-switcher__toggle${state.privacyCoverEnabled ? " is-on" : ""}"
          type="button"
          data-action="toggle-privacy-cover"
          aria-pressed="${state.privacyCoverEnabled ? "true" : "false"}"
        >
          <strong>关键词屏蔽</strong>
          <span>${state.privacyCoverEnabled ? "已开启，prompt 会做隐私覆盖" : "已关闭，prompt 不做关键词屏蔽"}</span>
        </button>
      </div>
      <div class="pulse-api-switcher__list">${listMarkup}</div>
    `;
  }

  function applyApiConfig(configId) {
    const state = readSwitcherSettings();
    const config = state.configs.find((item) => item.id === configId) || null;
    if (!config) {
      return;
    }
    const nextSettings = {
      ...state.raw,
      mode: config.mode,
      endpoint: config.endpoint,
      token: config.token || "",
      model: config.mode === "generic" ? "" : config.model || getDefaultModelByMode(config.mode),
      temperature: normalizeTemperature(config.temperature, 0.85),
      activeApiConfigId: config.id,
      floatingApiSwitcherEnabled: true,
      apiConfigs: state.configs
    };
    const serializedSettings = JSON.stringify(nextSettings);
    if (!safeSetItem(SETTINGS_KEY, serializedSettings)) {
      return;
    }
    dispatchLocalStorageUpdate(SETTINGS_KEY, serializedSettings);
    renderPanel();
    setOpen(false);
    rootScope.dispatchEvent(
      new CustomEvent("pulse-api-config-switched", {
        detail: {
          configId: config.id,
          config
        }
      })
    );
  }

  function togglePrivacyCover() {
    const state = readSwitcherSettings();
    const nextSettings = {
      ...state.raw,
      privacyCoverEnabled: !state.privacyCoverEnabled,
      floatingApiSwitcherEnabled: true
    };
    const serializedSettings = JSON.stringify(nextSettings);
    if (!safeSetItem(SETTINGS_KEY, serializedSettings)) {
      return;
    }
    dispatchLocalStorageUpdate(SETTINGS_KEY, serializedSettings);
    renderPanel();
    rootScope.dispatchEvent(
      new CustomEvent("pulse-settings-updated", {
        detail: {
          settings: nextSettings
        }
      })
    );
    rootScope.dispatchEvent(
      new CustomEvent("pulse-privacy-cover-toggled", {
        detail: {
          enabled: Boolean(nextSettings.privacyCoverEnabled)
        }
      })
    );
  }

  function ensureSwitcher() {
    ensureStyle();
    if (switcherEl) {
      renderPanel();
      updatePosition(readPosition());
      return;
    }
    switcherEl = documentRef.createElement("div");
    switcherEl.id = ROOT_ID;
    switcherEl.className = "pulse-api-switcher";
    buttonEl = documentRef.createElement("button");
    buttonEl.className = "pulse-api-switcher__button";
    buttonEl.type = "button";
    buttonEl.setAttribute("aria-label", "快速切换 API");
    panelEl = documentRef.createElement("section");
    panelEl.className = "pulse-api-switcher__panel";
    panelEl.setAttribute("aria-label", "快速切换 API 配置");

    switcherEl.append(buttonEl, panelEl);
    documentRef.body.appendChild(switcherEl);
    updatePosition(readPosition());
    renderPanel();

    buttonEl.addEventListener("pointerdown", (event) => {
      if (event.button != null && event.button !== 0) {
        return;
      }
      const rect = switcherEl.getBoundingClientRect();
      dragState = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        originX: rect.left,
        originY: rect.top,
        moved: false
      };
      buttonEl.setPointerCapture?.(event.pointerId);
    });

    buttonEl.addEventListener("pointermove", (event) => {
      if (!dragState || dragState.pointerId !== event.pointerId) {
        return;
      }
      const deltaX = event.clientX - dragState.startX;
      const deltaY = event.clientY - dragState.startY;
      if (Math.abs(deltaX) + Math.abs(deltaY) > 4) {
        dragState.moved = true;
      }
      if (!dragState.moved) {
        return;
      }
      const nextPosition = {
        x: dragState.originX + deltaX,
        y: dragState.originY + deltaY
      };
      updatePosition(nextPosition);
      event.preventDefault();
    });

    buttonEl.addEventListener("pointerup", (event) => {
      if (!dragState || dragState.pointerId !== event.pointerId) {
        return;
      }
      buttonEl.releasePointerCapture?.(event.pointerId);
      const wasMoved = dragState.moved;
      if (wasMoved) {
        const rect = switcherEl.getBoundingClientRect();
        savePosition({ x: rect.left, y: rect.top });
        suppressNextClick = true;
        rootScope.setTimeout(() => {
          suppressNextClick = false;
        }, 0);
      }
      dragState = null;
    });

    buttonEl.addEventListener("click", () => {
      if (suppressNextClick) {
        suppressNextClick = false;
        return;
      }
      renderPanel();
      setOpen(!switcherEl.classList.contains("is-open"));
    });

    panelEl.addEventListener("click", (event) => {
      const target = event.target instanceof Element ? event.target : null;
      const toggleEl = target?.closest("[data-action='toggle-privacy-cover']");
      if (toggleEl) {
        togglePrivacyCover();
        return;
      }
      const itemEl = target?.closest("[data-api-config-id]");
      if (!itemEl) {
        return;
      }
      applyApiConfig(String(itemEl.getAttribute("data-api-config-id") || "").trim());
    });
  }

  function refreshSwitcher() {
    const settings = readSwitcherSettings();
    if (!settings.enabled) {
      removeSwitcher();
      return;
    }
    if (documentRef.readyState === "loading") {
      return;
    }
    ensureSwitcher();
  }

  documentRef.addEventListener("click", (event) => {
    if (!switcherEl || !switcherEl.classList.contains("is-open")) {
      return;
    }
    const target = event.target instanceof Node ? event.target : null;
    if (target && switcherEl.contains(target)) {
      return;
    }
    setOpen(false);
  });

  rootScope.addEventListener("resize", () => {
    if (!switcherEl) {
      return;
    }
    const rect = switcherEl.getBoundingClientRect();
    const clamped = clampPosition({ x: rect.left, y: rect.top });
    updatePosition(clamped);
    savePosition(clamped);
  });

  rootScope.addEventListener("storage", (event) => {
    if (event.key === SETTINGS_KEY || event.key === POSITION_KEY) {
      refreshSwitcher();
    }
  });

  rootScope.addEventListener("pulse-settings-updated", refreshSwitcher);
  rootScope.addEventListener("pulse-api-switcher-refresh", refreshSwitcher);

  if (documentRef.readyState === "loading") {
    documentRef.addEventListener("DOMContentLoaded", refreshSwitcher, { once: true });
  } else {
    refreshSwitcher();
  }

  rootScope.PulseApiSwitcher = {
    refresh: refreshSwitcher,
    applyApiConfig
  };
})(typeof window !== "undefined" ? window : globalThis);
