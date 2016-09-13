const JS = require('../protoFile/fDSTimeBasedDataLong.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const FDSTimeBasedDataLong = JS.FDSTimeBasedDataLong;

exports.binToJson = (payload) => {
  const decoded = FDSTimeBasedDataLong.decode(payload);
  const fDSTimeBasedDataLong = {
    timeStamp: decoded.timeStamp.value,    name: decoded.name.value,    value: decoded.value.value
  };
  return fDSTimeBasedDataLong;
};
