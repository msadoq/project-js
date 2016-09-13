const JS = require('../protoFile/pus011Command.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const Pus011Command = JS.Pus011Command;

exports.binToJson = (payload) => {
  const decoded = Pus011Command.decode(payload);
  const pus011Command = {
    commandApid: decoded.commandApid.value,    commandBinaryProfile: decoded.commandBinaryProfile.value,    commandGroundStatus: decoded.commandGroundStatus.value,    commandName: decoded.commandName.value,    commandSequenceCount: decoded.commandSequenceCount.value,    commandStatus: decoded.commandStatus.value,    currentExecutionTime: decoded.currentExecutionTime.value,    initialExecutionTime: decoded.initialExecutionTime.value,    commandSourceId: decoded.commandSourceId.value,    ssId: decoded.ssId.value,    totalTimeShiftOffset: decoded.totalTimeShiftOffset.value,    pus011EncapsulatingTc: decoded.pus011EncapsulatingTc.value,    pus011CommandParameters: decoded.pus011CommandParameters.value,    pUS011TimeShift: decoded.pUS011TimeShift.value,    invalidBinaryTcDetected: decoded.invalidBinaryTcDetected.value,    apid: decoded.apid.value,    pusElement: decoded.pusElement.value,    groundDate: decoded.groundDate.value
  };
  return pus011Command;
};
