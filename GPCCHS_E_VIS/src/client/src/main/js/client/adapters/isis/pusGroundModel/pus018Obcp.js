// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _map = require('lodash/map');
const pusElement = require('./pusElement');
const pusParameter = require('./pusParameter');
const sTRING = require('../ccsds_mal/sTRING');
const uINTEGER = require('../ccsds_mal/uINTEGER');

module.exports = {
  encode: data => ({
    id: (data.id !== null && typeof data.id !== 'undefined')
      ? uINTEGER.encode(data.id)
      : null,
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? sTRING.encode(data.status)
      : null,
    stepId: (data.stepId !== null && typeof data.stepId !== 'undefined')
      ? sTRING.encode(data.stepId)
      : null,
    partitionId: (data.partitionId !== null && typeof data.partitionId !== 'undefined')
      ? sTRING.encode(data.partitionId)
      : null,
    observabilityLevel: (data.observabilityLevel !== null && typeof data.observabilityLevel !== 'undefined')
      ? sTRING.encode(data.observabilityLevel)
      : null,
    priority: (data.priority !== null && typeof data.priority !== 'undefined')
      ? sTRING.encode(data.priority)
      : null,
    pus18Parameter: _map(data.pus18Parameter, d => (pusParameter.encode(d))),
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.encode(data.pusElement)
      : null,
  }),
  decode: data => ({
    id: (data.id !== null && typeof data.id !== 'undefined')
      ? uINTEGER.decode(data.id)
      : undefined,
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? sTRING.decode(data.status)
      : undefined,
    stepId: (data.stepId !== null && typeof data.stepId !== 'undefined')
      ? sTRING.decode(data.stepId)
      : undefined,
    partitionId: (data.partitionId !== null && typeof data.partitionId !== 'undefined')
      ? sTRING.decode(data.partitionId)
      : undefined,
    observabilityLevel: (data.observabilityLevel !== null && typeof data.observabilityLevel !== 'undefined')
      ? sTRING.decode(data.observabilityLevel)
      : undefined,
    priority: (data.priority !== null && typeof data.priority !== 'undefined')
      ? sTRING.decode(data.priority)
      : undefined,
    pus18Parameter: _map(data.pus18Parameter, d => (pusParameter.decode(d))),
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.decode(data.pusElement)
      : undefined,
  }),
};
