import abstractview from "./abstractview.js";


export default class journalname extends abstractview{
    constructor(a) {
        super(a);
    }
    getScripts() {
        let sourcelist = ["../src/journal-creation/components/JournalIcon.js",
        "../src/journal-creation/scripts/nameJournal.js",
        "../src/colorThemes.js"]
        return sourcelist;
    }
    getHead() {
        return `
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Name your Journal</title>
        <link rel="stylesheet" href="../src/journal-creation/creation-styles.css">
        `
    }
    getBody () {
        return `
        <h1 id="name-journal-title" class="standard-h1">Name your Journal</h1>
        <journal-icon></journal-icon> 
        <div class="center-container">
            <input type="text" id="name-input" placeholder="Enter Journal Name...">
        </div>
        <button id="submit-name" class="submit">Next</button>
        `
    }
}