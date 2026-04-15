const path = require("path");
const { randomUUID } = require("crypto");

const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const { Pool } = require("pg");

dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

const PORT = Number.parseInt(String(process.env.PORT || "3000"), 10) || 3000;
const DATABASE_URL = String(process.env.DATABASE_URL || "").trim();
const STATIC_ROOT = path.resolve(__dirname, "..", "..");
const SETTINGS_KEY = "x_style_generator_settings_v2";
const PRIVACY_ALLOWLIST_TERMS_KEY = "x_style_generator_privacy_allowlist_terms_v1";
const PRIVACY_ALLOWLIST_META_KEY = "x_style_generator_privacy_allowlist_meta_v1";
const PRIVACY_ALLOWLIST_SOURCES = new Set(["manual", "scan"]);
const PRIVACY_ALLOWLIST_CATEGORIES = new Set(["TERM", "TITLE", "NAME"]);
const PRIVACY_ALLOWLIST_NAME_LEVELS = new Set(["FULL", "COMMON", "NICK", "PET", "HONOR"]);

function createPoolConfig(connectionString = "") {
  const normalized = String(connectionString || "").trim();
  if (!normalized) {
    return null;
  }
  const shouldUseSsl =
    normalized.includes("neon.tech") || /sslmode=require/i.test(normalized);
  return {
    connectionString: normalized,
    ssl: shouldUseSsl ? { rejectUnauthorized: false } : false
  };
}

const poolConfig = createPoolConfig(DATABASE_URL);
const pool = poolConfig ? new Pool(poolConfig) : null;

function parseJsonValue(value, fallback = null) {
  if (value == null) {
    return fallback;
  }
  if (typeof value !== "string") {
    return value;
  }
  try {
    return JSON.parse(value);
  } catch (_error) {
    return fallback;
  }
}

