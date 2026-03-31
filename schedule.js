const PROFILE_KEY = "x_style_generator_profile_v1";
const MESSAGE_CONTACTS_KEY = "x_style_generator_message_contacts_v1";
const SCHEDULE_ENTRIES_KEY = "x_style_generator_schedule_entries_v1";

const DEFAULT_PROFILE = {
  username: "用户"
};

const scheduleBackBtnEl = document.querySelector("#schedule-back-btn");
const scheduleAddBtnEl = document.querySelector("#schedule-add-btn");
const scheduleStatusEl = document.querySelector("#schedule-status");
const scheduleViewSwitchEl = document.querySelector("#schedule-view-switch");
const schedulePrevBtnEl = document.querySelector("#schedule-prev-btn");
const scheduleTodayBtnEl = document.querySelector("#schedule-today-btn");
const scheduleNextBtnEl = document.querySelector("#schedule-next-btn");
const scheduleRangeLabelEl = document.querySelector("#schedule-range-label");
const scheduleRangeSubtitleEl = document.querySelector("#schedule-range-subtitle");
const scheduleContentEl = document.querySelector("#schedule-content");

const scheduleEditorModalEl = document.querySelector("#schedule-editor-modal");
const scheduleEditorTitleEl = document.querySelector("#schedule-editor-title");
const scheduleEditorCloseBtnEl = document.querySelector("#schedule-editor-close-btn");
const scheduleEditorFormEl = document.querySelector("#schedule-editor-form");
const scheduleTitleInputEl = document.querySelector("#schedule-title-input");
const scheduleTypeSelectEl = document.querySelector("#schedule-type-select");
const scheduleTypeHintEl = document.querySelector("#schedule-type-hint");
const scheduleOwnerTypeSelectEl = document.querySelector("#schedule-owner-type-select");
const scheduleOwnerContactFieldEl = document.querySelector("#schedule-owner-contact-field");
const scheduleOwnerContactSelectEl = document.querySelector("#schedule-owner-contact-select");
const scheduleVisibilityFieldEl = document.querySelector("#schedule-visibility-field");
const scheduleVisibleAllInputEl = document.querySelector("#schedule-visible-all-input");
const scheduleVisibleContactsEl = document.querySelector("#schedule-visible-contacts");
const scheduleDateInputEl = document.querySelector("#schedule-date-input");
const scheduleTimeGridEl = document.querySelector("#schedule-time-grid");
const scheduleStartTimeInputEl = document.querySelector("#schedule-start-time-input");
const scheduleEndTimeInputEl = document.querySelector("#schedule-end-time-input");
const scheduleEditorStatusEl = document.querySelector("#schedule-editor-status");
const scheduleEditorCancelBtnEl = document.querySelector("#schedule-editor-cancel-btn");
const scheduleDeleteBtnEl = document.querySelector("#schedule-delete-btn");

const memoryStorage = {};

const state = {
  profile: loadProfile(),
  contacts: loadContacts(),
  entries: loadScheduleEntries(),
  viewMode: "day",
  cursorDate: getTodayValue(),
  editorOpen: false,
  editorMode: "create",
  editingEntryId: "",
  draft: createDefaultDraft(getTodayValue())
};

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

function hashText(value) {
  const text = String(value || "");
  let hash = 0;
  for (let index = 0; index < text.length; index += 1) {
    hash = (hash * 31 + text.charCodeAt(index)) >>> 0;
  }
  return hash.toString(36);
}

function readStoredJson(key, fallback = null) {
  const raw = safeGetItem(key);
  if (!raw) {
    return fallback;
  }
  try {
    return JSON.parse(raw);
  } catch (_error) {
    return fallback;
  }
}

