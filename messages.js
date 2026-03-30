const PROFILE_KEY = "x_style_generator_profile_v1";
const DIRECT_MESSAGES_KEY = "x_style_generator_direct_messages_v1";

const DEFAULT_PROFILE = {
  username: "Worldview Generator",
  userId: "@worldview_lab",
  signature: "长期主义、产品洞察、AI 讨论。",
  personaPrompt:
    "这个用户理性、克制、对产品与内容趋势敏感，说话直接但不失礼貌，偏爱长期主义和结构化表达。"
};

const messagesListEl = document.querySelector("#messages-list");
const messagesStatusEl = document.querySelector("#messages-status");
const messagesGenerateBtn = document.querySelector("#messages-generate-btn");

const memoryStorage = {};

const state = {
  profile: loadProfile(),
  conversations: loadDirectMessages(),
  activeConversationId: null,
  replyingConversationId: null
};

function isEmbeddedView() {
  try {
    const params = new URLSearchParams(window.location.search);
    return params.get("embed") === "1";
  } catch (_error) {
    return false;
  }
}

function safeGetItem(key) {
  try {
    return window.localStorage.getItem(key);
  } catch (_error) {
    return Object.prototype.hasOwnProperty.call(memoryStorage, key) ? memoryStorage[key] : null;
  }
}

