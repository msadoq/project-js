// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const bOOLEAN = require('../ccsds_mal/bOOLEAN');
const pusElement = require('./pusElement');
const sTRING = require('../ccsds_mal/sTRING');
const uINTEGER = require('../ccsds_mal/uINTEGER');

module.exports = {
  encode: data => ({
    apid: (data.apid !== null && typeof data.apid !== 'undefined')
      ? uINTEGER.encode(data.apid)
      : null,
    serviceType: (data.serviceType !== null && typeof data.serviceType !== 'undefined')
      ? uINTEGER.encode(data.serviceType)
      : null,
    serviceSubType: (data.serviceSubType !== null && typeof data.serviceSubType !== 'undefined')
      ? uINTEGER.encode(data.serviceSubType)
      : null,
    sid: (data.sid !== null && typeof data.sid !== 'undefined')
      ? uINTEGER.encode(data.sid)
      : null,
    subsamplingRatio: (data.subsamplingRatio !== null && typeof data.subsamplingRatio !== 'undefined')
      ? uINTEGER.encode(data.subsamplingRatio)
      : null,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.encode(data.pusElement)
      : null,
    packetType: (data.packetType !== null && typeof data.packetType !== 'undefined')
      ? uINTEGER.encode(data.packetType)
      : null,
    sidLabel: (data.sidLabel !== null && typeof data.sidLabel !== 'undefined')
      ? sTRING.encode(data.sidLabel)
      : null,
    isSubsamplingRatioSet: (data.isSubsamplingRatioSet !== null && typeof data.isSubsamplingRatioSet !== 'undefined')
      ? bOOLEAN.encode(data.isSubsamplingRatioSet)
      : null,
  }),
  decode: data => ({
    apid: (data.apid !== null && typeof data.apid !== 'undefined')
      ? uINTEGER.decode(data.apid)
      : undefined,
    serviceType: (data.serviceType !== null && typeof data.serviceType !== 'undefined')
      ? uINTEGER.decode(data.serviceType)
      : undefined,
    serviceSubType: (data.serviceSubType !== null && typeof data.serviceSubType !== 'undefined')
      ? uINTEGER.decode(data.serviceSubType)
      : undefined,
    sid: (data.sid !== null && typeof data.sid !== 'undefined')
      ? uINTEGER.decode(data.sid)
      : undefined,
    subsamplingRatio: (data.subsamplingRatio !== null && typeof data.subsamplingRatio !== 'undefined')
      ? uINTEGER.decode(data.subsamplingRatio)
      : undefined,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.decode(data.pusElement)
      : undefined,
    packetType: (data.packetType !== null && typeof data.packetType !== 'undefined')
      ? uINTEGER.decode(data.packetType)
      : undefined,
    sidLabel: (data.sidLabel !== null && typeof data.sidLabel !== 'undefined')
      ? sTRING.decode(data.sidLabel)
      : undefined,
    isSubsamplingRatioSet: (data.isSubsamplingRatioSet !== null && typeof data.isSubsamplingRatioSet !== 'undefined')
      ? bOOLEAN.decode(data.isSubsamplingRatioSet)
      : undefined,
  }),
};
