import colorThemes from '../../colorThemes.js';
import { colorStyleKey, habitsKey } from '../../storageKeys.js';

// set color of website to the theme color
let selectedColorStyle = localStorage.getItem(colorStyleKey);
if (selectedColorStyle === null) selectedColorStyle = 'default';

// Set Display CSS Styles
const root = document.documentElement;
root.style.setProperty('--light-bg', colorThemes[selectedColorStyle].background);
root.style.setProperty('--main-bg', colorThemes[selectedColorStyle].main);

/**
 * Get current month and number of days of the month
 */
const DATE = new Date();
// calendar days of the month for habit tracker calendar
const calendarDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
/**
 * Get the name of the current month
 * @param {*} date date object with the current day
 * @returns name of current month
 */
function getMonthName(date) {
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return monthNames[date.getMonth()];
}

/**
 * Get the days of the month
 * @param {*} date date object with the current day
 * @returns number of days in the month on a normal year
 */
function getMonthDays(date) {
  const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return days[date.getMonth()];
}

/**
 * Get the days of the month on a leap year
 * @param {*} date date object with the current day
 * @returns number of days in the month on a leap year
 */
function getMonthDaysLeap(date) {
  const days = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return days[date.getMonth()];
}

/**
 * Gets the first day of the month to pad the calendar accordingly
 * @param {*} date date object with the current day
 * @returns day of the first date of the month
 */
function getFirstDay(date) {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  return firstDay.getDay();
}

// Get number of days in the current month
const currYear = DATE.getFullYear();
let numDays;
if (currYear % 4 === 0) {
  numDays = getMonthDaysLeap(DATE);
} else {
  numDays = getMonthDays(DATE);
}

/**
 * Open the form modal
 * @param {*} form form modal to be opened
 */
function openForm(form) {
  const f = form;
  f.style.display = 'block';
}

/**
 * Close the form modal
 * @param {*} form form modal to be closed
 */
function closeForm(form) {
  const f = form;
  f.style.display = 'none';
}

// add habit form
const addForm = document.querySelector('#addForm');

/**
 * Close the form that adds a habit
 */
function closeAddForm() {
  addForm.style.display = 'none';
  addForm.querySelector('#habit-field').value = '';
  addForm.querySelector('#colorpicker').value = '#0000ff';
  addForm.querySelector('#error').style.visibility = 'hidden';
}

// close add form button
const addClose = addForm.querySelector('#add-close-form');
addClose.addEventListener('click', () => {
  closeAddForm(addForm);
});

// add habit button
const add = document.getElementById('add');
add.addEventListener('click', () => {
  openForm(addForm);
});

// edit habit color form
const editForm = document.getElementById('edit-form');

// close edit form button
const editClose = editForm.querySelector('#edit-close-form');
editClose.addEventListener('click', () => {
  closeForm(editForm);
});

/**
 * Opens the edit form with value of color set to current habit color
 * @param {*} color current color of habit
 */
function openEditForm(color) {
  const colorPicker = editForm.querySelector('#colorpicker');
  colorPicker.value = color;

  editForm.style.display = 'block';
}

// submit edit form button
const submitEditBtn = editForm.querySelector('#submitEditForm');

// submit new color to storage and reload window
function submitEdit(habitKey, tracker) {
  const { habit, days } = tracker;
  const color = editForm.querySelector('#colorpicker').value;
  const habitStorage = {
    habit, color, days,
  };
  localStorage.setItem(habitKey, JSON.stringify(habitStorage));
  closeForm(editForm);
  window.location.reload();
}

/**
 * Deletes the habit tracker of the specified habit
 * @param {*} habit habit to be deleted
 */
function removeHabit(habit) {
  // remove from DOM
  const tracker = document.getElementById(habit);
  tracker.remove();

  // remove from storage
  let habits = JSON.parse(localStorage.getItem(habitsKey));
  const habitKey = `${getMonthName(DATE)}${habit}`;
  habits = habits.filter((item) => item !== habitKey);
  localStorage.removeItem(habitKey);
  localStorage.setItem(habitsKey, JSON.stringify(habits));
}

/**
 * Delete current habit
 * @param {*} tracker html element of tracker to be deleted
 */
function deleteHabit(habit) {
  removeHabit(habit);
}

/**
 * Edit color of current habit
 * @param {*} tracker entry in local storage of current habit
 */
