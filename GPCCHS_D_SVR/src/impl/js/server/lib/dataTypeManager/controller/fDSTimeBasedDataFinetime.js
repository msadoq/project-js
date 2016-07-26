const JS = require('../protoFile/fDSTimeBasedDataFinetime.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const FDSTimeBasedDataFinetime = JS.FDSTimeBasedDataFinetime;

exports.binToJson = (payload) => {
  const decoded = FDSTimeBasedDataFinetime.decode(payload);
  const fDSTimeBasedDataFinetime = {
    timeStamp: decoded.timeStamp.value,    name: decoded.name.value,    value: decoded.value.value
  };
  return fDSTimeBasedDataFinetime;
};
