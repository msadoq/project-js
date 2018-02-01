// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const flowConfiguration = require('./flowConfiguration');
const stationIdentifier = require('./stationIdentifier');

module.exports = {
  encode: data => ({
    identifier: (data.identifier !== null && typeof data.identifier !== 'undefined')
      ? stationIdentifier.encode(data.identifier)
      : null,
    configuration: (data.configuration !== null && typeof data.configuration !== 'undefined')
      ? flowConfiguration.encode(data.configuration)
      : null,
  }),
  decode: data => ({
    identifier: (data.identifier !== null && typeof data.identifier !== 'undefined')
      ? stationIdentifier.decode(data.identifier)
      : undefined,
    configuration: (data.configuration !== null && typeof data.configuration !== 'undefined')
      ? flowConfiguration.decode(data.configuration)
      : undefined,
  }),
};
