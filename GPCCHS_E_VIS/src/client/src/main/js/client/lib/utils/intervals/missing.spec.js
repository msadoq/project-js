require('../../common/test');
const missing = require('./missing');

describe('retrieveMissingIntervals', () => {
  it('no connected data', () => {
    const myInterval = [0, 10];
    const intervals = missing([], myInterval);
    expect(intervals).toHaveLength(1);
    expect(intervals[0]).toHaveLength(2);
    expect(intervals[0][0]).toBe(myInterval[0]);
    expect(intervals[0][1]).toBe(myInterval[1]);
  });
  it('lower', () => {
    const myInterval = [0, 2];
    const knownIntervals = [[4, 6], [8, 10]];
    // check test
    const intervals = missing(knownIntervals, myInterval);
    expect(intervals).toHaveLength(1);
    expect(intervals[0]).toHaveLength(2);
    expect(intervals[0][0]).toBe(myInterval[0]);
    expect(intervals[0][1]).toBe(myInterval[1]);
  });
  it('lower and inner inside interval', () => {
    const myInterval = [0, 5];
    const knownIntervals = [[4, 6], [8, 10]];
    // check test
    const intervals = missing(knownIntervals, myInterval);
    expect(intervals).toHaveLength(1);
    expect(intervals[0]).toHaveLength(2);
    expect(intervals[0][0]).toBe(myInterval[0]);
    expect(intervals[0][1]).toBe(knownIntervals[0][0]);
  });
  it('lower and inner outside interval', () => {
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
  it('inner in/out', () => {
    const myInterval = [1, 3];
    const knownIntervals = [[0, 2], [4, 6], [8, 10]];
    // check test
    const intervals = missing(knownIntervals, myInterval);
    expect(intervals).toHaveLength(1);
    expect(intervals[0]).toHaveLength(2);
    expect(intervals[0][0]).toBe(knownIntervals[0][1]);
    expect(intervals[0][1]).toBe(myInterval[1]);
  });
  it('inner in-between', () => {
    const myInterval = [6.5, 7.5];
    const knownIntervals = [[0, 2], [4, 6], [8, 10]];
    // check test
    const intervals = missing(knownIntervals, myInterval);
    expect(intervals).toHaveLength(1);
    expect(intervals[0]).toHaveLength(2);
    expect(intervals[0][0]).toBe(myInterval[0]);
    expect(intervals[0][1]).toBe(myInterval[1]);
  });
  it('inner inside interval', () => {
    const myInterval = [4.5, 5.5];
    const knownIntervals = [[0, 2], [4, 6], [8, 10]];
    // check test
    const intervals = missing(knownIntervals, myInterval);
    expect(intervals).toHaveLength(0);
  });
  it('inner out/in', () => {
    const myInterval = [3, 5];
    const knownIntervals = [[0, 2], [4, 6], [8, 10]];
    // check test
    const intervals = missing(knownIntervals, myInterval);
    expect(intervals).toHaveLength(1);
    expect(intervals[0]).toHaveLength(2);
    expect(intervals[0][0]).toBe(myInterval[0]);
    expect(intervals[0][1]).toBe(knownIntervals[1][0]);
  });
  it('inner covering outside intervals', () => {
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
  it('inner covering inside intervals', () => {
    const myInterval = [1, 5];
    const knownIntervals = [[0, 2], [4, 6], [8, 10]];
    // check test
    const intervals = missing(knownIntervals, myInterval);
    expect(intervals).toHaveLength(1);
    expect(intervals[0]).toHaveLength(2);
    expect(intervals[0][0]).toBe(knownIntervals[0][1]);
    expect(intervals[0][1]).toBe(knownIntervals[1][0]);
  });
  it('inner outside interval and upper', () => {
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
  it('inner inside interval and upper', () => {
    const myInterval = [5, 10];
    const knownIntervals = [[0, 2], [4, 6]];
    // check test
    const intervals = missing(knownIntervals, myInterval);
    expect(intervals).toHaveLength(1);
    expect(intervals[0]).toHaveLength(2);
    expect(intervals[0][0]).toBe(knownIntervals[1][1]);
    expect(intervals[0][1]).toBe(myInterval[1]);
  });
  it('upper', () => {
    const myInterval = [8, 10];
    const knownIntervals = [[0, 2], [4, 6]];
    // check test
    const intervals = missing(knownIntervals, myInterval);
    expect(intervals).toHaveLength(1);
    expect(intervals[0]).toHaveLength(2);
    expect(intervals[0][0]).toBe(myInterval[0]);
    expect(intervals[0][1]).toBe(myInterval[1]);
  });
  it('covering', () => {
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
