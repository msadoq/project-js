const JS = require('../protoFile/fDSTimeBasedDataDouble.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const FDSTimeBasedDataDouble = JS.FDSTimeBasedDataDouble;

exports.binToJson = (payload) => {
  const decoded = FDSTimeBasedDataDouble.decode(payload);
  const fDSTimeBasedDataDouble = {
    timeStamp: decoded.timeStamp.value,    name: decoded.name.value,    value: decoded.value.value
  };
  return fDSTimeBasedDataDouble;
};
