import { bulletTypes, bulletModifiers } from './bulletTypes.js'

class Bullet extends HTMLElement {
  constructor() {
    super();
    this.keysPressed = {};

    this.uniqueID = 0;
    this.getNextID = () => console.error('Bullet.getNextID is not setup');
    this.updateCallbacks = {};

    this.state = {
      value: (this.getAttribute('value') === null) ? '' : this.getAttribute('value'),
      nestDepthRem: 1,
      completed: false,
      type: 'none',
      modifier: 'none',
    };

    const template = document.createElement('template');
    template.innerHTML = `
            <style>
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
                
                div custom-bullet {
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

            </style>
            <div class="bullet">
                <div class="box-bullet"> 
                  <div class="type">${bulletTypes[this.state.type]}</div>
                  <input type="text" value="${this.state.value}" placeholder="Add thoughts here"></input>
                </div>
                <div class="nested"></div>
            </div>
        `;

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));


    let typeCount = 0;
    const typeList = ['none', 'task', 'note', 'event', 'theme'];
    const type = this.shadowRoot.querySelector('.type');
    type.addEventListener('click', () => {
      this.editBulletType(typeList[(++typeCount)%typeList.length]);
    });

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
    ];
    const watchKeys = (key, state) => {
      if (keysToWatch.includes(key)) {
        this.keysPressed[key] = state;
      }
    };

    const inputElement = this.shadowRoot.querySelector('input');
  
    // use up/down arrows to traverse bullet, keyboard shortcuts for type/modifier
    inputElement.onkeydown = (e) => {
      watchKeys(e.key, true);
      if (this.keysPressed.Tab) {
        e.preventDefault();
        this.nestCurrBullet();
      } else if (this.keysPressed.Backspace) {
        if (this.getValue() === '') this.deleteBullet();
        // TODO: Consider case when user tries to remove the top most bullet
      } else if (this.keysPressed.Shift && this.keysPressed.Enter) {
        this.exitSingleNesting(e);
      } else if (this.keysPressed.Enter) {
        if (this.getValue() === '') return;
        this.createBullet();
      } else if (this.keysPressed.Control && this.keysPressed.s) {
        e.preventDefault();
        this.updateCallbacks.saveData();
      } else if (this.keysPressed.Control && this.keysPressed.c) {
        this.strikeToggle();
      } else if (this.keysPressed.Control && this.keysPressed.o) {
        this.modifier('none');
      } else if (this.keysPressed.Control && this.keysPressed.p) {
        this.modifier('priority');
      } else if (this.keysPressed.Control && this.keysPressed.i) {
        this.modifier('inspiration')
      }
    };
    inputElement.onkeyup = (e) => {
      watchKeys(e.key, false);
      this.editContent(e.target.value);
    };
  }

  // Setters
  setUpdateCallbacks(updateCallbacks) {
    this.updateCallbacks = updateCallbacks;
  }

  setValue(value, updateDOM = false) {
    this.state.value = value;
    if (updateDOM) this.shadowRoot.querySelector('input').value = this.state.value;
  }

  setBulletType(type) {
    this.state.type = type;
    const bulletTypeContainer = this.shadowRoot.querySelector('.type');
    bulletTypeContainer.innerHTML = bulletTypes[this.state.type];
  }

  setBulletModifier(modifier) {
    this.state.modifier = modifier;
    this.modifier(modifier);
  }

  setNestDepthRem(nestDepthRem) {
    this.state.nestDepthRem = nestDepthRem;
  }

  setGetNextID(getNextID) {
    this.getNextID = getNextID;
  }

  setUniqueID(uniqueID) {
    this.uniqueID = (uniqueID === undefined) ? this.getNextID() : uniqueID;
  }

  // Getters
  getValue() {
    return this.state.value;
  }

  getNestDepthRem() {
    return this.state.nestDepthRem;
  }

  getUniqueID() {
    return this.uniqueID;
  }

  getParentBullet() {
    return this.getRootNode().host;
  }

  // Mutators
  /**
   * Resets key watcher and smoothly transfers focus to `bullet`
   * @param {Bullet} bullet - Bullet to transfer functionality to
   */
  transferFocusTo(bullet) {
    this.keysPressed = {};
    bullet.focus();
  }

  /**
   * Nests `bullet` inside `this` bullet
   * @param {Bullet} bullet - Bullet to be nested
   */
  nestBulletInside(bullet) {
    this.shadowRoot.querySelector('.nested').appendChild(bullet);
    bullet.setNestDepthRem(this.getNestDepthRem() - 1);
  }

  /**
   * Sets focus to `input` field of `this` Bullet
   */
  focus() {
    const inputField = this.shadowRoot.querySelector('input');
    inputField.focus();
    inputField.select();
  }

  // Event Handlers
  editBulletType(newType){
    this.setBulletType(newType);
    this.updateCallbacks.editBulletType(this.uniqueID, this.state.type);
  }
  editContent(newValue) {
    this.setValue(newValue);
    this.updateCallbacks.editContent(this.uniqueID, this.state.value);
  }

  nestCurrBullet() {
    const prevBullet = this.previousElementSibling;
    if (prevBullet == null) return;
    if (this.getNestDepthRem() <= 0) return;
    prevBullet.nestBulletInside(this);
    this.updateCallbacks.nestCurrBullet(this.uniqueID, prevBullet.uniqueID, true);
    this.transferFocusTo(this); // Reset focus
  }

  createBullet() {
    const newBullet = document.createElement('custom-bullet');
    newBullet.setGetNextID(this.getNextID);
    newBullet.setUniqueID();
    newBullet.setUpdateCallbacks(this.updateCallbacks);
    this.updateCallbacks.createBullet(this.uniqueID, newBullet);

    newBullet.setNestDepthRem(this.getNestDepthRem());

    this.after(newBullet);
    this.transferFocusTo(newBullet);
  }

  exitSingleNesting(e) {
    const parentBullet = e.target.getRootNode().host.getParentBullet();
    if (parentBullet === undefined) {
      console.log('No levels of nesting found');
      return;
    }
    parentBullet.after(this);
    this.setNestDepthRem(this.getNestDepthRem() + 1);

    const grandParentBullet = parentBullet.getParentBullet();
    let grandParentID;
    if (grandParentBullet === undefined) grandParentID = null;
    else grandParentID = grandParentBullet.tagName === 'custom-bullet'.toUpperCase() ? grandParentBullet.uniqueID : null;
    this.updateCallbacks.nestCurrBullet(this.uniqueID, grandParentID, false);
    this.transferFocusTo(this);
  }

  deleteBullet() {
    const allowDelete = this.updateCallbacks.deleteBullet(this.uniqueID);
    if (allowDelete) this.remove();
    else console.log('Only bullet remaining. Delete not allowed');
  }

  strikeToggle() {
    const inputElement = this.shadowRoot.querySelector('input');
    const currStrikeState = inputElement.style.getPropertyValue('text-decoration');
    switch (currStrikeState) {
      case 'line-through':
        inputElement.style.setProperty('text-decoration', 'none');
        break;
      case '':
      case 'none':
        inputElement.style.setProperty('text-decoration', 'line-through');
        break;
      default:
        break;
    }
  }
  
  modifier(style) {
    const inputElement = this.shadowRoot.querySelector('input');
    Object.assign(inputElement.style, bulletModifiers[style])
  }


  
}

customElements.define('custom-bullet', Bullet);
