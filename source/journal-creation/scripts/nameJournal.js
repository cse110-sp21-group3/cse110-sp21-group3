import colorThemes from '../../colorThemes.js';
import { colorStyleKey, journalNameKey } from '../../storageKeys.js';

let selectedColorStyle = localStorage.getItem(colorStyleKey);
if (selectedColorStyle === 'null') selectedColorStyle = 'default';

// Set Display CSS Styles
const root = document.documentElement;
root.style.setProperty('--main-bg', colorThemes[selectedColorStyle].background);

// Set journal mock color
const journalElement = document.querySelector('journal-icon');
journalElement.size = 'large';
journalElement.styleName = selectedColorStyle;

// Set event for submitting name of journal
const nameInput = document.querySelector('#name-input');
const nextButton = document.querySelector('#submit-name');
nextButton.addEventListener('click', () => {
  let name = null;
  if (nameInput.value) name = nameInput.value;
  localStorage.setItem(journalNameKey, name);
  window.location.href = './theme-creation.html';
});
