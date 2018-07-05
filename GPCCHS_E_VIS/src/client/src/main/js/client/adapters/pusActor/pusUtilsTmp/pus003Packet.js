const tIME = require('../ccsds_mal/tIME');
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
      ? tIME.encode(data.lastUpdateTimeSid)
      : null,
    lastUpdateModeStatus: (data.lastUpdateModeStatus !== null && typeof data.lastUpdateModeStatus !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeStatus)
      : null,
    lastUpdateTimeStatus: (data.lastUpdateTimeStatus !== null && typeof data.lastUpdateTimeStatus !== 'undefined')
      ? tIME.encode(data.lastUpdateTimeStatus)
      : null,
    lastUpdateModeValidParamId: (data.lastUpdateModeValidParamId !== null && typeof data.lastUpdateModeValidParamId !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeValidParamId)
      : null,
    lastUpdateTimeValidParamId: (data.lastUpdateTimeValidParamId !== null && typeof data.lastUpdateTimeValidParamId !== 'undefined')
      ? tIME.encode(data.lastUpdateTimeValidParamId)
      : null,
    lastUpdateModeValidParamMask: (data.lastUpdateModeValidParamMask !== null && typeof data.lastUpdateModeValidParamMask !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeValidParamMask)
      : null,
    lastUpdateTimeValidParamMask: (data.lastUpdateTimeValidParamMask !== null && typeof data.lastUpdateTimeValidParamMask !== 'undefined')
      ? tIME.encode(data.lastUpdateTimeValidParamMask)
      : null,
    lastUpdateModeValidParamExpValue: (data.lastUpdateModeValidParamExpValue !== null && typeof data.lastUpdateModeValidParamExpValue !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeValidParamExpValue)
      : null,
    lastUpdateTimeValidParamExpValue: (data.lastUpdateTimeValidParamExpValue !== null && typeof data.lastUpdateTimeValidParamExpValue !== 'undefined')
      ? tIME.encode(data.lastUpdateTimeValidParamExpValue)
      : null,
    lastUpdateModeCollectInterval: (data.lastUpdateModeCollectInterval !== null && typeof data.lastUpdateModeCollectInterval !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeCollectInterval)
      : null,
    lastUpdateTimeCollectInterval: (data.lastUpdateTimeCollectInterval !== null && typeof data.lastUpdateTimeCollectInterval !== 'undefined')
      ? tIME.encode(data.lastUpdateTimeCollectInterval)
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
      ? tIME.decode(data.lastUpdateTimeSid)
      : undefined,
    lastUpdateModeStatus: (data.lastUpdateModeStatus !== null && typeof data.lastUpdateModeStatus !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeStatus)
      : undefined,
    lastUpdateTimeStatus: (data.lastUpdateTimeStatus !== null && typeof data.lastUpdateTimeStatus !== 'undefined')
      ? tIME.decode(data.lastUpdateTimeStatus)
      : undefined,
    lastUpdateModeValidParamId: (data.lastUpdateModeValidParamId !== null && typeof data.lastUpdateModeValidParamId !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeValidParamId)
      : undefined,
    lastUpdateTimeValidParamId: (data.lastUpdateTimeValidParamId !== null && typeof data.lastUpdateTimeValidParamId !== 'undefined')
      ? tIME.decode(data.lastUpdateTimeValidParamId)
      : undefined,
    lastUpdateModeValidParamMask: (data.lastUpdateModeValidParamMask !== null && typeof data.lastUpdateModeValidParamMask !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeValidParamMask)
      : undefined,
    lastUpdateTimeValidParamMask: (data.lastUpdateTimeValidParamMask !== null && typeof data.lastUpdateTimeValidParamMask !== 'undefined')
      ? tIME.decode(data.lastUpdateTimeValidParamMask)
      : undefined,
    lastUpdateModeValidParamExpValue: (data.lastUpdateModeValidParamExpValue !== null && typeof data.lastUpdateModeValidParamExpValue !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeValidParamExpValue)
      : undefined,
    lastUpdateTimeValidParamExpValue: (data.lastUpdateTimeValidParamExpValue !== null && typeof data.lastUpdateTimeValidParamExpValue !== 'undefined')
      ? tIME.decode(data.lastUpdateTimeValidParamExpValue)
      : undefined,
    lastUpdateModeCollectInterval: (data.lastUpdateModeCollectInterval !== null && typeof data.lastUpdateModeCollectInterval !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeCollectInterval)
      : undefined,
    lastUpdateTimeCollectInterval: (data.lastUpdateTimeCollectInterval !== null && typeof data.lastUpdateTimeCollectInterval !== 'undefined')
      ? tIME.decode(data.lastUpdateTimeCollectInterval)
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
  }),
};
