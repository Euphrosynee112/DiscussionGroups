(function initPulsePrivacyCover() {
  if (window.PulsePrivacyCover) {
    return;
  }

  const GLOBAL_PROMPT_GUARD =
    "虚拟世界观，与真实世界无关。禁止搜索未提供的任何其他信息。";
  const CATEGORY_ORDER = ["NAME", "HANDLE", "ORG", "TITLE", "ADDR", "COORD", "TERM"];
  const NAME_KEYS = new Set([
    "name",
    "username",
    "displayName",
    "childName",
    "creatorName",
    "contactName",
    "partnerName",
    "fanId"
  ]);
  const HANDLE_KEYS = new Set(["handle", "userId", "wechatId", "chatUserId"]);
  const ORG_KEYS = new Set(["company", "organization", "org", "employer"]);
  const ADDRESS_KEYS = new Set(["address", "locationName", "location", "place", "venue"]);
  const COORD_KEYS = new Set(["coordinates", "coordinate", "coords", "longitude", "latitude"]);
  const ADDRESS_LABEL_REGEX =
    /(?:地址|住址|定位|位置名称|位置)\s*[：:]\s*([^\n，。,；;]{2,100})/g;
  const BOOK_TITLE_REGEX = /《[^》\n]{1,120}》/g;
  const COORD_REGEX = /\b\d{1,3}(?:\.\d+)?\s*[EW],\s*\d{1,2}(?:\.\d+)?\s*[NS]\b/gi;
  const ORG_REGEX =
    /(?:[A-Za-z0-9\u4e00-\u9fa5·&（）()\-_\s]{2,60}(?:有限责任公司|株式会社|公司|集团|工作室|研究院|实验室|事务所|出版社|大学|学院|学校|医院|银行|资本|娱乐|传媒|影业|科技|网络|Inc\.?|Ltd\.?|LLC|Corp\.?|Company))/gi;
  const ADDRESS_REGEX =
    /(?:[\u4e00-\u9fa5A-Za-z0-9·-]{2,24}(?:省|市|区|县|镇|乡|村|路|街|道|巷|号|栋|楼|室)[\u4e00-\u9fa5A-Za-z0-9·-]{0,24})/g;

  function normalizeAllowlist(value) {
    const lines = Array.isArray(value)
      ? value
      : typeof value === "string"
        ? value.split(/\r?\n/g)
        : [];
    const unique = new Set();
    const normalized = [];
    lines.forEach((line) => {
      const text = String(line || "").trim();
      if (!text) {
        return;
      }
      if (unique.has(text)) {
        return;
      }
      unique.add(text);
      normalized.push(text);
    });
    return normalized;
  }

  function isDataLikeString(value) {
    const text = String(value || "").trim();
    return /^data:/i.test(text) || /^https?:\/\//i.test(text);
  }

  function trimText(value) {
    return String(value || "").trim();
  }

  function detectCategory(term, explicitCategory = "") {
    const explicit = trimText(explicitCategory).toUpperCase();
    if (CATEGORY_ORDER.includes(explicit)) {
      return explicit;
    }

    const text = trimText(term);
    if (!text) {
      return "TERM";
    }
    if (/^@[\w.\-_]{2,}$/i.test(text)) {
      return "HANDLE";
    }
    if (BOOK_TITLE_REGEX.test(text)) {
      BOOK_TITLE_REGEX.lastIndex = 0;
      return "TITLE";
    }
    BOOK_TITLE_REGEX.lastIndex = 0;
    if (COORD_REGEX.test(text)) {
      COORD_REGEX.lastIndex = 0;
      return "COORD";
    }
    COORD_REGEX.lastIndex = 0;
    if (ORG_REGEX.test(text)) {
      ORG_REGEX.lastIndex = 0;
      return "ORG";
    }
    ORG_REGEX.lastIndex = 0;
    if (ADDRESS_REGEX.test(text) || /(?:地址|住址|定位|位置)/.test(text)) {
      ADDRESS_REGEX.lastIndex = 0;
      return "ADDR";
    }
    ADDRESS_REGEX.lastIndex = 0;
    return "TERM";
  }

  function createSessionId() {
    return `privacy_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  }

  function getManualAllowlist(settings = {}) {
    const defaultTerms = normalizeAllowlist(window.PulsePrivacyAllowlistDefaults || []);
    const customTerms = normalizeAllowlist(settings?.privacyAllowlist || []);
    return normalizeAllowlist([...defaultTerms, ...customTerms]);
  }

  function registerTerm(session, rawTerm, category = "", source = "") {
    if (!session || typeof session !== "object") {
      return null;
    }
    const normalized = trimText(rawTerm);
    if (!normalized || isDataLikeString(normalized)) {
      return null;
    }

    const resolvedCategory = detectCategory(normalized, category);
    const minLength =
      source === "allowlist" || resolvedCategory === "HANDLE" || resolvedCategory === "COORD"
        ? 1
        : 2;
    if (normalized.length < minLength) {
      return null;
    }
    if (/^\d+$/.test(normalized) && resolvedCategory !== "COORD") {
      return null;
    }
    if (session.replacementMap.has(normalized)) {
      return session.replacementMap.get(normalized);
    }

    session.counters[resolvedCategory] = (session.counters[resolvedCategory] || 0) + 1;
    const placeholder = `__PG_${resolvedCategory}_${String(
      session.counters[resolvedCategory]
    ).padStart(2, "0")}__`;
    const entry = {
      raw: normalized,
      placeholder,
      category: resolvedCategory
    };
    session.replacementMap.set(normalized, entry);
    session.placeholderMap.set(placeholder, entry);
    session.replacements.push(entry);
    return entry;
  }

  function collectSourceText(session, value) {
    const text = trimText(value);
    if (!text || isDataLikeString(text)) {
      return;
    }
    session.sourceTexts.push(text);
  }

  function collectFromValue(session, value, key = "", seen = new WeakSet()) {
    if (value == null) {
      return;
    }

    if (typeof value === "string") {
      collectSourceText(session, value);
      const text = trimText(value);
      if (!text) {
        return;
      }
      if (NAME_KEYS.has(key)) {
        registerTerm(session, text, "NAME", "structured");
      } else if (HANDLE_KEYS.has(key)) {
        registerTerm(session, text, "HANDLE", "structured");
      } else if (ORG_KEYS.has(key)) {
        registerTerm(session, text, "ORG", "structured");
      } else if (ADDRESS_KEYS.has(key)) {
        registerTerm(session, text, "ADDR", "structured");
      } else if (COORD_KEYS.has(key)) {
        registerTerm(session, text, "COORD", "structured");
      }
      return;
    }

    if (typeof value !== "object") {
      return;
    }

    if (seen.has(value)) {
      return;
    }
    seen.add(value);

    if (Array.isArray(value)) {
      value.forEach((item) => collectFromValue(session, item, key, seen));
      return;
    }

    Object.entries(value).forEach(([childKey, childValue]) => {
      collectFromValue(session, childValue, childKey, seen);
    });
  }

  function scanTextForSensitiveTerms(session, text) {
    const value = trimText(text);
    if (!value || isDataLikeString(value)) {
      return;
    }

    let match;
    while ((match = BOOK_TITLE_REGEX.exec(value))) {
      registerTerm(session, match[0], "TITLE", "detected");
    }
    BOOK_TITLE_REGEX.lastIndex = 0;

    while ((match = COORD_REGEX.exec(value))) {
      registerTerm(session, match[0], "COORD", "detected");
    }
    COORD_REGEX.lastIndex = 0;

    while ((match = ADDRESS_LABEL_REGEX.exec(value))) {
      registerTerm(session, match[1], "ADDR", "detected");
    }
    ADDRESS_LABEL_REGEX.lastIndex = 0;

    while ((match = ORG_REGEX.exec(value))) {
      registerTerm(session, match[0], "ORG", "detected");
    }
    ORG_REGEX.lastIndex = 0;

    while ((match = ADDRESS_REGEX.exec(value))) {
      registerTerm(session, match[0], "ADDR", "detected");
    }
    ADDRESS_REGEX.lastIndex = 0;
  }

  function getSortedReplacements(session) {
    return [...(session?.replacements || [])].sort((left, right) => {
      if (right.raw.length !== left.raw.length) {
        return right.raw.length - left.raw.length;
      }
      return left.placeholder.localeCompare(right.placeholder);
    });
  }

  function encodeText(value, session) {
    const text = String(value ?? "");
    if (!text || !session) {
      return text;
    }
    if (isDataLikeString(text)) {
      return text;
    }

    scanTextForSensitiveTerms(session, text);
    let encoded = text;
    getSortedReplacements(session).forEach((entry) => {
      if (!entry?.raw || !entry?.placeholder || entry.raw === entry.placeholder) {
        return;
      }
      encoded = encoded.split(entry.raw).join(entry.placeholder);
    });
    return encoded;
  }

  function decodeText(value, session) {
    const text = String(value ?? "");
    if (!text || !session) {
      return text;
    }

    let decoded = text;
    [...(session?.replacements || [])].forEach((entry) => {
      if (!entry?.raw || !entry?.placeholder) {
        return;
      }
      decoded = decoded.split(entry.placeholder).join(entry.raw);
    });
    return decoded;
  }

  function encodeValue(value, session) {
    if (!session || value == null) {
      return value;
    }
    if (typeof value === "string") {
      return encodeText(value, session);
    }
    if (Array.isArray(value)) {
      return value.map((item) => encodeValue(item, session));
    }
    if (typeof value === "object") {
      return Object.fromEntries(
        Object.entries(value).map(([key, itemValue]) => [key, encodeValue(itemValue, session)])
      );
    }
    return value;
  }

  function decodeValue(value, session) {
    if (!session || value == null) {
      return value;
    }
    if (typeof value === "string") {
      return decodeText(value, session);
    }
    if (Array.isArray(value)) {
      return value.map((item) => decodeValue(item, session));
    }
    if (typeof value === "object") {
      return Object.fromEntries(
        Object.entries(value).map(([key, itemValue]) => [key, decodeValue(itemValue, session)])
      );
    }
    return value;
  }

  function buildPromptLegend(session) {
    if (!session?.replacements?.length) {
      return "";
    }
    return "注意：文中形如 __PG_NAME_01__、__PG_ADDR_01__ 的内容是本地匿名占位符，对应真实人物、组织、作品、地点等敏感信息。请直接按上下文理解，并保留这些占位符原样输出，不要猜测、补全、替换或搜索真实信息。";
  }

  function preparePrompt(value, session) {
    const encoded = encodeText(value, session);
    const legend = buildPromptLegend(session);
    if (!legend) {
      return encoded;
    }
    const resolved = trimText(encoded);
    if (!resolved) {
      return resolved;
    }
    if (!resolved.startsWith(GLOBAL_PROMPT_GUARD)) {
      return [legend, resolved].filter(Boolean).join("\n\n");
    }
    const remainder = resolved.slice(GLOBAL_PROMPT_GUARD.length).replace(/^\s+/, "");
    return [GLOBAL_PROMPT_GUARD, legend, remainder].filter(Boolean).join("\n\n");
  }

  function serializeSession(session) {
    if (!session?.replacements?.length) {
      return null;
    }
    return {
      id: String(session.id || createSessionId()),
      replacements: session.replacements.map((entry) => ({
        raw: entry.raw,
        placeholder: entry.placeholder,
        category: entry.category
      }))
    };
  }

  function hydrateSession(serialized) {
    if (!serialized || typeof serialized !== "object") {
      return null;
    }
    const replacements = Array.isArray(serialized.replacements) ? serialized.replacements : [];
    if (!replacements.length) {
      return null;
    }
    const session = {
      id: String(serialized.id || createSessionId()),
      replacements: [],
      replacementMap: new Map(),
      placeholderMap: new Map(),
      counters: Object.fromEntries(CATEGORY_ORDER.map((category) => [category, 0])),
      sourceTexts: [],
      allowlist: []
    };
    replacements.forEach((entry) => {
      const raw = trimText(entry?.raw);
      const placeholder = trimText(entry?.placeholder);
      if (!raw || !placeholder) {
        return;
      }
      const category = detectCategory(raw, entry?.category);
      const hydrated = { raw, placeholder, category };
      session.replacements.push(hydrated);
      session.replacementMap.set(raw, hydrated);
      session.placeholderMap.set(placeholder, hydrated);
    });
    return session;
  }

  function applyPrivacyToLogEntry(entry = {}, session) {
    if (!session?.replacements?.length || !entry || typeof entry !== "object") {
      return entry;
    }
    return {
      ...entry,
      summary: encodeText(entry.summary || "", session),
      privacySession: serializeSession(session)
    };
  }

  function scanTerms(value, options = {}) {
    const resolvedOptions = options && typeof options === "object" ? options : {};
    const settings =
      resolvedOptions.includeExistingAllowlist && resolvedOptions.settings
        ? resolvedOptions.settings
        : { privacyAllowlist: [] };
    const session = createSession({
      settings,
      scanSource: value,
      extraTerms: Array.isArray(resolvedOptions.extraTerms) ? resolvedOptions.extraTerms : []
    });
    return getSortedReplacements(session).map((entry) => ({
      text: entry.raw,
      category: entry.category,
      placeholder: entry.placeholder
    }));
  }

  function decodeWithSerializedSession(value, serialized) {
    const session = hydrateSession(serialized);
    if (!session) {
      return value;
    }
    return decodeValue(value, session);
  }

  function createSession(options = {}) {
    const session = {
      id: createSessionId(),
      replacements: [],
      replacementMap: new Map(),
      placeholderMap: new Map(),
      counters: Object.fromEntries(CATEGORY_ORDER.map((category) => [category, 0])),
      sourceTexts: [],
      allowlist: getManualAllowlist(options.settings)
    };
    const seen = new WeakSet();

    Object.entries(options || {}).forEach(([key, value]) => {
      if (key === "settings" || key === "extraTerms") {
        return;
      }
      collectFromValue(session, value, key, seen);
    });

    normalizeAllowlist(session.allowlist).forEach((term) => {
      registerTerm(session, term, detectCategory(term, "TERM"), "allowlist");
    });

    const extraTerms = Array.isArray(options.extraTerms) ? options.extraTerms : [];
    extraTerms.forEach((item) => {
      if (typeof item === "string") {
        registerTerm(session, item, "TERM", "extra");
        collectSourceText(session, item);
        return;
      }
      if (item && typeof item === "object") {
        registerTerm(session, item.text || item.value || "", item.category || "", "extra");
        collectSourceText(session, item.text || item.value || "");
      }
    });

    session.sourceTexts.forEach((text) => {
      scanTextForSensitiveTerms(session, text);
    });
    return session;
  }

  window.PulsePrivacyCover = {
    createSession,
    normalizeAllowlist,
    encodeText,
    encodeValue,
    decodeText,
    decodeValue,
    buildPromptLegend,
    preparePrompt,
    serializeSession,
    decodeWithSerializedSession,
    applyPrivacyToLogEntry,
    scanTerms
  };
})();
