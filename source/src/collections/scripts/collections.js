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

/**
 * Delete collection
 */
function deleteCollection(tracker, k) {
  // remove from DOM
  showDeleteBox();

  const yes = document.getElementById("yes");
  yes.addEventListener("click", () => {
    const trackerBody = document.getElementById('tracker-body');
    trackerBody.removeChild(tracker);
    document.getElementsByClassName("close-form")[1].click();
    localStorage.removeItem(k);
  });

  const no = document.getElementById("no");
  no.addEventListener("click", () => {
    document.getElementsByClassName("close-form")[1].click();
  });
}

/**
 * template testing
 */
document.addEventListener('DOMContentLoaded', () => {
  // const trackerBody = document.getElementById('tracker-body');
  // // TODO: pull from storage the collections of the particular month
  // // TODO: create a new grid for every 6 collections using grid.js
  // // TODO: create a tracker for each collection using tracker.js
  // const tracker = document.createElement('collection-elem');
  // tracker.collection = 'Groceries';
  // const deleteCollectionBtn = tracker.shadowRoot.querySelector('.delete-tracker');
  // deleteCollectionBtn.addEventListener('click', () => {
  //   deleteCollection(tracker);
  // });
  // trackerBody.appendChild(tracker);
  // numCollections += 1;
  for(var i = 0, len = localStorage.length; i < len; i++ ) {
    addCollection(localStorage.key(i));
  }
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
  f.querySelector('#collection').value = '';
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
 * Add new collection button
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
 * Create collection tracker for particular collection and store color of collection
 */
function addCollection(collection) {
  const tracker = document.createElement('collection-elem');
  tracker.collection = collection;
  // TODO: show delete button when hovering over element
  const deleteCollectionBtn = tracker.shadowRoot.querySelector('.delete-tracker');
  const trackerBody = document.getElementById('tracker-body');

  const wbox = tracker.shadowRoot.querySelector("#collection-grid");
  wbox.addEventListener("click", () => {
    tracker.shadowRoot.querySelector(".textBox-title").innerHTML = collection;
    tracker.shadowRoot.querySelector("#modalText").style.display = "block";     // Show BulletList Modal

    const key = collection;
    const listDataTree = getSavedBullets(key);
    console.log(listDataTree);

    const list = tracker.shadowRoot.querySelector('bullet-list');
    list.initialiseList({
      saveDataCallback: (data) => {
        localStorage.setItem(key, JSON.stringify(data));
      },
      nestLimit: 1,
      bulletTree: listDataTree,
      storageIndex: {
        value: 0,
        children: 2,
        completed: 1,
      },
      elementName: 'task-bullet',
      bulletConfigs: {
      },
    });
    console.log("here");
  });

  // Close BulletList Modal
  const closeText = tracker.shadowRoot.querySelector(".close-form");
  closeText.addEventListener("click", () => {
    tracker.shadowRoot.querySelector("#modalText").style.display = "none";
  });

  trackerBody.append(tracker);
  deleteCollectionBtn.addEventListener('click', () => {
    deleteCollection(tracker, collection);
  });
}

/*
** Submit Add Collection
*/
const submitAdd = addForm.querySelector('.submit #submitForm');
submitAdd.onclick = () => {
  const collection = addForm.querySelector('#collection').value;
  const e = document.getElementById("error");

  if (collection == null || collection.trim() === "") {
    e.innerHTML = "Please enter a valid name.";
  } else {
      e.innerHTML = "";
      addCollection(collection);
      closeForm(addForm);
  }
};

/*
** Modal Delete Collection Box
*/
var modalD = document.getElementById("delete-collection");
function showDeleteBox() {
  modalD.style.display = "block";
}

var closeText = document.getElementsByClassName("close-form")[1];
closeText.onclick = function() {
  modalD.style.display = "none";
}

/*
** Bulleting work
*/
function getSavedBullets(k) {
  // If nothing is stored, this is loaded : [content, completed, type, modifier, children]
  const initialSetup = { 0: [1], 1: ['', false, []] };
  let listDataTree = localStorage.getItem(k);
  if (listDataTree === null) {
    listDataTree = initialSetup;
  } else {
    listDataTree = JSON.parse(listDataTree);
  }
  return listDataTree;
}