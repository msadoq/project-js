const ProtoBuf = require('protobufjs');
const applyOverride = require('../applyOverride');
const Adapter = require('./alarmType');

const Builder = new ProtoBuf.Root().loadSync(`${__dirname}/alarmType.proto`, { keepCase: true }).lookup('dataControllerUtils.protobuf.alarmType');

const getAlarmType = override => applyOverride({
  mode: 0,
}, override);

const getAlarmTypeProtobuf = override => Builder.encode(Adapter.encode(getAlarmType(override))).finish();

module.exports = {
  getAlarmType,
  getAlarmTypeProtobuf,
};
