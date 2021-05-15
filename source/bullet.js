class BulletLog extends HTMLElement {

    constructor () {
        super();


        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                .entry {
                    background-color: red;
                    border-radius: 6px;
                    list-style-type: none;
                    margin-bottom: 30px;
                    max-width: 700px;
                    padding: 20px;
                    width: 80%;
                }
        
            </style>
            <div class="entry">
                <p class="modifier">Modifier</p>
                <p class="type">Type</p>
                <p class="content">Bullet Content</p>
            </div>
        `;

        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(template.content.cloneNode(true))

    }

    get entry() {
        return this.getAttribute('entry');
    }

    set entry(entry) {
        const modifier = this.shadowRoot.querySelector('.modifier');
        modifier.innerHTML = modifier.title;
    
        const type = this.shadowRoot.querySelector('.type');
        type.innerHTML = type.date;
        
        const content = this.shadowRoot.querySelector('.content')
        content.innerHTML = entry.content;

        this.setAttribute('entry', entry);
    }


}

customElements.define('bullet-log', BulletLog);
