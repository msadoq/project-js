// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _map = require('lodash/map');
const activityRequest = require('./activityRequest');
const bLOB = require('../ccsds_mal/bLOB');
const functionalChain = require('./functionalChain');
const modeType = require('./modeType');
const sTRING = require('../ccsds_mal/sTRING');
const tIME = require('../ccsds_mal/tIME');

module.exports = {
  encode: data => ({
    functionalChains: _map(data.functionalChains, d => (bLOB.encode(functionalChain.encodeRaw(d)))),
    mode: (data.mode !== null && typeof data.mode !== 'undefined')
      ? data.mode
      : null,
    name: (data.name !== null && typeof data.name !== 'undefined')
      ? sTRING.encode(data.name)
      : null,
    activity: (data.activity !== null && typeof data.activity !== 'undefined')
      ? data.activity
      : null,
    creationDate: (data.creationDate !== null && typeof data.creationDate !== 'undefined')
      ? tIME.encode(data.creationDate)
      : null,
  }),
  decode: data => ({
    functionalChains: _map(data.functionalChains, d => (functionalChain.decodeRaw(bLOB.decode(d).value))),
    mode: (data.mode !== null && typeof data.mode !== 'undefined')
      ? { type: 'enum', value: data.mode, symbol: modeType[data.mode] }
      : undefined,
    name: (data.name !== null && typeof data.name !== 'undefined')
      ? sTRING.decode(data.name)
      : undefined,
    activity: (data.activity !== null && typeof data.activity !== 'undefined')
      ? { type: 'enum', value: data.activity, symbol: activityRequest[data.activity] }
      : undefined,
    creationDate: (data.creationDate !== null && typeof data.creationDate !== 'undefined')
      ? tIME.decode(data.creationDate)
      : undefined,
    referenceTimestamp: (data.creationDate !== null && typeof data.creationDate !== 'undefined')
        ? { type: 'time', value: data.creationDate.value.toNumber() }
        : undefined,
  }),
};
