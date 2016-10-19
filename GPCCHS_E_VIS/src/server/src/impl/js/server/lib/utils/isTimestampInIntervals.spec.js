require('./test');
const { isTimestampInInterval } = require('./isTimestampInIntervals');

describe('utils/intervals', () => {
  describe('isTimestampInInterval', () => {
    const myInterval = [0, 10];

    it('lower', () => {
      const result = isTimestampInInterval(myInterval[0] - 1, myInterval);
      result.should.be.an('boolean', false);
    });

    it('lower limit', () => {
      const result = isTimestampInInterval(myInterval[0], myInterval);
      result.should.be.an('boolean', true);
    });

    it('inner', () => {
      const result = isTimestampInInterval((myInterval[0] + myInterval[1]) / 2, myInterval);
      result.should.be.an('boolean', true);
    });

    it('upper limit', () => {
      const result = isTimestampInInterval(myInterval[1], myInterval);
      result.should.be.an('boolean', true);
    });

    it('upper', () => {
      const result = isTimestampInInterval(myInterval[1] + 1, myInterval);
      result.should.be.an('boolean', false);
    });
  });
});
