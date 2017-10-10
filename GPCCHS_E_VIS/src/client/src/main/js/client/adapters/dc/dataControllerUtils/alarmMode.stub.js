const ProtoBuf = require('protobufjs');
const applyOverride = require('../applyOverride');
const Adapter = require('./alarmMode');

const Builder = new ProtoBuf.Root().loadSync(`${__dirname}/alarmMode.proto`, { keepCase: true }).lookup('dataControllerUtils.protobuf.alarmMode');

const getAlarmMode = override => applyOverride({
  type: 0,
}, override);

const getAlarmModeProtobuf = override => Builder.encode(Adapter.encode(getAlarmMode(override))).finish();

module.exports = {
  getAlarmMode,
  getAlarmModeProtobuf,
};
