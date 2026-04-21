const path = require("path");
const { randomUUID } = require("crypto");

const compression = require("compression");
const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const { Pool } = require("pg");
const { getMemoryDecayConfig } = require("./memoryDecayConfig");

dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

const PORT = Number.parseInt(String(process.env.PORT || "3000"), 10) || 3000;
const DATABASE_URL = String(process.env.DATABASE_URL || "").trim();
const STATIC_ROOT = path.resolve(__dirname, "..", "..");
const MEMORY_DECAY_WORKER_ENABLED = normalizeBooleanEnv(
  process.env.MEMORY_DECAY_WORKER_ENABLED,
  true
);
const MEMORY_DECAY_WORKER_INTERVAL_MS = clampIntegerEnv(
  process.env.MEMORY_DECAY_WORKER_INTERVAL_MS,
  15 * 60 * 1000,
  60 * 1000,
  24 * 60 * 60 * 1000
);
const MEMORY_DECAY_WORKER_START_DELAY_MS = clampIntegerEnv(
  process.env.MEMORY_DECAY_WORKER_START_DELAY_MS,
  30 * 1000,
  0,
  60 * 60 * 1000
);
const MEMORY_DECAY_WORKER_BATCH_SIZE = clampIntegerEnv(
  process.env.MEMORY_DECAY_WORKER_BATCH_SIZE,
  50,
  1,
  200
);
const MEMORY_DECAY_WORKER_LOCK_ID = 2026041601;
const STATIC_LONG_CACHE_EXTENSIONS = new Set([
  ".js",
  ".css",
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".svg",
  ".webp",
  ".ico",
  ".woff",
  ".woff2",
  ".ttf",
  ".map"
]);
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
const FORUM_BACKGROUND_SOURCE_TYPES = new Set([
  "worldbook_entry",
  "forum_tab_text",
  "forum_tab_hot_topic"
]);
const FORUM_BACKGROUND_SOURCE_LAYERS = new Set([
  "history_base",
  "recent_campaign",
  "observable_timeline",
  "tab_background",
  "hot_topic"
]);
const FORUM_BACKGROUND_SOURCE_SEGMENTS = [
  {
    key: "forum_context",
    label: "论坛环境",
    sourceLayers: ["hot_topic", "tab_background"],
    defaultMaxCards: 8
  },
  {
    key: "recent_campaign",
    label: "近期主线",
    sourceLayers: ["recent_campaign"],
    defaultMaxCards: 6
  },
  {
    key: "observable_timeline",
    label: "公开行程",
    sourceLayers: ["observable_timeline"],
    defaultMaxCards: 5
  },
  {
    key: "history_base",
    label: "历史基底",
    sourceLayers: ["history_base"],
    defaultMaxCards: 8
  }
];
const FORUM_BACKGROUND_SOURCE_SEGMENT_KEYS = new Set(
  FORUM_BACKGROUND_SOURCE_SEGMENTS.map((item) => item.key)
);
const FORUM_BACKGROUND_TRUTH_LEVELS = new Set([
  "worldbook_fact",
  "tab_setting",
  "community_viewpoint",
  "community_speculation",
  "interpretation_frame",
  "discussion_structure"
]);
const FORUM_BACKGROUND_CARD_STATUSES = new Set([
  "candidate",
  "approved",
  "stable",
  "archived",
  "worldbook_candidate"
]);
const FORUM_BACKGROUND_CARD_EVENT_TYPES = new Set([
  "extracted",
  "reinforced",
  "approved",
  "stabilized",
  "archived",
  "restored",
  "edited",
  "marked_worldbook_candidate"
]);
const FORUM_BACKGROUND_EXTRACTION_RUN_STATUSES = new Set([
  "dirty",
  "pending_submission",
  "completed",
  "failed"
]);
const FORUM_BACKGROUND_GENERATION_TYPES = new Set(["posts", "replies"]);
const FORUM_BACKGROUND_DETAIL_LEVELS = new Set(["brief", "standard", "full"]);
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
const XIMILU_FORUM_TAB_NAME = "西米露💖";
const XIMILU_WORLD_BOOK_SOURCE_DEFINITIONS = [
  {
    policyId: "forum_bg_policy_ximilu_history_base",
    aliases: ["Jessie的公开信息合集"],
    sourceLayer: "history_base",
    knowledgeDomains: ["history_profile", "public_fact", "performance_history"],
    priority: 80
  },
  {
    policyId: "forum_bg_policy_ximilu_recent_campaign",
    aliases: ["《四季予你》2026年世界个人巡演信息", "《四季予你》2026年世界个人巡演信息汇总"],
    sourceLayer: "recent_campaign",
    knowledgeDomains: ["recent_tour", "career_stage", "performance_history"],
    priority: 92
  },
  {
    policyId: "forum_bg_policy_ximilu_observable_timeline",
    aliases: ["Jessie的公开行程"],
    sourceLayer: "observable_timeline",
    knowledgeDomains: ["schedule_timeline", "workload_state", "career_stage"],
    priority: 88
  }
];
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

function normalizeBooleanEnv(value, fallback = false) {
  const normalized = String(value ?? "").trim().toLowerCase();
  if (!normalized) {
    return Boolean(fallback);
  }
  if (["1", "true", "yes", "on", "enabled"].includes(normalized)) {
    return true;
  }
  if (["0", "false", "no", "off", "disabled"].includes(normalized)) {
    return false;
  }
  return Boolean(fallback);
}

function clampIntegerEnv(value, fallback, min, max) {
  const parsed = Number.parseInt(String(value ?? ""), 10);
  const resolved = Number.isFinite(parsed) ? parsed : fallback;
  return Math.min(max, Math.max(min, resolved));
}

function shouldApplyLongCacheForStaticAsset(requestPath = "") {
  const extension = path.extname(String(requestPath || "").trim().toLowerCase());
  return STATIC_LONG_CACHE_EXTENSIONS.has(extension);
}

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
let memoryDecayWorkerTimer = null;
let memoryDecayWorkerStartTimer = null;
let memoryDecayWorkerRunning = false;
let memoryDecayWorkerNextRunAt = null;
let memoryDecayWorkerLastRun = null;
let memoryDecayWorkerLastSummary = null;
let memoryDecayWorkerLastError = "";

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
    create index if not exists chat_messages_conversation_seq_idx
      on chat_messages (owner_id, conversation_id, message_seq);
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
  await db.query(`
    create table if not exists forum_background_source_policies (
      owner_id text not null,
      id text not null,
      tab_id text not null,
      source_ref_type text not null,
      source_ref_id text not null,
      source_title text not null default '',
      source_layer text not null,
      knowledge_domains_jsonb jsonb not null default '[]'::jsonb,
      priority integer not null default 0,
      is_enabled boolean not null default true,
      metadata jsonb not null default '{}'::jsonb,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now(),
      primary key (owner_id, id)
    );
  `);
  await db.query(`
    create unique index if not exists forum_background_source_policies_ref_idx
      on forum_background_source_policies (owner_id, tab_id, source_ref_type, source_ref_id, source_layer);
  `);
  await db.query(`
    create index if not exists forum_background_source_policies_tab_idx
      on forum_background_source_policies (owner_id, tab_id, is_enabled, priority desc, updated_at desc);
  `);
  await db.query(`
    create table if not exists forum_background_cards (
      owner_id text not null,
      id text not null,
      tab_id text not null,
      source_type text not null,
      source_id text not null,
      source_title text not null default '',
      source_layer text not null default '',
      source_excerpt text not null default '',
      truth_level text not null default '',
      knowledge_domain text not null default '',
      summary text not null default '',
      detail_text text not null default '',
      suitable_roles_jsonb jsonb not null default '[]'::jsonb,
      keywords_jsonb jsonb not null default '[]'::jsonb,
      confidence double precision not null default 0.7,
      status text not null default 'candidate',
      mention_count integer not null default 1,
      first_seen_at timestamptz not null default now(),
      last_seen_at timestamptz not null default now(),
      approved_at timestamptz,
      archived_at timestamptz,
      extraction_run_id text not null default '',
      metadata jsonb not null default '{}'::jsonb,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now(),
      primary key (owner_id, id)
    );
  `);
  await db.query(`
    create index if not exists forum_background_cards_tab_status_idx
      on forum_background_cards (owner_id, tab_id, status, updated_at desc);
  `);
  await db.query(`
    create index if not exists forum_background_cards_source_idx
      on forum_background_cards (owner_id, tab_id, source_type, source_id, source_layer);
  `);
  await db.query(`
    create table if not exists forum_background_card_events (
      owner_id text not null,
      id text not null,
      card_id text not null,
      tab_id text not null default '',
      event_type text not null,
      actor_type text not null default '',
      note text not null default '',
      before_snapshot jsonb,
      after_snapshot jsonb,
      payload_jsonb jsonb not null default '{}'::jsonb,
      created_at timestamptz not null default now(),
      primary key (owner_id, id)
    );
  `);
  await db.query(`
    create index if not exists forum_background_card_events_card_idx
      on forum_background_card_events (owner_id, card_id, created_at desc);
  `);
  await db.query(`
    create table if not exists forum_background_extraction_runs (
      owner_id text not null,
      id text not null,
      tab_id text not null,
      source_segment_key text not null default '',
      status text not null default 'dirty',
      trigger_reason text not null default '',
      source_bundle_jsonb jsonb not null default '{}'::jsonb,
      source_bundle_hash text not null default '',
      hot_topic_hash text not null default '',
      candidate_count integer not null default 0,
      submitted_at timestamptz,
      completed_at timestamptz,
      dirty_since timestamptz,
      metadata jsonb not null default '{}'::jsonb,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now(),
      primary key (owner_id, id)
    );
  `);
  await db.query(`
    create index if not exists forum_background_extraction_runs_tab_idx
      on forum_background_extraction_runs (owner_id, tab_id, created_at desc);
  `);
  await db.query(`
    alter table forum_background_extraction_runs
    add column if not exists source_segment_key text not null default '';
  `);
  await db.query(`
    create index if not exists forum_background_extraction_runs_segment_idx
      on forum_background_extraction_runs (owner_id, tab_id, source_segment_key, created_at desc);
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
  await ensureXimiluBackgroundPolicies(db, ownerId);
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

async function replaceChatMessagesForConversation(db, conversation = {}, ownerId = DEFAULT_STORAGE_OWNER_ID) {
  const conversationId = toStorageText(conversation.id);
  if (!conversationId) {
    return 0;
  }
  const contactId = toStorageText(conversation.contactId);
  const messages = Array.isArray(conversation.messages) ? conversation.messages : [];
  await db.query("delete from chat_messages where owner_id = $1 and conversation_id = $2", [
    ownerId,
    conversationId
  ]);

  let messageCount = 0;
  for (const [messageIndex, message] of messages.entries()) {
    const sanitizedMessage = sanitizeJsonbValue(message);
    const messageId = toStorageText(message?.id, `${conversationId}_message_${messageIndex + 1}`);
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
          toStorageText(sanitizedMessage?.role, "user"),
          toStorageText(sanitizedMessage?.messageType, "text"),
          toStorageText(sanitizedMessage?.text),
          toStorageBoolean(sanitizedMessage?.needsReply),
          messageIndex + 1,
          toStorageText(sanitizedMessage?.status, "active"),
          stringifyJsonb(sanitizedMessage),
          toClientTimestamp(sanitizedMessage?.createdAt),
          toClientTimestamp(sanitizedMessage?.updatedAt || sanitizedMessage?.createdAt)
        ]
      );
    messageCount += 1;
  }
  return messageCount;
}

async function upsertChatConversationSnapshot(
  db,
  conversation = {},
  ownerId = DEFAULT_STORAGE_OWNER_ID,
  options = {}
) {
  const snapshot = sanitizeJsonbValue(normalizeSnapshotObject(conversation));
  const requestOptions = options && typeof options === "object" ? options : {};
  const fallbackId = String(requestOptions.fallbackId || "").trim();
  const conversationId = toStorageText(snapshot.id, fallbackId);
  if (!conversationId) {
    return null;
  }
  const contactId = toStorageText(snapshot.contactId);
  const lastMessage = getConversationLastMessage(snapshot);
  const clientUpdatedAt = toClientTimestamp(
    requestOptions.clientUpdatedAt || snapshot.lastMutatedAt || snapshot.updatedAt
  );
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
      on conflict (owner_id, id) do update
        set contact_id = excluded.contact_id,
            conversation_key = excluded.conversation_key,
            contact_name_snapshot = excluded.contact_name_snapshot,
            contact_avatar_image_snapshot = excluded.contact_avatar_image_snapshot,
            contact_avatar_text_snapshot = excluded.contact_avatar_text_snapshot,
            prompt_settings_jsonb = excluded.prompt_settings_jsonb,
            scene_mode = excluded.scene_mode,
            allow_ai_presence_update = excluded.allow_ai_presence_update,
            allow_ai_proactive_message = excluded.allow_ai_proactive_message,
            allow_ai_auto_schedule = excluded.allow_ai_auto_schedule,
            auto_schedule_days = excluded.auto_schedule_days,
            auto_schedule_time = excluded.auto_schedule_time,
            auto_schedule_last_run_date = excluded.auto_schedule_last_run_date,
            voice_call_state_jsonb = excluded.voice_call_state_jsonb,
            reply_context_version = excluded.reply_context_version,
            memory_summary_counter = excluded.memory_summary_counter,
            memory_summary_last_message_count = excluded.memory_summary_last_message_count,
            last_message_at = excluded.last_message_at,
            last_message_id = excluded.last_message_id,
            payload_jsonb = excluded.payload_jsonb,
            client_updated_at = excluded.client_updated_at,
            updated_at = now()
    `,
    [
      ownerId,
      conversationId,
      contactId,
      `${contactId || "contact"}:${conversationId}`,
      toStorageText(snapshot.contactNameSnapshot),
      toStorageText(snapshot.contactAvatarImageSnapshot),
      toStorageText(snapshot.contactAvatarTextSnapshot),
      stringifyJsonb(normalizeSnapshotObject(snapshot.promptSettings)),
      toStorageText(snapshot.sceneMode, "online"),
      toStorageBoolean(snapshot.allowAiPresenceUpdate),
      toStorageBoolean(snapshot.allowAiProactiveMessage),
      toStorageBoolean(snapshot.allowAiAutoSchedule),
      toStorageInteger(snapshot.autoScheduleDays, 0),
      toStorageText(snapshot.autoScheduleTime),
      toStorageText(snapshot.autoScheduleLastRunDate),
      stringifyJsonb(normalizeSnapshotObject(snapshot.voiceCallState)),
      toStorageInteger(snapshot.replyContextVersion, 0),
      toStorageInteger(snapshot.memorySummaryCounter, 0),
      toStorageInteger(snapshot.memorySummaryLastMessageCount, 0),
      toClientTimestamp(lastMessage?.createdAt || snapshot.updatedAt),
      lastMessage ? toStorageText(lastMessage.id) : null,
      stringifyJsonb(snapshot),
      clientUpdatedAt
    ]
  );
  const messageCount = await replaceChatMessagesForConversation(
    db,
    {
      ...snapshot,
      id: conversationId,
      contactId
    },
    ownerId
  );
  return {
    conversationId,
    messageCount
  };
}

