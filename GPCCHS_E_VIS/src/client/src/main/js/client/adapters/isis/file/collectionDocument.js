// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const bOOLEAN = require('../ccsds_mal/bOOLEAN');
const sTRING = require('../ccsds_mal/sTRING');
const uRI = require('../ccsds_mal/uRI');

module.exports = {
  encode: data => ({
    name: (data.name !== null && typeof data.name !== 'undefined')
      ? sTRING.encode(data.name)
      : null,
    version: (data.version !== null && typeof data.version !== 'undefined')
      ? sTRING.encode(data.version)
      : null,
    uri: (data.uri !== null && typeof data.uri !== 'undefined')
      ? uRI.encode(data.uri)
      : null,
    brokenLink: (data.brokenLink !== null && typeof data.brokenLink !== 'undefined')
      ? bOOLEAN.encode(data.brokenLink)
      : null,
  }),
  decode: data => ({
    name: (data.name !== null && typeof data.name !== 'undefined')
      ? sTRING.decode(data.name)
      : undefined,
    version: (data.version !== null && typeof data.version !== 'undefined')
      ? sTRING.decode(data.version)
      : undefined,
    uri: (data.uri !== null && typeof data.uri !== 'undefined')
      ? uRI.decode(data.uri)
      : undefined,
    brokenLink: (data.brokenLink !== null && typeof data.brokenLink !== 'undefined')
      ? bOOLEAN.decode(data.brokenLink)
      : undefined,
  }),
};
