// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const bOOLEAN = require('../ccsds_mal/bOOLEAN');
const pus012MonitoringCheckProperties = require('./pus012MonitoringCheckProperties');
const pusElement = require('./pusElement');
const sTRING = require('../ccsds_mal/sTRING');
const tIME = require('../ccsds_mal/tIME');
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
      ? sTRING.encode(data.parameterCurrentValue)
      : null,
    validityParameterExpectedValue: (data.validityParameterExpectedValue !== null && typeof data.validityParameterExpectedValue !== 'undefined')
      ? sTRING.encode(data.validityParameterExpectedValue)
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
    protectionStatus: (data.protectionStatus !== null && typeof data.protectionStatus !== 'undefined')
      ? sTRING.encode(data.protectionStatus)
      : null,
    isMonitoringIntervalSet: (data.isMonitoringIntervalSet !== null && typeof data.isMonitoringIntervalSet !== 'undefined')
      ? bOOLEAN.encode(data.isMonitoringIntervalSet)
      : null,
    isRepetitionNumberSet: (data.isRepetitionNumberSet !== null && typeof data.isRepetitionNumberSet !== 'undefined')
      ? bOOLEAN.encode(data.isRepetitionNumberSet)
      : null,
    lastUpdateModeMonId: (data.lastUpdateModeMonId !== null && typeof data.lastUpdateModeMonId !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeMonId)
      : null,
    lastUpdateTimeMonId: (data.lastUpdateTimeMonId !== null && typeof data.lastUpdateTimeMonId !== 'undefined')
      ? tIME.encode(data.lastUpdateTimeMonId)
      : null,
    lastUpdateModeParamId: (data.lastUpdateModeParamId !== null && typeof data.lastUpdateModeParamId !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeParamId)
      : null,
    lastUpdateTimeParamId: (data.lastUpdateTimeParamId !== null && typeof data.lastUpdateTimeParamId !== 'undefined')
      ? tIME.encode(data.lastUpdateTimeParamId)
      : null,
    lastUpdateModeValParamId: (data.lastUpdateModeValParamId !== null && typeof data.lastUpdateModeValParamId !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeValParamId)
      : null,
    lastUpdateTimeValParamId: (data.lastUpdateTimeValParamId !== null && typeof data.lastUpdateTimeValParamId !== 'undefined')
      ? tIME.encode(data.lastUpdateTimeValParamId)
      : null,
    lastUpdateModeParamCurrentValue: (data.lastUpdateModeParamCurrentValue !== null && typeof data.lastUpdateModeParamCurrentValue !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeParamCurrentValue)
      : null,
    lastUpdateTimeParamCurrentValue: (data.lastUpdateTimeParamCurrentValue !== null && typeof data.lastUpdateTimeParamCurrentValue !== 'undefined')
      ? tIME.encode(data.lastUpdateTimeParamCurrentValue)
      : null,
    lastUpdateModeValParamExpectValue: (data.lastUpdateModeValParamExpectValue !== null && typeof data.lastUpdateModeValParamExpectValue !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeValParamExpectValue)
      : null,
    lastUpdateTimeValParamExpectValue: (data.lastUpdateTimeValParamExpectValue !== null && typeof data.lastUpdateTimeValParamExpectValue !== 'undefined')
      ? tIME.encode(data.lastUpdateTimeValParamExpectValue)
      : null,
    lastUpdateModeValParamMask: (data.lastUpdateModeValParamMask !== null && typeof data.lastUpdateModeValParamMask !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeValParamMask)
      : null,
    lastUpdateTimeValParamMask: (data.lastUpdateTimeValParamMask !== null && typeof data.lastUpdateTimeValParamMask !== 'undefined')
      ? tIME.encode(data.lastUpdateTimeValParamMask)
      : null,
    lastUpdateModeMonInterval: (data.lastUpdateModeMonInterval !== null && typeof data.lastUpdateModeMonInterval !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeMonInterval)
      : null,
    lastUpdateTimeMonInterval: (data.lastUpdateTimeMonInterval !== null && typeof data.lastUpdateTimeMonInterval !== 'undefined')
      ? tIME.encode(data.lastUpdateTimeMonInterval)
      : null,
    lastUpdateModeRepetition: (data.lastUpdateModeRepetition !== null && typeof data.lastUpdateModeRepetition !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeRepetition)
      : null,
    lastUpdateTimeRepetition: (data.lastUpdateTimeRepetition !== null && typeof data.lastUpdateTimeRepetition !== 'undefined')
      ? tIME.encode(data.lastUpdateTimeRepetition)
      : null,
    lastUpdateModeCheckType: (data.lastUpdateModeCheckType !== null && typeof data.lastUpdateModeCheckType !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeCheckType)
      : null,
    lastUpdateTimeCheckTime: (data.lastUpdateTimeCheckTime !== null && typeof data.lastUpdateTimeCheckTime !== 'undefined')
      ? tIME.encode(data.lastUpdateTimeCheckTime)
      : null,
    lastUpdateModeMonStatus: (data.lastUpdateModeMonStatus !== null && typeof data.lastUpdateModeMonStatus !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeMonStatus)
      : null,
    lastUpdateTimeMonStatus: (data.lastUpdateTimeMonStatus !== null && typeof data.lastUpdateTimeMonStatus !== 'undefined')
      ? tIME.encode(data.lastUpdateTimeMonStatus)
      : null,
    lastUpdateModeProtectionStatus: (data.lastUpdateModeProtectionStatus !== null && typeof data.lastUpdateModeProtectionStatus !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeProtectionStatus)
      : null,
    lastUpdateTimeProtectionStatus: (data.lastUpdateTimeProtectionStatus !== null && typeof data.lastUpdateTimeProtectionStatus !== 'undefined')
      ? tIME.encode(data.lastUpdateTimeProtectionStatus)
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
      ? sTRING.decode(data.parameterCurrentValue)
      : undefined,
    validityParameterExpectedValue: (data.validityParameterExpectedValue !== null && typeof data.validityParameterExpectedValue !== 'undefined')
      ? sTRING.decode(data.validityParameterExpectedValue)
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
    protectionStatus: (data.protectionStatus !== null && typeof data.protectionStatus !== 'undefined')
      ? sTRING.decode(data.protectionStatus)
      : undefined,
    isMonitoringIntervalSet: (data.isMonitoringIntervalSet !== null && typeof data.isMonitoringIntervalSet !== 'undefined')
      ? bOOLEAN.decode(data.isMonitoringIntervalSet)
      : undefined,
    isRepetitionNumberSet: (data.isRepetitionNumberSet !== null && typeof data.isRepetitionNumberSet !== 'undefined')
      ? bOOLEAN.decode(data.isRepetitionNumberSet)
      : undefined,
    lastUpdateModeMonId: (data.lastUpdateModeMonId !== null && typeof data.lastUpdateModeMonId !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeMonId)
      : undefined,
    lastUpdateTimeMonId: (data.lastUpdateTimeMonId !== null && typeof data.lastUpdateTimeMonId !== 'undefined')
      ? tIME.decode(data.lastUpdateTimeMonId)
      : undefined,
    lastUpdateModeParamId: (data.lastUpdateModeParamId !== null && typeof data.lastUpdateModeParamId !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeParamId)
      : undefined,
    lastUpdateTimeParamId: (data.lastUpdateTimeParamId !== null && typeof data.lastUpdateTimeParamId !== 'undefined')
      ? tIME.decode(data.lastUpdateTimeParamId)
      : undefined,
    lastUpdateModeValParamId: (data.lastUpdateModeValParamId !== null && typeof data.lastUpdateModeValParamId !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeValParamId)
      : undefined,
    lastUpdateTimeValParamId: (data.lastUpdateTimeValParamId !== null && typeof data.lastUpdateTimeValParamId !== 'undefined')
      ? tIME.decode(data.lastUpdateTimeValParamId)
      : undefined,
    lastUpdateModeParamCurrentValue: (data.lastUpdateModeParamCurrentValue !== null && typeof data.lastUpdateModeParamCurrentValue !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeParamCurrentValue)
      : undefined,
    lastUpdateTimeParamCurrentValue: (data.lastUpdateTimeParamCurrentValue !== null && typeof data.lastUpdateTimeParamCurrentValue !== 'undefined')
      ? tIME.decode(data.lastUpdateTimeParamCurrentValue)
      : undefined,
    lastUpdateModeValParamExpectValue: (data.lastUpdateModeValParamExpectValue !== null && typeof data.lastUpdateModeValParamExpectValue !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeValParamExpectValue)
      : undefined,
    lastUpdateTimeValParamExpectValue: (data.lastUpdateTimeValParamExpectValue !== null && typeof data.lastUpdateTimeValParamExpectValue !== 'undefined')
      ? tIME.decode(data.lastUpdateTimeValParamExpectValue)
      : undefined,
    lastUpdateModeValParamMask: (data.lastUpdateModeValParamMask !== null && typeof data.lastUpdateModeValParamMask !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeValParamMask)
      : undefined,
    lastUpdateTimeValParamMask: (data.lastUpdateTimeValParamMask !== null && typeof data.lastUpdateTimeValParamMask !== 'undefined')
      ? tIME.decode(data.lastUpdateTimeValParamMask)
      : undefined,
    lastUpdateModeMonInterval: (data.lastUpdateModeMonInterval !== null && typeof data.lastUpdateModeMonInterval !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeMonInterval)
      : undefined,
    lastUpdateTimeMonInterval: (data.lastUpdateTimeMonInterval !== null && typeof data.lastUpdateTimeMonInterval !== 'undefined')
      ? tIME.decode(data.lastUpdateTimeMonInterval)
      : undefined,
    lastUpdateModeRepetition: (data.lastUpdateModeRepetition !== null && typeof data.lastUpdateModeRepetition !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeRepetition)
      : undefined,
    lastUpdateTimeRepetition: (data.lastUpdateTimeRepetition !== null && typeof data.lastUpdateTimeRepetition !== 'undefined')
      ? tIME.decode(data.lastUpdateTimeRepetition)
      : undefined,
    lastUpdateModeCheckType: (data.lastUpdateModeCheckType !== null && typeof data.lastUpdateModeCheckType !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeCheckType)
      : undefined,
    lastUpdateTimeCheckTime: (data.lastUpdateTimeCheckTime !== null && typeof data.lastUpdateTimeCheckTime !== 'undefined')
      ? tIME.decode(data.lastUpdateTimeCheckTime)
      : undefined,
    lastUpdateModeMonStatus: (data.lastUpdateModeMonStatus !== null && typeof data.lastUpdateModeMonStatus !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeMonStatus)
      : undefined,
    lastUpdateTimeMonStatus: (data.lastUpdateTimeMonStatus !== null && typeof data.lastUpdateTimeMonStatus !== 'undefined')
      ? tIME.decode(data.lastUpdateTimeMonStatus)
      : undefined,
    lastUpdateModeProtectionStatus: (data.lastUpdateModeProtectionStatus !== null && typeof data.lastUpdateModeProtectionStatus !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeProtectionStatus)
      : undefined,
    lastUpdateTimeProtectionStatus: (data.lastUpdateTimeProtectionStatus !== null && typeof data.lastUpdateTimeProtectionStatus !== 'undefined')
      ? tIME.decode(data.lastUpdateTimeProtectionStatus)
      : undefined,
  }),
};
