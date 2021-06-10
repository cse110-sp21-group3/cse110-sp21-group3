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

journalNameEdit.addEventListener('input', () => {
  showSave();
});

journalThemeEdit.addEventListener('input', () => {
  showSave();
});

//document.addEventListener('DOMContentLoaded',setup());
function setup() {
  let header = document.querySelector('.header_content');
  let bodyd = document.body.getElementsByTagName('main')[0];

  let journalNameEdit = document.getElementById('journal-name-edit');
  let journalThemeEdit = document.getElementById('journal-theme-edit');
  let saveBtn = document.getElementById('save');
  console.log(localStorage.getItem(journalNameKey));
  let journalNameContent = (localStorage.getItem(journalNameKey)) ? localStorage.getItem(journalNameKey) : "Null";
  let journalThemeContent = (localStorage.getItem(themeKey)) ? localStorage.getItem(themeKey) : "Null";
  journalNameEdit.textContent = journalNameContent;
  journalThemeEdit.textContent = journalThemeContent;
  

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
let firstTime = false;
//while (!firstTime) {
  //if(document.getElementById(".journal-theme") != null) {
    setup();
    firstTime = true;
  //}
//}
let oldbodyid = 'settings-body';
const callback = function (mutations) {
  
  mutations.forEach(function (mutation) {
    console.log(oldbodyid);
    console.log(document.body.id);
    if (document.body.id == 'settings-body'&&oldbodyid != 'settings-body') {
      console.log("settings reload");
     
      setup();
    }
    oldbodyid = document.body.id;
});  
}
const observer = new MutationObserver(callback);
const config = { attributes: true };
observer.observe(document.body, config);