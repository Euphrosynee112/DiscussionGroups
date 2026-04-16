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
const POSTS_KEY = "x_style_generator_posts_v2";
const REFRESH_KEY = "x_style_generator_refresh_v2";
const PROFILE_KEY = "x_style_generator_profile_v1";
const PROFILE_POSTS_KEY = "x_style_generator_profile_posts_v1";
const DISCUSSIONS_KEY = "x_style_generator_discussions_v1";
const DIRECT_MESSAGES_KEY = "x_style_generator_direct_messages_v1";
const BUBBLE_ROOMS_KEY = "x_style_generator_bubble_rooms_v1";
const BUBBLE_THREADS_KEY = "x_style_generator_bubble_threads_v1";
const BUBBLE_FAN_DETAILS_KEY = "x_style_generator_bubble_fan_details_v1";
const PLOT_THREADS_KEY = "x_style_generator_plot_threads_v1";
const WORLD_BOOKS_KEY = "x_style_generator_message_worldbooks_v1";
const MESSAGE_CONTACTS_KEY = "x_style_generator_message_contacts_v1";
const MESSAGE_THREADS_KEY = "x_style_generator_message_threads_v1";
const MESSAGE_MEMORIES_KEY = "x_style_generator_message_memories_v1";
const SCHEDULE_ENTRIES_KEY = "x_style_generator_schedule_entries_v1";
const MESSAGE_COMMON_PLACES_KEY = "x_style_generator_common_places_v1";
const MESSAGE_PRESENCE_STATE_KEY = "x_style_generator_presence_state_v1";
const PRIVACY_ALLOWLIST_TERMS_KEY = "x_style_generator_privacy_allowlist_terms_v1";
const PRIVACY_ALLOWLIST_META_KEY = "x_style_generator_privacy_allowlist_meta_v1";
const PRIVACY_PENDING_SCAN_KEY = "x_style_generator_privacy_scan_pending_v1";
const PRIVACY_IGNORELIST_TERMS_KEY = "x_style_generator_privacy_ignorelist_terms_v1";
const PRIVACY_RECENT_HITS_SINCE_KEY = "x_style_generator_privacy_recent_hits_since_v1";
const PRIVACY_RECENT_HITS_DISMISSED_KEY = "x_style_generator_privacy_recent_hits_dismissed_v1";
const PRIVACY_ALLOWLIST_SOURCES = new Set(["manual", "scan"]);
const PRIVACY_ALLOWLIST_CATEGORIES = new Set(["TERM", "TITLE", "NAME"]);
const PRIVACY_ALLOWLIST_NAME_LEVELS = new Set(["FULL", "COMMON", "NICK", "PET", "HONOR"]);
const MEMORY_SCOPE_TYPES = new Set(["contact", "global", "thread", "scene"]);
const MEMORY_STATUSES = new Set(["active", "faint", "dormant", "archived", "superseded"]);
const MEMORY_EXTRACTION_ACTIONS = new Set(["create", "reinforce", "supersede", "ignore"]);
const MEMORY_EVENT_TYPES = new Set([
  "created",
  "observed",
  "reinforced",
  "recalled",
  "decayed",
  "status_changed",
  "superseded",
  "edited",
  "policy_applied",
  "imported"
]);
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const DEFAULT_STORAGE_OWNER_ID = "default";
const STORAGE_DOCUMENT_DEFINITIONS = new Map([
  [
    POSTS_KEY,
    {
      docType: "forum_posts",
      docKey: "feed",
      title: "论坛首页帖子"
    }
  ],
  [
    REFRESH_KEY,
    {
      docType: "refresh_state",
      docKey: "main",
      title: "刷新状态"
    }
  ],
  [
    PROFILE_POSTS_KEY,
    {
      docType: "forum_profile_posts",
      docKey: "self",
      title: "个人主页帖子"
    }
  ],
  [
    DISCUSSIONS_KEY,
    {
      docType: "forum_discussions",
      docKey: "main",
      title: "论坛讨论串"
    }
  ],
  [
    DIRECT_MESSAGES_KEY,
    {
      docType: "direct_messages",
      docKey: "main",
      title: "论坛私信"
    }
  ],
  [
    BUBBLE_ROOMS_KEY,
    {
      docType: "bubble_rooms",
      docKey: "main",
      title: "泡泡房间"
    }
  ],
  [
    BUBBLE_THREADS_KEY,
    {
      docType: "bubble_threads",
      docKey: "main",
      title: "泡泡话题"
    }
  ],
  [
    BUBBLE_FAN_DETAILS_KEY,
    {
      docType: "bubble_fan_details",
      docKey: "main",
      title: "泡泡粉丝详情"
    }
  ],
  [
    PLOT_THREADS_KEY,
    {
      docType: "plot_threads",
      docKey: "main",
      title: "剧情线程"
    }
  ],
  [
    PRIVACY_PENDING_SCAN_KEY,
    {
      docType: "privacy_pending_scan",
      docKey: "main",
      title: "隐私待处理词条"
    }
  ],
  [
    PRIVACY_RECENT_HITS_SINCE_KEY,
    {
      docType: "privacy_recent_hits_since",
      docKey: "main",
      title: "隐私最近命中起点"
    }
  ],
  [
    PRIVACY_RECENT_HITS_DISMISSED_KEY,
    {
      docType: "privacy_recent_hits_dismissed",
      docKey: "main",
      title: "隐私最近命中忽略"
    }
  ]
]);

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

function sanitizeJsonbStringValue(value = "", stats = null) {
  const text = String(value || "");
  let mutated = false;
  let result = "";

  for (let index = 0; index < text.length; index += 1) {
    const codeUnit = text.charCodeAt(index);

    if (codeUnit === 0x0000) {
      mutated = true;
      result += "\\u0000";
      if (stats) {
        stats.replacedNullChars = (stats.replacedNullChars || 0) + 1;
      }
      continue;
    }

    if (codeUnit >= 0xd800 && codeUnit <= 0xdbff) {
      const nextCodeUnit =
        index + 1 < text.length ? text.charCodeAt(index + 1) : null;
      if (nextCodeUnit != null && nextCodeUnit >= 0xdc00 && nextCodeUnit <= 0xdfff) {
        result += text[index] + text[index + 1];
        index += 1;
        continue;
      }
      mutated = true;
      result += "\ufffd";
      if (stats) {
        stats.replacedInvalidSurrogates = (stats.replacedInvalidSurrogates || 0) + 1;
      }
      continue;
    }

    if (codeUnit >= 0xdc00 && codeUnit <= 0xdfff) {
      mutated = true;
      result += "\ufffd";
      if (stats) {
        stats.replacedInvalidSurrogates = (stats.replacedInvalidSurrogates || 0) + 1;
      }
      continue;
    }

    result += text[index];
  }

  return mutated ? result : text;
}

function sanitizeJsonbValue(value, stats = null) {
  if (typeof value === "string") {
    return sanitizeJsonbStringValue(value, stats);
  }
  if (Array.isArray(value)) {
    return value.map((item) => sanitizeJsonbValue(item, stats));
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, nestedValue]) => [
        sanitizeJsonbValue(String(key || ""), stats),
        sanitizeJsonbValue(nestedValue, stats)
      ])
    );
  }
  return value;
}

function describeStorageValue(value) {
  if (Array.isArray(value)) {
    return `array(${value.length})`;
  }
  if (value == null) {
    return "null";
  }
  if (typeof value === "object") {
    return `object(${Object.keys(value).length})`;
  }
  if (typeof value === "string") {
    return `string(${value.length})`;
  }
  return typeof value;
}

function previewStorageValue(value, maxLength = 220) {
  try {
    const sanitized = sanitizeJsonbValue(value);
    const raw =
      typeof sanitized === "string" ? sanitized : JSON.stringify(sanitized);
    const text = String(raw || "").trim();
    if (!text) {
      return "";
    }
    return text.length > maxLength ? `${text.slice(0, maxLength)}…` : text;
  } catch (_error) {
    return "";
  }
}

function stringifyJsonb(value) {
  return JSON.stringify(value ?? null);
}

function toStorageText(value = "", fallback = "") {
  const text = value == null ? "" : String(value).trim();
  return text || fallback;
}

function toStorageInteger(value, fallback = 0) {
  const parsed = Number.parseInt(String(value ?? ""), 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function toStorageFiniteNumber(value, fallback = 0) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : fallback;
}

function toStorageBoolean(value) {
  return Boolean(value);
}

function toClientTimestamp(value = null) {
  if (value == null || value === "") {
    return null;
  }
  const numeric = Number(value);
  if (Number.isFinite(numeric) && numeric > 0) {
    const date = new Date(numeric);
    return Number.isNaN(date.getTime()) ? null : date;
  }
  const parsed = Date.parse(String(value));
  if (!Number.isNaN(parsed)) {
    return new Date(parsed);
  }
  return null;
}

function getPayloadUpdatedAt(value) {
  if (Array.isArray(value)) {
    return value.reduce((latest, item) => {
      const updatedAt = Number(item?.updatedAt || item?.updated_at || item?.createdAt || item?.created_at || 0);
      return Number.isFinite(updatedAt) ? Math.max(latest, updatedAt) : latest;
    }, 0);
  }
  if (value && typeof value === "object") {
    return Number(value.updatedAt || value.updated_at || value.createdAt || value.created_at || 0) || 0;
  }
  return 0;
}

function toClientTimestampFromPayload(value) {
  return toClientTimestamp(getPayloadUpdatedAt(value));
}

function toDateText(value = "", fallback = null) {
  const text = String(value || "").trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(text)) {
    return text;
  }
  return fallback;
}

function toTimeText(value = "") {
  const text = String(value || "").trim();
  const match = text.match(/^(\d{2}):(\d{2})(?::\d{2})?(?:Z|[+-]\d{2}:\d{2})?$/i);
  if (!match) {
    return null;
  }
  return `${match[1]}:${match[2]}`;
}

function normalizeSnapshotArray(value) {
  return Array.isArray(value) ? value.filter((item) => item && typeof item === "object") : [];
}

function normalizeSnapshotObject(value) {
  return value && typeof value === "object" && !Array.isArray(value) ? value : {};
}

function addTableWriteSummary(summary, tableName = "", rowCount = 0) {
  if (!tableName) {
    return;
  }
  const existing = summary.find((item) => item.tableName === tableName);
  if (existing) {
    existing.rowCount += rowCount;
    return;
  }
  summary.push({
    tableName,
    rowCount
  });
}

async function ensureBusinessSnapshotTables(db) {
  await db.query(`
    create table if not exists app_settings (
      owner_id text primary key,
      forum_settings jsonb not null default '{}'::jsonb,
      prompt_rules jsonb not null default '{}'::jsonb,
      negative_prompt_constraints jsonb not null default '[]'::jsonb,
      api_state jsonb not null default '{}'::jsonb,
      api_secrets jsonb not null default '{}'::jsonb,
      chat_global_settings jsonb not null default '{}'::jsonb,
      message_prompt_settings jsonb not null default '{}'::jsonb,
      bubble_mount_settings jsonb not null default '{}'::jsonb,
      privacy_state jsonb not null default '{}'::jsonb,
      metadata jsonb not null default '{}'::jsonb,
      client_updated_at timestamptz,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now()
    );
  `);
  await db.query(`
    create table if not exists app_api_configs (
      owner_id text not null,
      id text not null,
      name text not null default '',
      mode text not null default '',
      endpoint text not null default '',
      model text not null default '',
      temperature double precision not null default 0,
      token text not null default '',
      is_current boolean not null default false,
      metadata jsonb not null default '{}'::jsonb,
      client_updated_at timestamptz,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now(),
      primary key (owner_id, id)
    );
  `);
  await db.query(`
    create table if not exists app_profiles (
      owner_id text primary key,
      forum_profile jsonb not null default '{}'::jsonb,
      chat_profile jsonb not null default '{}'::jsonb,
      client_updated_at timestamptz,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now()
    );
  `);
  await db.query(`
    create table if not exists app_documents (
      owner_id text not null,
      doc_type text not null,
      doc_key text not null,
      title text not null default '',
      content_jsonb jsonb not null default '{}'::jsonb,
      client_updated_at timestamptz,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now(),
      primary key (owner_id, doc_type, doc_key)
    );
  `);
  await db.query(`
    create table if not exists chat_contacts (
      owner_id text not null,
      id text not null,
      name text not null default '',
      avatar_image_url text not null default '',
      avatar_text text not null default '',
      persona_prompt text not null default '',
      special_user_persona text not null default '',
      awareness_state jsonb not null default '{}'::jsonb,
      payload_jsonb jsonb not null default '{}'::jsonb,
      client_updated_at timestamptz,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now(),
      primary key (owner_id, id)
    );
  `);
  await db.query(`
    create table if not exists chat_conversations (
      owner_id text not null,
      id text not null,
      contact_id text not null default '',
      conversation_key text not null default '',
      contact_name_snapshot text not null default '',
      contact_avatar_image_snapshot text not null default '',
      contact_avatar_text_snapshot text not null default '',
      prompt_settings_jsonb jsonb not null default '{}'::jsonb,
      scene_mode text not null default '',
      allow_ai_presence_update boolean not null default false,
      allow_ai_proactive_message boolean not null default false,
      allow_ai_auto_schedule boolean not null default false,
      auto_schedule_days integer not null default 0,
      auto_schedule_time text not null default '',
      auto_schedule_last_run_date text not null default '',
      voice_call_state_jsonb jsonb not null default '{}'::jsonb,
      reply_context_version integer not null default 0,
      memory_summary_counter integer not null default 0,
      memory_summary_last_message_count integer not null default 0,
      last_message_at timestamptz,
      last_message_id text,
      payload_jsonb jsonb not null default '{}'::jsonb,
      client_updated_at timestamptz,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now(),
      primary key (owner_id, id)
    );
  `);
  await db.query(`
    create table if not exists chat_messages (
      owner_id text not null,
      id text not null,
      conversation_id text not null default '',
      contact_id text not null default '',
      sender_role text not null default '',
      message_type text not null default '',
      text_content text not null default '',
      needs_reply boolean not null default false,
      message_seq bigint not null default 0,
      status text not null default '',
      payload_jsonb jsonb not null default '{}'::jsonb,
      client_created_at timestamptz,
      client_updated_at timestamptz,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now(),
      primary key (owner_id, id)
    );
  `);
  await db.query(`
    create table if not exists chat_journals (
      owner_id text not null,
      id text not null,
      contact_id text not null default '',
      contact_name_snapshot text not null default '',
      conversation_id text not null default '',
      entry_date date not null,
      weather text not null default '',
      content text not null default '',
      payload_jsonb jsonb not null default '{}'::jsonb,
      client_updated_at timestamptz,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now(),
      primary key (owner_id, id)
    );
  `);
  await db.query(`
    create table if not exists schedule_entries (
      owner_id text not null,
      id text not null,
      title text not null default '',
      schedule_type text not null default '',
      owner_type text not null default '',
      owner_contact_id text not null default '',
      companion_includes_user boolean not null default false,
      companion_contact_ids_jsonb jsonb not null default '[]'::jsonb,
      visibility_mode text not null default '',
      visible_contact_ids_jsonb jsonb not null default '[]'::jsonb,
      place_id text not null default '',
      entry_date date not null,
      start_time time,
      end_time time,
      invite_decisions_jsonb jsonb not null default '{}'::jsonb,
      payload_jsonb jsonb not null default '{}'::jsonb,
      client_updated_at timestamptz,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now(),
      primary key (owner_id, id)
    );
  `);
  await db.query(`
    create table if not exists common_places (
      owner_id text not null,
      id text not null,
      name text not null default '',
      place_type text not null default '',
      aliases_jsonb jsonb not null default '[]'::jsonb,
      traits_text text not null default '',
      visibility_mode text not null default '',
      visible_contact_ids_jsonb jsonb not null default '[]'::jsonb,
      last_used_at timestamptz,
      payload_jsonb jsonb not null default '{}'::jsonb,
      client_updated_at timestamptz,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now(),
      primary key (owner_id, id)
    );
  `);
  await db.query(`
    create table if not exists presence_states (
      owner_id text not null,
      id text not null,
      scope_type text not null default '',
      contact_id text,
      presence_type text not null default '',
      place_id text not null default '',
      from_place_id text not null default '',
      to_place_id text not null default '',
      payload_jsonb jsonb not null default '{}'::jsonb,
      client_updated_at timestamptz,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now(),
      primary key (owner_id, id)
    );
  `);
  await db.query(`
    create table if not exists worldbook_categories (
      owner_id text not null,
      id text not null,
      name text not null default '',
      sort_order integer not null default 0,
      payload_jsonb jsonb not null default '{}'::jsonb,
      client_updated_at timestamptz,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now(),
      primary key (owner_id, id)
    );
  `);
  await db.query(`
    create table if not exists worldbook_entries (
      owner_id text not null,
      id text not null,
      category_id text,
      name text not null default '',
      text_content text not null default '',
      sort_order integer not null default 0,
      payload_jsonb jsonb not null default '{}'::jsonb,
      client_updated_at timestamptz,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now(),
      primary key (owner_id, id)
    );
  `);
}

