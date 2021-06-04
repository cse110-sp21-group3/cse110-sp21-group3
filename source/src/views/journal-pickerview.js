import abstractview from "./abstractview.js";


export default class settingsview extends abstractview{
    constructor(a) {
        super(a);
    }
    getScripts() {
        let sourcelist = ["../src/journal-creation/components/JournalIcon.js",
            "../src/journal-creation/scripts/journalPicker.js", 
            "../src/colorThemes.js"];
        return sourcelist;
    }
    getHead() {
        return `
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Pick your Journal Style</title>
        <link rel="stylesheet" href="../src/journal-creation/creation-styles.css">
        `
    }
    getBody () {
        return `
        <h1 class="standard-h1">Create a Journal</h1>
        <div id="journals-container"></div>
        `
    }
}