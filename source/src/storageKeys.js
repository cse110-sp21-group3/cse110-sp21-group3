export const themeKey = 'theme'; // Stores the theme in local storage
export const colorStyleKey = 'colorStyle';
export const journalNameKey = 'journalName';

export const habitsKey = 'habits';
let habits = JSON.parse(localStorage.getItem(habitsKey));
if (habits === null) {
  localStorage.setItem(habitsKey, JSON.stringify([]));
}