function buildAppSettingsSnapshot(settings = {}) {
  const source = normalizeSnapshotObject(settings);
  const apiConfigs = Array.isArray(source.apiConfigs) ? source.apiConfigs : [];
  const apiConfigTokenMap = Object.fromEntries(
    apiConfigs
      .map((item) => [toStorageText(item?.id), toStorageText(item?.token)])
      .filter(([id, token]) => id && token)
  );
  const reservedKeys = new Set([
    "apiConfigs",
    "activeApiConfigId",
    "mode",
    "endpoint",
    "model",
    "temperature",
    "token",
    "translationApiEnabled",
    "translationApiConfigId",
    "summaryApiEnabled",
    "summaryApiConfigId",
    "floatingApiSwitcherEnabled",
    "promptRules",
    "negativePromptConstraints",
    "chatGlobalSettings",
    "messagePromptSettings",
    "bubbleMountSettings",
    "privacyCoverEnabled",
    "privacyAllowlist"
  ]);
  const metadata = Object.fromEntries(
    Object.entries(source).filter(([key]) => !reservedKeys.has(key))
  );
  return {
    forumSettings: {
      worldview: toStorageText(source.worldview),
      homeCount: source.homeCount ?? "",
      replyCount: source.replyCount ?? "",
      customTabs: Array.isArray(source.customTabs) ? source.customTabs : []
    },
    promptRules: normalizeSnapshotObject(source.promptRules),
    negativePromptConstraints: Array.isArray(source.negativePromptConstraints)
      ? source.negativePromptConstraints
      : [],
    apiState: {
      mode: toStorageText(source.mode),
      endpoint: toStorageText(source.endpoint),
      model: toStorageText(source.model),
      temperature: toStorageFiniteNumber(source.temperature, 0),
      activeApiConfigId: toStorageText(source.activeApiConfigId),
      translationApiEnabled: toStorageBoolean(source.translationApiEnabled),
      translationApiConfigId: toStorageText(source.translationApiConfigId),
      summaryApiEnabled: toStorageBoolean(source.summaryApiEnabled),
      summaryApiConfigId: toStorageText(source.summaryApiConfigId),
      floatingApiSwitcherEnabled: toStorageBoolean(source.floatingApiSwitcherEnabled)
    },
    apiSecrets: {
      currentToken: toStorageText(source.token),
      apiConfigTokens: apiConfigTokenMap
    },
    chatGlobalSettings: normalizeSnapshotObject(source.chatGlobalSettings),
    messagePromptSettings: normalizeSnapshotObject(source.messagePromptSettings),
    bubbleMountSettings: normalizeSnapshotObject(source.bubbleMountSettings),
    privacyState: {
      privacyCoverEnabled: source.privacyCoverEnabled !== false,
      privacyAllowlist: Array.isArray(source.privacyAllowlist) ? source.privacyAllowlist : []
    },
    metadata
  };
}

async function replaceAppSettingsSnapshot(db, valueJson, ownerId, tableWrites) {
  const settings = normalizeSnapshotObject(valueJson);
  const snapshot = buildAppSettingsSnapshot(settings);
  await db.query(
    `
      insert into app_settings (
        owner_id,
        forum_settings,
        prompt_rules,
        negative_prompt_constraints,
        api_state,
        api_secrets,
        chat_global_settings,
        message_prompt_settings,
        bubble_mount_settings,
        privacy_state,
        metadata,
        client_updated_at,
        created_at,
        updated_at
      )
      values ($1, $2::jsonb, $3::jsonb, $4::jsonb, $5::jsonb, $6::jsonb, $7::jsonb, $8::jsonb, $9::jsonb, $10::jsonb, $11::jsonb, $12, now(), now())
      on conflict (owner_id) do update
        set forum_settings = excluded.forum_settings,
            prompt_rules = excluded.prompt_rules,
            negative_prompt_constraints = excluded.negative_prompt_constraints,
            api_state = excluded.api_state,
            api_secrets = excluded.api_secrets,
            chat_global_settings = excluded.chat_global_settings,
            message_prompt_settings = excluded.message_prompt_settings,
            bubble_mount_settings = excluded.bubble_mount_settings,
            privacy_state = excluded.privacy_state,
            metadata = excluded.metadata,
            client_updated_at = excluded.client_updated_at,
            updated_at = now()
    `,
    [
      ownerId,
      stringifyJsonb(snapshot.forumSettings),
      stringifyJsonb(snapshot.promptRules),
      stringifyJsonb(snapshot.negativePromptConstraints),
      stringifyJsonb(snapshot.apiState),
      stringifyJsonb(snapshot.apiSecrets),
      stringifyJsonb(snapshot.chatGlobalSettings),
      stringifyJsonb(snapshot.messagePromptSettings),
      stringifyJsonb(snapshot.bubbleMountSettings),
      stringifyJsonb(snapshot.privacyState),
      stringifyJsonb(snapshot.metadata),
      toClientTimestampFromPayload(settings)
    ]
  );
  addTableWriteSummary(tableWrites, "app_settings", 1);

  const apiConfigs = Array.isArray(settings.apiConfigs) ? settings.apiConfigs : [];
  await db.query("delete from app_api_configs where owner_id = $1", [ownerId]);
  for (const [index, config] of apiConfigs.entries()) {
    const source = normalizeSnapshotObject(config);
    const id = toStorageText(source.id, `api_config_${index + 1}`);
    await db.query(
      `
        insert into app_api_configs (
          owner_id,
          id,
          name,
          mode,
          endpoint,
          model,
          temperature,
          token,
          is_current,
          metadata,
          client_updated_at,
          created_at,
          updated_at
        )
        values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10::jsonb, $11, now(), now())
      `,
      [
        ownerId,
        id,
        toStorageText(source.name, `接口配置 ${index + 1}`),
        toStorageText(source.mode),
        toStorageText(source.endpoint),
        toStorageText(source.model),
        toStorageFiniteNumber(source.temperature, 0),
        toStorageText(source.token),
        id === toStorageText(settings.activeApiConfigId),
        stringifyJsonb(source),
        toClientTimestamp(source.updatedAt)
      ]
    );
  }
  addTableWriteSummary(tableWrites, "app_api_configs", apiConfigs.length);
}

async function replaceAppProfileSnapshot(db, valueJson, ownerId, tableWrites) {
  const profile = normalizeSnapshotObject(valueJson);
  const chatProfile = {
    username: toStorageText(profile.chatUsername || profile.username),
    userId: toStorageText(profile.chatUserId || profile.userId),
    avatarImage: toStorageText(profile.chatAvatarImage || profile.avatarImage),
    personaPrompt: toStorageText(profile.chatPersonaPrompt || profile.personaPrompt),
    chatProfileInitialized: toStorageBoolean(profile.chatProfileInitialized)
  };
  await db.query(
    `
      insert into app_profiles (
        owner_id,
        forum_profile,
        chat_profile,
        client_updated_at,
        created_at,
        updated_at
      )
      values ($1, $2::jsonb, $3::jsonb, $4, now(), now())
      on conflict (owner_id) do update
        set forum_profile = excluded.forum_profile,
            chat_profile = excluded.chat_profile,
            client_updated_at = excluded.client_updated_at,
            updated_at = now()
    `,
    [
      ownerId,
      stringifyJsonb(profile),
      stringifyJsonb(chatProfile),
      toClientTimestampFromPayload(profile)
    ]
  );
  addTableWriteSummary(tableWrites, "app_profiles", 1);
}

async function upsertAppDocumentSnapshot(db, storageKey, valueJson, ownerId, tableWrites) {
  const definition = STORAGE_DOCUMENT_DEFINITIONS.get(storageKey);
  if (!definition) {
    return;
  }
  await db.query(
    `
      insert into app_documents (
        owner_id,
        doc_type,
        doc_key,
        title,
        content_jsonb,
        client_updated_at,
        created_at,
        updated_at
      )
      values ($1, $2, $3, $4, $5::jsonb, $6, now(), now())
      on conflict (owner_id, doc_type, doc_key) do update
        set title = excluded.title,
            content_jsonb = excluded.content_jsonb,
            client_updated_at = excluded.client_updated_at,
            updated_at = now()
    `,
    [
      ownerId,
      definition.docType,
      definition.docKey,
      definition.title,
      stringifyJsonb(valueJson),
      toClientTimestampFromPayload(valueJson)
    ]
  );
  addTableWriteSummary(tableWrites, "app_documents", 1);
}

async function replaceChatContactsSnapshot(db, valueJson, ownerId, tableWrites) {
  const contacts = normalizeSnapshotArray(valueJson);
  await db.query("delete from chat_contacts where owner_id = $1", [ownerId]);
  for (const [index, contact] of contacts.entries()) {
    const id = toStorageText(contact.id, `contact_${index + 1}`);
    const awarenessState = {
      awarenessTitle: toStorageText(contact.awarenessTitle),
      awarenessText: toStorageText(contact.awarenessText),
      awarenessEmotionShift: toStorageText(contact.awarenessEmotionShift),
      awarenessSensitivity: contact.awarenessSensitivity ?? null,
      awarenessConsumed: toStorageBoolean(contact.awarenessConsumed),
      awarenessResolvedState: toStorageText(contact.awarenessResolvedState),
      awarenessHistoryHidden: toStorageBoolean(contact.awarenessHistoryHidden),
      awarenessCheckCount: toStorageInteger(contact.awarenessCheckCount, 0),
      awarenessTriggerCount: toStorageInteger(contact.awarenessTriggerCount, 0),
      awarenessLastCheckedAt: Number(contact.awarenessLastCheckedAt) || 0,
      awarenessLastTriggeredAt: Number(contact.awarenessLastTriggeredAt) || 0,
      awarenessHistory: Array.isArray(contact.awarenessHistory) ? contact.awarenessHistory : [],
      awarenessManualTriggerPending: contact.awarenessManualTriggerPending || null
    };
    await db.query(
      `
        insert into chat_contacts (
          owner_id,
          id,
          name,
          avatar_image_url,
          avatar_text,
          persona_prompt,
          special_user_persona,
          awareness_state,
          payload_jsonb,
          client_updated_at,
          created_at,
          updated_at
        )
        values ($1, $2, $3, $4, $5, $6, $7, $8::jsonb, $9::jsonb, $10, now(), now())
      `,
      [
        ownerId,
        id,
        toStorageText(contact.name, `联系人 ${index + 1}`),
        toStorageText(contact.avatarImage),
        toStorageText(contact.avatarText),
        toStorageText(contact.personaPrompt),
        toStorageText(contact.specialUserPersona),
        stringifyJsonb(awarenessState),
        stringifyJsonb(contact),
        toClientTimestamp(contact.updatedAt || contact.createdAt)
      ]
    );
  }
  addTableWriteSummary(tableWrites, "chat_contacts", contacts.length);
}

function getConversationLastMessage(conversation = {}) {
  const messages = Array.isArray(conversation.messages) ? conversation.messages : [];
  return messages.length ? messages[messages.length - 1] : null;
}

