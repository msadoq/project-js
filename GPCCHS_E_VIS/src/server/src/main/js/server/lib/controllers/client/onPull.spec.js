const {
  testHandler,
  getTestHandlerArgs,
  resetTestHandlerArgs,
} = require('../../utils/test');
const {
  add: addToDataQueue,
  reset: resetDataQueue,
  get: getDataQueue,
} = require('../../models/dataQueue');
const onPull = require('./onPull');

describe('controllers/client/onPull', () => {
  beforeEach(() => {
    resetDataQueue();
    resetTestHandlerArgs();
  });
  it('should support empty', () => {
    const myQueryId = 'myQueryId';
    onPull(testHandler, myQueryId);
    // check data
    const wsArgs = getTestHandlerArgs();
    wsArgs.should.have.lengthOf(2);
    wsArgs[0].should.equal(myQueryId);
    wsArgs[1].should.eql({ data: {} });
  });
  it('should return data', () => {
    const myRemoteId = 'myRemoteId';
    const myQueryId = 'myQueryId';
    const myValue = 'myValue';
    addToDataQueue(myRemoteId, myQueryId, myValue);
    onPull(testHandler, myQueryId);
    // check data
    const wsArgs = getTestHandlerArgs();
    wsArgs.should.have.lengthOf(2);
    wsArgs[0].should.equal(myQueryId);
    wsArgs[1].should.eql({
      data: {
        [myRemoteId]: {
          [myQueryId]: myValue,
        },
      },
    });
    getDataQueue().should.eql({});
  });
});
