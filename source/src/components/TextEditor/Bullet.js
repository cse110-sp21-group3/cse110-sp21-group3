class Bullet extends HTMLElement {
  constructor() {
    super();
    this.keysPressed = {};

    this.uniqueID = 0;
    this.getNextID = () => console.error('Bullet.getNextID is not setup');
    this.updateCallbacks = {};
    this.getAdjacentBullet = () => console.error('Bullet.getAdjacentBullet is not set');

    this.state = {
      value: (this.getAttribute('value') === null) ? '' : this.getAttribute('value'),
      nestDepthRem: 1,
    };

    const template = document.createElement('template');
    template.innerHTML = `
            <style>
                input {
                    border: none;
                    background: inherit;
                }
                
                li custom-bullet {
                    position: relative;
                    left: 2rem;
                }

            </style>
            <li class="bullet">
                <input type="text" value="${this.state.value}" placeholder="Add text here"></input>
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

    inputElement.onkeydown = (e) => {
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
    };
    inputElement.onkeyup = (e) => {
      watchKeys(e.key, false);
      this.editContent(e.target.value);
    };
  }

  // Setters
  setGetAdjacentBullet(getAdjacentBullet) {
    this.getAdjacentBullet = getAdjacentBullet;
  }

  setUpdateCallbacks(updateCallbacks) {
    this.updateCallbacks = updateCallbacks;
  }

  setValue(value, updateDOM = false) {
    this.state.value = value;
    if (updateDOM) this.shadowRoot.querySelector('input').value = this.state.value;
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
    newBullet.setGetAdjacentBullet(this.getAdjacentBullet);

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
  }
}

customElements.define('custom-bullet', Bullet);