async function replaceChatThreadsSnapshot(db, valueJson, ownerId, tableWrites) {
  const conversations = normalizeSnapshotArray(valueJson);
  await db.query("delete from chat_messages where owner_id = $1", [ownerId]);
  await db.query("delete from chat_conversations where owner_id = $1", [ownerId]);

  let messageCount = 0;
  for (const [conversationIndex, conversation] of conversations.entries()) {
    const conversationId = toStorageText(conversation.id, `conversation_${conversationIndex + 1}`);
    const contactId = toStorageText(conversation.contactId);
    const messages = Array.isArray(conversation.messages) ? conversation.messages : [];
    const lastMessage = getConversationLastMessage(conversation);
    await db.query(
      `
        insert into chat_conversations (
          owner_id,
          id,
          contact_id,
          conversation_key,
          contact_name_snapshot,
          contact_avatar_image_snapshot,
          contact_avatar_text_snapshot,
          prompt_settings_jsonb,
          scene_mode,
          allow_ai_presence_update,
          allow_ai_proactive_message,
          allow_ai_auto_schedule,
          auto_schedule_days,
          auto_schedule_time,
          auto_schedule_last_run_date,
          voice_call_state_jsonb,
          reply_context_version,
          memory_summary_counter,
          memory_summary_last_message_count,
          last_message_at,
          last_message_id,
          payload_jsonb,
          client_updated_at,
          created_at,
          updated_at
        )
        values ($1, $2, $3, $4, $5, $6, $7, $8::jsonb, $9, $10, $11, $12, $13, $14, $15, $16::jsonb, $17, $18, $19, $20, $21, $22::jsonb, $23, now(), now())
      `,
      [
        ownerId,
        conversationId,
        contactId,
        `${contactId || "contact"}:${conversationId}`,
        toStorageText(conversation.contactNameSnapshot),
        toStorageText(conversation.contactAvatarImageSnapshot),
        toStorageText(conversation.contactAvatarTextSnapshot),
        stringifyJsonb(normalizeSnapshotObject(conversation.promptSettings)),
        toStorageText(conversation.sceneMode, "online"),
        toStorageBoolean(conversation.allowAiPresenceUpdate),
        toStorageBoolean(conversation.allowAiProactiveMessage),
        toStorageBoolean(conversation.allowAiAutoSchedule),
        toStorageInteger(conversation.autoScheduleDays, 0),
        toStorageText(conversation.autoScheduleTime),
        toStorageText(conversation.autoScheduleLastRunDate),
        stringifyJsonb(normalizeSnapshotObject(conversation.voiceCallState)),
        toStorageInteger(conversation.replyContextVersion, 0),
        toStorageInteger(conversation.memorySummaryCounter, 0),
        toStorageInteger(conversation.memorySummaryLastMessageCount, 0),
        toClientTimestamp(lastMessage?.createdAt || conversation.updatedAt),
        lastMessage ? toStorageText(lastMessage.id) : null,
        stringifyJsonb(conversation),
        toClientTimestamp(conversation.updatedAt)
      ]
    );

    for (const [messageIndex, message] of messages.entries()) {
      const messageId = toStorageText(
        message?.id,
        `${conversationId}_message_${messageIndex + 1}`
      );
      await db.query(
        `
          insert into chat_messages (
            owner_id,
            id,
            conversation_id,
            contact_id,
            sender_role,
            message_type,
            text_content,
            needs_reply,
            message_seq,
            status,
            payload_jsonb,
            client_created_at,
            client_updated_at,
            created_at,
            updated_at
          )
          values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11::jsonb, $12, $13, now(), now())
        `,
        [
          ownerId,
          messageId,
          conversationId,
          contactId,
          toStorageText(message?.role, "user"),
          toStorageText(message?.messageType, "text"),
          toStorageText(message?.text),
          toStorageBoolean(message?.needsReply),
          messageIndex + 1,
          toStorageText(message?.status, "active"),
          stringifyJsonb(message),
          toClientTimestamp(message?.createdAt),
          toClientTimestamp(message?.updatedAt || message?.createdAt)
        ]
      );
      messageCount += 1;
    }
  }
  addTableWriteSummary(tableWrites, "chat_conversations", conversations.length);
  addTableWriteSummary(tableWrites, "chat_messages", messageCount);
}

async function replaceScheduleEntriesSnapshot(db, valueJson, ownerId, tableWrites) {
  const entries = normalizeSnapshotArray(valueJson);
  await db.query("delete from schedule_entries where owner_id = $1", [ownerId]);
  let savedCount = 0;
  for (const [index, entry] of entries.entries()) {
    const id = toStorageText(entry.id, `schedule_${index + 1}`);
    const entryDate = toDateText(entry.date) || new Date().toISOString().slice(0, 10);
    await db.query(
      `
        insert into schedule_entries (
          owner_id,
          id,
          title,
          schedule_type,
          owner_type,
          owner_contact_id,
          companion_includes_user,
          companion_contact_ids_jsonb,
          visibility_mode,
          visible_contact_ids_jsonb,
          place_id,
          entry_date,
          start_time,
          end_time,
          invite_decisions_jsonb,
          payload_jsonb,
          client_updated_at,
          created_at,
          updated_at
        )
        values ($1, $2, $3, $4, $5, $6, $7, $8::jsonb, $9, $10::jsonb, $11, $12, $13, $14, $15::jsonb, $16::jsonb, $17, now(), now())
      `,
      [
        ownerId,
        id,
        toStorageText(entry.title, `日程 ${index + 1}`),
        toStorageText(entry.scheduleType, "day"),
        toStorageText(entry.ownerType, "user"),
        toStorageText(entry.ownerId),
        toStorageBoolean(entry.companionIncludesUser),
        stringifyJsonb(Array.isArray(entry.companionContactIds) ? entry.companionContactIds : []),
        toStorageText(entry.visibilityMode, "all"),
        stringifyJsonb(Array.isArray(entry.visibleContactIds) ? entry.visibleContactIds : []),
        toStorageText(entry.placeId),
        entryDate,
        toTimeText(entry.startTime),
        toTimeText(entry.endTime),
        stringifyJsonb(normalizeSnapshotObject(entry.inviteDecisions)),
        stringifyJsonb(entry),
        toClientTimestamp(entry.updatedAt || entry.createdAt)
      ]
    );
    savedCount += 1;
  }
  addTableWriteSummary(tableWrites, "schedule_entries", savedCount);
}

async function replaceCommonPlacesSnapshot(db, valueJson, ownerId, tableWrites) {
  const places = normalizeSnapshotArray(valueJson);
  await db.query("delete from common_places where owner_id = $1", [ownerId]);
  for (const [index, place] of places.entries()) {
    await db.query(
      `
        insert into common_places (
          owner_id,
          id,
          name,
          place_type,
          aliases_jsonb,
          traits_text,
          visibility_mode,
          visible_contact_ids_jsonb,
          last_used_at,
          payload_jsonb,
          client_updated_at,
          created_at,
          updated_at
        )
        values ($1, $2, $3, $4, $5::jsonb, $6, $7, $8::jsonb, $9, $10::jsonb, $11, now(), now())
      `,
      [
        ownerId,
        toStorageText(place.id, `common_place_${index + 1}`),
        toStorageText(place.name, `常用地点 ${index + 1}`),
        toStorageText(place.type || place.placeType, "other"),
        stringifyJsonb(Array.isArray(place.aliases) ? place.aliases : []),
        toStorageText(place.traitsText || place.specialText || place.description),
        toStorageText(place.visibilityMode, "self"),
        stringifyJsonb(Array.isArray(place.visibleContactIds) ? place.visibleContactIds : []),
        toClientTimestamp(place.lastUsedAt),
        stringifyJsonb(place),
        toClientTimestamp(place.updatedAt || place.createdAt)
      ]
    );
  }
  addTableWriteSummary(tableWrites, "common_places", places.length);
}

function buildPresenceRows(valueJson) {
  const source = normalizeSnapshotObject(valueJson);
  const rows = [];
  rows.push({
    id: "user_global",
    scopeType: "user_global",
    contactId: null,
    payload: normalizeSnapshotObject(source.userGlobal)
  });
  Object.entries(normalizeSnapshotObject(source.userByContact)).forEach(([contactId, payload]) => {
    const resolvedContactId = toStorageText(contactId);
    if (!resolvedContactId) {
      return;
    }
    rows.push({
      id: `user_by_contact:${resolvedContactId}`,
      scopeType: "user_by_contact",
      contactId: resolvedContactId,
      payload: normalizeSnapshotObject(payload)
    });
  });
  Object.entries(normalizeSnapshotObject(source.contacts)).forEach(([contactId, payload]) => {
    const resolvedContactId = toStorageText(contactId);
    if (!resolvedContactId) {
      return;
    }
    rows.push({
      id: `contact:${resolvedContactId}`,
      scopeType: "contact",
      contactId: resolvedContactId,
      payload: normalizeSnapshotObject(payload)
    });
  });
  return rows;
}

async function replacePresenceSnapshot(db, valueJson, ownerId, tableWrites) {
  const rows = buildPresenceRows(valueJson);
  await db.query("delete from presence_states where owner_id = $1", [ownerId]);
  for (const row of rows) {
    await db.query(
      `
        insert into presence_states (
          owner_id,
          id,
          scope_type,
          contact_id,
          presence_type,
          place_id,
          from_place_id,
          to_place_id,
          payload_jsonb,
          client_updated_at,
          created_at,
          updated_at
        )
        values ($1, $2, $3, $4, $5, $6, $7, $8, $9::jsonb, $10, now(), now())
      `,
      [
        ownerId,
        row.id,
        row.scopeType,
        row.contactId,
        toStorageText(row.payload.presenceType, "at_place"),
        toStorageText(row.payload.placeId),
        toStorageText(row.payload.fromPlaceId),
        toStorageText(row.payload.toPlaceId),
        stringifyJsonb(row.payload),
        toClientTimestamp(row.payload.updatedAt)
      ]
    );
  }
  addTableWriteSummary(tableWrites, "presence_states", rows.length);
}

async function replaceWorldbooksSnapshot(db, valueJson, ownerId, tableWrites) {
  const source = normalizeSnapshotObject(valueJson);
  const categories = normalizeSnapshotArray(source.categories);
  const entries = normalizeSnapshotArray(source.entries);
  await db.query("delete from worldbook_entries where owner_id = $1", [ownerId]);
  await db.query("delete from worldbook_categories where owner_id = $1", [ownerId]);
  for (const [index, category] of categories.entries()) {
    await db.query(
      `
        insert into worldbook_categories (
          owner_id,
          id,
          name,
          sort_order,
          payload_jsonb,
          client_updated_at,
          created_at,
          updated_at
        )
        values ($1, $2, $3, $4, $5::jsonb, $6, now(), now())
      `,
      [
        ownerId,
        toStorageText(category.id, `worldbook_category_${index + 1}`),
        toStorageText(category.name, `分类 ${index + 1}`),
        index,
        stringifyJsonb(category),
        toClientTimestamp(category.updatedAt || category.createdAt)
      ]
    );
  }
  for (const [index, entry] of entries.entries()) {
    await db.query(
      `
        insert into worldbook_entries (
          owner_id,
          id,
          category_id,
          name,
          text_content,
          sort_order,
          payload_jsonb,
          client_updated_at,
          created_at,
          updated_at
        )
        values ($1, $2, $3, $4, $5, $6, $7::jsonb, $8, now(), now())
      `,
      [
        ownerId,
        toStorageText(entry.id, `worldbook_entry_${index + 1}`),
        toStorageText(entry.categoryId) || null,
        toStorageText(entry.name, `世界书 ${index + 1}`),
        toStorageText(entry.text),
        index,
        stringifyJsonb(entry),
        toClientTimestamp(entry.updatedAt || entry.createdAt)
      ]
    );
  }
  addTableWriteSummary(tableWrites, "worldbook_categories", categories.length);
  addTableWriteSummary(tableWrites, "worldbook_entries", entries.length);
}