function isEmbeddedView() {
  try {
    return new URLSearchParams(window.location.search).get("embed") === "1";
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

function loadProfile() {
  const raw = readStoredJson(PROFILE_KEY, null);
  return raw && typeof raw === "object"
    ? { ...DEFAULT_PROFILE, ...raw }
    : { ...DEFAULT_PROFILE };
}

function normalizeContact(contact, index = 0) {
  const source = contact && typeof contact === "object" ? contact : {};
  const name = String(source.name || "").trim() || `角色 ${index + 1}`;
  return {
    id: String(source.id || `contact_${index}_${hashText(name)}`),
    name
  };
}

function loadContacts() {
  const raw = readStoredJson(MESSAGE_CONTACTS_KEY, []);
  return Array.isArray(raw) ? raw.map((contact, index) => normalizeContact(contact, index)) : [];
}

function normalizeScheduleEntry(entry, index = 0) {
  const source = entry && typeof entry === "object" ? entry : {};
  const scheduleType = ["day", "hour", "week"].includes(source.scheduleType)
    ? source.scheduleType
    : "day";
  const ownerType = source.ownerType === "contact" ? "contact" : "user";
  const date = /^\d{4}-\d{2}-\d{2}$/.test(String(source.date || "").trim())
    ? String(source.date).trim()
    : getTodayValue();
  const normalizeTimeValue = (value, fallback) => {
    const trimmed = String(value || "").trim();
    return /^\d{2}:\d{2}$/.test(trimmed) ? trimmed : fallback;
  };
  return {
    id: String(source.id || `schedule_${index}_${hashText(`${source.title || ""}-${date}`)}`),
    title: String(source.title || "").trim(),
    scheduleType,
    ownerType,
    ownerId: ownerType === "contact" ? String(source.ownerId || "").trim() : "",
    visibilityMode: source.visibilityMode === "selected" ? "selected" : "all",
    visibleContactIds: Array.isArray(source.visibleContactIds)
      ? [...new Set(source.visibleContactIds.map((item) => String(item || "").trim()).filter(Boolean))]
      : [],
    date,
    startTime: normalizeTimeValue(source.startTime, "09:00"),
    endTime: normalizeTimeValue(source.endTime, "10:00"),
    createdAt: Number(source.createdAt) || Date.now(),
    updatedAt: Number(source.updatedAt) || Date.now()
  };
}

function loadScheduleEntries() {
  const raw = readStoredJson(SCHEDULE_ENTRIES_KEY, []);
  return Array.isArray(raw)
    ? raw.map((entry, index) => normalizeScheduleEntry(entry, index)).filter((entry) => entry.title)
    : [];
}

function persistScheduleEntries() {
  safeSetItem(SCHEDULE_ENTRIES_KEY, JSON.stringify(state.entries));
}

function getTodayValue() {
  return formatDateValue(new Date());
}

function parseLocalDateValue(dateText) {
  const match = String(dateText || "").trim().match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) {
    return null;
  }
  const [, year, month, day] = match;
  return new Date(Number(year), Number(month) - 1, Number(day), 0, 0, 0, 0);
}

function parseLocalDateTimeValue(dateText, timeText = "00:00") {
  const date = parseLocalDateValue(dateText);
  const timeMatch = String(timeText || "").trim().match(/^(\d{2}):(\d{2})$/);
  if (!date || !timeMatch) {
    return null;
  }
  const [, hour, minute] = timeMatch;
  date.setHours(Number(hour), Number(minute), 0, 0);
  return date;
}

function formatDateValue(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function addDays(dateText, amount) {
  const date = parseLocalDateValue(dateText) || new Date();
  date.setDate(date.getDate() + amount);
  return formatDateValue(date);
}

function addMonths(dateText, amount) {
  const date = parseLocalDateValue(dateText) || new Date();
  date.setMonth(date.getMonth() + amount);
  return formatDateValue(date);
}

function getWeekStart(dateText) {
  const date = parseLocalDateValue(dateText) || new Date();
  const weekday = date.getDay();
  const offset = weekday === 0 ? -6 : 1 - weekday;
  date.setDate(date.getDate() + offset);
  return formatDateValue(date);
}

function getWeekDates(dateText) {
  const start = getWeekStart(dateText);
  return Array.from({ length: 7 }, (_, index) => addDays(start, index));
}

function formatWeekday(dateText, length = "short") {
  const date = parseLocalDateValue(dateText) || new Date();
  return new Intl.DateTimeFormat("zh-CN", { weekday: length }).format(date);
}

function formatFullDate(dateText) {
  const date = parseLocalDateValue(dateText) || new Date();
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long"
  }).format(date);
}

function formatMonthTitle(dateText) {
  const date = parseLocalDateValue(dateText) || new Date();
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long"
  }).format(date);
}

function formatShortDate(dateText) {
  const date = parseLocalDateValue(dateText) || new Date();
  return new Intl.DateTimeFormat("zh-CN", {
    month: "numeric",
    day: "numeric"
  }).format(date);
}

function getDateWeekday(dateText) {
  return (parseLocalDateValue(dateText) || new Date()).getDay();
}

function isSameDateValue(left, right) {
  return String(left || "") === String(right || "");
}

function clampViewMode(viewMode) {
  return ["day", "week", "month"].includes(viewMode) ? viewMode : "day";
}

function createDefaultDraft(dateText = getTodayValue(), overrides = {}) {
  return {
    title: "",
    scheduleType: "day",
    ownerType: "user",
    ownerId: "",
    visibilityMode: "all",
    visibleContactIds: [],
    date: dateText,
    startTime: "09:00",
    endTime: "10:00",
    ...overrides
  };
}

function setStatus(message = "", tone = "") {
  if (!scheduleStatusEl) {
    return;
  }
  scheduleStatusEl.textContent = message;
  scheduleStatusEl.className = `schedule-status${tone ? ` ${tone}` : ""}`;
}

function setEditorStatus(message = "", tone = "") {
  if (!scheduleEditorStatusEl) {
    return;
  }
  scheduleEditorStatusEl.textContent = message;
  scheduleEditorStatusEl.className = `schedule-editor-status${tone ? ` ${tone}` : ""}`;
}

function getContactName(contactId = "") {
  return state.contacts.find((contact) => contact.id === contactId)?.name || "角色";
}

function entryOccursOnDate(entry, dateText) {
  if (entry.scheduleType === "week") {
    return getDateWeekday(entry.date) === getDateWeekday(dateText);
  }
  return isSameDateValue(entry.date, dateText);
}

