// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const aTTRIBUTE = require('../ccsds_mal/aTTRIBUTE');
const pus012MonitoringCheckProperties = require('./pus012MonitoringCheckProperties');
const pusElement = require('./pusElement');
const sTRING = require('../ccsds_mal/sTRING');
const uINTEGER = require('../ccsds_mal/uINTEGER');

module.exports = {
  encode: data => ({
    monitoringId: (data.monitoringId !== null && typeof data.monitoringId !== 'undefined')
      ? uINTEGER.encode(data.monitoringId)
      : null,
    parameterId: (data.parameterId !== null && typeof data.parameterId !== 'undefined')
      ? uINTEGER.encode(data.parameterId)
      : null,
    validityParameterId: (data.validityParameterId !== null && typeof data.validityParameterId !== 'undefined')
      ? uINTEGER.encode(data.validityParameterId)
      : null,
    validityParameterMask: (data.validityParameterMask !== null && typeof data.validityParameterMask !== 'undefined')
      ? sTRING.encode(data.validityParameterMask)
      : null,
    parameterCurrentValue: (data.parameterCurrentValue !== null && typeof data.parameterCurrentValue !== 'undefined')
      ? aTTRIBUTE.encode(data.parameterCurrentValue)
      : null,
    validityParameterExpectedValue: (data.validityParameterExpectedValue !== null && typeof data.validityParameterExpectedValue !== 'undefined')
      ? aTTRIBUTE.encode(data.validityParameterExpectedValue)
      : null,
    monitoringInterval: (data.monitoringInterval !== null && typeof data.monitoringInterval !== 'undefined')
      ? uINTEGER.encode(data.monitoringInterval)
      : null,
    repetitionNumber: (data.repetitionNumber !== null && typeof data.repetitionNumber !== 'undefined')
      ? uINTEGER.encode(data.repetitionNumber)
      : null,
    checkType: (data.checkType !== null && typeof data.checkType !== 'undefined')
      ? uINTEGER.encode(data.checkType)
      : null,
    monitoringStatus: (data.monitoringStatus !== null && typeof data.monitoringStatus !== 'undefined')
      ? uINTEGER.encode(data.monitoringStatus)
      : null,
    pus012MonitoringCheckPropertiesLow: (data.pus012MonitoringCheckPropertiesLow !== null && typeof data.pus012MonitoringCheckPropertiesLow !== 'undefined')
      ? pus012MonitoringCheckProperties.encode(data.pus012MonitoringCheckPropertiesLow)
      : null,
    pus012MonitoringCheckPropertiesHigh: (data.pus012MonitoringCheckPropertiesHigh !== null && typeof data.pus012MonitoringCheckPropertiesHigh !== 'undefined')
      ? pus012MonitoringCheckProperties.encode(data.pus012MonitoringCheckPropertiesHigh)
      : null,
    pus012MonitoringCheckPropertiesExpected: (data.pus012MonitoringCheckPropertiesExpected !== null && typeof data.pus012MonitoringCheckPropertiesExpected !== 'undefined')
      ? pus012MonitoringCheckProperties.encode(data.pus012MonitoringCheckPropertiesExpected)
      : null,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.encode(data.pusElement)
      : null,
    monitoringIdLabel: (data.monitoringIdLabel !== null && typeof data.monitoringIdLabel !== 'undefined')
      ? sTRING.encode(data.monitoringIdLabel)
      : null,
  }),
  decode: data => ({
    monitoringId: (data.monitoringId !== null && typeof data.monitoringId !== 'undefined')
      ? uINTEGER.decode(data.monitoringId)
      : undefined,
    parameterId: (data.parameterId !== null && typeof data.parameterId !== 'undefined')
      ? uINTEGER.decode(data.parameterId)
      : undefined,
    validityParameterId: (data.validityParameterId !== null && typeof data.validityParameterId !== 'undefined')
      ? uINTEGER.decode(data.validityParameterId)
      : undefined,
    validityParameterMask: (data.validityParameterMask !== null && typeof data.validityParameterMask !== 'undefined')
      ? sTRING.decode(data.validityParameterMask)
      : undefined,
    parameterCurrentValue: (data.parameterCurrentValue !== null && typeof data.parameterCurrentValue !== 'undefined')
      ? aTTRIBUTE.decode(data.parameterCurrentValue)
      : undefined,
    validityParameterExpectedValue: (data.validityParameterExpectedValue !== null && typeof data.validityParameterExpectedValue !== 'undefined')
      ? aTTRIBUTE.decode(data.validityParameterExpectedValue)
      : undefined,
    monitoringInterval: (data.monitoringInterval !== null && typeof data.monitoringInterval !== 'undefined')
      ? uINTEGER.decode(data.monitoringInterval)
      : undefined,
    repetitionNumber: (data.repetitionNumber !== null && typeof data.repetitionNumber !== 'undefined')
      ? uINTEGER.decode(data.repetitionNumber)
      : undefined,
    checkType: (data.checkType !== null && typeof data.checkType !== 'undefined')
      ? uINTEGER.decode(data.checkType)
      : undefined,
    monitoringStatus: (data.monitoringStatus !== null && typeof data.monitoringStatus !== 'undefined')
      ? uINTEGER.decode(data.monitoringStatus)
      : undefined,
    pus012MonitoringCheckPropertiesLow: (data.pus012MonitoringCheckPropertiesLow !== null && typeof data.pus012MonitoringCheckPropertiesLow !== 'undefined')
      ? pus012MonitoringCheckProperties.decode(data.pus012MonitoringCheckPropertiesLow)
      : undefined,
    pus012MonitoringCheckPropertiesHigh: (data.pus012MonitoringCheckPropertiesHigh !== null && typeof data.pus012MonitoringCheckPropertiesHigh !== 'undefined')
      ? pus012MonitoringCheckProperties.decode(data.pus012MonitoringCheckPropertiesHigh)
      : undefined,
    pus012MonitoringCheckPropertiesExpected: (data.pus012MonitoringCheckPropertiesExpected !== null && typeof data.pus012MonitoringCheckPropertiesExpected !== 'undefined')
      ? pus012MonitoringCheckProperties.decode(data.pus012MonitoringCheckPropertiesExpected)
      : undefined,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.decode(data.pusElement)
      : undefined,
    monitoringIdLabel: (data.monitoringIdLabel !== null && typeof data.monitoringIdLabel !== 'undefined')
      ? sTRING.decode(data.monitoringIdLabel)
      : undefined,
  }),
};
