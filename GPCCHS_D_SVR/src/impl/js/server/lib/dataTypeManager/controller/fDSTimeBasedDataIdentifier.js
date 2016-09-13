const JS = require('../protoFile/fDSTimeBasedDataIdentifier.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const FDSTimeBasedDataIdentifier = JS.FDSTimeBasedDataIdentifier;

exports.binToJson = (payload) => {
  const decoded = FDSTimeBasedDataIdentifier.decode(payload);
  const fDSTimeBasedDataIdentifier = {
    timeStamp: decoded.timeStamp.value,    name: decoded.name.value,    value: decoded.value.value
  };
  return fDSTimeBasedDataIdentifier;
};
