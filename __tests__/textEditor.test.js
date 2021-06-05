const BulletList = require('../source/src/components/TextEditor/BulletList')
const BaseBullet = require('../source/src/components/TextEditor/Bullet/BaseBullet')
const SimpleBullet = require('../source/src/components/TextEditor/Bullet/SimpleBullet')

const bulletData = {
    elementName: 'simple-bullet',
    tree: {0: [1, 2], 1: ['sample', []], 2: ['sample2', [3]], 3 : ['sample3', []]},
    nestLimit: 2
}
describe("Test using JSDOM", () => {
    beforeAll(() => {
        const bList = document.createElement('bullet-list');
        document.body.appendChild(bList)
        bList.initialiseList({
            saveDataCallback: (data) => console.log('saved test'),
            nestLimit: bulletData.nestLimit,
            bulletTree: bulletData.tree,
            storageIndex: {
                value: 0,
                children: 1,
            },
            elementName: bulletData.elementName,
        })
    })
    test("Test number of top level bullets", () => {
        const topLevelBullets = document.querySelector('bullet-list').querySelectorAll(bulletData.elementName);
        expect(topLevelBullets.length).toBe(2);
    })
    test("Bullet Nesting", () => {
        const topLevelBullets = document.querySelector('bullet-list').querySelectorAll(bulletData.elementName);
        topLevelBullets[1].nestCurrBullet();
        expect(document.querySelector('bullet-list').getBulletTree()).toMatchObject({
                0: [1], 1: ['sample', [2]], 2: ['sample2', [3]], 3 : ['sample3', []]
            }
        )
    })

    test("Bullet Creation", () => {
        const topLevelBullets = document.querySelector('bullet-list').querySelectorAll(bulletData.elementName);
        topLevelBullets[0].createBullet();
        expect(document.querySelector('bullet-list').getBulletTree()).toMatchObject({
                0: [1, 4], 
                1: ['sample', [2]], 
                2: ['sample2', [3]], 
                3: ['sample3', []],
                4: ['', []],
            }
        )
    })

    test("Bullet Editing", () => {
        const bulletElements = document.querySelector('bullet-list').getBulletElements();
        const expectedValue = 'expected Sample'
        bulletElements[4].editContent('value', expectedValue);
        expect(document.querySelector('bullet-list').getBulletTree()).toMatchObject(
            {
                0: [1, 4], 
                1: ['sample', [2]], 
                2: ['sample2', [3]], 
                3: ['sample3', []],
                4: [expectedValue, []],
            }
        )
    })
    test("Bullet Deletion", () => {
        const bulletElements = document.querySelector('bullet-list').getBulletElements();
        bulletElements[4].deleteBullet();
        expect(document.querySelector('bullet-list').getBulletTree()).toMatchObject(
            {
                0: [1], 
                1: ['sample', [2]], 
                2: ['sample2', [3]], 
                3: ['sample3', []],
            }
        )
    })
})