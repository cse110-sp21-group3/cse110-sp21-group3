import colorThemes from '../../colorThemes.js';
import { colorStyleKey } from '../../storageKeys.js';

import { getDailyLogUID } from '../../storageKeys.js';

let selectedColorStyle = localStorage.getItem(colorStyleKey);
if (selectedColorStyle === 'null') selectedColorStyle = 'default';

// Set Display CSS Styles
const root = document.documentElement;
root.style.setProperty('--light-bg', colorThemes[selectedColorStyle].background);
root.style.setProperty('--main-bg', colorThemes[selectedColorStyle].main);

function updateLogView(storageKey){
    let bulletTree = { 0: [1], 1: ['No Logs Present', false, 'none', 'none', []] };

    const storedValue = localStorage.getItem(storageKey);
    if (storedValue !== null) bulletTree = JSON.parse(storedValue);

    const list = document.querySelector('bullet-list');
    list.initialiseList({
        saveDataCallback: (data) => {
            localStorage.setItem(storageKey, JSON.stringify(data));
        },
        nestLimit: 2,
        bulletTree: bulletTree,
        storageIndex: {
            value: 0,
            completed: 1,
            type: 2,
            modifier: 3,
            children: 4,
        },
        elementName: 'daily-log-bullet',
        bulletConfigs : {
            readOnly: true
        }
    });
}
document.addEventListener('DOMContentLoaded', () => {
    const currDate = new Date();
    const storageKey = getDailyLogUID(currDate);
    updateLogView(storageKey);
})

const dayInput = document.getElementById('date-input');
const currDate = new Date();
dayInput.value = `${currDate.getFullYear()}-${(`0${currDate.getMonth()+1}`).slice(-2)}-${(`0${currDate.getDate()}`).slice(-2)}`;

dayInput.onchange = () => {
    const [year, month, date] = dayInput.value.split('-');
    currDate.setDate(date); // Set to first day of the month
    currDate.setMonth(month-1); // -1 because input field marks January as 1
    currDate.setFullYear(year);

    console.log(currDate);

    updateLogView(getDailyLogUID(currDate));
};