function normalizeTextArray(value) {
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

function normalizePrivacyAllowlistSource(value = "") {
  const normalized = String(value || "").trim().toLowerCase();
  return PRIVACY_ALLOWLIST_SOURCES.has(normalized) ? normalized : "manual";
}

function normalizePrivacyAllowlistCategory(value = "") {
  const normalized = String(value || "").trim().toUpperCase();
  return PRIVACY_ALLOWLIST_CATEGORIES.has(normalized) ? normalized : "TERM";
}

function normalizePrivacyAllowlistNameLevel(value = "") {
  const normalized = String(value || "").trim().toUpperCase();
  return PRIVACY_ALLOWLIST_NAME_LEVELS.has(normalized) ? normalized : "COMMON";
}

function trimPrivacyText(value = "") {
  return String(value || "").trim();
}

function shouldKeepPrivacyAllowlistGroupId(category = "") {
  const resolvedCategory = normalizePrivacyAllowlistCategory(category);
  return resolvedCategory === "NAME" || resolvedCategory === "TERM";
}

function normalizePrivacyAllowlistNameGroupId(value = "", fallbackText = "") {
  return (
    String(value || "").trim().slice(0, 40) ||
    String(fallbackText || "").trim().slice(0, 40)
  );
}

function hashPrivacyPlaceholderKey(value = "") {
  const text = String(value || "");
  let hash = 0;
  for (let index = 0; index < text.length; index += 1) {
    hash = (hash * 31 + text.charCodeAt(index)) >>> 0;
  }
  return hash.toString(36).toUpperCase().slice(-8).padStart(8, "0");
}

function isValidPrivacyAllowlistPlaceholder(value = "", category = "") {
  const resolvedCategory = normalizePrivacyAllowlistCategory(category);
  const placeholder = trimPrivacyText(value).toUpperCase();
  if (!placeholder) {
    return false;
  }
  if (resolvedCategory === "NAME") {
    return /^__PG_NAME_[A-Z0-9]{8}_(FULL|COMMON|NICK|PET|HONOR)__$/.test(placeholder);
  }
  return new RegExp(`^__PG_${resolvedCategory}_[A-Z0-9]{8}__$`).test(placeholder);
}

function buildDefaultPrivacyAllowlistPlaceholder(options = {}) {
  const category = normalizePrivacyAllowlistCategory(options.category);
  const text = trimPrivacyText(options.text);
  const nameGroupId = shouldKeepPrivacyAllowlistGroupId(category)
    ? normalizePrivacyAllowlistNameGroupId(options.nameGroupId)
    : "";
  const nameLevel = category === "NAME" ? normalizePrivacyAllowlistNameLevel(options.nameLevel) : "COMMON";
  const placeholderKey =
    buildPrivacyAllowlistPlaceholderScope({
      category,
      text,
      nameGroupId,
      nameLevel
    }) || `${category}:${text}`;
  const suffix = hashPrivacyPlaceholderKey(placeholderKey);
  return category === "NAME"
    ? `__PG_NAME_${suffix}_${nameLevel}__`
    : `__PG_${category}_${suffix}__`;
}

function collectPrivacyAllowlistPlaceholderScopeMap(items = []) {
  const scopeMap = new Map();
  const list = Array.isArray(items) ? items : [];
  list.forEach((item) => {
    const category = normalizePrivacyAllowlistCategory(item?.category);
    const placeholder = trimPrivacyText(item?.placeholder).toUpperCase();
    const scopeKey = buildPrivacyAllowlistPlaceholderScope(item);
    if (
      !scopeKey ||
      !placeholder ||
      scopeMap.has(scopeKey) ||
      !isValidPrivacyAllowlistPlaceholder(placeholder, category)
    ) {
      return;
    }
    scopeMap.set(scopeKey, placeholder);
  });
  return scopeMap;
}

function resolveDerivedPrivacyAllowlistPlaceholder(options = {}, scopeMap = new Map()) {
  const category = normalizePrivacyAllowlistCategory(options.category);
  const text = trimPrivacyText(options.text);
  const nameGroupId = shouldKeepPrivacyAllowlistGroupId(category)
    ? normalizePrivacyAllowlistNameGroupId(options.nameGroupId, category === "NAME" ? text : "")
    : "";
  const nameLevel = category === "NAME" ? normalizePrivacyAllowlistNameLevel(options.nameLevel) : "COMMON";
  const scopeKey = buildPrivacyAllowlistPlaceholderScope({
    category,
    text,
    nameGroupId,
    nameLevel
  });
  if (scopeKey && scopeMap.has(scopeKey)) {
    return scopeMap.get(scopeKey);
  }
  const generated = buildDefaultPrivacyAllowlistPlaceholder({
    category,
    text,
    nameGroupId,
    nameLevel
  });
  if (scopeKey) {
    scopeMap.set(scopeKey, generated);
  }
  return generated;
}

function normalizePrivacyAllowlistPlaceholder(value = "", options = {}, scopeMap = null) {
  const category = normalizePrivacyAllowlistCategory(options.category);
  const normalized = trimPrivacyText(value).toUpperCase();
  if (isValidPrivacyAllowlistPlaceholder(normalized, category)) {
    return normalized;
  }
  if (scopeMap instanceof Map) {
    return resolveDerivedPrivacyAllowlistPlaceholder(options, scopeMap);
  }
  return buildDefaultPrivacyAllowlistPlaceholder(options);
}

function buildPrivacyAllowlistPlaceholderScope(item = {}) {
  const category = normalizePrivacyAllowlistCategory(item.category);
  const text = trimPrivacyText(item.text);
  const nameGroupId = shouldKeepPrivacyAllowlistGroupId(category)
    ? normalizePrivacyAllowlistNameGroupId(item.nameGroupId)
    : "";
  const nameLevel = category === "NAME" ? normalizePrivacyAllowlistNameLevel(item.nameLevel) : "COMMON";
  if (!text) {
    return "";
  }
  if (category === "NAME") {
    return `NAME:${nameGroupId || text}:${nameLevel}`;
  }
  if (category === "TERM") {
    return `TERM:${nameGroupId || text}`;
  }
  if (category === "TITLE") {
    return `TITLE:${nameGroupId || text}`;
  }
  return `${category}:${text}`;
}

function validatePrivacyAllowlistItems(items = []) {
  const placeholderScopeMap = new Map();
  const termGroupPlaceholderMap = new Map();
  const issueMap = new Map();

  function addIssue(key, message) {
    if (!key || !message || issueMap.has(key)) {
      return;
    }
    issueMap.set(key, message);
  }

  items.forEach((item) => {
    const category = normalizePrivacyAllowlistCategory(item.category);
    const text = trimPrivacyText(item.text);
    const placeholder = trimPrivacyText(item.placeholder).toUpperCase();
    const scopeKey = buildPrivacyAllowlistPlaceholderScope(item);
    const nameGroupId = shouldKeepPrivacyAllowlistGroupId(category)
      ? normalizePrivacyAllowlistNameGroupId(item.nameGroupId)
      : "";

    if (!text || !placeholder || !scopeKey) {
      return;
    }

    const existingScope = placeholderScopeMap.get(placeholder);
    if (existingScope && existingScope !== scopeKey) {
      addIssue(
        `placeholder:${placeholder}`,
        `占位符 ${placeholder} 同时映射到了多个白名单对象，请修正后再保存。`
      );
    } else {
      placeholderScopeMap.set(placeholder, scopeKey);
    }

    if (category === "TERM" && nameGroupId) {
      const termGroupKey = `TERM:${nameGroupId}`;
      const existingPlaceholder = termGroupPlaceholderMap.get(termGroupKey);
      if (existingPlaceholder && existingPlaceholder !== placeholder) {
        addIssue(
          `term-group:${termGroupKey}`,
          `普通词分组 ${nameGroupId} 存在多个占位符，请统一成同一个占位符后再保存。`
        );
      } else {
        termGroupPlaceholderMap.set(termGroupKey, placeholder);
      }
    }
  });

  return [...issueMap.values()];
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

    const source = normalizePrivacyAllowlistSource(record.source);
    const category = normalizePrivacyAllowlistCategory(record.category);
    const normalized = {
      id: String(record.id || "").trim(),
      text,
      source,
      category,
      nameGroupId: shouldKeepPrivacyAllowlistGroupId(category)
        ? normalizePrivacyAllowlistNameGroupId(record.nameGroupId, category === "NAME" ? text : "")
        : "",
      nameLevel: category === "NAME" ? normalizePrivacyAllowlistNameLevel(record.nameLevel) : "COMMON",
      placeholder: trimPrivacyText(record.placeholder).toUpperCase(),
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
      if (
        shouldKeepPrivacyAllowlistGroupId(category) &&
        normalized.nameGroupId &&
        !existing.nameGroupId
      ) {
        existing.nameGroupId = normalized.nameGroupId;
      }
      if (category === "NAME") {
        existing.category = "NAME";
        existing.nameGroupId = normalizePrivacyAllowlistNameGroupId(
          record.nameGroupId,
          text
        );
        existing.nameLevel = normalizePrivacyAllowlistNameLevel(record.nameLevel);
      } else if (existing.category !== "NAME" && category === "TITLE") {
        existing.category = "TITLE";
      }
      if (!existing.placeholder && normalized.placeholder) {
        existing.placeholder = normalized.placeholder;
      }
      return;
    }

    indexMap.set(text, result.length);
    result.push(normalized);
  });

  const scopeMap = collectPrivacyAllowlistPlaceholderScopeMap(result);
  return result.map((item, index) => ({
    ...item,
    nameGroupId: shouldKeepPrivacyAllowlistGroupId(item.category)
      ? normalizePrivacyAllowlistNameGroupId(
          item.nameGroupId,
          item.category === "NAME" ? item.text : ""
        )
      : "",
    nameLevel: item.category === "NAME" ? normalizePrivacyAllowlistNameLevel(item.nameLevel) : "COMMON",
    placeholder: normalizePrivacyAllowlistPlaceholder(item.placeholder, {
      category: item.category,
      text: item.text,
      nameGroupId: item.nameGroupId,
      nameLevel: item.nameLevel
    }, scopeMap),
    sortOrder: index
  }));
}

