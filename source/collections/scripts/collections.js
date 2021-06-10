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
 * Deletes a collection from the page, along with its contents from localStorage.
 *
 * The HTMLElement opening the modal for it is removed first, subsequently removed from localStorage
 * via its name.
 *
 * @param {HTMLElement} tracker the HTML element representing a specific collection on our screen.
 * @param {string} k The collection's name.
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
 * Creates a collection and adds it to the Collections page.
 *
 * An HTMLElement for the collection is created, containing a modal activator
 * as well as the tying the functions for the 'delete collection' button as well.
 *
 * @param {string} collection The name of the collection to create.
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
 * Function to initialize the collections for the journal.
 *
 * If at first our collection set doesn't exist, make an empty set,
 * and after that, add all the collections to the page.
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
 * Displays a form on the page.
 *
 * Changes its style to display it.
 * @param {*} form The form to display.
 */
function openForm(form) {
  const f = form;
  f.style.display = 'block';
}

/**
 * Closes a form on the page by hiding it.
 *
 * Changes its style to remove it.
 * @param {*} form The form to close.
 */
function closeForm(form) {
  const f = form;
  f.style.display = 'none';
  f.querySelector('#collection').value = '';
}

/**
 * Add new collection button
 */
const addForm = document.querySelector('#addForm');

/**
 * Add various functions to enable the flow for adding collections.
 *
 * Tie in buttons for opening and closing the 'add collection' form.
 */
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
 * Tie in functions for the 'add collection' form.
 *
 * This form essentially adds a collection to the page, along with its contents in storage,
 * as well as performing error checking.
 *
 * Storage is handled first, and afterwards the element is added on the page.
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
