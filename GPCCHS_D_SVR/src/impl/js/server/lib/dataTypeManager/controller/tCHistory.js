const JS = require('../protoFile/tCHistory.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const TCHistory = JS.TCHistory;

exports.binToJson = (payload) => {
  const decoded = TCHistory.decode(payload);
  const tCHistory = {
    sendingDate: decoded.sendingDate.value,    historyName: decoded.historyName.value,    rawPacket: decoded.rawPacket.value,    procedureName: decoded.procedureName.value,    tcSourceId: decoded.tcSourceId.value,    isPUS: decoded.isPUS.value,    service: decoded.service.value,    subService: decoded.subService.value,    sequenceCount: decoded.sequenceCount.value,    apid: decoded.apid.value,    visibility: decoded.visibility.value,    sendType: decoded.sendType,    tcNums: decoded.tcNums.value,    subscheduleId: decoded.subscheduleId.value,    procedureUid: decoded.procedureUid.value,    partition: decoded.partition.value,    fileReference: decoded.fileReference.value,    largeSequenceCount: decoded.largeSequenceCount.value,    expectedAck: decoded.expectedAck.value,    successiveAck: decoded.successiveAck.value,    tcComponent: decoded.tcComponent.value,    largeTcHistoryId: decoded.largeTcHistoryId.value
  };
  return tCHistory;
};
