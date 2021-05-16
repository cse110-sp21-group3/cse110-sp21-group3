class BulletLog extends HTMLElement {

    constructor () {
        super();


        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                .entry {
                    margin-left: 30px;
                    border-radius: 6px;
                    list-style-type: none;
                    width: 80%;
                    text-align: left;
                    padding-left: 20px;
                    display: flex;
                    align-items: center;
                }

                .entry p {
                    display: inline-block;
                    font-size: 20px;
                }

                .type {
                    margin-right: 5px;
                }

                .editBtn {
                    display: none;
                    margin-left: auto;
                    margin-right: 10px;
                }
                .deleteBtn {
                    display: none;  
                }

                .entry:hover .editBtn{
                    display: inline-block;
                }
                .entry:hover .deleteBtn{
                    display: inline-block;
                }

        
            </style>

            <div class="entry">
                <p class="modifier">Modifier</p>
                <p class="type">Type</p>
                <p class="content">Bullet Content</p>
                <button class="editBtn">Edit</button>
                <button class="deleteBtn">Delete</button>
            </div>`
            ;


        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(template.content.cloneNode(true))

    }

    get entry() {
        return this.getAttribute('entry');
    }

    set entry(entry) {
        
        const modifier = this.shadowRoot.querySelector('.modifier');
        if (entry.modifier === 'importance'){
            modifier.innerHTML = '*';
        } else if (entry.modifier === 'inspiration'){
            modifier.innerHTML = '!'
        } else {
            modifier.innerHTML = " ";
        }
    
        const type = this.shadowRoot.querySelector('.type');
        if (entry.type === 'task') {
            type.innerHTML = '&bull;'
        } else if (entry.type === 'note') {
            type.innerHTML = '&ndash;'
        } else if (entry.type === 'event') {
            type.innerHTML = '&#9702;'
        } else {
            type.innerHTML = '&#11088;'
        }
        
        const content = this.shadowRoot.querySelector('.content')
        content.innerHTML = entry.content;

        this.setAttribute('entry', entry);
    }

}

customElements.define('bullet-log', BulletLog);
