const ProtoBuf = require('protobufjs');
const applyOverride = require('../applyOverride');
const Adapter = require('./groundMonitoringAlarmAckRequest');

const Builder = new ProtoBuf.Root().loadSync(`${__dirname}/groundMonitoringAlarmAckRequest.proto`, { keepCase: true }).lookup('dataControllerUtils.protobuf.groundMonitoringAlarmAckRequest');

const getGroundMonitoringAlarmAckRequest = override => applyOverride({
  type: 0,
}, override);

const getGroundMonitoringAlarmAckRequestProtobuf = override =>
  Builder.encode(Adapter.encode(getGroundMonitoringAlarmAckRequest(override))).finish();

module.exports = {
  getGroundMonitoringAlarmAckRequest,
  getGroundMonitoringAlarmAckRequestProtobuf,
};
