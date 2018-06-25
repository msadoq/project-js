// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const bOOLEAN = require('../ccsds_mal/bOOLEAN');
const sTRING = require('../ccsds_mal/sTRING');
const uLONG = require('../ccsds_mal/uLONG');
const uRI = require('../ccsds_mal/uRI');

module.exports = {
  encode: data => ({
    name: (data.name !== null && typeof data.name !== 'undefined')
      ? sTRING.encode(data.name)
      : null,
    externalVersion: (data.externalVersion !== null && typeof data.externalVersion !== 'undefined')
      ? sTRING.encode(data.externalVersion)
      : null,
    internalVersion: (data.internalVersion !== null && typeof data.internalVersion !== 'undefined')
      ? uLONG.encode(data.internalVersion)
      : null,
    uri: (data.uri !== null && typeof data.uri !== 'undefined')
      ? uRI.encode(data.uri)
      : null,
    brokenLink: (data.brokenLink !== null && typeof data.brokenLink !== 'undefined')
      ? bOOLEAN.encode(data.brokenLink)
      : null,
    isVersion: (data.isVersion !== null && typeof data.isVersion !== 'undefined')
      ? bOOLEAN.encode(data.isVersion)
      : null,
  }),
  decode: data => ({
    name: (data.name !== null && typeof data.name !== 'undefined')
      ? sTRING.decode(data.name)
      : undefined,
    externalVersion: (data.externalVersion !== null && typeof data.externalVersion !== 'undefined')
      ? sTRING.decode(data.externalVersion)
      : undefined,
    internalVersion: (data.internalVersion !== null && typeof data.internalVersion !== 'undefined')
      ? uLONG.decode(data.internalVersion)
      : undefined,
    uri: (data.uri !== null && typeof data.uri !== 'undefined')
      ? uRI.decode(data.uri)
      : undefined,
    brokenLink: (data.brokenLink !== null && typeof data.brokenLink !== 'undefined')
      ? bOOLEAN.decode(data.brokenLink)
      : undefined,
    isVersion: (data.isVersion !== null && typeof data.isVersion !== 'undefined')
      ? bOOLEAN.decode(data.isVersion)
      : undefined,
  }),
};
