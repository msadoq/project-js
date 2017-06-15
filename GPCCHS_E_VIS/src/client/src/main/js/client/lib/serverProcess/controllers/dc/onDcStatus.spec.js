const { registerProtobuf } = require('../../../common/test');

registerProtobuf();

const onDcStatus = require('./onDcStatus');
const dataStub = require('common/protobuf/stubs');
const globalConstants = require('../../../constants');
const { get: getDcStatus, reset: resetDcStatus } = require('../../models/dcStatus');

describe('controllers/utils/onDcStatus', () => {
  beforeEach(() => {
    resetDcStatus();
  });
  it.skip('healthy', () => {
    const healthy = dataStub.getHealthyDcStatusProtobuf();

    onDcStatus(healthy);
    expect(getDcStatus()).toEqual(globalConstants.HEALTH_STATUS_HEALTHY);
  });
  test('congestion', () => {
    const congestion = dataStub.getCongestionDcStatusProtobuf();

    onDcStatus(congestion);

    expect(getDcStatus()).toEqual(globalConstants.HEALTH_STATUS_CRITICAL);
  });
});
