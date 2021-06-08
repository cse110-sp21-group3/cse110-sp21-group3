import colorThemes from '../../colorThemes.js';
import { colorStyleKey, habitsKey } from '../../storageKeys.js';

const key = 'dailyLogData';

// set color of website to the theme color
let selectedColorStyle = localStorage.getItem(colorStyleKey);
if (selectedColorStyle === null) selectedColorStyle = 'default';

// Set Display CSS Styles
let root = document.documentElement;
root.style.setProperty('--light-bg', colorThemes[selectedColorStyle].background);
root.style.setProperty('--main-bg', colorThemes[selectedColorStyle].main);

function archiveData() {
  // add data from 'dailyLogData' to 'dailyLogArchive' (store existing bullets)
  // clear 'dailyLogData' (clear current days log)
}

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


function getSavedBullets() {
  // If nothing is stored, this is loaded : [content, completed, type, modifier, children]
  const initialSetup = { 0: [1], 1: ['', false, 'task', 'none', []] };
  let listDataTree = localStorage.getItem(key);
  if (listDataTree === null) {
    listDataTree = initialSetup;
  } else {
    listDataTree = JSON.parse(listDataTree);
  }
  return listDataTree;
}

function getTitle() {
  const title = document.querySelector('#header-title');
  title.innerHTML = localStorage.getItem('journalName');
}

function getTheme() {
  const themeQuestion = document.querySelector('.question');
  const theme = localStorage.getItem('theme');
  const text = `Please add what you did related to ${theme} as a theme bullet`;
  themeQuestion.innerHTML = text;
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
  const habitKeys = JSON.parse(localStorage.getItem(habitsKey));
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
function setup() {
  let header = document.querySelector('.header_content');
  
  let bodyd = document.body.getElementsByTagName('main')[0];
  bodyd.style.display = "none";
  
  header.style.display = "none";
  root = document.documentElement;
  root.style.setProperty('--light-bg', colorThemes[selectedColorStyle].background);
  root.style.setProperty('--main-bg', colorThemes[selectedColorStyle].main);

  const refreshDate = document.querySelector('.refresh-date');
  refreshDate.addEventListener('click', () => {
    const DATE = new Date();
    const currDay = DATE.getDate();
    const storedDay = Number(localStorage.getItem('DAY'));

    // if there is no date stored or the date stored is different from the current day,
    // this means that we are in a new day, so clear the daily log
    if (storedDay === 0 || currDay !== storedDay) {
      archiveData();
    }
  });


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
  getTitle();
  getTheme();

  const DATE = new Date();
  const habitBody = document.querySelector('.habits-form');
  console.log(habitBody);
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

  bodyd.style.display = "block";
  header.style.display = "block";
  
      
}

let firstTime = false;
while (!firstTime) {
  if(document.querySelector(".tooltiptext") != null) {
    setup();
    firstTime = true;
  }
}
let oldbodyid = 'home-body';
const callback = function (mutations) {
  
  mutations.forEach(function (mutation) {
    console.log(oldbodyid);
    console.log(document.body.id);
    if (document.body.id == 'home-body'&&oldbodyid != 'home-body') {
      
      oldbodyid = document.body.id;
      console.log("home page script reload");
      setup();
    }
    oldbodyid = document.body.id;
});  
};
const observer = new MutationObserver(callback);
const config = { attributes: true };
observer.observe(document.body, config);