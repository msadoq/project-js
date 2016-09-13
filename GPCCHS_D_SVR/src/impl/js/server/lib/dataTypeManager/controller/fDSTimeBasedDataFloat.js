const JS = require('../protoFile/fDSTimeBasedDataFloat.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const FDSTimeBasedDataFloat = JS.FDSTimeBasedDataFloat;

exports.binToJson = (payload) => {
  const decoded = FDSTimeBasedDataFloat.decode(payload);
  const fDSTimeBasedDataFloat = {
    timeStamp: decoded.timeStamp.value,    name: decoded.name.value,    value: decoded.value.value
  };
  return fDSTimeBasedDataFloat;
};
