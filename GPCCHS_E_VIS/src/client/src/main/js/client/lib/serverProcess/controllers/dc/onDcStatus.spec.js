const { mockRegister, mockLoadStubs } = require('../../../common/jest');

mockRegister();
mockLoadStubs();

const onDcStatus = require('./onDcStatus');
const { getStubData, loadStubs } = require('../../../utils/stubs');
const globalConstants = require('../../../constants');
const { get: getDcStatus, reset: resetDcStatus } = require('../../models/dcStatus');

loadStubs();
const dataStub = getStubData();

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
