/**
 * This is a wrapper element which will take a list of bullet values and render
 * it in a bullet list format and also return the updated list of bullets
 * (with nested) as they are edited
 */
const TOP_LEVEL_ORDER_ID = 0;
const autoSaveInterval = 1000; // in ms
class BulletList extends HTMLElement {
  constructor() {
    super();
    this.elementName = '';
    this.storageIndex = {};
    this.bulletConfigs = {};
    this.state = {
      value: [],
      nestLimit: 2,
      nextID: 1,
      unsaved: false,
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

    this.getAdjacentBullet = (bulletID, directionUp) => {
      const parentID = this.listData.parents[bulletID];
      let sibblingBullets; let
        nextBulletID;
      if (parentID === null) sibblingBullets = this.listData.tree[TOP_LEVEL_ORDER_ID];
      else sibblingBullets = this.listData.tree[parentID][this.storageIndex.children];

      const currBulletIndex = sibblingBullets.indexOf(bulletID);

      if (directionUp) {
        if (currBulletIndex === 0) nextBulletID = this.listData.parents[bulletID];
        else nextBulletID = this.findLastBulletInside(sibblingBullets[currBulletIndex - 1]);
      } else {
        nextBulletID = this.findNextBulletDown(bulletID);
      }
      if (nextBulletID === null) return null;
      return this.listData.bulletElements[nextBulletID];
    };
    this.updateCallbacks = {
      saveData: () => console.error('Bullet.saveDataCallback is not setup'), // This callback needs to be provided by the user through `setSaveData()`
      createBullet: (sourceID, newBullet) => {
        // Assumption: A bullet can be created only in the same nest level as the `sourceID`
        // Save in tree
        this.state.unsaved = true;
        this.listData.tree[newBullet.uniqueID] = newBullet.serialize(); // Children is left as empty

        const parentID = this.listData.parents[sourceID];

        let sibblingsOrder = [];
        if (parentID === null) sibblingsOrder = this.listData.tree[TOP_LEVEL_ORDER_ID];
        else sibblingsOrder = this.listData.tree[parentID][this.storageIndex.children];

        const sourceIndex = sibblingsOrder.indexOf(sourceID);
        sibblingsOrder.splice(sourceIndex + 1, 0, newBullet.uniqueID); // Save in tree (structure)
        this.state.unsaved = true;

        const saving = document.querySelector('.saving');
        if (saving) { saving.innerHTML = 'Saving...'; }

        this.listData.bulletElements[newBullet.uniqueID] = newBullet; // Save in bulletElements
        this.listData.parents[newBullet.uniqueID] = parentID; // Save in parents
      },
      deleteBullet: (bulletID) => {
        if (
          this.listData.tree[TOP_LEVEL_ORDER_ID].includes(bulletID)
          && (this.listData.tree[TOP_LEVEL_ORDER_ID].length <= 1)
        ) {
          return false; // Only bullet remaining so deletion not allowed
        }
        this.state.unsaved = true;
        delete this.listData.tree[bulletID];

        const parentID = this.listData.parents[bulletID];
        let sibblingsOrder = [];
        if (parentID === null) sibblingsOrder = this.listData.tree[TOP_LEVEL_ORDER_ID];
        else sibblingsOrder = this.listData.tree[parentID][this.storageIndex.children];
        const bulletIndex = sibblingsOrder.indexOf(bulletID);
        if (bulletIndex !== -1) {
          this.state.unsaved = true;
          sibblingsOrder.splice(bulletIndex, 1);
        }

        delete this.listData.bulletElements[bulletID];
        delete this.listData.parents[bulletID];

        return true;
      },
      editContent: (parameter, bulletID, newValue) => {
        this.state.unsaved = true;
        this.listData.tree[bulletID][this.storageIndex[parameter]] = newValue;
        const saving = document.querySelector('.saving');
        if (saving) { saving.innerHTML = 'Saving...'; }
      },
      nestCurrBullet: (bulletID, newParentID, forward) => {
        this.state.unsaved = true;
        const oldParentID = this.listData.parents[bulletID];
        const saving = document.querySelector('.saving');
        if (saving) { saving.innerHTML = 'Saving...'; }
        // Remove from parent
        let sibblingsOrder;
        if (oldParentID === null) sibblingsOrder = this.listData.tree[TOP_LEVEL_ORDER_ID];
        else sibblingsOrder = this.listData.tree[oldParentID][this.storageIndex.children];
        const index = sibblingsOrder.indexOf(bulletID);
        if (index !== -1) sibblingsOrder.splice(index, 1);

        // Add to new parent
        if (forward) {
          this.listData.tree[newParentID][this.storageIndex.children].push(bulletID);
        } else {
          let newSibblingsOrder;
          if (newParentID === null) newSibblingsOrder = this.listData.tree[TOP_LEVEL_ORDER_ID];
          else newSibblingsOrder = this.listData.tree[newParentID][this.storageIndex.children];
          const oldParentIndex = newSibblingsOrder.indexOf(oldParentID);
          newSibblingsOrder.splice(oldParentIndex + 1, 0, bulletID);
        }

        // Update ID - parent map
        this.listData.parents[bulletID] = newParentID;
      },
    };
  }

  /**
   * User must initialise the following attributes for the bullet list to function properly
   *
   * @param {Object} listAttributes
   * @param {function} listAttributes.saveDataCallback
   * @param {number} listAttributes.nestLimit - Limit for nesting levels
   * @param {Object} listAttributes.bulletTree - Adjacency list structure with content for the list
   * @param {Object} listAttributes.storageIndex - Gives storage indices of each bullet parameter
   * @param {Object} listAttributes.elementName
   * @param {Object} [listAttributes.bulletStyle] - CSS Styling for Bullet
   */
  initialiseList(listAttributes) {
    this.updateCallbacks.saveData = () => {
      if (this.state.unsaved) {
        listAttributes.saveDataCallback(this.listData.tree);
        this.state.unsaved = false;
        const saving = document.querySelector('.saving');
        if (saving) { saving.innerHTML = '&nbsp;'; }
      }
    };
    this.state.nestLimit = listAttributes.nestLimit;
    this.storageIndex = listAttributes.storageIndex;
    this.elementName = listAttributes.elementName;
    if ('bulletConfigs' in listAttributes) this.bulletConfigs = listAttributes.bulletConfigs; // Configs to pass to new Bullet

    this.innerHTML = '<div class="bullet-list"></div>';
    this.setValue(listAttributes.bulletTree);

    window.onbeforeunload = () => {
      this.updateCallbacks.saveData();
    };
  }

  connectedCallback() {
    this.autoSaveHandler = setInterval(() => {
      this.updateCallbacks.saveData();
    }, autoSaveInterval);
  }

  disconnectedCallback() {
    clearInterval(this.autoSaveHandler);
  }

  getBulletTree() {
    return this.listData.tree;
  }

  /**
   * Added for testing
   * @returns map between IDs and their dom element
   */
  getBulletElements() {
    return this.listData.bulletElements;
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
   * Sets and renders the bullet list according to the passed bullet tree
   * @param {Object} bulletsTree - Tree in format similar to adjacency list.
   * Example of bulletsTree would be: {
   *  0 : [1, 4, 6],
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

      this.listData.parents[bulletID] = null;
      const traversalStack = [bulletID];

      while (traversalStack.length > 0) {
        const currID = traversalStack.pop();
        const currBullet = document.createElement(this.elementName);
        currBullet.initialiseBullet({
          updateCallbacks: this.updateCallbacks,
          getNextID: this.nextIDCallback,
          getAdjacentBullet: this.getAdjacentBullet,
          uniqueID: currID,
          textContent: bulletsTree[currID][this.storageIndex.value],
          storageIndex: this.storageIndex,
          data: this.listData.tree[currID],
          bulletConfigs: this.bulletConfigs,
        });

        if (this.listData.parents[currID] === null) {
          currBullet.setNestDepthRem(this.state.nestLimit);
          container.appendChild(currBullet);
        } else {
          this.listData.bulletElements[this.listData.parents[currID]].nestBulletInside(currBullet);
        }
        this.listData.bulletElements[currID] = currBullet;
        const children = bulletsTree[currID][this.storageIndex.children];

        children.slice().reverse().forEach((childID) => {
          this.listData.parents[childID] = currID;
          traversalStack.push(childID);
        });
      }
    });
  }

