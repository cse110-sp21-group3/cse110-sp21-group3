import colorThemes from '../../colorThemes.js';
import { colorStyleKey } from '../../storageKeys.js';
import updateLogs from './setupEditors.js';

// Set Display CSS Styles
let selectedColorStyle = localStorage.getItem(colorStyleKey);
if (selectedColorStyle === 'null') selectedColorStyle = 'default';

const root = document.documentElement;
root.style.setProperty('--main-bg', colorThemes[selectedColorStyle].background);

let currDate = new Date();

const monthInput = document.querySelector('input.month-input');
monthInput.valueAsDate = currDate;

monthInput.onchange = () => {
  currDate = monthInput.valueAsDate;

  // Because input field returns 0 for day which points to the previous month
  currDate.setDate(currDate.getDate() + 1);

  updateLogs(currDate);
};

// Set event editors
document.addEventListener('DOMContentLoaded', () => {
  currDate = new Date(); // Reset date to current date
  updateLogs(currDate);
});
