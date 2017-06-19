const protobuf = require('../../../index');

const DC_EMPTY_QUEUE = 0;
const DC_QUEUE_MAX_SIZE = 1000;
const TBD_HEALTHY = 0;
const TBD_UNRESPONSIVE = 1;
const TBD_DEAD = 2;

const getHealthyDcStatus = () => ({
  dcQueriesDelay: DC_EMPTY_QUEUE,
  tbdStatus: TBD_HEALTHY,
  avrgTimeMsQuery: 50,
  avrgTimeMsGetLast: 50,
});

const getCongestionDcStatus = () => ({
  dcQueriesDelay: DC_QUEUE_MAX_SIZE,
  tbdStatus: TBD_UNRESPONSIVE,
  avrgTimeMsQuery: 4500,
  avrgTimeMsGetLast: 5000,
});

const getDeadTbdStatus = () => ({
  dcQueriesDelay: DC_QUEUE_MAX_SIZE,
  tbdStatus: TBD_DEAD,
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
