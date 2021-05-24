/**
 * Retrieve entries from localStorage on load
 */
let currKey;
document.addEventListener("DOMContentLoaded", () => {
    // display entries from newest to oldest (time added to log)
    const dateKeys = Object.keys(localStorage);
    dateKeys.sort();

    dateKeys.map(k => {
        if (k !== "DAY") { // if the key is not storing the DAY
            const entry = JSON.parse(localStorage.getItem(k));
            currKey = k;
            if (currKey != "replaced_stats") {
                addEntry(entry);
            }
        }
    });

    const titleDate = document.querySelector(".date");
    const DATE = new Date();
    const currentDate = DATE.toLocaleString().split(",")[0];
    titleDate.innerHTML = currentDate;

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
        completed: false,
        nested: {   // nested entry initially empty 
            nestedContent: "",
            nestedCompleted: false, 
        },
    };

    // add entry to DOM & localStorage if content isn't empty, using the current UTC date as the key
    // also store the current date 
    if (content != "") {
        const DATE = new Date();
        currKey = DATE.toUTCString();

        addEntry(entry);
        storeCurrentDate();
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

    // main entry
    bulletLog.entry = entry;
    bulletLog.type = entry.type;
    bulletLog.modifier = entry.modifier;
    bulletLog.content = entry.content;
    bulletLog.keyname = currKey;
    bulletLog.completed = entry.completed;
    
    // nested entry
    bulletLog.nestedEntry = entry.nested;
    bulletLog.nestedContent = entry.nested.nestedContent;
    bulletLog.nestedCompleted = entry.nested.nestedCompleted;
    bulletLog.nestedAdded = false;


    // if the bullet is completed, then call completeEntryStrike()
    const c = bulletLog.completed == "true" ? true : false; 
    if (c == true) {
        completeEntryStrike(bulletLog);
    }

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

    // complete/uncomplete entry checkbox
    const completeEntry = bulletLog.shadowRoot.querySelector('.completeBtn');
    completeEntry.addEventListener("change", () => {strikeDecision(bulletLog, completeEntry)});

    // nested bullet
    const nestButton = bulletLog.shadowRoot.querySelector(".nestBtn");
    nestButton.addEventListener("click", () => {nestedBulletAppear(bulletLog)});


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
        content: content,
        completed: false,
        nested: {
            nestedContent: bulletLog.nestedContent,
            nestedComplete: bulletLog.nestedCompleted,
        },
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
function strikeDecision(bulletLog, completeEntry){
    if (completeEntry.checked) {
        completeEntryStrike(bulletLog, completeEntry);
    } else {
        removeEntryStrike(bulletLog, completeEntry);
    }
}

// strikes through bulletLog text 
function completeEntryStrike(bulletLog, completeEntry) {

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
        nested: {
            nestedContent: bulletLog.nestedContent,
            nestedComplete: bulletLog.nestedCompleted,
        },
    };

    localStorage.setItem(bulletLog.keyname, JSON.stringify(entry));

}

/// clears bulletLog text
function removeEntryStrike(bulletLog, completeEntry) {
    
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

    // same entry as before, but now completed is true
    const entry = {
        modifier: bulletLog.modifier,
        type: bulletLog.type,
        content: bulletLog.content,
        completed: false,
        nested: {
            nestedContent: bulletLog.nestedContent,
            nestedComplete: bulletLog.nestedCompleted,
        },
    };

    localStorage.setItem(bulletLog.keyname, JSON.stringify(entry));
}

/**
 * store and refresh date
 */

function storeCurrentDate(){
    const DATE = new Date();
    // for testing
    // const minute = DATE.getMinutes();
    // localStorage.setItem("MIN", minute);
    const day = DATE.getDate();
    localStorage.setItem("DAY", day);
} 

const refreshDate = document.querySelector(".refresh-date");
refreshDate.addEventListener("click", () => {
    const DATE = new Date();
    // for testing
    // const currMin = DATE.getMinutes();  
    // const storedMin = Number(localStorage.getItem("MIN"));
    const currDay = DATE.getDate();
    const storedDay = Number(localStorage.getItem("DAY"));

    if (storedDay === 0 || currDay !== storedDay) {
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
function nestedBulletAppear(bulletLog){
    const nestedBullet = bulletLog.shadowRoot.querySelector(".nested");
    console.log(nestedBullet);
    const nestedStyles =  {
        "display": "inline-block",
        "margin-left": "30px",
        "border-radius": "6px",
        "list-style-type": "none",
        "width": "80%",
        "text-align": "left",
        "padding-left": "50px",
        "display": "flex",
        "align-items": "center",
        "backhround-color": "red",
    };
    Object.assign(nestedBullet.style, nestedStyles);
    bulletLog.nestedAdded = true;

    // nested buttons for complete, edit, delete
    const nestedComplete = nestedBullet.querySelector(".completeBtn");
    nestedComplete.addEventListener("change", () => {
        alert("completed");
    });

    const nestedDelete = nestedBullet.querySelector(".deleteBtn");
    nestedDelete.addEventListener("click", () => {deleteEntryNested(bulletLog)});
}

// delete nested entry
function deleteEntryNested(bulletLog){

    // set display none
    const nestedBullet = bulletLog.shadowRoot.querySelector(".nested");
    Object.assign(nestedBullet.style, {"display": "none"});

    bulletLog.nestedAdded = false;

    // set all fields empty in localStorage
}
