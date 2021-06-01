import colorThemes from '../../colorThemes.js';
import { colorStyleKey } from '../../storageKeys.js';

let selectedColorStyle = localStorage.getItem(colorStyleKey);
if (selectedColorStyle === 'null') selectedColorStyle = 'default';

const key = 'dailyLogSampleData';

// Set Display CSS Styles
const root = document.documentElement;
root.style.setProperty('--light-bg', colorThemes[selectedColorStyle].background);
root.style.setProperty('--main-bg', colorThemes[selectedColorStyle].main);

function addCurrentDate() {
  // add current date to title
  const titleDate = document.querySelector('.date');
  const DATE = new Date();
  const currentDate = DATE.toLocaleString().split(',')[0];
  titleDate.innerHTML = currentDate;
}

function storeCurrentDate() {
  const DATE = new Date();
  const day = DATE.getDate();
  localStorage.setItem('DAY', day);
}

const refreshDate = document.querySelector('.refresh-date');
refreshDate.addEventListener('click', () => {
  const DATE = new Date();
  const currDay = DATE.getDate();
  const storedDay = Number(localStorage.getItem('DAY'));

  // if there is no date stored or the date stored is different from the current day,
  // this means that we are in a new day, so clear the daily log
  if (storedDay === 0 || currDay !== storedDay) {
    // TODO: store all existing bullets to display on past daily logs
    // TODO clear daily log
    // clearDailyLog();
  }
});

function getSavedBullets() {
  // If nothing is stored, this is loaded : [content, completed, type, modifier, children]
  const initialSetup = { 0: [1], 1: ['', false, 'none', 'none', []] };
  let listDataTree = localStorage.getItem(key);
  if (listDataTree === null) {
    listDataTree = initialSetup;
  } else {
    listDataTree = JSON.parse(listDataTree);
  }
  return listDataTree;
}

function getMonthName(date) {
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return monthNames[date.getMonth()];
}

function getHabits() {
  const DATE = new Date();
  const currMonth = getMonthName(DATE);
  const habitList = [];
  // pull from storage the habits of the particular month
  const habitKeys = Object.keys(localStorage);
  habitKeys.sort();
  habitKeys.forEach((k) => {
    if (k.startsWith(currMonth)) {
      const habitEntry = JSON.parse(localStorage.getItem(k));
      habitList.push(habitEntry);
    }
  });
  return habitList;
}

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
  const listDataTree = getSavedBullets();

  const list = document.querySelector('bullet-list');
  list.initialiseList({
    saveDataCallback: (data) => {
      localStorage.setItem(key, JSON.stringify(data));
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
  storeCurrentDate();

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
