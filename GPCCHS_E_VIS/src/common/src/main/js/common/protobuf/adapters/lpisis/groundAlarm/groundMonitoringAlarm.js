// Generated file
const _map = require('lodash/map');
const transition = require('./transition');

module.exports = {
  encode: data => ({
    creationDate: (data.creationDate !== null && typeof data.creationDate !== 'undefined')
      ? { value: data.creationDate }
      : null,
    paramUid: (data.paramUid !== null && typeof data.paramUid !== 'undefined')
      ? { value: data.paramUid }
      : null,
    updateDate: (data.updateDate !== null && typeof data.updateDate !== 'undefined')
      ? { value: data.updateDate }
      : null,
    closingDate: (data.closingDate !== null && typeof data.closingDate !== 'undefined')
      ? { value: data.closingDate }
      : null,
    hasAckRequest: (data.hasAckRequest !== null && typeof data.hasAckRequest !== 'undefined')
      ? { value: data.hasAckRequest }
      : null,
    alarmId: (data.alarmId !== null && typeof data.alarmId !== 'undefined')
      ? { value: data.alarmId }
      : null,
    transitions: _map(data.transitions, d => (transition.encode(d))),
    isNominal: (data.isNominal !== null && typeof data.isNominal !== 'undefined')
      ? { value: data.isNominal }
      : null,
  }),
  decode: data => ({
    creationDate: (data.creationDate !== null && typeof data.creationDate !== 'undefined')
      ? { type: 'time', value: data.creationDate.value.toNumber() }
      : undefined,
    paramUid: (data.paramUid !== null && typeof data.paramUid !== 'undefined')
      ? { type: 'long', symbol: data.paramUid.value.toString() }
      : undefined,
    updateDate: (data.updateDate !== null && typeof data.updateDate !== 'undefined')
      ? { type: 'time', value: data.updateDate.value.toNumber() }
      : undefined,
    closingDate: (data.closingDate !== null && typeof data.closingDate !== 'undefined')
      ? { type: 'time', value: data.closingDate.value.toNumber() }
      : undefined,
    hasAckRequest: (data.hasAckRequest !== null && typeof data.hasAckRequest !== 'undefined')
      ? { type: 'boolean', value: data.hasAckRequest.value }
      : undefined,
    alarmId: (data.alarmId !== null && typeof data.alarmId !== 'undefined')
      ? { type: 'long', symbol: data.alarmId.value.toString() }
      : undefined,
    transitions: _map(data.transitions, d => (transition.decode(d))),
    isNominal: (data.isNominal !== null && typeof data.isNominal !== 'undefined')
      ? { type: 'boolean', value: data.isNominal.value }
      : undefined,
    referenceTimestamp: (data.creationDate !== null && typeof data.creationDate !== 'undefined')
        ? { type: 'time', value: data.creationDate.value.toNumber() }
        : undefined,
  }),
};
