import '../source/src/components/TextEditor/BulletList';
import '../source/src/components/TextEditor/Bullet/SimpleBullet';

const bulletData = {
  elementName: 'simple-bullet',
  tree: {
    0: [1, 2], 1: ['sample', []], 2: ['sample2', [3]], 3: ['sample3', []],
  },
  nestLimit: 2,
};
const bulletData2 = {
  elementName: 'simple-bullet',
  tree: {
    0: [1, 2, 3], 1: ['test', []],2: ['test2', []], 3: ['test3', []],
  },
  nestLimit: 2,
};
const bulletData3 = {
  elementName: 'simple-bullet',
  tree: {
    0: [1, 2, 6], 1: ['a', []],2: ['b', [3]], 3: ['c', [4]], 4: ['d', [5]], 5: ['e', []], 6: ['f', []],
  },
  nestLimit: 3,
};
describe('Basic tests for TextEditor', () => {
  beforeAll(() => {
    const bList = document.createElement('bullet-list');
    document.body.appendChild(bList);
    bList.initialiseList({
      nestLimit: bulletData.nestLimit,
      bulletTree: bulletData.tree,
      storageIndex: {
        value: 0,
        children: 1,
      },
      elementName: bulletData.elementName,
    });
  });
  afterAll(() => {
    document.querySelector('bullet-list').remove();
  });

  test('Test number of top level bullets', () => {
    const topLevelBullets = document.querySelector('bullet-list').querySelectorAll(bulletData.elementName);
    expect(topLevelBullets).toHaveLength(2);
  });
  test('Test finding last bullet inside regular bullet', () => {
    const bList = document.querySelector('bullet-list');
    const lastBulletID = bList.findLastBulletInside(1);
    expect(lastBulletID).toBe(1);
  });
  test('Test Bullet Nesting', () => {
    const topLevelBullets = document.querySelector('bullet-list').querySelectorAll(bulletData.elementName);
    topLevelBullets[1].nestCurrBullet();
    expect(document.querySelector('bullet-list').getBulletTree()).toMatchObject({
      0: [1], 1: ['sample', [2]], 2: ['sample2', [3]], 3: ['sample3', []],
    });
  });
  test('Test Bullet Creation', () => {
    const topLevelBullets = document.querySelector('bullet-list').querySelectorAll(bulletData.elementName);
    topLevelBullets[0].createBullet();
    expect(document.querySelector('bullet-list').getBulletTree()).toMatchObject({
      0: [1, 4],
      1: ['sample', [2]],
      2: ['sample2', [3]],
      3: ['sample3', []],
      4: ['', []],
    });
  });
  test('Test Bullet Editing', () => {
    const bulletElements = document.querySelector('bullet-list').getBulletElements();
    const expectedValue = 'expected Sample';
    bulletElements[4].editContent('value', expectedValue);
    expect(document.querySelector('bullet-list').getBulletTree()).toMatchObject(
      {
        0: [1, 4],
        1: ['sample', [2]],
        2: ['sample2', [3]],
        3: ['sample3', []],
        4: [expectedValue, []],
      },
    );
  });
  test('Test Bullet Deletion', () => {
    const bulletElements = document.querySelector('bullet-list').getBulletElements();
    bulletElements[4].deleteBullet();
    expect(document.querySelector('bullet-list').getBulletTree()).toMatchObject(
      {
        0: [1],
        1: ['sample', [2]],
        2: ['sample2', [3]],
        3: ['sample3', []],
      },
    );
  });
  test('Test finding next bullet down of last bullet', () => {
    const bList = document.querySelector('bullet-list');
    const nextBulletID = bList.findNextBulletDown(3);
    expect(nextBulletID).toBe(null);
  });
  test('Test finding last bullet inside nest', () => {
    const bList = document.querySelector('bullet-list');
    const lastBulletID = bList.findLastBulletInside(2);
    expect(lastBulletID).toBe(3);
  });
});

