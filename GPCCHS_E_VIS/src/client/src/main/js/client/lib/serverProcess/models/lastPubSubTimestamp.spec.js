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
