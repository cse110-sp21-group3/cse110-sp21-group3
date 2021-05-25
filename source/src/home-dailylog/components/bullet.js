class BulletLog extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement('template');

    template.innerHTML = `

            <style>
                /* Entry (bullet log) display */
                .entry {
                    margin-left: 30px;
                    border-radius: 6px;
                    list-style-type: none;
                    width: 90%;
                    text-align: left;
                    padding-left: 20px;
                    display: flex;
                    align-items: center;
                }

                .entry p {
                    display: inline-block;
                    font-size: 20px;
                    max-width: 70%;
                    overflow: scroll;
                }

                .type {
                    margin-right: 5px;
                }

                /* entry buttons */
                .completeBtn {
                    display: none;
                    margin-left: auto;
                    margin-right: 10px;
                }
                .nestBtn {
                    display: none;
                    margin-right: 10px;
                }
                .editBtn {
                    display: none;
                    margin-right: 10px;
                }              
                .deleteBtn {
                    display: none;  
                }

                /* hover over main bullet */
                .entry:hover .completeBtn {
                    display: inline-block
                }
                .entry:hover .nestBtn {
                    display: inline-block
                }
                .entry:hover .editBtn {
                    display: inline-block;
                }
                .entry:hover .deleteBtn {
                    display: inline-block;
                }

                /* nested bullet */
                .nested {
                    display: none;
                }

                /* hover over nested bullet */
                .nested:hover .nestedCompleteBtn {
                    display: inline-block
                }
                .nested:hover .nestedSubmitBtn {
                    display: inline-block;
                }
                .nested:hover .nestedDeleteBtn {
                    display: inline-block;
                }

                .nestedContent {
                    width: 60%;       
                    white-space: nowrap;
                    overflow: scroll;
                }

                /* nested bullet buttons */
                .nestedCompleteBtn {
                    display: none;
                    margin-left: auto;
                    margin-right: 10px;
                }
                .nestedSubmitBtn {
                    display: none;
                    margin-right: 10px;
                }
                .nestedDeleteBtn {
                    display: none;  
                }

                /* The Modal (background) */
                .modal {
                    display: none; /* Hidden by default */
                    position: fixed; /* Stay in place */
                    z-index: 1; /* Sit on top */
                    left: 0;
                    top: 0;
                    width: 100%; /* Full width */
                    height: 100%; /* Full height */
                    overflow: auto; /* Enable scroll if needed */
                    background-color: rgb(0,0,0); /* Fallback color */
                    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
                }
                
                /* Modal Content/Box */
                .modal-content {
                    background-color: #efefef;
                    margin: 15% auto; /* 15% from the top and centered */
                    padding: 20px;
                    border: 1px solid #888;
                    width: 50%; /* Could be more or less, depending on screen size */
                    border-radius: 20px;
                }

                #bullet {
                    border-radius: 20px;
                    width: 90%;
                    border: none;
                    padding: 10px;
                    margin-bottom: 5px;
                }

                .selectors {
                    display: flex;
                }

                .type {
                    margin-right: 5%;
                }

                #bullet-type {
                    border-radius: 5px;
                    border: 1px solid #888;
                    margin-bottom: 5px;
                    width: 100%;
                }

                #bullet-modifier {
                    border-radius: 5px;
                    border: 1px solid #888;
                    margin-bottom: 5px;
                }

                /* submit button */
                .submit {
                    display: flex;
                    justify-content: flex-end;
                }

                #submitForm {
                    border-radius: 5px;
                    border: 1px solid #888;
                }

                #submitForm:hover {
                    background-color: #A4A4A4;
                    color: white;
                }
                
                /* The Close Button */
                .close-form {
                    color: #aaa;
                    float: right;
                    font-size: 28px;
                    font-weight: bold;
                }
                
                .close-form:hover,
                .close-form:focus {
                    color: black;
                    text-decoration: none;
                    cursor: pointer;
                }

            </style>

            <!-- Template from home.html -->
            <div class="entry">
                <p class="modifier">Modifier</p>
                <p class="type">Type</p>
                <p class="content">Bullet Content</p>
                <input type="checkbox" class="completeBtn"/>
                <button class="nestBtn">Nest</button>
                <button class="editBtn">Edit</button>
                <button class="deleteBtn">Delete</button>
            </div>
            <div class="nested">
                <p class="nestedContent" contenteditable="true">(*/!)(&bull;/&ndash;/&#9702;/&#11088;)(Add thoughts here...)</p>
                <input type="checkbox" class="nestedCompleteBtn"/>
                <button class="nestedSubmitBtn">Submit</button>
                <button class="nestedDeleteBtn">Delete</button>
             </div>

            <!-- Edit modal -->
            <div id="editForm" class="modal">
            <div class="modal-content">
                <span class="close-form">&times;</span>
                <form>
                <input type="text" id="bullet" placeholder="Add thoughts here..." maxlength="60">
                <br>
                <div class="selectors">
                    <div class="type">
                    <label for="bullet-type">Type of bullet</label>
                    <br>
                    <select id="bullet-type" name="bullet-type">
                        <option value="event">event</option>
                        <option value="task">task</option>
                        <option value="note">note</option>
                        <option value="theme">theme</option>
                    </select>
                    </div>
                    <div>
                    <label for="bullet-type">Modifier</label>
                    <br>
                    <select id="bullet-modifier" name="bullet-modifier">
                        <option value="none">none</option>
                        <option value="importance">importance</option>
                        <option value="inspiration">inspiration</option>
                    </select>
                    </div>
                </div>
                <div class="submit">
                    <button type="button" id="submitForm">Submit</button>
                </div>
                </form>
            </div>
            
        `;

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  /**
     * Entry
     */
  get entry() {
    return this.getAttribute('entry');
  }

  set entry(entry) {
    // set modifier
    const modifier = this.shadowRoot.querySelector('.modifier');
    if (entry.modifier === 'importance') {
      modifier.innerHTML = '*';
    } else if (entry.modifier === 'inspiration') {
      modifier.innerHTML = '!';
    } else {
      modifier.innerHTML = ' ';
    }

    // set type
    const type = this.shadowRoot.querySelector('.type');
    if (entry.type === 'task') {
      type.innerHTML = '&bull;';
    } else if (entry.type === 'note') {
      type.innerHTML = '&ndash;';
    } else if (entry.type === 'event') {
      type.innerHTML = '&#9702;';
    } else {
      type.innerHTML = '&#11088;'; // theme system star
    }

    // set content (text)
    const content = this.shadowRoot.querySelector('.content');
    content.innerHTML = entry.content;

    this.setAttribute('entry', entry);
  }

  /**
     * Modifier (importance, inspiration, none)
     */
  get modifier() {
    return this.getAttribute('modifier');
  }

  set modifier(modifier) {
    this.setAttribute('modifier', modifier);
  }

  /**
     * Type (note, event, task, theme)
     */
  get type() {
    return this.getAttribute('type');
  }

  set type(type) {
    this.setAttribute('type', type);
  }

  /**
     * Content (logging)
     */
  get content() {
    return this.getAttribute('content');
  }

  set content(content) {
    this.setAttribute('content', content);
  }

  /**
     * Keyname for storage
     */
  get keyname() {
    return this.getAttribute('keyname');
  }

  set keyname(keyname) {
    this.setAttribute('keyname', keyname);
  }

  /**
     * Completed or not completed
     */
  get completed() {
    return this.getAttribute('completed');
  }

  set completed(completed) {
    this.setAttribute('completed', completed);
  }

  /**
     * Nested Bullet Log Entry
     */
  get nestedEntry() {
    return this.getAttribute('nestedEntry');
  }

  set nestedEntry(nestedEntry) {
    this.setAttribute('nestedEntry', nestedEntry);
  }

  // whether nested bullet is added for main bullet
  get nestedAdded() {
    return this.getAttribute('nestedAdded');
  }

  set nestedAdded(nestedAdded) {
    this.setAttribute('nestedAdded', nestedAdded);
  }

  // nested bullet content (input field)
  get nestedContent() {
    return this.getAttribute('nestedContent');
  }

  set nestedContent(nestedContent) {
    this.setAttribute('nestedContent', nestedContent);
  }

  // whether nested bullet is completed
  get nestedCompleted() {
    return this.getAttribute('nestedCompleted');
  }

  set nestedCompleted(nestedCompleted) {
    this.setAttribute('nestedCompleted', nestedCompleted);
  }
}

customElements.define('bullet-log', BulletLog);