function mapPrivacyAllowlistRow(row = {}) {
  const text = String(row.text || "").trim();
  const category = normalizePrivacyAllowlistCategory(row.category);
  const nameGroupId = shouldKeepPrivacyAllowlistGroupId(category)
    ? normalizePrivacyAllowlistNameGroupId(row.name_group_id, category === "NAME" ? text : "")
    : "";
  const nameLevel = category === "NAME" ? normalizePrivacyAllowlistNameLevel(row.name_level) : "COMMON";
  return {
    id: String(row.id || "").trim(),
    text,
    source: normalizePrivacyAllowlistSource(row.source),
    category,
    nameGroupId,
    nameLevel,
    placeholder: normalizePrivacyAllowlistPlaceholder(row.placeholder, {
      category,
      text,
      nameGroupId,
      nameLevel
    }),
    sortOrder: Number(row.sort_order) || 0,
    createdAt: row.created_at || null,
    updatedAt: row.updated_at || null
  };
}

function normalizePrivacyScanIgnoreItems(items = []) {
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
    if (indexMap.has(text)) {
      const existing = result[indexMap.get(text)];
      const reason = String(record.reason || "").trim();
      if (!existing.reason && reason) {
        existing.reason = reason;
      }
      return;
    }
    indexMap.set(text, result.length);
    result.push({
      id: String(record.id || "").trim(),
      text,
      reason: String(record.reason || "").trim()
    });
  });

  return result;
}

