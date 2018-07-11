// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const sTRING = require('../ccsds_mal/sTRING');
const uINTEGER = require('../ccsds_mal/uINTEGER');
const uLONG = require('../ccsds_mal/uLONG');

module.exports = {
  encode: data => ({
    serviceApid: (data.serviceApid !== null && typeof data.serviceApid !== 'undefined')
      ? uINTEGER.encode(data.serviceApid)
      : null,
    ssId: (data.ssId !== null && typeof data.ssId !== 'undefined')
      ? uINTEGER.encode(data.ssId)
      : null,
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? uINTEGER.encode(data.status)
      : null,
    ssIdLabel: (data.ssIdLabel !== null && typeof data.ssIdLabel !== 'undefined')
      ? sTRING.encode(data.ssIdLabel)
      : null,
    lastUpdateModeSubScheduleId: (data.lastUpdateModeSubScheduleId !== null && typeof data.lastUpdateModeSubScheduleId !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeSubScheduleId)
      : null,
    lastUpdateTimeSubscheduleId: (data.lastUpdateTimeSubscheduleId !== null && typeof data.lastUpdateTimeSubscheduleId !== 'undefined')
      ? sTRING.encode(data.lastUpdateTimeSubscheduleId)
      : null,
    lastUpdateModeStatus: (data.lastUpdateModeStatus !== null && typeof data.lastUpdateModeStatus !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeStatus)
      : null,
    lastUpdateTimeStatus: (data.lastUpdateTimeStatus !== null && typeof data.lastUpdateTimeStatus !== 'undefined')
      ? sTRING.encode(data.lastUpdateTimeStatus)
      : null,
    executionTimeFirstTc: (data.executionTimeFirstTc !== null && typeof data.executionTimeFirstTc !== 'undefined')
      ? sTRING.encode(data.executionTimeFirstTc)
      : null,
    lastUpdateModeExecTimeFirstTc: (data.lastUpdateModeExecTimeFirstTc !== null && typeof data.lastUpdateModeExecTimeFirstTc !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeExecTimeFirstTc)
      : null,
    lastUpdateTimeExecTimeFirstTc: (data.lastUpdateTimeExecTimeFirstTc !== null && typeof data.lastUpdateTimeExecTimeFirstTc !== 'undefined')
      ? sTRING.encode(data.lastUpdateTimeExecTimeFirstTc)
      : null,
    serviceApidName: (data.serviceApidName !== null && typeof data.serviceApidName !== 'undefined')
      ? sTRING.encode(data.serviceApidName)
      : null,
    uniqueId: (data.uniqueId !== null && typeof data.uniqueId !== 'undefined')
      ? uLONG.encode(data.uniqueId)
      : null,
  }),
  decode: data => ({
    serviceApid: (data.serviceApid !== null && typeof data.serviceApid !== 'undefined')
      ? uINTEGER.decode(data.serviceApid)
      : undefined,
    ssId: (data.ssId !== null && typeof data.ssId !== 'undefined')
      ? uINTEGER.decode(data.ssId)
      : undefined,
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? uINTEGER.decode(data.status)
      : undefined,
    ssIdLabel: (data.ssIdLabel !== null && typeof data.ssIdLabel !== 'undefined')
      ? sTRING.decode(data.ssIdLabel)
      : undefined,
    lastUpdateModeSubScheduleId: (data.lastUpdateModeSubScheduleId !== null && typeof data.lastUpdateModeSubScheduleId !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeSubScheduleId)
      : undefined,
    lastUpdateTimeSubscheduleId: (data.lastUpdateTimeSubscheduleId !== null && typeof data.lastUpdateTimeSubscheduleId !== 'undefined')
      ? sTRING.decode(data.lastUpdateTimeSubscheduleId)
      : undefined,
    lastUpdateModeStatus: (data.lastUpdateModeStatus !== null && typeof data.lastUpdateModeStatus !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeStatus)
      : undefined,
    lastUpdateTimeStatus: (data.lastUpdateTimeStatus !== null && typeof data.lastUpdateTimeStatus !== 'undefined')
      ? sTRING.decode(data.lastUpdateTimeStatus)
      : undefined,
    executionTimeFirstTc: (data.executionTimeFirstTc !== null && typeof data.executionTimeFirstTc !== 'undefined')
      ? sTRING.decode(data.executionTimeFirstTc)
      : undefined,
    lastUpdateModeExecTimeFirstTc: (data.lastUpdateModeExecTimeFirstTc !== null && typeof data.lastUpdateModeExecTimeFirstTc !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeExecTimeFirstTc)
      : undefined,
    lastUpdateTimeExecTimeFirstTc: (data.lastUpdateTimeExecTimeFirstTc !== null && typeof data.lastUpdateTimeExecTimeFirstTc !== 'undefined')
      ? sTRING.decode(data.lastUpdateTimeExecTimeFirstTc)
      : undefined,
    serviceApidName: (data.serviceApidName !== null && typeof data.serviceApidName !== 'undefined')
      ? sTRING.decode(data.serviceApidName)
      : undefined,
    uniqueId: (data.uniqueId !== null && typeof data.uniqueId !== 'undefined')
      ? uLONG.decode(data.uniqueId)
      : undefined,
  }),
};
