const JS = require('../protoFile/timeBasedDataULong.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const TimeBasedDataULong = JS.TimeBasedDataULong;

exports.binToJson = (payload) => {
  const decoded = TimeBasedDataULong.decode(payload);
  const timeBasedDataULong = {
    timeStamp: decoded.timeStamp.value,    name: decoded.name.value,    value: decoded.value.value
  };
  return timeBasedDataULong;
};
