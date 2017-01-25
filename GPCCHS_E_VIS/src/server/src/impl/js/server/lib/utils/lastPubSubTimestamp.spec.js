const { should } = require('../utils/test');
const { reset, get, set } = require('./lastPubSubTimestamp');

describe('utils/lastPubSubTimestamp', () => {
  beforeEach(() => {
    reset();
  });
  it('get', () => {
    should.not.exist(get());
  });
  it('set', () => {
    const t = 42;
    set(t);
    get()
      .should.equal(t);
  });
  it('reset', () => {
    should.not.exist(reset());
    const t = 42;
    set(t);
    reset()
      .should.equal(t);
    should.not.exist(get());
  });
});
