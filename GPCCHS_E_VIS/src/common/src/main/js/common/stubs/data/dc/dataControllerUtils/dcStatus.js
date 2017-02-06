const protobuf = require('../../../../protobuf');
const globalConstants = require('../../../../constants');

const getHealthyDcStatus = () => ({
  status: globalConstants.HEALTH_STATUS_HEALTHY,
});
const getCongestionDcStatus = () => ({
  status: globalConstants.HEALTH_STATUS_CRITICAL,
});

const getHealthyDcStatusProtobuf = () => protobuf.encode(
  'dc.dataControllerUtils.DcStatus',
  getHealthyDcStatus()
);
const getCongestionDcStatusProtobuf = () => protobuf.encode(
  'dc.dataControllerUtils.DcStatus',
  getCongestionDcStatus()
);

module.exports = {
  getHealthyDcStatus,
  getHealthyDcStatusProtobuf,
  getCongestionDcStatus,
  getCongestionDcStatusProtobuf,
};
