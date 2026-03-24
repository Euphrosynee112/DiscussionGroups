const form = document.querySelector("#generate-form");
const modeSelect = document.querySelector("#api-mode");
const endpointInput = document.querySelector("#api-endpoint");
const tokenInput = document.querySelector("#api-token");
const modelInput = document.querySelector("#api-model");
const modelWrap = document.querySelector("#model-wrap");
const promptInput = document.querySelector("#api-prompt");
const statusEl = document.querySelector("#status");
const feedEl = document.querySelector("#feed");
const generateBtn = document.querySelector("#generate-btn");
const pageTitleEl = document.querySelector("#page-title");
const navItems = document.querySelectorAll(".nav-item[data-tab]");
const homePageEl = document.querySelector("#home-page");
const settingsPageEl = document.querySelector("#settings-page");
const DEFAULT_OPENAI_ENDPOINT = "https://api.openai.com/v1/chat/completions";
const SETTINGS_KEY = "x_demo_settings_v1";

function switchTab(tabName) {
  const isHome = tabName === "home";
  homePageEl.classList.toggle("hidden", !isHome);
  settingsPageEl.classList.toggle("hidden", isHome);
  pageTitleEl.textContent = isHome ? "首页" : "设置";
  navItems.forEach((item) => {
    item.classList.toggle("active", item.dataset.tab === tabName);
  });
}

function setStatus(message, isError = false) {
  statusEl.textContent = message;
  statusEl.style.color = isError ? "#f66" : "#71767b";
}

function escapeHtml(unsafe) {
  return unsafe
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatNow() {
  return new Date().toLocaleTimeString("zh-CN", {
    hour: "2-digit",
    minute: "2-digit"
  });
}

function resolveMessage(payload) {
  if (!payload || typeof payload !== "object") {
    return "";
  }

  const openAIContent = payload?.choices?.[0]?.message?.content;
  if (typeof openAIContent === "string" && openAIContent.trim()) {
    return openAIContent.trim();
  }

  return (
    payload.message ||
    payload.text ||
    payload.content ||
    payload?.data?.message ||
    ""
  );
}

function appendPost(content) {
  const emptyFeedEl = document.querySelector("#empty-feed");
  if (emptyFeedEl) {
    emptyFeedEl.remove();
  }

  const safeContent = escapeHtml(content);
  const article = document.createElement("article");
  article.className = "post";
  article.innerHTML = `
    <div class="avatar">G</div>
    <div class="post-body">
      <div class="post-meta">
        <strong>Generated Bot</strong>
        <span>@api-bot · ${formatNow()}</span>
      </div>
      <p>${safeContent}</p>
      <div class="post-actions">
        <span>💬 0</span>
        <span>🔁 0</span>
        <span>❤️ 0</span>
        <span>📊 0</span>
      </div>
    </div>
  `;
  feedEl.prepend(article);
}

function applyModeUI() {
  const isOpenAI = modeSelect.value === "openai";
  modelWrap.classList.toggle("hidden", !isOpenAI);
  if (isOpenAI && !endpointInput.value.trim()) {
    endpointInput.value = DEFAULT_OPENAI_ENDPOINT;
  }
}

function saveSettings() {
  const payload = {
    mode: modeSelect.value,
    endpoint: endpointInput.value.trim(),
    token: tokenInput.value.trim(),
    model: modelInput.value.trim()
  };
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(payload));
}

function loadSettings() {
  const raw = localStorage.getItem(SETTINGS_KEY);
  if (!raw) {
    endpointInput.value = DEFAULT_OPENAI_ENDPOINT;
    modelInput.value = "gpt-4.1-mini";
    applyModeUI();
    return;
  }

  try {
    const saved = JSON.parse(raw);
    modeSelect.value = saved.mode || "openai";
    endpointInput.value = saved.endpoint || DEFAULT_OPENAI_ENDPOINT;
    tokenInput.value = saved.token || "";
    modelInput.value = saved.model || "gpt-4.1-mini";
  } catch (_error) {
    modeSelect.value = "openai";
    endpointInput.value = DEFAULT_OPENAI_ENDPOINT;
    modelInput.value = "gpt-4.1-mini";
  }
  applyModeUI();
}

function buildRequestBody(mode, prompt, model) {
  if (mode === "openai") {
    return {
      model: model || "gpt-4.1-mini",
      messages: [{ role: "user", content: prompt }]
    };
  }
  return { prompt };
}

navItems.forEach((item) => {
  item.addEventListener("click", (event) => {
    event.preventDefault();
    switchTab(item.dataset.tab);
  });
});

modeSelect.addEventListener("change", () => {
  applyModeUI();
  saveSettings();
});

endpointInput.addEventListener("change", saveSettings);
tokenInput.addEventListener("change", saveSettings);
modelInput.addEventListener("change", saveSettings);

loadSettings();

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const mode = modeSelect.value;
  const endpoint = endpointInput.value.trim();
  const prompt = promptInput.value.trim();
  const token = tokenInput.value.trim();
  const model = modelInput.value.trim();

  if (!endpoint || !prompt) {
    setStatus("请填写 API 地址和提示词。", true);
    return;
  }
  if (mode === "openai" && !model) {
    setStatus("OpenAI 模式下请填写模型名。", true);
    return;
  }

  generateBtn.disabled = true;
  setStatus("正在请求 API 生成消息...");
  saveSettings();

  try {
    const headers = {
      "Content-Type": "application/json"
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify(buildRequestBody(mode, prompt, model))
    });

    if (!response.ok) {
      throw new Error(`接口请求失败：HTTP ${response.status}`);
    }

    const data = await response.json();
    const message = resolveMessage(data);

    if (!message) {
      throw new Error("接口返回成功，但未找到可展示的消息字段。");
    }

    appendPost(message);
    promptInput.value = "";
    setStatus("生成成功，已添加到消息流。");
    switchTab("home");
  } catch (error) {
    setStatus(error.message || "请求失败，请检查 API。", true);
  } finally {
    generateBtn.disabled = false;
  }
});
