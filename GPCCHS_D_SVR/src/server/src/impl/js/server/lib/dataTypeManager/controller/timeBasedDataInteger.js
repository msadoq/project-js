const JS = require('../protoFile/timeBasedDataInteger.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const TimeBasedDataInteger = JS.TimeBasedDataInteger;

exports.binToJson = (payload) => {
  const decoded = TimeBasedDataInteger.decode(payload);
  const timeBasedDataInteger = {
    timeStamp: decoded.timeStamp.value,    name: decoded.name.value,    value: decoded.value.value
  };
  return timeBasedDataInteger;
};
