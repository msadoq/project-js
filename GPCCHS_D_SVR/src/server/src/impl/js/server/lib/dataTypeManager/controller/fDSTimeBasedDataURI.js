const JS = require('../protoFile/fDSTimeBasedDataURI.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const FDSTimeBasedDataURI = JS.FDSTimeBasedDataURI;

exports.binToJson = (payload) => {
  const decoded = FDSTimeBasedDataURI.decode(payload);
  const fDSTimeBasedDataURI = {
    timeStamp: decoded.timeStamp.value,    name: decoded.name.value,    value: decoded.value.value
  };
  return fDSTimeBasedDataURI;
};
