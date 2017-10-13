module.exports = {
  encode: data => ({
    creationDate: data.creationDate,
    paramUid: data.paramUid,
    updateDate: data.updateDate,
    closingDate: data.closingDate,
    hasAckRequest: data.hasAckRequest,
    alarmId: data.alarmId,
    isNominal: data.isNominal,
  }),
  decode: data => ({
    creationDate: data.creationDate,
    paramUid: data.paramUid,
    updateDate: data.updateDate,
    closingDate: data.closingDate,
    hasAckRequest: data.hasAckRequest,
    alarmId: data.alarmId,
    isNominal: data.isNominal,
  }),
};
