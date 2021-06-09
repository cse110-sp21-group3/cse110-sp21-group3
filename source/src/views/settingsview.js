import abstractview from "./abstractview.js";


export default class extends abstractview{
    constructor(a) {
        super(a);
    }
    getHead() {
        return `
        
        
        
        `
    }
    getStyles() {
        let sourcelist = ["../src/settings/css/styles.css"]; 
          return sourcelist;
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