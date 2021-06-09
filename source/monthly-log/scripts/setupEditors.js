import { getMonthlyLogUID } from '../../storageKeys.js';

function getDaysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate(); // Day 0 gives the last day of previous month
}

/**
 * Gets the first day of the month to pad the calendar accordingly
 * @param {*} date date object with the current day
 * @returns day of the first date of the month
 */
function getFirstDay(month, year) {
  const firstDay = new Date(year, month, 1);
  return firstDay.getDay();
}

// calendar days of the month for habit tracker calendar
const calendarDays = ['Su', 'M', 'Tu', 'W', 'Th', 'F', 'Sa'];

/**
 *
 * @param {*} containerNode
 */
function clearContainerNode(containerNode) {
  while (containerNode.firstChild) {
    containerNode.removeChild(containerNode.firstChild);
  }
}

function saveEvents() {
  const eventsContainer = document.querySelector('.events-container');
  const eventWrappers = eventsContainer.querySelectorAll('event-wrapper');
  eventWrappers.forEach((eventWrapper) => {
    localStorage.setItem(
      eventWrapper.getStorageKey(),
      JSON.stringify(eventWrapper.getBulletTree()),
    );
  });
}

/**
 *
 * @param {Date} date
 * @param {Object} data
 */
function saveTasks(date, data) {
  localStorage.setItem(getMonthlyLogUID('task', date.getMonth()), JSON.stringify(data));
}
/**
 * Populates the event editors according to number of days in date.month
 * @param {*} emptyData
 * @param {Date} date
 */
function populateEventWrappers(date) {
  const eventsContainer = document.querySelector('.events-container');
  clearContainerNode(eventsContainer);

  const numDays = getDaysInMonth(date.getMonth(), date.getFullYear());
  let currDate = getFirstDay(date.getMonth(), date.getFullYear());
  for (let day = 1; day <= numDays; day += 1) {
    const currDay = calendarDays[currDate % 7];
    const eventWrapper = document.createElement('event-wrapper');
    eventsContainer.appendChild(eventWrapper);
    eventWrapper.initialise({
      dayOfWeek: currDay,
      dateForMonth: date,
      dayNum: day,
      saveDataCallback: () => {
        saveEvents();
        saveTasks(date, document.querySelector('.task-wrapper bullet-list').getBulletTree());
      },
    });
    currDate += 1;
  }
}

/**
 *
 * @param {Date} date
 */
function setTaskEditor(date) {
  // Get data from storage or set to initial data
  const storageKey = getMonthlyLogUID('task', date.getMonth());
  const storageValue = localStorage.getItem(storageKey);
  let dataTree = { 0: [1], 1: ['', false, []] }; // Set to empty data
  if (storageValue !== null) dataTree = JSON.parse(storageValue);

  // Remove existing list (if any)
  const taskWrapper = document.querySelector('.task-wrapper');
  const existingTaskList = taskWrapper.querySelector('bullet-list');
  if (existingTaskList !== null) existingTaskList.remove();

  // Create new task list
  const taskList = document.createElement('bullet-list');
  taskWrapper.appendChild(taskList);

  taskList.initialiseList({
    saveDataCallback: (data) => {
      saveTasks(date, data);
      saveEvents();
    },
    nestLimit: 1,
    bulletTree: dataTree,
    storageIndex: {
      value: 0,
      children: 2,
      completed: 1,
    },
    elementName: 'task-bullet',
    bulletConfigs: {
      bulletStyle: `
                input[type=text] {
                    font-size: 1.5rem;
                    font-family: 'Manrope', sans-serif;
                    color: #4F4F4F;

                    border: none;
                    background: inherit;
                    height: 1.8rem;
                    width: 90%;
                }
                
                .nested {
                    max-width: 90%;
                    box-sizing: border-box;
                }
                
                li {
                    list-style-type: disc;
                    width: 100%;
                }

                li task-bullet {
                    position: relative;
                    left: 2rem;
                }
            `,
    },
  });
}

/**
 *
 * @param {Date} date
 */
export default function updateLogs(date) {
  populateEventWrappers(date);
  setTaskEditor(date);
}
