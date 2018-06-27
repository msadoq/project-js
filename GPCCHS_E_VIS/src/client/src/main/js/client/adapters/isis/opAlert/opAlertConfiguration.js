// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const dURATION = require('../ccsds_mal/dURATION');
const iDENTIFIER = require('../ccsds_mal/iDENTIFIER');
const iNTEGER = require('../ccsds_mal/iNTEGER');

module.exports = {
  encode: data => ({
    maxNumberRetriesPhone: (data.maxNumberRetriesPhone !== null && typeof data.maxNumberRetriesPhone !== 'undefined')
      ? iNTEGER.encode(data.maxNumberRetriesPhone)
      : null,
    delayRetriesPhone: (data.delayRetriesPhone !== null && typeof data.delayRetriesPhone !== 'undefined')
      ? dURATION.encode(data.delayRetriesPhone)
      : null,
    maxNumberRetriesAudio: (data.maxNumberRetriesAudio !== null && typeof data.maxNumberRetriesAudio !== 'undefined')
      ? iDENTIFIER.encode(data.maxNumberRetriesAudio)
      : null,
    delayRetriesAudio: (data.delayRetriesAudio !== null && typeof data.delayRetriesAudio !== 'undefined')
      ? dURATION.encode(data.delayRetriesAudio)
      : null,
    maxNumberRetriesEmail: (data.maxNumberRetriesEmail !== null && typeof data.maxNumberRetriesEmail !== 'undefined')
      ? iNTEGER.encode(data.maxNumberRetriesEmail)
      : null,
    delayRetriesEmail: (data.delayRetriesEmail !== null && typeof data.delayRetriesEmail !== 'undefined')
      ? dURATION.encode(data.delayRetriesEmail)
      : null,
    maxNumberRetriesSms: (data.maxNumberRetriesSms !== null && typeof data.maxNumberRetriesSms !== 'undefined')
      ? iNTEGER.encode(data.maxNumberRetriesSms)
      : null,
    delayRetriesSms: (data.delayRetriesSms !== null && typeof data.delayRetriesSms !== 'undefined')
      ? dURATION.encode(data.delayRetriesSms)
      : null,
  }),
  decode: data => ({
    maxNumberRetriesPhone: (data.maxNumberRetriesPhone !== null && typeof data.maxNumberRetriesPhone !== 'undefined')
      ? iNTEGER.decode(data.maxNumberRetriesPhone)
      : undefined,
    delayRetriesPhone: (data.delayRetriesPhone !== null && typeof data.delayRetriesPhone !== 'undefined')
      ? dURATION.decode(data.delayRetriesPhone)
      : undefined,
    maxNumberRetriesAudio: (data.maxNumberRetriesAudio !== null && typeof data.maxNumberRetriesAudio !== 'undefined')
      ? iDENTIFIER.decode(data.maxNumberRetriesAudio)
      : undefined,
    delayRetriesAudio: (data.delayRetriesAudio !== null && typeof data.delayRetriesAudio !== 'undefined')
      ? dURATION.decode(data.delayRetriesAudio)
      : undefined,
    maxNumberRetriesEmail: (data.maxNumberRetriesEmail !== null && typeof data.maxNumberRetriesEmail !== 'undefined')
      ? iNTEGER.decode(data.maxNumberRetriesEmail)
      : undefined,
    delayRetriesEmail: (data.delayRetriesEmail !== null && typeof data.delayRetriesEmail !== 'undefined')
      ? dURATION.decode(data.delayRetriesEmail)
      : undefined,
    maxNumberRetriesSms: (data.maxNumberRetriesSms !== null && typeof data.maxNumberRetriesSms !== 'undefined')
      ? iNTEGER.decode(data.maxNumberRetriesSms)
      : undefined,
    delayRetriesSms: (data.delayRetriesSms !== null && typeof data.delayRetriesSms !== 'undefined')
      ? dURATION.decode(data.delayRetriesSms)
      : undefined,
  }),
};
