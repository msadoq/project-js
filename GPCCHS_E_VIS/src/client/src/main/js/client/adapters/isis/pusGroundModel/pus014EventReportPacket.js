// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const pus014ForwardedPacket = require('./pus014ForwardedPacket');
const sTRING = require('../ccsds_mal/sTRING');
const uINTEGER = require('../ccsds_mal/uINTEGER');

module.exports = {
  encode: data => ({
    rid: (data.rid !== null && typeof data.rid !== 'undefined')
      ? uINTEGER.encode(data.rid)
      : null,
    pus014ForwardedPacket: (data.pus014ForwardedPacket !== null && typeof data.pus014ForwardedPacket !== 'undefined')
      ? pus014ForwardedPacket.encode(data.pus014ForwardedPacket)
      : null,
    ridLabel: (data.ridLabel !== null && typeof data.ridLabel !== 'undefined')
      ? sTRING.encode(data.ridLabel)
      : null,
  }),
  decode: data => ({
    rid: (data.rid !== null && typeof data.rid !== 'undefined')
      ? uINTEGER.decode(data.rid)
      : undefined,
    pus014ForwardedPacket: (data.pus014ForwardedPacket !== null && typeof data.pus014ForwardedPacket !== 'undefined')
      ? pus014ForwardedPacket.decode(data.pus014ForwardedPacket)
      : undefined,
    ridLabel: (data.ridLabel !== null && typeof data.ridLabel !== 'undefined')
      ? sTRING.decode(data.ridLabel)
      : undefined,
  }),
};
