/**
 * Retrieve entries from localStorage on load
 */
let currKey;
document.addEventListener('DOMContentLoaded', () => {
  // display entries from newest to oldest (time added to log)
  const dateKeys = Object.keys(localStorage);
  dateKeys.sort();

  dateKeys.forEach((k) => {
    if (k !== 'DAY') { // if the key is not storing the DAY k!="theme" || k!="colorStyle" || k!="journalName" || k!="replaced_stats"
      const entry = JSON.parse(localStorage.getItem(k));
      currKey = k;
      addEntry(entry);
    }
  });

  // add current date to title
  const titleDate = document.querySelector('.date');
  const DATE = new Date();
  const currentDate = DATE.toLocaleString().split(',')[0];
  titleDate.innerHTML = currentDate;
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
 * Open and close a modal/form
 */
function openForm(form) {
  const f = form;
  f.style.display = 'block';
}

function closeForm(form) {
  const f = form;
  f.style.display = 'none';
  f.querySelector('#bullet').value = '';
  f.querySelector('#bullet-type').selectedIndex = 0;
  f.querySelector('#bullet-modifier').selectedIndex = 0;
}

/**
 * Buttons for opening and closing bullet entry modal
 */
const addForm = document.querySelector('#addForm');

const addBullet = document.querySelector('.add');
addBullet.addEventListener('click', () => { openForm(addForm); });

const addClose = addForm.querySelector('.close-form');
addClose.addEventListener('click', () => { closeForm(addForm); });

/*
** Submit Add Bullet Entry
*/
const submitAdd = addForm.querySelector('.submit #submitForm');
submitAdd.onclick = () => {
  // modifier, type, and content from the form
  const modifier = addForm.querySelector('#bullet-modifier').value;
  const type = addForm.querySelector('#bullet-type').value;
  const content = addForm.querySelector('#bullet').value;

  // populate entry object
  const entry = {
    modifier,
    type,
    content,
    completed: false,
    nestedAdded: false,
    nestedContent: '(*/!)(&bull;/&ndash;/&#9702;/&#11088;)(Add thoughts here...)',
    nestedCompleted: false,
  };

  // add entry to DOM & localStorage if content isn't empty, using the current UTC date as the key
  // also store the current date
  if (content !== '') {
    const DATE = new Date();
    currKey = DATE.toUTCString();

    addEntry(entry);
    storeCurrentDate();
    localStorage.setItem(currKey, JSON.stringify(entry));

    closeForm(addForm);
  } else {
    alert('Please add your thoughts');
  }
};

/**
 * Add Entry
 */
function addEntry(entry) {
  // Set bullet log attributes based on current entry
  let bulletLog;
  bulletLog = document.createElement('bullet-log');

  // main entry
  bulletLog.entry = entry;
  bulletLog.type = entry.type;
  bulletLog.modifier = entry.modifier;
  bulletLog.content = entry.content;
  bulletLog.keyname = currKey;
  bulletLog.completed = entry.completed;

  // nested entry
  bulletLog.nestedAdded = entry.nestedAdded;
  bulletLog.nestedEntry = entry.nested;
  bulletLog.nestedContent = entry.nestedContent;
  bulletLog.nestedCompleted = entry.nestedCompleted;

  // if there was a nested bullet for the entry, add it with flag = true
  if (bulletLog.nestedAdded === 'true') {
    nestedBulletAppear(bulletLog, true);
  }
  // if the nested bullet was completed, strikethrough it
  if (bulletLog.nestedCompleted === 'true') {
    completeNestedStrike(bulletLog);
  }

  // if the bullet is completed, then call completeEntryStrike()
  if (bulletLog.completed === 'true') {
    completeEntryStrike(bulletLog);
  }

  // delete button
  const deleteButton = bulletLog.shadowRoot.querySelector('.deleteBtn');
  deleteButton.addEventListener('click', () => { deleteEntry(bulletLog); });

  // edit form
  const editForm = bulletLog.shadowRoot.querySelector('#editForm');

  // open edit button
  const editButton = bulletLog.shadowRoot.querySelector('.editBtn');
  editButton.addEventListener('click', () => { openEditEntry(editForm, bulletLog); });

  // close edit button
  const closeEdit = bulletLog.shadowRoot.querySelector('.close-form');
  closeEdit.addEventListener('click', () => { closeForm(editForm); });

  // submit edit button
  const submitEdit = bulletLog.shadowRoot.querySelector('#submitForm');
  submitEdit.addEventListener('click', () => { submitEditEntry(editForm, bulletLog); });

  // complete/uncomplete entry checkbox
  const completeEntry = bulletLog.shadowRoot.querySelector('.completeBtn');
  completeEntry.addEventListener('change', () => { strikeDecision(bulletLog, completeEntry); });

  // nested bullet
  const nestButton = bulletLog.shadowRoot.querySelector('.nestBtn');
  nestButton.addEventListener('click', () => { nestedBulletAppear(bulletLog, false); });

  // add bulletLog to DOM
  const dailyLog = document.getElementById('daily-log-form');
  dailyLog.prepend(bulletLog);
}

/**
 * Delete Entry
 */
function deleteEntry(bulletLog) {
  // remove from DOM
  const dailyLog = document.getElementById('daily-log-form');
  dailyLog.removeChild(bulletLog);

  // remove from localStorage
  currKey = bulletLog.keyname;
  localStorage.removeItem(currKey);
}

/**
 * Open Edit Entry
 */
function openEditEntry(editForm, bulletLog) {
  // get current modifier, type, content
  const { modifier } = bulletLog;
  const { type } = bulletLog;
  const { content } = bulletLog;

  // get modifier, type, content elements in edit form modal
  const bulletModifier = editForm.querySelector('#bullet-modifier');
  const bulletType = editForm.querySelector('#bullet-type');
  const bulletContent = editForm.querySelector('#bullet');

  // set elements fields to current values
  bulletContent.value = content;
  bulletType.value = type;
  bulletModifier.value = modifier;

  openForm(editForm);
}

/**
 * Submit Edit Entry
 */
function submitEditEntry(editForm, bulletLog) {
  // get new modifier, type, content
  const modifier = editForm.querySelector('#bullet-modifier').value;
  const type = editForm.querySelector('#bullet-type').value;
  const content = editForm.querySelector('#bullet').value;

  // populate entry object with new values
  const entry = {
    modifier,
    type,
    content,
    completed: bulletLog.completed === 'true',
    nestedAdded: bulletLog.nestedAdded === 'true',
    nestedContent: bulletLog.nestedContent,
    nestedCompleted: bulletLog.nestedCompleted === 'true',
  };

  // set elements fields to new values
  bulletLog.entry = entry;
  bulletLog.content = entry.content;
  bulletLog.modifier = entry.modifier;
  bulletLog.type = entry.type;
  currKey = bulletLog.keyname;

  // update localStorage
  localStorage.setItem(currKey, JSON.stringify(entry));

  closeForm(editForm);
}

/**
 * Completed/Uncomplete functionality that strikes through the bullet text if the
 * checkbox is checked or it clears the strike when checkbox is unchecked.
 */
function strikeDecision(bulletLog, completeEntry) {
  if (completeEntry.checked) {
    completeEntryStrike(bulletLog);
  } else {
    uncompleteEntryStrike(bulletLog);
  }
}

// strikes through bulletLog text and makes it completed
function completeEntryStrike(bulletLog) {
  // get elems
  const modifier = bulletLog.shadowRoot.querySelector('.modifier');
  const type = bulletLog.shadowRoot.querySelector('.type');
  const content = bulletLog.shadowRoot.querySelector('.content');

  // strike through
  modifier.style.setProperty('text-decoration', 'line-through');
  type.style.setProperty('text-decoration', 'line-through');
  content.style.setProperty('text-decoration', 'line-through');

  // set checkbox to checked
  const checkbox = bulletLog.shadowRoot.querySelector('.completeBtn');
  checkbox.checked = true;

  // set bulletLog's completed attribute to true
  bulletLog.completed = true;

  // same entry as before, but now completed is true
  const entry = {
    modifier: bulletLog.modifier,
    type: bulletLog.type,
    content: bulletLog.content,
    completed: true,
    nestedAdded: bulletLog.nestedAdded === 'true',
    nestedContent: bulletLog.nestedContent,
    nestedCompleted: bulletLog.nestedCompleted === 'true',
  };

  localStorage.setItem(bulletLog.keyname, JSON.stringify(entry));
}

/// removes the bulletLog strike and makes it uncompleted
function uncompleteEntryStrike(bulletLog) {
  // get elems
  const modifier = bulletLog.shadowRoot.querySelector('.modifier');
  const type = bulletLog.shadowRoot.querySelector('.type');
  const content = bulletLog.shadowRoot.querySelector('.content');

  // clear
  modifier.style.setProperty('text-decoration', 'none');
  type.style.setProperty('text-decoration', 'none');
  content.style.setProperty('text-decoration', 'none');

  // set checkbox to unchecked
  const checkbox = bulletLog.shadowRoot.querySelector('.completeBtn');
  checkbox.checked = false;

  // set bulletLog's completed attribute to true
  bulletLog.completed = false;

  // same entry as before, but now completed is false
  const entry = {
    modifier: bulletLog.modifier,
    type: bulletLog.type,
    content: bulletLog.content,
    completed: false,
    nestedAdded: bulletLog.nestedAdded === 'true',
    nestedContent: bulletLog.nestedContent,
    nestedCompleted: bulletLog.nestedCompleted === 'true',
  };

  localStorage.setItem(bulletLog.keyname, JSON.stringify(entry));
}

/**
 * store and refresh date
 */

function storeCurrentDate() {
  const DATE = new Date();
  // for testing
  // const minute = DATE.getMinutes();
  // localStorage.setItem("MIN", minute);
  const day = DATE.getDate();
  localStorage.setItem('DAY', day);
}

const refreshDate = document.querySelector('.refresh-date');
refreshDate.addEventListener('click', () => {
  const DATE = new Date();
  // for testing
  // const currMin = DATE.getMinutes();
  // const storedMin = Number(localStorage.getItem("MIN"));
  const currDay = DATE.getDate();
  const storedDay = Number(localStorage.getItem('DAY'));

  // if there is no date stored or the date stored is different from the current day,
  // this means that we are in a new day, so clear the daily log
  if (storedDay === 0 || currDay !== storedDay) {
    // TODO: store all existing bullets to display on past daily logs
    clearDailyLog();
  }
});

// clear daily log when user refreshes date (every new day)
function clearDailyLog() {
  localStorage.clear();
  window.location.reload();
}

/**
 * Nesting bullets
 */

// display a nested bullet either when the nest button is clicked on the main entry OR
// if loading from localStorage and an entry has nestedAdded == true, then we pass
// flag = true to get the bulletLog.nestedContent to appear in nestedContent.innerHTML
function nestedBulletAppear(bulletLog, flag) {
  const nestedBullet = bulletLog.shadowRoot.querySelector('.nested');

  // styles for appearing (defualt is diplay: none)
  const nestedStyles = {
    display: 'flex',
    'margin-left': '30px',
    'border-radius': '6px',
    'list-style-type': 'none',
    width: '80%',
    'text-align': 'left',
    'padding-left': '50px',
    'align-items': 'center',
    'backhround-color': 'red',
  };
  Object.assign(nestedBullet.style, nestedStyles);

  // same entry as before, but now nestedAdded is true
  bulletLog.nestedAdded = true;
  const entry = {
    modifier: bulletLog.modifier,
    type: bulletLog.type,
    content: bulletLog.content,
    completed: bulletLog.completed === 'true',
    nestedAdded: true,
    nestedContent: bulletLog.nestedContent,
    nestedCompleted: bulletLog.nestedCompleted === 'true',
  };

  // this is if the bullet log is loaded from local storage, so we need to set its content
  // to what was stored
  if (flag) {
    const nestedContent = nestedBullet.querySelector('.nestedContent');
    nestedContent.innerHTML = bulletLog.nestedContent;
  }

  localStorage.setItem(bulletLog.keyname, JSON.stringify(entry));

  // nested bullet complete button
  const nestedComplete = nestedBullet.querySelector('.nestedCompleteBtn');
  nestedComplete.addEventListener('change', () => { nestedStrikeDecision(bulletLog, nestedComplete); });

  // nested bullet submit button (needs to be pressed for nested content to be correctly saved)
  const nestedSubmit = nestedBullet.querySelector('.nestedSubmitBtn');
  nestedSubmit.addEventListener('click', () => { submitEntryNested(bulletLog); });

  // nested bullet delete button
  const nestedDelete = nestedBullet.querySelector('.nestedDeleteBtn');
  nestedDelete.addEventListener('click', () => { deleteEntryNested(bulletLog); });
}

// delete nested entry
function deleteEntryNested(bulletLog) {
  // set display none
  const nestedBullet = bulletLog.shadowRoot.querySelector('.nested');
  Object.assign(nestedBullet.style, { display: 'none' });

  // same entry as before, but now nestedAdded is false, and nested is back to default
  bulletLog.nestedAdded = false;
  const entry = {
    modifier: bulletLog.modifier,
    type: bulletLog.type,
    content: bulletLog.content,
    completed: bulletLog.completed === 'true',
    nestedAdded: false,
    nestedContent: '(*/!)(&bull;/&ndash;/&#9702;/&#11088;)(Add thoughts here...)',
    nestedCompleted: false,
  };

  // remove strikethrough
  const nestedContent = nestedBullet.querySelector('.nestedContent');
  nestedContent.style.setProperty('text-decoration', 'none');

  // set checkbox to unchecked
  const checkbox = nestedBullet.querySelector('.nestedCompleteBtn');
  checkbox.checked = false;

  localStorage.setItem(bulletLog.keyname, JSON.stringify(entry));
  window.location.reload();
}

// submit a nested bullet
function submitEntryNested(bulletLog) {
  const nestedBullet = bulletLog.shadowRoot.querySelector('.nested');
  const nestedContent = nestedBullet.querySelector('.nestedContent');

  // same entry as before, but with new nested content
  const entry = {
    modifier: bulletLog.modifier,
    type: bulletLog.type,
    content: bulletLog.content,
    completed: bulletLog.completed === 'true',
    nestedAdded: true,
    nestedContent: nestedContent.innerHTML,
    nestedCompleted: bulletLog.nestedCompleted === 'true',
  };

  localStorage.setItem(bulletLog.keyname, JSON.stringify(entry));
}

// nested strike decision depending on if the checkbox is checked or unchecked
function nestedStrikeDecision(bulletLog, completeNestedEntry) {
  if (completeNestedEntry.checked) {
    completeNestedStrike(bulletLog);
  } else {
    removeNestedStrike(bulletLog);
  }
}

// strikethrough nested text and makes it completed
function completeNestedStrike(bulletLog) {
  // get elems
  const nestedBullet = bulletLog.shadowRoot.querySelector('.nested');
  const nestedContent = nestedBullet.querySelector('.nestedContent');

  // strike through
  nestedContent.style.setProperty('text-decoration', 'line-through');

  // set checkbox to checked
  const checkbox = nestedBullet.querySelector('.nestedCompleteBtn');
  checkbox.checked = true;

  // same entry as before, but with nestedCompleted true
  bulletLog.nestedCompleted = true;
  const entry = {
    modifier: bulletLog.modifier,
    type: bulletLog.type,
    content: bulletLog.content,
    completed: bulletLog.completed === 'true',
    nestedAdded: bulletLog.nestedAdded === 'true',
    nestedContent: bulletLog.nestedContent,
    nestedCompleted: true,
  };

  localStorage.setItem(bulletLog.keyname, JSON.stringify(entry));
}

// removes strike through nested bullet and makes it uncompleted
function removeNestedStrike(bulletLog) {
  // get elems
  const nestedBullet = bulletLog.shadowRoot.querySelector('.nested');
  const nestedContent = nestedBullet.querySelector('.nestedContent');

  // remove strike
  nestedContent.style.setProperty('text-decoration', 'none');

  // set checkbox to unchecked
  const checkbox = nestedBullet.querySelector('.nestedCompleteBtn');
  checkbox.checked = false;

  // same entry as before, but with nestedCompleted false
  bulletLog.nestedCompleted = false;
  const entry = {
    modifier: bulletLog.modifier,
    type: bulletLog.type,
    content: bulletLog.content,
    completed: bulletLog.completed === 'true',
    nestedAdded: bulletLog.nestedAdded === 'true',
    nestedContent: bulletLog.nestedContent,
    nestedCompleted: false,
  };

  localStorage.setItem(bulletLog.keyname, JSON.stringify(entry));
}
