const dcStatus = require('./dcStatus');

describe('models/dcStatus', () => {
  beforeEach(() => {
    dcStatus.reset();
  });
  test('get', () => {
    expect(dcStatus.get()).toBeFalsy();
  });
  test('set', () => {
    const status = { dcQueriesDelay: 10 };
    dcStatus.set(status);
    expect(dcStatus.get()).toBe(status);
  });
  test('reset', () => {
    dcStatus.set({ dcQueriesDelay: 10 });
    dcStatus.reset();
    expect(dcStatus.get()).toBeFalsy();
  });
});
