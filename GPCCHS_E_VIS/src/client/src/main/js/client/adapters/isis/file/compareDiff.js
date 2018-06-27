// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _map = require('lodash/map');
const bOOLEAN = require('../ccsds_mal/bOOLEAN');
const compareDiffParameter = require('./compareDiffParameter');

module.exports = {
  encode: data => ({
    fileDifference: (data.fileDifference !== null && typeof data.fileDifference !== 'undefined')
      ? bOOLEAN.encode(data.fileDifference)
      : null,
    documentProperties: _map(data.documentProperties, d => (compareDiffParameter.encode(d))),
    versionProperties: _map(data.versionProperties, d => (compareDiffParameter.encode(d))),
  }),
  decode: data => ({
    fileDifference: (data.fileDifference !== null && typeof data.fileDifference !== 'undefined')
      ? bOOLEAN.decode(data.fileDifference)
      : undefined,
    documentProperties: _map(data.documentProperties, d => (compareDiffParameter.decode(d))),
    versionProperties: _map(data.versionProperties, d => (compareDiffParameter.decode(d))),
  }),
};
