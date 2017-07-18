// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _map = require('lodash/map');
const encodedValue = require('./encodedValue');
const uINTEGER = require('../ccsds_mal/uINTEGER');

module.exports = {
  encode: data => ({
    encodedValues: _map(data.encodedValues, d => (encodedValue.encode(d))),
    largeSequenceCount: (data.largeSequenceCount !== null && typeof data.largeSequenceCount !== 'undefined')
      ? uINTEGER.encode(data.largeSequenceCount)
      : null,
  }),
  decode: data => ({
    encodedValues: _map(data.encodedValues, d => (encodedValue.decode(d))),
    largeSequenceCount: (data.largeSequenceCount !== null && typeof data.largeSequenceCount !== 'undefined')
      ? uINTEGER.decode(data.largeSequenceCount)
      : undefined,
  }),
};
