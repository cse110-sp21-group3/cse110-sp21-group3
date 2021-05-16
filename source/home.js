document.addEventListener('DOMContentLoaded', () => {
    Object.keys(localStorage).map(k => {
        const entry = JSON.parse(localStorage.getItem(k));
        retrieveEntry(entry);
    });
    console.log(Object.keys(localStorage));
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

function openForm(e) {
    modal.style.display = "block";
}

function closeForm(e) {
    modal.style.display = "none";
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

    addEntry(entry);

    closeForm();
};


function addEntry(entry) {

    let bulletLog;
    const dailyLog = document.getElementById('daily-log-form')
    bulletLog = document.createElement('bullet-log');
    bulletLog.setAttribute('entry', entry);
    bulletLog.entry = entry;
    dailyLog.prepend(bulletLog);

    localStorage.setItem(Math.random(10), JSON.stringify(entry));

}

function retrieveEntry(entry){
    let bulletLog;
    const dailyLog = document.getElementById('daily-log-form')
    bulletLog = document.createElement('bullet-log');
    bulletLog.setAttribute('entry', entry);
    bulletLog.entry = entry;
    dailyLog.prepend(bulletLog);
}

