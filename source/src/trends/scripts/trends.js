import colorThemes from '../../colorThemes.js';
import { colorStyleKey } from '../../storageKeys.js';

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

let numHabits = 0;

/**
 * Delete habit
 */
function deleteHabit(tracker, gridDiv, grid) {
  // remove from DOM
  const trackerBody = document.getElementById('tracker-body');
  trackerBody.removeChild(tracker);
  numHabits -= 1;

  // remove from storage
  const habitKey = `${getMonthName(DATE)}${tracker.habit}`;
  localStorage.removeItem(habitKey);
}

/**
 * template testing
 */
document.addEventListener('DOMContentLoaded', () => {
  const headerTitle = document.getElementById('header-title');
  const title = `trends: ${getMonthName(DATE)}`;
  headerTitle.innerText = title;
  const trackerBody = document.getElementById('tracker-body');
  // pull from storage the habits of the particular month
  const habitKeys = Object.keys(localStorage);
  habitKeys.sort();
  habitKeys.forEach((k) => {
    if (k.startsWith(`${getMonthName(DATE)}`)) { // if the key is not storing the DAY k!="theme" || k!="colorStyle" || k!="journalName" || k!="replaced_stats"
      const habitEntry = JSON.parse(localStorage.getItem(k));
      // create a tracker for each habit using tracker.js
      const tracker = document.createElement('tracker-elem');
      tracker.habit = habitEntry.habit;
      tracker.color = habitEntry.color;
      const days = [...habitEntry.days];
      const habitGrid = tracker.shadowRoot.querySelector('#habit-grid');
      const deleteHabitBtn = tracker.shadowRoot.querySelector('.delete-tracker');
      for (let i = 0; i < 7; i += 1) {
        const day = document.createElement('p');
        day.innerText = calendarDays[i];
        day.style.width = '14%'
        habitGrid.appendChild(day);
      }
      const firstDay = getFirstDay(DATE);
      // create filler circles
      for (let i = 0; i < firstDay; i += 1) {
        const habitCircle = document.createElement('div');
        habitCircle.style.borderRadius = '100%';
        habitCircle.style.border = 'none';
        habitCircle.style.backgroundColor = 'white'
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
        deleteHabit(tracker, gridDiv, grid);
      });
      numHabits += 1;
    }
  });
});

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
}

/**
 * Add new habit button
 */
const addForm = document.querySelector('#addForm');

const addClose = addForm.querySelector('.close-form');
addClose.addEventListener('click', () => {
  closeForm(addForm);
});

const add = document.getElementById('add');
add.addEventListener('click', () => {
  openForm(addForm);
});

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
    habitGrid.appendChild(day);
  }
  const firstDay = getFirstDay(DATE);
  // create filler circles
  for (let i = 0; i < firstDay; i += 1) {
    const habitCircle = document.createElement('div');
    habitCircle.style.borderRadius = '100%';
    habitCircle.style.border = 'none';
    habitCircle.style.backgroundColor = 'white'
    habitCircle.style.width = '1.5rem';
    habitCircle.style.height = '1.5rem';
    habitGrid.appendChild(habitCircle);
  }
  for (let i = 1; i <= numDays; i += 1) {
    const habitCircle = document.createElement('div');
    const id = `circle${i}`;
    habitCircle.id = id;
    habitCircle.style.borderRadius = '1.5rem';
    habitCircle.style.border = 'none';
    habitCircle.style.backgroundColor = '#DBDBDB';
    habitGrid.appendChild(habitCircle);
  }
  const trackerBody = document.getElementById('tracker-body');
  deleteHabitBtn.addEventListener('click', () => {
    deleteHabit(tracker, gridDiv, grid);
  });
  trackerBody.appendChild(tracker);
  numHabits += 1;
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
    localStorage.setItem(habitKey, JSON.stringify(habitStorage));
    closeForm(addForm);
  } else {
    alert('Please fill in habit field');
  }
};