function mapPrivacyScanIgnoreRow(row = {}) {
  return {
    id: String(row.id || "").trim(),
    text: String(row.text || "").trim(),
    reason: String(row.reason || "").trim(),
    createdAt: row.created_at || null,
    updatedAt: row.updated_at || null
  };
}

function buildPrivacyAllowlistItemsFromLegacyRecords(records = new Map()) {
  const settingsRecord = parseJsonValue(records.get(SETTINGS_KEY), {}) || {};
  const termsRecord = parseJsonValue(records.get(PRIVACY_ALLOWLIST_TERMS_KEY), []);
  const metaRecord = parseJsonValue(records.get(PRIVACY_ALLOWLIST_META_KEY), []);
  const metaItems = normalizePrivacyAllowlistItems(metaRecord);
  const metaMap = new Map(metaItems.map((item) => [item.text, item]));
  const mergedTexts = normalizeTextArray([
    ...normalizeTextArray(termsRecord),
    ...normalizeTextArray(settingsRecord?.privacyAllowlist || []),
    ...metaItems.map((item) => item.text)
  ]);

  return normalizePrivacyAllowlistItems(
    mergedTexts.map((text, index) => {
      const matchedMeta = metaMap.get(text) || null;
      return {
        id: matchedMeta?.id || "",
        text,
        source: matchedMeta?.source || "manual",
        category: matchedMeta?.category || "TERM",
        nameGroupId: matchedMeta?.nameGroupId || "",
        nameLevel: matchedMeta?.nameLevel || "COMMON",
        placeholder: matchedMeta?.placeholder || "",
        sortOrder: index
      };
    })
  );
}

async function replacePrivacyAllowlistItemsInDb(db, items = []) {
  const normalizedItems = normalizePrivacyAllowlistItems(items);
  const validationIssues = validatePrivacyAllowlistItems(normalizedItems);
  if (validationIssues.length) {
    throw new Error(validationIssues[0]);
  }
  const existingResult = await db.query(`
    select id, text
    from privacy_allowlist_entries
  `);
  const existingByText = new Map(
    existingResult.rows.map((row) => [
      String(row.text || "").trim(),
      String(row.id || "").trim()
    ])
  );

  const nextItems = normalizedItems.map((item, index) => ({
    ...item,
    id: existingByText.get(item.text) || item.id || randomUUID(),
    sortOrder: index
  }));
  const keepIds = nextItems.map((item) => item.id);

  if (keepIds.length) {
    await db.query(
      `
        delete from privacy_allowlist_entries
        where id <> all($1::text[])
      `,
      [keepIds]
    );
  } else {
    await db.query("delete from privacy_allowlist_entries");
  }

  for (const item of nextItems) {
    await db.query(
      `
        insert into privacy_allowlist_entries (
          id,
          text,
          source,
          category,
          name_group_id,
          name_level,
          placeholder,
          sort_order,
          created_at,
          updated_at
        )
        values ($1, $2, $3, $4, $5, $6, $7, $8, now(), now())
        on conflict (id) do update
          set text = excluded.text,
              source = excluded.source,
              category = excluded.category,
              name_group_id = excluded.name_group_id,
              name_level = excluded.name_level,
              placeholder = excluded.placeholder,
              sort_order = excluded.sort_order,
              updated_at = now()
      `,
      [
        item.id,
        item.text,
        item.source,
        item.category,
        item.nameGroupId,
        item.nameLevel,
        item.placeholder,
        item.sortOrder
      ]
    );
  }

  const result = await db.query(`
    select id, text, source, category, name_group_id, name_level, placeholder, sort_order, created_at, updated_at
    from privacy_allowlist_entries
    order by sort_order asc, updated_at asc, text asc
  `);
  return result.rows.map(mapPrivacyAllowlistRow);
}

