// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const pus014ForwardedPacket = require('./pus014ForwardedPacket');
const uINTEGER = require('../ccsds_mal/uINTEGER');

module.exports = {
  encode: data => ({
    serviceTpe: (data.serviceTpe !== null && typeof data.serviceTpe !== 'undefined')
      ? uINTEGER.encode(data.serviceTpe)
      : null,
    serviceSubType: (data.serviceSubType !== null && typeof data.serviceSubType !== 'undefined')
      ? uINTEGER.encode(data.serviceSubType)
      : null,
    pus014ForwardedPacket: (data.pus014ForwardedPacket !== null && typeof data.pus014ForwardedPacket !== 'undefined')
      ? pus014ForwardedPacket.encode(data.pus014ForwardedPacket)
      : null,
  }),
  decode: data => ({
    serviceTpe: (data.serviceTpe !== null && typeof data.serviceTpe !== 'undefined')
      ? uINTEGER.decode(data.serviceTpe)
      : undefined,
    serviceSubType: (data.serviceSubType !== null && typeof data.serviceSubType !== 'undefined')
      ? uINTEGER.decode(data.serviceSubType)
      : undefined,
    pus014ForwardedPacket: (data.pus014ForwardedPacket !== null && typeof data.pus014ForwardedPacket !== 'undefined')
      ? pus014ForwardedPacket.decode(data.pus014ForwardedPacket)
      : undefined,
  }),
};
