// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const pusElement = require('./pusElement');
const sTRING = require('../ccsds_mal/sTRING');
const uINTEGER = require('../ccsds_mal/uINTEGER');

module.exports = {
  encode: data => ({
    apid: (data.apid !== null && typeof data.apid !== 'undefined')
      ? uINTEGER.encode(data.apid)
      : null,
    serviceTpe: (data.serviceTpe !== null && typeof data.serviceTpe !== 'undefined')
      ? uINTEGER.encode(data.serviceTpe)
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
  }),
  decode: data => ({
    apid: (data.apid !== null && typeof data.apid !== 'undefined')
      ? uINTEGER.decode(data.apid)
      : undefined,
    serviceTpe: (data.serviceTpe !== null && typeof data.serviceTpe !== 'undefined')
      ? uINTEGER.decode(data.serviceTpe)
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
  }),
};
