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
    memory_extract_v2: {
      name: "memory_extract_v2",
      deepseekMaxTokens: 2200,
      schema: {
        type: "object",
        additionalProperties: false,
        properties: {
          items: {
            type: "array",
            description: "Candidate memories extracted from the recent conversation window.",
            items: {
              type: "object",
              additionalProperties: false,
              properties: {
                action: {
                  type: "string",
                  enum: ["create", "reinforce", "supersede", "ignore"],
                  description: "Suggested action for the merge layer."
                },
                memory_type: {
                  type: "string",
                  description: "Suggested memory type such as relationship, preference, fact, scene, habit, event, or constraint."
                },
                memory_subtype: {
                  type: "string",
                  description: "Optional subtype for narrower categorization."
                },
                semantic_key: {
                  type: "string",
                  description: "Optional semantic key for stable merge matching."
                },
                canonical_text: {
                  type: "string",
                  description: "Neutral, stable memory wording."
                },
                summary_short: {
                  type: "string",
                  description: "Short prompt-ready summary for active recall."
                },
                summary_faint: {
                  type: "string",
                  description:
                    "Blurred prompt-ready summary for faint recall using third-person wording with explicit charname/username references when possible."
                },
                base_importance: {
                  type: "integer",
                  minimum: 0,
                  maximum: 100,
                  description: "Importance score from 0 to 100."
                },
                confidence: {
                  type: "number",
                  minimum: 0,
                  maximum: 1,
                  description: "Confidence score from 0 to 1."
                },
                keywords: {
                  type: "array",
                  items: {
                    type: "string"
                  }
                },
                entity_refs: {
                  type: "array",
                  items: {
                    anyOf: [{ type: "string" }, { type: "object" }]
                  }
                },
                emotion_intensity: {
                  type: "number",
                  minimum: 0,
                  maximum: 1
                },
                emotion_profile: {
                  type: "object",
                  additionalProperties: {
                    type: "number"
                  }
                },
                interaction_tendency: {
                  type: "object",
                  additionalProperties: {
                    type: "number"
                  }
                },
                emotion_summary: {
                  type: "string"
                },
                source_excerpt: {
                  type: "string"
                },
                target_memory_ref: {
                  type: "string",
                  description: "Existing memory id when the candidate reinforces or supersedes a known memory."
                },
                reason_note: {
                  type: "string",
                  description: "Short explanation of why this candidate should be merged that way."
                }
              },
              required: ["action", "reason_note"]
            }
          }
        },
        required: ["items"]
      },
      promptHint: [
        "请只返回 json，不要解释，不要 markdown。",
        'json 示例：{"items":[{"action":"create","memory_type":"relationship","canonical_text":"charname 在 username 提到公开关系时会明显紧张。","summary_short":"charname 对公开关系这件事会紧张。","summary_faint":"charname 对公开关系似乎仍有些顾虑。","base_importance":82,"confidence":0.84,"keywords":["公开关系","紧张"],"entity_refs":[],"emotion_intensity":0.58,"emotion_profile":{"紧张":0.74},"interaction_tendency":{"回避":0.46},"emotion_summary":"这件事会让 charname 下意识紧张。","source_excerpt":"她说现在公开会有点慌。","reason_note":"这会持续影响 charname 对亲密关系推进的反应。"}]}'
      ].join("\n"),
      repairExample: {
        items: [
          {
            action: "create",
            memory_type: "relationship",
            canonical_text: "charname 在 username 提到公开关系时会明显紧张。",
            summary_short: "charname 对公开关系这件事会紧张。",
            summary_faint: "charname 对公开关系似乎仍有些顾虑。",
            base_importance: 82,
            confidence: 0.84,
            keywords: ["公开关系", "紧张"],
            entity_refs: [],
            emotion_intensity: 0.58,
            emotion_profile: {
              紧张: 0.74
            },
            interaction_tendency: {
              回避: 0.46
            },
            emotion_summary: "这件事会让 charname 下意识紧张。",
            source_excerpt: "她说现在公开会有点慌。",
            reason_note: "这会持续影响 charname 对亲密关系推进的反应。"
          }
        ]
      },
      normalize(value) {
        const source = Array.isArray(value) ? { items: value } : normalizeObjectValue(value);
        if (!source) {
          return null;
        }
        const rawItems = Array.isArray(source.items)
          ? source.items
          : Array.isArray(source.memories)
            ? source.memories
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
            const action = String(normalized.action || "").trim().toLowerCase() || "create";
            const canonicalText = String(
              normalized.canonical_text ||
                normalized.canonicalText ||
                normalized.content ||
                normalized.text ||
                normalized.memory ||
                normalized.summary ||
                ""
            ).trim();
            const summaryShort = String(
              normalized.summary_short || normalized.summaryShort || canonicalText
            ).trim();
            const reasonNote = String(
              normalized.reason_note || normalized.reasonNote || ""
            ).trim();
            if (!["create", "reinforce", "supersede", "ignore"].includes(action)) {
              return null;
            }
            if (action !== "ignore" && !canonicalText) {
              return null;
            }
            if (!reasonNote) {
              return null;
            }
            return {
              action,
              memory_type: String(
                normalized.memory_type ||
                  normalized.memoryType ||
                  normalized.type ||
                  normalized.kind ||
                  normalized.category ||
                  "fact"
              )
                .trim()
                .toLowerCase(),
              memory_subtype: String(
                normalized.memory_subtype || normalized.memorySubtype || ""
              ).trim(),
              semantic_key: String(
                normalized.semantic_key || normalized.semanticKey || ""
              ).trim(),
              canonical_text: canonicalText,
              summary_short: summaryShort,
              summary_faint: String(
                normalized.summary_faint || normalized.summaryFaint || ""
              ).trim(),
              base_importance: clampInteger(
                normalized.base_importance ??
                  normalized.baseImportance ??
                  normalized.importance ??
                  normalized.score ??
                  normalized.weight,
                0,
                100
              ),
              confidence: clampNumber(
                normalized.confidence == null ? 0.72 : normalized.confidence,
                0,
                1
              ),
              keywords: Array.isArray(normalized.keywords)
                ? normalized.keywords
                    .map((entry) => String(entry || "").trim())
                    .filter(Boolean)
                : [],
              entity_refs: Array.isArray(normalized.entity_refs)
                ? normalized.entity_refs
                : Array.isArray(normalized.entityRefs)
                ? normalized.entityRefs
                : [],
              emotion_intensity:
                normalized.emotion_intensity == null && normalized.emotionIntensity == null
                  ? null
                  : clampNumber(
                      normalized.emotion_intensity ?? normalized.emotionIntensity,
                      0,
                      1
                    ),
              emotion_profile: normalizeObjectValue(
                normalized.emotion_profile || normalized.emotionProfile
              ) || {},
              interaction_tendency: normalizeObjectValue(
                normalized.interaction_tendency || normalized.interactionTendency
              ) || {},
              emotion_summary: String(
                normalized.emotion_summary || normalized.emotionSummary || ""
              ).trim(),
              source_excerpt: String(
                normalized.source_excerpt || normalized.sourceExcerpt || ""
              ).trim(),
              target_memory_ref: String(
                normalized.target_memory_ref ||
                  normalized.targetMemoryRef ||
                  normalized.target_memory_id ||
                  normalized.targetMemoryId ||
                  ""
              ).trim(),
              reason_note: reasonNote
            };
          })
          .filter(Boolean);
        return {
          items
        };
      }
    },
    forum_background_extract_v1: {
      name: "forum_background_extract_v1",
      deepseekMaxTokens: 3200,
      schema: {
        type: "object",
        additionalProperties: false,
        properties: {
          items: {
            type: "array",
            description: "Candidate forum background cards extracted from the provided layered sources.",
            items: {
              type: "object",
              additionalProperties: false,
              properties: {
                source_type: {
                  type: "string",
                  enum: ["worldbook_entry", "forum_tab_text", "forum_tab_hot_topic"]
                },
                source_id: {
                  type: "string"
                },
                source_title: {
                  type: "string"
                },
                source_layer: {
                  type: "string",
                  enum: [
                    "history_base",
                    "recent_campaign",
                    "observable_timeline",
                    "tab_background",
                    "tab_background_history",
                    "hot_topic"
                  ]
                },
                source_excerpt: {
                  type: "string"
                },
                truth_level: {
                  type: "string",
                  enum: [
                    "worldbook_fact",
                    "tab_setting",
                    "community_viewpoint",
                    "community_speculation",
                    "interpretation_frame",
                    "discussion_structure"
                  ]
                },
                knowledge_domain: {
                  type: "string"
                },
                summary: {
                  type: "string"
                },
                detail_text: {
                  type: "string"
                },
                suitable_roles: {
                  type: "array",
                  items: {
                    type: "string"
                  }
                },
                keywords: {
                  type: "array",
                  items: {
                    type: "string"
                  }
                },
                confidence: {
                  type: "number",
                  minimum: 0,
                  maximum: 1
                },
                reason_note: {
                  type: "string"
                }
              },
              required: [
                "source_type",
                "source_id",
                "source_layer",
                "source_excerpt",
                "truth_level",
                "knowledge_domain",
                "summary",
                "detail_text",
                "suitable_roles",
                "reason_note"
              ]
            }
          }
        },
        required: ["items"]
      },
      promptHint: [
        "请只返回 json，不要解释，不要 markdown。",
        'json 示例：{"items":[{"source_type":"worldbook_entry","source_id":"worldbook_entry_xxx","source_title":"Jessie的公开行程","source_layer":"observable_timeline","source_excerpt":"4月到6月公开行程密集。","truth_level":"worldbook_fact","knowledge_domain":"schedule_timeline","summary":"Jessie 近期公开行程密集，讨论时常被拿来解释状态波动。","detail_text":"适合让行程状态型和老角色用来解释近期舞台起伏，但不要自动推出唯一结论。","suitable_roles":["schedule_tracker","old_guard","career_fan"],"keywords":["公开行程","状态"],"confidence":0.86,"reason_note":"这是稳定、可持续调用的近期背景。"}]}'
      ].join("\n"),
      repairExample: {
        items: [
          {
            source_type: "worldbook_entry",
            source_id: "worldbook_entry_xxx",
            source_title: "Jessie的公开行程",
            source_layer: "observable_timeline",
            source_excerpt: "4月到6月公开行程密集。",
            truth_level: "worldbook_fact",
            knowledge_domain: "schedule_timeline",
            summary: "Jessie 近期公开行程密集，讨论时常被拿来解释状态波动。",
            detail_text:
              "适合让行程状态型和老角色用来解释近期舞台起伏，但不要自动推出唯一结论。",
            suitable_roles: ["schedule_tracker", "old_guard", "career_fan"],
            keywords: ["公开行程", "状态"],
            confidence: 0.86,
            reason_note: "这是稳定、可持续调用的近期背景。"
          }
        ]
      },
      normalize(value) {
        const source = Array.isArray(value) ? { items: value } : normalizeObjectValue(value);
        if (!source) {
          return null;
        }
        const rawItems = Array.isArray(source.items)
          ? source.items
          : Array.isArray(source.cards)
            ? source.cards
            : null;
        if (!Array.isArray(rawItems)) {
          return null;
        }
        const allowedSourceTypes = new Set(["worldbook_entry", "forum_tab_text", "forum_tab_hot_topic"]);
        const allowedSourceLayers = new Set([
          "history_base",
          "recent_campaign",
          "observable_timeline",
          "tab_background",
          "hot_topic"
        ]);
        const allowedTruthLevels = new Set([
          "worldbook_fact",
          "tab_setting",
          "community_viewpoint",
          "community_speculation",
          "interpretation_frame",
          "discussion_structure"
        ]);
        const items = rawItems
          .map((item) => {
            const normalized = normalizeObjectValue(item);
            if (!normalized) {
              return null;
            }
            const sourceType = String(
              normalized.source_type || normalized.sourceType || ""
            )
              .trim()
              .toLowerCase();
            const sourceId = String(
              normalized.source_id || normalized.sourceId || ""
            ).trim();
            const sourceLayer = String(
              normalized.source_layer || normalized.sourceLayer || ""
            )
              .trim()
              .toLowerCase();
            const truthLevel = String(
              normalized.truth_level || normalized.truthLevel || ""
            )
              .trim()
              .toLowerCase();
            const sourceExcerpt = String(
              normalized.source_excerpt || normalized.sourceExcerpt || ""
            ).trim();
            const knowledgeDomain = String(
              normalized.knowledge_domain || normalized.knowledgeDomain || ""
            ).trim();
            const summary = String(normalized.summary || "").trim();
            const detailText = String(
              normalized.detail_text || normalized.detailText || ""
            ).trim();
            const reasonNote = String(
              normalized.reason_note || normalized.reasonNote || ""
            ).trim();
            if (
              !allowedSourceTypes.has(sourceType) ||
              !sourceId ||
              !allowedSourceLayers.has(sourceLayer) ||
              !allowedTruthLevels.has(truthLevel) ||
              !sourceExcerpt ||
              !knowledgeDomain ||
              !summary ||
              !detailText ||
              !reasonNote
            ) {
              return null;
            }
            return {
              source_type: sourceType,
              source_id: sourceId,
              source_title: String(
                normalized.source_title || normalized.sourceTitle || ""
              ).trim(),
              source_layer: sourceLayer,
              source_excerpt: sourceExcerpt,
              truth_level: truthLevel,
              knowledge_domain: knowledgeDomain,
              summary,
              detail_text: detailText,
              suitable_roles: Array.isArray(normalized.suitable_roles)
                ? normalized.suitable_roles
                    .map((entry) => String(entry || "").trim())
                    .filter(Boolean)
                : Array.isArray(normalized.suitableRoles)
                  ? normalized.suitableRoles
                      .map((entry) => String(entry || "").trim())
                      .filter(Boolean)
                  : [],
              keywords: Array.isArray(normalized.keywords)
                ? normalized.keywords
                    .map((entry) => String(entry || "").trim())
                    .filter(Boolean)
                : [],
              confidence: clampNumber(
                normalized.confidence == null ? 0.8 : normalized.confidence,
                0,
                1
              ),
              reason_note: reasonNote
            };
          })
          .filter(Boolean)
          .slice(0, 24);
        return {
          items
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
    },
    live_hot_topic_summary_v1: {
      name: "live_hot_topic_summary_v1",
      deepseekMaxTokens: 360,
      schema: {
        type: "object",
        additionalProperties: false,
        properties: {
          summaryText: {
            type: "string",
            description: "A single 60-90 Chinese character hot topic summary from the livestream."
          }
        },
        required: ["summaryText"]
      },
      promptHint: [
        "请只返回 json，不要解释，不要 markdown。",
        'json 示例：{"summaryText":"直播里围绕新歌和近况聊了不少，观众明显偏向被轻松氛围安抚，整体风向更像一次温柔回暖。"}'
      ].join("\n"),
      repairExample: {
        summaryText:
          "直播里围绕新歌和近况聊了不少，观众明显偏向被轻松氛围安抚，整体风向更像一次温柔回暖。"
      },
      normalize(value) {
        const source = normalizeObjectValue(value);
        if (!source) {
          return null;
        }
        const summaryText = String(
          source.summaryText || source.summary_text || source.text || source.summary || ""
        ).trim();
        return summaryText ? { summaryText } : null;
      }
    },
    live_controversial_hot_topic_v1: {
      name: "live_controversial_hot_topic_v1",
      deepseekMaxTokens: 360,
      schema: {
        type: "object",
        additionalProperties: false,
        properties: {
          controversialTopicText: {
            type: "string",
            description:
              "A single 60-90 Chinese character controversial hot topic derived from 2-3 livestream fragments."
          }
        },
        required: ["controversialTopicText"]
      },
      promptHint: [
        "请只返回 json，不要解释，不要 markdown。",
        'json 示例：{"controversialTopicText":"有人截出“累了”“先不说”“随便吧”三句放大解读，质疑这场直播情绪不稳，讨论迅速转向是否在暗示不满。"}'
      ].join("\n"),
      repairExample: {
        controversialTopicText:
          "有人截出“累了”“先不说”“随便吧”三句放大解读，质疑这场直播情绪不稳，讨论迅速转向是否在暗示不满。"
      },
      normalize(value) {
        const source = normalizeObjectValue(value);
        if (!source) {
          return null;
        }
        const controversialTopicText = String(
          source.controversialTopicText ||
            source.controversial_topic_text ||
            source.topicText ||
            source.text ||
            source.summary ||
            ""
        ).trim();
        return controversialTopicText ? { controversialTopicText } : null;
      }
    },
    signing_seed_review_v1: {
      name: "signing_seed_review_v1",
      deepseekMaxTokens: 420,
      schema: {
        type: "object",
        additionalProperties: false,
        properties: {
          discussionText: {
            type: "string",
            description:
              "A single discussion body paragraph describing a fan's signing review without any signature."
          }
        },
        required: ["discussionText"]
      },
      promptHint: [
        "请只返回 json，不要解释，不要 markdown。",
        'json 示例：{"discussionText":"今天这场签售比想象里还近，前面聊到活动时她接得特别认真，后面被提醒时间快到了以后语气突然更温柔，整个人会让人有点舍不得走。"}'
      ].join("\n"),
      repairExample: {
        discussionText:
          "今天这场签售比想象里还近，前面聊到活动时她接得特别认真，后面被提醒时间快到了以后语气突然更温柔，整个人会让人有点舍不得走。"
      },
      normalize(value) {
        const source = normalizeObjectValue(value);
        if (!source) {
          return null;
        }
        const discussionText = String(
          source.discussionText || source.discussion_text || source.text || source.content || ""
        ).trim();
        return discussionText ? { discussionText } : null;
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

  function clampNumber(value, min, max) {
    const parsed = Number(value);
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
