import abstractview from "./abstractview.js";


export default class extends abstractview{
    constructor(a) {
        super(a);
    }
    getHead() {
        return `
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="../src/settings/css/styles.css">
        
        `
    }
    getScripts() {
        let sourcelist = ["../src/journal-creation/components/JournalIcon.js",
            "../src/settings/scripts/journalPicker.js",
            "../src/colorThemes.js",
            "../src/settings/scripts/settings.js",
            "../src/components/Navbar/navbar.js",
            "../src/components/Menu/menu.js"]
        return sourcelist;
    }
    getBody () {
        return `
        <navbar-elem></navbar-elem>
        <div class="header">
            
            <div class="heading">
              <div class="menu">
                  <img src="../src/menu-icon.png">
              </div>
              <h1 id="header-title">settings</h1>
              <div></div>
            </div>
          </div>
          <div id="journal-name">
              <p id="journal-name-title">Journal Name</p>
              <span id="journal-name-edit" contenteditable></span>
          </div>
          <div id="journal-color">
              <p id="journal-color-title">Journal Color</p>
              <div id="journals-container"></div>
          </div>
          <div id="journal-theme">
              <p id="journal-theme-title">Journal Theme</p>
              <span id="journal-theme-edit" contenteditable></span>
          </div>
          <button id="save">Save</button>
          
        
        `
    }
}