const JS = require('../protoFile/timeBasedDataUShort.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const TimeBasedDataUShort = JS.TimeBasedDataUShort;

exports.binToJson = (payload) => {
  const decoded = TimeBasedDataUShort.decode(payload);
  const timeBasedDataUShort = {
    timeStamp: decoded.timeStamp.value,    name: decoded.name.value,    value: decoded.value.value
  };
  return timeBasedDataUShort;
};
