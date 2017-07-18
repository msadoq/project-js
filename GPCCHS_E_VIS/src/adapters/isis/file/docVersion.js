// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _map = require('lodash/map');
const aTTRIBUTE = require('../ccsds_mal/aTTRIBUTE');
const namedValue = require('../ccsds_mal/namedValue');
const sTRING = require('../ccsds_mal/sTRING');
const uSHORT = require('../ccsds_mal/uSHORT');

module.exports = {
  encode: data => ({
    externalVersion: (data.externalVersion !== null && typeof data.externalVersion !== 'undefined')
      ? sTRING.encode(data.externalVersion)
      : null,
    internalVersion: (data.internalVersion !== null && typeof data.internalVersion !== 'undefined')
      ? uSHORT.encode(data.internalVersion)
      : null,
    properties: _map(data.properties, d => (namedValue.encode(d))),
    content: (data.content !== null && typeof data.content !== 'undefined')
      ? aTTRIBUTE.encode(data.content)
      : null,
  }),
  decode: data => ({
    externalVersion: (data.externalVersion !== null && typeof data.externalVersion !== 'undefined')
      ? sTRING.decode(data.externalVersion)
      : undefined,
    internalVersion: (data.internalVersion !== null && typeof data.internalVersion !== 'undefined')
      ? uSHORT.decode(data.internalVersion)
      : undefined,
    properties: _map(data.properties, d => (namedValue.decode(d))),
    content: (data.content !== null && typeof data.content !== 'undefined')
      ? aTTRIBUTE.decode(data.content)
      : undefined,
  }),
};
