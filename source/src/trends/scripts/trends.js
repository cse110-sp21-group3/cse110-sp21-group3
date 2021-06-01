import colorThemes from '../../colorThemes.js';
import { colorStyleKey, habitsKey } from '../../storageKeys.js';

let selectedColorStyle = localStorage.getItem(colorStyleKey);
if (selectedColorStyle === 'null') selectedColorStyle = 'default';

// Set Display CSS Styles
const root = document.documentElement;
root.style.setProperty('--light-bg', colorThemes[selectedColorStyle].background);
root.style.setProperty('--main-bg', colorThemes[selectedColorStyle].main);

/**
 * Get current month and number of days of the month
 */
const DATE = new Date();
const calendarDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
function getMonthName(date) {
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return monthNames[date.getMonth()];
}

function getMonthDays(date) {
  const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return days[date.getMonth()];
}

function getMonthDaysLeap(date) {
  const days = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return days[date.getMonth()];
}

function getFirstDay(date) {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  return firstDay.getDay();
}

const currYear = DATE.getFullYear();
let numDays;
if (currYear % 4 === 0) {
  numDays = getMonthDaysLeap(DATE);
} else {
  numDays = getMonthDays(DATE);
}

/**
 * Open and close a modal/form
 */
function openForm(form) {
  const f = form;
  f.style.display = 'block';
}

function closeForm(form) {
  const f = form;
  f.style.display = 'none';
  f.querySelector('#habit').value = '';
  f.querySelector('#colorpicker').value = '#0000ff';
  f.querySelector('#error').style.visibility = 'hidden';
}

function closeDeleteForm(form) {
  const f = form;
  f.style.display = 'none';
}

/**
 * Add new habit button
 */
const addForm = document.querySelector('#addForm');

const addClose = addForm.querySelector('#add-close-form');
addClose.addEventListener('click', () => {
  closeForm(addForm);
});

const add = document.getElementById('add');
add.addEventListener('click', () => {
  openForm(addForm);
});

const deleteForm = document.getElementById('delete-form');

const deleteClose = deleteForm.querySelector('#delete-close-form');
deleteClose.addEventListener('click', () => {
  closeForm(deleteForm);
});

const yesBtn = document.querySelector('#yes');

const noBtn = document.querySelector('#no');
noBtn.addEventListener('click', () => {
  closeDeleteForm(deleteForm);
});

/**
 * Delete habit
 */
function deleteHabit(tracker) {
  // provide warning of deletion
  openForm(deleteForm);

  yesBtn.addEventListener('click', () => {
    // remove from DOM
    const trackerBody = document.getElementById('tracker-body');
    trackerBody.removeChild(tracker);

    // remove from storage
    let habits = JSON.parse(localStorage.getItem(habitsKey));
    const habitKey = `${getMonthName(DATE)}${tracker.habit}`;
    habits = habits.filter(item => item !== habitKey);
    localStorage.removeItem(habitKey);

    closeDeleteForm(deleteForm);
  });
}

/**
 * Create habit tracker for particular habit and store color of habit
 */
function addHabit(habit, color) {
  const tracker = document.createElement('tracker-elem');
  tracker.habit = habit;
  tracker.color = color;
  // show delete button when hovering over element
  const deleteHabitBtn = tracker.shadowRoot.querySelector('.delete-tracker');
  const habitGrid = tracker.shadowRoot.querySelector('#habit-grid');
  for (let i = 0; i < 7; i += 1) {
    const day = document.createElement('p');
    day.innerText = calendarDays[i];
    day.style.width = '10%';
    day.style.margin = '0.5rem';
    habitGrid.appendChild(day);
  }
  const firstDay = getFirstDay(DATE);
  // create filler circles
  for (let i = 0; i < firstDay; i += 1) {
    const habitCircle = document.createElement('div');
    habitCircle.style.borderRadius = '100%';
    habitCircle.style.border = 'none';
    habitCircle.style.backgroundColor = 'white';
    habitCircle.style.width = '10%';
    habitCircle.style.paddingBottom = '1.5rem';
    habitCircle.style.margin = '0.5rem';
    habitGrid.appendChild(habitCircle);
  }
  for (let i = 0; i < numDays; i += 1) {
    const habitCircle = document.createElement('div');
    const id = `circle${i + 1}`;
    habitCircle.id = id;
    habitCircle.style.borderRadius = '100%';
    habitCircle.style.border = 'none';
    habitCircle.style.backgroundColor = '#dbdbdb';
    habitCircle.style.width = '10%';
    habitCircle.style.paddingBottom = '10%';
    habitCircle.style.margin = '0.5rem';
    habitGrid.appendChild(habitCircle);
  }
  const trackerBody = document.getElementById('tracker-body');
  trackerBody.appendChild(tracker);
  deleteHabitBtn.addEventListener('click', () => {
    deleteHabit(tracker);
  });
}

