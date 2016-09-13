const JS = require('../protoFile/timeBasedDataFloat.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const TimeBasedDataFloat = JS.TimeBasedDataFloat;

exports.binToJson = (payload) => {
  const decoded = TimeBasedDataFloat.decode(payload);
  const timeBasedDataFloat = {
    timeStamp: decoded.timeStamp.value,    name: decoded.name.value,    value: decoded.value.value
  };
  return timeBasedDataFloat;
};