function getEntriesForDate(dateText) {
  return state.entries
    .filter((entry) => entryOccursOnDate(entry, dateText))
    .sort((left, right) => {
      const leftTime = left.scheduleType === "day" ? "00:00" : left.startTime;
      const rightTime = right.scheduleType === "day" ? "00:00" : right.startTime;
      return (
        leftTime.localeCompare(rightTime) ||
        (left.scheduleType === "day" ? -1 : 1) - (right.scheduleType === "day" ? -1 : 1) ||
        (right.updatedAt || 0) - (left.updatedAt || 0)
      );
    });
}

function getEntriesCountInDateList(dateList = []) {
  return dateList.reduce((total, dateText) => total + getEntriesForDate(dateText).length, 0);
}

function formatEntryTime(entry) {
  if (entry.scheduleType === "day") {
    return "全天";
  }
  if (entry.scheduleType === "week") {
    return `每周 ${formatWeekday(entry.date, "short")} ${entry.startTime}-${entry.endTime}`;
  }
  return `${entry.startTime}-${entry.endTime}`;
}

function padNumber(value) {
  return String(value).padStart(2, "0");
}

function getHourTimeText(hour) {
  return `${padNumber(hour)}:00`;
}

function getNextHourTimeText(hour) {
  return `${padNumber(Math.min(23, hour + 1))}:${hour >= 23 ? "59" : "00"}`;
}

function parseTimeHour(timeText = "") {
  const match = String(timeText || "").trim().match(/^(\d{2}):(\d{2})$/);
  return match ? Number(match[1]) : 0;
}

function getDayEntryBuckets(dateText) {
  const entries = getEntriesForDate(dateText);
  return {
    allDayEntries: entries.filter((entry) => entry.scheduleType === "day"),
    timedEntries: entries.filter((entry) => entry.scheduleType !== "day")
  };
}

function getVisibleTimelineHours(dateText) {
  const { timedEntries } = getDayEntryBuckets(dateText);
  let minHour = 8;
  let maxHour = 22;

  timedEntries.forEach((entry) => {
    minHour = Math.min(minHour, parseTimeHour(entry.startTime));
    maxHour = Math.max(maxHour, parseTimeHour(entry.endTime));
  });

  minHour = Math.max(0, minHour - 1);
  maxHour = Math.min(23, maxHour + 1);

  return Array.from({ length: maxHour - minHour + 1 }, (_, index) => minHour + index);
}

function getTimedEntriesForHour(dateText, hour) {
  return getDayEntryBuckets(dateText).timedEntries.filter((entry) => parseTimeHour(entry.startTime) === hour);
}

function getWeekTimelineHours() {
  return Array.from({ length: 24 }, (_, index) => index);
}

function formatVisibilityLabel(entry) {
  if (entry.ownerType !== "user") {
    return getContactName(entry.ownerId);
  }
  if (entry.visibilityMode === "all") {
    return "全部角色可见";
  }
  if (entry.visibleContactIds.length) {
    return `可见 ${entry.visibleContactIds.length} 位角色`;
  }
  return "仅自己";
}

function getOwnerChipClass(entry) {
  return entry.ownerType === "contact" ? "schedule-chip schedule-chip--contact" : "schedule-chip schedule-chip--user";
}

function renderEntryCard(entry) {
  const ownerLabel = entry.ownerType === "contact" ? getContactName(entry.ownerId) : (state.profile.username || DEFAULT_PROFILE.username);
  return `
    <button class="schedule-entry" type="button" data-action="edit-entry" data-entry-id="${escapeHtml(entry.id)}">
      <div class="schedule-entry__top">
        <span class="schedule-entry__title">${escapeHtml(entry.title)}</span>
        <span class="schedule-entry__time">${escapeHtml(formatEntryTime(entry))}</span>
      </div>
      <div class="schedule-entry__meta">
        <span class="${getOwnerChipClass(entry)}">${escapeHtml(entry.ownerType === "contact" ? "角色" : "用户")} · ${escapeHtml(ownerLabel)}</span>
        <span class="schedule-chip schedule-chip--visibility">${escapeHtml(formatVisibilityLabel(entry))}</span>
      </div>
    </button>
  `;
}

function renderMiniEntries(entries, maxCount = 2) {
  if (!entries.length) {
    return '<div class="schedule-month-cell__empty">点击添加</div>';
  }
  const visibleEntries = entries.slice(0, maxCount);
  const moreCount = entries.length - visibleEntries.length;
  return [
    ...visibleEntries.map(
      (entry) => `
        <div class="schedule-mini-entry">
          <strong>${escapeHtml(entry.title)}</strong>
          <span>${escapeHtml(formatEntryTime(entry))}</span>
        </div>
      `
    ),
    moreCount > 0 ? `<div class="schedule-mini-entry schedule-mini-entry--more">+${moreCount} 条更多</div>` : ""
  ].join("");
}

