const JS = require('../protoFile/fDSTimeBasedDataBlob.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const FDSTimeBasedDataBlob = JS.FDSTimeBasedDataBlob;

exports.binToJson = (payload) => {
  const decoded = FDSTimeBasedDataBlob.decode(payload);
  const fDSTimeBasedDataBlob = {
    timeStamp: decoded.timeStamp.value,    name: decoded.name.value,    value: decoded.value.value
  };
  return fDSTimeBasedDataBlob;
};
