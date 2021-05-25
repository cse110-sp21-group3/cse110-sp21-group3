class Grid extends HTMLElement {
  constructor() {
    super();
    const template = document.createElement('template');
    template.innerHTML = `
    <style>
        .habit-grid {
            display: grid;
            grid-template-rows: repeat(2, minmax(0, 1fr));
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 2rem;
            margin: 2rem;
            height: 100vh;
        }
    </style>
    <!-- Template -->
    <div id="grid0" class="habit-grid"></div>`;
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  /**
   * Grid number
   */
  get num() {
    return this.getAttribute('num');
  }

  set num(num) {
    // Set id of div to num
    const grid = this.shadowRoot.querySelector('.habit-grid');
    const id = `grid${num}`
    grid.id = id;
    this.setAttribute('num', num);
  }
}

customElements.define('grid-elem', Grid);
