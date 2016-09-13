const JS = require('../protoFile/fDSTimeBasedDataUByte.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const FDSTimeBasedDataUByte = JS.FDSTimeBasedDataUByte;

exports.binToJson = (payload) => {
  const decoded = FDSTimeBasedDataUByte.decode(payload);
  const fDSTimeBasedDataUByte = {
    timeStamp: decoded.timeStamp.value,    name: decoded.name.value,    value: decoded.value.value,    fDSTimeBasedDataUByte: decoded.fDSTimeBasedDataUByte.value,    fDSTimeBasedDataUByte2: decoded.fDSTimeBasedDataUByte2.value
  };
  return fDSTimeBasedDataUByte;
};