function renderDayView(dateText) {
  const { allDayEntries } = getDayEntryBuckets(dateText);
  const timelineHours = getVisibleTimelineHours(dateText);
  return `
    <section class="schedule-day-view">
      <section class="schedule-day-summary">
        <div class="schedule-day-summary__text">
          <span class="schedule-day-summary__kicker">${escapeHtml(formatFullDate(dateText))}</span>
          <strong class="schedule-day-summary__title">把当天安排挂进角色感知</strong>
          <span class="schedule-day-summary__hint">支持全天、按小时、每周重复三种新增方式</span>
        </div>
        <div class="schedule-day-actions">
          <button
            class="schedule-quick-btn"
            type="button"
            data-action="add-day"
            data-date="${escapeHtml(dateText)}"
          >
            新增全天
          </button>
          <button
            class="schedule-quick-btn schedule-quick-btn--accent"
            type="button"
            data-action="add-hour-slot"
            data-date="${escapeHtml(dateText)}"
            data-hour="09"
          >
            新增小时
          </button>
        </div>
      </section>

      ${
        allDayEntries.length
          ? `
              <section class="schedule-all-day">
                <div class="schedule-all-day__head">
                  <span>全天安排</span>
                  <button
                    class="schedule-all-day__add"
                    type="button"
                    data-action="add-day"
                    data-date="${escapeHtml(dateText)}"
                  >
                    + 新增
                  </button>
                </div>
                <div class="schedule-agenda">${allDayEntries.map((entry) => renderEntryCard(entry)).join("")}</div>
              </section>
            `
          : ""
      }

      <section class="schedule-timeline" aria-label="小时日程时间轴">
        ${timelineHours
          .map((hour) => {
            const entries = getTimedEntriesForHour(dateText, hour);
            return `
              <div class="schedule-time-row">
                <div class="schedule-time-row__label">${escapeHtml(getHourTimeText(hour))}</div>
                <div class="schedule-time-row__body${entries.length ? " has-entry" : ""}">
                  ${
                    entries.length
                      ? `
                          <div class="schedule-time-row__entries">
                            ${entries
                              .map(
                                (entry) => `
                                  <button
                                    class="schedule-time-entry"
                                    type="button"
                                    data-action="edit-entry"
                                    data-entry-id="${escapeHtml(entry.id)}"
                                  >
                                    <span class="schedule-time-entry__title">${escapeHtml(entry.title)}</span>
                                    <span class="schedule-time-entry__meta">${escapeHtml(
                                      formatEntryTime(entry)
                                    )} · ${escapeHtml(
                                      entry.ownerType === "contact"
                                        ? `角色 ${getContactName(entry.ownerId)}`
                                        : `用户 ${state.profile.username || DEFAULT_PROFILE.username}`
                                    )}</span>
                                  </button>
                                `
                              )
                              .join("")}
                          </div>
                        `
                      : `<button
                          class="schedule-time-row__slot"
                          type="button"
                          data-action="add-hour-slot"
                          data-date="${escapeHtml(dateText)}"
                          data-hour="${escapeHtml(padNumber(hour))}"
                        >
                          点击新增这一小时的安排
                        </button>`
                  }
                  <button
                    class="schedule-time-row__add"
                    type="button"
                    data-action="add-hour-slot"
                    data-date="${escapeHtml(dateText)}"
                    data-hour="${escapeHtml(padNumber(hour))}"
                    aria-label="新增 ${escapeHtml(getHourTimeText(hour))} 的小时日程"
                  >
                    +
                  </button>
                </div>
              </div>
            `;
          })
          .join("")}
      </section>
    </section>
  `;
}

