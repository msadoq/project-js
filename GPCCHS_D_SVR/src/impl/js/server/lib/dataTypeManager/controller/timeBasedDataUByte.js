const JS = require('../protoFile/timeBasedDataUByte.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const TimeBasedDataUByte = JS.TimeBasedDataUByte;

exports.binToJson = (payload) => {
  const decoded = TimeBasedDataUByte.decode(payload);
  const timeBasedDataUByte = {
    timeStamp: decoded.timeStamp.value,    name: decoded.name.value,    value: decoded.value.value
  };
  return timeBasedDataUByte;
};
