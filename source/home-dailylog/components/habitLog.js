/**
 * The representation of a day's habit. It is represented by a circle tagged by name.
 */
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
                font-size: x-large;
                margin: 1rem;
            }

            #habit-circle {
              border-radius: 100%;
              min-height: 2.5rem;
              min-width: 2.5rem;
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
   * Get the name of the habit this circle represents.
   * @returns The name of the habit this circle represents.
   */
  get habit() {
    return this.getAttribute('habit');
  }

  /**
   * Set the habit that this circle represents.
   */
  set habit(habit) {
    // Set title of grid and id of div to habit
    const title = this.shadowRoot.querySelector('#title');
    title.innerHTML = habit;
    this.id = habit;
    this.setAttribute('habit', habit);
  }

  /**
   * Get the color of the habit circle.
   */
  get color() {
    return this.getAttribute('color');
  }

  /**
   * Set the color of the habit circle.
   */
  set color(color) {
    this.setAttribute('color', color);
  }
}

customElements.define('daily-habit', DailyHabit);
