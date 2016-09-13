const JS = require('../protoFile/pus011Model.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const Pus011Model = JS.Pus011Model;

exports.binToJson = (payload) => {
  const decoded = Pus011Model.decode(payload);
  const pus011Model = {
    maxNoTc: decoded.maxNoTc.value,    scheduleStatus: decoded.scheduleStatus.value,    apid: decoded.apid.value,    noCommands: decoded.noCommands.value,    noSubSchedule: decoded.noSubSchedule.value,    enabledApids: decoded.enabledApids.value,    pusElement: decoded.pusElement.value,    groundDate: decoded.groundDate.value,    disabledApids: decoded.disabledApids.value
  };
  return pus011Model;
};
