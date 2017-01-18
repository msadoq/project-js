// Generated file
const _map = require('lodash/map');
const pus142ParameterMonitoringDefinition = require('./pus142ParameterMonitoringDefinition');
const pusElement = require('./pusElement');
const {
  encodeAttribute,
  decodeAttribute,

} = require('../types');

module.exports = {
  encode: data => ({
    fmonId: (data.fmonId !== null && typeof data.fmonId !== 'undefined')
      ? { value: data.fmonId }
      : null,
    protectionStatus: (data.protectionStatus !== null && typeof data.protectionStatus !== 'undefined')
      ? { value: data.protectionStatus }
      : null,
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? { value: data.status }
      : null,
    checkingStatus: (data.checkingStatus !== null && typeof data.checkingStatus !== 'undefined')
      ? { value: data.checkingStatus }
      : null,
    rid: (data.rid !== null && typeof data.rid !== 'undefined')
      ? { value: data.rid }
      : null,
    pus142ParameterMonitoringDefinition: _map(data.pus142ParameterMonitoringDefinition, d => (pus142ParameterMonitoringDefinition.encode(d))),
    validityParameterId: (data.validityParameterId !== null && typeof data.validityParameterId !== 'undefined')
      ? { value: data.validityParameterId }
      : null,
    validityParameterMask: (data.validityParameterMask !== null && typeof data.validityParameterMask !== 'undefined')
      ? { value: data.validityParameterMask }
      : null,
    validityParameterExpectedValue: (data.validityParameterExpectedValue !== null && typeof data.validityParameterExpectedValue !== 'undefined')
      ? encodeAttribute(data.validityParameterExpectedValue)
      : null,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.encode(data.pusElement)
      : null,
  }),
  decode: data => ({
    fmonId: (data.fmonId !== null && typeof data.fmonId !== 'undefined')
      ? { type: 'uinteger', value: data.fmonId.value }
      : undefined,
    protectionStatus: (data.protectionStatus !== null && typeof data.protectionStatus !== 'undefined')
      ? { type: 'uinteger', value: data.protectionStatus.value }
      : undefined,
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? { type: 'uinteger', value: data.status.value }
      : undefined,
    checkingStatus: (data.checkingStatus !== null && typeof data.checkingStatus !== 'undefined')
      ? { type: 'uinteger', value: data.checkingStatus.value }
      : undefined,
    rid: (data.rid !== null && typeof data.rid !== 'undefined')
      ? { type: 'uinteger', value: data.rid.value }
      : undefined,
    pus142ParameterMonitoringDefinition: _map(data.pus142ParameterMonitoringDefinition, d => (pus142ParameterMonitoringDefinition.decode(d))),
    validityParameterId: (data.validityParameterId !== null && typeof data.validityParameterId !== 'undefined')
      ? { type: 'uinteger', value: data.validityParameterId.value }
      : undefined,
    validityParameterMask: (data.validityParameterMask !== null && typeof data.validityParameterMask !== 'undefined')
      ? { type: 'uinteger', value: data.validityParameterMask.value }
      : undefined,
    validityParameterExpectedValue: (data.validityParameterExpectedValue !== null && typeof data.validityParameterExpectedValue !== 'undefined')
      ? decodeAttribute(data.validityParameterExpectedValue)
      : undefined,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.decode(data.pusElement)
      : undefined,
  }),
};

