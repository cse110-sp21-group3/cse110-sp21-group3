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
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Home</title>
        <link rel="stylesheet" href="../src/monthly-log/monthlylog.css">
        `
    }
    getBody () {
        return `
        <navbar-elem></navbar-elem>

        <header>
            <div class="top-header">
                <div class="menu"><img src="../src/menu-icon.png"></div>
                <h1 id="header-title">Monthly Log</h1>
                <div>
                    <input type="month" class="month-input"/>
                </div>

                
            </div>
        </header>    


        <main>
            <div id="log-container">
                <div class="events-container"></div>
                <div class="tasks-container">
                    <div class="subtitle">Tasks</div>
                    <div class="task-wrapper"></div>
                </div>
            </div>
        </main>
        `
    }
}