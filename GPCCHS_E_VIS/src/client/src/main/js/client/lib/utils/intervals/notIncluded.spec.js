require('../../common/test');
const notIncluded = require('./notIncluded');

describe('intervals/notIncluded', () => {
  describe('one', () => {
    it('no', () => {
      const myInterval = [10, 20];
      const knownIntervals = [[0, 10]];
      notIncluded(knownIntervals, myInterval).should.have.properties([myInterval]);
    });
    it('yes', () => {
      const myInterval = [10, 20];
      const knownIntervals = [[0, 10], [10, 20]];
      notIncluded(knownIntervals, myInterval).should.have.properties([]);
    });
    it('yes unmerged', () => {
      const myInterval = [10, 20];
      const knownIntervals = [[0, 15], [10, 20]];
      notIncluded(knownIntervals, myInterval).should.have.properties([]);
    });
    it('no unmerged', () => {
      const myInterval = [10, 20];
      const knownIntervals = [[0, 15], [5, 20]];
      notIncluded(knownIntervals, myInterval).should.have.properties([myInterval]);
    });
  });
  describe('multi', () => {
    it('yes', () => {
      const myIntervals = [[0, 20], [10, 20]];
      const knownIntervals = [[0, 10], [10, 20]];
      notIncluded(knownIntervals, myIntervals).should.have.properties([[0, 20]]);
    });
  });
});
