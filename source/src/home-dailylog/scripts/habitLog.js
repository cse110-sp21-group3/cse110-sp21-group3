class DailyHabit extends HTMLElement {
  constructor() {
    super();
    const template = document.createElement('template');
    template.innerHTML = `
        <style>
            .daily-habit {
                display: flex;
                flex-direction: row;
                text-align: center;
                flex-grow: 1;
                align-items: center;
                width: 100%;
                margin: 1rem;
            }

            #title {
                font-size: 3xl;
                margin: 1rem;
            }

            #habit-circle {
              border-radius: 100%;
              height: 2.5rem;
              width: 2.5rem;
              background-color: #dbdbdb;
            }

            #habit-circle:hover {
              cursor: pointer;
            }
        </style>
        <!-- Template -->
        <div class="daily-habit">
          <div id="habit-circle"></div>
          <h2 id="title">habit</h2>
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
    this.id = habit;
    this.setAttribute('habit', habit);
  }

  get color() {
    return this.getAttribute('color');
  }

  set color(color) {
    this.setAttribute('color', color);
  }
}

customElements.define('daily-habit', DailyHabit);
