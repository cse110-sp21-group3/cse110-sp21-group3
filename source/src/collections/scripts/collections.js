import { collectionsKey } from '../../storageKeys.js';

/**
 * Delete collection
 */
function deleteCollection(tracker, k) {
  // remove from DOM
  const trackerBody = document.getElementById('tracker-body');
  trackerBody.removeChild(tracker);
  document.getElementsByClassName('close-form')[1].click();
  let collections = JSON.parse(localStorage.getItem(collectionsKey));
  collections = collections.filter((item) => item !== k);
  localStorage.setItem(collectionsKey, JSON.stringify(collections));
  localStorage.removeItem(k);
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
  let collections = JSON.parse(localStorage.getItem(collectionsKey));
  if (collections === null) {
    collections = [];
  }
  // for each loop on list
  collections.forEach((k) => {
    addCollection(k);
  });
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
  document.getElementById('error').innerHTML = '';
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

  const wbox = tracker.shadowRoot.querySelector('#collection-grid');
  wbox.addEventListener('click', () => {
    tracker.shadowRoot.querySelector('.textBox-title').innerHTML = collection;
    tracker.shadowRoot.querySelector('#modalText').style.display = 'block'; // Show BulletList Modal

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
    console.log('here');
  });

  // Close BulletList Modal
  const closeText = tracker.shadowRoot.querySelector('.close-form');
  closeText.addEventListener('click', () => {
    tracker.shadowRoot.querySelector('#modalText').style.display = 'none';
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
  const e = document.getElementById('error');
  let collections = JSON.parse(localStorage.getItem(collectionsKey));
  if (collections === null) {
    collections = [];
  }

  if (collection == null || collection.trim() === '') {
    e.innerHTML = 'Please enter a valid name.';
  } else if (collections.includes(collection)) {
    e.innerHTML = 'That collection already exists.';
  } else {
    collections.push(collection);
    localStorage.setItem(collectionsKey, JSON.stringify(collections));
    e.innerHTML = '';
    addCollection(collection);
    closeForm(addForm);
  }
};

/*
** Modal Delete Collection Box
*/
const modalD = document.getElementById('delete-collection');
function showDeleteBox() {
  modalD.style.display = 'block';
}

const closeText = document.getElementsByClassName('close-form')[1];
closeText.onclick = function () {
  modalD.style.display = 'none';
};

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