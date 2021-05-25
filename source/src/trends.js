/**
 * Get current month and number of days of the month
 */
 const DATE = new Date();
 Date.prototype.getMonthName = function() {
    var monthNames = [ "January", "February", "March", "April", "May", "June", 
                       "July", "August", "September", "October", "November", "December" ];
    return monthNames[this.getMonth()];
}
Date.prototype.getMonthDays = function() {
    const days = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
    return days[this.getMonth()];
}
Date.prototype.getMonthDaysLeap = function() {
    const days = [ 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
    return days[this.getMonth()];
}
const currYear = DATE.getFullYear();
let numDays;
if (currYear % 4 == 0) {
    numDays = DATE.getMonthDaysLeap();
}
else {
    numDays = DATE.getMonthDays();
}

let numHabits = 0;

/**
 * template testing
 */
 document.addEventListener("DOMContentLoaded", () => {
    let headerTitle = document.getElementById("header-title");
    headerTitle.innerText = "trends: " + DATE.getMonthName();
    let trackerBody = document.getElementById("tracker-body");
    // TODO: pull from storage the habits of the particular month
    // TODO: create a new grid for every 6 habits using grid.js
    let grid = document.createElement("grid-elem");
    grid.num = 1;
    let gridDiv = grid.shadowRoot.querySelector(".habit-grid");
    // TODO: create a tracker for each habit using tracker.js
    let tracker = document.createElement("tracker-elem");
    tracker.habit = "water";
    tracker.color = "#599fe0";
    let habitGrid = tracker.shadowRoot.querySelector("#habit-grid");
    let deleteHabitBtn = tracker.shadowRoot.querySelector(".delete-tracker");
    for (let i = 1; i <= numDays; i++) {
        let habitCircle = document.createElement("div");
        habitCircle.id = "circle"+i;
        habitCircle.style.borderRadius = "100%";
        habitCircle.style.border = "none";
        // TODO: if the habit for this day is completed, fill in with color, otherwise make it #dbdbdb
        habitCircle.style.backgroundColor = tracker.color;
        habitCircle.style.width = "100%";
        habitCircle.style.height = "100%";
        habitGrid.appendChild(habitCircle);
    }
    gridDiv.append(tracker);
    deleteHabitBtn.addEventListener("click", () => {deleteHabit(tracker, gridDiv)});
    trackerBody.appendChild(grid);
    numHabits++;
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
 * Add new habit button
 */
const addForm = document.querySelector("#addForm");

const addClose = addForm.querySelector(".close-form");
addClose.addEventListener("click", () => {closeForm(addForm)});

const add = document.getElementById("add");
add.addEventListener("click", () => {openForm(addForm)});

/*
** Submit Add Habit
*/
const submitAdd = addForm.querySelector(".submit #submitForm");
submitAdd.onclick = () => {

    // modifier, type, and content from the form
    const habit = addForm.querySelector("#habit").value;
    const color = addForm.querySelector("#colorpicker").value;

    // add entry to DOM & localStorage if content isn't empty, using the current UTC date as the key
    if (habit != "") {
        console.log(color);
        addHabit(habit, color);

        closeForm(addForm);
    } else {
        alert("Please fill in habit and color fields");
    }
};

/**
 * Create habit tracker for particular habit and store color of habit
 */
function addHabit(habit, color) {
    let tracker = document.createElement("tracker-elem");
    tracker.habit = habit;
    tracker.color = color;
    // TODO: show delete button when hovering over element
    let deleteHabitBtn = tracker.shadowRoot.querySelector(".delete-tracker");
    let habitGrid = tracker.shadowRoot.querySelector("#habit-grid");
    for (let i = 1; i <= numDays; i++) {
        let habitCircle = document.createElement("div");
        habitCircle.id = "circle"+i;
        habitCircle.style.borderRadius = "100%";
        habitCircle.style.border = "none";
        habitCircle.style.backgroundColor = "#DBDBDB";
        habitGrid.appendChild(habitCircle);
    }
    // TODO: if number of habits % 6 == 0, then make new grid and append tracker to new grid
    let gridList = document.getElementsByTagName("grid-elem");
    let trackerBody = document.getElementById("tracker-body");
    if (numHabits % 6 == 0) {
        let grid = document.createElement("grid-elem");
        grid.num = gridList.length + 1;
        let gridDiv = grid.shadowRoot.querySelector(".habit-grid");
        gridDiv.append(tracker);
        deleteHabitBtn.addEventListener("click", () => {deleteHabit(tracker, gridDiv)});
        trackerBody.appendChild(grid);
    }
    // otherwise, just append tracker to last grid
    else {
        let gridElem = gridList[gridList.length - 1];
        let gridDiv = gridElem.shadowRoot.querySelector(".habit-grid");
        gridDiv.append(tracker);
        deleteHabitBtn.addEventListener("click", () => {deleteHabit(tracker, gridDiv)});
    }
    numHabits++;
}

/**
 * Delete habit
 */
function deleteHabit(tracker, gridDiv) {
    // remove from DOM
    gridDiv.removeChild(tracker);

    // remove from storage
}

/**
 * Open and close a modal/form
 */
 function openForm(form) {
    form.style.display = "block";
}

function closeForm(form) {
    form.style.display = "none";
    form.querySelector("#habit").value = "";
    form.querySelector("#colorpicker").value = "#0000ff";
}
