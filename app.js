const DEFAULT_OPENAI_ENDPOINT = "https://api.deepseek.com/chat/completions";
const SETTINGS_KEY = "x_style_generator_settings_v2";
const POSTS_KEY = "x_style_generator_posts_v2";
const REFRESH_KEY = "x_style_generator_refresh_v2";
const PROFILE_KEY = "x_style_generator_profile_v1";
const PROFILE_POSTS_KEY = "x_style_generator_profile_posts_v1";
const DIRECT_MESSAGES_KEY = "x_style_generator_direct_messages_v1";
const DEFAULT_POST_COUNT = 10;
const PULL_THRESHOLD = 88;
const HOME_FEED_LABELS = {
  hot: "热点消息",
  entertainment: "文娱"
};
const REPLY_COUNT = 4;
const NESTED_REPLY_COUNT = 3;

const DEFAULT_SETTINGS = {
  mode: "openai",
  endpoint: DEFAULT_OPENAI_ENDPOINT,
  token: "",
  model: "deepseek-chat",
  worldview:
    "这是一个强调长期主义、产品洞察和公共讨论质量的中文社交世界。用户习惯像在 X 上一样快速表达观点，但会天然追问效率、增长、AI 和平台变迁。整体语气要真实、犀利、能引发跟帖，不要写成官方通稿。",
  hotTopics:
    "AI Agent 正在重构内容生产\n大模型创业进入精细化竞争\n短视频平台与开放社交平台的流量分配\n独立开发者如何建立可持续收入\n产品经理在 AI 时代的角色变化",
  entertainmentText:
    "热门电影口碑分化\n综艺名场面引发二创\n明星演出与巡演热度\n游戏联动和社区讨论\n平台热门短剧与话题角色",
  extraInstructions:
    "请写成中文互联网讨论帖，观点彼此有差异，但都与世界观保持一致。避免重复句式，避免营销口吻。"
};

const DEFAULT_PROFILE = {
  avatar: "WG",
  username: "Worldview Generator",
  following: "128",
  followers: "8.6K",
  signature: "长期主义、产品洞察、AI 讨论。",
  personaPrompt:
    "这个用户理性、克制、对产品与内容趋势敏感，说话直接但不失礼貌，偏爱长期主义和结构化表达。"
};

const FEED_NAMES = [
  ["Astra Lin", "@astra_builds"],
  ["Ming Pulse", "@mingpulse"],
  ["Rhea Byte", "@rheabyte"],
  ["Noah Drift", "@noahsignal"],
  ["Ivy Orbit", "@ivyorbit"],
  ["Kite Workshop", "@kitewrk"],
  ["Luna Frame", "@lunaframe"],
  ["Delta Note", "@deltanote"],
  ["Sora Stack", "@sorastack"],
  ["Echo Matrix", "@echomatrix"],
  ["Nova Path", "@novapath"],
  ["Pixel Harbor", "@pixelharbor"]
];

const FOLLOWING_CARDS = [
  {
    name: "Open Product Journal",
    handle: "@openproduct",
    note: "每天拆解产品增长、内容节奏和用户决策逻辑。"
  },
  {
    name: "Agent Protocol",
    handle: "@agentproto",
    note: "跟踪 AI Agent 工作流、自动化协作和前沿工具链。"
  },
  {
    name: "Indie Ledger",
    handle: "@indieledger",
    note: "关注独立开发者收入结构、冷启动与复利模型。"
  }
];

const MESSAGE_SENDERS = [
  ["内容策略组", "下一个热点最好做成对立观点串联，我觉得会更像 X 的讨论氛围。"],
  ["产品同路人", "首页刷新逻辑不错，可以把模型返回固定成 JSON 数组，后续接后端会更稳。"],
  ["运营雷达", "今天的热点里 AI Agent 和独立开发收入很适合放在同一轮讨论里。"]
];

const pageTitleMap = {
  home: "首页",
  following: "关注",
  messages: "私信",
  profile: "个人主页",
  settings: "设置"
};

const pages = {
  home: document.querySelector("#home-page"),
  following: document.querySelector("#following-page"),
  messages: document.querySelector("#messages-page"),
  profile: document.querySelector("#profile-page"),
  settings: document.querySelector("#settings-page")
};

const navItems = [...document.querySelectorAll(".nav-item[data-tab]")];
const jumpLinks = [...document.querySelectorAll("[data-jump-tab]")];
const miniTabs = [...document.querySelectorAll(".mini-tab[data-feed]")];
const pageTitleEl = document.querySelector("#page-title");
const feedEl = document.querySelector("#feed");
const followingListEl = document.querySelector("#following-list");
const messagesListEl = document.querySelector("#messages-list");
const messagesGenerateBtn = document.querySelector("#messages-generate-btn");
const messagesStatusEl = document.querySelector("#messages-status");
const profilePostsEl = document.querySelector("#profile-posts");
const homeStatusEl = document.querySelector("#home-status");
const settingsStatusEl = document.querySelector("#settings-status");
const promptPreviewEl = document.querySelector("#prompt-preview");
const messagePromptPreviewEl = document.querySelector("#message-prompt-preview");
const topRefreshBtn = document.querySelector("#top-refresh-btn");
const settingsGenerateBtn = document.querySelector("#settings-generate-btn");
const settingsForm = document.querySelector("#settings-form");
const homeScrollEl = document.querySelector("#home-scroll");
const pullIndicatorEl = document.querySelector("#pull-indicator");
const pullLabelEl = document.querySelector("#pull-label");
const pullMetaEl = document.querySelector("#pull-meta");
const profileAvatarEl = document.querySelector("#profile-avatar");
const profileUsernameEl = document.querySelector("#profile-username");
const profileBioEl = document.querySelector("#profile-bio");
const profileHandleEl = document.querySelector("#profile-handle");
const profileFollowersEl = document.querySelector("#profile-followers");
const profileFollowingEl = document.querySelector("#profile-following");
const profilePostCountEl = document.querySelector("#profile-post-count");
const profileEditorCardEl = document.querySelector("#profile-editor-card");
const profileForm = document.querySelector("#profile-form");
const profileStatusEl = document.querySelector("#profile-status");
const profileEditToggleBtn = document.querySelector("#profile-edit-toggle-btn");
const profileEditorCloseBtn = document.querySelector("#profile-editor-close-btn");
const profileCancelBtn = document.querySelector("#profile-cancel-btn");
const profileAvatarInput = document.querySelector("#profile-avatar-input");
const profileUsernameInput = document.querySelector("#profile-username-input");
const profileFollowingInput = document.querySelector("#profile-following-input");
const profileFollowersInput = document.querySelector("#profile-followers-input");
const profileSignatureInput = document.querySelector("#profile-signature-input");
const profilePersonaInput = document.querySelector("#profile-persona-input");
const modeSelect = document.querySelector("#api-mode");
const endpointInput = document.querySelector("#api-endpoint");
const tokenInput = document.querySelector("#api-token");
const modelInput = document.querySelector("#api-model");
const modelWrap = document.querySelector("#model-wrap");
const worldviewInput = document.querySelector("#worldview-text");
const hotTopicsInput = document.querySelector("#hot-topics-text");
const entertainmentTextInput = document.querySelector("#entertainment-text");
const extraInstructionsInput = document.querySelector("#extra-instructions");

