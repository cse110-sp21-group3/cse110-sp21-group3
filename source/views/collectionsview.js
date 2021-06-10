import abstractview from "./abstractview.js";


export default class collectionsview extends abstractview{
    constructor(a) {
        super(a);
    }
    getScripts() {
        let sourcelist = ["../collections/scripts/collections.js",
        "../collections/components/collection.js",
        "../components/TextEditor/Bullet/TaskBullet.js",
        "../components/TextEditor/BulletList.js",
        "../components/Navbar/navbar.js",
        "../components/Menu/menu.js"];
        return sourcelist;
    }
    getStyles() {
      let sourcelist = ["../settings/css/styles.css"]; 
        return sourcelist;
    }
    getHead() {
        return `
        <div id="bar"></div>
        `
    }
    getStyles() {
      let sourcelist = ["../collections/css/styles.css"]; 
        return sourcelist;
    }
    getBody () {
        return `
        <!-- Sets up grid to display collections -->
        <div id="tracker-body"></div>
        <div id="addForm" class="modal">
            <!-- Modal content to create a new collection-->
            <div class="modal-content">
            	<span class="close-form">&times;</span>
              <form>
                <input type="text" id="collection" placeholder="Add new collection here..." maxlength="60">
                <br>
                <p id="error" class="e-text"></p>
                <div class="submit">
                  <button type="button" id="submitForm">Submit</button>
                </div>
              </form>
            </div>
        </div>
        <template>
            <div id="collection">
                <h1 class="title">Collection</h1>
                <div class="collection-grid"></div>
            </div>
        </template>
        `
    }
}