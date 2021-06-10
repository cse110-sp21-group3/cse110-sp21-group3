/**
 * Component representing a collection.
 */
class Collection extends HTMLElement {
  constructor() {
    super();
    const template = document.createElement('template');
    this.collectionName = '';
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
            margin: 1rem;
            text-align: center;
        }
        
        #collection-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
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

        .save {
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
            <div id="collection-grid">
                <h1 id="title">collection</h1>
            </div>
        </div>

        <div id="modalText" class="modalText">

          <div class="modalText-content">
            <span class="close-form">&times;</span>
            <h1 class="textBox-title">collection_name</h1>
          </div>

        </div>`;
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  /**
   * Returns the saved bullets for the current collection, in the following format:
   *
   * ```
   * {
   *   0: [number] // bullets at first level of collection
   *   id: [contentOfBullet, completed, typeOfBullet, bulletModifier, bulletChildren]
   * }
   * ```
   * @returns An object representing the collection's bullets in the mentioned format.
   */
  getSavedBullets() {
    // If nothing is stored, this is loaded : [content, completed, type, modifier, children]
    const initialSetup = { 0: [1], 1: ['', false, []] };
    let listDataTree = localStorage.getItem(this.collectionName);
    if (listDataTree === null) {
      listDataTree = initialSetup;
    } else {
      listDataTree = JSON.parse(listDataTree);
    }
    return listDataTree;
  }

  /**
   * Show the collection's modal.
   *
   * Displays the modal and also initializes its internal TextEditor component with
   * all existing bullets.
   */
  openCollection() {
    const listDataTree = this.getSavedBullets();
    this.shadowRoot.querySelector('.textBox-title').innerHTML = this.collectionName;
    this.shadowRoot.querySelector('#modalText').style.display = 'block';

    const bulletList = document.createElement('bullet-list');
    bulletList.initialiseList({
      saveDataCallback: (data) => {
        localStorage.setItem(this.collectionName, JSON.stringify(data));
      },
      nestLimit: 1,
      bulletTree: listDataTree,
      storageIndex: {
        value: 0,
        children: 2,
        completed: 1,
      },
      elementName: 'task-bullet',
    });
    this.shadowRoot.querySelector('.modalText-content').appendChild(bulletList);
  }

  /**
   * Hide the collection's modal.
   *
   * In order to preserve memory, it also removes the editor component.
   */
  closeCollection() {
    this.shadowRoot.querySelector('bullet-list').remove();
    this.shadowRoot.querySelector('#modalText').style.display = 'none';
  }

  /**
   * Get the collection name.
   */
  get collection() {
    return this.getAttribute('collection');
  }

  /**
   * Sets this collection's name.
   *
   * Also adjusts the HTMLElement's contents to reflect the new collection name change.
   */
  set collection(collection) {
    // Set title of grid and id of div to collection
    this.collectionName = collection;
    const title = this.shadowRoot.querySelector('#title');
    title.innerHTML = collection;
    const grid = this.shadowRoot.querySelector('.collection');
    grid.id = collection;
    this.setAttribute('collection', collection);
  }

  /**
   * Obtain the key used to store this collection in localStorage.
   */
  get keyname() {
    return this.getAttribute('keyname');
  }

  /**
   * Sets the key used to store this collection in localStorage.
   */
  set keyname(keyname) {
    this.setAttribute('keyname', keyname);
  }
}

customElements.define('collection-elem', Collection);
