const {
  testHandler,
  getTestHandlerArgs,
  resetTestHandlerArgs,
} = require('../../utils/test');
const globalConstants = require('common/constants');
const { set: setDcStatus } = require('../../models/dcStatus');
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
    expect(wsArgs).toHaveLength(2);
    expect(wsArgs[0]).toBe(myQueryId);
    expect(wsArgs[1]).toMatchObject({
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
    expect(wsArgs).toHaveLength(2);
    expect(wsArgs[0]).toBe(myQueryId);
    expect(wsArgs[1]).toMatchObject({
      dcStatus: globalConstants.HEALTH_STATUS_CRITICAL,
      lastPubSubTimestamp: 42,
    });
    expect(wsArgs[1].hssStatus).toBeOneOf([
      globalConstants.HEALTH_STATUS_HEALTHY,
      globalConstants.HEALTH_STATUS_WARNING,
      globalConstants.HEALTH_STATUS_CRITICAL,
    ]);
  });
});
