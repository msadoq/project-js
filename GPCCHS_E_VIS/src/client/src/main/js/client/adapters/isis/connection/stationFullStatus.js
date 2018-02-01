// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const stationIdentifier = require('./stationIdentifier');
const stationStatus = require('./stationStatus');

module.exports = {
  encode: data => ({
    identifier: (data.identifier !== null && typeof data.identifier !== 'undefined')
      ? stationIdentifier.encode(data.identifier)
      : null,
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? stationStatus.encode(data.status)
      : null,
  }),
  decode: data => ({
    identifier: (data.identifier !== null && typeof data.identifier !== 'undefined')
      ? stationIdentifier.decode(data.identifier)
      : undefined,
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? stationStatus.decode(data.status)
      : undefined,
  }),
};
