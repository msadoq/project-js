const JS = require('../protoFile/timeBasedDataFinetime.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const TimeBasedDataFinetime = JS.TimeBasedDataFinetime;

exports.binToJson = (payload) => {
  const decoded = TimeBasedDataFinetime.decode(payload);
  const timeBasedDataFinetime = {
    timeStamp: decoded.timeStamp.value,    name: decoded.name.value,    value: decoded.value.value
  };
  return timeBasedDataFinetime;
};