async function mirrorStorageItemToBusinessTables(db, item, tableWrites, ownerId = DEFAULT_STORAGE_OWNER_ID) {
  const storageKey = String(item?.key || "").trim();
  const valueJson = item?.valueJson;
  switch (storageKey) {
    case SETTINGS_KEY:
      await replaceAppSettingsSnapshot(db, valueJson, ownerId, tableWrites);
      return;
    case PROFILE_KEY:
      await replaceAppProfileSnapshot(db, valueJson, ownerId, tableWrites);
      return;
    case MESSAGE_CONTACTS_KEY:
      await replaceChatContactsSnapshot(db, valueJson, ownerId, tableWrites);
      return;
    case MESSAGE_THREADS_KEY:
      await replaceChatThreadsSnapshot(db, valueJson, ownerId, tableWrites);
      return;
    case WORLD_BOOKS_KEY:
      await replaceWorldbooksSnapshot(db, valueJson, ownerId, tableWrites);
      return;
    case SCHEDULE_ENTRIES_KEY:
      await replaceScheduleEntriesSnapshot(db, valueJson, ownerId, tableWrites);
      return;
    case MESSAGE_COMMON_PLACES_KEY:
      await replaceCommonPlacesSnapshot(db, valueJson, ownerId, tableWrites);
      return;
    case MESSAGE_PRESENCE_STATE_KEY:
      await replacePresenceSnapshot(db, valueJson, ownerId, tableWrites);
      return;
    default:
      await upsertAppDocumentSnapshot(db, storageKey, valueJson, ownerId, tableWrites);
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

async function ensureMemoryTables(db) {
  await db.query(`
    create table if not exists memory_items (
      id uuid primary key,
      contact_id text not null,
      scope_type text not null default 'contact',
      source_conversation_id text,
      memory_type text not null,
      memory_subtype text,
      semantic_key text,
      canonical_text text not null,
      summary_short text not null default '',
      summary_faint text not null default '',
      keywords jsonb not null default '[]'::jsonb,
      entity_refs jsonb not null default '[]'::jsonb,
      base_importance double precision not null default 0,
      confidence double precision not null default 0,
      status text not null default 'active',
      status_changed_at timestamptz not null default now(),
      first_observed_at timestamptz not null default now(),
      last_observed_at timestamptz not null default now(),
      last_reinforced_at timestamptz,
      last_recalled_at timestamptz,
      reinforce_count integer not null default 0,
      recall_count integer not null default 0,
      emotion_intensity double precision,
      emotion_profile jsonb not null default '{}'::jsonb,
      interaction_tendency jsonb not null default '{}'::jsonb,
      emotion_summary text not null default '',
      arousal_level double precision,
      archived_at timestamptz,
      superseded_by uuid,
      metadata jsonb not null default '{}'::jsonb,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now(),
      constraint memory_items_scope_type_check
        check (scope_type in ('contact', 'global', 'thread', 'scene')),
      constraint memory_items_status_check
        check (status in ('active', 'faint', 'dormant', 'archived', 'superseded')),
      constraint memory_items_reinforce_count_check
        check (reinforce_count >= 0),
      constraint memory_items_recall_count_check
        check (recall_count >= 0),
      constraint memory_items_superseded_fk
        foreign key (superseded_by) references memory_items (id) on delete set null
    );
  `);
  await db.query(`
    create index if not exists memory_items_contact_status_idx
      on memory_items (contact_id, status, updated_at desc);
  `);
  await db.query(`
    create index if not exists memory_items_contact_type_status_idx
      on memory_items (contact_id, memory_type, status, updated_at desc);
  `);
  await db.query(`
    create index if not exists memory_items_semantic_key_idx
      on memory_items (contact_id, semantic_key)
      where semantic_key is not null and semantic_key <> '';
  `);
  await db.query(`
    create index if not exists memory_items_superseded_by_idx
      on memory_items (superseded_by)
      where superseded_by is not null;
  `);
  await db.query(`
    create table if not exists memory_runtime_state (
      memory_item_id uuid primary key,
      activation_score double precision not null default 0,
      stability_score double precision not null default 0,
      impression_floor double precision not null default 0,
      decay_rate double precision not null default 0,
      cue_recall_threshold double precision not null default 0,
      last_computed_at timestamptz not null default now(),
      last_decay_at timestamptz,
      next_decay_at timestamptz,
      last_recalled_score double precision,
      algorithm_version text not null default 'v1',
      debug_payload jsonb not null default '{}'::jsonb,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now(),
      constraint memory_runtime_state_memory_item_fk
        foreign key (memory_item_id) references memory_items (id) on delete cascade
    );
  `);
  await db.query(`
    create index if not exists memory_runtime_state_next_decay_idx
      on memory_runtime_state (next_decay_at asc)
      where next_decay_at is not null;
  `);
  await db.query(`
    create table if not exists memory_events (
      id uuid primary key,
      memory_item_id uuid not null,
      contact_id text not null,
      event_type text not null,
      event_time timestamptz not null default now(),
      actor_type text not null,
      actor_ref text,
      source_kind text,
      source_ref jsonb not null default '{}'::jsonb,
      reason_code text,
      delta_payload jsonb not null default '{}'::jsonb,
      before_snapshot jsonb,
      after_snapshot jsonb,
      batch_id text,
      note text,
      metadata jsonb not null default '{}'::jsonb,
      created_at timestamptz not null default now(),
      constraint memory_events_event_type_check
        check (
          event_type in (
            'created',
            'observed',
            'reinforced',
            'recalled',
            'decayed',
            'status_changed',
            'superseded',
            'edited',
            'policy_applied',
            'imported'
          )
        ),
      constraint memory_events_memory_item_fk
        foreign key (memory_item_id) references memory_items (id) on delete cascade
    );
  `);
  await db.query(`
    create index if not exists memory_events_memory_item_time_idx
      on memory_events (memory_item_id, event_time desc, created_at desc);
  `);
  await db.query(`
    create index if not exists memory_events_contact_time_idx
      on memory_events (contact_id, event_time desc, created_at desc);
  `);
  await db.query(`
    create index if not exists memory_events_type_time_idx
      on memory_events (event_type, event_time desc, created_at desc);
  `);
  await db.query(`
    create index if not exists memory_events_batch_idx
      on memory_events (batch_id)
      where batch_id is not null and batch_id <> '';
  `);
  await db.query(`
    create table if not exists memory_policies (
      id uuid primary key,
      policy_name text not null,
      policy_scope text not null,
      contact_id text,
      memory_type text,
      memory_subtype text,
      memory_item_id uuid,
      policy_kind text not null,
      policy_payload jsonb not null default '{}'::jsonb,
      is_enabled boolean not null default true,
      priority integer not null default 0,
      effective_from timestamptz,
      effective_to timestamptz,
      reason_note text,
      metadata jsonb not null default '{}'::jsonb,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now(),
      constraint memory_policies_scope_check
        check (
          policy_scope in (
            'global',
            'contact',
            'memory_type',
            'contact_memory_type',
            'item'
          )
        ),
      constraint memory_policies_kind_check
        check (
          policy_kind in (
            'decay_multiplier',
            'stability_bonus',
            'impression_floor_min',
            'cue_threshold_adjustment',
            'prompt_boost',
            'prompt_suppress',
            'status_lock',
            'never_archive'
          )
        ),
      constraint memory_policies_effective_window_check
        check (
          effective_to is null
          or effective_from is null
          or effective_to >= effective_from
        ),
      constraint memory_policies_memory_item_fk
        foreign key (memory_item_id) references memory_items (id) on delete cascade
    );
  `);
  await db.query(`
    create index if not exists memory_policies_enabled_idx
      on memory_policies (is_enabled, updated_at desc);
  `);
  await db.query(`
    create index if not exists memory_policies_contact_enabled_idx
      on memory_policies (contact_id, is_enabled, updated_at desc)
      where contact_id is not null and contact_id <> '';
  `);
  await db.query(`
    create index if not exists memory_policies_type_enabled_idx
      on memory_policies (memory_type, memory_subtype, is_enabled, updated_at desc)
      where memory_type is not null and memory_type <> '';
  `);
  await db.query(`
    create index if not exists memory_policies_item_enabled_idx
      on memory_policies (memory_item_id, is_enabled, updated_at desc)
      where memory_item_id is not null;
  `);
  await db.query(`
    create index if not exists memory_policies_effective_window_idx
      on memory_policies (effective_from, effective_to)
      where is_enabled = true;
  `);
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
  await ensureBusinessSnapshotTables(pool);
  await ensureMemoryTables(pool);
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

function getInputValue(source = {}, camelKey = "", snakeKey = "") {
  if (Object.prototype.hasOwnProperty.call(source, camelKey)) {
    return source[camelKey];
  }
  if (snakeKey && Object.prototype.hasOwnProperty.call(source, snakeKey)) {
    return source[snakeKey];
  }
  return undefined;
}

function normalizeMemoryUuid(value = "") {
  const text = String(value || "").trim();
  return UUID_PATTERN.test(text) ? text : "";
}

function normalizeOptionalText(value = "") {
  const text = String(value || "").trim();
  return text || null;
}

function normalizeRequiredText(value = "") {
  return String(value || "").trim();
}

function normalizeMemoryScopeType(value = "") {
  const normalized = String(value || "").trim().toLowerCase();
  return MEMORY_SCOPE_TYPES.has(normalized) ? normalized : "contact";
}

function normalizeMemoryStatus(value = "", fallback = "active") {
  const normalized = String(value || "").trim().toLowerCase();
  if (MEMORY_STATUSES.has(normalized)) {
    return normalized;
  }
  return MEMORY_STATUSES.has(fallback) ? fallback : "active";
}

function normalizeMemoryEventType(value = "", fallback = "created") {
  const normalized = String(value || "").trim().toLowerCase();
  if (MEMORY_EVENT_TYPES.has(normalized)) {
    return normalized;
  }
  return MEMORY_EVENT_TYPES.has(fallback) ? fallback : "created";
}

function normalizeMemoryType(value = "", fallback = "fact") {
  const normalized = String(value || "").trim().toLowerCase();
  if (normalized === "core") {
    return "relationship";
  }
  if (normalized === "scene") {
    return "scene";
  }
  return normalized || fallback;
}

function normalizeMemoryExtractionAction(value = "", fallback = "create") {
  const normalized = String(value || "").trim().toLowerCase();
  if (MEMORY_EXTRACTION_ACTIONS.has(normalized)) {
    return normalized;
  }
  return MEMORY_EXTRACTION_ACTIONS.has(fallback) ? fallback : "create";
}

function normalizeJsonObjectValue(value, fallback = {}) {
  return value && typeof value === "object" && !Array.isArray(value) ? value : fallback;
}

function normalizeJsonArrayValue(value, fallback = []) {
  if (Array.isArray(value)) {
    return value;
  }
  if (typeof value === "string") {
    return normalizeTextArray(value);
  }
  return fallback;
}

function normalizeFiniteNumber(value, fallback = 0) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : fallback;
}

function clampIntegerValue(value, min = 0, max = 100, fallback = 0) {
  const numeric = Math.round(normalizeFiniteNumber(value, fallback));
  return Math.min(max, Math.max(min, numeric));
}

function normalizeConfidenceValue(value, fallback = 0.7) {
  const numeric = normalizeFiniteNumber(value, fallback);
  const normalized = numeric > 1 ? numeric / 100 : numeric;
  return Math.min(1, Math.max(0, normalized));
}

function normalizeScoreMap(value, fallback = {}) {
  const source = normalizeJsonObjectValue(value, {});
  const next = {};
  Object.entries(source).forEach(([key, rawValue]) => {
    const normalizedKey = String(key || "").trim();
    if (!normalizedKey) {
      return;
    }
    next[normalizedKey] = normalizeConfidenceValue(rawValue, 0);
  });
  return Object.keys(next).length ? next : fallback;
}

function normalizeScoreNumber(value, fallback = 0) {
  const numeric = normalizeFiniteNumber(value, fallback);
  const normalized = numeric > 1 ? numeric / 100 : numeric;
  return Math.min(1, Math.max(0, normalized));
}

function normalizePositiveIntegerValue(value, fallback = 0) {
  const numeric = Math.floor(normalizeFiniteNumber(value, fallback));
  return numeric >= 0 ? numeric : fallback;
}

function normalizeTimestampValue(value, fallback = null) {
  if (value == null || value === "") {
    return fallback;
  }
  const numeric = Number(value);
  const date = Number.isFinite(numeric) && numeric > 0 ? new Date(numeric) : new Date(value);
  if (Number.isNaN(date.getTime())) {
    return fallback;
  }
  return date.toISOString();
}

function hashMemoryText(value = "") {
  const text = String(value || "");
  let hash = 0;
  for (let index = 0; index < text.length; index += 1) {
    hash = (hash * 31 + text.charCodeAt(index)) >>> 0;
  }
  return hash.toString(36);
}

function canonicalizeMemoryCompareText(value = "") {
  return String(value || "")
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[，。！？、,.!?；;:“”"'（）()【】\[\]《》<>—\-]/g, "");
}

function memoryTextsLookSimilar(left = "", right = "") {
  const leftText = canonicalizeMemoryCompareText(left);
  const rightText = canonicalizeMemoryCompareText(right);
  if (!leftText || !rightText) {
    return false;
  }
  if (leftText === rightText) {
    return true;
  }
  const shorter = leftText.length <= rightText.length ? leftText : rightText;
  const longer = shorter === leftText ? rightText : leftText;
  return shorter.length >= 8 && longer.includes(shorter);
}

function choosePreferredMemoryText(current = "", incoming = "") {
  const currentText = String(current || "").trim();
  const incomingText = String(incoming || "").trim();
  if (!incomingText) {
    return currentText;
  }
  if (!currentText) {
    return incomingText;
  }
  if (!memoryTextsLookSimilar(currentText, incomingText)) {
    return currentText;
  }
  return currentText.length >= incomingText.length ? currentText : incomingText;
}

function mergeUniqueJsonArray(existing = [], incoming = []) {
  const seen = new Set();
  const merged = [];
  [...normalizeJsonArrayValue(existing, []), ...normalizeJsonArrayValue(incoming, [])].forEach((item) => {
    const key =
      item && typeof item === "object"
        ? JSON.stringify(item)
        : String(item || "").trim();
    if (!key || seen.has(key)) {
      return;
    }
    seen.add(key);
    merged.push(item && typeof item === "string" ? key : item);
  });
  return merged;
}

function mergeScoreMapsMax(existing = {}, incoming = {}) {
  const current = normalizeScoreMap(existing, {});
  const next = normalizeScoreMap(incoming, {});
  const merged = { ...current };
  Object.entries(next).forEach(([key, value]) => {
    merged[key] = Math.max(normalizeConfidenceValue(merged[key], 0), normalizeConfidenceValue(value, 0));
  });
  return merged;
}

function normalizeMemoryCandidateInput(input = {}, fallback = {}) {
  const source = input && typeof input === "object" ? input : {};
  const fallbackItem = fallback && typeof fallback === "object" ? fallback : {};
  const action = normalizeMemoryExtractionAction(
    getInputValue(source, "action", "action") ?? fallbackItem.action,
    fallbackItem.action || "create"
  );
  const memoryType = normalizeMemoryType(
    getInputValue(source, "memoryType", "memory_type") ??
      getInputValue(source, "type", "kind") ??
      fallbackItem.memoryType,
    fallbackItem.memoryType || "fact"
  );
  const canonicalText = normalizeRequiredText(
    getInputValue(source, "canonicalText", "canonical_text") ??
      source.content ??
      source.text ??
      source.memory ??
      source.summary ??
      fallbackItem.canonicalText
  );
  const summaryShort =
    normalizeRequiredText(
      getInputValue(source, "summaryShort", "summary_short") ?? fallbackItem.summaryShort
    ) || canonicalText;
  const summaryFaint = normalizeRequiredText(
    getInputValue(source, "summaryFaint", "summary_faint") ?? fallbackItem.summaryFaint
  );
  const semanticKey = normalizeRequiredText(
    getInputValue(source, "semanticKey", "semantic_key") ?? fallbackItem.semanticKey
  );
  const baseImportance = clampIntegerValue(
    getInputValue(source, "baseImportance", "base_importance") ??
      source.importance ??
      source.score ??
      source.weight ??
      fallbackItem.baseImportance,
    0,
    100,
    fallbackItem.baseImportance ?? 50
  );
  const confidence = normalizeConfidenceValue(
    getInputValue(source, "confidence", "confidence") ??
      source.confidenceScore ??
      source.confidence_score ??
      fallbackItem.confidence,
    fallbackItem.confidence ?? 0.7
  );
  const targetMemoryRef = normalizeOptionalText(
    getInputValue(source, "targetMemoryRef", "target_memory_ref") ??
      source.targetMemoryId ??
      source.target_memory_id ??
      fallbackItem.targetMemoryRef
  );
  return {
    action,
    memoryType,
    memorySubtype: normalizeOptionalText(
      getInputValue(source, "memorySubtype", "memory_subtype") ?? fallbackItem.memorySubtype
    ),
    semanticKey,
    canonicalText,
    summaryShort,
    summaryFaint,
    baseImportance,
    confidence,
    keywords: normalizeJsonArrayValue(getInputValue(source, "keywords", "keywords"), fallbackItem.keywords || []),
    entityRefs: normalizeJsonArrayValue(
      getInputValue(source, "entityRefs", "entity_refs"),
      fallbackItem.entityRefs || []
    ),
    emotionIntensity:
      getInputValue(source, "emotionIntensity", "emotion_intensity") == null
        ? fallbackItem.emotionIntensity ?? null
        : normalizeConfidenceValue(getInputValue(source, "emotionIntensity", "emotion_intensity"), 0),
    emotionProfile: normalizeScoreMap(
      getInputValue(source, "emotionProfile", "emotion_profile"),
      fallbackItem.emotionProfile || {}
    ),
    interactionTendency: normalizeScoreMap(
      getInputValue(source, "interactionTendency", "interaction_tendency"),
      fallbackItem.interactionTendency || {}
    ),
    emotionSummary: normalizeRequiredText(
      getInputValue(source, "emotionSummary", "emotion_summary") ?? fallbackItem.emotionSummary
    ),
    sourceExcerpt: normalizeOptionalText(
      getInputValue(source, "sourceExcerpt", "source_excerpt") ?? fallbackItem.sourceExcerpt
    ),
    targetMemoryRef,
    reasonNote: normalizeOptionalText(
      getInputValue(source, "reasonNote", "reason_note") ?? fallbackItem.reasonNote
    ),
    metadata: normalizeJsonObjectValue(getInputValue(source, "metadata", "metadata"), {})
  };
}

function normalizeMemoryMergeBatchInput(payload = {}) {
  const source = payload && typeof payload === "object" ? payload : {};
  const contactId = normalizeRequiredText(
    getInputValue(source, "contactId", "contact_id") ?? source.contact
  );
  const rawItems = Array.isArray(source.items)
    ? source.items
    : Array.isArray(source.memories)
      ? source.memories
      : Array.isArray(source)
        ? source
        : [];
  return {
    batchRef:
      normalizeRequiredText(getInputValue(source, "batchRef", "batch_ref")) || randomUUID(),
    contactId,
    sourceRef: normalizeJsonObjectValue(getInputValue(source, "sourceRef", "source_ref"), {}),
    items: rawItems
      .map((item) => normalizeMemoryCandidateInput(item))
      .filter((item) =>
        item.action === "ignore"
          ? Boolean(item.reasonNote)
          : Boolean(contactId && (item.canonicalText || item.targetMemoryRef || item.semanticKey))
      )
      .slice(0, 8)
  };
}

function mapMemoryItemRow(row = {}) {
  return {
    id: String(row.id || "").trim(),
    contactId: String(row.contact_id || "").trim(),
    scopeType: normalizeMemoryScopeType(row.scope_type),
    sourceConversationId: row.source_conversation_id || "",
    memoryType: String(row.memory_type || "").trim(),
    memorySubtype: row.memory_subtype || "",
    semanticKey: row.semantic_key || "",
    canonicalText: String(row.canonical_text || "").trim(),
    summaryShort: String(row.summary_short || "").trim(),
    summaryFaint: String(row.summary_faint || "").trim(),
    keywords: Array.isArray(row.keywords) ? row.keywords : [],
    entityRefs: Array.isArray(row.entity_refs) ? row.entity_refs : [],
    baseImportance: normalizeFiniteNumber(row.base_importance, 0),
    confidence: normalizeFiniteNumber(row.confidence, 0),
    status: normalizeMemoryStatus(row.status),
    statusChangedAt: row.status_changed_at || null,
    firstObservedAt: row.first_observed_at || null,
    lastObservedAt: row.last_observed_at || null,
    lastReinforcedAt: row.last_reinforced_at || null,
    lastRecalledAt: row.last_recalled_at || null,
    reinforceCount: normalizePositiveIntegerValue(row.reinforce_count, 0),
    recallCount: normalizePositiveIntegerValue(row.recall_count, 0),
    emotionIntensity:
      row.emotion_intensity == null ? null : normalizeFiniteNumber(row.emotion_intensity, 0),
    emotionProfile: normalizeJsonObjectValue(row.emotion_profile, {}),
    interactionTendency: normalizeJsonObjectValue(row.interaction_tendency, {}),
    emotionSummary: String(row.emotion_summary || "").trim(),
    arousalLevel: row.arousal_level == null ? null : normalizeFiniteNumber(row.arousal_level, 0),
    archivedAt: row.archived_at || null,
    supersededBy: row.superseded_by || null,
    metadata: normalizeJsonObjectValue(row.metadata, {}),
    createdAt: row.created_at || null,
    updatedAt: row.updated_at || null
  };
}

function mapMemoryRuntimeStateRow(row = {}) {
  if (!row || typeof row !== "object" || !row.memory_item_id) {
    return null;
  }
  return {
    memoryItemId: String(row.memory_item_id || "").trim(),
    activationScore: normalizeFiniteNumber(row.activation_score, 0),
    stabilityScore: normalizeFiniteNumber(row.stability_score, 0),
    impressionFloor: normalizeFiniteNumber(row.impression_floor, 0),
    decayRate: normalizeFiniteNumber(row.decay_rate, 0),
    cueRecallThreshold: normalizeFiniteNumber(row.cue_recall_threshold, 0),
    lastComputedAt: row.last_computed_at || null,
    lastDecayAt: row.last_decay_at || null,
    nextDecayAt: row.next_decay_at || null,
    lastRecalledScore:
      row.last_recalled_score == null ? null : normalizeFiniteNumber(row.last_recalled_score, 0),
    algorithmVersion: String(row.algorithm_version || "v1").trim() || "v1",
    debugPayload: normalizeJsonObjectValue(row.debug_payload, {}),
    createdAt: row.created_at || null,
    updatedAt: row.updated_at || null
  };
}

function mapMemoryEventRow(row = {}) {
  return {
    id: String(row.id || "").trim(),
    memoryItemId: String(row.memory_item_id || "").trim(),
    contactId: String(row.contact_id || "").trim(),
    eventType: normalizeMemoryEventType(row.event_type),
    eventTime: row.event_time || null,
    actorType: String(row.actor_type || "").trim(),
    actorRef: row.actor_ref || "",
    sourceKind: row.source_kind || "",
    sourceRef: normalizeJsonObjectValue(row.source_ref, {}),
    reasonCode: row.reason_code || "",
    deltaPayload: normalizeJsonObjectValue(row.delta_payload, {}),
    beforeSnapshot: normalizeJsonObjectValue(row.before_snapshot, null),
    afterSnapshot: normalizeJsonObjectValue(row.after_snapshot, null),
    batchId: row.batch_id || "",
    note: row.note || "",
    metadata: normalizeJsonObjectValue(row.metadata, {}),
    createdAt: row.created_at || null
  };
}

function createMemorySnapshot(row = {}) {
  const item = mapMemoryItemRow(row);
  return {
    canonicalText: item.canonicalText,
    summaryShort: item.summaryShort,
    summaryFaint: item.summaryFaint,
    status: item.status,
    baseImportance: item.baseImportance,
    confidence: item.confidence,
    emotionIntensity: item.emotionIntensity,
    emotionProfile: item.emotionProfile,
    interactionTendency: item.interactionTendency,
    emotionSummary: item.emotionSummary,
    firstObservedAt: item.firstObservedAt,
    lastObservedAt: item.lastObservedAt,
    lastReinforcedAt: item.lastReinforcedAt,
    lastRecalledAt: item.lastRecalledAt
  };
}

function normalizeMemoryItemInput(input = {}, fallback = {}) {
  const source = input && typeof input === "object" ? input : {};
  const fallbackItem = fallback && typeof fallback === "object" ? fallback : {};
  const contactId = normalizeRequiredText(
    getInputValue(source, "contactId", "contact_id") ?? fallbackItem.contactId
  );
  const canonicalText = normalizeRequiredText(
    getInputValue(source, "canonicalText", "canonical_text") ??
      source.content ??
      source.text ??
      fallbackItem.canonicalText
  );
  const memoryType = normalizeMemoryType(
    getInputValue(source, "memoryType", "memory_type") ?? source.type ?? fallbackItem.memoryType
  );
  const summaryShort =
    normalizeRequiredText(
      getInputValue(source, "summaryShort", "summary_short") ?? fallbackItem.summaryShort
    ) || canonicalText;
  const summaryFaint = normalizeRequiredText(
    getInputValue(source, "summaryFaint", "summary_faint") ?? fallbackItem.summaryFaint
  );
  const status = normalizeMemoryStatus(
    getInputValue(source, "status", "status") ?? fallbackItem.status,
    fallbackItem.status || "active"
  );
  const legacyId = normalizeRequiredText(source.id || source.legacyId || source.legacy_id);
  const semanticKey = normalizeRequiredText(
    getInputValue(source, "semanticKey", "semantic_key") ??
      fallbackItem.semanticKey ??
      (legacyId ? `legacy:${legacyId}` : "")
  );
  const generatedSemanticKey =
    semanticKey || `auto:${hashMemoryText(`${contactId}|${memoryType}|${canonicalText}`)}`;
  const baseImportance = normalizeFiniteNumber(
    getInputValue(source, "baseImportance", "base_importance") ??
      source.importance ??
      fallbackItem.baseImportance,
    fallbackItem.baseImportance ?? 50
  );
  const confidence = normalizeFiniteNumber(
    getInputValue(source, "confidence", "confidence") ?? fallbackItem.confidence,
    fallbackItem.confidence ?? 0.7
  );
  const firstObservedAt =
    normalizeTimestampValue(
      getInputValue(source, "firstObservedAt", "first_observed_at") ??
        source.createdAt ??
        fallbackItem.firstObservedAt
    ) || new Date().toISOString();
  const lastObservedAt =
    normalizeTimestampValue(
      getInputValue(source, "lastObservedAt", "last_observed_at") ??
        source.updatedAt ??
        fallbackItem.lastObservedAt
    ) || firstObservedAt;

  return {
    id: normalizeMemoryUuid(source.id) || normalizeMemoryUuid(fallbackItem.id) || randomUUID(),
    contactId,
    scopeType: normalizeMemoryScopeType(
      getInputValue(source, "scopeType", "scope_type") ?? fallbackItem.scopeType
    ),
    sourceConversationId: normalizeOptionalText(
      getInputValue(source, "sourceConversationId", "source_conversation_id") ??
        source.conversationId ??
        fallbackItem.sourceConversationId
    ),
    memoryType,
    memorySubtype: normalizeOptionalText(
      getInputValue(source, "memorySubtype", "memory_subtype") ?? fallbackItem.memorySubtype
    ),
    semanticKey: generatedSemanticKey,
    canonicalText,
    summaryShort,
    summaryFaint,
    keywords: normalizeJsonArrayValue(getInputValue(source, "keywords", "keywords"), fallbackItem.keywords || []),
    entityRefs: normalizeJsonArrayValue(
      getInputValue(source, "entityRefs", "entity_refs"),
      fallbackItem.entityRefs || []
    ),
    baseImportance,
    confidence,
    status,
    firstObservedAt,
    lastObservedAt,
    lastReinforcedAt: normalizeTimestampValue(
      getInputValue(source, "lastReinforcedAt", "last_reinforced_at") ??
        fallbackItem.lastReinforcedAt
    ),
    lastRecalledAt: normalizeTimestampValue(
      getInputValue(source, "lastRecalledAt", "last_recalled_at") ?? fallbackItem.lastRecalledAt
    ),
    reinforceCount: normalizePositiveIntegerValue(
      getInputValue(source, "reinforceCount", "reinforce_count") ?? fallbackItem.reinforceCount,
      fallbackItem.reinforceCount || 0
    ),
    recallCount: normalizePositiveIntegerValue(
      getInputValue(source, "recallCount", "recall_count") ?? fallbackItem.recallCount,
      fallbackItem.recallCount || 0
    ),
    emotionIntensity:
      getInputValue(source, "emotionIntensity", "emotion_intensity") == null
        ? fallbackItem.emotionIntensity ?? null
        : normalizeFiniteNumber(getInputValue(source, "emotionIntensity", "emotion_intensity"), 0),
    emotionProfile: normalizeJsonObjectValue(
      getInputValue(source, "emotionProfile", "emotion_profile"),
      fallbackItem.emotionProfile || {}
    ),
    interactionTendency: normalizeJsonObjectValue(
      getInputValue(source, "interactionTendency", "interaction_tendency"),
      fallbackItem.interactionTendency || {}
    ),
    emotionSummary: normalizeRequiredText(
      getInputValue(source, "emotionSummary", "emotion_summary") ?? fallbackItem.emotionSummary
    ),
    arousalLevel:
      getInputValue(source, "arousalLevel", "arousal_level") == null
        ? fallbackItem.arousalLevel ?? null
        : normalizeFiniteNumber(getInputValue(source, "arousalLevel", "arousal_level"), 0),
    archivedAt: normalizeTimestampValue(
      getInputValue(source, "archivedAt", "archived_at") ?? fallbackItem.archivedAt
    ),
    supersededBy: normalizeMemoryUuid(
      getInputValue(source, "supersededBy", "superseded_by") ?? fallbackItem.supersededBy
    ),
    metadata: {
      ...normalizeJsonObjectValue(fallbackItem.metadata, {}),
      ...normalizeJsonObjectValue(getInputValue(source, "metadata", "metadata"), {}),
      ...(legacyId && !UUID_PATTERN.test(legacyId) ? { legacyId } : {})
    }
  };
}

function buildInitialMemoryRuntimeState(item = {}) {
  const importanceScore = normalizeScoreNumber(item.baseImportance, 0.5);
  const confidenceScore = normalizeScoreNumber(item.confidence, 0.7);
  const emotionScore = normalizeScoreNumber(item.emotionIntensity ?? 0, 0);
  const activationScore = Math.min(
    1,
    Math.max(0.05, importanceScore * 0.55 + confidenceScore * 0.25 + emotionScore * 0.2)
  );
  const stabilityScore = Math.min(
    1,
    Math.max(0.05, importanceScore * 0.4 + confidenceScore * 0.35 + emotionScore * 0.25)
  );
  return {
    activationScore,
    stabilityScore,
    impressionFloor: item.status === "faint" ? 0.2 : Math.min(0.25, importanceScore * 0.25),
    decayRate: Math.max(0.01, 0.18 - stabilityScore * 0.1),
    cueRecallThreshold: item.status === "dormant" ? 0.7 : 0.55,
    algorithmVersion: "v1"
  };
}

async function insertMemoryEvent(db, options = {}) {
  const eventType = normalizeMemoryEventType(options.eventType || options.event_type);
  const result = await db.query(
    `
      insert into memory_events (
        id,
        memory_item_id,
        contact_id,
        event_type,
        event_time,
        actor_type,
        actor_ref,
        source_kind,
        source_ref,
        reason_code,
        delta_payload,
        before_snapshot,
        after_snapshot,
        batch_id,
        note,
        metadata,
        created_at
      )
      values (
        $1,
        $2,
        $3,
        $4,
        coalesce($5::timestamptz, now()),
        $6,
        $7,
        $8,
        $9::jsonb,
        $10,
        $11::jsonb,
        $12::jsonb,
        $13::jsonb,
        $14,
        $15,
        $16::jsonb,
        now()
      )
      returning *
    `,
    [
      normalizeMemoryUuid(options.id) || randomUUID(),
      options.memoryItemId || options.memory_item_id,
      String(options.contactId || options.contact_id || "").trim(),
      eventType,
      normalizeTimestampValue(options.eventTime || options.event_time),
      String(options.actorType || options.actor_type || "node_backend").trim() || "node_backend",
      normalizeOptionalText(options.actorRef || options.actor_ref),
      normalizeOptionalText(options.sourceKind || options.source_kind),
      JSON.stringify(normalizeJsonObjectValue(options.sourceRef || options.source_ref, {})),
      normalizeOptionalText(options.reasonCode || options.reason_code),
      JSON.stringify(normalizeJsonObjectValue(options.deltaPayload || options.delta_payload, {})),
      options.beforeSnapshot || options.before_snapshot
        ? JSON.stringify(normalizeJsonObjectValue(options.beforeSnapshot || options.before_snapshot, {}))
        : null,
      options.afterSnapshot || options.after_snapshot
        ? JSON.stringify(normalizeJsonObjectValue(options.afterSnapshot || options.after_snapshot, {}))
        : null,
      normalizeOptionalText(options.batchId || options.batch_id),
      normalizeOptionalText(options.note),
      JSON.stringify(normalizeJsonObjectValue(options.metadata, {}))
    ]
  );
  return mapMemoryEventRow(result.rows[0]);
}

async function createMemoryItemInDb(db, rawItem = {}, options = {}) {
  const item = normalizeMemoryItemInput(rawItem);
  if (!item.contactId) {
    throw new Error("contactId is required.");
  }
  if (!item.canonicalText) {
    throw new Error("canonicalText is required.");
  }
  const runtime = {
    ...buildInitialMemoryRuntimeState(item),
    ...normalizeJsonObjectValue(options.runtimeState, {})
  };
  const itemResult = await db.query(
    `
      insert into memory_items (
        id,
        contact_id,
        scope_type,
        source_conversation_id,
        memory_type,
        memory_subtype,
        semantic_key,
        canonical_text,
        summary_short,
        summary_faint,
        keywords,
        entity_refs,
        base_importance,
        confidence,
        status,
        status_changed_at,
        first_observed_at,
        last_observed_at,
        last_reinforced_at,
        last_recalled_at,
        reinforce_count,
        recall_count,
        emotion_intensity,
        emotion_profile,
        interaction_tendency,
        emotion_summary,
        arousal_level,
        archived_at,
        superseded_by,
        metadata,
        created_at,
        updated_at
      )
      values (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7,
        $8,
        $9,
        $10,
        $11::jsonb,
        $12::jsonb,
        $13,
        $14,
        $15,
        now(),
        $16,
        $17,
        $18,
        $19,
        $20,
        $21,
        $22,
        $23::jsonb,
        $24::jsonb,
        $25,
        $26,
        $27,
        $28,
        $29::jsonb,
        now(),
        now()
      )
      returning *
    `,
    [
      item.id,
      item.contactId,
      item.scopeType,
      item.sourceConversationId,
      item.memoryType,
      item.memorySubtype,
      item.semanticKey,
      item.canonicalText,
      item.summaryShort,
      item.summaryFaint,
      JSON.stringify(item.keywords),
      JSON.stringify(item.entityRefs),
      item.baseImportance,
      item.confidence,
      item.status,
      item.firstObservedAt,
      item.lastObservedAt,
      item.lastReinforcedAt,
      item.lastRecalledAt,
      item.reinforceCount,
      item.recallCount,
      item.emotionIntensity,
      JSON.stringify(item.emotionProfile),
      JSON.stringify(item.interactionTendency),
      item.emotionSummary,
      item.arousalLevel,
      item.archivedAt,
      item.supersededBy || null,
      JSON.stringify(item.metadata)
    ]
  );
  const savedItem = itemResult.rows[0];
  const runtimeResult = await db.query(
    `
      insert into memory_runtime_state (
        memory_item_id,
        activation_score,
        stability_score,
        impression_floor,
        decay_rate,
        cue_recall_threshold,
        last_computed_at,
        algorithm_version,
        debug_payload,
        created_at,
        updated_at
      )
      values ($1, $2, $3, $4, $5, $6, now(), $7, $8::jsonb, now(), now())
      returning *
    `,
    [
      savedItem.id,
      normalizeFiniteNumber(runtime.activationScore ?? runtime.activation_score, 0),
      normalizeFiniteNumber(runtime.stabilityScore ?? runtime.stability_score, 0),
      normalizeFiniteNumber(runtime.impressionFloor ?? runtime.impression_floor, 0),
      normalizeFiniteNumber(runtime.decayRate ?? runtime.decay_rate, 0),
      normalizeFiniteNumber(runtime.cueRecallThreshold ?? runtime.cue_recall_threshold, 0),
      String(runtime.algorithmVersion || runtime.algorithm_version || "v1").trim() || "v1",
      JSON.stringify(normalizeJsonObjectValue(runtime.debugPayload || runtime.debug_payload, {}))
    ]
  );
  const event = await insertMemoryEvent(db, {
    memoryItemId: savedItem.id,
    contactId: savedItem.contact_id,
    eventType: options.eventType || "created",
    actorType: options.actorType || "node_backend",
    actorRef: options.actorRef,
    sourceKind: options.sourceKind || "api",
    sourceRef: options.sourceRef,
    reasonCode: options.reasonCode,
    deltaPayload: options.deltaPayload || { status: savedItem.status },
    afterSnapshot: createMemorySnapshot(savedItem),
    batchId: options.batchId,
    note: options.note
  });

  return {
    item: mapMemoryItemRow(savedItem),
    runtimeState: mapMemoryRuntimeStateRow(runtimeResult.rows[0]),
    event
  };
}

async function findMemoryItemRowById(db, id = "", contactId = "") {
  const normalizedId = normalizeMemoryUuid(id);
  const resolvedContactId = normalizeRequiredText(contactId);
  if (!normalizedId) {
    return null;
  }
  const result = await db.query(
    `
      select *
      from memory_items
      where id = $1
        and ($2 = '' or contact_id = $2)
      limit 1
    `,
    [normalizedId, resolvedContactId]
  );
  return result.rows[0] || null;
}

async function resolveMemoryMergeTargetRow(db, batch = {}, candidate = {}) {
  const contactId = normalizeRequiredText(batch.contactId);
  if (!contactId) {
    return null;
  }
  const directTarget = await findMemoryItemRowById(db, candidate.targetMemoryRef, contactId);
  if (directTarget) {
    return directTarget;
  }
  const semanticKey = normalizeRequiredText(candidate.semanticKey);
  if (semanticKey) {
    const semanticResult = await db.query(
      `
        select *
        from memory_items
        where contact_id = $1
          and semantic_key = $2
        order by updated_at desc
        limit 1
      `,
      [contactId, semanticKey]
    );
    if (semanticResult.rows.length) {
      return semanticResult.rows[0];
    }
  }
  const candidateText = normalizeRequiredText(
    candidate.canonicalText || candidate.summaryShort || candidate.summaryFaint
  );
  if (!candidateText) {
    return null;
  }
  const searchResult = await db.query(
    `
      select *
      from memory_items
      where contact_id = $1
        and status <> 'superseded'
      order by updated_at desc
      limit 120
    `,
    [contactId]
  );
  const preferredType = normalizeMemoryType(candidate.memoryType || "fact");
  const typedRows = searchResult.rows.filter(
    (row) => normalizeMemoryType(row.memory_type || "fact") === preferredType
  );
  const rowsToCheck = typedRows.length ? typedRows : searchResult.rows;
  return (
    rowsToCheck.find((row) =>
      memoryTextsLookSimilar(
        candidateText,
        row.canonical_text || row.summary_short || row.summary_faint || ""
      )
    ) || null
  );
}

function buildMemoryItemPayloadFromCandidate(candidate = {}, fallbackItem = {}, options = {}) {
  const requestOptions = options && typeof options === "object" ? options : {};
  const sourceRef = normalizeJsonObjectValue(requestOptions.sourceRef, {});
  const observedAt =
    normalizeTimestampValue(
      sourceRef.lastMessageAt || sourceRef.last_message_at || sourceRef.observedAt || sourceRef.observed_at
    ) || new Date().toISOString();
  const fallbackMetadata = normalizeJsonObjectValue(fallbackItem.metadata, {});
  return {
    contactId: fallbackItem.contactId || requestOptions.contactId || "",
    scopeType: fallbackItem.scopeType || "contact",
    sourceConversationId:
      fallbackItem.sourceConversationId ||
      normalizeOptionalText(sourceRef.conversationId || sourceRef.conversation_id),
    memoryType: candidate.memoryType || fallbackItem.memoryType || "fact",
    memorySubtype: candidate.memorySubtype || fallbackItem.memorySubtype || "",
    semanticKey: candidate.semanticKey || fallbackItem.semanticKey || "",
    canonicalText:
      candidate.canonicalText ||
      candidate.summaryShort ||
      fallbackItem.canonicalText ||
      fallbackItem.summaryShort ||
      "",
    summaryShort:
      candidate.summaryShort ||
      candidate.canonicalText ||
      fallbackItem.summaryShort ||
      fallbackItem.canonicalText ||
      "",
    summaryFaint: candidate.summaryFaint || fallbackItem.summaryFaint || "",
    keywords: mergeUniqueJsonArray(fallbackItem.keywords || [], candidate.keywords || []),
    entityRefs: mergeUniqueJsonArray(fallbackItem.entityRefs || [], candidate.entityRefs || []),
    baseImportance: Math.max(
      clampIntegerValue(fallbackItem.baseImportance, 0, 100, 0),
      clampIntegerValue(candidate.baseImportance, 0, 100, 0)
    ),
    confidence: Math.max(
      normalizeConfidenceValue(fallbackItem.confidence, 0),
      normalizeConfidenceValue(candidate.confidence, 0)
    ),
    firstObservedAt: fallbackItem.firstObservedAt || observedAt,
    lastObservedAt: observedAt,
    emotionIntensity:
      fallbackItem.emotionIntensity == null && candidate.emotionIntensity == null
        ? null
        : Math.max(
            normalizeConfidenceValue(fallbackItem.emotionIntensity, 0),
            normalizeConfidenceValue(candidate.emotionIntensity, 0)
          ),
    emotionProfile: mergeScoreMapsMax(fallbackItem.emotionProfile || {}, candidate.emotionProfile || {}),
    interactionTendency: mergeScoreMapsMax(
      fallbackItem.interactionTendency || {},
      candidate.interactionTendency || {}
    ),
    emotionSummary: candidate.emotionSummary || fallbackItem.emotionSummary || "",
    metadata: {
      ...fallbackMetadata,
      ...normalizeJsonObjectValue(candidate.metadata, {}),
      lastMergeAction: candidate.action || "",
      ...(candidate.reasonNote ? { lastReasonNote: candidate.reasonNote } : {}),
      ...(candidate.sourceExcerpt ? { lastSourceExcerpt: candidate.sourceExcerpt } : {}),
      ...(requestOptions.batchRef ? { lastMergeBatchRef: requestOptions.batchRef } : {})
    }
  };
}

async function reinforceMemoryItemInDb(db, existingRow = {}, candidate = {}, options = {}) {
  const existingItem = mapMemoryItemRow(existingRow);
  const requestOptions = options && typeof options === "object" ? options : {};
  const batchRef = normalizeOptionalText(requestOptions.batchRef);
  const sourceRef = normalizeJsonObjectValue(requestOptions.sourceRef, {});
  const actorType = requestOptions.actorType || "node_backend";
  const actorRef = requestOptions.actorRef;
  const sourceKind = requestOptions.sourceKind || "memory_extract";
  const reasonCode = requestOptions.reasonCode || "memory_extract_reinforce";
  const observedAt =
    normalizeTimestampValue(
      sourceRef.lastMessageAt || sourceRef.last_message_at || sourceRef.observedAt || sourceRef.observed_at
    ) || new Date().toISOString();
  const nextStatus = existingItem.status === "superseded" ? existingItem.status : "active";
  const nextPayload = buildMemoryItemPayloadFromCandidate(candidate, existingItem, requestOptions);
  const updateResult = await db.query(
    `
      update memory_items
      set canonical_text = $2,
          summary_short = $3,
          summary_faint = $4,
          keywords = $5::jsonb,
          entity_refs = $6::jsonb,
          base_importance = $7,
          confidence = $8,
          status = $9,
          status_changed_at = case when status <> $9 then now() else status_changed_at end,
          last_observed_at = $10,
          last_reinforced_at = now(),
          reinforce_count = reinforce_count + 1,
          emotion_intensity = $11,
          emotion_profile = $12::jsonb,
          interaction_tendency = $13::jsonb,
          emotion_summary = $14,
          metadata = $15::jsonb,
          updated_at = now()
      where id = $1
      returning *
    `,
    [
      existingItem.id,
      choosePreferredMemoryText(existingItem.canonicalText, nextPayload.canonicalText),
      choosePreferredMemoryText(existingItem.summaryShort || existingItem.canonicalText, nextPayload.summaryShort),
      nextPayload.summaryFaint || existingItem.summaryFaint || "",
      JSON.stringify(nextPayload.keywords),
      JSON.stringify(nextPayload.entityRefs),
      nextPayload.baseImportance,
      nextPayload.confidence,
      nextStatus,
      observedAt,
      nextPayload.emotionIntensity,
      JSON.stringify(nextPayload.emotionProfile),
      JSON.stringify(nextPayload.interactionTendency),
      nextPayload.emotionSummary,
      JSON.stringify(nextPayload.metadata)
    ]
  );
  const updatedRow = updateResult.rows[0];
  const runtimeResult = await db.query(
    `
      update memory_runtime_state
      set activation_score = least(1, activation_score + $2),
          stability_score = least(1, stability_score + $3),
          updated_at = now()
      where memory_item_id = $1
      returning *
    `,
    [
      existingItem.id,
      normalizeFiniteNumber(requestOptions.activationBoost, 0.12),
      normalizeFiniteNumber(requestOptions.stabilityBoost, 0.04)
    ]
  );
  const events = [];
  events.push(
    await insertMemoryEvent(db, {
      memoryItemId: updatedRow.id,
      contactId: updatedRow.contact_id,
      eventType: "observed",
      actorType,
      actorRef,
      sourceKind,
      sourceRef,
      reasonCode,
      deltaPayload: {
        candidateAction: candidate.action,
        sourceExcerpt: candidate.sourceExcerpt || "",
        targetMemoryRef: candidate.targetMemoryRef || existingItem.id
      },
      batchId: batchRef,
      note: candidate.reasonNote
    })
  );
  events.push(
    await insertMemoryEvent(db, {
      memoryItemId: updatedRow.id,
      contactId: updatedRow.contact_id,
      eventType: "reinforced",
      actorType,
      actorRef,
      sourceKind,
      sourceRef,
      reasonCode,
      deltaPayload: {
        reinforceCount: {
          from: existingItem.reinforceCount,
          to: existingItem.reinforceCount + 1
        },
        candidateAction: candidate.action
      },
      batchId: batchRef,
      note: candidate.reasonNote
    })
  );
  if (updatedRow.status !== existingRow.status) {
    events.push(
      await insertMemoryEvent(db, {
        memoryItemId: updatedRow.id,
        contactId: updatedRow.contact_id,
        eventType: "status_changed",
        actorType,
        actorRef,
        sourceKind,
        sourceRef,
        reasonCode,
        deltaPayload: {
          status: {
            from: existingRow.status,
            to: updatedRow.status
          }
        },
        batchId: batchRef,
        note: candidate.reasonNote
      })
    );
  }
  return {
    matchedMemoryId: existingItem.id,
    item: mapMemoryItemRow(updatedRow),
    runtimeState: mapMemoryRuntimeStateRow(runtimeResult.rows[0]),
    events
  };
}

async function supersedeMemoryItemInDb(db, existingRow = {}, candidate = {}, options = {}) {
  const existingItem = mapMemoryItemRow(existingRow);
  const requestOptions = options && typeof options === "object" ? options : {};
  const batchRef = normalizeOptionalText(requestOptions.batchRef);
  const sourceRef = normalizeJsonObjectValue(requestOptions.sourceRef, {});
  const actorType = requestOptions.actorType || "node_backend";
  const actorRef = requestOptions.actorRef;
  const sourceKind = requestOptions.sourceKind || "memory_extract";
  const reasonCode = requestOptions.reasonCode || "memory_extract_supersede";
  const payloadItem = buildMemoryItemPayloadFromCandidate(candidate, existingItem, requestOptions);
  const created = await createMemoryItemInDb(
    db,
    {
      ...payloadItem,
      contactId: existingItem.contactId
    },
    {
      eventType: "created",
      actorType,
      actorRef,
      sourceKind,
      sourceRef,
      reasonCode,
      batchId: batchRef,
      note: candidate.reasonNote
    }
  );
  const updateResult = await db.query(
    `
      update memory_items
      set status = 'superseded',
          status_changed_at = now(),
          superseded_by = $2,
          updated_at = now()
      where id = $1
      returning *
    `,
    [existingItem.id, created.item.id]
  );
  const updatedPreviousRow = updateResult.rows[0];
  const events = [];
  events.push(
    await insertMemoryEvent(db, {
      memoryItemId: updatedPreviousRow.id,
      contactId: updatedPreviousRow.contact_id,
      eventType: "superseded",
      actorType,
      actorRef,
      sourceKind,
      sourceRef,
      reasonCode,
      deltaPayload: {
        supersededBy: created.item.id,
        candidateAction: candidate.action
      },
      batchId: batchRef,
      note: candidate.reasonNote
    })
  );
  if (existingRow.status !== "superseded") {
    events.push(
      await insertMemoryEvent(db, {
        memoryItemId: updatedPreviousRow.id,
        contactId: updatedPreviousRow.contact_id,
        eventType: "status_changed",
        actorType,
        actorRef,
        sourceKind,
        sourceRef,
        reasonCode,
        deltaPayload: {
          status: {
            from: existingRow.status,
            to: "superseded"
          }
        },
        batchId: batchRef,
        note: candidate.reasonNote
      })
    );
  }
  return {
    matchedMemoryId: existingItem.id,
    previousItem: mapMemoryItemRow(updatedPreviousRow),
    item: created.item,
    runtimeState: created.runtimeState,
    events: [created.event, ...events]
  };
}

async function applyMemoryMergeCandidateInDb(db, batch = {}, candidate = {}, options = {}) {
  const requestOptions = options && typeof options === "object" ? options : {};
  const resolvedCandidate = normalizeMemoryCandidateInput(candidate);
  if (resolvedCandidate.action === "ignore") {
    return {
      requestedAction: "ignore",
      resolvedAction: "ignore",
      reason: resolvedCandidate.reasonNote || "ignored_by_extractor"
    };
  }
  const targetRow = await resolveMemoryMergeTargetRow(db, batch, resolvedCandidate);
  if (resolvedCandidate.action === "supersede" && targetRow) {
    const result = await supersedeMemoryItemInDb(db, targetRow, resolvedCandidate, requestOptions);
    return {
      requestedAction: resolvedCandidate.action,
      resolvedAction: "supersede",
      ...result
    };
  }
  if ((resolvedCandidate.action === "reinforce" || resolvedCandidate.action === "create") && targetRow) {
    const result = await reinforceMemoryItemInDb(db, targetRow, resolvedCandidate, requestOptions);
    return {
      requestedAction: resolvedCandidate.action,
      resolvedAction: "reinforce",
      ...result
    };
  }
  const createPayload = buildMemoryItemPayloadFromCandidate(resolvedCandidate, {}, requestOptions);
  const created = await createMemoryItemInDb(
    db,
    {
      ...createPayload,
      contactId: batch.contactId
    },
    {
      eventType: "created",
      actorType: requestOptions.actorType || "node_backend",
      actorRef: requestOptions.actorRef,
      sourceKind: requestOptions.sourceKind || "memory_extract",
      sourceRef: requestOptions.sourceRef,
      reasonCode: requestOptions.reasonCode || "memory_extract_create",
      batchId: requestOptions.batchRef,
      note: resolvedCandidate.reasonNote
    }
  );
  return {
    requestedAction: resolvedCandidate.action,
    resolvedAction: "create",
    item: created.item,
    runtimeState: created.runtimeState,
    events: [created.event]
  };
}

async function loadMemoryItemWithRuntime(db, id = "") {
  const result = await db.query(
    `
      select i.*, to_jsonb(r) as runtime_state
      from memory_items i
      left join memory_runtime_state r on r.memory_item_id = i.id
      where i.id = $1
      limit 1
    `,
    [id]
  );
  if (!result.rows.length) {
    return null;
  }
  const row = result.rows[0];
  return {
    item: mapMemoryItemRow(row),
    runtimeState: mapMemoryRuntimeStateRow(row.runtime_state)
  };
}

function normalizeMemoryStatusFilter(value = "") {
  const raw = String(value || "").trim();
  if (!raw) {
    return ["active", "faint", "dormant"];
  }
  if (raw.toLowerCase() === "all") {
    return Array.from(MEMORY_STATUSES);
  }
  const statuses = raw
    .split(",")
    .map((item) => String(item || "").trim().toLowerCase())
    .filter((item) => MEMORY_STATUSES.has(item));
  return statuses.length ? Array.from(new Set(statuses)) : ["active", "faint", "dormant"];
}

function normalizeMemoryImportItems(payload = {}) {
  const source = payload && typeof payload === "object" ? payload : {};
  const contactId = normalizeRequiredText(source.contactId || source.contact_id);
  const rawItems = Array.isArray(source.items)
    ? source.items
    : Array.isArray(source.memories)
      ? source.memories
      : Array.isArray(source)
        ? source
        : [];
  return rawItems
    .map((item, index) => {
      const record = item && typeof item === "object" ? item : {};
      const fallbackContactId = normalizeRequiredText(
        getInputValue(record, "contactId", "contact_id") || contactId
      );
      const canonicalText = normalizeRequiredText(
        getInputValue(record, "canonicalText", "canonical_text") || record.content || record.text
      );
      if (!fallbackContactId || !canonicalText) {
        return null;
      }
      const legacyId = normalizeRequiredText(record.id || `legacy_${index}`);
      const memoryType = normalizeMemoryType(record.type || record.memoryType || record.memory_type);
      const recordMetadata = normalizeJsonObjectValue(record.metadata, {});
      return {
        ...record,
        id: legacyId,
        contactId: fallbackContactId,
        memoryType,
        canonicalText,
        summaryShort: record.summaryShort || record.summary_short || canonicalText,
        summaryFaint: record.summaryFaint || record.summary_faint || "",
        semanticKey:
          record.semanticKey ||
          record.semantic_key ||
          (legacyId && !UUID_PATTERN.test(legacyId)
            ? `legacy:${legacyId}`
            : `legacy:${hashMemoryText(`${fallbackContactId}|${memoryType}|${legacyId}|${canonicalText}`)}`),
        baseImportance: record.baseImportance ?? record.base_importance ?? record.importance ?? 50,
        confidence: record.confidence ?? 0.7,
        firstObservedAt: record.firstObservedAt || record.first_observed_at || record.createdAt,
        lastObservedAt: record.lastObservedAt || record.last_observed_at || record.updatedAt,
        metadata: {
          ...recordMetadata,
          legacySource: "browser_memory",
          legacyId,
          ...(legacyId && !recordMetadata.localMemoryId ? { localMemoryId: legacyId } : {}),
          ...(record.type && !recordMetadata.localMemoryType ? { localMemoryType: record.type } : {}),
          ...(record.source && !recordMetadata.localMemorySource ? { localMemorySource: record.source } : {}),
          importedFromLocalCache: true
        }
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
  let currentItem = null;
  let currentItemIndex = -1;
  const sanitizedKeys = [];
  const dataTableWrites = [];
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
    for (const [index, item] of items.entries()) {
      currentItem = item;
      currentItemIndex = index;
      const sanitizeStats = {};
      const sanitizedValueJson = sanitizeJsonbValue(item.valueJson, sanitizeStats);
      if (
        Number(sanitizeStats.replacedNullChars) > 0 ||
        Number(sanitizeStats.replacedInvalidSurrogates) > 0
      ) {
        sanitizedKeys.push({
          key: item.key,
          replacedNullChars: Number(sanitizeStats.replacedNullChars) || 0,
          replacedInvalidSurrogates: Number(sanitizeStats.replacedInvalidSurrogates) || 0
        });
      }
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
        [item.key, JSON.stringify(sanitizedValueJson), item.source]
      );
      if (result.rows[0]?.key) {
        savedKeys.push(result.rows[0].key);
      }
      await mirrorStorageItemToBusinessTables(
        client,
        {
          ...item,
          valueJson: sanitizedValueJson
        },
        dataTableWrites
      );
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
          keys: savedKeys,
          sanitizedKeys,
          dataTableWrites
        })
      ]
    );
    await client.query("commit");

    response.json({
      ok: true,
      migrationRunId: runId,
      importedKeys: savedKeys.length,
      keys: savedKeys,
      sanitizedKeys,
      dataTableWrites
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
          JSON.stringify({
            requestedKeys: items.length,
            importedKeysBeforeFailure: currentItemIndex >= 0 ? currentItemIndex : 0,
            failedKey: currentItem?.key || "",
            failedSource: currentItem?.source || "",
            failedValueType: describeStorageValue(currentItem?.valueJson),
            failedValuePreview: previewStorageValue(currentItem?.valueJson),
            sanitizedKeys,
            dataTableWrites
          }),
          error?.message || "Unknown import error"
        ]
      );
    } catch (_migrationError) {
    }
    console.error("[Pulse Server] storage import failed", {
      runId,
      failedKey: currentItem?.key || "",
      failedSource: currentItem?.source || "",
      failedValueType: describeStorageValue(currentItem?.valueJson),
      error: error?.message || "Unknown import error"
    });
    response
      .status(500)
      .json(createJsonError("Failed to import storage payload.", error?.message));
  } finally {
    client.release();
  }
});

