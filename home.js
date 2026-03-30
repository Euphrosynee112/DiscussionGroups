const phoneDateEl = document.querySelector("#phone-date");
const phoneClockEl = document.querySelector("#phone-clock");
const statusTimeEl = document.querySelector("#status-time");

const weekdayLabels = [
  "星期日",
  "星期一",
  "星期二",
  "星期三",
  "星期四",
  "星期五",
  "星期六"
];

function formatTime(now) {
  return new Intl.DateTimeFormat("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  })
    .format(now)
    .replace(/^24:/, "00:");
}

function formatDate(now) {
  return `${now.getMonth() + 1}月${now.getDate()}日 ${weekdayLabels[now.getDay()]}`;
}

function updateLocalClock() {
  const now = new Date();
  const timeText = formatTime(now);
  const dateText = formatDate(now);

  if (phoneDateEl) {
    phoneDateEl.textContent = dateText;
  }
  if (phoneClockEl) {
    phoneClockEl.textContent = timeText;
  }
  if (statusTimeEl) {
    statusTimeEl.textContent = timeText;
  }
}

updateLocalClock();
setInterval(updateLocalClock, 1000);
