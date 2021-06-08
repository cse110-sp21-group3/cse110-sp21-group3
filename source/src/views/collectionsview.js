import abstractview from "./abstractview.js";


export default class collectionsview extends abstractview{
    constructor(a) {
        super(a);
    }
    getScripts() {
        let sourcelist = ["../src/collections/scripts/collections.js",
        "../src/collections/components/collection.js",
        "../src/components/TextEditor/Bullet/TaskBullet.js",
        "../src/components/TextEditor/BulletList.js",
        "../src/components/Navbar/navbar.js",
        "../src/components/Menu/menu.js"];
        return sourcelist;
    }
    getStyles() {
      let sourcelist = ["../src/settings/css/styles.css"]; 
        return sourcelist;
    }
    getHead() {
        return `
        <h1 id="header-title">Collections</h1>
            <div id="add-div">
              <div id="add">
                <p>+</p>
              </div>
            </div>
			  <div id="bar"></div>
		<link rel="stylesheet" href="../src/collections/css/styles.css">
        `
    }
    getBody () {
        return `
        <navbar-elem></navbar-elem>
        
        <div class="header">
          <div class="heading">
            <div class="menu">
              <img src="../src/menu-icon.png">
            </div>
            <h1 id="header-title">Collections</h1>
            <div id="add-div">
              <div id="add">
                <p>+</p>
              </div>
            </div>
          </div>
			    <div id="bar"></div>
        </div>
        
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