app.get("/api/memory/items", async (request, response) => {
  const contactId = String(request.query.contactId || request.query.contact_id || "").trim();
  const statuses = normalizeMemoryStatusFilter(request.query.status);
  const includeRuntime = String(request.query.includeRuntime || "true").trim() !== "false";
  const limit = Math.min(
    200,
    Math.max(1, Number.parseInt(String(request.query.limit || "80"), 10) || 80)
  );
  const params = [];
  const clauses = [];

  if (contactId) {
    params.push(contactId);
    clauses.push(`i.contact_id = $${params.length}`);
  }
  if (statuses.length) {
    params.push(statuses);
    clauses.push(`i.status = any($${params.length}::text[])`);
  }
  params.push(limit);
  const limitPlaceholder = `$${params.length}`;

  try {
    const result = await pool.query(
      `
        select i.*, ${includeRuntime ? "to_jsonb(r)" : "null::jsonb"} as runtime_state
        from memory_items i
        left join memory_runtime_state r on r.memory_item_id = i.id
        ${clauses.length ? `where ${clauses.join(" and ")}` : ""}
        order by
          case i.status
            when 'active' then 1
            when 'faint' then 2
            when 'dormant' then 3
            when 'archived' then 4
            else 5
          end asc,
          i.updated_at desc
        limit ${limitPlaceholder}
      `,
      params
    );
    response.json({
      ok: true,
      items: result.rows.map((row) => ({
        ...mapMemoryItemRow(row),
        runtimeState: includeRuntime ? mapMemoryRuntimeStateRow(row.runtime_state) : null
      }))
    });
  } catch (error) {
    response.status(500).json(createJsonError("Failed to load memory items.", error?.message));
  }
});