async function replacePrivacyScanIgnoreItemsInDb(db, items = []) {
  const normalizedItems = normalizePrivacyScanIgnoreItems(items);
  const existingResult = await db.query(`
    select id, text
    from privacy_scan_ignore_entries
  `);
  const existingByText = new Map(
    existingResult.rows.map((row) => [
      String(row.text || "").trim(),
      String(row.id || "").trim()
    ])
  );
  const nextItems = normalizedItems.map((item) => ({
    ...item,
    id: existingByText.get(item.text) || item.id || randomUUID()
  }));
  const keepIds = nextItems.map((item) => item.id);

  if (keepIds.length) {
    await db.query(
      `
        delete from privacy_scan_ignore_entries
        where id <> all($1::text[])
      `,
      [keepIds]
    );
  } else {
    await db.query("delete from privacy_scan_ignore_entries");
  }

  for (const item of nextItems) {
    await db.query(
      `
        insert into privacy_scan_ignore_entries (
          id,
          text,
          reason,
          created_at,
          updated_at
        )
        values ($1, $2, $3, now(), now())
        on conflict (id) do update
          set text = excluded.text,
              reason = excluded.reason,
              updated_at = now()
      `,
      [item.id, item.text, item.reason]
    );
  }

  const result = await db.query(`
    select id, text, reason, created_at, updated_at
    from privacy_scan_ignore_entries
    order by updated_at desc, text asc
  `);
  return result.rows.map(mapPrivacyScanIgnoreRow);
}

async function ensurePrivacyAllowlistSeeded(db) {
  const existingSeedResult = await db.query(`
    select id
    from migration_runs
    where type = 'privacy_allowlist_seed'
      and status = 'completed'
    limit 1
  `);
  if (existingSeedResult.rows.length) {
    return 0;
  }

  const runId = randomUUID();
  const countResult = await db.query(`
    select count(*)::int as count
    from privacy_allowlist_entries
  `);
  const existingCount = Number(countResult.rows[0]?.count) || 0;
  if (existingCount > 0) {
    await db.query(
      `
        insert into migration_runs (id, type, status, started_at, finished_at, summary)
        values ($1, 'privacy_allowlist_seed', 'completed', now(), now(), $2::jsonb)
      `,
      [runId, JSON.stringify({ seeded: 0, skipped: "table_not_empty" })]
    );
    return 0;
  }

  const legacyResult = await db.query(
    `
      select key, value_json
      from storage_records
      where key = any($1::text[])
    `,
    [[SETTINGS_KEY, PRIVACY_ALLOWLIST_TERMS_KEY, PRIVACY_ALLOWLIST_META_KEY]]
  );
  const recordMap = new Map(
    legacyResult.rows.map((row) => [String(row.key || "").trim(), row.value_json])
  );
  const items = buildPrivacyAllowlistItemsFromLegacyRecords(recordMap);
  if (items.length) {
    await replacePrivacyAllowlistItemsInDb(db, items);
  }

  await db.query(
    `
      insert into migration_runs (id, type, status, started_at, finished_at, summary)
      values ($1, 'privacy_allowlist_seed', 'completed', now(), now(), $2::jsonb)
    `,
    [runId, JSON.stringify({ seeded: items.length })]
  );
  return items.length;
}