async function replaceChatThreadsSnapshot(db, valueJson, ownerId, tableWrites) {
  const conversations = normalizeSnapshotArray(valueJson);
  await db.query("delete from chat_messages where owner_id = $1", [ownerId]);
  await db.query("delete from chat_conversations where owner_id = $1", [ownerId]);

  let messageCount = 0;
  for (const [conversationIndex, conversation] of conversations.entries()) {
    const upserted = await upsertChatConversationSnapshot(db, conversation, ownerId, {
      fallbackId: `conversation_${conversationIndex + 1}`
    });
    messageCount += Number(upserted?.messageCount) || 0;
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
  await ensureXimiluBackgroundPolicies(db, ownerId);
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

function getPrivacyAllowlistNamePlaceholderParts(value = "") {
  const match = trimPrivacyText(value)
    .toUpperCase()
    .match(/^__PG_NAME_([A-Z0-9]{8})_(FULL|COMMON|NICK|PET|HONOR)__$/);
  return match
    ? {
        baseId: match[1],
        level: match[2]
      }
    : null;
}

function buildPrivacyAllowlistNamePlaceholderFromBase(baseId = "", nameLevel = "") {
  const normalizedBaseId = trimPrivacyText(baseId).toUpperCase();
  if (!/^[A-Z0-9]{8}$/.test(normalizedBaseId)) {
    return "";
  }
  return `__PG_NAME_${normalizedBaseId}_${normalizePrivacyAllowlistNameLevel(nameLevel)}__`;
}

function getPrivacyAllowlistNameLevelPriority(nameLevel = "") {
  const order = ["FULL", "COMMON", "NICK", "PET", "HONOR"];
  const index = order.indexOf(normalizePrivacyAllowlistNameLevel(nameLevel));
  return index >= 0 ? index : order.length;
}

function shouldPreferPrivacyAllowlistNamePlaceholder(candidate = "", current = "") {
  const candidateParts = getPrivacyAllowlistNamePlaceholderParts(candidate);
  if (!candidateParts) {
    return false;
  }
  const currentParts = getPrivacyAllowlistNamePlaceholderParts(current);
  if (!currentParts) {
    return true;
  }
  return (
    getPrivacyAllowlistNameLevelPriority(candidateParts.level) <
    getPrivacyAllowlistNameLevelPriority(currentParts.level)
  );
}

function resolvePrivacyAllowlistPlaceholderFromScopeMap(
  scopeMap,
  scopeKey = "",
  category = "",
  nameLevel = ""
) {
  if (!(scopeMap instanceof Map) || !scopeKey || !scopeMap.has(scopeKey)) {
    return "";
  }
  const existingPlaceholder = trimPrivacyText(scopeMap.get(scopeKey)).toUpperCase();
  if (normalizePrivacyAllowlistCategory(category) !== "NAME") {
    return existingPlaceholder;
  }
  const nameParts = getPrivacyAllowlistNamePlaceholderParts(existingPlaceholder);
  return buildPrivacyAllowlistNamePlaceholderFromBase(nameParts?.baseId, nameLevel) || existingPlaceholder;
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
    if (!scopeKey || !placeholder || !isValidPrivacyAllowlistPlaceholder(placeholder, category)) {
      return;
    }
    if (scopeMap.has(scopeKey)) {
      if (
        category === "NAME" &&
        shouldPreferPrivacyAllowlistNamePlaceholder(placeholder, scopeMap.get(scopeKey))
      ) {
        scopeMap.set(scopeKey, placeholder);
      }
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
  if (scopeKey) {
    const existingPlaceholder = resolvePrivacyAllowlistPlaceholderFromScopeMap(
      scopeMap,
      scopeKey,
      category,
      nameLevel
    );
    if (existingPlaceholder) {
      return existingPlaceholder;
    }
  }
  const generated = buildDefaultPrivacyAllowlistPlaceholder({
    category,
    text,
    nameGroupId,
    nameLevel
  });
  if (scopeKey && !scopeMap.has(scopeKey)) {
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
  if (!text) {
    return "";
  }
  if (category === "NAME") {
    return `NAME:${nameGroupId || text}`;
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
  const nameGroupBaseMap = new Map();
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
    const nameLevel =
      category === "NAME" ? normalizePrivacyAllowlistNameLevel(item.nameLevel) : "COMMON";

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

    if (category === "NAME") {
      const nameParts = getPrivacyAllowlistNamePlaceholderParts(placeholder);
      const groupLabel = nameGroupId || text;
      if (nameParts && nameParts.level !== nameLevel) {
        addIssue(
          `name-level:${scopeKey}:${placeholder}`,
          `人名“${text}”的占位符层级是 ${nameParts.level}，但当前层级是 ${nameLevel}。`
        );
      }
      if (nameParts?.baseId) {
        const existingBase = nameGroupBaseMap.get(scopeKey);
        if (existingBase && existingBase.baseId !== nameParts.baseId) {
          addIssue(
            `name-group:${scopeKey}`,
            `人名分组 ${groupLabel} 存在多个占位符主体编号，请统一成同一个后再保存。`
          );
        } else if (!existingBase) {
          nameGroupBaseMap.set(scopeKey, {
            baseId: nameParts.baseId
          });
        }
      }
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
  await ensureXimiluBackgroundPolicies(pool, DEFAULT_STORAGE_OWNER_ID);
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

function clampMemoryScore(value, min = 0, max = 1, fallback = min) {
  return Math.min(max, Math.max(min, normalizeFiniteNumber(value, fallback)));
}

function resolveTimestampDate(value, fallback = null) {
  if (!value) {
    return fallback;
  }
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? fallback : date;
}

function getDaysSinceTimestamp(value, now = new Date()) {
  const resolvedDate = resolveTimestampDate(value, null);
  if (!resolvedDate) {
    return Number.POSITIVE_INFINITY;
  }
  return Math.max(0, (now.getTime() - resolvedDate.getTime()) / (24 * 60 * 60 * 1000));
}

function buildNextMemoryDecayAt(now = new Date()) {
  return new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString();
}

function getMemoryDecayStatusFromScores(decayConfig = {}, scores = {}, item = {}, now = new Date()) {
  const activationScore = clampMemoryScore(scores.activationScore, 0, 1, 0);
  const impressionFloor = clampMemoryScore(scores.impressionFloor, 0, 1, 0);
  const stabilityScore = clampMemoryScore(scores.stabilityScore, 0, 1, 0);
  const daysSinceLastObserved = getDaysSinceTimestamp(
    item.lastObservedAt || item.lastReinforcedAt || item.lastRecalledAt || item.firstObservedAt,
    now
  );
  const thresholds = decayConfig.statusThresholds || {};
  if (activationScore >= normalizeFiniteNumber(thresholds.activeMinActivation, 0.58)) {
    return "active";
  }
  if (
    activationScore >= normalizeFiniteNumber(thresholds.faintMinActivation, 0.22) ||
    impressionFloor >= normalizeFiniteNumber(thresholds.faintMinImpression, 0.18)
  ) {
    return "faint";
  }
  if (
    impressionFloor >= normalizeFiniteNumber(thresholds.dormantMinImpression, 0.08) ||
    stabilityScore >= normalizeFiniteNumber(thresholds.dormantMinStability, 0.28)
  ) {
    return "dormant";
  }
  const shouldArchive =
    activationScore < normalizeFiniteNumber(thresholds.archivedMaxActivation, 0.12) &&
    impressionFloor < normalizeFiniteNumber(thresholds.archivedMaxImpression, 0.08) &&
    daysSinceLastObserved >= normalizePositiveIntegerValue(thresholds.archivedMinInactiveDays, 45);
  if (shouldArchive) {
    return "archived";
  }
  return "archived";
}

function buildMemoryDecayDebugPayload(item = {}, runtimeState = {}, result = {}, now = new Date()) {
  const derived = result?.derived || {};
  return {
    algorithmVersion: result?.runtimeState?.algorithmVersion || runtimeState?.algorithmVersion || "v1",
    computedAt: now.toISOString(),
    memoryType: item.memoryType || "",
    statusBefore: item.status || "",
    statusAfter: result?.status || item.status || "",
    importanceScore: normalizeFiniteNumber(derived.importanceScore, 0),
    confidenceScore: normalizeFiniteNumber(derived.confidenceScore, 0),
    emotionScore: normalizeFiniteNumber(derived.emotionScore, 0),
    reinforceScore: normalizeFiniteNumber(derived.reinforceScore, 0),
    typeBias: normalizeFiniteNumber(derived.typeBias, 0),
    halfLifeDays: normalizeFiniteNumber(derived.halfLifeDays, 0),
    daysSinceLastObserved: normalizeFiniteNumber(derived.daysSinceLastObserved, 0),
    daysSinceLastReinforced: normalizeFiniteNumber(derived.daysSinceLastReinforced, 0),
    daysSinceLastRecalled: normalizeFiniteNumber(derived.daysSinceLastRecalled, 0),
    previousRuntime: runtimeState
      ? {
          activationScore: normalizeFiniteNumber(runtimeState.activationScore, 0),
          stabilityScore: normalizeFiniteNumber(runtimeState.stabilityScore, 0),
          impressionFloor: normalizeFiniteNumber(runtimeState.impressionFloor, 0),
          decayRate: normalizeFiniteNumber(runtimeState.decayRate, 0),
          cueRecallThreshold: normalizeFiniteNumber(runtimeState.cueRecallThreshold, 0)
        }
      : null
  };
}

function normalizeMemoryFaintSummarySource(value = "") {
  return String(value || "")
    .replace(/^\s*(你隐约记得|我隐约记得|隐约记得)[：:，,\s]*/u, "")
    .replace(/^\s*(你好像|我好像|好像)[：:，,\s]*/u, "")
    .replace(/\s+/g, " ")
    .trim();
}

function needsMemorySummaryFaintFallback(value = "") {
  const text = String(value || "").trim();
  if (!text) {
    return true;
  }
  return (
    /^\s*(你隐约记得|我隐约记得|隐约记得)/u.test(text) ||
    /charname|username/i.test(text) ||
    /[你我他她]/u.test(text) ||
    /我们|咱们|联系人|用户/u.test(text)
  );
}

function buildFallbackMemorySummaryFaint(summaryShort = "", canonicalText = "") {
  let nextText = normalizeMemoryFaintSummarySource(summaryShort || canonicalText || "");
  if (!nextText) {
    return "";
  }
  nextText = nextText.replace(/[。！？]+$/u, "").trim();
  if (!nextText) {
    return "";
  }

  if (!/(似乎|有些|大概|倾向于|比较|容易|经常)/u.test(nextText)) {
    if (nextText.includes("会")) {
      nextText = nextText.replace("会", "似乎会");
    } else if (nextText.includes("很")) {
      nextText = nextText.replace("很", "似乎有些");
    } else if (nextText.startsWith("在")) {
      nextText = `${nextText}，似乎留下了一点印象`;
    } else {
      nextText = `似乎${nextText}`;
    }
  }

  if (nextText.length > 90) {
    const chunks = nextText
      .split(/[，；]/u)
      .map((item) => String(item || "").trim())
      .filter(Boolean);
    if (chunks.length >= 2) {
      nextText = `${chunks[0]}，${chunks[1]}`;
    }
  }
  if (nextText.length > 90) {
    nextText = nextText.slice(0, 88).replace(/[，、；,\s]+$/u, "").trim();
  }
  return /[。！？]$/u.test(nextText) ? nextText : `${nextText}。`;
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
  const providedSummaryFaint = normalizeRequiredText(
    getInputValue(source, "summaryFaint", "summary_faint") ?? fallbackItem.summaryFaint
  );
  const summaryFaint = needsMemorySummaryFaintFallback(providedSummaryFaint)
    ? buildFallbackMemorySummaryFaint(summaryShort, canonicalText)
    : providedSummaryFaint;
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
  const decayConfig = getMemoryDecayConfig();
  const importanceScore = normalizeScoreNumber(item.baseImportance, 0.5);
  const confidenceScore = normalizeScoreNumber(item.confidence, 0.7);
  const emotionScore = normalizeScoreNumber(item.emotionIntensity ?? 0, 0);
  const reinforceScore = getMemoryReinforceScore(item.reinforceCount);
  const typeBias = getMemoryDecayTypeBias(decayConfig, item.memoryType);
  const positiveTypeBias = Math.max(0, typeBias);
  const positiveBiasScale = getMemoryPositiveTypeBiasScale(decayConfig, positiveTypeBias);
  const stabilityScore = Math.min(
    0.95,
    Math.max(
      0.05,
      decayConfig.formula.targetStabilityBase +
        importanceScore * decayConfig.formula.targetStabilityImportanceWeight +
        confidenceScore * decayConfig.formula.targetStabilityConfidenceWeight +
        emotionScore * decayConfig.formula.targetStabilityEmotionWeight +
        reinforceScore * decayConfig.formula.targetStabilityReinforceWeight +
        typeBias
    )
  );
  const impressionFloorBase = Math.min(
    0.65,
    Math.max(
      0,
      decayConfig.formula.impressionFloorBase +
        importanceScore * decayConfig.formula.impressionFloorImportanceWeight +
        emotionScore * decayConfig.formula.impressionFloorEmotionWeight +
        reinforceScore * decayConfig.formula.impressionFloorReinforceWeight +
        positiveTypeBias
    )
  );
  const resolvedStatus = normalizeMemoryStatus(item.status, "active");
  const impressionFloor =
    resolvedStatus === "faint"
      ? Math.max(decayConfig.statusThresholds.faintMinImpression, impressionFloorBase)
      : resolvedStatus === "dormant"
        ? Math.max(
            decayConfig.statusThresholds.dormantMinImpression,
            Math.min(decayConfig.statusThresholds.faintMinImpression - 0.01, impressionFloorBase)
          )
        : impressionFloorBase;
  const activationSeed = Math.min(
    1,
    Math.max(
      decayConfig.statusThresholds.archivedMaxActivation,
      importanceScore * decayConfig.statusThresholds.activeMinActivation +
        confidenceScore * decayConfig.formula.targetStabilityConfidenceWeight +
        emotionScore * decayConfig.formula.targetStabilityEmotionWeight +
        reinforceScore * decayConfig.formula.targetStabilityReinforceWeight +
        positiveTypeBias * decayConfig.formula.cueThresholdPositiveBiasBonus
    )
  );
  const activationScore =
    resolvedStatus === "active"
      ? Math.max(decayConfig.statusThresholds.activeMinActivation, activationSeed)
      : resolvedStatus === "faint"
        ? Math.min(
            decayConfig.statusThresholds.activeMinActivation - 0.01,
            Math.max(decayConfig.statusThresholds.faintMinActivation, activationSeed)
          )
        : resolvedStatus === "dormant"
          ? Math.min(
              decayConfig.statusThresholds.faintMinActivation - 0.01,
              Math.max(decayConfig.statusThresholds.archivedMaxActivation, activationSeed)
            )
          : Math.min(decayConfig.statusThresholds.archivedMaxActivation, activationSeed);
  const halfLifeDays = getMemoryHalfLifeDays(decayConfig, item.memoryType);
  const decayRate = Math.max(
    0.01,
    (Math.log(2) / Math.max(1, halfLifeDays)) *
      Math.min(
        1.2,
        Math.max(
          0.15,
          1 - 0.45 * stabilityScore - 0.2 * emotionScore - 0.15 * importanceScore - 0.1 * reinforceScore
        )
      )
  );
  return {
    activationScore,
    stabilityScore,
    impressionFloor,
    decayRate,
    cueRecallThreshold: Math.min(
      0.85,
      Math.max(
        0.35,
        decayConfig.formula.cueThresholdBase -
          positiveBiasScale * decayConfig.formula.cueThresholdPositiveBiasBonus +
          (resolvedStatus === "dormant" ? 0.05 : 0)
      )
    ),
    nextDecayAt: buildNextMemoryDecayAt(),
    algorithmVersion: decayConfig.meta.algorithmVersion
  };
}

function getMemoryReinforceScore(value = 0) {
  const reinforceCount = Math.max(0, normalizePositiveIntegerValue(value, 0));
  return Math.min(1, Math.max(0, Math.log1p(reinforceCount) / Math.log(6)));
}

function getMemoryDecayTypeBias(decayConfig = {}, memoryType = "") {
  const normalizedType = String(memoryType || "").trim().toLowerCase();
  const fallback = normalizeFiniteNumber(decayConfig?.typeBias?.default, 0);
  return normalizeFiniteNumber(decayConfig?.typeBias?.[normalizedType], fallback);
}

function getMemoryHalfLifeDays(decayConfig = {}, memoryType = "") {
  const normalizedType = String(memoryType || "").trim().toLowerCase();
  const fallback = Math.max(1, normalizePositiveIntegerValue(decayConfig?.halfLifeDays?.default, 10));
  return Math.max(1, normalizePositiveIntegerValue(decayConfig?.halfLifeDays?.[normalizedType], fallback));
}

function getMemoryPositiveTypeBiasScale(decayConfig = {}, positiveTypeBias = 0) {
  const positiveBiasValues = Object.values(decayConfig?.typeBias || {})
    .map((value) => normalizeFiniteNumber(value, 0))
    .filter((value) => value > 0);
  const maxPositiveBias = positiveBiasValues.length ? Math.max(...positiveBiasValues) : 0.01;
  return Math.min(1, Math.max(0, normalizeFiniteNumber(positiveTypeBias, 0) / maxPositiveBias));
}

function recomputeMemoryRuntimeState(item = {}, runtimeState = null, options = {}) {
  const requestOptions = options && typeof options === "object" ? options : {};
  const decayConfig = requestOptions.decayConfig || getMemoryDecayConfig();
  const now = requestOptions.now instanceof Date ? requestOptions.now : new Date();
  const resolvedItem = item && typeof item === "object" ? item : {};
  const previousRuntime =
    runtimeState && typeof runtimeState === "object"
      ? runtimeState
      : buildInitialMemoryRuntimeState(resolvedItem);
  const importanceScore = normalizeScoreNumber(resolvedItem.baseImportance, 0.5);
  const confidenceScore = normalizeScoreNumber(resolvedItem.confidence, 0.7);
  const emotionScore = normalizeScoreNumber(resolvedItem.emotionIntensity ?? 0, 0);
  const reinforceScore = getMemoryReinforceScore(resolvedItem.reinforceCount);
  const typeBias = getMemoryDecayTypeBias(decayConfig, resolvedItem.memoryType);
  const positiveTypeBias = Math.max(0, typeBias);
  const positiveBiasScale = getMemoryPositiveTypeBiasScale(decayConfig, positiveTypeBias);
  const daysSinceLastObserved = getDaysSinceTimestamp(
    resolvedItem.lastObservedAt || resolvedItem.firstObservedAt,
    now
  );
  const daysSinceLastReinforced = getDaysSinceTimestamp(
    resolvedItem.lastReinforcedAt || resolvedItem.lastObservedAt || resolvedItem.firstObservedAt,
    now
  );
  const daysSinceLastRecalled = getDaysSinceTimestamp(resolvedItem.lastRecalledAt, now);
  const deltaDays = Math.max(
    0,
    Math.min(
      365,
      getDaysSinceTimestamp(
        previousRuntime?.lastComputedAt || previousRuntime?.updatedAt || resolvedItem.updatedAt || resolvedItem.createdAt,
        now
      )
    )
  );
  const stabilityFloor = clampMemoryScore(0.08 + 0.12 * importanceScore + positiveTypeBias * 0.6, 0.05, 0.55, 0.05);
  const targetStability = clampMemoryScore(
    decayConfig.formula.targetStabilityBase +
      importanceScore * decayConfig.formula.targetStabilityImportanceWeight +
      confidenceScore * decayConfig.formula.targetStabilityConfidenceWeight +
      emotionScore * decayConfig.formula.targetStabilityEmotionWeight +
      reinforceScore * decayConfig.formula.targetStabilityReinforceWeight +
      typeBias,
    0.05,
    0.95,
    previousRuntime?.stabilityScore ?? 0.05
  );
  const impressionTarget = clampMemoryScore(
    decayConfig.formula.impressionFloorBase +
      importanceScore * decayConfig.formula.impressionFloorImportanceWeight +
      emotionScore * decayConfig.formula.impressionFloorEmotionWeight +
      reinforceScore * decayConfig.formula.impressionFloorReinforceWeight +
      positiveTypeBias,
    0,
    0.65,
    previousRuntime?.impressionFloor ?? 0
  );
  const coldPenaltyRatio =
    daysSinceLastReinforced === Number.POSITIVE_INFINITY
      ? 1
      : (daysSinceLastReinforced - decayConfig.formula.coldPenaltyStartDays) /
        Math.max(1, decayConfig.formula.coldPenaltyWindowDays);
  const coldPenalty = clampMemoryScore(
    coldPenaltyRatio * decayConfig.formula.coldPenaltyMax,
    0,
    decayConfig.formula.coldPenaltyMax,
    0
  );
  const impressionFloor = clampMemoryScore(
    Math.max(0, impressionTarget - coldPenalty),
    0,
    0.65,
    previousRuntime?.impressionFloor ?? 0
  );
  const halfLifeDays = getMemoryHalfLifeDays(decayConfig, resolvedItem.memoryType);
  const decayRate = Math.max(
    0.01,
    (Math.log(2) / Math.max(1, halfLifeDays)) *
      clampMemoryScore(
        1 -
          0.45 * clampMemoryScore(previousRuntime?.stabilityScore, 0, 1, targetStability) -
          0.2 * emotionScore -
          0.15 * importanceScore -
          0.1 * reinforceScore,
        0.15,
        1.2,
        1
      )
  );
  const previousActivation = clampMemoryScore(previousRuntime?.activationScore, 0, 1, impressionFloor);
  const activationBase =
    impressionFloor + (previousActivation - impressionFloor) * Math.exp(-decayRate * deltaDays);
  const recallBurst =
    daysSinceLastRecalled <= 7
      ? decayConfig.formula.recallBurstBase *
        Math.pow(0.5, daysSinceLastRecalled / Math.max(1, decayConfig.formula.recallBurstHalfLifeDays))
      : 0;
  const activationScore = clampMemoryScore(
    Math.max(impressionFloor, activationBase + recallBurst),
    0,
    1,
    previousActivation
  );
  const stabilityDrift =
    daysSinceLastReinforced <= decayConfig.formula.stabilityRecentWindowDays
      ? decayConfig.formula.stabilityDriftRecent
      : decayConfig.formula.stabilityDriftCold;
  const stabilityScore = clampMemoryScore(
    clampMemoryScore(previousRuntime?.stabilityScore, 0, 1, targetStability) +
      0.12 * (targetStability - clampMemoryScore(previousRuntime?.stabilityScore, 0, 1, targetStability)) -
      stabilityDrift * deltaDays,
    stabilityFloor,
    1,
    targetStability
  );
  const cueRecallThreshold = clampMemoryScore(
    decayConfig.formula.cueThresholdBase -
      positiveBiasScale * decayConfig.formula.cueThresholdPositiveBiasBonus,
    0.35,
    0.85,
    previousRuntime?.cueRecallThreshold ?? decayConfig.formula.cueThresholdBase
  );
  const nextStatus = getMemoryDecayStatusFromScores(
    decayConfig,
    {
      activationScore,
      impressionFloor,
      stabilityScore
    },
    resolvedItem,
    now
  );
  const runtimeResult = {
    memoryItemId: resolvedItem.id || previousRuntime?.memoryItemId || "",
    activationScore,
    stabilityScore,
    impressionFloor,
    decayRate,
    cueRecallThreshold,
    lastComputedAt: now.toISOString(),
    lastDecayAt: now.toISOString(),
    nextDecayAt: buildNextMemoryDecayAt(now),
    lastRecalledScore:
      previousRuntime?.lastRecalledScore == null
        ? null
        : normalizeFiniteNumber(previousRuntime.lastRecalledScore, 0),
    algorithmVersion: decayConfig.meta.algorithmVersion,
    debugPayload: {}
  };
  const decayDeltas = {
    activationScore: {
      from: clampMemoryScore(previousRuntime?.activationScore, 0, 1, 0),
      to: activationScore
    },
    stabilityScore: {
      from: clampMemoryScore(previousRuntime?.stabilityScore, 0, 1, 0),
      to: stabilityScore
    },
    impressionFloor: {
      from: clampMemoryScore(previousRuntime?.impressionFloor, 0, 1, 0),
      to: impressionFloor
    },
    decayRate: {
      from: Math.max(0, normalizeFiniteNumber(previousRuntime?.decayRate, 0)),
      to: decayRate
    },
    cueRecallThreshold: {
      from: clampMemoryScore(previousRuntime?.cueRecallThreshold, 0, 1, 0),
      to: cueRecallThreshold
    }
  };
  const hasMeaningfulDecayChange =
    Math.abs(decayDeltas.activationScore.to - decayDeltas.activationScore.from) >= 0.03 ||
    Math.abs(decayDeltas.stabilityScore.to - decayDeltas.stabilityScore.from) >= 0.02 ||
    Math.abs(decayDeltas.impressionFloor.to - decayDeltas.impressionFloor.from) >= 0.02 ||
    String(previousRuntime?.algorithmVersion || "").trim() !== runtimeResult.algorithmVersion;
  const result = {
    runtimeState: runtimeResult,
    status: nextStatus,
    changes: {
      decay: decayDeltas,
      status: {
        from: normalizeMemoryStatus(resolvedItem.status, "active"),
        to: nextStatus
      }
    },
    flags: {
      hasMeaningfulDecayChange,
      statusChanged: normalizeMemoryStatus(resolvedItem.status, "active") !== nextStatus
    },
    derived: {
      importanceScore,
      confidenceScore,
      emotionScore,
      reinforceScore,
      typeBias,
      halfLifeDays,
      daysSinceLastObserved: Number.isFinite(daysSinceLastObserved) ? daysSinceLastObserved : null,
      daysSinceLastReinforced: Number.isFinite(daysSinceLastReinforced) ? daysSinceLastReinforced : null,
      daysSinceLastRecalled: Number.isFinite(daysSinceLastRecalled) ? daysSinceLastRecalled : null,
      deltaDays
    }
  };
  result.runtimeState.debugPayload = buildMemoryDecayDebugPayload(
    resolvedItem,
    previousRuntime,
    result,
    now
  );
  return result;
}

async function applyMemoryDecayRecomputeInDb(db, memoryId = "", options = {}) {
  const requestOptions = options && typeof options === "object" ? options : {};
  const loaded = await loadMemoryItemWithRuntime(db, memoryId);
  if (!loaded?.item?.id) {
    return null;
  }
  const now = requestOptions.now instanceof Date ? requestOptions.now : new Date();
  const batchId = normalizeOptionalText(requestOptions.batchId) || randomUUID();
  const actorType = requestOptions.actorType || "node_backend";
  const actorRef = requestOptions.actorRef;
  const sourceKind = requestOptions.sourceKind || "memory_decay_recompute";
  const reasonCode = requestOptions.reasonCode || "manual_memory_recompute";
  const sourceRef = normalizeJsonObjectValue(requestOptions.sourceRef, {});
  const beforeItem = loaded.item;
  const beforeRuntime = loaded.runtimeState || buildInitialMemoryRuntimeState(beforeItem);
  const recomputed = recomputeMemoryRuntimeState(beforeItem, beforeRuntime, {
    now,
    decayConfig: requestOptions.decayConfig
  });
  const result = {
    memoryId: beforeItem.id,
    contactId: beforeItem.contactId,
    dryRun: Boolean(requestOptions.dryRun),
    before: {
      item: beforeItem,
      runtimeState: beforeRuntime
    },
    after: {
      item: {
        ...beforeItem,
        status: recomputed.status,
        archivedAt:
          recomputed.status === "archived"
            ? beforeItem.archivedAt || now.toISOString()
            : recomputed.status !== beforeItem.status
              ? null
              : beforeItem.archivedAt
      },
      runtimeState: recomputed.runtimeState
    },
    changes: recomputed.changes,
    events: [],
    wouldWriteEvents: []
  };
  if (recomputed.flags.hasMeaningfulDecayChange) {
    result.wouldWriteEvents.push("decayed");
  }
  if (recomputed.flags.statusChanged) {
    result.wouldWriteEvents.push("status_changed");
  }
  if (requestOptions.dryRun) {
    return result;
  }

  let runtimeRow = null;
  if (loaded.runtimeState?.memoryItemId) {
    const runtimeUpdateResult = await db.query(
      `
        update memory_runtime_state
        set activation_score = $2,
            stability_score = $3,
            impression_floor = $4,
            decay_rate = $5,
            cue_recall_threshold = $6,
            last_computed_at = $7,
            last_decay_at = $8,
            next_decay_at = $9,
            algorithm_version = $10,
            debug_payload = $11::jsonb,
            updated_at = now()
        where memory_item_id = $1
        returning *
      `,
      [
        beforeItem.id,
        recomputed.runtimeState.activationScore,
        recomputed.runtimeState.stabilityScore,
        recomputed.runtimeState.impressionFloor,
        recomputed.runtimeState.decayRate,
        recomputed.runtimeState.cueRecallThreshold,
        recomputed.runtimeState.lastComputedAt,
        recomputed.runtimeState.lastDecayAt,
        recomputed.runtimeState.nextDecayAt,
        recomputed.runtimeState.algorithmVersion,
        JSON.stringify(recomputed.runtimeState.debugPayload || {})
      ]
    );
    runtimeRow = runtimeUpdateResult.rows[0] || null;
  } else {
    const runtimeInsertResult = await db.query(
      `
        insert into memory_runtime_state (
          memory_item_id,
          activation_score,
          stability_score,
          impression_floor,
          decay_rate,
          cue_recall_threshold,
          last_computed_at,
          last_decay_at,
          next_decay_at,
          algorithm_version,
          debug_payload,
          created_at,
          updated_at
        )
        values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11::jsonb, now(), now())
        returning *
      `,
      [
        beforeItem.id,
        recomputed.runtimeState.activationScore,
        recomputed.runtimeState.stabilityScore,
        recomputed.runtimeState.impressionFloor,
        recomputed.runtimeState.decayRate,
        recomputed.runtimeState.cueRecallThreshold,
        recomputed.runtimeState.lastComputedAt,
        recomputed.runtimeState.lastDecayAt,
        recomputed.runtimeState.nextDecayAt,
        recomputed.runtimeState.algorithmVersion,
        JSON.stringify(recomputed.runtimeState.debugPayload || {})
      ]
    );
    runtimeRow = runtimeInsertResult.rows[0] || null;
  }
  let itemRow = null;
  if (recomputed.flags.statusChanged) {
    const archivedAt =
      recomputed.status === "archived"
        ? beforeItem.archivedAt || now.toISOString()
        : recomputed.status !== beforeItem.status
          ? null
          : beforeItem.archivedAt;
    const nextSummaryFaint =
      (recomputed.status === "faint" || recomputed.status === "dormant") &&
      needsMemorySummaryFaintFallback(beforeItem.summaryFaint)
        ? buildFallbackMemorySummaryFaint(beforeItem.summaryShort, beforeItem.canonicalText)
        : beforeItem.summaryFaint;
    const itemUpdateResult = await db.query(
      `
        update memory_items
        set status = $2,
            status_changed_at = now(),
            archived_at = $3,
            summary_faint = $4,
            updated_at = now()
        where id = $1
        returning *
      `,
      [beforeItem.id, recomputed.status, archivedAt, nextSummaryFaint]
    );
    itemRow = itemUpdateResult.rows[0] || null;
  } else {
    const itemLoaded = await db.query("select * from memory_items where id = $1 limit 1", [beforeItem.id]);
    itemRow = itemLoaded.rows[0] || null;
  }

  if (recomputed.flags.hasMeaningfulDecayChange) {
    result.events.push(
      await insertMemoryEvent(db, {
        memoryItemId: beforeItem.id,
        contactId: beforeItem.contactId,
        eventType: "decayed",
        actorType,
        actorRef,
        sourceKind,
        sourceRef,
        reasonCode,
        deltaPayload: {
          runtime: recomputed.changes.decay,
          deltaDays: recomputed.derived.deltaDays
        },
        batchId,
        note: requestOptions.note
      })
    );
  }
  if (recomputed.flags.statusChanged) {
    result.events.push(
      await insertMemoryEvent(db, {
        memoryItemId: beforeItem.id,
        contactId: beforeItem.contactId,
        eventType: "status_changed",
        actorType,
        actorRef,
        sourceKind,
        sourceRef,
        reasonCode,
        deltaPayload: {
          status: {
            from: beforeItem.status,
            to: recomputed.status
          }
        },
        beforeSnapshot: createMemorySnapshot({
          ...beforeItem,
          contact_id: beforeItem.contactId,
          scope_type: beforeItem.scopeType,
          source_conversation_id: beforeItem.sourceConversationId,
          memory_type: beforeItem.memoryType,
          memory_subtype: beforeItem.memorySubtype,
          semantic_key: beforeItem.semanticKey,
          canonical_text: beforeItem.canonicalText,
          summary_short: beforeItem.summaryShort,
          summary_faint: beforeItem.summaryFaint,
          base_importance: beforeItem.baseImportance,
          confidence: beforeItem.confidence,
          status: beforeItem.status,
          emotion_intensity: beforeItem.emotionIntensity,
          emotion_profile: beforeItem.emotionProfile,
          interaction_tendency: beforeItem.interactionTendency,
          emotion_summary: beforeItem.emotionSummary,
          first_observed_at: beforeItem.firstObservedAt,
          last_observed_at: beforeItem.lastObservedAt,
          last_reinforced_at: beforeItem.lastReinforcedAt,
          last_recalled_at: beforeItem.lastRecalledAt
        }),
        afterSnapshot: createMemorySnapshot(itemRow),
        batchId,
        note: requestOptions.note
      })
    );
  }
  result.after = {
    item: mapMemoryItemRow(itemRow),
    runtimeState: mapMemoryRuntimeStateRow(runtimeRow)
  };
  return result;
}

function getMemoryDecayWorkerStatus() {
  return {
    enabled: Boolean(pool && MEMORY_DECAY_WORKER_ENABLED),
    configuredEnabled: MEMORY_DECAY_WORKER_ENABLED,
    running: memoryDecayWorkerRunning,
    intervalMs: MEMORY_DECAY_WORKER_INTERVAL_MS,
    startDelayMs: MEMORY_DECAY_WORKER_START_DELAY_MS,
    batchSize: MEMORY_DECAY_WORKER_BATCH_SIZE,
    nextRunAt: memoryDecayWorkerNextRunAt,
    lastRunAt: memoryDecayWorkerLastRun,
    lastSummary: memoryDecayWorkerLastSummary,
    lastError: memoryDecayWorkerLastError
  };
}

async function tryAcquireMemoryDecayWorkerLock(db) {
  const result = await db.query("select pg_try_advisory_lock($1::bigint) as locked", [
    MEMORY_DECAY_WORKER_LOCK_ID
  ]);
  return Boolean(result.rows[0]?.locked);
}

async function releaseMemoryDecayWorkerLock(db) {
  try {
    await db.query("select pg_advisory_unlock($1::bigint)", [MEMORY_DECAY_WORKER_LOCK_ID]);
  } catch (_error) {
  }
}

async function loadDueMemoryDecayIds(db, limit = MEMORY_DECAY_WORKER_BATCH_SIZE) {
  const result = await db.query(
    `
      select i.id
      from memory_items i
      left join memory_runtime_state r on r.memory_item_id = i.id
      where (r.next_decay_at is null or r.next_decay_at <= now())
        and i.status <> 'archived'
        and i.status <> 'superseded'
      order by coalesce(r.next_decay_at, i.updated_at) asc, i.updated_at desc
      limit $1
    `,
    [limit]
  );
  return result.rows.map((row) => row.id).filter(Boolean);
}

async function runMemoryDecayWorkerOnce(options = {}) {
  if (!pool || !MEMORY_DECAY_WORKER_ENABLED) {
    return {
      skipped: true,
      reason: !pool ? "database_unavailable" : "worker_disabled"
    };
  }
  if (memoryDecayWorkerRunning) {
    return {
      skipped: true,
      reason: "already_running"
    };
  }

  const requestOptions = options && typeof options === "object" ? options : {};
  const limit = clampIntegerEnv(
    requestOptions.limit,
    MEMORY_DECAY_WORKER_BATCH_SIZE,
    1,
    200
  );
  const client = await pool.connect();
  const now = new Date();
  const batchId = randomUUID();
  let lockAcquired = false;
  let transactionStarted = false;
  memoryDecayWorkerRunning = true;
  memoryDecayWorkerLastRun = now.toISOString();
  memoryDecayWorkerLastError = "";

  try {
    lockAcquired = await tryAcquireMemoryDecayWorkerLock(client);
    if (!lockAcquired) {
      const finishedAt = new Date().toISOString();
      const summary = {
        skipped: true,
        reason: "lock_not_acquired",
        requestedCount: 0,
        processedCount: 0,
        batchId,
        startedAt: now.toISOString(),
        finishedAt,
        durationMs: Math.max(0, Date.now() - now.getTime()),
        workerBatchSize: limit,
        error: ""
      };
      memoryDecayWorkerLastSummary = summary;
      await persistMemoryDecayWorkerRun(summary).catch(() => {
      });
      return summary;
    }

    await client.query("begin");
    transactionStarted = true;
    const ids = await loadDueMemoryDecayIds(client, limit);
    const results = [];
    for (const id of ids) {
      const recomputed = await applyMemoryDecayRecomputeInDb(client, id, {
        dryRun: false,
        now,
        batchId,
        actorType: "node_backend",
        actorRef: "memory_decay_worker",
        sourceKind: "memory_decay_worker",
        reasonCode: "scheduled_due_decay",
        sourceRef: {
          trigger: "scheduled_due_scan",
          workerIntervalMs: MEMORY_DECAY_WORKER_INTERVAL_MS,
          workerBatchSize: limit
        },
        note: "Scheduled memory decay recompute."
      });
      if (recomputed) {
        results.push(recomputed);
      }
    }
    await client.query("commit");
    transactionStarted = false;

    const finishedAt = new Date().toISOString();
    const summary = {
      skipped: false,
      batchId,
      startedAt: now.toISOString(),
      finishedAt,
      durationMs: Math.max(0, Date.now() - now.getTime()),
      requestedCount: ids.length,
      processedCount: results.length,
      statusChangedCount: results.filter(
        (item) => item.changes?.status?.from && item.changes?.status?.from !== item.changes?.status?.to
      ).length,
      decayedEventCount: results.filter((item) => item.wouldWriteEvents.includes("decayed")).length,
      workerBatchSize: limit,
      error: ""
    };
    memoryDecayWorkerLastSummary = summary;
    await persistMemoryDecayWorkerRun(summary).catch(() => {
    });
    if (ids.length || requestOptions.logEmptyRun) {
      console.log("[Pulse Server] Memory decay worker run completed.", summary);
    }
    return summary;
  } catch (error) {
    if (transactionStarted) {
      try {
        await client.query("rollback");
      } catch (_rollbackError) {
      }
    }
    memoryDecayWorkerLastError = error?.message || "Unknown memory decay worker error";
    const finishedAt = new Date().toISOString();
    memoryDecayWorkerLastSummary = {
      skipped: false,
      batchId,
      startedAt: now.toISOString(),
      finishedAt,
      durationMs: Math.max(0, Date.now() - now.getTime()),
      workerBatchSize: limit,
      error: memoryDecayWorkerLastError
    };
    await persistMemoryDecayWorkerRun(memoryDecayWorkerLastSummary, memoryDecayWorkerLastError).catch(() => {
    });
    console.error("[Pulse Server] Memory decay worker failed:", error);
    throw error;
  } finally {
    if (lockAcquired) {
      await releaseMemoryDecayWorkerLock(client);
    }
    client.release();
    memoryDecayWorkerRunning = false;
  }
}

function scheduleNextMemoryDecayWorkerRun(delayMs) {
  memoryDecayWorkerNextRunAt = new Date(Date.now() + Math.max(0, delayMs)).toISOString();
}

function startMemoryDecayWorker() {
  if (!pool || !MEMORY_DECAY_WORKER_ENABLED) {
    if (!MEMORY_DECAY_WORKER_ENABLED) {
      console.log("[Pulse Server] Memory decay worker is disabled.");
    }
    return;
  }
  if (memoryDecayWorkerTimer || memoryDecayWorkerStartTimer) {
    return;
  }

  const runScheduledDecay = () => {
    scheduleNextMemoryDecayWorkerRun(MEMORY_DECAY_WORKER_INTERVAL_MS);
    void runMemoryDecayWorkerOnce().catch(() => {
    });
  };

  scheduleNextMemoryDecayWorkerRun(MEMORY_DECAY_WORKER_START_DELAY_MS);
  memoryDecayWorkerStartTimer = setTimeout(() => {
    memoryDecayWorkerStartTimer = null;
    runScheduledDecay();
    memoryDecayWorkerTimer = setInterval(runScheduledDecay, MEMORY_DECAY_WORKER_INTERVAL_MS);
    if (typeof memoryDecayWorkerTimer.unref === "function") {
      memoryDecayWorkerTimer.unref();
    }
  }, MEMORY_DECAY_WORKER_START_DELAY_MS);
  if (typeof memoryDecayWorkerStartTimer.unref === "function") {
    memoryDecayWorkerStartTimer.unref();
  }
  console.log(
    `[Pulse Server] Memory decay worker scheduled every ${MEMORY_DECAY_WORKER_INTERVAL_MS}ms.`
  );
}

function stopMemoryDecayWorker() {
  if (memoryDecayWorkerStartTimer) {
    clearTimeout(memoryDecayWorkerStartTimer);
    memoryDecayWorkerStartTimer = null;
  }
  if (memoryDecayWorkerTimer) {
    clearInterval(memoryDecayWorkerTimer);
    memoryDecayWorkerTimer = null;
  }
  memoryDecayWorkerNextRunAt = null;
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
        next_decay_at,
        algorithm_version,
        debug_payload,
        created_at,
        updated_at
      )
      values ($1, $2, $3, $4, $5, $6, now(), $7, $8, $9::jsonb, now(), now())
      returning *
    `,
    [
      savedItem.id,
      normalizeFiniteNumber(runtime.activationScore ?? runtime.activation_score, 0),
      normalizeFiniteNumber(runtime.stabilityScore ?? runtime.stability_score, 0),
      normalizeFiniteNumber(runtime.impressionFloor ?? runtime.impression_floor, 0),
      normalizeFiniteNumber(runtime.decayRate ?? runtime.decay_rate, 0),
      normalizeFiniteNumber(runtime.cueRecallThreshold ?? runtime.cue_recall_threshold, 0),
      normalizeTimestampValue(runtime.nextDecayAt ?? runtime.next_decay_at, buildNextMemoryDecayAt()),
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
    summaryFaint: needsMemorySummaryFaintFallback(candidate.summaryFaint || fallbackItem.summaryFaint)
      ? buildFallbackMemorySummaryFaint(
          candidate.summaryShort ||
            candidate.canonicalText ||
            fallbackItem.summaryShort ||
            fallbackItem.canonicalText ||
            "",
          candidate.canonicalText || fallbackItem.canonicalText || ""
        )
      : candidate.summaryFaint || fallbackItem.summaryFaint || "",
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

const MEMORY_REPORT_BAD_PREFIX_RE = /^\s*(你隐约记得|我隐约记得|隐约记得)/;
const MEMORY_REPORT_AMBIGUOUS_PRONOUN_RE = /[你我他她]|我们|咱们|用户|联系人/;
const MEMORY_REPORT_PLACEHOLDER_RE = /charname|username/i;
const MEMORY_REPORT_GENERIC_SEMANTIC_KEY_RE = /^(legacy|auto):[a-z0-9_-]{4,}$/i;
const MEMORY_REPORT_CUE_SOURCES = new Set(["explicit", "derived", "alias", "recent_user"]);
const MEMORY_REPORT_CUE_STRENGTHS = new Set(["strong", "weak"]);
const MEMORY_REPORT_GENERIC_CUE_TERMS = [
  "喜欢",
  "事情",
  "印象",
  "关系",
  "聊天",
  "记得",
  "似乎",
  "觉得",
  "感觉",
  "部分",
  "内容",
  "情况",
  "有点"
];

const app = express();
function normalizeMemoryCueStrength(value = "") {
  const resolved = String(value || "").trim().toLowerCase();
  return MEMORY_REPORT_CUE_STRENGTHS.has(resolved) ? resolved : "";
}

function normalizeMemoryCueSources(value = []) {
  return Array.from(
    new Set(
      normalizeJsonArrayValue(value, [])
        .map((item) => String(item || "").trim().toLowerCase())
        .filter((item) => MEMORY_REPORT_CUE_SOURCES.has(item))
    )
  );
}

function isMemoryGenericCueTerm(value = "") {
  const normalized = canonicalizeMemoryCompareText(value);
  if (!normalized) {
    return true;
  }
  return MEMORY_REPORT_GENERIC_CUE_TERMS.some(
    (term) => canonicalizeMemoryCompareText(term) === normalized
  );
}

function buildMemoryIssueSample(source = {}) {
  return {
    id: String(source.id || "").trim(),
    contactId: String(source.contactId || source.contact_id || "").trim(),
    contactName: String(source.contactName || source.contact_name || "").trim(),
    status: normalizeMemoryStatus(source.status),
    memoryType: normalizeMemoryType(source.memoryType || source.memory_type),
    semanticKey: String(source.semanticKey || source.semantic_key || "").trim(),
    canonicalText: String(source.canonicalText || source.canonical_text || "").trim(),
    summaryShort: String(source.summaryShort || source.summary_short || "").trim(),
    summaryFaint: String(source.summaryFaint || source.summary_faint || "").trim(),
    keywords: normalizeJsonArrayValue(source.keywords, []),
    entityRefs: normalizeJsonArrayValue(source.entityRefs || source.entity_refs, []),
    updatedAt: source.updatedAt || source.updated_at || null
  };
}

function buildMemoryItemQualityChecks(item = {}) {
  const summaryFaint = String(item.summaryFaint || "").trim();
  const combinedText = [item.canonicalText, item.summaryShort, summaryFaint]
    .map((value) => String(value || "").trim())
    .filter(Boolean)
    .join("\n");
  const semanticKey = String(item.semanticKey || "").trim();
  const keywords = normalizeJsonArrayValue(item.keywords, [])
    .map((value) => String(value || "").trim())
    .filter(Boolean);
  const entityRefs = normalizeJsonArrayValue(item.entityRefs, [])
    .map((value) => String(value || "").trim())
    .filter(Boolean);
  const emotionProfile = normalizeJsonObjectValue(item.emotionProfile, {});
  const interactionTendency = normalizeJsonObjectValue(item.interactionTendency, {});
  const keywordsWeak = !keywords.length || keywords.every((term) => isMemoryGenericCueTerm(term));
  const entityRefsWeak =
    !entityRefs.length || entityRefs.every((term) => isMemoryGenericCueTerm(term));
  const emotionProfileEmpty = !Object.keys(emotionProfile).length;
  const interactionTendencyEmpty = !Object.keys(interactionTendency).length;
  return {
    badPrefix: MEMORY_REPORT_BAD_PREFIX_RE.test(summaryFaint),
    ambiguousPronoun: MEMORY_REPORT_AMBIGUOUS_PRONOUN_RE.test(summaryFaint),
    placeholderLeak: MEMORY_REPORT_PLACEHOLDER_RE.test(combinedText),
    emptySummaryFaint:
      ["faint", "dormant"].includes(normalizeMemoryStatus(item.status)) && !summaryFaint,
    summaryFaintTooLong: summaryFaint.length > 90,
    semanticKeyWeak: !semanticKey || MEMORY_REPORT_GENERIC_SEMANTIC_KEY_RE.test(semanticKey),
    keywordsWeak,
    entityRefsWeak,
    cueTermsWeak: keywordsWeak && entityRefsWeak,
    emotionProfileEmpty,
    interactionTendencyEmpty,
    emotionStructureEmpty: emotionProfileEmpty && interactionTendencyEmpty
  };
}

function buildMemoryQualityReportFromRows(rows = [], sampleLimit = 50) {
  const cappedSampleLimit = Math.min(100, Math.max(1, sampleLimit || 50));
  const issues = {
    badPrefix: { count: 0, samples: [] },
    ambiguousPronoun: { count: 0, samples: [] },
    placeholderLeak: { count: 0, samples: [] },
    emptySummaryFaint: { count: 0, samples: [] },
    summaryFaintTooLong: { count: 0, samples: [] },
    semanticKeyWeak: { count: 0, samples: [] },
    duplicateCanonical: { count: 0, samples: [] },
    cueTermsWeak: { count: 0, samples: [] },
    emotionProfileEmpty: { count: 0, samples: [] },
    interactionTendencyEmpty: { count: 0, samples: [] },
    emotionStructureEmpty: { count: 0, samples: [] }
  };
  const normalizedRows = rows.map((row) => {
    const item = mapMemoryItemRow(row);
    return {
      row,
      item,
      sample: buildMemoryIssueSample({
        ...row,
        ...item,
        contact_name: row.contact_name || ""
      }),
      checks: buildMemoryItemQualityChecks(item),
      normalizedCanonical: canonicalizeMemoryCompareText(item.canonicalText)
    };
  });

  function addIssueSample(issueKey, sample) {
    if (!issues[issueKey]) {
      return;
    }
    issues[issueKey].count += 1;
    if (issues[issueKey].samples.length < cappedSampleLimit) {
      issues[issueKey].samples.push(sample);
    }
  }

  normalizedRows.forEach((entry) => {
    if (entry.checks.badPrefix) {
      addIssueSample("badPrefix", entry.sample);
    }
    if (entry.checks.ambiguousPronoun) {
      addIssueSample("ambiguousPronoun", entry.sample);
    }
    if (entry.checks.placeholderLeak) {
      addIssueSample("placeholderLeak", entry.sample);
    }
    if (entry.checks.emptySummaryFaint) {
      addIssueSample("emptySummaryFaint", entry.sample);
    }
    if (entry.checks.summaryFaintTooLong) {
      addIssueSample("summaryFaintTooLong", entry.sample);
    }
    if (entry.checks.semanticKeyWeak) {
      addIssueSample("semanticKeyWeak", entry.sample);
    }
    if (entry.checks.cueTermsWeak) {
      addIssueSample("cueTermsWeak", entry.sample);
    }
    if (entry.checks.emotionProfileEmpty) {
      addIssueSample("emotionProfileEmpty", entry.sample);
    }
    if (entry.checks.interactionTendencyEmpty) {
      addIssueSample("interactionTendencyEmpty", entry.sample);
    }
    if (entry.checks.emotionStructureEmpty) {
      addIssueSample("emotionStructureEmpty", entry.sample);
    }
  });

  const duplicatePairKeys = new Set();
  const duplicateBuckets = new Map();
  normalizedRows.forEach((entry) => {
    if (entry.normalizedCanonical.length < 8) {
      return;
    }
    const bucketKey = `${entry.item.contactId}:${entry.item.memoryType}:${entry.normalizedCanonical.slice(0, 12)}`;
    if (!duplicateBuckets.has(bucketKey)) {
      duplicateBuckets.set(bucketKey, []);
    }
    duplicateBuckets.get(bucketKey).push(entry);
  });
  duplicateBuckets.forEach((entries) => {
    for (let leftIndex = 0; leftIndex < entries.length; leftIndex += 1) {
      for (let rightIndex = leftIndex + 1; rightIndex < entries.length; rightIndex += 1) {
        const left = entries[leftIndex];
        const right = entries[rightIndex];
        if (!memoryTextsLookSimilar(left.item.canonicalText, right.item.canonicalText)) {
          continue;
        }
        const pairKey = [left.item.id, right.item.id].sort().join(":");
        if (duplicatePairKeys.has(pairKey)) {
          continue;
        }
        duplicatePairKeys.add(pairKey);
        issues.duplicateCanonical.count += 1;
        if (issues.duplicateCanonical.samples.length < cappedSampleLimit) {
          issues.duplicateCanonical.samples.push({
            contactId: left.item.contactId,
            contactName: left.sample.contactName || right.sample.contactName || "",
            primary: left.sample,
            secondary: right.sample
          });
        }
      }
    }
  });

  return {
    totalItems: normalizedRows.length,
    counts: Object.fromEntries(
      Object.entries(issues).map(([key, value]) => [key, value.count])
    ),
    samples: Object.fromEntries(
      Object.entries(issues).map(([key, value]) => [key, value.samples])
    )
  };
}

function buildMemoryPromptEligibility(item = {}) {
  const resolvedStatus = normalizeMemoryStatus(item.status);
  const promptKind = item.memoryType === "scene" ? "scene" : "core";
  const promptText =
    resolvedStatus === "faint"
      ? String(item.summaryFaint || item.summaryShort || item.canonicalText || "").trim()
      : String(item.summaryShort || item.canonicalText || "").trim();
  const hasPromptText = Boolean(promptText);
  return {
    promptKind,
    status: resolvedStatus,
    hasPromptText,
    requiresCue: resolvedStatus === "dormant",
    mayEnterWithoutCue: hasPromptText && ["active", "faint"].includes(resolvedStatus),
    mayEnterWithCue: hasPromptText && resolvedStatus === "dormant",
    blockedReason:
      hasPromptText && ["active", "faint", "dormant"].includes(resolvedStatus)
        ? ""
        : "status_or_prompt_text_not_ready"
  };
}

function buildMemoryEventSummary(events = []) {
  const eventTypeCounts = {};
  const reasonCodeCounts = {};
  events.forEach((event) => {
    const eventType = normalizeMemoryEventType(event.eventType || event.event_type);
    const reasonCode = String(event.reasonCode || event.reason_code || "").trim();
    eventTypeCounts[eventType] = (eventTypeCounts[eventType] || 0) + 1;
    if (reasonCode) {
      reasonCodeCounts[reasonCode] = (reasonCodeCounts[reasonCode] || 0) + 1;
    }
  });
  return {
    eventTypeCounts,
    reasonCodeCounts
  };
}

function buildMemoryLifecycleEventSample(event = {}) {
  const deltaPayload = normalizeJsonObjectValue(event.deltaPayload || event.delta_payload, {});
  return {
    id: String(event.id || "").trim(),
    eventType: normalizeMemoryEventType(event.eventType || event.event_type),
    eventTime: event.eventTime || event.event_time || null,
    reasonCode: String(event.reasonCode || event.reason_code || "").trim(),
    status: normalizeJsonObjectValue(deltaPayload.status, null),
    cueStrength: normalizeMemoryCueStrength(deltaPayload.cueStrength),
    cueSources: normalizeMemoryCueSources(deltaPayload.cueSources),
    cueTerms: normalizeJsonArrayValue(deltaPayload.cueTerms, []),
    cueScore:
      deltaPayload.cueScore == null ? null : normalizeFiniteNumber(deltaPayload.cueScore, 0),
    cueThreshold:
      deltaPayload.cueThreshold == null
        ? null
        : normalizeFiniteNumber(deltaPayload.cueThreshold, 0)
  };
}

function findSimilarMemoryItems(targetItem = {}, rows = [], limit = 5) {
  const normalizedTargetText = canonicalizeMemoryCompareText(targetItem.canonicalText);
  if (!normalizedTargetText || normalizedTargetText.length < 8) {
    return [];
  }
  return rows
    .map((row) => mapMemoryItemRow(row))
    .filter((item) => item.id && item.id !== targetItem.id && item.contactId === targetItem.contactId)
    .filter((item) => memoryTextsLookSimilar(targetItem.canonicalText, item.canonicalText))
    .slice(0, Math.max(1, limit))
    .map((item) => buildMemoryIssueSample(item));
}

async function loadMemoryRowsForQuality(db, options = {}) {
  const requestOptions = options && typeof options === "object" ? options : {};
  const params = [];
  const clauses = [];
  if (requestOptions.contactId) {
    params.push(String(requestOptions.contactId || "").trim());
    clauses.push(`mi.contact_id = $${params.length}`);
  }
  const result = await db.query(
    `
      select
        mi.*,
        coalesce(cc.name, '') as contact_name
      from memory_items mi
      left join chat_contacts cc on cc.id = mi.contact_id
      ${clauses.length ? `where ${clauses.join(" and ")}` : ""}
      order by mi.updated_at desc nulls last, mi.id asc
    `,
    params
  );
  return result.rows;
}

async function persistMemoryDecayWorkerRun(summary = {}, errorMessage = "") {
  if (!pool) {
    return null;
  }
  const runId = randomUUID();
  const resolvedSummary = normalizeJsonObjectValue(summary, {});
  const status = errorMessage
    ? "failed"
    : resolvedSummary.skipped
      ? "skipped"
      : "completed";
  await pool.query(
    `
      insert into migration_runs (id, type, status, started_at, finished_at, summary, error)
      values ($1, 'memory_decay_worker', $2, $3::timestamptz, $4::timestamptz, $5::jsonb, $6)
    `,
    [
      runId,
      status,
      normalizeTimestampValue(resolvedSummary.startedAt, new Date().toISOString()),
      normalizeTimestampValue(resolvedSummary.finishedAt, new Date().toISOString()),
      JSON.stringify(resolvedSummary),
      errorMessage || null
    ]
  );
  return runId;
}

function normalizeForumBackgroundSourceType(value = "", fallback = "worldbook_entry") {
  const normalized = String(value || "").trim().toLowerCase();
  return FORUM_BACKGROUND_SOURCE_TYPES.has(normalized) ? normalized : fallback;
}

function normalizeForumBackgroundSourceLayer(value = "", fallback = "tab_background") {
  const normalized = String(value || "").trim().toLowerCase();
  return FORUM_BACKGROUND_SOURCE_LAYERS.has(normalized) ? normalized : fallback;
}

function normalizeForumBackgroundSourceSegmentKey(value = "", fallback = "") {
  const normalized = String(value || "").trim().toLowerCase();
  return FORUM_BACKGROUND_SOURCE_SEGMENT_KEYS.has(normalized) ? normalized : fallback;
}

function getForumBackgroundSourceSegmentDefinition(value = "") {
  const resolvedKey = normalizeForumBackgroundSourceSegmentKey(value, "");
  return FORUM_BACKGROUND_SOURCE_SEGMENTS.find((item) => item.key === resolvedKey) || null;
}

function formatForumBackgroundSourceSegmentLabel(value = "") {
  const definition = getForumBackgroundSourceSegmentDefinition(value);
  return definition?.label || String(value || "").trim() || "未分段";
}

function normalizeForumBackgroundTruthLevel(value = "", fallback = "community_viewpoint") {
  const normalized = String(value || "").trim().toLowerCase();
  return FORUM_BACKGROUND_TRUTH_LEVELS.has(normalized) ? normalized : fallback;
}

function normalizeForumBackgroundCardStatus(value = "", fallback = "candidate") {
  const normalized = String(value || "").trim().toLowerCase();
  return FORUM_BACKGROUND_CARD_STATUSES.has(normalized) ? normalized : fallback;
}

function normalizeForumBackgroundRunStatus(value = "", fallback = "dirty") {
  const normalized = String(value || "").trim().toLowerCase();
  return FORUM_BACKGROUND_EXTRACTION_RUN_STATUSES.has(normalized) ? normalized : fallback;
}

function normalizeForumBackgroundEventType(value = "", fallback = "edited") {
  const normalized = String(value || "").trim().toLowerCase();
  return FORUM_BACKGROUND_CARD_EVENT_TYPES.has(normalized) ? normalized : fallback;
}

function normalizeForumBackgroundGenerationType(value = "", fallback = "posts") {
  const normalized = String(value || "").trim().toLowerCase();
  return FORUM_BACKGROUND_GENERATION_TYPES.has(normalized) ? normalized : fallback;
}

function normalizeForumBackgroundDetailLevel(value = "", fallback = "standard") {
  const normalized = String(value || "").trim().toLowerCase();
  return FORUM_BACKGROUND_DETAIL_LEVELS.has(normalized) ? normalized : fallback;
}

function normalizeForumBackgroundTextArray(value = [], fallback = []) {
  return Array.from(
    new Set(
      normalizeJsonArrayValue(value, fallback)
        .map((item) => String(item || "").trim())
        .filter(Boolean)
    )
  );
}

function normalizeForumTabRecord(tab = {}, index = 0) {
  const source = normalizeJsonObjectValue(tab, {});
  const rawName = source.name || source.label || source.title || "";
  const rawAudience =
    source.audience ||
    source.userPosition ||
    source.userProfile ||
    source.positioning ||
    source.targetAudience ||
    "";
  const rawDiscussionText =
    source.discussionText || source.text || source.prompt || source.content || source.description || "";
  const rawHotTopic =
    source.hotTopic || source.hotspot || source.hotText || source.topicText || source.topic || "";
  return {
    id:
      String(
        source.id ||
          source.feedId ||
          source.key ||
          `custom_${index}_${hashMemoryText(`${rawName}-${rawDiscussionText}-${rawHotTopic}`)}`
      ).trim(),
    name: String(rawName || "自定义页签").trim(),
    audience: String(rawAudience || "").trim(),
    discussionText: String(rawDiscussionText || "").trim(),
    hotTopic: String(rawHotTopic || "").trim(),
    worldbookIds: normalizeForumBackgroundTextArray(
      source.worldbookIds ||
        source.mountedWorldbookIds ||
        source.worldbooks ||
        source.worldbookEntries ||
        []
    )
  };
}

function normalizeForumCustomTabs(value = []) {
  return normalizeJsonArrayValue(value, [])
    .map((item, index) => normalizeForumTabRecord(item, index))
    .filter((item) => item.id && item.name);
}

function findForumTabById(tabs = [], tabId = "") {
  const resolvedTabId = String(tabId || "").trim();
  if (!resolvedTabId) {
    return null;
  }
  return normalizeForumCustomTabs(tabs).find((item) => item.id === resolvedTabId) || null;
}

function findForumTabByName(tabs = [], tabName = "") {
  const resolvedName = String(tabName || "").trim();
  if (!resolvedName) {
    return null;
  }
  return normalizeForumCustomTabs(tabs).find((item) => item.name === resolvedName) || null;
}

function mapForumBackgroundSourcePolicyRow(row = {}) {
  return {
    id: String(row.id || "").trim(),
    tabId: String(row.tab_id || "").trim(),
    sourceRefType: normalizeForumBackgroundSourceType(row.source_ref_type, "worldbook_entry"),
    sourceRefId: String(row.source_ref_id || "").trim(),
    sourceTitle: String(row.source_title || "").trim(),
    sourceLayer: normalizeForumBackgroundSourceLayer(row.source_layer),
    knowledgeDomains: normalizeForumBackgroundTextArray(row.knowledge_domains_jsonb, []),
    priority: clampIntegerValue(row.priority, 0, 999, 0),
    isEnabled: row.is_enabled !== false,
    metadata: normalizeJsonObjectValue(row.metadata, {}),
    createdAt: row.created_at || null,
    updatedAt: row.updated_at || null
  };
}

function mapForumBackgroundCardRow(row = {}) {
  return {
    id: String(row.id || "").trim(),
    tabId: String(row.tab_id || "").trim(),
    sourceType: normalizeForumBackgroundSourceType(row.source_type, "worldbook_entry"),
    sourceId: String(row.source_id || "").trim(),
    sourceTitle: String(row.source_title || "").trim(),
    sourceLayer: normalizeForumBackgroundSourceLayer(row.source_layer),
    sourceExcerpt: String(row.source_excerpt || "").trim(),
    truthLevel: normalizeForumBackgroundTruthLevel(row.truth_level),
    knowledgeDomain: String(row.knowledge_domain || "").trim(),
    summary: String(row.summary || "").trim(),
    detailText: String(row.detail_text || "").trim(),
    suitableRoles: normalizeForumBackgroundTextArray(row.suitable_roles_jsonb, []),
    keywords: normalizeForumBackgroundTextArray(row.keywords_jsonb, []),
    confidence: normalizeConfidenceValue(row.confidence, 0.7),
    status: normalizeForumBackgroundCardStatus(row.status),
    mentionCount: clampIntegerValue(row.mention_count, 0, 9999, 0),
    firstSeenAt: row.first_seen_at || null,
    lastSeenAt: row.last_seen_at || null,
    approvedAt: row.approved_at || null,
    archivedAt: row.archived_at || null,
    extractionRunId: String(row.extraction_run_id || "").trim(),
    metadata: normalizeJsonObjectValue(row.metadata, {}),
    createdAt: row.created_at || null,
    updatedAt: row.updated_at || null
  };
}

function createForumBackgroundCardSnapshot(row = {}) {
  const card = mapForumBackgroundCardRow(row);
  return {
    sourceType: card.sourceType,
    sourceId: card.sourceId,
    sourceTitle: card.sourceTitle,
    sourceLayer: card.sourceLayer,
    sourceExcerpt: card.sourceExcerpt,
    truthLevel: card.truthLevel,
    knowledgeDomain: card.knowledgeDomain,
    summary: card.summary,
    detailText: card.detailText,
    suitableRoles: card.suitableRoles,
    keywords: card.keywords,
    confidence: card.confidence,
    status: card.status,
    mentionCount: card.mentionCount
  };
}

function mapForumBackgroundCardEventRow(row = {}) {
  return {
    id: String(row.id || "").trim(),
    cardId: String(row.card_id || "").trim(),
    tabId: String(row.tab_id || "").trim(),
    eventType: normalizeForumBackgroundEventType(row.event_type),
    actorType: String(row.actor_type || "").trim(),
    note: String(row.note || "").trim(),
    beforeSnapshot: normalizeJsonObjectValue(row.before_snapshot, null),
    afterSnapshot: normalizeJsonObjectValue(row.after_snapshot, null),
    payload: normalizeJsonObjectValue(row.payload_jsonb, {}),
    createdAt: row.created_at || null
  };
}

function mapForumBackgroundExtractionRunRow(row = {}) {
  const sourceBundle = normalizeJsonObjectValue(row.source_bundle_jsonb, {});
  const metadata = normalizeJsonObjectValue(row.metadata, {});
  const sourceSegmentKey = normalizeForumBackgroundSourceSegmentKey(
    row.source_segment_key || sourceBundle.segmentKey || metadata.segmentKey,
    ""
  );
  return {
    id: String(row.id || "").trim(),
    tabId: String(row.tab_id || "").trim(),
    sourceSegmentKey,
    sourceSegmentLabel:
      String(sourceBundle.segmentLabel || metadata.segmentLabel || "").trim() ||
      formatForumBackgroundSourceSegmentLabel(sourceSegmentKey),
    status: normalizeForumBackgroundRunStatus(row.status),
    triggerReason: String(row.trigger_reason || "").trim(),
    sourceBundle,
    sourceBundleHash: String(row.source_bundle_hash || "").trim(),
    hotTopicHash: String(row.hot_topic_hash || "").trim(),
    candidateCount: clampIntegerValue(row.candidate_count, 0, 9999, 0),
    submittedAt: row.submitted_at || null,
    completedAt: row.completed_at || null,
    dirtySince: row.dirty_since || null,
    metadata,
    createdAt: row.created_at || null,
    updatedAt: row.updated_at || null
  };
}

function truncateForumBackgroundText(value = "", maxLength = 240) {
  const text = String(value || "").replace(/\s+/g, " ").trim();
  if (!text) {
    return "";
  }
  return text.length > maxLength ? `${text.slice(0, maxLength)}…` : text;
}

function formatForumBackgroundSourceLayerLabel(value = "") {
  const resolved = normalizeForumBackgroundSourceLayer(value);
  const labels = {
    history_base: "历史基底",
    recent_campaign: "近期主线",
    observable_timeline: "公开行程时间线",
    tab_background: "页签背景",
    hot_topic: "页签热点"
  };
  return labels[resolved] || resolved;
}

function formatForumBackgroundTruthLevelLabel(value = "") {
  const resolved = normalizeForumBackgroundTruthLevel(value);
  const labels = {
    worldbook_fact: "世界书事实",
    tab_setting: "页签设定",
    community_viewpoint: "社区观点",
    community_speculation: "社区推测",
    interpretation_frame: "解释框架",
    discussion_structure: "讨论结构"
  };
  return labels[resolved] || resolved;
}

function formatForumBackgroundRoleLabel(value = "") {
  const resolved = String(value || "").trim();
  const labels = {
    newcomer: "新入场角色",
    old_guard: "老角色",
    schedule_tracker: "行程状态型",
    career_fan: "事业粉",
    cp_digger: "CP 深挖型",
    worldbook_seed: "世界书种子型",
    fact_checker: "考据型角色"
  };
  return labels[resolved] || resolved;
}

async function createForumBackgroundCardEvent(db, options = {}) {
  const eventId = randomUUID();
  await db.query(
    `
      insert into forum_background_card_events (
        owner_id,
        id,
        card_id,
        tab_id,
        event_type,
        actor_type,
        note,
        before_snapshot,
        after_snapshot,
        payload_jsonb,
        created_at
      )
      values ($1, $2, $3, $4, $5, $6, $7, $8::jsonb, $9::jsonb, $10::jsonb, now())
    `,
    [
      String(options.ownerId || DEFAULT_STORAGE_OWNER_ID).trim(),
      eventId,
      String(options.cardId || "").trim(),
      String(options.tabId || "").trim(),
      normalizeForumBackgroundEventType(options.eventType, "edited"),
      String(options.actorType || "system").trim() || "system",
      String(options.note || "").trim(),
      options.beforeSnapshot == null ? null : stringifyJsonb(options.beforeSnapshot),
      options.afterSnapshot == null ? null : stringifyJsonb(options.afterSnapshot),
      stringifyJsonb(normalizeJsonObjectValue(options.payload, {}))
    ]
  );
  return eventId;
}

async function loadForumAppSettingsState(db, ownerId = DEFAULT_STORAGE_OWNER_ID) {
  const result = await db.query(
    `
      select forum_settings, api_state
      from app_settings
      where owner_id = $1
      limit 1
    `,
    [ownerId]
  );
  const row = result.rows[0] || {};
  return {
    forumSettings: normalizeJsonObjectValue(row.forum_settings, {}),
    apiState: normalizeJsonObjectValue(row.api_state, {})
  };
}

async function loadForumBackgroundLatestRun(db, ownerId = DEFAULT_STORAGE_OWNER_ID, tabId = "") {
  const resolvedTabId = String(tabId || "").trim();
  if (!resolvedTabId) {
    return null;
  }
  const result = await db.query(
    `
      select *
      from forum_background_extraction_runs
      where owner_id = $1 and tab_id = $2
      order by created_at desc
      limit 1
    `,
    [ownerId, resolvedTabId]
  );
  return result.rows.length ? mapForumBackgroundExtractionRunRow(result.rows[0]) : null;
}

async function loadForumBackgroundLatestRunBySegment(
  db,
  ownerId = DEFAULT_STORAGE_OWNER_ID,
  tabId = "",
  sourceSegmentKey = ""
) {
  const resolvedTabId = String(tabId || "").trim();
  const resolvedSegmentKey = normalizeForumBackgroundSourceSegmentKey(sourceSegmentKey, "");
  if (!resolvedTabId || !resolvedSegmentKey) {
    return null;
  }
  const result = await db.query(
    `
      select *
      from forum_background_extraction_runs
      where owner_id = $1
        and tab_id = $2
        and source_segment_key = $3
      order by created_at desc
      limit 1
    `,
    [ownerId, resolvedTabId, resolvedSegmentKey]
  );
  return result.rows.length ? mapForumBackgroundExtractionRunRow(result.rows[0]) : null;
}

async function loadForumBackgroundLatestRunsBySegment(
  db,
  ownerId = DEFAULT_STORAGE_OWNER_ID,
  tabId = ""
) {
  const resolvedTabId = String(tabId || "").trim();
  if (!resolvedTabId) {
    return new Map();
  }
  const result = await db.query(
    `
      select distinct on (source_segment_key) *
      from forum_background_extraction_runs
      where owner_id = $1
        and tab_id = $2
        and source_segment_key <> ''
      order by source_segment_key asc, created_at desc
    `,
    [ownerId, resolvedTabId]
  );
  return new Map(
    result.rows.map((row) => {
      const mapped = mapForumBackgroundExtractionRunRow(row);
      return [mapped.sourceSegmentKey, mapped];
    })
  );
}

function buildForumBackgroundSegmentBundle(baseBundle = {}, segment = null) {
  const resolvedSegment = segment && typeof segment === "object" ? segment : null;
  if (!resolvedSegment?.segmentKey) {
    return null;
  }
  const summaryApi =
    normalizeJsonObjectValue(baseBundle.summaryApi, null) ||
    normalizeJsonObjectValue(
      {
        enabled: baseBundle.summaryApiEnabled,
        configId: baseBundle.summaryApiConfigId
      },
      {}
    );
  return {
    tab: normalizeJsonObjectValue(baseBundle.tab, {}),
    summaryApi,
    summaryApiEnabled: Boolean(summaryApi.enabled),
    summaryApiConfigId: String(summaryApi.configId || "").trim(),
    segmentKey: resolvedSegment.segmentKey,
    segmentLabel:
      String(resolvedSegment.segmentLabel || "").trim() ||
      formatForumBackgroundSourceSegmentLabel(resolvedSegment.segmentKey),
    maxCards: clampIntegerValue(resolvedSegment.maxCards, 1, 18, 8),
    sources: Array.isArray(resolvedSegment.sources) ? resolvedSegment.sources : [],
    bundleHash: String(resolvedSegment.bundleHash || "").trim()
  };
}

function buildForumBackgroundSourceSegments(baseBundle = {}) {
  const tab = normalizeJsonObjectValue(baseBundle.tab, {});
  const sources = Array.isArray(baseBundle.sources) ? baseBundle.sources : [];
  return FORUM_BACKGROUND_SOURCE_SEGMENTS.map((segmentDefinition) => {
    const segmentSources = sources.filter((source) =>
      segmentDefinition.sourceLayers.includes(
        normalizeForumBackgroundSourceLayer(source?.sourceLayer, "")
      )
    );
    if (!segmentSources.length) {
      return null;
    }
    const bundleHash = hashMemoryText(
      JSON.stringify(
        sanitizeJsonbValue({
          tabId: tab.id || "",
          segmentKey: segmentDefinition.key,
          sources: segmentSources.map((source) => ({
            sourceType: source.sourceType,
            sourceId: source.sourceId,
            sourceLayer: source.sourceLayer,
            sourceTitle: source.sourceTitle,
            content: source.content
          }))
        })
      )
    );
    return {
      segmentKey: segmentDefinition.key,
      segmentLabel: segmentDefinition.label,
      sourceLayers: [...segmentDefinition.sourceLayers],
      maxCards: segmentDefinition.defaultMaxCards,
      bundleHash,
      sources: segmentSources
    };
  }).filter(Boolean);
}

async function resolveXimiluWorldbookMatches(db, ownerId = DEFAULT_STORAGE_OWNER_ID) {
  const aliases = Array.from(
    new Set(
      XIMILU_WORLD_BOOK_SOURCE_DEFINITIONS.flatMap((item) => item.aliases || []).filter(Boolean)
    )
  );
  if (!aliases.length) {
    return new Map();
  }
  const result = await db.query(
    `
      select id, name, text_content, updated_at
      from worldbook_entries
      where owner_id = $1
        and name = any($2::text[])
      order by updated_at desc nulls last, name asc
    `,
    [ownerId, aliases]
  );
  const picked = new Map();
  XIMILU_WORLD_BOOK_SOURCE_DEFINITIONS.forEach((definition) => {
    const match = result.rows.find((row) => definition.aliases.includes(String(row.name || "").trim()));
    if (match) {
      picked.set(definition.policyId, match);
    }
  });
  return picked;
}

async function buildForumBackgroundSourceBundle(
  db,
  ownerId = DEFAULT_STORAGE_OWNER_ID,
  tabId = "",
  options = {}
) {
  const requestOptions = normalizeJsonObjectValue(options, {});
  if (!requestOptions.skipEnsurePolicies) {
    await ensureXimiluBackgroundPolicies(db, ownerId);
  }
  const settingsState = await loadForumAppSettingsState(db, ownerId);
  const tabs = normalizeForumCustomTabs(settingsState.forumSettings.customTabs || []);
  const tab =
    findForumTabById(tabs, tabId) ||
    (String(tabId || "").trim() === XIMILU_FORUM_TAB_NAME
      ? findForumTabByName(tabs, XIMILU_FORUM_TAB_NAME)
      : null);
  if (!tab) {
    return null;
  }
  const policyResult = await db.query(
    `
      select *
      from forum_background_source_policies
      where owner_id = $1
        and tab_id = $2
        and is_enabled = true
      order by priority desc, created_at asc
    `,
    [ownerId, tab.id]
  );
  const policies = policyResult.rows.map(mapForumBackgroundSourcePolicyRow);
  const worldbookIds = policies
    .filter((policy) => policy.sourceRefType === "worldbook_entry")
    .map((policy) => policy.sourceRefId)
    .filter(Boolean);
  const worldbookResult = worldbookIds.length
    ? await db.query(
        `
          select id, name, text_content, updated_at
          from worldbook_entries
          where owner_id = $1
            and id = any($2::text[])
        `,
        [ownerId, worldbookIds]
      )
    : { rows: [] };
  const worldbookMap = new Map(
    worldbookResult.rows.map((row) => [String(row.id || "").trim(), row])
  );
  const sources = policies
    .map((policy) => {
      if (policy.sourceRefType === "forum_tab_text") {
        const content = [
          tab.audience ? `页签用户定位：${tab.audience}` : "",
          tab.discussionText ? `页签文本：${tab.discussionText}` : ""
        ]
          .filter(Boolean)
          .join("\n");
        return {
          policyId: policy.id,
          sourceType: policy.sourceRefType,
          sourceId: policy.sourceRefId,
          sourceTitle: policy.sourceTitle || `${tab.name}页签文本`,
          sourceLayer: policy.sourceLayer,
          knowledgeDomains: policy.knowledgeDomains,
          priority: policy.priority,
          content,
          updatedAt: policy.updatedAt
        };
      }
      if (policy.sourceRefType === "forum_tab_hot_topic") {
        return {
          policyId: policy.id,
          sourceType: policy.sourceRefType,
          sourceId: policy.sourceRefId,
          sourceTitle: policy.sourceTitle || `${tab.name}页签热点`,
          sourceLayer: policy.sourceLayer,
          knowledgeDomains: policy.knowledgeDomains,
          priority: policy.priority,
          content: String(tab.hotTopic || "").trim(),
          updatedAt: policy.updatedAt
        };
      }
      const worldbook = worldbookMap.get(policy.sourceRefId) || null;
      if (!worldbook) {
        return null;
      }
      return {
        policyId: policy.id,
        sourceType: policy.sourceRefType,
        sourceId: policy.sourceRefId,
        sourceTitle: String(worldbook.name || policy.sourceTitle || "").trim(),
        sourceLayer: policy.sourceLayer,
        knowledgeDomains: policy.knowledgeDomains,
        priority: policy.priority,
        content: String(worldbook.text_content || "").trim(),
        updatedAt: worldbook.updated_at || policy.updatedAt
      };
    })
    .filter(Boolean);
  const latestRun = await loadForumBackgroundLatestRun(db, ownerId, tab.id);
  const segmentRuns = await loadForumBackgroundLatestRunsBySegment(db, ownerId, tab.id);
  const bundleHash = hashMemoryText(
    JSON.stringify(
      sanitizeJsonbValue({
        tabId: tab.id,
        audience: tab.audience,
        discussionText: tab.discussionText,
        hotTopic: tab.hotTopic,
        sources: sources.map((source) => ({
          sourceType: source.sourceType,
          sourceId: source.sourceId,
          sourceLayer: source.sourceLayer,
          sourceTitle: source.sourceTitle,
          content: source.content
        }))
      })
    )
  );
  const segments = buildForumBackgroundSourceSegments({
    tab: {
      id: tab.id,
      name: tab.name,
      audience: tab.audience,
      discussionText: tab.discussionText,
      hotTopic: tab.hotTopic
    },
    summaryApi: {
      enabled: Boolean(settingsState.apiState.summaryApiEnabled),
      configId: String(settingsState.apiState.summaryApiConfigId || "").trim()
    },
    sources
  }).map((segment) => {
    const latestSegmentRun = segmentRuns.get(segment.segmentKey) || null;
    return {
      ...segment,
      latestRun: latestSegmentRun,
      needsExtraction:
        !latestSegmentRun ||
        latestSegmentRun.status !== "completed" ||
        latestSegmentRun.sourceBundleHash !== segment.bundleHash
    };
  });
  return {
    tab: {
      id: tab.id,
      name: tab.name,
      audience: tab.audience,
      discussionText: tab.discussionText,
      hotTopic: tab.hotTopic
    },
    summaryApi: {
      enabled: Boolean(settingsState.apiState.summaryApiEnabled),
      configId: String(settingsState.apiState.summaryApiConfigId || "").trim()
    },
    sources,
    segments,
    latestRun,
    bundleHash
  };
}

async function markForumBackgroundDirtyRunsIfNeeded(
  db,
  ownerId = DEFAULT_STORAGE_OWNER_ID,
  tab = null
) {
  const resolvedTab = tab && typeof tab === "object" ? tab : null;
  if (!resolvedTab?.id) {
    return [];
  }
  const sourceBundle = await buildForumBackgroundSourceBundle(db, ownerId, resolvedTab.id, {
    skipEnsurePolicies: true
  });
  if (!sourceBundle) {
    return [];
  }
  const createdRuns = [];
  const segments = Array.isArray(sourceBundle.segments) ? sourceBundle.segments : [];
  for (const segment of segments) {
    const segmentKey = normalizeForumBackgroundSourceSegmentKey(segment.segmentKey, "");
    if (!segmentKey) {
      continue;
    }
    const latestRunForSegment = await loadForumBackgroundLatestRunBySegment(
      db,
      ownerId,
      sourceBundle.tab.id,
      segmentKey
    );
    if (latestRunForSegment?.sourceBundleHash === segment.bundleHash) {
      continue;
    }
    const runId = randomUUID();
    const segmentBundle = buildForumBackgroundSegmentBundle(sourceBundle, segment);
    const hotTopicHash = hashMemoryText(
      JSON.stringify({
        tabId: sourceBundle.tab.id,
        segmentKey,
        hotTopic: sourceBundle.tab.hotTopic || "",
        sourceBundleHash: segment.bundleHash
      })
    );
    await db.query(
      `
        insert into forum_background_extraction_runs (
          owner_id,
          id,
          tab_id,
          source_segment_key,
          status,
          trigger_reason,
          source_bundle_jsonb,
          source_bundle_hash,
          hot_topic_hash,
          candidate_count,
          dirty_since,
          metadata,
          created_at,
          updated_at
        )
        values ($1, $2, $3, $4, 'dirty', $5, $6::jsonb, $7, $8, 0, now(), $9::jsonb, now(), now())
      `,
      [
        ownerId,
        runId,
        sourceBundle.tab.id,
        segmentKey,
        segmentKey === "forum_context" ? "forum_context_changed" : "source_segment_changed",
        stringifyJsonb(segmentBundle),
        segment.bundleHash,
        hotTopicHash,
        stringifyJsonb({
          seededBy: "system_ximilu_v1",
          segmentKey,
          segmentLabel: segment.segmentLabel
        })
      ]
    );
    const createdRun = await loadForumBackgroundLatestRunBySegment(
      db,
      ownerId,
      sourceBundle.tab.id,
      segmentKey
    );
    if (createdRun) {
      createdRuns.push(createdRun);
    }
  }
  return createdRuns;
}

async function ensureXimiluBackgroundPolicies(db, ownerId = DEFAULT_STORAGE_OWNER_ID) {
  if (!db) {
    return null;
  }
  const settingsState = await loadForumAppSettingsState(db, ownerId);
  const tabs = normalizeForumCustomTabs(settingsState.forumSettings.customTabs || []);
  const ximiluTab = findForumTabByName(tabs, XIMILU_FORUM_TAB_NAME);
  if (!ximiluTab) {
    return null;
  }
  const matchedWorldbooks = await resolveXimiluWorldbookMatches(db, ownerId);
  const systemPolicies = [
    {
      id: "forum_bg_policy_ximilu_tab_background",
      tabId: ximiluTab.id,
      sourceRefType: "forum_tab_text",
      sourceRefId: `${ximiluTab.id}:discussion_text`,
      sourceTitle: `${ximiluTab.name}页签文本`,
      sourceLayer: "tab_background",
      knowledgeDomains: ["community_atmosphere", "fan_discourse", "audience_positioning"],
      priority: 96,
      isEnabled: true
    },
    {
      id: "forum_bg_policy_ximilu_hot_topic",
      tabId: ximiluTab.id,
      sourceRefType: "forum_tab_hot_topic",
      sourceRefId: `${ximiluTab.id}:hot_topic`,
      sourceTitle: `${ximiluTab.name}页签热点`,
      sourceLayer: "hot_topic",
      knowledgeDomains: ["hot_topic_event", "fan_discourse", "relationship_pattern"],
      priority: 100,
      isEnabled: true
    }
  ];
  XIMILU_WORLD_BOOK_SOURCE_DEFINITIONS.forEach((definition) => {
    const worldbook = matchedWorldbooks.get(definition.policyId) || null;
    systemPolicies.push({
      id: definition.policyId,
      tabId: ximiluTab.id,
      sourceRefType: "worldbook_entry",
      sourceRefId: worldbook ? String(worldbook.id || "").trim() : definition.policyId,
      sourceTitle: worldbook ? String(worldbook.name || "").trim() : definition.aliases[0],
      sourceLayer: definition.sourceLayer,
      knowledgeDomains: definition.knowledgeDomains,
      priority: definition.priority,
      isEnabled: Boolean(worldbook)
    });
  });
  for (const policy of systemPolicies) {
    await db.query(
      `
        insert into forum_background_source_policies (
          owner_id,
          id,
          tab_id,
          source_ref_type,
          source_ref_id,
          source_title,
          source_layer,
          knowledge_domains_jsonb,
          priority,
          is_enabled,
          metadata,
          created_at,
          updated_at
        )
        values ($1, $2, $3, $4, $5, $6, $7, $8::jsonb, $9, $10, $11::jsonb, now(), now())
        on conflict (owner_id, id) do update
          set tab_id = excluded.tab_id,
              source_ref_type = excluded.source_ref_type,
              source_ref_id = excluded.source_ref_id,
              source_title = excluded.source_title,
              source_layer = excluded.source_layer,
              knowledge_domains_jsonb = excluded.knowledge_domains_jsonb,
              priority = excluded.priority,
              is_enabled = excluded.is_enabled,
              metadata = excluded.metadata,
              updated_at = now()
      `,
      [
        ownerId,
        policy.id,
        policy.tabId,
        policy.sourceRefType,
        policy.sourceRefId,
        policy.sourceTitle,
        policy.sourceLayer,
        stringifyJsonb(policy.knowledgeDomains),
        policy.priority,
        policy.isEnabled !== false,
        stringifyJsonb({
          seededBy: "system_ximilu_v1",
          tabName: ximiluTab.name
        })
      ]
    );
  }
  await markForumBackgroundDirtyRunsIfNeeded(db, ownerId, ximiluTab);
  return {
    tabId: ximiluTab.id,
    seededCount: systemPolicies.length
  };
}

function normalizeForumBackgroundCandidateInput(input = {}, defaults = {}) {
  const source = normalizeJsonObjectValue(input, {});
  const fallback = normalizeJsonObjectValue(defaults, {});
  return {
    sourceType: normalizeForumBackgroundSourceType(
      getInputValue(source, "sourceType", "source_type") ?? fallback.sourceType,
      fallback.sourceType || "worldbook_entry"
    ),
    sourceId: normalizeRequiredText(
      getInputValue(source, "sourceId", "source_id") ?? fallback.sourceId
    ),
    sourceTitle: normalizeOptionalText(
      getInputValue(source, "sourceTitle", "source_title") ?? fallback.sourceTitle
    ),
    sourceLayer: normalizeForumBackgroundSourceLayer(
      getInputValue(source, "sourceLayer", "source_layer") ?? fallback.sourceLayer,
      fallback.sourceLayer || "tab_background"
    ),
    sourceExcerpt: normalizeRequiredText(
      getInputValue(source, "sourceExcerpt", "source_excerpt") ?? fallback.sourceExcerpt
    ),
    truthLevel: normalizeForumBackgroundTruthLevel(
      getInputValue(source, "truthLevel", "truth_level") ?? fallback.truthLevel,
      fallback.truthLevel || "community_viewpoint"
    ),
    knowledgeDomain: normalizeRequiredText(
      getInputValue(source, "knowledgeDomain", "knowledge_domain") ?? fallback.knowledgeDomain
    ),
    summary: normalizeRequiredText(getInputValue(source, "summary", "summary") ?? fallback.summary),
    detailText: normalizeRequiredText(
      getInputValue(source, "detailText", "detail_text") ?? fallback.detailText
    ),
    suitableRoles: normalizeForumBackgroundTextArray(
      getInputValue(source, "suitableRoles", "suitable_roles") ?? fallback.suitableRoles,
      []
    ),
    keywords: normalizeForumBackgroundTextArray(
      getInputValue(source, "keywords", "keywords") ?? fallback.keywords,
      []
    ),
    confidence: normalizeConfidenceValue(
      getInputValue(source, "confidence", "confidence") ?? fallback.confidence,
      fallback.confidence ?? 0.78
    ),
    status: normalizeForumBackgroundCardStatus(
      getInputValue(source, "status", "status") ?? fallback.status,
      fallback.status || "candidate"
    ),
    mentionCount: clampIntegerValue(
      getInputValue(source, "mentionCount", "mention_count") ?? fallback.mentionCount,
      1,
      9999,
      fallback.mentionCount ?? 1
    ),
    metadata: normalizeJsonObjectValue(
      getInputValue(source, "metadata", "metadata"),
      fallback.metadata || {}
    )
  };
}

function normalizeForumBackgroundGenerationInput(payload = {}) {
  const source = normalizeJsonObjectValue(payload, {});
  return {
    tabId: normalizeRequiredText(getInputValue(source, "tabId", "tab_id")),
    generationType: normalizeForumBackgroundGenerationType(
      getInputValue(source, "generationType", "generation_type"),
      "posts"
    ),
    appearedAt: normalizeTimestampValue(
      getInputValue(source, "appearedAt", "appeared_at"),
      null
    ),
    roleTags: normalizeForumBackgroundTextArray(
      getInputValue(source, "roleTags", "role_tags"),
      []
    ),
    includeDomains: normalizeForumBackgroundTextArray(
      getInputValue(source, "includeDomains", "include_domains"),
      []
    ),
    excludeDomains: normalizeForumBackgroundTextArray(
      getInputValue(source, "excludeDomains", "exclude_domains"),
      []
    ),
    allowedSourceLayers: normalizeForumBackgroundTextArray(
      getInputValue(source, "allowedSourceLayers", "allowed_source_layers"),
      []
    )
      .map((item) => normalizeForumBackgroundSourceLayer(item, item))
      .filter((item) => FORUM_BACKGROUND_SOURCE_LAYERS.has(item)),
    maxCards: clampIntegerValue(
      getInputValue(source, "maxCards", "max_cards"),
      1,
      18,
      6
    ),
    detailLevel: normalizeForumBackgroundDetailLevel(
      getInputValue(source, "detailLevel", "detail_level"),
      "standard"
    ),
    includeArchived: Boolean(getInputValue(source, "includeArchived", "include_archived"))
  };
}

function forumRoleTagSet(roleTags = []) {
  return new Set(
    normalizeForumBackgroundTextArray(roleTags, []).map((item) =>
      String(item || "").trim().toLowerCase()
    )
  );
}

function forumRoleTagMatches(roleTagLookup = new Set(), candidates = []) {
  return candidates.some((candidate) =>
    roleTagLookup.has(String(candidate || "").trim().toLowerCase())
  );
}

function computeForumBackgroundCardScore(card = {}, options = {}) {
  const roleTags = forumRoleTagSet(options.roleTags || []);
  const ageDays = options.appearedAt
    ? Math.max(
        0,
        Math.floor(
          (Date.now() - new Date(options.appearedAt).getTime()) / (24 * 60 * 60 * 1000)
        )
      )
    : 9999;
  let score = card.status === "stable" ? 52 : card.status === "approved" ? 36 : 12;
  score += Math.min(12, card.mentionCount || 0);
  if (card.knowledgeDomain) {
    const includeDomains = new Set((options.includeDomains || []).map((item) => String(item).trim()));
    const excludeDomains = new Set((options.excludeDomains || []).map((item) => String(item).trim()));
    if (excludeDomains.has(card.knowledgeDomain)) {
      return Number.NEGATIVE_INFINITY;
    }
    if (includeDomains.size && !includeDomains.has(card.knowledgeDomain)) {
      score -= 24;
    }
  }
  if (Array.isArray(options.allowedSourceLayers) && options.allowedSourceLayers.length) {
    const allowed = new Set(options.allowedSourceLayers);
    if (!allowed.has(card.sourceLayer)) {
      return Number.NEGATIVE_INFINITY;
    }
  }
  if (card.status === "archived" && !options.includeArchived) {
    return Number.NEGATIVE_INFINITY;
  }

  if (forumRoleTagMatches(roleTags, ["newcomer", "new_role", "新入场角色"])) {
    if (card.sourceLayer === "hot_topic") score += 38;
    if (card.sourceLayer === "tab_background") score += 26;
    if (card.sourceLayer === "recent_campaign") score += 14;
    if (card.sourceLayer === "history_base") score -= 28;
    if (card.status === "archived") score -= 40;
  }
  if (forumRoleTagMatches(roleTags, ["old_guard", "old_role", "老角色"])) {
    if (card.sourceLayer === "history_base") score += 34;
    if (card.sourceLayer === "observable_timeline") score += 18;
    if (card.status === "archived") score += 22;
    if (card.status === "stable") score += 12;
  }
  if (forumRoleTagMatches(roleTags, ["worldbook_seed", "worldbook_role", "世界书种子型"])) {
    if (["history_base", "recent_campaign", "observable_timeline"].includes(card.sourceLayer)) {
      score += 24;
    }
    if (card.sourceLayer === "hot_topic") {
      score -= 12;
    }
  }
  if (forumRoleTagMatches(roleTags, ["schedule_tracker", "行程状态型"])) {
    if (card.sourceLayer === "observable_timeline") score += 40;
    if (["schedule_timeline", "workload_state", "career_stage"].includes(card.knowledgeDomain)) {
      score += 26;
    }
  }
  if (forumRoleTagMatches(roleTags, ["career_fan", "事业粉"])) {
    if (["recent_campaign", "observable_timeline"].includes(card.sourceLayer)) {
      score += 30;
    }
    if (["career_stage", "recent_tour", "performance_history", "workload_state"].includes(card.knowledgeDomain)) {
      score += 20;
    }
  }
  if (forumRoleTagMatches(roleTags, ["cp_digger", "cp_fan", "CP深挖型"])) {
    if (["hot_topic", "tab_background"].includes(card.sourceLayer)) {
      score += 24;
    }
    if (["relationship_pattern", "fan_discourse", "hot_topic_event"].includes(card.knowledgeDomain)) {
      score += 22;
    }
    if (["community_speculation", "interpretation_frame"].includes(card.truthLevel)) {
      score += 14;
    }
  }
  if (forumRoleTagMatches(roleTags, ["fact_checker", "考据型角色"])) {
    if (card.truthLevel === "worldbook_fact") score += 28;
    if (card.sourceLayer === "history_base") score += 22;
  }

  if (ageDays <= 7) {
    if (card.sourceLayer === "hot_topic") score += 18;
    if (card.sourceLayer === "tab_background") score += 12;
    if (card.sourceLayer === "history_base") score -= 34;
    if (card.status === "archived") score -= 56;
  } else if (ageDays <= 30) {
    if (card.sourceLayer === "recent_campaign") score += 12;
    if (card.sourceLayer === "history_base") score -= 12;
    if (card.status === "archived") score -= 22;
  } else if (ageDays >= 180) {
    if (card.sourceLayer === "history_base") score += 16;
    if (card.status === "archived") score += 14;
  }

  if (card.truthLevel === "worldbook_fact") score += 8;
  if (card.truthLevel === "tab_setting") score += 6;
  if (card.truthLevel === "community_speculation") score -= 2;
  return score;
}

function selectForumBackgroundCards(cards = [], options = {}) {
  const requestOptions = normalizeJsonObjectValue(options, {});
  return (Array.isArray(cards) ? cards : [])
    .filter((card) => {
      const status = normalizeForumBackgroundCardStatus(card.status);
      if (status === "candidate") {
        return false;
      }
      if (status === "archived" && !requestOptions.includeArchived) {
        return false;
      }
      return ["approved", "stable", "archived"].includes(status);
    })
    .map((card) => ({
      card,
      score: computeForumBackgroundCardScore(card, requestOptions)
    }))
    .filter((item) => Number.isFinite(item.score))
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score;
      }
      if (left.card.status !== right.card.status) {
        return left.card.status === "stable" ? -1 : 1;
      }
      return new Date(right.card.updatedAt || 0).getTime() - new Date(left.card.updatedAt || 0).getTime();
    })
    .slice(0, Math.max(1, requestOptions.maxCards || 6))
    .map((item) => item.card);
}

function buildForumBackgroundFallbackReferenceText(sourceBundle = {}, detailLevel = "standard") {
  const maxLength = detailLevel === "full" ? 320 : detailLevel === "brief" ? 120 : 220;
  const sources = Array.isArray(sourceBundle.sources) ? sourceBundle.sources : [];
  if (!sources.length) {
    return "";
  }
  return [
    "当前暂无已确认背景卡，先回退到来源摘要：",
    ...sources.map(
      (source, index) =>
        `${index + 1}. [${formatForumBackgroundSourceLayerLabel(source.sourceLayer)}] ${
          source.sourceTitle || "未命名来源"
        }\n${truncateForumBackgroundText(source.content, maxLength)}`
    )
  ].join("\n");
}

function buildForumBackgroundCardsPromptText(cards = [], detailLevel = "standard") {
  const maxLength = detailLevel === "full" ? 240 : detailLevel === "brief" ? 110 : 180;
  if (!cards.length) {
    return "";
  }
  return [
    "已确认的论坛背景卡（只能作为角色隐性认知使用，不要直说“根据背景卡”）：",
    ...cards.map((card, index) => {
      const parts = [
        `${index + 1}. [${formatForumBackgroundSourceLayerLabel(card.sourceLayer)}｜${formatForumBackgroundTruthLevelLabel(
          card.truthLevel
        )}] ${card.summary}`,
        card.detailText ? `展开：${truncateForumBackgroundText(card.detailText, maxLength)}` : "",
        card.knowledgeDomain ? `知识域：${card.knowledgeDomain}` : "",
        card.sourceExcerpt ? `原文片段：${truncateForumBackgroundText(card.sourceExcerpt, 90)}` : ""
      ].filter(Boolean);
      return parts.join("\n");
    })
  ].join("\n");
}

function buildForumUnknownBoundaryList(cards = [], roleTags = []) {
  const list = [];
  const resolvedCards = Array.isArray(cards) ? cards : [];
  if (resolvedCards.some((card) => card.truthLevel === "community_speculation")) {
    list.push("涉及社区推测的内容只能写成“有人猜”“部分人会往这边想”，不能写成已经确认的事实。");
  }
  if (resolvedCards.some((card) => card.truthLevel === "interpretation_frame")) {
    list.push("解释框架不是唯一结论，角色可以拿来理解现象，但不能说成只有这一种原因。");
  }
  if (resolvedCards.some((card) => card.truthLevel === "community_viewpoint")) {
    list.push("社区观点只代表一部分论坛用户，不代表全体共识。");
  }
  const roleTagLookup = forumRoleTagSet(roleTags);
  if (
    forumRoleTagMatches(roleTagLookup, ["cp_digger", "CP深挖型"]) &&
    resolvedCards.some(
      (card) =>
        ["community_speculation", "interpretation_frame"].includes(card.truthLevel) ||
        ["relationship_pattern", "fan_discourse"].includes(card.knowledgeDomain)
    )
  ) {
    list.push("即使是 CP 深挖型角色，也不知道关系猜测是否真实成立，只能表现为代入、脑补和试探。");
  }
  return Array.from(new Set(list));
}

function buildForumUnknownBoundaryText(cards = [], roleTags = []) {
  const lines = buildForumUnknownBoundaryList(cards, roleTags);
  if (!lines.length) {
    return "";
  }
  return ["边界提醒：", ...lines.map((line, index) => `${index + 1}. ${line}`)].join("\n");
}

function buildForumRoleKnowledgePackText(pack = {}, detailLevel = "standard") {
  const cards = Array.isArray(pack.cards) ? pack.cards : [];
  if (!cards.length) {
    return "";
  }
  return [
    `当前角色知识包：${String(pack.label || "论坛角色").trim()}`,
    `知识特点：${String(pack.description || "").trim() || "按已确认背景卡控制知道什么、不知道什么。"}`,
    ...cards.map(
      (card, index) =>
        `${index + 1}. ${card.summary}${
          detailLevel === "brief" ? "" : `（${formatForumBackgroundSourceLayerLabel(card.sourceLayer)}）`
        }`
    )
  ].join("\n");
}

function buildForumRoleBucketText(buckets = [], detailLevel = "standard") {
  const resolvedBuckets = Array.isArray(buckets) ? buckets.filter(Boolean) : [];
  if (!resolvedBuckets.length) {
    return "";
  }
  const lines = ["论坛角色知识分层建议："];
  resolvedBuckets.forEach((bucket, bucketIndex) => {
    const cards = Array.isArray(bucket.cards) ? bucket.cards : [];
    if (!cards.length) {
      return;
    }
    lines.push(
      `${bucketIndex + 1}. ${bucket.label}：${bucket.description || "围绕不同信息量展开讨论。"}`
    );
    cards.forEach((card, index) => {
      lines.push(
        `   - ${index + 1}. ${card.summary}${
          detailLevel === "brief" ? "" : `（${formatForumBackgroundSourceLayerLabel(card.sourceLayer)}）`
        }`
      );
    });
  });
  return lines.join("\n");
}

function dedupeForumBackgroundCards(cards = []) {
  const seen = new Set();
  return (Array.isArray(cards) ? cards : []).filter((card) => {
    const id = String(card?.id || "").trim();
    if (!id || seen.has(id)) {
      return false;
    }
    seen.add(id);
    return true;
  });
}

function buildDefaultForumRoleBuckets(cards = [], requestInput = {}) {
  const detailLevel = normalizeForumBackgroundDetailLevel(requestInput.detailLevel, "standard");
  const base = {
    appearedAt: requestInput.appearedAt || null,
    detailLevel
  };
  return [
    {
      key: "newcomer",
      label: "新入场角色",
      description: "只知道热点和少量页签背景，更容易做当下判断。",
      cards: selectForumBackgroundCards(cards, {
        ...base,
        roleTags: ["newcomer"],
        maxCards: 4
      })
    },
    {
      key: "old_guard",
      label: "老角色",
      description: "知道更多历史和长期语境，会主动做前后对比。",
      cards: selectForumBackgroundCards(cards, {
        ...base,
        roleTags: ["old_guard"],
        maxCards: 6,
        includeArchived: true
      })
    },
    {
      key: "schedule_tracker",
      label: "行程状态型",
      description: "更会用公开行程解释状态、工作量和表现起伏。",
      cards: selectForumBackgroundCards(cards, {
        ...base,
        roleTags: ["schedule_tracker"],
        maxCards: 5
      })
    },
    {
      key: "career_fan",
      label: "事业粉",
      description: "关注作品、舞台和近期事业线，会主动看近期主线。",
      cards: selectForumBackgroundCards(cards, {
        ...base,
        roleTags: ["career_fan"],
        maxCards: 5
      })
    },
    {
      key: "cp_digger",
      label: "CP 深挖型",
      description: "更容易围绕关系模式和热点推理延伸，但边界感要保留。",
      cards: selectForumBackgroundCards(cards, {
        ...base,
        roleTags: ["cp_digger"],
        maxCards: 5
      })
    }
  ].filter((bucket) => bucket.cards.length);
}

function buildForumGenerationContextPayload(sourceBundle = {}, cards = [], requestInput = {}) {
  const resolvedCards = dedupeForumBackgroundCards(cards);
  const roleTags = normalizeForumBackgroundTextArray(requestInput.roleTags || [], []);
  const roleTagLookup = forumRoleTagSet(roleTags);
  const hasExplicitRolePack = roleTags.length > 0;
  const detailLevel = normalizeForumBackgroundDetailLevel(requestInput.detailLevel, "standard");
  const singlePack = hasExplicitRolePack
    ? {
        label:
          roleTags.map((tag) => formatForumBackgroundRoleLabel(tag)).join(" / ") || "论坛角色",
        description: "后端已按角色标签、出现时间和知识层级筛过背景卡。",
        cards: selectForumBackgroundCards(resolvedCards, {
          ...requestInput,
          roleTags,
          maxCards: requestInput.maxCards || 6,
          includeArchived:
            Boolean(requestInput.includeArchived) ||
            forumRoleTagMatches(roleTagLookup, ["old_guard", "old_role", "老角色"])
        })
      }
    : null;
  const roleBuckets = hasExplicitRolePack
    ? []
    : buildDefaultForumRoleBuckets(resolvedCards, requestInput);
  const contextCards = hasExplicitRolePack
    ? singlePack.cards
    : dedupeForumBackgroundCards(roleBuckets.flatMap((bucket) => bucket.cards || []));
  const unknownBoundaries = buildForumUnknownBoundaryList(contextCards, roleTags);
  const fallbackReferenceText = contextCards.length
    ? ""
    : buildForumBackgroundFallbackReferenceText(sourceBundle, detailLevel);
  return {
    tab: sourceBundle.tab || null,
    cards: contextCards,
    roleKnowledgePack: hasExplicitRolePack ? singlePack : null,
    roleBuckets,
    unknownBoundaries,
    fallbackUsed: !contextCards.length,
    promptBlocks: {
      backgroundCardsText: contextCards.length
        ? buildForumBackgroundCardsPromptText(contextCards, detailLevel)
        : fallbackReferenceText,
      roleKnowledgeText: hasExplicitRolePack
        ? buildForumRoleKnowledgePackText(singlePack, detailLevel)
        : buildForumRoleBucketText(roleBuckets, detailLevel),
      unknownBoundaryText: buildForumUnknownBoundaryText(contextCards, roleTags),
      fallbackReferenceText
    }
  };
}

async function mergeForumBackgroundCandidateIntoDb(
  db,
  ownerId = DEFAULT_STORAGE_OWNER_ID,
  tabId = "",
  extractionRunId = "",
  candidate = {}
) {
  const resolvedTabId = String(tabId || "").trim();
  const normalizedCandidate = normalizeForumBackgroundCandidateInput(candidate);
  const existing = await db.query(
    `
      select *
      from forum_background_cards
      where owner_id = $1
        and tab_id = $2
        and source_type = $3
        and source_id = $4
        and source_layer = $5
      order by updated_at desc
      limit 20
    `,
    [
      ownerId,
      resolvedTabId,
      normalizedCandidate.sourceType,
      normalizedCandidate.sourceId,
      normalizedCandidate.sourceLayer
    ]
  );
  const matchedRow =
    existing.rows.find((row) =>
      memoryTextsLookSimilar(row.summary || "", normalizedCandidate.summary || "") ||
      memoryTextsLookSimilar(row.detail_text || "", normalizedCandidate.detailText || "")
    ) || null;
  if (matchedRow) {
    const beforeSnapshot = createForumBackgroundCardSnapshot(matchedRow);
    const updatedResult = await db.query(
      `
        update forum_background_cards
        set source_excerpt = $4,
            source_title = $5,
            truth_level = $6,
            knowledge_domain = $7,
            summary = $8,
            detail_text = $9,
            suitable_roles_jsonb = $10::jsonb,
            keywords_jsonb = $11::jsonb,
            confidence = $12,
            mention_count = forum_background_cards.mention_count + $13,
            last_seen_at = now(),
            extraction_run_id = $14,
            metadata = $15::jsonb,
            updated_at = now()
        where owner_id = $1
          and id = $2
          and tab_id = $3
        returning *
      `,
      [
        ownerId,
        String(matchedRow.id || "").trim(),
        resolvedTabId,
        choosePreferredMemoryText(matchedRow.source_excerpt, normalizedCandidate.sourceExcerpt),
        choosePreferredMemoryText(matchedRow.source_title, normalizedCandidate.sourceTitle),
        normalizedCandidate.truthLevel,
        normalizedCandidate.knowledgeDomain,
        choosePreferredMemoryText(matchedRow.summary, normalizedCandidate.summary),
        choosePreferredMemoryText(matchedRow.detail_text, normalizedCandidate.detailText),
        stringifyJsonb(
          mergeUniqueJsonArray(
            normalizeForumBackgroundTextArray(matchedRow.suitable_roles_jsonb, []),
            normalizedCandidate.suitableRoles
          )
        ),
        stringifyJsonb(
          mergeUniqueJsonArray(
            normalizeForumBackgroundTextArray(matchedRow.keywords_jsonb, []),
            normalizedCandidate.keywords
          )
        ),
        Math.max(normalizeConfidenceValue(matchedRow.confidence, 0.7), normalizedCandidate.confidence),
        normalizedCandidate.mentionCount,
        String(extractionRunId || "").trim(),
        stringifyJsonb({
          ...normalizeJsonObjectValue(matchedRow.metadata, {}),
          ...normalizedCandidate.metadata
        })
      ]
    );
    const updatedRow = updatedResult.rows[0] || matchedRow;
    await createForumBackgroundCardEvent(db, {
      ownerId,
      cardId: updatedRow.id,
      tabId: resolvedTabId,
      eventType: "reinforced",
      actorType: "frontend",
      note: "候选背景卡命中相似旧卡，已执行强化。",
      beforeSnapshot,
      afterSnapshot: createForumBackgroundCardSnapshot(updatedRow),
      payload: {
        extractionRunId,
        candidate: normalizedCandidate
      }
    });
    return {
      action: "reinforced",
      card: mapForumBackgroundCardRow(updatedRow)
    };
  }

  const nextId = randomUUID();
  const inserted = await db.query(
    `
      insert into forum_background_cards (
        owner_id,
        id,
        tab_id,
        source_type,
        source_id,
        source_title,
        source_layer,
        source_excerpt,
        truth_level,
        knowledge_domain,
        summary,
        detail_text,
        suitable_roles_jsonb,
        keywords_jsonb,
        confidence,
        status,
        mention_count,
        first_seen_at,
        last_seen_at,
        extraction_run_id,
        metadata,
        created_at,
        updated_at
      )
      values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13::jsonb, $14::jsonb, $15, 'candidate', $16, now(), now(), $17, $18::jsonb, now(), now())
      returning *
    `,
    [
      ownerId,
      nextId,
      resolvedTabId,
      normalizedCandidate.sourceType,
      normalizedCandidate.sourceId,
      normalizedCandidate.sourceTitle,
      normalizedCandidate.sourceLayer,
      normalizedCandidate.sourceExcerpt,
      normalizedCandidate.truthLevel,
      normalizedCandidate.knowledgeDomain,
      normalizedCandidate.summary,
      normalizedCandidate.detailText,
      stringifyJsonb(normalizedCandidate.suitableRoles),
      stringifyJsonb(normalizedCandidate.keywords),
      normalizedCandidate.confidence,
      normalizedCandidate.mentionCount,
      String(extractionRunId || "").trim(),
      stringifyJsonb(normalizedCandidate.metadata)
    ]
  );
  const insertedRow = inserted.rows[0];
  await createForumBackgroundCardEvent(db, {
    ownerId,
    cardId: insertedRow.id,
    tabId: resolvedTabId,
    eventType: "extracted",
    actorType: "frontend",
    note: "AI 候选背景卡已写入待审核列表。",
    afterSnapshot: createForumBackgroundCardSnapshot(insertedRow),
    payload: {
      extractionRunId,
      candidate: normalizedCandidate
    }
  });
  return {
    action: "created",
    card: mapForumBackgroundCardRow(insertedRow)
  };
}

app.use(
  cors({
    origin: true
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(
  compression({
    threshold: 1024
  })
);

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
      database: "connected",
      memoryDecayWorker: getMemoryDecayWorkerStatus()
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

app.get("/api/memory/diagnostics", async (request, response) => {
  const recentLimit = Math.min(
    50,
    Math.max(1, Number.parseInt(String(request.query.limit || "12"), 10) || 12)
  );
  try {
    const [statusCountsResult, dueDecayResult, recentEventsResult] = await Promise.all([
      pool.query(
        `
          select status, count(*)::int as count
          from memory_items
          group by status
          order by status asc
        `
      ),
      pool.query(
        `
          select count(*)::int as count
          from memory_items i
          left join memory_runtime_state r on r.memory_item_id = i.id
          where (r.next_decay_at is null or r.next_decay_at <= now())
            and i.status <> 'archived'
            and i.status <> 'superseded'
        `
      ),
      pool.query(
        `
          select
            e.*,
            coalesce(cc.name, '') as contact_name,
            coalesce(i.status, '') as current_status
          from memory_events e
          left join memory_items i on i.id = e.memory_item_id
          left join chat_contacts cc on cc.id = e.contact_id
          where e.event_type in ('decayed', 'status_changed', 'recalled')
          order by e.event_time desc, e.created_at desc
          limit $1
        `,
        [recentLimit]
      )
    ]);
    response.json({
      ok: true,
      memoryDecayWorker: getMemoryDecayWorkerStatus(),
      statusCounts: statusCountsResult.rows.reduce((accumulator, row) => {
        accumulator[normalizeMemoryStatus(row.status)] = normalizePositiveIntegerValue(row.count, 0);
        return accumulator;
      }, {}),
      dueDecayCount: normalizePositiveIntegerValue(dueDecayResult.rows[0]?.count, 0),
      recentEvents: recentEventsResult.rows.map((row) => ({
        ...mapMemoryEventRow(row),
        contactName: row.contact_name || "",
        currentStatus: row.current_status || ""
      }))
    });
  } catch (error) {
    response
      .status(500)
      .json(createJsonError("Failed to load memory diagnostics.", error?.message));
  }
});

app.get("/api/memory/quality/summary-faint", async (request, response) => {
  const sampleLimit = Math.min(
    100,
    Math.max(1, Number.parseInt(String(request.query.limit || "20"), 10) || 20)
  );
  try {
    const [countsResult, samplesResult] = await Promise.all([
      pool.query(
        `
          select
            count(*)::int as total,
            count(*) filter (where coalesce(summary_faint, '') <> '')::int as non_empty,
            count(*) filter (where status in ('faint', 'dormant'))::int as faint_or_dormant_total,
            count(*) filter (
              where status in ('faint', 'dormant') and coalesce(summary_faint, '') = ''
            )::int as empty_faint_or_dormant,
            count(*) filter (
              where coalesce(summary_faint, '') ~ '^\\s*(你隐约记得|我隐约记得|隐约记得)'
            )::int as bad_prefix,
            count(*) filter (
              where coalesce(summary_faint, '') ~ '[你我他她]'
                 or coalesce(summary_faint, '') ~ '我们|咱们|联系人|用户'
            )::int as ambiguous_pronoun,
            count(*) filter (where coalesce(summary_faint, '') ~* 'charname|username')::int as placeholder,
            count(*) filter (where length(coalesce(summary_faint, '')) > 90)::int as too_long
          from memory_items
        `
      ),
      pool.query(
        `
          select
            mi.id::text as id,
            mi.contact_id,
            coalesce(cc.name, '') as contact_name,
            mi.status,
            coalesce(mi.summary_faint, '') as summary_faint,
            coalesce(mi.summary_short, '') as summary_short,
            coalesce(mi.canonical_text, '') as canonical_text,
            mi.updated_at
          from memory_items mi
          left join chat_contacts cc on cc.id = mi.contact_id
          where (mi.status in ('faint', 'dormant') and coalesce(mi.summary_faint, '') = '')
             or coalesce(mi.summary_faint, '') ~ '^\\s*(你隐约记得|我隐约记得|隐约记得)'
             or coalesce(mi.summary_faint, '') ~ '[你我他她]'
             or coalesce(mi.summary_faint, '') ~ '我们|咱们|联系人|用户'
             or coalesce(mi.summary_faint, '') ~* 'charname|username'
             or length(coalesce(mi.summary_faint, '')) > 90
          order by mi.updated_at desc nulls last, mi.id asc
          limit $1
        `,
        [sampleLimit]
      )
    ]);
    response.json({
      ok: true,
      checks: countsResult.rows[0] || {},
      samples: samplesResult.rows.map((row) => ({
        id: row.id,
        contactId: row.contact_id || "",
        contactName: row.contact_name || "",
        status: normalizeMemoryStatus(row.status),
        summaryFaint: row.summary_faint || "",
        summaryShort: row.summary_short || "",
        canonicalText: row.canonical_text || "",
        updatedAt: row.updated_at || null
      }))
    });
  } catch (error) {
    response
      .status(500)
      .json(createJsonError("Failed to check summary_faint quality.", error?.message));
  }
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

  const client = await pool.connect();
  try {
    await client.query("begin");
    const sanitizedValueJson = sanitizeJsonbValue(valueJson);
    const result = await client.query(
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
      [key, JSON.stringify(sanitizedValueJson), source]
    );
    const dataTableWrites = [];
    await mirrorStorageItemToBusinessTables(
      client,
      {
        key,
        valueJson: sanitizedValueJson,
        source
      },
      dataTableWrites
    );
    await client.query("commit");
    response.json({
      ok: true,
      record: result.rows[0],
      dataTableWrites
    });
  } catch (error) {
    await client.query("rollback");
    response
      .status(500)
      .json(createJsonError("Failed to save storage record.", error?.message));
  } finally {
    client.release();
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

function normalizeChatSyncReason(value = "", fallback = "mutation") {
  const normalized = String(value || "").trim().toLowerCase();
  return ["mutation", "startup_retry", "pagehide", "manual"].includes(normalized)
    ? normalized
    : fallback;
}

function normalizeChatSyncUpserts(value) {
  const items = Array.isArray(value) ? value : [];
  const upsertsByConversationId = new Map();
  items.forEach((item) => {
    const source = item && typeof item === "object" ? item : {};
    const conversation = normalizeSnapshotObject(source.conversation);
    const conversationId = toStorageText(conversation.id);
    if (!conversationId) {
      return;
    }
    upsertsByConversationId.set(conversationId, {
      conversation: {
        ...conversation,
        id: conversationId
      },
      lastMutatedAt:
        Number(source.lastMutatedAt) ||
        Number(conversation.lastMutatedAt) ||
        Number(conversation.updatedAt) ||
        0
    });
  });
  return Array.from(upsertsByConversationId.values());
}

function normalizeChatSyncDeletes(value) {
  const items = Array.isArray(value) ? value : [];
  const deletesByConversationId = new Map();
  items.forEach((item) => {
    const source = item && typeof item === "object" ? item : {};
    const conversationId = toStorageText(source.conversationId || source.id);
    if (!conversationId) {
      return;
    }
    deletesByConversationId.set(conversationId, {
      conversationId,
      deletedAt: Number(source.deletedAt) || 0
    });
  });
  return Array.from(deletesByConversationId.values());
}

app.post("/api/chat/sync", async (request, response) => {
  const body = request.body && typeof request.body === "object" ? request.body : {};
  const ownerId = toStorageText(body.ownerId, DEFAULT_STORAGE_OWNER_ID);
  const reason = normalizeChatSyncReason(body.reason);
  const upserts = normalizeChatSyncUpserts(body.upserts);
  const deletes = normalizeChatSyncDeletes(body.deletes);

  if (!upserts.length && !deletes.length) {
    response.status(400).json(createJsonError("At least one chat upsert or delete is required."));
    return;
  }

  const client = await pool.connect();
  try {
    await client.query("begin");
    let deletedConversationCount = 0;
    let upsertedConversationCount = 0;
    let writtenMessageCount = 0;

    for (const entry of deletes) {
      await client.query("delete from chat_messages where owner_id = $1 and conversation_id = $2", [
        ownerId,
        entry.conversationId
      ]);
      const deletedConversationResult = await client.query(
        "delete from chat_conversations where owner_id = $1 and id = $2",
        [ownerId, entry.conversationId]
      );
      deletedConversationCount += Number(deletedConversationResult.rowCount) || 0;
    }

    for (const entry of upserts) {
      const result = await upsertChatConversationSnapshot(client, entry.conversation, ownerId, {
        clientUpdatedAt: entry.lastMutatedAt
      });
      if (!result?.conversationId) {
        continue;
      }
      upsertedConversationCount += 1;
      writtenMessageCount += Number(result.messageCount) || 0;
    }

    await client.query("commit");
    response.json({
      ok: true,
      ownerId,
      reason,
      summary: {
        deletedConversationCount,
        upsertedConversationCount,
        writtenMessageCount
      }
    });
  } catch (error) {
    await client.query("rollback");
    response.status(500).json(createJsonError("Failed to sync chat conversations.", error?.message));
  } finally {
    client.release();
  }
});

app.get("/api/forum/background/source-bundle", async (request, response) => {
  if (!pool) {
    response.status(500).json(createJsonError("DATABASE_URL is missing. API routes are unavailable."));
    return;
  }
  const tabId = String(request.query.tabId || request.query.tab_id || "").trim();
  if (!tabId) {
    response.status(400).json(createJsonError("tabId is required."));
    return;
  }
  try {
    const bundle = await buildForumBackgroundSourceBundle(pool, DEFAULT_STORAGE_OWNER_ID, tabId);
    if (!bundle) {
      response.status(404).json(createJsonError("Forum tab was not found."));
      return;
    }
    response.json({
      ok: true,
      tab: bundle.tab,
      sources: bundle.sources,
      segments: bundle.segments,
      summaryApiEnabled: bundle.summaryApi.enabled,
      summaryApiConfigId: bundle.summaryApi.configId,
      latestRun: bundle.latestRun,
      bundleHash: bundle.bundleHash
    });
  } catch (error) {
    response
      .status(500)
      .json(createJsonError("Failed to build forum background source bundle.", error?.message));
  }
});

app.post("/api/forum/background/extraction-runs", async (request, response) => {
  if (!pool) {
    response.status(500).json(createJsonError("DATABASE_URL is missing. API routes are unavailable."));
    return;
  }
  const body = normalizeJsonObjectValue(request.body, {});
  const tabId = normalizeRequiredText(getInputValue(body, "tabId", "tab_id"));
  if (!tabId) {
    response.status(400).json(createJsonError("tabId is required."));
    return;
  }
  try {
    const sourceBundle =
      normalizeJsonObjectValue(body.sourceBundle || body.source_bundle, null) ||
      (await buildForumBackgroundSourceBundle(pool, DEFAULT_STORAGE_OWNER_ID, tabId));
    if (!sourceBundle?.tab?.id) {
      response.status(404).json(createJsonError("Forum tab was not found."));
      return;
    }
    const sourceSegmentKey = normalizeForumBackgroundSourceSegmentKey(
      getInputValue(body, "segmentKey", "segment_key") || sourceBundle.segmentKey,
      ""
    );
    const runId = randomUUID();
    await pool.query(
      `
        insert into forum_background_extraction_runs (
          owner_id,
          id,
          tab_id,
          source_segment_key,
          status,
          trigger_reason,
          source_bundle_jsonb,
          source_bundle_hash,
          hot_topic_hash,
          candidate_count,
          metadata,
          created_at,
          updated_at
        )
        values ($1, $2, $3, $4, 'pending_submission', $5, $6::jsonb, $7, $8, 0, $9::jsonb, now(), now())
      `,
      [
        DEFAULT_STORAGE_OWNER_ID,
        runId,
        sourceBundle.tab.id,
        sourceSegmentKey,
        String(body.triggerReason || body.trigger_reason || "manual_editor_extract").trim() ||
          "manual_editor_extract",
        stringifyJsonb(sourceBundle),
        String(body.sourceBundleHash || body.source_bundle_hash || sourceBundle.bundleHash || "").trim(),
        hashMemoryText(
          JSON.stringify({
            tabId: sourceBundle.tab.id,
            segmentKey: sourceSegmentKey,
            hotTopic: sourceBundle.tab.hotTopic || "",
            sourceBundleHash:
              String(body.sourceBundleHash || body.source_bundle_hash || sourceBundle.bundleHash || "").trim()
          })
        ),
        stringifyJsonb(
          normalizeJsonObjectValue(body.metadata, {
            actorType: "frontend",
            segmentKey: sourceSegmentKey,
            segmentLabel:
              String(body.segmentLabel || body.segment_label || sourceBundle.segmentLabel || "").trim() ||
              formatForumBackgroundSourceSegmentLabel(sourceSegmentKey)
          })
        )
      ]
    );
    const created = sourceSegmentKey
      ? await loadForumBackgroundLatestRunBySegment(
          pool,
          DEFAULT_STORAGE_OWNER_ID,
          sourceBundle.tab.id,
          sourceSegmentKey
        )
      : await loadForumBackgroundLatestRun(pool, DEFAULT_STORAGE_OWNER_ID, sourceBundle.tab.id);
    response.json({
      ok: true,
      run: created
    });
  } catch (error) {
    response
      .status(500)
      .json(createJsonError("Failed to create forum background extraction run.", error?.message));
  }
});

app.post("/api/forum/background/extraction-runs/:id/candidates", async (request, response) => {
  if (!pool) {
    response.status(500).json(createJsonError("DATABASE_URL is missing. API routes are unavailable."));
    return;
  }
  const runId = String(request.params.id || "").trim();
  if (!runId) {
    response.status(400).json(createJsonError("Extraction run id is required."));
    return;
  }
  const body = normalizeJsonObjectValue(request.body, {});
  const allowEmpty = Boolean(getInputValue(body, "allowEmpty", "allow_empty"));
  const rawItems = Array.isArray(body.items)
    ? body.items
    : Array.isArray(body.candidates)
      ? body.candidates
      : Array.isArray(body)
        ? body
        : [];
  if (!rawItems.length && !allowEmpty) {
    response.status(400).json(createJsonError('Request body must include an "items" array.'));
    return;
  }
  const client = await pool.connect();
  try {
    await client.query("begin");
    const runResult = await client.query(
      `
        select *
        from forum_background_extraction_runs
        where owner_id = $1 and id = $2
        limit 1
      `,
      [DEFAULT_STORAGE_OWNER_ID, runId]
    );
    if (!runResult.rows.length) {
      await client.query("rollback");
      response.status(404).json(createJsonError("Extraction run was not found."));
      return;
    }
    const run = mapForumBackgroundExtractionRunRow(runResult.rows[0]);
    if (!rawItems.length && allowEmpty) {
      await client.query(
        `
          update forum_background_extraction_runs
          set status = 'completed',
              candidate_count = 0,
              submitted_at = now(),
              completed_at = now(),
              updated_at = now()
          where owner_id = $1 and id = $2
        `,
        [DEFAULT_STORAGE_OWNER_ID, runId]
      );
      const updatedRunResult = await client.query(
        `
          select *
          from forum_background_extraction_runs
          where owner_id = $1 and id = $2
          limit 1
        `,
        [DEFAULT_STORAGE_OWNER_ID, runId]
      );
      await client.query("commit");
      response.json({
        ok: true,
        run: updatedRunResult.rows.length
          ? mapForumBackgroundExtractionRunRow(updatedRunResult.rows[0])
          : run,
        results: [],
        summary: {
          requestedCount: 0,
          createdCount: 0,
          reinforcedCount: 0
        }
      });
      return;
    }
    const sourceBundle = normalizeJsonObjectValue(run.sourceBundle, {});
    const sourceLookup = new Map(
      (Array.isArray(sourceBundle.sources) ? sourceBundle.sources : []).map((item) => [
        `${String(item.sourceType || "").trim()}::${String(item.sourceId || "").trim()}`,
        item
      ])
    );
    const validationErrors = [];
    const normalizedItems = rawItems.map((item, index) => {
      const sourceType = normalizeForumBackgroundSourceType(
        getInputValue(item, "sourceType", "source_type"),
        "worldbook_entry"
      );
      const sourceId = normalizeRequiredText(getInputValue(item, "sourceId", "source_id"));
      const sourceMeta = sourceLookup.get(`${sourceType}::${sourceId}`) || {};
      const normalized = normalizeForumBackgroundCandidateInput(item, {
        sourceType,
        sourceId,
        sourceTitle: sourceMeta.sourceTitle || "",
        sourceLayer: sourceMeta.sourceLayer || "tab_background"
      });
      if (!normalized.sourceType || !normalized.sourceId || !normalized.sourceExcerpt || !normalized.truthLevel) {
        validationErrors.push({
          index,
          message: "候选背景卡缺少 source_type / source_id / source_excerpt / truth_level。"
        });
      }
      if (normalized.status !== "candidate") {
        validationErrors.push({
          index,
          message: "候选背景卡提交时 status 只能为 candidate。"
        });
      }
      if (normalized.truthLevel === "community_speculation" && normalized.status === "stable") {
        validationErrors.push({
          index,
          message: "community_speculation 不能直接以 stable 状态提交。"
        });
      }
      return normalized;
    });
    if (validationErrors.length) {
      await client.query("rollback");
      response.status(400).json({
        ...createJsonError("Invalid forum background card candidates."),
        validationErrors
      });
      return;
    }
    const mergeResults = [];
    for (const item of normalizedItems) {
      mergeResults.push(
        await mergeForumBackgroundCandidateIntoDb(
          client,
          DEFAULT_STORAGE_OWNER_ID,
          run.tabId,
          runId,
          item
        )
      );
    }
    const createdCount = mergeResults.filter((item) => item.action === "created").length;
    const reinforcedCount = mergeResults.filter((item) => item.action === "reinforced").length;
    await client.query(
      `
        update forum_background_extraction_runs
        set status = 'completed',
            candidate_count = $3,
            submitted_at = now(),
            completed_at = now(),
            updated_at = now()
        where owner_id = $1 and id = $2
      `,
      [DEFAULT_STORAGE_OWNER_ID, runId, mergeResults.length]
    );
    const updatedRunResult = await client.query(
      `
        select *
        from forum_background_extraction_runs
        where owner_id = $1 and id = $2
        limit 1
      `,
      [DEFAULT_STORAGE_OWNER_ID, runId]
    );
    await client.query("commit");
    response.json({
      ok: true,
      run: updatedRunResult.rows.length
        ? mapForumBackgroundExtractionRunRow(updatedRunResult.rows[0])
        : run,
      results: mergeResults,
      summary: {
        requestedCount: normalizedItems.length,
        createdCount,
        reinforcedCount
      }
    });
  } catch (error) {
    await client.query("rollback");
    response
      .status(500)
      .json(createJsonError("Failed to save forum background card candidates.", error?.message));
  } finally {
    client.release();
  }
});

app.get("/api/forum/background/cards", async (request, response) => {
  if (!pool) {
    response.status(500).json(createJsonError("DATABASE_URL is missing. API routes are unavailable."));
    return;
  }
  const tabId = String(request.query.tabId || request.query.tab_id || "").trim();
  if (!tabId) {
    response.status(400).json(createJsonError("tabId is required."));
    return;
  }
  const statuses = Array.from(
    new Set(
      String(request.query.status || "")
        .split(",")
        .map((item) => normalizeForumBackgroundCardStatus(item, ""))
        .filter((item) => FORUM_BACKGROUND_CARD_STATUSES.has(item))
    )
  );
  try {
    const params = [DEFAULT_STORAGE_OWNER_ID, tabId];
    const clauses = ["owner_id = $1", "tab_id = $2"];
    if (statuses.length) {
      params.push(statuses);
      clauses.push(`status = any($${params.length}::text[])`);
    }
    const result = await pool.query(
      `
        select *
        from forum_background_cards
        where ${clauses.join(" and ")}
        order by
          case status
            when 'candidate' then 0
            when 'approved' then 1
            when 'stable' then 2
            when 'worldbook_candidate' then 3
            when 'archived' then 4
            else 9
          end asc,
          updated_at desc,
          created_at desc
      `,
      params
    );
    const cards = result.rows.map(mapForumBackgroundCardRow);
    response.json({
      ok: true,
      cards,
      counts: cards.reduce((accumulator, card) => {
        accumulator[card.status] = (accumulator[card.status] || 0) + 1;
        return accumulator;
      }, {})
    });
  } catch (error) {
    response
      .status(500)
      .json(createJsonError("Failed to load forum background cards.", error?.message));
  }
});

app.patch("/api/forum/background/cards/:id", async (request, response) => {
  if (!pool) {
    response.status(500).json(createJsonError("DATABASE_URL is missing. API routes are unavailable."));
    return;
  }
  const cardId = String(request.params.id || "").trim();
  if (!cardId) {
    response.status(400).json(createJsonError("Card id is required."));
    return;
  }
  const body = normalizeJsonObjectValue(request.body, {});
  const client = await pool.connect();
  try {
    await client.query("begin");
    const existingResult = await client.query(
      `
        select *
        from forum_background_cards
        where owner_id = $1 and id = $2
        limit 1
      `,
      [DEFAULT_STORAGE_OWNER_ID, cardId]
    );
    if (!existingResult.rows.length) {
      await client.query("rollback");
      response.status(404).json(createJsonError("Forum background card was not found."));
      return;
    }
    const existingRow = existingResult.rows[0];
    const currentCard = mapForumBackgroundCardRow(existingRow);
    const nextStatus =
      Object.prototype.hasOwnProperty.call(body, "status") ||
      Object.prototype.hasOwnProperty.call(body, "status_text")
        ? normalizeForumBackgroundCardStatus(body.status || body.status_text, currentCard.status)
        : currentCard.status;
    if (
      nextStatus === "stable" &&
      currentCard.truthLevel === "community_speculation" &&
      currentCard.status === "candidate"
    ) {
      await client.query("rollback");
      response
        .status(400)
        .json(createJsonError("community_speculation 卡不能从 candidate 直接进入 stable。"));
      return;
    }
    const nextCard = {
      ...currentCard,
      sourceExcerpt:
        Object.prototype.hasOwnProperty.call(body, "sourceExcerpt") ||
        Object.prototype.hasOwnProperty.call(body, "source_excerpt")
          ? normalizeRequiredText(getInputValue(body, "sourceExcerpt", "source_excerpt"))
          : currentCard.sourceExcerpt,
      truthLevel:
        Object.prototype.hasOwnProperty.call(body, "truthLevel") ||
        Object.prototype.hasOwnProperty.call(body, "truth_level")
          ? normalizeForumBackgroundTruthLevel(
              getInputValue(body, "truthLevel", "truth_level"),
              currentCard.truthLevel
            )
          : currentCard.truthLevel,
      knowledgeDomain:
        Object.prototype.hasOwnProperty.call(body, "knowledgeDomain") ||
        Object.prototype.hasOwnProperty.call(body, "knowledge_domain")
          ? normalizeRequiredText(getInputValue(body, "knowledgeDomain", "knowledge_domain"))
          : currentCard.knowledgeDomain,
      summary: Object.prototype.hasOwnProperty.call(body, "summary")
        ? normalizeRequiredText(body.summary)
        : currentCard.summary,
      detailText:
        Object.prototype.hasOwnProperty.call(body, "detailText") ||
        Object.prototype.hasOwnProperty.call(body, "detail_text")
          ? normalizeRequiredText(getInputValue(body, "detailText", "detail_text"))
          : currentCard.detailText,
      suitableRoles:
        Object.prototype.hasOwnProperty.call(body, "suitableRoles") ||
        Object.prototype.hasOwnProperty.call(body, "suitable_roles")
          ? normalizeForumBackgroundTextArray(
              getInputValue(body, "suitableRoles", "suitable_roles"),
              currentCard.suitableRoles
            )
          : currentCard.suitableRoles,
      keywords: Object.prototype.hasOwnProperty.call(body, "keywords")
        ? normalizeForumBackgroundTextArray(body.keywords, currentCard.keywords)
        : currentCard.keywords,
      confidence: Object.prototype.hasOwnProperty.call(body, "confidence")
        ? normalizeConfidenceValue(body.confidence, currentCard.confidence)
        : currentCard.confidence,
      status: nextStatus,
      metadata: {
        ...normalizeJsonObjectValue(existingRow.metadata, {}),
        ...normalizeJsonObjectValue(body.metadata, {})
      }
    };
    const beforeSnapshot = createForumBackgroundCardSnapshot(existingRow);
    const updateResult = await client.query(
      `
        update forum_background_cards
        set source_excerpt = $3,
            truth_level = $4,
            knowledge_domain = $5,
            summary = $6,
            detail_text = $7,
            suitable_roles_jsonb = $8::jsonb,
            keywords_jsonb = $9::jsonb,
            confidence = $10,
            status = $11,
            approved_at = case when $11 in ('approved', 'stable', 'worldbook_candidate') then coalesce(approved_at, now()) else approved_at end,
            archived_at = case when $11 = 'archived' then now() when $11 <> 'archived' then null else archived_at end,
            metadata = $12::jsonb,
            updated_at = now()
        where owner_id = $1 and id = $2
        returning *
      `,
      [
        DEFAULT_STORAGE_OWNER_ID,
        cardId,
        nextCard.sourceExcerpt,
        nextCard.truthLevel,
        nextCard.knowledgeDomain,
        nextCard.summary,
        nextCard.detailText,
        stringifyJsonb(nextCard.suitableRoles),
        stringifyJsonb(nextCard.keywords),
        nextCard.confidence,
        nextCard.status,
        stringifyJsonb(nextCard.metadata)
      ]
    );
    const updatedRow = updateResult.rows[0];
    const eventType =
      currentCard.status !== nextCard.status
        ? nextCard.status === "approved"
          ? "approved"
          : nextCard.status === "stable"
            ? "stabilized"
            : nextCard.status === "archived"
              ? "archived"
              : nextCard.status === "worldbook_candidate"
                ? "marked_worldbook_candidate"
                : "restored"
        : "edited";
    await createForumBackgroundCardEvent(client, {
      ownerId: DEFAULT_STORAGE_OWNER_ID,
      cardId,
      tabId: currentCard.tabId,
      eventType,
      actorType: String(body.actorType || body.actor_type || "frontend").trim() || "frontend",
      note: String(body.note || "").trim(),
      beforeSnapshot,
      afterSnapshot: createForumBackgroundCardSnapshot(updatedRow),
      payload: {
        patch: body
      }
    });
    await client.query("commit");
    response.json({
      ok: true,
      card: mapForumBackgroundCardRow(updatedRow)
    });
  } catch (error) {
    await client.query("rollback");
    response
      .status(500)
      .json(createJsonError("Failed to update forum background card.", error?.message));
  } finally {
    client.release();
  }
});

app.post("/api/forum/generation-context", async (request, response) => {
  if (!pool) {
    response.status(500).json(createJsonError("DATABASE_URL is missing. API routes are unavailable."));
    return;
  }
  const input = normalizeForumBackgroundGenerationInput(request.body);
  if (!input.tabId) {
    response.status(400).json(createJsonError("tabId is required."));
    return;
  }
  try {
    const sourceBundle = await buildForumBackgroundSourceBundle(
      pool,
      DEFAULT_STORAGE_OWNER_ID,
      input.tabId
    );
    if (!sourceBundle) {
      response.status(404).json(createJsonError("Forum tab was not found."));
      return;
    }
    const cardResult = await pool.query(
      `
        select *
        from forum_background_cards
        where owner_id = $1
          and tab_id = $2
          and status = any($3::text[])
        order by updated_at desc, created_at desc
      `,
      [DEFAULT_STORAGE_OWNER_ID, sourceBundle.tab.id, ["approved", "stable", "archived"]]
    );
    const allCards = cardResult.rows.map(mapForumBackgroundCardRow);
    const generationContext = buildForumGenerationContextPayload(sourceBundle, allCards, input);
    response.json({
      ok: true,
      tab: sourceBundle.tab,
      generationType: input.generationType,
      currentHotTopic: sourceBundle.tab?.hotTopic || "",
      cards: generationContext.cards,
      roleKnowledgePack: generationContext.roleKnowledgePack,
      roleBuckets: generationContext.roleBuckets,
      unknownBoundaries: generationContext.unknownBoundaries,
      fallbackUsed: generationContext.fallbackUsed,
      promptBlocks: generationContext.promptBlocks,
      latestRun: sourceBundle.latestRun
    });
  } catch (error) {
    response
      .status(500)
      .json(createJsonError("Failed to build forum generation context.", error?.message));
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
  const rawCueScore = body.cueScore ?? body.cue_score;
  const rawCueThreshold = body.cueThreshold ?? body.cue_threshold;
  const cueScore = rawCueScore == null ? null : normalizeFiniteNumber(rawCueScore, 0);
  const cueThreshold =
    rawCueThreshold == null ? null : normalizeFiniteNumber(rawCueThreshold, 0);
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
        cueTerms: normalizeJsonArrayValue(body.cueTerms || body.cue_terms, []),
        cueStrength: normalizeMemoryCueStrength(body.cueStrength || body.cue_strength),
        cueSources: normalizeMemoryCueSources(body.cueSources || body.cue_sources),
        cueScore,
        cueThreshold,
        statusBeforeRecall: normalizeOptionalText(body.statusBeforeRecall || body.status_before_recall),
        cooldownApplied: Boolean(body.cooldownApplied ?? body.cooldown_applied)
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

app.post("/api/memory/recompute", async (request, response) => {
  const body = request.body && typeof request.body === "object" ? request.body : {};
  const memoryId = normalizeMemoryUuid(body.memoryId || body.memory_id);
  const contactId = normalizeOptionalText(body.contactId || body.contact_id);
  const dryRun = Boolean(body.dryRun ?? body.dry_run);
  const includeArchived = Boolean(body.includeArchived ?? body.include_archived);
  const includeSuperseded = Boolean(body.includeSuperseded ?? body.include_superseded);
  const limit = Math.min(
    200,
    Math.max(1, Number.parseInt(String(body.limit || "50"), 10) || 50)
  );
  const client = await pool.connect();
  try {
    if (!dryRun) {
      await client.query("begin");
    }
    const ids = [];
    if (memoryId) {
      const existingResult = await client.query("select id from memory_items where id = $1 limit 1", [memoryId]);
      existingResult.rows.forEach((row) => {
        if (row.id) {
          ids.push(row.id);
        }
      });
    } else if (contactId) {
      const params = [contactId, limit];
      const clauses = ["i.contact_id = $1"];
      if (!includeArchived) {
        clauses.push(`i.status <> 'archived'`);
      }
      if (!includeSuperseded) {
        clauses.push(`i.status <> 'superseded'`);
      }
      const result = await client.query(
        `
          select i.id
          from memory_items i
          left join memory_runtime_state r on r.memory_item_id = i.id
          where ${clauses.join(" and ")}
          order by coalesce(r.next_decay_at, i.updated_at) asc, i.updated_at desc
          limit $2
        `,
        params
      );
      result.rows.forEach((row) => {
        if (row.id) {
          ids.push(row.id);
        }
      });
    } else {
      const params = [limit];
      const clauses = ["(r.next_decay_at is null or r.next_decay_at <= now())"];
      if (!includeArchived) {
        clauses.push(`i.status <> 'archived'`);
      }
      if (!includeSuperseded) {
        clauses.push(`i.status <> 'superseded'`);
      }
      const result = await client.query(
        `
          select i.id
          from memory_items i
          left join memory_runtime_state r on r.memory_item_id = i.id
          where ${clauses.join(" and ")}
          order by coalesce(r.next_decay_at, i.updated_at) asc, i.updated_at desc
          limit $1
        `,
        params
      );
      result.rows.forEach((row) => {
        if (row.id) {
          ids.push(row.id);
        }
      });
    }

    if (memoryId && !ids.length) {
      if (!dryRun) {
        await client.query("rollback");
      }
      response.status(404).json(createJsonError("Memory item was not found."));
      return;
    }

    const batchId = randomUUID();
    const now = new Date();
    const results = [];
    for (const id of ids) {
      const recomputed = await applyMemoryDecayRecomputeInDb(client, id, {
        dryRun,
        now,
        batchId,
        actorType: body.actorType || "node_backend",
        actorRef: body.actorRef,
        sourceKind: body.sourceKind || "memory_decay_manual",
        reasonCode: body.reasonCode || "manual_memory_recompute",
        sourceRef: {
          trigger: memoryId ? "memory_id" : contactId ? "contact_id" : "due_scan",
          requestedMemoryId: memoryId || "",
          requestedContactId: contactId || "",
          dryRun
        },
        note: body.note
      });
      if (recomputed) {
        results.push(recomputed);
      }
    }

    if (!dryRun) {
      await client.query("commit");
    }

    response.json({
      ok: true,
      dryRun,
      batchId,
      summary: {
        requestedCount: ids.length,
        processedCount: results.length,
        updatedCount: dryRun
          ? results.filter((item) => item.wouldWriteEvents.length > 0).length
          : results.length,
        statusChangedCount: results.filter(
          (item) => item.changes?.status?.from && item.changes?.status?.from !== item.changes?.status?.to
        ).length,
        decayedEventCount: results.filter((item) => item.wouldWriteEvents.includes("decayed")).length,
        policyAppliedCount: 0
      },
      results
    });
  } catch (error) {
    if (!dryRun) {
      await client.query("rollback");
    }
    response.status(500).json(createJsonError("Failed to recompute memory decay.", error?.message));
  } finally {
    client.release();
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

app.get('/api/memory/quality/report', async (request, response) => {
  const sampleLimit = clampIntegerEnv(request.query.limit, 50, 1, 100);
  try {
    const rows = await loadMemoryRowsForQuality(pool);
    const report = buildMemoryQualityReportFromRows(rows, sampleLimit);
    response.json({
      ok: true,
      ...report
    });
  } catch (error) {
    response.status(500).json(createJsonError('Failed to build memory quality report.', error?.message));
  }
});

app.get('/api/memory/cue-recall-report', async (request, response) => {
  const contactId = String(request.query.contactId || request.query.contact_id || '').trim();
  const sinceDays = clampIntegerEnv(request.query.sinceDays, 7, 1, 120);
  const limit = clampIntegerEnv(request.query.limit, 50, 1, 200);
  const params = [sinceDays];
  const clauses = [
    "e.event_type = 'recalled'",
    "e.reason_code = 'prompt_memory_cue_recall'",
    "e.event_time >= now() - ($1::int * interval '1 day')"
  ];
  if (contactId) {
    params.push(contactId);
    clauses.push('e.contact_id = $' + String(params.length));
  }
  params.push(limit);
  try {
    const queryText =
      "select e.*, coalesce(cc.name, '') as contact_name, coalesce(i.status, '') as current_status, " +
      "coalesce(i.memory_type, '') as memory_type, coalesce(i.summary_short, '') as summary_short, " +
      "coalesce(i.summary_faint, '') as summary_faint, coalesce(i.canonical_text, '') as canonical_text " +
      "from memory_events e left join memory_items i on i.id = e.memory_item_id " +
      "left join chat_contacts cc on cc.id = e.contact_id " +
      (clauses.length ? 'where ' + clauses.join(' and ') + ' ' : '') +
      "order by e.event_time desc, e.created_at desc limit $" + String(params.length);
    const result = await pool.query(queryText, params);
    const events = result.rows.map((row) => {
      const mappedEvent = mapMemoryEventRow(row);
      const deltaPayload = normalizeJsonObjectValue(mappedEvent.deltaPayload, {});
      const cueScore = deltaPayload.cueScore == null ? null : normalizeFiniteNumber(deltaPayload.cueScore, 0);
      const cueThreshold =
        deltaPayload.cueThreshold == null ? null : normalizeFiniteNumber(deltaPayload.cueThreshold, 0);
      const cueStrength =
        normalizeMemoryCueStrength(deltaPayload.cueStrength) ||
        (cueScore != null && cueThreshold != null && cueScore >= cueThreshold + 0.12
          ? 'strong'
          : cueScore != null && cueThreshold != null && cueScore >= cueThreshold
            ? 'weak'
            : '');
      return {
        id: mappedEvent.id,
        memoryItemId: mappedEvent.memoryItemId,
        contactId: mappedEvent.contactId,
        contactName: row.contact_name || '',
        eventTime: mappedEvent.eventTime,
        reasonCode: mappedEvent.reasonCode || '',
        currentStatus: normalizeMemoryStatus(row.current_status),
        memoryType: normalizeMemoryType(row.memory_type),
        summaryShort: row.summary_short || '',
        summaryFaint: row.summary_faint || '',
        canonicalText: row.canonical_text || '',
        cueTerms: normalizeJsonArrayValue(deltaPayload.cueTerms, []),
        cueScore,
        cueThreshold,
        cueStrength,
        cueSources: normalizeMemoryCueSources(deltaPayload.cueSources),
        statusBeforeRecall: normalizeOptionalText(deltaPayload.statusBeforeRecall),
        cooldownApplied: Boolean(deltaPayload.cooldownApplied)
      };
    });
    const byCueStrength = {};
    const byCueSource = {};
    const byMemoryType = {};
    events.forEach((event) => {
      const cueStrengthKey = event.cueStrength || 'unknown';
      byCueStrength[cueStrengthKey] = (byCueStrength[cueStrengthKey] || 0) + 1;
      const memoryTypeKey = event.memoryType || 'unknown';
      byMemoryType[memoryTypeKey] = (byMemoryType[memoryTypeKey] || 0) + 1;
      event.cueSources.forEach((source) => {
        byCueSource[source] = (byCueSource[source] || 0) + 1;
      });
    });
    response.json({
      ok: true,
      contactId,
      sinceDays,
      summary: {
        totalEvents: events.length,
        distinctMemories: new Set(events.map((event) => event.memoryItemId).filter(Boolean)).size,
        byCueStrength,
        byCueSource,
        byMemoryType
      },
      events
    });
  } catch (error) {
    response.status(500).json(createJsonError('Failed to load cue recall report.', error?.message));
  }
});

app.get('/api/memory/decay-report', async (request, response) => {
  const sinceDays = clampIntegerEnv(request.query.sinceDays, 14, 1, 120);
  const limit = clampIntegerEnv(request.query.limit, 50, 1, 200);
  try {
    const [statusCountsResult, typeStatusResult, statusChangeResult, decayedResult, workerRunsResult, promptRecallBoostResult] = await Promise.all([
      pool.query("select status, count(*)::int as count from memory_items group by status order by status asc"),
      pool.query("select memory_type, status, count(*)::int as count from memory_items group by memory_type, status order by memory_type asc, status asc"),
      pool.query("select e.*, coalesce(cc.name, '') as contact_name from memory_events e left join chat_contacts cc on cc.id = e.contact_id where e.event_type = 'status_changed' and e.event_time >= now() - ($1::int * interval '1 day') order by e.event_time desc, e.created_at desc limit $2", [sinceDays, limit]),
      pool.query("select e.*, coalesce(cc.name, '') as contact_name from memory_events e left join chat_contacts cc on cc.id = e.contact_id where e.event_type = 'decayed' and e.event_time >= now() - ($1::int * interval '1 day') order by e.event_time desc, e.created_at desc limit $2", [sinceDays, limit]),
      pool.query("select id, status, started_at, finished_at, summary, error from migration_runs where type = 'memory_decay_worker' and started_at >= now() - ($1::int * interval '1 day') order by started_at desc limit $2", [sinceDays, limit]),
      pool.query("select count(distinct memory_item_id)::int as count from memory_events where event_type = 'recalled' and reason_code = any($2::text[]) and event_time >= now() - ($1::int * interval '1 day')", [sinceDays, ['prompt_memory_used', 'prompt_memory_cue_recall']])
    ]);
    const statusCounts = statusCountsResult.rows.reduce((accumulator, row) => {
      accumulator[normalizeMemoryStatus(row.status)] = normalizePositiveIntegerValue(row.count, 0);
      return accumulator;
    }, {});
    const typeStatusDistribution = typeStatusResult.rows.reduce((accumulator, row) => {
      const memoryType = normalizeMemoryType(row.memory_type);
      const status = normalizeMemoryStatus(row.status);
      if (!accumulator[memoryType]) {
        accumulator[memoryType] = {};
      }
      accumulator[memoryType][status] = normalizePositiveIntegerValue(row.count, 0);
      return accumulator;
    }, {});
    const recentStatusChanges = statusChangeResult.rows.map((row) => ({
      ...buildMemoryLifecycleEventSample(row),
      contactId: row.contact_id || '',
      contactName: row.contact_name || ''
    }));
    const recentDecayedEvents = decayedResult.rows.map((row) => ({
      ...buildMemoryLifecycleEventSample(row),
      contactId: row.contact_id || '',
      contactName: row.contact_name || ''
    }));
    const transitionCounts = recentStatusChanges.reduce((accumulator, event) => {
      const fromStatus = normalizeMemoryStatus(event.status?.from || '');
      const toStatus = normalizeMemoryStatus(event.status?.to || '');
      if (!fromStatus || !toStatus) {
        return accumulator;
      }
      const key = fromStatus + '->' + toStatus;
      accumulator[key] = (accumulator[key] || 0) + 1;
      return accumulator;
    }, {});
    const recentWorkerRuns = workerRunsResult.rows.map((row) => ({
      id: row.id,
      status: row.status || '',
      startedAt: row.started_at || null,
      finishedAt: row.finished_at || null,
      summary: normalizeJsonObjectValue(row.summary, {}),
      error: row.error || ''
    }));
    response.json({
      ok: true,
      sinceDays,
      statusCounts,
      typeStatusDistribution,
      transitionCounts,
      recentStatusChanges,
      recentDecayedEvents,
      recentWorkerRuns,
      promptRecallBoostedMemoryCount: normalizePositiveIntegerValue(promptRecallBoostResult.rows[0]?.count, 0),
      memoryDecayWorker: getMemoryDecayWorkerStatus()
    });
  } catch (error) {
    response.status(500).json(createJsonError('Failed to load memory decay report.', error?.message));
  }
});
app.get('/api/memory/items/:id/diagnostics', async (request, response) => {
  const id = normalizeMemoryUuid(request.params.id);
  if (!id) {
    response.status(400).json(createJsonError('Valid memory item id is required.'));
    return;
  }
  const eventLimit = clampIntegerEnv(request.query.limit, 50, 1, 200);
  try {
    const loaded = await loadMemoryItemWithRuntime(pool, id);
    if (!loaded) {
      response.status(404).json(createJsonError('Memory item was not found.'));
      return;
    }
    const [eventsResult, contactRows] = await Promise.all([
      pool.query("select * from memory_events where memory_item_id = $1 order by event_time desc, created_at desc limit $2", [id, eventLimit]),
      loadMemoryRowsForQuality(pool, { contactId: loaded.item.contactId })
    ]);
    const events = eventsResult.rows.map(mapMemoryEventRow);
    response.json({
      ok: true,
      item: loaded.item,
      runtimeState: loaded.runtimeState,
      debugPayload: normalizeJsonObjectValue(loaded.runtimeState?.debugPayload, {}),
      promptEligibility: buildMemoryPromptEligibility(loaded.item),
      quality: {
        checks: buildMemoryItemQualityChecks(loaded.item),
        similarItems: findSimilarMemoryItems(loaded.item, contactRows, 5)
      },
      recentSummary: {
        ...buildMemoryEventSummary(events),
        recalled: events.filter((event) => event.eventType === 'recalled').slice(0, 10).map(buildMemoryLifecycleEventSample),
        decayed: events.filter((event) => event.eventType === 'decayed').slice(0, 10).map(buildMemoryLifecycleEventSample),
        statusChanged: events.filter((event) => event.eventType === 'status_changed').slice(0, 10).map(buildMemoryLifecycleEventSample)
      },
      events
    });
  } catch (error) {
    response.status(500).json(createJsonError('Failed to load memory item diagnostics.', error?.message));
  }
});

app.get('/api/memory/contacts/:contactId/diagnostics', async (request, response) => {
  const contactId = String(request.params.contactId || '').trim();
  if (!contactId) {
    response.status(400).json(createJsonError('contactId is required.'));
    return;
  }
  const eventLimit = clampIntegerEnv(request.query.limit, 50, 1, 200);
  try {
    const [rows, eventsResult, contactResult] = await Promise.all([
      loadMemoryRowsForQuality(pool, { contactId }),
      pool.query("select e.*, coalesce(i.status, '') as current_status from memory_events e left join memory_items i on i.id = e.memory_item_id where e.contact_id = $1 and e.event_type = any($2::text[]) order by e.event_time desc, e.created_at desc limit $3", [contactId, ['recalled', 'decayed', 'status_changed'], eventLimit]),
      pool.query("select name from chat_contacts where id = $1 limit 1", [contactId])
    ]);
    const items = rows.map((row) => mapMemoryItemRow(row));
    const events = eventsResult.rows.map((row) => ({
      ...mapMemoryEventRow(row),
      currentStatus: normalizeMemoryStatus(row.current_status)
    }));
    const qualityReport = buildMemoryQualityReportFromRows(rows, Math.min(20, eventLimit));
    const statusCounts = items.reduce((accumulator, item) => {
      const status = normalizeMemoryStatus(item.status);
      accumulator[status] = (accumulator[status] || 0) + 1;
      return accumulator;
    }, {});
    const memoryTypeCounts = items.reduce((accumulator, item) => {
      const memoryType = normalizeMemoryType(item.memoryType);
      accumulator[memoryType] = (accumulator[memoryType] || 0) + 1;
      return accumulator;
    }, {});
    const contactName = String(contactResult.rows[0]?.name || rows[0]?.contact_name || '').trim();
    response.json({
      ok: true,
      contactId,
      contactName,
      totalItems: items.length,
      statusCounts,
      memoryTypeCounts,
      dormantCandidateCount: items.filter((item) => item.status === 'dormant' && Boolean(item.canonicalText || item.summaryShort || item.summaryFaint || item.keywords.length || item.entityRefs.length)).length,
      eventSummary: buildMemoryEventSummary(events),
      recentEvents: events.slice(0, eventLimit).map(buildMemoryLifecycleEventSample),
      quality: qualityReport
    });
  } catch (error) {
    response.status(500).json(createJsonError('Failed to load contact memory diagnostics.', error?.message));
  }
});
app.use(
  express.static(STATIC_ROOT, {
    index: ["index.html"],
    cacheControl: false,
    setHeaders(response, filePath) {
      if (shouldApplyLongCacheForStaticAsset(filePath)) {
        response.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        return;
      }
      if (path.extname(String(filePath || "").trim().toLowerCase()) === ".html") {
        response.setHeader("Cache-Control", "no-cache");
      }
    }
  })
);

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
      startMemoryDecayWorker();
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

function handleShutdownSignal(signal) {
  stopMemoryDecayWorker();
  console.log(`[Pulse Server] Received ${signal}, shutting down.`);
  if (!pool) {
    process.exit(0);
    return;
  }
  pool
    .end()
    .catch(() => {
    })
    .finally(() => {
      process.exit(0);
    });
}

process.once("SIGTERM", () => handleShutdownSignal("SIGTERM"));
process.once("SIGINT", () => handleShutdownSignal("SIGINT"));

startServer();
