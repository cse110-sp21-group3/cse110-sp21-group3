export const themeKey = 'theme'; // Stores the theme in local storage
export const colorStyleKey = 'colorStyle';
export const journalNameKey = 'journalName';
export const collectionsKey = 'collections';
export const createdJournalKey = 'createdJournal';

export const habitsKey = 'habits';
// Initialize storage
// Effectively, we need to have at least an empty array for habits.
const habits = JSON.parse(localStorage.getItem(habitsKey));
if (habits === null) {
  localStorage.setItem(habitsKey, JSON.stringify([]));
}

/**
 * Return UID keys for monthly logs
 * @param {*} itemType - event or task
 * @param {Date} date
 * @returns
 */
export function getMonthlyLogUID(itemType, date) {
  const prefix = 'ML';
  const typeID = {
    event: 'ev',
    task: 'ta',
  };
  let uid;
  switch (itemType) {
    case 'event':
      uid = `${prefix}${typeID[itemType]}${date.getMonth() + 1}${date.getDate()}${date.getFullYear()}`; // Add 1 to getMonth() as it assumes January as 0
      break;
    case 'task':
      uid = `${prefix}${typeID[itemType]}${date.getMonth() + 1}${date.getFullYear()}`; // Add 1 to getMonth() as it assumes January as 0
      break;
    default:
      break;
  }
  return uid;
}

/**
 * Returns the UID for daily logs for `date` in the format "DL{monthNum}-{date}-{year}"
 * Example, DL5-9-2021 for 9 June, 2021
 * @param {Date} date
 */
export function getDailyLogUID(date) {
  // Add 1 to Date.getUTCMonth() as it assumes January as 0
  return `DL${date.getUTCMonth() + 1}-${date.getUTCDate()}-${date.getUTCFullYear()}`;
}
