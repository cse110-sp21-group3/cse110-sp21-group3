import { journalNameKey, themeKey } from '../../storageKeys.js';

const journalNameEdit = document.getElementById('journal-name-edit');
const journalThemeEdit = document.getElementById('journal-theme-edit');
const saveBtn = document.getElementById('save');

/**
 * Set settings contents with current saved settings.
 */
document.addEventListener('DOMContentLoaded', () => {
  journalNameEdit.textContent = localStorage.getItem(journalNameKey);
  journalThemeEdit.textContent = localStorage.getItem(themeKey);
});

/**
 * Save new settings to localStorage.
 */
function saveInputs() {
  localStorage.setItem(journalNameKey, journalNameEdit.textContent);
  localStorage.setItem(themeKey, journalThemeEdit.textContent);
  saveBtn.style.visibility = 'hidden';
}

/**
 * Show save button.
 */
function showSave() {
  saveBtn.style.visibility = 'visible';
}

// Event listeners for the buttons on the page.
// Ideally, modifying any contents in the settings page should prompt the save button,
// and the save button should save everything.
journalNameEdit.addEventListener('input', () => {
  showSave();
});

journalThemeEdit.addEventListener('input', () => {
  showSave();
});

saveBtn.addEventListener('click', () => {
  saveInputs();
});
