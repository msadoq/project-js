const onDcStatus = require('./onDcStatus');
const dataStub = require('common/stubs/data');
const globalConstants = require('common/constants');
const { get: getDcStatus } = require('../../utils/dcStatus');

describe('controllers/dc/onDcStatus', () => {
  it('healthy', () => {
    const healthy = dataStub.getHealthyDcStatusProtobuf();

    onDcStatus(healthy);

    getDcStatus().should.equal(globalConstants.DC_STATUS_HEALTHY);
  });
  it('congestion', () => {
    const congestion = dataStub.getCongestionDcStatusProtobuf();

    onDcStatus(congestion);

    getDcStatus().should.equal(globalConstants.DC_STATUS_CONGESTION);
  });
});
