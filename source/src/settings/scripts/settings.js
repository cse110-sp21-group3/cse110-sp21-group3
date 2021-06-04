import { journalNameKey, themeKey } from '../../storageKeys.js';

let journalNameEdit = document.getElementById('journal-name-edit');
let journalThemeEdit = document.getElementById('journal-theme-edit');
let saveBtn = document.getElementById('save');

document.addEventListener('readystatechange', setup());
let oldbodyid = document.body.id;
const callback = function (mutations) {
  console.log("setting page is detecting something");
  //console.log(mutations.length);
  
  mutations.forEach(function (mutation) {
    if (document.body.id == 'settings-body') {
      
      oldbodyid = document.body.id;
      console.log("setttings page script reload");
      setup();
    }
});  
};
const observer = new MutationObserver(callback);
const config = { attributes: true };
observer.observe(document.body, config);
console.log("run");
//document.addEventListener('DOMContentLoaded',setup());
function setup() {
  journalNameEdit = document.getElementById('journal-name-edit');
  journalThemeEdit = document.getElementById('journal-theme-edit');
  saveBtn = document.getElementById('save')
  console.log("settings set up");
  console.log(journalNameKey);
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
}



function saveInputs() {
  localStorage.setItem(journalNameKey, journalNameEdit.textContent);
  localStorage.setItem(themeKey, journalThemeEdit.textContent);
  saveBtn.style.visibility = 'hidden';
}

function showSave() {
  saveBtn.style.visibility = 'visible';
}

