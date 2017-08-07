// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _map = require('lodash/map');
const sTRING = require('../ccsds_mal/sTRING');

module.exports = {
  encode: data => ({
    operationName: (data.operationName !== null && typeof data.operationName !== 'undefined')
      ? sTRING.encode(data.operationName)
      : null,
    parameters: _map(data.parameters, d => (sTRING.encode(d))),
  }),
  decode: data => ({
    operationName: (data.operationName !== null && typeof data.operationName !== 'undefined')
      ? sTRING.decode(data.operationName)
      : undefined,
    parameters: _map(data.parameters, d => (sTRING.decode(d))),
  }),
};
