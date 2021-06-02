class Tracker extends HTMLElement {
  constructor() {
    super();
    const template = document.createElement('template');
    template.innerHTML = `
        <style>
            :host {
              width: 30%;
              height: 50%;
              margin: 1rem;
            }

            .habit {
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

            .habit-header {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 100%;
            }

            #habit-color {
              border-radius: 100%;
              height: 1.5rem;
              width: 1.5rem;
              cursor: pointer;
            }

            #habit-grid {
              display: flex;
              flex-wrap: wrap;
              align-items: center;
              width: 100%;
              background-color: white;
              border-radius: 1.5rem;
              box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
            }
        </style>
        <!-- Template -->
        <div class="delete-div">
          <span class="delete-tracker">&times;</span>
        </div>
        <div class="habit">
            <div class="habit-header">
              <h1 id="title">habit</h1>
              <div id="habit-color"></div>
            </div>
            <div id="habit-grid"></div>
        </div>`;
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  /**
   * Habit name
   */
  get habit() {
    return this.getAttribute('habit');
  }

  set habit(habit) {
    // Set title of grid and id of div to habit
    const title = this.shadowRoot.querySelector('#title');
    title.innerHTML = habit;
    const grid = this.shadowRoot.querySelector('.habit');
    grid.id = habit;
    this.setAttribute('habit', habit);
  }

  get color() {
    return this.getAttribute('color');
  }

  set color(color) {
    const habitColor = this.shadowRoot.querySelector('#habit-color');
    habitColor.style.backgroundColor = color;
    this.setAttribute('color', color);
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
}

customElements.define('tracker-elem', Tracker);
