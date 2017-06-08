const { add, get, reset } = require('./dataQueue');

describe('models/dataQueue', () => {
  beforeEach(() => {
    reset();
  });

  describe('add/get', () => {
    it('should ignore empty', () => {
      add('myRemoteId', undefined, undefined);
      expect(get()).toEqual({});
    });
    it('should add to queue', () => {
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
    it('should respect other remoteId', () => {
      add('myExistingRemoteId', 'myKey', 'value');
      add('myRemoteId', 'myOtherKey', 'other');
      expect(get()).toEqual({
        myExistingRemoteId: { myKey: 'value' },
        myRemoteId: { myOtherKey: 'other' },
      });
    });
  });
  describe('reset', () => {
    it('should return current queue and reset it', () => {
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
