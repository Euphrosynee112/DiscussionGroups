const apiLogListEl = document.querySelector("#api-log-list");
const apiLogStatusEl = document.querySelector("#api-log-status");
const apiLogSourceFilterEl = document.querySelector("#api-log-source-filter");
const apiLogStatusFilterEl = document.querySelector("#api-log-status-filter");
const apiLogRefreshBtnEl = document.querySelector("#api-log-refresh-btn");
const apiLogExportBtnEl = document.querySelector("#api-log-export-btn");
const apiLogClearBtnEl = document.querySelector("#api-log-clear-btn");
const apiLogCloseBtnEl = document.querySelector("#api-log-close-btn");

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isEmbeddedView() {
  try {
    const params = new URLSearchParams(window.location.search);
    return params.get("embed") === "1";
  } catch (_error) {
    return false;
  }
}

function requestEmbeddedClose() {
  if (!isEmbeddedView()) {
    return;
  }

  try {
    window.parent?.postMessage({ type: "pulse-generator-close-app" }, "*");
  } catch (_error) {
  }
}

function setApiLogStatus(message = "", tone = "") {
  if (!apiLogStatusEl) {
    return;
  }
  apiLogStatusEl.textContent = String(message || "").trim();
  apiLogStatusEl.className = "api-log-status";
  if (tone) {
    apiLogStatusEl.classList.add(tone);
  }
}

function getSourceLabel(source) {
  if (source === "discussion") {
    return "论坛";
  }
  if (source === "bubble") {
    return "Bubble";
  }
  if (source === "messages") {
    return "Message";
  }
  if (source === "raising") {
    return "养崽";
  }
  return source || "未知";
}

function getActionLabel(action) {
  const map = {
    generate_posts: "生成帖子",
    generate_replies: "生成回复",
    translate_post: "翻译帖子",
    translate_reply: "翻译回复",
    chat_reply: "聊天回复",
    fan_reply_generate: "粉丝回复生成",
    fan_reply_translate: "粉丝回复翻译",
    kid_archive_generate: "成长档案生成"
  };
  return map[action] || action || "请求";
}

function getFilteredEntries() {
  const entries = window.PulseApiLog?.read ? window.PulseApiLog.read() : [];
  const source = String(apiLogSourceFilterEl?.value || "").trim();
  const status = String(apiLogStatusFilterEl?.value || "").trim();

  return entries
    .slice()
    .reverse()
    .filter((entry) => {
      if (source && entry.source !== source) {
        return false;
      }
      if (status && entry.status !== status) {
        return false;
      }
      return true;
    });
}

function renderApiLogList() {
  if (!apiLogListEl) {
    return;
  }

  const entries = getFilteredEntries();
  if (!entries.length) {
    apiLogListEl.innerHTML =
      '<div class="api-log-empty">当前还没有匹配的 API 日志。<br />先在论坛、Bubble 或 Message 里触发一次 API 请求，再回来查看。</div>';
    return;
  }

  apiLogListEl.innerHTML = entries
    .map((entry) => {
      const timestamp = window.PulseApiLog?.formatTimestamp
        ? window.PulseApiLog.formatTimestamp(entry.createdAt)
        : String(entry.createdAt || "");
      const requestBodyText = JSON.stringify(entry.requestBody || {}, null, 2);
      const responseBodyText = JSON.stringify(entry.responseBody || {}, null, 2);
      const responseText = entry.responseText || "";
      const promptText = entry.prompt || "";
      const geminiFinishReason = entry.gemini_finish_reason || entry.geminiFinishReason || "";
      return `
        <article class="api-log-card">
          <div class="api-log-card__head">
            <div class="api-log-card__meta">
              <h2 class="api-log-card__title">${escapeHtml(getActionLabel(entry.action))}</h2>
              <span class="api-log-badge">${escapeHtml(getSourceLabel(entry.source))}</span>
              <span class="api-log-badge ${entry.status === "error" ? "error" : "success"}">${escapeHtml(
                entry.status === "error" ? "失败" : "成功"
              )}</span>
              ${entry.statusCode ? `<span class="api-log-badge">HTTP ${escapeHtml(entry.statusCode)}</span>` : ""}
            </div>
            <div class="api-log-keyvals">
              <span>时间：${escapeHtml(timestamp)}</span>
              <span>模式：${escapeHtml(entry.mode || "未记录")} ${entry.model ? `· 模型：${escapeHtml(entry.model)}` : ""}</span>
              <span>接口：${escapeHtml(entry.endpoint || "未记录")}</span>
              ${geminiFinishReason ? `<span>Gemini finish_reason：${escapeHtml(geminiFinishReason)}</span>` : ""}
            </div>
            ${
              entry.summary
                ? `<p class="api-log-card__summary">${escapeHtml(entry.summary)}</p>`
                : ""
            }
            ${
              entry.errorMessage
                ? `<p class="api-log-card__summary">错误：${escapeHtml(entry.errorMessage)}</p>`
                : ""
            }
          </div>
          <div class="api-log-card__body">
            <details class="api-log-details" open>
              <summary>Prompt</summary>
              <pre class="api-log-pre">${escapeHtml(promptText || "（未记录）")}</pre>
            </details>
            <details class="api-log-details">
              <summary>Request Body</summary>
              <pre class="api-log-pre">${escapeHtml(requestBodyText || "null")}</pre>
            </details>
            <details class="api-log-details">
              <summary>Response Text</summary>
              <pre class="api-log-pre">${escapeHtml(responseText || "（空）")}</pre>
            </details>
            <details class="api-log-details">
              <summary>Response Body</summary>
              <pre class="api-log-pre">${escapeHtml(responseBodyText || "null")}</pre>
            </details>
          </div>
        </article>
      `;
    })
    .join("");
}

function attachApiLogEvents() {
  apiLogSourceFilterEl?.addEventListener("change", () => {
    renderApiLogList();
  });

  apiLogStatusFilterEl?.addEventListener("change", () => {
    renderApiLogList();
  });

  apiLogRefreshBtnEl?.addEventListener("click", () => {
    renderApiLogList();
    setApiLogStatus("日志已刷新。", "success");
  });

  apiLogExportBtnEl?.addEventListener("click", () => {
    window.PulseApiLog?.exportLogs?.();
    setApiLogStatus("日志已导出为本地 JSON。", "success");
  });

  apiLogClearBtnEl?.addEventListener("click", () => {
    const confirmed = window.confirm("确定清空当前浏览器中的 API 日志吗？");
    if (!confirmed) {
      return;
    }
    window.PulseApiLog?.clear?.();
    renderApiLogList();
    setApiLogStatus("日志已清空。", "success");
  });

  apiLogCloseBtnEl?.addEventListener("click", () => {
    requestEmbeddedClose();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isEmbeddedView()) {
      requestEmbeddedClose();
    }
  });
}

function initApiLogViewer() {
  document.body.classList.toggle("embedded", isEmbeddedView());
  if (apiLogCloseBtnEl) {
    apiLogCloseBtnEl.hidden = !isEmbeddedView();
  }
  renderApiLogList();
  attachApiLogEvents();
}

initApiLogViewer();
