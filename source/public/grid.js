class Grid extends HTMLElement {

    constructor () {
        super();

        const template = document.createElement('template');
        
        template.innerHTML = `
            <style>
                @import "./styles.css"
            </style>
            <!-- Template -->
            <div id="0" class="grid grid-rows-2 grid-cols-3 gap-8 m-8 h-full"></div>`
            ;


        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(template.content.cloneNode(true))

    }

    /**
     * Grid number
     */
    get num() {
        return this.getAttribute('num');
    }

    set num(num) {
        // Set id of div to num
        const grid = this.shadowRoot.querySelector('#0');
        grid.id = num;
        this.setAttribute('num', num);
    }
}

customElements.define('grid', Grid);