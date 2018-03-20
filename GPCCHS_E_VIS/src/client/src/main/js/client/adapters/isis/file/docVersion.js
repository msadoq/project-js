// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _map = require('lodash/map');
const bOOLEAN = require('../ccsds_mal/bOOLEAN');
const namedValue = require('../ccsds_mal/namedValue');
const sTRING = require('../ccsds_mal/sTRING');
const uLONG = require('../ccsds_mal/uLONG');
const uRI = require('../ccsds_mal/uRI');

module.exports = {
  encode: data => ({
    externalVersion: (data.externalVersion !== null && typeof data.externalVersion !== 'undefined')
      ? sTRING.encode(data.externalVersion)
      : null,
    internalVersion: (data.internalVersion !== null && typeof data.internalVersion !== 'undefined')
      ? uLONG.encode(data.internalVersion)
      : null,
    properties: _map(data.properties, d => (namedValue.encode(d))),
    isVirtualVersion: (data.isVirtualVersion !== null && typeof data.isVirtualVersion !== 'undefined')
      ? bOOLEAN.encode(data.isVirtualVersion)
      : null,
    dirname: (data.dirname !== null && typeof data.dirname !== 'undefined')
      ? uRI.encode(data.dirname)
      : null,
    basename: (data.basename !== null && typeof data.basename !== 'undefined')
      ? sTRING.encode(data.basename)
      : null,
  }),
  decode: data => ({
    externalVersion: (data.externalVersion !== null && typeof data.externalVersion !== 'undefined')
      ? sTRING.decode(data.externalVersion)
      : undefined,
    internalVersion: (data.internalVersion !== null && typeof data.internalVersion !== 'undefined')
      ? uLONG.decode(data.internalVersion)
      : undefined,
    properties: _map(data.properties, d => (namedValue.decode(d))),
    isVirtualVersion: (data.isVirtualVersion !== null && typeof data.isVirtualVersion !== 'undefined')
      ? bOOLEAN.decode(data.isVirtualVersion)
      : undefined,
    dirname: (data.dirname !== null && typeof data.dirname !== 'undefined')
      ? uRI.decode(data.dirname)
      : undefined,
    basename: (data.basename !== null && typeof data.basename !== 'undefined')
      ? sTRING.decode(data.basename)
      : undefined,
  }),
};
