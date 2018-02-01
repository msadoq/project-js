// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const bOOLEAN = require('../ccsds_mal/bOOLEAN');
const stationIdentifier = require('./stationIdentifier');

module.exports = {
  encode: data => ({
    identifier: (data.identifier !== null && typeof data.identifier !== 'undefined')
      ? stationIdentifier.encode(data.identifier)
      : null,
    nominal: (data.nominal !== null && typeof data.nominal !== 'undefined')
      ? bOOLEAN.encode(data.nominal)
      : null,
  }),
  decode: data => ({
    identifier: (data.identifier !== null && typeof data.identifier !== 'undefined')
      ? stationIdentifier.decode(data.identifier)
      : undefined,
    nominal: (data.nominal !== null && typeof data.nominal !== 'undefined')
      ? bOOLEAN.decode(data.nominal)
      : undefined,
  }),
};
