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
  }
});

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
});