app.get("/api/memory/items/:id", async (request, response) => {
  const id = normalizeMemoryUuid(request.params.id);
  if (!id) {
    response.status(400).json(createJsonError("Valid memory item id is required."));
    return;
  }
  try {
    const loaded = await loadMemoryItemWithRuntime(pool, id);
    if (!loaded) {
      response.status(404).json(createJsonError("Memory item was not found."));
      return;
    }
    response.json({
      ok: true,
      ...loaded
    });
  } catch (error) {
    response.status(500).json(createJsonError("Failed to load memory item.", error?.message));
  }
});

app.post("/api/memory/items", async (request, response) => {
  const body = request.body && typeof request.body === "object" ? request.body : {};
  const rawItem = body.item && typeof body.item === "object" ? body.item : body;
  const client = await pool.connect();
  try {
    await client.query("begin");
    const saved = await createMemoryItemInDb(client, rawItem, {
      eventType: "created",
      actorType: body.actorType || "node_backend",
      actorRef: body.actorRef,
      sourceKind: body.sourceKind || "api",
      sourceRef: body.sourceRef,
      reasonCode: body.reasonCode,
      batchId: body.batchId,
      note: body.note,
      runtimeState: body.runtimeState
    });
    await client.query("commit");
    response.json({
      ok: true,
      ...saved
    });
  } catch (error) {
    await client.query("rollback");
    response
      .status(String(error?.message || "").includes("required") ? 400 : 500)
      .json(createJsonError("Failed to create memory item.", error?.message));
  } finally {
    client.release();
  }
});

