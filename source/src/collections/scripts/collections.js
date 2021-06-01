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

let numCollections = 0;

/**
 * Delete collection
 */
function deleteCollection(tracker, gridDiv, grid) {
  // remove from DOM
  gridDiv.removeChild(tracker);
  numCollections -= 1;
  if (numCollections % 6 === 0) {
    const trackerBody = document.getElementById('tracker-body');
    trackerBody.removeChild(grid);
  }

  // remove from storage
}

/**
 * template testing
 */
document.addEventListener('DOMContentLoaded', () => {
  const trackerBody = document.getElementById('tracker-body');
  // TODO: pull from storage the collections of the particular month
  // TODO: create a new grid for every 6 collections using grid.js
  const grid = document.createElement('grid-elem');
  grid.num = 1;
  const gridDiv = grid.shadowRoot.querySelector('.collection-grid');
  // TODO: create a tracker for each collection using tracker.js
  const tracker = document.createElement('tracker-elem');
  tracker.collection = 'Groceries';
  // tracker.color = '#599fe0';
  const deleteCollectionBtn = tracker.shadowRoot.querySelector('.delete-tracker');
  // const collectionGrid = tracker.shadowRoot.querySelector('#collection-grid');
  // for (let i = 1; i <= numDays; i += 1) {
  //   const collectionCircle = document.createElement('div');
  //   const id = `circle${i}`;
  //   collectionCircle.id = id;
  //   collectionCircle.style.borderRadius = '100%';
  //   collectionCircle.style.border = 'none';
  //   // TODO: if the collection for this day is completed, fill in with color, otherwise make it #dbdbdb
  //   collectionCircle.style.backgroundColor = tracker.color;
  //   collectionCircle.style.width = '100%';
  //   collectionCircle.style.height = '100%';
  //   collectionGrid.appendChild(collectionCircle);
  // }
  gridDiv.append(tracker);
  deleteCollectionBtn.addEventListener('click', () => {
    deleteCollection(tracker, gridDiv, grid);
  });
  trackerBody.appendChild(grid);
  numCollections += 1;
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
  // f.querySelector('#colorpicker').value = '#0000ff';
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
  const tracker = document.createElement('tracker-elem');
  tracker.collection = collection;
  // tracker.color = color;
  // TODO: show delete button when hovering over element
  const deleteCollectionBtn = tracker.shadowRoot.querySelector('.delete-tracker');
  // const collectionGrid = tracker.shadowRoot.querySelector('#collection-grid');
  // for (let i = 1; i <= numDays; i += 1) {
  //   const collectionCircle = document.createElement('div');
  //   const id = `circle${i}`;
  //   collectionCircle.id = id;
  //   collectionCircle.style.borderRadius = '100%';
  //   collectionCircle.style.border = 'none';
  //   collectionCircle.style.backgroundColor = '#DBDBDB';
  //   collectionGrid.appendChild(collectionCircle);
  // }
  // If number of collections % 6 === 0, then make new grid and append tracker to new grid
  // otherwise, just append tracker to last grid
  const gridList = document.getElementsByTagName('grid-elem');
  const trackerBody = document.getElementById('tracker-body');
  if (numCollections % 6 === 0) {
    const grid = document.createElement('grid-elem');
    grid.num = gridList.length + 1;
    const gridDiv = grid.shadowRoot.querySelector('.collection-grid');

    const wbox = tracker.shadowRoot.querySelector("#collection-grid");
    wbox.addEventListener("click", () => {
      document.querySelector(".textBox-title").innerHTML = collection;
      textBox();
    });

    gridDiv.append(tracker);
    deleteCollectionBtn.addEventListener('click', () => {
      deleteCollection(tracker, gridDiv, grid);
    });
    trackerBody.appendChild(grid);
  } else {
    const grid = gridList[gridList.length - 1];
    const gridDiv = grid.shadowRoot.querySelector('.collection-grid');

    const wbox = tracker.shadowRoot.querySelector("#collection-grid");
    wbox.addEventListener("click", () => {
      document.querySelector(".textBox-title").innerHTML = collection;
      textBox();
    });

    gridDiv.append(tracker);
    deleteCollectionBtn.addEventListener('click', () => {
      deleteCollection(tracker, gridDiv, grid);
    });
  }
  numCollections += 1;
}

/*
** Submit Add Collection
*/
const submitAdd = addForm.querySelector('.submit #submitForm');
submitAdd.onclick = () => {
  const collection = addForm.querySelector('#collection').value;
  // const color = addForm.querySelector('#colorpicker').value;
  let e = document.getElementById("error");

  if (collection == null || collection.trim() === "") {
    e.innerHTML = "Please enter a valid name.";
  } else {
      e.innerHTML = "";
      addCollection(collection);
      closeForm(addForm);
  }

  // if (collection !== '') {
  //   addCollection(collection);
  //   closeForm(addForm);
  // } else {
  //   alert('Please fill in collection field');
  // }
};

/*
** Modal Text Box
*/
var modal = document.getElementById("modalText");
function textBox() {
  modal.style.display = "block";
}

var closeText = document.getElementsByClassName("close")[0];
closeText.onclick = function() {
  modal.style.display = "none";
}