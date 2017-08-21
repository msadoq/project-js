// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _map = require('lodash/map');
const iDENTIFIER = require('../ccsds_mal/iDENTIFIER');
const namedValue = require('../ccsds_mal/namedValue');

module.exports = {
  encode: data => ({
    name: (data.name !== null && typeof data.name !== 'undefined')
      ? iDENTIFIER.encode(data.name)
      : null,
    pattern: _map(data.pattern, d => (namedValue.encode(d))),
  }),
  decode: data => ({
    name: (data.name !== null && typeof data.name !== 'undefined')
      ? iDENTIFIER.decode(data.name)
      : undefined,
    pattern: _map(data.pattern, d => (namedValue.decode(d))),
  }),
};
