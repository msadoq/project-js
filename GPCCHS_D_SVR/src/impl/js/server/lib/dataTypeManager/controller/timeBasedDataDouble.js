const JS = require('../protoFile/timeBasedDataDouble.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const TimeBasedDataDouble = JS.TimeBasedDataDouble;

exports.binToJson = (payload) => {
  const decoded = TimeBasedDataDouble.decode(payload);
  const timeBasedDataDouble = {
    timeStamp: decoded.timeStamp.value,    name: decoded.name.value,    value: decoded.value.value
  };
  return timeBasedDataDouble;
};
