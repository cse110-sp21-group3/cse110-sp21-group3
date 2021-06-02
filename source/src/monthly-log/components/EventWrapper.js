import { getMonthlyLogUID } from '../../storageKeys.js';

class EventWrapper extends HTMLElement {
  constructor() {
    super();
    this.storageKey = null;
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
                box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
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
     * @param {number} wrapperAttributes.dayNum
     * @param {Date} wrapperAttributes.dateForMonth
     * @param {function} wrapperAttributes.saveDataCallback
     */
  initialise(wrapperAttributes) {
    this.props.dateForMonth = wrapperAttributes.dateForMonth;
    this.props.dayNum = wrapperAttributes.dayNum;
    this.props.saveDataCallback = wrapperAttributes.saveDataCallback;

    this.storageKey = getMonthlyLogUID('event', this.props.dateForMonth.getMonth(), this.props.dayNum);
    this.render();
  }

  getStorageKey(){
    return this.storageKey;
  }

  getBulletTree(){
    return this.shadowRoot.querySelector('bullet-list').getBulletTree();
  }

  render() {
    const emptyData = { 0: [1], 1: ['', []] };

    const dataTree = localStorage.getItem(this.storageKey);
    if (dataTree === null) this.state.dataTree = emptyData;
    else this.state.dataTree = JSON.parse(dataTree);

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
      saveDataCallback: this.props.saveDataCallback,
      nestLimit: 0,
      bulletTree: this.state.dataTree,
      storageIndex: {
        value: 0,
        children: 1,
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
                `,
      },
    });
  }
}

customElements.define('event-wrapper', EventWrapper);