function renderWeekView(dateText) {
  const weekDates = getWeekDates(dateText);
  const hours = getWeekTimelineHours();
  return `
    <section class="schedule-week-view">
      <div class="schedule-week-timeline">
        <div
          class="schedule-week-timeline__grid"
          style="grid-template-columns: 58px repeat(${weekDates.length}, minmax(96px, 1fr));"
        >
          <div class="schedule-week-timeline__corner"></div>
          ${weekDates
            .map((value) => {
              const date = parseLocalDateValue(value);
              const isToday = isSameDateValue(value, getTodayValue());
              return `
                <div class="schedule-week-timeline__head${isToday ? " is-today" : ""}">
                  <span class="schedule-week-timeline__weekday">${escapeHtml(formatWeekday(value, "short"))}</span>
                  <strong class="schedule-week-timeline__day">${escapeHtml(String(date?.getDate() || ""))}</strong>
                </div>
              `;
            })
            .join("")}

          <div class="schedule-week-timeline__time schedule-week-timeline__time--all-day">全天</div>
          ${weekDates
            .map((value) => {
              const allDayEntries = getDayEntryBuckets(value).allDayEntries;
              const isToday = isSameDateValue(value, getTodayValue());
              return `
                <div class="schedule-week-timeline__cell schedule-week-timeline__cell--all-day${isToday ? " is-today" : ""}">
                  ${
                    allDayEntries.length
                      ? allDayEntries
                          .map(
                            (entry) => `
                              <button
                                class="schedule-week-timeline__entry schedule-week-timeline__entry--all-day"
                                type="button"
                                data-action="edit-entry"
                                data-entry-id="${escapeHtml(entry.id)}"
                              >
                                ${escapeHtml(entry.title)}
                              </button>
                            `
                          )
                          .join("")
                      : `
                          <button
                            class="schedule-week-timeline__slot"
                            type="button"
                            data-action="add-day"
                            data-date="${escapeHtml(value)}"
                          >
                            +
                          </button>
                        `
                  }
                </div>
              `;
            })
            .join("")}

          ${hours
            .map(
              (hour) => `
                <div class="schedule-week-timeline__time">${escapeHtml(getHourTimeText(hour))}</div>
                ${weekDates
                  .map((value) => {
                    const entries = getTimedEntriesForHour(value, hour);
                    const isToday = isSameDateValue(value, getTodayValue());
                    return `
                      <div class="schedule-week-timeline__cell${isToday ? " is-today" : ""}">
                        ${
                          entries.length
                            ? entries
                                .map(
                                  (entry) => `
                                    <button
                                      class="schedule-week-timeline__entry"
                                      type="button"
                                      data-action="edit-entry"
                                      data-entry-id="${escapeHtml(entry.id)}"
                                    >
                                      <span class="schedule-week-timeline__entry-title">${escapeHtml(entry.title)}</span>
                                      <span class="schedule-week-timeline__entry-meta">${escapeHtml(
                                        `${entry.startTime}-${entry.endTime}`
                                      )}</span>
                                    </button>
                                  `
                                )
                                .join("")
                            : `
                                <button
                                  class="schedule-week-timeline__slot"
                                  type="button"
                                  data-action="add-hour-slot"
                                  data-date="${escapeHtml(value)}"
                                  data-hour="${escapeHtml(padNumber(hour))}"
                                  aria-label="新增 ${escapeHtml(
                                    `${formatShortDate(value)} ${getHourTimeText(hour)}`
                                  )} 的小时日程"
                                ></button>
                              `
                        }
                      </div>
                    `;
                  })
                  .join("")}
              `
            )
            .join("")}
        </div>
      </div>
    </section>
  `;
}

function buildMonthGridDates(dateText) {
  const baseDate = parseLocalDateValue(dateText) || new Date();
  const firstDay = new Date(baseDate.getFullYear(), baseDate.getMonth(), 1);
  const firstValue = formatDateValue(firstDay);
  const gridStart = getWeekStart(firstValue);
  return Array.from({ length: 42 }, (_, index) => addDays(gridStart, index));
}

function renderMonthView(dateText) {
  const baseDate = parseLocalDateValue(dateText) || new Date();
  const baseMonth = baseDate.getMonth();
  const cells = buildMonthGridDates(dateText)
    .map((value) => {
      const date = parseLocalDateValue(value) || new Date();
      const entries = getEntriesForDate(value);
      const isOutside = date.getMonth() !== baseMonth;
      const isToday = isSameDateValue(value, getTodayValue());
      const isSelected = isSameDateValue(value, state.cursorDate);
      return `
        <button
          class="schedule-month-cell${isOutside ? " is-outside" : ""}${isToday ? " is-today" : ""}${isSelected ? " is-selected" : ""}"
          type="button"
          data-action="add-day"
          data-date="${escapeHtml(value)}"
        >
          <div class="schedule-month-cell__top">
            <span class="schedule-month-cell__weekday">${escapeHtml(formatWeekday(value, "short"))}</span>
            <span class="schedule-month-cell__day">${escapeHtml(String(date.getDate()))}</span>
          </div>
          <div class="schedule-month-cell__items">${renderMiniEntries(entries, 2)}</div>
        </button>
      `;
    })
    .join("");
  return `<section class="schedule-month-view"><div class="schedule-month-grid">${cells}</div></section>`;
}

function renderViewSwitch() {
  scheduleViewSwitchEl?.querySelectorAll("[data-view]").forEach((button) => {
    button.classList.toggle("is-active", button.getAttribute("data-view") === state.viewMode);
  });
}

function renderRangeSummary() {
  if (state.viewMode === "day") {
    const entries = getEntriesForDate(state.cursorDate);
    if (scheduleRangeLabelEl) {
      scheduleRangeLabelEl.textContent = formatFullDate(state.cursorDate);
    }
    if (scheduleRangeSubtitleEl) {
      scheduleRangeSubtitleEl.textContent = entries.length
        ? `当天共有 ${entries.length} 条日程；时间轴可直接点选新增小时安排。`
        : "这一天还没有安排；可直接点选时间轴新增小时日程。";
    }
    return;
  }

  if (state.viewMode === "week") {
    const weekDates = getWeekDates(state.cursorDate);
    if (scheduleRangeLabelEl) {
      scheduleRangeLabelEl.textContent = `${formatShortDate(weekDates[0])} - ${formatShortDate(
        weekDates[6]
      )}`;
    }
    if (scheduleRangeSubtitleEl) {
      scheduleRangeSubtitleEl.textContent = `本周共 ${getEntriesCountInDateList(weekDates)} 条日程。`;
    }
    return;
  }

  const monthDates = buildMonthGridDates(state.cursorDate).filter((value) => {
    const date = parseLocalDateValue(value);
    const baseDate = parseLocalDateValue(state.cursorDate) || new Date();
    return date?.getMonth() === baseDate.getMonth();
  });
  if (scheduleRangeLabelEl) {
    scheduleRangeLabelEl.textContent = formatMonthTitle(state.cursorDate);
  }
  if (scheduleRangeSubtitleEl) {
    scheduleRangeSubtitleEl.textContent = `本月共 ${getEntriesCountInDateList(monthDates)} 条日程。`;
  }
}

