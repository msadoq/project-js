// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const sTRING = require('../ccsds_mal/sTRING');
const uINTEGER = require('../ccsds_mal/uINTEGER');
const uLONG = require('../ccsds_mal/uLONG');

module.exports = {
  encode: data => ({
    rid: (data.rid !== null && typeof data.rid !== 'undefined')
      ? uINTEGER.encode(data.rid)
      : null,
    onBoardStatus: (data.onBoardStatus !== null && typeof data.onBoardStatus !== 'undefined')
      ? uINTEGER.encode(data.onBoardStatus)
      : null,
    alarmLevel: (data.alarmLevel !== null && typeof data.alarmLevel !== 'undefined')
      ? sTRING.encode(data.alarmLevel)
      : null,
    lastUpdateModeRid: (data.lastUpdateModeRid !== null && typeof data.lastUpdateModeRid !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeRid)
      : null,
    lastUpdateTimeRid: (data.lastUpdateTimeRid !== null && typeof data.lastUpdateTimeRid !== 'undefined')
      ? sTRING.encode(data.lastUpdateTimeRid)
      : null,
    lastUpdateModeOnBoardStatus: (data.lastUpdateModeOnBoardStatus !== null && typeof data.lastUpdateModeOnBoardStatus !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeOnBoardStatus)
      : null,
    lastUpdateTimeOnBoardStatus: (data.lastUpdateTimeOnBoardStatus !== null && typeof data.lastUpdateTimeOnBoardStatus !== 'undefined')
      ? sTRING.encode(data.lastUpdateTimeOnBoardStatus)
      : null,
    lastUpdateModeAlarmLevel: (data.lastUpdateModeAlarmLevel !== null && typeof data.lastUpdateModeAlarmLevel !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeAlarmLevel)
      : null,
    lastUpdateTimeAlarmLevel: (data.lastUpdateTimeAlarmLevel !== null && typeof data.lastUpdateTimeAlarmLevel !== 'undefined')
      ? sTRING.encode(data.lastUpdateTimeAlarmLevel)
      : null,
    serviceApid: (data.serviceApid !== null && typeof data.serviceApid !== 'undefined')
      ? uINTEGER.encode(data.serviceApid)
      : null,
    serviceApidName: (data.serviceApidName !== null && typeof data.serviceApidName !== 'undefined')
      ? sTRING.encode(data.serviceApidName)
      : null,
    reportName: (data.reportName !== null && typeof data.reportName !== 'undefined')
      ? sTRING.encode(data.reportName)
      : null,
    ridLabel: (data.ridLabel !== null && typeof data.ridLabel !== 'undefined')
      ? sTRING.encode(data.ridLabel)
      : null,
    reportShortDescription: (data.reportShortDescription !== null && typeof data.reportShortDescription !== 'undefined')
      ? sTRING.encode(data.reportShortDescription)
      : null,
    reportLongDescription: (data.reportLongDescription !== null && typeof data.reportLongDescription !== 'undefined')
      ? sTRING.encode(data.reportLongDescription)
      : null,
    actionName: (data.actionName !== null && typeof data.actionName !== 'undefined')
      ? sTRING.encode(data.actionName)
      : null,
    defaultOnBoardStatus: (data.defaultOnBoardStatus !== null && typeof data.defaultOnBoardStatus !== 'undefined')
      ? uINTEGER.encode(data.defaultOnBoardStatus)
      : null,
    uniqueId: (data.uniqueId !== null && typeof data.uniqueId !== 'undefined')
      ? uLONG.encode(data.uniqueId)
      : null,
  }),
  decode: data => ({
    rid: (data.rid !== null && typeof data.rid !== 'undefined')
      ? uINTEGER.decode(data.rid)
      : undefined,
    onBoardStatus: (data.onBoardStatus !== null && typeof data.onBoardStatus !== 'undefined')
      ? uINTEGER.decode(data.onBoardStatus)
      : undefined,
    alarmLevel: (data.alarmLevel !== null && typeof data.alarmLevel !== 'undefined')
      ? sTRING.decode(data.alarmLevel)
      : undefined,
    lastUpdateModeRid: (data.lastUpdateModeRid !== null && typeof data.lastUpdateModeRid !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeRid)
      : undefined,
    lastUpdateTimeRid: (data.lastUpdateTimeRid !== null && typeof data.lastUpdateTimeRid !== 'undefined')
      ? sTRING.decode(data.lastUpdateTimeRid)
      : undefined,
    lastUpdateModeOnBoardStatus: (data.lastUpdateModeOnBoardStatus !== null && typeof data.lastUpdateModeOnBoardStatus !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeOnBoardStatus)
      : undefined,
    lastUpdateTimeOnBoardStatus: (data.lastUpdateTimeOnBoardStatus !== null && typeof data.lastUpdateTimeOnBoardStatus !== 'undefined')
      ? sTRING.decode(data.lastUpdateTimeOnBoardStatus)
      : undefined,
    lastUpdateModeAlarmLevel: (data.lastUpdateModeAlarmLevel !== null && typeof data.lastUpdateModeAlarmLevel !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeAlarmLevel)
      : undefined,
    lastUpdateTimeAlarmLevel: (data.lastUpdateTimeAlarmLevel !== null && typeof data.lastUpdateTimeAlarmLevel !== 'undefined')
      ? sTRING.decode(data.lastUpdateTimeAlarmLevel)
      : undefined,
    serviceApid: (data.serviceApid !== null && typeof data.serviceApid !== 'undefined')
      ? uINTEGER.decode(data.serviceApid)
      : undefined,
    serviceApidName: (data.serviceApidName !== null && typeof data.serviceApidName !== 'undefined')
      ? sTRING.decode(data.serviceApidName)
      : undefined,
    reportName: (data.reportName !== null && typeof data.reportName !== 'undefined')
      ? sTRING.decode(data.reportName)
      : undefined,
    ridLabel: (data.ridLabel !== null && typeof data.ridLabel !== 'undefined')
      ? sTRING.decode(data.ridLabel)
      : undefined,
    reportShortDescription: (data.reportShortDescription !== null && typeof data.reportShortDescription !== 'undefined')
      ? sTRING.decode(data.reportShortDescription)
      : undefined,
    reportLongDescription: (data.reportLongDescription !== null && typeof data.reportLongDescription !== 'undefined')
      ? sTRING.decode(data.reportLongDescription)
      : undefined,
    actionName: (data.actionName !== null && typeof data.actionName !== 'undefined')
      ? sTRING.decode(data.actionName)
      : undefined,
    defaultOnBoardStatus: (data.defaultOnBoardStatus !== null && typeof data.defaultOnBoardStatus !== 'undefined')
      ? uINTEGER.decode(data.defaultOnBoardStatus)
      : undefined,
    uniqueId: (data.uniqueId !== null && typeof data.uniqueId !== 'undefined')
      ? uLONG.decode(data.uniqueId)
      : undefined,
  }),
};
