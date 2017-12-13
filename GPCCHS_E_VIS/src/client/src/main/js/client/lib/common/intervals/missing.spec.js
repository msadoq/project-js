// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Cleanup client/ file organization and test helper modules
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// END-HISTORY
// ====================================================================

const missing = require('./missing');

describe('retrieveMissingIntervals', () => {
  test('no connected data', () => {
    const myInterval = [0, 10];
    const intervals = missing([], myInterval);
    expect(intervals).toHaveLength(1);
    expect(intervals[0]).toHaveLength(2);
    expect(intervals[0][0]).toBe(myInterval[0]);
    expect(intervals[0][1]).toBe(myInterval[1]);
  });
  test('lower', () => {
    const myInterval = [0, 2];
    const knownIntervals = [[4, 6], [8, 10]];
    // check test
    const intervals = missing(knownIntervals, myInterval);
    expect(intervals).toHaveLength(1);
    expect(intervals[0]).toHaveLength(2);
    expect(intervals[0][0]).toBe(myInterval[0]);
    expect(intervals[0][1]).toBe(myInterval[1]);
  });
  test('lower and inner inside interval', () => {
    const myInterval = [0, 5];
    const knownIntervals = [[4, 6], [8, 10]];
    // check test
    const intervals = missing(knownIntervals, myInterval);
    expect(intervals).toHaveLength(1);
    expect(intervals[0]).toHaveLength(2);
    expect(intervals[0][0]).toBe(myInterval[0]);
    expect(intervals[0][1]).toBe(knownIntervals[0][0]);
  });
  test('lower and inner outside interval', () => {
    const myInterval = [0, 7];
    const knownIntervals = [[4, 6], [8, 10]];
    // check test
    const intervals = missing(knownIntervals, myInterval);
    expect(intervals).toHaveLength(2);
    expect(intervals[0]).toHaveLength(2);
    expect(intervals[0][0]).toBe(myInterval[0]);
    expect(intervals[0][1]).toBe(knownIntervals[0][0]);
    expect(intervals[1]).toHaveLength(2);
    expect(intervals[1][0]).toBe(knownIntervals[0][1]);
    expect(intervals[1][1]).toBe(myInterval[1]);
  });
  test('inner in/out', () => {
    const myInterval = [1, 3];
    const knownIntervals = [[0, 2], [4, 6], [8, 10]];
    // check test
    const intervals = missing(knownIntervals, myInterval);
    expect(intervals).toHaveLength(1);
    expect(intervals[0]).toHaveLength(2);
    expect(intervals[0][0]).toBe(knownIntervals[0][1]);
    expect(intervals[0][1]).toBe(myInterval[1]);
  });
  test('inner in-between', () => {
    const myInterval = [6.5, 7.5];
    const knownIntervals = [[0, 2], [4, 6], [8, 10]];
    // check test
    const intervals = missing(knownIntervals, myInterval);
    expect(intervals).toHaveLength(1);
    expect(intervals[0]).toHaveLength(2);
    expect(intervals[0][0]).toBe(myInterval[0]);
    expect(intervals[0][1]).toBe(myInterval[1]);
  });
  test('inner inside interval', () => {
    const myInterval = [4.5, 5.5];
    const knownIntervals = [[0, 2], [4, 6], [8, 10]];
    // check test
    const intervals = missing(knownIntervals, myInterval);
    expect(intervals).toHaveLength(0);
  });
  test('inner out/in', () => {
    const myInterval = [3, 5];
    const knownIntervals = [[0, 2], [4, 6], [8, 10]];
    // check test
    const intervals = missing(knownIntervals, myInterval);
    expect(intervals).toHaveLength(1);
    expect(intervals[0]).toHaveLength(2);
    expect(intervals[0][0]).toBe(myInterval[0]);
    expect(intervals[0][1]).toBe(knownIntervals[1][0]);
  });
  test('inner covering outside intervals', () => {
    const myInterval = [3, 7];
    const knownIntervals = [[0, 2], [4, 4.5], [5, 6], [8, 10]];
    // check test
    const intervals = missing(knownIntervals, myInterval);
    expect(intervals).toHaveLength(3);
    expect(intervals[0]).toHaveLength(2);
    expect(intervals[0][0]).toBe(myInterval[0]);
    expect(intervals[0][1]).toBe(knownIntervals[1][0]);
    expect(intervals[1]).toHaveLength(2);
    expect(intervals[1][0]).toBe(knownIntervals[1][1]);
    expect(intervals[1][1]).toBe(knownIntervals[2][0]);
    expect(intervals[2]).toHaveLength(2);
    expect(intervals[2][0]).toBe(knownIntervals[2][1]);
    expect(intervals[2][1]).toBe(myInterval[1]);
  });
  test('inner covering inside intervals', () => {
    const myInterval = [1, 5];
    const knownIntervals = [[0, 2], [4, 6], [8, 10]];
    // check test
    const intervals = missing(knownIntervals, myInterval);
    expect(intervals).toHaveLength(1);
    expect(intervals[0]).toHaveLength(2);
    expect(intervals[0][0]).toBe(knownIntervals[0][1]);
    expect(intervals[0][1]).toBe(knownIntervals[1][0]);
  });
  test('inner outside interval and upper', () => {
    const myInterval = [3, 10];
    const knownIntervals = [[0, 2], [4, 6]];
    // check test
    const intervals = missing(knownIntervals, myInterval);
    expect(intervals).toHaveLength(2);
    expect(intervals[0]).toHaveLength(2);
    expect(intervals[0][0]).toBe(myInterval[0]);
    expect(intervals[0][1]).toBe(knownIntervals[1][0]);
    expect(intervals[1]).toHaveLength(2);
    expect(intervals[1][0]).toBe(knownIntervals[1][1]);
    expect(intervals[1][1]).toBe(myInterval[1]);
  });
  test('inner inside interval and upper', () => {
    const myInterval = [5, 10];
    const knownIntervals = [[0, 2], [4, 6]];
    // check test
    const intervals = missing(knownIntervals, myInterval);
    expect(intervals).toHaveLength(1);
    expect(intervals[0]).toHaveLength(2);
    expect(intervals[0][0]).toBe(knownIntervals[1][1]);
    expect(intervals[0][1]).toBe(myInterval[1]);
  });
  test('upper', () => {
    const myInterval = [8, 10];
    const knownIntervals = [[0, 2], [4, 6]];
    // check test
    const intervals = missing(knownIntervals, myInterval);
    expect(intervals).toHaveLength(1);
    expect(intervals[0]).toHaveLength(2);
    expect(intervals[0][0]).toBe(myInterval[0]);
    expect(intervals[0][1]).toBe(myInterval[1]);
  });
  test('covering', () => {
    const myInterval = [0, 10];
    const knownIntervals = [[1, 2], [4, 6], [8, 9]];
    // check test
    const intervals = missing(knownIntervals, myInterval);
    expect(intervals).toHaveLength(4);
    expect(intervals[0]).toHaveLength(2);
    expect(intervals[0][0]).toBe(myInterval[0]);
    expect(intervals[0][1]).toBe(knownIntervals[0][0]);
    expect(intervals[1]).toHaveLength(2);
    expect(intervals[1][0]).toBe(knownIntervals[0][1]);
    expect(intervals[1][1]).toBe(knownIntervals[1][0]);
    expect(intervals[2]).toHaveLength(2);
    expect(intervals[2][0]).toBe(knownIntervals[1][1]);
    expect(intervals[2][1]).toBe(knownIntervals[2][0]);
    expect(intervals[3]).toHaveLength(2);
    expect(intervals[3][0]).toBe(knownIntervals[2][1]);
    expect(intervals[3][1]).toBe(myInterval[1]);
  });
});
