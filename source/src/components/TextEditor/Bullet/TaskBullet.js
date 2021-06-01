import BaseBullet from './BaseBullet.js';

const elementName = 'task-bullet';
const bulletParameters = {
  value: 'value',
  children: 'children',
  completed: 'completed',
}; // Stores keywords as defined while initialising BulletList

const defaultParameters = {
  value: '',
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
    this.parameterSetMap[bulletParameters.completed] = (value) => this.setCompleted(value);

    this.bulletStyle = `
        * {
            font-family: 'Nunito', sans-serif;
        }
        
        input[type=text] {
            border: 1px solid transparent;
            background: inherit;
            font-size: 1.5rem;
            width: 70%;
        }
        
        li {
          list-style-type: none;
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
          <input type="text" value="${this.state.value}" placeholder="Add tasks here"></input>
          <div class="nested"></div>
        </li>`;

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
      'c', // complete & uncomplete toggle (strikethrough, remove strikethrough)
      'ArrowUp',
      'ArrowDown',
    ];
    const watchKeys = (key, state) => {
      if (keysToWatch.includes(key)) {
        this.keysPressed[key] = state;
      }
    };
    inputElement.onkeydown = (e) => this.inputKeyboardListener(e, watchKeys);
    inputElement.onkeyup = (e) => {
      watchKeys(e.key, false);

      this.editContent(bulletParameters.value, e.target.value);
    };
  }

  /**
   * Initialises the bullet
   * @param {*} bulletAttributes
   * @param {Object} [ storageIndex ]
   * @param {Array} [ bulletAttributes.data ] - Data as saved in storage
   */
  initialiseBullet(bulletAttributes) {
    super.initialiseBullet(bulletAttributes);
    let data = null; let
      storageIndex;
    if ('data' in bulletAttributes) {
      data = bulletAttributes.data;
      storageIndex = bulletAttributes.storageIndex;
    }

    Object.keys(defaultParameters).forEach((key) => {
      this.state[key] = defaultParameters[key];
      this.parameterSetMap[key]((data === null) ? defaultParameters[key] : data[storageIndex[key]]);
    });

    this.bulletConfigs = bulletAttributes.bulletConfigs;
    if ('bulletStyle' in this.bulletConfigs) {
      const styleTag = this.shadowRoot.querySelector('style');
      styleTag.innerHTML = this.bulletConfigs.bulletStyle;
    }
  }

  /**
   * Serializes the bullet into the format
   * [content, completed, children]
   * @returns
   */
  serialize() {
    return [
      this.state[bulletParameters.value],
      this.state[bulletParameters.completed],
      [], // Since bullets don't have access to their children, this should be updated by BulletList
    ];
  }

  // Setters
  setValue(value) {
    this.state.value = value;
    this.shadowRoot.querySelector('input').value = this.state.value;
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

  inputKeyboardListener(e, watchKeys) {
    watchKeys(e.key, true);
    if (this.keysPressed.Tab) {
      e.preventDefault();
      this.nestCurrBullet();
    } else if (this.keysPressed.Backspace) {
      if (this.getValue() === '') this.deleteBullet();
    } else if (this.keysPressed.Shift && this.keysPressed.Enter) {
      this.exitSingleNesting(e);
    } else if (this.keysPressed.Enter) {
      if (this.state.value === '') return;
      this.createBullet();
    } else if (this.keysPressed.Control && this.keysPressed.s) {
      e.preventDefault();
      this.updateCallbacks.saveData();
    } else if (this.keysPressed.Control && this.keysPressed.c) {
      this.editContent(bulletParameters.completed, !this.state.completed);
    } else if (this.keysPressed.ArrowUp) {
      const nextBullet = this.getAdjacentBullet(this.uniqueID, true);
      if (nextBullet !== null) this.transferFocusTo(nextBullet);
    } else if (this.keysPressed.ArrowDown) {
      const nextBullet = this.getAdjacentBullet(this.uniqueID, false);
      if (nextBullet !== null) this.transferFocusTo(nextBullet);
    }
  }
}

customElements.define(elementName, DailyLogBullet);
