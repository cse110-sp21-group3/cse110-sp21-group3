export const themeKey = 'theme'; // Stores the theme in local storage
export const colorStyleKey = 'colorStyle';
export const journalNameKey = 'journalName';
export const collectionsKey = 'collections';
export const createdJournalKey = 'createdJournal';

export const habitsKey = 'habits';
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
 * Returns the UID for daily logs for `date`
 * @param {Date} date
 */
export function getDailyLogUID(date) {
  return `DL${date.getUTCMonth()}-${date.getUTCDate()}-${date.getUTCFullYear()}`;
}
