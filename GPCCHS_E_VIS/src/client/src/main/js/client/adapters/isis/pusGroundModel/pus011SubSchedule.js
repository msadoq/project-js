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
    ssId: (data.ssId !== null && typeof data.ssId !== 'undefined')
      ? uINTEGER.encode(data.ssId)
      : null,
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? uOCTET.encode(data.status)
      : null,
    executionTimeFirstTc: (data.executionTimeFirstTc !== null && typeof data.executionTimeFirstTc !== 'undefined')
      ? tIME.encode(data.executionTimeFirstTc)
      : null,
    apid: (data.apid !== null && typeof data.apid !== 'undefined')
      ? uINTEGER.encode(data.apid)
      : null,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.encode(data.pusElement)
      : null,
    groundDate: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
      ? tIME.encode(data.groundDate)
      : null,
    ssIdLabel: (data.ssIdLabel !== null && typeof data.ssIdLabel !== 'undefined')
      ? sTRING.encode(data.ssIdLabel)
      : null,
    lastUpdateModeStatus: (data.lastUpdateModeStatus !== null && typeof data.lastUpdateModeStatus !== 'undefined')
      ? uOCTET.encode(data.lastUpdateModeStatus)
      : null,
    lastUpdateTimeStatus: (data.lastUpdateTimeStatus !== null && typeof data.lastUpdateTimeStatus !== 'undefined')
      ? tIME.encode(data.lastUpdateTimeStatus)
      : null,
    lastUpdateModeExecTimeFirstTc: (data.lastUpdateModeExecTimeFirstTc !== null && typeof data.lastUpdateModeExecTimeFirstTc !== 'undefined')
      ? uOCTET.encode(data.lastUpdateModeExecTimeFirstTc)
      : null,
    lastUpdateTimeExecTimeFirstTc: (data.lastUpdateTimeExecTimeFirstTc !== null && typeof data.lastUpdateTimeExecTimeFirstTc !== 'undefined')
      ? tIME.encode(data.lastUpdateTimeExecTimeFirstTc)
      : null,
    lastUpdateModeSsId: (data.lastUpdateModeSsId !== null && typeof data.lastUpdateModeSsId !== 'undefined')
      ? uOCTET.encode(data.lastUpdateModeSsId)
      : null,
    lastUpdateTimeSsId: (data.lastUpdateTimeSsId !== null && typeof data.lastUpdateTimeSsId !== 'undefined')
      ? tIME.encode(data.lastUpdateTimeSsId)
      : null,
  }),
  decode: data => ({
    ssId: (data.ssId !== null && typeof data.ssId !== 'undefined')
      ? uINTEGER.decode(data.ssId)
      : undefined,
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? uOCTET.decode(data.status)
      : undefined,
    executionTimeFirstTc: (data.executionTimeFirstTc !== null && typeof data.executionTimeFirstTc !== 'undefined')
      ? tIME.decode(data.executionTimeFirstTc)
      : undefined,
    apid: (data.apid !== null && typeof data.apid !== 'undefined')
      ? uINTEGER.decode(data.apid)
      : undefined,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.decode(data.pusElement)
      : undefined,
    groundDate: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
      ? tIME.decode(data.groundDate)
      : undefined,
    ssIdLabel: (data.ssIdLabel !== null && typeof data.ssIdLabel !== 'undefined')
      ? sTRING.decode(data.ssIdLabel)
      : undefined,
    lastUpdateModeStatus: (data.lastUpdateModeStatus !== null && typeof data.lastUpdateModeStatus !== 'undefined')
      ? uOCTET.decode(data.lastUpdateModeStatus)
      : undefined,
    lastUpdateTimeStatus: (data.lastUpdateTimeStatus !== null && typeof data.lastUpdateTimeStatus !== 'undefined')
      ? tIME.decode(data.lastUpdateTimeStatus)
      : undefined,
    lastUpdateModeExecTimeFirstTc: (data.lastUpdateModeExecTimeFirstTc !== null && typeof data.lastUpdateModeExecTimeFirstTc !== 'undefined')
      ? uOCTET.decode(data.lastUpdateModeExecTimeFirstTc)
      : undefined,
    lastUpdateTimeExecTimeFirstTc: (data.lastUpdateTimeExecTimeFirstTc !== null && typeof data.lastUpdateTimeExecTimeFirstTc !== 'undefined')
      ? tIME.decode(data.lastUpdateTimeExecTimeFirstTc)
      : undefined,
    lastUpdateModeSsId: (data.lastUpdateModeSsId !== null && typeof data.lastUpdateModeSsId !== 'undefined')
      ? uOCTET.decode(data.lastUpdateModeSsId)
      : undefined,
    lastUpdateTimeSsId: (data.lastUpdateTimeSsId !== null && typeof data.lastUpdateTimeSsId !== 'undefined')
      ? tIME.decode(data.lastUpdateTimeSsId)
      : undefined,
    referenceTimestamp: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
        ? { type: 'time', value: data.groundDate.value.toNumber() }
        : undefined,
  }),
};
