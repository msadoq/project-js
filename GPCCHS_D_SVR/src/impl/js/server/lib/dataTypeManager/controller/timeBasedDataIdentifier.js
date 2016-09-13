const JS = require('../protoFile/timeBasedDataIdentifier.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const TimeBasedDataIdentifier = JS.TimeBasedDataIdentifier;

exports.binToJson = (payload) => {
  const decoded = TimeBasedDataIdentifier.decode(payload);
  const timeBasedDataIdentifier = {
    timeStamp: decoded.timeStamp.value,    name: decoded.name.value,    value: decoded.value.value
  };
  return timeBasedDataIdentifier;
};
