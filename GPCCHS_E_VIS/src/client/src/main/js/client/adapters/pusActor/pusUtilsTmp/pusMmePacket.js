const _string = require('../ccsds_mal/sTRING');
const uinteger = require('../ccsds_mal/uINTEGER');
const ulong = require('../ccsds_mal/uLONG');

const packetStore = require('./pusMmePacketStore');
const packetParameter = require('./pusMmePacketParameter');

module.exports = {
  encode: data => ({
    sid: (data.sid !== null && typeof data.sid !== 'undefined')
    ? uinteger.encode(data.sid)
    : null,
    validityParameterId: (data.validityParameterId !== null && typeof data.validityParameterId !== 'undefined')
    ? uinteger.encode(data.validityParameterId)
    : null,
    validityParameterMask: (data.validityParameterMask !== null && typeof data.validityParameterMask !== 'undefined')
    ? _string.encode(data.validityParameterMask)
    : null,
    validityParameterExpectedValue: (data.validityParameterExpectedValue !== null && typeof data.validityParameterExpectedValue !== 'undefined')
    ? _string.encode(data.validityParameterExpectedValue)
    : null,
    collectionInterval: (data.collectionInterval !== null && typeof data.collectionInterval !== 'undefined')
    ? _string.encode(data.collectionInterval)
    : null,
    status: (data.status !== null && typeof data.status !== 'undefined')
    ? uinteger.encode(data.status)
    : null,
    sidLabel: (data.sidLabel !== null && typeof data.sidLabel !== 'undefined')
    ? _string.encode(data.sidLabel)
    : null,
    lastUpdateModeSid: (data.lastUpdateModeSid !== null && typeof data.lastUpdateModeSid !== 'undefined')
    ? uinteger.encode(data.lastUpdateModeSid)
    : null,
    lastUpdateTimeSid: (data.lastUpdateTimeSid !== null && typeof data.lastUpdateTimeSid !== 'undefined')
    ? _string.encode(data.lastUpdateTimeSid)
    : null,
    lastUpdateModeStatus: (data.lastUpdateModeStatus !== null && typeof data.lastUpdateModeStatus !== 'undefined')
    ? uinteger.encode(data.lastUpdateModeStatus)
    : null,
    lastUpdateTimeStatus: (data.lastUpdateTimeStatus !== null && typeof data.lastUpdateTimeStatus !== 'undefined')
    ? _string.encode(data.lastUpdateTimeStatus)
    : null,
    lastUpdateModeValidParamId: (data.lastUpdateModeValidParamId !== null && typeof data.lastUpdateModeValidParamId !== 'undefined')
    ? uinteger.encode(data.lastUpdateModeValidParamId)
    : null,
    lastUpdateTimeValidParamId: (data.lastUpdateTimeValidParamId !== null && typeof data.lastUpdateTimeValidParamId !== 'undefined')
    ? _string.encode(data.lastUpdateTimeValidParamId)
    : null,
    lastUpdateModeValidParamMask: (data.lastUpdateModeValidParamMask !== null && typeof data.lastUpdateModeValidParamMask !== 'undefined')
    ? uinteger.encode(data.lastUpdateModeValidParamMask)
    : null,
    lastUpdateTimeValidParamMask: (data.lastUpdateTimeValidParamMask !== null && typeof data.lastUpdateTimeValidParamMask !== 'undefined')
    ? _string.encode(data.lastUpdateTimeValidParamMask)
    : null,
    lastUpdateModeValidParamExpValue: (data.lastUpdateModeValidParamExpValue !== null && typeof data.lastUpdateModeValidParamExpValue !== 'undefined')
    ? uinteger.encode(data.lastUpdateModeValidParamExpValue)
    : null,
    lastUpdateTimeValidParamExpValue: (data.lastUpdateTimeValidParamExpValue !== null && typeof data.lastUpdateTimeValidParamExpValue !== 'undefined')
    ? _string.encode(data.lastUpdateTimeValidParamExpValue)
    : null,
    lastUpdateModeCollectInterval: (data.lastUpdateModeCollectInterval !== null && typeof data.lastUpdateModeCollectInterval !== 'undefined')
    ? uinteger.encode(data.lastUpdateModeCollectInterval)
    : null,
    lastUpdateTimeCollectInterval: (data.lastUpdateTimeCollectInterval !== null && typeof data.lastUpdateTimeCollectInterval !== 'undefined')
    ? _string.encode(data.lastUpdateTimeCollectInterval)
    : null,
    packetName: (data.packetName !== null && typeof data.packetName !== 'undefined')
    ? _string.encode(data.packetName)
    : null,
    validityParameterName: (data.validityParameterName !== null && typeof data.validityParameterName !== 'undefined')
    ? _string.encode(data.validityParameterName)
    : null,
    packetApid: (data.packetApid !== null && typeof data.packetApid !== 'undefined')
    ? uinteger.encode(data.packetApid)
    : null,
    packetApidName: (data.packetApidName !== null && typeof data.packetApidName !== 'undefined')
    ? _string.encode(data.packetApidName)
    : null,
    serviceApid: (data.serviceApid !== null && typeof data.serviceApid !== 'undefined')
    ? uinteger.encode(data.serviceApid)
    : null,
    serviceApidName: (data.serviceApidName !== null && typeof data.serviceApidName !== 'undefined')
    ? _string.encode(data.serviceApidName)
    : null,
    uniqueId: (data.uniqueId !== null && typeof data.uniqueId !== 'undefined')
    ? ulong.encode(data.uniqueId)
    : null,
    generationMode: (data.generationMode !== null && typeof data.generationMode !== 'undefined')
    ? _string.encode(data.generationMode)
    : null,
    lastUpdateTimeGenMode: (data.lastUpdateTimeGenMode !== null && typeof data.lastUpdateTimeGenMode !== 'undefined')
    ? _string.encode(data.lastUpdateTimeGenMode)
    : null,
    lastUpdateModeGenMode: (data.lastUpdateModeGenMode !== null && typeof data.lastUpdateModeGenMode !== 'undefined')
    ? uinteger.encode(data.lastUpdateModeGenMode)
    : null,
    packetType: (data.packetType !== null && typeof data.packetType !== 'undefined')
    ? _string.encode(data.packetType)
    : null,
    forwardingStatusTypeSubtype: (data.forwardingStatusTypeSubtype !== null && typeof data.forwardingStatusTypeSubtype !== 'undefined')
    ? uinteger.encode(data.forwardingStatusTypeSubtype)
    : null,
    lastUpdateModeFwdStatusTypeSubtype: (data.lastUpdateModeFwdStatusTypeSubtype !== null && typeof data.lastUpdateModeFwdStatusTypeSubtype !== 'undefined')
    ? uinteger.encode(data.lastUpdateModeFwdStatusTypeSubtype)
    : null,
    lastUpdateTimeFwdStatusTypeSubtype: (data.lastUpdateTimeFwdStatusTypeSubtype !== null && typeof data.lastUpdateTimeFwdStatusTypeSubtype !== 'undefined')
    ? _string.encode(data.lastUpdateTimeFwdStatusTypeSubtype)
    : null,
    forwardingStatusRidSid: (data.forwardingStatusRidSid !== null && typeof data.forwardingStatusRidSid !== 'undefined')
    ? uinteger.encode(data.forwardingStatusRidSid)
    : null,
    lastUpdateModeFwdStatusTypeRidSid: (data.lastUpdateModeFwdStatusTypeRidSid !== null && typeof data.lastUpdateModeFwdStatusTypeRidSid !== 'undefined')
    ? uinteger.encode(data.lastUpdateModeFwdStatusTypeRidSid)
    : null,
    lastUpdateTimeFwdStatusTypeRidSid: (data.lastUpdateTimeFwdStatusTypeRidSid !== null && typeof data.lastUpdateTimeFwdStatusTypeRidSid !== 'undefined')
    ? _string.encode(data.lastUpdateTimeFwdStatusTypeRidSid)
    : null,
    lastUpdateModeSubSamplingRatio: (data.lastUpdateModeSubSamplingRatio !== null && typeof data.lastUpdateModeSubSamplingRatio !== 'undefined')
    ? uinteger.encode(data.lastUpdateModeSubSamplingRatio)
    : null,
    lastUpdateTimeSubSamplingRatio: (data.lastUpdateTimeSubSamplingRatio !== null && typeof data.lastUpdateTimeSubSamplingRatio !== 'undefined')
    ? _string.encode(data.lastUpdateTimeSubSamplingRatio)
    : null,
    subsamplingRatio: (data.subsamplingRatio !== null && typeof data.subsamplingRatio !== 'undefined')
    ? uinteger.encode(data.subsamplingRatio)
    : null,
    pusMmePacketStore: data.pusMmePacketStore.map((p) => packetStore.encode(p)),
    pusMmePacketParameter: data.pusMmePacketParameter.map((p) => packetParameter.encode(p)),
  }),
  decode: data => ({
    sid: (data.sid !== null && typeof data.sid !== 'undefined')
    ? uinteger.decode(data.sid)
    : null,
    validityParameterId: (data.validityParameterId !== null && typeof data.validityParameterId !== 'undefined')
    ? uinteger.decode(data.validityParameterId)
    : null,
    validityParameterMask: (data.validityParameterMask !== null && typeof data.validityParameterMask !== 'undefined')
    ? _string.decode(data.validityParameterMask)
    : null,
    validityParameterExpectedValue: (data.validityParameterExpectedValue !== null && typeof data.validityParameterExpectedValue !== 'undefined')
    ? _string.decode(data.validityParameterExpectedValue)
    : null,
    collectionInterval: (data.collectionInterval !== null && typeof data.collectionInterval !== 'undefined')
    ? _string.decode(data.collectionInterval)
    : null,
    status: (data.status !== null && typeof data.status !== 'undefined')
    ? uinteger.decode(data.status)
    : null,
    sidLabel: (data.sidLabel !== null && typeof data.sidLabel !== 'undefined')
    ? _string.decode(data.sidLabel)
    : null,
    lastUpdateModeSid: (data.lastUpdateModeSid !== null && typeof data.lastUpdateModeSid !== 'undefined')
    ? uinteger.decode(data.lastUpdateModeSid)
    : null,
    lastUpdateTimeSid: (data.lastUpdateTimeSid !== null && typeof data.lastUpdateTimeSid !== 'undefined')
    ? _string.decode(data.lastUpdateTimeSid)
    : null,
    lastUpdateModeStatus: (data.lastUpdateModeStatus !== null && typeof data.lastUpdateModeStatus !== 'undefined')
    ? uinteger.decode(data.lastUpdateModeStatus)
    : null,
    lastUpdateTimeStatus: (data.lastUpdateTimeStatus !== null && typeof data.lastUpdateTimeStatus !== 'undefined')
    ? _string.decode(data.lastUpdateTimeStatus)
    : null,
    lastUpdateModeValidParamId: (data.lastUpdateModeValidParamId !== null && typeof data.lastUpdateModeValidParamId !== 'undefined')
    ? uinteger.decode(data.lastUpdateModeValidParamId)
    : null,
    lastUpdateTimeValidParamId: (data.lastUpdateTimeValidParamId !== null && typeof data.lastUpdateTimeValidParamId !== 'undefined')
    ? _string.decode(data.lastUpdateTimeValidParamId)
    : null,
    lastUpdateModeValidParamMask: (data.lastUpdateModeValidParamMask !== null && typeof data.lastUpdateModeValidParamMask !== 'undefined')
    ? uinteger.decode(data.lastUpdateModeValidParamMask)
    : null,
    lastUpdateTimeValidParamMask: (data.lastUpdateTimeValidParamMask !== null && typeof data.lastUpdateTimeValidParamMask !== 'undefined')
    ? _string.decode(data.lastUpdateTimeValidParamMask)
    : null,
    lastUpdateModeValidParamExpValue: (data.lastUpdateModeValidParamExpValue !== null && typeof data.lastUpdateModeValidParamExpValue !== 'undefined')
    ? uinteger.decode(data.lastUpdateModeValidParamExpValue)
    : null,
    lastUpdateTimeValidParamExpValue: (data.lastUpdateTimeValidParamExpValue !== null && typeof data.lastUpdateTimeValidParamExpValue !== 'undefined')
    ? _string.decode(data.lastUpdateTimeValidParamExpValue)
    : null,
    lastUpdateModeCollectInterval: (data.lastUpdateModeCollectInterval !== null && typeof data.lastUpdateModeCollectInterval !== 'undefined')
    ? uinteger.decode(data.lastUpdateModeCollectInterval)
    : null,
    lastUpdateTimeCollectInterval: (data.lastUpdateTimeCollectInterval !== null && typeof data.lastUpdateTimeCollectInterval !== 'undefined')
    ? _string.decode(data.lastUpdateTimeCollectInterval)
    : null,
    packetName: (data.packetName !== null && typeof data.packetName !== 'undefined')
    ? _string.decode(data.packetName)
    : null,
    validityParameterName: (data.validityParameterName !== null && typeof data.validityParameterName !== 'undefined')
    ? _string.decode(data.validityParameterName)
    : null,
    packetApid: (data.packetApid !== null && typeof data.packetApid !== 'undefined')
    ? uinteger.decode(data.packetApid)
    : null,
    packetApidName: (data.packetApidName !== null && typeof data.packetApidName !== 'undefined')
    ? _string.decode(data.packetApidName)
    : null,
    serviceApid: (data.serviceApid !== null && typeof data.serviceApid !== 'undefined')
    ? uinteger.decode(data.serviceApid)
    : null,
    serviceApidName: (data.serviceApidName !== null && typeof data.serviceApidName !== 'undefined')
    ? _string.decode(data.serviceApidName)
    : null,
    uniqueId: (data.uniqueId !== null && typeof data.uniqueId !== 'undefined')
    ? ulong.decode(data.uniqueId)
    : null,
    generationMode: (data.generationMode !== null && typeof data.generationMode !== 'undefined')
    ? _string.decode(data.generationMode)
    : null,
    lastUpdateTimeGenMode: (data.lastUpdateTimeGenMode !== null && typeof data.lastUpdateTimeGenMode !== 'undefined')
    ? _string.decode(data.lastUpdateTimeGenMode)
    : null,
    lastUpdateModeGenMode: (data.lastUpdateModeGenMode !== null && typeof data.lastUpdateModeGenMode !== 'undefined')
    ? uinteger.decode(data.lastUpdateModeGenMode)
    : null,
    packetType: (data.packetType !== null && typeof data.packetType !== 'undefined')
    ? _string.decode(data.packetType)
    : null,
    forwardingStatusTypeSubtype: (data.forwardingStatusTypeSubtype !== null && typeof data.forwardingStatusTypeSubtype !== 'undefined')
    ? uinteger.decode(data.forwardingStatusTypeSubtype)
    : null,
    lastUpdateModeFwdStatusTypeSubtype: (data.lastUpdateModeFwdStatusTypeSubtype !== null && typeof data.lastUpdateModeFwdStatusTypeSubtype !== 'undefined')
    ? uinteger.decode(data.lastUpdateModeFwdStatusTypeSubtype)
    : null,
    lastUpdateTimeFwdStatusTypeSubtype: (data.lastUpdateTimeFwdStatusTypeSubtype !== null && typeof data.lastUpdateTimeFwdStatusTypeSubtype !== 'undefined')
    ? _string.decode(data.lastUpdateTimeFwdStatusTypeSubtype)
    : null,
    forwardingStatusRidSid: (data.forwardingStatusRidSid !== null && typeof data.forwardingStatusRidSid !== 'undefined')
    ? uinteger.decode(data.forwardingStatusRidSid)
    : null,
    lastUpdateModeFwdStatusTypeRidSid: (data.lastUpdateModeFwdStatusTypeRidSid !== null && typeof data.lastUpdateModeFwdStatusTypeRidSid !== 'undefined')
    ? uinteger.decode(data.lastUpdateModeFwdStatusTypeRidSid)
    : null,
    lastUpdateTimeFwdStatusTypeRidSid: (data.lastUpdateTimeFwdStatusTypeRidSid !== null && typeof data.lastUpdateTimeFwdStatusTypeRidSid !== 'undefined')
    ? _string.decode(data.lastUpdateTimeFwdStatusTypeRidSid)
    : null,
    lastUpdateModeSubSamplingRatio: (data.lastUpdateModeSubSamplingRatio !== null && typeof data.lastUpdateModeSubSamplingRatio !== 'undefined')
    ? uinteger.decode(data.lastUpdateModeSubSamplingRatio)
    : null,
    lastUpdateTimeSubSamplingRatio: (data.lastUpdateTimeSubSamplingRatio !== null && typeof data.lastUpdateTimeSubSamplingRatio !== 'undefined')
    ? _string.decode(data.lastUpdateTimeSubSamplingRatio)
    : null,
    subsamplingRatio: (data.subsamplingRatio !== null && typeof data.subsamplingRatio !== 'undefined')
    ? uinteger.decode(data.subsamplingRatio)
    : null,
    pusMmePacketStore: data.pusMmePacketStore.map((p) => packetStore.decode(p)),
    pusMmePacketParameter: data.pusMmePacketParameter.map((p) => packetParameter.decode(p)),
  }),
};
