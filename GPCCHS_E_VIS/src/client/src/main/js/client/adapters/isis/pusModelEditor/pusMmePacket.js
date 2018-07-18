// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _map = require('lodash/map');
const pusMmePacketParameter = require('./pusMmePacketParameter');
const pusMmePacketStore = require('./pusMmePacketStore');
const sTRING = require('../ccsds_mal/sTRING');
const uINTEGER = require('../ccsds_mal/uINTEGER');
const uLONG = require('../ccsds_mal/uLONG');

module.exports = {
  encode: data => ({
    sid: (data.sid !== null && typeof data.sid !== 'undefined')
      ? uINTEGER.encode(data.sid)
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
    collectionInterval: (data.collectionInterval !== null && typeof data.collectionInterval !== 'undefined')
      ? sTRING.encode(data.collectionInterval)
      : null,
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? uINTEGER.encode(data.status)
      : null,
    sidLabel: (data.sidLabel !== null && typeof data.sidLabel !== 'undefined')
      ? sTRING.encode(data.sidLabel)
      : null,
    lastUpdateModeSid: (data.lastUpdateModeSid !== null && typeof data.lastUpdateModeSid !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeSid)
      : null,
    lastUpdateTimeSid: (data.lastUpdateTimeSid !== null && typeof data.lastUpdateTimeSid !== 'undefined')
      ? sTRING.encode(data.lastUpdateTimeSid)
      : null,
    lastUpdateModeStatus: (data.lastUpdateModeStatus !== null && typeof data.lastUpdateModeStatus !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeStatus)
      : null,
    lastUpdateTimeStatus: (data.lastUpdateTimeStatus !== null && typeof data.lastUpdateTimeStatus !== 'undefined')
      ? sTRING.encode(data.lastUpdateTimeStatus)
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
    lastUpdateModeValidParamExpValue: (data.lastUpdateModeValidParamExpValue !== null && typeof data.lastUpdateModeValidParamExpValue !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeValidParamExpValue)
      : null,
    lastUpdateTimeValidParamExpValue: (data.lastUpdateTimeValidParamExpValue !== null && typeof data.lastUpdateTimeValidParamExpValue !== 'undefined')
      ? sTRING.encode(data.lastUpdateTimeValidParamExpValue)
      : null,
    lastUpdateModeCollectInterval: (data.lastUpdateModeCollectInterval !== null && typeof data.lastUpdateModeCollectInterval !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeCollectInterval)
      : null,
    lastUpdateTimeCollectInterval: (data.lastUpdateTimeCollectInterval !== null && typeof data.lastUpdateTimeCollectInterval !== 'undefined')
      ? sTRING.encode(data.lastUpdateTimeCollectInterval)
      : null,
    packetName: (data.packetName !== null && typeof data.packetName !== 'undefined')
      ? sTRING.encode(data.packetName)
      : null,
    validityParameterName: (data.validityParameterName !== null && typeof data.validityParameterName !== 'undefined')
      ? sTRING.encode(data.validityParameterName)
      : null,
    packetApid: (data.packetApid !== null && typeof data.packetApid !== 'undefined')
      ? uINTEGER.encode(data.packetApid)
      : null,
    packetApidName: (data.packetApidName !== null && typeof data.packetApidName !== 'undefined')
      ? sTRING.encode(data.packetApidName)
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
    generationMode: (data.generationMode !== null && typeof data.generationMode !== 'undefined')
      ? sTRING.encode(data.generationMode)
      : null,
    lastUpdateTimeGenMode: (data.lastUpdateTimeGenMode !== null && typeof data.lastUpdateTimeGenMode !== 'undefined')
      ? sTRING.encode(data.lastUpdateTimeGenMode)
      : null,
    lastUpdateModeGenMode: (data.lastUpdateModeGenMode !== null && typeof data.lastUpdateModeGenMode !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeGenMode)
      : null,
    packetType: (data.packetType !== null && typeof data.packetType !== 'undefined')
      ? sTRING.encode(data.packetType)
      : null,
    forwardingStatusTypeSubtype: (data.forwardingStatusTypeSubtype !== null && typeof data.forwardingStatusTypeSubtype !== 'undefined')
      ? uINTEGER.encode(data.forwardingStatusTypeSubtype)
      : null,
    lastUpdateModeFwdStatusTypeSubtype: (data.lastUpdateModeFwdStatusTypeSubtype !== null && typeof data.lastUpdateModeFwdStatusTypeSubtype !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeFwdStatusTypeSubtype)
      : null,
    lastUpdateTimeFwdStatusTypeSubtype: (data.lastUpdateTimeFwdStatusTypeSubtype !== null && typeof data.lastUpdateTimeFwdStatusTypeSubtype !== 'undefined')
      ? sTRING.encode(data.lastUpdateTimeFwdStatusTypeSubtype)
      : null,
    forwardingStatusRidSid: (data.forwardingStatusRidSid !== null && typeof data.forwardingStatusRidSid !== 'undefined')
      ? uINTEGER.encode(data.forwardingStatusRidSid)
      : null,
    lastUpdateModeFwdStatusTypeRidSid: (data.lastUpdateModeFwdStatusTypeRidSid !== null && typeof data.lastUpdateModeFwdStatusTypeRidSid !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeFwdStatusTypeRidSid)
      : null,
    lastUpdateTimeFwdStatusTypeRidSid: (data.lastUpdateTimeFwdStatusTypeRidSid !== null && typeof data.lastUpdateTimeFwdStatusTypeRidSid !== 'undefined')
      ? sTRING.encode(data.lastUpdateTimeFwdStatusTypeRidSid)
      : null,
    lastUpdateModeSubSamplingRatio: (data.lastUpdateModeSubSamplingRatio !== null && typeof data.lastUpdateModeSubSamplingRatio !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeSubSamplingRatio)
      : null,
    lastUpdateTimeSubSamplingRatio: (data.lastUpdateTimeSubSamplingRatio !== null && typeof data.lastUpdateTimeSubSamplingRatio !== 'undefined')
      ? sTRING.encode(data.lastUpdateTimeSubSamplingRatio)
      : null,
    subsamplingRatio: (data.subsamplingRatio !== null && typeof data.subsamplingRatio !== 'undefined')
      ? uINTEGER.encode(data.subsamplingRatio)
      : null,
    pusMmePacketStore: _map(data.pusMmePacketStore, d => (pusMmePacketStore.encode(d))),
    pusMmePacketParameter: _map(data.pusMmePacketParameter, d => (pusMmePacketParameter.encode(d))),
  }),
  decode: data => ({
    sid: (data.sid !== null && typeof data.sid !== 'undefined')
      ? uINTEGER.decode(data.sid)
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
    collectionInterval: (data.collectionInterval !== null && typeof data.collectionInterval !== 'undefined')
      ? sTRING.decode(data.collectionInterval)
      : undefined,
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? uINTEGER.decode(data.status)
      : undefined,
    sidLabel: (data.sidLabel !== null && typeof data.sidLabel !== 'undefined')
      ? sTRING.decode(data.sidLabel)
      : undefined,
    lastUpdateModeSid: (data.lastUpdateModeSid !== null && typeof data.lastUpdateModeSid !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeSid)
      : undefined,
    lastUpdateTimeSid: (data.lastUpdateTimeSid !== null && typeof data.lastUpdateTimeSid !== 'undefined')
      ? sTRING.decode(data.lastUpdateTimeSid)
      : undefined,
    lastUpdateModeStatus: (data.lastUpdateModeStatus !== null && typeof data.lastUpdateModeStatus !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeStatus)
      : undefined,
    lastUpdateTimeStatus: (data.lastUpdateTimeStatus !== null && typeof data.lastUpdateTimeStatus !== 'undefined')
      ? sTRING.decode(data.lastUpdateTimeStatus)
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
    lastUpdateModeValidParamExpValue: (data.lastUpdateModeValidParamExpValue !== null && typeof data.lastUpdateModeValidParamExpValue !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeValidParamExpValue)
      : undefined,
    lastUpdateTimeValidParamExpValue: (data.lastUpdateTimeValidParamExpValue !== null && typeof data.lastUpdateTimeValidParamExpValue !== 'undefined')
      ? sTRING.decode(data.lastUpdateTimeValidParamExpValue)
      : undefined,
    lastUpdateModeCollectInterval: (data.lastUpdateModeCollectInterval !== null && typeof data.lastUpdateModeCollectInterval !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeCollectInterval)
      : undefined,
    lastUpdateTimeCollectInterval: (data.lastUpdateTimeCollectInterval !== null && typeof data.lastUpdateTimeCollectInterval !== 'undefined')
      ? sTRING.decode(data.lastUpdateTimeCollectInterval)
      : undefined,
    packetName: (data.packetName !== null && typeof data.packetName !== 'undefined')
      ? sTRING.decode(data.packetName)
      : undefined,
    validityParameterName: (data.validityParameterName !== null && typeof data.validityParameterName !== 'undefined')
      ? sTRING.decode(data.validityParameterName)
      : undefined,
    packetApid: (data.packetApid !== null && typeof data.packetApid !== 'undefined')
      ? uINTEGER.decode(data.packetApid)
      : undefined,
    packetApidName: (data.packetApidName !== null && typeof data.packetApidName !== 'undefined')
      ? sTRING.decode(data.packetApidName)
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
    generationMode: (data.generationMode !== null && typeof data.generationMode !== 'undefined')
      ? sTRING.decode(data.generationMode)
      : undefined,
    lastUpdateTimeGenMode: (data.lastUpdateTimeGenMode !== null && typeof data.lastUpdateTimeGenMode !== 'undefined')
      ? sTRING.decode(data.lastUpdateTimeGenMode)
      : undefined,
    lastUpdateModeGenMode: (data.lastUpdateModeGenMode !== null && typeof data.lastUpdateModeGenMode !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeGenMode)
      : undefined,
    packetType: (data.packetType !== null && typeof data.packetType !== 'undefined')
      ? sTRING.decode(data.packetType)
      : undefined,
    forwardingStatusTypeSubtype: (data.forwardingStatusTypeSubtype !== null && typeof data.forwardingStatusTypeSubtype !== 'undefined')
      ? uINTEGER.decode(data.forwardingStatusTypeSubtype)
      : undefined,
    lastUpdateModeFwdStatusTypeSubtype: (data.lastUpdateModeFwdStatusTypeSubtype !== null && typeof data.lastUpdateModeFwdStatusTypeSubtype !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeFwdStatusTypeSubtype)
      : undefined,
    lastUpdateTimeFwdStatusTypeSubtype: (data.lastUpdateTimeFwdStatusTypeSubtype !== null && typeof data.lastUpdateTimeFwdStatusTypeSubtype !== 'undefined')
      ? sTRING.decode(data.lastUpdateTimeFwdStatusTypeSubtype)
      : undefined,
    forwardingStatusRidSid: (data.forwardingStatusRidSid !== null && typeof data.forwardingStatusRidSid !== 'undefined')
      ? uINTEGER.decode(data.forwardingStatusRidSid)
      : undefined,
    lastUpdateModeFwdStatusTypeRidSid: (data.lastUpdateModeFwdStatusTypeRidSid !== null && typeof data.lastUpdateModeFwdStatusTypeRidSid !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeFwdStatusTypeRidSid)
      : undefined,
    lastUpdateTimeFwdStatusTypeRidSid: (data.lastUpdateTimeFwdStatusTypeRidSid !== null && typeof data.lastUpdateTimeFwdStatusTypeRidSid !== 'undefined')
      ? sTRING.decode(data.lastUpdateTimeFwdStatusTypeRidSid)
      : undefined,
    lastUpdateModeSubSamplingRatio: (data.lastUpdateModeSubSamplingRatio !== null && typeof data.lastUpdateModeSubSamplingRatio !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeSubSamplingRatio)
      : undefined,
    lastUpdateTimeSubSamplingRatio: (data.lastUpdateTimeSubSamplingRatio !== null && typeof data.lastUpdateTimeSubSamplingRatio !== 'undefined')
      ? sTRING.decode(data.lastUpdateTimeSubSamplingRatio)
      : undefined,
    subsamplingRatio: (data.subsamplingRatio !== null && typeof data.subsamplingRatio !== 'undefined')
      ? uINTEGER.decode(data.subsamplingRatio)
      : undefined,
    pusMmePacketStore: _map(data.pusMmePacketStore, d => (pusMmePacketStore.decode(d))),
    pusMmePacketParameter: _map(data.pusMmePacketParameter, d => (pusMmePacketParameter.decode(d))),
  }),
};
