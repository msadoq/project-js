// Produced by Acceleo JavaScript Generator 1.1.0
const _map = require('lodash/map');
const pusElement = require('./pusElement');
const pusParameter = require('./pusParameter');

module.exports = {
  encode: data => ({
    id: (data.id !== null && typeof data.id !== 'undefined')
      ? { value: data.id }
      : null,
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? { value: data.status }
      : null,
    stepId: (data.stepId !== null && typeof data.stepId !== 'undefined')
      ? { value: data.stepId }
      : null,
    partitionId: (data.partitionId !== null && typeof data.partitionId !== 'undefined')
      ? { value: data.partitionId }
      : null,
    observabilityLevel: (data.observabilityLevel !== null && typeof data.observabilityLevel !== 'undefined')
      ? { value: data.observabilityLevel }
      : null,
    priority: (data.priority !== null && typeof data.priority !== 'undefined')
      ? { value: data.priority }
      : null,
    pus18Parameter: _map(data.pus18Parameter, d => (pusParameter.encode(d))),
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.encode(data.pusElement)
      : null,
  }),
  decode: data => ({
    id: (data.id !== null && typeof data.id !== 'undefined')
      ? { type: 'uinteger', value: data.id.value }
      : undefined,
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? { type: 'uinteger', value: data.status.value }
      : undefined,
    stepId: (data.stepId !== null && typeof data.stepId !== 'undefined')
      ? { type: 'uinteger', value: data.stepId.value }
      : undefined,
    partitionId: (data.partitionId !== null && typeof data.partitionId !== 'undefined')
      ? { type: 'uinteger', value: data.partitionId.value }
      : undefined,
    observabilityLevel: (data.observabilityLevel !== null && typeof data.observabilityLevel !== 'undefined')
      ? { type: 'uinteger', value: data.observabilityLevel.value }
      : undefined,
    priority: (data.priority !== null && typeof data.priority !== 'undefined')
      ? { type: 'uinteger', value: data.priority.value }
      : undefined,
    pus18Parameter: _map(data.pus18Parameter, d => (pusParameter.decode(d))),
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.decode(data.pusElement)
      : undefined,
  }),
};

