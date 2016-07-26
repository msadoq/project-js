const JS = require('../protoFile/fDSTimeBasedDataBoolean.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const FDSTimeBasedDataBoolean = JS.FDSTimeBasedDataBoolean;

exports.binToJson = (payload) => {
  const decoded = FDSTimeBasedDataBoolean.decode(payload);
  const fDSTimeBasedDataBoolean = {
    timeStamp: decoded.timeStamp.value,    name: decoded.name.value,    value: decoded.value.value
  };
  return fDSTimeBasedDataBoolean;
};
