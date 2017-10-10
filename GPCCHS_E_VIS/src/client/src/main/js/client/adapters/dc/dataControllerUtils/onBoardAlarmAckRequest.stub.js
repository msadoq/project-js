const ProtoBuf = require('protobufjs');
const applyOverride = require('../applyOverride');
const Adapter = require('./onBoardAlarmAckRequest');

const Builder = new ProtoBuf.Root().loadSync(`${__dirname}/OnBoardAlarmAckRequest.proto`, { keepCase: true }).lookup('dataControllerUtils.protobuf.onBoardAlarmAckRequest');

const getOnBoardAlarmAckRequest = override => applyOverride({
  type: 0,
}, override);

const getOnBoardAlarmAckRequestProtobuf = override =>
  Builder.encode(Adapter.encode(getOnBoardAlarmAckRequest(override))).finish();

module.exports = {
  getOnBoardAlarmAckRequest,
  getOnBoardAlarmAckRequestProtobuf,
};
