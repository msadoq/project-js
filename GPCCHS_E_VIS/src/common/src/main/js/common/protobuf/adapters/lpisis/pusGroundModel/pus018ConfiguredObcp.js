// Generated file
const pusElement = require('./pusElement');

module.exports = {
  encode: data => ({
    id: (data.id !== null && typeof data.id !== 'undefined')
      ? { value: data.id }
      : null,
    hkParamNameForName: (data.hkParamNameForName !== null && typeof data.hkParamNameForName !== 'undefined')
      ? { value: data.hkParamNameForName }
      : null,
    hkParamNameForId: (data.hkParamNameForId !== null && typeof data.hkParamNameForId !== 'undefined')
      ? { value: data.hkParamNameForId }
      : null,
    hkParamNameForStatus: (data.hkParamNameForStatus !== null && typeof data.hkParamNameForStatus !== 'undefined')
      ? { value: data.hkParamNameForStatus }
      : null,
    hkParamNameForPriority: (data.hkParamNameForPriority !== null && typeof data.hkParamNameForPriority !== 'undefined')
      ? { value: data.hkParamNameForPriority }
      : null,
    hkParamNameForStepId: (data.hkParamNameForStepId !== null && typeof data.hkParamNameForStepId !== 'undefined')
      ? { value: data.hkParamNameForStepId }
      : null,
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? { value: data.status }
      : null,
    stepId: (data.stepId !== null && typeof data.stepId !== 'undefined')
      ? { value: data.stepId }
      : null,
    priority: (data.priority !== null && typeof data.priority !== 'undefined')
      ? { value: data.priority }
      : null,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.encode(data.pusElement)
      : null,
  }),
  decode: data => ({
    id: (data.id !== null && typeof data.id !== 'undefined')
      ? { type: 'uinteger', value: data.id.value }
      : undefined,
    hkParamNameForName: (data.hkParamNameForName !== null && typeof data.hkParamNameForName !== 'undefined')
      ? { type: 'string', value: data.hkParamNameForName.value }
      : undefined,
    hkParamNameForId: (data.hkParamNameForId !== null && typeof data.hkParamNameForId !== 'undefined')
      ? { type: 'string', value: data.hkParamNameForId.value }
      : undefined,
    hkParamNameForStatus: (data.hkParamNameForStatus !== null && typeof data.hkParamNameForStatus !== 'undefined')
      ? { type: 'string', value: data.hkParamNameForStatus.value }
      : undefined,
    hkParamNameForPriority: (data.hkParamNameForPriority !== null && typeof data.hkParamNameForPriority !== 'undefined')
      ? { type: 'string', value: data.hkParamNameForPriority.value }
      : undefined,
    hkParamNameForStepId: (data.hkParamNameForStepId !== null && typeof data.hkParamNameForStepId !== 'undefined')
      ? { type: 'string', value: data.hkParamNameForStepId.value }
      : undefined,
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? { type: 'uinteger', value: data.status.value }
      : undefined,
    stepId: (data.stepId !== null && typeof data.stepId !== 'undefined')
      ? { type: 'uinteger', value: data.stepId.value }
      : undefined,
    priority: (data.priority !== null && typeof data.priority !== 'undefined')
      ? { type: 'uinteger', value: data.priority.value }
      : undefined,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.decode(data.pusElement)
      : undefined,
  }),
};

