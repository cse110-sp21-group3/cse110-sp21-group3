class Bullet extends HTMLElement {
  constructor() {
    super();
    this.keysPressed = {};

    this.state = {
      value: (this.getAttribute('value') === null) ? '' : this.getAttribute('value'),
      nestDepthRem: 1,
    };

    const template = document.createElement('template');
    template.innerHTML = `
            <style>
                input {
                    border: none;
                }
                
                li custom-bullet {
                    position: relative;
                    left: 2rem;
                }

            </style>
            <li class="bullet">
                <input type="text" value="${this.state.value}"></input>
                <div class="nested"></div>
            </li>
        `;

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    const inputElement = this.shadowRoot.querySelector('input');

    const keysToWatch = ['Tab', 'Enter', 'Backspace', 'Shift'];
    const watchKeys = (key, state) => {
      if (keysToWatch.includes(key)) {
        this.keysPressed[key] = state;
      }
    };

    inputElement.onkeydown = (e) => {
      watchKeys(e.key, true);
      this.setValue(e.target.value);
      if (this.keysPressed.Tab) {
        e.preventDefault();
        this.tabHandler();
      } else if (this.keysPressed.Backspace) {
        if (this.getValue() === '') this.remove(); // Removes bullet from DOM
        // TODO: Consider case when user tries to remove the top most bullet
      } else if (this.keysPressed.Shift && this.keysPressed.Enter) {
        this.exitSingleNesting(e);
      } else if (this.keysPressed.Enter) {
        if (this.getValue() === '') return;
        this.enterHandler();
      }
    };
    inputElement.onkeyup = (e) => {
      watchKeys(e.key, false);
    };
  }

  // Setters and getters
  setValue(value) {
    this.state.value = value;
    this.shadowRoot.querySelector('input').value = this.state.value;
  }

  getValue() {
    return this.state.value;
  }

  setNestDepthRem(nestDepthRem) {
    this.state.nestDepthRem = nestDepthRem;
  }

  getNestDepthRem() {
    return this.state.nestDepthRem;
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
  nestBullet(bullet) {
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
  tabHandler() {
    const prevBullet = this.previousElementSibling;
    if (prevBullet == null) return;
    if (this.getNestDepthRem() <= 0) return;
    prevBullet.nestBullet(this);
    this.transferFocusTo(this); // Reset focus
  }

  enterHandler() {
    const newBullet = document.createElement('custom-bullet');
    newBullet.setNestDepthRem(this.getNestDepthRem());

    this.after(newBullet);
    this.transferFocusTo(newBullet);
  }

  exitSingleNesting(e) {
    const parentBullet = e.target.getRootNode().host.getRootNode().host;
    if (parentBullet === undefined) {
      console.log('No levels of nesting found');
      return;
    }
    parentBullet.after(this); // TODO: Debug why onkeyup is stopped
    this.transferFocusTo(this);

    this.setNestDepthRem(this.getNestDepthRem() + 1);
  }
}

customElements.define('custom-bullet', Bullet);
