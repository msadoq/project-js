const JS = require('../protoFile/timeBasedDataURI.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const TimeBasedDataURI = JS.TimeBasedDataURI;

exports.binToJson = (payload) => {
  const decoded = TimeBasedDataURI.decode(payload);
  const timeBasedDataURI = {
    timeStamp: decoded.timeStamp.value,    name: decoded.name.value,    value: decoded.value.value
  };
  return timeBasedDataURI;
};
