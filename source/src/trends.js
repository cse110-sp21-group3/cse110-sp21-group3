/**
 * Get current month and number of days of the month
 */
const DATE = new Date();
// eslint-disable-next-line no-extend-native
Date.prototype.getMonthName = function () {
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return monthNames[this.getMonth()];
};

// eslint-disable-next-line no-extend-native
Date.prototype.getMonthDays = function () {
  const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return days[this.getMonth()];
};

// eslint-disable-next-line no-extend-native
Date.prototype.getMonthDaysLeap = function () {
  const days = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return days[this.getMonth()];
};

const currYear = DATE.getFullYear();
let numDays;
if (currYear % 4 === 0) {
  numDays = DATE.getMonthDaysLeap();
} else {
  numDays = DATE.getMonthDays();
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
}

/**
 * template testing
 */
document.addEventListener('DOMContentLoaded', () => {
  const headerTitle = document.getElementById('header-title');
  const title = `trends: ${DATE.getMonthName()}`;
  headerTitle.innerText = title;
  const trackerBody = document.getElementById('tracker-body');
  // TODO: pull from storage the habits of the particular month
  // TODO: create a new grid for every 6 habits using grid.js
  const grid = document.createElement('grid-elem');
  grid.num = 1;
  const gridDiv = grid.shadowRoot.querySelector('.habit-grid');
  // TODO: create a tracker for each habit using tracker.js
  const tracker = document.createElement('tracker-elem');
  tracker.habit = 'water';
  tracker.color = '#599fe0';
  const habitGrid = tracker.shadowRoot.querySelector('#habit-grid');
  const deleteHabitBtn = tracker.shadowRoot.querySelector('.delete-tracker');
  for (let i = 1; i <= numDays; i += 1) {
    const habitCircle = document.createElement('div');
    const id = `circle${i}`;
    habitCircle.id = id;
    habitCircle.style.borderRadius = '100%';
    habitCircle.style.border = 'none';
    // TODO: if the habit for this day is completed, fill in with color, otherwise make it #dbdbdb
    habitCircle.style.backgroundColor = tracker.color;
    habitCircle.style.width = '100%';
    habitCircle.style.height = '100%';
    habitGrid.appendChild(habitCircle);
  }
  gridDiv.append(tracker);
  deleteHabitBtn.addEventListener('click', () => {
    deleteHabit(tracker, gridDiv, grid);
  });
  trackerBody.appendChild(grid);
  numHabits += 1;
});

/**
 * Menu
 */
const flyoutMenu = document.querySelector('#nav');

function showMenu() {
  flyoutMenu.classList.add('show');
}

function hideMenu(e) {
  flyoutMenu.classList.remove('show');
  e.stopPropagation();
  document.body.style.overflow = 'auto';
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
}

/**
 * Hamburger menu button
 */
const menuButton = document.querySelector('.menu');
menuButton.addEventListener('click', showMenu, false);

/**
* Close menu button
*/
const navSpan = document.querySelector('.close-nav');
navSpan.addEventListener('click', hideMenu, false);

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
  // TODO: show delete button when hovering over element
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
    closeForm(addForm);
  } else {
    alert('Please fill in habit field');
  }
};
