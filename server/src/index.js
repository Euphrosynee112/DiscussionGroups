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

async function ensureCoreTables() {
  if (!pool) {
    return;
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
      await ensureCoreTables();
      await pool.query("select 1");
      console.log("[Pulse Server] Connected to PostgreSQL.");
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
