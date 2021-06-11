import colorThemes from '../../colorThemes.js';
import {
  colorStyleKey, habitsKey, getDailyLogUID, journalNameKey, themeKey,
} from '../../storageKeys.js';

// set color of website to the theme color
let selectedColorStyle = localStorage.getItem(colorStyleKey);
if (selectedColorStyle === null) selectedColorStyle = 'default';

// Set Display CSS Styles
const root = document.documentElement;
root.style.setProperty('--light-bg', colorThemes[selectedColorStyle].background);
root.style.setProperty('--main-bg', colorThemes[selectedColorStyle].main);

/**
 * Add current date to title.
 */
function addCurrentDate() {
  const titleDate = document.querySelector('.date');
  const DATE = new Date();
  const currentDate = DATE.toLocaleString().split(',')[0];
  titleDate.innerHTML = currentDate;
}

/**
 * Gets the bullets saved for today's daily log.
 *
 * @param {string} storageKey key of today's daily log in localStorage.
 * @returns The serialized array containing the bullet content for this daily log.
 */
function getSavedBullets(storageKey) {
  // If nothing is stored, this is loaded : [content, completed, type, modifier, children]
  const initialSetup = { 0: [1], 1: ['', false, 'task', 'none', []] };
  let listDataTree = localStorage.getItem(storageKey);
  if (listDataTree === null) {
    listDataTree = initialSetup;
  } else {
    listDataTree = JSON.parse(listDataTree);
  }
  return listDataTree;
}

/**
 * Get the title of the daily log.
 */
function getTitle() {
  const title = document.querySelector('#header-title');
  title.innerHTML = localStorage.getItem(journalNameKey);
}

/**
 * Get the "theme" banner question for the day.
 *
 * TODO: Make this random with interesting theme questions.
 */
function getTheme() {
  const themeQuestion = document.querySelector('.question');
  const theme = localStorage.getItem(themeKey);
  const text = `Please add what you did related to ${theme} as a theme bullet`;
  themeQuestion.innerHTML = text;
}

/**
 * Get month from Date object in full string form.
 * @param {Date} date Date to get month for.
 * @returns Name of month in string form.
 */
function getMonthName(date) {
  return date.toLocaleString('default', { month: 'long' });
}

/**
 * Gets the list of habit entries filled in for the current month.
 * @returns The list of habit entries filled in for the current month.
 */
function getHabits() {
  const DATE = new Date();
  const currMonth = getMonthName(DATE);
  const habitList = [];
  // pull from storage the habits of the particular month
  const habitKeys = JSON.parse(localStorage.getItem(habitsKey));
  habitKeys.forEach((k) => {
    if (k.startsWith(currMonth)) {
      const habitEntry = JSON.parse(localStorage.getItem(k));
      habitList.push(habitEntry);
    }
  });
  return habitList;
}

/**
 * Toggle completion for the provided habit name.
 *
 * @param {string} habit Name of habit to toggle completion for.
 */
function toggleHabit(habit) {
  const DATE = new Date();
  const today = DATE.getDate() - 1;
  const habitKey = `${getMonthName(DATE)}${habit}`;
  const habitEntry = localStorage.getItem(habitKey);
  const { color, days } = JSON.parse(habitEntry);
  const habitElem = document.getElementById(habit);
  const circle = habitElem.shadowRoot.querySelector('#habit-circle');
  if (days[today] === false) {
    days[today] = true;
    circle.style.backgroundColor = color;
  } else {
    days[today] = false;
    circle.style.backgroundColor = '#dbdbdb';
  }

  // update storage
  const habitStorage = {
    habit, color, days: [...days],
  };
  localStorage.setItem(habitKey, JSON.stringify(habitStorage));
}

/**
 * DOM Content Loaded
 */
document.addEventListener('DOMContentLoaded', () => {
  const currDate = new Date();
  const storageKey = getDailyLogUID(currDate);
  const listDataTree = getSavedBullets(storageKey);

  const list = document.querySelector('bullet-list');
  list.initialiseList({
    saveDataCallback: (data) => {
      localStorage.setItem(storageKey, JSON.stringify(data));
    },
    nestLimit: 2,
    bulletTree: listDataTree,
    storageIndex: {
      value: 0,
      completed: 1,
      type: 2,
      modifier: 3,
      children: 4,
    },
    elementName: 'daily-log-bullet',
  });
  addCurrentDate();
  getTitle();
  getTheme();

  const DATE = new Date();
  const habitBody = document.querySelector('.habits-form');

  const habitList = getHabits();
  habitList.forEach((habitEntry) => {
    const habitElem = document.createElement('daily-habit');
    habitElem.habit = habitEntry.habit;
    habitElem.color = habitEntry.color;
    const days = [...habitEntry.days];
    const today = DATE.getDate() - 1;
    const habitCircle = habitElem.shadowRoot.querySelector('#habit-circle');
    if (days[today] === true) {
      habitCircle.style.backgroundColor = habitElem.color;
    }
    habitCircle.addEventListener('click', () => {
      toggleHabit(habitElem.habit);
    });
    habitBody.appendChild(habitElem);
  });
});
