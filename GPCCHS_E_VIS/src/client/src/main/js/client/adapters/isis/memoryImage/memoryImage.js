// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _map = require('lodash/map');
const binaryData = require('./binaryData');
const mAP = require('./mAP');

module.exports = {
  encode: data => ({
    map: (data.map !== null && typeof data.map !== 'undefined')
      ? mAP.encode(data.map)
      : null,
    binaryData: _map(data.binaryData, d => (binaryData.encode(d))),
  }),
  decode: data => ({
    map: (data.map !== null && typeof data.map !== 'undefined')
      ? mAP.decode(data.map)
      : undefined,
    binaryData: _map(data.binaryData, d => (binaryData.decode(d))),
  }),
};
