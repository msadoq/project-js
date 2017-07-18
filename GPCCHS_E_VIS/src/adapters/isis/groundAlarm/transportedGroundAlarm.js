// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _map = require('lodash/map');
const bOOLEAN = require('../ccsds_mal/bOOLEAN');
const lONG = require('../ccsds_mal/lONG');
const transition = require('./transition');

module.exports = {
  encode: data => ({
    transitions: _map(data.transitions, d => (transition.encode(d))),
    hasAckRequest: (data.hasAckRequest !== null && typeof data.hasAckRequest !== 'undefined')
      ? bOOLEAN.encode(data.hasAckRequest)
      : null,
    paramUid: (data.paramUid !== null && typeof data.paramUid !== 'undefined')
      ? lONG.encode(data.paramUid)
      : null,
  }),
  decode: data => ({
    transitions: _map(data.transitions, d => (transition.decode(d))),
    hasAckRequest: (data.hasAckRequest !== null && typeof data.hasAckRequest !== 'undefined')
      ? bOOLEAN.decode(data.hasAckRequest)
      : undefined,
    paramUid: (data.paramUid !== null && typeof data.paramUid !== 'undefined')
      ? lONG.decode(data.paramUid)
      : undefined,
  }),
};
