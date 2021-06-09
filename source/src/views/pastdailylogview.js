import abstractview from "./abstractview.js";


export default class monthlylogview extends abstractview{
    constructor(a) {
        super(a);
    }
    getScripts() {
        let sourcelist = ["../src/monthly-log/scripts/monthlylog.js",
        '../src/monthly-log/components/EventWrapper.js',
        "../src/components/TextEditor/Bullet/SimpleBullet.js",
        "../src/components/TextEditor/BulletList.js",
        "../src/components/TextEditor/Bullet/TaskBullet.js",
        "../src/colorThemes.js"];
        return sourcelist;
    }
    getHead() {
        return `
        
        `
    }
    getStyles() {
        let sourcelist = ["../src/monthly-log/monthlylog.css"]; 
          return sourcelist;
    }
    getBody () {
        return `
        
        <div id="log-container">
            <div id="events">
                <input type="month" class="month-input"/>
                <div class="events-container"></div>
            </div>
            <div class="tasks-container">
                <div class="subtitle">Tasks</div>
                <div class="task-wrapper"></div>
            </div>
        </div>
     
        `
    }
}