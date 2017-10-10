const ProtoBuf = require('protobufjs');
const applyOverride = require('../applyOverride');
const Adapter = require('./groundMonitoringAlarmAckRequest');

const Builder = new ProtoBuf.Root().loadSync(`${__dirname}/GroundMonitoringAlarmAckRequest.proto`, { keepCase: true }).lookup('dataControllerUtils.protobuf.GroundMonitoringAlarmAckRequest');

const getGroundMonitoringAlarmAckRequest = override => applyOverride({
  type: 0,
}, override);

const getGroundMonitoringAlarmAckRequestProtobuf = override =>
  Builder.encode(Adapter.encode(getGroundMonitoringAlarmAckRequest(override))).finish();

module.exports = {
  getGroundMonitoringAlarmAckRequest,
  getGroundMonitoringAlarmAckRequestProtobuf,
};
