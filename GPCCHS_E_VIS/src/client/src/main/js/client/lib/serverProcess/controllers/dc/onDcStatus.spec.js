const onDcStatus = require('./onDcStatus');
const dataStub = require('common/protobuf/stubs');
const globalConstants = require('common/constants');
const { get: getDcStatus, reset: resetDcStatus } = require('../dcStatus');

describe('controllers/utils/onDcStatus', () => {
  beforeEach(() => {
    resetDcStatus();
  });
  it('healthy', () => {
    const healthy = dataStub.getHealthyDcStatusProtobuf();

    onDcStatus(healthy);

    getDcStatus().should.equal(globalConstants.HEALTH_STATUS_HEALTHY);
  });
  it('congestion', () => {
    const congestion = dataStub.getCongestionDcStatusProtobuf();

    onDcStatus(congestion);

    getDcStatus().should.equal(globalConstants.HEALTH_STATUS_CRITICAL);
  });
});
