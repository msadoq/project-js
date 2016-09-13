const JS = require('../protoFile/timeBasedDataLong.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const TimeBasedDataLong = JS.TimeBasedDataLong;

exports.binToJson = (payload) => {
  const decoded = TimeBasedDataLong.decode(payload);
  const timeBasedDataLong = {
    timeStamp: decoded.timeStamp.value,    name: decoded.name.value,    value: decoded.value.value
  };
  return timeBasedDataLong;
};