  /**
   * Returns the last bullet nested inside `bulletID`
   * @param {*} bulletID
   * @returns {*} bulletID
   */
  findLastBulletInside(bulletID) {
    const numChildrens = this.listData.tree[bulletID][this.storageIndex.children].length;
    if (numChildrens === 0) return bulletID;
    return this.findLastBulletInside(
      this.listData.tree[bulletID][this.storageIndex.children][numChildrens - 1],
    );
  }

  /**
   * Returns the next bullet in the downward direction
   * @param {*} bulletID
   * @param {Boolean} allowChildren
   * @returns {*} bulletID
   */
  findNextBulletDown(bulletID, allowChildren = true) {
    if (bulletID === null) return null;
    if (allowChildren) {
      const children = this.listData.tree[bulletID][this.storageIndex.children];
      if (children.length > 0) return children[0]; // Return its first children
    }

    const parentID = this.listData.parents[bulletID];
    let sibblingBullets;

    if (parentID === null) sibblingBullets = this.listData.tree[TOP_LEVEL_ORDER_ID];
    else sibblingBullets = this.listData.tree[parentID][this.storageIndex.children];
    const currBulletIndex = sibblingBullets.indexOf(bulletID);

    if (currBulletIndex < sibblingBullets.length - 1) {
      return sibblingBullets[currBulletIndex + 1];
    } // Return next bullet in current nested level

    return this.findNextBulletDown(parentID, false);
  }
}

customElements.define('bullet-list', BulletList);
