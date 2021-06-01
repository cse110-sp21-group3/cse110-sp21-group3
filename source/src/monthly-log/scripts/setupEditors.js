
// Month to number of days map
const monthOrder = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31,]

export function populateEventWrappers(emptyData){
    const eventsContainer = document.querySelector('.events-container');
    const eventWrapper = document.createElement('event-wrapper');
    eventsContainer.appendChild(eventWrapper);
    
    const date = new Date();
    const numDays = monthDays[date.getMonth()];
    for (let day = 1; day <= numDays; day++){
        const eventWrapper = document.createElement('event-wrapper');
        eventsContainer.appendChild(eventWrapper);
        eventWrapper.initialise({
            dayNum: day,
            dataTree: {...emptyData}
        });
    }
}

export function setTaskEditor(dataTree){
    // Initialise bullet-list
    const taskList = document.querySelector('bullet-list#task-editor');
    taskList.initialiseList({
        saveDataCallback: (data) => {
            console.log('Attempting to save data for tasks', data);
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
            `
        }
    });
}