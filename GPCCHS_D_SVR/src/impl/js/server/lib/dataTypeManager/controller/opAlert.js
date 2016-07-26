const JS = require('../protoFile/opAlert.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const OpAlert = JS.OpAlert;

exports.binToJson = (payload) => {
  const decoded = OpAlert.decode(payload);
  const opAlert = {
    alertDate: decoded.alertDate.value,    specificAttributes: decoded.specificAttributes.value,    closingNeeded: decoded.closingNeeded.value,    answerID: decoded.answerID.value,    systemDate: decoded.systemDate.value,    mission: decoded.mission.value,    satellite: decoded.satellite.value,    opAlertConfiguration: decoded.opAlertConfiguration.value,    status: decoded.status,    lastCallDate: decoded.lastCallDate.value,    opAlertClosingData: decoded.opAlertClosingData.value
  };
  return opAlert;
};
