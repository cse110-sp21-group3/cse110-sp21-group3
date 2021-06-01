class Tracker extends HTMLElement {
  constructor() {
    super();
    const template = document.createElement('template');
    template.innerHTML = `
        <style>
            .collection {
                display: flex;
                flex-direction: column;
                text-align: center;
                flex-grow: 1;
                height: 100%;
            }

            .delete-tracker {
                float: right;
                color: #aaa;
                font-size: 28px;
                font-weight: bold;
            }

            .delete-tracker:hover,
            .delete-tracker:focus {
                color: black;
                text-decoration: none;
                cursor: pointer;
            }

            #title {
                font-size: 3xl;
                margin: 1rem;
            }

            #collection-grid {
              display: grid;
              grid-template-rows: repeat(5, minmax(0, 1fr));
              grid-template-columns: repeat(7, minmax(0, 1fr));
              column-gap: 1rem;
              row-gap: 1rem;
              padding: 1rem;
              flex-grow: 1;
              background-color: white;
              border-radius: 1.5rem;
            }
        </style>
        <!-- Template -->
        <span class="delete-tracker">&times;</span>
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

customElements.define('tracker-elem', Tracker);