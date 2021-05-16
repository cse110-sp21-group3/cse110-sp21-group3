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

var addForm = document.querySelector("#addForm");

var addBullet = document.querySelector(".add");
addBullet.addEventListener("click", () => {
    openForm(addForm);
});

var addClose = addForm.querySelector(".close-form");
addClose.addEventListener("click", () => {closeForm(addForm)});

function openForm(form) {
    form.style.display = "block";
}

function closeForm(form) {
    form.style.display = "none";
    form.querySelector('#bullet').value = "";
    form.querySelector('#bullet-type').selectedIndex = 0;
    form.querySelector('#bullet-modifier').selectedIndex = 0;
}


/*
** For bullet entries
*/

const submitAdd = addForm.querySelector('.submit #submitForm');
submitAdd.onclick = () => {

    const modifier = addForm.querySelector('#bullet-modifier').value;
    const type = addForm.querySelector('#bullet-type').value;
    const content = addForm.querySelector('#bullet').value;

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
    deleteButton.addEventListener("click", () => {deleteEntry(bulletLog)});
    let editForm = bulletLog.shadowRoot.querySelector("#editForm");
    let editButton = bulletLog.shadowRoot.querySelector(".editBtn");
    editButton.addEventListener("click", () => {editEntry(editForm, bulletLog)});
    let closeEdit = bulletLog.shadowRoot.querySelector(".close-form");
    closeEdit.addEventListener("click", () => {closeForm(editForm)});
    let submitEdit = bulletLog.shadowRoot.querySelector("#submitForm");
    submitEdit.addEventListener("click", () => {
        const modifier = editForm.querySelector('#bullet-modifier').value;
        const type = editForm.querySelector('#bullet-type').value;
        const content = editForm.querySelector('#bullet').value;
        const entry = {
            modifier: modifier,
            type: type,
            content: content
        };
        if (content != "") {
            bulletLog.entry = entry;
            closeForm(editForm);
        }
    })

    dailyLog.prepend(bulletLog);

}

function deleteEntry(bulletLog) {
    const dailyLog = document.getElementById('daily-log-form');
    dailyLog.removeChild(bulletLog);
}

function editEntry(editForm, bulletLog) {
    let modifier = bulletLog.shadowRoot.querySelector(".modifier").innerHTML;
    if (modifier == '*') {
        modifier = 'importance';
    } else if (modifier == '!') {
        modifier = 'inspiration';
    } else {
        modifier = 'none'
    }
    let type = bulletLog.shadowRoot.querySelector(".type").innerHTML;
    if (type == '&bull;') {
        type = 'task';
    } else if (type == '&ndash;') {
        type = 'note';
    } else if (type == '&#9702;') {
        type = 'event';
    } else {
        type = 'theme'
    }
    let content = bulletLog.shadowRoot.querySelector(".content").innerHTML;

    let bulletModifier = editForm.querySelector('#bullet-modifier');
    let bulletType = editForm.querySelector('#bullet-type');
    let bullet = editForm.querySelector('#bullet');

    bullet.value = content;
    bulletType.value = type;
    bulletModifier.value = modifier;
    
    openForm(editForm);
}
