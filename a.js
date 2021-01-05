const EORZEA_RATIO = 3600 / 175;
const DAY_IN_MS = 1000 * 60 * 60 * 24;
const GLOBAL = {
  utcTime: null,
  eorzeaTime: null
};

const update = () => {
  GLOBAL.utcTime = new Date().getTime();
  const E_TIMESTAMP = Math.floor(GLOBAL.utcTime * EORZEA_RATIO);
  GLOBAL.eorzeaTime = new Date();
  GLOBAL.eorzeaTime.setTime(E_TIMESTAMP);
  updateDocument();
  updateTimeUntil();
};

const updateDocument = () => {
  const date = new Date();
  date.setTime(GLOBAL.eorzeaTime);
  const eorzeaTimeEl = document.getElementById('eorzea-time');
  let hours = date.getUTCHours();
  const aMPMString = hours > 11 ? "PM" : "AM";
  if (hours > 12) {
    hours -= 12;
  }
  hours = padLeft(hours);
  const minutes = padLeft(date.getUTCMinutes());
  eorzeaTimeEl.innerHTML = `${ hours }:${ minutes } ${ aMPMString }`;
};

const getTimeElapsedSinceDayStart = (inputDate) => inputDate.getUTCMilliseconds() + (inputDate.getUTCSeconds() * 1000) + (inputDate.getUTCMinutes() * 60 * 1000) + (inputDate.getUTCHours() * 60 * 60 * 1000);

const updateTimeUntil = () => {
  const inputDate = document.getElementById("offset-timer").valueAsDate;
  const inputMs = getTimeElapsedSinceDayStart(inputDate);
  const ETMs = getTimeElapsedSinceDayStart(GLOBAL.eorzeaTime);
  let diff;
  if (ETMs > inputMs) {
    const timeLeftInDay = DAY_IN_MS - ETMs;
    diff = timeLeftInDay + inputMs;
  } else {
    diff = inputMs - ETMs;
  }
  diff /= 1000;
  // time left in seconds
  const EARTH_UNITS = Math.floor(diff / EORZEA_RATIO);
  const timeUntilEl = document.getElementById("time-until");
  timeUntilEl.innerHTML = `: ${Math.floor(EARTH_UNITS / 60)} Minutes`;
};

function padLeft(val) {
  var str = "" + val;
  var pad = "00";
  return pad.substring(0, pad.length - str.length) + str;
}

document.addEventListener("DOMContentLoaded", () => {
  window.setInterval(update, Math.floor((1000 * 60) / EORZEA_RATIO));
  update();
  const inputEl = document.getElementById("offset-timer");
  inputEl.addEventListener('input', updateTimeUntil);
});
