import colorThemes from '../../colorThemes.js';
import { colorStyleKey } from '../../storageKeys.js';

function setup() {
  let selectedColorStyle = localStorage.getItem(colorStyleKey);
  if (selectedColorStyle === null) selectedColorStyle = 'default';

  // Set Display CSS Styles
  const root = document.documentElement;
  root.style.setProperty('--main-bg', colorThemes[selectedColorStyle].background);

  const journalContainer = document.querySelector('#journals-container');
  
  
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

  document.body.getElementsByTagName('main')[0].style.display = "block";
  document.querySelector('.header_content').style.display = "block";
}
let firstTime = false;
while (!firstTime) {
  if(document.querySelector('#journals-container')!= null) {
    
    setup();
    firstTime = true;
  }
}
let oldbodyid = document.body.id;
const callback = function (mutations) {
  mutations.forEach(function (mutation) {
    if (document.body.id == 'settings-body') {
      oldbodyid = document.body.id;
      setup();
    }
    oldbodyid = document.body.id;
});  
};
const observer = new MutationObserver(callback);
const config = { attributes: true };
observer.observe(document.body, config);