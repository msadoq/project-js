const { should } = require('../utils/test');
const dcStatus = require('./dcStatus');

describe('models/dcStatus', () => {
  beforeEach(() => {
    dcStatus.reset();
  });
  it('get', () => {
    should.not.exist(dcStatus.get());
  });
  it('set', () => {
    const status = { dcQueriesDelay: 10 };
    dcStatus.set(status);
    dcStatus.get().should.equal(status);
  });
  it('reset', () => {
    dcStatus.set({ dcQueriesDelay: 10 });
    dcStatus.reset();
    should.not.exist(dcStatus.get());
  });
});
