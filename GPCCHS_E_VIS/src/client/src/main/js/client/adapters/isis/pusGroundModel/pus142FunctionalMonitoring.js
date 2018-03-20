// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _map = require('lodash/map');
const pus142ParameterMonitoringDefinition = require('./pus142ParameterMonitoringDefinition');
const pusElement = require('./pusElement');
const sTRING = require('../ccsds_mal/sTRING');
const uINTEGER = require('../ccsds_mal/uINTEGER');

module.exports = {
  encode: data => ({
    fmonId: (data.fmonId !== null && typeof data.fmonId !== 'undefined')
      ? uINTEGER.encode(data.fmonId)
      : null,
    protectionStatus: (data.protectionStatus !== null && typeof data.protectionStatus !== 'undefined')
      ? sTRING.encode(data.protectionStatus)
      : null,
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? uINTEGER.encode(data.status)
      : null,
    checkingStatus: (data.checkingStatus !== null && typeof data.checkingStatus !== 'undefined')
      ? sTRING.encode(data.checkingStatus)
      : null,
    rid: (data.rid !== null && typeof data.rid !== 'undefined')
      ? uINTEGER.encode(data.rid)
      : null,
    pus142ParameterMonitoringDefinition: _map(data.pus142ParameterMonitoringDefinition, d => (pus142ParameterMonitoringDefinition.encode(d))),
    validityParameterId: (data.validityParameterId !== null && typeof data.validityParameterId !== 'undefined')
      ? uINTEGER.encode(data.validityParameterId)
      : null,
    validityParameterMask: (data.validityParameterMask !== null && typeof data.validityParameterMask !== 'undefined')
      ? sTRING.encode(data.validityParameterMask)
      : null,
    validityParameterExpectedValue: (data.validityParameterExpectedValue !== null && typeof data.validityParameterExpectedValue !== 'undefined')
      ? sTRING.encode(data.validityParameterExpectedValue)
      : null,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.encode(data.pusElement)
      : null,
    ridLabel: (data.ridLabel !== null && typeof data.ridLabel !== 'undefined')
      ? sTRING.encode(data.ridLabel)
      : null,
    fmonIdLabel: (data.fmonIdLabel !== null && typeof data.fmonIdLabel !== 'undefined')
      ? sTRING.encode(data.fmonIdLabel)
      : null,
  }),
  decode: data => ({
    fmonId: (data.fmonId !== null && typeof data.fmonId !== 'undefined')
      ? uINTEGER.decode(data.fmonId)
      : undefined,
    protectionStatus: (data.protectionStatus !== null && typeof data.protectionStatus !== 'undefined')
      ? sTRING.decode(data.protectionStatus)
      : undefined,
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? uINTEGER.decode(data.status)
      : undefined,
    checkingStatus: (data.checkingStatus !== null && typeof data.checkingStatus !== 'undefined')
      ? sTRING.decode(data.checkingStatus)
      : undefined,
    rid: (data.rid !== null && typeof data.rid !== 'undefined')
      ? uINTEGER.decode(data.rid)
      : undefined,
    pus142ParameterMonitoringDefinition: _map(data.pus142ParameterMonitoringDefinition, d => (pus142ParameterMonitoringDefinition.decode(d))),
    validityParameterId: (data.validityParameterId !== null && typeof data.validityParameterId !== 'undefined')
      ? uINTEGER.decode(data.validityParameterId)
      : undefined,
    validityParameterMask: (data.validityParameterMask !== null && typeof data.validityParameterMask !== 'undefined')
      ? sTRING.decode(data.validityParameterMask)
      : undefined,
    validityParameterExpectedValue: (data.validityParameterExpectedValue !== null && typeof data.validityParameterExpectedValue !== 'undefined')
      ? sTRING.decode(data.validityParameterExpectedValue)
      : undefined,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.decode(data.pusElement)
      : undefined,
    ridLabel: (data.ridLabel !== null && typeof data.ridLabel !== 'undefined')
      ? sTRING.decode(data.ridLabel)
      : undefined,
    fmonIdLabel: (data.fmonIdLabel !== null && typeof data.fmonIdLabel !== 'undefined')
      ? sTRING.decode(data.fmonIdLabel)
      : undefined,
  }),
};
