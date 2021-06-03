export const themeKey = 'theme'; // Stores the theme in local storage
export const colorStyleKey = 'colorStyle';
export const journalNameKey = 'journalName';

export const habitsKey = 'habits';
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
