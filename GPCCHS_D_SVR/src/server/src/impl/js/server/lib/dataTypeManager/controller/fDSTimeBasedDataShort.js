const JS = require('../protoFile/fDSTimeBasedDataShort.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const FDSTimeBasedDataShort = JS.FDSTimeBasedDataShort;

exports.binToJson = (payload) => {
  const decoded = FDSTimeBasedDataShort.decode(payload);
  const fDSTimeBasedDataShort = {
    timeStamp: decoded.timeStamp.value,    name: decoded.name.value,    value: decoded.value.value
  };
  return fDSTimeBasedDataShort;
};