async function ensureCoreTables() {
  if (!pool) {
    return 0;
  }
  await pool.query(`
    create table if not exists storage_records (
      key text primary key,
      value_json jsonb not null,
      version integer not null default 1,
      updated_at timestamptz not null default now(),
      source text not null default 'browser'
    );
  `);
  await pool.query(`
    create table if not exists migration_runs (
      id uuid primary key,
      type text not null,
      status text not null,
      started_at timestamptz not null,
      finished_at timestamptz,
      summary jsonb,
      error text
    );
  `);
  await pool.query(`
    create table if not exists privacy_allowlist_entries (
      id text primary key,
      text text not null unique,
      source text not null default 'manual',
      category text not null default 'TERM',
      name_group_id text not null default '',
      name_level text not null default 'COMMON',
      placeholder text not null default '',
      sort_order integer not null default 0,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now(),
      constraint privacy_allowlist_entries_source_check
        check (source in ('manual', 'scan')),
      constraint privacy_allowlist_entries_category_check
        check (category in ('TERM', 'TITLE', 'NAME')),
      constraint privacy_allowlist_entries_name_level_check
        check (name_level in ('FULL', 'COMMON', 'NICK', 'PET', 'HONOR'))
    );
  `);
  await pool.query(`
    alter table privacy_allowlist_entries
    add column if not exists placeholder text not null default '';
  `);
  await pool.query(`
    do $$
    begin
      if not exists (
        select 1
        from pg_constraint
        where conname = 'privacy_allowlist_entries_placeholder_check'
      ) then
        alter table privacy_allowlist_entries
        add constraint privacy_allowlist_entries_placeholder_check
        check (
          placeholder = ''
          or (
            category = 'NAME'
            and placeholder ~ '^__PG_NAME_[A-Z0-9]{8}_(FULL|COMMON|NICK|PET|HONOR)__$'
          )
          or (
            category in ('TERM', 'TITLE')
            and placeholder ~ ('^__PG_' || category || '_[A-Z0-9]{8}__$')
          )
        );
      end if;
    end $$;
  `);
  await pool.query(`
    create index if not exists privacy_allowlist_entries_sort_order_idx
      on privacy_allowlist_entries (sort_order asc, updated_at asc);
  `);
  await pool.query(`
    create table if not exists privacy_scan_ignore_entries (
      id text primary key,
      text text not null unique,
      reason text not null default '',
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now()
    );
  `);
  await pool.query(`
    create index if not exists privacy_scan_ignore_entries_text_idx
      on privacy_scan_ignore_entries (text);
  `);
  return ensurePrivacyAllowlistSeeded(pool);
}

function normalizeStorageImportItems(payload = {}) {
  const source = payload && typeof payload === "object" ? payload : {};
  if (Array.isArray(source.records)) {
    return source.records
      .map((item) => {
        const record = item && typeof item === "object" ? item : {};
        const key = String(record.key || "").trim();
        if (!key) {
          return null;
        }
        return {
          key,
          valueJson: Object.prototype.hasOwnProperty.call(record, "valueJson")
            ? record.valueJson
            : record.value_json,
          source: String(record.source || "browser").trim() || "browser"
        };
      })
      .filter(Boolean);
  }
  const records = source.records && typeof source.records === "object" ? source.records : source;
  return Object.entries(records)
    .map(([key, valueJson]) => {
      const normalizedKey = String(key || "").trim();
      if (!normalizedKey) {
        return null;
      }
      return {
        key: normalizedKey,
        valueJson,
        source: "browser"
      };
    })
    .filter(Boolean);
}

function createJsonError(message = "Request failed", details = null) {
  return {
    ok: false,
    error: String(message || "Request failed").trim() || "Request failed",
    ...(details ? { details } : {})
  };
}

const app = express();

app.use(
  cors({
    origin: true
  })
);
app.use(express.json({ limit: "10mb" }));

app.get("/api/health", async (_request, response) => {
  if (!pool) {
    response.status(500).json(
      createJsonError("DATABASE_URL is missing. Server is up, but database is not configured.")
    );
    return;
  }

  try {
    await pool.query("select 1 as ok");
    response.json({
      ok: true,
      database: "connected"
    });
  } catch (error) {
    response
      .status(500)
      .json(createJsonError("Database check failed.", error?.message || "Unknown error"));
  }
});

app.use("/api", (request, response, next) => {
  if (pool) {
    next();
    return;
  }
  response
    .status(500)
    .json(createJsonError("DATABASE_URL is missing. API routes are unavailable."));
});

