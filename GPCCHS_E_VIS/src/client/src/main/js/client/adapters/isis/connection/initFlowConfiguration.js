// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const flowConfiguration = require('./flowConfiguration');
const flowIdentifier = require('./flowIdentifier');

module.exports = {
  encode: data => ({
    configuration: (data.configuration !== null && typeof data.configuration !== 'undefined')
      ? flowConfiguration.encode(data.configuration)
      : null,
    identifier: (data.identifier !== null && typeof data.identifier !== 'undefined')
      ? flowIdentifier.encode(data.identifier)
      : null,
  }),
  decode: data => ({
    configuration: (data.configuration !== null && typeof data.configuration !== 'undefined')
      ? flowConfiguration.decode(data.configuration)
      : undefined,
    identifier: (data.identifier !== null && typeof data.identifier !== 'undefined')
      ? flowIdentifier.decode(data.identifier)
      : undefined,
  }),
};
