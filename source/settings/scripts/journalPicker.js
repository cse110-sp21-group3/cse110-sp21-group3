import colorThemes from '../../colorThemes.js';
import { colorStyleKey } from '../../storageKeys.js';

let selectedColorStyle = localStorage.getItem(colorStyleKey);
if (selectedColorStyle === null) selectedColorStyle = 'default';

// Set Display CSS Styles
const root = document.documentElement;
root.style.setProperty('--main-bg', colorThemes[selectedColorStyle].background);

const journalContainer = document.querySelector('#journals-container');

// In the journals container, set out each individual color.
//
// For each color, create JournalIcon mock to contain color and to redirect
// to naming page with proper color.
//
// Verbatim lifted from the Journal Creation screen.
Object.keys(colorThemes).forEach((colorTheme) => {
  const journalDisplayContainer = document.createElement('div');
  const journalElement = document.createElement('journal-icon');
  journalElement.styleName = colorTheme;
  journalElement.addEventListener('click', () => {
    localStorage.setItem(colorStyleKey, colorTheme);
    window.location.reload();
  });

  const styleDiscriptor = document.createElement('p');
  styleDiscriptor.innerHTML = colorTheme;

  journalDisplayContainer.appendChild(journalElement);
  journalDisplayContainer.appendChild(styleDiscriptor);

  journalContainer.appendChild(journalDisplayContainer);
});
