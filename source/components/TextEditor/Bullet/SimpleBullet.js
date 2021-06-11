import BaseBullet from './BaseBullet.js';

const elementName = 'simple-bullet';
const bulletParameters = {
  value: 'value',
  children: 'children',
}; // Stores keywords as defined while initialising BulletList
const defaultParameters = {
  value: '',
};
/**
 * Standard bullet with no modifications.
 */
class SimpleBullet extends BaseBullet {
  constructor() {
    super();
    this.elementName = elementName;
    this.state = {
      nestDepthRem: 1,
    };
    this.state[bulletParameters.value] = (this.getAttribute('value') === null) ? '' : this.getAttribute('value');
    this.bulletStyle = `
            input[type=text] {
                border: none;
                background: inherit;
                width: 100%;
                height: 1.8rem;
            }
            
            li ${this.elementName} {
                position: relative;
                left: 2rem;
            }
        `; // This is default style

    const template = document.createElement('template');
    template.innerHTML = `
                <style>${this.bulletStyle}</style>
                <li class="bullet">
                    <input type="text" value="${this.state.value}" placeholder=""></input>
                    <div class="nested"></div>
                </li>
            `;

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    const inputElement = this.shadowRoot.querySelector('input');

    const keysToWatch = [ // Keys used in keyboard shortcuts must be added here
      'Tab',
      'Enter',
      'Backspace',
      'Shift',
      'Control',
      's',
      'ArrowUp',
      'ArrowDown',
    ];
    /**
     * Listens for keyboard events that we are interested in and sets state properly.
     * @param {string} key Key to adjust state for.
     * @param {*} state New state to set for key.
     */
    const watchKeys = (key, state) => {
      if (keysToWatch.includes(key)) {
        this.keysPressed[key] = state;
      }
    };

    // Listeners for adjusting bullet formatting state.
    inputElement.onkeydown = (e) => {
      watchKeys(e.key, true);
      this.baseKeydownListener(e);
    };
    inputElement.onkeyup = (e) => {
      const matched = this.baseKeyupListener();
      if (!matched) this.editContent(bulletParameters.value, e.target.value);
      watchKeys(e.key, false);
    };
  }

  /**
   * Initialises the bullet
   * @param {*} bulletAttributes
   * @param {Object} [ bulletAttributes.storageIndex ]
   * @param {Array} [ bulletAttributes.data ] - Data as saved in storage
   * @param {Object} [ bulletAttributes.bulletConfigs ]
   *    -> Configuration for bullet object. Example: bulletStyle
   */
  initialiseBullet(bulletAttributes) {
    super.initialiseBullet(bulletAttributes);
    let data = null;
    let storageIndex;
    if ('data' in bulletAttributes) {
      data = bulletAttributes.data;
      storageIndex = bulletAttributes.storageIndex;
    }
    this.setValue(
      (data === null) ? defaultParameters[bulletParameters.value] : data[storageIndex.value],
    );
    this.bulletConfigs = bulletAttributes.bulletConfigs;
    if ('bulletStyle' in this.bulletConfigs) {
      const styleTag = this.shadowRoot.querySelector('style');
      styleTag.innerHTML = this.bulletConfigs.bulletStyle;
    }
  }

  /**
   * Serializes contents of bullet into array to serialize to JSON.
   * @returns Array with [content, noChildren] as contents.
   */
  serialize() {
    return [this.state.value, []];
  }

  // Setters
  setValue(value) {
    this.state.value = value;
    this.shadowRoot.querySelector('input').value = this.state.value;
  }

  // Event Handlers
  editContent(parameter, newValue) {
    switch (parameter) {
      case bulletParameters.value:
        this.setValue(newValue);
        break;

      default:
        break;
    }
    this.updateCallbacks.editContent(parameter, this.uniqueID, this.state.value);
  }
}

customElements.define(elementName, SimpleBullet);
