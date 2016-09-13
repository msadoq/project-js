const JS = require('../protoFile/timeBasedDataTime.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const TimeBasedDataTime = JS.TimeBasedDataTime;

exports.binToJson = (payload) => {
  const decoded = TimeBasedDataTime.decode(payload);
  const timeBasedDataTime = {
    timeStamp: decoded.timeStamp.value,    name: decoded.name.value,    value: decoded.value.value
  };
  return timeBasedDataTime;
};
