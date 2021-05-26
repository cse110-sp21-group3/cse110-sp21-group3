/**
 * This is a wrapper element which will take a list of bullet values and render
 * it in a bullet list format and also return the updated list of bullets
 * (with nested) as they are edited
 */
class BulletList extends HTMLElement {
  constructor() {
    super();
    const template = document.createElement('template');
    template.innerHTML = `
            <div class="bullet-list">
            </div>
        `;
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.state = {
      value: [],
      nestLimit: 1,
    };
  }

  setNestLimit(nestLimit) {
    this.state.nestLimit = nestLimit;
  }

  setValue(bulletsTree) {
    const CHILDREN = 1, VALUE = 0;
    const container = this.shadowRoot.querySelector('.bullet-list');
    let parents = {}
    let bulletElements = {};

    Object.keys(bulletsTree).forEach((bulletID) => {
      if (bulletID.toString() in bulletElements)
        return; // Element is already created

      parents[bulletID] = null;
      let traversalStack = [bulletID];
      
      while (traversalStack.length > 0){
        let currID = traversalStack.pop();
        let currBullet = document.createElement('custom-bullet');
        currBullet.setValue(bulletsTree[currID][VALUE])
        if (parents[currID] === null){
          currBullet.setNestDepthRem(this.state.nestLimit);
        } else {
          bulletElements[parents[currID]].nestBullet(currBullet);
        }
        bulletElements[currID] = currBullet;
        let children = bulletsTree[currID][CHILDREN];

        children.reverse();
        children.forEach((childID) => {
          parents[childID] = currID;
          traversalStack.push(childID);
        })
      }
      container.appendChild(bulletElements[bulletID]);
    })
  }
}

customElements.define('bullet-list', BulletList);
