// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const pusElement = require('./pusElement');
const sTRING = require('../ccsds_mal/sTRING');
const uINTEGER = require('../ccsds_mal/uINTEGER');

module.exports = {
  encode: data => ({
    id: (data.id !== null && typeof data.id !== 'undefined')
      ? uINTEGER.encode(data.id)
      : null,
    hkParamNameForName: (data.hkParamNameForName !== null && typeof data.hkParamNameForName !== 'undefined')
      ? sTRING.encode(data.hkParamNameForName)
      : null,
    hkParamNameForId: (data.hkParamNameForId !== null && typeof data.hkParamNameForId !== 'undefined')
      ? sTRING.encode(data.hkParamNameForId)
      : null,
    hkParamNameForStatus: (data.hkParamNameForStatus !== null && typeof data.hkParamNameForStatus !== 'undefined')
      ? sTRING.encode(data.hkParamNameForStatus)
      : null,
    hkParamNameForPriority: (data.hkParamNameForPriority !== null && typeof data.hkParamNameForPriority !== 'undefined')
      ? sTRING.encode(data.hkParamNameForPriority)
      : null,
    hkParamNameForStepId: (data.hkParamNameForStepId !== null && typeof data.hkParamNameForStepId !== 'undefined')
      ? sTRING.encode(data.hkParamNameForStepId)
      : null,
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? uINTEGER.encode(data.status)
      : null,
    stepId: (data.stepId !== null && typeof data.stepId !== 'undefined')
      ? uINTEGER.encode(data.stepId)
      : null,
    priority: (data.priority !== null && typeof data.priority !== 'undefined')
      ? uINTEGER.encode(data.priority)
      : null,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.encode(data.pusElement)
      : null,
  }),
  decode: data => ({
    id: (data.id !== null && typeof data.id !== 'undefined')
      ? uINTEGER.decode(data.id)
      : undefined,
    hkParamNameForName: (data.hkParamNameForName !== null && typeof data.hkParamNameForName !== 'undefined')
      ? sTRING.decode(data.hkParamNameForName)
      : undefined,
    hkParamNameForId: (data.hkParamNameForId !== null && typeof data.hkParamNameForId !== 'undefined')
      ? sTRING.decode(data.hkParamNameForId)
      : undefined,
    hkParamNameForStatus: (data.hkParamNameForStatus !== null && typeof data.hkParamNameForStatus !== 'undefined')
      ? sTRING.decode(data.hkParamNameForStatus)
      : undefined,
    hkParamNameForPriority: (data.hkParamNameForPriority !== null && typeof data.hkParamNameForPriority !== 'undefined')
      ? sTRING.decode(data.hkParamNameForPriority)
      : undefined,
    hkParamNameForStepId: (data.hkParamNameForStepId !== null && typeof data.hkParamNameForStepId !== 'undefined')
      ? sTRING.decode(data.hkParamNameForStepId)
      : undefined,
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? uINTEGER.decode(data.status)
      : undefined,
    stepId: (data.stepId !== null && typeof data.stepId !== 'undefined')
      ? uINTEGER.decode(data.stepId)
      : undefined,
    priority: (data.priority !== null && typeof data.priority !== 'undefined')
      ? uINTEGER.decode(data.priority)
      : undefined,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.decode(data.pusElement)
      : undefined,
  }),
};
