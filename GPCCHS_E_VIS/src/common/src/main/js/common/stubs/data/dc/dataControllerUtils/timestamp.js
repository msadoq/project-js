const _now = require('lodash/now');

const protobuf = require('../../../../protobuf');
const applyOverride = require('../../applyOverride');

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
