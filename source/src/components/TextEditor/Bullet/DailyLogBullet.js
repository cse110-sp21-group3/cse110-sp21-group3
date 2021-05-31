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
  type: 'none',
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
            font-family: 'Nunito', sans-serif;
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
      'c', // complete & uncomplete toggle (strikethrough, remove strikethrough)
      'i', // inspiration (italics)
      'p', // priority (bold)
      'o', // regular font style
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

    let typeCount = 0;
    const typeList = ['none', 'task', 'note', 'event', 'theme'];
    const type = this.shadowRoot.querySelector('.type');
    type.addEventListener('click', () => {
      typeCount += 1;
      this.editContent(bulletParameters.type, typeList[typeCount % typeList.length]);
    });
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
  }

  /**
   * Serializes the bullet into the format
   * [content, completed, type, modifier, children]
   * @returns
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
    this.state.modifier = modifier;
    const inputElement = this.shadowRoot.querySelector('input');
    Object.assign(inputElement.style, bulletModifiers[modifier]);
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
    } else if (this.keysPressed.Control && this.keysPressed.o) {
      this.editContent(bulletParameters.modifier, 'none');
    } else if (this.keysPressed.Control && this.keysPressed.p) {
      this.editContent(bulletParameters.modifier, 'priority');
    } else if (this.keysPressed.Control && this.keysPressed.i) {
      this.editContent(bulletParameters.modifier, 'inspiration');
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
