const globalConstants = require('../../../constants');
const { set: setDcStatus } = require('../../models/dcStatus');
const {
  reset: resetLastPubSub,
  set: setLastPubSub,
} = require('../../models/lastPubSubTimestamp');
const onHealth = require('./onHealth');

describe('controllers/client/onHealth', () => {
  beforeEach(() => {
    resetLastPubSub();
  });
  it('should support empty state', (done) => {
    const myQueryId = 'myQueryId';
    const check = (...args) => {
      expect(args).toMatchObject([
        myQueryId,
        {
          dcStatus: undefined,
          hssStatus: undefined,
          lastPubSubTimestamp: undefined,
        },
      ]);
      done();
    };
    onHealth(check, myQueryId);
  });
  it('should return status', (done) => {
    setDcStatus(globalConstants.HEALTH_STATUS_CRITICAL);
    setLastPubSub(42);
    const myQueryId = 'myQueryId';
    const check = (...args) => {
      expect(args).toMatchObject([
        myQueryId,
        {
          dcStatus: globalConstants.HEALTH_STATUS_CRITICAL,
          lastPubSubTimestamp: 42,
        },
      ]);
      expect(args[1].hssStatus).toBeOneOf([
        globalConstants.HEALTH_STATUS_HEALTHY,
        globalConstants.HEALTH_STATUS_WARNING,
        globalConstants.HEALTH_STATUS_CRITICAL,
      ]);
      done();
    };
    onHealth(check, myQueryId);
  });
});
