const notIncluded = require('./notIncluded');

describe('intervals/notIncluded', () => {
  describe('one', () => {
    test('no', () => {
      const myInterval = [10, 20];
      const knownIntervals = [[0, 10]];
      expect(notIncluded(knownIntervals, myInterval)).toEqual([myInterval]);
    });
    test('yes', () => {
      const myInterval = [10, 20];
      const knownIntervals = [[0, 10], [10, 20]];
      expect(notIncluded(knownIntervals, myInterval)).toEqual([]);
    });
    test('yes unmerged', () => {
      const myInterval = [10, 20];
      const knownIntervals = [[0, 15], [10, 20]];
      expect(notIncluded(knownIntervals, myInterval)).toEqual([]);
    });
    test('no unmerged', () => {
      const myInterval = [10, 20];
      const knownIntervals = [[0, 15], [5, 20]];
      expect(notIncluded(knownIntervals, myInterval)).toEqual([myInterval]);
    });
  });
  describe('multi', () => {
    test('yes', () => {
      const myIntervals = [[0, 20], [10, 20]];
      const knownIntervals = [[0, 10], [10, 20]];
      expect(notIncluded(knownIntervals, myIntervals)).toEqual([[0, 20]]);
    });
  });
});
