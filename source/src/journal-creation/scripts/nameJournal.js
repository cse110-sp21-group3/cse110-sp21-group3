import colorThemes from '../../colorThemes.js';
import { colorStyleKey, journalNameKey } from '../../storageKeys.js';

const selectedColorStyle = localStorage.getItem(colorStyleKey);

// Set Display CSS Styles
const root = document.documentElement;
root.style.setProperty('--main-bg', colorThemes[selectedColorStyle]['background'])


const journalElement = document.querySelector('journal-icon');
journalElement.size = "large"
journalElement.styleName = selectedColorStyle;


const nameInput = document.querySelector('#name-input');
const nextButton = document.querySelector('#submit-name');
nextButton.addEventListener('click', () => {
    let name = null;
    if (nameInput.value) name = nameInput.value;
    localStorage.setItem(journalNameKey, name);
    window.location.href = './theme-creation.html'
});