function safeSetItem(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch (_error) {
    memoryStorage[key] = value;
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function truncate(text, length = 120) {
  const normalized = String(text || "").trim();
  if (normalized.length <= length) {
    return normalized;
  }
  return `${normalized.slice(0, length - 1)}…`;
}

function hashText(value) {
  const text = String(value || "");
  let hash = 0;
  for (let index = 0; index < text.length; index += 1) {
    hash = (hash * 31 + text.charCodeAt(index)) >>> 0;
  }
  return hash.toString(36);
}

function normalizeProfileUserId(userId, username) {
  const trimmed = String(userId || "").trim();
  if (!trimmed) {
    const slug = String(username || DEFAULT_PROFILE.username)
      .trim()
      .replace(/\s+/g, "_")
      .toLowerCase();
    return `@${slug || "worldview_lab"}`;
  }
  return trimmed.startsWith("@") ? trimmed : `@${trimmed}`;
}

function loadProfile() {
  const raw = safeGetItem(PROFILE_KEY);
  if (!raw) {
    return { ...DEFAULT_PROFILE };
  }

  try {
    return {
      ...DEFAULT_PROFILE,
      ...JSON.parse(raw)
    };
  } catch (_error) {
    return { ...DEFAULT_PROFILE };
  }
}

function createDefaultDirectMessages(profile = DEFAULT_PROFILE) {
  const username = profile.username || DEFAULT_PROFILE.username;
  const persona = truncate(profile.personaPrompt || DEFAULT_PROFILE.personaPrompt, 20);
  const contexts = [
    ["内容合作者", "@content_link", "内容协作"],
    ["同圈观察者", "@insider_note", "观点交换"],
    ["匿名情报员", "@quiet_signal", "线索递送"],
    ["品牌联络人", "@brand_touch", "合作邀请"]
  ];
  const openers = [
    `看到你最近的公开表达后，我觉得你很适合继续聊这条线。`,
    `你前面那种结构化判断很有辨识度，所以我想直接来私信你。`,
    `这件事如果继续展开，我第一反应就是要找${username}聊聊。`,
    `你的人设和语气挺适合这个话题，我想先在私下对一下想法。`
  ];

  return contexts.map(([sender, handle, context], index) => ({
    id: `dm_${index}_${hashText(`${sender}-${context}`)}`,
    sender,
    handle,
    context,
    time: `${index + 1}m`,
    text: `${openers[index % openers.length]} 你那种“${persona}”的风格，和这个方向很贴。`,
    messages: [
      {
        id: `msg_${index}_0`,
        role: "incoming",
        text: `${openers[index % openers.length]} 我想听听你对“${context}”下一步会怎么判断。`,
        time: `${index + 1}m`
      }
    ]
  }));
}

function loadDirectMessages() {
  const raw = safeGetItem(DIRECT_MESSAGES_KEY);
  if (!raw) {
    return createDefaultDirectMessages(loadProfile());
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length
      ? parsed
      : createDefaultDirectMessages(loadProfile());
  } catch (_error) {
    return createDefaultDirectMessages(loadProfile());
  }
}

function persistDirectMessages() {
  safeSetItem(DIRECT_MESSAGES_KEY, JSON.stringify(state.conversations));
}

function setMessagesStatus(message, tone = "") {
  if (!messagesStatusEl) {
    return;
  }
  messagesStatusEl.textContent = message;
  messagesStatusEl.className = "messages-status";
  if (tone) {
    messagesStatusEl.classList.add(tone);
  }
}

function getRelativeTime() {
  return "刚刚";
}

function buildLocalConversationReply(conversation, userMessage) {
  const profile = state.profile || DEFAULT_PROFILE;
  const username = profile.username || DEFAULT_PROFILE.username;
  const replies = [
    `收到。你这句其实已经把“${conversation.context}”的核心切出来了，我更想听你下一步怎么落。`,
    `我懂你的意思了。按${username}一贯的表达方式，这里最值得继续追的是判断依据本身。`,
    `这个角度挺对味的。你如果愿意，我建议顺着“${conversation.context}”再拆一层。`,
    `这句我记下了。你刚才那种推进方式，确实很像你公开发言里一贯的节奏。`
  ];
  const seed = Number.parseInt(hashText(`${conversation.id}-${userMessage}`).slice(0, 6), 36) || 0;
  return {
    id: `msg_${Date.now()}_${hashText(userMessage)}`,
    role: "incoming",
    text: replies[seed % replies.length],
    time: getRelativeTime()
  };
}

function renderMessagesPage() {
  if (!messagesListEl) {
    return;
  }

  if (!state.conversations.length) {
    state.activeConversationId = null;
    messagesListEl.innerHTML = '<p class="empty-state">还没有私信内容，点击“新建消息”生成新的会话。</p>';
    return;
  }

  const activeConversation = state.conversations.find(
    (item) => item.id === state.activeConversationId
  );

  if (!activeConversation) {
    messagesListEl.innerHTML = state.conversations
      .map(
        (item) => `
          <article class="conversation-card" data-action="open-conversation" data-conversation-id="${escapeHtml(
            item.id
          )}">
            <div class="conversation-card__head">
              <div>
                <strong>${escapeHtml(item.sender)}</strong>
                <div class="post-handle">${escapeHtml(item.handle || "@unknown")}</div>
              </div>
              <span class="post-time">${escapeHtml(item.time || "刚刚")}</span>
            </div>
            <p>${escapeHtml(item.text)}</p>
            <div class="reply-actions">
              <span>${escapeHtml(item.context || "私信互动")}</span>
              <span>${escapeHtml(String(item.messages?.length || 1))} 条消息</span>
            </div>
          </article>
        `
      )
      .join("");
    return;
  }

  messagesListEl.innerHTML = `
    <section class="chat-shell">
      <div class="chat-shell__head">
        <button class="ghost-chip" type="button" data-action="close-conversation">返回会话列表</button>
        <div>
          <strong>${escapeHtml(activeConversation.sender)}</strong>
          <div class="post-handle">${escapeHtml(activeConversation.handle || "@unknown")}</div>
        </div>
      </div>
      <p class="tag-stat-meta">${escapeHtml(activeConversation.context || "私信互动")}</p>
      <div class="chat-history">
        ${activeConversation.messages
          .map(
            (message) => `
              <article class="chat-bubble ${message.role === "user" ? "chat-bubble--user" : ""}">
                <p>${escapeHtml(message.text)}</p>
                <span class="post-time">${escapeHtml(message.time || "刚刚")}</span>
              </article>
            `
          )
          .join("")}
        ${
          state.replyingConversationId === activeConversation.id
            ? '<article class="chat-bubble"><p>正在生成回复…</p></article>'
            : ""
        }
      </div>
      <form class="chat-input-form" data-action="send-conversation-message" data-conversation-id="${escapeHtml(
        activeConversation.id
      )}">
        <textarea name="message" class="chat-textarea" rows="3" placeholder="输入你要回复的内容"></textarea>
        <div class="settings-actions">
          <button class="solid-button" type="submit" ${
            state.replyingConversationId === activeConversation.id ? "disabled" : ""
          }>
            发送消息
          </button>
        </div>
      </form>
    </section>
  `;

  const historyEl = messagesListEl.querySelector(".chat-history");
  if (historyEl) {
    historyEl.scrollTop = historyEl.scrollHeight;
  }
}

function regenerateConversations() {
  state.profile = loadProfile();
  state.conversations = createDefaultDirectMessages(state.profile);
  state.activeConversationId = null;
  state.replyingConversationId = null;
  persistDirectMessages();
  renderMessagesPage();
  setMessagesStatus("已刷新为一组新的本地私信会话。", "success");
}

function sendConversationMessage(conversationId, text) {
  const content = String(text || "").trim();
  if (!content) {
    setMessagesStatus("请输入消息内容后再发送。", "error");
    return;
  }

  const conversation = state.conversations.find((item) => item.id === conversationId);
  if (!conversation) {
    return;
  }

  const userMessage = {
    id: `msg_${Date.now()}_${hashText(content)}`,
    role: "user",
    text: truncate(content, 800),
    time: getRelativeTime()
  };

  conversation.messages = [...(conversation.messages || []), userMessage];
  conversation.text = userMessage.text;
  conversation.time = userMessage.time;
  state.activeConversationId = conversationId;
  state.replyingConversationId = conversationId;
  persistDirectMessages();
  renderMessagesPage();
  setMessagesStatus("已发送，正在生成本地回复。");

  window.setTimeout(() => {
    const reply = buildLocalConversationReply(conversation, userMessage.text);
    conversation.messages = [...conversation.messages, reply];
    conversation.text = reply.text;
    conversation.time = reply.time;
    state.replyingConversationId = null;
    persistDirectMessages();
    renderMessagesPage();
    setMessagesStatus("对方已回复。", "success");
  }, 320);
}

function attachEvents() {
  if (messagesGenerateBtn) {
    messagesGenerateBtn.addEventListener("click", () => {
      regenerateConversations();
    });
  }

  if (messagesListEl) {
    messagesListEl.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) {
        return;
      }
      const actionEl = target.closest("[data-action]");
      if (!(actionEl instanceof HTMLElement)) {
        return;
      }

      if (actionEl.dataset.action === "open-conversation" && actionEl.dataset.conversationId) {
        state.activeConversationId = actionEl.dataset.conversationId;
        renderMessagesPage();
        return;
      }

      if (actionEl.dataset.action === "close-conversation") {
        state.activeConversationId = null;
        renderMessagesPage();
      }
    });

    messagesListEl.addEventListener("submit", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLFormElement)) {
        return;
      }
      if (target.dataset.action !== "send-conversation-message") {
        return;
      }

      event.preventDefault();
      const formData = new FormData(target);
      const message = String(formData.get("message") || "");
      const conversationId = target.dataset.conversationId || "";
      target.reset();
      sendConversationMessage(conversationId, message);
    });
  }
}

function init() {
  if (document.body) {
    document.body.classList.toggle("embedded", isEmbeddedView());
  }
  renderMessagesPage();
  attachEvents();
}

init();
