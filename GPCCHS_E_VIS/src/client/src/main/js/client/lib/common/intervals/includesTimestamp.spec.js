const includesTimestamp = require('./includesTimestamp');

describe('intervals/includesTimestamp', () => {
  describe('one', () => {
    const myInterval = [0, 10];

    test('lower', () => {
      const result = includesTimestamp(myInterval, myInterval[0] - 1);
      expect(result).toBe(false);
    });

    test('lower limit', () => {
      const result = includesTimestamp(myInterval, myInterval[0]);
      expect(result).toBe(true);
    });

    test('inner', () => {
      const result = includesTimestamp(myInterval, (myInterval[0] + myInterval[1]) / 2);
      expect(result).toBe(true);
    });

    test('upper limit', () => {
      const result = includesTimestamp(myInterval, myInterval[1]);
      expect(result).toBe(true);
    });

    test('upper', () => {
      const result = includesTimestamp(myInterval, myInterval[1] + 1);
      expect(result).toBe(false);
    });
  });
  describe('multi', () => {
    test('merged', () => {
      expect(includesTimestamp([[0, 1], [2, 6]], 1.5)).toBe(false);
      expect(includesTimestamp([[0, 1], [2, 6]], 5)).toBe(true);
    });
    test('unmerged', () => {
      expect(includesTimestamp([[0, 5], [3, 10]], 2)).toBe(true);
      expect(includesTimestamp([[0, 5], [3, 10]], 7)).toBe(true);
    });
  });
});
