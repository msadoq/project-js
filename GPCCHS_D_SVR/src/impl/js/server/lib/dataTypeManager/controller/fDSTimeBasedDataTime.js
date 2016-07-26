const JS = require('../protoFile/fDSTimeBasedDataTime.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const FDSTimeBasedDataTime = JS.FDSTimeBasedDataTime;

exports.binToJson = (payload) => {
  const decoded = FDSTimeBasedDataTime.decode(payload);
  const fDSTimeBasedDataTime = {
    timeStamp: decoded.timeStamp.value,    name: decoded.name.value,    value: decoded.value.value
  };
  return fDSTimeBasedDataTime;
};
