const JS = require('../protoFile/fDSTimeBasedDataString.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const FDSTimeBasedDataString = JS.FDSTimeBasedDataString;

exports.binToJson = (payload) => {
  const decoded = FDSTimeBasedDataString.decode(payload);
  const fDSTimeBasedDataString = {
    timeStamp: decoded.timeStamp.value,    name: decoded.name.value,    value: decoded.value.value
  };
  return fDSTimeBasedDataString;
};
