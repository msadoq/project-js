const _now = require('lodash/now');

const ProtoBuf = require('protobufjs');
const applyOverride = require('../applyOverride');
const Adapter = require('./timeInterval');

const Builder = new ProtoBuf.Root().loadSync(`${__dirname}/TimeInterval.proto`, { keepCase: true }).lookup('dataControllerUtils.protobuf.TimeInterval');


const { getTimestamp } = require('./timestamp.stub');

const now = _now();

const getTimeInterval = override => applyOverride({
  startTime: getTimestamp({ ms: now - 10000 }), // 10s
  endTime: getTimestamp(),
}, override);

const getTimeIntervalProtobuf = override => Builder.encode(Adapter.encode(getTimeInterval(override))).finish();

module.exports = {
  getTimeInterval,
  getTimeIntervalProtobuf,
};