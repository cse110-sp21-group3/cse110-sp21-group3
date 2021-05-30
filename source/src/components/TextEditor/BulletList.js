/**
 * This is a wrapper element which will take a list of bullet values and render
 * it in a bullet list format and also return the updated list of bullets
 * (with nested) as they are edited
 */
const CHILDREN = 1;
const VALUE = 0; // Keys for accessing data according to current format
const TOP_LEVEL_ORDER_ID = 0;
class BulletList extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = '<div class="bullet-list"></div>';

    this.state = {
      value: [],
      nestLimit: 2,
      nextID: 1,
    };

    this.listData = {
      bulletElements: {},
      tree: {},
      parents: {},
      topLevelOrder: [],
    };

    // Callbacks for Bullet Editing
    this.nextIDCallback = () => {
      this.state.nextID += 1;
      return this.state.nextID - 1;
    };
    this.updateCallbacks = {
      saveData: () => console.error('Bullet.saveDataCallback is not setup'), // This callback needs to be provided by the user through `setSaveData()`
      createBullet: (sourceID, newBullet) => {
        // Assumption: A bullet can be created only in the same nest level as the `sourceID`
        this.listData.tree[newBullet.uniqueID] = [newBullet.getValue(), []]; // Save in tree (value)
        const parentID = this.listData.parents[sourceID];

        let sibblingsOrder = [];
        if (parentID === null) sibblingsOrder = this.listData.tree[TOP_LEVEL_ORDER_ID];
        else sibblingsOrder = this.listData.tree[parentID][CHILDREN];

        const sourceIndex = sibblingsOrder.indexOf(sourceID);
        sibblingsOrder.splice(sourceIndex + 1, 0, newBullet.uniqueID); // Save in tree (structure)

        this.listData.bulletElements[newBullet.uniqueID] = newBullet; // Save in bulletElements
        this.listData.parents[newBullet.uniqueID] = parentID; // Save in parents
      },
      deleteBullet: (bulletID) => {
        if (
          (bulletID in this.listData.tree[TOP_LEVEL_ORDER_ID])
          && (this.listData.tree[TOP_LEVEL_ORDER_ID] <= 2)
        ) {
          return false; // Only bullet remaining so deletion not allowed
        }
        delete this.listData.tree[bulletID];

        const parentID = this.listData.parents[bulletID];
        let sibblingsOrder = [];
        if (parentID === null) sibblingsOrder = this.listData.tree[TOP_LEVEL_ORDER_ID];
        else sibblingsOrder = this.listData.tree[parentID][CHILDREN];
        const bulletIndex = sibblingsOrder.indexOf(bulletID);
        if (bulletIndex !== -1) {
          sibblingsOrder.splice(bulletIndex, 1);
        }

        delete this.listData.bulletElements[bulletID];
        delete this.listData.parents[bulletID];
        return true;
      },
      editContent: (bulletID, newValue) => {
        this.listData.tree[bulletID][VALUE] = newValue;
      },
      nestCurrBullet: (bulletID, newParentID, forward) => {
        const oldParentID = this.listData.parents[bulletID];
        // Remove from parent
        let sibblingsOrder;
        if (oldParentID === null) sibblingsOrder = this.listData.tree[TOP_LEVEL_ORDER_ID];
        else sibblingsOrder = this.listData.tree[oldParentID][CHILDREN];
        const index = sibblingsOrder.indexOf(bulletID);
        if (index !== -1) sibblingsOrder.splice(index, 1);

        // Add to new parent
        if (forward) {
          this.listData.tree[newParentID][CHILDREN].push(bulletID);
        } else {
          let newSibblingsOrder;
          if (newParentID === null) newSibblingsOrder = this.listData.tree[TOP_LEVEL_ORDER_ID];
          else newSibblingsOrder = this.listData.tree[newParentID][CHILDREN];
          const oldParentIndex = newSibblingsOrder.indexOf(oldParentID);
          newSibblingsOrder.splice(oldParentIndex + 1, 0, bulletID);
        }

        // Update ID - parent map
        this.listData.parents[bulletID] = newParentID;
      },
    };
  }

  // Setters
  /**
   * Callback must be provided so that the data can be saved through the bullet editor.
   * @param {*} saveDataCallback: Function which must take an argument `data` that would
   * contain a JS Object represention of the bullet tree generated by the user
   * Example of data would be: {
   *  1: ['Bullet 2', [2, 7, 3]],
   *  2: ['Sub Bullet 1', []],
   *  3: ['Sub Bullet 2', []],
   *  4: ['Sub Bullet 3', [5]],
   *  5: ['Sub Bullet 4', []],
   *  6: ['Bullet 5', []],
   *  7: ['Sample', []]
   * }
   *
   */
  setSaveDataCallback(saveDataCallback) {
    this.updateCallbacks.saveData = () => saveDataCallback(this.listData.tree);
  }

  /**
   * Sets the nextID. User should not be setting this unless overriding the automatic
   * method is causing troubles. By default, nextID is set by parsing the existing IDs
   * when setValue is called.
   * @param {*} nextID
   */
  setNextID(nextID) {
    this.state.nextID = nextID;
  }

  /**
   * Sets the nesting limit for the list. By default, this is set to 2.
   * @param {Integer} nestLimit
   */
  setNestLimit(nestLimit) {
    this.state.nestLimit = nestLimit;
  }

  /**
   * Sets and renders the bullet list according to the passed bullet tree
   * @param {Object} bulletsTree - Tree in format similar to adjacency list.
   * Example of bulletsTree would be: {
   *  1: ['Bullet 2', [2, 7, 3]],
   *  2: ['Sub Bullet 1', []],
   *  3: ['Sub Bullet 2', []],
   *  4: ['Sub Bullet 3', [5]],
   *  5: ['Sub Bullet 4', []],
   *  6: ['Bullet 5', []],
   *  7: ['Sample', []]
   * }
   */
  setValue(bulletsTree) {
    const container = this.querySelector('.bullet-list');

    this.listData.tree = bulletsTree;
    this.setNextID(Math.max(...Object.keys(bulletsTree)) + 1);
    const toplevelBullets = bulletsTree[0];
    toplevelBullets.forEach((bulletIDStr) => {
      const bulletID = parseInt(bulletIDStr, 10);
      if (bulletID in this.listData.bulletElements) return; // Element is already created

      this.listData.parents[bulletID] = null;
      const traversalStack = [bulletID];

      while (traversalStack.length > 0) {
        const currID = traversalStack.pop();
        const currBullet = document.createElement('custom-bullet');
        currBullet.setValue(bulletsTree[currID][VALUE], true);
        currBullet.setGetNextID(this.nextIDCallback);
        currBullet.setUniqueID(currID);
        currBullet.setUpdateCallbacks(this.updateCallbacks);

        if (this.listData.parents[currID] === null) {
          currBullet.setNestDepthRem(this.state.nestLimit);
          container.appendChild(currBullet);
        } else {
          this.listData.bulletElements[this.listData.parents[currID]].nestBulletInside(currBullet);
        }
        this.listData.bulletElements[currID] = currBullet;
        const children = bulletsTree[currID][CHILDREN];

        children.slice().reverse().forEach((childID) => {
          this.listData.parents[childID] = currID;
          traversalStack.push(childID);
        });
      }
    });
  }
}

customElements.define('bullet-list', BulletList);
