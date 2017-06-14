const { add, get, reset } = require('./dataQueue');

describe('models/dataQueue', () => {
  beforeEach(() => {
    reset();
  });

  describe('add/get', () => {
    test('should ignore empty', () => {
      add('myRemoteId', undefined, undefined);
      expect(get()).toEqual({});
    });
    test('should add to queue', () => {
      add('myRemoteId', 'myKey', 'value');
      expect(get()).toEqual({
        myRemoteId: { myKey: 'value' },
      });
      add('myRemoteId', 'myOtherKey', 'other');
      expect(get()).toEqual({
        myRemoteId: {
          myKey: 'value',
          myOtherKey: 'other',
        },
      });
    });
    test('should respect other remoteId', () => {
      add('myExistingRemoteId', 'myKey', 'value');
      add('myRemoteId', 'myOtherKey', 'other');
      expect(get()).toEqual({
        myExistingRemoteId: { myKey: 'value' },
        myRemoteId: { myOtherKey: 'other' },
      });
    });
  });
  describe('reset', () => {
    test('should return current queue and reset it', () => {
      add('myRemoteId', 'myKey', 'value');
      expect(get()).toEqual({
        myRemoteId: { myKey: 'value' },
      });
      expect(reset()).toEqual({
        myRemoteId: { myKey: 'value' },
      });
      expect(get()).toEqual({});
    });
  });
});
