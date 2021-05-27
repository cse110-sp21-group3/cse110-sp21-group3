/**
 * This is a wrapper element which will take a list of bullet values and render
 * it in a bullet list format and also return the updated list of bullets
 * (with nested) as they are edited
 */
const CHILDREN = 1, VALUE = 0; // Keys for accessing data according to current format

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
      nestLimit: 2,
      nextID: 1
    };

    this.listData = {
      bulletElements: {},
      tree: {},
      parents: {}
    }
    // Callbacks for Bullet Editing
    this.nextIDCallback = () => {
      this.state.nextID += 1;
      return this.state.nextID - 1;
    }
    this.updateCallbacks = {
      saveData: () => console.error('Bullet.saveDataCallback is not setup'),
      createBullet : (sourceID, newBullet) => {
        // Assumption: A bullet can be created only in the same nest level as the `sourceID`
        this.listData.tree[newBullet.uniqueID] = [newBullet.getValue(), []] // Save in tree (value)
        const parentID = this.listData.parents[sourceID];

        if (parentID !== null) {
          const sourceIndex = this.listData.tree[parentID][CHILDREN].indexOf(sourceID);
          this.listData.tree[parentID][CHILDREN].splice(sourceIndex+1, 0, newBullet.uniqueID); // Save in tree (structure)
        }
        this.listData.bulletElements[newBullet.uniqueID] = newBullet; // Save in bulletElements
        this.listData.parents[newBullet.uniqueID] = parentID; // Save in parents
      },
      deleteBullet : (bulletID) => {
        delete this.listData.tree[bulletID];
        let index = -1; 

        if (this.listData.parents[bulletID] !== null)
          index = this.listData.tree[this.listData.parents[bulletID]][CHILDREN].indexOf(bulletID);
          if (index !== -1) this.listData.tree[this.listData.parents[bulletID]][CHILDREN].splice(index, 1);

        delete this.listData.bulletElements[bulletID];
        delete this.listData.parents[bulletID];
      },
      editContent : (bulletID, newValue) => {
        this.listData.tree[bulletID][VALUE] = newValue;
      },
      nestCurrBullet : (bulletID, newParentID, forward) => {
        let index = -1;
        if (forward){
          this.listData.tree[newParentID][CHILDREN].push(bulletID);
        } else {
          if (newParentID !== null){
            const oldParentID = this.listData.parents[bulletID];
            if (oldParentID === null) return; // Bullet is already at lowest nesting level
            const oldParentIndex = this.listData.tree[newParentID][CHILDREN].indexOf(oldParentID);
            this.listData.tree[newParentID][CHILDREN].splice(oldParentIndex+1, 0, bulletID);
          }
        }
        if (this.listData.parents[bulletID] !== null) // Remove from the parent in tree structure
          index = this.listData.tree[this.listData.parents[bulletID]][CHILDREN].indexOf(bulletID);
          if (index !== -1) this.listData.tree[this.listData.parents[bulletID]][CHILDREN].splice(index, 1);

        this.listData.parents[bulletID] = newParentID;
      },
    }
    
  }

  
  // Setters
  setSaveDataCallback(saveDataCallback){
    this.updateCallbacks.saveData = () => saveDataCallback(this.listData.tree);
  }
  setNextID(nextID){
    this.state.nextID = nextID;
  }
  setNestLimit(nestLimit) {
    this.state.nestLimit = nestLimit;
  }
  setValue(bulletsTree) {
    const container = this.shadowRoot.querySelector('.bullet-list');

    this.listData.tree = bulletsTree;
    this.setNextID(Math.max(...Object.keys(bulletsTree)) + 1);
    Object.keys(bulletsTree).forEach((bulletID) => {
      bulletID = parseInt(bulletID);
      if (bulletID in this.listData.bulletElements)
        return; // Element is already created

      this.listData.parents[bulletID] = null;
      let traversalStack = [bulletID];
      
      while (traversalStack.length > 0){
        let currID = traversalStack.pop();
        let currBullet = document.createElement('custom-bullet');
        currBullet.setValue(bulletsTree[currID][VALUE], true);
        currBullet.setGetNextID(this.nextIDCallback);
        currBullet.setUniqueID(currID);
        currBullet.setUpdateCallbacks(this.updateCallbacks);

        if (this.listData.parents[currID] === null){
          currBullet.setNestDepthRem(this.state.nestLimit);
        } else {
          this.listData.bulletElements[this.listData.parents[currID]].nestBulletInside(currBullet);
        }
        this.listData.bulletElements[currID] = currBullet;
        let children = bulletsTree[currID][CHILDREN];

        children.slice().reverse().forEach((childID) => {
          this.listData.parents[childID] = currID;
          traversalStack.push(childID);
        })
      }
      container.appendChild(this.listData.bulletElements[bulletID]);
    })
  }
}

customElements.define('bullet-list', BulletList);
