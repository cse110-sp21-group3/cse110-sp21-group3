class BulletLog extends HTMLElement {

    constructor () {
        super();
    }

    connectedCallback () {
        console.log('bullet log created');
    }

}

customElements.define('bullet-log', BulletLog);
