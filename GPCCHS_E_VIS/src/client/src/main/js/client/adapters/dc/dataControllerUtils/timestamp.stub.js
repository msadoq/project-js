// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

const _now = require('lodash/now');

const ProtoBuf = require('protobufjs');
const applyOverride = require('../applyOverride');
const Adapter = require('./timestamp');

const Builder = new ProtoBuf.Root().loadSync(`${__dirname}/Timestamp.proto`, { keepCase: true }).lookup('dataControllerUtils.protobuf.Timestamp');

const now = _now();

const getTimestamp = override => applyOverride({
  ms: now,
}, override);

const getTimestampProtobuf = override => Builder.encode(Adapter.encode(getTimestamp(override))).finish();

module.exports = {
  getTimestamp,
  getTimestampProtobuf,
};
