// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const pus014ForwardedPacket = require('./pus014ForwardedPacket');
const tIME = require('../ccsds_mal/tIME');
const uINTEGER = require('../ccsds_mal/uINTEGER');
const uOCTET = require('../ccsds_mal/uOCTET');

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
    lastUpdateModeTypeSubType: (data.lastUpdateModeTypeSubType !== null && typeof data.lastUpdateModeTypeSubType !== 'undefined')
      ? uOCTET.encode(data.lastUpdateModeTypeSubType)
      : null,
    lastUpdateTimeTypeSubType: (data.lastUpdateTimeTypeSubType !== null && typeof data.lastUpdateTimeTypeSubType !== 'undefined')
      ? tIME.encode(data.lastUpdateTimeTypeSubType)
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
    lastUpdateModeTypeSubType: (data.lastUpdateModeTypeSubType !== null && typeof data.lastUpdateModeTypeSubType !== 'undefined')
      ? uOCTET.decode(data.lastUpdateModeTypeSubType)
      : undefined,
    lastUpdateTimeTypeSubType: (data.lastUpdateTimeTypeSubType !== null && typeof data.lastUpdateTimeTypeSubType !== 'undefined')
      ? tIME.decode(data.lastUpdateTimeTypeSubType)
      : undefined,
  }),
};
