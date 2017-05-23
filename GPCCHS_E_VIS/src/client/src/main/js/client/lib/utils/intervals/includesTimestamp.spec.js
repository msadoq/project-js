require('../../common/test');
const includesTimestamp = require('./includesTimestamp');

describe('intervals/includesTimestamp', () => {
  describe('one', () => {
    const myInterval = [0, 10];

    it('lower', () => {
      const result = includesTimestamp(myInterval, myInterval[0] - 1);
      result.should.equal(false);
    });

    it('lower limit', () => {
      const result = includesTimestamp(myInterval, myInterval[0]);
      result.should.equal(true);
    });

    it('inner', () => {
      const result = includesTimestamp(myInterval, (myInterval[0] + myInterval[1]) / 2);
      result.should.equal(true);
    });

    it('upper limit', () => {
      const result = includesTimestamp(myInterval, myInterval[1]);
      result.should.equal(true);
    });

    it('upper', () => {
      const result = includesTimestamp(myInterval, myInterval[1] + 1);
      result.should.equal(false);
    });
  });
  describe('multi', () => {
    it('merged', () => {
      includesTimestamp([[0, 1], [2, 6]], 1.5).should.equal(false);
      includesTimestamp([[0, 1], [2, 6]], 5).should.equal(true);
    });
    it('unmerged', () => {
      includesTimestamp([[0, 5], [3, 10]], 2).should.equal(true);
      includesTimestamp([[0, 5], [3, 10]], 7).should.equal(true);
    });
  });
});
