(function initPulsePrivacyCover() {
  if (window.PulsePrivacyCover) {
    return;
  }

  const PRIVACY_ALLOWLIST_TERMS_KEY = "x_style_generator_privacy_allowlist_terms_v1";
  const PRIVACY_IGNORELIST_TERMS_KEY = "x_style_generator_privacy_ignorelist_terms_v1";
  const CATEGORY_ORDER = ["NAME", "HANDLE", "ORG", "TITLE", "ADDR", "COORD", "TERM"];
  const AUTO_MASK_ALLOWED_CATEGORIES = new Set(["NAME", "TITLE", "TERM"]);
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
    /(?:[\u4e00-\u9fa5A-Za-z0-9·-]{2,24}(?:省|市|区|县|镇|乡|村|路|街|道|巷)[\u4e00-\u9fa5A-Za-z0-9·-]{0,24}|(?:\d{1,6}|[A-Za-z]?\d{1,4}[A-Za-z]?)(?:号|栋|楼|室)[\u4e00-\u9fa5A-Za-z0-9·-]{0,24})/g;
  const QUOTED_TERM_REGEX =
    /(?:“([^”\n]{1,60})”|‘([^’\n]{1,60})’|「([^」\n]{1,60})」|『([^』\n]{1,60})』|"([^"\n]{1,60})"|'([^'\n]{1,60})')/g;
  const BRACKET_TERM_REGEX =
    /(?:（([^）\n]{1,60})）|\(([^)\n]{1,60})\)|【([^】\n]{1,60})】|\[([^\]\n]{1,60})\])/g;
  const HANDLE_SCAN_REGEX = /@[\w.\-_]{2,32}/g;
  const MIXED_SCAN_SEGMENT_REGEX = /[\u4e00-\u9fffA-Za-z0-9@._-]{2,36}/g;
  const SCAN_SEPARATOR_REGEX = /[\/｜|、,，·&＋+]+/g;
  const SCAN_CONNECTOR_SPLIT_REGEX =
    /发帖和回帖|发帖|回帖|用户皆为|用户都是|用户|大家|今天|最近|目前|当前|昵称|别名|本名|名叫|叫做|叫|称为|都是|皆为|皆是|粉丝团|粉丝|后援会|超话|论坛|页签|讨论区|设定|人设|背景|文本|内容|信息|消息|的|和|与|及|或/g;
  const SCAN_STOP_WORDS = new Set([
    "粉丝",
    "用户",
    "发帖",
    "回帖",
    "大家",
    "今天",
    "最近",
    "目前",
    "当前",
    "论坛",
    "页签",
    "讨论区",
    "文本",
    "内容",
    "信息",
    "消息",
    "设定",
    "人设",
    "背景",
    "角色",
    "用户设定",
    "世界书",
    "帖子",
    "回复",
    "昵称",
    "别名",
    "本名",
    "名叫",
    "叫做",
    "叫",
    "称为",
    "and",
    "the",
    "this",
    "that",
    "today",
    "recent",
    "user",
    "users",
    "fan",
    "fans",
    "forum",
    "post",
    "reply",
    "content",
    "text",
    "persona",
    "setting",
    "background"
  ]);
  const SCAN_WEAK_FRAGMENT_REGEX =
    /(?:发帖|回帖|用户|粉丝|大家|今天|最近|目前|当前|论坛|页签|讨论区|帖子|回复|文本|内容|信息|消息)/;

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

  function truncatePreviewText(value, limit = 52) {
    const text = trimText(value);
    if (text.length <= limit) {
      return text;
    }
    return `${text.slice(0, Math.max(0, limit - 1))}…`;
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
    if (ADDRESS_REGEX.test(text) || /(?:地址|住址|定位|位置名称)/.test(text)) {
      ADDRESS_REGEX.lastIndex = 0;
      return "ADDR";
    }
    ADDRESS_REGEX.lastIndex = 0;
    return "TERM";
  }

  function createSessionId() {
    return `privacy_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  }

  function readStoredPrivacyAllowlistTerms() {
    try {
      const raw = window.localStorage?.getItem(PRIVACY_ALLOWLIST_TERMS_KEY);
      if (!raw) {
        return [];
      }
      return normalizeAllowlist(JSON.parse(raw));
    } catch (_error) {
      return [];
    }
  }

  function readStoredPrivacyIgnorelistTerms() {
    try {
      const raw = window.localStorage?.getItem(PRIVACY_IGNORELIST_TERMS_KEY);
      if (!raw) {
        return [];
      }
      return normalizeAllowlist(JSON.parse(raw));
    } catch (_error) {
      return [];
    }
  }

  function getManualAllowlist(settings = {}) {
    const defaultTerms = normalizeAllowlist(window.PulsePrivacyAllowlistDefaults || []);
    const customTerms = normalizeAllowlist(settings?.privacyAllowlist || []);
    const storedTerms = readStoredPrivacyAllowlistTerms();
    return normalizeAllowlist([...defaultTerms, ...storedTerms, ...customTerms]);
  }

  function getManualIgnorelist(settings = {}) {
    const customTerms = normalizeAllowlist(settings?.privacyIgnorelist || []);
    const storedTerms = readStoredPrivacyIgnorelistTerms();
    return normalizeAllowlist([...storedTerms, ...customTerms]);
  }

  function shouldAutoMaskCategory(category = "", source = "") {
    const resolvedCategory = trimText(category).toUpperCase();
    const resolvedSource = trimText(source).toLowerCase();
    if (!resolvedCategory) {
      return false;
    }
    if (resolvedSource === "allowlist") {
      return true;
    }
    return AUTO_MASK_ALLOWED_CATEGORIES.has(resolvedCategory);
  }

  function registerTerm(session, rawTerm, category = "", source = "") {
    if (!session || typeof session !== "object") {
      return null;
    }
    const normalized = trimText(rawTerm);
    if (!normalized || isDataLikeString(normalized)) {
      return null;
    }
    if (session.ignoreSet?.has(normalized)) {
      return null;
    }

    const resolvedCategory = detectCategory(normalized, category);
    if (!shouldAutoMaskCategory(resolvedCategory, source)) {
      return null;
    }
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
    return [legend, resolved].filter(Boolean).join("\n\n");
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

  function extractCapturedValue(match = []) {
    for (let index = 1; index < match.length; index += 1) {
      if (match[index]) {
        return match[index];
      }
    }
    return match[0] || "";
  }

  function hasCjk(value) {
    return /[\u4e00-\u9fff]/.test(String(value || ""));
  }

  function hasLatinOrDigit(value) {
    return /[A-Za-z0-9]/.test(String(value || ""));
  }

  function stripScanWrapping(value, options = {}) {
    const keepTitle = Boolean(options.keepTitle);
    let text = trimText(value);
    if (!text) {
      return "";
    }
    if (!keepTitle) {
      text = text.replace(/^[\s"'“”‘’「」『』()（）[\]【】{}]+|[\s"'“”‘’「」『』()（）[\]【】{}]+$/g, "");
    }
    text = text.replace(/^[,，.。:：;；!?！？、/｜|·&＋+\-]+|[,，.。:：;；!?！？、/｜|·&＋+\-]+$/g, "");
    return trimText(text);
  }

  function splitScanParts(value) {
    return String(value || "")
      .split(SCAN_SEPARATOR_REGEX)
      .map((item) => stripScanWrapping(item))
      .filter(Boolean);
  }

  function splitScanByScriptBoundary(value) {
    return String(value || "").match(/@[\w.\-_]+|[A-Za-z0-9._-]+|[\u4e00-\u9fff]{1,8}/g) || [];
  }

  function removeScanConnectorFragments(value) {
    return String(value || "").replace(SCAN_CONNECTOR_SPLIT_REGEX, "");
  }

  function isWeakScanCandidate(value, category = "") {
    const text = trimText(value);
    if (!text || isDataLikeString(text) || /^\d+$/.test(text)) {
      return true;
    }

    const resolvedCategory = detectCategory(text, category);
    const lowered = text.toLowerCase();
    if (SCAN_STOP_WORDS.has(text) || SCAN_STOP_WORDS.has(lowered)) {
      return true;
    }
    if (!removeScanConnectorFragments(text)) {
      return true;
    }
    if (/[\n\r\t]/.test(text)) {
      return true;
    }

    if (resolvedCategory === "TITLE") {
      return !/^《[^》\n]{1,120}》$/.test(text);
    }
    if (resolvedCategory === "HANDLE" || resolvedCategory === "COORD") {
      return false;
    }
    if (resolvedCategory === "ORG") {
      return text.length > 36 || (SCAN_WEAK_FRAGMENT_REGEX.test(text) && text.length > 12);
    }
    if (resolvedCategory === "ADDR") {
      if (
        /(?:逗号|句号|问号|叹号|冒号|分号|引号|括号|书名号|省略号|波浪号|符号)$/.test(text)
      ) {
        return true;
      }
      if (!/\d/.test(text) && !/(?:省|市|区|县|镇|乡|村|路|街|道|巷)/.test(text) && text.length <= 3) {
        return true;
      }
      return text.length > 32 || (SCAN_WEAK_FRAGMENT_REGEX.test(text) && text.length > 10);
    }

    if ((resolvedCategory === "TERM" || resolvedCategory === "NAME") && SCAN_SEPARATOR_REGEX.test(text)) {
      SCAN_SEPARATOR_REGEX.lastIndex = 0;
      return true;
    }
    SCAN_SEPARATOR_REGEX.lastIndex = 0;

    if (/\s/.test(text)) {
      return true;
    }
    if (hasCjk(text) && !hasLatinOrDigit(text)) {
      return text.length < 2 || text.length > 8;
    }
    if (!hasCjk(text) && hasLatinOrDigit(text)) {
      return text.length < 2 || text.length > 24;
    }
    if (hasCjk(text) && hasLatinOrDigit(text)) {
      return text.length < 2 || text.length > 6;
    }
    return text.length > 24;
  }

  function buildScanSample(text, term) {
    const sourceText = trimText(text);
    if (!sourceText) {
      return "";
    }
    const normalizedTerm = trimText(term);
    const index = normalizedTerm ? sourceText.indexOf(normalizedTerm) : -1;
    if (index < 0) {
      return truncatePreviewText(sourceText, 56);
    }
    const start = Math.max(0, index - 12);
    const end = Math.min(sourceText.length, index + normalizedTerm.length + 16);
    const snippet = sourceText.slice(start, end);
    return `${start > 0 ? "…" : ""}${snippet}${end < sourceText.length ? "…" : ""}`;
  }

  function normalizeScanSourceEntries(value) {
    const items = Array.isArray(value) ? value : [value];
    return items
      .map((item, index) => {
        if (typeof item === "string") {
          return {
            id: `scan_source_${index}`,
            source: "未分类",
            text: trimText(item)
          };
        }
        if (!item || typeof item !== "object") {
          return null;
        }
        const text = trimText(item.text || item.value || "");
        if (!text) {
          return null;
        }
        return {
          id: trimText(item.id || `scan_source_${index}`),
          source: trimText(item.source || item.sourceLabel || item.label || "未分类"),
          text
        };
      })
      .filter((item) => item?.text);
  }

  function pushScanToken(target, token) {
    const normalized = stripScanWrapping(token);
    if (!normalized) {
      return;
    }
    target.push(normalized);
  }

  function expandAggressiveScanToken(value) {
    const cleaned = stripScanWrapping(value);
    if (!cleaned) {
      return [];
    }

    const shouldSplitByConnector =
      cleaned.length > 4 ||
      /^(?:的|粉丝|用户|发帖|回帖|大家|今天|最近|论坛|页签|讨论区)/.test(cleaned) ||
      /(?:粉丝|用户|发帖|回帖|论坛|页签|讨论区)$/.test(cleaned);
    const connectorParts = shouldSplitByConnector
      ? cleaned
          .split(SCAN_CONNECTOR_SPLIT_REGEX)
          .map((item) => stripScanWrapping(item))
          .filter(Boolean)
      : [cleaned];

    const results = [];
    connectorParts.forEach((part) => {
      const separatorParts = splitScanParts(part);
      const fragments = separatorParts.length ? separatorParts : [part];
      fragments.forEach((fragment) => {
        const normalized = stripScanWrapping(fragment);
        if (!normalized) {
          return;
        }
        if (hasCjk(normalized) && hasLatinOrDigit(normalized) && normalized.length > 4) {
          splitScanByScriptBoundary(normalized).forEach((chunk) => {
            pushScanToken(results, chunk);
          });
          return;
        }
        pushScanToken(results, normalized);
      });
    });
    return results;
  }

  function addScanCandidate(candidateMap, rawTerm, sourceEntry, explicitCategory = "") {
    const normalized = stripScanWrapping(rawTerm, {
      keepTitle: detectCategory(rawTerm, explicitCategory) === "TITLE"
    });
    if (!normalized) {
      return;
    }

    const category = detectCategory(normalized, explicitCategory);
    if (isWeakScanCandidate(normalized, category)) {
      return;
    }

    const key = normalized;
    const sourceLabel = trimText(sourceEntry?.source || "未分类");
    if (candidateMap.has(key)) {
      const existing = candidateMap.get(key);
      if (sourceLabel && !existing.sources.includes(sourceLabel)) {
        existing.sources.push(sourceLabel);
      }
      if (existing.category === "TERM" && category !== "TERM") {
        existing.category = category;
      }
      return;
    }

    candidateMap.set(key, {
      text: normalized,
      category,
      sources: sourceLabel ? [sourceLabel] : [],
      sample: buildScanSample(sourceEntry?.text || "", normalized),
      selected: true
    });
  }

  function collectRegexScanCandidates(candidateMap, sourceEntry) {
    const text = trimText(sourceEntry?.text || "");
    if (!text) {
      return;
    }

    const scanWithRegex = (regex, category, mapper = (match) => match[0]) => {
      let match;
      while ((match = regex.exec(text))) {
        addScanCandidate(candidateMap, mapper(match), sourceEntry, category);
      }
      regex.lastIndex = 0;
    };

    scanWithRegex(BOOK_TITLE_REGEX, "TITLE");
    scanWithRegex(COORD_REGEX, "COORD");
    scanWithRegex(HANDLE_SCAN_REGEX, "HANDLE");
    scanWithRegex(ADDRESS_LABEL_REGEX, "ADDR", (match) => match[1] || "");
    scanWithRegex(ORG_REGEX, "ORG");
    scanWithRegex(ADDRESS_REGEX, "ADDR");
    scanWithRegex(QUOTED_TERM_REGEX, "", (match) => extractCapturedValue(match));
    scanWithRegex(BRACKET_TERM_REGEX, "", (match) => extractCapturedValue(match));
  }

  function collectAggressiveScanCandidates(candidateMap, sourceEntry) {
    const text = trimText(sourceEntry?.text || "");
    if (!text) {
      return;
    }

    let match;
    while ((match = MIXED_SCAN_SEGMENT_REGEX.exec(text))) {
      expandAggressiveScanToken(match[0]).forEach((token) => {
        addScanCandidate(candidateMap, token, sourceEntry);
      });
    }
    MIXED_SCAN_SEGMENT_REGEX.lastIndex = 0;
  }

  function scanTerms(value, options = {}) {
    const candidateMap = new Map();
    normalizeScanSourceEntries(value).forEach((sourceEntry) => {
      collectRegexScanCandidates(candidateMap, sourceEntry);
      collectAggressiveScanCandidates(candidateMap, sourceEntry);
    });
    return [...candidateMap.values()].sort((left, right) => {
      if ((right.sources?.length || 0) !== (left.sources?.length || 0)) {
        return (right.sources?.length || 0) - (left.sources?.length || 0);
      }
      if (left.category !== right.category) {
        return CATEGORY_ORDER.indexOf(left.category) - CATEGORY_ORDER.indexOf(right.category);
      }
      if (left.text.length !== right.text.length) {
        return left.text.length - right.text.length;
      }
      return left.text.localeCompare(right.text, "zh-CN");
    });
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
      allowlist: getManualAllowlist(options.settings),
      ignorelist: getManualIgnorelist(options.settings),
      ignoreSet: new Set()
    };
    session.ignoreSet = new Set(normalizeAllowlist(session.ignorelist));
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
