import colorThemes from '../../colorThemes.js';
import { colorStyleKey } from '../../storageKeys.js';
import updateLogs from './setupEditors.js';

// Set Display CSS Styles
let selectedColorStyle = localStorage.getItem(colorStyleKey);
if (selectedColorStyle === null) selectedColorStyle = 'default';
const root = document.documentElement;
root.style.setProperty('--main-bg', colorThemes[selectedColorStyle].background);



// Set event editors
function setup() {

  root.style.setProperty('--main-bg', colorThemes[selectedColorStyle].background);

  let currDate = new Date(); // Reset date to current date

  const monthInput = document.querySelector('input.month-input');
  monthInput.value = `${currDate.getFullYear()}-${(`0${currDate.getMonth() + 1}`).slice(-2)}`;

  monthInput.onchange = () => {
    const [year, month] = monthInput.value.split('-');
    currDate.setDate(1); // Set to first day of the month
    currDate.setMonth(month - 1); // -1 because input field marks January as 1
    currDate.setFullYear(year);

    updateLogs(currDate);
  };

  updateLogs(currDate);

  root.style.setProperty('--light-bg', "#f9f9f9")
  document.body.getElementsByTagName('main')[0].style.display = "block";
  document.querySelector('.header_content').style.display = "block";
}


let firstTime = false;
while (!firstTime) {
  if(document.getElementById("log-container") != null) {
    setup();
    firstTime = true;
  
  }
}
let oldbodyid = document.body.id;
const callback = function (mutations) {
  mutations.forEach(function (mutation) {
    if (document.body.id == 'monthly-log-body'&&oldbodyid != 'monthly-log-body') {
      oldbodyid = document.body.id;
      setup();
    }
    oldbodyid = document.body.id;
  });  
};
const observer = new MutationObserver(callback);
const config = { attributes: true };
observer.observe(document.body, config);