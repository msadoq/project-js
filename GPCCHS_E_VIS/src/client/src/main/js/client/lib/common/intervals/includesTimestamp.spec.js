const includesTimestamp = require('./includesTimestamp');

describe('intervals/includesTimestamp', () => {
  describe('one', () => {
    const myInterval = [0, 10];

    it('lower', () => {
      const result = includesTimestamp(myInterval, myInterval[0] - 1);
      expect(result).toBe(false);
    });

    it('lower limit', () => {
      const result = includesTimestamp(myInterval, myInterval[0]);
      expect(result).toBe(true);
    });

    it('inner', () => {
      const result = includesTimestamp(myInterval, (myInterval[0] + myInterval[1]) / 2);
      expect(result).toBe(true);
    });

    it('upper limit', () => {
      const result = includesTimestamp(myInterval, myInterval[1]);
      expect(result).toBe(true);
    });

    it('upper', () => {
      const result = includesTimestamp(myInterval, myInterval[1] + 1);
      expect(result).toBe(false);
    });
  });
  describe('multi', () => {
    it('merged', () => {
      expect(includesTimestamp([[0, 1], [2, 6]], 1.5)).toBe(false);
      expect(includesTimestamp([[0, 1], [2, 6]], 5)).toBe(true);
    });
    it('unmerged', () => {
      expect(includesTimestamp([[0, 5], [3, 10]], 2)).toBe(true);
      expect(includesTimestamp([[0, 5], [3, 10]], 7)).toBe(true);
    });
  });
});
