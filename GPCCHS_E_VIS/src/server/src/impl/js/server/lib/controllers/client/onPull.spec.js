require('../../utils/test');
const { testHandler, getTestHandlerArgs, resetTestHandlerArgs } = require('../../utils/test');
const { add, reset, get } = require('../../utils/dataQueue');
const onPull = require('./onPull');

describe('controllers/client/onPull', () => {
  beforeEach(() => {
    reset();
    resetTestHandlerArgs();
  });
  it('empty queue', () => {
    const myQueryId = 'myQueryId';
    onPull(testHandler, myQueryId);
    // check data
    const wsArgs = getTestHandlerArgs();
    wsArgs.should.have.lengthOf(2);
    wsArgs[0].should.equal(myQueryId);
    wsArgs[1].should.be.an('object').that.deep.equals({});
  });
  it('should push data', () => {
    const myRemoteId = 'myRemoteId';
    const myQueryId = 'myQueryId';
    const myValue = 'myValue';
    add(myRemoteId, myQueryId, myValue);
    onPull(testHandler, myQueryId);
    // check data
    const wsArgs = getTestHandlerArgs();
    wsArgs.should.have.lengthOf(2);
    wsArgs[0].should.equal(myQueryId);
    wsArgs[1].should.be.an('object').that.deep.equals({
      [myRemoteId]: {
        [myQueryId]: myValue,
      },
    });
    get().should.eql({});
  });
});
