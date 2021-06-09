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
 * @param {*} month
 * @param {*} [day = null] - needed for event type
 * @returns
 */
export function getMonthlyLogUID(itemType, month, day = null) {
  // TODO: Add year parameter otherwise two months from different years have the same UID
  const prefix = 'ML';
  const typeID = {
    event: 'ev',
    task: 'ta',
  };
  let uid;
  switch (itemType) {
    case 'event':
      uid = `${prefix}${typeID[itemType]}${month}${day}`;
      break;
    case 'task':
      uid = `${prefix}${typeID[itemType]}${month}`;
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
