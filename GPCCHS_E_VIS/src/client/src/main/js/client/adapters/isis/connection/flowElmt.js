// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _map = require('lodash/map');
const cUIdentifier = require('./cUIdentifier');
const flowIdentifier = require('./flowIdentifier');
const processIdentifier = require('./processIdentifier');

module.exports = {
  encode: data => ({
    flowIdentifier: (data.flowIdentifier !== null && typeof data.flowIdentifier !== 'undefined')
      ? flowIdentifier.encode(data.flowIdentifier)
      : null,
    cUIdentifiers: _map(data.cUIdentifiers, d => (cUIdentifier.encode(d))),
    processIdentifiers: _map(data.processIdentifiers, d => (processIdentifier.encode(d))),
  }),
  decode: data => ({
    flowIdentifier: (data.flowIdentifier !== null && typeof data.flowIdentifier !== 'undefined')
      ? flowIdentifier.decode(data.flowIdentifier)
      : undefined,
    cUIdentifiers: _map(data.cUIdentifiers, d => (cUIdentifier.decode(d))),
    processIdentifiers: _map(data.processIdentifiers, d => (processIdentifier.decode(d))),
  }),
};
