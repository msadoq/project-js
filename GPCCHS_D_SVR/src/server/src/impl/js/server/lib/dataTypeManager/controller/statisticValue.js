const JS = require('../protoFile/statisticValue.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const StatisticValue = JS.StatisticValue;

exports.binToJson = (payload) => {
  const decoded = StatisticValue.decode(payload);
  const statisticValue = {
    startTime: decoded.startTime.value,    endTime: decoded.endTime.value,    valueTime: decoded.valueTime.value,    value: getAttributeValue(decoded.value),    sampleCount: decoded.sampleCount.value,    timestamp: decoded.timestamp.value
  };
  return statisticValue;
};
