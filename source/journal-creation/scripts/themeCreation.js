import { themeKey, createdJournalKey } from '../../storageKeys.js';

// Suggested Themes
const themeSuggestions = ['Health', 'Finance', 'Cooking', 'Academics'];

// Add Theme Suggestions
const themeInput = document.getElementById('theme-input');
const suggestionsContainer = document.querySelector('#theme-suggestions');

/**
 * Add theme suggestions to page
 */
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

/**
 * Create submit function to save name of journal and all contents
 * for journal creation wizard to be fully done.
 */
submitBtn.addEventListener('click', () => {
  let theme = null;
  if (themeInput.value) theme = themeInput.value;
  localStorage.setItem(themeKey, theme);
  localStorage.setItem(createdJournalKey, 'true');
  window.location.href = '../home-dailylog/home.html';
});
