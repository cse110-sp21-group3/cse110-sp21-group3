import Settings from './views/settingsview.js';
import JournalPicker from './views/journal-pickerview.js';
import NameJournal from './views/name-journalview.js';
import ThemeCreation from './views/theme-creationview.js';
import Trends from './views/trendview.js';
import Home from './views/dailylogview.js';
import Collections from './views/collectionsview.js';
import MonthlyLog from './views/monthly-logviews.js';
const body = document.body;

export const router = {};
//set the state 
router.setState = async (state, statePopped) => {
    document.body.id = "";
    let current_view;
    let sourcelist;
    switch (state) {
        case 'settings':
            current_view = new Settings();
            break;
        case 'journal-picker':
            current_view = new JournalPicker();
            break;
        case "name-journal":
            current_view = new NameJournal();
            break;
        case 'theme-creation':           
            current_view = new ThemeCreation();
            break;
        case 'trends':
            current_view = new Trends();
            break;
        case 'home':
            current_view = new Home();
            break;
        case 'monthly-log':
            current_view = new MonthlyLog();
            break;
        case 'collections':
            current_view = new Collections();
            break;
        default:
            current_view = new Home();
        }
        //this adds the css and other stuff for the head
        document.head.innerHTML = await current_view.getHead();
        //this adds the html 
        document.body.innerHTML = await current_view.getBody();
        //this adds the scripts
        let sourceList =  await current_view.getScripts();
        sourceList.forEach(source => {
            let sources = document.createElement("script");
                sources.classList.add = "forthispage";
                sources.setAttribute("src", source);
                sources.setAttribute("type", "module");
                document.body.appendChild(sources);
        });

        //for event listners
        document.body.id = state + '-body';

        //this is for history
        if(!statePopped && window.location.hash != `#${state}`) {
            if (window.location.hash == '/' && state == home) {} else {
            pushToHistory(state);
            }
        }
      
}
/**
 * Push a new state to the history stack
 * @param {string} state The new page to set the state of
 * @param {number} entryNum if state is 'entry', then entryNum is the num
*/
export function pushToHistory(state) {
    switch (state) {
        case 'settings':
            history.pushState({ page: 'settings' }, '', './#settings');
            break;
        case 'trends':
            history.pushState({ page: `trends` }, '', `./#trends`);
            break;
        case 'monthly-log':
            history.pushState({ page: `home` }, '', `./#monthly-log`);
            break;
        case 'collections':
            history.pushState({ page: `collections` }, '', `./#collections`);
            break;
        case 'home':
            history.pushState({ page: `home` }, '', `./`);
            break;
        default:
            history.pushState({}, '', './');
    }
    return history;
  }