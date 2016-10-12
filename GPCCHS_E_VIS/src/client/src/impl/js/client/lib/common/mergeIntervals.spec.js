require('./test');
// const { isTimestampInInterval, mergeIntervals } = require('./mergeIntervals');
const mergeIntervals = require('./mergeIntervals');

describe('utils/intervals', () => {
  // describe('isTimestampInInterval', () => {
  //   const myInterval = [0, 10];
  //
  //   it('lower', () => {
  //     const result = isTimestampInInterval(myInterval[0] - 1, myInterval);
  //     result.should.be.an('boolean', false);
  //   });
  //
  //   it('lower limit', () => {
  //     const result = isTimestampInInterval(myInterval[0], myInterval);
  //     result.should.be.an('boolean', true);
  //   });
  //
  //   it('inner', () => {
  //     const result = isTimestampInInterval((myInterval[0] + myInterval[1]) / 2, myInterval);
  //     result.should.be.an('boolean', true);
  //   });
  //
  //   it('upper limit', () => {
  //     const result = isTimestampInInterval(myInterval[1], myInterval);
  //     result.should.be.an('boolean', true);
  //   });
  //
  //   it('upper', () => {
  //     const result = isTimestampInInterval(myInterval[1] + 1, myInterval);
  //     result.should.be.an('boolean', false);
  //   });
  // });

  describe('mergeIntervals', () => {
    it('no intervals', () => {
      const myInterval = [0, 10];
      const knownIntervals = [];
      const intervals = mergeIntervals(knownIntervals, myInterval);
      intervals.should.be.an('array').that.have.lengthOf(1);
      intervals[0].should.be.an('array').that.have.lengthOf(2);
      intervals[0][0].should.equal(myInterval[0]);
      intervals[0][1].should.equal(myInterval[1]);
    });
    it('lower', () => {
      const myInterval = [0, 2];
      const knownIntervals = [[4, 6], [8, 10]];
      const intervals = mergeIntervals(knownIntervals, myInterval);
      intervals.should.be.an('array').that.have.lengthOf(3);
      intervals[0].should.be.an('array').that.have.lengthOf(2);
      intervals[0][0].should.equal(myInterval[0]);
      intervals[0][1].should.equal(myInterval[1]);
      intervals[1].should.be.an('array').that.have.lengthOf(2);
      intervals[1][0].should.equal(knownIntervals[0][0]);
      intervals[1][1].should.equal(knownIntervals[0][1]);
      intervals[2].should.be.an('array').that.have.lengthOf(2);
      intervals[2][0].should.equal(knownIntervals[1][0]);
      intervals[2][1].should.equal(knownIntervals[1][1]);
    });
    it('lower and inner inside interval', () => {
      const myInterval = [0, 5];
      const knownIntervals = [[4, 6], [8, 10]];
      const intervals = mergeIntervals(knownIntervals, myInterval);
      intervals.should.be.an('array').that.have.lengthOf(2);
      intervals[0].should.be.an('array').that.have.lengthOf(2);
      intervals[0][0].should.equal(myInterval[0]);
      intervals[0][1].should.equal(knownIntervals[0][1]);
      intervals[1].should.be.an('array').that.have.lengthOf(2);
      intervals[1][0].should.equal(knownIntervals[1][0]);
      intervals[1][1].should.equal(knownIntervals[1][1]);
    });
    it('lower and inner outside interval', () => {
      const myInterval = [0, 7];
      const knownIntervals = [[4, 6], [8, 10]];
      const intervals = mergeIntervals(knownIntervals, myInterval);
      intervals.should.be.an('array').that.have.lengthOf(2);
      intervals[0].should.be.an('array').that.have.lengthOf(2);
      intervals[0][0].should.equal(myInterval[0]);
      intervals[0][1].should.equal(myInterval[1]);
      intervals[1].should.be.an('array').that.have.lengthOf(2);
      intervals[1][0].should.equal(knownIntervals[1][0]);
      intervals[1][1].should.equal(knownIntervals[1][1]);
    });
    it('inner in/out', () => {
      const myInterval = [1, 3];
      const knownIntervals = [[0, 2], [4, 6], [8, 10]];
      const intervals = mergeIntervals(knownIntervals, myInterval);
      intervals.should.be.an('array').that.have.lengthOf(3);
      intervals[0].should.be.an('array').that.have.lengthOf(2);
      intervals[0][0].should.equal(knownIntervals[0][0]);
      intervals[0][1].should.equal(myInterval[1]);
      intervals[1].should.be.an('array').that.have.lengthOf(2);
      intervals[1][0].should.equal(knownIntervals[1][0]);
      intervals[1][1].should.equal(knownIntervals[1][1]);
      intervals[2].should.be.an('array').that.have.lengthOf(2);
      intervals[2][0].should.equal(knownIntervals[2][0]);
      intervals[2][1].should.equal(knownIntervals[2][1]);
    });
    it('inner in-between', () => {
      const myInterval = [6.5, 7.5];
      const knownIntervals = [[0, 2], [4, 6], [8, 10]];
      const intervals = mergeIntervals(knownIntervals, myInterval);
      intervals.should.be.an('array').that.have.lengthOf(4);
      intervals[0].should.be.an('array').that.have.lengthOf(2);
      intervals[0][0].should.equal(knownIntervals[0][0]);
      intervals[0][1].should.equal(knownIntervals[0][1]);
      intervals[1].should.be.an('array').that.have.lengthOf(2);
      intervals[1][0].should.equal(knownIntervals[1][0]);
      intervals[1][1].should.equal(knownIntervals[1][1]);
      intervals[2].should.be.an('array').that.have.lengthOf(2);
      intervals[2][0].should.equal(myInterval[0]);
      intervals[2][1].should.equal(myInterval[1]);
      intervals[3].should.be.an('array').that.have.lengthOf(2);
      intervals[3][0].should.equal(knownIntervals[2][0]);
      intervals[3][1].should.equal(knownIntervals[2][1]);
    });
    it('inner inside interval', () => {
      const myInterval = [4.5, 5.5];
      const knownIntervals = [[0, 2], [4, 6], [8, 10]];
      const intervals = mergeIntervals(knownIntervals, myInterval);
      intervals.should.be.an('array').that.have.lengthOf(3);
      intervals[0].should.be.an('array').that.have.lengthOf(2);
      intervals[0][0].should.equal(knownIntervals[0][0]);
      intervals[0][1].should.equal(knownIntervals[0][1]);
      intervals[1].should.be.an('array').that.have.lengthOf(2);
      intervals[1][0].should.equal(knownIntervals[1][0]);
      intervals[1][1].should.equal(knownIntervals[1][1]);
      intervals[2].should.be.an('array').that.have.lengthOf(2);
      intervals[2][0].should.equal(knownIntervals[2][0]);
      intervals[2][1].should.equal(knownIntervals[2][1]);
    });
    it('inner out/in', () => {
      const myInterval = [3, 5];
      const knownIntervals = [[0, 2], [4, 6], [8, 10]];
      const intervals = mergeIntervals(knownIntervals, myInterval);
      intervals.should.be.an('array').that.have.lengthOf(3);
      intervals[0].should.be.an('array').that.have.lengthOf(2);
      intervals[0][0].should.equal(knownIntervals[0][0]);
      intervals[0][1].should.equal(knownIntervals[0][1]);
      intervals[1].should.be.an('array').that.have.lengthOf(2);
      intervals[1][0].should.equal(myInterval[0]);
      intervals[1][1].should.equal(knownIntervals[1][1]);
      intervals[2].should.be.an('array').that.have.lengthOf(2);
      intervals[2][0].should.equal(knownIntervals[2][0]);
      intervals[2][1].should.equal(knownIntervals[2][1]);
    });
    it('inner covering outside intervals', () => {
      const myInterval = [3, 7];
      const knownIntervals = [[0, 2], [4, 4.5], [5, 6], [8, 10]];
      const intervals = mergeIntervals(knownIntervals, myInterval);
      intervals.should.be.an('array').that.have.lengthOf(3);
      intervals[0].should.be.an('array').that.have.lengthOf(2);
      intervals[0][0].should.equal(knownIntervals[0][0]);
      intervals[0][1].should.equal(knownIntervals[0][1]);
      intervals[1].should.be.an('array').that.have.lengthOf(2);
      intervals[1][0].should.equal(myInterval[0]);
      intervals[1][1].should.equal(myInterval[1]);
      intervals[2].should.be.an('array').that.have.lengthOf(2);
      intervals[2][0].should.equal(knownIntervals[3][0]);
      intervals[2][1].should.equal(knownIntervals[3][1]);
    });
    it('inner covering inside intervals', () => {
      const myInterval = [1, 5];
      const knownIntervals = [[0, 2], [4, 6], [8, 10]];
      const intervals = mergeIntervals(knownIntervals, myInterval);
      intervals.should.be.an('array').that.have.lengthOf(2);
      intervals[0].should.be.an('array').that.have.lengthOf(2);
      intervals[0][0].should.equal(knownIntervals[0][0]);
      intervals[0][1].should.equal(knownIntervals[1][1]);
      intervals[1].should.be.an('array').that.have.lengthOf(2);
      intervals[1][0].should.equal(knownIntervals[2][0]);
      intervals[1][1].should.equal(knownIntervals[2][1]);
    });
    it('inner outside interval and upper', () => {
      const myInterval = [3, 10];
      const knownIntervals = [[0, 2], [4, 6]];
      const intervals = mergeIntervals(knownIntervals, myInterval);
      intervals.should.be.an('array').that.have.lengthOf(2);
      intervals[0].should.be.an('array').that.have.lengthOf(2);
      intervals[0][0].should.equal(knownIntervals[0][0]);
      intervals[0][1].should.equal(knownIntervals[0][1]);
      intervals[1].should.be.an('array').that.have.lengthOf(2);
      intervals[1][0].should.equal(myInterval[0]);
      intervals[1][1].should.equal(myInterval[1]);
    });
    it('inner inside interval and upper', () => {
      const myInterval = [5, 10];
      const knownIntervals = [[0, 2], [4, 6]];
      const intervals = mergeIntervals(knownIntervals, myInterval);
      intervals.should.be.an('array').that.have.lengthOf(2);
      intervals[0].should.be.an('array').that.have.lengthOf(2);
      intervals[0][0].should.equal(knownIntervals[0][0]);
      intervals[0][1].should.equal(knownIntervals[0][1]);
      intervals[1].should.be.an('array').that.have.lengthOf(2);
      intervals[1][0].should.equal(knownIntervals[1][0]);
      intervals[1][1].should.equal(myInterval[1]);
    });
    it('upper', () => {
      const myInterval = [8, 10];
      const knownIntervals = [[0, 2], [4, 6]];
      const intervals = mergeIntervals(knownIntervals, myInterval);
      intervals.should.be.an('array').that.have.lengthOf(3);
      intervals[0].should.be.an('array').that.have.lengthOf(2);
      intervals[0][0].should.equal(knownIntervals[0][0]);
      intervals[0][1].should.equal(knownIntervals[0][1]);
      intervals[1].should.be.an('array').that.have.lengthOf(2);
      intervals[1][0].should.equal(knownIntervals[1][0]);
      intervals[1][1].should.equal(knownIntervals[1][1]);
      intervals[2].should.be.an('array').that.have.lengthOf(2);
      intervals[2][0].should.equal(myInterval[0]);
      intervals[2][1].should.equal(myInterval[1]);
    });
    it('covering', () => {
      const myInterval = [0, 10];
      const knownIntervals = [[1, 2], [4, 6], [8, 9]];
      const intervals = mergeIntervals(knownIntervals, myInterval);
      intervals.should.be.an('array').that.have.lengthOf(1);
      intervals[0].should.be.an('array').that.have.lengthOf(2);
      intervals[0][0].should.equal(myInterval[0]);
      intervals[0][1].should.equal(myInterval[1]);
    });
  });
});
