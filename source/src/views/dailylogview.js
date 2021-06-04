import abstractview from "./abstractview.js";


export default class dailylog extends abstractview{
    constructor(a) {
        super(a);
    }
    async getScripts() {
        let sourcelist = ["../src/components/TextEditor/Bullet/DailyLogBullet.js",
        "../src/components/TextEditor/BulletList.js",
        "../src/home-dailylog/scripts/dailyLog.js",
        "../src/components/Navbar/navbar.js",
        "../src/components/Menu/menu.js"]; 
        return sourcelist;
    }
    async getHead() {
        return `
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Home</title>
        <link rel="stylesheet" href="../src/home-dailylog/css/styles.css">
        `
    }
    async getBody () {
        return `
        
    <navbar-elem></navbar-elem>

    <header>
        <div class="top-header">
            <div class="menu">
              <img src="../src/menu-icon.png">
            </div>
          <h1 id="header-title">Journal Title</h1>
          <div></div>
        </div>
        <p class="question">Please add what you did related to your theme as a theme bullet</p>
      </header>    


    <main>
        <div class="log-body">
          <div class="daily-log">
            <div class="daily-log-title">
              <p>daily log</p>
              <p class="date"></p>
              <div class="tooltip">
                <button class="refresh-date">&#x21bb;</button>
                <span class="tooltiptext">Refresh Current Date</span>
              </div>
              <div class="tooltip">
                <button class="info">?</button>
                <span class="tooltiptext">
                  Keyboard Shortcuts<br>
                  Enter: create new bullet <br>
                  Tab: nest bullet<br>
                  Delete/Backspace: delete bullet<br>
                  Shift + Enter: exit nesting <br>
                  Up Arrow: move 1 bullet up<br>
                  Down Arrow: move 1 bullet down<br>
                  Control + S: save current bullets <br>
                  Control + C: toggle complete bullet (strike/unstrike)<br>
                  Control + P: priority bullet (bold)<br>
                  Control + I: inspiration bullet (italics) <br>
                  Control + O: regular style bullet <br>
                  Hover to the left of the bullet, and toggle the bullet type. 
                  Bullet Types: <br>
                  Task: &bull;, Note: &ndash;, Event: &#9702;, Theme: &#11088; <br>
                </span>
              </div>
            </div>
            <bullet-list></bullet-list> 
          </div>
          <div class="habits">
            <p>habits</p>
            <div class="habits-form">
            </div>
          </div>
        </div>

    </main>
        `
    }
}