function editColor(tracker) {
  openEditForm(tracker.color);

  const habitKey = `${getMonthName(DATE)}${tracker.habit}`;
  submitEditBtn.addEventListener('click', () => {
    submitEdit(habitKey, tracker);
  });
}

/**
 * Add days of the week to the calendar
 * @param {*} habitGrid calendar grid to add days to
 */
function addCalendarDays(habitGrid) {
  for (let i = 0; i < 7; i += 1) {
    const day = document.createElement('p');
    day.innerText = calendarDays[i];
    day.style.width = '10%';
    day.style.margin = '0.5rem';
    habitGrid.appendChild(day);
  }
}

/**
 * Add filler circles to pad calendar so that first circle of the month is on correct day
 * @param {*} habitGrid calendar grid to add days to
 */
function addFillerCircles(habitGrid) {
  const firstDay = getFirstDay(DATE);
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
}

/**
 * Add habit to DOM
 * @param {*} habit name of habit to be added
 * @param {*} color color of habit to be added
 */
function addHabit(habit, color) {
  // create new tracker element web component
  const tracker = document.createElement('tracker-elem');
  tracker.habit = habit;
  tracker.color = color;
  const deleteHabitBtn = tracker.shadowRoot.querySelector('.delete-tracker');
  const habitGrid = tracker.shadowRoot.querySelector('#habit-grid');
  const colorCircle = tracker.shadowRoot.querySelector('#habit-color');
  // fill first row of calendar with calendar days
  addCalendarDays(habitGrid);
  addFillerCircles(habitGrid);
  // create circles that indicate each day of month
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
  // delete habit button
  deleteHabitBtn.addEventListener('click', () => {
    deleteHabit(habit);
  });
  const habitArray = Array(numDays).fill(false);
  const habitStorage = {
    habit, color, days: [...habitArray],
  };
  colorCircle.addEventListener('click', () => {
    editColor(habitStorage);
  });
}

// submit add habit button
const submitAdd = addForm.querySelector('.submit #submitForm');
submitAdd.onclick = () => {
  const habit = addForm.querySelector('#habit-field').value;
  const color = addForm.querySelector('#colorpicker').value;
  const habits = JSON.parse(localStorage.getItem(habitsKey));
  const habitKey = `${getMonthName(DATE)}${habit}`;

  // if they provided a new habit, add habit to DOM and storage
  // otherwise, show error message
  if (habit === '') {
    const error = document.getElementById('error');
    error.style.visibility = 'visible';
    error.innerText = 'Please fill in habit field';
  } else if (habits.includes(habitKey)) {
    const error = document.getElementById('error');
    error.style.visibility = 'visible';
    error.innerText = 'That habit already exists';
  } else {
    addHabit(habit, color);
    const habitArray = Array(numDays).fill(false);
    const habitStorage = {
      habit, color, days: [...habitArray],
    };
    habits.push(habitKey);
    localStorage.setItem(habitsKey, JSON.stringify(habits));
    localStorage.setItem(habitKey, JSON.stringify(habitStorage));
    closeAddForm();
  }
};

/**
 * When loading the website, add all of the habits in the storage to the DOM
 */
document.addEventListener('DOMContentLoaded', () => {
  const headerTitle = document.getElementById('header-title');
  const title = `Trends: ${getMonthName(DATE)}`;
  headerTitle.innerText = title;
  const trackerBody = document.getElementById('tracker-body');
  // pull from storage the habits of the particular month
  const habitKeys = JSON.parse(localStorage.getItem(habitsKey));
  habitKeys.forEach((k) => {
    if (k.startsWith(`${getMonthName(DATE)}`)) {
      // create a tracker for each habit using tracker.js
      const habitEntry = JSON.parse(localStorage.getItem(k));
      const tracker = document.createElement('tracker-elem');
      tracker.habit = habitEntry.habit;
      tracker.color = habitEntry.color;
      const days = [...habitEntry.days];
      const habitGrid = tracker.shadowRoot.querySelector('#habit-grid');
      const deleteHabitBtn = tracker.shadowRoot.querySelector('.delete-tracker');
      const colorCircle = tracker.shadowRoot.querySelector('#habit-color');
      // fill first row of calendar with calendar days
      addCalendarDays(habitGrid);
      addFillerCircles(habitGrid);
      // create circles that indicate each day of month
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
        deleteHabit(tracker.habit);
      });
      colorCircle.addEventListener('click', () => {
        editColor(habitEntry);
      });
    }
  });
});
