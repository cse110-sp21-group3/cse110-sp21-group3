import { journalNameKey, themeKey } from '../storageKeys.js';

const journalNameEdit = document.getElementById('journal-name-edit');
const journalThemeEdit = document.getElementById('journal-theme-edit');
const saveBtn = document.getElementById('save');
document.addEventListener('DOMContentLoaded', () => {
    journalNameEdit.textContent = localStorage.getItem(journalNameKey);
    journalThemeEdit.textContent = localStorage.getItem(themeKey);
});

journalNameEdit.addEventListener('input', () => {
    showSave();
});

journalThemeEdit.addEventListener('input', () => {
    showSave();
});

function showSave() {
    saveBtn.style.visibility = 'visible';
}

saveBtn.addEventListener('click', () => {
    saveInputs();
});

function saveInputs() {
    localStorage.setItem(journalNameKey, journalNameEdit.textContent);
    localStorage.setItem(themeKey, journalThemeEdit.textContent);
    saveBtn.style.visibility = 'hidden';
}

