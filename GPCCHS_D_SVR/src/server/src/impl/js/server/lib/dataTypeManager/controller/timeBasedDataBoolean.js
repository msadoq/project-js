const JS = require('../protoFile/timeBasedDataBoolean.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const TimeBasedDataBoolean = JS.TimeBasedDataBoolean;

exports.binToJson = (payload) => {
  const decoded = TimeBasedDataBoolean.decode(payload);
  const timeBasedDataBoolean = {
    timeStamp: decoded.timeStamp.value,    name: decoded.name.value,    value: decoded.value.value
  };
  return timeBasedDataBoolean;
};
