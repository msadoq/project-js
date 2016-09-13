const JS = require('../protoFile/timeBasedDataString.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const TimeBasedDataString = JS.TimeBasedDataString;

exports.binToJson = (payload) => {
  const decoded = TimeBasedDataString.decode(payload);
  const timeBasedDataString = {
    timeStamp: decoded.timeStamp.value,    name: decoded.name.value,    value: decoded.value.value
  };
  return timeBasedDataString;
};
