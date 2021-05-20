class Tracker extends HTMLElement {

    constructor () {
        super();

        const template = document.createElement('template');
        
        template.innerHTML = `
            <style>
                @import "./styles.css"
            </style>
            <!-- Template -->
            <div id="habit" class="flex flex-col text-center">
                <h1 id="title" class="text-3xl m-4">Habit</h1>
                <div id="habit-grid" class="grid grid-rows-5 grid-cols-7 gap-8 p-4 flex-grow bg-white rounded-3xl">
                    <script>
                        let habitGrid = document.getElementById("habit-grid");
                        for (let i = 0; i < 31; i++) {
                            let habitCircle = document.createElement("div");
                            habitCircle.className = "rounded-full border-none bg-gray-200";
                            habitCircle.id = i + 1;
                            habitGrid.appendChild(habitCircle);
                        }
                    </script>
                </div>
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
        const title = this.shadowRoot.querySelector('#title');
        title.innerHTML = habit;
        const grid = this.shadowRoot.querySelector('#habit');
        grid.id = habit;
        this.setAttribute('habit', habit);
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

customElements.define('tracker', Tracker);