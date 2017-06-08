const { reset, get, set } = require('./lastPubSubTimestamp');

describe('models/lastPubSubTimestamp', () => {
  beforeEach(() => {
    reset();
  });
  it('get', () => {
    expect(get()).toBeFalsy();
  });
  it('set', () => {
    const t = 42;
    set(t);
    expect(get()).toBe(t);
  });
  it('reset', () => {
    expect(reset()).toBeFalsy();
    const t = 42;
    set(t);
    expect(reset()).toBe(t);
    expect(get()).toBeFalsy();
  });
});
