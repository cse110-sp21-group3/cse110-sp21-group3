import abstractview from "./abstractview.js";


export default class trendview extends abstractview{
    constructor(a) {
        super(a);
    }
    getScripts() {
        let sourcelist = ["../src/components/Navbar/navbar.js",
        "../src/components/Menu/menu.js",
        "../src/trends/scripts/trends.js",
        "../src/trends/components/tracker.js",
        "../src/trends/components/grid.js"];
       
        return sourcelist;
    }
    getHead() {
        return `
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Trends</title>
        <link rel="stylesheet" href="../src/trends/css/styles.css"></link>
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
        <h1 id="header-title">trends</h1>
        <div id="add-div">
          <div id="add">
            <p>+</p>
          </div>
        </div>
      </div>
      <div id="bar"></div>
    </div>
    <div id="tracker-body"></div>
    <div id="addForm" class="modal">
      <!-- Modal content -->
      <div class="modal-content">
        <span class="close-form" id="add-close-form">&times;</span>
        <form>
          <input type="text" id="habit" placeholder="Add habit here..." maxlength="60">
          <br>
          <input type="color" id="colorpicker" value="#0000ff">
          <br>
          <p id="error">Please fill in habit field</p>
          <div class="submit">
            <button type="button" id="submitForm">Submit</button>
          </div>
        </form>
      </div>
    </div>
    <div id="delete-form" class="modal">
      <!-- Modal content -->
      <div id="delete-form-modal" class="modal-content">
        <span class="close-form" id="delete-close-form">&times;</span>
          <p id="delete-question"></p>
          <div id="button-group">
            <button type="button" id="yes">Yes</button>
            <button type="button" id="no">No</button>
          </div>
      </div>
    </div>
    <div id="edit-form" class="modal">
      <!-- Modal content -->
      <div id="edit-form-modal" class="modal-content">
        <span class="close-form" id="edit-close-form">&times;</span>
          <p>Pick a color</p>
          <input type="color" id="colorpicker" value="#0000ff">
          <div class="submit">
            <button type="button" id="submitEditForm">Submit</button>
          </div>
      </div>
    </div>

        `
    }
}