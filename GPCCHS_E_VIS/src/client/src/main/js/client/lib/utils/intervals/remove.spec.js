require('../../common/test');
const remove = require('./remove');

describe('intervals/remove', () => {
  describe('one', () => {
    it('none', () => {
      const knownIntervals = [];
      const intervalToExtract = [0, 10];
      const intervals = remove(knownIntervals, intervalToExtract);
      expect(intervals).toHaveLength(0);
    });
    it('outside lower', () => {
      const knownIntervals = [[5, 10], [15, 20]];
      const intervalToExtract = [0, 3];
      const intervals = remove(knownIntervals, intervalToExtract);
      expect(intervals).toEqual([[5, 10], [15, 20]]);
    });
    it('outside upper', () => {
      const knownIntervals = [[0, 10], [15, 20]];
      const intervalToExtract = [25, 30];
      const intervals = remove(knownIntervals, intervalToExtract);
      expect(intervals).toEqual([[0, 10], [15, 20]]);
    });
    it('outside covering', () => {
      const knownIntervals = [[5, 10], [15, 20]];
      const intervalToExtract = [0, 30];
      const intervals = remove(knownIntervals, intervalToExtract);
      expect(intervals).toHaveLength(0);
    });
    it('outside first', () => {
      const knownIntervals = [[5, 15], [20, 30]];
      const intervalToExtract = [0, 25];
      const intervals = remove(knownIntervals, intervalToExtract);
      expect(intervals).toEqual([[25, 30]]);
    });
    it('outside last', () => {
      const knownIntervals = [[0, 15], [20, 30]];
      const intervalToExtract = [5, 35];
      const intervals = remove(knownIntervals, intervalToExtract);
      expect(intervals).toEqual([[0, 5]]);
    });
    it('between covering', () => {
      const knownIntervals = [[0, 15], [20, 30], [40, 50]];
      const intervalToExtract = [17, 35];
      const intervals = remove(knownIntervals, intervalToExtract);
      expect(intervals).toEqual([[0, 15], [40, 50]]);
    });
    it('between outside inside', () => {
      const knownIntervals = [[0, 15], [20, 30], [40, 50]];
      const intervalToExtract = [17, 45];
      const intervals = remove(knownIntervals, intervalToExtract);
      expect(intervals).toEqual([[0, 15], [45, 50]]);
    });
    it('between outside', () => {
      const knownIntervals = [[0, 15], [20, 30], [40, 50]];
      const intervalToExtract = [17, 19];
      const intervals = remove(knownIntervals, intervalToExtract);
      expect(intervals).toEqual([[0, 15], [20, 30], [40, 50]]);
    });
    it('between inside outside', () => {
      const knownIntervals = [[0, 15], [20, 30], [40, 50]];
      const intervalToExtract = [10, 35];
      const intervals = remove(knownIntervals, intervalToExtract);
      expect(intervals).toEqual([[0, 10], [40, 50]]);
    });
    it('between first outside', () => {
      const knownIntervals = [[0, 15], [20, 30], [40, 50]];
      const intervalToExtract = [20, 35];
      const intervals = remove(knownIntervals, intervalToExtract);
      expect(intervals).toEqual([[0, 15], [40, 50]]);
    });
    it('between outside last', () => {
      const knownIntervals = [[0, 15], [20, 30], [40, 50]];
      const intervalToExtract = [17, 30];
      const intervals = remove(knownIntervals, intervalToExtract);
      expect(intervals).toEqual([[0, 15], [40, 50]]);
    });
    it('between first last', () => {
      const knownIntervals = [[0, 15], [20, 30], [40, 50], [77, 91]];
      const intervalToExtract = [20, 50];
      const intervals = remove(knownIntervals, intervalToExtract);
      expect(intervals).toEqual([[0, 15], [77, 91]]);
    });
    it('first whole', () => {
      const knownIntervals = [[0, 7], [11, 14], [42, 91]];
      const intervalToExtract = [0, 7];
      const intervals = remove(knownIntervals, intervalToExtract);
      expect(intervals).toEqual([[11, 14], [42, 91]]);
    });
    it('first first', () => {
      const knownIntervals = [[0, 7], [11, 14], [42, 91]];
      const intervalToExtract = [0, 5];
      const intervals = remove(knownIntervals, intervalToExtract);
      expect(intervals).toEqual([[5, 7], [11, 14], [42, 91]]);
    });
    it('first middle', () => {
      const knownIntervals = [[0, 7], [11, 14], [42, 91]];
      const intervalToExtract = [2, 5];
      const intervals = remove(knownIntervals, intervalToExtract);
      expect(intervals).toEqual([[0, 2], [5, 7], [11, 14], [42, 91]]);
    });
    it('first last', () => {
      const knownIntervals = [[0, 7], [11, 14], [42, 91]];
      const intervalToExtract = [5, 7];
      const intervals = remove(knownIntervals, intervalToExtract);
      expect(intervals).toEqual([[0, 5], [11, 14], [42, 91]]);
    });
    it('middle whole', () => {
      const knownIntervals = [[0, 7], [11, 14], [42, 91]];
      const intervalToExtract = [11, 14];
      const intervals = remove(knownIntervals, intervalToExtract);
      expect(intervals).toEqual([[0, 7], [42, 91]]);
    });
    it('middle first', () => {
      const knownIntervals = [[0, 7], [11, 14], [42, 91]];
      const intervalToExtract = [11, 13];
      const intervals = remove(knownIntervals, intervalToExtract);
      expect(intervals).toEqual([[0, 7], [13, 14], [42, 91]]);
    });
    it('middle middle', () => {
      const knownIntervals = [[0, 7], [11, 14], [42, 91]];
      const intervalToExtract = [12, 13];
      const intervals = remove(knownIntervals, intervalToExtract);
      expect(intervals).toEqual([[0, 7], [11, 12], [13, 14], [42, 91]]);
    });
    it('middle last', () => {
      const knownIntervals = [[0, 7], [11, 14], [42, 91]];
      const intervalToExtract = [12, 14];
      const intervals = remove(knownIntervals, intervalToExtract);
      expect(intervals).toEqual([[0, 7], [11, 12], [42, 91]]);
    });
    it('last whole', () => {
      const knownIntervals = [[0, 7], [11, 14], [42, 91]];
      const intervalToExtract = [42, 91];
      const intervals = remove(knownIntervals, intervalToExtract);
      expect(intervals).toEqual([[0, 7], [11, 14]]);
    });
    it('last first', () => {
      const knownIntervals = [[0, 7], [11, 14], [42, 91]];
      const intervalToExtract = [42, 49];
      const intervals = remove(knownIntervals, intervalToExtract);
      expect(intervals).toEqual([[0, 7], [11, 14], [49, 91]]);
    });
    it('last middle', () => {
      const knownIntervals = [[0, 7], [11, 14], [42, 91]];
      const intervalToExtract = [77, 82];
      const intervals = remove(knownIntervals, intervalToExtract);
      expect(intervals).toEqual([[0, 7], [11, 14], [42, 77], [82, 91]]);
    });
    it('last last', () => {
      const knownIntervals = [[0, 7], [11, 14], [42, 91]];
      const intervalToExtract = [77, 91];
      const intervals = remove(knownIntervals, intervalToExtract);
      expect(intervals).toEqual([[0, 7], [11, 14], [42, 77]]);
    });
    it('unmerged', () => {
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
