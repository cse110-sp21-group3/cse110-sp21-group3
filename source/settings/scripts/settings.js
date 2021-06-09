import { journalNameKey, themeKey } from '../../storageKeys.js';

const journalNameEdit = document.getElementById('journal-name-edit');
const journalThemeEdit = document.getElementById('journal-theme-edit');
const saveBtn = document.getElementById('save');

document.addEventListener('DOMContentLoaded', () => {
  journalNameEdit.textContent = localStorage.getItem(journalNameKey);
  journalThemeEdit.textContent = localStorage.getItem(themeKey);
});

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

saveBtn.addEventListener('click', () => {
  saveInputs();
});