function renderSchedulePage() {
  renderViewSwitch();
  renderRangeSummary();
  if (!scheduleContentEl) {
    return;
  }
  if (state.viewMode === "week") {
    scheduleContentEl.innerHTML = renderWeekView(state.cursorDate);
    return;
  }
  if (state.viewMode === "month") {
    scheduleContentEl.innerHTML = renderMonthView(state.cursorDate);
    return;
  }
  scheduleContentEl.innerHTML = renderDayView(state.cursorDate);
}

function setEditorOpen(isOpen, options = {}) {
  state.editorOpen = Boolean(isOpen);
  if (!scheduleEditorModalEl) {
    return;
  }
  scheduleEditorModalEl.hidden = !state.editorOpen;
  scheduleEditorModalEl.setAttribute("aria-hidden", String(!state.editorOpen));
  document.body.classList.toggle("schedule-modal-open", state.editorOpen);

  if (!state.editorOpen) {
    state.editorMode = "create";
    state.editingEntryId = "";
    state.draft = createDefaultDraft(state.cursorDate);
    setEditorStatus("");
    return;
  }

  if (options.entryId) {
    const entry = state.entries.find((item) => item.id === options.entryId);
    if (entry) {
      state.editorMode = "edit";
      state.editingEntryId = entry.id;
      state.draft = {
        title: entry.title,
        scheduleType: entry.scheduleType,
        ownerType: entry.ownerType,
        ownerId: entry.ownerId,
        visibilityMode: entry.visibilityMode,
        visibleContactIds: [...entry.visibleContactIds],
        date: entry.date,
        startTime: entry.startTime,
        endTime: entry.endTime
      };
    }
  } else {
    state.editorMode = "create";
    state.editingEntryId = "";
    state.draft = createDefaultDraft(options.date || state.cursorDate, {
      scheduleType: options.scheduleType || "day",
      startTime: options.startTime || "09:00",
      endTime: options.endTime || "10:00"
    });
  }

  renderEditor();
  window.setTimeout(() => {
    scheduleTitleInputEl?.focus();
  }, 0);
}

function renderOwnerContactOptions() {
  if (!scheduleOwnerContactSelectEl) {
    return;
  }
  if (!state.contacts.length) {
    scheduleOwnerContactSelectEl.innerHTML = '<option value="">暂无可选角色</option>';
    scheduleOwnerContactSelectEl.value = "";
    return;
  }
  scheduleOwnerContactSelectEl.innerHTML = [
    '<option value="">请选择角色</option>',
    ...state.contacts.map(
      (contact) => `<option value="${escapeHtml(contact.id)}">${escapeHtml(contact.name)}</option>`
    )
  ].join("");
  scheduleOwnerContactSelectEl.value = state.contacts.some((contact) => contact.id === state.draft.ownerId)
    ? state.draft.ownerId
    : "";
}

function renderVisibilityOptions() {
  if (!scheduleVisibleContactsEl) {
    return;
  }
  if (!state.contacts.length) {
    scheduleVisibleContactsEl.innerHTML = '<div class="schedule-visibility-empty">当前还没有角色。先去 Chat 的通讯录创建人物，再回来选择可见范围。</div>';
    scheduleVisibleContactsEl.classList.toggle("is-disabled", true);
    return;
  }
  scheduleVisibleContactsEl.classList.toggle("is-disabled", state.draft.visibilityMode === "all");
  scheduleVisibleContactsEl.innerHTML = state.contacts
    .map(
      (contact) => `
        <label class="schedule-visibility-option">
          <input
            type="checkbox"
            value="${escapeHtml(contact.id)}"
            data-role="visible-contact"
            ${state.draft.visibleContactIds.includes(contact.id) ? "checked" : ""}
            ${state.draft.visibilityMode === "all" ? "disabled" : ""}
          />
          <span>${escapeHtml(contact.name)}</span>
        </label>
      `
    )
    .join("");
}

