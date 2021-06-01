import BaseBullet from './BaseBullet.js';

const elementName = 'simple-bullet';
const bulletParameters = {
  value: 'value',
  children: 'children',
}; // Stores keywords as defined while initialising BulletList
const defaultParameters = {
  value: '',
};
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
      if (this.getValue() === '') return;
      this.createBullet();
    } else if (this.keysPressed.Control && this.keysPressed.s) {
      e.preventDefault();
      this.updateCallbacks.saveData();
    } else if (this.keysPressed.ArrowUp) {
      const nextBullet = this.getAdjacentBullet(this.uniqueID, true);
      if (nextBullet !== null) this.transferFocusTo(nextBullet);
    } else if (this.keysPressed.ArrowDown) {
      const nextBullet = this.getAdjacentBullet(this.uniqueID, false);
      if (nextBullet !== null) this.transferFocusTo(nextBullet);
    }
  }
}

customElements.define(elementName, SimpleBullet);
