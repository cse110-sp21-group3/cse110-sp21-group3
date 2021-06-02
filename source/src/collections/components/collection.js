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
        </style>
        <!-- Template -->
        <div class="delete-div">
          <span class="delete-tracker">&times;</span>
        </div>
        <div class="collection">
            <h1 id="title">collection</h1>
            <div id="collection-grid"></div>
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