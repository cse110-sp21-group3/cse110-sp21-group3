import BaseBullet from './BaseBullet.js';
import { bulletTypes, bulletModifiers } from './bulletTypes.js';

const elementName = 'daily-log-bullet';
const bulletParameters = {
  value: 'value',
  children: 'children',
  type: 'type',
  modifier: 'modifier',
  completed: 'completed',
}; // Stores keywords as defined while initialising BulletList

const defaultParameters = {
  value: '',
  type: 'task',
  modifier: 'none',
  completed: false,
};

/**
 * Bullet Class for Daily Log Page Bullet
 */
class DailyLogBullet extends BaseBullet {
  constructor() {
    super();
    this.elementName = elementName;

    this.state = {
      nestDepthRem: 1,
    };
    Object.keys(defaultParameters).forEach((key) => {
      this.state[key] = defaultParameters[key];
    });

    this.parameterSetMap = {};
    this.parameterSetMap[bulletParameters.value] = (value) => this.setValue(value);
    this.parameterSetMap[bulletParameters.type] = (value) => this.setBulletType(value);
    this.parameterSetMap[bulletParameters.modifier] = (value) => this.setBulletModifier(value);
    this.parameterSetMap[bulletParameters.completed] = (value) => this.setCompleted(value);

    this.bulletStyle = `
        * {
            font-family: 'Manrope', sans-serif;
        }
        .box-bullet {
        display: flex;
        }

        input[type=text] {
            border: 1px solid transparent;
            background: inherit;
            font-size: 1.5rem;
            width: 70%;
        }
        
        div ${this.elementName} {
            position: relative;
            left: 2rem;
        }

        .type {
        border: 1px solid transparent;
        height: 1.5rem;
        width: 1.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.25rem;
        align-self: center;
        }

        .type:hover {
        border: 1px solid grey;
        cursor: pointer;
        }

        .modifier {
        border: 1px solid transparent;
        height: 1rem;
        width: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        }

        .modifier:hover {
        border: 1px solid grey;
        cursor: pointer;
        }
    `; // This is default style

    const template = document.createElement('template');
    template.innerHTML = `
        <style>${this.bulletStyle}</style>
        <div class="bullet">
            <div class="box-bullet"> 
            <div class="type">${bulletTypes[this.state.type]}</div>
            <input type="text" value="${this.state.value}" placeholder="Add thoughts here"></input>
            </div>
            <div class="nested"></div>
        </div>`;

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    const inputElement = this.shadowRoot.querySelector('input');

    const keysToWatch = [ // Keys used in keyboard shortcuts must be added here
      'Tab',
      'Enter',
      'Backspace',
      'Shift',
      'Control',
      's', // save
      'X', // (with Shift) complete & uncomplete toggle (strikethrough, remove strikethrough)
      'i', // inspiration (italics)
      'b', // priority (bold)
      'r', // regular font style
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

    let matched = false;
    // Listeners for adjusting bullet formatting state.
    inputElement.onkeydown = (e) => {
      watchKeys(e.key, true);
      matched = false;
      if (!matched) matched = this.baseKeydownListener(e);
      if (!matched) matched = this.keyDownListener();
    };
    inputElement.onkeyup = (e) => {
      if (!matched) matched = this.baseKeyupListener();
      if (!matched) this.editContent(bulletParameters.value, e.target.value);
      watchKeys(e.key, false);
    };
  }

  /**
   * Initialises the bullet
   * @param {*} bulletAttributes
   * @param {Object} [ bulletAttributes.storageIndex ]
   * @param {Array} [ bulletAttributes.data ] - Data as saved in storage
   */
  initialiseBullet(bulletAttributes) {
    super.initialiseBullet(bulletAttributes);
    let data = null;
    let storageIndex;
    if ('data' in bulletAttributes) {
      data = bulletAttributes.data;
      storageIndex = bulletAttributes.storageIndex;
    }

    Object.keys(defaultParameters).forEach((key) => {
      this.state[key] = defaultParameters[key];
      this.parameterSetMap[key]((data === null) ? defaultParameters[key] : data[storageIndex[key]]);
    });

    let typeCount = 1;
    const typeList = ['none', 'task', 'note', 'event', 'theme'];
    const type = this.shadowRoot.querySelector('.type');
    if (!this.readOnly) {
      type.addEventListener('click', () => {
        typeCount += 1;
        this.editContent(bulletParameters.type, typeList[typeCount % typeList.length]);
      });
    } else {
      const inputText = this.shadowRoot.querySelector('input[type=text]');
      inputText.setAttribute('placeholder', 'No text here');
    }
  }

  /**
   * Serializes the bullet into the format
   * [content, completed, type, modifier, children]
   * @returns Array of form [content, completed, type, modifier, children].
   */
  serialize() {
    return [
      this.state[bulletParameters.value],
      this.state[bulletParameters.completed],
      this.state[bulletParameters.type],
      this.state[bulletParameters.modifier],
      [], // Since bullets don't have access to their children, this should be updated by BulletList
    ];
  }

  // Setters
  setValue(value) {
    this.state.value = value;
    this.shadowRoot.querySelector('input').value = this.state.value;
  }

  setBulletType(type) {
    this.state.type = type;
    const bulletTypeContainer = this.shadowRoot.querySelector('.type');
    bulletTypeContainer.innerHTML = bulletTypes[this.state.type];
  }

  setBulletModifier(modifier) {
    if (modifier === this.state.modifier) { // Allow modifiers to be toggled
      this.state.modifier = 'none';
    } else {
      this.state.modifier = modifier;
    }
    const inputElement = this.shadowRoot.querySelector('input');
    Object.assign(inputElement.style, bulletModifiers[this.state.modifier]);
  }

  setCompleted(isComplete) {
    this.state.completed = isComplete;

    // Change DOM
    const inputElement = this.shadowRoot.querySelector('input');
    const newStrikeState = (isComplete) ? 'line-through' : 'none';
    inputElement.style.setProperty('text-decoration', newStrikeState);
  }

  // Event Handlers
  editContent(parameter, newValue) {
    // Maps between parameter and its Set function
    this.parameterSetMap[parameter](newValue);
    this.updateCallbacks.editContent(parameter, this.uniqueID, this.state[parameter]);
  }

  // Additional keyboard listeners
  /**
   * Keydown keyboard listeners in addition to base listeners
   *
   * Shortcuts checked (in order):
   * 1. Control + Shift + x
   * 2. Control + r
   * 3. Control + b
   * 4. Control + i
   *
   * @returns {Boolean} true if shortcut was matched, false otherwise
   */
  keyDownListener() {
    if (this.keysPressed.Control && this.keysPressed.Shift && this.keysPressed.X) {
      this.editContent(bulletParameters.completed, !this.state.completed);
    } else if (this.keysPressed.Control && this.keysPressed.r) {
      this.editContent(bulletParameters.modifier, 'none');
    } else if (this.keysPressed.Control && this.keysPressed.b) {
      this.editContent(bulletParameters.modifier, 'priority');
    } else if (this.keysPressed.Control && this.keysPressed.i) {
      this.editContent(bulletParameters.modifier, 'inspiration');
    } else return false;
    return true;
  }
}

customElements.define(elementName, DailyLogBullet);
