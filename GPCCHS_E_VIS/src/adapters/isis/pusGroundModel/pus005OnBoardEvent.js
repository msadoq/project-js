// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const pusElement = require('./pusElement');
const sTRING = require('../ccsds_mal/sTRING');
const uINTEGER = require('../ccsds_mal/uINTEGER');

module.exports = {
  encode: data => ({
    reportId: (data.reportId !== null && typeof data.reportId !== 'undefined')
      ? uINTEGER.encode(data.reportId)
      : null,
    onBoardStatus: (data.onBoardStatus !== null && typeof data.onBoardStatus !== 'undefined')
      ? uINTEGER.encode(data.onBoardStatus)
      : null,
    alarmLevel: (data.alarmLevel !== null && typeof data.alarmLevel !== 'undefined')
      ? sTRING.encode(data.alarmLevel)
      : null,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.encode(data.pusElement)
      : null,
    reportIdLabel: (data.reportIdLabel !== null && typeof data.reportIdLabel !== 'undefined')
      ? sTRING.encode(data.reportIdLabel)
      : null,
  }),
  decode: data => ({
    reportId: (data.reportId !== null && typeof data.reportId !== 'undefined')
      ? uINTEGER.decode(data.reportId)
      : undefined,
    onBoardStatus: (data.onBoardStatus !== null && typeof data.onBoardStatus !== 'undefined')
      ? uINTEGER.decode(data.onBoardStatus)
      : undefined,
    alarmLevel: (data.alarmLevel !== null && typeof data.alarmLevel !== 'undefined')
      ? sTRING.decode(data.alarmLevel)
      : undefined,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.decode(data.pusElement)
      : undefined,
    reportIdLabel: (data.reportIdLabel !== null && typeof data.reportIdLabel !== 'undefined')
      ? sTRING.decode(data.reportIdLabel)
      : undefined,
  }),
};
