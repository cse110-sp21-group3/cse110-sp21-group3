/**
 * Retrieve entries from localStorage on load
 */
let currKey;
document.addEventListener("DOMContentLoaded", () => {
    // display entries from newest to oldest (time added to log)
    const dateKeys = Object.keys(localStorage);
    dateKeys.sort();
    dateKeys.map(k => {
        const entry = JSON.parse(localStorage.getItem(k));
        currKey = k;
        if (currKey != "replaced_stats") {
            addEntry(entry);
        }
        //addEntry(entry);
    });
});

/**
 * Hamburger menu button
 */
const menuButton = document.querySelector(".menu");
menuButton.addEventListener("click", showMenu, false);

/**
 * Close menu button 
 */
const navSpan = document.querySelector(".close-nav");
navSpan.addEventListener("click", hideMenu, false);

/**
 * Menu 
 */
const flyoutMenu = document.querySelector("#nav");

function showMenu(e) {
    flyoutMenu.classList.add("show");
}

function hideMenu(e) {
    flyoutMenu.classList.remove("show");
    e.stopPropagation();
    document.body.style.overflow = "auto";
}   

/**
 * Open and close a modal/form
 */
function openForm(form) {
    form.style.display = "block";
}

function closeForm(form) {
    form.style.display = "none";
    form.querySelector("#bullet").value = "";
    form.querySelector("#bullet-type").selectedIndex = 0;
    form.querySelector("#bullet-modifier").selectedIndex = 0;
}

/**
 * Buttons for opening and closing bullet entry modal
 */
const addForm = document.querySelector("#addForm");

const addBullet = document.querySelector(".add");
addBullet.addEventListener("click", () => {openForm(addForm)});

const addClose = addForm.querySelector(".close-form");
addClose.addEventListener("click", () => {closeForm(addForm)});

/*
** Submit Add Bullet Entry
*/
const submitAdd = addForm.querySelector(".submit #submitForm");
submitAdd.onclick = () => {

    // modifier, type, and content from the form
    const modifier = addForm.querySelector("#bullet-modifier").value;
    const type = addForm.querySelector("#bullet-type").value;
    const content = addForm.querySelector("#bullet").value;

    // populate entry object
    const entry = {
        modifier: modifier,
        type: type,
        content: content,
    };

    // add entry to DOM & localStorage if content isn't empty, using the current UTC date as the key
    if (content != "") {
        const date = new Date();
        currKey = date.toUTCString();

        addEntry(entry);
        localStorage.setItem(currKey, JSON.stringify(entry));

        closeForm(addForm);
    } else {
        alert("Please add your thoughts");
    }
};

/**
 * Add Entry 
 */
function addEntry(entry) {

    // Set bullet log attributes based on current entry
    let bulletLog;
    bulletLog = document.createElement("bullet-log");
    // bulletLog.setAttribute('entry', entry); // do we need this?
    bulletLog.entry = entry;
    bulletLog.type = entry.type;
    bulletLog.modifier = entry.modifier;
    bulletLog.content = entry.content;
    bulletLog.keyname = currKey;

    // delete button
    const deleteButton = bulletLog.shadowRoot.querySelector(".deleteBtn");
    deleteButton.addEventListener("click", () => {deleteEntry(bulletLog)});

    // edit form
    const editForm = bulletLog.shadowRoot.querySelector("#editForm");

    // open edit button
    const editButton = bulletLog.shadowRoot.querySelector(".editBtn");
    editButton.addEventListener("click", () => {openEditEntry(editForm, bulletLog)});

    // close edit button
    const closeEdit = bulletLog.shadowRoot.querySelector(".close-form");
    closeEdit.addEventListener("click", () => {closeForm(editForm)});

    // submit edit button
    const submitEdit = bulletLog.shadowRoot.querySelector("#submitForm");
    submitEdit.addEventListener("click", () => {submitEditEntry(editForm, bulletLog)});

    // complete entry button
    const completeEntry = bulletLog.shadowRoot.querySelector('.completeBtn');
    completeEntry.addEventListener("click", () => {completeEntryStrike(bulletLog)});

    // add bulletLog to DOM
    const dailyLog = document.getElementById("daily-log-form");
    dailyLog.prepend(bulletLog);

}

/**
 * Delete Entry
 */
function deleteEntry(bulletLog) {
    // remove from DOM
    const dailyLog = document.getElementById("daily-log-form");
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
    const modifier = bulletLog.modifier;
    const type = bulletLog.type;
    const content = bulletLog.content;

    // get modifier, type, content elements in edit form modal
    const bulletModifier = editForm.querySelector("#bullet-modifier");
    const bulletType = editForm.querySelector("#bullet-type");
    const bulletContent = editForm.querySelector("#bullet");
    
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
    const modifier = editForm.querySelector("#bullet-modifier").value;
    const type = editForm.querySelector("#bullet-type").value;
    const content = editForm.querySelector("#bullet").value;
    
    // populate entry object with new values
    const entry = {
        modifier: modifier,
        type: type,
        content: content
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
 * Complete Entry Strikethrough (still need to persist in localstorage, bulletLog element)
 */
function completeEntryStrike(bulletLog) {
    const modifier = bulletLog.shadowRoot.querySelector('.modifier');
    const type = bulletLog.shadowRoot.querySelector('.type');
    const content = bulletLog.shadowRoot.querySelector('.content');

    modifier.style.setProperty('text-decoration', 'line-through');
    type.style.setProperty('text-decoration', 'line-through');
    content.style.setProperty('text-decoration', 'line-through');
}

