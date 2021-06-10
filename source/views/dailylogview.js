import abstractview from "./abstractview.js";


export default class dailylog extends abstractview{
    constructor(a) {
        super(a);
    }
    getScripts() {
      const sourcelist = ["../components/TextEditor/Bullet/DailyLogBullet.js",
      
      "../home-dailylog/scripts/dailyLog.js",
      "../components/Navbar/navbar.js",
      "../components/Menu/menu.js",
      "../home-dailylog/components/habitLog.js"]; 
      return sourcelist;
    }
    getHead() {
      return `
      <p class="question">Please add what you did related to your theme as a theme bullet</p>
      `;
    }
    getStyles() {
      const sourcelist = ["../home-dailylog/css/styles.css"]; 
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
                <button class="info">Keyboard Shortcuts</button>
                <div class="tooltiptext">
                  Keyboard Shortcuts<br>
                  <div class="shortcuts">
                    <div>
                      <span class="keyboard-shortcut">Enter</span>: create new bullet
                    </div>
                    <div>
                      <span class="keyboard-shortcut">Tab</span>: nest bullet
                    </div>
                    <div>
                      <span class="keyboard-shortcut">Del</span>: delete bullet
                    </div>
                    <div>
                      <span class="keyboard-shortcut">Shift</span> + <span class="keyboard-shortcut">Tab</span>: exit nesting
                    </div>
                    <div>
                      <span class="keyboard-shortcut">&uarr;</span>: move 1 bullet up
                    </div>
                    <div>
                      <span class="keyboard-shortcut">&darr;</span>: move 1 bullet down
                    </div>
                    <div>
                      <span class="keyboard-shortcut">Ctrl</span> + <span class="keyboard-shortcut">S</span>: save current bullets
                    </div>
                    <div>
                      <span class="keyboard-shortcut">Ctrl</span> + <span class="keyboard-shortcut">Shift</span> + <span class="keyboard-shortcut">X</span>: toggle complete bullet (strike/unstrike)
                    </div>
                    <div>
                      <span class="keyboard-shortcut">Ctrl</span> + <span class="keyboard-shortcut">B</span>: priority bullet (bold)
                    </div>
                    <div>
                      <span class="keyboard-shortcut">Ctrl</span> + <span class="keyboard-shortcut">I</span>: inspiration bullet (italics)
                    </div>
                    <div>
                      <span class="keyboard-shortcut">Ctrl</span> + <span class="keyboard-shortcut">R</span>: regular style bullet <br>
                    </div>
                    <div>
                      Hover to the left of the bullet, and toggle the bullet type.
                    </div>
                    <div>
                      Bullet Types: Task: &bull;, Note: &ndash;, Event: &#9702;, Theme: &#11088;
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <bullet-list></bullet-list> 
            <div class="saving"></div>
          </div>
          <div class="habits">
            <p>habits</p>
            <div class="habits-form">
            </div>
          </div>
        </div>
        `;
    }
}