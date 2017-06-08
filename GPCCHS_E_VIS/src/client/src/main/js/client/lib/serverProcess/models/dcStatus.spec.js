const dcStatus = require('./dcStatus');

describe('models/dcStatus', () => {
  beforeEach(() => {
    dcStatus.reset();
  });
  it('get', () => {
    expect(dcStatus.get()).toBeFalsy();
  });
  it('set', () => {
    const status = { dcQueriesDelay: 10 };
    dcStatus.set(status);
    expect(dcStatus.get()).toBe(status);
  });
  it('reset', () => {
    dcStatus.set({ dcQueriesDelay: 10 });
    dcStatus.reset();
    expect(dcStatus.get()).toBeFalsy();
  });
});