/*
** Submit Add Habit
*/
const submitAdd = addForm.querySelector('.submit #submitForm');
submitAdd.onclick = () => {
  const habit = addForm.querySelector('#habit').value;
  const color = addForm.querySelector('#colorpicker').value;

  if (habit !== '') {
    addHabit(habit, color);
    const habitArray = Array(numDays).fill(false);
    const habitStorage = {
      habit, color, days: [...habitArray],
    };
    const habitKey = `${getMonthName(DATE)}${habit}`;
    let habits = JSON.parse(localStorage.getItem(habitsKey));
    habits.push(habitKey);
    localStorage.setItem(habitsKey, JSON.stringify(habits));
    localStorage.setItem(habitKey, JSON.stringify(habitStorage));
    closeForm(addForm);
  } else {
    const error = document.getElementById('error');
    error.style.visibility = 'visible';
  }
};



/**
 * template testing
 */
document.addEventListener('DOMContentLoaded', () => {
  const headerTitle = document.getElementById('header-title');
  const title = `trends: ${getMonthName(DATE)}`;
  headerTitle.innerText = title;
  const trackerBody = document.getElementById('tracker-body');
  // pull from storage the habits of the particular month
  const habitKeys = JSON.parse(localStorage.getItem(habitsKey));
  habitKeys.forEach((k) => {
    // perhaps we should clear the storage after every new month?
    if (k.startsWith(`${getMonthName(DATE)}`)) {
      // create a tracker for each habit using tracker.js
      const habitEntry = JSON.parse(localStorage.getItem(k));
      const tracker = document.createElement('tracker-elem');
      tracker.habit = habitEntry.habit;
      tracker.color = habitEntry.color;
      const days = [...habitEntry.days];
      const habitGrid = tracker.shadowRoot.querySelector('#habit-grid');
      const deleteHabitBtn = tracker.shadowRoot.querySelector('.delete-tracker');
      for (let i = 0; i < 7; i += 1) {
        const day = document.createElement('p');
        day.innerText = calendarDays[i];
        day.style.width = '10%';
        day.style.margin = '0.5rem';
        habitGrid.appendChild(day);
      }
      const firstDay = getFirstDay(DATE);
      // create filler circles
      for (let i = 0; i < firstDay; i += 1) {
        const habitCircle = document.createElement('div');
        habitCircle.style.borderRadius = '100%';
        habitCircle.style.border = 'none';
        habitCircle.style.backgroundColor = 'white';
        habitCircle.style.width = '10%';
        habitCircle.style.paddingBottom = '1.5rem';
        habitCircle.style.margin = '0.5rem';
        habitGrid.appendChild(habitCircle);
      }
      for (let i = 0; i < days.length; i += 1) {
        const habitCircle = document.createElement('div');
        const id = `circle${i + 1}`;
        habitCircle.id = id;
        habitCircle.style.borderRadius = '100%';
        habitCircle.style.border = 'none';
        // if the habit for this day is completed, fill in with color, otherwise make it #dbdbdb
        if (days[i] === true) {
          habitCircle.style.backgroundColor = tracker.color;
        } else {
          habitCircle.style.backgroundColor = '#dbdbdb';
        }
        habitCircle.style.width = '10%';
        habitCircle.style.paddingBottom = '10%';
        habitCircle.style.margin = '0.5rem';
        habitGrid.appendChild(habitCircle);
      }
      trackerBody.append(tracker);
      deleteHabitBtn.addEventListener('click', () => {
        deleteHabit(tracker);
      });
    }
  });
});
