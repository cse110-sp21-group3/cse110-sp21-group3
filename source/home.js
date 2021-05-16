document.addEventListener('DOMContentLoaded', () => {
    Object.keys(localStorage).map(k => {
        const entry = JSON.parse(localStorage.getItem(k));
        addEntry(entry);
    });
});

var menuButton = document.querySelector(".menu");
menuButton.addEventListener("click", showMenu, false);

var flyoutMenu = document.querySelector("#nav");

var navSpan = document.querySelector(".close-nav");
navSpan.addEventListener("click", hideMenu, false);

function showMenu(e) {
    flyoutMenu.classList.add("show");
}

function hideMenu(e) {
    flyoutMenu.classList.remove("show");
    e.stopPropagation();

    document.body.style.overflow = "auto";
}   

var modal = document.querySelector("#addForm");

var addBullet = document.querySelector(".add");
addBullet.addEventListener("click", openForm, false);

var span = document.querySelector(".close-form");
span.addEventListener("click", closeForm, false);

function openForm() {
    modal.style.display = "block";
}

function closeForm() {
    modal.style.display = "none";
    document.getElementById('bullet').value = "";
    document.getElementById('bullet-type').selectedIndex = 0;
    document.getElementById('bullet-modifier').selectedIndex = 0;
}


/*
** For bullet entries
*/

const submit = document.getElementById('submitForm');
submit.onclick = () => {

    const modifier = document.getElementById('bullet-modifier').value;
    const type = document.getElementById('bullet-type').value;
    const content = document.getElementById('bullet').value;

    const entry = {
        modifier: modifier,
        type: type,
        content: content,
    };

    if (content != "") {
        addEntry(entry);
        localStorage.setItem(Math.random(10), JSON.stringify(entry));
        closeForm();
    }
};


function addEntry(entry) {

    let bulletLog;
    const dailyLog = document.getElementById('daily-log-form');
    bulletLog = document.createElement('bullet-log');
    bulletLog.setAttribute('entry', entry);
    bulletLog.entry = entry;

    let deleteButton = bulletLog.shadowRoot.querySelector(".deleteBtn");
    deleteButton.addEventListener('click', () => {deleteEntry(bulletLog)});
    let editButton = bulletLog.shadowRoot.querySelector(".editBtn");
    editButton.addEventListener('click', () => {editEntry(bulletLog)});

    dailyLog.prepend(bulletLog);

}

function deleteEntry(bulletLog) {
    const dailyLog = document.getElementById('daily-log-form');
    console.log(bulletLog);
    dailyLog.removeChild(bulletLog);
}

function editEntry(bulletLog) {
    console.log('edit');
}

