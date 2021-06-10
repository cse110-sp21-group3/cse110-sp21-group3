import Settings from './views/settingsview.js';
import Trends from './views/trendview.js';
import Home from './views/dailylogview.js';
import Collections from './views/collectionsview.js';
import MonthlyLog from './views/monthly-logviews.js';
import PastLogs from './views/pastdailylogview.js';
const body = document.body.getElementsByTagName('main')[0];
const header_title = document.getElementById("header-title");
const header = document.querySelector('.header_content');
const header_top = document.querySelector('.header_above_content');

export const router = {};
//set the state 
router.setState =  async (state, statePopped) => {
    console.log(document.body.id == state + '-body');
    if(document.body.id == state + '-body') {
        return;
    }
    if(document.body.querySelector(".past-dailylogs-container")) {
        document.body.removeChild(document.querySelector(".past-dailylogs-container"));
    }
    body.style.display = "none";
    header.style.display = "none";
    //header_title.style.display = "none";
    header_top.innerHTML = "";
    document.body.id = "";
    let current_view;
    let title;
    switch (state) {
        case 'settings':
            current_view = new Settings();
            title = "Settings";
            header_title.innerHTML = "Settings";
            break;      
        case 'trends':
            title = "trends";
            header_title.innerHTML = "Trends";
            current_view = new Trends();
            header_top.innerHTML = `
            <div id="add-div">
                <div id="add">
                    <p>+</p>
                </div>
            </div>`;
            title = 'Trends';
            break;
        case 'past-logs':
            title = "past-logs";
            header_title.innerHTML = "";
            current_view = new PastLogs();
            header_top.innerHTML = `
            <label for="date-input" id="date-input-label"></label>
            <label for="date-input" id="dash">-</label>
            <input type="date" id="date-input" class="pl-title">`;
            //<div class="past-dailylogs-container"><bullet-list></bullet-list</div>
            const element = document.createElement("div");
            element.classList.add("past-dailylogs-container");
            const subElement = document.createElement("bullet-list");
            element.appendChild(subElement);
            document.body.appendChild(element);
            title = 'Trends';
            break;
        case 'home':
            current_view = new Home();
            title = 'home';
            break;
        case 'monthly-log':
            header_title.innerHTML = "Monthly Log";
            current_view = new MonthlyLog();
            title = 'Monthly Log';
            break;
        case 'collections':
            header_title.innerHTML = "Collections";
            current_view = new Collections();
            title = 'Collection';
            header_top.innerHTML = `
            <div id="add-div">
                <div id="add">
                    <p>+</p>
                </div>
            </div>

          `;
            break;
        default:
            current_view = new Home();
            title = 'Home';
        }
        //this adds the css and other stuff for the head
     
        
        
        let styleList =   await current_view.getStyles();
        let newCSS;
        styleList.forEach(source => {
            let sources = document.createElement("link");
                //sources.classList.add = "dummy"
                sources.setAttribute("rel", "stylesheet");
                sources.setAttribute("href", source);
                sources.setAttribute("temp_keep", "true");
                newCSS = sources;
                document.head.appendChild(sources);
        });
        

        let removed =  document.head.getElementsByTagName("link");
        console.log(removed);
        if (removed) {
            Array.from(removed).forEach(remove => {
                if (!(remove.getAttribute("keep") == "true" || remove.getAttribute("temp_keep") == "true")) {
                    document.head.removeChild(remove);
                }
                
            });
            Array.from(removed).forEach(remove => {
                if (remove.getAttribute("temp_keep") == "true") {
                    remove.setAttribute("temp_keep", "false");
                }
                
            });
        }
        removed =  document.body.getElementsByTagName("script");
        console.log(removed);
        if (removed) {
            Array.from(removed).forEach(remove => {
                console.log(remove);
                if (remove.getAttribute("keep") != "true") {
                    document.body.removeChild(remove);
                }
                
            });
            
        }
        
        let Updated = false;
        while (!Updated) {
            console.log(newCSS);
            console.log(document.head.getElementsByTagName("link")[1]);
            console.log((newCSS=== document.head.getElementsByTagName("link")[1]));
            if (newCSS== document.head.getElementsByTagName("link")[1]) {
                console.log("plz run now");
                Updated= true;
            }
        }
        //this adds the html 
        body.innerHTML =  await current_view.getBody();
        header.innerHTML = await current_view.getHead();
        console.log(body);
        //this adds the scripts
        let sourceList =  await current_view.getScripts();
        sourceList.forEach(source => {
            let sources = document.createElement("script");
                sources.setAttribute("keep", "false");
                sources.setAttribute("src", source);
                sources.setAttribute("type", "module");
                sources.classList.add = "forthispage";
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