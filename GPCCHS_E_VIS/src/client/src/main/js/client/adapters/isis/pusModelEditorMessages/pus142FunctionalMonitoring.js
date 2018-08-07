// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _map = require('lodash/map');
const pus142ParameterMonitoringDefinition = require('./pus142ParameterMonitoringDefinition');
const sTRING = require('../ccsds_mal/sTRING');
const uINTEGER = require('../ccsds_mal/uINTEGER');
const uLONG = require('../ccsds_mal/uLONG');

module.exports = {
  encode: data => ({
    fmonId: (data.fmonId !== null && typeof data.fmonId !== 'undefined')
      ? uINTEGER.encode(data.fmonId)
      : null,
    fmonIdLabel: (data.fmonIdLabel !== null && typeof data.fmonIdLabel !== 'undefined')
      ? sTRING.encode(data.fmonIdLabel)
      : null,
    fmonName: (data.fmonName !== null && typeof data.fmonName !== 'undefined')
      ? sTRING.encode(data.fmonName)
      : null,
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? uINTEGER.encode(data.status)
      : null,
    checkingStatus: (data.checkingStatus !== null && typeof data.checkingStatus !== 'undefined')
      ? sTRING.encode(data.checkingStatus)
      : null,
    protectionStatus: (data.protectionStatus !== null && typeof data.protectionStatus !== 'undefined')
      ? sTRING.encode(data.protectionStatus)
      : null,
    rid: (data.rid !== null && typeof data.rid !== 'undefined')
      ? uINTEGER.encode(data.rid)
      : null,
    ridLabel: (data.ridLabel !== null && typeof data.ridLabel !== 'undefined')
      ? sTRING.encode(data.ridLabel)
      : null,
    packetName: (data.packetName !== null && typeof data.packetName !== 'undefined')
      ? sTRING.encode(data.packetName)
      : null,
    ridStatus: (data.ridStatus !== null && typeof data.ridStatus !== 'undefined')
      ? uINTEGER.encode(data.ridStatus)
      : null,
    validityParameterId: (data.validityParameterId !== null && typeof data.validityParameterId !== 'undefined')
      ? uINTEGER.encode(data.validityParameterId)
      : null,
    validityParameterMask: (data.validityParameterMask !== null && typeof data.validityParameterMask !== 'undefined')
      ? sTRING.encode(data.validityParameterMask)
      : null,
    validityParameterExpectedValue: (data.validityParameterExpectedValue !== null && typeof data.validityParameterExpectedValue !== 'undefined')
      ? sTRING.encode(data.validityParameterExpectedValue)
      : null,
    pus142ParameterMonitoringDefinition: _map(data.pus142ParameterMonitoringDefinition, d => (pus142ParameterMonitoringDefinition.encode(d))),
    lastUpdateModeFMonId: (data.lastUpdateModeFMonId !== null && typeof data.lastUpdateModeFMonId !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeFMonId)
      : null,
    lastUpdateTimeFMonId: (data.lastUpdateTimeFMonId !== null && typeof data.lastUpdateTimeFMonId !== 'undefined')
      ? sTRING.encode(data.lastUpdateTimeFMonId)
      : null,
    lastUpdateModeProtectionStatus: (data.lastUpdateModeProtectionStatus !== null && typeof data.lastUpdateModeProtectionStatus !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeProtectionStatus)
      : null,
    lastUpdateTimeProtectionStatus: (data.lastUpdateTimeProtectionStatus !== null && typeof data.lastUpdateTimeProtectionStatus !== 'undefined')
      ? sTRING.encode(data.lastUpdateTimeProtectionStatus)
      : null,
    lastUpdateModeCheckingStatus: (data.lastUpdateModeCheckingStatus !== null && typeof data.lastUpdateModeCheckingStatus !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeCheckingStatus)
      : null,
    lastUpdateTimeCheckingStatus: (data.lastUpdateTimeCheckingStatus !== null && typeof data.lastUpdateTimeCheckingStatus !== 'undefined')
      ? sTRING.encode(data.lastUpdateTimeCheckingStatus)
      : null,
    lastUpdateModeStatus: (data.lastUpdateModeStatus !== null && typeof data.lastUpdateModeStatus !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeStatus)
      : null,
    lastUpdateTimeStatus: (data.lastUpdateTimeStatus !== null && typeof data.lastUpdateTimeStatus !== 'undefined')
      ? sTRING.encode(data.lastUpdateTimeStatus)
      : null,
    lastUpdateModeRid: (data.lastUpdateModeRid !== null && typeof data.lastUpdateModeRid !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeRid)
      : null,
    lastUpdateTimeRid: (data.lastUpdateTimeRid !== null && typeof data.lastUpdateTimeRid !== 'undefined')
      ? sTRING.encode(data.lastUpdateTimeRid)
      : null,
    lastUpdateModeValidParamId: (data.lastUpdateModeValidParamId !== null && typeof data.lastUpdateModeValidParamId !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeValidParamId)
      : null,
    lastUpdateTimeValidParamId: (data.lastUpdateTimeValidParamId !== null && typeof data.lastUpdateTimeValidParamId !== 'undefined')
      ? sTRING.encode(data.lastUpdateTimeValidParamId)
      : null,
    lastUpdateModeValidParamMask: (data.lastUpdateModeValidParamMask !== null && typeof data.lastUpdateModeValidParamMask !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeValidParamMask)
      : null,
    lastUpdateTimeValidParamMask: (data.lastUpdateTimeValidParamMask !== null && typeof data.lastUpdateTimeValidParamMask !== 'undefined')
      ? sTRING.encode(data.lastUpdateTimeValidParamMask)
      : null,
    lastUpdateModeValidParamExpectedValue: (data.lastUpdateModeValidParamExpectedValue !== null && typeof data.lastUpdateModeValidParamExpectedValue !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeValidParamExpectedValue)
      : null,
    lastUpdateTimeValidParamExpectedValue: (data.lastUpdateTimeValidParamExpectedValue !== null && typeof data.lastUpdateTimeValidParamExpectedValue !== 'undefined')
      ? sTRING.encode(data.lastUpdateTimeValidParamExpectedValue)
      : null,
    actionTcApid: (data.actionTcApid !== null && typeof data.actionTcApid !== 'undefined')
      ? uINTEGER.encode(data.actionTcApid)
      : null,
    actionTcType: (data.actionTcType !== null && typeof data.actionTcType !== 'undefined')
      ? uINTEGER.encode(data.actionTcType)
      : null,
    actionTcSubType: (data.actionTcSubType !== null && typeof data.actionTcSubType !== 'undefined')
      ? uINTEGER.encode(data.actionTcSubType)
      : null,
    actionStatus: (data.actionStatus !== null && typeof data.actionStatus !== 'undefined')
      ? uINTEGER.encode(data.actionStatus)
      : null,
    actionName: (data.actionName !== null && typeof data.actionName !== 'undefined')
      ? sTRING.encode(data.actionName)
      : null,
    lastUpdateModeActionStatus: (data.lastUpdateModeActionStatus !== null && typeof data.lastUpdateModeActionStatus !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeActionStatus)
      : null,
    lastUpdateTimeActionStatus: (data.lastUpdateTimeActionStatus !== null && typeof data.lastUpdateTimeActionStatus !== 'undefined')
      ? sTRING.encode(data.lastUpdateTimeActionStatus)
      : null,
    lastUpdateModeRidStatus: (data.lastUpdateModeRidStatus !== null && typeof data.lastUpdateModeRidStatus !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeRidStatus)
      : null,
    lastUpdateTimeRidStatus: (data.lastUpdateTimeRidStatus !== null && typeof data.lastUpdateTimeRidStatus !== 'undefined')
      ? sTRING.encode(data.lastUpdateTimeRidStatus)
      : null,
    uniqueId: (data.uniqueId !== null && typeof data.uniqueId !== 'undefined')
      ? uLONG.encode(data.uniqueId)
      : null,
    serviceApid: (data.serviceApid !== null && typeof data.serviceApid !== 'undefined')
      ? uINTEGER.encode(data.serviceApid)
      : null,
    serviceApidName: (data.serviceApidName !== null && typeof data.serviceApidName !== 'undefined')
      ? sTRING.encode(data.serviceApidName)
      : null,
  }),
  decode: data => ({
    fmonId: (data.fmonId !== null && typeof data.fmonId !== 'undefined')
      ? uINTEGER.decode(data.fmonId)
      : undefined,
    fmonIdLabel: (data.fmonIdLabel !== null && typeof data.fmonIdLabel !== 'undefined')
      ? sTRING.decode(data.fmonIdLabel)
      : undefined,
    fmonName: (data.fmonName !== null && typeof data.fmonName !== 'undefined')
      ? sTRING.decode(data.fmonName)
      : undefined,
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? uINTEGER.decode(data.status)
      : undefined,
    checkingStatus: (data.checkingStatus !== null && typeof data.checkingStatus !== 'undefined')
      ? sTRING.decode(data.checkingStatus)
      : undefined,
    protectionStatus: (data.protectionStatus !== null && typeof data.protectionStatus !== 'undefined')
      ? sTRING.decode(data.protectionStatus)
      : undefined,
    rid: (data.rid !== null && typeof data.rid !== 'undefined')
      ? uINTEGER.decode(data.rid)
      : undefined,
    ridLabel: (data.ridLabel !== null && typeof data.ridLabel !== 'undefined')
      ? sTRING.decode(data.ridLabel)
      : undefined,
    packetName: (data.packetName !== null && typeof data.packetName !== 'undefined')
      ? sTRING.decode(data.packetName)
      : undefined,
    ridStatus: (data.ridStatus !== null && typeof data.ridStatus !== 'undefined')
      ? uINTEGER.decode(data.ridStatus)
      : undefined,
    validityParameterId: (data.validityParameterId !== null && typeof data.validityParameterId !== 'undefined')
      ? uINTEGER.decode(data.validityParameterId)
      : undefined,
    validityParameterMask: (data.validityParameterMask !== null && typeof data.validityParameterMask !== 'undefined')
      ? sTRING.decode(data.validityParameterMask)
      : undefined,
    validityParameterExpectedValue: (data.validityParameterExpectedValue !== null && typeof data.validityParameterExpectedValue !== 'undefined')
      ? sTRING.decode(data.validityParameterExpectedValue)
      : undefined,
    pus142ParameterMonitoringDefinition: _map(data.pus142ParameterMonitoringDefinition, d => (pus142ParameterMonitoringDefinition.decode(d))),
    lastUpdateModeFMonId: (data.lastUpdateModeFMonId !== null && typeof data.lastUpdateModeFMonId !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeFMonId)
      : undefined,
    lastUpdateTimeFMonId: (data.lastUpdateTimeFMonId !== null && typeof data.lastUpdateTimeFMonId !== 'undefined')
      ? sTRING.decode(data.lastUpdateTimeFMonId)
      : undefined,
    lastUpdateModeProtectionStatus: (data.lastUpdateModeProtectionStatus !== null && typeof data.lastUpdateModeProtectionStatus !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeProtectionStatus)
      : undefined,
    lastUpdateTimeProtectionStatus: (data.lastUpdateTimeProtectionStatus !== null && typeof data.lastUpdateTimeProtectionStatus !== 'undefined')
      ? sTRING.decode(data.lastUpdateTimeProtectionStatus)
      : undefined,
    lastUpdateModeCheckingStatus: (data.lastUpdateModeCheckingStatus !== null && typeof data.lastUpdateModeCheckingStatus !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeCheckingStatus)
      : undefined,
    lastUpdateTimeCheckingStatus: (data.lastUpdateTimeCheckingStatus !== null && typeof data.lastUpdateTimeCheckingStatus !== 'undefined')
      ? sTRING.decode(data.lastUpdateTimeCheckingStatus)
      : undefined,
    lastUpdateModeStatus: (data.lastUpdateModeStatus !== null && typeof data.lastUpdateModeStatus !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeStatus)
      : undefined,
    lastUpdateTimeStatus: (data.lastUpdateTimeStatus !== null && typeof data.lastUpdateTimeStatus !== 'undefined')
      ? sTRING.decode(data.lastUpdateTimeStatus)
      : undefined,
    lastUpdateModeRid: (data.lastUpdateModeRid !== null && typeof data.lastUpdateModeRid !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeRid)
      : undefined,
    lastUpdateTimeRid: (data.lastUpdateTimeRid !== null && typeof data.lastUpdateTimeRid !== 'undefined')
      ? sTRING.decode(data.lastUpdateTimeRid)
      : undefined,
    lastUpdateModeValidParamId: (data.lastUpdateModeValidParamId !== null && typeof data.lastUpdateModeValidParamId !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeValidParamId)
      : undefined,
    lastUpdateTimeValidParamId: (data.lastUpdateTimeValidParamId !== null && typeof data.lastUpdateTimeValidParamId !== 'undefined')
      ? sTRING.decode(data.lastUpdateTimeValidParamId)
      : undefined,
    lastUpdateModeValidParamMask: (data.lastUpdateModeValidParamMask !== null && typeof data.lastUpdateModeValidParamMask !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeValidParamMask)
      : undefined,
    lastUpdateTimeValidParamMask: (data.lastUpdateTimeValidParamMask !== null && typeof data.lastUpdateTimeValidParamMask !== 'undefined')
      ? sTRING.decode(data.lastUpdateTimeValidParamMask)
      : undefined,
    lastUpdateModeValidParamExpectedValue: (data.lastUpdateModeValidParamExpectedValue !== null && typeof data.lastUpdateModeValidParamExpectedValue !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeValidParamExpectedValue)
      : undefined,
    lastUpdateTimeValidParamExpectedValue: (data.lastUpdateTimeValidParamExpectedValue !== null && typeof data.lastUpdateTimeValidParamExpectedValue !== 'undefined')
      ? sTRING.decode(data.lastUpdateTimeValidParamExpectedValue)
      : undefined,
    actionTcApid: (data.actionTcApid !== null && typeof data.actionTcApid !== 'undefined')
      ? uINTEGER.decode(data.actionTcApid)
      : undefined,
    actionTcType: (data.actionTcType !== null && typeof data.actionTcType !== 'undefined')
      ? uINTEGER.decode(data.actionTcType)
      : undefined,
    actionTcSubType: (data.actionTcSubType !== null && typeof data.actionTcSubType !== 'undefined')
      ? uINTEGER.decode(data.actionTcSubType)
      : undefined,
    actionStatus: (data.actionStatus !== null && typeof data.actionStatus !== 'undefined')
      ? uINTEGER.decode(data.actionStatus)
      : undefined,
    actionName: (data.actionName !== null && typeof data.actionName !== 'undefined')
      ? sTRING.decode(data.actionName)
      : undefined,
    lastUpdateModeActionStatus: (data.lastUpdateModeActionStatus !== null && typeof data.lastUpdateModeActionStatus !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeActionStatus)
      : undefined,
    lastUpdateTimeActionStatus: (data.lastUpdateTimeActionStatus !== null && typeof data.lastUpdateTimeActionStatus !== 'undefined')
      ? sTRING.decode(data.lastUpdateTimeActionStatus)
      : undefined,
    lastUpdateModeRidStatus: (data.lastUpdateModeRidStatus !== null && typeof data.lastUpdateModeRidStatus !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeRidStatus)
      : undefined,
    lastUpdateTimeRidStatus: (data.lastUpdateTimeRidStatus !== null && typeof data.lastUpdateTimeRidStatus !== 'undefined')
      ? sTRING.decode(data.lastUpdateTimeRidStatus)
      : undefined,
    uniqueId: (data.uniqueId !== null && typeof data.uniqueId !== 'undefined')
      ? uLONG.decode(data.uniqueId)
      : undefined,
    serviceApid: (data.serviceApid !== null && typeof data.serviceApid !== 'undefined')
      ? uINTEGER.decode(data.serviceApid)
      : undefined,
    serviceApidName: (data.serviceApidName !== null && typeof data.serviceApidName !== 'undefined')
      ? sTRING.decode(data.serviceApidName)
      : undefined,
  }),
};
