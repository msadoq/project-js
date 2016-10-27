require('../utils/test');
const includes = require('./includes');

describe('intervals/includes', () => {
  describe('one', () => {
    it('no', () => {
      const myInterval = [10, 20];
      const knownIntervals = [[0, 10]];
      includes(knownIntervals, myInterval).should.equal(false);
    });
    it('yes', () => {
      const myInterval = [10, 20];
      const knownIntervals = [[0, 10], [10, 20]];
      includes(knownIntervals, myInterval).should.equal(true);
    });
    it('yes unmerged', () => {
      const myInterval = [10, 20];
      const knownIntervals = [[0, 15], [10, 20]];
      includes(knownIntervals, myInterval).should.equal(true);
    });
    it('no unmerged', () => {
      const myInterval = [10, 20];
      const knownIntervals = [[0, 15], [5, 20]];
      includes(knownIntervals, myInterval).should.equal(false);
    });
  });
  describe('multi', () => {
    it('yes', () => {
      const myIntervals = [[0, 20], [10, 20]];
      const knownIntervals = [[0, 10], [10, 20]];
      includes(knownIntervals, myIntervals).should.have.properties([[10, 20]]);
    });
  });
});
