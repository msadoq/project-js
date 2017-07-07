const dataMapSingleton = require('./dataMapSingleton');

describe('models/dataMapSingleton', () => {
  beforeEach(() => {
    dataMapSingleton.reset();
  });
  test('get', () => {
    expect(dataMapSingleton.get()).toBe({ perRemoteId: {}, perView: {}, expectedIntervals: {} });
  });
  test('set', () => {
    const newDataMap = {
      perRemoteId: { r1: {}, r2: {} },
      perView: { v1: {}, v2: {} },
      expectedIntervals: { r1: { l1: {} }, r2: { l1: {} } } };
    dataMapSingleton.set(newDataMap);
    expect(dataMapSingleton.get()).toBe(newDataMap);
  });
  test('reset', () => {
    dataMapSingleton.set({
      perRemoteId: { r1: {}, r2: {} },
      perView: { v1: {}, v2: {} },
      expectedIntervals: { r1: { l1: {} }, r2: { l1: {} } } });
    dataMapSingleton.reset();
    expect(dataMapSingleton.get()).toBe({ perRemoteId: {}, perView: {}, expectedIntervals: {} });
  });
});
