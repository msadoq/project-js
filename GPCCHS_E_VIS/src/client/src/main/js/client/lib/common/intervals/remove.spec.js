// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Cleanup client/ file organization and test helper modules
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// END-HISTORY
// ====================================================================

const remove = require('./remove');

describe('intervals/remove', () => {
  describe('one', () => {
    test('none', () => {
      const knownIntervals = [];
      const intervalToExtract = [0, 10];
      const intervals = remove(knownIntervals, intervalToExtract);
      expect(intervals).toHaveLength(0);
    });
    test('outside lower', () => {
      const knownIntervals = [[5, 10], [15, 20]];
      const intervalToExtract = [0, 3];
      const intervals = remove(knownIntervals, intervalToExtract);
      expect(intervals).toEqual([[5, 10], [15, 20]]);
    });
    test('outside upper', () => {
      const knownIntervals = [[0, 10], [15, 20]];
      const intervalToExtract = [25, 30];
      const intervals = remove(knownIntervals, intervalToExtract);
      expect(intervals).toEqual([[0, 10], [15, 20]]);
    });
    test('outside covering', () => {
      const knownIntervals = [[5, 10], [15, 20]];
      const intervalToExtract = [0, 30];
      const intervals = remove(knownIntervals, intervalToExtract);
      expect(intervals).toHaveLength(0);
    });
    test('outside first', () => {
      const knownIntervals = [[5, 15], [20, 30]];
      const intervalToExtract = [0, 25];
      const intervals = remove(knownIntervals, intervalToExtract);
      expect(intervals).toEqual([[25, 30]]);
    });
    test('outside last', () => {
      const knownIntervals = [[0, 15], [20, 30]];
      const intervalToExtract = [5, 35];
      const intervals = remove(knownIntervals, intervalToExtract);
      expect(intervals).toEqual([[0, 5]]);
    });
    test('between covering', () => {
      const knownIntervals = [[0, 15], [20, 30], [40, 50]];
      const intervalToExtract = [17, 35];
      const intervals = remove(knownIntervals, intervalToExtract);
      expect(intervals).toEqual([[0, 15], [40, 50]]);
    });
    test('between outside inside', () => {
      const knownIntervals = [[0, 15], [20, 30], [40, 50]];
      const intervalToExtract = [17, 45];
      const intervals = remove(knownIntervals, intervalToExtract);
      expect(intervals).toEqual([[0, 15], [45, 50]]);
    });
    test('between outside', () => {
      const knownIntervals = [[0, 15], [20, 30], [40, 50]];
      const intervalToExtract = [17, 19];
      const intervals = remove(knownIntervals, intervalToExtract);
      expect(intervals).toEqual([[0, 15], [20, 30], [40, 50]]);
    });
    test('between inside outside', () => {
      const knownIntervals = [[0, 15], [20, 30], [40, 50]];
      const intervalToExtract = [10, 35];
      const intervals = remove(knownIntervals, intervalToExtract);
      expect(intervals).toEqual([[0, 10], [40, 50]]);
    });
    test('between first outside', () => {
      const knownIntervals = [[0, 15], [20, 30], [40, 50]];
      const intervalToExtract = [20, 35];
      const intervals = remove(knownIntervals, intervalToExtract);
      expect(intervals).toEqual([[0, 15], [40, 50]]);
    });
    test('between outside last', () => {
      const knownIntervals = [[0, 15], [20, 30], [40, 50]];
      const intervalToExtract = [17, 30];
      const intervals = remove(knownIntervals, intervalToExtract);
      expect(intervals).toEqual([[0, 15], [40, 50]]);
    });
    test('between first last', () => {
      const knownIntervals = [[0, 15], [20, 30], [40, 50], [77, 91]];
      const intervalToExtract = [20, 50];
      const intervals = remove(knownIntervals, intervalToExtract);
      expect(intervals).toEqual([[0, 15], [77, 91]]);
    });
    test('first whole', () => {
      const knownIntervals = [[0, 7], [11, 14], [42, 91]];
      const intervalToExtract = [0, 7];
      const intervals = remove(knownIntervals, intervalToExtract);
      expect(intervals).toEqual([[11, 14], [42, 91]]);
    });
    test('first first', () => {
      const knownIntervals = [[0, 7], [11, 14], [42, 91]];
      const intervalToExtract = [0, 5];
      const intervals = remove(knownIntervals, intervalToExtract);
      expect(intervals).toEqual([[5, 7], [11, 14], [42, 91]]);
    });
    test('first middle', () => {
      const knownIntervals = [[0, 7], [11, 14], [42, 91]];
      const intervalToExtract = [2, 5];
      const intervals = remove(knownIntervals, intervalToExtract);
      expect(intervals).toEqual([[0, 2], [5, 7], [11, 14], [42, 91]]);
    });
    test('first last', () => {
      const knownIntervals = [[0, 7], [11, 14], [42, 91]];
      const intervalToExtract = [5, 7];
      const intervals = remove(knownIntervals, intervalToExtract);
      expect(intervals).toEqual([[0, 5], [11, 14], [42, 91]]);
    });
    test('middle whole', () => {
      const knownIntervals = [[0, 7], [11, 14], [42, 91]];
      const intervalToExtract = [11, 14];
      const intervals = remove(knownIntervals, intervalToExtract);
      expect(intervals).toEqual([[0, 7], [42, 91]]);
    });
    test('middle first', () => {
      const knownIntervals = [[0, 7], [11, 14], [42, 91]];
      const intervalToExtract = [11, 13];
      const intervals = remove(knownIntervals, intervalToExtract);
      expect(intervals).toEqual([[0, 7], [13, 14], [42, 91]]);
    });
    test('middle middle', () => {
      const knownIntervals = [[0, 7], [11, 14], [42, 91]];
      const intervalToExtract = [12, 13];
      const intervals = remove(knownIntervals, intervalToExtract);
      expect(intervals).toEqual([[0, 7], [11, 12], [13, 14], [42, 91]]);
    });
    test('middle last', () => {
      const knownIntervals = [[0, 7], [11, 14], [42, 91]];
      const intervalToExtract = [12, 14];
      const intervals = remove(knownIntervals, intervalToExtract);
      expect(intervals).toEqual([[0, 7], [11, 12], [42, 91]]);
    });
    test('last whole', () => {
      const knownIntervals = [[0, 7], [11, 14], [42, 91]];
      const intervalToExtract = [42, 91];
      const intervals = remove(knownIntervals, intervalToExtract);
      expect(intervals).toEqual([[0, 7], [11, 14]]);
    });
    test('last first', () => {
      const knownIntervals = [[0, 7], [11, 14], [42, 91]];
      const intervalToExtract = [42, 49];
      const intervals = remove(knownIntervals, intervalToExtract);
      expect(intervals).toEqual([[0, 7], [11, 14], [49, 91]]);
    });
    test('last middle', () => {
      const knownIntervals = [[0, 7], [11, 14], [42, 91]];
      const intervalToExtract = [77, 82];
      const intervals = remove(knownIntervals, intervalToExtract);
      expect(intervals).toEqual([[0, 7], [11, 14], [42, 77], [82, 91]]);
    });
    test('last last', () => {
      const knownIntervals = [[0, 7], [11, 14], [42, 91]];
      const intervalToExtract = [77, 91];
      const intervals = remove(knownIntervals, intervalToExtract);
      expect(intervals).toEqual([[0, 7], [11, 14], [42, 77]]);
    });
    test('unmerged', () => {
      const knownIntervals = [[0, 7], [3, 14], [42, 91]];
      const intervalToExtract = [0, 7];
      const intervals = remove(knownIntervals, intervalToExtract);
      expect(intervals).toEqual([[3, 14], [42, 91]]);
      const knownIntervals2 = [[0, 7], [3, 14], [42, 91]];
      const intervalToExtract2 = [3, 14];
      const intervals2 = remove(knownIntervals2, intervalToExtract2);
      expect(intervals2).toEqual([[0, 7], [42, 91]]);
    });
  });
});
