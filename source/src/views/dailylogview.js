import abstractview from "./abstractview.js";


export default class dailylog extends abstractview{
    constructor(a) {
        super(a);
    }
    getScripts() {
        let sourcelist = ["../src/components/TextEditor/Bullet/DailyLogBullet.js",
        
        "../src/home-dailylog/scripts/dailyLog.js",
        "../src/components/Navbar/navbar.js",
        "../src/components/Menu/menu.js",
        "../src/home-dailylog/components/habitLog.js"]; 
        return sourcelist;
    }
    getHead() {
        return `
        <p class="question">Please add what you did related to your theme as a theme bullet</p>
        `
    }
    getStyles() {
      let sourcelist = ["../src/home-dailylog/css/styles.css"]; 
        return sourcelist;
    }
    getBody () {
        return `
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
            <p><a href="../trends/trends.html">habits</a></p>
            <div class="habits-form">
            </div>
          </div>
        </div>
 
        `
    }
}