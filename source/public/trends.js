const DATE = new Date();
const currMonth = DATE.getMonth();
const currYear = DATE.getFullYear();
let numDays;
if (currMonth == 0 || currMonth == 2 || currMonth == 4 || currMonth == 6 || currMonth == 7 || currMonth == 9 || currMonth == 11) {
    numDays = 31;
}
else if (currMonth == 1) {
    if (currYear % 4 == 0) {
        numDays = 29;
    }
    else {
        numDays = 28;
    }
}
else {
    numDays = 30;
}

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
** Submit Add Bullet Entry
*/
const submitAdd = addForm.querySelector(".submit #submitForm");
submitAdd.onclick = () => {

    // modifier, type, and content from the form
    const habit = addForm.querySelector("#habit").value;
    const color = addForm.querySelector("#color").value;

    // add entry to DOM & localStorage if content isn't empty, using the current UTC date as the key
    if (habit != "" && color != "") {
        addHabit(habit, color);

        closeForm(addForm);
    } else {
        alert("Please fill in habit and color fields");
    }
};

function addHabit(habit, color) {
    let tracker = document.createElement("tracker-elem");
    tracker.habit = habit;
    tracker.color = color;
    let habitGrid = tracker.shadowRoot.querySelector(".habit-grid");
    for (let i = 1; i <= numDays; i++) {
        let habitCircle = document.createElement("div");
        habitCircle.id = "circle"+i;
        habitCircle.style.borderRadius = "100%";
        habitCircle.style.border = "none";
        habitCircle.style.backgroundColor = color;
        habitGrid.appendChild(habitCircle);
    }
    let grid1 = document.getElementById("grid1");
    grid1.prepend(tracker);
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
    form.querySelector("#color").value = "";
}

/**
 * template testing
 */
document.addEventListener("DOMContentLoaded", () => {
    let water = document.createElement("tracker-elem");
    water.habit = "water";
    water.color = "#599fe0";
    let habitGrid = water.shadowRoot.querySelector(".habit-grid");
    for (let i = 1; i <= numDays; i++) {
        let habitCircle = document.createElement("div");
        habitCircle.id = "circle"+i;
        habitCircle.style.borderRadius = "100%";
        habitCircle.style.border = "none";
        habitCircle.style.backgroundColor = water.color;
        habitGrid.appendChild(habitCircle);
    }
    let grid1 = document.getElementById("grid1");
    grid1.prepend(water);
});
