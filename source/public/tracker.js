class Tracker extends HTMLElement {

    constructor () {
        super();

        const template = document.createElement('template');
        
        template.innerHTML = `
            <style>
                .habit {
                    display: flex;
                    flex-direction: column;
                    text-align: center;
                    flex-grow: 1;
                }

                .title {
                    font-size: 3xl;
                    margin: 1rem;
                }

                .habit-grid {
                    display: grid;
                    grid-template-rows: repeat(5, minmax(0, 1fr));
                    grid-template-columns: repeat(7, minmax(0, 1fr));
                    column-gap: 2rem;
                    row-gap: 1.5rem;
                    padding: 1rem;
                    flex-grow: 1;
                    background-color: white;
                    border-radius: 1.5rem;
                }
            </style>
            <!-- Template -->
            <div class="habit">
                <h1 class="title">habit</h1>
                <div class="habit-grid"></div>
            </div>`
            ;


        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(template.content.cloneNode(true))

    }

    /**
     * Habit name
     */
    get habit() {
        return this.getAttribute('habit');
    }

    set habit(habit) {
        // Set title of grid and id of div to habit
        const title = this.shadowRoot.querySelector('.title');
        title.innerHTML = habit;
        const grid = this.shadowRoot.querySelector('.habit');
        grid.id = habit;
        this.setAttribute('habit', habit);
    }

    get color() {
        return this.getAttribute('color');
    }

    set color(color) {
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