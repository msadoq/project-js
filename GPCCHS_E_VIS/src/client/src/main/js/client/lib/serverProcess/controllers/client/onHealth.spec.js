const {
  testHandler,
  getTestHandlerArgs,
  resetTestHandlerArgs,
} = require('../../utils/test');
const globalConstants = require('common/constants');
const { set: setDcStatus } = require('../dcStatus');
const {
  reset: resetLastPubSub,
  set: setLastPubSub,
} = require('../../models/lastPubSubTimestamp');
const onHealth = require('./onHealth');

describe('controllers/client/onHealth', () => {
  beforeEach(() => {
    resetTestHandlerArgs();
    resetLastPubSub();
  });
  it('should support empty state', () => {
    const myQueryId = 'myQueryId';
    onHealth(testHandler, myQueryId);
    // check data
    const wsArgs = getTestHandlerArgs();
    wsArgs.should.have.lengthOf(2);
    wsArgs[0].should.equal(myQueryId);
    wsArgs[1].should.be.an('object').that.have.properties({
      dcStatus: undefined,
      hssStatus: undefined,
      lastPubSubTimestamp: undefined,
    });
  });
  it('should return status', () => {
    setDcStatus(globalConstants.HEALTH_STATUS_CRITICAL);
    setLastPubSub(42);
    const myQueryId = 'myQueryId';
    onHealth(testHandler, myQueryId);
    // check data
    const wsArgs = getTestHandlerArgs();
    wsArgs.should.have.lengthOf(2);
    wsArgs[0].should.equal(myQueryId);
    wsArgs[1].should.be.an('object').that.have.properties({
      dcStatus: globalConstants.HEALTH_STATUS_CRITICAL,
      lastPubSubTimestamp: 42,
    });
    wsArgs[1].hssStatus.should.be.oneOf([
      globalConstants.HEALTH_STATUS_HEALTHY,
      globalConstants.HEALTH_STATUS_WARNING,
      globalConstants.HEALTH_STATUS_CRITICAL,
    ]);
  });
});
