const ProtoBuf = require('protobufjs');
const applyOverride = require('../applyOverride');
const Adapter = require('./onBoardAlarm');

const Builder = new ProtoBuf.Root().loadSync(`${__dirname}/OnBoardAlarm.proto`, { keepCase: true }).lookup('dataControllerUtils.protobuf.OnBoardAlarm');

const getOnBoardAlarm = override => applyOverride({

}, override);

const getOnBoardAlarmProtobuf = override =>
  Builder.encode(Adapter.encode(getOnBoardAlarm(override))).finish();

module.exports = {
  getOnBoardAlarm,
  getOnBoardAlarmProtobuf,
};