function renderEditor() {
  if (scheduleEditorTitleEl) {
    scheduleEditorTitleEl.textContent = state.editorMode === "edit" ? "编辑日程" : "新增日程";
  }
  if (scheduleDeleteBtnEl) {
    scheduleDeleteBtnEl.hidden = state.editorMode !== "edit";
  }
  if (scheduleTitleInputEl) {
    scheduleTitleInputEl.value = state.draft.title || "";
  }
  if (scheduleTypeSelectEl) {
    scheduleTypeSelectEl.value = state.draft.scheduleType;
  }
  if (scheduleOwnerTypeSelectEl) {
    scheduleOwnerTypeSelectEl.value = state.draft.ownerType;
  }
  if (scheduleVisibleAllInputEl) {
    scheduleVisibleAllInputEl.checked = state.draft.visibilityMode === "all";
  }
  if (scheduleDateInputEl) {
    scheduleDateInputEl.value = state.draft.date;
  }
  if (scheduleStartTimeInputEl) {
    scheduleStartTimeInputEl.value = state.draft.startTime || "09:00";
  }
  if (scheduleEndTimeInputEl) {
    scheduleEndTimeInputEl.value = state.draft.endTime || "10:00";
  }

  renderOwnerContactOptions();
  renderVisibilityOptions();

  const showContactField = state.draft.ownerType === "contact";
  scheduleOwnerContactFieldEl?.toggleAttribute("hidden", !showContactField);
  scheduleVisibilityFieldEl?.toggleAttribute("hidden", showContactField);

  const showTimeGrid = state.draft.scheduleType !== "day";
  scheduleTimeGridEl?.toggleAttribute("hidden", !showTimeGrid);

  if (scheduleTypeHintEl) {
    scheduleTypeHintEl.textContent =
      state.draft.scheduleType === "week"
        ? `每周按 ${formatWeekday(state.draft.date, "long")} 重复一次。`
        : state.draft.scheduleType === "hour"
          ? "按具体起止时间记录这一天的安排。"
          : "按全天安排记录，不区分小时。";
  }
}

function collectEditorDraft() {
  const visibleContactIds = scheduleVisibleContactsEl
    ? [...scheduleVisibleContactsEl.querySelectorAll("input[data-role='visible-contact']:checked")]
        .map((input) => (input instanceof HTMLInputElement ? String(input.value || "").trim() : ""))
        .filter(Boolean)
    : [];
  return {
    title: String(scheduleTitleInputEl?.value || "").trim(),
    scheduleType: String(scheduleTypeSelectEl?.value || "day").trim(),
    ownerType: String(scheduleOwnerTypeSelectEl?.value || "user").trim(),
    ownerId: String(scheduleOwnerContactSelectEl?.value || "").trim(),
    visibilityMode: scheduleVisibleAllInputEl?.checked ? "all" : "selected",
    visibleContactIds,
    date: String(scheduleDateInputEl?.value || "").trim() || state.cursorDate,
    startTime: String(scheduleStartTimeInputEl?.value || "09:00").trim(),
    endTime: String(scheduleEndTimeInputEl?.value || "10:00").trim()
  };
}

function saveDraft(draft) {
  const base = {
    ...draft,
    id: state.editingEntryId || `schedule_${Date.now()}_${hashText(`${draft.title}-${draft.date}`)}`,
    createdAt:
      state.entries.find((entry) => entry.id === state.editingEntryId)?.createdAt || Date.now(),
    updatedAt: Date.now()
  };
  const normalized = normalizeScheduleEntry(base, state.entries.length);
  if (state.editorMode === "edit" && state.editingEntryId) {
    state.entries = state.entries.map((entry) => (entry.id === state.editingEntryId ? normalized : entry));
  } else {
    state.entries = [normalized, ...state.entries];
  }
  persistScheduleEntries();
  renderSchedulePage();
}

function handleEditorSubmit(event) {
  event.preventDefault();
  const draft = collectEditorDraft();

  if (!draft.title) {
    setEditorStatus("请输入日程标题。", "error");
    return;
  }
  if (!draft.date) {
    setEditorStatus("请选择日程日期。", "error");
    return;
  }
  if (draft.ownerType === "contact" && !draft.ownerId) {
    setEditorStatus("请选择一个角色。", "error");
    return;
  }
  if (draft.scheduleType !== "day") {
    const start = parseLocalDateTimeValue(draft.date, draft.startTime);
    const end = parseLocalDateTimeValue(draft.date, draft.endTime);
    if (!start || !end) {
      setEditorStatus("请填写完整的开始和结束时间。", "error");
      return;
    }
    if (end <= start) {
      setEditorStatus("结束时间需要晚于开始时间。", "error");
      return;
    }
  }

  const actionMode = state.editorMode;
  saveDraft(draft);
  setEditorOpen(false);
  setStatus(actionMode === "edit" ? "日程已更新。" : "日程已新增。", "success");
}

function handleDeleteEntry() {
  if (!state.editingEntryId) {
    return;
  }
  const target = state.entries.find((entry) => entry.id === state.editingEntryId);
  if (!target) {
    return;
  }
  const confirmed = window.confirm(`确定删除日程「${target.title}」吗？`);
  if (!confirmed) {
    return;
  }
  state.entries = state.entries.filter((entry) => entry.id !== state.editingEntryId);
  persistScheduleEntries();
  setEditorOpen(false);
  renderSchedulePage();
  setStatus("日程已删除。", "success");
}

function shiftCursor(step) {
  if (state.viewMode === "month") {
    state.cursorDate = addMonths(state.cursorDate, step);
  } else if (state.viewMode === "week") {
    state.cursorDate = addDays(state.cursorDate, step * 7);
  } else {
    state.cursorDate = addDays(state.cursorDate, step);
  }
  renderSchedulePage();
}

