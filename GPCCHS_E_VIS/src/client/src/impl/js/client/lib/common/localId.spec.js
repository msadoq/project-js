require('../common/test');
const localId = require('./localId');

describe('utils/localId', () => {
  it('works', () => {
    localId('extractedValue', 120, 10)
      .should.equal('extractedValue.120:10');
  });
});
