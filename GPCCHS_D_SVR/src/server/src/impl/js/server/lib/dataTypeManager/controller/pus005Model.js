const JS = require('../protoFile/pus005Model.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const Pus005Model = JS.Pus005Model;

exports.binToJson = (payload) => {
  const decoded = Pus005Model.decode(payload);
  const pus005Model = {
    apid: decoded.apid.value,    pus005OnBoardEvent: decoded.pus005OnBoardEvent.value,    groundDate: decoded.groundDate.value,    noMonitoringEvents: decoded.noMonitoringEvents.value,    noEventReports: decoded.noEventReports.value,    pusElement: decoded.pusElement.value
  };
  return pus005Model;
};
