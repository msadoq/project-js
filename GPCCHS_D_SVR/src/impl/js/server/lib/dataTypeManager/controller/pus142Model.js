const JS = require('../protoFile/pus142Model.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const Pus142Model = JS.Pus142Model;

exports.binToJson = (payload) => {
  const decoded = Pus142Model.decode(payload);
  const pus142Model = {
    serviceStatus: decoded.serviceStatus.value,    noOfFunctionalMonitoring: decoded.noOfFunctionalMonitoring.value,    pus142FunctionalMonitoring: decoded.pus142FunctionalMonitoring.value,    groundDate: decoded.groundDate.value,    apid: decoded.apid.value,    pusElement: decoded.pusElement.value
  };
  return pus142Model;
};
