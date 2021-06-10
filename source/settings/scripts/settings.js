import { journalNameKey, themeKey } from '../../storageKeys.js';

let journalNameEdit = document.getElementById('journal-name-edit');
let journalThemeEdit = document.getElementById('journal-theme-edit');
let saveBtn = document.getElementById('save');

function saveInputs() {
  localStorage.setItem(journalNameKey, journalNameEdit.textContent);
  localStorage.setItem(themeKey, journalThemeEdit.textContent);
  saveBtn.style.visibility = 'hidden';
}

function showSave() {
  saveBtn.style.visibility = 'visible';
}
function setup() {
  journalNameEdit = document.getElementById('journal-name-edit');
  console.log(journalNameEdit);
  journalThemeEdit = document.getElementById('journal-theme-edit');
  saveBtn = document.getElementById('save');

  journalNameEdit.textContent = localStorage.getItem(journalNameKey);
  journalThemeEdit.textContent = localStorage.getItem(themeKey);

  journalNameEdit.addEventListener('input', () => {
    showSave();
  });

  journalThemeEdit.addEventListener('input', () => {
    showSave();
  });

  saveBtn.addEventListener('click', () => {
    saveInputs();
  });
  document.body.getElementsByTagName('main')[0].style.display = "block";
  document.querySelector('.header_content').style.display = "block";
}
let firstTime = false;
while (!firstTime) {
  if(document.getElementById("journal-name") != null) {
    setup();
    firstTime = true;
  }
}
let oldbodyid = document.body.id;
const callback = function (mutations) {
  mutations.forEach(function (mutation) {
    if (document.body.id == 'settings-body') {
      oldbodyid = document.body.id;
      setup();
    }
    oldbodyid = document.body.id;
});  
};
const observer = new MutationObserver(callback);
const config = { attributes: true };
observer.observe(document.body, config);