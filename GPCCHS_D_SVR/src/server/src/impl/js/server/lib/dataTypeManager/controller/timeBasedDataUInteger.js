const JS = require('../protoFile/timeBasedDataUInteger.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const TimeBasedDataUInteger = JS.TimeBasedDataUInteger;

exports.binToJson = (payload) => {
  const decoded = TimeBasedDataUInteger.decode(payload);
  const timeBasedDataUInteger = {
    timeStamp: decoded.timeStamp.value,    name: decoded.name.value,    value: decoded.value.value
  };
  return timeBasedDataUInteger;
};