const state = {
  activeTab: "home",
  settings: loadSettings(),
  feeds: loadFeeds(),
  directMessages: loadDirectMessages(),
  profile: loadProfile(),
  profilePosts: loadProfilePosts(),
  discussions: createDiscussionState(),
  activeFeed: "hot",
  profileEditorOpen: false,
  isRefreshing: false,
  lastRefreshAt: localStorage.getItem(REFRESH_KEY) || "",
  pullDistance: 0,
  touchStartY: 0,
  touchTracking: false,
  wheelReleaseTimer: null
};

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatDateTime(value = new Date()) {
  return new Intl.DateTimeFormat("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(value);
}

function truncate(text, length = 120) {
  const normalized = String(text || "").trim();
  if (normalized.length <= length) {
    return normalized;
  }
  return `${normalized.slice(0, length - 1)}…`;
}

function parseTopics(source) {
  return String(source || "")
    .split(/\n|,|，/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseWorldviewFragments(source) {
  return String(source || "")
    .split(/[\n。！？!?]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function createDiscussionState() {
  return {
    hot: {},
    entertainment: {}
  };
}

function hashText(value) {
  const text = String(value || "");
  let hash = 0;
  for (let index = 0; index < text.length; index += 1) {
    hash = (hash * 31 + text.charCodeAt(index)) >>> 0;
  }
  return hash.toString(36);
}

function getCurrentSettings() {
  return {
    mode: modeSelect.value,
    endpoint: endpointInput.value.trim(),
    token: tokenInput.value.trim(),
    model: modelInput.value.trim(),
    worldview: worldviewInput.value.trim(),
    hotTopics: hotTopicsInput.value.trim(),
    entertainmentText: entertainmentTextInput.value.trim(),
    extraInstructions: extraInstructionsInput.value.trim()
  };
}

function persistSettings(nextSettings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(nextSettings));
}

function loadSettings() {
  const raw = localStorage.getItem(SETTINGS_KEY);
  if (!raw) {
    return { ...DEFAULT_SETTINGS };
  }

  try {
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_SETTINGS,
      ...parsed
    };
  } catch (_error) {
    return { ...DEFAULT_SETTINGS };
  }
}

function persistFeeds(feeds) {
  localStorage.setItem(POSTS_KEY, JSON.stringify(feeds));
}

function loadProfile() {
  const raw = localStorage.getItem(PROFILE_KEY);
  if (!raw) {
    return { ...DEFAULT_PROFILE };
  }

  try {
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_PROFILE,
      ...parsed
    };
  } catch (_error) {
    return { ...DEFAULT_PROFILE };
  }
}

function persistProfile(profile) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

function createDefaultDirectMessages() {
  return MESSAGE_SENDERS.map((item, index) => ({
    id: `dm_${index}_${hashText(item[0])}`,
    sender: item[0],
    handle: `@dm_${index + 1}`,
    text: item[1],
    context: index === 0 ? "热点跟进" : index === 1 ? "内容协作" : "灵感交换",
    time: `${index + 1}h`
  }));
}

function persistDirectMessages(messages) {
  localStorage.setItem(DIRECT_MESSAGES_KEY, JSON.stringify(messages));
}

function loadDirectMessages() {
  const raw = localStorage.getItem(DIRECT_MESSAGES_KEY);
  if (!raw) {
    return createDefaultDirectMessages();
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : createDefaultDirectMessages();
  } catch (_error) {
    return createDefaultDirectMessages();
  }
}

function loadProfilePosts() {
  const raw = localStorage.getItem(PROFILE_POSTS_KEY);
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

function loadFeeds() {
  const raw = localStorage.getItem(POSTS_KEY);
  if (!raw) {
    return {
      hot: buildLocalPosts(DEFAULT_SETTINGS, DEFAULT_POST_COUNT, "hot"),
      entertainment: []
    };
  }

  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length) {
      return {
        hot: parsed.map((item, index) => normalizePost(item, index)),
        entertainment: []
      };
    }

    if (parsed && typeof parsed === "object") {
      return {
        hot: Array.isArray(parsed.hot)
          ? parsed.hot.map((item, index) => normalizePost(item, index))
          : [],
        entertainment: Array.isArray(parsed.entertainment)
          ? parsed.entertainment.map((item, index) => normalizePost(item, index))
          : []
      };
    }
  } catch (_error) {
    return {
      hot: buildLocalPosts(DEFAULT_SETTINGS, DEFAULT_POST_COUNT, "hot"),
      entertainment: []
    };
  }

  return {
    hot: buildLocalPosts(DEFAULT_SETTINGS, DEFAULT_POST_COUNT, "hot"),
    entertainment: []
  };
}

function applySettingsToForm(settings) {
  const normalizedEndpoint =
    settings.mode === "openai"
      ? normalizeOpenAICompatibleEndpoint(settings.endpoint)
      : settings.endpoint;
  modeSelect.value = settings.mode || "openai";
  endpointInput.value = normalizedEndpoint || DEFAULT_OPENAI_ENDPOINT;
  tokenInput.value = settings.token || "";
  modelInput.value = settings.model || "deepseek-chat";
  worldviewInput.value = settings.worldview || DEFAULT_SETTINGS.worldview;
  hotTopicsInput.value = settings.hotTopics || DEFAULT_SETTINGS.hotTopics;
  entertainmentTextInput.value =
    settings.entertainmentText || DEFAULT_SETTINGS.entertainmentText;
  extraInstructionsInput.value =
    settings.extraInstructions || DEFAULT_SETTINGS.extraInstructions;
  updateModeUI();
}

function applyProfileToForm(profile) {
  profileAvatarInput.value = profile.avatar || DEFAULT_PROFILE.avatar;
  profileUsernameInput.value = profile.username || DEFAULT_PROFILE.username;
  profileFollowingInput.value = profile.following || DEFAULT_PROFILE.following;
  profileFollowersInput.value = profile.followers || DEFAULT_PROFILE.followers;
  profileSignatureInput.value = profile.signature || DEFAULT_PROFILE.signature;
  profilePersonaInput.value = profile.personaPrompt || DEFAULT_PROFILE.personaPrompt;
}

function updateModeUI() {
  const isOpenAI = modeSelect.value === "openai";
  modelWrap.style.display = isOpenAI ? "grid" : "none";
  if (isOpenAI && !endpointInput.value.trim()) {
    endpointInput.value = DEFAULT_OPENAI_ENDPOINT;
  }
}

function getCurrentProfile() {
  return {
    avatar: profileAvatarInput.value.trim() || DEFAULT_PROFILE.avatar,
    username: profileUsernameInput.value.trim() || DEFAULT_PROFILE.username,
    following: profileFollowingInput.value.trim() || DEFAULT_PROFILE.following,
    followers: profileFollowersInput.value.trim() || DEFAULT_PROFILE.followers,
    signature: profileSignatureInput.value.trim() || DEFAULT_PROFILE.signature,
    personaPrompt: profilePersonaInput.value.trim() || DEFAULT_PROFILE.personaPrompt
  };
}

function setProfileStatus(message, tone = "") {
  profileStatusEl.textContent = message;
  profileStatusEl.className = "status-text";
  if (tone) {
    profileStatusEl.classList.add(tone);
  }
}

function buildProfileHandle(username) {
  const normalized = String(username || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
  return normalized ? `@${normalized}` : "@worldview_lab";
}

function saveCurrentProfile() {
  state.profile = getCurrentProfile();
  persistProfile(state.profile);
  renderProfilePage();
  updateMessagePromptPreview();
}

function setProfileEditorOpen(isOpen) {
  state.profileEditorOpen = isOpen;
  profileEditorCardEl.classList.toggle("hidden", !isOpen);
  profileEditToggleBtn.textContent = isOpen ? "收起编辑" : "编辑资料";
}

function normalizeOpenAICompatibleEndpoint(endpoint) {
  const trimmed = String(endpoint || "").trim();
  if (!trimmed) {
    return DEFAULT_OPENAI_ENDPOINT;
  }

  try {
    const url = new URL(trimmed);
    if (url.hostname !== "api.deepseek.com") {
      return trimmed.replace(/\/+$/, "");
    }

    if (url.pathname === "/" || url.pathname === "/v1" || url.pathname === "/v1/") {
      return DEFAULT_OPENAI_ENDPOINT;
    }

    if (
      url.pathname === "/v1/chat/completions" ||
      url.pathname === "/v1/chat/completions/"
    ) {
      return DEFAULT_OPENAI_ENDPOINT;
    }

    if (url.pathname === "/chat/completions/") {
      return "https://api.deepseek.com/chat/completions";
    }

    return trimmed.replace(/\/+$/, "");
  } catch (_error) {
    return trimmed;
  }
}

function buildPrompt(settings, feedType = state.activeFeed, count = DEFAULT_POST_COUNT) {
  const feedLabel = HOME_FEED_LABELS[feedType] || HOME_FEED_LABELS.hot;
  const feedSource =
    feedType === "entertainment"
      ? settings.entertainmentText || DEFAULT_SETTINGS.entertainmentText
      : settings.hotTopics || DEFAULT_SETTINGS.hotTopics;
  const feedInstruction =
    feedType === "entertainment"
      ? "当前文娱话题："
      : "当前热点：";

  return [
    "你是一个负责生成 X 风格中文讨论流的内容助手。",
    `当前目标分页签是“${feedLabel}”。`,
    `请严格输出 JSON 数组，并且包含 ${count} 个对象，不要输出额外解释。`,
    "每个对象必须包含以下字段：displayName, handle, text, topic, replies, reposts, likes, views。",
    "text 需要像 X 首页上的真实讨论帖，长度控制在 40 到 130 字之间，语气自然、有观点、有轻微冲突感。",
    "所有内容都应遵循以下世界观：",
    settings.worldview || DEFAULT_SETTINGS.worldview,
    feedInstruction,
    feedSource,
    "补充要求：",
    settings.extraInstructions || DEFAULT_SETTINGS.extraInstructions,
    "请保证 10 条内容不重复，角度不同，并贴近中文互联网的实时讨论氛围。"
  ].join("\n\n");
}

function buildFeedSourceText(settings, feedType = state.activeFeed) {
  return feedType === "entertainment"
    ? settings.entertainmentText || DEFAULT_SETTINGS.entertainmentText
    : settings.hotTopics || DEFAULT_SETTINGS.hotTopics;
}

function buildMessagesPrompt(settings, profile, count = 4) {
  return [
    "你正在生成一个 X 风格社交产品中的私信列表。",
    `请严格输出 JSON 数组，并且包含 ${count} 个对象，不要输出额外解释。`,
    "每个对象必须包含以下字段：sender, handle, text, context, time。",
    "这些消息应该像别人主动发给该用户的私信，语气比公开讨论更直接、更私密，但仍然要自然可信。",
    "世界观文本：",
    settings.worldview || DEFAULT_SETTINGS.worldview,
    "热点文本：",
    settings.hotTopics || DEFAULT_SETTINGS.hotTopics,
    "文娱文本：",
    settings.entertainmentText || DEFAULT_SETTINGS.entertainmentText,
    "用户人设：",
    profile.personaPrompt || DEFAULT_PROFILE.personaPrompt,
    "补充要求：",
    settings.extraInstructions || DEFAULT_SETTINGS.extraInstructions,
    "请让不同私信发件人的动机不同，例如约稿、交流观点、递送情报、邀请合作或追问某条公开讨论。"
  ].join("\n\n");
}

function buildReplyPrompt(
  settings,
  feedType,
  rootPost,
  parentReply = null,
  count = REPLY_COUNT
) {
  const feedLabel = HOME_FEED_LABELS[feedType] || HOME_FEED_LABELS.hot;
  const targetText = parentReply ? parentReply.text : rootPost.text;
  const promptTitle = parentReply ? "楼中楼回复" : "主楼回复";

  return [
    `你正在生成 X 风格中文讨论串中的${promptTitle}。`,
    `当前所属分页签是“${feedLabel}”。`,
    "请严格输出 JSON 数组，不要输出额外解释。",
    `请生成 ${count} 条回复，每条都必须是不同用户的口吻。`,
    "每个对象必须包含以下字段：displayName, handle, text, likes, replies。",
    "回复语气要像真实网友跟帖，长度控制在 18 到 80 字之间，可以有赞同、反对、补充和追问。",
    "整体讨论需要遵循以下世界观：",
    settings.worldview || DEFAULT_SETTINGS.worldview,
    "当前板块讨论素材：",
    buildFeedSourceText(settings, feedType),
    "主楼内容：",
    rootPost.text,
    parentReply ? "当前正在回复的上一层内容：" : "当前需要围绕主楼展开讨论的内容：",
    targetText,
    "补充要求：",
    settings.extraInstructions || DEFAULT_SETTINGS.extraInstructions,
    "请避免重复句式，并保持楼中讨论的连贯性。"
  ].join("\n\n");
}

function normalizeReply(item, index = 0, seed = "root") {
  const [fallbackName, fallbackHandle] =
    FEED_NAMES[(index + 3) % FEED_NAMES.length];
  const stableSeed = `${seed}-${item?.text || ""}-${item?.displayName || fallbackName}-${index}`;
  return {
    id: item?.id || `reply_${index}_${hashText(stableSeed)}`,
    displayName: truncate(item?.displayName || fallbackName, 24),
    handle: truncate(item?.handle || fallbackHandle, 24),
    text: truncate(item?.text || "这条回复还在生成中。", 120),
    likes: formatMetric(item?.likes, 12 + index * 5),
    replies: formatMetric(item?.replies, 2 + index),
    time: item?.time || `${index + 1}m`,
    children: Array.isArray(item?.children) ? item.children : [],
    expanded: Boolean(item?.expanded),
    loading: Boolean(item?.loading)
  };
}

function setSettingsStatus(message, tone = "") {
  settingsStatusEl.textContent = message;
  settingsStatusEl.className = "status-text";
  if (tone) {
    settingsStatusEl.classList.add(tone);
  }
}

function setHomeStatus(message, tone = "") {
  homeStatusEl.textContent = message;
  homeStatusEl.className = "inline-status";
  if (tone) {
    homeStatusEl.classList.add(tone);
  }
}

function setPullIndicator(distance = 0, mode = "idle") {
  const progress = Math.max(0, Math.min(distance, 130));
  const scale = 1 + progress / 420;
  pullIndicatorEl.style.transform = `scale(${scale})`;
  pullIndicatorEl.classList.toggle("ready", mode === "ready");
  pullIndicatorEl.classList.toggle("loading", mode === "loading");

  if (mode === "loading") {
    pullLabelEl.textContent = "正在刷新讨论流";
    pullMetaEl.textContent = "正在请求 API 或本地回退生成内容";
    return;
  }

  if (mode === "ready") {
    pullLabelEl.textContent = "松开即可刷新";
    pullMetaEl.textContent = "将生成默认 10 条新的讨论信息";
    return;
  }

  pullLabelEl.textContent = "向下滑动以刷新";
  pullMetaEl.textContent = "默认生成 10 条讨论信息";
}

function saveCurrentSettings() {
  state.settings = getCurrentSettings();
  if (state.settings.mode === "openai") {
    state.settings.endpoint = normalizeOpenAICompatibleEndpoint(state.settings.endpoint);
    endpointInput.value = state.settings.endpoint;
  }
  persistSettings(state.settings);
  updatePromptPreview();
  updateMessagePromptPreview();
  updateInsightPanel();
  renderFollowingPage();
  renderMessagesPage();
  renderProfilePage();
}

function switchTab(tabName) {
  state.activeTab = tabName;
  Object.entries(pages).forEach(([name, page]) => {
    page.classList.toggle("active", name === tabName);
  });

  navItems.forEach((item) => {
    item.classList.toggle("active", item.dataset.tab === tabName);
  });

  pageTitleEl.textContent = pageTitleMap[tabName] || "首页";
  topRefreshBtn.style.visibility = tabName === "home" ? "visible" : "hidden";
}

function updatePromptPreview() {
  promptPreviewEl.textContent = buildPrompt(getCurrentSettings(), state.activeFeed);
}

function updateMessagePromptPreview() {
  messagePromptPreviewEl.textContent = buildMessagesPrompt(
    getCurrentSettings(),
    getCurrentProfile()
  );
}

function updateInsightPanel() {
  return;
}

function formatMetric(value, fallback) {
  const numeric = Number(value);
  if (Number.isFinite(numeric) && numeric >= 0) {
    return Math.round(numeric);
  }
  return fallback;
}

function normalizePost(item, index = 0) {
  const [fallbackName, fallbackHandle] = FEED_NAMES[index % FEED_NAMES.length];
  const stableSeed = `${item?.text || ""}-${item?.displayName || fallbackName}-${index}`;
  return {
    id: item?.id || `post_${index}_${hashText(stableSeed)}`,
    displayName: truncate(item?.displayName || fallbackName, 28),
    handle: truncate(item?.handle || fallbackHandle, 28),
    text: truncate(item?.text || "讨论内容生成中。", 160),
    topic: truncate(item?.topic || "热点话题", 24),
    replies: formatMetric(item?.replies, 8 + index * 3),
    reposts: formatMetric(item?.reposts, 6 + index * 4),
    likes: formatMetric(item?.likes, 45 + index * 27),
    views: formatMetric(item?.views, 800 + index * 420),
    time: item?.time || `${Math.max(1, index + 1)}m`
  };
}

function renderFeed(posts) {
  if (!posts.length) {
    feedEl.innerHTML = `<p class="empty-state">${escapeHtml(
      HOME_FEED_LABELS[state.activeFeed]
    )} 还没有内容，请先刷新当前分页签。</p>`;
    return;
  }

  feedEl.innerHTML = posts
    .map(
      (post) => `
        <article class="post" data-post-id="${escapeHtml(post.id)}">
          <div class="post-shell post-shell--interactive" data-action="toggle-post" data-post-id="${escapeHtml(post.id)}">
            <div class="avatar">${escapeHtml(post.displayName.slice(0, 2).toUpperCase())}</div>
            <div>
              <div class="post-head">
                <strong>${escapeHtml(post.displayName)}</strong>
                <span class="post-handle">${escapeHtml(post.handle)}</span>
                <span class="post-time">· ${escapeHtml(post.time)}</span>
                <span class="post-topic">${escapeHtml(post.topic)}</span>
              </div>
              <p class="post-text">${escapeHtml(post.text)}</p>
              <div class="post-actions">
                <button class="action-link" type="button" data-action="toggle-post" data-post-id="${escapeHtml(
                  post.id
                )}">
                  ${getPostThreadState(post.id)?.expanded ? "收起讨论" : "展开讨论"}
                </button>
                <span>回复 ${post.replies}</span>
                <span>转发 ${post.reposts}</span>
                <span>喜欢 ${post.likes}</span>
                <span>浏览 ${post.views}</span>
              </div>
            </div>
          </div>
          ${renderPostDiscussion(post)}
        </article>
      `
    )
    .join("");
}

function getFeedDiscussions() {
  return state.discussions[state.activeFeed];
}

function getPostThreadState(postId) {
  return getFeedDiscussions()[postId] || null;
}

function renderPostDiscussion(post) {
  const threadState = getPostThreadState(post.id);
  if (!threadState?.expanded) {
    return "";
  }

  if (threadState.loading) {
    return '<section class="thread-panel"><p class="thread-loading">正在生成相关回复…</p></section>';
  }

  if (!threadState.replies?.length) {
    return '<section class="thread-panel"><p class="thread-empty">这条讨论暂时还没有回复。</p></section>';
  }

  return `
    <section class="thread-panel">
      ${renderReplyBranch(post.id, threadState.replies)}
    </section>
  `;
}

function renderReplyBranch(postId, replies, depth = 1) {
  return replies
    .map((reply) => {
      const toggleLabel = reply.expanded ? "收起回复" : "展开回复";
      const nestedBlock = reply.expanded
        ? reply.loading
          ? '<div class="reply-children"><p class="thread-loading">正在生成楼中楼回复…</p></div>'
          : reply.children?.length
            ? `<div class="reply-children">${renderReplyBranch(
                postId,
                reply.children,
                depth + 1
              )}</div>`
            : '<div class="reply-children"><p class="thread-empty">这层回复暂时还没有新内容。</p></div>'
        : "";

      return `
        <article class="reply-card" data-reply-id="${escapeHtml(reply.id)}" data-depth="${depth}">
          <div class="reply-shell">
            <div class="reply-avatar">${escapeHtml(reply.displayName.slice(0, 2).toUpperCase())}</div>
            <div>
              <div class="post-head">
                <strong>${escapeHtml(reply.displayName)}</strong>
                <span class="post-handle">${escapeHtml(reply.handle)}</span>
                <span class="post-time">· ${escapeHtml(reply.time)}</span>
              </div>
              <p class="reply-text">${escapeHtml(reply.text)}</p>
              <div class="reply-actions">
                <button
                  class="action-link"
                  type="button"
                  data-action="toggle-reply"
                  data-post-id="${escapeHtml(postId)}"
                  data-reply-id="${escapeHtml(reply.id)}"
                >
                  ${toggleLabel}
                </button>
                <span>回复 ${reply.replies}</span>
                <span>喜欢 ${reply.likes}</span>
              </div>
              ${nestedBlock}
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderHomeTabs() {
  miniTabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.feed === state.activeFeed);
  });
}

function renderActiveFeed() {
  renderHomeTabs();
  renderFeed(state.feeds[state.activeFeed] || []);
}

function renderFollowingPage() {
  const topics = parseTopics(getCurrentSettings().hotTopics);
  followingListEl.innerHTML = FOLLOWING_CARDS.map((item, index) => {
    const relatedTopic = topics[index] || "世界观扩展";
    return `
      <article class="follow-card">
        <div class="follow-card__head">
          <div>
            <strong class="follow-card__name">${escapeHtml(item.name)}</strong>
            <div class="post-handle">${escapeHtml(item.handle)}</div>
          </div>
          <span class="badge">${escapeHtml(relatedTopic)}</span>
        </div>
        <p>${escapeHtml(item.note)}</p>
      </article>
    `;
  }).join("");
}

function renderMessagesPage() {
  if (!state.directMessages.length) {
    messagesListEl.innerHTML =
      '<p class="empty-state">还没有私信内容，点击“新建消息”生成新的私信会话。</p>';
    return;
  }

  messagesListEl.innerHTML = state.directMessages
    .map(
      (item) => `
        <article class="conversation-card">
          <div class="conversation-card__head">
            <div>
              <strong>${escapeHtml(item.sender)}</strong>
              <div class="post-handle">${escapeHtml(item.handle || "@unknown")}</div>
            </div>
            <span class="post-time">${escapeHtml(item.time || "刚刚")}</span>
          </div>
          <p>${escapeHtml(item.text)}</p>
          <div class="reply-actions">
            <span>${escapeHtml(item.context || "相关私信")}</span>
          </div>
        </article>
      `
    )
    .join("");
}

function renderProfilePage() {
  const profile = state.profile;
  const postCount = state.profilePosts.length;
  profileAvatarEl.textContent = truncate(profile.avatar || DEFAULT_PROFILE.avatar, 4);
  profileUsernameEl.textContent = profile.username || DEFAULT_PROFILE.username;
  profileBioEl.textContent = profile.signature || DEFAULT_PROFILE.signature;
  profileHandleEl.textContent = buildProfileHandle(profile.username);
  profileFollowingEl.textContent = profile.following || DEFAULT_PROFILE.following;
  profileFollowersEl.textContent = profile.followers || DEFAULT_PROFILE.followers;
  profilePostCountEl.textContent = String(postCount);
  if (!state.profilePosts.length) {
    profilePostsEl.innerHTML =
      '<p class="empty-state">这个用户还没有发送任何文本内容。</p>';
    return;
  }

  profilePostsEl.innerHTML = state.profilePosts
    .map(
      (post) => `
        <article class="post">
          <div class="post-shell">
            <div class="avatar">${escapeHtml(
              truncate(profile.avatar || DEFAULT_PROFILE.avatar, 2)
            )}</div>
            <div>
              <div class="post-head">
                <strong>${escapeHtml(profile.username || DEFAULT_PROFILE.username)}</strong>
                <span class="post-handle">${escapeHtml(profileHandleEl.textContent)}</span>
                <span class="post-time">· ${escapeHtml(post.time || "刚刚")}</span>
              </div>
              <p class="post-text">${escapeHtml(post.text || "")}</p>
            </div>
          </div>
        </article>
      `
    )
    .join("");
}

function buildRequestBody(settings, prompt, count = DEFAULT_POST_COUNT) {
  if (settings.mode === "openai") {
    return {
      model: settings.model || DEFAULT_SETTINGS.model,
      messages: [
        {
          role: "system",
          content: "你只输出 JSON 数组，不要输出额外解释。"
        },
        {
          role: "user",
          content: prompt
        }
      ],
      stream: false
    };
  }

  return {
    prompt,
    count,
    format: "json-array"
  };
}

function resolveMessage(payload) {
  if (typeof payload === "string") {
    return payload.trim();
  }

  if (Array.isArray(payload)) {
    return JSON.stringify(payload);
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

  return (
    payload?.message ||
    payload?.text ||
    payload?.content ||
    payload?.data?.message ||
    payload?.output?.[0]?.content?.[0]?.text ||
    ""
  );
}

function extractJsonArray(text) {
  if (!text) {
    return "";
  }

  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenced?.[1]) {
    return fenced[1].trim();
  }

  const start = text.indexOf("[");
  const end = text.lastIndexOf("]");
  if (start !== -1 && end !== -1 && end > start) {
    return text.slice(start, end + 1);
  }

  return "";
}

function parseGeneratedPosts(rawText) {
  const jsonText = extractJsonArray(rawText);
  if (!jsonText) {
    throw new Error("接口已返回内容，但没有找到 JSON 数组。");
  }

  const parsed = JSON.parse(jsonText);
  if (!Array.isArray(parsed) || !parsed.length) {
    throw new Error("接口返回的 JSON 不是有效的讨论数组。");
  }

  return parsed.slice(0, DEFAULT_POST_COUNT).map((item, index) => normalizePost(item, index));
}

function parseGeneratedReplies(rawText, count = REPLY_COUNT, seed = "reply") {
  const jsonText = extractJsonArray(rawText);
  if (!jsonText) {
    throw new Error("接口已返回内容，但没有找到 JSON 数组。");
  }

  const parsed = JSON.parse(jsonText);
  if (!Array.isArray(parsed) || !parsed.length) {
    throw new Error("接口返回的 JSON 不是有效的回复数组。");
  }

  return parsed
    .slice(0, count)
    .map((item, index) => normalizeReply(item, index, `${seed}-${index}`));
}

function buildLocalReplies(
  settings,
  feedType,
  rootPost,
  parentReply = null,
  count = REPLY_COUNT
) {
  const sourceTopics = parseTopics(buildFeedSourceText(settings, feedType));
  const targets = sourceTopics.length ? sourceTopics : [rootPost.topic || "当前讨论"];
  const parentText = parentReply ? parentReply.text : rootPost.text;
  const viewpoints = [
    "我觉得这个判断挺准的，但真正值得追问的是执行层面会不会跑偏。",
    "不完全同意，问题不在观点本身，而在大家默认了同一套前提。",
    "这条最有意思的是把情绪和结构放到一起说了，讨论空间一下就打开了。",
    "如果把样本放大一点看，这种现象可能比帖子里写的更明显。",
    "我更关心普通用户会怎么接这句话，因为传播效率往往决定讨论走向。"
  ];
  const followUps = [
    "这也解释了为什么评论区会自然分成两派。",
    "所以我会更想看后续有没有人给出反例。",
    "这类表达在这个板块里特别容易引出连锁回复。",
    "要是继续往下聊，核心还是具体场景。",
    "真正有意思的是这句话还能往下拆。"
  ];

  return Array.from({ length: count }, (_, index) => {
    const topic = targets[index % targets.length];
    const [displayName, handle] = FEED_NAMES[(index + 5) % FEED_NAMES.length];
    return normalizeReply(
      {
        displayName,
        handle,
        text: `${viewpoints[index % viewpoints.length]} 围绕“${topic}”来看，${truncate(
          parentText,
          26
        )}${followUps[index % followUps.length]}`,
        likes: 10 + index * 6,
        replies: 1 + (index % 3),
        time: `${index + 1}m`
      },
      index,
      `${rootPost.id}-${parentReply?.id || "root"}`
    );
  });
}

function findReplyNode(replies, replyId) {
  for (const reply of replies) {
    if (reply.id === replyId) {
      return reply;
    }
    const nested = findReplyNode(reply.children || [], replyId);
    if (nested) {
      return nested;
    }
  }
  return null;
}

function normalizeDirectMessage(item, index = 0) {
  return {
    id: item?.id || `dm_${index}_${hashText(item?.text || item?.sender || "")}`,
    sender: truncate(item?.sender || item?.displayName || `联系人 ${index + 1}`, 24),
    handle: truncate(item?.handle || `@contact_${index + 1}`, 24),
    text: truncate(item?.text || "一条新的私信正在生成。", 160),
    context: truncate(item?.context || "私信互动", 24),
    time: item?.time || `${index + 1}m`
  };
}

function buildLocalPosts(settings, count = DEFAULT_POST_COUNT, feedType = "hot") {
  const sourceText =
    feedType === "entertainment"
      ? settings.entertainmentText || DEFAULT_SETTINGS.entertainmentText
      : settings.hotTopics || DEFAULT_SETTINGS.hotTopics;
  const topics = parseTopics(sourceText);
  const worldviewParts = parseWorldviewFragments(settings.worldview);
  const baseTopics = topics.length
    ? topics
    : feedType === "entertainment"
      ? ["电影口碑", "综艺热梗", "演出巡演"]
      : ["AI Agent", "产品增长", "独立开发"];
  const worldviewBase = worldviewParts.length
    ? worldviewParts
    : ["这个社区偏爱真实、锋利且能引发互动的观点。"];

  const openings = [
    "如果把",
    "我越来越觉得",
    "真正值得讨论的不是",
    "今天刷到一圈内容后，最大的感受是",
    "现在很多人低估了",
    "有点反直觉，但我认为"
  ];

  const endings = [
    "这类话题天然适合在 X 上持续发酵。",
    "评论区一定会出现两派人，但这正是讨论价值所在。",
    "谁能先把它说透，谁就能拿到更高质量的关注。",
    "如果只看表面热度，很容易错过真正的信号。",
    "这件事不是有没有机会，而是谁更快形成判断。"
  ];

  return Array.from({ length: count }, (_, index) => {
    const topic = baseTopics[index % baseTopics.length];
    const worldview = worldviewBase[index % worldviewBase.length];
    const [displayName, handle] = FEED_NAMES[index % FEED_NAMES.length];
    const text = `${openings[index % openings.length]}${topic}，而是它背后暴露出的结构变化。${worldview} ${endings[index % endings.length]}`;

    return normalizePost(
      {
        displayName,
        handle,
        text,
        topic,
        replies: 10 + index * 3,
        reposts: 7 + index * 4,
        likes: 80 + index * 29,
        views: 1300 + index * 520,
        time: `${index + 1}m`
      },
      index
    );
  });
}

function buildLocalDirectMessages(settings, profile, count = 4) {
  const hotTopics = parseTopics(settings.hotTopics);
  const entertainmentTopics = parseTopics(settings.entertainmentText);
  const allTopics = [...hotTopics, ...entertainmentTopics].filter(Boolean);
  const topics = allTopics.length ? allTopics : ["当前讨论"];
  const senders = [
    "内容合作者",
    "同圈观察者",
    "运营搭子",
    "匿名情报员",
    "文娱编辑",
    "品牌联络人"
  ];
  const openers = [
    "刚看到你最近的讨论，我觉得这个角度很适合继续深聊。",
    "想私下问一句，你对这件事的判断是不是已经比公开发言更靠前了？",
    "这两天这个话题在圈内发酵得很快，你的人设会很适合切进去。",
    "如果你愿意，我们可以把这条线索展开成一轮更完整的内容。"
  ];

  return Array.from({ length: count }, (_, index) =>
    normalizeDirectMessage(
      {
        sender: senders[index % senders.length],
        handle: `@dm_${index + 1}`,
        text: `${openers[index % openers.length]} 围绕“${topics[index % topics.length]}”，我感觉这和你的用户人设很贴。`,
        context: `${topics[index % topics.length]} · 私信`,
        time: `${index + 1}m`
      },
      index
    )
  );
}

async function requestGeneratedPosts(settings, feedType = state.activeFeed) {
  const normalizedEndpoint = normalizeOpenAICompatibleEndpoint(settings.endpoint);
  settings.endpoint = normalizedEndpoint;

  if (!settings.endpoint) {
    throw new Error("未配置 API 地址，已切换为本地回退生成。");
  }

  if (settings.mode === "openai" && !settings.model) {
    throw new Error("DeepSeek / OpenAI 兼容模式需要填写模型名称。");
  }

  const prompt = buildPrompt(settings, feedType);
  const headers = {
    "Content-Type": "application/json"
  };

  if (settings.token) {
    headers.Authorization = `Bearer ${settings.token}`;
  }

  const response = await fetch(settings.endpoint, {
    method: "POST",
    headers,
    body: JSON.stringify(buildRequestBody(settings, prompt))
  });

  if (response.status === 404 && settings.endpoint.includes("api.deepseek.com")) {
    throw new Error(
      "DeepSeek 接口返回 404。请确认地址为 https://api.deepseek.com/chat/completions，而不是 /v1/chat/completions 或仅填写域名。"
    );
  }

  if (!response.ok) {
    throw new Error(`接口请求失败：HTTP ${response.status}`);
  }

  const rawResponse = await response.text();
  let payload = rawResponse;

  try {
    payload = JSON.parse(rawResponse);
  } catch (_error) {
    payload = rawResponse;
  }

  const message = resolveMessage(payload);
  if (!message) {
    throw new Error("接口请求成功，但响应中没有可解析的文本。");
  }

  return parseGeneratedPosts(message);
}

async function requestGeneratedDirectMessages(settings, profile, count = 4) {
  const normalizedEndpoint = normalizeOpenAICompatibleEndpoint(settings.endpoint);
  settings.endpoint = normalizedEndpoint;

  if (!settings.endpoint) {
    throw new Error("未配置 API 地址，已切换为本地回退生成。");
  }

  const prompt = buildMessagesPrompt(settings, profile, count);
  const headers = {
    "Content-Type": "application/json"
  };

  if (settings.token) {
    headers.Authorization = `Bearer ${settings.token}`;
  }

  const response = await fetch(settings.endpoint, {
    method: "POST",
    headers,
    body: JSON.stringify(buildRequestBody(settings, prompt, count))
  });

  if (!response.ok) {
    throw new Error(`私信请求失败：HTTP ${response.status}`);
  }

  const rawResponse = await response.text();
  let payload = rawResponse;

  try {
    payload = JSON.parse(rawResponse);
  } catch (_error) {
    payload = rawResponse;
  }

  const message = resolveMessage(payload);
  if (!message) {
    throw new Error("接口返回成功，但没有可解析的私信内容。");
  }

  const jsonText = extractJsonArray(message);
  if (!jsonText) {
    throw new Error("私信接口返回内容中没有 JSON 数组。");
  }

  const parsed = JSON.parse(jsonText);
  if (!Array.isArray(parsed) || !parsed.length) {
    throw new Error("接口返回的私信数据不是有效数组。");
  }

  return parsed.slice(0, count).map((item, index) => normalizeDirectMessage(item, index));
}

async function requestGeneratedReplies(
  settings,
  feedType,
  rootPost,
  parentReply = null,
  count = REPLY_COUNT
) {
  const normalizedEndpoint = normalizeOpenAICompatibleEndpoint(settings.endpoint);
  settings.endpoint = normalizedEndpoint;

  if (!settings.endpoint) {
    throw new Error("未配置 API 地址，已切换为本地回退生成。");
  }

  const prompt = buildReplyPrompt(settings, feedType, rootPost, parentReply, count);
  const headers = {
    "Content-Type": "application/json"
  };

  if (settings.token) {
    headers.Authorization = `Bearer ${settings.token}`;
  }

  const response = await fetch(settings.endpoint, {
    method: "POST",
    headers,
    body: JSON.stringify(buildRequestBody(settings, prompt, count))
  });

  if (!response.ok) {
    throw new Error(`回复请求失败：HTTP ${response.status}`);
  }

  const rawResponse = await response.text();
  let payload = rawResponse;

  try {
    payload = JSON.parse(rawResponse);
  } catch (_error) {
    payload = rawResponse;
  }

  const message = resolveMessage(payload);
  if (!message) {
    throw new Error("接口返回成功，但没有可解析的回复内容。");
  }

  return parseGeneratedReplies(
    message,
    count,
    `${rootPost.id}-${parentReply?.id || "root"}`
  );
}

async function expandPostDiscussion(postId) {
  const post = (state.feeds[state.activeFeed] || []).find((item) => item.id === postId);
  if (!post) {
    return;
  }

  const feedState = getFeedDiscussions();
  feedState[postId] = {
    expanded: true,
    loading: true,
    replies: feedState[postId]?.replies || []
  };
  renderActiveFeed();

  const settings = { ...getCurrentSettings() };
  try {
    let replies;
    try {
      replies = await requestGeneratedReplies(
        settings,
        state.activeFeed,
        post,
        null,
        REPLY_COUNT
      );
    } catch (_error) {
      replies = buildLocalReplies(settings, state.activeFeed, post, null, REPLY_COUNT);
    }

    feedState[postId] = {
      expanded: true,
      loading: false,
      replies
    };
    renderActiveFeed();
  } catch (_error) {
    feedState[postId] = {
      expanded: true,
      loading: false,
      replies: []
    };
    renderActiveFeed();
  }
}

async function togglePostDiscussion(postId) {
  const threadState = getPostThreadState(postId);
  if (threadState?.expanded) {
    threadState.expanded = false;
    renderActiveFeed();
    return;
  }

  await expandPostDiscussion(postId);
}

async function toggleNestedReply(postId, replyId) {
  const threadState = getPostThreadState(postId);
  if (!threadState) {
    return;
  }

  const targetReply = findReplyNode(threadState.replies || [], replyId);
  const rootPost = (state.feeds[state.activeFeed] || []).find((item) => item.id === postId);
  if (!targetReply || !rootPost) {
    return;
  }

  if (targetReply.expanded) {
    targetReply.expanded = false;
    renderActiveFeed();
    return;
  }

  targetReply.expanded = true;
  targetReply.loading = true;
  renderActiveFeed();

  const settings = { ...getCurrentSettings() };
  try {
    let replies;
    try {
      replies = await requestGeneratedReplies(
        settings,
        state.activeFeed,
        rootPost,
        targetReply,
        NESTED_REPLY_COUNT
      );
    } catch (_error) {
      replies = buildLocalReplies(
        settings,
        state.activeFeed,
        rootPost,
        targetReply,
        NESTED_REPLY_COUNT
      );
    }

    targetReply.children = replies;
    targetReply.loading = false;
    renderActiveFeed();
  } catch (_error) {
    targetReply.children = [];
    targetReply.loading = false;
    renderActiveFeed();
  }
}

async function generateDirectMessages() {
  const settings = { ...getCurrentSettings() };
  const profile = { ...getCurrentProfile() };
  messagesGenerateBtn.disabled = true;
  messagesStatusEl.textContent = "正在根据当前设定生成新的私信内容…";
  messagesStatusEl.className = "status-text";

  try {
    let messages;
    let sourceLabel = "API";

    try {
      messages = await requestGeneratedDirectMessages(settings, profile, 4);
    } catch (error) {
      sourceLabel = "本地回退";
      messages = buildLocalDirectMessages(settings, profile, 4);
      messagesStatusEl.textContent = `${error.message || "请求失败"} 已自动使用本地模板生成私信。`;
      messagesStatusEl.classList.add("error");
    }

    state.directMessages = messages;
    persistDirectMessages(state.directMessages);
    renderMessagesPage();
    if (sourceLabel === "API") {
      messagesStatusEl.textContent = "已使用 API 生成新的私信内容。";
      messagesStatusEl.classList.add("success");
    }
  } finally {
    messagesGenerateBtn.disabled = false;
  }
}

async function refreshHomeFeed(trigger = "manual") {
  if (state.isRefreshing) {
    return;
  }

  saveCurrentSettings();
  state.isRefreshing = true;
  setPullIndicator(state.pullDistance, "loading");
  setHomeStatus(`正在生成“${HOME_FEED_LABELS[state.activeFeed]}”讨论流…`, "");
  setSettingsStatus("如果接口可用，将优先使用 API 返回的 10 条讨论。");
  topRefreshBtn.disabled = true;
  settingsGenerateBtn.disabled = true;

  const settings = { ...state.settings };

  try {
    let posts;
    let sourceLabel = "API";

    try {
      posts = await requestGeneratedPosts(settings, state.activeFeed);
    } catch (error) {
      sourceLabel = "本地回退";
      posts = buildLocalPosts(settings, DEFAULT_POST_COUNT, state.activeFeed);
      setSettingsStatus(
        `${error.message || "请求失败"} 已自动使用本地模板生成内容。`,
        "error"
      );
    }

    state.feeds[state.activeFeed] = posts.map((item, index) => normalizePost(item, index));
    state.discussions[state.activeFeed] = {};
    persistFeeds(state.feeds);
    state.lastRefreshAt = `${formatDateTime()} · ${sourceLabel}`;
    localStorage.setItem(REFRESH_KEY, state.lastRefreshAt);
    renderActiveFeed();
    renderProfilePage();
    updateInsightPanel();
    setHomeStatus(
      `已通过${sourceLabel}刷新“${HOME_FEED_LABELS[state.activeFeed]}”${DEFAULT_POST_COUNT} 条讨论 · 来源 ${trigger}`,
      "success"
    );
    if (sourceLabel === "API") {
      setSettingsStatus(
        `配置已保存，当前分页签“${HOME_FEED_LABELS[state.activeFeed]}”已使用 API 重新生成 10 条讨论。`,
        "success"
      );
    }
    switchTab("home");
  } finally {
    state.isRefreshing = false;
    state.pullDistance = 0;
    setPullIndicator(0, "idle");
    topRefreshBtn.disabled = false;
    settingsGenerateBtn.disabled = false;
  }
}

function releasePull() {
  const shouldRefresh = state.pullDistance >= PULL_THRESHOLD && !state.isRefreshing;
  state.pullDistance = 0;
  setPullIndicator(0, "idle");
  if (shouldRefresh) {
    refreshHomeFeed("pull");
  }
}

function handleTouchStart(event) {
  if (state.activeTab !== "home" || homeScrollEl.scrollTop > 0 || state.isRefreshing) {
    return;
  }
  state.touchTracking = true;
  state.touchStartY = event.touches[0].clientY;
}

function handleTouchMove(event) {
  if (!state.touchTracking || state.activeTab !== "home" || state.isRefreshing) {
    return;
  }

  const delta = event.touches[0].clientY - state.touchStartY;
  if (delta <= 0 || homeScrollEl.scrollTop > 0) {
    return;
  }

  state.pullDistance = Math.min(delta * 0.45, 130);
  event.preventDefault();
  setPullIndicator(
    state.pullDistance,
    state.pullDistance >= PULL_THRESHOLD ? "ready" : "idle"
  );
}

function handleTouchEnd() {
  if (!state.touchTracking) {
    return;
  }
  state.touchTracking = false;
  releasePull();
}

function handleWheel(event) {
  if (
    state.activeTab !== "home" ||
    state.isRefreshing ||
    homeScrollEl.scrollTop > 0 ||
    event.deltaY >= 0
  ) {
    return;
  }

  event.preventDefault();
  state.pullDistance = Math.min(
    130,
    state.pullDistance + Math.abs(event.deltaY) * 0.15
  );
  setPullIndicator(
    state.pullDistance,
    state.pullDistance >= PULL_THRESHOLD ? "ready" : "idle"
  );

  window.clearTimeout(state.wheelReleaseTimer);
  state.wheelReleaseTimer = window.setTimeout(() => {
    releasePull();
  }, 140);
}

function attachEvents() {
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      switchTab(item.dataset.tab);
    });
  });

  jumpLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      switchTab(link.dataset.jumpTab);
    });
  });

  [topRefreshBtn].filter(Boolean).forEach((button) => {
    button.addEventListener("click", () => {
      refreshHomeFeed("button");
    });
  });

  messagesGenerateBtn.addEventListener("click", () => {
    generateDirectMessages();
  });

  settingsGenerateBtn.addEventListener("click", () => {
    saveCurrentSettings();
    refreshHomeFeed("settings");
  });

  settingsForm.addEventListener("submit", (event) => {
    event.preventDefault();
    saveCurrentSettings();
    setSettingsStatus("配置已保存到本地浏览器存储。", "success");
  });

  profileForm.addEventListener("submit", (event) => {
    event.preventDefault();
    saveCurrentProfile();
    setProfileEditorOpen(false);
    setProfileStatus("个人资料已保存到本地浏览器存储。", "success");
  });

  profileEditToggleBtn.addEventListener("click", () => {
    setProfileEditorOpen(!state.profileEditorOpen);
  });

  profileEditorCloseBtn.addEventListener("click", () => {
    setProfileEditorOpen(false);
  });

  profileCancelBtn.addEventListener("click", () => {
    applyProfileToForm(state.profile);
    setProfileEditorOpen(false);
  });

  miniTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      state.activeFeed = tab.dataset.feed;
      renderActiveFeed();
      updatePromptPreview();
      updateMessagePromptPreview();
      updateInsightPanel();
      setHomeStatus(`当前查看：${HOME_FEED_LABELS[state.activeFeed]}`, "");
    });
  });

  feedEl.addEventListener("click", async (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }

    const actionEl = target.closest("[data-action]");
    if (!(actionEl instanceof HTMLElement)) {
      return;
    }

    const action = actionEl.dataset.action;
    if (!action) {
      return;
    }

    if (action === "toggle-post" && actionEl.dataset.postId) {
      await togglePostDiscussion(actionEl.dataset.postId);
    }

    if (
      action === "toggle-reply" &&
      actionEl.dataset.postId &&
      actionEl.dataset.replyId
    ) {
      await toggleNestedReply(actionEl.dataset.postId, actionEl.dataset.replyId);
    }
  });

  [modeSelect, endpointInput, tokenInput, modelInput, worldviewInput, hotTopicsInput, entertainmentTextInput, extraInstructionsInput].forEach(
    (field) => {
      field.addEventListener("input", () => {
        updateModeUI();
        updatePromptPreview();
        updateMessagePromptPreview();
        updateInsightPanel();
      });

      field.addEventListener("change", () => {
        saveCurrentSettings();
      });
    }
  );

  [profileAvatarInput, profileUsernameInput, profileFollowingInput, profileFollowersInput, profileSignatureInput, profilePersonaInput].forEach(
    (field) => {
      field.addEventListener("input", () => {
        state.profile = getCurrentProfile();
        renderProfilePage();
        updateMessagePromptPreview();
      });

      field.addEventListener("change", () => {
        saveCurrentProfile();
      });
    }
  );

  homeScrollEl.addEventListener("touchstart", handleTouchStart, { passive: true });
  homeScrollEl.addEventListener("touchmove", handleTouchMove, { passive: false });
  homeScrollEl.addEventListener("touchend", handleTouchEnd);
  homeScrollEl.addEventListener("wheel", handleWheel, { passive: false });
}

function init() {
  applySettingsToForm(state.settings);
  applyProfileToForm(state.profile);
  setProfileEditorOpen(false);
  renderActiveFeed();
  renderFollowingPage();
  renderMessagesPage();
  renderProfilePage();
  updatePromptPreview();
  updateMessagePromptPreview();
  updateInsightPanel();
  setHomeStatus(
    state.lastRefreshAt ? `已载入上次生成内容 · ${state.lastRefreshAt}` : "等待下一次刷新",
    state.lastRefreshAt ? "success" : ""
  );
  setSettingsStatus("设置页会自动保存 API、世界观文本、热点文本和文娱文本。");
  switchTab("home");
  attachEvents();
}

init();
