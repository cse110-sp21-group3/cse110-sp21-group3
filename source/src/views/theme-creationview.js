import abstractview from "./abstractview.js";


export default class themecreation extends abstractview{
    constructor(a) {
        super(a);
    }
    getScripts() {
        let sourcelist = ["../src/journal-creation/scripts/themeCreation.js"];
        return sourcelist;
    }
    getHead() {
        return `
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Set theme</title>
        <link rel="stylesheet" href="../src/journal-creation/creation-styles.css">
        `
    }
    getBody () {
        return `
        <div class = "dropdown"> 
        <span id="theme-onboarding"><u>What is the Theme System?</u></span>
            <div class = "dropdown-content">
                <p>The <b><u>theme system</u></b> is an easy way for you to make progress towards a certain theme that you can keep in mind during your day-to-day decision making. The theme system encourages self-reflection and helps gradually modify human behavior rather than brutely trying to force change on certain aspects of your life. 
                    <br><br>
                    For an even better understanding of the theme system, watch the following video
                    <iframe src="https://www.youtube.com/embed/NVGuFdX5guE" title="YouTube video player" frameborder="0" allowfullscreen id="theme-onboarding"></iframe>
                    If you cannot access the video above, please follow <a href= "https://www.youtube.com/watch?v=NVGuFdX5guE" target="_blank"><u>this</u></a> link.
                </p>
            </div>
        </div>
        <div>
            <h1 class="standard-h1">What is your theme?</h1>
            <input type="text" id="theme-input">

            <h1 class="standard-h1">Can't think of one?</h1>
            <div id="theme-suggestions"></div>
        </div>
        <button id="submit-theme" class="submit">Next</button>
        `
    }
}