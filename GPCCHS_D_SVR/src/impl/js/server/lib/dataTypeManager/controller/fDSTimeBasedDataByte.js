const JS = require('../protoFile/fDSTimeBasedDataByte.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const FDSTimeBasedDataByte = JS.FDSTimeBasedDataByte;

exports.binToJson = (payload) => {
  const decoded = FDSTimeBasedDataByte.decode(payload);
  const fDSTimeBasedDataByte = {
    timeStamp: decoded.timeStamp.value,    name: decoded.name.value,    value: decoded.value.value
  };
  return fDSTimeBasedDataByte;
};
