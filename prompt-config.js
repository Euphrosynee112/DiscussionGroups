(function initPulsePromptConfig() {
  if (window.PulsePromptConfig) {
    return;
  }

  const SECTION_KEYS = [
    "context_library",
    "persona_alignment",
    "current_state_awareness",
    "output_standard"
  ];
  const SECTION_KEY_ALIASES = {
    context_library: "context_library",
    contextLibrary: "context_library",
    persona_alignment: "persona_alignment",
    personaAlignment: "persona_alignment",
    current_state_awareness: "current_state_awareness",
    currentStateAwareness: "current_state_awareness",
    output_standard: "output_standard",
    outputStandard: "output_standard"
  };
  const SECTION_LABELS = {
    context_library: "context_library",
    persona_alignment: "persona_alignment",
    current_state_awareness: "current_state_awareness",
    output_standard: "output_standard"
  };
  const SECTION_FALLBACKS = {
    context_library: "暂无额外背景信息。",
    persona_alignment: "按当前已知身份与语境自然输出。",
    current_state_awareness: "暂无额外状态感知。",
    output_standard: "只输出符合要求的最终结果。"
  };

  function trimText(value) {
    return String(value || "").trim();
  }

  function uniqueStrings(values = []) {
    const unique = new Set();
    return (Array.isArray(values) ? values : [values])
      .map((item) => trimText(item))
      .filter((item) => {
        if (!item || unique.has(item)) {
          return false;
        }
        unique.add(item);
        return true;
      });
  }

  function normalizeSectionKey(key = "") {
    return SECTION_KEY_ALIASES[String(key || "").trim()] || "";
  }

  function clonePlain(value) {
    if (Array.isArray(value)) {
      return value.map((item) => clonePlain(item));
    }
    if (value && typeof value === "object") {
      return Object.fromEntries(
        Object.entries(value).map(([key, item]) => [key, clonePlain(item)])
      );
    }
    return value;
  }

  function interpolateTemplate(template = "", variables = {}) {
    return String(template || "").replace(/\{\{([a-zA-Z0-9_]+)\}\}/g, (_match, key) => {
      return Object.prototype.hasOwnProperty.call(variables || {}, key)
        ? String(variables[key] ?? "")
        : "";
    });
  }

  function parseTemplateSegments(template = "") {
    const text = String(template || "");
    const pattern = /\{\{([a-zA-Z0-9_]+)\}\}/g;
    const segments = [];
    let lastIndex = 0;
    let match = pattern.exec(text);
    while (match) {
      segments.push({
        type: "text",
        value: text.slice(lastIndex, match.index)
      });
      segments.push({
        type: "placeholder",
        key: String(match[1] || "").trim(),
        value: match[0]
      });
      lastIndex = match.index + match[0].length;
      match = pattern.exec(text);
    }
    segments.push({
      type: "text",
      value: text.slice(lastIndex)
    });
    return segments;
  }

  function updateTemplateTextSegment(template = "", segmentIndex = -1, nextValue = "") {
    const resolvedSegmentIndex = Number.parseInt(String(segmentIndex), 10);
    const segments = parseTemplateSegments(template);
    if (!Number.isInteger(resolvedSegmentIndex) || resolvedSegmentIndex < 0 || resolvedSegmentIndex >= segments.length) {
      return String(template || "");
    }
    if (segments[resolvedSegmentIndex]?.type !== "text") {
      return String(template || "");
    }
    segments[resolvedSegmentIndex] = {
      ...segments[resolvedSegmentIndex],
      value: String(nextValue ?? "")
    };
    return segments.map((segment) => String(segment?.value || "")).join("");
  }

  function normalizeManualTimeSettings(source = {}, fallbackNow = new Date()) {
    const resolved = source && typeof source === "object" ? source : {};
    const now =
      fallbackNow instanceof Date && Number.isFinite(fallbackNow.getTime())
        ? new Date(fallbackNow.getTime())
        : new Date();
    const nowTimestamp = now.getTime();
    const value = trimText(resolved.value || resolved.timestamp || "");
    const parsed = value ? new Date(value) : null;
    const parsedTimestamp =
      parsed && Number.isFinite(parsed.getTime()) ? parsed.getTime() : Number.NaN;
    const rawOffsetMs = Number(resolved.offsetMs);
    const hasValidOffsetMs = Number.isFinite(rawOffsetMs);
    const offsetMs = hasValidOffsetMs
      ? Math.round(rawOffsetMs)
      : Number.isFinite(parsedTimestamp)
        ? Math.round(parsedTimestamp - nowTimestamp)
        : 0;
    return {
      enabled: Boolean(resolved.enabled && Number.isFinite(offsetMs)),
      value: Number.isFinite(parsedTimestamp) ? value : "",
      offsetMs: Number.isFinite(offsetMs) ? offsetMs : 0,
      savedAt: Number.isFinite(Number(resolved.savedAt))
        ? Number(resolved.savedAt)
        : nowTimestamp
    };
  }

  function createManualTimeSettings(targetValue = "", enabled = true, referenceNow = new Date()) {
    const now =
      referenceNow instanceof Date && Number.isFinite(referenceNow.getTime())
        ? new Date(referenceNow.getTime())
        : new Date();
    const value = trimText(targetValue);
    const parsed = value ? new Date(value) : null;
    const parsedTimestamp =
      parsed && Number.isFinite(parsed.getTime()) ? parsed.getTime() : Number.NaN;
    if (!Boolean(enabled) || !Number.isFinite(parsedTimestamp)) {
      return {
        enabled: false,
        value: Number.isFinite(parsedTimestamp) ? formatDateTimeInputValue(parsed) : value,
        offsetMs: 0,
        savedAt: now.getTime()
      };
    }
    return {
      enabled: true,
      value: formatDateTimeInputValue(parsed),
      offsetMs: Math.round(parsedTimestamp - now.getTime()),
      savedAt: now.getTime()
    };
  }

  function formatDateTimeInputValue(date = new Date()) {
    const resolved = date instanceof Date ? date : new Date(date || Date.now());
    if (!Number.isFinite(resolved.getTime())) {
      return "";
    }
    const year = resolved.getFullYear();
    const month = String(resolved.getMonth() + 1).padStart(2, "0");
    const day = String(resolved.getDate()).padStart(2, "0");
    const hour = String(resolved.getHours()).padStart(2, "0");
    const minute = String(resolved.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hour}:${minute}`;
  }

  function resolvePromptNow(settings = {}, fallbackNow = new Date()) {
    const baseNow =
      fallbackNow instanceof Date && Number.isFinite(fallbackNow.getTime())
        ? new Date(fallbackNow.getTime())
        : new Date(fallbackNow || Date.now());
    const manualTimeSettings = normalizeManualTimeSettings(settings?.manualTimeSettings, baseNow);
    if (manualTimeSettings.enabled) {
      const manualNow = new Date(baseNow.getTime() + manualTimeSettings.offsetMs);
      if (Number.isFinite(manualNow.getTime())) {
        return manualNow;
      }
    }
    if (fallbackNow instanceof Date && Number.isFinite(fallbackNow.getTime())) {
      return new Date(fallbackNow.getTime());
    }
    const nextDate = new Date(fallbackNow || Date.now());
    return Number.isFinite(nextDate.getTime()) ? nextDate : new Date();
  }

  function formatPromptTimeLabel(settings = {}, locale = "zh-CN") {
    const manualTimeSettings = normalizeManualTimeSettings(settings?.manualTimeSettings);
    if (!manualTimeSettings.enabled) {
      return "跟随本地时间";
    }
    const resolved = resolvePromptNow(settings);
    return new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    })
      .format(resolved)
      .replace(/\//g, "-");
  }

  function createTemplateItem(id, label, defaultText) {
    return {
      id,
      kind: "template",
      label,
      defaultText: String(defaultText || "")
    };
  }

  function createDynamicItem(id, label, runtimeHint = "") {
    return {
      id,
      kind: "dynamic",
      label,
      runtimeHint: trimText(runtimeHint)
    };
  }

  const PROMPT_RULE_CATALOG = {
    discussion_generate_posts: {
      label: "论坛发帖",
      group: "论坛",
      description: "生成首页讨论流",
      sections: {
        context_library: [
          createTemplateItem("worldview_intro", "世界观引导", "所有内容都应遵循以下世界观："),
          createDynamicItem("worldview_content", "世界观内容", "读取论坛世界观文本"),
          createDynamicItem("forum_setting", "讨论区一手设定", "读取当前页签设定"),
          createDynamicItem("time_awareness", "时间感知", "读取当前生效时间"),
          createDynamicItem("worldbook_reference", "世界书辅助背景", "读取挂载世界书"),
          createDynamicItem("dominant_hot_topic", "主导热点说明", "读取页签热点"),
          createDynamicItem("supplemental_topics", "即时讨论语境", "读取 Bubble / 转发挂载"),
          createDynamicItem("repost_hint", "转发原帖提示", "读取最近论坛动态挂载"),
          createDynamicItem("history_avoidance", "历史去重提示", "读取最近缓存帖子")
        ],
        persona_alignment: [
          createTemplateItem(
            "assistant_role",
            "助手定位",
            "你是一个负责生成 X 风格中文讨论流的内容助手。"
          ),
          createTemplateItem(
            "feed_target",
            "目标讨论区",
            "当前目标论坛讨论区是“{{feedLabel}}”。"
          )
        ],
        output_standard: [
          createTemplateItem(
            "json_count",
            "JSON 数量要求",
            "请严格输出 JSON 数组，并且包含 {{count}} 个对象，不要输出额外解释。"
          ),
          createTemplateItem(
            "required_fields",
            "对象字段",
            "每个对象必须包含以下字段：displayName, handle, text, tags, replies, reposts, likes, views。"
          ),
          createTemplateItem(
            "repost_source_optional",
            "转发原帖字段",
            "如需表现转发/引用帖子，可额外输出可选字段 repostSource；其中应包含 displayName, handle, text, time, tags，未使用时可省略。"
          ),
          createTemplateItem(
            "json_valid",
            "合法 JSON",
            "输出必须是可以直接被 JSON.parse 解析的合法 JSON，所有字符串都必须使用双引号包裹。"
          ),
          createTemplateItem(
            "text_length",
            "正文长度",
            "text 需要像 X 首页上的真实讨论帖，长度控制在 50 到 300 字之间，语气自然、有观点、有轻微冲突感。"
          ),
          createTemplateItem(
            "region_style",
            "地区风格",
            "不同帖子需要分别模拟来自中国、日本、韩国、美国社区的用户发言风格。"
          ),
          createTemplateItem(
            "single_language",
            "单语要求",
            "每一条帖子必须全文保持单一语言，只能四选一：中文、日文、韩文、英文。不要在同一条帖子里混用多种语言，也不要出现中文正文里夹几句英文或日文的情况。"
          ),
          createTemplateItem(
            "multiline_style",
            "排版要求",
            "text 要避免整段大段文字，尽量拆成短句；每条至少 2 段，可使用换行或空一行让版式更像真人发帖。"
          ),
          createTemplateItem(
            "tags_requirement",
            "标签数量",
            "tags 必须是数组，至少 2 个、最多 5 个标签；每个标签都必须以 # 开头，例如 #榜单、#行业洞察。"
          ),
          createTemplateItem(
            "tags_quality",
            "标签质量",
            "这些标签必须根据该条内容本身提炼，不能空泛重复；text 字段里不要重复输出标签行，标签只放在 tags 数组中。"
          ),
          createTemplateItem(
            "avoid_copy",
            "避免照抄",
            "严禁直接复制、引用或轻微改写世界观文本或论坛设定里的原句。你需要先理解这些设定，再把它们转化成更口语化、更具体的讨论表达。"
          ),
          createTemplateItem(
            "uniqueness",
            "去重要求",
            "请保证 {{count}} 条内容不重复，角度不同；即使围绕同一大主题，也要主动拆出不同争议点、不同立场、不同细节切口。"
          )
        ]
      }
    },
    discussion_generate_replies: {
      label: "论坛回复",
      group: "论坛",
      description: "生成主贴 / 楼中楼回复",
      sections: {
        context_library: [
          createTemplateItem("worldview_intro", "世界观引导", "整体世界观："),
          createDynamicItem("worldview_content", "世界观内容", "读取论坛世界观文本"),
          createDynamicItem("forum_setting", "讨论区一手设定", "读取当前页签设定"),
          createDynamicItem("time_awareness", "时间感知", "读取当前生效时间"),
          createDynamicItem("worldbook_reference", "世界书辅助背景", "读取挂载世界书"),
          createDynamicItem("hot_topic", "主导热点", "读取页签热点"),
          createDynamicItem("supplemental_topics", "即时讨论语境", "读取 Bubble / 转发挂载"),
          createDynamicItem("root_image_hint", "主楼图片说明", "根据主楼是否附图生成"),
          createDynamicItem("repost_source", "被转发原帖", "读取主楼引用原帖"),
          createTemplateItem("root_post_intro", "主楼前缀", "主楼内容："),
          createDynamicItem("root_post_text", "主楼正文", "读取主楼正文"),
          createDynamicItem("reply_target_intro", "回复目标前缀", "根据是否楼中楼生成"),
          createDynamicItem("reply_target_text", "回复目标正文", "读取当前回复目标")
        ],
        persona_alignment: [
          createTemplateItem(
            "prompt_title",
            "回复任务",
            "你正在生成 X 风格中文讨论串中的{{promptTitle}}。"
          ),
          createTemplateItem(
            "feed_target",
            "所属讨论区",
            "当前所属论坛讨论区是“{{feedLabel}}”。"
          ),
          createDynamicItem("forum_audience_text", "页签用户定位", "读取当前页签用户定位"),
          createTemplateItem("priority_intro", "优先级前缀", "回复生成优先级："),
          createTemplateItem(
            "priority_1",
            "优先级 1",
            "1. 首先直接回应当前帖子或上一层回复的具体内容，抓住文本里的观点、情绪、判断、细节或矛盾点。"
          ),
          createTemplateItem(
            "priority_2",
            "优先级 2",
            "2. 识别当前发帖用户的人设，让回复看起来像是在对这样一个具体的人说话，而不是对匿名文本发言。"
          ),
          createTemplateItem(
            "priority_3",
            "优先级 3",
            "3. 再结合整体世界观与论坛讨论区设定补充背景判断，但这些背景只能辅助，不能盖过帖子内容本身。"
          ),
          createTemplateItem("author_persona_intro", "发帖用户前缀", "当前发帖用户人设："),
          createDynamicItem("author_persona_text", "发帖用户人设", "读取当前发帖用户人设")
        ],
        output_standard: [
          createTemplateItem("json_array", "JSON 数组", "请严格输出 JSON 数组，不要输出额外解释。"),
          createTemplateItem("reply_count", "回复数量", "请生成 {{count}} 条回复，每条都必须是不同用户的口吻。"),
          createTemplateItem("required_fields", "对象字段", "每个对象必须包含以下字段：displayName, handle, text, likes, replies。"),
          createTemplateItem("reply_length", "回复长度", "回复语气要像真实网友跟帖，长度控制在 18 到 80 字之间，可以有赞同、反对、补充和追问。"),
          createTemplateItem("region_style", "地区风格", "不同回复可以分别模拟来自中国、日本、韩国、美国社区的用户发言风格。"),
          createTemplateItem("single_language", "单语要求", "每一条回复必须全文保持单一语言，只能四选一：中文、日文、韩文、英文。不要在同一条回复里混用多种语言。"),
          createTemplateItem("readability", "可读性", "避免整段灌水，优先短句，必要时用换行提升可读性。"),
          createTemplateItem("thread_cohesion", "楼层连贯", "请避免重复句式，并保持楼中讨论的连贯性。")
        ]
      }
    },
    discussion_translate_text: {
      label: "论坛文本翻译",
      group: "论坛",
      description: "翻译自由文本到中文",
      sections: {
        context_library: [
          createDynamicItem("source_text", "原文内容", "读取待翻译文本")
        ],
        persona_alignment: [
          createTemplateItem(
            "task_role",
            "翻译任务",
            "任务：把提供的内容翻译成中文，并保留原意、语气和换行。"
          )
        ],
        output_standard: [
          createTemplateItem("only_translation", "仅输出翻译", "只输出翻译结果，不要添加解释。")
        ]
      }
    },
    discussion_translate_post: {
      label: "论坛帖子翻译",
      group: "论坛",
      description: "翻译帖子正文与标签",
      sections: {
        context_library: [
          createTemplateItem("post_text_intro", "正文前缀", "原文正文："),
          createDynamicItem("post_text", "原文正文", "读取帖子正文"),
          createTemplateItem("post_tags_intro", "标签前缀", "原文标签："),
          createDynamicItem("post_tags", "原文标签", "读取帖子标签")
        ],
        persona_alignment: [
          createTemplateItem(
            "task_role",
            "翻译任务",
            "任务：把帖子翻译成中文，并保留原意、语气和换行。"
          )
        ],
        output_standard: [
          createTemplateItem("json_array", "JSON 数组", "请严格输出 JSON 数组，并且只包含 1 个对象。"),
          createTemplateItem("required_fields", "对象字段", "对象必须包含字段：text, tags。"),
          createTemplateItem("field_meaning", "字段说明", "text 是翻译后的正文，tags 是翻译后的中文标签数组；每个标签都必须以 # 开头。")
        ]
      }
    },
    chat_auto_schedule_generate: {
      label: "Chat 自动排程",
      group: "Chat",
      description: "为角色补未来空白小时行程",
      sections: {
        context_library: [
          createTemplateItem(
            "task_background",
            "任务背景",
            "任务背景：为 {{contactName}} 设计未来 {{dayCount}} 天的生活行程。"
          ),
          createDynamicItem("worldbook_context", "世界书背景", "读取挂载世界书与额外限制")
        ],
        persona_alignment: [
          createTemplateItem("not_chat", "非聊天任务", "这不是聊天回复，而是纯粹的日程规划任务。"),
          createTemplateItem(
            "contact_persona",
            "角色人设",
            "角色稳定人设：{{contactPersona}}。"
          ),
          createTemplateItem(
            "user_exclusion",
            "排除用户视角",
            "只根据角色人设和世界书背景去安排，不要引用用户人设，不要写用户相关内容。"
          )
        ],
        output_standard: [
          createTemplateItem("reality", "真实感", "要尽量真实，有正常的起居、吃饭、工作/学习/休息/娱乐节奏。"),
          createTemplateItem("weekend_default", "周末倾向", "默认把周一到周五视为工作日，把周六周日视为休息日；周末更偏向补觉、放松、轻社交、娱乐、家务或恢复性安排。"),
          createDynamicItem("extra_instruction", "额外要求", "读取本次补充约束"),
          createTemplateItem("avoid_overlap", "避免冲突", "不要覆盖已占用时段，只能补空白。"),
          createTemplateItem("hour_only", "小时制", "所有结果都必须是按小时的日程，使用同一天内的 startTime / endTime。"),
          createTemplateItem("no_cross_day", "禁止跨天", "不要输出跨天时段；如果是睡眠，可安排为当日 00:00-07:00 这类同日块。"),
          createTemplateItem("sparse_day", "少空档策略", "如果某一天空白很少，只补最合理的几个空档，不要硬塞满。"),
          createTemplateItem(
            "json_format",
            "JSON 格式",
            "只输出 JSON 对象，格式为：{\"items\":[{\"date\":\"YYYY-MM-DD\",\"title\":\"安排名称\",\"startTime\":\"HH:00\",\"endTime\":\"HH:00\"}]}。"
          )
        ]
      }
    },
    chat_conversation: {
      label: "Chat 对话回复",
      group: "Chat",
      description: "1v1 聊天回复主 prompt",
      sections: {
        context_library: [
          createDynamicItem("worldbook_context", "世界书背景", "读取挂载世界书"),
          createDynamicItem("bubble_focus_context", "Bubble 挂载", "读取最近挂载的 Bubble 语境"),
          createDynamicItem("forum_post_focus_context", "论坛挂载", "读取最近挂载的论坛语境"),
          createDynamicItem("hot_topics_context", "论坛热点语境", "读取论坛热点 / 页签语境"),
          createDynamicItem("scene_memory_context", "情景记忆", "读取达到阈值的情景记忆")
        ],
        persona_alignment: [
          createTemplateItem("contact_name", "角色姓名", "你叫 {{contactName}}。"),
          createDynamicItem("scene_mode", "当前场景", "读取线上 / 线下场景"),
          createTemplateItem("role_guard", "角色代入", "先像这个人本人一样去理解这段关系、语气和情绪，不要把自己当成解释设定或执行任务的助手。"),
          createTemplateItem("contact_persona", "角色人设", "你的稳定性格、表达习惯和关系底色：{{contactPersona}}。"),
          createDynamicItem("core_memory", "核心记忆", "读取核心记忆"),
          createTemplateItem("user_name", "用户昵称", "正在和你聊天的用户昵称：{{userName}}。"),
          createTemplateItem("user_persona", "用户画像", "你对这个用户已知的整体印象：{{userPersona}}。"),
          createDynamicItem("special_user_persona", "特别用户认知", "读取角色对用户的特别认知"),
          createDynamicItem("regenerate_hint", "重回要求", "读取重回额外要求")
        ],
        current_state_awareness: [
          createDynamicItem("triggered_awareness", "触发察觉", "读取角色此刻突然联想到的额外线索"),
          createDynamicItem("voice_call_context", "语音通话状态", "读取当前是否正处于语音通话"),
          createDynamicItem("video_call_context", "视频通话状态", "读取当前是否正处于视频通话"),
          createDynamicItem("presence_context", "地点状态", "读取双方当前地点 / 在路上状态"),
          createDynamicItem("time_awareness", "时间感知", "读取当前生效时间"),
          createDynamicItem("mentioned_time_schedule", "提及时段日程", "读取用户刚提到时间对应的双方日程"),
          createDynamicItem("schedule_awareness", "当前日程", "读取双方当前正在进行的日程")
        ],
        output_standard: [
          createTemplateItem("human_chat", "真人聊天感", "你的回复必须像即时聊天软件中的真人对话，自然、轻松、有情绪，而不是助手或任务执行结果。"),
          createTemplateItem("receive_emotion", "先接情绪", "回复时优先接住当前对话中的情绪、语气和潜台词，再决定是否回应具体内容，不要只做信息回答。"),
          createTemplateItem("emotion_first", "情绪先行", "不要先把用户刚说的事实重复一遍再开始回复。更自然的写法通常是直接进入情绪、态度、反应或一句贴身的接话。"),
          createTemplateItem("natural_ellipsis", "自然省略", "允许适当省略主语、宾语或连接词，只要像真人即时聊天一样自然、清楚、顺口。"),
          createTemplateItem("colloquial", "口语化", "表达需要口语化，可以有停顿、转折和即时反应，可以使用“……” “！”以及自然语气词，允许有一点碎碎念或临场感。"),
          createTemplateItem("line_limit", "行数限制", "每一行代表一条单独发送的消息，总行数不超过{{replySentenceLimit}}行。这是上限，不是目标；能短就短，能少发就少发，只在自然需要时再继续展开。"),
          createTemplateItem("line_break_rule", "分行规则", "尽量不要输出长句；一句话在括号外遇到逗号或句号时，请直接分行输出。括号里的动作、表情或行为描述不受这条限制，括号内的逗号、句号不要为了分行硬拆开。分行后，原本只用于收尾的逗号、句号要省略，不得省略感叹号、问号、省略号、波浪号等表达情绪的标点。"),
          createTemplateItem("no_explainer", "禁止解释设定", "不要使用列表、编号或说明性结构，不要添加角色标签、前缀或解释性文字。"),
          createTemplateItem("no_meta", "禁止元话术", "不要出现“根据设定”“从背景来看”“你的人设是”等表达，不要解释设定、总结对话或进行分析，不要刻意展示你记得很多背景信息。"),
          createTemplateItem("discussion_share_rule", "社媒讨论帖规则", "如果聊天记录里出现“【社媒讨论帖】”，那代表用户转发给你一条外部社媒讨论内容，供你一起看、一起聊、一起吐槽或一起判断。它不是用户此刻正在对你说的话本身，也不是你们已经发生的聊天内容；不要把帖内发言误当成用户本人发言。"),
          createTemplateItem("context_library_rule", "背景触发规则", "context_library 只有在聊天语境中自然联想到时才可以使用，如果没有触发，就不要主动提及。"),
          createTemplateItem("conflict_priority", "冲突优先级", "当信息存在冲突时，优先依据当前对话内容和当下语境，其次是性格设定，最后才是背景信息。"),
          createTemplateItem("goal", "最终目标", "最终目标是让对话看起来像真实的人在聊天，而不是在执行设定或扮演角色。"),
          createDynamicItem("presence_update_rule", "状态更新规则", "按当前会话设置决定是否加入 presence_update 约束"),
          createDynamicItem("quote_rule", "引用回复规则", "按线上场景决定是否加入 quote_reply 约束"),
          createTemplateItem("location_message_rule", "定位消息规则", "如果聊天记录里出现“[定位消息]”，那代表对方真实发送了一条位置卡片，而不是普通文本。"),
          createTemplateItem("voice_message_rule", "语音消息规则", "如果聊天记录里出现“[语音消息]”，那代表对方真实发送了一条语音消息，而不是普通文本；这条消息可能会额外附带一行“语音转文字”，你可以自然参考其中内容，但要保留它来自语音表达的感觉。"),
          createTemplateItem("voice_call_message_rule", "语音通话规则", "如果聊天记录里出现“[语音通话请求]”或“[语音通话事件]”，那代表双方真实发生过一次语音请求、接通、拒绝或挂断，而不是普通文本。"),
          createTemplateItem("image_message_rule", "图片消息规则", "如果聊天记录里出现“[图片消息]”，那代表对方真实发送了一张照片卡片，而不是普通文本；这条消息可能会额外附带一行“图片说明”，你可以自然参考其中内容，但不要机械复述图片说明。"),
          createTemplateItem("location_json_rule", "定位 JSON 规则", "如果需要发送位置，必须单独一行输出如下格式：[{\"type\":\"location\",\"locationName\":\"位置名\",\"coordinates\":\"__PG_COORD_01__\"}]"),
          createTemplateItem("location_json_plain", "定位 JSON 输出要求", "定位 JSON 不要放进代码块，不要添加解释、前缀、序号或额外说明；它本身就算一行回复。"),
          createTemplateItem("voice_json_rule", "语音 JSON 规则", "如果需要主动发送一条语音消息，必须单独一行输出如下格式：[{\"type\":\"voice\",\"content\":\"语音转文字内容\"}]。content 要写成真正发出去的语音转文字，不要解释你为什么发语音。"),
          createTemplateItem("voice_json_plain", "语音 JSON 输出要求", "语音 JSON 不要放进代码块，不要添加解释、前缀、序号或额外说明；它本身就算一行回复。"),
          createTemplateItem("voice_call_request_rule", "语音请求 JSON 规则", "如果你想主动发起一通语音通话请求，必须单独一行输出如下格式：[{\"type\":\"voice_call_request\",\"message\":\"想说的话，可留空\"}]。message 可选，写成你真正会说出口的邀约，不要解释机制。"),
          createTemplateItem("voice_call_request_plain", "语音请求 JSON 输出要求", "语音通话请求 JSON 不要放进代码块，不要添加解释、前缀、序号或额外说明；它本身就算一行回复。"),
          createTemplateItem("video_call_message_rule", "视频通话规则", "如果聊天记录里出现“[视频通话请求]”或“[视频通话事件]”，那代表双方真实发生过一次视频请求、接通、拒绝或挂断，而不是普通文本。"),
          createTemplateItem("video_call_request_rule", "视频请求 JSON 规则", "如果你想主动发起一通视频通话请求，必须单独一行输出如下格式：[{\"type\":\"video_call_request\",\"message\":\"想说的话\"}]。message 必填，写成接通后你会先说出口的开场第一句，不要解释机制。"),
          createTemplateItem("video_call_request_plain", "视频请求 JSON 输出要求", "视频通话请求 JSON 不要放进代码块，不要添加解释、前缀、序号或额外说明；它本身就算一行回复。"),
          createDynamicItem("call_event_rule", "通话挂断 JSON 规则", "按当前通话状态决定是否加入挂断事件约束"),
          createTemplateItem("image_json_rule", "图片 JSON 规则", "如果需要主动发送一张照片，必须单独一行输出如下格式：[{\"type\":\"image\",\"description\":\"照片内容描述\"}]。description 要写成你真正发出去的照片内容，而不是解释你为什么要发。"),
          createTemplateItem("image_json_plain", "图片 JSON 输出要求", "图片 JSON 不要放进代码块，不要添加解释、前缀、序号或额外说明；它本身就算一行回复。"),
          createTemplateItem("emotion_punctuation", "情绪标点保留", "不要去掉感叹号、问号、波浪号、省略号等表达情绪的标点。"),
          createDynamicItem("scene_mode_rule", "线上线下写法", "按当前场景决定动作描写约束")
        ]
      }
    },
    chat_continuation_request: {
      label: "Chat 续写提示",
      group: "Chat",
      description: "主动续写时附加给模型的用户提示",
      sections: {
        persona_alignment: [
          createTemplateItem(
            "request_intro",
            "续写请求",
            "这是一次主动续写，不是新的提问。请沿着刚才的聊天氛围自然补几句新消息，不要重复上一条。"
          )
        ],
        current_state_awareness: [
          createTemplateItem(
            "timing_line",
            "时间说明",
            "距离你上一次开口大约已经过了 {{elapsedDurationLabel}}。{{waitingMoodGuidance}} 这种等待感只体现在语气变化里，不要直接说出时长；这次必须先给出可发送正文，没有自然的状态变化就不要输出 presence_update。"
          )
        ],
        output_standard: [
          createTemplateItem(
            "wait_short_guidance",
            "短间隔语气",
            "这不是同一秒里的连发，延续刚才的话题时自然一点就好。"
          ),
          createTemplateItem(
            "wait_medium_guidance",
            "中间隔语气",
            "开口要像隔了一会儿后重新接话，别写成紧贴上一条的连发。"
          ),
          createTemplateItem(
            "wait_long_guidance",
            "长间隔语气",
            "开口要像等了一阵后又补一句，更克制、更试探一点。"
          ),
          createTemplateItem(
            "wait_very_long_guidance",
            "超长间隔语气",
            "开口要像隔了很久后又想起对方，轻一点、缓一点。"
          )
        ]
      }
    },
    chat_inner_thought: {
      label: "Chat 心声",
      group: "Chat",
      description: "分析角色在某条消息附近的心理活动",
      sections: {
        context_library: [
          createDynamicItem("recent_history", "最近会话", "读取目标气泡前最近 10 轮会话"),
          createDynamicItem("target_message", "目标消息", "读取需要重点分析的最近一条消息")
        ],
        persona_alignment: [
          createTemplateItem("contact_name", "角色姓名", "需要分析心声的角色叫 {{contactName}}。"),
          createTemplateItem("contact_persona", "角色人设", "这个角色稳定的人设、表达习惯和关系底色：{{contactPersona}}。"),
          createTemplateItem("user_name", "用户昵称", "和 ta 对话的用户昵称：{{userName}}。"),
          createTemplateItem("user_persona", "用户画像", "用户画像：{{userPersona}}。"),
          createTemplateItem("analysis_goal", "分析目标", "你的任务不是续写对话，而是站在说出这条消息的人本身的立场，用第一人称说出 ta 此刻真实的内在心理活动、说这句话的动机，以及没直接说出口的目标。")
        ],
        output_standard: [
          createTemplateItem("stay_in_character", "角色视角", "分析必须严格站在这个角色的立场上，只能基于给定人设和这段聊天推断，不要引入对话外的新事实。"),
          createTemplateItem("focus_now", "聚焦当下", "重点围绕最后这条目标消息来分析：ta 当时在想什么、为什么会这样说、想达到什么效果。"),
          createTemplateItem("voice_match", "语气贴合角色", "整段心声要像这个角色脑内正在即时嘀咕，保留 ta 自己的口头习惯、别扭劲、试探感或情绪起伏，不要写成第三方旁白。"),
          createTemplateItem("emotion_over_fact", "少讲事实多讲心绪", "少做客观事实复述，多写当时真正翻上来的情绪、在意、嘴硬、心虚、期待、犹豫或没说出口的小算盘。"),
          createTemplateItem("plain_text", "输出格式", "请直接输出一整段第一人称自然描述，像这个人正在心里默念当时真正的想法。内容里要自然覆盖：此刻心声、为什么这么说、潜在目的。"),
          createTemplateItem("concise", "简洁克制", "整体保持简洁、具体、像真实人物心理，不要写成长篇小说；不要写 1、2、3，不要项目符号，不要固定标签，不要 markdown。")
        ]
      }
    },
    chat_journal: {
      label: "Chat 今日日记",
      group: "Chat",
      description: "角色日记生成",
      sections: {
        context_library: [
          createTemplateItem("date_text", "日期", "日期：{{dateLabel}}。"),
          createDynamicItem("reference_context", "补充背景", "读取论坛 / 世界书参考"),
          createDynamicItem("chat_transcript", "今日日内聊天记录", "读取当天聊天记录")
        ],
        persona_alignment: [
          createTemplateItem("contact_name", "联系人姓名", "你是即时聊天联系人：{{contactName}}。"),
          createTemplateItem("first_person", "第一人称要求", "现在不是聊天回复，而是以这个角色的第一人称口吻写一篇今日日记。"),
          createTemplateItem("contact_persona", "角色人设", "角色人设：{{contactPersona}}。"),
          createTemplateItem("user_name", "用户昵称", "和你聊天的用户昵称：{{userName}}。"),
          createTemplateItem("user_persona", "用户画像", "用户的人设：{{userPersona}}。")
        ],
        output_standard: [
          createTemplateItem("plain_text", "仅正文", "1. 只输出日记正文，不要标题、署名、编号、项目符号、解释或 markdown。"),
          createTemplateItem("date_weather", "日期天气", "2. 正文里要自然写出今天是几月几日、星期几；天气只能从今天的聊天记录里提取，若聊天里没有提到天气，就自然写成没特别留意到天气，不要硬编温度、天气现象或城市。"),
          createTemplateItem("priority", "优先级", "3. 今日聊天记录是核心，挂载的世界书和论坛背景只做辅助参考。"),
          createTemplateItem("length", "字数限制", "4. 控制在 {{journalLength}} 字以内。"),
          createTemplateItem("tone", "语气", "5. 整篇要像这个角色当天稍晚自己写下来的私人记录，要带 ta 本人的说话习惯、在意点和情绪偏向，不要写成客观总结报告、事项汇报或时间线流水账。"),
          createTemplateItem("emotion_focus", "情绪重心", "6. 优先抓住今天最有后劲、最挂心的 1～3 个点来写，多写感受、回味、别扭、松动、犹豫和心态变化，少做冷静客观的事实陈列。"),
          createTemplateItem("inner_thought", "心理活动", "7. 多写为什么会在意、当时没说出口的话、后来才反应过来的念头，以及情绪是怎么慢慢变掉的。"),
          createTemplateItem("chronology", "避免平铺直叙", "8. 不要按早上、中午、晚上从头到尾平铺直叙；可以围绕最在意的情绪节点自然展开，允许跳着回想。")
        ]
      }
    },
    chat_memory_summary: {
      label: "Chat 记忆总结",
      group: "Chat",
      description: "从聊天提取长期记忆",
      sections: {
        context_library: [
          createTemplateItem("task_background", "任务背景", "任务：为联系人 {{contactName}} 整理一对一聊天里的长期记忆。")
        ],
        persona_alignment: [
          createTemplateItem("contact_persona", "联系人性格", "这个联系人的稳定性格与表达底色：{{contactPersona}}。"),
          createTemplateItem("name_alias", "命名约定", "在本次输出里，charname 指 {{contactName}}，username 指 {{userName}}。如果需要写人名，请优先直接使用这两个名字。"),
          createTemplateItem("user_name", "聊天对象昵称", "聊天对象昵称：{{userName}}。"),
          createTemplateItem("user_persona", "用户画像", "用户整体画像：{{userPersona}}。"),
          createTemplateItem("goal", "提取目标", "你的目标不是写摘要，而是从新对话中提取未来聊天真正值得留存、方便自然回想的内容。"),
          createTemplateItem("core_standard", "核心记忆标准", "核心记忆的标准需要谨慎把握：只有会持续影响联系人对用户的态度、距离感、信任、期待、在意点，或影响联系人看待某个话题/事物的心境与判断，才算核心记忆。"),
          createTemplateItem("scene_standard", "情景记忆标准", "除此之外，其他能在相关话题里帮助回想上下文的内容，都归为情景记忆。"),
          createTemplateItem("avoid_noise", "避免普通闲聊", "不要把普通闲聊、礼貌回应、表层信息重复写成核心记忆。")
        ],
        output_standard: [
          createTemplateItem("json_format", "JSON 格式", "输出必须是 JSON，对象格式固定为：{\"items\":[...]}。每条 item 表示一条候选记忆，而不是最终数据库记录。"),
          createTemplateItem("action_rule", "动作字段", "action 只能是 create / reinforce / supersede / ignore。语义重复、只是再次确认时优先 reinforce；新事实替代旧事实时用 supersede；没有留存价值时用 ignore。"),
          createTemplateItem("target_rule", "命中旧记忆", "如果你明确命中某条已有记忆，请把那条记忆的 memory_id 填进 target_memory_ref。尤其是 reinforce / supersede，优先给 target_memory_ref。"),
          createTemplateItem("type_rule", "类型字段", "memory_type 优先使用 relationship / preference / fact / event / scene / habit / constraint。memory_subtype 可选，只在你很明确时填写。"),
          createTemplateItem("content_tone", "表述语气", "canonical_text、summary_short 和 summary_faint 都请尽量使用客观、克制、委婉的第三人称描述，只写能从对话稳定归纳出的信息，不夸大，不下过重判断。优先直接写 charname 和 username，避免使用“你 / 我 / 他 / 她 / 联系人 / 用户”这类容易产生歧义的指代。"),
          createTemplateItem("faint_rule", "模糊记忆", "summary_faint 要写成比 summary_short 更模糊、更像残留印象的版本，但只写记忆内容本身，不要写成“你隐约记得 / 我隐约记得 / 隐约记得”的句式。优先直接写 charname 和 username，并用“似乎 / 有些 / 大概 / 隐约表现出 / 倾向于”这类词保留模糊感。"),
          createTemplateItem("importance_rule", "重要度与置信度", "base_importance 使用 0~100 整数；confidence 使用 0~1 小数。"),
          createTemplateItem("emotion_rule", "情绪字段", "如果这条记忆带有持续情绪影响，可以填写 emotion_intensity、emotion_profile、interaction_tendency、emotion_summary；没有就留空或给空对象。"),
          createTemplateItem("reason_rule", "原因说明", "reason_note 必填，用一句短话说明为什么建议这样处理。"),
          createTemplateItem("ignore_rule", "ignore 规则", "如果 action = ignore，就只保留必要字段：action、reason_note；不要为了凑字段硬写内容。"),
          createTemplateItem("max_count", "数量限制", "最多输出 5 条；如果没有值得保留的内容，就输出 {\"items\":[]}。"),
          createTemplateItem("plain_json", "纯 JSON", "不要输出 markdown，不要代码块，不要解释，不要额外字段。")
        ]
      }
    },
    bubble_translate_text: {
      label: "Bubble 文本翻译",
      group: "Bubble",
      description: "翻译 Bubble 文本到中文",
      sections: {
        context_library: [
          createDynamicItem("source_text", "原文内容", "读取待翻译文本")
        ],
        persona_alignment: [
          createTemplateItem(
            "task_role",
            "翻译任务",
            "任务：把提供的内容翻译成中文，并保留原意、语气和换行。"
          )
        ],
        output_standard: [
          createTemplateItem("only_translation", "仅输出翻译", "只输出翻译结果，不要添加解释。")
        ]
      }
    },
    bubble_fan_reply: {
      label: "Bubble 粉丝回复",
      group: "Bubble",
      description: "为一轮 Bubble 生成粉丝反应",
      sections: {
        context_library: [
          createDynamicItem("worldbook_context", "世界书背景", "读取挂载世界书"),
          createDynamicItem("hot_topics_context", "共同关注话题", "读取热点挂载"),
          createDynamicItem("message_intro", "Bubble 消息前缀", "按消息条数生成"),
          createDynamicItem("message_list", "Bubble 消息列表", "读取本轮 Bubble 消息"),
          createDynamicItem("message_merge_rule", "整轮消息理解规则", "读取整轮综合回应说明")
        ],
        persona_alignment: [
          createTemplateItem("task_role", "任务定位", "你正在模拟 Bubble 中创作者的粉丝回复列表。"),
          createTemplateItem("creator_name", "创作者昵称", "创作者昵称：{{creatorName}}"),
          createTemplateItem("creator_persona", "创作者人设", "创作者人设：{{creatorPersona}}")
        ],
        output_standard: [
          createTemplateItem("json_array", "JSON 数组", "请严格输出 JSON 数组，不要输出额外解释。"),
          createTemplateItem("count_fields", "对象字段", "请输出 {{count}} 个对象，每个对象只包含字段：language, text。"),
          createTemplateItem("language_choices", "语言范围", "language 只能是 zh、ja、en、ko 四选一。"),
          createTemplateItem("language_balance", "语言覆盖", "四种语言都必须出现，尽量平均分配。"),
          createTemplateItem("fan_reaction", "粉丝视角", "text 是粉丝视角对创作者刚发消息的即时反应。"),
          createTemplateItem("max_length", "长度限制", "每条 text 不得超过 50 个字符。"),
          createTemplateItem("tone", "语气", "语气要像真实粉丝：可以可爱、惊讶、夸赞、调侃、尖叫，但都要围绕原消息做反应。"),
          createTemplateItem("plain_output", "纯输出", "不要加编号、不要加标签、不要解释、不要输出用户名字段。")
        ]
      }
    },
    schedule_invite: {
      label: "日程邀请回复",
      group: "日程",
      description: "角色对日程邀请做接受 / 拒绝判断",
      sections: {
        context_library: [
          createDynamicItem("conflict_context", "行程冲突", "读取同时间段已有行程"),
          createDynamicItem("companion_names", "同行人", "读取其他同行角色")
        ],
        persona_alignment: [
          createTemplateItem("contact_name", "角色姓名", "你叫 {{contactName}}。"),
          createTemplateItem("scene_mode", "聊天场景", "现在是你和 {{userName}} 在即时聊天软件里的一对一私聊。"),
          createTemplateItem("task_role", "任务定位", "你本人正在收到对方发来的一个日程邀请，需要像真实聊天一样做决定并回复。"),
          createTemplateItem("contact_persona", "角色人设", "你的稳定性格、表达习惯和关系底色：{{contactPersona}}。"),
          createTemplateItem("user_name", "用户昵称", "正在和你聊天的用户昵称：{{userName}}。"),
          createTemplateItem("user_persona", "用户画像", "用户整体画像：{{userPersona}}。"),
          createDynamicItem("special_user_persona", "特别用户认知", "读取角色对用户的特别认知")
        ],
        output_standard: [
          createTemplateItem("decision_first", "先判断再回复", "你需要先判断是否接受这个邀请，再给出一条自然聊天式回复。"),
          createTemplateItem("accept_reject_tone", "接受 / 拒绝语气", "接受时要显得像真的愿意赴约；拒绝时要像真实生活中的婉拒，可以简短带一点理由，但不要冷冰冰。"),
          createTemplateItem("decision_basis", "判断依据", "优先考虑你的人设、和用户的关系、你当前已知的行程冲突，以及这个邀请本身是否合理。"),
          createTemplateItem("default_bias", "默认倾向", "如果没有明显冲突且关系允许，默认更偏向接受；如果确实撞时间、明显不合适，或以你的性格不想去，就拒绝。"),
          createTemplateItem("json_format", "JSON 格式", "输出必须是严格 JSON：{\"decision\":\"accept|reject\",\"reply\":\"自然回复\"}。"),
          createTemplateItem("plain_reply", "reply 字段要求", "reply 只写你真正会发出去的话，不要解释 JSON，不要加 markdown，不要附加其他字段。")
        ]
      }
    },
    raising_kid_archive: {
      label: "养崽成长档案",
      group: "养崽",
      description: "生成宝宝幼儿期档案",
      sections: {
        context_library: [
          createTemplateItem("child_name", "宝宝名字", "宝宝名字：{{childName}}"),
          createTemplateItem("child_gender", "宝宝性别", "宝宝性别：{{childGender}}"),
          createTemplateItem("task_background", "任务背景", "请直接生成这位宝宝在 3 岁幼儿期的成长档案。")
        ],
        persona_alignment: [
          createTemplateItem("task_role", "任务定位", "你正在为一个“养崽”文字游戏生成宝宝的成长档案。"),
          createTemplateItem("user_name", "用户昵称", "用户昵称：{{userName}}"),
          createTemplateItem("user_persona", "用户人设", "用户人设：{{userPersona}}"),
          createTemplateItem("partner_name", "共同抚养人", "共同抚养人：{{partnerName}}"),
          createTemplateItem("partner_persona", "共同抚养人人设", "共同抚养人人设：{{partnerPersona}}"),
          createDynamicItem("special_user_persona", "共同抚养人的特别认知", "读取对用户的特别认知"),
          createTemplateItem("mixed_temperament", "混合气质要求", "请根据双方人设混合后的气质来推演这位宝宝的成长档案。")
        ],
        output_standard: [
          createTemplateItem("plain_json", "纯 JSON", "请只输出一个 JSON 对象，不要输出额外解释，也不要用 markdown。"),
          createTemplateItem("required_fields", "对象字段", "字段必须严格包含：appearanceRating, appearanceSummary, hobbies, habits。"),
          createTemplateItem("appearance_rating", "颜值等级", "appearanceRating：字符串，例如 A+、A、B+，不要超过 3 个字符。"),
          createTemplateItem("appearance_summary", "外貌总结", "appearanceSummary：1 段 45-90 字中文，描述这位宝宝长到幼儿期后会呈现出的颜值与整体气质。"),
          createTemplateItem("hobbies", "兴趣爱好", "hobbies：数组，输出 3 个兴趣爱好短语，每项不超过 10 个字。"),
          createTemplateItem("habits", "待纠正小毛病", "habits：数组，输出 2 个待纠正的小毛病，每项不超过 16 个字。"),
          createTemplateItem("tone", "整体语气", "整体语气要温柔、可爱、像角色设定卡，不要写成医学描述，不要出现危险内容。")
        ]
      }
    }
  };

  function normalizePromptRuleCustomItems(items = []) {
    return (Array.isArray(items) ? items : [])
      .map((item, index) => {
        const source = item && typeof item === "object" ? item : {};
        return {
          id: trimText(source.id || `custom_${index}`),
          text: String(source.text || "")
        };
      })
      .filter((item) => item.id);
  }

  function normalizePromptRuleSection(section = {}) {
    const resolved = section && typeof section === "object" ? section : {};
    const overrides = {};
    Object.entries(resolved.overrides || {}).forEach(([itemId, text]) => {
      const normalizedId = trimText(itemId);
      if (!normalizedId) {
        return;
      }
      overrides[normalizedId] = String(text ?? "");
    });
    return {
      itemOrder: uniqueStrings(resolved.itemOrder || []),
      overrides,
      customItems: normalizePromptRuleCustomItems(resolved.customItems || [])
    };
  }

  function normalizePromptRules(source = {}) {
    const resolved = source && typeof source === "object" ? source : {};
    return Object.fromEntries(
      Object.entries(resolved).map(([promptType, config]) => {
        const promptConfig = config && typeof config === "object" ? config : {};
        const sections = {};
        Object.entries(promptConfig.sections || {}).forEach(([sectionKey, sectionValue]) => {
          const normalizedSectionKey = normalizeSectionKey(sectionKey);
          if (!normalizedSectionKey) {
            return;
          }
          sections[normalizedSectionKey] = normalizePromptRuleSection(sectionValue);
        });
        return [
          trimText(promptType),
          {
            sectionOrder: uniqueStrings(promptConfig.sectionOrder || [])
              .map((item) => normalizeSectionKey(item))
              .filter(Boolean),
            sections
          }
        ];
      }).filter(([promptType]) => promptType)
    );
  }

  function mergeOrderedIds(defaultIds = [], preferredIds = []) {
    const merged = [];
    const seen = new Set();
    preferredIds.forEach((item) => {
      const normalized = trimText(item);
      if (!normalized || seen.has(normalized)) {
        return;
      }
      seen.add(normalized);
      merged.push(normalized);
    });
    defaultIds.forEach((item) => {
      const normalized = trimText(item);
      if (!normalized || seen.has(normalized)) {
        return;
      }
      seen.add(normalized);
      merged.push(normalized);
    });
    return merged;
  }

  function resolveCatalogSectionOrder(catalog = null) {
    const catalogSections =
      catalog?.sections && typeof catalog.sections === "object" ? catalog.sections : {};
    const catalogKeys = Object.keys(catalogSections)
      .map((item) => normalizeSectionKey(item))
      .filter(Boolean);
    return mergeOrderedIds(
      SECTION_KEYS.filter((item) => catalogKeys.includes(item)),
      catalogKeys
    );
  }

  function normalizeRuntimeSections(runtimeSections = {}) {
    const result = {};
    Object.entries(runtimeSections && typeof runtimeSections === "object" ? runtimeSections : {}).forEach(
      ([sectionKey, sectionValue]) => {
        const normalizedSectionKey = normalizeSectionKey(sectionKey);
        if (!normalizedSectionKey || !sectionValue || typeof sectionValue !== "object") {
          return;
        }
        result[normalizedSectionKey] = { ...sectionValue };
      }
    );
    return result;
  }

  function getPromptCatalogList() {
    return Object.entries(PROMPT_RULE_CATALOG).map(([id, item]) => ({
      id,
      label: item.label,
      group: item.group,
      description: item.description
    }));
  }

  function buildPrompt(promptType = "", runtimeSections = {}, options = {}) {
    const catalog = PROMPT_RULE_CATALOG[String(promptType || "").trim()];
    if (!catalog) {
      return "";
    }
    const settings = options && typeof options === "object" ? options.settings || {} : {};
    const variables =
      options && typeof options === "object" && options.variables && typeof options.variables === "object"
        ? options.variables
        : {};
    const resolvedPromptRules = normalizePromptRules(settings?.promptRules);
    const promptConfig = resolvedPromptRules[promptType] || {};
    const resolvedRuntimeSections = normalizeRuntimeSections(runtimeSections);
    const sectionOrder = mergeOrderedIds(
      resolveCatalogSectionOrder(catalog),
      (promptConfig.sectionOrder || []).map((item) => normalizeSectionKey(item)).filter(Boolean)
    );

    const promptParts = sectionOrder.map((sectionKey) => {
      const descriptors = Array.isArray(catalog.sections?.[sectionKey])
        ? catalog.sections[sectionKey]
        : [];
      const sectionConfig = promptConfig.sections?.[sectionKey] || normalizePromptRuleSection({});
      const runtimeMap = resolvedRuntimeSections[sectionKey] || {};
      const itemsById = new Map();

      descriptors.forEach((descriptor) => {
        const itemId = trimText(descriptor.id);
        if (!itemId) {
          return;
        }
        let text = "";
        if (descriptor.kind === "dynamic") {
          text = String(runtimeMap[itemId] ?? "");
        } else {
          const overrideText = Object.prototype.hasOwnProperty.call(
            sectionConfig.overrides || {},
            itemId
          )
            ? sectionConfig.overrides[itemId]
            : descriptor.defaultText || "";
          text = interpolateTemplate(overrideText, variables);
        }
        itemsById.set(itemId, {
          ...descriptor,
          text
        });
      });

      normalizePromptRuleCustomItems(sectionConfig.customItems).forEach((item, index) => {
        itemsById.set(item.id, {
          id: item.id || `custom_${index}`,
          kind: "custom",
          label: "自定义文字",
          text: String(item.text || "")
        });
      });

      const itemOrder = mergeOrderedIds(
        [...itemsById.keys()],
        sectionConfig.itemOrder || []
      );
      const sectionText =
        itemOrder
          .map((itemId) => itemsById.get(itemId))
          .filter(Boolean)
          .map((item) => trimText(item.text))
          .filter(Boolean)
          .join("\n\n")
          .trim() || SECTION_FALLBACKS[sectionKey];

      return `<${sectionKey}>\n${sectionText}\n</${sectionKey}>`;
    });

    return promptParts.join("\n\n").trim();
  }

  function buildEditorModel(promptType = "", settings = {}) {
    const catalog = PROMPT_RULE_CATALOG[String(promptType || "").trim()];
    if (!catalog) {
      return null;
    }
    const promptRules = normalizePromptRules(settings?.promptRules);
    const promptConfig = promptRules[promptType] || {};
    const sectionOrder = mergeOrderedIds(
      resolveCatalogSectionOrder(catalog),
      (promptConfig.sectionOrder || []).map((item) => normalizeSectionKey(item)).filter(Boolean)
    );

    return {
      id: promptType,
      label: catalog.label,
      group: catalog.group,
      description: catalog.description,
      sections: sectionOrder.map((sectionKey) => {
        const descriptors = Array.isArray(catalog.sections?.[sectionKey])
          ? catalog.sections[sectionKey]
          : [];
        const sectionConfig = promptConfig.sections?.[sectionKey] || normalizePromptRuleSection({});
        const itemsById = new Map();

        descriptors.forEach((descriptor) => {
          const overrideText = Object.prototype.hasOwnProperty.call(
            sectionConfig.overrides || {},
            descriptor.id
          )
            ? sectionConfig.overrides[descriptor.id]
            : descriptor.defaultText || "";
          itemsById.set(descriptor.id, {
            id: descriptor.id,
            kind: descriptor.kind,
            label: descriptor.label,
            editable: descriptor.kind === "template",
            text: descriptor.kind === "dynamic" ? "" : String(overrideText || ""),
            templateSegments:
              descriptor.kind === "template" ? parseTemplateSegments(String(overrideText || "")) : [],
            hasLockedTemplateSlots:
              descriptor.kind === "template"
                ? parseTemplateSegments(String(overrideText || "")).some(
                    (segment) => segment?.type === "placeholder"
                  )
                : false,
            hint:
              descriptor.kind === "dynamic"
                ? descriptor.runtimeHint || "运行时读取"
                : "可直接修改这段内置文字"
          });
        });

        normalizePromptRuleCustomItems(sectionConfig.customItems).forEach((item) => {
          itemsById.set(item.id, {
            id: item.id,
            kind: "custom",
            label: "自定义文字",
            editable: true,
            text: String(item.text || ""),
            hint: "自定义补充文字，可拖动排序"
          });
        });

        const itemOrder = mergeOrderedIds(
          [...itemsById.keys()],
          sectionConfig.itemOrder || []
        );

        return {
          key: sectionKey,
          label: SECTION_LABELS[sectionKey] || sectionKey,
          items: itemOrder
            .map((itemId) => itemsById.get(itemId))
            .filter(Boolean)
        };
      })
    };
  }

  function createCustomItemId(promptType = "", sectionKey = "") {
    const promptSeed = trimText(promptType || "prompt");
    const sectionSeed = normalizeSectionKey(sectionKey) || "section";
    return `custom_${promptSeed}_${sectionSeed}_${Date.now()}_${Math.random()
      .toString(36)
      .slice(2, 8)}`;
  }

  window.PulsePromptConfig = {
    SECTION_KEYS,
    SECTION_LABELS,
    SECTION_FALLBACKS,
    normalizeManualTimeSettings,
    createManualTimeSettings,
    resolvePromptNow,
    formatPromptTimeLabel,
    formatDateTimeInputValue,
    normalizePromptRules,
    getPromptCatalogList,
    buildPrompt,
    buildEditorModel,
    parseTemplateSegments,
    updateTemplateTextSegment,
    createCustomItemId,
    clonePlain
  };
})();
