import colorThemes from '../../colorThemes.js';
import { colorStyleKey, getDailyLogUID } from '../../storageKeys.js';

let selectedColorStyle = localStorage.getItem(colorStyleKey);
if (selectedColorStyle === 'null') selectedColorStyle = 'default';

const calendarDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesdsay', 'Thursday', 'Friday', 'Saturday'];

// Set Display CSS Styles
const root = document.documentElement;
root.style.setProperty('--light-bg', colorThemes[selectedColorStyle].background);
root.style.setProperty('--main-bg', colorThemes[selectedColorStyle].main);

/**
 * Returns date in yyyy-mm-dd
 * @param {Date} date
 */
function getFormattedDate(date) {
  return `${date.getFullYear()}-${(`0${date.getMonth() + 1}`).slice(-2)}-${(`0${date.getDate()}`).slice(-2)}`;
}
function updateLogView(storageKey) {
  let bulletTree = { 0: [1], 1: ['No Logs Present', false, 'none', 'none', []] };

  const storedValue = localStorage.getItem(storageKey);
  if (storedValue !== null) bulletTree = JSON.parse(storedValue);

  const list = document.querySelector('bullet-list');
  list.initialiseList({
    saveDataCallback: (data) => {
      localStorage.setItem(storageKey, JSON.stringify(data));
    },
    nestLimit: 2,
    bulletTree,
    storageIndex: {
      value: 0,
      completed: 1,
      type: 2,
      modifier: 3,
      children: 4,
    },
    elementName: 'daily-log-bullet',
    bulletConfigs: {
      readOnly: true,
    },
  });
}

const dayInput = document.getElementById('date-input');

const logDate = new Date();
logDate.setDate(logDate.getDate() - 1); // Set to yesterday
dayInput.setAttribute('max', getFormattedDate(logDate)); // Restrict selecting future dates

dayInput.value = getFormattedDate(logDate);
const dayLabel = document.getElementById('date-input-label');
dayLabel.innerText = `${calendarDays[logDate.getDay()]}`;

document.addEventListener('DOMContentLoaded', () => {
  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1); // Set to yesterday

  const storageKey = getDailyLogUID(yesterdayDate);
  updateLogView(storageKey);
});

dayInput.onchange = () => {
  const [year, month, date] = dayInput.value.split('-');
  const currDate = new Date();
  currDate.setDate(date); // Set to first day of the month
  currDate.setMonth(month - 1); // -1 because input field marks January as 1
  currDate.setFullYear(year);
  dayLabel.innerText = calendarDays[currDate.getDay()];
  updateLogView(getDailyLogUID(currDate));
};
