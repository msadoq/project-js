const getIncludesTimestamp = require('./getIncludesTimestamp');

describe('intervals/getIncludesTimestamp', () => {
  describe('one', () => {
    const myInterval = [0, 10];

    test('lower', () => {
      const result = getIncludesTimestamp(myInterval, myInterval[0] - 1);
      expect(result).toMatchObject({ isInInterval: false, interval: [] });
    });

    test('lower limit', () => {
      const result = getIncludesTimestamp(myInterval, myInterval[0]);
      expect(result).toMatchObject({
        isInInterval: true,
        interval: [myInterval[0], myInterval[0]],
      });
    });

    test('inner', () => {
      const result = getIncludesTimestamp(myInterval, (myInterval[0] + myInterval[1]) / 2);
      expect(result).toMatchObject({
        isInInterval: true,
        interval: [myInterval[0], (myInterval[0] + myInterval[1]) / 2],
      });
    });

    test('upper limit', () => {
      const result = getIncludesTimestamp(myInterval, myInterval[1]);
      expect(result).toMatchObject({ isInInterval: true, interval: myInterval });
    });

    test('upper', () => {
      const result = getIncludesTimestamp(myInterval, myInterval[1] + 1);
      expect(result).toMatchObject({ isInInterval: false, interval: [] });
    });
  });
  describe('multi', () => {
    test('merged', () => {
      expect(getIncludesTimestamp([[0, 1], [2, 6]], 1.5))
      .toMatchObject({ isInInterval: false, interval: [] });
      expect(getIncludesTimestamp([[0, 1], [2, 6]], 5))
      .toMatchObject({ isInInterval: true, interval: [2, 5] });
    });
    test('unmerged', () => {
      expect(getIncludesTimestamp([[0, 5], [3, 10]], 2))
      .toMatchObject({ isInInterval: true, interval: [0, 2] });
      expect(getIncludesTimestamp([[0, 5], [3, 10]], 7))
      .toMatchObject({ isInInterval: true, interval: [3, 7] });
    });
  });
});