app.patch("/api/memory/items/:id", async (request, response) => {
  const id = normalizeMemoryUuid(request.params.id);
  if (!id) {
    response.status(400).json(createJsonError("Valid memory item id is required."));
    return;
  }
  const body = request.body && typeof request.body === "object" ? request.body : {};
  const rawItem = body.item && typeof body.item === "object" ? body.item : body;
  const client = await pool.connect();
  try {
    await client.query("begin");
    const existingResult = await client.query("select * from memory_items where id = $1 limit 1", [
      id
    ]);
    if (!existingResult.rows.length) {
      await client.query("rollback");
      response.status(404).json(createJsonError("Memory item was not found."));
      return;
    }
    const existingRow = existingResult.rows[0];
    const existingItem = mapMemoryItemRow(existingRow);
    const nextItem = normalizeMemoryItemInput(
      {
        ...existingItem,
        ...rawItem,
        id,
        contactId: existingItem.contactId
      },
      existingItem
    );
    const statusChanged = nextItem.status !== existingItem.status;
    const updateResult = await client.query(
      `
        update memory_items
        set scope_type = $2,
            source_conversation_id = $3,
            memory_type = $4,
            memory_subtype = $5,
            semantic_key = $6,
            canonical_text = $7,
            summary_short = $8,
            summary_faint = $9,
            keywords = $10::jsonb,
            entity_refs = $11::jsonb,
            base_importance = $12,
            confidence = $13,
            status = $14,
            status_changed_at = case when status <> $14 then now() else status_changed_at end,
            emotion_intensity = $15,
            emotion_profile = $16::jsonb,
            interaction_tendency = $17::jsonb,
            emotion_summary = $18,
            arousal_level = $19,
            archived_at = $20,
            metadata = $21::jsonb,
            updated_at = now()
        where id = $1
        returning *
      `,
      [
        id,
        nextItem.scopeType,
        nextItem.sourceConversationId,
        nextItem.memoryType,
        nextItem.memorySubtype,
        nextItem.semanticKey,
        nextItem.canonicalText,
        nextItem.summaryShort,
        nextItem.summaryFaint,
        JSON.stringify(nextItem.keywords),
        JSON.stringify(nextItem.entityRefs),
        nextItem.baseImportance,
        nextItem.confidence,
        nextItem.status,
        nextItem.emotionIntensity,
        JSON.stringify(nextItem.emotionProfile),
        JSON.stringify(nextItem.interactionTendency),
        nextItem.emotionSummary,
        nextItem.arousalLevel,
        nextItem.archivedAt,
        JSON.stringify(nextItem.metadata)
      ]
    );
    const updatedRow = updateResult.rows[0];
    const editedEvent = await insertMemoryEvent(client, {
      memoryItemId: updatedRow.id,
      contactId: updatedRow.contact_id,
      eventType: "edited",
      actorType: body.actorType || "node_backend",
      actorRef: body.actorRef,
      sourceKind: body.sourceKind || "api",
      sourceRef: body.sourceRef,
      reasonCode: body.reasonCode || (statusChanged ? "manual_status_change" : "manual_edit"),
      beforeSnapshot: createMemorySnapshot(existingRow),
      afterSnapshot: createMemorySnapshot(updatedRow),
      batchId: body.batchId,
      note: body.note
    });
    let statusEvent = null;
    if (statusChanged) {
      statusEvent = await insertMemoryEvent(client, {
        memoryItemId: updatedRow.id,
        contactId: updatedRow.contact_id,
        eventType: "status_changed",
        actorType: body.actorType || "node_backend",
        actorRef: body.actorRef,
        sourceKind: body.sourceKind || "api",
        reasonCode: body.reasonCode || "manual_status_change",
        deltaPayload: { status: { from: existingItem.status, to: nextItem.status } },
        batchId: body.batchId
      });
    }
    const loaded = await loadMemoryItemWithRuntime(client, id);
    await client.query("commit");
    response.json({
      ok: true,
      ...loaded,
      events: [editedEvent, statusEvent].filter(Boolean)
    });
  } catch (error) {
    await client.query("rollback");
    response.status(500).json(createJsonError("Failed to update memory item.", error?.message));
  } finally {
    client.release();
  }
});

