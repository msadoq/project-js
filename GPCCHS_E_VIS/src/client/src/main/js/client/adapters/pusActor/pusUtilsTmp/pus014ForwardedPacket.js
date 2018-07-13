const uINTEGER = require('../ccsds_mal/uINTEGER');
const sTRING = require('../ccsds_mal/sTRING');
const uLONG = require('../ccsds_mal/uLONG');

module.exports = {
  encode: data => ({
    packetApid: (data.packetApid !== null && typeof data.packetApid !== 'undefined')
      ? uINTEGER.encode(data.packetApid)
      : null,
    forwardingStatus: (data.forwardingStatus !== null && typeof data.forwardingStatus !== 'undefined')
      ? uINTEGER.encode(data.forwardingStatus)
      : null,
    lastUpdateModeFwdStatus: (data.lastUpdateModeFwdStatus !== null && typeof data.lastUpdateModeFwdStatus !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeFwdStatus)
      : null,
    lastUpdateTimeFwdStatus: (data.lastUpdateTimeFwdStatus !== null && typeof data.lastUpdateTimeFwdStatus !== 'undefined')
      ? sTRING.encode(data.lastUpdateTimeFwdStatus)
      : null,
    packetApidName: (data.packetApidName !== null && typeof data.packetApidName !== 'undefined')
      ? sTRING.encode(data.packetApidName)
      : null,
    serviceApid: (data.serviceApid !== null && typeof data.serviceApid !== 'undefined')
      ? uINTEGER.encode(data.serviceApid)
      : null,
    packetName: (data.packetName !== null && typeof data.packetName !== 'undefined')
      ? sTRING.encode(data.packetName)
      : null,
    serviceApidName: (data.serviceApidName !== null && typeof data.serviceApidName !== 'undefined')
      ? sTRING.encode(data.serviceApidName)
      : null,
    lastUpdateModeRid: (data.lastUpdateModeRid !== null && typeof data.lastUpdateModeRid !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeRid)
      : null,
    lastUpdateTimeRid: (data.lastUpdateTimeRid !== null && typeof data.lastUpdateTimeRid !== 'undefined')
      ? sTRING.encode(data.lastUpdateTimeRid)
      : null,
    rid: (data.rid !== null && typeof data.rid !== 'undefined')
      ? uINTEGER.encode(data.rid)
      : null,
    ridLabel: (data.ridLabel !== null && typeof data.ridLabel !== 'undefined')
      ? sTRING.encode(data.ridLabel)
      : null,
    lastUpdateModeSid: (data.lastUpdateModeSid !== null && typeof data.lastUpdateModeSid !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeSid)
      : null,
    lastUpdateTimeSid: (data.lastUpdateTimeSid !== null && typeof data.lastUpdateTimeSid !== 'undefined')
      ? sTRING.encode(data.lastUpdateTimeSid)
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
    sid: (data.sid !== null && typeof data.sid !== 'undefined')
      ? uINTEGER.encode(data.sid)
      : null,
    sidLabel: (data.sidLabel !== null && typeof data.sidLabel !== 'undefined')
      ? sTRING.encode(data.sidLabel)
      : null,
    lastUpdateModeTypeSubType: (data.lastUpdateModeTypeSubType !== null && typeof data.lastUpdateModeTypeSubType !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeTypeSubType)
      : null,
    lastUpdateTimeTypeSubType: (data.lastUpdateTimeTypeSubType !== null && typeof data.lastUpdateTimeTypeSubType !== 'undefined')
      ? sTRING.encode(data.lastUpdateTimeTypeSubType)
      : null,
    serviceTpe: (data.serviceTpe !== null && typeof data.serviceTpe !== 'undefined')
      ? uINTEGER.encode(data.serviceTpe)
      : null,
    serviceSubType: (data.serviceSubType !== null && typeof data.serviceSubType !== 'undefined')
      ? uINTEGER.encode(data.serviceSubType)
      : null,
    uniqueId: (data.uniqueId !== null && typeof data.uniqueId !== 'undefined')
      ? uLONG.encode(data.uniqueId)
      : null,
  }),
  decode: data => ({
    packetApid: (data.packetApid !== null && typeof data.packetApid !== 'undefined')
      ? uINTEGER.decode(data.packetApid)
      : undefined,
    forwardingStatus: (data.forwardingStatus !== null && typeof data.forwardingStatus !== 'undefined')
      ? uINTEGER.decode(data.forwardingStatus)
      : undefined,
    lastUpdateModeFwdStatus: (data.lastUpdateModeFwdStatus !== null && typeof data.lastUpdateModeFwdStatus !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeFwdStatus)
      : undefined,
    lastUpdateTimeFwdStatus: (data.lastUpdateTimeFwdStatus !== null && typeof data.lastUpdateTimeFwdStatus !== 'undefined')
      ? sTRING.decode(data.lastUpdateTimeFwdStatus)
      : undefined,
    packetApidName: (data.packetApidName !== null && typeof data.packetApidName !== 'undefined')
      ? sTRING.decode(data.packetApidName)
      : undefined,
    serviceApid: (data.serviceApid !== null && typeof data.serviceApid !== 'undefined')
      ? uINTEGER.decode(data.serviceApid)
      : undefined,
    packetName: (data.packetName !== null && typeof data.packetName !== 'undefined')
      ? sTRING.decode(data.packetName)
      : undefined,
    serviceApidName: (data.serviceApidName !== null && typeof data.serviceApidName !== 'undefined')
      ? sTRING.decode(data.serviceApidName)
      : undefined,
    lastUpdateModeRid: (data.lastUpdateModeRid !== null && typeof data.lastUpdateModeRid !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeRid)
      : undefined,
    lastUpdateTimeRid: (data.lastUpdateTimeRid !== null && typeof data.lastUpdateTimeRid !== 'undefined')
      ? sTRING.decode(data.lastUpdateTimeRid)
      : undefined,
    rid: (data.rid !== null && typeof data.rid !== 'undefined')
      ? uINTEGER.decode(data.rid)
      : undefined,
    ridLabel: (data.ridLabel !== null && typeof data.ridLabel !== 'undefined')
      ? sTRING.decode(data.ridLabel)
      : undefined,
    lastUpdateModeSid: (data.lastUpdateModeSid !== null && typeof data.lastUpdateModeSid !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeSid)
      : undefined,
    lastUpdateTimeSid: (data.lastUpdateTimeSid !== null && typeof data.lastUpdateTimeSid !== 'undefined')
      ? sTRING.decode(data.lastUpdateTimeSid)
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
    sid: (data.sid !== null && typeof data.sid !== 'undefined')
      ? uINTEGER.decode(data.sid)
      : undefined,
    sidLabel: (data.sidLabel !== null && typeof data.sidLabel !== 'undefined')
      ? sTRING.decode(data.sidLabel)
      : undefined,
    lastUpdateModeTypeSubType: (data.lastUpdateModeTypeSubType !== null && typeof data.lastUpdateModeTypeSubType !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeTypeSubType)
      : undefined,
    lastUpdateTimeTypeSubType: (data.lastUpdateTimeTypeSubType !== null && typeof data.lastUpdateTimeTypeSubType !== 'undefined')
      ? sTRING.decode(data.lastUpdateTimeTypeSubType)
      : undefined,
    serviceTpe: (data.serviceTpe !== null && typeof data.serviceTpe !== 'undefined')
      ? uINTEGER.decode(data.serviceTpe)
      : undefined,
    serviceSubType: (data.serviceSubType !== null && typeof data.serviceSubType !== 'undefined')
      ? uINTEGER.decode(data.serviceSubType)
      : undefined,
    uniqueId: (data.uniqueId !== null && typeof data.uniqueId !== 'undefined')
      ? uLONG.decode(data.uniqueId)
      : undefined,
  }),
};
