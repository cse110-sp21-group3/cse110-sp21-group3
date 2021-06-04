import colorThemes from '../../colorThemes.js';
import { colorStyleKey, collectionsKey } from '../../storageKeys.js';

// set color of website to the theme color
let selectedColorStyle = localStorage.getItem(colorStyleKey);
if (selectedColorStyle === null) selectedColorStyle = 'default';

// Set Display CSS Styles
const root = document.documentElement;
root.style.setProperty('--light-bg', colorThemes[selectedColorStyle].background);
root.style.setProperty('--main-bg', colorThemes[selectedColorStyle].main);

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


 
 /**
  * Add new collection button
  */
 let addForm = document.querySelector('#addForm');
 
 let addClose = addForm.querySelector('.close-form');
 addClose.addEventListener('click', () => {
   closeForm(addForm);
   document.getElementById('error').innerHTML = '';
 });
 
let add = document.getElementById('add');
 add.addEventListener('click', () => {
   openForm(addForm);
 });

/**
 * template testing
 */

setTimeout(() => {  setup()}, 30);
let oldbodyid = document.body.id;
const callback = function (mutations) {
  
  mutations.forEach(function (mutation) {
    if (document.body.id == 'collections-body' && 
    document.getElementById('tracker-body').childElementCount != JSON.parse(localStorage.getItem(collectionsKey)).length) {
      
      oldbodyid = document.body.id;
      console.log("collections page script reload");
      setup();
    }
    oldbodyid = document.body.id;
});  
};
const observer = new MutationObserver(callback);
const config = { attributes: true };
observer.observe(document.body, config);

function setup() {
console.log("yo this bad boi should run");

// set color of website to the theme color
 selectedColorStyle = localStorage.getItem(colorStyleKey);
if (selectedColorStyle === null) selectedColorStyle = 'default';

// Set Display CSS Styles

root.style.setProperty('--light-bg', colorThemes[selectedColorStyle].background);
root.style.setProperty('--main-bg', colorThemes[selectedColorStyle].main);

  let collections = JSON.parse(localStorage.getItem(collectionsKey));
  console.log(collections);
  if (collections === null) {
    collections = [];
  }
  // for each loop on list
  collections.forEach((k) => {
    addCollection(k);
  });




/**
 * Add new collection button
 */
addForm = document.querySelector('#addForm');

addClose = addForm.querySelector('.close-form');
addClose.addEventListener('click', () => {
  closeForm(addForm);
  document.getElementById('error').innerHTML = '';
});

add = document.getElementById('add');
add.addEventListener('click', () => {
  openForm(addForm);
});

/*
** Submit Add Collection
*/
addForm = document.querySelector('#addForm');
const submitAdd = addForm.querySelector('.submit #submitForm');
console.log(submitAdd);
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


}