import colorThemes from '../../colorThemes.js';
import { colorStyleKey } from '../../storageKeys.js';
import updateLogs from './setupEditors.js';

// Set Display CSS Styles
let selectedColorStyle = localStorage.getItem(colorStyleKey);
if (selectedColorStyle === null) selectedColorStyle = 'default';
const root = document.documentElement;
root.style.setProperty('--main-bg', colorThemes[selectedColorStyle].background);

let currDate = new Date();

const monthInput = document.querySelector('input.month-input');
monthInput.value = `${currDate.getFullYear()}-${(`0${currDate.getMonth() + 1}`).slice(-2)}`;

monthInput.onchange = () => {
  const [year, month] = monthInput.value.split('-');
  currDate.setDate(1); // Set to first day of the month
  currDate.setMonth(month - 1); // -1 because input field marks January as 1
  currDate.setFullYear(year);

  updateLogs(currDate);
};

// Set event editors
document.addEventListener('DOMContentLoaded', () => {
  currDate = new Date(); // Reset date to current date
  updateLogs(currDate);
});
