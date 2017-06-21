const _now = require('lodash/now');

const ProtoBuf = require('protobufjs');
const applyOverride = require('../applyOverride');
const Adapter = require('./timestamp');

const Builder = new ProtoBuf.Root().loadSync(`${__dirname}/dataControllerUtils/Timestamp.proto`, { keepCase: true }).lookup('dataControllerUtils.protobuf.Timestamp');

const now = _now();

const getTimestamp = override => applyOverride({
  ms: now,
}, override);

const getTimestampProtobuf = override => protobuf.encode(
  'dc.dataControllerUtils.Timestamp',
  getTimestamp(override)
);

module.exports = {
  getTimestamp,
  getTimestampProtobuf,
};
