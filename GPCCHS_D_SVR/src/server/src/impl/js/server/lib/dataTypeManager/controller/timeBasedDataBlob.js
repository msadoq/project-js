const JS = require('../protoFile/timeBasedDataBlob.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const TimeBasedDataBlob = JS.TimeBasedDataBlob;

exports.binToJson = (payload) => {
  const decoded = TimeBasedDataBlob.decode(payload);
  const timeBasedDataBlob = {
    timeStamp: decoded.timeStamp.value,    name: decoded.name.value,    value: decoded.value.value
  };
  return timeBasedDataBlob;
};
