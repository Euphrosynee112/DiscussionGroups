(function attachPulseStructuredOutput(globalScope) {
  const root = globalScope || (typeof window !== "undefined" ? window : globalThis);

  const CONTRACTS = {
    schedule_invite_decision_v1: {
      name: "schedule_invite_decision_v1",
      deepseekMaxTokens: 240,
      schema: {
        type: "object",
        additionalProperties: false,
        properties: {
          decision: {
            type: "string",
            enum: ["accept", "reject"],
            description: "Whether the character accepts or rejects the invite."
          },
          reply: {
            type: "string",
            description: "Natural chat-style reply text that will be shown to the user."
          }
        },
        required: ["decision", "reply"]
      },
      promptHint: [
        "请只返回 json，不要解释，不要 markdown。",
        'json 示例：{"decision":"accept","reply":"好呀，明天中午可以。"}'
      ].join("\n"),
      repairExample: {
        decision: "accept",
        reply: "好呀，明天中午可以。"
      },
      normalize(value) {
        const source = normalizeObjectValue(value);
        if (!source) {
          return null;
        }
        const decision = String(source.decision || "").trim().toLowerCase();
        const reply = String(source.reply || source.text || source.message || "").trim();
        if (!["accept", "reject"].includes(decision) || !reply) {
          return null;
        }
        return {
          decision,
          reply
        };
      }
    },
    memory_extract_v1: {
      name: "memory_extract_v1",
      deepseekMaxTokens: 1400,
      schema: {
        type: "object",
        additionalProperties: false,
        properties: {
          memories: {
            type: "array",
            description: "Extracted memories from the recent conversation window.",
            items: {
              type: "object",
              additionalProperties: false,
              properties: {
                type: {
                  type: "string",
                  enum: ["core", "scene"],
                  description: "core for stable mindset/personality shifts, scene for contextual memories."
                },
                content: {
                  type: "string",
                  description: "Short, neutral memory text."
                },
                importance: {
                  type: "integer",
                  minimum: 0,
                  maximum: 100,
                  description: "Importance score from 0 to 100."
                }
              },
              required: ["type", "content", "importance"]
            }
          }
        },
        required: ["memories"]
      },
      promptHint: [
        "请只返回 json，不要解释，不要 markdown。",
        'json 示例：{"memories":[{"type":"scene","content":"你们约好这周六一起去看展。","importance":72}]}'
      ].join("\n"),
      repairExample: {
        memories: [
          {
            type: "scene",
            content: "你们约好这周六一起去看展。",
            importance: 72
          }
        ]
      },
      normalize(value) {
        const source =
          Array.isArray(value)
            ? { memories: value }
            : normalizeObjectValue(value);
        if (!source) {
          return null;
        }
        const rawMemories = Array.isArray(source.memories)
          ? source.memories
          : Array.isArray(source.items)
            ? source.items
            : null;
        if (!Array.isArray(rawMemories)) {
          return null;
        }
        const memories = rawMemories
          .map((item) => {
            const normalized = normalizeObjectValue(item);
            if (!normalized) {
              return null;
            }
            const type = String(
              normalized.type ||
                normalized.memoryType ||
                normalized.kind ||
                normalized.category ||
                ""
            )
              .trim()
              .toLowerCase();
            const content = String(
              normalized.content ||
                normalized.text ||
                normalized.memory ||
                normalized.summary ||
                ""
            ).trim();
            const importance = clampInteger(
              normalized.importance ?? normalized.score ?? normalized.weight,
              0,
              100
            );
            if (!["core", "scene"].includes(type) || !content) {
              return null;
            }
            return {
              type,
              content,
              importance
            };
          })
          .filter(Boolean);
        return {
          memories
        };
      }
    },
    auto_schedule_fill_v1: {
      name: "auto_schedule_fill_v1",
      deepseekMaxTokens: 2200,
      schema: {
        type: "object",
        additionalProperties: false,
        properties: {
          items: {
            type: "array",
            description: "Generated hourly schedule items that only fill empty slots.",
            items: {
              type: "object",
              additionalProperties: false,
              properties: {
                date: {
                  type: "string",
                  format: "date",
                  description: "The calendar date in YYYY-MM-DD."
                },
                title: {
                  type: "string",
                  description: "Short schedule title."
                },
                startTime: {
                  type: "string",
                  description: "Hour-aligned start time in HH:00, for example 09:00."
                },
                endTime: {
                  type: "string",
                  description: "Hour-aligned end time in HH:00, for example 10:00."
                }
              },
              required: ["date", "title", "startTime", "endTime"]
            }
          }
        },
        required: ["items"]
      },
      promptHint: [
        "请只返回 json，不要解释，不要 markdown。",
        'json 示例：{"items":[{"date":"2026-04-14","title":"午餐","startTime":"12:00","endTime":"13:00"}]}'
      ].join("\n"),
      repairExample: {
        items: [
          {
            date: "2026-04-14",
            title: "午餐",
            startTime: "12:00",
            endTime: "13:00"
          }
        ]
      },
      normalize(value) {
        const source =
          Array.isArray(value)
            ? { items: value }
            : normalizeObjectValue(value);
        if (!source) {
          return null;
        }
        const rawItems = Array.isArray(source.items)
          ? source.items
          : Array.isArray(source.schedules)
            ? source.schedules
            : null;
        if (!Array.isArray(rawItems)) {
          return null;
        }
        const items = rawItems
          .map((item) => {
            const normalized = normalizeObjectValue(item);
            if (!normalized) {
              return null;
            }
            const date = String(normalized.date || "").trim();
            const title = String(normalized.title || normalized.name || "").trim();
            const startTime = String(normalized.startTime || "").trim();
            const endTime = String(normalized.endTime || "").trim();
            if (!date || !title || !startTime || !endTime) {
              return null;
            }
            return {
              date,
              title,
              startTime,
              endTime
            };
          })
          .filter(Boolean);
        return {
          items
        };
      }
    },
    chat_presence_update_v1: {
      name: "chat_presence_update_v1",
      deepseekMaxTokens: 900,
      schema: {
        type: "object",
        additionalProperties: false,
        properties: {
          reply_text: {
            type: "string",
            description: "The natural chat reply text to show in the conversation."
          },
          presence_update: {
            type: "object",
            additionalProperties: false,
            properties: {
              presenceType: {
                type: "string",
                enum: ["at_place", "in_transit"]
              },
              placeName: {
                type: "string"
              },
              fromPlaceName: {
                type: "string"
              },
              toPlaceName: {
                type: "string"
              }
            },
            required: ["presenceType"]
          }
        },
        required: ["reply_text"]
      },
      promptHint: [
        "请只返回 json，不要解释，不要 markdown。",
        'json 示例：{"reply_text":"我现在过去找你。","presence_update":{"presenceType":"in_transit","toPlaceName":"公司"}}'
      ].join("\n"),
      repairExample: {
        reply_text: "我现在过去找你。",
        presence_update: {
          presenceType: "in_transit",
          toPlaceName: "公司"
        }
      },
      normalize(value) {
        const source = normalizeObjectValue(value);
        if (!source) {
          return null;
        }
        const replyText = String(
          source.reply_text || source.replyText || source.text || source.reply || ""
        ).trim();
        if (!replyText) {
          return null;
        }
        const rawPresence = normalizeObjectValue(source.presence_update || source.presenceUpdate);
        const presenceType =
          String(rawPresence?.presenceType || "").trim() === "in_transit"
            ? "in_transit"
            : String(rawPresence?.presenceType || "").trim() === "at_place"
              ? "at_place"
              : "";
        const normalizedPresence = presenceType
          ? {
              presenceType,
              placeName: String(rawPresence?.placeName || "").trim(),
              fromPlaceName: String(rawPresence?.fromPlaceName || "").trim(),
              toPlaceName: String(rawPresence?.toPlaceName || "").trim()
            }
          : null;
        return {
          reply_text: replyText,
          presence_update: normalizedPresence
        };
      }
    }
  };

  function normalizeObjectValue(value) {
    return value && typeof value === "object" && !Array.isArray(value) ? value : null;
  }

  function clampInteger(value, min, max) {
    const parsed = Number.parseInt(String(value ?? ""), 10);
    if (!Number.isFinite(parsed)) {
      return min;
    }
    return Math.max(min, Math.min(max, parsed));
  }

  function normalizeApiMode(mode) {
    if (mode === "gemini" || mode === "generic" || mode === "grok") {
      return mode;
    }
    return "openai";
  }

  function resolveEndpointHost(endpoint) {
    const trimmed = String(endpoint || "").trim();
    if (!trimmed) {
      return "";
    }
    try {
      return String(new URL(trimmed).hostname || "").trim().toLowerCase();
    } catch (_error) {
      return "";
    }
  }

  function detectProvider(settings = {}) {
    const mode = normalizeApiMode(settings.mode);
    const host = resolveEndpointHost(settings.endpoint);
    if (mode === "grok") {
      return "openai_schema";
    }
    if (mode === "gemini") {
      return "gemini_schema";
    }
    if (mode === "openai") {
      if (host.includes("deepseek.com")) {
        return "deepseek_json";
      }
      if (host.includes("openai.com")) {
        return "openai_schema";
      }
    }
    return "none";
  }

  function deepClone(value) {
    try {
      return JSON.parse(JSON.stringify(value));
    } catch (_error) {
      return value;
    }
  }

  function addGeminiPropertyOrdering(schema) {
    if (!schema || typeof schema !== "object" || Array.isArray(schema)) {
      return schema;
    }

    const cloned = {};
    Object.keys(schema).forEach((key) => {
      const value = schema[key];
      if (Array.isArray(value)) {
        cloned[key] = value.map((item) => addGeminiPropertyOrdering(item));
      } else if (value && typeof value === "object") {
        cloned[key] = addGeminiPropertyOrdering(value);
      } else {
        cloned[key] = value;
      }
    });

    if (
      cloned.type === "object" &&
      cloned.properties &&
      typeof cloned.properties === "object" &&
      !Array.isArray(cloned.properties)
    ) {
      const propertyKeys = Object.keys(cloned.properties);
      if (propertyKeys.length && !Array.isArray(cloned.propertyOrdering)) {
        cloned.propertyOrdering = propertyKeys;
      }
      propertyKeys.forEach((key) => {
        cloned.properties[key] = addGeminiPropertyOrdering(cloned.properties[key]);
      });
    }

    if (cloned.items && typeof cloned.items === "object") {
      cloned.items = addGeminiPropertyOrdering(cloned.items);
    }

    return cloned;
  }

  function parseJsonLikeContent(value) {
    if (value && typeof value === "object") {
      return null;
    }

    const text = String(value || "").trim();
    if (!text) {
      return null;
    }

    const candidates = [text];
    const fenceMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
    if (fenceMatch?.[1]) {
      candidates.push(String(fenceMatch[1] || "").trim());
    }
    const objectStart = text.indexOf("{");
    const objectEnd = text.lastIndexOf("}");
    if (objectStart >= 0 && objectEnd > objectStart) {
      candidates.push(text.slice(objectStart, objectEnd + 1));
    }
    const arrayStart = text.indexOf("[");
    const arrayEnd = text.lastIndexOf("]");
    if (arrayStart >= 0 && arrayEnd > arrayStart) {
      candidates.push(text.slice(arrayStart, arrayEnd + 1));
    }

    for (const candidate of candidates) {
      try {
        return JSON.parse(candidate);
      } catch (_error) {
      }
    }
    return null;
  }

  function resolvePayloadText(payload) {
    if (typeof payload === "string") {
      return payload.trim();
    }
    const geminiParts = payload?.candidates?.[0]?.content?.parts;
    if (Array.isArray(geminiParts)) {
      const merged = geminiParts
        .map((item) => item?.text || "")
        .join("\n")
        .trim();
      if (merged) {
        return merged;
      }
    }
    const content = payload?.choices?.[0]?.message?.content;
    if (typeof content === "string" && content.trim()) {
      return content.trim();
    }
    if (Array.isArray(content)) {
      const merged = content
        .map((item) => item?.text || item?.content || "")
        .join("\n")
        .trim();
      if (merged) {
        return merged;
      }
    }
    return String(
      payload?.message ||
        payload?.text ||
        payload?.content ||
        payload?.data?.message ||
        payload?.output?.[0]?.content?.[0]?.text ||
        ""
    ).trim();
  }

  function createRequestContext(settings = {}, contractName = "") {
    const contract = CONTRACTS[contractName] || null;
    if (!contract) {
      return {
        enabled: false,
        provider: "none",
        contractName: "",
        contract: null
      };
    }
    const provider = detectProvider(settings);
    return {
      enabled: provider !== "none",
      provider,
      contractName,
      contract,
      schema:
        provider === "gemini_schema"
          ? addGeminiPropertyOrdering(contract.schema)
          : contract.schema
    };
  }

  function decorateRequestBody(baseBody, context) {
    if (!context?.enabled || !context?.contract) {
      return baseBody;
    }

    const requestBody = deepClone(baseBody);
    if (!requestBody || typeof requestBody !== "object") {
      return baseBody;
    }

    if (context.provider === "openai_schema") {
      requestBody.response_format = {
        type: "json_schema",
        json_schema: {
          name: context.contract.name,
          strict: true,
          schema: context.schema
        }
      };
      return requestBody;
    }

    if (context.provider === "gemini_schema") {
      requestBody.generationConfig = {
        ...(requestBody.generationConfig || {}),
        responseMimeType: "application/json",
        responseJsonSchema: context.schema
      };
      return requestBody;
    }

    if (context.provider === "deepseek_json") {
      requestBody.response_format = {
        type: "json_object"
      };
      if (
        !Number.isFinite(Number(requestBody.max_tokens)) &&
        Number.isFinite(Number(context.contract.deepseekMaxTokens))
      ) {
        requestBody.max_tokens = Number(context.contract.deepseekMaxTokens);
      }
      return requestBody;
    }

    return requestBody;
  }

  function parseStructuredResponse(payload, context) {
    if (!context?.enabled || !context?.contract?.normalize) {
      return null;
    }

    const candidates = [];
    if (payload && typeof payload === "object") {
      candidates.push(payload);
    }

    const payloadText = resolvePayloadText(payload);
    if (payloadText) {
      const parsedFromText = parseJsonLikeContent(payloadText);
      if (parsedFromText) {
        candidates.push(parsedFromText);
      }
    }

    for (const candidate of candidates) {
      const normalized = context.contract.normalize(candidate);
      if (normalized) {
        return normalized;
      }
    }

    return null;
  }

  function getPromptHint(context) {
    return String(context?.contract?.promptHint || "").trim();
  }

  function buildRepairInstruction(context, rawText = "", errorMessage = "") {
    if (!context?.contract) {
      return "";
    }
    const sampleJson = JSON.stringify(context.contract.repairExample || {}, null, 2);
    return [
      "请把下面这段内容修复成合法 json。",
      "必须只返回 json，不要解释，不要 markdown，不要补充额外文字。",
      `目标结构名：${context.contract.name}`,
      sampleJson ? `参考 json 示例：\n${sampleJson}` : "",
      errorMessage ? `当前问题：${String(errorMessage || "").trim()}` : "",
      `待修复内容：\n${String(rawText || "").trim()}`
    ]
      .filter(Boolean)
      .join("\n\n");
  }

  root.PulseStructuredOutput = {
    createRequestContext,
    decorateRequestBody,
    parseStructuredResponse,
    getPromptHint,
    buildRepairInstruction,
    detectProvider
  };
})(typeof window !== "undefined" ? window : globalThis);
