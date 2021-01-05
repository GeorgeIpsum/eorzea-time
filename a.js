const EORZEA_RATIO = 3600 / 175;
const GLOBAL = {
  utcTime: null,
  eorzeaTime: null
};

const update = () => {
  GLOBAL.utcTime = new Date().getTime();
  const E_TIMESTAMP = Math.floor(GLOBAL.utcTime * EORZEA_RATIO);
  GLOBAL.eorzeaTime = new Date();
  GLOBAL.eorzeaTime.setTime(E_TIMESTAMP);
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

function padLeft(val) {
  var str = "" + val;
  var pad = "00";
  return pad.substring(0, pad.length - str.length) + str;
}

window.setInterval(update, Math.floor((1000 * 60) / EORZEA_RATIO));
updateClock();