app.get("/api/privacy-allowlist", async (_request, response) => {
  try {
    await ensurePrivacyAllowlistSeeded(pool);
    const result = await pool.query(`
      select id, text, source, category, name_group_id, name_level, placeholder, sort_order, created_at, updated_at
      from privacy_allowlist_entries
      order by sort_order asc, updated_at asc, text asc
    `);
    response.json({
      ok: true,
      items: result.rows.map(mapPrivacyAllowlistRow)
    });
  } catch (error) {
    response
      .status(500)
      .json(createJsonError("Failed to load privacy allowlist.", error?.message));
  }
});

app.put("/api/privacy-allowlist", async (request, response) => {
  const body = request.body && typeof request.body === "object" ? request.body : {};
  const rawItems = Array.isArray(body) ? body : body.items;
  if (!Array.isArray(rawItems)) {
    response.status(400).json(createJsonError('Request body must include an "items" array.'));
    return;
  }

  const client = await pool.connect();
  try {
    await client.query("begin");
    const items = await replacePrivacyAllowlistItemsInDb(client, rawItems);
    await client.query("commit");
    response.json({
      ok: true,
      items,
      count: items.length
    });
  } catch (error) {
    await client.query("rollback");
    response
      .status(String(error?.message || "").includes("占位符") ? 400 : 500)
      .json(createJsonError("Failed to save privacy allowlist.", error?.message));
  } finally {
    client.release();
  }
});

app.get("/api/privacy-scan-ignorelist", async (_request, response) => {
  try {
    const result = await pool.query(`
      select id, text, reason, created_at, updated_at
      from privacy_scan_ignore_entries
      order by updated_at desc, text asc
    `);
    response.json({
      ok: true,
      items: result.rows.map(mapPrivacyScanIgnoreRow)
    });
  } catch (error) {
    response
      .status(500)
      .json(createJsonError("Failed to load privacy scan ignorelist.", error?.message));
  }
});

app.put("/api/privacy-scan-ignorelist", async (request, response) => {
  const body = request.body && typeof request.body === "object" ? request.body : {};
  const rawItems = Array.isArray(body) ? body : body.items;
  if (!Array.isArray(rawItems)) {
    response.status(400).json(createJsonError('Request body must include an "items" array.'));
    return;
  }

  const client = await pool.connect();
  try {
    await client.query("begin");
    const items = await replacePrivacyScanIgnoreItemsInDb(client, rawItems);
    await client.query("commit");
    response.json({
      ok: true,
      items,
      count: items.length
    });
  } catch (error) {
    await client.query("rollback");
    response
      .status(500)
      .json(createJsonError("Failed to save privacy scan ignorelist.", error?.message));
  } finally {
    client.release();
  }
});

app.get("/api/storage/bootstrap", async (_request, response) => {
  try {
    const result = await pool.query(`
      select key, value_json, version, updated_at, source
      from storage_records
      order by key asc
    `);
    response.json({
      ok: true,
      records: result.rows
    });
  } catch (error) {
    response
      .status(500)
      .json(createJsonError("Failed to load bootstrap records.", error?.message));
  }
});

app.get("/api/storage/:key", async (request, response) => {
  const key = String(request.params.key || "").trim();
  if (!key) {
    response.status(400).json(createJsonError("Storage key is required."));
    return;
  }

  try {
    const result = await pool.query(
      `
        select key, value_json, version, updated_at, source
        from storage_records
        where key = $1
      `,
      [key]
    );
    if (!result.rows.length) {
      response.status(404).json(createJsonError(`Storage key "${key}" was not found.`));
      return;
    }
    response.json({
      ok: true,
      record: result.rows[0]
    });
  } catch (error) {
    response
      .status(500)
      .json(createJsonError("Failed to load storage record.", error?.message));
  }
});

