// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _map = require('lodash/map');
const pus142ParameterMonitoringDefinition = require('./pus142ParameterMonitoringDefinition');
const pusElement = require('./pusElement');
const sTRING = require('../ccsds_mal/sTRING');
const tIME = require('../ccsds_mal/tIME');
const uINTEGER = require('../ccsds_mal/uINTEGER');
const uOCTET = require('../ccsds_mal/uOCTET');

module.exports = {
  encode: data => ({
    fmonId: (data.fmonId !== null && typeof data.fmonId !== 'undefined')
      ? uINTEGER.encode(data.fmonId)
      : null,
    protectionStatus: (data.protectionStatus !== null && typeof data.protectionStatus !== 'undefined')
      ? sTRING.encode(data.protectionStatus)
      : null,
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? uOCTET.encode(data.status)
      : null,
    checkingStatus: (data.checkingStatus !== null && typeof data.checkingStatus !== 'undefined')
      ? sTRING.encode(data.checkingStatus)
      : null,
    rid: (data.rid !== null && typeof data.rid !== 'undefined')
      ? uINTEGER.encode(data.rid)
      : null,
    pus142ParameterMonitoringDefinition: _map(data.pus142ParameterMonitoringDefinition, d => (pus142ParameterMonitoringDefinition.encode(d))),
    validityParameterId: (data.validityParameterId !== null && typeof data.validityParameterId !== 'undefined')
      ? uINTEGER.encode(data.validityParameterId)
      : null,
    validityParameterMask: (data.validityParameterMask !== null && typeof data.validityParameterMask !== 'undefined')
      ? sTRING.encode(data.validityParameterMask)
      : null,
    validityParameterExpectedValue: (data.validityParameterExpectedValue !== null && typeof data.validityParameterExpectedValue !== 'undefined')
      ? sTRING.encode(data.validityParameterExpectedValue)
      : null,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.encode(data.pusElement)
      : null,
    ridLabel: (data.ridLabel !== null && typeof data.ridLabel !== 'undefined')
      ? sTRING.encode(data.ridLabel)
      : null,
    fmonIdLabel: (data.fmonIdLabel !== null && typeof data.fmonIdLabel !== 'undefined')
      ? sTRING.encode(data.fmonIdLabel)
      : null,
    lastUpdateModeFMonId: (data.lastUpdateModeFMonId !== null && typeof data.lastUpdateModeFMonId !== 'undefined')
      ? uOCTET.encode(data.lastUpdateModeFMonId)
      : null,
    lastUpdateTimeFMonId: (data.lastUpdateTimeFMonId !== null && typeof data.lastUpdateTimeFMonId !== 'undefined')
      ? tIME.encode(data.lastUpdateTimeFMonId)
      : null,
    lastUpdateModeProtectionStatus: (data.lastUpdateModeProtectionStatus !== null && typeof data.lastUpdateModeProtectionStatus !== 'undefined')
      ? uOCTET.encode(data.lastUpdateModeProtectionStatus)
      : null,
    lastUpdateTimeProtectionStatus: (data.lastUpdateTimeProtectionStatus !== null && typeof data.lastUpdateTimeProtectionStatus !== 'undefined')
      ? tIME.encode(data.lastUpdateTimeProtectionStatus)
      : null,
    lastUpdateModeCheckingStatus: (data.lastUpdateModeCheckingStatus !== null && typeof data.lastUpdateModeCheckingStatus !== 'undefined')
      ? uOCTET.encode(data.lastUpdateModeCheckingStatus)
      : null,
    lastUpdateTimeCheckingStatus: (data.lastUpdateTimeCheckingStatus !== null && typeof data.lastUpdateTimeCheckingStatus !== 'undefined')
      ? tIME.encode(data.lastUpdateTimeCheckingStatus)
      : null,
    lastUpdateModeStatus: (data.lastUpdateModeStatus !== null && typeof data.lastUpdateModeStatus !== 'undefined')
      ? uOCTET.encode(data.lastUpdateModeStatus)
      : null,
    lastUpdateTimeStatus: (data.lastUpdateTimeStatus !== null && typeof data.lastUpdateTimeStatus !== 'undefined')
      ? tIME.encode(data.lastUpdateTimeStatus)
      : null,
    lastUpdateModeRid: (data.lastUpdateModeRid !== null && typeof data.lastUpdateModeRid !== 'undefined')
      ? uOCTET.encode(data.lastUpdateModeRid)
      : null,
    lastUpdateTimeRid: (data.lastUpdateTimeRid !== null && typeof data.lastUpdateTimeRid !== 'undefined')
      ? tIME.encode(data.lastUpdateTimeRid)
      : null,
    lastUpdateModeValidParamId: (data.lastUpdateModeValidParamId !== null && typeof data.lastUpdateModeValidParamId !== 'undefined')
      ? uOCTET.encode(data.lastUpdateModeValidParamId)
      : null,
    lastUpdateTimeValidParamId: (data.lastUpdateTimeValidParamId !== null && typeof data.lastUpdateTimeValidParamId !== 'undefined')
      ? tIME.encode(data.lastUpdateTimeValidParamId)
      : null,
    lastUpdateModeValidParamMask: (data.lastUpdateModeValidParamMask !== null && typeof data.lastUpdateModeValidParamMask !== 'undefined')
      ? uOCTET.encode(data.lastUpdateModeValidParamMask)
      : null,
    lastUpdateTimeValidParamMask: (data.lastUpdateTimeValidParamMask !== null && typeof data.lastUpdateTimeValidParamMask !== 'undefined')
      ? tIME.encode(data.lastUpdateTimeValidParamMask)
      : null,
    lastUpdateModeValidParamExpectedValue: (data.lastUpdateModeValidParamExpectedValue !== null && typeof data.lastUpdateModeValidParamExpectedValue !== 'undefined')
      ? uOCTET.encode(data.lastUpdateModeValidParamExpectedValue)
      : null,
    lastUpdateTimeValidParamExpectedValue: (data.lastUpdateTimeValidParamExpectedValue !== null && typeof data.lastUpdateTimeValidParamExpectedValue !== 'undefined')
      ? tIME.encode(data.lastUpdateTimeValidParamExpectedValue)
      : null,
  }),
  decode: data => ({
    fmonId: (data.fmonId !== null && typeof data.fmonId !== 'undefined')
      ? uINTEGER.decode(data.fmonId)
      : undefined,
    protectionStatus: (data.protectionStatus !== null && typeof data.protectionStatus !== 'undefined')
      ? sTRING.decode(data.protectionStatus)
      : undefined,
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? uOCTET.decode(data.status)
      : undefined,
    checkingStatus: (data.checkingStatus !== null && typeof data.checkingStatus !== 'undefined')
      ? sTRING.decode(data.checkingStatus)
      : undefined,
    rid: (data.rid !== null && typeof data.rid !== 'undefined')
      ? uINTEGER.decode(data.rid)
      : undefined,
    pus142ParameterMonitoringDefinition: _map(data.pus142ParameterMonitoringDefinition, d => (pus142ParameterMonitoringDefinition.decode(d))),
    validityParameterId: (data.validityParameterId !== null && typeof data.validityParameterId !== 'undefined')
      ? uINTEGER.decode(data.validityParameterId)
      : undefined,
    validityParameterMask: (data.validityParameterMask !== null && typeof data.validityParameterMask !== 'undefined')
      ? sTRING.decode(data.validityParameterMask)
      : undefined,
    validityParameterExpectedValue: (data.validityParameterExpectedValue !== null && typeof data.validityParameterExpectedValue !== 'undefined')
      ? sTRING.decode(data.validityParameterExpectedValue)
      : undefined,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.decode(data.pusElement)
      : undefined,
    ridLabel: (data.ridLabel !== null && typeof data.ridLabel !== 'undefined')
      ? sTRING.decode(data.ridLabel)
      : undefined,
    fmonIdLabel: (data.fmonIdLabel !== null && typeof data.fmonIdLabel !== 'undefined')
      ? sTRING.decode(data.fmonIdLabel)
      : undefined,
    lastUpdateModeFMonId: (data.lastUpdateModeFMonId !== null && typeof data.lastUpdateModeFMonId !== 'undefined')
      ? uOCTET.decode(data.lastUpdateModeFMonId)
      : undefined,
    lastUpdateTimeFMonId: (data.lastUpdateTimeFMonId !== null && typeof data.lastUpdateTimeFMonId !== 'undefined')
      ? tIME.decode(data.lastUpdateTimeFMonId)
      : undefined,
    lastUpdateModeProtectionStatus: (data.lastUpdateModeProtectionStatus !== null && typeof data.lastUpdateModeProtectionStatus !== 'undefined')
      ? uOCTET.decode(data.lastUpdateModeProtectionStatus)
      : undefined,
    lastUpdateTimeProtectionStatus: (data.lastUpdateTimeProtectionStatus !== null && typeof data.lastUpdateTimeProtectionStatus !== 'undefined')
      ? tIME.decode(data.lastUpdateTimeProtectionStatus)
      : undefined,
    lastUpdateModeCheckingStatus: (data.lastUpdateModeCheckingStatus !== null && typeof data.lastUpdateModeCheckingStatus !== 'undefined')
      ? uOCTET.decode(data.lastUpdateModeCheckingStatus)
      : undefined,
    lastUpdateTimeCheckingStatus: (data.lastUpdateTimeCheckingStatus !== null && typeof data.lastUpdateTimeCheckingStatus !== 'undefined')
      ? tIME.decode(data.lastUpdateTimeCheckingStatus)
      : undefined,
    lastUpdateModeStatus: (data.lastUpdateModeStatus !== null && typeof data.lastUpdateModeStatus !== 'undefined')
      ? uOCTET.decode(data.lastUpdateModeStatus)
      : undefined,
    lastUpdateTimeStatus: (data.lastUpdateTimeStatus !== null && typeof data.lastUpdateTimeStatus !== 'undefined')
      ? tIME.decode(data.lastUpdateTimeStatus)
      : undefined,
    lastUpdateModeRid: (data.lastUpdateModeRid !== null && typeof data.lastUpdateModeRid !== 'undefined')
      ? uOCTET.decode(data.lastUpdateModeRid)
      : undefined,
    lastUpdateTimeRid: (data.lastUpdateTimeRid !== null && typeof data.lastUpdateTimeRid !== 'undefined')
      ? tIME.decode(data.lastUpdateTimeRid)
      : undefined,
    lastUpdateModeValidParamId: (data.lastUpdateModeValidParamId !== null && typeof data.lastUpdateModeValidParamId !== 'undefined')
      ? uOCTET.decode(data.lastUpdateModeValidParamId)
      : undefined,
    lastUpdateTimeValidParamId: (data.lastUpdateTimeValidParamId !== null && typeof data.lastUpdateTimeValidParamId !== 'undefined')
      ? tIME.decode(data.lastUpdateTimeValidParamId)
      : undefined,
    lastUpdateModeValidParamMask: (data.lastUpdateModeValidParamMask !== null && typeof data.lastUpdateModeValidParamMask !== 'undefined')
      ? uOCTET.decode(data.lastUpdateModeValidParamMask)
      : undefined,
    lastUpdateTimeValidParamMask: (data.lastUpdateTimeValidParamMask !== null && typeof data.lastUpdateTimeValidParamMask !== 'undefined')
      ? tIME.decode(data.lastUpdateTimeValidParamMask)
      : undefined,
    lastUpdateModeValidParamExpectedValue: (data.lastUpdateModeValidParamExpectedValue !== null && typeof data.lastUpdateModeValidParamExpectedValue !== 'undefined')
      ? uOCTET.decode(data.lastUpdateModeValidParamExpectedValue)
      : undefined,
    lastUpdateTimeValidParamExpectedValue: (data.lastUpdateTimeValidParamExpectedValue !== null && typeof data.lastUpdateTimeValidParamExpectedValue !== 'undefined')
      ? tIME.decode(data.lastUpdateTimeValidParamExpectedValue)
      : undefined,
  }),
};
