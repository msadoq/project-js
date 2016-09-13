const JS = require('../protoFile/fDSTimeBasedDataUShort.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const FDSTimeBasedDataUShort = JS.FDSTimeBasedDataUShort;

exports.binToJson = (payload) => {
  const decoded = FDSTimeBasedDataUShort.decode(payload);
  const fDSTimeBasedDataUShort = {
    timeStamp: decoded.timeStamp.value,    name: decoded.name.value,    value: decoded.value.value
  };
  return fDSTimeBasedDataUShort;
};
