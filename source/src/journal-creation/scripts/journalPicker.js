import colorThemes from '../../colorThemes.js';
import { colorStyleKey } from '../../storageKeys.js';
import { router } from '../../router.js';
const journalContainer = document.querySelector('#journals-container');

Object.keys(colorThemes).forEach((colorTheme) => {
  const journalDisplayContainer = document.createElement('div');
  const journalElement = document.createElement('journal-icon');
  journalElement.styleName = colorTheme;
  journalElement.addEventListener('click', () => {
    localStorage.setItem(colorStyleKey, colorTheme);
    router.setState("name-journal");
    
  });

  const styleDiscriptor = document.createElement('p');
  styleDiscriptor.innerHTML = colorTheme;

  journalDisplayContainer.appendChild(journalElement);
  journalDisplayContainer.appendChild(styleDiscriptor);

  journalContainer.appendChild(journalDisplayContainer);
});
