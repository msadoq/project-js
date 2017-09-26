// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

const ProtoBuf = require('protobufjs');
const Adapter = require('./dcStatus');

const Builder = new ProtoBuf.Root().loadSync(`${__dirname}/DcStatus.proto`, { keepCase: true }).lookup('dataControllerUtils.protobuf.DcStatus');

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

const getHealthyDcStatusProtobuf = () => Builder.encode(Adapter.encode(getHealthyDcStatus())).finish();
const getCongestionDcStatusProtobuf = () => Builder.encode(Adapter.encode(getCongestionDcStatus())).finish();
const getDeadTbdStatusProtobuf = () => Builder.encode(Adapter.encode(getDeadTbdStatus())).finish();
module.exports = {
  getHealthyDcStatus,
  getHealthyDcStatusProtobuf,
  getCongestionDcStatus,
  getCongestionDcStatusProtobuf,
  getDeadTbdStatus,
  getDeadTbdStatusProtobuf,
};
