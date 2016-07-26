const JS = require('../protoFile/fDSTimeBasedDataUInteger.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const FDSTimeBasedDataUInteger = JS.FDSTimeBasedDataUInteger;

exports.binToJson = (payload) => {
  const decoded = FDSTimeBasedDataUInteger.decode(payload);
  const fDSTimeBasedDataUInteger = {
    timeStamp: decoded.timeStamp.value,    name: decoded.name.value,    value: decoded.value.value
  };
  return fDSTimeBasedDataUInteger;
};
