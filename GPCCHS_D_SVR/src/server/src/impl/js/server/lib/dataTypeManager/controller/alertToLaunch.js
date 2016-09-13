const JS = require('../protoFile/alertToLaunch.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const AlertToLaunch = JS.AlertToLaunch;

exports.binToJson = (payload) => {
  const decoded = AlertToLaunch.decode(payload);
  const alertToLaunch = {
    name: decoded.name.value,    date: decoded.date.value,    attributes: getAttributeValue(decoded.attributes),    execution: decoded.execution.value,    cOMPOSITE: decoded.cOMPOSITE.value
  };
  return alertToLaunch;
};
