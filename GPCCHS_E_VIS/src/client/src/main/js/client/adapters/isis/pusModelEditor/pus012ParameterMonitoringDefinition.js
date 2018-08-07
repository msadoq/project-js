// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const bOOLEAN = require('../ccsds_mal/bOOLEAN');
const pus012MonitoringCheckProperties = require('./pus012MonitoringCheckProperties');
const sTRING = require('../ccsds_mal/sTRING');
const uINTEGER = require('../ccsds_mal/uINTEGER');
const uLONG = require('../ccsds_mal/uLONG');

module.exports = {
  encode: data => ({
    monitoringId: (data.monitoringId !== null && typeof data.monitoringId !== 'undefined')
      ? uINTEGER.encode(data.monitoringId)
      : null,
    monitoringIdLabel: (data.monitoringIdLabel !== null && typeof data.monitoringIdLabel !== 'undefined')
      ? sTRING.encode(data.monitoringIdLabel)
      : null,
    monitoringName: (data.monitoringName !== null && typeof data.monitoringName !== 'undefined')
      ? sTRING.encode(data.monitoringName)
      : null,
    parameterId: (data.parameterId !== null && typeof data.parameterId !== 'undefined')
      ? uINTEGER.encode(data.parameterId)
      : null,
    parameterName: (data.parameterName !== null && typeof data.parameterName !== 'undefined')
      ? uINTEGER.encode(data.parameterName)
      : null,
    monitoringStatus: (data.monitoringStatus !== null && typeof data.monitoringStatus !== 'undefined')
      ? uINTEGER.encode(data.monitoringStatus)
      : null,
    protectionStatus: (data.protectionStatus !== null && typeof data.protectionStatus !== 'undefined')
      ? sTRING.encode(data.protectionStatus)
      : null,
    monitoringInterval: (data.monitoringInterval !== null && typeof data.monitoringInterval !== 'undefined')
      ? uINTEGER.encode(data.monitoringInterval)
      : null,
    repetitionNumber: (data.repetitionNumber !== null && typeof data.repetitionNumber !== 'undefined')
      ? uINTEGER.encode(data.repetitionNumber)
      : null,
    checkType: (data.checkType !== null && typeof data.checkType !== 'undefined')
      ? sTRING.encode(data.checkType)
      : null,
    validityParameterId: (data.validityParameterId !== null && typeof data.validityParameterId !== 'undefined')
      ? uINTEGER.encode(data.validityParameterId)
      : null,
    validityParameterName: (data.validityParameterName !== null && typeof data.validityParameterName !== 'undefined')
      ? sTRING.encode(data.validityParameterName)
      : null,
    validityParameterMask: (data.validityParameterMask !== null && typeof data.validityParameterMask !== 'undefined')
      ? sTRING.encode(data.validityParameterMask)
      : null,
    validityParameterExpectedValue: (data.validityParameterExpectedValue !== null && typeof data.validityParameterExpectedValue !== 'undefined')
      ? sTRING.encode(data.validityParameterExpectedValue)
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
      ? sTRING.encode(data.lastUpdateTimeMonId)
      : null,
    lastUpdateModeParamId: (data.lastUpdateModeParamId !== null && typeof data.lastUpdateModeParamId !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeParamId)
      : null,
    lastUpdateTimeParamId: (data.lastUpdateTimeParamId !== null && typeof data.lastUpdateTimeParamId !== 'undefined')
      ? sTRING.encode(data.lastUpdateTimeParamId)
      : null,
    lastUpdateModeValParamId: (data.lastUpdateModeValParamId !== null && typeof data.lastUpdateModeValParamId !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeValParamId)
      : null,
    lastUpdateTimeValParamId: (data.lastUpdateTimeValParamId !== null && typeof data.lastUpdateTimeValParamId !== 'undefined')
      ? sTRING.encode(data.lastUpdateTimeValParamId)
      : null,
    lastUpdateModeValParamExpectValue: (data.lastUpdateModeValParamExpectValue !== null && typeof data.lastUpdateModeValParamExpectValue !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeValParamExpectValue)
      : null,
    lastUpdateTimeValParamExpectValue: (data.lastUpdateTimeValParamExpectValue !== null && typeof data.lastUpdateTimeValParamExpectValue !== 'undefined')
      ? sTRING.encode(data.lastUpdateTimeValParamExpectValue)
      : null,
    lastUpdateModeValParamMask: (data.lastUpdateModeValParamMask !== null && typeof data.lastUpdateModeValParamMask !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeValParamMask)
      : null,
    lastUpdateTimeValParamMask: (data.lastUpdateTimeValParamMask !== null && typeof data.lastUpdateTimeValParamMask !== 'undefined')
      ? sTRING.encode(data.lastUpdateTimeValParamMask)
      : null,
    lastUpdateModeMonInterval: (data.lastUpdateModeMonInterval !== null && typeof data.lastUpdateModeMonInterval !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeMonInterval)
      : null,
    lastUpdateTimeMonInterval: (data.lastUpdateTimeMonInterval !== null && typeof data.lastUpdateTimeMonInterval !== 'undefined')
      ? sTRING.encode(data.lastUpdateTimeMonInterval)
      : null,
    lastUpdateModeRepetition: (data.lastUpdateModeRepetition !== null && typeof data.lastUpdateModeRepetition !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeRepetition)
      : null,
    lastUpdateTimeRepetition: (data.lastUpdateTimeRepetition !== null && typeof data.lastUpdateTimeRepetition !== 'undefined')
      ? sTRING.encode(data.lastUpdateTimeRepetition)
      : null,
    lastUpdateModeCheckType: (data.lastUpdateModeCheckType !== null && typeof data.lastUpdateModeCheckType !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeCheckType)
      : null,
    lastUpdateTimeCheckType: (data.lastUpdateTimeCheckType !== null && typeof data.lastUpdateTimeCheckType !== 'undefined')
      ? sTRING.encode(data.lastUpdateTimeCheckType)
      : null,
    lastUpdateModeMonStatus: (data.lastUpdateModeMonStatus !== null && typeof data.lastUpdateModeMonStatus !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeMonStatus)
      : null,
    lastUpdateTimeMonStatus: (data.lastUpdateTimeMonStatus !== null && typeof data.lastUpdateTimeMonStatus !== 'undefined')
      ? sTRING.encode(data.lastUpdateTimeMonStatus)
      : null,
    lastUpdateModeProtectionStatus: (data.lastUpdateModeProtectionStatus !== null && typeof data.lastUpdateModeProtectionStatus !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeProtectionStatus)
      : null,
    lastUpdateTimeProtectionStatus: (data.lastUpdateTimeProtectionStatus !== null && typeof data.lastUpdateTimeProtectionStatus !== 'undefined')
      ? sTRING.encode(data.lastUpdateTimeProtectionStatus)
      : null,
    serviceApid: (data.serviceApid !== null && typeof data.serviceApid !== 'undefined')
      ? uINTEGER.encode(data.serviceApid)
      : null,
    serviceApidName: (data.serviceApidName !== null && typeof data.serviceApidName !== 'undefined')
      ? sTRING.encode(data.serviceApidName)
      : null,
    uniqueId: (data.uniqueId !== null && typeof data.uniqueId !== 'undefined')
      ? uLONG.encode(data.uniqueId)
      : null,
  }),
  decode: data => ({
    monitoringId: (data.monitoringId !== null && typeof data.monitoringId !== 'undefined')
      ? uINTEGER.decode(data.monitoringId)
      : undefined,
    monitoringIdLabel: (data.monitoringIdLabel !== null && typeof data.monitoringIdLabel !== 'undefined')
      ? sTRING.decode(data.monitoringIdLabel)
      : undefined,
    monitoringName: (data.monitoringName !== null && typeof data.monitoringName !== 'undefined')
      ? sTRING.decode(data.monitoringName)
      : undefined,
    parameterId: (data.parameterId !== null && typeof data.parameterId !== 'undefined')
      ? uINTEGER.decode(data.parameterId)
      : undefined,
    parameterName: (data.parameterName !== null && typeof data.parameterName !== 'undefined')
      ? uINTEGER.decode(data.parameterName)
      : undefined,
    monitoringStatus: (data.monitoringStatus !== null && typeof data.monitoringStatus !== 'undefined')
      ? uINTEGER.decode(data.monitoringStatus)
      : undefined,
    protectionStatus: (data.protectionStatus !== null && typeof data.protectionStatus !== 'undefined')
      ? sTRING.decode(data.protectionStatus)
      : undefined,
    monitoringInterval: (data.monitoringInterval !== null && typeof data.monitoringInterval !== 'undefined')
      ? uINTEGER.decode(data.monitoringInterval)
      : undefined,
    repetitionNumber: (data.repetitionNumber !== null && typeof data.repetitionNumber !== 'undefined')
      ? uINTEGER.decode(data.repetitionNumber)
      : undefined,
    checkType: (data.checkType !== null && typeof data.checkType !== 'undefined')
      ? sTRING.decode(data.checkType)
      : undefined,
    validityParameterId: (data.validityParameterId !== null && typeof data.validityParameterId !== 'undefined')
      ? uINTEGER.decode(data.validityParameterId)
      : undefined,
    validityParameterName: (data.validityParameterName !== null && typeof data.validityParameterName !== 'undefined')
      ? sTRING.decode(data.validityParameterName)
      : undefined,
    validityParameterMask: (data.validityParameterMask !== null && typeof data.validityParameterMask !== 'undefined')
      ? sTRING.decode(data.validityParameterMask)
      : undefined,
    validityParameterExpectedValue: (data.validityParameterExpectedValue !== null && typeof data.validityParameterExpectedValue !== 'undefined')
      ? sTRING.decode(data.validityParameterExpectedValue)
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
      ? sTRING.decode(data.lastUpdateTimeMonId)
      : undefined,
    lastUpdateModeParamId: (data.lastUpdateModeParamId !== null && typeof data.lastUpdateModeParamId !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeParamId)
      : undefined,
    lastUpdateTimeParamId: (data.lastUpdateTimeParamId !== null && typeof data.lastUpdateTimeParamId !== 'undefined')
      ? sTRING.decode(data.lastUpdateTimeParamId)
      : undefined,
    lastUpdateModeValParamId: (data.lastUpdateModeValParamId !== null && typeof data.lastUpdateModeValParamId !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeValParamId)
      : undefined,
    lastUpdateTimeValParamId: (data.lastUpdateTimeValParamId !== null && typeof data.lastUpdateTimeValParamId !== 'undefined')
      ? sTRING.decode(data.lastUpdateTimeValParamId)
      : undefined,
    lastUpdateModeValParamExpectValue: (data.lastUpdateModeValParamExpectValue !== null && typeof data.lastUpdateModeValParamExpectValue !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeValParamExpectValue)
      : undefined,
    lastUpdateTimeValParamExpectValue: (data.lastUpdateTimeValParamExpectValue !== null && typeof data.lastUpdateTimeValParamExpectValue !== 'undefined')
      ? sTRING.decode(data.lastUpdateTimeValParamExpectValue)
      : undefined,
    lastUpdateModeValParamMask: (data.lastUpdateModeValParamMask !== null && typeof data.lastUpdateModeValParamMask !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeValParamMask)
      : undefined,
    lastUpdateTimeValParamMask: (data.lastUpdateTimeValParamMask !== null && typeof data.lastUpdateTimeValParamMask !== 'undefined')
      ? sTRING.decode(data.lastUpdateTimeValParamMask)
      : undefined,
    lastUpdateModeMonInterval: (data.lastUpdateModeMonInterval !== null && typeof data.lastUpdateModeMonInterval !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeMonInterval)
      : undefined,
    lastUpdateTimeMonInterval: (data.lastUpdateTimeMonInterval !== null && typeof data.lastUpdateTimeMonInterval !== 'undefined')
      ? sTRING.decode(data.lastUpdateTimeMonInterval)
      : undefined,
    lastUpdateModeRepetition: (data.lastUpdateModeRepetition !== null && typeof data.lastUpdateModeRepetition !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeRepetition)
      : undefined,
    lastUpdateTimeRepetition: (data.lastUpdateTimeRepetition !== null && typeof data.lastUpdateTimeRepetition !== 'undefined')
      ? sTRING.decode(data.lastUpdateTimeRepetition)
      : undefined,
    lastUpdateModeCheckType: (data.lastUpdateModeCheckType !== null && typeof data.lastUpdateModeCheckType !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeCheckType)
      : undefined,
    lastUpdateTimeCheckType: (data.lastUpdateTimeCheckType !== null && typeof data.lastUpdateTimeCheckType !== 'undefined')
      ? sTRING.decode(data.lastUpdateTimeCheckType)
      : undefined,
    lastUpdateModeMonStatus: (data.lastUpdateModeMonStatus !== null && typeof data.lastUpdateModeMonStatus !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeMonStatus)
      : undefined,
    lastUpdateTimeMonStatus: (data.lastUpdateTimeMonStatus !== null && typeof data.lastUpdateTimeMonStatus !== 'undefined')
      ? sTRING.decode(data.lastUpdateTimeMonStatus)
      : undefined,
    lastUpdateModeProtectionStatus: (data.lastUpdateModeProtectionStatus !== null && typeof data.lastUpdateModeProtectionStatus !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeProtectionStatus)
      : undefined,
    lastUpdateTimeProtectionStatus: (data.lastUpdateTimeProtectionStatus !== null && typeof data.lastUpdateTimeProtectionStatus !== 'undefined')
      ? sTRING.decode(data.lastUpdateTimeProtectionStatus)
      : undefined,
    serviceApid: (data.serviceApid !== null && typeof data.serviceApid !== 'undefined')
      ? uINTEGER.decode(data.serviceApid)
      : undefined,
    serviceApidName: (data.serviceApidName !== null && typeof data.serviceApidName !== 'undefined')
      ? sTRING.decode(data.serviceApidName)
      : undefined,
    uniqueId: (data.uniqueId !== null && typeof data.uniqueId !== 'undefined')
      ? uLONG.decode(data.uniqueId)
      : undefined,
  }),
};
