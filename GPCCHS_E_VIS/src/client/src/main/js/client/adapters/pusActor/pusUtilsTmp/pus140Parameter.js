const uINTEGER = require('../ccsds_mal/uINTEGER');
const sTRING = require('../ccsds_mal/sTRING');
const uLONG = require('../ccsds_mal/uLONG');


module.exports = {
  encode: data => ({
    parameterId: (data.parameterId !== null && typeof data.parameterId !== 'undefined')
      ? uINTEGER.encode(data.parameterId)
      : null,
    apid: (data.apid !== null && typeof data.apid !== 'undefined')
      ? uINTEGER.encode(data.apid)
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
    serviceStatus: (data.serviceStatus !== null && typeof data.serviceStatus !== 'undefined')
      ? uINTEGER.encode(data.serviceStatus)
      : null,
    serviceApidName: (data.serviceApidName !== null && typeof data.serviceApidName !== 'undefined')
      ? sTRING.encode(data.serviceApidName)
      : null,
    uniqueId: (data.uniqueId !== null && typeof data.uniqueId !== 'undefined')
      ? uLONG.encode(data.uniqueId)
      : null,
    apidName: (data.apidName !== null && typeof data.apidName !== 'undefined')
      ? sTRING.encode(data.apidName)
      : null,
    parameterName: (data.parameterName !== null && typeof data.parameterName !== 'undefined')
      ? sTRING.encode(data.parameterName)
      : null,
    initialValue: (data.initialValue !== null && typeof data.initialValue !== 'undefined')
      ? sTRING.encode(data.initialValue)
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
    serviceStatus: (data.serviceStatus !== null && typeof data.serviceStatus !== 'undefined')
      ? uINTEGER.decode(data.serviceStatus)
      : undefined,
    serviceApidName: (data.serviceApidName !== null && typeof data.serviceApidName !== 'undefined')
      ? sTRING.decode(data.serviceApidName)
      : undefined,
    uniqueId: (data.uniqueId !== null && typeof data.uniqueId !== 'undefined')
      ? uLONG.decode(data.uniqueId)
      : undefined,
    apidName: (data.apidName !== null && typeof data.apidName !== 'undefined')
      ? sTRING.decode(data.apidName)
      : undefined,
    parameterName: (data.parameterName !== null && typeof data.parameterName !== 'undefined')
      ? sTRING.decode(data.parameterName)
      : undefined,
    initialValue: (data.initialValue !== null && typeof data.initialValue !== 'undefined')
      ? sTRING.decode(data.initialValue)
      : undefined,
  }),
};
