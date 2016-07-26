const JS = require('../protoFile/timeBasedDataShort.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const TimeBasedDataShort = JS.TimeBasedDataShort;

exports.binToJson = (payload) => {
  const decoded = TimeBasedDataShort.decode(payload);
  const timeBasedDataShort = {
    timeStamp: decoded.timeStamp.value,    name: decoded.name.value,    value: decoded.value.value
  };
  return timeBasedDataShort;
};
