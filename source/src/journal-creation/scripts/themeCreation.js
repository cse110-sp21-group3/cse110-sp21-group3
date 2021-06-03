import { themeKey } from '../../storageKeys.js';

const themeSuggestions = ['Health', 'Finance', 'Cooking', 'Academics']; // Suggested Themes

// Add Theme Suggestions
const themeInput = document.getElementById('theme-input');
const suggestionsContainer = document.querySelector('#theme-suggestions');

themeSuggestions.forEach((theme) => {
  const aTag = document.createElement('a');
  aTag.innerText = theme;

  aTag.addEventListener('click', (e) => {
    themeInput.value = e.target.textContent;
  });
  suggestionsContainer.appendChild(aTag);
});

// Submit Theme
const submitBtn = document.getElementById('submit-theme');

submitBtn.addEventListener('click', () => {
  let theme = null;
  if (themeInput.value) theme = themeInput.value;
  localStorage.setItem(themeKey, theme);
  window.location.href = '../home-dailylog/home.html';
});
