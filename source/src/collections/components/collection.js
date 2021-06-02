class Collection extends HTMLElement {
  constructor() {
    super();
    const template = document.createElement('template');
    template.innerHTML = `
        <style>
        :host {
          width: 30%;
          height: 100%;
          margin: 1rem;
        }
        .collection {
            display: flex;
            flex-direction: column;
            text-align: center;
            flex-grow: 1;
            height: 100%;
        }
        .delete-div {
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
          width: 100%;
        }
        .delete-tracker {
            color: #aaa;
            font-size: 28px;
            font-weight: bold;
            visibility: hidden;
        }
        :host(:hover) .delete-tracker {
            visibility: visible;
        }
        .delete-tracker:hover, .delete-tracker:focus {
            color: black;
            text-decoration: none;
            cursor: pointer;
        }
        #title {
            font-size: 3xl;
            margin: 1rem;
        }
        #collection-grid {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          width: 100%;
          flex-grow: 1;
          min-height: 10rem;
          height: fit-content;
          background-color: white;
          border-radius: 1.5rem;
        }
        .modalText {
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
        
        .modalText-content {
            background-color: #efefef;
            margin: 15% auto; /* 15% from the top and centered */
            padding: 20px;
            border: 1px solid #888;
            width: 80%; /* Could be more or less, depending on screen size */
        }
        
        .textBox-title {
            text-align: center;
        }

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
        <!-- Template -->
        <div class="delete-div">
          <span class="delete-tracker">&times;</span>
        </div>
        <div class="collection">
            <h1 id="title">collection</h1>
            <div id="collection-grid"></div>
        </div>

        <div id="modalText" class="modalText">

          <div class="modalText-content">
            <span class="close-form">&times;</span>
            <h1 class="textBox-title">collection_name</h1>
            <bullet-list></bullet-list>
          </div>

        </div>`;
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  /**
   * Collection name
   */
  get collection() {
    return this.getAttribute('collection');
  }

  set collection(collection) {
    // Set title of grid and id of div to collection
    const title = this.shadowRoot.querySelector('#title');
    title.innerHTML = collection;
    const grid = this.shadowRoot.querySelector('.collection');
    grid.id = collection;
    this.setAttribute('collection', collection);
  }

  // get color() {
  //   return this.getAttribute('color');
  // }

  // set color(color) {
  //   this.setAttribute('color', color);
  // }

  /**
   * Keyname for storage
   */
  get keyname() {
    return this.getAttribute('keyname');
  }

  set keyname(keyname) {
    this.setAttribute('keyname', keyname);
  }
}

customElements.define('collection-elem', Collection);