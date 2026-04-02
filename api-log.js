(function initPulseApiLog() {
  if (window.PulseApiLog) {
    return;
  }

  const API_LOG_KEY = "x_style_generator_api_logs_v1";
  const API_LOG_PRIVACY_KEY = "x_style_generator_api_log_privacy_v1";
  const API_LOG_LIMIT = 120;
  const API_LOG_MIN_LIMIT = 24;
  const memoryStorage = {};

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
      return true;
    } catch (_error) {
      return false;
    }
  }

  function safeRemoveItem(key) {
    delete memoryStorage[key];
    try {
      window.localStorage.removeItem(key);
    } catch (_error) {
    }
  }

  function formatTimestamp(value = Date.now()) {
    const date = value instanceof Date ? value : new Date(Number(value) || Date.now());
    const parts = new Intl.DateTimeFormat("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false
    }).formatToParts(date);
    const map = Object.fromEntries(
      parts.filter((part) => part.type !== "literal").map((part) => [part.type, part.value])
    );
    const hour = map.hour === "24" ? "00" : map.hour || "00";
    return `${map.year || "0000"}-${map.month || "00"}-${map.day || "00"} ${hour}:${map.minute || "00"}:${map.second || "00"}`;
  }

  function maskSecret(value) {
    const text = String(value || "");
    if (!text) {
      return "";
    }
    if (text.length <= 8) {
      return "********";
    }
    return `${text.slice(0, 4)}********${text.slice(-2)}`;
  }

  function sanitizeString(value = "") {
    const text = String(value || "");
    if (!text) {
      return "";
    }

    if (/^data:image\/[a-z0-9.+-]+;base64,/i.test(text)) {
      return `[image data omitted, ${text.length} chars]`;
    }

    if (text.length > 4000) {
      return `${text.slice(0, 4000)}\n…[已截断 ${text.length - 4000} 个字符]`;
    }

    return text;
  }

  function sanitizeValue(value, depth = 0) {
    if (depth > 6) {
      return "[max depth]";
    }

    if (value == null) {
      return value;
    }

    if (typeof value === "string") {
      return sanitizeString(value);
    }

    if (typeof value === "number" || typeof value === "boolean") {
      return value;
    }

    if (Array.isArray(value)) {
      const limited = value.slice(0, 40).map((item) => sanitizeValue(item, depth + 1));
      if (value.length > 40) {
        limited.push(`[+${value.length - 40} items omitted]`);
      }
      return limited;
    }

    if (typeof value === "object") {
      const result = {};
      const entries = Object.entries(value).slice(0, 60);
      entries.forEach(([key, itemValue]) => {
        if (/token|authorization|api[-_]?key|secret|password/i.test(key)) {
          result[key] = maskSecret(itemValue);
          return;
        }
        result[key] = sanitizeValue(itemValue, depth + 1);
      });
      if (Object.keys(value).length > 60) {
        result.__truncated__ = `[+${Object.keys(value).length - 60} keys omitted]`;
      }
      return result;
    }

    return sanitizeString(String(value));
  }

  function read() {
    const raw = safeGetItem(API_LOG_KEY);
    if (!raw) {
      return [];
    }

    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (_error) {
      return [];
    }
  }

  function readPrivacyEntries() {
    const raw = safeGetItem(API_LOG_PRIVACY_KEY);
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

  function writePrivacyEntries(entries = {}) {
    safeSetItem(API_LOG_PRIVACY_KEY, JSON.stringify(entries));
  }

  function sanitizePrivacySession(session) {
    if (!session || typeof session !== "object") {
      return null;
    }
    const replacements = Array.isArray(session.replacements)
      ? session.replacements
          .map((item) => ({
            raw: sanitizeString(item?.raw || ""),
            placeholder: sanitizeString(item?.placeholder || ""),
            category: sanitizeString(item?.category || "")
          }))
          .filter((item) => item.raw && item.placeholder)
      : [];
    if (!replacements.length) {
      return null;
    }
    return {
      id: sanitizeString(session.id || ""),
      replacements
    };
  }

  function prunePrivacyEntries(validIds = []) {
    const valid = new Set(validIds.map((item) => String(item || "").trim()).filter(Boolean));
    const current = readPrivacyEntries();
    const next = {};
    Object.entries(current).forEach(([logId, session]) => {
      if (valid.has(logId)) {
        next[logId] = session;
      }
    });
    writePrivacyEntries(next);
  }

  function storePrivacySession(logId, session, validIds = []) {
    const normalizedId = String(logId || "").trim();
    if (!normalizedId) {
      return;
    }
    const sanitized = sanitizePrivacySession(session);
    const next = readPrivacyEntries();
    if (sanitized) {
      next[normalizedId] = sanitized;
    } else {
      delete next[normalizedId];
    }
    if (validIds.length) {
      const valid = new Set(validIds.map((item) => String(item || "").trim()).filter(Boolean));
      Object.keys(next).forEach((key) => {
        if (!valid.has(key)) {
          delete next[key];
        }
      });
    }
    writePrivacyEntries(next);
  }

  function getPrivacySession(logId) {
    const current = readPrivacyEntries();
    return current[String(logId || "").trim()] || null;
  }

  function decodeValueByLogId(logId, value) {
    const session = getPrivacySession(logId);
    if (!session || !window.PulsePrivacyCover?.decodeWithSerializedSession) {
      return value;
    }
    return window.PulsePrivacyCover.decodeWithSerializedSession(value, session);
  }

  function compactEntryForQuota(entry = {}, level = 0) {
    const promptLimit = level === 0 ? 4000 : level === 1 ? 2200 : 1200;
    const responseLimit = level === 0 ? 4000 : level === 1 ? 2200 : 1200;
    const bodyStringLimit = level === 0 ? 1600 : level === 1 ? 900 : 420;
    const compactString = (value, limit) => {
      const text = String(value || "");
      if (!text || text.length <= limit) {
        return text;
      }
      return `${text.slice(0, limit)}\n…[已截断 ${text.length - limit} 个字符]`;
    };
    const compactValue = (value, depth = 0) => {
      if (depth > 4) {
        return "[max depth]";
      }
      if (value == null || typeof value === "number" || typeof value === "boolean") {
        return value;
      }
      if (typeof value === "string") {
        return compactString(value, bodyStringLimit);
      }
      if (Array.isArray(value)) {
        const next = value.slice(0, level === 0 ? 24 : level === 1 ? 12 : 6).map((item) => compactValue(item, depth + 1));
        if (value.length > next.length) {
          next.push(`[+${value.length - next.length} items omitted]`);
        }
        return next;
      }
      if (typeof value === "object") {
        const entries = Object.entries(value).slice(0, level === 0 ? 30 : level === 1 ? 18 : 10);
        const result = {};
        entries.forEach(([key, itemValue]) => {
          result[key] = compactValue(itemValue, depth + 1);
        });
        if (Object.keys(value).length > entries.length) {
          result.__truncated__ = `[+${Object.keys(value).length - entries.length} keys omitted]`;
        }
        return result;
      }
      return compactString(String(value), bodyStringLimit);
    };

    return {
      ...entry,
      prompt: compactString(entry.prompt || "", promptLimit),
      responseText: compactString(entry.responseText || "", responseLimit),
      requestBody: compactValue(entry.requestBody),
      responseBody: compactValue(entry.responseBody),
      geminiFinishReason: compactString(
        entry.geminiFinishReason || entry.gemini_finish_reason || "",
        120
      ),
      gemini_finish_reason: compactString(
        entry.gemini_finish_reason || entry.geminiFinishReason || "",
        120
      ),
      geminiSafetyRatings: compactValue(
        entry.geminiSafetyRatings || entry.gemini_safety_ratings || null
      ),
      gemini_safety_ratings: compactValue(
        entry.gemini_safety_ratings || entry.geminiSafetyRatings || null
      ),
      errorMessage: compactString(entry.errorMessage || "", 1000),
      summary: compactString(entry.summary || "", 800)
    };
  }

  function write(entries) {
    let nextEntries = entries.slice(-API_LOG_LIMIT);
    let serialized = JSON.stringify(nextEntries);
    if (safeSetItem(API_LOG_KEY, serialized)) {
      prunePrivacyEntries(nextEntries.map((entry) => entry.id));
      return;
    }

    for (const level of [1, 2]) {
      nextEntries = nextEntries.map((entry) => compactEntryForQuota(entry, level));
      serialized = JSON.stringify(nextEntries);
      if (safeSetItem(API_LOG_KEY, serialized)) {
        prunePrivacyEntries(nextEntries.map((entry) => entry.id));
        return;
      }
    }

    let limit = nextEntries.length;
    while (limit > API_LOG_MIN_LIMIT && !safeSetItem(API_LOG_KEY, serialized)) {
      limit = Math.max(API_LOG_MIN_LIMIT, Math.floor(limit * 0.75));
      nextEntries = nextEntries.slice(-limit);
      serialized = JSON.stringify(nextEntries.map((entry) => compactEntryForQuota(entry, 2)));
    }

    safeSetItem(API_LOG_KEY, serialized);
    prunePrivacyEntries(nextEntries.map((entry) => entry.id));
  }

  function downloadJson(filename, payload) {
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

  function append(entry = {}) {
    const privacySession = sanitizePrivacySession(entry.privacySession);
    const nextEntry = {
      id:
        String(entry.id || "").trim() ||
        `api_log_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      createdAt: Number(entry.createdAt) || Date.now(),
      source: String(entry.source || "unknown").trim() || "unknown",
      action: String(entry.action || "request").trim() || "request",
      summary: sanitizeString(entry.summary || ""),
      endpoint: sanitizeString(entry.endpoint || ""),
      mode: String(entry.mode || "").trim(),
      model: sanitizeString(entry.model || ""),
      prompt: sanitizeString(entry.prompt || ""),
      requestBody: sanitizeValue(entry.requestBody),
      responseText: sanitizeString(entry.responseText || ""),
      responseBody: sanitizeValue(entry.responseBody),
      geminiFinishReason: sanitizeString(
        entry.geminiFinishReason || entry.gemini_finish_reason || ""
      ),
      gemini_finish_reason: sanitizeString(
        entry.gemini_finish_reason || entry.geminiFinishReason || ""
      ),
      geminiSafetyRatings: sanitizeValue(
        entry.geminiSafetyRatings || entry.gemini_safety_ratings || null
      ),
      gemini_safety_ratings: sanitizeValue(
        entry.gemini_safety_ratings || entry.geminiSafetyRatings || null
      ),
      status: String(entry.status || "success").trim() || "success",
      statusCode: Number.isFinite(Number(entry.statusCode)) ? Number(entry.statusCode) : 0,
      errorMessage: sanitizeString(entry.errorMessage || "")
    };

    const entries = read();
    entries.push(nextEntry);
    write(entries);
    const validIds = read().map((item) => item.id);
    if (privacySession) {
      storePrivacySession(nextEntry.id, privacySession, validIds);
    } else {
      prunePrivacyEntries(validIds);
    }
    return nextEntry;
  }

  function clear() {
    safeRemoveItem(API_LOG_KEY);
    safeRemoveItem(API_LOG_PRIVACY_KEY);
  }

  function exportLogs() {
    const exportedAt = new Date();
    downloadJson(
      `pulse-generator-api-log-${exportedAt.toISOString().replaceAll(":", "-")}.json`,
      {
        schema: "pulse-generator-api-log",
        version: 1,
        exportedAt: exportedAt.toISOString(),
        entries: read()
      }
    );
  }

  window.PulseApiLog = {
    key: API_LOG_KEY,
    append,
    read,
    clear,
    exportLogs,
    formatTimestamp,
    getPrivacySession,
    decodeValueByLogId
  };
})();
