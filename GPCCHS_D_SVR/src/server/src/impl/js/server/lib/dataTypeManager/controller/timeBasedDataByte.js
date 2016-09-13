const JS = require('../protoFile/timeBasedDataByte.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const TimeBasedDataByte = JS.TimeBasedDataByte;

exports.binToJson = (payload) => {
  const decoded = TimeBasedDataByte.decode(payload);
  const timeBasedDataByte = {
    timeStamp: decoded.timeStamp.value,    name: decoded.name.value,    value: decoded.value.value
  };
  return timeBasedDataByte;
};