app.post("/api/memory/items/:id/reinforce", async (request, response) => {
  const id = normalizeMemoryUuid(request.params.id);
  if (!id) {
    response.status(400).json(createJsonError("Valid memory item id is required."));
    return;
  }
  const body = request.body && typeof request.body === "object" ? request.body : {};
  const client = await pool.connect();
  try {
    await client.query("begin");
    const existingResult = await client.query("select * from memory_items where id = $1 limit 1", [
      id
    ]);
    if (!existingResult.rows.length) {
      await client.query("rollback");
      response.status(404).json(createJsonError("Memory item was not found."));
      return;
    }
    const existingRow = existingResult.rows[0];
    const existingItem = mapMemoryItemRow(existingRow);
    const nextStatus = body.status
      ? normalizeMemoryStatus(body.status, existingItem.status)
      : existingItem.status === "faint" || existingItem.status === "dormant"
        ? "active"
        : existingItem.status;
    const result = await client.query(
      `
        update memory_items
        set last_observed_at = now(),
            last_reinforced_at = now(),
            reinforce_count = reinforce_count + 1,
            status = $2,
            status_changed_at = case when status <> $2 then now() else status_changed_at end,
            updated_at = now()
        where id = $1
        returning *
      `,
      [id, nextStatus]
    );
    const updatedRow = result.rows[0];
    const runtimeResult = await client.query(
      `
        update memory_runtime_state
        set activation_score = least(1, activation_score + $2),
            stability_score = least(1, stability_score + $3),
            updated_at = now()
        where memory_item_id = $1
        returning *
      `,
      [
        id,
        normalizeFiniteNumber(body.activationBoost ?? body.activation_boost, 0.15),
        normalizeFiniteNumber(body.stabilityBoost ?? body.stability_boost, 0.05)
      ]
    );
    const events = [];
    events.push(
      await insertMemoryEvent(client, {
        memoryItemId: updatedRow.id,
        contactId: updatedRow.contact_id,
        eventType: "reinforced",
        actorType: body.actorType || "node_backend",
        actorRef: body.actorRef,
        sourceKind: body.sourceKind || "api",
        sourceRef: body.sourceRef,
        reasonCode: body.reasonCode || "manual_reinforce",
        deltaPayload: {
          reinforceCount: {
            from: existingItem.reinforceCount,
            to: existingItem.reinforceCount + 1
          }
        },
        batchId: body.batchId,
        note: body.note
      })
    );
    if (updatedRow.status !== existingRow.status) {
      events.push(
        await insertMemoryEvent(client, {
          memoryItemId: updatedRow.id,
          contactId: updatedRow.contact_id,
          eventType: "status_changed",
          actorType: body.actorType || "node_backend",
          sourceKind: body.sourceKind || "api",
          reasonCode: body.reasonCode || "reinforced_status_recovery",
          deltaPayload: { status: { from: existingRow.status, to: updatedRow.status } },
          batchId: body.batchId
        })
      );
    }
    await client.query("commit");
    response.json({
      ok: true,
      item: mapMemoryItemRow(updatedRow),
      runtimeState: mapMemoryRuntimeStateRow(runtimeResult.rows[0]),
      events
    });
  } catch (error) {
    await client.query("rollback");
    response.status(500).json(createJsonError("Failed to reinforce memory item.", error?.message));
  } finally {
    client.release();
  }
});

app.post("/api/memory/items/:id/recall", async (request, response) => {
  const id = normalizeMemoryUuid(request.params.id);
  if (!id) {
    response.status(400).json(createJsonError("Valid memory item id is required."));
    return;
  }
  const body = request.body && typeof request.body === "object" ? request.body : {};
  const recalledScore = normalizeFiniteNumber(body.recalledScore ?? body.recalled_score, 0);
  const client = await pool.connect();
  try {
    await client.query("begin");
    const result = await client.query(
      `
        update memory_items
        set last_recalled_at = now(),
            recall_count = recall_count + 1,
            updated_at = now()
        where id = $1
        returning *
      `,
      [id]
    );
    if (!result.rows.length) {
      await client.query("rollback");
      response.status(404).json(createJsonError("Memory item was not found."));
      return;
    }
    const itemRow = result.rows[0];
    const runtimeResult = await client.query(
      `
        update memory_runtime_state
        set activation_score = least(1, activation_score + $2),
            last_recalled_score = $3,
            updated_at = now()
        where memory_item_id = $1
        returning *
      `,
      [id, normalizeFiniteNumber(body.activationBoost ?? body.activation_boost, 0.05), recalledScore]
    );
    const event = await insertMemoryEvent(client, {
      memoryItemId: itemRow.id,
      contactId: itemRow.contact_id,
      eventType: "recalled",
      actorType: body.actorType || "node_backend",
      actorRef: body.actorRef,
      sourceKind: body.sourceKind || "prompt",
      sourceRef: body.sourceRef,
      reasonCode: body.reasonCode || "prompt_recall",
      deltaPayload: {
        usedInPrompt: Boolean(body.usedInPrompt ?? true),
        recalledScore,
        cueTerms: normalizeJsonArrayValue(body.cueTerms || body.cue_terms, [])
      },
      batchId: body.batchId,
      note: body.note
    });
    await client.query("commit");
    response.json({
      ok: true,
      item: mapMemoryItemRow(itemRow),
      runtimeState: mapMemoryRuntimeStateRow(runtimeResult.rows[0]),
      event
    });
  } catch (error) {
    await client.query("rollback");
    response.status(500).json(createJsonError("Failed to mark memory as recalled.", error?.message));
  } finally {
    client.release();
  }
});

app.get("/api/memory/items/:id/events", async (request, response) => {
  const id = normalizeMemoryUuid(request.params.id);
  if (!id) {
    response.status(400).json(createJsonError("Valid memory item id is required."));
    return;
  }
  const limit = Math.min(
    300,
    Math.max(1, Number.parseInt(String(request.query.limit || "100"), 10) || 100)
  );
  try {
    const result = await pool.query(
      `
        select *
        from memory_events
        where memory_item_id = $1
        order by event_time desc, created_at desc
        limit $2
      `,
      [id, limit]
    );
    response.json({
      ok: true,
      events: result.rows.map(mapMemoryEventRow)
    });
  } catch (error) {
    response.status(500).json(createJsonError("Failed to load memory events.", error?.message));
  }
});

app.post("/api/memory/merge", async (request, response) => {
  const body = request.body && typeof request.body === "object" ? request.body : {};
  const batch = normalizeMemoryMergeBatchInput(body);
  if (!batch.contactId) {
    response.status(400).json(createJsonError("contactId is required for memory merge."));
    return;
  }
  if (!batch.items.length) {
    response.status(400).json(createJsonError("No memory candidates were provided."));
    return;
  }
  const client = await pool.connect();
  try {
    await client.query("begin");
    const results = [];
    const touchedMemoryIds = new Set();
    for (const item of batch.items) {
      const result = await applyMemoryMergeCandidateInDb(client, batch, item, {
        batchRef: batch.batchRef,
        sourceRef: batch.sourceRef,
        actorType: body.actorType || "frontend",
        actorRef: body.actorRef,
        sourceKind: body.sourceKind || "memory_extract",
        reasonCode: body.reasonCode || "memory_extract_merge"
      });
      results.push(result);
      if (result.item?.id) {
        touchedMemoryIds.add(result.item.id);
      }
      if (result.previousItem?.id) {
        touchedMemoryIds.add(result.previousItem.id);
      }
    }
    const touchedItems = [];
    for (const memoryId of touchedMemoryIds) {
      const loaded = await loadMemoryItemWithRuntime(client, memoryId);
      if (loaded) {
        touchedItems.push(loaded);
      }
    }
    await client.query("commit");
    response.json({
      ok: true,
      batchId: batch.batchRef,
      contactId: batch.contactId,
      sourceRef: batch.sourceRef,
      summary: {
        requestedCount: batch.items.length,
        createdCount: results.filter((item) => item.resolvedAction === "create").length,
        reinforcedCount: results.filter((item) => item.resolvedAction === "reinforce").length,
        supersededCount: results.filter((item) => item.resolvedAction === "supersede").length,
        ignoredCount: results.filter((item) => item.resolvedAction === "ignore").length,
        appliedCount: results.filter((item) =>
          ["create", "reinforce", "supersede"].includes(String(item.resolvedAction || "").trim())
        ).length
      },
      results,
      items: touchedItems.map((entry) => ({
        item: entry.item,
        runtimeState: entry.runtimeState
      }))
    });
  } catch (error) {
    await client.query("rollback");
    response.status(500).json(createJsonError("Failed to merge memory candidates.", error?.message));
  } finally {
    client.release();
  }
});

app.post("/api/memory/import", async (request, response) => {
  const items = normalizeMemoryImportItems(request.body);
  if (!items.length) {
    response.status(400).json(createJsonError("No memory items were provided."));
    return;
  }
  const batchId = randomUUID();
  const runId = randomUUID();
  const client = await pool.connect();
  try {
    await client.query("begin");
    await client.query(
      `
        insert into migration_runs (id, type, status, started_at, summary)
        values ($1, 'memory_import', 'running', now(), $2::jsonb)
      `,
      [runId, JSON.stringify({ requestedItems: items.length, batchId })]
    );

    const importedIds = [];
    const skipped = [];
    for (const item of items) {
      const semanticKey = String(item.semanticKey || item.semantic_key || "").trim();
      const legacyId = normalizeRequiredText(
        item.metadata?.legacyId || item.metadata?.localMemoryId || item.legacyId || item.id
      );
      let existingMatch = null;
      if (semanticKey) {
        const existingResult = await client.query(
          `
            select id
            from memory_items
            where contact_id = $1
              and semantic_key = $2
            limit 1
          `,
          [item.contactId, semanticKey]
        );
        if (existingResult.rows.length) {
          existingMatch = {
            reason: "semantic_key_exists",
            id: existingResult.rows[0].id,
            semanticKey
          };
        }
      }
      if (!existingMatch && legacyId) {
        const existingLegacyResult = await client.query(
          `
            select id
            from memory_items
            where contact_id = $1
              and (
                coalesce(metadata ->> 'legacyId', '') = $2
                or coalesce(metadata ->> 'localMemoryId', '') = $2
              )
            limit 1
          `,
          [item.contactId, legacyId]
        );
        if (existingLegacyResult.rows.length) {
          existingMatch = {
            reason: "legacy_id_exists",
            id: existingLegacyResult.rows[0].id,
            legacyId
          };
        }
      }
      if (existingMatch) {
        skipped.push(existingMatch);
        continue;
      }
      const saved = await createMemoryItemInDb(client, item, {
        eventType: "imported",
        actorType: "migration",
        sourceKind: "import",
        reasonCode: "legacy_memory_import",
        batchId,
        note: "Imported from legacy browser memory cache."
      });
      importedIds.push(saved.item.id);
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
          requestedItems: items.length,
          importedItems: importedIds.length,
          skippedItems: skipped.length,
          batchId,
          importedIds,
          skipped
        })
      ]
    );
    await client.query("commit");
    response.json({
      ok: true,
      migrationRunId: runId,
      batchId,
      importedItems: importedIds.length,
      skippedItems: skipped.length,
      importedIds,
      skipped
    });
  } catch (error) {
    await client.query("rollback");
    try {
      await pool.query(
        `
          insert into migration_runs (id, type, status, started_at, finished_at, summary, error)
          values ($1, 'memory_import', 'failed', now(), now(), $2::jsonb, $3)
          on conflict (id) do update
            set status = excluded.status,
                finished_at = excluded.finished_at,
                summary = excluded.summary,
                error = excluded.error
        `,
        [
          runId,
          JSON.stringify({ requestedItems: items.length, batchId }),
          error?.message || "Unknown memory import error"
        ]
      );
    } catch (_migrationError) {
    }
    response.status(500).json(createJsonError("Failed to import memory items.", error?.message));
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
