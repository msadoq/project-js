// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 23/05/2017 : Fix unit tests after common/* migration to client/
// VERSION : 1.1.2 : DM : #5828 : 23/05/2017 : Move serverProcess code one level upper
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Apply jest-codemods for chai-should + repair lots of tests
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Fix jest tests in serverProcess
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// END-HISTORY
// ====================================================================

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
