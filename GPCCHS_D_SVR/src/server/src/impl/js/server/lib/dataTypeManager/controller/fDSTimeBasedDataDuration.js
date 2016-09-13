const JS = require('../protoFile/fDSTimeBasedDataDuration.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const FDSTimeBasedDataDuration = JS.FDSTimeBasedDataDuration;

exports.binToJson = (payload) => {
  const decoded = FDSTimeBasedDataDuration.decode(payload);
  const fDSTimeBasedDataDuration = {
    timeStamp: decoded.timeStamp.value,    name: decoded.name.value,    value: decoded.value.value
  };
  return fDSTimeBasedDataDuration;
};
