// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7164 : 07/07/2017 : Fix unit tests . .
// VERSION : 1.1.2 : FA : #7164 : 07/07/2017 : Apply filters on getLast request
// END-HISTORY
// ====================================================================

const dataMapSingleton = require('./dataMapSingleton');

describe('models/dataMapSingleton', () => {
  beforeEach(() => {
    dataMapSingleton.reset();
  });
  test('get', () => {
    expect(dataMapSingleton.get()).toEqual({ perRemoteId: {}, perView: {}, expectedIntervals: {} });
  });
  test('set', () => {
    const newDataMap = {
      perRemoteId: { r1: {}, r2: {} },
      perView: { v1: {}, v2: {} },
      expectedIntervals: { r1: { l1: {} }, r2: { l1: {} } } };
    dataMapSingleton.set(newDataMap);
    expect(dataMapSingleton.get()).toEqual(newDataMap);
  });
  test('reset', () => {
    dataMapSingleton.set({
      perRemoteId: { r1: {}, r2: {} },
      perView: { v1: {}, v2: {} },
      expectedIntervals: { r1: { l1: {} }, r2: { l1: {} } } });
    dataMapSingleton.reset();
    expect(dataMapSingleton.get()).toEqual({ perRemoteId: {}, perView: {}, expectedIntervals: {} });
  });
});
