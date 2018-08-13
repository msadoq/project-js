// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const sTRING = require('../ccsds_mal/sTRING');
const uINTEGER = require('../ccsds_mal/uINTEGER');
const uLONG = require('../ccsds_mal/uLONG');

module.exports = {
  encode: data => ({
    parameterId: (data.parameterId !== null && typeof data.parameterId !== 'undefined')
      ? uINTEGER.encode(data.parameterId)
      : null,
    serviceApid: (data.serviceApid !== null && typeof data.serviceApid !== 'undefined')
      ? uINTEGER.encode(data.serviceApid)
      : null,
    currentValue: (data.currentValue !== null && typeof data.currentValue !== 'undefined')
      ? sTRING.encode(data.currentValue)
      : null,
    lastUpdateModeCurrentValue: (data.lastUpdateModeCurrentValue !== null && typeof data.lastUpdateModeCurrentValue !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeCurrentValue)
      : null,
    lastUpdateTimeCurrentValue: (data.lastUpdateTimeCurrentValue !== null && typeof data.lastUpdateTimeCurrentValue !== 'undefined')
      ? sTRING.encode(data.lastUpdateTimeCurrentValue)
      : null,
    lastUpdateModeParamId: (data.lastUpdateModeParamId !== null && typeof data.lastUpdateModeParamId !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeParamId)
      : null,
    lastUpdateTimeParamId: (data.lastUpdateTimeParamId !== null && typeof data.lastUpdateTimeParamId !== 'undefined')
      ? sTRING.encode(data.lastUpdateTimeParamId)
      : null,
    serviceApidName: (data.serviceApidName !== null && typeof data.serviceApidName !== 'undefined')
      ? sTRING.encode(data.serviceApidName)
      : null,
    uniqueId: (data.uniqueId !== null && typeof data.uniqueId !== 'undefined')
      ? uLONG.encode(data.uniqueId)
      : null,
    parameterName: (data.parameterName !== null && typeof data.parameterName !== 'undefined')
      ? sTRING.encode(data.parameterName)
      : null,
    initialValue: (data.initialValue !== null && typeof data.initialValue !== 'undefined')
      ? sTRING.encode(data.initialValue)
      : null,
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? uINTEGER.encode(data.status)
      : null,
    parameterApid: (data.parameterApid !== null && typeof data.parameterApid !== 'undefined')
      ? uINTEGER.encode(data.parameterApid)
      : null,
    parameterApidName: (data.parameterApidName !== null && typeof data.parameterApidName !== 'undefined')
      ? sTRING.encode(data.parameterApidName)
      : null,
  }),
  decode: data => ({
    parameterId: (data.parameterId !== null && typeof data.parameterId !== 'undefined')
      ? uINTEGER.decode(data.parameterId)
      : undefined,
    serviceApid: (data.serviceApid !== null && typeof data.serviceApid !== 'undefined')
      ? uINTEGER.decode(data.serviceApid)
      : undefined,
    currentValue: (data.currentValue !== null && typeof data.currentValue !== 'undefined')
      ? sTRING.decode(data.currentValue)
      : undefined,
    lastUpdateModeCurrentValue: (data.lastUpdateModeCurrentValue !== null && typeof data.lastUpdateModeCurrentValue !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeCurrentValue)
      : undefined,
    lastUpdateTimeCurrentValue: (data.lastUpdateTimeCurrentValue !== null && typeof data.lastUpdateTimeCurrentValue !== 'undefined')
      ? sTRING.decode(data.lastUpdateTimeCurrentValue)
      : undefined,
    lastUpdateModeParamId: (data.lastUpdateModeParamId !== null && typeof data.lastUpdateModeParamId !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeParamId)
      : undefined,
    lastUpdateTimeParamId: (data.lastUpdateTimeParamId !== null && typeof data.lastUpdateTimeParamId !== 'undefined')
      ? sTRING.decode(data.lastUpdateTimeParamId)
      : undefined,
    serviceApidName: (data.serviceApidName !== null && typeof data.serviceApidName !== 'undefined')
      ? sTRING.decode(data.serviceApidName)
      : undefined,
    uniqueId: (data.uniqueId !== null && typeof data.uniqueId !== 'undefined')
      ? uLONG.decode(data.uniqueId)
      : undefined,
    parameterName: (data.parameterName !== null && typeof data.parameterName !== 'undefined')
      ? sTRING.decode(data.parameterName)
      : undefined,
    initialValue: (data.initialValue !== null && typeof data.initialValue !== 'undefined')
      ? sTRING.decode(data.initialValue)
      : undefined,
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? uINTEGER.decode(data.status)
      : undefined,
    parameterApid: (data.parameterApid !== null && typeof data.parameterApid !== 'undefined')
      ? uINTEGER.decode(data.parameterApid)
      : undefined,
    parameterApidName: (data.parameterApidName !== null && typeof data.parameterApidName !== 'undefined')
      ? sTRING.decode(data.parameterApidName)
      : undefined,
  }),
};
