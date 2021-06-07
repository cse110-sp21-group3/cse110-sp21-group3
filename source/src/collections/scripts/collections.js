import colorThemes from '../../colorThemes.js';
import { colorStyleKey, collectionsKey } from '../../storageKeys.js';

// set color of website to the theme color
let selectedColorStyle = localStorage.getItem(colorStyleKey);
if (selectedColorStyle === null) selectedColorStyle = 'default';

// Set Display CSS Styles
const root = document.documentElement;
root.style.setProperty('--light-bg', colorThemes[selectedColorStyle].background);
root.style.setProperty('--main-bg', colorThemes[selectedColorStyle].main);

/**
 * Delete collection
 */
function deleteCollection(tracker, k) {
  // remove from DOM
  const trackerBody = document.getElementById('tracker-body');
  trackerBody.removeChild(tracker);
  let collections = JSON.parse(localStorage.getItem(collectionsKey));
  collections = collections.filter((item) => item !== k);
  localStorage.setItem(collectionsKey, JSON.stringify(collections));
  localStorage.removeItem(k);
}

/**
 * Create collection tracker for particular collection
 */
function addCollection(collection) {
  const collectionElem = document.createElement('collection-elem');
  collectionElem.collection = collection;
  // TODO: show delete button when hovering over element
  const deleteCollectionBtn = collectionElem.shadowRoot.querySelector('.delete-tracker');

  const wbox = collectionElem.shadowRoot.querySelector('#collection-grid');
  wbox.addEventListener('click', () => collectionElem.openCollection());

  // Close BulletList Modal
  const closeText = collectionElem.shadowRoot.querySelector('.close-form');
  closeText.addEventListener('click', () => collectionElem.closeCollection());

  const collectionBody = document.getElementById('tracker-body');
  collectionBody.append(collectionElem);
  deleteCollectionBtn.addEventListener('click', () => {
    deleteCollection(collectionElem, collection);
  });
}

/**
 * template testing
 */
document.addEventListener('DOMContentLoaded', () => {
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

/*
** Submit Add Collection
*/
const submitAdd = addForm.querySelector('.submit #submitForm');
submitAdd.onclick = () => {
  const collection = addForm.querySelector('#collection').value.trim();
  const e = document.getElementById('error');
  let collections = JSON.parse(localStorage.getItem(collectionsKey));
  if (collections === null) {
    collections = [];
  }

  if (collection == null || collection === '') {
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
