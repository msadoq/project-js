// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const pusElement = require('./pusElement');
const sTRING = require('../ccsds_mal/sTRING');
const tIME = require('../ccsds_mal/tIME');
const uINTEGER = require('../ccsds_mal/uINTEGER');
const uOCTET = require('../ccsds_mal/uOCTET');

module.exports = {
  encode: data => ({
    reportId: (data.reportId !== null && typeof data.reportId !== 'undefined')
      ? uINTEGER.encode(data.reportId)
      : null,
    onBoardStatus: (data.onBoardStatus !== null && typeof data.onBoardStatus !== 'undefined')
      ? uOCTET.encode(data.onBoardStatus)
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
    lastUpdateModeReportId: (data.lastUpdateModeReportId !== null && typeof data.lastUpdateModeReportId !== 'undefined')
      ? uOCTET.encode(data.lastUpdateModeReportId)
      : null,
    lastUpdateTimeReportId: (data.lastUpdateTimeReportId !== null && typeof data.lastUpdateTimeReportId !== 'undefined')
      ? tIME.encode(data.lastUpdateTimeReportId)
      : null,
    lastUpdateModeOnBoardStatus: (data.lastUpdateModeOnBoardStatus !== null && typeof data.lastUpdateModeOnBoardStatus !== 'undefined')
      ? uOCTET.encode(data.lastUpdateModeOnBoardStatus)
      : null,
    lastUpdateTimeOnBoardStatus: (data.lastUpdateTimeOnBoardStatus !== null && typeof data.lastUpdateTimeOnBoardStatus !== 'undefined')
      ? tIME.encode(data.lastUpdateTimeOnBoardStatus)
      : null,
    lastUpdateModeAlarmLevel: (data.lastUpdateModeAlarmLevel !== null && typeof data.lastUpdateModeAlarmLevel !== 'undefined')
      ? uOCTET.encode(data.lastUpdateModeAlarmLevel)
      : null,
    lastUpdateTimeAlarmLevel: (data.lastUpdateTimeAlarmLevel !== null && typeof data.lastUpdateTimeAlarmLevel !== 'undefined')
      ? tIME.encode(data.lastUpdateTimeAlarmLevel)
      : null,
  }),
  decode: data => ({
    reportId: (data.reportId !== null && typeof data.reportId !== 'undefined')
      ? uINTEGER.decode(data.reportId)
      : undefined,
    onBoardStatus: (data.onBoardStatus !== null && typeof data.onBoardStatus !== 'undefined')
      ? uOCTET.decode(data.onBoardStatus)
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
    lastUpdateModeReportId: (data.lastUpdateModeReportId !== null && typeof data.lastUpdateModeReportId !== 'undefined')
      ? uOCTET.decode(data.lastUpdateModeReportId)
      : undefined,
    lastUpdateTimeReportId: (data.lastUpdateTimeReportId !== null && typeof data.lastUpdateTimeReportId !== 'undefined')
      ? tIME.decode(data.lastUpdateTimeReportId)
      : undefined,
    lastUpdateModeOnBoardStatus: (data.lastUpdateModeOnBoardStatus !== null && typeof data.lastUpdateModeOnBoardStatus !== 'undefined')
      ? uOCTET.decode(data.lastUpdateModeOnBoardStatus)
      : undefined,
    lastUpdateTimeOnBoardStatus: (data.lastUpdateTimeOnBoardStatus !== null && typeof data.lastUpdateTimeOnBoardStatus !== 'undefined')
      ? tIME.decode(data.lastUpdateTimeOnBoardStatus)
      : undefined,
    lastUpdateModeAlarmLevel: (data.lastUpdateModeAlarmLevel !== null && typeof data.lastUpdateModeAlarmLevel !== 'undefined')
      ? uOCTET.decode(data.lastUpdateModeAlarmLevel)
      : undefined,
    lastUpdateTimeAlarmLevel: (data.lastUpdateTimeAlarmLevel !== null && typeof data.lastUpdateTimeAlarmLevel !== 'undefined')
      ? tIME.decode(data.lastUpdateTimeAlarmLevel)
      : undefined,
  }),
};
