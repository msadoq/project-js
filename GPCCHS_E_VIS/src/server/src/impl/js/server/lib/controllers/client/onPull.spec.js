require('../../utils/test');
const { testHandler, getTestHandlerArgs, resetTestHandlerArgs } = require('../../utils/test');
const { add: addToDataQueue, reset: resetDataQueue, get: getDataQueue } = require('../../utils/dataQueue');
const globalConstants = require('common/constants');
const { set: setDcStatus } = require('../../utils/dcStatus');
const onPull = require('./onPull');

describe('controllers/client/onPull', () => {
  beforeEach(() => {
    resetDataQueue();
    resetTestHandlerArgs();
  });
  it('empty queue', () => {
    const myQueryId = 'myQueryId';
    onPull(testHandler, myQueryId);
    // check data
    const wsArgs = getTestHandlerArgs();
    wsArgs.should.have.lengthOf(2);
    wsArgs[0].should.equal(myQueryId);
    wsArgs[1].should.be.an('object').that.deep.equals({
      dcStatus: globalConstants.DC_STATUS_HEALTHY,
      data: {},
    });
  });
  it('should push data', () => {
    setDcStatus(globalConstants.DC_STATUS_CONGESTION);
    const myRemoteId = 'myRemoteId';
    const myQueryId = 'myQueryId';
    const myValue = 'myValue';
    addToDataQueue(myRemoteId, myQueryId, myValue);
    onPull(testHandler, myQueryId);
    // check data
    const wsArgs = getTestHandlerArgs();
    wsArgs.should.have.lengthOf(2);
    wsArgs[0].should.equal(myQueryId);
    wsArgs[1].should.be.an('object').that.deep.equals({
      dcStatus: globalConstants.DC_STATUS_CONGESTION,
      data: {
        [myRemoteId]: {
          [myQueryId]: myValue,
        },
      },
    });
    getDataQueue().should.eql({});
  });
});
