const JS = require('../protoFile/fDSTimeBasedDataInteger.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const FDSTimeBasedDataInteger = JS.FDSTimeBasedDataInteger;

exports.binToJson = (payload) => {
  const decoded = FDSTimeBasedDataInteger.decode(payload);
  const fDSTimeBasedDataInteger = {
    timeStamp: decoded.timeStamp.value,    name: decoded.name.value,    value: decoded.value.value
  };
  return fDSTimeBasedDataInteger;
};