function attachEvents() {
  scheduleBackBtnEl?.addEventListener("click", () => {
    if (isEmbeddedView()) {
      requestEmbeddedClose();
      return;
    }
    window.location.href = "./index.html";
  });

  scheduleAddBtnEl?.addEventListener("click", () => {
    setEditorOpen(true, { date: state.cursorDate });
  });

  scheduleViewSwitchEl?.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) {
      return;
    }
    const button = target.closest("[data-view]");
    if (!(button instanceof HTMLElement)) {
      return;
    }
    state.viewMode = clampViewMode(button.dataset.view || "day");
    renderSchedulePage();
  });

  schedulePrevBtnEl?.addEventListener("click", () => {
    shiftCursor(-1);
  });

  scheduleNextBtnEl?.addEventListener("click", () => {
    shiftCursor(1);
  });

  scheduleTodayBtnEl?.addEventListener("click", () => {
    state.cursorDate = getTodayValue();
    renderSchedulePage();
  });

  scheduleContentEl?.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) {
      return;
    }
    const addDayEl = target.closest("[data-action='add-day']");
    if (addDayEl instanceof HTMLElement) {
      const date = String(addDayEl.dataset.date || state.cursorDate).trim() || state.cursorDate;
      state.cursorDate = date;
      setEditorOpen(true, { date, scheduleType: "day" });
      renderSchedulePage();
      return;
    }
    const addHourEl = target.closest("[data-action='add-hour-slot']");
    if (addHourEl instanceof HTMLElement) {
      const date = String(addHourEl.dataset.date || state.cursorDate).trim() || state.cursorDate;
      const hour = Number.parseInt(String(addHourEl.dataset.hour || "9").trim(), 10);
      const resolvedHour = Number.isFinite(hour) ? Math.min(23, Math.max(0, hour)) : 9;
      state.cursorDate = date;
      setEditorOpen(true, {
        date,
        scheduleType: "hour",
        startTime: getHourTimeText(resolvedHour),
        endTime: getNextHourTimeText(resolvedHour)
      });
      renderSchedulePage();
      return;
    }
    const editEntryEl = target.closest("[data-action='edit-entry']");
    if (editEntryEl instanceof HTMLElement) {
      const entryId = String(editEntryEl.dataset.entryId || "").trim();
      if (entryId) {
        setEditorOpen(true, { entryId });
      }
    }
  });

  scheduleEditorCloseBtnEl?.addEventListener("click", () => {
    setEditorOpen(false);
  });

  scheduleEditorCancelBtnEl?.addEventListener("click", () => {
    setEditorOpen(false);
  });

  scheduleEditorFormEl?.addEventListener("submit", handleEditorSubmit);

  scheduleDeleteBtnEl?.addEventListener("click", handleDeleteEntry);

  scheduleEditorModalEl?.addEventListener("click", (event) => {
    if (
      event.target === scheduleEditorModalEl ||
      event.target?.classList?.contains("schedule-modal__backdrop")
    ) {
      setEditorOpen(false);
    }
  });

  scheduleTypeSelectEl?.addEventListener("change", () => {
    state.draft = { ...state.draft, scheduleType: String(scheduleTypeSelectEl.value || "day").trim() };
    renderEditor();
    setEditorStatus("");
  });

  scheduleOwnerTypeSelectEl?.addEventListener("change", () => {
    const ownerType = String(scheduleOwnerTypeSelectEl.value || "user").trim();
    state.draft = {
      ...state.draft,
      ownerType,
      ownerId: ownerType === "contact" ? state.draft.ownerId : "",
      visibilityMode: ownerType === "user" ? state.draft.visibilityMode : "all"
    };
    renderEditor();
    setEditorStatus("");
  });

  scheduleOwnerContactSelectEl?.addEventListener("change", () => {
    state.draft = { ...state.draft, ownerId: String(scheduleOwnerContactSelectEl.value || "").trim() };
    setEditorStatus("");
  });

  scheduleVisibleAllInputEl?.addEventListener("change", () => {
    state.draft = {
      ...state.draft,
      visibilityMode: scheduleVisibleAllInputEl.checked ? "all" : "selected"
    };
    renderVisibilityOptions();
    setEditorStatus("");
  });

  scheduleVisibleContactsEl?.addEventListener("change", () => {
    state.draft = {
      ...state.draft,
      visibleContactIds: collectEditorDraft().visibleContactIds
    };
    setEditorStatus("");
  });

  scheduleDateInputEl?.addEventListener("change", () => {
    state.draft = { ...state.draft, date: String(scheduleDateInputEl.value || state.cursorDate).trim() };
    renderEditor();
    setEditorStatus("");
  });

  [scheduleTitleInputEl, scheduleStartTimeInputEl, scheduleEndTimeInputEl].forEach((input) => {
    input?.addEventListener("input", () => {
      setEditorStatus("");
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && state.editorOpen) {
      setEditorOpen(false);
      return;
    }
    if (event.key === "Escape" && isEmbeddedView()) {
      requestEmbeddedClose();
    }
  });
}

function init() {
  document.body.classList.toggle("embedded", isEmbeddedView());
  renderSchedulePage();
  attachEvents();
}

init();
