const _now = require('lodash/now');

const protobuf = require('../../../../protobuf');
const applyOverride = require('../../applyOverride');

const { getTimestamp } = require('./timestamp');

const now = _now();

const getTimeInterval = override => applyOverride({
  startTime: getTimestamp({ ms: now - 10000 }), // 10s
  endTime: getTimestamp(),
}, override);

const getTimeIntervalProtobuf = override => protobuf.encode(
  'dc.dataControllerUtils.TimeInterval',
  getTimeInterval(override)
);

module.exports = {
  getTimeInterval,
  getTimeIntervalProtobuf,
};
