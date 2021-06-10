import abstractview from "./abstractview.js";


export default class monthlylogview extends abstractview{
    constructor(a) {
        super(a);
    }
    getScripts() {
        const sourcelist = ["../monthly-log/scripts/monthlylog.js",
        '../monthly-log/components/EventWrapper.js',
        "../components/TextEditor/Bullet/SimpleBullet.js",
        "../components/TextEditor/BulletList.js",
        "../components/TextEditor/Bullet/TaskBullet.js",
        "../colorThemes.js"];
        return sourcelist;
    }

    getHead() {
        return ``;
    }

    getStyles() {
        const sourcelist = ["../monthly-log/monthlylog.css"]; 
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
        `;
    }
}