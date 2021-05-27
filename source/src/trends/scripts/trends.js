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
  gridDiv.removeChild(tracker);
  numHabits -= 1;
  if (numHabits % 6 === 0) {
    const trackerBody = document.getElementById('tracker-body');
    trackerBody.removeChild(grid);
  }

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
  // TODO: pull from storage the habits of the particular month
  const habitKeys = Object.keys(localStorage);
  habitKeys.sort();

  let gridDiv;
  // create first grid
  let grid = document.createElement('grid-elem');
  grid.num = 1;
  gridDiv = grid.shadowRoot.querySelector('.habit-grid');
  trackerBody.appendChild(grid);
  habitKeys.forEach((k) => {
    if (numHabits !== 0 && numHabits % 6 === 0) {
      // create a new grid for every 6 habits using grid.js
      grid = document.createElement('grid-elem');
      grid.num = (numHabits / 6) + 1;
      gridDiv = grid.shadowRoot.querySelector('.habit-grid');
      trackerBody.appendChild(grid);
    }
    if (k.startsWith(`${getMonthName(DATE)}`)) { // if the key is not storing the DAY k!="theme" || k!="colorStyle" || k!="journalName" || k!="replaced_stats"
      const habitEntry = JSON.parse(localStorage.getItem(k));
      // create a tracker for each habit using tracker.js
      const tracker = document.createElement('tracker-elem');
      tracker.habit = habitEntry.habit;
      tracker.color = habitEntry.color;
      const habitArray = habitEntry.habitArray;
      const habitGrid = tracker.shadowRoot.querySelector('#habit-grid');
      const deleteHabitBtn = tracker.shadowRoot.querySelector('.delete-tracker');
      for (let i = 0; i < habitArray.length; i += 1) {
        const habitCircle = document.createElement('div');
        const id = `circle${i+1}`;
        habitCircle.id = id;
        habitCircle.style.borderRadius = '100%';
        habitCircle.style.border = 'none';
        // if the habit for this day is completed, fill in with color, otherwise make it #dbdbdb
        if (habitArray[i] === true) {
          habitCircle.style.backgroundColor = tracker.color;
        } else {
          habitCircle.style.backgroundColor = '#dbdbdb';
        }
        habitCircle.style.width = '100%';
        habitCircle.style.height = '100%';
        habitGrid.appendChild(habitCircle);
      }
      gridDiv.append(tracker);
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
  for (let i = 1; i <= numDays; i += 1) {
    const habitCircle = document.createElement('div');
    const id = `circle${i}`;
    habitCircle.id = id;
    habitCircle.style.borderRadius = '100%';
    habitCircle.style.border = 'none';
    habitCircle.style.backgroundColor = '#DBDBDB';
    habitGrid.appendChild(habitCircle);
  }
  // If number of habits % 6 === 0, then make new grid and append tracker to new grid
  // otherwise, just append tracker to last grid
  const gridList = document.getElementsByTagName('grid-elem');
  const trackerBody = document.getElementById('tracker-body');
  if (numHabits % 6 === 0) {
    const grid = document.createElement('grid-elem');
    grid.num = gridList.length + 1;
    const gridDiv = grid.shadowRoot.querySelector('.habit-grid');
    gridDiv.append(tracker);
    deleteHabitBtn.addEventListener('click', () => {
      deleteHabit(tracker, gridDiv, grid);
    });
    trackerBody.appendChild(grid);
  } else {
    const grid = gridList[gridList.length - 1];
    const gridDiv = grid.shadowRoot.querySelector('.habit-grid');
    gridDiv.append(tracker);
    deleteHabitBtn.addEventListener('click', () => {
      deleteHabit(tracker, gridDiv, grid);
    });
  }
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
    const habitStorage = {habit: habit, color: color, habitArray: habitArray};
    const habitKey = `${getMonthName(DATE)}${habit}`;
    localStorage.setItem(habitKey, JSON.stringify(habitStorage));
    closeForm(addForm);
  } else {
    alert('Please fill in habit field');
  }
};
