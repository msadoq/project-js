const JS = require('../protoFile/fDSTimeBasedDataULong.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const FDSTimeBasedDataULong = JS.FDSTimeBasedDataULong;

exports.binToJson = (payload) => {
  const decoded = FDSTimeBasedDataULong.decode(payload);
  const fDSTimeBasedDataULong = {
    timeStamp: decoded.timeStamp.value,    name: decoded.name.value,    value: decoded.value.value
  };
  return fDSTimeBasedDataULong;
};
