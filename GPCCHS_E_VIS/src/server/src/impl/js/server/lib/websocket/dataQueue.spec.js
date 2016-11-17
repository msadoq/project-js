require('../utils/test');

const { add, get, reset } = require('./dataQueue');

describe('websocket/dataQueue', () => {
  beforeEach(() => {
    reset();
  });

  describe('add/get', () => {
    it('should ignore empty', () => {
      add('myRemoteId', undefined, undefined);
      get().should.eql({});
    });
    it('should add to queue', () => {
      add('myRemoteId', 'myKey', 'value');
      get().should.eql({
        myRemoteId: { myKey: 'value' },
      });
      add('myRemoteId', 'myOtherKey', 'other');
      get().should.eql({
        myRemoteId: {
          myKey: 'value',
          myOtherKey: 'other',
        },
      });
    });
    it('should respect other remoteId', () => {
      add('myExistingRemoteId', 'myKey', 'value');
      add('myRemoteId', 'myOtherKey', 'other');
      get().should.eql({
        myExistingRemoteId: { myKey: 'value' },
        myRemoteId: { myOtherKey: 'other' },
      });
    });
  });
  describe('reset', () => {
    it('should return current queue and reset it', () => {
      add('myRemoteId', 'myKey', 'value');
      get().should.eql({
        myRemoteId: { myKey: 'value' },
      });
      reset().should.eql({
        myRemoteId: { myKey: 'value' },
      });
      get().should.eql({});
    });
  });
});