describe('Tests for Bullet Dataset2', () => {
  beforeAll(() => {
    const bList = document.createElement('bullet-list');
    document.body.appendChild(bList);
    bList.initialiseList({
      nestLimit: bulletData2.nestLimit,
      bulletTree: bulletData2.tree,
      storageIndex: {
        value: 0,
        children: 1,
      },
      elementName: bulletData2.elementName,
    });
    
  });
  afterAll(() => {
    document.querySelector('bullet-list').remove();
  });
  test('Test number of top level bullets', () => {
    const topLevelBullets = document.querySelector('bullet-list').querySelectorAll(bulletData2.elementName);
    expect(topLevelBullets).toHaveLength(3);
  });

  test('Test Bullet Nesting', () => {
    const topLevelBullets = document.querySelector('bullet-list').querySelectorAll(bulletData2.elementName);
    topLevelBullets[1].nestCurrBullet();
    expect(document.querySelector('bullet-list').getBulletTree()).toMatchObject(
      {
        0: [1, 3], 
        1: ['test', [2]], 
        2: ['test2', []], 
        3: ['test3', []],
    });
  });

  test('Test Double Nesting of bullet', () => {
    const topLevelBullets = document.querySelector('bullet-list').querySelectorAll(bulletData2.elementName);
    topLevelBullets[1].nestCurrBullet();
    expect(document.querySelector('bullet-list').getBulletTree()).toMatchObject(
      {
        0: [1], 
        1: ['test', [2,3]], 
        2: ['test2', []], 
        3: ['test3', []],
    });
  });
  test('Test Nested Bullet Editing', () => {
    const bulletElements = document.querySelector('bullet-list').getBulletElements();
    const expectedValue = 'Edited Bullet';
    bulletElements[2].editContent('value', expectedValue);
    expect(document.querySelector('bullet-list').getBulletTree()).toMatchObject(
      {
        0: [1], 
        1: ['test', [2,3]], 
        2: ['Edited Bullet', []], 
        3: ['test3', []],
    });
  });
  test('Test Bullet Creation', () => {
    const topLevelBullets = document.querySelector('bullet-list').querySelectorAll(bulletData.elementName);
    topLevelBullets[0].createBullet();
    const bulletElements = document.querySelector('bullet-list').getBulletElements();
    const expectedValue = 'Bullet 4';
    bulletElements[4].editContent('value', expectedValue);
    expect(document.querySelector('bullet-list').getBulletTree()).toMatchObject(
      {
        0: [1,4], 
        1: ['test', [2,3]], 
        2: ['Edited Bullet', []], 
        3: ['test3', []],
        4: ['Bullet 4', []],
    });
  });
  test('Test Nested Bullet Deletion', () => {
    const bulletElements = document.querySelector('bullet-list').getBulletElements();
    bulletElements[3].deleteBullet();
    expect(document.querySelector('bullet-list').getBulletTree()).toMatchObject(
      {
        0: [1,4], 
        1: ['test', [2]], 
        2: ['Edited Bullet', []], 
        4: ['Bullet 4', []],
    });
  });
  test('Test finding last bullet inside nest', () => {
    const bList = document.querySelector('bullet-list');
    const lastBulletID = bList.findLastBulletInside(1);
    expect(lastBulletID).toBe(2);
  });
  test('Test finding next bullet down', () => {
    const bList = document.querySelector('bullet-list');
    const nextBulletID = bList.findNextBulletDown(1);
    expect(nextBulletID).toBe(2);
    const nextnextBulletID = bList.findNextBulletDown(2);
    expect(nextnextBulletID).toBe(4);
  });
});

describe('Tests for Bullet Dataset3', () => {
  beforeAll(() => {
    const bList = document.createElement('bullet-list');
    document.body.appendChild(bList);
    bList.initialiseList({
      nestLimit: bulletData3.nestLimit,
      bulletTree: bulletData3.tree,
      storageIndex: {
        value: 0,
        children: 1,
      },
      elementName: bulletData3.elementName,
    });
    
  });
  afterAll(() => {
    document.querySelector('bullet-list').remove();
  });
  test('Test number of top level bullets', () => {
    const topLevelBullets = document.querySelector('bullet-list').querySelectorAll(bulletData3.elementName);
    expect(topLevelBullets).toHaveLength(3);
  });
  test('Test finding last bullet inside nest', () => {
    const bList = document.querySelector('bullet-list');
    const lastBulletID = bList.findLastBulletInside(2);
    expect(lastBulletID).toBe(5);
  });
  test('Test Deletion of Bullet with Nested Elements', () => {
    const bulletElements = document.querySelector('bullet-list').getBulletElements();
    bulletElements[2].deleteBullet();
    expect(document.querySelector('bullet-list').getBulletTree()).toMatchObject(
      {
        0: [1,6], 
        1: ['a', []], 
        6: ['f', []],
    });
  });
  test('Test finding next bullet down', () => {
    const bList = document.querySelector('bullet-list');
    const nextBulletID = bList.findNextBulletDown(1);
    expect(nextBulletID).toBe(6);
    const nextnextBulletID = bList.findNextBulletDown(6);
    expect(nextnextBulletID).toBe(null);
  });
  
  test('Test Bullet Creation into Nest', () => {
    const topLevelBullets = document.querySelector('bullet-list').querySelectorAll(bulletData3.elementName);
    topLevelBullets[0].createBullet();
    const bulletElements = document.querySelector('bullet-list').getBulletElements();
    const expectedValue = 'New Bullet';
    bulletElements[7].editContent('value', expectedValue);
    expect(document.querySelector('bullet-list').getBulletTree()).toMatchObject(
      {
        0: [1,7, 6], 
        1: ['a', []], 
        7: ['New Bullet', []],
        6: ['f', []],
    });
  });
  test('Test Bullet Nesting for first bullet', () => {
    const topLevelBullets = document.querySelector('bullet-list').querySelectorAll(bulletData3.elementName);
    topLevelBullets[1].nestCurrBullet();
    expect(document.querySelector('bullet-list').getBulletTree()).toMatchObject(
      {
        0: [1, 6], 
        1: ['a', [7]], 
        7: ['New Bullet', []],
        6: ['f', []],
    });
  });
  test('Test deleting first bullet with nested elements', () => {
    const bulletElements = document.querySelector('bullet-list').getBulletElements();
    bulletElements[7].deleteBullet();
    expect(document.querySelector('bullet-list').getBulletTree()).toMatchObject(
      {
        0: [1, 6], 
        1: ['a', []], 
        6: ['f', []],
    });
  });
  test('Test nesting elements with null parent', () => {
    const bulletElements = document.querySelector('bullet-list').getBulletElements();
    const topLevelBullets = document.querySelector('bullet-list').querySelectorAll(bulletData3.elementName);
    topLevelBullets[0].createBullet();
    const expectedValue = 'e';
    bulletElements[8].editContent('value', expectedValue);
    topLevelBullets[1].nestCurrBullet();
    bulletElements[8].editContent('value', '');
    expect(document.querySelector('bullet-list').getBulletTree()).toMatchObject(
      {
        0: [1, 8], 
        1: ['a', []], 
        8: ['', [6]],
        6: ['f', []],
    });
  });
});
