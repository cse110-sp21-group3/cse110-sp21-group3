class EventWrapper extends HTMLElement {
    constructor(){
        super();
        this.props = {};
        this.state = {};
        this.elementStyle = `
            .event-editor-wrapper{
                flex-grow: 1;
                display: flex;
                background-color: var(--light-bg);
                border-radius: 1.25rem;
                padding: 1rem;
                margin: 0.5rem 0rem;
            }
            .event-editor-wrapper > .day-num {
                margin-right: 0.7rem;
            }
            bullet-list.event-editor{
                width: 100%;
            }
            
            .event-editor-wrapper .day-num{
                color: var(--day-num-color);
                font-size: 1.8rem;
            }
        `;        
    }
    /**
     * Initialises Wrapper
     * @param {*} wrapperAttributes 
     * @param {Object} wrapperAttributes.dayNum
     * @param {Object} wrapperAttributes.dataTree
     */
    initialise(wrapperAttributes){
        this.props['dayNum'] = wrapperAttributes.dayNum;
        this.state['dataTree'] = wrapperAttributes.dataTree;
        this.render();
    }

    render(){
        const templateElement = document.createElement('template');
        templateElement.innerHTML = `
            <style>
                ${this.elementStyle}
            </style>
            <div class="event-editor-wrapper">
                <div class="day-num">${this.props.dayNum}</div>
                <bullet-list class="event-editor"></bullet-list>
            </div>
        `;
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(templateElement.content.cloneNode(true));
        
        // Initialise bullet-list
        const list = this.shadowRoot.querySelector('bullet-list.event-editor');
        list.initialiseList({
            saveDataCallback: (data) => {
                console.log('Attempting to save data', data);
            },
            nestLimit: 0,
            bulletTree: this.state.dataTree,
            storageIndex: {
                value: 0,
                children: 1
            },
            elementName: 'simple-bullet',
            bulletConfigs: {
                bulletStyle: `
                    input[type=text] {
                        font-size: 1.5rem;
                        font-family: 'Nunito', sans-serif;
                        color: #4F4F4F;

                        border: none;
                        background: inherit;
                        width: 90%;
                        height: 1.8rem;
                    }
                    
                    li {
                        list-style-type: none;
                        width: 100%;
                    }
                `
            }
        });
    }
}

customElements.define('event-wrapper', EventWrapper);