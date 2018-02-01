// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 23/05/2017 : Move serverProcess code one level upper
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Apply jest-codemods for chai-should + repair lots of tests
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Fix jest tests in serverProcess
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// END-HISTORY
// ====================================================================

const { reset, get, set } = require('./lastPubSubTimestamp');

describe('models/lastPubSubTimestamp', () => {
  beforeEach(() => {
    reset();
  });
  test('get', () => {
    expect(get()).toBeFalsy();
  });
  test('set', () => {
    const t = 42;
    set(t);
    expect(get()).toBe(t);
  });
  test('reset', () => {
    expect(reset()).toBeFalsy();
    const t = 42;
    set(t);
    expect(reset()).toBe(t);
    expect(get()).toBeFalsy();
  });
});
