import abstractview from "./abstractview.js";


export default class monthlylogview extends abstractview{
    constructor(a) {
        super(a);
    }
    getScripts() {
        let sourcelist = ["../src/past-dailylogs/scripts/pastdailylogs.js"];
        return sourcelist;
    }
    getHead() {
        return `
        <div id="bar"></div>
        `
    }
    getStyles() {
        let sourcelist = ["../src/past-dailylogs/css/styles.css"]; 
          return sourcelist;
    }
    getBody () {
        return `
        
        
     
        `
    }
}