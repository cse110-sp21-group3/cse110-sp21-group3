import colorThemes from '../../colorThemes.js';
import { colorStyleKey } from '../../storageKeys.js';
import updateLogs from './setupEditors.js';

let selectedColorStyle = localStorage.getItem(colorStyleKey);
if (selectedColorStyle === null) selectedColorStyle = 'default';
let root = document.documentElement;
root.style.setProperty('--main-bg', colorThemes[selectedColorStyle].background);

setTimeout(() => {  setup()}, 30);
let oldbodyid = document.body.id;
const callback = function (mutations) {
  
  mutations.forEach(function (mutation) {
    if (document.body.id == 'monthly-log-body') {
      
      oldbodyid = document.body.id;
      console.log("monthly page script reload");
      setup();
    }
    oldbodyid = document.body.id;
});  
};
const observer = new MutationObserver(callback);
const config = { attributes: true };
observer.observe(document.body, config);

function setup() {
// Set Display CSS Styles
selectedColorStyle = localStorage.getItem(colorStyleKey);
if (selectedColorStyle === null) selectedColorStyle = 'default';
root = document.documentElement;
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

  currDate = new Date(); // Reset date to current date
  updateLogs(currDate);
}
