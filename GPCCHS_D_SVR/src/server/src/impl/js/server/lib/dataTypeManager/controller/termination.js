const JS = require('../protoFile/termination.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const Termination = JS.Termination;

exports.binToJson = (payload) => {
  const decoded = Termination.decode(payload);
  const termination = {
    terminationStatus: decoded.terminationStatus,    terminationInfo: decoded.terminationInfo.value,    terminationTime: decoded.terminationTime.value
  };
  return termination;
};
