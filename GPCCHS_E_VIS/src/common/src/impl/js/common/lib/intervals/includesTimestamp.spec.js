require('../utils/test');
const includesTimestamp = require('./includesTimestamp');

describe('intervals/includesTimestamp', () => {
  describe('one', () => {
    const myInterval = [0, 10];

    it('lower', () => {
      const result = includesTimestamp(myInterval, myInterval[0] - 1);
      result.should.be.an('boolean', false);
    });

    it('lower limit', () => {
      const result = includesTimestamp(myInterval, myInterval[0]);
      result.should.be.an('boolean', true);
    });

    it('inner', () => {
      const result = includesTimestamp(myInterval, (myInterval[0] + myInterval[1]) / 2);
      result.should.be.an('boolean', true);
    });

    it('upper limit', () => {
      const result = includesTimestamp(myInterval, myInterval[1]);
      result.should.be.an('boolean', true);
    });

    it('upper', () => {
      const result = includesTimestamp(myInterval, myInterval[1] + 1);
      result.should.be.an('boolean', false);
    });
  });
});
