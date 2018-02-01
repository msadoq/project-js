// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Cleanup client/ file organization and test helper modules
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// END-HISTORY
// ====================================================================

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
