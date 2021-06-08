const elementName = 'custom-bullet';
export default class Bullet extends HTMLElement {
  constructor() {
    super();
    this.elementName = elementName;
    this.keysPressed = {};
    this.readOnly = false; // This is set to true if bullet must be read only

    this.bulletConfigs = {};
    this.bulletStyle = ''; // This is default style
    this.uniqueID = 0;
    this.getNextID = () => console.error('Bullet.getNextID is not setup');
    this.updateCallbacks = {};
    this.getAdjacentBullet = () => console.error('Bullet.getAdjacentBullet is not set');
  }

  /**
   * Initialises bullet attributes
   * @param {*} bulletAttributes
   * @param {Object} bulletAttributes.updateCallbacks
   * @param {function} bulletAttributes.getNextID
   * @param {function} bulletAttributes.getAdjacentBullet
   * @param {number} [ bulletAttributes.uniqueID ]
   * @param {string} [ bulletAttributes.bulletStyle ]
   * @param {Object} [ bulletAttributes.bulletConfigs ]
   */
  initialiseBullet(bulletAttributes) {
    this.bulletConfigs = bulletAttributes.bulletConfigs;
    if ('readOnly' in this.bulletConfigs) {
      this.readOnly = this.bulletConfigs.readOnly;
      this.shadowRoot.querySelector('input[type=text]').readOnly = this.readOnly;
    }
    this.updateCallbacks = bulletAttributes.updateCallbacks;
    this.getNextID = bulletAttributes.getNextID;
    this.getAdjacentBullet = bulletAttributes.getAdjacentBullet;

    this.uniqueID = ('uniqueID' in bulletAttributes) ? bulletAttributes.uniqueID : this.getNextID();

    this.shadowRoot.querySelector('input').value = this.state.value;
    this.shadowRoot.querySelector('style').innerHTML = this.bulletStyle;
  }

  serialize() {
    console.error(`serialize() not implemented for ${this.elementName}`);
  }

  // Setters
  setNestDepthRem(nestDepthRem) {
    this.state.nestDepthRem = nestDepthRem;
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
    const newBullet = document.createElement(this.elementName);
    newBullet.initialiseBullet({
      updateCallbacks: this.updateCallbacks,
      getNextID: this.getNextID,
      getAdjacentBullet: this.getAdjacentBullet,
      bulletStyle: this.bulletStyle,
      bulletConfigs: this.bulletConfigs,
    });

    this.updateCallbacks.createBullet(this.uniqueID, newBullet);

    newBullet.setNestDepthRem(this.getNestDepthRem());

    this.after(newBullet);
    this.transferFocusTo(newBullet);
  }

  exitSingleNesting(e) {
    const parentBullet = e.target.getRootNode().host.getParentBullet();
    if ((parentBullet === undefined) || (parentBullet.tagName !== this.elementName.toUpperCase())) {
      console.log('No levels of nesting found');
      return;
    }
    parentBullet.after(this);
    this.setNestDepthRem(this.getNestDepthRem() + 1);

    const grandParentBullet = parentBullet.getParentBullet();
    let grandParentID;
    if (grandParentBullet === undefined) grandParentID = null;
    else {
      grandParentID = (
        grandParentBullet.tagName === this.elementName.toUpperCase()
      ) ? grandParentBullet.uniqueID : null;
    }

    this.updateCallbacks.nestCurrBullet(this.uniqueID, grandParentID, false);
    this.focus(); // Reset focus
  }

  deleteBullet() {
    let nextFocusBullet = this.getAdjacentBullet(this.uniqueID, true);
    if (nextFocusBullet === null) nextFocusBullet = this.getAdjacentBullet(this.uniqueID, false);
    const allowDelete = this.updateCallbacks.deleteBullet(this.uniqueID);
    if (allowDelete) {
      if (nextFocusBullet !== null) this.transferFocusTo(nextFocusBullet);
      this.remove();
    }
  }

  // Keyboard Listeners
  baseKeydownListener(e) {
    if (!this.readOnly && this.keysPressed.Shift && this.keysPressed.Tab) {
      e.preventDefault();
      this.exitSingleNesting(e);
    } else if (!this.readOnly && this.keysPressed.Tab) {
      e.preventDefault();
      this.nestCurrBullet();
    } else if (this.keysPressed.Control && this.keysPressed.s) {
      e.preventDefault();
      this.updateCallbacks.saveData();
    } else if (this.keysPressed.ArrowUp) {
      const nextBullet = this.getAdjacentBullet(this.uniqueID, true);
      if (nextBullet !== null) this.transferFocusTo(nextBullet);
    } else if (this.keysPressed.ArrowDown) {
      const nextBullet = this.getAdjacentBullet(this.uniqueID, false);
      if (nextBullet !== null) this.transferFocusTo(nextBullet);
    } else {
      return false;
    }
    return true;
  }

  baseKeyupListener() {
    if (!this.readOnly && this.keysPressed.Enter) {
      if (this.state.value === '') return true;
      this.createBullet();
    } else if (!this.readOnly && this.keysPressed.Backspace && this.getValue() === '') {
      this.deleteBullet();
    } else {
      return false;
    }
    return true;
  }
}
