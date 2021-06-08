import { journalNameKey, themeKey } from '../../storageKeys.js';

let journalNameEdit = document.getElementById('journal-name-edit');
let journalThemeEdit = document.getElementById('journal-theme-edit');
let saveBtn = document.getElementById('save');

document.addEventListener('readystatechange', setup());
let oldbodyid = document.body.id;
const callback = function (mutations) {

  
  mutations.forEach(function (mutation) {
    if (document.body.id == 'settings-body' && oldbodyid != 'settings-body') {
      
      oldbodyid = document.body.id;
      
      setup();
    }
});  
};
const observer = new MutationObserver(callback);
const config = { attributes: true };
observer.observe(document.body, config);

//document.addEventListener('DOMContentLoaded',setup());
function setup() {
  let header = document.querySelector('.header_content');
  
  let bodyd = document.body.getElementsByTagName('main')[0];
  bodyd.style.display = "none";
  
  header.style.display = "none";

  journalNameEdit = document.getElementById('journal-name-edit');
  journalThemeEdit = document.getElementById('journal-theme-edit');
  saveBtn = document.getElementById('save')
  
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

  bodyd.style.display = "block";
  
  header.style.display = "block";
}



function saveInputs() {
  localStorage.setItem(journalNameKey, journalNameEdit.textContent);
  localStorage.setItem(themeKey, journalThemeEdit.textContent);
  saveBtn.style.visibility = 'hidden';
}

function showSave() {
  saveBtn.style.visibility = 'visible';
}

