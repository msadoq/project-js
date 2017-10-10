const ProtoBuf = require('protobufjs');
const applyOverride = require('../applyOverride');
const Adapter = require('./onBoardAlarm');

const Builder = new ProtoBuf.Root().loadSync(`${__dirname}/onBoardAlarm.proto`, { keepCase: true }).lookup('dataControllerUtils.protobuf.onBoardAlarm');

const getOnBoardAlarm = override => applyOverride({
  type: 0,
}, override);

const getOnBoardAlarmProtobuf = override =>
  Builder.encode(Adapter.encode(getOnBoardAlarm(override))).finish();

module.exports = {
  getOnBoardAlarm,
  getOnBoardAlarmProtobuf,
};
