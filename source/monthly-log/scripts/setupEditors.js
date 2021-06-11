import { getMonthlyLogUID } from '../../storageKeys.js';

function getDaysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate(); // Day 0 gives the last day of previous month
}

/**
 * Remove all HTML children from a given HTML node.
 * @param {HTMLElement} containerNode Node to remove all children from.
 */
function clearContainerNode(containerNode) {
  while (containerNode.firstChild) {
    containerNode.removeChild(containerNode.firstChild);
  }
}

/**
 * Save all internal event wrapper's BulletLists to localStorage.
 */
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
 * Save tasks for month to localStorage.
 * @param {Date} date Current date, to determine month to save tasks to.
 * @param {Object} data Data to place in localStorage.
 */
function saveTasks(date, data) {
  localStorage.setItem(getMonthlyLogUID('task', date), JSON.stringify(data));
}
/**
 * Populates the event editors according to number of days in date.month
 * @param {Date} date Current date. Required to get positioning of days in month.
 */
function populateEventWrappers(date) {
  const eventsContainer = document.querySelector('.events-container');
  clearContainerNode(eventsContainer);

  const numDays = getDaysInMonth(date.getMonth(), date.getFullYear());
  for (let day = 1; day <= numDays; day += 1) {
    const eventWrapper = document.createElement('event-wrapper');
    eventsContainer.appendChild(eventWrapper);

    // Update date object
    date.setDate(day);

    eventWrapper.initialise({
      date,
      saveDataCallback: () => {
        saveEvents();
        saveTasks(date, document.querySelector('.task-wrapper bullet-list').getBulletTree());
      },
    });
  }
}

/**
 * Fill contents of BulletList with current month's tasks.
 * @param {Date} date Current date. Used to determine month to get bullets for.
 */
function setTaskEditor(date) {
  // Get data from storage or set to initial data
  const storageKey = getMonthlyLogUID('task', date);
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
 * Update Event Logs for given date.
 * @param {Date} date Date to update logs for. Should be day or month to view bullets for.
 */
export default function updateLogs(date) {
  populateEventWrappers(date);
  setTaskEditor(date);
}
