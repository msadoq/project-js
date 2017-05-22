const onDcStatus = require('./onDcStatus');
const dataStub = require('common/stubs/data');
const globalConstants = require('common/constants');
const { get: getDcStatus, reset: resetDcStatus } = require('../../models/dcStatus');

describe('controllers/dc/onDcStatus', () => {
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
