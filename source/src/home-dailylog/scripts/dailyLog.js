const key = 'dailyLogSampleData';

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
  // If nothing is stored, this is loaded : [content, completed, type, modifier]
  const initialSetup = { 1: ['', false, 'none', 'none', []] };

  let listDataTree = localStorage.getItem(key);
  if (listDataTree === null) {
    listDataTree = initialSetup;
  } else {
    listDataTree = JSON.parse(listDataTree);
  }
  const setSaveCallback = (data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };
  const list = document.querySelector('bullet-list');
  list.setValue(listDataTree);
  list.setSaveDataCallback(setSaveCallback);
}

/**
 * DOM Content Loaded
 */
document.addEventListener('DOMContentLoaded', () => {
  getSavedBullets();
  addCurrentDate();
  storeCurrentDate();
});
