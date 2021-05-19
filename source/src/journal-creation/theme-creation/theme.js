import { theme as themeKey } from '../../storageKeys.js';

const themeSuggestions = ['Health', 'Finance', 'Cooking', 'Academics']; // Suggested Themes

const themeInput = document.getElementById('theme-input');
const suggestionsContainer = document.querySelector('#theme-suggestions');
const submitBtn = document.getElementById('submit-theme');

themeSuggestions.forEach((theme) => {
  const aTag = document.createElement('a');
  aTag.className = 'mt-6 text-gray-400 hover:text-black text-base mobile:text-2xl';
  aTag.innerText = theme;

  aTag.addEventListener('click', (e) => {
    themeInput.value = e.target.textContent;
  });
  suggestionsContainer.appendChild(aTag);
});

submitBtn.addEventListener('click', () => {
  let theme = null;
  if (themeInput.value) theme = themeInput.value;
  localStorage.setItem(themeKey, theme);
});
