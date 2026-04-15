(function initPulsePrivacyAllowlistDefaults() {
  if (window.PulsePrivacyAllowlistSync) {
    return;
  }

  const SETTINGS_KEY = "x_style_generator_settings_v2";
  const PRIVACY_ALLOWLIST_TERMS_KEY = "x_style_generator_privacy_allowlist_terms_v1";
  const PRIVACY_ALLOWLIST_META_KEY = "x_style_generator_privacy_allowlist_meta_v1";
  const LOCAL_STORAGE_API_BASE_URL = "http://localhost:3000";
  const DEPLOYED_STORAGE_API_BASE_URL = "https://spring-field-3219.fly.dev";
  const NAME_ALIAS_LEVELS = ["FULL", "COMMON", "NICK", "PET", "HONOR"];
  const PRIVACY_ALLOWLIST_CATEGORIES = ["TERM", "TITLE", "NAME"];
  let loadPromise = null;

  function safeGetItem(key) {
    try {
      return window.localStorage?.getItem(key) ?? null;
    } catch (_error) {
      return null;
    }
  }

  function safeSetItem(key, value) {
    try {
      window.localStorage?.setItem(key, value);
      return true;
    } catch (_error) {
      return false;
    }
  }

  function parseJsonValue(rawValue, fallback = null) {
    if (!rawValue) {
      return fallback;
    }
    try {
      return JSON.parse(rawValue);
    } catch (_error) {
      return fallback;
    }
  }

  function normalizePrivacyAllowlist(value) {
    const list = Array.isArray(value)
      ? value
      : typeof value === "string"
        ? value.split(/\r?\n/g)
        : [];
    const unique = new Set();
    const result = [];
    list.forEach((item) => {
      const text = String(item || "").trim();
      if (!text || unique.has(text)) {
        return;
      }
      unique.add(text);
      result.push(text);
    });
    return result;
  }

  function normalizePrivacyAllowlistItemSource(value) {
    return String(value || "").trim().toLowerCase() === "scan" ? "scan" : "manual";
  }

  function normalizePrivacyAllowlistCategory(value = "") {
    const normalized = String(value || "").trim().toUpperCase();
    return PRIVACY_ALLOWLIST_CATEGORIES.includes(normalized) ? normalized : "TERM";
  }

  function normalizePrivacyNameAliasLevel(value = "") {
    const normalized = String(value || "").trim().toUpperCase();
    return NAME_ALIAS_LEVELS.includes(normalized) ? normalized : "COMMON";
  }

  function normalizePrivacyNameGroupId(value = "", fallbackText = "") {
    return (
      String(value || "").trim().slice(0, 40) ||
      String(fallbackText || "").trim().slice(0, 40)
    );
  }

  function normalizePrivacyAllowlistItems(items = []) {
    const list = Array.isArray(items) ? items : [];
    const result = [];
    const indexMap = new Map();
    list.forEach((item) => {
      const record =
        typeof item === "string" ? { text: item } : item && typeof item === "object" ? item : null;
      if (!record) {
        return;
      }
      const text = String(record.text || "").trim();
      if (!text) {
        return;
      }
      const source = normalizePrivacyAllowlistItemSource(record.source);
      const category = normalizePrivacyAllowlistCategory(record.category);
      const normalized = {
        id: String(record.id || "").trim(),
        text,
        source,
        category,
        nameGroupId:
          category === "NAME"
            ? normalizePrivacyNameGroupId(record.nameGroupId, text)
            : "",
        nameLevel:
          category === "NAME"
            ? normalizePrivacyNameAliasLevel(record.nameLevel)
            : "COMMON",
        sortOrder: Number.isFinite(Number(record.sortOrder ?? record.sort_order))
          ? Math.max(0, Math.round(Number(record.sortOrder ?? record.sort_order)))
          : result.length
      };

      if (indexMap.has(text)) {
        const existing = result[indexMap.get(text)];
        if (source === "manual") {
          existing.source = "manual";
        }
        if (existing.category === "TERM" && category !== "TERM") {
          existing.category = category;
        }
        if (category === "NAME") {
          existing.category = "NAME";
          existing.nameGroupId = normalizePrivacyNameGroupId(record.nameGroupId, text);
          existing.nameLevel = normalizePrivacyNameAliasLevel(record.nameLevel);
        }
        return;
      }

      indexMap.set(text, result.length);
      result.push(normalized);
    });

    return result.map((item, index) => ({
      ...item,
      sortOrder: index
    }));
  }

  function readStoredPrivacyAllowlistTerms() {
    return normalizePrivacyAllowlist(parseJsonValue(safeGetItem(PRIVACY_ALLOWLIST_TERMS_KEY), []));
  }

  function readStoredPrivacyAllowlistMetaItems() {
    return normalizePrivacyAllowlistItems(parseJsonValue(safeGetItem(PRIVACY_ALLOWLIST_META_KEY), []));
  }

  function readStoredSettingsPrivacyAllowlist() {
    const settings = parseJsonValue(safeGetItem(SETTINGS_KEY), {}) || {};
    return normalizePrivacyAllowlist(settings?.privacyAllowlist || []);
  }

  function getCachedItems() {
    const metaItems = readStoredPrivacyAllowlistMetaItems();
    const metaMap = new Map(metaItems.map((item) => [item.text, item]));
    const texts = normalizePrivacyAllowlist([
      ...readStoredPrivacyAllowlistTerms(),
      ...readStoredSettingsPrivacyAllowlist(),
      ...metaItems.map((item) => item.text)
    ]);

    return normalizePrivacyAllowlistItems(
      texts.map((text, index) => {
        const matchedMeta = metaMap.get(text) || null;
        return {
          id: matchedMeta?.id || "",
          text,
          source: matchedMeta?.source || "manual",
          category: matchedMeta?.category || "TERM",
          nameGroupId: matchedMeta?.nameGroupId || text,
          nameLevel: matchedMeta?.nameLevel || "COMMON",
          sortOrder: index
        };
      })
    );
  }

  function applyItemsToGlobals(items = []) {
    const normalized = normalizePrivacyAllowlistItems(items);
    window.PulsePrivacyAllowlistDefaults = Object.freeze(normalized.map((item) => item.text));
    window.PulsePrivacyAllowlistMetaDefaults = Object.freeze(
      normalized.map((item) => ({
        text: item.text,
        source: item.source,
        category: item.category,
        nameGroupId: item.nameGroupId,
        nameLevel: item.nameLevel
      }))
    );
    return normalized;
  }

  function writePrivacyAllowlistToSettings(items = []) {
    const currentSettings = parseJsonValue(safeGetItem(SETTINGS_KEY), {});
    const nextSettings =
      currentSettings && typeof currentSettings === "object" ? { ...currentSettings } : {};
    nextSettings.privacyAllowlist = items.map((item) => item.text);
    safeSetItem(SETTINGS_KEY, JSON.stringify(nextSettings));
  }

  function emitPrivacyAllowlistUpdated(items = [], source = "local") {
    try {
      window.dispatchEvent(
        new CustomEvent("pulse-privacy-allowlist-updated", {
          detail: {
            items,
            source: String(source || "local").trim() || "local"
          }
        })
      );
    } catch (_error) {
    }
  }

  function applyItemsToLocalCache(items = [], options = {}) {
    const normalized = applyItemsToGlobals(items);
    safeSetItem(
      PRIVACY_ALLOWLIST_TERMS_KEY,
      JSON.stringify(normalized.map((item) => item.text))
    );
    safeSetItem(
      PRIVACY_ALLOWLIST_META_KEY,
      JSON.stringify(
        normalized.map((item) => ({
          text: item.text,
          source: item.source,
          category: item.category,
          nameGroupId: item.nameGroupId,
          nameLevel: item.nameLevel
        }))
      )
    );
    writePrivacyAllowlistToSettings(normalized);
    if (options.emitEvent !== false) {
      emitPrivacyAllowlistUpdated(normalized, options.eventSource || "local");
    }
    return normalized;
  }

  function resolveStorageApiBaseUrl() {
    const injectedBaseUrl = String(
      window.PULSE_STORAGE_API_BASE_URL || window.PULSE_API_BASE_URL || ""
    ).trim();
    if (injectedBaseUrl) {
      return injectedBaseUrl.replace(/\/+$/, "");
    }

    const origin = String(window.location?.origin || "").trim();
    const protocol = String(window.location?.protocol || "").trim().toLowerCase();
    const hostname = String(window.location?.hostname || "").trim().toLowerCase();

    if (!origin || origin === "null" || protocol === "file:") {
      return DEPLOYED_STORAGE_API_BASE_URL;
    }
    if (hostname === "localhost" || hostname === "127.0.0.1") {
      return LOCAL_STORAGE_API_BASE_URL;
    }
    return origin.replace(/\/+$/, "");
  }

  function buildStorageApiUrl(pathname = "/api/privacy-allowlist") {
    const baseUrl = resolveStorageApiBaseUrl();
    return new URL(String(pathname || "").replace(/^\/+/, ""), `${baseUrl}/`).toString();
  }

  async function requestPrivacyAllowlistApi(pathname, options = {}) {
    const response = await fetch(buildStorageApiUrl(pathname), {
      ...options,
      cache: options.cache || "no-store",
      headers: {
        Accept: "application/json",
        ...(options.body ? { "Content-Type": "application/json" } : {}),
        ...(options.headers || {})
      }
    });

    const payload = await response
      .json()
      .catch(() => createJsonError(`Request failed (HTTP ${response.status || 500}).`));

    if (!response.ok || payload?.ok === false) {
      throw new Error(
        String(payload?.error || payload?.details || `Request failed (HTTP ${response.status || 500}).`).trim()
      );
    }

    return payload;
  }

  function createJsonError(message = "Request failed") {
    return {
      ok: false,
      error: String(message || "Request failed").trim() || "Request failed"
    };
  }

  async function loadFromCloud(options = {}) {
    if (!options.force && loadPromise) {
      return loadPromise;
    }

    const task = (async () => {
      const payload = await requestPrivacyAllowlistApi("/api/privacy-allowlist", {
        method: "GET",
        cache: "no-store"
      });
      return applyItemsToLocalCache(payload?.items || [], {
        emitEvent: options.emitEvent !== false,
        eventSource: options.eventSource || "cloud"
      });
    })();

    loadPromise = task
      .catch((error) => {
        if (options.throwOnError) {
          throw error;
        }
        return getCachedItems();
      })
      .finally(() => {
        loadPromise = null;
      });

    return loadPromise;
  }

  async function replaceInCloud(items = [], options = {}) {
    const normalized = normalizePrivacyAllowlistItems(items);
    const payload = await requestPrivacyAllowlistApi("/api/privacy-allowlist", {
      method: "PUT",
      body: JSON.stringify({
        items: normalized
      })
    });
    return applyItemsToLocalCache(payload?.items || normalized, {
      emitEvent: options.emitEvent !== false,
      eventSource: options.eventSource || "cloud-save"
    });
  }

  const initialItems = applyItemsToGlobals(getCachedItems());

  window.PulsePrivacyAllowlistSync = {
    resolveStorageApiBaseUrl,
    buildStorageApiUrl,
    normalizePrivacyAllowlist,
    normalizePrivacyAllowlistItems,
    getCachedItems,
    applyItemsToLocalCache,
    loadFromCloud,
    replaceInCloud
  };
  window.PulsePrivacyAllowlistDefaults = Object.freeze(initialItems.map((item) => item.text));
  window.PulsePrivacyAllowlistMetaDefaults = Object.freeze(
    initialItems.map((item) => ({
      text: item.text,
      source: item.source,
      category: item.category,
      nameGroupId: item.nameGroupId,
      nameLevel: item.nameLevel
    }))
  );
  window.PulsePrivacyAllowlistReady = loadFromCloud({
    emitEvent: true,
    eventSource: "cloud-init"
  });
})();
