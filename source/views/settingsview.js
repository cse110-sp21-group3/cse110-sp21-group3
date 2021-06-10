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
        let sourcelist = ["../settings/css/styles.css"]; 
          return sourcelist;
      }
    getScripts() {
        let sourcelist = ["../journal-creation/components/JournalIcon.js",
            "../settings/scripts/journalPicker.js",
            "../colorThemes.js",
            "../settings/scripts/settings.js",
            "../components/Navbar/navbar.js",
            "../components/Menu/menu.js"]
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