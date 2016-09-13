const JS = require('../protoFile/pus012Model.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const Pus012Model = JS.Pus012Model;

exports.binToJson = (payload) => {
  const decoded = Pus012Model.decode(payload);
  const pus012Model = {
    apid: decoded.apid.value,    pus012ParameterMonitoringDefinition: decoded.pus012ParameterMonitoringDefinition.value,    noOfParameterMonitoringDefinition: decoded.noOfParameterMonitoringDefinition.value,    serviceStatus: decoded.serviceStatus.value,    groundDate: decoded.groundDate.value,    pusElement: decoded.pusElement.value
  };
  return pus012Model;
};
