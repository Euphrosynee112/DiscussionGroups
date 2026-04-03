(function initPulseMessageBanner() {
  if (window.PulseMessageNotifications) {
    return;
  }

  function isBackgroundMode() {
    try {
      return new URLSearchParams(window.location.search).get("background") === "1";
    } catch (_error) {
      return false;
    }
  }

  function normalizeBackgroundEntry(entry = {}) {
    const preview = String(entry.preview || "").trim();
    const name = String(entry.name || "新消息").trim() || "新消息";
    return {
      id:
        String(entry.id || "").trim() ||
        `msg_notice_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      createdAt: Number(entry.createdAt) || Date.now(),
      name,
      preview: preview || "收到一条新消息",
      avatarImage: String(entry.avatarImage || "").trim(),
      avatarText: String(entry.avatarText || "").trim() || name.slice(0, 2) || "新",
      conversationId: String(entry.conversationId || "").trim()
    };
  }

  if (isBackgroundMode()) {
    window.PulseMessageNotifications = {
      push(entry = {}) {
        const normalized = normalizeBackgroundEntry(entry);
        try {
          window.parent?.postMessage(
            {
              type: "pulse-generator-message-notification",
              payload: normalized
            },
            "*"
          );
        } catch (_error) {
        }
        return normalized;
      },
      readQueue() {
        return [];
      }
    };
    return;
  }

  const STORAGE_KEY = "x_style_generator_message_notification_queue_v1";
  const SESSION_SEEN_KEY = "x_style_generator_message_notification_seen_v1";
  const MAX_QUEUE_LENGTH = 20;
  const MAX_AGE_MS = 10 * 60 * 1000;
  const DISPLAY_MS = 3600;
  const memoryStorage = {};
  let rootEl = null;
  let bannerEl = null;
  let hideTimer = null;
  let activeId = "";

  function safeGetItem(key) {
    try {
      const value = window.localStorage.getItem(key);
      if (value === null) {
        delete memoryStorage[key];
        return null;
      }
      memoryStorage[key] = value;
      return value;
    } catch (_error) {
      return Object.prototype.hasOwnProperty.call(memoryStorage, key) ? memoryStorage[key] : null;
    }
  }

  function safeSetItem(key, value) {
    memoryStorage[key] = value;
    try {
      window.localStorage.setItem(key, value);
      return true;
    } catch (_error) {
      return false;
    }
  }

  function safeGetSessionItem(key) {
    try {
      return window.sessionStorage.getItem(key);
    } catch (_error) {
      return null;
    }
  }

  function safeSetSessionItem(key, value) {
    try {
      window.sessionStorage.setItem(key, value);
    } catch (_error) {
    }
  }

  function ensureUi() {
    if (rootEl && bannerEl && document.body?.contains(rootEl)) {
      return;
    }
    if (!document.body) {
      return;
    }
    if (!document.querySelector("#pulse-message-banner-style")) {
      const style = document.createElement("style");
      style.id = "pulse-message-banner-style";
      style.textContent = `
        .pulse-message-banner-root {
          position: fixed;
          top: calc(env(safe-area-inset-top, 0px) + 8px);
          left: 50%;
          transform: translateX(-50%);
          width: min(calc(100vw - 24px), 420px);
          z-index: 9999;
          pointer-events: none;
        }
        .pulse-message-banner {
          display: grid;
          grid-template-columns: 38px minmax(0, 1fr);
          gap: 10px;
          align-items: center;
          padding: 10px 12px;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.96);
          box-shadow: 0 16px 40px rgba(15, 23, 42, 0.18);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          opacity: 0;
          transform: translateY(-8px) scale(0.98);
          transition: opacity 180ms ease, transform 180ms ease;
          pointer-events: auto;
        }
        .pulse-message-banner.is-visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        .pulse-message-banner[hidden] {
          display: none;
        }
        .pulse-message-banner__avatar {
          width: 38px;
          height: 38px;
          border-radius: 12px;
          overflow: hidden;
          display: grid;
          place-items: center;
          background: linear-gradient(180deg, #d6e7ff 0%, #9fbfff 100%);
          color: #ffffff;
          font-size: 13px;
          font-weight: 700;
        }
        .pulse-message-banner__avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .pulse-message-banner__body {
          min-width: 0;
          display: grid;
          gap: 2px;
        }
        .pulse-message-banner__name {
          color: #111111;
          font-size: 13px;
          font-weight: 700;
          line-height: 1.2;
        }
        .pulse-message-banner__preview {
          color: rgba(17, 17, 17, 0.62);
          font-size: 12px;
          line-height: 1.35;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      `;
      document.head?.appendChild(style);
    }

    rootEl = document.createElement("div");
    rootEl.className = "pulse-message-banner-root";
    bannerEl = document.createElement("button");
    bannerEl.type = "button";
    bannerEl.className = "pulse-message-banner";
    bannerEl.hidden = true;
    bannerEl.innerHTML = `
      <div class="pulse-message-banner__avatar" data-role="avatar">新</div>
      <div class="pulse-message-banner__body">
        <strong class="pulse-message-banner__name" data-role="name"></strong>
        <span class="pulse-message-banner__preview" data-role="preview"></span>
      </div>
    `;
    bannerEl.addEventListener("click", () => {
      hideBanner();
    });
    rootEl.appendChild(bannerEl);
    document.body.appendChild(rootEl);
  }

  function readQueue() {
    const raw = safeGetItem(STORAGE_KEY);
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

  function writeQueue(entries = []) {
    safeSetItem(STORAGE_KEY, JSON.stringify(entries.slice(0, MAX_QUEUE_LENGTH)));
  }

  function normalizeEntry(entry = {}) {
    const preview = String(entry.preview || "").trim();
    const name = String(entry.name || "新消息").trim() || "新消息";
    return {
      id:
        String(entry.id || "").trim() ||
        `msg_notice_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      createdAt: Number(entry.createdAt) || Date.now(),
      name,
      preview: preview || "收到一条新消息",
      avatarImage: String(entry.avatarImage || "").trim(),
      avatarText: String(entry.avatarText || "").trim() || name.slice(0, 2) || "新",
      conversationId: String(entry.conversationId || "").trim()
    };
  }

  function markSeen(entryId = "") {
    const normalizedId = String(entryId || "").trim();
    if (!normalizedId) {
      return;
    }
    safeSetSessionItem(SESSION_SEEN_KEY, normalizedId);
  }

  function getLastSeenId() {
    return String(safeGetSessionItem(SESSION_SEEN_KEY) || "").trim();
  }

  function truncatePreview(text, length = 52) {
    const resolved = String(text || "").trim().replace(/\s+/g, " ");
    if (resolved.length <= length) {
      return resolved;
    }
    return `${resolved.slice(0, Math.max(1, length - 1))}…`;
  }

  function hideBanner() {
    if (!bannerEl) {
      return;
    }
    if (hideTimer) {
      window.clearTimeout(hideTimer);
      hideTimer = null;
    }
    bannerEl.classList.remove("is-visible");
    window.setTimeout(() => {
      if (bannerEl && !bannerEl.classList.contains("is-visible")) {
        bannerEl.hidden = true;
      }
    }, 180);
  }

  function showBanner(entry) {
    ensureUi();
    if (!bannerEl) {
      return;
    }
    const normalized = normalizeEntry(entry);
    activeId = normalized.id;
    const avatarEl = bannerEl.querySelector("[data-role='avatar']");
    const nameEl = bannerEl.querySelector("[data-role='name']");
    const previewEl = bannerEl.querySelector("[data-role='preview']");
    if (avatarEl) {
      avatarEl.innerHTML = normalized.avatarImage
        ? `<img src="${normalized.avatarImage.replace(/"/g, "&quot;")}" alt="" />`
        : normalized.avatarText;
    }
    if (nameEl) {
      nameEl.textContent = normalized.name;
    }
    if (previewEl) {
      previewEl.textContent = truncatePreview(normalized.preview);
    }
    bannerEl.hidden = false;
    window.requestAnimationFrame(() => {
      bannerEl?.classList.add("is-visible");
    });
    if (hideTimer) {
      window.clearTimeout(hideTimer);
    }
    hideTimer = window.setTimeout(() => {
      if (activeId === normalized.id) {
        hideBanner();
      }
    }, DISPLAY_MS);
  }

  function maybeShowLatestUnseen(force = false) {
    if (document.hidden) {
      return;
    }
    const queue = readQueue()
      .map((entry) => normalizeEntry(entry))
      .filter((entry) => Date.now() - entry.createdAt <= MAX_AGE_MS)
      .sort((left, right) => left.createdAt - right.createdAt);
    const lastSeenId = getLastSeenId();
    const nextEntry = queue.find((entry) => force || entry.id !== lastSeenId);
    if (!nextEntry) {
      return;
    }
    markSeen(nextEntry.id);
    showBanner(nextEntry);
  }

  function push(entry = {}) {
    const normalized = normalizeEntry(entry);
    const nextQueue = readQueue()
      .filter((item) => String(item?.id || "").trim() !== normalized.id)
      .concat(normalized)
      .slice(-MAX_QUEUE_LENGTH);
    writeQueue(nextQueue);
    markSeen(normalized.id);
    showBanner(normalized);
    window.dispatchEvent(
      new CustomEvent("pulse-message-notification", {
        detail: normalized
      })
    );
    return normalized;
  }

  window.addEventListener("storage", (event) => {
    if (String(event?.key || "").trim() !== STORAGE_KEY) {
      return;
    }
    maybeShowLatestUnseen();
  });

  window.addEventListener("pulse-message-notification", (event) => {
    if (!event?.detail) {
      return;
    }
    showBanner(event.detail);
  });

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      maybeShowLatestUnseen();
    }
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      ensureUi();
      maybeShowLatestUnseen();
    });
  } else {
    ensureUi();
    maybeShowLatestUnseen();
  }

  window.PulseMessageNotifications = {
    push,
    readQueue
  };
})();
