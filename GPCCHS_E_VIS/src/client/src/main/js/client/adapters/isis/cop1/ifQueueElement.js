// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _map = require('lodash/map');
const bLOB = require('../ccsds_mal/bLOB');
const fLOAT = require('../ccsds_mal/fLOAT');
const iNTEGER = require('../ccsds_mal/iNTEGER');
const ifQueueUnit = require('./ifQueueUnit');
const sTRING = require('../ccsds_mal/sTRING');

module.exports = {
  encode: data => ({
    number: (data.number !== null && typeof data.number !== 'undefined')
      ? iNTEGER.encode(data.number)
      : null,
    reemission_delay: (data.reemission_delay !== null && typeof data.reemission_delay !== 'undefined')
      ? fLOAT.encode(data.reemission_delay)
      : null,
    date: (data.date !== null && typeof data.date !== 'undefined')
      ? sTRING.encode(data.date)
      : null,
    segment_data: (data.segment_data !== null && typeof data.segment_data !== 'undefined')
      ? bLOB.encode(data.segment_data)
      : null,
    index: (data.index !== null && typeof data.index !== 'undefined')
      ? iNTEGER.encode(data.index)
      : null,
    priority: (data.priority !== null && typeof data.priority !== 'undefined')
      ? iNTEGER.encode(data.priority)
      : null,
    units: _map(data.units, d => (ifQueueUnit.encode(d))),
  }),
  decode: data => ({
    number: (data.number !== null && typeof data.number !== 'undefined')
      ? iNTEGER.decode(data.number)
      : undefined,
    reemission_delay: (data.reemission_delay !== null && typeof data.reemission_delay !== 'undefined')
      ? fLOAT.decode(data.reemission_delay)
      : undefined,
    date: (data.date !== null && typeof data.date !== 'undefined')
      ? sTRING.decode(data.date)
      : undefined,
    segment_data: (data.segment_data !== null && typeof data.segment_data !== 'undefined')
      ? bLOB.decode(data.segment_data)
      : undefined,
    index: (data.index !== null && typeof data.index !== 'undefined')
      ? iNTEGER.decode(data.index)
      : undefined,
    priority: (data.priority !== null && typeof data.priority !== 'undefined')
      ? iNTEGER.decode(data.priority)
      : undefined,
    units: _map(data.units, d => (ifQueueUnit.decode(d))),
  }),
};
