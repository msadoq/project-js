const protobuf = require('../../../../protobuf/index');
const globalConstants = require('../../../../constants/index');

const getHealthyDcStatus = () => ({
  dcQueriesDelay: globalConstants.DC_EMPTY_QUEUE,
  tbdStatus: globalConstants.TBD_HEALTHY,
  avrgTimeMsQuery: 50,
  avrgTimeMsGetLast: 50,
});

const getCongestionDcStatus = () => ({
  dcQueriesDelay: globalConstants.DC_QUEUE_MAX_SIZE,
  tbdStatus: globalConstants.TBD_UNRESPONSIVE,
  avrgTimeMsQuery: 4500,
  avrgTimeMsGetLast: 5000,
});

const getDeadTbdStatus = () => ({
  dcQueriesDelay: globalConstants.DC_QUEUE_MAX_SIZE,
  tbdStatus: globalConstants.TBD_DEAD,
  avrgTimeMsQuery: 4500,
  avrgTimeMsGetLast: 5000,
});

const getHealthyDcStatusProtobuf = () => protobuf.encode(
  'dc.dataControllerUtils.DcStatus',
  getHealthyDcStatus()
);

const getCongestionDcStatusProtobuf = () => protobuf.encode(
  'dc.dataControllerUtils.DcStatus',
  getCongestionDcStatus()
);

const getDeadTbdStatusProtobuf = () => protobuf.encode(
  'dc.dataControllerUtils.DcStatus',
  getDeadTbdStatus()
);
module.exports = {
  getHealthyDcStatus,
  getHealthyDcStatusProtobuf,
  getCongestionDcStatus,
  getCongestionDcStatusProtobuf,
  getDeadTbdStatus,
  getDeadTbdStatusProtobuf,
};