app.put("/api/storage/:key", async (request, response) => {
  const key = String(request.params.key || "").trim();
  const body = request.body && typeof request.body === "object" ? request.body : {};
  const hasValue =
    Object.prototype.hasOwnProperty.call(body, "valueJson") ||
    Object.prototype.hasOwnProperty.call(body, "value_json") ||
    Object.prototype.hasOwnProperty.call(body, "value");

  if (!key) {
    response.status(400).json(createJsonError("Storage key is required."));
    return;
  }
  if (!hasValue) {
    response.status(400).json(createJsonError("Request body must include a storage value."));
    return;
  }

  const valueJson = Object.prototype.hasOwnProperty.call(body, "valueJson")
    ? body.valueJson
    : Object.prototype.hasOwnProperty.call(body, "value_json")
      ? body.value_json
      : body.value;
  const source = String(body.source || "api").trim() || "api";

  try {
    const result = await pool.query(
      `
        insert into storage_records (key, value_json, version, updated_at, source)
        values ($1, $2::jsonb, 1, now(), $3)
        on conflict (key) do update
          set value_json = excluded.value_json,
              version = storage_records.version + 1,
              updated_at = now(),
              source = excluded.source
        returning key, value_json, version, updated_at, source
      `,
      [key, JSON.stringify(valueJson), source]
    );
    response.json({
      ok: true,
      record: result.rows[0]
    });
  } catch (error) {
    response
      .status(500)
      .json(createJsonError("Failed to save storage record.", error?.message));
  }
});

app.post("/api/storage/import", async (request, response) => {
  const items = normalizeStorageImportItems(request.body);
  if (!items.length) {
    response.status(400).json(createJsonError("No import records were provided."));
    return;
  }

  const runId = randomUUID();
  const client = await pool.connect();
  try {
    await client.query("begin");
    await client.query(
      `
        insert into migration_runs (id, type, status, started_at, summary)
        values ($1, 'storage_import', 'running', now(), $2::jsonb)
      `,
      [runId, JSON.stringify({ requestedKeys: items.length })]
    );

    const savedKeys = [];
    for (const item of items) {
      const result = await client.query(
        `
          insert into storage_records (key, value_json, version, updated_at, source)
          values ($1, $2::jsonb, 1, now(), $3)
          on conflict (key) do update
            set value_json = excluded.value_json,
                version = storage_records.version + 1,
                updated_at = now(),
                source = excluded.source
          returning key
        `,
        [item.key, JSON.stringify(item.valueJson), item.source]
      );
      if (result.rows[0]?.key) {
        savedKeys.push(result.rows[0].key);
      }
    }

    await client.query(
      `
        update migration_runs
        set status = 'completed',
            finished_at = now(),
            summary = $2::jsonb
        where id = $1
      `,
      [
        runId,
        JSON.stringify({
          requestedKeys: items.length,
          importedKeys: savedKeys.length,
          keys: savedKeys
        })
      ]
    );
    await client.query("commit");

    response.json({
      ok: true,
      migrationRunId: runId,
      importedKeys: savedKeys.length,
      keys: savedKeys
    });
  } catch (error) {
    await client.query("rollback");
    try {
      await pool.query(
        `
          insert into migration_runs (id, type, status, started_at, finished_at, summary, error)
          values ($1, 'storage_import', 'failed', now(), now(), $2::jsonb, $3)
          on conflict (id) do update
            set status = excluded.status,
                finished_at = excluded.finished_at,
                summary = excluded.summary,
                error = excluded.error
        `,
        [
          runId,
          JSON.stringify({ requestedKeys: items.length }),
          error?.message || "Unknown import error"
        ]
      );
    } catch (_migrationError) {
    }
    response
      .status(500)
      .json(createJsonError("Failed to import storage payload.", error?.message));
  } finally {
    client.release();
  }
});

app.use(express.static(STATIC_ROOT, { index: ["index.html"] }));

app.use((request, response) => {
  if (request.path.startsWith("/api/")) {
    response.status(404).json(createJsonError("API route not found."));
    return;
  }
  response.status(404).send("Not Found");
});

async function startServer() {
  try {
    if (pool) {
      const seededCount = await ensureCoreTables();
      await pool.query("select 1");
      console.log("[Pulse Server] Connected to PostgreSQL.");
      if (seededCount > 0) {
        console.log(`[Pulse Server] Seeded ${seededCount} privacy allowlist entries from legacy storage.`);
      }
    } else {
      console.warn("[Pulse Server] DATABASE_URL is not set. Storage APIs will be unavailable.");
    }

    app.listen(PORT, () => {
      console.log(`[Pulse Server] Listening on http://localhost:${PORT}`);
      console.log(`[Pulse Server] Serving static files from ${STATIC_ROOT}`);
    });
  } catch (error) {
    console.error("[Pulse Server] Failed to start:", error);
    process.exit(1);
  }
}

startServer();
