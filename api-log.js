(function initPulseApiLog() {
  if (window.PulseApiLog) {
    return;
  }

  const API_LOG_KEY = "x_style_generator_api_logs_v1";
  const API_LOG_LIMIT = 180;
  const memoryStorage = {};

  function safeGetItem(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (_error) {
      return Object.prototype.hasOwnProperty.call(memoryStorage, key)
        ? memoryStorage[key]
        : null;
    }
  }

  function safeSetItem(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (_error) {
      memoryStorage[key] = value;
    }
  }

  function safeRemoveItem(key) {
    try {
      window.localStorage.removeItem(key);
    } catch (_error) {
      delete memoryStorage[key];
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

    if (text.length > 12000) {
      return `${text.slice(0, 12000)}\n…[已截断 ${text.length - 12000} 个字符]`;
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

  function write(entries) {
    safeSetItem(API_LOG_KEY, JSON.stringify(entries.slice(-API_LOG_LIMIT)));
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
      status: String(entry.status || "success").trim() || "success",
      statusCode: Number.isFinite(Number(entry.statusCode)) ? Number(entry.statusCode) : 0,
      errorMessage: sanitizeString(entry.errorMessage || "")
    };

    const entries = read();
    entries.push(nextEntry);
    write(entries);
    return nextEntry;
  }

  function clear() {
    safeRemoveItem(API_LOG_KEY);
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
    formatTimestamp
  };
})();
