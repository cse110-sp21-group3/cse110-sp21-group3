const sumNums = require('../source/src/SumNums');

describe('Sum of numbers function', () => {
  test('Should return the correct sum of numbers', () => {
    expect(sumNums([1, 2, 3, 4])).toEqual(10);
  });
  test('Should return the correct sum of numbers for empty list', () => {
    expect(sumNums([])).toEqual(0);
  });
});
