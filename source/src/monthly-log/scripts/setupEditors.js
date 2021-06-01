import { getMonthlyLogUID } from '../../storageKeys.js';

function getDaysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate(); // Day 0 gives the last day of previous month
}

/**
 *
 * @param {*} containerNode
 */
function clearContainerNode(containerNode) {
  while (containerNode.firstChild) {
    containerNode.removeChild(containerNode.firstChild);
  }
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
  for (let day = 1; day <= numDays; day += 1) {
    const eventWrapper = document.createElement('event-wrapper');
    eventsContainer.appendChild(eventWrapper);
    eventWrapper.initialise({
      dateForMonth: date,
      dayNum: day,
    });
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
      localStorage.setItem(storageKey, JSON.stringify(data));
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
                    font-family: 'Nunito', sans-serif;
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
