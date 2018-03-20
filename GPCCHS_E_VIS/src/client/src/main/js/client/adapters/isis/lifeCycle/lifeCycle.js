// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _map = require('lodash/map');
const namedValue = require('../ccsds_mal/namedValue');
const tIME = require('../ccsds_mal/tIME');

module.exports = {
  encode: data => ({
    launchingParameters: _map(data.launchingParameters, d => (namedValue.encode(d))),
    launchingTime: (data.launchingTime !== null && typeof data.launchingTime !== 'undefined')
      ? tIME.encode(data.launchingTime)
      : null,
  }),
  decode: data => ({
    launchingParameters: _map(data.launchingParameters, d => (namedValue.decode(d))),
    launchingTime: (data.launchingTime !== null && typeof data.launchingTime !== 'undefined')
      ? tIME.decode(data.launchingTime)
      : undefined,
    referenceTimestamp: (data.launchingTime !== null && typeof data.launchingTime !== 'undefined')
        ? { type: 'time', value: data.launchingTime.value.toNumber() }
        : undefined,
  }),
};
