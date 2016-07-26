const JS = require('../protoFile/timeBasedDataDuration.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const TimeBasedDataDuration = JS.TimeBasedDataDuration;

exports.binToJson = (payload) => {
  const decoded = TimeBasedDataDuration.decode(payload);
  const timeBasedDataDuration = {
    timeStamp: decoded.timeStamp.value,    name: decoded.name.value,    value: decoded.value.value
  };
  return timeBasedDataDuration;
};
