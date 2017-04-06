// Produced by Acceleo JavaScript Generator 1.1.0
const pusElement = require('./pusElement');

module.exports = {
  encode: data => ({
    reportId: (data.reportId !== null && typeof data.reportId !== 'undefined')
      ? { value: data.reportId }
      : null,
    onBoardStatus: (data.onBoardStatus !== null && typeof data.onBoardStatus !== 'undefined')
      ? { value: data.onBoardStatus }
      : null,
    alarmLevel: (data.alarmLevel !== null && typeof data.alarmLevel !== 'undefined')
      ? { value: data.alarmLevel }
      : null,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.encode(data.pusElement)
      : null,
  }),
  decode: data => ({
    reportId: (data.reportId !== null && typeof data.reportId !== 'undefined')
      ? { type: 'uinteger', value: data.reportId.value }
      : undefined,
    onBoardStatus: (data.onBoardStatus !== null && typeof data.onBoardStatus !== 'undefined')
      ? { type: 'uinteger', value: data.onBoardStatus.value }
      : undefined,
    alarmLevel: (data.alarmLevel !== null && typeof data.alarmLevel !== 'undefined')
      ? { type: 'string', value: data.alarmLevel.value }
      : undefined,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.decode(data.pusElement)
      : undefined,
  }),
};

