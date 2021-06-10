import abstractview from "./abstractview.js";


export default class trendview extends abstractview{
    constructor(a) {
        super(a);
    }
    getScripts() {
        let sourcelist = ["../components/Navbar/navbar.js",
        "../components/Menu/menu.js",
        "../trends/scripts/trends.js",
        "../trends/components/tracker.js"];
       
        return sourcelist;
    }
    getHead() {
        return `
        
        <div id="bar"></div>
        `
    }
    getStyles() {
      let sourcelist = ["../trends/css/styles.css"]; 
        return sourcelist;
    }
    getBody () {
        return `
        
        <div id="tracker-body"></div>
    <div id="addForm" class="modal">
      <!-- Modal content -->
      <div class="modal-content">
        <span class="close-form" id="add-close-form">&times;</span>
        <form>
          <input type="text" id="habit-field" placeholder="Add habit here..." maxlength="60">
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