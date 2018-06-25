// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const aTTRIBUTE = require('../ccsds_mal/aTTRIBUTE');
const pusElement = require('./pusElement');
const tIME = require('../ccsds_mal/tIME');
const uINTEGER = require('../ccsds_mal/uINTEGER');
const uOCTET = require('../ccsds_mal/uOCTET');

module.exports = {
  encode: data => ({
    parameterId: (data.parameterId !== null && typeof data.parameterId !== 'undefined')
      ? uINTEGER.encode(data.parameterId)
      : null,
    apid: (data.apid !== null && typeof data.apid !== 'undefined')
      ? uINTEGER.encode(data.apid)
      : null,
    currentValue: (data.currentValue !== null && typeof data.currentValue !== 'undefined')
      ? aTTRIBUTE.encode(data.currentValue)
      : null,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.encode(data.pusElement)
      : null,
    lastUpdateModeCurrentValue: (data.lastUpdateModeCurrentValue !== null && typeof data.lastUpdateModeCurrentValue !== 'undefined')
      ? uOCTET.encode(data.lastUpdateModeCurrentValue)
      : null,
    lastUpdateTimeCurrentValue: (data.lastUpdateTimeCurrentValue !== null && typeof data.lastUpdateTimeCurrentValue !== 'undefined')
      ? tIME.encode(data.lastUpdateTimeCurrentValue)
      : null,
    lastUpdateModeParamId: (data.lastUpdateModeParamId !== null && typeof data.lastUpdateModeParamId !== 'undefined')
      ? uOCTET.encode(data.lastUpdateModeParamId)
      : null,
    lastUpdateTimeParamId: (data.lastUpdateTimeParamId !== null && typeof data.lastUpdateTimeParamId !== 'undefined')
      ? tIME.encode(data.lastUpdateTimeParamId)
      : null,
  }),
  decode: data => ({
    parameterId: (data.parameterId !== null && typeof data.parameterId !== 'undefined')
      ? uINTEGER.decode(data.parameterId)
      : undefined,
    apid: (data.apid !== null && typeof data.apid !== 'undefined')
      ? uINTEGER.decode(data.apid)
      : undefined,
    currentValue: (data.currentValue !== null && typeof data.currentValue !== 'undefined')
      ? aTTRIBUTE.decode(data.currentValue)
      : undefined,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.decode(data.pusElement)
      : undefined,
    lastUpdateModeCurrentValue: (data.lastUpdateModeCurrentValue !== null && typeof data.lastUpdateModeCurrentValue !== 'undefined')
      ? uOCTET.decode(data.lastUpdateModeCurrentValue)
      : undefined,
    lastUpdateTimeCurrentValue: (data.lastUpdateTimeCurrentValue !== null && typeof data.lastUpdateTimeCurrentValue !== 'undefined')
      ? tIME.decode(data.lastUpdateTimeCurrentValue)
      : undefined,
    lastUpdateModeParamId: (data.lastUpdateModeParamId !== null && typeof data.lastUpdateModeParamId !== 'undefined')
      ? uOCTET.decode(data.lastUpdateModeParamId)
      : undefined,
    lastUpdateTimeParamId: (data.lastUpdateTimeParamId !== null && typeof data.lastUpdateTimeParamId !== 'undefined')
      ? tIME.decode(data.lastUpdateTimeParamId)
      : undefined,
  }),
};
